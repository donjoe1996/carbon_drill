# FILE: 000 — Claude Commands MOC.md
> **Map of Content** | Root index for all Claude command knowledge

## 🗺️ Vault Structure
```
Claude Commands/
├── 000 — Claude Commands MOC.md       ← You are here
├── 100 — Foundations.md
├── 200 — Claude.ai Chat Commands.md
├── 300 — Claude Code Session Commands.md
├── 400 — Claude Code Workflow Commands.md
├── 500 — Output & Reasoning Commands.md
├── 600 — Custom Commands & Skills.md
└── 700 — Advanced Patterns & Chaining.md
```

## 🧭 Learning Path (Intermediate → Deep)
1. [[100 — Foundations]] — Ontology of commands
2. [[200 — Claude.ai Chat Commands]] — Web/Mobile interface
3. [[300 — Claude Code Session Commands]] — Context lifecycle
4. [[400 — Claude Code Workflow Commands]] — Execution & review
5. [[500 — Output & Reasoning Commands]] — Response shaping
6. [[600 — Custom Commands & Skills]] — Build your own
7. [[700 — Advanced Patterns & Chaining]] — Power usage

## 🏷️ Tags Index
`#session` `#workflow` `#output` `#custom` `#claudeai` `#claudecode` `#reference`

---

# FILE: 100 — Foundations.md
> **Tags:** #foundations #ontology
> **Parent:** [[000 — Claude Commands MOC]]

## What Are Slash Commands?
Slash commands are **imperative directives** — terse, action-first syntax that bypasses natural language ambiguity. They map to:
- **Being** → Session/context commands (what exists)
- **Doing** → Workflow commands (what happens)
- **Form** → Output commands (how it appears)

## Two Distinct Environments

| Dimension | Claude.ai (Web/Mobile) | Claude Code (CLI) |
|---|---|---|
| Interface | Browser / App | Terminal |
| Trigger | `/` in chat | `/` in session |
| Scope | Conversation | Project + files |
| Custom commands | No | Yes (Skills) |
| Persistence | Per conversation | Per project/global |

## Ontological Hierarchy
```
Command
├── Built-in (shipped by Anthropic)
│   ├── Session commands
│   ├── Workflow commands
│   └── Output commands
└── Custom (user-defined)
    ├── Project-level (.claude/skills/)
    └── Global (~/.claude/skills/)
```

## First Principles
- Commands are **stateless invocations** — they act on current context only
- `/clear` ≠ `/compact` — deletion vs. compression (ontologically distinct)
- Availability depends on plan, platform, and environment

---

# FILE: 200 — Claude.ai Chat Commands.md
> **Tags:** #claudeai #reference
> **Parent:** [[000 — Claude Commands MOC]]

## Overview
Claude.ai (web/mobile) has a lighter set of native slash commands compared to Claude Code. These trigger in the chat input field.

## Available Commands

| Command | Function | When to Use |
|---|---|---|
| `/new` | Start new conversation | Clean context needed |
| `/help` | Show available commands | Discovery |

> ⚠️ Claude.ai's slash command set is intentionally minimal. Most "commands" here are **prompt shortcuts** — pre-built system prompts that invoke a mode.

## Prompt Shortcuts (Unofficial but Recognized)
These work as prefixes at the start of a message:

| Shortcut | Effect |
|---|---|
| `/review` | Activates code review mode |
| `/security` | Security audit lens |
| `/summarize` | Summarization mode |
| `/explain` | Deep explanation mode |
| `/refactor` | Code refactoring mode |
| `/debug` | Debugging assistant mode |
| `/translate` | Language translation mode |
| `/test` | Test generation mode |

## Key Insight
In Claude.ai, the "slash command" is really a **conversational intent signal** — it primes the model's behavior for that turn. It is not a CLI command with deterministic behavior.

## Related
- [[300 — Claude Code Session Commands]] — For deterministic command behavior
- [[500 — Output & Reasoning Commands]] — For shaping responses

---

# FILE: 300 — Claude Code Session Commands.md
> **Tags:** #claudecode #session #reference
> **Parent:** [[000 — Claude Commands MOC]]

## What Are Session Commands?
Session commands control the **context lifecycle** — the state of the conversation window inside a Claude Code interactive session.

## Core Session Commands

### Context Management
| Command | Function | Rule of Thumb |
|---|---|---|
| `/clear` | Deletes entire conversation history | Use when switching tasks entirely |
| `/compact` | Compresses history into a summary | Use when context > 80% full |
| `/compact [focus]` | Compress + retain specific info | e.g., `/compact keep error handling patterns` |

### `/clear` vs `/compact` — Deep Distinction
| | `/clear` | `/compact` |
|---|---|---|
| History | Deleted | Summarized |
| File edits | Preserved | Preserved |
| Context thread | Broken | Maintained |
| Use case | New task | Same task, low on tokens |

### Session Navigation
| Command | Function |
|---|---|
| `/help` | List all available commands |
| `/model` | Switch active model |
| `/fast` | Speed-optimized mode (same model, faster API settings) |
| `/status` | View session info and context usage |

## Related
- [[400 — Claude Code Workflow Commands]]
- [[700 — Advanced Patterns & Chaining]]

---

# FILE: 400 — Claude Code Workflow Commands.md
> **Tags:** #claudecode #workflow #reference
> **Parent:** [[000 — Claude Commands MOC]]

## What Are Workflow Commands?
Commands that control **what Claude does** — review, plan, execute, test.

## Core Workflow Commands

