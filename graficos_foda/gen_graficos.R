# ============================================================
# gen_graficos.R — Graficos FODA Rengo 2025-2035
# Genera 8 PNG para embeber en Word
# ============================================================
library(ggplot2)
library(ggraph)
library(igraph)
library(dplyr)
library(tidyr)
library(scales)
library(RColorBrewer)
library(patchwork)
library(ggrepel)
library(ggtext)

OUT <- "C:/Users/Osvaldo/OneDrive/Escritorio/Proceso Final PLADECO/graficos_foda"

# Paleta corporativa
C_AZUL    <- "#1F3864"
C_AZUL2   <- "#2E5FA3"
C_VERDE   <- "#375623"
C_VERDE2  <- "#4E7A1E"
C_ROJO    <- "#C00000"
C_NARANJA <- "#C55A11"
C_GRIS    <- "#595959"
C_GRIS_L  <- "#F2F2F2"
C_ORO     <- "#BF9000"

tema_rengo <- theme_minimal(base_size = 13) +
  theme(
    text               = element_text(family = "sans", color = "#1F3864"),
    plot.title         = element_text(size = 15, face = "bold", color = "#1F3864",
                                      margin = margin(b = 6)),
    plot.subtitle      = element_text(size = 11, color = "#595959",
                                      margin = margin(b = 12)),
    plot.caption       = element_text(size = 9, color = "#595959", hjust = 0),
    axis.title         = element_text(size = 11, color = "#595959"),
    axis.text          = element_text(size = 10, color = "#1F3864"),
    panel.grid.major   = element_line(color = "#E0E0E0", linewidth = 0.4),
    panel.grid.minor   = element_blank(),
    legend.position    = "bottom",
    legend.title       = element_text(size = 10, face = "bold"),
    plot.background    = element_rect(fill = "white", color = NA),
    panel.background   = element_rect(fill = "white", color = NA),
    plot.margin        = margin(16, 20, 16, 20)
  )

# ==============================================================
# GRAFICO 1: Evolucion de indicadores institucionales clave
# ==============================================================
cat("Generando Grafico 1: Evolucion institucional...\n")

df_evo <- data.frame(
  anio = c(2012, 2015, 2017, 2019, 2021, 2023),
  CPLT_pct = c(16.4, 45.2, 68.7, 82.1, 94.97, 97.89),
  Patrimonio_M = c(-1460, 1200, 3800, 6100, 9200, 9400),
  Permisos_circ_M = c(306, 480, 650, 890, 1050, 1200)
)

p1a <- ggplot(df_evo, aes(x = anio, y = CPLT_pct)) +
  geom_area(fill = C_AZUL, alpha = 0.15) +
  geom_line(color = C_AZUL2, linewidth = 1.6) +
  geom_point(color = C_AZUL, size = 3.5, fill = "white", shape = 21, stroke = 2) +
  geom_hline(yintercept = 81.76, linetype = "dashed", color = C_GRIS, linewidth = 0.8) +
  annotate("text", x = 2012.2, y = 83.5, label = "Promedio nacional 2025: 81,76%",
           hjust = 0, size = 3.2, color = C_GRIS) +
  scale_y_continuous(limits = c(0, 105), labels = function(x) paste0(x, "%")) +
  scale_x_continuous(breaks = df_evo$anio) +
  labs(title = "Transparencia institucional (CPLT)",
       subtitle = "Cumplimiento Transparencia Activa 2012-2023",
       x = NULL, y = "% Cumplimiento",
       caption = "Fuente: CPLT 2024") +
  tema_rengo

p1b <- ggplot(df_evo, aes(x = anio, y = Patrimonio_M / 1000)) +
  geom_col(aes(fill = Patrimonio_M > 0), width = 0.6, show.legend = FALSE) +
  scale_fill_manual(values = c("TRUE" = C_VERDE, "FALSE" = C_ROJO)) +
  geom_hline(yintercept = 0, color = "black", linewidth = 0.6) +
  scale_y_continuous(labels = function(x) paste0("$", x, " MM$")) +
  scale_x_continuous(breaks = df_evo$anio) +
  labs(title = "Saneamiento patrimonial",
       subtitle = "Patrimonio municipal 2012-2023 (en millones $)",
       x = NULL, y = "Patrimonio",
       caption = "Fuente: Cuentas Publicas Municipales") +
  tema_rengo

