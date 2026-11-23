/* AK agencija – site v2. Phone menu + scroll reveal. No dependencies. */
(function () {
  'use strict';

  var reduce = false;
  try { reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}

  /* ---- phone menu ---- */
  var toggle = document.getElementById('nav-toggle');
  var panel = document.getElementById('nav-panel');
  if (toggle && panel) {
    var setOpen = function (open) {
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      panel.hidden = !open;
      document.body.classList.toggle('nav-open', open);
    };
    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });
    panel.addEventListener('click', function (e) {
      var a = e.target.closest ? e.target.closest('a') : null;
      if (a) setOpen(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') { setOpen(false); toggle.focus(); }
    });
    try {
      var mq = window.matchMedia('(min-width: 900px)');
      var onChange = function (ev) { if (ev.matches) setOpen(false); };
      if (mq.addEventListener) mq.addEventListener('change', onChange); else if (mq.addListener) mq.addListener(onChange);
    } catch (e) {}
  }

  /* ---- scroll reveal ---- */
  var items = document.querySelectorAll('.reveal');
  if (!items.length) return;
  var showAll = function () { for (var i = 0; i < items.length; i++) items[i].classList.add('in'); };
  if (reduce || !('IntersectionObserver' in window)) { showAll(); return; }
  var io = new IntersectionObserver(function (entries) {
    for (var i = 0; i < entries.length; i++) {
      if (entries[i].isIntersecting) { entries[i].target.classList.add('in'); io.unobserve(entries[i].target); }
    }
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
  for (var j = 0; j < items.length; j++) io.observe(items[j]);
})();
