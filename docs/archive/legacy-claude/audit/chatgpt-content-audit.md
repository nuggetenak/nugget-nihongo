# Nugget Nihongo — Learning Content Audit
**Audit date:** 11 October 2026  
**Website:** https://nugget-nihongo.pages.dev/  
**Repository / production branch inspected:** https://github.com/nuggetenak/nugget-nihongo/tree/main  
**Purpose:** Audit the learning material itself: coverage, grammar/vocabulary tagging, curriculum-to-content alignment, textbook mappings, fallback exercises, and instructional accuracy.

## Executive conclusion

Nugget Nihongo has a substantial and growing dataset, including vocabulary and grammar entries, curriculum tracks, textbook mappings, and diagnostic content. The most important content risks are not simply that the collection is “too small.” They are that **curriculum mapping is not consistently pedagogical, several static fallback questions point to the wrong source entries, the generic lesson generator can create invalid practice questions by construction, and grammar taxonomy is misclassified in foundational levels**.

This matters because learners can get a polished explanation or quiz interface while the content is teaching the wrong item, testing an unrelated concept, or attaching progress to the wrong vocabulary record.

This was a source-and-data audit, not an exhaustive native-speaker review of every sentence in the corpus. Counts, ID mappings, the curriculum generator, and static fallback files were checked directly. Naturalness and subtle Japanese usage claims should receive an expert review before they are treated as fully adjudicated.

## Finding summary

| ID | Severity | Finding | Evidence |
|---|---|---|---|
| C-01 | Critical | SSW specialist tracks repeat the same three grammar IDs and two generic vocabulary IDs across every unit | Verified in curriculum JSON |
| C-02 | High | Generic curriculum builder assigns items by array position, not by lesson theme | Verified in `scripts/build-curriculum-all.js` |
| C-03 | High | Dynamic fallback lesson generator constructs semantically invalid cloze and “naturalness” drills | Verified in `src/lib/curriculum/lessonContentAdapter.ts` |
| C-04 | High | 19 of 20 static fallback vocabulary questions have a `source_id` that points to a different word than the prompt asks about | Verified by comparing questions to vocabulary records |
| C-05 | High | 19 of 20 static fallback grammar drills have a source reference that does not match the grammatical point tested | Verified by comparing prompts and referenced grammar entries |
| C-06 | High | N5 curriculum has only 124 unique vocabulary IDs explicitly mapped to lessons, despite a description claiming 990+ N5 vocabulary | Verified in curriculum JSON |
| C-07 | Medium–High | Core particle and phrase entries are categorized as `te-form-use`; module names also disagree with their actual contents | Verified in grammar data |
| C-08 | Medium–High | 136 exact grammar pattern strings appear in more than one record across levels/IDs; a number appear duplicated within N2 itself | Verified by parsing grammar records |
| C-09 | Medium | Textbook chapter vocabulary arrays contain repeated IDs in 19 inspected arrays | Verified in five book mapping files |
| C-10 | Medium | Prominent teaching note overgeneralizes the social meaning of あなた | Verified in curated lesson; cross-checked against usage references |
| C-11 | Medium | A curated N5 explanation says です “always” ends the sentence, which overstates the beginner rule | Verified in lesson content |
| C-12 | Medium | Persisted AI-promoted quiz bank is empty for N5/N4/N3 and no corresponding N2/N1 bank files are present | Verified in repository tree; dynamic quizzes may still exist |
| C-13 | Medium | Documentation overstates/understates current content totals and does not define a defensible notion of “complete JLPT coverage” | Verified in README/index comments; official JLPT guidance linked below |
| C-14 | Medium | Structural tests check that lessons contain fields, but do not test semantic correctness of prompts, answers, dialogue, or theme alignment | Verified in tests |

Severity indicates likely educational impact, not a quantified learning-outcome study.

---

## 1. Current content inventory

### Vocabulary records by level

Counts below are derived from the current level/category source files and the current curriculum metadata, not the old README table.

| Level | Vocabulary records | Grammar records |
|---|---:|---:|
| N5 | 991 | 94 |
| N4 | 946 | 92 |
| N3 | 2,368 | 163 |
| N2 | 344 | 310 |
| N1 | 190 | 200 |
| **Total** | **4,839** | **859** |

**Interpretation:** N5–N4 have meaningful breadth; N2–N1 vocabulary are substantially smaller. This is a strong reason to prioritize upper-level expansion and coverage measurement, but raw counts alone do not establish a JLPT pass probability or official list completeness.

