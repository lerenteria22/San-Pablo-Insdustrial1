# Sitio web – Institución Educativa San Pablo Industrial (Istmina, Chocó)

Boceto del sitio oficial del colegio. Es un sitio **estático** (HTML + CSS + JavaScript), sin bases de datos ni programas que instalar. Se adapta solo a celular, tableta y computador.

## Páginas

| Archivo | Página |
|---|---|
| `index.html` | Inicio: accesos rápidos, perfiles, noticias, eventos y oferta |
| `portal-estudiantes.html` | Portal Estudiantes y familias: horarios, calificaciones, formatos, SIEE y rutas de atención |
| `portal-docentes.html` | Portal Docentes: EducaCity, Humano, FOMAG, formatos y documentos |
| `nuestros-docentes.html` | Presentación pública de directivos y planta docente |
| `cronograma.html` | Cronograma anual por meses |

```
assets/css/styles.css   → colores, tipografía y diseño (celular al final del archivo)
assets/js/main.js       → menú del celular y datos de horarios, cronograma y docentes
assets/img/             → escudo y foto de la sede (reemplazar por fotos en alta)
```

## Publicarlo gratis con GitHub Pages

1. Crea una cuenta en <https://github.com> (si no tienes).
2. Botón **New repository** → nombre, por ejemplo `sanpabloindustrial` → **Public** → **Create repository**.
3. En el repositorio: **Add file → Upload files**, arrastra **todo el contenido de esta carpeta** (no la carpeta, su contenido: `index.html`, `assets`, etc.) y pulsa **Commit changes**.
4. Ve a **Settings → Pages**. En *Source* elige **Deploy from a branch**, rama **main**, carpeta **/ (root)** → **Save**.
5. En uno o dos minutos el sitio queda en `https://TU-USUARIO.github.io/sanpabloindustrial/`. Ese es el enlace para enviar a los profesores.

Más adelante, con el dominio `.edu.co` (por ejemplo `iesanpabloindustrial-istmina-choco.edu.co`), se configura en **Settings → Pages → Custom domain**.

## Cómo actualizar contenido

- **Textos, enlaces y documentos:** abrir el `.html` correspondiente (se puede editar directamente en GitHub con el lápiz ✏️) y cambiar el texto. Los datos pendientes están entre `[corchetes]`.
- **Formatos y PDF:** subirlos a una carpeta `documentos/` y cambiar el `href="#"` del enlace por `documentos/nombre-del-archivo.pdf`.
- **Horarios, cronograma y docentes:** están al inicio de cada bloque en `assets/js/main.js` (constantes `HORARIOS`, `CRONOGRAMA` y `DOCENTES`).
- **Aviso amarillo de "versión de prueba":** borrar la línea marcada con `AVISO DE BOCETO` en cada página al publicar la versión final.

## Información pendiente

- Horario de atención, redes sociales y correo institucional (se sugiere uno con dominio `.edu.co`).
- Nombres, formación y fotos de coordinadores, orientación y docentes (con autorización).
- Horarios reales por grupo y sede; cronograma oficial del año.
- PDF de formatos (excusa, permisos, certificados), manual, SIEE, PEI y rutas de atención.
- Fotos en buena resolución de la fachada, talleres y actividades.

### Datos que se contradicen entre documentos (aclarar antes de publicar)

- Código ICFES: 009647 (PEI y SIEE) vs. 009547 (manual de convivencia). En el sitio está 009647.
- Resolución de la modalidad técnica: 18572 de 1985 (PEI y SIEE) vs. 1989 (manual).
- Número de sedes: el PEI menciona 5, 6 y 7 (incluye Peradó).
