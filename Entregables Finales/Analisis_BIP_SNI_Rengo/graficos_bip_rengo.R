# ============================================================
# ANÁLISIS ESPACIAL Y ESTADÍSTICO DE PROYECTOS BIP/SNI
# I. MUNICIPALIDAD DE RENGO — 1997-2025
# Fuente: Banco Integrado de Proyectos (BIP/SNI) — MDSF
# ============================================================

library(ggplot2)
library(dplyr)
library(readxl)
library(scales)
library(gridExtra)
library(forcats)
library(RColorBrewer)

# --- Paleta institucional Rengo ---
COL_NAVY    <- "#1B3A6B"
COL_CELESTE <- "#2980B9"
COL_VERDE   <- "#27AE60"
COL_ROJO    <- "#C0392B"
COL_GRIS    <- "#7F8C8D"
COL_NARANJA <- "#E67E22"
COL_GOLD    <- "#F1C40F"
COL_MORADO  <- "#8E44AD"
COL_TEAL    <- "#16A085"

# --- Paleta por sector ---
SECTOR_COLORS <- c(
  "Educación y Cultura"   = "#2980B9",
  "Transporte y Vialidad" = "#27AE60",
  "Recursos Hídricos"     = "#1B3A6B",
  "Multisectorial"        = "#8E44AD",
  "Salud"                 = "#E74C3C",
  "Deporte"               = "#16A085",
  "Justicia y Seguridad"  = "#E67E22",
  "Vivienda y Urbanismo"  = "#F39C12",
  "Energía"               = "#27AE60",
  "Seguridad Pública"     = "#C0392B",
  "Medioambiente"         = "#2ECC71",
  "Turismo y Comercio"    = "#F1C40F"
)

# --- Tema corporativo ---
theme_rengo <- function(base_size = 11) {
  theme_minimal(base_size = base_size) +
    theme(
      plot.title      = element_text(face = "bold", size = 13, color = COL_NAVY, hjust = 0, margin = margin(b = 5)),
      plot.subtitle   = element_text(size = 9, color = COL_GRIS, hjust = 0, margin = margin(b = 10)),
      plot.caption    = element_text(size = 7, color = COL_GRIS, hjust = 1, margin = margin(t = 8)),
      axis.title      = element_text(size = 9, color = COL_GRIS),
      axis.text       = element_text(size = 8, color = "#444444"),
      panel.grid.major.x = element_blank(),
      panel.grid.minor   = element_blank(),
      panel.grid.major.y = element_line(color = "#E8EDF2", linewidth = 0.5),
      legend.position    = "bottom",
      legend.text        = element_text(size = 8),
      legend.title       = element_blank(),
      plot.background    = element_rect(fill = "white", color = NA),
      panel.background   = element_rect(fill = "white", color = NA),
      strip.text         = element_text(face = "bold", color = COL_NAVY, size = 9)
    )
}

# ============================================================
# CARGAR DATOS
# ============================================================
bip_path <- "C:/Users/Osvaldo/OneDrive/Escritorio/Proceso Final PLADECO/Entregables Finales/Proyectos_BIP_Georeferenciados_Rengo.xlsx"
df       <- read_excel(bip_path, sheet = "BIP Georeferenciado")
df_sec   <- read_excel(bip_path, sheet = "Resumen Sector")
df_loc   <- read_excel(bip_path, sheet = "Resumen Localidad")
df_yr    <- read_excel(bip_path, sheet = "Resumen Año")
df_src   <- read_excel(bip_path, sheet = "Resumen Fuente")

cat("Proyectos cargados:", nrow(df), "\n")

# Limpiar año
df$AÑO_NUM <- as.integer(df$AÑO)
df_yr$AÑO_NUM <- as.integer(df_yr$AÑO)
df_yr_clean <- df_yr %>% filter(!is.na(AÑO_NUM)) %>% arrange(AÑO_NUM)

# ============================================================
# GRÁFICO 1: PROYECTOS POR SECTOR (barras horizontales)
# ============================================================
g1 <- df_sec %>%
  filter(!is.na(SECTOR)) %>%
  arrange(desc(`N° PROYECTOS`)) %>%
  mutate(SECTOR = factor(SECTOR, levels = rev(SECTOR))) %>%
  ggplot(aes(x = `N° PROYECTOS`, y = SECTOR, fill = SECTOR)) +
  geom_col(width = 0.7, show.legend = FALSE) +
  geom_text(aes(label = paste0(`N° PROYECTOS`, " (", `% PROYECTOS`, "%)")),
            hjust = -0.1, size = 3, fontface = "bold", color = COL_NAVY) +
  scale_fill_manual(values = SECTOR_COLORS) +
  scale_x_continuous(expand = expansion(mult = c(0, 0.18))) +
  labs(
    title    = "Proyectos BIP/SNI por Sector — Rengo 1997–2025",
    subtitle = paste0("Total: ", nrow(df), " proyectos registrados en el Banco Integrado de Proyectos"),
    x = "N° de Proyectos",
    y = NULL,
    caption = "Fuente: BIP/SNI — MDSF | Elaboración: Municipalidad de Rengo, PLADECO 2025-2035"
  ) +
  theme_rengo()

