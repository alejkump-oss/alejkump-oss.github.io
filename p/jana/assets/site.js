/* Trgovina Jana – predogled · vanilla JS, brez knjižnic */
(function () {
  'use strict';
  var d = document, w = window;
  d.documentElement.classList.remove('no-js');
  var reduce = w.matchMedia && w.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* header: glass on scroll */
  var header = d.querySelector('.site-header');
  function onScroll() {
    var y = w.scrollY || w.pageYOffset;
    if (header && !header.classList.contains('solid')) header.classList.toggle('scrolled', y > 40);
    if (!reduce) parallax(y);
  }

  /* parallax-lite for hero media */
  var plx = [].slice.call(d.querySelectorAll('[data-parallax]'));
  var ticking = false;
  function parallax(y) {
    if (!plx.length || ticking) return;
    ticking = true;
    w.requestAnimationFrame(function () {
      plx.forEach(function (el) {
        if (y < w.innerHeight * 1.2) el.style.transform = 'translate3d(0,' + (y * 0.28).toFixed(1) + 'px,0) scale(1.04)';
      });
      ticking = false;
    });
  }
  w.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* hero video: never autoplay for reduced motion */
  var vid = d.querySelector('.hero video');
  if (vid && reduce) { vid.removeAttribute('autoplay'); try { vid.pause(); } catch (e) {} }

  /* mobile menu */
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

  /* scroll reveal */
  var io = ('IntersectionObserver' in w && !reduce) ? new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }) : null;
  function observe(root) {
    [].forEach.call((root || d).querySelectorAll('.reveal:not(.in)'), function (el) { io ? io.observe(el) : el.classList.add('in'); });
  }
  observe();

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
      ? '<img src="' + base + p.i + '" alt="' + esc(p.bn + ' ' + p.n) + '" loading="lazy" decoding="async" width="600" height="600">'
      : '<div class="noimg" aria-hidden="true"><div><b>' + esc(p.bn.charAt(0)) + '</b><span>Slika v spletni trgovini</span></div></div>';
    return '<article class="card reveal">' +
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
    bannerEl.innerHTML = '<div class="group-banner"><img src="' + base + G.banner + '" alt="" loading="lazy" decoding="async">' +
      '<div class="gb-body"><span class="eyebrow">' + esc(G.eyebrow) + '</span><h2>' + esc(G.title) + '</h2><p>' + esc(G.intro) + '</p>' +
      '<a class="shoplink" href="' + esc(G.shop) + '" target="_blank" rel="noopener">Kategorija v spletni trgovini ↗</a></div></div>';
    var html = '';
    if (G.tags) {
      html += '<div class="frow" role="group" aria-label="' + esc(G.tagLabel) + '"><span class="flabel">' + esc(G.tagLabel) + '</span><button class="chip" data-tag="all" aria-pressed="' + (state.tag === 'all') + '">Vse</button>';
      Object.keys(G.tags).forEach(function (t) {
        var n = list.filter(function (p) { return (p.k || []).indexOf(t) > -1; }).length;
        if (n) html += '<button class="chip" data-tag="' + t + '" aria-pressed="' + (state.tag === t) + '">' + esc(G.tags[t]) + '</button>';
      });
      html += '</div>';
    }
    var brands = [];
    list.forEach(function (p) { if (brands.indexOf(p.bn) < 0) brands.push(p.bn); });
    if (brands.length > 1) {
      html += '<div class="frow" role="group" aria-label="Znamka"><span class="flabel">Znamka</span><button class="chip" data-brand="all" aria-pressed="' + (state.brand === 'all') + '">Vse</button>';
      brands.forEach(function (b) { html += '<button class="chip" data-brand="' + esc(b) + '" aria-pressed="' + (state.brand === b) + '">' + esc(b) + '</button>'; });
      html += '</div>';
    }
    html += '<div class="frow"><label class="search"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg><span class="sr-only">Iskanje po modelu</span><input type="search" placeholder="Iskanje po modelu …" value="' + esc(state.q) + '" data-q autocomplete="off"></label></div>';
    filtEl.innerHTML = html;
  }

  function renderGrid() {
    var q = state.q.trim().toLowerCase();
    var all = items(state.g);
    var list = all.filter(function (p) {
      if (state.tag !== 'all' && (p.k || []).indexOf(state.tag) < 0) return false;
      if (state.brand !== 'all' && p.bn !== state.brand) return false;
      if (q && (p.bn + ' ' + p.n + ' ' + p.t).toLowerCase().indexOf(q) < 0) return false;
      return true;
    });
    metaEl.innerHTML = '<span>Prikazanih izdelkov: <b>' + list.length + '</b> od ' + all.length + '</span><span>Cene in zaloga so v spletni trgovini.</span>';
    gridEl.innerHTML = list.length ? list.map(card).join('') : '<div class="empty">Ni zadetkov za izbrane filtre. <button class="chip" data-reset>Počisti filtre</button></div>';
    gridEl.className = list.length ? 'grid' : '';
    observe(gridEl);
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
    cat.querySelector('[data-loading]').remove();
    selectGroup(location.hash.slice(1), false);
  }).catch(function () {
    gridEl.innerHTML = '<div class="empty">Katalog se ni naložil. Vse izdelke najdete v <a href="https://trgovina-jana.si/" target="_blank" rel="noopener">spletni trgovini</a>.</div>';
  });
})();
