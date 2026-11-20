/* ==========================================================
   IE San Pablo Industrial – Interacciones del sitio
   Para actualizar horarios, cronograma o docentes, edita los
   datos al inicio de cada bloque.
   ========================================================== */

/* ---------- Menú en celular ---------- */
(function () {
  var btn = document.querySelector('.mbtn');
  var links = document.querySelector('.nav .links');
  if (!btn || !links) return;
  btn.addEventListener('click', function () {
    var abierto = links.classList.toggle('open');
    btn.setAttribute('aria-expanded', abierto ? 'true' : 'false');
  });
})();

/* Crea una fila de botones-filtro y avisa cuál se eligió */
function crearPills(contenedor, opciones, inicial, alElegir) {
  contenedor.innerHTML = '';
  opciones.forEach(function (op) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'pill';
    b.textContent = op;
    b.setAttribute('aria-pressed', op === inicial ? 'true' : 'false');
    b.addEventListener('click', function () {
      contenedor.querySelectorAll('.pill').forEach(function (x) { x.setAttribute('aria-pressed', 'false'); });
      b.setAttribute('aria-pressed', 'true');
      alElegir(op);
    });
    contenedor.appendChild(b);
  });
  alElegir(inicial);
}

/* ---------- Horarios por curso (Portal Estudiantes) ---------- */
(function () {
  var cajaSedes = document.getElementById('sedes');
  if (!cajaSedes) return;

  var SEDES = ['Sede principal', 'Diego Luis Córdoba', 'Pueblo Nuevo', 'Eduardo Santos', 'Suruco Carretera'];
  var GRUPOS = ['6A', '6B', '7A', '7B', '8E', '8F', '9A', '9B', '10A', '11A'];
  var X = '[Área]';
  /* EJEMPLO. Reemplazar por los horarios reales: HORARIOS['8E'] = [ ... ] */
  var EJEMPLO = [
    ['7:00 – 7:55', 'Matemáticas', X, X, X, X],
    ['7:55 – 8:50', X, 'Inglés', X, X, X],
    ['8:50 – 9:45', X, X, 'Taller técnico', X, X],
    ['9:45 – 10:15', 'Descanso', 'Descanso', 'Descanso', 'Descanso', 'Descanso'],
    ['10:15 – 11:10', X, X, X, 'Ciencias', X],
    ['11:10 – 12:05', X, X, X, X, 'Ed. física']
  ];
  var HORARIOS = {};

  var estado = { sede: SEDES[0], grupo: '8E' };
  var titulo = document.getElementById('titulo-horario');
  var cuerpo = document.getElementById('cuerpo-horario');

  function pintar() {
    titulo.textContent = 'Grupo ' + estado.grupo + ' · ' + estado.sede + ' · Jornada [mañana]';
    var filas = HORARIOS[estado.grupo] || EJEMPLO;
    cuerpo.innerHTML = '';
    filas.forEach(function (f) {
      var tr = document.createElement('tr');
      if (f[1] === 'Descanso') tr.className = 'descanso';
      f.forEach(function (celda, i) {
        var td = document.createElement('td');
        if (i === 0) { var b = document.createElement('b'); b.textContent = celda; td.appendChild(b); }
        else td.textContent = celda;
        tr.appendChild(td);
      });
      cuerpo.appendChild(tr);
    });
  }
  crearPills(cajaSedes, SEDES, estado.sede, function (s) { estado.sede = s; pintar(); });
  crearPills(document.getElementById('grupos'), GRUPOS, estado.grupo, function (g) { estado.grupo = g; pintar(); });
})();

