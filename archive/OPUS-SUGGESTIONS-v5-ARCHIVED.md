# NUGGET NIHONGO — OPUS SUGGESTIONS v5
**From:** Agent 2 Sonnet 4.6 (handoff prep pass — v17)
**Date:** 5 April 2026
**Re:** v17 clean handoff to Crispy Opus 4.6
**Supersedes:** OPUS-SUGGESTIONS-v4.md (5 April 2026)
**Changes from v4:** archive/ restored; duplicate flag policy confirmed; DUPLICATE FLAG TABLE added to README-CRISPY; Session C order updated; Crispy session order clarified.

---

## STATUS KESELURUHAN — v4 TASKS COMPLETED ✅

Semua Session B tasks dari OPUS-SUGGESTIONS-v3 dan v4 telah selesai atau dieksekusi.

| # | Task | Status | Notes |
|---|---|---|---|
| 1 | Add CURRICULUM-BLUEPRINT-v1.md to blueprint/ | ✅ DONE (v16) | In `blueprint/CURRICULUM-BLUEPRINT-v1.md` |
| 2 | Fill GA stubs × 5 | ✅ DONE (v16) | GA-16, GA-17, GA-22, GA-25, GA-30 |
| 3 | Fill LS stubs × 6 | ✅ DONE (v16) | LS-03, LS-04, LS-06, LS-09, LS-10, LS-18 |
| 4 | Absorb returned Agent 37/38 verdicts | ⏭️ SKIPPED | No verdicts returned — still pending |
| 5 | Update bibliography to v6, bump version | ✅ DONE (v16) | 747 entries |
| 6 | Restore archive/ folder to ZIP | ✅ DONE (v17) | README-ARCHIVE.md recovered from v14 |
| 7 | Add DUPLICATE FLAG TABLE to README-CRISPY | ✅ DONE (v17) | 3 pairs: DUP-01, DUP-02, DUP-03 |
| 8 | Confirm duplicate flag policy | ✅ DONE (v17) | Agent 2 does not touch bibliography for dupes |

---

## DUPLICATE FLAG POLICY (v17 confirmation)

**Confirmed decision (5 April 2026):**
> For confirmed duplicate IDs where the paper is already fully in the bibliography under a different ID — Agent 2 **leaves for Crispy**. A clear flag table has been added to README-CRISPY. Agent 2 does **not** touch the bibliography. Crispy decides each case.

This policy is now reflected in:
- README-CRISPY.md → DUPLICATE FLAG TABLE (full breakdown per pair)
- CLAUDE.md → DUPLICATE FLAG POLICY section
- INDEX.md → bibliography quick stats note

---

## WHAT IS BLOCKING WHAT

```
BLOCKING CHAIN:

  Crispy: decide DUP-01 (GA-09/GA-19)
    └─ unblocks: Agent 2 Session C → fix §2 in-text + delete retired bibliography entry

  Crispy: decide DUP-02 (LS-01/LS-06)
    └─ unblocks: Agent 2 Session C → fix §3 in-text + delete retired bibliography entry

  Crispy: decide DUP-03 (SC-05/VS-22) OR await Agent 38A verdict
    └─ unblocks: Agent 2 Session C → fix §14/§15 in-text + delete retired bibliography entry

  Agent 2 Session C (all 3 dup decisions + Crispy go-ahead)
    └─ fills remaining 7 stubs (AL×2, CM×2, ER×2, SC×1)
    └─ applies dup resolutions
    └─ bibliography → v7
    └─ packages CORPUS-v18-CLEAN.zip

  Crispy: F1 Level Ladder + F2 §18 Synthesis + F3 Methodology Narrative
    └─ can run in PARALLEL with Session C (independent)
```

---

## RECOMMENDED SESSION PLANS

### Session A — Crispy/Opus (duplicate decisions + synthesis)

**Run immediately. Unblocks Session C.**

```
Priority 1 — Unblock Session C (15 min):
  1. Open README-CRISPY.md → read DUPLICATE FLAG TABLE
  2. Decide DUP-01: GA-09 vs GA-19 (Kanno 2007) — pick (A), (B), or (C)
  3. Decide DUP-02: LS-01 vs LS-06 (Vandergrift 2007) — pick (A), (B), or (C)
  4. Decide DUP-03: SC-05 vs VS-22 (Cook 2008) — pick (A), (B), or (C)/wait 38A
  5. Communicate decisions to Nugget → Nugget passes to Agent 2 Session C

Priority 2 — High-urgency flags:
  6. Resolve VD-17 (Cai 2015) — CiNii/J-STAGE lookup → verify or delete
  7. Resolve EA-22 — formalize as gap marker
  8. Decide Swain (1985) §1.6 → §12 relocation

Priority 3 — Synthesis deliverables (new session or continuation):
  9.  Read CLAUDE.md → CURRICULUM-BLUEPRINT-v1.md → SECTION-CA-CURRICULUM.md §CA.1–CA.5
  10. Read SECTION1-EVIDENCE-BASED.md §1.11–§1.12
  11. Write LEVEL-LADDER-SPEC.md (F1) → save to corpus/sections/
  12. Write SECTION18-SYNTHESIS.md (F2) → save to corpus/sections/
  13. Write METHODOLOGY-PAGE-NARRATIVE.md (F3) → save to blueprint/
```

