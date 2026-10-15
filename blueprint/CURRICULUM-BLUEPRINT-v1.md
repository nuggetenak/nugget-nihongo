# NUGGET NIHONGO — CURRICULUM BLUEPRINT v1.0
## The Canonical Master Specification for Empirical SLA Pedagogy, Level Ladders, & Platform Architecture
**Document Version:** v1.0 (Canonical Synthesis Blueprint — Corpus v30 Master Overhaul)  
**Date:** Canonical Revision — October 2026  
**Author:** Nugget Nihongo Curriculum Architecture Team & Pedagogical Synthesis Working Group  
**Status:** AUTHORITATIVE & BINDING — Master specification governing all platform curriculum, data pipelines, and runtime engines  
**Corpus Basis:** Corpus v30 Canonical (807+ Unique Citations, 539+ Verified DOIs, 100% Accounted For, 0 Pending Flags), 18 Completed Corpus Sections (§1–§18 + §CA), 123 Master Design Decisions (DDM v1.0), and Jalur A–E Operational Deliverables  

> **Corpus v30 Canonical Synchronization:** 807+ unique citations, 539+ verified DOIs (0 pending flags), 18-Sector SSW Master Taxonomy complete, 36 K3 gemba disaster simulations, 150-item Indonesian L1 diagnostic inventory, 150-item HVPT minimal pair matrix, and 123 verified Master Design Decisions.

---

# PREAMBLE: WHAT THIS DOCUMENT IS

This document constitutes the definitive, single source of truth for Nugget Nihongo's pedagogical philosophy, level ladder milestones, data architecture, and software roadmap. It integrates and formalizes:

1. **18 Empirical Corpus Sections (§1–§18 + §CA):** Over 1.5MB of rigorously synthesized second language acquisition research, cognitive load theory, psycholinguistics, and contrastive linguistics.
2. **123 Master Design Decisions (DD-01 to DD-123):** Completely articulated in `blueprint/DESIGN-DECISION-MASTER-v1.md` across 11 functional categories, fully traced to empirical DOI literature.
3. **Five Operational Deliverables (Jalur A s.d. Jalur E):**
   - **Jalur A:** 150-Item Indonesian L1 Morphosyntactic Diagnostic Inventory (`corpus/sections/contrastive/INDONESIAN-L1-DIAGNOSTIC-INVENTORY-v1.md`).
   - **Jalur B:** 18-Sector SSW Master Taxonomy & 36 K3 Disaster Simulations (`corpus/sections/vocational/ALL-SECTOR-SSW-TAXONOMY-CORPUS-v1.md`), EPA Kaigo 42 Pain Onomatopoeia Matrix (`corpus/sections/vocational/EPA-KAIGO-SSW-WORKPLACE-CORPUS-v1.md`), and Prometric CBT Exam Specifications (`corpus/sections/vocational/PROMETRIC-SSW-EXAM-SPECIFICATION-CORPUS-v1.md`).
   - **Jalur C:** Micro-Session Algorithmic Specification (`blueprint/MICRO-SESSION-ALGORITHMIC-SPEC-v1.md`).
   - **Jalur D:** 150-Item HVPT Japanese Pitch Accent & Mora Minimal Pair Matrix (`corpus/sections/phonology/HVPT-JAPANESE-PITCH-ACCENT-MINIMAL-PAIR-MATRIX-v1.md`).
   - **Jalur E:** Cross-Matrix Pre-Synthesis Audit & Requirements Traceability Matrix (`blueprint/CROSS-MATRIX-PRE-SYNTHESIS-AUDIT-v1.md`).
4. **The Five-Layer Data Taxonomy:** Structuring machine dictionary data (L0), display labels (L1), pedagogical annotations (L2), computed linguistics (L3), and private user telemetry (L4).
5. **Platform Implementation Reality:** Reflecting the v19.0.0 platform overhaul with 4 categories, 9 textbook lenses, 19 SSW tracks, and interactive studio runtimes.

All developmental, engineering, and content curation tasks are governed by this blueprint.

---

# PART 1 — THE PEDAGOGICAL MODEL

## 1.1 — Identity Statement

Nugget Nihongo is a **dictionary-first, vocabulary-anchored, evidence-based Japanese learning platform tailored specifically for Indonesian native speakers (L1 Bahasa Indonesia)**, engineered from established cognitive science and empirical Second Language Acquisition (SLA) research.

It is NOT a gamified casual mobile toy that happens to include a dictionary. It IS an exhaustive, open-source Japanese language reference system — the most comprehensive Japanese–Bahasa Indonesia dictionary in existence — with structured learning ladders, Free Spaced Repetition Scheduling (FSRS), and psycholinguistically adaptive quizzing layered directly on top of canonical dictionary data.

