/* ═══════════════════════════════════════════════════════════════════════════
   SISTEMA GRÁFICO TERRITORIAL · PLADECO Rengo 2025-2035 · montaje de piezas
   (rama revision-editorial · versión revisable, NO PUBLICADA)

   Monta, sobre el marcado existente y sin alterar datos ni navegación, las piezas del paquete
   gráfico piloto. Cada pieza es idempotente (no se duplica si el montaje se repite) y degrada con
   elegancia: si falta un recurso, se omite la pieza y el contenido original sigue en su sitio.
   ═══════════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var BASE = 'graficos/';
  function esc(t) { var d = document.createElement('div'); d.textContent = t == null ? '' : String(t); return d.innerHTML; }
  function limpio(t) { return String(t || '').replace(/\s+/g, ' ').trim(); }
  /* Quita emojis de nombres heredados (p. ej. el título de una sección) para que el enlace de la apertura sea solo texto. */
  var PICTO = null;
  try { PICTO = new RegExp('[\\p{Extended_Pictographic}\\uFE0F\\u200D]', 'gu'); } catch (e) {}
  function sinPictogramas(t) { return limpio(PICTO ? String(t || '').replace(PICTO, '') : t); }

  /* SVG en línea (para que tome los colores del tema). Se quitan <title>/<desc> y sus id para no
     duplicar identificadores al insertar dos variantes; el nombre accesible va en aria-label. */
  var cacheSvg = {};
  function svgEnLinea(nombre) {
    if (!cacheSvg[nombre]) {
      cacheSvg[nombre] = fetch(BASE + nombre).then(function (r) {
        if (!r.ok) throw new Error(nombre + ' ' + r.status);
        return r.text();
      }).then(function (txt) {
        var desc = (txt.match(/<desc[^>]*>([\s\S]*?)<\/desc>/) || [])[1] || '';
        txt = txt.replace(/<title[^>]*>[\s\S]*?<\/title>/, '').replace(/<desc[^>]*>[\s\S]*?<\/desc>/, '')
          .replace(/\saria-labelledby="[^"]*"/, '');
        return { svg: txt, desc: limpio(desc) };
      });
    }
    return cacheSvg[nombre];
  }

  /* ─────────────────────────────────────────────────────────────────────────
     1 · APERTURAS DE CAPÍTULO
     Lee lo que ya existe: número romano (data-cap), título y bajada (texto de la etiqueta,
     separados por « · »), introducción (.cap-sub), parte a la que pertenece (divisor .macro-divider
     anterior) y cantidad de secciones (window.PV.chapters). No redacta texto nuevo. */
  var PIEZAS = {
    'capitulo-2': {
      tipo: 'panoramica',
      escritorio: 'panoramica-rengo.svg',
      movil: 'panoramica-rengo-movil.svg',
      pie: '<strong>Ilustración territorial.</strong> Composición simplificada a partir de la fotografía aérea de Rengo hacia la cordillera (archivo del proceso PLADECO). No es un mapa ni un registro fotográfico: el relieve tiene una exageración vertical de 1,6 veces.'
    }
  };
  var PARTES = { 'macro-introduccion': 1, 'macro-diagnostico': 2, 'macro-planificacion': 3, 'macro-cierre': 4 };

  function parteDe(div) {
    var n = div.previousElementSibling;
    while (n) {
      if (n.classList && n.classList.contains('macro-divider')) return n;
      n = n.previousElementSibling;
    }
    return null;
  }

  function montarApertura(div) {
    if (div.querySelector('.sg-apertura')) return;
    var lbl = div.querySelector('.group-divider-label');
    if (!lbl) return;
    var romano = lbl.getAttribute('data-cap') || '';
    var sub = lbl.querySelector('.cap-sub');
    var intro = sub ? limpio(sub.textContent) : '';
    var copia = lbl.cloneNode(true);
    var s2 = copia.querySelector('.cap-sub'); if (s2) s2.parentNode.removeChild(s2);
    var nombre = limpio(copia.textContent);
    var partesNombre = nombre.split(' · ');
    var titulo = partesNombre.shift();
    var bajada = partesNombre.join(' · ');

    var macro = parteDe(div);
    var nParte = macro ? PARTES[macro.id] : 0;
    var etiquetaParte = '';
    if (macro) {
      var lab = macro.querySelector('.macro-divider-label');
      etiquetaParte = lab ? limpio(lab.textContent).replace(/\s*\/\s*0?4\s*/, ' ') : '';
    }

    var cap = null;
    try { (window.PV && PV.chapters || []).forEach(function (c) { if (c.id === div.id) cap = c; }); } catch (e) {}
    var meta = '';
    if (cap && cap.units && cap.units.length) {
      var u0 = cap.units[0];
      meta = cap.units.length + (cap.units.length === 1 ? ' sección' : ' secciones') +
        ' · <a href="#' + esc(u0.id) + '">Empezar por «' + esc(sinPictogramas(u0.name)) + '»</a>';
    }

    var pieza = PIEZAS[div.id];
    var h = '<header class="sg-apertura" data-pieza="' + (pieza ? pieza.tipo : 'ninguna') + '"' +
      (nParte ? ' style="--sg-acento:var(--sg-parte-' + nParte + ')"' : '') + '>' +
      '<div class="sg-ap-texto">' +
      '<p class="sg-ap-orientacion"><span class="sg-ap-num">Capítulo ' + esc(romano) + '</span>' +
      (etiquetaParte ? '<span class="sg-ap-parte">' + esc(etiquetaParte) + '</span>' : '') + '</p>' +
      '<div class="sg-ap-encabezado"><h2 class="sg-ap-titulo">' + esc(titulo) + '</h2>' +
      (bajada ? '<p class="sg-ap-bajada">' + esc(bajada) + '</p>' : '') + '</div>' +
      '<div class="sg-ap-resumen">' + (intro ? '<p class="sg-ap-intro">' + esc(intro) + '</p>' : '') +
      (meta ? '<p class="sg-ap-meta">' + meta + '</p>' : '') + '</div>' +
      '</div>' +
      (pieza ? '<figure class="sg-ap-pieza"><div class="sg-ap-lienzo" data-cargando="1"></div><figcaption class="sg-pie">' + pieza.pie + '</figcaption></figure>' : '') +
      '</header>';

    div.insertAdjacentHTML('beforeend', h);
    lbl.hidden = true;
    div.classList.add('sg-con-apertura');

    if (pieza && pieza.tipo === 'panoramica') {
      var lienzo = div.querySelector('.sg-ap-lienzo');
      Promise.all([svgEnLinea(pieza.escritorio), svgEnLinea(pieza.movil)]).then(function (r) {
        lienzo.innerHTML = r[0].svg.replace('<svg ', '<svg class="sg-escritorio" role="img" aria-label="' + esc(r[0].desc) + '" ') +
          r[1].svg.replace('<svg ', '<svg class="sg-movil" role="img" aria-label="' + esc(r[1].desc) + '" ');
        lienzo.removeAttribute('data-cargando');
      }).catch(function () {
        /* sin la ilustración, la apertura queda tipográfica y el pie ya no aplica */
        var fig = lienzo.closest('figure'); if (fig) fig.parentNode.removeChild(fig);
        var ap = div.querySelector('.sg-apertura'); if (ap) ap.setAttribute('data-pieza', 'ninguna');
      });
    }
  }

  function montarAperturas() {
    var divs = document.querySelectorAll('#main-content > .group-divider[id^="capitulo-"]');
    for (var i = 0; i < divs.length; i++) { try { montarApertura(divs[i]); } catch (e) {} }
  }

  /* ─────────────────────────────────────────────────────────────────────────
     2 · ICONOS DE LOS EJES en las referencias de la matriz
     Las tarjetas de «Seis ejes ordenan el plan» ya usan los símbolos desde su propio código.
     Aquí se agregan a los rótulos «Eje N» de la tabla de la Matriz Estratégica y a los filtros de
     la lista de acciones, que hoy decían solo «Eje 1»…«Eje 6» sin nombre. El nombre corto sale de
     EJES (el registro del portal); no se escribe a mano. */
  function nombreCorto(n) {
    try { for (var i = 0; i < EJES.length; i++) if (String(EJES[i].id) === String(n)) return EJES[i].short || ''; } catch (e) {}
    return '';
  }
  function icono(n) {
    return '<svg class="sg-ico-eje" aria-hidden="true" focusable="false" viewBox="0 0 24 24"><use href="#ico-eje-' + n + '"></use></svg>';
  }
  function montarIconosEjes() {
    if (!document.getElementById('ico-eje-1')) return;
    var rotulos = document.querySelectorAll('.me-etag');
    for (var i = 0; i < rotulos.length; i++) {
      var el = rotulos[i];
      if (el.querySelector('.sg-ico-eje')) continue;
      var m = limpio(el.textContent).match(/^Eje\s*([1-6])$/);
      if (m) el.insertAdjacentHTML('afterbegin', icono(m[1]));
    }
    var filtros = document.querySelectorAll('.pol-filter[data-eje]');
    for (var j = 0; j < filtros.length; j++) {
      var b = filtros[j], n = b.getAttribute('data-eje');
      if (!/^[1-6]$/.test(n) || b.querySelector('.sg-ico-eje')) continue;
      var corto = nombreCorto(n);
      b.innerHTML = icono(n) + '<span>Eje ' + n + '</span>' + (corto ? '<span class="sg-pf-nombre"> · ' + esc(corto) + '</span>' : '');
      if (corto) b.setAttribute('title', 'Eje ' + n + ' · ' + corto);
    }
  }

  /* ─────────────────────────────────────────────────────────────────────────
     3 · LÁMINAS DE INDICADORES
     Composición reutilizable: título informativo, cifra principal, gráfico sencillo dibujado desde
     los datos del portal (sg-graficos.js), lectura breve y ficha con fuente, unidad, período y tipo
     de dato. Los textos que llevan cifras se ARMAN con los valores leídos: si el dato cambia en el
     portal, cambia la lámina. Si falta una variable, la lámina no se monta. */
  var F = function (n, d) { return window.sgGraficos ? sgGraficos.formato(n, d) : String(n); };
  function pct(n) { return F(n, 0) + '%'; }
  var LAMINAS = [
    {
      id: 'lamina-poblacion', seccion: 'proyeccion-poblacion', tema: 'Población',
      datos: function () {
        if (typeof PROY_CENSOS === 'undefined' || typeof PROY_MEDIO === 'undefined') return null;
        var c = PROY_CENSOS, u = c[c.length - 1], p = c[0], k = PROY_ANIOS.length - 1;
        return { c: c, u: u, p: p, k: k, crec: Math.round((u.y - p.y) / p.y * 100) };
      },
      titulo: function (d) { return 'La población censada de Rengo creció ' + d.crec + '% entre ' + d.p.x + ' y ' + d.u.x; },
      cifra: function (d) { return { num: F(d.u.y), txt: 'habitantes censados en ' + d.u.x }; },
      grafico: function (d) {
        return { tipo: 'linea', cfg: {
          serie: d.c.map(function (x) { return { x: x.x, y: x.y, tipo: 'observado' }; }),
          proyeccion: { x: PROY_ANIOS, medio: PROY_MEDIO, bajo: PROY_BAJO, alto: PROY_ALTO },
          marca: { x: d.u.x, texto: 'último censo' },
          xTicks: [d.c[0].x, d.c[1].x, d.u.x, PROY_ANIOS[d.k]],
          descripcion: 'Población de Rengo según los censos ' + d.c.map(function (x) { return x.x + ': ' + F(x.y); }).join('; ') +
            '. Proyección ' + PROY_ANIOS[d.k] + ': escenario medio ' + F(PROY_MEDIO[d.k]) + ', rango ' + F(PROY_BAJO[d.k]) + ' a ' + F(PROY_ALTO[d.k]) + '.'
        } };
      },
      lectura: function (d) {
        return 'La población censada pasó de ' + F(d.c[0].y) + ' habitantes en ' + d.c[0].x + ' a ' + F(d.c[1].y) + ' en ' + d.c[1].x +
          ' y ' + F(d.u.y) + ' en ' + d.u.x + '. Para ' + PROY_ANIOS[d.k] + ', el escenario medio del modelo PLADECO proyecta ' + F(PROY_MEDIO[d.k]) +
          ', en un rango de ' + F(PROY_BAJO[d.k]) + ' a ' + F(PROY_ALTO[d.k]) + '.';
      },
      leyenda: [['obs', 'Censo (dato observado)'], ['est', 'Proyección, escenario medio'], ['banda', 'Rango entre escenarios bajo y alto']],
      ficha: [
        ['Fuente', 'INE, Censos de Población y Vivienda 2002, 2017 y 2024. Proyección: modelo del equipo PLADECO con cinco métodos (Investigación Demográfica Rengo 2024-2035).'],
        ['Unidad', 'Habitantes'], ['Período', '2002-2024 observado; 2025-2035 proyectado'], ['Territorio', 'Comuna de Rengo'],
        ['Tipo de dato', 'Observado (censos) y proyectado (modelo). El eje vertical no parte en cero.']
      ],
      tabla: function (d) {
        return [['Año', 'Habitantes', 'Tipo']].concat(d.c.map(function (x) { return [x.x, F(x.y), 'Censo']; }))
          .concat([[PROY_ANIOS[d.k], F(PROY_MEDIO[d.k]) + ' (' + F(PROY_BAJO[d.k]) + ' a ' + F(PROY_ALTO[d.k]) + ')', 'Proyección: escenario medio (rango)']]);
      }
    },
    {
      id: 'lamina-ipsb', seccion: 'censo', tema: 'Servicios básicos',
      datos: function () {
        if (typeof ANEST_BRECHA === 'undefined') return null;
        var u = null, r = null, b = null;
        ANEST_BRECHA.forEach(function (x) { if (x.tag === 'urbano') u = x; if (x.tag === 'rural') r = x; if (x.tag === 'brecha') b = x; });
        if (!u || !r || !b) return null;
        var pesos = [];
        try { ANEST_METODO.forEach(function (m) { if (m.idx === 'IPSB') pesos.push(m.comp.toLowerCase() + ' (' + m.p + ')'); }); } catch (e) {}
        return { u: u, r: r, b: b, pesos: pesos };
      },
      titulo: function (d) { return 'En el área rural, la precariedad de servicios básicos es ' + F(d.b.ipsb, 2) + ' veces la urbana'; },
      cifra: function (d) { return { num: F(d.r.ipsb, 3), txt: 'índice rural, frente a ' + F(d.u.ipsb, 3) + ' en el área urbana' }; },
      grafico: function (d) {
        return { tipo: 'barras', cfg: {
          datos: [{ rotulo: 'Área rural', v: d.r.ipsb, destacado: true }, { rotulo: 'Área urbana', v: d.u.ipsb }],
          maximo: 1, decimales: 3, decimalesEje: 1,
          descripcion: 'Índice de precariedad de servicios básicos: área rural ' + F(d.r.ipsb, 3) + ', área urbana ' + F(d.u.ipsb, 3) + ', en una escala de 0 a 1.'
        } };
      },
      lectura: function (d) {
        return 'El índice marca ' + F(d.r.ipsb, 3) + ' en el área rural (' + F(d.r.pob) + ' habitantes) y ' + F(d.u.ipsb, 3) + ' en la urbana (' + F(d.u.pob) + ').' +
          (d.pesos.length ? ' Combina ' + d.pesos.slice(0, -1).join(', ') + ' y ' + d.pesos[d.pesos.length - 1] + '.' : '');
      },
      leyenda: [['dest', 'Área rural'], ['base', 'Área urbana']],
      ficha: [
        ['Fuente', 'Elaboración propia del equipo PLADECO con datos del INE, Censo de Población y Vivienda 2024 (cálculo sobre 826 manzanas).'],
        ['Unidad', 'Índice de 0 a 1: a mayor valor, mayor precariedad. No es un porcentaje.'], ['Período', 'Censo 2024'],
        ['Territorio', 'Áreas urbana y rural de la comuna'], ['Tipo de dato', 'Índice calculado. La escala del gráfico va de 0 a 1.']
      ],
      tabla: function (d) { return [['Área', 'Índice', 'Habitantes'], ['Rural', F(d.r.ipsb, 3), F(d.r.pob)], ['Urbana', F(d.u.ipsb, 3), F(d.u.pob)]]; }
    },
    {
      id: 'lamina-meta-psicologico', seccion: 'semaforo', tema: 'Metas del plan',
      datos: function () {
        if (typeof METAS_SEG === 'undefined') return null;
        var m = null; METAS_SEG.forEach(function (x) { if (x.id === 2) m = x; });
        return m && m.lb != null ? { m: m } : null;
      },
      titulo: function (d) { return 'Un ' + pct(d.m.lb) + ' de niñas, niños y adolescentes encuestados accede a apoyo psicológico; la meta a 2035 es ' + pct(d.m.m35); },
      cifra: function (d) { return { num: pct(d.m.lb), txt: 'línea base, sin medición posterior' }; },
      grafico: function (d) {
        return { tipo: 'columnas', cfg: {
          datos: [{ rotulo: 'Línea base\n(encuesta 2025)', v: d.m.lb, tipo: 'observado' }, { rotulo: 'Medición\nposterior', v: null, tipo: 'pendiente' },
            { rotulo: 'Meta\n2028', v: d.m.m28, tipo: 'meta' }, { rotulo: 'Meta\n2035', v: d.m.m35, tipo: 'meta' }],
          maximo: 100, sufijo: '%',
          descripcion: 'Acceso a apoyo psicológico: línea base ' + pct(d.m.lb) + '; medición posterior sin dato; meta 2028 ' + pct(d.m.m28) + '; meta 2035 ' + pct(d.m.m35) + '.'
        } };
      },
      lectura: function (d) {
        return 'Según la encuesta a 4.036 niñas, niños y adolescentes de 27 establecimientos, ' + pct(d.m.lb) + ' tiene acceso a apoyo psicológico. El Semáforo de Metas fija ' +
          pct(d.m.m28) + ' para 2028 y ' + pct(d.m.m35) + ' para 2035; aún no hay una medición posterior.';
      },
      leyenda: [['obs', 'Dato observado'], ['meta', 'Meta del plan'], ['pend', 'Sin medición']],
      ficha: [
        ['Fuente', 'Diagnóstico Comunal Infancia 2025: encuesta en 27 establecimientos, 4.036 respuestas. Metas: Semáforo de Metas del PLADECO.'],
        ['Unidad', 'Porcentaje de estudiantes encuestados'], ['Período', 'Línea base 2025 (el Semáforo la rotula «2024»: diferencia registrada); metas 2028 y 2035'],
        ['Territorio', 'Comuna de Rengo'], ['Tipo de dato', 'Observado y meta. Las metas no son avances.']
      ],
      tabla: function (d) { return [['Momento', 'Valor', 'Tipo'], ['Línea base', pct(d.m.lb), 'Observado'], ['Medición posterior', 'Sin dato', 'Pendiente'], ['2028', pct(d.m.m28), 'Meta'], ['2035', pct(d.m.m35), 'Meta']]; }
    }
  ];

  function montarLamina(L) {
    if (document.getElementById(L.id)) return;
    var sec = document.getElementById(L.seccion); if (!sec || !window.sgGraficos) return;
    var d = null; try { d = L.datos(); } catch (e) { d = null; }
    if (!d) return;
    var c = L.cifra(d), g = L.grafico(d), tb = L.tabla(d);
    var h = '<article class="sg-lamina" id="' + L.id + '" aria-labelledby="' + L.id + '-t">' +
      '<p class="sg-lam-tema">Lámina de indicador · ' + esc(L.tema) + '</p>' +
      '<h3 class="sg-lam-titulo" id="' + L.id + '-t">' + esc(L.titulo(d)) + '</h3>' +
      '<div class="sg-lam-cuerpo">' +
      '<p class="sg-lam-cifra"><span class="sg-lam-num">' + esc(c.num) + '</span><span class="sg-lam-txt">' + esc(c.txt) + '</span></p>' +
      '<p class="sg-lam-lectura">' + esc(L.lectura(d)) + '</p>' +
      '<figure class="sg-lam-grafico"><div class="sg-lam-lienzo"></div>' +
      '<figcaption class="sg-lam-leyenda">' + L.leyenda.map(function (x) { return '<span class="sg-ley sg-ley-' + x[0] + '">' + esc(x[1]) + '</span>'; }).join('') + '</figcaption></figure>' +
      '</div>' +
      '<dl class="sg-lam-ficha">' + L.ficha.map(function (f) { return '<div><dt>' + esc(f[0]) + '</dt><dd>' + esc(f[1]) + '</dd></div>'; }).join('') + '</dl>' +
      '<details class="sg-lam-datos"><summary>Ver los datos en una tabla</summary><table><thead><tr>' +
      tb[0].map(function (x) { return '<th scope="col">' + esc(x) + '</th>'; }).join('') + '</tr></thead><tbody>' +
      tb.slice(1).map(function (r) { return '<tr>' + r.map(function (x, i) { return i ? '<td>' + esc(x) + '</td>' : '<th scope="row">' + esc(x) + '</th>'; }).join('') + '</tr>'; }).join('') +
      '</tbody></table></details>' +
      '</article>';
    var cab = sec.querySelector(':scope > .sec-header');
    if (cab) cab.insertAdjacentHTML('afterend', h); else sec.insertAdjacentHTML('afterbegin', h);
    var art = document.getElementById(L.id);
    var lienzo = art.querySelector('.sg-lam-lienzo');
    function pintar() { if (lienzo.clientWidth > 0 && !lienzo.firstChild) sgGraficos.dibujar(lienzo, g.tipo, g.cfg); }
    pintar();
    /* las secciones ocultas por el motor de vistas no tienen ancho: se dibuja al mostrarse */
    if (!lienzo.firstChild && 'ResizeObserver' in window) {
      var ro = new ResizeObserver(function () { if (lienzo.clientWidth > 0) { pintar(); if (lienzo.firstChild) ro.disconnect(); } });
      ro.observe(lienzo);
    }
  }
  function montarLaminas() { LAMINAS.forEach(function (L) { try { montarLamina(L); } catch (e) {} }); }

  /* ─────────────────────────────────────────────────────────────────────────
     4 · FICHA TERRITORIAL VISUAL
     Textos y procedencia en window.FICHAS_TERRITORIALES (bloque de datos en index.html). Lo que existe
     en las estructuras del portal se lee aquí: población censal de la localidad y posición
     (CENSO_LOCALIDADES_GEO), índice de vulnerabilidad (ANEST_URBANAS), espacios catastrados
     (ICT_ESPACIOS) y acciones (_POL y accionesPOA). Mapa y fotografía van juntos, sin recuadros. */
  var PLAZO = { C: 'plazo corto', M: 'plazo mediano', L: 'plazo largo' };
  function localidad(nombre) {
    try { for (var i = 0; i < CENSO_LOCALIDADES_GEO.length; i++) if (CENSO_LOCALIDADES_GEO[i].loc === nombre) return CENSO_LOCALIDADES_GEO[i]; } catch (e) {}
    return null;
  }
  function montarFicha(f) {
    if (document.getElementById(f.id)) return;
    var sec = document.getElementById(f.seccion); if (!sec || !window.sgGraficos) return;
    var loc = localidad(f.localidadCenso), ref = localidad(f.referencia);
    if (!loc) return;
    var icp = null;
    try { ANEST_URBANAS.forEach(function (x) { if (x.loc === f.localidadCenso) icp = x.icp; }); } catch (e) {}
    var patron = new RegExp(f.catastroPatron, 'i'), esp = [], estados = {};
    try { ICT_ESPACIOS.forEach(function (e) { if (patron.test(e.nombre)) { esp.push(e); estados[e.estado] = (estados[e.estado] || 0) + 1; } }); } catch (e) {}
    var acciones = [];
    try {
      f.acciones.forEach(function (n) {
        var p = null; for (var i = 0; i < _POL.length; i++) if (_POL[i][0] === n) { p = _POL[i]; break; }
        if (p) acciones.push({ n: n, eje: p[1], oe: p[2], nombre: p[5], plazo: PLAZO[p[12]] || '', resp: p[13] });
      });
    } catch (e) {}
    var conAvance = 0;
    try { (window.accionesPOA || []).forEach(function (a) { if (f.acciones.indexOf(a.id) >= 0 && a.avance > 0) conAvance++; }); } catch (e) {}
    var orden = ['Excelente', 'Bueno', 'Regular', 'Deficiente', 'Crítico'];
    var resumenEstados = orden.filter(function (k) { return estados[k]; }).map(function (k) { return estados[k] + ' en estado ' + k.toLowerCase(); });
    var fo = f.foto;

    var h = '<article class="sg-ficha" id="' + esc(f.id) + '" aria-labelledby="' + esc(f.id) + '-t">' +
      '<header class="sg-fi-cab">' +
      '<p class="sg-fi-tipo">' + esc(f.tipo) + '</p>' +
      '<h3 class="sg-fi-nombre" id="' + esc(f.id) + '-t">' + esc(f.nombre) + '</h3>' +
      '<p class="sg-fi-escalas">' + esc(f.escalas) + '</p>' +
      '<p class="sg-fi-porque">' + esc(f.porQue) + '</p>' +
      '</header>' +
      '<div class="sg-fi-rejilla">' +
      '<div class="sg-fi-principal"><p class="sg-fi-cifra"><span class="sg-fi-num">' + esc(F(loc.pob)) + '</span>' +
      '<span class="sg-fi-txt">habitantes en la localidad censal de ' + esc(f.nombre) + ', Censo 2024</span></p></div>' +
      '<figure class="sg-fi-foto"><picture><source srcset="' + esc(fo.webp) + '" type="image/webp">' +
      '<img src="' + esc(fo.jpg) + '" width="' + fo.ancho + '" height="' + fo.alto + '" alt="' + esc(fo.alt) + '" loading="lazy" decoding="async"></picture>' +
      '<figcaption class="sg-pie">' + esc(fo.pie) + '</figcaption></figure>' +
      '<figure class="sg-fi-mapa"><div class="sg-fi-loc"></div>' +
      '<figcaption class="sg-pie">Posición referencial: centro de la localidad según el portal. Contorno comunal de OpenStreetMap, referencial: no es el límite oficial, y no se dibujan límites de unidad vecinal ni de distrito.</figcaption></figure>' +
      '<dl class="sg-fi-ind">' +
      (esp.length ? '<div><dt>Espacios públicos catastrados con su nombre</dt><dd><b>' + esp.length + '</b>: ' + esc(resumenEstados.join(', ')) + '.<span>Catastro SECPLAC de espacios públicos, abril de 2026.</span></dd></div>' : '') +
      (icp != null ? '<div><dt>Índice de vulnerabilidad (ICP)</dt><dd><b>' + esc(F(icp, 3)) + '</b> en una escala de 0 a 1: a mayor valor, mayor vulnerabilidad.<span>Análisis estratégico del Censo 2024, equipo PLADECO. Otra estructura del portal muestra 0,182 para Rosario: <a href="#dpv-icp-localidades-fuente">diferencia registrada</a>.</span></dd></div>' : '') +
      '</dl>' +
      '<div class="sg-fi-desafios" role="group" aria-labelledby="' + esc(f.id) + '-d"><h4 id="' + esc(f.id) + '-d">Desafíos documentados</h4><ul>' +
      f.desafios.map(function (d) {
        return '<li>' + esc(d.texto) + '<span class="sg-fi-fuente">' + (d.enlace ? '<a href="' + esc(d.enlace) + '" target="_blank" rel="noopener">' + esc(d.fuente) + '</a>' : esc(d.fuente)) + '</span></li>';
      }).join('') + '</ul></div>' +
      '<div class="sg-fi-acciones" role="group" aria-labelledby="' + esc(f.id) + '-a"><h4 id="' + esc(f.id) + '-a">Acciones del plan que nombran a ' + esc(f.nombre) + '</h4><ol>' +
      acciones.map(function (a) {
        return '<li><a href="#matriz/eje' + a.eje + '"><span class="sg-fi-an">N.º ' + a.n + '</span> ' + esc(a.nombre) + '</a>' +
          '<span class="sg-fi-meta"><svg class="sg-ico-eje" aria-hidden="true" focusable="false" viewBox="0 0 24 24"><use href="#ico-eje-' + a.eje + '"></use></svg>Eje ' + a.eje + ' · ' + esc(a.oe) + ' · ' + esc(a.plazo) + '</span></li>';
      }).join('') + '</ol>' +
      '<p class="sg-pie">El vínculo sale del texto de cada acción: la matriz no tiene un campo de localización. Otras ' + f.accionesCompartidas.length +
      ' acciones nombran a ' + esc(f.nombre) + ' junto a otros lugares. ' + (conAvance ? conAvance + ' registran avance en el Plan Operativo Anual.' : 'Ninguna registra avance en el Plan Operativo Anual.') + '</p>' +
      '</div>' +
      '</div>' +
      '<footer class="sg-fi-fuentes"><p class="sg-pie"><strong>Fuentes.</strong> ' + f.fuentes.map(esc).join(' ') + '</p></footer>' +
      '</article>';

    var destino = document.getElementById('etFicha');
    if (destino && destino.parentNode === sec) destino.insertAdjacentHTML('afterend', h);
    else { var pie = sec.querySelector(':scope > .sec-fuente'); if (pie) pie.insertAdjacentHTML('beforebegin', h); else sec.insertAdjacentHTML('beforeend', h); }

    var art = document.getElementById(f.id), cont = art.querySelector('.sg-fi-loc');
    var puntos = [{ lat: +loc.lat, lng: +loc.lng, rotulo: f.nombre, destacado: true }];
    if (ref) puntos.push({ lat: +ref.lat, lng: +ref.lng, rotulo: f.referencia });
    function pintarMapa() {
      if (cont.clientWidth > 0 && !cont.firstChild) {
        sgGraficos.localizador(cont, { puntos: puntos, descripcion: 'Localizador: posición referencial de ' + f.nombre + ' dentro del contorno de la comuna de Rengo, con ' + f.referencia + ' como referencia, norte y escala de 10 km.' })
          .catch(function () { var fig = cont.closest('figure'); if (fig) fig.parentNode.removeChild(fig); });
      }
    }
    pintarMapa();
    if (!cont.firstChild && 'ResizeObserver' in window) {
      var ro = new ResizeObserver(function () { if (cont.clientWidth > 0) { pintarMapa(); ro.disconnect(); } });
      ro.observe(cont);
    }
  }
  function montarFichas() {
    var F0 = window.FICHAS_TERRITORIALES; if (!F0) return;
    Object.keys(F0).forEach(function (k) { try { montarFicha(F0[k]); } catch (e) {} });
  }

  /* ─────────────────────────────────────────────────────────────────────────
     5 · FOTOGRAFÍA ANOTADA
     Marcas numeradas sobre la fotografía; cada una remite a una observación del informe municipal.
     En pantallas anchas las notas van al costado; en móvil, debajo de la imagen. Las marcas son
     decorativas para lectores de pantalla (aria-hidden): la lista numerada lleva la información. */
  function montarFotoAnotada(a) {
    if (document.getElementById(a.id)) return;
    var sec = document.getElementById(a.seccion); if (!sec) return;
    var h = '<figure class="sg-foto-anotada" id="' + esc(a.id) + '" aria-labelledby="' + esc(a.id) + '-t">' +
      '<p class="sg-fa-tema">Fotografía anotada</p>' +
      '<h3 class="sg-fa-titulo" id="' + esc(a.id) + '-t">' + esc(a.titulo) + '</h3>' +
      '<div class="sg-fa-cuerpo">' +
      '<div class="sg-fa-lienzo" style="aspect-ratio:' + a.ancho + ' / ' + a.alto + '">' +
      '<picture><source srcset="' + esc(a.webp) + '" type="image/webp"><img src="' + esc(a.jpg) + '" width="' + a.ancho + '" height="' + a.alto + '" alt="' + esc(a.alt) + '" loading="lazy" decoding="async"></picture>' +
      '<ol class="sg-fa-marcas" aria-hidden="true">' + a.marcas.map(function (m) {
        return '<li style="left:' + m.x + '%;top:' + m.y + '%"><span>' + m.n + '</span></li>';
      }).join('') + '</ol></div>' +
      '<div class="sg-fa-notas"><ol>' + a.marcas.map(function (m) {
        return '<li><span class="sg-fa-n" aria-hidden="true">' + m.n + '</span><span><b>' + esc(m.rotulo) + '.</b> ' + esc(m.texto) + '</span></li>';
      }).join('') + '</ol>' +
      '<p class="sg-fa-lectura">' + esc(a.lectura) + '</p>' +
      '<p class="sg-pie">' + esc(a.nota) + '</p></div>' +
      '</div>' +
      '<figcaption class="sg-pie sg-fa-pie"><strong>' + esc(a.lugar) + '</strong> · ' + esc(a.fecha) + '. ' + esc(a.procedencia) + ' ' + esc(a.coordenada) + '</figcaption>' +
      '</figure>';
    var cab = sec.querySelector(':scope > .sec-header');
    if (cab) cab.insertAdjacentHTML('afterend', h); else sec.insertAdjacentHTML('afterbegin', h);
  }
  function montarFotosAnotadas() {
    var A = window.FOTOS_ANOTADAS; if (!A) return;
    Object.keys(A).forEach(function (k) { try { montarFotoAnotada(A[k]); } catch (e) {} });
  }

  /* ─────────────────────────────────────────────────────────────────────────
     6 · DIAGRAMA DE DIAGNÓSTICO Y RESPUESTA
     Cuatro columnas en escritorio y lectura vertical en móvil. Pocos nodos y etiquetas breves.
     Conector continuo = vínculo explícito en los datos; discontinuo = pendiente de validación.
     Nombres de eje y de acciones, objetivos y conteo del catastro se leen del portal. */
  function montarDiagrama(c) {
    if (document.getElementById(c.id)) return true;
    var sec = document.getElementById(c.seccion); if (!sec) return false;
    var ancla = sec.querySelector('.ini-wrap'); if (!ancla) return false;       /* espera a la ficha de la acción 101 */
    var ejeNom = ''; try { EJES.forEach(function (e) { if (+e.id === c.eje) ejeNom = e.name; }); } catch (e) {}
    var malos = 0, total = 0;
    try { ICT_ESPACIOS.forEach(function (e) { total++; if (/deficiente|cr[ií]tico/i.test(e.estado)) malos++; }); } catch (e) {}
    var acc = [], oes = {};
    try {
      c.acciones.forEach(function (n) {
        for (var i = 0; i < _POL.length; i++) if (_POL[i][0] === n) { acc.push({ n: n, oe: _POL[i][2], nombre: _POL[i][5], eje: _POL[i][1] }); oes[_POL[i][2]] = 1; break; }
      });
    } catch (e) {}
    var avance = 0; try { (window.accionesPOA || []).forEach(function (a) { if (c.acciones.indexOf(a.id) >= 0 && a.avance > 0) avance++; }); } catch (e) {}
    function nodo(t, dato, fuente, enlace, textoEnlace, extra) {
      return '<div class="sg-dg-nodo"><p class="sg-dg-n-t">' + esc(t) + '</p>' + (dato ? '<p class="sg-dg-n-d">' + esc(dato) + '</p>' : '') +
        (fuente ? '<p class="sg-dg-n-f">' + esc(fuente) + '</p>' : '') + (extra || '') +
        (enlace ? '<a class="sg-dg-n-a" href="' + esc(enlace) + '">' + esc(textoEnlace) + '</a>' : '') + '</div>';
    }
    var b = c.brecha;
    var h = '<figure class="sg-diagrama" id="' + esc(c.id) + '" aria-labelledby="' + esc(c.id) + '-t">' +
      '<p class="sg-dg-tema">Del diagnóstico a la respuesta</p>' +
      '<h3 class="sg-dg-titulo" id="' + esc(c.id) + '-t">' + esc(c.titulo) + '</h3>' +
      '<ol class="sg-dg-cols">' +
      '<li class="sg-dg-col sg-dg-brecha"><p class="sg-dg-etapa">Brecha identificada</p>' +
      nodo(b.titulo, b.dato, b.fuente, b.enlace, 'Ver en los desafíos del plan', '<p class="sg-dg-pend"><a href="' + esc(b.registro) + '">' + esc(b.pendiente) + '</a></p>') + '</li>' +
      '<li class="sg-dg-col sg-dg-evidencia" data-vinculo="explicito"><p class="sg-dg-etapa">Evidencia</p>' +
      c.evidencias.map(function (e) {
        var dato = e.dato === 'catastro' ? (total + ' espacios catastrados, ' + malos + ' en estado deficiente o crítico') : e.dato;
        return nodo(e.titulo, dato, e.fuente, e.enlace, e.enlace === '#voz' ? 'Ver la participación' : 'Ver el catastro', e.nota ? '<p class="sg-dg-n-f">' + esc(e.nota) + '</p>' : '');
      }).join('') + '</li>' +
      '<li class="sg-dg-col sg-dg-objetivo" data-vinculo="pendiente"><p class="sg-dg-etapa">Objetivo del plan</p>' +
      nodo('Eje ' + c.eje + (ejeNom ? ' · ' + ejeNom : ''), 'Objetivos de las acciones: ' + Object.keys(oes).sort().join(', '), 'Matriz de acciones del PLADECO', '#matriz/eje' + c.eje, 'Ver el eje en la matriz',
        '<p class="sg-dg-pend">' + esc(c.objetivoPendiente) + '</p>') + '</li>' +
      '<li class="sg-dg-col sg-dg-acciones" data-vinculo="explicito"><p class="sg-dg-etapa">Acciones relacionadas</p><div class="sg-dg-nodo"><ul class="sg-dg-acc">' +
      acc.map(function (a) { return '<li><span class="sg-dg-an">N.º ' + a.n + '</span> ' + esc(a.nombre) + ' <span class="sg-dg-oe">' + esc(a.oe) + '</span></li>'; }).join('') +
      '</ul><p class="sg-dg-n-f">' + esc(c.accionesNota) + ' ' + (avance ? avance + ' registran avance.' : 'Ninguna registra avance en el Plan Operativo Anual.') + '</p>' +
      '<a class="sg-dg-n-a" href="#matriz/eje' + c.eje + '">Ver las acciones del eje</a></div></li>' +
      '</ol>' +
      '<figcaption class="sg-pie"><span class="sg-dg-ley sg-dg-ley-si">Vínculo explícito en los datos</span> <span class="sg-dg-ley sg-dg-ley-no">Pendiente de validación</span> ' +
      'Brecha y evidencia: bloque «Los desafíos que orientan el plan» y sus enlaces. Objetivos y acciones: columnas de eje, objetivo y línea base de la matriz.</figcaption>' +
      '</figure>';
    ancla.insertAdjacentHTML('beforebegin', h);
    return true;
  }
  function montarDiagramas() {
    var D = window.DIAGRAMAS_CASO; if (!D) return;
    Object.keys(D).forEach(function (k) {
      var n = 0;
      (function intentar() { var ok = false; try { ok = montarDiagrama(D[k]); } catch (e) { ok = true; } if (!ok && ++n < 40) setTimeout(intentar, 250); })();
    });
  }

  function montar() {
    montarAperturas();
    montarIconosEjes();
    montarLaminas();
    montarFichas();
    montarFotosAnotadas();
    montarDiagramas();
  }
  window.sistemaGrafico = { montar: montar };

  function cuandoPV(fn, intentos) {
    if (window.PV && PV.chapters) return fn();
    if ((intentos || 0) > 60) return fn();
    setTimeout(function () { cuandoPV(fn, (intentos || 0) + 1); }, 100);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { cuandoPV(montar); });
  else cuandoPV(montar);
})();
