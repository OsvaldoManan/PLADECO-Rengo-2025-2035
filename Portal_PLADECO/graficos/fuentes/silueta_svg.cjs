/* Silueta general de la comuna de Rengo, desde Portal_PLADECO/rengo-limite.geojson.
   El archivo declara como fuente «OpenStreetMap contributors»: es un límite REFERENCIAL, no el
   límite oficial. Proyección equirectangular local (adecuada a escala comunal) y simplificación
   Douglas-Peucker con tolerancia de 80 m. Incluye norte y escala gráfica.
   Uso: node silueta_svg.cjs → salida/silueta-rengo.svg y salida/silueta-rengo-mono.svg */
const fs = require('fs');
const path = require('path');
const S = JSON.parse(fs.readFileSync(path.join(__dirname, 'silueta.json'), 'utf8'));
const OUT = path.join(__dirname, 'salida');
fs.mkdirSync(OUT, { recursive: true });
const pts = S.simplificada['0.08'];
const U = 20;                       // unidades SVG por km
const M = 40;                       // margen
const W = Math.ceil(S.anchoKm * U + 2 * M), H = Math.ceil(S.altoKm * U + 2 * M + 40);
const px = ([x, y]) => [+((x - S.minx) * U + M).toFixed(1), +((y - S.miny) * U + M).toFixed(1)];
const d = 'M' + pts.map((p) => px(p).join(',')).join(' L') + ' Z';

function svg(mono) {
  const trazo = mono ? 'currentColor' : 'var(--sil-trazo,#17324D)';
  const relleno = mono ? 'none' : 'var(--sil-relleno,#E8EDF1)';
  const esc10 = 10 * U;
  const yEsc = H - 34;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-labelledby="sil-t sil-d">
<title id="sil-t">Silueta de la comuna de Rengo</title>
<desc id="sil-d">Contorno de la comuna de Rengo con norte y escala gráfica de 10 km. Límite referencial tomado de OpenStreetMap (colaboradores de OSM), simplificado con una tolerancia de 80 m: no es el límite oficial. Extensión aproximada de ${S.anchoKm.toFixed(0)} km de oeste a este y ${S.altoKm.toFixed(0)} km de norte a sur.</desc>
<path d="${d}" fill="${relleno}" stroke="${trazo}" stroke-width="2.2" stroke-linejoin="round"/>
<g transform="translate(${W - M - 18},${M + 8})" fill="none" stroke="${trazo}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
  <path d="M0 22 L0 -8 M-6 0 L0 -10 L6 0"/>
  <text x="0" y="40" text-anchor="middle" font-family="system-ui, sans-serif" font-size="16" font-weight="600" fill="${trazo}" stroke="none">N</text>
</g>
<g transform="translate(${M},${yEsc})" font-family="system-ui, sans-serif" font-size="14" fill="${trazo}">
  <path d="M0 0 H${esc10}" stroke="${trazo}" stroke-width="2"/>
  <path d="M0 -6 V6 M${esc10 / 2} -4 V4 M${esc10} -6 V6" stroke="${trazo}" stroke-width="2"/>
  <text x="0" y="24">0</text><text x="${esc10 / 2}" y="24" text-anchor="middle">5</text><text x="${esc10}" y="24" text-anchor="middle">10 km</text>
</g>
</svg>`;
}
fs.writeFileSync(path.join(OUT, 'silueta-rengo.svg'), svg(false));
fs.writeFileSync(path.join(OUT, 'silueta-rengo-mono.svg'), svg(true));
console.log('silueta', W + '×' + H, pts.length, 'vértices');
