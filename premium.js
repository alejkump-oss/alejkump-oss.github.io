// Homepage interactions (index.html), rebuilt 2026-10-07. Vanilla JS, no
// dependency, one small local file loaded with `defer`. Everything here is
// progressive enhancement: without it, every section is visible, the hero
// shows its still poster and the phone shows its first screenshot.
//
// Motion (hero video, reveal-on-scroll, auto-cycling phone, tilt) is skipped
// entirely when the visitor asks for reduced motion, and the video is also
// skipped on Save-Data and on low-memory devices. Nothing is stored in the
// browser: no cookie, no localStorage.
(function () {
  'use strict';

  var mq = function (q) { return window.matchMedia && window.matchMedia(q).matches; };
  var reduceMotion = mq('(prefers-reduced-motion: reduce)');
  var conn = navigator.connection || {};
  var saveData = conn.saveData === true || /(^|-)2g$/.test(conn.effectiveType || '');
  var lowMemory = typeof navigator.deviceMemory === 'number' && navigator.deviceMemory > 0 && navigator.deviceMemory < 2;

  function heroVideo() {
    var v = document.querySelector('.hero-video');
    if (!v || reduceMotion || saveData || lowMemory) return;
    var tall = mq('(max-aspect-ratio: 4/5)');
    var key = tall ? 'tall' : 'wide';
    var canWebm = v.canPlayType('video/webm; codecs="vp9"');
    var src = canWebm ? v.getAttribute('data-' + key + '-webm') : v.getAttribute('data-' + key + '-mp4');
    if (!src) return;
    v.muted = true;
    v.setAttribute('muted', '');
    v.src = src;
    v.addEventListener('playing', function () { v.classList.add('playing'); }, { once: true });
    var p = v.play();
    if (p && p.catch) p.catch(function () { /* autoplay refused: the poster stays */ });
    // Pause when the hero is off-screen, to save battery.
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          if (e.isIntersecting) { var q = v.play(); if (q && q.catch) q.catch(function () {}); } else { v.pause(); }
        });
      }).observe(v);
    }
  }

  function reveal() {
    var els = Array.prototype.slice.call(document.querySelectorAll('[data-reveal]'));
    if (!els.length) return;
    if (reduceMotion || !('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('in'); });
      return;
    }
    // Stagger siblings that share a parent, so grids cascade in.
    els.forEach(function (el) {
      var sibs = Array.prototype.filter.call(el.parentNode.children, function (c) { return c.hasAttribute('data-reveal'); });
      var i = sibs.indexOf(el);
      if (i > 0) el.style.setProperty('--d', Math.min(i, 5) * 0.08 + 's');
    });
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    els.forEach(function (el) { io.observe(el); });
  }

  function chrome() {
    var header = document.querySelector('header.site');
    var hero = document.querySelector('.hero');
    var bar = document.querySelector('.callbar');
    var finalCta = document.querySelector('.final');
    if (!hero) return;
    var heroGone = false, finalIn = false;
    function sync() {
      if (header) header.classList.toggle('scrolled', heroGone);
      if (bar) bar.classList.toggle('show', heroGone && !finalIn);
    }
    if (!('IntersectionObserver' in window)) { heroGone = true; sync(); return; }
    new IntersectionObserver(function (es) {
      heroGone = !es[0].isIntersecting; sync();
    }, { threshold: 0.15 }).observe(hero);
    if (finalCta) {
      new IntersectionObserver(function (es) {
        finalIn = es[0].isIntersecting; sync();
      }, { threshold: 0.2 }).observe(finalCta);
    }
  }

  // Three demo screenshots on the hero phone. Dots always work (a click is
  // not the motion reduced-motion asks us to avoid); the timer does not run
  // under reduced motion.
  function screenCycle() {
    var screen = document.querySelector('.phone-screen');
    var dots = document.querySelector('.phone-dots');
    if (!screen) return;
    var frames = Array.prototype.slice.call(screen.querySelectorAll('.screen-img'));
    if (frames.length < 2) return;
    var i = 0, timer = null;
    function show(n) {
      frames[i].classList.remove('active');
      if (dots) dots.children[i].setAttribute('aria-current', 'false');
      i = (n + frames.length) % frames.length;
      frames[i].classList.add('active');
      if (dots) dots.children[i].setAttribute('aria-current', 'true');
    }
    function reset() {
      if (timer) clearInterval(timer);
      if (!reduceMotion) timer = setInterval(function () { show(i + 1); }, 3800);
    }
    if (dots) {
      Array.prototype.forEach.call(dots.children, function (b, idx) {
        b.addEventListener('click', function () { show(idx); reset(); });
      });
    }
    reset();
  }

  function phoneTilt() {
    if (reduceMotion || !mq('(hover: hover) and (pointer: fine)')) return;
    var stage = document.querySelector('.hero-phone');
    var phone = document.querySelector('.phone');
    if (!stage || !phone) return;
    stage.addEventListener('pointermove', function (e) {
      var r = stage.getBoundingClientRect();
      var px = (e.clientX - r.left) / r.width - 0.5;
      var py = (e.clientY - r.top) / r.height - 0.5;
      phone.style.setProperty('--tilty', (px * 18 - 4).toFixed(2) + 'deg');
      phone.style.setProperty('--tiltx', (-py * 12).toFixed(2) + 'deg');
    });
    stage.addEventListener('pointerleave', function () {
      phone.style.removeProperty('--tilty');
      phone.style.removeProperty('--tiltx');
    });
  }

  function start() {
    heroVideo();
    reveal();
    chrome();
    screenCycle();
    phoneTilt();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
