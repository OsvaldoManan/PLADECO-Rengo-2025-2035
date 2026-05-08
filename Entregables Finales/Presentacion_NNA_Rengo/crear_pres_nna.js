// =====================================================================
// PRESENTACION PARA NNA - COMUNA DE RENGO
// PLADECO 2025-2035 + Diagnostico Comunal de Infancia 2025
// =====================================================================
const pptxgen = require('pptxgenjs');
const path = require('path');

const OUT = 'C:\\Users\\Osvaldo\\OneDrive\\Escritorio\\Proceso Final PLADECO\\Entregables Finales\\Presentacion_NNA_Rengo\\Presentacion_NNA_Rengo_2025-2035.pptx';

// ===== PALETA: warm + institutional =====
const C = {
  navy:    '1B3A6B',    // institucional PLADECO
  navyDk:  '0F2447',
  coral:   'FF6B6B',    // energía / NNA
  teal:    '4ECDC4',    // turquesa
  yellow:  'FFD93D',    // accent amarillo
  green:   '6BCB77',    // verde menta
  purple:  '8E44AD',
  orange:  'FF9F1C',
  cream:   'FFF9F4',    // fondo crema cálido
  gray:    '6C757D',
  grayLt:  'E9ECEF',
  white:   'FFFFFF',
  dark:    '2C2C2C',
};

const FONT_HEAD = 'Trebuchet MS';
const FONT_BODY = 'Calibri';

const pres = new pptxgen();
pres.layout = 'LAYOUT_WIDE';   // 13.33 x 7.5 inches
pres.title = 'Tu voz construye Rengo - PLADECO 2025-2035';
pres.author = 'I. Municipalidad de Rengo - SECPLA + OLN';
pres.company = 'I. Municipalidad de Rengo';

const W = 13.33, H = 7.5;

// ============================================================
// HELPERS
// ============================================================
function bgCream(s) {
  s.background = { color: C.cream };
}

function bgNavy(s) {
  s.background = { color: C.navy };
}

function addHeader(slide, sectionLabel, sectionColor) {
  // Pildora superior con sección - ancho 2.7 para evitar wrap
  slide.addShape('roundRect', {
    x: 0.4, y: 0.32, w: 2.7, h: 0.32,
    fill: { color: sectionColor || C.coral },
    line: { color: sectionColor || C.coral },
    rectRadius: 0.16,
  });
  slide.addText(sectionLabel, {
    x: 0.4, y: 0.32, w: 2.7, h: 0.32,
    fontFace: FONT_HEAD, fontSize: 9, bold: true, color: C.white,
    align: 'center', valign: 'middle',
  });
  // Footer institucional
  slide.addText('I. MUNICIPALIDAD DE RENGO  ·  PLADECO 2025-2035  ·  Oficina Local de la Niñez',
    { x: 0.4, y: 7.05, w: 9, h: 0.3,
      fontFace: FONT_BODY, fontSize: 8, italic: true, color: C.gray, align: 'left' });
  // Logo sigla
  slide.addText('Rengo · 2026', {
    x: 11.0, y: 7.05, w: 1.93, h: 0.3,
    fontFace: FONT_BODY, fontSize: 8, italic: true, color: C.gray, align: 'right' });
}

function addTitle(slide, text, color) {
  slide.addText(text, {
    x: 0.4, y: 0.85, w: 12.5, h: 0.85,
    fontFace: FONT_HEAD, fontSize: 32, bold: true,
    color: color || C.navy, align: 'left', valign: 'top',
  });
}

function addSubtitle(slide, text) {
  slide.addText(text, {
    x: 0.4, y: 1.65, w: 12.5, h: 0.4,
    fontFace: FONT_BODY, fontSize: 14, italic: true,
    color: C.gray, align: 'left',
  });
}

function dot(slide, x, y, color, r) {
  slide.addShape('ellipse', {
    x: x, y: y, w: r||0.18, h: r||0.18,
    fill: { color: color },
    line: { color: color },
  });
}

function bigStat(slide, x, y, w, value, label, color) {
  slide.addShape('roundRect', {
    x: x, y: y, w: w, h: 1.7,
    fill: { color: C.white },
    line: { color: color, width: 1.5 },
    rectRadius: 0.1,
  });
  slide.addText(value, {
    x: x, y: y + 0.15, w: w, h: 0.85,
    fontFace: FONT_HEAD, fontSize: 36, bold: true, color: color,
    align: 'center', valign: 'middle',
  });
  slide.addText(label, {
    x: x + 0.15, y: y + 1.05, w: w - 0.3, h: 0.55,
    fontFace: FONT_BODY, fontSize: 11, color: C.dark,
    align: 'center', valign: 'top',
  });
}

function iconCircle(slide, x, y, r, bgColor, char) {
  slide.addShape('ellipse', {
    x: x, y: y, w: r, h: r,
    fill: { color: bgColor }, line: { color: bgColor },
  });
  slide.addText(char, {
    x: x, y: y, w: r, h: r,
    fontFace: FONT_HEAD, fontSize: r * 30, bold: true, color: C.white,
    align: 'center', valign: 'middle',
  });
}

// ============================================================
// SLIDE 1 — PORTADA
// ============================================================
{
  const s = pres.addSlide(); bgNavy(s);

  // banda decorativa diagonal
  s.addShape('rect', { x: 0, y: 0, w: W, h: 0.7, fill: { color: C.coral }, line: { color: C.coral } });
  s.addShape('rect', { x: 0, y: 6.8, w: W, h: 0.7, fill: { color: C.teal }, line: { color: C.teal } });

  // Logo institucional
  s.addText('ILUSTRE MUNICIPALIDAD DE RENGO', {
    x: 0.4, y: 0.15, w: 12.5, h: 0.4,
    fontFace: FONT_HEAD, fontSize: 13, bold: true, color: C.white, align: 'center',
  });

  // Etiqueta
  s.addText('PLADECO 2025-2035  ·  Oficina Local de la Niñez', {
    x: 0.4, y: 1.0, w: 12.5, h: 0.4,
    fontFace: FONT_BODY, fontSize: 14, italic: true, color: C.yellow, align: 'center',
  });

  // Título principal
  s.addText('TU VOZ CONSTRUYE\nRENGO', {
    x: 0.4, y: 1.7, w: 12.5, h: 2.3,
    fontFace: FONT_HEAD, fontSize: 70, bold: true, color: C.white, align: 'center',
    lineSpacing: 70,
  });

  // Subtitulo
  s.addText('Resultados del Diagnóstico Comunal de Infancia y Adolescencia\ny la visión de Rengo al 2035',
    { x: 0.4, y: 4.2, w: 12.5, h: 0.85,
      fontFace: FONT_BODY, fontSize: 18, color: C.cream, align: 'center', italic: true });

  // Cifras hero
  const yK = 5.3;
  const stats = [
    { v: '15.106', l: 'NIÑOS, NIÑAS Y ADOLESCENTES', c: C.coral },
    { v: '4.036',  l: 'OPINIONES RECOGIDAS', c: C.yellow },
    { v: '23%',    l: 'DE LA POBLACIÓN COMUNAL', c: C.teal },
    { v: '21',     l: 'LOCALIDADES DEL TERRITORIO', c: C.green },
  ];
  stats.forEach((st, i) => {
    const x = 0.6 + i * 3.05;
    s.addShape('roundRect', { x: x, y: yK, w: 2.8, h: 1.25,
      fill: { color: C.navyDk }, line: { color: st.c, width: 2 }, rectRadius: 0.1 });
    s.addText(st.v, { x: x, y: yK + 0.05, w: 2.8, h: 0.7,
      fontFace: FONT_HEAD, fontSize: 38, bold: true, color: st.c, align: 'center' });
    s.addText(st.l, { x: x + 0.1, y: yK + 0.78, w: 2.6, h: 0.4,
      fontFace: FONT_BODY, fontSize: 9, bold: true, color: C.white, align: 'center' });
  });

  // Pie portada
  s.addText('Presentación al Consejo Consultivo Comunal de NNA  ·  Abril 2026', {
    x: 0.4, y: 6.95, w: 12.5, h: 0.4,
    fontFace: FONT_BODY, fontSize: 11, italic: true, color: C.white, align: 'center' });
}

// ============================================================
// SLIDE 2 — AGENDA
// ============================================================
{
  const s = pres.addSlide(); bgCream(s);
  addHeader(s, 'AGENDA', C.coral);
  addTitle(s, '¿De qué vamos a conversar hoy?', C.navy);
  addSubtitle(s, 'Cuatro miradas sobre Rengo: nuestro presente, nuestras voces y nuestro futuro');

  const items = [
    { n: '01', t: 'RENGO HOY', d: 'Quiénes somos, dónde vivimos, cómo es nuestra comuna', c: C.coral, ic: '◉' },
    { n: '02', t: 'LO QUE OPINAN LOS NNA', d: '4.036 voces sobre derechos, participación, seguridad y bienestar', c: C.teal, ic: '◑' },
    { n: '03', t: 'PLADECO 2025-2035', d: 'El plan que construimos para los próximos 10 años de Rengo', c: C.yellow, ic: '◐' },
    { n: '04', t: 'PROYECCIÓN AL 2035', d: 'La comuna que soñamos: visión, compromisos y desafíos', c: C.green, ic: '◯' },
  ];
  const startY = 2.4;
  items.forEach((it, i) => {
    const y = startY + i * 1.05;
    // Card
    s.addShape('roundRect', { x: 0.6, y: y, w: 12.1, h: 0.95,
      fill: { color: C.white }, line: { color: it.c, width: 2 }, rectRadius: 0.1 });
    // Number badge
    s.addShape('roundRect', { x: 0.85, y: y + 0.12, w: 0.95, h: 0.7,
      fill: { color: it.c }, line: { color: it.c }, rectRadius: 0.1 });
    s.addText(it.n, { x: 0.85, y: y + 0.12, w: 0.95, h: 0.7,
      fontFace: FONT_HEAD, fontSize: 22, bold: true, color: C.white, align: 'center', valign: 'middle' });
    // Title
    s.addText(it.t, { x: 2.0, y: y + 0.05, w: 6.5, h: 0.45,
      fontFace: FONT_HEAD, fontSize: 16, bold: true, color: C.navy, align: 'left', valign: 'middle' });
    // Description
    s.addText(it.d, { x: 2.0, y: y + 0.45, w: 10.5, h: 0.45,
      fontFace: FONT_BODY, fontSize: 12, color: C.gray, align: 'left', valign: 'top', italic: true });
  });
}

