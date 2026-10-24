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
//
// 2026-10-18: card payment is NOT offered yet. market.html (step 01, footer)
// and pogoji-market.html (points 3, 4, 8) describe e-mail orders with bank
// transfer only. Pasting a link here without first adding card payment back
// to that copy and to the terms would sell on terms the buyer was never shown.
//
// 2026-10-18 (later the same day, owner decision): MARKET is done-for-you for
// one month. The buyer connects Instagram to our system and our agents run it;
// the buyer never deals with our internal tool. Buyer-facing text in this file
// therefore names no tool (the tool is named only in pogoji-market.html,
// point 8, as a sub-processor). CAPACITY is a real weekly limit, not scarcity
// copy: change it only when the real limit changes.
// ---------------------------------------------------------------------------
var MARKET_CONFIG = {
  STRIPE_LINK_PON: 'https://buy.stripe.com/3cI5kCdQqc4a9Gk9kJdMI01',
  STRIPE_LINK_TOR: 'https://buy.stripe.com/aFa7sK4fQ4BI2dSaoNdMI00',
  STRIPE_LINK_SRE: 'https://buy.stripe.com/cNibJ0bIi1pw2dSfJ7dMI02',
  STRIPE_LINK_CET: 'https://buy.stripe.com/14A6oG5jU2tAg4I40pdMI03',
  STRIPE_LINK_PET: 'https://buy.stripe.com/bJe6oGbIi9W26u8cwVdMI04',
  EMAIL: 'alej.kump@gmail.com',
  CAPACITY: 5,
  TIMEZONE: 'Europe/Ljubljana'
};

