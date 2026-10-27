/* Intro film: plays once, full screen, when the homepage opens; then fades
   into the page. No button: it goes to the page by itself; never blocks the page if the video can't play
   (autoplay refused, slow network, reduced motion, Save-Data). */
(function () {
  var box = document.getElementById('intro');
  if (!box) return;
  var d = document.documentElement;
  var v = box.querySelector('video');
  var done = false;

  function finish() {
    if (done) return;
    done = true;
    d.classList.remove('intro-on');
    box.classList.add('intro-out');
    try { v.pause(); } catch (e) {}
    setTimeout(function () { if (box.parentNode) box.parentNode.removeChild(box); }, 700);
  }

  var mm = window.matchMedia;
  var reduce = mm && mm('(prefers-reduced-motion: reduce)').matches;
  var c = navigator.connection || {};
  var save = c.saveData === true || /(^|-)2g$/.test(c.effectiveType || '');
  if (reduce || save || !v) { finish(); return; }

  var mobile = mm && mm('(max-width: 760px)').matches;
  // Phones: an animated image, because phones often refuse to autoplay video
  // (low-power mode, data saver). It always plays; hide it after its 3 s.
  if (mobile) {
    var img = box.querySelector('.intro-img');
    if (!img) { finish(); return; }
    if (v) v.parentNode.removeChild(v);
    img.onload = function () { setTimeout(finish, 3000); };
    img.onerror = finish;
    img.src = img.getAttribute('data-src');
    setTimeout(function () { if (!img.complete) finish(); }, 2500);
    setTimeout(finish, 6000);
    return;
  }
  var im2 = box.querySelector('.intro-img'); if (im2) im2.parentNode.removeChild(im2);
  v.src = mobile ? v.getAttribute('data-mobile') : v.getAttribute('data-desktop');
  v.poster = mobile ? v.getAttribute('data-mobile-poster') : v.getAttribute('data-desktop-poster');
  v.muted = true;
  v.playbackRate = 1;

  v.addEventListener('ended', finish);
  v.addEventListener('error', finish);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') finish(); });

  var started = false;
  v.addEventListener('playing', function () { started = true; });
  var p = v.play();
  if (p && p.catch) p.catch(finish);
  // Never hold the page: if nothing is playing after 3 s, go straight in;
  // and never longer than 16 s in total.
  setTimeout(function () { if (!started) finish(); }, 1500);
  setTimeout(finish, 4000);
})();