The README still advertises the older totals: N5 725, N4 692, N3 615, N2 260, N1 130 vocabulary, and grammar 94/92/119/250/140. Comments in `public/data/vocab/vocab-index.js` are also stale. Generated component-file headers such as those in `public/data/vocab/n5/` are stale as well: for example, `n5-nouns.js` says 416 entries while direct ID parsing found 625 current entries in that module. The compiled corpus and its source modules should have a single generated count source.

### Do not promise “all official JLPT vocabulary/grammar”

The JLPT states that since its 2010 revision it no longer publishes a fixed “Test Content Specifications” list of vocabulary, kanji, and grammar. It directs learners toward each level’s linguistic-competence summary and sample questions instead. Therefore, the product should not claim to cover “every official JLPT item” based only on counts or an internally maintained list. A more defensible goal is a versioned, evidence-based curriculum mapped to the JLPT’s public competency descriptions, sample-question types, and clearly described corpus sources.

Reference: https://www.jlpt.jp/e/faq/index.html

---

## 2. C-01 — SSW tracks do not yet have enough domain-specific vocabulary/grammar

**Severity: Critical · Verified**

The current Construction, Food/Restaurant, and Kaigo curriculum JSON files each declare eight units and sixteen lessons. However, their unit-level and lesson-level references repeat the same small set:

- Grammar: `gn4-00010`, `gn4-00013`, `gn4-00021` — only **3 unique grammar IDs** across 24 unit references.
- Vocabulary: `vg-n4-00001`, `vg-n4-00002` — only **2 unique vocabulary IDs** across 16 unit references.

Those vocabulary IDs are `動く` (“move”) and `動かす` (“move something”). They are not sufficient as the subject vocabulary for specialist training in construction, food handling, or elderly care. A Construction track may display specialized lesson titles about PPE, KYK hazards, or morning procedures, but the mapped vocabulary/grammar references do not cover those topics.

### Impact
Learners may follow a track labelled for a specific workplace sector without receiving the vocabulary and language patterns implied by the track. The mismatch is particularly serious because sector-specific language can affect safety, instructions, hygiene, care, and workplace communication.

### Recommended fix
Treat SSW content as a separate domain curriculum, not as N4 content with a few sector labels. Create sector-specific vocabulary and grammar IDs for at least:
- **Construction:** PPE, tools/equipment, hazards, locations, measurements, instructions, reporting incidents, prohibition/obligation, sequence and confirmation.
- **Food service/processing:** hygiene, contamination, temperatures, storage, preparation, allergens, cleaning, equipment, customer/service phrases.
- **Kaigo:** respectful forms of address, asking permission, assisting movement, pain/discomfort, vital observations, meals/toileting/bathing, reporting changes, safeguarding and urgent requests.

For every lesson, enforce minimum unique sector vocabulary and target grammar quotas. Then have a qualified sector-language reviewer validate terminology and safety implications. Do not recycle general N4 words as if they were sector-specific learning targets.

Evidence:
- https://github.com/nuggetenak/nugget-nihongo/blob/main/public/data/curriculum/curriculum-ssw-construction.json
- https://github.com/nuggetenak/nugget-nihongo/blob/main/public/data/curriculum/curriculum-ssw-food.json
- https://github.com/nuggetenak/nugget-nihongo/blob/main/public/data/curriculum/curriculum-ssw-kaigo.json

---

## 3. C-02 — Standard curriculum is organized by array slices, not semantic fit

**Severity: High · Verified**

`scripts/build-curriculum-all.js` divides each level’s grammar and vocabulary arrays into ten sequential chunks with `chunkArray(...)`, then assigns each chunk to a unit definition. The generator does not appear to match individual vocabulary/grammar IDs to a unit’s named theme or test whether examples fit the intended Can-Do outcome.

A concrete example is N4 Unit 1:

- Unit title: “Niat, Rencana & Rekomendasi” (“Intention & Advice”).
- Its first ten grammar patterns include `〜に (frekuensi)`, `〜ずつ`, `〜でも`, `〜とか〜とか`, `〜ごとに`, `〜について`, `〜によって`, `〜に対して`, `〜として`, and `〜ばかり`.
- The first twenty mapped vocabulary IDs include `動く`, `動かす`, `運動`, `運ぶ`, `運転`, `走る`, `走り回る`, `起こす`, `起こる`, `洗濯`, `着く`, `到着`, `忘れる`, `笑う`, `泣く`, and `怒る`.

