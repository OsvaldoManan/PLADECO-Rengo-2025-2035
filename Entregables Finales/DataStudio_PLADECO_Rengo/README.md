# Base de Datos PLADECO Rengo · Looker Studio (Data Studio)

**Ilustre Municipalidad de Rengo · SECPLA · PLADECO 2025-2035**
Fecha de generación: Abril 2026 · Versión 1.0

---

## 1. Propósito del dataset

Esta base de datos consolida toda la información cuantitativa producida durante el proceso de elaboración del PLADECO 2025-2035, organizada en un esquema relacional tipo **estrella** (dimensiones + hechos) optimizado para **Looker Studio (Data Studio)** y otras herramientas BI.

**Total: 15 tablas · 12.436 filas**

Permite construir cuadros de mando para:
- Mapas temáticos territoriales (BIP, encuestas, indicadores)
- Comparativas por localidad / unidad vecinal
- Seguimiento de metas LB 2024 → 2028 → 2035
- Cruces entre fuentes (BIP + encuestas + matriz SUBDERE)
- Tableros de desigualdad y equidad territorial

---

## 2. Modelo de datos (esquema estrella)

```
                       ┌───────────────────────┐
                       │   dim_localidades     │ ◄──────┐
                       │   (21 UV + 4 alias)   │        │
                       └───────────┬───────────┘        │
                                   │                    │
        ┌──────────────────────────┼────────────────────┘
        │                          │
        │       ┌──────────────────▼──────────────────┐
        │       │       fact_proyectos_bip            │   1.182 filas
        │       │  (BIP/SNI 1997-2025 georref.)       │
        │       └─────────────────────────────────────┘
        │
        │       ┌─────────────────────────────────────┐
        ├───────►       fact_acciones_pladeco        │   225 filas
        │       │      (Matriz SUBDERE)               │
        │       └─────────────────────────────────────┘
        │
        │       ┌─────────────────────────────────────┐
        ├───────►   fact_encuesta_nna_wide / long    │   21 / 1.057 filas
        │       │   fact_encuesta_ciudadana_wide/long │   119 / 9.166 filas
        │       └─────────────────────────────────────┘
        │
        │       ┌─────────────────────────────────────┐
        ├───────►   fact_diagnostico_infancia         │   31 filas
        │       │   (KPIs Censo 4.036 NNA)            │
        │       └─────────────────────────────────────┘
        │
        │       ┌─────────────────────────────────────┐
        ├───────►   fact_indicadores_desigualdad      │   12 filas
        │       │   fact_metas_seguimiento             │   16 filas
        │       └─────────────────────────────────────┘
        │
        │       ┌─────────────────────────────────────┐
        └───────►   fact_uv_resumen / geo_puntos      │   25 / 525 filas
                └─────────────────────────────────────┘

                ┌──────────────────────┐  ┌──────────────────────┐
                │   dim_ejes_pladeco   │  │   dim_sectores_bip   │
                │   (6 ejes)           │  │   (12 sectores)      │
                └──────────────────────┘  └──────────────────────┘
```

---

## 3. Catálogo de tablas

### 🔵 Dimensiones (lookup)

| Tabla | Filas | Descripción | Clave |
|---|---|---|---|
| `dim_localidades` | 25 | 21 UV reconocidas + 4 alias (Rengo Centro, Rosario Centro, etc.). Población 2024, NNA estimados, coords. | `localidad_id` |
| `dim_ejes_pladeco` | 6 | 6 ejes con N° objetivos, N° acciones totales y N° acciones NNA. Color hex para mapas. | `eje_id` |
| `dim_sectores_bip` | 12 | Sectores de inversión SNI/MDSF con paleta. | `sector_id` |

### 🟠 Hechos primarios

| Tabla | Filas | Descripción | Clave |
|---|---|---|---|
| `fact_proyectos_bip` | 1.182 | Portafolio BIP/SNI 1997-2025 con sector, fuente, costo, etapa, localidad, **lat/lon**, década, periodo PLADECO. | `codigo_bip` |
| `fact_acciones_pladeco` | 225 | Matriz SUBDERE: eje, área, plazo (C/M/L), responsable, financiamiento, ODS, **flags de inclusión** (NNA, mujeres, AM, discap.). | `accion_id` |

