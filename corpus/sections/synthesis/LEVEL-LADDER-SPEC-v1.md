# LEVEL LADDER SPECIFICATION — v1
**For:** Nugget Nihongo — Evidence-Based Curriculum Blueprint
**Authored by:** Crispy (Claude Opus 4.7) — Pass 16 synthesis
**Date:** 17 April 2026
**Source corpus:** v17-PASS15-FINAL (747 citations, 16 sections)

---

## PURPOSE

This document defines **concrete, operational exit criteria** for each JLPT level (N5 → N1) as a platform milestone ladder. Each level specifies four things: (1) vocabulary load target with counting convention, (2) grammar structures introduced with Processability Theory (PT) stage mapping, (3) SRS card type distribution, and (4) observable can-do exit criteria expressed as CEFR-J-aligned behaviors plus an FSRS milestone trigger.

The ladder is derived from a synthesis of five evidence clusters already canonical in the corpus:

- **Vocabulary load targets:** Nation's five-criteria framework and JLPT/CEFR-J coverage tables (§CA.1, §CA.3) → CA-30, CA-31, CA-32, CA-35, CA-41, CA-42 +  BC cluster (vocabulary threshold for comprehension).
- **Grammar progression:** Pienemann's Processability Theory applied to Japanese (§2.2–§2.3) → GA-05 (Di Biase & Kawaguchi), GA-19 (Kanno relative clauses), GA-15 (Kawaguchi stages).
- **Card type distribution:** Four Strands (§CA.5) applied to SRS architecture → CA-34, CA-36 + §1 SRS evidence base.
- **Can-do framing:** CEFR-J Japanese adaptation (§CA.3) → CA-35 (Negishi, Takada & Tono), CA-36 (North).
- **FSRS milestones:** §1.11 stability/difficulty parameters + §1.12 boundary conditions (BC cluster).

The ladder is **not prescriptive about pacing.** It defines readiness conditions, not a calendar. A learner may take six months or three years to reach N4 exit; the ladder only specifies what N4 exit *means* operationally on the Nugget Nihongo platform.

---

## ARCHITECTURAL NOTE — COUNTING CONVENTION

Vocabulary counts throughout this document use **word family** counting (Nation 2016, CA-32), not headword or token counting. A word family groups a stem plus its inflections and closely transparent derivations. For Japanese, word family counting folds verb conjugations, adjective forms, and predictable compound variations under a single count. This convention matters because JLPT published vocabulary lists mix counting schemes; using word families makes the coverage-threshold literature (Laufer 1992 CA-24, Nation 2006 CA-31, Schmitt & Schmitt 2014 CA-41) directly applicable.

SRS card counts are **separate from vocabulary word family counts.** A single word family may produce 1–4 cards depending on card type distribution. The ladder specifies both numbers independently.

---

## LEVEL N5 — ENTRY / FOUNDATION

### Vocabulary Load Target

**700–800 word families.** Derived from:
- Japan Foundation JF Standard A1 threshold (~800 words; CA-21)
- JLPT N5 vocabulary corpus (~800 items; JLPT published guidelines CA-20 cluster)
- Nation (2006) CA-31 lower-bound for elementary listening/reading comprehension (~2,000 words total for meaningful input; N5 represents the first ~40% of that foundation)

### Grammar Structures (PT Stage Mapping)

**Stages 1–2 of Pienemann/Di Biase-Kawaguchi Japanese PT hierarchy** (GA-05, GA-15):

- **Stage 1 (Word order):** Canonical SOV with は/が, direct objects with を. Single-clause utterances.
- **Stage 2 (Phrasal information):** Adjective-noun agreement (い-adj, な-adj attributive forms), possessive の, locative に/で basic distinction, temporal に.

Structural scope: ~80–95 grammar points (current Nugget Nihongo grammar-n5.js holds 94 entries — this ladder validates that corpus size is appropriate for the level).

### SRS Card Type Distribution (Four Strands Applied)

| Card Type | Share | Strand Served | Rationale |
|---|---|---|---|
| **Recognition (J→ID)** | 45% | Meaning-focused input | Receptive vocabulary is the dominant demand at N5; reading graded texts, matching audio to script |
| **Production (ID→J)** | 15% | Meaning-focused output | Low share: premature pushed output at N5 produces incorrect formulaic chunks (KR-09 Swain pushes output value, but §12.3 specifies readiness threshold) |
| **Listening (audio→ID)** | 25% | Meaning-focused input | High share because Japanese orthographic load delays reading automaticity; listening provides pre-literate access (§9 PR cluster phonological recoding) |
| **Reading (script→audio+ID)** | 15% | Language-focused learning | Reading decoding at N5 is slow; focused kanji-kana recognition work, not reading-for-meaning yet |

