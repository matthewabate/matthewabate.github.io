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
    'MA-Design.jpg',
    'MA-Headphones.jpg',
    'MA-NYC.jpg',
    'MA-Pink.jpg',
    'MA-Synthesis-Workshop.jpg',
    'MA-and-Phoebe.jpg'
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

  function openMenu() {
    btn.classList.add('is-open');
    menu.classList.add('is-open');
    btn.setAttribute('aria-expanded', 'true');
    btn.setAttribute('aria-label', 'Close navigation');
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    btn.classList.remove('is-open');
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

  // Close when a menu link is clicked
  menu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  // Close on outside click
  document.addEventListener('click', function (e) {
    if (!btn.contains(e.target) && !menu.contains(e.target)) {
      closeMenu();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });
}());
