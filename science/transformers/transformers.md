---
code: https://colab.research.google.com/drive/1ltmyxn-ROvX7WviMyYsq45U8gGHTUjWc
source: "[[2025_AN_practicalGuideLLM_ivan]]"
source1: "[[2024_AN_speechLanguageProcessing_Daniel]]"
---
**Insight:**  
In plain English, _Transformers_ is a toolset that lets computers read, write, and understand human language by paying attention to the most important parts of a sentence at the same time. The most common meaning today is the [[hugging face]] Transformers** library, first released in 2018, which makes these language models easy to use in real projects.

**High-level:**  
Think of it as a “smart engine” plus a “friendly toolbox.” The smart engine comes from the Transformer idea introduced in 2017 (the “Attention Is All You Need” paper, 2017). The toolbox is the Hugging Face library (since 2018) that l**ets you download ready-made models and use them for tasks like writing text, summarizing, translating, or answering questions, without building everything from scratch.**

**Detail:**  
Before Transformers, many language systems read text word by word in order, which was slower and less flexible. The Transformer approach (2017) lets the model look at all words in a sentence at once and decide which ones matter more for the meaning. This made models much faster to train and much better at understanding context. Hugging Face then packaged this research into an open-source library in 2018 that includes pretrained models, text processors, and simple functions (like `pipeline`) **so people can use powerful AI with just a few lines of code**. Credible sources here are the original Transformer paper (2017) and Hugging Face’s official library releases and documentation (from 2018 onward).

**Architecture:**
![[Pasted image 20260214083335.png]]

**Core concept:**  
“Transformers” in plain English = a modern way for computers to understand and generate language (invented in 2017) and a popular library by Hugging Face (since 2018) that makes using those smart language models simple and practical 🌱.

**Steps to learn**
**Step 1: Neural Networks Basics**
- Learn what [[tokens]], neurons, layers, activations, and weights are.
- Understand forward propagation: how inputs are transformed into outputs.
- Understand back-propagation and gradient descent: how networks learn from errors.
- Why it matters: [[transformers]] are made of layers of neural networks; without this, you can’t grasp the building blocks.
    

**Step 2: Word/Token Embeddings**
- Understand that raw text can’t go into a neural network directly.
- Learn about one-hot encoding and dense vector [[embeddings]] (like word2vec, GloVe).
- Learn how embeddings capture semantic meaning of words or tokens.
- Why it matters: Transformers operate on embeddings, not raw text, and this is how they “understand” language.
    

**Step 3: Attention Mechanism & Self-Attention**
- Learn the problem with sequential models like RNNs and LSTMs (long sequences, vanishing gradients).
- Understand attention: how a model can focus on important parts of the input.
- Understand self-attention: each token looks at every other token to gather context.
- Why it matters: This is the core of transformer architecture and replaces sequential processing.
    

**Step 4: Positional Encoding & Parallel Sequence Processing**
- Learn why transformers process sequences in parallel and need positional information.
- Understand positional encodings (sinusoidal or learned) to keep track of order.
- Learn about masking for tasks like text generation or translation.    
- Why it matters: Without positional encoding, the model wouldn’t know the order of words, which is crucial for meaning.