Some items may be useful in other contexts, but this group does not form a coherent intention/advice unit. N3 Unit 1 is titled “Perbandingan, Rasio & Standar” (“Comparison & Proportion”) yet begins with temporal expressions such as `〜うちに`, `〜たびに`, and `〜とたん（に）`, also showing the ordering problem.

### Root cause
The content compiler builds sequential slices and the vocabulary merge script concatenates categories in a fixed order (verbs, adjectives, adverbs, nouns, expressions). Cutting the resulting list into equal chunks creates the appearance of a themed syllabus without the semantic selection step required for a syllabus.

### Recommended fix
Create a curated manifest for each unit with explicit grammar IDs, vocabulary IDs, prerequisites, and Can-Do outcomes. If automated generation is retained, use domain, function, grammar prerequisites, frequency, semantic similarity, and example suitability to propose assignments; require validation to accept them. Never infer thematic fit from array order.

Evidence:
- https://github.com/nuggetenak/nugget-nihongo/blob/main/scripts/build-curriculum-all.js
- https://github.com/nuggetenak/nugget-nihongo/blob/main/scripts/merge-vocab.js
- https://github.com/nuggetenak/nugget-nihongo/blob/main/public/data/curriculum/curriculum-n4.json
- https://github.com/nuggetenak/nugget-nihongo/blob/main/public/data/curriculum/curriculum-n3.json

---

## 4. C-03 — Generic fallback lesson generator can produce invalid exercises

**Severity: High · Verified in source**

`src/lib/curriculum/lessonContentAdapter.ts` has a small curated set of three lesson overrides. Most lessons use a generic fallback that synthesizes a framework, dialogue, explanation, and two drills from the first mapped grammar/vocabulary entries.

A problematic drill is constructed like this:

```ts
sentencePrompt: `${primaryV1.reading || primaryV1.word} _____`,
options: [primaryG?.pattern || 'です', 'じゃない', 'でした', 'から'],
correctAnswer: primaryG?.pattern || 'です',
```

The output uses the *label of the grammar pattern* as the intended answer rather than the correct surface form in an example sentence. For an N4 lesson where the first vocabulary entry is `動く` and the first grammar pattern is `〜に (frekuensi)`, this can yield a prompt equivalent to `うごく _____` with the answer `〜に (frekuensi)`, which is not a valid cloze exercise.

The second generated drill marks `${vocab} です。` as the correct sentence and labels alternatives as unnatural. That is not generally valid for verbs: `動くです` is not standard Japanese for “moves.” It is also not a meaningful test of the lesson grammar if the primary grammar is an unrelated particle or expression.

The generated “dialogue” uses examples from two grammar entries as alternating turns. Those examples may be valid standalone sentences, but they are not necessarily a coherent exchange. The generated research-rationale and edge-case sections are also generic templates, not actual per-pattern analysis.

### Why tests miss this
`tests/test-curriculum-adapter.js` checks that the fallback has a framework, at least two dialogue lines, and at least two drills. These are shape checks, not content validation.

### Recommended fix
- Disable or label these generated drills as prototypes until they are validated.
- Generate questions from typed templates per exercise type and POS/grammar form.
- Require an explicit answer derivation and verify it programmatically against the full prompt.
- Require at least one fluent reviewer or trusted native-quality test process for naturalness claims.
- Test every generated drill family on nouns, verbs, i-adjectives, na-adjectives, particles, and sentence-final forms.
- Keep the Can-Do prompt, dialogue, example sentences and grammar target linked to the same target outcome.
- Replace generic “research” boilerplate with real, specific citations or omit research claims.

Evidence:
- https://github.com/nuggetenak/nugget-nihongo/blob/main/src/lib/curriculum/lessonContentAdapter.ts
- https://github.com/nuggetenak/nugget-nihongo/blob/main/tests/test-curriculum-adapter.js

---

## 5. C-04 — Static vocabulary fallback questions point at the wrong vocabulary records

**Severity: High · Verified**

`public/data/fallback/vocab-drills.json` contains 20 static drills. Direct comparison of each question’s Japanese prompt against its `source_id` record found **19 out of 20 source mappings do not match**.

Representative examples:

