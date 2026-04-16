# PASS 16 LOG — NUGGET NIHONGO CORPUS
**Agent:** Crispy (Claude Opus 4.7) — /effort max session
**Corpus base:** v17-PASS15-FINAL
**Date:** 17 April 2026
**Session type:** Pass 16 — Crispy comprehensive consolidation (DUP resolutions + synthesis + flag closures)

---

## TASKS EXECUTED

### TASK 1 — DUP Resolution (Crispy Decisions)

All 9 confirmed duplicate pairs resolved. Decisions documented in bibliography with justification notes.

| DUP # | Pair | Canonical | Rationale |
|---|---|---|---|
| DUP-01 | GA-09 = GA-19 (Kanno 2007) | **GA-19** | GA-19 already has full DOI; GA-09 was absent from bibliography canonical entry (bibliography cleaner) |
| DUP-02 | LS-01 = LS-06 (Vandergrift 2007) | **LS-01** | LS-01 has 6 section occurrences vs LS-06's 2; LS-01 is established as primary |
| DUP-03 | SC-05 = VS-22 (Cook 2008) | **SC-05** | Cook 2008 is fundamentally sociolinguistics (SC cluster); bibliography note already identified SC-05 as §14 primary |
| DUP-06 | CP-64 = EA-03 (Selinker 1972) | EA-03 (pre-confirmed) | Executed |
| DUP-07 | CP-09 = ER-20 (Chikamatsu 1996) | ER-20 (pre-confirmed) | Executed |
| DUP-08 | SC-10 = SC-23 = CP-07 (Blum-Kulka 1989) | CP-07 (pre-confirmed) | Triple-ID collapsed |
| DUP-09 | SC-09 = CP-57 (Ohta 2001) | CP-57 (pre-confirmed) | Executed |
| DUP-10 | SC-15 = SC-08 (Kasper & Rose 2002) | SC-08 (pre-confirmed) | Executed |
| DUP-11 | OT-01 = KR-09 (Swain 1985) | KR-09 (pre-confirmed) | Executed |

### TASK 2 — Mechanical ID Replacements

Executed sed-based replacements across all section files and blueprint documents. Range-reference handling:
- `SC-15–SC-28` → `SC-08, SC-16–SC-28`
- `OT-01–OT-05` → `KR-09, OT-02–OT-05`
- `OT-01–OT-32` → `KR-09, OT-02–OT-32`

Retirement markers within historical tables in sections (e.g., `~~SC-10~~` in SECTION14-SOCIO.md bibliography tables) **retained as historical record** — these document the retirement and provide traceability.

**Verification:** 0 active references (excluding retirement markers) remain for any retired DUP ID.

### TASK 3 — Bibliography Update to v7

- Version bumped FINAL v6 → FINAL v7 (17 April 2026)
- Added RETIRED markers for GA-09, LS-06, VS-22
- Updated SC-05 note to reflect DUP-03 resolution
- Added DUP-03 through DUP-11 resolution summary rows to statistics table
- Updated GA-09 and LS-01/LS-06 flag lines from "pending" → "resolved"

### TASK 4 — VD-17 Flag Resolution (RETIRED)

Web search on Cai (2015) "kanji compounds through morphological analysis" in JJLTA vol 162:
- CiNii, J-STAGE, general databases — no match for author-title-journal-volume combination
- Web search result: similar topic papers by Mori (2003), Mori & Nagy (1999) already in corpus as canonical references

**Decision:** VD-17 RETIRED due to verification failure. §CA.4 morphological analysis claim preserved through Mori (2003) and Mori & Nagy (1999) cross-references (both pre-canonical).

### TASK 5 — EA-22 Flag Resolution (GAP MARKER FORMALIZED)

Literature gap confirmed permanent:
- JALT Journal, *Nihongo Kyōiku*, I-JAS usage papers, *The Language Teacher* searched — no English-language empirical study on Indonesian L1 → Japanese transfer errors matching target description
- Elevated to **Platform Research Agenda §PRA-3** — Nugget Nihongo instrumented error collection (consent-based, anonymized) as primary research contribution opportunity
- §5.5.29 existing Indonesian L1 evidence (non-peer-reviewed) retained as interim reference

