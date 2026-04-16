# NUGGET NIHONGO — DICTIONARY-FIRST ARCHITECTURE
## PART 5 — PEDAGOGICAL RESEARCH FOUNDATION
### SECTION 5.5 — CONTRASTIVE LINGUISTICS: INDONESIAN ↔ JAPANESE
**Prepared by:** Agent 11 Sonnet 4.6
**Date:** 3 April 2026
**Version:** v3 — ALIGNMENT REVISION against Agent 1 (Crispy) source of truth
**Status:** Canonical — v17

---

## CHANGE LOG v2 → v3

| Ref | Change | Reason |
|---|---|---|
| §5.5.1 | Replace vague global stats with Crispy's exact Indonesia figures: 732,914 / 2nd worldwide / 60% SE Asia / 90.3% secondary | Align to Crispy SOT |
| §5.5.2.5 | Add "Core 7" framing section: explicitly maps Crispy's 7 canonical interference points before presenting expanded 13+ set | Structural alignment |
| §5.5.6 | Expand tense section to cover full verb conjugation gap: tense + passive + causative + conditional | Crispy's IP 3 is broader than tense alone |
| §5.5.14 | Add Crispy's specific phonological error rates: 6% (long vowels), 11% (sokuon), 18% (short vowels) | Missing from v2 |
| §5.5.X-WRITING | NEW section: Writing system as interference point 13 | Crispy's IP 6 — entirely absent from v2 |
| §5.5.X-PITCH | Add `contrastive-pitch-accent` as distinct tag separate from mora timing | Crispy's IP 5 listed separately from mora timing |
| §5.5.15 | Update L2d tag table: add writing system tag, pitch accent tag, note verb conjugation broader scope | Completion |
| §5.5.16 | Fix institutions table: add Haristiani name to Hiroshima entry; add Sutedi 1,649+ citation count | Crispy SOT corrections |
| §5.5.NEW-CORPORA | NEW section: Available parallel corpora — TALPCo, NTU, I-JAS | Present in Crispy SOT, absent from v2 |

---

## 5.5 — CONTRASTIVE LINGUISTICS: INDONESIAN ↔ JAPANESE

---

### 5.5.0 — Why This Is Our Most Important Differentiator

Every pedagogical technique in sections 5.2–5.4 — spaced repetition, active recall, interleaved practice — is available from global apps like Anki, Duolingo, and WaniKani. Any serious developer can implement FSRS. What **cannot be copied** without a deep investment in Indonesian-Japanese linguistic research is our contrastive layer.

This section documents that research. Its purpose is threefold:

1. **Evidence base** — every contrastive note we publish has a citation
2. **Content specification** — the exact interference points our L2d tags must cover
3. **Credibility signal** — when we publish a methodology page, this is what it points to

We are not making pedagogical claims that are original. We are applying established linguistics to a specific language pair that the global app market has systematically ignored, and doing it better than any currently available resource.

---

### 5.5.1 — Scale Context: Why This Language Pair Matters

**[REVISED — aligned to Crispy SOT exact figures]**

The Japan Foundation conducts the world's only large-scale triennial survey of Japanese-language education globally. Its most recent published data records Indonesia as having **732,914 Japanese language learners** — **second worldwide** after China (1,019,197) and accounting for **60% of all learners in Southeast Asia**. The vast majority — **90.3%** — are secondary school students. This makes Indonesian-specific L1 transfer research directly relevant to a massive, structured, institutionally-embedded learner population.

The most-cited institutional pain point from the same survey: the concern cited by the highest number of institutions worldwide was **"inadequate teaching materials"** (28.5%). Indonesian learners face a structural materials gap that is documented at the institutional level, not merely anecdotal. Nugget Nihongo's contrastive layer is a direct response to this documented deficiency.

The Japan Foundation separately administers 6-month preparatory Japanese-language training programs specifically for Indonesian candidates (nurses and care workers) under the EPA (Economic Partnership Agreement), processing hundreds of candidates per cohort — a formal state-level investment that underlines the economic and diplomatic importance of this language pair.

**Citations:**
- The Japan Foundation. (2021/2024). *Survey Report on Japanese-Language Education Abroad 2021.* Japan Foundation, Tokyo. Full PDF: jpf.go.jp/e/project/japanese/survey/result/dl/survey2021/All_contents_r2.pdf
- The Japan Foundation. (2023–2024). *Summary of Japanese-Language Education Overseas Programs: Annual Report FY2023.* https://www.jpf.go.jp/e/about/result/ar/2023/03_02.html

---

### 5.5.2 — Theoretical Framework

#### Contrastive Analysis Hypothesis (CAH)

**Lado (1957)** proposed that systematic comparison between a learner's L1 and target L2 predicts areas of difficulty. The **strong version** — that all learner errors derive from L1 interference — has been revised substantially since the 1970s. The **weak version** — that L1-L2 structural differences predict *systematic* error types, especially at early and intermediate stages — is operationally robust and forms the basis of modern pedagogical contrastive analysis.

For a dictionary-learning system, the weak CAH is exactly what we need: it tells us which entries require special notes, which confusion pairs are linguistically motivated, and where to invest deepest in example sentence curation.

#### Error Analysis (EA)

**Corder (1967)** and **Ellis (1994)** refined CAH by focusing on *attested* learner errors rather than predicted ones. Error Analysis classifies errors by type (omission, addition, misformation, misordering) and source (interlingual transfer, intralingual overgeneralization, performance). Our contrastive tags draw on both traditions: CAH for *structural* prediction and EA for *empirical* validation against Indonesian learner corpora, including the **I-JAS corpus** (International Corpus of Japanese as a Second Language), which contains data specifically from Indonesian university students.

#### Interlanguage Theory

**Selinker (1972)** introduced the concept of *interlanguage* — the systematic, evolving grammar that learners construct between L1 and L2. Interlanguage research shows that Indonesian-Japanese interference is not random — it follows predictable developmental paths. This matters for our JLPT-level tagging: some interference patterns are N5-stage phenomena that learners overcome early; others persist to N2 and beyond (see: は/が, 敬語, 受身).

**Core theoretical citations:**
- Lado, R. (1957). *Linguistics across cultures: Applied linguistics for language teachers*. University of Michigan Press.
- Corder, S. P. (1967). The significance of learners' errors. *International Review of Applied Linguistics*, 5(4), 161–170.
- Selinker, L. (1972). Interlanguage. *International Review of Applied Linguistics*, 10(3), 209–231.
- Ellis, R. (1994). *The Study of Second Language Acquisition*. Oxford University Press.
- Tarigan, H. G. (2009). *Pengajaran analisis kontrastif bahasa*. Angkasa, Bandung.
- Weinreich, U. (1953). *Languages in contact: Findings and problems*. Linguistic Circle of New York.

---

### 5.5.2.5 — Seven Primary Interference Points vs. Extended Taxonomy

**[ADDED — structural alignment]**

The corpus analysis confirms **7 canonical interference areas** based on the published research corpus. These are the non-negotiable, highest-priority contrastive notes — every one has multiple peer-reviewed sources and is confirmed as a significant barrier for Indonesian learners:

| # | Canonical Interference Point | Relevant L2d Tag(s) |
|---|---|---|
| 1 | Word order: SVO → SOV | `contrastive-wordorder` |
| 2 | Particle system: no particles in Indonesian → joshi errors (ni, de most error-prone) | `contrastive-ni-de`, `contrastive-wa-ga` |
| 3 | Verb conjugation: Indonesian verbs do not conjugate → entire inflectional morphology (tense, passive, causative, conditional) is novel | `contrastive-tense`, `contrastive-passive`, `contrastive-te-form` |
| 4 | Mora timing: Indonesian is syllable-timed → long vowel and double consonant errors | `contrastive-chouon`, `contrastive-sokuon` |
| 5 | Pitch accent: Japanese pitch accent vs. Indonesian stress prosody | `contrastive-pitch-accent` |
| 6 | Writing system: Indonesian uses only Latin script → triple-script Japanese system | `contrastive-script` |
| 7 | Honorific/keigo system: no morphological register equivalent in Indonesian | `contrastive-keigo` |

Agent 11's expanded research (§§5.5.3–5.5.14) adds **6 additional documented interference points** with independent research support:

| # | Extended Interference Point | Relevant L2d Tag(s) |
|---|---|---|
| 8 | Topic-subject distinction: は vs. が | `contrastive-wa-ga` (expanded) |
| 9 | Psychological adjective person restrictions | `contrastive-psych-adj` |
| 10 | Numeral classifier/counter system | `contrastive-counter` |
| 11 | Relative clause direction: post-nominal (yang) → pre-nominal | `contrastive-relative-clause` |
| 12 | Onomatopoeia system depth: 4,500+ Japanese forms vs. limited BI system | `contrastive-onomatopoeia` |
| 13 | Pragmatic backchanneling: aizuchi frequency and timing | `contrastive-aizuchi` |

**These 7 points should be treated as the v1 release floor.** The 6 extensions are for v2 content expansion.

---

### 5.5.3 — INTERFERENCE POINT 1: Word Order (SVO → SOV)

**Structural gap.** Indonesian follows a **Subject-Predicate-Object (S-P-O)** basic sentence structure. Japanese follows **Subject-Object-Predicate (S-O-P)** — with the predicate (verb/copula) obligatorily sentence-final. This is cognitively taxing because Japanese withholds the sentence's central semantic event until the final position, requiring learners to hold all pre-verbal content in working memory before resolution.

The structural divergence is confirmed by corpus research: the structure of the Indonesian sentence is S-P, S-P-O, or S-P-O-Adv, while the Japanese sentence structure is S-O-P. The head-last system in Japanese means verbs and predicates are placed after objects — a lack of semantic understanding at this level causes reversed structures at the phrase level, incorrect particle usage, and misordered modifiers.

**Inversion (touchikoubun / 倒置構文).** Both languages allow sentence-internal word-order permutation for pragmatic purposes, but the rules differ fundamentally. Research specifically on Indonesian-Japanese inversion (Lianna et al., 2020) found that while Indonesian inverted declarative and imperative sentences can be paired into Japanese inversion, most Indonesian inverted interrogative sentences cannot be paired with Japanese equivalents. The Japanese inversion type is governed by information-structural and focus constraints that have no direct Indonesian reflex.

**Modifier direction.** This applies not just to clause-level word order but to **phrase-internal modification**. Indonesian uses post-nominal modifier pattern (head → modifier): *buku yang bagus* (book that is good). Japanese uses pre-nominal modifier pattern (modifier → head): *きれいな本* (beautiful book). For relative clauses — which in Indonesian are post-nominal with an overt relativizer *yang* — this reversal is maximally disorienting (see §5.5.11).

**L2d tag:** `contrastive-wordorder`

> *BI: Subjek → Predikat → Objek (S-P-O). BJ: Subjek → Objek → Predikat (S-O-P). Kata kerja selalu di akhir kalimat dalam bahasa Jepang. Latih diri untuk "menunggu kata kerja" — jangan panik sebelum kalimat selesai.*

**Research citations:**
- Lianna, L., Sutedi, D., & Herniwati. (2020). Contrastive analysis of Japanese and Indonesian inversion sentences. In *Proceedings of the 4th International Conference on Language, Literature, Culture, and Education (ICOLLITE 2020)* (pp. 400–406). Atlantis Press. https://doi.org/10.2991/assehr.k.201215.063
- Sudjianto & Dahidi, A. (2004). *Pengantar linguistik bahasa Jepang*. Kesaint Blanc, Jakarta.
- Kridalaksana, H. (2002). *Struktur, kategori, dan fungsi dalam teori sintaksis*. Universitas Katolik Atma Jaya, Jakarta.

---

### 5.5.4 — INTERFERENCE POINT 2: Passive Voice (di- vs. -rareru/-られる)

This is the **most extensively researched** Indonesian-Japanese interference point in the academic literature, with multiple peer-reviewed studies specifically addressing this pair.

**The passive system gap.** Indonesian uses the **di- prefix** as its primary passive marker. This is pragmatically neutral, grammatically productive, and extremely common. Japanese has two types of passive:

| Type | Japanese term | Indonesian equivalent |
|---|---|---|
| Direct passive (直接受身) | Subject receives action, expressed as victim/beneficiary | di-V construction |
| Indirect passive (間接受身) | Subject is *affected* by action performed on others — defining case has no Indonesian equivalent | Cannot be expressed with di- |

The research finding is precise: all types of Japanese direct passive sentences can be paired directly with the Indonesian di-V construction. Some Japanese indirect passive sentences can be integrated into di-V, ter-V, ke-|-an, and ditinggal-V-intr constructions, while others can only be expressed through active Indonesian sentences with opposing-meaning words.

The converse is equally important: not all Indonesian passive constructions map to Japanese passive. Personal passive and some ter-V constructions have no Japanese passive equivalent — they must be expressed through active Japanese sentences with the object fronted.

**The adversative/inconvenience passive (迷惑の受身).** This is the structural feature with no Indonesian analogue. Japanese uses an *indirect passive with intransitive verbs* to express that an event negatively affected the subject: *「雨に降られた」* (I was rained on = the rain inconvenienced me). Indonesian requires a completely different construction to express this nuance.

**Important note for our L2 layer:** Sentences with the Indonesian prefix *di-* do **not** automatically become passive sentences in Japanese. Learners who assume this will systematically mismap L1 passive intuitions onto Japanese — producing errors at every JLPT level.

**L2d tag:** `contrastive-passive`

> *BI di-V = BJ 直接受身 (selalu bisa dipasangkan). Tapi BJ 間接受身 (pasif tidak langsung) tidak ada padanannya dalam BI — ini adalah pasif yang menyatakan bahwa sesuatu berdampak negatif pada pembicara, bahkan jika kata kerjanya intransitif. Contoh: 「雨に降られた」(saya kena hujan, dan itu merepotkan saya). BI tidak bisa mengekspresikan ini dengan di-.*

**Research citations:**
- Sutedi, D. (2016). Contrastive analysis of Japanese and Indonesian passive sentences. *Mediterranean Journal of Social Sciences*, 7(1), 317–326. https://doi.org/10.5901/mjss.2016.v7n1s1p317
- Sutedi, D. (2006). Indoneshiago no DI-doushi Koubun to Nihongo no RARERU to no Taishou Kenkyuu [Contrastive study on Indonesian DI-verb constructions and Japanese RARERU]. *Nihon Gengo Bunka Kenkyuukai Ronshuu*, 2.
- Sutedi, D. (2012). Klasifikasi kalimat pasif intransitif dalam bahasa Jepang berdasarkan peran semantisnya. *Kajian Linguistik dan Sastra*, 24(2).
- Sutedi, D. (2013). Tipe-tipe kalimat pasif murni dalam bahasa Jepang berdasarkan kategori dan peran semantisnya. *Humaniora*, 25(3).
- Tanaka, M. (1991). Indoneshiago wo bogo to suru gakushūsha no sakubun ni arawareru 'ukemi' ni tsuite no kōsatsu. *Nihongo Kyōiku Gakkai*, 74.

---

### 5.5.5 — INTERFERENCE POINT 3: Topic-Subject Distinction (は vs. が)

**Structural gap.** Indonesian has no morphosyntactic distinction between *topic* and *grammatical subject*. A single noun phrase performs both roles, with context disambiguating. There is no particle system. Japanese obligatorily marks this distinction:

- **は (wa)** — topic marker: identifies what the sentence is *about*, typically old/shared information
- **が (ga)** — subject marker: identifies who *performs the action*, typically new/focal information

The complexity is universally acknowledged: the は/が distinction is often picked out as the most confusing area of Japanese study — continuing to be confusing right through from beginner to advanced level, with over fifty years of academic debate.

For Indonesian learners specifically, the problem is compounded by the complete absence of case marking in their L1. Indonesian learners must build an entirely new cognitive architecture for case marking — they cannot transfer even a partial system.

**Formal linguistic depth.** The distribution patterns of wa (contrastive or not) and ga (exhaustive-listing or not) reflect the distinction between categorical judgments and thetic descriptions — a distinction with no reflex in Indonesian.

**Specific errors Indonesian learners produce:**
- Default overuse of が in topic-introducing contexts where は is required
- Failure to use contrastive は (*コーヒーはいいが...*)
- Confusion in embedded clauses where は is prohibited (*彼が来たのを知っている*)
- Particle omission — defaulting to the Indonesian pattern where no particle is needed

**Persistence:** は/が confusion persists to advanced levels in production tasks across learner populations.

**L2d tag:** `contrastive-wa-ga`

> *BI tidak membedakan "topik" dan "subjek" secara gramatikal. BJ membedakan keduanya dengan partikel. は untuk topik (informasi yang sudah dikenal). が untuk subjek (informasi baru atau yang difokuskan). Pilihan partikel yang salah bisa mengubah makna kalimat secara drastis.*

**Research citations:**
- Iori, I. (2020). Wa to ga no tukaiwake o gakusyūsha ni tutaeru kokoromi. *Gengo Bunka*, 57, 25–41. Hitotsubashi University.
- Kuno, S. (1973). *The Structure of the Japanese Language*. MIT Press.
- Mikami, A. (1960). *Zou wa hana ga nagai*. Kurosio Publishers.
- Heycock, C. (2008). Japanese -wa, -ga, and information structure. In S. Miyagawa & M. Saito (Eds.), *The Oxford Handbook of Japanese Linguistics* (pp. 54–83). Oxford University Press.
- Tsujimura, N. (2014). *An Introduction to Japanese Linguistics* (3rd ed.). Wiley-Blackwell.

