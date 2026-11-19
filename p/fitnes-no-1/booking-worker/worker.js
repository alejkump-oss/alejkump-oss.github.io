// ak-booking-fitnes-no-1 — self-booking API for the Fitnes No 1 preview.
// Cloudflare Workers Free + D1 free. Zero dependencies.
//
//   GET  /slots?from=YYYY-MM-DD   -> full (taken) slots in the bookable window, no personal data
//   POST /book {date,time,name,phone,kind,note,req}  -> {ok,id,date,hour}
//   GET  /admin?key=…             -> Slovenian list of upcoming bookings (key = Worker secret ADMIN_KEY)
//   POST /admin/cancel  (form: key, id) -> deletes one booking, frees the slot
//
// Slots: every day 6.00–22.00 (published hours), 1-hour slots, last starts 21.00, today + 13 days,
// no past slots, CAPACITY per slot. Times are Europe/Ljubljana.
// Retention: a booking row is purged ~2 days after its slot (cron + opportunistic purge).

const ORIGIN = 'https://alejkump.si';
const TZ = 'Europe/Ljubljana';
const CAPACITY = 1;
const FIRST = 6, LAST = 21, DAYS = 14;
const KEEP_MS = 2 * 24 * 3600 * 1000;
const KINDS = ['Prvi obisk', 'Trening', 'Vprašanje o članarini'];
const BOOK_LIMIT = 10;       // booking attempts per IP per hour (a household or gym Wi-Fi shares one IP)
const ADMIN_FAIL_LIMIT = 10; // wrong admin keys per IP per hour
const DL = ['nedelja', 'ponedeljek', 'torek', 'sreda', 'četrtek', 'petek', 'sobota'];