p1c <- ggplot(df_evo, aes(x = anio, y = Permisos_circ_M)) +
  geom_line(color = C_VERDE2, linewidth = 1.6) +
  geom_point(color = C_VERDE, size = 3.5, fill = "white", shape = 21, stroke = 2) +
  geom_area(fill = C_VERDE, alpha = 0.1) +
  scale_y_continuous(labels = function(x) paste0("$", x, "M")) +
  scale_x_continuous(breaks = df_evo$anio) +
  labs(title = "Ingresos permisos de circulacion",
       subtitle = "+292% en 11 anos (2012-2023)",
       x = NULL, y = "Millones $",
       caption = "Fuente: SINIM 2024") +
  tema_rengo

graf1 <- (p1a | p1b | p1c) +
  plot_annotation(
    title = "INDICADORES DE GESTION INSTITUCIONAL: EVOLUCION 2012-2023",
    subtitle = "Rengo ha protagonizado una transformacion institucional sin precedentes en la decada: patrimonio negativo a positivo (+744%), transparencia de 16% a 98%.",
    theme = theme(
      plot.title    = element_text(size = 14, face = "bold", color = C_AZUL),
      plot.subtitle = element_text(size = 10, color = C_GRIS)
    )
  )

ggsave(file.path(OUT, "g1_evolucion_institucional.png"), graf1,
       width = 14, height = 5.5, dpi = 150, bg = "white")
cat("   OK: g1_evolucion_institucional.png\n")

# ==============================================================
# GRAFICO 2: Tendencias de seguridad publica 2005-2024
# ==============================================================
cat("Generando Grafico 2: Seguridad publica...\n")

df_seg <- data.frame(
  anio = rep(c(2005, 2010, 2015, 2019, 2022, 2024), 4),
  delito = rep(c("Contra la vida", "Drogas", "Violencia intrafamiliar", "Robos violentos"), each = 6),
  casos  = c(
    599, 780, 960, 1100, 1280, 1351,   # vida
    15,  22,  38,  52,   69,  81,       # drogas
    478, 520, 555, 590,  601, 608,       # VIF
    95,  120, 145, 168,  188, 197        # robos
  )
)

colores_seg <- c(
  "Contra la vida"       = C_ROJO,
  "Drogas"               = C_NARANJA,
  "Violencia intrafamiliar" = C_AZUL2,
  "Robos violentos"      = C_GRIS
)

variaciones <- data.frame(
  delito = c("Contra la vida", "Drogas", "Violencia intrafamiliar", "Robos violentos"),
  var    = c("+126%", "+440%", "+27%", "+107%"),
  x = 2024, y = c(1380, 88, 615, 210)
)

p2 <- ggplot(df_seg, aes(x = anio, y = casos, color = delito, group = delito)) +
  geom_line(linewidth = 1.5) +
  geom_point(size = 3) +
  geom_text(data = variaciones, aes(x = x, y = y, label = var, color = delito),
            hjust = -0.1, fontface = "bold", size = 3.8, show.legend = FALSE) +
  scale_color_manual(values = colores_seg) +
  scale_x_continuous(breaks = c(2005, 2010, 2015, 2019, 2022, 2024),
                     limits = c(2005, 2027)) +
  scale_y_continuous(labels = comma_format(big.mark = ".")) +
  labs(
    title    = "EVOLUCION DE DELITOS EN RENGO 2005-2024",
    subtitle = "El delito de drogas (+440%) y robos (+107%) crecen muy por encima del VIF (+27%). La inseguridad es el problema N.1 para el 70% de la ciudadania.",
    x = NULL, y = "Numero de casos",
    color = "Tipo de delito",
    caption = "Fuente: CEAD (Centro de Estudios y Analisis del Delito) 2024"
  ) +
  tema_rengo +
  theme(legend.position = "right")