# ============================================================
# GRÁFICO 2: EVOLUCIÓN HISTÓRICA DE PROYECTOS (1997–2025)
# ============================================================
g2 <- df_yr_clean %>%
  ggplot(aes(x = AÑO_NUM, y = `N° PROYECTOS`)) +
  geom_area(fill = COL_CELESTE, alpha = 0.25) +
  geom_line(color = COL_NAVY, linewidth = 1.2) +
  geom_point(color = COL_NAVY, size = 2.5) +
  geom_smooth(method = "loess", se = FALSE, color = COL_ROJO,
              linewidth = 0.8, linetype = "dashed") +
  scale_x_continuous(breaks = seq(1997, 2025, 4)) +
  scale_y_continuous(breaks = scales::pretty_breaks()) +
  labs(
    title    = "Evolución Histórica de Proyectos BIP/SNI — Rengo",
    subtitle = "Número de proyectos ingresados por año de postulación (1997–2025)",
    x = "Año de Postulación",
    y = "N° de Proyectos",
    caption = "Fuente: BIP/SNI — MDSF | Línea discontinua: tendencia LOESS"
  ) +
  theme_rengo() +
  theme(panel.grid.major.x = element_line(color = "#E8EDF2", linewidth = 0.3))

# ============================================================
# GRÁFICO 3: INVERSIÓN POR SECTOR (millones de pesos)
# ============================================================
g3 <- df_sec %>%
  filter(!is.na(SECTOR), `COSTO TOTAL [M$]` > 0) %>%
  arrange(desc(`COSTO TOTAL [M$]`)) %>%
  mutate(
    SECTOR = factor(SECTOR, levels = rev(SECTOR)),
    COSTO_MM = `COSTO TOTAL [M$]` / 1000  # convertir a MM$
  ) %>%
  ggplot(aes(x = COSTO_MM, y = SECTOR, fill = SECTOR)) +
  geom_col(width = 0.7, show.legend = FALSE) +
  geom_text(aes(label = paste0("$", format(round(COSTO_MM), big.mark = ".", decimal.mark = ","), "MM")),
            hjust = -0.1, size = 2.8, fontface = "bold", color = COL_NAVY) +
  scale_fill_manual(values = SECTOR_COLORS) +
  scale_x_continuous(
    labels = function(x) paste0("$", format(x, big.mark = ".", decimal.mark = ",")),
    expand = expansion(mult = c(0, 0.25))
  ) +
  labs(
    title    = "Inversión Total por Sector (MM$) — Rengo 1997–2025",
    subtitle = "Costo total acumulado de proyectos BIP/SNI en millones de pesos",
    x = "Inversión Total (MM$)",
    y = NULL,
    caption = "Fuente: BIP/SNI — MDSF | MM$ = Miles de Millones de Pesos"
  ) +
  theme_rengo()

# ============================================================
# GRÁFICO 4: DISTRIBUCIÓN POR FUENTE DE FINANCIAMIENTO
# ============================================================
fuente_totales <- df_src %>%
  filter(!is.na(`FUENTE FINANCIERA`)) %>%
  arrange(desc(`N° PROYECTOS`)) %>%
  head(6)

g4_colors <- c(COL_NAVY, COL_CELESTE, "#5DADE2", COL_VERDE, COL_NARANJA, COL_MORADO)

g4 <- fuente_totales %>%
  mutate(
    `FUENTE FINANCIERA` = factor(`FUENTE FINANCIERA`,
                                  levels = rev(`FUENTE FINANCIERA`))
  ) %>%
  ggplot(aes(x = `N° PROYECTOS`, y = `FUENTE FINANCIERA`, fill = `FUENTE FINANCIERA`)) +
  geom_col(width = 0.65, show.legend = FALSE) +
  geom_text(
    aes(label = paste0(`N° PROYECTOS`, " (", `% PROYECTOS`, "%)")),
    hjust = -0.1, size = 3, fontface = "bold", color = COL_NAVY
  ) +
  scale_fill_manual(values = setNames(g4_colors, rev(fuente_totales$`FUENTE FINANCIERA`))) +
  scale_x_continuous(expand = expansion(mult = c(0, 0.2))) +
  labs(
    title    = "Proyectos por Fuente de Financiamiento — Rengo",
    subtitle = "Principales fuentes de financiamiento del portafolio BIP/SNI",
    x = "N° de Proyectos",
    y = NULL,
    caption = "Fuente: BIP/SNI — MDSF | FNDR: Fondo Nacional de Desarrollo Regional"
  ) +
  theme_rengo()

