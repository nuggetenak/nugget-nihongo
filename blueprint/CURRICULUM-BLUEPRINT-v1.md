# NUGGET NIHONGO — CURRICULUM BLUEPRINT v1
**Date:** 4 April 2026
**Author:** A1 Crispy 🥐 (Project Director)
**Status:** AUTHORITATIVE — all development work references this document
**Corpus basis:** ~880 citations across 21 sections (v14), compass artifact (44 citations), Agent 2 Research Director Deliverable (Parts 1–2), Dictionary Architecture Draft v1, Feature Expansion Proposal v1

> *Statistics last updated: Pass 15 (v17-PASS15-FINAL — 6 April 2026). Pass 15 (Agent 2 Sonnet 4.6): 7 DOIs verified, 6 inserted to bibliography (PH-04, PH-05, PH-06, PH-07, PH-41, GI-02); PH-43 title/journal corrected; flags §10-A, §10-C, §10-F resolved; 15 DOIs remain pending (network-required). Some sub-section figures may still reflect earlier snapshots.*

---

# PREAMBLE: WHAT THIS DOCUMENT IS

This is the single source of truth for Nugget Nihongo's curriculum, pedagogy, and product architecture. It synthesizes:

- 21 completed corpus sections (~1.5MB of peer-reviewed evidence)
- 44 foundational citations from the compass artifact
- Agent 2's 12-gap analysis and 10-caveat framework
- The dictionary-first architecture (45 features, 5-layer taxonomy)
- The feature expansion proposal (FSRS, quiz engine, gamification, Supabase)

Every design decision below is traceable to specific corpus citations. Where evidence is thin or contested, the document says so explicitly.

**All other planning documents (Feature Expansion Proposal, Dictionary Architecture Draft, RESUME-v15.3.0) are now SUBORDINATE to this blueprint.** They remain valid for implementation detail but this document governs scope, sequence, and priorities.

---

# PART 1 — THE PEDAGOGICAL MODEL

## 1.1 — Identity Statement

Nugget Nihongo is a **dictionary-first, vocabulary-anchored Japanese learning platform** for Indonesian speakers, built on established cognitive science and second language acquisition research.

It is NOT a course app that happens to have a dictionary. It IS a dictionary — the most comprehensive open-source Japanese reference available in Bahasa Indonesia — with structured learning paths, spaced repetition, and adaptive quizzing layered on top.

**Theoretical positioning** (using Nunan's 1988 taxonomy): A hybrid structural-content-notional syllabus. Structural (JLPT frequency levels provide the backbone), content (cultural and textbook themes organize domains), notional (speech act vocabulary follows Wilkins's 1976 functional principles). This is the same family as Bunpro's approach but with two differentiators: (1) Indonesian L1 contrastive analysis and (2) dictionary-depth reference data.

## 1.2 — The Five Pillars

Every feature in Nugget Nihongo maps to one of five research-backed pillars:

### Pillar 1: Spaced Repetition & Retrieval Practice
**What:** FSRS algorithm scheduling all review; active recall in every quiz mode.
**Evidence:** Kim & Webb (2022) meta-analysis of 48 L2 experiments (N=3,411) — spaced practice produces significantly better retention. Adesope et al. (2017) meta-analysis of 217 studies — retrieval practice outperforms restudying (g=0.61). Rowland (2014) — medium-to-large testing effect (g=0.50), grows with retention interval.
**Boundary:** SRS is most efficient for the first 2,000–3,000 high-frequency words. Beyond that, extensive reading becomes the primary acquisition route (Laufer 2003; Webb & Nation 2017). The platform acknowledges this ceiling and recommends supplementary reading at N2+.
**Caveat (Agent 2 C1):** FSRS is based on a memory model validated in KDD/IEEE TKDE proceedings (Ye et al. 2022; Su et al. 2023). No independent RCT has validated FSRS 4.0 specifically against SM-2. We cite it as "theoretically grounded with strong community benchmark performance."

### Pillar 2: Contrastive Analysis for Indonesian Speakers
**What:** Every grammar point and high-frequency vocabulary item tagged with Indonesian-Japanese interference notes where applicable.
**Evidence:** 59 citations in §5 (CP + EA clusters). Seven systematic interference points documented: word order (SVO→SOV), particle system, verb conjugation, mora timing, pitch accent, writing system, keigo. Sutedi (2016) — 21 Japanese passive types vs. 22 Indonesian types. Lianna & Sutedi (2020) — inversion patterns. I-JAS corpus data confirming に/で confusion.
**Differentiator:** No other Japanese learning platform has systematic Indonesian L1 contrastive notes. This is our primary pedagogical moat.
**Caveat (Agent 2 C10):** Malu intensity varies by regional Indonesian culture. Javanese learners experience it differently from Batak learners. We hedge: "well-documented in Indonesian cultural contexts" without claiming universality.
**Gap (Agent 2 Gap 5):** The corpus treats learners as L1=Indonesian, L2=Japanese. Most learners are actually L1=regional language, L2=Indonesian, L3=English, L4=Japanese. L3 acquisition dynamics (Cenoz et al. 2001; Hammarberg 2001) are not yet in the corpus. Acknowledged as a limitation.

