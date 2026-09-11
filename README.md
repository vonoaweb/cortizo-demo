# Cortizo Construction — maqueta de portada

Prospecto: **Laura Cortizo**, founder de Cortizo Construction LLC (Miami, FL).
Licencia de contratista general certificado de Florida: **CGC1535571**.
Contacto verificado: **+1 786 736 0247** (sacado del enlace `wa.me` de su página de contacto).
Sitio actual: https://cortizoconstruction.com — **GoDaddy Website Builder 8.0** (Websites + Marketing).

Primer contacto por InMail de LinkedIn el 10-sep-2026. Ella respondió el mismo día
pidiendo las dos líneas de título y descripción.

---

## Ligas para mandarle a Laura

| Qué | Liga |
|---|---|
| **Maqueta de la portada** | https://vonoaweb.github.io/cortizo-demo/ |
| **Punch list de 10 puntos** | https://claude.ai/code/artifact/ea57c978-da6d-47c3-b6e2-13536fcac0f9 |

Repo público: https://github.com/vonoaweb/cortizo-demo (rama `main`, Pages en raíz,
mismo patrón que `massofa-demo` y `estancia-demo`).

La copia que se publica vive **fuera de OneDrive**, en `C:\Users\makin\vonoa-deploy\cortizo-demo`,
por lo de [[onedrive-rompe-git]]. Para actualizar la maqueta: edita el `index.html` de
aquí, cópialo a esa carpeta, `git commit` y `git push`.

## Qué hay aquí

**Sitio de varias páginas, no una sola página larga.** Misma navegación que su sitio real.

| Página | Archivo | Qué lleva |
|---|---|---|
| Home | `index.html` | Video, H1, quiénes somos, valores, servicios, galería, 2 proyectos, reseñas, newsletter |
| Services | `services.html` | Homes y Hospitality a detalle, Our Process en 4 pasos, galería |
| Projects | `projects.html` | Las 5 fichas con tipo, fechas y alcance |
| About us | `about.html` | Biografía de Laura, el equipo, los 4 valores explicados, reseñas |
| Contact | `contact.html` | Teléfono, WhatsApp, licencia, formulario, apartado de subcontratistas |
| Casa Bohemia | `casa-bohemia.html` | Caso de estudio completo |
| Rodriguez Residence | `rodriguez-residence.html` | Caso de estudio completo |
| The Bernal Residence | `the-bernal-residence.html` | Caso de estudio completo |
| Matheson Residence | `matheson-residence.html` | Caso de estudio completo |
| San Juan Hotel | `san-juan-hotel.html` | Caso de estudio completo |

Estilos y comportamiento compartidos en `assets/styles.css` y `assets/site.js`, con
cache buster `?v=N`. **Si tocas el CSS, sube el número en `build.py` (variable `V`).**

### Cómo se edita

Las 10 páginas **se generan**, no se editan a mano. Todo el contenido vive en
`build.py`: los textos, los 5 proyectos, el equipo, los valores y las reseñas.

```bash
python build.py
```

Eso reescribe los 10 HTML. Editar un `.html` directamente se pierde en la siguiente
generación.

La hoja de recomendaciones para Laura (el *punch list* de 10 puntos con los títulos
y descripciones listos para copiar) se publicó como artifact aparte:
https://claude.ai/code/artifact/ea57c978-da6d-47c3-b6e2-13536fcac0f9

Para verla local:

```bash
python -m http.server 8031 --directory cortizo-demo
```

Ya está registrada en `.claude/launch.json` como `cortizo-demo`.

---

## Regla de esta maqueta

**Mismas secciones, mismos textos y mismas imágenes que su sitio.** Lo único que
cambia son las animaciones, los problemas técnicos corregidos y unas pocas mejoras
de composición. Se rechazaron tres versiones antes de llegar aquí: la v1 no respetaba
su marca, la v2 se saltaba secciones suyas, la v3 era una sola página larga y la v4
tenía secciones inventadas en la portada.

### Secciones, una por una

| Página | Secciones | Origen |
|---|---|---|
| Home | Video, "Every project starts with the right team" + 2 botones, quiénes somos + sus 2 botones, galería, reseñas de Google, newsletter | Todas suyas |
| Services | Homes, Hospitality, Our Process | Suyas, con su texto |
| Projects | Su párrafo de intro + los 5 proyectos con SU descripción y SU tira de 5 fotos | Suyas |
| About us | Biografía de Laura, Meet our team, Join our team, What guides our work, subcontratistas | Suyas |
| Contact | Let's talk, datos, formulario, subcontratistas | Suya + los datos que faltaban |
| 5 proyectos | Overview, The challenge, What we learned, The standards it set, Why this project matters | Suyas, textuales |

**Lo único añadido:** la franja negra de licencia, 5.0, zonas e idiomas. Corrige dos
puntos del punch list, porque ni el teléfono ni la licencia aparecen escritos en su
sitio actual.

### Inventario de sus gráficos de marca

