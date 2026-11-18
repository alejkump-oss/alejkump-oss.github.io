/* Pohištvo Jereb: mobile menu + gallery lightbox. No dependencies. */
(function(){
  var doc=document.documentElement;

  /* ---- mobile menu ---- */
  var mb=document.querySelector('.menu-btn'), nav=document.getElementById('nav');
  function setMenu(open){
    if(!mb||!nav) return;
    nav.classList.toggle('open',open);
    mb.setAttribute('aria-expanded',open?'true':'false');
    mb.querySelector('.ml').textContent=open?'Zapri':'Meni';
    doc.style.overflow=open?'hidden':'';
  }
  if(mb&&nav){
    mb.addEventListener('click',function(){ setMenu(!nav.classList.contains('open')); });
    nav.addEventListener('click',function(e){ if(e.target.closest&&e.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown',function(e){ if(e.key==='Escape'&&nav.classList.contains('open')){ setMenu(false); mb.focus(); } });
    window.addEventListener('resize',function(){ if(window.innerWidth>=1100&&nav.classList.contains('open')) setMenu(false); });
  }

  /* ---- long galleries: show the first photos, the rest on request (all stay in the lightbox) ---- */
  [].forEach.call(document.querySelectorAll('ul.grid[data-more]'),function(ul){
    var keep=+ul.getAttribute('data-more'), li=ul.children;
    if(li.length<=keep+4) return;
    for(var i=keep;i<li.length;i++) li[i].hidden=true;
    var b=document.createElement('button');
    b.type='button'; b.className='btn showall';
    b.textContent=ul.getAttribute('data-more-label')||'Pokaži vse';
    b.addEventListener('click',function(){
      for(var i=keep;i<li.length;i++) li[i].hidden=false;
      b.remove();
      var n=li[keep]&&li[keep].querySelector('a'); if(n) n.focus({preventScroll:true});
    });
    ul.parentNode.insertBefore(b,ul.nextSibling);
  });

  /* ---- lightbox ---- */
  var ico={x:'<path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M6 6l12 12M18 6 6 18"/>',
    l:'<path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M19 12H5M11 6l-6 6 6 6"/>',
    r:'<path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M13 6l6 6-6 6"/>'};
  function svg(p){ return '<svg viewBox="0 0 24 24" aria-hidden="true">'+p+'</svg>'; }
  var lb=null, img, cap, title, count, items=[], idx=0, last=null;

  function build(){
    lb=document.createElement('div');
    lb.className='lb'; lb.id='lb'; lb.setAttribute('role','dialog'); lb.setAttribute('aria-modal','true');
    lb.setAttribute('aria-labelledby','lbTitle'); lb.setAttribute('aria-hidden','true');
    lb.innerHTML='<div class="lb-top"><div class="lb-title"><span id="lbTitle">Galerija</span><span class="lb-count" id="lbCount"></span></div>'+
      '<button class="lb-x" type="button" aria-label="Zapri galerijo">'+svg(ico.x)+'</button></div>'+
      '<div class="lb-stage"><img alt="">'+
      '<button class="lb-nav lb-prev" type="button" aria-label="Prejšnja fotografija">'+svg(ico.l)+'</button>'+
      '<button class="lb-nav lb-next" type="button" aria-label="Naslednja fotografija">'+svg(ico.r)+'</button></div>'+
      '<div class="lb-cap" aria-live="polite"></div>';
    document.body.appendChild(lb);
    img=lb.querySelector('.lb-stage img'); cap=lb.querySelector('.lb-cap');
    title=lb.querySelector('#lbTitle'); count=lb.querySelector('#lbCount');
    lb.querySelector('.lb-x').addEventListener('click',close);
    lb.querySelector('.lb-prev').addEventListener('click',function(){ show(idx-1); });
    lb.querySelector('.lb-next').addEventListener('click',function(){ show(idx+1); });
    var stage=lb.querySelector('.lb-stage');
    stage.addEventListener('click',function(e){ if(e.target===stage) close(); });
    lb.addEventListener('click',function(e){ if(e.target===lb||e.target.classList.contains('lb-cap')||e.target.classList.contains('lb-top')) close(); });
    var sx=0, sy=0, st=0;
    lb.addEventListener('touchstart',function(e){ sx=e.touches[0].clientX; sy=e.touches[0].clientY; st=Date.now(); },{passive:true});
    lb.addEventListener('touchend',function(e){
      var dx=e.changedTouches[0].clientX-sx, dy=e.changedTouches[0].clientY-sy;
      if(Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy)) show(idx+(dx<0?1:-1));
      else if(dy>90&&Math.abs(dy)>Math.abs(dx)*1.5) close();
    },{passive:true});
  }
  function preload(n){ if(items.length<2) return; var it=items[(n+items.length)%items.length]; var p=new Image(); p.src=it.href; }
  function show(n){
    var L=items.length; if(!L) return;
    idx=(n+L)%L; var it=items[idx];
    img.removeAttribute('src');
    if(it.w&&it.h){ img.width=it.w; img.height=it.h; }
    img.src=it.href; img.alt=it.alt; cap.textContent=it.alt;
    count.textContent=(idx+1)+' / '+L;
    preload(idx+1); preload(idx-1);
  }
  function open(group,start){
    if(!lb) build();
    items=[].map.call(group.querySelectorAll('a.gi'),function(a){
      var im=a.querySelector('img');
      return {href:a.getAttribute('href'),alt:im?im.getAttribute('alt'):'',w:+a.getAttribute('data-w')||0,h:+a.getAttribute('data-h')||0};
    });
    last=document.activeElement;
    title.textContent=group.getAttribute('data-title')||'Galerija';
    lb.classList.add('open'); lb.setAttribute('aria-hidden','false'); doc.style.overflow='hidden';
    show(start||0);
    lb.querySelector('.lb-x').focus();
  }
  function close(){
    if(!lb) return;
    lb.classList.remove('open'); lb.setAttribute('aria-hidden','true'); doc.style.overflow='';
    img.removeAttribute('src');
    if(last&&last.focus) last.focus();
  }
  document.addEventListener('click',function(e){
    if(e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey) return;
    var a=e.target.closest?e.target.closest('a.gi'):null; if(!a) return;
    var g=a.closest('[data-lb]'); if(!g) return;
    e.preventDefault();
    var all=g.querySelectorAll('a.gi'); open(g,[].indexOf.call(all,a));
  });
  document.addEventListener('keydown',function(e){
    if(!lb||!lb.classList.contains('open')) return;
    if(e.key==='Escape') close();
    else if(e.key==='ArrowRight') show(idx+1);
    else if(e.key==='ArrowLeft') show(idx-1);
    else if(e.key==='Tab'){
      var f=lb.querySelectorAll('button'), a=f[0], z=f[f.length-1];
      if(e.shiftKey&&document.activeElement===a){ e.preventDefault(); z.focus(); }
      else if(!e.shiftKey&&document.activeElement===z){ e.preventDefault(); a.focus(); }
    }
  });
})();
