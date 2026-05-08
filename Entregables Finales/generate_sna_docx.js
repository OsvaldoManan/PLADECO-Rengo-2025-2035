const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, ImageRun,
  Header, Footer, AlignmentType, HeadingLevel, BorderStyle, WidthType, ShadingType,
  PageBreak, PageNumber, LevelFormat
} = require("docx");

// ── Constants ──────────────────────────────────────────────────────────
const NAVY = "002060";
const HEADER_BLUE = "065A82";
const LIGHT_BLUE = "D6EAF8";
const WHITE = "FFFFFF";
const LIGHT_GRAY = "F2F4F7";
const BORDER_GRAY = "B0B8C4";
const FONT = "Arial";

// Page: A4, margins 2.5 cm (1417 DXA ≈ 2.5 cm; 1 cm = 567 DXA)
const MARGIN = 1417;
const PAGE_W = 11906; // A4 width
const CONTENT_W = PAGE_W - 2 * MARGIN; // ~9072 DXA

const thinBorder = { style: BorderStyle.SINGLE, size: 1, color: BORDER_GRAY };
const cellBorders = { top: thinBorder, bottom: thinBorder, left: thinBorder, right: thinBorder };
const noBorder = { style: BorderStyle.NONE, size: 0, color: WHITE };
const noBorders = { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder };

// ── Helpers ────────────────────────────────────────────────────────────
function sectionHeader(text) {
  return new Paragraph({
    spacing: { before: 360, after: 200 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: HEADER_BLUE, space: 4 } },
    children: [new TextRun({ text, font: FONT, size: 28, bold: true, color: HEADER_BLUE })]
  });
}

function subHeader(text) {
  return new Paragraph({
    spacing: { before: 280, after: 120 },
    children: [new TextRun({ text, font: FONT, size: 24, bold: true, color: HEADER_BLUE })]
  });
}

function bodyPara(runs, opts = {}) {
  const spacing = opts.spacing || { after: 120, line: 276 }; // 1.15 spacing = 276 twips (240*1.15)
  return new Paragraph({
    alignment: AlignmentType.JUSTIFIED,
    spacing,
    ...opts,
    children: runs.map(r => {
      if (r instanceof TextRun) return r;
      const { text, bold, italic, color, size } = r;
      return new TextRun({ text, font: FONT, size: size || 22, bold: !!bold, italics: !!italic, color: color || "000000" });
    })
  });
}

function boldLabel(label, value) {
  return [
    new TextRun({ text: label, font: FONT, size: 22, bold: true }),
    new TextRun({ text: value, font: FONT, size: 22 })
  ];
}

// Table helper
function makeHeaderCell(text, width) {
  return new TableCell({
    width: { size: width, type: WidthType.DXA },
    borders: cellBorders,
    shading: { fill: NAVY, type: ShadingType.CLEAR },
    margins: { top: 60, bottom: 60, left: 100, right: 100 },
    children: [new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text, font: FONT, size: 20, bold: true, color: WHITE })]
    })]
  });
}

function makeDataCell(text, width, rowIdx, opts = {}) {
  const fill = rowIdx % 2 === 0 ? LIGHT_GRAY : WHITE;
  return new TableCell({
    width: { size: width, type: WidthType.DXA },
    borders: cellBorders,
    shading: { fill, type: ShadingType.CLEAR },
    margins: { top: 50, bottom: 50, left: 100, right: 100 },
    children: [new Paragraph({
      alignment: opts.center ? AlignmentType.CENTER : AlignmentType.LEFT,
      children: [new TextRun({ text, font: FONT, size: 20, bold: !!opts.bold, color: opts.color || "000000" })]
    })]
  });
}

function makeCenterDataCell(text, width, rowIdx, opts = {}) {
  return makeDataCell(text, width, rowIdx, { ...opts, center: true });
}

// ── Image ──────────────────────────────────────────────────────────────
const imgPath = "C:\\Users\\Osvaldo\\OneDrive\\Escritorio\\Proceso Final PLADECO\\Graficos\\G19_SNA_Articulacion_Institucional.png";
const imgData = fs.readFileSync(imgPath);
// 22 cm width = 8346 DXA. Image is ~square, so height ≈ width.
// In EMU: 22 cm = 7920000 EMU (1 cm = 360000 EMU). But ImageRun uses pixels conceptually.
// docx-js transformation is in EMU/10000... actually it's in "points" that map to EMU.
// Let's use: 22cm = ~623 pt width. Height at 1:1 = 623 pt. But docx-js uses pixels at 96 dpi.
// 22 cm at 96 dpi = 22/2.54*96 = 831 px
const IMG_W = 831;
const IMG_H = Math.round(831 * 1.002); // maintain ratio