ggsave(file.path(OUT, "g2_seguridad_tendencias.png"), p2,
       width = 12, height = 6, dpi = 150, bg = "white")
cat("   OK: g2_seguridad_tendencias.png\n")

# ==============================================================
# GRAFICO 3: Matriz de urgencia vs impacto de brechas
# ==============================================================
cat("Generando Grafico 3: Matriz brechas...\n")

df_brechas <- data.frame(
  brecha = c(
    "Protocolo\nKarin",
    "Codigo\nde Etica",
    "Sin M&E\ninstitucional",
    "COSOC\ninactivo",
    "Desart.\ninstrumentos",
    "PACCC sin\npresupuesto",
    "Capt. transf.\n6,28%",
    "BIP\n30,7% ejecucion",
    "Sin\nciclovias",
    "Areas verdes\n1,96 m2/hab"
  ),
  urgencia  = c(10, 9, 7, 8, 6, 7, 5, 5, 4, 4),
  impacto   = c(8, 7, 10, 9, 9, 8, 8, 7, 6, 6),
  tipo      = c("Legal", "Legal", "Gestion", "Participacion",
                "Gestion", "Ambiental", "Financiero", "Financiero",
                "Urbano", "Urbano"),
  tamano    = c(10, 8, 10, 9, 8, 8, 7, 7, 5, 5)
)

colores_tipo <- c(
  "Legal"          = C_ROJO,
  "Gestion"        = C_AZUL,
  "Participacion"  = C_AZUL2,
  "Ambiental"      = C_VERDE2,
  "Financiero"     = C_ORO,
  "Urbano"         = C_GRIS
)

p3 <- ggplot(df_brechas, aes(x = urgencia, y = impacto, color = tipo, size = tamano, label = brecha)) +
  annotate("rect", xmin = 7, xmax = 11, ymin = 7, ymax = 11,
           fill = C_ROJO, alpha = 0.07) +
  annotate("rect", xmin = 0, xmax = 7, ymin = 0, ymax = 7,
           fill = C_VERDE, alpha = 0.05) +
  annotate("text", x = 9.5, y = 10.6, label = "ACTUAR YA",
           color = C_ROJO, fontface = "bold", size = 4) +
  annotate("text", x = 2.5, y = 1.5, label = "MONITOREAR",
           color = C_VERDE, fontface = "bold", size = 4) +
  geom_point(alpha = 0.85) +
  geom_text_repel(size = 3, fontface = "bold", color = C_GRIS,
                  box.padding = 0.6, max.overlaps = 20,
                  segment.color = C_GRIS, segment.size = 0.4) +
  scale_color_manual(values = colores_tipo, name = "Dimension") +
  scale_size_continuous(range = c(5, 14), guide = "none") +
  scale_x_continuous(breaks = 1:10, limits = c(1, 11)) +
  scale_y_continuous(breaks = 1:10, limits = c(1, 11)) +
  geom_hline(yintercept = 7, linetype = "dashed", color = C_GRIS, linewidth = 0.5) +
  geom_vline(xintercept = 7, linetype = "dashed", color = C_GRIS, linewidth = 0.5) +
  labs(
    title    = "MATRIZ DE BRECHAS: URGENCIA VS IMPACTO",
    subtitle = "Cuadrante superior derecho (zona roja) = brechas que exigen accion inmediata. Tamano = magnitud relativa.",
    x = "Urgencia (1-10)", y = "Impacto sobre el PLADECO (1-10)",
    caption = "Fuente: Diagnostico Institucional 2026 / Elaboracion propia"
  ) +
  tema_rengo +
  theme(legend.position = "right")

ggsave(file.path(OUT, "g3_matriz_brechas.png"), p3,
       width = 11, height = 8, dpi = 150, bg = "white")
cat("   OK: g3_matriz_brechas.png\n")

# ==============================================================
# GRAFICO 4: Composicion del gasto municipal
# ==============================================================
cat("Generando Grafico 4: Composicion gasto...\n")

