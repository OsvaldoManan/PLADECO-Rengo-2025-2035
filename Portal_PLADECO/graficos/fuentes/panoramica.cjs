/* Constructor de la panorámica vectorial de Rengo (ilustración territorial).
   FUENTE DEL RELIEVE: la fotografía aérea del portal Portal_PLADECO/Entrada-Rengo-Color-Pladeco.jpg (2560×1440).
   · La cresta de la cordillera se DETECTÓ por discontinuidad de color respecto del cielo (trazos.json).
   · Los cerros cercanos y el cordón lejano de la izquierda (con neblina) se TRAZARON sobre la misma
     foto con una retícula de 50 px.
   · El asentamiento, las arboledas y los cultivos son una SIMPLIFICACIÓN deliberada (no un inventario):
     casas bajas de techo a dos aguas y arboledas como las que muestra la foto.
   Uso: node panoramica.cjs  → escribe en ./salida los SVG de escritorio, móvil y monocromo. */
const fs = require('fs');
const path = require('path');
const T = JSON.parse(fs.readFileSync(path.join(__dirname, 'trazos.json'), 'utf8'));
const P = JSON.parse(fs.readFileSync(path.join(__dirname, 'planos_raw.json'), 'utf8'));
const OUT = path.join(__dirname, 'salida');
fs.mkdirSync(OUT, { recursive: true });

const SX = 1600 / 2560;           // escala horizontal foto → lienzo
const SY = 1.0;                   // escala vertical: exageración vertical de 1,6× (declarada en <desc>)
const Y0 = 58, YREF = 255;
const X = (x) => +(x * SX).toFixed(1);
const Y = (y) => +(Y0 + (y - YREF) * SY).toFixed(1);
const PIE = Y(452);               // pie de la cordillera en la foto → línea del valle

let semilla = 1;
const azar = () => { semilla = (semilla * 1664525 + 1013904223) % 4294967296; return semilla / 4294967296; };
const entre = (a, b) => a + (b - a) * azar();
const f1 = (n) => +n.toFixed(1);

function rdp(p, eps) {
  if (p.length < 3) return p;
  const [x1, y1] = p[0], [x2, y2] = p[p.length - 1];
  const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy) || 1;
  let idx = 0, dmax = 0;
  for (let i = 1; i < p.length - 1; i++) { const d = Math.abs(dy * p[i][0] - dx * p[i][1] + x2 * y1 - y2 * x1) / L; if (d > dmax) { dmax = d; idx = i; } }
  return dmax > eps ? rdp(p.slice(0, idx + 1), eps).slice(0, -1).concat(rdp(p.slice(idx), eps)) : [p[0], p[p.length - 1]];
}
function mediana(v, k) {
  return v.map((_, i) => { const w = v.slice(Math.max(0, i - k), i + k + 1).filter((a) => a != null).sort((a, b) => a - b); return w.length ? w[Math.floor(w.length / 2)] : null; });
}

/* ── cresta: detectada desde x = 560; a la izquierda, cordón lejano trazado a mano ── */
const IZQ = [[0, 392], [60, 388], [120, 383], [170, 386], [230, 384], [300, 387], [345, 381], [384, 373], [420, 378], [448, 370], [480, 377], [520, 381], [560, 380]];
const crestaDet = T.cresta_full.filter(([x]) => x > 560);
const crestaCompleta = IZQ.concat(crestaDet);
const cresta = rdp(crestaCompleta, 1.6);

/* ── cordón medio: igual a la cresta salvo bajo el tramo nevado (1500–2100) ── */
const p2 = mediana(P.plano2, 12);
const medioBruto = [];
for (let i = 0; i < P.cresta.length; i++) {
  const x = i * P.step; if (x < 560) continue;
  const yc = crestaCompleta.find(([cx]) => cx >= x); if (!yc) continue;
  let y = yc[1];
  if (x >= 1500 && x <= 2100 && p2[i] != null) y = Math.max(yc[1] + 4, Math.min(p2[i], yc[1] + 34));
  medioBruto.push([x, y]);
}
// limitador de pendiente: ningún salto mayor que 6 px por paso de 4 px
for (let i = 1; i < medioBruto.length; i++) {
  const d = medioBruto[i][1] - medioBruto[i - 1][1];
  if (Math.abs(d) > 6) medioBruto[i][1] = medioBruto[i - 1][1] + Math.sign(d) * 6;
}
const medio = [[330, 452], [430, 432], [520, 408]].concat(rdp(medioBruto.filter(([x]) => x >= 600), 2.0));

