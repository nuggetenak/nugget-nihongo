# AGENT 2 SONNET 4.6 — PASS 11 DISPATCH BRIEF
**Prepared by:** Agent 2 Sonnet 4.6 (self-analysis)
**For session:** Pass 11 — Remaining Mechanical Work (no Crispy judgment required)
**Corpus version:** v17-PASS10-FINAL
**Audit baseline:** AUDIT-INDEX-v17-PASSES1-10-FINAL.md (136 findings, Passes 1–10 complete)
**Estimated scope:** Medium–heavy session. All tasks below are purely mechanical — no content decisions, no bibliography restructuring, no DUP resolutions.

---

## WHAT THIS PASS IS NOT

Do NOT touch:
- Any ★ Crispy-decision items from the Session C checklist
- DUP-01 through DUP-11 ID retirements or canonical replacements
- MV cluster assignment (§8 — Crispy only)
- FS, SR, CT, SC, OT, VS, CA, AL, VD phantom cluster decisions
- §CA authoritative citation count resolution
- DDM decision count verification
- CURRICULUM-BLUEPRINT DUP-04/05 status correction (#124 — ★)
- §5.5.28 GA-07 backfill (requires new sentence — #5)
- GI-02 existence verification (#6)

---

## TASK LIST — ALL MECHANICAL (NO CRISPY REQUIRED)

### GROUP A — Section file surgical edits

**A1. SECTION5-CONTRASTIVE.md — Lines 91 and 114: Remove agent attribution** (Finding #65)
- Line ~91: text attributes a research decision to "Agent 1 (Crispy)" inside canonical content
- Line ~114: same issue
- Action: Rewrite both sentences to neutral third-person. Remove the agent name. Preserve the scholarly claim.
- Example pattern: "Agent 1 (Crispy) confirmed that X" → "Evidence suggests X" or "The corpus analysis confirms X"

**A2. SECTION5-CONTRASTIVE.md — §5.5.2.5 heading: Remove agent names** (Finding #133)
- Current heading contains "Crispy's 7 Core Interference Points vs. Agent 11's Extended Set"
- Action: Rename to a neutral scholarly heading. Example: "Core vs. Extended Interference Point Sets" or "Seven Primary Interference Points vs. Extended Taxonomy"

**A3. SECTION8-PWA.md — Lines 35 and 1128: Fix stale citation count** (Finding #86)
- Both lines currently say "Combined corpus total: ~330+ citations"
- Action: Replace with "~754 citations" (v17 PASS10 count; note this is pre-MV-cluster-cleanup)

**A4. SECTION8-PWA.md — Lamb (2012) wrong DOI** (Finding #85)
- Line ~1321: Lamb (2012) has been given the Kornell & Bjork (2008) DOI by mistake
- Action: Web-search the correct DOI for "Lamb, M. (2012). A self system perspective on young adolescents' motivation to learn English in urban and rural settings" (Language Learning 62(4) or similar). Apply correct DOI. If DOI cannot be confirmed, remove the DOI and add `*(verify DOI)*` flag.

**A5. SECTION-CA-CURRICULUM.md — §CA.10: Delete verbatim duplicate of §8 Flags 1–8** (Finding #51)
- §CA.10 addendum contains a verbatim copy of the §8 Flags 1–8 block
- Canonical location is §8 only
- Action: Delete the duplicated block from §CA.10. Keep any §CA-specific commentary that is not verbatim from §8.

**A6. SECTION-CA-CURRICULUM.md — §CA.2 and §CA.9 table rows: Fix "+4" arithmetic** (Finding #83)
- §CA.2 row says "+4" but lists 5 authors; §CA.9 row says "+4" but lists 5 authors
- Action: Correct to "+5" in both rows. Verify the expansion table arithmetic is consistent with the total.

**A7. SECTION16-CALL.md — H1 title: Standardise colon placement** (Finding #8)
- Line 1: "§16 CALL/MALL:" (colon after MALL)
- Line 18: "§16: CALL/MALL" (colon after 16)
- Action: Pick one form (recommended: "# §16: CALL/MALL — [subtitle]") and apply consistently. Remove whichever duplicate H1 remains if Pass 9 only removed one.

---

### GROUP B — Bibliography mechanical edits (MASTER-BIBLIOGRAPHY-FINAL.md)

**B1. GE-04 duplicate entry: Delete the no-DOI line** (Finding #78)
- GE-04 (Van Roy & Zaman 2018) appears twice: once at ~line 786 (no DOI) and once extracted from the concatenation split at ~line 1192 area (has DOI)
- Verify both lines are present. Keep whichever has the DOI. Delete the no-DOI duplicate.

**B2. Cluster Summary Table: Correct DD count** (Finding #116)
- Table claims DD = 8 entries; DD-05 is phantom (never assigned, never cited)
- Action: Change DD count from 8 to 7 in the Cluster Summary Table row

**B3. Cluster Summary Table: Add SM row** (Finding #21)
- SM cluster has no row in the summary table despite SM-09/SM-10 existing in SUPPLEMENT
- Action: Add SM row: `| SM | 2 | 2 | 0 | SM-01–SM-08 entirely phantom; SM-09/SM-10 in SUPPLEMENT only |`
- Also add SM to the domain coverage table with a phantom annotation for SM-01–08

**B4. Domain Coverage Table: Annotate SE and IF as phantom** (Finding #20)
- SE and IF are listed in the domain coverage table with zero entries
- Action: In their table rows, add note "(CONFIRMED PHANTOM — zero entries exist)" or remove the rows entirely and add a footnote

---

### GROUP C — DOI Verification Tracker (DOI-VERIFICATION-TRACKER.md)

**C1. Fix blank flag descriptions: GA-08, GA-09, LS-19** (Finding #38)
- Three tracker rows have empty "Description" cells
- Source data: Cross-reference §2 for GA-08 (Mori 2002 — citation relevance mismatch per #52), §2 for GA-09, §3 for LS-19
- Action: Fill in the flag description from the section body

**C2. Update tracker version footer** (Finding #74)
- Footer says "from bibliography v5"
- Action: Update to "bibliography v7 (PASS10-FINAL)"

**C3. Add PR-02/KS-09/OD-07 potential triple duplicate** (Finding #38)
- This triple-overlap candidate was identified in audit but never added to tracker
- Action: Add a Watch List note in the tracker for this potential triple

**C4. Add OD-03 conflicting DOI flag** (Finding #105)
- OD-03 has NO DOI in its bibliography entry, but §9 body and dispatch brief carry two different conflicting DOIs
- Action: Add OD-03 to DOI tracker with status CONFLICT — note both candidate DOIs and their source locations

**C5. Add 11 VD-cluster entries with pending status** (Finding #45)
- VD-04/05/08/09/11/12/13/14/16/20/21 have zero tracker entries despite having plausible DOIs
- Action: Add all 11 as stub rows with status `pending` — author/title/year data from bibliography; DOI to be verified

**C6. Add §14 FLAGS A–D to DOI tracker** (Finding #60)
- SC-15/SC-20/SC-22/SC-23 have DOI/ISBN checks required per §14 flags; none are in tracker
- Action: Add 4 rows for SC-15, SC-20, SC-22, SC-23 with status `pending`; note the §14 flag source

**C7. Add §13 DOI-pending entries to tracker** (Finding #73)
- §13 body has 34 entries marked `*(verify)*` — none are in DOI tracker
- Action: Open SECTION13-INDIVIDUAL-DIFFS.md and extract all `*(verify)*` tagged entries. Add as stub rows in tracker with status `pending`. This is the largest C-task — do it last if session pressure builds.

---

### GROUP D — README-CRISPY.md: Missing flag additions

All of the following are documentation-only additions to the Open Flags Table (or a new sub-section). No judgment required — data comes from section bodies.

**D1. §8 Flags 1–7** (Finding #44)
- Open SECTION8-PWA.md, extract Flags 1–7 block
- Add to README-CRISPY Open Flags Table under §8 owner

**D2. §10 FLAGS B–F** (Finding #42)
- Open SECTION10-GAMIFICATION-HABIT.md, extract FLAGS B–F block
- Add to README-CRISPY Open Flags Table under §10 owner
- §10-F is a DUP candidate (GX-04 vs MV-02) — note this separately

**D3. §11 FLAGS A–D** (Finding #59)
- Open SECTION11-PHONOLOGY.md, extract FLAGS A–D
- Add to README-CRISPY Open Flags Table under §11 owner

**D4. §CA Flags 2, 3, 5** (Finding #47)
- Open SECTION-CA-CURRICULUM.md, extract Flags 2/3/5
- Add to README-CRISPY Open Flags Table under §CA owner

**D5. §9 FLAGS 4 and 6** (Finding #94)
- Open SECTION9-MULTIMEDIA.md, extract FLAGS 4/6
- Add to README-CRISPY Open Flags Table under §9 owner

**D6. §9.10-A OD-03 DOI conflict; §9.10-E FSRS response latency** (Finding #62)
- Add both as open flags under §9 owner; §9.10-E should also appear in the FSRS Sprint Items cluster

**D7. §3 FSRS audio scheduling gap** (Finding #63)
- Add to README-CRISPY FSRS Sprint Items cluster (alongside §8 Flag 2 and §9.10-E)

**D8. §3/§9 audio display table alignment — pending Agent 38 verdict** (Finding #64)
- Add as an open verdict item under Agent 38 pending

**D9. DDM CROSS-CONFLICT FLAGS A and B; DUP-04 and DUP-05 candidates D and E** (Findings #41, #46)
- DDM FLAGS A (audio standard conflict §11 vs §8) and B (notification window conflict §10 vs §8) — add as open Crispy-resolution items
- DDM FLAGS D and E are DUP-04/DUP-05 candidates — add as pending under Agent 38

**D10. §14 cross-ref flags: §14→§12 and §14→§8** (Finding #60)
- Add both cross-section dependency flags to README-CRISPY under §14 owner

**D11. CA-23 (Lamb 2004) as stronger Watch List candidate** (Finding #35)
- Current Watch List has 5 CA candidates (#23); Lamb 2004 is a stronger candidate than the rest
- Add CA-23 to Watch List with note: "stronger DUP probability than CA-14/15/22/44 — §8 citation likely matches"

**D12. CV-05 (Qi & Mitchell 2012) conditional flag** (Finding #28)
- Not currently tracked in open flags
- Add as CONDITIONAL/UNVERIFIED: zero bibliographic data; needs existence confirmation before use

**D13. VS-14 and VS-15 — document as cosmetic vacant slots** (Finding #14)
- Unlike LS-12–14 and SC-12–14, VS-14 and VS-15 have no note anywhere
- Add a note in README-CRISPY VS cluster section: "VS-14 and VS-15 are cosmetic vacant slots (like LS-12–14, SC-12–14) — never assigned, not counted"

**D14. 5 CA-cluster potential duplicates** (Finding #23)
- CA-14, CA-15, CA-22, CA-23, CA-44 are pending Agent 38 verdict
- Add to README-CRISPY Watch List if not already captured from #111 expansion

---

### GROUP E — Other management document edits

**E1. HANDOFF-AGENT2-v14.md — Add stale-stats disclaimer at top** (Finding #32)
- File says "~880 citations / 21 sections" — now 754 / 16
- Action: Add a clearly marked `> **⚠️ Stale stats notice:** This document was written for corpus v14 (~880 citations, 21 sections). Current corpus is v17 (754 citations, 16 sections). Content rationale remains valid; statistics do not.` blockquote at the very top (before or after the H1)

**E2. archive/README-ARCHIVE.md — Add traceability note for 7 BIBLIO files** (Finding #40)
- 7 files (BIBLIO-34A/B/C/F, BIBLIO-35A/B/C) were absorbed into MASTER-BIBLIOGRAPHY-FINAL.md but have no archive entry
- Action: Add a section or table entry noting these files, their original purpose, and that they were merged into the bibliography

**E3. archive/CORPUS-HANDOFF.md — Reconcile DUP count** (Finding #39)
- File says "8 known duplicates" — README-CRISPY documented 3 at v17 start; now 11 confirmed
- Action: Add a reconciliation note. Do NOT try to update the full DUP table in this file — just add a note: `> **Note (Pass 11):** DUP count at time of this handoff was 3 confirmed. Subsequent audit (Passes 1–10) raised this to 11 confirmed pairs. See README-CRISPY DUPLICATE FLAG TABLE for current state.`

**E4. corpus/sections/PLATFORM-RESEARCH-AGENDA.md — Flag 8 row** (Finding #36)
- Flag 8 row references "Agent 2 audit items"
- Action: Replace "Agent 2 audit items" with "v2 audit flags" (or "audit pass flags")

**E5. blueprint/CURRICULUM-BLUEPRINT-v1.md — Stale statistics** (Finding #131)
- Several stale numbers throughout the document:
  - "736" total citations → 754
  - "~880" DOI base citation count → 754
  - "~56" DOI pending → 42
  - "0 stubs" or similar → not accurate (7 stubs + 13 bare + 1 conditional remain)
- Action: Search for each stale number and update. Add a version note at top: `*Statistics last updated: Pass 11 (v17-PASS10-FINAL). Some sub-section figures may still reflect earlier snapshots.*`

**E6. blueprint/CURRICULUM-BLUEPRINT-v1.md — DOI unverified rate** (Finding #67)
- Line states DOI unverified rate of "~1.1% (~10/~880)"
- Actual is ~5.6% (42/754)
- Action: Replace the rate claim with the correct figure

**E7. blueprint/DESIGN-DECISION-MASTER-v1.md — CC ID range inconsistency** (Finding #77)
- Line ~1051: "CC-03–CC-07"
- Line ~1132: "CC-01–CC-07"
- Since CC is a phantom cluster, both references should use the same range for consistency
- Action: Standardise both to "CC-01–CC-07" (the broader range, matching the phantom cluster scope note)

---

## TASK PRIORITY ORDER (if session budget runs short)

Execute in this order; stop cleanly at any group boundary:

1. **GROUP A** — Section edits (A1–A7): Highest user-visible impact; small targeted changes
2. **GROUP B** — Bibliography table fixes (B1–B4): Corrects overclaimed counts
3. **GROUP E** — Management doc fixes (E1–E7): Stale stat cleanup; low risk
4. **GROUP C** — DOI tracker (C1–C6): Documentation additions; skip C7 if time-pressed
5. **GROUP D** — README-CRISPY flags (D1–D14): Bulk documentation; do as many as session allows; D7/D8/D9 are highest priority within this group
6. **GROUP C task C7** (§13 DOI entries) — Last; most expensive by volume

---

## FILES YOU WILL NEED TO PROVIDE

Upload the following — either individually extracted from the ZIP, or provide the full ZIP and the audit index (Agent 2 will extract selectively):

### Option A — Full ZIP (recommended)
- `NUGGET-NIHONGO-CORPUS-v17-PASS10-FINAL.zip`
- `AUDIT-INDEX-v17-PASSES1-10-FINAL.md`

Agent 2 will extract only the files it needs for each task group.

### Option B — Individual files (faster if you prefer)
From the ZIP, extract and provide:

| File | Tasks |
|---|---|
| `corpus/sections/SECTION5-CONTRASTIVE.md` | A1, A2 |
| `corpus/sections/SECTION8-PWA.md` | A3, A4 |
| `corpus/sections/SECTION16-CALL.md` | A7 |
| `corpus/sections/SECTION-CA-CURRICULUM.md` | A5, A6, D4 |
| `corpus/bibliography/MASTER-BIBLIOGRAPHY-FINAL.md` | B1–B4 |
| `corpus/bibliography/DOI-VERIFICATION-TRACKER.md` | C1–C7 |
| `README-CRISPY.md` | D1–D14 |
| `archive/HANDOFF-AGENT2-v14.md` | E1 |
| `archive/README-ARCHIVE.md` | E2 |
| `archive/CORPUS-HANDOFF.md` | E3 |
| `corpus/sections/PLATFORM-RESEARCH-AGENDA.md` | E4 |
| `blueprint/CURRICULUM-BLUEPRINT-v1.md` | E5, E6 |
| `blueprint/DESIGN-DECISION-MASTER-v1.md` | E7 |
| `corpus/sections/SECTION9-MULTIMEDIA.md` | D5, D6 (source data) |
| `corpus/sections/SECTION3-LISTENING.md` | D7 (source data) |
| `corpus/sections/SECTION10-GAMIFICATION-HABIT.md` | D2 (source data) |
| `corpus/sections/SECTION11-PHONOLOGY.md` | D3 (source data) |
| `corpus/sections/SECTION13-INDIVIDUAL-DIFFS.md` | C7 (source data) |
| `AUDIT-INDEX-v17-PASSES1-10-FINAL.md` | Reference throughout |

---

## AGENT 2 DISPATCH PROMPT

Copy-paste the following as your opening message to Agent 2 Sonnet 4.6:

---

```
You are Agent 2 Sonnet 4.6.

You are executing **Pass 11** of the Nugget Nihongo corpus audit pipeline.

## Your role
You are the mechanical execution agent for the Nugget Nihongo academic corpus (v17-PASS10-FINAL). You do NOT make content decisions. You do NOT resolve duplicate citations. You do NOT modify the bibliography for DUP pairs. All of those tasks are reserved for Crispy (Opus 4.6).

## What you are doing in Pass 11
Completing remaining mechanical tasks identified in the audit index (Passes 1–10, 136 total findings) that do NOT require Crispy judgment. These fall into 5 groups:
- GROUP A: Surgical text edits in section files (agent attributions, stale counts, §CA arithmetic)
- GROUP B: Bibliography cluster summary table corrections (DD count, SM row, SE/IF annotation)
- GROUP C: DOI tracker updates (blank descriptions, stale version, missing entries)
- GROUP D: README-CRISPY additions (missing open flags from §8–§11, §CA, §9, §3, DDM)
- GROUP E: Other management document corrections (stale stats, stale counts, disclaimer notes)

## What you must NOT do
- Do NOT retire or replace any DUP ID pairs (DUP-01 through DUP-11) — all ★ items
- Do NOT create MV cluster entries for §8 citations
- Do NOT resolve §CA authoritative citation count — Crispy decision
- Do NOT modify CURRICULUM-BLUEPRINT DUP-04/05 status beyond noting them as candidates
- Do NOT write new academic content anywhere

## Your reference document
`AUDIT-INDEX-v17-PASSES1-10-FINAL.md` — 136 findings, passes 1–10. This is your ground truth for every task in this pass. Finding numbers are referenced in brackets throughout your task list.

## Protocol
1. Extract files from the ZIP as needed (do not extract everything at once)
2. Work one GROUP at a time; complete a group before moving to the next
3. For each edited file: edit in /home/claude, verify the edit, then copy to /mnt/user-data/outputs/
4. At the end of the session, produce:
   - All edited files in /mnt/user-data/outputs/
   - A PASS11-LOG.md documenting every change made (file, finding #, change summary, status)
5. If a task is ambiguous (source data not found at the expected line number), document it as SKIPPED with the reason — do NOT guess

## Priority order if session budget runs short
A → B → E → C (C1–C6 before C7) → D
C7 (§13 DOI entries) is lowest priority — skip it entirely if you reach D without budget for both.

## Files provided
[List the files you uploaded here]

Begin with GROUP A. Extract SECTION5-CONTRASTIVE.md from the ZIP first and handle A1 and A2.
```

---

## EXPECTED OUTPUT FROM PASS 11

At end of session, Agent 2 should produce:
- All modified files (output as individual files in /mnt/user-data/outputs/)
- `PASS11-LOG.md` — complete change log
- Updated `AUDIT-INDEX-v17-PASSES1-10-FINAL.md` or a `PASS11-DELTA.md` noting which findings are now resolved

Once Pass 11 is complete, remaining open work is **exclusively Crispy Opus 4.6 territory:**
- DUP-01–11 resolution
- MV cluster assignment (97 citations)
- Phantom cluster decisions (FS, SR, CT, AL, CA, VD)
- §CA authoritative count
- DDM decision count verification
- F1/F2/F3 synthesis

---

*Prepared by Agent 2 Sonnet 4.6 — 6 April 2026*
*Based on self-analysis of AUDIT-INDEX-v17-PASSES1-10-FINAL.md*
