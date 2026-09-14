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

  /* ---------- menu movil ---------- */
  var burger = document.getElementById('burger');
  var mobnav = document.getElementById('mobnav');
  var mobclose = document.getElementById('mobclose');
  if (burger && mobnav) {
    var enlaces = [].slice.call(mobnav.querySelectorAll('nav a'));
    enlaces.forEach(function (a, i) { a.style.setProperty('--i', i); });

    var abrir = function () {
      mobnav.classList.add('open');
      mobnav.setAttribute('aria-hidden', 'false');
      burger.setAttribute('aria-expanded', 'true');
      burger.setAttribute('aria-label', 'Close menu');
      document.body.classList.add('nav-abierto');
      // se enfoca el panel, no el primer enlace: enfocar el enlace le dibujaba
      // un recuadro de foco encima y parecia un error de diseno
      setTimeout(function () { mobnav.focus({ preventScroll: true }); }, 60);
    };
    var cerrar = function () {
      mobnav.classList.remove('open');
      mobnav.setAttribute('aria-hidden', 'true');
      burger.setAttribute('aria-expanded', 'false');
      burger.setAttribute('aria-label', 'Open menu');
      document.body.classList.remove('nav-abierto');
    };
    var alternar = function () {
      if (mobnav.classList.contains('open')) cerrar(); else abrir();
    };

    burger.addEventListener('click', alternar);
    if (mobclose) mobclose.addEventListener('click', function () { cerrar(); burger.focus(); });
    enlaces.forEach(function (a) { a.addEventListener('click', cerrar); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobnav.classList.contains('open')) { cerrar(); burger.focus(); }
    });
    // si se agranda la ventana, el panel no debe quedar colgado
    window.addEventListener('resize', function () {
      if (window.innerWidth > 980 && mobnav.classList.contains('open')) cerrar();
    }, { passive: true });
    // el foco no debe salirse del panel abierto
    mobnav.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab' || !mobnav.classList.contains('open')) return;
      var foco = [].slice.call(mobnav.querySelectorAll('a[href], button'));
      if (!foco.length) return;
      var primero = foco[0], ultimo = foco[foco.length - 1];
      if (e.shiftKey && document.activeElement === primero) { e.preventDefault(); ultimo.focus(); }
      else if (!e.shiftKey && document.activeElement === ultimo) { e.preventDefault(); primero.focus(); }
    });
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
    ['IMG_1299.JPG', 'Roof replacement in progress on a Miami residence'],
    // faltaban: su galeria de portada tiene 16 fotos y aqui habia 12. Estas
    // cuatro salieron del blob de galeria de GoDaddy, que es donde viven de
    // verdad, y se describieron mirandolas una por una.
    ['65463793535__0045B052-DD00-406B-B491-C1D171F9.jpeg',
     'Finished bathroom with floating dark-wood vanity, backlit mirror and large-format tile'],
    ['0cd8462e4ae6a9d74c26a7b0bc238c2d-uncropped_sca.jpg',
     'Renovated pool and rear elevation of a white two-storey Miami residence'],
    ['0503051801d635c45dde1209b371e3c2-uncropped_sca.jpg',
     'Formal dining room with marble floor, chandelier and a view through to the living area'],
    ['0a090398-c944-4741-b7b5-f6a91a4fe948.jpg',
     'Crew setting new roof joists over an open Miami residence']
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
  var G = 'https://lh3.googleusercontent.com/';
  // ficha real de Google de Cortizo Construction, la misma que usa su sitio
  var GMAPS = 'https://maps.google.com/maps?cid=8160738004661650355';
  // Orden: la mas reciente primero.
  //
  // Sin foto de Google a proposito. Las URL de avatar de googleusercontent
  // son efimeras: las cinco devuelven ya 200 con 0 bytes, o sea que cada
  // carga lanzaba cinco peticiones que fallaban y caian a la inicial. Una
  // peticion que siempre falla es de las cosas que delatan un sitio dejado.
  // La inicial se dibuja directamente: sale igual, no se rompe nunca y no
  // depende de un dominio de terceros que puede caer.
  var REVIEWS = [
    ['Leyanis Cabrera', '7/31/2026', '(Translated by Google) Excellent service. The Cortizo Construction team is very professional, punct…',
     G + 'a-/ALV-UjWo-kJAGN4V79iUKpqdzAA0Dk4g7nAVSRBFfehp-qgWu-5buCA=s200-c-rp-mo-br100'],
    ['Richele Diaz', '1/13/2026', 'The best of the best! Great experience from start to finish. Great communication with the o…',
     G + 'a-/ALV-UjVptYmhttPjahjo_80CP8tjpD36cr0yUZ7hCqLL4m4aUm9MCFI=s200-c-rp-mo-ba12-br100'],
    ['Valeria Wardini', '1/13/2026', 'I highly recommend Cortizo Construction! If you a looking for professionalism, reliability, paid…',
     G + 'a/ACg8ocIDxOANUWjkGu-VdVN_64s32PsXBaT30rAl1DbaZYni8qRWpw=s200-c-rp-mo-ba12-br100'],
    ['Eugene Cruz', '3/27/2023', 'On time, within budget, while handling all the unexpected challenges that presented them…',
     G + 'a/ACg8ocKnfVbUAfDEBP6maBk8XVYQK8eMU3ymEQNL4DMnqmn8dwuq9A=s200-c-rp-mo-br100'],
    ['Giovanna Fronduto', '3/7/2023', 'Recommended a 100%. Very professional, planned, responsive.',
     G + 'a/ACg8ocLBxbvJQAVMvj2LDry7GBfhNW-Zc1Yxy6gXODRLwRHw-f9bSA=s200-c-rp-mo-br100']
  ];
  var revTrack = document.getElementById('rev');
  if (revTrack) {
    revTrack.innerHTML = REVIEWS.map(function (r) {
      return '<article class="rev-card">'
        + '<span class="avatar" aria-hidden="true">' + esc(r[0].charAt(0)) + '</span>'
        + '<span class="stars" aria-label="5 out of 5 stars">★★★★★</span>'
        + '<blockquote>&ldquo;' + esc(r[2]) + '&rdquo;</blockquote>'
        + '<a class="readfull" href="' + GMAPS + '" rel="noopener">Read full review</a>'
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


  /* ---------- parallax suave en las fotos grandes ---------- */
  var parallaxEls = [].slice.call(document.querySelectorAll('[data-parallax]'));
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (parallaxEls.length && !reduce) {
    var ticking = false;
    var applyParallax = function () {
      parallaxEls.forEach(function (el) {
        var box = el.getBoundingClientRect();
        if (box.bottom < -200 || box.top > window.innerHeight + 200) return;
        var amount = parseFloat(el.getAttribute('data-parallax')) || 0.1;
        var centre = box.top + box.height / 2 - window.innerHeight / 2;
        el.style.transform = 'scale(1.12) translate3d(0,' + (-centre * amount) + 'px,0)';
      });
      ticking = false;
    };
    var onParallax = function () {
      if (!ticking) { ticking = true; requestAnimationFrame(applyParallax); }
    };
    applyParallax();
    window.addEventListener('scroll', onParallax, { passive: true });
    window.addEventListener('resize', onParallax, { passive: true });
  }

  /* ---------- el 5.0 cuenta hacia arriba al entrar ---------- */
  var rating = document.querySelector('.rating[data-count]');
  if (rating && !reduce) {
    var target = parseFloat(rating.getAttribute('data-count')) || 5;
    var counted = false;
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting || counted) return;
        counted = true;
        var start = null, dur = 900;
        var step = function (ts) {
          if (start === null) start = ts;
          var t = Math.min((ts - start) / dur, 1);
          var eased = 1 - Math.pow(1 - t, 3);
          rating.textContent = (target * eased).toFixed(1);
          if (t < 1) requestAnimationFrame(step);
          else rating.textContent = target.toFixed(1);
        };
        requestAnimationFrame(step);
      });
    }, { threshold: 0.4 });
    cio.observe(rating);
  }

  /* ---------- la frase del proceso se revela palabra por palabra ---------- */
  var proc = document.querySelector('.process');
  if (proc && !reduce) {
    var palabras = proc.textContent.trim().split(/\s+/);
    proc.textContent = '';
    palabras.forEach(function (w, i) {
      var sp = document.createElement('span');
      sp.className = 'w';
      sp.style.setProperty('--i', i);
      sp.textContent = w;
      proc.appendChild(sp);
      if (i < palabras.length - 1) proc.appendChild(document.createTextNode(' '));
    });
    var pio = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) { proc.classList.add('in'); pio.unobserve(proc); }
      });
    }, { threshold: 0.25 });
    pio.observe(proc);
  } else if (proc) {
    proc.classList.add('in');
  }

  /* ---------- linea de tiempo del proceso ---------- */
  var tl = document.getElementById('timeline');
  if (tl) {
    var pasos = [].slice.call(tl.querySelectorAll('.tstep'));
    if (reduce) {
      tl.style.setProperty('--p', 1);
      pasos.forEach(function (s) { s.classList.add('reached'); });
    } else {
      var pendiente = false;
      var pintar = function () {
        var r = tl.getBoundingClientRect();
        // linea de lectura: 62% de la altura de la ventana
        var marca = window.innerHeight * 0.62;
        var p = (marca - r.top) / r.height;
        p = Math.max(0, Math.min(1, p));
        tl.style.setProperty('--p', p.toFixed(4));
        pasos.forEach(function (s) {
          var d = s.querySelector('.dot').getBoundingClientRect();
          s.classList.toggle('reached', d.top + d.height / 2 <= marca);
        });
        pendiente = false;
      };
      var alScroll = function () {
        if (!pendiente) { pendiente = true; requestAnimationFrame(pintar); }
      };
      pintar();
      window.addEventListener('scroll', alScroll, { passive: true });
      window.addEventListener('resize', alScroll, { passive: true });
    }
  }


  /* ---------- filtros del listado de proyectos ----------
     Botones y no menu desplegable: con cinco categorias el desplegable
     esconde el catalogo. El filtro se refleja en la direccion para que la
     vista se pueda compartir y para que "Atras" funcione. */
  var fgrid = document.getElementById('pgrid');
  if (fgrid) {
    var fbtns = [].slice.call(document.querySelectorAll('.filtro-btn'));
    var fcuenta = document.getElementById('filtro-cuenta');
    var fvacio = document.getElementById('filtro-vacio');
    var ftarjetas = [].slice.call(fgrid.querySelectorAll('.pcard'));

    var filtrar = function (cat, empujar) {
      var n = 0;
      ftarjetas.forEach(function (t) {
        var cats = (t.getAttribute('data-cats') || '').split(' ');
        var dentro = cat === 'todas' || cats.indexOf(cat) > -1;
        t.hidden = !dentro;
        if (dentro) n++;
      });
      fbtns.forEach(function (b) {
        var on = b.getAttribute('data-cat') === cat;
        b.classList.toggle('on', on);
        b.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
      if (fcuenta) {
        fcuenta.textContent = 'Showing ' + n + ' of ' + ftarjetas.length + ' projects';
      }
      if (fvacio) fvacio.hidden = n > 0;
      if (empujar) {
        var url = cat === 'todas' ? location.pathname
                                  : location.pathname + '?tipo=' + cat;
        history.pushState({ cat: cat }, '', url);
      }
    };

    fbtns.forEach(function (b) {
      b.setAttribute('aria-pressed', b.classList.contains('on') ? 'true' : 'false');
      b.addEventListener('click', function () {
        filtrar(b.getAttribute('data-cat'), true);
      });
    });
    var reset = document.querySelector('.filtro-reset');
    if (reset) reset.addEventListener('click', function () { filtrar('todas', true); });

    var deLaUrl = function () {
      var m = location.search.match(/[?&]tipo=([a-z-]+)/);
      return m && fbtns.some(function (b) { return b.getAttribute('data-cat') === m[1]; })
        ? m[1] : 'todas';
    };
    filtrar(deLaUrl(), false);
    window.addEventListener('popstate', function () { filtrar(deLaUrl(), false); });
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

  /* ---------- visor de fotos ----------
     Las fotos de proyecto no daban ninguna senal de que se pudieran abrir.
     La insignia de lupa la pone el CSS (asi la traen todas las .shot desde
     el primer pintado, venga el marcado de build.py o de donde venga) y
     aqui solo se monta el visor.
     El clic se delega en el documento a proposito: las tiras y las rejillas
     las escribe build.py y pueden crecer o cambiar de pagina sin que este
     archivo se entere.
     Sobre el scroll: la capa es position:fixed y no saca del flujo ni la
     barra de maqueta ni el header, que fue lo que un dia hizo que el
     documento se acortara y la pagina saltara sola. Lo unico que se toca es
     un overflow:hidden en html y body, el mismo truco del menu movil, que
     congela la posicion sin moverla. */
  var visor = null, vImg = null, vTxt = null, vNum = null, vTira = null;
  var vGrupo = [], vIndice = 0, vOrigen = null, vTimer = null, vPeticion = 0;
  var vMM = window.matchMedia('(prefers-reduced-motion: reduce)');

  // se consulta en cada uso, no al cargar: el visitante puede cambiar el
  // ajuste del sistema con la pagina abierta
  function vQuieto() { return vMM.matches; }

  function vDos(n) { return (n < 10 ? '0' : '') + n; }

  function vFlecha(d) {
    return '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">'
      + '<path d="' + d + '" stroke="currentColor" stroke-width="2"/></svg>';
  }

  function vCrear() {
    visor = document.createElement('div');
    visor.className = 'visor';
    visor.id = 'visor';
    visor.setAttribute('role', 'dialog');
    visor.setAttribute('aria-modal', 'true');
    visor.setAttribute('aria-label', 'Photo viewer');
    visor.setAttribute('aria-hidden', 'true');
    visor.tabIndex = -1;
    visor.innerHTML =
      '<button type="button" class="visor-x" aria-label="Close photo viewer">'
      + '<span></span><span></span></button>'
      + '<button type="button" class="visor-nav prev" aria-label="Previous photo">'
      + vFlecha('M15 4L7 12l8 8') + '</button>'
      + '<button type="button" class="visor-nav next" aria-label="Next photo">'
      + vFlecha('M9 4l8 8-8 8') + '</button>'
      + '<figure class="visor-fig">'
      + '<img class="visor-img" alt="">'
      + '<figcaption class="visor-cap" aria-live="polite">'
      + '<span class="visor-num"></span><span class="visor-txt"></span>'
      + '</figcaption></figure>'
      + '<div class="visor-tira"></div>';
    document.body.appendChild(visor);
    vImg = visor.querySelector('.visor-img');
    vTxt = visor.querySelector('.visor-txt');
    vNum = visor.querySelector('.visor-num');
    vTira = visor.querySelector('.visor-tira');

    // un solo oyente para toda la tira: los botones se rehacen en cada
    // apertura porque el grupo cambia de una galeria a otra
    vTira.addEventListener('click', function (ev) {
      var b = ev.target.closest('button');
      if (!b || !b.parentNode) return;
      var n = +b.getAttribute('data-n');
      if (n === vIndice) return;
      vIr(n - vIndice);
    });

    visor.querySelector('.visor-x').addEventListener('click', vCerrar);
    visor.querySelector('.visor-nav.prev').addEventListener('click', function () { vIr(-1); });
    visor.querySelector('.visor-nav.next').addEventListener('click', function () { vIr(1); });

    visor.addEventListener('click', function (ev) {
      if (ev.target.closest('button')) return;
      if (ev.target.closest('.visor-img, .visor-cap')) {
        // la foto y el pie no cierran, pero al pulsarlos el foco se iria al
        // body y entonces Escape y las flechas dejarian de responder
        visor.focus({ preventScroll: true });
        return;
      }
      vCerrar();
    });

    // pase con el dedo: en telefono es el gesto que todo el mundo prueba
    var vTx = 0, vTy = 0, vTocando = false;
    visor.addEventListener('touchstart', function (ev) {
      vTocando = ev.touches.length === 1;
      if (!vTocando) return;
      vTx = ev.touches[0].clientX;
      vTy = ev.touches[0].clientY;
    }, { passive: true });
    visor.addEventListener('touchend', function (ev) {
      if (!vTocando) return;
      vTocando = false;
      var t = ev.changedTouches[0];
      var dx = t.clientX - vTx, dy = t.clientY - vTy;
      // solo pasa de foto si el gesto es claramente horizontal, para no
      // confundir un arrastre vertical con un pase
      if (Math.abs(dx) < 45 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
      vIr(dx < 0 ? 1 : -1);
    }, { passive: true });
  }

  /* La foto grande no se pide a pelo: hasta que baja, la capa se queda en
     negro y eso es lo que delata a una pagina hecha a medias.

     Se pinta primero la miniatura, que el navegador ya tiene en cache porque
     esta en la pagina, asi que aparece en el mismo fotograma del clic. Va
     desenfocada a proposito, para que se lea como "cargando" y no como una
     foto de mala calidad. Cuando la grande termina de decodificarse se
     cambia el src y el desenfoque se va: el salto no se ve porque decode()
     garantiza que ya esta lista para pintar.

     vPeticion descarta las respuestas que llegan tarde: si pasas dos fotos
     rapido, la grande de la primera no puede aterrizar encima de la
     tercera. */
  /* La tira se arma con la MISMA miniatura que ya esta en la pagina
     (currentSrc), asi que no se descarga ni un byte de mas y aparece
     pintada en el mismo fotograma en que se abre el visor. */
  function vTiraArmar() {
    if (!vTira) return;
    if (vGrupo.length < 2) { vTira.innerHTML = ''; return; }
    var trozos = vGrupo.map(function (enlace, n) {
      var foto = enlace.querySelector('img');
      var mini = foto ? (foto.currentSrc || foto.src) : enlace.getAttribute('href');
      var pie = enlace.getAttribute('data-caption') || (foto && foto.alt) || '';
      return '<button type="button" data-n="' + n + '" aria-label="'
        + pie.replace(/"/g, '&quot;') + '"><img src="' + mini + '" alt=""></button>';
    });
    vTira.innerHTML = trozos.join('');
  }

  function vTiraMarcar() {
    if (!vTira) return;
    var botones = vTira.children;
    for (var n = 0; n < botones.length; n++) {
      botones[n].classList.toggle('activo', n === vIndice);
      botones[n].setAttribute('aria-current', n === vIndice ? 'true' : 'false');
    }
    var b = botones[vIndice];
    if (!b) return;
    // se mueve la tira a mano y no con scrollIntoView, que ademas arrastraria
    // el documento de detras
    var meta = b.offsetLeft - (vTira.clientWidth - b.offsetWidth) / 2;
    if (vTira.scrollTo) {
      vTira.scrollTo({ left: meta, behavior: vQuieto() ? 'auto' : 'smooth' });
    } else {
      vTira.scrollLeft = meta;
    }
  }

  function vPintar() {
    var enlace = vGrupo[vIndice];
    if (!enlace) return;
    var foto = enlace.querySelector('img');
    var pie = enlace.getAttribute('data-caption') || (foto && foto.alt) || '';
    var grande = enlace.getAttribute('href');
    var mini = foto ? (foto.currentSrc || foto.src) : grande;

    vImg.alt = pie;
    vTxt.textContent = pie;
    vNum.textContent = vDos(vIndice + 1) + ' / ' + vDos(vGrupo.length);
    vTiraMarcar();

    var mia = ++vPeticion;
    if (vImg.src !== grande) {
      vImg.src = mini;
      visor.classList.add('cargando');
    }
    var lista = function () {
      if (mia !== vPeticion) return;
      vImg.src = grande;
      visor.classList.remove('cargando');
    };
    var grande_img = new Image();
    grande_img.src = grande;
    if (grande_img.decode) {
      grande_img.decode().then(lista).catch(lista);
    } else {
      grande_img.onload = lista;
      grande_img.onerror = lista;
    }
  }

  // la foto que viene y la que queda atras se piden al vuelo: al cambiar ya
  // estan en cache y el pase no se queda en negro esperando la descarga
  function vPrecargar() {
    [-1, 0, 1].forEach(function (d) {
      var enlace = vGrupo[(vIndice + d + vGrupo.length) % vGrupo.length];
      if (!enlace) return;
      var previa = new Image();
      previa.src = enlace.getAttribute('href');
    });
  }

  function vIr(paso) {
    if (vGrupo.length < 2) return;
    vIndice = (vIndice + paso + vGrupo.length) % vGrupo.length;
    if (vQuieto()) { vPintar(); vPrecargar(); return; }
    vPrecargar();
    clearTimeout(vTimer);
    visor.classList.add('cambiando');
    vTimer = setTimeout(function () {
      vPintar();
      visor.classList.remove('cambiando');
    }, 200);
  }

  function vAbrir(enlace) {
    if (!visor) vCrear();
    var grupo = enlace.getAttribute('data-group');
    // se compara el atributo en lugar de meterlo en un selector: el nombre
    // del grupo lo escribe build.py y no hay por que fiarse de que no lleve
    // comillas
    vGrupo = grupo
      ? [].slice.call(document.querySelectorAll('.shot[data-group]')).filter(function (s) {
          return s.getAttribute('data-group') === grupo;
        })
      : [enlace];
    vIndice = vGrupo.indexOf(enlace);
    if (vIndice < 0) { vGrupo = [enlace]; vIndice = 0; }
    vOrigen = enlace;
    // en telefono la tira solo ensena 3 de las 5 fotos; el grupo las lleva
    // todas, asi que desde el visor se llega a las que la rejilla esconde
    visor.classList.toggle('sola', vGrupo.length < 2);
    vTiraArmar();
    clearTimeout(vTimer);
    visor.classList.remove('cambiando');
    vPintar();
    visor.setAttribute('aria-hidden', 'false');
    document.body.classList.add('visor-abierto');
    if (vQuieto()) {
      visor.classList.add('abierto');
    } else {
      // el navegador tiene que ver el estado cerrado pintado antes de la
      // clase que abre, si no no hay a que transicionar y entra de golpe
      requestAnimationFrame(function () {
        requestAnimationFrame(function () { visor.classList.add('abierto'); });
      });
    }
    // se enfoca la capa y no la X, por lo mismo que en el menu movil: el
    // recuadro de foco sobre el boton parecia un error de diseno
    setTimeout(function () { visor.focus({ preventScroll: true }); }, 40);
    vPrecargar();
  }

  function vCerrar() {
    if (!visor || !visor.classList.contains('abierto')) return;
    clearTimeout(vTimer);
    visor.classList.remove('abierto', 'cambiando');
    visor.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('visor-abierto');
    // preventScroll: devolver el foco no puede mover la pagina ni un pixel
    if (vOrigen) { vOrigen.focus({ preventScroll: true }); vOrigen = null; }
  }

  document.addEventListener('click', function (ev) {
    if (!ev.target || !ev.target.closest) return;
    var enlace = ev.target.closest('.shot');
    // sin href no hay foto grande que ensenar: mejor no secuestrar el clic
    if (!enlace || !enlace.getAttribute('href')) return;
    // con Ctrl, Cmd o Shift el visitante quiere la foto en otra pestana:
    // se deja pasar el enlace tal cual
    if (ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.altKey) return;
    ev.preventDefault();
    vAbrir(enlace);
  });

  document.addEventListener('keydown', function (ev) {
    if (!visor || !visor.classList.contains('abierto')) return;
    if (ev.key === 'Escape') { ev.preventDefault(); vCerrar(); return; }
    if (ev.key === 'ArrowLeft') { ev.preventDefault(); vIr(-1); return; }
    if (ev.key === 'ArrowRight') { ev.preventDefault(); vIr(1); return; }
    if (ev.key !== 'Tab') return;
    // el foco no debe salirse del visor, igual que en el menu movil
    var vFoco = [].slice.call(visor.querySelectorAll('button')).filter(function (bt) {
      return bt.getClientRects().length; // con una sola foto las flechas no estan
    });
    if (!vFoco.length) return;
    var vPrimero = vFoco[0], vUltimo = vFoco[vFoco.length - 1];
    if (!visor.contains(document.activeElement)) { ev.preventDefault(); vPrimero.focus(); return; }
    if (ev.shiftKey && document.activeElement === vPrimero) { ev.preventDefault(); vUltimo.focus(); }
    else if (!ev.shiftKey && document.activeElement === vUltimo) { ev.preventDefault(); vPrimero.focus(); }
  });
})();
