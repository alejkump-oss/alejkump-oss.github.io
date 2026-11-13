/*! AK bg "aurora" - northern-lights curtain with soft rays. Own implementation (WebGL), see LICENSES.md. */
(function (W) {
  "use strict";
  var F = [
    "void main(){float a=u_r.x/u_r.y;vec2 p=vec2(v.x*a,v.y);float t=u_t*.22;",
    "float n=fbm(vec2(p.x*.9-t*.35,t*.25));",
    "float y0=.56+.09*sin(p.x*1.3+t)+.05*sin(p.x*3.2-t*1.4)+.2*(n-.5);",
    "float d=v.y-y0;",
    "float r=.45+.55*fbm(vec2(p.x*5.5+n*2.5,v.y*.7-t*.5));",
    "float up=smoothstep(-.025,.03,d)*exp(-max(d,0.)*3.)*r;",
    "float y1=.78+.06*sin(p.x*2.1-t*.8)+.12*(n-.5);float d1=v.y-y1;",
    "float up1=smoothstep(-.02,.03,d1)*exp(-max(d1,0.)*4.5)*(.4+.6*fbm(vec2(p.x*4.+7.,v.y-t*.4)))*.55;",
    "float e=exp(-abs(d)*26.)*.55+exp(-abs(d)*4.)*.16;",
    "vec3 c=pal(v.x*.75+.18*sin(t*.6+p.x*1.2)+.25*(n-.5));",
    "vec3 c1=pal(1.-v.x*.6+.15*sin(t*.5));",
    "vec3 col=u_b+c*(up*.85+e)+c1*up1;",
    "col=mix(col,u_b,smoothstep(.3,-.1,v.y)*.6);",
    "gl_FragColor=vec4(col,1.);}"
  ].join("\n");
  var T = {
    name: "aurora",
    scale: 0.5,
    defaults: { colors: ["#3fd1a6", "#4f7cff", "#b46cff"], base: "#070b14" },
    create: function (I, A) { return A.gl(I, F); }
  };
  var A=W.AKBG=W.AKBG||{q:[]};if(A.register)A.register(T);else{A.q.push(T);if(!A.boot){A.boot=1;var s=document.createElement("script"),c=document.currentScript;s.src=(c&&c.src?c.src.replace(/[^\/?#]*([?#].*)?$/,""):"/assets/bg/")+"bg.js";document.head.appendChild(s);}}
})(window);
