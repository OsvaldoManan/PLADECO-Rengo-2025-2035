// ══════════════════════════════════════════════════════
// PLADECO Rengo 2025-2035 · Service Worker v69.59
// Estrategia: network-first HTML · stale-while-revalidate assets · imágenes precache-first→cache-first · tiles cache-first
// v69.59: v45.348 - REVISION EDITORIAL (rama revision-editorial, NO PUBLICADA) - §2 PALETA CON FUNCIONES, §3 JERARQUIA TIPOGRAFICA y §4 RETICULA. IDENTIDAD, VERIFICADA EN LOS ARCHIVOS ANTES DE PROPONER NADA: el escudo comunal (escudo-rengo.svg) declara exactamente cuatro colores -#17497C azul, #D6940F ocre, #F2CB7E ocre claro y #AD2910 terracota- y son los unicos colores institucionales comprobables del proyecto; NO hay manual de marca en el repositorio. Al muestrear los logotipos del plan (Logo-Pladeco-Color.png, logo-pladeco.png) aparecen un azul electrico (#1040c0 / #0030a0) y un naranja (#e07020 / #ff5000) que NO coinciden con el escudo: esa discrepancia entre logotipo del plan y escudo comunal queda registrada como pendiente de definicion institucional, y se resuelve a favor del escudo. La paleta propuesta en el encargo se usa solo donde el escudo no llega (fondo, superficie, texto, verde de accion) y se declara como propuesta de diseno, no como identificacion oficial de la marca. §2: bloque unico de paleta semantica en institucional.css que asigna por FUNCION (fondo, superficie, texto, accion, borde, estado) y reasigna los tokens que el portal ya consume (107 usos de --accent, etc.), de modo que la paleta viva en un solo lugar; los seis ejes se centralizan como --eje-1..6 conservando la paleta Okabe-Ito (segura para daltonismo) y quedan SEPARADOS de la familia de estados de ejecucion, sin compartir ningun valor. Cambio funcional relevante: --accent pasa de #2d9a4d (3,0:1 como texto, fallaba en sus 34 usos como color) a #286449 (7,0:1), de modo que sirve tanto de fondo con texto blanco como de texto sobre superficie clara. CORRECTOR DE LEGIBILIDAD: al clasificar los fallos medidos se vio que ~3 de cada 4 NO son tipograficos sino ETIQUETAS Y CELDAS CON FONDO DE COLOR (insignias ODS, colores de eje, etiquetas de formato, celdas de coherencia, avatares) donde el fondo lo decide el DATO y por eso no se puede arreglar con una regla CSS por caso -haria falta una por color-. Se agrega un corrector que actua SOLO sobre lo que ya falla: sobre fondo de color elige entre casi negro y blanco el que mas contraste da; sobre superficie estandar CONSERVA EL TONO y ajusta la luminosidad hasta alcanzar el minimo. No toca graficos, ni el interior de los mapas, ni texto sobre fotografias o degradados. HALLAZGO TECNICO: la primera version del corrector dejaba 56 celdas sin arreglar porque varias tablas fijan 'color' con !important y el color en linea perdia; se aplica con prioridad alta y guardando valor y prioridad originales para poder revertir. §3: el portal declaraba SIETE pesos (300..900) pero /fonts solo tiene CUATRO archivos de Poppins; 300 y 900 no existian como archivo -el navegador los sintetizaba- y 400 y 500 apuntaban al MISMO archivo. Normalizado en el origen: 800->700 (994 declaraciones), 900->800 (92), 500->400 (101) y 300->400 (2); quedan cuatro pesos con archivo real, tres de ellos habituales (400 cuerpo, 600 etiquetas, 700 destacados) y 800 reservado a titulares. Escala fluida en tokens --fs-h1/h2/h3/sub/body/nota. §4: el contenedor declaraba max-width 1440px y margin 0, es decir el contenido ocupaba TODA la ventana y quedaba pegado a la izquierda en pantallas anchas; ahora 1280px centrado con margenes laterales clamp(16px, 3.2vw, 48px). FRAGMENTACION ENCONTRADA Y CONSOLIDADA: habia SIETE declaraciones !important compitiendo por el tamano del titulo de portada -una base y seis por punto de corte-, cuyo resultado en 360px era 20px, mas pequeno que varios rotulos interiores; y SEIS declaraciones para el h2 de seccion y SIETE para su bajada. Se sustituyen por el token unico con la especificidad necesaria (institucional.css NO es la ultima hoja del documento: hay bloques <style> en linea posteriores, comprobado en el CSSOM). VERIFICADO, midiendo las 75 secciones en los dos temas, componiendo capas alfa y descartando fondos con imagen o degradado: contraste bajo AA pasa de 792 a 14 en claro (-98,2%) y de 726 a 14 en oscuro (-98,1%), sobre 16.741 y 16.758 elementos de texto evaluados. A 1440px: contenedor 1280 centrado con 46px de margen, h2 34,4px peso 800, bajada 22,2px con 63 caracteres de medida, sin desbordes ni scroll horizontal. A 360px: titulo de portada 30px (venia de 20), h2 25px, bajada 18px, margenes 16px, sin scroll horizontal. Pesos renderizados: 400, 600, 700 y 800. Cache bump v69.58 -> v69.59.
// v69.58: v45.345 - REVISION EDITORIAL (rama revision-editorial, NO PUBLICADA) - §7 TERRITORIO y §8 FICHA TERRITORIAL REUTILIZABLE. Se construye «Explora tu territorio» REUTILIZANDO la cartografia ya verificada (#mapContainer, Leaflet, alimentado por UV_DATA) en vez de crear un segundo mapa: CERO dependencias nuevas. Componentes: (a) selector por localidad o unidad vecinal con grupos Urbanas/Rurales; (b) LISTA EQUIVALENTE de los 25 territorios en botones, para quien no use el mapa; (c) ficha territorial que se abre desde el selector, desde la lista o haciendo clic en el mapa, y que sincroniza los tres; (d) nota de escala sobre el mapa. HALLAZGO GRAVE DE DATOS al inspeccionar antes de editar: el portal tiene TRES registros territoriales paralelos que no concuerdan. UV_DATA (25 filas: 21 UV + 4 localidades sin UV) asigna UV-11 a Chanqueahue con 1.420 hab; CUV_UVS (21 filas, alimenta el cuadernillo y la calculadora) asigna UV-11 a Rosario Oriente con 117 hab; y CENSO_LOCALIDADES_GEO (24 localidades con ICP) contiene 8 nombres que no existen en UV_DATA (Cerrillos, El Trebal Huilquio, El Placer, Las Nieves, Chapeton, Camarico, Rosario Oriente, La Ariana). NO se eligio una version por intuicion: la ficha se ancla en UV_DATA -unico registro con coordenadas completas y fuentes declaradas en su propia seccion, y el que ya alimenta la cartografia- y la contradiccion queda DECLARADA en cada ficha como campo pendiente de validacion municipal. CAMPOS QUE EL ENCARGO PIDE Y QUE NO SE PUEDEN LLENAR CON DATO VERIFICADO, ocultos y declarados uno por uno: (1) fotografia por localidad -el repositorio no tiene ninguna: las 27 imagenes de la raiz son logotipos, iconos y fotografias genericas o de la entrada de Rengo-; (2) acciones del plan vinculadas al territorio -se comprobo campo por campo que NI _POL (16 columnas) NI accionesPOA (13 campos) registran localizacion: 0 claves territoriales, de modo que vincular acciones exigiria inventarlas-; (3) desafio redactado por unidad vecinal -solo existe en CUV_UVS, el registro en conflicto-. LO QUE SI SE PUEDE MOSTRAR: sintesis derivada del dato, centroide, hasta TRES indicadores con su fuente (poblacion y NNA del Censo 2024, proyectos e inversion del BIP acumulado 1997-2025), vulnerabilidad ICP en 21 de 25 territorios -declarando cuando el indice es de la localidad censal agrupada y no de la unidad vecinal, caso de las 5 UV de Rengo y las 2 de Rosario- y los problemas documentados del catastro SECPLAC de espacios publicos en 17 de 25, asociados por CERCANIA AL CENTROIDE con radio de 2 km y maximo 3, con la misma advertencia de 'no es atribucion administrativa' que ya usa #territorios-prioritarios. DOS FALLOS PROPIOS DETECTADOS AL VERIFICAR Y CORREGIDOS: (i) al insertar la ficha pegada al mapa se rompio la idempotencia del enhancer de fichas metodologicas -comprueba que su hermano siguiente sea .map-meta- y aparecia una .map-meta DUPLICADA en cada pasada; la ficha se reubico al final de la seccion; (ii) el mapa recrea TODOS los marcadores en cada cambio de capa, asi que enganchar el clic una sola vez dejaba 0 de 25 marcadores activos; se envuelve updateMapMarkers para reenganchar tras cada redibujo, con sondeo acotado porque Leaflet llega por CDN con defer. Se renombra la seccion a «Explora tu territorio» en el titulo y en el registro de navegacion, y la bajada deja de prometer 'participacion ciudadana' que ese mapa no muestra. VERIFICADO: las 25 fichas se generan sin error, todas con exactamente 3 indicadores; 21 con ICP y 17 con espacios catastrados; los 5 enlaces de 'Donde profundizar' resuelven a secciones existentes (0 rotos); 25 de 25 marcadores enganchados y el enganche SOBREVIVE al cambio de capa; selector, lista y mapa quedan sincronizados y el boton de limpiar restituye el estado vacio; CERO fallos de contraste sobre 78 elementos de texto medidos, en tema claro y oscuro; sin desbordes ni scroll horizontal a 360 px ni a 740 px. Cache bump v69.57 -> v69.58.
// v69.57: v45.344 - REVISION EDITORIAL (rama, NO PUBLICADA) - §6 EJES y §12 VERIFICACION DE DESCARGAS. §6: las tarjetas de los 6 ejes reciben (a) un ICONO propio de la familia SVG ya existente en el portal -corazon, maletin, educacion, montana, escudo e institucion-, coloreado con el color del eje; (b) el numero de ACCIONES, y (c) un enlace explicito 'Ver objetivos y acciones'. EL DATO DE ACCIONES SE DERIVA DE _POL, no de EJES[].nAcc, porque se comprobo que este ultimo esta DESACTUALIZADO: declara 200 cuando la matriz operativa tiene 225 filas, y el desglose real por eje es 58/18/14/53/32/50 frente al declarado 54/17/14/43/28/44. VERIFICACION CLAVE antes de escribir el texto: el encargo pide 'explicar las acciones compartidas entre ejes para evitar interpretar sus cifras como sumables', pero al medirlo resulto que NO EXISTEN acciones compartidas -0 acciones repetidas en mas de un eje y 0 ids duplicados-, y la suma por eje da EXACTAMENTE 225. Por eso el texto dice lo contrario de lo que sugeria el encargo: cada accion pertenece a un solo eje y los totales SI son sumables. No se escribio una advertencia que los datos no respaldan. §12: se verificaron los 43 enlaces de descarga distintos del portal y TODOS los archivos existen (0 rotos); ademas la seccion de documentos ya declara formato, tamano, fecha y distingue preliminar de aprobado, de modo que ese punto del encargo ya estaba cumplido. VERIFICADO: 6 tarjetas con icono, meta y enlace; la suma de acciones mostradas da 225; CERO fallos de contraste en ambos temas (nombre 17,85/14,41 - meta 7,58/10,63 - enlace 5,02/7,65). Cache bump v69.56 -> v69.57.
// v69.56: v45.343 - REVISION EDITORIAL (rama revision-editorial, NO PUBLICADA) - §2 PRIMERA PANTALLA + §3 ETIQUETA LF. INVENTARIO previo: 27 imagenes en la raiz, 16 fotografias del proceso, 32 diagramas, 32 figuras de proyeccion y 13 pictogramas. HALLAZGO: existe una fotografia AUTENTICA de Rengo en el propio proyecto -Entrada-Rengo-Color-Pladeco.jpg, 2560x1440, vista aerea con la avenida de acceso, el damero urbano y la cordillera nevada- que hasta ahora se usaba solo como FONDO FIJO de todo el portal, es decir como elemento decorativo detras de texto denso, justo lo que el encargo pide evitar. Ahora es una PIEZA EDITORIAL de la portada, con encuadre (object-position 50% 62% en escritorio, 58% en movil para no cortar la cordillera) y pie propio. PORTADA EN DOS COLUMNAS: texto a la izquierda (logo, titulo, introduccion, estado, tres accesos y buscador) y fotografia a la derecha; en <=900px se apila y la imagen pasa primero. Introduccion de 38 palabras (el encargo pide 30-45). Los TRES ACCESOS son ahora los solicitados: 'Conocer el plan' (principal, solida) -> #matriz, 'Explorar mi territorio' -> #territorio y 'Consultar avances' -> #cronograma-gantt; este ultimo apunta al cronograma y no al semaforo porque lo documentado es el avance del PROCESO, no la ejecucion del plan. CIFRAS TRASLADADAS FUERA de la portada a una franja editorial #cifras-franja ('Rengo en contexto'), como pide el encargo. BUG CORREGIDO al trasladarlas: venian del hero (disenadas para fondo oscuro) y sobre la superficie clara de la franja el numero quedaba BLANCO SOBRE BLANCO (1:1) en tema claro; mismo patron ya visto en otros bloques movidos. §3: se elimina la sigla criptica 'LF' del boton de Lectura Facil en la barra de utilidades -los otros botones de esa barra son solo icono y el nombre accesible ya existia en title y aria-label-; en el menu, donde hay espacio, el boton ya decia 'Lectura Facil' completo. VERIFICADO en 1440x900: dos columnas reales (574px + 602px), hero 757px = 84% del viewport -cabe por primera vez en una pantalla, venia de 171%-, titulo completo sin desbordes, foto 601x400. En 360px: apilado, titulo integro a 20px sin recortes, accesos en columna, sin scroll horizontal. Los 3 accesos resuelven a secciones existentes (0 rotos). CERO fallos de contraste en ambos temas. Consola limpia en pestana nueva, 0 recursos fallidos, 75 unidades intactas. Cache bump v69.55 -> v69.56.
// v69.55: v45.342 - ENCARGO EDITORIAL/UX - §7 FICHAS TERRITORIALES - ESCALA Y PROCEDENCIA. El §7 exige que una ficha territorial declare su ESCALA GEOGRAFICA y la FECHA de los datos, y que no se atribuyan cifras comunales a una localidad sin respaldo. HALLAZGO al verificar la tabla de #territorio: tiene 25 filas pero NO son 25 unidades vecinales -son 21 UV con codigo (UV-1..UV-21) MAS 4 localidades rurales que no tienen unidad vecinal constituida: Popeta, Pueblo Hundido, San Jorge y Santa Isabel-. Es decir, la tabla MEZCLA DOS ESCALAS (unidad vecinal y localidad, que no son equivalentes) sin declararlo, y el lector asume que las 25 filas son unidades vecinales. ACCION: ficha de escala y procedencia sobre la tabla que declara (a) la composicion mixta, CONTANDO las filas reales en vez de usar cifras escritas a mano -si manana se agrega una localidad, la nota se actualiza sola-; (b) los nombres de las 4 localidades sin UV; (c) la procedencia por columna: poblacion y NNA del Censo 2024 (INE), proyectos e inversion del Banco Integrado de Proyectos; (d) que el guion significa SIN REGISTRO EN LA FUENTE y NO equivale a cero -la misma distincion que se aplico al semaforo en v45.340-; y (e) que las cifras son propias de cada territorio y NO se reparten totales comunales entre localidades, que es exactamente lo que el §7 prohibe. VERIFICADO: nota presente e inmediatamente anterior a la tabla, con las cifras derivadas correctas (21 y 4) y los nombres reales; CERO fallos de contraste en ambos temas (cuerpo 7,58/10,63 - destacados 17,85/14,41); sin scroll horizontal. Cache bump v69.54 -> v69.55.
// (Historial completo de versiones: ver CHANGELOG.md en la raiz de Portal_PLADECO.
//  Se conservan aqui solo las 5 ultimas entradas: el SW se re-descarga en cada chequeo
//  de actualizacion y el changelog completo pesaba 286KB de los 289KB del archivo.)
// ══════════════════════════════════════════════════════
const CACHE_STATIC='pladeco-static-v69.59';
const RELEASE='v45.348'; // version legible (user-facing), se muestra en el sello del footer
const CACHE_IMG='pladeco-img-v3';
const CACHE_TILES='pladeco-tiles-v2';
const CACHE_RUNTIME='pladeco-runtime-v52';
const MAX_IMG_CACHE=200;
const MAX_TILE_CACHE=500;
const MAX_RUNTIME_CACHE=80;

