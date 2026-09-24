# Sistema gráfico territorial · Portal PLADECO Rengo 2025-2035

Paquete gráfico piloto (v45.357), publicado con la versión v45.359 del portal.
Los colores son una propuesta de diseño, no la identidad oficial de la Municipalidad de Rengo.

## Qué hay en esta carpeta

| Archivo | Qué es | Cómo se edita |
|---|---|---|
| `sistema-grafico.css` | Tokens propios de las piezas (`--pn-*`, `--sg-*`) y estilos de aperturas, láminas, ficha, fotografía anotada, hallazgos y diagrama. Cambia con `body.dark`. | Texto CSS. |
| `sistema-grafico.js` | Monta las piezas sobre el marcado existente. Idempotente: no duplica nada si se ejecuta dos veces, y si falta un recurso omite la pieza. | JavaScript sin dependencias. |
| `sg-graficos.js` | Motor de gráficos SVG de las láminas (línea, barras, columnas) y del localizador. Dibuja desde datos. | JavaScript sin dependencias. |
| `panoramica-rengo.svg` | Ilustración territorial, versión de escritorio (1600 × 352). | SVG editable. Colores por clase `pn-*`. |
| `panoramica-rengo-movil.svg` | Adaptación propia para móvil: recorte del sector nevado y cerros cercanos, con asentamiento a otra escala. | SVG editable. |
| `panoramica-rengo-mono.svg` | Variante monocromática para usos secundarios (`--pn-mono`). | SVG editable. |
| `silueta-rengo.svg` · `silueta-rengo-mono.svg` | Silueta comunal con norte y escala de 10 km. | SVG editable. |
| `iconos-ejes.svg` | Sprite con los seis símbolos `ico-eje-1` a `ico-eje-6`. Los mismos símbolos están dentro del sprite de `index.html`. | SVG editable. |
| `iconos/eje-N-*.svg` | Cada icono suelto, en monocromo y con acento. | SVG editable. |
| `fotos/*.webp` · `fotos/*.jpg` | Recortes optimizados de dos fotografías del informe municipal de espacios públicos (ver procedencia). | Imagen. |
| `fuentes/` | Guiones que regeneran la panorámica, la silueta y los iconos, con sus datos intermedios. | Node y Python. |
| `lamina-sistema-grafico.html` · `lamina/` | Lámina del sistema: paleta, iconos, tipografía, leyendas y miniaturas de las composiciones del piloto. | HTML; las miniaturas son capturas WebP. |

Los **textos y cifras editables** de la ficha de Rosario, de la fotografía anotada y del diagrama están en
`index.html`, en el bloque «v45.357 · DATOS EDITABLES DEL SISTEMA GRÁFICO» (`window.FICHAS_TERRITORIALES`,
`window.FOTOS_ANOTADAS`, `window.DIAGRAMAS_CASO`). Lo que ya existe en las estructuras del portal se lee en
el momento: población, catastro, acciones, series y metas.

## Piezas del paquete piloto y dónde están

1. **Panorámica vectorial de Rengo** · protagonista de la apertura del Capítulo II «Conoce tu Comuna».
2. **Seis iconos de los ejes** · tarjetas de «Seis ejes ordenan el plan», rótulos de eje de la tabla de la Matriz y filtros de la lista de acciones.
3. **Apertura de capítulo** · modelo completo en el Capítulo II; los demás capítulos usan la versión tipográfica, sin pieza, hasta contar con material verificado.
4. **Ficha territorial de Rosario** · en «Explora tu territorio» (`#mapa`), después de la ficha básica.
5. **Láminas de indicadores** · población en `#proyeccion-poblacion`, servicios básicos en `#censo`, meta de apoyo psicológico en `#semaforo`.
6. **Fotografía anotada** · plaza barrial de Rosario, en `#ict-espacios-publicos`.

Además: diagrama de diagnóstico y respuesta (áreas verdes) en `#matriz`, y hallazgos agregados de la participación en `#voz`.

## Procedencia de los recursos

