# NUGGET NIHONGO — DESIGN DECISION MASTER
## Part 1: §1, §5.5, §5.6, §8, §9
**Agent:** 32 (Sonnet 4.6)
**Date:** 3 April 2026
**Corpus version:** v10 (~879 citations)
**Source sections:** §1 + §1.12 (BC cluster), §5.5 v4 + §5.6, §8 v3, §9 v1 + §9.10
**Deliverable scope:** Feature taxonomy categories 1–10
**Agent 33 covers:** §10, §11, §12, §13, §CA, §2, §3, §14, §15, §4, §16, §17
**Agent 2 merges:** Part 1 + Part 2 → DESIGN-DECISION-MASTER-v1.md

---

## PREFATORY NOTE

This document extracts every design decision, design implication, and design recommendation from the four source sections above, organized by Crispy's ten-category feature taxonomy. Decisions are corpus-grounded: every item maps to at least one citation ID. Where §1 and §8, or §9.2 and §9.4, generate tension, conflicts are flagged explicitly.

All decision IDs follow the format DDM-P1-NNN for cross-reference by Agent 33 and Agent 2.

---

## 1. CARD FRONT DESIGN

---

## FEATURE: Card Front — Retrieval Prompt Format
### Decision: The card front must prompt active retrieval, not passive recognition. Default mode for morphosyntactic target features (particles, verbal aspect, passive voice, keigo) should be type-answer, not flip-to-reveal.
- **Evidence:** TR-03 (Adesope et al. 2017, g = 0.78 for short-answer vs. g = 0.43 for multiple choice); EA-18 (Lyster 2004 — prompts that elicit self-repair outperform recasts for morphosyntactic targets)
- **Section:** §1.3, §5.6.5
- **Priority:** HIGH
- **Notes:** Type-answer is the SRS structural equivalent of Lyster's (2004) "prompts" — obligating production before seeing the answer. For recognition-heavy vocabulary (loanwords, concrete nouns), flip-to-reveal is acceptable. Tier the retrieval format by feature type: morphosyntactic features → type-answer default; lexical items → flip-to-reveal.

---

## FEATURE: Card Front — Isolated Elements First
### Decision: The card front must display the minimum elements needed to prompt retrieval — target expression only (kanji + reading for N5–N4, kanji only for N3+). Do not display meaning, example sentence, or cultural notes on the front.
- **Evidence:** CL-08 (Pollock et al. 2002 — isolated elements first for high-interactivity content); CT-12 (Mayer & Chandler 2001 — segmenting principle)
- **Section:** §9.4, §9.2
- **Priority:** HIGH
- **Notes:** The front/back card flip mechanic is not an Anki design convention — it is a CLT-grounded implementation of the "isolated elements first" principle. Showing all fields simultaneously on the front imposes extraneous cognitive load (§9.4, CL-02). The progressive reveal to the back card is evidence-based.

---

## FEATURE: Card Front — Furigana Policy (Level-Differentiated)
### Decision: Furigana must appear on card fronts for N5–N4 learners; furigana should be hidden (available on tap) for N3 learners; furigana must be hidden by default for N2–N1 learners.
- **Evidence:** CL-07 (Kalyuga 2007 — expertise reversal effect: scaffolding becomes extraneous load at higher proficiency); OD-13 (Chikamatsu 2006 — romanization dependency hinders long-term kanji acquisition)
- **Section:** §9.4, §9.10.3
- **Priority:** HIGH
- **Notes:** OD-13 provides the specific empirical justification: showing romaji/furigana at advanced levels measurably slows kanji recognition development. Furigana on demand (tap-to-reveal) is the appropriate N3 compromise. For N2–N1, furigana-free fronts train the lexical route directly (§9.10.2, OD-06).

---

## FEATURE: Card Front — Signaling (Target Word Highlighting)
### Decision: The target word must be typographically distinguished (bold or color highlight) when it appears in a sentence-format card front.
- **Evidence:** CT-17 (De Koning et al. 2009 — signaling/cueing effect, d ≈ 0.46); Mayer (2009) Principle 5
- **Section:** §9.2
- **Priority:** MEDIUM
- **Notes:** Where the card front shows a sentence with the target word embedded (useful for context-based retrieval prompts), the target must be visually salient. Without signaling, learners may scan the sentence without focusing retrieval on the target form.

---

## FEATURE: Card Front — Kanji Presented in Compound or Sentence Context
### Decision: Kanji vocabulary cards should display the target kanji in compound form or short sentence context on the front, not as isolated single-character targets for N3+ learners.
- **Evidence:** OD-06 (Coltheart et al. 2001 — DRC model: kanji requires lexical route, which depends on whole-word pattern recognition); OD-10 (Shibahara et al. 2003 — kanji processing is semantic-first, not phonological-first)
- **Section:** §9.10.2, §9.10.3
- **Priority:** MEDIUM
- **Notes:** For N5–N4, isolated kanji training for initial recognition is pedagogically appropriate (pre-training principle, §9.2 CT-13). From N3 onward, compounds and sentence contexts are required to train the lexical route that fluent reading depends on. This is a sequencing recommendation, not a blanket rule.

---

## 2. CARD BACK DESIGN

---

## FEATURE: Card Back — Metalinguistic Feedback, Not Recast
### Decision: The card back must function as metalinguistic feedback — explicitly marking what the error is and why it differs from the expected response — not merely displaying the correct answer.
- **Evidence:** EA-14 (Lyster & Ranta 1997 — recasts have highest frequency but lowest learner uptake; metalinguistic feedback has highest uptake); EA-16 (Li 2010 meta-analysis — explicit corrective feedback outperforms implicit CF for complex, rule-governed features, d = 0.55–0.75)
- **Section:** §5.6.5
- **Priority:** HIGH
- **Notes:** A back card that only shows "correct answer: に" without explaining why に and not で is the structural equivalent of a recast — the lowest-uptake feedback type available. For all cards tagged with an L2d contrastive note, the back card must include: (a) correct form prominently, (b) explicit "common error" callout where applicable, (c) the L2d note. Noticing Hypothesis (Schmidt, §12) is the cognitive mechanism — conscious noticing of the gap between learner output and correct form is required for acquisition.

---

## FEATURE: Card Back — Highlighting the Gap, Not Just the Answer
### Decision: For error-prone items (all cards with L2d tags, all fossilization-prone grammatical features), the back card must include a "common error note" adjacent to the correct form.
- **Evidence:** EA-14 (Lyster & Ranta 1997); EA-10 (Han 2004 — fossilization is feature-specific; fossilization-prone features require unconditional explicit back-card treatment)
- **Section:** §5.6.4, §5.6.5
- **Priority:** HIGH
- **Notes:** Features with highest fossilization risk in Indonesian learners (is/が in discourse, 迷惑の受身, resultant-state ている, keigo morphology) must have metalinguistic "error note" on back card without exception. This is not optional scaffolding — it is the primary mechanism against fossilization that I-JAS data (§5.5.29) confirms is prevalent at N3+.

---

## FEATURE: Card Back — L2d Contrastive Notes (Full Tag Inventory)
### Decision: All 20 L2d interference tags (§5.5.31) must be implemented as back-card contrastive notes triggered by tag presence. High-confidence tags (Crispy Core + Agent 11 v1) are mandatory; Low-confidence tags (Agent 11 v2) are recommended pending I-JAS corpus validation.
- **Evidence:** §5.5.31 (Tag inventory — 20 tags, confidence ratings: High/Medium/Low); §5.5.29 (I-JAS corpus validation for ni/de, wa/ga, passive, te-iru, relative clauses)
- **Section:** §5.5, §5.6.1
- **Priority:** HIGH
- **Notes:** I-JAS data validates the following as highest-priority tags (empirically confirmed error frequency): `contrastive-ni-de`, `contrastive-wa-ga`, `contrastive-passive`, `contrastive-relative-clause`. Tags with Low confidence (`contrastive-compound-verb`, `contrastive-discourse-cohesion`) should be marked `confidence: medium` pending corpus validation. See §5.5.30 for research gap documentation. **Conflict to flag:** §5.6.3 (Richards 1971 typology) establishes that L2d notes address *interlingual* (transfer) errors only; intralingual/developmental errors (e.g., overgeneralization of ている) require a different back-card treatment (range of example sentences, not contrastive note).

---

## FEATURE: Card Back — ている Requires Dual-Error Treatment
### Decision: Back cards for ている in resultant-state contexts must address BOTH the developmental error (progressive ≠ resultant state) AND the interlingual transfer error (Indonesian *sudah* maps to perfect aspect, not resultant state).
- **Evidence:** EA-21 (Shirai & Kurono 1998 — progressive meaning acquired earlier than resultant state — universal L2 Japanese developmental sequence); §5.5.29 (I-JAS: resultant-state ている under-use persists through N3 in Indonesian learners)
- **Section:** §5.6.6, §5.6.3
- **Priority:** HIGH
- **Notes:** This is a rare dual-origin error (Richards typology: developmental + interlingual). The back card must: (a) show the resultant-state usage with clear visual/contextual marker, (b) include a note on the *sudah* → ている mapping failure specifically for Indonesian learners. Generic L2 treatment is insufficient.

---

## FEATURE: Card Back — Example Sentences (Required)
### Decision: All cards must include at least one example sentence in natural Japanese (Contoh JP field). Example sentences must use conversational/colloquial register, not literary or formal Japanese.
- **Evidence:** Tulving & Thomson 1973 [in §1.3] — encoding specificity: retrieval is most successful when cues at retrieval match cues at encoding. Example sentences create encoding context that becomes part of the retrieval cue; CT-14 (Moreno & Mayer 2000 — personalization principle, d ≈ 0.79: conversational style > formal style)
- **Section:** §1.12.1, §9.2
- **Priority:** HIGH
- **Notes:** The decontextualization critique (§1.12.1, BC-01 — Laufer 2003) is the primary critique of SRS. Example sentences partially address this by reconstructing collocational context. Conversational register (CT-14 personalization principle) is the evidence-based default — not a stylistic preference.

---

## FEATURE: Card Back — Progressive Disclosure for Aptitude Differences
### Decision: Advanced back-card detail (full metalinguistic grammar explanation, contrastive grammar note) should be accessible behind a tap/expand interaction, not displayed in full by default for all learners.
- **Evidence:** EA-15 (Sheen 2007 — language aptitude moderates corrective feedback effectiveness); CL-07 (Kalyuga 2007 — expertise reversal: supports adaptive content depth)
- **Section:** §5.6.5, §9.4
- **Priority:** MEDIUM
- **Notes:** Default: basic back card (correct answer + L2d note headline). Expandable: full metalinguistic explanation. This serves both rapid explicit-learner and slower implicit-learner. Do not penalize either with excessive or insufficient information.

---

## FEATURE: Card Back — Keterangan Tambahan as Self-Reference Encoding Field
### Decision: The Keterangan Tambahan field should include prompts for self-referential encoding where applicable ("Pernahkah kamu..." / "Bayangkan kamu..."), to leverage the self-reference effect for memory encoding.
- **Evidence:** DC-01 Pruss et al. (2025) — self-reference promotes L2 vocabulary learning; Liu et al. (2024) — meta-analysis g = 0.40, larger for recall tests (g = 0.52); Cunningham et al. (2008) [in §1.10] — ownership/self-generation effect
- **Section:** §1.10
- **Priority:** MEDIUM
- **Notes:** Self-referential encoding produces better recall than semantic encoding for the same words (Rogers et al. 1977). The Keterangan Tambahan field is the natural location for self-reference prompts. This is not decoration — it is elaborative encoding at a level deeper than standard semantic processing.

---

## FEATURE: Card Back — Self-Explanation Prompts on Grammar Cards
### Decision: Grammar-focused cards must include a brief "why" prompt adjacent to the example sentence ("Mengapa partikel に di sini, bukan で?") to trigger self-explanation processing.
- **Evidence:** GL-05 (Chi et al. 1994 — self-explanation effect, d = 0.55–1.00, >2000 citations); GL-07 (Wylie & Chi 2014 — self-explanation in multimedia context)
- **Section:** §9.5
- **Priority:** HIGH
- **Notes:** Back cards that include a metalinguistic self-explanation prompt leverage one of the highest-effect generative strategies available (d = 0.55–1.00). The prompt should be concise (one sentence) and placed directly below the example sentence. This implements Generative Learning Strategy 6 (self-explaining) from Fiorella & Mayer (2015, GL-03).

---

## FEATURE: Card Back — "Again" Button Framing
### Decision: The "Again" button and failure feedback UI copy must be framed as scheduling/diagnostic information, not as failure evaluation. Recommended copy direction: "Kartu ini akan segera kembali — sistem sedang bekerja."
- **Evidence:** EA-01 (Corder 1967 — errors are evidence of learner hypothesis-testing, not failure); Kornell et al. (2009) [§1.5] — unsuccessful retrieval attempts enhance subsequent learning; BC-05 (Pekrun 2006 — control-value theory: failure attributed to process, not ability, produces less negative affect)
- **Section:** §1.5, §5.6.1, §1.12.3
- **Priority:** HIGH
- **Notes:** The "Again" press framing is critical for Indonesian learners with malu-sensitivity (see §8, UX/Accessibility section). A learner who consistently presses "Again" on に/で cards is not failing — they are generating diagnostic data about a predictable L1 interference point. Micro-copy for error events must reflect this.

---

## FEATURE: Card Back — Metalinguistic Knowledge ≠ Procedural Use (Communicate to Users)
### Decision: Platform messaging must explicitly communicate that card mastery is a necessary but not sufficient condition for production accuracy — learners who can correctly answer a particle card may still make errors in free output.
- **Evidence:** EA-13 (Han & Selinker 1999 — error resistance: errors persist despite explicit metalinguistic knowledge); BC-01 (Laufer 2003 — decontextualization critique: card mastery does not produce collocational deployment)
- **Section:** §5.6.4, §1.12.4
- **Priority:** MEDIUM
- **Notes:** This is a methodology page claim, not a per-card design decision. Positioning the platform honestly (SRS builds declarative knowledge; communicative practice builds proceduralization) is the only credible framing for sophisticated learners. See §1.12.5 for the full positioning argument.

---

## 3. AUDIO FEATURES

---

## FEATURE: Audio — Native Speaker Only
### Decision: All vocabulary card audio must use native speaker recordings. Synthesized TTS audio, even high-quality (e.g., Google WaveNet, VOICEVOX), must not be used as the primary audio source.
- **Evidence:** AV-08 (Field 2008 — L2 listening research: phonologically authentic audio essential for training phonological representations that transfer to real-world listening); Kang et al. 2014 [AV-09] — suprasegmental accuracy of native speaker audio predicts L2 phonological representation quality
- **Section:** §9.7
- **Priority:** HIGH
- **Notes:** Synthesized audio builds phonological models that do not transfer to real-world listening. This is a learning science requirement, not a UX preference. Resource implication: native speaker audio production infrastructure must be planned from Day 1. TTS may be used as a temporary fallback during early content production phases with explicit user disclosure.

---

## FEATURE: Audio — Simultaneous Audio + Visual Display (Temporal Contiguity)
### Decision: Audio pronunciation must auto-play simultaneously with kanji/image visual display on card reveal, not sequentially.
- **Evidence:** CT-07 (Mayer & Anderson 1992 — temporal contiguity effect, d ≈ 1.30, among the largest and most replicable in CTML); CT-16 (Ginns 2006 meta-analysis — temporal contiguity mean d = 1.14, k = 13 effects)
- **Section:** §9.2
- **Priority:** HIGH
- **Notes:** Sequential presentation (show kanji, then play audio) imposes temporal split-attention. Simultaneous presentation (audio plays as kanji appears) leverages both visual and auditory channels efficiently. This is one of the largest effect sizes in the entire CTML literature.

---

## FEATURE: Audio — No Background Music During Review Sessions
### Decision: Background music must not be included in SRS review sessions. No ambient audio of any kind during card review.
- **Evidence:** CT-09 (Mayer et al. 1996 — coherence principle, d ≈ 0.90: removing extraneous material improves learning); Mayer (2009) Principle 4
- **Section:** §9.2
- **Priority:** HIGH
- **Notes:** Background music constitutes extraneous auditory load regardless of whether learners report enjoying it. The coherence effect is robust and consistent. This applies to review sessions only; music during onboarding animations or congratulatory screens is acceptable.

