/* ═══════════════════════════════════════════════════════════════════════════
   LECTURA FÁCIL · lf-mode.js   (UNE 153101:2018 EX · WCAG 2.1 AA)
   Modo global persistente. Carga el contenido LF desde lectura-facil.json
   (separado del HTML para sobrevivir al versionado diario del portal).
   Sin frameworks · sin backend · compatible con GitHub Pages.
   ═══════════════════════════════════════════════════════════════════════════ */
(function(){
  'use strict';
  var KEY='pladeco-lf';
  var JSON_URL='lectura-facil.json';
  var DATA=null, loadError=false, speaking=false, utter=null;

  /* ── utilidades ── */
  function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
  function on(){return document.body.getAttribute('data-lf')==='true';}
  function pictoSrc(name){return 'pictogramas/'+name+'.png';}  /* ARASAAC alojados localmente */
  function announce(msg){var l=document.getElementById('lfLive');if(l){l.textContent='';setTimeout(function(){l.textContent=msg;},60);}}

  /* ── glosario: envuelve la 1ª aparición de cada palabra difícil ── */
  function withGlos(text, words){
    var html=esc(text);
    if(!words||!DATA.glosario_global)return html;
    words.forEach(function(w){
      var def=DATA.glosario_global[w]; if(!def)return;
      var re=new RegExp('('+w.replace(/[.*+?^${}()|[\\]\\\\]/g,'\\$&')+')','');
      /* NO incrustamos la definición (contiene otras palabras del glosario y
         corrompería el reemplazo secuencial); se busca al hacer clic. */
      html=html.replace(re,'<button type="button" class="lf-glos" data-w="'+esc(w)+'" aria-expanded="false">$1</button>');
    });
    return html;
  }

  /* ── construye el HTML del panel LF de una sección adaptada ── */
  function buildPanel(entry){
    var words=entry.glosario_palabras_dificiles||[];
    var pic=entry.pictograma_principal;
    var h='<div class="lf-panel" role="region" aria-label="Versión en Lectura Fácil">';
    h+='<span class="lf-badge">&#9733; Lectura Fácil</span>';
    h+='<h2 class="lf-titulo">'+(pic?'<img class="lf-pic" src="'+pictoSrc(pic)+'" alt="" onerror="this.style.display=\'none\'">':'')+esc(entry.titulo_lf)+'</h2>';
    /* botón escuchar */
    h+='<div class="lf-audio"><button type="button" class="lf-audio-btn" data-lf-audio aria-pressed="false"><span class="lf-audio-ico" aria-hidden="true">&#128266;</span> Escuchar esta sección</button></div>';
    /* bloques */
    (entry.contenido_lf||[]).forEach(function(b){
      if(b.tipo==='parrafo'){h+='<p class="lf-bloque">'+withGlos(b.texto,words)+'</p>';}
      else if(b.tipo==='destacado'){h+='<div class="lf-destacado">'+withGlos(b.texto,words)+'</div>';}
      else if(b.tipo==='lista'){
        h+='<div class="lf-lista-titulo">'+esc(b.titulo||'')+'</div><ul class="lf-lista">';
        (b.items||[]).forEach(function(it){h+='<li><span>'+withGlos(it,words)+'</span></li>';});
        h+='</ul>';
      }
    });
    /* sello validado / nota de borrador (honestidad) */
    if(entry.estado_validacion==='validado'){
      h+='<div class="lf-sello"><span class="lf-sello-ico" aria-hidden="true">&#9989;</span><span>Texto <strong>validado por vecinos y vecinas de Rengo</strong>'+(entry.fecha_validacion?' &middot; '+esc(entry.fecha_validacion):'')+'.</span></div>';
    }else{
      h+='<div class="lf-borrador"><span class="lf-borrador-ico" aria-hidden="true">&#9998;</span><span>Versión preliminar. Todavía la estamos revisando con vecinos y vecinas de Rengo.</span></div>';
    }
    h+='</div>';
    return h;
  }

  /* ── aviso honesto para secciones aún no adaptadas ── */
  function buildFallback(){
    var links=Object.keys(DATA.secciones).map(function(id){
      return '<li>&#10148; <a href="#'+id+'">'+esc(DATA.secciones[id].titulo_lf)+'</a></li>';
    }).join('');
    return '<div class="lf-fallback" role="status"><h3><span aria-hidden="true">&#9888;&#65039;</span> Esta sección todavía no está en Lectura Fácil</h3>'+
      '<p>Estamos preparando esta parte en Lectura Fácil, paso a paso.</p>'+
      '<p>Mientras tanto, ya puedes leer en Lectura Fácil:</p><ul>'+links+'</ul></div>';
  }

  /* ── aplica/limpia el modo en una sección concreta ── */
  function clearSection(sec){
    sec.classList.remove('lf-on');
    var p=sec.querySelector(':scope > .lf-panel, :scope > .lf-fallback');
    while(p){p.remove();p=sec.querySelector(':scope > .lf-panel, :scope > .lf-fallback');}
  }
  function decorateAdapted(){
    /* inyecta el panel en TODAS las secciones adaptadas (el motor de vistas controla cuál se ve) */
    Object.keys(DATA.secciones).forEach(function(id){
      var sec=document.getElementById(id); if(!sec)return;
      if(sec.querySelector(':scope > .lf-panel'))return;
      sec.insertAdjacentHTML('afterbegin',buildPanel(DATA.secciones[id]));
      sec.classList.add('lf-on');
    });
  }
  function currentSectionId(){return (location.hash||'').replace(/^#/,'')||'inicio';}
  function maybeFallback(){
    var id=currentSectionId();
    if(DATA.secciones[id])return;                 /* adaptada: ya tiene panel */
    var sec=document.getElementById(id); if(!sec)return;
    if(sec.querySelector(':scope > .lf-fallback'))return;
    sec.insertAdjacentHTML('afterbegin',buildFallback());
  }

  /* ── activar / desactivar ── */
  function enable(){
    document.body.setAttribute('data-lf','true');
    try{localStorage.setItem(KEY,'1');}catch(e){}
    syncToggle(true);
    if(loadError){announce('Lectura Fácil activada, pero no se pudo cargar el contenido.');return;}
    if(DATA){decorateAdapted();maybeFallback();}
    announce('Lectura Fácil activada.');
  }
  function disable(){
    stopAudio();
    document.body.removeAttribute('data-lf');
    try{localStorage.removeItem(KEY);}catch(e){}
    syncToggle(false);
    document.querySelectorAll('section.lf-on, .lf-fallback').forEach(function(){});
    document.querySelectorAll('section').forEach(clearSection);
    announce('Lectura Fácil desactivada.');
  }
  function toggle(){on()?disable():enable();}
  function syncToggle(active){
    var b=document.getElementById('lfToggle');
    if(b){b.setAttribute('aria-pressed',active?'true':'false');b.classList.toggle('lf-active',active);}
  }

  /* ── audio: Web Speech API (nativa, sin servicios externos) ── */
  function sectionText(){
    var p=document.querySelector('section.lf-on:not([style*="display: none"]) .lf-panel') ||
          document.querySelector('#'+CSS.escape(currentSectionId())+' .lf-panel');
    if(!p)return '';
    var t=[];p.querySelectorAll('.lf-titulo,.lf-bloque,.lf-destacado,.lf-lista-titulo,.lf-lista li').forEach(function(n){t.push(n.textContent.trim());});
    return t.join('. ');
  }
  function stopAudio(){try{if(window.speechSynthesis)speechSynthesis.cancel();}catch(e){}speaking=false;updateAudioBtns(false);}
  function updateAudioBtns(active){document.querySelectorAll('[data-lf-audio]').forEach(function(b){b.setAttribute('aria-pressed',active?'true':'false');b.innerHTML=active?'<span class="lf-audio-ico" aria-hidden="true">&#9209;&#65039;</span> Detener':'<span class="lf-audio-ico" aria-hidden="true">&#128266;</span> Escuchar esta sección';});}
  function speak(){
    if(!('speechSynthesis'in window)){announce('Tu navegador no permite leer en voz alta.');return;}
    if(speaking){stopAudio();return;}
    var txt=sectionText(); if(!txt)return;
    utter=new SpeechSynthesisUtterance(txt);
    utter.lang='es-CL';utter.rate=.92;utter.pitch=1;
    utter.onend=function(){speaking=false;updateAudioBtns(false);};
    utter.onerror=function(){speaking=false;updateAudioBtns(false);};
    speechSynthesis.cancel();speechSynthesis.speak(utter);
    speaking=true;updateAudioBtns(true);
  }

  /* ── listeners globales (delegación) ── */
  function wire(){
    /* conmutador en la barra */
    var b=document.getElementById('lfToggle');
    if(b){b.addEventListener('click',toggle);}
    /* 5ª ruta de lectura */
    var r=document.getElementById('lfRouteCard');
    if(r){r.addEventListener('click',function(e){e.preventDefault();if(!on())enable();var first=Object.keys(DATA||{secciones:{}}.secciones||{})[0];location.hash='#'+(first||'contexto');setTimeout(function(){window.scrollTo({top:0,behavior:'smooth'});},80);});}
    /* glosario + audio (delegación en document) */
    document.addEventListener('click',function(e){
      var g=e.target.closest('.lf-glos');
      if(g){
        if(g._pop){g._pop.remove();g._pop=null;g.setAttribute('aria-expanded','false');return;}
        var def=(DATA&&DATA.glosario_global&&DATA.glosario_global[g.dataset.w])||'';
        var pop=document.createElement('div');pop.className='lf-glos-pop';
        pop.innerHTML='<strong>'+esc(g.dataset.w)+':</strong> '+esc(def);
        var blk=g.closest('.lf-bloque,.lf-destacado,.lf-lista,li')||g.parentNode;
        blk.parentNode.insertBefore(pop,blk.nextSibling);
        g._pop=pop;g.setAttribute('aria-expanded','true');announce(g.dataset.w+': '+def);
        return;
      }
      if(e.target.closest('[data-lf-audio]')){speak();}
    });
    /* navegación: re-inyectar (auto-reparable) tras que el motor de vistas asiente la sección */
    window.addEventListener('hashchange',function(){stopAudio();if(on()&&DATA)setTimeout(function(){decorateAdapted();maybeFallback();},300);});
  }

  /* ── carga del JSON con manejo de error (nunca pantalla rota) ── */
  function load(cb){
    fetch(JSON_URL).then(function(r){if(!r.ok)throw 0;return r.json();}).then(function(d){DATA=d;cb&&cb();})
      .catch(function(){loadError=true;cb&&cb();});
  }

  function init(){
    /* región de anuncios para lectores de pantalla */
    if(!document.getElementById('lfLive')){
      var live=document.createElement('div');live.id='lfLive';live.className='lf-sr-live';
      live.setAttribute('aria-live','polite');live.setAttribute('role','status');document.body.appendChild(live);
    }
    wire();
    var wanted=false;try{wanted=localStorage.getItem(KEY)==='1';}catch(e){}
    load(function(){ if(wanted)enable(); else syncToggle(false); });
  }
  if(document.readyState!=='loading')init();else document.addEventListener('DOMContentLoaded',init);
})();
