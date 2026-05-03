// layers.js — tile layer factories, WMS/WMTS pixel queries, legends, and map controls.
// All service URLs live here so updating an endpoint touches one place.

// ─── LAYER URLs ───────────────────────────────────────────────────────────────

const LAYER_URLS = {
  googleSat:    'https://mt{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}',
  esriTerrain:  'https://server.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer/tile/{z}/{y}/{x}',
  esriImagery:  'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
  esriLabels:   'https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}',
  esaWmts:      'https://services.terrascope.be/wmts/v2?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=WORLDCOVER_2021_MAP&STYLE=&FORMAT=image%2Fpng&TILEMATRIXSET=EPSG%3A3857&TILEMATRIX=EPSG%3A3857%3A{z}&TILEROW={y}&TILECOL={x}',
  wrbWms:       'https://maps.isric.org/mapserv?map=/map/wrb.map',
  resolveEco:   'https://data-gis.unep-wcmc.org/server/rest/services/Bio-geographicalRegions/Resolve_Ecoregions/MapServer/tile/{z}/{y}/{x}',
  faoAezWms:    'https://data.apps.fao.org/map/gsrv/gsrv1/wms',
  faoHazWmts:   'https://data.apps.fao.org/map/wmts/wmts?layer=fao-gismgr/CRTB/mapsets/HAZ-BI-2025&style=HAZ-I-2025&tilematrixset=EPSG:3857&tilematrix={z}&tilerow={y}&tilecol={x}&format=image/png&service=WMTS&version=1.0.0&request=GetTile&dim_haz-bi-2025=FIRES',
  faoGlwWmts:   'https://data.apps.fao.org/map/wmts/wmts?layer=fao-gismgr/GLW4-2020/mapsets/D-DA-1KM&style=D-DA-ALL&tilematrixset=EPSG:3857&tilematrix={z}&tilerow={y}&tilecol={x}&format=image/png&service=WMTS&version=1.0.0&request=GetTile&dim_a-species=CTL',
  wdpa:            'https://data-gis.unep-wcmc.org/server/rest/services/ProtectedPlanet/WDPCA/MapServer/tile/{z}/{y}/{x}',
  esriBiomeTiles:  'https://tiles.arcgis.com/tiles/P3ePLMYs2RVChkJx/arcgis/rest/services/Resolve_Ecoregions/MapServer/tile/{z}/{y}/{x}',
  esriBiomeQuery:  'https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/Resolve_Ecoregions/FeatureServer/0/query',
};

// ─── LAYER FACTORIES ──────────────────────────────────────────────────────────

function makeBiomeTileLayer() {
  return L.tileLayer(LAYER_URLS.esriBiomeTiles, {
    maxZoom: 13, opacity: 0.85, attribution: '© Esri / RESOLVE',
  });
}

// Creates all 9 overlay + base tile layers for a map, adds the layer control,
// and returns named refs so callers can set up legends and print targets.
function createMapLayers(map) {
  const sat = L.tileLayer(LAYER_URLS.googleSat, {
    subdomains: ['0', '1', '2', '3'], maxZoom: 20,
  }).addTo(map);

  const terrain = L.tileLayer(LAYER_URLS.esriTerrain, {
    maxZoom: 13, attribution: '© Esri',
  });

  const esa = L.tileLayer(LAYER_URLS.esaWmts, { maxZoom: 13 });

  const wrb = L.tileLayer.wms(LAYER_URLS.wrbWms, {
    layers: 'MostProbable', format: 'image/png', transparent: true,
    opacity: 0.7, attribution: '© ISRIC — World Soil Information',
  });

  const eco = L.tileLayer(LAYER_URLS.resolveEco, {
    maxZoom: 13, opacity: 0.85, attribution: '© RESOLVE / UNEP-WCMC',
  });

  const fao = L.tileLayer.wms(LAYER_URLS.faoAezWms, {
    layers: 'boundaries:aez', format: 'image/png', transparent: true,
    opacity: 0.75, attribution: '© FAO',
  });

  const haz = L.tileLayer(LAYER_URLS.faoHazWmts, {
    maxZoom: 13, opacity: 0.8, attribution: '© FAO CRTB',
  });

  const glw = L.tileLayer(LAYER_URLS.faoGlwWmts, {
    maxZoom: 13, opacity: 0.8, attribution: '© FAO GLW4',
  });

  const biome = makeBiomeTileLayer();

  const wdpa = L.tileLayer(LAYER_URLS.wdpa, {
    maxZoom: 13, opacity: 0.75, attribution: '© UNEP-WCMC / Protected Planet',
  });

  L.control.layers(
    { '🛰 Satellite': sat, '🏔 Terrain Base': terrain },
    {
      '🌿 ESA Land Cover 2021': esa,
      '🪨 WRB Soil Groups': wrb,
      '🌍 RESOLVE Ecoregions': eco,
      '🌱 RESOLVE Biomes': biome,
      '🌾 FAO Agro-Eco Zones': fao,
      '🔥 FAO Climate Hazard 2025': haz,
      '🐄 FAO Livestock Density 2020': glw,
      '🛡 Protected Areas (WDPA)': wdpa,
    },
    { position: 'topright', collapsed: false }
  ).addTo(map);

  return { sat, terrain, esa, wrb, eco, fao, haz, glw, biome, wdpa };
}

