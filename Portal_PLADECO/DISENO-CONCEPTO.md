# Concepto de Diseño · Portal PLADECO Rengo 2025-2035

> Carta de diseño que gobierna **toda** decisión visual del portal. Referentes:
> **GOV.UK Design System**, **U.S. Web Design System (USWDS)** y la tradición del
> **diseño editorial institucional**. Carácter buscado: que el portal pueda sentarse
> junto a un documento de la OCDE o CEPAL sin desentonar. **Editorial, institucional,
> atemporal** (debe envejecer bien en el horizonte 2025-2035).
>
> Regla de coherencia: **si una decisión contradice este concepto, no se toma.**

---

## 1 · Principio rector (una frase)
**Un instrumento de Estado, no una vitrina:** la jerarquía la construyen la **tipografía,
la retícula y el espacio en blanco** —nunca el ornamento— y el **color es señal, no
decoración**.

## 2 · Lógica tipográfica
- **Source Serif 4** (serif con autoridad pública) para **títulos** → transmite autoridad
  institucional, no "sans por defecto de IA".
- **Inter** (sans neutra y robusta, cifras tabulares) para **cuerpo y datos**.
- El orden visual nace de **tamaño, peso e interlineado** en escala modular, con **ritmo
  vertical uniforme**. Texto **alineado a la izquierda**; nunca centrar bloques largos ni
  héroes con una sola frase gigante.

## 3 · Lógica de color (funcional y restringida)
- **~90 % de la interfaz es neutra**: papel, tintas, grises. Densidad cromática baja =
  seriedad percibida.
- **Navy `#1F3864`** → estructura, títulos, filetes, foco.
- **Crimson `#990000`** → énfasis institucional puntual y alertas.
- **Verde** → restringido a *estado* (meta lograda); no decora.
- **Prohibido:** gradientes "bonitos" sin función, paletas saturadas tipo Tailwind. El
  color aparece **donde guía o significa**.

## 4 · Lógica de íconos
- **Un único set SVG de línea**, monocromático (`currentColor`), trazo uniforme (~1.7px),
  tamaño ligado al texto (≈1em), alineado a la rejilla tipográfica.
- **Reemplaza los emojis.** El ícono acompaña, no compite.
- Implementado como **sprite** (`<symbol>` en el `<body>`), consumido con
  `<svg class="ico"><use href="#ico-…"></svg>`. La clase `.ico` vive en `institucional.css`.

## 5 · Organización sin tarjetas elevadas
- El contenido se ordena con **filetes finos (1px), reglas tipográficas, numeración de
  sección y espacio en blanco** — no con "card soup".
- Tarjetas (cuando existan): **borde fino + radio pequeño (≤6–7px) y sin sombra difusa**.
- La **elevación** se reserva para lo realmente flotante (modales, menús, popovers).
- Separadores sobrios en lugar de cajas de color.

---

## Sistema implementado (fundación · v45.204)
Archivo `institucional.css` (cargado para ganar la cascada de tokens):

| Token | Antes | Ahora | Razón |
|---|---|---|---|
| `--radius` | 10px | **6px** | radios mesurados |
| `--r-lg` / `--r-md` / `--r-sm` / `--r-xs` | 16/12/8/4 | **10/7/5/3** | escala sobria |
| `--sh-md` / `--sh-lg` / `--sh-elev` | difusas | **contenidas** | sin "card soup" |
| `.tn-utils-group` | glass `blur(6px)` | **sólido + filete** | sin glassmorphism |

**Sprite de íconos (8 símbolos):** `ico-search`, `ico-moon`, `ico-book`, `ico-doc`,
`ico-map`, `ico-chart`, `ico-info`, `ico-arrow`. Chrome global ya migrado (buscar/tema/LF).

---

## Auto-revisión contra la lista PROHIBIDO (criterio de rechazo)
Revisión declarada de **lo que esta capa de fundación añade**:

| Señal prohibida | ¿La introduje? | Acción |
|---|---|---|
| Gradientes decorativos | **No** | 0 añadidos. (Los 383 heredados → pase editorial por fases) |
| Glassmorphism / blur / glow | **No** | **Eliminé** el blur del topbar |
| Esquinas muy redondeadas | **No** | **Reduje** radios (tokens + grupo) |
| Sombras difusas "card soup" | **No** | **Reduje** sombras (tokens + grupo) |
| Emojis como íconos | **No** | **Reemplacé** los 3 del chrome; sistema SVG instaurado |
| Centrar todo / héroe gigante / pills / contadores | **No** | 0 añadidos |
| Paletas saturadas | **No** | Solo navy/crimson + neutros |
| Animaciones decorativas | **No** | 0 añadidas |

**Declaración honesta:** la capa que entregué **no contiene ninguna señal de estética
genérica de IA**. Pero el portal **todavía conserva** ~383 gradientes, ~510 sombras y
numerosos emojis heredados: **no están aún eliminados**. Hacerlo de forma segura es un
**pase editorial por sección**, no un override global a la fuerza (que rompería gradientes
funcionales —barras KPI, líneas de tiempo—, elevaciones necesarias y legibilidad, justo el
error que el brief advierte). Por eso se entrega por fases.

---

## Hoja de ruta del rediseño (por fases)
- **Fase 1 — HECHA (v45.204):** fundación segura — tokens sobrios + sistema de íconos SVG +
  fin del glassmorphism del topbar. Reversible (un archivo).
- **Fase 2 — Migración de íconos:** sustituir los emojis restantes (cabeceras de sección,
  KPIs, navegación, listas) por íconos del set SVG, sección por sección.
- **Fase 3 — Gradientes y sombras:** revisar los 383 gradientes y ~510 sombras; conservar
  los **funcionales** (barras, mapas de calor, datos), neutralizar los **decorativos** hacia
  superficies planas con filete.
- **Fase 4 — Polish editorial:** numeración de sección (`.sec-num`), filetes y reglas
  tipográficas, tratamiento de tablas, ojos de cita, pies de fuente — "la calidad en lo
  pequeño".
- **Fase 5 — Auditoría de coherencia:** recorrido completo claro/oscuro contra este concepto;
  corregir toda desviación.

> **Prioridad:** ninguna fase posterior puede introducir una señal de la lista PROHIBIDO.
> Cada fase termina con la auto-revisión declarada arriba.