Se me pasaron varias veces. Este es el listado completo y dónde va cada uno.

| Gráfico | Dónde |
|---|---|
| `Cortizo_Web3.mp4` (Dropbox) | Video de intro de la portada |
| `Otro Home.jpg` | Bloque "WHO WE ARE" en portada y About |
| `Cortizo_Web_Misc-6ee2c7a.png` | Fondo del bloque de reseñas |
| `1234-29` a `1234-32.jpg` | Los cuatro valores, en About |
| `NUEVONUEVOSERVCortizo_Banner_Titulo02-01-34.png` | Servicios, bloque Homes |
| `NUEVONUEVOSERVCortizo_Banner_Titulo02-01-01.png` | Servicios, bloque Hospitality |
| `TITULOSFINALES02-01-01.jpg` | Título de la página Projects |
| `TITULOSFINALES02-01-02.jpg` | Título de la página About us |
| `Cortizo_Web_Misc-17.png` | Cierre de About |
| `Cortizo_Web_Misc-16-16-16.png` | Cierre de Contact |

**Los banners de título son JPG negro sobre blanco.** Sobre el fondo oscuro van con
`filter:invert(1)` más `mix-blend-mode:screen`. Sin el `screen`, el fondo blanco del JPG
deja un recuadro visible alrededor del título.

**Ojo con `clip-path` y `loading="lazy"` juntos.** La máscara de revelado recorta el
elemento a área cero, el navegador nunca considera la imagen visible y la carga diferida
no dispara: la imagen no carga nunca. Por eso los gráficos de curvas se revelan por
opacidad y reservan altura con `aspect-ratio`.

### Servicios

Cada servicio es una fila completa con su gráfico y el texto alternando lado, en vez de
dos columnas estrechas de puro texto. El párrafo, el listado de alcance y los botones son
los suyos, sobre el mismo fondo oscuro que usa ella.

**Cómo se recorta su gráfico.** El PNG es de 800×800 y **transparente**: el espiral
arriba, un hueco grande y la foto en la mitad de abajo, sin ocupar todo el ancho. Puesto
entero dejaba un recuadro casi vacío con la foto cortada por el borde. La solución:

```css
.svcart { aspect-ratio: 16/10; overflow: hidden }
.svcart img { object-fit: cover; object-position: 50% 100%;
              transform: scale(1.55); transform-origin: 50% 74% }
```

El contenedor más ancho que alto hace que `cover` recorte en vertical, `object-position`
al 100% se queda con la mitad de abajo, y el `scale` amplía para que la foto sangre a
todo el ancho. No se le puso número de agua encima: el rótulo "01 / RESIDENTIAL" ya lo
lleva y sobre la foto competía con ella.

### Bloque "Our Process"

La frase estaba a `24ch` y salía en cinco líneas cortas y desiguales. Ahora va a `30ch`
con `text-wrap: balance` y queda en tres. Se revela **palabra por palabra** al entrar en
pantalla, con 45 ms de retardo entre palabras.

Debajo ya no hay cuatro columnas sueltas sino una **línea de tiempo vertical atada al
scroll**, porque el proceso es una secuencia y las columnas no la contaban:

- Un riel gris recorre los cinco pasos y encima se dibuja un riel negro cuya altura es
  `scaleY(var(--p))`, donde `--p` sale de cuánto has avanzado leyendo el bloque.
- Cada marcador pasa de círculo vacío a círculo negro relleno cuando su centro cruza la
  línea de lectura, al 62% del alto de la ventana, y su texto sube de opacidad.
- Se movió con `requestAnimationFrame`, no con un `transition` por aparecer, así que
  responde también al subir.

Se agregó un quinto paso, *Handover and after*, porque la secuencia terminaba sin cierre.

Sin JavaScript o con movimiento reducido se ve el riel completo y los cinco pasos
encendidos.

### Animaciones

- Bloques que suben y aparecen con retardo escalonado (`--d`), y fotos que se
  descubren con máscara `clip-path` desde abajo.
- **Parallax** en la foto grande de cada página de proyecto (`data-parallax`).
- El **5.0 cuenta hacia arriba** al entrar en pantalla.
- Subrayado animado en el menú y zoom al pasar sobre las fotos de proyecto.
- Todo con IntersectionObserver y `requestAnimationFrame`, sin librerías. Si el JS no
  corre, la clase `no-js` deja todo visible. Respeta `prefers-reduced-motion`.

## Lo que la maqueta arregla y GoDaddy no puede

El constructor de GoDaddy solo inserta código personalizado **en el cuerpo** de la
página, nunca en el `<head>`. Confirmado en su documentación de ayuda. Eso deja tres
cosas fuera de su alcance, y las tres están resueltas aquí:

1. `twitter:card` en `summary_large_image` en vez de `summary`.
2. `og:image` apuntando a la cocina terminada, no al logo.
3. JSON-LD de `GeneralContractor` con licencia, teléfono, zonas y el 5.0 de Google.

