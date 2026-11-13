/* AK agencija · alejkump.si shared script: nav scroll state, the mobile menu, the scroll reveal,
   then the constellation. */

/* html.js: set here, not inline, so the entrance and reveal styles that hide content only ever
   apply once this script is actually running; a blocked script leaves the page plainly visible */
document.documentElement.classList.add("js");

/* ---------- nav: transparent at the top, a flat solid fill once the page scrolls ---------- */
(() => {
  "use strict";
  const nav = document.querySelector(".nav");
  if (!nav) return;
  let raf = 0;
  const update = () => { nav.classList.toggle("is-solid", window.scrollY > 8); raf = 0; };
  addEventListener("scroll", () => { if (!raf) raf = requestAnimationFrame(update); }, { passive: true });
  update();
})();

/* ---------- mobile menu: the header nav becomes a full-screen list below 1200 px ---------- */
(() => {
  "use strict";
  const btn = document.querySelector(".burger");
  const nav = document.getElementById("glavni-meni");
  if (!btn || !nav) return;
  const root = document.documentElement;
  const set = (open) => {
    root.classList.toggle("menu-open", open);
    btn.setAttribute("aria-expanded", open ? "true" : "false");
  };
  btn.addEventListener("click", () => set(!root.classList.contains("menu-open")));
  nav.addEventListener("click", (e) => { if (e.target.closest("a")) set(false); });
  addEventListener("keydown", (e) => { if (e.key === "Escape" && root.classList.contains("menu-open")) { set(false); btn.focus(); } });
  addEventListener("resize", () => { if (innerWidth >= 1200) set(false); }, { passive: true });
})();

/* ---------- work carousel: native scroll-snap does the swiping; this only wires the dots,
   prev/next and arrow keys, and keeps the active dot in step with the scroll. No autoplay. ---------- */
document.querySelectorAll(".car").forEach((car) => {
  "use strict";
  const track = car.querySelector(".car-track");
  const nav = car.querySelector(".car-nav");
  if (!track || !nav) return;
  const slides = [...track.children];
  const dots = [...nav.querySelectorAll(".car-dots button")];
  const [prev, next] = nav.querySelectorAll(".car-btn");
  const rm = () => document.documentElement.classList.contains("rm");
  let cur = 0, raf = 0;
  const show = (i) => {
    cur = i;
    dots.forEach((d, k) => (k === i ? d.setAttribute("aria-current", "true") : d.removeAttribute("aria-current")));
    prev.setAttribute("aria-disabled", i === 0 ? "true" : "false");
    next.setAttribute("aria-disabled", i === slides.length - 1 ? "true" : "false");
  };
  // a button- or key-driven scroll shows its target at once; scroll events are ignored until it lands
  let target = -1, guard = 0;
  const go = (i) => {
    i = Math.max(0, Math.min(slides.length - 1, i));
    show(i);
    const left = Math.min(slides[i].offsetLeft - slides[0].offsetLeft, track.scrollWidth - track.clientWidth);
    if (Math.abs(left - track.scrollLeft) < 2) return;
    target = i;
    clearTimeout(guard);
    guard = setTimeout(() => { target = -1; sync(); }, 900); // fallback where scrollend is missing
    track.scrollTo({ left, behavior: rm() ? "auto" : "smooth" });
  };
  // the slide whose left edge is nearest the track's left edge; at the very end, the last one
  const sync = () => {
    raf = 0;
    if (target >= 0) return;
    const x = track.scrollLeft, max = track.scrollWidth - track.clientWidth;
    let i = 0, best = Infinity;
    slides.forEach((s, k) => { const d = Math.abs(s.offsetLeft - slides[0].offsetLeft - x); if (d < best) { best = d; i = k; } });
    if (max > 0 && x >= max - 2) i = slides.length - 1;
    if (i !== cur) show(i);
  };
  track.addEventListener("scroll", () => { if (target < 0 && !raf) raf = requestAnimationFrame(sync); }, { passive: true });
  track.addEventListener("scrollend", () => { if (target >= 0) { clearTimeout(guard); target = -1; } });
  // a finger on the track always wins over a programmatic scroll still in flight
  track.addEventListener("pointerdown", () => { target = -1; }, { passive: true });
  track.addEventListener("touchstart", () => { target = -1; }, { passive: true });
  dots.forEach((d, k) => d.addEventListener("click", () => go(k)));
  prev.addEventListener("click", () => go(cur - 1));
  next.addEventListener("click", () => go(cur + 1));
  car.addEventListener("keydown", (e) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();
    go(cur + (e.key === "ArrowRight" ? 1 : -1));
  });
  nav.hidden = false;
  show(0);
});

