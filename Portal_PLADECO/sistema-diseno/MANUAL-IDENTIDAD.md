# Manual de Identidad y Sistema de Diseño · PLADECO Rengo 2025-2035

Documento formal del sistema visual del Portal Estratégico. Garantiza **coherencia ante el
versionado diario, traspaso institucional y evidencia para SUBDERE**. Fuente de verdad de
código: `tokens.css`. Concepto rector: `00-CONCEPTO.md`.

---

## 1 · Principio de diseño
**Un instrumento de Estado, no una vitrina:** la jerarquía la construyen tipografía, retícula y
espacio en blanco; el color es señal, no decoración. *Institucional sobre llamativo · editorial
sobre decorativo · sistema sobre piezas sueltas.* (Detalle en `00-CONCEPTO.md`.)

## 2 · Paleta (tokens + WCAG)
**Primitivos de marca:** `--c-crimson #990000` · `--c-navy #1F3864` · `--c-dark #0b1624`.
**Neutros:** papel `#ffffff`/`#f8fafc`; tintas `--n-50…900`.
**Semánticos de estado:** `--s-logrado #1b6e3a` · `--s-proceso #b45309` · `--s-critico #990000`.
**Modo oscuro (aclarados sobre `#0b1624`):** `--d-navy #7ea4d8` · `--d-crimson #e8736b` · `--d-text #eaf1fb`.

| Uso | Token | Ratio sobre papel |
|---|---|---|
| Texto principal | `--n-900` / `--c-navy` | 10.9:1 ✓AAA |
| Texto secundario | `--n-500` | 7.0:1 ✓AAA |
| Texto mínimo permitido | `--n-400` | 4.9:1 ✓AA |
| Énfasis / alerta | `--c-crimson` | 7.4:1 ✓AA |
| Estado logrado | `--s-logrado` | 5.6:1 ✓AA |
| Estado en proceso | `--s-proceso` | 4.6:1 ✓AA |
| Bordes / filetes | `--n-100/200` | solo no-texto |
> Regla: **la marca aparece donde guía o significa**; ~90 % de la interfaz es neutra.

## 3 · Tipografía
- **Source Serif 4** — títulos, cifras de portada (autoridad editorial).
- **Inter** — cuerpo, datos, ejes; **`font-variant-numeric: tabular-nums`** en toda cifra.
- Escala modular (1.25): `--t-xs .75` → `--t-3xl 3rem`. Interlineado: `--lh-base 1.55` (texto),
  `--lh-tight 1.2` (títulos). **Alineación a la izquierda**; jerarquía por tamaño/peso/espacio.

## 4 · Iconografía
Set único de **51 íconos de línea** (grilla 24, trazo 1.7, `currentColor`). Reemplaza emojis.
Spec, reglas de accesibilidad y tabla de mapeo en `iconos/mapeo-emojis.md`. Sprite: `iconos/sprite.svg`.

## 5 · Componentes y estados
> Filetes finos y radios pequeños (`--r-sm/md`). **Sin sombras difusas.** Foco siempre visible.

**Botones**
```css
.btn{font:600 var(--t-sm)/1 var(--f-sans);padding:9px 16px;border-radius:var(--r-sm);
     border:1px solid transparent;cursor:pointer}
.btn-primary{background:var(--c-navy);color:#fff}
.btn-primary:hover{background:#16294a}                 /* navy -8% */
.btn-secondary{background:transparent;color:var(--c-navy);border-color:var(--n-200)}
.btn-secondary:hover{border-color:var(--c-navy)}
.btn-danger{background:var(--c-crimson);color:#fff}     /* solo acciones destructivas/alerta */
.btn:focus-visible{outline:2px solid var(--c-navy);outline-offset:2px}
.btn:disabled{opacity:.5;cursor:default}
```
**Enlaces** — `color:var(--c-navy);text-underline-offset:2px`; subrayado en hover/focus; foco visible.

**Tablas** (tratamiento editorial)
```css
table{border-collapse:collapse;font:var(--t-sm) var(--f-sans)}
thead th{text-align:left;font-weight:700;color:var(--n-500);font-size:var(--t-xs);
         letter-spacing:.06em;text-transform:uppercase;border-bottom:2px solid var(--c-navy);padding:9px 11px}
tbody td{padding:7px 11px;border-bottom:1px solid var(--n-100)}
tbody tr:nth-child(even){background:rgba(15,23,42,.015)}   /* cebra sutil */
td.num{text-align:right;font-variant-numeric:tabular-nums}
```
**Nota de fuente** — `font:var(--t-xs) var(--f-sans);color:var(--n-400)`, prefijo **"Fuente:"**.
Obligatoria bajo todo dato/gráfico/tabla.

**Badges / etiquetas** — `border-radius:var(--r-xs)` (NO pill), borde fino, sin relleno saturado:
`background:rgba(31,56,100,.08);color:var(--c-navy);padding:2px 8px;font-size:var(--t-xs);font-weight:700`.

**Semáforo de metas** (estado — nunca solo color: ícono + texto)
| Estado | Color | Ícono | Etiqueta |
|---|---|---|---|
| Logrado / cumplido | `--s-logrado` | `ico-check` | "Logrado" |
| En proceso | `--s-proceso` | `ico-cycle` | "En proceso" |
| Crítico / sin avance | `--s-critico` | `ico-warning` | "Crítico" |

## 6 · Composición y grid
- Ancho de lectura **≤ 70ch**; márgenes consistentes; **ritmo vertical uniforme**.
- Organizar con **filetes y numeración**, no con tarjetas elevadas. El blanco es herramienta, no relleno.
- Detalle editorial: numeración de sección, reglas, pies de fuente, buen tratamiento de tablas.

## 7 · Do's & Don'ts
**Sí** — tipografía como jerarquía · color con parquedad y significado · filetes finos ·
cifras tabulares · íconos de línea coherentes · contraste AA · pies de fuente.
**No (PROHIBIDO)** — gradientes decorativos · glassmorphism/blur/glow · esquinas muy
redondeadas uniformes · sombras difusas ("card soup") · emojis como íconos · centrado total /
héroes gigantes / pills por doquier · paletas saturadas tipo Tailwind · animación o ilustración
decorativa sin función. *Si una decisión acerca el resultado a una landing de startup, es la
decisión equivocada.*

## 8 · Visualización de datos
Paleta Okabe-Ito (CVD-safe), secuencial/divergente, reglas de grises y etiqueta directa,
tratamiento de ejes/grilla/leyenda/fuente y preset Chart.js: ver `datos/guia-visualizacion.md`
y las plantillas `datos/tpl-*.svg`.
