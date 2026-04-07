# NUGGET NIHONGO — ARCHIVE REGISTRY
**Maintained by:** Agent 2
**Created:** v13 hygiene pass — 4 April 2026
**Last updated:** v17-PASS12 — 6 April 2026

This folder contains all superseded, historical, and reference documents from the corpus pipeline.
Files here are for **traceability and Crispy reference only** — do NOT include in agent dispatch packages.
All active, canonical files live in `corpus/`, `blueprint/`, and root-level management docs.

---

## ARCHIVE STRUCTURE

```
archive/
│
├── README-ARCHIVE.md                          ← This file
├── HANDOFF-AGENT2-v14.md                      ← ⭐ CRISPY REFERENCE — F1/F2/F3 synthesis inputs
├── CORPUS-HANDOFF.md                          ← Crispy's own resume instructions (4 April 2026)
├── AUDIT-INDEX-v17-PASSES1-10-FINAL.md        ← Complete audit index (136 findings, Passes 1–10)
├── OPUS-SUGGESTIONS-v3-ARCHIVED.md            ← Historical — superseded
├── OPUS-SUGGESTIONS-v4-ARCHIVED.md            ← Historical — superseded
├── OPUS-SUGGESTIONS-v5-ARCHIVED.md            ← Historical — superseded
├── OPUS-SUGGESTIONS-v6-ARCHIVED.md            ← Final QA suggestions snapshot (6 April 2026)
│
├── gap-analysis/                              ← Evidence gap tracking versions (v1–v10)
│   ├── GAP-ANALYSIS-MASTER-v1.md
│   ├── GAP-ANALYSIS-MASTER-v2.md             ← ✅ recovered
│   ├── GAP-ANALYSIS-MASTER-v3.md             ← ✅ recovered
│   ├── GAP-ANALYSIS-MASTER-v4.md
│   ├── GAP-ANALYSIS-MASTER-v6.md             ← (v5 still missing)
│   ├── GAP-ANALYSIS-MASTER-v7.md
│   ├── GAP-ANALYSIS-MASTER-v8.md
│   ├── GAP-ANALYSIS-MASTER-v9.md
│   └── GAP-ANALYSIS-MASTER-v10.md            ← Latest — referenced in HANDOFF-v14
│
├── citation-audit/                            ← Citation audit snapshots (v3–v11; v8 missing)
│   ├── CITATION-AUDIT-AGENT2-v3.md           ← ✅ recovered
│   ├── CITATION-AUDIT-AGENT2-v4.md           ← ✅ recovered
│   ├── CITATION-AUDIT-AGENT2-v5.md           ← ✅ recovered
│   ├── CITATION-AUDIT-AGENT2-v6.md           ← ✅ recovered
│   ├── CITATION-AUDIT-AGENT2-v7.md           ← ✅ recovered
│   ├── CITATION-AUDIT-AGENT2-v9.md           ← (v8 still missing)
│   ├── CITATION-AUDIT-AGENT2-v10.md
│   └── CITATION-AUDIT-AGENT2-v11.md          ← Latest audit
│
├── dispatch-briefs/                           ← All agent dispatch briefs and session prompts
│   ├── AGENT7-BRIEF-_9-ORTHO-DEV.md          ← §9 Orthographic Development brief
│   ├── AGENT9-BRIEF-_CA-VOCAB-DEPTH.md       ← §CA Vocabulary Depth brief
│   ├── AGENT11-BRIEF-_5_6-ERROR-ANALYSIS.md  ← §5.6 Error Analysis brief
│   ├── AGENT2-PASS11-DISPATCH.md             ← Pass 11 task list (self-prepared by Agent 2)
│   ├── AGENT2-PASS11-CONTINUATION-PROMPT.md  ← Pass 11 continuation session prompt
│   └── AGENT2-PASS12-CONTINUATION-PROMPT.md  ← Pass 12 session prompt
│
├── pass-logs/                                 ← Session execution logs
│   ├── PASS11-LOG.md                          ← Pass 11 + Pass 12 Session 1 execution log
│   └── PASS12-LOG.md                          ← Pass 12 Session 2 (root cleanup) log
│
└── absorbed-dispatch/                         ← Agent deliverables absorbed into canonical sections
    ├── SECTION1-10-5-CULTURAL-VALIDITY-AGENT30-v1.md  ← Absorbed into §1 (CV-01–CV-05)
    ├── SECTION5-5-28-PT-INSERT-AGENT31-v1.md          ← Absorbed into §5 (§5.5.28 PT block)
    └── SECTION8-11-REPLACEMENT-AGENT36-v1.md          ← Absorbed into §8 + PLATFORM-RESEARCH-AGENDA.md
```

