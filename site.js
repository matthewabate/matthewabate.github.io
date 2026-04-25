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
    'BG18.jpg','BG20.jpg','BG22.jpg','BG23.jpg',
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

  // ── Per-image hero text palettes ────────────────────────────
  // Each entry overrides the CSS defaults for that background image.
  // All keys are optional — omit any to keep the site default.
  //
  //   --hero-accent        "isn't making something."   default #E82F2A
  //   --hero-line-b        "is making the right thing." default #F8FBCE
  //   --hero-static        "The hard part"              default #2E2724
  //   --hero-body          body copy paragraphs         default #2E2724
  //   --hero-btn-bg        scroll button background     default transparent
  //   --hero-btn-border    scroll button outline        default #2E2724
  //   --hero-btn-arrow     scroll button arrow color    default #2E2724
  //   --hero-primary-bg    "Get in touch" background    default #2E2724
  //   --hero-primary-color "Get in touch" text          default #ffffff
  var palettes = {
    'BG01.jpg': { '--hero-accent': '#FF9E9F', '--hero-line-b': '#F1AB84' },
    'BG07.jpg': { '--hero-accent': '#E82F2A', '--hero-line-b': '#F8FBCE' },
    'BG08.jpg': { '--hero-accent': '#A06389', '--hero-line-b': '#F8FBCE' },
    'BG09.jpg': { '--hero-accent': '#556EB3', '--hero-line-b': '#9765C8' },
    'BG11.jpg': { '--hero-accent': '#FF6C68', '--hero-line-b': '#2E2724',
                  '--hero-static': '#ffffff', '--hero-body': '#ffffff' },
    'BG12.jpg': { '--hero-accent': '#B0130F', '--hero-line-b': '#F8FBCE' },
    'BG13.jpg': { '--hero-accent': '#E82F2A', '--hero-line-b': '#ffffff' },
    'BG14.jpg': { '--hero-accent': '#E82F2A', '--hero-line-b': '#D58E57' },
    'BG15.jpg': { '--hero-accent': '#E82F2A', '--hero-line-b': '#AA7761' },
    'BG17.jpg': { '--hero-accent': '#E82F2A', '--hero-line-b': '#F8FBCE' },
    'BG18.jpg': { '--hero-accent': '#E82F2A', '--hero-line-b': '#F8FBCE' },
    'BG20.jpg': { '--hero-accent': '#E82F2A', '--hero-line-b': '#46ABAB' },
    'BG22.jpg': { '--hero-accent': '#6C6968', '--hero-line-b': '#F8FBCE' },
    'BG23.jpg': { '--hero-accent': '#FF807D', '--hero-line-b': '#F8FBCE' },
    'BG24.jpg': { '--hero-accent': '#FFB571', '--hero-line-b': '#F8FBCE' },
    'BG26.jpg': { '--hero-accent': '#F8C1BF', '--hero-line-b': '#F8FBCE' },
    'BG27.jpg': { '--hero-accent': '#E82F2A', '--hero-line-b': '#F8FBCE' },
    'BG28.jpg': { '--hero-accent': '#563838', '--hero-line-b': '#F8FBCE' },
    'BG33.jpg': { '--hero-accent': '#F8FBCE', '--hero-line-b': '#CEF1EF',
                  '--hero-static': '#ffffff', '--hero-body': '#ffffff',
                  '--hero-btn-bg': '#ffffff', '--hero-btn-border': '#ffffff', '--hero-btn-arrow': '#2E2724',
                  '--hero-primary-bg': '#ffffff', '--hero-primary-color': '#2E2724' },
    'BG34.jpg': { '--hero-accent': '#F8FBCE', '--hero-line-b': '#CEF1EF' },
    'BG39.jpg': { '--hero-accent': '#F8C1BF', '--hero-line-b': '#F8FBCE' },
    'BG41.jpg': { '--hero-accent': '#F8C1BF', '--hero-line-b': '#F8FBCE' },
  };

  // Create a fixed background layer div — avoids background-attachment:fixed,
  // which iOS Safari does not support on scrollable elements or pseudo-elements.
  var chosen = pick(bgImages);
  var bgUrl = "url('backgrounds/" + chosen + "')";

  // Apply palette for the chosen image; missing keys fall back to :root defaults.
  var palette = palettes[chosen] || {};
  [ '--hero-accent', '--hero-line-b', '--hero-static', '--hero-body',
    '--hero-btn-bg', '--hero-btn-border', '--hero-btn-arrow',
    '--hero-primary-bg', '--hero-primary-color'
  ].forEach(function(prop) {
    if (palette[prop]) document.documentElement.style.setProperty(prop, palette[prop]);
  });

  var bgLayer = document.createElement('div');
  bgLayer.id = 'bg-layer';
  bgLayer.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;z-index:-1;background-size:cover;background-position:center;background-image:' + bgUrl;
  document.body.insertBefore(bgLayer, document.body.firstChild);
  document.documentElement.style.setProperty('--bg-image', bgUrl);

  // Top mask: identical element to bg-layer but at z-index 150 — sits above page
  // content (z-index 0) but below the nav (z-index 200). clip-path (set in styles.css)
  // reveals only the thin gap strip above the white card, hiding any content that
  // scrolls into that area. Because it's the same full-viewport element with the same
  // background settings, it matches bg-layer perfectly — no iOS background-attachment issues.
  var topMask = document.createElement('div');
  topMask.id = 'top-mask';
  topMask.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;z-index:150;pointer-events:none;background-size:cover;background-position:center;background-image:' + bgUrl;
  document.body.appendChild(topMask);

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
