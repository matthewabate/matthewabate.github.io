// ─────────────────────────────────────────────────────────────
//  site.js — shared scripts for all pages
//
//  Includes:
//    • Random bio portrait on bio page
//    • Mobile hamburger menu (nav__hamburger)
//
//  To add or remove a bio portrait:
//    1. Add/remove the file from the images/ folder
//    2. Add/remove the filename in the portraits array below
//       AND update images/portraits.json to match
// ─────────────────────────────────────────────────────────────
(function () {

  var portraits = [
    'ma-design.jpg',
    'ma-headphones.jpg',
    'ma-nyc.jpg',
    'ma-pink.jpg',
    'ma-synthesis-workshop.jpg',
    'ma-and-phoebe.jpg'
  ];

  function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  // Set random portrait on bio page (no-op on other pages)
  var photoEl = document.getElementById('bio-photo');
  if (photoEl) {
    photoEl.src = 'images/' + pick(portraits);
  }

}());

// ─────────────────────────────────────────────────────────────
//  Mobile hamburger menu — shared across all pages
// ─────────────────────────────────────────────────────────────
(function () {
  var btn  = document.querySelector('.nav__hamburger');
  var menu = document.getElementById('mobile-menu');
  if (!btn || !menu) return;

  // Move menu to <html> element so position:fixed is always relative to the true
  // viewport — body's overflow:clip on index.html can otherwise shift fixed children.
  document.documentElement.appendChild(menu);

  // Inject a close button positioned precisely over the hamburger
  var closeBtn = document.createElement('button');
  closeBtn.className = 'nav__mobile-close';
  closeBtn.setAttribute('aria-label', 'Close navigation');
  closeBtn.innerHTML =
    '<svg viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">' +
      '<line x1="2" y1="2" x2="20" y2="20" stroke="white" stroke-width="2.2" stroke-linecap="round"/>' +
      '<line x1="20" y1="2" x2="2" y2="20" stroke="white" stroke-width="2.2" stroke-linecap="round"/>' +
    '</svg>';
  document.documentElement.appendChild(closeBtn);

  function positionCloseBtn() {
    var r = btn.getBoundingClientRect();
    closeBtn.style.top    = r.top    + 'px';
    closeBtn.style.left   = r.left   + 'px';
    closeBtn.style.width  = r.width  + 'px';
    closeBtn.style.height = r.height + 'px';
  }

  function openMenu() {
    positionCloseBtn();
    closeBtn.style.display = 'flex';
    menu.classList.add('is-open');
    btn.setAttribute('aria-expanded', 'true');
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    closeBtn.style.display = 'none';
    menu.classList.remove('is-open');
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-label', 'Open navigation');
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
  }

  btn.addEventListener('click', function () {
    if (menu.classList.contains('is-open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  closeBtn.addEventListener('click', closeMenu);

  // Close when a menu link is clicked
  menu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  // Close on outside click
  document.addEventListener('click', function (e) {
    if (!btn.contains(e.target) && !menu.contains(e.target) && !closeBtn.contains(e.target)) {
      closeMenu();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

  // Reposition close button if viewport resizes while menu is open
  window.addEventListener('resize', function () {
    if (menu.classList.contains('is-open')) positionCloseBtn();
  });
}());
