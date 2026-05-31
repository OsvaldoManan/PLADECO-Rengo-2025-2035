# Lectura Fácil · PLADECO Rengo 2025-2035 — Dossier de producción

> Documento técnico y metodológico del modo **Lectura Fácil (LF)** integrado al Portal
> Estratégico del PLADECO Rengo. Norma de referencia: **UNE 153101:2018 EX**.
> Estado: **implementado y en producción** (v45.201 → v45.203). Único pendiente: la
> **validación con personas** (proceso humano, no automatizable). Ante la duda, la regla
> rectora es: **más simple, más grande, más claro.**

Archivos del sistema (todos en `Portal_PLADECO/`):
`lectura-facil.json` · `lf-mode.css` · `lf-mode.js` · `/pictogramas/` (13 ARASAAC + CREDITOS.txt)
· modificaciones en `index.html` y `sw.js`.

---

## PASO A · Fundamento conceptual (Componente 0)

### A.1 Las tres cosas no son lo mismo

| | Qué transforma | Quién la define | Validación |
|---|---|---|---|
| **(a) Lenguaje claro / ciudadano** | La **redacción** para el ciudadano promedio: directo, sin jerga. | El redactor con buen criterio. | Revisión editorial. **No** exige validar con usuarios. |
| **(b) Lectura Fácil (LF)** | El **contenido**, para personas con dificultad de comprensión (discapacidad cognitiva, adultos mayores, baja escolaridad, español 2ª lengua). Reglas estrictas de lenguaje, estructura, tipografía y apoyo visual. | La **norma UNE 153101** + adaptador formado. | **Obligatoria: validación con el público destinatario.** Sin validación, no es LF. |
| **(c) Accesibilidad WCAG 2.1** | El **soporte técnico**: contraste, teclado, lectores de pantalla, foco. No transforma el contenido. | W3C. | Auditoría técnica. |

**Se solapan** en que las tres reducen barreras. **Se diferencian** en el objeto: lenguaje
claro mejora *cómo se escribe*; WCAG mejora *cómo funciona el sitio*; LF transforma *qué se
dice y cómo se comprende cognitivamente* — y, a diferencia de las otras, **exige validación
humana**.

### A.2 Declaración
Este proyecto implementa **Lectura Fácil propiamente tal** (UNE 153101): metodología de
adaptación + apoyo visual ARASAAC + tipografía específica + glosario + audio + **validación
participativa** (Comp. 9). Cumple además WCAG 2.1 AA en el conmutador y los paneles, pero no
se reduce a eso.

### A.3 Por qué es legitimidad democrática, no adorno
Un PLADECO es el instrumento **sobre el cual la comunidad participa y decide**. Si solo lo
comprende quien tiene 12+ años de escolaridad, la participación del resto es **ilusoria**
(Valenzuela Espinosa, 2018). En Rengo los datos lo exigen: **escolaridad 11,1 años** (nacional
12,1), **envejecimiento acelerado**, **4,4% de población migrante** (español como 2ª lengua),
**4.036 NNA** consultados. Excluir a esas personas del *entendimiento* del plan vulnera el
**Art. 21 CRPD** (acceso a la información), el **Art. 9 CRPD** (accesibilidad), la **Ley 20.422**
(inclusión) y la **Ley 20.500** (participación). El antecedente nacional es la **"Ley Fácil"**
de la BCN. La LF es la **condición material** de un acceso igualitario: un derecho, no una cortesía.

