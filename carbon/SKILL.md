# Writing Drill Web-App Skill

## Purpose
Create local HTML web-apps for vocabulary-based writing practice with JSON I/O for manual Claude review.

## Core Pattern
1. User defines vocabulary words
2. User writes paragraphs using those words in a scenario
3. App generates JSON output
4. User copies JSON to Claude web for review

## Technical Requirements
- Single HTML file (no server needed)
- Embedded CSS + JavaScript
- JSON output for copy-paste workflow
- No external dependencies

## Structure
```
VOCABULARY_POOL → Define words → Write response → Generate JSON → Copy to Claude
```

## JSON Output Format
```json
{
  "vocabulary_definitions": [
    {"word": "X", "user_definition": "..."}
  ],
  "correct_definitions": [
    {"word": "X", "definition": "...", "context": "..."}
  ],
  "scenario": "...",
  "user_response": "...",
  "review_instructions": "..."
}
```

## UI Components
- Word display (pills/badges)
- Definition input (textareas)
- Scenario display
- Response textarea
- JSON output box
- Copy button

## Design Principles
- Dark theme (#0d1f17 bg, #e8ede9 text)
- Card-based layout
- Monospace for JSON
- Clear visual hierarchy
- Mobile-friendly

## First Principles
- **Atomicity**: Each drill is self-contained
- **Transparency**: All data visible as JSON
- **Portability**: Works offline, no dependencies
- **Modularity**: Easy to customize word pools
- **Simplicity**: No auth, no API, no server