| Command | Function | When to Use |
|---|---|---|
| `/plan` | Toggle plan mode — Claude proposes, waits for approval | Unfamiliar codebase; risky refactor |
| `/review` | Initiates structured code review | Before merging |
| `/security` | Security audit mode | Pre-deployment checks |
| `/test` | Generate/run tests | TDD workflows |
| `/commit` | Stage + commit with message | End of feature work |

## Plan Mode Deep Dive
`/plan` is an **ontological shift** — Claude moves from *agent* (autonomous) to *advisor* (proposes + waits).

```
Normal mode:  Claude → decides → acts
Plan mode:    Claude → proposes → YOU approve → acts
```

Activate mid-session: `/plan on` / `/plan off`

## Git & DevOps Commands

| Command | Function |
|---|---|
| `/diff` | Show current git diff |
| `/pr` | Create pull request |
| `/mcp` | List connected MCP servers |

## Related
- [[300 — Claude Code Session Commands]]
- [[600 — Custom Commands & Skills]]

---

# FILE: 500 — Output & Reasoning Commands.md
> **Tags:** #output #reasoning #reference
> **Parent:** [[000 — Claude Commands MOC]]

## What Are Output Commands?
Commands and prompt codes that shape **how Claude responds** — format, depth, and reasoning style.

## Built-in Output Commands

| Command | Effect |
|---|---|
| `/raw` | Strips all formatting — plain text only |
| `/ghost` | Removes meta-commentary and self-references |

## Community Prompt Codes
> These are not CLI commands — they are **recognized behavioral signals** placed at the start of a prompt.

### Reasoning Depth
| Code | Effect |
|---|---|
| `/deepthink` | Forces longer reasoning chain before answering |
| `L99` | Maximum reasoning depth (complex architecture decisions) |
| `OODA` | Observe → Orient → Decide → Act framework |
| `INVERT` | Solves backward from the goal |
| `XRAY` | Cuts through surface answers to root cause |

### Output Quality
| Code | Effect |
|---|---|
| `/godmode` | Most comprehensive, detailed response |
| `BEASTMODE` | Maximum output quality |
| `ARTIFACTS` | Structures output as numbered deliverables |

## ⚠️ Epistemic Caution
These community codes are **convention-based**, not deterministic. They signal intent to the model. Results may vary across sessions and models.

## Related
- [[200 — Claude.ai Chat Commands]]
- [[700 — Advanced Patterns & Chaining]]

---

# FILE: 600 — Custom Commands & Skills.md
> **Tags:** #custom #skills #claudecode #reference
> **Parent:** [[000 — Claude Commands MOC]]

## What Are Custom Commands?
User-defined slash commands stored as Markdown files. The filename = the command name.

## Two Storage Scopes

| Scope | Path | Availability |
|---|---|---|
| Project | `.claude/skills/[name]/SKILL.md` | Team (via Git) |
| Global | `~/.claude/skills/[name]/SKILL.md` | All your projects |

## Skill File Anatomy
```markdown
---
name: deploy
description: Deploy to staging or production
command: /deploy
---

# Deployment Workflow
1. Run full test suite: `npm test`
2. Check git status: `git status`
3. Deploy to staging: `./deploy.sh staging`
```

## Frontmatter Fields
| Field | Purpose |
|---|---|
| `name` | Shown in autocomplete list |
| `description` | Subtitle in autocomplete hint |
| `command` | Slash trigger (must start with `/`) |

## Design Principles
- Be **directive**, not conversational — use imperative verbs
- Specify exact **output format** (bullets, tables, code blocks)
- Include **examples** — Claude follows examples closely
- Keep skills **under 500 words** — longer = more context consumed
- One skill per workflow — avoid "do everything" skills

## Example: Custom Review Command
```markdown
---
name: TDD Workflow
description: Strict test-driven development
command: /tdd
---

Follow strict TDD for every change:
1. Write a failing test FIRST. Run it. Confirm failure.
2. Write MINIMUM code to pass the test.
3. Refactor only after green.
```

## Related
- [[400 — Claude Code Workflow Commands]]
- [[700 — Advanced Patterns & Chaining]]

---

# FILE: 700 — Advanced Patterns & Chaining.md
> **Tags:** #advanced #chaining #reference
> **Parent:** [[000 — Claude Commands MOC]]

## Command Chaining Philosophy
No native command chaining syntax exists — but patterns emerge from sequencing commands intentionally.

## High-Value Sequences

### Pre-Deployment Audit
```
/compact                  → Free context
/security                 → Audit vulnerabilities
/review                   → Code quality pass
/plan                     → Approve changes step-by-step
/commit                   → Commit clean changes
```

### Deep Research Session
```
XRAY [your question]      → Cut to root answer
/deepthink [follow-up]    → Extend reasoning
ARTIFACTS [output]        → Structure deliverables
/raw                      → Export clean text
```

### Context Recovery (Long Session)
```
/compact keep [X, Y, Z]   → Preserve critical threads
/status                   → Check context health
/model                    → Switch if needed
```

## Reasoning Framework Selection

| Situation | Best Code |
|---|---|
| Architectural decision | `L99` or `OODA` |
| Bug root cause | `XRAY` or `INVERT` |
| Complex explanation | `/deepthink` |
| Clean output needed | `/ghost` + `/raw` |

## The Meta-Pattern
```
Context health → Task framing → Execution → Output shaping
   (/compact)      (OODA/XRAY)   (/plan)      (/raw, /ghost)
```

## Key Principle
Commands are **composable lenses** — each shifts one dimension of Claude's behavior. Master each lens individually before combining them.

## Related
- [[500 — Output & Reasoning Commands]]
- [[600 — Custom Commands & Skills]]
