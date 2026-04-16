# NUGGET NIHONGO — RESEARCH LIBRARY INDEX
**Version:** v17-PASS16 | **Date:** 17 April 2026
**Maintained by:** Crispy (Claude Opus 4.7) — Pass 16

---

## REPOSITORY STRUCTURE

```
nugget-nihongo/
│
├── CLAUDE.md                              ← Auto-load context (read this first every session)
├── INDEX.md                               ← This file
├── README-CRISPY.md                       ← Crispy's operational guide (DUP table, open flags, Session C)
│
├── corpus/
│   ├── source-of-truth/
│   │   └── compass_artifact.md            ← 44 foundational citations (Crispy's original)
│   │
│   ├── sections/                          ← 16 clean, merged section files + synthesis/
│   │   ├── SECTION1-EVIDENCE-BASED.md
│   │   ├── SECTION2-GRAMMAR.md
│   │   ├── SECTION3-LISTENING.md
│   │   ├── SECTION4-ER.md
│   │   ├── SECTION5-CONTRASTIVE.md        ← merged v3+v4-ADDENDUM (§5.5.0–§5.5.31)
│   │   ├── SECTION8-PWA.md                ← merged v2+v3-FINAL (§8.1–§8.11)
│   │   ├── SECTION9-MULTIMEDIA.md         ← Agent29 §9.10.7 already merged
│   │   ├── SECTION10-GAMIFICATION-HABIT.md
│   │   ├── SECTION11-PHONOLOGY.md
│   │   ├── SECTION12-OUTPUT-THEORY.md
│   │   ├── SECTION13-INDIVIDUAL-DIFFS.md
│   │   ├── SECTION14-SOCIO.md
│   │   ├── SECTION15-SSW.md
│   │   ├── SECTION16-CALL.md
│   │   ├── SECTION17-ADULT.md
│   │   ├── SECTION-CA-CURRICULUM.md
│   │   ├── PLATFORM-RESEARCH-AGENDA.md    ← standalone (§8.11 extracted by Agent 36)
│   │   └── synthesis/                      ← ✅ NEW Pass 16 (Crispy Opus 4.7)
│   │       ├── LEVEL-LADDER-SPEC-v1.md      ← F1: 5-level exit criteria ladder
│   │       └── SECTION18-SYNTHESIS-v1.md    ← F2: unified pedagogical model
│   │
│   └── bibliography/
│       ├── MASTER-BIBLIOGRAPHY-FINAL.md   ← 747 entries, v7 (Pass 16: DUP-01/02/03 retired + VD-17 retired + EA-22 formalized)
│       └── DOI-VERIFICATION-TRACKER.md    ← 42 entries pending verification
│
├── blueprint/
│   ├── DESIGN-DECISION-MASTER-v1.md      ← 123 citation-backed design decisions
│   ├── CURRICULUM-BLUEPRINT-v1.md        ← ✅ Added in v16 (was missing from v15)
│   └── METHODOLOGY-PAGE-NARRATIVE-v1.md  ← ✅ NEW Pass 16: F3 methodology page skeleton (Indonesian-dominant)
│
└── archive/                               ← ✅ FULLY POPULATED — 5 subfolders
    ├── README-ARCHIVE.md                  ← This folder's registry (read first)
    ├── HANDOFF-AGENT2-v14.md              ← ⭐ CRISPY: read for F1/F2/F3 synthesis inputs
    ├── CORPUS-HANDOFF.md                  ← Crispy's own resume instructions (4 April 2026)
    ├── AUDIT-INDEX-v17-PASSES1-10-FINAL.md ← 136 findings, Passes 1–10 (moved from root)
    ├── OPUS-SUGGESTIONS-v3-ARCHIVED.md    ← Historical
    ├── OPUS-SUGGESTIONS-v4-ARCHIVED.md    ← Historical
    ├── OPUS-SUGGESTIONS-v5-ARCHIVED.md    ← Historical
    ├── OPUS-SUGGESTIONS-v6-ARCHIVED.md    ← Final QA snapshot
    │
    ├── gap-analysis/                      ← v1,v2,v3,v4,v6–v10 (v5 missing)
    ├── citation-audit/                    ← v3–v7,v9–v11 (v8 missing)
    ├── dispatch-briefs/                   ← Agent 7/9/11 briefs + Agent 2 Pass 11/12 prompts
    ├── pass-logs/                         ← PASS11–PASS16 logs (PASS16-LOG.md = Crispy comprehensive consolidation, 17 April 2026)
    └── absorbed-dispatch/                 ← Agent 30/31/36 deliverables
```