| Drill | Prompt asks | `source_id` currently points to |
|---|---|---|
| `fd-v-002` | 食べる (“eat”) | `vg-n5-00010` → 来る (“come”) |
| `fd-v-003` | 飲む (“drink”) | `vg-n5-00020` → する (“do”) |
| `fd-v-004` | 見る (“see/watch”) | `vg-n5-00030` → 働く (“work”) |
| `fd-v-005` | 聞く (“hear/ask”) | `vg-n5-00040` → 借りる (“borrow”) |
| `fd-v-011` | 集める (“collect”) | `vg-n4-00001` → 動く (“move”) |
| `fd-v-020` | 必要 (“necessary”) | `vg-n4-00090` → 窓 (“window”) |

The individual prompt-answer pair may still be correct on its own; the problem is that the `source_id` associates the question to the wrong card. If it is used for progress, review history, explanation links, or “study this item,” the learner may be shown a different word than the question is about.

### Recommended fix
Regenerate fallback questions by joining the canonical record by stable ID instead of hardcoding independent prompt and source fields. Add an automated test that asserts the prompt target, canonical Japanese form, expected answer and `source_id` all refer to the same vocabulary entry.

Evidence:
- https://github.com/nuggetenak/nugget-nihongo/blob/main/public/data/fallback/vocab-drills.json
- https://github.com/nuggetenak/nugget-nihongo/tree/main/public/data/vocab

---

## 6. C-05 — Static grammar fallback drills are misattributed

**Severity: High · Verified**

`public/data/fallback/grammar-drills.json` also contains 20 drills. **19 out of 20 source references do not match the pattern tested by the prompt.**

Examples:
- A prompt testing the conditional `〜ば` points to `gn4-00001`, which is `〜に (frekuensi)`.
- A “might come” question points to `gn4-00010`, which is `〜ばかり`.
- A “very difficult” sentence with answer `とても` points to `gn4-00015`, which is `Vたところ`.
- A past-experience sentence ending with `ことがあります` points to `gn4-00045`, which is `Vにくい`.
- A “Japanese language is possible” question using `ができます` points to an embedded-question pattern rather than the relevant ability construction.

Some N5 items are also mismatched:
- The question `ねこ___います` expects `が`, but its `source_id` is tagged as `は (topik)`.
- The sentence `にほんご___べんきょうします` expects `を`, but points to `に (arah/tujuan)`.
- The location-of-activity prompt about reading in a library expects `で`, but points to `に (waktu)`.
- The school destination prompt expects `に`, but points to `で (cara/alat)`.

### Impact
Wrong attribution makes spaced repetition, weak-area analytics, explanations, and review sequencing unreliable even where a learner can answer the standalone question correctly.

### Recommended fix
Store the target grammatical construction as an explicit stable ID and validate it against a structured prompt spec. Do not assign IDs by sequence number. Run a check that parses each fallback item’s expected construction, answer and source ID, then require human approval for the initial corrected bank.

Evidence:
- https://github.com/nuggetenak/nugget-nihongo/blob/main/public/data/fallback/grammar-drills.json
- https://github.com/nuggetenak/nugget-nihongo/tree/main/public/data/grammar

---

## 7. C-06 — N5 claims 990+ vocabulary while curriculum lessons map only 124 unique words

**Severity: High · Verified**

The N5 curriculum’s metadata/description claims the route develops mastery of 94 grammar patterns and “990+ kosakata JLPT N5.” Its 27 lessons contain 136 vocabulary references but only **124 unique vocabulary IDs**; the units themselves have no unit-level `vocab_ids` array.

That is not evidence that the other words are absent from the wider vocabulary browser. It is evidence that the N5 *curriculum route* does not explicitly assign the full advertised vocabulary set to lessons.

### Recommended fix
Either:
1. map the full N5 vocabulary into a purposeful, staged syllabus with review cycles, or
2. revise the claim so it accurately describes the 124 explicitly mapped core items and show how the rest of the corpus is learned elsewhere.

Track both “words in database,” “words introduced by the curriculum,” “words practised,” and “words reviewed/mastered.” These are separate metrics and should not be represented as a single coverage number.

Evidence:
- https://github.com/nuggetenak/nugget-nihongo/blob/main/public/data/curriculum/curriculum-n5.json
- https://github.com/nuggetenak/nugget-nihongo/blob/main/public/data/vocab/vocab-n5.js

---

## 8. C-07 — Grammar category taxonomy is wrong for many foundational items

**Severity: Medium–High · Verified**

