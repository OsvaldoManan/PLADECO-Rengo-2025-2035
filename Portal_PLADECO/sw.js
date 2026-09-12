// ══════════════════════════════════════════════════════
// PLADECO Rengo 2025-2035 · Service Worker v69.66
// Estrategia: network-first HTML · stale-while-revalidate assets · imágenes precache-first→cache-first · tiles cache-first
// v69.66: v45.355 - REVISION EDITORIAL (rama revision-editorial, NO PUBLICADA) - §9 ESCALA SECUENCIAL PARA LOS MAPAS DE VULNERABILIDAD. El encargo pide escalas secuenciales para cantidades y divergentes solo cuando exista un punto de referencia significativo, y prohibe los mapas arcoiris. El indice de vulnerabilidad ICP es una CANTIDAD sin punto medio significativo -mide cuanta vulnerabilidad hay, no desviaciones respecto de un centro- y se pintaba con CUATRO TONOS DISTINTOS: verde, amarillo, naranja y rojo. Eso es una escala divergente de tipo semaforo, la que el encargo reserva para otro caso, y ademas se apoya en el par verde-rojo, el peor para daltonismo. Se sustituye por una rampa de UN SOLO TONO -la terracota del escudo comunal, #E8B49A / #D07E5C / #AC4A2C / #7A2313- donde a mayor vulnerabilidad mas oscuro: se lee como 'mas cantidad de lo mismo' y se distingue por LUMINOSIDAD y no por color, de modo que sigue funcionando sin percepcion cromatica. Los cortes de clase (0,22 / 0,28 / 0,32) y los nombres de nivel (Bajo, Medio, Alto, Critico) NO cambian, asi que nada de lo que se apoya en ellos se altera. La funcion estaba DUPLICADA en dos bloques distintos del archivo con el mismo contenido; se corrigieron las dos, y como las leyendas, las pastillas del ranking y los circulos del mapa derivan todos de ella, el cambio se propaga sin tocar ningun otro sitio. EFECTO SECUNDARIO QUE HUBO QUE ATENDER: el nombre del nivel se escribia con el color de la rampa, y con el tono claro de una escala secuencial habria quedado ilegible sobre fondo blanco; ahora usa el color de texto del tema. VERIFICADO: la luminancia de la rampa desciende de forma monotona (0,521 / 0,291 / 0,139 / 0,054), que es la condicion de una escala secuencial correcta; 0 recursos fallidos. Cache bump v69.65 -> v69.66.
// v69.65: v45.354 - REVISION EDITORIAL (rama revision-editorial, NO PUBLICADA) - §11 PROCEDENCIA DE LAS IMAGENES y §10 COMPOSICION DE LOS GRAFICOS EN MOVIL. §11: medido primero - de 57 imagenes que no son logotipos ni iconos, 56 no tenian pie. Pero no todas admiten el mismo tratamiento y por eso NO se escribio un pie generico para todas. (a) Las 16 fotografias de la galeria son el registro del proceso participativo: su AUTORIA y su PROCEDENCIA si constan -equipo de comunicaciones de la Municipalidad, proceso PLADECO 2025- pero el lugar y la fecha de cada toma NO estan registrados en ninguna parte; se acredita lo que consta y se declara lo que falta, en vez de inventar un pie por fotografia. (b) Las 4 fotografias institucionales ya tenian un texto alternativo que describe la escena: ese texto pasa a ser pie visible con su autoria (elaboracion SECPLAC). (c) Las 16 figuras de la proyeccion demografica son VISUALIZACIONES DE UN MODELO, no de un dato observado, y hasta ahora nada las distinguia de un grafico de datos reales; el encargo pide identificar explicitamente cualquier visualizacion de una propuesta, asi que cada figura lleva ahora una etiqueta 'Proyeccion' y la seccion abre con un aviso que dice que describen como evolucionaria la poblacion si se mantienen los supuestos del modelo, no lo que ha ocurrido, y que el unico dato censado es el de 2024 (63.620 habitantes). §10 GRAFICOS EN MOVIL: el encargo pide adaptar la COMPOSICION y no encoger la imagen hasta volver ilegibles las etiquetas. Medido a 390 px: los graficos de barras conservaban la proporcion de escritorio y quedaban en 297x148 px; en el ranking de vulnerabilidad eso son QUINCE localidades en 148 px de alto, unos 10 px por barra, con nombres como 'El Trebal Huilquio' que no caben. Ahora, solo en pantallas de 768 px o menos y solo donde hace falta, los graficos de categorias en horizontal reciben la ALTURA que necesitan -minimo 24 px por categoria, con tope de 760- creciendo hacia abajo, que es donde un movil tiene espacio; y los de categorias en vertical con menos de 28 px por rotulo activan el salteo automatico para que los rotulos visibles se lean enteros. No cambia ningun dato, color ni eje de valores, y al volver a escritorio se restituye la proporcion original. DETALLE QUE HACIA FALTA: el lienzo trae una altura fija de 240 px en @media(max-width:768px) que gana al contenedor; sin fijar tambien la altura del lienzo, el ranking de 15 categorias se quedaba en 16 px por barra pese a la adaptacion. VERIFICADO a 390 px: ranking de vulnerabilidad de 148 a 386 px, de 10 a 26 px por barra; piramide 194 px y migracion 170 px, ambos a 28 px por categoria; los graficos que ya tenian 28 px o mas por rotulo quedan intactos; sin scroll horizontal. A 1440 px los siete graficos vuelven a su proporcion y ninguno queda marcado como adaptado. Galeria con credito de procedencia, 4 pies institucionales y 16 etiquetas de proyeccion montadas. Cache bump v69.64 -> v69.65.
// v69.64: v45.353 - REVISION EDITORIAL (rama revision-editorial, NO PUBLICADA) - UNA INICIATIVA DE PRINCIPIO A FIN, CRONOLOGIA DE HITOS y TRES DISCREPANCIAS NUEVAS (una de ellas corrige algo que este mismo trabajo habia publicado). INICIATIVA: los encargos la piden dos veces y no existia. Se construye con la accion 101 «Rengo Verde», elegida porque es la unica de las 225 que tiene a la vez diagnostico propio con cifras verificables, un catastro municipal georreferenciado que documenta el mismo problema espacio por espacio, una cita ciudadana del proceso sobre exactamente eso, y linea base, metas 2028 y 2035, responsables, fuentes y estado en el POA. NO SE COMPLETO NINGUN CAMPO: todo sale de _POL, accionesPOA e ICT_ESPACIOS. Cinco apartados -problema, evidencia, que propone el plan, quien responde y con que, en que estado esta- y los CUATRO MOMENTOS que pide el encargo diferenciados: propuesta formulada (si), programada 2029-2031 (si), financiamiento asignado (NO: solo hay fuentes previstas, no recursos comprometidos) y en ejecucion (NO: estado 'no iniciada', avance 0%). Las metas se rotulan como metas y nunca como logros. Lo que no se puede mostrar se declara: la matriz no registra localizacion, de modo que el mapa que acompana el caso es el del CATASTRO -el universo que la accion tendria que atender- y no la ubicacion de la accion; y no hay fotografia del lugar. CRONOLOGIA: HALLAZGO - los once hitos del proceso EXISTEN como dato (TIMELINE_EVENTS) pero NO SE RENDERIZABAN EN NINGUNA PARTE: la seccion «Linea de Tiempo del Proceso» mostraba solo un encabezado y un boton hacia la Carta Gantt, es decir el rotulo de una cronologia sin la cronologia. Ahora se dibuja, en vertical, con la evidencia enlazada en 9 de los 11 hitos (solo donde existe una seccion que realmente la contiene; el resto va sin enlace en vez de con uno aproximado). EL ESTADO NO SE DECIDE POR LA FECHA, porque que una fecha haya pasado no prueba que el hito ocurriera: se marca REALIZADO cuando el propio registro describe un resultado comprobable (asistentes, entrevistas completadas, firmas verificadas, un documento publicado) y SIN CONFIRMACION REGISTRADA cuando describe algo que todavia iba a ocurrir. Resultado: 10 realizados y 1 sin confirmar, y el que queda sin confirmar es el que mas importa - la aprobacion por el Concejo Municipal, enunciada en el propio registro como presentacion PARA aprobacion, con fecha junio 2026 ya pasada y sin que el portal acredite en ninguna parte que se aprobo. No se muestra como cumplida. El estado se comunica con palabra E icono, no solo con color. CODIGO MUERTO CON CIFRAS CONTRADICTORIAS: renderTimeline apuntaba a un contenedor inexistente y nunca dibujo nada, pero llevaba dentro catorce hitos escritos a mano que CONTRADECIAN al resto del portal -«encuesta ciudadana masiva a mas de 1.500 personas» cuando el instrumento documentado es de 119 respuestas, y «mas de 40 entrevistas» cuando la etnografia registra 115-; bastaba reponer el contenedor para publicarlas. Se eliminan y la funcion pasa a leer TIMELINE_EVENTS. CORRECCION DE ALGO QUE ESTE TRABAJO PUBLICO EN v45.350: el bloque de participacion atribuia las citas a la «Encuesta NNA (n=21)» copiando el rotulo del portal. Al verificarlo para la cronologia resulto que el portal usa DOS tamanos para el mismo instrumento - su propia seccion de ninez lo declara con n=4.036 en 27 establecimientos (49,6% de cobertura escolar) y otras tres secciones lo citan como n=21, cifra que la tabla comparativa de instrumentos atribuye a EDUCADORAS y no a estudiantes. La atribucion de las citas ya NO afirma ningun tamano de muestra, el recuento agregado usa la cifra que viene con su metodologia, y la contradiccion queda declarada en pantalla y registrada. Registro de discrepancias: 12 -> 15 entradas. VERIFICADO: iniciativa con 5 apartados, 4 fases correctamente diferenciadas y 5 enlaces que resuelven (0 rotos); cronologia con 11 hitos, 2 iconos distintos, 9 evidencias enlazadas y 0 enlaces rotos; tabla de discrepancias con 15 filas; 0 recursos fallidos. Cache bump v69.63 -> v69.64.
// v69.63: v45.352 - REVISION EDITORIAL (rama revision-editorial, NO PUBLICADA) - §5 EL ACCESO 'EXPLORAR MI TERRITORIO' APUNTA A LA EXPERIENCIA TERRITORIAL. El segundo acceso de la portada llevaba a #territorio, que es la TABLA de 25 filas con los datos en crudo. Desde v45.345 existe #mapa, renombrada «Explora tu territorio», que es la experiencia completa: selector por localidad o unidad vecinal, lista equivalente para quien no use el mapa, cartografia verificada y ficha territorial con indicadores, fuentes y enlaces. El acceso apunta ahora ahi; la tabla sigue disponible desde la propia ficha ('Tabla completa de los territorios') y desde el menu. VERIFICADO: los tres accesos de la portada resuelven a secciones existentes (0 rotos) y el titulo de la seccion de destino es «Explora tu territorio». Cache bump v69.62 -> v69.63.
// v69.62: v45.351 - REVISION EDITORIAL (rama revision-editorial, NO PUBLICADA) - §13 BUSQUEDA SIN TILDES, §6 AREA TACTIL y §15 VERIFICACION FINAL. §13 BUSQUEDA: hallazgo con consecuencia practica. El indice comparaba la consulta en minusculas pero CON TILDES, de modo que 'participacion' devolvia 1 resultado y 'participacion' con tilde devolvia 20; lo mismo con gestion, educacion, diagnostico, cartografia, indice y nino. Quien escribe sin tildes -lo habitual al teclear rapido, y mas aun en un teclado movil- practicamente no encontraba nada. Ahora el indice guarda ademas una version sin tildes y la consulta se normaliza igual, tanto en la busqueda del portal como en la paleta de comandos y sus acciones. DETALLE TECNICO que permite conservar los extractos: en espanol cada caracter acentuado es un solo caracter precompuesto, de modo que quitar los diacriticos NO cambia la longitud del texto y las posiciones siguen sirviendo para recortar el fragmento; aun asi se comprueba la longitud y, si no coincide, se vuelve al comportamiento anterior. §6 AREA TACTIL: de los 85 controles visibles, cinco quedaban bajo 44x44 px (favorito 36x36, cerrar del asistente 36x44, cerrar la ayuda de teclado 20x42 y dos de la barra superior 40x44). Se amplia la zona sensible con un pseudo-elemento centrado, de modo que llegue a 44x44 SIN cambiar el tamano visible del control ni mover nada alrededor; se comprobo antes que ninguno de esos botones usaba ::after para otra cosa. §15 VERIFICACION FINAL, con resultados medidos y no declarados. ANCHOS 1440/1024/768/390/360: contenedor 1280/1014/758/390/360 px con margenes laterales 46/33/25/16/16 px; titulo de portada 47,0/40,4/36,3/30,2/30,0 px; titulo de seccion 34,4/30,2/27,7/25,0/25,0 px con peso 800; bajada 22,2/20,1/18,8/18,0/18,0 px. Todos dentro de los rangos pedidos y SIN SCROLL HORIZONTAL en ninguno de los cinco anchos. El unico desborde interno que persiste es de 25 px dentro de la matriz, que tiene su propio contenedor con desplazamiento. CONTRASTE tras todos los cambios, midiendo las 75 secciones en los dos temas: 14 combinaciones bajo AA en claro sobre 17.301 elementos de texto y 14 en oscuro sobre 17.318, frente a las 792 y 726 del punto de partida. TECLADO Y FOCO: CORRECCION DE UN DIAGNOSTICO PROPIO - un primer pase reporto '32 de 40 controles sin indicador de foco'; era FALSO POSITIVO porque la comprobacion usaba element.focus() por codigo, que en Chrome NO activa :focus-visible. Comprobado despues con una pulsacion real del tabulador, el foco SI es visible (contorno solido de 2,4 px) y el elemento coincide con :focus-visible. ENLACES: 1.072 enlaces internos, CERO rotos. IMAGENES: 40 etiquetas en el archivo, 33 con ancho y alto declarados y cero sin texto alternativo; las 7 restantes son plantillas que arma JavaScript y quedan registradas como pendiente. CONSOLA: 57 recursos, CERO fallidos, carga completa en 1,86 s. BUSQUEDA: 'cronograma' devuelve 8 resultados con el correcto primero; con y sin tildes los conteos ahora coinciden en los ocho terminos probados. Cache bump v69.61 -> v69.62.
// (Historial completo de versiones: ver CHANGELOG.md en la raiz de Portal_PLADECO.
//  Se conservan aqui solo las 5 ultimas entradas: el SW se re-descarga en cada chequeo
//  de actualizacion y el changelog completo pesaba 286KB de los 289KB del archivo.)
// ══════════════════════════════════════════════════════
const CACHE_STATIC='pladeco-static-v69.66';
const RELEASE='v45.355'; // version legible (user-facing), se muestra en el sello del footer
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