---

## SECTION QUICK REFERENCE

| § | Topic | File | Key Clusters | Citations |
|---|---|---|---|---|
| compass | Foundation | `source-of-truth/compass_artifact.md` | mixed | 44 |
| §1 | SRS + Boundary Conditions | `SECTION1-EVIDENCE-BASED.md` | TE, FS, SR, SRE, BC, CV (FS: partially populated — 4 of 9 entries exist) | ~61 |
| §2 | Grammar Acquisition | `SECTION2-GRAMMAR.md` | GA | 31 |
| §3 | L2 Listening | `SECTION3-LISTENING.md` | LS | 25 |
| §4 | Extensive Reading | `SECTION4-ER.md` | ER | 25 |
| §5 | Contrastive + Error Analysis | `SECTION5-CONTRASTIVE.md` | CP, EA | ~59 |
| *(§6 — not written)* | *intentional skip* | — | — | — |
| *(§7 — not written)* | *intentional skip* | — | — | — |
| §8 | PWA Platform | `SECTION8-PWA.md` | IM (MV: 97 citations in body, cluster IDs not yet assigned) | ~145 |
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

> **§6 dan §7 tidak ada — bukan gap.** Penomoran skip dari §5 ke §8 adalah **desain awal corpus**. Topik terkait ada di §CA (vocabulary depth & curriculum design), §9 (orthography & multimedia), dan §11 (phonology).

---

## BIBLIOGRAPHY QUICK STATS (v6 — post-stub-fill)

| Metric | Value |
|---|---|
| Total unique entries | **754** (7 added Pass 9: AV-01, LS-02, VS-01/02/04/06, OD-12; includes 11 unfixed duplicate pairs — see README-CRISPY) |
| Entries with DOI | ~336 (45%) |
| DOI verification pending | 42 |
| Ghost entries deleted (v15) | 3 |
| Recovered entries added (v15) | 3 |
| New stubs filled (v16) | **11** (GA-16, GA-17, GA-22, GA-25, GA-30; LS-03, LS-04, LS-06, LS-09, LS-10, LS-18) |
| Stubs remaining | **7** (AL×2, CM×2, ER×2, SC×1) |
| 🔴 Confirmed duplicate pairs | **3** — DUP-01 GA-09/GA-19; DUP-02 LS-01/LS-06; DUP-03 SC-05/VS-22 — bibliography untouched |
| Expected count post-cleanup | ~744 (after all 3 duplicates resolved) |
| Research domains | 14 |
| Citation clusters | 40+ |

---

## ARCHIVE QUICK REFERENCE (v17-PASS15 — fully populated)

| Path | Type | Notes |
|---|---|---|
| `archive/README-ARCHIVE.md` | Registry | Full catalogue of all archive contents |
| `archive/HANDOFF-AGENT2-v14.md` | ⭐ Critical ref | F1/F2/F3 synthesis inputs for Crispy. Read before writing Level Ladder, §18, Methodology Narrative. |
| `archive/CORPUS-HANDOFF.md` | Historical mgmt | Crispy's own resume instructions to Agent 2, 4 April 2026 |
| `archive/AUDIT-INDEX-v17-PASSES1-10-FINAL.md` | Audit reference | 136 findings, Passes 1–10. Moved from root at Pass 12 cleanup. |
| `archive/OPUS-SUGGESTIONS-v3–v6-ARCHIVED.md` | Historical | QA suggestions evolution; v6 is final snapshot |
| `archive/gap-analysis/` | Analysis history | GAP-ANALYSIS v1–v4, v6–v10 (v5 missing) |
| `archive/citation-audit/` | Audit history | CITATION-AUDIT v3–v7, v9–v11 (v8 missing) |
| `archive/dispatch-briefs/` | Briefs + prompts | Agent 7/9/11 specialist briefs; Agent 2 Pass 11/12 session prompts |
| `archive/pass-logs/` | Execution logs | PASS11–PASS15 logs present |
| `archive/absorbed-dispatch/` | Absorbed outputs | Agent 30/31/36 deliverables merged into canonical sections |

