/* Trgovina Jana – predogled v3 · vanilla JS, brez knjižnic */
(function () {
  'use strict';
  var d = document, w = window, html = d.documentElement;
  html.classList.remove('no-js');
  var mq = w.matchMedia ? w.matchMedia('(prefers-reduced-motion: reduce)') : { matches: false };
  var reduce = mq.matches;

  /* Scroll-driven CSS where supported; otherwise (or with ?fallback=1) this
     file drives the same --p variable from a passive rAF loop. */
  var cssSD = !!(w.CSS && CSS.supports && CSS.supports('animation-timeline: view()')) && !/[?&]fallback=1/.test(location.search);
  if (!cssSD) html.classList.add('sx-js');

  function clamp(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }
  var vh = w.innerHeight, lastY = 0;

  /* ---------- engine ---------- */
  // range: 'cover' = element enters at bottom (0) → leaves at top (1)
  //        number x = from entering (0) until x of the cover range (1)
  var KINDS = [['sx-par', 'cover'], ['sx-drift', 'cover'], ['sx-out', 'cover'], ['sx-zoom', .5], ['sx-head', .4], ['sx-fade', .3]];
  var active = new Set(), all = [];
  var io = 'IntersectionObserver' in w ? new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) active.add(e.target); else { active.delete(e.target); update(e.target); } });
    queue();
  }, { rootMargin: '30% 0px 30% 0px' }) : null;

  function rangeOf(el) {
    for (var i = 0; i < KINDS.length; i++) if (el.classList.contains(KINDS[i][0])) return KINDS[i][1];
    return .3;
  }
  function progress(r, range) {
    if (range === 'cover') return clamp((vh - r.top) / (vh + r.height));
    return clamp((vh - r.top) / (range * (vh + r.height)));
  }
  function update(el) {
    var p = progress(el.getBoundingClientRect(), el._sxr);
    if (el._sxp === undefined || Math.abs(el._sxp - p) > .0005) { el._sxp = p; el.style.setProperty('--p', p.toFixed(4)); }
  }
  function scan(root) {
    if (cssSD) return;
    [].forEach.call((root || d).querySelectorAll('.sx-par,.sx-drift,.sx-out,.sx-zoom,.sx-head,.sx-fade'), function (el) {
      if (el._sxr !== undefined) return;
      el._sxr = rangeOf(el); all.push(el);
      if (io) io.observe(el); else active.add(el);
      update(el);
    });
  }

  /* header progress bar (fallback), scene, counters run in both modes */
  var bar = d.querySelector('.sx-bar');
  var header = d.querySelector('.site-header');
  var scene = d.querySelector('[data-scene]'), layers = [], caps = [], dots = [], countEl = null, curIdx = -1;
  if (scene) {
    layers = [].slice.call(scene.querySelectorAll('.scene-layer'));
    caps = [].slice.call(scene.querySelectorAll('.scene-cap'));
    dots = [].slice.call(scene.querySelectorAll('.scene-rail span'));
    countEl = scene.querySelector('.scene-count');
  }
  var counters = [].slice.call(d.querySelectorAll('[data-count]'));
  function fmt(n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.'); }

  function frame() {
    ticking = false;
    var y = w.scrollY || w.pageYOffset;
    if (header) header.classList.toggle('scrolled', y > 40);
    if (!cssSD) {
      if (Math.abs(y - lastY) > vh * .8) all.forEach(update);   // jumps skip IO events
      lastY = y;
      if (bar) { var max = html.scrollHeight - vh; bar.style.setProperty('--p', max > 0 ? clamp(y / max).toFixed(4) : 0); }
      active.forEach(update);
    }
    if (scene) {
      var r = scene.getBoundingClientRect(), n = layers.length;
      var s = clamp(-r.top / (r.height - vh));
      var f = s * n - .5;              // fractional slide position
      for (var i = 0; i < n; i++) {
        var o = clamp(1 - Math.abs(f - i) * 1.6);
        if (i === 0 && f < 0) o = 1;
        if (i === n - 1 && f > n - 1) o = 1;
        var L = layers[i];
        L.style.opacity = o.toFixed(3);
        if (!reduce) L.firstElementChild.style.setProperty('--k', (1.16 - .16 * clamp((f - i + 1) / 2)).toFixed(4));
      }
      var idx = Math.max(0, Math.min(n - 1, Math.round(f)));
      if (idx !== curIdx) {
        curIdx = idx;
        caps.forEach(function (c, k) { c.classList.toggle('on', k === idx); });
        dots.forEach(function (c, k) { c.classList.toggle('on', k === idx); });
        if (countEl) countEl.textContent = String(idx + 1).padStart(2, '0') + ' / ' + String(n).padStart(2, '0');
      }
    }
    counters.forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) return;
      var p = clamp((vh - r.top) / (.55 * (vh + r.height)));
      p = 1 - Math.pow(1 - p, 3);
      var from = +el.getAttribute('data-from') || 0, to = +el.getAttribute('data-count');
      var v = Math.round(from + (to - from) * p);
      if (el._v !== v) { el._v = v; el.textContent = (el.getAttribute('data-fmt') === 'plain' ? String(v) : fmt(v)) + (el.getAttribute('data-suffix') || ''); }
    });
  }
  var ticking = false;
  function queue() { if (!ticking) { ticking = true; w.requestAnimationFrame(frame); } }
  w.addEventListener('scroll', queue, { passive: true });
  w.addEventListener('resize', function () { vh = w.innerHeight; queue(); }, { passive: true });
  if (mq.addEventListener) mq.addEventListener('change', function (e) { reduce = e.matches; queue(); });
  scan(); queue();
  w.addEventListener('load', queue);

  /* hero video: pause for reduced motion */
  var vid = d.querySelector('.hero video');
  if (vid && reduce) { vid.removeAttribute('autoplay'); try { vid.pause(); } catch (e) {} }

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
    return '<article class="card sx-fade">' +
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
    bannerEl.innerHTML = '<div class="group-banner"><img class="sx-par" src="' + base + G.banner + '" alt="" loading="lazy" decoding="async">' +
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
    scan(gridEl); queue();
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
    if (w.scrollY > top) w.scrollTo({ top: top, behavior: reduce ? 'auto' : 'smooth' });
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