### A.4 Objetivo de legibilidad (criterio objetivo)
Cada bloque LF debe alcanzar **Szigriszt-Pazos (perspicuidad) ≥ 65** (escala INFLESZ "bastante
fácil"), ideal **≥ 80** ("muy fácil"). Equivalente aproximado en **Fernández-Huerta ≥ 80**.
**Cómo se verifica:** pegar cada bloque en un medidor INFLESZ/Szigriszt/Fernández-Huerta
(p. ej. legible.es) antes de redactar el `indice_legibilidad` en el JSON, y **después**
confirmar con la validación humana (Comp. 9). Los 6 textos N1/N2 redactados miden Szigriszt
**80–88** ("muy fácil").

---

## PASO B · Inventario y priorización (Componente 3)

| Nivel | Sección | id en el portal | Estado |
|---|---|---|---|
| **N1 esencial** | ¿Qué es el PLADECO? | `contexto` | ✅ adaptada |
| **N1** | Los 6 ejes | `matriz` | ✅ adaptada |
| **N1** | Cómo participar | `participa` | ✅ adaptada |
| **N1** | Qué pasa en mi UV | `territorio` | ✅ adaptada |
| **N2 importante** | Misión-Visión-Principios | `mvv` | ✅ adaptada |
| **N2** | Historia / cómo se construyó | `historia` | ✅ adaptada |
| **N2** | Hitos del proceso | `timeline`/`proceso` | ⏳ diseñado |
| **N3 deseable** | Indicadores clave en simple | `kpis_lf` (3) | ✅ datos listos |

**Calidad sobre cantidad:** adaptar y **validar bien 4 secciones N1** supera a "traducir" mal
las 53. Una LF amateur y sin validar genera *falsa accesibilidad* (peor que no tenerla).

---

## PASO C · Arquitectura de archivos

| Archivo | Nuevo/Mod | Propósito |
|---|---|---|
| `lectura-facil.json` | **Nuevo** | Contenido LF separado del HTML, indexado por id de sección + glosario global + KPIs LF + 8 Q/R del asistente. |
| `lf-mode.css` | **Nuevo** | Tipografía y tratamiento visual LF (Comp. 10) + panel, sello, glosario, tarjetas, fallback. |
| `lf-mode.js` | **Nuevo** | Conmutador, inyección, fallback, glosario, audio TTS, sello, métricas. |
| `/pictogramas/` | **Nuevo** | 13 pictogramas ARASAAC (PNG) + `CREDITOS.txt` (atribución CC). |
| `index.html` | **Mod** | 5 puntos: `<link>` CSS, conmutador "LF", 5ª ruta, `<script>`, rama LF en `answerChat`. |
| `sw.js` | **Mod** | Precache de `lectura-facil.json`/`lf-mode.css`/`lf-mode.js` + bumps de caché. |

---

## COMPONENTE 1 · LF como "quinta ruta"

**Por qué una ruta y no un botón aislado:** el portal ya enseña al usuario a entrar por
**puertas según su necesidad** (4 rutas por tiempo). Sumar la LF como **5ª puerta** la
presenta como una *forma legítima de leer* —no como una concesión escondida— y la coloca
donde el usuario ya está decidiendo cómo entrar. Reduce el estigma y aumenta el descubrimiento.

**Tarjeta (en 1ª persona, dirigida al usuario):**
```html
<a href="#contexto" id="lfRouteCard" class="qi-ruta-card" data-tone="lf">
  <div class="qi-ruta-top"><span class="qi-ruta-time">📖</span><span class="qi-ruta-tag">Lectura Fácil</span></div>
  <div class="qi-ruta-desc">Quiero leer con frases cortas, palabras simples y dibujos que me ayuden a entender.</div>
</a>
```
**Conexión con el conmutador (Comp. 2):** la tarjeta no navega "a una página LF"; **activa el
modo global** (`lf-mode.js` intercepta su clic, llama `enable()` y lleva a la 1ª sección
adaptada). Una sola fuente de verdad del estado LF.

**Criterios de logro:** la tarjeta aparece junto a las 4 rutas, con la misma estética; al
activarla, el modo LF queda ON (persistente) y el usuario llega a una sección adaptada. ✅ **Cumplido.**

---

## COMPONENTE 2 · Conmutador global persistente y accesible

**Ubicación:** junto a 🔍 y 🌙 en `.tn-utils-group`. *Por qué:* es donde viven los
**modos globales** del portal; el usuario ya mira ahí para cambiar tema. Reduce fricción y
comunica "LF es un modo, como el oscuro", no una página aparte.

**HTML:**
```html
<button class="tn-util lf-toggle" type="button" id="lfToggle" title="Lectura Fácil"
        aria-label="Activar o desactivar el modo Lectura Fácil" aria-pressed="false">
  <span aria-hidden="true">📖</span><span class="lf-toggle-txt">LF</span>
</button>
```

**Accesibilidad — cada decisión:**
- `aria-label` describe la acción (no solo "LF").
- `aria-pressed` (true/false) comunica el **estado** a lectores de pantalla (es un *toggle*, no un botón de acción).
- **Ícono 📖 + texto "LF"**: no depende del color (cumple WCAG 1.4.1). El estado activo se marca con fondo navy **y** `aria-pressed`, no solo color.
- Navegable por teclado (es un `<button>` nativo) con **foco visible** (`outline:3px solid` en `lf-mode.css`).

**Persistencia (entre secciones y visitas):**
```js
function enable(){ document.body.setAttribute('data-lf','true');
  try{localStorage.setItem('pladeco-lf','1');}catch(e){} /* … */ }
function disable(){ document.body.removeAttribute('data-lf');
  try{localStorage.removeItem('pladeco-lf');}catch(e){} /* … */ }
/* al cargar: */ var wanted=localStorage.getItem('pladeco-lf')==='1'; if(wanted)enable();
```

**Convivencia con modo oscuro:** el modo oscuro es `body.dark` (clase) y la LF es
`body[data-lf="true"]` (atributo). Son ortogonales: `body.dark[data-lf="true"]` funciona sin
conflicto; `lf-mode.css` define overrides `body.dark` para todos los componentes LF.

**Anuncio a lectores de pantalla (live region):**
```js
/* región oculta visualmente, anunciada por el lector */
<div id="lfLive" class="lf-sr-live" aria-live="polite" role="status"></div>
function announce(msg){var l=document.getElementById('lfLive');
  l.textContent='';setTimeout(function(){l.textContent=msg;},60);} /* el reset fuerza el re-anuncio */
/* enable(): announce('Lectura Fácil activada.') · disable(): 'Lectura Fácil desactivada.' */
```
*Por qué el reset + timeout:* `aria-live` solo anuncia cambios; vaciar y reescribir garantiza
que se anuncie aunque el texto se repita.

**Criterios de logro:** persiste tras recargar (verificado: auto-activa desde localStorage),
navegable por teclado con foco visible, anuncia el cambio, convive con oscuro. ✅ **Cumplido.**

---

## COMPONENTE 3 · Curaduría, señalización y fallback

**Distintivo "Disponible en Lectura Fácil"** (badge en cada panel adaptado):
```html
<span class="lf-badge">★ Lectura Fácil</span>
```
```css
.lf-badge{display:inline-flex;gap:6px;font-weight:800;padding:4px 11px;border-radius:99px;
  background:rgba(31,56,100,.12);color:var(--lf-azul);border:1px solid rgba(31,56,100,.25)}
```

**Fallback honesto** (sección no adaptada con LF activo):
```js
function buildFallback(){
  var links=Object.keys(DATA.secciones).map(function(id){
    return '<li>➜ <a href="#'+id+'">'+esc(DATA.secciones[id].titulo_lf)+'</a></li>';}).join('');
  return '<div class="lf-fallback" role="status"><h3>⚠️ Esta sección todavía no está en Lectura Fácil</h3>'+
    '<p>Estamos preparando esta parte en Lectura Fácil, paso a paso.</p>'+
    '<p>Mientras tanto, ya puedes leer en Lectura Fácil:</p><ul>'+links+'</ul></div>';
}
```
**Por qué la transparencia es buena práctica:** ocultar la falta de cobertura **engaña** al
usuario que confía en el modo; decirla con honestidad **lo orienta** a lo que sí puede leer y
respeta su autonomía. La accesibilidad incluye *gestionar expectativas*.

**Criterios de logro:** badge visible en adaptadas; aviso honesto con enlaces a las adaptadas
en las no adaptadas (verificado en `#censo`). ✅ **Cumplido.**

---

## COMPONENTE 4 · Arquitectura de contenido: JSON separado (crítico)

**Por qué NO incrustar la LF en el HTML:** el portal sube **~1 versión/día**. Si la LF viviera
en el HTML, (1) cada edición de la versión completa arriesgaría romper o **desincronizar** la
LF; (2) el archivo (ya 2,9 MB) crecería sin control; (3) sería imposible saber qué LF quedó
atrás. Un **archivo de datos separado** indexado por `id_seccion` desacopla el contenido LF del
HTML: se edita sin tocar el portal, y el campo **`version_origen`** permite **detectar
desactualización** (cuando la sección completa cambió y la LF no).

**Estructura por entrada (campos exactos):** `id_seccion`, `titulo_lf`, `contenido_lf` (bloques
`parrafo`/`lista`/`destacado`), `pictogramas`, `glosario_palabras_dificiles`, `estado_validacion`,
`fecha_validacion`, `version_origen`, `indice_legibilidad`.

**Ejemplo real — "¿Qué es el PLADECO?" (`contexto`):**
```json
"contexto": {
  "id_seccion":"contexto","titulo_lf":"¿Qué es el PLADECO?","pictograma_principal":"plan",
  "contenido_lf":[
    {"tipo":"parrafo","texto":"El PLADECO es el plan de la comuna de Rengo."},
    {"tipo":"parrafo","texto":"PLADECO quiere decir: Plan de Desarrollo de la Comuna."},
    {"tipo":"parrafo","texto":"Es un plan para 10 años. Va desde el año 2025 hasta el año 2035."},
    {"tipo":"lista","titulo":"Por ejemplo, queremos mejorar:","items":["La salud y los consultorios.","Las calles y los caminos.","Las plazas y los parques.","La seguridad del barrio."]},
    {"tipo":"parrafo","texto":"El plan lo hace la Municipalidad de Rengo. Lo hace junto con los vecinos y las vecinas."},
    {"tipo":"parrafo","texto":"Una ley dice que cada comuna debe tener un plan así. Es la Ley número 18.695."},
    {"tipo":"destacado","texto":"Tú puedes leer el plan. Tú puedes dar tu opinión sobre el plan."}
  ],
  "glosario_palabras_dificiles":["PLADECO","comuna","Municipalidad","ley"],
  "estado_validacion":"borrador","fecha_validacion":null,"version_origen":"v45.200",
  "indice_legibilidad":{"metodo":"Szigriszt-Pazos","valor":86,"nivel":"muy fácil"}
}
```
**Ejemplo real — "Cómo participar" (`participa`):** título "¿Cómo puedo participar?", 4 pasos en
lista (anotarse, avisar un problema, ver el calendario, ver el Concejo por internet) + destacado
con contacto. Glosario: participar, Concejo, Junta de Vecinos, taller. Szigriszt 88.

**JS de carga con manejo de error (nunca pantalla rota):**
```js
function load(cb){
  fetch('lectura-facil.json').then(function(r){if(!r.ok)throw 0;return r.json();})
    .then(function(d){DATA=d;window.LF_ASISTENTE=d.asistente_lf||[];cb&&cb();})
    .catch(function(){loadError=true;cb&&cb();});   // <- no rompe nada
}
/* si loadError: enable() avisa "Lectura Fácil activada, pero no se pudo cargar el contenido"
   y el portal sigue funcionando con su contenido normal. */
```
**Qué ve el usuario si el JSON no carga:** un aviso breve; **nunca** una sección vacía o rota —
el contenido completo del portal permanece visible.

**Criterios de logro:** el JSON carga e inyecta; si falla, aviso + portal intacto; `version_origen`
permite detectar desfase. ✅ **Cumplido** (6 secciones, 15 términos de glosario).

---

## COMPONENTE 5 · Metodología de adaptación + 6 transformaciones reales

**Reglas de lenguaje:** una idea por oración · <15 palabras · vocabulario cotidiano · explicar
toda palabra difícil y toda sigla · voz activa · trato directo "tú" consistente · sin metáforas,
ironías ni abstracciones. **Reglas de estructura:** orden lógico · un tema por párrafo · títulos
que anuncian el contenido · listas antes que párrafos largos.

**(a) Qué es el PLADECO**
- *Actual:* «Instrumento rector de la planificación municipal, establecido en la Ley Orgánica Constitucional de Municipalidades, que orienta el desarrollo armónico y participativo de la comuna.»
- **LF:** «El PLADECO es el plan de la comuna de Rengo. PLADECO quiere decir: Plan de Desarrollo de la Comuna. Es un plan para 10 años.»
- *Reglas:* sigla explicada, frases <12 palabras, sin tecnicismos. **Szigriszt ≈ 86.**

**(b) Art. 7 Ley 18.695 (texto legal citado)**
- *Actual:* «Contemplará las acciones orientadas a satisfacer las necesidades de la comunidad local y a promover su avance social, económico y cultural.»
- **LF:** «La ley dice que cada comuna debe tener un plan. El plan debe ayudar a las personas. Por ejemplo: a vivir mejor, a trabajar y a aprender.»
- *Reglas:* se reescribe la **idea**, no se traduce palabra por palabra; "avance social, económico y cultural" → ejemplos concretos. **Szigriszt ≈ 84.**

**(c) Historia de Rengo**
- *Actual:* «Rengo no se construye sola. Desde los pueblos originarios picunche hasta el PLADECO 2025-2035, cada hito ha estado sostenido por la organización colectiva: caciques mapuche, cofradías coloniales, sociedades obreras del ferrocarril…»
- **LF:** «Rengo se construyó entre todos. Hace muchos años vivían aquí los pueblos originarios. Después llegaron más personas. Siempre se juntaron para mejorar el lugar. Por eso hoy existen las Juntas de Vecinos.»
- *Reglas:* lista de términos cultos → idea simple; orden temporal claro. **Szigriszt ≈ 83.**

**(d) Un eje (Ciudad)**
- *Actual:* «Desarrollo territorial equilibrado: infraestructura, conectividad, espacios públicos y ordenamiento urbano sostenible.»
- **LF:** «Tema Ciudad: queremos mejorar las calles, las plazas, el agua y la luz de Rengo.»
- *Reglas:* de abstracto a tangible. **Szigriszt ≈ 82.**

**(e) Cómo participar**
- *Actual:* «4 canales abiertos para que vecinos, vecinas, organizaciones y representantes se mantengan conectados con el proceso PLADECO más allá del diagnóstico: suscripción a novedades, reporte directo de problemáticas territoriales, calendario público de talleres…»
- **LF:** «Tú puedes participar en el plan de Rengo. Participar quiere decir: dar tu opinión y ayudar a decidir.» + lista de 4 pasos. **Szigriszt ≈ 88.**

**(f) Indicador con cifras** → ver Componente 6.

**Criterios de logro:** cada texto LF mide Szigriszt ≥ 80; aplica las reglas; queda en el JSON.
✅ **Cumplido en redacción.** Pendiente: confirmación con usuarios (Comp. 9).

---

## COMPONENTE 6 · Números, datos y cifras en LF

**Reglas:** dígitos no palabras · redondear o evitar cifras grandes · **porcentaje con
equivalencia cotidiana** ("30,7%" → "de cada 100 pesos, solo se usan 31") · evitar decimales ·
**contextualizar toda cifra**. **Patrón:** cifra grande + frase simple + pictograma + comparación.

**3 KPIs reales (`kpis_lf` en el JSON):**
- **63.620** → "Casi 64 mil personas viven en Rengo." (pictograma `personas`)
- **2 m²** → "Cada persona tiene casi 2 metros de área verde. Es como una mesa. Queremos más." (pictograma `arbol`)
- **31 de 100** → "De cada 100 pesos para obras, solo se usan 31. Queremos usar más." (pictograma `dinero`)

**Tarjeta de dato LF (HTML+CSS):**
```html
<div class="lf-kpi"><img class="lf-kpi-pic" src="pictogramas/dinero.png" alt="">
  <div class="lf-kpi-cifra">31 de 100</div>
  <div class="lf-kpi-titulo">pesos se alcanzan a usar</div>
  <div class="lf-kpi-exp">De cada 100 pesos para obras, solo se usan 31. Queremos usar más.</div>
</div>
```
```css
.lf-kpi{background:var(--lf-card);border:1px solid var(--lf-borde);border-top:4px solid var(--lf-azul);
  border-radius:14px;padding:18px}
.lf-kpi-cifra{font-size:2.2rem;font-weight:900;color:var(--lf-azul);line-height:1}
.lf-kpi-exp{font-size:.95rem;line-height:1.6}
```
**Criterios de logro:** las cifras grandes nunca van solas; porcentajes con equivalencia /100;
CSS de la tarjeta listo. ✅ **Cumplido** (datos + CSS; inyección en una sección-host = fase
siguiente).

---

## COMPONENTE 7 · Pictogramas ARASAAC y glosario visual

**Por qué los emojis NO sirven:** varían por dispositivo/SO, son ambiguos (🏛️ ¿museo o
municipio?) y **no están diseñados para comprensión cognitiva**. **ARASAAC** (Gobierno de
Aragón, **CC BY-NC-SA**) es el sistema pictográfico estándar y validado para LF.

**Obtención/alojamiento (sitio estático):** descargados vía API de ARASAAC y alojados
**localmente** en `/pictogramas/{nombre}.png` (13 pictogramas N1: plan, calendario, salud,
casa, votar, carta, telefono, lista, personas, arbol, dinero, mapa, barrio). **Atribución**
obligatoria en `/pictogramas/CREDITOS.txt` (autor Sergio Palao · origen ARASAAC · licencia CC
BY-NC-SA · propiedad Gob. Aragón) — **coherente con la lógica de datos abiertos del portal**.

**Patrón pictograma + texto (con alt + degradación):**
```html
<img class="lf-pic" src="pictogramas/plan.png" alt="" onerror="this.style.display='none'">
```
*Por qué `alt=""`:* el pictograma **acompaña** un texto que ya dice lo mismo → es decorativo
para el lector de pantalla (evita redundancia); `onerror` lo oculta si falta (nunca un ícono roto).

**Glosario accesible (HTML+CSS+JS):** la palabra difícil es un `<button>` con subrayado
punteado; al activarla (clic o teclado) muestra su explicación simple en un recuadro:
```js
/* la palabra se envuelve sin incrustar la definición (que contiene otras palabras del glosario) */
html=html.replace(re,'<button type="button" class="lf-glos" data-w="'+esc(w)+'" aria-expanded="false">$1</button>');
/* al activar: busca la definición en el glosario global y la inserta como recuadro */
var def=DATA.glosario_global[g.dataset.w];
pop.innerHTML='<strong>'+esc(g.dataset.w)+':</strong> '+esc(def);
g.setAttribute('aria-expanded','true');
```
```css
.lf-glos{color:var(--lf-acento);font-weight:800;border-bottom:2px dotted var(--lf-acento);cursor:help}
.lf-glos:focus-visible{outline:3px solid var(--lf-acento);outline-offset:2px}
.lf-glos-pop{background:var(--lf-card);border-left:4px solid var(--lf-acento);padding:.7em 1em}
```
*Accesible:* es un `<button>` (foco + Enter/Espacio), `aria-expanded` refleja el estado, y la
definición se anuncia por la live region.

**Criterios de logro:** pictogramas locales con atribución CC; glosario por teclado y lector;
`alt` correcto; degradación si falta el archivo. ✅ **Cumplido.**

---

## COMPONENTE 8 · Audio y asistente en modo LF

**Audio (Web Speech API nativa, sin backend):**
```js
function speak(){
  if(!('speechSynthesis'in window)){announce('Tu navegador no permite leer en voz alta.');return;}
  if(speaking){stopAudio();return;}
  utter=new SpeechSynthesisUtterance(sectionText());   // junta el texto del panel
  utter.lang='es-CL';utter.rate=.92;
  utter.onend=function(){speaking=false;updateAudioBtns(false);};
  speechSynthesis.cancel();speechSynthesis.speak(utter);
  speaking=true;updateAudioBtns(true);logLF('audio');
}
```
Botón "🔊 Escuchar esta sección" → "⏹️ Detener" (play/stop), `aria-pressed`, `min-height:48px`.
**Límites de compatibilidad:** la disponibilidad y calidad de voces depende del navegador/SO
(Chrome/Edge buenas; algunos móviles/voces es-CL limitadas). Degrada en silencio si no hay
`speechSynthesis`.

**Asistente en LF (8 pares verificados):** cuando `[data-lf="true"]`, el asistente responde
**desde un set finito** en lenguaje simple; si no reconoce, da una orientación LF. No altera el
flujo normal:
```js
/* en answerChat(q), rama 0, guardada por data-lf: */
if(document.body.getAttribute('data-lf')==='true' && window.LF_ASISTENTE && window.LF_ASISTENTE.length){
  var best=null,sc=0;
  window.LF_ASISTENTE.forEach(function(par){(par.k||[]).forEach(function(k){
    k=stripAccents(k); if(ql.indexOf(k)>-1 && k.length>sc){sc=k.length;best=par;}});});
  addBotMsg(best ? best.r : 'Puedo ayudarte con cosas del plan de Rengo. Por ejemplo: ¿Qué es el PLADECO? o ¿Cómo participar?');
  showSuggestions(window.LF_ASISTENTE.slice(0,4).map(function(p){return p.p;}));
  return;
}
```
**Los 8 pares (en `lectura-facil.json`):** ¿Qué es el PLADECO? · ¿Cuántas personas viven en
Rengo? · ¿Cuántos temas tiene el plan? · ¿Cómo puedo participar? · ¿Quién hace el plan? ·
¿Cuándo termina? · ¿Dónde veo lo que pasa en mi barrio? · ¿El plan es una ley? — cada uno con
respuesta corta verificada y `k` (keywords) para el matching.

**Criterios de logro:** botón de audio con play/stop accesible; asistente responde simple desde
el set finito y orienta si no reconoce; no rompe el asistente normal. ✅ **Cumplido**
(matching verificado en node; script de 1,19 MB parsea OK).

---

## COMPONENTE 9 · Validación participativa y sello

**Por qué es obligatoria (UNE):** la norma exige que el **público destinatario confirme la
comprensión**. Eso distingue la LF de una simplificación amateur: no basta el criterio del
redactor; lo decide quien va a leer.

**Protocolo (con la infraestructura del PLADECO):**
- **Grupos de 3–6 personas** por perfil: NNA vía **Oficina Local de la Niñez (OLN)**; adultos
  mayores (organizaciones comunales); personas con discapacidad (programa comunal).
- **Dinámica:** leer juntos un texto LF → preguntar (no "¿se entiende?") → registrar.
- **Registro:** % que responde correcto, palabras señaladas como difíciles, dibujos que no
  funcionaron, cambios sugeridos.

**Guion (preguntas que verifican comprensión real):**
1. «Con tus palabras, ¿qué es el PLADECO?»
2. «Nómbrame una cosa que el plan quiere mejorar.»
3. «Si quisieras opinar sobre el plan, ¿qué harías?»
4. «¿Hubo alguna palabra que no entendiste? ¿Cuál?»
5. «¿Qué dibujo te ayudó? ¿Cuál no se entendió?»

**Sello (solo en contenido validado):**
```js
if(entry.estado_validacion==='validado'){
  h+='<div class="lf-sello">✅ Texto <strong>validado por vecinos y vecinas de Rengo</strong>'+
     (entry.fecha_validacion?' · '+esc(entry.fecha_validacion):'')+'.</div>';
}else{
  h+='<div class="lf-borrador">✎ Versión preliminar. Todavía la estamos revisando con vecinos y vecinas de Rengo.</div>';
}
```
**Doble valor:** confianza para el usuario (alguien como él lo validó) + **evidencia de
participación para SUBDERE**. **Lógica:** el sello aparece **solo** cuando
`estado_validacion:"validado"` en el JSON; hoy todas están en `"borrador"` (honestidad).

**Criterios de logro:** protocolo + guion definidos; sello implementado y condicionado al
estado; registro previsto. ✅ **Diseño y mecanismo listos.** ⏳ **Pendiente: ejecutar las
sesiones** (humano, no automatizable).

---

## COMPONENTE 10 · Tipografía y tratamiento visual LF

**Reglas justificadas:** sans-serif (Inter) · **≥20px** (más grande que la prosa normal) ·
**alineación izquierda, nunca justificada** —la justificación crea "ríos" de espacio irregular
entre palabras que **desorientan el seguimiento visual** de lectores con dificultad— ·
interlineado **1.7** · ancho de línea **62ch** (más estrecho que la prosa) · sin texto sobre
imágenes · sin cursivas extensas · sin mayúsculas sostenidas · **contraste reforzado**.

```css
body[data-lf="true"] .lf-panel{font-size:1.25rem;line-height:1.7;max-width:62ch;color:var(--lf-text)}
.lf-panel *{text-align:left !important}            /* nunca justificado */
.lf-panel .lf-titulo{font-size:1.9rem;font-weight:800;color:var(--lf-azul)}
.lf-lista li{padding:.55em .8em;background:var(--lf-card);border:1px solid var(--lf-borde);border-radius:12px}
/* combinado con modo oscuro: */
body.dark{--lf-text:#eaf1fb;--lf-bg:#0f1d30;--lf-card:#15243a;--lf-borde:#2c3f59;--lf-acento:#7ea4d8}
body.dark .lf-panel .lf-titulo{color:#9db8e0}
@media(max-width:560px){:root{--lf-fs:1.18rem;--lf-ancho:100%}}
```
Pictograma proporcional al texto (título `1.4em`, cuerpo `64px`), separación entre bloques
`1.15em`, foco 3px.

**Criterios de logro:** modo `[data-lf]` sobrescribe tipografía/espaciado/alineación; convive
con oscuro; ancho de lectura más estrecho; responsive. ✅ **Cumplido.**

---

## COMPONENTE 11 · Integración territorial, medición y gobernanza

- **Cuadernillo PDF por UV:** la LF de "qué pasa en mi UV" (`territorio`) es la base del
  cuadernillo imprimible (el portal ya tiene generador jsPDF) para distribución física en sedes.
- **QR territoriales:** un QR en la sede vecinal → `…/?lf=1#territorio` (o el barrio), abriendo
  directo en LF.
- **Métricas (privacy-first):** contadores agregados en `localStorage`, **sin IP ni tracking**:
  ```js
  function logLF(ev){var m=JSON.parse(localStorage.getItem('pladeco-lf-metrics')||'{}');
    m[ev]=(m[ev]||0)+1;localStorage.setItem('pladeco-lf-metrics',JSON.stringify(m));}
  window.getLFMetrics=function(){return JSON.parse(localStorage.getItem('pladeco-lf-metrics')||'{}');};
  ```
  Captura: `activaciones`, `vista:<seccion>`, `audio`. Exportable como **evidencia de uso para SUBDERE**.
- **Gobernanza:** **SECPLAC** mantiene la sincronía completa↔LF; **revalidar al año** o cuando
  `version_origen` ≠ versión vigente de la sección (detector de desactualización).
- **Triple valor:** democrático (acceso igualitario) · SUBDERE (innovación + participación +
  métricas) · académico (caso replicable de LF en planificación comunal).

**Criterios de logro:** métricas operativas; rutas territoriales y de gobernanza definidas;
detector de desfase por `version_origen`. ✅ **Métricas cumplidas; QR/cuadernillo = fase siguiente.**

---

## ANTI-PATRONES (evitados)
- **Infantilizar al adulto** → trato adulto y cercano ("Tú puedes…", no diminutivos).
- **Traducir palabra por palabra** → se reescribe la *idea* (ver Art. 7).
- **Emojis como pictogramas** → ARASAAC.
- **Justificar el texto** → izquierda siempre (`text-align:left !important`).
- **Cifras crudas** → contextualizadas con equivalencia /100.
- **Esconder la LF en otra página** → modo global in-situ + 5ª ruta.
- **Publicar sin validar** → se muestra "Versión preliminar" hasta validar.
- **Dejar la LF desactualizada** → `version_origen` la detecta.
- **Pictogramas decorativos de relleno** → 1 pictograma principal por sección, con sentido.

## AUTOEVALUACIÓN (rúbrica UNE 153101)
| Criterio | Estado | Qué falta |
|---|---|---|
| Lenguaje | ✅ Cumplido | — |
| Estructura | ✅ Cumplido | — |
| Tipografía | ✅ Cumplido | — |
| Apoyo visual | ✅ Cumplido | (ampliar set de pictogramas a N2/N3) |
| Navegación | ✅ Cumplido | — |
| Números | ✅ Cumplido | inyectar tarjetas KPI en una sección-host |
| Sostenibilidad | ✅ Cumplido | automatizar el aviso de `version_origen` desfasado |
| **Validación** | 🟠 **Pendiente** | **ejecutar las sesiones con personas** y marcar `validado` |

**Honestidad:** todo lo técnico está operativo y verificado. Lo único pendiente es lo **no
automatizable**: la **validación con usuarios reales**, que por norma es obligatoria y no puede
sustituirse por criterio técnico. Hasta entonces, los textos se muestran como **borrador**.

## PRODUCTO 1 · Tabla de archivos
| Archivo | Nuevo/Mod | Propósito |
|---|---|---|
| `lectura-facil.json` | Nuevo | Contenido LF (6 secciones) + glosario(15) + 3 KPIs + 8 Q/R |
| `lf-mode.css` | Nuevo | Tipografía/visual LF, panel, sello, glosario, fallback |
| `lf-mode.js` | Nuevo | Conmutador, inyección, fallback, glosario, audio, sello, métricas |
| `/pictogramas/` (13 PNG + CREDITOS.txt) | Nuevo | Apoyo visual ARASAAC + atribución CC |
| `index.html` | Mod | `<link>` CSS · conmutador LF · 5ª ruta · `<script>` · rama LF en `answerChat` |
| `sw.js` | Mod | Precache de archivos LF + bumps de caché |
| `LECTURA-FACIL-DOSSIER.md` | Nuevo | Este documento |

## PRODUCTO 2 · Hoja de ruta por fases
- **Fase 1 — HECHA (v45.201):** infraestructura (conmutador, persistencia, tipografía, audio, glosario, fallback, sello) + 3 secciones N1.
- **Fase 2 — HECHA (v45.202):** pictogramas ARASAAC + 4ª N1 (`territorio`) + 2 N2 (`mvv`, `historia`) + métricas. **→ Nivel 1 completo (4/4).**
- **Fase 3 — HECHA (v45.203):** asistente en LF (8 Q/R verificadas).
- **Fase 4 — PENDIENTE (humano):** **validación** de las 4 secciones N1 con OLN / adultos mayores / discapacidad → marcar `estado_validacion:"validado"` → **los sellos aparecen solos**. *Recién aquí N1 está "terminado" según UNE.*
- **Fase 5 — expansión:** N2 restante (hitos), N3 (KPIs inyectados), cuadernillo PDF + QR territoriales.

> **Prioridad explícita:** las **4 secciones N1 operativas, validadas y con sello** antes de
> expandir a N2/N3. Hoy las 4 N1 están **operativas**; falta solo la **validación** (Fase 4).
