---
id: 20260426009
title: "Tokenization and Context Windows"
tags: [AI, LLM, Concept, Tokenization, ContextWindow]
created: 2026-04-26
related: ["[[Context Window]]", "[[Transformer Architecture]]", "[[Attention Mechanism]]", "[[Weights and Parameters]]", "[[AI-MOC]]"]
---

# Tokenization and Context Windows

> Before a model can think, it must first *translate.*
> Human language → numbers. This translation is tokenization.

---

## First Principle: Why Tokenization Exists

Neural networks operate entirely on **numbers — vectors of floating points.**
They cannot process raw text.

> Tokenization is the bridge between
> *human language* and *mathematical space.*

---

## What Is a Token?

A token is **not** a word. It is a **sub-word unit** — a chunk of characters
that appears frequently enough to deserve its own ID.

Examples using GPT-style tokenization:

| Text | Tokens | Count |
|---|---|---|
| `"Hello"` | `["Hello"]` | 1 |
| `"Tokenization"` | `["Token", "ization"]` | 2 |
| `"I am a philosopher"` | `["I", " am", " a", " phil", "osopher"]` | 5 |
| `"GPT-4"` | `["G", "PT", "-", "4"]` | 4 |

> Common words = 1 token
> Rare or long words = split into multiple tokens
> Numbers and code = often many tokens per character

---

## The Tokenization Process

```
Raw text
    ↓
Byte Pair Encoding (BPE) — merge frequent character pairs
    ↓
Vocabulary lookup — each chunk → integer ID
    ↓
[15496, 262, 2836, 318, 257, 8887]  ← what model actually sees
    ↓
Embedding layer — each ID → high-dimensional vector
    ↓
Model processes vectors
```

---

## Byte Pair Encoding (BPE) — First Principles

BPE is the dominant tokenization algorithm.

**How it works:**
1. Start with individual characters as vocabulary
2. Count most frequent adjacent pairs
3. Merge the most frequent pair into one token
4. Repeat until vocabulary size is reached (~50,000 tokens)

> The vocabulary is **learned from training data.**
> Common patterns in the corpus → efficient single tokens.
> Rare patterns → broken into smaller pieces.

This is why models handle English better than rare languages —
English patterns dominate the vocabulary.
→ [[Training Data and Corpus]]

---

## Token ↔ Word Conversion

The practical rule of thumb:

> **1 token ≈ ¾ of a word** (in English)
> **100 tokens ≈ 75 words ≈ ~½ paragraph**

| Tokens | ~Words | ~Pages |
|---|---|---|
| 512 | ~380 | ~¾ page |
| 2,048 | ~1,500 | ~3 pages |
| 8,192 | ~6,000 | ~12 pages |
| 128,000 | ~96,000 | ~192 pages |

Non-English text is *less efficient* — more tokens per word.
Code is *variable* — sometimes very token-expensive.

---

## How Tokenization Defines The Context Window

The context window is measured in **tokens, not words.**

> When Dolphin-Phi has `num_ctx 8192`:
> it can hold 8,192 tokens — roughly 6,000 English words
> in its present moment simultaneously.

Every element consumes tokens:
- System prompt → tokens
- Your message → tokens
- Model's reply → tokens
- Conversation history → tokens

All must fit within the ceiling.
→ [[Context Window]]

---

## The Tokenization Trap

Tokens are invisible to users — this creates hidden costs.

**Example:** asking the model to process a PDF:
- You think: "it's 10 pages"
- Reality: "it's ~5,000 tokens" — 60% of dolphin-phi's default context

**Code is especially expensive:**
```python
def calculate_fibonacci(n):
    if n <= 1:
        return n
```
This short snippet = ~25 tokens already.

---

## Why Tokenization Affects Model Behavior

### The Split-Word Problem
> `"Unfortunately"` → `["Un", "fort", "unately"]`
> The model sees three separate units, not one word.
> Meaning is reconstructed by the model — imperfectly at boundaries.

### The Number Problem
> `"1,432,891"` → `["1", ",", "432", ",", "891"]` — 5 tokens
> Arithmetic on tokenized numbers is unnatural for models.
> This is one root cause of poor mathematical performance.
> → [[Dolphin-Phi — Capabilities and Limitations]]

### The Language Inequality Problem
> English: ~1 token per word
> Japanese: ~2–3 tokens per word
> Arabic: ~3–4 tokens per word

> Same context window = **less capacity for non-English speakers.**
> A structural inequality baked into the architecture.

---

## Tokenization Across Model Families

Different models use different tokenizers — they are **not interchangeable.**

| Model Family | Tokenizer | Vocab Size |
|---|---|---|
| Llama 3 | Tiktoken-based | ~128,000 |
| Phi-2 / Dolphin-Phi | Custom BPE | ~50,000 |
| Mistral | SentencePiece | ~32,000 |
| GPT-4 | cl100k_base | ~100,000 |

> Larger vocabulary = fewer tokens per word = more efficient context use.
> Llama 3's 128K vocabulary is one reason it handles context so efficiently.
> → [[Llama Family]]

---

## Ontological Summary

> Tokenization is the **act of translation** between two ontological orders:
> — the continuous, ambiguous world of human language
> — the discrete, mathematical world of neural computation
>
> The model never sees your words.
> It sees *integers* — shadows of your meaning,
> passed through a learned vocabulary
> before any understanding begins.
>
> Every limitation that follows — mathematical weakness,
> language inequality, context costs —
> traces back to this foundational translation act.

---

## Related Notes
- [[AI-MOC]]
- [[Context Window]]
- [[Transformer Architecture]]
- [[Attention Mechanism]]
- [[Training Data and Corpus]]
- [[Llama Family]]
- [[Dolphin-Phi — Capabilities and Limitations]]
- [[Weights and Parameters]]