/* ── cerros cercanos, trazados sobre la foto ── */
const cerros = [[1545, 452], [1600, 426], [1700, 390], [1780, 362], [1860, 346], [1930, 352], [2000, 364], [2051, 373],
  [2120, 350], [2189, 331], [2260, 313], [2327, 299], [2401, 284], [2460, 275], [2507, 268], [2560, 262]];

/* ── nieve: casquetes suavizados sobre los tramos detectados y el verificado a ojo ── */
const tramosNieve = [[1610, 1675], [1688, 1710], [1752, 1790], [2090, 2205], [2262, 2345], [2398, 2418]];
function casquetes() {
  let d = '';
  for (const [a, b] of tramosNieve) {
    const top = crestaCompleta.filter(([x]) => x >= a && x <= b);
    if (top.length < 3) continue;
    const ancho = b - a, prof = Math.min(18, Math.max(6, ancho / 5));
    const n = Math.max(2, Math.round(ancho / 28));     // lenguas de nieve
    const base = [];
    for (let k = 0; k <= n * 2; k++) {
      const x = b - (ancho * k) / (n * 2);
      const yc = (top.find(([cx]) => cx >= x) || top[top.length - 1])[1];
      base.push([x, yc + (k % 2 ? prof : prof * 0.35)]);
    }
    const pts = rdp(top, 1.0).concat(base);
    d += 'M' + pts.map(([x, y]) => X(x) + ',' + Y(y)).join(' L') + ' Z ';
  }
  return d.trim();
}

function poligono(pts, piso) {
  return 'M' + X(pts[0][0]) + ',' + piso + ' L' + pts.map(([x, y]) => X(x) + ',' + Y(y)).join(' L') + ' L' + X(pts[pts.length - 1][0]) + ',' + piso + ' Z';
}

/* ── vegetación y asentamiento ── */
function lineaArboles(y, x0, x1, rMin, rMax, pAlamo) {
  // silueta continua de copas (un solo trazado) + álamos aparte
  let d = 'M' + x0 + ',' + y, alamos = '';
  let x = x0;
  while (x < x1) {
    if (azar() < pAlamo) {
      const h = entre(rMax * 2.2, rMax * 3.2), w = entre(3.2, 4.6);
      alamos += 'M' + f1(x) + ',' + f1(y) + ' C' + f1(x - w) + ',' + f1(y - h * 0.45) + ' ' + f1(x - w * 0.55) + ',' + f1(y - h * 0.9) + ' ' + f1(x) + ',' + f1(y - h) +
        ' C' + f1(x + w * 0.55) + ',' + f1(y - h * 0.9) + ' ' + f1(x + w) + ',' + f1(y - h * 0.45) + ' ' + f1(x) + ',' + f1(y) + ' Z ';
    }
    const r = entre(rMin, rMax), paso = r * entre(1.1, 1.7);
    d += ' Q' + f1(x + paso / 2) + ',' + f1(y - r * 1.5) + ' ' + f1(x + paso) + ',' + f1(y);
    x += paso;
  }
  d += ' Z';
  return { copas: d, alamos: alamos.trim() };
}
function barrio(yBase, x0, x1, esc, huecos) {
  let muros = '', sombras = '', tejas = '', zinc = '';
  let x = x0;
  while (x < x1) {
    if (azar() < huecos) { x += entre(14, 36) * esc; continue; }
    const w = entre(18, 34) * esc, h = entre(8, 12) * esc, t = entre(5, 8) * esc;
    const x2 = x + w;
    muros += 'M' + f1(x) + ',' + f1(yBase) + ' V' + f1(yBase - h) + ' H' + f1(x2) + ' V' + f1(yBase) + ' Z ';
    const ls = Math.min(w * 0.3, 7 * esc);
    sombras += 'M' + f1(x2 - ls) + ',' + f1(yBase) + ' V' + f1(yBase - h) + ' H' + f1(x2) + ' V' + f1(yBase) + ' Z ';
    const techo = azar() < 0.6
      ? 'M' + f1(x - 2) + ',' + f1(yBase - h) + ' L' + f1(x + w / 2) + ',' + f1(yBase - h - t) + ' L' + f1(x2 + 2) + ',' + f1(yBase - h) + ' Z '
      : 'M' + f1(x - 2) + ',' + f1(yBase - h) + ' L' + f1(x + w * 0.25) + ',' + f1(yBase - h - t * 0.75) + ' H' + f1(x2 - w * 0.25) + ' L' + f1(x2 + 2) + ',' + f1(yBase - h) + ' Z ';
    if (azar() < 0.62) tejas += techo; else zinc += techo;
    x = x2 + entre(4, 8) * esc;
  }
  return { muros: muros.trim(), sombras: sombras.trim(), tejas: tejas.trim(), zinc: zinc.trim() };
}
function surcos(y0, x0, x1, filas, sep, inclinacion) {
  let d = '';
  for (let k = 0; k < filas; k++) {
    const y = y0 + k * sep;
    d += 'M' + x0 + ',' + f1(y) + ' L' + x1 + ',' + f1(y + inclinacion * (k - filas / 2)) + ' ';
  }
  return d.trim();
}

