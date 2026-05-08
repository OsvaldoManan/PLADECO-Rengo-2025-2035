# ============================================================
# GRÁFICOS DE DESIGUALDAD TERRITORIAL - PORTAFOLIO BIP/SNI
# I. MUNICIPALIDAD DE RENGO - Enfoque Place-Based
# ============================================================
library(ggplot2)
library(dplyr)
library(readxl)
library(scales)
library(gridExtra)
library(forcats)
library(tidyr)
library(jsonlite)

# Paleta institucional
NAVY    <- "#1B3A6B"; CELESTE <- "#2980B9"; VERDE <- "#27AE60"
ROJO    <- "#C0392B"; NARANJA <- "#E67E22"; GOLD  <- "#F1C40F"
MORADO  <- "#8E44AD"; TEAL    <- "#16A085"; GRIS  <- "#7F8C8D"
GRIS_LT <- "#E8EDF2"; RURAL   <- "#2ECC71"; URBAN <- "#3498DB"

theme_rengo <- function(base_size = 11) {
  theme_minimal(base_size = base_size) +
    theme(
      plot.title    = element_text(face="bold", size=13, color=NAVY, hjust=0, margin=margin(b=5)),
      plot.subtitle = element_text(size=9, color=GRIS, hjust=0, margin=margin(b=10)),
      plot.caption  = element_text(size=7, color=GRIS, hjust=1, margin=margin(t=8)),
      axis.title    = element_text(size=9, color=GRIS),
      axis.text     = element_text(size=8, color="#444"),
      panel.grid.minor   = element_blank(),
      panel.grid.major.y = element_line(color=GRIS_LT, linewidth=0.5),
      panel.grid.major.x = element_blank(),
      legend.position    = "bottom",
      legend.text        = element_text(size=8),
      legend.title       = element_text(size=8, face="bold", color=NAVY),
      plot.background    = element_rect(fill="white", color=NA),
      panel.background   = element_rect(fill="white", color=NA),
      strip.text         = element_text(face="bold", color=NAVY, size=9)
    )
}

FOLDER <- "C:/Users/Osvaldo/OneDrive/Escritorio/Proceso Final PLADECO/Entregables Finales/Analisis_BIP_SNI_Rengo"
ind <- fromJSON(file.path(FOLDER, "indicadores_desigualdad.json"))
df  <- read_excel(file.path(FOLDER, "Proyectos_BIP_Georeferenciados_Rengo.xlsx"),
                   sheet = "BIP Georeferenciado")
df_des <- read_excel(file.path(FOLDER, "Proyectos_BIP_Georeferenciados_Rengo.xlsx"),
                      sheet = "Analisis Desigualdad", skip = 0)

# ============================================================
# G9: CURVA DE LORENZ (proyectos, inversión y per cápita)
# ============================================================
lorenz_df <- bind_rows(
  data.frame(x = ind$lorenz_proj[,1],  y = ind$lorenz_proj[,2],
              tipo = paste0("N° Proyectos (Gini=", sprintf("%.3f", ind$gini_proyectos), ")")),
  data.frame(x = ind$lorenz_costo[,1], y = ind$lorenz_costo[,2],
              tipo = paste0("Inversión Total (Gini=", sprintf("%.3f", ind$gini_inversion), ")")),
  data.frame(x = ind$lorenz_pc[,1],    y = ind$lorenz_pc[,2],
              tipo = paste0("Inversión Per Cápita (Gini=", sprintf("%.3f", ind$gini_percapita), ")"))
)
lorenz_df$tipo <- factor(lorenz_df$tipo, levels = unique(lorenz_df$tipo))

