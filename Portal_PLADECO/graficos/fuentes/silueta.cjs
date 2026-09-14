const fs = require('fs');
const path = require('path');
const g = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', 'rengo-limite.geojson'), 'utf8'));  // contorno OSM del portal
const ring = g.geometry.coordinates[0];
const lat0 = (-34.6087 + -34.2792) / 2;
const k = Math.cos(lat0 * Math.PI / 180);
// proyección equirectangular local en km
const R = 6371.0088;
const toKm = ([lon, lat]) => [ (lon * Math.PI / 180) * R * k, -(lat * Math.PI / 180) * R ];
const pts = ring.map(toKm);
let minx = Infinity, maxx = -Infinity, miny = Infinity, maxy = -Infinity;
pts.forEach(([x, y]) => { minx = Math.min(minx, x); maxx = Math.max(maxx, x); miny = Math.min(miny, y); maxy = Math.max(maxy, y); });
const anchoKm = maxx - minx, altoKm = maxy - miny;
// área (shoelace) en km²
let area = 0; for (let i = 0; i < pts.length - 1; i++) area += pts[i][0] * pts[i + 1][1] - pts[i + 1][0] * pts[i][1];
area = Math.abs(area) / 2;
function rdp(p, eps) {
  if (p.length < 3) return p;
  const [x1, y1] = p[0], [x2, y2] = p[p.length - 1];
  const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy) || 1;
  let idx = 0, dmax = 0;
  for (let i = 1; i < p.length - 1; i++) { const d = Math.abs(dy * p[i][0] - dx * p[i][1] + x2 * y1 - y2 * x1) / L; if (d > dmax) { dmax = d; idx = i; } }
  return dmax > eps ? rdp(p.slice(0, idx + 1), eps).slice(0, -1).concat(rdp(p.slice(idx), eps)) : [p[0], p[p.length - 1]];
}
const out = {};
for (const eps of [0.03, 0.08, 0.2]) {
  // cerrar: dividir el anillo en dos mitades para que RDP no colapse
  const mid = Math.floor(pts.length / 2);
  const s = rdp(pts.slice(0, mid + 1), eps).slice(0, -1).concat(rdp(pts.slice(mid), eps));
  out[eps] = s;
}
console.log('vértices originales', ring.length, '· ancho km', anchoKm.toFixed(2), '· alto km', altoKm.toFixed(2), '· área km² (OSM, aprox.)', area.toFixed(1));
for (const e in out) console.log('eps', e, 'km ->', out[e].length, 'vértices');
fs.writeFileSync(path.join(__dirname, 'silueta.json'), JSON.stringify({ lat0, k, R, minx, miny, anchoKm, altoKm, areaKm2: area, simplificada: out }));
