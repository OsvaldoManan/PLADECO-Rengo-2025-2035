// ══════════════════════════════════════════════════════
// PLADECO Rengo 2025-2035 · Service Worker v62.54
// Estrategia: network-first HTML · stale-while-revalidate assets · cache-first imágenes/tiles
// v62.54: v45.90 - Lecturas del Diagnóstico (Lote 3/3): callouts interpretativos en #ficha-comunal, #ict-espacios-publicos, #voz y #suenos. Ahora las 12 secciones densas en datos cuentan qué significan los números, no solo qué muestran.
// v62.53: v45.89 - "Qué pasa después" en #cronograma-gantt: hoja de ruta institucional post-entrega (Jun 2026 → Mar 2027) en 6 pasos: aprobación del Concejo, decreto alcaldicio, plan anual de implementación, tablero trimestral, 1ª encuesta + informe anual, participación permanente
// v62.52: v45.88 - Mirada de Género transversal: callouts en #nna, #voz, #foda y #diagnostico-institucional con la lectura de género específica de cada sección (NNA por género, participación femenina, VIF + JJVV, Ley Karin como política institucional de género)
// v62.51: v45.87 - 2 bloques nuevos: "Riesgos de Implementación" (7 riesgos + mitigaciones) en #compromisos, y "Rengo en el contexto regional" (6 KPIs vs región O'Higgins) en #comparador
// v62.50: v45.86 - Metodología visible ("Cómo se construyó este PLADECO": 4 fases + 12 fuentes oficiales + 5 stats) en #institucional + Onboarding "Cómo leer este PLADECO" (4 perfiles: Alcalde/Concejo, Ciudadanía, Equipo técnico, Investigación) dentro del hero
// v62.49: v45.85 - 2 bloques estratégicos del V3: matriz "4 decisiones para el Alcalde" (urgencia × impacto) en #visualizaciones-avanzadas, y "La ventana 2025-2026 no se repite" (4 factores que convergen) en #argumentario
// v62.48: v45.84 - Lecturas interpretativas (Lote 2/2): callouts "Lectura del Diagnóstico" en #censo, #nna, #foda, #diagnostico-institucional. Las 8 secciones densas en datos ahora cuentan qué significan, no solo qué muestran.
// v62.47: v45.83 - Lecturas interpretativas (Lote 1/2): callouts "Lectura del Diagnóstico" en #dashboard, #financiamiento, #semaforo, #compromisos — convierten datos en argumento
// v62.46: v45.82 - Corrección: el PLADECO es 2025-2035. Cronograma alineado (título, tarjeta PDF, enlaces, aria-label, fuente) de "2025-2026"/"2025-2032" a "2025-2035"; PDF físico renombrado a PLADECO_Cronograma_2025-2035.pdf
// v62.45: v45.81 - Lote D argumentario: #cronograma-gantt (nombre corregido 2025-2032 -> 2025-2026), #resumen (franja "Diagnóstico en una mirada" + frase marco), #visualizaciones-avanzadas (hoja de ruta institucional 2026-2028 con 18 hitos). Integración del Argumentario completa: 14/14 secciones
// v62.44: v45.80 - Lote C argumentario: #foda (patrimonio +744%, VIF 426, +464%/+554% en amenazas, ERD 13 articulaciones), #matriz (VIF 426 + eje 6 con 10 KPIs y unidad de proyectos), #erd (bloque "ERD como oportunidad financiera")
// v62.43: v45.79 - Lote B argumentario: #nna (100% NNA evalúa negativo destacado + seguridad de doble entrada +464%/+554%), #diagnostico-institucional (4 brechas institucionales + paradoja), #censo (proyección del envejecimiento 2035)
// v62.42: v45.78 - Lote A argumentario: #compromisos (COSOC corregido de "cumplido" a "en curso" + 3 hitos legales), #financiamiento (brecha de captación 6,28% vs 13,89%), #semaforo (tablero de 10 KPIs de gestión)
// v62.41: v45.77 - #dashboard: 3 KPIs nuevos del argumentario (100% NNA evalúa negativo, materialización 30,7%, captación 6,28%) + intro con la tensión central + transparencia alineada a +15,85pp
// v62.40: v45.76 - Argumentario alineado al deck V2/V3: cifras corregidas (patrimonio +744%, transparencia +15,85pp), 3 argumentos nuevos (paradoja central, 4 brechas urgentes, brecha financiera) + frase marco
// v62.39: v45.75 - Limpieza CSS: ~165 líneas de estilos muertos del sidebar legacy eliminadas (núcleo, mascota, modo comprimido, progreso, favoritos, buscador, selector de tema, overlay)
// v62.38: v45.74 - Limpieza profunda: sidebar legacy oculto eliminado (HTML 70 enlaces + ~16 enganches JS) + CSS muerto (botón hamburguesa, logo del hero) · FIX: toggleDark() estaba duplicado y el cambio de tema no tenía efecto
// v62.37: v45.73 - Footer: argumento del propósito del PLADECO reformulado (instrumento de planificación comunal · hoja de ruta a 10 años)
// v62.36: v45.72 - Limpieza: bloque huérfano del widget de logros eliminado (achGrid + barra de progreso + contador "0/12 desbloqueados") y un </div> suelto que dejaba HTML malformado
// v62.35: v45.71 - Escritorio: franja Pulso Comunal (fecha/clima/aire) reubicada bajo el aviso "En construcción"; badge "Datos: Censo 2024 INE" del footer eliminado
// v62.34: v45.70 - Barra superior reconciliada con los 11 capítulos reales del contenido (antes 7 grupos); se genera desde el motor de vistas
// v62.33: v45.69 - Motor de vistas Etapa 2: afinado a vistas por SECCIÓN (cada sección su propia vista); navegación sección-a-sección con contexto de capítulo
// v62.32: v45.68 - Motor de vistas (detalles): el índice denso de 50 enlaces inicia colapsado en la portada (el selector de capítulos es la entrada principal)
// v62.31: v45.67 - Motor de vistas (detalles): selector de 11 capítulos en la portada + se oculta la UI de scroll (dot-nav, minimapa, barras de progreso) en modo vistas
// v62.30: v45.66 - Motor de vistas: portada + 11 capítulos como vistas independientes (se acaba el scroll único); navegación por anclas reescrita; tolerante a fallos (ante error vuelve al scroll normal)
// v62.29: v45.65 - FIX barra superior: ícono duplicado en cada ítem de los menús (.tn-di + el emoji que ya venía en el texto) -> el texto se limpia del ícono
// v62.28: v45.64 - Banner "En construcción": fila reequilibrada (cinta centrada con 3 zonas de igual peso + pastillas escudo/PLADECO unificadas) + 2 reglas CSS muertas eliminadas
// v62.27: v45.63 - Hero: logo «Contigo Rengo» eliminado (a pedido del usuario) + 3.png y hero-banner.png fuera del pre-cache (ya no se usan, ~1.2 MB menos)
// v62.26: v45.62 - FIX hero: .hero-bg estaba en position:relative (altura 0) por regla GPU global -> la foto del edificio nunca se veía; forzado a position:absolute + rebalance de scrim/brillo
// v62.25: v45.61 - Limpieza CSS Etapa 1: sistema de tokens :root consolidado (3 bloques en conflicto -> 1 canónico, valores efectivos, sin cambio visual)
// v62.24: v45.60 - Hero: foto del Edificio Consistorial como fondo protagonista (scrim legible) + capas abstractas eliminadas; hero-bg.jpg recortado sin logo incrustado
// v62.23: v45.59 - Hero: imagen del banner Contigo Rengo en alta resolución (666x375 -> 1100x619, transparente, desde 2.png)
// v62.22: v45.58 - Limpieza nav: botón hamburguesa legacy (.menu-toggle) eliminado · banner superior con filas invertidas (Pulso Comunal arriba, "En construcción" abajo) · hero escritorio compacto
// v62.21: v45.56 - Pestañas centradas + ancho de lectura acotado (720px) + menús 2 columnas + banner más bajo
// v62.20: v45.55 - Navegación: barra superior de 7 capítulos con menús desplegables reemplaza el sidebar
// v62.19: v45.54 - Nueva sección #transparencia: Centro de Transparencia y Descargas (15 documentos del proceso)
// v62.18: v45.53 - §11.7 reconvertida: "Datos en Profundidad" (3 viz redundantes) → "Horizontes de Implementación 2025-2035"
// v62.17: v45.52 - FIX resoluciones: scroll horizontal en móvil eliminado (TOC #resumen con .toc-desc nowrap)
// v62.16: v45.51 - Chatbot: figura unificada con el robot mascota Rengo (FAB + panel + sidebar) + FAB refinado
// v62.15: v45.50 - FIX gráficos: blindaje SafeChart + id duplicado #chartFunnel resuelto (gráfico Embudo Participación ahora renderiza)
// v62.14: v45.49 - FIX sidebar: translateZ(0) pisaba el drawer móvil + breakpoint 1100→900 unificado + offset #main-content
// v62.13: v45.48 - Widget #updateBadge (changelog flotante de desarrollador) eliminado: HTML + CSS + JS + selectores residuales
// v62.12: v45.31 - MBHT integrada como sección #mbht-bienestar (4 dimensiones · 665 manzanas) + datasets MBHT/
// v62.11: v45.23 - Sección MBHT eliminada (se trabajará de otra forma posteriormente)
// v62.9: v45.17 - §11.5 Análisis Territorial Censo 2024 standalone (analisis-territorial.html)
// v62.8: v45.8 - Sección #mapa-proyectos eliminada (HTML + JS + CSS + enlaces)
// v62.7: v45.7 - Refinamiento visual integral: contrastes WCAG + cards uniformes
// v62.6: v45.6 - Sidebar comprimido bulletproof + cache invalidation agresivo
// v62.5: v45.5 - Reorganización Cap. XII→XI + 14 badges uniformados
// v62.4: v45.4 - ERD movida tras Matriz + botones share/PDF eliminados
// v62.3: v45.3 - SNA duplicado corregido + nuevo gráfico Sankey
// v62.2: v45.2 - ICT ampliado (6 bloques metodológicos)
// v62.1: v45.1 - AUDITORÍA INTEGRAL: 199 contraste issues → 0
// ══════════════════════════════════════════════════════
const CACHE_STATIC='pladeco-static-v62.54';
const CACHE_IMG='pladeco-img-v2';
const CACHE_TILES='pladeco-tiles-v2';
const CACHE_RUNTIME='pladeco-runtime-v51';
const MAX_IMG_CACHE=200;
const MAX_TILE_CACHE=500;
const MAX_RUNTIME_CACHE=80;

const OFFLINE_URL='./offline.html';

const STATIC_ASSETS=[
  './',
  './index.html',
  './analisis-territorial.html',
  './offline.html',
  './manifest.json',
  './hero-bg.jpg',
  './qr-encuesta.png',
  './1.png',
  './2.png',
  './chatbot-robot.png',
  './mision.png',
  './vision.png',
  './valores.png',
  './proyeccion-2035.png',
  './fuente-info.png',
  './escudo-rengo.svg',
  './escudo-rengo-blanco.svg',
  './Obra.png',
  './logo-pladeco.png',
  'https://cdn.jsdelivr.net/npm/chart.js@4.4.4/dist/chart.umd.min.js',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
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

  /* 2. Imágenes → cache-first */
  var isImage=/\.(png|jpe?g|gif|svg|webp|ico|avif)(\?.*)?$/i.test(url.pathname);
  if(isImage){
    e.respondWith(
      caches.match(req).then(function(r){
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
    if(e.ports[0]) e.ports[0].postMessage({version:CACHE_STATIC});
  }
});