The current N5 grammar dataset contains 19 entries whose `cat` field is `te-form-use` even though the actual pattern is a particle, range expression, or sentence-final expression. Examples include:

- `は (topik)`, `が (subjek)`, `を (objek)`;
- `に (arah/tujuan)`, `に (keberadaan)`, `に (waktu)`;
- `で (lokasi tindakan)`, `で (cara/alat)`, `へ (arah)`;
- `と`, `も`, `の`, `か`, `ね / よ / よね`, `から / まで`, `より`, `だけ`, `しか〜ない`.

The N4 dataset has 11 similar `te-form-use` misclassifications, including `〜に (frekuensi)`, `〜ずつ`, `〜でも`, `〜ごとに`, `〜について`, `〜によって`, `〜に対して`, `〜として`, `〜ばかり`, and `他動詞 / 自動詞`.

The category/source split compounds the issue:
- `public/data/grammar/n5/n5-tense-aspect.js` starts with particle `は` and `が`.
- `public/data/grammar/n4/n4-tense-aspect.js` starts with `〜に (frekuensi)` and `〜ずつ`.
- `public/data/grammar/n5/n5-particles.js` contains only one grammar record (`から`).

### Impact
Search, filtering, category browsing, recommended study paths, and category-based quizzes can show unrelated content. These are not cosmetic labels: the application indexes by category.

### Recommended fix
Define a canonical taxonomy with tests that validate `pattern`/`cat` compatibility. Reclassify existing records, repair the source module placement, and test search/filter results for representative particles, conjugations, modality, sentence grammar, and te-form expressions.

Evidence:
- https://github.com/nuggetenak/nugget-nihongo/blob/main/public/data/grammar/grammar-n5.js
- https://github.com/nuggetenak/nugget-nihongo/blob/main/public/data/grammar/grammar-n4.js
- https://github.com/nuggetenak/nugget-nihongo/blob/main/public/data/grammar/n5/n5-tense-aspect.js
- https://github.com/nuggetenak/nugget-nihongo/blob/main/public/data/grammar/n5/n5-particles.js

---

## 9. C-08 — Exact grammar-pattern duplicates need canonicalization

**Severity: Medium–High · Verified; not every duplicate is necessarily an error**

Parsing the five current grammar datasets found 859 records but only 673 unique exact pattern strings. **136 pattern strings are repeated**, affecting 322 records. Some repeats are legitimate across levels because a common construction may require deeper nuance at advanced levels. Others are repeated several times within the same level and look like accidental duplication.

Examples:
- `〜に応じて`: four N2 records (`gn2-00104`, `gn2-00026`, `gn2-00195`, `gn2-00276`).
- `〜に対して`: N4, N3 and two N2 records.
- `〜ものだ`: one N3 and three N2 records with overlapping meanings.
- `〜に先立って`: two N2 records.
- `〜を通じて / 〜を通して`: three N2 records.
- `〜に際して`, `〜をきっかけに`, `〜ざるを得ない`, and other constructions occur at multiple levels.

### Impact
The same pattern can be shown repeatedly as if it were multiple independent concepts. This can inflate coverage counts and cause repeated or inconsistent quiz targeting. Conversely, if level differences carry valuable nuance, blind deduplication would discard useful distinctions.

### Recommended fix
Introduce a canonical `grammar_concept_id` separate from the immutable item/card ID. Treat level-specific explanations as records attached to that concept. Audit exact duplicates within each level first, compare formation rules/examples/nuances, and classify each pair as:
- same content: merge/deprecate duplicate;
- distinct use or meaning: keep separate but document that distinction;
- same form with level-appropriate depth: link to the same canonical concept and progression.

Do not merge entries based on pattern string alone.

Evidence:
- https://github.com/nuggetenak/nugget-nihongo/tree/main/public/data/grammar

---

## 10. C-09 — Textbook chapter mappings include repeated vocabulary IDs

**Severity: Medium · Verified**

The five inspected files—Minna no Nihongo I and II, Irodori A1, A2-1 and A2-2—contain **19 vocabulary-reference arrays with duplicate IDs**. Examples include `vg-n5-00108` appearing twice in a Minna chapter, `vg-n5-00019` appearing three times in one array, and `vg-n5-00098` appearing twice in Minna II / an Irodori mapping.

Repeated references may be intentional pedagogical exposure, but a list of item IDs is a poor way to represent multiple occurrences. If not handled explicitly, they can inflate chapter item counts, duplicate flashcards, or distort completion calculations.

