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

  /* ---------- scroll reveal ----------
     Dos caminos. Si GSAP y ScrollTrigger cargaron, y el visitante no ha
     pedido menos movimiento, manda GSAP y este observador no llega a
     montarse. Si falta cualquiera de las dos cosas, se queda el de siempre,
     que es el que ha llevado el sitio hasta hoy. */
  var quietoYa = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hayGsap = !!(window.gsap && window.ScrollTrigger) && !quietoYa;

  if (!hayGsap) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0, rootMargin: '0px 0px -12% 0px' });
    document.querySelectorAll('.rv, .mask').forEach(function (el) { io.observe(el); });
  }

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

  /* ---------- ficha del equipo, en modal ----------
     Las biografias siguen estando en <details> dentro de la tarjeta y sin
     JavaScript se abren igual: esa era la razon de haberlas puesto asi y no
     se toca. Lo que cambia es que con JavaScript el clic ya no despliega la
     tarjeta, abre un modal.

     El motivo es medible: la biografia mas larga son 295 palabras. Abierta
     dentro de la rejilla, la tarjeta crecia hasta empujar a las de su fila y
     dejaba a las vecinas convertidas en columnas vacias de varias pantallas.
     Con el modal la rejilla no se mueve y la ficha se lee entera.

     El contenido no se duplica en el marcado: el modal se arma leyendo la
     propia tarjeta. */
  var eqCapa = null, eqFoto = null, eqNom = null, eqRol = null, eqBio = null;
  var eqTxt = null, eqPrev = null, eqNext = null;
  var eqFichas = [], eqIndice = 0, eqOrigen = null;

  function eqCrear() {
    eqCapa = document.createElement('div');
    eqCapa.className = 'fichaeq';
    eqCapa.setAttribute('role', 'dialog');
    eqCapa.setAttribute('aria-modal', 'true');
    eqCapa.setAttribute('aria-label', 'Team member profile');
    eqCapa.setAttribute('aria-hidden', 'true');
    eqCapa.tabIndex = -1;
    eqCapa.innerHTML =
      '<button type="button" class="fichaeq-x" aria-label="Close profile">'
      + '<span></span><span></span></button>'
      + '<div class="fichaeq-panel">'
      + '<div class="fichaeq-foto"><img alt=""></div>'
      + '<div class="fichaeq-txt">'
      + '<p class="fichaeq-rotulo">Cortizo Construction</p>'
      + '<h2 class="fichaeq-nom"></h2>'
      + '<p class="fichaeq-rol"></p>'
      + '<div class="fichaeq-bio"></div>'
      + '<div class="fichaeq-pie">'
      + '<button type="button" class="fichaeq-nav prev"><i>Previous</i><b></b></button>'
      + '<button type="button" class="fichaeq-nav next"><i>Next</i><b></b></button>'
      + '</div></div></div>';
    document.body.appendChild(eqCapa);
    eqFoto = eqCapa.querySelector('.fichaeq-foto img');
    eqNom = eqCapa.querySelector('.fichaeq-nom');
    eqRol = eqCapa.querySelector('.fichaeq-rol');
    eqBio = eqCapa.querySelector('.fichaeq-bio');
    eqTxt = eqCapa.querySelector('.fichaeq-txt');
    eqPrev = eqCapa.querySelector('.fichaeq-nav.prev');
    eqNext = eqCapa.querySelector('.fichaeq-nav.next');

    eqCapa.querySelector('.fichaeq-x').addEventListener('click', eqCerrar);
    eqPrev.addEventListener('click', function () { eqIr(-1); });
    eqNext.addEventListener('click', function () { eqIr(1); });
    // pulsar fuera del panel cierra; dentro, no
    eqCapa.addEventListener('click', function (ev) {
      if (ev.target.closest('.fichaeq-panel')) return;
      eqCerrar();
    });
  }

  function eqPintar() {
    var fig = eqFichas[eqIndice];
    if (!fig) return;
    var foto = fig.querySelector('img');
    var nom = fig.querySelector('h3');
    var rol = fig.querySelector('.role');
    var lead = fig.querySelector('.bio-lead');
    var cuerpo = fig.querySelector('.bio-body');

    if (foto) { eqFoto.src = foto.currentSrc || foto.src; eqFoto.alt = foto.alt || ''; }
    eqNom.textContent = nom ? nom.textContent : '';
    eqRol.textContent = rol ? rol.textContent : '';
    // el marcado que se copia lo escribe build.py, no viene de fuera
    eqBio.innerHTML = (lead ? '<p>' + lead.innerHTML + '</p>' : '')
      + (cuerpo ? cuerpo.innerHTML : '');
    // al pasar de una ficha a otra se vuelve arriba: si no, la segunda
    // empieza por la mitad del texto de la primera
    if (eqTxt) eqTxt.scrollTop = 0;

    var n = eqFichas.length;
    var antes = eqFichas[(eqIndice - 1 + n) % n].querySelector('h3');
    var luego = eqFichas[(eqIndice + 1) % n].querySelector('h3');
    eqPrev.querySelector('b').textContent = antes ? antes.textContent : '';
    eqNext.querySelector('b').textContent = luego ? luego.textContent : '';
  }

  function eqIr(paso) {
    if (eqFichas.length < 2) return;
    eqIndice = (eqIndice + paso + eqFichas.length) % eqFichas.length;
    eqPintar();
  }

  function eqAbrir(fig) {
    if (!eqCapa) eqCrear();
    eqFichas = [].slice.call(document.querySelectorAll('.team figure'));
    eqIndice = eqFichas.indexOf(fig);
    if (eqIndice < 0) { eqFichas = [fig]; eqIndice = 0; }
    eqCapa.classList.toggle('sola', eqFichas.length < 2);
    // el foco vuelve al control que abrio, no al principio de la pagina
    eqOrigen = fig.querySelector('summary') || fig;
    eqPintar();
    eqCapa.setAttribute('aria-hidden', 'false');
    // el mismo candado de scroll que usa el visor de fotos: overflow:hidden
    // en html y body, que congela la posicion sin moverla
    document.body.classList.add('visor-abierto');
    if (vQuieto()) {
      eqCapa.classList.add('abierto');
    } else {
      requestAnimationFrame(function () {
        requestAnimationFrame(function () { eqCapa.classList.add('abierto'); });
      });
    }
    setTimeout(function () { eqCapa.focus({ preventScroll: true }); }, 40);
  }

  function eqCerrar() {
    if (!eqCapa || !eqCapa.classList.contains('abierto')) return;
    eqCapa.classList.remove('abierto');
    eqCapa.setAttribute('aria-hidden', 'true');
    // el candado se suelta solo si no queda otra capa abierta
    if (!visor || !visor.classList.contains('abierto')) {
      document.body.classList.remove('visor-abierto');
    }
    if (eqOrigen) { eqOrigen.focus({ preventScroll: true }); eqOrigen = null; }
  }

  document.addEventListener('click', function (ev) {
    if (!ev.target || !ev.target.closest) return;
    var fig = ev.target.closest('.team figure');
    if (!fig) return;
    if (ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.altKey) return;
    // sin esto el navegador ademas despliega el <details> por debajo del
    // modal, y al cerrarlo la rejilla aparece descuadrada
    ev.preventDefault();
    eqAbrir(fig);
  });

  document.addEventListener('keydown', function (ev) {
    if (!eqCapa || !eqCapa.classList.contains('abierto')) return;
    if (ev.key === 'Escape') { ev.preventDefault(); eqCerrar(); return; }
    if (ev.key === 'ArrowLeft') { ev.preventDefault(); eqIr(-1); return; }
    if (ev.key === 'ArrowRight') { ev.preventDefault(); eqIr(1); return; }
    if (ev.key !== 'Tab') return;
    var foco = [].slice.call(eqCapa.querySelectorAll('button')).filter(function (b) {
      return b.getClientRects().length;
    });
    if (!foco.length) return;
    var pri = foco[0], ult = foco[foco.length - 1];
    if (!eqCapa.contains(document.activeElement)) { ev.preventDefault(); pri.focus(); return; }
    if (ev.shiftKey && document.activeElement === pri) { ev.preventDefault(); ult.focus(); }
    else if (!ev.shiftKey && document.activeElement === ult) { ev.preventDefault(); pri.focus(); }
  });

  /* ---------- galeria justificada de verdad ----------
     Con solo flex-wrap y justify-content:center cada fila acababa de un
     ancho distinto: medidas sobre la version publicada, las filas se
     quedaban cortas por 166, 82, 25, 154 y 93 px dentro de un contenedor de
     1.308. Desiguales por los dos lados, que es lo que delata una rejilla
     como volcado de fotos y no como galeria compuesta.

     Aqui cada fila se estira hasta ocupar el ancho entero: se van metiendo
     fotos hasta pasarse y entonces se baja la altura de esa fila lo justo
     para que encaje al pixel. Ninguna foto se recorta, que es la razon por
     la que esta galeria no usa cuadros fijos: sus proporciones van del 0,56
     al 2,39.

     Las proporciones salen de los atributos width y height que ya escribe
     build.py, no de la imagen cargada, asi que la rejilla se coloca bien
     desde el primer pintado aunque las fotos bajen despues.

     Sin JavaScript no pasa nada: queda la version en flex, que es la de
     antes. */
  var gjTimer = null;

  function gjRazon(t) {
    var i = t.querySelector('img');
    if (!i) return 1.5;
    var w = parseFloat(i.getAttribute('width')), h = parseFloat(i.getAttribute('height'));
    if (!(w > 0 && h > 0)) { w = i.naturalWidth; h = i.naturalHeight; }
    return (w > 0 && h > 0) ? w / h : 1.5;
  }

  function gjColocar(grid) {
    var tiles = [].slice.call(grid.querySelectorAll('.shot'));
    if (tiles.length < 2) return;

    // se limpia antes de medir: si no, la segunda pasada leeria la altura
    // que dejo la primera en vez de la que manda el CSS
    tiles.forEach(function (t) { t.style.height = ''; t.style.width = ''; });
    var ancho = grid.clientWidth;
    var objetivo = tiles[0].getBoundingClientRect().height;
    if (!ancho || !objetivo) return;

    var cs = getComputedStyle(grid);
    var hueco = parseFloat(cs.columnGap || cs.gap) || 0;

    var fila = [], suma = 0;

    function cerrar(estirar) {
      var libre = ancho - hueco * (fila.length - 1);
      var alto = libre / suma;
      // la ultima fila solo se estira si no queda desproporcionada; si le
      // falta mucho se queda a su altura y centrada, como estaba
      if (!estirar && alto > objetivo * 1.6) alto = objetivo;
      fila.forEach(function (o) {
        o.t.style.height = alto + 'px';
        o.t.style.width = (alto * o.r) + 'px';
      });
      fila = []; suma = 0;
    }

    for (var n = 0; n < tiles.length; n++) {
      var r = gjRazon(tiles[n]);
      fila.push({ t: tiles[n], r: r });
      suma += r;
      if (objetivo * suma + hueco * (fila.length - 1) >= ancho) cerrar(true);
    }
    if (fila.length) cerrar(false);
  }

  function gjTodas() {
    // la de Servicios va en rejilla uniforme y la coloca el CSS: si el
    // algoritmo le escribiera ancho y alto en linea la descuadraria
    [].slice.call(document.querySelectorAll('.shotgrid:not(.terminada):not(.enobra)')).forEach(gjColocar);
  }

  if (document.querySelector('.shotgrid:not(.terminada):not(.enobra)')) {
    gjTodas();
    window.addEventListener('resize', function () {
      clearTimeout(gjTimer);
      gjTimer = setTimeout(gjTodas, 140);
    });
    // las tipografias cambian el ancho del contenedor al aterrizar
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(gjTodas).catch(function () {});
    }
  }

  /* ==========================================================
     CAPA DE MOVIMIENTO (GSAP + ScrollTrigger + SplitText + Lenis)
     Solo se monta si las cuatro cargaron y el visitante no ha pedido
     menos movimiento. Todo lo de arriba sigue funcionando sin ella.

     Lo que hace, y por que cada cosa:
     - Lenis: el desplazamiento deja de ir a saltos del raton. Es lo que
       mas cambia la sensacion y es lo que usan las dos referencias.
     - El revelado pasa de encender una clase a una animacion con su curva
       y su escalonado, disparada por posicion en pantalla.
     - Los titulares se descubren linea a linea, que es para lo que existe
       SplitText.
     - Paralaje solo donde la foto ya iba recortada a proposito: las fichas
       de servicio y las portadas. En la galeria no, porque ahi la foto va
       entera y moverla obligaria a recortarla.
     ========================================================== */
  if (hayGsap) (function () {
    // si algo de aqui dentro revienta, los elementos se quedarian invisibles
    // para siempre porque el observador de arriba ya no se monto. La red:
    // encender todo a mano y dejar el sitio como sin animaciones.
    try { montar(); } catch (e) {
      document.querySelectorAll('.rv, .mask').forEach(function (el) {
        el.classList.add('in');
      });
      return;
    }

    function montar() {
    var ST = window.ScrollTrigger;
    gsap.registerPlugin(ST);
    // marca para el CSS: solo con la capa montada se agrandan las fotos que
    // llevan paralaje, para que el recorrido no descubra el borde
    document.documentElement.classList.add('mov');

    /* --- desplazamiento suave --- */
    var lenis = null;
    if (window.Lenis) {
      // autoRaf en falso es obligatorio aqui: Lenis 1.3 arranca su propio
      // bucle salvo que se le diga que no, y este lo mueve el ticker de
      // GSAP unas lineas mas abajo. Con los dos a la vez su estado interno
      // se corrompia y scrollTo reventaba con "t is not a function" en
      // todas sus formas, asi que los enlaces de ancla no hacian nada.
      lenis = new window.Lenis({ lerp: 0.085, smoothWheel: true, autoRaf: false });
      lenis.on('scroll', ST.update);
      gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
      gsap.ticker.lagSmoothing(0);
      // el visor, la ficha de equipo y el menu movil congelan la pagina con
      // overflow:hidden; Lenis tiene que parar tambien o sigue moviendo por
      // debajo de la capa abierta
      window.__lenis = lenis;
      var obs = new MutationObserver(function () {
        var cerrado = document.body.classList.contains('visor-abierto')
          || document.body.classList.contains('nav-abierto');
        if (cerrado) lenis.stop(); else lenis.start();
      });
      obs.observe(document.body, { attributes: true, attributeFilter: ['class'] });
      // los enlaces de ancla los lleva Lenis, si no saltan de golpe
      document.addEventListener('click', function (ev) {
        var a = ev.target.closest && ev.target.closest('a[href^="#"]');
        if (!a) return;
        var id = a.getAttribute('href');
        if (!id || id === '#') return;
        var destino;
        try { destino = document.querySelector(id); } catch (e) { return; }
        if (!destino) return;
        ev.preventDefault();
        // Se desplaza a pelo y no con lenis.scrollTo: en Lenis 1.3.11 ese
        // metodo revienta con "t is not a function" con cualquier destino
        // numerico, con y sin opciones. Probado uno a uno. El nativo
        // funciona y Lenis se mantiene sincronizado: comprobado, los dos
        // marcaban 900 despues de un scrollTo suave.
        var y = destino.getBoundingClientRect().top + window.scrollY - 90;
        window.scrollTo({ top: y, behavior: 'smooth' });
      });
    }

    /* --- revelado --- */
    // La portada NO entra por scroll. Esta sobre el pliegue, asi que su
    // disparador se cumple en el acto y solo aporta un punto de fallo: si
    // GSAP tarda o el disparador se calcula sobre una altura vieja, el
    // titular se queda invisible y la primera impresion es una pagina en
    // blanco. Entra en secuencia nada mas cargar, mas abajo.
    gsap.utils.toArray('.rv').filter(function (el) {
      return !el.closest('.pagehero');
    }).forEach(function (el) {
      var d = parseFloat((el.style.getPropertyValue('--d') || '0').replace('ms', '')) / 1000;
      gsap.fromTo(el, { y: 34, autoAlpha: 0 }, {
        y: 0, autoAlpha: 1, duration: 1, ease: 'power3.out', delay: d || 0,
        scrollTrigger: { trigger: el, start: 'top 88%', once: true }
      });
    });

    /* --- la cortinilla, atada al scroll ---
       Antes la foto tardaba 1.25 s fijos: la abria un reloj, no el scroll, y
       si se pasaba deprisa ya estaba abierta antes de verla. Ahora la abre el
       recorrido. La foto se descubre de abajo a arriba mientras sube por la
       pantalla y termina de abrirse a media altura, que es donde se mira.

       El desfase --d, que antes era un retraso en segundos, ahora corre el
       punto de arranque: las fotas vecinas no se abren a la vez, se abren
       escalonadas, pero cada una a su propio ritmo de scroll. */
    gsap.utils.toArray('.mask').forEach(function (el) {
      var d = parseFloat((el.style.getPropertyValue('--d') || '0').replace('ms', '')) / 1000;
      gsap.fromTo(el,
        { clipPath: 'inset(100% 0% 0% 0%)' },
        { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none',
          scrollTrigger: { trigger: el, scrub: 0.55,
            start: 'top ' + (94 - Math.min(d, 0.4) * 22) + '%',
            end: 'top 52%' } });
    });

    /* --- titulares linea a linea ---
       Cada linea va dentro de su propia ventana con overflow oculto, puesta
       a mano. Se probo la opcion mask del propio SplitText y en esta
       compilacion no crea ninguna: medido, cero ventanas, y sin ventana la
       linea se ve deslizandose fuera de su caja en vez de descubrirse. */
    if (window.SplitText) {
      gsap.utils.toArray('h1, h2.title, .casetitulo, .cierre-titulo, .svcline-head h3')
        .forEach(function (el) {
          var enPortada = !!el.closest('.pagehero');
          if (!el.textContent.trim()) return;
          var partido;
          try { partido = new window.SplitText(el, { type: 'lines', linesClass: 'linea' }); }
          catch (e) { return; }
          if (!partido.lines || !partido.lines.length) return;
          partido.lines.forEach(function (l) {
            var caja = document.createElement('span');
            caja.className = 'linea-caja';
            l.parentNode.insertBefore(caja, l);
            caja.appendChild(l);
          });
          if (enPortada) {
            // se guarda para que la entrada de portada lo encadene
            el.__lineas = partido.lines;
            gsap.set(partido.lines, { yPercent: 108 });
            return;
          }
          gsap.fromTo(partido.lines, { yPercent: 108 }, {
            yPercent: 0, duration: 1.05, ease: 'power4.out', stagger: 0.09,
            scrollTrigger: { trigger: el, start: 'top 88%', once: true }
          });
        });
    }

    /* --- entrada de la portada ---
       Va aqui y no arriba porque necesita que SplitText ya haya partido el
       titular. Antes esperaba a que subiera una cortina de carga; se quito
       porque no gustaba, asi que arranca en cuanto la pagina esta lista. */
    (function () {
      var piezas = gsap.utils.toArray('.pagehero .rv');
      var h1 = document.querySelector('.pagehero h1');
      var tl = gsap.timeline({ delay: 0.12 });
      if (piezas.length) {
        tl.to(piezas, {
          autoAlpha: 1, y: 0, duration: 0.95, ease: 'power3.out', stagger: 0.09
        }, 0);
      }
      if (h1 && h1.__lineas) {
        tl.to(h1.__lineas, {
          yPercent: 0, duration: 1.1, ease: 'power4.out', stagger: 0.09
        }, 0.12);
      }
      // Red de seguridad: una
      // portada en blanco es peor que una portada sin animacion.
      setTimeout(function () {
        piezas.forEach(function (el) {
          var c = getComputedStyle(el);
          if (parseFloat(c.opacity) < 0.98) gsap.set(el, { autoAlpha: 1, y: 0 });
        });
        if (h1 && h1.__lineas) gsap.set(h1.__lineas, { yPercent: 0 });
      }, 3000);
    })();

    /* --- la montana se dibuja sola ---
       Cada curva de nivel lleva pathLength="1000", asi que su longitud
       cuenta como 1000 pase lo que pase y el trazo se dibuja moviendo el
       desfase de 1000 a 0, sin medir nada en el navegador.

       El orden no es el del archivo: se ordenan por tamano, de la curva mas
       pequena a la mas grande, para que el dibujo crezca desde el nucleo
       hacia fuera en vez de aparecer a trozos sueltos. Es como se lee un
       plano topografico. */
    gsap.utils.toArray('.ola-svg').forEach(function (svg) {
      var trazos = [].slice.call(svg.querySelectorAll('path'));
      if (!trazos.length) return;
      trazos.sort(function (a, b) {
        var ca, cb;
        try { ca = a.getBBox(); cb = b.getBBox(); } catch (e) { return 0; }
        return (ca.width * ca.height) - (cb.width * cb.height);
      });
      gsap.set(trazos, { strokeDasharray: 1000, strokeDashoffset: 1000, opacity: 1 });
      var dibujo = gsap.to(trazos, {
        strokeDashoffset: 0,
        duration: 1.5,
        ease: 'power2.inOut',
        stagger: { each: 0.035, from: 'start' },
        scrollTrigger: { trigger: svg, start: 'top 92%', once: true },
        onComplete: function () { respira(svg, trazos); }
      });
      // deriva muy lenta al bajar: da profundidad sin que se note el truco
      gsap.fromTo(svg, { yPercent: -3 }, {
        yPercent: 5, ease: 'none',
        scrollTrigger: { trigger: svg.parentNode, start: 'top bottom',
                         end: 'bottom top', scrub: 0.8 }
      });

      /* --- el terreno se cierra al salir de la portada ---
         En su video de portada las curvas empiezan sueltas alrededor de la
         "C" y acaban inundando el cuadro, y de esa masa de lineas sale su
         logo: un arco visto por una elipse. El arco del video es terreno que
         se convierte en estructura, y eso su web no lo cuenta por ningun
         lado. Aqui, al dejar la portada, el campo de curvas se cierra y gana
         tinta, como en el segundo tramo del video. */
      var portada = svg.closest('.pagehero');
      var caja = svg.closest('.ola');
      if (portada && caja) {
        // la tinta vive en .ola (0.34 por CSS), no en el svg: animando el
        // svg la opacidad bajaba de 1 en vez de subir desde 0.34
        gsap.to(caja, {
          scale: 1.16, opacity: 0.55, ease: 'none', transformOrigin: '70% 50%',
          scrollTrigger: { trigger: portada, start: 'top top',
                           end: 'bottom top', scrub: 0.7 }
        });
      }
    });

    /* --- el campo de curvas respira ---
       En su video las lineas nunca estan quietas: ondulan todo el rato y es
       de ahi de donde sale la sensacion de terreno vivo. Un dibujo que se
       traza una vez y se queda parado no cuenta eso.

       Se hace moviendo el trazado, no el elemento: cada curva lleva
       dasharray 1000, asi que empujar el dashoffset unas unidades desplaza
       el punto por donde empieza y la linea parece reptar sobre si misma.
       Es practicamente gratis y no mueve nada de sitio.

       Cada capa va a su ritmo y con su fase, para que el conjunto ondule en
       vez de latir a la vez. */
    function respira(svg, trazos) {
      var N = 6;
      for (var k = 0; k < N; k++) {
        var trozo = trazos.filter(function (t, i) { return i % N === k; });
        if (!trozo.length) continue;
        gsap.to(trozo, {
          strokeDashoffset: 16,
          duration: 3.2 + k * 0.45,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay: k * 0.28
        });
      }
    }

    /* --- la montana responde al raton ---
       No se anade ningun elemento nuevo ni un solo byte de descarga: se
       mueven las curvas que ya estan. Cada capa va a su propia velocidad, la
       del nucleo mas que la de fuera, asi que al mover el raton el relieve se
       separa y se vuelve a juntar como un mapa que se inclina.

       Los trazos se reparten en cinco capas y se anima la capa, no el trazo:
       con 50 trazos sueltos serian miles de actualizaciones por segundo para
       un efecto que se ve igual con cinco.

       Se escucha en la ventana y no en el encabezado, porque lo que se pidio
       es que el fondo responda al raton en cualquier parte de la pagina. Y
       solo con raton de verdad: en tactil no hay puntero al que seguir. */
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      var capas = [];
      gsap.utils.toArray('.ola-svg').forEach(function (svg) {
        var trazos = [].slice.call(svg.querySelectorAll('path'));
        if (!trazos.length) return;
        trazos.sort(function (a, b) {
          var ca, cb;
          try { ca = a.getBBox(); cb = b.getBBox(); } catch (e) { return 0; }
          return (ca.width * ca.height) - (cb.width * cb.height);
        });
        var N = 5, porCapa = Math.ceil(trazos.length / N);
        for (var k = 0; k < N; k++) {
          var trozo = trazos.slice(k * porCapa, (k + 1) * porCapa);
          if (!trozo.length) continue;
          var g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
          svg.appendChild(g);
          trozo.forEach(function (t) { g.appendChild(t); });
          capas.push({
            svg: svg,
            x: gsap.quickTo(g, 'x', { duration: 1, ease: 'power3.out' }),
            y: gsap.quickTo(g, 'y', { duration: 1, ease: 'power3.out' }),
            // 10 px la capa del nucleo, 2 la de fuera
            f: 10 - (k / (N - 1)) * 8
          });
        }
      });

      if (capas.length) {
        var px = 0, py = 0, pendiente = false;
        window.addEventListener('pointermove', function (ev) {
          px = (ev.clientX / window.innerWidth - 0.5) * 2;
          py = (ev.clientY / window.innerHeight - 0.5) * 2;
          pendiente = true;
        }, { passive: true });
        // una sola pasada por fotograma: el pointermove dispara mucho mas
        gsap.ticker.add(function () {
          if (!pendiente) return;
          pendiente = false;
          capas.forEach(function (c) {
            // si su montana no esta en pantalla no se gasta nada en moverla
            var r = c.svg.getBoundingClientRect();
            if (r.bottom < 0 || r.top > window.innerHeight) return;
            c.x(px * c.f);
            c.y(py * c.f * 0.5);
          });
        });
      }
    }

    /* --- el lienzo vivo ---
       Curvas de nivel calculadas en el momento, no un dibujo guardado.
       Debajo hay un campo de alturas: cinco cerros, cada uno con su altura
       y su radio. El guion recorre una rejilla, mira por donde el terreno
       cruza cada cota y une esos cruces. Eso son las curvas.

       Frente al SVG de la marca, que es fijo, esto se puede deformar. El
       raton es un cerro mas que va con el: al acercarse el terreno se
       levanta y las curvas se abren a su alrededor, y las lineas cercanas
       se encienden con un degradado radial centrado en el puntero. Al hacer
       scroll el campo se desplaza contra la seccion, que es el paralaje.

       El campo base se calcula una sola vez por medida. Por fotograma solo
       se suma el cerro del raton, que es una parabola: ni exp ni raices. Y
       si el puntero se detuvo y la pagina no se movio, no se vuelve a
       dibujar. Si el puntero anda lejos del lienzo, tampoco. */
    (function () {
      if (!window.Path2D) return;
      var lienzos = [].slice.call(document.querySelectorAll('canvas.lienzo'));
      if (!lienzos.length) return;

      var PASO = 18;     // lado minimo de la celda de la rejilla, en px
      var PUNTOS = 5600; // cuantos puntos de rejilla como mucho, por lienzo
      var MARGEN = 64;   // rejilla de sobra arriba y abajo, para el paralaje
      var COTAS = 9;     // cuantas curvas de nivel
      var RADIO = 250;   // alcance del cerro del raton, en px
      var ALTO = 0.34;   // cuanto levanta, sobre un campo normalizado a 1

      // x, y en fraccion del lienzo; altura; radio en fraccion del ancho
      var CERROS = [
        [0.14, 0.62, 1.00, 0.34], [0.38, 0.20, 0.72, 0.26],
        [0.63, 0.80, 0.86, 0.30], [0.87, 0.34, 0.64, 0.24],
        [0.50, 0.50, 0.40, 0.54]
      ];

      var fino = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

      var mapas = lienzos.map(function (c) {
        var col = (getComputedStyle(c).color.match(/[0-9]+/g) || [10, 10, 10]);
        return {
          c: c, ctx: c.getContext('2d'),
          tinta: [+col[0], +col[1], +col[2]],
          // sobre negro la linea necesita mas cuerpo para leerse igual
          base: +col[0] + +col[1] + +col[2] > 380 ? 0.13 : 0.10,
          halo: +col[0] + +col[1] + +col[2] > 380 ? 0.55 : 0.42,
          w: 0, h: 0, paso: PASO, nx: 0, ny: 0, campo: null, val: null, cotas: [],
          mx: -9999, my: -9999, tx: -9999, ty: -9999,
          desliz: 0, fuera: true, sucio: false
        };
      });

      function medir(m) {
        var r = m.c.getBoundingClientRect();
        var w = Math.round(r.width), h = Math.round(r.height);
        if (!w || !h) return false;
        var dpr = Math.min(window.devicePixelRatio || 1, 2);
        m.w = w; m.h = h;
        m.c.width = Math.round(w * dpr);
        m.c.height = Math.round(h * dpr);
        m.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        // en un monitor ancho la rejilla se afloja en vez de multiplicarse:
        // el coste por fotograma se queda donde esta y las curvas caen en el
        // mismo sitio, solo con menos vertices
        m.paso = Math.max(PASO, Math.ceil(Math.sqrt(w * (h + MARGEN * 2) / PUNTOS)));
        m.nx = Math.ceil(w / m.paso) + 1;
        m.ny = Math.ceil((h + MARGEN * 2) / m.paso) + 1;
        m.campo = new Float32Array(m.nx * m.ny);
        m.val = new Float32Array(m.nx * m.ny);

        var lo = Infinity, hi = -Infinity, i, j, q, k = 0;
        for (j = 0; j < m.ny; j++) {
          var y = -MARGEN + j * m.paso;
          for (i = 0; i < m.nx; i++, k++) {
            var x = i * m.paso, v = 0;
            for (q = 0; q < CERROS.length; q++) {
              var ce = CERROS[q];
              var dx = x - ce[0] * w, dy = y - ce[1] * h, rr = ce[3] * w;
              var t = 1 - (dx * dx + dy * dy) / (rr * rr);
              if (t > 0) v += ce[2] * t * t;
            }
            m.campo[k] = v;
            if (v < lo) lo = v;
            if (v > hi) hi = v;
          }
        }
        // se normaliza a 0..1 para que las cotas no dependan del tamano
        var trecho = (hi - lo) || 1;
        for (k = 0; k < m.campo.length; k++) m.campo[k] = (m.campo[k] - lo) / trecho;
        m.cotas.length = 0;
        for (i = 1; i <= COTAS; i++) m.cotas.push(i / (COTAS + 1));
        m.sucio = true;
        return true;
      }

      // marching squares: una pasada por cota sobre la rejilla ya sumada
      function cota(ruta, val, nx, ny, nivel, paso) {
        for (var j = 0; j < ny - 1; j++) {
          var f0 = j * nx, f1 = f0 + nx, y0 = j * paso, y1 = y0 + paso;
          for (var i = 0; i < nx - 1; i++) {
            var a = val[f0 + i], b = val[f0 + i + 1];
            var d = val[f1 + i], e = val[f1 + i + 1];
            var caso = (a > nivel ? 8 : 0) | (b > nivel ? 4 : 0) |
                       (e > nivel ? 2 : 0) | (d > nivel ? 1 : 0);
            if (caso === 0 || caso === 15) continue;
            var x0 = i * paso, x1 = x0 + paso, p;
            p = b - a; var ax = x0 + paso * (p ? (nivel - a) / p : 0.5);  // arriba
            p = e - b; var ry = y0 + paso * (p ? (nivel - b) / p : 0.5);  // derecha
            p = e - d; var bx = x0 + paso * (p ? (nivel - d) / p : 0.5);  // abajo
            p = d - a; var ly = y0 + paso * (p ? (nivel - a) / p : 0.5);  // izq.
            switch (caso) {
              case 1: case 14: ruta.moveTo(x0, ly); ruta.lineTo(bx, y1); break;
              case 2: case 13: ruta.moveTo(bx, y1); ruta.lineTo(x1, ry); break;
              case 3: case 12: ruta.moveTo(x0, ly); ruta.lineTo(x1, ry); break;
              case 4: case 11: ruta.moveTo(ax, y0); ruta.lineTo(x1, ry); break;
              case 6: case 9:  ruta.moveTo(ax, y0); ruta.lineTo(bx, y1); break;
              case 7: case 8:  ruta.moveTo(x0, ly); ruta.lineTo(ax, y0); break;
              // las dos sillas de montar: dos tramos sueltos en la misma celda
              case 5:  ruta.moveTo(x0, ly); ruta.lineTo(ax, y0);
                       ruta.moveTo(bx, y1); ruta.lineTo(x1, ry); break;
              case 10: ruta.moveTo(ax, y0); ruta.lineTo(x1, ry);
                       ruta.moveTo(x0, ly); ruta.lineTo(bx, y1); break;
            }
          }
        }
      }

      function pintar(m) {
        var ctx = m.ctx, nx = m.nx, ny = m.ny, campo = m.campo, val = m.val;
        var i, j, k, n;
        var activo = fino && !m.fuera;
        if (activo) {
          // el raton, en coordenadas de la rejilla (que empieza mas arriba)
          var px = m.mx, py = m.my + MARGEN, r2 = RADIO * RADIO;
          for (j = 0, k = 0; j < ny; j++) {
            var dy = j * m.paso - py, dy2 = dy * dy;
            for (i = 0; i < nx; i++, k++) {
              var dx = i * m.paso - px;
              var t = 1 - (dx * dx + dy2) / r2;
              val[k] = t > 0 ? campo[k] + ALTO * t * t : campo[k];
            }
          }
        } else {
          val.set(campo);
        }

        ctx.clearRect(0, 0, m.w, m.h);
        ctx.save();
        ctx.translate(0, -MARGEN + m.desliz);
        ctx.lineWidth = 1;

        var rutas = [];
        for (n = 0; n < m.cotas.length; n++) {
          var ruta = new Path2D();
          cota(ruta, val, nx, ny, m.cotas[n], m.paso);
          rutas.push(ruta);
        }

        var t3 = m.tinta, rgb = t3[0] + ',' + t3[1] + ',' + t3[2];
        ctx.strokeStyle = 'rgb(' + rgb + ')';
        ctx.globalAlpha = m.base;
        for (n = 0; n < rutas.length; n++) ctx.stroke(rutas[n]);

        if (activo) {
          // y aqui se encienden las de cerca: el mismo trazo, repasado con
          // un degradado que se apaga al alejarse del puntero
          var gy = m.my + MARGEN - m.desliz;
          var g = ctx.createRadialGradient(m.mx, gy, 0, m.mx, gy, RADIO);
          g.addColorStop(0, 'rgba(' + rgb + ',' + m.halo + ')');
          g.addColorStop(0.55, 'rgba(' + rgb + ',' + (m.halo * 0.42) + ')');
          g.addColorStop(1, 'rgba(' + rgb + ',0)');
          ctx.globalAlpha = 1;
          ctx.strokeStyle = g;
          for (n = 0; n < rutas.length; n++) ctx.stroke(rutas[n]);
        }
        ctx.restore();
      }

      if (fino) {
        window.addEventListener('pointermove', function (ev) {
          for (var n = 0; n < mapas.length; n++) {
            var m = mapas[n];
            if (!m.w) continue;
            var r = m.c.getBoundingClientRect();
            m.tx = ev.clientX - r.left;
            m.ty = ev.clientY - r.top;
            // la primera vez no se arrastra desde el infinito
            if (m.mx < -9000) { m.mx = m.tx; m.my = m.ty; }
          }
        }, { passive: true });
      }

      gsap.ticker.add(function () {
        var vp = window.innerHeight;
        for (var n = 0; n < mapas.length; n++) {
          var m = mapas[n];
          var r = m.c.getBoundingClientRect();
          // fuera de pantalla no se gasta ni un fotograma
          if (r.bottom < -60 || r.top > vp + 60) continue;
          if (Math.round(r.width) !== m.w || Math.round(r.height) !== m.h) {
            if (!medir(m)) continue;
          }
          // paralaje: el campo se desplaza contra el recorrido de la seccion
          var centro = (r.top + r.height / 2 - vp / 2) / vp;
          var desliz = Math.max(-MARGEN, Math.min(MARGEN, centro * 54));
          if (Math.abs(desliz - m.desliz) > 0.4) { m.desliz = desliz; m.sucio = true; }

          if (fino && m.mx > -9000) {
            var dx = m.tx - m.mx, dy = m.ty - m.my;
            var movio = Math.abs(dx) > 0.4 || Math.abs(dy) > 0.4;
            if (movio) { m.mx += dx * 0.09; m.my += dy * 0.09; }
            // si el cerro ya paso de largo deja de valer la pena repintar,
            // pero el fotograma en que entra o sale hay que darlo igual: si
            // no, el relieve se queda clavado en el ultimo estado
            var fuera = m.mx < -RADIO || m.my < -RADIO ||
                        m.mx > m.w + RADIO || m.my > m.h + RADIO;
            if ((movio && !fuera) || fuera !== m.fuera) m.sucio = true;
            m.fuera = fuera;
          }
          if (m.sucio) { m.sucio = false; pintar(m); }
        }
      });
    })();

    /* --- el camino del proceso, con sus cinco puntos ---
       La linea recta pasa a ser un camino que serpentea entre las fases,
       con un marcador que lo recorre al hacer scroll y enciende cada punto
       al pasar por el.

       La ruta NO va escrita en el HTML: se calcula desde la posicion real
       de cada punto, porque depende del largo de cada texto y cambia al
       redimensionar. Se traza una curva cubica por tramo, con las asas
       desviadas a un lado y a otro alternando, asi que la linea pasa
       exactamente por cada punto y se curva entre ellos. */
    (function () {
      var linea = document.getElementById('timeline');
      if (!linea || !window.MotionPathPlugin) return;
      gsap.registerPlugin(window.MotionPathPlugin);

      var svg = linea.querySelector('.ruta');
      var camino = linea.querySelector('.ruta-linea');
      var hecho = linea.querySelector('.ruta-hecho');
      var punto = linea.querySelector('.ruta-punto');
      var pasos = [].slice.call(linea.querySelectorAll('.tstep'));
      if (!svg || !camino || pasos.length < 2) return;

      var largo = 0;

      function trazar() {
        var base = linea.getBoundingClientRect();
        svg.setAttribute('viewBox', '0 0 ' + base.width + ' ' + base.height);
        var pts = pasos.map(function (paso) {
          var d = paso.querySelector('.dot');
          var r = (d || paso).getBoundingClientRect();
          return { x: r.left - base.left + r.width / 2,
                   y: r.top - base.top + r.height / 2 };
        });
        var d = 'M' + pts[0].x + ' ' + pts[0].y;
        for (var i = 1; i < pts.length; i++) {
          var a = pts[i - 1], b = pts[i];
          var dy = (b.y - a.y) / 2.4;
          // el desvio va siempre hacia el texto, con dos amplitudes que se
          // alternan. Alternando de lado, el tramo que iba a la izquierda se
          // salia del contenedor: los puntos estan a 23 px del borde y el
          // asa caia en -10, medido.
          var k = (i % 2 ? 36 : 13);
          d += ' C' + (a.x + k) + ' ' + (a.y + dy)
             + ' ' + (b.x + k) + ' ' + (b.y - dy)
             + ' ' + b.x + ' ' + b.y;
        }
        camino.setAttribute('d', d);
        hecho.setAttribute('d', d);
        largo = camino.getTotalLength() || 1;
        gsap.set(hecho, { strokeDasharray: largo, strokeDashoffset: largo });
      }

      trazar();

      function marcar(avance) {
        // el punto i esta en (i / (n-1)) del recorrido
        pasos.forEach(function (paso, i) {
          var suyo = i / (pasos.length - 1);
          paso.classList.toggle('reached', avance >= suyo - 0.02);
        });
      }

      var recorrido = gsap.to(punto, {
        motionPath: { path: camino, align: camino, alignOrigin: [0.5, 0.5] },
        ease: 'none',
        scrollTrigger: {
          trigger: linea,
          start: 'top 68%',
          end: 'bottom 75%',
          scrub: 0.45,
          onUpdate: function (self) {
            marcar(self.progress);
            gsap.set(hecho, { strokeDashoffset: largo * (1 - self.progress) });
          },
          onRefreshInit: trazar
        }
      });

      // al redimensionar cambian las alturas de los textos y con ellas los
      // puntos: hay que rehacer la ruta o el marcador va por fuera
      ST.addEventListener('refresh', function () {
        trazar();
        if (recorrido.scrollTrigger) marcar(recorrido.scrollTrigger.progress);
      });
    })();

    /* --- paralaje, solo donde la foto ya iba recortada --- */
    gsap.utils.toArray('.portada-foto').forEach(function (img) {
        gsap.fromTo(img, { yPercent: -6 }, {
          yPercent: 6, ease: 'none',
          scrollTrigger: { trigger: img.parentNode, start: 'top bottom',
                           end: 'bottom top', scrub: 0.6 }
        });
      });

    // las fotos entran con carga diferida y cambian el alto de la pagina:
    // sin esto los disparadores se quedan calculados sobre el alto viejo
    window.addEventListener('load', function () { ST.refresh(); });
    }
  })();

})();