### 🟢 Hechos de encuestas (formato wide + long)

| Tabla | Filas | Descripción |
|---|---|---|
| `fact_encuesta_nna_wide` | 21 | Encuesta online NNA 2026: una fila por respondiente con 23 KPIs. |
| `fact_encuesta_nna_long` | 1.057 | Mismo dato en formato largo (pregunta-respuesta). Ideal para gráficos de barras filtrables en Looker. |
| `fact_encuesta_ciudadana_wide` | 119 | Encuesta Ciudadana Online: 17 KPIs por respondiente + flag `es_nna`. |
| `fact_encuesta_ciudadana_long` | 9.166 | Encuesta Ciudadana en formato largo (todas las 70 preguntas). |
| `fact_diagnostico_infancia` | 31 | KPIs sintetizados del Diagnóstico Comunal de Infancia 2025 (4.036 NNA). |

### 🔴 Hechos de seguimiento

| Tabla | Filas | Descripción |
|---|---|---|
| `fact_indicadores_desigualdad` | 12 | Gini, CR3, CR5, HHI, brechas R/U, dependencia FNDR. Con `umbral_alerta` para alertas en tablero. |
| `fact_metas_seguimiento` | 16 | Metas medibles del PLADECO: `lb_2024 → meta_2028 → meta_2035`. Una por eje. |

### 🟡 Cruces y geo

| Tabla | Filas | Descripción |
|---|---|---|
| `fact_uv_resumen` | 25 | Cruce por localidad: BIP + encuestas + población. **Ideal para mapas temáticos.** |
| `geo_puntos` | 525 | Tabla unificada de puntos georreferenciados (BIP + localidades). Para capa Mapa Geo en Looker. |
| `meta_dataset` | 14 | Documentación del dataset (auto-referencial). |

---

## 4. Métricas clave para tableros

### Tablero 1 · "Diagnóstico Territorial"
- **Mapa BIP** (`fact_proyectos_bip`): puntos coloreados por sector, tamaño = costo
- **Tabla por UV** (`fact_uv_resumen`): Top localidades por inversión per cápita
- **KPIs** (`fact_indicadores_desigualdad`): Gini, CR5, brecha R/U

### Tablero 2 · "Voz de la Ciudadanía"
- **Pirámide demográfica** (`fact_encuesta_*_wide`): edad × género
- **Top prioridades** (`fact_encuesta_*_long` filtrando por pregunta de prioridades)
- **Comparativa NNA vs Adultos** (combinar las dos encuestas con `union`)

### Tablero 3 · "PLADECO 2025-2035"
- **Donut por eje** (`fact_acciones_pladeco`): N° acciones por eje
- **Gantt por plazo** (`fact_acciones_pladeco`): C / M / L
- **Inclusión** (`fact_acciones_pladeco` con `beneficia_nna`, `beneficia_mujeres`, etc.)
- **Metas** (`fact_metas_seguimiento`): bullet charts LB → 2028 → 2035

### Tablero 4 · "Compromisos con la Infancia"
- **Filtro `beneficia_nna = 1`** sobre `fact_acciones_pladeco`
- **KPIs Diagnóstico Infancia** (`fact_diagnostico_infancia`)
- **Encuesta Online NNA** (`fact_encuesta_nna_*`)

---

## 5. Cómo cargar en Looker Studio

### Opción A · Conexión directa por Google Sheets (recomendada)
1. Subir `PLADECO_Rengo_DataStudio.xlsx` a Google Drive
2. Abrir → "Abrir con Google Sheets" → guardar como Sheet
3. En Looker Studio: **Crear → Origen de datos → Google Sheets**
4. Seleccionar la hoja correspondiente para cada visualización
5. Definir campos calculados según el tablero

### Opción B · Carga por CSV (uno por tabla)
La carpeta `csv/` contiene un archivo por cada tabla, codificado **UTF-8 con BOM** (compatible Looker / Excel / Google Sheets).

