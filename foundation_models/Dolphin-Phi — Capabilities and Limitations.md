---
id: 20260426007
title: "Dolphin-Phi — Capabilities and Limitations"
tags: [AI, LLM, Ollama, DolphinPhi, Evaluation, Capabilities]
created: 2026-04-26
related: ["[[Dolphin-Phi — Identity and Configuration]]", "[[Emergence in Neural Networks]]", "[[Training Data and Corpus]]", "[[Context Window]]", "[[What Foundation Models Are NOT]]", "[[AI-MOC]]"]
---

# Dolphin-Phi — Capabilities and Limitations

> A practical evaluation map of what dolphin-phi does well,
> where it struggles, and *why* — grounded in first principles.

---

## First Principle Frame

All capabilities and limitations trace back to three root causes:

1. **Scale** — 2.8B parameters sets a hard ceiling
2. **Training data** — curated synthetic textbook data shapes strengths
3. **Context window** — 2048 default (8192 extended) bounds memory

> Every strength and weakness below is a *consequence* of these three.

---

## What It Is GOOD At

### ✓ Grammar and Language Correction
**Strength level: High**

Grammar is pure **statistical pattern matching** — the model's native act.
Phi-2 was trained on clean, well-structured textbook English.
Its weights are saturated with grammatical regularity.

> Correcting grammar = nudging text toward learned patterns.
> No reasoning required. No world knowledge needed.
> This sits well within its 2.8B emergence threshold.
> → [[Emergence in Neural Networks]]

Use cases:
- Fix sentence structure
- Correct punctuation and tense
- Improve clarity and readability
- Rewrite awkward phrasing

---

### ✓ Style Rewriting and Paraphrasing
**Strength level: Medium-High**

Similar to grammar — pattern-based.
Can rewrite text in different tones: formal, casual, concise.

Limitation: style is shallow at 2.8B.
It mirrors surface patterns, not deep rhetorical structure.

---

### ✓ Short Summarization
**Strength level: Medium-High**

Performs well on short documents that fit within context.
Struggles when source material approaches context limit.
→ [[Context Window]]

---

### ✓ Simple Q&A and Explanation
**Strength level: Medium**

Handles factual questions on well-represented topics.
Textbook training data = good at explaining established concepts clearly.

Weakness: answers may sound confident even when wrong.
→ [[What Foundation Models Are NOT]]

---

### ✓ Code Assistance (Basic)
**Strength level: Medium**

Phi-2 training included code.
Can handle: syntax help, simple functions, debugging obvious errors.

Fails at: complex architecture, large codebases, cutting-edge libraries.

---

### ✓ Creative Writing (Short Form)
**Strength level: Medium**

Short stories, descriptions, brainstorming — competent.
Loses coherence in long-form creative tasks as context fills.

---

### ✓ Instruction Following
**Strength level: Medium-High**

Dolphin fine-tune specifically improved compliance.
Follows structured prompts reliably — especially with clear system prompt.
→ [[Dolphin-Phi — Identity and Configuration]]

---

## What It Is NOT Good At

### ✗ Factual Accuracy on Niche Topics
**Weakness level: High**

2.8B parameters cannot store the long tail of human knowledge.
Will **hallucinate confidently** on rare, specific, or recent facts.

> It does not know what it doesn't know.
> → [[What Foundation Models Are NOT]]

Rule: **always verify** factual outputs externally.

---

### ✗ Multi-Step Complex Reasoning
**Weakness level: High**

Chain-of-thought reasoning requires scale.
70B+ models handle this reliably.
At 2.8B — reasoning chains collapse or drift after 2-3 steps.

> This is an emergence threshold failure.
> The capability simply has not materialized at this scale.
> → [[Emergence in Neural Networks]]

---

### ✗ Long Document Tasks
**Weakness level: High**

Default context = 2048 tokens (~1,500 words).
Extended context = 8192 tokens (~6,000 words).

Any task requiring awareness of a full document beyond this
will produce **context collapse** — the model forgets the beginning.

---

### ✗ Current Events and Recent Knowledge
**Weakness level: High (without web search)**

Training cutoff = frozen knowledge.
Without [[Ollama Web Search]] enabled — completely blind to the present.

With web search: partially mitigated.

---

### ✗ Mathematical Reasoning
**Weakness level: High**

Basic arithmetic: acceptable.
Algebra, calculus, proofs: unreliable.
Models need significant scale and specialized training for math.

---

### ✗ Multilingual Tasks
**Weakness level: Medium-High**

Phi-2 trained primarily on English.
Other languages: degraded performance, inconsistent grammar.

---

### ✗ Self-Awareness of Limitations
**Weakness level: Critical**

> The most dangerous limitation:
> dolphin-phi does not know its own boundaries.
> It will answer confidently beyond its competence.

Always apply external judgment to its outputs.

---

## Capability Map Summary

| Task | Performance | Root Cause |
|---|---|---|
| Grammar correction | ★★★★★ | Pattern matching — native strength |
| Style rewriting | ★★★★☆ | Pattern-based, shallow |
| Short summarization | ★★★★☆ | Within context limits |
| Simple explanation | ★★★☆☆ | Textbook training helps |
| Basic code help | ★★★☆☆ | Code in training data |
| Creative writing | ★★★☆☆ | Short form only |
| Complex reasoning | ★★☆☆☆ | Below emergence threshold |
| Factual accuracy | ★★☆☆☆ | Scale limitation |
| Long documents | ★★☆☆☆ | Context window ceiling |
| Mathematics | ★★☆☆☆ | Not specialized |
| Current events | ★☆☆☆☆ | Training cutoff |
| Multilingual | ★☆☆☆☆ | English-dominant training |

---

## Practical Rules of Thumb

1. **Trust it** for language tasks — grammar, style, clarity
2. **Verify it** for factual claims — always cross-check
3. **Break it up** for long tasks — stay within 50% of context
4. **Be explicit** in prompts — it follows instructions well when clear
5. **Enable web search** for anything current → [[Ollama Web Search]]

---

## Ontological Summary

> Dolphin-phi is a **linguistic specialist**, not a generalist reasoner.
> Its strengths are where language pattern-matching suffices.
> Its failures are where scale, recency, or deep reasoning are required.
>
> Knowing its limits is not a weakness in the tool —
> it is wisdom in the user.

---

## Related Notes
- [[AI-MOC]]
- [[Dolphin-Phi — Identity and Configuration]]
- [[Emergence in Neural Networks]]
- [[Training Data and Corpus]]
- [[Context Window]]
- [[What Foundation Models Are NOT]]
- [[Ollama Web Search]]
- [[Quantization]]
