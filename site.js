// Menu overlay + sticky contact bar. No dependencies.
(function () {
  var menu = document.getElementById('menu');
  var openBtn = document.getElementById('menu-open');
  var closeBtn = document.getElementById('menu-close');
  function setOpen(open) {
    if (!menu) return;
    menu.classList.toggle('open', open);
    menu.setAttribute('aria-hidden', open ? 'false' : 'true');
    if (openBtn) openBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.body.classList.toggle('menu-open', open);
    if (open && closeBtn) closeBtn.focus();
    if (!open && openBtn) openBtn.focus();
  }
  if (openBtn) openBtn.addEventListener('click', function () { setOpen(true); });
  if (closeBtn) closeBtn.addEventListener('click', function () { setOpen(false); });
  if (menu) menu.addEventListener('click', function (e) { if (e.target.closest('nav a')) setOpen(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && menu && menu.classList.contains('open')) setOpen(false); });

  var bar = document.querySelector('.bar');
  var hero = document.getElementById('hero');
  if (bar && hero && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (en) { bar.classList.toggle('show', !en[0].isIntersecting); }, { threshold: 0 }).observe(hero);
  }
})();