g9 <- ggplot(lorenz_df, aes(x = x, y = y, color = tipo)) +
  # Línea de perfecta igualdad
  geom_segment(aes(x = 0, y = 0, xend = 1, yend = 1),
                color = GRIS, linetype = "dashed", linewidth = 0.6, inherit.aes = FALSE) +
  geom_line(linewidth = 1.3) +
  geom_point(size = 1.8, alpha = 0.7) +
  scale_color_manual(values = c(NAVY, ROJO, NARANJA)) +
  scale_x_continuous(labels = percent_format(accuracy = 1), limits = c(0,1)) +
  scale_y_continuous(labels = percent_format(accuracy = 1), limits = c(0,1)) +
  annotate("text", x = 0.65, y = 0.73, label = "Línea de perfecta igualdad",
            color = GRIS, size = 2.8, fontface = "italic", angle = 32) +
  annotate("text", x = 0.22, y = 0.05,
            label = "Zona de concentración: pocas localidades\nacumulan gran parte de la inversión",
            color = ROJO, size = 2.5, fontface = "italic", hjust = 0) +
  labs(
    title    = "Curva de Lorenz — Desigualdad Territorial en el Portafolio BIP/SNI",
    subtitle = "Concentración acumulada de proyectos, inversión e inversión per cápita entre localidades",
    x = "% acumulado de localidades (ordenadas de menor a mayor)",
    y = "% acumulado de proyectos / inversión",
    color = NULL,
    caption = "Fuente: BIP/SNI — MDSF | Gini: 0 = perfecta igualdad, 1 = máxima concentración"
  ) +
  theme_rengo() +
  theme(legend.position = c(0.25, 0.85), legend.background = element_rect(fill = "white", color = GRIS_LT))

# ============================================================
# G10: INVERSIÓN PER CÁPITA POR LOCALIDAD
# ============================================================
df_pc <- data.frame(ind$localidades) %>%
  filter(!is.na(costo_percapita), tipo %in% c("Rural","Urbano")) %>%
  mutate(
    localidad = factor(localidad, levels = localidad[order(costo_percapita)]),
    costo_pc_MM = costo_percapita / 1000
  )

media_pc <- weighted.mean(df_pc$costo_percapita, df_pc$poblacion, na.rm = TRUE)

g10 <- ggplot(df_pc, aes(x = costo_pc_MM, y = localidad, fill = tipo)) +
  geom_col(width = 0.72) +
  geom_vline(xintercept = media_pc/1000, color = ROJO, linetype = "dashed", linewidth = 0.8) +
  annotate("text", x = media_pc/1000, y = 1,
            label = paste0("Media ponderada:\n", round(media_pc/1000,1), " MM$/hab"),
            hjust = -0.1, size = 2.8, color = ROJO, fontface = "italic") +
  geom_text(aes(label = paste0(format(round(costo_pc_MM,1), big.mark=".", decimal.mark=","), " MM$")),
             hjust = -0.15, size = 2.8, fontface = "bold", color = NAVY) +
  scale_fill_manual(values = c("Urbano" = URBAN, "Rural" = RURAL)) +
  scale_x_continuous(labels = function(x) paste0("$", format(x, big.mark=".", decimal.mark=",")),
                     expand = expansion(mult = c(0, 0.25))) +
  labs(
    title    = "Inversión Per Cápita por Localidad — Rengo 1997-2025",
    subtitle = "Costo total histórico BIP/SNI (MM$) dividido por población estimada de cada localidad",
    x = "Inversión per cápita (MM$/habitante)",
    y = NULL, fill = "Tipo territorial",
    caption = "Fuente: BIP/SNI — MDSF | Poblaciones: proyección Censo 2017 + Diagnóstico UV PLADECO 2025"
  ) +
  theme_rengo() + theme(legend.position = "top")

# ============================================================
# G11: PROYECTOS POR 1.000 HABITANTES (acceso territorial)
# ============================================================
df_proj_pc <- data.frame(ind$localidades) %>%
  filter(!is.na(n_percapita), tipo %in% c("Rural","Urbano")) %>%
  mutate(localidad = factor(localidad, levels = localidad[order(n_percapita)]))

