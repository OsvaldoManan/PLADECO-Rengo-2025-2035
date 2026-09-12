// ══════════════════════════════════════════════════════
// PLADECO Rengo 2025-2035 · Service Worker v69.49
// Estrategia: network-first HTML · stale-while-revalidate assets · imágenes precache-first→cache-first · tiles cache-first
// v69.49: v45.336 - ENCARGO EDITORIAL/UX - §4 y §9 - MEDIDA DE LECTURA Y VERIFICACION POR TECLADO. (1) MEDIDA DE LINEA: el encargo pide 60-75 caracteres por linea. Medido con Range -contando los glifos REALES de la primera linea, no estimando- las lineas llegaban a 95-98 caracteres. Causa: 'section:not(.hero) p{max-width:720px!important}' imponia 720px LITERAL con !important y ganaba al token --ancho-lectura, que el propio sistema ya definia para esto. Ademas 70ch NO equivale a 70 caracteres: la unidad 'ch' mide el ancho del '0', mas ancho que las minusculas. Se hizo que la regla use el token y se calibro --ancho-lectura de 70ch a 58ch MIDIENDO el resultado. VERIFICADO: de 95-98 a 63-68 caracteres reales, dentro del rango pedido; en 390px el parrafo ocupa 334px sin desbordes. (2) CORRECCION DE UN FALSO POSITIVO PROPIO: un primer pase estimo el cuerpo en 13-15px y agrego reglas para subirlo a 16px. Al medir en un viewport de escritorio REAL (1280) resulto que el cuerpo YA era 16px y el interlineado YA era 1,6 -ambos dentro de lo que pide el §4-: los 13-15px eran efecto del clamp(15px,1.6vw,16px) evaluado en el panel angosto de pruebas, no un defecto del portal. Esas reglas se REVIRTIERON para no acumular cascada (el §4 pide consolidar, no sumar reglas). (3) §9 NAVEGACION POR TECLADO verificada con tabulacion REAL (no .focus() programatico, que no dispara :focus-visible): el primer tabulable es el enlace 'Saltar al contenido', y el foco es VISIBLE (outline solido verde 1,6px) en el buscador del hero, en las 4 cifras y en las acciones primaria y secundarias; las tarjetas de eje muestran ademas outline con el color del eje. 86 elementos focalizables visibles. Cache bump v69.48 -> v69.49.
// v69.48: v45.335 - ENCARGO EDITORIAL/UX - §6 y §10 - FUENTE COMUN Y REGISTRO DE DISCREPANCIAS. El encargo pide distinguir diferencias conceptuales de errores, REGISTRAR lo que requiere validacion institucional y NO elegir una cifra por intuicion. (1) Se documenta EN datosClave que 'objetivos:32' y 'acciones:225' NO provienen de la misma estructura: 32 es la suma de los OE declarados en EJES (5+5+5+6+5+6) y 225 es el numero de filas de _POL; EJES en cambio suma 200 acciones y _POL contiene solo 27 codigos OE unicos. O sea 32 vs 27 y 200 vs 225 son UNIVERSOS DISTINTOS, no erratas. (2) Nuevo objeto EDITABLE window.discrepanciasDatos con 6 entradas {id,tema,estado,valores,nota,resolucion}: objetivos 32/27, acciones 200/225, 27 codigos OE con 46 titulos distintos (rompe la agrupacion por nombre), denominacion 'acciones' vs 'politicas publicas', fecha de actualizacion desfasada en versionInfo ('junio 2026') y estado formal del instrumento sin declarar. (3) Se renderiza como TABLA VISIBLE al final de #metodologia -la pagina de fuentes y metodo-, antes de su .sec-fuente, con la advertencia explicita de que es un REGISTRO y que ninguna cifra del portal se modifico en funcion de estas notas. La tabla scrollea en su propio contenedor (§4: el cuerpo nunca scrollea en horizontal). VERIFICADO: 6 filas renderizadas con sus estados (por validar / por actualizar / por declarar), documento sin scroll horizontal, CERO fallos de contraste en ambos temas (cabecera 13,14 - celdas 17,85/14,41 - insignia de estado 6,37). NINGUNA cifra del portal fue alterada. Cache bump v69.47 -> v69.48.
// v69.47: v45.334 - ENCARGO EDITORIAL/UX - §3D y §4 - 'LAS PRIORIDADES DE DESARROLLO': los 6 EJES en RETICULA 3x2. El §4 pide los seis ejes en reticula de tres por dos con color consistente. Se detecto que '.eje-card' y '.eje-grid' existian en CSS -incluidas reglas de hover, reveal y responsive- pero NO se usaban en el HTML: eran CSS MUERTO de una presentacion anterior. Se reconstruye la presentacion leyendo el objeto EJES ya existente (id, short, name, color, oes), SIN duplicar datos: el color de cada eje sale de EJES[].color (paleta Okabe-Ito, la misma de los graficos) y se aplica como FILETE SUPERIOR e identidad, NUNCA como color de texto pequeno -esa paleta rinde 2,3-3,9:1 como texto, hallazgo de la auditoria de contraste-. Adaptacion progresiva 3x2 -> 2x3 (<=980px) -> 1 columna (<=620px). La seccion se inserta tras #intro-rutas y NO es unidad navegable: vive en la portada, como pide la secuencia editorial del §3. HALLAZGO DE DATOS que RESUELVE la discrepancia del §6: el portal tiene DOS estructuras paralelas y por eso conviven cifras distintas -EJES (estructura estrategica) suma 32 objetivos (5+5+5+6+5+6) y 200 acciones, mientras _POL (matriz operativa) contiene 225 filas y solo 27 codigos OE unicos-. Es decir: 32 y 27 NO son el mismo universo, y 200 vs 225 tampoco. Por eso las tarjetas muestran OBJETIVOS (32, coherente entre EJES y datosClave) y NO acciones, y la discrepancia queda registrada para validacion institucional en vez de resolverse por intuicion. VERIFICADO: 6 tarjetas en 3 columnas de 358px en 1280x800; CERO fallos de contraste en ambos temas (kicker 4,58/8,60 · titulo 16,30/16,19 · nombre 17,85/14,41 · descripcion y meta 7,58/10,63); en 390px una columna, sin scroll horizontal y sin desbordes. Cache bump v69.46 -> v69.47.
// v69.46: v45.333 - ENCARGO EDITORIAL/UX - §8 SUPERPOSICION DE FLOTANTES. Auditoria en 1280x800 de todo elemento position:fixed VISIBLE que ocupe area util: quedaban DOS botones flotando en esquinas OPUESTAS sobre el contenido durante la lectura -el asistente (#chatFab, abajo a la derecha) y 'Presentar' (#presBtn, abajo a la izquierda, 106x36)-, que es exactamente la superposicion entre asistente y presentacion que señala el encargo. ACCION: el boton flotante 'Presentar' se RETIRA y su acceso se traslada a la barra de utilidades del topnav (#tnPresent) y, ademas, a la seccion 'Apariencia y herramientas' del menu (#tnmPresent). El doble emplazamiento es necesario porque se detecto que '@media(max-width:1300px){.tn-tabs,.tn-utils{display:none}}' OCULTA la barra de utilidades bajo 1300px: con el boton solo en el topnav, el modo presentacion habria quedado inaccesible entre 768 y 1300px. Ambos botones son .tn-only-desktop porque el modo presentacion ya estaba oculto en movil. El #presBtn se conserva en el DOM (display:none) porque togglePresentation() actualiza su rotulo. VERIFICADO en 1280x800: los flotantes visibles bajan de 4 a 3 y el unico que tapa contenido es ya solo el asistente; el boton del menu mide 297x65 y responde; sin fallos de recursos en la pagina. Cache bump v69.45 -> v69.46.
// v69.45: v45.332 - ENCARGO EDITORIAL/UX - §5 LENGUAJE (sustitucion de terminos tecnicos en recorridos ciudadanos). 21 reemplazos SOLO en TEXTO VISIBLE, preservando ids, anclas, clases CSS y variables JS (§8 exige preservar enlaces y anclas): 'Dashboard' -> 'Panel de indicadores' (Dashboard Comunal, Dashboard de Indicadores, etiquetas de navegacion y listados); 'Argumentario' -> 'Fundamentos de las decisiones' (incluye 'Argumentario Estrategico - Agenda de arranque' y '- Matriz Ejecutiva'); 'KPIs' -> 'indicadores de seguimiento' con redaccion natural en espanol ('Semaforo (10 indicadores)', 'Tablero de 10 indicadores de seguimiento', '16 indicadores de seguimiento con avance actual vs meta', 'Sin indicadores de seguimiento ni linea base'); 'MRV' EXPANDIDO a su denominacion completa en las apariciones visibles: 'seguimiento MRV (medicion, reporte y verificacion)'. VERIFICADO: 'Dashboard' ya no aparece en el texto visible del portal y los destinos #dashboard y #argumentario siguen resolviendo (8 y 5 enlaces + sus ids intactos), es decir NO se rompio ninguna ancla. HALLAZGO REGISTRADO (no corregido aun): '.eje-card' y '.eje-grid' estan definidos en CSS -incluidas reglas responsive y de hover- pero NO se usan en el HTML: son CSS muerto de una presentacion anterior de los 6 ejes. El §4 pide una reticula 3x2 para los ejes, de modo que esa clase habra que reconstruirla o eliminarla en la fase de sistema visual. Cache bump v69.44 -> v69.45.
// (Historial completo de versiones: ver CHANGELOG.md en la raiz de Portal_PLADECO.
//  Se conservan aqui solo las 5 ultimas entradas: el SW se re-descarga en cada chequeo
//  de actualizacion y el changelog completo pesaba 286KB de los 289KB del archivo.)
// ══════════════════════════════════════════════════════
const CACHE_STATIC='pladeco-static-v69.49';
const RELEASE='v45.336'; // version legible (user-facing), se muestra en el sello del footer
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