const COLOR = {
  lejano: '#D6DFE6', nieve: '#FFFFFF', medio: '#B2C1CD', cerca: '#8A9DAD',
  arbolesFondo: '#A9C0AE', alamo: '#5C8770', surco: '#D2DCCB', valle: '#E3EADF',
  muro: '#FDFDFB', sombra: '#D9E0E4', teja: '#C98B77', zinc: '#AEBBC5', frente: '#5E8B70',
};
function estilo(mono) {
  const v = (k) => `var(--pn-${k},${COLOR[k]})`;
  if (mono) {
    const m = 'var(--pn-mono,#27343B)', fondo = 'var(--pn-mono-fondo,#F7F8F5)';
    return `.pn-lejano{fill:${m};fill-opacity:.09}.pn-nieve{fill:${fondo}}.pn-medio{fill:${m};fill-opacity:.16}.pn-cerca{fill:${m};fill-opacity:.25}` +
      `.pn-arboles-fondo{fill:${m};fill-opacity:.2}.pn-alamo{fill:${m};fill-opacity:.42}.pn-surco{fill:none;stroke:${m};stroke-opacity:.2;stroke-width:1.2}` +
      `.pn-valle{fill:${m};fill-opacity:.05}.pn-muro{fill:${fondo}}.pn-sombra{fill:${m};fill-opacity:.2}.pn-teja,.pn-zinc{fill:${m};fill-opacity:.42}.pn-frente{fill:${m};fill-opacity:.36}`;
  }
  return `.pn-lejano{fill:${v('lejano')}}.pn-nieve{fill:${v('nieve')}}.pn-medio{fill:${v('medio')}}.pn-cerca{fill:${v('cerca')}}` +
    `.pn-arboles-fondo{fill:${v('arbolesFondo')}}.pn-alamo{fill:${v('alamo')}}.pn-surco{fill:none;stroke:${v('surco')};stroke-width:1.3}` +
    `.pn-valle{fill:${v('valle')}}.pn-muro{fill:${v('muro')}}.pn-sombra{fill:${v('sombra')}}.pn-teja{fill:${v('teja')}}.pn-zinc{fill:${v('zinc')}}.pn-frente{fill:${v('frente')}}`;
}

