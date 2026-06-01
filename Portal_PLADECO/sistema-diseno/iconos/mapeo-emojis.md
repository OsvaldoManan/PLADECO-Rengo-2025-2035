# Pieza 1 · Sistema de íconos SVG

Set único de **51 íconos de línea** que reemplaza los emojis del portal. Ya desplegado en
producción (sprite inline en `index.html`; copia standalone en `sprite.svg`).

## Lenguaje del set
| Atributo | Valor |
|---|---|
| Grilla base | **24 × 24** |
| Grosor de trazo | **1.7** (uniforme) |
| Terminaciones / uniones | **redondeadas** (`round`) |
| Relleno | **ninguno** — `fill:none` |
| Color | **`currentColor`** (hereda color del texto → se adapta a tema y contraste) |
| Estilo | línea, geométrico, sin detalle superfluo; tamaño óptico para ~1em |

## Patrón de uso
```html
<svg class="ico" aria-hidden="true" viewBox="0 0 24 24"><use href="#ico-chart"></use></svg>
```
```css
.ico{ width:1.05em; height:1.05em; fill:none; stroke:currentColor;
      stroke-width:1.7; stroke-linecap:round; stroke-linejoin:round;
      vertical-align:-.15em; flex-shrink:0; }
```
**Tamaños permitidos:** ligado al texto (1em por defecto); `.ico-sm` 0.9em, `.ico-lg` 1.4em.
Chrome/UI: 16–18px. **No** escalar por debajo de 14px (se pierde el trazo).

## Color y alineación
- Hereda `currentColor`: en tinta sobre papel, en claro sobre fondo oscuro. Cumple el contraste
  del texto que acompaña (no añade color propio).
- Énfasis puntual: heredar de un contenedor en `--c-navy` o `--c-crimson`. Nunca multicolor.
- Alineación vertical con la línea base del texto (`vertical-align:-.15em`).

## Accesibilidad
- **Decorativo** (acompaña a un texto que ya dice lo mismo): `aria-hidden="true"` (evita redundancia).
- **Portador de significado** (ícono sin texto, p. ej. un botón solo-ícono): dar nombre accesible
  con `aria-label` en el control, o `<title>` dentro del `<svg>` + `role="img"`.

## Cobertura de las categorías requeridas
| Categoría | Ícono |
|---|---|
| Introducción | `ico-book` |
| Diagnóstico | `ico-search` |
| Participación / sociedad civil | `ico-people` · `ico-megaphone` |
| Planificación | `ico-target` |
| Gobernanza (SNA) | `ico-cycle` · `ico-globe` |
| Seguimiento / indicadores | `ico-trend` · `ico-chart` |
| Semáforo de metas | `ico-traffic` |
| Proceso / hitos | `ico-flag` · `ico-calendar` |
| Territorio / UV | `ico-institution` · `ico-buildings` |
| Datos / datos abiertos | `ico-chart` |
| Censo | `ico-clipboard` |
| Mapa | `ico-map` |
| Financiamiento | `ico-money` |
| NNA / personas | `ico-people` |
| Documentos | `ico-folder` · `ico-doc` |
| Descargar | `ico-download` |
| Buscar | `ico-search` |
| Tema claro/oscuro | `ico-moon` |
| Lectura Fácil | `ico-book` |
| ODS / sostenibilidad | `ico-globe` · `ico-tree` |
| Transparencia / decisiones | `ico-eye` · `ico-scale` |
| Calendario | `ico-calendar` |
| Coherencia / vínculos | `ico-link` |
| Bienestar (MBHT) | `ico-heart` |
| Energía / datos en vivo | `ico-bolt` |
| Educación | `ico-education` |
| Historia | `ico-scroll` |
| Logros / compromisos | `ico-trophy` · `ico-check` |

## Tabla de mapeo · emoji del portal → ícono nuevo
Aplicada en producción (686 emojis en texto + 62 secciones + 4 macro-partes).

| Emoji | Ícono | | Emoji | Ícono | | Emoji | Ícono |
|---|---|---|---|---|---|---|---|
| 📚 | `books` | | 📊 📉 | `chart` | | ⚠️ 🚨 | `warning` |
| 🎯 | `target` | | 📖 📓 | `book` | | 🏛️ 🏢 | `institution` |
| 🔍 🔬 | `search` | | 📈 | `trend` | | 📋 🗂️ 📑 | `clipboard` |
| ⚖️ 🔀 | `scale` | | 📝 | `note` | | ⬇️ | `download` |
| 📍 📌 | `pin` | | 🔗 | `link` | | → | `arrow` |
| 👥 👶 🤝 🙋 👤 | `people` | | 🏘️ | `buildings` | | ✓ ✅ 🤲 | `check` |
| 📅 ⏳ | `calendar` | | 💡 ✨ | `bulb` | | 🌐 🌎 🌍 🌱 | `globe`/`tree` |
| 💬 🗣️ | `chat`/`megaphone` | | ⚙️ 🛠️ | `gear` | | 💰 💵 | `money` |
| 💾 | `save` | | 📣 | `megaphone` | | 🏠 | `home` |
| 🚦 | `traffic` | | 🏆 | `trophy` | | 🔌 | `plug` |
| 🛡️ | `shield` | | 🏔️ | `mountain` | | 💼 | `briefcase` |
| 📄 | `doc` | | 🔒 | `lock` | | 💻 | `laptop` |
| 📜 | `scroll` | | 🎓 | `education` | | 🌳 | `tree` |
| 💚 | `heart` | | ⚡ | `bolt` | | 📁 | `folder` |
| 👁️ | `eye` | | 📸 | `image` | | 🧮 | `calculator` |
| 🏁 | `flag` | | 🔄 | `cycle` | | 🧩 | `puzzle` |

**Color-semánticos que NO se iconizan** (siguen siendo color funcional): 🔴 (estado),
y la pareja azul/rosa de la pirámide poblacional (masculino/femenino).

## Inventario completo (51)
`search · moon · book · doc · map · chart · info · arrow · books · warning · target ·
institution · trend · clipboard · scale · note · download · pin · link · people · buildings ·
check · calendar · bulb · globe · chat · gear · money · save · megaphone · home · traffic ·
trophy · plug · shield · mountain · briefcase · lock · laptop · scroll · education · tree ·
heart · bolt · folder · eye · image · calculator · flag · cycle · puzzle`

## Pendiente menor (opcional)
Para cobertura 100 % literal podrían sumarse: `ico-sun` (tema claro explícito), `ico-ods`
(rueda ODS estilizada), `ico-child` (NNA dedicado). Hoy resueltos con equivalentes (`moon`,
`globe`/`target`, `people`).
