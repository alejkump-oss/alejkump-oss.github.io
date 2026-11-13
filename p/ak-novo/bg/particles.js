/*! AK bg "particles" - soft glowing particles drifting upward (embers, bokeh). Own implementation (canvas 2D), see LICENSES.md. */
(function (W) {
  "use strict";
  var T = {
    name: "particles",
    defaults: { colors: ["#ffb36b", "#ff7a45", "#ffe3a3"], base: "#1a100b" },
    create: function (I, A) {
      var x = I.cv.getContext("2d");
      if (!x) return null;
      var P = [], w = 0, h = 0, d = 1;
      var spr = I.hexes.map(function (hx) {
        var s = 64, c = document.createElement("canvas");
        c.width = c.height = s;
        var g = c.getContext("2d"), gr = g.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
        gr.addColorStop(0, A.rgba(hx, 1));
        gr.addColorStop(0.18, A.rgba(hx, 0.7));
        gr.addColorStop(0.45, A.rgba(hx, 0.18));
        gr.addColorStop(1, A.rgba(hx, 0));
        g.fillStyle = gr;
        g.fillRect(0, 0, s, s);
        return c;
      });
      return {
        resize: function (cw, ch, dp) {
          w = cw; h = ch; d = dp;
          var css = (cw / dp) * (ch / dp);
          var n = Math.max(14, Math.min(70, Math.round(css / 7000)));
          var r = A.rand(1337);
          P = [];
          for (var i = 0; i < n; i++) {
            var big = r() < 0.18;
            P.push({
              x: r() * w, y: r() * h,
              s: (big ? 26 + r() * 34 : 6 + r() * 14) * d,
              vy: (big ? 6 + r() * 8 : 12 + r() * 26) * d,
              sw: (8 + r() * 22) * d, f: 0.25 + r() * 0.5, tw: 0.6 + r() * 1.6,
              ph: r() * 6.28, a: big ? 0.18 + r() * 0.16 : 0.45 + r() * 0.5, c: i % 3
            });
          }
        },
        draw: function (t, dt) {
          x.clearRect(0, 0, w, h);
          x.globalCompositeOperation = "lighter";
          for (var i = 0; i < P.length; i++) {
            var p = P[i];
            p.y -= p.vy * dt;
            if (p.y < -p.s) { p.y = h + p.s; }
            var px = p.x + Math.sin(t * p.f + p.ph) * p.sw;
            var fade = Math.min(1, p.y / (h * 0.35));
            x.globalAlpha = p.a * (0.65 + 0.35 * Math.sin(t * p.tw + p.ph)) * Math.max(0, fade);
            x.drawImage(spr[p.c], px - p.s / 2, p.y - p.s / 2, p.s, p.s);
          }
          x.globalAlpha = 1;
          x.globalCompositeOperation = "source-over";
        }
      };
    }
  };
  var A=W.AKBG=W.AKBG||{q:[]};if(A.register)A.register(T);else{A.q.push(T);if(!A.boot){A.boot=1;var s=document.createElement("script"),c=document.currentScript;s.src=(c&&c.src?c.src.replace(/[^\/?#]*([?#].*)?$/,""):"/assets/bg/")+"bg.js";document.head.appendChild(s);}}
})(window);