No duplicate grammar IDs were found within the inspected arrays’ `grammar_ids` fields in this scan.

### Recommended fix
Validate uniqueness in each chapter reference list. If a word intentionally appears more than once, represent example sentences/occurrences separately and keep the set of canonical learning IDs unique. Add tests that check every book reference resolves to an actual record and no accidental duplicates remain.

Evidence:
- https://github.com/nuggetenak/nugget-nihongo/tree/main/public/data/books

---

## 11. C-10 — あなた lesson note is too absolute

**Severity: Medium · Verified wording; usage nuance cross-checked externally**

A curated N5 lesson labels `あなたは、エンジニアですか。` as “terdengar kasar & menuduh di Jepang,” and says Japanese speakers do not use `あなた` in this way. The practical advice to prefer a name + さん, title, or omitted subject is often useful, especially with new acquaintances. The categorical wording is the problem: `あなた` is context-sensitive and is not universally rude or accusatory.

Japanese-learning reference discussions describe its use as depending on relationship, setting, speaker style, and medium; it may feel distant, overly direct, affectionate, or natural in certain contexts. The stronger lesson is: **avoid treating あなた as a neutral all-purpose equivalent of English/Indonesian “you”; prefer name/title/omission in ordinary interpersonal conversation, while learning the contexts where あなた does occur.**

Recommended replacement:
> “Dalam percakapan sehari-hari, orang Jepang sering menghilangkan subjek atau menyebut nama/jabatan + さん. あなた dapat terdengar berjarak atau terlalu langsung dalam konteks tertentu, tetapi tidak selalu kasar. Untuk kenalan baru, lebih aman memakai nama/jabatan atau menghilangkan subjek jika sudah jelas.”

References:
- https://www.tkgje.jp/articles/referring-to-people.html
- https://www.tofugu.com/japanese/anata/

---

## 12. C-11 — The です rule is overgeneralized

**Severity: Medium · Verified**

The curated N5 material says `です` “SELALU diletakkan di akhir kalimat.” For a basic declarative sentence, placing the polite predicate at the end is a good starting model. But “always” is too strong: sentence-final particles can follow it, as in `ですか`, and spoken interaction can include particles/continuations depending on the structure being explained.

### Recommended fix
Teach a scoped rule such as:
> “Dalam kalimat pernyataan dasar, です berada di akhir predikat. Dalam pertanyaan, か dapat mengikutinya (`ですか`); partikel akhir lain juga dapat muncul sesuai fungsi dan ragam.”

Keep beginner simplification, but label it as a beginner pattern, not an absolute rule for all Japanese sentences.

Evidence:
- https://github.com/nuggetenak/nugget-nihongo/blob/main/src/lib/curriculum/lessonContentAdapter.ts

---

## 13. C-12 — Persisted AI-promoted quiz banks are empty

**Severity: Medium · Verified**

The current `public/data/quiz-bank/n5.js`, `n4.js`, and `n3.js` files each contain `[]` with a comment saying they are empty until the first promotion. The repository tree contains no `n2.js` or `n1.js` quiz-bank file.

This does not mean the application has no quiz feature; it has dynamic quiz generation and fallback drills. The concern is that the intended permanent, reviewed/promoted question bank is not populated in the checked-in production data. Dynamic generation and small fallback files are not a substitute for a substantial set of validated, repeatable items.

### Recommended fix
Create minimum per-level bank targets, store validation/provenance and deprecation fields, and show a content QA dashboard. Do not count AI-generated drafts or one-off runtime quizzes as reviewed permanent question coverage.

Evidence:
- https://github.com/nuggetenak/nugget-nihongo/tree/main/public/data/quiz-bank
- https://github.com/nuggetenak/nugget-nihongo/blob/main/public/data/quiz-bank/README.md

---

## 14. C-13 — Content counts and “coverage” claims need formal definitions

**Severity: Medium · Verified**

Counts are hand-maintained in multiple places and disagree with current records. More importantly, one number cannot accurately describe all of the following:
- records in the global database;
- unique headwords/meanings;
- level-tagged entries;
- items explicitly assigned to a curriculum lesson;
- items presented in at least one example;
- items included in a validated quiz;
- items reviewed by a learner;
- items mastered according to spaced repetition.

The JLPT itself does not currently publish a fixed comprehensive vocabulary/kanji/grammar item list. It publishes competency summaries and question-type guidance instead.

