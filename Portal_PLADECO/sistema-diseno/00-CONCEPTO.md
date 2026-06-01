# Sistema de Diseño Visual · PLADECO Rengo 2025-2035
## PASO 0 — Concepto de diseño

> Instrumento oficial de planificación de gobierno local. Debe poder coexistir, sin
> desentonar, con material de OCDE, CEPAL o un servicio público de primer nivel, y
> **envejecer bien hasta 2035**. Referentes: GOV.UK Design System, U.S. Web Design System
> (USWDS), tradición del diseño editorial e infográfico institucional.
>
> **Las 6 piezas son una sola familia.** Esta página es la regla; si una decisión la
> contradice, no se toma.

---

### Principio rector (una frase)
**Un instrumento de Estado, no una vitrina:** la jerarquía la construyen la **tipografía, la
retícula y el espacio en blanco** —nunca el ornamento—, y el **color es señal, no decoración**.

### Lógica tipográfica
- **Source Serif 4** (serif editorial) para **títulos y cifras de portada** → autoridad pública.
- **Inter** (sans neutra y robusta, **cifras tabulares**) para **cuerpo, datos, ejes y etiquetas**.
- El orden nace de **tamaño, peso e interlineado** en una escala modular con ritmo vertical
  uniforme. Texto **alineado a la izquierda**; nunca centrar bloques largos ni héroes de una frase.

### Lógica de color
- **~90 % neutro**: papel, tintas y grises. Densidad cromática baja = seriedad percibida.
- **Navy `#1F3864`** → estructura, títulos, filetes, foco, *serie/dato principal*.
- **Crimson `#990000`** → énfasis institucional puntual, alerta, *dato crítico*.
- **Verde `#1b6e3a`** → único color de **estado "logrado"** (no decora). Ámbar `#b45309` = "en proceso".
- **Prohibido**: gradientes decorativos, paletas saturadas. El color aparece **donde guía o significa**.
- **Datos**: paleta categórica **Okabe-Ito** (segura para daltonismo); el color **nunca** es el
  único portador de significado (se acompaña de etiqueta, forma o patrón).

### Lógica de iconografía
- **Un set SVG de línea** único: grilla **24×24**, trazo **1.7**, terminaciones y uniones
  **redondeadas**, monocromático (**`currentColor`**), tamaño ligado al texto (~1em).
- **Reemplaza los emojis.** El ícono acompaña, no compite; decorativo → `aria-hidden`.

### Lógica de composición (sin tarjetas elevadas)
- El contenido se ordena con **filetes finos (1px), reglas tipográficas, numeración de sección
  y espacio en blanco** — no con "card soup" ni sombras difusas.
- Tarjetas (si existen): **borde fino + radio pequeño (≤6–7px), sin sombra difusa**.
- La **elevación** se reserva para lo realmente flotante (modales, menús).
- **Detalle editorial**: numeración, filetes, pies de fuente, buen tratamiento de tablas.

### Regla final
**Institucional sobre llamativo · editorial sobre decorativo · sistema sobre piezas sueltas.**
Si una decisión acerca el resultado a una *landing* de startup, es la decisión equivocada.
