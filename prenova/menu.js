/* Header menu (phones: the ☰ button opens the page list) and reveal-on-scroll.
   Split out of scrub.js on 2026-10-28: the homepage dropped scrub.js for the
   intro film, which left the menu button with no handler on phones. */
(function () {
  var doc = document.documentElement;
  var reduce = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  (function menu() {
    var head = document.getElementById('glava');
    var btn = head && head.querySelector('.burger');
    if (!btn) return;
    function set(open) {
      head.classList.toggle('open', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    }
    btn.addEventListener('click', function () { set(!head.classList.contains('open')); });
    head.addEventListener('click', function (e) { if (e.target.closest && e.target.closest('nav a')) set(false); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && head.classList.contains('open')) { set(false); btn.focus(); }
    });
  })();

  (function reveal() {
    var els = Array.prototype.slice.call(document.querySelectorAll('[data-reveal]'));
    if (!els.length || reduce || !('IntersectionObserver' in window)) return;
    els.forEach(function (el) {
      var sibs = Array.prototype.filter.call(el.parentNode.children, function (c) { return c.hasAttribute('data-reveal'); });
      var i = sibs.indexOf(el);
      if (i > 0) el.style.setProperty('--d', Math.min(i, 5) * 0.09 + 's');
    });
    // Anything already on screen stays visible: no flash.
    var vh = window.innerHeight;
    els.forEach(function (el) { if (el.getBoundingClientRect().top < vh) el.classList.add('in'); });
    doc.classList.add('motion');
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });
    els.forEach(function (el) { if (!el.classList.contains('in')) io.observe(el); });
  })();
})();
