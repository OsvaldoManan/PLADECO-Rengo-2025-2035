/* Familia de seis iconos de los ejes estratégicos · PLADECO Rengo 2025-2035.
   AMPLÍA la familia de línea del portal (sprite de 52 símbolos, index.html): grilla de 24,
   contorno de 1,7, remates y uniones redondeados, currentColor, margen útil de ≈2 unidades.
   Cada símbolo trae una forma de ACENTO (clase sg-acento) que no se ve salvo que se defina
   --ico-acento: así un mismo símbolo sirve en monocromo y con el color del eje.
   Salidas: salida/iconos-ejes.svg (sprite) y salida/iconos/eje-N-*.svg (sueltos, mono y acento). */
const fs = require('fs');
const path = require('path');
const OUT = path.join(__dirname, 'salida');
fs.mkdirSync(path.join(OUT, 'iconos'), { recursive: true });

const ACENTO = 'style="fill:var(--ico-acento,none);stroke:none"';
const EJES = [
  { n: 1, archivo: 'social-salud', corto: 'Social y Salud', idea: 'comunidad: una persona adulta y una niña o niño',
    nombre: 'Cultura, Turismo, Deportes, Recreación y Bienestar Social (Salud)', color: '#0072B2',
    trazos: `<path class="sg-acento" ${ACENTO} d="M2.8 20.6V19a5 5 0 0 1 10 0v1.6Z"/>
<circle cx="7.8" cy="7.4" r="2.9"/><path d="M2.8 20.6V19a5 5 0 0 1 10 0v1.6"/>
<circle cx="18" cy="11.4" r="2.1"/><path d="M15.2 20.6v-.9a2.9 2.9 0 0 1 5.8 0v.9"/>` },
  { n: 2, archivo: 'economico', corto: 'Económico', idea: 'economía local: un comercio con toldo',
    nombre: 'Desarrollo Económico Comunal', color: '#E69F00',
    trazos: `<path class="sg-acento" ${ACENTO} d="M5 4h14l2 5.2c0 1.2-.95 2.1-2.12 2.1s-2.13-.9-2.13-2.1c0 1.2-.95 2.1-2.12 2.1S12.5 10.4 12.5 9.2c0 1.2-.95 2.1-2.13 2.1S8.25 10.4 8.25 9.2c0 1.2-.95 2.1-2.12 2.1S3 10.4 3 9.2Z"/>
<path d="M3 9.2 5 4h14l2 5.2"/><path d="M3 9.2c0 1.2.95 2.1 2.13 2.1s2.12-.9 2.12-2.1c0 1.2.95 2.1 2.13 2.1s2.12-.9 2.12-2.1c0 1.2.95 2.1 2.12 2.1s2.13-.9 2.13-2.1c0 1.2.95 2.1 2.12 2.1S21 10.4 21 9.2"/>
<path d="M4.8 11.2v9.4h14.4v-9.4"/><path d="M9.6 20.6v-5h4.8v5"/>` },
  { n: 3, archivo: 'educacion', corto: 'Educación', idea: 'aprender para crecer: un libro abierto del que brota una planta',
    nombre: 'Educación y Capacitación para el Desarrollo Humano', color: '#009E73',
    trazos: `<path class="sg-acento" ${ACENTO} d="M12 8.6c0-2.6-1.9-4.5-4.6-4.5 0 2.6 1.9 4.5 4.6 4.5ZM12 7.4c0-2.3 1.7-4 4.1-4 0 2.3-1.7 4-4.1 4Z"/>
<path d="M12 13v-5.6"/><path d="M12 8.6c0-2.6-1.9-4.5-4.6-4.5 0 2.6 1.9 4.5 4.6 4.5Z"/><path d="M12 7.4c0-2.3 1.7-4 4.1-4 0 2.3-1.7 4-4.1 4Z"/>
<path d="M12 13.2c-1.9-1.3-4.3-1.9-7.2-1.9H3v8.3h1.8c2.9 0 5.3.6 7.2 1.9 1.9-1.3 4.3-1.9 7.2-1.9H21v-8.3h-1.8c-2.9 0-5.3.6-7.2 1.9Z"/><path d="M12 13.2v8.3"/>` },
  { n: 4, archivo: 'urbano-medio-ambiente', corto: 'Urbano y Medio Ambiente', idea: 'habitar el territorio: una vivienda y un árbol sobre el suelo',
    nombre: 'Desarrollo Urbano, Vivienda, Infraestructura, Vialidad y Medio Ambiente', color: '#56B4E9',
    trazos: `<circle class="sg-acento" ${ACENTO} cx="17.6" cy="9.6" r="3.4"/>
<path d="M2.6 11.6 8.4 6.2l5.8 5.4"/><path d="M4.4 10v10.6h8v-10.6"/>
<circle cx="17.6" cy="9.6" r="3.4"/><path d="M17.6 13v7.6"/><path d="M2 20.6h20"/>` },
  { n: 5, archivo: 'seguridad', corto: 'Seguridad', idea: 'alerta y respuesta: una baliza de emergencia',
    nombre: 'Seguridad Pública y Gestión de Riesgos y Emergencias', color: '#D55E00',
    trazos: `<path class="sg-acento" ${ACENTO} d="M7 17.2v-4.4a5 5 0 0 1 10 0v4.4Z"/>
<path d="M7 17.2v-4.4a5 5 0 0 1 10 0v4.4"/><path d="M4.8 17.2h14.4v3.4H4.8Z"/>
<path d="M12 3v2.2"/><path d="m4.9 6 1.6 1.6"/><path d="m19.1 6-1.6 1.6"/><path d="M12 12.6v2"/>` },
  { n: 6, archivo: 'gestion-municipal', corto: 'Gestión Municipal', idea: 'el municipio: edificio consistorial con torre y bandera',
    nombre: 'Innovación, Modernización y Optimización de la Gestión Municipal', color: '#CC79A7',
    trazos: `<path class="sg-acento" ${ACENTO} d="M9.2 11V6.6h5.6V11Z"/>
<path d="M2.4 20.6h19.2"/><path d="M4.4 20.6V11h15.2v9.6"/><path d="M9.2 11V6.6h5.6V11"/>
<path d="M12 6.6V2.4l3 1.1-3 1.1"/><path d="M10.4 20.6v-3.2a1.6 1.6 0 0 1 3.2 0v3.2"/>` },
];