const OFFLINE_URL='./offline.html';

const STATIC_ASSETS=[
  './',
  './index.html',
  './capitulo-1/','./capitulo-2/','./capitulo-3/','./capitulo-4/','./capitulo-5/','./capitulo-6/',
  './capitulo-7/','./capitulo-8/','./capitulo-9/','./capitulo-10/','./capitulo-11/',
  './analisis-territorial.html',
  './offline.html',
  './404.html',
  './manifest.json',
  './datasets.json',
  './seguridad-vial.json',
  './rengo-limite.geojson',
  './lectura-facil.json',
  './subdere-data.js',
  './lf-mode.css',
  './lf-mode.js',
  './institucional.css',
  './sitemap.xml',
  './robots.txt',
  './og-image.jpg',
  './Entrada-Rengo-Color-Pladeco.jpg',
  './Entrada-Rengo-Color-Pladeco.webp',
  './rengo-historia-collage.jpg',
  './rengo-historia-collage.webp',
  './mvv-mision.webp',
  './mvv-vision.webp',
  './mvv-principios.webp',
  './mvv-proyeccion.webp',
  './qr-encuesta.png',
  './1.png',
  './2.png',
  './splash-logo-2026.jpg',
  './mvv-mision.jpg',
  './mvv-vision.jpg',
  './mvv-principios.jpg',
  './mvv-proyeccion.jpg',
  './fuente-info.png',
  './escudo-rengo.svg',
  './escudo-rengo-blanco.svg',
  './logo-pladeco.png',
  './Logo-Pladeco-Blanco.png',
  './chatbot-dialogo.png',
  './fonts/Poppins-Medium.ttf',
  './fonts/Poppins-SemiBold.ttf',
  './fonts/Poppins-Bold.ttf',
  './fonts/Poppins-ExtraBold.ttf',
  'https://cdn.jsdelivr.net/npm/chart.js@4.4.4/dist/chart.umd.min.js',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
  'https://unpkg.com/leaflet.heat@0.2.0/dist/leaflet-heat.js'
];