/* ---------- Cronograma anual ---------- */
(function () {
  var cajaMeses = document.getElementById('meses');
  if (!cajaMeses) return;

  /* Tipos: A = académico, I = institucional, C = comunidad y familias, D = solo docentes */
  var COLOR = { A: '#7A1F2B', I: '#1F5D3A', C: '#8a6400', D: '#3366CC' };
  /* EJEMPLO. Reemplazar por el cronograma oficial: [tipo, día, actividad, detalle] */
  var CRONOGRAMA = {
    'Enero': [['I', '[DD]', 'Semana de desarrollo institucional', 'Docentes y directivos · todas las sedes'], ['D', '[DD]', 'Entrega de planeación anual', 'Coordinación académica']],
    'Febrero': [['A', '[DD]', 'Inicio de clases', 'Todas las sedes'], ['C', '[DD]', 'Reunión general de padres de familia', 'Sede principal']],
    'Marzo': [['I', '[DD]', 'Elección de personero y contralor estudiantil', 'Gobierno escolar'], ['C', '[DD]', 'Conformación del consejo de padres', 'Asamblea de padres'], ['D', '[DD]', 'Comité de evaluación y promoción', 'Docentes']],
    'Abril': [['I', '[DD]', 'Semana Santa (receso)', 'Sin clases'], ['A', '[DD]', 'Cierre del primer periodo', 'Registro de notas en EducaCity'], ['C', '[DD]', 'Día del Idioma', 'Actividades culturales']],
    'Mayo': [['C', '[DD]', 'Entrega de informes del primer periodo', 'Todas las sedes'], ['C', '[DD]', 'Día del Maestro', 'Comunidad educativa'], ['C', '21', 'Día de la Afrocolombianidad', 'Actos culturales']],
    'Junio': [['A', '[DD]', 'Cierre del segundo periodo', 'Registro de notas en EducaCity'], ['I', '[DD]', 'Vacaciones de mitad de año', 'Sin clases']],
    'Julio': [['C', '[DD]', 'Entrega de informes del segundo periodo', 'Todas las sedes'], ['I', '[DD]', 'Regreso a clases', 'Todas las sedes']],
    'Agosto': [['A', '[DD]', 'Pruebas Saber 11', 'Estudiantes de grado 11 · [fecha ICFES]'], ['A', '[DD]', 'Simulacros de preparación', 'Grados 10 y 11']],
    'Septiembre': [['A', '[DD]', 'Cierre del tercer periodo', 'Registro de notas en EducaCity'], ['I', '[DD]', '[Actividad institucional]', '[Sede · responsable]']],
    'Octubre': [['C', '[DD]', 'Muestra técnica de talleres', 'Especialidades técnicas · sede principal'], ['I', '[DD]', 'Receso estudiantil', 'Sin clases']],
    'Noviembre': [['A', '[DD]', 'Cierre del cuarto periodo y recuperaciones', 'Actividades de recuperación'], ['C', '[DD]', 'Ceremonia de grados', 'Bachilleres técnicos y académicos']]
  };

  var titulo = document.getElementById('titulo-mes');
  var lista = document.getElementById('lista-eventos');
  function pintar(mes) {
    titulo.textContent = mes;
    lista.innerHTML = '';
    (CRONOGRAMA[mes] || []).forEach(function (e) {
      var item = document.createElement('div');
      item.className = 'item-evento';
      var f = document.createElement('div');
      f.className = 'fecha'; f.style.background = COLOR[e[0]]; f.textContent = e[1];
      var t = document.createElement('div');
      var b = document.createElement('b'); b.textContent = e[2]; b.style.fontSize = '17px';
      var d = document.createElement('div'); d.className = 'muted small'; d.textContent = e[3];
      t.appendChild(b); t.appendChild(d);
      item.appendChild(f); item.appendChild(t);
      lista.appendChild(item);
    });
  }
  var mesActual = new Date().toLocaleString('es-CO', { month: 'long' });
  mesActual = mesActual.charAt(0).toUpperCase() + mesActual.slice(1);
  crearPills(cajaMeses, Object.keys(CRONOGRAMA), CRONOGRAMA[mesActual] ? mesActual : 'Febrero', pintar);
})();

