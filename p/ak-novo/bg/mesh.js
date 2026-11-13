/*! AK bg "mesh" - drifting gradient mesh with film grain. Own implementation (WebGL), see LICENSES.md. */
(function (W) {
  "use strict";
  var F = [
    "float wt(vec2 p,vec2 q){vec2 d=p-q;return 1./(.015+dot(d,d)*dot(d,d)*6.+dot(d,d));}",
    "void main(){float a=u_r.x/u_r.y;vec2 p=vec2(v.x*a,v.y);float t=u_t*.16;",
    "p+=.32*vec2(fbm(p*1.2+vec2(t,0.))-.5,fbm(p*1.2+vec2(4.,-t))-.5);",
    "vec2 q0=vec2(a*(.22+.18*sin(t*1.1)),.78+.14*cos(t*.9));",
    "vec2 q1=vec2(a*(.82+.14*cos(t*.8+1.)),.66+.2*sin(t*1.2+2.));",
    "vec2 q2=vec2(a*(.5+.3*sin(t*.7+4.)),.22+.14*cos(t*1.3));",
    "vec2 q3=vec2(a*(.08+.12*cos(t*.6+3.)),.12+.1*sin(t));",
    "float w0=wt(p,q0),w1=wt(p,q1),w2=wt(p,q2),w3=wt(p,q3)*1.3;",
    "vec3 col=(u_c0*w0+u_c1*w1+u_c2*w2+u_b*w3)/(w0+w1+w2+w3);",
    "gl_FragColor=vec4(col,1.);}"
  ].join("\n");
  var T = {
    name: "mesh",
    scale: 0.4,
    defaults: { colors: ["#ff9a76", "#ffd36e", "#8ec5ff"], base: "#2b2d6e", grain: true },
    create: function (I, A) { return A.gl(I, F); }
  };
  var A=W.AKBG=W.AKBG||{q:[]};if(A.register)A.register(T);else{A.q.push(T);if(!A.boot){A.boot=1;var s=document.createElement("script"),c=document.currentScript;s.src=(c&&c.src?c.src.replace(/[^\/?#]*([?#].*)?$/,""):"/assets/bg/")+"bg.js";document.head.appendChild(s);}}
})(window);
