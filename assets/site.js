/* ============================================================
   Cortizo Construction — maqueta Vonoa Web
   Comportamiento compartido por todas las paginas.
   ============================================================ */
(function () {
  'use strict';
  document.body.classList.remove('no-js');

  var CDN = 'https://img1.wsimg.com/isteam/ip/82adafc7-8fdd-4660-bac1-a4ad3720bb89/';
  function img(file, w) { return CDN + encodeURIComponent(file) + '/:/rs=w:' + w + ',cg:true,m'; }
  function esc(s) { var d = document.createElement('div'); d.textContent = s; return d.innerHTML; }
  window.CortizoImg = img;

  /* ---------- linea del header al bajar ---------- */
  var hdr = document.getElementById('hdr');
  if (hdr) {
    var onScroll = function () { hdr.classList.toggle('stuck', window.scrollY > 40); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- scroll reveal ---------- */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0, rootMargin: '0px 0px -12% 0px' });
  document.querySelectorAll('.rv, .mask').forEach(function (el) { io.observe(el); });

  /* ---------- galeria "Recent transformations" ---------- */
  var GALLERY = [
    ['c943f9406cd4eb5d675774e85e21bc21-uncropped_sca.jpg', 'Finished kitchen with island, pendant lighting and integrated appliances'],
    ['175Claudia.Mor.Foto.Cortizo.construction-.jpg', 'Finished dining room with pendant light and framed artwork'],
    ['55ccbcaa-658b-4996-b4a8-f5142c8ec62b.jpg', 'Freestanding bathtub beside a stone wall with a view to the pool'],
    ['257ab500-723b-407d-9ab0-960d72e439f8.jpg', 'White kitchen with island and counter stools, Rodriguez Residence'],
    ['IMG_6723 (1)-051be5c.JPG', 'Bedroom with full-height built-in wardrobe'],
    ['161Claudia.Mor.Foto.Cortizo.construction-.jpg', 'Patterned tile wall with built-in oven'],
    ['f1a8cddeb42852ddc8be3a3c2bde9c9c-uncropped_sca.jpg', 'Stairwell with new railing and artwork'],
    ['143Claudia.Mor.Foto.Cortizo.construction-.jpg', 'Bathroom finished in blue and white patterned tile'],
    ['IMG_6721.JPG', 'Wood slat feature wall with pendant lighting'],
    ['cedc01bb-4000-409f-812a-2a57643a5c37.jpg', 'White kitchen with brass fixtures after full renovation'],
    ['IMG_2408 (1).JPG', 'Patterned floor tile being set by our own crew'],
    ['IMG_1299.JPG', 'Roof replacement in progress on a Miami residence']
  ];

  var galTrack = document.getElementById('gal');
  var galThumbs = document.getElementById('gal-thumbs');
  if (galTrack) {
    galTrack.innerHTML = GALLERY.map(function (g, i) {
      return '<figure data-i="' + i + '"><img loading="lazy" src="' + img(g[0], 900) + '" alt="' + esc(g[1]) + '">'
        + '<figcaption>' + esc(g[1]) + '</figcaption></figure>';
    }).join('');
  }
  if (galThumbs) {
    galThumbs.innerHTML = GALLERY.map(function (g, i) {
      return '<button type="button" role="tab" data-i="' + i + '" aria-current="' + (i === 0) + '">'
        + '<img loading="lazy" src="' + img(g[0], 200) + '" alt="Show photo ' + (i + 1) + ': ' + esc(g[1]) + '"></button>';
    }).join('');
    galThumbs.addEventListener('click', function (ev) {
      var b = ev.target.closest('button');
      if (!b) return;
      var fig = galTrack.querySelector('figure[data-i="' + b.getAttribute('data-i') + '"]');
      if (fig) galTrack.scrollTo({ left: fig.offsetLeft - galTrack.offsetLeft, behavior: 'smooth' });
    });
    galTrack.addEventListener('scroll', function () {
      var first = galTrack.firstElementChild;
      if (!first) return;
      var step = first.getBoundingClientRect().width + 12;
      var i = Math.round(galTrack.scrollLeft / step);
      galThumbs.querySelectorAll('button').forEach(function (b) {
        b.setAttribute('aria-current', String(Number(b.getAttribute('data-i')) === i));
      });
    }, { passive: true });
  }

  /* ---------- resenas de Google, tal como las muestra su widget ---------- */
  var REVIEWS = [
    ['Eugene Cruz', '3/27/2023', 'On time, within budget, while handling all the unexpected challenges that presented them…'],
    ['Giovanna Fronduto', '3/7/2023', 'Recommended a 100%. Very professional, planned, responsive.'],
    ['Leyanis Cabrera', '7/31/2026', '(Translated by Google) Excellent service. The Cortizo Construction team is very professional, punct…'],
    ['Richele Diaz', '1/13/2026', 'The best of the best! Great experience from start to finish. Great communication with the o…'],
    ['Valeria Wardini', '1/13/2026', 'I highly recommend Cortizo Construction! If you a looking for professionalism, reliability, paid…']
  ];
  var revTrack = document.getElementById('rev');
  if (revTrack) {
    revTrack.innerHTML = REVIEWS.map(function (r) {
      return '<article class="rev-card">'
        + '<span class="avatar" aria-hidden="true">' + esc(r[0].charAt(0)) + '</span>'
        + '<span class="stars" aria-label="5 out of 5 stars">★★★★★</span>'
        + '<blockquote>&ldquo;' + esc(r[2]) + '&rdquo;</blockquote>'
        + '<span class="who"><b>' + esc(r[0]) + '</b> &middot; ' + esc(r[1]) + '</span>'
        + '</article>';
    }).join('');
  }

  /* ---------- flechas de los carruseles ---------- */
  document.querySelectorAll('.car-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var track = document.getElementById(btn.getAttribute('data-car'));
      if (!track || !track.firstElementChild) return;
      var step = track.firstElementChild.getBoundingClientRect().width + 16;
      track.scrollBy({ left: step * Number(btn.getAttribute('data-dir')), behavior: 'smooth' });
    });
  });

  /* ---------- video de intro: respaldo y reproduccion ---------- */
  var v = document.getElementById('herovid');
  if (v) {
    var done = false;
    var videoFallback = function () {
      if (done) return;
      done = true;
      var im = document.createElement('img');
      im.className = 'hero-video';
      im.src = img('c943f9406cd4eb5d675774e85e21bc21-uncropped_sca.jpg', 1600);
      im.alt = 'Finished kitchen with island and pendant lighting by Cortizo Construction in Miami';
      v.replaceWith(im);
    };
    var tryPlay = function () {
      if (!v.isConnected) return;
      var pr = v.play && v.play();
      if (pr && pr.catch) pr.catch(function () {});
    };
    v.addEventListener('error', videoFallback, true);
    var src = v.querySelector('source');
    if (src) src.addEventListener('error', videoFallback);
    setTimeout(function () { if (v.isConnected && v.readyState === 0) videoFallback(); }, 9000);

    v.addEventListener('loadeddata', tryPlay);
    v.addEventListener('canplay', tryPlay);
    tryPlay();
    var vio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!v.isConnected) return;
        if (e.isIntersecting) tryPlay(); else v.pause();
      });
    }, { threshold: 0.2 });
    vio.observe(v);
    ['pointerdown', 'touchstart', 'keydown'].forEach(function (evt) {
      document.addEventListener(evt, function () { tryPlay(); }, { once: true });
    });
    v.style.cursor = 'pointer';
    v.addEventListener('click', function () { v.paused ? tryPlay() : v.pause(); });
  }

  /* ---------- formularios de demostracion ---------- */
  var lead = document.getElementById('leadform');
  if (lead) {
    lead.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var n = document.getElementById('fnote');
      n.textContent = 'Thank you. This is a demo, so nothing was sent. On the live site this lands in Laura’s inbox within seconds.';
      n.style.color = '#fff';
    });
  }
  var news = document.getElementById('newsform');
  if (news) {
    news.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var n = document.getElementById('newsnote');
      n.textContent = 'Thank you. This is a demo, so no address was stored.';
      n.style.color = '#1B1B1B';
    });
  }
})();
