# Pieza 3 · Estilo de visualización de datos

Que los **73 gráficos** del portal se lean como un solo cuerpo institucional. Tokens en
`tokens.css` (`--dv-*`, `--seq-*`, `--div-*`). Plantillas: `tpl-barras.svg`, `tpl-lineas.svg`,
`tpl-coropletico.svg`.

## Paleta de datos
- **Categórica — Okabe-Ito** (`--dv-1…8`). Elegida por ser **segura para daltonismo**
  (deuteranopía/protanopía/tritanopía), estándar en publicación científica/pública. Orden:
  azul `#0072B2` (serie principal, ≈ institucional) → bermellón `#D55E00` → verde `#009E73` →
  púrpura `#CC79A7` → naranja `#E69F00` → celeste `#56B4E9` → amarillo (solo relleno) → tinta.
  **Máx. 6 series** por gráfico; si hay más, agrupar.
- **Secuencial — coroplético** (`--seq-1…6`): rampa de **luminancia** base navy, claro→oscuro.
  Legible en escala de grises.
- **Divergente** (`--div-neg2…pos2`): crimson ↔ neutro ↔ navy. **Evita rojo-verde** (la
  combinación más problemática para CVD).

## Reglas no negociables
1. **Interpretable en escala de grises.** Probar cada gráfico en B/N: si dos series se
   confunden, diferenciarlas con **etiqueta directa, patrón o grosor**, no solo color.
2. **El color no es el único portador de significado.** Etiquetar la serie sobre/junto al dato
   (label directo) en vez de depender solo de la leyenda.
3. **Una serie destacada = navy o crimson**; el resto, neutro. No "arcoíris" por defecto.
4. **Sin decoración**: nada de 3D, sombras, degradados de relleno, fondos.

## Tratamiento (tokens de la familia)
| Elemento | Regla |
|---|---|
| **Título** | Source Serif 4, 15px, tinta (`--n-900`), izquierda |
| **Subtítulo/unidad** | Inter 11px, `--n-500` |
| **Ejes (línea)** | `--n-300`, 1px; solo los ejes necesarios (sin marco completo) |
| **Etiquetas de eje** | Inter 11px, `--n-500`, **cifras tabulares** |
| **Grilla** | horizontal **sutil** (`--n-100`, 1px); sin grilla vertical salvo necesidad |
| **Leyenda** | Inter 11px; preferir **etiqueta directa** sobre leyenda separada |
| **Fuente (pie)** | Inter 10px, `--n-400`, prefijo "Fuente:" — **siempre presente** |
| **Relleno de barra** | plano; esquinas rectas o `--r-xs` |
| **Línea de datos** | 2px; puntos solo si aportan; sin sombra |

## Aplicación en Chart.js (portal)
Definir un preset compartido:
```js
const PLADECO_CHART = {
  cat: ['#0072B2','#D55E00','#009E73','#CC79A7','#E69F00','#56B4E9'], // --dv-*
  font: { family: 'Inter, system-ui, sans-serif' },
  grid: { color: 'rgba(148,163,184,.18)', drawBorder:false },         // --n-300 sutil
  tick: { color: '#475569', font:{ size:11 } },                       // --n-500
  // title: Source Serif 4 vía plugin/título HTML externo
};
```
Borde de barras recto, leyenda con `usePointStyle`, tooltip sobrio; **un color de marca por
gráfico**, resto neutro. Pies de fuente como subtítulo HTML bajo el `<canvas>` (no dentro del canvas).
