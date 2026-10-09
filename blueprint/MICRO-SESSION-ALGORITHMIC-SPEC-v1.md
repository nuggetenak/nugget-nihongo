# NUGGET NIHONGO MICRO-SESSION ALGORITHMIC SPECIFICATION & CARD ARCHETYPE RECIPES
## Operational Blueprint for 5-to-7 Minute Mobile Learning Sessions, 6 Production Card Archetypes, and Dual-Track FSRS Latency Tuning (v1.0)

**Scope:** Cognitive Engineering, Mathematical Modeling of Working Memory Load, Mobile SLA Architecture, and SRS Algorithm Optimization  
**Target Architecture:** Nugget Nihongo Mobile Client & Core Spaced Repetition Scheduling Engine  
**Theoretical Anchors:**
- Cognitive Load Theory: Sweller (1988) [CLT-01], Sweller, van Merriënboer, & Paas (2019) [CLT-02]
- Working Memory Chunk Capacity Limits: Cowan (2001) [WM-02] ($4 \pm 1$ Working Memory Chunks)
- Mobile-Assisted Language Learning (MALL) Micro-Learning Constraints: Stockwell (2010) [MALL-01], Kukulska-Hulme (2009) [MALL-02]
- Skill Acquisition Theory & Proceduralization: DeKeyser (2007) [SLA-08], Anderson (1982) [SLA-09]
- Free Spaced Repetition Scheduler (FSRS) Core Algorithm: Ye et al. (2024) [SRS-05]
- Corrective Feedback & Morphosyntactic Prompts: Ellis, Loewen, & Erlam (2006) [EA-17], Lyster (2004) [EA-18]
- Contrastive L1 Interference & Metalanguage Scaffolding: Corder (1967) [EA-01], Maarif (2021 [EA-27], 2023 [EA-22]), Alifah et al. (2020) [EA-28]

---

## 1. MATHEMATICAL FORMULATION OF THE 5-TO-7 MINUTE SESSION

### 1.1 Cognitive Load & Working Memory Capacity Constraints
Human working memory under mobile learning conditions is severely constrained by divided attention, environmental distractions, and cognitive fatigue (Stockwell 2010 [MALL-01]). According to Cowan's embedded-processes model (Cowan 2001 [WM-02]), the capacity limit of the focus of attention is strictly:
$$K = 4 \pm 1 \text{ unintegrated chunks}$$

Under Sweller's Cognitive Load Theory (Sweller 1988 [CLT-01]; Sweller et al. 2019 [CLT-02]), total cognitive load $L_{\text{total}}$ at any instant $t$ is composed of three additive components:
$$L_{\text{total}}(t) = L_{\text{intrinsic}}(t) + L_{\text{extraneous}}(t) + L_{\text{germane}}(t)$$

Where:
- $L_{\text{intrinsic}}$ is determined by element interactivity (e.g., Japanese case particle argument structure vs Indonesian prepositional transfer).
- $L_{\text{extraneous}}$ must be engineered towards **near-zero** ($\approx 0$) through frictionless micro-UI, instant visual cues, and zero clutter.
- $L_{\text{germane}}$ is maximized for schema construction via explicit contrastive metalinguistic feedback.

To ensure $L_{\text{total}} \le K_{\text{working\_memory}}$, a Nugget Nihongo daily micro-session is capped at:
$$T_{\text{session}} \in [300\text{ s}, 420\text{ s}] \quad (5 \text{ to } 7 \text{ minutes})$$
$$N_{\text{new\_items}} \le 3 \text{ chunks per session}$$
$$N_{\text{review\_items}} \in [12, 18] \text{ cards per session}$$

---

### 1.2 Four-Phase Operational Choreography (The 7-Minute Recipe)

