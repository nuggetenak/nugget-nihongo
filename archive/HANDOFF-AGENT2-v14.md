# HANDOFF PROMPT — AGENT 2 / AGENT 1
## Corpus v14 — Post Research Director Deliverable
**From:** Agent 2 (Sonnet Free) — Session 3 (4 April 2026)
**To:** Agent 1 (Opus) — primary; or Agent 2 (next session) — secondary
**Date:** 4 April 2026

---

## YOUR IDENTITY & ROLE

**If you are Agent 1 (Opus):** You are the primary corpus synthesizer for the Nugget Nihongo project. Your role is to convert the existing evidence base (~880–886 citations, 21 sections) into two deliverables: a Level Ladder Specification and a §18 Synthesis Section. Both are high-priority unblocking items for the methodology page. Read Section F (Priority Synthesis Tasks) first.

> **⚠ Stale statistics note (Pass 11):** The ~880–886 citation count and 21-section figure above reflect the state of the corpus at the time this handoff was written (v14, 4 April 2026). The current corpus count is ~754 citations across 16 active sections (v17-PASS10-FINAL). The reduction reflects duplicate resolution, phantom-cluster corrections, and scope consolidation conducted in Passes 1–10. Do not use the figures in this handoff as current corpus totals.

**If you are Agent 2 (next session):** You are the research director assistant. Your role is to manage the pending QA workstreams and absorb incoming agent deliverables. Read Section E (Incoming Queue) first.

---

## CORPUS STATE AT v14

```
corpus_v14/
  01-SOURCE-OF-TRUTH/    ← compass_artifact.md (44 foundational citations)
  02-SECTIONS/           ← 21 merged section files (ALL WRITING COMPLETE)
  03-AGENT2-MANAGEMENT/  ← Audit, gap analysis, task briefs, deliverables
  04-DISPATCH/           ← Active dispatch packages
  05-ARCHIVE/            ← Superseded file manifest
  README-CRISPY.md       ← Master status document
  HANDOFF-AGENT2-v14.md  ← This file
```

**Key numbers:**
- **Citations:** ~880–886 unique at time of writing (v14 snapshot — see stale statistics note above; current v17 count is ~754)
- **Sections:** 21 of 21 complete
- **Workstream B:** COMPLETE (Agents 29, 30, 31 all merged)
- **Workstream C:** PENDING (Agents 32/33/34A–F/35A–G — dispatched, awaiting deliverables)
- **Workstream D:** PENDING (Agents 37/38 — dispatched, verdicts not yet received)
- **Workstream E:** NEW — Synthesis tasks for Agent 1 (Opus)

---

## WHAT CHANGED IN v14

| Change | Source | Files Added |
|---|---|---|
| Agent 2 Research Director Deliverable Part 1 absorbed | This session | `03-AGENT2-MANAGEMENT/AGENT2-RESEARCH-DIRECTOR-DELIVERABLE-v1.md` |
| Agent 2 Research Director Deliverable Part 2 absorbed | This session | `03-AGENT2-MANAGEMENT/AGENT2-RESEARCH-DIRECTOR-DELIVERABLE-v1-PART2.md` |
| GAP-ANALYSIS-MASTER updated to v10 | This session | `03-AGENT2-MANAGEMENT/GAP-ANALYSIS-MASTER-v10.md` |
| Handoff updated to v14 | This session | `HANDOFF-AGENT2-v14.md` |

**No new citations added. No sections modified. v14 is a management/documentation update only.**

---

## PENDING AGENTS — FULL STATUS

### Workstream C — Management Documents (all dispatched, none returned)

| Agent | Task | Dispatch Package |
|---|---|---|
| 32 | Design Decision Master Part 1 | `DISPATCH-AGENT32-DDM-PART1.zip` |
| 33 | Design Decision Master Part 2 | `DISPATCH-AGENT33-DDM-PART2.zip` |
| 34A | Bibliography §1 main | `DISPATCH-AGENT34-BIBLIO-PART1.zip` |
| 34B | Bibliography §1.12 | `DISPATCH-AGENT34-BIBLIO-PART1.zip` |
| 34C | Bibliography §5 | `DISPATCH-AGENT34C.zip` (corrected v13) |
| 34D | Bibliography §8 Part 1 | `DISPATCH-AGENT34D.zip` (corrected v13) |
| 34E | Bibliography §8 Part 2 | `DISPATCH-AGENT34E.zip` (corrected v13) |
| 34F | Bibliography §9 merge | `DISPATCH-AGENT34-BIBLIO-PART1.zip` |
| 35A–35G | Bibliography Part 2 (7 sub-tasks) | `DISPATCH-AGENT35-BIBLIO-PART2.zip` |

