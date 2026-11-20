// ak-booking-mesarstvo-bradac — "Naročilo za prevzem" API for the Mesarstvo Bradač preview
// (https://alejkump.si/p/mesarstvo-bradac/). Cloudflare Workers Free + D1 free. Zero dependencies.
// Pattern cloned from p/fitnes-no-1/booking-worker.
//
//   GET  /windows                  -> every pickup window in the next 14 days with {open, full}; no personal data
//   POST /order {date,win,items,name,phone,req} -> {ok,id,date,win,label}
//   GET  /admin?key=…              -> Slovenian list of upcoming orders (key = Worker secret ADMIN_KEY)
//   POST /admin/cancel (form: key, id) -> deletes one order, frees its place in the window
//
// Pickup windows follow the published Google hours (pon–pet 8–19, sob 7–13, ned zaprto):
//   pon–pet 8–12, 12–15, 15–19 · sob 7–10, 10–13. Today's window is orderable only if it starts
//   at least LEAD_H hours from now. CAPACITY orders per window. Times are Europe/Ljubljana.
// Retention: a row is purged ~2 days after its window ends (daily cron + opportunistic purge).

const ORIGIN = 'https://alejkump.si';
const TZ = 'Europe/Ljubljana';
const CAPACITY = 10;
const DAYS = 14;
const LEAD_H = 2;
const KEEP_MS = 2 * 24 * 3600 * 1000;
const ORDER_LIMIT = 10;      // order attempts per IP per hour
const ADMIN_FAIL_LIMIT = 10; // wrong admin keys per IP per hour
const DL = ['nedelja', 'ponedeljek', 'torek', 'sreda', 'četrtek', 'petek', 'sobota'];
// weekday (0 = nedelja) -> windows [id, startHour, endHour]
const WEEK = [
  [],
  [['08-12', 8, 12], ['12-15', 12, 15], ['15-19', 15, 19]],
  [['08-12', 8, 12], ['12-15', 12, 15], ['15-19', 15, 19]],
  [['08-12', 8, 12], ['12-15', 12, 15], ['15-19', 15, 19]],
  [['08-12', 8, 12], ['12-15', 12, 15], ['15-19', 15, 19]],
  [['08-12', 8, 12], ['12-15', 12, 15], ['15-19', 15, 19]],
  [['07-10', 7, 10], ['10-13', 10, 13]],
];

// ---------- time ----------
function ljNow(d = new Date()) {
  const p = {};
  for (const x of new Intl.DateTimeFormat('en-CA', { timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(d)) p[x.type] = x.value;
  return { date: `${p.year}-${p.month}-${p.day}`, hour: Number(p.hour), min: Number(p.minute) };
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
function weekday(date) {
  const [y, m, d] = date.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d)).getUTCDay();
}
function findWin(date, win) {
  if (!isDate(date)) return null;
  return WEEK[weekday(date)].find(w => w[0] === win) || null;
}
// A window is orderable when it is in the 14-day window, exists that weekday and starts >= LEAD_H from now.
function winOpen(date, win, now = ljNow()) {
  const w = findWin(date, win);
  if (!w) return false;
  if (date < now.date || date > addDays(now.date, DAYS - 1)) return false;
  if (date === now.date && w[1] * 60 < now.hour * 60 + now.min + LEAD_H * 60) return false;
  return true;
}
function endEpoch(date, win) { // approximate (UTC); only used for expiry
  const w = findWin(date, win);
  const [y, m, d] = date.split('-').map(Number);
  return Date.UTC(y, m - 1, d, w ? w[2] : 23);
}
function winLabel(date, win) {
  const w = findWin(date, win);
  const [y, m, d] = date.split('-').map(Number);
  return `${DL[weekday(date)]}, ${d}. ${m}. ${y}, med ${w[1]}.00 in ${w[2]}.00`;
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
// Counts one hit for (ip, scope) in the current hour and returns the new count. Stores only an HMAC, never the IP.
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
    env.DB.prepare('DELETE FROM orders WHERE expires_at < ?1').bind(t),
    env.DB.prepare('DELETE FROM ratelimit WHERE exp < ?1').bind(t),
  ]);
}
const ALPHA = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
function newId() {
  const b = crypto.getRandomValues(new Uint8Array(5));
  return 'MB-' + [...b].map(x => ALPHA[x % 32]).join('');
}
function priorJson(req, p) {
  return json(req, 200, { ok: true, id: p.id, date: p.date, win: p.win, label: winLabel(p.date, p.win), repeat: true });
}

