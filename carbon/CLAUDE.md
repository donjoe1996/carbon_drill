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

Assessment stages (`stage-vm47`, `stage-iso`) are `position: fixed; inset: 0; z-index: 200` full-screen overlays with a left accordion column + full-height Leaflet satellite map.

### Login
- Static gate: username and password both `letmein123`
- `doLogin()` checks credentials, hides `#stage-login`, calls `show("stage-welcome")`

### Drill types

**Vocabulary & Writing** — picks 2 words from `WORD_POOL` (50 carbon/GIS terms), generates a scenario, user defines words and writes a 2-paragraph FCAD response. Outputs JSON for Claude evaluation.

**Reading & Editing** — picks a passage from `READING_POOL`, user identifies grammar errors and logical flaws. Outputs JSON with planted errors for Claude to score against.

**VM47 Eligibility** — picks a scenario from `VM47_SCENARIOS`, user assesses against `VM47_CRITERIA` (VM0047 v1.1 applicability conditions) using Leaflet satellite map. Outputs JSON for Claude to score determination and FCAD reasoning.

**Isometric Reforestation** — same structure as VM47 but uses `ISO_SCENARIOS` and `ISO_CRITERIA` (Isometric Reforestation Protocol v1.1). Source: `https://registry.isometric.com/protocol/reforestation`

### Assessment stage UI (VM47 + Isometric)
- Left column (360 px): 3 accordion panels — Land Scenario, Criteria list, Your Determination
- `togglePanel(prefix, name)` — opens clicked panel, collapses others
- Determination panel: eligibility toggle (yes/no), FCAD tag row, growing textarea, word count, Generate JSON button
- Right: Leaflet satellite map (`google.com/vt/lyrs=y`) with a circle marker per scenario
- Map instances are lazily created and reused across scenarios (`_vm47Map`, `_isoMap`)

### Output flow
All drills call `showOutput(output, drillType)` which renders JSON into `#json-output`. User copies/pastes the JSON into claude.ai. No API calls are made from the browser.

## CSS Design Tokens (`:root`)

```
--bg, --surface, --panel       background layers
--border, --border2            border colors
--green, --green-lt, --accent  green scale
--text, --text-dim, --text-mut text hierarchy
--badge-bg, --badge-fg         section badge colors
--red                          ineligible state
```

Fonts: `DM Sans` (UI) + `DM Mono` (labels/badges) for assessment stages; `Playfair Display` + `Lato` for welcome/drill/reading stages.

## Extending

- **Add vocabulary words**: append to `WORD_POOL` in `data.js`
- **Add a reading passage**: append to `READING_POOL` in `data.js` (include `sentences[]` and `planted_errors[]`)
- **Add a VM47 scenario**: append to `VM47_SCENARIOS` in `data.js` (include `lat`, `lng`, `zoom`, `eligible`, `failing_criteria[]`, `rationale`)
- **Add an Isometric scenario**: same pattern, append to `ISO_SCENARIOS`
- **Add a new drill type**: add a stage div, a drill card in `stage-welcome`, start/generate functions, and a branch in `showOutput()`
- **Change the review rubric**: edit `review_instructions` inside the relevant `generate*Output()` function