---

### Session C — Agent 2 (mechanical execution, post-Crispy decisions)

**Prerequisites: Crispy must have decided DUP-01 and DUP-02 before this session starts.**

```
Session C (Agent 2 — remaining stubs + duplicate resolution + DOI):

  Setup:
    1. Read CLAUDE.md (load context, confirm 747 entries baseline, read dup flag policy)
    2. Read MASTER-BIBLIOGRAPHY-FINAL.md header (confirm v6 is current)
    3. Receive Crispy's duplicate decisions from Nugget

  Duplicate resolution (execute Crispy's decisions):
    4. DUP-01 decision: delete retired entry from bibliography, fix §2 in-text refs
    5. DUP-02 decision: delete retired entry from bibliography, fix §3 in-text refs
    6. DUP-03 decision (if made): delete retired entry, fix §14/§15 in-text refs

  Stub fill (7 remaining stubs):
    7. Read SECTION17-ADULT.md → fill AL stubs × 2
    8. Read SECTION16-CALL.md → fill CM stubs × 2
    9. Read SECTION4-ER.md → fill ER stubs × 2
    10. Read SECTION14-SOCIO.md → fill SC stub × 1

  QA:
    11. Absorb any returned Agent 37/38 verdicts (if available)
    12. Check for new duplicate patterns in newly filled stubs

  Wrap-up:
    13. Update bibliography to v7, bump entry count
    14. Update all management docs (README-CRISPY, INDEX, CLAUDE.md, OPUS-SUGGESTIONS-v6)
    15. Repackage as NUGGET-NIHONGO-CORPUS-v18-CLEAN.zip
        folder: nugget-nihongo-v18/
        include: archive/ folder with README-ARCHIVE.md
```

---

## REMAINING OPEN ITEMS

### For Crispy only (non-delegable):

| Item | Urgency | Blocked on |
|---|---|---|
| 🔴 DUP-01: GA-09 = GA-19 — decide which ID to keep | 🔴 HIGH | Blocks Session C |
| 🔴 DUP-02: LS-01 = LS-06 — decide which ID to keep | 🔴 HIGH | Blocks Session C |
| 🔴 DUP-03: SC-05 = VS-22 — decide or await 38A | 🔴 HIGH | Blocks Session C (partially) |
| 🔴 VD-17 (Cai 2015) — delete if not on CiNii/J-STAGE | 🔴 HIGH | — |
| 🔴 EA-22 — formalize as gap marker | 🔴 HIGH | — |
| 🟡 Swain (1985) relocation §1.6 → §12 | 🟡 MEDIUM | — |
| 🟡 Level Ladder Specification (F1) | 🟡 MEDIUM | — |
| 🟡 §18 Synthesis Section (F2) | 🟡 MEDIUM | — |
| 🟡 Methodology page narrative (F3) | 🟡 MEDIUM | After F1+F2 |
| 🟡 Bibliography count clarification (747 vs 666 standard IDs) | 🟡 MEDIUM | For methodology copy |

### Delegated to Agent 2 Session C (after Crispy's dup decisions):

| Item | Source File | Expected Output |
|---|---|---|
| Apply DUP-01 decision | SECTION2-GRAMMAR.md + bibliography | Retired ID removed; in-text refs updated |
| Apply DUP-02 decision | SECTION3-LISTENING.md + bibliography | Retired ID removed; in-text refs updated |
| Apply DUP-03 decision (if decided) | SECTION14-SOCIO.md + SECTION15-SSW.md + bibliography | Retired ID removed; in-text refs updated |
| Fill AL stubs × 2 | SECTION17-ADULT.md | APA entries AL-xx added to bibliography |
| Fill CM stubs × 2 | SECTION16-CALL.md | APA entries CM-xx added to bibliography |
| Fill ER stubs × 2 | SECTION4-ER.md | APA entries ER-xx added to bibliography |
| Fill SC stub × 1 | SECTION14-SOCIO.md | APA entry SC-xx added to bibliography |
| Verify 42 DOI entries | DOI-VERIFICATION-TRACKER.md | Updated tracker + bibliography |
| Absorb 37A–C, 38A–C verdicts (if returned) | HANDOFF v14 §E | Citation audit v12 + flag resolutions |

---

## NOTES ON CONSISTENCY WITH v4

OPUS-SUGGESTIONS-v4 remains valid as historical record for v16 task execution. This v5 supersedes it for task status tracking and session planning. v4's Session B list is fully executed.

**Archive note:** README-ARCHIVE.md content is unchanged from the original v13 creation. It was simply missing from the v15/v16 ZIP — now restored.

---

*OPUS-SUGGESTIONS-v5 — Agent 2 Sonnet 4.6 — 5 April 2026 — v17 handoff prep pass complete*
*Bibliography: 747 entries, v6. Archive restored. 3-entry duplicate flag table in README-CRISPY. Awaiting Crispy decisions on DUP-01, DUP-02, DUP-03 before Session C can proceed.*
