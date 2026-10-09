# NUGGET NIHONGO — RESEARCH LIBRARY INDEX
**Version:** v19 (Indonesian L1 Diagnostic, Vocational EPA/SSW Corpus & Algorithmic Blueprint Expansion)  
**Total Unique Citations:** 757  
**Verified DOIs:** 361 (100% accounted for)

---

## 1. REPOSITORY STRUCTURE

```
nugget-nihongo-research/
│
├── CLAUDE.md                                  ← Operational context and standards
├── INDEX.md                                   ← Global repository index (this file)
├── RESEARCH-COMPENDIUM.md                     ← Master research compendium & audit register
│
├── corpus/
│   ├── source-of-truth/
│   │   └── compass_artifact.md                ← 44 foundational SLA & cognitive science citations
│   │
│   ├── sections/                              ← 16 clean, verified section files + synthesis/
│   │   ├── SECTION1-EVIDENCE-BASED.md         ← SRS, testing effect, desirable difficulties (~61)
│   │   ├── SECTION2-GRAMMAR.md                ← Grammar acquisition & Processability Theory (31)
│   │   ├── SECTION3-LISTENING.md              ← L2 listening comprehension (25)
│   │   ├── SECTION4-ER.md                     ← Extensive reading & 98% lexical coverage (25)
│   │   ├── SECTION5-CONTRASTIVE.md            ← Indonesian-Japanese contrastive linguistics (~64)
│   │   ├── SECTION8-PWA.md                    ← Mobile CALL/MALL architecture, SDT, malu (~145)
│   │   ├── SECTION9-MULTIMEDIA.md             ← Cognitive Load Theory & Japanese orthography (~93)
│   │   ├── SECTION10-GAMIFICATION-HABIT.md    ← Behavioral habit formation, sleep consolidation (~41)
│   │   ├── SECTION11-PHONOLOGY.md             ← Speech perception, HVPT, mora isochrony, pitch accent (~44)
│   │   ├── SECTION12-OUTPUT-THEORY.md         ← Pushed output hypothesis & noticing the gap (~32)
│   │   ├── SECTION13-INDIVIDUAL-DIFFS.md      ← Working memory capacity, anxiety, aptitude (~43)
│   │   ├── SECTION14-SOCIO.md                 ← Interlanguage pragmatics & honorifics (25)
│   │   ├── SECTION15-SSW.md                   ← Specified Skilled Worker vocational Japanese (~26)
│   │   ├── SECTION16-CALL.md                  ← Meta-analytic CALL/MALL evidence (21)
│   │   ├── SECTION17-ADULT.md                 ← Adult SLA, ego permeability, autonomous learning (19)
│   │   ├── SECTION-CA-CURRICULUM.md           ← Curriculum architecture & vocabulary depth (~107)
│   │   ├── PLATFORM-RESEARCH-AGENDA.md        ← Standalone empirical research studies roadmap
│   │   │
│   │   ├── contrastive/                       ← Granular L1 Diagnostic Inventory (Jalur A)
│   │   │   └── INDONESIAN-L1-DIAGNOSTIC-INVENTORY-v1.md ← 100-item micro-diagnostic contrastive matrix
│   │   │
│   │   ├── vocational/                        ← Workplace SLA & Discourse Corpus (Jalur B)
│   │   │   └── EPA-KAIGO-SSW-WORKPLACE-CORPUS-v1.md ← Eldercare speech shifts, pain onomatopoeia, gemba nihongo
│   │   │
│   │   └── synthesis/                         ← Pedagogical synthesis specifications
│   │       ├── LEVEL-LADDER-SPEC-v1.md        ← F1: 5-level exit criteria ladder (N5 to N1)
│   │       └── SECTION18-SYNTHESIS-v1.md      ← F2: unified pedagogical model
│   │
│   └── bibliography/
│       ├── MASTER-BIBLIOGRAPHY-FINAL.md       ← Canonical bibliographic registry (757 unique entries, v19)
│       └── DOI-VERIFICATION-TRACKER.md        ← CrossRef & publisher audit registry (100% accounted for)
│
├── blueprint/
│   ├── DESIGN-DECISION-MASTER-v1.md          ← 123 citation-grounded design decisions
│   ├── CURRICULUM-BLUEPRINT-v1.md            ← Authoritative end-to-end curriculum roadmap
│   ├── METHODOLOGY-PAGE-NARRATIVE-v1.md      ← Public-facing empirical methodology narrative
│   └── MICRO-SESSION-ALGORITHMIC-SPEC-v1.md  ← 7-minute session formula, 6 card archetypes & dual-track FSRS (Jalur C)
│
└── archive/                                   ← Historical registers, logs, and superseded drafts
    ├── README-ARCHIVE.md                      ← Archive index & provenance tracking
    ├── pass-logs/                             ← Consolidation pass execution logs
    └── ...
```