/* ---------- reveal: a section rises into place the first time it scrolls into view.
   The html.js class (set inline in <head>) is what hides it beforehand, so without JS, or
   with reduced motion, everything is simply visible. ---------- */
(() => {
  "use strict";
  const els = document.querySelectorAll("[data-reveal]");
  if (!els.length) return;
  const all = () => els.forEach((el) => el.classList.add("is-in"));
  if (!("IntersectionObserver" in window) || document.documentElement.classList.contains("rm")) { all(); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.06 });
  els.forEach((el) => io.observe(el));
  // printing or a full-page capture must never leave a section blank
  addEventListener("beforeprint", all);
})();

/* AK agencija · constellation.
   On the homepage (an #orbit element exists) the triangles form the browser window;
   on every other page only the sparse ambient dust drifts behind the text.
   Thousands of tiny outlined triangles assemble into a browser window (a website: title bar,
   headline, text, button, picture). Scrolling past the hero releases them into drifting dust;
   a sparse field of ambient triangles drifts behind the whole page. Pointer and touch tilt
   the shape and push nearby triangles aside. Reduced motion: one static frame, no loop.
   Canvas 2D, batched into one stroke per colour and alpha level. No dependencies.
   Start is deferred: the point cloud is built and the loop started only after the window has
   loaded and the main thread is idle (requestIdleCallback, 1.5 s cap), so the text, the
   font and the first tap are never behind it. Until then the canvas is simply black. */