### Pillar 3: Comprehensible Input & Nation's Four Strands
**What:** Content organized by proficiency level; learning activities balanced across four strands.
**Evidence:** Nation (2007) — an effective course balances: meaning-focused input, meaning-focused output, language-focused learning, and fluency development. Krashen (1982/1985) — comprehensible input (i+1). Long (1996) — Interaction Hypothesis.

**Four Strands mapping to platform features:**

| Strand | Definition | Platform Feature |
|---|---|---|
| Meaning-focused input | Reading/listening for meaning | Example sentences, book lens content, future: NHK Easy integration |
| Meaning-focused output | Speaking/writing for communication | Production-format quiz cards (ID→JP), type-translation quiz, future: writing practice |
| Language-focused learning | Deliberate study of language features | Grammar study cards, SRS review, conjugation drills, confusion pair comparators |
| Fluency development | Using known language at speed | Speed review mode, timed quizzes, daily quick sessions |

**Balance target:** Roughly equal time across strands, per Nation's recommendation. At N5, the balance tilts toward language-focused learning (building foundational inventory). At N2–N1, it tilts toward meaning-focused input (extensive reading becomes primary).

### Pillar 4: Processability Theory Grammar Sequencing
**What:** Grammar card introduction follows the empirically documented acquisition order, not textbook order.
**Evidence:** Pienemann (1998) — the Teachability Hypothesis: only structures within the learner's current processing capacity can be acquired through instruction. Di Biase & Kawaguchi (2002) — mapped Japanese morphosyntax onto PT stages. Kawaguchi (2005) — validated in cross-linguistic study.

**PT Stage Model for Japanese (simplified for curriculum use):**

| Stage | Processing Level | Japanese Features | JLPT Mapping |
|---|---|---|---|
| 1 | Lemma access | Single words, formulaic chunks (すみません, いただきます) | Pre-N5 |
| 2 | Category procedure | Noun classifiers/counters, の-genitive, copula だ/です | N5 early |
| 3 | Phrasal procedure | Core particles (は/が/を/に), SOV order, nonpast/past tense | N5 |
| 4 | Sentence assembly | Topic-comment は/が distinction, て-form chaining, に/で discrimination, ている aspect | N4 |
| 5 | Subordinate clause | Relative clauses, conditionals (たら/ば/と/なら), causative, passive | N3 |
| 6 | Discourse/register | Productive keigo, indirect passive, complex embedding | N2–N1 |

**Design rule:** Grammar cards at Stage N+1 are not introduced until the learner has demonstrated mastery of Stage N structures. て-form is the critical pivot between Stage 3 and 4 — it gates all subsequent verbal morphology.

### Pillar 5: Dictionary-First Architecture
**What:** One exhaustive canonical dictionary as source of truth; all learning features are views into that dictionary.
**Evidence:** This is an architectural decision, not a research finding. However, the approach is validated by the industry: Jisho.org, Takoboto, Akebi all use JMdict as their canonical source. Bunpro uses a curated grammar database as its source of truth. We unify both into a single platform.
**Data sources:** JMdict (~200K entries, CC-BY-SA 4.0), KANJIDIC2 (13,108 kanji, CC-BY-SA 4.0), KanjiVG (6,500+ stroke order SVGs, CC-BY-SA 3.0), Tatoeba (~200K JP sentences, CC-BY 2.0 FR). All commercially usable with attribution.
**Our value-add:** Indonesian translations, contrastive notes, confusion pairs, grammar-vocabulary cross-references, book lens connections.

## 1.3 — What We Claim and What We Don't

**We claim:**
- Our vocabulary and grammar coverage aligns with community-consensus JLPT requirements (verifiable)
- Our SRS system uses the most advanced open-source scheduling algorithm available (FSRS)
- Our contrastive notes address Indonesian-Japanese interference points that no other platform covers
- Our content sources from established open-source dictionaries with 20+ years of community validation
- Our pedagogical approach follows established, evidence-based techniques with quantified effect sizes

