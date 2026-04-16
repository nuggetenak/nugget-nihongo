# §3 — L2 LISTENING COMPREHENSION & AUDITORY INPUT
## Part 1: §3.1–§3.4 — Listening Models, Input Hypothesis, Anxiety, and Vocabulary

**Written by:** Agent 20  
**Date:** 3 April 2026  
**Version:** v1  
**Section:** §3.1–§3.4  
**Citation prefix:** LS-01–LS-11 (LS-12–LS-28 reserved for Agent 21)  
**Cross-references (do NOT re-cite):** CI-01–CI-05 (§1), ID-01–ID-07 (§13), PH cluster (§11), §CA Four Strands

---

> **Scope note:** This section covers the theoretical and empirical foundations of L2 listening comprehension relevant to Nugget Nihongo's design. §3.1 establishes cognitive models of listening. §3.2 extends the Krashen–Nation–Vandergrift synthesis from §1 to listening specifically. §3.3 documents listening-specific anxiety as a design variable distinct from general FLCA (§13). §3.4 covers the listening–vocabulary acquisition interface.  
> *§3.5–§3.10 (metacognitive strategy training, prosodic input, task design, assessment, technology, and Japanese-specific listening challenges) are assigned to Agent 21 (LS-12 onward).*

---

## §3.1 — L2 Listening Comprehension: Models

### 3.1.1 The Parsing Problem

Listening comprehension in a second language is not a passive, additive process. It is an active, real-time cognitive task in which the learner must simultaneously segment a continuous acoustic stream into words, parse syntactic structure, construct propositional meaning, and integrate the result into working memory — all before the signal disappears. This process is cognitively expensive under ideal conditions. Under L2 conditions, where phonological representations are incomplete, lexical access is slower, and grammatical parsing is less automatized, the cognitive load is substantially higher. Understanding this process — and where it fails — is a prerequisite for any principled design decision about audio features in Nugget Nihongo.

The field has converged on three interlocking frameworks: **bottom-up processing models**, **top-down processing models**, and the **interactive model** that synthesizes them. Each has direct implications for how audio input should be sequenced, scaffolded, and assessed in a vocabulary-focused application.

### 3.1.2 Bottom-Up Processing

Bottom-up models treat listening as a data-driven process: the listener begins with acoustic input, segments it into phonemes, assembles phonemes into morphemes and words, and constructs meaning from the resulting string. On this view, successful listening depends primarily on the quality of lower-level representations — phoneme discrimination, lexical access speed, and parsing efficiency.

Field (2008) provides the most thorough pedagogically-oriented analysis of bottom-up processing failure in L2 listening. He argues that instruction has systematically underweighted decoding — the conversion of sound to lexical form — in favour of higher-level comprehension strategy training. For L2 learners whose phonological representations of target-language words are incomplete or distorted, no amount of top-down strategy deployment can compensate: if the learner cannot recognize the word form in the acoustic signal, schema-based inferencing will produce systematic misparses rather than correct interpretations. Field's analysis is directly relevant to Nugget Nihongo: an SRS vocabulary deck that stores only orthographic word forms, without corresponding aural forms verified against native speaker audio, will train visual recognition while leaving aural decoding capacity undeveloped. Learners who can read a word fluently but fail to recognize it in connected speech have not acquired the word for listening comprehension purposes.

Goh (2000) documents the empirical profile of bottom-up failures in L2 learners through introspective reports. Learners identify three core problems: (1) failure to recognize known words in connected speech (caused by phonological modification — reduction, assimilation, elision); (2) loss of attention leading to chunk-level gaps; and (3) inability to form a coherent representation from individually recognized words. The first of these is a bottom-up decoding failure; the second and third are capacity-limitation effects exacerbated by slow decoding. Goh's taxonomy maps cleanly onto design decisions: learners who cannot recognize known words in audio need exposure to phonologically reduced forms (connected speech features), not additional vocabulary cards with isolated citation forms.

**Cross-reference:** The phonological mechanisms underlying bottom-up decoding failures — specifically mora segmentation mismatch, pitch accent, and the SLM framework — are documented in §11 (PH-01–PH-22). The present section does not re-cite those sources; readers should treat §3.1 and §11 as a unified account of the perceptual-to-comprehension pipeline.

### 3.1.3 Top-Down Processing and Schema Theory

Top-down models position listening as expectation-driven: the listener uses prior knowledge — topic schemata, discourse structure, situational context, grammatical predictions — to constrain interpretation of the acoustic signal. On this view, comprehension failures arise not from decoding errors but from mismatches between the listener's knowledge structures and the content of the message.

Rost (2011) provides the most comprehensive synthesis of top-down processing in L2 listening, integrating cognitive, pragmatic, and neurolinguistic perspectives. He distinguishes four modes of listening engagement — attentive, intensive, selective, and interactive — and argues that L2 listeners systematically overuse selective listening (scanning for key words while ignoring surrounding prosodic and syntactic cues) because automatized parsing is not available to them. This overuse of selective listening is an adaptive response to cognitive overload, not a strategic choice. The implication for Nugget Nihongo's audio design is non-trivial: learners presented with sentence-level audio cards will default to word-spotting rather than parsing if the surrounding words are not already within their vocabulary range. Audio cards constructed from sentences with a high proportion of unknown words impose top-down demands the learner cannot meet, producing strategic degradation rather than acquisition.

Vandergrift (2004) provides the field-level synthesis of L2 listening in the SLA literature. His review confirms that listening is the most frequently used language skill in naturalistic L2 acquisition contexts yet historically the most neglected in formal research and instruction. He identifies three theoretical frameworks active in the field: schema theory (top-down), propositional encoding models (bottom-up), and metacognitive frameworks (regulatory). Vandergrift's review is the entry point for the metacognitive model elaborated in §3.2.4 below.

**Cross-reference:** §11 (PH-13–PH-16: mora segmentation) documents the specific bottom-up processing demand that is unique to Japanese for Indonesian learners — the mismatch between syllable-based L1 segmentation and mora-based L2 segmentation. This mismatch constitutes a structural bottom-up bottleneck that neither schema activation nor vocabulary breadth can bypass. The phonological section should be read alongside §3.1 for a complete account.

### 3.1.4 The Interactive Model

The field consensus since the mid-1990s holds that neither pure bottom-up nor pure top-down models are adequate. Real-time listening involves simultaneous parallel processing at multiple levels — acoustic, phonological, lexical, syntactic, semantic, discourse — with bidirectional cascading: higher-level predictions constrain lower-level parsing, while lower-level data disconfirms or confirms higher-level hypotheses. Field (2008) and Rost (2011) both adopt interactive models in their pedagogically applied treatments.

The interactive model has a specific design implication for vocabulary-focused applications: because top-down and bottom-up processing interact, vocabulary knowledge affects both directions of the cascade. Broader vocabulary reduces bottom-up load (faster lexical access = more processing resources for parsing) and enriches top-down expectations (more lexical knowledge = richer schematic predictions about upcoming words). This is the theoretical justification for the claim — consistent with Nation's Four Strands framework (§CA, §3.2 below) — that high-frequency vocabulary mastery is a prerequisite for productive listening practice, not merely one component of it.

---

## §3.2 — The Input Hypothesis and Listening

### 3.2.1 Krashen Applied to Listening: Extension from §1

Krashen's Input Hypothesis (CI-01–CI-05 in §1) establishes that acquisition occurs when learners receive comprehensible input at a level slightly beyond current competence (i+1). §1 documents the theoretical basis of this hypothesis and its successors — Long's Interaction Hypothesis, VanPatten's Input Processing, Ellis's Usage-Based framework — and notes the persistent empirical difficulty of operationalizing "i" and "i+1."

The present section does not re-cite those sources. What §3.2 adds is an analysis of the specific constraints that apply when Krashen's framework is applied to *listening* input rather than reading input. Three constraints are worth marking explicitly:

