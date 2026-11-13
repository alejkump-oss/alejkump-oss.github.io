/*! AK bg "dots" - dot grid with slow light ripples. Own implementation (canvas 2D), see LICENSES.md. */
(function (W) {
  "use strict";
  var T = {
    name: "dots",
    defaults: { colors: ["#9aa4b2", "#ec9466", "#ffffff"], base: "#0e131a" },
    create: function (I, A) {
      var x = I.cv.getContext("2d");
      if (!x) return null;
      var w = 0, h = 0, d = 1, gap = 22, R = 1, pts = [], dots = null;
      return {
        resize: function (cw, ch, dp) {
          w = cw; h = ch; d = dp; gap = Math.round(22 * dp); R = Math.max(1, Math.round(1.1 * dp));
          pts = [];
          var ox = (w % gap) / 2, oy = (h % gap) / 2, cx = w * 0.5, cy = h * 0.42, far = Math.hypot(w, h) * 0.6;
          dots = document.createElement("canvas");
          dots.width = w; dots.height = h;
          var g = dots.getContext("2d");
          for (var py = oy; py < h; py += gap) {
            for (var px = ox; px < w; px += gap) {
              var dist = Math.hypot(px - cx, py - cy);
              var fade = Math.max(0, 1 - dist / far);
              g.fillStyle = A.rgba(I.hexes[0], 0.08 + 0.32 * fade);
              g.fillRect(px - R, py - R, R * 2, R * 2);
              if (fade > 0.05) pts.push(px, py, dist / d, fade, (px * 0.013 + py * 0.007) % 6.2832);
            }
          }
        },
        draw: function (t) {
          x.clearRect(0, 0, w, h);
          if (dots) x.drawImage(dots, 0, 0);
          x.fillStyle = I.hexes[1];
          var r2 = R * 2;
          for (var i = 0; i < pts.length; i += 5) {
            var v = Math.sin(pts[i + 2] * 0.03 - t * 1.4 + Math.sin(pts[i + 4] + t * 0.3) * 0.6);
            if (v < 0.45) continue;
            v = (v - 0.45) / 0.55;
            x.globalAlpha = v * v * pts[i + 3];
            x.fillRect(pts[i] - R, pts[i + 1] - R, r2, r2);
          }
          x.globalAlpha = 1;
        }
      };
    }
  };
  var A=W.AKBG=W.AKBG||{q:[]};if(A.register)A.register(T);else{A.q.push(T);if(!A.boot){A.boot=1;var s=document.createElement("script"),c=document.currentScript;s.src=(c&&c.src?c.src.replace(/[^\/?#]*([?#].*)?$/,""):"/assets/bg/")+"bg.js";document.head.appendChild(s);}}
})(window);
