# Cortizo Construction — maqueta de portada

Maqueta de rediseño de la portada de [cortizoconstruction.com](https://cortizoconstruction.com),
preparada por **Vonoa Web** para Cortizo Construction LLC (Miami, FL).

**No es el sitio publicado.** Es una demostración.

Ver: https://vonoaweb.github.io/cortizo-demo/

## Paginas

Sitio de varias paginas, con la misma navegacion del sitio real:

| Pagina | Archivo |
|---|---|
| Home | `index.html` |
| Services | `services.html` |
| Projects | `projects.html` |
| About us | `about.html` |
| Contact | `contact.html` |
| Casa Bohemia | `casa-bohemia.html` |
| Rodriguez Residence | `rodriguez-residence.html` |
| The Bernal Residence | `the-bernal-residence.html` |
| Matheson Residence | `matheson-residence.html` |
| San Juan Hotel | `san-juan-hotel.html` |

Estilos y comportamiento compartidos en `assets/styles.css` y `assets/site.js`.

## Qué demuestra

Respeta el estilo de marca del sitio actual (Lato + Cabin, blanco y negro, composición
centrada, el video de intro propio) y además resuelve lo que el constructor de
GoDaddy Websites + Marketing no permite tocar, porque solo inserta código en el
cuerpo de la página y nunca en el `<head>`:

- `<title>` descriptivo en vez de "Home"
- `twitter:card` en `summary_large_image`
- `og:image` apuntando a una obra terminada, no al logo
- Datos estructurados JSON-LD de `GeneralContractor` con licencia CGC1535571,
  teléfono, zonas de servicio y calificación

Además: teléfono clicable, licencia visible, formulario de contacto, texto alternativo
en todas las imágenes y animaciones al hacer scroll.

Las fotografías y los gráficos de marca se cargan desde el CDN del propio cliente y
son de su propiedad. La página lleva `noindex` para no competir con su sitio real.