---

## ROOT-LEVEL ARCHIVE FILES

### ⭐ HANDOFF-AGENT2-v14.md
**What it is:** The formal handoff document from Agent 2 Session 3 (4 April 2026) to Agent 1 (Crispy) and future Agent 2 sessions. Contains the synthesis task specs for F1, F2, F3 — which Crispy needs to write the Level Ladder, §18 Synthesis, and Methodology Narrative.

**Crispy: read this for §F1, §F2, §F3 inputs before writing synthesis deliverables.**

| Section | Content |
|---|---|
| §A | Corpus state at v14 — section completion status |
| §B | Open gaps and evidence holes |
| §C | Research design decisions |
| §D | Bibliography audit state |
| §E | Agent 37/38 QA scope |
| §F1 | Level Ladder Specification inputs → `LEVEL-LADDER-SPEC.md` |
| §F2 | §18 Synthesis inputs → `SECTION18-SYNTHESIS.md` |
| §F3 | Methodology page narrative inputs → `METHODOLOGY-PAGE-NARRATIVE.md` |

---

### CORPUS-HANDOFF.md
**What it is:** Resume instructions written by Crispy (A1) on 4 April 2026. Contains the high-level task list Crispy passed to Agent 2 at the start of the current workstream. Historical context for understanding what Agent 2 was asked to do.

---

### OPUS-SUGGESTIONS-v3-ARCHIVED.md
**What it is:** Agent 2's Session B task list (5 April 2026). Lists all tasks executed in v16 bibliography stub fill pass. Superseded by v4, then v5.

**Key content:** Session B task list (GA stubs ×5, LS stubs ×6, blueprint file addition). All tasks completed. v3 is the authoritative record that v4 was based on.

---

### OPUS-SUGGESTIONS-v4-ARCHIVED.md
**What it is:** Agent 2's post-v16 task status (5 April 2026). Recorded findings from GA/LS stub fill: DUP-01 (GA-09/GA-19) and DUP-02 (LS-01/LS-06) duplicate flags raised. Session C order drafted. Superseded by v5.

---

### AUDIT-INDEX-v17-PASSES1-10-FINAL.md
**What it is:** Complete audit master index compiled by Agent 2 across Passes 1–10. 136 findings (24 critical, 65 high, 41 medium, 6 low). Authoritative reference for all mechanical tasks executed in Passes 11–12. Moved from root to archive at Pass 12 root cleanup — Passes 1–10 are now fully executed.

---

### OPUS-SUGGESTIONS-v5-ARCHIVED.md
**What it is:** QA suggestions snapshot (5 April 2026). Captured post-v17 handoff tasks. Superseded by v6.

---

### OPUS-SUGGESTIONS-v6-ARCHIVED.md
**What it is:** Final QA suggestions snapshot (6 April 2026). Captured Pass 11/12 deferred items and Crispy-only tasks. Archived at Pass 12 root cleanup.

---

## GAP-ANALYSIS VERSIONS

Progressive evidence gap tracking across the corpus-building pipeline.