(function (root) {
  'use strict';

  var FEATURES = {
    1: 'Reeli in objave: pripravimo in objavimo 3 reele na teden (12 v mesecu)',
    2: 'Dnevne zgodbe: 1 zgodba vsak delavnik',
    3: 'Odgovori na komentarje v 24 urah ob delavnikih',
    4: 'Odgovori na DM tistim, ki pišejo prvi, v 24 urah ob delavnikih',
    5: 'Tedenski načrt + kratko poročilo'
  };

  var WEEK = [
    { date: '2026-10-19', day: 'ponedeljek', short: 'pon', label: 'pon 19. 10.', price: 100, features: [1, 2, 3, 4, 5], link: 'STRIPE_LINK_PON' },
    { date: '2026-10-20', day: 'torek', short: 'tor', label: 'tor 20. 10.', price: 80, features: [1, 2, 3, 5], link: 'STRIPE_LINK_TOR' },
    { date: '2026-10-21', day: 'sreda', short: 'sre', label: 'sre 21. 10.', price: 60, features: [1, 2, 5], link: 'STRIPE_LINK_SRE' },
    { date: '2026-10-22', day: 'četrtek', short: 'čet', label: 'čet 22. 10.', price: 40, features: [1, 5], link: 'STRIPE_LINK_CET' },
    { date: '2026-10-23', day: 'petek', short: 'pet', label: 'pet 23. 10.', price: 20, features: [5], link: 'STRIPE_LINK_PET' }
  ];

  var STRIPE = /^https:\/\/buy\.stripe\.com\/[A-Za-z0-9_-]+$/;

  // The Monday the next agent of the week starts (owner decision 2026-10-18:
  // a new agent every week). Named only on the weekend before it.
  var NEXT_MONDAY = { date: '2026-10-26', label: 'ponedeljek, 26. 10.' };
  var NEXT_AGENT = { href: 'google.html' };

  // 'pon 19. 10.' -> '19. 10.'
  function dayMonth(tier) { return tier.label.split(' ').slice(1).join(' '); }

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
  //   { phase: 'closed', weekend }              Saturday onwards; weekend is
  //                                             true only before NEXT_MONDAY
  function state(date) {
    if (date < WEEK[0].date) return { phase: 'before', first: WEEK[0] };
    for (var i = 0; i < WEEK.length; i++) {
      if (WEEK[i].date === date) {
        var next = WEEK[i + 1] || null;
        var lost = next ? WEEK[i].features.filter(function (f) { return next.features.indexOf(f) < 0; }) : [];
        return { phase: 'open', index: i, tier: WEEK[i], next: next, lost: lost };
      }
    }
    return { phase: 'closed', weekend: date < NEXT_MONDAY.date };
  }

  function buyHref(tier, cfg) {
    var link = cfg[tier.link];
    if (typeof link === 'string' && STRIPE.test(link)) return { href: link, stripe: true };
    var subject = 'MARKET';
    var body = 'Pozdravljeni,\n\nnaročam MARKET, 1 mesec upravljanja Instagrama, paket dneva ' + tier.day + ', ' + dayMonth(tier) + ' (' + tier.price + ' € za prvi mesec).\n\n' +
      'Instagram račun: @\nVrsta računa (Business, Creator ali ne vem):\nIme in priimek oziroma podjetje:\n\nLep pozdrav';
    return {
      href: 'mailto:' + cfg.EMAIL + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body),
      stripe: false
    };
  }

  var api = { FEATURES: FEATURES, WEEK: WEEK, NEXT_MONDAY: NEXT_MONDAY, ljDate: ljDate, state: state, buyHref: buyHref, STRIPE: STRIPE };
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
        b.appendChild(el('p', 'mk-day', 'Naročite že danes – po ponedeljkovi ceni'));
        var pb = el('p', 'mk-price');
        pb.appendChild(el('span', 'mk-amount', String(s.first.price)));
        pb.appendChild(el('span', 'mk-cur', ' €'));
        b.appendChild(pb);
        b.appendChild(el('p', 'mk-sub', 'Danes in v ponedeljek: 1 mesec upravljanja z vsemi 5 funkcijami. Vsak naslednji dan je paket manjši in cenejši, do petka (20 €). Ta teden največ ' + root.MARKET_CONFIG.CAPACITY + ' strank.'));
        if (compact) {
          var look = el('a', 'btn btn-primary mk-buy', 'Kaj dobite');
          look.href = 'market.html';
          b.appendChild(look);
        } else {
          var early = buyHref(s.first, root.MARKET_CONFIG);
          var eb = el('a', 'btn btn-primary mk-buy', 'Naročim za ' + eur(s.first.price) + ' (po e-pošti)');
          eb.href = early.href;
          b.appendChild(eb);
        }
        return;
      }
      if (s.phase === 'closed') {
        b.appendChild(el('p', 'mk-day', 'Prodaja agenta MARKET je zaključena.'));
        // 2026-10-24: the next agent of the week is GOOGLE (google.html).
        var nx = el('p', 'mk-sub', s.weekend ? 'Vsak teden nov agent tedna – naslednji v ' + NEXT_MONDAY.label + ': ' : 'Zdaj je agent tedna: ');
        var go = el('a', null, 'GOOGLE, pomoč pri Google ocenah in profilu (22 € na mesec)');
        go.href = NEXT_AGENT.href;
        nx.appendChild(go);
        b.appendChild(nx);
        var gb = el('a', 'btn btn-primary mk-buy', 'Kaj dobite pri agentu GOOGLE');
        gb.href = NEXT_AGENT.href;
        b.appendChild(gb);
        return;
      }

      var t = s.tier;
      b.appendChild(el('p', 'mk-day', 'Danes, ' + t.day + ', ' + dayMonth(t)));
      var p = el('p', 'mk-price');
      p.appendChild(el('span', 'mk-amount', String(t.price)));
      p.appendChild(el('span', 'mk-cur', ' €'));
      b.appendChild(p);
      b.appendChild(el('p', 'mk-sub', 'prvi mesec upravljanja, ' + t.features.length + (t.features.length === 1 ? ' funkcija' : (t.features.length === 2 ? ' funkciji' : (t.features.length < 5 ? ' funkcije' : ' funkcij'))) + '; DDV ni obračunan. Brez obveznosti po mesecu. Ta teden največ ' + root.MARKET_CONFIG.CAPACITY + ' strank.'));

      if (!compact) {
        var ul = el('ul', 'mk-list');
        t.features.forEach(function (f) { ul.appendChild(el('li', null, FEATURES[f])); });
        b.appendChild(ul);
      }

      var tom = el('p', 'mk-tomorrow');
      if (s.next) {
        tom.textContent = 'Jutri (' + s.next.label + '): ' + eur(s.next.price) + ', brez funkcije »' + s.lost.map(function (f) { return FEATURES[f]; }).join('«, »') + '«.';
      } else {
        tom.textContent = 'Danes je zadnji dan prodaje. Vsak teden nov agent tedna.';
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
        var a = el('a', 'btn btn-primary mk-buy', h.stripe ? 'Naročilo z obveznostjo plačila: ' + eur(t.price) : 'Naročite po e-pošti');
        a.href = h.href;
        b.appendChild(a);
        b.appendChild(el('p', 'mk-note', h.stripe
          ? 'Plačilo s kartico poteka na strani Stripe. Z naročilom se strinjate s pogoji prodaje. Cena velja za dan plačila.'
          : 'Gumb odpre vaš poštni program z že izpolnjenim naročilom. Odgovorim s potrdilom in navodili za plačilo na TRR; velja cena dneva, ko pošljete e-pošto.'));
        if (h.stripe) {
          var mail = buyHref(t, { EMAIL: root.MARKET_CONFIG.EMAIL });
          var alt = el('a', 'mk-alt', 'Raje plačate z nakazilom na TRR? Naročite po e-pošti');
          alt.href = mail.href;
          b.appendChild(alt);
        }
      }
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', render);
  else render();
})(typeof window !== 'undefined' ? window : globalThis);
