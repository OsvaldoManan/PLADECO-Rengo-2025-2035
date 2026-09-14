// ══════════════════════════════════════════════════════
// PLADECO Rengo 2025-2035 · Service Worker v69.67
// Estrategia: network-first HTML · stale-while-revalidate assets · imágenes precache-first→cache-first · tiles cache-first
// v69.67: v45.357 - REVISION EDITORIAL (rama revision-editorial, NO PUBLICADA) - PENDIENTES DE LA AUDITORIA v45.356 (grupos regresiones, registros, cifras, compromisos, tiempo y matriz) y SISTEMA GRAFICO TERRITORIAL, PAQUETE PILOTO. v45.356: leyendas del ICP desde icpColor y pies de fotos fuera del recorte; mini-mapa del catastro en la ficha de la accion 101; contadores sin animacion; estado del instrumento desde versionInfo y doce discrepancias; descargas reales en #documentos y conteos por eje desde _POL; #compromisos sin estados escritos a mano; criterio unico de estado en cronologia, Gantt con linea de hoy, teclado y lista movil, carrusel con pausa; Matriz con una sola fuente para lista, contador y CSV, acordeon con botones y aria-expanded, tabla legible en ambos temas y eje en la direccion (#matriz/ejeN). v45.357, carpeta graficos/ (CSS y JS propios, SVG editables, fotos WebP y JPG, guiones en fuentes/, LEEME.md y lamina del sistema): (1) panoramica vectorial de Rengo cuya cresta se detecto sobre la foto aerea del portal, en tres variantes (escritorio, movil y monocromo), rotulada como ilustracion territorial con exageracion vertical de 1,6; (2) seis iconos propios de los ejes en el mismo sprite (reticula 24, trazo 1,7), usados en las tarjetas de ejes, la tabla de la Matriz y los filtros; (3) aperturas de capitulo sin tarjeta, con el modelo completo en el Capitulo II; (4) ficha territorial de Rosario con localizador sobre el contorno OSM referencial y foto fechada del informe municipal; (5) tres laminas de indicadores dibujadas desde los datos del portal (poblacion, precariedad de servicios basicos y meta de apoyo psicologico), que distinguen observado, proyectado, meta y sin medicion; (6) fotografia anotada de una plaza barrial de Rosario con marcas que citan el informe; ademas, diagrama brecha-evidencia-objetivo-acciones de las areas verdes, con los vinculos no documentados en discontinuo. CORRECCIONES DE ERRORES PROPIOS: tres bloques de portada (v45.337/338) aparecian encima de cada seccion; las citas de VOZ_NNA, que el propio portal declara construidas, se presentaban como textuales en #voz y en la ficha de la accion 101 (ahora son hallazgos agregados recontados en las 119 respuestas de la encuesta); la ficha 101 daba como diagnostico cifras sin fuente y marcaba Programada una ventana solo sugerida; la ficha basica rotulaba como censada una poblacion de referencia que suma la proyeccion INE; el asistente daba 65.786 como proyeccion a 2035; la adaptacion de graficos en movil (v45.354) escribia sobre el Proxy de opciones de Chart.js (errores reproducidos 3 de 3 a 390 px, 0 de 3 tras el arreglo). La foto de entrada queda solo en la portada (pendiente 2.33). Nueve discrepancias nuevas registradas. VERIFICADO en Edge sin interfaz sobre el repositorio: verificador de sintaxis en 0; a 360, 390, 768, 1024 y 1440 px las ocho piezas sin desborde del documento, imagenes con ancho, alto y texto alternativo, SVG con nombre accesible, enlaces internos resueltos y 0 errores de pagina. Cache bump v69.66 -> v69.67.
// v69.66: v45.355 - REVISION EDITORIAL (rama revision-editorial, NO PUBLICADA) - §9 ESCALA SECUENCIAL PARA LOS MAPAS DE VULNERABILIDAD. El encargo pide escalas secuenciales para cantidades y divergentes solo cuando exista un punto de referencia significativo, y prohibe los mapas arcoiris. El indice de vulnerabilidad ICP es una CANTIDAD sin punto medio significativo -mide cuanta vulnerabilidad hay, no desviaciones respecto de un centro- y se pintaba con CUATRO TONOS DISTINTOS: verde, amarillo, naranja y rojo. Eso es una escala divergente de tipo semaforo, la que el encargo reserva para otro caso, y ademas se apoya en el par verde-rojo, el peor para daltonismo. Se sustituye por una rampa de UN SOLO TONO -la terracota del escudo comunal, #E8B49A / #D07E5C / #AC4A2C / #7A2313- donde a mayor vulnerabilidad mas oscuro: se lee como 'mas cantidad de lo mismo' y se distingue por LUMINOSIDAD y no por color, de modo que sigue funcionando sin percepcion cromatica. Los cortes de clase (0,22 / 0,28 / 0,32) y los nombres de nivel (Bajo, Medio, Alto, Critico) NO cambian, asi que nada de lo que se apoya en ellos se altera. La funcion estaba DUPLICADA en dos bloques distintos del archivo con el mismo contenido; se corrigieron las dos, y como las leyendas, las pastillas del ranking y los circulos del mapa derivan todos de ella, el cambio se propaga sin tocar ningun otro sitio. EFECTO SECUNDARIO QUE HUBO QUE ATENDER: el nombre del nivel se escribia con el color de la rampa, y con el tono claro de una escala secuencial habria quedado ilegible sobre fondo blanco; ahora usa el color de texto del tema. VERIFICADO: la luminancia de la rampa desciende de forma monotona (0,521 / 0,291 / 0,139 / 0,054), que es la condicion de una escala secuencial correcta; 0 recursos fallidos. Cache bump v69.65 -> v69.66.
// v69.65: v45.354 - REVISION EDITORIAL (rama revision-editorial, NO PUBLICADA) - §11 PROCEDENCIA DE LAS IMAGENES y §10 COMPOSICION DE LOS GRAFICOS EN MOVIL. §11: medido primero - de 57 imagenes que no son logotipos ni iconos, 56 no tenian pie. Pero no todas admiten el mismo tratamiento y por eso NO se escribio un pie generico para todas. (a) Las 16 fotografias de la galeria son el registro del proceso participativo: su AUTORIA y su PROCEDENCIA si constan -equipo de comunicaciones de la Municipalidad, proceso PLADECO 2025- pero el lugar y la fecha de cada toma NO estan registrados en ninguna parte; se acredita lo que consta y se declara lo que falta, en vez de inventar un pie por fotografia. (b) Las 4 fotografias institucionales ya tenian un texto alternativo que describe la escena: ese texto pasa a ser pie visible con su autoria (elaboracion SECPLAC). (c) Las 16 figuras de la proyeccion demografica son VISUALIZACIONES DE UN MODELO, no de un dato observado, y hasta ahora nada las distinguia de un grafico de datos reales; el encargo pide identificar explicitamente cualquier visualizacion de una propuesta, asi que cada figura lleva ahora una etiqueta 'Proyeccion' y la seccion abre con un aviso que dice que describen como evolucionaria la poblacion si se mantienen los supuestos del modelo, no lo que ha ocurrido, y que el unico dato censado es el de 2024 (63.620 habitantes). §10 GRAFICOS EN MOVIL: el encargo pide adaptar la COMPOSICION y no encoger la imagen hasta volver ilegibles las etiquetas. Medido a 390 px: los graficos de barras conservaban la proporcion de escritorio y quedaban en 297x148 px; en el ranking de vulnerabilidad eso son QUINCE localidades en 148 px de alto, unos 10 px por barra, con nombres como 'El Trebal Huilquio' que no caben. Ahora, solo en pantallas de 768 px o menos y solo donde hace falta, los graficos de categorias en horizontal reciben la ALTURA que necesitan -minimo 24 px por categoria, con tope de 760- creciendo hacia abajo, que es donde un movil tiene espacio; y los de categorias en vertical con menos de 28 px por rotulo activan el salteo automatico para que los rotulos visibles se lean enteros. No cambia ningun dato, color ni eje de valores, y al volver a escritorio se restituye la proporcion original. DETALLE QUE HACIA FALTA: el lienzo trae una altura fija de 240 px en @media(max-width:768px) que gana al contenedor; sin fijar tambien la altura del lienzo, el ranking de 15 categorias se quedaba en 16 px por barra pese a la adaptacion. VERIFICADO a 390 px: ranking de vulnerabilidad de 148 a 386 px, de 10 a 26 px por barra; piramide 194 px y migracion 170 px, ambos a 28 px por categoria; los graficos que ya tenian 28 px o mas por rotulo quedan intactos; sin scroll horizontal. A 1440 px los siete graficos vuelven a su proporcion y ninguno queda marcado como adaptado. Galeria con credito de procedencia, 4 pies institucionales y 16 etiquetas de proyeccion montadas. Cache bump v69.64 -> v69.65.
// v69.64: v45.353 - REVISION EDITORIAL (rama revision-editorial, NO PUBLICADA) - UNA INICIATIVA DE PRINCIPIO A FIN, CRONOLOGIA DE HITOS y TRES DISCREPANCIAS NUEVAS (una de ellas corrige algo que este mismo trabajo habia publicado). INICIATIVA: los encargos la piden dos veces y no existia. Se construye con la accion 101 «Rengo Verde», elegida porque es la unica de las 225 que tiene a la vez diagnostico propio con cifras verificables, un catastro municipal georreferenciado que documenta el mismo problema espacio por espacio, una cita ciudadana del proceso sobre exactamente eso, y linea base, metas 2028 y 2035, responsables, fuentes y estado en el POA. NO SE COMPLETO NINGUN CAMPO: todo sale de _POL, accionesPOA e ICT_ESPACIOS. Cinco apartados -problema, evidencia, que propone el plan, quien responde y con que, en que estado esta- y los CUATRO MOMENTOS que pide el encargo diferenciados: propuesta formulada (si), programada 2029-2031 (si), financiamiento asignado (NO: solo hay fuentes previstas, no recursos comprometidos) y en ejecucion (NO: estado 'no iniciada', avance 0%). Las metas se rotulan como metas y nunca como logros. Lo que no se puede mostrar se declara: la matriz no registra localizacion, de modo que el mapa que acompana el caso es el del CATASTRO -el universo que la accion tendria que atender- y no la ubicacion de la accion; y no hay fotografia del lugar. CRONOLOGIA: HALLAZGO - los once hitos del proceso EXISTEN como dato (TIMELINE_EVENTS) pero NO SE RENDERIZABAN EN NINGUNA PARTE: la seccion «Linea de Tiempo del Proceso» mostraba solo un encabezado y un boton hacia la Carta Gantt, es decir el rotulo de una cronologia sin la cronologia. Ahora se dibuja, en vertical, con la evidencia enlazada en 9 de los 11 hitos (solo donde existe una seccion que realmente la contiene; el resto va sin enlace en vez de con uno aproximado). EL ESTADO NO SE DECIDE POR LA FECHA, porque que una fecha haya pasado no prueba que el hito ocurriera: se marca REALIZADO cuando el propio registro describe un resultado comprobable (asistentes, entrevistas completadas, firmas verificadas, un documento publicado) y SIN CONFIRMACION REGISTRADA cuando describe algo que todavia iba a ocurrir. Resultado: 10 realizados y 1 sin confirmar, y el que queda sin confirmar es el que mas importa - la aprobacion por el Concejo Municipal, enunciada en el propio registro como presentacion PARA aprobacion, con fecha junio 2026 ya pasada y sin que el portal acredite en ninguna parte que se aprobo. No se muestra como cumplida. El estado se comunica con palabra E icono, no solo con color. CODIGO MUERTO CON CIFRAS CONTRADICTORIAS: renderTimeline apuntaba a un contenedor inexistente y nunca dibujo nada, pero llevaba dentro catorce hitos escritos a mano que CONTRADECIAN al resto del portal -«encuesta ciudadana masiva a mas de 1.500 personas» cuando el instrumento documentado es de 119 respuestas, y «mas de 40 entrevistas» cuando la etnografia registra 115-; bastaba reponer el contenedor para publicarlas. Se eliminan y la funcion pasa a leer TIMELINE_EVENTS. CORRECCION DE ALGO QUE ESTE TRABAJO PUBLICO EN v45.350: el bloque de participacion atribuia las citas a la «Encuesta NNA (n=21)» copiando el rotulo del portal. Al verificarlo para la cronologia resulto que el portal usa DOS tamanos para el mismo instrumento - su propia seccion de ninez lo declara con n=4.036 en 27 establecimientos (49,6% de cobertura escolar) y otras tres secciones lo citan como n=21, cifra que la tabla comparativa de instrumentos atribuye a EDUCADORAS y no a estudiantes. La atribucion de las citas ya NO afirma ningun tamano de muestra, el recuento agregado usa la cifra que viene con su metodologia, y la contradiccion queda declarada en pantalla y registrada. Registro de discrepancias: 12 -> 15 entradas. VERIFICADO: iniciativa con 5 apartados, 4 fases correctamente diferenciadas y 5 enlaces que resuelven (0 rotos); cronologia con 11 hitos, 2 iconos distintos, 9 evidencias enlazadas y 0 enlaces rotos; tabla de discrepancias con 15 filas; 0 recursos fallidos. Cache bump v69.63 -> v69.64.
// v69.63: v45.352 - REVISION EDITORIAL (rama revision-editorial, NO PUBLICADA) - §5 EL ACCESO 'EXPLORAR MI TERRITORIO' APUNTA A LA EXPERIENCIA TERRITORIAL. El segundo acceso de la portada llevaba a #territorio, que es la TABLA de 25 filas con los datos en crudo. Desde v45.345 existe #mapa, renombrada «Explora tu territorio», que es la experiencia completa: selector por localidad o unidad vecinal, lista equivalente para quien no use el mapa, cartografia verificada y ficha territorial con indicadores, fuentes y enlaces. El acceso apunta ahora ahi; la tabla sigue disponible desde la propia ficha ('Tabla completa de los territorios') y desde el menu. VERIFICADO: los tres accesos de la portada resuelven a secciones existentes (0 rotos) y el titulo de la seccion de destino es «Explora tu territorio». Cache bump v69.62 -> v69.63.
// (Historial completo de versiones: ver CHANGELOG.md en la raiz de Portal_PLADECO.
//  Se conservan aqui solo las 5 ultimas entradas: el SW se re-descarga en cada chequeo
//  de actualizacion y el changelog completo pesaba 286KB de los 289KB del archivo.)
// ══════════════════════════════════════════════════════
const CACHE_STATIC='pladeco-static-v69.67';
const RELEASE='v45.357'; // version legible (user-facing), se muestra en el sello del footer
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
  './graficos/sistema-grafico.css',
  './graficos/sg-graficos.js',
  './graficos/sistema-grafico.js',
  './graficos/panoramica-rengo.svg',
  './graficos/panoramica-rengo-movil.svg',
  './graficos/fotos/rosario-oficina-dideco-2025-10-29.webp',
  './graficos/fotos/rosario-plaza-barrial-2026-02-04.webp',
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
