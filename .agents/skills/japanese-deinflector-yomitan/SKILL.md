---
name: japanese-deinflector-yomitan
description: "Pure JavaScript Japanese verb and adjective de-inflection rule engine using Yomitan's language transforms (yomidevs/yomitan) to deconstruct complex conjugations into step-by-step grammatical explanations for Indonesian learners."
---

# Japanese De-Inflector & Grammar Transforms Skill (Yomitan)

This skill provides guides and implementation patterns based on **Yomitan's Japanese Transform Engine** (`yomidevs/yomitan/ext/js/language/ja/japanese-transforms.js`). It allows reverse-conjugating inflected Japanese verbs and adjectives back to their dictionary forms while detailing every grammatical layer applied.

## 1. Why De-Inflection Matters for Indonesian Learners

Indonesian morphology uses prefixes/suffixes (*meng-...-kan*, *di-...-i*, *ter-*), whereas Japanese uses extensive stem-changing agglutination:
- e.g., `食べさせられなかった` (*tidak terpaksa disuruh makan*):
  1. `食べさせられなかった` (Negative past)
  2. `食べさせられない` (Potential / Passive)
  3. `食べさせる` (Causative)
  4. `食べる` (Dictionary lemma: Ichidan verb)

Yomitan's rules engine decomposes this multi-step chain deterministically without requiring a massive dictionary.

---

## 2. Rule Engine Architecture

Each transform rule defines:
- `suffix`: The inflected ending to match and strip.
- `replacement`: The base suffix to restore.
- `rulesIn`: Valid word classes entering the rule (e.g. Ichidan, Godan-ru, Kuru).
- `rulesOut`: Resulting word class.
- `description`: The grammatical name of the conjugation.

```ts
interface DeinflectionResult {
  source: string;        // Original inflected token
  term: string;          // De-inflected candidate lemma
  rules: number;         // Rule bitmask
  reasons: string[];     // Step-by-step grammatical operations
}

export function deinflectWord(word: string): DeinflectionResult[] {
  // Evaluates transform rules recursively
  const results: DeinflectionResult[] = [];
  // Apply suffix stripping and stem transitions
  return results;
}
```

---

## 3. UI Application in Nugget Nihongo

1. **Tap-to-Breakdown in Reading Passages:** When a learner taps on any verb in an authentic reading passage or dialogue, the modal displays both the dictionary definition and the Indonesian explanation of why the verb is conjugated that way.
2. **Conjugation Quiz Validation:** In the Konjugasi quiz mode, the engine verifies if student attempts correspond to valid grammatical pathways.