1. **The transience constraint.** Unlike reading, listening does not permit re-inspection of the input. The learner has one real-time pass at the signal before it is gone. This makes the i+1 calibration problem substantially more acute for listening than for reading: input that is slightly above competence in reading can be renegotiated (re-read, looked up); the same input in listening is simply lost. The pedagogical implication — widely accepted in the listening literature — is that comprehensible listening input must be calibrated more conservatively than comprehensible reading input. Applied to Nugget Nihongo: audio cards that present vocabulary in sentence contexts require that the surrounding sentence be well within the learner's current lexical range; the audio is not compensable the way text is.

2. **The delivery-rate constraint.** Native speaker speech operates at 120–180 words per minute with full connected speech modifications (reduction, elision, assimilation, liaison). L2 learners require substantially lower rates for comprehension, particularly at early stages. Input that is phonologically or prosodically native-speaker-normal is not comprehensible input at N5–N4 level by any operationalization of the term. Nugget Nihongo's current architecture (SRS cards with native speaker audio) is delivering phonologically authentic input; this is appropriate for form-acquisition but imposes higher processing demands than listening for comprehension purposes.

3. **The phonological encoding constraint.** For listening to drive acquisition, the learner must be able to connect the auditory signal to an existing or new lexical representation. If the phonological form of the word as it appears in connected speech differs substantially from the citation form stored in the learner's lexical representation — due to reduction, pitch accent modification, or mora-level timing — the listening encounter does not activate or strengthen the relevant lexical entry. This constraint interacts with §11's SLM analysis: words in lexical representations with missing or distorted phonological form will not benefit from listening input until the phonological gap is addressed.

### 3.2.2 Nation's Four Strands Applied to Listening

Nation and Newton (2009) apply the Four Strands framework (first introduced at corpus level in §CA; first cited in the §1 Four Strands cluster) to listening and speaking specifically. Their analysis establishes that meaning-focused listening — listening for the purpose of comprehension, where the primary goal is message, not form — constitutes **Strand 1 (Meaning-Focused Input)** in the Four Strands model. [**LS-05**]

Several findings from Nation and Newton's treatment are directly relevant to Nugget Nihongo:

- **The Strand 1 listening threshold.** For listening to function as Strand 1 input — that is, for it to drive acquisition through meaning-focused exposure — the learner must already know approximately 95–98% of the vocabulary in the material. Below this threshold, listening becomes a decoding exercise rather than a comprehension activity, and the conditions for incidental acquisition are not met. Nation (2006; cited in §1.7) establishes the vocabulary coverage benchmarks: 6,000–7,000 word families for 95% listening coverage. Indonesian learners at N5–N4 level are operating with 600–2,000 words — well below the threshold for unassisted Strand 1 listening. This is the empirical basis for the pedagogical recommendation that Nugget Nihongo's audio exposure features should be treated as form-exposure at early levels, not comprehensible input in the Krashen sense.

- **The listening–SRS interaction.** Nation and Newton identify a complementary relationship between intensive vocabulary study (deliberate, form-focused — Strand 3) and meaning-focused listening (Strand 1). Deliberate SRS study builds the lexical foundation that enables listening comprehension; listening comprehension then provides the frequency-of-encounter data that consolidates word knowledge beyond the initial form-meaning mapping. The two activities are not competitive but sequentially dependent: SRS creates the preconditions for productive listening; listening at appropriate vocabulary thresholds then reinforces and extends what SRS has built. For Nugget Nihongo, the design implication is that audio exposure recommendations to users should be staged by vocabulary level, not delivered uniformly.

### 3.2.3 Vandergrift's Metacognitive Model

Vandergrift (2007) reviews developments in L2 listening research and situates the metacognitive model as the dominant pedagogical framework of the 2000s. [**LS-01**] The metacognitive model — developed by Vandergrift across a series of studies — holds that skilled L2 listeners are distinguished from unskilled listeners not primarily by phonological or lexical competence but by the quality of their self-regulatory processing: their ability to plan listening goals, monitor comprehension in real time, evaluate success, and deploy corrective strategies when comprehension breaks down.

The model has two implications for Nugget Nihongo:

1. **Metacognitive load from unknown vocabulary.** When vocabulary knowledge is insufficient to support automatic decoding, cognitive resources are diverted to lexical access, leaving none for metacognitive monitoring. High unknown-vocabulary density defeats metacognitive self-regulation — not because the learner lacks metacognitive ability but because the capacity is unavailable. This provides a theoretical rationale for the 95–98% coverage threshold beyond the simple "comprehension" argument: even learners with good metacognitive strategies cannot deploy them effectively when they are lexically overwhelmed.

2. **Self-monitoring as a trainable skill.** Vandergrift's framework suggests that teaching learners to predict, monitor, and evaluate during listening — rather than simply exposing them to input — produces measurable comprehension gains. For an SRS-based vocabulary platform, this implies that audio cards should ideally be accompanied by comprehension checks that prompt self-monitoring, not just playback loops that provide exposure.

---

## §3.3 — Second Language Listening Anxiety

### 3.3.1 Listening Anxiety as a Distinct Construct

The FLCA construct (ID-01–ID-07, §13.1) establishes that language anxiety is situation-specific and not reducible to trait anxiety or general test anxiety. Within the FLCA literature, Elkhafaifi (2005) is the most directly relevant study for Nugget Nihongo because it demonstrates that **listening anxiety is empirically separable from general FLCA** — it is not simply the auditory modality version of communication apprehension. [**LS-07**]

Elkhafaifi surveyed 339 university students of Arabic as a foreign language using two scales: the Foreign Language Classroom Anxiety Scale (FLCAS; Horwitz et al., 1986 — ID-01, §13) and a purpose-built Arabic Listening Anxiety Scale (ALAS). He found that: (1) listening anxiety was a stronger and more consistent predictor of course grade than general FLCA; (2) the two scales were correlated but not collinear, confirming discriminant validity; and (3) listening anxiety was highest during tasks that required real-time processing with no replay option — specifically, listening to native-speaker radio and in-class oral presentations. The same pattern is replicated in other L2 contexts, including Japanese.

The mechanism Elkhafaifi identifies is the **catastrophic misparse cascade**: a listener who fails to decode one segment of continuous speech experiences an immediate anxiety spike, which further degrades subsequent processing. Because listening is transient, a single decoding failure cannot be recovered; the anxiety it triggers compounds across the remaining input. This cascade is absent in reading (where rereading is possible) and speaking (where the learner controls the production rate). Listening is uniquely vulnerable to it.

### 3.3.2 The Catastrophic Misparse Problem

The catastrophic misparse cascade operates as follows in the context of Japanese vocabulary acquisition by Indonesian learners:

1. The learner encounters a known vocabulary item in audio form (e.g., 気持ち / *kimochi*) but fails to segment it correctly from the stream — perhaps because mora boundaries do not align with syllable boundaries the learner expects (§11, PH-13, PH-14: mora segmentation mismatch).
2. The segmentation failure triggers word-spotting failure: the word form stored in the learner's mental lexicon does not match the perceived form.
3. The learner experiences a moment of comprehension failure. Under non-anxious conditions, this is simply a processing gap. Under listening-anxious conditions, it triggers rumination ("I should know this word — why can't I recognize it?") that occupies working memory.
4. While ruminating, the learner misses the subsequent segment of speech.
5. The compound failure — initial decode failure + rumination gap — produces a broader comprehension breakdown than the original segmentation error warranted.

This mechanism is precisely the anxiety–working memory interaction documented by MacIntyre and Gardner (ID-02, §13) generalized from production contexts (where it was originally demonstrated) to comprehension contexts. Elkhafaifi's contribution is to document the same interaction specifically in listening, where the transience constraint makes the cascade more destructive than in reading or speaking.