g11 <- ggplot(df_proj_pc, aes(x = n_percapita, y = localidad, fill = tipo)) +
  geom_col(width = 0.72) +
  geom_text(aes(label = format(n_percapita, nsmall=1, big.mark=".", decimal.mark=",")),
             hjust = -0.2, size = 2.8, fontface = "bold", color = NAVY) +
  scale_fill_manual(values = c("Urbano" = URBAN, "Rural" = RURAL)) +
  scale_x_continuous(expand = expansion(mult = c(0, 0.2))) +
  labs(
    title    = "Proyectos BIP/SNI por cada 1.000 habitantes",
    subtitle = "Indicador de acceso territorial a la inversión pública histórica (29 años)",
    x = "N° de proyectos por 1.000 habitantes",
    y = NULL, fill = "Tipo",
    caption = "Una mayor tasa NO implica mejor atención: los proyectos rurales tienden a ser más atomizados que los urbanos."
  ) +
  theme_rengo() + theme(legend.position = "top")

# ============================================================
# G12: BRECHA URBANO-RURAL (panel de comparación)
# ============================================================
brecha_data <- data.frame(
  indicador = c("Población", "Proyectos", "Inversión (MM$)",
                  "Proyectos / 1.000 hab", "Inversión per cápita (MM$/hab)"),
  Urbano    = c(ind$urbano$poblacion_total, ind$urbano$proyectos_total,
                round(ind$urbano$inversion_total/1000, 0),
                round(ind$urbano$proyectos_per_mil, 2),
                round(ind$urbano$inversion_per_capita/1000, 2)),
  Rural     = c(ind$rural$poblacion_total, ind$rural$proyectos_total,
                round(ind$rural$inversion_total/1000, 0),
                round(ind$rural$proyectos_per_mil, 2),
                round(ind$rural$inversion_per_capita/1000, 2))
) %>% pivot_longer(cols = c(Urbano, Rural), names_to = "Tipo", values_to = "valor")

brecha_data$indicador <- factor(brecha_data$indicador, levels = unique(brecha_data$indicador))

g12 <- ggplot(brecha_data, aes(x = Tipo, y = valor, fill = Tipo)) +
  geom_col(width = 0.6) +
  geom_text(aes(label = format(valor, big.mark=".", decimal.mark=",", nsmall=0)),
             vjust = -0.4, size = 3, fontface = "bold", color = NAVY) +
  facet_wrap(~indicador, scales = "free_y", ncol = 3) +
  scale_fill_manual(values = c("Urbano" = URBAN, "Rural" = RURAL)) +
  scale_y_continuous(labels = function(x) format(x, big.mark=".", decimal.mark=","),
                     expand = expansion(mult = c(0, 0.15))) +
  labs(
    title    = "Brecha Urbano-Rural en el Portafolio BIP/SNI — Rengo",
    subtitle = "Comparación por cinco indicadores clave de acceso territorial a la inversión pública",
    x = NULL, y = NULL, fill = NULL,
    caption = "Fuente: BIP/SNI — MDSF | Urbano: 4 localidades / Rural: 15 localidades"
  ) +
  theme_rengo() +
  theme(legend.position = "top",
        strip.background = element_rect(fill = "#EAF1F8", color = NA),
        panel.grid.major.x = element_blank())

# ============================================================
# G13: HEATMAP SECTOR × LOCALIDAD (matriz de cobertura)
# ============================================================
df_heat <- df %>%
  filter(`TIPO TERRITORIAL` %in% c("Rural","Urbano")) %>%
  count(LOCALIDAD, SECTOR, name = "n")

# Solo top localidades y top sectores
top_locs <- df_heat %>% group_by(LOCALIDAD) %>% summarise(s=sum(n)) %>% arrange(desc(s)) %>% head(15) %>% pull(LOCALIDAD)
top_secs <- df_heat %>% group_by(SECTOR) %>% summarise(s=sum(n)) %>% arrange(desc(s)) %>% head(10) %>% pull(SECTOR)