### Opción C · BigQuery (escalable)
1. Crear dataset `pladeco_rengo`
2. `bq load --source_format=CSV --autodetect pladeco_rengo.fact_proyectos_bip csv/fact_proyectos_bip.csv`
3. Repetir para cada tabla
4. Conectar Looker → BigQuery

---

## 6. Relaciones (joins recomendados)

```sql
-- Proyectos BIP por localidad
fact_proyectos_bip.localidad  ←→  dim_localidades.localidad
fact_proyectos_bip.sector     ←→  dim_sectores_bip.sector

-- Acciones PLADECO por eje
fact_acciones_pladeco.eje_id  ←→  dim_ejes_pladeco.eje_id

-- Encuestas por localidad
fact_encuesta_nna_wide.localidad_residencia        ←→  dim_localidades.localidad
fact_encuesta_ciudadana_wide.sector_residencia     ←→  dim_localidades.localidad

-- Metas por eje
fact_metas_seguimiento.eje_id                       ←→  dim_ejes_pladeco.eje_id

-- Resumen por UV (ya pre-calculado)
fact_uv_resumen.localidad_id                        ←→  dim_localidades.localidad_id
```

---

## 7. Campos calculados sugeridos en Looker

```
# Ratio de avance de meta (entre LB y Meta 2028)
avance_meta_2028 = (valor_actual - lb_2024) / (meta_2028 - lb_2024)

# Costo BIP en miles de millones
costo_BB = costo_total_M / 1000

# Edad recodificada NNA
edad_grupo = CASE
  WHEN edad_rango = "6 a 12" THEN "Niñez (6-12)"
  WHEN edad_rango = "12 a 14" THEN "Pre-adolescencia"
  WHEN edad_rango = "14 a 18" THEN "Adolescencia"
  WHEN edad_rango = "18 a 20" THEN "Juventud"
END

# Eje resumido (color)
eje_color = LOOKUP(eje_id, dim_ejes_pladeco.color_hex)
```

---

## 8. Fuentes de datos

| Fuente | N° datos | Disponibilidad |
|---|---|---|
| BIP/SNI Rengo 1997-2025 (MDSF) | 1.182 proyectos | ✅ Georreferenciado |
| Matriz PLADECO SUBDERE 2025-2035 | 225 acciones | ✅ |
| Encuesta Online NNA 2026 | 21 respondientes × 47 preguntas | ✅ |
| Encuesta Ciudadana Online 2026 | 119 respondientes × 70 preguntas | ✅ |
| Diagnóstico Comunal de Infancia 2025 | 4.036 NNA encuestados | ⚠ KPIs sintetizados (datos crudos no incluidos) |
| Censo 2017 INE proyectado 2024 | Población por localidad | ✅ |
| Diagnóstico UV PLADECO 2025 | 21 UV (9 urbanas + 12 rurales) | ✅ |

---

## 9. Limitaciones y advertencias

- La encuesta online NNA tiene **muestra pequeña (n=21)** → presentar como complemento cualitativo, no como dato estadístico representativo.
- Las localidades rurales tienen **autoselección de respondientes** → sesgo de motivación.
- Los KPIs de `fact_diagnostico_infancia` provienen del documento síntesis del Diagnóstico Comunal de Infancia 2025; **los microdatos crudos del estudio (4.036 NNA) no están incluidos** en este dataset y deberían integrarse en próxima versión.
- Coordenadas BIP: **georreferenciación por centroide de localidad** (extraído del texto de la descripción), no coordenada exacta del proyecto. Aproximación válida para mapas comunales, no para análisis de microlocalización.

---

## 10. Contacto y mantenimiento

**Responsable:** Osvaldo Mañán Fonseca · Encargado PLADECO
**Unidad:** Secretaría Comunal de Planificación (SECPLA)
**Próxima actualización prevista:** Anual al cierre de cada ejercicio presupuestario

---

*Generado automáticamente por `construir_basedatos_datastudio.py`. Reproducible.*