Every session executes a rigid, rhythmically sequenced four-phase progression designed to optimize neurobiological memory consolidation:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       TOTAL SESSION DURATION: 300 - 420 s                   │
├──────────────┬───────────────────┬──────────────────────┬───────────────────┤
│   PHASE 1    │      PHASE 2      │       PHASE 3        │      PHASE 4      │
│ RETRIEVAL    │  MICRO-CHUNK      │  ACTIVE PRODUCTION   │  METACOGNITIVE    │
│  WARM-UP     │  ACQUISITION      │      PRACTICE        │  CONSOLIDATION    │
│ (45 - 60 s)  │   (120 - 150 s)   │    (120 - 150 s)     │    (30 - 45 s)    │
├──────────────┼───────────────────┼──────────────────────┼───────────────────┤
│ • 3-4 Overdue│ • 2-3 New Chunks  │ • 8-12 Production    │ • Session Delta   │
│   FSRS Cards │ • Explicit L1 Gap │   Cards (Typing,     │   Stability Log   │
│ • Rapid Tap  │   Highlighting    │   Particle Slotting) │ • Diagnostic Trap │
│ • Reactivate │ • Multimodal      │ • Latency Stopwatch  │   Summary         │
│   Prior Day  │   Audio Priming   │   Gating (< 2000 ms) │ • Streak & Reward │
└──────────────┴───────────────────┴──────────────────────┴───────────────────┘
```

#### Detailed Phase Timing & Cognitive Allocations:

1. **Phase 1: Retrieval Priming & Warm-Up ($t \in [0, 60\text{ s}]$)**
   - **Target:** 3–4 mature cards due for review ($R \le 0.90$).
   - **Cognitive Purpose:** Reactivate existing lexical nodes in long-term memory; warm up phonological loop.
   - **Card Archetypes:** `speed_comprehension_blast`, `audio_speed_gate`.
   - **Pacing:** Maximum 15 seconds per card.

2. **Phase 2: Micro-Chunk Acquisition ($t \in [60, 210\text{ s}]$)**
   - **Target:** Exactly 2 (maximum 3) novel target items sharing a contrastive axis (e.g., *ni* vs. *de* with *sumu* vs. *hataraku*).
   - **Cognitive Purpose:** Schema construction. Present the stimulus, highlight the **L1 catastrophic interference trap**, play authentic audio at 1.0x native speed, and show the morphological frame.
   - **Card Archetypes:** `contrastive_pair_slot` (presentation mode), `collocation_chunk_builder`.

3. **Phase 3: High-Intensity Active Production Practice ($t \in [210, 360\text{ s}]$)**
   - **Target:** 8–10 mixed cards: testing the 2 newly introduced chunks alongside 6–8 critical interlanguage review items.
   - **Cognitive Purpose:** Proceduralization (DeKeyser 2007 [SLA-08]). Forcing retrieval effort via typing prompts (Ellis et al. 2006 [EA-17]) rather than passive recognition.
   - **Card Archetypes:** `production_type_cloze`, `pragmatic_register_pivot`, `contrastive_pair_slot`.
   - **Dynamic Feedback:** Immediate error-classification trigger if learner falls into an Indonesian L1 false equivalence trap.

4. **Phase 4: Metacognitive Consolidation & Latency Feedback ($t \in [360, 420\text{ s}]$)**
   - **Target:** Zero test items. Synthesis screen showing session analytics.
   - **Cognitive Purpose:** Metalinguistic awareness reinforcement (Maarif 2021 [EA-27]).
   - **Display Elements:**
     - Session average retrieval latency: $\overline{\Delta t}_{\text{session}}$.
     - Specific "Trap of the Day" reminder if an L1 interference item was triggered.
     - Updated FSRS Stability metric: $S_{\text{audio}}$ and $S_{\text{ortho}}$ delta.

---

## 2. THE SIX CARD ARCHETYPES (SCHEMAS & JSON SPECIFICATIONS)

Each card in Nugget Nihongo belongs to one of six mathematically and pedagogically specialized archetypes:

```
[NUGGET NIHONGO CARD TAXONOMY]
       ├── Archetype 1: contrastive_pair_slot (L1 diagnostic minimal pair slotting)
       ├── Archetype 2: audio_speed_gate (Acoustic discrimination & geminate gating)
       ├── Archetype 3: production_type_cloze (Strict morphosyntactic typing prompt)
       ├── Archetype 4: pragmatic_register_pivot (Sociopragmatic situational register selection)
       ├── Archetype 5: collocation_chunk_builder (Scrambled head-final syntactic reordering)
       └── Archetype 6: speed_comprehension_blast (Automaticity proceduralization blast)
