// Razgled preview: mobile menu + sticky CTA bar. No storage, no cookies.
(function () {
  var btn = document.querySelector('.burger');
  var menu = document.getElementById('meni');
  if (btn && menu) {
    var close = menu.querySelector('.menu-close');
    var open = function () {
      menu.hidden = false; btn.setAttribute('aria-expanded', 'true');
      document.body.classList.add('menu-open'); close.focus();
    };
    var shut = function () {
      menu.hidden = true; btn.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open'); btn.focus();
    };
    btn.addEventListener('click', open);
    close.addEventListener('click', shut);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !menu.hidden) shut(); });
  }
  var bar = document.querySelector('.bar');
  var hero = document.querySelector('.hero');
  if (bar && hero) {
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (en) { bar.classList.toggle('on', !en[0].isIntersecting); }).observe(hero);
    } else { bar.classList.add('on'); }
  }
})();