// ─── MAP LEGENDS ──────────────────────────────────────────────────────────────

const MAP_LEGENDS = {
  satellite: {
    meta: { name: 'Google Maps Satellite', type: 'XYZ Tile', url: LAYER_URLS.googleSat },
    legend: '<div class="mleg-legend-wrap"><span class="mleg-note">No thematic classification — true-colour satellite imagery</span></div>',
  },
  terrain: {
    meta: { name: 'Esri World Terrain Base', type: 'XYZ Tile', url: LAYER_URLS.esriTerrain },
    legend: '<div class="mleg-legend-wrap"><span class="mleg-note">No thematic classification — terrain hillshade &amp; contours</span></div>',
  },
  esa: {
    meta: { name: 'ESA WorldCover 2021 v200', type: 'WMTS', url: 'https://services.terrascope.be/wmts/v2' },
    legend: `<div class="mleg-legend-wrap"><div class="mleg-grid">
      <div class="mleg-row"><span class="mleg-dot" style="background:#006400"></span>Tree cover</div>
      <div class="mleg-row"><span class="mleg-dot" style="background:#ffbb22"></span>Shrubland</div>
      <div class="mleg-row"><span class="mleg-dot" style="background:#ffff4c"></span>Grassland</div>
      <div class="mleg-row"><span class="mleg-dot" style="background:#f096ff"></span>Cropland</div>
      <div class="mleg-row"><span class="mleg-dot" style="background:#fa0000"></span>Built-up</div>
      <div class="mleg-row"><span class="mleg-dot" style="background:#b4b4b4"></span>Barren / sparse veg.</div>
      <div class="mleg-row"><span class="mleg-dot" style="background:#f0f0f0"></span>Snow and ice</div>
      <div class="mleg-row"><span class="mleg-dot" style="background:#0064c8"></span>Permanent water</div>
      <div class="mleg-row"><span class="mleg-dot" style="background:#0096a0"></span>Herbaceous wetland</div>
      <div class="mleg-row"><span class="mleg-dot" style="background:#00cf75"></span>Mangroves</div>
      <div class="mleg-row"><span class="mleg-dot" style="background:#fae6a0"></span>Moss and lichen</div>
    </div></div>`,
  },
  wrb: {
    meta: { name: 'ISRIC — WRB Most Probable Soil Group', type: 'WMS', url: LAYER_URLS.wrbWms },
    legend: `<div class="mleg-legend-wrap">
      <img class="mleg-img" src="https://maps.isric.org/mapserv?map=/map/wrb.map&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetLegendGraphic&LAYER=MostProbable&FORMAT=image/png" alt="WRB legend">
      <span class="mleg-note" style="display:block;margin-top:6px">© ISRIC — World Soil Information</span>
    </div>`,
  },
  ecoregions: {
    meta: { name: 'RESOLVE Ecoregions 2017', type: 'XYZ Tile', url: LAYER_URLS.resolveEco },
    legend: `<div class="mleg-legend-wrap"><div class="mleg-grid">
      <div class="mleg-row"><span class="mleg-dot" style="background:#5d8233"></span>Trop. Moist Broadleaf Forest</div>
      <div class="mleg-row"><span class="mleg-dot" style="background:#cc6600"></span>Trop. Dry Broadleaf Forest</div>
      <div class="mleg-row"><span class="mleg-dot" style="background:#a8c63e"></span>Trop. Coniferous Forest</div>
      <div class="mleg-row"><span class="mleg-dot" style="background:#85aa4c"></span>Temp. Broadleaf Forest</div>
      <div class="mleg-row"><span class="mleg-dot" style="background:#386a1f"></span>Temp. Conifer Forest</div>
      <div class="mleg-row"><span class="mleg-dot" style="background:#007777"></span>Boreal Forest / Taiga</div>
      <div class="mleg-row"><span class="mleg-dot" style="background:#d4bc6a"></span>Trop. Grasslands &amp; Savanna</div>
      <div class="mleg-row"><span class="mleg-dot" style="background:#c8be55"></span>Temp. Grasslands &amp; Savanna</div>
      <div class="mleg-row"><span class="mleg-dot" style="background:#6bb3c5"></span>Flooded Grasslands</div>
      <div class="mleg-row"><span class="mleg-dot" style="background:#bdb3c4"></span>Montane Grasslands</div>
      <div class="mleg-row"><span class="mleg-dot" style="background:#b5d6f5"></span>Tundra</div>
      <div class="mleg-row"><span class="mleg-dot" style="background:#e8d36f"></span>Mediterranean Scrub</div>
      <div class="mleg-row"><span class="mleg-dot" style="background:#e5d3a3"></span>Deserts &amp; Xeric Shrublands</div>
      <div class="mleg-row"><span class="mleg-dot" style="background:#3b7b5e"></span>Mangroves</div>
    </div><span class="mleg-note" style="display:block;margin-top:6px">© RESOLVE / UNEP-WCMC — 846 ecoregions, 14 biomes</span></div>`,
  },
  fao_aez: {
    meta: { name: 'FAO Agro-Ecological Zones (AEZ)', type: 'WMS', url: LAYER_URLS.faoAezWms },
    legend: `<div class="mleg-legend-wrap">
      <img class="mleg-img" src="https://data.apps.fao.org/map/gsrv/gsrv1/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetLegendGraphic&LAYER=boundaries:aez&FORMAT=image/png" alt="FAO AEZ legend">
      <span class="mleg-note" style="display:block;margin-top:6px">© FAO — Global Agro-Ecological Zones (GAEZ v4)</span>
    </div>`,
  },
  fao_haz: {
    meta: { name: 'FAO Climate Risk — Hazard-Biophysical Index 2025', type: 'WMTS', url: 'https://data.apps.fao.org/map/wmts/wmts' },
    legend: `<div class="mleg-legend-wrap">
      <img class="mleg-img" src="https://data.apps.fao.org/map/wmts/wmts?request=GetLegendGraphic&VERSION=1.0.0&layer=fao-gismgr/CRTB/mapsets/HAZ-BI-2025&FORMAT=image/png&STRICT=false&service=WMTS" alt="HAZ-BI legend">
      <span class="mleg-note" style="display:block;margin-top:6px">© FAO CRTB — Composite hazard index (FIRES shown). Hazard types: FIRES · FLOOD · FROST · TMAX · SPI · PMAX</span>
    </div>`,
  },
  glw4: {
    meta: { name: 'FAO Global Livestock Density 2020 — Cattle (1 km)', type: 'WMTS', url: 'https://data.apps.fao.org/map/wmts/wmts' },
    legend: `<div class="mleg-legend-wrap">
      <img class="mleg-img" src="https://data.apps.fao.org/map/wmts/wmts?request=GetLegendGraphic&VERSION=1.0.0&layer=fao-gismgr/GLW4-2020/mapsets/D-DA-1KM&FORMAT=image/png&STRICT=false&service=WMTS" alt="GLW4 legend">
      <span class="mleg-note" style="display:block;margin-top:6px">© FAO GLW4 2020 — Cattle density shown. Species available: Cattle · Chickens · Sheep · Goats · Pigs · Buffaloes</span>
    </div>`,
  },
  biomes: {
    meta: { name: 'RESOLVE Biomes 2017', type: 'ArcGIS FeatureServer', url: 'https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/Resolve_Ecoregions/FeatureServer' },
    legend: `<div class="mleg-legend-wrap"><div class="mleg-grid">
      <div class="mleg-row"><span class="mleg-dot" style="background:#38A700"></span>Trop. Moist Broadleaf Forests</div>
      <div class="mleg-row"><span class="mleg-dot" style="background:#CCCD65"></span>Trop. Dry Broadleaf Forests</div>
      <div class="mleg-row"><span class="mleg-dot" style="background:#88CE66"></span>Trop. Coniferous Forests</div>
      <div class="mleg-row"><span class="mleg-dot" style="background:#00734C"></span>Temp. Broadleaf &amp; Mixed Forests</div>
      <div class="mleg-row"><span class="mleg-dot" style="background:#458970"></span>Temp. Conifer Forests</div>
      <div class="mleg-row"><span class="mleg-dot" style="background:#7AB6F5"></span>Boreal Forests / Taiga</div>
      <div class="mleg-row"><span class="mleg-dot" style="background:#FEAA01"></span>Trop. Grasslands &amp; Savannas</div>
      <div class="mleg-row"><span class="mleg-dot" style="background:#FEFF73"></span>Temp. Grasslands &amp; Savannas</div>
      <div class="mleg-row"><span class="mleg-dot" style="background:#BEE7FF"></span>Flooded Grasslands &amp; Savannas</div>
      <div class="mleg-row"><span class="mleg-dot" style="background:#D6C39D"></span>Montane Grasslands</div>
      <div class="mleg-row"><span class="mleg-dot" style="background:#9ED7C2"></span>Tundra</div>
      <div class="mleg-row"><span class="mleg-dot" style="background:#FE0000"></span>Mediterranean Scrub</div>
      <div class="mleg-row"><span class="mleg-dot" style="background:#CC6767"></span>Deserts &amp; Xeric Shrublands</div>
      <div class="mleg-row"><span class="mleg-dot" style="background:#FE01C4"></span>Mangroves</div>
    </div><span class="mleg-note" style="display:block;margin-top:6px">© RESOLVE / UNEP-WCMC — 14 biomes aggregated from 846 ecoregions</span></div>`,
  },
  wdpa: {
    meta: { name: 'WDPA — Protected Planet 2024', type: 'ArcGIS MapServer', url: 'https://data-gis.unep-wcmc.org/server/rest/services/ProtectedPlanet/WDPCA/MapServer' },
    legend: `<div class="mleg-legend-wrap"><div class="mleg-grid">
      <div class="mleg-row"><span class="mleg-dot" style="background:#74b34e;opacity:0.85"></span>Designated / Established</div>
      <div class="mleg-row"><span class="mleg-dot" style="background:#b5d48a;opacity:0.85"></span>Proposed / Inscribed</div>
      <div class="mleg-row"><span class="mleg-dot" style="background:#d4e8b5;opacity:0.85"></span>Not Reported</div>
    </div><span class="mleg-note" style="display:block;margin-top:6px">© UNEP-WCMC / Protected Planet — World Database on Protected Areas</span></div>`,
  },
};

