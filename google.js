// GOOGLE, agent tedna (naročila 26. 10.-22. 11. 2026), 22 € na mesec.
// Used by google.html. Vanilla JS, no dependency, nothing stored in the
// browser.
//
// ---------------------------------------------------------------------------
// THE ONLY PLACE TO EDIT. Paste the Stripe Payment Link for the 22 €/month
// subscription between the quotes, e.g. 'https://buy.stripe.com/abc123'.
// Anything that is not a https://buy.stripe.com/... link is ignored, and every
// [data-google-buy] button then stays the prefilled e-mail order (mailto) that
// is already in the HTML, so the page works with JS off and with no link set.
//
// The Payment Link is a RECURRING price (22 EUR, monthly, no customer limit;
// plink_1UUDKjD6oEwK8qbtrvpl73CA, created 2026-10-25). google.html and
// pogoji-google.html (points 4 and 6) promise an automatic monthly charge and
// cancellation by e-mail (the owner cancels the subscription in Stripe). Deactivate the link in Stripe after
// 22. 11. 2026, when the sale window ends: a Payment Link keeps working after
// the page stops showing it. Existing subscribers keep the 22 € price.
//
// CAPACITY is a real limit (one person with agents), not scarcity copy.
// ---------------------------------------------------------------------------
var GOOGLE_CONFIG = {
  STRIPE_LINK_GOOGLE: 'https://buy.stripe.com/6oU9AScMm9W25q42WldMI0d',
  EMAIL: 'alej.kump@gmail.com',
  CAPACITY: 10,
  PRICE: 22
};

(function (root) {
  'use strict';

  var STRIPE = /^https:\/\/buy\.stripe\.com\/[A-Za-z0-9_-]+$/;

  function mailHref(cfg, transfer) {
    var body = 'Pozdravljeni,\n\nnaročam GOOGLE, pomoč pri Google ocenah in profilu (' + cfg.PRICE + ' € na mesec)' +
      (transfer ? ', plačilo z nakazilom na TRR' : '') + '.\n\n' +
      'Ime in priimek:\nPodjetje:\nPovezava do Google profila (Google Zemljevidi):\n\nLep pozdrav';
    return 'mailto:' + cfg.EMAIL + '?subject=' + encodeURIComponent('GOOGLE') + '&body=' + encodeURIComponent(body);
  }

  // Pure: what the buy button should be for a given config.
  function buy(cfg) {
    var link = cfg.STRIPE_LINK_GOOGLE;
    if (typeof link === 'string' && STRIPE.test(link)) return { href: link, stripe: true };
    return { href: mailHref(cfg, false), stripe: false };
  }

  var api = { STRIPE: STRIPE, buy: buy, mailHref: mailHref };
  if (typeof module !== 'undefined' && module.exports) { module.exports = api; return; }

  function render() {
    var cfg = root.GOOGLE_CONFIG;
    var b = buy(cfg);
    if (!b.stripe) return; // the HTML already carries the e-mail order

    Array.prototype.forEach.call(document.querySelectorAll('[data-google-buy]'), function (a) {
      a.href = b.href;
      a.setAttribute('rel', 'noopener');
      a.textContent = 'Naročilo z obveznostjo plačila: ' + cfg.PRICE + ' € na mesec';
    });
    Array.prototype.forEach.call(document.querySelectorAll('[data-google-note]'), function (p) {
      p.textContent = 'Plačilo s kartico poteka na strani Stripe. ' + cfg.PRICE + ' € se samodejno bremeni vsak mesec, dokler ne odpoveste (z e-pošto na alej.kump@gmail.com). Z naročilom se strinjate s pogoji prodaje.';
    });
    Array.prototype.forEach.call(document.querySelectorAll('[data-google-alt]'), function (p) {
      p.textContent = '';
      var a = document.createElement('a');
      a.className = 'mk-alt';
      a.href = mailHref(cfg, true);
      a.textContent = 'Raje plačate z nakazilom na TRR? Naročite po e-pošti';
      p.appendChild(a);
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', render);
  else render();
})(typeof window !== 'undefined' ? window : globalThis);
