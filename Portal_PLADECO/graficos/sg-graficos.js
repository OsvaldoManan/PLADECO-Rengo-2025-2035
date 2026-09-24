/* ═══════════════════════════════════════════════════════════════════════════
   SISTEMA GRÁFICO · motor de gráficos de las láminas de indicadores (SVG, sin dependencias)
   (v45.357)

   Dibuja desde DATOS, nunca desde imágenes: cada lámina entrega sus valores y el motor genera el SVG.
   Criterios comunes a todas las láminas, para que sean comparables entre sí:
     · Observado  → trazo continuo y punto lleno, color de texto.
     · Estimado o proyectado → trazo discontinuo, sin relleno, color de texto secundario; su rango, banda clara.
     · Meta → barra o anillo con contorno en el color de acción del portal y el rótulo «Meta».
     · Pendiente → espacio vacío con contorno punteado y el rótulo «pendiente de medición».
     · Etiquetas directas sobre los datos; tres líneas guía como máximo; sin marco ni sombras.
     · Las barras parten SIEMPRE en cero. Las líneas pueden no hacerlo, y entonces lo declaran.
   El SVG se dibuja con el ancho real del contenedor (1 unidad = 1 px) y se redibuja al cambiar el
   ancho: en móvil la composición se adapta (menos rótulos de eje, márgenes menores) y el texto no
   se encoge.
   ═══════════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  var NS = 'http://www.w3.org/2000/svg';
  function fmt(n, dec) {
    if (n == null || isNaN(n)) return '';
    try { return (+n).toLocaleString('es-CL', { minimumFractionDigits: dec || 0, maximumFractionDigits: dec || 0 }); }
    catch (e) { return String(n); }
  }
  function esc(t) { return String(t == null ? '' : t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function pasoBonito(rango, n) {
    var bruto = rango / Math.max(1, n), mag = Math.pow(10, Math.floor(Math.log10(bruto))), r = bruto / mag;
    return (r < 1.5 ? 1 : r < 3 ? 2 : r < 7 ? 5 : 10) * mag;
  }
  function abrir(W, H, desc) {
    return '<svg xmlns="' + NS + '" viewBox="0 0 ' + W + ' ' + H + '" width="' + W + '" height="' + H + '" class="sg-graf" role="img" aria-label="' + esc(desc) + '">';
  }
  /* Mide el ancho real de un rótulo con la fuente y la clase con que se dibujará. Así los márgenes y
     las posiciones dependen del texto y no de una fuente supuesta. Si no se puede medir, estima. */
  function medidor(cont) {
    var svg = document.createElementNS(NS, 'svg'), cache = {};
    svg.setAttribute('class', 'sg-graf'); svg.setAttribute('aria-hidden', 'true');
    svg.style.cssText = 'position:absolute;visibility:hidden;width:0;height:0;overflow:hidden';
    cont.appendChild(svg);
    return function (texto, clase) {
      var k = clase + '|' + texto;
      if (k in cache) return cache[k];
      var t = document.createElementNS(NS, 'text'), w = 0;
      t.setAttribute('class', clase); t.textContent = texto; svg.appendChild(t);
      try { w = t.getComputedTextLength(); } catch (e) {}
      svg.removeChild(t);
      return (cache[k] = w || String(texto).length * 7.6);
    };
  }
  /* Punto más alto (menor y) de una polilínea [[x,y],…] dentro del tramo horizontal [xa, xb]. */
  function cimaEntre(pts, xa, xb) {
    var cima = Infinity;
    for (var i = 0; i < pts.length - 1; i++) {
      var p = pts[i], q = pts[i + 1], a = Math.max(xa, Math.min(p[0], q[0])), b = Math.min(xb, Math.max(p[0], q[0]));
      if (a > b) continue;
      [a, b].forEach(function (x) { var t = q[0] === p[0] ? 0 : (x - p[0]) / (q[0] - p[0]); cima = Math.min(cima, p[1] + t * (q[1] - p[1])); });
    }
    return cima;
  }

  /* ── LÍNEA · evolución en el tiempo ───────────────────────────────────────
     cfg.serie: [{x, y, tipo:'observado'}]    cfg.proyeccion: {x:[], medio:[], bajo:[], alto:[], rotulo}
     cfg.marca: {x, texto}                    cfg.cero: bool   cfg.descripcion */
  function linea(cont, cfg) {
    var W = Math.max(280, Math.round(cont.clientWidth || 560));
    var movil = W < 520;
    var H = cfg.alto || (movil ? 250 : 270);
    var m = { t: 34, r: movil ? 16 : 24, b: 34, l: movil ? 46 : 58 };
    var ancho = medidor(cont);
    var obs = cfg.serie.filter(function (p) { return p.y != null; });
    var pr = cfg.proyeccion || null;
    var xs = obs.map(function (p) { return p.x; }).concat(pr ? pr.x : []);
    var ys = obs.map(function (p) { return p.y; }).concat(pr ? pr.alto.concat(pr.bajo) : []);
    var x0 = Math.min.apply(null, xs), x1 = Math.max.apply(null, xs);
    var yMin = cfg.cero ? 0 : Math.min.apply(null, ys), yMax = Math.max.apply(null, ys);
    var paso = pasoBonito((yMax - yMin) || yMax, 3);
    var lo = cfg.cero ? 0 : Math.floor(yMin / paso) * paso, hi = Math.ceil(yMax / paso) * paso;
    if (hi === lo) hi = lo + paso;
    // margen izquierdo según el rótulo de eje más ancho
    var anchoEje = 0;
    for (var ge = lo; ge <= hi + 1e-9; ge += paso) anchoEje = Math.max(anchoEje, ancho(fmt(ge, 0), 'sg-eje-t'));
    m.l = Math.max(m.l, Math.ceil(anchoEje) + 12);
    var X = function (v) { return m.l + (v - x0) / ((x1 - x0) || 1) * (W - m.l - m.r); };
    var Y = function (v) { return m.t + (1 - (v - lo) / (hi - lo)) * (H - m.t - m.b); };
    var s = abrir(W, H, cfg.descripcion);
    for (var g = lo; g <= hi + 1e-9; g += paso) {
      var yy = Y(g).toFixed(1);
      s += '<line class="sg-guia" x1="' + m.l + '" x2="' + (W - m.r) + '" y1="' + yy + '" y2="' + yy + '"/>';
      s += '<text class="sg-eje-t" x="' + (m.l - 8) + '" y="' + (+yy + 4) + '" text-anchor="end">' + fmt(g, 0) + '</text>';
    }
    if (!cfg.cero) s += '<text class="sg-eje-nota" x="0" y="' + (m.t - 18) + '">eje sin cero</text>';
    // trazos que los rótulos de valor no deben tapar
    var trazos = [obs.map(function (p) { return [X(p.x), Y(p.y)]; })];
    if (pr) {
      trazos.push(pr.x.map(function (x, i) { return [X(x), Y(pr.medio[i])]; }));
      trazos.push(pr.x.map(function (x, i) { return [X(x), Y(pr.alto[i])]; }));
      var banda = pr.x.map(function (x, i) { return X(x).toFixed(1) + ',' + Y(pr.alto[i]).toFixed(1); })
        .concat(pr.x.slice().reverse().map(function (x, i) { var j = pr.x.length - 1 - i; return X(x).toFixed(1) + ',' + Y(pr.bajo[j]).toFixed(1); }));
      s += '<polygon class="sg-banda" points="' + banda.join(' ') + '"/>';
      s += '<path class="sg-l-est" d="' + pr.x.map(function (x, i) { return (i ? 'L' : 'M') + X(x).toFixed(1) + ',' + Y(pr.medio[i]).toFixed(1); }).join(' ') + '"/>';
      var k = pr.x.length - 1, xe = X(pr.x[k]);
      // los tres rótulos del extremo, separados al menos una línea entre sí
      var yMed = Y(pr.medio[k]) - 10, yAlto = Math.min(Y(pr.alto[k]) - 8, yMed - 15), yBajo = Math.max(Y(pr.bajo[k]) + 16, Y(pr.medio[k]) + 18);
      s += '<circle class="sg-p-est" cx="' + xe + '" cy="' + Y(pr.medio[k]) + '" r="4"/>';
      s += '<text class="sg-v sg-v-sec" x="' + (xe - 8) + '" y="' + yMed.toFixed(1) + '" text-anchor="end">' + fmt(pr.medio[k]) + '</text>';
      s += '<text class="sg-v-rango" x="' + (xe - 8) + '" y="' + yAlto.toFixed(1) + '" text-anchor="end">' + fmt(pr.alto[k]) + '</text>';
      s += '<text class="sg-v-rango" x="' + (xe - 8) + '" y="' + yBajo.toFixed(1) + '" text-anchor="end">' + fmt(pr.bajo[k]) + '</text>';
    }
    if (cfg.marca) {
      var xm = X(cfg.marca.x).toFixed(1);
      s += '<line class="sg-marca" x1="' + xm + '" x2="' + xm + '" y1="' + (m.t - 6) + '" y2="' + (H - m.b) + '"/>';
      s += '<text class="sg-marca-t" x="' + (+xm + 6) + '" y="' + (m.t - 8) + '">' + esc(cfg.marca.texto) + '</text>';
    }
    if (obs.length > 1) s += '<path class="sg-l-obs" d="' + obs.map(function (p, i) { return (i ? 'L' : 'M') + X(p.x).toFixed(1) + ',' + Y(p.y).toFixed(1); }).join(' ') + '"/>';
    obs.forEach(function (p, i) {
      var cx = X(p.x), cy = Y(p.y), texto = fmt(p.y), w = ancho(texto, 'sg-v');
      var xa = i === 0 ? cx : cx - w / 2, xb = xa + w;
      // el rótulo sube lo necesario para quedar sobre la línea y la banda en todo su ancho
      var cima = Math.min.apply(null, trazos.map(function (t) { return cimaEntre(t, xa - 2, xb + 2); }));
      var base = Math.max(15, Math.min(cy - 11, cima - 6));
      s += '<circle class="sg-p-obs" cx="' + cx.toFixed(1) + '" cy="' + cy + '" r="4"/>';
      s += '<text class="sg-v" x="' + cx.toFixed(1) + '" y="' + base.toFixed(1) + '" text-anchor="' + (i === 0 ? 'start' : 'middle') + '">' + texto + '</text>';
    });
    var ticks = (cfg.xTicks || obs.map(function (p) { return p.x; }).concat(pr ? [pr.x[pr.x.length - 1]] : []));
    ticks.forEach(function (t, i) {
      s += '<text class="sg-x-t" x="' + X(t).toFixed(1) + '" y="' + (H - 10) + '" text-anchor="' + (i === ticks.length - 1 ? 'end' : 'middle') + '">' + esc(t) + '</text>';
    });
    s += '</svg>';
    cont.innerHTML = s;
  }

  /* ── BARRAS horizontales · comparación (desde cero) ────────────────────────
     cfg.datos: [{rotulo, v, destacado}]   cfg.maximo (escala declarada)   cfg.decimales */
  function barras(cont, cfg) {
    var W = Math.max(280, Math.round(cont.clientWidth || 560));
    var movil = W < 520;
    var datos = cfg.datos.slice();
    if (cfg.ordenar) datos.sort(function (a, b) { return b.v - a.v; });
    var med = medidor(cont);
    var d = cfg.decimales || 0, dEje = cfg.decimalesEje != null ? cfg.decimalesEje : d;
    var anchoRot = Math.max.apply(null, datos.map(function (x) { return med(x.rotulo, 'sg-b-rot' + (x.destacado ? ' sg-b-rot-dest' : '')); }));
    var anchoVal = Math.max.apply(null, datos.map(function (x) { return med(fmt(x.v, d), 'sg-v' + (x.destacado ? ' sg-v-dest' : '')); }));
    var fila = movil ? 46 : 44;
    var eti = movil ? 0 : Math.min(Math.round(W * .4), Math.max(Math.min(150, Math.round(W * .24)), Math.ceil(anchoRot) + 2));
    var arriba = movil ? 20 : 0;                      // en móvil el rótulo va sobre la barra
    var H = datos.length * (fila + arriba) + 26;
    var vmax = cfg.maximo || Math.max.apply(null, datos.map(function (x) { return x.v; })) || 1;
    var x0 = eti + (movil ? 0 : 12), ancho = W - x0 - Math.max(movil ? 60 : 72, Math.ceil(anchoVal) + 16);
    var s = abrir(W, H, cfg.descripcion);
    [0, vmax / 2, vmax].forEach(function (g) {
      var xg = x0 + g / vmax * ancho, texto = fmt(g, dEje), wt = med(texto, 'sg-eje-t');
      // el primer y el último rótulo del eje no se salen del dibujo
      var ancla = xg - wt / 2 < 0 ? 'start' : xg + wt / 2 > W ? 'end' : 'middle';
      var xt = ancla === 'start' ? Math.max(0, xg - 2) : ancla === 'end' ? Math.min(W, xg + 2) : xg;
      s += '<line class="sg-guia" x1="' + xg.toFixed(1) + '" x2="' + xg.toFixed(1) + '" y1="4" y2="' + (H - 22) + '"/>';
      s += '<text class="sg-eje-t" x="' + xt.toFixed(1) + '" y="' + (H - 6) + '" text-anchor="' + ancla + '">' + texto + '</text>';
    });
    datos.forEach(function (x, i) {
      var y = 6 + i * (fila + arriba) + arriba, w = Math.max(1, x.v / vmax * ancho);
      var clase = x.destacado ? 'sg-b-dest' : 'sg-b';
      if (movil) s += '<text class="sg-b-rot' + (x.destacado ? ' sg-b-rot-dest' : '') + '" x="0" y="' + (y - 6) + '">' + esc(x.rotulo) + '</text>';
      else s += '<text class="sg-b-rot' + (x.destacado ? ' sg-b-rot-dest' : '') + '" x="' + eti + '" y="' + (y + fila / 2 + 2) + '" text-anchor="end">' + esc(x.rotulo) + '</text>';
      s += '<rect class="' + clase + '" x="' + x0 + '" y="' + (y + 8) + '" width="' + w.toFixed(1) + '" height="' + (fila - 18) + '" rx="2"/>';
      s += '<text class="sg-v' + (x.destacado ? ' sg-v-dest' : '') + '" x="' + (x0 + w + 8).toFixed(1) + '" y="' + (y + fila / 2 + 3) + '">' + fmt(x.v, d) + '</text>';
    });
    s += '</svg>';
    cont.innerHTML = s;
  }

  /* ── COLUMNAS · valor observado frente a metas (desde cero) ────────────────
     cfg.datos: [{rotulo, v, tipo:'observado'|'meta'|'pendiente'}]   cfg.maximo   cfg.sufijo */
  function columnas(cont, cfg) {
    var W = Math.max(280, Math.round(cont.clientWidth || 560));
    var movil = W < 520;
    var med = medidor(cont);
    var m = { t: 30, r: 8, b: movil ? 50 : 44, l: movil ? 34 : 42 };
    var n = cfg.datos.length, vmax = cfg.maximo || 100, suf = cfg.sufijo || '';
    m.l = Math.max(m.l, Math.ceil(Math.max(med(fmt(0) + suf, 'sg-eje-t'), med(fmt(vmax / 2) + suf, 'sg-eje-t'), med(fmt(vmax) + suf, 'sg-eje-t'))) + 10);
    var hueco = (W - m.l - m.r) / n, ancho = Math.min(movil ? 44 : 76, hueco * .56);
    // rótulos bajo cada columna partidos por palabras para que no invadan la columna vecina
    var libre = hueco - 4;
    var rotulos = cfg.datos.map(function (x) {
      var out = [];
      String(x.rotulo).split('\n').forEach(function (linea, j) {
        var clase = j ? 'sg-x-t sg-x-t2' : 'sg-x-t', actual = '';
        linea.split(' ').forEach(function (p) {
          var prueba = actual ? actual + ' ' + p : p;
          if (actual && med(prueba, clase) > libre) { out.push([actual, clase]); actual = p; } else actual = prueba;
        });
        if (actual) out.push([actual, clase]);
      });
      return out;
    });
    var lineasMax = Math.max.apply(null, rotulos.map(function (r) { return r.length; }));
    var bBase = m.b;
    m.b = Math.max(bBase, 18 + (lineasMax - 1) * 15 + 14);
    var H = (cfg.alto || (movil ? 250 : 260)) + (m.b - bBase);
    var Y = function (v) { return m.t + (1 - v / vmax) * (H - m.t - m.b); };
    var s = abrir(W, H, cfg.descripcion);
    [0, vmax / 2, vmax].forEach(function (g) {
      var yg = Y(g).toFixed(1);
      s += '<line class="sg-guia" x1="' + m.l + '" x2="' + (W - m.r) + '" y1="' + yg + '" y2="' + yg + '"/>';
      s += '<text class="sg-eje-t" x="' + (m.l - 6) + '" y="' + (+yg + 4) + '" text-anchor="end">' + fmt(g) + (cfg.sufijo || '') + '</text>';
    });
    cfg.datos.forEach(function (x, i) {
      var cx = m.l + hueco * i + hueco / 2, xb = cx - ancho / 2;
      if (x.tipo === 'pendiente' || x.v == null) {
        s += '<rect class="sg-c-pend" x="' + xb.toFixed(1) + '" y="' + Y(vmax * .35).toFixed(1) + '" width="' + ancho.toFixed(1) + '" height="' + (Y(0) - Y(vmax * .35)).toFixed(1) + '" rx="2"/>';
        s += '<text class="sg-v-sec sg-v" x="' + cx.toFixed(1) + '" y="' + (Y(vmax * .35) - 8).toFixed(1) + '" text-anchor="middle">sin dato</text>';
      } else {
        var clase = x.tipo === 'meta' ? 'sg-c-meta' : 'sg-c-obs';
        s += '<rect class="' + clase + '" x="' + xb.toFixed(1) + '" y="' + Y(x.v).toFixed(1) + '" width="' + ancho.toFixed(1) + '" height="' + (Y(0) - Y(x.v)).toFixed(1) + '" rx="2"/>';
        s += '<text class="sg-v' + (x.tipo === 'meta' ? ' sg-v-meta' : '') + '" x="' + cx.toFixed(1) + '" y="' + (Y(x.v) - 8).toFixed(1) + '" text-anchor="middle">' + fmt(x.v) + (cfg.sufijo || '') + '</text>';
      }
      rotulos[i].forEach(function (l, k) {
        s += '<text class="' + l[1] + '" x="' + cx.toFixed(1) + '" y="' + (H - m.b + 18 + k * 15) + '" text-anchor="middle">' + esc(l[0]) + '</text>';
      });
    });
    s += '<line class="sg-base" x1="' + m.l + '" x2="' + (W - m.r) + '" y1="' + Y(0) + '" y2="' + Y(0) + '"/>';
    s += '</svg>';
    cont.innerHTML = s;
  }

  /* ── LOCALIZADOR · silueta comunal y posición referencial de un territorio ──
     Contorno: rengo-limite.geojson (OpenStreetMap, referencial, no oficial), proyección
     equirectangular local y simplificación Douglas-Peucker de 80 m. Norte y escala gráfica.
     cfg.puntos: [{lat, lng, rotulo, destacado}]   cfg.descripcion */
  var limiteCache = null;
  function limite() {
    if (!limiteCache) limiteCache = fetch('rengo-limite.geojson').then(function (r) { if (!r.ok) throw new Error('límite'); return r.json(); });
    return limiteCache;
  }
  function rdp(p, eps) {
    if (p.length < 3) return p;
    var a = p[0], b = p[p.length - 1], dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1, idx = 0, dmax = 0;
    for (var i = 1; i < p.length - 1; i++) { var d = Math.abs(dy * p[i][0] - dx * p[i][1] + b[0] * a[1] - b[1] * a[0]) / L; if (d > dmax) { dmax = d; idx = i; } }
    return dmax > eps ? rdp(p.slice(0, idx + 1), eps).slice(0, -1).concat(rdp(p.slice(idx), eps)) : [a, b];
  }
  function localizador(cont, cfg) {
    return limite().then(function (gj) {
      var f = gj.features ? gj.features[0] : gj;
      var anillo = f.geometry.coordinates[0];
      var lat0 = -34.444, k = Math.cos(lat0 * Math.PI / 180), R = 6371.0088;
      var km = function (lng, lat) { return [lng * Math.PI / 180 * R * k, -lat * Math.PI / 180 * R]; };
      var pts = anillo.map(function (c) { return km(c[0], c[1]); });
      var mitad = Math.floor(pts.length / 2);
      pts = rdp(pts.slice(0, mitad + 1), 0.08).slice(0, -1).concat(rdp(pts.slice(mitad), 0.08));
      var minx = Infinity, maxx = -Infinity, miny = Infinity, maxy = -Infinity;
      pts.forEach(function (p) { minx = Math.min(minx, p[0]); maxx = Math.max(maxx, p[0]); miny = Math.min(miny, p[1]); maxy = Math.max(maxy, p[1]); });
      var W = Math.max(260, Math.round(cont.clientWidth || 360)), pad = 18, pieAlto = 34;
      var escala = (W - 2 * pad) / (maxx - minx);
      var H = Math.round((maxy - miny) * escala + 2 * pad + pieAlto);
      var P = function (p) { return [(p[0] - minx) * escala + pad, (p[1] - miny) * escala + pad]; };
      var s = abrir(W, H, cfg.descripcion);
      s += '<path class="sg-loc-comuna" d="M' + pts.map(function (p) { var q = P(p); return q[0].toFixed(1) + ',' + q[1].toFixed(1); }).join(' L') + ' Z"/>';
      (cfg.puntos || []).forEach(function (pt) {
        var q = P(km(pt.lng, pt.lat)), x = q[0].toFixed(1), y = q[1].toFixed(1);
        if (pt.destacado) {
          s += '<circle class="sg-loc-halo" cx="' + x + '" cy="' + y + '" r="13"/><circle class="sg-loc-dest" cx="' + x + '" cy="' + y + '" r="5.5"/>';
          s += '<text class="sg-loc-rot sg-loc-rot-dest" x="' + (+x + 17) + '" y="' + (+y + 5) + '">' + esc(pt.rotulo) + '</text>';
        } else {
          s += '<circle class="sg-loc-ref" cx="' + x + '" cy="' + y + '" r="3.5"/>';
          s += '<text class="sg-loc-rot" x="' + (+x + 9) + '" y="' + (+y + 4) + '">' + esc(pt.rotulo) + '</text>';
        }
      });
      // norte
      var nx = W - pad - 6, ny = pad + 6;
      s += '<g class="sg-loc-norte"><path d="M' + nx + ' ' + (ny + 22) + ' V' + ny + ' M' + (nx - 5) + ' ' + (ny + 8) + ' L' + nx + ' ' + ny + ' L' + (nx + 5) + ' ' + (ny + 8) + '"/><text x="' + nx + '" y="' + (ny + 36) + '" text-anchor="middle">N</text></g>';
      // escala de 10 km
      var e10 = 10 * escala, ex = pad, ey = H - 14;
      s += '<g class="sg-loc-escala"><path d="M' + ex + ' ' + ey + ' H' + (ex + e10).toFixed(1) + ' M' + ex + ' ' + (ey - 5) + ' V' + (ey + 5) + ' M' + (ex + e10).toFixed(1) + ' ' + (ey - 5) + ' V' + (ey + 5) + '"/>' +
        '<text x="' + (ex + e10 + 8).toFixed(1) + '" y="' + (ey + 4) + '">10 km</text></g>';
      s += '</svg>';
      cont.innerHTML = s;
    });
  }

  var TIPOS = { linea: linea, barras: barras, columnas: columnas };
  var registro = [];
  function dibujar(cont, tipo, cfg) {
    var fn = TIPOS[tipo] || linea;
    registro.push({ cont: cont, fn: fn, cfg: cfg, w: Math.round(cont.clientWidth || 0) });
    fn(cont, cfg);
  }
  var pend = null;
  function redibujar(forzar) {
    registro.forEach(function (r) {
      var w = Math.round(r.cont.clientWidth || 0);
      if (w && (forzar === true || Math.abs(w - r.w) > 8)) { r.w = w; try { r.fn(r.cont, r.cfg); } catch (e) {} }
    });
  }
  window.addEventListener('resize', function () { clearTimeout(pend); pend = setTimeout(redibujar, 160); });
  // si Poppins termina de cargar después del primer dibujo, se vuelve a medir y a dibujar
  if (document.fonts) {
    if (document.fonts.ready) document.fonts.ready.then(function () { redibujar(true); });
    if (document.fonts.addEventListener) document.fonts.addEventListener('loadingdone', function () { clearTimeout(pend); pend = setTimeout(function () { redibujar(true); }, 60); });
  }
  window.sgGraficos = { dibujar: dibujar, redibujar: redibujar, formato: fmt, localizador: localizador };
})();
