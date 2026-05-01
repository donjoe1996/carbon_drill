# CLAUDE.md

This file provides guidance to Claude Code when working with code in this repository.

## What This Is

A static two-file web app — a daily professional writing drill for carbon markets practitioners. No build system, no npm, no framework.

- `carbon-writing-drill.html` — all UI, CSS, and JS
- `data.js` — all drill content (vocabulary pool, reading passages, VM47 scenarios, Isometric scenarios)

Hosted on GitHub Pages: `https://donjoe1996.github.io/carbon_drill/carbon/carbon-writing-drill.html`

## Architecture

### App stages (controlled via `show(id)` + `.hidden` CSS class)

| Stage ID | Purpose |
|---|---|
| `stage-login` | Static login gate (fixed overlay, z-index 500) |
| `stage-welcome` | Home — 4 drill cards + FCAD reference |
| `stage-drill` | Vocabulary & Writing drill |
| `stage-reading` | Reading & Editing drill |
| `stage-vm47` | VM0047 ARR eligibility assessment |
| `stage-iso` | Isometric Reforestation eligibility assessment |
| `stage-output` | JSON output to paste into Claude for evaluation |

All 4 drill stages are `position: fixed; inset: 0; z-index: 200` full-screen overlays with a shared top bar + tab nav, a left accordion column, and a full-height Leaflet map on the right.

### Login
- Static gate: username and password both `letmein123`
- `doLogin()` checks credentials, hides `#stage-login`, calls `show("stage-welcome")`

### Shared drill UI (all 4 stages)

**Top bar** — `.drill-top-bar`: `← Home` button + horizontal tab row (`drill-tabs`) with 4 tabs: Vocabulary & Writing | Reading & Editing | VM47 Eligibility | Isometric. Active tab is highlighted. Clicking a tab calls `switchToDrill(type)`.

**Left column** — accordion panels using `.panel.open` / `.panel.closed`:
- `togglePanel(prefix, name, panels?)` — opens clicked panel, collapses others. Re-clicking an open panel collapses it.
- Default panels array: `['scenario', 'criteria', 'det', 'legend']` (VM47/Iso). Vocab uses `['vocab','scenario','response','legend']`, Reading uses `['passage','grammar','logic','legend']`.

**Right column** — full-height Leaflet map. All 4 maps share the same layer structure and helper functions (see Map section below).

### Drill types

**Vocabulary & Writing** (`stage-drill`) — picks 2 words from `WORD_POOL`, generates a scenario, user defines words and writes a 2-paragraph FCAD response. Panels: 1 Vocabulary | 2 Writing Scenario | 3 Your Response (FCAD) | 4 Legend. Map AOI synced to a random VM47 scenario location each session.

**Reading & Editing** (`stage-reading`) — picks a passage from `READING_POOL`, user identifies grammar errors and logical flaws. Panels: 1 Read Passage | 2 Grammar Errors | 3 Logical Flaws | 4 Legend. Map AOI also synced to VM47 scenario location.

**VM47 Eligibility** (`stage-vm47`) — picks a scenario from `VM47_SCENARIOS`, user assesses against `VM47_CRITERIA` (VM0047 v1.1). Panels: 1 Land Scenario | 2 VM0047 Applicability Conditions | 3 Your Determination | 4 Legend.

**Isometric Reforestation** (`stage-iso`) — same structure as VM47 but uses `ISO_SCENARIOS` and `ISO_CRITERIA` (Isometric Reforestation Protocol v1.1). Source: `https://registry.isometric.com/protocol/reforestation`

### Map (Leaflet — all 4 drills)

Map instances are lazily created and reused (`_drillMap`, `_readingMap`, `_vm47Map`, `_isoMap`). Each map is initialized once in the `start*Drill()` function.

**Layer control** (top-right, always expanded):
- Base layers (radio — one active): 🛰 Satellite (Google) | 🏔 Terrain Base (Esri World Terrain)
- Overlay layers (mutually exclusive — selecting one removes the other): 🌿 ESA Land Cover 2021 | 🪨 WRB Soil Groups (ISRIC WMS)

**Map controls** (added via `addMapControls(map)`):
- Scale bar — km only, bottom-left
- Zoom level display (`Z 10`) — bottom-right, live update on zoom

**Soil click query** (`addSoilClickHandler(map)`): clicking any point on a map fires a fetch to `https://rest.isric.org/soilgrids/v2.0/classification/query?lon=…&lat=…&number_classes=3`. Shows a styled dark popup with WRB soil group name + top-3 probability bars.

**Dynamic legend** (`setupMapLegend(map, legendId, terrainLayer, esaLayer, wrbLayer, panelId)`):
- Listens to `layeradd` / `layerremove` events.
- Renders legend content into the `map-legend-area` div inside panel 4.
- When layer is switched (not on initial load), panel 4 auto-opens so the legend is visible.
- Overlays are mutually exclusive: adding ESA removes WRB and vice versa.

**Legend content** (`MAP_LEGENDS` + `renderLegend(key)`): each legend entry has `meta` (official dataset name, service type, service URL for QGIS copy-paste) and `legend` HTML. Keys: `satellite`, `terrain`, `esa`, `wrb`.

Layer/legend metadata:
| Key | Dataset name | Type | Service URL |
|---|---|---|---|
| satellite | Google Maps Satellite | XYZ Tile | `https://mt{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}` |
| terrain | Esri World Terrain Base | XYZ Tile | `https://server.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer/tile/{z}/{y}/{x}` |
| esa | ESA WorldCover 2021 v200 | WMTS | `https://services.terrascope.be/wmts/v2` |
| wrb | ISRIC — WRB Most Probable Soil Group | WMS | `https://maps.isric.org/mapserv?map=/map/wrb.map` |

WRB legend image: `GetLegendGraphic` requires `VERSION=1.1.1` — without it the server returns HTML instead of PNG.

### Output flow
All drills call `showOutput(output, drillType)` which renders JSON into `#json-output`. User copies/pastes the JSON into claude.ai. No API calls are made from the browser (except the SoilGrids click query).

## CSS Design Tokens (`:root`)

```
--bg, --surface, --panel       background layers
--border, --border2            border colors
--green, --green-lt, --accent  green scale
--text, --text-dim, --text-mut text hierarchy
--badge-bg, --badge-fg         section badge colors
--red                          ineligible state
```

Fonts: `DM Sans` (UI) + `DM Mono` (labels/badges/mono) across all stages.

## Extending

- **Add vocabulary words**: append to `WORD_POOL` in `data.js`
- **Add a reading passage**: append to `READING_POOL` in `data.js` (include `sentences[]` and `planted_errors[]`)
- **Add a VM47 scenario**: append to `VM47_SCENARIOS` in `data.js` (include `lat`, `lng`, `zoom`, `eligible`, `failing_criteria[]`, `rationale`)
- **Add an Isometric scenario**: same pattern, append to `ISO_SCENARIOS`
- **Add a new spatial layer**: add a new `L.tileLayer` / `L.tileLayer.wms` in each map init block, add to `L.control.layers()`, add a key to `MAP_LEGENDS`, and update `setupMapLegend` detection logic
- **Add a new drill type**: add a stage div, a drill card in `stage-welcome`, start/generate functions, a tab button in each `.drill-tabs` row, and a branch in `showOutput()`
- **Change the review rubric**: edit `review_instructions` inside the relevant `generate*Output()` function