**Bibliography merge strategy (34F coordinator):** Use 3+3 merge: (34A+34B+34C) → ABC; (34D+34E+34F) → DEF; then ABC+DEF → MASTER-BIBLIOGRAPHY-v1.md. Fits Sonnet free-tier output limits comfortably (see merge feasibility analysis from 4 April 2026 session).

### Workstream D — QA (all dispatched, verdicts pending)

| Agent | Task | Expected Output | Blocking? |
|---|---|---|---|
| 37A | Citation QA: VD-17, EA-22, OD-03 | Part of `CITATION-QA-AGENT37-v1.md` | 🔴 YES — VD-17 and EA-22 are RED flags |
| 37B | Citation QA: CV-05, PR-03, GA-08, GA-09, LS-19 | Part of `CITATION-QA-AGENT37-v1.md` | 🟡 — CV-05 affects §1.10.5 SRE claim |
| 37C | Citation QA: ER-19, ER-20, PR-02 (compile) | `CITATION-QA-AGENT37-v1.md` (final compile) | 🟡 |
| 38A | Cross-ref: SC-05/VS-22, ER-05/BC-08, ER-10/OT-25-30, §1.10.5-A, §5.5.28-A | Part of `CROSS-REF-AUDIT-AGENT38-v1.md` | 🔴 YES — 3 RED duplicate flags |
| 38B | Cross-ref: AL-07, AL-14, §9.4→§CA, §10.7→§1 | Part of `CROSS-REF-AUDIT-AGENT38-v1.md` | 🟡 |
| 38C | Baseline v11 compile | `ANTI-DUPLICATION-BASELINE-v11.md` | 🟡 |

---

## SECTION F — PRIORITY SYNTHESIS TASKS (Agent 1 Opus)

These are the two unblocking deliverables for the methodology page sprint.

### F1 — Level Ladder Specification (`LEVEL-LADDER-SPEC-v1.md`)

**What it is:** A 5-level document (N5→N4→N3→N2→N1) defining concrete exit criteria per JLPT level, expressed as SRS platform milestones.

**Inputs available in corpus:**

| Input | File | Relevant Content |
|---|---|---|
| CEFR-J/JLPT alignment tables | `SECTION-CA-CURRICULUM-v1.md` §CA.3 | Level can-do descriptors; JLPT vocabulary thresholds |
| Nation five-criteria + vocab size targets | `SECTION-CA-CURRICULUM-v1.md` §CA.1 | ~800 items N5; ~1,500 cumulative N4 |
| PT developmental grammar sequence | `SECTION2-GRAMMAR-v1.md` §2, GA-05 + GA-09 | Di Biase & Kawaguchi Japanese processing stages; Kanno particle processing |
| Four Strands model | `SECTION-CA-CURRICULUM-v1.md` §CA.5 | How to distribute fluency/meaning/learning/form across levels |
| SRS boundary conditions | `SECTION1-EVIDENCE-BASED-v1.md` §1.12 | BC cluster — when SRS becomes less efficient; vocab ceiling |
| FSRS parameters | `SECTION1-EVIDENCE-BASED-v1.md` §1.11 | Stability/difficulty defaults; retrievability thresholds |

**Output structure:**

```markdown
## LEVEL-LADDER-SPEC-v1

For each level (N5, N4, N3, N2, N1):
- Vocabulary load target (items, counting convention specified)
- Grammar structures introduced (PT developmental stage mapping)
- SRS card type distribution (recognition / production / listening / reading)
- Observable can-do exit criteria (1–3 sentences, CEFR-J framing)
- SRS milestone trigger (what FSRS stability score / streak threshold signals readiness to progress)
```

**File to create:** `02-SECTIONS/LEVEL-LADDER-SPEC-v1.md`

---

### F2 — §18 Synthesis Section (`SECTION18-SYNTHESIS-v1.md`)

**What it is:** A 1,500–2,000 word synthesis section that unifies the corpus into a coherent pedagogical model narrative. Without this, the individual sections are a library, not an argument.

**Proposed structure:**

