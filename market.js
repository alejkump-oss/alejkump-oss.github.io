// MARKET, agent tedna (19.-23. 10. 2026). Used by market.html and by the
// banner at the top of index.html. Vanilla JS, no dependency, nothing stored
// in the browser.
//
// ---------------------------------------------------------------------------
// THE ONLY PLACE TO EDIT. Paste each day's Stripe Payment Link between the
// quotes, e.g. 'https://buy.stripe.com/abc123'. Anything that is not a
// https://buy.stripe.com/... link is ignored, and the button then falls back
// to "Naročite po e-pošti" (mailto). Deactivate each day's link in Stripe when
// that day ends, because a Payment Link keeps working after the page stops
// showing it.
// ---------------------------------------------------------------------------
var MARKET_CONFIG = {
  STRIPE_LINK_PON: '',
  STRIPE_LINK_TOR: '',
  STRIPE_LINK_SRE: '',
  STRIPE_LINK_CET: '',
  STRIPE_LINK_PET: '',
  EMAIL: 'alej.kump@gmail.com',
  TIMEZONE: 'Europe/Ljubljana'
};

(function (root) {
  'use strict';

  var FEATURES = {
    1: 'Reeli in objave (ustvarjanje in načrtovanje)',
    2: 'Dnevne zgodbe',
    3: 'Odgovori na komentarje',
    4: 'Odgovori na DM (samo tistim, ki pišejo prvi)',
    5: 'Tedenski načrt vsebin + analitika'
  };

  var WEEK = [
    { date: '2026-10-19', day: 'ponedeljek', short: 'pon', label: 'pon 19. 10.', price: 100, features: [1, 2, 3, 4, 5], link: 'STRIPE_LINK_PON' },
    { date: '2026-10-20', day: 'torek', short: 'tor', label: 'tor 20. 10.', price: 80, features: [1, 2, 3, 5], link: 'STRIPE_LINK_TOR' },
    { date: '2026-10-21', day: 'sreda', short: 'sre', label: 'sre 21. 10.', price: 60, features: [1, 2, 5], link: 'STRIPE_LINK_SRE' },
    { date: '2026-10-22', day: 'četrtek', short: 'čet', label: 'čet 22. 10.', price: 40, features: [1, 5], link: 'STRIPE_LINK_CET' },
    { date: '2026-10-23', day: 'petek', short: 'pet', label: 'pet 23. 10.', price: 20, features: [5], link: 'STRIPE_LINK_PET' }
  ];

  var STRIPE = /^https:\/\/buy\.stripe\.com\/[A-Za-z0-9_-]+$/;

  // Today's calendar date in Ljubljana as YYYY-MM-DD, whatever the visitor's
  // own time zone is.
  function ljDate(now, tz) {
    var parts = new Intl.DateTimeFormat('en-CA', { timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(now);
    var o = {};
    parts.forEach(function (p) { o[p.type] = p.value; });
    return o.year + '-' + o.month + '-' + o.day;
  }

  // Pure: the sale state for a given Ljubljana date.
  //   { phase: 'before' }                       before Monday
  //   { phase: 'open', tier, next, lost }      Mon-Fri
  //   { phase: 'closed' }                       Saturday onwards
  function state(date) {
    if (date < WEEK[0].date) return { phase: 'before', first: WEEK[0] };
    for (var i = 0; i < WEEK.length; i++) {
      if (WEEK[i].date === date) {
        var next = WEEK[i + 1] || null;
        var lost = next ? WEEK[i].features.filter(function (f) { return next.features.indexOf(f) < 0; }) : [];
        return { phase: 'open', index: i, tier: WEEK[i], next: next, lost: lost };
      }
    }
    return { phase: 'closed' };
  }

  function buyHref(tier, cfg) {
    var link = cfg[tier.link];
    if (typeof link === 'string' && STRIPE.test(link)) return { href: link, stripe: true };
    var subject = 'MARKET';
    var body = 'Pozdravljeni,\n\nnaročam MARKET, paket z dne ' + tier.label + ' (' + tier.price + ' €).\n\n' +
      'Instagram račun: @\nIme in priimek oziroma podjetje:\n\nLep pozdrav';
    return {
      href: 'mailto:' + cfg.EMAIL + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body),
      stripe: false
    };
  }

  var api = { FEATURES: FEATURES, WEEK: WEEK, ljDate: ljDate, state: state, buyHref: buyHref, STRIPE: STRIPE };
  if (typeof module !== 'undefined' && module.exports) { module.exports = api; return; }

  // ---------------- DOM ----------------
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }
  function eur(n) { return n + ' €'; }

  function render() {
    var today = ljDate(new Date(), root.MARKET_CONFIG.TIMEZONE);
    var s = state(today);

    // Highlight today's row in the ladder table (market.html).
    var rows = document.querySelectorAll('[data-market-date]');
    Array.prototype.forEach.call(rows, function (r) {
      if (s.phase === 'open' && r.getAttribute('data-market-date') === s.tier.date) {
        r.classList.add('is-today');
        r.setAttribute('aria-current', 'date');
      }
    });

    // Feature cards: mark what today's package includes (market.html).
    var cards = document.querySelectorAll('[data-market-feature]');
    Array.prototype.forEach.call(cards, function (c) {
      var f = +c.getAttribute('data-market-feature');
      var badge = c.querySelector('.mk-inc');
      if (!badge) return;
      if (s.phase !== 'open') { badge.textContent = ''; return; }
      var inc = s.tier.features.indexOf(f) >= 0;
      c.classList.toggle('is-off', !inc);
      badge.textContent = inc ? 'Danes vključeno' : 'Danes ni več vključeno';
    });

    var blocks = document.querySelectorAll('[data-market-today]');
    Array.prototype.forEach.call(blocks, function (b) {
      var compact = b.getAttribute('data-market-today') === 'compact';
      b.textContent = '';
      b.classList.add('ready');

      if (s.phase === 'before') {
        b.appendChild(el('p', 'mk-day', 'Prodaja se začne v ponedeljek, 19. 10.'));
        var pb = el('p', 'mk-price');
        pb.appendChild(el('span', 'mk-amount', String(s.first.price)));
        pb.appendChild(el('span', 'mk-cur', ' €'));
        b.appendChild(pb);
        b.appendChild(el('p', 'mk-sub', 'v ponedeljek, vseh 5 funkcij. Vsak naslednji dan je paket manjši in cenejši, do petka (20 €).'));
        if (compact) {
          var look = el('a', 'btn btn-primary mk-buy', 'Kaj dobite');
          look.href = 'market.html';
          b.appendChild(look);
        }
        return;
      }
      if (s.phase === 'closed') {
        b.appendChild(el('p', 'mk-day', 'Prodaja agenta MARKET je zaključena.'));
        b.appendChild(el('p', 'mk-sub', 'Naslednji agent tedna v ponedeljek.'));
        return;
      }

      var t = s.tier;
      b.appendChild(el('p', 'mk-day', 'Danes, ' + t.day + ' ' + t.label.split(' ')[1] + ' ' + t.label.split(' ')[2]));
      var p = el('p', 'mk-price');
      p.appendChild(el('span', 'mk-amount', String(t.price)));
      p.appendChild(el('span', 'mk-cur', ' €'));
      b.appendChild(p);
      b.appendChild(el('p', 'mk-sub', 'enkratna nastavitev, ' + t.features.length + (t.features.length === 1 ? ' funkcija' : (t.features.length === 2 ? ' funkciji' : (t.features.length < 5 ? ' funkcije' : ' funkcij'))) + '; DDV ni obračunan. Ootto plačujete posebej.'));

      if (!compact) {
        var ul = el('ul', 'mk-list');
        t.features.forEach(function (f) { ul.appendChild(el('li', null, FEATURES[f])); });
        b.appendChild(ul);
      }

      var tom = el('p', 'mk-tomorrow');
      if (s.next) {
        tom.textContent = 'Jutri (' + s.next.label + '): ' + eur(s.next.price) + ', brez funkcije »' + s.lost.map(function (f) { return FEATURES[f]; }).join('«, »') + '«.';
      } else {
        tom.textContent = 'Danes je zadnji dan prodaje. Naslednji agent tedna v ponedeljek.';
      }
      b.appendChild(tom);

      // The compact banner (homepage) never sells directly: the order button
      // lives only on market.html, right under the full description, price
      // and terms (ZVPot-1 čl. 132(2)).
      if (compact) {
        var more = el('a', 'btn btn-primary mk-buy', 'Kaj dobite in naročilo');
        more.href = 'market.html';
        b.appendChild(more);
      } else {
        var h = buyHref(t, root.MARKET_CONFIG);
        var a = el('a', 'btn btn-primary mk-buy', h.stripe ? 'Naročilo z obveznostjo plačila: ' + eur(t.price) : 'Naročite po e-pošti: ' + eur(t.price));
        a.href = h.href;
        b.appendChild(a);
        b.appendChild(el('p', 'mk-note', h.stripe
          ? 'Plačilo s kartico poteka na strani Stripe. Z naročilom se strinjate s pogoji prodaje. Cena velja za dan plačila.'
          : 'Gumb odpre vaš poštni program z že izpolnjenim naročilom. Odgovorim z navodili za plačilo; velja cena dneva, ko pošljete e-pošto.'));
      }
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', render);
  else render();
})(typeof window !== 'undefined' ? window : globalThis);
