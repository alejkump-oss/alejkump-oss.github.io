/* Page choreography: film progress, masked word reveals, frame-scrolling screenshots,
   nav state, local clock and the fitted sign-off. Everything degrades to a readable
   static page without JS, and reduced motion skips every transform. */
(function () {
  "use strict";
  var d = document, root = d.documentElement;
  var reduce = root.classList.contains("rm");
  function $(s, c) { return (c || d).querySelector(s); }
  function $$(s, c) { return Array.prototype.slice.call((c || d).querySelectorAll(s)); }
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
  function smooth(a, b, v) { var t = clamp((v - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); }

  /* Wrap every word in a mask, keeping the white/grey spans intact. */
  function splitWords(el) {
    var i = 0;
    $$("span", el).concat(el.children.length ? [] : [el]).forEach(function (span) {
      var words = span.textContent.split(/(\s+)/);
      span.textContent = "";
      words.forEach(function (w) {
        if (!w) return;
        if (/^\s+$/.test(w)) { span.appendChild(d.createTextNode(" ")); return; }
        var o = d.createElement("span"); o.className = "w";
        var n = d.createElement("span"); n.textContent = w;
        o.style.setProperty("--i", i++);
        o.appendChild(n); span.appendChild(o);
      });
    });
    return $$(".w > span", el);
  }

  /* ---------- Clock (Europe/Ljubljana, the studio's own time) ---------- */
  var clock = $("#clock");
  function tick() {
    try {
      clock.textContent = new Intl.DateTimeFormat("sl-SI", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/Ljubljana" }).format(new Date());
    } catch (e) { clock.textContent = ""; }
  }
  if (clock) { tick(); setInterval(tick, 20000); }

  /* ---------- Film ---------- */
  var film = $(".film"), intro = $("#intro"), say = $("#say"), tc = $("#tc"), hint = $(".film-hint");
  var sayWords = reduce ? [] : splitWords(say);

  /* ---------- Sections: word masks + generic reveals ---------- */
  $$("[data-words]").forEach(function (el) { if (!reduce) splitWords(el); });

  if (!reduce && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -12% 0px", threshold: 0.01 });
    $$("[data-words], .rv, .step, .sign").forEach(function (el) { io.observe(el); });
  } else {
    $$("[data-words], .rv, .step, .sign").forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- Nav: slim panel after the film; label follows the current chapter ---------- */
  var nav = $("#nav"), navSec = $("#navSec");
  var secs = $$("[data-label]");

  /* ---------- Screenshots scroll inside their frames ---------- */
  var shots = $$(".shot").map(function (f) { return { f: f, img: $("img", f) }; });

  /* ---------- Fitted name ---------- */
  var word = $("#word"), wordSpan = word && $("span", word);
  if (wordSpan) {
    var txt = wordSpan.textContent; wordSpan.textContent = "";
    txt.split("").forEach(function (ch, i) {
      var c = d.createElement("span"); c.className = "c"; c.style.setProperty("--i", i);
      c.textContent = ch === " " ? " " : ch; wordSpan.appendChild(c);
    });
  }
  function fit() {
    if (!word) return;
    word.style.fontSize = "100px";
    var avail = word.parentNode.clientWidth - 40;
    var wd = wordSpan.getBoundingClientRect().width;
    if (wd > 0) word.style.fontSize = Math.floor(100 * avail / wd) + "px";
  }

  var vh = window.innerHeight, ticking = false;
  function frame() {
    ticking = false;
    var y = window.pageYOffset || root.scrollTop;

    /* film progress 0..1 across the pinned region */
    var fr = film.getBoundingClientRect();
    var span = Math.max(1, fr.height - vh);
    var p = reduce ? 0 : clamp(-fr.top / span, 0, 1);
    window.__filmP = p;
    if (window.__filmKick && fr.bottom > 0) window.__filmKick();

    if (!reduce) {
      var a = 1 - smooth(0.06, 0.24, p);
      intro.style.opacity = a;
      intro.style.transform = "translate3d(0," + (-40 * (1 - a)) + "px,0)";
      if (hint) hint.style.opacity = 1 - smooth(0.0, 0.08, p);
      var n = sayWords.length, inP = smooth(0.24, 0.56, p), out = smooth(0.80, 0.94, p);
      for (var i = 0; i < n; i++) {
        var k = clamp(inP * (n + 3) - i, 0, 1);
        k = 1 - Math.pow(1 - k, 3);
        sayWords[i].style.transform = "translate3d(0," + ((1 - k) * 105 - out * 105) + "%,0)";
      }
      if (tc) {
        var fs = Math.floor(p * 8 * 25);
        var s = Math.floor(fs / 25), f = fs % 25;
        tc.textContent = "00:00:" + (s < 10 ? "0" : "") + s + ":" + (f < 10 ? "0" : "") + f;
      }

      for (var j = 0; j < shots.length; j++) {
        var sh = shots[j], r = sh.f.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) continue;
        var ih = sh.img.offsetHeight, fh = r.height;
        if (ih <= fh) continue;
        var t = clamp((vh - r.top) / (vh + fh), 0, 1);
        t = smooth(0.12, 0.88, t);
        sh.img.style.transform = "translate3d(0," + (-(ih - fh) * t).toFixed(1) + "px,0)";
      }
    }

    nav.classList.toggle("slim", y > vh * 0.6);
    var cur = secs[0];
    for (var m = 0; m < secs.length; m++) { if (secs[m].getBoundingClientRect().top < vh * 0.4) cur = secs[m]; }
    if (cur && navSec.textContent !== cur.getAttribute("data-label")) navSec.textContent = cur.getAttribute("data-label");
  }
  function req() { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }

  window.addEventListener("scroll", req, { passive: true });
  window.addEventListener("resize", function () { vh = window.innerHeight; fit(); req(); });
  window.addEventListener("load", function () { fit(); req(); });
  if (d.fonts && d.fonts.ready) d.fonts.ready.then(function () { fit(); });
  fit();
  frame();
})();