Fluency strand deferred to N4+ (see N4 row). Language-focused learning strand served by explicit grammar explanations in Browse tab, not SRS cards directly.

### Can-Do Exit Criteria (CEFR-J A1 alignment)

A learner exits N5 when they can, without external support:

1. Read and write all hiragana and katakana with <200ms per-character recognition latency (§11 phonological recoding threshold; PH cluster).
2. Produce simple self-introduction (~5–8 sentences) covering name, origin, occupation/student status, one hobby, basic preferences — using Stage 1–2 structures exclusively.
3. Comprehend hiragana/simple-kanji text at 500–600 characters/minute with ≥80% content recall (CA-41 coverage threshold applied to elementary texts).
4. Distinguish the four core particles は/が/を/に in listening comprehension tests at ≥70% accuracy (GA-19 Kanno particle processing, Stage 2 diagnostic).

### FSRS Milestone Trigger

- **≥500 cards at FSRS Stability ≥ 90 days** (cards in the "Mature" range per §1.11)
- **≥7-day current streak**
- **Daily review consistency ≥60% over the prior 30 days** (proxy for habit formation; §10 HB cluster)

When all three triggers fire concurrently, the platform surfaces an **N5 Exit Ceremony** and unlocks N4 card flows. Before the triggers fire, the platform does not pressure progression; §8 SDT evidence (autonomy need satisfaction) argues that learner-initiated progression outperforms system-pushed progression for long-run retention.

---

## LEVEL N4 — ELEMENTARY

### Vocabulary Load Target

**1,400–1,600 word families cumulative** (N5 base + ~700–800 new at N4).

Aligned with:
- JF Standard A2 threshold (~1,500 words; CA-21)
- Schmitt & Schmitt (2014) CA-41 mid-frequency band entry point (~1,500 words)
- Nation (2006) CA-31 adult conversational comprehension threshold (~2,000 families — reached at upper-N4/lower-N3 transition)

### Grammar Structures (PT Stage Mapping)

**Stages 2–3 extended**:

- **Stage 2 consolidation:** Case marking under topicalization pressure (は vs が distinction under information-structure control), verb て-form as clausal connector, adjective て-form.
- **Stage 3 (Inter-phrasal morphology):** Subject-verb agreement for politeness register (polite vs plain), verb tense consistency across clauses, embedded clauses with と (quotative), ので/から causal subordination.

Structural scope: ~80–100 grammar points (current grammar-n4.js = 92 entries; well-calibrated).

### SRS Card Type Distribution

| Card Type | Share | Change from N5 |
|---|---|---|
| **Recognition (J→ID)** | 35% | ↓10% — receptive is more automated now |
| **Production (ID→J)** | 25% | ↑10% — learner is past Stage 2 ceiling; output practice is developmentally appropriate (KR-09 Swain output noticing, §12) |
| **Listening (audio→ID)** | 25% | = |
| **Reading (script→audio+ID)** | 10% | ↓5% — reading fluency is building; less explicit decoding drill needed |
| **Fluency (timed recognition)** | 5% | NEW — fluency strand activates; time-pressured recognition of high-frequency items only |

### Can-Do Exit Criteria (CEFR-J A2 alignment)

A learner exits N4 when they can:

1. Sustain a 5–10 minute conversation on everyday topics (shopping, directions, weekend plans, simple opinions) with back-and-forth exchange, including basic clarification requests.
2. Read a short narrative text (~500–800 characters, mixed kanji-kana at N4 kanji set) and extract the main event sequence, key participants, and stated outcome.
3. Write a short personal paragraph (~150–250 characters) with correct tense, politeness register consistency, and basic cohesion markers (そして、でも、それから).
4. Comprehend slow-register listening (native at ~120 wpm Japanese equivalent) on pre-announced topics at ≥75% gist accuracy.

### FSRS Milestone Trigger

- **≥1,200 cards at FSRS Stability ≥ 180 days**
- **≥21-day current streak**
- **First production-mode card batch (≥200 cards) graduated to Mature**
- **Grammar test battery (N4 structures, ~50 items sampled via quiz-engine-v2) at ≥75% accuracy**