function construir({ vb, mono = false, movil = false }) {
  semilla = 20252035;
  const [vx, vy, vw, vh] = vb.split(' ').map(Number);
  const x0 = vx - 20, x1 = vx + vw + 20;
  const esc = movil ? 1.45 : 1;
  const fondo = lineaArboles(PIE + 3, x0, x1, 4, 7, 0.10);
  const cultivoIzq = movil ? '' : surcos(PIE + 14, 0, 300, 5, 6, 0.5);
  const cultivoDer = movil ? '' : surcos(PIE + 14, 1320, 1600, 5, 6, -0.5);
  const yFrente = vy + vh;
  const valle = 'M' + x0 + ',' + (PIE + 4) + ' L' + x1 + ',' + (PIE + 4) + ' L' + x1 + ',' + yFrente + ' L' + x0 + ',' + yFrente + ' Z';
  const b1 = barrio(PIE + 22 * esc, movil ? x0 : 380, movil ? x1 : 1270, 0.85 * esc, 0.18);
  const medioArb = lineaArboles(PIE + 36 * esc, movil ? x0 : 300, movil ? x1 : 1360, 5 * esc, 9 * esc, 0.16);
  const b2 = barrio(PIE + 66 * esc, movil ? x0 + 10 : 470, movil ? x1 - 10 : 1180, 1.3 * esc, 0.22);
  const frente = lineaArboles(vy + vh + 2, x0, x1, 7 * esc, 19 * esc, 0.08);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" role="img" aria-labelledby="pn-titulo pn-desc" preserveAspectRatio="xMidYMax meet">
<title id="pn-titulo">Ilustración territorial de Rengo</title>
<desc id="pn-desc">Cordillera de los Andes con cumbres nevadas y cerros cercanos detrás del valle, con arboledas, cultivos y una ciudad de casas bajas. Composición simplificada basada en la fotografía aérea de Rengo del archivo del proceso PLADECO: no es un mapa ni un registro fotográfico. El relieve tiene una exageración vertical de 1,6 veces.</desc>
<style>${estilo(mono)}</style>
<g class="pn-relieve">
<path class="pn-lejano" d="${poligono(cresta, PIE + 8)}"/>
<path class="pn-nieve" d="${casquetes()}"/>
<path class="pn-medio" d="${poligono(medio, PIE + 8)}"/>
<path class="pn-cerca" d="${poligono(cerros, PIE + 8)}"/>
</g>
<g class="pn-valle-capa">
<path class="pn-valle" d="${valle}"/>
<path class="pn-arboles-fondo" d="${fondo.copas}"/>
<path class="pn-alamo" d="${fondo.alamos}"/>
${cultivoIzq ? `<path class="pn-surco" d="${cultivoIzq} ${cultivoDer}"/>` : ''}
</g>
<g class="pn-asentamiento">
<path class="pn-muro" d="${b1.muros}"/><path class="pn-sombra" d="${b1.sombras}"/><path class="pn-teja" d="${b1.tejas}"/><path class="pn-zinc" d="${b1.zinc}"/>
<path class="pn-arboles-fondo" d="${medioArb.copas}"/><path class="pn-alamo" d="${medioArb.alamos}"/>
<path class="pn-muro" d="${b2.muros}"/><path class="pn-sombra" d="${b2.sombras}"/><path class="pn-teja" d="${b2.tejas}"/><path class="pn-zinc" d="${b2.zinc}"/>
</g>
<g class="pn-primer-plano">
<path class="pn-frente" d="${frente.copas}"/><path class="pn-alamo" d="${frente.alamos}"/>
</g>
</svg>`;
}

const ALTO = 352;
fs.writeFileSync(path.join(OUT, 'panoramica-rengo.svg'), construir({ vb: `0 0 1600 ${ALTO}` }));
fs.writeFileSync(path.join(OUT, 'panoramica-rengo-mono.svg'), construir({ vb: `0 0 1600 ${ALTO}`, mono: true }));
fs.writeFileSync(path.join(OUT, 'panoramica-rengo-movil.svg'), construir({ vb: `900 40 700 ${ALTO + 70}`, movil: true }));
console.log('pie de cordillera en y =', PIE, '· cresta', cresta.length, 'puntos · cordón medio', medio.length, 'puntos');