// ============================================================
// SLIDE 3 — RENGO HOY (cifras)
// ============================================================
{
  const s = pres.addSlide(); bgCream(s);
  addHeader(s, '01 · RENGO HOY', C.coral);
  addTitle(s, 'Somos parte de Rengo', C.navy);
  addSubtitle(s, '23 de cada 100 personas que viven en Rengo son niños, niñas o adolescentes');

  // KPIs principales
  const yKpi = 2.5;
  bigStat(s, 0.6, yKpi, 2.95, '66.235', 'Habitantes en Rengo', C.navy);
  bigStat(s, 3.7, yKpi, 2.95, '15.106', 'Niños, niñas y adolescentes', C.coral);
  bigStat(s, 6.8, yKpi, 2.95, '858 km²', 'Extensión territorial', C.teal);
  bigStat(s, 9.9, yKpi, 2.95, '21', 'Unidades vecinales', C.green);

  // Bloque distribución
  s.addShape('roundRect', { x: 0.6, y: 4.55, w: 6.1, h: 2.3,
    fill: { color: C.white }, line: { color: C.navy, width: 1.5 }, rectRadius: 0.1 });
  s.addText('¿CÓMO SOMOS?', { x: 0.85, y: 4.7, w: 5.6, h: 0.4,
    fontFace: FONT_HEAD, fontSize: 14, bold: true, color: C.navy });
  s.addText([
    { text: '7.647 ', options: { bold: true, color: C.coral, fontSize: 18 } },
    { text: 'NNA hombres (51%)\n', options: { fontSize: 12, color: C.dark } },
    { text: '7.459 ', options: { bold: true, color: C.teal, fontSize: 18 } },
    { text: 'NNA mujeres (49%)\n', options: { fontSize: 12, color: C.dark } },
    { text: '1.972 ', options: { bold: true, color: C.purple, fontSize: 18 } },
    { text: 'personas pueblos originarios (Mapuche 89,8%)', options: { fontSize: 12, color: C.dark } },
  ], { x: 0.85, y: 5.15, w: 5.6, h: 1.6, fontFace: FONT_BODY, valign: 'top' });

  // Bloque territorio
  s.addShape('roundRect', { x: 6.9, y: 4.55, w: 5.85, h: 2.3,
    fill: { color: C.white }, line: { color: C.teal, width: 1.5 }, rectRadius: 0.1 });
  s.addText('¿DÓNDE VIVIMOS?', { x: 7.15, y: 4.7, w: 5.4, h: 0.4,
    fontFace: FONT_HEAD, fontSize: 14, bold: true, color: C.teal });
  s.addText([
    { text: '9 unidades vecinales urbanas ', options: { bold: true, color: C.navy, fontSize: 12 } },
    { text: '(Rengo centro, Rosario centro, Rienci...)\n', options: { fontSize: 11, color: C.dark } },
    { text: '12 localidades rurales ', options: { bold: true, color: C.navy, fontSize: 12 } },
    { text: '(Apalta, Naicura, Esmeralda, Chanqueahue...)\n', options: { fontSize: 11, color: C.dark } },
    { text: '\nUna comuna donde lo urbano y lo rural se entrelazan.', options: { italic: true, fontSize: 11, color: C.gray } },
  ], { x: 7.15, y: 5.15, w: 5.4, h: 1.6, fontFace: FONT_BODY, valign: 'top' });
}

// ============================================================
// SLIDE 4 — DISTRIBUCIÓN ETARIA NNA
// ============================================================
{
  const s = pres.addSlide(); bgCream(s);
  addHeader(s, '01 · RENGO HOY', C.coral);
  addTitle(s, 'Los NNA de Rengo, en detalle', C.navy);
  addSubtitle(s, 'Distribución por edad y sexo · Total: 15.106 NNA (0-18 años)');

  // Chart bar nativo
  const dataChart = [
    {
      name: 'Hombres',
      labels: ['0-5 años', '6-9 años', '10-13 años', '14-17 años', '18 años'],
      values: [2030, 1700, 1820, 1750, 347],
    },
    {
      name: 'Mujeres',
      labels: ['0-5 años', '6-9 años', '10-13 años', '14-17 años', '18 años'],
      values: [1980, 1660, 1780, 1710, 329],
    },
  ];

  s.addChart(pres.ChartType.bar, dataChart, {
    x: 0.6, y: 2.4, w: 7.8, h: 4.3,
    barDir: 'col', barGrouping: 'clustered',
    chartColors: [C.coral, C.teal],
    showLegend: true, legendPos: 'b',
    legendFontFace: FONT_BODY, legendFontSize: 11,
    catAxisLabelFontFace: FONT_BODY, catAxisLabelFontSize: 10,
    valAxisLabelFontFace: FONT_BODY, valAxisLabelFontSize: 9,
    showTitle: true, title: 'NNA por tramo etario y sexo',
    titleFontFace: FONT_HEAD, titleFontSize: 14, titleColor: C.navy,
    showValue: false,
    catAxisLabelColor: C.dark,
  });

  // Lateral: contexto + dato
  s.addShape('roundRect', { x: 8.7, y: 2.4, w: 4.05, h: 4.3,
    fill: { color: C.navy }, line: { color: C.navy }, rectRadius: 0.1 });
  s.addText('TENDENCIA NACIONAL', { x: 8.95, y: 2.55, w: 3.55, h: 0.35,
    fontFace: FONT_HEAD, fontSize: 11, bold: true, color: C.yellow });

  s.addText('1,54', { x: 8.95, y: 2.95, w: 3.55, h: 0.85,
    fontFace: FONT_HEAD, fontSize: 56, bold: true, color: C.coral, align: 'center' });
  s.addText('hijos por mujer', { x: 8.95, y: 3.85, w: 3.55, h: 0.4,
    fontFace: FONT_BODY, fontSize: 12, italic: true, color: C.white, align: 'center' });

  s.addText('La población infantil disminuye paulatinamente.\n\nA mayor edad, más NNA en Rengo: hoy hay más adolescentes que niños/as pequeños.\n\nÍndice de Infancia MIDEPLAN: 0,18',
    { x: 8.95, y: 4.4, w: 3.55, h: 2.15,
      fontFace: FONT_BODY, fontSize: 11, color: C.cream, align: 'left', valign: 'top' });
}

// ============================================================
// SLIDE 5 — LA ENCUESTA (PARTE 2)
// ============================================================
{
  const s = pres.addSlide(); bgCream(s);
  addHeader(s, '02 · LO QUE OPINAN LOS NNA', C.teal);
  addTitle(s, 'Escuchamos a 4.036 niños, niñas y adolescentes', C.navy);
  addSubtitle(s, 'La encuesta más grande hecha a NNA en la historia de Rengo');

  // Ficha técnica izquierda
  s.addShape('roundRect', { x: 0.6, y: 2.4, w: 5.5, h: 4.3,
    fill: { color: C.white }, line: { color: C.teal, width: 2 }, rectRadius: 0.1 });
  s.addText('LA ENCUESTA EN NÚMEROS', { x: 0.85, y: 2.55, w: 5.0, h: 0.4,
    fontFace: FONT_HEAD, fontSize: 13, bold: true, color: C.teal });

  const fichaY = 3.05;
  const items = [
    ['4.036', 'estudiantes participaron'],
    ['49,6%', 'cobertura del universo NNA'],
    ['9 a 17 años', 'rango etario consultado'],
    ['27 colegios', 'municipales encuestados'],
    ['+ 21', 'educadoras de párvulos'],
    ['1 focus group', 'intersectorial por eje'],
  ];
  items.forEach((it, i) => {
    const y = fichaY + i * 0.55;
    dot(s, 0.85, y + 0.18, C.coral, 0.15);
    s.addText(it[0], { x: 1.1, y: y, w: 1.65, h: 0.45,
      fontFace: FONT_HEAD, fontSize: 16, bold: true, color: C.navy });
    s.addText(it[1], { x: 2.85, y: y + 0.08, w: 3.0, h: 0.45,
      fontFace: FONT_BODY, fontSize: 11, color: C.dark, italic: true });
  });

  // Derecha: ¿qué les preguntamos?
  s.addShape('roundRect', { x: 6.3, y: 2.4, w: 6.45, h: 4.3,
    fill: { color: C.navy }, line: { color: C.navy }, rectRadius: 0.1 });
  s.addText('¿SOBRE QUÉ LES PREGUNTAMOS?', { x: 6.55, y: 2.55, w: 6.0, h: 0.4,
    fontFace: FONT_HEAD, fontSize: 13, bold: true, color: C.yellow });

  const temas = [
    { c: C.coral,  t: 'Salud y bienestar',     d: 'Salud mental, sexualidad, consumo' },
    { c: C.teal,   t: 'Derechos y participación', d: 'Conocimiento, escucha, espacios' },
    { c: C.yellow, t: 'Seguridad y violencia', d: 'Barrio, hogar, escuela, bullying' },
    { c: C.green,  t: 'Discriminación',         d: 'Causas, lugares, frecuencia' },
    { c: C.orange, t: 'Trabajo infantil',       d: 'Temporada agrícola, horas, edades' },
  ];
  temas.forEach((tm, i) => {
    const y = 3.05 + i * 0.65;
    iconCircle(s, 6.65, y, 0.4, tm.c, '·');
    s.addText(tm.t, { x: 7.2, y: y - 0.02, w: 5.4, h: 0.32,
      fontFace: FONT_HEAD, fontSize: 13, bold: true, color: C.white, valign: 'top' });
    s.addText(tm.d, { x: 7.2, y: y + 0.28, w: 5.4, h: 0.32,
      fontFace: FONT_BODY, fontSize: 10, color: C.cream, italic: true });
  });
}