---

## PENDING SYNTHESIS TASKS (for Crispy / Opus)

| Task | File to Create | Key Input | Status |
|---|---|---|---|
| F1 — Level Ladder Specification | `corpus/sections/LEVEL-LADDER-SPEC.md` | `archive/HANDOFF-AGENT2-v14.md` §F1 | ⏳ Not started |
| F2 — §18 Synthesis Section | `corpus/sections/SECTION18-SYNTHESIS.md` | `archive/HANDOFF-AGENT2-v14.md` §F2 | ⏳ Not started |
| F3 — Methodology Page Narrative | `blueprint/METHODOLOGY-PAGE-NARRATIVE.md` | `archive/HANDOFF-AGENT2-v14.md` §F3 | ⏳ Not started |

---

## VERSION HISTORY

| Version | Date | Changes |
|---|---|---|
| v17-PASS15 | 6 April 2026 | Agent 2 Pass 15: DOI verification (42 entries); 7 confirmed (PH-04–07, PH-41, GI-02, PH-43); 6 DOIs inserted to bibliography; PH-43 title/journal corrected; flags §10-A, §10-C, §10-F resolved; CLAUDE.md corruption fixed; tracker ID notes cleaned. 15 DOIs remain pending (network-required). |
| v17-PASS12 | 6 April 2026 | Agent 2 Pass 12 root cleanup: AUDIT-INDEX/OPUS-v5/v6/PASS11-LOG moved to archive/; pass-logs/ subfolder created; dispatch-briefs/ expanded (Pass 11/12 prompts added); INDEX.md/README-ARCHIVE.md/CLAUDE.md fully synced; bug fixes (bib count, citation-audit tree, duplicate entries). Root reduced to 3 management docs. |
| v17-PASS11 | 6 April 2026 | Agent 2 Pass 11/12 Session 1: §5/§8/§16/§CA section edits; bibliography GE-04 dupe + SM/DD cluster table corrections; HANDOFF stale stats; DOI tracker C1–C6; README-CRISPY D1–D9; CURRICULUM-BLUEPRINT stats corrected to 754. |
| v17 | 5 April 2026 | Agent 2 handoff prep: archive/ fully populated (28 files, 4 subfolders); HANDOFF-AGENT2-v14.md restored; gap-analysis v4–v10 archived; citation-audit v9–v11 archived; dispatch-briefs archived; absorbed-dispatch filled; README-ARCHIVE.md rewritten as comprehensive registry; DUPLICATE FLAG TABLE in README-CRISPY. No bibliography changes. |
| v16 | 5 April 2026 | Agent 2 bibliography stub fill: 11 stubs filled (GA×5, LS×6), bibliography → v6 (747 entries), CURRICULUM-BLUEPRINT-v1.md added, GA-09/GA-19 and LS-01/LS-06 duplicate flags raised |
| v15 | 5 April 2026 | Agent 2 hygiene pass: 3 ghost entries deleted, 3 recovered, §5 merged, §8 re-merged, §9 confirmed, INDEX/CLAUDE.md/DOI-tracker created |
| v14 | 4 April 2026 | Agent 2 Research Director Deliverable absorbed; GAP-ANALYSIS-MASTER v10 |
| v13 | 4 April 2026 | Workstream B complete (Agents 29, 30, 31, 32, 33, 36) |
| v12 | 4 April 2026 | §1.10.5 CV addendum, §5.5.28 PT insert, DDM created |
| v11 | 3 April 2026 | Agent 29 §9.10.7 Phonological Recoding added |
| v10 | 3 April 2026 | §4, §16, §17 merged (+65 citations) |

---

*INDEX.md — Agent 2 — 6 April 2026 — v17-PASS15*
