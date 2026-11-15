/* ŽlicaVilca — motion. No cookies, no storage, no network. */
(function () {
  document.documentElement.classList.remove('no-js');

  var mast = document.querySelector('.mast');
  var spoon = document.querySelector('.hero .spoon');
  var fork = document.querySelector('.hero .fork');
  var plate = document.querySelector('.hero .plate');
  var ticking = false;

  function frame() {
    ticking = false;
    var y = window.scrollY || 0;
    if (mast) mast.classList.toggle('scrolled', y > 8);
    if (spoon) spoon.style.transform = 'translate3d(0,' + (y * 0.18) + 'px,0) rotate(' + (-14 + y * 0.01) + 'deg)';
    if (fork) fork.style.transform = 'translate3d(0,' + (y * 0.10) + 'px,0) rotate(' + (12 - y * 0.008) + 'deg)';
    if (plate) plate.style.transform = 'translate3d(0,' + (y * -0.06) + 'px,0) rotate(' + (y * 0.02) + 'deg)';
  }
  function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }
  window.addEventListener('scroll', onScroll, { passive: true });
  frame();

  var items = document.querySelectorAll('.rv, .rv-x, .rv-line');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    items.forEach(function (el) { io.observe(el); });
    // Safety net: whatever is already inside the viewport after load is shown even if the
    // observer is slow (e.g. a browser that batches callbacks during a smooth scroll).
    setTimeout(function () {
      items.forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) el.classList.add('in');
      });
    }, 1200);
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  // Hero entrance: utensils glide in on load (phones included).
  var hero = document.querySelector('.hero');
  if (hero) requestAnimationFrame(function () { hero.classList.add('ready'); });
})();