| Recurso | Origen | Lugar y fecha | Autoría | Observaciones |
|---|---|---|---|---|
| Relieve de la panorámica | `Entrada-Rengo-Color-Pladeco.jpg` del portal (2560 × 1440). La cresta se detectó por diferencia de color con el cielo y los cerros cercanos se trazaron sobre la foto con retícula. | Vista aérea de Rengo hacia la cordillera. Fecha de captura: no consta. El archivo editado registra creación en Photoshop el 20-10-2025. | No consta. El portal la rotula «archivo del proceso PLADECO». | Asentamiento, arboledas y cultivos son simplificación. Exageración vertical de 1,6 veces, declarada en el pie. No es un mapa ni una fotografía. |
| Silueta y localizador | `rengo-limite.geojson` (OpenStreetMap, © colaboradores de OSM, ODbL). | — | — | Límite referencial, no oficial. No se rotula superficie (cuatro cifras distintas en el portal). |
| Foto de la ficha de Rosario | Recorte de la Imagen N.º 53 del *Informe de Estado de Espacios Públicos de Rengo 2026* (SECPLAC), p. 54. | Oficina municipal de DIDECO en Rosario. 29-10-2025: el pie dice «martes», que no corresponde a esa fecha. | No consta por fotografía. El informe es de SECPLAC. | 431 × 331 px (resolución del mosaico original). |
| Fotografía anotada | Recorte de la Imagen N.º 62 del mismo informe, p. 63. | Plaza barrial de Rosario, 04-02-2026. La coordenada impresa en la imagen está a ≈180 m del punto del catastro. | No consta por fotografía. | 524 × 357 px. Cada marca remite a una frase del informe. |
| Datos de la encuesta | Encuesta Ciudadana PLADECO Rengo 2025: 119 respuestas, del 8-10-2025 al 10-12-2025. | — | — | Cifras recontadas en sus respuestas, sin leer columnas personales. |
| Iconos | Diseño original hecho para el portal en v45.357: grilla de 24, trazo de 1,7 y remates redondeados, igual que la familia existente. | — | Diseño del portal | No derivan de librerías externas. |

## Cómo regenerar

```
cd fuentes
python skyline2.py && python planos.py && python trazos.py   # relieve desde la foto
node silueta.cjs && node silueta_svg.cjs                       # silueta
node panoramica.cjs                                            # panorámica (3 variantes)
node iconos.cjs                                                # iconos de los ejes
```

Requiere Python con Pillow y Node. Los guiones leen la foto aérea (`Entrada-Rengo-Color-Pladeco.jpg`) y el contorno comunal (`rengo-limite.geojson`) desde la carpeta del portal, con rutas relativas. Escriben los JSON intermedios en `fuentes/` y los SVG en `fuentes/salida/`; desde ahí se copian a esta carpeta. Comprobado el 14-09-2026: ejecutados en orden, reproducen byte a byte los JSON, las tres panorámicas, las dos siluetas, el sprite y los 12 iconos publicados.

La tipografía se sirve desde `../fonts/` como subconjuntos latinos de Poppins en WOFF, de unos 15 KB por peso. Se regeneran con `python ../fonts/subconjunto_poppins.py`, que requiere fontTools.

## Pendientes de material y validación

- Autoría y fecha de captura de la foto aérea que sirve de base a la panorámica.
- Fotografías con autoría, fecha y lugar para las aperturas de los capítulos III al XI.
- Capas vectoriales oficiales: límite comunal, 21 unidades vecinales y distritos censales. Hasta tenerlas, no hay mapa temático por distrito ni localizador de unidad vecinal.
- Nombres oficiales de cerros y cursos de agua: ninguna lámina los rotula, así que la panorámica no los nombra.
- Validar el índice de vulnerabilidad de Rosario y Rengo (dos valores en el portal) y la superficie comunal.
- Citas de participación con instrumento, fecha y consentimiento. Mientras no existan, se muestran hallazgos agregados.
- Manual de identidad municipal: no se encontró en el repositorio. Los colores del escudo se tomaron de su archivo SVG.