/* ── Install: pre-cache static assets ── */
self.addEventListener('install',function(e){
  e.waitUntil(
    caches.open(CACHE_STATIC).then(function(c){
      return c.addAll(STATIC_ASSETS).catch(function(err){
        console.warn('[SW] Install: algunos assets fallaron pero continuamos:', err);
      });
    }).then(function(){return self.skipWaiting();})
  );
});

/* ── Activate: limpia cachés viejas + claim (sin postMessage para evitar loops de reload) ── */
self.addEventListener('activate',function(e){
  var keep=new Set([CACHE_STATIC,CACHE_IMG,CACHE_TILES,CACHE_RUNTIME]);
  e.waitUntil(
    caches.keys().then(function(ks){
      return Promise.all(ks.filter(function(k){return !keep.has(k);}).map(function(k){
        console.log('[SW] Eliminando cache vieja:', k);
        return caches.delete(k);
      }));
    }).then(function(){return self.clients.claim();})
  );
});

/* ── Helper: trim cache to max entries (LRU básico) ── */
function trimCache(name,max){
  caches.open(name).then(function(cache){
    cache.keys().then(function(keys){
      if(keys.length>max){
        cache.delete(keys[0]).then(function(){trimCache(name,max);});
      }
    });
  });
}

/* ── Helper: safe to cache? ── */
function isCacheable(req,res){
  if(req.method!=='GET') return false;
  if(res.status===0) return false;
  if(res.type==='opaque') return true; // OK para CORS images/tiles
  return res.ok;
}

