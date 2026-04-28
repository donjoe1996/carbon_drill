---
source: "[[2024_AN_speechLanguageProcessing_Daniel]]"
---

**Tokenization is how AI breaks text into bite-sized pieces it can understand.**

Think of it like this: You can't eat a whole pizza in one bite, so you cut it into slices. LLMs can't process entire sentences at once, so they chop text into smaller chunks called "tokens."

**What's a token?**

- Sometimes it's a whole word: "cat" = 1 token
- Sometimes it's part of a word: "running" might be "run" + "ning" = 2 tokens
- Sometimes it's just a few letters: "strawberry" might get split into "straw" + "berry"
- Punctuation and spaces count too!

**Why does this matter to you?**

1. **Pricing**: Many AI services charge by the token, not by the word. So "I'm" counts as 2 tokens (I + 'm), while "I am" is also 2 tokens (I + am).
    
2. **Context limits**: When you see "128k token limit," that's roughly how much text the AI can remember in a conversation (around 96,000 words).
    

**Real example:** The sentence "ChatGPT is amazing!" becomes roughly:

- "Chat"
- "G"
- "PT"
- " is"
- " amazing"
- "!"

That's about 6 tokens for 3 words.

Bottom line: Tokenization is just the AI's way of turning your text into manageable pieces it can work with, kind of like how you'd break LEGO blocks apart before building something new.

Before almost any natural language processing of a text, the text has to be normal-  
ized, a task called text normalization. At least three tasks are commonly applied astextnormalization  
part of any normalization process:  
1. Tokenizing (segmenting) words  
2. Normalizing word formats  
3. Segmenting sentences