// ============================================================
// SLIDE 6 — CONOCIMIENTO DE DERECHOS
// ============================================================
{
  const s = pres.addSlide(); bgCream(s);
  addHeader(s, '02 · LO QUE OPINAN LOS NNA', C.teal);
  addTitle(s, '¿Conocemos nuestros derechos?', C.navy);
  addSubtitle(s, 'Resultados de la encuesta a 4.036 NNA · Convención sobre los Derechos del Niño');

  // Donut a la izquierda
  const donutData = [{
    name: 'Conocimiento de Derechos',
    labels: ['Pleno conocimiento', 'Conocimiento parcial', 'No conoce'],
    values: [42.1, 49.4, 8.4],
  }];

  s.addChart(pres.ChartType.doughnut, donutData, {
    x: 0.6, y: 2.4, w: 5.8, h: 4.3,
    chartColors: [C.green, C.yellow, C.coral],
    showLegend: true, legendPos: 'b',
    legendFontFace: FONT_BODY, legendFontSize: 11,
    showTitle: true, title: 'Conocimiento de derechos',
    titleFontFace: FONT_HEAD, titleFontSize: 13, titleColor: C.navy,
    showPercent: true,
    dataLabelColor: C.dark, dataLabelFontFace: FONT_BODY, dataLabelFontSize: 12, dataLabelFontBold: true,
    holeSize: 55,
  });

  // Derecha: lo que más valoran
  s.addShape('roundRect', { x: 6.6, y: 2.4, w: 6.15, h: 1.9,
    fill: { color: C.white }, line: { color: C.coral, width: 2 }, rectRadius: 0.1 });
  s.addText('EL DERECHO MÁS VALORADO POR NOSOTROS', { x: 6.85, y: 2.55, w: 5.65, h: 0.35,
    fontFace: FONT_HEAD, fontSize: 11, bold: true, color: C.coral });
  s.addText([
    { text: '"Tener una familia"', options: { fontFace: FONT_HEAD, bold: true, fontSize: 28, color: C.navy } },
    { text: '\n31,4% de los NNA lo eligió como su derecho más importante.',
      options: { fontFace: FONT_BODY, fontSize: 12, color: C.dark, italic: true } },
  ], { x: 6.85, y: 2.95, w: 5.65, h: 1.25, valign: 'top' });

  // Temas que les interesan
  s.addShape('roundRect', { x: 6.6, y: 4.4, w: 6.15, h: 2.3,
    fill: { color: C.navy }, line: { color: C.navy }, rectRadius: 0.1 });
  s.addText('TEMAS QUE NOS INTERESAN', { x: 6.85, y: 4.55, w: 5.65, h: 0.35,
    fontFace: FONT_HEAD, fontSize: 11, bold: true, color: C.yellow });
  const temasI = [
    ['Resolución de conflictos familiares', '37,2%', C.coral],
    ['Sexualidad', '30,9%', C.teal],
    ['Participación juvenil', '16,6%', C.yellow],
    ['Multiculturalidad', '15,3%', C.green],
  ];
  temasI.forEach((t, i) => {
    const y = 4.95 + i * 0.4;
    s.addText(t[0], { x: 6.85, y: y, w: 4.25, h: 0.35,
      fontFace: FONT_BODY, fontSize: 11, color: C.white });
    s.addText(t[1], { x: 11.15, y: y, w: 1.5, h: 0.35,
      fontFace: FONT_HEAD, fontSize: 13, bold: true, color: t[2], align: 'right' });
  });
}

// ============================================================
// SLIDE 7 — PARTICIPACIÓN Y ESCUCHA
// ============================================================
{
  const s = pres.addSlide(); bgCream(s);
  addHeader(s, '02 · LO QUE OPINAN LOS NNA', C.teal);
  addTitle(s, '¿Nos escuchan en Rengo?', C.navy);
  addSubtitle(s, 'La participación es un derecho. Esto es lo que pensamos los NNA.');

  // Tres KPI grandes
  const yKpi = 2.4;
  bigStat(s, 0.6, yKpi, 4.0, '71,4%', 'Identifican espacios de participación', C.green);
  bigStat(s, 4.7, yKpi, 4.0, '59,9%', 'Reconocen instancias municipales de escucha', C.teal);
  bigStat(s, 8.8, yKpi, 4.0, '40,1%', 'Considera insuficientes los canales del municipio', C.coral);

  // Bloque ¿Quién nos escucha?
  s.addShape('roundRect', { x: 0.6, y: 4.45, w: 6.0, h: 2.35,
    fill: { color: C.white }, line: { color: C.navy, width: 2 }, rectRadius: 0.1 });
  s.addText('¿QUIÉN NOS ESCUCHA?', { x: 0.85, y: 4.6, w: 5.5, h: 0.4,
    fontFace: FONT_HEAD, fontSize: 13, bold: true, color: C.navy });
  s.addText([
    { text: '53% ', options: { bold: true, fontSize: 16, color: C.green } },
    { text: 'se siente escuchado por su familia\n', options: { fontSize: 12, color: C.dark } },
    { text: '31,5% ', options: { bold: true, fontSize: 16, color: C.teal } },
    { text: 'por sus amigos/as\n', options: { fontSize: 12, color: C.dark } },
    { text: '155 NNA ', options: { bold: true, fontSize: 16, color: C.coral } },
    { text: 'declaran no ser escuchados por nadie',
      options: { fontSize: 12, color: C.dark, italic: true } },
  ], { x: 0.85, y: 5.05, w: 5.5, h: 1.6, fontFace: FONT_BODY, valign: 'top' });

  // CCCNNA
  s.addShape('roundRect', { x: 6.75, y: 4.45, w: 6.0, h: 2.35,
    fill: { color: C.navy }, line: { color: C.navy }, rectRadius: 0.1 });
  s.addText('NUESTRO ESPACIO PROPIO', { x: 7.0, y: 4.6, w: 5.5, h: 0.35,
    fontFace: FONT_HEAD, fontSize: 11, bold: true, color: C.yellow });
  s.addText('Consejo Consultivo Comunal de NNA', { x: 7.0, y: 4.95, w: 5.5, h: 0.5,
    fontFace: FONT_HEAD, fontSize: 18, bold: true, color: C.white });
  s.addText([
    { text: '+16 años ', options: { bold: true, fontSize: 14, color: C.coral } },
    { text: 'de trayectoria  ·  ', options: { fontSize: 12, color: C.cream } },
    { text: '28 ', options: { bold: true, fontSize: 14, color: C.coral } },
    { text: 'integrantes activos\n', options: { fontSize: 12, color: C.cream } },
    { text: 'Plan de trabajo propio y participación en decisiones comunales.',
      options: { fontSize: 11, color: C.cream, italic: true } },
  ], { x: 7.0, y: 5.5, w: 5.5, h: 1.2, fontFace: FONT_BODY, valign: 'top' });
}

// ============================================================
// SLIDE 8 — SEGURIDAD Y VIOLENCIA
// ============================================================
{
  const s = pres.addSlide(); bgCream(s);
  addHeader(s, '02 · LO QUE OPINAN LOS NNA', C.teal);
  addTitle(s, 'Seguridad: ¿dónde nos sentimos a salvo?', C.navy);
  addSubtitle(s, 'Datos sensibles que la comuna debe enfrentar con prioridad');

  // KPIs en 4
  const yKpi = 2.4;
  bigStat(s, 0.6, yKpi, 2.95, '79%', 'Se siente más seguro en su CASA', C.green);
  bigStat(s, 3.7, yKpi, 2.95, '61,9%', 'Identifica el BARRIO como inseguro', C.coral);
  bigStat(s, 6.8, yKpi, 2.95, '24,4%', 'Sufrió alguna forma de violencia', C.orange);
  bigStat(s, 9.9, yKpi, 2.95, '30,1%', 'Bullying (víctima o testigo)', C.purple);

  // Tipos de violencia
  s.addShape('roundRect', { x: 0.6, y: 4.5, w: 6.0, h: 2.3,
    fill: { color: C.white }, line: { color: C.coral, width: 2 }, rectRadius: 0.1 });
  s.addText('TIPOS DE VIOLENCIA SUFRIDA', { x: 0.85, y: 4.65, w: 5.5, h: 0.4,
    fontFace: FONT_HEAD, fontSize: 13, bold: true, color: C.coral });
  const tipos = [
    ['Psicológica', '12,3%', C.coral],
    ['Física',      '9,8%',  C.orange],
    ['Sexual',      '2,1%',  C.purple],
    ['Prefirió no responder', '10,7%', C.gray],
  ];
  tipos.forEach((t, i) => {
    const y = 5.1 + i * 0.4;
    s.addText(t[0], { x: 0.95, y: y, w: 3.2, h: 0.35,
      fontFace: FONT_BODY, fontSize: 12, color: C.dark });
    // Barra
    const widthPct = parseFloat(t[1]) / 12.3 * 1.4;
    s.addShape('rect', { x: 4.2, y: y + 0.1, w: widthPct, h: 0.18,
      fill: { color: t[2] }, line: { color: t[2] } });
    s.addText(t[1], { x: 5.7, y: y, w: 0.85, h: 0.35,
      fontFace: FONT_HEAD, fontSize: 12, bold: true, color: t[2], align: 'right' });
  });

  // Discriminación y trabajo
  s.addShape('roundRect', { x: 6.75, y: 4.5, w: 6.0, h: 2.3,
    fill: { color: C.navy }, line: { color: C.navy }, rectRadius: 0.1 });
  s.addText('TAMBIÉN NOS PASA QUE...', { x: 7.0, y: 4.65, w: 5.5, h: 0.35,
    fontFace: FONT_HEAD, fontSize: 11, bold: true, color: C.yellow });
  s.addText([
    { text: '30% ', options: { bold: true, fontSize: 16, color: C.coral } },
    { text: 'sufrió discriminación en el colegio (causa principal: apariencia física, 27,8%)\n\n',
      options: { fontSize: 11, color: C.cream } },
    { text: '33,1% ', options: { bold: true, fontSize: 16, color: C.coral } },
    { text: 'realizó trabajo remunerado, sobre todo en temporada agrícola\n\n',
      options: { fontSize: 11, color: C.cream } },
    { text: '13,5% ', options: { bold: true, fontSize: 16, color: C.coral } },
    { text: 'declaró consumo de sustancias ilícitas',
      options: { fontSize: 11, color: C.cream } },
  ], { x: 7.0, y: 5.05, w: 5.5, h: 1.7, fontFace: FONT_BODY, valign: 'top' });
}