function renderLegend(key) {
  const { meta, legend } = MAP_LEGENDS[key];
  return `<div class="mleg-meta">
    <div class="mleg-meta-name">${meta.name}</div>
    <div class="mleg-meta-row"><span class="mleg-meta-type">${meta.type}</span></div>
    <div class="mleg-meta-url" title="Copy to use in QGIS">${meta.url}</div>
  </div>${legend}`;
}

function setupMapLegend(map, legendId, terrainLayer, esaLayer, wrbLayer, ecoLayer, panelId, faoLayer, hazLayer, glwLayer, biomeLayer, wdpaLayer) {
  const overlays = [esaLayer, wrbLayer, ecoLayer, faoLayer, hazLayer, glwLayer, biomeLayer, wdpaLayer].filter(Boolean);
  map.on('layeradd', function(e) {
    if (overlays.includes(e.layer))
      overlays.forEach(ol => { if (ol !== e.layer && map.hasLayer(ol)) map.removeLayer(ol); });
  });
  let initialized = false;
  function render() {
    const el = document.getElementById(legendId);
    if (!el) return;
    if (map.hasLayer(wrbLayer))                          el.innerHTML = renderLegend('wrb');
    else if (map.hasLayer(esaLayer))                     el.innerHTML = renderLegend('esa');
    else if (map.hasLayer(ecoLayer))                     el.innerHTML = renderLegend('ecoregions');
    else if (biomeLayer && map.hasLayer(biomeLayer))     el.innerHTML = renderLegend('biomes');
    else if (faoLayer && map.hasLayer(faoLayer))         el.innerHTML = renderLegend('fao_aez');
    else if (hazLayer && map.hasLayer(hazLayer))         el.innerHTML = renderLegend('fao_haz');
    else if (glwLayer && map.hasLayer(glwLayer))         el.innerHTML = renderLegend('glw4');
    else if (wdpaLayer && map.hasLayer(wdpaLayer))       el.innerHTML = renderLegend('wdpa');
    else if (map.hasLayer(terrainLayer))                 el.innerHTML = renderLegend('terrain');
    else                                                 el.innerHTML = renderLegend('satellite');
    if (initialized && panelId) {
      const panel = document.getElementById(panelId);
      if (panel) { panel.classList.add('open'); panel.classList.remove('closed'); }
    }
    initialized = true;
  }
  map.on('layeradd layerremove', render);
  render();
}