/* ── Helper: detectar HTML/navegación ── */
function isHTML(req,url){
  if(req.mode==='navigate') return true;
  if(req.destination==='document') return true;
  var accept=req.headers.get('accept')||'';
  if(accept.indexOf('text/html')>=0) return true;
  if(/\.html$/i.test(url.pathname)) return true;
  if(url.pathname==='/'||url.pathname.endsWith('/')) return true;
  return false;
}

/* ── Fetch: estrategia por tipo de recurso ── */
self.addEventListener('fetch',function(e){
  var req=e.request;
  var url;
  try{url=new URL(req.url);}catch(err){return;}

  if(req.method!=='GET') return;

  /* 0. v45.107 · BYPASS: APIs externas en tiempo real (clima/aire/etc.)
     no deben pasar por la cache del SW. Si la SW las maneja con
     stale-while-revalidate y la network falla, devuelve undefined y
     rompe la respuesta. Dejarlas pasar directo a network. */
  var EXTERNAL_API_HOSTS=['api.open-meteo.com','air-quality-api.open-meteo.com','script.google.com','script.googleusercontent.com'];
  if(EXTERNAL_API_HOSTS.indexOf(url.hostname)>=0){
    return; /* permite que el navegador maneje el fetch directamente */
  }

  /* 1. OSM map tiles → cache-first, runtime cache */
  if(url.hostname.indexOf('tile.openstreetmap.org')>=0){
    e.respondWith(
      caches.match(req).then(function(r){
        if(r) return r;
        return fetch(req).then(function(res){
          if(isCacheable(req,res)){
            var cl=res.clone();
            caches.open(CACHE_TILES).then(function(c){
              c.put(req,cl);
              trimCache(CACHE_TILES,MAX_TILE_CACHE);
            });
          }
          return res;
        }).catch(function(){return new Response('',{status:404,statusText:'Tile offline'});});
      })
    );
    return;
  }

  /* 2. Imágenes → precache-first (CACHE_STATIC, fresco por release) → cache-first (CACHE_IMG) → red.
     Consultar CACHE_STATIC ANTES evita servir una imagen vieja de CACHE_IMG cuando el archivo
     fue reemplazado con el mismo nombre en una nueva version (self-healing al subir release). */
  var isImage=/\.(png|jpe?g|gif|svg|webp|ico|avif)(\?.*)?$/i.test(url.pathname);
  if(isImage){
    e.respondWith(
      caches.open(CACHE_STATIC).then(function(sc){return sc.match(req);}).then(function(pre){
        if(pre) return pre;
        return caches.match(req).then(function(r){
          if(r) return r;
          return fetch(req).then(function(res){
            if(isCacheable(req,res)){
              var cl=res.clone();
              caches.open(CACHE_IMG).then(function(c){
                c.put(req,cl);
                trimCache(CACHE_IMG,MAX_IMG_CACHE);
              });
            }
            return res;
          }).catch(function(){
            // Si es una imagen crítica del portal y falla, devolver placeholder SVG
            return new Response('<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100" height="100" fill="#e5e7eb"/><text x="50" y="55" text-anchor="middle" fill="#9ca3af" font-size="12" font-family="sans-serif">Offline</text></svg>',{status:200,headers:{'Content-Type':'image/svg+xml'}});
          });
        });
      })
    );
    return;
  }

  /* 3. HTML / Navegación → NETWORK-FIRST con fallback a offline.html */
  if(isHTML(req,url)){
    e.respondWith(
      fetch(req).then(function(res){
        if(res && res.ok){
          var cl=res.clone();
          caches.open(CACHE_STATIC).then(function(c){c.put(req,cl);});
        }
        return res;
      }).catch(function(){
        return caches.match(req).then(function(r){
          if(r) return r;
          return caches.match('./index.html').then(function(idx){
            if(idx) return idx;
            return caches.match(OFFLINE_URL);
          });
        });
      })
    );
    return;
  }

  /* 4. CSS / JS / Fuentes → stale-while-revalidate */
  e.respondWith(
    caches.match(req).then(function(cached){
      var networkPromise=fetch(req).then(function(res){
        if(res && res.ok && (res.type==='basic'||res.type==='cors')){
          var cl=res.clone();
          caches.open(CACHE_RUNTIME).then(function(c){
            c.put(req,cl);
            trimCache(CACHE_RUNTIME,MAX_RUNTIME_CACHE);
          });
        }
        return res;
      }).catch(function(){return cached;});
      return cached || networkPromise;
    })
  );
});

/* ── Mensajes desde la página ── */
self.addEventListener('message',function(e){
  if(!e.data) return;
  if(e.data.type==='SKIP_WAITING'){
    self.skipWaiting();
  }
  if(e.data.type==='CLEAR_CACHES'){
    caches.keys().then(function(ks){
      Promise.all(ks.map(function(k){return caches.delete(k);})).then(function(){
        if(e.ports[0]) e.ports[0].postMessage({status:'cleared'});
      });
    });
  }
  if(e.data.type==='GET_VERSION'){
    if(e.ports[0]) e.ports[0].postMessage({version:CACHE_STATIC,release:RELEASE});
  }
});