// ============================================================
// SLIDE 9 — EDUCACIÓN
// ============================================================
{
  const s = pres.addSlide(); bgCream(s);
  addHeader(s, '02 · LO QUE OPINAN LOS NNA', C.teal);
  addTitle(s, 'Nuestra educación: los datos', C.navy);
  addSubtitle(s, 'Cobertura escolar por nivel · Comuna de Rengo 2025');

  // Chart de barras horizontales
  const dataEdu = [{
    name: 'Cobertura',
    labels: ['Educación preescolar', 'Educación básica', 'Educación media', 'Ingreso a superior', 'Egreso de superior'],
    values: [47, 95, 76, 20, 15],
  }];

  s.addChart(pres.ChartType.bar, dataEdu, {
    x: 0.6, y: 2.4, w: 7.5, h: 4.3,
    barDir: 'bar',
    chartColors: [C.teal],
    showLegend: false,
    catAxisLabelFontFace: FONT_BODY, catAxisLabelFontSize: 11, catAxisLabelColor: C.navy,
    valAxisLabelFontFace: FONT_BODY, valAxisLabelFontSize: 9,
    valAxisMaxVal: 100,
    showValue: true, dataLabelColor: C.navy, dataLabelFontBold: true, dataLabelFontFace: FONT_BODY, dataLabelFontSize: 11,
    showTitle: true, title: 'Cobertura escolar (% por nivel)',
    titleFontFace: FONT_HEAD, titleFontSize: 14, titleColor: C.navy,
    valAxisLabelFormatCode: '0"%"',
  });

  // Lateral - lectura crítica
  s.addShape('roundRect', { x: 8.3, y: 2.4, w: 4.45, h: 4.3,
    fill: { color: C.navy }, line: { color: C.navy }, rectRadius: 0.1 });
  s.addText('LECTURA CRÍTICA', { x: 8.55, y: 2.55, w: 4.0, h: 0.4,
    fontFace: FONT_HEAD, fontSize: 12, bold: true, color: C.yellow });

  s.addText([
    { text: '95% ', options: { bold: true, fontSize: 22, color: C.green } },
    { text: 'en básica: nuestro mayor logro\n\n', options: { fontSize: 11, color: C.cream } },
    { text: '47% ', options: { bold: true, fontSize: 22, color: C.coral } },
    { text: 'en preescolar: brecha crítica en estimulación temprana\n\n', options: { fontSize: 11, color: C.cream } },
    { text: '15% ', options: { bold: true, fontSize: 22, color: C.coral } },
    { text: 'egreso superior: solo 1 de cada 7 NNA termina sus estudios universitarios\n\n', options: { fontSize: 11, color: C.cream } },
    { text: 'La escolaridad promedio en Rengo (9,5 años) ', options: { italic: true, fontSize: 10, color: C.cream } },
    { text: 'sigue por debajo del promedio nacional (12 años).', options: { italic: true, fontSize: 10, color: C.yellow } },
  ], { x: 8.55, y: 3.0, w: 4.0, h: 3.55, fontFace: FONT_BODY, valign: 'top' });
}

// ============================================================
// SLIDE 10 — SALUD MENTAL (ALERTA)
// ============================================================
{
  const s = pres.addSlide(); bgCream(s);
  addHeader(s, '02 · LO QUE OPINAN LOS NNA', C.teal);
  addTitle(s, 'Salud mental: la brecha más urgente', C.navy);
  addSubtitle(s, 'La principal preocupación detectada por el Diagnóstico Comunal 2025');

  // Bloque alerta principal
  s.addShape('roundRect', { x: 0.6, y: 2.4, w: 12.15, h: 1.5,
    fill: { color: C.coral }, line: { color: C.coral }, rectRadius: 0.15 });
  s.addText('!  ALERTA INSTITUCIONAL', { x: 0.85, y: 2.55, w: 11.65, h: 0.4,
    fontFace: FONT_HEAD, fontSize: 13, bold: true, color: C.white });
  s.addText('Déficit crítico de profesionales especializados, listas de espera extensas y alta rotación interrumpen procesos terapéuticos de los NNA',
    { x: 0.85, y: 3.05, w: 11.65, h: 0.85,
      fontFace: FONT_HEAD, fontSize: 17, bold: true, color: C.white, valign: 'top' });

  // Fila inferior: 3 cards
  const yC = 4.05;
  const cards = [
    { c: C.navy,   t: '74,5%',  l: 'NNA recibió información sobre salud mental (encuesta)', icon: 'i' },
    { c: C.teal,   t: '39,8%',  l: 'consulta primero con la figura materna ante problemas',   icon: '·' },
    { c: C.purple, t: '155',    l: 'NNA declararon no ser escuchados por NADIE',              icon: '!' },
  ];
  cards.forEach((cd, i) => {
    const x = 0.6 + i * 4.07;
    s.addShape('roundRect', { x: x, y: yC, w: 3.85, h: 2.65,
      fill: { color: C.white }, line: { color: cd.c, width: 2 }, rectRadius: 0.1 });
    iconCircle(s, x + 0.3, yC + 0.25, 0.55, cd.c, cd.icon);
    s.addText(cd.t, { x: x + 1.0, y: yC + 0.25, w: 2.7, h: 0.6,
      fontFace: FONT_HEAD, fontSize: 28, bold: true, color: cd.c });
    s.addText(cd.l, { x: x + 0.25, y: yC + 1.0, w: 3.4, h: 1.55,
      fontFace: FONT_BODY, fontSize: 12, color: C.dark, valign: 'top' });
  });
}

// ============================================================
// SLIDE 11 — 4 EJES CDN: lo bueno y lo crítico
// ============================================================
{
  const s = pres.addSlide(); bgCream(s);
  addHeader(s, '02 · LO QUE OPINAN LOS NNA', C.teal);
  addTitle(s, 'Nuestros derechos en 4 ejes', C.navy);
  addSubtitle(s, 'Convención sobre los Derechos del Niño · Resumen del Diagnóstico Comunal');

  const ejes = [
    { c: C.coral,  n: 'SUPERVIVENCIA', d: 'Salud, alimentación, vivienda',
      ok: 'Chile Crece Más, red CESFAM',
      ko: 'Salud mental: lista de espera + falta de psicólogos' },
    { c: C.teal,   n: 'DESARROLLO',    d: 'Educación, juego, cultura',
      ok: '95% cobertura básica · Casa de la Cultura',
      ko: 'Solo 47% en preescolar · oferta recreativa centralizada' },
    { c: C.yellow, n: 'PROTECCIÓN',    d: 'Vida libre de violencia',
      ok: 'OLN operando desde dic-2024 · red SPE diversificada',
      ko: '1.182 denuncias VIF en 2024 · 841 NNA en SPE' },
    { c: C.green,  n: 'PARTICIPACIÓN', d: 'Información, opinión, voz',
      ok: 'CCCNNA con +16 años · 71% identifica espacios',
      ko: '40,1% no percibe canales municipales reales' },
  ];

  // Grid 2x2
  ejes.forEach((e, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 0.6 + col * 6.15;
    const y = 2.35 + row * 2.35;

    s.addShape('roundRect', { x: x, y: y, w: 5.95, h: 2.15,
      fill: { color: C.white }, line: { color: e.c, width: 2 }, rectRadius: 0.1 });
    // banda lateral con color
    s.addShape('roundRect', { x: x, y: y, w: 0.4, h: 2.15,
      fill: { color: e.c }, line: { color: e.c }, rectRadius: 0.1 });
    // Título eje
    s.addText(e.n, { x: x + 0.55, y: y + 0.1, w: 3.5, h: 0.4,
      fontFace: FONT_HEAD, fontSize: 16, bold: true, color: C.navy });
    s.addText(e.d, { x: x + 0.55, y: y + 0.5, w: 5.3, h: 0.3,
      fontFace: FONT_BODY, fontSize: 10, italic: true, color: C.gray });
    // OK
    s.addText('+ ', { x: x + 0.55, y: y + 0.85, w: 0.3, h: 0.4,
      fontFace: FONT_HEAD, fontSize: 16, bold: true, color: C.green });
    s.addText(e.ok, { x: x + 0.85, y: y + 0.85, w: 4.95, h: 0.4,
      fontFace: FONT_BODY, fontSize: 11, color: C.dark, valign: 'top' });
    // KO
    s.addText('! ', { x: x + 0.55, y: y + 1.4, w: 0.3, h: 0.4,
      fontFace: FONT_HEAD, fontSize: 16, bold: true, color: C.coral });
    s.addText(e.ko, { x: x + 0.85, y: y + 1.4, w: 4.95, h: 0.65,
      fontFace: FONT_BODY, fontSize: 11, color: C.dark, valign: 'top' });
  });
}