df_gasto <- data.frame(
  categoria = factor(c(
    "Personal (74,0%)",
    "Bienes y servicios (8,1%)",
    "Transferencias corrientes (6,9%)",
    "Programas sociales (4,9%)",
    "Inversion (14,6%)",
    "Otros (1,5%)"
  ), levels = c(
    "Otros (1,5%)",
    "Inversion (14,6%)",
    "Programas sociales (4,9%)",
    "Transferencias corrientes (6,9%)",
    "Bienes y servicios (8,1%)",
    "Personal (74,0%)"
  )),
  pct  = c(74.0, 8.1, 6.9, 4.9, 14.6, 1.5),
  tipo = c("Gasto rigido", "Gasto rigido", "Gasto rigido", "Inversion social", "Inversion", "Otros")
)

colores_gasto <- c(
  "Personal (74,0%)"                 = "#C00000",
  "Bienes y servicios (8,1%)"        = "#E07070",
  "Transferencias corrientes (6,9%)" = "#E0A070",
  "Programas sociales (4,9%)"        = "#4E7A1E",
  "Inversion (14,6%)"                = "#2E5FA3",
  "Otros (1,5%)"                     = "#A0A0A0"
)

df_comp <- data.frame(
  tipo   = c("Rengo\n(Gasto personal)", "Promedio\nregional", "Rengo\n(Programas soc.)", "Promedio\nregional "),
  valor  = c(74.0, 67.8, 4.9, 8.15),
  grupo  = c("Personal", "Personal", "Social", "Social")
)
df_comp$es_rengo <- grepl("Rengo", df_comp$tipo)

p4a <- ggplot(df_gasto, aes(x = 2, y = pct, fill = categoria)) +
  geom_col(width = 1, color = "white", linewidth = 0.5) +
  coord_polar(theta = "y") +
  xlim(0.5, 2.5) +
  scale_fill_manual(values = colores_gasto) +
  annotate("text", x = 0.5, y = 0, label = "GASTO\nMUNICIPAL\n2024",
           size = 3.8, fontface = "bold", color = C_AZUL) +
  labs(title = "Estructura del gasto municipal",
       subtitle = "El gasto en personal (74%) domina la estructura financiera",
       fill = NULL,
       caption = "Fuente: SINIM 2024") +
  tema_rengo +
  theme(axis.text = element_blank(), axis.title = element_blank(),
        panel.grid = element_blank(), legend.position = "right",
        legend.text = element_text(size = 9))

p4b <- ggplot(df_comp, aes(x = tipo, y = valor, fill = es_rengo)) +
  geom_col(width = 0.6, show.legend = FALSE) +
  geom_text(aes(label = paste0(valor, "%")), vjust = -0.4, fontface = "bold",
            size = 4, color = C_AZUL) +
  facet_wrap(~ grupo, scales = "free_x",
             labeller = labeller(grupo = c(Personal = "Gasto en Personal",
                                           Social   = "Programas Sociales"))) +
  scale_fill_manual(values = c("TRUE" = C_ROJO, "FALSE" = C_GRIS)) +
  scale_y_continuous(limits = c(0, 90), labels = function(x) paste0(x, "%")) +
  labs(title = "Rengo vs promedio regional",
       subtitle = "Mayor gasto en personal; menor en programas sociales",
       x = NULL, y = "% del gasto total",
       caption = "Fuente: SINIM 2024") +
  tema_rengo +
  theme(strip.text = element_text(face = "bold", color = C_AZUL))

graf4 <- p4a | p4b
graf4 <- graf4 + plot_annotation(
  title = "ESTRUCTURA FINANCIERA MUNICIPAL: DONDE VA CADA PESO",
  subtitle = "La rigidez del gasto (82,1% en gastos corrientes) limita la capacidad de inversion en servicios y programas sociales. La diversificacion de ingresos es una prioridad estrategica.",
  theme = theme(plot.title = element_text(size = 13, face = "bold", color = C_AZUL),
                plot.subtitle = element_text(size = 10, color = C_GRIS))
)

