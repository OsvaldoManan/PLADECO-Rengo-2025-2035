/*
 * ════════════════════════════════════════════════════════════════
 *  PLADECO Rengo 2025-2035 — Backend Google Apps Script
 * ════════════════════════════════════════════════════════════════
 *
 *  INSTRUCCIONES DE INSTALACIÓN:
 *  1. Crear una Google Spreadsheet nueva (ej: "PLADECO Backend")
 *  2. Ir a Extensiones → Apps Script
 *  3. Pegar TODO este código en el editor
 *  4. Clic en "Implementar" → "Nueva implementación"
 *  5. Tipo: "Aplicación web"
 *  6. Ejecutar como: "Yo" (tu cuenta)
 *  7. Acceso: "Cualquier persona"
 *  8. Copiar la URL generada
 *  9. Pegar la URL en index.html → variable BACKEND_URL
 *
 *  La spreadsheet creará automáticamente 2 hojas:
 *  - "Votos": Registro de votos de la encuesta
 *  - "Visitas": Registro de visitas al sitio
 */

// ══════════════════════════════════════
// CONFIGURACIÓN
// ══════════════════════════════════════
var TIMEZONE = 'America/Santiago';

// ══════════════════════════════════════
// HANDLER GET — Leer datos
// ══════════════════════════════════════
function doGet(e) {
  var action = (e && e.parameter && e.parameter.action) || 'all';
  var result = { ok: true };

  try {
    if (action === 'votes' || action === 'all') {
      result.votes = getVoteCounts();
    }
    if (action === 'visits' || action === 'all') {
      result.visits = getVisitStats();
    }
  } catch (err) {
    result.ok = false;
    result.error = err.message;
  }

  return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

// ══════════════════════════════════════
// HANDLER POST — Registrar datos
// ══════════════════════════════════════
function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    var data = JSON.parse(e.postData.contents);
    var result = { ok: true };

    if (data.action === 'vote') {
      var sheet = getOrCreateSheet('Votos', ['Timestamp', 'Fecha', 'Hora', 'EjeIndex', 'EjeName']);
      var ejeNames = ['Social y Salud', 'Económico', 'Educación', 'Urbano y M.A.', 'Seguridad', 'Gestión Municipal'];
      var now = new Date();
      sheet.appendRow([
        now,
        Utilities.formatDate(now, TIMEZONE, 'dd/MM/yyyy'),
        Utilities.formatDate(now, TIMEZONE, 'HH:mm:ss'),
        data.eje,
        ejeNames[data.eje] || 'Desconocido'
      ]);
      result.votes = getVoteCounts();
    }

    if (data.action === 'visit') {
      var sheet = getOrCreateSheet('Visitas', ['Timestamp', 'Fecha', 'Hora', 'Página', 'Referrer', 'UserAgent']);
      var now = new Date();
      sheet.appendRow([
        now,
        Utilities.formatDate(now, TIMEZONE, 'dd/MM/yyyy'),
        Utilities.formatDate(now, TIMEZONE, 'HH:mm:ss'),
        data.page || '/',
        data.referrer || '',
        (data.ua || '').substring(0, 150)
      ]);
      result.visits = getVisitStats();
    }

    return ContentService.createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

// ══════════════════════════════════════
// FUNCIONES DE DATOS
// ══════════════════════════════════════

function getOrCreateSheet(name, headers) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function getVoteCounts() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('Votos');
  if (!sheet || sheet.getLastRow() < 2) return [0, 0, 0, 0, 0, 0];

  var data = sheet.getRange(2, 4, sheet.getLastRow() - 1, 1).getValues();
  var counts = [0, 0, 0, 0, 0, 0];
  data.forEach(function(row) {
    var idx = parseInt(row[0]);
    if (idx >= 0 && idx < 6) counts[idx]++;
  });
  return counts;
}

function getVisitStats() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('Visitas');
  if (!sheet || sheet.getLastRow() < 2) {
    return { total: 0, today: 0, week: 0, month: 0, daily: [], hourly: [] };
  }

  var data = sheet.getRange(2, 1, sheet.getLastRow() - 1, 1).getValues();
  var now = new Date();
  var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  var weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
  var monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

  var total = data.length;
  var todayCount = 0;
  var weekCount = 0;
  var monthCount = 0;

  // Últimos 30 días
  var dailyCounts = {};
  for (var d = 29; d >= 0; d--) {
    var date = new Date(today.getTime() - d * 24 * 60 * 60 * 1000);
    var key = Utilities.formatDate(date, TIMEZONE, 'yyyy-MM-dd');
    dailyCounts[key] = 0;
  }

  // Horas del día actual
  var hourlyCounts = {};
  for (var h = 0; h < 24; h++) {
    hourlyCounts[h] = 0;
  }

  data.forEach(function(row) {
    var ts = new Date(row[0]);
    if (isNaN(ts.getTime())) return;

    var key = Utilities.formatDate(ts, TIMEZONE, 'yyyy-MM-dd');
    if (dailyCounts.hasOwnProperty(key)) dailyCounts[key]++;

    if (ts >= today) {
      todayCount++;
      var hour = parseInt(Utilities.formatDate(ts, TIMEZONE, 'HH'));
      hourlyCounts[hour]++;
    }
    if (ts >= weekAgo) weekCount++;
    if (ts >= monthAgo) monthCount++;
  });

  var daily = Object.keys(dailyCounts).sort().map(function(k) {
    return { date: k, count: dailyCounts[k] };
  });

  var hourly = [];
  for (var h = 0; h < 24; h++) {
    hourly.push({ hour: h, count: hourlyCounts[h] });
  }

  return {
    total: total,
    today: todayCount,
    week: weekCount,
    month: monthCount,
    daily: daily,
    hourly: hourly
  };
}

// ══════════════════════════════════════
// UTILIDAD: Limpiar datos antiguos (opcional)
// Ejecutar manualmente si la spreadsheet crece mucho
// ══════════════════════════════════════
function cleanOldVisits() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('Visitas');
  if (!sheet || sheet.getLastRow() < 2) return;

  var cutoff = new Date();
  cutoff.setMonth(cutoff.getMonth() - 6); // Mantener últimos 6 meses

  var data = sheet.getRange(2, 1, sheet.getLastRow() - 1, 1).getValues();
  var rowsToDelete = [];

  for (var i = data.length - 1; i >= 0; i--) {
    if (new Date(data[i][0]) < cutoff) {
      rowsToDelete.push(i + 2);
    }
  }

  rowsToDelete.forEach(function(row) {
    sheet.deleteRow(row);
  });

  Logger.log('Eliminadas ' + rowsToDelete.length + ' visitas antiguas');
}
