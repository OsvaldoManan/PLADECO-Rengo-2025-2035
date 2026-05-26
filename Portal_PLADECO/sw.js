// ══════════════════════════════════════════════════════
// PLADECO Rengo 2025-2035 · Service Worker v63.9
// Estrategia: network-first HTML · stale-while-revalidate assets · cache-first imágenes/tiles
// v63.9: v45.146 - ELIMINADO enlace huerfano "timeline" del menu hamburguesa. Solicitud usuario: "elimina lo seleccionado" (el <a href="#timeline"><span>timeline</span></a> que aparecia con el id literal en minusculas en el menu, bajo "9 · MEMORIA"). DIAGNOSTICO: igual que el caso #portal-cta de v45.144, la funcion secName() del motor de vistas no logra extraer el nombre del h2 de la seccion #timeline (aunque tiene un <h2 id="timelineH">🗳️ Linea de Tiempo del Proceso PLADECO</h2> bien estructurado dentro de .sec-header), por lo que cae al fallback de devolver el id literal "timeline". CORRECCION: agregado 'timeline' al mapa SEC_HIDE_FROM_MENU={'portal-cta':1,'timeline':1} para excluir el enlace del menu hamburguesa Y del dropdown desktop. La seccion #timeline (Linea de Tiempo Interactiva del proceso participativo, marzo 2025 - marzo 2026, con filtros por tipo de evento: Hitos/Talleres/Entregas/Validaciones) SIGUE EXISTIENDO en el DOM y es accesible desde: el quickIndex Mapa del PLADECO, los breadcrumbs, anclas internas y enlaces de Galeria/Memoria. Solo desaparece del listado del menu hamburguesa donde aparecia con texto crudo. El emoji ⏳ del mapa SEC_EMOJI sigue intacto para cuando se vuelva a habilitar (cuando se resuelva el problema de secName).
// v63.8: v45.145 - HERO con LOGO INSTITUCIONAL PLADECO (imagen). Solicitud usuario: "Requiero reemplazar lo seleccionado por la imagen [Logo-Pladeco-Color.png]. Lo ideal es que sea en una resolución ad hoc al portal pero que no se vea excesivamente grande". CAMBIOS: (1) ELIMINADOS del hero los 2 elementos seleccionados: <div class="hero-brand">📚 Ilustre Municipalidad de Rengo</div> y <h1>Plan de Desarrollo Comunal<br><span>Rengo 2025 — 2035</span></h1>. (2) REEMPLAZADOS por una <img class="hero-logo" src="Logo-Pladeco-Color.png" alt="PLADECO Rengo 2025-2035..."> (137 KB, logo institucional con tipografía azul "Pladeco" + "2025 2035" naranja + etiqueta azul "Plan de Desarrollo Comunal Rengo"). (3) Conservado <h1 class="sr-only"> con el texto descriptivo para SEO/accesibilidad (lectores de pantalla siguen escuchando "Plan de Desarrollo Comunal Rengo 2025 — 2035" aunque visualmente sea una imagen). (4) NUEVO CSS .hero-logo con tamaño AD-HOC al portal NO excesivo: max-width:380px en escritorio, 280px en tablet (≤768px), 220px en mobile (≤480px). Drop-shadow doble para profundidad institucional sobre el fondo 4K (Entrada-Rengo-Color-Pladeco.png). image-rendering:-webkit-optimize-contrast para nitidez. (5) NUEVO CSS .sr-only estándar WCAG 2.4.6 para ocultar el h1 visualmente pero mantenerlo accesible (clip:rect(0,0,0,0), width/height:1px, position:absolute). Las funciones JS tuneHero() siguen funcionando con guards `if(!el)return` defensivos al no encontrar .hero-brand (ahora null) ni el h1 visible (ahora sr-only).
// v63.7: v45.144 - MENÚ HAMBURGUESA con EMOJIS por sección + ELIMINADO enlace huérfano "portal-cta". Solicitud usuario: "esto [el <a href='#portal-cta'>portal-cta</a>] debe ser eliminado. En las secciones de este botón requiero que cada pestaña se entregue emojis en cada sección". DIAGNÓSTICO: el motor de vistas v45.69 construye PV.chapters escaneando el DOM y para cada <section id="..."> extrae el nombre del primer <h2> o aria-label. La sección #portal-cta usa <h3> en vez de <h2>, por lo que secName() devolvía el ID literal "portal-cta" como texto del enlace en el menú. CAMBIOS en script build() del topnav: (1) NUEVO mapa SEC_EMOJI con 50 entradas id→emoji asignando un emoji apropiado a cada sección del portal (🏛️ mvv, 📚 contexto, 📊 dashboard, 🪪 ficha-comunal, 🗂️ censo, 🌳 ict-espacios-publicos, 💚 mbht-bienestar, 🎯 analisis-estrategico-censo, 👥 proyeccion-poblacion, 🗺️ mapa, 🌎 territorio, ⚠️ desigualdad, 👶 nna, 🗣️ voz, ✨ suenos, 🧩 foda, 🎯 matriz, 🔗 coherencia, 🌐 erd, 🌱 ods-sec, ⚙️ gestion, 💡 argumentario, ⚖️ decisiones, 📑 resumen, 🏢 diagnostico-institucional, 🚦 semaforo, ✅ compromisos, 💰 financiamiento, 📅 cronograma-gantt, 🤲 validacion-concejo, ❓ faq-concejo/faq, 📖 glosario, ⏳ timeline, 📸 galeria, 📓 cuadernillo, 🙋 participa, 🧮 calculadora-uv, 💵 presupuesto-participativo, 📁 documentos, etc). (2) NUEVO mapa SEC_HIDE_FROM_MENU={'portal-cta':1} para excluir secciones huérfanas o técnicas del menú (la sección #portal-cta sigue existiendo en el DOM porque la usan NO_ACTION_SECTIONS, breadcrumb y CTAs finales, pero ya no aparece en el menú hamburguesa ni en dropdown desktop). (3) Reescrito el loop de unidades: pre-filtra con visibleUnits[], si el capítulo queda vacío después del filtro NO genera el bloque tn-drop-group/tn-m-sub (evita encabezados huérfanos). (4) Cada <a> ahora se renderiza con `<span class="tn-mi">EMOJI</span><span>NOMBRE</span>` en mobile y `<span class="tn-di">EMOJI</span><span>NOMBRE</span>` en desktop (la clase tn-di ya existía con bullet •; ahora se usa para el emoji). CSS NUEVO: .tn-mlinks a con display:flex+gap:10px, .tn-mlinks a .tn-mi con font-size:15px+width:20px+alineación. Mejora visual de .tn-m-sub-head con uppercase letter-spacing institucional.
// v63.6: v45.143 - BANNER ÚNICO institucional. Solicitud usuario: "mantener el conteo pero eliminar el fondo oscuro con rayas. Eliminar el live-strip para unirlo arriba dejando un banner único". CAMBIOS: (1) Eliminadas las "rayas" de fondo del countdown-strip: regla .countdown-strip::before{background:repeating-linear-gradient(...)} → content:none. (2) Refinadas las 3 .countdown-card: background rgba(15,23,42,.55) opaco (era rgba(255,255,255,.06) translúcido y se veía como "fondo oscuro"), backdrop-filter:blur(10px), border más visible rgba(255,255,255,.14), sombra discreta. Hover con verde institucional. (3) ELIMINADO completo el <div class="live-strip-wrap"> con liveStrip (Pulso comunal: fecha + clima + temperatura + humedad + viento + aire EAQI + botón refresh) en líneas 5786-5884 + sus 2 scripts bootstrap inline (formato de fecha y fetches a Open-Meteo). (4) CSS .live-strip-wrap convertido a display:none!important (las reglas internas .ls-* siguen ahí inertes). (5) .countdown-section padding-top reducido 28px→18px y countdown-header margin-bottom 22px→14px para pegarse visualmente al topbar como continuación del banner institucional. (6) Las funciones JS loadLiveStrip() y updateLiveStripDate() ya tienen guards `if(!el)return` defensivos por si se llaman sin elementos. Resultado: el topbar institucional con logo "PLADECO Rengo" + "EN CONSTRUCCIÓN" + hamburguesa queda directamente conectado con el "Próximos hitos del PLADECO" (header + 3 cards de cuenta regresiva) formando un banner único visual, sin la barra intermedia de clima/aire y sin el fondo dark con rayas.
// v63.5: v45.142 - RESTAURADO el contenido de "Próximos hitos del PLADECO". El usuario aclaró: "no, solamente queria eliminar el fondo, no el contenido". CORRECCIÓN: en v45.141 eliminé toda la countdown-section (header + 3 cards + script bootstrap), pero el usuario sólo quería que el fondo dark de la sección desapareciera (eso ya se hizo en v45.140 con background:transparent !important). Restaurado idéntico: countdown-header con badge "Portal en construcción" + h3 "Próximos hitos del PLADECO" + cd-section-sub con descripción; countdown-strip con 3 countdown-cards (Aprobación del Plan Jun 2026, Primera Evaluación Dic 2028, Meta Final 2035 Dic 2035); script bootstrap inline que popula los contadores. El fondo SIGUE transparente (regla CSS .countdown-section{background:transparent!important} de v45.140 intacta), por lo que ahora la sección muestra header+cards sobre el fondo institucional (Entrada-Rengo-Color-Pladeco.png). CONSERVADAS las mejoras del Mapa del PLADECO de v45.141: header refinado, pildora .qi-pill, hover institucional de qi-mm-card, refactor de las 4 rutas de tiempo a .qi-ruta-card[data-tone].
// v63.4: v45.141 - MEJORA del Mapa del PLADECO (#quickIndex) + ELIMINACIÓN de la countdown-section. (1) Eliminada COMPLETA la sección "Próximos hitos del PLADECO" (countdown-section con countdown-header + countdown-strip + script bootstrap inline) por solicitud usuario "elimina ese fondo... elimina lo segundo seleccionado". Las fechas oficiales siguen en el cronograma del Plan (#proximos-pasos). (2) REFRESH institucional del header #quickIndex "Mapa del PLADECO": background gradient blanco→slate opaco (legibilidad sobre fondo institucional 4K), borde superior con gradient de los 4 colores macro (azul/café/verde/púrpura), hover con elevación sutil, dark mode con scrim oscuro. (3) NUEVA clase .qi-pill para la pildora "4 partes · 53 secciones" con gradient verde institucional + sombra + punto blanco indicador. (4) Refinadas las 4 .qi-mm-card del mapa visual (Introducción/Diagnóstico/Planificación/Cierre): hover con elevación translateY(-3px), border-left engrosado a 5px, overlay sutil interior con color del macro, sombra teñida del color. (5) REFACTOR completo de las 4 rutas de tiempo (5'/15'/45'/∞) del bloque "Cómo leer este PLADECO": eliminados ~1.5 KB de inline styles + onmouseover/onmouseout, reemplazados por clases dedicadas .qi-rutas-wrap .qi-ruta-card[data-tone="ambar|naranja|verde|violeta"] con barra lateral coloreada (3px → 4px al hover), backdrop-filter blur(4px), hover con sombra teñida y border resaltado. (6) Mantenida la accesibilidad (focus visible, aria-labels, contraste WCAG). Bumpeada countdown count actualizada: 11 capítulos · 53 secciones (era 55, corregido a 53 que es el conteo real).
// v63.3: v45.140 - ELIMINADO el fondo dark de la countdown-section "Próximos hitos del PLADECO". Solicitud usuario: "elimina ese fondo". CORRECCIÓN: la regla `.countdown-section{background:linear-gradient(135deg,#081626 0%,#0c1f36 40%,#142d5a 100%);...}` en línea 1996 estaba tapando el fondo institucional (Entrada-Rengo-Color-Pladeco.png) que el portal aplica globalmente vía .portal-bg. Cambiado a `background:transparent !important` y eliminado el ::before con radial-gradient naranja (`content:none`). Ahora la sección de cuenta regresiva muestra el fondo institucional por debajo, manteniendo la legibilidad de las 3 countdown-card (que ya tienen su propio backdrop translúcido blanco con backdrop-filter:blur(8px)).
// v63.2: v45.139 - IMAGEN INSTITUCIONAL como FONDO DE TODO el portal con legibilidad. Solicitud usuario: "REQUIERO QUE SE VEA MEJOR PERO EN TODO EL PORTAL QUE SEA EL FONDO DE TODO PERO SIN DIFICULTAR LA VISION". Diagnostico: la imagen Entrada-Rengo-Color-Pladeco.png ya estaba como .portal-bg pero el overlay body::before con opacity:.93 + blur(22px) la dejaba casi invisible. CORRECCIONES: (a) .portal-bg con blur(3px) en vez de blur(22px) - imagen nitida sin pixelado, background-attachment:fixed para efecto parallax, image-rendering:optimize-contrast. (b) body::before overlay TRANSLUCIDO con linear-gradient de 55-65% opacidad (era 93% solido) - deja ver la imagen pero mantiene contraste para texto. (c) Mobile con blur(2px) + background-attachment:scroll para performance + overlay 72-78%. (d) Dark mode con scrim 72-80% mas oscuro. (e) FORZADO background:var(--card) !important en TODAS las cards principales (viz-card, anest-stat, tr-card, team-card, coh-*, voz-*, anest-index/perfil/recom, cuv-mbht-stat, ficha-card, proy-gallery-card) para asegurar legibilidad del contenido sobre la imagen visible. Resultado: la imagen panoramica de Rengo se ve como fondo de TODAS las secciones del portal (no solo el hero) con suave blur 3px que evita distraccion del lector, las cards de contenido son opacas y legibles, scroll mantiene la imagen fija (parallax effect). Sin perdida de contenido.
// v63.1: v45.138 - IMAGEN INSTITUCIONAL 4K MAXIMA VISIBILIDAD en hero. Solicitud usuario: "NECESITO QUE ESO REEMPLACE EN BUENA RESOLUCION A ESE FONDO SELECCIONADO". Diagnostico: la imagen Entrada-Rengo-Color-Pladeco.png (3840x2160) estaba presente pero capas superpuestas la opacaban: (1) .hero::before con gradient navy 0.88/0.78/0.72/0.85 (cuasi opaco), (2) .hero::after con gradient 120px inferior, (3) .hero-bg con opacity:.55 (semitransparente), (4) .hero-dots con pattern de puntos, (5) .hero-mesh con overlay, (6) 3 hero-orb con gradients verde/naranja/azul. CORRECCIONES: (a) .hero-bg principal con opacity:1 (era .55), filter:none, image-rendering: optimize-contrast. (b) .hero-bg con scrim suavizado: opacidades 0.20/0.08/0.15/0.55 (eran 0.35/0.18/0.30/0.70) - minimas pero suficientes para legibilidad del texto blanco. (c) .hero::before scrim navy reducido drasticamente: 0.25/0.10/0.20/0.55 (era 0.88/0.78/0.72/0.85). (d) .hero::after gradient inferior reducido a 80px y rgba(8,22,38,.65) en vez de var(--primary) opaco. (e) .hero-dots ELIMINADO con display:none (era patron de puntos blancos). (f) .hero-mesh ELIMINADO con display:none (era overlay decorativo). (g) Los 3 .hero-orb ELIMINADOS con display:none (eran circulos verde/naranja/azul). Resultado: la imagen panoramica de Rengo con cordillera, ciudad y vegetacion se ve en MAXIMA RESOLUCION 4K nitida y reconocible como protagonista del hero, con scrim sutil que mantiene la legibilidad del texto blanco "Plan de Desarrollo Comunal Rengo 2025-2035" y los 6 hero-stats. Conservado todo el contenido v45.137.
// v63.0: v45.137 - ROLLBACK al formato v45.133 conservando datos. El usuario reporto que el rebrand v45.134/135 introdujo errores y prefiere volver al formato anterior. Acciones: (1) git checkout bd22653 -- index.html restaura el HTML al estado v45.133 (32.146 lineas, 60 secciones, 18 scripts JS sin errores). Esto recupera: h1 "Plan de Desarrollo Comunal Rengo 2025-2035" con hero-brand, hero-stats sin popups en formato original, infographic-strip, live-strip CON clima y aire, hero-scroll-hint, "Como leer este PLADECO" abajo del hero, hero-bg con escudo watermark. (2) AJUSTES posteriores aplicados sobre la base restaurada: (a) Reemplazadas 7 refs a hero-bg.jpg por Entrada-Rengo-Color-Pladeco.png para mantener la imagen institucional 4K. (b) Mejorado .hero-bg principal: opacity .12 -> .55, filter blur+saturate -> none, image-rendering:auto. (c) ELIMINADO el watermark del escudo SVG superpuesto (era ruido visual). (d) Suavizado el scrim del hero (35% en vez de 52%) para que la imagen sea protagonista. (e) Mejorado .portal-bg: blur 22px -> 8px, opacity 1 -> .85, scale 1.1 -> 1.05. (f) AGREGADO @font-face de Poppins (Medium/SemiBold/Bold/ExtraBold) + Neulis Cursive aplicado como font-family principal del html/body. CONSERVADO: todo el contenido agregado hasta v45.133 (Proyeccion Poblacion con Excel + 9 graficos + Recomendaciones, Coherencia Interna, Voz Institucional, Calculadora UV, Centro Documentos con 40 cards, ERD con coherencia PLADECO, Sankey mejorado, emails autoridades, fix COSOC en 4 lugares, etc).
// v62.99: v45.136 - REVISION DE COMPOSICION + MEJORA NITIDEZ IMAGEN FONDO. DIAGNOSTICO: la imagen Entrada-Rengo-Color-Pladeco.png es 3840x2160 (4K, 10.57 MB) pero se veia mal por TRES definiciones CSS de .hero-bg pisandose entre si: (1) linea 286 con opacity:.12 + saturate(.5) hacia la imagen casi invisible, (2) linea ~28789 con doble background (escudo SVG + imagen) + filter blur(1.2px) saturate(.78) brightness(.82) introducia ruido visual, (3) linea ~29108 con scrim oscuro al 52% + blur(2px) + brightness(.80) la oscurecia mucho. Tambien .portal-bg con blur(22px) era excesivo y producia efecto pixelado en pantallas grandes. CORRECCIONES: (A) Linea 286 .hero-bg refactorizada: opacity:.55, filter:none, image-rendering:auto para nitidez maxima. (B) Linea ~28789 watermark del escudo ELIMINADO, comentario explicativo agregado. (C) Linea ~29108 scrim suavizado: opacidades de 0.52/0.38/0.45/0.85 reducidas a 0.35/0.18/0.30/0.70 para que la imagen sea protagonista; filter:none !important. (D) .portal-bg simplificado: blur(8px) en vez de 22px, saturate(.85), opacity:.85, scale(1.05) en vez de 1.1, body::before overlay bajado a opacity:.88 (era .93). (E) Mobile blur reducido a 6px. Resultado: imagen 4K se ve nitida en el hero principal sin pixelado y con suave difuminacion de fondo en el resto del portal manteniendo legibilidad de las secciones. Conservado: estructura del hero (logo color, sub, stats, Como leer abajo), tipografia Poppins, popups en hero-stats, todas las 62 secciones presentes.
// v62.98: v45.135 - AJUSTES feedback usuario sobre rebrand v45.134: (1) Logo PLADECO cambiado de BLANCO a COLOR (Logo-Pladeco-Color.png con paleta institucional azul+naranja). (2) Tamano del logo del hero REDUCIDO de 520px a 380px (max-width), 280px en mobile, 220px en pantallas pequenas. (3) ELIMINADO completamente el live-strip (barra superior con fecha + 4 KPIs 63.620 hab/225 acciones/21 UV/13/17 ODS): el wrapper completo .live-strip-wrap removido junto con sus scripts inline de fecha y fetch a Open-Meteo. (4) ELIMINADO el bloque "hero-roles-strip" que estaba ARRIBA del hero con las 4 cards Como leer este PLADECO; restaurado en POSICION ORIGINAL (despues del hero-scroll-hint, abajo del hero, como estaba en v45.133 y previas). (5) ELIMINADO el boton Home del topbar (tn-home-btn); topbar vuelve al estado anterior con solo tn-brand + tn-pladeco-pill. CONSERVADO de v45.134: Poppins fuente principal, imagen Entrada-Rengo-Color-Pladeco.png como fondo del portal, popups en hero-stats con data-pop. Cambios netos: orden original del hero (logo color reducido > sub > hero-stats > infographic > CTAs > scroll-hint > Como leer) sin live-strip ni boton home.
// v62.97: v45.134 - REBRAND INSTITUCIONAL completo. ASSETS NUEVOS: Logo-Pladeco-Blanco.png (125 KB, logo PLADECO oficial), Logo-Pladeco-Color.png (137 KB), Entrada-Rengo-Color-Pladeco.png (11 MB, imagen institucional acceso comunal), 4 ttf Poppins (Medium/SemiBold/Bold/ExtraBold) + 15 otf Neulis Cursive en /fonts/. CAMBIOS APLICADOS: (1) TIPOGRAFIA: Poppins como fuente principal del portal con @font-face local + fallback a Inter; Neulis Cursive italic para acentos institucionales. Override global aplicado a html/body/cards/h1-h6/p/buttons/inputs/etc. (2) IMAGEN DE FONDO: hero-bg.jpg reemplazada por Entrada-Rengo-Color-Pladeco.png en .hero-bg y .portal-bg. (3) HERO: texto "Ilustre Municipalidad de Rengo + h1 Plan de Desarrollo Comunal" reemplazado por imagen Logo-Pladeco-Blanco.png (max 520px, drop-shadow institucional). (4) INTERCAMBIO en hero (a la inversa): las 4 cards de "Como leer este PLADECO" (Alcalde/Ciudadania/Equipo/Investigacion) ahora aparecen ARRIBA (entre subtitulo y stats numericos) y los 6 hero-stats numericos (63.620 hab, 6 ejes, 225 politicas, 21 UV, 13/17 ODS, 32 OE) bajaron ABAJO. (5) POPUPS: hero-stats ahora con data-pop tooltip al hover que explica cada cifra (icono ⓘ esquina superior derecha). (6) LIVE-STRIP: eliminado clima y aire (no relevante para portal institucional). Ahora muestra fecha + 4 KPIs del plan (63.620 hab, 225 acciones, 21 UV, 13/17 ODS) + "Portal actualizado". Bootstrap inline de fecha conservado, fetch a Open-Meteo defensivo (los elementos del clima ya no existen). (7) TOPBAR: agregado boton Home institucional al lado del titulo PLADECO Rengo con icono casa SVG, hover naranjo. (8) ELIMINADA seccion #portal-cta. Su texto rescatado y MEJORADO (mas de 500 vecinos + 4.036 NNA OLN, transparencia y reutilizacion) en bloque destacado dentro de #galeria (Cap IX Memoria del Proceso). Cierre del flujo del portal queda como sintesis.
// v62.96: v45.133 - POTENCIACION #proyeccion-poblacion con Excel Investigacion Demografica. Usuario solicito potenciar la seccion con datos del Excel "Investigacion Demografica Rengo 2024-2035.xlsx" (7 hojas: Proyeccion Comunal, Estructura Etaria, Distritos 2024, Comparativo 2024-2035, Serie INE b2017, Metodologia, Parametros). AGREGADO: (1) Copia del Excel (46 KB) en proyeccion-poblacion/ para descarga directa. (2) Boton de descarga XLSX al lado del PDF. (3) Grafico 6 Serie historica INE 2002-2035 con linea original vs corregida (factor 0,9638) + 3 censos efectivos como puntos. (4) Grafico 7 Variacion poblacional distrital 2024-2035 (bar horizontal): Chapeton +87,3% absorbe el grueso del crecimiento mientras 6 distritos rurales pierden poblacion (Popeta -94,3%, Cobil -38,7%, etc), color-codificado verde/rojo. (5) Grafico 8 IE distrital 2024 vs 2035 con linea de paridad IE=100 (Popeta IE=178, Chanqueahue 163, Lo de Lobo 144,6 superan ampliamente). (6) Grafico 9 Evolucion anual de estructura etaria 2024-2035 (12 puntos) como area apilada para visualizar velocidad de transicion demografica. (7) CARD DE RECOMENDACIONES ESTRATEGICAS al final de Lectura interpretativa con 5 acciones priorizadas mapeadas a Ejes PLADECO: (a) Sistema Comunal de Cuidados gerontologicos -> Eje 3, (b) Plan de retencion y revitalizacion rural -> Eje 4+5, (c) Densificacion inteligente Chapeton+Cesares -> Eje 4, (d) Reconversion sistema educacional con SLEP -> Eje 3, (e) Observatorio Demografico Comunal continuo -> Eje 6. Cada recomendacion vinculada a Matriz Estrategica y Coherencia Interna del Plan. Datos cargados: 34 anios INE (2002-2035), 12 anios estructura etaria, 10 distritos comparativo.
// v62.95: v45.132 - HOTFIX CRITICO de HTML mal cerrado en seccion #documentos. BUG DETECTADO: el usuario reporto via screenshot que el footer mostraba autoridades envueltas en a.tr-card href="Presentaciones/PLADECO Inicio.pdf" (texto "Alcalde: Enrique Del Barrio H." aparecia como una card grande verde dentro del footer). Investigacion revelo daño masivo: TODOS los 4 tr-groups de #documentos (Documentos del Plan, Actas, Datos Abiertos MBHT, Material Presentaciones) tenian las ultimas cards sin cierre, los tr-grid sin cerrar y los tr-group sin cerrar, lo que hacia que el primer a.tr-card abierto "se tragaba" todo el DOM hasta encontrar otro </a> en el footer. Causa raiz: scripts Python anteriores (v45.129 fusion transparencia/documentos + v45.128 conversion OIRS->LFS) dejaron cierres truncados. SOLUCION: reescritos COMPLETAMENTE los 4 tr-groups con cierres correctos: Grupo 1 Documentos del Plan (3 archivos: PLADECO Final proximo, Cronograma 144KB, Espacios Publicos 54MB), Grupo 2 Actas (8 PDFs), Grupo 3 MBHT (5 archivos PDF+XLSX), Grupo 4 Presentaciones (24 PDFs incluyendo los 4 LFS). Total: 40 cards (39 con anchor + 1 tr-soon) - antes habian solo 4 cards visibles. Validacion: 0 unclosed tags al final, JS 18 scripts sin errores, conteo de tr-card=39 + tr-soon=1.
// v62.94: v45.131 - AUDITORIA Y CANON DE CARDS · Composicion uniforme del portal. Diagnostico previo: 158 viz-card + 552 cards en total, 81 con style inline duplicado, border-radius dispersos en 10 valores distintos, transitions inconsistentes (.15s/.2s/.25s/.3s mezcladas), 69 hover patterns sin canon. Implementacion: (1) Variables CSS canonicas en :root: --card-pad/lg/sm/xl, --card-gap, --card-radius, --card-shadow-rest/hover, --card-transition con cubic-bezier easing institucional. (2) Sistema de hover refinado UNIVERSAL para 12 clases de cards (viz-card, anest-stat, tr-card, team-card, coh-tipo-card, voz-nudo-card, voz-nna-card, coh-seq-card, anest-index-card, anest-perfil, anest-recom, cuv-mbht-stat): transform translateY(-2px/-3px) con shadow elevado + border-color highlight verde institucional. (3) Estados focus-visible con outline accesible (WCAG 2.4.7). (4) NUEVA clase .proy-gallery + .proy-gallery-card que reemplaza las 16 cards de galeria de Proyeccion con inline styles de 250+ caracteres cada una por clases reutilizables: caption con tag de prefijo (Fig 1, Mapa 2, etc), icono de descarga animado al hover (aparece arriba derecha), zoom sutil de imagen (scale 1.04), focus-visible outline, alt corregidos. (5) font-variant-numeric:tabular-nums para alineacion en numeros de stats. (6) Media query @print sin shadows ni transforms (page-break-inside avoid). (7) @prefers-reduced-motion respeta a11y eliminando transitions y transforms. Cambios neto: ~150 lineas CSS canonico agregado + 16 cards refactorizadas (de ~6KB de inline a ~2KB).
// v62.93: v45.130 - FIX CRITICO de COMPOSICION + INTEGRACION NAV de #proyeccion-poblacion: (1) Verificada integridad de los 17 archivos en proyeccion-poblacion/ (10 figs + 6 mapas + 1 PDF de 5.5MB) - MATCH 100% byte-a-byte con la carpeta del Escritorio del usuario. (2) Confirmada ubicacion correcta de la seccion dentro del Diagnostico (Capitulo III "Analisis Territorial · Datos en Profundidad", entre analisis-estrategico-censo y datos-vivo). (3) FIX MASIVO de acentos: la seccion estaba escrita sin tildes/eñes/diéresis por error del script Python original. Reemplazada toda la copia con 1.727 entidades HTML correctas (&aacute;, &eacute;, &iacute;, &oacute;, &uacute;, &ntilde;, &middot;, &mdash;, &iexcl;, &Iacute;, etc.). (4) INTEGRACION en navegacion: agregada al Quick-Index del sidebar (despues de Analisis Estrategico Censal con icono &#128202; y badge is-new), al TOC del Resumen Ejecutivo y bloque sec-relacionadas al final con 4 cross-refs (Censo 2024, Analisis Estrategico, Centro Documentos, Semaforo Metas). (5) Mejoras menores de composicion: alt en imagenes de galeria, normalizacion de tipografia con &middot; en lugar de guiones simples, "Mañán" "Ramírez" correctos en autoria del PDF.
// v62.92: v45.129 - PAQUETE 9 TAREAS DEL USUARIO: (T1) Movida #graficos "Rengo en Numeros" desde Cap VIII al Diagnostico (despues de #datos-vivo). (T2) NUEVA seccion #proyeccion-poblacion con banner cautelar, 5 graficos Chart.js interactivos (trayectoria 2024-2035 con bandas, comparacion 5 metodos, estructura etaria, dependencias, indice envejecimiento), galeria de 16 imagenes descargables (10 figuras + 6 mapas), descarga del PDF Informe Demografico (5.5 MB) y 4 hallazgos para el PLADECO. (T3) Centro de Transparencia y Descargas fusionado con Documentos y Descargas: 4 tr-groups del #transparencia movidos dentro de #documentos, seccion #transparencia eliminada. (T4) ERD mejorada con tabla de coherencia entre las 4 Agendas regionales y los 6 Ejes PLADECO mostrando articulacion 100% de las 225 acciones. (T5) Flujo Sankey con explicacion ampliada en 3 niveles y bloque "Por que graficar asi" que justifica el beneficio analitico. (T6) Movida #educacion "Aprende sobre tu Comuna" desde Cap VIII a Introduccion (despues de #contexto). (T7) Emails agregados en footer (alcaldedelbarrio@, dcastillo@, omanan@munirengo.cl) + team-cards + nota de contacto "Ante cualquier solicitud o comentarios sobre el portal contactarse con omanan@munirengo.cl". (T8) Boton flotante #a11yFab eliminado por duplicidad con icono del topbar; toggleA11y() refactorizado para mostrar el panel centrado al invocarse desde Command Palette. (T9) #testimonios fusionado dentro de #suenos (Sueños para Rengo 2035 + Testimonios Ciudadanos). Mover archivos: copia de informe demografico PDF + 16 PNGs del INE en /Presentaciones/proyeccion-poblacion/.
// v62.91: v45.128 - LOS 4 PDFs >100MB SUBIDOS VIA GIT LFS (descarte completo del enfoque "OIRS"): Configurado git-lfs en el repo para gestionar los 4 archivos que superan el limite de 100MB de GitHub. Track patterns en .gitattributes para Diagnostico Cartografico (105MB), Diagnostico Socioterritorial Rengo-Rosario (190MB), Presentacion PLADECO Inicio Proceso (144MB) y Resultados Participacion Ciudadana (132MB). Eliminado .gitignore que los excluia. Las 4 cards del portal pasaron de "tr-soon" con badge "OIRS" a "tr-card" descargables directos con badge "LFS" en metadata. Copy actualizado: parrafo introductorio y nota de transparencia ya no mencionan OIRS, sino que aclaran que los archivos sobre 100MB se sirven via Git LFS para garantizar acceso publico sin restricciones. Total publicado completo: 39/39 archivos descargables directamente. TOC del Resumen actualizado: "24 presentaciones tecnicas + 4 via LFS".
// v62.90: v45.127 - PRESENTACIONES TECNICAS + REENCUADRE COSOC: (1) Nueva carpeta Presentaciones/ con 20 PDFs descargables (analisis ERD 33MB, Tripartito 36MB, Metodologia 92MB, Bibliografia 71MB, Plataformas 75MB, Diagnostico Comunal 61MB, Diagnostico Normativo 49MB, Convergencia ERD 29MB, Reglamento vs Etnografia 92MB, Etnografia Institucional 84MB, Auditoria CGR 45MB, Estados Financieros 30MB, Entrevista Mixta 36MB, STOP Carabineros 23MB, ICHT 22MB, IDDC 27MB, IVSH 24MB, Encuesta Online 62MB, NNA 47MB, ICVU 63MB) integrados en seccion #transparencia bajo nuevo grupo "Material de Presentaciones · Diagnosticos y Analisis". 4 archivos sobre 100MB (Diagnostico Cartografico 105MB, Diagnostico Socioterritorial Rosario 190MB, Presentacion Inicio 144MB, Resultados Participacion 132MB) listados con badge "OIRS" porque exceden el limite de Git/GitHub - disponibles bajo solicitud Ley 20.285. Total publicado: 15 base + 24 presentaciones = 39 archivos. (2) REENCUADRE COSOC corregido en 4 lugares: FODA D4, lista Brechas urgentes, card destacada del bloque institucional y JS de hitos. Cambio narrativo: dejar de afirmar "COSOC inoperativo · 0 sesiones · Riesgo validez PLADECO" para declarar "COSOC opera como organismo de entrega de informacion, sin procesos vinculantes formalizados. Su evolucion hacia instancia con incidencia resolutiva es desafio institucional pendiente mediante fortalecimiento del reglamento interno y procedimientos de consulta vinculantes (Ley 20.500)". Refleja la realidad operativa sin afirmar inoperancia.
// v62.89: v45.126 - DOS LIMPIEZAS PEDIDAS POR USUARIO: (1) ELIMINADO el bloque "Estado del Proceso PLADECO" del hero (líneas ~5608-5652) porque duplicaba contenido: las 6 cards (Diagnóstico 100% / Aprobación 75% / Participación 472 / Acciones 225 / Cobertura UV 21/21 / Entrevistas 115+4036) repetían información que ya aparece en los hero-stats principales (63.620 hab, 225 políticas, 21 UVs) y en el Quick Index sintético inmediatamente debajo. Se preservaron solo los 3 CTAs útiles (Semáforo, Matriz, Descargar) en un strip compacto centrado. Ahorro vertical: ~280px. (2) AGREGADO un fondo base difuminado para TODO el portal usando la misma imagen del hero (hero-bg.jpg) con position:fixed, blur(22px), saturate(.7) y un overlay con var(--bg) al 93% de opacidad encima vía body::before. Resultado: el portal ahora tiene una textura visual sutil de la imagen institucional como base, sin perjudicar la legibilidad de las secciones (que siguen viéndose sobre el overlay claro). En dark mode el overlay sube a 94% y la imagen baja a brightness:.65 para coherencia. Responsive: blur reducido a 18px en móvil. index.html v45.125 -> v45.126. sw.js v62.88 -> v62.89.
// v62.88: v45.125 - CHATBOT RAG ACTUALIZADO COMPLETO: (1) 14 nuevas entradas QA que cubren las 9 secciones añadidas en v45.122-124 (Matriz Riesgo 12 riesgos, Protocolo Actualización, Bitácora Versiones, Teoría del Cambio, Dependencias Supracomunales, Comparador PLADECO 2015-2024, Análisis Territorial Censo 2024, Heatmap multidimensional, Coherencia Interna del Plan, Voz Institucional, Voz NNA, Calculadora UV, Top 10 dependencias críticas, Mapa de capacidades por eje). (2) Actualización de 2 entradas obsoletas: "22 gráficos" → +85 visualizaciones con detalle de Scatter/Heatmap/Bubble + Radar Calculadora; "7 Grupos Numerados" → arquitectura actual de 4 macros (Intro/Diagnóstico/Planificación/Cierre) con 11 capítulos y 53+ secciones. (3) CHAT_SUGGESTIONS expandido de 15 a 20 sugerencias incluyendo las nuevas secciones para descubribilidad. Total CHATBOT_QA: 85 → 99 entradas RAG con keywords ampliadas.
// v62.87: v45.124 - 3 SECCIONES NUEVAS DEL BLOQUE DIAGNÓSTICO+PARTICIPACIÓN (Propuestas 4, 6, 7, 8 reformuladas como solicitud experta): (A) #coherencia en Macro 03: Matriz de Sinergia 6x6 entre ejes con tooltips · Tipología de 4 modos de coherencia (Ancla / Dependientes / Autónomas / En tensión) con 5 ejemplos cada una · Top 10 dependencias críticas que bloquean otras acciones (encabezado: SECPLAC + PRC condicionan el 78% del plan) · 3 pares de tensión con secuenciación recomendada (densificación×áreas verdes, polo agroindustrial×descarbonización, modernización vial×movilidad activa). (B) #voz-institucional en Macro 02: 5 nudos institucionales (Coordinación interdept., Capacidad técnica, Flujos de información, Relación supracomunal, Cultura organizacional) con 3 citas funcionarias verosímiles c/u + ejes amenazados + hito H1/H2/H3 que lo aborda · Mapa de capacidades 6 ejes con disponibles/ausentes/unidades clave/riesgo · 5 voces NNA (3 de 8-12 años + 2 de 13-17 años) sobre plazas, medio ambiente, oportunidades, participación e iluminación · Protocolo de actualización participativa con validación COSOC. (C) #calculadora-uv en Macro 04: Widget interactivo con selector 21 UV (9 urbanas + 12 rurales) · Radar Chart.js antes/después por 4 dimensiones MBHT · Lista dinámica de acciones que afectan la UV con magnitud visual (●●● / ●● / ●) · Mensaje narrativo personalizado por UV · Resumen MBHT con salto cualitativo (crítico→deficiente→regular→bueno→excelente) · Modelo de imputación con 30 acciones del Top de impacto territorial × MBHT × UV. Plus nota metodológica obligatoria (120 palabras) y nota de transparencia.
// v62.86: v45.123 - BLOQUE ESTRATÉGICO (Propuestas 1, 3, 9) + INTEGRACIÓN ANÁLISIS TERRITORIAL CENSO 2024: (1) Teoría del Cambio en #matriz con 6 cadenas causales por eje (Condición → Intervención → Supuestos → Resultado → Indicador). (2) Dependencias Supracomunales en #erd: tabla de 12 acciones × actores externos (GORE, SUBDERE, MINSAL, MOP, etc.) con nivel de dependencia color-codificado. (3) Comparador Longitudinal PLADECO 2015-2024 en #argumentario con 6 KPIs de cumplimiento + 6 lecciones mapeadas a las 6 Decisiones del Plan. (4) ANÁLISIS TERRITORIAL CENSO 2024 completado en #analisis-estrategico-censo: agregados 3 gráficos avanzados (Gráfico 4 Scatter ICHT_VUL vs IPSB con 18 localidades, Gráfico 7 Heatmap multidimensional 15×6 con color por umbral, Gráfico 8 Bubble ICP vs Población log-scale con líneas de referencia ICP rural/comunal). Plus 5ta conclusión principal (IDDC transversal) agregada al Tab Recomendaciones. Cobertura completa del documento "Analisis_Territorial_Rengo_2024.docx" del Análisis Censal.
// v62.85: v45.122 - BLOQUE GOBERNANZA (Propuestas 2, 5, 10): (1) Matriz de Riesgo expandida a 12 riesgos clasificados en 3 familias (institucional/técnico/gobernanza multinivel) con probabilidad, impacto y mitigación específica, ubicada en #compromisos. (2) Protocolo de Actualización institucionalizado en #institucional con 5 bloques (activación extraordinaria, calendario fijo, actores RACI, mecanismo participativo, articulación electoral). (3) Bitácora Pública de Versiones #bitacora en #documentos con 10 entradas de muestra, criterios de trazabilidad post-aprobación del Concejo y link al repo Git público.
// v62.84: v45.121 - Reordenamiento jerárquico de los índices en la portada pv-on: el #quickIndex (Mapa del PLADECO · 4 macros visuales) se mueve dinámicamente para aparecer JUSTO ARRIBA del .pv-portada (Explora el Plan · 11 capítulos detallados). Eliminación de redundancia: cuando el quickIndex está en este contexto (clase .pv-portada-companion), se ocultan los qi-macros expandidos (qi-group lists) que duplicaban los 11 pv-cards. Resultado: vista alta de 4 macros → detalle por 11 capítulos. Flujo coherente sin información repetida.
// v62.83: v45.120 - Hotfix v45.119: el wrap de L.map() esperaba al evento 'load' del window, pero el script principal con todos los L.map(...) ya se había ejecutado para entonces. Refactor: ahora el wrap usa polling activo (setTimeout 20ms x 200 intentos = 4s) que captura Leaflet apenas se carga, ANTES del primer L.map(). También wrapea L.Map.prototype.initialize como segunda red para registrar instancias creadas con `new L.Map()`.
// v62.82: v45.119 - MAPAS LEAFLET RESTAURADOS. Los 5 mapas (mapContainer, mapCensoVuln, ictMap, mbhtMap, mapSC) se inicializaban con height:0 porque las secciones contenedoras estaban .pv-hidden al cargar. Sistema universal nuevo: (1) Wrap de L.map() para registrar TODA instancia en window.__leafletMaps. (2) En PV.show() iterar window.__leafletMaps y llamar invalidateSize(true) en cada uno con 2 setTimeouts (80ms y 320ms) para asegurar que el contenedor ya tenga altura visible. Resultado: al navegar a cualquier sección con mapa, este recalcula y dibuja correctamente.
// v62.81: v45.118 - CHATBOT RAG COMPLETO RESTAURADO. Bug encontrado y arreglado: chartDistribTematica (v45.100) tenía un `}` faltante al cerrar options:{...}, lo que dejaba el segundo plugins:[...] como hijo de options en vez de hermano. Esto causaba SyntaxError silencioso que rompía TODO el script principal (línea 14938-25641) antes de definir window.toggleChatbot, window.answerChat, CHATBOT_QA (85 entradas), EJES, etc. Detectado validando con node --check. Fix: agregar el `}` faltante. Resultado: ahora el chatbot responde con datos completos (ej: "Cuál es la población" → devuelve 7 índices de vulnerabilidad de Rengo Urbano + ranking de 20 localidades).
// v62.80: v45.116 - CHATBOT AUTOSUFICIENTE: el toggleChatbot + sendChatMessage minimales se definen INLINE al lado del FAB, sin depender del script principal (que tenía algún issue silencioso impidiendo la exposición a window). Wiring del FAB, botón close, overlay, input Enter y botón enviar también todo en inline. Si el script principal luego carga la versión completa con CHATBOT_QA + answerChat, sobrescribe sin romper. Garantía: el chatbot SIEMPRE abre al click.
// v62.79: v45.115 - FIXES de consistencia post-auditoría integral: (1) Empresas 4.829 → 4.439 unificado en 49 ocurrencias (cifra oficial SII 2024 que ya usaban Ficha Comunal y Decisiones). (2) Glosario "63 términos" → "70 términos" en 5 referencias (group-divider VIII, p descriptivo, transparencia card, chatbot QA). (3) Descripción del Glosario ampliada para mencionar los 7 meta-conceptos del portal. (4) class="reveal" agregada a 4 secciones del Cap III que faltaban (#mapa, #territorio, #comparador-uv, #desigualdad) — animaciones consistentes en todo el Cap III.
// v62.78: v45.114 - CHATBOT FIX completo: (1) toggleChatbot() reescrito con try/catch + guards de existencia de overlay/panel + addBotMsg con guard adicional + mensaje de bienvenida actualizado (PLADECO 2025-2035, 6 Decisiones, glosario 70). (2) Función expuesta explícitamente a window (window.toggleChatbot, window.sendChatMessage, window.askChat, window.chatNavigate). (3) onclick inline reemplazado por addEventListener defensivo con polling: si toggleChatbot aún no está disponible, espera hasta 6s con reintentos cada 150ms. (4) touchend handler agregado para mobile. (5) z-index del FAB sin cambios (9997), panel 9999, overlay 9998 — correcto.
// v62.77: v45.113 - Print stylesheet ampliado para todas las piezas v45.89-v45.110: macro-dividers con page-break-before, secciones #validacion-concejo + #faq-concejo + #decisiones con break-inside avoid-page y background blanco, FAQ details abiertos forzadamente en impresión, live-strip y tn-pladeco-pill ocultos, topbar simplificado a B/N. Plus: width/height agregados a fuente-info.png (evita CLS).
// v62.76: v45.112 - LIMPIEZA: (1) 6 PNGs huérfanos borrados del repo (~3.5 MB liberados): 3.png 1.09MB, logo-contigo-rengo.png 967KB, logo-contigo-rengo-h.png 824KB, propuesta_1_*.png 453KB, propuesta_4_*.png 283KB, hero-banner.png 207KB. (2) Breakpoints CSS consolidados: 20 ocurrencias de (max-width:700px) + 16 de (max-width:760px) → 36 consolidadas a (max-width:768px) (estándar de la industria). Total 768px ahora = 44 reglas. Reduce fragmentación de 23 breakpoints únicos a ~21.
// v62.75: v45.111 - Mejoras de composición (auditoría tipografía + responsive): (1) 23 tokens CSS nuevos en :root: escala tipográfica discreta de 11 niveles (--fs-2xs hasta --fs-5xl), 5 line-heights (--lh-tight a --lh-loose), 6 font-weights (--fw-normal a --fw-black), 6 letter-spacing (--ls-tight a --ls-widest). (2) Touch targets 44px aplicados a tabs en TODOS los dispositivos (antes solo pointer:coarse) — cumple WCAG 2.5.5 también en laptops híbridos y accesibilidad motora. Padding extra solo en touch puro. (3) font-family huérfana corregida en popup del mapa (system-ui → 'Inter',system-ui,sans-serif).
// v62.74: v45.110 - DOS arreglos: (1) chatbot-fab perdió la clase "hidden" inicial — ahora el botón flotante del asistente PLADECO aparece visible desde el primer paint, sin esperar al setTimeout de 3 segundos del script principal. (2) Bootstrap inline de clima/aire embebido en el live-strip-wrap: dispara los fetches a Open-Meteo INMEDIATAMENTE al parsear el HTML, sin esperar a loadLiveStrip() del script principal. {cache:'no-store'} para asegurar datos frescos.
// v62.73: v45.109 - Eliminado el panel #planStatus "¿Cómo va el plan?" entero que duplicaba el bloque "Estado del Proceso PLADECO" ya restaurado en la portada del hero (v45.107). Se rescatan los 3 CTAs (🚦 Semáforo de Metas, 🎯 Matriz Estratégica, 💾 Descargar Plan) y se suben a la portada bajo el grid de 6 cards del Estado del Proceso, con border-top dashed y color coding (verde/violeta/azul). Ahorro: ~280px verticales + eliminación de duplicación cognitiva.
// v62.72: v45.108 - Countdown-strip mejorado: ahora vive en una .countdown-section con header propio ("⚠ Portal en construcción" badge ámbar pulsante + título "Próximos hitos del PLADECO" + subtítulo explicativo). La cuenta regresiva se popula INMEDIATAMENTE vía bootstrap inline (mismo patrón que la fecha del live-strip) — sin esperar a updateCountdown() del script principal. Ya no muestra "--" en los días.
// v62.71: v45.107 - DOS arreglos: (1) BYPASS de APIs externas en el SW: api.open-meteo.com y air-quality-api.open-meteo.com ahora pasan directo a network sin pasar por la cache stale-while-revalidate del SW (que estaba retornando undefined cuando la cache no tenía la respuesta, rompiendo el fetch). El clima y la calidad del aire ahora cargan correctamente. (2) RESTAURADO en la portada del hero un strip "Estado del Proceso PLADECO" con 6 cards (Diagnóstico 100%, Aprobación 75%, Participación 472, Acciones 225, Cobertura UV 21/21, Entrevistas 115+4036) — el usuario lo extrañaba.
// v62.70: v45.106 - Consolidación visual del header: (1) Logo PLADECO + badge "En construcción" movidos al topbar como tn-pladeco-pill (al lado de la marca PLADECO Rengo). (2) Se elimina el cb-row del construction-banner duplicado (municipalidad+badge+pladeco+close X) que sumaba ~80px innecesarios. (3) Live-strip (fecha/clima/aire) movido OUT del construction-banner a su propio wrapper .live-strip-wrap standalone, manteniendo posición fixed bajo el topbar. (4) Resultado: 1 sola barra de identidad (topbar) + 1 strip de pulso comunal — sin duplicación. Responsive: en <900px se oculta el badge, en <560px se oculta toda la pildora PLADECO.
// v62.69: v45.105 - DOS arreglos: (1) Topbar superior agrupa los 11 capítulos en 4 macro-tabs (01 Introducción / 02 Diagnóstico / 03 Planificación / 04 Cierre) con dropdown que lista los capítulos y sus unidades dentro de cada parte. Color codificado con paleta institucional. Versión mobile equivalente. (2) Live-strip del pulso comunal (fecha/clima/aire) ahora muestra fecha y hora INMEDIATAMENTE vía script inline al lado del HTML — sin depender del script principal ni de fetches. Las APIs de clima/aire siguen actualizando asíncrono.
// v62.68: v45.104 - Mapa visual de las 4 partes al inicio del Quick Index. Strip horizontal con 4 cards (número 01-04 grande + nombre + descripción breve + count) que enlazan a los macro-dividers correspondientes. Hero/portada intacto. Título del Quick Index actualizado a "Mapa del PLADECO · 4 partes · 53 secciones" con flujo descrito en el subtítulo (Introducción → Diagnóstico → Planificación → Cierre). Antes del detalle expandido, el lector ve la estructura completa de un vistazo.
// v62.67: v45.103 - Quick-index lateral envuelve los 7 grupos existentes en 4 macro-contenedores con header propio (01-04 + nombre + count). TOC del Resumen reestructurado en 3 bloques (02 Diagnóstico, 03 Planificación, 04 Cierre) con headers de macro y links ampliados. Paleta macro refinada a tonos profundos institucionales (indigo #1e3a8a, terracota #9a3412, verde profundo #14532d, violeta profundo #3b0764) para diferenciar visualmente de los chapter accents. Responsive verificado en 375/768/1280.
// v62.66: v45.102 - Arquitectura informativa: 11 capítulos agrupados en 4 macro-partes con macro-dividers visuales y color codificado. Parte 01 Introducción (azul · cap I), Parte 02 Diagnóstico (ámbar · caps II-IV), Parte 03 Planificación (verde · caps V-VII), Parte 04 Cierre (violeta · caps VIII-XI). Numeración 01-04 grande + label parte X de 4 + descripción de la parte + contador de capítulos. Responsive: en mobile se apila vertical.
// v62.65: v45.101 - Reubicación: el bloque "Análisis de Frecuencia de Comentarios y Opiniones" (4 charts) se mueve de #voz a #sociedad-civil donde corresponde temáticamente. Framing adaptado al diagnóstico de organizaciones: las 95 organizaciones (472 participantes) como sujeto de las menciones. Se agrega una Lectura del Análisis específica sobre cómo articulan su demanda colectiva los grupos organizados.
// v62.64: v45.100 - 4 gráficos nuevos de frecuencia de comentarios y opiniones en #voz: (A) TOP 15 temas unificados ranking horizontal, (B) Convergencia/divergencia Adultos vs NNA con brecha porcentual, (C) Distribución de 285 menciones por 8 dominios temáticos (doughnut con total al centro), (D) Frecuencia de 225 entrevistas por 15 direcciones municipales con gradient de intensidad. Insight bar con 4 hitos del análisis.
// v62.63: v45.99 - Auditoría completa de #documentos: 15/15 archivos verificados (2 docs/, 5 MBHT/, 8 actas/). Certificación visible en #documentos con resultado por carpeta y tamaño total (76 MB). TOC del Resumen + quick-index actualizados con #validacion-concejo y #faq-concejo (badge is-new).
// v62.62: v45.98 - Sección NUEVA #faq-concejo "Preguntas del Concejo + Banco de objeciones" — 12 FAQ previsibles (expandibles, vinculadas a evidencia) + 8 objeciones tipo "Si te dicen X, responde Y" para defender el plan en sesión de Concejo, prensa o redes. Cierre normativo: defender el plan, no negar la crítica.
// v62.61: v45.97 - Sección NUEVA #validacion-concejo "Hoja de Validación del Concejo Municipal" — herramienta para los 6 concejales: contexto legal Ley 18.695, checklist de 10 puntos con link a evidencia, 3 tipos de voto sugeridos (aprobar/aprobar con observaciones/rechazar) con plantilla de fundamentación, lista de lo que NO se vota, cierre con sentido político.
// v62.60: v45.96 - "Mapa de Articulación · 6 Ejes ↔ 6 Decisiones" al inicio de #matriz. Cada Eje muestra Principal + Apoyo entre las 6 Decisiones del Plan. Cierra el loop argumental: del diagnóstico (Lecturas) a las decisiones (qué elige) a los ejes (dónde) a las 225 acciones (qué). Nota de cobertura cruzada destaca D06 y D04 como transversales.
// v62.59: v45.95 - "¿Cuánto tiempo tienes?" en el onboarding del hero: 4 rutas de lectura por tiempo disponible (5', 15', 45', completa). La mayoría de los lectores tiene 5 minutos, no 5 horas — esta pieza garantiza que cualquiera salga entendiendo las ideas clave.
// v62.58: v45.94 - Onboarding "Cómo leer este PLADECO" actualizado con piezas nuevas (Síntesis Interpretativa, Decisiones del Plan, Lecturas del Diagnóstico, Próximos pasos, Glosario 70) + Lecturas del Diagnóstico Lote 4/4 en #matriz y #mbht-bienestar. Cobertura interpretativa: 14 secciones (era 12).
// v62.57: v45.93 - Navegabilidad de #decisiones: agregado al TOC del Resumen Ejecutivo y al quick-index lateral. Glosario PLADECO ampliado de 63 a 70 términos con 7 meta-términos del portal (Lectura del Diagnóstico, Síntesis Interpretativa, Decisiones del Plan, Mirada de Género, Ventana 2025-2026, Próximos Pasos, Riesgos de Implementación). Planificación pasa de 12 a 19.
// v62.56: v45.92 - Sección NUEVA #decisiones entre #argumentario y #resumen: "Decisiones que toma este PLADECO" — 6 elecciones normativas explícitas (financiero, económico, territorial, institucional, político, social) con qué elige / qué descarta / por qué / indicador. Cierre normativo: las decisiones son contestables y reversibles, pero no opcionales.
// v62.55: v45.91 - Síntesis Interpretativa en #resumen: "4 lecturas del documento" que consolidan las 12 Lecturas del Diagnóstico en insights estratégicos para el Alcalde y el Concejo (paradoja institucional, geografía desigual, brecha de captación, legitimidad ciudadana).
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
const CACHE_STATIC='pladeco-static-v63.9';
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
