/*! AK bg "silk" - slow satin folds with a soft sheen. Own implementation (WebGL), see LICENSES.md. */
(function (W) {
  "use strict";
  var F = [
    "void main(){float a=u_r.x/u_r.y;vec2 p=vec2(v.x*a,v.y)*1.5;float t=u_t*.3;",
    "p=mat2(.82,-.57,.57,.82)*p;",
    "float w=p.x*2.1+1.3*sin(p.y*1.6+t*.8)+.55*sin(p.y*3.9-p.x*1.1+t*1.15)+.7*fbm(p*1.4+t*.15);",
    "float f=.5+.5*sin(w*2.2+t);",
    "float s=f*f*f*.8+pow(f,16.)*.5;",
    "vec3 c=mix(u_c0,u_c1,.5+.5*sin(p.y*.9-t*.35));",
    "vec3 col=mix(u_b,c,.18+.62*s)+u_c2*pow(f,28.)*.4;",
    "float g=smoothstep(1.15,.15,length((v-.5)*vec2(1.,1.2))*1.3);",
    "gl_FragColor=vec4(mix(u_b,col,.35+.65*g),1.);}"
  ].join("\n");
  var T = {
    name: "silk",
    scale: 0.5,
    defaults: { colors: ["#7a5cff", "#c7b8ff", "#ffffff"], base: "#120d24" },
    create: function (I, A) { return A.gl(I, F); }
  };
  var A=W.AKBG=W.AKBG||{q:[]};if(A.register)A.register(T);else{A.q.push(T);if(!A.boot){A.boot=1;var s=document.createElement("script"),c=document.currentScript;s.src=(c&&c.src?c.src.replace(/[^\/?#]*([?#].*)?$/,""):"/assets/bg/")+"bg.js";document.head.appendChild(s);}}
})(window);