df_heat_f <- df_heat %>%
  filter(LOCALIDAD %in% top_locs, SECTOR %in% top_secs) %>%
  complete(LOCALIDAD = top_locs, SECTOR = top_secs, fill = list(n = 0))

g13 <- ggplot(df_heat_f, aes(x = SECTOR, y = factor(LOCALIDAD, levels = rev(top_locs)), fill = n)) +
  geom_tile(color = "white", linewidth = 0.5) +
  geom_text(aes(label = ifelse(n > 0, n, "")),
             color = ifelse(df_heat_f$n > 20, "white", NAVY),
             size = 2.8, fontface = "bold") +
  scale_fill_gradient2(low = "#F2F8FB", mid = CELESTE, high = NAVY,
                        midpoint = 15, name = "N° Proy.") +
  labs(
    title    = "Matriz de Cobertura Sectorial × Territorial",
    subtitle = "N° de proyectos BIP/SNI por combinación sector-localidad (top 10 sectores × top 15 localidades)",
    x = NULL, y = NULL,
    caption = "Celdas vacías indican sectores sin intervención registrada en esa localidad durante 1997-2025."
  ) +
  theme_rengo() +
  theme(axis.text.x = element_text(angle = 35, hjust = 1, size = 7.5),
        axis.text.y = element_text(size = 8),
        panel.grid = element_blank(),
        legend.position = "right")

# ============================================================
# G14: MAPA CON BURBUJAS DE INVERSIÓN PER CÁPITA
# ============================================================
df_mapa <- data.frame(ind$localidades) %>%
  filter(!is.na(lat), !is.na(lon), !is.na(costo_percapita), tipo %in% c("Rural","Urbano")) %>%
  mutate(costo_pc_MM = costo_percapita / 1000)

XMIN <- -71.00; XMAX <- -70.75; YMIN <- -34.52; YMAX <- -34.25

g14 <- ggplot() +
  annotate("rect", xmin = XMIN, xmax = XMAX, ymin = YMIN, ymax = YMAX,
            fill = "#F0F7FC", color = "#AACCE4", linewidth = 0.5) +
  # Grilla de referencia
  annotate("segment", x = seq(XMIN, XMAX, 0.05), xend = seq(XMIN, XMAX, 0.05),
            y = YMIN, yend = YMAX, color = "#D7E8F2", linewidth = 0.3) +
  annotate("segment", y = seq(YMIN, YMAX, 0.05), yend = seq(YMIN, YMAX, 0.05),
            x = XMIN, xend = XMAX, color = "#D7E8F2", linewidth = 0.3) +
  geom_point(data = df_mapa,
              aes(x = as.numeric(lon), y = as.numeric(lat),
                  size = costo_pc_MM, color = tipo),
              alpha = 0.72) +
  geom_text(data = df_mapa,
             aes(x = as.numeric(lon), y = as.numeric(lat) + 0.009,
                 label = paste0(localidad, "\n", round(costo_pc_MM,1), " MM$/hab")),
             size = 2.3, color = NAVY, fontface = "bold", lineheight = 0.85) +
  scale_color_manual(values = c("Urbano" = URBAN, "Rural" = RURAL)) +
  scale_size_continuous(range = c(3, 18), name = "Inversión\nper cápita\n(MM$/hab)") +
  coord_fixed(ratio = 1.2, xlim = c(XMIN, XMAX), ylim = c(YMIN, YMAX)) +
  labs(
    title    = "Mapa de Inversión Per Cápita Acumulada (1997-2025)",
    subtitle = "Tamaño de burbuja proporcional a inversión BIP/SNI por habitante en cada localidad",
    x = "Longitud", y = "Latitud", color = "Tipo",
    caption = "Fuente: BIP/SNI — MDSF | Georreferenciación por centroide de localidad"
  ) +
  theme_rengo() +
  theme(axis.text = element_text(size = 7),
        legend.position = "right",
        panel.grid = element_blank())