# ============================================================
# GRÁFICO 5: TOP LOCALIDADES CON MÁS PROYECTOS
# ============================================================
g5 <- df_loc %>%
  filter(!is.na(LOCALIDAD), !grepl("comunal", LOCALIDAD, ignore.case = TRUE)) %>%
  arrange(desc(`N° PROYECTOS`)) %>%
  head(12) %>%
  mutate(
    LOCALIDAD = fct_reorder(LOCALIDAD, `N° PROYECTOS`),
    TIPO_COLOR = ifelse(`TIPO TERRITORIAL` == "Rural", COL_VERDE, COL_CELESTE)
  ) %>%
  ggplot(aes(x = `N° PROYECTOS`, y = LOCALIDAD, fill = `TIPO TERRITORIAL`)) +
  geom_col(width = 0.7) +
  geom_text(aes(label = `N° PROYECTOS`), hjust = -0.3, size = 3, fontface = "bold", color = COL_NAVY) +
  scale_fill_manual(values = c("Rural" = COL_VERDE, "Urbano" = COL_CELESTE, "Comunal" = COL_GRIS)) +
  scale_x_continuous(expand = expansion(mult = c(0, 0.18))) +
  labs(
    title    = "Proyectos BIP/SNI por Localidad — Rengo",
    subtitle = "Top 12 localidades con mayor número de proyectos (excluye ámbito comunal)",
    x = "N° de Proyectos",
    y = NULL,
    fill = "Tipo Territorial",
    caption = "Fuente: BIP/SNI — MDSF | Localización extraída de descripción del proyecto"
  ) +
  theme_rengo() +
  theme(legend.position = "right")

# ============================================================
# GRÁFICO 6: MAPA DE PUNTOS CON ggplot2 (distribución espacial)
# ============================================================
# Contar proyectos por coordenada
df_geo <- df %>%
  filter(!is.na(LATITUD), !is.na(LONGITUD)) %>%
  group_by(LOCALIDAD, LATITUD, LONGITUD, SECTOR) %>%
  summarise(n = n(), costo = sum(`COSTO TOTAL [M$]`, na.rm = TRUE), .groups = "drop") %>%
  arrange(desc(n))

# Bounding box de la comuna
XMIN <- -71.0; XMAX <- -70.75
YMIN <- -34.52; YMAX <- -34.25

g6 <- ggplot() +
  # Fondo de mapa (rectángulo de la comuna)
  annotate("rect", xmin = XMIN, xmax = XMAX, ymin = YMIN, ymax = YMAX,
           fill = "#EAF4FB", color = "#AACCE4", linewidth = 0.5) +
  # Grid de referencia
  annotate("segment", x = seq(XMIN, XMAX, 0.05), xend = seq(XMIN, XMAX, 0.05),
           y = YMIN, yend = YMAX, color = "#D0E8F5", linewidth = 0.3) +
  annotate("segment", y = seq(YMIN, YMAX, 0.05), yend = seq(YMIN, YMAX, 0.05),
           x = XMIN, xend = XMAX, color = "#D0E8F5", linewidth = 0.3) +
  # Puntos de proyectos por sector
  geom_point(data = df_geo,
             aes(x = LONGITUD, y = LATITUD, color = SECTOR, size = n),
             alpha = 0.75) +
  # Etiquetas de localidades con más proyectos
  geom_text(data = df_geo %>% filter(n >= 10),
            aes(x = LONGITUD, y = LATITUD + 0.008, label = LOCALIDAD),
            size = 2.5, fontface = "bold", color = COL_NAVY) +
  scale_color_manual(values = SECTOR_COLORS) +
  scale_size_continuous(range = c(2, 12), name = "N° Proyectos") +
  coord_fixed(ratio = 1.2, xlim = c(XMIN, XMAX), ylim = c(YMIN, YMAX)) +
  labs(
    title    = "Distribución Espacial de Proyectos BIP/SNI — Comuna de Rengo",
    subtitle = "Georreferenciación por localidad. Tamaño proporcional al número de proyectos.",
    x = "Longitud",
    y = "Latitud",
    color = "Sector",
    caption = "Fuente: BIP/SNI — MDSF | Coordenadas basadas en centroide de localidad"
  ) +
  theme_rengo() +
  theme(
    panel.grid.major.x = element_line(color = "#D0E8F5", linewidth = 0.3),
    panel.grid.major.y = element_line(color = "#D0E8F5", linewidth = 0.3),
    legend.position    = "right",
    axis.text          = element_text(size = 7),
    legend.key.size    = unit(0.5, "cm"),
    legend.text        = element_text(size = 7)
  )