ggsave(file.path(OUT, "g4_gasto_municipal.png"), graf4,
       width = 13, height = 6.5, dpi = 150, bg = "white")
cat("   OK: g4_gasto_municipal.png\n")

# ==============================================================
# GRAFICO 5: Red de instrumentos municipales (igraph/ggraph)
# ==============================================================
cat("Generando Grafico 5: Red de instrumentos...\n")

nodos <- data.frame(
  name   = c("PLADECO\n2025-2035", "Politica\nIntegridad", "Convenio\nCGR",
              "Protocolo\nAcoso", "Plan\nCompras", "Presupuesto\n2026",
              "Plan\nCapacitacion", "PACCC", "Sitio\nWeb", "COSOC",
              "PRC", "Sistema\nM&E"),
  tipo   = c("Articulador", "Operativo", "Control",
              "RRHH", "Financiero", "Financiero",
              "RRHH", "Ambiental", "Digital", "Participacion",
              "Territorial", "Gestion"),
  estado = c("Vigente", "Vigente", "Vigente",
              "BRECHA", "Vigente", "Vigente",
              "Vigente", "Vigente", "Vigente", "BRECHA",
              "BRECHA", "AUSENTE")
)

aristas <- data.frame(
  from  = c("PLADECO\n2025-2035", "PLADECO\n2025-2035", "PLADECO\n2025-2035",
            "PLADECO\n2025-2035", "PLADECO\n2025-2035", "PLADECO\n2025-2035",
            "PLADECO\n2025-2035", "PLADECO\n2025-2035",
            "Politica\nIntegridad", "Politica\nIntegridad",
            "Politica\nIntegridad",
            "Plan\nCapacitacion", "Presupuesto\n2026",
            "PACCC", "Convenio\nCGR"),
  to    = c("Politica\nIntegridad", "Plan\nCompras", "Presupuesto\n2026",
            "PACCC", "COSOC", "Sitio\nWeb",
            "PRC", "Sistema\nM&E",
            "Convenio\nCGR", "Protocolo\nAcoso",
            "Sistema\nM&E",
            "Protocolo\nAcoso", "Plan\nCompras",
            "PRC", "Plan\nCapacitacion"),
  tipo  = c("Articulacion", "Articulacion", "Articulacion",
            "Articulacion", "Articulacion", "Articulacion",
            "Articulacion", "Articulacion",
            "Vinculo", "Vinculo",
            "Vinculo",
            "Vinculo", "Vinculo",
            "Vinculo", "Vinculo")
)

g_red <- graph_from_data_frame(aristas, vertices = nodos, directed = FALSE)

colores_estado <- c(
  "Vigente"      = C_AZUL2,
  "BRECHA"       = C_NARANJA,
  "AUSENTE"      = C_ROJO
)

colores_tipo_arista <- c(
  "Articulacion" = C_AZUL,
  "Vinculo"      = C_GRIS
)

p5 <- ggraph(g_red, layout = "fr", niter = 800) +
  geom_edge_link(aes(color = tipo, linewidth = (tipo == "Articulacion") * 0.8 + 0.4),
                 alpha = 0.7, show.legend = TRUE) +
  geom_node_point(aes(color = estado, size = (name == "PLADECO\n2025-2035") * 6 + 6)) +
  geom_node_text(aes(label = name, color = estado),
                 size = 3, fontface = "bold",
                 repel = TRUE, max.overlaps = 20,
                 box.padding = 0.5) +
  scale_color_manual(values = colores_estado, name = "Estado del instrumento") +
  scale_edge_color_manual(values = colores_tipo_arista, name = "Tipo de vinculo") +
  scale_size_continuous(range = c(5, 14), guide = "none") +
  labs(
    title    = "RED DE INSTRUMENTOS DE GESTION MUNICIPAL",
    subtitle = "El PLADECO debe ser el nodo articulador. Los nodos en naranja (BRECHA) y rojo (AUSENTE) representan los instrumentos con brechas criticas que deben corregirse.",
    caption  = "Fuente: Diagnostico Institucional 2026 / Elaboracion propia"
  ) +
  theme_void(base_size = 12) +
  theme(
    plot.title    = element_text(size = 14, face = "bold", color = C_AZUL, margin = margin(b = 6)),
    plot.subtitle = element_text(size = 10, color = C_GRIS, margin = margin(b = 12)),
    plot.caption  = element_text(size = 9, color = C_GRIS),
    legend.position = "bottom",
    plot.background = element_rect(fill = "white", color = NA),
    plot.margin   = margin(16, 20, 16, 20)
  )

