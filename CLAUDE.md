# NUGGET NIHONGO — PROJECT CONTEXT
**Auto-loaded by Claude Code on every session**
**Last updated:** 6 April 2026 | **By:** Agent 2 (Pass 15 DOI verification + housekeeping)

---

## Apa ini

Research library untuk platform pembelajaran Bahasa Jepang untuk penutur Indonesia.
747 unique citations, 16 corpus sections (§1–§5, §8–§17, §CA), evidence-based curriculum blueprint.
Target learner: Indonesian adult, SSW/Tokutei Ginou context, mobile-first.

---

## Source of Truth

| What | Where |
|---|---|
| Curriculum & pedagogy | `blueprint/DESIGN-DECISION-MASTER-v1.md` (123 decisions) |
| Curriculum blueprint | `blueprint/CURRICULUM-BLUEPRINT-v1.md` (authoritative — added v16) |
| Bibliography | `corpus/bibliography/MASTER-BIBLIOGRAPHY-FINAL.md` (747 entries, v6) |
| Section index | `INDEX.md` |
| Compass artifact | `corpus/source-of-truth/compass_artifact.md` (44 foundational citations) |
| Platform Research Agenda | `corpus/sections/PLATFORM-RESEARCH-AGENDA.md` |
| Superseded files registry | `archive/README-ARCHIVE.md` (full registry — 5 subfolders, 38+ files) |
| Pass execution logs | `archive/pass-logs/` (PASS11-LOG.md, PASS12-LOG.md) |
| Audit index (Passes 1–10) | `archive/AUDIT-INDEX-v17-PASSES1-10-FINAL.md` (moved from root — 136 findings) |
| ⭐ F1/F2/F3 synthesis inputs | `archive/HANDOFF-AGENT2-v14.md` (Crispy: read before synthesis sessions) |

---

## Corpus Sections

All 16 merged, clean section files are in `corpus/sections/`:

| File | Topic | Citations |
|---|---|---|
| SECTION1-EVIDENCE-BASED.md | SRS + Boundary Conditions | ~61 |
| SECTION2-GRAMMAR.md | Grammar Acquisition Theory | 31 |
| SECTION3-LISTENING.md | L2 Listening Comprehension | 25 |
| SECTION4-ER.md | Extensive Reading | 25 |
| SECTION5-CONTRASTIVE.md | Contrastive Linguistics + Error Analysis (§5.5.0–§5.5.31) | ~59 |
| SECTION8-PWA.md | PWA Platform (SDT, L2MSS, malu, MALL, §8.10–§8.11, Flag 3 resolved) | ~145 |
| SECTION9-MULTIMEDIA.md | Multimedia + Orthographic Dev + Phonological Recoding | ~93 |
| SECTION10-GAMIFICATION-HABIT.md | Gamification, Habit, Sleep | ~41 |
| SECTION11-PHONOLOGY.md | Phonological Learning Science | ~44 |
| SECTION12-OUTPUT-THEORY.md | Output Theory & Noticing | ~32 |
| SECTION13-INDIVIDUAL-DIFFS.md | Individual Differences | ~43 |
| SECTION14-SOCIO.md | Sociolinguistics & Keigo | 25 |
| SECTION15-SSW.md | SSW / Vocational Japanese | ~26 |
| SECTION16-CALL.md | CALL/MALL Meta-Analytic Evidence | 21 |
| SECTION17-ADULT.md | Adult Language Learning | 19 |
| SECTION-CA-CURRICULUM.md | Curriculum Architecture + Vocab Depth | ~107 |

> **Note on §6/§7:** §6 dan §7 tidak ada — bukan gap. Penomoran skip dari §5 ke §8 adalah desain awal corpus. Topik terkait ada di §CA (vocabulary depth), §9 (orthography/multimedia), dan §11 (phonology).

---

## ⚠️ DUPLICATE FLAG POLICY (v17)

**Agent 2 does NOT touch the bibliography or section files for duplicate entries.**
All confirmed duplicates are flagged-only and left for Crispy to decide.

