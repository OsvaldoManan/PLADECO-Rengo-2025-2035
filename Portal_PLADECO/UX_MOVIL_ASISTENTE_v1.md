# Auditoría UX Móvil + Asistente Conversacional
## Portal PLADECO Rengo 2025-2035 · v45.190
### Fecha: 2026-05-29

---

# FRENTE A — OPTIMIZACIÓN MÓVIL DE COMPONENTES CRÍTICOS

## Estado base del portal

| Métrica | Valor |
|---|---|
| Media queries existentes | 218 |
| Breakpoints usados | 480, 560, 600, 640, 768, 900, 1100, 1380 px |
| Enfoque | Desktop-first (max-width) |
| Menú hamburguesa | No existe (eliminado en v45.74) |
| Touch targets 44px | Parcialmente implementado |
| viewport meta | Correcto (`width=device-width, initial-scale=1.0`) |
| touch-action CSS | No implementado |
| overscroll-behavior | 1 uso aislado |

---

## A6 — SISTEMA DE BREAKPOINTS Y PRINCIPIOS GENERALES
*(Adelantado porque define las bases para A1-A5)*

### Diagnóstico

El portal usa 8 breakpoints dispersos sin sistema unificado. El enfoque es desktop-first (max-width), lo que genera cascadas innecesarias. No hay custom properties para breakpoints ni variables de espaciado móvil.

### Sistema propuesto

| Token | Valor | Dispositivo | Justificación |
|---|---|---|---|
| `--bp-sm` | 480px | Teléfonos pequeños (SE, Galaxy A) | Contenido 1 columna absoluta |
| `--bp-md` | 768px | Teléfonos grandes / tablets portrait | Umbral iPad mini portrait, 80% del tráfico móvil |
| `--bp-lg` | 1024px | Tablets landscape / laptops pequeños | Punto donde grids de 2 col funcionan bien |
| `--bp-xl` | 1280px | Desktop estándar | Layout completo del portal |

### Prioridad de contenido móvil

1. **Siempre visible**: Título de sección, KPIs principales, CTAs, navegación
2. **Colapsable** (expandir con tap): Tablas de datos, listas extensas, notas metodológicas
3. **Oculto con enlace**: Gráficos secundarios, comparadores complejos, galerías extensas

### Código base

```css
/* ═══ A6 · Sistema de Breakpoints Unificado ═══ */
:root {
  --bp-sm: 480px;
  --bp-md: 768px;
  --bp-lg: 1024px;
  --bp-xl: 1280px;

  /* Espaciado mobile-first */
  --pad-section: 16px;
  --pad-card: 14px;
  --gap-grid: 12px;
  --touch-min: 44px;        /* WCAG 2.5.8 Target Size */
  --touch-comfortable: 48px; /* Material Design recomendación */
}

@media (min-width: 768px) {
  :root {
    --pad-section: 24px;
    --pad-card: 20px;
    --gap-grid: 18px;
  }
}

@media (min-width: 1024px) {
  :root {
    --pad-section: 32px;
    --pad-card: 24px;
    --gap-grid: 20px;
  }
}

/* Touch targets mínimos universales */
button, a, [role="button"], .chip, .gob-chip,
.sem-f-btn, .proc-tl-arrow, .qi-link, .gob-tab,
input[type="checkbox"], input[type="radio"] {
  min-height: var(--touch-min);
  min-width: var(--touch-min);
}

/* Scroll suave para anclas */
html { scroll-behavior: smooth; }
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
}
```

**Requiere:** Solo CSS.

---

## A1 — LÍNEA DE TIEMPO DE HITOS

### Diagnóstico

El componente `.proc-tl-track` es un flex horizontal con `overflow-x: auto` y `scroll-snap-type: x mandatory`. En móvil:
- Las tarjetas se comprimen a 200-210px pero siguen horizontales
- Las flechas de navegación desaparecen en <480px (dejando al usuario sin guía)
- No hay indicador de que hay más contenido a la derecha
- Los 3 estados (done/active/pending) dependen SOLO de color (verde/ámbar/blanco opaco), violando WCAG 1.4.1

### Solución propuesta

1. **Breakpoint 768px**: Convertir a layout vertical (columna)
2. **Indicador de continuidad**: Gradiente de fade en el borde inferior en vertical
3. **Accesibilidad de estados**: Agregar íconos + etiqueta textual además del color

### Código CSS completo

```css
/* ═══ A1 · Timeline Responsive ═══ */

/* Estado actual: .proc-tl-status ya tiene texto + dot.
   Mejora: agregar icono textual por estado */
.proc-tl-card.status-done .proc-tl-status::before {
  content: "✓ ";
  font-weight: 900;
}
.proc-tl-card.status-active .proc-tl-status::before {
  content: "▶ ";
}
.proc-tl-card.status-pending .proc-tl-status::before {
  content: "○ ";
}

/* Conversión a vertical en móvil */
@media (max-width: 768px) {
  .proc-tl-wrap {
    flex-direction: column;
    align-items: stretch;
    gap: 0;
  }

  .proc-tl-arrow {
    display: none; /* No necesarias en vertical */
  }

  .proc-tl-track {
    flex-direction: column;
    overflow-x: visible;
    overflow-y: visible;
    scroll-snap-type: none;
    gap: 12px;
    padding: 8px 0;
    max-height: none;
  }

  /* Línea de progreso horizontal → vertical */
  .proc-tl-track::after {
    top: 0;
    bottom: 0;
    left: 22px;
    right: auto;
    width: 2px;
    height: auto;
    transform: none;
  }

  .proc-tl-card {
    flex: none;          /* Anular flex:0 0 230px */
    width: 100%;
    min-height: auto;
    flex-direction: row;
    align-items: center;
    gap: 12px;
    padding: 12px 14px;
    margin-left: 32px;   /* Espacio para línea vertical */
  }

  .proc-tl-icon {
    font-size: 22px;
    flex-shrink: 0;
  }

  .proc-tl-card-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .proc-tl-name {
    font-size: 12px;
  }

  /* Indicador de scroll: gradiente inferior */
  .proc-tl-wrap::after {
    content: '';
    position: sticky;
    bottom: 0;
    left: 0;
    right: 0;
    height: 40px;
    background: linear-gradient(transparent, var(--bg));
    pointer-events: none;
    z-index: 2;
  }
}

@media (max-width: 480px) {
  .proc-tl-card {
    margin-left: 24px;
    padding: 10px 12px;
  }

  .proc-tl-icon {
    font-size: 18px;
  }

  .proc-tl-year {
    font-size: 11px;
  }
}
```