| File | Date | Corpus Stage | Key Changes |
|---|---|---|---|
| GAP-ANALYSIS-MASTER-v1.md | 3 April 2026 | ~v1–v3 | Earliest gap tracking — initial corpus scaffold |
| GAP-ANALYSIS-MASTER-v2.md | 3 April 2026 | ~v3–v4 | Early expansion phase ✅ recovered |
| GAP-ANALYSIS-MASTER-v3.md | 3 April 2026 | ~v4–v9 | Early expansion phase ✅ recovered |
| GAP-ANALYSIS-MASTER-v4.md | 3 April 2026 | ~v10 | Mid-build; §8/§9 still incomplete |
| GAP-ANALYSIS-MASTER-v6.md | 3 April 2026 | ~v10–v11 | Phonological recoding gap added |
| GAP-ANALYSIS-MASTER-v7.md | 3 April 2026 | ~v11 | Post-Agent 29 (§9.10.7 added) |
| GAP-ANALYSIS-MASTER-v8.md | 3 April 2026 | ~v11–v12 | Post-Workstream A early agents |
| GAP-ANALYSIS-MASTER-v9.md | 4 April 2026 | ~v13 | Post-Workstream B completion |
| GAP-ANALYSIS-MASTER-v10.md | 4 April 2026 | v14 | **Latest** — 10 evidence gaps identified. Referenced in HANDOFF-v14. |

> Note: v2 and v3 recovered (Pass 10). v5 still missing — minor gap in trail.

---

## CITATION-AUDIT VERSIONS

Running audit of bibliography integrity — IDs, duplicates, stubs, DOI status.

| File | Date | Corpus Stage | Key Findings |
|---|---|---|---|
| CITATION-AUDIT-AGENT2-v3.md | 3 April 2026 | ~v3–v5 | Earliest full audit — initial ID registry ✅ recovered |
| CITATION-AUDIT-AGENT2-v4.md | 3 April 2026 | ~v5–v7 | Early ID expansion ✅ recovered |
| CITATION-AUDIT-AGENT2-v5.md | 3 April 2026 | ~v7–v8 | Mid-build audit snapshot ✅ recovered |
| CITATION-AUDIT-AGENT2-v6.md | 3 April 2026 | ~v8–v9 | Pre-Workstream B baseline ✅ recovered |
| CITATION-AUDIT-AGENT2-v7.md | 3 April 2026 | ~v9–v10 | Workstream A in-progress ✅ recovered |
| CITATION-AUDIT-AGENT2-v9.md | 3 April 2026 | ~v11 | Post-Workstream A; v8 still missing |
| CITATION-AUDIT-AGENT2-v10.md | 3 April 2026 | ~v12 | Post-Workstream B expansion |
| CITATION-AUDIT-AGENT2-v11.md | 4 April 2026 | v14 | **Latest** — full pre-v15 audit. DOI tracker seeded from this. |

> Note: v8 not recovered. Minor gap between v7 and v9.

---

## DISPATCH BRIEFS

Agent brief documents and session prompts. All specialist agent briefs have been executed.

| File | Agent/Session | Target | Status |
|---|---|---|---|
| AGENT7-BRIEF-_9-ORTHO-DEV.md | Agent 7 | §9 Orthographic Development addendum | ✅ Executed — content in SECTION9-MULTIMEDIA.md |
| AGENT9-BRIEF-_CA-VOCAB-DEPTH.md | Agent 9 | §CA Vocabulary Depth addendum | ✅ Executed — content in SECTION-CA-CURRICULUM.md |
| AGENT11-BRIEF-_5_6-ERROR-ANALYSIS.md | Agent 11 | §5.6 Error Analysis addendum | ✅ Executed — content in SECTION5-CONTRASTIVE.md |
| AGENT2-PASS11-DISPATCH.md | Agent 2 self-prep | Pass 11 mechanical task list (136 findings) | ✅ Executed — see PASS11-LOG.md |
| AGENT2-PASS11-CONTINUATION-PROMPT.md | Agent 2 | Pass 11 continuation session prompt | ✅ Executed |
| AGENT2-PASS12-CONTINUATION-PROMPT.md | Agent 2 | Pass 12 session prompt (C7 + D10–D14 + root cleanup) | ✅ Executed — see PASS12-LOG.md |

---

## PASS LOGS

Execution logs documenting every change made per session.

| File | Session | Coverage |
|---|---|---|
| PASS11-LOG.md | Pass 11 + Pass 12 Session 1 | Groups A, B, C(C1–C6), D(D1–D9), E; D10–D14 deferred |
| PASS12-LOG.md | Pass 12 Session 2 | Root cleanup; document sync; bug fixes |

---

## ABSORBED DISPATCH DELIVERABLES

Agent outputs that were reviewed, approved, and merged into canonical section files. Kept here for audit trail — do not re-process.