**11 confirmed pairs (DUP-01 through DUP-11). DUP-04/DUP-05 remain candidates pending Agent 38.**

| DUP ID | Pair | Paper | Status | Action |
|---|---|---|---|---|
| DUP-01 | GA-09 = GA-19 | Kanno (2007) SSLA 29(2) | 🔴 PENDING CRISPY DECISION | Retire one ID; update §2 in-text refs |
| DUP-02 | LS-01 = LS-06 | Vandergrift (2007) Language Teaching 40(3) | 🔴 PENDING CRISPY DECISION | Retire one ID; update §3 in-text refs |
| DUP-03 | SC-05 = VS-22 | Cook H.M. (2008) *Socializing identities through speech style.* Multilingual Matters. | 🔴 PENDING CRISPY / Agent 38A | Retire one ID; update §14/§15 refs |
| DUP-04 | ER-05 vs BC-08 | Hu & Nation (2000) | **Candidate** — Agent 38 pending | Hold pending Agent 38 verdict |
| DUP-05 | ER-10 vs OT-25–30 | Webb (2007) | **Candidate** — Agent 38 pending | Hold pending Agent 38 verdict |
| DUP-06 | CP-64 = EA-03 | Selinker (1972) *Interlanguage* | Confirmed | Retire CP-64; canonical = EA-03 |
| DUP-07 | CP-09 = ER-20 | Chikamatsu (1996) SSLA 18(4) | Confirmed | Retire CP-09; canonical = ER-20 |
| DUP-08 | SC-10 = SC-23 = CP-07 | Blum-Kulka, House & Kasper (1989) | **Confirmed triple** | Retire SC-10; delete SC-23; canonical = CP-07 |
| DUP-09 | SC-09 = CP-57 | Ohta (2001) *SLA Processes in the Classroom* | Confirmed | Retire SC-09; canonical = CP-57 |
| DUP-10 | SC-15 = SC-08 | Kasper & Rose (2002) *Pragmatic Development* | Confirmed | Retire SC-15; canonical = SC-08 |
| DUP-11 | OT-01 = KR-09 | Swain (1985) *Communicative Competence* | Confirmed | Retire OT-01; canonical = KR-09 |

See README-CRISPY.md DUPLICATE FLAG TABLE for full options and downstream impact.
After Crispy decides → Agent 2 Session C executes mechanical ID replacements.

---

## Commit Convention

```
[AgentXX] [action] [target] — vXX
```
Contoh: `[Agent40] Merge Section 5 v3+v4 — v15`

Push setelah task selesai. Tidak perlu konfirmasi untuk push.

---

## Status Saat Ini (v17 — 5 April 2026)

| Item | Status |
|---|---|
| Corpus sections | 16 sections merged; §8 has 97 untagged MV-cluster citations pending ID assignment (★ Crispy task) — all other sections clean |
| Bibliography | **754 entries, v6 (7 added Pass 9: AV-01, LS-02, VS-01/02/04/06, OD-12); 7 stubs remaining (AL×2, CM×2, ER×2, SC×1)** |
| Duplicate flags | 11 confirmed pairs (DUP-01 through DUP-11); DUP-04/05 remain candidates pending Agent 38. |
| Ghost entries deleted | 3 (Cunningham 2011, Haber 1960, Nezarat 2012) |
| Recovered entries added | 3 (SM-09 App Annie, SM-10 StatCounter, CC-17 Triandis & Gelfand); 7 added Pass 9 (see Bibliography row) |
| CURRICULUM-BLUEPRINT-v1.md | ✅ Added to blueprint/ in v16 |
| archive/ folder | ✅ Fully populated — 5 subfolders (gap-analysis, citation-audit, dispatch-briefs, pass-logs, absorbed-dispatch); AUDIT-INDEX/OPUS-v5/v6/PASS11-LOG moved from root at Pass 12 |
| Section 5 | Merged: v3 + v4-ADDENDUM (§5.5.0–§5.5.31) |
| Section 8 | Merged: v2 + EXPANDED-v3 FULL (§8.1–§8.11 + malu citations) — 1,595 lines |
| Section 9 | Agent29 §9.10.7 already in v1 — confirmed clean |
| DOI tracker | `corpus/bibliography/DOI-VERIFICATION-TRACKER.md` |
| Open synthesis tasks | Level Ladder Spec (F1) + §18 Synthesis (F2) + Methodology Narrative (F3) — for Crispy |
| Workstream D (QA) | Agents 37A–C, 38A–C — verdicts pending |

