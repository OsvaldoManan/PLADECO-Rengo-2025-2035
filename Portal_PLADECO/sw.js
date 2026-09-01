// ══════════════════════════════════════════════════════
// PLADECO Rengo 2025-2035 · Service Worker v69.42
// Estrategia: network-first HTML · stale-while-revalidate assets · imágenes precache-first→cache-first · tiles cache-first
// v69.42: v45.329 - CRONOGRAMA · FIX DE LAYOUT al extender a septiembre 2026. La grilla del Gantt tenia el numero de columnas ESCRITO A MANO en el CSS: '.cg-chart{grid-template-columns:280px repeat(42,minmax(22px,1fr));min-width:1280px}' (y su variante movil con repeat(42,minmax(18px,1fr))). Al pasar el cronograma de 42 a 54 semanas en v45.327, las 12 columnas sobrantes quedaban IMPLICITAS y se auto-dimensionaban: por eso julio y agosto de 2026 salian COMPRIMIDOS respecto al resto de los meses (se ve en la captura del usuario: sus semanas '1 2 3 4' apretadas). ARREGLO: el CSS pasa a 'repeat(var(--cg-cols,42),minmax(var(--cg-colw,22px),1fr))' con 'min-width:var(--cg-minw)', y cgRender() fija --cg-cols y --cg-minw DERIVANDOLOS de CG_WEEKS.length y del ancho de columna vigente, de modo que el Gantt escale solo si se agregan o quitan meses (mismo criterio que los KPIs derivados de v45.327). La regla movil ya no repite la plantilla: solo redefine --cg-label:180px y --cg-colw:18px. VERIFICADO en escritorio: 54 columnas para 54 semanas, TODAS de 22px (antes 12 quedaban comprimidas), min-width autocalculado 1468px; en movil (375px): etiqueta 180px, 54 columnas de 18px, min-width 1152px y SIN scroll horizontal de pagina (el grafico scrollea en su propio contenedor). Confirmado ademas que la barra del macroproceso 8 termina exactamente en el borde derecho de la ultima semana (Septiembre S4 2026), es decir SI llega a septiembre. Consola sin errores propios (el unico 404 es un endpoint EXTERNO de Google Apps Script del modulo de votacion, preexistente). Solo index.html + sw.js + CHANGELOG.md. NO se alteraron datos. Cache bump v69.41 -> v69.42.
// v69.41: v45.328 - GALERIA FOTOGRAFICA · eliminadas 2 imagenes a peticion del usuario (las identifico como '#1' y '#5'). Antes de borrar se ABRIERON las imagenes para confirmar cual era cual: (a) 'Imagenes entrevista/8.jpg' (#1) resulto ser material de MACHALI -'Proyecto de Planificacion Estrategica Machali', '¿Que debemos hacer en Machali?', 'Ejes Estrategicos M. Machali'-, es decir contenido de OTRA comuna publicado por error en el portal de Rengo; (b) 'Imagenes entrevista/12.jpg' (#5) es el afiche 'Situacion de Rengo, Rosario y Localidades' con el mapa de calor de percepcion por localidad. Se descarto por inspeccion visual que fueran 9/10/11.jpg, que si son de Rengo. ACCIONES: se quitan ambas entradas de GALERIA_FOTOS (18 -> 16) y se RENUMERAN los titulos de forma secuencial '#1'..'#16' para no dejar huecos en la numeracion. Ademas se eliminan del repositorio los dos archivos (git rm, 350KB + 193KB): quedaban huerfanos (0 referencias en index.html) y no estaban en el precache del SW, y al ser un repositorio publico no corresponde seguir publicando material de otra comuna. El contador de la galeria se deriva de GALERIA_FOTOS.length, asi que se actualizo solo a '16 registros fotograficos'. VERIFICADO en pestana limpia: 16 tarjetas, 8.jpg y 12.jpg ausentes, primeras imagenes 9/10/11/13.jpg, contador correcto, consola SIN errores. index.html + sw.js + CHANGELOG.md + 2 archivos borrados. NO se altero ningun otro contenido. Cache bump v69.40 -> v69.41.
// v69.40: v45.327 - CRONOGRAMA (Carta Gantt) · NUEVO MACROPROCESO 8 'Proceso de Evaluacion del PLADECO 2025-2035' (mayo a septiembre de 2026), a peticion del usuario. (1) El cronograma terminaba en junio 2026: se EXTIENDE CG_MONTHS_DEF con julio, agosto y septiembre de 2026 (11 -> 14 meses, 42 -> 54 semanas). (2) BUG QUE HABRIA ROTO LAS FECHAS: la funcion cgWi(mes,semana) busca solo por ABREVIATURA de mes y devuelve la PRIMERA coincidencia; al existir ahora 'Ago' y 'Sep' en 2025 y en 2026, el nuevo proceso habria quedado anclado a 2025. Se le agrega un 3er parametro OPCIONAL de anio (sin anio conserva el comportamiento previo, por lo que las 30+ llamadas existentes siguen resolviendo igual: verificado que P1..P7 mantienen exactamente sus periodos originales). El macroproceso 8 usa cgWi('May',1,'2026') -> cgWi('Sep',4,'2026'). (3) COLOR violeta (#4c1d95/#7c3aed) para distinguirlo de los 7 anteriores; icono lupa. Su desglose de actividades queda declarado 'por definir (SECPLAC)': NO se inventan sub-actividades, solo se registra el periodo que indico el usuario. (4) KPIs DERIVADOS: los contadores de la seccion (Macroprocesos / Actividades / Semanas / Periodo) estaban escritos a mano y YA estaban desfasados antes de este cambio -decian '7 macroprocesos y 30 actividades' cuando los datos tenian 7 y 32-. Ahora una funcion cgSyncKpis() los calcula desde CG_DATA y CG_WEEKS en cada render, de modo que no vuelvan a quedar obsoletos: 8 macroprocesos, 33 actividades, 54 semanas, 'Ago 25 - Sep 26'. Se actualizaron ademas los textos en prosa (intro, subtitulo del PDF, aviso de scroll y el enlace del indice). VERIFICADO en pestana limpia: 14 meses en la cabecera terminando en 'Septiembre 26', chip de filtro '8. Proceso de Evaluacion' presente, P1..P7 con sus fechas intactas, KPIs 8/33/54/Ago 25-Sep 26 coherentes con los datos, consola SIN errores. Solo index.html + sw.js + CHANGELOG.md. NO se alteraron los datos de los 7 procesos existentes. Cache bump v69.39 -> v69.40.
// v69.39: v45.326 - CONTRASTE WCAG AA · 4a RONDA (texto sobre superficies FIJAS) + HALLAZGO GRAVE. HALLAZGO: las 5 tarjetas de la LINEA HISTORICA (.hist-card) tienen fondo navy FIJO (#142036) en ambos temas, pero TODO su texto -titulo, parrafo y destacados- usaba var(--text), que en modo CLARO es casi negro => las tarjetas quedaban ILEGIBLES en modo claro (~1,10:1); solo funcionaban en oscuro. No era un problema de los <strong> como parecia al agrupar por patron: era la tarjeta completa. Primer intento (color:inherit en los strong) NO sirvio, porque heredaban el mismo color roto del parrafo; el arreglo correcto fija texto claro en .hist-card y hace que titulo/parrafo/destacados lo hereden. Resultado: la seccion historia pasa de 111 a 13 fallos en claro, con el texto de tarjeta en #e2e8f0 sobre #142036 (~13:1) verificado en runtime. OTRAS CORRECCIONES de la misma causa raiz: (a) pie de la tabla de unidades vecinales (.uv-table tfoot td/th) con fondo navy fijo y texto oscuro (1,54:1) -> blanco; (b) 'table th{color:#fff!important}' para completar lo hecho en v45.323, porque la regla global 'table th{background:navy!important}' pinta de navy TAMBIEN los th fuera de <thead> (cabeceras de fila), que seguian con texto oscuro (1,26:1 en #mbht-bienestar); (c) destacados del recuadro naranja de la ERD (.erd-io strong/b/em) con navy fijo sobre fondo que en oscuro queda oscuro (1,02:1) -> heredan; (d) insignias con fondo claro fijo: .arg-tag (3,16:1), .ict-hall-stat (3,44:1) y .sv-tag de movilidad (4,18:1) -> texto oscuro accesible. RESULTADO MEDIDO (barrido completo, ~13.600 elementos por tema): CLARO 566 -> 478, OSCURO 386 -> 396 (variacion dentro del ruido de secciones que reflowan). ACUMULADO DE LA AUDITORIA: CLARO 1.357 -> 478 (-65%), OSCURO 931 -> 396 (-57%). Consola SIN errores verificada en pestana limpia (los errores que aparecen en la pestana de trabajo son residuo de borrar cache repetidamente durante la auditoria, no del portal). Solo institucional.css + sw.js + CHANGELOG.md. NO se alteraron datos ni contenido (solo color). Cache bump v69.38 -> v69.39.
// v69.38: v45.325 - CONTRASTE WCAG AA · 3a RONDA (cola larga) + CORRECCION DE UNA REGRESION PROPIA. (1) TOKEN GRIS MARGINAL: --muted y --text-secondary valian #6b7c94 = 4,25:1 sobre blanco, apenas bajo el minimo AA de 4,5; pasan a #64748b (4,76:1), visualmente casi identico, lo que corrige de una ~60 elementos (.eq-cargo, .test-origen, .cmp-label, .comp-desc, etc.). (2) 381 LITERALES SEMANTICOS mas convertidos a tokens theme-aware: #ef4444 (27) y #dc2626 (119) -> --danger-txt; #f59e0b (65), #f5921d (55), #d97706 (23) y #dc7a0c (9) -> --warning-txt; #059669 (12) -> --success-txt; #6087c7 (71) -> --c-navy. Siempre con lookbehind negativo para no tocar background-color/border-color. (3) REGRESION INTRODUCIDA POR ESTA MISMA CONVERSION, detectada al revisar la captura y corregida: los elementos cuyo FONDO es un claro FIJO (p. ej. background:#fef3c7) quedaban con el token PALIDO del modo oscuro (--warning-txt = #fcd9a5) sobre ese fondo claro => texto casi invisible; se vio en las tarjetas 'Cumplidos / En Curso / Pendientes / Avance' de #compromisos. Es la 2a causa raiz que ya habia quedado documentada (fondo fijo + token theme-aware) mordiendose la cola. Corregido en dos frentes: (a) 38 REGLAS CSS con background:<claro fijo> + color:var(--*-txt) reescritas a color FIJO accesible (#065f46 verde / #92400e ambar / #991b1b rojo) mediante script con verificacion de 0 restantes; (b) GUARDA de selectores de atributo en institucional.css para los 15 casos inline y para cualquier caso futuro: [style*="background:#fef3c7" i]{color:#92400e!important} y equivalentes para #d1fae5/#dcfce7/#ecfdf5, #fee2e2, #dbeafe, #fff7ed/#fefce8. VERIFICADO: las tarjetas de Compromisos pasan de ilegibles a 6,37-8,49:1, comprobado con captura en modo oscuro. (4) Mas casos de fondo fijo corregidos con color fijo: .cmp-delta.up/.down, .compromiso-item .comp-estado (3 estados), franja naranja .ficha-strip-num/.ficha-strip-txt (2,10:1 y 1,98:1 -> texto navy), y el boton 'Descargar' .graf-pack .gp-btn.primary + :hover (blanco sobre el verde medio de acento, 3,60:1 claro / 2,17:1 oscuro -> verde oscuro con blanco en claro, verde claro con texto oscuro en oscuro; mismo criterio que .diag-btn.primary). RESULTADO MEDIDO (barrido completo de las 70 secciones, ~13.600 elementos por tema): CLARO 944 -> 566 fallos, OSCURO 597 -> 386. ACUMULADO de la auditoria completa: CLARO 1.357 -> 566 (-58%), OSCURO 931 -> 386 (-59%). Consola SIN errores; capturas verificadas en claro y oscuro. Solo index.html + institucional.css + sw.js + CHANGELOG.md. NO se alteraron datos ni contenido (solo color). Cache bump v69.37 -> v69.38.
// (Historial completo de versiones: ver CHANGELOG.md en la raiz de Portal_PLADECO.
//  Se conservan aqui solo las 5 ultimas entradas: el SW se re-descarga en cada chequeo
//  de actualizacion y el changelog completo pesaba 286KB de los 289KB del archivo.)
// ══════════════════════════════════════════════════════
const CACHE_STATIC='pladeco-static-v69.42';
const RELEASE='v45.329'; // version legible (user-facing), se muestra en el sello del footer
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
