(function () {
  "use strict";
  var W = window, D = document;
  var rm = W.matchMedia ? W.matchMedia("(prefers-reduced-motion: reduce)") : null;
  function reduced() { return !!(rm && rm.matches); }

  // Scroll reveal: each element rises in once.
  var rv = D.querySelectorAll(".rv");
  if ("IntersectionObserver" in W) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    rv.forEach(function (el) { io.observe(el); });
  } else rv.forEach(function (el) { el.classList.add("in"); });

  // Sticky button appears once the hero buttons are off screen.
  var st = D.getElementById("sticky"), cta = D.getElementById("heroCta");
  if (st && cta && "IntersectionObserver" in W) {
    new IntersectionObserver(function (es) { st.classList.toggle("show", !es[0].isIntersecting); }).observe(cta);
  } else if (st) st.classList.add("show");

  // Parallax portrait: transform only, one rAF per scroll burst; 25 % amplitude under reduced motion.
  var img = D.getElementById("px");
  if (img) {
    var box = img.parentNode, ticking = false;
    var upd = function () {
      ticking = false;
      var r = box.getBoundingClientRect(), vh = W.innerHeight;
      if (r.bottom < 0 || r.top > vh) return;
      var p = (r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2); // -1..1
      var amp = r.height * 0.09 * (reduced() ? 0.25 : 1);
      img.style.transform = "translate3d(0," + (p * amp - r.height * 0.09).toFixed(1) + "px,0)";
    };
    W.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(upd); } }, { passive: true });
    W.addEventListener("resize", upd);
    upd();
  }
})();
