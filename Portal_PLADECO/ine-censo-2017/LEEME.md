# Cartografía censal INE 2017 · comuna de Rengo (06115)

Cuatro capas descargadas el 15-10-2026, con autorización del encargado del PLADECO, desde el portal de datos abiertos
del Instituto Nacional de Estadísticas (ArcGIS Hub «geoine-ine-chile», cuentas oficiales `gisine1` y
`publicaciones_geodatos`), mediante la API REST de cada servicio, filtradas por comuna, en WGS84 (EPSG:4326) y con
seis decimales. Licencia declarada por el INE: «Datos de uso público»; el sitio del INE publica sus contenidos bajo
Creative Commons Atribución-CompartirIgual 4.0 (CC BY-SA 4.0). Atribución que corresponde en el portal:
«Fuente: INE, Censo 2017, cartografía censal».

| Archivo | Servicio de origen | Filtro | Registros | Contenido |
|---|---|---|---|---|
| distritos_rengo_2017.geojson | Distrito_Densid_Superficie/FeatureServer/0 | COMUNA=6115 | 11 polígonos | distritos censales 611501 a 611511, tipo (mixto/rural), población y viviendas 2017 |
| entidades_rengo_2017.geojson | Entidad_2017_2/FeatureServer/0 | COD_COMUNA='06115' | 116 polígonos | entidades rurales con código y nombre de localidad censal, categoría y población 2017 |
| aldeas_rengo_2017.geojson | Aldeas_2017/FeatureServer/0 | COMUNA=6115 | 12 polígonos | aldeas (amanzanadas) con localidad, entidad, población y viviendas 2017 |
| caserios_rengo_2017.geojson | Caserios_2017/FeatureServer/0 | COMUNA=6115 | 28 polígonos | caseríos con localidad, entidad, población y viviendas 2017 |

Los archivos no se modificaron tras la descarga (solo se pidió al servicio el filtro, los campos y la precisión).
Las poblaciones son las del Censo 2017; el portal usa cifras del Censo 2024 para la comuna, de modo que las
cantidades de estas capas sirven para identificar y ubicar unidades, no para sustituir cifras del Plan.
