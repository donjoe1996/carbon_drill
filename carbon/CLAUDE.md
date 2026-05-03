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

Above the accordion, the left column has three utility bars (top to bottom):
1. **Location search** (`.loc-search-wrap`) — Nominatim geocoder, flies map to result
2. **GeoJSON upload** (`.geojson-upload-bar`) — file input, renders `L.geoJSON` overlay, fitBounds, ✕ to clear
3. **Print PDF** (`.map-print-bar`) — generates a 2-page A4 landscape PDF (ESA + WRB) via html2canvas + jsPDF

Below the accordion, a **tile cache bar** (`.tile-cache-bar`) shows hit/miss stats with a Clear button.

**Right column** — full-height Leaflet map. All 4 maps share the same layer structure and helper functions (see Map section below).

### Drill types

**Vocabulary & Writing** (`stage-drill`) — picks 2 words from `WORD_POOL`, generates a scenario, user defines words and writes a 2-paragraph FCAD response. Panels: 1 Vocabulary | 2 Writing Scenario | 3 Your Response (FCAD) | 4 Legend. Map AOI synced to a random VM47 scenario location each session.

**Reading & Editing** (`stage-reading`) — picks a passage from `READING_POOL`, user identifies grammar errors and logical flaws. Panels: 1 Read Passage | 2 Grammar Errors | 3 Logical Flaws | 4 Legend. Map AOI also synced to VM47 scenario location.

**VM47 Eligibility** (`stage-vm47`) — picks a scenario from `VM47_SCENARIOS`, user assesses against `VM47_CRITERIA` (VM0047 v1.1). Panels: 1 Land Scenario | 2 VM0047 Applicability Conditions | 3 Your Determination | 4 Legend.

**Isometric Reforestation** (`stage-iso`) — same structure as VM47 but uses `ISO_SCENARIOS` and `ISO_CRITERIA` (Isometric Reforestation Protocol v1.1). Source: `https://registry.isometric.com/protocol/reforestation`

### Map (Leaflet — all 4 drills)

Map instances are lazily created and reused (`_drillMap`, `_readingMap`, `_vm47Map`, `_isoMap`). Each map is initialized once in the `start*Drill()` function. CDN dependencies: Leaflet 1.9.4, html2canvas 1.4.1, jsPDF 2.5.1 UMD.

**Layer control** (top-right, always expanded):
- Base layers (radio): 🛰 Satellite (Google) | 🏔 Terrain Base (Esri World Terrain)
- Overlay layers (mutually exclusive — `setupMapLegend` enforces one-at-a-time):
  - 🌿 ESA Land Cover 2021 (WMTS, Terrascope)
  - 🪨 WRB Soil Groups (WMS, ISRIC)
  - 🌍 RESOLVE Ecoregions (XYZ tile, UNEP-WCMC)
  - 🌱 RESOLVE Biomes (same XYZ tile as ecoregions — reuses `makeBiomeTileLayer()`)
  - 🌾 FAO Agro-Eco Zones (WMS, FAO GAEZ v4)
  - 🔥 FAO Climate Hazard 2025 (WMTS, FAO CRTB)
  - 🐄 FAO Livestock Density 2020 (WMTS, FAO GLW4)

**Map controls** (added via `addMapControls(map)`):
- Scale bar — km only, bottom-left
- Zoom level display (`Z 10`) — bottom-right, live update on zoom

**Context menu** (`addMapContextMenu(map)`): right-click opens a pixel-query menu. Dispatches to `queryPixelInfo(latlng, type, map)` which supports:

| type | Source | Method |
|---|---|---|
| `soil` | ISRIC SoilGrids v2 | REST API |
| `eco` | RESOLVE Ecoregions FeatureServer | ArcGIS query |
| `esa` | ESA WorldCover 2021 | Canvas tile read (no GetFeatureInfo) |
| `aez` | FAO GAEZ v4 | WMS GetFeatureInfo |
| `haz` | FAO CRTB HAZ-BI 2025 | WMTS GetFeatureInfo |
| `glw` | FAO GLW4 2020 | WMTS GetFeatureInfo |
| `biome` | RESOLVE Ecoregions FeatureServer | ArcGIS query (returns biome_name) |

**Tile cache** (IIFE, runs before map init): monkey-patches `L.TileLayer.prototype.createTile`. Two-layer cache: memory (Map of `url → objectURL`) + Cache API (persists across reloads). Tiles are fetched with `mode: 'cors'`; CORS failures fall back to direct `img.src` (Google tiles). `window.clearTileCache()` clears both layers.