// ============================================================
// SLIDE 12-NEW — ENCUESTA ONLINE NNA: FICHA + PERFIL
// ============================================================
{
  const s = pres.addSlide(); bgCream(s);
  addHeader(s, '02 · ENCUESTA ONLINE NNA', C.purple);
  addTitle(s, 'Encuesta online a NNA · Diagnóstico Participativo', C.navy);
  addSubtitle(s, '21 niños, niñas y adolescentes participaron desde 8 localidades de la comuna');

  // 4 KPIs principales
  const yKpi = 2.4;
  bigStat(s, 0.6, yKpi, 2.95, '21', 'Respondientes en línea', C.purple);
  bigStat(s, 3.7, yKpi, 2.95, '14-18', 'Rango etario predominante (62%)', C.coral);
  bigStat(s, 6.8, yKpi, 2.95, '8', 'Localidades representadas', C.teal);
  bigStat(s, 9.9, yKpi, 2.95, '52% / 48%', 'Hombres / Mujeres', C.green);

  // Bloque procedencia
  s.addShape('roundRect', { x: 0.6, y: 4.5, w: 6.0, h: 2.3,
    fill: { color: C.white }, line: { color: C.purple, width: 2 }, rectRadius: 0.1 });
  s.addText('¿DE DÓNDE VIENEN?', { x: 0.85, y: 4.65, w: 5.5, h: 0.4,
    fontFace: FONT_HEAD, fontSize: 13, bold: true, color: C.purple });
  const locs = [
    ['Rengo Urbano', '43%', C.coral],
    ['Chanqueahue', '14%', C.teal],
    ['Rosario',      '14%', C.yellow],
    ['Esmeralda',    '10%', C.green],
    ['Otras (Portezuelo, Los Gomeros, Lo de Lobo…)', '19%', C.purple],
  ];
  locs.forEach((l, i) => {
    const y = 5.05 + i * 0.32;
    s.addText(l[0], { x: 0.95, y: y, w: 4.15, h: 0.3,
      fontFace: FONT_BODY, fontSize: 11, color: C.dark });
    s.addText(l[1], { x: 5.2, y: y, w: 1.3, h: 0.3,
      fontFace: FONT_HEAD, fontSize: 12, bold: true, color: l[2], align: 'right' });
  });

  // Bloque colegios
  s.addShape('roundRect', { x: 6.75, y: 4.5, w: 6.0, h: 2.3,
    fill: { color: C.navy }, line: { color: C.navy }, rectRadius: 0.1 });
  s.addText('¿DE QUÉ COLEGIOS?', { x: 7.0, y: 4.65, w: 5.5, h: 0.35,
    fontFace: FONT_HEAD, fontSize: 11, bold: true, color: C.yellow });
  s.addText([
    { text: 'Liceo Luis Urbina Flores ',  options: { bold: true, fontSize: 12, color: C.coral } },
    { text: '33%\n', options: { fontSize: 11, color: C.cream } },
    { text: 'Esc. Vicente Huidobro ',     options: { bold: true, fontSize: 12, color: C.teal } },
    { text: '14%  ·  ', options: { fontSize: 11, color: C.cream } },
    { text: 'Liceo Bicentenario Oriente ', options: { bold: true, fontSize: 12, color: C.yellow } },
    { text: '14%\n', options: { fontSize: 11, color: C.cream } },
    { text: 'Liceo Industrial ',          options: { bold: true, fontSize: 12, color: C.green } },
    { text: '10%\n\n', options: { fontSize: 11, color: C.cream } },
    { text: 'Y 7 establecimientos más representados (1 NNA por colegio).',
      options: { fontSize: 11, color: C.cream, italic: true } },
  ], { x: 7.0, y: 5.05, w: 5.5, h: 1.7, fontFace: FONT_BODY, valign: 'top' });
}

// ============================================================
// SLIDE 13-NEW — PRIORIDADES DE NNA PARA PLADECO + IDENTIDAD
// ============================================================
{
  const s = pres.addSlide(); bgCream(s);
  addHeader(s, '02 · ENCUESTA ONLINE NNA', C.purple);
  addTitle(s, '¿Qué priorizan los NNA para el PLADECO?', C.navy);
  addSubtitle(s, 'Las cinco áreas más mencionadas por los NNA encuestados online');

  // Bar chart con prioridades
  const dataPrio = [{
    name: '% NNA',
    labels: ['Salud y bienestar', 'Cultura', 'Deporte y recreación',
              'Seguridad pública', 'Medio ambiente', 'Educación'],
    values: [57, 52, 52, 48, 38, 24],
  }];

  s.addChart(pres.ChartType.bar, dataPrio, {
    x: 0.6, y: 2.4, w: 7.5, h: 4.3,
    barDir: 'bar',
    chartColors: [C.purple],
    showLegend: false,
    catAxisLabelFontFace: FONT_BODY, catAxisLabelFontSize: 11, catAxisLabelColor: C.navy,
    valAxisLabelFontFace: FONT_BODY, valAxisLabelFontSize: 9,
    valAxisMaxVal: 70, valAxisMinVal: 0,
    showValue: true, dataLabelColor: C.navy, dataLabelFontBold: true,
    dataLabelFontFace: FONT_BODY, dataLabelFontSize: 11,
    showTitle: true, title: '% de NNA que priorizan cada área',
    titleFontFace: FONT_HEAD, titleFontSize: 13, titleColor: C.navy,
    valAxisLabelFormatCode: '0"%"',
  });

  // Lateral - identidad y escucha
  s.addShape('roundRect', { x: 8.3, y: 2.4, w: 4.45, h: 2.05,
    fill: { color: C.white }, line: { color: C.purple, width: 2 }, rectRadius: 0.1 });
  s.addText('IDENTIDAD LOCAL', { x: 8.55, y: 2.5, w: 4.0, h: 0.35,
    fontFace: FONT_HEAD, fontSize: 11, bold: true, color: C.purple });
  s.addText('48%', { x: 8.55, y: 2.85, w: 4.0, h: 0.7,
    fontFace: FONT_HEAD, fontSize: 36, bold: true, color: C.purple, align: 'center' });
  s.addText('siente identidad local FUERTE\npero 33% responde "no lo sé"',
    { x: 8.55, y: 3.55, w: 4.0, h: 0.85,
      fontFace: FONT_BODY, fontSize: 11, color: C.dark, align: 'center', italic: true });

  // Bloque escucha
  s.addShape('roundRect', { x: 8.3, y: 4.6, w: 4.45, h: 2.1,
    fill: { color: C.navy }, line: { color: C.navy }, rectRadius: 0.1 });
  s.addText('¿NOS ESCUCHAN LOS ADULTOS?', { x: 8.55, y: 4.75, w: 4.0, h: 0.35,
    fontFace: FONT_HEAD, fontSize: 10, bold: true, color: C.yellow });
  s.addText('67%', { x: 8.55, y: 5.1, w: 4.0, h: 0.7,
    fontFace: FONT_HEAD, fontSize: 36, bold: true, color: C.yellow, align: 'center' });
  s.addText('responde "A VECES"\nSolo 24% siente escucha permanente',
    { x: 8.55, y: 5.85, w: 4.0, h: 0.8,
      fontFace: FONT_BODY, fontSize: 11, color: C.cream, align: 'center', italic: true });
}

// ============================================================
// SLIDE 14-NEW — VIOLENCIA ESCOLAR + CALIDAD DE VIDA
// ============================================================
{
  const s = pres.addSlide(); bgCream(s);
  addHeader(s, '02 · ENCUESTA ONLINE NNA', C.purple);
  addTitle(s, 'Violencia escolar y calidad de vida en Rengo', C.navy);
  addSubtitle(s, 'Datos sensibles que la encuesta online confirma y profundiza');

  // KPIs alarmantes
  const yKpi = 2.4;
  bigStat(s, 0.6, yKpi, 2.95, '76%', 'Vio o vivió violencia en su colegio', C.coral);
  bigStat(s, 3.7, yKpi, 2.95, '71%', 'Acudiría a profesor/inspector', C.teal);
  bigStat(s, 6.8, yKpi, 2.95, '2.9/5', 'Califica a Rengo como lugar para vivir', C.orange);
  bigStat(s, 9.9, yKpi, 2.95, '38%', 'Inseguridad por consumo alcohol/drogas', C.purple);

  // Tipos de violencia escolar
  s.addShape('roundRect', { x: 0.6, y: 4.5, w: 6.0, h: 2.3,
    fill: { color: C.white }, line: { color: C.coral, width: 2 }, rectRadius: 0.1 });
  s.addText('TIPOS DE VIOLENCIA ESCOLAR (REPORTE ONLINE)', { x: 0.85, y: 4.65, w: 5.5, h: 0.4,
    fontFace: FONT_HEAD, fontSize: 12, bold: true, color: C.coral });
  const tipos = [
    ['Peleas físicas',                '29%', C.coral],
    ['Burlas o acoso verbal',         '24%', C.orange],
    ['Aislamiento o exclusión',       '24%', C.purple],
    ['Ciberacoso (redes sociales)',   '10%', C.teal],
  ];
  tipos.forEach((t, i) => {
    const y = 5.1 + i * 0.4;
    s.addText(t[0], { x: 0.95, y: y, w: 3.4, h: 0.35,
      fontFace: FONT_BODY, fontSize: 12, color: C.dark });
    const widthPct = parseFloat(t[1]) / 30 * 1.4;
    s.addShape('rect', { x: 4.4, y: y + 0.1, w: widthPct, h: 0.18,
      fill: { color: t[2] }, line: { color: t[2] } });
    s.addText(t[1], { x: 5.7, y: y, w: 0.85, h: 0.35,
      fontFace: FONT_HEAD, fontSize: 12, bold: true, color: t[2], align: 'right' });
  });

  // Calidad de vida y cambio temporal
  s.addShape('roundRect', { x: 6.75, y: 4.5, w: 6.0, h: 2.3,
    fill: { color: C.navy }, line: { color: C.navy }, rectRadius: 0.1 });
  s.addText('CÓMO HA CAMBIADO RENGO (PASADO vs HOY)', { x: 7.0, y: 4.65, w: 5.5, h: 0.35,
    fontFace: FONT_HEAD, fontSize: 11, bold: true, color: C.yellow });
  s.addText([
    { text: '52% ', options: { bold: true, fontSize: 22, color: C.yellow } },
    { text: 'siente que el barrio sigue ', options: { fontSize: 12, color: C.cream } },
    { text: 'IGUAL\n', options: { bold: true, fontSize: 14, color: C.coral } },
    { text: '24% ', options: { bold: true, fontSize: 18, color: C.green } },
    { text: 'cambió para mejor  ·  ', options: { fontSize: 12, color: C.cream } },
    { text: '14% ', options: { bold: true, fontSize: 18, color: C.coral } },
    { text: 'para peor\n\n', options: { fontSize: 12, color: C.cream } },
    { text: 'Limpieza barrio: ', options: { fontSize: 12, color: C.cream } },
    { text: '67% aceptable · 24% sucio', options: { italic: true, fontSize: 11, color: C.yellow } },
  ], { x: 7.0, y: 5.05, w: 5.5, h: 1.7, fontFace: FONT_BODY, valign: 'top' });
}