---

## 2. SECTION QUICK REFERENCE

| § | Topic | File | Key Clusters | Citations |
|---|---|---|---|---|
| compass | Foundation | `source-of-truth/compass_artifact.md` | foundational | 44 |
| §1 | SRS + Boundary Conditions | `SECTION1-EVIDENCE-BASED.md` | TE, FS, SR, SRE, BC, CV | ~61 |
| §2 | Grammar Acquisition | `SECTION2-GRAMMAR.md` | GA | 31 |
| §3 | L2 Listening | `SECTION3-LISTENING.md` | LS | 25 |
| §4 | Extensive Reading | `SECTION4-ER.md` | ER | 25 |
| §5 | Contrastive + Error Analysis | `SECTION5-CONTRASTIVE.md` | CP, EA | ~64 |
| §8 | PWA Platform | `SECTION8-PWA.md` | IM, MALL, SDT, CC | ~145 |
| §9 | Multimedia + Orthography + Phon. Recoding | `SECTION9-MULTIMEDIA.md` | KS, OD, CL, CT, AV, DC, PR | ~93 |
| §10 | Gamification, Habit, Sleep | `SECTION10-GAMIFICATION-HABIT.md` | GI, HB, SL | ~41 |
| §11 | Phonological Science | `SECTION11-PHONOLOGY.md` | PH | ~44 |
| §12 | Output Theory & Noticing | `SECTION12-OUTPUT-THEORY.md` | OT | ~32 |
| §13 | Individual Differences | `SECTION13-INDIVIDUAL-DIFFS.md` | ID | ~43 |
| §14 | Sociolinguistics & Keigo | `SECTION14-SOCIO.md` | SC | 25 |
| §15 | SSW / Vocational Japanese | `SECTION15-SSW.md` | VS | ~26 |
| §16 | CALL/MALL Meta-Analysis | `SECTION16-CALL.md` | CM | 21 |
| §17 | Adult Learning | `SECTION17-ADULT.md` | AL | 19 |
| §CA | Curriculum Architecture + Vocab Depth | `SECTION-CA-CURRICULUM.md` | CA, VD, GE, GF, GM, GX, GL | ~107 |
| §18 | Unified Pedagogical Synthesis | `synthesis/SECTION18-SYNTHESIS-v1.md` | Synthesis | — |

*Note on Section Numbering:* Sections 6 and 7 were intentionally not designated as separate chapters in the original corpus layout; topics are integrated across §CA (vocabulary depth), §9 (orthography/multimedia), and §11 (phonology).

---

## 3. BIBLIOGRAPHY & AUDIT METRICS (v19)

| Metric | Value | Status |
|---|---|---|
| **Total unique entries** | **757** | Fully verified and accounted for |
| **Entries with verified DOI** | **361** | 100% accounted for against CrossRef/publisher records |
| **Open duplicate pairs** | **0** | All 11 candidate pairs formally resolved (DUP-01–DUP-11) |
| **Open literature gaps** | **0** | EA-22 resolved and expanded with EA-22–EA-28 & VS-29 |
| **Canonical assignment** | **Complete** | Matsunaga (1999) canonicalized as `[OD-20]` |
| **DDM Cross-Conflicts** | **Resolved** | Flags A, B, C, D, E reconciled in `DESIGN-DECISION-MASTER-v1.md` |
| **Synthesis & Operational specs** | **Complete** | Jalur A (Diagnostic), Jalur B (Vocational), Jalur C (Algorithmic), Level Ladder, §18 Synthesis |