---

## FEATURE: Audio — Redundancy Principle Violation Risk (Level-Differentiated)
### Decision: For N3+ learners, do NOT present audio pronunciation simultaneously with its identical text-form (furigana reading displayed while audio plays the same reading). For N5–N4 learners, simultaneous audio + text is acceptable and appropriate.
- **Evidence:** CT-10 (Mayer et al. 2001 — redundancy principle, d ≈ 0.72: presenting identical content in two channels simultaneously is harmful for competent learners); AV-04 (Sydorenko 2010 — L2 captioning exception: redundancy effect is attenuated when learner cannot decode audio without textual support — applicable at N5–N4)
- **Section:** §9.2, §9.7
- **Priority:** HIGH
- **Notes:** **This is a genuine conflict between two CTML principles.** The redundancy principle (harm from audio + identical text) conflicts with the L2 captioning exception (beginners need text scaffolding to decode audio). Resolution: N5–N4 → text + audio simultaneously acceptable (captioning exception applies); N3 → audio first, reveal text on tap; N2–N1 → audio-only by default, text available on demand. This requires level-aware card template implementation.

---

## FEATURE: Audio — Mora-by-Mora Training for Kana Cards
### Decision: Kana acquisition cards must include audio playback at mora level to reinforce the sublexical (phonological) reading route for hiragana and katakana.
- **Evidence:** OD-06 (Coltheart et al. 2001 — DRC model: kana can and should be processed via sublexical route — mora-by-mora phonological decoding); ODH framework (OD-01–04) — kana is a phonographic script where sublexical decoding is the appropriate route
- **Section:** §9.10.2, §9.10.1
- **Priority:** HIGH
- **Notes:** Unlike kanji (which requires lexical/semantic route), kana acquisition benefits from explicit mora-level phonological training. Audio that plays each mora sequentially before playing the full syllable is the implementation of sublexical route training. This is distinct from vocabulary card audio (which should play the full word naturally).

---

## 4. IMAGE FEATURES

---

## FEATURE: Images — Mandatory for All Concrete Vocabulary
### Decision: All concrete vocabulary cards (nouns with clear perceptual referents: animals, food, objects, places, vehicles, body parts) must include a contextual image.
- **Evidence:** DC-02 (Paivio 1986 — dual coding advantage: information encoded in both verbal and imagistic systems produces more durable memory traces); CT-01/CT-02 (Mayer 1991/2009 — multimedia principle, d ≈ 1.50, the largest effect in the CTML literature: words + pictures > words alone)
- **Section:** §9.1, §9.2
- **Priority:** HIGH
- **Notes:** The multimedia principle effect (d ≈ 1.50) is the largest single effect size in the §9 corpus. This is not a content enrichment choice — it is the evidence-based minimum requirement for concrete vocabulary cards. Juicy agent image brief must treat image inclusion as mandatory, not optional.

---

## FEATURE: Images — Prohibited for Abstract Vocabulary
### Decision: Abstract vocabulary (function words, conjunctions, modal particles, discourse markers: のに、から vs ので、ながら、など) must NOT include decorative or illustrative images. Cultural context notes and example sentences replace images for these items.
- **Evidence:** DC-05 (Sadoski et al. 1993 — imageability × retention: abstract words have low imageability and do not benefit from image pairing); IM-04 (Mayer & Gallini 1990 — illustrations most beneficial for complex, high-imageability content; simple, low-imageability content gains nothing from images and may be distracted by them)
- **Section:** §9.1, §9.6
- **Priority:** HIGH
- **Notes:** Forcing images onto abstract vocabulary creates decorative visuals that impose extraneous cognitive load (coherence principle violation). The design decision is binary: high-imageability concrete item → image required; low-imageability abstract item → image prohibited. Borderline items (emotion adjectives: 悲しい, 嬉しい) → use situational photograph that depicts the emotion contextually rather than abstractly.

---

## FEATURE: Images — Reduced/No Image for Familiar Loanwords
### Decision: Katakana loanwords highly familiar to Indonesian learners from English overlap (テレビ, パン, コーヒー, ホテル, インターネット) do not require elaborate contextual images. Simple visual treatment or no image is appropriate.
- **Evidence:** IM-04 (Mayer & Gallini 1990 — for simple, well-known content, illustrations add no benefit and can be distracting); §5.5.25 (Daulton 2008 — Indonesian learners have pre-existing concept knowledge for English-origin gairaigo)
- **Section:** §9.6, §5.5.25
- **Priority:** MEDIUM
- **Notes:** For loanwords where the concept is already known (learner knows what a "hotel" is), the L2 vocabulary task is form-sound mapping, not concept acquisition. Image encoding adds no dual coding advantage when the concept representation is already fully established. This frees Juicy from image curation burden for this card subset.

---

## FEATURE: Images — Spatial Contiguity Mandatory
### Decision: Images must be placed spatially adjacent to the target Japanese word on the card face. Text and image must not be in separate visual zones with whitespace between them.
- **Evidence:** CT-16 (Ginns 2006 meta-analysis — spatial contiguity mean d = 0.79, k = 36 effects); IM-05 (Chandler & Sweller 1992 — split-attention effect: spatially separated information sources increase cognitive load)
- **Section:** §9.2, §9.6
- **Priority:** HIGH
- **Notes:** This is a hard layout constraint for Golden (UI agent), not a soft design preference. Text-image separation creates a split-attention effect that measurably degrades encoding. Japanese word + image must be co-located within the same visual zone, with furigana immediately adjacent to the kanji it annotates (not in a separate field below).

---

## FEATURE: Images — Prototypicality and Cultural Authenticity Standard
### Decision: Card images must depict prototypical, authentic Japanese cultural contexts — not cartoons, Western equivalents, or clip art. For cultural vocabulary (茶道, 銭湯, 居酒屋, 定食), images must show the Japanese referent specifically.
- **Evidence:** IM-06 (Rosch 1975 — prototype theory: prototypical exemplars anchor category representation most effectively); IM-03 (Peeck 1993 — effective instructional pictures must clearly differentiate target concept from semantically similar alternatives)
- **Section:** §9.6
- **Priority:** HIGH
- **Notes:** A card for 定食 must show a Japanese teishoku tray, not a generic "set meal." This is especially critical for cultural vocabulary where the visual prototype IS the cultural content. Cartoon images reduce distinctiveness (Rosch criterion) and fail the cultural congruence requirement. Photo quality: high resolution, authentic Japanese setting preferred.

---

## FEATURE: Images — Image-Cued Recall Cards as Second Card Type
### Decision: For concrete vocabulary above N4, consider adding an image-cued recall card (front: image only → back: Japanese word), as a complement to the standard L1→L2 direction card.
- **Evidence:** DC-03 (Paivio 2010 — L2 mental lexicon: image-word pairing accelerates transition to concept-mediated processing by training a separate retrieval route); DC-04 (Sadoski & Paivio 2013)
- **Section:** §9.1
- **Priority:** MEDIUM
- **Notes:** The standard L1→L2 card trains verbal retrieval. The image→L2 card trains a distinct nonverbal retrieval route. These are not duplicates — they neurologically exercise different memory pathways. The image-cued direction is particularly valuable for building the "direct L2 concept access" that distinguishes advanced from beginner lexical processing. Implementation note: may be an opt-in card type to avoid deck size explosion.

---

## 5. SCHEDULING ALGORITHM

---

## FEATURE: Scheduling — FSRS as Default Scheduler
### Decision: FSRS (Free Spaced Repetition Scheduler) must be the default and only scheduling algorithm. SM-2 must not be offered as an equivalent alternative.
- **Evidence:** SR-01 (Ye, Su & Cao 2022 — SIGKDD; DSR model trained on 220M memory behavior logs); SR-02 (Su et al. 2023 — IEEE TKDE; FSRS achieves 12.6% lower RMSE in next-review-time prediction vs. SM-2); SR-03 (Settles & Meeder 2016 — Duolingo HLR model, confirmed outperformed by FSRS in benchmark)
- **Section:** §1.11
- **Priority:** HIGH
- **Notes:** SM-2 was calibrated on a single user (Wozniak himself, for Polish-English vocabulary) — sample of one, never validated against a diverse learner population. FSRS was trained on 220M+ events. FSRS also explicitly implements the New Theory of Disuse (Bjork & Bjork 1992) which SM-2 does not model. Algorithm transparency: explain FSRS in plain Indonesian on the methodology page (high PDI culture — §8 finding). Do NOT refer to SM-2 as a peer comparison; refer to it as the predecessor FSRS was designed to replace.

---