**We do NOT claim:**
- That our app alone is sufficient to pass JLPT (it isn't — you need reading practice, listening exposure, and conversation)
- That our method is revolutionary or unique (we apply established techniques well)
- That JLPT success guarantees conversational fluency (different skills)
- That FSRS is "scientifically proven superior to SM-2" (no RCT exists)
- That CEFR-J alignment with JLPT is exact (it's approximate, per Alderson 2007)

---

# PART 2 — THE LEVEL LADDER

## 2.1 — Framework

Each JLPT level defines concrete exit criteria across four dimensions:
1. **Vocabulary load** — counting by JLPT dictionary lemmas (not word families)
2. **Grammar structures** — mapped to PT developmental stages
3. **Card type distribution** — recognition vs. production format
4. **Can-do exit criteria** — expressed in CEFR-J terms

**Counting convention (Agent 2 C8):** All vocabulary counts below use JLPT-style dictionary lemmas, not Nation's word families. Japanese derivational morphology creates fewer forms per entry than English, so 3,000 Japanese lemmas ≈ broader coverage than 3,000 English word families. This is noted once here and applies throughout.

**Vocabulary targets derive from:** Nation (2006) coverage thresholds, Schmitt & Schmitt (2014) revised estimates, JLPT community consensus lists, and the Laufer (1998) productive/receptive distinction.

## 2.2 — Pre-N5: Script Foundation (CEFR-J Pre-A1)

**Duration:** 2–4 weeks
**Purpose:** Build the orthographic foundation that all JLPT study presupposes. CEFR-J Pre-A1 captures this phase (Negishi et al. 2013).

| Dimension | Target |
|---|---|
| Hiragana | 46 characters: recognition + production (handwriting or typing) |
| Katakana | 46 characters: recognition + production |
| Vocabulary | ~50 survival words (greetings, numbers 1–10, classroom words) |
| Grammar | Zero explicit grammar; formulaic chunks only (PT Stage 1) |
| Card format | 100% recognition (character → reading, character → meaning) |

**Exit trigger:** 90%+ accuracy on hiragana/katakana recognition over 3 consecutive days.

**Design note:** This phase uses a dedicated "Script Mastery" track, separate from the JLPT tracks. Indonesian learners start from zero script knowledge — this is the single biggest difference from kanji-background learners (Chinese, Korean).

## 2.3 — N5 (CEFR-J A1.1–A1.2)

**Can-do:** Can understand and use familiar everyday expressions. Can introduce self and ask/answer simple personal questions. Can interact in a simple way if the other person speaks slowly.

| Dimension | Target |
|---|---|
| Vocabulary | ~800 lemmas (cumulative) |
| Grammar | ~80 patterns (PT Stages 2–3: copula, core particles は/が/を/に, nonpast/past, て-form introduction, basic い/な adjectives, existence verbs ある/いる) |
| Kanji | ~100 (recognition; Joyo Grade 1–2 overlap) |
| Card format | 85% recognition / 15% production |
| SRS milestone | FSRS stability ≥ 21 days on 80% of N5 cards |

**PT alignment:** Stages 1–3. By N5 exit, learners can produce basic SOV sentences with correct particle marking for core arguments. て-form is introduced but not required for mastery.

**Key interference points (§5.5):** SVO→SOV word order errors; particle omission (Indonesian has no particles); copula overuse (Indonesian "adalah" patterns).

**Semantic set rule (Tinkham 1997; Waring 1997):** At N5, limit same-session introduction to ≤3 words from the same semantic field. Beginners are most vulnerable to semantic set interference.

## 2.4 — N4 (CEFR-J A2)

**Can-do:** Can understand sentences and frequently used expressions related to areas of most immediate relevance. Can communicate in simple routine tasks. Can describe in simple terms aspects of background and immediate environment.

| Dimension | Target |
|---|---|
| Vocabulary | ~1,500 lemmas (cumulative; ~700 new) |
| Grammar | ~170 patterns cumulative (~90 new; PT Stage 3–4: て-form mastery, ている progressive, に/で discrimination, は/が discourse distinction, potential form, volitional, たい-form) |
| Kanji | ~300 (cumulative; recognition primary, production for top 100) |
| Card format | 75% recognition / 25% production |
| SRS milestone | FSRS stability ≥ 21 days on 80% of N4 cards |

**PT alignment:** Stage 4 entry. て-form is the acquisition pivot — it must be mastered before N4 grammar cards involving clause chaining are introduced. The に/で distinction (persistent Indonesian learner error per I-JAS data) gets dedicated confusion pair treatment.

**Production shift:** N4 introduces production-format cards (Indonesian→Japanese) for the most frequent 200 vocabulary items. Laufer (1998): productive vocabulary requires 5–8× more exposures than receptive.

## 2.5 — N3 (CEFR-J A2.2–B1)

**Can-do:** Can understand the main points of clear standard input on familiar matters. Can deal with most situations likely to arise while traveling. Can produce simple connected text on familiar topics.

| Dimension | Target |
|---|---|
| Vocabulary | ~3,750 lemmas (cumulative; ~2,250 new) |
| Grammar | ~280 patterns cumulative (~110 new; PT Stage 4–5: relative clauses, conditionals たら/ば/と/なら, causative させる, direct passive られる, nominalizers こと/の, hearsay そうだ/ようだ/らしい) |
| Kanji | ~650 (cumulative) |
| Card format | 60% recognition / 40% production |
| SRS milestone | FSRS stability ≥ 30 days on 75% of N3 cards |

**PT alignment:** Stage 5 entry. Subordinate clause procedure becomes active. Multiple conditional forms compete for the same functional slot — confusion pair drills (たら vs. ば vs. と vs. なら) are essential.

**The SRS efficiency ceiling begins here.** Laufer (2003) and Webb & Nation (2017) find diminishing SRS returns above ~3,000 word families. At N3, the platform begins actively recommending extensive reading alongside SRS review. The methodology page states: "N3 is where SRS study and reading practice become equal partners."

**SSW relevance:** JLPT N4 is the regulatory minimum for SSW visa eligibility, but Noyama (2012) documents that N3 passers still report communication difficulties in authentic care work (§15, VS-08). We recommend N3 as the functional target for SSW aspirants in care sectors.

## 2.6 — N2 (CEFR-J B2)

**Can-do:** Can understand the main ideas of complex text on both concrete and abstract topics. Can interact with a degree of fluency that makes regular interaction with native speakers possible without strain.

| Dimension | Target |
|---|---|
| Vocabulary | ~6,000 lemmas (cumulative; ~2,250 new) |
| Grammar | ~380 patterns cumulative (~100 new; PT Stage 5–6: indirect passive, complex conditionals, formal written expressions, ものだ/わけだ/ことになる discourse patterns) |
| Kanji | ~1,000 (cumulative; Joyo list ~60%) |
| Card format | 50% recognition / 50% production |
| SRS milestone | FSRS stability ≥ 30 days on 70% of N2 cards |

**Production parity:** At N2, recognition and production cards are balanced. This reflects the JLPT N2 requirement shift — N2 reading comprehension requires productive vocabulary knowledge to parse complex sentences.

**Register awareness:** PT Stage 6 structures (keigo verb substitution) begin appearing. The §14 sociolinguistics research (SC cluster, 25 citations) grounds the keigo teaching approach: three-level keigo (丁寧語/尊敬語/謙譲語) is introduced systematically with register-context cards.

**Extensive reading becomes primary.** Nation (2006): comfortable reading requires ~8,000–9,000 word families. At 6,000 lemmas, learners are in the zone where reading provides the most efficient marginal vocabulary gain.

## 2.7 — N1 (CEFR-J C1)

**Can-do:** Can understand a wide range of demanding, longer texts and recognize implicit meaning. Can use language flexibly and effectively for social, academic, and professional purposes.

| Dimension | Target |
|---|---|
| Vocabulary | ~10,000+ lemmas (cumulative; ~4,000+ new) |
| Grammar | ~480+ patterns cumulative (~100+ new; PT Stage 6: productive keigo, literary forms, classical Japanese remnants, formal written patterns) |
| Kanji | ~2,000+ (cumulative; full Joyo list) |
| Card format | 40% recognition / 60% production |
| SRS milestone | FSRS stability ≥ 30 days on 65% of N1 cards |

**Production dominance:** N1 cards favor production format. At this level, the learner needs to produce, not just recognize. The platform's role shifts from primary teacher to reference tool and review engine.

**Beyond-JLPT layer:** The architecture supports a "beyond" level for specialized vocabulary (business Japanese, academic Japanese, anime/manga registers) that exceeds JLPT scope. This is where the dictionary-first architecture pays off — the JMdict backbone contains ~200K entries, most of which exceed N1.

## 2.8 — Level Promotion Logic

A learner advances from Level N to Level N+1 when:

1. **Vocabulary gate:** ≥80% of Level N vocabulary cards have FSRS stability ≥ 21 days
2. **Grammar gate:** ≥75% of Level N grammar cards have FSRS stability ≥ 21 days
3. **PT gate:** The learner has demonstrated accuracy on at least 3 structures from the target PT stage (measured via quiz performance, not just card review)
4. **Time gate:** Minimum 2 weeks at each level (prevents speed-running without consolidation)

Promotion is a suggestion, not a lock. The learner can always access content from any level via the Library. But the Study tab's "recommended next" content follows this logic.

---

# PART 3 — CORPUS AUDIT & HYGIENE

## 3.1 — Citation Integrity Summary

| Metric | Value | Assessment |
|---|---|---|
| Total unique citations | 754 (v17-PASS10-FINAL) | Strong |
| Sections complete | 21 of 21 | Complete |
| RED flags (blocking) | 6 | Must resolve before methodology page |
| YELLOW flags (cite with caution) | 10 | Verify before publication |
| DOI unverified rate | ~5.6% (~42 of ~754) | Within tolerance (<10%) |
| False citation risk | 1 (VD-17 Cai 2015) | Likely delete |
| Cross-section duplicates confirmed | 3 (SC-05/VS-22, ER-05/BC-08, ER-10/OT-25-30) | Consolidate to canonical IDs |

## 3.2 — RED Flag Resolutions (My Decisions)

| Flag | Issue | Resolution |
|---|---|---|
| VD-17 | Cai (2015) — no title, no DOI, may not exist | **DELETE.** Remove from §CA.10. Check logical continuity — if load-bearing, replace with a verified citation. |
| EA-22 | Empty slot for Indonesian L1 Japanese learner error study | **DOCUMENT AS GAP.** Acknowledge in §5.6 that Indonesian-specific error analysis literature is thin. This is honest and a strength, not a weakness. |
| SC-05/VS-22 | Cook (2008) duplicate across §14 and §15 | **KEEP SC-05 as canonical.** Add cross-reference note to VS-22. Reduce citation count by 1. |
| ER-05/BC-08 | Hu & Nation (2000) duplicate across §4 and §1.12 | **KEEP BC-08 as canonical** (belongs in SRS boundary conditions). Cross-ref from §4. |
| ER-10/OT-25-30 | Webb (2007) duplicate across §4 and §12.5 | **KEEP OT-25 as canonical.** Cross-ref from §4. |
| AL-07/ID-xx | Bandura (1997) duplicate across §17 and §13 | **KEEP §13 ID cluster entry as canonical.** All Bandura (1997) references in §17 point to the §13 entry. |

**Post-resolution citation count: 754 verified unique works (v17-PASS10-FINAL).**

## 3.3 — YELLOW Flag Dispositions

| Flag | Disposition |
|---|---|
| ER-19 (Mori & Shimizu 2007) | Cite with [DOI UNVERIFIED] tag. Not load-bearing. |
| ER-20 (Chikamatsu 1996) | Cite with [DOI UNVERIFIED] tag. Pre-DOI era publication. |
| CV-05 (Qi & Mitchell 2012) | Keep conditionally. If CV-05 falls, the SRE cultural validity section loses its empirical anchor but Study 3 (malu) still stands independently. |
| PR-03 (Tamaoka 1991) | Pre-DOI Japanese publication. Cite with note. |
| PR-02 (Wydell et al. 1993) | Keep; check for conflict with KS-09/OD-07. |
| GA-08 (Mori 2002), GA-09 (Kanno 2007), LS-19 (Abdous et al. 2009) | Verify DOIs via web search in a future session. Not blocking. |
| OD-03 (Seymour et al. 2003) | Two conflicting DOIs — pick the correct one. Editorial task. |

## 3.4 — Compass Artifact Integration

The compass artifact (44 citations) is fully absorbed into the corpus. Its six sections map as follows:

| Compass Section | Corpus Coverage | Status |
|---|---|---|
| §1 Evidence-based techniques (44 citations) | §1 (61 citations) + §CA (107) | Fully superseded by deeper corpus sections |
| §2 JMdict/KANJIDIC2/KanjiVG/Tatoeba licensing | Dictionary Architecture Draft Part 2 | Absorbed; attribution template ready |
| §3 Pitch accent sources | Compass §3 + Dictionary Architecture §2.4 | WaDoku (CC-BY-SA) recommended as safest source |
| §4 Corpus-based frequency data | Compass §4 + §CA.1 | Leeds (CC-BY 2.5) + wikipedia-word-frequency-clean (BSD-3) + wordfreq (Apache 2.0) |
| §5 Contrastive linguistics (Indonesian-Japanese) | §5 (59 citations) + §5 addendum | Fully superseded by dedicated corpus section |
| §6 Copyright safety framework | Compass §6 + Dictionary Architecture Part 6 | Absorbed; safe architecture documented |

**The compass artifact should be retained as a quick-reference document** but is no longer the source of truth for any section.

## 3.5 — Agent 2 Gap Assessment — My Responses

Agent 2 identified 12 gaps. Here's what I'm doing with each:

| Gap | Priority | My Decision |
|---|---|---|
| Gap 1: Level Ladder | HIGH | **DONE** — Part 2 of this document |
| Gap 2: Speaking/Oral Production | HIGH | **DEFER to v2.** Platform v1 has no speaking features. Acknowledge on methodology page. |
| Gap 3: Writing Skill Development | MEDIUM | **DEFER to v2.** Flag for kanji writing feature. |
| Gap 4: Adaptive Learning beyond SRS | HIGH | **PARTIALLY ADDRESSED.** Level promotion logic (§2.8) provides content selection. Full ITS is v2+. |
| Gap 5: L3 Acquisition Dynamics | MEDIUM | **ACKNOWLEDGE AS LIMITATION.** Note on methodology page that most Indonesian learners are multilingual. |
| Gap 6: Assessment Architecture | HIGH | **PARTIALLY ADDRESSED.** Onboarding uses a simplified VLT-style placement (§CA.2). Full IRT-based adaptive testing is v2. |
| Gap 7: Kanji Sequencing | MEDIUM | **USE JLPT-FREQUENCY HYBRID.** Acknowledge Heisig RTK exists but choose frequency-first with radical hints from KRADFILE. |
| Gap 8: Pragmatic Competence | MEDIUM | **DEFER.** §14 keigo structure is in corpus. Pragmatic acquisition research is v2. |
| Gap 9: Cross-Section Synthesis | HIGH | **DONE** — Parts 1–2 of this document |
| Gap 10: Indonesian Learner Motivation | MEDIUM | **PARTIALLY ADDRESSED.** SDT + malu chain is complete. Investment theory (Norton 2000) acknowledged as gap. |
| Gap 11: Legal/Copyright | MEDIUM | **ADDRESSED in Dictionary Architecture.** Safe architecture uses only CC-licensed sources. |
| Gap 12: Accessibility | LOW | **DEFER to pre-launch.** Engineering task, not curriculum. |

---

# PART 4 — DATA ARCHITECTURE DECISIONS

## 4.1 — The Five-Layer Taxonomy (Confirmed)

| Layer | Purpose | Source | Mutability |
|---|---|---|---|
| L0 — Machine | JMdict/KANJIDIC2 native tags (~50 POS tags) | Open-source dictionaries | Immutable (updated from upstream) |
| L1 — Display | Bilingual labels (ID + EN) mapped from L0 | Our mapping table | Static; verified once |
| L2 — Pedagogical | ID translations, nuance, confusion pairs, grammar cats, domains, contrastive notes | LLM-authored + validated | Our primary content investment |
| L3 — Computed | Frequency ranks, collocations, phonetic components, transitivity pairs | Algorithmic from L0 + corpora | Deterministic; reproducible |
| L4 — User | FSRS state, review history, bookmarks, progress | Per-user localStorage / Supabase | Private; never in dictionary files |

**L0 replaces our current POS system.** Migration: bulk rename from our tags (`verb-ru`, `noun`, `i-adj`) to JMdict tags (`v1`, `n`, `adj-i`). One-time script.

**L2 is where all the work is.** This is the layer that costs tokens and creates value. Priority population order: N5 → N4 → N3 → N2 → N1, with Indonesian translations first, then nuance/contrastive notes, then confusion pairs.

## 4.2 — ID Format (Confirmed from v15.3.0)

```
VOCAB GLOBAL:   vg-{level}-{5digit}    Example: vg-n5-00001
GRAMMAR GLOBAL: gn{level}-{5digit}     Example: gn5-00001
BANK SOAL:      bs-{level}-{type}-{5digit}  Example: bs-n3-fi-00001
```

5-digit zero-padded. Future-proofs beyond 9,999 entries per level.

## 4.3 — Open-Source Data Pipeline

| Source | License | What We Get | Pipeline Status |
|---|---|---|---|
| JMdict | CC-BY-SA 4.0 | ~200K vocab entries | `tools/jmdict-pipeline.py` ready, not yet run |
| KANJIDIC2 | CC-BY-SA 4.0 | 13,108 kanji | Pipeline needed |
| KanjiVG | CC-BY-SA 3.0 | 6,500+ stroke SVGs | Pipeline needed |
| Tatoeba | CC-BY 2.0 FR | ~200K JP sentences | Pipeline needed |
| Leeds frequency | CC-BY 2.5 | ~45K word frequencies | Pipeline needed |
| WaDoku | CC-BY-SA | ~110K pitch accent entries | Pipeline needed |

**Priority:** JMdict first (vocab backbone), then KANJIDIC2 (kanji features), then Tatoeba (example sentences), then frequency data, then pitch accent, then stroke order.

## 4.4 — Book Lens Architecture (Confirmed)

Global database is the single source of truth. Book lenses are pointers:

```
Global DB (grammar-n3.js) → gn3-00015 {pattern: "〜おかげで", ...}
                                    ↑
Soumatome N3 Lens (grammar-lens-sm-n3.js) → {
  global_grammar_id: "gn3-00015",
  book_ref: "Soumatome N3 Week 2",
  page: 34,
  book_examples: [...]
}
```

Books supported: Soumatome (N5–N1), Irodori (A1/A2), Minna no Nihongo (1/2). Structure supports any future textbook.

## 4.5 — Attribution Requirements (Legal)

The About/Sources page MUST display (per EDRDG license):

> This application uses the JMdict/EDICT and KANJIDIC dictionary files. These files are the property of the Electronic Dictionary Research and Development Group, and are used in conformance with the Group's licence. https://www.edrdg.org/
>
> Example sentences from the Tatoeba project (https://tatoeba.org), CC-BY 2.0 FR.
>
> Kanji stroke order from KanjiVG by Ulrich Apel (https://kanjivg.tagaini.net), CC-BY-SA 3.0.

**Update requirement:** EDRDG license requires regular data updates. Implement a monthly JMdict refresh pipeline.

---

# PART 5 — FEATURE PRIORITY MATRIX

Features are ordered by their dependency chain and pedagogical impact.

## Phase 0: Foundation (Current — v15.4.0)
✅ Architecture v3 (5-digit IDs, taxonomy, grammar index)
✅ FSRS engine integrated
✅ Quiz engine v2 shell
✅ Gamification shell
✅ Soumatome grammar lenses (N3: 132, N4: 102)
✅ Study tracks with runtime population
✅ JMdict pipeline script (ready to run)
✅ Supabase schema + client JS

## Phase 1: Content Critical Mass (Next)
Priority: **Get enough content for the platform to be usable.**

1. **Run JMdict pipeline** → get vocab backbone data
2. **Reconcile JMdict output with existing vocab DB** → match by word+reading, keep existing entries (they have Indonesian translations), add new with next available IDs
3. **Indonesian translation sprint for N5** → all ~800 N5 entries get meaning_id
4. **Indonesian translation sprint for N4** → all ~1,500 cumulative entries
5. **Wire Supabase** → paste schema.sql, configure, wire client
6. **Pre-N5 Script Mastery track** → hiragana/katakana cards

## Phase 2: Learning Experience
Priority: **Make the platform actually teach, not just quiz.**

1. **JLPT Course Mode N5** → structured units with lessons + quizzes
2. **Quiz types Q-01 through Q-09** (Tier 1 + Tier 2 from Feature Expansion)
3. **Confusion pair drills** → the most pedagogically distinctive quiz type
4. **4-button FSRS rating UI** → Again/Hard/Good/Easy
5. **Track selection page** → choose learning path
6. **Book browsing UI** → Soumatome weekly view using lens data

## Phase 3: Polish & Retention
Priority: **Keep learners coming back.**

1. **Home tab with daily summary** → cards due, streak, daily word
2. **Gamification live** → XP, achievements, streak with freeze
3. **Stats dashboard** → review history, retention rate charts
4. **Manual backup/restore** → export/import JSON
5. **Card strength visualization** → retrievability color coding

## Phase 4: Scale
Priority: **More content, more features, more learners.**

1. **N3 content population** → ~3,750 cumulative vocab with Indonesian
2. **KANJIDIC2 pipeline** → kanji detail pages
3. **KanjiVG pipeline** → stroke order animation
4. **Tatoeba pipeline** → example sentences
5. **Course Mode N4 + N3**
6. **Auth UI** → login with Google/email
7. **Cloud sync** → Supabase background sync
8. **JLPT Mock Test** → timed exam simulation

## Phase 5: Advanced (v2+)
1. N2 + N1 content population
2. Pitch accent (WaDoku pipeline)
3. Frequency data integration (Leeds + Wikipedia)
4. Speaking features (ASR, shadowing) — pending Gap 2 research
5. Writing features — pending Gap 3 research
6. AI conversation partner (Claude-in-Claude)
7. Community error reporting

---

# PART 6 — METHODOLOGY PAGE SKELETON

This is the public-facing narrative that goes on the app's About/Methodology page.

## Structure (Indonesian primary, English available)

### 1. Siapa yang Kami Layani (Who We Serve)
Indonesia has 732,914 Japanese learners — second worldwide after China (Japan Foundation 2023 survey). 90.3% are secondary students. We build for Indonesian speakers specifically, with L1-aware contrastive notes no other platform offers.

### 2. Bagaimana Kami Mengajar (How We Teach)
Five evidence-based techniques with citations:
- Spaced repetition: Kim & Webb (2022), 48 experiments, N=3,411
- Active recall: Adesope et al. (2017), 217 studies, g=0.61
- Interleaved practice: Brunmair & Richter (2019), 59 studies, g=0.42
- Desirable difficulties: Bjork (1994), Soderstrom & Bjork (2015)
- Self-reference encoding: Pruss et al. (2025) — first study for L2 vocab specifically

### 3. Mengapa Khusus untuk Penutur Indonesia (Why Indonesian-Specific)
Seven documented interference points with pedagogical solutions. Key citations: Sutedi (2016), Lianna & Sutedi (2020), Puspitosari & Setiawati (2024). Privacy-first design grounded in malu/face-concern research (Markus & Kitayama 1991; Hofstede IDV=14 for Indonesia).

### 4. Kurikulum Berbasis Bukti (Evidence-Based Curriculum)
Nation's Four Strands (2007). Processability Theory grammar sequencing (Pienemann 1998; Kawaguchi 2005). CEFR-J proficiency descriptors (Negishi et al. 2013). Vocabulary selection following Nation's five criteria.

### 5. Sumber Data (Data Sources)
JMdict, KANJIDIC2, KanjiVG, Tatoeba — all open-source, commercially licensed, attribution on this page.

### 6. Apa yang Kami Masih Teliti (What We're Still Studying)
Three planned validation studies:
- Study 1: SDT need satisfaction in Indonesian Japanese learners
- Study 3: Malu, language anxiety, and SRS engagement (strongest corpus support — Agent 2 assessment)
- Study 2: FSRS difficulty prior calibration for non-kanji-background learners

### 7. Keterbatasan (Limitations)
Honest scope: SRS is most efficient for the first 2,000–3,000 words. Speaking and writing are beyond v1 scope. JLPT-CEFR alignment is approximate. We complement, not replace, classroom instruction and authentic interaction.

---

# PART 7 — RESEARCH AGENDA (Retained from Corpus)

## Priority Studies

| # | Study | Corpus Support | Timeline | Status |
|---|---|---|---|---|
| 3 | Malu/FLCA/SRS engagement A/B test | ✅ Strongest | Post-launch Month 3 | Feature prominently on methodology page |
| 1 | SDT need satisfaction survey | ✅ Strong | Post-launch Month 6 | Cite as "in preparation" |
| 2 | FSRS difficulty prior calibration | ⚠️ Matsunaga gap | Post-launch Month 9+ | Cite as "monitoring in progress" |
| 4 | Habit formation timing | ⚠️ Underdeveloped | Internal analytics | Do not cite publicly yet |
| 5 | PWA vs. native app | ✅ Adequate | Deprioritize | Replace with corpus argument |

**Matsunaga (1999) action item:** Formally absorb into §1.11 with a citation ID. It's the only evidence for the kanji exposure differential claim and currently cited secondhand only.

---

# PART 8 — COMPETITIVE POSITIONING

## Vs. Duolingo
**Duolingo's research base** (§16, CM-14–CM-17): Settles & Meeder (2016) HLR model; gamification-first design. Our advantage: FSRS is algorithmically superior to HLR for scheduling; we have Indonesian-specific contrastive notes; we offer dictionary-depth reference alongside learning.

**Evidence-based differentiation:**
- FSRS vs. Duolingo's HLR: both have peer-reviewed theoretical bases, FSRS is newer and built on larger dataset (220M review logs)
- Contrastive notes: Duolingo has zero L1-specific pedagogical content
- Dictionary depth: Duolingo treats vocabulary as course content; we treat it as reference data
- No gamification dark patterns: no hearts, no gem scarcity, no social pressure leaderboards (§10 gamification evidence: engagement ≠ learning)

## Vs. Bunpro
**Bunpro's strength:** Grammar-first, comprehensive grammar database with SRS. Our advantage: vocabulary coverage (Bunpro is grammar-only), Indonesian interface, dictionary-level reference data, book lens system covering multiple textbooks.

## Vs. Anki
**Anki's strength:** Infinite flexibility, FSRS native. Our advantage: curated content (Anki requires users to find/make their own decks), Indonesian translations, structured learning paths, no configuration overhead.

## Vs. WaniKani
**WaniKani's strength:** Brilliant kanji mnemonics, beautiful UI. Our advantage: vocabulary beyond kanji, grammar coverage, free/open-source, Indonesian localization.

---

# APPENDIX A — SAFE WORDING REFERENCE

Drawn from Agent 2's Section C caveats, these are the exact wordings to use on the methodology page for contested claims.

| Topic | Safe Wording |
|---|---|
| FSRS validation | "Based on a memory model validated in peer-reviewed computational cognitive science literature, with strong community benchmark performance" |
| JLPT-CEFR alignment | "Approximate CEFR equivalencies based on professional consensus" |
| SRS ceiling | "Most effective for building foundational vocabulary; above ~3,000 word families, supplementary reading becomes increasingly efficient" |
| Extensive reading transfer | "Strong evidence in English L2; we recommend as supplementary practice alongside SRS, noting that Japanese ER requires prior kana/kanji foundation" |
| Gamification | "Designed to reinforce learning behaviors, not to substitute for them; evidence for gamification improving learning outcomes is mixed" |
| Malu design | "Grounded in cross-cultural psychology research on face-concern; we acknowledge malu intensity varies by regional cultural background" |
| Vocabulary counting | All counts use "JLPT dictionary lemmas" — never mix with word family counts in the same sentence |

---

# APPENDIX B — BIBLIOGRAPHY STATUS

**Compiled entries:** 754 (MASTER-BIBLIOGRAPHY-FINAL.md, v6 — current as of v17-PASS15-FINAL) ✅ — 7 stubs remain (AL×2, CM×2, ER×2, SC×1)
- 754 full APA 7th Edition entries
- ~342 with DOIs (45%) — Pass 15 added 6 DOIs (PH-04, PH-05, PH-06, PH-07, PH-41, GI-02); PH-43 title/journal corrected; ~120 books with ISBNs
- 15 DOI verifications still pending (network-required); was 42 prior to Pass 15
- 73 cross-section duplicates identified and removed (from 808 pre-dedup)
- 11 confirmed duplicate pairs flagged for Crispy decision (DUP-01 through DUP-11) — bibliography untouched, awaiting ID-retirement decisions
- 7 stubs remain (see README-CRISPY DUPLICATE FLAG TABLE and v17-PASS15 audit)

**Extraction sources:** All 21 corpus section files, compass artifact, 7 returned agent bibliographies, §8/§5/§CA prose extraction, §8-v3 full recovery (was truncated in corpus v14).

**Note on count discrepancy:** The corpus README estimated ~890 citations. After deduplication and audit corrections through Pass 10, the verified unique count is 754 (v17-PASS10-FINAL). The difference from the original estimate reflects: 73 cross-section duplicates (same work cited in multiple sections with different cluster IDs), ~45 author-year references resolving to already-counted works, and ~35 overcounted inline references.

---

*NUGGET-NIHONGO-CURRICULUM-BLUEPRINT-v1.md*
*Authored: A1 Crispy 🥐 — 4 April 2026*
*Last updated: 7 April 2026 (v17-PASS15-FINAL sync — Agent 2 Sonnet 4.6 Pass 15 absorbed)*
*Status: AUTHORITATIVE*