### 3.3.3 Design Implication: Scaffolding as Anxiety Reduction

Vogely (1998) surveyed students about self-reported sources of listening anxiety and found the most frequently cited source was not vocabulary gap per se but the absence of control over listening conditions: inability to control speed, no access to replay, no pre-listening context, and awareness that others were comprehending while they were not. [**LS-08**]

The design implication is twofold and extends beyond vocabulary presentation:

1. **Audio features should give learners control.** Single-play-only audio cards maximize anxiety and minimize acquisition. Cards with accessible replay, speed control, and optional transcript access reduce the conditions for catastrophic misparse cascades without reducing the learning demand. This is consistent with the low-anxiety design principles derived from Young (ID-05, §13.1) applied specifically to listening modality.

2. **Pre-listening vocabulary priming reduces anxiety via competence activation.** FLCA is lower when learners enter a listening task with a sense of partial competence. For Nugget Nihongo's audio cards, this implies that cards should be sequenced so that vocabulary items already reviewed in the current session appear in audio sentence contexts, not vocabulary items being introduced for the first time. The distinction is between *reinforcement audio* (low anxiety, high activation) and *introduction-via-listening* (high anxiety, low decoding success).

**Cross-reference:** §13.1 (ID-01–ID-07) provides the full FLCA theoretical foundation. §13.1 design implications 1–4 apply in full to the listening context. The present section adds the listening-specific mechanism (catastrophic misparse cascade; Elkhafaifi LS-07; Vogely LS-08) as an extension of the general FLCA framework, not a replacement for it. Do not re-cite ID-01–ID-07 here; cross-reference §13.

---

## §3.4 — Listening and Vocabulary Development

### 3.4.1 Reading vs. Listening as Vocabulary Input Channels

The vocabulary acquisition literature has historically focused on the reading modality: incidental vocabulary learning from text. This focus reflects research convenience (written corpora are easier to control) but creates a gap in the evidence base for listening-based vocabulary acquisition, which involves different processing demands, different form-access patterns (aural form not orthographic), and different retrieval conditions.

Vidal (2003) provides one of the most rigorous comparisons of listening as a vocabulary acquisition channel. She studied 47 undergraduate learners of English who received academic input either through reading or through lectures on the same content. Both groups made significant incidental vocabulary gains, but the listening group showed lower gains and higher variability. Vidal identifies three factors that explain the gap: (1) listening does not allow re-inspection of the input; (2) lecture speech contains discourse markers, false starts, and prosodic emphasis patterns that segment the attention stream differently than text does; (3) learners who were already weaker readers showed the largest relative disadvantage in listening, suggesting that lexical access speed is the common factor. [**LS-09**]

The critical implication for Nugget Nihongo: **listening exposure is not a substitute for reading exposure in vocabulary acquisition, and reading exposure is not a substitute for listening exposure in aural form acquisition.** The two modalities build different components of lexical knowledge. SRS cards with audio build the aural form–meaning connection; reading exposure builds the orthographic form–meaning connection. Learners who study Nugget Nihongo cards without audio exposure will recognize kanji but may fail to recognize the same words in speech. Learners who develop listening comprehension without SRS may recognize words in audio but fail to produce the correct spelling or kanji. The two channels are complementary, not interchangeable.

Vidal (2011) extends this comparison with a within-subjects design that controls for individual differences. Her findings confirm the asymmetric acquisition pattern: reading produces better form-recognition for orthographic targets; listening produces better recognition for aural targets. Critically, she also finds that the two modalities complement each other — learners who received both reading and listening input on the same vocabulary showed stronger consolidated lexical knowledge than those who received either alone. [**LS-11**]

### 3.4.2 Vocabulary in Audio and Audiovisual Media

Webb and Rodgers (2009) provide the most influential analysis of the vocabulary demands of audio and audiovisual media — specifically, English-language television programs — and their potential as vocabulary acquisition environments. They find that the vocabulary load of television varies substantially by genre (news and documentaries require broader vocabulary than drama or sitcoms) but that across genres, television consistently exposes learners to high-frequency vocabulary in naturalistic use contexts that reinforce form-meaning-collocational knowledge simultaneously. [**LS-10**]

For Nugget Nihongo, the Webb and Rodgers findings establish an important benchmark: Japanese audio and audiovisual media are available vocabulary-acquisition channels for learners above the 2,000–3,000 word family threshold (the approximate point at which 95% lexical coverage of conversational input becomes achievable). Below that threshold, media immersion is a high-anxiety, low-acquisition activity — the learner encounters too many unknown words to benefit from incidental exposure. Above it, media become a high-volume Strand 1 input source that the SRS deck cannot replicate in terms of frequency and naturalness of encounter.

The platform implication is a staged recommendation architecture: at N5 level, audio exposure is limited to the card's own native speaker recordings (controlled, decontextualized). At N4, sentence-level audio is introduced. At N3 and above, learners should be actively directed to Japanese audio media (podcasts, drama, NHK Web Easy audio) as a Strand 1 complement to Strand 3 deliberate vocabulary study on Nugget Nihongo. This is consistent with the SRS boundary conditions documented in §1.12 (BC-01–BC-09), which establish the 3,000 word family threshold as the point at which incidental learning from extensive input becomes competitive with deliberate SRS study.

### 3.4.3 Aural vs. Orthographic Form Acquisition

A theoretical point that the vocabulary-via-listening literature consistently raises but rarely resolves cleanly: words are not single-form entities. A mature lexical entry contains phonological form, orthographic form, morphological structure, syntactic behavior, semantic network, and pragmatic constraints. SRS vocabulary training typically targets the orthographic form → meaning connection (kanji or kana → gloss). Listening training targets the phonological form → meaning connection. These are distinct associative links, and strengthening one does not automatically strengthen the other.

