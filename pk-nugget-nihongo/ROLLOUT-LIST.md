# ROLLOUT LIST — PK ARCHITECTURE REFACTOR
> Atomic rollout: upload ALL files before opening any agent session.
> Do not do partial uploads. All or nothing per phase.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
OVERVIEW — WHAT CHANGES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
OLD system : 5–6 large PK files injected into every agent (~26K tokens default)
NEW system : 1 AGENT-CORE.md per agent (~2K tokens) + modules loaded on demand

Each agent's PK will contain:
  AGENT-CORE-A[N].md   → replaces AGENT-[N]-*.txt (always loaded)
  modules/*.md          → loaded on demand (not in default PK)
  reference/*.md        → loaded on demand (not in default PK)

AGENT-COMMON-v14.md, MASTER-FLOW-v5.md, SESSION-RECAP files →
  removed from PK default load (content split into modules + reference)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PHASE 1 — UPLOAD SHARED MODULES (no agent impact yet)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
These modules are shared across agents. Upload to a shared location or
embed them in each agent's PK that will use them.

Files to upload:
  modules/checkpoint.md          → PK: A1, A2, A3, A4, A5, A6, A7, A8, A9 (all)
  modules/multi-session.md       → PK: A1, A2, A3, A4, A5, A6, A7, A8, A9 (all)
  modules/patch-notes.md         → PK: A1, A2, A3, A4, A5, A6, A7, A8, A9 (all)
  modules/session-proof.md       → PK: A1, A2, A3, A4, A5, A6, A7, A8, A9 (all)
  modules/zip-intake.md          → PK: A2, A3, A4, A5 (worker agents only)

Status: [ ] Phase 1 complete

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PHASE 2 — UPLOAD AGENT-SPECIFIC MODULES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Files to upload:
  modules/audit-system.md              → PK: A6 (Crunchy) ONLY
  modules/verdict-format.md            → PK: A6 (Crunchy) ONLY
  modules/gap-governance.md            → PK: A6 (Crunchy) ONLY
  modules/revision-reject.md           → PK: A1, A6 (Crispy + Crunchy)
  modules/merge-system.md              → PK: A1 (Crispy) ONLY
  modules/dispatch-system.md           → PK: A1 (Crispy) ONLY
  modules/crispy-idea-plan.md          → PK: A1 (Crispy) ONLY
  modules/spicy-scan.md                → PK: A7 (Spicy) ONLY
  modules/spicy-proposal.md            → PK: A7 (Spicy) ONLY
  modules/curriculum-proposal.md       → PK: A8 (Fluffy) ONLY
  modules/savory-analytics-proposal.md → PK: A9 (Savory) ONLY

Status: [ ] Phase 2 complete

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PHASE 3 — UPLOAD REFERENCE FILES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Files to upload:
  reference/master-flow.md       → PK: A1, A6, A7, A8 (agents who discuss flow)
  reference/zip-formats.md       → PK: A1, A6 (Crispy + Crunchy — package/verify ZIPs)
  reference/research-db-rules.md → PK: A6, A9 (Crunchy + Savory)
  reference/naming-convention.md → PK: A1, A6 (Crispy + Crunchy — create most files)
  reference/edge-cases.md        → PK: A1, A6 (Crispy + Crunchy — system-level handlers)

Status: [ ] Phase 3 complete

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PHASE 4 — UPLOAD AGENT-CORE FILES (the swap)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚠️ Do Phase 1, 2, 3 FIRST. This phase is the live swap.
⚠️ Upload ALL of these before opening any agent session.

  AGENT-CORE-A1.md → PK Agent 1 (Crispy)   — replaces AGENT-1-INTEGRATOR-v*.txt
  AGENT-CORE-A2.md → PK Agent 2 (Juicy)    — replaces AGENT-2-VOCAB-v*.txt
  AGENT-CORE-A3.md → PK Agent 3 (Saucy)    — replaces AGENT-3-BOOK-v*.txt
  AGENT-CORE-A4.md → PK Agent 4 (Batter)   — replaces AGENT-4-GRAMMAR-v*.txt
  AGENT-CORE-A5.md → PK Agent 5 (Golden)   — replaces AGENT-5-UI-v*.txt
  AGENT-CORE.md    → PK Agent 6 (Crunchy)  — replaces AGENT-6-QA-v*.txt
  AGENT-CORE-A7.md → PK Agent 7 (Spicy)    — replaces AGENT-7-SPICY-v*.txt
  AGENT-CORE-A8.md → PK Agent 8 (Fluffy)   — replaces AGENT-8-FLUFFY-v*.txt
  AGENT-CORE-A9.md → PK Agent 9 (Savory)   — replaces AGENT-9-SAVORY-v*.txt

Status: [ ] Phase 4 complete

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PHASE 5 — REMOVE OLD MONOLITHIC FILES FROM PK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚠️ Only do this AFTER Phase 4 is confirmed working (run 1–2 test sessions).

Remove from ALL agent PKs:
  AGENT-COMMON-v14.md             → remove (content split into modules + cores)
  MASTER-FLOW-NUGGET-NIHONGO-v5.md → remove (replaced by reference/master-flow.md)
  SESSION-RECAP-MARET2026.txt     → remove (replace with reference/session-recap.md if needed)
  SESSION-RECAP-ARCHIVE.txt       → remove (historical only — not needed in PK)

Remove from specific agent PKs:
  AGENT-COMMON-CRUNCHY-ADDENDUM-v5.md → remove from A6 PK (content in modules)
  AGENT-COMMON-CRISPY-ADDENDUM-*.md   → remove from A1 PK (content in modules)

Status: [ ] Phase 5 complete

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PK MATRIX — FINAL STATE PER AGENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
(✓ = in PK / ✗ = not in PK / load = on-demand only)

                                  A1  A2  A3  A4  A5  A6  A7  A8  A9
AGENT-CORE-A[N].md                 ✓   ✓   ✓   ✓   ✓   ✓   ✓   ✓   ✓
modules/checkpoint.md              ✓   ✓   ✓   ✓   ✓   ✓   ✓   ✓   ✓
modules/multi-session.md           ✓   ✓   ✓   ✓   ✓   ✓   ✓   ✓   ✓
modules/patch-notes.md             ✓   ✓   ✓   ✓   ✓   ✓   ✓   ✓   ✓
modules/session-proof.md           ✓   ✓   ✓   ✓   ✓   ✓   ✓   ✓   ✓
modules/zip-intake.md              ✗   ✓   ✓   ✓   ✓   ✗   ✗   ✗   ✗
modules/revision-reject.md         ✓   ✗   ✗   ✗   ✗   ✓   ✗   ✗   ✗
modules/merge-system.md            ✓   ✗   ✗   ✗   ✗   ✗   ✗   ✗   ✗
modules/dispatch-system.md         ✓   ✗   ✗   ✗   ✗   ✗   ✗   ✗   ✗
modules/crispy-idea-plan.md        ✓   ✗   ✗   ✗   ✗   ✗   ✗   ✗   ✗
modules/audit-system.md            ✗   ✗   ✗   ✗   ✗   ✓   ✗   ✗   ✗
modules/verdict-format.md          ✗   ✗   ✗   ✗   ✗   ✓   ✗   ✗   ✗
modules/gap-governance.md          ✗   ✗   ✗   ✗   ✗   ✓   ✗   ✗   ✗
modules/spicy-scan.md              ✗   ✗   ✗   ✗   ✗   ✗   ✓   ✗   ✗
modules/spicy-proposal.md          ✗   ✗   ✗   ✗   ✗   ✗   ✓   ✗   ✗
modules/curriculum-proposal.md     ✗   ✗   ✗   ✗   ✗   ✗   ✗   ✓   ✗
modules/savory-analytics-prop.md   ✗   ✗   ✗   ✗   ✗   ✗   ✗   ✗   ✓
reference/master-flow.md           ✓   ✗   ✗   ✗   ✗   ✓   ✓   ✓   ✗
reference/zip-formats.md           ✓   ✗   ✗   ✗   ✗   ✓   ✗   ✗   ✗
reference/research-db-rules.md     ✗   ✗   ✗   ✗   ✗   ✓   ✗   ✗   ✓
reference/naming-convention.md     ✓   ✗   ✗   ✗   ✗   ✓   ✗   ✗   ✗
reference/edge-cases.md            ✓   ✗   ✗   ✗   ✗   ✓   ✗   ✗   ✗

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TOKEN LOAD COMPARISON
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Agent  | Old default | New default | Reduction
-------|-------------|-------------|----------
A1     | ~26,375     | ~4,600      | 83%
A2     | ~26,375     | ~2,800      | 89%
A3     | ~26,375     | ~2,600      | 90%
A4     | ~26,375     | ~2,600      | 90%
A5     | ~26,375     | ~2,700      | 90%
A6     | ~26,375     | ~2,300      | 91%
A7     | ~26,375     | ~2,400      | 91%
A8     | ~26,375     | ~2,200      | 92%
A9     | ~26,375     | ~2,300      | 91%

New defaults include CORE + all agent-specific modules in their PK.
"Default" here means: what's in PK and loaded before any session action.
Modules are in PK but only read via view tool when triggered — they don't
auto-inject into context the way PK files currently do.

Note: If your Claude PK setup injects ALL PK files automatically into context,
the efficiency gain comes from the smaller file sizes. If your setup allows
selective loading (view tool calls), gains are even larger.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ROLLOUT CHECKLIST
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[ ] Phase 1: Shared modules uploaded to all relevant agent PKs
[ ] Phase 2: Agent-specific modules uploaded to correct PKs
[ ] Phase 3: Reference files uploaded to relevant PKs
[ ] Phase 4: All 9 AGENT-CORE files uploaded (replace old prompts)
[ ] Smoke test: open Agent 6 session, drop main project ZIP, verify SESSION MENU works
[ ] Smoke test: open Agent 2 session, drop Task Brief ZIP, verify zip-intake module loads
[ ] Smoke test: open Agent 1 session, drop FOR-INTEGRATOR ZIP, verify merge-system loads
[ ] Phase 5: Remove old monolithic files after smoke tests pass

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FILE COUNT SUMMARY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
AGENT-CORE files  : 9   (one per agent)
Shared modules    : 5   (checkpoint, multi-session, patch-notes, session-proof, zip-intake)
Agent-specific    : 12  (merge-system, dispatch-system, crispy-idea-plan, revision-reject,
                         audit-system, verdict-format, gap-governance,
                         spicy-scan, spicy-proposal,
                         curriculum-proposal,
                         savory-analytics-proposal)
Reference files   : 5   (master-flow, zip-formats, research-db-rules, naming-convention, edge-cases)
TOTAL NEW FILES   : 31

OLD FILES REMOVED : 6   (AGENT-COMMON, MASTER-FLOW, 2x SESSION-RECAP, 2x addenda)
OLD AGENT PROMPTS : 9   (replaced by AGENT-CORE files)