// ---------- handlers ----------
async function windows(req, env) {
  const now = ljNow();
  const to = addDays(now.date, DAYS - 1);
  const rs = await env.DB.prepare(
    'SELECT date, win, COUNT(*) AS n FROM orders WHERE date >= ?1 AND date <= ?2 GROUP BY date, win'
  ).bind(now.date, to).all();
  const count = {};
  for (const r of rs.results || []) count[`${r.date}|${r.win}`] = r.n;
  const days = [];
  for (let i = 0; i < DAYS; i++) {
    const date = addDays(now.date, i);
    const wd = weekday(date);
    days.push({
      date, wd, closed: WEEK[wd].length === 0,
      wins: WEEK[wd].map(([id, a, b]) => ({ id, from: a, to: b, open: winOpen(date, id, now), full: (count[`${date}|${id}`] || 0) >= CAPACITY })),
    });
  }
  return json(req, 200, { ok: true, capacity: CAPACITY, today: now.date, days });
}

async function order(req, env, ctx) {
  if (req.headers.get('Origin') !== ORIGIN) return json(req, 403, { ok: false, error: 'origin' });
  let b;
  try {
    const raw = await req.text();
    if (raw.length > 6000) return json(req, 413, { ok: false, error: 'too_large' });
    b = JSON.parse(raw);
  } catch { return json(req, 400, { ok: false, error: 'invalid', field: 'body' }); }
  if (!b || typeof b !== 'object') return json(req, 400, { ok: false, error: 'invalid', field: 'body' });

  const date = typeof b.date === 'string' ? b.date : '';
  const win = typeof b.win === 'string' ? b.win : '';
  const items = clean(b.items, 600);
  const name = clean(b.name, 60);
  const phone = clean(b.phone, 20);
  const reqId = typeof b.req === 'string' && /^[A-Za-z0-9-]{8,64}$/.test(b.req) ? b.req : null;

  if (!reqId) return json(req, 400, { ok: false, error: 'invalid', field: 'req' });
  if (!findWin(date, win)) return json(req, 400, { ok: false, error: 'invalid', field: 'win' });
  if (items.length < 3) return json(req, 400, { ok: false, error: 'invalid', field: 'items' });
  if (name.length < 2) return json(req, 400, { ok: false, error: 'invalid', field: 'name' });
  const digits = phone.replace(/\D/g, '');
  if (!/^\+?[0-9 ()/.-]+$/.test(phone) || digits.length < 8 || digits.length > 15) return json(req, 400, { ok: false, error: 'invalid', field: 'phone' });

  // Idempotency first: a retry of an already-stored request returns that order, never a second one.
  const prior = await env.DB.prepare('SELECT id, date, win FROM orders WHERE req_id = ?1').bind(reqId).first();
  if (prior) return priorJson(req, prior);

  if (!winOpen(date, win)) return json(req, 400, { ok: false, error: 'closed', field: 'win' });
  if ((await hit(env, req, 'order')) > ORDER_LIMIT) return json(req, 429, { ok: false, error: 'rate' });

  const created = Date.now();
  for (let attempt = 0; attempt < 3; attempt++) {
    const id = newId();
    try {
      // One statement: D1/SQLite evaluates the capacity check and the insert atomically.
      const r = await env.DB.prepare(
        `INSERT INTO orders (id, req_id, date, win, items, name, phone, created_at, expires_at)
         SELECT ?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9
         WHERE (SELECT COUNT(*) FROM orders WHERE date = ?3 AND win = ?4) < ?10`
      ).bind(id, reqId, date, win, items, name, phone, created, endEpoch(date, win) + KEEP_MS, CAPACITY).run();
      if (!r.meta || r.meta.changes !== 1) return json(req, 409, { ok: false, error: 'full' });
      ctx.waitUntil(purge(env).catch(() => {}));
      return json(req, 201, { ok: true, id, date, win, label: winLabel(date, win) });
    } catch (e) {
      const msg = String(e && e.message || e);
      if (/UNIQUE/i.test(msg) && /req_id/i.test(msg)) {
        const p = await env.DB.prepare('SELECT id, date, win FROM orders WHERE req_id = ?1').bind(reqId).first();
        if (p) return priorJson(req, p);
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
:root{color-scheme:light dark;--bg:#f6f1ea;--card:#fff;--tx:#1b120d;--tx2:#6b5c52;--line:#e6dbd0;--or:#9c2b1e}
@media (prefers-color-scheme:dark){:root{--bg:#140f0c;--card:#1e1713;--tx:#f4ece3;--tx2:#ab9b8e;--line:#3a2e27;--or:#f07a5c}}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--tx);font:16px/1.45 system-ui,-apple-system,"Segoe UI",sans-serif}
main{max-width:960px;margin:0 auto;padding:20px 16px 48px}h1{font-size:1.5rem;margin:0 0 4px}p.s{margin:0 0 18px;color:var(--tx2)}
.msg{padding:10px 14px;border-radius:10px;background:var(--card);border:1px solid var(--line);margin:0 0 16px}
table{width:100%;border-collapse:collapse;background:var(--card);border:1px solid var(--line);border-radius:12px;overflow:hidden}
th,td{text-align:left;padding:10px 12px;border-bottom:1px solid var(--line);vertical-align:top}th{font-size:.8rem;text-transform:uppercase;letter-spacing:.06em;color:var(--tx2)}
tr:last-child td{border-bottom:0}td small{color:var(--tx2)}a{color:var(--or)}td.it{white-space:pre-wrap;overflow-wrap:anywhere}
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
    'SELECT id, date, win, items, name, phone, created_at FROM orders WHERE date >= ?1 ORDER BY date, win, created_at'
  ).bind(now.date).all();
  const rows = rs.results || [];
  const done = url.searchParams.get('preklicano');
  let html = `<h1>Naročila za prevzem · Mesarstvo Bradač</h1><p class="s">Prihajajoča naročila (${rows.length}). Stranko pokličite in naročilo potrdite. Podatki se samodejno izbrišejo 2 dni po prevzemu. Povezave ne delite.</p>`;
  if (done) html += `<p class="msg">Naročilo ${esc(done)} je preklicano.</p>`;
  if (!rows.length) html += '<p class="msg">Ni prihajajočih naročil.</p>';
  else {
    html += '<table><thead><tr><th>Prevzem</th><th>Ime</th><th>Telefon</th><th>Naročilo</th><th>Št.</th><th></th></tr></thead><tbody>';
    let day = '';
    for (const r of rows) {
      if (r.date !== day) {
        day = r.date;
        const [y, m, d] = day.split('-').map(Number);
        html += `<tr class="day"><td colspan="6">${esc(DL[weekday(day)])}, ${d}. ${m}. ${y}${day === now.date ? ' · danes' : ''}</td></tr>`;
      }
      const w = findWin(r.date, r.win);
      html += `<tr><td>${w ? `${w[1]}.00–${w[2]}.00` : esc(r.win)}</td><td>${esc(r.name)}</td>`
        + `<td><a href="tel:${esc(r.phone.replace(/[^0-9+]/g, ''))}">${esc(r.phone)}</a></td><td class="it">${esc(r.items)}</td><td><small>${esc(r.id)}</small></td>`
        + `<td><details><summary>Prekliči</summary><form method="post" action="/admin/cancel"><input type="hidden" name="key" value="${esc(key)}"><input type="hidden" name="id" value="${esc(r.id)}"><button type="submit">Da, prekliči ${esc(r.id)}</button></form></details></td></tr>`;
    }
    html += '</tbody></table>';
  }
  return new Response(page('Naročila · Mesarstvo Bradač', html), { headers: adminHeaders() });
}
async function cancel(req, env) {
  let form;
  try { form = await req.formData(); } catch { return new Response('Napačna zahteva.', { status: 400, headers: adminHeaders() }); }
  const key = String(form.get('key') || ''), id = String(form.get('id') || '');
  if (!env.ADMIN_KEY || !safeEqual(key, env.ADMIN_KEY)) {
    if ((await hit(env, req, 'admin-fail')) > ADMIN_FAIL_LIMIT) return new Response('Preveč poskusov.', { status: 429, headers: adminHeaders() });
    return new Response('Ni dostopa.', { status: 403, headers: adminHeaders() });
  }
  if (!/^MB-[2-9A-HJ-NP-Z]{5}$/.test(id)) return new Response('Napačna številka.', { status: 400, headers: adminHeaders() });
  await env.DB.prepare('DELETE FROM orders WHERE id = ?1').bind(id).run();
  return new Response(null, { status: 303, headers: { ...adminHeaders(), Location: `/admin?key=${encodeURIComponent(key)}&preklicano=${encodeURIComponent(id)}` } });
}

export default {
  async fetch(req, env, ctx) {
    const url = new URL(req.url);
    try {
      if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors(req) });
      if (url.pathname === '/windows' && req.method === 'GET') return await windows(req, env);
      if (url.pathname === '/order' && req.method === 'POST') return await order(req, env, ctx);
      if (url.pathname === '/admin' && req.method === 'GET') return await admin(req, env, url);
      if (url.pathname === '/admin/cancel' && req.method === 'POST') return await cancel(req, env);
      if (url.pathname === '/') return json(req, 200, { ok: true, service: 'ak-booking-mesarstvo-bradac' });
      return json(req, 404, { ok: false, error: 'not_found' });
    } catch (e) {
      console.error('order error', String(e && e.message || e));
      return json(req, 500, { ok: false, error: 'server' });
    }
  },
  async scheduled(_ev, env, ctx) { ctx.waitUntil(purge(env)); },
};

// exported for local tests
export const _t = { ljNow, addDays, isDate, weekday, findWin, winOpen, winLabel, clean, CAPACITY, DAYS, LEAD_H, WEEK };