### Recommended fix
Publish separate metrics for database size, lesson coverage, exercise coverage, and learner review coverage. Have CI generate counts automatically from the canonical data files. Use the official JLPT competency descriptions and sample questions to build a transparent level-by-level coverage matrix; avoid “100% official list coverage” claims.

References:
- https://www.jlpt.jp/e/faq/index.html
- https://www.jlpt.jp/e/guideline/testsections.html

---

## 15. C-14 — Existing tests do not protect pedagogical correctness

**Severity: Medium · Verified**

`tests/test-curriculum.js` checks that the N5 curriculum has ten units and that the grammar references resolve uniquely. `tests/test-curriculum-adapter.js` checks that a lesson has a pedagogical framework, dialogue lines, and drills. Those checks are useful, but they do not test:
- semantic match between unit title and assigned grammar/vocabulary;
- whether each question tests its stated grammar target;
- whether the answer is actually correct for the exact prompt;
- whether distractors are plausible but unambiguously wrong;
- whether Japanese sentences are natural in the stated context;
- whether Indonesian glosses faithfully convey the intended nuance;
- whether examples stay within the target level;
- whether a lesson dialogue makes sense as a conversation;
- whether textbook references are unique and resolve correctly.

### Recommended fix
Add multiple test layers:
1. **Machine checks:** schema, unique IDs, valid links, source-target consistency, expected answer in choices, category compatibility, level-tag consistency, no accidental duplicate chapter IDs.
2. **Pedagogical checks:** target pattern matches the prompt and answer; examples use the target form; distractors test known confusion pairs; lesson targets match Can-Do outcomes.
3. **Language review:** native or expert review of Japanese grammar, naturalness, politeness/register and Indonesian translation.
4. **Regression sets:** retain all corrected cases as tests so regenerated curriculum/content cannot reintroduce them.

Evidence:
- https://github.com/nuggetenak/nugget-nihongo/blob/main/tests/test-curriculum.js
- https://github.com/nuggetenak/nugget-nihongo/blob/main/tests/test-curriculum-adapter.js
- https://github.com/nuggetenak/nugget-nihongo/blob/main/tests/run.js

---

## 16. Positive findings

Not everything is structurally broken:
- The five grammar files contain 859 records, and all parsed records had a `meaning` field and at least one Japanese example.
- The grammar records’ `see_also_grammar` and `confusion_pairs` references resolved in the scan; no broken grammar IDs were found in those specific reference fields.
- N4/N3/N2/N1 level curricula explicitly map their full current vocabulary inventories by ID, although semantic fit of each unit’s chunk still needs remediation.
- The source tree has schema documentation, category-level source modules, generated corpus files, a curriculum generator, and data tests. Those are useful foundations for a proper content QA pipeline.
- The confusion-pair dataset includes Indonesian-to-Japanese contrastive examples, such as に vs で. It could become a differentiator if the claims and examples are calibrated and reviewed instead of overgeneralized.

---

## 17. Recommended remediation plan

### P0 — Stop misleading content now
1. Replace the static fallback-vocabulary and fallback-grammar source IDs with the correct canonical IDs.
2. Disable the generic malformed fallback cloze/trap-detect exercises until generated prompts/answers are content-valid.
3. Fix SSW sector curriculum mappings; do not present two generic words and three repeated N4 grammar IDs as sector-specific coverage.
4. Fix N5/N4 grammar category taxonomy and validate module/category consistency.

### P1 — Make the curriculum trustworthy
5. Replace array-chunk curriculum assignment with explicit, curated unit manifests or a semantic matching pipeline with human approval.
6. Repair N5’s explicitly mapped vocabulary scope or revise the “990+ vocabulary mastered” claim.
7. Deduplicate textbook chapter references and validate all mappings.
8. Review repeated grammar concepts, especially duplicates within a single level.
9. Qualify overbroad instructional statements (including あなた and the です rule).

### P2 — Improve scale and sustainability
10. Populate permanent validated quiz banks across levels, starting with N5/N4.
11. Generate content statistics automatically and expose separate corpus/curriculum/exercise/mastery metrics.
12. Add semantic validation tests and a human review workflow.
13. Use a content schema with `concept_id`, stable item ID, level rationale, source/provenance, usage/register, accepted alternatives, common mistakes, and example review status.
14. Maintain a “known issues / disputed nuance” status so a simplification is not accidentally presented as an absolute universal rule.

---