---

## Open Items for Crispy (Non-delegable)

| Item | Urgency |
|---|---|
| 🔴 DUP-01: GA-09 = GA-19 (Kanno 2007) — decide which ID to keep | 🔴 HIGH |
| 🔴 DUP-02: LS-01 = LS-06 (Vandergrift 2007) — decide which ID to keep | 🔴 HIGH |
| 🔴 DUP-03: SC-05 = VS-22 (Cook 2008) — decide or await 38A | 🔴 HIGH |
| 🔴 DUP-06: CP-64 = EA-03 (Selinker 1972) — confirmed; retire CP-64; canonical = EA-03 | 🔴 HIGH |
| 🔴 DUP-07: CP-09 = ER-20 (Chikamatsu 1996) — confirmed; retire CP-09; canonical = ER-20 | 🔴 HIGH |
| 🔴 DUP-08: SC-10 = SC-23 = CP-07 (Blum-Kulka 1989) — confirmed triple; retire SC-10, delete SC-23; canonical = CP-07 | 🔴 HIGH |
| 🔴 DUP-09: SC-09 = CP-57 (Ohta 2001) — confirmed; retire SC-09; canonical = CP-57 | 🔴 HIGH |
| 🔴 DUP-10: SC-15 = SC-08 (Kasper & Rose 2002) — confirmed; retire SC-15; canonical = SC-08 | 🔴 HIGH |
| 🔴 DUP-11: OT-01 = KR-09 (Swain 1985) — confirmed; retire OT-01; canonical = KR-09 | 🔴 HIGH |
| 🟡 DUP-04: ER-05 vs BC-08 (Hu & Nation 2000) — candidate; pending Agent 38 | 🟡 MEDIUM |
| 🟡 DUP-05: ER-10 vs OT-25–30 (Webb 2007) — candidate; pending Agent 38 | 🟡 MEDIUM |
| 🔴 VD-17 (Cai 2015) — delete if not on CiNii/J-STAGE | 🔴 HIGH |
| 🔴 EA-22 — formalize as gap marker if no source found | 🔴 HIGH |
| 🟡 CC-02 ID discrepancy (Markus & Kitayama vs Brown & Levinson) | 🟡 MEDIUM |
| 🟡 GA-13 conflict (Di Biase & Kawaguchi vs Pienemann 1984) | 🟡 MEDIUM |
| 🟡 Swain (1985) relocation §1.6 → §12 | 🟡 MEDIUM |
| 🟡 Level Ladder Specification (F1) | 🟡 MEDIUM |
| 🟡 §18 Synthesis Section (F2) | 🟡 MEDIUM |
| 🟡 Methodology page narrative skeleton (F3) | 🟡 MEDIUM |
| 🟡 Fill remaining 7 stubs (AL×2, CM×2, ER×2, SC×1) — via Agent 2 Session C | 🟡 MEDIUM |

---

## Do NOT Claim on Methodology Page

- ❌ "FSRS is scientifically proven superior to SM-2"
- ❌ "JLPT N4 is sufficient for SSW work"
- ❌ "JLPT N4 = CEFR A2 (exact)"
- ❌ "ER is equally effective in Japanese as English"
- ❌ "SRS is optimal for all Japanese vocabulary at all levels"
- ❌ "Gamification improves Japanese vocabulary learning"
- ❌ "Indonesian learners universally experience malu"

---

*CLAUDE.md updated by Agent 2 — 6 April 2026 — v17-PASS15 DOI verification*
