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

  var allBgImages = [
    'BG01.jpg','BG02.jpg','BG03.jpg','BG04.jpg','BG05.jpg',
    'BG06.jpg','BG07.jpg','BG08.jpg','BG09.jpg','BG10.jpg',
    'BG11.jpg','BG12.jpg','BG13.jpg','BG14.jpg','BG15.jpg',
    'BG16.jpg','BG17.jpg','BG18.jpg','BG19.jpg','BG20.jpg',
    'BG21.jpg','BG22.jpg','BG23.jpg','BG24.jpg','BG25.jpg',
    'BG26.jpg','BG27.jpg'
  ];

  var indexBgImages = [
    'BG10.jpg','BG12.jpg','BG17.jpg','BG27.jpg'
  ];

  var path = window.location.pathname;
  var isIndex = path.endsWith('index.html') || path.endsWith('/');
  var bgImages = isIndex ? indexBgImages : allBgImages;

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

  function openMenu() {
    btn.classList.add('is-open');
    menu.classList.add('is-open');
    btn.setAttribute('aria-expanded', 'true');
    btn.setAttribute('aria-label', 'Close navigation');
  }

  function closeMenu() {
    btn.classList.remove('is-open');
    menu.classList.remove('is-open');
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-label', 'Open navigation');
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