function bootSky() {
  "use strict";
  const cv = document.getElementById("sky");
  const orbit = document.getElementById("orbit");
  const hero = document.querySelector(".hero");
  if (!cv || !cv.getContext) return;
  const SHAPE = !!(orbit && hero);
  const ctx = cv.getContext("2d");
  if (!ctx || typeof Path2D === "undefined") return;

  const RM = document.documentElement.classList.contains("rm");
  const small = Math.min(window.innerWidth, screen.width || 9999) < 760 || (navigator.hardwareConcurrency || 8) <= 4;
  const N = !SHAPE ? 0 : small ? 900 : 3400; // shape triangles (capped on phones / weak CPUs)
  const NA = small ? 60 : 150;        // ambient triangles
  // phones and weak CPUs: a lighter canvas and ~30 fps, so no single frame blocks input
  const DPR = Math.min(window.devicePixelRatio || 1, small ? 1.25 : 2);
  const STEP = small ? 32 : 0;

  // particle palette: violet, teal, amber families plus white and grey
  const COLORS = ["#8052ff", "#a68cff", "#15846e", "#22b08f", "#ffb829", "#ffd27a", "#ffffff", "#9a9a9a"];
  const LEVELS = [0.3, 0.62, 1];
  const NB = COLORS.length * LEVELS.length;

  /* ---------- the shape: a browser window, rasterised once and sampled ---------- */
  const SW = 480, SH = 340;
  function shapePoints(n) {
    const oc = document.createElement("canvas");
    oc.width = SW; oc.height = SH;
    const g = oc.getContext("2d");
    const rr = (x, y, w, h, r) => {
      g.beginPath(); g.moveTo(x + r, y);
      g.arcTo(x + w, y, x + w, y + h, r); g.arcTo(x + w, y + h, x, y + h, r);
      g.arcTo(x, y + h, x, y, r); g.arcTo(x, y, x + w, y, r); g.closePath();
    };
    g.fillStyle = g.strokeStyle = "#fff";
    g.globalAlpha = 1; g.lineWidth = 9; rr(6, 6, SW - 12, SH - 12, 26); g.stroke();   // frame
    g.fillRect(6, 52, SW - 12, 4);                                                    // title bar
    [32, 56, 80].forEach((x) => { g.beginPath(); g.arc(x, 29, 7, 0, Math.PI * 2); g.fill(); });
    g.globalAlpha = 0.5; rr(130, 18, 230, 22, 11); g.fill();                          // address bar
    g.globalAlpha = 1; rr(40, 92, 196, 24, 6); g.fill(); rr(40, 126, 150, 24, 6); g.fill(); // headline
    g.globalAlpha = 0.5; [[170, 188], [186, 170], [202, 180]].forEach(([y, w]) => { rr(40, y, w, 6, 3); g.fill(); });
    g.globalAlpha = 1; rr(40, 228, 112, 34, 17); g.fill();                             // button
    g.globalAlpha = 0.3; rr(266, 86, 176, 190, 16); g.fill();                          // picture
    g.globalAlpha = 1; g.beginPath(); g.arc(394, 130, 15, 0, Math.PI * 2); g.fill();
    g.beginPath(); g.moveTo(266, 262); g.lineTo(322, 186); g.lineTo(360, 228); g.lineTo(388, 200); g.lineTo(442, 262); g.closePath(); g.fill();
    g.globalAlpha = 0.42; [40, 150, 260].forEach((x) => { rr(x, 296, 90, 12, 6); g.fill(); }); // footer

    const d = g.getImageData(0, 0, SW, SH).data;
    // rejection sampling straight on the bitmap (same distribution as listing every painted
    // pixel first, without the 160k-pixel scan that blocked the main thread on phones)
    const pts = [];
    let guard = 0;
    while (pts.length < n * 0.88 && guard++ < n * 600) {
      const x = (Math.random() * SW) | 0, y = (Math.random() * SH) | 0;
      const a = d[(y * SW + x) * 4 + 3];
      if (a > 8 && Math.random() * 255 < a) pts.push([x + (Math.random() - 0.5) * 3, y + (Math.random() - 0.5) * 3, 0]);
    }
    while (pts.length < n) { // a faint nebula around the window keeps the silhouette organic
      const a = Math.random() * Math.PI * 2, r = 0.35 + Math.pow(Math.random(), 0.7) * 0.75;
      pts.push([SW / 2 + Math.cos(a) * r * SW * 0.6, SH / 2 + Math.sin(a) * r * SH * 0.68, 1]);
    }
    return pts;
  }

  const P = [];
  (SHAPE ? shapePoints(N) : []).forEach(([x, y, halo]) => {
    const nx = (x - SW / 2) / SW, ny = (y - SH / 2) / SW;
    const t = (x / SW) * 0.65 + (y / SH) * 0.35 + (Math.random() - 0.5) * 0.28;
    const r = Math.random();
    let c;
    if (r < 0.11) c = 6; else if (r < 0.19) c = 7;
    else if (t < 0.4) c = Math.random() < 0.6 ? 0 : 1;
    else if (t < 0.62) c = Math.random() < 0.6 ? 2 : 3;
    else c = Math.random() < 0.65 ? 4 : 5;
    const len = Math.hypot(nx, ny) || 1;
    P.push({
      nx, ny, nz: (Math.random() - 0.5) * (halo ? 0.45 : 0.1), halo, c,
      s: (small ? 1.5 : 2) + Math.random() * (halo ? 1.6 : 3),
      rot: Math.random() * 6.283, spin: (Math.random() - 0.5) * 0.0012, ph: Math.random() * 6.283,
      del: Math.random() * 0.45, sx: Math.random(), sy: Math.random(),
      ex: (nx / len) * (0.5 + Math.random()) + (Math.random() - 0.5) * 0.6,
      ey: (ny / len) * (0.5 + Math.random()) - 0.4 - Math.random() * 0.6,
      ox: 0, oy: 0,
    });
  });

  const AMB_C = [0, 1, 2, 3, 4, 6, 7];
  const A = [];
  for (let i = 0; i < NA; i++) {
    A.push({
      x: Math.random(), y: Math.random(), depth: 0.2 + Math.random() * 0.8,
      s: 1.3 + Math.random() * 2.4, c: AMB_C[(Math.random() * AMB_C.length) | 0],
      rot: Math.random() * 6.283, spin: (Math.random() - 0.5) * 0.0008, ph: Math.random() * 6.283,
      vx: (Math.random() - 0.5) * 0.000014, vy: -(0.000005 + Math.random() * 0.000012),
    });
  }

  /* ---------- geometry, sizing, input ---------- */
  let W = 0, H = 0, O = { x: 0, y: 0, w: 0, h: 0 }, heroH = 1;
  function size(force) {
    if (RM && SHAPE) cv.style.height = hero.offsetHeight + "px";
    const w = cv.clientWidth, h = cv.clientHeight;
    if (!force && w === W && Math.abs(h - H) < 160) return; // ignore iOS toolbar wobble
    W = w; H = h;
    cv.width = Math.round(w * DPR); cv.height = Math.round(h * DPR);
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }
  function measure() {
    if (!SHAPE) return;
    const r = orbit.getBoundingClientRect();
    O = { x: r.left, y: r.top + window.scrollY, w: r.width, h: r.height };
    heroH = hero.offsetHeight || 1;
  }

  let px = -9999, py = -9999, tx = 0, ty = 0, mx = 0, my = 0, lastMove = 0;
  function onPt(x, y) { px = x; py = y; tx = (x / (W || 1)) * 2 - 1; ty = (y / (H || 1)) * 2 - 1; lastMove = performance.now(); }
  if (!RM) {
    addEventListener("pointermove", (e) => onPt(e.clientX, e.clientY), { passive: true });
    const touch = (e) => { const t = e.touches && e.touches[0]; if (t) onPt(t.clientX, t.clientY); };
    addEventListener("touchstart", touch, { passive: true });
    addEventListener("touchmove", touch, { passive: true });
  }

  function tri(path, x, y, s, r) {
    const c = Math.cos(r) * s, si = Math.sin(r) * s;
    path.moveTo(x + c, y + si);
    path.lineTo(x - 0.5 * c - 0.866 * si, y - 0.5 * si + 0.866 * c);
    path.lineTo(x - 0.5 * c + 0.866 * si, y - 0.5 * si - 0.866 * c);
    path.closePath();
  }

  /* ---------- drawing ---------- */
  const paths = new Array(NB), used = new Uint8Array(NB);
  let t0 = -1, last = 0;
  const R = small ? 80 : 120, R2 = R * R;

  function frame(now) {
    if (t0 < 0) t0 = now + 120;
    const dt = Math.min(64, now - (last || now)); last = now;
    const sY = RM ? 0 : window.scrollY;
    for (let k = 0; k < NB; k++) { paths[k] = new Path2D(); used[k] = 0; }

    if (!RM && now - lastMove > 2600) { tx *= 0.98; ty *= 0.98; px = -9999; }
    mx += (tx - mx) * 0.045; my += (ty - my) * 0.045;

    // ambient dust across the page, with a little scroll parallax
    const span = H * 1.2;
    for (const a of A) {
      if (!RM) { a.x += a.vx * dt; a.y += a.vy * dt; }
      const x = (((a.x % 1) + 1) % 1) * W;
      const y = ((((a.y * span - sY * a.depth * 0.3) % span) + span) % span) - H * 0.1;
      const tw = Math.sin(now * 0.0011 + a.ph);
      const l = tw > 0.6 ? 1 : 0;
      const k = a.c * 3 + l; used[k] = 1;
      tri(paths[k], x, y, a.s, a.rot + now * a.spin);
    }

    // the shape
    const d = RM ? 0 : Math.min(1, Math.max(0, sY / (heroH * 0.85)));
    if (SHAPE && d < 1) {
      const asm = RM ? 9 : (now - t0) / 2400;
      const cx = O.x + O.w / 2, cy = O.y - sY + O.h / 2, scale = O.w * 0.94;
      const yaw = mx * 0.38 + Math.sin(now * 0.00023) * 0.14 + d * 0.5;
      const pitch = -my * 0.22 + Math.sin(now * 0.00017) * 0.05 + d * 0.3;
      const cY = Math.cos(yaw), sYw = Math.sin(yaw), cP = Math.cos(pitch), sP = Math.sin(pitch);
      const F = 2.2, e = d * d;
      for (const p of P) {
        let a = (asm - p.del) / 0.55;
        a = a <= 0 ? 0 : a >= 1 ? 1 : 1 - Math.pow(1 - a, 3);
        const z = p.nz + Math.sin(now * 0.0011 + p.ph) * 0.008;
        const x1 = p.nx * cY + z * sYw, z1 = -p.nx * sYw + z * cY;
        const y1 = p.ny * cP - z1 * sP, z2 = p.ny * sP + z1 * cP;
        const k3 = F / (F + z2);
        let X = cx + x1 * k3 * scale, Y = cy + y1 * k3 * scale;
        if (e > 0) { X += p.ex * e * W * 0.9; Y += p.ey * e * H * 0.9; }
        if (a < 1) { const sx = p.sx * W, sy = p.sy * H; X = sx + (X - sx) * a; Y = sy + (Y - sy) * a; }
        // pointer pushes nearby triangles aside, eased
        const dx = X - px, dy = Y - py, dd = dx * dx + dy * dy;
        let gx = 0, gy = 0;
        if (dd < R2) { const dist = Math.sqrt(dd) || 1, f = 1 - dist / R, push = f * f * 34; gx = (dx / dist) * push; gy = (dy / dist) * push; }
        p.ox += (gx - p.ox) * 0.12; p.oy += (gy - p.oy) * 0.12;
        X += p.ox; Y += p.oy;
        if (X < -12 || X > W + 12 || Y < -12 || Y > H + 12) continue;
        const tw = RM ? Math.sin(p.ph * 3) : Math.sin(now * 0.0016 + p.ph);
        let l = tw > 0.55 ? 2 : tw > -0.35 ? 1 : 0;
        if (p.halo) l = Math.max(0, l - 1);
        if (a < 0.35 || d > 0.85) l = 0; else if (d > 0.45) l = Math.min(l, 1);
        const k = p.c * 3 + l; used[k] = 1;
        tri(paths[k], X, Y, p.s * k3, p.rot + now * p.spin);
      }
    }

    ctx.globalAlpha = 1;
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, W, H);
    ctx.lineWidth = 0.9;
    ctx.lineJoin = "round";
    for (let k = 0; k < NB; k++) {
      if (!used[k]) continue;
      ctx.globalAlpha = LEVELS[k % 3];
      ctx.strokeStyle = COLORS[(k / 3) | 0];
      ctx.stroke(paths[k]);
    }
    ctx.globalAlpha = 1;
  }

  /* ---------- loop control: runs only while the page is visible ---------- */
  let raf = 0, running = false;
  let drawn = 0;
  function loop(now) {
    if (now - drawn >= STEP) { drawn = now; frame(now); }
    if (running) raf = requestAnimationFrame(loop);
  }
  function start() { if (running || RM || document.hidden) return; running = true; last = 0; raf = requestAnimationFrame(loop); }
  function stop() { running = false; cancelAnimationFrame(raf); }
  function still() { size(true); measure(); frame(0); }

  size(true); measure();
  if (RM) still(); else start();

  addEventListener("resize", () => { if (RM) { still(); return; } size(false); measure(); }, { passive: true });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { measure(); if (RM) still(); });
  document.addEventListener("visibilitychange", () => (document.hidden ? stop() : start()));
}

(() => {
  "use strict";
  let booted = false;
  const boot = () => { if (booted) return; booted = true; try { bootSky(); } catch (e) { /* the page is complete without the canvas */ } };
  const idle = () => ("requestIdleCallback" in window ? requestIdleCallback(boot, { timeout: 1500 }) : setTimeout(boot, 250));
  if (document.readyState === "complete") idle(); else addEventListener("load", idle, { once: true });
})();