## 18. Suggested content record standard

Every vocabulary/grammar item should ideally include:

- Stable immutable `id` and canonical concept/meaning ID.
- Japanese headword/pattern, reading, and accurate Indonesian gloss.
- POS/grammar category with validated taxonomy.
- JLPT level tag plus rationale/confidence (internal corpus level assignment, not an official universal list).
- Frequency source and register labels with definitions.
- At least two examples that are natural, grammatically correct, and appropriate to the target level.
- Indonesian translation that preserves meaning, tone, and implied subject.
- Formation/conjugation and exceptions where relevant.
- Contrastive note for Indonesian speakers that identifies when it applies and avoids universal claims.
- `see_also` and confusion-pair IDs that resolve to valid canonical concepts.
- Content provenance, reviewer status, last reviewed date, and deprecation status.
- For exercise items: target concept ID, explicit prompt spec, correct answer, accepted alternatives, distractor rationale, explanation and a validated item-to-source reference.

Treat AI generation as a draft mechanism; the live learner corpus should receive schema, semantic, and language checks before promotion.

## Sources and inspected files

- [Production repository](https://github.com/nuggetenak/nugget-nihongo/tree/main)
- [Vocabulary corpus](https://github.com/nuggetenak/nugget-nihongo/tree/main/public/data/vocab)
- [Grammar corpus](https://github.com/nuggetenak/nugget-nihongo/tree/main/public/data/grammar)
- [Curriculum generator](https://github.com/nuggetenak/nugget-nihongo/blob/main/scripts/build-curriculum-all.js)
- [Vocabulary merge script](https://github.com/nuggetenak/nugget-nihongo/blob/main/scripts/merge-vocab.js)
- [N5 curriculum](https://github.com/nuggetenak/nugget-nihongo/blob/main/public/data/curriculum/curriculum-n5.json)
- [N4 curriculum](https://github.com/nuggetenak/nugget-nihongo/blob/main/public/data/curriculum/curriculum-n4.json)
- [SSW Construction curriculum](https://github.com/nuggetenak/nugget-nihongo/blob/main/public/data/curriculum/curriculum-ssw-construction.json)
- [SSW Food curriculum](https://github.com/nuggetenak/nugget-nihongo/blob/main/public/data/curriculum/curriculum-ssw-food.json)
- [SSW Kaigo curriculum](https://github.com/nuggetenak/nugget-nihongo/blob/main/public/data/curriculum/curriculum-ssw-kaigo.json)
- [Dynamic lesson adapter](https://github.com/nuggetenak/nugget-nihongo/blob/main/src/lib/curriculum/lessonContentAdapter.ts)
- [Fallback vocabulary drills](https://github.com/nuggetenak/nugget-nihongo/blob/main/public/data/fallback/vocab-drills.json)
- [Fallback grammar drills](https://github.com/nuggetenak/nugget-nihongo/blob/main/public/data/fallback/grammar-drills.json)
- [Fallback quiz drills](https://github.com/nuggetenak/nugget-nihongo/blob/main/public/data/fallback/quiz-drills.json)
- [Quiz bank](https://github.com/nuggetenak/nugget-nihongo/tree/main/public/data/quiz-bank)
- [Curriculum tests](https://github.com/nuggetenak/nugget-nihongo/blob/main/tests/test-curriculum.js)
- [Curriculum adapter tests](https://github.com/nuggetenak/nugget-nihongo/blob/main/tests/test-curriculum-adapter.js)
- [Official JLPT FAQ](https://www.jlpt.jp/e/faq/index.html)
- [Official JLPT test sections and item types](https://www.jlpt.jp/e/guideline/testsections.html)
- [Japanese reference on referring to people](https://www.tkgje.jp/articles/referring-to-people.html)

## Final assessment

The corpus has enough structure to become a strong Japanese-learning reference, but a larger number of entries does not automatically mean stronger learning. The current weakest area is the **connection between the record and the lesson that uses it**: source IDs can be wrong, curriculum themes do not reliably fit their assigned data, and fallback exercises can be invalid even while passing structural tests.

The safest improvement sequence is to fix the fallback and SSW mismatches first, rebuild curriculum assignments around explicit learning outcomes, repair taxonomy and duplicates, then expand N2/N1 with a defined coverage matrix. Keep Japanese expert review in the loop for naturalness and register; automated checks can catch broken links and malformed drills, but they cannot certify all linguistic nuance by themselves.
