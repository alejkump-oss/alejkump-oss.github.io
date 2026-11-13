/*! AK bg "beams" - fine grid with light beams travelling along its lines. Own implementation (canvas 2D), see LICENSES.md. */
(function (W) {
  "use strict";
  var T = {
    name: "beams",
    defaults: { colors: ["#ec9466", "#8fb4ff", "#ffffff"], base: "#0b1016" },
    create: function (I, A) {
      var x = I.cv.getContext("2d");
      if (!x) return null;
      var w = 0, h = 0, d = 1, cell = 48, grid = null, B = [], rnd = A.rand(77);
      function spawn(b, first) {
        b.hz = rnd() < 0.5;
        var lines = b.hz ? Math.floor(h / cell) : Math.floor(w / cell);
        b.k = (1 + Math.floor(rnd() * Math.max(1, lines - 1))) * cell + 0.5;
        b.len = (70 + rnd() * 150) * d;
        b.v = (90 + rnd() * 160) * d;
        b.dir = rnd() < 0.5 ? 1 : -1;
        var span = b.hz ? w : h;
        // First wave starts on screen; later beams re-enter after a short gap so one is always moving.
        var off = first ? rnd() * span : -b.len - rnd() * span * 0.25;
        b.p = b.dir > 0 ? off : span - off;
        b.c = I.hexes[Math.floor(rnd() * 2)];
        return b;
      }
      return {
        resize: function (cw, ch, dp) {
          w = cw; h = ch; d = dp; cell = Math.round(48 * dp);
          grid = document.createElement("canvas");
          grid.width = w; grid.height = h;
          var g = grid.getContext("2d");
          g.strokeStyle = A.rgba(I.hexes[2], 0.09);
          g.lineWidth = 1;
          g.beginPath();
          for (var gx = cell; gx < w; gx += cell) { g.moveTo(gx + 0.5, 0); g.lineTo(gx + 0.5, h); }
          for (var gy = cell; gy < h; gy += cell) { g.moveTo(0, gy + 0.5); g.lineTo(w, gy + 0.5); }
          g.stroke();
          g.globalCompositeOperation = "destination-in";
          var m = g.createRadialGradient(w * 0.5, h * 0.35, 0, w * 0.5, h * 0.35, Math.max(w, h) * 0.75);
          m.addColorStop(0, "rgba(0,0,0,1)");
          m.addColorStop(1, "rgba(0,0,0,0)");
          g.fillStyle = m;
          g.fillRect(0, 0, w, h);
          var n = Math.max(6, Math.min(12, Math.round((w / dp) * (h / dp) / 40000)));
          rnd = A.rand(77);
          B = [];
          for (var i = 0; i < n; i++) B.push(spawn({}, true));
        },
        draw: function (t, dt) {
          x.clearRect(0, 0, w, h);
          if (grid) x.drawImage(grid, 0, 0);
          x.globalCompositeOperation = "lighter";
          x.lineWidth = 1.5 * d;
          x.lineCap = "round";
          for (var i = 0; i < B.length; i++) {
            var b = B[i];
            b.p += b.v * b.dir * dt;
            var span = b.hz ? w : h;
            if ((b.dir > 0 && b.p - b.len > span) || (b.dir < 0 && b.p + b.len < 0)) spawn(b);
            var head = b.p, tail = b.p - b.len * b.dir;
            var x0 = b.hz ? tail : b.k, y0 = b.hz ? b.k : tail, x1 = b.hz ? head : b.k, y1 = b.hz ? b.k : head;
            var gr = x.createLinearGradient(x0, y0, x1, y1);
            gr.addColorStop(0, A.rgba(b.c, 0));
            gr.addColorStop(1, A.rgba(b.c, 0.95));
            x.strokeStyle = gr;
            x.beginPath(); x.moveTo(x0, y0); x.lineTo(x1, y1); x.stroke();
            x.fillStyle = A.rgba(b.c, 0.35);
            x.beginPath(); x.arc(x1, y1, 3 * d, 0, 6.2832); x.fill();
          }
          x.globalCompositeOperation = "source-over";
        }
      };
    }
  };
  var A=W.AKBG=W.AKBG||{q:[]};if(A.register)A.register(T);else{A.q.push(T);if(!A.boot){A.boot=1;var s=document.createElement("script"),c=document.currentScript;s.src=(c&&c.src?c.src.replace(/[^\/?#]*([?#].*)?$/,""):"/assets/bg/")+"bg.js";document.head.appendChild(s);}}
})(window);