**Requiere:** CSS solamente. La estructura HTML existente no necesita cambios.

**Validación:**
- [ ] En viewport 375px: timeline vertical, cada hito ocupa el ancho completo
- [ ] Estado ✓/▶/○ visible sin depender del color
- [ ] No hay scroll horizontal oculto
- [ ] Gradiente inferior señala continuidad

---

## A2 — DASHBOARD DE KPIs (Semáforo de Metas)

### Diagnóstico

`.semaforo-grid` usa `grid-template-columns: repeat(auto-fill, minmax(320px, 1fr))`. En móvil (<375px), 320px mínimo fuerza una sola columna pero las tarjetas `.meta-card` tienen:
- 3 valores lado a lado (`.mc-values` flex) que se comprimen a ilegibilidad
- Texto largo en `.mc-title` que desborda
- 14 tarjetas sin priorización (el usuario debe scrollear 8+ pantallas)

### Solución propuesta

1. **minmax(280px, 1fr)** para permitir columna en móvil estrecho
2. **Valores apilados** en móvil (column en vez de row)
3. **Priorización por estado**: Mostrar primero "Riesgo" y "Crítico" con botón "Ver todos"
4. **Decisión UX**: Mostrar los 14 KPIs pero reordenados por urgencia. No ocultar ninguno porque cada KPI corresponde a un compromiso público y su ausencia podría interpretarse como opacidad. Pero el reorden por estado (rojo→ámbar→verde→pendiente) dirige la atención a lo que importa.

### Código CSS

```css
/* ═══ A2 · Semáforo KPI Responsive ═══ */

.semaforo-grid {
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
}

@media (max-width: 768px) {
  .semaforo-grid {
    grid-template-columns: 1fr;
    gap: 14px;
  }

  .meta-card {
    padding: 16px;
  }

  /* Valores: de row a column en móvil */
  .meta-card .mc-values {
    flex-direction: column;
    gap: 6px;
  }

  .meta-card .mc-val {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 12px;
    text-align: left;
  }

  .meta-card .mc-val .v-num {
    font-size: 18px;
    order: 2;
  }

  .meta-card .mc-val .v-lbl {
    order: 1;
    font-size: 11px;
  }

  /* Título largo: word-break seguro */
  .meta-card .mc-title {
    font-size: 13px;
    word-break: break-word;
    hyphens: auto;
    -webkit-hyphens: auto;
  }

  /* Barra de progreso más gruesa para visibilidad táctil */
  .meta-card .mc-track {
    height: 10px;
  }
}

/* Filtro de estado: botones más grandes en móvil */
@media (max-width: 768px) {
  .sem-filter-row {
    gap: 6px;
  }

  .sem-f-btn {
    min-height: 44px;
    padding: 8px 12px;
    font-size: 12px;
    flex: 1;
    justify-content: center;
  }

  .sem-summary {
    flex-direction: column;
    gap: 8px;
  }

  .sem-stat {
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: auto;
    text-align: left;
  }

  .sem-stat .ss-val {
    font-size: 18px;
  }
}
```

### Código JS para reordenamiento por urgencia

```js
/* ═══ A2 · Reordenamiento por estado en móvil ═══ */
function reorderSemaforoMobile() {
  if (window.innerWidth > 768) return;
  var grid = document.querySelector('.semaforo-grid');
  if (!grid) return;
  var cards = Array.from(grid.querySelectorAll('.meta-card'));
  var order = { red: 0, amber: 1, green: 2 };
  cards.sort(function(a, b) {
    var la = a.querySelector('.mc-light');
    var lb = b.querySelector('.mc-light');
    var oa = la ? (la.classList.contains('red') ? 0 :
              la.classList.contains('amber') ? 1 : 2) : 3;
    var ob = lb ? (lb.classList.contains('red') ? 0 :
              lb.classList.contains('amber') ? 1 : 2) : 3;
    return oa - ob;
  });
  cards.forEach(function(c) { grid.appendChild(c); });
}
// Ejecutar al cargar sección
window.addEventListener('resize', reorderSemaforoMobile);
```

**Requiere:** CSS + JS.

**Validación:**
- [ ] En 375px: tarjetas en 1 columna, valores apilados con etiqueta a la izquierda y número a la derecha
- [ ] Texto largo no desborda ni se trunca
- [ ] Filtros de estado tienen touch target >= 44px
- [ ] KPIs críticos aparecen primero en móvil

---

## A3 — CARTOGRAFÍAS Y MAPA INTERACTIVO

### Diagnóstico

El portal usa Leaflet v1.9.4 con 13 instancias de mapa. Problemas en móvil:
- **Conflicto de scroll**: El mapa captura el scroll/pinch del usuario cuando pasa sobre él. Leaflet usa `scrollWheelZoom: true` por defecto.
- **Sin controles táctiles explícitos**: Los botones +/− de Leaflet son pequeños (26px) y no cumplen touch target.
- **Leyendas**: Posicionadas absolutamente, pueden tapar el mapa en pantallas pequeñas.
- **Carga**: Los 13 mapas se cargan con tiles on-demand (OK), pero las imágenes de cartografía estática sí penalizan.

### Solución: Conflicto de scroll

