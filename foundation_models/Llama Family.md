---
id: 20260426004
title: "Llama Family"
tags: [AI, LLM, Ollama, Meta, Llama, ModelFamily]
created: 2026-04-26
related: ["[[Ollama Model Families]]", "[[What is a Foundation Model]]", "[[Transformer Architecture]]", "[[Quantization]]", "[[AI-MOC]]"]
---

# Llama Family

> Meta's open-weight model family. The most influential open-source LLM lineage in existence.

---

## First Principle: Why Llama Matters

Before Llama, powerful foundation models were **closed** — accessible only via API, owned by corporations.

> Llama changed the ontology of AI:
> *from proprietary artifact → to open substrate.*
> Anyone could download, modify, run, and fine-tune it.

---

## The Lineage

| Version       | Released | Parameters   | Key Leap                                 |
| ------------- | -------- | ------------ | ---------------------------------------- |
| **Llama 1**   | Feb 2023 | 7B–65B       | First open-weight serious contender      |
| **Llama 2**   | Jul 2023 | 7B–70B       | Commercial use allowed, RLHF applied     |
| **Llama 3**   | Apr 2024 | 8B–70B       | Major quality jump, 128K context         |
| **Llama 3.1** | Jul 2024 | 8B–405B      | 405B flagship, tool use, multilingual    |
| **Llama 3.2** | Sep 2024 | 1B–90B       | Vision models, lightweight edge versions |
| **Llama 4**   | 2025     | MoE variants | Mixture of Experts architecture          |

---

## Architecture: First Principles

Llama is a **decoder-only transformer** — meaning:
- It only generates (decodes) — no encoder
- Autoregressive: predicts one token at a time
- Each token attends to all previous tokens

→ [[Transformer Architecture]]
→ [[Attention Mechanism]]

---

## What "Open-Weight" Actually Means

> Open-weight ≠ open-source.
> The **weights are released** — you can run and modify the model.
> The **training data and code** may remain closed.

This is an important ontological distinction:
- You inherit the *compressed artifact* of training
- You do not inherit the *process* that created it
→ [[Training Data and Corpus]]

---

## Llama on Ollama

```bash
# Pull specific sizes
ollama pull llama3.2        # default (3B)
ollama pull llama3.2:1b     # lightest — runs on anything
ollama pull llama3.1:8b     # best quality/performance balance
ollama pull llama3.1:70b    # powerful — needs ~48GB RAM
```

### Recommended for M1 Mac

| Model | RAM Required | Best For |
|---|---|---|
| `llama3.2:1b` | ~1.5GB | Fast, lightweight tasks |
| `llama3.2:3b` | ~3GB | Everyday use |
| `llama3.1:8b` | ~6GB | Best M1 sweet spot |

---

## Llama vs Dolphin-Phi on M1

| | Llama 3.2 3B | Dolphin-Phi 2.8B |
|---|---|---|
| Architecture | Llama decoder | Phi-2 decoder |
| Guardrails | Present (RLHF) | Removed |
| Context (default) | 128K | 2048 |
| Training data | General web | Curated synthetic |
| Best for | General reasoning | Uncensored experimentation |

→ [[Dolphin-Phi — Identity and Configuration]]

---

## The Derivative Ecosystem

Llama's open weights spawned hundreds of fine-tunes:
- **Mistral** — trained independently but inspired by Llama era
- **Dolphin-Llama** — uncensored Llama variant
- **CodeLlama** — code-specialized
- **Vicuna, Alpaca** — early instruction-tuned variants

> Every fine-tune is a *child* of the foundation.
> Llama is the most prolific *parent* in open AI history.

→ [[Pre-training vs Fine-tuning vs RLHF]]

---

## Ontological Summary

> Llama did not just release a model.
> It released the **ontological conditions** for an open AI ecosystem.
> Every local model running on your M1 today exists
> because Llama proved open weights were viable.

---

## Related Notes
- [[AI-MOC]]
- [[Ollama Model Families]]
- [[What is a Foundation Model]]
- [[Transformer Architecture]]
- [[Quantization]]
- [[Training Data and Corpus]]
- [[Pre-training vs Fine-tuning vs RLHF]]
- [[Dolphin-Phi — Identity and Configuration]]