// ─── MAP CONTROLS ─────────────────────────────────────────────────────────────

const ZoomDisplay = L.Control.extend({
  options: { position: 'bottomright' },
  onAdd(map) {
    this._el = L.DomUtil.create('div', 'zoom-display');
    this._update();
    map.on('zoomend', this._update, this);
    return this._el;
  },
  onRemove(map) { map.off('zoomend', this._update, this); },
  _update() { this._el.textContent = 'Z ' + this._map.getZoom(); },
});

function addMapControls(map) {
  L.control.scale({ imperial: false, position: 'bottomleft' }).addTo(map);
  new ZoomDisplay().addTo(map);
}

// ─── PIXEL QUERY (WMS / WMTS GetFeatureInfo + ESA canvas read) ────────────────

const ESA_CLASSES = {
  10: 'Tree cover', 20: 'Shrubland', 30: 'Grassland', 40: 'Cropland',
  50: 'Built-up', 60: 'Bare / sparse vegetation', 70: 'Snow and ice',
  80: 'Permanent water', 90: 'Herbaceous wetland', 95: 'Mangroves', 100: 'Moss and lichen',
};

function latLngToTilePixel(lat, lng, z) {
  const n = Math.pow(2, z);
  const xFrac = (lng + 180) / 360 * n;
  const latRad = lat * Math.PI / 180;
  const yFrac = (1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2 * n;
  return {
    tilecol: Math.floor(xFrac),
    tilerow: Math.floor(yFrac),
    i: Math.floor((xFrac - Math.floor(xFrac)) * 256),
    j: Math.floor((yFrac - Math.floor(yFrac)) * 256),
  };
}

function queryPixelInfo(latlng, type, map) {
  const { lat, lng } = latlng;
  const popup = L.popup({ className: 'soil-popup', maxWidth: 300, autoPan: true })
    .setLatLng(latlng).setContent('<div class="soil-pop-loading">Querying…</div>').openOn(map);
  const coord = `<div class="soil-pop-coord">${lat.toFixed(4)}, ${lng.toFixed(4)}</div>`;

  if (type === 'soil') {
    fetch(`https://rest.isric.org/soilgrids/v2.0/classification/query?lon=${lng.toFixed(5)}&lat=${lat.toFixed(5)}&number_classes=3`)
      .then(r => r.json())
      .then(d => {
        const top = d.wrb_class_name || '—';
        const rows = (d.wrb_class_probability || []).map(([name, pct]) => `
          <div class="soil-pop-row"><span style="min-width:80px">${name}</span>
          <div class="soil-pop-bar-wrap"><div class="soil-pop-bar" style="width:${pct}%"></div></div>
          <span class="soil-pop-pct">${pct}%</span></div>`).join('');
        popup.setContent(`<div class="soil-pop-head"><div class="soil-pop-label">WRB Most Probable Soil Group</div><div class="soil-pop-name">${top}</div></div><div class="soil-pop-rows">${rows}</div>${coord}`);
      })
      .catch(() => popup.setContent('<div class="soil-pop-loading">No data at this location</div>'));

  } else if (type === 'eco') {
    const geom = encodeURIComponent(JSON.stringify({ x: lng, y: lat }));
    fetch(`https://data-gis.unep-wcmc.org/server/rest/services/Bio-geographicalRegions/Resolve_Ecoregions/MapServer/0/query?geometry=${geom}&geometryType=esriGeometryPoint&inSR=4326&spatialRel=esriSpatialRelIntersects&outFields=eco_name,biome_name,realm,ecoregion_area_km2&returnGeometry=false&f=json`)
      .then(r => r.json())
      .then(d => {
        const f = d.features?.[0]?.attributes;
        if (!f) { popup.setContent('<div class="soil-pop-loading">No ecoregion data here</div>'); return; }
        const area = Math.round(f.ecoregion_area_km2).toLocaleString();
        popup.setContent(`
          <div class="soil-pop-head"><div class="soil-pop-label">RESOLVE Ecoregion 2017</div><div class="soil-pop-name">${f.eco_name}</div></div>
          <div class="soil-pop-rows">
            <div class="soil-pop-row"><span style="color:var(--text-mut);min-width:52px">Biome</span><span style="margin-left:auto;text-align:right;max-width:170px;line-height:1.3">${f.biome_name}</span></div>
            <div class="soil-pop-row"><span style="color:var(--text-mut);min-width:52px">Realm</span><span style="margin-left:auto">${f.realm}</span></div>
            <div class="soil-pop-row"><span style="color:var(--text-mut);min-width:52px">Area</span><span style="margin-left:auto">${area} km²</span></div>
          </div>${coord}`);
      })
      .catch(() => popup.setContent('<div class="soil-pop-loading">No data at this location</div>'));

  } else if (type === 'esa') {
    // Terrascope GWC does not support GetFeatureInfo — read pixel from tile via canvas instead.
    const ESA_PALETTE = [
      { cls: 10,  name: 'Tree cover',           r: 0,   g: 100, b: 0   },
      { cls: 20,  name: 'Shrubland',            r: 255, g: 187, b: 34  },
      { cls: 30,  name: 'Grassland',            r: 255, g: 255, b: 76  },
      { cls: 40,  name: 'Cropland',             r: 240, g: 150, b: 255 },
      { cls: 50,  name: 'Built-up',             r: 250, g: 0,   b: 0   },
      { cls: 60,  name: 'Bare / sparse veg.',   r: 180, g: 180, b: 180 },
      { cls: 70,  name: 'Snow and ice',         r: 240, g: 240, b: 240 },
      { cls: 80,  name: 'Permanent water',      r: 0,   g: 100, b: 200 },
      { cls: 90,  name: 'Herbaceous wetland',   r: 0,   g: 150, b: 160 },
      { cls: 95,  name: 'Mangroves',            r: 0,   g: 207, b: 117 },
      { cls: 100, name: 'Moss and lichen',      r: 250, g: 230, b: 160 },
    ];
    const z = Math.min(Math.round(map.getZoom()), 13);
    const { tilecol, tilerow, i: px, j: py } = latLngToTilePixel(lat, lng, z);
    const tileUrl = `https://services.terrascope.be/wmts/v2?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0` +
      `&LAYER=WORLDCOVER_2021_MAP&STYLE=&FORMAT=image/png&TILEMATRIXSET=EPSG:3857` +
      `&TILEMATRIX=EPSG:3857:${z}&TILEROW=${tilerow}&TILECOL=${tilecol}`;
    fetch(tileUrl, { mode: 'cors' })
      .then(r => r.blob())
      .then(blob => new Promise((res, rej) => {
        const img = new Image();
        img.onload = () => {
          try {
            const cv = document.createElement('canvas');
            cv.width = cv.height = 256;
            cv.getContext('2d').drawImage(img, 0, 0);
            const [r, g, b, a] = cv.getContext('2d').getImageData(px, py, 1, 1).data;
            URL.revokeObjectURL(img.src);
            res({ r, g, b, a });
          } catch(e) { rej(e); }
        };
        img.onerror = rej;
        img.src = URL.createObjectURL(blob);
      }))
      .then(({ r, g, b, a }) => {
        if (a < 10) { popup.setContent('<div class="soil-pop-loading">No data at this location</div>'); return; }
        let best = null, bestD = Infinity;
        for (const c of ESA_PALETTE) {
          const d = (r-c.r)**2 + (g-c.g)**2 + (b-c.b)**2;
          if (d < bestD) { bestD = d; best = c; }
        }
        popup.setContent(`
          <div class="soil-pop-head"><div class="soil-pop-label">ESA WorldCover 2021</div><div class="soil-pop-name">${best.name}</div></div>
          <div class="soil-pop-rows">
            <div class="soil-pop-row"><span style="color:var(--text-mut)">Class</span><span style="margin-left:auto">${best.cls}</span></div>
            <div class="soil-pop-row"><span style="color:var(--text-mut)">Pixel RGB</span><span style="margin-left:auto;font-family:'DM Mono',monospace;font-size:10px">${r},${g},${b}</span></div>
          </div>${coord}`);
      })
      .catch(() => popup.setContent('<div class="soil-pop-loading">No data at this location</div>'));

  } else if (type === 'aez') {
    const size = map.getSize();
    const b = map.getBounds(); const sw = b.getSouthWest(); const ne = b.getNorthEast();
    const pt = map.latLngToContainerPoint(latlng);
    const url = `https://data.apps.fao.org/map/gsrv/gsrv1/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetFeatureInfo` +
      `&LAYERS=boundaries:aez&QUERY_LAYERS=boundaries:aez&INFO_FORMAT=application/json` +
      `&WIDTH=${size.x}&HEIGHT=${size.y}&BBOX=${sw.lng},${sw.lat},${ne.lng},${ne.lat}` +
      `&SRS=EPSG:4326&X=${Math.round(pt.x)}&Y=${Math.round(pt.y)}&FEATURE_COUNT=1`;
    fetch(url).then(r => r.json())
      .then(d => {
        const f = d.features?.[0]?.properties;
        if (!f) { popup.setContent('<div class="soil-pop-loading">No AEZ data here</div>'); return; }
        const country = f.cty_nm || f.iso3code || '—';
        const zone = f.aez_code ? `AEZ ${f.aez_code}` : '—';
        popup.setContent(`
          <div class="soil-pop-head"><div class="soil-pop-label">FAO Agro-Ecological Zone</div><div class="soil-pop-name">${zone}</div></div>
          <div class="soil-pop-rows">
            <div class="soil-pop-row"><span style="color:var(--text-mut);min-width:60px">Country</span><span style="margin-left:auto">${country}</span></div>
          </div>${coord}`);
      })
      .catch(() => popup.setContent('<div class="soil-pop-loading">No data at this location</div>'));

  } else if (type === 'haz') {
    const z = Math.min(Math.round(map.getZoom()), 13);
    const { tilecol, tilerow, i, j } = latLngToTilePixel(lat, lng, z);
    const url = `https://data.apps.fao.org/map/wmts/wmts?service=WMTS&version=1.0.0&request=GetFeatureInfo` +
      `&layer=fao-gismgr/CRTB/mapsets/HAZ-BI-2025&style=HAZ-I-2025&tilematrixset=EPSG:3857` +
      `&infoFormat=application/json&tilematrix=${z}&tilecol=${tilecol}&tilerow=${tilerow}&i=${i}&j=${j}&dim_haz-bi-2025=FIRES`;
    fetch(url).then(r => r.json())
      .then(d => {
        const val = d.features?.[0]?.properties?.value ?? null;
        if (val === null || val <= -9999) {
          popup.setContent('<div class="soil-pop-loading">No hazard data at this location</div>'); return;
        }
        const level = val >= 5 ? 'Very High' : val >= 4 ? 'High' : val >= 3 ? 'Moderate' : val >= 2 ? 'Low' : 'Very Low';
        popup.setContent(`
          <div class="soil-pop-head"><div class="soil-pop-label">FAO Climate Hazard — FIRES 2025</div><div class="soil-pop-name">${level}</div></div>
          <div class="soil-pop-rows">
            <div class="soil-pop-row"><span style="color:var(--text-mut)">Index value</span><span style="margin-left:auto">${val}</span></div>
          </div>${coord}`);
      })
      .catch(() => popup.setContent('<div class="soil-pop-loading">No data at this location</div>'));

  } else if (type === 'glw') {
    const z = Math.min(Math.round(map.getZoom()), 13);
    const { tilecol, tilerow, i, j } = latLngToTilePixel(lat, lng, z);
    const url = `https://data.apps.fao.org/map/wmts/wmts?service=WMTS&version=1.0.0&request=GetFeatureInfo` +
      `&layer=fao-gismgr/GLW4-2020/mapsets/D-DA-1KM&style=D-DA-ALL&tilematrixset=EPSG:3857` +
      `&infoFormat=application/json&tilematrix=${z}&tilecol=${tilecol}&tilerow=${tilerow}&i=${i}&j=${j}&dim_a-species=CTL`;
    fetch(url).then(r => r.json())
      .then(d => {
        const val = d.features?.[0]?.properties?.value ?? null;
        if (val === null || val <= -9999) {
          popup.setContent('<div class="soil-pop-loading">No livestock data at this location</div>'); return;
        }
        const density = val < 0.01 ? '<0.01' : val.toFixed(2);
        popup.setContent(`
          <div class="soil-pop-head"><div class="soil-pop-label">FAO Livestock Density — Cattle</div><div class="soil-pop-name">${density} head/km²</div></div>
          <div class="soil-pop-rows">
            <div class="soil-pop-row"><span style="color:var(--text-mut)">Dataset</span><span style="margin-left:auto">GLW4 2020, 1 km</span></div>
          </div>${coord}`);
      })
      .catch(() => popup.setContent('<div class="soil-pop-loading">No data at this location</div>'));

  } else if (type === 'biome') {
    const geom = encodeURIComponent(JSON.stringify({ x: lng, y: lat }));
    fetch(`${LAYER_URLS.esriBiomeQuery}?geometry=${geom}&geometryType=esriGeometryPoint&inSR=4326&spatialRel=esriSpatialRelIntersects&outFields=BIOME_NUM,BIOME_NAME,ECO_NAME,REALM&returnGeometry=false&f=json`)
      .then(r => r.json())
      .then(d => {
        const f = d.features?.[0]?.attributes;
        if (!f) { popup.setContent('<div class="soil-pop-loading">No biome data here</div>'); return; }
        const BIOME_COLORS = { 1:'#38A700',2:'#CCCD65',3:'#88CE66',4:'#00734C',5:'#458970',6:'#7AB6F5',7:'#FEAA01',8:'#FEFF73',9:'#BEE7FF',10:'#D6C39D',11:'#9ED7C2',12:'#FE0000',13:'#CC6767',14:'#FE01C4' };
        const num = f.BIOME_NUM;
        const color = BIOME_COLORS[num] || '#888';
        popup.setContent(`
          <div class="soil-pop-head"><div class="soil-pop-label">RESOLVE Biome 2017</div>
            <div class="soil-pop-name" style="display:flex;align-items:center;gap:6px">
              <span style="width:12px;height:12px;border-radius:2px;background:${color};flex-shrink:0;display:inline-block"></span>${f.BIOME_NAME}
            </div></div>
          <div class="soil-pop-rows">
            <div class="soil-pop-row"><span style="color:var(--text-mut)">Ecoregion</span><span style="margin-left:auto;text-align:right;max-width:170px;line-height:1.3">${f.ECO_NAME}</span></div>
            <div class="soil-pop-row"><span style="color:var(--text-mut)">Realm</span><span style="margin-left:auto">${f.REALM}</span></div>
            <div class="soil-pop-row"><span style="color:var(--text-mut)">Biome #</span><span style="margin-left:auto">${num}</span></div>
          </div>${coord}`);
      })
      .catch(() => popup.setContent('<div class="soil-pop-loading">No data at this location</div>'));

  } else if (type === 'wdpa') {
    const geom = encodeURIComponent(JSON.stringify({ x: lng, y: lat }));
    fetch(`https://data-gis.unep-wcmc.org/server/rest/services/ProtectedPlanet/WDPCA/MapServer/1/query?geometry=${geom}&geometryType=esriGeometryPoint&inSR=4326&spatialRel=esriSpatialRelIntersects&outFields=NAME,DESIG_ENG,IUCN_CAT,STATUS,REP_AREA,ISO3&returnGeometry=false&f=json`)
      .then(r => r.json())
      .then(d => {
        const f = d.features?.[0]?.attributes;
        if (!f) { popup.setContent('<div class="soil-pop-loading">No protected area at this location</div>'); return; }
        const area = f.REP_AREA ? Math.round(f.REP_AREA).toLocaleString() + ' km²' : '—';
        const iucn = f.IUCN_CAT && f.IUCN_CAT !== 'Not Applicable' ? f.IUCN_CAT : '—';
        popup.setContent(`
          <div class="soil-pop-head"><div class="soil-pop-label">WDPA — Protected Area</div><div class="soil-pop-name">${f.NAME}</div></div>
          <div class="soil-pop-rows">
            <div class="soil-pop-row"><span style="color:var(--text-mut);min-width:60px">Designation</span><span style="margin-left:auto;text-align:right;max-width:170px;line-height:1.3">${f.DESIG_ENG || '—'}</span></div>
            <div class="soil-pop-row"><span style="color:var(--text-mut);min-width:60px">IUCN Cat.</span><span style="margin-left:auto">${iucn}</span></div>
            <div class="soil-pop-row"><span style="color:var(--text-mut);min-width:60px">Status</span><span style="margin-left:auto">${f.STATUS || '—'}</span></div>
            <div class="soil-pop-row"><span style="color:var(--text-mut);min-width:60px">Area</span><span style="margin-left:auto">${area}</span></div>
            <div class="soil-pop-row"><span style="color:var(--text-mut);min-width:60px">Country</span><span style="margin-left:auto">${f.ISO3 || '—'}</span></div>
          </div>${coord}`);
      })
      .catch(() => popup.setContent('<div class="soil-pop-loading">No data at this location</div>'));
  }
}

// ─── CONTEXT MENU ─────────────────────────────────────────────────────────────

function addMapContextMenu(map) {
  const container = map.getContainer();
  const menu = L.DomUtil.create('div', 'map-ctx-menu', container);
  menu.innerHTML = `
    <div class="map-ctx-header">Query pixel info</div>
    <div class="map-ctx-item" data-query="soil"><span class="ctx-icon">🪨</span>WRB Soil Group<span class="map-ctx-sub">SoilGrids</span></div>
    <div class="map-ctx-item" data-query="eco"><span class="ctx-icon">🌍</span>Ecoregion<span class="map-ctx-sub">RESOLVE</span></div>
    <div class="map-ctx-item" data-query="esa"><span class="ctx-icon">🌿</span>ESA Land Cover<span class="map-ctx-sub">WorldCover 2021</span></div>
    <div class="map-ctx-item" data-query="aez"><span class="ctx-icon">🌾</span>Agro-Eco Zone<span class="map-ctx-sub">FAO GAEZ v4</span></div>
    <div class="map-ctx-item" data-query="haz"><span class="ctx-icon">🔥</span>Climate Hazard<span class="map-ctx-sub">FAO CRTB 2025</span></div>
    <div class="map-ctx-item" data-query="glw"><span class="ctx-icon">🐄</span>Livestock Density<span class="map-ctx-sub">FAO GLW4 2020</span></div>
    <div class="map-ctx-item" data-query="biome"><span class="ctx-icon">🌱</span>Biome<span class="map-ctx-sub">RESOLVE 2017</span></div>
    <div class="map-ctx-item" data-query="wdpa"><span class="ctx-icon">🛡</span>Protected Area<span class="map-ctx-sub">WDPA / Protected Planet</span></div>`;

  L.DomEvent.disableClickPropagation(menu);
  L.DomEvent.disableScrollPropagation(menu);

  let _latlng = null;
  const hide = () => menu.classList.remove('visible');

  menu.querySelectorAll('.map-ctx-item').forEach(item => {
    item.addEventListener('click', function() {
      hide();
      if (_latlng) queryPixelInfo(_latlng, this.dataset.query, map);
    });
  });

  map.on('contextmenu', function(e) {
    L.DomEvent.preventDefault(e.originalEvent);
    _latlng = e.latlng;
    const pt = e.containerPoint;
    const cw = container.offsetWidth; const ch = container.offsetHeight;
    menu.style.left = (pt.x + 214 > cw ? pt.x - 218 : pt.x + 4) + 'px';
    menu.style.top  = (pt.y + 134 > ch ? pt.y - 138 : pt.y + 4) + 'px';
    menu.classList.add('visible');
  });

  map.on('click', hide);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') hide(); });
}
