// ─────────────────────────────────────────────────────────────
//  site.js — shared image randomisation for all pages
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
    'BG01.jpg','BG02.jpg','BG03.jpg','BG04.jpg','BG05.jpg',
    'BG06.jpg','BG07.jpg','BG08.jpg','BG09.jpg','BG10.jpg',
    'BG11.jpg','BG12.jpg','BG13.jpg','BG14.jpg','BG15.jpg',
    'BG16.JPG','BG17.JPG','BG18.JPG','BG19.JPG','BG20.JPG',
    'BG21.JPG','BG22.JPG','BG23.JPG','BG24.JPG','BG25.JPG',
    'BG26.JPG','BG27.jpg'
  ];

  var portraits = [
    'MA-Design.jpg',
    'MA-Headphones.JPG',
    'MA-NYC.JPG',
    'MA-Pink.JPG',
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
