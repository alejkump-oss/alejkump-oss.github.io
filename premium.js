// Premium interactions for spletne-strani.html. Vanilla JS, no dependency,
// one small file, loaded with `defer`. Everything here is progressive
// enhancement: every element this script touches already looks correct in
// the HTML/CSS alone (fixed 3D tilt on the phone, first screenshot shown,
// flat package cards) if this file fails to load or is blocked.
//
// Motion is gated once, at the top, by three independent signals, and NONE
// of the code below runs its timers or listeners when any of them says no:
//   1. prefers-reduced-motion: reduce
//   2. a simple low-end heuristic (deviceMemory / hardwareConcurrency)
//   3. a short first-paint frame-time probe — if the browser cannot keep up
//      with plain rAF callbacks before we even start animating, more motion
//      would make it worse, not better.
(function () {
  'use strict';

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var lowMemory = typeof navigator.deviceMemory === 'number' && navigator.deviceMemory > 0 && navigator.deviceMemory < 4;
  var lowCores = typeof navigator.hardwareConcurrency === 'number' && navigator.hardwareConcurrency > 0 && navigator.hardwareConcurrency <= 2;

  function start(enableMotion) {
    var root = document.documentElement;
    if (!enableMotion) root.classList.add('no-motion');

    initScreenCycle(enableMotion);
    if (enableMotion) {
      initPhoneTilt();
      initCardTilt();
      initParallax();
    }
  }

  // Three screenshots cycling on the hero phone. Dots are always clickable
  // (a user-initiated change is not the "motion" prefers-reduced-motion asks
  // us to avoid); only the automatic timer and the cross-fade transition are
  // conditional on enableMotion / the no-motion class set in CSS.
  function initScreenCycle(enableMotion) {
    var screen = document.querySelector('.phone-screen');
    if (!screen) return;
    var frames = Array.prototype.slice.call(screen.querySelectorAll('.screen-img'));
    var dotsWrap = document.querySelector('.phone-dots');
    if (frames.length < 2) return;
    var i = frames.findIndex(function (f) { return f.classList.contains('active'); });
    if (i < 0) i = 0;

    function show(n) {
      frames[i].classList.remove('active');
      if (dotsWrap) dotsWrap.children[i].setAttribute('aria-current', 'false');
      i = (n + frames.length) % frames.length;
      frames[i].classList.add('active');
      if (dotsWrap) dotsWrap.children[i].setAttribute('aria-current', 'true');
    }

    if (dotsWrap) {
      Array.prototype.forEach.call(dotsWrap.children, function (btn, idx) {
        btn.addEventListener('click', function () { show(idx); resetTimer(); });
      });
    }

    var timer = null;
    function resetTimer() {
      if (timer) clearInterval(timer);
      if (enableMotion) timer = setInterval(function () { show(i + 1); }, 4200);
    }
    resetTimer();
  }

  // Pointer-driven tilt on the hero phone, for hover-capable pointers only.
  // Touch devices get a gentle scroll-position tilt instead (initParallax
  // covers the translateY layers; this adds a small rotate to the phone
  // itself based on how far it has scrolled through the viewport).
  function initPhoneTilt() {
    var stage = document.querySelector('.phone-stage');
    var phone = document.querySelector('.phone-3d');
    if (!stage || !phone) return;
    var canHover = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    if (canHover) {
      stage.addEventListener('pointermove', function (e) {
        var r = stage.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        phone.style.setProperty('--tilty', (px * 12).toFixed(2) + 'deg');
        phone.style.setProperty('--tiltx', (-py * 10).toFixed(2) + 'deg');
      });
      stage.addEventListener('pointerleave', function () {
        phone.style.setProperty('--tilty', '0deg');
        phone.style.setProperty('--tiltx', '0deg');
      });
    } else {
      var raf = null;
      window.addEventListener('scroll', function () {
        if (raf) return;
        raf = requestAnimationFrame(function () {
          raf = null;
          var r = stage.getBoundingClientRect();
          var centre = r.top + r.height / 2 - window.innerHeight / 2;
          var t = Math.max(-1, Math.min(1, centre / (window.innerHeight / 2)));
          phone.style.setProperty('--tilty', (t * -6).toFixed(2) + 'deg');
        });
      }, { passive: true });
    }
  }

  // Package cards: small pointer-driven tilt, hover-capable pointers only.
  function initCardTilt() {
    if (!(window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches)) return;
    var cards = document.querySelectorAll('.package-card');
    cards.forEach(function (card) {
      card.addEventListener('pointermove', function (e) {
        var r = card.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        card.style.setProperty('--ry', (px * 8).toFixed(2) + 'deg');
        card.style.setProperty('--rx', (-py * 8).toFixed(2) + 'deg');
      });
      card.addEventListener('pointerleave', function () {
        card.style.setProperty('--ry', '0deg');
        card.style.setProperty('--rx', '0deg');
      });
    });
  }

  // Depth parallax for the two desktop-only decorative photo layers.
  function initParallax() {
    var detail = document.querySelector('.hero-detail-layer');
    var processBg = document.querySelector('.process-bg-layer');
    if (!detail && !processBg) return;
    var raf = null;
    function update() {
      raf = null;
      var y = window.scrollY || window.pageYOffset;
      if (detail) detail.style.setProperty('--parallax-y', (y * 0.06).toFixed(1) + 'px');
      if (processBg) {
        var r = processBg.getBoundingClientRect();
        var local = (window.innerHeight - r.top) * 0.04;
        processBg.style.setProperty('--parallax-y2', local.toFixed(1) + 'px');
      }
    }
    window.addEventListener('scroll', function () {
      if (raf) return;
      raf = requestAnimationFrame(update);
    }, { passive: true });
    update();
  }

  // A short frame-time probe: if we can't get a handful of animation frames
  // in under ~40ms apiece (well above the 16.7ms a 60fps display needs), the
  // device is struggling right now and extra transforms would show as jank,
  // not polish. Runs once, costs under 200ms, then decides.
  function probeThenStart() {
    if (reduceMotion || lowMemory || lowCores) { start(false); return; }
    var samples = [];
    var last = performance.now();
    function frame(t) {
      samples.push(t - last);
      last = t;
      if (samples.length < 6) { requestAnimationFrame(frame); return; }
      var avg = samples.reduce(function (a, b) { return a + b; }, 0) / samples.length;
      start(avg <= 40);
    }
    requestAnimationFrame(frame);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', probeThenStart);
  } else {
    probeThenStart();
  }
})();