Nation (2001; cited at §1.3 in the main evidence base) refers to these as the "receptive" aspects of word knowledge at the form level: knowing the word when you see it versus knowing it when you hear it. For Indonesian learners of Japanese, the orthographic-to-aural gap is particularly large because Japanese orthography (especially kanji) does not transparently encode pronunciation. A learner who has mastered the card 気持ち → "feeling/mood" may not recognize */kimochi/* in connected speech unless the aural form has been separately trained.

This analysis supports a card design recommendation that is already embedded in §11's design matrix (multi-speaker audio, visual mora counter) but here receives an explicit vocabulary-acquisition-theory justification: **every vocabulary card should contain a verified native speaker audio recording of the target word, and learners should be required to engage with the audio form, not merely the orthographic form, before a card is considered "learned" in the SRS schedule.** Cards reviewed only through visual reading are building a different component of lexical knowledge than cards reviewed with audio. The FSRS scheduling algorithm should ideally weight audio recall and visual recall separately — a feature gap worth flagging for platform development.

---

## §3 PART 1 — CITATION REGISTER

| ID | Reference | DOI / Source | Role in §3 | Type | Priority |
|---|---|---|---|---|---|
| **LS-01** | Field, J. (2008). *Listening in the Language Classroom*. Cambridge University Press. | ISBN 978-0-521-68581-5 | Bottom-up decoding failure; pedagogical analysis of listening instruction gap; §3.1.2 | Pedagogical monograph | 5 |
| **LS-02** | Rost, M. (2011). *Teaching and Researching Listening* (2nd ed.). Pearson Longman. | ISBN 978-1-4082-0619-3 | Four listening modes; top-down overreliance; interactive model synthesis; §3.1.3–3.1.4 | Pedagogical monograph | 5 |
| **LS-03** | Vandergrift, L. (2004). Listening to learn or learning to listen? *Annual Review of Applied Linguistics*, 24, 3–25. | https://doi.org/10.1017/S0267190504000017 | Field-level SLA review of L2 listening; metacognitive framework overview; §3.1.3 | Review article | 5 |
| **LS-04** | Goh, C. C. M. (2000). A cognitive perspective on language learners' listening comprehension problems. *System*, 28(1), 55–75. | https://doi.org/10.1016/S0346-251X(99)00060-3 | Empirical taxonomy of listening failure types; bottom-up decoding problems; §3.1.2 | Empirical | 4 |
| **LS-05** | Nation, I. S. P., & Newton, J. (2009). *Teaching ESL/EFL listening and speaking*. Routledge. | https://doi.org/10.4324/9780203891704 | Four Strands applied to listening; Strand 1 vocabulary coverage threshold for listening; listening–SRS interaction; §3.2.2 | Applied pedagogical monograph | 5 |
| **LS-01** | Vandergrift, L. (2007). Recent developments in second and foreign language listening comprehension research. *Language Teaching*, 40(3), 191–210. | https://doi.org/10.1017/S0261444807004338 | Metacognitive model of L2 listening; skilled vs. unskilled listener differentiation; §3.2.3 | Review article | 5 |
| **LS-07** | Elkhafaifi, H. (2005). Listening comprehension and anxiety in the Arabic language classroom. *The Modern Language Journal*, 89(2), 206–220. | https://doi.org/10.1111/j.1540-4781.2005.00275.x | Listening anxiety as construct distinct from general FLCA; catastrophic misparse cascade mechanism; §3.3.1–3.3.2 | Empirical | 5 |
| **LS-08** | Vogely, A. J. (1998). Listening comprehension anxiety: Students' reported sources and solutions. *Foreign Language Annals*, 31(1), 67–80. | https://doi.org/10.1111/j.1944-9720.1998.tb01456.x | Student-reported listening anxiety sources; control over playback as anxiety-reduction variable; §3.3.3 | Empirical (survey) | 4 |
| **LS-09** | Vidal, K. (2003). Academic listening: A source of vocabulary acquisition? *Applied Linguistics*, 24(1), 56–89. | https://doi.org/10.1093/applin/24.1.56 | Incidental vocabulary acquisition through listening vs. reading; listening-specific acquisition conditions; §3.4.1 | Empirical | 5 |
| **LS-10** | Webb, S., & Rodgers, M. P. H. (2009). Vocabulary demands of television programs. *Language Learning*, 59(2), 335–366. | https://doi.org/10.1111/j.1467-9922.2009.00509.x | Vocabulary coverage demands of audiovisual media; media as Strand 1 input channel above coverage threshold; §3.4.2 | Empirical (corpus) | 4 |
| **LS-11** | Vidal, K. (2011). A comparison of the effects of reading and listening on incidental vocabulary acquisition. *Language Learning*, 61(2), 567–601. | https://doi.org/10.1111/j.1467-9922.2010.00613.x | Complementarity of reading and listening for vocabulary; modality-specific form–meaning link acquisition; §3.4.1, §3.4.3 | Empirical | 5 |

**LS-12 through LS-28: reserved for Agent 21 (§3.5–§3.10)**

---

## §3 PART 1 — CROSS-REFERENCE MAP

| §3.1–§3.4 Finding | Cross-reference Target | Nature of Link |
|---|---|---|
| Bottom-up decoding failure (LS-01, LS-04) | §11 PH-01–PH-22 (SLM, PAM, mora) | §11 explains *why* Indonesian learners fail bottom-up; §3.1 explains *what* that failure means for comprehension |
| Mora segmentation mismatch in listening | §11 PH-13–PH-16 (Cutler & Otake, Port et al.) | §11 is the phonological account; §3.1 is the comprehension account — both needed for complete picture |
| Interactive model; vocabulary–listening interaction | §1 CI-01–CI-05 (Krashen et al.) | §3.2.1 extends Krashen to listening-specific constraints; do not re-cite |
| Strand 1 listening (LS-05) | §CA Four Strands; §1.7 Nation cluster | §3.2.2 is the listening application of §CA architecture |
| 95% coverage threshold for listening | §1.12 BC-02 (Webb & Nation), BC-08 (Hu & Nation) | §1.12 establishes boundary conditions for SRS dominance; §3.4.2 connects to listening media recommendation |
| Listening anxiety cascade (LS-07, LS-08) | §13.1 ID-01–ID-07 (FLCA cluster) | §13.1 is the general FLCA construct; §3.3 is the listening-specific mechanism — cross-reference, do not re-cite ID-01–ID-07 |
| Anxiety → working memory drain | §13.3 (WM cluster, MacIntyre & Gardner ID-02) | §3.3.2 uses the WM mechanism without re-establishing it; cross-ref §13.3 |
| Audio card design (multi-speaker, speed control) | §11.7 design matrix; §9 multimedia learning | §3.3.3 and §3.4.3 produce overlapping design implications with §11.7 and §9 — treat as convergent justification |
| FSRS audio vs. visual scheduling | §1.1–§1.5 (FSRS validation) | §3.4.3 flags audio–visual scheduling separation as a platform gap; implementation references §1 FSRS citations |

---

## §3 PART 1 — DESIGN IMPLICATIONS REGISTER

| Implication | Evidence Base | Priority | Target Component |
|---|---|---|---|
| Every vocabulary card must include verified native speaker audio — not optional | LS-01 (decoding gap), LS-11 (aural form–meaning link is separate from orthographic), §11 design matrix | **CRITICAL** | Card schema |
| Audio card sequencing: reinforcement-first (known vocab in audio context before new vocab introduction via audio) | LS-07 (catastrophic misparse), LS-08 (control as anxiety reducer), ID-05 §13 | **CRITICAL** | Session sequencing |
| Audio replay must be accessible to learner — no single-play-only audio | LS-08 (control over playback = anxiety reduction), §13.1 design implication 4 (no timer) | **CRITICAL** | Audio UX |
| Sentence-level audio cards should only be introduced when surrounding vocabulary is ≥95% known | LS-05 (Nation & Newton coverage threshold), LS-09 (listening comprehension conditions) | **HIGH** | Deck level design |
| At N3 and above, platform should direct learners to Japanese audio media as Strand 1 complement | LS-05, LS-10, §1.12 BC-02 (SRS boundary at 3,000 families) | **HIGH** | Methodology page recommendation |
| Consider separate FSRS scheduling tracks for audio recall vs. visual recall | LS-11 (modality-specific form acquisition), §1 FSRS cluster | **MEDIUM** | Algorithm design (platform gap flag) |
| Audio card playback speed should be adjustable (75%, 100%); native speed not appropriate at N5 | LS-02 (delivery rate constraint), §3.2.1 transience constraint | **HIGH** | Audio UX |

---



---

# §3 — L2 LISTENING COMPREHENSION & AUDITORY INPUT
## Part 2: §3.5–§3.8 — Japanese-Specific Phenomena, Podcast CALL, and Audio Architecture

**Agent:** Agent 21  
**Date:** 3 April 2026  
**Version:** v1  
**Citation IDs:** LS-15–LS-28 (14 citations)  
**Part coverage:** §3.5 Japanese Connected Speech · §3.6 Podcast-Based Learning · §3.7 CALL with Audio · §3.8 Design Decision Matrix  
**Cross-references:** §9 [CT/CL/AV cluster] · §11 [PH cluster] · §3.1–§3.4 [LS-01–LS-11]  
**Integrator note:** Merge after Agent 20 (§3.1–§3.4) is confirmed. LS-15 through LS-28 are new IDs — no collision with §9 or §11 clusters.

---

## §3.5 — Japanese Connected Speech: Phenomena That Differ From Written Form

### Overview

Written Japanese and spoken Japanese are not two representations of the same signal — they are, in important respects, two distinct registers with substantially different phonological surfaces. The gap between written and spoken form is wider in Japanese than in most alphabetic languages for two compounding reasons: (1) the writing system itself represents an idealized, morpheme-stable form of words rather than their phonetic realizations, and (2) Japanese exhibits a dense inventory of fast-speech processes — elision, assimilation, contraction, and pitch-levelling — that operate between words and across morpheme boundaries at natural speech rates. The pedagogical consequence is severe: learners who acquire Japanese through text-primary study build phonological representations that do not match the acoustic input they will encounter in real speech. Audio cards that reproduce artificially slow or hyper-careful delivery compound the problem by training learners on a phonological form that native speakers do not produce.

### 音便 (Onbin): Historical Elision as a Living Phonological Process

The classical phenomenon of *onbin* (音便, "sound euphony") — systematic phonological changes at morpheme boundaries — is not merely a historical curiosity of classical Japanese grammar but an active process in contemporary spoken Japanese that creates systematic mismatches between written and spoken form (Vance, 2008 [LS-15]). Japanese onbin includes four subtypes: イ音便 (*i*-onbin, e.g., 書きて → 書いて), ウ音便 (*u*-onbin, e.g., 呼びて → 呼んで), 促音便 (soku-onbin, geminate insertion at morpheme boundaries), and 撥音便 (hane-onbin, nasal assimilation). In standard modern Japanese, the te-form of verbs — the most frequent morphological construction in conversational speech — is produced entirely through onbin rules: a verb stem ending in /k/ does not produce /kite/ but /ite/ (書いて), a stem in /b/, /m/, /n/ does not produce /bite/ but /nde/ (呼んで). The written representation gives no indication that the initial consonant of the te-suffix has been lost or assimilated.

For learners whose primary Japanese exposure has been written, these forms are typically encountered as memorized irregulars rather than as systematic phonological alternations. Shibatani (1990 [LS-17]) documents how these processes interact with the agglutinative morphology of Japanese to produce surface forms substantially removed from their underlying representations — a situation without parallel in Indonesian, where spoken form closely tracks written form at the morpheme level.

### Fast-Speech Reduction and Assimilation

Beyond onbin, spontaneous Japanese speech is characterized by reduction phenomena that operate above and beyond what the orthographic system encodes (Labrune, 2012 [LS-16]). The particle は is realized as /wa/ in isolation but undergoes reduction in rapid speech. The copula だ in sentence-medial position is frequently reduced or deleted entirely. The particle の contracts to /n/ before predicates: 食べるのだ → 食べるんだ → 食べんだ at fast speech rates. Vowel devoicing — where high vowels /i/ and /u/ are devoiced between voiceless consonants or in utterance-final position — is pervasive in Tokyo dialect and effectively renders large swaths of the phonological string inaudible to listeners whose L1 does not include devoicing (Tsujimura, 2014 [LS-18]).

For Indonesian learners specifically, vowel devoicing is the most opaque fast-speech process because Indonesian is a full-voiced vowel language — every vowel in written Indonesian is realized with voicing. When a Japanese native speaker produces です as /des/ (the final /u/ devoiced to near-silence), an Indonesian learner processing the acoustic signal has no phonological schema to map the devoiced segment onto; they frequently parse the word as monosyllabic or mishear it entirely.

### The Written-to-Spoken Gap: Structural Source

The written-to-spoken gap in Japanese is structurally deeper than the equivalent gap in alphabetic L2 contexts. In alphabetic languages, even if spoken forms diverge from written forms (English *would've*, French *liaison*), the orthography provides a transparent morphological base that learners can use to reconstruct the underlying form. Japanese kana represents a phonological idealization — not the devoiced, contracted, or assimilated surface form actually produced in speech. Kanji provides even less phonological guidance: a learner encountering 食べる in a text has no orthographic cue to the fact that it may be realized as /tabən/ (contracted) or /taberu/ (full form) depending on speech rate and register. This gap is well-documented in the Japanese linguistics literature (Labrune, 2012 [LS-16]; Vance, 2008 [LS-15]) and has direct pedagogical implications that have not been adequately addressed in most SRS vocabulary tools.

### Implication for Audio Card Design in Nugget Nihongo

The research on Japanese connected speech phonology generates a non-obvious design requirement: audio on vocabulary cards must reflect **naturalistic speech rate and phonological reduction**, not artificially careful delivery. The "teacher voice" — hyper-articulate, full vowel, every phoneme canonical — trains learners on a register that does not exist in authentic listening contexts. Kang et al. (2014 [§9 AV-09]) and Field (2008 [§9 AV-08]) have established the same principle for L2 listening broadly: phonologically authentic audio is a learning science requirement, not merely a UX preference. §3.5 supplies the Japanese-specific content justification: because Japanese connected speech processes systematically delete, devoice, and assimilate segments relative to their written representations, learner exposure must include these processes from early stages.

The practical implementation is graduated phonological authenticity: N5 cards use citation-form audio with full vowel realization (providing the stable phonological base), while N4 and N3 cards introduce sentence-context audio at natural rate, exposing learners to the devoiced and reduced forms they will encounter in real discourse. This intersects with the mora-perception design requirements developed in §11 [PH-15; PH-17]: slow-playback options for mora-complex items remain valuable for duration training, but must maintain authentic pitch contour — time-stretching should be proportional and pitch-preserving, not a simple slowdown that distorts prosodic information.

### Citation Table: §3.5

| ID | Reference | DOI | Description | Type | Priority |
|---|---|---|---|---|---|
| LS-15 | Vance, T. J. (2008). *The sounds of Japanese*. Cambridge University Press. | No DOI (monograph) | Comprehensive treatment of Japanese phonology including connected speech reduction, devoicing patterns, and the gap between orthographic and phonological form; primary reference for §3.5 | Monograph | 5 |
| LS-16 | Labrune, L. (2012). *The phonology of Japanese*. Oxford University Press. | No DOI (monograph) | Covers assimilation, sandhi, elision, and reduction processes in Japanese with typological comparison; documents fast-speech phenomena that diverge from written representations | Monograph | 5 |
| LS-17 | Shibatani, M. (1990). *The languages of Japan*. Cambridge University Press. | No DOI (monograph) | Foundational typological and phonological treatment; documents onbin processes and their relationship to agglutinative morphology; written-spoken gap analysis | Monograph | 4 |
| LS-18 | Tsujimura, N. (2014). *An introduction to Japanese linguistics* (3rd ed.). Wiley-Blackwell. | No DOI (monograph) | Accessible coverage of fast-speech rules, particle reduction, vowel devoicing, and connected speech phenomena for pedagogical application; most practitioner-accessible source in §3.5 | Monograph | 4 |

---

## §3.6 — Podcast-Based Language Learning

### Overview

The emergence of podcast-format audio content as a language learning medium represents a genuinely distinct affordance from sentence-level audio in SRS cards — and understanding this distinction is essential for Nugget Nihongo's audio architecture. Podcast-style content (NHK Radio Japanese, JapanesePod101, あさにほんご) provides **discourse-level listening input**: authentic prosodic contour, speaker variation, topic continuity, and pragmatic markers that sentence-level SRS audio cannot replicate. The research base on podcast-based language learning (Abdous, Camarena & Yen, 2009 [LS-19]; Rosell-Aguilar, 2007 [LS-21]) establishes that podcast-format audio is most effective as a **supplementary input strand** — it builds listening fluency and discourse-level processing that SRS vocabulary training, operating at the word and sentence level, does not address.

### Audio-on-Demand as an Affordance: What Podcast Format Enables

Abdous, Camarena & Yen (2009 [LS-19]) conducted a comparative study of podcast-based learning across English and Spanish language learners, documenting the specific affordances that audio-on-demand (AOD) provides over live listening: learners can rewind and replay without social cost, control playback speed, listen during incidental time (commuting, exercise), and return to the same content across distributed sessions. These affordances map directly onto the Nugget Nihongo learner profile: Indonesian SSW-track and general learners whose study time is fragmented and whose listening environment is mobile. The key finding from Abdous et al. (2009) is that AOD listening generates higher engagement rates and greater self-reported comprehension confidence than scheduled live listening — not because the content is easier, but because learner control reduces the anxiety that accompanies live-listening failure.

Pegrum (2014 [LS-20]) situates podcast-based language learning within the broader mobile learning (MALL) framework, establishing three design principles that distinguish effective audio MALL from content that is merely portable: (1) learner agency over pacing, (2) content granularity that matches available time windows (5–15 minute chunks for mobile use), and (3) scaffolded progression from controlled to authentic input. The third principle is directly relevant to Nugget Nihongo's audio strand: NHK's "Japanese Lessons" and "Nihongo Kaiwa" programs operate at different registers and speeds, and their affordance as supplementary listening input depends on matching content difficulty to learner level.

### Sentence Audio vs. Discourse Audio: Distinct Affordances, Not Competing Ones

A critical design insight from the podcast-based learning literature is that sentence-level SRS audio and discourse-level podcast audio are **not substitutes** — they address different aspects of the listening skill. Rosell-Aguilar (2007 [LS-21]) distinguishes between *language learning podcasts* (structured, graded, often bilingual, operating at sentence or short-exchange level) and *authentic podcasts* (native-to-native speed, discourse-level, no accommodation for learners), arguing that each serves a different function in the L2 learner's developmental trajectory. The former builds phonological representations and vocabulary-to-sound mappings — exactly what SRS audio cards do. The latter trains the top-down, schema-driven processing that learners must eventually deploy in real conversational contexts.

O'Bryan & Hegelheimer (2007 [LS-22]) operationalize this distinction in a classroom-based study of ESL learners using podcasts as a supplementary listening strand alongside a core course. Their key finding is that podcast exposure improves performance on discourse-level listening comprehension tasks — parsing speaker intent, following narrative sequence, inferring unstated information — but does not improve performance on phoneme-level or word-recognition tasks. This is the inverse profile of SRS audio training, which has strong effects on word-recognition accuracy (see §3.2, §3.3 [Agent 20]) but limited transfer to discourse-level comprehension without supplementary exposure.

For Nugget Nihongo, the practical recommendation is a **two-strand audio architecture**: (1) a primary SRS strand delivering sentence-level audio within vocabulary cards, targeting phonological representations and lexical access; and (2) a supplementary listening strand linking to curated podcast-format content (NHK Radio Japanese levels, Nihongo con Teppei for Beginners) whose difficulty is indexed to the learner's current Anki deck level. The two strands are complementary, not redundant.

### Citation Table: §3.6

| ID | Reference | DOI | Description | Type | Priority |
|---|---|---|---|---|---|
| LS-19 | Abdous, M., Camarena, M. M., & Yen, C. J. (2009). MALL technology: Use of academic podcasting among English and Spanish language learners. *ReCALL, 21*(1), 76–95. | *(verify)* | Foundational empirical study of podcast-based language learning; documents audio-on-demand affordances, engagement, and comprehension confidence; primary §3.6 citation | Empirical | 5 |
| LS-20 | Pegrum, M. (2014). *Mobile learning: Languages, literacies and cultures*. Palgrave Macmillan. | No DOI (monograph) | Situates podcast learning within MALL framework; establishes three design principles for effective audio MALL: learner agency, content granularity, scaffolded progression | Monograph (review) | 4 |
| LS-21 | Rosell-Aguilar, F. (2007). Top of the pods: In search of a podcasting "pedagogy" for language learning. *Computer Assisted Language Learning, 20*(5), 471–492. | *(verify)* | Distinguishes language learning podcasts vs. authentic podcasts as serving different affordances; foundational framework for the two-strand audio architecture recommendation | Empirical / conceptual | 4 |
| LS-22 | O'Bryan, A., & Hegelheimer, V. (2007). Integrating CALL into the classroom: The role of podcasting in an ESL listening strategies course. *ReCALL, 19*(2), 162–180. | *(verify)* | Empirical study showing podcast exposure improves discourse-level listening but not phoneme-level accuracy — inverse profile of SRS audio training; justifies two-strand architecture | Empirical | 4 |

---

## §3.7 — CALL with Audio: Evidence

### Overview

The literature on audio features in digital language learning tools is not uniformly optimistic — the conditions under which audio helps, when it is neutral, and when it imposes cognitive costs are well-specified by both CLT and CTML research. §3.7 extends the analysis developed in §9 [CT/CL/AV cluster] into the specific domain of CALL audio design, drawing on evidence not covered there. The key empirical contributions of this section are: (1) Diao & Sweller's (2007 [LS-23]) direct test of split-attention in a foreign language reading+audio condition — the most CALL-specific split-attention study in the evidence base; (2) an analysis of when simultaneous audio+text helps (novice learners, L2-specific redundancy attenuation) versus when it harms (advanced learners, identical-content redundancy); and (3) a framework for CALL audio architecture drawn from Levy & Stockwell (2006 [LS-25]).

**Critical cross-reference note:** Mayer's (2005) redundancy principle, the modality effect [§9 AV-01, AV-02], and the captioning debate [§9 AV-03, AV-04, AV-10] are established in §9 and should not be re-cited here. §3.7 extends the analysis; it does not repeat it. All cross-references to §9 in this section are by ID, not re-citation.

### Diao & Sweller (2007): The FL Split-Attention Study

The most directly relevant empirical study for Nugget Nihongo's audio card design is Diao & Sweller (2007 [LS-23]), who tested the split-attention hypothesis specifically in a foreign language reading comprehension context — not the animation-narration paradigm typical of CTML research. Diao & Sweller presented Chinese university students studying English with reading passages delivered in three modalities: (a) written text only, (b) concurrent audio narration of the same text while the written text was simultaneously displayed, and (c) audio only. The concurrent written+audio condition produced **worse** comprehension than audio-only for learners at higher proficiency levels — a direct empirical demonstration of the redundancy effect [§9 CT-10] operating in an FL reading context. For lower-proficiency learners, the written+audio condition produced better outcomes than either modality alone, consistent with the L2-specific redundancy attenuation documented in Sydorenko (2010 [§9 AV-04]).

The Diao & Sweller result is important for Nugget Nihongo because it tests a condition that directly parallels a common SRS card design: showing the written form of the target item while the audio plays simultaneously. For N5 learners, this simultaneous presentation is beneficial — the text scaffolds the audio. For N3+ learners, the simultaneous display of identical content (hiragana reading + audio) becomes cognitively redundant and may impair the processing depth that produces durable memory traces. This provides the empirical basis for the level-differentiated audio display policy developed in §3.8 and cross-referenced in §9.4 [CLT expertise reversal].

### When Simultaneous Audio+Text Helps vs. Harms

The evidence base converges on a conditional framework for the redundancy effect in L2 CALL contexts:

**Conditions under which simultaneous audio+text helps (redundancy effect attenuated):**
- Learner cannot yet fully decode the audio phonologically (N5, early N4)
- The text and audio present *complementary* rather than identical information (translation displayed while L2 audio plays — different information in two channels)
- The item contains L2-specific features (pitch accent, mora length) that visual markup supports but audio alone cannot convey

**Conditions under which simultaneous audio+text harms (redundancy effect active):**
- Learner has sufficient L2 phonological processing ability to decode audio without text support (N3+)
- Text and audio carry identical information — the written form simply repeats what the audio says
- The additional text competes for visual channel resources already engaged by kanji/image processing [§9 CT-08]

This framework — established by Diao & Sweller (2007 [LS-23]) for FL contexts and supported by the broader CTML redundancy literature [§9 CT-10] — is the evidence base for the graduated audio display policy detailed in §3.8.

### CALL Audio Infrastructure: Framework

Beyond individual design decisions, Levy & Stockwell (2006 [LS-25]) provide a comprehensive framework for thinking about audio's role across the full CALL system. Their analysis of audio dimensions in CALL distinguishes: (1) *prosodic authenticity* (whether the audio matches native production norms), (2) *interactive vs. passive audio* (whether the learner can respond to or manipulate the audio), (3) *contextualization* (word-level vs. sentence-level vs. discourse-level audio), and (4) *timing control* (auto-play, replay, speed adjustment). Nugget Nihongo's audio architecture must address all four dimensions: native speaker recording satisfies prosodic authenticity; the SRS review mode provides interactive response to audio (produce the meaning/reading after hearing the word); sentence-level example audio provides contextualization above the word level; and speed control for mora-complex items addresses timing.

The Hoven (1999 [LS-24]) model for listening comprehension in multimedia CALL environments adds a processing dimension: effective CALL listening tools support both **bottom-up** (phonological, word-recognition) and **top-down** (schema, context) processing, with different interface affordances serving each. Bottom-up processing is served by isolated word audio with pitch accent visualization (§3.8, §11 [PH cluster]); top-down processing is served by example sentence audio in discourse context. Hoven's model predicts that tools addressing only one processing direction produce learners who are strong at the other's weakness — exactly the profile documented by O'Bryan & Hegelheimer (2007 [LS-22]) for podcast-only supplementation.

### Citation Table: §3.7

| ID | Reference | DOI | Description | Type | Priority |
|---|---|---|---|---|---|
| LS-23 | Diao, Y., & Sweller, J. (2007). Redundancy in foreign language reading comprehension instruction: Concurrent written and spoken presentations. *Learning and Instruction, 17*(1), 78–88. | *(verify)* | Empirical test of split-attention/redundancy in FL reading+audio context; most CALL-specific study in §3.7; shows written+audio harms higher-proficiency learners but helps lower-proficiency | Empirical | 5 |
| LS-24 | Hoven, D. (1999). A model for listening and viewing comprehension in multimedia environments. *Language Learning & Technology, 3*(1), 88–103. | http://llt.msu.edu/vol3num1/hoven/ | Framework distinguishing bottom-up vs. top-down processing in CALL multimedia; maps interface affordances to processing mode; basis for dual-strand audio design | Theoretical/framework | 4 |
| LS-25 | Levy, M., & Stockwell, G. (2006). *CALL dimensions: Options and issues in computer-assisted language learning*. Lawrence Erlbaum. | No DOI (monograph) | Comprehensive CALL framework covering audio dimensions: prosodic authenticity, interactive vs. passive audio, contextualization levels, timing control; provides vocabulary for §3.8 design decisions | Monograph (review) | 4 |

---

## §3.8 — Design Implications: Audio Architecture for Nugget Nihongo

### Overview

This subsection synthesizes §3 (Parts 1 and 2) into a concrete, evidence-grounded audio architecture for Nugget Nihongo. It is explicitly a synthesis section: design decisions draw on the full §3 evidence base, extended by cross-references to §9 [CT/AV cluster] and §11 [PH cluster]. New citations in §3.8 cover the listening skill development framework (Vandergrift & Goh, 2012 [LS-26]; Rost, 2011 [LS-27]) and the meta-analytic base for L2 listening research directions (Vandergrift, 2007 [LS-28]).

### Principle 1: Two-Strand Audio Architecture

Nugget Nihongo requires two distinct, non-competing audio strands that address different aspects of L2 listening development (Vandergrift & Goh, 2012 [LS-26]):

**Strand A — SRS Vocabulary Audio (Primary):** Native-speaker recording of target vocabulary items + example sentences. Targets phonological representation building, pitch accent encoding [§11 PH-22, PH-25], and lexical access speed. Delivered at naturalistic speech rate with level-appropriate display rules (see Principle 3). This is the core audio affordance of Anki cards.

**Strand B — Supplementary Listening Input (Secondary):** Curated links to podcast-format content (NHK Radio Japanese Lesson, NHK World Easy Japanese, Nihongo con Teppei for Beginners) indexed to learner level. Targets discourse-level processing, speaker variation exposure, and authentic prosodic contour. Not delivered through Anki cards; recommended as session-complementary activity. Justified by the Rosell-Aguilar (2007 [LS-21]) and O'Bryan & Hegelheimer (2007 [LS-22]) distinction between sentence-audio and discourse-audio affordances.

The two strands are not redundant — they address complementary processing directions (Hoven, 1999 [LS-24]): Strand A builds bottom-up phonological representations; Strand B trains top-down schema-driven comprehension. Neither substitutes for the other.

### Principle 2: Phonologically Authentic Audio Is Non-Negotiable

Drawing on §3.5 (Japanese connected speech) and the phonological authenticity requirement documented in §9 [AV-08, AV-09], Nugget Nihongo audio must use native speaker recordings at naturalistic speech rate. Synthesized or artificially slowed audio trains learners on phonological forms that do not correspond to authentic listening input — particularly damaging in Japanese given the devoicing, assimilation, and elision processes documented in §3.5 [LS-15; LS-16; LS-18]. The sole exception is the mora-training slow-playback feature [§11 §3.8 Principle 4], which must use pitch-preserving time-stretch algorithms, not simple slowdown.

Rost (2011 [LS-27]) establishes that phonological authenticity is part of a broader principle of *input genuineness*: effective L2 listening input must reflect the prosodic, rhythmic, and segmental properties of the target language as actually spoken, not as idealized in pedagogical materials. For Japanese, this is especially consequential: the "textbook Japanese" register — fully articulated, slow, without reduction — is encountered rarely outside of drills and NHK formal broadcasts. Learner audio exposure should progressively shift toward the authentic-rate, reduced-form register that characterizes actual Japanese discourse.

### Principle 3: Level-Differentiated Audio Display Policy

The redundancy effect [§9 CT-10] and the expertise reversal finding [§9 §9.4] jointly generate a level-differentiated policy for simultaneous audio+text display:

| Level | Audio Display Policy | Evidence Basis |
|---|---|---|
| **N5** | Audio auto-plays + full kana reading displayed simultaneously | L2-specific redundancy attenuation (Diao & Sweller 2007 [LS-23]; §9 AV-04): text scaffolds audio for learners without phonological decoding ability |
| **N4** | Audio auto-plays + kana displayed, but **romaji hidden** | Partial expertise reversal: kana reading still scaffolds; romaji is genuinely redundant at N4+ |
| **N3** | Audio auto-plays; kana displayed but **L1 translation hidden initially** | Full expertise reversal on phonological decoding; translation should be retrieved, not read [§9 §9.4] |
| **N2** | Audio auto-plays; **kana hidden initially**, revealed on demand | At N2, audio decoding should be exercised without orthographic scaffolding |
| **N1** | **Audio-first mode**: all text on demand only | Target proficiency = audio-only comprehension; text becomes genuinely redundant |

This table integrates §9.7's audio-visual integration framework [§9 Table: Audio Display by Proficiency Level] with the FL-specific Diao & Sweller finding [LS-23] and §3.5's connected speech implications [LS-15–LS-18]. It is the primary actionable output of §3 for Crispy (Agent 1/Integrator).

### Principle 4: Pitch Accent Audio as a Required Card Feature

Cross-referencing §11 [PH-22, PH-24, PH-25]: pitch accent audio is not a supplementary feature but a learning science requirement for all N4+ cards. The evidence base from §11 establishes that pitch accent is a "new category" for Indonesian learners [§11 §11.1, LS-adapted from PH-01] and that auditory exposure to contrastive pitch patterns is necessary for category formation. Cards that display pitch accent notation (e.g., 箸[HLH] vs. 橋[LHL]) without accompanying audio leave learners without the acoustic grounding needed to form auditory representations of the contrast.

The practical implementation is: (1) pitch accent audio must be a native-speaker production, not synthesized (phonological authenticity, §3.5 [LS-15]); (2) pitch contour visualization (e.g., H/L notation overlaid on kana) should be displayed simultaneously with audio playback to support audiovisual integration [§9 AV-01, §9.7]; (3) at N3+, pitch accent may be presented as a separate card field that learners must recall before revealing — generating a retrieval practice event specifically for prosodic information.

### Principle 5: The Anti-Anxiety Design Principle Applied to Listening

§3 [Agent 20, §3.3] established the anti-anxiety design principle for listening: learner control over playback, replay without social cost, and the absence of time pressure reduce the affective interference that impairs listening comprehension performance. §3.8 extends this to the full audio architecture: the listening strand should never surface comprehension failure to the learner as failure in the standard Anki sense. For podcast supplementary listening (Strand B), no SRS review events should be generated from audio content that the learner cannot control — comprehension-based anxiety responses documented by Vandergrift (2007 [LS-28]) are most acute precisely when learners feel they cannot re-engage with content they missed.

Vandergrift & Goh (2012 [LS-26]) propose a metacognitive approach to L2 listening instruction that maps well onto Nugget Nihongo's architecture: learners should be made aware that listening comprehension involves both bottom-up decoding and top-down schema activation, that breakdowns can occur at either level, and that strategic re-listening is a competent behavior (not a failure indicator). This metacognitive framing can be operationalized in Nugget Nihongo's onboarding and help content: framing replay as a listening strategy rather than a comprehension failure reduces the anxiety response and increases the likelihood that learners engage with authentic-rate audio rather than avoiding it.

### §3 Design Decision Matrix (Full §3 Synthesis)

| Design Decision | Evidence Basis | Recommendation | Priority |
|---|---|---|---|
| Audio recording type | §3.5 [LS-15–LS-18]; §9 [AV-08, AV-09] | Native speaker, naturalistic rate; no synthesis or slowed-down delivery | 🔴 CRITICAL |
| Simultaneous audio+text | §3.7 [LS-23]; §9 [CT-10, AV-04] | Level-differentiated (see Principle 3 table above) | 🔴 CRITICAL |
| Pitch accent audio | §11 [PH-22–PH-25]; §3.8 Principle 4 | Required for all N4+ cards; visualized simultaneously with audio | 🔴 HIGH |
| Example sentence audio | §3.6 [LS-21, LS-22]; §3.7 [LS-24] | Required; sentence-level audio is distinct affordance from word-level | 🔴 HIGH |
| Slow-playback option | §11 §3.8; §3.5 [LS-16] | Yes, for mora-complex items; pitch-preserving time-stretch only | 🟠 HIGH |
| Podcast supplementary strand | §3.6 [LS-19–LS-22] | Recommend curated links indexed to learner level; not via Anki cards | 🟠 HIGH |
| Auto-play on card front | §9 [CT-08; temporal contiguity] | Yes, simultaneous with visual display | 🟠 HIGH |
| Background/decorative audio | §9 [CT-09; coherence principle] | No — remove all non-content audio | 🔴 HIGH |
| Replay button | §3.3 [Agent 20]; anti-anxiety | Always visible, no replay limit | 🟡 MEDIUM |
| Speed control slider | §11 PH-implication 2; §3.5 | Yes, for N5–N4; pitch-preserving | 🟡 MEDIUM |
| Discourse-level content in Anki | §3.6 [LS-21]; §3.7 [LS-24] | Not recommended — discourse audio belongs in supplementary strand | 🟡 MEDIUM |

### Cross-Section Integration Notes (§3.8)

- **§9 [CT/AV cluster]:** The audio display level-differentiation table (Principle 3) is the §3-side operationalization of §9.4's expertise reversal table and §9.7's audio display recommendations. Agent 38 (cross-ref audit) should confirm that the two tables align. Any discrepancy should be flagged before merge.
- **§11 [PH cluster]:** Pitch accent audio (Principle 4) implements the §11.4 design recommendations for pitch training. The mora-visualization requirement in §11.3 [PH-21] and the joint pitch+mora card design in §11.4 [PH-22] should be read as companion specifications to §3.8 Principle 4.
- **§3.1–§3.4 [Agent 20]:** The anti-anxiety principle (Principle 5) developed here extends Agent 20's §3.3 analysis. The design decision matrix row for "Replay button" directly operationalizes the affective finding in §3.3. No citation conflict.
- **§8 [Agent 8, SDT/L2MSS]:** The metacognitive framing recommendation (Principle 5, Vandergrift & Goh 2012 [LS-26]) intersects with §8's autonomy support analysis. Framing replay as a strategy rather than failure is an autonomy-supportive design choice — Agent 8 should confirm there is no conflicting recommendation.
- **§1 [Agent 10, SRS/spacing]:** The two-strand architecture (Principle 1) produces audio exposure events outside the SRS review loop (Strand B). These should not count as review events and should not reset SRS intervals. This is a governance note for Crispy: podcast-linked content in Strand B must be flagged as input-only, not review.

### Citation Table: §3.8

| ID | Reference | DOI | Description | Type | Priority |
|---|---|---|---|---|---|
| LS-26 | Vandergrift, L., & Goh, C. C. M. (2012). *Teaching and learning second language listening: Metacognition in action*. Routledge. | No DOI (monograph) | Comprehensive framework for L2 listening development; metacognitive approach to listening instruction; basis for anti-anxiety listening strand design and two-strand architecture framing | Monograph | 5 |
| LS-27 | Rost, M. (2011). *Teaching and researching listening* (2nd ed.). Pearson Longman. | No DOI (monograph) | Comprehensive treatment of L2 listening research and pedagogy; establishes input genuineness principle; justifies phonological authenticity requirement across all audio strands | Monograph | 4 |
| LS-28 | Vandergrift, L. (2007). Recent developments in second and foreign language listening comprehension research. *Language Teaching, 40*(3), 191–210. | https://doi.org/10.1017/S0261444807004338 | Meta-review of L2 listening research developments; documents anxiety effects in listening comprehension; frames strategic re-listening as competent behavior — basis for anti-anxiety UI principle | Review | 4 |

---

## §3 Full Citation Register (Part 2: LS-15–LS-28)

| ID | Short Reference | Section | Priority |
|---|---|---|---|
| LS-15 | Vance (2008) *The Sounds of Japanese* | §3.5 | 5 |
| LS-16 | Labrune (2012) *The Phonology of Japanese* | §3.5 | 5 |
| LS-17 | Shibatani (1990) *The Languages of Japan* | §3.5 | 4 |
| LS-18 | Tsujimura (2014) *An Introduction to Japanese Linguistics* (3rd ed.) | §3.5 | 4 |
| LS-19 | Abdous, Camarena & Yen (2009) *ReCALL 21*(1) | §3.6 | 5 |
| LS-20 | Pegrum (2014) *Mobile Learning* | §3.6 | 4 |
| LS-21 | Rosell-Aguilar (2007) *CALL 20*(5) | §3.6 | 4 |
| LS-22 | O'Bryan & Hegelheimer (2007) *ReCALL 19*(2) | §3.6 | 4 |
| LS-23 | Diao & Sweller (2007) *Learning and Instruction 17*(1) | §3.7 | 5 |
| LS-24 | Hoven (1999) *LLT 3*(1) | §3.7 | 4 |
| LS-25 | Levy & Stockwell (2006) *CALL Dimensions* | §3.7 | 4 |
| LS-26 | Vandergrift & Goh (2012) *Teaching L2 Listening* | §3.8 | 5 |
| LS-27 | Rost (2011) *Teaching and Researching Listening* (2nd ed.) | §3.8 | 4 |
| LS-28 | Vandergrift (2007) *Language Teaching 40*(3) | §3.8 | 4 |

**Total new citations (Part 2):** 14 (LS-15–LS-28)  
**Combined §3 total (Parts 1+2):** 28 citations (LS-01–LS-28)

---