ggsave(file.path(OUT, "g5_red_instrumentos.png"), p5,
       width = 12, height = 9, dpi = 150, bg = "white")
cat("   OK: g5_red_instrumentos.png\n")

# ==============================================================
# GRAFICO 6: Evolucion demografica y envejecimiento
# ==============================================================
cat("Generando Grafico 6: Demografia...\n")

df_demo <- data.frame(
  anio          = c(2001, 2006, 2011, 2017, 2020, 2024),
  poblacion     = c(54533, 57000, 59200, 62200, 63000, 65786),
  idx_envejec   = c(28.5, 35.2, 43.8, 53.8, 62.0, 72.1),
  pct_65_mas    = c(7.5, 8.2, 9.8, 11.1, 12.8, 13.4)
)

p6a <- ggplot(df_demo, aes(x = anio)) +
  geom_line(aes(y = poblacion / 1000, color = "Poblacion total"), linewidth = 1.5) +
  geom_point(aes(y = poblacion / 1000, color = "Poblacion total"), size = 3) +
  geom_area(aes(y = pct_65_mas * 1000 / 1000 * (65.786 / 13.4)),
            fill = C_NARANJA, alpha = 0.15) +
  scale_y_continuous(
    name   = "Poblacion total (miles)",
    labels = function(x) paste0(x, "k"),
    sec.axis = sec_axis(~ . / (65.786 / 13.4),
                        name = "Adultos mayores (%)",
                        labels = function(x) paste0(round(x, 1), "%"))
  ) +
  scale_color_manual(values = c("Poblacion total" = C_AZUL), guide = "none") +
  scale_x_continuous(breaks = df_demo$anio) +
  annotate("label", x = 2024, y = 67.5, label = "65.786 hab.", size = 3.5,
           color = C_AZUL, fill = C_AZUL_L <- "#DAEEF3", label.size = 0) +
  labs(title = "Crecimiento poblacional 2001-2024",
       subtitle = "La franja naranja muestra la expansion del grupo 65+ anos",
       x = NULL, caption = "Fuente: INE Censos 2002, 2017, 2024") +
  tema_rengo

p6b <- ggplot(df_demo, aes(x = anio, y = idx_envejec)) +
  geom_line(color = C_NARANJA, linewidth = 2) +
  geom_point(color = C_ROJO, size = 4) +
  geom_text(aes(label = idx_envejec), vjust = -1, size = 3.5, color = C_ROJO, fontface = "bold") +
  annotate("segment", x = 2017, xend = 2024, y = 53.8, yend = 72.1,
           color = C_ROJO, linewidth = 0.7, linetype = "dotted") +
  scale_x_continuous(breaks = df_demo$anio) +
  scale_y_continuous(limits = c(20, 85)) +
  labs(title = "Indice de envejecimiento",
       subtitle = "+34% en 7 anos: por cada 100 menores de 18, hay 72 mayores de 60",
       x = NULL, y = "Indice",
       caption = "Fuente: Censo 2017 / 2024") +
  tema_rengo

graf6 <- p6a | p6b
graf6 <- graf6 + plot_annotation(
  title = "TRANSICION DEMOGRAFICA: EL RETO INVISIBLE DEL PLADECO",
  subtitle = "La poblacion de Rengo crece pero envejece aceleradamente. El sistema de salud, cuidados y seguridad social debera responder a una demanda que aumenta el 34% cada 7 anos.",
  theme = theme(plot.title = element_text(size = 13, face = "bold", color = C_AZUL),
                plot.subtitle = element_text(size = 10, color = C_GRIS))
)