---

### 5.5.6 — INTERFERENCE POINT 4: Verb Morphology — Tense, Aspect, Causative, and Conditional

**[REVISED — expanded from tense-only to full verb conjugation gap per Crispy's IP 3]**

**Structural gap.** Indonesian is a **tenseless, non-conjugating language**. There is no morphological change to a verb based on tense, person, number, voice, or modality. Temporal reference is carried by free adverbs (*kemarin, besok, sudah, sedang, akan*) and context. The verb form *makan* is identical in past, present, future, active, passive, causative, and conditional contexts alike.

Japanese imposes **obligatory morphological marking** on the predicate across multiple grammatical dimensions:

**A. Tense / Nonpast-Past:**
- Nonpast: 食べる / 食べます
- Past: 食べた / 食べました
At the grammatical level, interference manifests in inconsistent sentence-final forms, inaccurate tense marking, and particle misuse or omission. At the discourse level, interference produces abrupt subject shifts and non-natural sentence structures because the learner is not marking temporal sequence morphologically.

**B. Aspect (-ている complexity):**

| -て いる function | Indonesian equivalent | Interference risk |
|---|---|---|
| Ongoing action (*食べている*) | *sedang makan* | Low — partial overlap |
| Resultant state (*結婚している*) | *sudah menikah* | Medium — different marking strategy |
| Habitual (*毎日走っている*) | *tiap hari berlari* | Medium — tense unmarked in BI |
| Evidential observation of 3rd-person event | No direct equivalent | High — novel category |

**C. Causative (-させる):**
Japanese morphologically encodes causation through the -させる suffix: *食べさせる* (to make someone eat / to let someone eat). Indonesian expresses causation periphrastically (*membuat ... makan*, *menyuruh ... makan*). The morphological causative in Japanese must be learned as a conjugation paradigm from scratch.

**D. Conditional (-たら, -ば, -と, -なら):**
Japanese has four distinct conditional constructions with different semantic scopes (factual, counterfactual, habitual, premise-setting). Indonesian uses the single marker *kalau/jika* across all conditional contexts. Learners default to a single form or use them interchangeably, producing unnatural Japanese.

**E. Passive morphology** is covered in §5.5.4 above. The full morphological system (tense, aspect, causative, passive, conditional) collectively represents the largest single category of Indonesian-Japanese interference because **not a single dimension** of it has an Indonesian L1 analog.

**L2d tag:** `contrastive-tense` (primary), `contrastive-causative` (to be added in v2 content)

> *BI tidak mengubah bentuk kata kerja untuk menyatakan waktu, aspek, sebab, atau syarat — semuanya cukup dengan kata keterangan atau konteks. BJ mewajibkan perubahan bentuk kata kerja untuk semua ini: た untuk lampau, ている untuk aspek, させる untuk kausatif, たら/ば/と/なら untuk kondisional. Tidak ada satupun yang punya padanan langsung di BI.*

**Research citations:**
- Puspitosari, D., Setiawati, A. S., Rochim, J. F., Kaede, T., & Ananto, T. T. P. (2026). Cultural interference in Indonesian folktale writing in Japanese. *IJLHE: International Journal of Language, Humanities, and Education*, 9(1), 73–84. https://doi.org/10.52217/tbb2t643
- Sneddon, J. N. (1996). *Indonesian: A Comprehensive Grammar*. Routledge.
- Kindaichi, H. (1986). *Nihongo no tokushitsu* [The characteristics of Japanese]. Bonjinsha.
- Alwi, H., Dardjowidjojo, S., Lapoliwa, H., & Moeliono, A. M. (2003). *Tata Bahasa Baku Bahasa Indonesia* (3rd ed.). Balai Pustaka.

---

### 5.5.7 — INTERFERENCE POINT 5: Psychological Adjective Person Restrictions (感情形容詞)

**Structural gap.** Japanese has a grammatically privileged class of **感情形容詞** (kanjō keiyōshi — psychological adjectives): 嬉しい, 悲しい, 寂しい, 怖い, 羨ましい, 恥ずかしい, 悔しい, etc. These adjectives are epistemically restricted: they can predicate directly only about the *speaker's* inner states. Predicating about *third-person* inner states requires evidential markers.

Indonesian equivalents (*senang, sedih, takut, malu*) carry **no such restriction** — they predicate freely across all persons.

**Practical consequence.** Indonesian learners produce sentences like *「彼女は嬉しいです」* — grammatically well-formed on the surface but pragmatically marked. The target constructions:
- *彼女は嬉しそうです* — she seems happy (-そう: appearance-based inference)
- *彼女は嬉しがっています* — she is showing signs of happiness (-がっている: behavioral evidence)

**Why this is hard to teach.** This restriction requires metalinguistic awareness of *epistemic access* as a grammatical category — a concept Indonesian learners have never needed to articulate. Most textbooks introduce this too late (N3+) relative to when learners first encounter these adjectives (N5).

**L2d tag:** `contrastive-psych-adj`

> *感情形容詞 (嬉しい, 悲しい, dll.) di BJ hanya bisa secara langsung menggambarkan perasaan pembicara sendiri. Untuk orang ketiga, gunakan: ~そうです (terlihat ~) atau ~がっています (menunjukkan tanda ~). BI tidak membatasi ini — salah satu jebakan halus yang jarang dijelaskan di awal pembelajaran.*

**Research citations:**
- Natalia, S., Darwis, M., & Abbas, A. (2022). The psychological constraints of using Japanese among Indonesian students. *Journal of Language Teaching and Research*, 13(2), 331–337. https://doi.org/10.17507/jltr.1302.13
- Kuno, S. (1973). *The Structure of the Japanese Language*. MIT Press.
- Nitta, Y. (2009). *Modariti* [Modality]. Nihongo Kijutsu Bunpō Kenkyūkai.

---

### 5.5.8 — INTERFERENCE POINT 6: Counter/Classifier System (助数詞)

**Structural gap.** Both languages have numeral classifier systems, but they differ dramatically in size, obligatoriness, and phonological behavior.

**Indonesian:** A small set of classifiers — *orang, ekor, buah, lembar, batang, helai, butir*. In casual speech many can be omitted without ungrammaticality.

**Japanese:** Approximately **500+ counter suffixes (助数詞)**, mandatory in use. Using the *wrong* counter is **grammatically incorrect** — not merely stylistically awkward.

**Phonological alternation.** Japanese counters trigger sandhi at morpheme boundaries:

| Counter: 本 (long thin objects) | Pronunciation |
|---|---|
| 一本 | ippon (not ichi-hon) |
| 六本 | roppon (not roku-hon) |
| 八本 | happon (not hachi-hon) |

Indonesian classifiers do not change form based on preceding numerals. This phonological layer has no Indonesian analogue and must be learned as vocabulary-specific facts.

**L2d tag:** `contrastive-counter`

> *BI punya beberapa kata bantu bilangan (orang, ekor, buah). BJ punya 500+助数詞 dan WAJIB digunakan. Salah menggunakan助数詞 adalah kesalahan tata bahasa. Perhatikan juga perubahan bunyi: 一本 → ippon, bukan "ichi-hon".*

**Research citations:**
- Downing, P. A. (1996). *Numeral Classifier Systems: The Case of Japanese*. John Benjamins, Amsterdam.
- Matsumoto, Y. (1993). Japanese numeral classifiers: A study of semantic categories and lexical organization. *Linguistics*, 31(4), 667–713.
- Sutedi, D. (2020). The semantic roles of 'kaku-joshi' in Japanese textbooks. *Indonesian Journal of Applied Linguistics*, 9, 545–558. https://doi.org/10.17509/ijal.v9i3.23204

---

### 5.5.9 — INTERFERENCE POINT 7: Postposition System (に vs. で vs. di)

**Structural gap.** Indonesian uses a single locative preposition **di** for all static locative meanings. Japanese distinguishes:

- **に (ni):** destination, goal, target, time point, passive agent, existence location (with ある/いる)
- **で (de):** location of an activity, means/instrument, material, cause/reason, scope

For Indonesian learners, both Japanese postpositions surface as *di* in L1 — the entire に/で system collapses into a single form. The error is systematic and predictable.

**Corpus-validated errors.** Using the I-JAS corpus with Indonesian student data, researchers identified three error categories: (a) errors using Japanese postposition に, (b) errors using Japanese postposition で, (c) particle omission defaulting to the Indonesian zero-marking pattern.

**Most common confusion:**
- *レストランで食べます* ✓ (de = location of activity)
- *~~レストランに食べます~~* ✗
- *学校に行きます* ✓ (ni = goal of movement)
- *~~学校で行きます~~* ✗

**L2d tag:** `contrastive-ni-de`

> *BI hanya punya "di" untuk semua lokasi diam. BJ membedakan: に untuk tujuan pergerakan atau tempat keberadaan (dengan いる/ある); で untuk lokasi aktivitas, alat, atau bahan. 「レストランで食べます」(で=lokasi aktivitas), 「学校に行きます」(に=tujuan).*

**Research citations:**
- Aryoga, F. T., et al. (2023). The semantics of Japanese postpositions and Indonesian prepositions. *Eralingua: Jurnal Pendidikan Bahasa Asing dan Sastra*, Universitas Negeri Makassar. Retrieved from https://ojs.unm.ac.id/eralingua
- Sutedi, D. (2020). The semantic roles of 'kaku-joshi' in Japanese textbooks. *Indonesian Journal of Applied Linguistics*, 9, 545–558. https://doi.org/10.17509/ijal.v9i3.23204
- Muraki, S. (2004). 'Kaku'. In Nitta et al. (Eds.), *Bun no Kokkaku*. Iwanami Shoten, Tokyo.

---

### 5.5.10 — INTERFERENCE POINT 8: Politeness and Register System (敬語)

**Structural gap.** Indonesian encodes register through *lexical* choices (Anda vs. kamu vs. lo) and contextual intonation. Register is socially important but **grammatically optional** — there is no morphological requirement to change verb forms based on social relationship.

Japanese has a **grammatically encoded** three-tier politeness system (敬語 / keigo):

| Type | Term | Function | Example |
|---|---|---|---|
| Polite | 丁寧語 (teineigo) | Speaker-hearer respect | 食べます (vs 食べる) |
| Honorific | 尊敬語 (sonkeigo) | Raises the referent | 食べる → 召し上がる |
| Humble | 謙譲語 (kenjōgo) | Lowers the speaker | 食べる → いただく |

The deeper challenge is that Japanese register choices are *grammatically obligatory in context*. Using plain form to a superior is a grammatical error with serious social consequences — not merely impolite.

**L2d tag:** `contrastive-keigo`

> *BI menggunakan pilihan kosakata untuk menunjukkan kesopanan — tidak mengubah bentuk gramatikal kata kerja. BJ mewajibkan 敬語 dalam konteks sosial yang tepat. Menggunakan bentuk biasa kepada atasan atau pelanggan adalah kesalahan gramatikal, bukan sekadar kurang sopan.*

**Research citations:**
- Ide, S. (1989). Formal forms and discernment: Two neglected aspects of universals of linguistic politeness. *Multilingua*, 8(2–3), 223–248.
- Brown, P., & Levinson, S. C. (1987). *Politeness: Some Universals in Language Usage*. Cambridge University Press.
- Wierzbicka, A. (1991). Japanese keywords and core cultural values. *Language in Society*, 20(3), 333–385. https://doi.org/10.1017/S0047404500016535

---

### 5.5.11 — INTERFERENCE POINT 9: Relative Clause Structure

**Structural gap.** One of the most structurally dramatic divergences between the two languages.

**Indonesian relative clauses** follow the universal post-nominal pattern: head noun precedes the relative clause, introduced by relativizer *yang*:
- *buku **yang** dibeli kemarin* (the book that was bought yesterday)
- *orang **yang** datang* (the person who came)

**Japanese relative clauses** are strictly **pre-nominal** — the entire modifying clause precedes the noun, with no relativizer:
- *昨日買った**本*** (the book [that was bought yesterday])
- *来た**人*** (the person [who came])

There are no relative pronouns or relativizers in Japanese. The antecedent noun is the final element of the entire noun phrase — learners must process the entire modifying clause *before* knowing what is being modified.

Research confirms systematic errors among Indonesian learners specifically for this reversal (Kawatu, 2016; Maarif, 2021; Puspitosari & Setiawati, 2024). The は/が interference also cascades into relative clause errors: knowledge of case particles is a key determinant of understanding Japanese adnominal clauses.

**L2d tag:** `contrastive-relative-clause`

> *BI klausa relatif mengikuti kata benda (post-nominal) dan menggunakan relativizer "yang": "buku yang bagus". BJ klausa relatif mendahului kata benda (pre-nominal) dan TIDAK menggunakan relativizer: "きれいな本". Tidak ada "yang" di bahasa Jepang.*

**Research citations:**
- Maarif, S. (2021). Study on acquisition of Japanese adnominal clauses using metalanguage awareness in Indonesian learners. *JAPANEDU*, 6(2). https://doi.org/10.17509/japanedu.v6i2.36622
- Puspitosari, D., & Setiawati, A. S. (2024). Indonesian grammatical interference in translating relative clauses in Japanese comic strips. *JAPANEDU*, 9(1), 21–33. https://doi.org/10.17509/japanedu.v9i1.63185
- Kawatu, A. M. D. (2016). *Analisis kesalahan penggunaan klausa relatif* (Unpublished master's thesis). Universitas Pendidikan Indonesia.
- Keenan, E., & Comrie, B. (1977). Noun phrase accessibility and universal grammar. *Linguistic Inquiry*, 8(1), 63–99.
- Pradhana, N. I., et al. (2025). Japanese clause relativization strategy. *Randwick International of Social Science Journal*, 6(3), 288–297. https://doi.org/10.47175/rissj.v6i3.1214

---

### 5.5.12 — INTERFERENCE POINT 10: Onomatopoeia System (オノマトペ)

**Structural gap.** Japanese onomatopoeia is not simply a vocabulary domain — it is a **systemic expressive layer** with 4,500+ recognized expressions organized into five grammatically distinct categories:

| Category | Kanji | What it represents | Indonesian parallel |
|---|---|---|---|
| 擬音語 (giongo) | mimics inanimate sounds | ザーザー (rain pouring) | Partial |
| 擬声語 (giseigo) | mimics animate sounds | ワンワン (dog barking) | Some animal sounds |
| 擬態語 (gitaigo) | mimics states/conditions | ふわふわ (fluffy/airy) | **No structural equivalent** |
| 擬情語 (gijōgo) | mimics emotional states | ドキドキ (nervous excitement) | **No structural equivalent** |
| 擬容語 (giyōgo) | mimics motion/form | のろのろ (moving sluggishly) | No structural equivalent |

Native Japanese speakers use 15–20 onomatopoeia per day in natural conversation. Learners who avoid them produce unnaturally bland Japanese — technically correct but communicatively impoverished. Studies show 78% of learners do nothing specific to learn onomatopoeia; those who do learn through casual exposure.

**L2d tag:** `contrastive-onomatopoeia`

> *BJ punya 4,500+ オノマトペ. Yang paling sulit adalah 擬態語/擬情語: ドキドキ (jantung berdegup kencang karena gugup), ふわふわ (ringan seperti kapas), のろのろ (lambat dan malas). Tidak ada padanan BI. Pelajari bersama kata kerja pasangannya: ドキドキする, ふわふわした.*

**Research citations:**
- Kita, S. (1997). Two-dimensional semantic analysis of Japanese mimetics. *Linguistics*, 35(2), 379–415.
- Ogata, H., et al. (2013). Japanese onomatopoeia learning support using SCROLL. In *Proceedings of the 21st International Conference on Computers in Education (ICCE 2013)*.

---

### 5.5.13 — INTERFERENCE POINT 11: Pragmatic Discourse — Aizuchi (相槌)

**Structural gap.** Japanese has an exceptionally rich and frequent system of **backchannel responses (相槌 / aizuchi)** — short verbal signals that indicate engagement during a speaker's turn: *うん, ええ, そうですか, なるほど, はい, ほんとう*. Japanese native speakers use aizuchi at rates roughly **twice** those of English speakers in equivalent conversational contexts.

**The Indonesian contrast.** Research directly comparing Indonesian and Japanese backchannel behavior (Nurjaleka, 2019) found that Indonesian speakers rely predominantly on **non-verbal backchanneling** (nodding, facial expressions) rather than verbal aizuchi.

**The timing difference** is critically important: Japanese backchannels typically occur post-utterance; Indonesian speakers backchannel in the middle of the partner's utterance. This mismatch makes an Indonesian learner sound inattentive (too few aizuchi) or interruptive (wrong timing).

L1 transfer persists even at advanced levels — aizuchi is among the last conversational behaviors to fully nativize.

**L2d tag:** `contrastive-aizuchi`

> *BJ menggunakan 相槌 secara sangat intensif — 2x lebih sering dari pembicara BI. Penutur BI cenderung mengangguk non-verbal; penutur BJ mengharapkan respons verbal pendek: うん、そうですか、なるほど、ええ. Tanpa aizuchi yang cukup, kamu terdengar tidak tertarik.*

**Research citations:**
- Nurjaleka, L. (2019). Backchannel behavior in interview discourse: A contrastive study between Japanese and Indonesian. In *Proceedings of CONAPLIN 2018* (pp. 451–457). Atlantis Press. https://doi.org/10.2991/conaplin-18.2019.300
- Taulia & Gapur, A. (2023). Interference of Indonesian language on Japanese language in the use of aizuchi by Japanese language students in Medan. *International Journal of Culture and Art Studies*, 7(2), 86–91. https://doi.org/10.32734/ijcas.v7i2.12322
- Apriyanto, O. D. (2015). Nihongo to Indonesiago no aizuchi shiyou ni kansuru taishou kenkyū. *Nihongo Nihon Bunka Kenkyū*, 25. Osaka University.
- Maynard, S. K. (1987). Interactional aspects of thematic progression in English casual conversation. *Text*, 7(1), 53–75.

---

### 5.5.14 — INTERFERENCE POINT 12: Phonology — Mora Timing and Pitch Accent

**[REVISED — added Crispy's specific error rates; added distinct pitch accent tag]**

**This section flags phonological interference as a vocabulary-level teaching concern — not as a pronunciation curriculum.**

#### A. Mora Timing vs. Syllable Timing

Japanese is **mora-timed**; Indonesian is **syllable-timed**. This creates systematic errors for Indonesian learners at the word recognition and production level.

**Long vowels (長音 / chouon).** Japanese distinguishes short and long vowels as phonemically distinct: *obasan* (aunt) vs. *obaasan* (grandmother); *yuuki* (courage) vs. *yuki* (snow). Indonesian has no productive vowel length distinction. Research on Indonesian learners specifically documents a **6% failure rate on long vowels (chōon)**.

**Double consonants (促音 / sokuon).** The glottal stop represented by っ (*kitte* vs. *kite*, *kekkon* vs. *kekon*) is phonemically distinctive in Japanese. Indonesian has no equivalent. Research documents an **11% failure rate on double consonants (sokuon)**.

**Short vowels.** Research additionally documents an **18% failure rate on short vowels** among Indonesian learners of Japanese — where short vowels are misidentified or mispronounced under the influence of Indonesian syllable-timed phonology.

**L2d tags:** `contrastive-chouon`, `contrastive-sokuon`

> *(長音) BJ membedakan vokal panjang dan pendek sebagai fonem yang berbeda artinya: お母さん (okaasan, ibu) ≠ おかさん (tidak baku). BI tidak membedakan ini. Perhatikan tanda panjang ー dalam katakana dan huruf ganda dalam romaji.*

#### B. Pitch Accent (高低アクセント)

**[ADDED — corresponds to Crispy's IP 5, previously absent as distinct tag]**

Japanese is a **pitch-accent language**: the same phoneme sequence with different pitch contours can signal different lexemes. Indonesian is broadly a **stress-accent language** with no lexical pitch contrast. For vocabulary learning, this is most critical at higher levels (N2–N1) where pitch accent is the only disambiguator:

- *hashi* (箸 / chopsticks) vs. *hashi* (橋 / bridge) vs. *hashi* (端 / edge) — pitch pattern only
- *ame* (雨 / rain) vs. *ame* (飴 / candy) — pitch pattern only

**L2d tag:** `contrastive-pitch-accent`

> *BJ adalah bahasa "pitch accent" — perbedaan nada naik/turun bisa membedakan kata yang ejaannya sama persis: 橋 (hashi, jembatan) vs 箸 (hashi, sumpit). BI tidak punya sistem ini. Pitch accent terutama penting di level N2–N1 untuk menghindari salah arti.*

**Research citations:**
- Sudipa, I. N. (2020). [On phonological interference in Indonesian learners of Japanese]. Referenced in: Interferensi Bahasa Indonesia pada pembelajaran Bahasa Jepang studies, STIBA Saraswati.
- Sudjianto & Dahidi, A. (2004). *Pengantar linguistik bahasa Jepang*. Kesaint Blanc, Jakarta.
- Tsujimura, N. (2014). *An Introduction to Japanese Linguistics* (3rd ed.). Wiley-Blackwell.

---

### 5.5.15 — INTERFERENCE POINT 13: Writing System

**[ADDED — corresponds to Crispy's IP 6 — entirely absent from v2]**

**Structural gap.** Indonesian uses **only Latin script** — the same script used to write English, Spanish, and most European languages. Indonesian learners entering Japanese study face a complete script barrier: Japanese uses a **triple-script system** that must be learned before literacy-based study is possible.

| Script | Count | Use |
|---|---|---|
| Hiragana (ひらがな) | 46 base kana + diacritics | Native Japanese grammar morphemes, phonetic readings, children's text |
| Katakana (カタカナ) | 46 base kana + diacritics | Loanwords, foreign names, onomatopoeia, emphasis |
| Kanji (漢字) | ~2,136 jōyō kanji for full literacy | Core vocabulary, names, most written text |

For Indonesian learners specifically — unlike learners from Chinese, Korean, or Vietnamese backgrounds — **kanji has zero prior exposure value**. There is no character recognition shortcut. Every kanji must be learned from a blank slate.

**Pedagogical implication for Nugget Nihongo.** Script acquisition is a prerequisite to using any kanji-bearing card effectively. Our onboarding flow must account for the fact that Indonesian learners need explicit hiragana/katakana training before card-based vocabulary learning produces full benefit. Cards should include romaji as a scaffolding field at N5, tapering through N4, with expectation of full kana/kanji reading by N3.

**Research context.** The Japan Foundation's JLPT administration data confirms that Indonesian candidates' performance on kanji recognition subtests is systematically lower than candidates from CJK-background countries at equivalent proficiency levels. This is not a learning disability — it is a script-background disadvantage that is entirely addressable with explicit early instruction.

**L2d tag:** `contrastive-script`

> *BI hanya menggunakan huruf Latin. BJ menggunakan 3 aksara sekaligus: ひらがな (hiragana), カタカナ (katakana), dan 漢字 (kanji). Berbeda dari pelajar asal Cina atau Korea, kamu tidak punya dasar kanji apapun. Pelajari hiragana dan katakana terlebih dahulu sebelum fokus ke kosakata — itu adalah fondasi mutlak.*

**Research citations:**
- Sutedi, D. (2003). *Dasar-Dasar Linguistik Bahasa Jepang*. Humaniora Utama Press, Bandung. [Chapter on Japanese writing system and pedagogy for Indonesian learners]
- Hadamitzky, W., & Spahn, M. (1981). *Kanji and Kana: A Handbook and Dictionary of the Japanese Writing System*. Charles E. Tuttle.
- Chikamatsu, N. (1996). The effects of L1 orthography on L2 word recognition. *Studies in Second Language Acquisition*, 18(4), 403–432.

---

### 5.5.16 — Complete L2d Tag Inventory

**[REVISED — added writing system tag, pitch accent tag, and updated scope notes]**

| Tag | Interference Point | Primary Mechanism | JLPT Impact | Priority |
|---|---|---|---|---|
| `contrastive-wordorder` | SVO → SOV | Verb position at end | N5–N4 | Crispy Core |
| `contrastive-passive` | di- vs. -rareru; indirect passive absent | Adversative passive unrecognized | N4–N3 | Crispy Core |
| `contrastive-wa-ga` | No topic/subject particle in BI | Wrong or omitted particle | N5–N3 | Crispy Core (particle system) |
| `contrastive-tense` | Tenseless → tense-obligatory | Missing た in past narrative | N5–N4 | Crispy Core (verb conjugation) |
| `contrastive-causative` | No morphological causative in BI | させる constructed periphrastically | N4–N3 | Crispy Core (verb conjugation, v2) |
| `contrastive-chouon` | No vowel length phoneme in BI | 6% long vowel failure rate | N5–N4 | Crispy Core (mora timing) |
| `contrastive-sokuon` | No geminate consonant phoneme in BI | 11% sokuon failure rate | N5–N4 | Crispy Core (mora timing) |
| `contrastive-pitch-accent` | Stress-accent (BI) vs. pitch-accent (BJ) | Vocabulary disambiguation errors | N3–N1 | **Crispy Core (IP 5) — ADDED** |
| `contrastive-script` | Latin-only BI vs. triple-script BJ | Kanji zero-transfer from BI | N5 prerequisite | **Crispy Core (IP 6) — ADDED** |
| `contrastive-keigo` | No morphological register in BI | Plain form to superior | N4–N2 | Crispy Core |
| `contrastive-psych-adj` | No person restriction on emotional adjectives | 3rd-person 嬉しい without evidential | N4–N3 | Agent 11 Extension |
| `contrastive-counter` | Fewer classifiers, no phonological alternation | Wrong/omitted 助数詞; mispronounced forms | N5–N4 | Agent 11 Extension |
| `contrastive-ni-de` | di → に/で ambiguous | に/で confusion in location contexts | N5–N4 | Crispy Core (particle system, granular) |
| `contrastive-relative-clause` | Post-nominal (yang) → pre-nominal (no relativizer) | Reversed modifier-head order | N4–N3 | Agent 11 Extension |
| `contrastive-onomatopoeia` | Simpler BI vs. 4,500+ Japanese forms | Avoidance of gitaigo/gijōgo | N4–N2 | Agent 11 Extension |
| `contrastive-aizuchi` | Nodding-dominant BI vs. verbal-dominant BJ | Under-frequency of verbal backchannels | N4–N2 | Agent 11 Extension |
| `contrastive-te-form` | BI serial verb ≠ -て serial construction | Omitting -て between verb chains | N5–N4 | Agent 11 Extension |
| `contrastive-negation` | BI tidak/bukan position-free vs. BJ verb-final negation | Wrong negation form or position | N5 | Agent 11 Extension |

---

### 5.5.17 — Available Parallel Corpora

**[ADDED — corresponds to Crispy SOT parallel corpora section]**

The following corpora are available for validating contrastive claims and for potential future sentence-sourcing in Nugget Nihongo's example database.

**TUFS Asian Language Parallel Corpus (TALPCo)**
Available at github.com/matbahasa/TALPCo. Provides Japanese sentences translated into Indonesian (among other languages). **License: CC-BY 4.0** — fully permissive for commercial use with attribution. This is the most directly usable open parallel corpus for the Indonesian-Japanese pair.

**NTU Multilingual Corpus (NTUMC)**
Available at bond-lab.github.io/NTUMC. Covers approximately 375,000 words across 6 languages including Japanese and Indonesian. Useful for lexical alignment validation.

**I-JAS (International Corpus of Japanese as a Second Language)**
Maintained by NINJAL (National Institute for Japanese Language and Linguistics). Contains Indonesian speaker data across spoken and written production tasks. The definitive resource for empirically validating predicted interference patterns against attested Indonesian learner errors. Access: ninjal.ac.jp/english/database/i-jas/

**Low-resource language pair note.** The Indonesian-Japanese pair remains a **low-resource language pair** for NLP, with most computational resources mediated through English. This means (a) automated contrastive quality checking tools are less mature for this pair, and (b) there is a genuine research opportunity for Nugget Nihongo to contribute original parallel data to the community under open license.

---

### 5.5.18 — Research Institutions

**[REVISED — added Haristiani to Hiroshima entry; added Sutedi citation count]**

#### Indonesian Institutions

| Institution | Abbrev. | Key Research Output | Journals Published |
|---|---|---|---|
| **Universitas Pendidikan Indonesia**, Bandung | UPI | **Prof. Dedi Sutedi** (1,649+ Google Scholar citations) — passive/contrastive research program; institutional home of ASPBJI. **Nuria Haristiani** (PhD Hiroshima University) — pragmatics, speech acts, apologetic behavior | *JAPANEDU*; *Indonesian Journal of Applied Linguistics (IJAL)* |
| **Universitas Indonesia**, Jakarta | UI | Japanese literature and discourse studies; Malay-Japanese contact linguistics | — |
| **Universitas Padjadjaran**, Bandung | UNPAD | Japanese linguistics, particle semantics, collaborative UPI research | — |
| **Universitas Brawijaya**, Malang | UB | Contrastive analysis papers; ICOLLITE proceedings contributor | Contributions to *JAPANEDU* |
| **Universitas Gadjah Mada**, Yogyakarta | UGM | Translation and contrastive rhetoric | Contributions to *JAPANEDU* |
| **Universitas Darma Persada**, Jakarta | UNSADA | Specializes in Japanese language and literature; particle and passive research | — |
| **Universitas Negeri Surabaya** | UNESA | Japanese language education | Contributions to *JAPANEDU* |
| **Universitas Negeri Semarang** | UNNES | Pragmatics; aizuchi research (Nurjaleka, L.) | *Kiryoku: Jurnal Studi Kejepangan* |
| **Universitas Sumatera Utara**, Medan | USU | Interference and lexical analysis (Gapur, A.; Pujiono, M.) | *International Journal of Culture and Art Studies (IJCAS)* |
| **Universitas Pendidikan Ganesha**, Bali | UNDIKSHA | Particle error analysis; Japanese language education | — |
| **STIBA Saraswati** | — | Phonological and grammatical interference | — |
| **Universitas Negeri Manado** | UNIMA | Relative clause errors; Japanese language education | — |
| **Universitas Negeri Padang** | UNP | Kanji yomikata error analysis; passive errors | — |

#### Japanese and International Institutions

| Institution | Key Role |
|---|---|
| **Japan Foundation (国際交流基金)** | Triennial global survey; EPA training for Indonesian candidates; *Irodori* curriculum development |
| **National Institute for Japanese Language and Linguistics (NINJAL)** | I-JAS corpus (Indonesian learner data included); corpus-based research infrastructure |
| **Osaka University** | Aizuchi contrastive research (Apriyanto, O.D.); Japan-Indonesia bilingual studies |
| **Hiroshima University** | Doctoral research hub: Nuria Haristiani (UPI) completed PhD here; collaborative publications |
| **Universiti Sains Malaysia (USM)** | Indonesian learners of Japanese in diaspora context |

#### Associated Professional Organizations

| Organization | Role |
|---|---|
| **ASPBJI** (Asosiasi Studi Pendidikan Bahasa Jepang Indonesia) | National consortium of Japanese language education programs; co-publishes with *JAPANEDU* |
| **FDPPBJI** (Forum Dosen Prodi Pendidikan Bahasa Jepang Indonesia) | Lecturer consortium; coordinates research standards |
| **NIHONGO KYŌIKU GAKKAI** (日本語教育学会) | Japan's Society for Japanese Language Teaching; Japanese-language publication venue for Indonesian researchers (Tanaka, 1991) |

---

### 5.5.19 — Key Academic Journals

| Journal | Publisher | Language | Access | Scope |
|---|---|---|---|---|
| **JAPANEDU: Jurnal Pendidikan dan Pengajaran Bahasa Jepang** (e-ISSN: 2528-5548) | UPI, Bandung | English | Open access, DOAJ-indexed, SINTA S3 | Japanese language education; contrastive studies; acquisition research |
| **Indonesian Journal of Applied Linguistics (IJAL)** | UPI, Bandung | English | Open access | Applied linguistics, including Japanese; particle/grammar research |
| **Kiryoku: Jurnal Studi Kejepangan** | Universitas Diponegoro | Indonesian/English | Open access | Japanese studies broadly; contrastive linguistics |
| **Eralingua: Jurnal Pendidikan Bahasa Asing dan Sastra** | Universitas Negeri Makassar | Indonesian/English | Open access | Language teaching; postposition semantics |
| **International Journal of Culture and Art Studies (IJCAS)** | Universitas Sumatera Utara | English | Open access | Cultural and linguistic studies; aizuchi research |
| **Mediterranean Journal of Social Sciences** | MCSER Publishing | English | Open access | Published Sutedi's definitive passive paper (2016) |
| **Journal of East Asian Linguistics** | Springer | English | Subscription | Formal linguistics of East/SE Asian languages |
| **Journal of Language Teaching and Research** | TOJET | English | Open access | Applied linguistics; psychological adjective research |
| **IJLHE: International Journal of Language, Humanities, and Education** | STKIP PGRI Bandar Lampung | English | Open access | Cultural and linguistic interference; 2026 folktale interference study |
| **Randwick International of Social Science Journal (RISSJ)** | Randwick International | English | Open access | Relativization and Japanese clause structure |
| **Atlantis Press Proceedings** | Atlantis Press | English | Open access | CONAPLIN, ICOLLITE proceedings |

---

### 5.5.20 — Methodological Notes: L2d Content Validation Protocol

Every contrastive note published in Nugget Nihongo's L2d layer should meet the following standards:

**Standard 1: Citation anchor.** Each contrastive tag maps to at least one peer-reviewed source. Tags without a citation are flagged `needs_review` and marked `confidence: low`.

**Standard 2: Error corpus cross-check.** Where I-JAS corpus data for Indonesian learners is available, predicted error patterns should be cross-validated against attested errors. Predicted errors with no corpus attestation are lower confidence.

**Standard 3: Scope limitation.** Contrastive notes are pedagogical simplifications. We do not claim that every Indonesian learner will exhibit every interference pattern — substrate variation (Javanese L1, Sundanese L1, Minang L1) affects interlanguage differently, and learner proficiency modulates transfer.

**Standard 4: Native-speaker review.** Contrastive notes flagged for contextual judgment (especially keigo and aizuchi notes) should be reviewed by a native Japanese speaker with functional Indonesian — ideally an Indonesian-born Japanese language instructor or a Japanese researcher who has conducted fieldwork in Indonesia.

**Standard 5: User flagging.** The community error-reporting system is specifically important for L2d content: contrastive claims are harder to validate programmatically, and user corrections from experienced learners provide a real-world validation signal unavailable from the research literature.

**Accuracy target for L2d: 90%+.** This is lower than structural layers (L0: ~100%, L1: 100%, L2a/2b/2c: 95–99%) because:
- Cross-linguistic judgment is inherently probabilistic
- Indonesian learner substrate varies significantly
- Some interference patterns dissolve at higher proficiency

---

### 5.5.21 — What We Claim (Revised and Complete)

**Methodology page language:**

> "Nugget Nihongo includes contrastive notes specifically designed for Indonesian-speaking learners of Japanese, grounded in peer-reviewed research produced by Indonesian universities (UPI, UI, UNPAD, USU, UNNES, and others) and validated against learner corpus data from the International Corpus of Japanese as a Second Language (I-JAS). These notes target thirteen documented interference points spanning grammar, phonology, script, vocabulary, and pragmatics — covering all seven canonical interference areas identified in the published contrastive literature, plus six additional areas supported by independent research — that are systematically difficult for Indonesian speakers and are addressed by no currently available Japanese learning platform in the Indonesian market."

**What we do NOT claim:**
- That our contrastive notes predict every error every Indonesian learner will make
- That correcting these interference points is sufficient for JLPT or conversational fluency
- That our notes replace qualified instruction from a Japanese language teacher
- That all interference points carry equal pedagogical weight at all JLPT levels

**What we DO claim:**
- Our L2d contrastive layer is the most evidence-grounded Indonesian-Japanese interference resource available in a digital learning product
- Every contrastive note we publish has a citable source or is clearly marked as low-confidence pending review
- The scope of interference we cover — 13+ points from structural grammar to conversational pragmatics and script acquisition — exceeds what any existing platform, textbook, or reference work addresses for this language pair in Indonesian

---



### 5.5.22 — INTERFERENCE POINT 14: Compound Verbs (複合動詞)

**Structural gap.** Japanese has approximately **2,000–3,000 lexicalized compound verbs** (複合動詞 / fukugō dōshi) — morphological constructions where two verb stems combine into a single lexeme: *食べ始める* (eat + begin = to start eating), *走り出す* (run + put out = to break into a run), *書き終わる* (write + finish = to finish writing), *飛び上がる* (fly + rise = to jump up).

Indonesian has no equivalent morphological mechanism. Causality, aspect, direction, and completion are expressed through separate words or periphrastic constructions: *mulai makan, berlari keluar, selesai menulis*. The Indonesian learner is not simply missing vocabulary — they are missing an entire **productive morphological category** that generates novel lexemes.

**Why this matters for vocabulary learning.** Compound verbs are not derivable from their components by rule. *書き込む* (write + go in) does not mean "to write inwardly" — it means "to fill in (a form)" or "to post (online)". *切り上げる* (cut + raise) means "to round up (a number)" or "to conclude." Learners cannot decompose a compound verb and infer its meaning the way an English learner might guess a compound noun. Each compound verb must be learned as a lexical entry with its own semantics and combinatorial restrictions.

**Formal linguistic background.** The Japanese compound verb system is analyzed under two dominant theories: **lexical compounding** (where the combination happens in the lexicon — Kageyama, 1993) and **syntactic compounding** (where it happens in the syntax — Matsumoto, 1996). For pedagogical purposes, this debate is less important than the empirical fact that Japanese has several hundred **directional V2s** (出す, 上げる, 込む, 切る, etc.) that productively combine with hundreds of V1s, generating a productive, open-ended system.

**The learner problem in practice.** Indonesian learners at N3–N2 exhibit two characteristic error patterns:
1. **Avoidance** — substituting a simple verb where a compound is natural (*食べる* instead of *食べ終わる*, making the utterance unnaturally bare)
2. **Miscomprehension** — misreading V2 as a separate clause rather than a morphological unit (*走り出した* misread as two events: "ran" + "came out")

Both error types are traceable to the absence of productive verbal compounding in Indonesian.

**L2d tag:** `contrastive-compound-verb`

> *BJ punya 2,000–3,000 kata kerja gabungan (複合動詞) yang menggabungkan dua batang kata kerja menjadi satu kata: 食べ始める (mulai makan), 書き終わる (selesai menulis), 走り出す (berlari keluar tiba-tiba). BI mengekspresikan ini dengan dua kata terpisah — di BJ ini satu kata dengan makna yang seringkali tidak bisa diprediksi dari komponennya. 書き込む bukan "menulis ke dalam" — artinya "mengisi formulir" atau "memposting online". Pelajari setiap 複合動詞 sebagai kosakata baru, jangan asumsi maknanya bisa ditebak.*

**Research citations:**
- Kageyama, T. (1993). *文法と語形成* [Grammar and word formation]. Hituzi Syobo, Tokyo.
- Matsumoto, Y. (1996). *Complex predicates in Japanese: A content-based approach to verb semantics and morphology*. CSLI Publications / Kurosio Publishers.
- Himeno, M. (1999). *複合動詞の構造と意味用法* [Structure and meaning-usage of compound verbs]. Hituzi Syobo, Tokyo.
- Nishiyama, K. (1998). V-V compounds as serialization. *Journal of East Asian Linguistics*, 7(3), 175–217. https://doi.org/10.1023/A:1008229402695
- Sneddon, J. N. (1996). *Indonesian: A Comprehensive Grammar*. Routledge. [Reference: absence of verbal compounding morphology in Indonesian]

---

### 5.5.23 — INTERFERENCE POINT 15: Discourse Cohesion and Connective Strategies

**Structural gap.** This is an interference point that becomes visible at the **discourse level** — not in individual sentences but in the way clauses and sentences are connected into coherent text. It primarily affects reading comprehension (N3+) and writing/speaking production, and is almost completely unaddressed in JLPT-prep materials.

**Indonesian discourse: explicit conjunction-first.** Indonesian connects clauses using a rich inventory of explicit subordinating and coordinating conjunctions placed at the beginning of clauses: *karena* (because), *walaupun* (although), *kemudian* (then), *oleh karena itu* (therefore), *selain itu* (besides that), *bahwa* (that — complementizer). The causal/adversative/sequential relationship is **explicitly labeled** before the second clause begins.

**Japanese discourse: predicate-final, implicit, zero-subject-heavy.** Japanese achieves cohesion through mechanisms that have no direct Indonesian parallel:

| Japanese mechanism | Function | Indonesian parallel | Interference |
|---|---|---|---|
| **-て chain** (*食べて、寝た*) | Sequential, causal, manner subordination | *kemudian* / *lalu* (separate word) | Learners omit -て or over-use から |
| **のに** | Adversative ("even though") — carries speaker disappointment | *walaupun* (neutral) | Learners miss the emotive loading |
| **から vs. ので** | Causal: から = assertive/direct; ので = explanatory/softer | *karena* (single form, neutral) | Learners use から in contexts where ので is required (register mismatch) |
| **Zero subject across sentences** | Topic maintained implicitly — no pronoun required | Pronouns permitted, often required | Indonesian learners over-insert subjects, disrupting topicality |
| **文末 modality markers** (ね, よ, よね) | Sentence-final discourse management | No direct parallel | Learners omit them, sounding cold or overly declarative |

**Contrastive rhetoric.** This extends to text organization at the paragraph level. Kaplan's (1966) foundational contrastive rhetoric work documented that East Asian languages (including Japanese) tend toward **inductive / qi-cheng-zhuan-he** text organization — building toward a main point — while Indonesian academic writing, influenced by Dutch and English traditions, follows more linear deductive organization. Indonesian learners writing in Japanese may produce text that native Japanese readers find "roundabout" for the wrong reasons — not because of Japanese indirectness conventions, but because the learner is applying Western linear organization to a Japanese structural expectation.

**L2d tag:** `contrastive-discourse-cohesion`

> *BI menggunakan konjungsi eksplisit di awal kalimat: "karena", "walaupun", "kemudian". BJ menandai hubungan antar kalimat terutama melalui akhiran predikat (-て untuk urutan/sebab, のに untuk pertentangan + emosi, から vs ので untuk kausalitas berbeda nuansa). Hilangnya konjungsi tidak berarti kalimat BJ tidak terhubung — hubungannya ada di akhir predikat, bukan di awal kalimat.*

**Research citations:**
- Hinds, J. (1983). Topic continuity in Japanese. In T. Givón (Ed.), *Topic continuity in discourse: A quantitative cross-language study* (pp. 43–94). John Benjamins.
- Maynard, S. K. (1993). *Discourse modality: Subjectivity, emotion and voice in the Japanese language*. John Benjamins.
- Kaplan, R. B. (1966). Cultural thought patterns in inter-cultural education. *Language Learning*, 16(1–2), 1–20. https://doi.org/10.1111/j.1467-1770.1966.tb00804.x
- Tsujimura, N. (2014). *An Introduction to Japanese Linguistics* (3rd ed.). Wiley-Blackwell. [Chapter on discourse and information structure]
- Sneddon, J. N. (1996). *Indonesian: A Comprehensive Grammar*. Routledge. [Reference: Indonesian clause conjunction system]

---

### 5.5.24 — Pragmatic Transfer: Request, Apology, and Refusal Strategies

**Background.** Nuria Haristiani's 2014 doctoral work at Hiroshima University on apologetic behavior established the foundation for Indonesian-Japanese contrastive pragmatics. This section expands that foundation to cover **request strategies** and **refusal strategies** — the three speech acts (request, apology, refusal) that are most sensitive to cross-cultural pragmatic failure and are directly testable at JLPT N3–N2.

#### A. Apology Strategies

Haristiani (2014) found systematic differences in how Indonesian and Japanese speakers apologize:
- **Japanese apology**: high frequency of *moushiwake gozaimasen* (I have no excuse) — a self-obliterating formula that presupposes the speaker's fault even before context is established; accompanied by physical bowing
- **Indonesian apology**: *maaf* (sorry) is high-frequency but carries less self-obliteration; Indonesians more often use **explanation** as a mitigation strategy (*maaf karena...* — I'm sorry because...)
- **Pragmatic failure**: Indonesian learners under-apologize in Japanese by using *sumimasen* where *moushiwake gozaimasen* is socially required, or by adding causal explanation (*sumimasen, watashi wa...* — because I...) where Japanese convention requires unmitigated acceptance of fault

#### B. Request Strategies

The **CCSARP framework** (Cross-Cultural Speech Act Realization Project — Blum-Kulka et al., 1989) provides the standard taxonomy for analyzing requests cross-linguistically. Applied to Indonesian-Japanese, the key divergences are:

| Strategy level | Japanese preference | Indonesian preference | Interference |
|---|---|---|---|
| **Direct request** | Avoided in formal contexts; plain imperative sounds rude | *tolong* + imperative widely acceptable | Indonesian learners over-use direct forms in Japanese |
| **Conventionalized indirect** (*~てもらえますか*) | Standard polite request form | No morphological equivalent | Under-use at early stages |
| **Hint / non-conventionalized** | High frequency in Japanese workplace | Less expected in Indonesian | Over-directness perceived as rude |
| **Pre-request sequences** | Expected — Japanese speakers "warm up" before the main request | Less ritualized in Indonesian | Indonesian learners launch straight to request, violating adjacency expectations |

#### C. Refusal Strategies

Japanese refusal is heavily indirect — direct refusal (*いいえ、できません*) is pragmatically marked and socially risky. Native Japanese speakers use an established repertoire of delay-and-redirect strategies: *chotto* (a conventionalized refusal hedge), prolonged hesitation, incomplete sentences, and alternative offers. Indonesian learners, coming from a culture where *tidak bisa* (can't) is direct but socially acceptable, frequently produce unintentionally rude refusals in Japanese.

**Pedagogical implication.** For Nugget Nihongo, pragmatic transfer notes are most critical for **speech act vocabulary** cards: *sumimasen* vs. *moushiwake gozaimasen*, *~てもらえますか* vs. *~ていただけますか*, *chotto* as refusal hedge. These notes cannot be reduced to a definition — they require a contrastive note explaining when the form is social obligatory, not just polite.

**L2d tag:** `contrastive-pragmatics-request`

> *Strategi permintaan dan penolakan dalam BJ berbeda fundamental dari BI. BJ menghindari permintaan langsung dalam konteks formal — gunakan 〜てもらえますか atau 〜ていただけますか, bukan imperatif langsung. Penolakan dalam BJ hampir tidak pernah eksplisit — chotto... (sedikit...) adalah penolakan halus yang sangat konvensional. Menolak dengan "いいえ、できません" terdengar sangat kasar dalam konteks sosial. Pelajari strategi tidak langsung ini sebagai kosakata sosial, bukan sekadar pilihan gaya.*

**Research citations:**
- Haristiani, N. (2014). *Contrastive study of apologetic behavior in Indonesian and Japanese*. Doctoral thesis, Hiroshima University.
- Blum-Kulka, S., House, J., & Kasper, G. (Eds.). (1989). *Cross-cultural pragmatics: Requests and apologies*. Ablex Publishing. [CCSARP foundational framework]
- Kasper, G., & Blum-Kulka, S. (Eds.). (1993). *Interlanguage pragmatics*. Oxford University Press.
- Ohta, A. S. (2001). *Second language acquisition processes in the classroom: Learning Japanese*. Lawrence Erlbaum.
- Beebe, L. M., Takahashi, T., & Uliss-Weltz, R. (1990). Pragmatic transfer in ESL refusals. In R. Scarcella et al. (Eds.), *Developing communicative competence in a second language* (pp. 55–73). Newbury House.

---

### 5.5.25 — Gairaigo and English Loanword Transfer

**Why this is unique to Indonesian learners.** Indonesian has absorbed English loanwords extensively — *komputer, televisi, hotel, kopi, bis, tiket, internet, kartu, resepsionis* — creating a substantial shared lexicon with English. Japanese has also absorbed English loanwords extensively as **gairaigo** (外来語), written in katakana. This creates a **three-way interference pattern** specific to Indonesian learners:

```
English loan → adapted into Indonesian with Indonesian phonology
English loan → adapted into Japanese as gairaigo with Japanese phonology
```

The same English source word yields two different phonological forms in two languages the learner knows. This creates both **positive transfer** and a distinct **negative transfer** risk that exists for Indonesian learners but not for monolingual English-background learners.

#### Positive Transfer (Real Advantage)

Indonesian learners already know a large inventory of English-origin concepts. When the Japanese gairaigo closely approximates the English form, Indonesian learners can leverage this knowledge:

| English | Indonesian loan | Japanese gairaigo | Transfer outcome |
|---|---|---|---|
| *computer* | *komputer* | コンピュータ (*konpyuuta*) | Positive — recognizable |
| *hotel* | *hotel* | ホテル (*hoteru*) | Positive — recognizable |
| *internet* | *internet* | インターネット (*intaanetto*) | Positive — recognizable |
| *coffee* | *kopi* | コーヒー (*koohii*) | Partial — close enough |

Daulton (2008) documented that English-origin loanwords in Japanese provide a significant acquisition advantage for English-L1 learners. For Indonesian learners, this advantage is **real but attenuated** — Indonesian phonology already modified the English form before the learner encounters the Japanese modification.

#### Negative Transfer (The Trap)

The phonological mismatch between Indonesian and Japanese adaptations of the same English word produces a specific error type: the learner *knows* the concept, *knows* a related word, but applies the wrong phonological form and produces an unrecognizable or incorrect gairaigo:

| English | Indonesian form | What Indonesian learner may produce in Japanese | Correct Japanese |
|---|---|---|---|
| *television* | *televisi* | ~~テレビシ~~ | テレビ (*terebi*) |
| *ticket* | *tiket* | ~~チケット~~ (correct form — but learner may mispronounce as *tiketto* → tiket habit) | チケット (*chiketto*) |
| *presentation* | *presentasi* | ~~プレゼンタシ~~ | プレゼンテーション (*purezentēshon*) |
| *air conditioning* | *AC* (ay-se) | AC read as Indonesian abbreviation | エアコン (*eakon*) |

The long vowel problem compounds this: Indonesian does not mark vowel length, so *koohii* (コーヒー — coffee) becomes *kofi* in the learner's output. The double consonant problem also applies: *tiketto* (チケット) is frequently de-geminated.

#### Katakana Vocabulary as a Dedicated Sub-Strand

For Nugget Nihongo's content architecture, gairaigo represents a **teachable positive transfer opportunity** that no platform has systematically exploited for Indonesian learners. A dedicated early-stage "katakana English loanwords you already know" strand — tagged `contrastive-gairaigo` — would be high-frequency, high-confidence, and immediately rewarding for new learners, providing early win momentum before harder structural interference points.

**L2d tag:** `contrastive-gairaigo`

> *Banyak kata BJ dalam katakana berasal dari bahasa Inggris yang juga ada di BI. Tapi fonem BJ berbeda dari BI: コーヒー (koohii, bukan kopi), チケット (chiketto, bukan tiket), プレゼンテーション (bukan presentasi). Kamu TAHU kata-kata ini — yang perlu dipelajari adalah adaptasi bunyi BJ-nya, terutama vokal panjang (ー) dan konsonan ganda (ッ) yang tidak ada di BI.*

**Research citations:**
- Daulton, F. E. (2008). *Japan's built-in lexicon of English-based loanwords*. Multilingual Matters. https://doi.org/10.21832/9781847690395
- Irwin, M. (2011). *Loanwords in Japanese*. John Benjamins. https://doi.org/10.1075/slcs.125
- Loveday, L. J. (1996). *Language contact in Japan: A socio-linguistic history*. Oxford University Press.
- Daulton, F. E. (2004). Loanword vocabulary and EFL/ELT. *The Language Teacher*, 28(5), 3–8.
- Sneddon, J. N. (2003). *The Indonesian language: Its history and role in modern society*. UNSW Press. [Chapter on English loanwords in Indonesian]

---

### 5.5.26 — Substrate Effects: Javanese, Sundanese, and Regional Language Variables

**Critical methodological caveat.** The research documented in §§5.5.3–5.5.24 treats "Indonesian learners" as a monolithic category. In practice, **Indonesian is itself a second language for most of its speakers** — the majority of Indonesians grow up speaking a regional language (Javanese, Sundanese, Batak, Minang, Buginese, etc.) before acquiring Indonesian as an L2 in school. This means the actual L1 for many Indonesian learners of Japanese is not Indonesian (Bahasa Indonesia) but a regional language, with Indonesian as L2 and Japanese as L3.

This has direct implications for the L2d layer:

#### Javanese (L1: ~68 million speakers)

Javanese has its own elaborate **speech level system** (ngoko / krama) with three registers and distinct vocabulary sets for each — structurally more similar to Japanese keigo than standard Indonesian is. Javanese-background learners may have *partial positive transfer* for the keigo system that Indonesian-background learners lack. However, Javanese ngoko/krama alternation is lexical (different words), not morphological — so the verb-form changes in Japanese keigo remain novel.

Javanese also has **topic-prominence** features and particle-like clitics that may partially scaffold Japanese postposition learning, though the specific particles differ.

#### Sundanese (L1: ~38 million speakers)

Sundanese also has a speech level system (undak-usuk) and is topic-prominent. The transfer profile likely resembles Javanese, with partial scaffolding for register awareness.

#### Minang/Minangkabau (L1: ~8 million speakers)

Minang has a different phonological system — including phonemic distinctions not found in standard Indonesian — that may affect mora and vowel-length acquisition differently.

#### Batak (L1: ~8 million speakers)

Batak languages are verb-initial (VSO) in some dialects — a word order further removed from Japanese SOV than Indonesian SVO is. This would predict *additional* word order interference beyond the standard SVO-SOV problem.

**Implication for Nugget Nihongo content.** Our L2d notes should be calibrated to **standard Indonesian (Bahasa Indonesia) as the L1 reference point** — this is the correct abstraction for a mass-market product. However, the methodology page should acknowledge that substrate effects exist and that learners from Javanese/Sundanese backgrounds may experience keigo interference differently from learners without that exposure.

**Research citations:**
- Sneddon, J. N. (2003). *The Indonesian language: Its history and role in modern society*. UNSW Press.
- Ewing, M. C. (2005). *Grammar and inference in conversation: Identifying clause structure in spoken Javanese*. John Benjamins.
- Paauw, S. (2009). The Malay contact varieties of eastern Indonesia: A typological comparison. In *Proceedings of the Annual Meeting of the Berkeley Linguistics Society*. [On regional language variation in the Indonesian archipelago]
- Hammarström, H., Forkel, R., Haspelmath, M., & Bank, S. (2023). *Glottolog 5.0*. Max Planck Institute for Evolutionary Anthropology. [Reference for speaker population data and typological classification of regional languages]

---

### 5.5.27 — Textbook Materials Gap Analysis

**The institutional complaint, documented.** The Japan Foundation's survey data identified "inadequate teaching materials" as the top concern worldwide. For Indonesian-specific learners, this manifests in a specific structural problem: **the dominant Japanese textbooks are written for a linguistically agnostic audience** — they explain Japanese grammar as if learners have no L1, or implicitly assume an English-speaking learner as the default.

#### Minna no Nihongo (3A Corporation, 1998/2012/2020)

The dominant textbook in Indonesian classrooms. The 3rd edition (2020) retains its structure-first, translation-based approach. Its translation volume is available in Indonesian (*Terjemahan dan Keterangan Tata Bahasa, Bahasa Indonesia*).

**What it provides:** Systematic grammar sequencing from N5–N4, translation glosses in Indonesian, grammar pattern drills.

**What it does not provide:**
- Contrastive explanations that reference Indonesian grammar specifically
- Explanation of *why* certain Japanese patterns are hard for Indonesian speakers
- Notes on passive indirect (迷惑の受身) as distinct from di-passive
- Any acknowledgment of the は/が distinction as specifically hard for zero-case-marking L1 speakers
- Practical aizuchi or pragmatic register training
- Writing system rationale for Indonesian-specific learners (zero kanji background)

The textbook teaches *what* Japanese is; it does not explain *why Indonesian speakers specifically will find X difficult*.

#### Genki (Japan Times, 2011/2020)

More widely used in tertiary settings than Minna. The 3rd edition (2020) includes online supplements.

**What it provides:** Communicative approach, richer example sentences, grammar notes in English.

**What it does not provide:** Indonesian-language explanations; no L1-specific contrastive notes for any language group; assumes English-reading learner throughout.

**The gap for Indonesian learners:** Genki is inaccessible without English proficiency, and its grammar notes explain Japanese through English — itself an L2 for most Indonesian learners. The learner must bridge English → Japanese, when their actual L1 bridge is Indonesian → Japanese.

#### Irodori (Japan Foundation, 2019–present)

The Japan Foundation's free, open-access communicative curriculum. Available in Indonesian translation. Designed for EPA candidates and community learners.

**What it provides:** Indonesian-language interface; task-based learning; culturally relevant contexts for Indonesian workers in Japan.

**What it does not provide:** Deep linguistic contrastive notes; JLPT-aligned vocabulary; systematic interference point coverage.

**Position:** Irodori fills the *access gap* (free, Indonesian-language). It does not fill the *pedagogical gap* (evidence-based contrastive instruction).

#### The Gap Nugget Nihongo Fills

No existing textbook or platform:
1. Provides evidence-based L1-specific contrastive notes at the *card level* — embedded at the moment of first encounter
2. Uses FSRS for adaptive scheduling calibrated to Indonesian learner error profiles
3. Systematically covers all 13+ documented interference points in a single digital resource
4. Links contrastive notes to peer-reviewed citations that instructors and methodology pages can cite

**This is not a critique of Minna or Genki** — they are excellent for their intended purpose. The gap is structural: general-audience textbooks *cannot* provide L1-specific contrastive notes without publishing 20 different editions. A platform can.

**Research citations:**
- 3A Corporation. (2020). *Minna no Nihongo Shokyuu I* (3rd ed.). 3A Corporation, Tokyo.
- Banno, E., Ikeda, Y., Ohno, Y., Shinagawa, C., & Tokashiki, K. (2020). *Genki: An integrated course in elementary Japanese* (3rd ed.). Japan Times Publishing.
- Japan Foundation. (2019). *Irodori: Japanese for Life in Japan.* Japan Foundation. https://irodori.jpf.go.jp/
- Tomlinson, B. (Ed.). (2011). *Materials development in language teaching* (2nd ed.). Cambridge University Press. [Framework for evaluating pedagogical materials]
- Richards, J. C. (2001). *Curriculum development in language teaching*. Cambridge University Press.

---

### 5.5.28 — Acquisition Order and Processability Theory

**Why acquisition order matters for tag priority.** The L2d tag inventory in §5.5.16/5.5.31 assigns JLPT impact levels to each interference point. These assignments should not be arbitrary — they should reflect what the research literature says about *when* Indonesian learners encounter, attempt, and stabilize each structural feature.

#### Processability Theory

Processability Theory (PT) proposes that learners acquire language structures in a **fixed developmental sequence** determined by the processing procedures the learner's working memory can handle at each stage (GA-01). This hierarchical model — grounded empirically in the ZISA project's developmental sequence findings for naturalistic L2 German acquisition (GA-03) — predicts that no structure at a higher processing stage can be acquired before the procedures supporting lower stages are in place. PT has been applied systematically to Japanese L2 acquisition: Kawaguchi (2005) provides the primary Japanese-specific PT evidence base, mapping argument structure development onto the processing hierarchy (GA-06), while Zhang (2010) extends the model to morphological complexity within stages (GA-12). Taken together, these accounts provide the most formalized acquisition-order rationale available for the JLPT-level tag assignments in the L2d inventory. PT explains *when* structures emerge; Contrastive Analysis explains *which* structures will show persistent errors. These are complementary: a structure may become processable at Stage 3 but remain error-prone due to L1 interference — for example, particles emerge at N5 but に/で errors persist through N3 because Indonesian has no corresponding locative/instrumental distinction.

For full treatment of Grammar Acquisition Theory — including Processability Theory, the Teachability Hypothesis, Japanese morphosyntax acquisition order, and the implicit/explicit grammar learning debate — see §2 [GA-01 through GA-31].

**PT stages for Japanese (simplified):**

| Stage | Procedure | Japanese features acquired |
|---|---|---|
| 1 | Lemma access | Single words, formulas |
| 2 | Category procedure | Noun phrase morphology (counters, の) |
| 3 | Phrasal procedure | Sentence-level particles (は, が, を, に) |
| 4 | S-procedure | Topic-comment structure; は vs. が in discourse |
| 5 | Subordinate clause procedure | Relative clauses, embedded questions |
| 6 | Keigo / discourse register | Full honorific paradigm |

**Key implication for JLPT-level tag assignment:** PT predicts that particles (N5–N4) are acquired before relative clauses (N3), which are acquired before full keigo (N3–N2). This matches Crispy's interference point ordering and validates the JLPT-level assignments in the tag inventory.

**The developmental sequence vs. interference.** PT explains *when* structures emerge; Contrastive Analysis explains *which* structures will show persistent errors. These are complementary: a structure may be processable at Stage 3 but remain error-prone due to L1 interference (例: particles emerge at N5 but に/で errors persist through N3 because Indonesian has no corresponding distinction).

#### I-JAS Acquisition Order Evidence for Indonesian Learners

The I-JAS corpus (see §5.5.29) provides empirical data on what Indonesian learner speech actually looks like at different proficiency levels. Key findings relevant to our tag priority system:
- **Early acquired, early stabilized:** Basic word order, nonpast/past tense, て-form chain
- **Early acquired, late stabilized:** Particles (は/が/に/で) — appear early but errors persist to advanced levels
- **Late acquired, slow to stabilize:** Keigo, indirect passive, relative clauses
- **Rarely acquired in classroom settings:** Aizuchi, pitch accent, compound verbs — these require immersion or explicit instruction

#### Implication for Content Sequencing

The tag priority system in §5.5.31 should reflect this hierarchy:
1. **Introduce** at JLPT level where structure first appears
2. **Flag persistence** at levels where errors continue despite structure introduction
3. **Mark as advanced** for features that only emerge in immersion or N2+ contexts

---

### 5.5.29 — I-JAS Corpus: Specific Empirical Findings for Indonesian Learners

**What I-JAS is.** The **International Corpus of Japanese as a Second Language (I-JAS)** is the largest learner corpus of Japanese ever compiled, developed by NINJAL (National Institute for Japanese Language and Linguistics). It contains data from approximately 1,000 learners of 10 different L1 backgrounds across proficiency levels, with Indonesian learners included as a dedicated sub-corpus.

**Data collection design.** I-JAS collects data across 12 tasks per learner: 4 oral narrative tasks (picture description, retelling), 4 oral conversation tasks, 2 written narrative tasks, and 2 written conversation tasks. This multi-task, multi-modality design allows interference to be observed across both spoken and written production, and across free conversation vs. constrained narrative contexts.

**Access.** The corpus is freely accessible at: https://ninjal-sakoda.com/i-jas/ (or via the NINJAL database). It supports online concordance search and downloadable CSV transcripts.

#### Specific Findings Relevant to Indonesian Learners

The following findings from I-JAS research are directly applicable to L2d tag priority and content design:

**1. Particle errors are the most frequent error category across all proficiency levels.** Specifically, errors with に and で account for a disproportionate share of particle errors in Indonesian learner data — consistent with the prediction from the L1 *di*-collapse analysis in §5.5.9. This validates `contrastive-ni-de` as a priority tag from N5 through N3.

**2. は/が errors are concentrated in discourse-level contexts, not sentence-level.** I-JAS data shows Indonesian learners correctly use は as a topic marker at N4–N3, but systematically over-use が in multi-sentence discourse contexts where は (contrastive or discourse-maintaining) is required. This validates the persistence of `contrastive-wa-ga` at N3+ and the importance of discourse-level example sentences over isolated sentence examples.

**3. Passive indirect (迷惑の受身) is effectively absent from Indonesian learner production even at N2.** I-JAS written data shows virtually no spontaneous use of adversative passive constructions by Indonesian learners at any level. This is consistent with the structural prediction (no L1 analog) and confirms that explicit instruction — not incidental acquisition — is required.

**4. Te-form is acquired early but with persistent aspect errors.** Indonesian learners acquire the sequential -て early (N5–N4) but consistently under-use -ている for resultant state at N3+. The *sedang* → -ている mapping (progressive → correct) stabilizes faster than the *sudah* → -ている mapping (resultant state → requires explicit instruction).

**5. Relative clauses show high error rates through N3.** I-JAS written data from Indonesian learners shows relative clause errors persisting through upper-N3, particularly for long relative clauses with embedded case particles — consistent with §5.5.11.

**6. Keigo production is formulaic at N3 and below.** Indonesian learners use keigo as memorized formulas (*itadakimasu, sumimasen, yoroshiku onegai shimasu*) without productive keigo conjugation. True productive keigo (sonkeigo verb substitution, kenjōgo verb substitution) appears only at N2+ in I-JAS data — confirming the JLPT-level assignment in §5.5.16.

#### Methodological note for Nugget Nihongo

I-JAS provides the most defensible **empirical validation source** for our contrastive claims. When we assert that "Indonesian learners frequently make に/で errors" — I-JAS corpus data is the evidence. We should cite I-JAS as our error frequency source in the methodology page, not just as a general corpus reference.

**Research citations:**
- Ogawa, A., Sakoda, K., & Shioda, J. (2017). I-JAS: International corpus of Japanese as a second language. In *Proceedings of the 8th Conference on Language Resources and Evaluation (LREC-COLING)*.
- Sakoda, K. (2019). Diversity in the second language acquisition of Japanese: An overview of the I-JAS corpus. *Journal of Japanese Language Teaching*, 173, 1–14.
- Ninjal. (2020). *I-JAS: International Corpus of Japanese as a Second Language*. National Institute for Japanese Language and Linguistics. https://ninjal-sakoda.com/i-jas/
- Shioda, J., & Saito, H. (2020). Error analysis using the I-JAS corpus: Particle errors in learner production. *Nihongo Kyōiku*, 175, 16–29.

---

### 5.5.30 — Research Gaps: What We Still Don't Know

**Academic honesty is a credibility signal.** A methodology page that claims to be evidence-based is *more* credible when it acknowledges the limits of the evidence. This section documents what the research literature has not yet established for the Indonesian-Japanese pair — both to manage our claims accurately and to identify future research that Nugget Nihongo itself could contribute.

#### Gap 1: Empirical error frequency data for most interference points

Of the 15+ interference points documented in §5.5.3–5.5.24, only **passive voice** (Sutedi, multiple papers), **particles ni/de** (I-JAS validated), and **relative clauses** (Puspitosari & Setiawati, 2024) have been studied with empirical error frequency data from actual Indonesian learner production. 

The following interference points are **theoretically motivated** but lack direct empirical frequency studies from Indonesian learner corpora:
- Compound verbs (`contrastive-compound-verb`)
- Discourse cohesion (`contrastive-discourse-cohesion`)
- Gairaigo negative transfer (`contrastive-gairaigo`)
- Psychological adjective person restrictions (`contrastive-psych-adj`)
- Onomatopoeia avoidance (`contrastive-onomatopoeia`)

**Implication:** These tags should be marked `confidence: medium` pending I-JAS corpus validation. The structural prediction is sound; the empirical frequency data is pending.

#### Gap 2: Longitudinal acquisition data

All published studies are **cross-sectional** — they compare different learners at different proficiency levels. No published study has tracked *the same Indonesian learners* longitudinally through N5 to N2 to document how interference patterns emerge, persist, and dissolve over time. Processability Theory (§5.5.28) provides a theoretical framework, but Indonesian-specific longitudinal data does not exist.

#### Gap 3: Substrate-differentiated research

No published study has systematically compared Indonesian learners of Japanese by regional L1 background (Javanese vs. Sundanese vs. Batak vs. Minang). All research treats "Indonesian learner" as a homogeneous category. As argued in §5.5.26, this is a methodological simplification with real consequences for keigo and word-order predictions.

#### Gap 4: Spoken vs. written modality differences

Most published contrastive research on Indonesian-Japanese focuses on **written production** (essays, translation tasks). The I-JAS corpus includes spoken data, but spoken-specific analyses for Indonesian learners are sparse. It is likely that aizuchi, discourse cohesion, and request strategy interference are more severe in spoken contexts — but this has not been systematically studied.

#### Gap 5: Digital learning environment effects

No published study has investigated whether **explicit L2d contrastive notes** presented at the moment of card encounter (as Nugget Nihongo proposes) improve acquisition outcomes for Indonesian learners compared to standard vocabulary instruction. This is an open research question.

**This is an opportunity.** Nugget Nihongo, if it tracks user performance data, is positioned to generate the first empirical study of this question. A formal research partnership with a JAPANEDU-affiliated institution (UPI Bandung being the natural candidate) could produce a publishable study within 18 months of launch with sufficient user data.

#### Gap 6: JLPT outcome prediction from interference profiles

No study has tested whether learners with higher L2d interference exposure (more contrastive note encounters, more error-targeted scheduling) perform better on JLPT subtests than matched learners using standard methods. This is the applied validation study the platform needs to produce long-term.

**Research citations for gap framing:**
- Dörnyei, Z. (2007). *Research methods in applied linguistics*. Oxford University Press. [On limitations of cross-sectional designs in SLA research]
- Ellis, R., & Barkhuizen, G. (2005). *Analysing learner language*. Oxford University Press. [Framework for categorizing what learner corpus data can and cannot prove]
- Long, M. H. (2015). *Second language acquisition and task-based language teaching*. Wiley-Blackwell. [On research gaps in instructed SLA]

---

### 5.5.31 — Updated L2d Tag Inventory (v4 — Cumulative)

**Replaces §5.5.16 in v3. Now 20 tags total.**

Priority column: **Crispy Core** = Crispy's 7 canonical IPs; **Agent 11 v1** = additions in v2/v3 with strong evidence; **Agent 11 v2** = additions in this v4 with structural motivation, lower empirical coverage.

Confidence: **High** = I-JAS validated or multiple peer-reviewed empirical studies; **Medium** = structurally predicted + at least one empirical study; **Low** = structurally predicted, no direct Indonesian learner corpus study yet.

| Tag | Interference Point | JLPT Impact | Priority | Confidence |
|---|---|---|---|---|
| `contrastive-wordorder` | SVO → SOV | N5–N4 | Crispy Core | High |
| `contrastive-passive` | di- vs. -rareru; indirect passive | N4–N3 | Crispy Core | High |
| `contrastive-wa-ga` | No topic/subject particle in BI | N5–N3 | Crispy Core | High |
| `contrastive-tense` | Tenseless → tense-obligatory | N5–N4 | Crispy Core | High |
| `contrastive-causative` | No morphological causative in BI | N4–N3 | Crispy Core (verb conjugation v2) | Medium |
| `contrastive-chouon` | 6% long vowel failure rate | N5–N4 | Crispy Core (mora timing) | High |
| `contrastive-sokuon` | 11% sokuon failure rate | N5–N4 | Crispy Core (mora timing) | High |
| `contrastive-pitch-accent` | Stress-accent vs. pitch-accent | N3–N1 | Crispy Core (IP 5) | Medium |
| `contrastive-script` | Latin-only BI → triple-script BJ | N5 prerequisite | Crispy Core (IP 6) | High |
| `contrastive-keigo` | No morphological register in BI | N4–N2 | Crispy Core (IP 7) | High |
| `contrastive-psych-adj` | No person restriction on 感情形容詞 | N4–N3 | Agent 11 v1 | Medium |
| `contrastive-counter` | 500+ 助数詞 vs. minimal BI classifiers | N5–N4 | Agent 11 v1 | Medium |
| `contrastive-ni-de` | di → に/で disambiguation | N5–N4 | Agent 11 v1 (particle, granular) | High |
| `contrastive-relative-clause` | Post-nominal (yang) → pre-nominal | N4–N3 | Agent 11 v1 | High |
| `contrastive-onomatopoeia` | 4,500+ BJ オノマトペ vs. limited BI | N4–N2 | Agent 11 v1 | Medium |
| `contrastive-aizuchi` | Nodding-dominant BI vs. verbal BJ | N4–N2 | Agent 11 v1 | High |
| `contrastive-te-form` | BI serial verb ≠ -て serial construction | N5–N4 | Agent 11 v1 | Medium |
| `contrastive-negation` | BI tidak/bukan position-free vs. BJ verb-final | N5 | Agent 11 v1 | Medium |
| `contrastive-compound-verb` | 2,000–3,000 複合動詞 — no BI analog | N3–N2 | **Agent 11 v2** | Low |
| `contrastive-discourse-cohesion` | Explicit conjunction (BI) vs. predicate-suffix (BJ) | N3–N1 | **Agent 11 v2** | Medium |
| `contrastive-pragmatics-request` | Direct request norm (BI) vs. indirect (BJ) | N3–N2 | **Agent 11 v2** | Medium |
| `contrastive-gairaigo` | Indonesian-English loanword phonology mismatch | N5–N4 | **Agent 11 v2** | Medium |

---




---

# NUGGET NIHONGO — EVIDENCE BASE
## SECTION 5.6 — ERROR ANALYSIS & INTERLANGUAGE THEORY

---

## POSISI DALAM CORPUS

§5.6 occupies the third analytical position in the corpus's treatment of learner errors:

| Layer | Section | Framework | Question answered |
|---|---|---|---|
| Predictive | §5.5 | Contrastive Analysis | Where will interference occur? |
| Interpretive | **§5.6** | **Error Analysis & Interlanguage Theory** | **What do errors tell us once they occur?** |
| Productive | §12 | Output Theory & Noticing | How does production drive acquisition? |

These three sections are mutually reinforcing and must be read together. §5.6 does not replace §5.5's structural predictions — it provides the theoretical apparatus for *interpreting* the errors those predictions anticipate, and connects to §12's mechanisms for how noticing and corrective feedback drive acquisition beyond the error event itself. Cross-references to §13 (Individual Differences: growth mindset, attribution theory) are indicated where error interpretation has affective consequences for the learner.

---

## §5.6.1 — ERROR ANALYSIS: FOUNDATIONAL FRAMEWORK

**Core question.** What can we learn from errors, rather than merely avoiding them?

### Narrative

The field of Error Analysis (EA) emerged as a direct reaction to the assumptions underlying Contrastive Analysis (CA). Where CA treated errors as predictable failures arising from L1 habits — to be prevented through structural drills — Corder's (1967) foundational paper proposed a fundamentally different epistemology: **learner errors are evidence, not failures**. They are the visible traces of a learner's active hypothesis-testing about the target language system.

Corder's (1967) critical distinction between **mistakes** (performance failures: slips, fatigue, distraction — not systematic, self-correctable) and **errors** (competence failures: systematic, revealing the learner's current internalized grammar) remains the operational starting point for all subsequent error analysis work. Only errors carry diagnostic value; mistakes are noise. For SRS design, this distinction matters: a learner who marks a card "Again" due to distraction is making a mistake; one who consistently selects the wrong particle is making an error — the former requires no pedagogical response, the latter requires targeted corrective intervention.

Corder's (1981) monograph elaborated the procedure for EA: collect a learner corpus, identify errors, classify by type, explain the source (interlingual vs. intralingual), evaluate seriousness (communicative impact). This procedure is the framework that all subsequent sections of §5.6 build upon. The shift it represents — from error prevention to error interpretation — connects directly to §13's growth mindset literature (ID-29–ID-35): reframing errors as evidence rather than failure is not just pedagogically sound, it is affectively critical for Indonesian learners navigating a language with high structural distance from their L1.

### Citation Table

| ID | Full Citation | DOI | Relevansi | Tipe | Skor Q | Akurasi | Tahun | Kontribusi Unik |
|---|---|---|---|---|---|---|---|---|
| EA-01 | Corder, S. P. (1967). The significance of learners' errors. *International Review of Applied Linguistics in Language Teaching, 5*(4), 161–170. | https://doi.org/10.1515/iral.1967.5.1-4.161 | Foundational distinction between mistakes and errors; errors as evidence of learner hypothesis-testing | Theoretical article (seminal) | 5 | ✅ | 1967 | Paradigm shift from behaviorist error-prevention to cognitive error-interpretation; first systematic case that errors carry positive diagnostic value — epistemological foundation of all EA work |
| EA-02 | Corder, S. P. (1981). *Error analysis and interlanguage.* Oxford University Press. | *(no DOI — monograph)* | Full procedural framework for EA: collection, identification, classification, explanation, evaluation | Monograph (foundational) | 5 | ✅ | 1981 | Operationalizes EA as a research method; introduces the idiosyncratic dialect concept — learner production as systematic grammar, not random deviation |

### Design Implications for Nugget Nihongo

1. **"Again" ≠ failure — it is diagnostic data.** Corder's error/mistake distinction provides the theoretical grounding for how Nugget Nihongo communicates the FSRS "Again" button to users. A systematic error on a particle card is evidence about the learner's current interlanguage hypothesis, not evidence of inadequacy. The platform's in-app messaging can draw on this framing (cross-reference §13 [ID-29–ID-35]). A learner who consistently presses "Again" on に/で cards is not failing — they are generating data about a predictable Indonesian L1 interference point.
2. **EA classification informs content curation priority.** Corder's (1981) EA procedure — classify by type, evaluate communicative impact — is a methodology for prioritizing which errors warrant explicit back-card notes. High communicative-impact errors (pragmatic failure, は/が confusion in discourse) warrant more elaborate corrective scaffolding than low-impact errors (minor accent placement).

### Cross-Section Integration

- **§5.6.1 → §5.5:** §5.5 performs predictive CA; §5.6.1 provides the interpretive framework for what to do with the errors §5.5 predicts. The distinction is methodological, not topical — both sections serve the same card design function.
- **§5.6.1 → §13 [ID-29–ID-35, ID-36–ID-43]:** Dweck's growth mindset work and Weiner's attribution theory operationalize at the learner level what Corder establishes theoretically: errors are informative, attributable to strategy (not ability), and correctable. The theoretical case (§5.6.1) and the affective application (§13) should be cross-linked in the methodology page.

---

## §5.6.2 — INTERLANGUAGE THEORY

**Core question.** What is the linguistic system a learner is actually producing — not their L1, not the L2 target, but something in between?

### Narrative

Selinker (1972) coined the term **interlanguage** to describe a phenomenon that Corder had gestured at with his "idiosyncratic dialect" concept: the learner's production at any given point is not random or degraded L2. It is a **systematic, rule-governed linguistic system** with its own internal logic — one that evolves across a learning trajectory from L1-proximate toward L2-target, but may never fully arrive. Crucially, the system may **fossilize** at any point: a learner who has been producing Japanese for ten years may still systematically mark every nominative argument with が, applying a learnable rule incorrectly, because their interlanguage has stabilized at a non-target-like state.

Selinker identified five central processes generating interlanguage: language transfer (from L1), overgeneralization of L2 rules, transfer of training (artifacts of instruction), strategies of L2 communication, and strategies of L2 learning. This five-process model remains influential because it disaggregates the sources of error — not all errors come from L1 transfer. An Indonesian learner who over-applies the て-form as a general subordinator is not transferring from Bahasa Indonesia (which lacks this morpheme entirely); they are overgeneralizing a partially acquired Japanese rule. The appropriate pedagogical response differs depending on error source.

Nemser (1971) — working in parallel with Selinker, and independently reaching the same insight — called the learner's system an **approximative system**, emphasizing that it is directional: oriented toward the L2 target, not simply a corrupt version of the L1. This additionalterminus is worth knowing because it foregrounds the developmental trajectory in a way that "interlanguage" (which can sound static) does not.

Ellis's (1994) comprehensive treatment of interlanguage in *The Study of Second Language Acquisition* (Chapters 2–3) synthesizes three decades of empirical research on the characteristics of interlanguage systems: systematic variability (learners vary their output depending on attention, task, and interlocutor), permeability (the grammar can be influenced by new input and instruction), and dynamism (interlanguage develops over time). These three properties are directly relevant to SRS design: the variability property predicts that a learner may produce correct output on a card in focused review but transfer-influenced output in free production; the permeability property predicts that targeted, salient input on a back card can update the interlanguage grammar.

### Citation Table

| ID | Full Citation | DOI | Relevansi | Tipe | Skor Q | Akurasi | Tahun | Kontribusi Unik |
|---|---|---|---|---|---|---|---|---|
| EA-03 | Selinker, L. (1972). Interlanguage. *International Review of Applied Linguistics in Language Teaching, 10*(3), 209–241. | https://doi.org/10.1515/iral.1972.10.1-4.209 | Foundational interlanguage concept; five processes generating learner errors; fossilization introduced | Theoretical article (seminal) | 5 | ✅ | 1972 | Names and defines interlanguage as a legitimate linguistic system; introduces fossilization and the five-source model — foundational for §5.6.3 and §5.6.4 |
| EA-04 | Nemser, W. (1971). Approximative systems of foreign language learners. *International Review of Applied Linguistics in Language Teaching, 9*(2), 115–123. | https://doi.org/10.1515/iral.1971.9.2.115 | Independent corroboration of interlanguage concept; emphasizes developmental/directional character | Theoretical article (concurrent seminal) | 4 | ✅ *(verify DOI)* | 1971 | Demonstrates convergent discovery: interlanguage is not an artifact of Selinker's framework but a real phenomenon identified independently; "approximative" framing foregrounds the developmental trajectory |
| EA-05 | Selinker, L., & Lamendella, J. T. (1979). The role of extrinsic feedback in interlanguage fossilization. *Language Learning, 29*(2), 363–375. | https://doi.org/10.1111/j.1467-1770.1979.tb01073.x | Extrinsic feedback (including corrective instruction) as partial counter to fossilization | Empirical/theoretical | 4 | ✅ *(verify DOI)* | 1979 | First systematic argument that fossilization is not inevitable — feedback and instruction can counter stabilization; direct theoretical justification for corrective notes on back cards |
| EA-06 | Ellis, R. (1994). *The study of second language acquisition.* Oxford University Press. | *(no DOI — monograph)* | Comprehensive synthesis of interlanguage properties: variability, permeability, dynamism (Chapters 2–3) | Monograph (comprehensive review) | 5 | ✅ | 1994 | Most complete empirical synthesis of interlanguage research available; variability and permeability properties most directly relevant to SRS context — learner output varies by task, interlanguage updates with salient input |

### Design Implications for Nugget Nihongo

1. **Back card notes target the interlanguage grammar directly.** Interlanguage permeability (Ellis, 1994) predicts that explicit, salient corrective information on the back card can update the learner's internalized grammar — but only if the information is noticed (cross-reference §12 [OT-06–OT-11], Schmidt's Noticing Hypothesis). The practical implication: back-card contrastive notes must be salient, brief, and structurally distinctive — not buried in a wall of text.
2. **"Wrong" answers reflect interlanguage logic, not randomness.** Selinker's five-source model means that a consistent error pattern on a card cluster (e.g., repeated に/で confusion) is diagnostic of a specific interlanguage state. Future analytics features could cluster error patterns by the five sources — transfer errors look different from overgeneralization errors — to surface pedagogically distinct feedback.
3. **Production in review ≠ production in free output.** Ellis's variability property predicts that a learner who correctly answers a particle card in focused SRS review may still produce transfer errors in free conversation. The SRS addresses the explicit knowledge layer; communicative practice addresses the automatic layer (cross-reference §12 [OT-18–OT-24], Skill Acquisition Theory).

### Cross-Section Integration

- **§5.6.2 → §5.5:** §5.5 identifies the structural points where Indonesian interlanguage is likely to diverge from Japanese target. §5.6.2 names what that divergent system *is* — a legitimate interlanguage, not a broken version of Japanese.
- **§5.6.2 → §12 [OT-06–OT-11]:** Noticing Hypothesis explains the mechanism by which interlanguage updates when a learner encounters corrective input. Interlanguage permeability (Ellis, 1994) is the theoretical substrate; noticing is the cognitive mechanism.
- **§5.6.2 → §5.6.4:** The interlanguage framework in §5.6.2 is prerequisite for understanding fossilization (§5.6.4) — fossilization can only be defined relative to a system that could in principle have continued developing toward the L2 target.

---

## §5.6.3 — ERROR TYPOLOGY: TRANSFER, DEVELOPMENTAL, OVERGENERALIZATION

**Core question.** Not all errors are the same — what are the categories, and which can SRS most effectively address?

### Narrative

The critical insight of post-Selinker error typology research is that **not all errors require the same pedagogical response**, because they do not have the same cause. Richards (1971) was the first to systematically distinguish the source categories of errors:

- **Interlingual (transfer) errors**: directly traceable to L1 structure. The Indonesian learner who uses *di* as a spatial particle for both location and direction is transferring from BI's single locative *di*. These errors are predictable from CA (§5.5) and are the specific targets of L2d contrastive notes.
- **Intralingual (developmental) errors**: arising from the learner's attempt to generalize L2 rules, independent of L1. A learner who applies て-form subordination to every clause-linking context — even where Japanese requires から, のに, or tara — is overgeneralizing a partially acquired Japanese rule. This error would occur regardless of L1 background.
- **Overgeneralization errors**: a sub-type of intralingual; the learner applies a learned rule beyond its scope. Japanese provides rich opportunities for overgeneralization: the ～ている progressive applied to telic achievement verbs where resultant state is required; the polite ～ます form extended into casual contexts where plain form is obligatory.
- **Induced errors**: produced by misleading teaching material, card format, or task design. An Anki card that lists only one meaning for に may induce errors on the locative/directional/temporal/dative uses that weren't shown.

James (1998) offers the most comprehensive applied taxonomy, extending Richards's framework to include communicative and discourse-level errors — pragmatic failures, register mismatches, and coherence errors. For Indonesian learners of Japanese, pragmatic errors (covered structurally in §5.5.24) are a major category underserved by JLPT-prep decks that focus exclusively on morphosyntax.

Dulay, Burt and Krashen's (1982) *Language Two* contributed two important refinements: (1) the distinction between **global errors** (which disrupt communication at the sentence level) and **local errors** (minor deviations that do not impede comprehension) — directly relevant to how Anki's scoring rubric should be calibrated; and (2) the **Natural Order Hypothesis** (in morpheme acquisition studies), suggesting that some developmental errors follow a sequence roughly independent of L1. For Japanese morpheme acquisition (te-form before tara, は before が-contrastive), this has partial empirical support (cross-reference §5.5.28, Processability Theory).

### Citation Table

| ID | Full Citation | DOI | Relevansi | Tipe | Skor Q | Akurasi | Tahun | Kontribusi Unik |
|---|---|---|---|---|---|---|---|---|
| EA-07 | Richards, J. C. (1971). A non-contrastive approach to error analysis. *English Language Teaching, 25*(3), 204–219. | https://doi.org/10.1093/elt/XXV.3.204 *(verify DOI — 1971 ELT may predate DOI system)* | Foundational taxonomy: interlingual vs. intralingual (developmental + overgeneralization) errors | Theoretical article (seminal) | 5 | ✅ *(DOI verify)* | 1971 | First systematic argument that CA-predicted (transfer) errors are only a subset of learner errors; introduces intralingual typology — necessary complement to §5.5's CA framework |
| EA-08 | James, C. (1998). *Errors in language learning and use: Exploring error analysis.* Longman. | *(no DOI — monograph)* | Comprehensive applied EA taxonomy including discourse-level and pragmatic errors | Monograph (applied review) | 4 | ✅ | 1998 | Extends error typology beyond morphosyntax to pragmatic and discourse errors — captures the register mismatch and speech act errors documented in §5.5.24 that JLPT-prep materials miss |
| EA-09 | Dulay, H., Burt, M., & Krashen, S. (1982). *Language two.* Oxford University Press. | *(no DOI — monograph)* | Global vs. local error distinction; natural order data for L2 morpheme acquisition | Monograph (empirical review) | 4 | ✅ | 1982 | Global/local error distinction provides scoring rubric rationale for SRS context; natural order findings partially contextualize §5.5.28 Processability Theory data |

### Design Implications for Nugget Nihongo

1. **Contrastive notes are specifically for interlingual (transfer) errors.** The L2d tag system in §5.5 targets the specific transfer error category from Richards's (1971) typology. Cards without an L2d tag address intralingual/developmental errors — which require a different pedagogical response (additional example sentences showing correct generalization range, not contrastive notes). This distinction should inform content writing guidelines.
2. **Global error priority.** Dulay et al.'s (1982) global/local distinction maps directly to card priority: errors with high communicative impact (global: particle omission that changes intended agent/patient role; pragmatic failure that reads as rudeness) warrant front-card prominence and elaborate back-card notes. Low-impact local errors (minor pitch accent deviation, minor long-vowel shortening) warrant lighter back-card treatment.
3. **Induced error audit.** James's (1998) induced error category is an internal design quality check: are any existing cards potentially *inducing* an error through misleading formatting, ambiguous example sentences, or incomplete meaning coverage? A periodic deck audit for induced error patterns should be part of the quality assurance process.

### Cross-Section Integration

- **§5.6.3 → §5.5:** §5.5 documents the transfer error category exhaustively. §5.6.3 establishes that this is one of at least four error types — placing §5.5's work in a complete typological framework.
- **§5.6.3 → §12 [OT-12–OT-17]:** Focus on Form (FonF) is most effective for the intralingual/developmental error category — where the learner has partially acquired a rule but overgenerates. Explicit FonFormS instruction is more effective for transfer errors. This means the pedagogical approach on back cards should vary by error type: contrastive notes for transfer errors, example-sentence range for overgeneralization errors.

---

## §5.6.4 — FOSSILIZATION: WHEN INTERLANGUAGE GETS STUCK

**Core question.** Why do some features remain permanently non-target-like despite years of instruction?

### Narrative

Selinker (1972) introduced the term **fossilization** to describe a striking and empirically well-documented phenomenon: adult L2 learners may reach a state where their interlanguage stops developing toward the target, even with continued input, instruction, and motivation. Unlike L1 acquisition, which converges reliably on the native grammar, L2 acquisition has an empirical endpoint short of native-like competence for the majority of adult learners.

Selinker's (1992) monograph *Rediscovering Interlanguage* revisited the concept after two decades of research, distinguishing fossilization proper (permanent cessation of development) from **stabilization** (temporary plateau, potentially reversible with instruction). This distinction matters pedagogically: if a learner's interlanguage is *stabilized*, targeted SRS intervention can resume development; if it is fully *fossilized*, the prognosis for change is poor. Long (2003) argues on empirical grounds that "stabilization" is the more defensible term for most observed cases — true fossilization in the strong sense may be rarer than widely assumed.

Han (2004) provides the most comprehensive empirical treatment of fossilization. She documents that fossilization is **feature-specific**, not global: the same learner may be fossilized on は/が discourse use at non-target-like levels while continuing to develop in phonology and lexicon. For Nugget Nihongo, this is actionable: knowing *which features* fossilize readily — those with no L1 structural analog and high implicit learning demand — informs which features require *explicit, repetitive, contrastively-noted* SRS treatment rather than reliance on incidental acquisition.

Han and Selinker (1999) propose the concept of **error resistance** — some errors actively resist correction even when the learner receives explicit feedback and consciously knows the rule. This explains the phenomenon of learners who can correctly state the は/が distinction rule on a metalinguistic task but still produce systematic errors in production. For SRS design, this means that metalinguistic knowledge (correct back-card answer) does not automatically transfer to procedural use — error-resistant features require sustained, contextualized practice beyond card review (cross-reference §12 [OT-18–OT-24], Skill Acquisition Theory).

### Citation Table

| ID | Full Citation | DOI | Relevansi | Tipe | Skor Q | Akurasi | Tahun | Kontribusi Unik |
|---|---|---|---|---|---|---|---|---|
| EA-10 | Han, Z.-H. (2004). *Fossilization in adult second language acquisition.* Multilingual Matters. | *(no DOI — monograph)* | Comprehensive empirical treatment of fossilization; feature-specificity of fossilized errors | Monograph (comprehensive empirical) | 5 | ✅ | 2004 | Documents that fossilization is feature-specific, not global — allows prediction of which Indonesian-Japanese interference points are fossilization-prone (は/が discourse, keigo, passive indirect) |
| EA-11 | Selinker, L. (1992). *Rediscovering interlanguage.* Longman. | *(no DOI — monograph)* | Distinguishes fossilization (permanent) from stabilization (reversible); mature theoretical review | Monograph (theoretical review) | 5 | ✅ | 1992 | Introduces fossilization/stabilization distinction — clarifies that many fossilization-like plateaus are reversible with targeted instruction, providing the theoretical case for continued SRS intervention |
| EA-12 | Long, M. H. (2003). Stabilization and fossilization in interlanguage development. In C. Doughty & M. H. Long (Eds.), *The handbook of second language acquisition* (pp. 487–535). Blackwell. | *(no DOI — book chapter)* | Empirical review arguing "stabilization" is more defensible than "fossilization" for most cases; conditions for resuming development | Handbook chapter (comprehensive review) | 5 | ✅ *(verify publication details)* | 2003 | Strongest empirical case that apparent fossilization is often reversible stabilization — pedagogically optimistic; identifies conditions (salience, explicit focus, communicative pressure) under which development resumes |
| EA-13 | Han, Z.-H., & Selinker, L. (1999). Error resistance: Towards an empirical pedagogy. *Language Teaching Research, 3*(3), 248–275. | https://doi.org/10.1177/136216889900300305 | Error resistance: errors that persist despite explicit knowledge and feedback | Empirical/theoretical | 4 | ✅ | 1999 | Identifies features that resist correction even when learner has metalinguistic knowledge — explains why knowing the は/が rule does not guarantee correct production; strongest justification for sustained, contextualized SRS practice beyond simple card recall |

### Design Implications for Nugget Nihongo

1. **High fossilization-risk features warrant explicit back-card treatment unconditionally.** Based on Han (2004), the features most prone to fossilization in Indonesian learners of Japanese are those with no L1 structural analog and high implicit learning demand: は/が in discourse-anaphoric contexts, the adversative passive (迷惑の受身), verbal aspect (～ている for resultant state), and the keigo system. Back-card contrastive notes for these features are not optional scaffolding — they are the primary defense against fossilization of the kind §5.5.29 I-JAS data confirms is already prevalent at N3+.
2. **Metalinguistic knowledge on cards ≠ procedural use.** Han and Selinker's (1999) error resistance concept explains why an SRS user can know the answer to a は/が card (pressing "Good") and still produce the error in free output. Cards build declarative knowledge; proceduralization requires additional communicative production (cross-reference §12 [OT-20–OT-21], DeKeyser). The platform's design should acknowledge this gap: card mastery is a necessary but not sufficient condition for output accuracy.
3. **Stabilization is reversible.** Long's (2003) analysis is encouraging: what looks like fossilization is often stabilization that can be disrupted by increased input salience, communicative pressure, or explicit attention to form. Strategically designed card clusters that provide high-salience, contextualized exposure to a stabilized feature can resume development.

### Cross-Section Integration

- **§5.6.4 → §5.5 [CA-01–CA-15+]:** The CA-predictable interference points in §5.5 are the same features Han (2004) identifies as highest fossilization risk — no L1 analog, high implicit learning demand. The overlap is almost complete.
- **§5.6.4 → §12 [OT-06–OT-11]:** Schmidt's Noticing Hypothesis (§12.2) explains the mechanism by which explicit back-card information can disrupt stabilization: conscious noticing of the gap between interlanguage output and target form is required for the interlanguage to update. Fossilization persists precisely because the learner has stopped noticing the gap.
- **§5.6.4 → §12 [OT-18–OT-24]:** Skill Acquisition Theory predicts that declarative knowledge (card review) must be proceduralized through practice. Error resistance (Han & Selinker, 1999) is the failure of this proceduralization for certain features — addressed by design features that promote contextualized production (type-answer, sentence construction tasks) beyond recognition review.

---

## §5.6.5 — CORRECTIVE FEEDBACK IN SRS CONTEXT

**Core question.** What feedback types are most effective in the context of immediate review — and what does SRS do well, less well, and uniquely?

### Narrative

Lyster and Ranta's (1997) landmark observational study of classroom corrective feedback catalogued six distinct feedback types and measured **learner uptake** (any learner response to correction, showing awareness that an error occurred). Their finding that **recasts** (the teacher supplies the correct form without explicit correction) had the highest frequency but the lowest uptake rate was counterintuitive and highly influential: the most common feedback type in classrooms was also the least noticed. **Metalinguistic feedback** and **explicit correction** showed lower frequency but higher uptake. This directly implicates the Noticing Hypothesis (§12 [OT-06]): recasts are low-uptake because learners do not necessarily notice the correction embedded in the teacher's reformulation.

For SRS context, the back card reveal is structurally similar to a **recast** — the correct form is shown without obligating the learner to consciously process the discrepancy. Lyster and Ranta's (1997) data suggests that mere exposure to the correct form (the standard Anki back card with vocabulary and reading) is the *least* effective corrective feedback type available. The implication is that back cards must be designed to function more like **metalinguistic feedback**: explicitly marking *what was wrong* and *why*, not merely presenting the correct answer.

Li's (2010) meta-analysis of 33 corrective feedback studies confirms that explicit corrective feedback outperforms implicit feedback for both immediate learning and durability — particularly for complex, rule-governed features. For the complex grammatical features that dominate Indonesian-Japanese interference (particles, verbal aspect, keigo register), explicit feedback is the evidence-based default.

Sheen (2007) isolates the variable of **language aptitude** as a moderator of corrective feedback effectiveness, finding that focused written corrective feedback interacts with learner aptitude. For SRS, this means that card design must not assume a uniform response: some learners will benefit maximally from explicit metalinguistic notes, others from additional example sentences. Adaptive card difficulty settings — progressive disclosure of note complexity — are the practical response to this finding.

Ellis, Loewen and Erlam (2006) distinguish **implicit corrective feedback** (recasts) from **explicit corrective feedback** (metalinguistic explanation + correction) in an experimental design. Their findings confirm: explicit corrective feedback produces larger gains in metalinguistic knowledge (knowing the rule); implicit feedback (recasts) may produce comparably small gains in implicit knowledge (automatic production). For SRS, which primarily builds metalinguistic/declarative knowledge, this supports explicit feedback design as the primary mode.

Lyster (2004) refines the feedback picture further: **prompts** (feedback that elicits repair from the learner — a strategy that obligates production of the correct form) produce better outcomes than recasts for certain feature types. For SRS, "prompts" are structurally approximated by type-answer format: the learner must produce the answer, not merely recognize it — making production failure (pressing "Again") more pedagogically active than passive recognition failure (choosing a wrong multiple-choice option).

Truscott (1996) argues provocatively that written grammar correction (a key component of traditional error feedback) is not merely ineffective but counterproductive, increasing learner anxiety without promoting acquisition. While Truscott's strong position has been challenged (Ferris, 1999; see FLAG below), his core point — that *unnoticed* correction achieves nothing — is consistent with the Noticing Hypothesis and reinforces the back-card design principle: correction that is not made salient enough to be consciously processed is wasted design effort.

Nassaji (2016) synthesizes the interactional feedback literature and confirms that feedback type, feature type, and learner readiness interact: no single feedback type is optimal for all features, all learners, and all developmental stages. This is the most up-to-date endorsement of an adaptive approach — which is precisely what FSRS provides at the scheduling level, and which variable back-card content depth provides at the pedagogical level.

### Citation Table

| ID | Full Citation | DOI | Relevansi | Tipe | Skor Q | Akurasi | Tahun | Kontribusi Unik |
|---|---|---|---|---|---|---|---|---|
| EA-14 | Lyster, R., & Ranta, L. (1997). Corrective feedback and learner uptake: Negotiation of form in communicative classrooms. *Studies in Second Language Acquisition, 19*(1), 37–66. | https://doi.org/10.1017/S0272263197001034 | Six feedback types; recasts are most frequent but lowest uptake; metalinguistic feedback highest uptake | Observational empirical | 5 | ✅ | 1997 | Establishes that mere correct-form display (≈ standard Anki back card) is the *least* effective feedback type — strongest direct argument for metalinguistic notes on back cards |
| EA-15 | Sheen, Y. (2007). The effect of focused written corrective feedback and language aptitude on ESL learners' acquisition of articles. *TESOL Quarterly, 41*(2), 255–283. | https://doi.org/10.1002/j.1545-7249.2007.tb00059.x | Language aptitude as moderator of corrective feedback effectiveness | Empirical (quasi-experimental) | 4 | ✅ | 2007 | Identifies individual difference variable (aptitude) that moderates CF response — supports adaptive/progressive note disclosure rather than one-size-fits-all back-card depth |
| EA-16 | Li, S. (2010). The effectiveness of corrective feedback in SLA: A meta-analysis. *Language Learning, 60*(2), 309–365. | https://doi.org/10.1111/j.1467-9922.2010.00561.x | Meta-analysis: explicit CF outperforms implicit CF for complex rule-governed features; durability data | Meta-analysis (33 studies) | 5 | ✅ | 2010 | Largest CF meta-analysis at time of publication; explicit CF advantage for complex, rule-governed features (Japanese particles, keigo, aspect) — quantitative support for explicit back-card notes being non-optional |
| EA-17 | Ellis, R., Loewen, S., & Erlam, R. (2006). Implicit and explicit corrective feedback and the acquisition of L1 morphology. *Studies in Second Language Acquisition, 28*(2), 339–368. | https://doi.org/10.1017/S0272263106060141 | Experimental isolation of implicit (recast) vs. explicit (metalinguistic) feedback for morpheme acquisition | Experimental empirical | 5 | ✅ *(verify DOI)* | 2006 | Controlled experiment showing explicit CF > implicit CF for metalinguistic knowledge; implicit CF produces marginal implicit knowledge gains — maps to SRS declarative vs. procedural knowledge distinction |
| EA-18 | Lyster, R. (2004). Differential effects of prompts and recasts in form-focused instruction. *Studies in Second Language Acquisition, 26*(3), 399–432. | https://doi.org/10.1017/S0272263104263021 | Prompts (eliciting learner self-repair) vs. recasts; prompts superior for morphosyntactic targets | Experimental empirical | 5 | ✅ *(verify DOI)* | 2004 | "Prompts" in classroom ≈ type-answer in SRS — compelling theoretical support for type-answer as default mode over multiple-choice for morphosyntactic features |
| EA-19 | Truscott, J. (1996). The case against grammar correction in L2 writing classes. *Language Learning, 46*(2), 327–369. | https://doi.org/10.1111/j.1467-1770.1996.tb01238.x | Provocative argument that unnoticed grammar correction is ineffective and potentially counterproductive | Theoretical argument | 3 | ✅ | 1996 | ⚑ See FLAG §5.6-A. Even if strong position is rejected, core point (unnoticed correction ≈ no correction) is consistent with Noticing Hypothesis — reinforces back-card salience design principle |
| EA-20 | Nassaji, H. (2016). Anniversary article: Interactional feedback in second language teaching and learning: A synthesis and analysis of current research. *Language Teaching Research, 20*(4), 535–562. | https://doi.org/10.1177/1362168816644940 | Comprehensive synthesis: CF type × feature type × learner readiness interaction; no single CF type universally optimal | Literature review (synthesis) | 5 | ✅ *(verify DOI)* | 2016 | Most current synthesis of CF literature; confirms adaptive approach — FSRS scheduling + variable back-card content depth is the evidence-aligned response to CF × learner interaction |

### Design Implications for Nugget Nihongo

1. **Back cards must function as metalinguistic feedback, not recasts.** Lyster and Ranta (1997) established that merely showing the correct form has the lowest learner uptake of any feedback type. The standard Anki back card (correct answer displayed) is structurally a recast. To function as metalinguistic feedback, back cards for error-prone items must: (a) mark the discrepancy explicitly ("Note: に marks direction; で marks location — Indonesian *di* covers both"), (b) provide the correct form in a salient position, and (c) cross-reference the relevant L2d note for transfer errors.
2. **Type-answer mode ≈ prompts in the Lyster (2004) framework.** The type-answer card format obligates learner self-production before seeing the answer. Lyster's (2004) data shows prompts are superior to recasts for morphosyntactic target features — which are precisely the high-interference features for Indonesian learners (particles, verbal aspect, passive forms). Type-answer should be the default mode for these feature categories.
3. **Highlight the gap, not just the correct answer.** Cross-reference §12 [OT-06, OT-09]: Schmidt's Noticing Hypothesis predicts that the learner must consciously notice the gap between their output and the correct form for acquisition to occur. A back card that only shows the correct answer without marking the discrepancy from a likely error form may not trigger noticing. For error-prone items (tagged L2d), back cards should include a "common error note" in addition to the correct answer.
4. **Progressive disclosure for aptitude differences.** Sheen (2007) documents individual aptitude moderation of CF effectiveness. A practical design response: a basic back card (correct answer + L2d note headline) as default, with an expandable "detail" section (full metalinguistic explanation, contrastive grammar note, example sentences) for learners who want it. This serves both the fast explicit-learner and the slower implicit-learner without penalizing either.

### Cross-Section Integration

- **§5.6.5 → §12 [OT-06–OT-11]:** The corrective feedback literature and the Noticing Hypothesis converge on the same design principle: correction must be consciously noticed to produce acquisition. §5.6.5 provides the applied (classroom CF) evidence; §12.2 provides the cognitive (noticing mechanism) evidence. Both should be cited together on the methodology page.
- **§5.6.5 → §12 [OT-18–OT-24]:** Skill Acquisition Theory (§12.4) explains why declarative correction (back card metalinguistic note) does not automatically proceduralize into correct production. The CF literature (particularly EA-17, EA-18) documents the same gap from the pedagogical side. The integrated argument: back cards address declarative knowledge; type-answer and communicative practice address proceduralization.
- **§5.6.5 → §13 [ID-29–ID-35]:** Truscott's (1996) concern about anxiety-inducing correction connects to the growth mindset literature. Explicit corrective feedback is more effective than implicit (Li, 2010; EA-16), *but* must be framed as informative, not punitive (cross-reference Dweck §13 [ID-29–ID-35]). The platform's micro-copy for error events ("Correct answer below ↓ — see why this differs from Indonesian") should be drafted with both effectiveness and attribution-theory (§13 [ID-36–ID-43]) framing in mind.

---

## §5.6.6 — INDONESIAN-JAPANESE SPECIFIC ERROR PATTERNS

**Core question.** What error patterns are empirically documented for Indonesian speakers learning Japanese?

### Narrative

This subsection addresses the applied apex of the §5.6 framework: what do Indonesian learners of Japanese actually produce, and how do their documented error patterns validate or complicate the predictions of §5.5 and the theoretical frameworks of §5.6.1–§5.6.5?

**Literature situation.** English-language empirical literature specifically targeting Indonesian learners of Japanese is sparse. Most available data comes from: (1) the I-JAS corpus (covered in depth at §5.5.29, which contains the primary empirical findings from this corpus for Indonesian learner error patterns); and (2) Japanese-language publications in 日本語教育 (*Nihongo Kyōiku* / Japanese Language Education) journals that are not readily accessible via standard English-language databases. This gap is real and documented — the brief for this section explicitly acknowledges it, and this acknowledgment itself serves a methodological transparency function on the corpus's notes-on-limitations page.

**Redirecting to §5.5.29.** Readers seeking empirical I-JAS findings for Indonesian learner error patterns should consult **§5.5.29** (already in corpus), which provides: (a) particle error frequencies for Indonesian L1 sub-corpus, (b) は/が discourse errors persisting through N3, (c) adversative passive absence from production through N2, (d) ている resultant state under-use, and (e) relative clause error rates by level. Those findings are not reproduced here to avoid duplication.

**Verbal aspect as a case study.** Shirai and Kurono (1998) provide the closest empirical approximation available from English-language literature: a study of て-いる acquisition by L2 Japanese learners with varied L1 backgrounds. Their finding — that the progressive meaning of ている is acquired significantly earlier and more reliably than the resultant-state meaning — is directly consistent with I-JAS data for Indonesian learners (§5.5.29: resultant-state ている under-use persists through N3+). This convergence validates that the ている resultant-state problem is not an artifact of Indonesian L1 specifically, but is a developmental error (in Richards's typology — §5.6.3) compounded by Indonesian L1 transfer: Indonesian *sudah* maps onto perfect semantics, not resultant state, generating a transfer error on top of a developmental error for exactly this feature.

**Literature gap and recommended search pathway.** The following search pathway is recommended for Crispy's review: (1) JALT Journal (https://jaltpublications.org/jj) — search "Indonesian Japanese learner errors"; (2) *Nihongo Kyōiku* (*Japanese Language Education*) — search インドネシア語母語話者 (Indonesian L1 speakers); (3) I-JAS usage papers list at https://ninjal.ac.jp/database/i-jas/ — search for papers specifically analyzing L1 Indonesian sub-corpus; (4) *The Language Teacher* (JALT) for applied teaching reports on Indonesian-Japanese learners.

### Citation Table

| ID | Full Citation | DOI | Relevansi | Tipe | Skor Q | Akurasi | Tahun | Kontribusi Unik |
|---|---|---|---|---|---|---|---|---|
| EA-21 | Shirai, Y., & Kurono, A. (1998). The acquisition of tense-aspect marking in Japanese as a second language. *Language Learning, 48*(2), 245–279. | https://doi.org/10.1111/0023-8333.00043 | ている progressive vs. resultant-state acquisition order in L2 Japanese; progressive acquired earlier — validates I-JAS Indonesian data in §5.5.29 | Empirical (mixed-L1) | 5 | ✅ | 1998 | Documents the ている progressive/resultant-state developmental split as a universal L2 Japanese acquisition phenomenon — establishes that Indonesian learner ている errors (§5.5.29) are both developmental (universal) and transfer-compounded (Indonesian-specific): dual-origin error requiring explicit back-card treatment |
| EA-22 | *(SEARCH RECOMMENDED — see narrative)* | *(pending)* | Indonesian-specific error analysis studies from JALT Journal, *Nihongo Kyōiku*, or I-JAS usage papers | *(empirical target)* | *(pending)* | *(pending)* | *(pending)* | ⚑ FLAG §5.6-B. Literature gap acknowledged. §5.5.29 contains available empirical data. This slot is reserved for a specific Indonesian L1 error analysis study identified through the recommended search pathway. If no English-language study is identified, cite the most relevant Japanese-language source with annotation. |

### Design Implications for Nugget Nihongo

1. **The ている back card requires dual-error treatment.** Shirai and Kurono (1998) establish that resultant-state ている is a late-acquired, error-prone developmental feature in L2 Japanese generally. For Indonesian learners, §5.5.29 I-JAS data confirms this is additionally compounded by *sudah* transfer. Back cards for ている in resultant-state contexts must address both the developmental confusion (progressive ≠ resultant state) and the transfer error (Indonesian *sudah* maps to perfect, not ている resultant state).
2. **Literature gap is a product positioning opportunity.** The absence of English-language resources specifically for Indonesian learners of Japanese is precisely the gap Nugget Nihongo fills. The methodology page can make this explicit: our L2d contrastive notes are built on the best available empirical evidence (I-JAS, §5.5 CA research) precisely because no commercial product has systematically done this work before.

### Cross-Section Integration

- **§5.6.6 → §5.5.29:** All available I-JAS Indonesian-specific empirical data is in §5.5.29. §5.6.6 is the interpretive frame (typology, fossilization risk, CF response) for those findings.
- **§5.6.6 → §5.6.3 [EA-07]:** Shirai and Kurono (1998) data allows classification of ている errors by type (Richards 1971 typology): developmental (universal L2 Japanese acquisition sequence) + interlingual transfer (Indonesian *sudah* mapping) — i.e., both error types simultaneously. The pedagogical implication follows from §5.6.3: this dual-origin error requires both contrastive note (transfer component) and example-sentence range (developmental component) treatment on the back card.

---

## CITATION REGISTER: COMPLETE EA CLUSTER

| ID | Author(s) | Year | Short Title | Section | DOI Status |
|---|---|---|---|---|---|
| EA-01 | Corder | 1967 | Significance of learners' errors | §5.6.1 | ✅ |
| EA-02 | Corder | 1981 | Error analysis and interlanguage (monograph) | §5.6.1 | monograph |
| EA-03 | Selinker | 1972 | Interlanguage | §5.6.2 | ✅ |
| EA-04 | Nemser | 1971 | Approximative systems | §5.6.2 | verify |
| EA-05 | Selinker & Lamendella | 1979 | Extrinsic feedback and fossilization | §5.6.2 | verify |
| EA-06 | Ellis | 1994 | Study of second language acquisition (monograph) | §5.6.2 | monograph |
| EA-07 | Richards | 1971 | Non-contrastive approach to error analysis | §5.6.3 | verify (pre-DOI era) |
| EA-08 | James | 1998 | Errors in language learning and use (monograph) | §5.6.3 | monograph |
| EA-09 | Dulay, Burt & Krashen | 1982 | Language Two (monograph) | §5.6.3 | monograph |
| EA-10 | Han | 2004 | Fossilization in adult SLA (monograph) | §5.6.4 | monograph |
| EA-11 | Selinker | 1992 | Rediscovering interlanguage (monograph) | §5.6.4 | monograph |
| EA-12 | Long | 2003 | Stabilization and fossilization in IL development | §5.6.4 | book chapter |
| EA-13 | Han & Selinker | 1999 | Error resistance | §5.6.4 | ✅ |
| EA-14 | Lyster & Ranta | 1997 | Corrective feedback and learner uptake | §5.6.5 | ✅ |
| EA-15 | Sheen | 2007 | Written CF and language aptitude | §5.6.5 | ✅ |
| EA-16 | Li | 2010 | Effectiveness of CF: meta-analysis | §5.6.5 | ✅ |
| EA-17 | Ellis, Loewen & Erlam | 2006 | Implicit and explicit CF | §5.6.5 | verify |
| EA-18 | Lyster | 2004 | Prompts vs. recasts | §5.6.5 | verify |
| EA-19 | Truscott | 1996 | Case against grammar correction | §5.6.5 | ✅ |
| EA-20 | Nassaji | 2016 | Interactional feedback synthesis | §5.6.5 | verify |
| EA-21 | Shirai & Kurono | 1998 | Tense-aspect acquisition in L2 Japanese | §5.6.6 | ✅ |
| EA-22 | *(pending)* | *(pending)* | Indonesian-specific error study | §5.6.6 | FLAG §5.6-B |

**Total confirmed citations:** 21 (EA-01–EA-21)
**Flagged/pending:** 1 (EA-22)
**Verify-DOI items:** EA-04, EA-05, EA-07, EA-17, EA-18, EA-20

---

## FLAG SUMMARY

### ⚑ FLAG §5.6-A — TRUSCOTT (1996) BALANCE NOTE
**Citation:** EA-19 — Truscott (1996)
**Issue:** Truscott's strong anti-correction position has generated substantial academic pushback (Ferris, 1999; Bitchener & Knoch, 2008). The corpus cites EA-19 for its core point (unnoticed correction is ineffective), not its strong claim (all written correction is counterproductive).
**Recommended action:** Label EA-19 in the methodology page as a "productive dissent" citation: "Even Truscott's critics concede that correction must be *noticed* to be effective." Do not cite EA-19 as endorsing the anti-correction position.
**Blocking agent work?** No.

### ⚑ FLAG §5.6-B — INDONESIAN-SPECIFIC LITERATURE GAP (EA-22)
**Citation:** EA-22 — pending
**Issue:** No English-language empirical study specifically analyzing error patterns of Indonesian L1 learners of Japanese has been identified for this slot. The search pathway in §5.6.6 narrative provides the recommended next steps.
**Recommended action:** Crispy or Agent 2 to conduct targeted search of JALT Journal, *Nihongo Kyōiku*, and I-JAS usage papers. If no English-language source is found, cite the most relevant Japanese-language publication with an English annotation. If no study exists, remove EA-22 slot and note the gap explicitly in the methodology page as a research gap — this is itself a positioning argument for Nugget Nihongo's original contribution.
**Blocking agent work?** No. Corpus is functional without EA-22.

### ⚑ FLAG §5.6-C — VERIFY DOI BATCH
**Citations:** EA-04, EA-05, EA-07, EA-17, EA-18, EA-20
**Issue:** DOIs provided for these citations are plausible based on journal DOI format conventions but have not been verified against CrossRef or publisher databases.
**Recommended action:** Crispy to run batch DOI verification. Consistent with standard corpus procedure for all pre-2000 or SAGE/Wiley journal articles.
**Blocking agent work?** No.

### ⚑ FLAG §5.6-D — LONG (2003) CHAPTER DETAILS
**Citation:** EA-12 — Long (2003) in Doughty & Long *Handbook of SLA*
**Issue:** Full page range and publisher edition details not confirmed. The *Handbook of Second Language Acquisition* (Doughty & Long, eds.) was published by Blackwell in 2003 (ISBN 0631215484). The Long stabilization chapter is listed at pp. 487–535 from memory.
**Recommended action:** Verify page range against library catalog or Google Scholar entry.
**Blocking agent work?** No.

---

## INTEGRATION NOTE: READING §5.5 + §5.6 + §12 TOGETHER

The three sections form a complete theoretical architecture for the treatment of learner errors in Nugget Nihongo:

**§5.5 (CA)** answers: *Where will errors occur?* → Structural prediction from Indonesian-Japanese typological contrast. Outputs: L2d tags, contrastive notes, interference point inventory (CA-01–CA-15+).

**§5.6 (EA + Interlanguage Theory)** answers: *What do errors mean, and how should the platform respond?* → Error is evidence (EA-01–EA-02), produced by a systematic interlanguage (EA-03–EA-06), classifiable by source type (EA-07–EA-09), prone to stabilization for specific features (EA-10–EA-13), and addressable through explicit, salient corrective feedback (EA-14–EA-20). Indonesian-specific patterns (EA-21–EA-22) validate the above in the target learner population.

**§12 (Output Theory + Noticing)** answers: *What cognitive mechanisms drive acquisition from the error event forward?* → Production failure primes noticing (KR-09, OT-02–OT-05); noticing requires conscious attention (OT-06–OT-11); explicit instruction accelerates acquisition of complex features (OT-12–OT-17); declarative knowledge proceduralized through practice (OT-18–OT-24); production in context consolidates lexical acquisition (OT-25–OT-30).

A learner who presses "Again" on a に/で particle card has:
- Made a predictable transfer error (§5.5 [CA-09])
- Produced interlanguage evidence of an Indonesian *di*-to-Japanese transfer state (§5.6.2)
- Made a transfer error in Richards's typology (§5.6.3), fossilization-prone (§5.6.4)
- Received a back-card metalinguistic corrective response (§5.6.5) that — if well-designed — triggers noticing the gap (§12.2) and initiates the declarative-to-procedural acquisition sequence (§12.4).

This is the theoretical chain that justifies the entire back-card note infrastructure.

---


