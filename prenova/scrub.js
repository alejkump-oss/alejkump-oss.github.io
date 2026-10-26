// prenova/scrub.js — homepage preview interactions, 2026-10-27.
// Vanilla JS, no dependency, nothing stored in the browser (no cookie, no
// localStorage). Progressive enhancement only: without this file the film is a
// still image and the four chapters are ordinary stacked blocks.
//
// The film: scroll position inside .film-track maps to video.currentTime.
//  - source picked once, before loading, by (max-width: 760px)
//  - the clip is fetched whole and played from an object URL, so a seek never
//    waits on the network; if fetch fails the plain URL is used instead
//  - progress is smoothed with a rAF lerp; a seek is never issued while the
//    previous one is still pending (the latest target is applied on 'seeked')
//  - chapters fade by the same smoothed progress, so copy and film stay in step
(function () {
  'use strict';

  var doc = document.documentElement;
  var mm = function (q) { return !!(window.matchMedia && window.matchMedia(q).matches); };
  var reduce = mm('(prefers-reduced-motion: reduce)');

  /* ---------- header menu ---------- */
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

  /* ---------- reveal on scroll ---------- */
  (function reveal() {
    var els = Array.prototype.slice.call(document.querySelectorAll('[data-reveal]'));
    if (!els.length || reduce || !('IntersectionObserver' in window)) return;
    els.forEach(function (el) {
      var sibs = Array.prototype.filter.call(el.parentNode.children, function (c) { return c.hasAttribute('data-reveal'); });
      var i = sibs.indexOf(el);
      if (i > 0) el.style.setProperty('--d', Math.min(i, 5) * 0.09 + 's');
    });
    // Anything already on screen when the script runs stays visible: no flash.
    var vh = window.innerHeight;
    els.forEach(function (el) { if (el.getBoundingClientRect().top < vh) el.classList.add('in'); });
    doc.classList.add('motion');
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });
    els.forEach(function (el) { if (!el.classList.contains('in')) io.observe(el); });
  })();

  /* ---------- the film ---------- */
  var track = document.querySelector('.film-track');
  var video = document.querySelector('.film-video');
  if (!track || !video || !doc.classList.contains('scrub')) return;
  window.__akScrub = true;

  var chapters = Array.prototype.slice.call(document.querySelectorAll('.ch')).map(function (el) {
    return { el: el, from: parseFloat(el.getAttribute('data-from')) || 0, to: parseFloat(el.getAttribute('data-to')) || 1, last: -1 };
  });
  var bar = document.querySelector('.film-progress span');
  var hint = document.querySelector('.film-hint');

  var mobile = mm('(max-width: 760px)');
  var src = video.getAttribute(mobile ? 'data-mobile' : 'data-desktop');
  var poster = video.getAttribute(mobile ? 'data-mobile-poster' : 'data-desktop-poster');
  if (poster) video.poster = poster;
  video.muted = true;
  video.defaultMuted = true;
  video.setAttribute('muted', '');
  video.setAttribute('playsinline', '');
  video.preload = 'auto';

  var duration = 0;
  var ready = false;
  var seeking = false;
  var seekGuard = 0;
  var lastSet = -1;

  function attach(url) {
    video.src = url;
    video.load();
  }
  function startLoad() {
    if (!src) return;
    if (window.fetch && window.URL && URL.createObjectURL) {
      fetch(src, { credentials: 'same-origin' })
        .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.blob(); })
        .then(function (b) { attach(URL.createObjectURL(b)); })
        .catch(function () { attach(src); });
    } else {
      attach(src);
    }
  }
  video.addEventListener('loadedmetadata', function () {
    duration = video.duration || 0;
    // iOS Safari only paints seeked frames after the element has played once.
    var p = video.play();
    if (p && p.then) p.then(function () { video.pause(); kick(); }).catch(function () {});
    else video.pause();
  });
  video.addEventListener('loadeddata', function () {
    ready = duration > 0;
    video.classList.add('ready');
    lastSet = -1;
    kick();
  });
  video.addEventListener('seeked', function () {
    seeking = false;
    clearTimeout(seekGuard);
    kick();
  });
  video.addEventListener('error', function () { video.classList.remove('ready'); ready = false; });

  // Start loading only when the film is near the viewport (it is at the top of
  // the page, so in practice immediately), never twice.
  var loading = false;
  function maybeLoad() { if (!loading) { loading = true; startLoad(); } }

  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
  function progress() {
    var r = track.getBoundingClientRect();
    var span = r.height - window.innerHeight;
    return span > 0 ? clamp(-r.top / span, 0, 1) : 0;
  }

  var FADE = 0.05;
  function chapterAlpha(c, p) {
    var a;
    if (c.from <= 0 && p <= c.from) a = 1;                 // first chapter is up at load
    else if (c.to >= 1 && p >= c.to) a = 1;                // last chapter holds at the end
    else if (p < c.from || p > c.to) a = 0;
    else a = Math.min(c.from <= 0 ? 1 : (p - c.from) / FADE, c.to >= 1 ? 1 : (c.to - p) / FADE, 1);
    return clamp(a, 0, 1);
  }
  function render(p) {
    for (var i = 0; i < chapters.length; i++) {
      var c = chapters[i];
      var a = Math.round(chapterAlpha(c, p) * 100) / 100;
      if (a === c.last) continue;
      c.last = a;
      c.el.style.opacity = a;
      // Rise in from below, drift out upward.
      var mid = (c.from + c.to) / 2;
      var y = (1 - a) * (p < mid ? 24 : -24);
      c.el.style.setProperty('--y', y.toFixed(1) + 'px');
      c.el.classList.toggle('on', a > 0.5);
    }
    if (bar) bar.style.transform = 'scaleX(' + p.toFixed(4) + ')';
    if (hint) hint.classList.toggle('gone', p > 0.02);
  }

  var sp = progress();   // smoothed progress
  var raf = 0;
  function seek(p) {
    if (!ready || seeking) return;
    var t = clamp(p * duration, 0, Math.max(0, duration - 0.04));
    if (Math.abs(t - lastSet) < 1 / 90) return;
    seeking = true;
    lastSet = t;
    // A 'seeked' that never arrives must not freeze the film.
    clearTimeout(seekGuard);
    seekGuard = setTimeout(function () { seeking = false; kick(); }, 300);
    try { video.currentTime = t; } catch (e) { seeking = false; }
  }
  function tick() {
    raf = 0;
    var p = progress();
    var d = p - sp;
    sp = Math.abs(d) < 0.0004 ? p : sp + d * 0.14;
    render(sp);
    seek(sp);
    var settledVideo = !ready || Math.abs(clamp(sp * duration, 0, Math.max(0, duration - 0.04)) - lastSet) < 1 / 90;
    if (sp !== p || !settledVideo) raf = requestAnimationFrame(tick);
  }
  function kick() { if (!raf) raf = requestAnimationFrame(tick); }

  window.addEventListener('scroll', kick, { passive: true });
  window.addEventListener('resize', kick);
  render(sp);
  maybeLoad();
  kick();

  // Keyboard users: tabbing into a chapter that is faded out scrolls the page
  // to the point in the film where that chapter is fully shown.
  chapters.forEach(function (c) {
    c.el.addEventListener('focusin', function () {
      if (c.last > 0.9) return;
      var r = track.getBoundingClientRect();
      var span = r.height - window.innerHeight;
      var at = c.to >= 1 ? 1 : (c.from + c.to) / 2;
      var y = window.pageYOffset + r.top + span * at;
      window.scrollTo(0, Math.round(y));
      sp = at;
      render(sp);
      kick();
    });
  });
})();
