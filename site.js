// ─────────────────────────────────────────────────────────────
//  site.js — shared scripts for all pages
//
//  Includes:
//    • Random background image on page load
//    • Random bio portrait on bio page
//    • Mobile hamburger menu (nav__hamburger)
//
//  To add or remove a background image:
//    1. Add/remove the file from the backgrounds/ folder
//    2. Add/remove the filename in the bgImages array below
//       AND update backgrounds/manifest.json to match
//
//  To add or remove a bio portrait:
//    1. Add/remove the file from the images/ folder
//    2. Add/remove the filename in the portraits array below
//       AND update images/portraits.json to match
// ─────────────────────────────────────────────────────────────
(function () {

  var bgImages = [
    'BG01.jpg','BG07.jpg','BG08.jpg','BG09.jpg','BG11.jpg',
    'BG12.jpg','BG13.jpg','BG14.jpg','BG15.jpg','BG17.jpg',
    'BG18.jpg','BG19.jpg','BG20.jpg','BG22.jpg','BG23.jpg',
    'BG24.jpg','BG26.jpg','BG27.jpg','BG28.jpg','BG33.jpg',
    'BG34.jpg','BG38.jpg','BG39.jpg','BG41.jpg'
  ];

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

  // Set random background image on body and --bg-image variable
  var bgUrl = "url('backgrounds/" + pick(bgImages) + "')";
  document.body.style.backgroundImage = bgUrl;
  document.documentElement.style.setProperty('--bg-image', bgUrl);

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

  // Move menu to <body> so position:fixed is always relative to the viewport,
  // not the scroll-container (which causes iOS Safari to pin it to the nav position).
  document.body.appendChild(menu);

  function openMenu() {
    btn.classList.add('is-open');
    menu.classList.add('is-open');
    btn.setAttribute('aria-expanded', 'true');
    btn.setAttribute('aria-label', 'Close navigation');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    btn.classList.remove('is-open');
    menu.classList.remove('is-open');
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-label', 'Open navigation');
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