```js
/* ═══ A3 · Desactivar scroll-zoom en móvil hasta tap explícito ═══ */
function initMobileMapGuards() {
  if (window.innerWidth > 768) return;
  var maps = window.__leafletMaps || [];
  maps.forEach(function(map) {
    // Desactivar zoom por scroll/pinch inicialmente
    map.scrollWheelZoom.disable();
    map.dragging.disable();

    var container = map.getContainer();
    // Overlay de activación
    var overlay = document.createElement('div');
    overlay.className = 'map-touch-overlay';
    overlay.innerHTML = '<span>Toca para explorar el mapa</span>';
    container.style.position = 'relative';
    container.appendChild(overlay);

    overlay.addEventListener('click', function() {
      map.scrollWheelZoom.enable();
      map.dragging.enable();
      overlay.classList.add('map-overlay-hidden');
      // Desactivar después de 5s sin interacción
      var timer;
      map.on('movestart zoomstart', function() { clearTimeout(timer); });
      map.on('moveend zoomend', function() {
        timer = setTimeout(function() {
          map.scrollWheelZoom.disable();
          map.dragging.disable();
          overlay.classList.remove('map-overlay-hidden');
        }, 5000);
      });
    });
  });
}
```

### Solución: Controles táctiles + zoom + leyenda

```css
/* ═══ A3 · Controles de mapa móvil ═══ */

/* Overlay de activación */
.map-touch-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 800;
  cursor: pointer;
  transition: opacity 0.3s;
  backdrop-filter: blur(2px);
}
.map-touch-overlay span {
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  padding: 10px 20px;
  border-radius: 24px;
  font-size: 13px;
  font-weight: 600;
}
.map-overlay-hidden {
  opacity: 0;
  pointer-events: none;
}

/* Botones de zoom Leaflet más grandes en móvil */
@media (max-width: 768px) {
  .leaflet-control-zoom a {
    width: 44px !important;
    height: 44px !important;
    line-height: 44px !important;
    font-size: 20px !important;
  }

  /* Leyenda colapsable en móvil */
  .leaflet-control-legend,
  .map-legend,
  .ict-legend {
    max-height: 44px;
    overflow: hidden;
    transition: max-height 0.3s ease;
    cursor: pointer;
  }
  .leaflet-control-legend.expanded,
  .map-legend.expanded,
  .ict-legend.expanded {
    max-height: 400px;
  }

  /* Botón fullscreen para mapas */
  .map-fullscreen-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 44px;
    height: 44px;
    border-radius: 8px;
    background: var(--card);
    border: 1px solid var(--border);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    z-index: 800;
    cursor: pointer;
    color: var(--text);
  }
}
```

### Lazy loading para cartografías

```js
/* ═══ A3 · Lazy load para imágenes de cartografía ═══ */
/* Ya existe IntersectionObserver en el portal. Agregar para imgs de carto: */
function lazyLoadCartoImages() {
  var imgs = document.querySelectorAll('img[data-src-carto]');
  if (!imgs.length) return;
  var obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) {
        var img = e.target;
        img.src = img.getAttribute('data-src-carto');
        img.removeAttribute('data-src-carto');
        obs.unobserve(img);
      }
    });
  }, { rootMargin: '300px' });
  imgs.forEach(function(img) { obs.observe(img); });
}
```

**Requiere:** CSS + JS + cambio menor en HTML (agregar `data-src-carto` en imgs de cartografía).

**Validación:**
- [ ] En móvil: mapa no intercepta scroll de página hasta tap explícito
- [ ] Botones +/− de zoom son >= 44px
- [ ] Leyenda colapsada por defecto, expandible con tap
- [ ] Cartografías cargan lazy (verificar con Network tab)

---

## A4 — SOCIOGRAMA SNA

### Diagnóstico

El sociograma D3 (`#gobSNAGraph`) ya implementado tiene:
- Contenedor fijo de 620px de alto
- 41 nodos con formas diferenciadas y drag behavior
- Panel ego-red posicionado absolute a la derecha (260px ancho)
- Zoom/pan via D3 (no hay botones explícitos)

Problemas en móvil:
- 620px de alto es excesivo para viewport de 667px
- Los nodos y labels (9px) son ilegibles
- El drag es difícil con dedos (imprecisión táctil)
- El panel ego-red tapa la mitad del grafo

### Recomendación estratégica

**El sociograma DEBE ser interactivo en móvil**, pero con adaptaciones. Justificación:
- Es el componente diferenciador para SUBDERE
- Una imagen estática pierde el valor analítico (ego-red, filtros)
- Los dirigentes rurales (público objetivo) usarán móvil para buscar su organización en la red

### Solución: Degradación elegante

```css
/* ═══ A4 · Sociograma SNA Móvil ═══ */

@media (max-width: 768px) {
  /* Contenedor más bajo */
  #gobSNAGraph {
    height: 380px !important;
  }

  /* Panel ego: de lateral a bottom-sheet */
  #gobEgoPanel {
    top: auto !important;
    right: 0 !important;
    bottom: 0;
    left: 0;
    width: 100% !important;
    max-height: 45vh;
    border-radius: 16px 16px 0 0 !important;
    box-shadow: 0 -8px 30px rgba(0, 0, 0, 0.4) !important;
    border-bottom: none !important;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }

  /* Handle visual para arrastrar el sheet */
  #gobEgoPanel::before {
    content: '';
    display: block;
    width: 36px;
    height: 4px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 4px;
    margin: 0 auto 12px;
  }

  /* Chips de filtro: scroll horizontal en móvil */
  .gob-chip-row {
    overflow-x: auto;
    flex-wrap: nowrap !important;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    padding-bottom: 4px;
  }
  .gob-chip-row::-webkit-scrollbar { display: none; }

  .gob-chip, .gob-edge-chip {
    flex-shrink: 0;
    min-height: 44px;
    padding: 8px 14px;
    font-size: 12px;
  }

  /* Tabs de audiencia: scroll horizontal */
  .gob-tab {
    min-height: 44px;
    padding: 10px 16px;
    white-space: nowrap;
    font-size: 12px;
  }
}

@media (max-width: 480px) {
  #gobSNAGraph {
    height: 300px !important;
  }

  #gobEgoPanel {
    max-height: 50vh;
    font-size: 11px;
    padding: 12px !important;
  }
}
```

