/*! AK bg - shared WebGL renderer. Runs as a Worker (OffscreenCanvas, keeps the main thread free)
 * or as a normal script where worker WebGL is unavailable. See LICENSES.md. */
(function (G) {
  "use strict";
  // h21() is "Hash without Sine" (hash12), Copyright (c) 2014 David Hoskins, MIT License,
  // https://www.shadertoy.com/view/4djSRW - full licence text in LICENSES.md.
  var PRE = "#ifdef GL_FRAGMENT_PRECISION_HIGH\nprecision highp float;\n#else\nprecision mediump float;\n#endif\n" +
    "uniform float u_t;uniform vec2 u_r;uniform vec3 u_c0,u_c1,u_c2,u_b;varying vec2 v;\n" +
    "float h21(vec2 p){vec3 q=fract(vec3(p.xyx)*.1031);q+=dot(q,q.yzx+33.33);return fract((q.x+q.y)*q.z);}\n" +
    "float vn(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h21(i),h21(i+vec2(1.,0.)),f.x),mix(h21(i+vec2(0.,1.)),h21(i+1.),f.x),f.y);}\n" +
    "float fbm(vec2 p){float s=0.,a=.5;for(int i=0;i<4;i++){s+=a*vn(p);p=mat2(1.6,1.2,-1.2,1.6)*p+3.1;a*=.5;}return s;}\n" +
    "vec3 pal(float x){x=clamp(x,0.,1.);return x<.5?mix(u_c0,u_c1,x*2.):mix(u_c1,u_c2,x*2.-1.);}\n";

  // Returns {resize(w,h), draw(t)} or null when WebGL is unavailable; throws on a shader error.
  function make(cv, frag, cols, base) {
    var o = { alpha: false, antialias: false, depth: false, stencil: false, powerPreference: "low-power" };
    var c = cv.getContext("webgl", o) || cv.getContext("experimental-webgl", o);
    if (!c) return null;
    function sh(type, src) {
      var s = c.createShader(type);
      c.shaderSource(s, src); c.compileShader(s);
      if (!c.getShaderParameter(s, c.COMPILE_STATUS)) throw new Error(c.getShaderInfoLog(s) || "shader");
      return s;
    }
    var p = c.createProgram();
    c.attachShader(p, sh(c.VERTEX_SHADER, "attribute vec2 a;varying vec2 v;void main(){v=a*.5+.5;gl_Position=vec4(a,0.,1.);}"));
    c.attachShader(p, sh(c.FRAGMENT_SHADER, PRE + frag));
    c.linkProgram(p);
    if (!c.getProgramParameter(p, c.LINK_STATUS)) throw new Error("link");
    c.useProgram(p);
    c.bindBuffer(c.ARRAY_BUFFER, c.createBuffer());
    c.bufferData(c.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), c.STATIC_DRAW);
    var al = c.getAttribLocation(p, "a");
    c.enableVertexAttribArray(al);
    c.vertexAttribPointer(al, 2, c.FLOAT, false, 0, 0);
    function U(n) { return c.getUniformLocation(p, n); }
    var ut = U("u_t"), ur = U("u_r");
    for (var i = 0; i < 3; i++) c.uniform3f(U("u_c" + i), cols[i][0], cols[i][1], cols[i][2]);
    c.uniform3f(U("u_b"), base[0], base[1], base[2]);
    return {
      resize: function (w, h) { cv.width = w; cv.height = h; c.viewport(0, 0, w, h); c.uniform2f(ur, w, h); },
      draw: function (t) { c.uniform1f(ut, t % 3600); c.drawArrays(c.TRIANGLES, 0, 3); }
    };
  }

  if (typeof document === "undefined") {
    // Worker mode: messages i(nit) / s(ize) / d(raw); replies a(ck) / x (failed).
    var R = {};
    G.onmessage = function (e) {
      var m = e.data, r = R[m.id];
      try {
        if (m.k === "i") {
          r = make(m.cv, m.f, m.c, m.b);
          if (!r) { G.postMessage({ k: "x", id: m.id }); return; }
          R[m.id] = r;
          G.postMessage({ k: "a", id: m.id });
        } else if (r && m.k === "s") r.resize(m.w, m.h);
        else if (r && m.k === "d") { r.draw(m.t); G.postMessage({ k: "a", id: m.id }); }
      } catch (err) {
        delete R[m.id];
        G.postMessage({ k: "x", id: m.id, e: String(err && err.message || err) });
      }
    };
  } else {
    var A = G.AKBG = G.AKBG || { q: [] };
    A.glMake = make;
    if (A.glReady) A.glReady();
  }
})(self);