## FEATURE: Scheduling — Algorithm-Determined Scheduling Over User Self-Assessment
### Decision: FSRS scheduling must override learner self-assessed readiness. The algorithm's scheduled review date takes precedence over the learner's sense of whether a card needs review.
- **Evidence:** Kornell & Bjork 2008 [§1.3/§1.11] — "confidence of knowing" is not a reliable scheduling signal; self-terminating study (stopping when feeling confident) produces dramatically worse delayed retention; Kornell & Bjork 2007 [§1.3] — self-regulated study systematically over-studies known items and under-studies unknown items
- **Section:** §1.11, §1.3
- **Priority:** HIGH
- **Notes:** This behavioral economics argument is the user communication challenge for Nugget Nihongo. Users will *feel* like the algorithm is reviewing cards they already know. The methodology page must explain this explicitly: "The algorithm is reviewing this card again because the research shows this is exactly when it needs to be reviewed — even if it feels unnecessary." Framing this positively (you're mastering, not repeating) is critical.

---

## FEATURE: Scheduling — FSRS Retention Target (90%)
### Decision: Default FSRS retention target should be 90% recall probability at scheduled review time. This is the Anki FSRS default and aligns with the evidence base.
- **Evidence:** SR-01 (Ye et al. 2022 — FSRS targets configurable retention probability; 90% is the empirically validated default); Cepeda et al. 2006 [§1.1] — optimal spacing gap ≈ 10–20% of the desired retention interval, consistent with 90% retention target
- **Section:** §1.11, §1.1
- **Priority:** MEDIUM
- **Notes:** The 90% default means approximately 1-in-10 reviews will result in "Again" even on well-learned cards. Communicate this to users: "The occasional failure on cards you think you know is not a flaw — it is the system maintaining the difficulty threshold that makes SRS work."

---

## FEATURE: Scheduling — Graduated Interleaving (Learning Steps Phase)
### Decision: New cards must enter a blocked "learning steps" phase (reviewed multiple times in a single session) before transitioning to the spaced review queue. Do not interleave new items with mature reviews from the first encounter.
- **Evidence:** Patson & George 2020 [§1.4 discussion] — beginners benefit from some blocking before interleaving; FSRS learning step phase implements this naturally; Brunmair & Richter 2019 [§1.4] — interleaving moderator: similarity matters (high-similarity d = 0.67 vs. low-similarity d = 0.18)
- **Section:** §1.4
- **Priority:** HIGH
- **Notes:** This is FSRS's existing "learning steps" behavior — the section confirms it is evidence-based, not just an algorithm quirk. New cards need initial blocked review until basic form-meaning is established, then interleaved with related items. **The FSRS learning step phase is a direct implementation of the "graduated interleaving" recommendation from the literature.**

---

## FEATURE: Scheduling — Interleave Within Semantic/Structural Categories, Not Randomly
### Decision: When configuring deck tag-based interleaving, cards should be interleaved within semantic or structural categories (e.g., all passive forms together, all location particles together), not randomly across the entire deck.
- **Evidence:** Brunmair & Richter 2019 [§1.4, SR-X] — high-similarity interleaving (d = 0.67) vs. low-similarity interleaving (d = 0.18); Kornell & Bjork 2008 — discriminative contrast hypothesis: interleaving benefits category discrimination, which requires similar items to be distinguished
- **Section:** §1.4
- **Priority:** MEDIUM
- **Notes:** Random interleaving across completely different domains (food vocabulary + particle cards + keigo) produces substantially smaller learning benefits than interleaving within structural clusters. This has implications for how Nugget Nihongo's deck is organized: category tags (simbol kategori) should be used to create structured interleaving, not just for visual organization.

---

## FEATURE: Scheduling — New Card Daily Cap
### Decision: New cards per day must be capped at 10–15 maximum, with a hard default cap for new users at 10 new cards/day.
- **Evidence:** CL-02 (Sweller 1994 — CLT: working memory has a fixed capacity ceiling); OD-21 (Osaka & Osaka 1992 — Japanese reading span tasks more demanding than English equivalent, confirming higher WM load for Japanese materials); §13.3 [referenced, to be confirmed by Agent 33 — individual differences WM]
- **Section:** §9.4, §9.10.6
- **Priority:** HIGH
- **Notes:** Multi-script Japanese (kana + kanji in the same session) imposes dual WM demands — phonological loop for kana (sublexical route) + semantic/visual memory for kanji (lexical route). The WM switching cost compounds the standard new-card load. 10 cards/day for beginners with mixed script exposure. Users may increase this manually, but the system should warn against exceeding 20 new cards/day.

---

## FEATURE: Scheduling — Response Latency as Potential Future FSRS Signal
### Decision: Platform should collect response latency data per card review from launch, even if not yet used in FSRS scheduling, for future implementation of dual-mastery thresholds (accuracy + speed).
- **Evidence:** OD-14 (Denckla & Rudel 1976 — Rapid Automatized Naming: naming speed predicts reading fluency independently of accuracy); OD-16 (Georgiou et al. 2020 — RAN predictive power is stronger in *deep* orthographies — Japanese is an extreme case); OD-15 (Wolf & Bowers 1999 — accuracy and speed are independent predictors of reading competence)
- **Section:** §9.10.4
- **Priority:** MEDIUM
- **Notes:** Cards rated "Good" with 5-second latency are functionally different from "Good" with 1-second latency. The former reflects deliberate retrieval; the latter reflects automatized recognition — what reading fluency requires. This is a feature proposal for future roadmap, not a launch requirement. However, collecting the latency data from Day 1 is a prerequisite for any future implementation. See §8.11.2 (Study 2) for the research agenda this enables.

---

## 6. ONBOARDING FLOW

---

## FEATURE: Onboarding — Hiragana/Katakana Before Vocabulary (Pre-Training)
### Decision: Learners must complete a dedicated hiragana and katakana acquisition track before accessing vocabulary cards. This is a mandatory prerequisite, not an optional module.
- **Evidence:** CT-13 (Mayer et al. 2002 — pre-training principle, d ≈ 0.75: learning component names/characteristics first improves subsequent multimedia learning); OD-13 (Chikamatsu 2006 — hiragana recognition speed > katakana for beginners; sequential introduction is empirically supported)
- **Section:** §9.2, §9.10.5
- **Priority:** HIGH
- **Notes:** Pre-training (kana mastery) reduces intrinsic load for subsequent vocabulary cards — learners who cannot read kana must simultaneously decode the script AND process the new vocabulary, creating avoidable element interactivity (CLT §9.4). Sequence: hiragana first (higher frequency in reading texts), then katakana (introduced through familiar loanwords — §5.5.25 gairaigo advantage), then basic vocabulary.

---

## FEATURE: Onboarding — FSRS Explanation in Plain Indonesian
### Decision: The onboarding flow must include a clear, jargon-free Indonesian-language explanation of how FSRS scheduling works and why it sometimes reviews cards that "feel" already known.
- **Evidence:** Kornell 2009 [§1.1] — metacognitive illusion: users will *feel* that massed review is more effective than spaced review; Bjork et al. 2013 [§1.5] — students' beliefs about effective study strategies systematically diverge from evidence; §8 [Hofstede PDI=78] — high power-distance culture: "the algorithm says review now" is persuasive, not opaque, in Indonesian cultural context
- **Section:** §1.5, §8.11
- **Priority:** HIGH
- **Notes:** The Indonesian cultural context (PDI = 78 — high deference to authority) actually makes FSRS algorithm transparency *more* persuasive, not less. "Algoritma ini dilatih dari 220 juta data belajar" is a compelling claim in a high-PDI culture. Pair this with an honest explanation of the learning/performance dissociation (Soderstrom & Bjork 2015 [§1.5]: Nugget Nihongo will sometimes feel harder than it needs to be, and that is the mechanism working correctly).

---

## FEATURE: Onboarding — SRS Scope Honest Positioning
### Decision: Onboarding must explicitly position Nugget Nihongo as the vocabulary and form-recognition engine at the core of a balanced Japanese learning program — not a complete language learning solution.
- **Evidence:** §1.12.5 (BC-02 Webb & Nation 2017; BC-06 Laufer & Paribakht 1998 — receptive-productive gap; §1.12.4 hard limits of SRS); Nation's Four Strands [§1.7] — SRS is primarily Strand 3 (language-focused learning)
- **Section:** §1.12.5
- **Priority:** HIGH
- **Notes:** Recommended methodology page framing (§1.12.5): "Nugget Nihongo delivers the highest available ROI for vocabulary acquisition at beginner and intermediate levels (N5–N3), provides maintenance and extension value at advanced levels (N2–N1), and is most effective when complemented by extensive reading, output practice, and listening exposure as learners advance." Overclaiming produces short-term downloads and long-term churn. Honest positioning produces long-term commitment.

---

## FEATURE: Onboarding — Ideal L2 Self Visualization with Local Indonesian Scenarios
### Decision: Onboarding goal-visualization prompts must use locally accessible Indonesian scenarios — not abstract "imagine yourself in Japan" prompts. Recommended scenarios: watching anime without subtitles (widely accessible in Indonesia), reading a menu at a Japanese restaurant in Jakarta/Surabaya, understanding J-Pop lyrics.
- **Evidence:** Lamb 2012 [§8.10.4] — urban/rural Ideal L2 Self difference in Indonesia: rural learners have lower vividness specifically due to fewer locally accessible L2 role models; the deficit is an imagery-access gap, not a stable trait
- **Section:** §8.10.4
- **Priority:** MEDIUM
- **Notes:** "Imagine yourself in Japan" is a high-vividness prompt for urban Jakarta learners with Japan tourism experience but a low-vividness or even alienating prompt for learners in rural Sumatra or Sulawesi who have never encountered Japan directly. Local scenario anchoring (anime is accessible everywhere in Indonesia via streaming; Japanese restaurants exist in most tier-2 cities) makes the Ideal L2 Self equally vivid across demographics.

---

## FEATURE: Onboarding — JLPT Milestone Framing (Long-Term Orientation)
### Decision: Onboarding and progress communication must use JLPT level milestones as the primary progress metric, with realistic timeline expectations (e.g., "N5 dalam 6 bulan dengan 10 kartu/hari").
- **Evidence:** Hofstede et al. 2010 [§8.11.3] — Indonesia LTO = 62 (moderately long-term oriented): JLPT milestone framing is culturally plausible; "Quick Japanese in 7 days" marketing is culturally incongruent; §8 [Hofstede moderate UAI] — users prefer structured paths over open-ended exploration
- **Section:** §8.11
- **Priority:** MEDIUM
- **Notes:** Moderate UAI (48) means Indonesian learners can tolerate some ambiguity in outcome but strongly prefer clear structured progression. JLPT N5→N4→N3 progression satisfies this need. "Explore at your own pace" UX design underperforms in this cultural context. Timeline estimates based on Kim & Webb (2022) d=0.62 meta-analysis data calibrated for Indonesian Japanese learners.

---

## FEATURE: Onboarding — High Early Failure Rate Communication
### Decision: During the first 2–4 weeks of use, the platform must proactively communicate that high "Again" rates (30–50%) are expected and algorithmically normal, not a sign of learning failure.
- **Evidence:** §1.12.3 (BC-05 Pekrun 2006 — control-value theory: failure attributed to ability produces stronger negative affect; attributing failure to process is protective); EA-01 (Corder 1967 — errors are evidence, not failure); Markus & Kitayama 1991 [§8.11.3] — Indonesian malu makes early failure especially face-threatening without proactive framing
- **Section:** §1.12.3, §8.11.3
- **Priority:** HIGH
- **Notes:** New learners encountering a new deck with FSRS calibration will experience high failure rates until the algorithm calibrates to their retention level. Without proactive communication, many Indonesian learners (particularly those with high malu-sensitivity) will attribute this to personal inadequacy and abandon the platform. A first-week onboarding message — "Sistem sedang mengenal kamu" — normalizes this calibration period.

---

## 7. GAMIFICATION LAYER

---

## FEATURE: Gamification — No Default Public Leaderboards
### Decision: Public leaderboards must not appear in the default UI. If leaderboards are implemented, they must be explicitly opt-in, with clear user consent before any public ranking is visible.
- **Evidence:** Hofstede et al. 2010 [§8.11.3] — IDV = 14 (highly collectivist): individual achievement displays create shame risk rather than pride in collectivist cultures; Triandis & Gelfand 1998 [§8.11.3] — vertical collectivism: hierarchical comparison is anxiety-producing for bottom-ranked users; Goffman 1967 [§8.11.3] — face-threatening acts trigger avoidance behavior (session frequency reduction, card skipping)
- **Section:** §8.11
- **Priority:** HIGH
- **Notes:** In vertical collectivist cultures (Indonesia IDV = 14, one of the lowest globally), being visibly ranked below peers is not merely unmotivating — it is a face-threatening act (Goffman 1967) that triggers malu-avoidance behavior. Default opt-in for any social comparison feature violates the malu-reduction design principle. **Conflict note:** Gamification literature (§10, covered by Agent 33) may recommend leaderboards as engagement drivers — if so, this creates a genuine conflict that Agent 2 must resolve. Indonesian cultural data strongly suggests privacy-by-default takes precedence.

---

## FEATURE: Gamification — Group Identity Milestones Over Individual Rankings
### Decision: Progress celebration should use group identity milestones rather than individual ranking ("10,000 pelajar Indonesia telah mencapai N4!" rather than "Kamu ada di posisi #847").
- **Evidence:** Hofstede et al. 2010 [§8.11.3] — IDV = 14: in highly collectivist cultures, group achievements are motivating without creating individual exposure risk; Brown & Levinson 1987 [§8.11.3] — face-saving strategies in collectivist contexts prefer group-oriented positive face
- **Section:** §8.11
- **Priority:** HIGH
- **Notes:** Group milestone framing satisfies the relatedness need (SDT — Self-Determination Theory, §8 foundations) without activating malu-related shame. "Kamu adalah bagian dari komunitas yang berkembang" is motivationally effective for collectivist learners without the ranking-exposure risk of individual leaderboards.

---

## FEATURE: Gamification — No Countdown Timers
### Decision: No countdown timers may appear during card review. Time pressure during review is prohibited.
- **Evidence:** BC-05 (Pekrun 2006 — control-value theory: uncontrollable negative events produce hopelessness emotion); §8.11.3 [Goffman 1967] — countdown timers during review create a public failure risk (visible failure under time pressure); §1.12.3 — anxiety-SRS interaction is already present without adding artificial time pressure
- **Section:** §1.12.3, §8.11
- **Priority:** HIGH
- **Notes:** Countdown timers would combine two anxiety triggers: (a) retrieval failure (which is already emotionally salient for malu-sensitive learners) + (b) public time pressure (visible failure). There is no evidence base for countdown timers producing better SRS outcomes, and the harm risk for Indonesian learners is significant.

---

## FEATURE: Gamification — Streaks as Optional Engagement Driver
### Decision: Streak mechanics (consecutive days of study) may be implemented as an engagement feature, but must not display failure states prominently. Missed days should show neutral messaging, not "streak broken" failure language.
- **Evidence:** §8 [habit formation, Lally et al. 2010 — 66-day median habit formation]; §8.11 — App Annie (2022): Indonesian learners in 5.5-hr/day mobile attention competition; BC-05 (Pekrun 2006) — failure attributions that feel uncontrollable produce negative affect
- **Section:** §8.11
- **Priority:** MEDIUM
- **Notes:** Streak mechanics can be effective for habit formation if framed as progress tracking, not failure punishment. Duolingo-style "streak lost!" messaging is emotionally punitive for malu-sensitive learners. Alternative: "Kamu belajar X hari bulan ini" (cumulative framing) rather than "Streak: 0" (failure framing). See §8.11.4 (Study 4) for the habit formation research agenda.

---

## 8. UX / ACCESSIBILITY

---

## FEATURE: UX — Session Length Cap (5–7 Minutes Default)
### Decision: Default daily session length should be capped at approximately 5–7 minutes (equivalent to ≤20 due reviews for typical learners). The platform should prompt a natural session close at this threshold, not mandate an abrupt stop.
- **Evidence:** §8 [MALL affordances; session fatigue — Flag 5 in §8 v2]; App Annie 2022 [§8.10.5] — Indonesian learners in a 5.5-hr/day mobile attention competition; §9.4 (CLT — WM depletion constrains effective session length); §13 [WM individual differences — to be confirmed by Agent 33]
- **Section:** §8.6, §9.4, §9.10.6
- **Priority:** HIGH
- **Notes:** Short sessions are not just cognitively optimal (CLT) — they are the only realistic slot available in Indonesia's high-competition attention environment. The 15–20 minute cap from §9.10.6 (WM × multi-script data) and the 5–7 minute recommendation from §8.6 are compatible: 5–7 minutes is the daily-habit target; 15–20 minutes is the absolute ceiling before WM depletion significantly degrades learning. Platform should suggest "Lanjutkan besok" after the first threshold.

---

## FEATURE: UX — Malu-Reducing Error Design (Private Review Only)
### Decision: All error events (card failures, "Again" presses) must be entirely private — never visible to other users, never aggregated into public displays.
- **Evidence:** Markus & Kitayama 1991 [§8.11.3] — Indonesian malu is other-facing shame that activates when failure is witnessed; Brown & Levinson 1987 — FTA avoidance is triggered by *potential* visibility, not actual visibility; §8 design matrix — "SRS is inherently malu-reducing: error happens privately, witnessed only by the algorithm. Communicate this explicitly to anxiety-prone users."
- **Section:** §8.11.3
- **Priority:** HIGH
- **Notes:** The private nature of SRS error events is a genuine competitive advantage over classroom learning for Indonesian learners with malu-sensitivity. Brown & Levinson (1987) note that the algorithm-as-teacher removes the human witness from the error event. This should be communicated explicitly in the methodology page as a design feature. "Kesalahan kamu hanya diketahui oleh algoritma, bukan siapapun."

---

## FEATURE: UX — Error Language Reframing
### Decision: Error-state UI copy must not use failure language. Replace "salah" or "gagal" with neutral scheduling language: "Kartu ini akan segera kembali" or "Kamu akan segera latihan lagi."
- **Evidence:** BC-05 (Pekrun 2006 — frame failure as controllable/processual to reduce negative achievement emotions); EA-01 (Corder 1967 — errors are evidence, not failures); Plass et al. 2015 [BC-09] — feedback framing substantially determines emotional response; "let's review this again" vs. "again" communicate identical scheduling information but different attributional frames
- **Section:** §1.12.3, §5.6.1
- **Priority:** HIGH
- **Notes:** "Again" (Anki default) is acceptable as a button label when the surrounding UI copy clearly frames it as a scheduling action. The risk is in surrounding language — any proximity to evaluative language ("salah", "coba lagi", "kamu perlu belajar lebih") should be avoided in favor of process-neutral scheduling language.

---

## FEATURE: UX — No Animated Instructor Avatar
### Decision: No animated instructor avatar or virtual character should be included in the card review interface.
- **Evidence:** CT-04 (Mayer 2009 — embodiment principle: adding a visible animated instructor does not improve learning, d ≈ 0.21, non-significant in most studies)
- **Section:** §9.2
- **Priority:** LOW
- **Notes:** Animated avatars add development cost and complexity without evidence-based learning benefit. They may also introduce the malu risk of a perceived "human witness" to error events (§8 concern). Simple, clean review UI is both pedagogically optimal and culturally appropriate.

---

## FEATURE: UX — Script-Segregated Session Mode (Feature Proposal)
### Decision: A "kana-only mode" and "kanji-only mode" session option should be offered as an advanced setting to reduce multi-script WM switching costs for beginners.
- **Evidence:** OD-06 (Coltheart et al. 2001 — DRC: kanji and kana require different reading routes; switching between routes imposes additional cognitive overhead); OD-21 (Osaka & Osaka 1992 — Japanese reading span tasks more WM-demanding than English equivalent)
- **Section:** §9.10.2, §9.10.6
- **Priority:** MEDIUM
- **Notes:** This is a feature proposal, not a launch requirement. The cognitive justification is established (different reading routes = different attentional architectures). Implementation: allow users to filter daily sessions by card type (kana-only, kanji-only, or standard mixed). Particularly valuable for N5 learners who are still building the foundational script architectures separately.

---

## FEATURE: UX — Level-Differentiated Field Display (Adaptive Card Templates)
### Decision: Card field visibility must be level-differentiated, not uniform. Implement distinct templates for N5–N4 (maximum scaffolding) vs. N3 (partial scaffolding) vs. N2–N1 (minimal scaffolding).
- **Evidence:** CL-07 (Kalyuga 2007 — expertise reversal effect: scaffolding becomes extraneous load at higher proficiency; a single universal template is optimal for no one); CL-11 (Kalyuga et al. 2003 — consolidated expertise reversal review)
- **Section:** §9.4
- **Priority:** HIGH
- **Notes:** Implementation specification table from §9.4:

| Field | N5–N4 | N3 | N2–N1 |
|---|---|---|---|
| Romaji | Show | Optional | Hide |
| L1 meaning | Show | Show | Optional |
| L2d note | Show | Optional | Hide |
| Full sentence translation | Show | Show (partial) | Hide |
| Furigana on examples | Always | On demand | Hide |
| Cultural note | Show | Show | Show |

This table is the implementation spec for Golden agent. One universal template is the worst possible design from a CLT perspective.

---

## FEATURE: UX — Algorithm Transparency (High PDI Cultural Fit)
### Decision: The scheduling algorithm must be explained transparently in plain Indonesian, including what it does, why it schedules cards as it does, and what the research basis is.
- **Evidence:** Hofstede 2001 [§8.11.3] — PDI = 78 (4th globally): high power-distance culture exhibits strong deference to explicit expert authority; algorithm transparency is persuasive, not opaque, in this cultural context
- **Section:** §8.11
- **Priority:** MEDIUM
- **Notes:** "Algoritma ini belajar dari lebih dari 220 juta data belajar dari seluruh dunia" is a credibility-building claim for a high-PDI audience. Users in high-PDI cultures are more likely to follow algorithm-prescribed scheduling when the algorithm's authority is clearly established. This is the opposite of a low-PDI design principle (where algorithms are questioned and users expect to override).

---

## 9. CONTENT SEQUENCING

---

## FEATURE: Content Sequencing — Script Order (Evidence-Based)
### Decision: Script introduction must follow the sequence: Hiragana → Katakana → Kanji. Katakana must be introduced primarily through familiar English-origin loanwords (gairaigo). Kanji introduction must be gradual and JLPT-aligned.
- **Evidence:** OD-13 (Chikamatsu 2006 — hiragana recognition speed > katakana for beginners; sequential introduction empirically supported); OD-19 (Perfetti & Dunlap 2008 — phonographic scripts [kana] and morphographic scripts [kanji] require different pedagogical approaches; sequential introduction reduces dual WM load); §5.5.25 (Daulton 2008 — gairaigo strategy provides Indonesian learners early-win vocabulary for katakana)
- **Section:** §9.10.5, §9.10.1, §5.5.25
- **Priority:** HIGH
- **Notes:** This sequencing is not merely pedagogical tradition — it has an empirical basis: (1) hiragana is more frequent in Japanese texts than katakana, so early mastery has higher reading payoff; (2) katakana through loanwords leverages the gairaigo positive transfer advantage (§5.5.25) and grounds unfamiliar orthography in familiar concepts; (3) kanji requires the lexical route architecture (§9.10.2) which depends on phonological foundation established by kana.

---

## FEATURE: Content Sequencing — JLPT Level Alignment for L2d Tags
### Decision: L2d contrastive notes must be introduced at the JLPT level where the structure first appears, with persistence flags at levels where errors continue despite structure introduction.
- **Evidence:** §5.5.28 (Processability Theory — Pienemann 1998, Kawaguchi 2005 — PT stage sequence for Japanese validated); §5.5.29 (I-JAS empirical data — particles appear at N5 but errors persist to N3+; keigo production only at N2+)
- **Section:** §5.5.28, §5.5.31
- **Priority:** HIGH
- **Notes:** PT stage sequence for Japanese (§5.5.28): particles (N5–N4) → relative clauses (N4–N3) → keigo (N3–N2). L2d notes should track this sequence — don't frontload N2 grammatical detail into N5 cards. However, *persistence* notes ("このエラーはN3でもよく見られます") are appropriate at N4+ for features with known high persistence (に/で errors, は/が in discourse).

---

## FEATURE: Content Sequencing — Gairaigo Dedicated Early Strand
### Decision: A dedicated "katakana loanwords you already know" strand should be created as one of the earliest vocabulary tracks. This provides high-confidence, early-win momentum before harder structural interference points.
- **Evidence:** §5.5.25 (Daulton 2008 — Indonesian learners already know the concept of English-origin gairaigo; the acquisition task is phonological adaptation, not concept learning); §8 SDT competence need — early success builds competence satisfaction
- **Section:** §5.5.25
- **Priority:** HIGH
- **Notes:** The gairaigo strand is uniquely valuable for Indonesian learners because no existing platform has systematically exploited this positive transfer opportunity for this population. Cards should focus explicitly on: (a) confirming the shared concept (テレビ = televisi), (b) teaching the Japanese phonological adaptation (vokal panjang ー, konsonan ganda ッ). Tag: `contrastive-gairaigo`. JLPT impact: N5–N4.

---

## FEATURE: Content Sequencing — Compound Verbs as Dedicated Lexical Entries (N3+)
### Decision: All 複合動詞 (compound verbs) in the deck must be treated as independent lexical entries with full card fields, not derived from their component verbs. The deck must include a warning that compound verb meanings are NOT derivable from components.
- **Evidence:** §5.5.22 (Kageyama 1993; Matsumoto 1996; Himeno 1999 — Japanese compound verb system: ~2,000–3,000 lexicalized forms with meanings not predictable from components); §5.5.30 (Gap 1 — compound verb tag has Low confidence pending I-JAS validation, but structural prediction is sound)
- **Section:** §5.5.22
- **Priority:** MEDIUM
- **Notes:** Indonesian learners face two distinct error types with compound verbs: (1) avoidance (using simple verb where compound is natural), and (2) miscomprehension (reading V2 as a separate clause). Both errors trace to the absence of productive verbal compounding in Indonesian. Cards must explicitly note the non-compositionality: 書き込む ≠ "write + go in" = "fill in a form" / "post online." L2d tag: `contrastive-compound-verb`. JLPT impact: N3–N2. Confidence: Low (pending I-JAS validation).

---

## FEATURE: Content Sequencing — SRS Proficiency Ceiling (N3 Crossover Point)
### Decision: Platform messaging must clearly communicate that Nugget Nihongo's highest ROI is at N5–N3. At N3+, learners should be actively guided to integrate extensive reading alongside SRS study.
- **Evidence:** BC-02 (Webb & Nation 2017 — vocabulary size threshold: at ~3,000 word families [roughly N3], extensive reading becomes competitive with SRS for vocabulary growth); Hu & Nation 2000 [BC-08] — 95% text coverage requires ~3,000 word families; Schmitt 2000 [§1.7] — deliberate study is most efficient for first 2,000–3,000 high-frequency words
- **Section:** §1.12.2
- **Priority:** MEDIUM
- **Notes:** This is not a limitation to hide — it is a credibility signal. The most sophisticated N3–N2 users are the most likely to recognize when they are getting diminishing returns from SRS alone. Proactively recommending graded extensive reading (graded readers, NHK Web Easy, manga with known vocabulary density) at the N3 milestone will retain these users through honest positioning rather than overselling.

---

## FEATURE: Content Sequencing — Pragmatic/Speech Act Vocabulary Requires Contrastive Context
### Decision: Speech act vocabulary (申し訳ございません, ～てもらえますか, ～ていただけますか, chotto as refusal hedge) cannot be adequately taught with a definition alone. Back cards must include pragmatic context notes explaining when the form is socially obligatory.
- **Evidence:** §5.5.24 (Haristiani 2014; CCSARP — Blum-Kulka et al. 1989 — systematic differences in apology, request, and refusal strategies between Indonesian and Japanese); §5.6.3 (James 1998 — pragmatic errors are underserved by JLPT-prep decks that focus on morphosyntax)
- **Section:** §5.5.24
- **Priority:** HIGH
- **Notes:** Indonesian learners consistently under-apologize (using sumimasen where moushiwake gozaimasen is socially required) and over-request directly (using imperative where 〜てもらえますか is expected). These are not style choices — they are pragmatic failures that produce unintended rudeness. The L2d note for speech act vocabulary must explain the *social obligation* level of the form, not just its meaning. Tag: `contrastive-pragmatics-request`. JLPT impact: N3–N2.

---

## 10. PLATFORM ARCHITECTURE

---

## FEATURE: Platform — PWA Architecture as Market-Correct Distribution
### Decision: Progressive Web App (PWA) architecture is the evidence-correct distribution strategy for the Indonesian market, not a technical compromise.
- **Evidence:** APJII 2023 [§8.10.2] — 95.4% of Indonesian internet users access via smartphone; StatCounter 2024 [§8.10.3] — Android 88.7% market share; Japan Foundation 2023 [§8.10.1] — 732,914 Japanese learners in Indonesia (2nd globally); Haristiani & Rifa'i 2020 [§8.10.1] — 78% of Indonesian Japanese learners access digital tools exclusively via smartphone
- **Section:** §8.10
- **Priority:** HIGH
- **Notes:** For the 88.7% Android majority, PWA home-screen installation is a three-tap frictionless flow functionally equivalent to a native app. For the 10.1% iOS users, provide a first-session "how to install" modal specifically for iOS Safari (share → Add to Home Screen). As of iOS 16.4+ (March 2023, available on ~85–90% of active iOS devices), Web Push Notifications are supported for PWAs on iOS (Firtman 2023 [§8.10.3]) — the historical "iOS can't receive PWA notifications" objection is resolved.

---

## FEATURE: Platform — Offline-First Architecture (Non-Negotiable)
### Decision: The platform must cache the day's due review cards on session start. SRS review must be fully functional without internet connectivity. Sync on next available connection.
- **Evidence:** GSMA Intelligence 2023 [§8.10.2] — connection reliability variable in peri-urban and rural Indonesia; 4G coverage reaches 86% of population but with variable reliability; Silver et al. 2019 [§8.10.2] (Pew Research) — confirms smartphone-primary internet access in Indonesia
- **Section:** §8.10
- **Priority:** HIGH
- **Notes:** A PWA that requires continuous connectivity will fail for approximately 30% of the addressable Indonesian market (learners outside major urban centers). Offline-first SRS is not a UX enhancement — it is a market-access prerequisite. Technical implementation: Service Worker caches today's due cards and their associated media (images, audio) on session initialization. Audio may be deferred to available connectivity if storage is constrained.

---

## FEATURE: Platform — AnkiDroid Compatibility and Export Standard
### Decision: Deck architecture must maintain full AnkiDroid compatibility. All Anki standard import/export formats must function correctly. UTF-8 encoding must be enforced throughout the data pipeline.
- **Evidence:** Corpus context — known prior issue with `Prefektur_Jepang_101` deck producing "stream did not contain valid UTF-8" error on AnkiDroid import (resolved by rebuild)
- **Section:** Platform context
- **Priority:** HIGH
- **Notes:** UTF-8 encoding must be explicitly set and verified at every point in the data pipeline: TSV generation, APKG construction, SQLite card storage. AnkiDroid compatibility testing must be part of the QA pipeline for every deck export. Japanese character encoding is the highest-risk point — all field content including Japanese characters, furigana, and Unicode symbols must be validated pre-export.

---

## FEATURE: Platform — Push Notification Architecture
### Decision: Implement Web Push Notifications for all platforms. Use consistent daily reminder timing with user-set notification window. Study timing consistency supports habit formation.
- **Evidence:** §8.11.4 (Study 4 — Lally et al. 2010: median 66-day habit formation for health behaviors; consistent cue timing accelerates habit formation); Firtman 2023 [§8.10.3] — iOS 16.4+ supports PWA Web Push (≈85–90% of active iOS devices)
- **Section:** §8.10.3, §8.11.4
- **Priority:** HIGH
- **Notes:** Notification timing consistency (same time each day, user-set) is more important than notification content for habit formation. The platform should ask users to set a "study time" during onboarding and default notifications to that time. Track "cued starts" (session initiated within 10 minutes of notification) vs. "autonomous starts" (initiated independently) as the primary habit formation metric (§8.11.4 Study 4 design).

---

## FEATURE: Platform — Market Research Study Integration
### Decision: From launch, the platform must collect the minimum viable data to enable the five research studies outlined in §8.11: session behavioral metrics, card latency data, and consent-based survey capacity.
- **Evidence:** §8.11 (Studies 1–5) — SDT validation study, FSRS difficulty prior calibration, malu/anxiety study, habit formation study, PWA vs. native app comparison; all require platform behavioral data
- **Section:** §8.11
- **Priority:** MEDIUM
- **Notes:** The research agenda in §8.11 positions Nugget Nihongo to generate original academic contributions — the first empirical SDT data for Indonesian Japanese learners, the first FSRS calibration for non-kanji-background populations. This requires: (a) behavioral data collection consent during onboarding, (b) anonymized session log architecture, (c) survey deployment infrastructure (for FLCAS and LLOS instruments). Recommend flagging this to Crispy for legal/privacy review. Specifically relevant: Study 3 (malu/FLCAS) is the highest-priority study for Indonesian-specific platform design validation.

---

## CONFLICT REGISTER

The following conflicts between sections are flagged for Agent 2 resolution:

| Conflict ID | Section A | Section B | Nature of Conflict | Recommended Resolution |
|---|---|---|---|---|
| CONF-01 | §9.2 Redundancy Principle | §9.7 L2 Captioning Exception | Redundancy principle says audio + identical text is harmful; captioning exception says N5–N4 learners NEED text to scaffold audio decoding | **Resolution in §9.7 table:** Treat as level-differentiated, not a binary choice. N5–N4 captioning exception applies; N3+ redundancy principle applies. |
| CONF-02 | §1.4 Interleaving | §8 Gamification | §1.4 recommends within-category interleaving for maximum learning; gamification literature (§10, Agent 33) may recommend cross-domain variety for engagement | **Pending Agent 33 §10 data.** Recommend learning-science priority over engagement design if in direct conflict. |
| CONF-03 | §8 No Leaderboards | §10 Gamification | §8 cultural analysis strongly argues against leaderboards for Indonesian learners; §10 gamification literature may show positive leaderboard effects in other contexts | **Indonesian cultural data takes precedence.** Opt-in only, never default-on. |
| CONF-04 | §1.3 Testing Effect | §9.4 Expertise Reversal | Testing effect research shows continued testing of all items (including already-known ones) produces 2× retention; expertise reversal says scaffolding (including testing) becomes redundant for advanced learners | **Not a genuine conflict.** Testing of already-known items (Karpicke & Roediger 2008) is about *continued retrieval practice*; expertise reversal is about *scaffolding removal*. FSRS naturally handles this: advanced cards get longer intervals (less frequent testing), not zero testing. |

---

## DECISION COUNT SUMMARY

| Feature Category | Decisions | Priority Breakdown |
|---|---|---|
| 1. Card Front Design | 5 | HIGH: 4, MEDIUM: 1 |
| 2. Card Back Design | 9 | HIGH: 7, MEDIUM: 2 |
| 3. Audio Features | 5 | HIGH: 5 |
| 4. Image Features | 6 | HIGH: 4, MEDIUM: 2, LOW: 0 |
| 5. Scheduling Algorithm | 6 | HIGH: 4, MEDIUM: 2 |
| 6. Onboarding Flow | 6 | HIGH: 4, MEDIUM: 2 |
| 7. Gamification Layer | 4 | HIGH: 3, MEDIUM: 1 |
| 8. UX/Accessibility | 8 | HIGH: 6, MEDIUM: 2, LOW: 1 |
| 9. Content Sequencing | 7 | HIGH: 5, MEDIUM: 2 |
| 10. Platform Architecture | 6 | HIGH: 5, MEDIUM: 1 |
| **TOTAL** | **62** | **HIGH: 47, MEDIUM: 15, LOW: 1** |

---

## CROSS-REFERENCE MAP: DECISIONS → SOURCE SECTIONS

| Source | Key Design Decisions Extracted |
|---|---|
| §1.1–§1.3 (SRS, Retrieval) | DDM-P1 scheduling algorithm; card front retrieval format; card flip mechanic justification; methodology page framing |
| §1.4 (Interleaving) | Graduated interleaving; within-category interleaving |
| §1.5 (Desirable Difficulties) | "Again" framing; learning/performance dissociation communication; FSRS explanation |
| §1.10 (SRE) | Keterangan Tambahan self-reference prompts |
| §1.11 (FSRS Validation) | FSRS vs. SM-2; algorithm-determined scheduling; 90% retention target |
| §1.12 (Boundary Conditions) | SRS scope positioning; N3 crossover point; SRS-anxiety; hard limits |
| §5.5 (Contrastive Linguistics) | Full L2d tag inventory; gairaigo strand; compound verb policy; pragmatic vocabulary notes; script sequence |
| §5.6 (Error Analysis) | Metalinguistic back-card design; type-answer mode; "Again" framing; fossilization-prone features; ている dual treatment |
| §8 (PWA Platform) | PWA architecture; offline-first; no leaderboards; group milestones; malu-reducing design; algorithm transparency; session length; notification architecture |
| §9 (Multimedia) | Image mandatory/prohibited rules; spatial contiguity; temporal contiguity; redundancy/captioning conflict; no background music; self-explanation prompts; no avatar; generative strategies |
| §9.10 (Orthographic Development) | Script sequencing evidence; hiragana > katakana for beginners; romaji policy; response latency proposal; kana sublexical route training; kanji lexical route training; script-segregated sessions |

---

*DESIGN-DECISION-MASTER-PART1-AGENT32-v1.md*
*Agent 32 Sonnet 4.6 — 3 April 2026*
*Source: §1 + §1.12, §5.5 v4 + §5.6, §8 v3, §9 v1 + §9.10*
*62 decisions across 10 feature categories | 47 HIGH priority | 4 conflicts flagged*
*Agent 33 covers §10–§17, §CA, §2–§4 | Agent 2 merges Part 1 + Part 2*

---

---

# NUGGET NIHONGO — DESIGN DECISION MASTER (PART 2 / AGENT 33)
> *Merged from DESIGN-DECISION-MASTER-PART2-AGENT33-v1.md by Agent 2 — 4 April 2026*
> *Part 1 (Agent 32): §1, §5.5, §5.6, §8, §9 — Feature categories 1–10 (62 decisions)*
> *Part 2 (Agent 33): §10–§13, §CA, §2, §3, §4, §14–§17 — Feature categories 1–10 (61 decisions)*
> *Combined total: 123 decisions*

# NUGGET NIHONGO — DESIGN DECISION MASTER (PART 2)
## Agent 33 — §10, §11, §12, §13, §CA, §CA.10, §2, §3, §4, §14, §15, §16, §17
**Workstream:** C — Management Documents | **Priority:** 🔴 HIGH  
**Corpus baseline:** v10 (~879 citations) | **Date produced:** 3 April 2026  
**Scope:** All design decisions extractable from §10–§13, §CA, §CA.10, §2, §3, §4, §14–§17  
**Agent 32 covers:** §1, §5, §8, §9 (Part 1 counterpart)  
**Agent 2 merges:** Part 1 + Part 2 → `DESIGN-DECISION-MASTER-v1.md`

---

## FEATURE TAXONOMY (identical to Agent 32)

1. Card Front Design  
2. Card Back Design  
3. Audio Features  
4. Image Features  
5. Scheduling Algorithm  
6. Onboarding Flow  
7. Gamification Layer  
8. UX/Accessibility  
9. Content Sequencing  
10. Platform Architecture

---

## 1. CARD FRONT DESIGN

---

## FEATURE: Visual Mora Counter

### Decision: Display an explicit visual mora count on every card containing sokuon (っ), chōon (ー), or moraic nasal (ん)

- **Evidence:** PH-13 (Cutler & Otake 1994), PH-14 (Otake et al. 1993), PH-16 (Port et al. 1987)
- **Section:** §11.3, §11.7
- **Priority:** HIGH
- **Notes:** Indonesian learners segment by syllable, not mora. Audio alone is insufficient because non-native listeners do not automatically detect mora isochrony (PH-16) even when it is present in the acoustic signal. Recommended format: dot-counter (●●●●) or segmented hiragana (き・っ・て = 4 mora). This is also theoretically grounded in phonological loop research (PH-21, cross-ref §13.3): explicit mora encoding scaffolds phonological store accuracy.

---

## FEATURE: Pitch Contour Visualization

### Decision: Include a pitch contour graph (H/L dot system) on the front of every content-word card (noun, verb, adjective) from N5 onward

- **Evidence:** PH-22 (Aoyama & Guion 2007), PH-25 (Pierrehumbert & Beckman 1988)
- **Section:** §11.4, §11.7
- **Priority:** HIGH
- **Notes:** Indonesian is a non-tonal, non-pitch-accent language. By SLM classification (PH-01), pitch accent is a "new category" for Indonesian learners — no L1 phonological interference, but also no L1 scaffold for perceiving it as lexically contrastive. Without a visual representation, learners will misattribute pitch variation to pragmatic intonation rather than lexical function. The pitch graph should be present from N5 for habituation, but scored/tested only after learner reaches ~500 active words. Pitch contour notation must target Tokyo/Standard dialect (PH-24, Kubozono 2012).

---

## FEATURE: Sociopragmatic Context Cue on Front Card

### Decision: For all pragmatic/keigo cards, the front must include a social context descriptor — not only the target form — before the learner attempts recall

- **Evidence:** SC-21 (Bardovi-Harlig & Dörnyei 1998), SC-19 (Thomas 1983)
- **Section:** §14.5
- **Priority:** HIGH
- **Notes:** Bardovi-Harlig & Dörnyei (SC-21) empirically demonstrate that L2 learners prioritise grammatical correctness over pragmatic appropriateness and will not notice pragmatic violations unless explicitly directed to them. Front card must include the situational trigger (social relationship, institutional context, speech act type) rather than presenting the vocabulary item in isolation. Thomas's (SC-19) sociopragmatic/pragmalinguistic failure distinction establishes that two different failure types require two different card formats; the sociopragmatic type is addressed by context-visible front cards.

---

## FEATURE: Explicit L1-Interference Flag for Similar Phonemes

### Decision: Cards involving the Japanese /r/ (ら行) must carry an explicit pedagogical note flagging that this sound is similar to but distinct from Indonesian /r/

- **Evidence:** PH-05 (SLM equivalence classification), PH-08 (PAM — Similar Category type)
- **Section:** §11.1, §11.2, §11.7
- **Priority:** HIGH
- **Notes:** By PAM, Indonesian /r/ and Japanese /r/ form a Similar Category (SC) pair — the hardest discrimination type, where L1 category actively suppresses L2 perception. Without explicit flagging, learners default to Indonesian /r/ as proxy and fail to notice the acoustic difference. The flag should appear in a tooltip or pedagogical note field on the front or back card. Compare: pitch accent (UC type) does not require this flag — exposure alone is sufficient for category formation.

---

## FEATURE: Recognition Card Precedes Type-Answer for Phonologically Complex Words

### Decision: For words with complex phonological targets (pitch accent + mora combination), the card sequence must be audio-recognition first, type-answer second — never reversed

- **Evidence:** PH-32 (Bradlow et al. 1997); HVPT paradigm PH-30–PH-31
- **Section:** §11.5, §11.7
- **Priority:** HIGH
- **Notes:** HVPT research establishes that perception training produces measurable production improvement (PH-32), but the reverse transfer is not documented. Requiring type-answer performance before perceptual mastery is established is inefficient and increases listening anxiety (§3, LS-07). This sequencing applies especially to phonologically challenging vocabulary (sokuon words, pitch-distinctive minimal pairs). For standard vocabulary with no exceptional phonological complexity, ordering may be flexible.

---

## 2. CARD BACK DESIGN

---

## FEATURE: Contrastive Notes as Noticing Triggers

### Decision: All card backs must include a contrastive note flagging Indonesian ↔ Japanese form or function differences wherever L1 interference is predicted

- **Evidence:** OT-06 (Schmidt 1990 Noticing Hypothesis), OT-07 (Schmidt 1993); §5.5 CP cluster (cross-ref Agent 32, §1/§5)
- **Section:** §12.2
- **Priority:** HIGH
- **Notes:** Schmidt's Noticing Hypothesis (OT-06) establishes that input cannot be acquired without conscious attention to form. For Indonesian learners, categories without L1 equivalents (は/が distinction, te-iru resultative/progressive split, classifiers, keigo morphology) will not be noticed from input alone. The contrastive note is not supplementary content — it is a designed noticing trigger. Notes should identify: "This differs from Indonesian because X." Ellis (GA-22, §2) confirms: gaining metalinguistic rule knowledge without production-oriented framing does not automatically produce procedural competence, so contrastive notes should always be embedded in a contextual example sentence, not stated as abstract rules.

---

## FEATURE: Multiple Contextual Example Sentences

### Decision: Card backs should include more than one example sentence to maximize varied-context repetition and vocabulary depth

- **Evidence:** VD-05 (Webb 2007, d ≈ 0.61–0.78 for varied-context vs. identical-context repetition); VD-08 (Schmitt 1998)
- **Section:** §CA.10.1
- **Priority:** MEDIUM
- **Notes:** Webb (VD-05) shows that repetition in varied collocational contexts builds depth dimensions (collocational knowledge, register knowledge, grammatical behavior) significantly more than repetition in identical contexts. Schmitt (VD-08) longitudinal data confirms collocational and register knowledge are the depth dimensions that develop most slowly and most require deliberate instruction. Where card space or rendering overhead constrains multiple sentences, priority should be: one sentence showing primary usage context + one sentence showing collocational partner variation. Cross-reference §17 Android rendering constraints: AnkiDroid note model ≤11 fields.

---

## FEATURE: Collocational Notes on Card Back

### Decision: High-priority vocabulary items (N4 and above) should include a collocational note identifying the word's primary collocational partners

- **Evidence:** VD-10 (Howarth 1998), VD-12 (Wray 2002); GA-28 (Goldberg 2006 type frequency)
- **Section:** §CA.10.3, §2.6
- **Priority:** MEDIUM
- **Notes:** Collocational knowledge is the depth dimension L2 learners most consistently fail to develop through incidental exposure (Howarth VD-10). Indonesian collocational patterns diverge systematically from Japanese, especially for verb-noun constructions (する + noun compounds). Goldberg's type frequency argument (GA-28) predicts that providing multiple lexical exemplars of a construction — i.e., collocational partners — accelerates generalization of the construction schema. Wray (VD-12) establishes that native speakers store and retrieve many collocations as holistic formulaic units; cards should reflect this by presenting collocations as units, not compositional derivations. Cross-reference: construction cards (§2.6 GA-27–GA-31) are a related card type that integrates vocabulary and grammar around formulaic units.

---

## FEATURE: Register Labels on Keigo Cards

### Decision: All keigo cards must carry explicit register labels (丁寧語, 謙譲語, 尊敬語) and an explanation of the social encoding logic, not just a list of substitutable forms

- **Evidence:** SC-05 (Cook 2008), SC-06 (Pizziconi 2011), SC-02 (Canale & Swain 1980 sociolinguistic competence)
- **Section:** §14.1–§14.2, §17.6
- **Priority:** HIGH
- **Notes:** Cook (SC-05) establishes that keigo is not a grammatical rule system but a socially embedded practice: the register label alone (丁寧語) does not convey the social condition that makes that register obligatory. Pizziconi (SC-06) distinguishes the teachable morphosyntactic layer (on the card back) from the non-rule-governed contextual judgment layer (partially addressed by context notes). The disambiguation note should explain: "Use 謙譲語 when lowering yourself relative to a superior — not simply when being polite." This is particularly critical for the 介護 sector deck, where keigo is deployed asymmetrically across the entire working day (§17.6 synthesis).

---

## FEATURE: Vocabulary Knowledge Scale Rating Guidance

### Decision: Card backs should include a behavioral rating criterion aligned to VKS levels, training learners to distinguish production-level from recognition-level knowledge

- **Evidence:** VD-06 (Paribakht & Wesche 1997 VKS), VD-04 (Henriksen 1999 three dimensions)
- **Section:** §CA.10.2
- **Priority:** MEDIUM
- **Notes:** FSRS relies on self-reported confidence. Research on self-assessment accuracy (Blanche & Merino; Ross) shows learners systematically overrate when using familiarity criteria. VKS behavioral criteria address this directly: "Rate 'Easy' only if you could use this word in a natural Japanese sentence. Rate 'Good' if you recalled the meaning immediately. Rate 'Hard' if you knew it with effort. Rate 'Again' if you could not recall." This guidance should appear as an in-deck note or onboarding explanation, not repeated on every card back. Cross-reference: Henriksen's (VD-04) partial→precise continuum maps onto the Again/Hard/Good/Easy axis and provides the theoretical justification for why the behavioral criterion is appropriate.

---

## FEATURE: Minimal Pair Examples on Pitch Accent Cards

### Decision: For content words where pitch accent is lexically distinctive, card backs should include at least one minimal pair from N3 onward

- **Evidence:** PH-24 (Kubozono 2012), PH-25 (Pierrehumbert & Beckman 1988)
- **Section:** §11.4
- **Priority:** MEDIUM
- **Notes:** Without minimal pair examples, Indonesian learners may continue to process pitch as intonational rather than lexical (§11.4 misattribution mechanism). Examples: 箸/橋 (hashi), 飴/雨 (ame). Minimal pairs should only appear from N3 onward — at N5–N4, learner cognitive load from phonological, lexical, and orthographic processing simultaneously is too high to add productive pitch contrastive training (Tajima et al. PH-28 shows pitch errors rarely cause intelligibility failure at early levels). This is a delayed-emphasis strategy, not an absence of pitch content.

---

## 3. AUDIO FEATURES

---

## FEATURE: Native Speaker Audio Only — No TTS

### Decision: All audio fields in the deck must use human-recorded native speaker audio; text-to-speech is prohibited as a substitute

- **Evidence:** AL-17 (Guiora 1972 language ego), AL-18 (Schumann 1975); PH-30 (Logan et al. 1991 HVPT founding study)
- **Section:** §11.5, §17.6
- **Priority:** HIGH — NON-NEGOTIABLE
- **Notes:** HVPT research (PH-30–PH-39) establishes that perceptual learning generalizes across speakers only when training uses multiple natural human voices. TTS voices are acoustically homogeneous and do not reproduce the natural prosodic variation that drives phonological category formation. Additionally, ego permeability theory (AL-17–AL-18) establishes that adult learners must internalize target phonological forms to overcome phonological resistance; TTS audio does not provide ecologically valid phonological models. TTS may be used as a placeholder during deck development but must be flagged for replacement. Cross-reference: audio file encoding constraint for AnkiDroid compatibility — ≤64kbps AAC (§17.6 mobile-first design decision).

---

## FEATURE: Multi-Speaker Audio (Minimum 2 per Word)

### Decision: Each card's audio field should contain recordings from at least 2 distinct native speakers; high-frequency target phonological items should have 3–4 speakers

- **Evidence:** PH-30 (Logan et al. 1991), PH-31 (Lively et al. 1993), PH-33 (Thomson 2012 computer-mediated HVPT)
- **Section:** §11.5, §11.7
- **Priority:** HIGH
- **Notes:** HVPT's defining experimental manipulation is talker variability — not simply native-speaker audio, but multi-talker native-speaker audio. Thomson (PH-33) validated this in a computer-mediated (non-lab) setting directly analogous to a mobile SRS app, achieving lab-equivalent perceptual learning gains. Single-voice audio databases — the norm in most SRS apps — do not meet the HVPT condition for perceptual generalization. For Tokyo pitch accent specifically, inter-speaker variation is substantial (PH-24 Kubozono 2012), reinforcing the multi-speaker requirement. Implementation: two speakers minimum per word; additional speakers prioritized for ら行 items, sokuon words, and pitch accent minimal pairs.

---

## FEATURE: Slow Playback Option for Phonetically Complex Words

### Decision: Cards containing sokuon, chōon, or pitch-distinctive sequences must offer a 65% speed playback option that preserves pitch contour proportionally

- **Evidence:** PH-16 (Port et al. 1987), §11.3 mora timing theory
- **Section:** §11.3, §11.7
- **Priority:** MEDIUM
- **Notes:** Mora isochrony is acoustically present (PH-16) but not automatically perceived by non-native listeners whose segmentation system operates at the syllable level. A proportional slow playback — slowing duration while preserving pitch contour — allows the learner to internalize mora duration before native-speed exposure. This is the phonological equivalent of desirable difficulty spacing (§1 DD cluster, cross-ref Agent 32): slightly increased processing difficulty that improves long-term form-meaning mapping. Speed toggle should be available on demand, not enforced (autonomy principle, CM-23).

---

## FEATURE: Listening Anxiety Reduction — Replay Access and Speed Control

### Decision: Audio cards must offer accessible replay and optional speed control; single-play-only audio presentation is prohibited

- **Evidence:** LS-07 (Elkhafaifi 2005 listening anxiety), LS-08 (Vogely 1998 anxiety sources)
- **Section:** §3.3
- **Priority:** HIGH
- **Notes:** Vogely (LS-08) found the most frequently reported source of listening anxiety is loss of control over listening conditions — inability to replay, no speed control, awareness of others comprehending. Elkhafaifi (LS-07) demonstrates that listening anxiety is empirically separable from general FLCA and is a stronger predictor of course grade than general anxiety. The catastrophic misparse cascade (§3.3.3) — where one phonological failure cascades to full comprehension failure — is specifically addressed by replay access: learners who can re-listen avoid permanent misparse rather than building incorrect phonological representations. Cross-reference: ID-05 (Young 1991, §13.1) provides the general low-anxiety design framework; §3.3 adds the listening-specific mechanism.

---

## FEATURE: Audio-Forward Card Interleaving in Review Queue

### Decision: Audio cards must be interleaved with semantic cards in the review queue; learners cannot opt out of audio cards during review sessions

- **Evidence:** AL-17–AL-18 (Guiora; Schumann ego permeability), AL-19 (Ehrman ego boundaries)
- **Section:** §17.6
- **Priority:** HIGH
- **Notes:** Ehrman (AL-19) documents the thick-ego-boundary learner profile — instrumentally motivated adult learners who drill vocabulary intensively but avoid production and phonological practice, defaulting to recognition-only review. The SSW learner's primary phonological challenge is ego-protective avoidance (AL-18 Schumann), not cognitive inability. Making audio opt-out available in the review queue enables precisely this avoidance. Interleaving audio with semantic review removes the opt-out; triggering a second audio replay on "Again" responses closes the pattern-matching-without-phonological-engagement loophole.

---

## FEATURE: Phonological Training as Separate FSRS Parameter Set

### Decision: Audio/phonological cards should use separate FSRS scheduling parameters from semantic vocabulary cards

- **Evidence:** PH-38 (Nishi & Kewley-Port 2008 individual differences in phonological learning)
- **Section:** §11.5, §11.7
- **Priority:** MEDIUM
- **Notes:** Nishi & Kewley-Port (PH-38) document substantial individual differences in phonological learning rate — larger than for semantic vocabulary. This implies that a learner's optimal review interval for audio recognition cards may differ significantly from their optimal interval for Japanese-to-Indonesian meaning recall. Blending these into the same scheduling queue produces suboptimal intervals for at least one card type. Implementation: either a dedicated audio card subdeck with adjusted initial ease and interval parameters, or a card-type tag that triggers parameter modification. Cross-reference: §13.7 Decision 5 (FSRS parameter adjustment per learner aptitude profile).

---

## 4. IMAGE FEATURES

---

## FEATURE: Emotionally Engaging Cultural Images as Sleep-Consolidation Enhancers

### Decision: Cultural content cards should use images that are emotionally engaging and thematically connected to the cultural schemata being encoded, not decorative stock images

- **Evidence:** SL-06 (Payne & Kensinger 2010 emotional memory + sleep consolidation)
- **Section:** §10.7
- **Priority:** MEDIUM
- **Notes:** Payne & Kensinger (SL-06) establish that emotionally engaging material benefits disproportionately from sleep consolidation — the hippocampal replay mechanism preferentially processes emotionally salient content during SWS. This extends the sleep consolidation argument (§10.7) from study timing to content design: cultural images that evoke genuine emotional interest (matsuri scenes, 和食 craftsmanship, seasonal imagery) are not merely decorative but may enhance consolidation via emotional salience. This does not mean shocking or highly arousing images — moderate positive emotional valence is sufficient. Cross-reference: §9 CT/CL cluster (cognitive load, seductive details effect, Agent 32) — images must be content-intrinsic, not tangential to the vocabulary item being encoded.

---

## 5. SCHEDULING ALGORITHM

---

## FEATURE: Intervals Must Span at Least One Overnight Consolidation Cycle

### Decision: FSRS scheduling must enforce minimum review intervals that span at least one sleep cycle; same-day re-review of a card seen earlier that day has minimal consolidation value

- **Evidence:** SL-01 (Walker & Stickgold 2004), SL-02 (Diekelmann & Born 2010), SL-04 (Dumay & Gaskell 2007)
- **Section:** §10.7
- **Priority:** HIGH
- **Notes:** Dumay & Gaskell (SL-04) demonstrate that new vocabulary items integrate into the established lexical network specifically during sleep — this integration is absent immediately after learning and present after a sleep interval even when total elapsed time is controlled. Walker & Stickgold (SL-01) establish that slow-wave sleep (SWS) in the first half of the night preferentially consolidates declarative memory (vocabulary). FSRS's minimum interval architecture already enforces overnight spacing algorithmically; what this decision adds is a communication obligation — users should be informed of this rationale ("Your cards are scheduled across nights, not within the same day, because memory consolidation happens during sleep"). Cross-reference: §1 TE-01, Cepeda et al. (2006) spacing theory (Agent 32).

---

## FEATURE: Evening Study Recommendation

### Decision: Default push notification time should be set to the evening window (19:00–22:00); this recommendation should be explained to users in terms of sleep consolidation

- **Evidence:** SL-03 (Gais, Lucas & Born 2006), SL-04 (Dumay & Gaskell 2007)
- **Section:** §10.7
- **Priority:** MEDIUM
- **Notes:** Gais et al. (SL-03) found that studying before sleep produces significantly better recall at 6-month follow-up than studying in the morning and remaining awake for hours before sleeping. The proximity of the study session to sleep onset — not merely the fact of sleeping — is the operative variable. The evening recommendation should be the platform default (not the mandatory setting) and explained briefly: "Reviewing before bed helps your brain consolidate vocabulary during sleep." Cross-reference: notification design must use achievement framing, not threat framing (§10.6 HB cluster). **⚠ Potential conflict with §8:** If §8 proposed a user-configurable notification time as the primary recommendation without specifying an evidence-based default, flag for Agent 2 alignment.

---

## FEATURE: Session Progress Autosave for Fragmented Review

### Decision: Session progress must autosave continuously so that interrupted sessions (commute, break) do not lose review completions

- **Evidence:** CM-23 (Stockwell & Hubbard 2013), §17.6 (20–40 min/day fragmented session constraint)
- **Section:** §16.6, §17.6
- **Priority:** HIGH
- **Notes:** The SSW adult learner's study pattern is 20–40 minutes/day in fragmented blocks (§17.6 learner profile), not a single sustained session. Stockwell & Hubbard (CM-23) identify micro-session compatibility — designing for 2–5 minute independent review windows — as a predictor of sustained MALL engagement. Autosave enables sessions to be interrupted and resumed without losing FSRS progress, directly addressing the fragmented-session constraint. This is also the most basic implementation requirement for the mobile-first (AnkiDroid) deployment context.

---

## FEATURE: Daily New Card Limit — Defaults and WM-Based Constraints

### Decision: Default new card limit should be 10–15/day for beginners, with a hard recommended maximum of 20/day; the platform should communicate the cognitive rationale for this limit

- **Evidence:** ID-15 (Miyake & Friedman 1998 WM capacity), ID-16 (Juffs & Harrington 2011 WM depletion), ID-17 (Baddeley 2003)
- **Section:** §13.3, §13.7 (Decision 7), §17.6
- **Priority:** HIGH
- **Notes:** Juffs & Harrington (ID-16) document that working memory depletion reduces encoding quality in later-session items — the last 30% of a long session produces significantly weaker memory traces than the first 30%. Beyond cognitive load, the SSW learner profile (§17.6) specifies 5–7 new cards per 20-minute session block as the operational calibration. The user-facing message should be: "Fewer new cards reviewed well is better than more cards reviewed poorly." This is a learner-autonomy-compatible recommendation (CM-23 self-pacing), not a platform-enforced cap — learner can override. The optional "guided mode" (§17.6) caps new cards at 7/day for the first 30 days.

---

## FEATURE: ER-Flagged Words Enter SRS Queue with Source Context

### Decision: Words flagged during extensive reading should automatically enter the FSRS queue with the sentence from the source text pre-populated as the example sentence

- **Evidence:** ER-25 (Pigada & Schmitt 2006), ER-27 (Pellicer-Sánchez & Schmitt 2010)
- **Section:** §4.7
- **Priority:** MEDIUM
- **Notes:** Pigada & Schmitt (ER-25) establish that ER is most effective at consolidating words with prior partial representations; encountering a word in ER after SRS study produces dramatically richer acquisition than encountering it cold. The "Add to Nugget" flag-and-continue mechanism closes the SRS→ER→SRS loop: unknown words encountered in reading are queued for deliberate study rather than noted passively. The source context sentence should be pre-populated in the example sentence field, providing the varied-context repetition that VD-05 (Webb 2007) identifies as the strongest driver of vocabulary depth. **Copyright note:** licensed graded reader content requires rights clearance for sentence reproduction; user-generated context entry is the legally safe alternative for copyrighted material.

---

## 6. ONBOARDING FLOW

---

## FEATURE: Implementation Intention Prompt

### Decision: Onboarding must ask users to specify a concrete study time, location, and frequency as an implementation intention — not merely a vocabulary goal

- **Evidence:** HB-03 (Gollwitzer & Sheeran 2006 meta-analysis, d = 0.65), HB-01 (Wood & Neal 2007 habit formation)
- **Section:** §10.6
- **Priority:** HIGH
- **Notes:** Gollwitzer & Sheeran (HB-03) meta-analysis (94 studies) found implementation intentions of the form "I will [behavior] AT [time] IN [place] ON [occasion]" produce d = 0.65 on goal achievement compared to goal-intention alone — the single highest-effect-size behavioral intervention in the §10 corpus. Wood & Neal (HB-01) establish that habits are context-dependent, not person-dependent: the cue (a specific time + location) must be encoded, not the motivation. Onboarding prompt example: "When will you study? [e.g., 21:00] Where/doing what? [e.g., in bed before sleeping]." This is categorically different from "How many words do you want to learn?"

---

## FEATURE: SRL Scaffolding — FSRS Explained, Not Assumed

### Decision: Onboarding must include an explicit explanation of how FSRS scheduling works, why daily review is structured as it is, and what "Again/Hard/Good/Easy" means behaviorally

- **Evidence:** AL-22 (Ushioda 2011 autonomy), AL-05 (Zimmerman 2002 SRL), AL-15 (Wenden 1991 metacognitive deficit)
- **Section:** §17.1–§17.3, §17.6
- **Priority:** HIGH
- **Notes:** Ushioda (AL-22) establishes that the transition from controlled to autonomous self-regulation requires explicit metacognitive scaffolding — learners who do not understand the mechanism of the tool cannot self-regulate its use effectively. Wenden (AL-15) documents the metacognitive deficit risk: high-motivation learners with weak SRL capacity will engage intensively but inefficiently (high-frequency short bursts on easy items, avoidance of hard items). FSRS mechanics explanation should cover: (1) why cards reappear at increasing intervals; (2) what each button rating produces in the schedule; (3) why consistency matters more than session length. Cross-reference: VKS behavioral rating criteria (§CA.10.2) should be introduced here as the operational definition of "Easy/Good/Hard/Again."

---

## FEATURE: Transformative Framing for SSW Learners

### Decision: Onboarding, progress messages, and milestone notifications for SSW-track users must explicitly frame language acquisition as preparation for a life transition, not as a gamified vocabulary exercise

- **Evidence:** AL-03 (Mezirow 1991 Transformative Learning), AL-16 (Crookes & Schmidt 1991 satisfaction)
- **Section:** §17.6
- **Priority:** HIGH
- **Notes:** Mezirow (AL-03) identifies transformative learning — where the learning is connected to a fundamental reorientation of the learner's life — as the most durably motivated form of adult learning. The SSW candidate's situation is an archetypal disorienting dilemma: Japanese language competence is required for a qualitatively different life trajectory. Milestone messages should be: "You've mastered the 介護 sector core vocabulary. You're ready for the care-work section of the JFT-Basic." — not "You've earned 500 XP." The transformative stakes framing is a pedagogically grounded design decision (AL-03), not marketing copy. This framing also applies to 日本の文化 cultural content, which should be positioned as pre-departure cultural preparation, not abstract enrichment.

---

## FEATURE: Domain-Specific Expectation Setting for Phonology

### Decision: Onboarding must explicitly communicate that native-like accent in Japanese is an exceptional outcome for adult learners, while lexical and syntactic near-native proficiency is achievable

- **Evidence:** ID-24 (Birdsong & Molis 2001), ID-25 (DeKeyser 2000), ID-27 (DeKeyser 2013)
- **Section:** §13.4, §17.6
- **Priority:** HIGH
- **Notes:** Birdsong & Molis (ID-24) refute the strong CPH but confirm that post-critical-period phonological acquisition consistently falls short of native-like outcomes; DeKeyser (ID-25) establishes that adult learners can compensate via explicit metalinguistic awareness for lexical and syntactic domains. Without this expectation setting, adult learners who notice a persistent accent may attribute this to failure of will or insufficient effort (fixed mindset interpretation, §13.5) rather than a predictable developmental constraint. Framing: "Most adult Japanese learners retain some foreign accent in pronunciation — this is normal and doesn't prevent effective communication. Your vocabulary and grammar can reach near-native levels with consistent study."

---

## FEATURE: Growth Mindset Framing in Onboarding Narrative

### Decision: Onboarding must include a brief growth mindset statement — framing SRS review as a trainable skill where effort, not talent, determines outcomes — with a concrete data anchor

- **Evidence:** ID-30 (Dweck 2006), ID-31 (Lou & Noels 2019), ID-36 (Weiner attribution theory)
- **Section:** §13.5, §13.6, §13.7 (Decisions 15–16)
- **Priority:** HIGH
- **Notes:** Lou & Noels (ID-31) establish that growth mindset reduces failure-related beliefs, failure-related emotions, and increases mastery behavior in L2 contexts — three outcomes directly relevant to SRS dropout prevention. The data anchor should be an effort-attribution fact: "It takes an average of 30–50 repetitions for a word to enter long-term memory. This is true for everyone — what differs is consistency, not talent." This counter-narrative is most effective when presented before first-session experience, where the first "Again" response might otherwise trigger fixed-mindset interpretation.

---

## 7. GAMIFICATION LAYER

---

## FEATURE: No Public Leaderboard Default

### Decision: Public leaderboards are prohibited as a default feature; if implemented at all, must be opt-in and private-by-default

- **Evidence:** GX-01 (Hanus & Fox 2015 longitudinal failure study), GX-02 (Deci, Koestner & Ryan 1999 meta-analysis); §8 CC-01–CC-07 (malu/face cluster, cross-ref Agent 32)
- **Section:** §10.3, §10.9
- **Priority:** HIGH — NON-NEGOTIABLE
- **Notes:** Hanus & Fox (GX-01) demonstrate in a semester-long controlled study that gamified classrooms with leaderboards produce significantly lower intrinsic motivation, lower enjoyment, and lower performance than non-gamified controls; the leaderboard was identified as the primary damage mechanism through social comparison anxiety. Deci et al. (GX-02, 128 studies) establish that contingent expected rewards reliably undermine intrinsic motivation. For Indonesian learners, the §8 CC-cluster (cross-ref Agent 32) adds a second independent damage mechanism: malu/face-loss threat activated by public ranking. The double-harm structure (SDT damage + malu activation simultaneously) makes public leaderboards particularly contraindicated for this learner population.

---

## FEATURE: Streak Framing — Achievement Only, Never Threat

### Decision: Streak mechanics must use achievement framing ("You have studied 30 consecutive days") rather than controlling framing ("Don't break your streak"); a single missed day must not be presented as a reset

- **Evidence:** GX-02 (Deci et al. 1999 contingent reward undermining), GX-03 (Lepper et al. 1973 overjustification); HB-02 (Lally et al. 2010 — 66-day mean, single lapse does not reset habit)
- **Section:** §10.3, §10.6, §10.9
- **Priority:** HIGH
- **Notes:** Deci et al. (GX-02) establish that the undermining effect of external rewards occurs specifically when rewards signal external control rather than informational competence feedback. The framing of a streak counter — not its existence — determines whether it produces the undermining effect. Loss-aversion (§10.9, Kahneman & Tversky 1979) can be leveraged for motivation only if the streak is not designed to be anxiogenic: no countdown timers, no red warnings, no "DANGER" visual design. Lally et al. (HB-02) empirically demolish the "missed day = reset" design philosophy: automaticity scores continue their trajectory after single-day misses. A re-engagement message within 24 hours of a missed day is appropriate; visual punishment of the miss is not.

---

## FEATURE: Progress Visualization as Primary Gamification Element

### Decision: Progress visualization (words learned count, mature cards count, review consistency, sector vocabulary coverage) must be the primary gamification mechanism; it takes priority over all PBL elements

- **Evidence:** GE-02 (Mekler et al. 2017 — competence feedback increases both performance AND intrinsic motivation), GM-02 (Sailer et al. 2017 — performance graphs → autonomy + competence)
- **Section:** §10.4, §10.9, §13.7 (Decision 12)
- **Priority:** HIGH
- **Notes:** Mekler et al. (GE-02) component-level experimental study is the clearest available evidence: points, levels, and leaderboards increase task performance but not intrinsic motivation; only competence feedback (progress information in informational, non-competitive format) increases both. Sailer et al. (GM-02) confirm that performance graphs — the most direct implementation of progress visualization — satisfy autonomy and competence needs simultaneously. Progress metrics must be self-referenced (mastery-based comparison), not peer-referenced (performance-based comparison); Murayama et al. (GX-05) establish that this distinction determines whether social comparison is safe or harmful. Dashboard: total reviews, mature card count, streak, sector completion — not accuracy rate as primary metric.

---

## FEATURE: SDT Triad Compliance Check Before Any New Gamification Element

### Decision: Before implementing any new gamification element, it must be evaluated against all three SDT needs (autonomy, competence, relatedness); elements that cannot be mapped to at least one need are excluded

- **Evidence:** GE-04 (Van Roy & Zaman 2018 longitudinal — need-supportive sustains, need-thwarting collapses at week 8–10); GM-02 (Sailer et al. 2017)
- **Section:** §10.4, §10.9
- **Priority:** HIGH
- **Notes:** Van Roy & Zaman (GE-04) provide the longitudinal empirical confirmation of SDT prediction: need-supportive gamification maintains motivation across 10 weeks; need-thwarting gamification collapses below baseline by weeks 8–10. This is the critical temporal finding — the collapse happens precisely in the engagement window after novelty effects decay. For each element: Does it support autonomy (meaningful choice, non-coercive)? Does it provide competence feedback (informational progress, mastery signal)? Does it support positive relatedness (shared achievement, not competitive ranking)? Cross-reference: §10.2 meta-analysis evidence that gamification effects decay from g=0.68 (short-term) to g=0.35 (long-term); SDT-aligned gamification is the evidence-based mitigation.

---

## FEATURE: Gamification as Onboarding Tool Only — Habit Formation Takes Over After Week 8

### Decision: Gamification elements are designed for onboarding and habit seeding (weeks 1–8); after habit formation begins, gamification plays a supporting rather than primary retention role

- **Evidence:** GM-03 (Bai et al. 2020 meta-analysis: short-term g=0.68, long-term g=0.35); HB-02 (Lally et al. 2010 66-day habit timeline)
- **Section:** §10.2, §10.6, §10.9
- **Priority:** HIGH
- **Notes:** Bai et al. (GM-03) document the novelty decay: educational gamification effects are nearly twice as large in the first 4 weeks as they are after month 1. Relying on gamification as the primary retention mechanism for a months-to-years learning arc is an evidence-free design strategy. Habit formation science (§10.6) — specifically the Fogg Behavior Model (HB-09: Behavior = Motivation × Ability × Trigger) — establishes that all three components must be optimized simultaneously. After the habit solidifies (~66 days mean, HB-02), the Trigger (notification) + Ability (frictionless UX) components sustain behavior without the same motivational scaffolding requirement. Gamification's role shifts from motivation generation to progress reinforcement.

---

## FEATURE: Surprise/Unexpected Achievements vs. Expected Rewards

### Decision: Milestones and achievement badges should be designed as unexpected rewards where possible; the specific criteria should not be communicated in advance

- **Evidence:** GX-02 (Deci et al. 1999 — unexpected rewards do not produce the undermining effect), GX-03 (Lepper et al. 1973 expected vs. unexpected condition)
- **Section:** §10.3
- **Priority:** MEDIUM
- **Notes:** Lepper et al. (GX-03) classic study distinguishes expected reward (undermines intrinsic motivation) from unexpected reward (does not). Deci et al. (GX-02) confirm: the undermining effect is specific to rewards that are "tangible, expected, and contingent." A surprise achievement badge — triggered by a threshold the user was not tracking — functions as an informational competence signal rather than a contingent controlling reward. This design pattern ("surprise achievement") provides the positive feedback value without the motivational cost.

---

## FEATURE: Neutral Visual Design for "Again" Button and Error States

### Decision: The "Again" button must use neutral visual design (no red X, no error count display as primary metric); failure attribution in all messaging must be algorithmic/informational rather than evaluative

- **Evidence:** ID-34 (Haimovitz & Dweck 2016 — failure framing as cultural transmission), ID-19 (Ehrman 1999 ego boundaries and error sensitivity); AL-19–AL-20 (Ehrman; Arnold & Brown)
- **Section:** §13.5, §13.7 (Decision 11), §17.6
- **Priority:** HIGH
- **Notes:** Haimovitz & Dweck (ID-34) establish that framing failure as "something bad happened" vs. "a signal to try harder" is a transmissible cultural norm that can be strengthened or weakened by system design. The statistics dashboard must lead with mature card count before accuracy percentages. Post-session summary format (§13.7 Decision 14): "You reviewed X cards. Your interval for this card increased because you answered correctly — not by chance." All error messages: "This card needs more practice — the system is adjusting its schedule" rather than any variant of "Wrong" or failure counting. Cross-reference: FSRS failure feedback ego threat decision matrix (§17.6).

---

## 8. UX / ACCESSIBILITY

---

## FEATURE: Private Mode as Non-Negotiable Default

### Decision: All review practice is private by default; error displays are visible only to the FSRS algorithm, never to other users or publicly

- **Evidence:** ID-01 (Horwitz et al. 1986 FLCA — fear of negative evaluation), ID-07 (Zhang 2019 meta-analysis r = −.33 FLCA/performance); §8 CC-01–CC-07 (malu, cross-ref Agent 32)
- **Section:** §13.1, §13.7 (Decision 1)
- **Priority:** HIGH — NON-NEGOTIABLE
- **Notes:** Zhang (ID-07, 95 studies, N=8,712) quantifies the FLCA–performance relationship at r = −.33 — a medium-to-large effect. The fear of negative evaluation component of FLCA (Horwitz et al. ID-01) is specifically activated by public error visibility. Young (ID-05) identifies elimination of unnecessary public evaluation as the highest-priority low-anxiety design intervention. For Indonesian learners, the malu/face cluster (§8 CC, Agent 32) provides a second independent theoretical grounding for the same decision. The private-mode default addresses both simultaneously. This is a design decision that also creates a pedagogically unique value proposition: the SRS review environment is structurally the safest space to make — and learn from — the keigo calibration errors that would be professionally costly in the workplace (§14.3).

---

## FEATURE: No Countdown Timer in Review Sessions

### Decision: Review sessions must not include countdown timers or time-pressure elements

- **Evidence:** ID-02 (MacIntyre & Gardner 1994 FLCA cognitive effects), ID-01 (Horwitz et al. 1986 test anxiety component)
- **Section:** §13.1, §13.7 (Decision 2)
- **Priority:** HIGH
- **Notes:** Timer-based review is a test anxiety inducer — the second component of FLCA's three-component structure (Horwitz et al. ID-01). MacIntyre & Gardner (ID-02) demonstrate that FLCA not only reduces motivation but produces measurable cognitive processing degradation: slower input retrieval, WM capacity occupied by self-monitoring anxiety. A timer directly activates this degradation pathway. This decision also aligns with the CM-23 (Stockwell & Hubbard) self-pacing principle and the SDT autonomy-need requirement. For the SSW learner operating in 20–40 minute fragmented windows, timer pressure is particularly counterproductive.

---

## FEATURE: Micro-Session Card Design

### Decision: Individual cards must be reviewable in 10–20 seconds each; daily deck limits must permit sub-5-minute sessions on low-due-card days

- **Evidence:** CM-23 (Stockwell & Hubbard 2013 micro-session principle), CM-19 (Duman et al. 2015 churn rates)
- **Section:** §16.6
- **Priority:** HIGH
- **Notes:** Stockwell & Hubbard (CM-23) identify micro-session compatibility — designing for 2–5 minute independent review windows — as a predictor of long-term engagement in MALL contexts. Duman et al. (CM-19) document that 50–70% of mobile language app users are effectively inactive by week 4; micro-session design reduces the activation barrier that contributes to this churn. An SRS card reviewable in 10–20 seconds enables a 20-card session within the recommended 5-minute window. Cards that require more than 20 seconds of processing per item (complex grammar rules, multi-field forms) should be redesigned or split. Cross-reference: §17.6 mobile-first constraint (AnkiDroid ≤11 fields).

---

## FEATURE: Furigana Policy — Graduated Reduction Tied to JLPT Level

### Decision: Furigana enabled by default for N5–N4 learners; graduated reduction from N3 onward; full-kanji reading target at N2

- **Evidence:** ER-19 (Mori & Shimizu 2007 furigana bypass risk), ER-20 (Chikamatsu 1996 L1 orthographic transfer)
- **Section:** §4.7
- **Priority:** HIGH
- **Notes:** Mori & Shimizu (ER-19) document that furigana-reliant learners show significantly lower kanji form retention on delayed post-tests, even when immediate comprehension scores are comparable. Chikamatsu (ER-20) explains the mechanism: Indonesian-background learners (alphabetic L1) default to phonological recoding — using furigana/kana as primary access route — rather than processing kanji as whole semantic units. This processing route is ultimately less efficient for kanji-dense authentic text. The graduated reduction strategy — tied to SRS mastery milestones — addresses the furigana dilemma: phonological scaffolding that enables comprehension access in the short term without permanently suppressing kanji acquisition. Cross-reference: §11 phonological perspective (SLM) provides a complementary justification for the same policy from the phonological processing angle.

---

## FEATURE: AnkiDroid / Low-End Android Performance Constraints

### Decision: Audio ≤64kbps AAC; card images ≤100KB; no JavaScript in card templates; note model fields ≤11

- **Evidence:** §8 MALL cluster (cross-ref Agent 32 §8.10.3 StatCounter: Android 88.7%); CM-05 (Sung et al. 2016 mobile access inequality)
- **Section:** §17.6
- **Priority:** HIGH — PLATFORM CONSTRAINT
- **Notes:** The target demographic is Indonesian SSW applicants, for whom low-end Android devices represent the primary (often only) computing platform. These are not secondary constraints to be addressed post-launch — they are primary design requirements that determine whether the deck functions at all on the intended user's hardware. JavaScript in card templates is an AnkiDroid incompatibility; exceeding field count limits causes rendering failures. These constraints must be validated against each new card type before deployment.

---

## FEATURE: Notification Design — Opt-In, Achievement Framing, Consistent Timing

### Decision: Push notifications must be opt-in, use achievement framing ("Your review cards are ready"), and be consistently timed to support habit cue formation

- **Evidence:** HB-01 (Wood & Neal 2007 context-dependent habits), HB-09 (Fogg 2009 Trigger component); GX-02 (Deci et al. 1999 — controlling framing undermines motivation)
- **Section:** §10.5–§10.6, §10.9
- **Priority:** HIGH
- **Notes:** Wood & Neal (HB-01) establish that habits require consistent cues — an inconsistently timed notification fails to build the cue-behavior association that makes daily review automatic. Achievement framing ("Cards ready!") vs. threat framing ("You haven't reviewed today!") is the difference between an informational trigger and a controlling external pressure (GX-02). The Fogg Behavior Model (HB-09) identifies Trigger as a necessary component alongside Motivation and Ability — if any component is absent, the behavior does not occur. For mobile-first Indonesian learners (§10.5), the notification is the most powerful available cue; its design must maximize habit-building value while avoiding the controlling-reward pitfall.

---

## 9. CONTENT SEQUENCING

---

## FEATURE: JLPT N4 (~1,500 Word Families) as ER Readiness Threshold

### Decision: Structured ER with graded readers is introduced at N4 SRS mastery milestone; below N4, ER is available but not recommended as a primary mode

- **Evidence:** ER-26 (Hirsh & Nation 1992), ER-21/ER-09 (Nation & Wang 1999), ER-18 (Robb & Kano 2008)
- **Section:** §4.7
- **Priority:** HIGH
- **Notes:** Hirsh & Nation (ER-26) establish that ~2,000 word families are required for 95% coverage of unsimplified text; graded readers are simplified, so the threshold shifts down to ~1,500 word families (N4 level). Robb & Kano (ER-18) document the failure condition: learners who began ER without vocabulary readiness showed substantially lower acquisition than those who built vocabulary first. Nation & Wang (ER-21/ER-09) demonstrate that encounter rates in graded readers below Level 4 are too low for incidental acquisition to be efficient — confirming that below ~3,000 word families, SRS delivers encounter density that ER cannot match. The in-app "ER Ready" milestone indicator should be triggered at N4 SRS mastery. The reading ladder (N5→N4 SRS → Level 1–3 graded readers → NHK Web Easy → manga → novels) should be visually communicated.

---

## FEATURE: SRS ↔ ER Time Allocation Advisory

### Decision: Study balance recommendations: below N4 = SRS-primary; N4 = introduce ER at ~30% study time; N3–N2 = ER at 40–50%; above N2 = ER-dominant with continued SRS maintenance

- **Evidence:** ER-22 (Waring & Takaki 2003), ER-25/ER-11 (Pigada & Schmitt 2006), BC-02 (Webb & Nation 2017 SRS-ER threshold, cross-ref §1.12)
- **Section:** §4.7
- **Priority:** MEDIUM
- **Notes:** Waring & Takaki (ER-22) establish the core complementarity: ER consolidates partially-known vocabulary far more effectively than novel-encounter vocabulary, making SRS-then-ER the optimal sequence. Pigada & Schmitt (ER-11) confirm at the micro level: ER produces the greatest gains on words already partially encoded through deliberate study. The time allocation figures are advisory — Takase (ER-23) establishes that learner self-selection of texts and self-pacing in ER predicts sustained engagement; mandatory time splits would violate the autonomy principle (CM-23). The study balance indicator in the learning dashboard is advisory.

---

## FEATURE: PT Stage Gate for Grammar Cards

### Decision: Grammar cards for PT Stage N+2 structures (relative clauses, conditionals, causatives) must not be introduced before Stage N accuracy is established; JLPT level tags serve as the primary stage-gate proxy

- **Evidence:** GA-01 (Pienemann 1998 Processability Theory), GA-06 (Kawaguchi 2005 Japanese PT)
- **Section:** §2.1–§2.3
- **Priority:** HIGH
- **Notes:** Pienemann's Teachability Hypothesis predicts that instruction on structures two or more stages ahead of current interlanguage is ineffective for acquisition — the instructed form may be memorized as a formula but will not be productively acquired (GA-14, Pienemann 1989). JLPT level encoding already partially reflects PT stages: N5–N4 ≈ PT Stage 2–3; N3 ≈ Stage 4–5; N2–N1 ≈ Stage 5–6. Grammar cards should include explicit prerequisite metadata: a card for 〜させてもらう (Stage 5) should mark its dependencies — て-form (Stage 3–4), 〜てもらう (Stage 4), causative 〜させる (Stage 5). The て-form cluster is the critical acquisition pivot between Stage 3 and 4 (GA-13); it should be gated before any causative, passive, or conditional forms appear.

---

## FEATURE: Formulaic Chunks as Standalone Card Units

### Decision: High-frequency formulaic expressions (よろしくお願いします, お疲れ様でした, そういうことですか, keigo request frames) must be presented as holistic card units, not decomposed compositionally

- **Evidence:** GA-29 (Wray 2002 Formulaic Language and the Lexicon), GA-30 (Ellis N. 2001 chunking mechanism)
- **Section:** §2.6
- **Priority:** HIGH
- **Notes:** Wray (GA-29) documents that native speakers store and process formulaic sequences as retrieval units rather than constructing them compositionally in real-time — enabling fluent production that would be impossible if every utterance required full syntactic assembly from scratch. Ellis N. (GA-30) explains the cognitive mechanism: chunking through working memory repetition fuses frequently co-occurring sequences into single long-term memory representations. For SSW learners who must produce formulaic workplace register expressions (shift-report formulae, request structures, greeting protocols) in real-time under cognitive load, holistic chunk cards are directly functional. Cards for these items should not attempt to teach them via grammar rule; they should present them as vocabulary items with pragmatic context notes. Cross-reference: Goldberg (GA-28) type frequency argument supports providing multiple exemplars of construction patterns.

---

## FEATURE: Explicit vs. Implicit Grammar Format by PT Stage

### Decision: N5–N4 high-frequency grammar items should use meaning-focused (implicit) card formats; complex N3–N2 grammar structures (Stage 5+) benefit from explicit rule display at initial introduction

- **Evidence:** GA-15 (Spada & Tomita 2010 meta-analysis: explicit d=1.17 short-term for complex features, implicit d=0.70 long-term for simple features)
- **Section:** §2.3
- **Priority:** MEDIUM
- **Notes:** Spada & Tomita (GA-15, 41 studies) find that implicit instruction produces more durable acquisition of simple features; explicit instruction has larger short-term effects for complex features but greater decay. Applied to SRS: N5–N4 grammar patterns (particle は/が, て-form, basic verb conjugation) are acquired more durably through meaning-focused card formats (sentence-level comprehension, contextual production) than through rule-display formats. Stage 5+ structures (relative clauses, passive causative, conditionals) benefit from explicit rule display at initial introduction because the processing complexity exceeds what incidental noticing can accomplish. This does not mean grammar rule cards alone — the rule must always be embedded in a contextual sentence example.

---

## FEATURE: UC-First Phonological Contrast Sequencing

### Decision: Phonological contrast introduction should follow: UC-type contrasts (pitch accent, geminate duration) first → SC/CG-type contrasts (/r/ distinction, vowel length) later

- **Evidence:** PH-01 (SLM, Best & Tyler), PH-10 (PAM — SC type requires explicit instruction)
- **Section:** §11.1–§11.2, §11.7
- **Priority:** HIGH
- **Notes:** SLM predicts that "new" phonological categories (UC type: pitch accent, geminate consonant as duration-contrastive) are actually more trainable for Indonesian learners than "similar" categories (/r/ SC type) — because no L1 category interferes with formation of the new category. PAM adds: SC-type contrasts require explicit articulation instruction (not just audio exposure) because the L1 category actively overrides L2 perception. Sequencing pitch accent and geminate duration before /r/ explicit discrimination is counterintuitive (pitch seems "harder") but evidence-based. Pitch accent is introduced from N5 for habituation; /r/ discrimination cards with explicit "not Indonesian /r/" notes begin at N4.

---

## FEATURE: SSW Deck Two-Layer Architecture

### Decision: The SSW deck is structured in two distinct layers: Layer 1 = JFT-Basic/N4 general core vocabulary (~1,500 lemmas); Layer 2 = SSW sector-specific vocabulary (~300–500 items per major sector)

- **Evidence:** VS-01 (Hutchinson & Waters 1987 LSP target needs), VS-09 (Nation & Hwang 1995 general service/specialist boundary), VS-08 (Noyama 2012 JLPT–authentic communication gap)
- **Section:** §15.1–§15.3
- **Priority:** HIGH
- **Notes:** Nation & Hwang (VS-09) establish the lexical stratification principle: general service core covers ~87% of tokens; specialist vocabulary adds a further 3–5% of domain-specific content that is not efficiently acquired through the general core. Layer 2 cards must pass the West utility filter (VS-09): frequency within sector-specific contexts + additionality over N4 general core. Noyama (VS-08) provides the empirical grounding for why Layer 2 is necessary: EPA care workers who passed JLPT N3 still reported systematic communication failures in authentic care tasks. Layer 2 cards carry sector tags: `#kaigo`, `#shokuhin`, `#kensetsu`, `#nogyo`. The platform should communicate to users that JFT-Basic/N4 is the entry bar, not the functional workplace proficiency target.

---

## FEATURE: Pragmatic Cards as a Distinct Card Category

### Decision: Cards targeting pragmatic competence (keigo patterns, speech act formulae, conditions of use) are a distinct category from both vocabulary cards and grammar cards; conditions of use must appear on every pragmatic card

- **Evidence:** SC-15 (Kasper & Rose 2002 pragmatic development lags grammatical), SC-16 (Bardovi-Harlig 2001 explicit instruction necessary), SC-19 (Thomas 1983 sociopragmatic/pragmalinguistic failure)
- **Section:** §14.4–§14.5
- **Priority:** HIGH
- **Notes:** Kasper & Rose (SC-15) establish three robust generalizations about L2 pragmatic development: (1) it consistently lags behind grammatical development; (2) it is instruction-sensitive (immersion alone insufficient); (3) L1 pragmatic transfer persists even at advanced proficiency. Thomas (SC-19) establishes that sociopragmatic failure (wrong pragmatic choice for context) and pragmalinguistic failure (wrong form for intended speech act) require distinct pedagogical interventions. A pragmatic card must teach not only what to say but when, for whom, and under what social conditions. The conditions-of-use specification on every pragmatic card is the implementation of Kasper's (SC-17) finding that pragmatic transfer persists independent of grammatical accuracy: knowing the form does not automatically produce the knowledge of when to use it.

---

## FEATURE: Keigo Module as First-Tier Content in 介護 Deck

### Decision: Keigo vocabulary is a first-tier content category in the nursing care (介護) sub-deck — not supplementary material — comprising approximately 50–80 high-frequency register-marked patterns beyond standard JLPT N4 honorifics

- **Evidence:** VS-22 (Cook 2008 keigo as continuous indexical system), VS-24 (Ogawa 2012 EPA monitoring — systematic mismatch between examination keigo and authentic 介護 register demands)
- **Section:** §14.3, §15.5, §17.6
- **Priority:** HIGH
- **Notes:** Ogawa (VS-24) documents the systematic gap between examination-level keigo and the register competence required in authentic 介護 workplaces — EPA care workers who knew the forms failed to deploy them appropriately under real-time cognitive load and institutional pressure. Cook (VS-22) establishes that workplace keigo is not a rule system but a continuous indexical practice encoding institutional position in real-time. The 介護 deck must include: shift-report formulae, polite request structures for physical assistance contexts, title-based address forms for 利用者 (care recipients), and key boundary expressions for medical communication. Cross-reference: the double ego-threat architecture for SSW phonology (§17.6) — sounding foreign to Japanese interlocutors AND sounding strange to Indonesian self-monitors — applies equally to keigo register selection under workplace pressure.

---

## FEATURE: N5–N3 Recognition Format; N2–N1 Production Format

### Decision: Decks at N5–N3 should emphasize recognition-format cards; N2–N1 decks should include explicit production-format cards (Japanese → Indonesian recall)

- **Evidence:** §CA.7 JLPT assessment note (JLPT N5–N3 tests receptive knowledge; N2–N1 reading comprehension requires productive vocabulary knowledge); VD-09 (Webb 2008 — receptive:productive ratio 2.8:1 persists even in advanced learners)
- **Section:** §CA, §CA.10.2
- **Priority:** MEDIUM
- **Notes:** Webb (VD-09) establishes that receptive mastery does not automatically produce productive mastery — the gap persists at a 2.8:1 ratio even for advanced L2 learners. JLPT N5–N3 examinations test primarily receptive knowledge (reading and listening comprehension), justifying recognition-format card emphasis at those levels. N2–N1 reading comprehension requires inference from context that assumes productive lexical access; production-format cards (type-answer, Japanese → Indonesian blank-fill) must appear in N2–N1 decks. This is also the SRS translation of Spada & Tomita's (GA-15) finding that implicit-format cards produce more durable simple-feature acquisition, and explicit/production cards are necessary for complex features.

---

## FEATURE: Vocabulary Depth as Explicit Design Target — Not Implicit Outcome

### Decision: The deck explicitly targets four dimensions of vocabulary depth (morphological form knowledge, meaning associations, collocational behavior, contextual/register constraints) as named design goals, not as by-products of repetition

- **Evidence:** VD-01 (Read 2004 four-component depth taxonomy), VD-02 (Schmitt 2014 — depth independent predictor of reading comprehension), VD-03 (Qian 1999 — depth independently predicts 28% variance in reading comprehension)
- **Section:** §CA.10.1
- **Priority:** HIGH
- **Notes:** Qian (VD-03) provides the strongest empirical case: after controlling for vocabulary breadth, depth independently accounts for 28% of reading comprehension variance. Schmitt (VD-02) establishes that above ~3,000 word families, breadth ceases to be a differentiating predictor — depth is the remaining variable. Read (VD-01) provides the four-component taxonomy that maps directly to card features: (1) word parts (morphological family note) → card back; (2) meaning associations (semantic clustering, thematic grouping) → content sequencing; (3) collocational behavior (collocational note) → card back; (4) contextual constraints (register label, usage condition note) → card back and pragmatic card format. SRS alone (definition → recognition) builds breadth; all four depth dimensions require additional content architecture.

---

## 10. PLATFORM ARCHITECTURE

---

## FEATURE: Engagement Metrics Explicitly Separated from Learning Metrics

### Decision: The platform must distinguish engagement data (sessions completed, streak maintained, time on task) from learning data (FSRS retention curve accuracy, mature card count, delayed recall performance); methodology page and user dashboard must reflect this distinction

- **Evidence:** CM-06 (Burston 2015 — engagement/learning conflation is the primary MALL research failure); CM-03 (Plonsky & Ziegler 2016 — engagement metrics poor predictors of outcome at second-order meta-analysis)
- **Section:** §16.5, §16.6
- **Priority:** HIGH
- **Notes:** Burston (CM-06) identifies the engagement/learning conflation as the defining methodological failure of MALL research: 75% of positive MALL findings are engagement findings, not learning findings. Plonsky & Ziegler (CM-03) confirm at second-order meta-analytic level: self-reported engagement measures (time-on-task, session frequency, perceived enjoyment) are poor predictors of effect size, while structural task design variables (output requirement, feedback timing, spacing) are robust predictors. Nugget Nihongo's methodology page positioning should explicitly cite Burston (CM-06) to explain why the platform reports 30/90/180-day retention benchmarks rather than session completion rates.

---

## FEATURE: Investment Evidence Architecture — JLPT Countdown and Sector Completion Indicators

### Decision: The platform's progress architecture must include investment-evidence mechanisms: JLPT N4 countdown indicators, SSW sector vocabulary completion percentages, and milestone notifications framed as vocational capital accumulation

- **Evidence:** VS-16 (Norton identity and investment construct), VS-17 (Peirce 1995 investment vs. motivation), VS-18 (Darvin & Norton 2015 investment and capital)
- **Section:** §15.4
- **Priority:** HIGH
- **Notes:** Norton's investment model (VS-16) establishes that SSW learners experience motivational fluctuation not as trait instability but as rational response to uncertainty about return on investment. When the visa timeline is unclear or bureaucratically stalled, investment-evidence features — concrete, accumulated progress indicators that demonstrate the capital already accumulated — sustain engagement by making the investment ledger visible. Darvin & Norton (VS-18) frame L2 learning explicitly as accumulation of economic, social, and symbolic capital. Progress metrics must therefore function as investment receipts: "You have consolidated 847 vocabulary items. Your 介護 deck is 73% complete." This framing is not gamification — it is investment-evidence architecture grounded in adult motivation theory.

---

## FEATURE: "Add to Nugget" ER Flag-and-Continue Mechanism

### Decision: An in-reading tap-to-flag mechanism must allow learners to mark unknown words encountered during ER for entry into the SRS queue after the session, without interrupting reading flow

- **Evidence:** ER-24 (Bamford & Day 2004 — no mid-session dictionary lookup; defeats fluency-building purpose), ER-25/ER-11 (Pigada & Schmitt 2006)
- **Section:** §4.7
- **Priority:** MEDIUM
- **Notes:** Bamford & Day (ER-24) establish that requiring dictionary lookup during ER defeats the fluency-building purpose and violates the ER principle that reading must be its own reward. The flag-and-continue mechanism resolves this design tension: unknown words are marked without cognitive interruption (maintaining top-down processing flow), then queued for SRS review after the session closes the ER→SRS loop. Pigada & Schmitt (ER-25) provide the theoretical justification: words already partially established through SRS benefit dramatically more from ER encounters than words encountered cold. The mechanism turns ER from a parallel activity into an integrated component of the SRS→ER→SRS arc.

---

## FEATURE: CALL/MALL Design Axes — All Four Must Be Satisfied

### Decision: The platform must occupy the empirically supported position on all four structural design axes identified in the CALL literature: output demand, distributed scheduling, explicit feedback, self-pacing

- **Evidence:** CM-24 (Beatty 2010 four structural axes), CM-03 (Plonsky & Ziegler 2016 structural variables predict outcome)
- **Section:** §16.6
- **Priority:** HIGH
- **Notes:** Beatty (CM-24) identifies four independent design axes each with measurable outcome implications: (1) input richness vs. output demand — output demand is supported; (2) massed vs. distributed scheduling — distributed (FSRS) is supported; (3) explicit vs. implicit feedback — explicit corrective feedback is supported; (4) fixed vs. adaptive pacing — adaptive (learner-controlled, FSRS-scheduled) is supported. Plonsky & Ziegler (CM-03) confirm at second-order level that structural task design variables — not engagement features — are the robust predictors of CALL effect size. Nugget Nihongo currently satisfies all four axes architecturally; the risk is design drift if engagement features are added without evaluating whether they compromise any axis (e.g., social features that shift locus of control from learner-paced to platform-paced).

---

## FEATURE: Fogg Behavior Model — All Three Components Must Be Optimized Simultaneously

### Decision: Platform design must treat Motivation, Ability, and Trigger as co-equal requirements; optimizing only motivation (gamification) or only trigger (notifications) without ensuring Ability (frictionless UX) will not produce sustained behavior

- **Evidence:** HB-09 (Fogg 2009 Behavior = Motivation × Ability × Trigger)
- **Section:** §10.6
- **Priority:** HIGH
- **Notes:** Fogg's model (HB-09) is the integrative framework explaining why gamification-alone strategies fail: if Ability (UX friction, loading time, onboarding complexity) is not optimized simultaneously with Motivation and Trigger, the behavior threshold is not crossed even when motivation is high. For Nugget Nihongo, Ability optimization means: offline-capable PWA or AnkiDroid-native deck; smooth animations; sub-2-second load time; no mandatory account creation before first card review. Trigger optimization means: consistent, achievement-framed evening notification. Motivation optimization: content-intrinsic cultural depth + SDT-aligned progress visualization. All three components must be engineered to a high standard; a weak link breaks the behavior chain.

---

## CROSS-CONFLICT FLAGS FOR AGENT 2

The following potential conflicts between Part 2 decisions and Part 1 territory (§1/§5/§8/§9, covered by Agent 32) are flagged for Agent 2 resolution:

**⚠ FLAG A — Audio quality standard vs. §8 implementation notes:** §11 (HVPT) requires multi-speaker human-recorded audio as a non-negotiable condition for perceptual learning generalization. If §8's MALL cluster reached any different conclusion about audio production standards (e.g., TTS acceptable as a pragmatic compromise), the §11 position must take precedence and §8 should cross-reference §11.7 as the architectural specification.

**⚠ FLAG B — Evening notification default vs. §8 notification design:** §10.7 recommends evening notification window (19:00–22:00) based on sleep consolidation evidence (SL-03, SL-04). If §8 recommended a different default notification time, or established user-configurable notification time as the primary UX recommendation without specifying an evidence-based default, these need reconciliation. The §10.7 position should be the evidence-based default; user override is permitted per autonomy principles.

**⚠ FLAG C — Engagement-intrinsic visual richness vs. §9 seductive details risk:** §16.5 (Haugwitz et al. CM-18) establishes that engagement-generating features incidental to learning content can displace deeper processing — the MALL extension of §9's seductive details effect (CT cluster, Agent 32). If §9 or §8 recommended high visual richness for engagement purposes, Part 2 decisions require that visual content be content-intrinsic (thematically connected to the vocabulary item) and not merely decorative. This is a framing distinction, not a conflict.

**⚠ FLAG D — §4 ER-05 / BC-08 duplication:** The anti-duplication baseline (v10) flags Hu & Nation (2000) text coverage as potentially cited in both §4 (ER-05) and §1 (BC-08). Part 2 references use ER-05 in §4 contexts. Agent 38 is flagged for verification.

**⚠ FLAG E — Webb (2007) in §4 (ER-10) vs. §12 (OT-25–OT-30):** The anti-duplication baseline flags this potential cross-section duplicate. Part 2 uses ER-10 only in §4 contexts and VD-05 in §CA.10 contexts. If Agent 38 confirms Webb (2007) = ER-10 = OT-25 or OT-26, the §4/§CA.10 citations should be corrected to use a single ID.

---

## DECISION COUNT SUMMARY

| Feature Category | Decisions |
|---|---|
| 1. Card Front Design | 5 |
| 2. Card Back Design | 6 |
| 3. Audio Features | 7 |
| 4. Image Features | 1 |
| 5. Scheduling Algorithm | 6 |
| 6. Onboarding Flow | 6 |
| 7. Gamification Layer | 7 |
| 8. UX/Accessibility | 7 |
| 9. Content Sequencing | 10 |
| 10. Platform Architecture | 6 |
| **TOTAL** | **61** |

---

## SECTION COVERAGE MAP

| Section | Decisions Extracted | Primary Feature Categories |
|---|---|---|
| §2 Grammar | 3 | Card Front, Content Sequencing |
| §3 Listening | 2 | Audio Features, UX |
| §4 ER | 6 | Scheduling, Content Sequencing, Platform Architecture |
| §10 Gamification/Habit/Sleep | 10 | Gamification, Scheduling, Onboarding, UX |
| §11 Phonology | 10 | Card Front, Audio, Content Sequencing |
| §12 Output Theory | 2 | Card Back, Card Front |
| §13 Individual Differences | 9 | Onboarding, Gamification, UX, Scheduling |
| §CA / §CA.10 Curriculum / Vocab Depth | 5 | Card Back, Content Sequencing |
| §14 Sociolinguistics/Keigo | 5 | Card Front, Card Back, Content Sequencing |
| §15 SSW/Vocational | 4 | Content Sequencing, Platform Architecture |
| §16 CALL/MALL | 5 | UX, Platform Architecture |
| §17 Adult Learning | 7 | Audio, Scheduling, Onboarding, Content Sequencing |

---