Además: teléfono clicable en el header y en contacto, licencia visible en el pie,
formulario, y `alt` en todas las imágenes (en su sitio 20 de 22 fotos de About Us
no tienen).

---

## Video: el riesgo a vigilar

La liga es de Dropbox con `rlkey` y `raw=1`. Se le quitó el parámetro `st=`, que es un
token de sesión corto. **Si Laura mueve o despublica el archivo, la liga muere.** Por eso
el HTML trae un respaldo: si el video falla o no carga en 9 segundos, lo reemplaza por
la foto de la cocina. El autoplay también puede quedar bloqueado por el navegador, así
que se reintenta al entrar en pantalla y con cualquier gesto del usuario.

Si el trato avanza, el video debe alojarse en el mismo servidor del sitio, no en Dropbox.

---

## Fotos

La maqueta consume las imágenes **desde el CDN de ella** (`img1.wsimg.com`), así que
no hay assets en el repo y siempre muestra su material real.

**Corrección respecto a lo que dije antes:** en la primera pasada solo miré las páginas
de proyecto, que sí son casi puro registro de obra en proceso, y concluí de más que le
faltaban fotos de resultado. **No es cierto.** Su carrusel de portada tiene una docena de
espacios terminados y muy buenos: cocina con isla y lámparas colgantes, comedor con obra
gráfica, tina exenta junto a la alberca, recámara con clóset integrado, baños de azulejo
de patrón. Todas están en la galería de la maqueta.

Lo que sigue siendo cierto y verificado: el `og:image` apunta al archivo del logotipo,
así que nada de ese material aparece cuando comparten su liga.

El **San Juan Hotel** sí es la excepción real: su página de proyecto solo tiene equipo
mecánico y tubería, ninguna foto del resultado. Es el punto 10 del punch list.

### Fotos de personas

**Las 7 del equipo llevan su retrato real.** La asignación se confirmó por el orden del
código de su página About: en su sitio la imagen va justo antes del nombre. Quedó así:

| Persona | Puesto | Archivo |
|---|---|---|
| Laura Cortizo | Founder & Director | `FullSizeRender_VSCO.jpg` |
| Davide Nicco | Business Development | `blob-87c5206.png` |
| Jairo Libreros | Project Manager | `b92931d9-…JPG` |
| Yusmel Martí | Lead Construction Technician | `IMG_3392.JPG` |
| Enrique Moreno | Lead Construction Technician | `133Claudia…-246f42d.jpg` |
| Mariano Ruiz | Art Director | `IMG_4043.JPG` |
| Gaiya | Language Developer | `FullSizeRender (1).jpeg` |

Ojo con `blob-87c5206.png`: el nombre parece de marcador de posición, pero **es una foto
real de Davide**. No lo cambies pensando que es un placeholder.

Enrique, Mariano y Gaiya no estaban en las versiones anteriores de la maqueta. Son parte
de su equipo y ya están.

### Avatares de las reseñas

Son los de Google de cada persona, las mismas URLs de `googleusercontent.com` que sirve
el widget de su sitio. La asignación se verificó igual que la del equipo, por el orden
del código: en el HTML el avatar va justo antes del nombre.

| Reseña | Avatar |
|---|---|
| Leyanis Cabrera | foto real |
| Richele Diaz | foto real |
| Valeria Wardini | inicial de color de Google |
| Eugene Cruz | inicial de color de Google |
| Giovanna Fronduto | inicial de color de Google |

**Tres de los cinco no tienen foto en su cuenta de Google.** Google devuelve un círculo
de color con la inicial y en el sitio de ella se ve exactamente igual. No es un
marcador de posición nuestro.

Las reseñas salen de la más reciente a la más antigua, así el carrusel abre con las dos
que sí tienen foto. Se piden a `s200` para que no se vean suaves en pantallas retina.
Si Google dejara de entregarlas, el JS pone la inicial en su lugar.

Cada tarjeta y el "View all 5 reviews" enlazan a su ficha real:
`https://maps.google.com/maps?cid=8160738004661650355`.

## Protecciones porque es pública

- La página lleva `<meta name="robots" content="noindex, nofollow">`. **No quitarlo.**
  Sin eso, una maqueta con su marca y su texto puede indexarse y competir con su
  sitio real en Google.
- La barra negra de arriba dice, en español y en inglés, que es una maqueta de Vonoa
  y que no es el sitio publicado. **No quitarla** mientras esté en un dominio público.
- El `canonical` apunta a `cortizoconstruction.com`, no a la maqueta.

## Pendiente

- [ ] **Correo**: no lo publica en ningún lado. Quedó como `[ your email address ]` con
      subrayado punteado. No inventar uno.
- [ ] Mandarle las dos ligas y ver si pide llamada.

## Datos de medición del sitio actual (verificados 10-sep-2026)

Ya trae medición montada, no está a ciegas:

- Google Tag Manager `GTM-5H6NCVDL`
- Google Analytics `G-RT76P7DHEJ`
- Meta Pixel `1377330603447203`
