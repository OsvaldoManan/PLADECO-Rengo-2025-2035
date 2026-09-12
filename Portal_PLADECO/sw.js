// ══════════════════════════════════════════════════════
// PLADECO Rengo 2025-2035 · Service Worker v69.46
// Estrategia: network-first HTML · stale-while-revalidate assets · imágenes precache-first→cache-first · tiles cache-first
// v69.46: v45.333 - ENCARGO EDITORIAL/UX - §8 SUPERPOSICION DE FLOTANTES. Auditoria en 1280x800 de todo elemento position:fixed VISIBLE que ocupe area util: quedaban DOS botones flotando en esquinas OPUESTAS sobre el contenido durante la lectura -el asistente (#chatFab, abajo a la derecha) y 'Presentar' (#presBtn, abajo a la izquierda, 106x36)-, que es exactamente la superposicion entre asistente y presentacion que señala el encargo. ACCION: el boton flotante 'Presentar' se RETIRA y su acceso se traslada a la barra de utilidades del topnav (#tnPresent) y, ademas, a la seccion 'Apariencia y herramientas' del menu (#tnmPresent). El doble emplazamiento es necesario porque se detecto que '@media(max-width:1300px){.tn-tabs,.tn-utils{display:none}}' OCULTA la barra de utilidades bajo 1300px: con el boton solo en el topnav, el modo presentacion habria quedado inaccesible entre 768 y 1300px. Ambos botones son .tn-only-desktop porque el modo presentacion ya estaba oculto en movil. El #presBtn se conserva en el DOM (display:none) porque togglePresentation() actualiza su rotulo. VERIFICADO en 1280x800: los flotantes visibles bajan de 4 a 3 y el unico que tapa contenido es ya solo el asistente; el boton del menu mide 297x65 y responde; sin fallos de recursos en la pagina. Cache bump v69.45 -> v69.46.
// v69.45: v45.332 - ENCARGO EDITORIAL/UX - §5 LENGUAJE (sustitucion de terminos tecnicos en recorridos ciudadanos). 21 reemplazos SOLO en TEXTO VISIBLE, preservando ids, anclas, clases CSS y variables JS (§8 exige preservar enlaces y anclas): 'Dashboard' -> 'Panel de indicadores' (Dashboard Comunal, Dashboard de Indicadores, etiquetas de navegacion y listados); 'Argumentario' -> 'Fundamentos de las decisiones' (incluye 'Argumentario Estrategico - Agenda de arranque' y '- Matriz Ejecutiva'); 'KPIs' -> 'indicadores de seguimiento' con redaccion natural en espanol ('Semaforo (10 indicadores)', 'Tablero de 10 indicadores de seguimiento', '16 indicadores de seguimiento con avance actual vs meta', 'Sin indicadores de seguimiento ni linea base'); 'MRV' EXPANDIDO a su denominacion completa en las apariciones visibles: 'seguimiento MRV (medicion, reporte y verificacion)'. VERIFICADO: 'Dashboard' ya no aparece en el texto visible del portal y los destinos #dashboard y #argumentario siguen resolviendo (8 y 5 enlaces + sus ids intactos), es decir NO se rompio ninguna ancla. HALLAZGO REGISTRADO (no corregido aun): '.eje-card' y '.eje-grid' estan definidos en CSS -incluidas reglas responsive y de hover- pero NO se usan en el HTML: son CSS muerto de una presentacion anterior de los 6 ejes. El §4 pide una reticula 3x2 para los ejes, de modo que esa clase habra que reconstruirla o eliminarla en la fase de sistema visual. Cache bump v69.44 -> v69.45.
// v69.44: v45.331 - ENCARGO EDITORIAL/UX - FASE 1 (§2, §3A, §3B, §5 parcial). (1) TITULO TEXTUAL: el h1 del hero era sr-only (INVISIBLE); la identidad descansaba solo en el logo. Ahora hay h1 visible 'Plan de Desarrollo Comunal de Rengo 2025-2035' y el logo pasa de 380x208 a 200x109 (refuerza, ya no sustituye). Se detecto de paso que 18 reglas font-size compiten por el titulo del hero: se quito la propia y se dejo gobernar por la escala responsive ya existente (.hero h1,.hero-title), que anticipaba esta clase. (2) BAJADA de 29 palabras (<=45 segun §2) con el texto orientador del encargo, a max-width 62ch (§4: 60-75 caracteres por linea). (3) SELLO DE ESTADO derivado de window.versionInfo, rotulado explicitamente como 'Portal:' para SEPARAR el estado de desarrollo del portal del estado de aprobacion/ejecucion del PLADECO (§6): son cosas distintas y se confundian. La fecha no se escribe a mano. (4) ACCIONES con jerarquia: una PRIMARIA solida ('Conoce las prioridades del plan') y dos secundarias de contorno ('Explora tu territorio', 'Documentos y fuentes'), todas con area tactil 44px y foco visible. El 'Semaforo de Metas' SALE del hero -sigue accesible por navegacion- porque §2 pide no anunciar ejecucion ni resultados cuando el instrumento aun no los tiene. (5) CIFRAS 6 -> 4 (§3B), cada una con FUENTE y ANO: 63.620 Habitantes (Censo 2024 INE), 6 Ejes estrategicos, 225 Acciones del plan, 21 Unidades vecinales (SECPLA 2025). Se retiran '16/17 ODS' (esta en su seccion) y '32 Objetivos Estrategicos': esa cifra esta EN DISPUTA con los 27 codigos OE unicos que contiene realmente _POL, y el encargo prohibe propagar cifras sin validar. '225 Politicas Publicas' pasa a '225 Acciones del plan', que es lo que _POL contiene. (6) MAYUSCULAS SOSTENIDAS eliminadas en las etiquetas de cifras (§5): se corrigio la regla que ganaba de las 10 que compiten por .hero-stat .lbl. (7) BLOQUE 'El portal en 60 segundos' MOVIDO FUERA del hero a una nueva <section id='intro-rutas'> (§3A 'Presentacion y accesos'): aportaba 441 de los 1.372px del hero y empujaba todo bajo el pliegue. Conserva su diseno de texto claro, por lo que se le dio superficie navy propia en ambos temas -sacarlo sin envolver lo habria dejado con texto blanco sobre fondo blanco en modo claro-. (8) Titulos del BUSCADOR: ya no arrastran el simbolo de ancla del encabezado. RESULTADO MEDIDO en 1280x800: hero 1.372 -> 923px (-33%), de 171% a 115% del viewport; contraste del bloque movido 14,08 claro / 15,80 oscuro; en 360px sin scroll horizontal, titulo 20px sin desbordes y acciones en columna. Consola sin errores propios (los 404 son un endpoint EXTERNO de Google Apps Script del modulo de votacion, preexistente). NO se elimino contenido sustantivo. Cache bump v69.43 -> v69.44.
// v69.43: v45.330 - ESTRUCTURA · RESTITUIDO EL NIVEL 'PARTE' EN LA PORTADA + CONTADORES DERIVADOS. HALLAZGO: el portal tiene un marco narrativo de 4 PARTES (01 Apertura/Introduccion, 02 Que sabemos/Diagnostico, 03 Que vamos a hacer/Planificacion, 04 Recursos y continuo/Cierre) escrito en los divisores .macro-divider -con rotulo, titulo y bajada editorial- y referenciado por el chatbot ('4 partes y 11 capitulos'), pero esos divisores llevan la clase .pv-hidden desde que existe el motor de vistas (v45.66): quedaron 100% INVISIBLES y los 11 capitulos se leian como una lista PLANA sin jerarquia. Se verifico que NO se reutilizaban en ningun lugar visible del DOM. En cambio los 11 divs capitulo-N SI estan vivos: alimentan las tarjetas de la portada (comprobado: el texto de la tarjeta contiene el del div). ACCION: la portada 'Explora el Plan' agrupa ahora sus 11 tarjetas bajo las 4 Partes, LEYENDO los divisores del DOM (el mapeo lo define el orden del documento, no se hardcodea) -> Parte 01: cap I; Parte 02: caps II-IV; Parte 03: caps V-VII; Parte 04: caps VIII-XI. Nuevo componente .pv-parte (numero decorativo + rotulo + titulo + bajada) theme-aware y responsive. CONTADORES DESINCRONIZADOS corregidos (mismo patron que el Gantt): varios rotulos decian 68/53/50 secciones y '12 capitulos' cuando el portal tiene 75 y 11 -quick index, tour, 3 respuestas del chatbot y el buscador-; el del buscador es ahora DERIVADO de PV.units.length (span .sme-count + interpolacion en el render JS) para que no vuelva a desfasarse. VERIFICADO en navegador: 4 partes renderizadas con 1+3+3+4=11 tarjetas, encabezado '4 partes - 11 capitulos - 75 secciones'; contraste AA en ambos temas (rotulo 4,79/8,82; nombre 17,06/16,60; bajada 7,24/12,25) y el numero decorativo corregido de 1,42 a 3,73 claro / 3,33 oscuro ademas de marcarse aria-hidden por ser redundante con el rotulo 'Parte 01 / 04'; en 375px sin scroll horizontal, grilla a 1 columna; consola sin errores. Solo index.html + sw.js + CHANGELOG.md. NO se altero contenido: las bajadas son las ya escritas en los divisores. Cache bump v69.42 -> v69.43.
// v69.42: v45.329 - CRONOGRAMA · FIX DE LAYOUT al extender a septiembre 2026. La grilla del Gantt tenia el numero de columnas ESCRITO A MANO en el CSS: '.cg-chart{grid-template-columns:280px repeat(42,minmax(22px,1fr));min-width:1280px}' (y su variante movil con repeat(42,minmax(18px,1fr))). Al pasar el cronograma de 42 a 54 semanas en v45.327, las 12 columnas sobrantes quedaban IMPLICITAS y se auto-dimensionaban: por eso julio y agosto de 2026 salian COMPRIMIDOS respecto al resto de los meses (se ve en la captura del usuario: sus semanas '1 2 3 4' apretadas). ARREGLO: el CSS pasa a 'repeat(var(--cg-cols,42),minmax(var(--cg-colw,22px),1fr))' con 'min-width:var(--cg-minw)', y cgRender() fija --cg-cols y --cg-minw DERIVANDOLOS de CG_WEEKS.length y del ancho de columna vigente, de modo que el Gantt escale solo si se agregan o quitan meses (mismo criterio que los KPIs derivados de v45.327). La regla movil ya no repite la plantilla: solo redefine --cg-label:180px y --cg-colw:18px. VERIFICADO en escritorio: 54 columnas para 54 semanas, TODAS de 22px (antes 12 quedaban comprimidas), min-width autocalculado 1468px; en movil (375px): etiqueta 180px, 54 columnas de 18px, min-width 1152px y SIN scroll horizontal de pagina (el grafico scrollea en su propio contenedor). Confirmado ademas que la barra del macroproceso 8 termina exactamente en el borde derecho de la ultima semana (Septiembre S4 2026), es decir SI llega a septiembre. Consola sin errores propios (el unico 404 es un endpoint EXTERNO de Google Apps Script del modulo de votacion, preexistente). Solo index.html + sw.js + CHANGELOG.md. NO se alteraron datos. Cache bump v69.41 -> v69.42.
// (Historial completo de versiones: ver CHANGELOG.md en la raiz de Portal_PLADECO.
//  Se conservan aqui solo las 5 ultimas entradas: el SW se re-descarga en cada chequeo
//  de actualizacion y el changelog completo pesaba 286KB de los 289KB del archivo.)
// ══════════════════════════════════════════════════════
const CACHE_STATIC='pladeco-static-v69.46';
const RELEASE='v45.333'; // version legible (user-facing), se muestra en el sello del footer
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
