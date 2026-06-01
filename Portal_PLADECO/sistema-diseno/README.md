# Sistema de Diseño Visual · PLADECO Rengo 2025-2035

Paquete del sistema de diseño del Portal Estratégico. **Una familia visual coherente**:
misma paleta, tipografía, grosor de línea y lógica compositiva en todas las piezas.

```
sistema-diseno/
├── 00-CONCEPTO.md            · Paso 0 — concepto rector (rige todo)
├── tokens.css                · color + tipografía + paleta de datos (fuente única)
├── iconos/
│   ├── sprite.svg            · Pieza 1 — 51 íconos de línea (standalone)
│   └── mapeo-emojis.md       · spec del set + tabla emoji → ícono + reglas de uso
├── diagramas/                · Pieza 2 — 4 diagramas conceptuales (SVG)
│   ├── 01-ciclo-comprender-implementar.svg
│   ├── 02-mbht-dimensiones.svg
│   ├── 03-ejes-objetivos.svg
│   └── 04-gobernanza-sna.svg
├── datos/                    · Pieza 3 — estilo de visualización de datos
│   ├── guia-visualizacion.md
│   ├── tpl-barras.svg · tpl-lineas.svg · tpl-coropletico.svg
├── infografia/               · Pieza 4 — "el PLADECO en una página"
│   ├── pladeco-og-1200x630.svg   (web / OG image · dark)
│   └── pladeco-a4.svg            (impresión · papel)
├── mapa/                     · Pieza 6 — mapa identitario
│   ├── mapa-rengo-estructura.svg (silueta comunal real)
│   └── README.md                 (spec del GeoJSON de las 21 UV)
├── MANUAL-IDENTIDAD.md       · Pieza 5 — manual del sistema (formal)
└── README.md                 · este índice + autocrítica + hoja de ruta
```

## Estado de las 6 piezas
| # | Pieza | Estado |
|---|---|---|
| 0 | **Concepto de diseño** | ✅ entregado (`00-CONCEPTO.md`) |
| — | **Tokens compartidos** | ✅ entregado (`tokens.css`) — la columna de coherencia |
| 1 | **Sistema de íconos SVG** | ✅ entregado **y ya en producción** (sprite inline + standalone + mapeo) |
| 2 | **Diagramas conceptuales** | ✅ entregado (4 SVG autocontenidos) |
| 3 | **Estilo de visualización de datos** | ✅ entregado (`datos/`: guía + 3 plantillas SVG: barras, líneas, coroplético). Falta solo aplicar el preset a los 73 gráficos Chart.js |
| 4 | **Infografía "el PLADECO en una página"** | ✅ entregado (`infografia/`: OG 1200×630 dark + A4 papel) |
| 5 | **Manual de identidad** | ✅ entregado (`MANUAL-IDENTIDAD.md`: principio, paleta+WCAG, tipografía, íconos, **componentes con estados**, grid, do's/don'ts, datos) |
| 6 | **Mapa identitario** | ✅ silueta comunal real entregada (`mapa/`); subdivisión en 21 UV pendiente del GeoJSON del equipo (spec incluida) |

## Coherencia (familia visual)
Todas las piezas comparten: **paleta** (navy `#1F3864` / crimson `#990000` / neutros, vía
`tokens.css`), **tipografía** (Source Serif 4 títulos · Inter cuerpo/datos), **grosor de línea
1.7** (íconos y diagramas), y **lógica compositiva** (alineación izquierda, filetes finos,
numeración, sin tarjetas elevadas). Los diagramas reutilizan los íconos de la Pieza 1.

## Autocrítica contra la lista PROHIBIDO ✔ (revisión realizada)
| Señal prohibida | ¿Presente? | Evidencia |
|---|---|---|
| Gradientes decorativos | **No** | Tokens sin gradientes; diagramas planos (tinta + 1 acento navy) |
| Glassmorphism / blur / glow / neón | **No** | Ninguna pieza usa `backdrop-filter` ni sombras de brillo |
| Esquinas muy redondeadas | **No** | Radios ≤7px (`--r-*`); cajas de diagrama rx 6–7 |
| Sombras difusas ("card soup") | **No** | Diagramas con **filetes finos**, sin `box-shadow` |
| Emojis como íconos | **No** | La Pieza 1 los **reemplaza**; tabla de mapeo incluida |
| Centrado total / héroe gigante / pills | **No** | Diagramas **alineados a la izquierda**, editoriales |
| Paletas saturadas tipo Tailwind | **No** | Navy/crimson/neutros + **Okabe-Ito justificada** (no Tailwind por defecto) |
| Animación/ilustración decorativa | **No** | SVG estáticos y funcionales |

**Declaración:** revisé las piezas contra la lista; no aparece ninguna señal de estética
genérica de IA.

## Autocrítica WCAG 2.1 AA ✔
- **Contraste de texto (sobre papel):** navy 10.9:1 · crimson 7.4:1 · verde `#1b6e3a` 5.6:1 ·
  ámbar `#b45309` 4.6:1 · tinta-500 7:1 · tinta-400 4.9:1 — **todos ≥4.5:1 (AA)**. Los grises
  claros (`--n-200/300`) se usan **solo** para filetes/no-texto (≥3:1 o decorativo).
- **Modo oscuro:** variantes aclaradas (`--d-navy` 6.5:1, `--d-crimson` 5.4:1, `--d-logrado`)
  sobre `#0b1624`, todas ≥4.5:1.
- **Daltonismo:** paleta de datos **Okabe-Ito** (diseñada para CVD); el color **nunca** es el
  único portador de significado → el Diagrama 4 distingue actores por **forma** (círculo/
  cuadrado/rombo) y vínculos por **estilo de línea** (sólida/discontinua/punteada).
- **Impresión B/N:** los diagramas usan `currentColor` (→ negro sobre blanco) + jerarquía por
  peso/posición/forma; legibles sin color. El coroplético usa rampa de **luminancia** (legible
  en escala de grises).

## Hoja de ruta de implementación
1. **Íconos (Pieza 1)** — ✅ *ya integrado* en el portal (sprite inline, 51 íconos; emojis de
   chrome, navegación y 686 en texto ya reemplazados).
2. **Diagramas (Pieza 2)** — integrar cada SVG en su sección: `01`→Bienvenida/Proceso ·
   `02`→MBHT · `03`→Matriz · `04`→SNA-Gobernanza. (Inline `<svg>` o `<img>`; pesan <4 KB c/u.)
3. **Estilo de datos (Pieza 3)** — aplicar `tokens.css` (`--dv-*`, `--seq-*`, `--div-*`) a la
   config de los 73 gráficos (Chart.js): paleta, ejes, grilla, leyenda, fuente. **Próximo entregable.**
4. **Infografía (Pieza 4)** — componer OG 1200×630 + A4 con íconos + diagramas. **Próximo.**
5. **Manual (Pieza 5)** — consolidar concepto + tokens + íconos + componentes + do's/don'ts.
6. **Mapa de UV (Pieza 6)** — **requiere del equipo: GeoJSON o shapefile de los límites de las
   21 unidades vecinales** (9 urbanas + 12 rurales). Sin esa geometría real **no se inventan
   límites**: se entrega el frame y el estilo, y se completa al recibir el archivo.

### Insumo pendiente del equipo
- `unidades-vecinales.geojson` (FeatureCollection; cada feature = 1 UV con `nombre`/`numero`).
  Con eso, la Pieza 6 se genera en el estilo del sistema. (Ya existe `rengo-limite.geojson` con
  el límite comunal, pero **no** la subdivisión por UV.)
