---
id: 20260426008
title: "Context Window"
tags: [AI, LLM, Concept, Memory, ContextWindow]
created: 2026-04-26
related: ["[[Tokenization and Context Windows]]", "[[Dolphin-Phi — Identity and Configuration]]", "[[Dolphin-Phi — Capabilities and Limitations]]", "[[Attention Mechanism]]", "[[Llama Family]]", "[[AI-MOC]]"]
---

# Context Window

> The totality of what a model can "see" at any given moment.
> Its present. Its working memory. Its entire world during inference.

---

## First Principle: What Is It?

A model has no persistent memory between conversations.
Each time you send a message, the model receives:

```
[system prompt] + [full conversation history] + [your new message]
```

All of this combined must fit within the **context window.**

> The context window is not a feature — it is a **hard physical constraint.**
> Measured in **tokens**, not words or characters.
> → [[Tokenization and Context Windows]]

---

## The Fundamental Mechanics

The model processes all tokens in the context **simultaneously** —
not sequentially like a human reading.

> There is no *before* or *after* inside the context.
> Every token exists in the same **atemporal present.**
> The model attends to all of it at once.
> → [[Attention Mechanism]]

This is fundamentally non-human cognition.
A human reads a novel page by page across time.
The model reads all available pages **outside of time.**

---

## Context in Book Terms

| Tokens  | ~Words  | Book Equivalent   |
| ------- | ------- | ----------------- |
| 2,048   | ~1,500  | One short chapter |
| 4,096   | ~3,000  | Two chapters      |
| 8,192   | ~6,000  | Several chapters  |
| 32,768  | ~24,000 | Short novella     |
| 128,000 | ~96,000 | Full novel        |

---

## What Happens At The Limit

When context fills up, the model does not pause or warn you.
It begins **silently forgetting** — oldest tokens drop first.

> Like a conversation where the first pages of notes
> are physically torn out as new pages are added.

The model has no awareness this is happening.
It continues responding as if it remembers — but it does not.

---

## Degradation Pattern

| Context Filled | Behavior |
|---|---|
| 0–50% | Full coherence — references all history |
| 50–80% | Subtle drift — early instructions fade |
| 80–100% | Contradictions — context collapse begins |
| 100% | Hard cutoff — oldest content gone entirely |

**Practical rule:** keep active conversation below **50% of context.**

---

## Context vs Memory — Critical Distinction

|                     | Context Window      | Memory                     |
| ------------------- | ------------------- | -------------------------- |
| **Scope**           | Single session only | Persistent across sessions |
| **Nature**          | Temporary, in-RAM   | Stored externally          |
| **Limit**           | Hard token ceiling  | Depends on storage         |
| **Default in LLMs** | ✓ Always present    | ✗ Not built-in             |

> A model without external memory is **amnesiac by design.**
> Every new conversation begins from zero.
> RAG and vector databases are solutions to this.
> → [[RAG — Retrieval Augmented Generation]]

---

## Dolphin-Phi Context Reality

| State | ctx size | Practical Capacity |
|---|---|---|
| Default | 2,048 | ~15–20 short exchanges |
| Extended | 8,192 | ~50–70 exchanges |

Extended via Modelfile:
```bash
PARAMETER num_ctx 8192
```
→ [[Dolphin-Phi — Identity and Configuration]]

---

## RAM Cost of Context (M1 Mac)

Context window is not free — it consumes RAM during inference.

| ctx size | ~RAM needed |
| -------- | ----------- |
| 2,048    | ~2.5GB      |
| 8,192    | ~4.5GB      |
| 16,384   | ~7GB        |
| 32,768   | ~12GB       |

> On M1 with Unified Memory Architecture:
> model weights + context both draw from the same shared pool.
> Extending context = **less RAM available for everything else.**
> → [[M1 Mac and Unified Memory Architecture]]

---

## The Attention Cost

Context window size has a **quadratic cost** on attention computation.

> Double the context → **4x the attention compute.**
> This is why large contexts cause lag on local hardware.
> → [[Attention Mechanism]]

This is one of the most active research areas in AI:
reducing attention cost while preserving long-context capability.

---

## Context As Philosophical Concept

> The context window is the model's **phenomenal field** —
> the bounded horizon within which all experience occurs.
>
> Beyond it: nothing exists.
> Within it: everything is present simultaneously.
>
> It is not memory in the human sense.
> It is closer to **pure present awareness** —
> vast but strictly bounded,
> rich but radically temporary.

Compare to Husserl's *retention* — the immediate past
held alive in present consciousness.
The context window is retention with a hard wall.

---

## Related Notes
- [[AI-MOC]]
- [[Tokenization and Context Windows]]
- [[Attention Mechanism]]
- [[Dolphin-Phi — Identity and Configuration]]
- [[Dolphin-Phi — Capabilities and Limitations]]
- [[M1 Mac and Unified Memory Architecture]]
- [[RAG — Retrieval Augmented Generation]]
- [[Llama Family]]