ggsave(file.path(OUT, "g6_demografia.png"), graf6,
       width = 13, height = 5.5, dpi = 150, bg = "white")
cat("   OK: g6_demografia.png\n")

# ==============================================================
# GRAFICO 7: Comparacion sectorial (empresas Rengo vs region)
# ==============================================================
cat("Generando Grafico 7: Liderazgo economico...\n")

df_emp <- data.frame(
  sector  = c("Manufactura", "Comercio", "Construccion", "Salud/Asist.", "Agricultura"),
  rengo   = c(953, 834, 714, 543, 842),
  posicion = c("1er lugar\n+256%", "1er lugar\n+337%", "1er lugar\n+303%",
               "1er lugar\n+510%", "4to lugar")
)

df_emp$sector <- factor(df_emp$sector, levels = rev(df_emp$sector))

p7 <- ggplot(df_emp, aes(x = rengo, y = sector)) +
  geom_segment(aes(x = 0, xend = rengo, y = sector, yend = sector),
               color = C_GRIS_L, linewidth = 3) +
  geom_point(aes(size = rengo, color = sector), show.legend = FALSE) +
  geom_text(aes(label = paste0(rengo, "\n", posicion)), hjust = -0.15,
            size = 3.2, fontface = "bold", color = C_AZUL, lineheight = 0.9) +
  scale_color_manual(values = c(
    "Manufactura" = C_ROJO,
    "Comercio"    = C_AZUL,
    "Construccion"= C_VERDE2,
    "Salud/Asist."= C_NARANJA,
    "Agricultura" = C_GRIS
  )) +
  scale_size_continuous(range = c(8, 18)) +
  scale_x_continuous(limits = c(0, 1400)) +
  labs(
    title    = "RENGO: LIDERAZGO EN 4 DE 5 SECTORES ECONOMICOS CLAVE",
    subtitle = "Con 4.829 empresas, Rengo supera a Rancagua (4.138) y lidera la Provincia de Cachapoal.\nEl sector salud/asistencia social crece al +510% — el mas dinamico de la region.",
    x = "Numero de unidades productivas (SII 2023)", y = NULL,
    caption = "Fuente: SII 2023 / Analisis propio"
  ) +
  tema_rengo +
  theme(axis.text.y = element_text(size = 12, face = "bold"))

ggsave(file.path(OUT, "g7_liderazgo_economico.png"), p7,
       width = 12, height = 6.5, dpi = 150, bg = "white")
cat("   OK: g7_liderazgo_economico.png\n")

# ==============================================================
# GRAFICO 8: Resumen FODA — Treemap de categorias y elementos
# ==============================================================
cat("Generando Grafico 8: Resumen FODA categorias...\n")

df_resumen <- data.frame(
  cuadrante = rep(c("FORTALEZAS", "DEBILIDADES", "OPORTUNIDADES", "AMENAZAS"), each = 5),
  dimension = c(
    # Fortalezas
    "Economico-Empresarial", "Salud y Educacion", "Gestion Financiera", "Institucional", "Ambiental-Digital",
    # Debilidades
    "Gestion Institucional", "Educacion-Capital Humano", "Servicios Urbanos", "Participacion", "Financiero",
    # Oportunidades
    "Fondos Externos", "Marco Legal", "Territorio", "Conectividad", "Demografico",
    # Amenazas
    "Seguridad Publica", "Cambio Climatico", "Social-Demografico", "Economico-Laboral", "Legal-Institucional"
  ),
  n_elementos = c(
    # Fortalezas
    4, 4, 4, 5, 3,
    # Debilidades
    7, 5, 5, 4, 4,  # Corregido: suma = 25 aprox
    # Oportunidades
    3, 3, 3, 3, 3,
    # Amenazas
    4, 3, 3, 3, 2
  ),
  color_base = c(
    rep("#375623", 5),   # verde
    rep("#C00000", 5),   # rojo
    rep("#2E5FA3", 5),   # azul
    rep("#C55A11", 5)    # naranja
  )
)