// ── Betweenness Data ───────────────────────────────────────────────────
const betweennessData = [
  ["1", "OE 6.6 Cuentas Publicas", "0.3352", "Nodo mas central; conecta Alcaldia, DAF, Juridica, Informatica, Contraloria, COSOC y CGR"],
  ["2", "SECPLAN", "0.3204", "Puente entre planificacion y ejecucion (Art. 21); tasa de adjudicacion 50.8%"],
  ["3", "OE 4.5 Riesgo Hidrico", "0.3083", "Conecta MOP/DOH con gestion de emergencias y agricultura (cuenca Rio Claro)"],
  ["4", "DIDECO", "0.2797", "Interfaz comunitaria; gestiona 330 organizaciones; deficit de vehiculos (H2)"],
  ["5", "OE 6.1 M&E", "0.2324", "Unidad de monitoreo conecta Alcaldia, SECPLAN, Contraloria y CGR"],
  ["6", "OE 1.5 Prevencion", "0.2118", "Articula seguridad ciudadana con Carabineros y programas SENDA"],
  ["7", "DAEM", "0.1987", "Concentra educacion municipal; 170+ sumarios activos"],
  ["8", "OE 4.1 Turismo Rural", "0.1845", "Vincula SERNATUR con desarrollo economico local"],
  ["9", "Depto. Salud", "0.1723", "Articula red CESFAM/CECOSF con MINSAL"],
  ["10", "OE 5.4 Infraestructura", "0.1612", "Conecta DOM, MOP y MINVU para inversion en infraestructura"]
];

// ── Degree Data ────────────────────────────────────────────────────────
const degreeData = [
  ["1", "OE 6.6 Cuentas Publicas", "0.1481", "8"],
  ["2", "OE 6.1 M&E", "0.1111", "6"],
  ["3", "DIDECO", "0.1111", "6"],
  ["4", "DAEM", "0.1111", "6"],
  ["5", "OE 1.5 Prevencion", "0.0926", "5"],
  ["6", "SECPLAN", "0.0926", "5"],
  ["7", "OE 4.5 Riesgo Hidrico", "0.0926", "5"],
  ["8", "Depto. Salud", "0.0741", "4"],
  ["9", "OE 5.4 Infraestructura", "0.0741", "4"],
  ["10", "OE 6.2 RRHH", "0.0741", "4"]
];