---

## LEVEL N3 — INTERMEDIATE (THE PLATEAU)

### Vocabulary Load Target

**3,500–3,800 word families cumulative** (N4 base + ~2,000–2,300 new at N3).

This is the level where vocabulary becomes the dominant bottleneck:
- Nation (2006) CA-31 written text comprehension threshold (~5,000 word families for general written text at 98% coverage) starts to come into reach at upper-N3.
- Schmitt & Schmitt (2014) CA-41 mid-frequency plateau begins here — learners encounter the "frequency wall" where new items are individually useful but less frequent, reducing naturalistic exposure per item.
- Laufer (1992) CA-24 and Hu & Nation (2000) ER-05 coverage-threshold research applies directly: N3 is the first level where extensive reading becomes pedagogically efficient. Below N3, ER has coverage gaps too large to sustain meaning-focused input; above N3, ER compounds acquisition rapidly.

### Grammar Structures (PT Stage Mapping)

**Stages 3–4**:

- **Stage 3 consolidation:** Passive voice, causative voice, conditional forms (ば, たら, なら, と — four distinct conditional with different semantics).
- **Stage 4 (Inter-clausal morphology):** Relative clauses (GA-19 Kanno — processing-costly for L2 learners, warrants explicit structural practice), nominal predication under temporal/causal subordination, pseudo-cleft structures (〜のは〜だ), formal/literary register introduction.

Structural scope: ~100–120 grammar points (current grammar-n3.js = 103 entries).

### SRS Card Type Distribution

| Card Type | Share | Change from N4 |
|---|---|---|
| **Recognition (J→ID)** | 30% | ↓5% |
| **Production (ID→J)** | 25% | = |
| **Listening (audio→ID)** | 20% | ↓5% |
| **Reading (extensive, untimed)** | 15% | ↑5% — ER becomes primary skill-building mode |
| **Fluency (timed recognition)** | 10% | ↑5% — fluency gains become measurable |

### Can-Do Exit Criteria (CEFR-J B1 alignment)

1. Read a newspaper article or blog post (~1,500–2,500 characters, mixed kanji-kana at N3 kanji set) and produce a 3–5 sentence summary capturing argument structure, not just surface events.
2. Participate in a group conversation (3+ speakers) with real-time turn-taking, topic-shift tracking, and appropriate register calibration.
3. Write a 400–600 character paragraph expressing a position with supporting reasoning (なぜなら, 〜というのは, 〜と思う + justification).
4. Comprehend native-paced listening on familiar topics at ≥70% detail accuracy (upward from gist-level at N4).
5. Read an extensive-reading graded text (10,000+ characters) in one or two sittings with subjective comprehension ≥85% and objective comprehension ≥75% on post-reading questions (ER-15 Nation-Waring thresholds applied).

### FSRS Milestone Trigger

- **≥3,000 cards at FSRS Stability ≥ 365 days** (annual retention demonstrated)
- **≥45-day current streak** (habit formation secure per §10 Lally et al. HB-04 range)
- **First graded reader (≥3,000-character text) completed with post-reading comprehension ≥75%**
- **Grammar battery at ≥80%**

**⚠ Boundary condition (§1.12 BC cluster):** N3 is where the SRS-as-primary-mode strategy begins to underperform. Webb & Nation efficiency ceiling applies: at this vocabulary size, the marginal return of one more SRS card is below the marginal return of one more hour of extensive reading. The platform should **actively decrease new-card introduction rate at N3** and increase ER prompts. This is not a failure mode — it is a designed handoff from intensive to extensive modes.

---

## LEVEL N2 — UPPER INTERMEDIATE

### Vocabulary Load Target

**6,000–7,000 word families cumulative** (N3 base + ~2,500–3,500 new at N2).

- Approaches Nation (2006) CA-31 written comprehension threshold (~5,000 for general; ~7,000 for academic).
- Schmitt & Schmitt (2014) CA-41 high-frequency expansion.
- Japanese-specific: JLPT N2 vocabulary list + academic register entry (news, formal writing, workplace communication).

### Grammar Structures (PT Stage Mapping)

**Stages 4–5**:

- **Stage 4 consolidation:** All productive and receptive grammar at native-like parse speed. Aspect markers (〜てしまう、〜ておく、〜てある semantic distinctions).
- **Stage 5 (Target-like morpho-syntax):** Formal register grammar (〜において、〜に関して、〜をめぐって), literary tense/aspect (〜ていた historical framing), nominalizers (こと vs の distinction under verb selection), hearsay/evidentiality markers (〜そうだ、〜らしい、〜ようだ — three evidentials with distinct epistemic profiles).

Structural scope: ~150–200 grammar points. Current grammar-n2.js has 30 seed entries — **this represents a real content gap** the platform should address before N2 becomes a meaningful level for users.

### SRS Card Type Distribution

| Card Type | Share | Change from N3 |
|---|---|---|
| **Recognition (J→ID)** | 25% | ↓5% |
| **Production (ID→J)** | 25% | = |
| **Listening (audio→ID)** | 15% | ↓5% — native-paced listening shifts to authentic media, not SRS-contained |
| **Reading (extensive)** | 20% | ↑5% |
| **Fluency (timed)** | 15% | ↑5% |

### Can-Do Exit Criteria (CEFR-J B2 alignment)

1. Read editorial/opinion journalism (4,000+ characters) and reconstruct the author's argument including counterargument acknowledgment.
2. Sustain professional-register conversation (work meeting, customer service, academic discussion) with register-appropriate politeness dynamics (§14 SC cluster keigo).
3. Write argumentative text (~1,000+ characters) with discourse markers, coherent paragraph structure, register consistency.
4. Comprehend native-paced authentic media (news broadcasts, podcasts, film dialogue) at ≥80% accuracy on first listen.
5. Handle register shifts in real time — switching between casual and polite registers based on interlocutor cues without conscious monitoring breakdown.

### FSRS Milestone Trigger

- **≥5,000 cards at FSRS Stability ≥ 365 days**
- **Sustained 90+ day streak with ≤7 skipped days**
- **Completion of at least 3 extensive-reading graded books at N2 difficulty**
- **First production-dominant practice (output-oriented) milestones (e.g., written Japanese journal entries at 300+ characters) self-sustained for 30+ days**

---

## LEVEL N1 — ADVANCED

### Vocabulary Load Target

**10,000+ word families cumulative.** Approaches near-native functional vocabulary for general adult contexts. JLPT N1 specifically tests the ~2,000 items in the N1-exclusive band (low-frequency, register-specialized), but functional N1 performance requires the full 10,000 base.

### Grammar Structures (PT Stage Mapping)

**Stage 5+ / terminal stage:**

- All Pienemann stages fully automated in both comprehension and production.
- Register-marked grammar (archaic forms in literary texts, keigo subsystems with full productive command, dialect awareness at receptive level).
- Pragmatic-grammatical interface fully integrated (§14 SC-08 Kasper & Rose — pragmatic competence reaches ceiling at N1; beyond this level, gains are sociolinguistic register mastery not grammatical).

Structural scope: Fewer *new* grammar points (~80–120 items) but much higher complexity per item. Current grammar-n1.js has 8 seed entries — **also a content gap**, but lower priority than N2 because fewer Nugget Nihongo users will reach N1 in the medium term.

### SRS Card Type Distribution

| Card Type | Share | Change from N2 |
|---|---|---|
| **Recognition (J→ID)** | 20% | ↓5% |
| **Production (ID→J)** | 20% | ↓5% |
| **Listening (audio→ID)** | 10% | ↓5% — dominant listening mode is authentic media consumption outside SRS |
| **Reading (extensive)** | 30% | ↑10% — ER is the primary vocabulary-acquisition mode at N1 |
| **Fluency (timed)** | 20% | ↑5% |

**Architectural note:** At N1, the SRS is a *retention tool* more than an *acquisition tool*. New items are overwhelmingly encountered through ER and authentic media, captured via the platform's add-to-deck function, and then maintained via SRS. The acquisition-to-retention flow inverts compared to N5/N4, where SRS is the primary acquisition engine.

### Can-Do Exit Criteria (CEFR-J C1+ alignment)

