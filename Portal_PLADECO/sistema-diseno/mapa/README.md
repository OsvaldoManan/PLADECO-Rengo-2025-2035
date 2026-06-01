# Pieza 6 · Mapa esquemático identitario de Rengo

Pieza gráfica de **identidad territorial** (sello visual del portal y apoyo de navegación),
en la paleta y el estilo del sistema.

## Qué se entrega
- **`mapa-rengo-estructura.svg`** — la **silueta real de la comuna de Rengo**, proyectada desde
  `rengo-limite.geojson` (límite oficial), en el estilo del sistema: relleno `--seq-1` (`#eaf0f8`),
  trazo `--c-navy` 1.6, etiqueta serif. Legible en claro/oscuro (`prefers-color-scheme`) y B/N.
  Sirve **ya** como sello identitario.

## Qué falta (insumo del equipo) — no se inventan límites
La **subdivisión en las 21 unidades vecinales** (9 urbanas + 12 rurales) **requiere su geometría
real**. Entregar:

```
unidades-vecinales.geojson   (EPSG:4326 / WGS84)
└── FeatureCollection
    └── 21 × Feature
        ├── geometry: Polygon | MultiPolygon  (límite de la UV)
        └── properties:
            ├── numero  : 1..21
            ├── nombre  : "UV N° X · <nombre>"
            └── tipo    : "urbana" | "rural"
```
Fuentes posibles: SECPLAN/DOM (cartografía comunal), IDE Chile, o el shapefile usado en el
diagnóstico de UV del propio PLADECO.

## Cómo se completa (al recibir el GeoJSON)
1. Proyección equirectangular (corregida por `cos(lat)`) al `viewBox`, como en el script de
   `mapa-rengo-estructura.svg`.
2. Cada UV = un `<path>` con relleno neutro y trazo `--c-navy` fino; al estado activo/hover,
   relleno `--seq-3` o `--c-navy`.
3. Etiquetas con número de UV (Inter, tabular); urbano/rural diferenciado por **trama o trazo**,
   no solo color (seguridad CVD).
4. Variante "coroplética" reusa la rampa `--seq-*` (ver Pieza 3) para mapear indicadores por UV.

## Uso
- **Sello**: versión silueta (sin subdivisión) como marca territorial en portada/footer/OG.
- **Navegación**: versión con 21 UV como mapa clicable → cada UV enlaza a su ficha territorial
  (`#territorio`). Accesible: cada `<path>` con `<title>`/`aria-label` = nombre de la UV.