// ============================================================
// SLIDE 15-NEW — 100% QUIERE PARTICIPAR + SUEÑOS + MENSAJES
// ============================================================
{
  const s = pres.addSlide(); bgCream(s);
  addHeader(s, '02 · ENCUESTA ONLINE NNA', C.purple);
  addTitle(s, 'El dato más potente: 100% quiere participar', C.navy);
  addSubtitle(s, 'Los 21 NNA respondieron SÍ a "¿Te gustaría participar en proyectos comunales?"');

  // Hero box
  s.addShape('roundRect', { x: 0.6, y: 2.4, w: 12.15, h: 1.5,
    fill: { color: C.green }, line: { color: C.green }, rectRadius: 0.15 });
  s.addText('100%', { x: 0.6, y: 2.45, w: 3.0, h: 1.4,
    fontFace: FONT_HEAD, fontSize: 70, bold: true, color: C.white, align: 'center', valign: 'middle' });
  s.addText('Quiere participar en proyectos comunales',
    { x: 3.6, y: 2.55, w: 9.0, h: 0.55,
      fontFace: FONT_HEAD, fontSize: 22, bold: true, color: C.white, valign: 'middle' });
  s.addText('43% en su colegio · 33% en la municipalidad · 24% en su barrio',
    { x: 3.6, y: 3.15, w: 9.0, h: 0.5,
      fontFace: FONT_BODY, fontSize: 14, italic: true, color: C.cream, valign: 'middle' });

  // 3 cuadros: sueños, transporte, mensajes
  const yC = 4.05;
  // Sueños
  s.addShape('roundRect', { x: 0.6, y: yC, w: 4.0, h: 2.7,
    fill: { color: C.white }, line: { color: C.coral, width: 2 }, rectRadius: 0.1 });
  s.addText('SUEÑOS PARA RENGO 2035', { x: 0.85, y: yC + 0.1, w: 3.5, h: 0.35,
    fontFace: FONT_HEAD, fontSize: 11, bold: true, color: C.coral });
  s.addText([
    { text: '"Más verde"\n', options: { bold: true, fontSize: 13, color: C.green } },
    { text: '"Más unido"\n', options: { bold: true, fontSize: 13, color: C.coral } },
    { text: '"Más feliz"\n', options: { bold: true, fontSize: 13, color: C.yellow } },
    { text: '"Más moderno"\n', options: { bold: true, fontSize: 13, color: C.teal } },
    { text: '"Más participativo"', options: { bold: true, fontSize: 13, color: C.purple } },
  ], { x: 0.85, y: yC + 0.55, w: 3.5, h: 2.1,
    fontFace: FONT_BODY, valign: 'middle', align: 'center', italic: true });

  // Transporte futuro
  s.addShape('roundRect', { x: 4.7, y: yC, w: 4.0, h: 2.7,
    fill: { color: C.white }, line: { color: C.teal, width: 2 }, rectRadius: 0.1 });
  s.addText('TRANSPORTE QUE SUEÑAN', { x: 4.95, y: yC + 0.1, w: 3.5, h: 0.35,
    fontFace: FONT_HEAD, fontSize: 11, bold: true, color: C.teal });
  s.addText('71%', { x: 4.95, y: yC + 0.5, w: 3.5, h: 0.85,
    fontFace: FONT_HEAD, fontSize: 50, bold: true, color: C.teal, align: 'center' });
  s.addText('Bus gratuito', { x: 4.95, y: yC + 1.4, w: 3.5, h: 0.4,
    fontFace: FONT_HEAD, fontSize: 16, bold: true, color: C.navy, align: 'center' });
  s.addText('14% tren · 10% bici eléctrica', { x: 4.95, y: yC + 1.85, w: 3.5, h: 0.4,
    fontFace: FONT_BODY, fontSize: 11, italic: true, color: C.gray, align: 'center' });
  s.addText('Movilidad pública y sostenible', { x: 4.95, y: yC + 2.25, w: 3.5, h: 0.35,
    fontFace: FONT_BODY, fontSize: 10, italic: true, color: C.dark, align: 'center' });

  // Mensajes al alcalde
  s.addShape('roundRect', { x: 8.8, y: yC, w: 3.95, h: 2.7,
    fill: { color: C.navy }, line: { color: C.navy }, rectRadius: 0.1 });
  s.addText('MENSAJES AL ALCALDE', { x: 9.05, y: yC + 0.1, w: 3.45, h: 0.35,
    fontFace: FONT_HEAD, fontSize: 11, bold: true, color: C.yellow });
  s.addText([
    { text: '"Escuchar a los\njóvenes"\n\n', options: { bold: true, fontSize: 14, color: C.white, italic: true } },
    { text: '"Apoyar proyectos\nescolares"\n\n', options: { bold: true, fontSize: 14, color: C.cream, italic: true } },
    { text: '"Más espacios\npara nosotros"', options: { bold: true, fontSize: 14, color: C.coral, italic: true } },
  ], { x: 9.05, y: yC + 0.5, w: 3.45, h: 2.15,
    fontFace: FONT_BODY, valign: 'middle', align: 'center' });
}

// ============================================================
// SLIDE 12 — PLADECO 2025-2035: 6 EJES
// ============================================================
{
  const s = pres.addSlide(); bgCream(s);
  addHeader(s, '03 · PLADECO 2025-2035', C.yellow);
  addTitle(s, 'El plan que construimos para Rengo', C.navy);
  addSubtitle(s, '6 ejes estratégicos · 32 objetivos · 225 acciones · 200 políticas comunales');

  const ejes = [
    { c: C.coral,  n: '01', t: 'Desarrollo Social y Comunitario',  acc: '54' },
    { c: C.teal,   n: '02', t: 'Desarrollo Económico y Productivo', acc: '18' },
    { c: C.yellow, n: '03', t: 'Ordenamiento Territorial y Medio Ambiente', acc: '14' },
    { c: C.green,  n: '04', t: 'Servicios Públicos e Infraestructura', acc: '51' },
    { c: C.purple, n: '05', t: 'Cultura, Deporte e Identidad Local', acc: '30' },
    { c: C.orange, n: '06', t: 'Gestión Municipal y Gobernanza',     acc: '47' },
  ];

  // Grid 3x2
  ejes.forEach((e, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = 0.6 + col * 4.1;
    const y = 2.35 + row * 2.25;

    s.addShape('roundRect', { x: x, y: y, w: 3.95, h: 2.05,
      fill: { color: C.white }, line: { color: e.c, width: 2 }, rectRadius: 0.1 });
    // numero grande - reducido y caja más ancha para que no se rompa
    s.addText(e.n, { x: x + 0.1, y: y + 0.15, w: 1.3, h: 1.4,
      fontFace: FONT_HEAD, fontSize: 44, bold: true, color: e.c, align: 'center', valign: 'middle' });
    // titulo - desplazado a la derecha del numero
    s.addText(e.t, { x: x + 1.45, y: y + 0.2, w: 2.4, h: 1.2,
      fontFace: FONT_HEAD, fontSize: 13, bold: true, color: C.navy, valign: 'top' });
    // acciones
    s.addShape('roundRect', { x: x + 1.45, y: y + 1.4, w: 2.35, h: 0.5,
      fill: { color: e.c }, line: { color: e.c }, rectRadius: 0.05 });
    s.addText(e.acc + ' acciones', { x: x + 1.45, y: y + 1.4, w: 2.35, h: 0.5,
      fontFace: FONT_HEAD, fontSize: 12, bold: true, color: C.white, align: 'center', valign: 'middle' });
  });
}

// ============================================================
// SLIDE 13 — COMPROMISOS CON LA INFANCIA
// ============================================================
{
  const s = pres.addSlide(); bgCream(s);
  addHeader(s, '03 · PLADECO 2025-2035', C.yellow);
  addTitle(s, 'Compromisos del PLADECO con la infancia', C.navy);
  addSubtitle(s, 'Lo que vamos a hacer por los NNA en los próximos 10 años');

  const compromisos = [
    { c: C.coral, t: 'Salud mental para NNA',
      d: 'Más profesionales, intervención preventiva en colegios, articulación con red regional.' },
    { c: C.teal, t: 'Cobertura preescolar',
      d: 'Subir del 47% al 65% al 2030. Más cupos en jardines de JUNJI, INTEGRA y DAEM.' },
    { c: C.yellow, t: 'Espacios públicos seguros',
      d: 'Recuperar plazas, multicanchas y áreas verdes en todas las localidades urbanas y rurales.' },
    { c: C.green, t: 'Prevención de violencia',
      d: 'Talleres de parentalidad positiva, fortalecimiento OLN-SPE, habilidades blandas en colegios.' },
    { c: C.purple, t: 'Voz protagónica de los NNA',
      d: 'Fortalecer el CCCNNA, abrir mecanismos de consulta juvenil en cada decisión comunal.' },
    { c: C.orange, t: 'Cierre de brecha rural',
      d: 'Conectividad, transporte y equipamiento social en las 12 localidades rurales.' },
  ];

  compromisos.forEach((cm, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 0.6 + col * 6.15;
    const y = 2.35 + row * 1.5;

    s.addShape('roundRect', { x: x, y: y, w: 5.95, h: 1.35,
      fill: { color: C.white }, line: { color: cm.c, width: 1.5 }, rectRadius: 0.1 });
    iconCircle(s, x + 0.2, y + 0.3, 0.7, cm.c, '✓');
    s.addText(cm.t, { x: x + 1.05, y: y + 0.15, w: 4.85, h: 0.35,
      fontFace: FONT_HEAD, fontSize: 13, bold: true, color: C.navy });
    s.addText(cm.d, { x: x + 1.05, y: y + 0.55, w: 4.85, h: 0.75,
      fontFace: FONT_BODY, fontSize: 11, color: C.dark, italic: true, valign: 'top' });
  });
}