1. Read academic Japanese (philosophy, literary criticism, technical papers in one's professional field) with full comprehension.
2. Produce professional-register written Japanese for employment contexts (formal email, report, presentation slides).
3. Sustain a conversation on abstract topics (politics, ethics, cultural analysis) with register-appropriate hedging, stance-taking, and argument construction.
4. Comprehend regional dialect and rapid casual register in media (films, variety shows) at near-native level.
5. Self-direct further language learning without platform scaffolding — the learner has internalized metacognitive strategies and can set their own goals.

### FSRS Milestone Trigger

- Traditional FSRS milestones become less meaningful at N1 because card-based acquisition is a minority of learning activity.
- **Primary signal:** Self-reported confidence on N1 exam preparation materials (JLPT past papers at ≥70% — confirmed on external practice tests).
- **Secondary signal:** Sustained authentic-media consumption (tracked via platform's reading-time / listening-time integration with self-reporting).

---

## ARCHITECTURAL CONSIDERATIONS

### Transitions Are Not Discrete Events

The ladder presents five discrete rungs but the underlying learning trajectory is continuous. The FSRS milestone triggers exist to create **platform-visible events** — unlock ceremonies, new-content reveals, sub-deck introductions — that serve the gamification/motivation mechanisms (§10 GF cluster) and the SDT autonomy-competence need satisfaction (§8 MV cluster). They are not scientific claims about discrete cognitive state transitions.

### Individual Differences Modulate Ladder Pacing

The §13 ID cluster evidence base documents substantial individual variation in:
- Working memory capacity and phonological short-term memory (ID-05, ID-18) — affects Stage-transition speed in PT
- Foreign Language Classroom Anxiety (ID-14 FLCA cluster) — affects production card performance disproportionately
- Learner autonomy and self-regulation capacity (AL-01 through AL-22) — affects streak maintenance

The ladder's trigger thresholds are **population medians, not individual prescriptions.** A learner with weak phonological working memory may need 1,000 cards at Stability ≥ 90 days (not 500) to exit N5 reliably; a learner with strong FLCA may take significantly longer on production-mode cards. The platform's adaptive scheduling (FSRS Indonesian prior, §1.11) handles individual calibration automatically for card scheduling; the human-facing ladder does not micro-adjust thresholds per user.

### Indonesian-Specific Calibration Notes

- **Kanji burden skew (Matsunaga 1999, §1.11 flag §8-2):** Indonesian L1 learners without prior kanji exposure require ~2.3× more exposures per kanji item than L1-Chinese-background learners. FSRS difficulty priors for kanji cards must reflect this; N5/N4 card count targets assume this adjusted prior. Without it, kanji items will consume disproportionate review time and disrupt the Stability ≥ 90 days trigger artificially.
- **Phonology advantage (§11):** Indonesian phonemic inventory overlaps substantially with Japanese for consonant-vowel syllable structure. Pitch accent is L2-novel (§11 pitch accent cluster). Listening cards at N5/N4 benefit from this overlap; pitch perception requires dedicated explicit instruction by N3.
- **Malu and production cards (§8 Flag-3):** Production-mode card share is kept at 15% at N5 (vs 20–25% that a non-malu population might tolerate) to reduce anxiety-driven abandonment. At N4+, the platform's SDT-designed autonomy mechanisms (user-initiated production session entry, private practice mode) mitigate malu at the feature level rather than through the global card-type distribution.

---

## FSRS STABILITY ANCHOR TABLE

For reference, the FSRS Stability values used as ladder triggers map to the following operational meanings (§1.11 parameter semantics):

| Stability (days) | Review interval at R=0.9 | Operational meaning |
|---|---|---|
| 30 | ~27 days | "Young mature" — retention established but not consolidated |
| 90 | ~81 days | "Mature" — consolidated retention; passes 3-month forget-resistance |
| 180 | ~162 days | "Deep mature" — 6-month retention; durable across semester breaks |
| 365 | ~329 days | "Annual mature" — durable across seasonal-contextual shifts |

Stability triggers in the ladder reflect level-appropriate retention demands, not arbitrary numbers:
- N5 → 90 days: learners at this level often study in bursts; 3-month retention verifies the item survives a typical life-interruption.
- N3 → 365 days: this is the level where the platform must demonstrate that items learned early remain accessible through later-level study; annual retention validates the spaced repetition architecture end-to-end.

---

## DELIVERABLE STATUS

**File:** `corpus/sections/synthesis/LEVEL-LADDER-SPEC-v1.md`
**Version:** 1.0 — first synthesis draft
**Canonical?** Yes — this is the authoritative ladder spec for the Nugget Nihongo methodology page.
**Revision triggers:** If BC cluster boundary conditions are revised (Pass 17+) or if FSRS Indonesian prior calibration data arrives from platform telemetry, this document's trigger thresholds should be reviewed.

*Crispy — Pass 16 — 17 April 2026*
