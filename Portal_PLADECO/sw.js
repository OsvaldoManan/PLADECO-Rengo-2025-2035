// ══════════════════════════════════════════════════════
// PLADECO Rengo 2025-2035 · Service Worker v69.57
// Estrategia: network-first HTML · stale-while-revalidate assets · imágenes precache-first→cache-first · tiles cache-first
// v69.57: v45.344 - REVISION EDITORIAL (rama, NO PUBLICADA) - §6 EJES y §12 VERIFICACION DE DESCARGAS. §6: las tarjetas de los 6 ejes reciben (a) un ICONO propio de la familia SVG ya existente en el portal -corazon, maletin, educacion, montana, escudo e institucion-, coloreado con el color del eje; (b) el numero de ACCIONES, y (c) un enlace explicito 'Ver objetivos y acciones'. EL DATO DE ACCIONES SE DERIVA DE _POL, no de EJES[].nAcc, porque se comprobo que este ultimo esta DESACTUALIZADO: declara 200 cuando la matriz operativa tiene 225 filas, y el desglose real por eje es 58/18/14/53/32/50 frente al declarado 54/17/14/43/28/44. VERIFICACION CLAVE antes de escribir el texto: el encargo pide 'explicar las acciones compartidas entre ejes para evitar interpretar sus cifras como sumables', pero al medirlo resulto que NO EXISTEN acciones compartidas -0 acciones repetidas en mas de un eje y 0 ids duplicados-, y la suma por eje da EXACTAMENTE 225. Por eso el texto dice lo contrario de lo que sugeria el encargo: cada accion pertenece a un solo eje y los totales SI son sumables. No se escribio una advertencia que los datos no respaldan. §12: se verificaron los 43 enlaces de descarga distintos del portal y TODOS los archivos existen (0 rotos); ademas la seccion de documentos ya declara formato, tamano, fecha y distingue preliminar de aprobado, de modo que ese punto del encargo ya estaba cumplido. VERIFICADO: 6 tarjetas con icono, meta y enlace; la suma de acciones mostradas da 225; CERO fallos de contraste en ambos temas (nombre 17,85/14,41 - meta 7,58/10,63 - enlace 5,02/7,65). Cache bump v69.56 -> v69.57.
// v69.56: v45.343 - REVISION EDITORIAL (rama revision-editorial, NO PUBLICADA) - §2 PRIMERA PANTALLA + §3 ETIQUETA LF. INVENTARIO previo: 27 imagenes en la raiz, 16 fotografias del proceso, 32 diagramas, 32 figuras de proyeccion y 13 pictogramas. HALLAZGO: existe una fotografia AUTENTICA de Rengo en el propio proyecto -Entrada-Rengo-Color-Pladeco.jpg, 2560x1440, vista aerea con la avenida de acceso, el damero urbano y la cordillera nevada- que hasta ahora se usaba solo como FONDO FIJO de todo el portal, es decir como elemento decorativo detras de texto denso, justo lo que el encargo pide evitar. Ahora es una PIEZA EDITORIAL de la portada, con encuadre (object-position 50% 62% en escritorio, 58% en movil para no cortar la cordillera) y pie propio. PORTADA EN DOS COLUMNAS: texto a la izquierda (logo, titulo, introduccion, estado, tres accesos y buscador) y fotografia a la derecha; en <=900px se apila y la imagen pasa primero. Introduccion de 38 palabras (el encargo pide 30-45). Los TRES ACCESOS son ahora los solicitados: 'Conocer el plan' (principal, solida) -> #matriz, 'Explorar mi territorio' -> #territorio y 'Consultar avances' -> #cronograma-gantt; este ultimo apunta al cronograma y no al semaforo porque lo documentado es el avance del PROCESO, no la ejecucion del plan. CIFRAS TRASLADADAS FUERA de la portada a una franja editorial #cifras-franja ('Rengo en contexto'), como pide el encargo. BUG CORREGIDO al trasladarlas: venian del hero (disenadas para fondo oscuro) y sobre la superficie clara de la franja el numero quedaba BLANCO SOBRE BLANCO (1:1) en tema claro; mismo patron ya visto en otros bloques movidos. §3: se elimina la sigla criptica 'LF' del boton de Lectura Facil en la barra de utilidades -los otros botones de esa barra son solo icono y el nombre accesible ya existia en title y aria-label-; en el menu, donde hay espacio, el boton ya decia 'Lectura Facil' completo. VERIFICADO en 1440x900: dos columnas reales (574px + 602px), hero 757px = 84% del viewport -cabe por primera vez en una pantalla, venia de 171%-, titulo completo sin desbordes, foto 601x400. En 360px: apilado, titulo integro a 20px sin recortes, accesos en columna, sin scroll horizontal. Los 3 accesos resuelven a secciones existentes (0 rotos). CERO fallos de contraste en ambos temas. Consola limpia en pestana nueva, 0 recursos fallidos, 75 unidades intactas. Cache bump v69.55 -> v69.56.
// v69.55: v45.342 - ENCARGO EDITORIAL/UX - §7 FICHAS TERRITORIALES - ESCALA Y PROCEDENCIA. El §7 exige que una ficha territorial declare su ESCALA GEOGRAFICA y la FECHA de los datos, y que no se atribuyan cifras comunales a una localidad sin respaldo. HALLAZGO al verificar la tabla de #territorio: tiene 25 filas pero NO son 25 unidades vecinales -son 21 UV con codigo (UV-1..UV-21) MAS 4 localidades rurales que no tienen unidad vecinal constituida: Popeta, Pueblo Hundido, San Jorge y Santa Isabel-. Es decir, la tabla MEZCLA DOS ESCALAS (unidad vecinal y localidad, que no son equivalentes) sin declararlo, y el lector asume que las 25 filas son unidades vecinales. ACCION: ficha de escala y procedencia sobre la tabla que declara (a) la composicion mixta, CONTANDO las filas reales en vez de usar cifras escritas a mano -si manana se agrega una localidad, la nota se actualiza sola-; (b) los nombres de las 4 localidades sin UV; (c) la procedencia por columna: poblacion y NNA del Censo 2024 (INE), proyectos e inversion del Banco Integrado de Proyectos; (d) que el guion significa SIN REGISTRO EN LA FUENTE y NO equivale a cero -la misma distincion que se aplico al semaforo en v45.340-; y (e) que las cifras son propias de cada territorio y NO se reparten totales comunales entre localidades, que es exactamente lo que el §7 prohibe. VERIFICADO: nota presente e inmediatamente anterior a la tabla, con las cifras derivadas correctas (21 y 4) y los nombres reales; CERO fallos de contraste en ambos temas (cuerpo 7,58/10,63 - destacados 17,85/14,41); sin scroll horizontal. Cache bump v69.54 -> v69.55.
// v69.54: v45.341 - ENCARGO EDITORIAL/UX - §7 GRAFICOS - TABLA EQUIVALENTE PARA TODOS. El §7 exige 'ofrece una tabla o descripcion equivalente' y el portal no tenia NINGUNA (0 tablas de datos y 0 funciones de ese tipo en todo el sitio). En vez de editar los ~27 graficos uno por uno, se agrega un MECANISMO GENERICO: cada lienzo con instancia de Chart.js recibe un boton 'Ver datos' que despliega una tabla accesible CONSTRUIDA DESDE LOS DATOS REALES del propio grafico (etiquetas + series con sus nombres), de modo que la tabla no puede desincronizarse de lo que se esta viendo. Marcado accesible: aria-expanded + aria-controls, encabezados th con scope de fila y columna, y la tabla scrollea en su PROPIO contenedor para no romper el ancho de la pagina. NOTA TECNICA: con el shim SafeChart las instancias viven en Chart.__real.getChart (Chart.getChart del shim no sirve), y los graficos se instancian de forma ASINCRONA por la cola de SafeChart, por lo que el montaje se reintenta al cargar, a los 1,2s y 3s, y tras cada cambio de hash; si un lienzo aun no tiene datos tabulables simplemente no se le pone boton. CORRECCION DE UN DIAGNOSTICO PROPIO: un primer pase reporto '18 de 27 graficos sin ficha'; al inspeccionar resulto FALSO POSITIVO -los graficos SI tienen titulo, explicacion y unidad, pero en clases propias (.fin-chart, .fc-sub) y no en h3/h4 dentro de .viz-card, que era lo que buscaba mi comprobacion-. Lo unico realmente ausente era la tabla equivalente. VERIFICADO en Situacion Financiera: 4 botones montados; al desplegar, tabla de 5 filas x 3 columnas con los encabezados y unidades reales del grafico ('Categoria', 'Ingreso total (MM$)', 'Gasto devengado 2024') y valores correctos; el boton alterna aria-expanded y su rotulo; CERO fallos de contraste en ambos temas (boton 7,58/10,63 - cabecera 13,14 - celdas 17,85/14,41); sin scroll horizontal de pagina. Cache bump v69.53 -> v69.54.
// v69.53: v45.340 - ENCARGO EDITORIAL/UX - §7 SEGUIMIENTO - LINEA BASE, VALOR OBSERVADO Y META. Dos problemas serios en el Semaforo de Metas, ambos de honestidad en la presentacion del dato. (1) La linea base 2024 se renderizaba con la clase 'mc-val CURRENT' y el rotulo 'Base 2024': visualmente se presentaba como el VALOR ACTUAL del indicador, cuando el PLADECO todavia no reporta ejecucion. Un lector razonable interpretaba '28%' como el estado de hoy. Ahora hay CUATRO casillas -Linea base 2024 / Valor observado / Meta 2028 / Meta 2035- y la de valor observado muestra un guion con el rotulo 'Pendiente de medicion' cuando no hay dato, que es justo lo que pide el §7: diferenciar 'sin informacion' y 'pendiente de medicion' de un CERO. El campo 'obs' de METAS_SEG queda listo para que SECPLAC cargue los valores medidos sin tocar codigo: si trae valor, la casilla pasa sola a 'Valor observado'. NO se invento ningun valor. (2) El color del semaforo se calcula con la razon linea base / meta 2035, es decir mide la MAGNITUD DEL DESAFIO, no el avance logrado; sin aclararlo un indicador en rojo se lee como 'meta incumplida'. Se agrega un aviso de lectura sobre la grilla que lo explica y advierte que 'pendiente de medicion' no equivale a cero. NOTA DE PROCESO: el primer intento rompio el render (16 tarjetas a 0) porque mi 'var grid' colisionaba con una declaracion previa del mismo scope -'Identifier grid has already been declared'-; se detecto por consola y se renombro a _semGrid. VERIFICADO: 16 tarjetas con sus 4 casillas, aviso presente, CERO fallos de contraste en ambos temas (aviso 17,85/14,41 - valor observado 7,24/12,02 - rotulo 6,78/13,27), sin scroll horizontal. Cache bump v69.52 -> v69.53.
// (Historial completo de versiones: ver CHANGELOG.md en la raiz de Portal_PLADECO.
//  Se conservan aqui solo las 5 ultimas entradas: el SW se re-descarga en cada chequeo
//  de actualizacion y el changelog completo pesaba 286KB de los 289KB del archivo.)
// ══════════════════════════════════════════════════════
const CACHE_STATIC='pladeco-static-v69.57';
const RELEASE='v45.344'; // version legible (user-facing), se muestra en el sello del footer
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