// ============================================================
// SLIDE 13B-NEW — COMPROMISOS EN CIFRAS (panorama matriz SUBDERE)
// ============================================================
{
  const s = pres.addSlide(); bgCream(s);
  addHeader(s, '03 · PLADECO 2025-2035', C.yellow);
  addTitle(s, 'Compromisos en cifras: la matriz para NNA', C.navy);
  addSubtitle(s, 'Análisis de la Matriz PLADECO (formato SUBDERE) filtrada por acciones que impactan a la infancia');

  // Hero KPI
  s.addShape('roundRect', { x: 0.6, y: 2.4, w: 12.15, h: 1.4,
    fill: { color: C.navy }, line: { color: C.navy }, rectRadius: 0.15 });
  s.addText('59', { x: 0.6, y: 2.45, w: 2.5, h: 1.3,
    fontFace: FONT_HEAD, fontSize: 60, bold: true, color: C.yellow, align: 'center', valign: 'middle' });
  s.addText('acciones explícitamente orientadas a niños, niñas y adolescentes',
    { x: 3.2, y: 2.55, w: 9.4, h: 0.55,
      fontFace: FONT_HEAD, fontSize: 18, bold: true, color: C.white, valign: 'middle' });
  s.addText('Equivalente al 26% del total de 225 acciones del PLADECO 2025-2035  ·  + 82 acciones adicionales con impacto indirecto en NNA (cultura, deporte, espacio público)',
    { x: 3.2, y: 3.15, w: 9.4, h: 0.55,
      fontFace: FONT_BODY, fontSize: 11, italic: true, color: C.cream, valign: 'middle' });

  // Distribución por plazo (gráfico izquierdo)
  const dataPlazo = [{
    name: 'Acciones',
    labels: ['Corto plazo (2025-2028)', 'Mediano plazo (2028-2032)', 'Largo plazo (2032-2035)'],
    values: [27, 24, 8],
  }];
  s.addChart(pres.ChartType.bar, dataPlazo, {
    x: 0.6, y: 3.95, w: 6.0, h: 2.85,
    barDir: 'col',
    chartColors: [C.coral, C.yellow, C.green],
    chartColorsOpacity: 90,
    showLegend: false,
    catAxisLabelFontFace: FONT_BODY, catAxisLabelFontSize: 10, catAxisLabelColor: C.navy,
    valAxisLabelFontFace: FONT_BODY, valAxisLabelFontSize: 9,
    showValue: true, dataLabelColor: C.navy, dataLabelFontBold: true,
    dataLabelFontFace: FONT_HEAD, dataLabelFontSize: 14,
    showTitle: true, title: 'Cronograma de implementación (N° acciones)',
    titleFontFace: FONT_HEAD, titleFontSize: 12, titleColor: C.navy,
  });

  // Distribución por área programa (panel derecho)
  s.addShape('roundRect', { x: 6.75, y: 3.95, w: 6.0, h: 2.85,
    fill: { color: C.white }, line: { color: C.yellow, width: 2 }, rectRadius: 0.1 });
  s.addText('ÁREAS PROGRAMÁTICAS PRINCIPALES', { x: 7.0, y: 4.05, w: 5.5, h: 0.35,
    fontFace: FONT_HEAD, fontSize: 11, bold: true, color: C.navy });
  const areas = [
    ['Salud, Recreación y Bienestar Social', 18, C.coral],
    ['Cultura y Turismo',                    14, C.teal],
    ['Deportes',                             14, C.green],
    ['Educación y Capacitación',             12, C.yellow],
    ['Seguridad Pública y Espacios Pub.',     8, C.purple],
    ['Innovación y Modernización Municipal',  6, C.orange],
  ];
  areas.forEach((a, i) => {
    const y = 4.45 + i * 0.4;
    s.addText(a[0], { x: 7.0, y: y, w: 4.0, h: 0.35,
      fontFace: FONT_BODY, fontSize: 10, color: C.dark });
    // Barra
    const widthPct = a[1] / 18 * 1.2;
    s.addShape('rect', { x: 11.0, y: y + 0.1, w: widthPct, h: 0.18,
      fill: { color: a[2] }, line: { color: a[2] } });
    s.addText(a[1].toString(), { x: 12.25, y: y, w: 0.45, h: 0.35,
      fontFace: FONT_HEAD, fontSize: 11, bold: true, color: a[2], align: 'right' });
  });
}

// ============================================================
// SLIDE 13C-NEW — ACCIONES ESTRELLA (extraídas de la matriz)
// ============================================================
{
  const s = pres.addSlide(); bgCream(s);
  addHeader(s, '03 · PLADECO 2025-2035', C.yellow);
  addTitle(s, 'Acciones estrella para los NNA', C.navy);
  addSubtitle(s, 'Selección de 6 iniciativas concretas extraídas de la Matriz PLADECO (formato SUBDERE)');

  const acciones = [
    { c: C.coral,  cat: 'SALUD MENTAL', plazo: 'C',
      tit: 'Apoyo Psicológico en Escuelas',
      d: 'Fortalecer dotación de profesionales de salud mental en establecimientos educacionales, programa de detección temprana y derivación oportuna.' },
    { c: C.teal,   cat: 'CONVIVENCIA',  plazo: 'C',
      tit: 'Política Comunal de Convivencia Educativa "Mejor Comunidad"',
      d: 'Estrategia comunal de convivencia escolar, prevención de violencia y mediación. Responde al 76% que vio violencia en colegio.' },
    { c: C.yellow, cat: 'SEGURIDAD',    plazo: 'C',
      tit: 'Programa de Seguridad Digital para Niños y Adolescentes',
      d: 'Educación en seguridad digital en los 32 establecimientos: ciberbullying, grooming, uso responsable de redes sociales.' },
    { c: C.green,  cat: 'DEPORTE',      plazo: 'C',
      tit: 'Escuelas Deportivas de Verano e Invierno',
      d: 'Escuelas municipales para NNA de 6 a 17 años en Rengo Urbano, Rosario y localidades rurales. Fútbol, básquet, atletismo, natación.' },
    { c: C.purple, cat: 'PARENTALIDAD', plazo: 'M',
      tit: 'Escuela Empoderamiento para Padres',
      d: 'Talleres de parentalidad positiva. Responde al diagnóstico: 58,7% de apoderados sin herramientas adecuadas.' },
    { c: C.orange, cat: 'INFRAESTR.',   plazo: 'L',
      tit: 'El Guerrero de Rengo: Complejo Deportivo Multifuncional',
      d: 'Estudio, diseño y postulación de complejo con canchas techadas, gimnasio, piscina temperada, salas multiuso para toda la comunidad.' },
  ];

  acciones.forEach((a, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = 0.6 + col * 4.1;
    const y = 2.4 + row * 2.25;

    s.addShape('roundRect', { x: x, y: y, w: 3.95, h: 2.05,
      fill: { color: C.white }, line: { color: a.c, width: 2 }, rectRadius: 0.1 });
    // Banda superior con categoría
    s.addShape('rect', { x: x, y: y, w: 3.95, h: 0.4,
      fill: { color: a.c }, line: { color: a.c } });
    s.addText(a.cat, { x: x + 0.15, y: y, w: 2.8, h: 0.4,
      fontFace: FONT_HEAD, fontSize: 10, bold: true, color: C.white, valign: 'middle' });
    // Plazo badge
    s.addShape('roundRect', { x: x + 3.1, y: y + 0.07, w: 0.7, h: 0.26,
      fill: { color: C.white }, line: { color: C.white }, rectRadius: 0.05 });
    s.addText(a.plazo, { x: x + 3.1, y: y + 0.07, w: 0.7, h: 0.26,
      fontFace: FONT_HEAD, fontSize: 11, bold: true, color: a.c, align: 'center', valign: 'middle' });
    // Título
    s.addText(a.tit, { x: x + 0.15, y: y + 0.5, w: 3.65, h: 0.7,
      fontFace: FONT_HEAD, fontSize: 12, bold: true, color: C.navy, valign: 'top' });
    // Descripción
    s.addText(a.d, { x: x + 0.15, y: y + 1.2, w: 3.65, h: 0.8,
      fontFace: FONT_BODY, fontSize: 9.5, italic: true, color: C.dark, valign: 'top' });
  });

  // Pie: leyenda C/M/L
  s.addText([
    { text: 'Plazos: ', options: { bold: true, fontSize: 9, color: C.gray } },
    { text: 'C ', options: { bold: true, fontSize: 9, color: C.coral } },
    { text: '= Corto (2025-2028)  ·  ', options: { fontSize: 9, color: C.gray } },
    { text: 'M ', options: { bold: true, fontSize: 9, color: C.yellow } },
    { text: '= Mediano (2028-2032)  ·  ', options: { fontSize: 9, color: C.gray } },
    { text: 'L ', options: { bold: true, fontSize: 9, color: C.green } },
    { text: '= Largo (2032-2035)', options: { fontSize: 9, color: C.gray } },
  ], { x: 0.6, y: 6.85, w: 12.15, h: 0.3, align: 'center', italic: true });
}

