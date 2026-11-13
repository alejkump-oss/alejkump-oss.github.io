/*! AK agencija animated backgrounds - core loader. See README.md and LICENSES.md.
 * Reduced motion runs at 25 % speed (owner rule); data-motion="static" stops it. */
(function (W, D) {
  "use strict";
  var A = W.AKBG = W.AKBG || { q: [] };
  if (A.core) return;
  A.core = 1;
  var me = D.currentScript;
  var base = me && me.src ? me.src.replace(/[^\/?#]*([?#].*)?$/, "") : "/assets/bg/";
  var mq = W.matchMedia ? W.matchMedia("(prefers-reduced-motion: reduce)") : null;
  var types = {}, inst = [], asked = {}, raf = 0, last = 0;
  A.REDUCED = 0.25;

  function reduced() { return !!(mq && mq.matches); }
  function rgb(h) {
    h = String(h).trim().replace("#", "");
    if (h.length === 3) h = h.replace(/./g, "$&$&");
    var n = parseInt(h, 16) || 0;
    return [(n >> 16 & 255) / 255, (n >> 8 & 255) / 255, (n & 255) / 255];
  }
  A.rgba = function (h, a) {
    var c = rgb(h);
    return "rgba(" + Math.round(c[0] * 255) + "," + Math.round(c[1] * 255) + "," + Math.round(c[2] * 255) + "," + a + ")";
  };
  // Small deterministic PRNG so a background looks the same on every load.
  A.rand = function (seed) {
    var s = seed >>> 0 || 1;
    return function () { s ^= s << 13; s ^= s >>> 17; s ^= s << 5; return (s >>> 0) / 4294967296; };
  };

  function load(name) {
    if (asked[name] || !/^[a-z0-9-]+$/.test(name)) return;
    asked[name] = 1;
    var s = D.createElement("script");
    s.src = base + name + ".js";
    s.async = true;
    D.head.appendChild(s);
  }

  function register(t) {
    if (!t || !t.name || types[t.name]) return;
    types[t.name] = t;
    scan();
  }

  function mount(el) {
    if (el.__akbg) return;
    var name = el.getAttribute("data-bg"), T = types[name];
    if (!T) { load(name); return; }
    var df = T.defaults || {};
    var given = (el.getAttribute("data-colors") || "").split(",").map(function (s) { return s.trim(); }).filter(Boolean);
    var hexes = [0, 1, 2].map(function (i) { return given[i] || df.colors[i] || given[given.length - 1]; });
    var bh = el.getAttribute("data-base") || df.base || "#0b1016";
    var st = el.style;
    st.setProperty("--bg-base", bh);
    hexes.forEach(function (h, i) { st.setProperty("--bg-c" + i, h); });
    if (df.grain && !el.hasAttribute("data-grain")) el.setAttribute("data-grain", "");
    var cv = D.createElement("canvas");
    cv.className = "bg__c";
    cv.setAttribute("aria-hidden", "true");
    var I = {
      el: el, cv: cv, hexes: hexes, baseHex: bh, cols: hexes.map(rgb), base: rgb(bh),
      t: df.t0 || 6, speed: parseFloat(el.getAttribute("data-speed")) || 1,
      still: el.getAttribute("data-motion") === "static", vis: false, w: 0, h: 0,
      frames: 0, ms: 0, scale: T.scale || 1
    };
    el.__akbg = I;
    var r = null;
    try { r = T.create(I, A); } catch (e) { I.err = String(e && e.message || e); r = null; }
    if (!r || I.dead) { fallback(I); return; }
    I.r = r;
    el.insertBefore(cv, el.firstChild);
    el.classList.add("bg--on");
    cv.addEventListener("webglcontextlost", function (e) { e.preventDefault(); fallback(I); }, false);
    inst.push(I);
    size(I);
    if (W.ResizeObserver) new ResizeObserver(function () { size(I); }).observe(el);
    else W.addEventListener("resize", function () { size(I); });
    if (W.IntersectionObserver) {
      new IntersectionObserver(function (es) {
        I.vis = es[es.length - 1].isIntersecting;
        if (I.vis) { if (I.still) paint(I, 0); kick(); }
      }, { rootMargin: "120px" }).observe(el);
    } else { I.vis = true; kick(); }
  }

  function fallback(I) {
    I.dead = 1;
    I.el.classList.remove("bg--on");
    I.el.classList.add("bg--fallback");
    if (I.cv.parentNode) I.cv.parentNode.removeChild(I.cv);
  }

  function size(I) {
    if (I.dead) return;
    var w = I.el.clientWidth, h = I.el.clientHeight;
    if (!w || !h) return;
    var d = Math.min(W.devicePixelRatio || 1, 1.5) * I.scale;
    var cw = Math.max(1, Math.round(w * d)), ch = Math.max(1, Math.round(h * d));
    if (cw === I.w && ch === I.h) return;
    I.w = cw; I.h = ch; I.dpr = d;
    if (!I.off) { I.cv.width = cw; I.cv.height = ch; }
    I.r.resize(cw, ch, d);
    paint(I, 0);
  }

  function paint(I, dt) {
    if (I.dead || !I.w) return;
    var a = W.performance ? performance.now() : 0;
    try { I.r.draw(I.t, dt); } catch (e) { I.err = String(e && e.message || e); fallback(I); return; }
    if (dt) { I.frames++; I.ms += (W.performance ? performance.now() : 0) - a; }
  }

  function tick(now) {
    raf = 0;
    var dt = last ? Math.min((now - last) / 1000, 0.1) : 0;
    last = now;
    var f = reduced() ? A.REDUCED : 1, any = false;
    for (var i = 0; i < inst.length; i++) {
      var I = inst[i];
      if (I.dead || I.still || !I.vis || D.hidden) continue;
      any = true;
      var s = dt * f * I.speed;
      I.t += s;
      if (s) paint(I, s);
    }
    if (any) raf = requestAnimationFrame(tick); else last = 0;
  }
  function kick() { if (!raf && !D.hidden) raf = requestAnimationFrame(tick); }
  D.addEventListener("visibilitychange", function () { last = 0; kick(); });

  function scan() {
    var els = D.querySelectorAll("[data-bg]");
    for (var i = 0; i < els.length; i++) mount(els[i]);
  }

  // WebGL backgrounds render in a Worker (OffscreenCanvas) so creating a context never
  // blocks the page; without worker WebGL, gl.js is loaded as a normal script instead.
  var wk = null, hs = {}, gid = 0, glq = [];
  function worker() {
    if (!wk) {
      wk = new Worker(base + "gl.js");
      wk.onmessage = function (e) { var h = hs[e.data.id]; if (h) h(e.data); };
      wk.onerror = function () { for (var k in hs) hs[k]({ k: "x" }); };
    }
    return wk;
  }
  function glMain(fn) {
    if (A.glMake) return fn();
    glq.push(fn);
    if (glq.length > 1) return;
    A.glReady = function () { glq.splice(0).forEach(function (f) { f(); }); };
    var s = D.createElement("script");
    s.src = base + "gl.js";
    D.head.appendChild(s);
  }
  A.gl = function (I, frag) {
    var id = ++gid, busy = 1, up = 0, local = null;
    function main() {
      I.off = false;
      glMain(function () {
        try { local = A.glMake(I.cv, frag, I.cols, I.base); } catch (e) { I.err = String(e.message || e); }
        if (!local) { fallback(I); return; }
        busy = 0;
        if (I.w) { local.resize(I.w, I.h); paint(I, 0); }
      });
    }
    function swap() {
      var n = D.createElement("canvas");
      n.className = "bg__c";
      n.setAttribute("aria-hidden", "true");
      if (I.cv.parentNode) I.cv.parentNode.replaceChild(n, I.cv);
      I.cv = n;
      main();
    }
    if (I.cv.transferControlToOffscreen && W.Worker && W.OffscreenCanvas) {
      try {
        var off = I.cv.transferControlToOffscreen();
        hs[id] = function (m) {
          if (m.k === "a") { busy = 0; if (!up) { up = 1; paint(I, 0); } return; }
          delete hs[id];
          if (m.e) { I.err = m.e; fallback(I); } else swap();
        };
        worker().postMessage({ k: "i", id: id, cv: off, f: frag, c: I.cols, b: I.base }, [off]);
        I.off = true;
      } catch (e) { main(); }
    } else main();
    return {
      resize: function (w, h) { if (I.off) wk.postMessage({ k: "s", id: id, w: w, h: h }); else if (local) local.resize(w, h); },
      draw: function (t) {
        if (I.off) { if (!busy) { busy = 1; wk.postMessage({ k: "d", id: id, t: t }); } }
        else if (local) local.draw(t);
      }
    };
  };

  A.register = register;
  A.mount = mount;
  A.instances = inst;
  var q = A.q || [];
  A.q = { push: register };
  if (D.readyState === "loading") D.addEventListener("DOMContentLoaded", function () { q.forEach(register); scan(); });
  else { q.forEach(register); scan(); }
})(window, document);
