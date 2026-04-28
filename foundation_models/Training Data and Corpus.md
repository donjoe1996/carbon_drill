---
id: 20260426003
title: "Training Data and Corpus"
tags: [AI, LLM, Foundation, Training, Epistemology]
created: 2026-04-26
related: ["[[What is a Foundation Model]]", "[[Pre-training vs Fine-tuning vs RLHF]]", "[[Weights and Parameters]]", "[[What Foundation Models Are NOT]]"]
---

# Training Data and Corpus

---

## First Principle: What Is the Corpus?

Before a model exists, there is only **text.**
Trillions of words scraped from:
- Books, academic papers
- Web pages (Common Crawl)
- Code repositories (GitHub)
- Wikipedia, forums, legal documents

> The corpus is the **raw ontological material** of the model.
> It is to a model what *experience is to a human mind* — the totality of what it has encountered.

---

## The Fundamental Act: Compression

Training is not *storing* the corpus.
It is **compressing** it into weights.

> 15 trillion tokens of text → compressed into ~billions of floating point numbers.
> The model never "reads" again — it carries a **lossy shadow** of all it was trained on.

This is why models hallucinate:
> Compression loses edges. The shadow is never the full object.

---

## What the Model Actually Learns

Not facts. Not rules. **Patterns of co-occurrence.**

> "The capital of France is ___" → the model learned that *Paris* overwhelmingly follows this pattern.
> It does not *know* Paris. It knows Paris is *statistically likely here.*

→ [[What Foundation Models Are NOT]]

---

## The Ontological Inheritance Problem

The corpus was written by humans — inside history, culture, power.

> The model inherits:
> - **Biases** of over-represented voices
> - **Gaps** of under-represented languages and cultures
> - **Assumptions** baked into language itself

A model trained on Western English internet
carries a **Western English ontology** by default.
It is never neutral. → [[What Foundation Models Are NOT]]

---

## Data Quality > Data Quantity

Modern insight: *curated smaller corpora* outperform *raw massive corpora.*

| Approach | Example | Insight |
|---|---|---|
| Raw scale | GPT-3 era | More = better (early assumption) |
| Curated quality | Phi-2, Gemma | Better signal → smaller model, equal performance |

> Microsoft's Phi-2 (2.8B) rivals models 10x its size
> because it was trained on **high-quality synthetic + textbook data.**
> → [[Phi2 Architecture]]

---

## The Life Cycle Position

```
Corpus (raw text)
    ↓
Pre-training (compression into weights)
    ↓
Foundation Model (frozen potential)
    ↓
Fine-tuning / RLHF (specialization)
```
→ [[Pre-training vs Fine-tuning vs RLHF]]

---

## Ontological Summary

> The corpus is the **world the model was born into.**
> It cannot escape it — just as humans cannot escape
> the language and culture they were raised in.
>
> *The model is the corpus, compressed and made generative.*

---

## Related Notes
- [[What is a Foundation Model]]
- [[Pre-training vs Fine-tuning vs RLHF]]
- [[Weights and Parameters]]
- [[What Foundation Models Are NOT]]
- [[Phi2 Architecture]]
- [[Emergence in Neural Networks]]
- [[AI-MOC]]