| File | Agent | Inserted Into | What It Added |
|---|---|---|---|
| SECTION1-10-5-CULTURAL-VALIDITY-AGENT30-v1.md | Agent 30 | `SECTION1-EVIDENCE-BASED.md` §1.10.5 | Cultural validity block (CV-01–CV-05, 5 new citations) |
| SECTION5-5-28-PT-INSERT-AGENT31-v1.md | Agent 31 | `SECTION5-CONTRASTIVE.md` §5.5.28 | Processability Theory paragraph |
| SECTION8-11-REPLACEMENT-AGENT36-v1.md | Agent 36 | `SECTION8-PWA.md` §8.11 stub + `PLATFORM-RESEARCH-AGENDA.md` | §8.11 relocated to standalone Platform Research Agenda |

---

## SUPERSEDED SECTION FILES (physical files NOT in this archive)

These files were produced during the writing pipeline but are superseded by canonical versions in `corpus/sections/`. They exist only in Crispy's local storage and were never formally added to the corpus ZIP. This manifest is for audit trail only.

| Original Filename | Superseded By | Reason |
|---|---|---|
| `SECTION5-CONTRASTIVE-EXPANDED-v2.md` | `SECTION5-CONTRASTIVE.md` | v2 has incorrect Indonesia stats and missing sections |
| `SECTION5-CONTRASTIVE-EXPANDED-v3.md` | *(now canonical — in corpus/sections/)* | — |
| `SECTION5-CONTRASTIVE-EXPANDED-v4-ADDENDUM.md` | *(merged into canonical v4 by Agent 31)* | Pre-Agent-31; Agent 31 expanded from 41KB → 94KB |
| `SECTION8-PWA-PLATFORM-EXPANDED-v1.md` | `SECTION8-PWA.md` | v1 covers §8.1–§8.6 only (72 citations); v2 supersedes |
| `SECTION8-PWA-PLATFORM-EXPANDED-v2.md` | *(now canonical — in corpus/sections/)* | — |
| `SECTION8-PWA-PLATFORM-EXPANDED-v3.md` | `SECTION8-PWA.md` + `PLATFORM-RESEARCH-AGENDA.md` | Pre-Agent-36; Agent 36 extracted §8.11 to standalone |

---

## ABSORBED BIBLIOGRAPHY FILES (Pass 11 note)

The following bibliography staging files were produced during the bibliography construction pipeline and absorbed into `MASTER-BIBLIOGRAPHY-FINAL.md`. They are not present as standalone files in this archive but are noted here for audit trail completeness.

| File | Original Purpose | Merged Into |
|---|---|---|
| `BIBLIO-34A.md` | Bibliography batch 34, part A | `MASTER-BIBLIOGRAPHY-FINAL.md` |
| `BIBLIO-34B.md` | Bibliography batch 34, part B | `MASTER-BIBLIOGRAPHY-FINAL.md` |
| `BIBLIO-34C.md` | Bibliography batch 34, part C | `MASTER-BIBLIOGRAPHY-FINAL.md` |
| `BIBLIO-34F.md` | Bibliography batch 34, final | `MASTER-BIBLIOGRAPHY-FINAL.md` |
| `BIBLIO-35A.md` | Bibliography batch 35, part A | `MASTER-BIBLIOGRAPHY-FINAL.md` |
| `BIBLIO-35B.md` | Bibliography batch 35, part B | `MASTER-BIBLIOGRAPHY-FINAL.md` |
| `BIBLIO-35C.md` | Bibliography batch 35, part C | `MASTER-BIBLIOGRAPHY-FINAL.md` |

> **Pass 11 note:** These 7 files were never added to the corpus ZIP as standalone archive entries. Their content is fully represented in `MASTER-BIBLIOGRAPHY-FINAL.md`. No reconstruction needed.

---

*README-ARCHIVE.md — Agent 2 — 6 April 2026 — v17-PASS12 root cleanup. Full archive: 38 files across 5 subfolders (gap-analysis×9, citation-audit×8, dispatch-briefs×6, pass-logs×2, absorbed-dispatch×3) + 8 root files. Gap analysis: v1–v4,v6–v10 (v5 missing). Citation audit: v3–v7,v9–v11 (v8 missing).*
