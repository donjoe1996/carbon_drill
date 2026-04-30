# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

A single-file React component (`carbon-writing-drill.jsx`) — an interactive writing drill for professionals learning carbon markets vocabulary and the FCAD writing framework. No build system, no npm, no tests.

## Architecture

The entire app lives in one JSX file with inline styles. It uses raw `fetch()` calls to the Anthropic API — no SDK.

**App stages** (controlled via `stage` state):
1. `welcome` → intro and FCAD framework reference
2. `loading` → generating session via Claude
3. `drill` → user fills in vocabulary definitions + writes 2 FCAD paragraphs
4. `submitting` → sending to Claude for evaluation
5. `feedback` → showing scored results

**Claude API usage** (`callClaude()`):
- `PROMPT_SYSTEM` prompt: generates a writing scenario requiring both vocabulary words
- `FEEDBACK_SYSTEM` prompt: evaluates submission and returns structured JSON with scores (0–10) for vocabulary accuracy and FCAD compliance, plus `bestSentence` and `tip`

**Vocabulary pool** (10 carbon/GIS terms): hardcoded array, selected via `fisherYates()` shuffle + `pickTwo()` which avoids repeating the most recent pair.

## API Key

The Anthropic API key must be injected at the call site — the component does not read from environment variables. Look for the `apiKey` reference inside `callClaude()` when wiring this up.

## Extending

- To add vocabulary words: append to the `WORDS` array
- To change the scoring rubric: edit `FEEDBACK_SYSTEM`
- To add a new app stage: add a value to the `stage` state and a corresponding render branch in the JSX return
- The dark-green forest theme colors (`#0d1f17`, `#1a3a2a`, etc.) are defined inline throughout — no theme object exists yet