```

---

### Archetype 1: `contrastive_pair_slot`
- **Pedagogical Objective:** Directly neutralize Indonesian L1 negative transfer in case particles, aspectual morphemes, and false cognates.
- **Interaction Mechanism:** Single sentence with a highlighted grammatical gap. Two to three competing particles or words appear as options. Selecting the L1 transfer trap triggers an immediate **Metalinguistic Gap Warning**.

```json
{
  "$schema": "https://nuggetnihongo.com/schemas/card-v1.json",
  "id": "CARD-CP-001",
  "archetype": "contrastive_pair_slot",
  "level": "N5",
  "domain": "Domain_I_Case_Particles",
  "front": {
    "stimulus_text_l1": "Saya tinggal di Tokyo.",
    "sentence_template": "私は東京{slot}住んでいます。",
    "options": [
      {
        "id": "opt_a",
        "text": "で",
        "is_l1_trap": true,
        "trap_explanation": "Indonesian 'di' diartikan otomatis menjadi で, padahal 'sumu' adalah kondisi keberadaan permanen (stative locus of result) yang menuntut partikel に."
      },
      {
        "id": "opt_b",
        "text": "に",
        "is_correct": true,
        "trap_explanation": null
      },
      {
        "id": "opt_c",
        "text": "を",
        "is_l1_trap": false,
        "trap_explanation": "Partikel を hanya menandai objek langsung atau ruang gerak lintas."
      }
    ],
    "target_audio_url": "audio/n5/tokyo_ni_sundeimasu.mp3"
  },
  "back": {
    "correct_sentence": "私は東京に住んでいます。",
    "reading_hiragana": "わたしはとうきょうにすんでいます。",
    "romaji": "Watashi wa Toukyou ni sunde imasu.",
    "rule_summary": "Pola mutlak: [Tempat] に 住む (Menetap di target lokasi). Jangan gunakan で untuk verba keberadaan!",
    "contrastive_matrix_ref": "DIAG-PART-01",
    "audio_breakdown": {
      "timestamps": [
        {"token": "私は", "start": 0.0, "end": 0.4},
        {"token": "東京に", "start": 0.4, "end": 0.95},
        {"token": "住んでいます", "start": 0.95, "end": 1.75}
      ]
    }
  },
  "metadata": {
    "pedagogical_weight": 1.5,
    "fossilization_risk": "HIGH",
    "theoretical_tag": "Alifah-2020-EA28"
  }
}
```

---

### Archetype 2: `audio_speed_gate`
- **Pedagogical Objective:** Train ear discrimination for acoustic minimal pairs (geminate consonants *sokuon* っ, long vowels *chouon* ー, pitch accent) under simulated real-world conditions (Husna & Febriyanti 2022 [EA-25]).
- **Interaction Mechanism:** Audio plays first (can toggle 0 dB clean vs. +75 dB factory background noise). Learner has a 2.5-second countdown to select the matching semantic/orthographic card.

```json
{
  "$schema": "https://nuggetnihongo.com/schemas/card-v1.json",
  "id": "CARD-ASG-002",
  "archetype": "audio_speed_gate",
  "level": "N4_SSW",
  "domain": "Phonology_Sokuon_Acoustic",
  "front": {
    "audio_stimulus": {
      "clean_url": "audio/voc/kitte_clean.mp3",
      "factory_noise_url": "audio/voc/kitte_factory_75db.mp3",
      "duration_ms": 780,
      "silence_hold_ms": 210
    },
    "prompt": "Dengarkan baik-baik jeda konsonan ganda (っ). Perintah apa yang diucapkan supervisor?",
    "countdown_seconds": 2.5,
    "options": [
      {
        "id": "opt_kitte",
        "japanese": "切って！",
        "romaji": "Kitte!",
        "meaning_id": "Potong / Putus aliran listrik sekarang!",
        "is_correct": true
      },
      {
        "id": "opt_kite",
        "japanese": "来て！",
        "romaji": "Kite!",
        "meaning_id": "Datang ke sini! (JANGAN TERJEBAK: Tidak ada jeda sokuon)",
        "is_l1_trap": true
      }
    ]
  },
  "back": {
    "correct_target": "切って！ (Kitte!)",
    "phonetic_diagram": "き [ Jeda 1 Mora = 210 ms ] て！",
    "acoustic_warning": "Pembelajar Indonesia sering memotong jeda sokuon menjadi 80ms sehingga terdengar seperti 'Kite' (Datang). Di pabrik, mendekati mesin pemotong yang berputar sangat fatal!",
    "empirical_citation": "Husna & Febriyanti (2022) [EA-25]"
  },
  "metadata": {
    "track": "audio",
    "urgency_level": "CRITICAL_SAFETY"
  }
}
```

---

### Archetype 3: `production_type_cloze`
- **Pedagogical Objective:** Elicit active retrieval of morphosyntactic inflection (te-form, passive, causative-benefactive) via type-answer prompts (Lyster 2004 [EA-18]; Ellis et al. 2006 [EA-17]).
- **Interaction Mechanism:** Learner must type the missing morpheme into a text field. Soft custom Japanese keyboard or romaji-to-kana direct input engine. Exact orthography required.

```json
{
  "$schema": "https://nuggetnihongo.com/schemas/card-v1.json",
  "id": "CARD-PTC-003",
  "archetype": "production_type_cloze",
  "level": "N4",
  "domain": "Domain_IV_Benefactives",
  "front": {
    "stimulus_l1": "Kakak perempuan (saya) memasakkan makanan untuk saya.",
    "sentence_context": "姉は私に料理を作って{input_slot}。",
    "input_placeholder": "Ketik verba benefaktif...",
    "hint": "Kakak melakukan kebaikan untuk SAYA (inward benefactive)",
    "accepted_answers": ["くれました", "くれた"],
    "catastrophic_l1_errors": [
      {
        "input": "あげました",
        "feedback": "SALAH ARAH! あげました (ageru) hanya untuk arah KELUAR (Saya memberi orang lain). Untuk orang lain memberi SAYA, gunakan くれました (kureru)!"
      },
      {
        "input": "もらいました",
        "feedback": "HAMPIR! Jika menggunakan moraimashita, subjek penanda partikel WA haruslah 私 (私は姉に料理を作ってもらいました). Di sini subjek kalimatnya adalah 姉 (kakak)!"
      }
    ]
  },
  "back": {
    "full_sentence": "姉は私に料理を作ってくれました。",
    "syntax_tree": "[Subjek: Pemberi = 姉は] [Penerima: Saya = 私に] [V-te + くれました]",
    "point_of_view_rule": "Gunakan KURU / KURERU jika tindakan bergerak menuju teritorial psikologis penutur (Saya/Keluarga)."
  },
  "metadata": {
    "cognitive_mode": "active_generation",
    "tolerance_typos": 0
  }
}
```

---

### Archetype 4: `pragmatic_register_pivot`
- **Pedagogical Objective:** Train register flexibility between formal workplace keigo and shifted empathetic eldercare speech (*tameguchi* + affective particles) per Pramesti et al. (2019) [VS-29].
- **Interaction Mechanism:** Learner is given a workplace situation, an interlocutor avatar (e.g., Japanese Foreman vs. 84-Year-Old Dementia Resident), and must select the pragmatically appropriate utterance.

```json
{
  "$schema": "https://nuggetnihongo.com/schemas/card-v1.json",
  "id": "CARD-PRP-004",
  "archetype": "pragmatic_register_pivot",
  "level": "N4_Kaigo",
  "domain": "Workplace_Sociopragmatics",
  "front": {
    "situation_context": "Pagi hari di panti lansia. Nenek Tanaka (86 tahun, demensia ringan) tampak gelisah di ranjang dan menolak bangun.",
    "interlocutor": {
      "role": "Lansia Panti (Riyousha-san)",
      "target_rapport": "Warm, reassuring, empathetic (Speech-level shift)"
    },
    "prompt": "Bagaimana kalimat sapaan dan ajakan bangun yang paling tepat dan menenangkan?",
    "options": [
      {
        "id": "opt_cold_keigo",
        "text": "田中様、起床時間でございますので速やかにお起きください。",
        "is_pragmatic_failure": true,
        "failure_reason": "Terlalu kaku dan birokratis (Keigo dingin)! Membuat lansia demensia merasa terancam dan diasingkan."
      },
      {
        "id": "opt_rude_imperative",
        "text": "田中さん、もう朝だから早く起きて！",
        "is_pragmatic_failure": true,
        "failure_reason": "Kasar dan menggurui (Infantilization). Menjatuhkan martabat lansia."
      },
      {
        "id": "opt_shifted_empathy",
        "text": "田中さん、おはようございます。よく眠れましたか？温かいお茶でも飲んで、ゆっくり起きましょうか。",
        "is_correct": true,
        "failure_reason": null
      }
    ]
  },
  "back": {
    "pragmatic_breakdown": "Pramesti et al. (2019) membuktikan bahwa caregiver Indonesia sukses menggunakan 'Speech Level Shift': memadukan sapaan sopan (ohayou gozaimasu) dengan ajakan hangat bentuk kita (~mashou ka / ~ne) untuk membangun rasa aman lansia.",
    "research_ref": "Pramesti-2019-VS29"
  },
  "metadata": {
    "skill_domain": "empathy_pragmatics"
  }
}
```

---

### Archetype 5: `collocation_chunk_builder`
- **Pedagogical Objective:** Overcome Indonesian Head-Initial (Diterangkan-Menerangkan / SVO) interference by physically chaining scrambled chunks into Japanese Head-Final (Menerangkan-Diterangkan / SOV) and embedded relative clause order (Maarif 2021 [EA-27]).
- **Interaction Mechanism:** 4–6 syntactic chunk tiles. Learner drags or taps to order the chunks correctly.

```json
{
  "$schema": "https://nuggetnihongo.com/schemas/card-v1.json",
  "id": "CARD-CCB-005",
  "archetype": "collocation_chunk_builder",
  "level": "N4",
  "domain": "Domain_V_Adnominal_Clauses",
  "front": {
    "stimulus_l1": "Kue yang dibuat oleh ibu kemarin sangat lezat.",
    "scrambled_chunks": [
      {"id": "c1", "text": "母が"},
      {"id": "c2", "text": "昨日作った"},
      {"id": "c3", "text": "ケーキは"},
      {"id": "c4", "text": "とても"},
      {"id": "c5", "text": "美味しいです"}
    ],
    "correct_sequence": ["c1", "c2", "c3", "c4", "c5"],
    "l1_catastrophic_permutation": ["c3", "c2", "c1", "c4", "c5"],
    "l1_permutation_warning": "PERINGATAN SINTAKSIS: Jangan meletakkan 'Kue' (ケーキ) di depan! Bahasa Indonesia menggunakan 'Kue [yang dibuat ibu]', sedangkan bahasa Jepang mutlak MELETAKKAN KLAUSA PEMODIFIKASI DI DEPAN NOMINA: [母が昨日作った] ケーキ."
  },
  "back": {
    "syntactic_formula": "[ Klausa Modifikator (Verba Bentuk Biasa) ] + [ Nomina Kepala (Head Noun) ]",
    "pedagogical_rule": "Klausa relatif Jepang selalu Head-Final (kepala di akhir). Tidak ada kata penghubung 'yang'!",
    "empirical_citation": "Maarif (2021) [EA-27]"
  },
  "metadata": {
    "word_order": "Head_Final_Embedding"
  }
}
```

---

### Archetype 6: `speed_comprehension_blast`
- **Pedagogical Objective:** Automate declarative knowledge into procedural reflex (DeKeyser 2007 [SLA-08]). Target latency: $\le 1200\text{ ms}$.
- **Interaction Mechanism:** Instant binary decision (True/False or Meaning Match). Giant 1.5-second visual countdown dial.

```json
{
  "$schema": "https://nuggetnihongo.com/schemas/card-v1.json",
  "id": "CARD-SCB-006",
  "archetype": "speed_comprehension_blast",
  "level": "N5_N4",
  "domain": "Speed_Automaticity",
  "front": {
    "quick_prompt": "Makna frasa ini adalah:",
    "target_phrase": "あぶない！",
    "target_audio_url": "audio/safety/abunai.mp3",
    "time_limit_ms": 1500,
    "binary_options": [
      {"text": "BAHAYA! AWAS!", "is_correct": true},
      {"text": "SILAKAN MASUK!", "is_correct": false}
    ]
  },
  "back": {
    "benchmark_latency_ms": 950,
    "urgency": "EMERGENCY_REFLEX"
  },
  "metadata": {
    "fsrs_speed_gate": true
  }
}
```

---

## 3. DUAL-TRACK FSRS ALGORITHMIC CALIBRATION & LATENCY WEIGHTING

### 3.1 The Necessity of Dual-Track Stability ($S_{\text{audio}}$ vs. $S_{\text{ortho}}$)

Standard FSRS models (Ye et al. 2024 [SRS-05]) maintain a single scalar stability value $S$ for each memory trace. For Indonesian learners acquiring Japanese, this single-scalar approach fails due to **modality asymmetry**:
- Indonesian learners using Latin alphabet L1 often decode Japanese orthography (kanji/kana/romaji) visually with high accuracy when reading at their own leisure ($S_{\text{ortho}} \gg 30 \text{ days}$).
- However, when the exact same lexical item is presented in fast spoken acoustic streams or with background noise, their phonological loop collapses ($S_{\text{audio}} < 3 \text{ days}$).

Nugget Nihongo implements a **Dual-Track Stability Matrix**:
$$\mathbf{S}_i = \begin{bmatrix} S_{\text{ortho}} \\ S_{\text{audio}} \end{bmatrix}$$

Each card review updates both tracks based on the prompt presentation modality:
- If reviewed via Visual/Orthographic mode: update $S_{\text{ortho}}$ directly; update $S_{\text{audio}}$ with cross-modal transfer coefficient $\alpha_{\text{cross}} = 0.25$.
- If reviewed via Auditory Speed Gate mode: update $S_{\text{audio}}$ directly; update $S_{\text{ortho}}$ with cross-modal transfer coefficient $\beta_{\text{cross}} = 0.65$ (auditory retrieval strongly reinforces orthographic recall).

---

### 3.2 Latency-Weighted Retrievability and Stability Updating

Traditional SRS treats all correct answers identically (rating 3 "Good" vs 4 "Easy"). Nugget Nihongo integrates physical client-side response latency $\Delta t$ (measured in milliseconds from card presentation to user input):

Let $t_{\text{target}}$ be the expected proceduralization threshold (e.g., $1500\text{ ms}$ for recognition, $3000\text{ ms}$ for typing).
We define the **Proceduralization Efficiency Factor** $\Phi(\Delta t)$:

$$\Phi(\Delta t) = \begin{cases} 
1.20 & \text{if } \Delta t \le 0.6 \cdot t_{\text{target}} \quad (\text{Automated / Native Reflex}) \\
1.00 & \text{if } 0.6 \cdot t_{\text{target}} < \Delta t \le t_{\text{target}} \quad (\text{Fluid Retrieval}) \\
0.75 & \text{if } t_{\text{target}} < \Delta t \le 1.8 \cdot t_{\text{target}} \quad (\text{Hesitant / Declarative Search}) \\
0.40 & \text{if } \Delta t > 1.8 \cdot t_{\text{target}} \quad (\text{Severe Cognitive Strain})
\end{cases}$$

#### The Modified FSRS Stability Update Formula:
When the learner produces a correct response ($G \ge 3$):
$$S'_{m} = S_m \cdot \left( 1 + e^{w_0} \cdot (11 - D) \cdot S_m^{-w_1} \cdot (e^{w_2 \cdot (1 - R_m)} - 1) \right) \cdot \Phi(\Delta t)$$

Where:
- $m \in \{\text{ortho}, \text{audio}\}$
- $D \in [1, 10]$ is current item difficulty
- $R_m = \left( 1 + \frac{\Delta t_{\text{days}}}{9 \cdot S_m} \right)^{-1}$ is retrievability at review time
- $\Phi(\Delta t)$ downweights stability growth if the response was slow and hesitant, preventing premature interval inflation!

---

### 3.3 Catastrophic L1 Interference Penalty Spikes

When an Indonesian learner commits an error on a card, the system inspects the selected distractor:

$$\text{Error State} = \begin{cases} 
\text{Interference Trap} & \text{if distractor is flagged as } \texttt{is\_l1\_trap} = \text{true} \\
\text{Random Lapse} & \text{otherwise}
\end{cases}$$

If an **Interference Trap** is triggered:
1. **Difficulty Penalty Spike:**
   $$D' = \min(10, \; D + 1.8)$$
   *(Compared to standard lapse penalty $\Delta D = +1.0$)*
2. **Stability Compression:**
   $$S'_m = \max(0.2, \; S_m \cdot 0.20)$$
   *(Forces rapid re-encounter within 24 to 36 hours)*
3. **Contrastive Variation Flag:**
   The card engine schedules the card's twin diagnostic item (e.g., if learner failed Item #1 *sumu* with *de*, Item #2 *tsutomeru* with *ni* is automatically prioritized in the next day's Phase 2 micro-chunk). This breaks context-bound fossilization by forcing contrast across divergent verbs.

---

## 4. TELEMETRY HOOKS & ANALYTICS PIPELINE SPECIFICATION

To continuously refine the algorithm, the mobile client emits structured JSON telemetry events to the backend data stream:

```json
{
  "event_type": "srs_review_completed",
  "client_timestamp_utc": "2026-10-09T14:46:12.450Z",
  "user_id": "usr_ind_77492",
  "session_id": "ses_20261009_0801",
  "card_id": "CARD-CP-001",
  "archetype": "contrastive_pair_slot",
  "response_data": {
    "selected_option": "opt_a",
    "is_correct": false,
    "is_l1_trap": true,
    "trap_category": "L1_DI_COLLISION",
    "latency_ms": 1420
  },
  "pre_review_state": {
    "fsrs_difficulty": 5.2,
    "stability_ortho": 4.8,
    "stability_audio": 2.1,
    "elapsed_days": 4.2
  },
  "post_review_state": {
    "fsrs_difficulty": 7.0,
    "stability_ortho": 0.96,
    "stability_audio": 0.52,
    "scheduled_days": 1
  },
  "client_environment": {
    "ambient_noise_mode": "clean",
    "input_mode": "tap_selection",
    "app_build": "v1.0.4-prod"
  }
}
```

---
*Blueprint Spec finalized for Nugget Nihongo Engine Implementation. Grounded in CLT (Sweller 1988), Working Memory capacity (Cowan 2001), MALL micro-learning (Stockwell 2010), FSRS mathematical foundations (Ye et al. 2024), and empirical Indonesian error analysis (Maarif 2021, 2023; Alifah et al. 2020).*