/* ---------- Nuestros docentes ---------- */
(function () {
  var cajaAreas = document.getElementById('areas');
  if (!cajaAreas) return;

  /* Reemplazar por la planta real: [nombre, área, sede o especialidad, formación, foto] */
  var DOCENTES = [
    ['[Nombre del docente]', 'Matemáticas', 'Sede principal · Secundaria', '[Formación profesional]', ''],
    ['[Nombre del docente]', 'Matemáticas', 'Sede principal · Media', '[Formación profesional]', ''],
    ['[Nombre del docente]', 'Lengua castellana', 'Sede principal · Secundaria', '[Formación profesional]', ''],
    ['[Nombre del docente]', 'Inglés', 'Sede principal · Media', '[Formación profesional]', ''],
    ['[Nombre del docente]', 'Ciencias naturales', 'Sede principal · Secundaria', '[Formación profesional]', ''],
    ['[Nombre del docente]', 'Ciencias sociales', 'Sede principal · Secundaria', '[Formación profesional]', ''],
    ['[Nombre del docente]', 'Talleres técnicos', 'Mecánica Industrial', '[Formación profesional]', ''],
    ['[Nombre del docente]', 'Talleres técnicos', 'Electricidad y Electrónica', '[Formación profesional]', ''],
    ['[Nombre del docente]', 'Talleres técnicos', 'Dibujo y Construcciones Civiles', '[Formación profesional]', ''],
    ['[Nombre del docente]', 'Talleres técnicos', 'Ebanistería', '[Formación profesional]', ''],
    ['[Nombre del docente]', 'Talleres técnicos', 'Corte y Confección', '[Formación profesional]', ''],
    ['[Nombre del docente]', 'Primaria', 'Escuela Pueblo Nuevo', '[Formación profesional]', ''],
    ['[Nombre del docente]', 'Primaria', 'Escuela Diego Luis Córdoba', '[Formación profesional]', ''],
    ['[Nombre del docente]', 'Primaria', 'Escuela Eduardo Santos', '[Formación profesional]', ''],
    ['[Nombre del docente]', 'Primaria', 'Escuela rural Suruco Carretera', '[Formación profesional]', '']
  ];
  var AREAS = ['Todas', 'Matemáticas', 'Lengua castellana', 'Inglés', 'Ciencias naturales', 'Ciencias sociales', 'Talleres técnicos', 'Primaria'];
  var COLOR = { 'Talleres técnicos': '#1F5D3A', 'Primaria': '#8a6400' };

  var grilla = document.getElementById('grilla-docentes');
  var rotulo = document.getElementById('area-actual');
  function pintar(area) {
    rotulo.textContent = area;
    grilla.innerHTML = '';
    DOCENTES.filter(function (d) { return area === 'Todas' || d[1] === area; }).forEach(function (d) {
      var art = document.createElement('article'); art.className = 'docente';
      var foto;
      if (d[4]) { foto = document.createElement('img'); foto.src = d[4]; foto.alt = d[0]; foto.style.aspectRatio = '1/1'; foto.style.objectFit = 'cover'; }
      else { foto = document.createElement('div'); foto.className = 'foto-ph'; foto.textContent = '[Foto del docente]'; }
      var info = document.createElement('div'); info.className = 'info';
      var et = document.createElement('div'); et.className = 'etiqueta'; et.textContent = d[1]; if (COLOR[d[1]]) et.style.color = COLOR[d[1]];
      var n = document.createElement('b'); n.textContent = d[0]; n.style.display = 'block'; n.style.fontSize = '18px'; n.style.marginTop = '8px';
      var s = document.createElement('div'); s.className = 'muted'; s.style.fontSize = '14px'; s.textContent = d[2];
      var fo = document.createElement('div'); fo.className = 'muted'; fo.style.fontSize = '14px'; fo.textContent = d[3];
      info.appendChild(et); info.appendChild(n); info.appendChild(s); info.appendChild(fo);
      art.appendChild(foto); art.appendChild(info);
      grilla.appendChild(art);
    });
  }
  crearPills(cajaAreas, AREAS, 'Todas', pintar);
})();