**Dynamic legend** (`setupMapLegend(map, legendId, terrainLayer, esaLayer, wrbLayer, ecoLayer, panelId, faoLayer, hazLayer, glwLayer, biomeLayer)`):
- 11 parameters. Listens to `layeradd` / `layerremove` events.
- Renders legend content into the `map-legend-area` div inside panel 4.
- When a layer is switched (not on initial load), panel 4 auto-opens.
- Overlay mutual exclusion: adding any overlay removes all others.
- Legend priority order: wrb → esa → ecoregions → biomes → fao_aez → fao_haz → glw4 → terrain → satellite

**`_printLayers`**: after each map is initialized, `map._printLayers = { esa, wrb }` is set so `printMapToPdf` can access the two printable overlay references.

**Location search** (`setupLocSearch(inputId, clearId, resultsId, mapGetter)`): debounced Nominatim fetch, renders dropdown, flies map on selection.

**GeoJSON upload** (`setupGeoJsonUpload(inputId, statusId, clearId, mapGetter)`): FileReader → `L.geoJSON` with green style → `fitBounds`. Replaces previous layer on re-upload; clear button removes it.

**Print to PDF** (`printMapToPdf(mapGetter, btnEl)`): async, disables button during run. For each of [ESA, WRB]: switches layer, waits 1.8 s for tiles, captures map with `html2canvas`, assembles A4 landscape page in jsPDF — map image left (~205 mm), legend panel right (~72 mm). ESA legend drawn with colored `roundedRect` + text; WRB legend fetched as PNG from GetLegendGraphic and embedded. Saves `carbon-map-print.pdf`. Restores original layer state in `finally`.

**Legend content** (`MAP_LEGENDS` + `renderLegend(key)`): each entry has `meta` (name, type, service URL) and `legend` HTML.

| Key | Dataset name | Type | Service URL |
|---|---|---|---|
| satellite | Google Maps Satellite | XYZ Tile | `https://mt{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}` |
| terrain | Esri World Terrain Base | XYZ Tile | `https://server.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer/tile/{z}/{y}/{x}` |
| esa | ESA WorldCover 2021 v200 | WMTS | `https://services.terrascope.be/wmts/v2` |
| wrb | ISRIC — WRB Most Probable Soil Group | WMS | `https://maps.isric.org/mapserv?map=/map/wrb.map` |
| ecoregions | RESOLVE Ecoregions 2017 | XYZ Tile | `https://data-gis.unep-wcmc.org/server/rest/services/Bio-geographicalRegions/Resolve_Ecoregions/MapServer/tile/{z}/{y}/{x}` |
| biomes | RESOLVE Biomes 2017 | ArcGIS MapServer | same tile URL as ecoregions |
| fao_aez | FAO Agro-Ecological Zones (AEZ) | WMS | `https://data.apps.fao.org/map/gsrv/gsrv1/wms` |
| fao_haz | FAO Climate Risk — Hazard-Biophysical Index 2025 | WMTS | `https://data.apps.fao.org/map/wmts/wmts` |
| glw4 | FAO Global Livestock Density 2020 — Cattle (1 km) | WMTS | `https://data.apps.fao.org/map/wmts/wmts` |

WRB legend image: `GetLegendGraphic` requires `VERSION=1.1.1` — without it the server returns HTML instead of PNG.

### Output flow
All drills call `showOutput(output, drillType)` which renders JSON into `#json-output`. User copies/pastes the JSON into claude.ai. No API calls are made from the browser (except the pixel query endpoints and the Nominatim geocoder).

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
- **Add a new spatial layer**: add a new `L.tileLayer` / `L.tileLayer.wms` in each of the 4 map init blocks, add to `L.control.layers()`, add a key to `MAP_LEGENDS`, update `setupMapLegend` (add param + detection branch), add a `queryPixelInfo` branch and context menu item if pixel query is needed
- **Add a layer to the PDF print**: add an entry to the `printLayers` array in `printMapToPdf` with `layer`, `title`, `subtitle`, and either `items` (colored dot legend) or `legendImgUrl`
- **Add a new drill type**: add a stage div, a drill card in `stage-welcome`, start/generate functions, a tab button in each `.drill-tabs` row, and a branch in `showOutput()`
- **Change the review rubric**: edit `review_instructions` inside the relevant `generate*Output()` function