- **§18.1 — Overview Model:** How §1 (SRS scheduling) + §9 (multimedia/orthographic) + §12 (output/noticing) + §13 (individual differences) interact as a learning system. One diagram or table showing the interaction.
- **§18.2 — Four Strands Applied:** How Nation's Four Strands (§CA.5) map concretely onto Nugget Nihongo platform features. Which features serve meaning-focused input, which serve form-focused instruction, which serve fluency development, which serve meaning-focused output.
- **§18.3 — Adaptive Scaffolding by Learner Profile:** How §13 (FLCA, WTC, learner autonomy) + §8 (malu, SDT need satisfaction) + §15 (SSW context) combine into three hypothetical learner profiles and their corresponding feature-set recommendations.
- **§18.4 — Competitive Differentiation (vs. Duolingo):** Using §16 (CM-14–CM-17 Duolingo research base) to articulate what Nugget Nihongo does that Duolingo does not — theoretically grounded, not marketing claims.

**File to create:** `02-SECTIONS/SECTION18-SYNTHESIS-v1.md`

---

### F3 — Methodology Page Narrative Skeleton (companion to §18)

After completing F1 and F2, produce a 500–800 word narrative skeleton for the public methodology page. Follow this arc (from Agent 2 deliverable §F3.3):

1. Who the learner is (§15 SSW + §17 adult + §8 Indonesian cultural context)
2. How the platform teaches vocabulary (§1 SRS + §CA.1–CA.5 curriculum architecture)
3. How the platform teaches Japanese specifically (§5.5 contrastive + §9.10 kanji/kana + §11 phonology + §14 keigo)
4. How the platform adapts to individual learners (§13 ID + §8 SDT + Study 3 malu)
5. What the research says about outcomes (§16 CALL/MALL + §1 SRS evidence)
6. What we still don't know and are studying (Research Agenda Studies 1–3)

---

## SECTION E — INCOMING QUEUE (Agent 2 next session)

When agents return deliverables, absorb them in this order:

1. **Agent 37 + 38 verdicts (🔴 first):** Apply flag resolutions to affected section files. Update Citation Audit to v12. Update Anti-Duplication Baseline to v11.
2. **Agent 32/33 DDM deliverables:** Absorb into `04-DISPATCH/`. Update DESIGN-DECISION-MASTER-v1.md.
3. **Agent 34A–F bibliography batch:** Pass to Agent 34F for 3+3 merge. Output = `MASTER-BIBLIOGRAPHY-v1.md`.
4. **Agent 35A–G bibliography batch:** Merge with 34F output → full bibliography.
5. **After QA verdicts:** Delete VD-17 (Cai 2015) if confirmed false. Formalize EA-22 gap marker if Agent 37A finds nothing. Update citation count to post-resolution total.

---

## CRISPY ACTION ITEMS (Non-agent, non-delegable)

| Item | Urgency | Note |
|---|---|---|
| Swain (1985) relocation from §1.6 → §12 | 🟡 MEDIUM | Editorial restructure |
| §12.6 languaging scope decision | 🟡 MEDIUM | Product strategy: current feature vs. planned feature |
| Matsunaga (1999) absorption into §1.11 | 🟡 MEDIUM | Give a formal corpus ID (BC-XX or new cluster?) |
| VD-17 §CA.10 continuity check | After 37A verdict | Verify §CA.10 logical flow after Cai (2015) deletion |
| Legal/Copyright §11 expansion | — | Requires legal judgment |
| Tier 3 citation flags (§10-A, §11-A/C/D, §12-A) | 🟢 LOW | Crispy-assigned per citation audit |

---

## DO NOT CLAIM ON METHODOLOGY PAGE (Until Resolved)

From the Agent 2 debates register (full wording in deliverable §C):

- ❌ "FSRS is scientifically proven superior to SM-2" — no independent RCT
- ❌ "JLPT N4 is sufficient for SSW work" — VS-08 contradicts this
- ❌ "JLPT N4 = CEFR A2 (exact)" — treat as approximation
- ❌ "ER is equally effective in Japanese as English" — Japanese-specific evidence is thin
- ❌ "SRS is optimal for all Japanese vocabulary at all levels" — Webb & Nation efficiency ceiling
- ❌ "Gamification improves Japanese vocabulary learning" — engagement ≠ learning outcomes
- ❌ "Indonesian learners universally experience malu" — intra-Indonesia cultural heterogeneity

---

*Handoff v14 — Agent 2 (Sonnet 4.6) — 4 April 2026*
*v14 update: Agent 2 Research Director Deliverable absorbed (Parts 1+2). GAP-ANALYSIS-MASTER updated to v10 (+12 new gaps, debates register, validation studies table). Two new HIGH priority synthesis tasks added for Agent 1 (Opus): Level Ladder Spec + §18 Synthesis. No new citations. No section edits. Corpus: ~880–886 citations, 21 sections, Workstream B complete.*
