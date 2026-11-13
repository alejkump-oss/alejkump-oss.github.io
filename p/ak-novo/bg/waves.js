/*! AK bg "waves" - layered translucent waves rolling slowly. Own implementation (canvas 2D), see LICENSES.md. */
(function (W) {
  "use strict";
  var T = {
    name: "waves",
    defaults: { colors: ["#2fb6c9", "#3c7bd9", "#a7f0e6"], base: "#06202b" },
    create: function (I, A) {
      var x = I.cv.getContext("2d");
      if (!x) return null;
      var w = 0, h = 0, d = 1, L = [];
      return {
        resize: function (cw, ch, dp) {
          w = cw; h = ch; d = dp;
          L = [];
          for (var i = 0; i < 5; i++) {
            L.push({
              y: h * (0.5 + i * 0.1), a: h * (0.035 + 0.012 * i) + 10 * dp,
              k: 6.2832 * (1.1 + i * 0.35) / w, s: 0.35 + i * 0.12, ph: i * 1.7,
              fill: A.rgba(I.hexes[i % 3], 0.13 + i * 0.03), line: A.rgba(I.hexes[(i + 2) % 3], 0.35)
            });
          }
        },
        draw: function (t) {
          x.clearRect(0, 0, w, h);
          var step = Math.max(8, Math.round(14 * d));
          x.lineWidth = 1.2 * d;
          for (var i = 0; i < L.length; i++) {
            var l = L[i];
            x.beginPath();
            x.moveTo(0, h);
            for (var px = 0; px <= w + step; px += step) {
              var y = l.y + l.a * Math.sin(px * l.k + t * l.s + l.ph) + l.a * 0.45 * Math.sin(px * l.k * 2.3 - t * l.s * 0.7 + l.ph * 2);
              x.lineTo(px, y);
            }
            x.lineTo(w, h);
            x.closePath();
            x.fillStyle = l.fill;
            x.fill();
            x.strokeStyle = l.line;
            x.stroke();
          }
        }
      };
    }
  };
  var A=W.AKBG=W.AKBG||{q:[]};if(A.register)A.register(T);else{A.q.push(T);if(!A.boot){A.boot=1;var s=document.createElement("script"),c=document.currentScript;s.src=(c&&c.src?c.src.replace(/[^\/?#]*([?#].*)?$/,""):"/assets/bg/")+"bg.js";document.head.appendChild(s);}}
})(window);