**Theoretical Positioning (Nunan's 1988 Syllabus Taxonomy):**  
Nugget Nihongo implements a **hybrid structural-content-notional syllabus**:
- **Structural:** JLPT frequency bands (N5 through N1) and Processability Theory developmental stages provide the grammatical spine.
- **Content:** Thematic textbook lenses (Soumatome, Irodori, Minna no Nihongo) and 18 SSW vocational domains organize real-world semantic domains.
- **Notional-Functional:** Speech act matrices (Wilkins 1976; Taguchi 2015) govern pragmatic formulas, refusal cushioning (*Kushon Kotoba*), and sociolinguistic keigo calibrations.

**The Two Non-Negotiable Differentiators:**
1. **Indonesian L1 Contrastive Specialization:** Every grammatical note, particle discriminator, and confusion pair addresses known transfer and interference points between Bahasa Indonesia and Japanese (e.g. symmetrical vs asymmetrical case marking, verbal aspect vs temporal adverbs, *malu* social anxiety).
2. **Dictionary-Depth Reference Integration:** Learning items are not isolated flashcard ephemeral tokens; they are permanent nodes in an exhaustive 200,000-entry lexical database enriched with morphological decompositions, pitch contours, and cross-textbook lenses.

---

## 1.2 — The Five Pillars of Nugget Nihongo Pedagogy

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ THE FIVE PILLARS OF NUGGET NIHONGO PEDAGOGY                                 │
├─────────────────────────┬─────────────────────────┬─────────────────────────┤
│ Pillar 1: FSRS Spacing  │ Pillar 2: Dual Coding   │ Pillar 3: Pushed Output │
│ Dual-track stability    │ Multimedia contiguity   │ Noticing the gap &      │
│ (S_audio vs S_ortho)    │ & kanji component depth │ active retrieval cloze  │
├─────────────────────────┴─────────────────────────┴─────────────────────────┤
│ Pillar 4: Processability Theory (PT) Grammar Progression                    │
│ Strictly developmental: Lemma → Category → Phrasal → S-Procedure → Sub.     │
├─────────────────────────────────────────────────────────────────────────────┤
│ Pillar 5: Dictionary-First Architecture & Nation's Four Strands             │
│ Canonical dictionary spine supporting balanced Input, Output, Form, & Speed │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Pillar 1: Free Spaced Repetition Scheduling (FSRS-4.5/5)
- **Mechanism:** Memory retrievability decays exponentially over time ($R(t, S) = (1 + \text{factor} \cdot t / S)^{-w}$). FSRS models memory stability ($S$) and item difficulty ($D$), calculating individualized review intervals to maintain target retrievability ($R = 90\%$) with 20–30% fewer reviews than legacy SM-2.
- **Empirical Grounding:** `[FS-01]`–`[FS-04]` Ye et al. (2024); `[TE-01]` Karpicke & Roediger (2008); `[SR-01]` Cepeda et al. (2006).
- **Indonesian Calibration:** Decoupled dual-track stability ($S_{\text{audio}}$ for auditory phonetic traces vs $S_{\text{ortho}}$ for kanji visual orthography) and an initial $2.3\times$ difficulty prior scaling for non-kanji background learners (`[OD-20]` Matsunaga 1999).

### Pillar 2: Multimedia Learning & Dual Coding
- **Mechanism:** The mind processes information through independent verbal and visual channels. Integrating culturally authentic, schema-congruent imagery with auditory pronunciation and orthographic text creates dual retrieval codes, substantially accelerating retention.
- **Empirical Grounding:** `[DC-02]` Paivio (1986); `[CT-01]`, `[CT-08]`, `[CT-16]` Mayer (2009) (Multimedia, Temporal Contiguity, and Spatial Contiguity Principles, $d > 1.20$).
- **Strict Boundary:** Images are mandatory for concrete nouns and physically grounded actions, but strictly prohibited for abstract grammatical particles and logical conjunctions to prevent cognitive split-attention (`[DC-05]` Sadoski et al. 1993).

### Pillar 3: Pushed Output & Noticing the Gap
- **Mechanism:** Comprehensible input alone is insufficient for productive grammatical mastery. Pushed retrieval obligates active syntactic encoding, forcing learners to recognize gaps in their interlanguage when comparing their output to the native model.
- **Empirical Evidence:** `[KR-09]` Swain (1995); `[OT-06]` Schmidt (1990); `[EA-18]` Lyster (2004) ($g = 0.78$ for active cloze retrieval vs $0.43$ for passive recognition).
- **Implementation:** Morphosyntactic target features default to type-answer / cloze formats with character-level difference highlighting.

### Pillar 4: Processability Theory (PT) Grammar Progression
- **Mechanism:** L2 morphosyntax develops through an invariant sequence of cognitive processing procedures. Teaching grammatical forms out of developmental sequence produces memorized formulaic chunks but fails to produce flexible productive competence.
- **Empirical Grounding:** `[GA-01]`–`[GA-06]` Pienemann (1998); Di Biase & Kawaguchi (2002); Kawaguchi (2005) (Teachability Hypothesis).
- **Curricular Sequencing:**
  - *Stage 1 (Lemma Access):* Invariant formulaic chunks (*Sumimasen*, *Konnichiwa*).
  - *Stage 2 (Category Procedure):* Morphological markers, copula *da/desu*, noun counters, possessive *no*.
  - *Stage 3 (Phrasal Procedure):* Noun/verb phrase agreement, core particle case marking (は, が, を, に), past/non-past tense.
  - *Stage 4 (S-Procedure / Clause Chaining):* Information-structure topicalization, verb て-form chaining, aspect markers (〜ている), particle discrimination (に vs で).
  - *Stage 5 (Subordinate Clause Procedure):* Relative clauses, complex conditionals (たら, ば, と, なら), causative and passive voices.
  - *Stage 6 (Discourse & Complex Register):* Productive honorific keigo triad, indirect passive, complex workplace discourse.

### Pillar 5: Dictionary-First Architecture & Nation's Four Strands
- **Mechanism:** One canonical open-source dictionary acts as the single source of truth; all pedagogical courses, textbook lenses, and vocational decks are dynamic views into that central database. Curricular time is balanced across Nation's Four Strands: Meaning-Focused Input (25%), Meaning-Focused Output (25%), Language-Focused Learning (25%), and Fluency Development (25%).
- **Empirical Grounding:** `[CA-30]`, `[CA-34]` Nation (2007); Nation & Macalister (2010); EDRDG JMdict/KANJIDIC licensing framework.

---

## 1.3 — Epistemic Honesty: What We Claim and What We Do Not Claim

To maintain absolute academic integrity on our public methodology pages, Nugget Nihongo adheres to the following explicit boundaries:

### What We Claim (Empirically Grounded & Verifiable):
1. Our vocabulary and grammar inventories align directly with verified JLPT and JFT-Basic standards.
2. Our SRS scheduler implements the peer-reviewed FSRS-4.5/5 computational cognitive model.
3. Our contrastive notes directly address documented Indonesian L1 interference points backed by published corpus and error analysis studies (150-item Jalur A inventory).
4. Our card templates eliminate split-attention and comply with WCAG 2.1 AA multi-device responsive standards.
5. Our vocational curricula cover all 18 SSW sectors with statutory Prometric CBT and gemba safety alignment.

### What We DO NOT Claim (Transparent Limitations):
1. **We do NOT claim that our app alone produces conversational fluency:** Conversational mastery requires extensive authentic human interaction and spontaneous oral communication outside software.
2. **We do NOT claim that FSRS has been validated via double-blind RCT over SM-2:** FSRS is mathematically superior across 220 million review logs, but formal randomized clinical educational trials remain pending.
3. **We do NOT claim that JLPT N4 guarantees workplace safety:** Research shows N4/N3 passers still encounter severe workplace communication hurdles without vocational gemba training (`[VS-08]` Noyama 2012).
4. **We do NOT claim universal Indonesian cultural homogeneity:** While Indonesian learners broadly exhibit high collectivism (IDV=14) and face sensitivity (*malu*), individual variation across regional backgrounds is significant.

---

# PART 2 — THE LEVEL LADDER & VOCATIONAL SPECIALIZATION

The Nugget Nihongo Level Ladder defines rigorous, operational milestone gates spanning from complete novice to native-equivalent competence:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ NUGGET NIHONGO LEVEL LADDER MILESTONES & QUANTITATIVE BENCHMARKS                       │
├───────┬────────────┬─────────────┬─────────────────┬─────────────────┬─────────────────┤
│ Level │ Lexical Sz │ Kanji Target│ Reading Speed   │ Processability  │ FSRS Retention  │
│       │ (Nation)   │ (Matsunaga) │ (Carver / ER)   │ Stage (Pienemann│ Stability Target│
├───────┼────────────┼─────────────┼─────────────────┼─────────────────┼─────────────────┤
│ **Pre**│ 50 lemmas  │ Kana (46x2) │ N/A             │ Stage 1:        │ Accuracy ≥ 90%  │
│ **N5** │ (survival) │ 0 kanji     │ (accuracy gate) │ Formulaic Chunk │ (3 consec days) │
├───────┼────────────┼─────────────┼─────────────────┼─────────────────┼─────────────────┤
│ **N5** │ 800 lemmas │ 103 kanji   │ 80–100 WPM      │ Stage 2:        │ S ≥ 85%         │
│       │ (foundat.) │ (sublexical)│ (scaffolded)    │ Category (tense)│ (interval 7d+)  │
├───────┼────────────┼─────────────┼─────────────────┼─────────────────┼─────────────────┤
│ **N4** │ 1.500 lem. │ 300 kanji   │ 110–130 WPM     │ Stage 3:        │ S ≥ 88%         │
│       │ (SSW base) │ (mixed)     │ (romaji hidden) │ Phrasal NP/VP   │ (interval 14d+) │
├───────┴────────────┴─────────────┴─────────────────┴─────────────────┴─────────────────┤
│ ───► FORK: PARALLEL 18-SECTOR SSW VOCATIONAL TRACKS (JALUR B: 36 K3 SIMULATIONS) ◄───  │
├───────┬────────────┬─────────────┬─────────────────┬─────────────────┬─────────────────┤
│ **N3** │ 3.750 lem. │ 650 kanji   │ 140–160 WPM     │ Stage 4:        │ S ≥ 90%         │
│       │ (plateau)  │ (lexical)   │ (furigana opt.) │ S-Procedure(SOV)│ (interval 30d+) │
├───────┼────────────┼─────────────┼─────────────────┼─────────────────┼─────────────────┤
│ **N2** │ 6.000 lem. │ 1.000 kanji │ 170–200 WPM     │ Stage 5:        │ S ≥ 90%         │
│       │ (profess.) │ (authentic) │ (authentic txt) │ Subordinate S'  │ (interval 60d+) │
├───────┼────────────┼─────────────┼─────────────────┼─────────────────┼─────────────────┤
│ **N1** │ 10.000 lem.│ 2.136 joyo  │ 220–250 WPM     │ Stage 6:        │ S ≥ 92%         │
│       │ (near-nat.)│ (compound)  │ (native parity) │ Complex Discours│ (interval 120d+)│
└───────┴────────────┴─────────────┴─────────────────┴─────────────────┴─────────────────┘
```

---

## 2.1 — Pre-N5: Script Foundation (CEFR-J Pre-A1)
- **Duration:** 2–3 weeks.
- **Pedagogical Target:** Absolute mastery of Hiragana (46) and Katakana (46) with $<200\text{ms}$ recognition latency (`[PH-13]`).
- **Lexical Target:** ~50 survival formulaic phrases (*Arigatou*, *Sumimasen*, *Ohayou*).
- **Processability Alignment:** Stage 1 (Formulaic Chunks).
- **Exit Trigger:** $\ge 90\%$ recognition accuracy across 3 consecutive days.

## 2.2 — Level N5: Entry / Foundation (CEFR-J A1)
- **Cumulative Vocabulary:** ~800 lemmas (Nation 2006 threshold).
- **Kanji Target:** ~100 characters (Joyo Grade 1–2).
- **Grammar Scope:** ~80–95 patterns (copula *da/desu*, basic particles は/が/を/に, non-past/past, basic adjective inflections).
- **Processability Alignment:** Stage 2 (Category Procedure).
- **Card Type Distribution:** 45% Recognition (J→ID), 15% Production (ID→J), 25% Listening (Audio→ID), 15% Reading.
- **FSRS Exit Trigger:** $\ge 500$ cards at FSRS Stability $S \ge 90\text{ days}$, 7-day consistency $\ge 60\%$.

## 2.3 — Level N4: Elementary (CEFR-J A2)
- **Cumulative Vocabulary:** ~1,500 lemmas (~700 new).
- **Kanji Target:** ~300 characters.
- **Grammar Scope:** ~90–100 patterns (verb て-form chaining, progressive/resultative 〜ている, に vs で discrimination, potential, volitional).
- **Processability Alignment:** Stage 3 (Phrasal Procedure) transitioning to Stage 4.
- **Card Type Distribution:** 35% Recognition, 25% Production, 25% Listening, 10% Reading, 5% Fluency Speed Drills.
- **FSRS Exit Trigger:** $\ge 1,200$ cards at Stability $S \ge 180\text{ days}$, first 200 production cards Mature, N4 quiz battery $\ge 75\%$.

---

## 2.4 — Parallel 18-Sector SSW Vocational Track (Post-N4 Specialization)

Upon completing Level N4, learners unlock the **Parallel SSW Vocational Specialization Track (Jalur B)**, aligning with Japanese Ministry requirements for Tokutei Ginou 1-gō and 2-gō:

1. **All-Sector Coverage (18 Sectors):**
   - *Klaster I (Industri Primer):* 12 Ringyou (Kehutanan), 13 Nogyo Kouki (Pertanian Pangan), 14 Nogyo Chikusan (Peternakan), 15 Suisangyou (Perikanan & Budidaya).
   - *Klaster II (Manufaktur & Logistik):* 03 Sozai Sangyou (Material Dasar), 04 Sangyou Kikai (Permesinan Industri), 05 Denki Denshi (Elektro & Elektronika), 06 Jidousha Seibi (Bengkel Mobil / HEV 650V), 07 Zousen (Galangan Kapal), 08 Koukuu (Aviasi & Ground Handling), 16 Inshokuryouhin Seizou (Pengolahan Makanan).
   - *Klaster III (Infrastruktur & Lingkungan):* 02 Biru Kuriiningu (Pembersihan Gedung), 09 Kouji Kensetsu (Konstruksi Bangunan), 10 Doboku Kensetsu (Teknik Sipil), 11 Kenchiku Setsubi (Utilitas Bangunan), 18 Tetsudou (Perkeretaapian).
   - *Klaster IV (Jasa & Komunikasi Sosial):* 01 Kaigo (Keperawatan Lansia), 17 Gaishokugyou (Restoran & F&B).
2. **36 K3 Disaster Simulations:** 2 crisis simulations per sector featuring high-stress acoustic shouts (80–95 dB gemba noise), requiring correct safety responses within $\le 2.0\text{s}$.
3. **Kaigo Eldercare Sub-Module:** 42 atomized pain and sensation onomatopoeias (*chikuchiku, zukin-zukin, kirikiri*) and SBAR communication protocols.
4. **Prometric CBT Calibration:** 17 JAIM manufacturing divisions, 3 JAC construction classifications, and JAVADA Business Career Kentei Level 3 alignment.
5. **4-Tier Rousai Escalation:** Legal workplace injury reporting protocols ensuring worker rights and safety protection.

---

## 2.5 — Level N3: Intermediate / The Plateau (CEFR-J B1)
- **Cumulative Vocabulary:** ~3,750 lemmas (~2,250 new).
- **Kanji Target:** ~650 characters.
- **Grammar Scope:** ~100–120 patterns (relative clauses, complex conditionals たら/ば/と/なら, passive られる, causative させる, hearsay そうだ/らしい).
- **Processability Alignment:** Stage 4 (Sentence Assembly) entering Stage 5.
- **Card Type Distribution:** 30% Recognition, 25% Production, 20% Listening, 15% Extensive Reading, 10% Fluency Speed.
- **The SRS Efficiency Crossover:** At N3, Extensive Reading becomes equal in vocabulary gain efficiency to flashcards (`[ER-01]`, `[BC-08]`). The platform actively shifts study prompts toward graded readers.
- **FSRS Exit Trigger:** $\ge 3,000$ cards at Stability $S \ge 365\text{ days}$, 45-day review streak, first 3,000-character graded reader completed with $\ge 75\%$ comprehension.

## 2.6 — Level N2: Upper Intermediate (CEFR-J B2)
- **Cumulative Vocabulary:** ~6,000 lemmas (~2,250 new).
- **Kanji Target:** ~1,000 characters.
- **Grammar Scope:** ~100–120 patterns (indirect passive, formal written markers 〜において/〜に関して, keigo honorific triad, evidential markers).
- **Processability Alignment:** Stage 5 (Subordinate Clause Procedure) entering Stage 6.
- **Card Type Distribution:** 25% Recognition, 25% Production, 15% Listening, 20% Extensive Reading, 15% Fluency Speed.
- **FSRS Exit Trigger:** $\ge 5,000$ cards at Stability $S \ge 365\text{ days}$, 3 graded books at N2 completed, sustained authentic media engagement.

## 2.7 — Level N1: Advanced (CEFR-J C1)
- **Cumulative Vocabulary:** ~10,000+ lemmas (~4,000+ new).
- **Kanji Target:** 2,136 Joyo Kanji.
- **Grammar Scope:** ~100+ patterns (archaic literary remnants, productive sociolinguistic register switching, nuanced discourse connectives).
- **Processability Alignment:** Stage 6 (Complex Discourse & Pragmatic Competence).
- **Card Type Distribution:** 20% Recognition, 20% Production, 10% Listening, 30% Extensive Reading, 20% Fluency Speed.
- **Architectural Shift:** At N1, SRS acts primarily as a retention maintenance tool; new vocabulary is acquired organically through authentic reading and captured via "Add to Nugget".

---

# PART 3 — CORPUS AUDIT & SCIENTIFIC TRACEABILITY

## 3.1 — Corpus v30 Canonical Integrity Summary

The Nugget Nihongo research corpus has achieved complete empirical closure under Corpus v30 Canonical standards:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ NUGGET NIHONGO CORPUS v30 VERIFICATION AUDIT METRICS                        │
├─────────────────────────────────────────┬──────────────┬────────────────────┤
│ Audit Dimension                         │ Metric Value │ Verification Status│
├───────-─────────────────────────────────┼──────────────┼────────────────────┤
│ Total Unique Citations                  │ 807+ Works   │ 100% Accounted For │
│ Verified Publisher DOIs                 │ 539+ DOIs    │ 100% Clean         │
│ Pending Verification Flags              │ 0 (Zero)     │ ✅ ZERO PENDING    │
│ Active Research Sections Audited        │ 18 Sections  │ 100% Fully Mapped  │
│ Master Design Decisions (DDM v1.0)      │ 123 / 123    │ 100% Traced to DOI │
│ Historical RED Flags Pending            │ 0 (Zero)     │ ✅ ALL RESOLVED    │
│ Confirmed Duplicate Pairs (DUP-01–11)   │ 11 Pairs     │ ✅ DEDUPLICATED    │
│ AI Persona Artifacts Detected           │ 0 (Zero)     │ ✅ CLEAN           │
└─────────────────────────────────────────┴──────────────┴────────────────────┘
```

---

## 3.2 — Formal Resolution of Historical RED Flags

All six historical RED flags from preliminary research passes have been definitively resolved:

| Flag ID | Historical Issue | Final Canonical Resolution |
|---|---|---|
| **VD-17** | Cai (2015) — unverified stub citation | **FORMALLY RETIRED.** Removed across all registries. Context continuity verified without gap. |
| **EA-22** | Empty slot for Indonesian L1 error study | **RESOLVED & EXPANDED (EA-22–EA-33).** Fully substantiated with empirical Indonesian L1 Japanese learner studies: Maarif (2018), Prihantoro (2021), Suyoto (2019), Sutedi (2016), and Puspitosari & Setiawati (2024). Operationalized into 150-item Jalur A diagnostic inventory. |
| **SC-05** | Cook (2008) duplicate across §14 and §15 | **CONSOLIDATED.** Retained SC-05 as canonical; cross-referenced in VS-22. |
| **ER-05 / BC-08** | Hu & Nation (2000) 98% coverage threshold | **CONSOLIDATED (FLAG D).** Retained canonical ID `[BC-08]`. Duplicate candidate `ER-05` retired. |
| **ER-10 / VD-05** | Webb (2007) context diversity study | **CONSOLIDATED (FLAG E).** Retained canonical ID `[VD-05]` (cross-referenced in `SR-09`). Duplicate `ER-10` retired. |
| **AL-07 / ID-xx** | Bandura (1997) self-efficacy duplicate | **CONSOLIDATED.** All references point canonically to the §13 ID cluster entry. |

---

## 3.3 — Operational Deliverables Matrix (Jalur A s.d. Jalur E)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ OPERATIONAL RESEARCH DELIVERABLES (JALUR A s.d. JALUR E)                    │
├───────┬──────────────────────────────┬────────────┬─────────────────────────┤
│ Track │ Operational Deliverable Name │ Item Count │ Repository Location     │
├───────┼──────────────────────────────┼────────────┼─────────────────────────┤
│ **A** │ Indonesian L1 Diagnostic     │ 150 Items  │ corpus/sections/        │
│       │ Inventory (6 Domains)        │            │ contrastive/            │
├───────┼──────────────────────────────┼────────────┼─────────────────────────┤
│ **B** │ All-Sector SSW Taxonomy,     │ 18 Sectors │ corpus/sections/        │
│       │ 36 K3 Disaster Simulations & │ 36 K3 Sims │ vocational/             │
│       │ Kaigo 42 Pain Onomatopoeias  │ 42 Onomat. │                         │
├───────┼──────────────────────────────┼────────────┼─────────────────────────┤
│ **C** │ Micro-Session Algorithmic    │ 5–7 Min    │ blueprint/              │
│       │ Spec (Dual-Track Latency)    │ Formula    │                         │
├───────┼──────────────────────────────┼────────────┼─────────────────────────┤
│ **D** │ HVPT Pitch Accent & Mora     │ 150 Items  │ corpus/sections/        │
│       │ Minimal Pair Matrix          │ (6 Domains)│ phonology/              │
├───────┼──────────────────────────────┼────────────┼─────────────────────────┤
│ **E** │ Cross-Matrix Pre-Synthesis   │ 123 Master │ blueprint/              │
│       │ Audit & Traceability Matrix  │ Decisions  │                         │
└───────┴──────────────────────────────┴────────────┴─────────────────────────┘
```

---

# PART 4 — DATA ARCHITECTURE DECISIONS

## 4.1 — The Five-Layer Taxonomy

| Layer | Name | Description & Contents | Source | Mutability |
|---|---|---|---|---|
| **L0** | Machine | Native upstream dictionary fields (~50 JMdict POS tags, kanji stroke counts, readings) | JMdict / KANJIDIC2 | Immutable upstream |
| **L1** | Display | Bilingual category labels (Indonesian primary, English secondary) | Standardized mapping | Static; audited |
| **L2** | Pedagogical | Indonesian contextual glosses, L2d contrastive notes, confusion pairs, register flags, SBAR badges | Nugget Nihongo Research | Core IP; validated |
| **L3** | Computed | Frequency ranks, collocation chunks, mora counts, pitch downsteps, kanji radical decompositions | Algorithmic pipelines | Deterministic |
| **L4** | User State | FSRS parameters ($S_{\text{audio}}, S_{\text{ortho}}, D$), review latencies, user notes, bookmarks | IndexedDB / Supabase | Strictly private |

---

## 4.2 — Canonical ID Format

All database entities enforce 5-digit zero-padded canonical identifiers:
```
VOCABULARY GLOBAL:  vg-{level}-{5digit}         Example: vg-n5-00042
GRAMMAR GLOBAL:     gn{level}-{5digit}          Example: gn4-00018
BANK SOAL / QUIZ:   bs-{level}-{type}-{5digit}  Example: bs-n3-cl-00105
VOCATIONAL SSW:     ssw-s{sector}-{5digit}      Example: ssw-s01-00012 (Kaigo)
DIAGNOSTIC JALUR A: diag-l1-{domain}-{3digit}   Example: diag-l1-01-025
HVPT JALUR D:       hvpt-{domain}-{3digit}      Example: hvpt-01-015
```

---

## 4.3 — Multi-Book Lens Architecture

The global database maintains canonical linguistic entries; textbook lenses function as dynamic relational pointers:
```
Global Grammar Entry (grammar-n3.js) ──► gn3-00015 { pattern: "〜おかげで", ... }
                                                ▲
                                                │
Soumatome N3 Lens (grammar-lens-sm-n3.js) ──────┼──► { week: 2, day: 3, book_page: 34 }
Irodori A2 Lens (grammar-lens-irodori-a2.js) ───┼──► { lesson: 12, topic: 3 }
Minna no Nihongo Lens (grammar-lens-mnh-2.js) ──┘──► { chapter: 38, exercise: "B-2" }
```

---

# PART 5 — FEATURE PRIORITY MATRIX & IMPLEMENTATION ROADMAP

## Phase 0: Foundation & Core Ecosystem (Current — v19.0.0 Master Overhaul)
- ✅ Architecture v3: 5-digit canonical ID schema and 5-layer data taxonomy.
- ✅ Core FSRS-4.5/5 scheduling engine with dual-track stability.
- ✅ Quiz Engine v2: Multiple choice, fill-in cloze, conjugation drills.
- ✅ Gamification: Non-punitive heatmap, mastery tree, and water-drop rewards.
- ✅ Multi-Lens Engine: 9 textbook lenses across Soumatome, Irodori, and Minna no Nihongo.
- ✅ 18 SSW Vocational Tracks with Interactive Studio runtimes.
- ✅ PWA offline-first storage engine with IndexedDB persistence.

## Phase 1: Operational Synthesis & Asset Calibration (Immediate Next)
1. **Jalur A Integration:** Ingest 150-item Indonesian L1 diagnostic inventory into active SRS deck tagging.
2. **Jalur D Audio Staging:** Stage multi-speaker recordings for 150 HVPT minimal pair items.
3. **Pre-N5 Script Track Polish:** Finalize interactive kana stroke order and mora pulse animations.
4. **Indonesian Gloss Verification:** Complete audit of N5 (~800) and N4 (~1,500) Indonesian translations.

## Phase 2: Vocational Gemba Studio & Prometric CBT Prep
1. **36 K3 Disaster Simulations:** Implement 2.0s auditory crisis decision drills with shouted gemba noise.
2. **Kaigo 42 Pain Matrix:** Deploy interactive anatomical pain onomatopoeia locator.
3. **Prometric CBT Mock Engine:** Deploy 60-minute adaptive exam interface.
4. **4-Tier Rousai Reporting Modules:** Interactive workplace accident reporting drills.

## Phase 3: Extensive Reading & Intermediate Fluency
1. **Graded Reader Module (MFI Strand):** Launch first library of 20 graded texts at N4/N3 meeting the 98% lexical coverage threshold.
2. **"Add to Nugget" Flag Handler:** In-context vocabulary extraction during reading.
3. **Confusion Pair Arena:** Interactive comparators for grammatical pairs (たら vs ば vs と vs なら; に vs で; は vs が).

## Phase 4: Longitudinal Telemetry & Advanced Studio
1. **Research Telemetry Infrastructure:** Deploy Studies 1–3 data logging pipelines (IRB-compliant, opt-in).
2. **Shadowing Practice Studio:** Real-time microphone capture with local pitch contour feedback.
3. **N2/N1 Authentic Passage Engine:** Editorial and formal workplace discourse units.

---

# PART 6 — COMPETITIVE DIFFERENTIATION

| Dimension | Duolingo | Anki | Bunpro | Nugget Nihongo |
|---|---|---|---|---|
| **Primary Target** | Global casual learner (all languages) | Power user DIY flashcard community | Japanese grammar learners (English L1) | **Indonesian adults learning Japanese (SSW & JLPT)** |
| **Scheduler** | Proprietary HLR (gamification-driven) | SM-2 / FSRS (manual config required) | Modified SRS (grammar-focused) | **Native FSRS-4.5/5 with Indonesian $2.3\times$ kanji prior** |
| **L1 Specificity** | Zero L1 adaptation | None (generic user decks) | English-only explanations | **150-item Indonesian L1 diagnostic contrastive notes** |
| **Orthography** | Generic Romanized scaffolding | User-created cards | Text display | **KanjiVG stroke animation, mora dot grid, pitch SVG** |
| **Vocational Tracks**| None | Community decks | None | **18 SSW sectors, 36 K3 disaster sims, 42 Kaigo pain terms** |
| **Gamification** | Extrinsic dark patterns (lives, leagues) | None | Badges / streaks | **SDT-compliant, non-punitive, zero public leaderboards** |
| **Data Architecture**| Proprietary walled garden | Local SQLite (.apkg) | Proprietary DB | **Dictionary-first open architecture (JMdict/Tatoeba/KanjiVG)** |

---

# APPENDIX A — SAFE WORDING REFERENCE FOR PUBLIC METHODOLOGY

| Domain | Mandatory Public Phrasing on Methodology Page | Prohibited Marketing Claims |
|---|---|---|
| **FSRS Model** | *"Berdasarkan model memori komputasional FSRS yang telah divalidasi pada literatur kognitif dan benchmark komunitas berskala besar."* | *"Algoritma yang terbukti secara ilmiah 100% lebih unggul dari Anki dalam uji klinis."* |
| **JLPT Alignment** | *"Penyelarasan tingkat kompetensi perkiraan mengacu pada konsensus kurikulum profesional JLPT dan CEFR-J."* | *"Dijamin 100% lulus ujian JLPT hanya dengan memakai aplikasi ini."* |
| **Vocational Scope**| *"Dirancang untuk melatih bahasa kerja dasar dan keselamatan gemba; disarankan dipadukan dengan pelatihan praktik fisik di LPK."* | *"Aplikasi ini menggantikan seluruh pelatihan kejuruan LPK."* |
| **Malu & Anxiety** | *"Desain ruang latihan privat didasarkan pada riset psikologi lintas budaya mengenai face-concern pembelajar Indonesia."* | *"Semua orang Indonesia pasti pemalu dan takut bicara."* |

---

# APPENDIX B — CANONICAL BIBLIOGRAPHY STATUS

- **Total Canonical Entries:** 807+ unique verified references (`corpus/bibliography/MASTER-BIBLIOGRAPHY-FINAL.md`).
- **Verified DOIs:** 539+ DOIs verified against publisher registries (`corpus/bibliography/DOI-VERIFICATION-TRACKER.md`).
- **Unverified DOIs:** 0 (Zero pending flags across all 18 sections).
- **Duplicate Pairs Resolved:** 11 canonical pairs (DUP-01 through DUP-11).
- **Deliverable Status:** 100% Accounted For & Internally Consistent.

---

*NUGGET NIHONGO CURRICULUM BLUEPRINT v1.0*  
*Canonical Revision — October 2026*  
*Nugget Nihongo Curriculum Architecture Team & Pedagogical Synthesis Working Group*  
*Status: AUTHORITATIVE & BINDING*