const ATTR = 'fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"';
let sprite = '<svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" style="position:absolute;overflow:hidden" aria-hidden="true" focusable="false"><defs>\n';
for (const e of EJES) {
  sprite += `<symbol id="ico-eje-${e.n}" viewBox="0 0 24 24">${e.trazos.replace(/\n/g, '')}</symbol>\n`;
  const base = (acento) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48" ${ATTR} role="img" aria-label="Eje ${e.n} · ${e.corto}"${acento ? ` style="--ico-acento:${e.color}"` : ''}>
<title>Eje ${e.n} · ${e.corto}</title>
<desc>${e.nombre}. Idea del símbolo: ${e.idea}. Familia de iconos de los ejes del Portal PLADECO Rengo 2025-2035 (grilla 24, trazo 1,7).</desc>
${e.trazos}
</svg>\n`;
  fs.writeFileSync(path.join(OUT, 'iconos', `eje-${e.n}-${e.archivo}.svg`), base(false));
  fs.writeFileSync(path.join(OUT, 'iconos', `eje-${e.n}-${e.archivo}-acento.svg`), base(true));
}
sprite += '</defs></svg>\n';
fs.writeFileSync(path.join(OUT, 'iconos-ejes.svg'), sprite);
fs.writeFileSync(path.join(OUT, 'iconos-ejes.json'), JSON.stringify(EJES.map(({ n, corto, nombre, idea, archivo }) => ({ n, corto, nombre, idea, archivo })), null, 1));
console.log('sprite + ' + EJES.length * 2 + ' archivos sueltos');