### TASK 6 — F1: Level Ladder Specification (NEW DELIVERABLE)

**File:** `corpus/sections/synthesis/LEVEL-LADDER-SPEC-v1.md` (315 lines, ~4,300 words)

5-level specification (N5 → N1) with:
- Vocabulary load target per level (word family counting convention)
- Grammar structures introduced (Pienemann/Di Biase-Kawaguchi PT stage mapping)
- SRS card type distribution per level (Four Strands applied)
- Can-do exit criteria (CEFR-J aligned)
- FSRS milestone triggers (Stability thresholds + streak + skill battery)

Includes architectural notes (counting convention, transitions as continuous, individual-differences modulation) and Indonesian-specific calibration (kanji burden, phonology advantage, malu production-card moderation).

### TASK 7 — F2: §18 Synthesis Section (NEW DELIVERABLE)

**File:** `corpus/sections/synthesis/SECTION18-SYNTHESIS-v1.md` (226 lines, ~2,100 words)

Four-part synthesis:
- §18.1 — Overview model (SRS + Multimedia + Output + ID as interacting system) with cluster interaction diagram
- §18.2 — Four Strands applied to platform features + gap analysis (MFI is structurally underserved)
- §18.3 — Three archetypal learner profiles (SSW Candidate, Serious Hobbyist, Absolute Beginner) with feature-set emphasis recommendations
- §18.4 — Competitive differentiation vs Duolingo grounded in §16 CM cluster evidence
- §18.5 — Limitations acknowledgment

### TASK 8 — F3: Methodology Page Narrative (NEW DELIVERABLE)

**File:** `blueprint/METHODOLOGY-PAGE-NARRATIVE-v1.md` (135 lines, ~920 words)

6-section Indonesian-dominant narrative skeleton:
1. Target learner specificity (SSW + Serious Hobbyist + Beginner)
2. Vocabulary pedagogy (FSRS + Indonesian prior calibration)
3. Japanese-specific treatment (kanji, contrastive, keigo, pitch accent)
4. Individual adaptation (onboarding + FSRS prior + autonomy)
5. Honest claims and non-claims (7-point "Do NOT claim" list from Agent 2 handoff respected)
6. Research agenda opportunities (Study 1–3 from Platform Research Agenda)

Includes production notes for Indonesian translation, visual treatment, word count targets, and deliberate avoidance list.

---

## FILES MODIFIED THIS PASS

| File | Changes |
|---|---|
| `corpus/bibliography/MASTER-BIBLIOGRAPHY-FINAL.md` | Version v7; DUP-01/02/03 retired; VD-17 retired; EA-22 formalized; statistics table updated |
| `corpus/sections/SECTION2-GRAMMAR.md` | GA-09 → GA-19 (4 refs) |
| `corpus/sections/SECTION3-LISTENING.md` | LS-06 → LS-01 (6 refs including bold variant) |
| `corpus/sections/SECTION5-CONTRASTIVE.md` | EA-22 flag narrative updated (via bibliography note; §5.6.6 references in-text unchanged) |
| `corpus/sections/SECTION-CA-CURRICULUM.md` | VD-17 flag resolved (retirement marker carried through bibliography) |
| `corpus/sections/SECTION12-OUTPUT-THEORY.md` | OT-01 → KR-09 (7 refs including header references) |
| `corpus/sections/SECTION14-SOCIO.md` | SC-09/10/15/23 → CP-57/CP-07/SC-08/CP-07 respectively; range refs normalized; VS-22 → SC-05 cross-ref updates |
| `corpus/sections/SECTION15-SSW.md` | VS-22 → SC-05 (multiple refs) |
| `corpus/sections/SECTION16-CALL.md` | OT-01–OT-32 range → KR-09, OT-02–OT-32 |
| `corpus/sections/SECTION17-ADULT.md` | SC-15 → SC-08 range ref corrected |
| `blueprint/DESIGN-DECISION-MASTER-v1.md` | All DUP ID replacements applied (VS-22, SC-15, etc.) |
| `blueprint/CURRICULUM-BLUEPRINT-v1.md` | GA-09 → GA-19; VS-22 → SC-05; duplicate pair table note updated |
| `corpus/sections/synthesis/LEVEL-LADDER-SPEC-v1.md` | **NEW** — F1 deliverable |
| `corpus/sections/synthesis/SECTION18-SYNTHESIS-v1.md` | **NEW** — F2 deliverable |
| `blueprint/METHODOLOGY-PAGE-NARRATIVE-v1.md` | **NEW** — F3 deliverable |
| `archive/pass-logs/PASS16-LOG.md` | **NEW** — this file |