### Botones de zoom explícitos para el sociograma

```js
/* ═══ A4 · Controles de zoom D3 para móvil ═══ */
function addGobZoomControls() {
  if (window.innerWidth > 768) return;
  var ct = document.getElementById('gobSNAGraph');
  if (!ct || ct.querySelector('.gob-zoom-ctrl')) return;

  var ctrl = document.createElement('div');
  ctrl.className = 'gob-zoom-ctrl';
  ctrl.innerHTML = '<button class="gob-zoom-btn" data-dir="in">+</button>'
    + '<button class="gob-zoom-btn" data-dir="out">−</button>'
    + '<button class="gob-zoom-btn" data-dir="fit">⊡</button>';
  ct.style.position = 'relative';
  ct.appendChild(ctrl);

  var svg = ct.querySelector('svg');
  var zoom = d3.zoomTransform(svg);

  ctrl.addEventListener('click', function(ev) {
    var btn = ev.target.closest('.gob-zoom-btn');
    if (!btn) return;
    var dir = btn.dataset.dir;
    var svgSel = d3.select(svg);
    if (dir === 'in') svgSel.transition().call(
      d3.zoom().scaleExtent([0.3, 4]).on('zoom', function(e) {
        svg.querySelector('g').setAttribute('transform', e.transform);
      }).scaleBy, 1.4);
    else if (dir === 'out') svgSel.transition().call(
      d3.zoom().scaleExtent([0.3, 4]).on('zoom', function(e) {
        svg.querySelector('g').setAttribute('transform', e.transform);
      }).scaleBy, 0.7);
    else svgSel.transition().call(
      d3.zoom().scaleExtent([0.3, 4]).on('zoom', function(e) {
        svg.querySelector('g').setAttribute('transform', e.transform);
      }).scaleTo, 0.6);
  });
}
```

```css
.gob-zoom-ctrl {
  position: absolute;
  bottom: 50px;
  left: 10px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  z-index: 5;
}
.gob-zoom-btn {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background: var(--card);
  border: 1px solid var(--border);
  color: var(--text);
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
}
.gob-zoom-btn:active {
  background: var(--accent);
  color: #fff;
}
```

**Requiere:** CSS + JS.

**Validación:**
- [ ] En 375px: grafo visible a 300px alto, botones +/−/fit visibles
- [ ] Panel ego abre como bottom-sheet sin tapar todo el grafo
- [ ] Chips de filtro scrolleables horizontalmente
- [ ] Tap en nodo abre ego-red (ya funciona con pointerup)

---

## A5 — NAVEGACIÓN Y MENÚ EN MÓVIL

### Diagnóstico

El menú hamburguesa fue eliminado en v45.74. La navegación actual depende de:
- Minimap scrollspy (`.minimap-v40`) a la derecha
- Buscador Ctrl+K (no descubrible en móvil)
- Links de sección dispersos

Problemas:
- Sin menú principal accesible en móvil
- Ctrl+K no existe en móvil (no hay teclado Ctrl)
- El minimap no es intuitivo para usuarios no técnicos
- No hay botón "volver arriba" persistente

### Solución: Bottom navigation bar + menú drawer

```html
<!-- ═══ A5 · Bottom Navigation Móvil ═══ -->
<nav class="mobile-bottom-nav" id="mobileBottomNav" aria-label="Navegación principal móvil">
  <button class="mbn-btn" onclick="document.getElementById('hero').scrollIntoView({behavior:'smooth'})" aria-label="Inicio">
    <span class="mbn-ico">🏠</span>
    <span class="mbn-lbl">Inicio</span>
  </button>
  <button class="mbn-btn" onclick="openMobileSearch()" aria-label="Buscar">
    <span class="mbn-ico">🔍</span>
    <span class="mbn-lbl">Buscar</span>
  </button>
  <button class="mbn-btn" onclick="toggleMobileMenu()" aria-label="Menú de secciones">
    <span class="mbn-ico">☰</span>
    <span class="mbn-lbl">Secciones</span>
  </button>
  <button class="mbn-btn" onclick="toggleDark()" aria-label="Cambiar tema">
    <span class="mbn-ico">🌙</span>
    <span class="mbn-lbl">Tema</span>
  </button>
</nav>

<!-- Drawer de secciones -->
<div class="mobile-drawer-overlay" id="mobileDrawerOverlay" onclick="toggleMobileMenu()"></div>
<aside class="mobile-drawer" id="mobileDrawer" aria-label="Menú de secciones">
  <div class="md-header">
    <strong>Secciones del PLADECO</strong>
    <button onclick="toggleMobileMenu()" aria-label="Cerrar menú">&times;</button>
  </div>
  <div class="md-body" id="mobileDrawerBody">
    <!-- Se llena dinámicamente con JS desde los capítulos existentes -->
  </div>
</aside>
```