---

## 4. SYNTHESIS & OPERATIONAL ARTIFACTS QUICK REFERENCE

| Specification | Path | Primary Purpose | Status |
|---|---|---|---|
| **L1 Diagnostic Inventory (Jalur A)** | `corpus/sections/contrastive/INDONESIAN-L1-DIAGNOSTIC-INVENTORY-v1.md` | 100-item micro-diagnostic contrastive matrix across 5 interference domains with back-card gap prescriptions | ✅ Complete |
| **Vocational SLA Corpus (Jalur B)** | `corpus/sections/vocational/EPA-KAIGO-SSW-WORKPLACE-CORPUS-v1.md` | Eldercare speech level shifts, pain onomatopoeia, gemba nihongo safety, and industrial discourse | ✅ Complete |
| **Micro-Session Spec (Jalur C)** | `blueprint/MICRO-SESSION-ALGORITHMIC-SPEC-v1.md` | 5-to-7 minute session formula, 6 production card archetypes (JSON schemas), and dual-track FSRS latency tuning | ✅ Complete |
| **Level Ladder Specification** | `corpus/sections/synthesis/LEVEL-LADDER-SPEC-v1.md` | 5-level exit criteria ladder (N5 to N1) combining FSRS stability, Processability Theory stages, and vocabulary depth | ✅ Complete |
| **§18 Synthesis Model** | `corpus/sections/synthesis/SECTION18-SYNTHESIS-v1.md` | Unified pedagogical model integrating Nation's four strands into daily microlearning sessions | ✅ Complete |
| **Methodology Page Narrative** | `blueprint/METHODOLOGY-PAGE-NARRATIVE-v1.md` | Transparent public-facing narrative of empirical curriculum principles and boundary conditions | ✅ Complete |

---

## 5. VERSION HISTORY

| Version | Date | Key Milestones |
|---|---|---|
| **v19** | October 2026 | **Jalur A–C Operationalization & Expansion:** Added Indonesian L1 Diagnostic Inventory (100 atomic items across 5 domains); created EPA & SSW Workplace Discourse Corpus (Pramesti 2019 speech level shift, pain onomatopoeia, factory safety); formalized 5-to-7 minute Micro-Session Algorithmic Specification (6 card archetypes with JSON schemas, dual-track FSRS stability, latency efficiency weighting $\Phi(\Delta t)$, and interference penalty spikes); added verified empirical studies (`EA-27`, `EA-28`, `VS-29`) to master bibliography and DOI tracker. |
| **v18** | October 2026 | Comprehensive meta-analysis consolidation & housekeeping: verified all 15 pending DOIs (100% accounted for); resolved DUP-04 (`BC-08`) and DUP-05 (`VD-05`); assigned canonical `[OD-20]` for Matsunaga (1999) 2.3× exposure study; resolved EA-22 gap with Maarif (2023) and expanded Indonesian SLA studies (`EA-23`–`EA-26`); reconciled DDM Flags A–E; scrubbed AI agent terminology; renamed compendium to `RESEARCH-COMPENDIUM.md`. |
| **v17-PASS16** | April 2026 | Synthesis deliverables shipped (Level Ladder F1, Section 18 F2, Methodology Page Narrative F3); confirmed DUP-01–03 and DUP-06–11 executed; bibliography updated to v7. |
| **v17-PASS15** | April 2026 | DOI verification pass; 7 DOIs confirmed; flags §10-A, §10-C, §10-F resolved. |
| **v17-PASS12** | April 2026 | Root cleanup; archive restructuring; management documents synchronized. |
| **v16** | April 2026 | 11 stubs filled in bibliography; CURRICULUM-BLUEPRINT-v1.md added. |
| **v15** | April 2026 | Hygiene pass; ghost entries removed; Section 5 and Section 8 consolidated. |

---

*INDEX.md — Master Research Library Index — Version 19.*
