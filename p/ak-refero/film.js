/* Opening film: a fir forest in moving fog, drawn live in WebGL.
   Scroll progress (window.__filmP, set by page.js) dollies the camera into the trees and
   fades the scene to the page canvas. Reduced motion renders one still frame.
   No WebGL: the stage keeps its CSS gradient and nothing else changes. */
(function () {
  "use strict";
  var canvas = document.getElementById("gl");
  if (!canvas) return;
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var gl;
  try {
    gl = canvas.getContext("webgl", { antialias: false, alpha: false, depth: false, stencil: false, powerPreference: "low-power", preserveDrawingBuffer: false });
  } catch (e) { gl = null; }
  if (!gl) return;

  var VS = "attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}";
  var FS = [
    "#ifdef GL_FRAGMENT_PRECISION_HIGH",
    "precision highp float;",
    "#else",
    "precision mediump float;",
    "#endif",
    "uniform vec2 R;uniform float T;uniform float P;",
    "float h1(float n){return fract(sin(n*127.1)*43758.5453);}",
    "float h2(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}",
    "float nz(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);",
    " return mix(mix(h2(i),h2(i+vec2(1.,0.)),f.x),mix(h2(i+vec2(0.,1.)),h2(i+vec2(1.,1.)),f.x),f.y);}",
    "float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<3;i++){v+=a*nz(p);p=p*2.03+vec2(1.7,9.2);a*=.5;}return v;}",
    /* one row of firs: p.x world, p.y height above the ridge; returns coverage */
    "float firs(vec2 p,float seed,float dens,float aa){",
    " float x=p.x*dens;float y=p.y*dens;float c=floor(x);float m=step(y,0.);",
    " for(int k=-1;k<=1;k++){",
    "  float id=c+float(k);float r=h1(id+seed*17.31);float r2=h1(id*1.37+seed*3.11);",
    "  float cx=id+.15+.7*r;float ht=.55+.95*r2;",
    "  float t=clamp(y/ht,0.,1.);",
    "  float w=(1.-pow(t,.9))*ht*.17;",
    /* branch whorls: a soft droop, not stair steps; then needle raggedness on the edge */
    "  float tier=fract(y*11./ht+r*3.);",
    "  w*=.84+.16*smoothstep(0.,1.,tier);",
    "  w*=.88+.24*nz(vec2(y*38.,id*7.3));",
    "  w+=.008;",
    "  float inside=step(-.5,y)*step(y,ht);",
    "  m=max(m,inside*(1.-smoothstep(-aa,aa,abs(x-cx)-w)));",
    " }",
    " return m;}",
    "void main(){",
    " vec2 uv=gl_FragCoord.xy/R;float asp=R.x/R.y;",
    " vec2 q=vec2((uv.x-.5)*asp,uv.y);",
    " float p=P;",
    " vec3 top=vec3(.035,.045,.052),hor=vec3(.47,.53,.565);",
    " vec3 col=mix(hor,top,smoothstep(.34,1.05,uv.y+p*.12));",
    " vec2 g=q-vec2(-.18*asp,.56);",
    " col+=vec3(.62,.66,.68)*.30*exp(-dot(g,g)*5.);",
    " vec3 fogc=vec3(.44,.50,.535);",
    " for(int i=0;i<6;i++){",
    "  float fi=float(i);float near=fi/5.;",
    "  float zoom=1.+p*(.06+near*near*1.3);",
    "  vec2 s=vec2(q.x/zoom,(q.y-.18)/zoom+.18);",
    "  float drift=T*.010*(1.+near*4.);",
    "  float dens=mix(11.,1.25,pow(near,.8));",
    "  float base=mix(.43,.0,pow(near,.9))+(fbm(vec2(s.x*1.6+fi*3.1,fi))-.45)*mix(.07,.16,near);",
    "  float fogA=(.18+.30*fbm(vec2(q.x*1.3+T*.022*(1.+fi*.35)+fi*5.,q.y*2.6-T*.008)))*smoothstep(.85,.1,uv.y)*(1.-near*.35);",
    "  col=mix(col,fogc,fogA*.55);",
    "  float aa=1.4*dens/(R.y*zoom)+near*near*near*.025;",
    "  float m=firs(vec2(s.x+drift+fi*11.3,s.y-base),fi+1.,dens,aa);",
    "  vec3 lc=mix(fogc*.92,vec3(.012,.017,.018),pow(near,.55));",
    "  lc=mix(lc,lc*vec3(.82,1.02,.96),near*(1.-near)*2.);",
    "  col=mix(col,lc,m);",
    " }",
    " float mist=fbm(vec2(q.x*2.2+T*.045,q.y*5.5-T*.01))*smoothstep(.42,0.,uv.y)*.38*(1.-p*.6);",
    " col=mix(col,fogc*.62,mist);",
    " col*=.55+.45*pow(16.*uv.x*uv.y*(1.-uv.x)*(1.-uv.y),.22);",
    " col=mix(col,vec3(.0235),smoothstep(.66,.99,p));",
    " col+=(h2(gl_FragCoord.xy+fract(T*7.)*91.)-.5)*.04;",
    " gl_FragColor=vec4(col,1.);",
    "}"
  ].join("\n");

  function sh(type, src) {
    var s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) { throw new Error(gl.getShaderInfoLog(s)); }
    return s;
  }
  var prog;
  try {
    prog = gl.createProgram();
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, VS));
    gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FS));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(prog));
  } catch (e) { canvas.style.display = "none"; return; }
  gl.useProgram(prog);
  var buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  var loc = gl.getAttribLocation(prog, "a");
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  var uR = gl.getUniformLocation(prog, "R"), uT = gl.getUniformLocation(prog, "T"), uP = gl.getUniformLocation(prog, "P");

  /* Render below CSS resolution: fog and grain do not need sharp pixels, phones need the headroom. */
  var small = Math.min(window.innerWidth, window.innerHeight) < 700;
  var scale = small ? 0.55 : 0.7;
  var w = 0, h = 0;
  function size() {
    var cw = canvas.clientWidth || window.innerWidth, ch = canvas.clientHeight || window.innerHeight;
    var nw = Math.max(1, Math.round(Math.min(cw * scale, 1400))), nh = Math.max(1, Math.round(ch * nw / cw));
    if (nw !== w || nh !== h) { w = canvas.width = nw; h = canvas.height = nh; gl.viewport(0, 0, w, h); }
  }

  var t0 = performance.now(), visible = true, raf = 0, slow = 0, last = 0;
  function draw(now) {
    size();
    var p = Math.min(1, Math.max(0, window.__filmP || 0));
    gl.uniform2f(uR, w, h);
    gl.uniform1f(uT, reduce ? 24.0 : 18.0 + (now - t0) / 1000);
    gl.uniform1f(uP, p);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }
  function loop(now) {
    raf = 0;
    if (last) {
      var dt = now - last;
      /* adaptive quality: sustained slow frames lower the render scale once or twice */
      if (dt > 34) { slow++; if (slow > 40 && scale > 0.35) { scale -= 0.12; slow = 0; } } else if (slow > 0) slow--;
    }
    last = now;
    draw(now);
    if (visible && (window.__filmP || 0) < 1) raf = requestAnimationFrame(loop);
  }
  function start() { if (!raf && !reduce) { last = 0; raf = requestAnimationFrame(loop); } }
  window.__filmKick = function () { if (reduce) draw(performance.now()); else start(); };

  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (es) {
      visible = es[0].isIntersecting;
      if (visible) start();
    }).observe(canvas);
  }
  document.addEventListener("visibilitychange", function () { visible = !document.hidden; if (visible) start(); });
  window.addEventListener("resize", function () { if (reduce) draw(performance.now()); });
  canvas.addEventListener("webglcontextlost", function (e) { e.preventDefault(); visible = false; canvas.style.display = "none"; });

  if (reduce) draw(performance.now()); else start();
})();