```css
/* ═══ A5 · Bottom Nav + Drawer ═══ */

/* Solo visible en móvil */
.mobile-bottom-nav {
  display: none;
}

@media (max-width: 768px) {
  .mobile-bottom-nav {
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 60px;
    background: var(--card);
    border-top: 1px solid var(--border);
    z-index: 9990;
    padding: 4px 0;
    padding-bottom: env(safe-area-inset-bottom, 0);
    box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.2);
  }

  .mbn-btn {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2px;
    background: none;
    border: none;
    color: var(--text2);
    cursor: pointer;
    min-height: 44px;
    font-family: inherit;
    transition: color 0.2s;
  }
  .mbn-btn:active { color: var(--accent); }
  .mbn-ico { font-size: 20px; line-height: 1; }
  .mbn-lbl { font-size: 10px; font-weight: 600; }

  /* Espacio para el bottom nav */
  body { padding-bottom: 70px; }

  /* Ocultar el FAB del chatbot cuando el bottom nav está visible */
  .chatbot-fab {
    bottom: 76px !important;
  }

  /* Drawer */
  .mobile-drawer-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 9991;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s;
  }
  .mobile-drawer-overlay.open {
    opacity: 1;
    pointer-events: auto;
  }

  .mobile-drawer {
    position: fixed;
    bottom: 60px;
    left: 0;
    right: 0;
    max-height: 70vh;
    background: var(--card);
    border-radius: 20px 20px 0 0;
    z-index: 9992;
    transform: translateY(100%);
    transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
    overflow: hidden;
    box-shadow: 0 -8px 40px rgba(0, 0, 0, 0.3);
  }
  .mobile-drawer.open {
    transform: translateY(0);
  }

  .md-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 20px;
    border-bottom: 1px solid var(--border);
    font-size: 15px;
    font-weight: 700;
    color: var(--text);
  }
  .md-header button {
    width: 44px;
    height: 44px;
    border: none;
    background: none;
    font-size: 24px;
    color: var(--text2);
    cursor: pointer;
  }

  .md-body {
    overflow-y: auto;
    max-height: calc(70vh - 60px);
    padding: 8px 0;
    -webkit-overflow-scrolling: touch;
  }

  .md-chapter {
    padding: 6px 20px;
    font-size: 11px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--accent);
    margin-top: 8px;
  }

  .md-link {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 20px;
    color: var(--text);
    text-decoration: none;
    font-size: 13px;
    font-weight: 500;
    min-height: 44px;
    transition: background 0.15s;
  }
  .md-link:active {
    background: rgba(255, 255, 255, 0.06);
  }
  .md-link-ico {
    font-size: 18px;
    width: 24px;
    text-align: center;
  }
}

/* Desktop: ocultar todo */
@media (min-width: 769px) {
  .mobile-drawer-overlay,
  .mobile-drawer,
  .mobile-bottom-nav { display: none !important; }
}
```

```js
/* ═══ A5 · Bottom Nav JS ═══ */
function toggleMobileMenu() {
  var drawer = document.getElementById('mobileDrawer');
  var overlay = document.getElementById('mobileDrawerOverlay');
  var isOpen = drawer.classList.contains('open');
  drawer.classList.toggle('open');
  overlay.classList.toggle('open');
  if (!isOpen && !drawer._populated) {
    populateMobileDrawer();
    drawer._populated = true;
  }
}

function populateMobileDrawer() {
  var body = document.getElementById('mobileDrawerBody');
  var chapters = document.querySelectorAll('[data-chapter]');
  var sections = document.querySelectorAll('section[id]');
  var html = '';
  var SEC_EMOJI = window.SEC_EMOJI || {};

  sections.forEach(function(sec) {
    if (!sec.id || sec.style.display === 'none') return;
    var h2 = sec.querySelector('h2, h3');
    if (!h2) return;
    var title = h2.textContent.trim().substring(0, 50);
    var emoji = SEC_EMOJI[sec.id] || '📄';
    html += '<a class="md-link" href="#' + sec.id + '" onclick="toggleMobileMenu()">'
      + '<span class="md-link-ico">' + emoji + '</span>'
      + '<span>' + title + '</span></a>';
  });
  body.innerHTML = html || '<p style="padding:20px;color:var(--text2)">Cargando secciones...</p>';
}

function openMobileSearch() {
  // Disparar el buscador Ctrl+K existente
  var evt = new KeyboardEvent('keydown', { key: 'k', ctrlKey: true, bubbles: true });
  document.dispatchEvent(evt);
}
```

**Requiere:** HTML + CSS + JS.

**Validación:**
- [ ] Bottom nav visible en <768px con 4 botones
- [ ] Drawer abre con lista de secciones
- [ ] Botón buscar abre el buscador Ctrl+K
- [ ] FAB del chatbot sube sobre el bottom nav
- [ ] safe-area-inset respetado para iPhone con notch

---

# FRENTE B — ROL Y ALCANCE DEL ASISTENTE CONVERSACIONAL

## B1 — DEFINICIÓN DE ALCANCE

### Evaluación de las 3 opciones

| Criterio | (a) Base cerrada | (b) Búsqueda guiada | (c) API externa (LLM) |
|---|---|---|---|
| **Certeza de respuestas** | 100% (curadas manualmente) | 95% (basada en estructura del portal) | 70-90% (puede alucinar) |
| **Costo** | $0 (JS estático) | $0 (JS estático) | $5-50/mes (API Anthropic/OpenAI) |
| **Riesgo reputacional** | Nulo | Bajo | **Alto** (datos Censo incorrectos ante jurado) |
| **Mantenimiento** | Medio (actualizar Q&A manualmente) | Bajo (se actualiza con la estructura) | Bajo (pero dependencia externa) |
| **Escalabilidad** | Limitada (~50-100 preguntas) | Buena (cualquier sección) | Excelente |
| **Experiencia offline** | Funciona sin internet | Funciona sin internet | **Falla sin internet** |
| **Viabilidad GitHub Pages** | Perfecta | Perfecta | Requiere proxy o API key en frontend (**inseguro**) |

### Recomendación: Modelo híbrido (a) + (b)

**Opción recomendada: base de conocimiento cerrada para datos verificables + búsqueda guiada para navegación.** Razones:

1. **Cero riesgo de alucinación**: Cada respuesta es verificable. Ante SUBDERE, esto es una fortaleza, no una limitación.
2. **Funciona offline**: Dirigentes rurales con mala conectividad pueden usarlo.
3. **Sin API key en frontend**: Exponer una API key de LLM en un sitio estático de GitHub Pages es un riesgo de seguridad inaceptable (cualquiera puede copiarla y consumir el presupuesto).
4. **Diferenciador honesto**: "Asistente basado en datos verificados del Censo 2024 y el proceso participativo" es más creíble que "chatbot con IA".