---

## OPEN ITEMS REMAINING

### Still pending (not in scope of Pass 16)

- **15 DOI verifications pending manual checks** (carried forward from PASS15-LOG.md TASK 1). These require database access beyond web search — CiNii, J-STAGE, De Gruyter, Oxford Academic, etc. Recommended for future Agent 2 Session or Claude Code session with targeted database tooling.
- **DUP-04 & DUP-05 (ER-05/BC-08 and ER-10/OT-25–30)** — remain DUP candidates pending Agent 38 verdict. Not escalated to confirmed DUP status in Pass 16.
- **§8 Flag-1 / Flag-4 / Flag-5 / Flag-6 / Flag-7** — CRISPY/Engineering items. §8-Flag-2 (Matsunaga kanji prior) referenced in LEVEL-LADDER-SPEC for implementation. Others require engineering sprint coordination outside corpus scope.
- **§10 Flag-B, §10-D, §10-E** — medium/low priority cosmetic or pending Agent 37 DOI verdicts.
- **Swain (1985) relocation §1.6 → §12** — MEDIUM priority editorial restructure (not executed this pass; OT cluster now canonical under KR-09).
- **Matsunaga (1999) formal ID assignment** — referenced in LEVEL-LADDER-SPEC as a required FSRS engineering input; formal cluster ID assignment (BC-XX or new cluster) not executed this pass.

### Cosmetic gaps (intentional, non-blocking)

- AL-12, AL-13 (vacant numbering slots; §17 notes "cosmetic only")
- CM-13, CM-25 (range CM-14–CM-25 noted in §16 — gaps intentional)
- SC-12, SC-13, SC-14 (reserved for Agent 19 §14 Part 2 which was absorbed; gaps intentional)
- ER-21, ER-25 (cosmetic gaps)
- CV-05 (conditional — DOI/citation resolution pending)

These are documented in cluster summary as numbering gaps, not missing work.

### Supplement bare stubs (13)

Carried forward from v6 — author+year only entries in SUPPLEMENT section, not in primary body clusters. Non-critical for corpus integrity.

---

## CORPUS STATE AT END OF PASS 16

| Metric | Value |
|---|---|
| Version | v17-PASS16-FINAL (bibliography v7) |
| Total unique entries | 747 |
| Sections complete | 16 + 3 synthesis deliverables (F1/F2/F3) = **19** |
| Synthesis deliverables | ✅ All 3 shipped (F1, F2, F3) |
| DUP flags resolved | ✅ All 9 confirmed + 2 still pending Agent 38 (DUP-04, DUP-05) |
| Red flags resolved | ✅ VD-17 retired, EA-22 formalized as research agenda item |
| Pending manual DOI verifications | 15 (documented in PASS15-LOG) |
| Crispy action items (non-delegable) | All Pass 16 scope items executed |

---

*PASS16-LOG.md — Crispy (Claude Opus 4.7) — 17 April 2026*
*Session mode: /effort max — comprehensive consolidation*
*Corpus handoff: ready for downstream consumption by methodology page, FE integration, or research dissemination.*