// ============================================================
// SLIDE 13D-NEW — RESPONSABLES + FINANCIAMIENTO + INDICADORES
// ============================================================
{
  const s = pres.addSlide(); bgCream(s);
  addHeader(s, '03 · PLADECO 2025-2035', C.yellow);
  addTitle(s, '¿Quién, cómo y con qué? Implementación', C.navy);
  addSubtitle(s, 'Articulación intersectorial y arquitectura financiera de los compromisos NNA');

  // Bloque responsables (izquierda)
  s.addShape('roundRect', { x: 0.6, y: 2.4, w: 6.0, h: 2.5,
    fill: { color: C.white }, line: { color: C.purple, width: 2 }, rectRadius: 0.1 });
  s.addText('RESPONSABLES MUNICIPALES', { x: 0.85, y: 2.5, w: 5.5, h: 0.35,
    fontFace: FONT_HEAD, fontSize: 11, bold: true, color: C.purple });
  const resp = [
    ['SECPLAN + DOM',                       '10', C.navy],
    ['Oficina Turismo + SECPLAN + DIDECO + OLN', '7', C.purple],
    ['Depto. Salud Municipal',                  '5', C.coral],
    ['DAEM (Educación Municipal)',              '4', C.teal],
    ['Depto. Deportes',                         '4', C.green],
    ['DIDECO + OMIL',                           '3', C.orange],
  ];
  resp.forEach((r, i) => {
    const y = 2.95 + i * 0.31;
    s.addText(r[0], { x: 0.95, y: y, w: 4.5, h: 0.3,
      fontFace: FONT_BODY, fontSize: 10.5, color: C.dark });
    s.addText(r[1] + ' acciones', { x: 5.45, y: y, w: 1.05, h: 0.3,
      fontFace: FONT_HEAD, fontSize: 10.5, bold: true, color: r[2], align: 'right' });
  });

  // Bloque financiamiento (derecha)
  s.addShape('roundRect', { x: 6.75, y: 2.4, w: 6.0, h: 2.5,
    fill: { color: C.navy }, line: { color: C.navy }, rectRadius: 0.1 });
  s.addText('FUENTES DE FINANCIAMIENTO', { x: 7.0, y: 2.5, w: 5.5, h: 0.35,
    fontFace: FONT_HEAD, fontSize: 11, bold: true, color: C.yellow });
  const fin = [
    ['Municipal (recursos propios)',         '9', C.yellow],
    ['FNDR + MINVU + Municipal',             '5', C.coral],
    ['Municipal + IND + Privados',           '4', C.teal],
    ['Municipal + MINSAL + Servicio Salud',  '3', C.green],
    ['Municipal + SUBDERE',                  '3', C.orange],
    ['Municipal + SPD + FNDR (Seguridad)',   '3', C.purple],
  ];
  fin.forEach((f, i) => {
    const y = 2.95 + i * 0.31;
    s.addText(f[0], { x: 7.1, y: y, w: 4.5, h: 0.3,
      fontFace: FONT_BODY, fontSize: 10.5, color: C.cream });
    s.addText(f[1] + ' acc.', { x: 11.6, y: y, w: 1.0, h: 0.3,
      fontFace: FONT_HEAD, fontSize: 10.5, bold: true, color: f[2], align: 'right' });
  });

  // Hero metas medibles
  s.addShape('roundRect', { x: 0.6, y: 5.05, w: 12.15, h: 1.75,
    fill: { color: C.coral }, line: { color: C.coral }, rectRadius: 0.15 });
  s.addText('METAS MEDIBLES PARA LA INFANCIA AL 2028 / 2035', {
    x: 0.85, y: 5.15, w: 11.65, h: 0.4,
    fontFace: FONT_HEAD, fontSize: 12, bold: true, color: C.white,
  });
  // 4 metas en columnas
  const metas = [
    ['Cobertura preescolar', '47%', '65%', '75%'],
    ['Apoyo psicosocial escolar', 'Parcial', '32 establ.', '32 establ.'],
    ['Acciones NNA ejecutadas', '0', '27 (corto)', '59 (total)'],
    ['Inversión rural NNA', 'Baja', '+30% anual', '+50% anual'],
  ];
  metas.forEach((m, i) => {
    const x = 0.85 + i * 3.0;
    s.addShape('rect', { x: x, y: 5.65, w: 2.85, h: 1.05,
      fill: { color: C.white }, line: { color: C.white } });
    s.addText(m[0], { x: x + 0.1, y: 5.7, w: 2.65, h: 0.3,
      fontFace: FONT_HEAD, fontSize: 9, bold: true, color: C.coral, align: 'center' });
    s.addText('LB 2024 → 2028 → 2035', { x: x + 0.1, y: 6.0, w: 2.65, h: 0.22,
      fontFace: FONT_BODY, fontSize: 7, italic: true, color: C.gray, align: 'center' });
    s.addText([
      { text: m[1], options: { fontFace: FONT_HEAD, fontSize: 11, bold: true, color: C.gray } },
      { text: '  →  ', options: { fontSize: 10, color: C.gray } },
      { text: m[2], options: { fontFace: FONT_HEAD, fontSize: 12, bold: true, color: C.yellow } },
      { text: '  →  ', options: { fontSize: 10, color: C.gray } },
      { text: m[3], options: { fontFace: FONT_HEAD, fontSize: 13, bold: true, color: C.green } },
    ], { x: x + 0.1, y: 6.25, w: 2.65, h: 0.4, align: 'center', valign: 'middle' });
  });
}

// ============================================================
// SLIDE 14 — PROYECCIÓN AL 2035
// ============================================================
{
  const s = pres.addSlide(); bgNavy(s);

  // Banda decorativa con texto institucional
  s.addShape('rect', { x: 0, y: 0, w: W, h: 0.7, fill: { color: C.coral }, line: { color: C.coral } });
  s.addText('ILUSTRE MUNICIPALIDAD DE RENGO  ·  PLADECO 2025-2035', {
    x: 0.4, y: 0.15, w: 12.5, h: 0.4,
    fontFace: FONT_HEAD, fontSize: 12, bold: true, color: C.white, align: 'center',
  });

  s.addText('04 · PROYECCIÓN AL 2035', { x: 0.4, y: 0.85, w: 12.5, h: 0.45,
    fontFace: FONT_HEAD, fontSize: 12, bold: true, color: C.yellow });
  s.addText('La comuna que soñamos al 2035', { x: 0.4, y: 1.25, w: 12.5, h: 0.85,
    fontFace: FONT_HEAD, fontSize: 32, bold: true, color: C.white });
  s.addText('Cuatro apuestas estructurales que orientarán a Rengo durante la próxima década',
    { x: 0.4, y: 2.05, w: 12.5, h: 0.4,
      fontFace: FONT_BODY, fontSize: 14, italic: true, color: C.cream });

  // 4 cuadrantes
  const apuestas = [
    { c: C.coral,  t: 'COMUNA INCLUSIVA',
      d: 'Sin niño/a postergado. Cierre de brechas urbano-rurales y atención prioritaria a NNA, adultos mayores y migrantes.' },
    { c: C.teal,   t: 'COMUNA SOSTENIBLE',
      d: 'Ordenamiento territorial responsable, agua segura, energía limpia y patrimonio agrícola protegido.' },
    { c: C.yellow, t: 'COMUNA PARTICIPATIVA',
      d: 'Decisiones con la voz de los NNA, juntas vecinales y organizaciones. Gobierno abierto y transparente.' },
    { c: C.green,  t: 'COMUNA INNOVADORA',
      d: 'Educación de calidad, oportunidades laborales, turismo y cultura como motor de desarrollo local.' },
  ];

  apuestas.forEach((ap, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 0.6 + col * 6.15;
    const y = 2.7 + row * 2.05;

    s.addShape('roundRect', { x: x, y: y, w: 5.95, h: 1.85,
      fill: { color: C.navyDk }, line: { color: ap.c, width: 2 }, rectRadius: 0.1 });
    s.addShape('rect', { x: x, y: y, w: 5.95, h: 0.5,
      fill: { color: ap.c }, line: { color: ap.c } });
    s.addText(ap.t, { x: x + 0.2, y: y, w: 5.55, h: 0.5,
      fontFace: FONT_HEAD, fontSize: 14, bold: true, color: C.white, valign: 'middle' });
    s.addText(ap.d, { x: x + 0.25, y: y + 0.65, w: 5.45, h: 1.15,
      fontFace: FONT_BODY, fontSize: 12, color: C.cream, valign: 'top' });
  });

  s.addText('I. Municipalidad de Rengo  ·  PLADECO 2025-2035  ·  Visión 2035',
    { x: 0.4, y: 7.05, w: 12.5, h: 0.3,
      fontFace: FONT_BODY, fontSize: 8, italic: true, color: C.cream, align: 'center' });
}

// ============================================================
// SLIDE 15 — CIERRE PARTICIPATIVO
// ============================================================
{
  const s = pres.addSlide(); bgNavy(s);

  // Hero
  s.addShape('rect', { x: 0, y: 0, w: W, h: H,
    fill: { color: C.navy }, line: { color: C.navy } });

  // Encabezado institucional
  s.addText('CIERRE  ·  PLADECO 2025-2035  ·  Oficina Local de la Niñez', {
    x: 0.4, y: 0.35, w: 12.5, h: 0.4,
    fontFace: FONT_HEAD, fontSize: 11, bold: true, color: C.teal, align: 'center', italic: true,
  });

  // Banda diagonal coral
  s.addShape('rect', { x: 0, y: 1.0, w: W, h: 1.7,
    fill: { color: C.coral }, line: { color: C.coral } });

  s.addText('TU VOZ', { x: 0.4, y: 1.0, w: 12.5, h: 0.85,
    fontFace: FONT_HEAD, fontSize: 60, bold: true, color: C.white, align: 'center', valign: 'middle' });
  s.addText('IMPORTA · CONSTRUYE · TRANSFORMA', { x: 0.4, y: 1.85, w: 12.5, h: 0.7,
    fontFace: FONT_HEAD, fontSize: 22, bold: true, color: C.yellow, align: 'center' });

  // Mensaje principal
  s.addText('Las decisiones que se toman en Rengo afectan tu vida.\nLa diferencia es que ahora vamos a tomarlas escuchándote.',
    { x: 1.0, y: 3.2, w: 11.3, h: 1.2,
      fontFace: FONT_HEAD, fontSize: 22, italic: true, color: C.white, align: 'center', valign: 'top',
      lineSpacing: 30 });

  // Tres llamadas
  const llamadas = [
    { c: C.coral,  t: 'PARTICIPA',  d: 'Postula al CCCNNA y opina en tu colegio' },
    { c: C.teal,   t: 'CONÉCTATE',  d: 'Visita la Oficina Local de la Niñez' },
    { c: C.yellow, t: 'CONSTRUYE',  d: 'Sé parte del Rengo que soñamos al 2035' },
  ];
  llamadas.forEach((ll, i) => {
    const x = 0.8 + i * 4.1;
    const y = 4.7;
    s.addShape('roundRect', { x: x, y: y, w: 3.85, h: 1.5,
      fill: { color: 'FFFFFF' }, line: { color: ll.c, width: 2 }, rectRadius: 0.15 });
    s.addText(ll.t, { x: x, y: y + 0.2, w: 3.85, h: 0.55,
      fontFace: FONT_HEAD, fontSize: 22, bold: true, color: ll.c, align: 'center' });
    s.addText(ll.d, { x: x + 0.15, y: y + 0.85, w: 3.55, h: 0.55,
      fontFace: FONT_BODY, fontSize: 11, color: C.dark, italic: true, align: 'center', valign: 'top' });
  });

  // Pie
  s.addText('GRACIAS', { x: 0.4, y: 6.45, w: 12.5, h: 0.5,
    fontFace: FONT_HEAD, fontSize: 26, bold: true, color: C.white, align: 'center' });
  s.addText('I. Municipalidad de Rengo  ·  PLADECO 2025-2035  ·  Oficina Local de la Niñez  ·  Abril 2026',
    { x: 0.4, y: 7.0, w: 12.5, h: 0.4,
      fontFace: FONT_BODY, fontSize: 10, italic: true, color: C.cream, align: 'center' });
}

// ============================================================
// SAVE
// ============================================================
pres.writeFile({ fileName: OUT })
  .then(fn => console.log('Presentacion creada:', fn))
  .catch(err => { console.error('ERROR:', err); process.exit(1); });