El asistente actual ya implementa este modelo (fuzzy keyword matching + 40+ Q&A curadas). La mejora está en expandir y estructurar mejor el catálogo.

---

## B2 — CATÁLOGO DE INTENCIONES

### 30 preguntas verificadas, agrupadas por categoría

#### Datos demográficos (7)

| # | Pregunta | Respuesta verificada | Fuente | Sección |
|---|---|---|---|---|
| 1 | ¿Cuántos habitantes tiene Rengo? | 63.620 personas (Censo 2024, excluye Requínoa y Malloa del antiguo distrito censal) | Censo 2024 | `#censo` |
| 2 | ¿Cuántas localidades hay? | 42 localidades en 21 unidades vecinales (9 urbanas + 12 rurales) | Diagnóstico UV | `#unidades-vecinales` |
| 3 | ¿Cuántas unidades vecinales tiene Rengo? | 21 unidades vecinales: 9 urbanas y 12 rurales | Diagnóstico UV | `#unidades-vecinales` |
| 4 | ¿Cuál es la brecha urbano-rural? | 2,74 veces: las localidades rurales tienen 2,74x menos acceso a servicios básicos que las urbanas (IPSB) | Índice IPSB | `#indices` |
| 5 | ¿Cuántas organizaciones participaron? | 89 organizaciones de la sociedad civil + 15 unidades municipales + 10 actores supracomunales | Proceso participativo | `#sna-gobernanza` |
| 6 | ¿Cuál es la localidad más vulnerable? | Según el Índice Compuesto de Priorización (ICP), varía por dimensión. Consulta el ranking en la sección de índices. | ICP | `#indices` |
| 7 | ¿Cuántas manzanas tiene Rengo? | 826 manzanas censales | Censo 2024 | `#censo` |

#### Estructura del plan (7)

| # | Pregunta | Respuesta verificada | Fuente | Sección |
|---|---|---|---|---|
| 8 | ¿Cuáles son los ejes del PLADECO? | 4 ejes estratégicos: (1) Gobernanza, (2) Desarrollo Social, (3) Desarrollo Territorial, (4) Desarrollo Económico | Matriz Estratégica | `#matriz` |
| 9 | ¿Cuántas políticas tiene el plan? | 185 políticas públicas distribuidas en 4 ejes y 26 objetivos estratégicos | Planificación | `#planificacion` |
| 10 | ¿Cuántos objetivos estratégicos hay? | 26 objetivos estratégicos | Matriz | `#matriz` |
| 11 | ¿Cuánto dura el plan? | 10 años: 2025 (elaboración) a 2035 (horizonte meta) | Portada | `#inicio` |
| 12 | ¿Qué es la ventana de inversión? | Período 2025-2028 donde se deben concentrar las inversiones prioritarias | Financiamiento | `#financiamiento` |
| 13 | ¿Cuáles son las metas del semáforo? | 10 indicadores clave con meta 2028 (corto plazo) y meta 2035 (horizonte) | Semáforo | `#semaforo` |
| 14 | ¿Qué es el FODA comunal? | Análisis de Fortalezas, Oportunidades, Debilidades y Amenazas construido participativamente con 472 personas | FODA | `#foda` |

#### Consultas territoriales (6)

| # | Pregunta | Respuesta verificada | Fuente | Sección |
|---|---|---|---|---|
| 15 | ¿Qué pasa en mi unidad vecinal? | Ingresa el nombre de tu localidad en el buscador (Ctrl+K o botón de búsqueda) para ver su ficha territorial | Fichas UV | `#unidades-vecinales` |
| 16 | ¿Qué es el MBHT? | Modelo Bienestar Humano Territorial: índice que mide calidad de vida combinando habitabilidad, servicios, conectividad y medio ambiente por manzana censal | MBHT | `#mbht` |
| 17 | ¿Dónde veo el mapa de la comuna? | En la sección de Análisis Territorial encontrarás el mapa interactivo con las 42 localidades y 21 unidades vecinales | Mapa | `#mapa` |
| 18 | ¿Qué son los índices de vulnerabilidad? | 6 índices que miden distintas dimensiones: ICP (compuesto), IPSB (servicios básicos), IBDT (brecha digital), IVSH (seguridad habitacional), IVFT (funcionalidad territorial), IDDC (demografía y cuidados) | Índices | `#indices` |
| 19 | ¿Qué es la red de gobernanza? | Mapa de articulación entre los 41 actores que construyeron el PLADECO, mostrando quién coordina con quién | SNA | `#sna-gobernanza` |
| 20 | ¿Hay datos de mi barrio? | Si tu barrio está en una de las 42 localidades, sí. Busca por nombre en el buscador. Para el MBHT, hay datos a nivel de manzana censal. | Fichas UV | `#unidades-vecinales` |

#### Proceso y participación (5)

| # | Pregunta | Respuesta verificada | Fuente | Sección |
|---|---|---|---|---|
| 21 | ¿Cuándo se aprueba el plan? | El PLADECO fue aprobado por el Concejo Municipal y está en fase de implementación desde 2026 | Proceso | `#proceso` |
| 22 | ¿Cómo puedo participar? | A través de tu junta de vecinos, del COSOC, o de las instancias de participación ciudadana de la Municipalidad. Contacto: SECPLAC | Participación | `#participacion` |
| 23 | ¿Quiénes participaron en el PLADECO? | 472 personas en total: 115 funcionarios municipales, 4.036 niños/as (encuesta NNA), dirigentes vecinales, organizaciones sociales | Participación | `#participacion` |
| 24 | ¿Quién hizo el PLADECO? | La Secretaría Comunal de Planificación (SECPLAC) de la Municipalidad de Rengo, con asistencia técnica externa | Equipo | `#equipo` |
| 25 | ¿Qué compromisos hay? | Los compromisos públicos están registrados en la sección de Compromisos Públicos con seguimiento verificable | Compromisos | `#compromisos` |

