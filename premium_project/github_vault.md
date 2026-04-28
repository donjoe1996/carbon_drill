# 🌟 Premium GitHub Projects

> Curated high-value open source repositories worth tracking.

---

## 1. FinceptTerminal
**Repo:** [Fincept-Corporation/FinceptTerminal](https://github.com/Fincept-Corporation/FinceptTerminal)
**Stars:** ⭐ 14.2k | **Forks:** 🍴 1.9k | **License:** AGPL-3.0

### What It Is
A Bloomberg-class financial intelligence desktop terminal — native C++20 + Qt6 frontend with embedded Python for analytics. Open source, single binary, no Electron.

### Core Capabilities
- **CFA-Level Analytics** — DCF, VaR, Sharpe, derivatives pricing
- **37 AI Agents** — Buffett, Graham, Lynch, Munger frameworks; local LLM + multi-provider (OpenAI, Anthropic, Gemini, Ollama…)
- **100+ Data Connectors** — FRED, IMF, World Bank, Polygon, Yahoo Finance, crypto exchanges
- **16 Broker Integrations** — Zerodha, IBKR, Alpaca, and more
- **QuantLib Suite** — 18 quant modules (pricing, stochastic, fixed income)
- **Node Editor** — visual automation pipelines, MCP integration

### Stack
`C++20` · `Qt6` · `Python 3.11` · `CMake` · `Docker`

### Ontological Note
> A philosophical tool of *epistemic sovereignty* — democratizing financial data access that was once gatekept by institutions.

### Install
```bash
git clone https://github.com/Fincept-Corporation/FinceptTerminal.git
cd FinceptTerminal && chmod +x setup.sh && ./setup.sh
```

### Roadmap
| Timeline | Milestone |
|----------|-----------|
| Q2 2026 | Options builder, 50+ AI agents |
| Q3 2026 | Programmatic API, ML training UI |

---

## 2. apfel
**Repo:** [Arthur-Ficial/apfel](https://github.com/Arthur-Ficial/apfel)
**Stars:** ⭐ 14 | **Forks:** 🍴 1 | **License:** MIT

### What It Is
Apple Intelligence from the command line — a Swift CLI/server/GUI wrapper around Apple's native `FoundationModels` framework. No API keys, no cloud, no model downloads.

### Core Capabilities
- **Unix CLI** — single prompts, streaming, interactive chat, pipe support
- **OpenAI-Compatible Local Server** — drop-in replacement at `http://127.0.0.1:11434/v1`
- **Native Debug GUI** — inspect raw SSE streams, request/response payloads, refusal handling
- **Voice I/O** — speech-to-text input, TTS playback
- **Self-Discussion Mode** — A-vs-B prompt comparison harness

### Stack
`Swift 6.2` · `FoundationModels.framework` · `macOS 26+ (Tahoe)` · `Apple Silicon only`


>[!warning] Compatibility Blocker Requires **macOS 26 (Tahoe) + Apple Silicon**. Will not build on macOS 14 (Sonoma) or earlier. `FoundationModels.framework` is unavailable on older systems. **Upgrade macOS first.**

### Ontological Note
> Embodies *on-device epistemic privacy* — intelligence that never leaves your hardware, resisting the cloud-dependency paradigm.

### Install
```bash
git clone https://github.com/Arthur-Ficial/apfel.git
cd apfel && make install
```

### Architecture
```
CLI / GUI / OpenAI-compatible server
        ↓
FoundationModels.framework
        ↓
Apple Intelligence (on-device / Private Cloud Compute)
```

---

## Tags
#github #tools #finance #AI #open-source #terminal #apple-intelligence #local-llm

## Related
- [[Open Source Tools MOC]]
- [[AI & LLM Resources]]
- [[Finance & Investing]]

## 2. RTK
https://github.com/rtk-ai/rtk

## RTK: Ontological Foundation

### **Being** (Essence)

RTK is a **command-output filter**—a Rust binary that intercepts shell commands and compresses their responses before LLMs see them.

### **Causa Formalis** (Formal Cause—Structure)

Four compression strategies per command type:

1. **Smart Filtering** – removes noise (comments, whitespace)
2. **Grouping** – aggregates similar items
3. **Truncation** – keeps relevant context, cuts redundancy
4. **Deduplication** – collapses repeated lines with counts

### **Causa Finalis** (Final Cause—Purpose)

**Problem:** LLM context (tokens) is finite. Running `git status`, `cargo test`, `ls` wastes tokens on verbose output.

**Solution:** 60-90% token reduction on common dev commands.

Example: `cargo test` failure usually outputs 200+ lines → RTK shows only failed tests (~20 lines).

### **Causa Efficiens** (Efficient Cause—Mechanism)

**Without RTK:**

```
Claude → shell → git status → 2,000 tokens (raw output)
```

**With RTK:**

```
Claude → RTK filter → git status → 200 tokens (compressed)
```

### **Installation & Use**

Single command: `rtk init -g` installs a bash hook that transparently rewrites commands.

When you type `git status`, the hook converts it to `rtk git status` **before execution**. Claude never knows; it just receives compressed output.

### **Practical Ontology**

- **100+ supported commands** (git, cargo, docker, npm, etc.)
- **<10ms overhead** – nearly imperceptible
- **Single binary, zero dependencies** – minimal coupling

This is token optimization at the _ground level_—not a prompt hack, but a structural intervention in the data stream itself.