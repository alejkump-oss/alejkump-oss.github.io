/* Gostilnica in picerija Briski -- shared behaviour. Predogled, AK agencija. */
(function(){
  document.documentElement.classList.remove('no-js');
  document.body.classList.remove('no-js');

  /* nav solid on scroll */
  var nav=document.getElementById('nav');
  if(nav){
    function onScroll(){nav.classList.toggle('solid',window.scrollY>30);}
    window.addEventListener('scroll',onScroll,{passive:true});onScroll();
  }

  /* mobile menu */
  var menuBtn=document.getElementById('menuBtn');
  var mobileNav=document.getElementById('mobileNav');
  if(menuBtn&&mobileNav){
    var closeBtn=mobileNav.querySelector('.close');
    function openMenu(){mobileNav.classList.add('open');menuBtn.setAttribute('aria-expanded','true');document.body.style.overflow='hidden';}
    function closeMenu(){mobileNav.classList.remove('open');menuBtn.setAttribute('aria-expanded','false');document.body.style.overflow='';}
    menuBtn.addEventListener('click',openMenu);
    if(closeBtn)closeBtn.addEventListener('click',closeMenu);
    mobileNav.querySelectorAll('a').forEach(function(a){a.addEventListener('click',closeMenu);});
  }

  /* reveal on scroll, with touch-safe fallback (IntersectionObserver + scroll check) */
  var els=document.querySelectorAll('.rv');
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(els.length){
    if(reduce||!('IntersectionObserver' in window)){
      els.forEach(function(el){el.classList.add('in');});
    }else{
      var io=new IntersectionObserver(function(entries){
        entries.forEach(function(en){if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target);}});
      },{threshold:.12,rootMargin:'0px 0px -6% 0px'});
      els.forEach(function(el){io.observe(el);});
      var check=function(){
        var h=window.innerHeight;
        els.forEach(function(el){
          if(!el.classList.contains('in')){
            var r=el.getBoundingClientRect();
            if(r.top<h*0.96&&r.bottom>0)el.classList.add('in');
          }
        });
      };
      window.addEventListener('scroll',check,{passive:true});
      window.addEventListener('touchmove',check,{passive:true});
      window.addEventListener('load',check);
      setTimeout(check,350);
      setTimeout(check,1200);
    }
  }

  /* open/closed status, computed in Europe/Ljubljana time.
     Hours (kocevje.com, 5. 11. 2026): Mon-Fri 9:30-21:00, weekends 11:00-21:00 (owner via Alej, 12. 11. 2026) (pizza; kitchen until 20:30). Holidays are not modelled. */
  var OPEN={0:660,1:570,2:570,3:570,4:570,5:570,6:660}, CLOSE=21;
  function hm(m){return Math.floor(m/60)+'.'+('0'+(m%60)).slice(-2);}
  var WD={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6};
  function nowParts(){
    try{
      var parts=new Intl.DateTimeFormat('en-US',{timeZone:'Europe/Ljubljana',weekday:'short',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).formatToParts(new Date());
      var o={};parts.forEach(function(p){o[p.type]=p.value;});
      return {d:WD[o.weekday],m:parseInt(o.hour,10)*60+parseInt(o.minute,10)};
    }catch(e){return null;}
  }
  function renderStatus(){
    var statusEls=document.querySelectorAll('[data-status]');
    var weekEls=document.querySelectorAll('[data-week] li');
    if(!statusEls.length&&!weekEls.length)return;
    var t=nowParts();
    if(!t||t.d===undefined)return;
    var open=OPEN[t.d], close=CLOSE*60, text, cls;
    if(t.m>=open&&t.m<close){
      var left=close-t.m;
      cls='open';
      text=left<=60?('Odprto zdaj · zapremo čez '+left+' min'):'Odprto zdaj · do 21.00';
    }else if(t.m<open){
      cls='closed';text='Zaprto · odpremo danes ob '+hm(OPEN[t.d]);
    }else{
      var n=(t.d+1)%7;cls='closed';text='Zaprto · odpremo jutri ob '+hm(OPEN[n]);
    }
    statusEls.forEach(function(el){
      el.classList.remove('open','closed');el.classList.add(cls);
      var span=el.querySelector('span');
      if(span)span.textContent=text;
    });
    weekEls.forEach(function(li){
      li.classList.toggle('today',parseInt(li.getAttribute('data-d'),10)===t.d);
    });
  }
  renderStatus();setInterval(renderStatus,30000);

  /* jedilnik: sticky tab bar active state via scroll spy */
  var tabbar=document.querySelector('.tabbar');
  if(tabbar){
    var tabs=Array.prototype.slice.call(tabbar.querySelectorAll('a'));
    var targets=tabs.map(function(a){return document.querySelector(a.getAttribute('href'));}).filter(Boolean);
    function spy(){
      var y=window.scrollY+120;
      var current=targets[0];
      targets.forEach(function(t){if(t.offsetTop<=y)current=t;});
      tabs.forEach(function(a){a.classList.toggle('active',a.getAttribute('href')==='#'+current.id);});
    }
    window.addEventListener('scroll',spy,{passive:true});
    window.addEventListener('load',spy);
    spy();
  }

  /* galerija lightbox */
  var galGrid=document.querySelector('.gal-grid');
  var lightbox=document.getElementById('lightbox');
  if(galGrid&&lightbox){
    var items=Array.prototype.slice.call(galGrid.querySelectorAll('.gal-item'));
    var lbImg=lightbox.querySelector('img');
    var lbCap=lightbox.querySelector('.lb-cap');
    var idx=0;
    function show(i){
      idx=(i+items.length)%items.length;
      var img=items[idx].querySelector('img');
      lbImg.src=img.getAttribute('src');
      lbImg.alt=img.getAttribute('alt')||'';
      lbCap.textContent=img.getAttribute('alt')||'';
      lightbox.classList.add('open');
      document.body.style.overflow='hidden';
    }
    function hide(){
      lightbox.classList.remove('open');
      document.body.style.overflow='';
    }
    items.forEach(function(el,i){
      var btn=el.querySelector('button');
      if(btn)btn.addEventListener('click',function(){show(i);});
    });
    var closeBtn=lightbox.querySelector('.lb-close');
    var prevBtn=lightbox.querySelector('.lb-prev');
    var nextBtn=lightbox.querySelector('.lb-next');
    if(closeBtn)closeBtn.addEventListener('click',hide);
    if(prevBtn)prevBtn.addEventListener('click',function(){show(idx-1);});
    if(nextBtn)nextBtn.addEventListener('click',function(){show(idx+1);});
    lightbox.addEventListener('click',function(e){if(e.target===lightbox)hide();});
    document.addEventListener('keydown',function(e){
      if(!lightbox.classList.contains('open'))return;
      if(e.key==='Escape')hide();
      if(e.key==='ArrowLeft')show(idx-1);
      if(e.key==='ArrowRight')show(idx+1);
    });
  }
})();
