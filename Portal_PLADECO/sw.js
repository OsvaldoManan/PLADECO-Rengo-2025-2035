// ══════════════════════════════════════════════════════
// PLADECO Rengo 2025-2035 · Service Worker v69.37
// Estrategia: network-first HTML · stale-while-revalidate assets · imágenes precache-first→cache-first · tiles cache-first
// v69.37: v45.324 - CONTRASTE WCAG AA · 2a RONDA (barrido de las 70 secciones, medidor mejorado). El medidor ahora hace COMPOSICION ALFA real (acumula capas semitransparentes hasta la primera opaca) en vez de saltarse los fondos con alpha<0.85, lo que elimina otra tanda de falsos positivos. Universo medido: 13.369 elementos renderizados en claro y 13.395 en oscuro, seccion por seccion, con transiciones desactivadas. CAUSA RAIZ DOMINANTE IDENTIFICADA: el verde de acento #2d9a4d / var(--accent) usado como COLOR DE TEXTO (rinde ~3,0:1 sobre blanco; sirve como relleno, no como texto pequeno) y, en segundo lugar, colores semanticos literales (#15803d/#92400e/#b91c1c) que NO invierten en modo oscuro. CORRECCIONES: (1) REEMPLAZO ACOTADO en index.html de 293 declaraciones 'color:var(--accent)' (154) y 'color:#2d9a4d' (139) por 'color:var(--success-txt,#15803d)' -token que ya existia para esto, #15803d claro / #5cc98a oscuro-. La expresion usa lookbehind negativo para NO tocar background-color/border-color/-webkit-text-fill-color: verificado que los 39 'background:var(--accent)' (rellenos) quedan INTACTOS, o sea el verde sigue siendo el mismo como fondo y solo cambia como texto. (2) 73 literales semanticos mas pasados a token theme-aware: 38 color:#15803d -> --success-txt, 16 color:#92400e -> --warning-txt, 19 color:#b91c1c -> --danger-txt (estos fallaban solo en oscuro, donde no invertian). (3) Bloque agrupado en institucional.css (carga ultimo, facil de revisar y revertir) con 12 correcciones puntuales, cada una anotada con su ratio ANTES: insignias de estado SUBDERE .is-est y .is-linea-est (2,71:1 -> color del estado como identidad en el tinte y el borde, texto var(--text)); .anest-pond (3,03:1); valor y chip activo del comparador de metas (3,15:1 y 3,89:1); boton dentro de la cabecera navy .ci-obs-btn (1,13:1, navy sobre navy); .me-oe-text (1,00:1 en oscuro: su celda tiene fondo SIEMPRE claro y el texto seguia a var(--text)); .hist-tag (1,81:1 en claro: vive sobre superficie SIEMPRE oscura); .diag-btn.primary (3,60:1 claro / 2,17:1 oscuro, blanco sobre el verde medio); y captura de los usos INLINE via selectores de atributo [style*="color:#2d9a4d"] / [style*="color:#b88a0b"]. SEGUNDA CAUSA RAIZ DOCUMENTADA (queda como cola larga): elementos sobre fondos FIJOS -siempre claros o siempre oscuros- que usan tokens de texto theme-aware y por eso se invierten al reves en uno de los dos temas. RESULTADO MEDIDO en el barrido completo: CLARO 1.357 -> 944 fallos (-30%), OSCURO 931 -> 597 (-36%). Por seccion, ejemplos: inversion-subdere 117 -> 7 (claro) y 98 -> 8 (oscuro); analisis-estrategico-censo 23 -> 0 (oscuro); comparador-instrumentos 39 -> 0 (oscuro); metas-trayectoria 77 -> ~0 (oscuro). Consola SIN errores en pestana limpia y captura del portal correcta. Solo index.html + institucional.css + sw.js + CHANGELOG.md. NO se alteraron datos ni contenido (solo color). Cache bump v69.36 -> v69.37.
// v69.36: v45.323 - AUDITORIA DE CONTRASTE WCAG AA · 4 BUGS SISTEMICOS CORREGIDOS. Se midio el ratio real (formula WCAG, fondo efectivo resuelto subiendo por el arbol) sobre elementos REALMENTE renderizados, en ambos temas. NOTA DE METODO: los dos primeros pases dieron ~2.200 'fallos' FALSOS por dos motivos que hubo que corregir en el propio medidor -leer solo background-color ignora los degradados, y medir justo tras alternar el tema captura la TRANSICION de 400ms a medio camino-; el pase valido desactiva transiciones y descarta fondos con degradado. BUGS REALES CORREGIDOS: (1) FUGA DE TOKENS DE MODO OSCURO AL MODO CLARO: el bloque '@media (prefers-color-scheme:dark){ body:not(.light){ --c-text-3:#a5a299; --c-text-footnote:#a5a299 } }' nunca se desactivaba porque el portal NO usa una clase 'light' (su modo claro es la AUSENCIA de '.dark'); por eso, a TODO usuario con el SO en oscuro que usara el portal en claro se le aplicaban los tokens de texto oscuro sobre fondo blanco => 2,55:1 (falla AA) en notas al pie y textos terciarios. Bloque ELIMINADO: era ademas redundante (body.dark ya define ambos tokens) y el JS ya aplica '.dark' segun la preferencia del SO. (2) CABECERAS DE TABLA ILEGIBLES (1,11:1) por COLISION DE CAPAS: la capa antigua pinta 'table th{background:rgb(19,46,99)!important}' (navy) y la capa v45.35 imponia 'section table thead th{color:var(--text-2)!important}' (gris oscuro #1e293b) con mayor especificidad => texto oscuro sobre navy en POA, Situacion Financiera, Censo, ERD y toda tabla dentro de <section>. Corregido a color:#fff!important, que es lo que ya declaran TODAS las reglas especificas del portal (.poa-table/.fin-table/.chart-data-table/.uv-table/.comp-table/.is-tabla). (3) PALETA OKABE-ITO COMO TEXTO PEQUENO en el POA: las insignias de eje y el nº de accion usaban el color del eje como COLOR DE TEXTO sobre blanco (2,31-3,87:1; ~300 instancias, 225 acciones x varios elementos). La paleta Okabe-Ito es segura para RELLENOS, no para texto pequeno. Ahora el color del eje queda como IDENTIDAD en el fondo tenido + el borde de la insignia, y el texto pasa a var(--text); el nº de accion deja de duplicar ese color (la insignia contigua ya lo indica). (4) VERDE FIJO DE MODO CLARO EN OSCURO: '.poa-metalink' usaba #15803d fijo => 3,15:1 sobre superficies oscuras (225 enlaces 'Semaforo'); pasa al token theme-aware --success-txt (#15803d claro / #5cc98a oscuro), que existe justo para esto. RESULTADO MEDIDO (fallos, antes -> despues): POA claro 301->5 y oscuro 354->3; Dashboard claro 16->1; Situacion Financiera claro 30->9; Sociedad Civil claro 7->1; Censo claro 31->24. Consola SIN errores en pestana limpia. Solo index.html + sw.js + CHANGELOG.md. NO se alteraron datos ni contenido (solo color y presentacion). Cache bump v69.35 -> v69.36.
// v69.35: v45.322 - AUDITORIA DE ENLACES Y DEDUPLICACION DE COMPONENTE. Auditoria en vivo del DOM (enlaces internos, ids duplicados, graficos omitidos, imagenes sin alt). RESULTADOS LIMPIOS: 0 ids duplicados, 0 graficos omitidos (window.__chartSkipped vacio), 69 imagenes y 0 sin alt. DEFECTOS ENCONTRADOS Y CORREGIDOS: (1) ENLACE ROTO '#testimonios' -> el propio codigo tenia el comentario 'v45.129 · Testimonios fusionados a #suenos', pero el enlace 'Testimonios Ciudadanos' seguia apuntando al destino eliminado; el motor de vistas no lo reconoce y REESCRIBE el hash a #inicio, es decir el usuario terminaba en la PORTADA en vez del contenido. Corregido a #suenos (verificado: el clic ahora muestra la seccion suenos). (2) ENLACE ROTO '#quickIndex' en la tabla de changelog (fila v45.121): el Quick Index se integro como companion de la portada y ese id ya no existe -> mismo sintoma; ahora apunta a #inicio (la portada, donde vive) con title explicativo. (3) FALSO POSITIVO documentado: '#inicio' NO es un enlace roto aunque ningun elemento tenga ese id: es una RUTA VIRTUAL del motor de vistas que muestra la portada (verificado por clic). (4) COMPONENTE DUPLICADO (introducido por mi en v45.318): el portal YA tenia un componente hermano '.sec-relacionadas' (chips) en 11 secciones con el mismo proposito que las 'Rutas de lectura' (.sec-rel); en #voz quedaron AMBAS franjas visibles. Ahora renderSeccionesRelacionadas() omite toda seccion que ya traiga .sec-relacionadas (verificado: 0 secciones con franja duplicada). (5) ARMONIZACION: los dos componentes usaban estilos distintos (chips verdes con borde punteado vs tarjetas con descripcion) -exactamente la inconsistencia de 'parece de autores distintos'-; se unifico el ENVOLTORIO de .sec-relacionadas al de .sec-rel (superficie de tarjeta, borde solido, --rad-md y --sh-card por token, mismo rotulo en var(--text2)), conservando su formato de chips y su acento verde en hover. VERIFICADO en pestana limpia: 0 enlaces rotos (excluida la ruta virtual), 0 franjas duplicadas, ambos componentes con envoltorio identico (bg #1a2332, borde solido, radio 7px, sombra contenida), consola SIN errores. Solo index.html + sw.js + CHANGELOG.md. NO se alteraron datos ni contenido. Cache bump v69.34 -> v69.35.
// v69.34: v45.321 - SISTEMA DE DISENO · CONSOLIDACION DE RADIOS Y SOMBRAS (cierra la fragmentacion de tokens), validada por el usuario. HALLAZGO que REFUTA el diagnostico inicial: no habia 3 sino 4 capas de tokens, y la 4a -institucional.css, que carga ULTIMO y se declara 'REFINAMIENTO INSTITUCIONAL: sobriedad civica por tokens, referencia GOV.UK/USWDS'- ya habia bajado deliberadamente --radius a 6px y --r-xs/sm/md/lg a 3/5/7/10px ('de todo muy redondeado a sobrio'). La familia --rad-* (81 usos) quedo FUERA de ese refinamiento, de modo que el portal renderizaba TRES radios 'medianos' distintos a la vez: 12px (--rad-md), 7px (--r-md) y 6px (--radius) -esa era la causa real de que secciones distintas parecieran de autores distintos-. IMPORTANTE: el plan inicial (aliasear --r-* hacia --rad-*) habria DESTRUIDO el refinamiento institucional, casi duplicando los radios; se descarto tras medir los valores EN RUNTIME (que no coincidian con las definiciones del fuente, justamente por institucional.css). ACCION (en institucional.css, la capa correcta, en un bloque unico y REMOVIBLE para revertir): --rad-xs/sm/md/lg/xl alineados a la escala sobria (3/5/7/10/14), conservando --rad-full:9999px para pildoras/badges; y --sh-card/--sh-card-hover -que seguian con la sombra pesada 'card soup'- pasan a seguir a --shadow/--sh-lg, ya contenidas. Se documento ademas la JERARQUIA DE CAPAS completa en el propio CSS. DETALLE TECNICO: --sh-card:var(--shadow) declarado solo en :root resolveria con el --shadow CLARO incluso en modo oscuro (body.dark define --shadow en body, no en html), por eso se redeclara tambien en un bloque body.dark. VERIFICADO en pestana limpia y en ambos temas: --rad-md == --r-md == 7px (unificado), --rad-sm==5px, --rad-lg==10px, --radius 6px, --rad-full 9999px; .kpi/.viz-card/.foda-card/.sec-rel todas a 7px con sombra contenida; --sh-card sigue a --shadow tambien en oscuro (rgba(0,0,0,.35)); sin scroll horizontal; consola SIN errores. Revision visual con capturas en claro y oscuro: grilla uniforme y aspecto mas institucional. Solo institucional.css + sw.js + CHANGELOG.md. NO se alteraron datos ni contenido. Cache bump v69.33 -> v69.34.
// v69.33: v45.320 - MANTENIMIENTO · 4 correcciones de peso, bugs y codigo muerto detectadas en auditoria del repo. (1) SW ADELGAZADO 289KB -> 17KB (-94%): el 97% del archivo eran 261 lineas de changelog (286KB de 289KB). El navegador RE-DESCARGA sw.js en cada chequeo de actualizacion (hay uno cada 30 min), asi que era peso muerto transferido una y otra vez. El historial completo se movio a CHANGELOG.md (en el repo, NO precacheado ni servido al cliente) y aqui se conservan solo las 5 ultimas entradas. Verificado con node --check + CACHE_STATIC/RELEASE intactos + SW activo en navegador. (2) FIX DE CARRERA EN 2 MAPAS: renderMap (#mapContainer) y renderCensoMapaVuln (#mapCensoVuln) hacian `typeof L==='undefined' -> return` y se rendian EN SILENCIO si Leaflet (CDN, defer) aun no habia cargado cuando corria su batch de render (el del censo va en requestIdleCallback) => el mapa quedaba VACIO. Ahora reintentan (max 6 s) y son idempotentes. (3) CAUSA RAIZ ADICIONAL descubierta al verificar: el wrapper que registra las instancias en window.__leafletMaps se instala por POLLING (porque Leaflet carga con defer), asi que un mapa creado entre la carga de Leaflet y la instalacion del wrapper NO quedaba registrado y PERDIA la escala, la flecha norte y el basemap theme-aware de B2-4 -era el caso real del mapa del censo-. Los dos render ahora esperan tambien a L.__patched (max 2 s). Verificado: __leafletMaps = [mapCensoVuln, mapContainer] y el mapa del censo ya trae escala + norte. (4) TIMER PERMANENTE ELIMINADO: habia un setInterval(_reload,5000) que corria TODA la sesion (~720 ejecuciones/hora) aunque no hubiera ninguna actualizacion pendiente, que es el caso normal; ahora el reloj arranca SOLO cuando el SW avisa que hay version nueva (_schedule) y se detiene al recargar, mas un listener de visibilitychange que reintenta al volver a primer plano. (5) META THEME-COLOR 4 -> 1: habia cuatro; la primera (#1A6B3A verde) no tenia media query, y como el navegador usa la PRIMERA cuyo media coincide, SIEMPRE ganaba y dejaba muertas a las 3 navy de mas abajo (ademas de provocar un destello verde antes de que corriera el JS). Queda una sola, en navy institucional #0c1f36, que el toggle de tema actualiza (el querySelector del toggle ya apuntaba a esta). VERIFICADO en pestana limpia: consola SIN errores, 1 meta theme-color, 2 mapas registrados con cromo, 10 rutas de lectura y 37 notas de seccion intactas. NO SE TOCO: el panel FODA institucional (sus 4 visualizaciones ya viven en pestanas separadas = progressive disclosure; meter graficos Chart.js dentro de un <details> cerrado los renderiza con altura 0 y quedan rotos hasta un resize). Solo index.html + sw.js + CHANGELOG.md (nuevo). NO se alteraron datos ni contenido. Cache bump v69.32 -> v69.33.
// (Historial completo de versiones: ver CHANGELOG.md en la raiz de Portal_PLADECO.
//  Se conservan aqui solo las 5 ultimas entradas: el SW se re-descarga en cada chequeo
//  de actualizacion y el changelog completo pesaba 286KB de los 289KB del archivo.)
// ══════════════════════════════════════════════════════
const CACHE_STATIC='pladeco-static-v69.37';
const RELEASE='v45.324'; // version legible (user-facing), se muestra en el sello del footer
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