# ============================================================
# G15: CONCENTRACIÓN SECTORIAL (curva de Pareto)
# ============================================================
df_sec_pareto <- df %>%
  count(SECTOR, name = "n") %>%
  arrange(desc(n)) %>%
  mutate(
    pct = n / sum(n) * 100,
    pct_cum = cumsum(pct),
    SECTOR = factor(SECTOR, levels = SECTOR)
  )

g15 <- ggplot(df_sec_pareto, aes(x = SECTOR)) +
  geom_col(aes(y = n), fill = CELESTE, width = 0.65) +
  geom_text(aes(y = n, label = n), vjust = -0.4, size = 2.8, fontface = "bold", color = NAVY) +
  geom_line(aes(y = pct_cum * max(n) / 100, group = 1), color = ROJO, linewidth = 1.1) +
  geom_point(aes(y = pct_cum * max(n) / 100), color = ROJO, size = 2.5) +
  geom_text(aes(y = pct_cum * max(n) / 100,
                  label = paste0(round(pct_cum, 0), "%")),
             vjust = -1, size = 2.6, color = ROJO, fontface = "bold") +
  geom_hline(yintercept = 0.8 * max(df_sec_pareto$n), linetype = "dashed",
              color = GRIS, alpha = 0.7) +
  scale_y_continuous(
    name = "N° Proyectos",
    sec.axis = sec_axis(~ . / max(df_sec_pareto$n) * 100,
                         name = "% Acumulado", labels = function(x) paste0(x, "%"))
  ) +
  labs(
    title    = "Análisis de Pareto — Concentración Sectorial del Portafolio",
    subtitle = "80% de los proyectos se concentran en los primeros sectores (línea punteada gris)",
    x = NULL,
    caption = "Fuente: BIP/SNI — MDSF | Línea roja: % acumulado de proyectos"
  ) +
  theme_rengo() +
  theme(axis.text.x = element_text(angle = 35, hjust = 1, size = 7.5),
        axis.title.y.right = element_text(color = ROJO),
        axis.text.y.right  = element_text(color = ROJO))

# ============================================================
# EXPORTAR
# ============================================================
save_plot <- function(plot, name, w = 1400, h = 800) {
  path <- file.path(FOLDER, paste0(name, ".png"))
  png(path, width = w, height = h, res = 120)
  print(plot)
  dev.off()
  cat("Guardado:", basename(path), "\n")
}

save_plot(g9,  "BIP_09_Curva_Lorenz", w = 1400, h = 900)
save_plot(g10, "BIP_10_Inversion_PerCapita", w = 1400, h = 900)
save_plot(g11, "BIP_11_Proyectos_por_Mil_Hab", w = 1400, h = 900)
save_plot(g12, "BIP_12_Brecha_Urbano_Rural", w = 1600, h = 900)
save_plot(g13, "BIP_13_Heatmap_Sector_Localidad", w = 1600, h = 900)
save_plot(g14, "BIP_14_Mapa_Inversion_PerCapita", w = 1600, h = 1100)
save_plot(g15, "BIP_15_Pareto_Sectorial", w = 1500, h = 900)

# Panel integrado de desigualdad
png(file.path(FOLDER, "BIP_PANEL_DESIGUALDAD.png"), width = 2200, height = 1700, res = 120)
grid.arrange(g9, g12, g10, g13,
  ncol = 2,
  top  = grid::textGrob(
    "DESIGUALDADES TERRITORIALES EN EL PORTAFOLIO BIP/SNI — COMUNA DE RENGO (1997-2025)",
    gp = grid::gpar(fontface = "bold", fontsize = 14, col = NAVY)
  ))
dev.off()
cat("Panel desigualdad guardado\n")

cat("\nGraficos de desigualdad generados exitosamente.\n")