# ============================================================
# GRÁFICO 7: COSTO ACUMULADO POR AÑO (tendencia de inversión)
# ============================================================
df_yr_inv <- df_yr_clean %>%
  filter(!is.na(`COSTO TOTAL [M$]`)) %>%
  mutate(COSTO_MM = `COSTO TOTAL [M$]` / 1000)

g7 <- df_yr_inv %>%
  ggplot(aes(x = AÑO_NUM, y = COSTO_MM)) +
  geom_col(aes(fill = COSTO_MM > 0), show.legend = FALSE, width = 0.8) +
  scale_fill_manual(values = c("TRUE" = COL_CELESTE)) +
  geom_smooth(method = "loess", se = TRUE, color = COL_ROJO, fill = "#FDECEC",
              linewidth = 0.9, linetype = "dashed") +
  scale_x_continuous(breaks = seq(1997, 2025, 4)) +
  scale_y_continuous(
    labels = function(x) paste0("$", format(round(x), big.mark = ".", decimal.mark = ",")),
    expand = expansion(mult = c(0, 0.1))
  ) +
  labs(
    title    = "Inversión BIP/SNI por Año de Postulación — Rengo",
    subtitle = "Costo total de proyectos (MM$) según año de postulación. Línea: tendencia LOESS.",
    x = "Año de Postulación",
    y = "Inversión Total (MM$)",
    caption = "Fuente: BIP/SNI — MDSF | Valores en Miles de Millones de Pesos (MM$)"
  ) +
  theme_rengo() +
  theme(panel.grid.major.x = element_line(color = "#E8EDF2", linewidth = 0.3))

# ============================================================
# GRÁFICO 8: ETAPAS ACTUALES DE PROYECTOS
# ============================================================
etapa_df <- df %>%
  filter(!is.na(`ETAPA ACTUAL`)) %>%
  count(`ETAPA ACTUAL`, name = "n") %>%
  arrange(desc(n)) %>%
  mutate(`ETAPA ACTUAL` = fct_reorder(`ETAPA ACTUAL`, n))

etapa_colors <- colorRampPalette(c("#AED6F1", COL_NAVY))(nrow(etapa_df))

g8 <- ggplot(etapa_df, aes(x = n, y = `ETAPA ACTUAL`, fill = `ETAPA ACTUAL`)) +
  geom_col(width = 0.65, show.legend = FALSE) +
  geom_text(aes(label = n), hjust = -0.3, size = 3, fontface = "bold", color = COL_NAVY) +
  scale_fill_manual(values = setNames(etapa_colors, levels(etapa_df$`ETAPA ACTUAL`))) +
  scale_x_continuous(expand = expansion(mult = c(0, 0.18))) +
  labs(
    title    = "Estado Actual de Proyectos BIP/SNI — Rengo",
    subtitle = "Distribución del portafolio comunal por etapa actual en el sistema",
    x = "N° de Proyectos",
    y = NULL,
    caption = "Fuente: BIP/SNI — MDSF | Datos al cierre del período 1997-2025"
  ) +
  theme_rengo()

# ============================================================
# EXPORTAR GRÁFICOS
# ============================================================
out_dir <- "C:/Users/Osvaldo/OneDrive/Escritorio/Proceso Final PLADECO/Entregables Finales"

save_plot <- function(plot, name, w = 1400, h = 800) {
  path <- file.path(out_dir, paste0(name, ".png"))
  png(path, width = w, height = h, res = 120)
  print(plot)
  dev.off()
  cat("Guardado:", path, "\n")
}

save_plot(g1, "BIP_01_Proyectos_por_Sector")
save_plot(g2, "BIP_02_Evolucion_Historica")
save_plot(g3, "BIP_03_Inversion_por_Sector")
save_plot(g4, "BIP_04_Fuente_Financiamiento")
save_plot(g5, "BIP_05_Proyectos_por_Localidad")
save_plot(g6, "BIP_06_Mapa_Espacial", w = 1600, h = 1000)
save_plot(g7, "BIP_07_Inversion_por_Año")
save_plot(g8, "BIP_08_Etapa_Actual")

# --- Panel resumen (4 gráficos en una página) ---
png(file.path(out_dir, "BIP_PANEL_RESUMEN.png"), width = 2200, height = 1600, res = 120)
grid.arrange(g1, g4, g3, g5,
  ncol = 2,
  top  = grid::textGrob(
    "ANÁLISIS DE PROYECTOS BIP/SNI — I. MUNICIPALIDAD DE RENGO (1997-2025)",
    gp = grid::gpar(fontface = "bold", fontsize = 14, col = COL_NAVY)
  ))
dev.off()
cat("Panel resumen guardado\n")

cat("\nTodos los graficos generados exitosamente.\n")