// ---------- time ----------
function ljNow(d = new Date()) {
  const p = {};
  for (const x of new Intl.DateTimeFormat('en-CA', { timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', hourCycle: 'h23' }).formatToParts(d)) p[x.type] = x.value;
  return { date: `${p.year}-${p.month}-${p.day}`, hour: Number(p.hour) };
}
function addDays(date, n) {
  const [y, m, d] = date.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d + n)).toISOString().slice(0, 10);
}
function isDate(s) {
  if (typeof s !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(s)) return false;
  const [y, m, d] = s.split('-').map(Number);
  const t = new Date(Date.UTC(y, m - 1, d));
  return t.getUTCFullYear() === y && t.getUTCMonth() === m - 1 && t.getUTCDate() === d;
}
function slotEpoch(date, hour) { // approximate (UTC); only used for expiry
  const [y, m, d] = date.split('-').map(Number);
  return Date.UTC(y, m - 1, d, hour);
}
// A slot is bookable when it is inside the window, inside opening hours and not started yet.
function slotOpen(date, hour, now = ljNow()) {
  if (!isDate(date) || !Number.isInteger(hour) || hour < FIRST || hour > LAST) return false;
  const last = addDays(now.date, DAYS - 1);
  if (date < now.date || date > last) return false;
  if (date === now.date && hour <= now.hour) return false;
  return true;
}
function slLabel(date, hour) {
  const [y, m, d] = date.split('-').map(Number);
  const wd = new Date(Date.UTC(y, m - 1, d)).getUTCDay();
  return `${DL[wd]}, ${d}. ${m}. ${y}, ob ${hour}.00`;
}

// ---------- helpers ----------
function clean(s, max) {
  if (typeof s !== 'string') return '';
  return s.replace(/[\u0000-\u001f\u007f]+/g, ' ').replace(/\s+/g, ' ').trim().slice(0, max);
}
function esc(s) {
  return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
function cors(req) {
  const h = { 'Vary': 'Origin' };
  if (req.headers.get('Origin') === ORIGIN) {
    h['Access-Control-Allow-Origin'] = ORIGIN;
    h['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS';
    h['Access-Control-Allow-Headers'] = 'Content-Type';
    h['Access-Control-Max-Age'] = '86400';
  }
  return h;
}
function json(req, status, body) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex', ...cors(req) },
  });
}
async function hmac(key, msg) {
  const k = await crypto.subtle.importKey('raw', new TextEncoder().encode(key), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const sig = await crypto.subtle.sign('HMAC', k, new TextEncoder().encode(msg));
  return [...new Uint8Array(sig)].map(b => b.toString(16).padStart(2, '0')).join('');
}
function safeEqual(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string' || a.length !== b.length) return false;
  let r = 0;
  for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return r === 0;
}
// Counts one hit for (ip, scope) in the current hour and returns the new count.
async function hit(env, req, scope) {
  const ip = req.headers.get('CF-Connecting-IP') || 'unknown';
  const bucket = Math.floor(Date.now() / 3600000);
  const k = await hmac(env.ADMIN_KEY || 'no-key', `${ip}|${bucket}|${scope}`);
  const row = await env.DB.prepare(
    'INSERT INTO ratelimit (k, n, exp) VALUES (?1, 1, ?2) ON CONFLICT(k) DO UPDATE SET n = n + 1 RETURNING n'
  ).bind(k, (bucket + 2) * 3600000).first();
  return row ? row.n : 1;
}
async function purge(env) {
  const t = Date.now();
  await env.DB.batch([
    env.DB.prepare('DELETE FROM bookings WHERE expires_at < ?1').bind(t),
    env.DB.prepare('DELETE FROM ratelimit WHERE exp < ?1').bind(t),
  ]);
}
const ALPHA = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
function newId() {
  const b = crypto.getRandomValues(new Uint8Array(5));
  return 'FN-' + [...b].map(x => ALPHA[x % 32]).join('');
}

// ---------- handlers ----------
async function slots(req, env, url) {
  const now = ljNow();
  let from = url.searchParams.get('from') || now.date;
  if (!isDate(from)) return json(req, 400, { ok: false, error: 'invalid', field: 'from' });
  if (from < now.date) from = now.date;
  const to = addDays(now.date, DAYS - 1);
  const rs = await env.DB.prepare(
    'SELECT date, hour, COUNT(*) AS n FROM bookings WHERE date >= ?1 AND date <= ?2 GROUP BY date, hour HAVING n >= ?3 ORDER BY date, hour'
  ).bind(from, to, CAPACITY).all();
  return json(req, 200, {
    ok: true, capacity: CAPACITY, from, to, now: now.date, nowHour: now.hour, first: FIRST, last: LAST,
    taken: (rs.results || []).map(r => ({ date: r.date, hour: r.hour, time: `${String(r.hour).padStart(2, '0')}:00` })),
  });
}

async function book(req, env, ctx) {
  if (req.headers.get('Origin') !== ORIGIN) return json(req, 403, { ok: false, error: 'origin' });
  let b;
  try {
    const raw = await req.text();
    if (raw.length > 4000) return json(req, 413, { ok: false, error: 'too_large' });
    b = JSON.parse(raw);
  } catch { return json(req, 400, { ok: false, error: 'invalid', field: 'body' }); }
  if (!b || typeof b !== 'object') return json(req, 400, { ok: false, error: 'invalid', field: 'body' });

  const date = typeof b.date === 'string' ? b.date : '';
  const tm = typeof b.time === 'string' ? b.time.match(/^(\d{1,2})[:.]00$/) : null;
  const hour = tm ? Number(tm[1]) : NaN;
  const name = clean(b.name, 60);
  const phone = clean(b.phone, 20);
  const kind = KINDS.includes(b.kind) ? b.kind : null;
  const note = clean(b.note, 300);
  const reqId = typeof b.req === 'string' && /^[A-Za-z0-9-]{8,64}$/.test(b.req) ? b.req : null;

  if (!reqId) return json(req, 400, { ok: false, error: 'invalid', field: 'req' });
  if (!isDate(date) || !tm) return json(req, 400, { ok: false, error: 'invalid', field: 'slot' });
  if (name.length < 2) return json(req, 400, { ok: false, error: 'invalid', field: 'name' });
  const digits = phone.replace(/\D/g, '');
  if (!/^\+?[0-9 ()/.-]+$/.test(phone) || digits.length < 8 || digits.length > 15) return json(req, 400, { ok: false, error: 'invalid', field: 'phone' });
  if (!kind) return json(req, 400, { ok: false, error: 'invalid', field: 'kind' });

  // Idempotency first: a retry of an already-stored request returns that booking, never a second one.
  const prior = await env.DB.prepare('SELECT id, date, hour FROM bookings WHERE req_id = ?1').bind(reqId).first();
  if (prior) return json(req, 200, { ok: true, id: prior.id, date: prior.date, hour: prior.hour, label: slLabel(prior.date, prior.hour), repeat: true });

  if (!slotOpen(date, hour)) return json(req, 400, { ok: false, error: 'closed', field: 'slot' });
  if ((await hit(env, req, 'book')) > BOOK_LIMIT) return json(req, 429, { ok: false, error: 'rate' });

  const created = Date.now();
  for (let attempt = 0; attempt < 3; attempt++) {
    const id = newId();
    try {
      // One statement: SQLite/D1 evaluates the capacity check and the insert atomically.
      const r = await env.DB.prepare(
        `INSERT INTO bookings (id, req_id, date, hour, name, phone, kind, note, created_at, expires_at)
         SELECT ?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10
         WHERE (SELECT COUNT(*) FROM bookings WHERE date = ?3 AND hour = ?4) < ?11`
      ).bind(id, reqId, date, hour, name, phone, kind, note, created, slotEpoch(date, hour) + KEEP_MS, CAPACITY).run();
      if (!r.meta || r.meta.changes !== 1) return json(req, 409, { ok: false, error: 'taken' });
      ctx.waitUntil(purge(env).catch(() => {}));
      return json(req, 201, { ok: true, id, date, hour, label: slLabel(date, hour) });
    } catch (e) {
      const msg = String(e && e.message || e);
      if (/UNIQUE/i.test(msg) && /req_id/i.test(msg)) {
        const p = await env.DB.prepare('SELECT id, date, hour FROM bookings WHERE req_id = ?1').bind(reqId).first();
        if (p) return json(req, 200, { ok: true, id: p.id, date: p.date, hour: p.hour, label: slLabel(p.date, p.hour), repeat: true });
      }
      if (/UNIQUE/i.test(msg)) continue; // id collision: new id
      throw e;
    }
  }
  return json(req, 500, { ok: false, error: 'server' });
}

function adminHeaders() {
  return {
    'Content-Type': 'text/html; charset=utf-8',
    'Cache-Control': 'no-store',
    'Referrer-Policy': 'no-referrer',
    'X-Robots-Tag': 'noindex, nofollow',
    'X-Content-Type-Options': 'nosniff',
    'Content-Security-Policy': "default-src 'none'; style-src 'unsafe-inline'; form-action 'self'; frame-ancestors 'none'; base-uri 'none'",
  };
}
function page(title, body) {
  return `<!doctype html><html lang="sl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>${esc(title)}</title>
<style>
:root{color-scheme:light dark;--bg:#f6f4f1;--card:#fff;--tx:#17130f;--tx2:#665d55;--line:#e3ddd6;--or:#e85a1c}
@media (prefers-color-scheme:dark){:root{--bg:#121110;--card:#1c1a18;--tx:#f2eee9;--tx2:#a89f96;--line:#33302c;--or:#ff7a3d}}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--tx);font:16px/1.45 system-ui,-apple-system,"Segoe UI",sans-serif}
main{max-width:900px;margin:0 auto;padding:20px 16px 48px}h1{font-size:1.5rem;margin:0 0 4px}p.s{margin:0 0 18px;color:var(--tx2)}
.msg{padding:10px 14px;border-radius:10px;background:var(--card);border:1px solid var(--line);margin:0 0 16px}
table{width:100%;border-collapse:collapse;background:var(--card);border:1px solid var(--line);border-radius:12px;overflow:hidden}
th,td{text-align:left;padding:10px 12px;border-bottom:1px solid var(--line);vertical-align:top}th{font-size:.8rem;text-transform:uppercase;letter-spacing:.06em;color:var(--tx2)}
tr:last-child td{border-bottom:0}td small{color:var(--tx2)}a{color:var(--or)}
.day td{background:var(--bg);font-weight:700;padding-top:16px}
details summary{cursor:pointer;color:var(--or);font-weight:600}details form{margin-top:8px}
button{font:inherit;border:0;border-radius:999px;padding:8px 14px;background:var(--or);color:#fff;font-weight:700;cursor:pointer}
@media (max-width:640px){thead{display:none}table,tbody,tr,td{display:block;width:100%}tr{border-bottom:1px solid var(--line)}td{border:0;padding:6px 12px}tr.day td{padding-top:14px}}
</style></head><body><main>${body}</main></body></html>`;
}
async function admin(req, env, url) {
  const key = url.searchParams.get('key') || '';
  if (!env.ADMIN_KEY) return new Response('Admin ni nastavljen.', { status: 503, headers: adminHeaders() });
  if (!safeEqual(key, env.ADMIN_KEY)) {
    if ((await hit(env, req, 'admin-fail')) > ADMIN_FAIL_LIMIT) return new Response('Preveč poskusov. Poskusite čez eno uro.', { status: 429, headers: adminHeaders() });
    return new Response(page('Ni dostopa', '<h1>Ni dostopa</h1><p class="s">Povezava ni pravilna.</p>'), { status: 403, headers: adminHeaders() });
  }
  await purge(env).catch(() => {});
  const now = ljNow();
  const rs = await env.DB.prepare(
    'SELECT id, date, hour, name, phone, kind, note, created_at FROM bookings WHERE date >= ?1 ORDER BY date, hour, created_at'
  ).bind(now.date).all();
  const rows = rs.results || [];
  const done = url.searchParams.get('preklicano');
  let html = `<h1>Rezervacije · Fitnes No 1</h1><p class="s">Prihajajoči termini (${rows.length}). Podatki se samodejno izbrišejo 2 dni po terminu. Povezave ne delite.</p>`;
  if (done) html += `<p class="msg">Rezervacija ${esc(done)} je preklicana, termin je spet prost.</p>`;
  if (!rows.length) html += '<p class="msg">Ni prihajajočih rezervacij.</p>';
  else {
    html += '<table><thead><tr><th>Ura</th><th>Ime</th><th>Telefon</th><th>Kaj</th><th>Opomba</th><th>Št.</th><th></th></tr></thead><tbody>';
    let day = '';
    for (const r of rows) {
      if (r.date !== day) {
        day = r.date;
        const [y, m, d] = day.split('-').map(Number);
        const wd = DL[new Date(Date.UTC(y, m - 1, d)).getUTCDay()];
        html += `<tr class="day"><td colspan="7">${esc(wd)}, ${d}. ${m}. ${y}${day === now.date ? ' · danes' : ''}</td></tr>`;
      }
      const past = r.date === now.date && r.hour < now.hour;
      html += `<tr><td>${r.hour}.00–${r.hour + 1}.00${past ? ' <small>(minilo)</small>' : ''}</td><td>${esc(r.name)}</td>`
        + `<td><a href="tel:${esc(r.phone.replace(/[^0-9+]/g, ''))}">${esc(r.phone)}</a></td><td>${esc(r.kind)}</td><td>${esc(r.note) || '<small>—</small>'}</td><td><small>${esc(r.id)}</small></td>`
        + `<td><details><summary>Prekliči</summary><form method="post" action="/admin/cancel"><input type="hidden" name="key" value="${esc(key)}"><input type="hidden" name="id" value="${esc(r.id)}"><button type="submit">Da, prekliči ${esc(r.id)}</button></form></details></td></tr>`;
    }
    html += '</tbody></table>';
  }
  return new Response(page('Rezervacije · Fitnes No 1', html), { headers: adminHeaders() });
}
async function cancel(req, env) {
  let form;
  try { form = await req.formData(); } catch { return new Response('Napačna zahteva.', { status: 400, headers: adminHeaders() }); }
  const key = String(form.get('key') || ''), id = String(form.get('id') || '');
  if (!env.ADMIN_KEY || !safeEqual(key, env.ADMIN_KEY)) {
    if ((await hit(env, req, 'admin-fail')) > ADMIN_FAIL_LIMIT) return new Response('Preveč poskusov.', { status: 429, headers: adminHeaders() });
    return new Response('Ni dostopa.', { status: 403, headers: adminHeaders() });
  }
  if (!/^FN-[2-9A-HJ-NP-Z]{5}$/.test(id)) return new Response('Napačna številka.', { status: 400, headers: adminHeaders() });
  await env.DB.prepare('DELETE FROM bookings WHERE id = ?1').bind(id).run();
  return new Response(null, { status: 303, headers: { ...adminHeaders(), Location: `/admin?key=${encodeURIComponent(key)}&preklicano=${encodeURIComponent(id)}` } });
}

export default {
  async fetch(req, env, ctx) {
    const url = new URL(req.url);
    try {
      if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors(req) });
      if (url.pathname === '/slots' && req.method === 'GET') return await slots(req, env, url);
      if (url.pathname === '/book' && req.method === 'POST') return await book(req, env, ctx);
      if (url.pathname === '/admin' && req.method === 'GET') return await admin(req, env, url);
      if (url.pathname === '/admin/cancel' && req.method === 'POST') return await cancel(req, env);
      if (url.pathname === '/' ) return json(req, 200, { ok: true, service: 'ak-booking-fitnes-no-1' });
      return json(req, 404, { ok: false, error: 'not_found' });
    } catch (e) {
      console.error('booking error', String(e && e.message || e));
      return json(req, 500, { ok: false, error: 'server' });
    }
  },
  async scheduled(_ev, env, ctx) { ctx.waitUntil(purge(env)); },
};

// exported for local tests
export const _t = { ljNow, addDays, isDate, slotOpen, clean, CAPACITY, FIRST, LAST, DAYS };
