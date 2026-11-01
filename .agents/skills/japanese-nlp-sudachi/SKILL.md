---
name: japanese-nlp-sudachi
description: Multi-granularity Japanese morphological tokenizer, POS tagger, and normalized form analyzer using Sudachi for technical SSW vocab and compound kanji decomposition.
---

# Japanese NLP Sudachi Skill

## Overview
`japanese-nlp-sudachi` provides high-precision Japanese morphological analysis with **multi-granularity tokenization** (Modes A, B, and C). Developed by Works Applications Tokushima Laboratory of AI and NLP, Sudachi solves the classic compound-word dilemma in Japanese pedagogy: whether to teach a compound as a single word or break it into its constituent grammatical morphemes.

## Core Capabilities
- **Multi-Granular Splitting:**
  - **Mode A (Shortest Unit):** Splits into minimal morphemes (essential for grammar pattern matching and furigana mapping).
  - **Mode B (Middle Unit):** Standard dictionary headwords (used in standard JLPT vocabulary lists).
  - **Mode C (Compound/Named Entity):** Keeps multi-kanji idioms, compound verbs, and technical terms intact (vital for SSW vocational tracks).
- **Normalized Form Recovery:** Resolves orthographic variations (e.g. `引受ける` $\to$ `引き受ける`, `附属` $\to$ `付属`).
- **Comprehensive POS Tagging:** Identifies particles (`助詞`), auxiliary verbs (`助動詞`), prefixes (`接頭辞`), and conjugations.

## Installation & Setup
In Python build/ingestion pipeline:
```bash
uv pip install sudachipy sudachidict-small
```
Or for JavaScript / WebAssembly:
```bash
npm install sudachi
```

## Python Pipeline Usage Example

```python
from sudachipy import tokenizer, dictionary

class NuggetTokenizer:
    def __init__(self, dict_type="small"):
        self.tok = dictionary.Dictionary(dict=dict_type).tokenizer()

    def analyze_sentence(self, sentence: str):
        """
        Tokenizes sentence across all three modes to support tiered learning.
        """
        mode_a = [m.surface() for m in self.tok.tokenize(sentence, tokenizer.Tokenizer.SplitMode.A)]
        mode_b = [m.surface() for m in self.tok.tokenize(sentence, tokenizer.Tokenizer.SplitMode.B)]
        mode_c = [m.surface() for m in self.tok.tokenize(sentence, tokenizer.Tokenizer.SplitMode.C)]

        # Detailed breakdown of morphemes
        tokens_detail = []
        for m in self.tok.tokenize(sentence, tokenizer.Tokenizer.SplitMode.A):
            tokens_detail.append({
                "surface": m.surface(),
                "dictionary_form": m.dictionary_form(),
                "reading": m.reading_form(),
                "part_of_speech": m.part_of_speech(),
                "normalized": m.normalized_form()
            })

        return {
            "mode_a_tokens": mode_a,
            "mode_b_tokens": mode_b,
            "mode_c_tokens": mode_c,
            "morphemes": tokens_detail
        }

if __name__ == "__main__":
    analyzer = NuggetTokenizer()
    result = analyzer.analyze_sentence("外国人労働者が特定技能試験を受験する。")
    print("Mode A:", result["mode_a_tokens"])
    print("Mode C:", result["mode_c_tokens"])
```

## Best Practices
1. **SSW & Technical Terminology:** Use **Mode C** when identifying target vocabulary for Tokutei Ginou (Nursing, Food Service, Agriculture) so technical phrases aren't broken into confusing fragments.
2. **Grammar & Furigana Alignment:** Use **Mode A** when generating furigana ruby tags or parsing auxiliary verb chains (e.g. `〜てはいけない`, `〜なければならない`).
3. **Dictionary Sizing:** Use `sudachidict-small` (40MB) for serverless or edge functions, and `sudachidict-core` for batch ingestion pipelines.
