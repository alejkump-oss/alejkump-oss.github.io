/*! AK bg "flame" - warm glow rising from the bottom, like an open oven. Own implementation (WebGL), see LICENSES.md. */
(function (W) {
  "use strict";
  var F = [
    "void main(){float a=u_r.x/u_r.y;vec2 p=vec2(v.x*a,v.y);float t=u_t*.45;",
    "vec2 q=vec2(p.x*2.2,p.y*1.5-t);",
    "float n=fbm(q+.9*fbm(q*1.4+vec2(1.7,-t*.6)));",
    "float h=1.-v.y;",
    "float m=clamp(h*1.25-.62+n*.6,0.,1.);m=m*m*(3.-2.*m);",
    "vec3 c=mix(u_c0,u_c1,smoothstep(.25,.75,m));c=mix(c,u_c2,smoothstep(.78,1.,m)*.85);",
    "vec3 col=mix(u_b,c,m*.92);",
    "col+=u_c1*.07*n*smoothstep(.4,1.,h);",
    "gl_FragColor=vec4(col,1.);}"
  ].join("\n");
  var T = {
    name: "flame",
    scale: 0.4,
    defaults: { colors: ["#7a1d10", "#e8572a", "#ffc46b"], base: "#140b08" },
    create: function (I, A) { return A.gl(I, F); }
  };
  var A=W.AKBG=W.AKBG||{q:[]};if(A.register)A.register(T);else{A.q.push(T);if(!A.boot){A.boot=1;var s=document.createElement("script"),c=document.currentScript;s.src=(c&&c.src?c.src.replace(/[^\/?#]*([?#].*)?$/,""):"/assets/bg/")+"bg.js";document.head.appendChild(s);}}
})(window);