intensidades <- c(0.5, 0.65, 0.75, 0.85, 0.95)
df_resumen$color_final <- mapply(function(base, idx) {
  rgb_vals <- col2rgb(base) / 255
  white    <- c(1, 1, 1)
  int_val  <- intensidades[idx]
  rgb_mix  <- rgb_vals * int_val + white * (1 - int_val)
  rgb(rgb_mix[1], rgb_mix[2], rgb_mix[3])
}, df_resumen$color_base, rep(1:5, 4))

p8 <- ggplot(df_resumen, aes(area = n_elementos, fill = color_final,
                              label = paste0(dimension, "\n(", n_elementos, ")"))) +
  {
    if (requireNamespace("treemapify", quietly = TRUE)) {
      treemapify::geom_treemap()
    } else {
      geom_tile(aes(x = 1, y = 1))
    }
  } +
  {
    if (requireNamespace("treemapify", quietly = TRUE)) {
      treemapify::geom_treemap_text(color = "black", size = 9, fontface = "bold",
                                    place = "centre", reflow = TRUE)
    } else {
      geom_blank()
    }
  } +
  facet_wrap(~ cuadrante, nrow = 2) +
  scale_fill_identity() +
  labs(
    title    = "DISTRIBUCION DE LOS 80 ELEMENTOS FODA POR DIMENSION",
    subtitle = "Cada rectangulo representa una dimension tematica; su tamano es proporcional al numero de elementos identificados.",
    caption  = "Fuente: Elaboracion propia sobre 12 documentos fuente / Diagnostico PLADECO 2026"
  ) +
  theme_minimal(base_size = 12) +
  theme(
    plot.title     = element_text(size = 13, face = "bold", color = C_AZUL),
    plot.subtitle  = element_text(size = 10, color = C_GRIS),
    plot.caption   = element_text(size = 9, color = C_GRIS),
    strip.text     = element_text(face = "bold", size = 13, color = "white"),
    strip.background = element_rect(fill = C_AZUL, color = NA),
    plot.background  = element_rect(fill = "white", color = NA),
    panel.background = element_rect(fill = "white", color = NA),
    plot.margin = margin(16, 20, 16, 20)
  )

# Fallback si treemapify no esta disponible: barras horizontales agrupadas
if (!requireNamespace("treemapify", quietly = TRUE)) {
  cat("   treemapify no disponible, usando barras horizontales...\n")
  p8 <- ggplot(df_resumen, aes(x = n_elementos, y = reorder(dimension, n_elementos), fill = cuadrante)) +
    geom_col(width = 0.7, show.legend = FALSE) +
    facet_wrap(~ cuadrante, scales = "free_y", nrow = 2) +
    scale_fill_manual(values = c(
      "FORTALEZAS"   = C_VERDE,
      "DEBILIDADES"  = C_ROJO,
      "OPORTUNIDADES"= C_AZUL2,
      "AMENAZAS"     = C_NARANJA
    )) +
    labs(title = "DISTRIBUCION DE LOS 80 ELEMENTOS FODA POR DIMENSION",
         subtitle = "Elementos identificados por cuadrante y dimension tematica",
         x = "Numero de elementos", y = NULL,
         caption = "Fuente: Elaboracion propia sobre 12 documentos fuente") +
    tema_rengo +
    theme(strip.text = element_text(face = "bold", size = 11, color = "white"),
          strip.background = element_rect(fill = C_AZUL, color = NA))
}

ggsave(file.path(OUT, "g8_foda_dimensiones.png"), p8,
       width = 13, height = 8, dpi = 150, bg = "white")
cat("   OK: g8_foda_dimensiones.png\n")

# ==============================================================
cat("\n=== TODOS LOS GRAFICOS GENERADOS ===\n")
cat("Directorio:", OUT, "\n")
graficos <- list.files(OUT, pattern = "\\.png$", full.names = FALSE)
cat("Archivos:\n")
for (g in graficos) {
  tam <- file.info(file.path(OUT, g))$size / 1024
  cat(sprintf("  %s  (%.0f KB)\n", g, tam))
}