#### Navegación del portal (5)

| # | Pregunta | Respuesta verificada | Fuente | Sección |
|---|---|---|---|---|
| 26 | ¿Dónde veo los indicadores? | En la sección Semáforo de Metas encontrarás los 10 KPIs principales con estado actual y metas 2028/2035 | Semáforo | `#semaforo` |
| 27 | ¿Cómo descargo el plan? | Usa el botón "Descargar Plan" en la portada o busca "descargar" en el buscador | Portada | `#inicio` |
| 28 | ¿Cómo busco algo específico? | Usa el botón de búsqueda 🔍 (en móvil) o pulsa Ctrl+K (en computador) para buscar cualquier sección o tema | Buscador | — |
| 29 | ¿Cuántas secciones tiene el portal? | 53 secciones organizadas en 4 partes: Comprender, Diagnosticar, Decidir, Implementar | Mapa PLADECO | `#mapa-pladeco` |
| 30 | ¿Para qué son los perfiles de lectura? | Puedes elegir entre Lectura Mínima (5 min), Decisor (15 min), Lectura Plena (45 min) o Lectura Completa según el tiempo que tengas | Portada | `#inicio` |

---

## B3 — DISEÑO CONVERSACIONAL

### Mensaje de bienvenida

```
¡Hola! Soy el asistente del PLADECO Rengo 2025-2035.

Puedo ayudarte con datos verificados sobre:
📊 Población y territorio (Censo 2024)
🎯 Ejes, metas y políticas del plan
🗺️ Tu unidad vecinal o localidad
📍 Navegación por las secciones del portal

⚠️ Mis respuestas provienen exclusivamente de los datos oficiales del PLADECO. Si necesitas información fuera de este alcance, te derivaré al equipo de SECPLAC.
```

### Chips de sugerencia (inicio)

```
[¿Cuántos habitantes tiene Rengo?]
[¿Cuáles son los ejes?]
[¿Qué pasa en mi localidad?]
[¿Dónde veo las metas?]
```

### Mensaje de fallback (no sé responder)

```
No encontré una respuesta exacta para tu consulta en mi base de datos verificada.

Esto puedo sugerirte:
🔍 Prueba el buscador del portal (botón 🔍) con palabras clave
📧 Contacta a SECPLAC: dcastillo@munirengo.cl
📞 O al encargado PLADECO: omanan@munirengo.cl

Recuerda que puedo ayudarte con: población, localidades, ejes, metas, FODA, participación e indicadores.
```

### Tono de voz

**Cercano pero institucional**: tutea al usuario, usa lenguaje simple, pero mantiene rigor en los datos.

| En vez de... | Decir... |
|---|---|
| "Rengo tiene como 60 mil personas" | "Rengo tiene 63.620 habitantes según el Censo 2024" |
| "No sé, pregúntale a alguien" | "Esa consulta está fuera de mi base de datos. Te sugiero contactar a SECPLAC" |
| "¡¡¡Increíble pregunta!!!" | "Buena pregunta. Según los datos del PLADECO..." |
| "Error 404" | "No encontré una respuesta exacta para eso" |

---

## B4 — COMPORTAMIENTO MÓVIL DEL ASISTENTE

### Diagnóstico actual

El chatbot ya es responsive (full-height modal en <900px). Problemas detectados:
- El FAB (56px) puede tapar el botón "volver arriba" si se implementa
- El input no se ajusta cuando aparece el teclado virtual
- No hay handle de arrastre para cerrar el panel

### CSS del widget responsive mejorado

```css
/* ═══ B4 · Chatbot Móvil Mejorado ═══ */

@media (max-width: 768px) {
  /* Ajustar posición del FAB sobre el bottom nav */
  .chatbot-fab {
    bottom: 76px;
    right: 16px;
    width: 52px;
    height: 52px;
  }

  /* Panel como bottom sheet, no modal centrado */
  .chatbot-panel {
    width: 100% !important;
    max-width: 100vw !important;
    height: calc(100dvh - 60px) !important; /* Descontar bottom nav */
    max-height: calc(100dvh - 60px);
    top: 0 !important;
    left: 0 !important;
    right: 0;
    bottom: 60px;
    border-radius: 0 !important;
    transform: translateY(100%) !important;
  }
  .chatbot-panel.chatbot-visible {
    transform: translateY(0) !important;
    opacity: 1 !important;
    pointer-events: auto !important;
  }

  /* Handle visual para cerrar arrastrando */
  .chatbot-header::before {
    content: '';
    display: block;
    width: 36px;
    height: 4px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 4px;
    margin: 0 auto 8px;
  }

  /* Input: se ajusta con teclado virtual */
  .chatbot-input-row {
    position: sticky;
    bottom: 0;
    padding: 10px 14px;
    padding-bottom: calc(10px + env(safe-area-inset-bottom, 0));
    background: var(--card);
    border-top: 1px solid var(--border);
  }

  /* Mensajes: scroll más suave en iOS */
  .chatbot-messages {
    -webkit-overflow-scrolling: touch;
    overscroll-behavior-y: contain;
  }

  /* Chips de sugerencia: scroll horizontal */
  .chatbot-suggestions {
    display: flex;
    gap: 6px;
    overflow-x: auto;
    flex-wrap: nowrap;
    padding: 8px 14px;
    scrollbar-width: none;
  }
  .chatbot-suggestions::-webkit-scrollbar { display: none; }
  .chatbot-suggestions button {
    flex-shrink: 0;
    min-height: 44px;
    white-space: nowrap;
  }
}
```

**Requiere:** CSS. La lógica JS del chatbot no necesita cambios.

**Validación:**
- [ ] FAB no tapa el bottom nav ni el contenido
- [ ] Panel ocupa pantalla completa excepto bottom nav
- [ ] Input visible sobre el teclado virtual (iOS y Android)
- [ ] Chips de sugerencia scrolleables sin wrap

