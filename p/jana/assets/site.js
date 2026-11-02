/* Trgovina Jana – predogled v4 · vanilla JS, brez knjižnic
   One rAF loop drives everything: smooth wheel scrolling on desktop (lerp),
   eased scroll-linked values (--p, --kp) everywhere, marquee velocity, the
   pinned scene and the horizontal gallery. Native touch scrolling on phones. */
(function () {
  'use strict';
  var d = document, w = window, html = d.documentElement;
  html.classList.remove('no-js');
  html.classList.add('sx-js'); // one engine for every browser (CSS timelines are 1:1, we want easing)
  var mm = function (q) { return !!(w.matchMedia && w.matchMedia(q).matches); };
  var reduce = mm('(prefers-reduced-motion: reduce)');
  var coarse = mm('(pointer: coarse)');
  var fine = !coarse && mm('(pointer: fine)');
  var smooth = fine && !reduce && !/[?&]nosmooth=1/.test(location.search);
  var LERP = coarse ? 0.16 : 0.22;          // value easing per frame (touch scrolls natively, so ease more)
  function clamp(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }
  var vh = w.innerHeight, vw = w.innerWidth;

  /* ---------- smooth wheel scrolling (desktop) ---------- */
  var cur = w.scrollY, target = cur, maxY = 0, selfScroll = false;
  function measureMax() { maxY = Math.max(0, html.scrollHeight - vh); }
  if (smooth) {
    html.classList.add('smooth');
    w.addEventListener('wheel', function (e) {
      if (e.ctrlKey || e.defaultPrevented) return;
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      if (d.body.style.overflow === 'hidden' || (e.target.closest && e.target.closest('[data-native-scroll],.mobile-nav'))) return;
      e.preventDefault();
      var dy = e.deltaY * (e.deltaMode === 1 ? 32 : e.deltaMode === 2 ? vh : 1);
      target = Math.max(0, Math.min(maxY, target + dy));
      kick();
    }, { passive: false });
    w.addEventListener('scroll', function () {
      if (selfScroll) { selfScroll = false; return; }
      cur = target = w.scrollY; // keyboard, scrollbar, anchors, programmatic scroll
    }, { passive: true });
    d.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a || a.getAttribute('href').length < 2) return;
      var el = d.getElementById(a.getAttribute('href').slice(1)); if (!el) return;
      e.preventDefault();
      var sm = parseFloat(getComputedStyle(el).scrollMarginTop) || 90;
      target = Math.max(0, Math.min(maxY, el.getBoundingClientRect().top + w.scrollY - sm));
      if (history.replaceState) history.replaceState(null, '', a.getAttribute('href'));
      kick();
    });
  }

  /* ---------- registry of scroll-linked elements ---------- */
  var KINDS = [['sx-par', 'cover'], ['sx-drift', 'cover'], ['sx-out', 'cover'], ['sx-zoom', .5], ['sx-clip', .55], ['sx-head', .4], ['sx-fade', .3], ['kt', .5]];
  var active = new Set();
  var io = 'IntersectionObserver' in w ? new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) active.add(e.target); else active.delete(e.target); });
    kick();
  }, { rootMargin: '35% 0px 35% 0px' }) : null;
  function rangeOf(el) { for (var i = 0; i < KINDS.length; i++) if (el.classList.contains(KINDS[i][0])) return KINDS[i][1]; return .3; }
  function targetP(el) {
    var r = el.getBoundingClientRect(), R = el._sxr;
    if (R === 'cover') return clamp((vh - r.top) / (vh + r.height));
    return clamp((vh - r.top) / (R * (vh + r.height)));
  }
  var introUntil = html.classList.contains('intro-seen') ? 0 : performance.now() + 650;
  function register(el) {
    if (el._sxr !== undefined) return;
    el._sxr = rangeOf(el);
    el._kt = el.classList.contains('kt');
    var t = targetP(el);
    // things already on screen at load start from 0 and ease in; below-fold start at target
    el._v = (el._kt || el.classList.contains('sx-fade') || el.classList.contains('sx-head')) && t > 0 ? 0 : t;
    write(el, el._v);
    if (io) io.observe(el); else active.add(el);
  }
  function write(el, v) {
    if (el._kt) el.style.setProperty('--kp', v.toFixed(4));
    else el.style.setProperty('--p', v.toFixed(4));
  }

  /* ---------- kinetic headings: split into masked words ---------- */
  function splitWords(h) {
    if (h._split) return; h._split = true;
    var n = 0;
    (function walk(node) {
      [].slice.call(node.childNodes).forEach(function (c) {
        if (c.nodeType === 3) {
          var parts = c.textContent.split(/(\s+)/), frag = d.createDocumentFragment();
          parts.forEach(function (p) {
            if (!p) return;
            if (/^\s+$/.test(p)) { frag.appendChild(d.createTextNode(' ')); return; }
            var o = d.createElement('span'); o.className = 'w';
            var i = d.createElement('span'); i.className = 'wi'; i.style.setProperty('--i', n++); i.textContent = p;
            o.appendChild(i); frag.appendChild(o);
          });
          node.replaceChild(frag, c);
        } else if (c.nodeType === 1 && c.tagName !== 'BR') walk(c);
      });
    })(h);
    h.style.setProperty('--n', n);
    if (!h.getAttribute('aria-label')) h.setAttribute('aria-label', h.textContent.replace(/\s+/g, ' ').trim());
    h.classList.add('kt');
  }
  function scan(root) {
    root = root || d;
    [].forEach.call(root.querySelectorAll('h1, .sec-head h2, .dhead h2, .cta-band h2, .kband h2, .hs-head h2, .page-hero h1'), splitWords);
    [].forEach.call(root.querySelectorAll('.sx-par,.sx-drift,.sx-out,.sx-zoom,.sx-clip,.sx-head,.sx-fade,.kt'), register);
  }

  /* ---------- pinned scene ---------- */
  var scene = d.querySelector('[data-scene]'), layers = [], caps = [], dots = [], countEl = null, curIdx = -1, sceneS = 0;
  if (scene) {
    layers = [].slice.call(scene.querySelectorAll('.scene-layer'));
    caps = [].slice.call(scene.querySelectorAll('.scene-cap'));
    dots = [].slice.call(scene.querySelectorAll('.scene-rail span'));
    countEl = scene.querySelector('.scene-count');
  }
  function sceneFrame() {
    var r = scene.getBoundingClientRect(), n = layers.length;
    if (r.bottom < -50 || r.top > vh + 50) return false;
    var s = clamp(-r.top / (r.height - vh));
    sceneS += (s - sceneS) * LERP;
    var f = sceneS * n - .5;
    for (var i = 0; i < n; i++) {
      var o = clamp(1 - Math.abs(f - i) * 1.6);
      if (i === 0 && f < 0) o = 1;
      if (i === n - 1 && f > n - 1) o = 1;
      layers[i].style.opacity = o.toFixed(3);
      layers[i].firstElementChild.style.setProperty('--k', (1.16 - .16 * clamp((f - i + 1) / 2)).toFixed(4));
    }
    var idx = Math.max(0, Math.min(n - 1, Math.round(f)));
    if (idx !== curIdx) {
      curIdx = idx;
      caps.forEach(function (c, k) { c.classList.toggle('on', k === idx); });
      dots.forEach(function (c, k) { c.classList.toggle('on', k === idx); });
      if (countEl) countEl.textContent = String(idx + 1).padStart(2, '0') + ' / ' + String(n).padStart(2, '0');
    }
    return Math.abs(s - sceneS) > .0005;
  }

  /* ---------- horizontal pinned gallery ---------- */
  var hs = d.querySelector('[data-hscroll]'), hsTrack, hsBar, hsS = 0, hsDist = 0, hsNative = false;
  function hsLayout() {
    if (!hs) return;
    hsTrack = hs.querySelector('.hs-track'); hsBar = hs.querySelector('.hs-bar');
    hsNative = coarse || vw <= 760;
    hs.classList.toggle('native', hsNative);
    if (hsNative) { hs.style.height = ''; hsTrack.style.transform = ''; return; }
    hsDist = Math.max(0, hsTrack.scrollWidth - vw);
    hs.style.height = (hsDist + vh) + 'px';
  }
  function hsFrame() {
    if (hsNative) return false;
    var r = hs.getBoundingClientRect();
    if (r.bottom < -50 || r.top > vh + 50) return false;
    var s = clamp(-r.top / Math.max(1, r.height - vh));
    hsS += (s - hsS) * LERP;
    hsTrack.style.transform = 'translate3d(' + (-hsS * hsDist).toFixed(1) + 'px,0,0)';
    if (hsBar) hsBar.style.setProperty('--hp', hsS.toFixed(4));
    return Math.abs(s - hsS) > .0003;
  }

  /* ---------- marquee driven by scroll velocity ---------- */
  var mqs = [].map.call(d.querySelectorAll('.mq-track'), function (t, i) { return { el: t, x: 0, dir: i % 2 ? 1 : -1, wid: 0 }; });
  var mqVisible = false, vel = 0, lastY = w.scrollY, lastT = performance.now();
  if (mqs.length && io) new IntersectionObserver(function (es) { es.forEach(function (e) { mqVisible = e.isIntersecting; }); kick(); }).observe(d.querySelector('.marquee'));
  function mqFrame(dt) {
    if (!mqVisible) return false;
    var speed = (reduce ? 18 : 42) + Math.min(900, Math.abs(vel)) * (reduce ? .12 : .35);
    mqs.forEach(function (m) {
      if (!m.wid) m.wid = m.el.scrollWidth / 2;
      var dir = m.dir * (vel < -1 ? -1 : 1);
      m.x += dir * speed * dt / 1000;
      if (m.x <= -m.wid) m.x += m.wid; if (m.x > 0) m.x -= m.wid;
      m.el.style.transform = 'translate3d(' + m.x.toFixed(1) + 'px,0,0)';
    });
    return true;
  }

  /* ---------- counters ---------- */
  var counters = [].slice.call(d.querySelectorAll('[data-count]'));
  function fmt(n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.'); }
  function countFrame() {
    var moving = false;
    counters.forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) return;
      var t = clamp((vh - r.top) / (.55 * (vh + r.height)));
      el._c = el._c === undefined ? 0 : el._c + (t - el._c) * LERP;
      if (Math.abs(t - el._c) > .001) moving = true;
      var p = 1 - Math.pow(1 - el._c, 3);
      var from = +el.getAttribute('data-from') || 0, to = +el.getAttribute('data-count');
      var v = Math.round(from + (to - from) * p);
      if (el._v2 !== v) { el._v2 = v; el.textContent = (el.getAttribute('data-fmt') === 'plain' ? String(v) : fmt(v)) + (el.getAttribute('data-suffix') || ''); }
    });
    return moving;
  }

  /* ---------- the loop ---------- */
  var header = d.querySelector('.site-header'), bar = d.querySelector('.sx-bar');
  var running = false, prevT = performance.now(), barV = 0;
  function kick() { if (!running) { running = true; prevT = performance.now(); w.requestAnimationFrame(frame); } }
  function frame(now) {
    var dt = Math.min(64, now - prevT); prevT = now;
    var moving = false;
    if (smooth) {
      var diff = target - cur;
      if (Math.abs(diff) > .4) { cur += diff * 0.095; selfScroll = true; w.scrollTo(0, cur); moving = true; }
      else if (cur !== target) { cur = target; selfScroll = true; w.scrollTo(0, cur); }
    }
    var y = w.scrollY;
    var instVel = (y - lastY) / Math.max(1, (now - lastT)) * 1000; lastY = y; lastT = now;
    vel += (instVel - vel) * .15;
    if (Math.abs(vel) > 2) moving = true;
    if (header) header.classList.toggle('scrolled', y > 40);
    if (bar) { var bt = maxY > 0 ? clamp(y / maxY) : 0; barV += (bt - barV) * .3; bar.style.setProperty('--p', barV.toFixed(4)); if (Math.abs(bt - barV) > .0005) moving = true; }
    // reads first, then writes
    var list = [], ts = [];
    active.forEach(function (el) { list.push(el); ts.push(targetP(el)); });
    var hold = now < introUntil;
    for (var i = 0; i < list.length; i++) {
      var el = list[i], t = ts[i];
      if (hold && (el._kt || el.classList.contains('sx-fade') || el.classList.contains('sx-head'))) { moving = true; continue; }
      var dv = t - el._v;
      if (Math.abs(dv) > .0004) { el._v += dv * LERP; write(el, el._v); moving = true; }
    }
    if (scene && sceneFrame()) moving = true;
    if (hs && hsFrame()) moving = true;
    if (counters.length && countFrame()) moving = true;
    if (mqs.length && mqFrame(dt)) moving = true;
    if (moving) w.requestAnimationFrame(frame); else running = false;
  }
  w.addEventListener('scroll', kick, { passive: true });
  w.addEventListener('resize', function () { vh = w.innerHeight; vw = w.innerWidth; measureMax(); hsLayout(); mqs.forEach(function (m) { m.wid = 0; }); kick(); }, { passive: true });
  w.addEventListener('load', function () { measureMax(); hsLayout(); kick(); });
  hsLayout(); measureMax(); scan(); kick();
  if (w.ResizeObserver) new ResizeObserver(function () { measureMax(); }).observe(d.body);

  /* ---------- videos ---------- */
  var hero = d.querySelector('.hero video');
  function play(v) { var p = v.play && v.play(); if (p && p.catch) p.catch(function () {}); }
  if (hero) {
    hero.muted = true; hero.setAttribute('playsinline', ''); hero.setAttribute('muted', '');
    play(hero);
    ['touchstart', 'scroll', 'click'].forEach(function (ev) { w.addEventListener(ev, function once() { play(hero); w.removeEventListener(ev, once); }, { passive: true }); });
  }
  var lazyv = [].slice.call(d.querySelectorAll('video.lazyvid'));
  function loadV(v) {
    if (v._loaded) return; v._loaded = true;
    [].forEach.call(v.querySelectorAll('source[data-src]'), function (s) { s.src = s.getAttribute('data-src'); });
    v.muted = true; v.load();
  }
  if (lazyv.length) {
    if (io) {
      var vio = new IntersectionObserver(function (es) {
        es.forEach(function (e) { var v = e.target; if (e.isIntersecting) { loadV(v); play(v); } else if (v._loaded) v.pause(); });
      }, { rootMargin: '10% 0px', threshold: .15 });
      lazyv.forEach(function (v) { vio.observe(v); });
    } else lazyv.forEach(function (v) { loadV(v); play(v); });
    w.addEventListener('touchstart', function once() { lazyv.forEach(function (v) { if (v._loaded) play(v); }); w.removeEventListener('touchstart', once); }, { passive: true });
  }

  /* ---------- micro-interactions (desktop) ---------- */
  if (fine) {
    var pending = null;
    var pq = false;
    d.addEventListener('pointermove', function (e) { pending = e; if (!pq) { pq = true; w.requestAnimationFrame(function () { pq = false; pointerFrame(); }); } }, { passive: true });
    var lastCard = null, lastBtn = null;
    var pointerFrame = function () {
      var e = pending; if (!e) return;
      var t = e.target.closest ? e.target : null; if (!t) return;
      var s = t.closest('.spot');
      if (s) { var r = s.getBoundingClientRect(); s.style.setProperty('--gx', (e.clientX - r.left) + 'px'); s.style.setProperty('--gy', (e.clientY - r.top) + 'px'); }
      var c = reduce ? null : t.closest('.card');
      if (lastCard && lastCard !== c) { lastCard.classList.remove('tilting'); lastCard.style.removeProperty('--rx'); lastCard.style.removeProperty('--ry'); }
      if (c) { var rc = c.getBoundingClientRect(), px = (e.clientX - rc.left) / rc.width - .5, py = (e.clientY - rc.top) / rc.height - .5; c.classList.add('tilting'); c.style.setProperty('--rx', (-py * 7).toFixed(2) + 'deg'); c.style.setProperty('--ry', (px * 7).toFixed(2) + 'deg'); }
      lastCard = c;
      var b = t.closest('.btn');
      if (lastBtn && lastBtn !== b) { lastBtn.classList.remove('mag-on'); lastBtn.style.removeProperty('--mx'); lastBtn.style.removeProperty('--my'); }
      if (b && !reduce) { var rb = b.getBoundingClientRect(); b.classList.add('mag-on'); b.style.setProperty('--mx', ((e.clientX - rb.left - rb.width / 2) * .22).toFixed(1) + 'px'); b.style.setProperty('--my', ((e.clientY - rb.top - rb.height / 2) * .3).toFixed(1) + 'px'); }
      lastBtn = b;
    };
    d.addEventListener('pointerleave', function () { if (lastBtn) { lastBtn.classList.remove('mag-on'); lastBtn.style.removeProperty('--mx'); lastBtn.style.removeProperty('--my'); lastBtn = null; } });
  }

  /* ---------- page-transition fallback (no cross-document view transitions) ---------- */
  if (!html.classList.contains('vt')) {
    d.addEventListener('click', function (e) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      var a = e.target.closest && e.target.closest('a[href]'); if (!a || a.target || a.hasAttribute('download')) return;
      var u = new URL(a.href, location.href);
      if (u.origin !== location.origin || (u.pathname === location.pathname && u.hash)) return;
      if (/^(mailto|tel):/.test(a.getAttribute('href'))) return;
      e.preventDefault(); html.classList.add('leaving');
      setTimeout(function () { location.href = a.href; }, reduce ? 60 : 220);
    });
    w.addEventListener('pageshow', function () { html.classList.remove('leaving'); });
  }

  /* ---------- mobile menu ---------- */
  var mbtn = d.querySelector('.menu-btn'), mnav = d.getElementById('mobile-nav');
  if (mbtn && mnav) {
    var closeBtn = mnav.querySelector('.close');
    var open = function () { mnav.classList.add('open'); mbtn.setAttribute('aria-expanded', 'true'); d.body.style.overflow = 'hidden'; closeBtn.focus(); };
    var close = function () { mnav.classList.remove('open'); mbtn.setAttribute('aria-expanded', 'false'); d.body.style.overflow = ''; mbtn.focus(); };
    mbtn.addEventListener('click', open);
    closeBtn.addEventListener('click', close);
    d.addEventListener('keydown', function (e) { if (e.key === 'Escape' && mnav.classList.contains('open')) close(); });
    [].forEach.call(mnav.querySelectorAll('a'), function (a) { a.addEventListener('click', function () { d.body.style.overflow = ''; }); });
  }

  /* ---------- accordion (ponudba) ---------- */
  d.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('.acc-btn'); if (!b) return;
    var s = b.closest('.sub'), open = s.getAttribute('data-open') !== 'true';
    s.setAttribute('data-open', String(open)); b.setAttribute('aria-expanded', String(open));
    setTimeout(function () { measureMax(); kick(); }, 520);
  });

  /* ---------- department nav scrollspy (ponudba) ---------- */
  var dnav = d.querySelector('[data-dnav]');
  if (dnav && io) {
    var links = {};
    [].forEach.call(dnav.querySelectorAll('a'), function (a) { links[a.getAttribute('href').slice(1)] = a; });
    var spy = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        var a = links[e.target.id]; if (!a) return;
        [].forEach.call(dnav.querySelectorAll('a.on'), function (x) { x.classList.remove('on'); });
        a.classList.add('on');
        var sc = dnav.querySelector('.scroller');
        sc.scrollTo({ left: a.offsetLeft - 16, behavior: reduce ? 'auto' : 'smooth' });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    [].forEach.call(d.querySelectorAll('.dsec'), function (s) { spy.observe(s); });
  }

  /* ---------- catalog ---------- */
  var cat = d.querySelector('[data-catalog]');
  if (!cat) return;
  var base = cat.getAttribute('data-base');
  var groupsWanted = cat.getAttribute('data-groups').split(',');
  var state = { g: null, tag: 'all', brand: 'all', q: '' };
  var data;

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  var ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg>';

  function card(p) {
    var G = data.groups[p.g], tagLabels = (G.tags || {});
    var pills = (p.k || []).filter(function (t) { return tagLabels[t]; }).map(function (t) { return '<span class="pill">' + esc(tagLabels[t]) + '</span>'; }).join('');
    var media = p.i
      ? '<img class="sx-zoom" src="' + base + p.i + '" alt="' + esc(p.bn + ' ' + p.n) + '" loading="lazy" decoding="async" width="600" height="600">'
      : '<div class="noimg" aria-hidden="true"><div><b>' + esc(p.bn.charAt(0)) + '</b><span>Slika v spletni trgovini</span></div></div>';
    return '<article class="card spot sx-fade">' +
      (p.x ? '<span class="badge aqua">Razstavni eksponat</span>' : '') +
      '<div class="ph">' + media + '</div>' +
      '<div class="body"><span class="brandname">' + esc(p.bn) + '</span>' +
      '<h3>' + esc(p.n) + '</h3>' +
      (p.t ? '<p class="type">' + esc(p.t) + '</p>' : '') +
      (pills ? '<div class="pills">' + pills + '</div>' : '') +
      '<a class="shop stretch" href="' + esc(p.u) + '" target="_blank" rel="noopener">Ogled in cena v spletni trgovini ' + ARROW + '<span class="sr-only"> (odpre se v novem zavihku)</span></a>' +
      '</div></article>';
  }

  var tabsEl = cat.querySelector('[data-tabs]'), bannerEl = cat.querySelector('[data-banner]'),
      filtEl = cat.querySelector('[data-filters]'), gridEl = cat.querySelector('[data-grid]'),
      metaEl = cat.querySelector('[data-meta]');

  function items(g) { return data.items.filter(function (p) { return p.g === g; }); }

  function renderTabs() {
    tabsEl.innerHTML = groupsWanted.map(function (g) {
      var G = data.groups[g];
      return '<button class="tab" role="tab" id="tab-' + g + '" aria-controls="catalog-panel" aria-selected="' + (g === state.g) + '" data-g="' + g + '">' + esc(G.title) + ' <small>' + items(g).length + '</small></button>';
    }).join('');
  }

  function renderGroupChrome() {
    var G = data.groups[state.g], list = items(state.g);
    bannerEl.innerHTML = '<div class="group-banner sx-clip"><img class="sx-par" src="' + base + G.banner + '" alt="" loading="lazy" decoding="async">' +
      '<div class="gb-body sx-head"><span class="eyebrow">' + esc(G.eyebrow) + '</span><h2>' + esc(G.title) + '</h2><p>' + esc(G.intro) + '</p>' +
      '<a class="shoplink" href="' + esc(G.shop) + '" target="_blank" rel="noopener">Kategorija v spletni trgovini ↗</a></div></div>';
    var h = '';
    if (G.tags) {
      h += '<div class="frow" role="group" aria-label="' + esc(G.tagLabel) + '"><span class="flabel">' + esc(G.tagLabel) + '</span><button class="chip" data-tag="all" aria-pressed="' + (state.tag === 'all') + '">Vse</button>';
      Object.keys(G.tags).forEach(function (t) {
        var n = list.filter(function (p) { return (p.k || []).indexOf(t) > -1; }).length;
        if (n) h += '<button class="chip" data-tag="' + t + '" aria-pressed="' + (state.tag === t) + '">' + esc(G.tags[t]) + '</button>';
      });
      h += '</div>';
    }
    var brands = [];
    list.forEach(function (p) { if (brands.indexOf(p.bn) < 0) brands.push(p.bn); });
    if (brands.length > 1) {
      h += '<div class="frow" role="group" aria-label="Znamka"><span class="flabel">Znamka</span><button class="chip" data-brand="all" aria-pressed="' + (state.brand === 'all') + '">Vse</button>';
      brands.forEach(function (b) { h += '<button class="chip" data-brand="' + esc(b) + '" aria-pressed="' + (state.brand === b) + '">' + esc(b) + '</button>'; });
      h += '</div>';
    }
    h += '<div class="frow"><label class="search"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg><span class="sr-only">Iskanje po modelu</span><input type="search" placeholder="Iskanje po modelu …" value="' + esc(state.q) + '" data-q autocomplete="off"></label></div>';
    filtEl.innerHTML = h;
    scan(bannerEl);
  }

  function renderGrid() {
    var q = state.q.trim().toLowerCase();
    var allItems = items(state.g);
    var list = allItems.filter(function (p) {
      if (state.tag !== 'all' && (p.k || []).indexOf(state.tag) < 0) return false;
      if (state.brand !== 'all' && p.bn !== state.brand) return false;
      if (q && (p.bn + ' ' + p.n + ' ' + p.t).toLowerCase().indexOf(q) < 0) return false;
      return true;
    });
    metaEl.innerHTML = '<span>Prikazanih izdelkov: <b>' + list.length + '</b> od ' + allItems.length + '</span><span>Cene in zaloga so v spletni trgovini.</span>';
    gridEl.innerHTML = list.length ? list.map(card).join('') : '<div class="empty">Ni zadetkov za izbrane filtre. <button class="chip" data-reset>Počisti filtre</button></div>';
    gridEl.className = list.length ? 'grid' : '';
    scan(gridEl); measureMax(); kick();
  }

  function selectGroup(g, push) {
    if (groupsWanted.indexOf(g) < 0) g = groupsWanted[0];
    state = { g: g, tag: 'all', brand: 'all', q: '' };
    renderTabs(); renderGroupChrome(); renderGrid();
    if (push && history.replaceState) history.replaceState(null, '', '#' + g);
  }

  tabsEl.addEventListener('click', function (e) {
    var b = e.target.closest('[data-g]'); if (!b) return;
    selectGroup(b.getAttribute('data-g'), true);
    var top = cat.getBoundingClientRect().top + w.scrollY - 70;
    if (w.scrollY > top) { if (smooth) { target = top; kick(); } else w.scrollTo({ top: top, behavior: reduce ? 'auto' : 'smooth' }); }
  });
  tabsEl.addEventListener('keydown', function (e) {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    var i = groupsWanted.indexOf(state.g) + (e.key === 'ArrowRight' ? 1 : -1);
    i = (i + groupsWanted.length) % groupsWanted.length;
    selectGroup(groupsWanted[i], true);
    d.getElementById('tab-' + groupsWanted[i]).focus();
  });
  filtEl.addEventListener('click', function (e) {
    var c = e.target.closest('.chip'); if (!c) return;
    if (c.hasAttribute('data-tag')) state.tag = c.getAttribute('data-tag');
    if (c.hasAttribute('data-brand')) state.brand = c.getAttribute('data-brand');
    [].forEach.call(filtEl.querySelectorAll(c.hasAttribute('data-tag') ? '[data-tag]' : '[data-brand]'), function (x) { x.setAttribute('aria-pressed', String(x === c)); });
    renderGrid();
  });
  filtEl.addEventListener('input', function (e) { if (e.target.hasAttribute('data-q')) { state.q = e.target.value; renderGrid(); } });
  gridEl.addEventListener('click', function (e) { if (e.target.closest('[data-reset]')) selectGroup(state.g, false); });
  w.addEventListener('hashchange', function () { var g = location.hash.slice(1); if (g && g !== state.g && groupsWanted.indexOf(g) > -1) selectGroup(g, false); });

  fetch(cat.getAttribute('data-src')).then(function (r) { return r.json(); }).then(function (j) {
    data = j;
    var l = cat.querySelector('[data-loading]'); if (l) l.remove();
    selectGroup(location.hash.slice(1), false);
  }).catch(function () {
    gridEl.innerHTML = '<div class="empty">Katalog se ni naložil. Vse izdelke najdete v <a href="https://trgovina-jana.si/" target="_blank" rel="noopener">spletni trgovini</a>.</div>';
  });
})();