// ── Build Document ─────────────────────────────────────────────────────
const doc = new Document({
  styles: {
    default: {
      document: { run: { font: FONT, size: 22 } }
    }
  },
  numbering: {
    config: [
      {
        reference: "bullets",
        levels: [{
          level: 0, format: LevelFormat.BULLET, text: "\u2022",
          alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } }
        }]
      },
      {
        reference: "priorities",
        levels: [{
          level: 0, format: LevelFormat.DECIMAL, text: "%1.",
          alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } }
        }]
      }
    ]
  },
  sections: [{
    properties: {
      page: {
        size: { width: 11906, height: 16838 }, // A4
        margin: { top: MARGIN, right: MARGIN, bottom: MARGIN, left: MARGIN }
      }
    },
    headers: {
      default: new Header({
        children: [new Paragraph({
          alignment: AlignmentType.RIGHT,
          border: { bottom: { style: BorderStyle.SINGLE, size: 2, color: HEADER_BLUE, space: 4 } },
          children: [
            new TextRun({ text: "PLADECO Rengo 2025-2035", font: FONT, size: 16, italics: true, color: HEADER_BLUE }),
            new TextRun({ text: "  |  ", font: FONT, size: 16, color: BORDER_GRAY }),
            new TextRun({ text: "Analisis SNA", font: FONT, size: 16, italics: true, color: HEADER_BLUE })
          ]
        })]
      })
    },
    footers: {
      default: new Footer({
        children: [new Paragraph({
          alignment: AlignmentType.CENTER,
          border: { top: { style: BorderStyle.SINGLE, size: 2, color: HEADER_BLUE, space: 4 } },
          spacing: { before: 100 },
          children: [
            new TextRun({ text: "Municipalidad de Rengo | Provincia de Cachapoal | Region del Libertador O'Higgins | Abril 2026", font: FONT, size: 16, color: "666666" }),
            new TextRun({ text: "    ", font: FONT, size: 16 }),
            new TextRun({ text: "Pagina ", font: FONT, size: 16, color: "666666" }),
            new TextRun({ children: [PageNumber.CURRENT], font: FONT, size: 16, color: "666666" })
          ]
        })]
      })
    },
    children: [
      // ═══════════════════════════════════════════════════════════════
      // TITLE BLOCK
      // ═══════════════════════════════════════════════════════════════
      new Paragraph({ spacing: { after: 0 } , children: [] }), // spacer
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 80 },
        children: [new TextRun({
          text: "Analisis Ejecutivo: Red de Articulacion Institucional",
          font: FONT, size: 36, bold: true, color: NAVY
        })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 80 },
        children: [new TextRun({
          text: "PLADECO Rengo 2025-2035",
          font: FONT, size: 36, bold: true, color: NAVY
        })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 80 },
        border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: NAVY, space: 8 } },
        children: [new TextRun({
          text: "Analisis de Redes Sociales (SNA) \u2014 Arquitectura de Gobernanza para 176 Politicas",
          font: FONT, size: 24, color: HEADER_BLUE
        })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 160, after: 400 },
        children: [new TextRun({
          text: "Municipalidad de Rengo  |  SECPLAC  |  Abril 2026",
          font: FONT, size: 22, color: "444444"
        })]
      }),

      // ═══════════════════════════════════════════════════════════════
      // 1. PROPOSITO DEL ANALISIS SNA
      // ═══════════════════════════════════════════════════════════════
      sectionHeader("1. Proposito del Analisis SNA"),

      bodyPara([
        { text: "El Analisis de Redes Sociales (SNA) aplicado al PLADECO cartografia la arquitectura relacional entre las unidades municipales, los objetivos estrategicos y los actores externos que configuran la gobernanza del plan. A diferencia de los organigramas tradicionales que muestran jerarquias formales, el SNA revela los " },
        { text: "patrones reales de coordinacion", bold: true },
        { text: ", identifica cuellos de botella y expone los " },
        { text: "huecos estructurales", bold: true },
        { text: " (Burt, 1992) donde las conexiones institucionales estan ausentes o son insuficientes. Este enfoque permite visualizar como fluyen \u2014o se estancan\u2014 los recursos, la informacion y la autoridad a traves de la red institucional." }
      ]),

      bodyPara([
        { text: "El presente analisis se sustenta en el estudio de " },
        { text: "Etnografia Institucional", bold: true },
        { text: " (Smith, 2005) realizado entre enero y marzo de 2025, que incluyo mas de 40 entrevistas semiestructuradas distribuidas en cuatro dominios: social, institucional-operativo, institucional-directivo y politico. La triangulacion de estos datos cualitativos con las metricas cuantitativas de la red (55 nodos, 76 aristas, densidad 0.051) permite una lectura robusta de las fortalezas y vulnerabilidades de la arquitectura de gobernanza que sustenta las 176 politicas del PLADECO." }
      ]),

      // ═══════════════════════════════════════════════════════════════
      // IMAGE
      // ═══════════════════════════════════════════════════════════════
      new Paragraph({ spacing: { before: 300 }, children: [] }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new ImageRun({
          type: "png",
          data: imgData,
          transformation: { width: IMG_W, height: IMG_H },
          altText: {
            title: "Red SNA Articulacion Institucional",
            description: "Grafo de red de articulacion institucional PLADECO Rengo 2025-2035 con 55 nodos y 76 aristas",
            name: "G19_SNA"
          }
        })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 80, after: 300 },
        border: { bottom: { style: BorderStyle.SINGLE, size: 2, color: BORDER_GRAY, space: 6 } },
        children: [
          new TextRun({ text: "Figura: ", font: FONT, size: 20, bold: true, italics: true, color: "444444" }),
          new TextRun({ text: "Red de Articulacion Institucional PLADECO Rengo 2025-2035 \u2014 55 nodos \u00D7 76 aristas \u00D7 3 tipos de vinculos", font: FONT, size: 20, italics: true, color: "444444" })
        ]
      }),

      // ═══════════════════════════════════════════════════════════════
      // 2. ESTRUCTURA DE LA RED
      // ═══════════════════════════════════════════════════════════════
      sectionHeader("2. Estructura de la Red"),

      bodyPara([
        { text: "La red de articulacion institucional se organiza en tres capas funcionales diferenciadas, cada una con un rol especifico en la arquitectura de gobernanza del PLADECO. La comprension de estas capas es esencial para interpretar las metricas de centralidad y los hallazgos estrategicos que se presentan en las secciones siguientes." }
      ]),

      subHeader("Capa 1 \u2014 Unidades Municipales (13 nodos, cuadrados)"),

      bodyPara([
        { text: "Las 13 unidades municipales conforman el nucleo operativo de la red: " },
        { text: "SECPLAN, DIDECO, DAEM, Depto. Salud, DSP, DOM, Aseo y Ornato, DAF, RRHH, Informatica, Juridica, Alcaldia y Contraloria Interna", bold: true },
        { text: ". La etnografia institucional confirmo que cinco de estas unidades (DIDECO, SECPLAN, DOM, Depto. Salud y DSP) concentran mas del " },
        { text: "70% de las citas operativas", bold: true },
        { text: ", evidenciando una marcada concentracion de carga de trabajo. El municipio cuenta con 939 funcionarios (3.o a nivel regional), pero solo un " },
        { text: "34.5% de profesionalizacion (26.o de 33 comunas)", bold: true },
        { text: ", lo que limita la capacidad de absorcion de las funciones que el PLADECO demanda." }
      ]),

      subHeader("Capa 2 \u2014 32 Objetivos Estrategicos (nodos circulares, coloreados por eje)"),

      bodyPara([
        { text: "El tamano de cada nodo es proporcional al numero de acciones asociadas. Los nodos de mayor tamano son: " },
        { text: "OE 6.6 Cuentas Publicas (9 acciones)", bold: true },
        { text: ", OE 6.2 RRHH (6 acciones) y OE 6.4 Unidad de Medio Ambiente (5 acciones). El agrupamiento por color revela las 6 comunidades temicas correspondientes a los ejes del PLADECO:" }
      ]),

      // Ejes mini-table
      new Table({
        width: { size: CONTENT_W, type: WidthType.DXA },
        columnWidths: [Math.round(CONTENT_W * 0.15), Math.round(CONTENT_W * 0.55), Math.round(CONTENT_W * 0.30)],
        rows: [
          new TableRow({ children: [
            makeHeaderCell("Color", Math.round(CONTENT_W * 0.15)),
            makeHeaderCell("Eje Tematico", Math.round(CONTENT_W * 0.55)),
            makeHeaderCell("Acciones", Math.round(CONTENT_W * 0.30))
          ]}),
          ...[
            ["Berry", "Eje 1: Desarrollo Social y Comunitario", "51 acciones"],
            ["Verde", "Eje 2: Medio Ambiente y Sustentabilidad", "17 acciones"],
            ["Ambar", "Eje 3: Educacion, Cultura y Patrimonio", "14 acciones"],
            ["Terracota", "Eje 4: Desarrollo Economico y Territorial", "33 acciones"],
            ["Rojo", "Eje 5: Infraestructura y Conectividad", "28 acciones"],
            ["Teal", "Eje 6: Gobernanza e Institucionalidad", "33 acciones"]
          ].map((row, i) => new TableRow({ children: [
            makeDataCell(row[0], Math.round(CONTENT_W * 0.15), i),
            makeDataCell(row[1], Math.round(CONTENT_W * 0.55), i),
            makeCenterDataCell(row[2], Math.round(CONTENT_W * 0.30), i)
          ]}))
        ]
      }),

      new Paragraph({ spacing: { after: 120 }, children: [] }),

      subHeader("Capa 3 \u2014 Actores Externos (10 nodos, diamantes)"),

      bodyPara([
        { text: "Los 10 actores externos representan la arquitectura de " },
        { text: "gobernanza multinivel", bold: true },
        { text: " (Marks & Hooghe, 2003) que el PLADECO debe navegar para acceder a financiamiento sectorial y regional: " },
        { text: "GORE O'Higgins, SERNATUR, SENCE, MINVU, MOP/DOH, MINSAL, SENAPRED, CORFO, COSOC y CGR", bold: true },
        { text: ". Estos actores proporcionan recursos FNDR, sectoriales y de fiscalizacion que son criticos para la viabilidad financiera de las 176 politicas." }
      ]),

      // ═══════════════════════════════════════════════════════════════
      // PAGE BREAK before Section 3
      // ═══════════════════════════════════════════════════════════════
      new Paragraph({ children: [new PageBreak()] }),

      // ═══════════════════════════════════════════════════════════════
      // 3. METRICAS CLAVE DE LA RED
      // ═══════════════════════════════════════════════════════════════
      sectionHeader("3. Metricas Clave de la Red"),

      subHeader("3.1 Betweenness Centrality (Intermediacion)"),

      bodyPara([
        { text: "La centralidad de intermediacion (betweenness) mide con que frecuencia un nodo se encuentra en el camino mas corto entre otros dos nodos de la red. Un valor alto de intermediacion indica que el nodo actua como " },
        { text: "intermediario critico", bold: true },
        { text: ": si fuera removido, la informacion y los recursos no podrian fluir eficientemente entre las partes de la red que conecta. En terminos de gobernanza, estos nodos son los puntos de articulacion cuyo debilitamiento fragmentaria la coordinacion institucional." }
      ]),

      // Betweenness Table
      new Table({
        width: { size: CONTENT_W, type: WidthType.DXA },
        columnWidths: [
          Math.round(CONTENT_W * 0.06),  // Rank
          Math.round(CONTENT_W * 0.26),  // Node
          Math.round(CONTENT_W * 0.12),  // Score
          Math.round(CONTENT_W * 0.56)   // Interpretation
        ],
        rows: [
          new TableRow({ children: [
            makeHeaderCell("#", Math.round(CONTENT_W * 0.06)),
            makeHeaderCell("Nodo", Math.round(CONTENT_W * 0.26)),
            makeHeaderCell("Betweenness", Math.round(CONTENT_W * 0.12)),
            makeHeaderCell("Interpretacion Estrategica", Math.round(CONTENT_W * 0.56))
          ]}),
          ...betweennessData.map((row, i) => new TableRow({ children: [
            makeCenterDataCell(row[0], Math.round(CONTENT_W * 0.06), i, { bold: true }),
            makeDataCell(row[1], Math.round(CONTENT_W * 0.26), i, { bold: true, color: NAVY }),
            makeCenterDataCell(row[2], Math.round(CONTENT_W * 0.12), i, { bold: true }),
            makeDataCell(row[3], Math.round(CONTENT_W * 0.56), i)
          ]}))
        ]
      }),

      new Paragraph({ spacing: { after: 200 }, children: [] }),

      subHeader("3.2 Degree Centrality (Grado)"),

      bodyPara([
        { text: "La centralidad de grado mide el numero de conexiones directas de un nodo. Un grado alto indica que el nodo es un " },
        { text: "hub", bold: true, italic: true },
        { text: " de la red: concentra multiples vinculos de responsabilidad, articulacion sectorial o dependencias inter-eje. Los nodos hub son puntos de convergencia operativa cuya sobrecarga puede generar cuellos de botella sistemicos." }
      ]),

      // Degree Table
      new Table({
        width: { size: CONTENT_W, type: WidthType.DXA },
        columnWidths: [
          Math.round(CONTENT_W * 0.06),
          Math.round(CONTENT_W * 0.36),
          Math.round(CONTENT_W * 0.22),
          Math.round(CONTENT_W * 0.36)
        ],
        rows: [
          new TableRow({ children: [
            makeHeaderCell("#", Math.round(CONTENT_W * 0.06)),
            makeHeaderCell("Nodo", Math.round(CONTENT_W * 0.36)),
            makeHeaderCell("Degree Centrality", Math.round(CONTENT_W * 0.22)),
            makeHeaderCell("Conexiones Directas", Math.round(CONTENT_W * 0.36))
          ]}),
          ...degreeData.map((row, i) => new TableRow({ children: [
            makeCenterDataCell(row[0], Math.round(CONTENT_W * 0.06), i, { bold: true }),
            makeDataCell(row[1], Math.round(CONTENT_W * 0.36), i, { bold: true, color: NAVY }),
            makeCenterDataCell(row[2], Math.round(CONTENT_W * 0.22), i, { bold: true }),
            makeCenterDataCell(row[3], Math.round(CONTENT_W * 0.36), i)
          ]}))
        ]
      }),

      new Paragraph({ spacing: { after: 200 }, children: [] }),

      subHeader("3.3 Densidad de la Red = 0.051"),

      bodyPara([
        { text: "La densidad de la red es de " },
        { text: "0.051", bold: true },
        { text: " (sobre un maximo teorico de 1.0), lo que significa que solo el " },
        { text: "5.1% de todas las conexiones posibles", bold: true },
        { text: " existen efectivamente. Esta baja densidad confirma los " },
        { text: "huecos estructurales", bold: true, italic: true },
        { text: " (Burt, 1992) identificados en la etnografia: la red esta fragmentada con comportamiento de silos entre ejes tematicos. Las 12 dependencias inter-eje (lineas amarillas punteadas en el grafo) fueron disenadas precisamente para tender puentes sobre estos huecos, pero su efectividad depende de la capacidad coordinadora de SECPLAN, que es justamente la unidad con la segunda mayor intermediacion (0.320)." }
      ]),

      bodyPara([
        { text: "En perspectiva comparada, una densidad de 0.051 es tipica de redes institucionales de tamano medio donde la especializacion funcional predomina sobre la coordinacion transversal. El desafio del PLADECO es elevar esta densidad selectivamente, fortaleciendo las conexiones criticas sin generar sobrecarga burocratica." }
      ]),

      // ═══════════════════════════════════════════════════════════════
      // PAGE BREAK before Section 4
      // ═══════════════════════════════════════════════════════════════
      new Paragraph({ children: [new PageBreak()] }),

      // ═══════════════════════════════════════════════════════════════
      // 4. TRES HALLAZGOS ESTRATEGICOS
      // ═══════════════════════════════════════════════════════════════
      sectionHeader("4. Tres Hallazgos Estrategicos"),

      // Hallazgo 1 - box style using a table
      new Table({
        width: { size: CONTENT_W, type: WidthType.DXA },
        columnWidths: [CONTENT_W],
        rows: [new TableRow({ children: [
          new TableCell({
            width: { size: CONTENT_W, type: WidthType.DXA },
            borders: { top: { style: BorderStyle.SINGLE, size: 12, color: NAVY }, bottom: thinBorder, left: { style: BorderStyle.SINGLE, size: 4, color: NAVY }, right: thinBorder },
            shading: { fill: "EBF5FB", type: ShadingType.CLEAR },
            margins: { top: 120, bottom: 120, left: 200, right: 200 },
            children: [
              new Paragraph({
                spacing: { after: 100 },
                children: [new TextRun({ text: "Hallazgo 1: OE 6.6 como Nodo Critico de Gobernanza", font: FONT, size: 24, bold: true, color: NAVY })]
              }),
              new Paragraph({
                alignment: AlignmentType.JUSTIFIED,
                spacing: { after: 80, line: 276 },
                children: [
                  new TextRun({ text: "Cuentas Publicas es simultaneamente el nodo mas conectado (degree 0.148) ", font: FONT, size: 22 }),
                  new TextRun({ text: "Y", font: FONT, size: 22, bold: true }),
                  new TextRun({ text: " el de mayor intermediacion (betweenness 0.335). Esta ", font: FONT, size: 22 }),
                  new TextRun({ text: "centralidad dual", font: FONT, size: 22, bold: true }),
                  new TextRun({ text: " lo convierte en la piedra angular de la arquitectura de gobernanza. Conecta el control interno (Contraloria Interna), la gestion financiera (DAF), la fiscalizacion legal (Juridica), los sistemas digitales (Informatica), la rendicion politica (Alcaldia), la fiscalizacion ciudadana (COSOC) y la auditoria externa (CGR).", font: FONT, size: 22 })
                ]
              }),
              new Paragraph({
                alignment: AlignmentType.JUSTIFIED,
                spacing: { after: 0, line: 276 },
                children: [
                  new TextRun({ text: "Si este nodo falla \u2014como ocurrio parcialmente en el PLADECO 2019-2031 donde ", font: FONT, size: 22 }),
                  new TextRun({ text: "NO existia rendicion de cuentas especifica", font: FONT, size: 22, bold: true }),
                  new TextRun({ text: "\u2014 todo el sistema de M&E colapsa. Esto explica por que OE 6.6 tiene 9 acciones (el maximo de cualquier OE), incluyendo: rendicion de cuentas publica semestral, plataforma digital de monitoreo ciudadano y rendicion participativa con el COSOC.", font: FONT, size: 22 })
                ]
              })
            ]
          })
        ]})]
      }),

      new Paragraph({ spacing: { after: 200 }, children: [] }),

      // Hallazgo 2
      new Table({
        width: { size: CONTENT_W, type: WidthType.DXA },
        columnWidths: [CONTENT_W],
        rows: [new TableRow({ children: [
          new TableCell({
            width: { size: CONTENT_W, type: WidthType.DXA },
            borders: { top: { style: BorderStyle.SINGLE, size: 12, color: "C0392B" }, bottom: thinBorder, left: { style: BorderStyle.SINGLE, size: 4, color: "C0392B" }, right: thinBorder },
            shading: { fill: "FDEDEC", type: ShadingType.CLEAR },
            margins: { top: 120, bottom: 120, left: 200, right: 200 },
            children: [
              new Paragraph({
                spacing: { after: 100 },
                children: [new TextRun({ text: "Hallazgo 2: Sobrecarga Operativa Concentrada (DIDECO + DAEM)", font: FONT, size: 24, bold: true, color: "922B21" })]
              }),
              new Paragraph({
                alignment: AlignmentType.JUSTIFIED,
                spacing: { after: 80, line: 276 },
                children: [
                  new TextRun({ text: "DIDECO y DAEM tienen cada uno una centralidad de grado de 0.111 (6 conexiones), constituyendose en las unidades municipales mas conectadas. Sin embargo, la etnografia revelo que ", font: FONT, size: 22 }),
                  new TextRun({ text: "DIDECO carece de vehiculos y equipamiento basico (H2)", font: FONT, size: 22, bold: true }),
                  new TextRun({ text: ", mientras que ", font: FONT, size: 22 }),
                  new TextRun({ text: "DAEM acumula mas de 170 sumarios administrativos activos", font: FONT, size: 22, bold: true }),
                  new TextRun({ text: ".", font: FONT, size: 22 })
                ]
              }),
              new Paragraph({
                alignment: AlignmentType.JUSTIFIED,
                spacing: { after: 0, line: 276 },
                children: [
                  new TextRun({ text: "Esta combinacion de ", font: FONT, size: 22 }),
                  new TextRun({ text: "alta centralidad + bajos recursos = vulnerabilidad sistemica", font: FONT, size: 22, bold: true }),
                  new TextRun({ text: ". El SNA hace visible lo que la etnografia describio: estas unidades estan estructuralmente sobrecargadas, y su falla se propaga en cascada a traves de multiples OEs (DIDECO conecta con Ejes 1 y 2; DAEM conecta con Eje 3 y OE 5.4). El PLADECO aborda esta vulnerabilidad a traves de OE 6.2 (actualizacion RRHH, 6 acciones) e inversion en equipamiento.", font: FONT, size: 22 })
                ]
              })
            ]
          })
        ]})]
      }),

      new Paragraph({ spacing: { after: 200 }, children: [] }),

      // Hallazgo 3
      new Table({
        width: { size: CONTENT_W, type: WidthType.DXA },
        columnWidths: [CONTENT_W],
        rows: [new TableRow({ children: [
          new TableCell({
            width: { size: CONTENT_W, type: WidthType.DXA },
            borders: { top: { style: BorderStyle.SINGLE, size: 12, color: "D4AC0D" }, bottom: thinBorder, left: { style: BorderStyle.SINGLE, size: 4, color: "D4AC0D" }, right: thinBorder },
            shading: { fill: "FEF9E7", type: ShadingType.CLEAR },
            margins: { top: 120, bottom: 120, left: 200, right: 200 },
            children: [
              new Paragraph({
                spacing: { after: 100 },
                children: [new TextRun({ text: "Hallazgo 3: Huecos Estructurales en la Articulacion Externa", font: FONT, size: 24, bold: true, color: "7D6608" })]
              }),
              new Paragraph({
                alignment: AlignmentType.JUSTIFIED,
                spacing: { after: 80, line: 276 },
                children: [
                  new TextRun({ text: "Los 10 actores externos (GORE, SERNATUR, SENCE, MINVU, MOP, MINSAL, SENAPRED, CORFO, COSOC, CGR) tienen solo ", font: FONT, size: 22 }),
                  new TextRun({ text: "20 conexiones hacia 32 OEs", font: FONT, size: 22, bold: true }),
                  new TextRun({ text: ", lo que significa que la mayoria de los objetivos estrategicos carecen de articulacion directa con fuentes de financiamiento. El analisis BIP confirma esta brecha: un ", font: FONT, size: 22 }),
                  new TextRun({ text: "HHI de 0.4145 (alta concentracion)", font: FONT, size: 22, bold: true }),
                  new TextRun({ text: ", con el municipio formulando el 63.5% de los proyectos en solitario.", font: FONT, size: 22 })
                ]
              }),
              new Paragraph({
                alignment: AlignmentType.JUSTIFIED,
                spacing: { after: 0, line: 276 },
                children: [
                  new TextRun({ text: "La tasa de adjudicacion de SECPLAC del ", font: FONT, size: 22 }),
                  new TextRun({ text: "50.8%", font: FONT, size: 22, bold: true }),
                  new TextRun({ text: " limita aun mas la captura de recursos externos. Las 12 dependencias inter-eje (lineas amarillas punteadas) representan el diseno del PLADECO para tender puentes sobre estos huecos, pero su efectividad depende de la capacidad de SECPLAN para coordinar \u2014precisamente la unidad con la segunda mayor intermediacion (0.320).", font: FONT, size: 22 })
                ]
              })
            ]
          })
        ]})]
      }),

      // ═══════════════════════════════════════════════════════════════
      // 5. IMPLICANCIAS PARA LA GESTION
      // ═══════════════════════════════════════════════════════════════
      new Paragraph({ spacing: { before: 360 }, children: [] }),
      sectionHeader("5. Implicancias para la Gestion"),

      bodyPara([
        { text: "Del analisis SNA se derivan cuatro prioridades de gestion que deben informar la implementacion del PLADECO durante su primer trienio (2025-2028):" }
      ]),

      // Priority 1
      new Paragraph({
        spacing: { before: 200, after: 80 },
        children: [
          new TextRun({ text: "Prioridad 1: ", font: FONT, size: 22, bold: true, color: NAVY }),
          new TextRun({ text: "Fortalecer OE 6.6 (Cuentas Publicas) como piedra angular de gobernanza", font: FONT, size: 22, bold: true })
        ]
      }),
      bodyPara([
        { text: "Cualquier retraso en la implementacion de este objetivo estrategico genera efectos en cascada a traves de toda la red. Se recomienda priorizar la instalacion de la plataforma digital de monitoreo ciudadano y la rendicion de cuentas semestral durante el primer ano de ejecucion." }
      ]),

      // Priority 2
      new Paragraph({
        spacing: { before: 200, after: 80 },
        children: [
          new TextRun({ text: "Prioridad 2: ", font: FONT, size: 22, bold: true, color: NAVY }),
          new TextRun({ text: "Descongestionar DIDECO y DAEM", font: FONT, size: 22, bold: true })
        ]
      }),
      bodyPara([
        { text: "Redistribuir la carga operativa o incrementar los recursos de estas unidades para prevenir fallas en cascada. DIDECO requiere flota vehicular y equipamiento de terreno; DAEM necesita resolucion del stock de sumarios administrativos antes de asumir las responsabilidades adicionales que el PLADECO le asigna." }
      ]),

      // Priority 3
      new Paragraph({
        spacing: { before: 200, after: 80 },
        children: [
          new TextRun({ text: "Prioridad 3: ", font: FONT, size: 22, bold: true, color: NAVY }),
          new TextRun({ text: "Incrementar la articulacion externa", font: FONT, size: 22, bold: true })
        ]
      }),
      bodyPara([
        { text: "SECPLAN debe mejorar su tasa de adjudicacion del 50.8% actual a >80% para capturar financiamiento FNDR y sectorial. Esto requiere profesionalizar la formulacion de proyectos BIP y establecer convenios marco con los 10 actores externos identificados en la red." }
      ]),

      // Priority 4
      new Paragraph({
        spacing: { before: 200, after: 80 },
        children: [
          new TextRun({ text: "Prioridad 4: ", font: FONT, size: 22, bold: true, color: NAVY }),
          new TextRun({ text: "Activar las 12 dependencias inter-eje", font: FONT, size: 22, bold: true })
        ]
      }),
      bodyPara([
        { text: "Asignar coordinadores especificos para cada vinculo inter-eje (representados como lineas amarillas punteadas en el grafo). Estas conexiones son el mecanismo diseenado por el PLADECO para romper los silos entre ejes tematicos, pero requieren responsables explicitos y protocolos de coordinacion formalizados." }
      ]),

      // ═══════════════════════════════════════════════════════════════
      // 6. NOTA METODOLOGICA
      // ═══════════════════════════════════════════════════════════════
      new Paragraph({ children: [new PageBreak()] }),
      sectionHeader("6. Nota Metodologica"),

      bodyPara([
        { text: "El Analisis de Redes Sociales (SNA) se fundamenta en el marco teorico de ", italic: true },
        { text: "Wasserman & Faust (1994)", bold: true },
        { text: " para la modelacion de redes sociales. Las metricas de centralidad siguen las definiciones formales de " },
        { text: "Freeman (1979)", bold: true },
        { text: ": betweenness centrality como la proporcion de caminos mas cortos que pasan por un nodo, y degree centrality como la fraccion de nodos a los que un nodo esta conectado. El concepto de huecos estructurales se basa en " },
        { text: "Burt (1992)", bold: true },
        { text: ", y el enfoque de etnografia institucional sigue la metodologia de " },
        { text: "Smith (2005)", bold: true },
        { text: "." }
      ]),

      bodyPara([
        { text: "La red fue computada utilizando " },
        { text: "NetworkX (Python)", bold: true },
        { text: " y visualizada con " },
        { text: "Matplotlib", bold: true },
        { text: ". La red contiene " },
        { text: "55 nodos", bold: true },
        { text: " (32 objetivos estrategicos + 13 unidades municipales + 10 actores externos), " },
        { text: "76 aristas", bold: true },
        { text: " y " },
        { text: "3 tipos de vinculos", bold: true },
        { text: ": responsabilidad (unidad municipal a OE), articulacion sectorial (actor externo a OE) y dependencias inter-eje (OE a OE, 12 vinculos cruzados). El layout del grafo utiliza el algoritmo de Kamada-Kawai para optimizar la distribucion espacial de los nodos." }
      ]),

      // ═══════════════════════════════════════════════════════════════
      // 7. FUENTES
      // ═══════════════════════════════════════════════════════════════
      sectionHeader("7. Fuentes"),

      bodyPara([{ text: "PLADECO Rengo 2025-2035. Municipalidad de Rengo, SECPLAC.", bold: true }]),
      bodyPara([{ text: "Etnografia Institucional 2025. 40+ entrevistas semiestructuradas en 4 dominios (social, institucional-operativo, institucional-directivo, politico). Enero-marzo 2025.", italic: true }]),
      bodyPara([{ text: "Reglamento de Organizacion Interna. Decreto Alcaldicio N.o 1778/2018, modificado por Decreto N.o 1287/2022." }]),
      bodyPara([{ text: "SINIM 2024. Sistema Nacional de Informacion Municipal, SUBDERE." }]),
      bodyPara([{ text: "CGR 2009-2024. Informes de la Contraloria General de la Republica, cuentas municipales." }]),
      bodyPara([{ text: "BIP/SNI 1997-2025. Banco Integrado de Proyectos, Sistema Nacional de Inversiones, Ministerio de Desarrollo Social." }]),
      bodyPara([{ text: "Burt, R. S. (1992). Structural Holes: The Social Structure of Competition. Harvard University Press.", italic: true }]),
      bodyPara([{ text: "Freeman, L. C. (1979). Centrality in Social Networks: Conceptual Clarification. Social Networks, 1(3), 215-239.", italic: true }]),
      bodyPara([{ text: "Marks, G. & Hooghe, L. (2003). Contrasting Visions of Multi-level Governance. En I. Bache & M. Flinders (Eds.), Multi-level Governance. Oxford University Press.", italic: true }]),
      bodyPara([{ text: "Smith, D. E. (2005). Institutional Ethnography: A Sociology for People. AltaMira Press.", italic: true }]),
      bodyPara([{ text: "Wasserman, S. & Faust, K. (1994). Social Network Analysis: Methods and Applications. Cambridge University Press.", italic: true }]),
    ]
  }]
});

// ── Write ──────────────────────────────────────────────────────────────
const outPath = "C:\\Users\\Osvaldo\\OneDrive\\Escritorio\\Proceso Final PLADECO\\Entregables Finales\\Analisis_Ejecutivo_SNA_PLADECO.docx";

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync(outPath, buffer);
  console.log("Document created successfully at: " + outPath);
  console.log("File size: " + (buffer.length / 1024).toFixed(1) + " KB");
}).catch(err => {
  console.error("Error creating document:", err);
  process.exit(1);
});
