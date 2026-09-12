// ══════════════════════════════════════════════════════
// PLADECO Rengo 2025-2035 · Service Worker v69.54
// Estrategia: network-first HTML · stale-while-revalidate assets · imágenes precache-first→cache-first · tiles cache-first
// v69.54: v45.341 - ENCARGO EDITORIAL/UX - §7 GRAFICOS - TABLA EQUIVALENTE PARA TODOS. El §7 exige 'ofrece una tabla o descripcion equivalente' y el portal no tenia NINGUNA (0 tablas de datos y 0 funciones de ese tipo en todo el sitio). En vez de editar los ~27 graficos uno por uno, se agrega un MECANISMO GENERICO: cada lienzo con instancia de Chart.js recibe un boton 'Ver datos' que despliega una tabla accesible CONSTRUIDA DESDE LOS DATOS REALES del propio grafico (etiquetas + series con sus nombres), de modo que la tabla no puede desincronizarse de lo que se esta viendo. Marcado accesible: aria-expanded + aria-controls, encabezados th con scope de fila y columna, y la tabla scrollea en su PROPIO contenedor para no romper el ancho de la pagina. NOTA TECNICA: con el shim SafeChart las instancias viven en Chart.__real.getChart (Chart.getChart del shim no sirve), y los graficos se instancian de forma ASINCRONA por la cola de SafeChart, por lo que el montaje se reintenta al cargar, a los 1,2s y 3s, y tras cada cambio de hash; si un lienzo aun no tiene datos tabulables simplemente no se le pone boton. CORRECCION DE UN DIAGNOSTICO PROPIO: un primer pase reporto '18 de 27 graficos sin ficha'; al inspeccionar resulto FALSO POSITIVO -los graficos SI tienen titulo, explicacion y unidad, pero en clases propias (.fin-chart, .fc-sub) y no en h3/h4 dentro de .viz-card, que era lo que buscaba mi comprobacion-. Lo unico realmente ausente era la tabla equivalente. VERIFICADO en Situacion Financiera: 4 botones montados; al desplegar, tabla de 5 filas x 3 columnas con los encabezados y unidades reales del grafico ('Categoria', 'Ingreso total (MM$)', 'Gasto devengado 2024') y valores correctos; el boton alterna aria-expanded y su rotulo; CERO fallos de contraste en ambos temas (boton 7,58/10,63 - cabecera 13,14 - celdas 17,85/14,41); sin scroll horizontal de pagina. Cache bump v69.53 -> v69.54.
// v69.53: v45.340 - ENCARGO EDITORIAL/UX - §7 SEGUIMIENTO - LINEA BASE, VALOR OBSERVADO Y META. Dos problemas serios en el Semaforo de Metas, ambos de honestidad en la presentacion del dato. (1) La linea base 2024 se renderizaba con la clase 'mc-val CURRENT' y el rotulo 'Base 2024': visualmente se presentaba como el VALOR ACTUAL del indicador, cuando el PLADECO todavia no reporta ejecucion. Un lector razonable interpretaba '28%' como el estado de hoy. Ahora hay CUATRO casillas -Linea base 2024 / Valor observado / Meta 2028 / Meta 2035- y la de valor observado muestra un guion con el rotulo 'Pendiente de medicion' cuando no hay dato, que es justo lo que pide el §7: diferenciar 'sin informacion' y 'pendiente de medicion' de un CERO. El campo 'obs' de METAS_SEG queda listo para que SECPLAC cargue los valores medidos sin tocar codigo: si trae valor, la casilla pasa sola a 'Valor observado'. NO se invento ningun valor. (2) El color del semaforo se calcula con la razon linea base / meta 2035, es decir mide la MAGNITUD DEL DESAFIO, no el avance logrado; sin aclararlo un indicador en rojo se lee como 'meta incumplida'. Se agrega un aviso de lectura sobre la grilla que lo explica y advierte que 'pendiente de medicion' no equivale a cero. NOTA DE PROCESO: el primer intento rompio el render (16 tarjetas a 0) porque mi 'var grid' colisionaba con una declaracion previa del mismo scope -'Identifier grid has already been declared'-; se detecto por consola y se renombro a _semGrid. VERIFICADO: 16 tarjetas con sus 4 casillas, aviso presente, CERO fallos de contraste en ambos temas (aviso 17,85/14,41 - valor observado 7,24/12,02 - rotulo 6,78/13,27), sin scroll horizontal. Cache bump v69.52 -> v69.53.
// v69.52: v45.339 - ENCARGO EDITORIAL/UX - §7 CONSULTA TECNICA (matriz) + CORRECCION DE UN REGISTRO PROPIO. (1) HALLAZGO QUE RESUELVE LA DISCREPANCIA 32/27: la Matriz Estrategica YA declara ambos conjuntos como columnas separadas -'OE IMAGEN MUNICIPAL (32 OE INSTITUCIONALES)' y 'OE INTERNOS PLADECO (MATRIZ 2025-2035)', con sus KPIs '27 OE Internos PLADECO' y '32 OE Imagen Municipal'-. NO era una discrepancia sino dos conceptos documentados, exactamente como anticipaba el encargo. Se CORRIGE la entrada del registro que yo mismo habia marcado 'por validar' -era informacion engañosa- y pasa a 'documentado' (insignia verde, distinta de los pendientes reales) con la advertencia de que el riesgo es citar '32 objetivos' a secas fuera de la matriz. datosClave se anota en el mismo sentido. Lo que SI sigue sin resolver es 200 (suma de EJES[].nAcc) vs 225 (filas de _POL). (2) DESCARGA DE DATOS, que el §7 pide y la matriz no tenia: boton 'Descargar datos (CSV)' en la pestaña de politicas que exporta _POL con los MISMOS rotulos que el portal ya usa en el detalle de cada politica (N°, Eje, Codigo OE, Objetivo, Area, Nombre, Descripcion, Justificacion, Indicadores, Linea Base 2024, Meta 2028, Meta 2035, Plazo, Responsable, Financiamiento, ODS), de modo que descarga y pantalla coincidan. Separador ';' y BOM UTF-8 para que Excel en español abra bien los acentos; respeta el filtro de eje activo. (3) VERIFICADO ADEMAS que la matriz YA cumple otros puntos del §7: tiene filtros por eje (Todos, Eje 1-6) y buscador en la pestaña de politicas, resumen de resultados ('225 politicas'), agrupacion por OE con su conteo, y distingue LINEA BASE / META 2028 / META 2035 -el 'valor observado' no existe porque el instrumento aun no reporta ejecucion, lo que es coherente con no anunciar resultados-. NOTA DE PROCESO: la primera version del exportador quedo rota (los escapes y se convirtieron en saltos de linea REALES dentro de literales JS, rompiendo una expresion regular); se detecto por el error de consola y se reescribio sin escapes, con String.fromCharCode. VALIDACION DEL CSV: 226 lineas (1 encabezado + 225 acciones) y TODAS con exactamente 16 campos, comprobado contando separadores fuera de comillas. Consola limpia en pestaña nueva. Cache bump v69.51 -> v69.52.
// v69.51: v45.338 - ENCARGO EDITORIAL/UX - §3 E-I - CIERRE DE LA SECUENCIA DEL INICIO. El §3 pide que el inicio recorra A-I. A (presentacion y accesos), B (cifras verificadas en el hero), C (desafios) y D (prioridades) ya quedaron implementados en v45.331-337. Para E-I se decidio ENLAZAR y NO DUPLICAR: cada uno de esos bloques ya existe como seccion propia del portal (#mapa, #territorio, #compromisos, #poa, #cronograma-gantt, #semaforo, #participa, #encuesta, #documentos, #metodologia, #datos-abiertos) y el §5 pide expresamente reducir repeticiones entre introducciones, tarjetas y cierres; replicar su contenido en el inicio habria creado la redundancia que el encargo quiere evitar. Nuevo bloque #rutas-inicio (objeto EDITABLE window.rutasInicio) que declara, para cada letra, que se encontrara y a donde ir: E Explora tu territorio, F Del plan a la accion, G Seguimiento e hitos, H Participacion y devolucion, I Documentos y fuentes. Cada enlace se RENDERIZA SOLO SI su seccion destino existe en el DOM, de modo que el bloque no puede generar enlaces rotos aunque cambien los ids. VERIFICADO: la secuencia editorial real del inicio es hero -> intro-rutas -> desafios-plan -> ejes-prioridades -> rutas-inicio; 5 bloques con 11 enlaces y CERO rotos; ninguna de las secciones nuevas es unidad navegable (viven en la portada, no ensucian el menu de 75 secciones); CERO fallos de contraste en ambos temas (rotulo 6,92/11,95 - titulos 16,30/16,19 - enlaces 4,58/8,60); sin scroll horizontal. Cache bump v69.50 -> v69.51.
// v69.50: v45.337 - ENCARGO EDITORIAL/UX - §3C - 'LOS DESAFIOS QUE ORIENTAN EL PLAN'. Materializa el CRITERIO RECTOR del encargo (realidad territorial -> desafio -> prioridad -> donde profundizar): cuatro desafios, cada uno con su cifra, su FUENTE trazable, un enlace a LA EVIDENCIA y otro a LA RESPUESTA estrategica. Las cifras NO se inventan: salen del FODA comunal consolidado ya publicado y se citan con su codigo de origen para poder rastrearlas -D16 alcantarillado rural 51,4% vs 82,3% urbano; D7 areas verdes 1,96 m2/hab frente a los 9-10 de la OMS; D5 y D6 captacion 6,28% vs 13,89% regional y materializacion BIP 30,7%; D13 y D14 escolaridad 11,1 vs 12,1 nacional y parvularia 50,9%-. Objeto EDITABLE window.desafiosPlan. COMPOSICION EDITORIAL, no tarjetas: cifra destacada a la izquierda y texto a la derecha sobre filete, porque el §1 pide alternar formatos y no encerrar todo en contenedores iguales; en <=720px pasa a una columna. ORDEN DE LA SECUENCIA: el §3 exige C (desafios) antes de D (prioridades). Ambas secciones se anclaban al mismo punto y la ultima en renderizar quedaba primero, invirtiendo el orden; se corrigio haciendo que la reticula de ejes se ancle a #desafios-plan cuando existe. VERIFICADO: secuencia real en el DOM hero -> intro-rutas (§3A) -> desafios-plan (§3C) -> ejes-prioridades (§3D); 4 desafios con 8 enlaces y CERO rotos (#censo, #ict-espacios-publicos, #situacion-financiera, #matriz); CERO fallos de contraste en ambos temas (kicker 7,59/9,35 - cifra 16,30/16,19 - unidad 6,92/11,95 - enlaces 4,58/8,60); sin scroll horizontal ni desbordes; 0 recursos fallidos. Cache bump v69.49 -> v69.50.
// (Historial completo de versiones: ver CHANGELOG.md en la raiz de Portal_PLADECO.
//  Se conservan aqui solo las 5 ultimas entradas: el SW se re-descarga en cada chequeo
//  de actualizacion y el changelog completo pesaba 286KB de los 289KB del archivo.)
// ══════════════════════════════════════════════════════
const CACHE_STATIC='pladeco-static-v69.54';
const RELEASE='v45.341'; // version legible (user-facing), se muestra en el sello del footer
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
