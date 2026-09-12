// ══════════════════════════════════════════════════════
// PLADECO Rengo 2025-2035 · Service Worker v69.64
// Estrategia: network-first HTML · stale-while-revalidate assets · imágenes precache-first→cache-first · tiles cache-first
// v69.64: v45.353 - REVISION EDITORIAL (rama revision-editorial, NO PUBLICADA) - UNA INICIATIVA DE PRINCIPIO A FIN, CRONOLOGIA DE HITOS y TRES DISCREPANCIAS NUEVAS (una de ellas corrige algo que este mismo trabajo habia publicado). INICIATIVA: los encargos la piden dos veces y no existia. Se construye con la accion 101 «Rengo Verde», elegida porque es la unica de las 225 que tiene a la vez diagnostico propio con cifras verificables, un catastro municipal georreferenciado que documenta el mismo problema espacio por espacio, una cita ciudadana del proceso sobre exactamente eso, y linea base, metas 2028 y 2035, responsables, fuentes y estado en el POA. NO SE COMPLETO NINGUN CAMPO: todo sale de _POL, accionesPOA e ICT_ESPACIOS. Cinco apartados -problema, evidencia, que propone el plan, quien responde y con que, en que estado esta- y los CUATRO MOMENTOS que pide el encargo diferenciados: propuesta formulada (si), programada 2029-2031 (si), financiamiento asignado (NO: solo hay fuentes previstas, no recursos comprometidos) y en ejecucion (NO: estado 'no iniciada', avance 0%). Las metas se rotulan como metas y nunca como logros. Lo que no se puede mostrar se declara: la matriz no registra localizacion, de modo que el mapa que acompana el caso es el del CATASTRO -el universo que la accion tendria que atender- y no la ubicacion de la accion; y no hay fotografia del lugar. CRONOLOGIA: HALLAZGO - los once hitos del proceso EXISTEN como dato (TIMELINE_EVENTS) pero NO SE RENDERIZABAN EN NINGUNA PARTE: la seccion «Linea de Tiempo del Proceso» mostraba solo un encabezado y un boton hacia la Carta Gantt, es decir el rotulo de una cronologia sin la cronologia. Ahora se dibuja, en vertical, con la evidencia enlazada en 9 de los 11 hitos (solo donde existe una seccion que realmente la contiene; el resto va sin enlace en vez de con uno aproximado). EL ESTADO NO SE DECIDE POR LA FECHA, porque que una fecha haya pasado no prueba que el hito ocurriera: se marca REALIZADO cuando el propio registro describe un resultado comprobable (asistentes, entrevistas completadas, firmas verificadas, un documento publicado) y SIN CONFIRMACION REGISTRADA cuando describe algo que todavia iba a ocurrir. Resultado: 10 realizados y 1 sin confirmar, y el que queda sin confirmar es el que mas importa - la aprobacion por el Concejo Municipal, enunciada en el propio registro como presentacion PARA aprobacion, con fecha junio 2026 ya pasada y sin que el portal acredite en ninguna parte que se aprobo. No se muestra como cumplida. El estado se comunica con palabra E icono, no solo con color. CODIGO MUERTO CON CIFRAS CONTRADICTORIAS: renderTimeline apuntaba a un contenedor inexistente y nunca dibujo nada, pero llevaba dentro catorce hitos escritos a mano que CONTRADECIAN al resto del portal -«encuesta ciudadana masiva a mas de 1.500 personas» cuando el instrumento documentado es de 119 respuestas, y «mas de 40 entrevistas» cuando la etnografia registra 115-; bastaba reponer el contenedor para publicarlas. Se eliminan y la funcion pasa a leer TIMELINE_EVENTS. CORRECCION DE ALGO QUE ESTE TRABAJO PUBLICO EN v45.350: el bloque de participacion atribuia las citas a la «Encuesta NNA (n=21)» copiando el rotulo del portal. Al verificarlo para la cronologia resulto que el portal usa DOS tamanos para el mismo instrumento - su propia seccion de ninez lo declara con n=4.036 en 27 establecimientos (49,6% de cobertura escolar) y otras tres secciones lo citan como n=21, cifra que la tabla comparativa de instrumentos atribuye a EDUCADORAS y no a estudiantes. La atribucion de las citas ya NO afirma ningun tamano de muestra, el recuento agregado usa la cifra que viene con su metodologia, y la contradiccion queda declarada en pantalla y registrada. Registro de discrepancias: 12 -> 15 entradas. VERIFICADO: iniciativa con 5 apartados, 4 fases correctamente diferenciadas y 5 enlaces que resuelven (0 rotos); cronologia con 11 hitos, 2 iconos distintos, 9 evidencias enlazadas y 0 enlaces rotos; tabla de discrepancias con 15 filas; 0 recursos fallidos. Cache bump v69.63 -> v69.64.
// v69.63: v45.352 - REVISION EDITORIAL (rama revision-editorial, NO PUBLICADA) - §5 EL ACCESO 'EXPLORAR MI TERRITORIO' APUNTA A LA EXPERIENCIA TERRITORIAL. El segundo acceso de la portada llevaba a #territorio, que es la TABLA de 25 filas con los datos en crudo. Desde v45.345 existe #mapa, renombrada «Explora tu territorio», que es la experiencia completa: selector por localidad o unidad vecinal, lista equivalente para quien no use el mapa, cartografia verificada y ficha territorial con indicadores, fuentes y enlaces. El acceso apunta ahora ahi; la tabla sigue disponible desde la propia ficha ('Tabla completa de los territorios') y desde el menu. VERIFICADO: los tres accesos de la portada resuelven a secciones existentes (0 rotos) y el titulo de la seccion de destino es «Explora tu territorio». Cache bump v69.62 -> v69.63.
// v69.62: v45.351 - REVISION EDITORIAL (rama revision-editorial, NO PUBLICADA) - §13 BUSQUEDA SIN TILDES, §6 AREA TACTIL y §15 VERIFICACION FINAL. §13 BUSQUEDA: hallazgo con consecuencia practica. El indice comparaba la consulta en minusculas pero CON TILDES, de modo que 'participacion' devolvia 1 resultado y 'participacion' con tilde devolvia 20; lo mismo con gestion, educacion, diagnostico, cartografia, indice y nino. Quien escribe sin tildes -lo habitual al teclear rapido, y mas aun en un teclado movil- practicamente no encontraba nada. Ahora el indice guarda ademas una version sin tildes y la consulta se normaliza igual, tanto en la busqueda del portal como en la paleta de comandos y sus acciones. DETALLE TECNICO que permite conservar los extractos: en espanol cada caracter acentuado es un solo caracter precompuesto, de modo que quitar los diacriticos NO cambia la longitud del texto y las posiciones siguen sirviendo para recortar el fragmento; aun asi se comprueba la longitud y, si no coincide, se vuelve al comportamiento anterior. §6 AREA TACTIL: de los 85 controles visibles, cinco quedaban bajo 44x44 px (favorito 36x36, cerrar del asistente 36x44, cerrar la ayuda de teclado 20x42 y dos de la barra superior 40x44). Se amplia la zona sensible con un pseudo-elemento centrado, de modo que llegue a 44x44 SIN cambiar el tamano visible del control ni mover nada alrededor; se comprobo antes que ninguno de esos botones usaba ::after para otra cosa. §15 VERIFICACION FINAL, con resultados medidos y no declarados. ANCHOS 1440/1024/768/390/360: contenedor 1280/1014/758/390/360 px con margenes laterales 46/33/25/16/16 px; titulo de portada 47,0/40,4/36,3/30,2/30,0 px; titulo de seccion 34,4/30,2/27,7/25,0/25,0 px con peso 800; bajada 22,2/20,1/18,8/18,0/18,0 px. Todos dentro de los rangos pedidos y SIN SCROLL HORIZONTAL en ninguno de los cinco anchos. El unico desborde interno que persiste es de 25 px dentro de la matriz, que tiene su propio contenedor con desplazamiento. CONTRASTE tras todos los cambios, midiendo las 75 secciones en los dos temas: 14 combinaciones bajo AA en claro sobre 17.301 elementos de texto y 14 en oscuro sobre 17.318, frente a las 792 y 726 del punto de partida. TECLADO Y FOCO: CORRECCION DE UN DIAGNOSTICO PROPIO - un primer pase reporto '32 de 40 controles sin indicador de foco'; era FALSO POSITIVO porque la comprobacion usaba element.focus() por codigo, que en Chrome NO activa :focus-visible. Comprobado despues con una pulsacion real del tabulador, el foco SI es visible (contorno solido de 2,4 px) y el elemento coincide con :focus-visible. ENLACES: 1.072 enlaces internos, CERO rotos. IMAGENES: 40 etiquetas en el archivo, 33 con ancho y alto declarados y cero sin texto alternativo; las 7 restantes son plantillas que arma JavaScript y quedan registradas como pendiente. CONSOLA: 57 recursos, CERO fallidos, carga completa en 1,86 s. BUSQUEDA: 'cronograma' devuelve 8 resultados con el correcto primero; con y sin tildes los conteos ahora coinciden en los ocho terminos probados. Cache bump v69.61 -> v69.62.
// v69.61: v45.350 - REVISION EDITORIAL (rama revision-editorial, NO PUBLICADA) - §10 FICHAS DE LECTURA DE GRAFICOS, §12 PARTICIPACION CON EVIDENCIA, §14 SIN CONTADORES ANIMADOS y REGISTRO DE SEIS DISCREPANCIAS NUEVAS. CORRECCION DE UN DIAGNOSTICO PROPIO, primero: la entrada anterior (v69.60) afirmaba que 'la Carta Gantt NO SE DIBUJABA NUNCA'. Era FALSO y el error estaba en la comprobacion, no en el portal: al automatizar la revision window.scrollTo no movia la pagina, la seccion no llegaba a intersecar el viewport y el IntersectionObserver -que funciona bien- no tenia por que dispararse; con un desplazamiento real el cronograma se dibuja, igual que los graficos con carga diferida. La entrada de v69.60 se corrigio en sw.js y en CHANGELOG.md, y el comentario del codigo tambien. Lo que si aporta aquel cambio: el Gantt queda listo al ABRIR la seccion y no solo al desplazarse, que importa porque #cronograma-gantt es uno de los tres accesos de la portada. §10: se eligieron CINCO graficos -piramide poblacional, ranking de vulnerabilidad ICP, brechas urbano-rural, Rengo frente al pais y evolucion de transparencia- por ser los que sostienen decisiones del plan, y cada uno recibe titulo informativo, unidad, periodo, territorio, naturaleza del dato y una lectura de hasta cincuenta palabras. LAS LECTURAS SE ESCRIBIERON LEYENDO LOS DATOS REALES de cada instancia de Chart.js, no el texto que rodea al grafico: cada cifra citada esta en la serie. Dos precisiones que el dato obliga a declarar: el ICP es un indice CALCULADO (elaboracion propia) y no una medicion directa, y en 'Rengo frente al pais' las seis barras NO comparten unidad (anos, m2 por habitante y porcentajes), de modo que no son comparables entre si. La tabla equivalente ya existia para todos los graficos desde v45.341. §12: el portal guardaba cinco citas de la encuesta a ninos, ninas y adolescentes (n=21) pero las mostraba sueltas, sin decir que dato las respalda ni a que prioridad corresponden. NO se invento ninguna: se seleccionaron TRES de las cinco existentes -las tres con un dato comprobable detras- y se dejaron integras, cada una junto a su evidencia (1,96 m2 de area verde por habitante frente a los 9-15 que recomienda la OMS; iluminacion publica evaluada 2,9 sobre 5 en la encuesta de 119 personas; desercion en ensenanza media de 11,6% frente a 5,3% nacional) y su eje del plan. Se anaden los hallazgos agregados con su fuente y con la advertencia de que las muestras son pequenas y no probabilisticas. HALLAZGO al cruzar las citas con los ejes: TRES DE LAS CINCO traian una etiqueta de eje que no coincide con la numeracion oficial ('Eje 5 · Medio Ambiente' cuando medio ambiente es el Eje 4; 'Eje 1 · Desarrollo Economico' cuando es el Eje 2); se muestra la numeracion oficial y la diferencia queda registrada, sin tocar el dato de origen. ANONIMIZACION: las citas no llevan nombre, establecimiento ni direccion, solo el tramo de edad; el registro del consentimiento NO consta en el repositorio y queda declarado como pendiente en la propia pagina. §14: los indicadores del panel se animaban desde cero durante 1,4 s leyendo el texto ya escrito y reformateandolo en cada fotograma; son informacion esencial y cualquier interrupcion podia dejar a la vista un valor parcial -el mismo motivo por el que los contadores de la portada se dejaron estaticos en v45.234-. Ahora la cifra se muestra completa desde el primer momento. Las duraciones de transicion medidas en uso son 0,12 a 0,20 s, dentro del rango pedido. REGISTRO DE DISCREPANCIAS: se suman SEIS entradas a la tabla de #metodologia (ahora 12), todas con evidencia y ninguna resuelta por intuicion - los TRES registros paralelos de unidades vecinales donde el mismo codigo designa lugares distintos (UV-11 es Chanqueahue con 1.420 habitantes en uno y Rosario Oriente con 117 en otro); la ausencia de campo territorial en la matriz y en el POA, comprobada campo por campo, que impide vincular acciones a un territorio sin inventarlas; las etiquetas de eje de las citas; la discrepancia entre los colores del logotipo del plan y los del escudo comunal, sin manual de marca en el repositorio; la falta de respaldo del consentimiento de las citas; y la de actividades del cronograma, que se marca RESUELTA porque el dato daba la respuesta. VERIFICADO: 5 fichas de grafico montadas con lecturas de 43, 31, 45, 37 y 46 palabras (ninguna supera 50); bloque de participacion con 3 citas, su procedencia, su evidencia y el eje correcto, sin desborde ni scroll horizontal; indicadores del panel con su valor real desde el inicio y sin clase de conteo; tabla de discrepancias con 12 filas. Cache bump v69.60 -> v69.61.
// v69.60: v45.349 - REVISION EDITORIAL (rama revision-editorial, NO PUBLICADA) - §7 EMOJIS A LA FAMILIA DE ICONOS y §13 VERIFICACION DE LAS CIFRAS EN CONFLICTO. §7: medido primero - el archivo tiene 758 pictogramas (154 distintos) y 588 se renderizan en pantalla; NO estan repartidos al azar sino concentrados en elementos con papel de ICONO (un span cuyo contenido es solo el pictograma dentro de .doc-icon-big, el simbolo de descarga de cada boton, el reloj del tiempo de lectura) y en rotulos cortos que empiezan por un pictograma. El portal YA tenia una familia coherente: 51 simbolos SVG con el mismo trazo (fill none, stroke currentColor, grosor 1,7) y 859 usos; faltaba el reloj, que se anade al sprite para no dejar sin equivalente el caso mas frecuente. La sustitucion se hace sobre el DOM y no en el archivo porque buena parte de ese marcado lo construye JavaScript al vuelo: reemplazar en el archivo dejaria fuera justo los casos generados. Solo actua en dos situaciones comprobables -elemento cuyo texto es unicamente el pictograma, y rotulo de 40 caracteres o menos que empieza por pictograma- y NUNCA en parrafos, citas, testimonios, respuestas del asistente, codigo, campos de formulario ni el interior de los mapas, donde el pictograma puede ser contenido y no adorno. REGLA QUE SE RESPETA: un pictograma sin equivalente en la familia SE DEJA COMO ESTA; no se sustituye por un icono aproximado. Accesibilidad: el pictograma suelto si se anuncia en un lector de pantalla, asi que el icono que lo reemplaza lleva role=img y nombre en castellano cuando queda solo, y aria-hidden cuando acompana a un texto que ya lo nombra. §13 VERIFICACION DE LAS CUATRO CIFRAS EN CONFLICTO que pedia el encargo, sin elegir ninguna por intuicion: (1) 27 vs 32 objetivos - NO es discrepancia, la propia Matriz declara los dos conjuntos como columnas distintas (OE Imagen Municipal, 32 institucionales / OE Internos PLADECO); ya estaba registrado. (2) 200 politicas vs 225 acciones - las dos apariciones de '200 politicas' describen el CONTENIDO DE DOS DOCUMENTOS EXTERNOS (Matriz PLADECO V6 y Convergencia con el Programa de Gobierno), mientras 225 es el numero de filas de la matriz operativa del portal; cambiar el texto de los documentos los describiria mal, de modo que NO se toca y queda registrado para validacion de SECPLAC. (3) 68 vs 75 secciones - NO es discrepancia: '68 secciones' es un SINONIMO DE BUSQUEDA del asistente junto a '75 secciones' y '53 secciones', para que el usuario pueda preguntar con cualquiera de esas cifras; no se muestra en ninguna parte. (4) 31 vs 33 actividades - SI era un error y tiene respuesta comprobable en el dato: CG_DATA suma 4+5+5+5+3+6+4+1 = 33 actividades, la bajada de la seccion decia 33 y el KPI decia 31; se corrige el KPI. CORRECCION DE UN DIAGNOSTICO PROPIO (queda escrita porque la version anterior de esta entrada afirmaba lo contrario): un primer pase concluyo que 'la Carta Gantt no se dibujaba nunca'. Era FALSO, y la causa estaba en la comprobacion y no en el portal: al automatizar la revision window.scrollTo no movia la pagina, la seccion no llegaba a intersecar el viewport y el IntersectionObserver -que funciona correctamente- no tenia por que dispararse. Con un desplazamiento real el cronograma se dibuja bien, igual que los graficos con carga diferida. Lo que si aporta el cambio: el observador inicia el Gantt cuando la seccion entra en el viewport, es decir DESPUES de desplazarse, de modo que quien llega desde el acceso 'Consultar avances' de la portada ve encabezado y KPI con el area del grafico vacia hasta que se desplaza; ahora el cronograma esta listo al abrir la seccion. Solo actua si el lienzo sigue vacio y la seccion esta desplegada. VERIFICADO: 414 pictogramas sustituidos por iconos de la familia; los visibles bajan de 588 a 180, y de esos 180 son 73 flechas y simbolos tipograficos (flecha externa, reproduccion, doble flecha, copyright) que no son adorno; el resto es cola larga sin equivalente, deliberadamente intacta. Tamanos de icono entre 11 y 29 px, todos proporcionales al texto que acompanan, sin valores atipicos. Carta Gantt: 12.860 caracteres de contenido, 163 elementos, 14 meses de Agosto 2025 a Septiembre 2026, KPI de actividades en 33, y sigue dibujada al salir y volver a la seccion. Cache bump v69.59 -> v69.60.
// (Historial completo de versiones: ver CHANGELOG.md en la raiz de Portal_PLADECO.
//  Se conservan aqui solo las 5 ultimas entradas: el SW se re-descarga en cada chequeo
//  de actualizacion y el changelog completo pesaba 286KB de los 289KB del archivo.)
// ══════════════════════════════════════════════════════
const CACHE_STATIC='pladeco-static-v69.64';
const RELEASE='v45.353'; // version legible (user-facing), se muestra en el sello del footer
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