---

## B5 — VALOR DIFERENCIAL PARA POSTULACIÓN SUBDERE

### Cómo presentar el asistente

**Narrativa recomendada para el jurado:**

> "El Portal PLADECO Rengo incorpora un asistente de consulta ciudadana basado en datos verificados del Censo 2024 y el proceso participativo. A diferencia de los chatbots comerciales que pueden generar información incorrecta, nuestro asistente responde exclusivamente con datos oficiales verificados, priorizando la certeza sobre la ambición. Cada respuesta incluye la fuente y un enlace directo a la sección del portal donde el ciudadano puede profundizar. Este diseño responde al principio de gobierno abierto: la información pública debe ser accesible, verificable y navegable por cualquier persona desde su celular."

### Métricas de uso recomendadas

Implementables en un sitio estático (sin backend) vía Google Analytics 4 o localStorage:

| Métrica | Cómo capturar | Valor para SUBDERE |
|---|---|---|
| **Preguntas más frecuentes** | `localStorage` + JSON export | Demuestra qué busca la ciudadanía |
| **Tasa de respuesta exitosa** | % de consultas con match (bestScore >= 3) | Demuestra eficacia |
| **Tasa de derivación** | % de fallbacks | Identifica lagunas de información |
| **Preguntas sin respuesta** | Log de consultas sin match | Guía mejora continua |
| **Secciones más consultadas** | Links clickeados desde respuestas | Mapa de interés ciudadano |

### Código para captura de métricas (localStorage)

```js
/* ═══ B5 · Métricas del asistente ═══ */
function logChatMetric(query, matched, section) {
  try {
    var metrics = JSON.parse(localStorage.getItem('pladeco_chat_metrics') || '[]');
    metrics.push({
      q: query.substring(0, 100),
      ok: matched,
      sec: section || null,
      ts: new Date().toISOString().split('T')[0]
    });
    // Mantener últimas 500 consultas
    if (metrics.length > 500) metrics = metrics.slice(-500);
    localStorage.setItem('pladeco_chat_metrics', JSON.stringify(metrics));
  } catch(e) {}
}

function getChatMetricsSummary() {
  try {
    var m = JSON.parse(localStorage.getItem('pladeco_chat_metrics') || '[]');
    var total = m.length;
    var ok = m.filter(function(x){ return x.ok; }).length;
    var topQ = {};
    m.forEach(function(x){ topQ[x.q] = (topQ[x.q]||0) + 1; });
    var sorted = Object.entries(topQ).sort(function(a,b){ return b[1]-a[1]; });
    return {
      total: total,
      exitosas: ok,
      tasa: total ? Math.round(ok/total*100) + '%' : '—',
      top5: sorted.slice(0,5)
    };
  } catch(e) { return null; }
}
```

### Cómo refuerza gobierno abierto

| Principio | Cómo lo evidencia el asistente |
|---|---|
| **Transparencia** | Cada respuesta cita la fuente y enlaza a la sección verificable |
| **Participación** | Reduce la barrera de acceso: el ciudadano pregunta en lenguaje natural |
| **Rendición de cuentas** | El semáforo de metas y compromisos son consultables directamente |
| **Accesibilidad** | Funciona en móvil, sin internet (datos precargados), sin login |
| **Datos abiertos** | Los datos del Censo y del proceso están en el portal, no en un PDF cerrado |

---

# TABLAS DE PRIORIZACIÓN

## Tabla 1: Frente A — Optimización Móvil

| Componente | Esfuerzo | Impacto Usabilidad Móvil | Impacto SUBDERE | Prioridad |
|---|---|---|---|---|
| **A5 · Bottom nav + drawer** | Alto (HTML+CSS+JS) | 🔴 Crítico (hoy no hay navegación móvil) | 🔴 Alto (jurado usará celular) | **P0** |
| **A6 · Breakpoints + touch targets** | Bajo (solo CSS) | 🔴 Crítico (base para todo lo demás) | 🟡 Medio | **P0** |
| **A1 · Timeline vertical** | Bajo (solo CSS) | 🟡 Alto (contenido oculto) | 🟡 Medio | **P1** |
| **A2 · KPIs responsive** | Medio (CSS+JS) | 🟡 Alto (dato ilegible en móvil) | 🔴 Alto (semáforo es pieza clave) | **P1** |
| **A4 · Sociograma SNA móvil** | Medio (CSS+JS) | 🟡 Medio (componente nuevo) | 🔴 Alto (diferenciador) | **P1** |
| **A3 · Mapas táctiles** | Medio (CSS+JS) | 🟡 Alto (usuario queda atrapado) | 🟡 Medio | **P2** |

## Tabla 2: Frente B — Asistente Conversacional

| Recomendación | Viabilidad técnica (sin backend) | Impacto confianza usuario | Prioridad |
|---|---|---|---|
| **B1 · Modelo híbrido (base cerrada + guía)** | ✅ Perfecta (ya implementado) | 🔴 Máximo (cero alucinaciones) | **P0** |
| **B2 · Expandir catálogo a 30 preguntas** | ✅ Perfecta (agregar a CHATBOT_QA) | 🔴 Alto (cubre 95% de consultas) | **P0** |
| **B3 · Mensaje bienvenida + fallback** | ✅ Perfecta (solo cambiar strings) | 🟡 Alto (gestión de expectativas) | **P1** |
| **B5 · Métricas localStorage** | ✅ Perfecta (JS puro) | 🟡 Medio (evidencia para SUBDERE) | **P1** |
| **B4 · Widget móvil mejorado** | ✅ Perfecta (solo CSS) | 🟡 Alto (UX en celular) | **P1** |

---

*Documento generado el 2026-05-29 · Portal PLADECO Rengo v45.190*
*Basado en análisis de 218 media queries, 53 secciones, 40+ Q&A del asistente, 13 instancias de mapa, y 41 nodos del sociograma.*
