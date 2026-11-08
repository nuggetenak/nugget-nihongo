# REFERENCE: master-flow
> Layer 3 — Load on demand only.
> LOAD WHEN: Nugget-san asks about flow, or CP(1) review context needed.
> For full exception paths and format specs, this IS the reference.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HAPPY PATH (10 steps)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[1] Nugget-san → Crispy     : idea / task
[2] Crispy → Nugget-san     : Task Brief ZIP (+ DISPATCH-MANIFEST.md)
[3] Nugget-san → Crunchy    : CP(1) pre-dispatch audit
[4] Crunchy → Nugget-san    : DISPATCH-CLEARANCE.md added to ZIP
[5] Nugget-san → Agent      : Task Brief ZIP with clearance
[6] Agent → Nugget-san      : completed PATCH ZIP
[7] Nugget-san → Crunchy    : CP(2) QA audit
[8] Crunchy → Nugget-san    : QA VERDICT APPROVED + FOR-INTEGRATOR ZIP
[9] Nugget-san → Crispy     : FOR-INTEGRATOR ZIP for merge
[10] Crispy                 : merge → _MAP.md → version bump → main menu

Post-merge (non-blocking):
[11] Nugget-san → Spicy     : merged ZIP for post-merge scan
[12] Spicy → Nugget-san     : SPICY-SCAN ZIP
[13] Nugget-san → Crunchy   : acknowledge findings

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
EXCEPTION 2a — CP(1) FAILS (Task Brief)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
REVISION: Crunchy → checklist → Nugget-san → Crispy fixes → re-submit to Crunchy
  Round 2 fails → auto-upgrade to REJECT
REJECT:   Crispy creates new Task Brief → back to step [2] → CP(1) again (no shortcut)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
EXCEPTION 2b — CP(2) FAILS (Agent Work)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
REVISION: Crunchy → checklist → Nugget-san → Agent fixes → re-submit to Crunchy
  Round 2 fails → auto-upgrade to REJECT
REJECT:   Crispy creates new Task Brief → CP(1) → Agent → CP(2) (no shortcut)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
EXCEPTION 2c — Revision Requests from Agent
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Case 1 — Missing file in ZIP:
  Agent → Nugget-san: "ZIP INTAKE FAILED — file [X] missing"
  Nugget-san → Crunchy → Crispy → file in small ZIP → Crunchy cross-check → Agent
  (Crispy CP(1) miss — Crunchy flags in audit log)

Case 2 — Agent finds bug in other domain:
  Agent documents in PATCH-NOTES "Catatan untuk Agent Lain"
  Agent submits normal. Crunchy forwards to Nugget-san in verdict.
  Nugget-san → Crispy → new Task Brief for affected agent.

Case 3 — Agent needs guidance / unsatisfied with result:
  Agent documents in PATCH-NOTES "Catatan untuk QA"
  Agent submits normal. Crunchy writes question in verdict if needed.
  Nugget-san decides next step.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
EXCEPTION 2d — Script Request from Agent
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Document in PATCH-NOTES → Crunchy evaluates →
Approve: flag to Crispy in verdict → Crispy → Task Brief for Spicy → CP(1) → CP(2) → merge
Reject: Crunchy writes reason, agent cannot bypass

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
EXCEPTION 2e — Fluffy Issue Flow
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Fluffy ↔ Nugget-san discuss → Nugget-san approves →
Fluffy issues Curriculum Proposal ZIP → Nugget-san → Crispy →
Task Brief → CP(1) → assigned agent → CP(2) → merge

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ABSOLUTE PROHIBITIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
· No agent bypasses flow for any reason
· Crispy never dispatches without DISPATCH-CLEARANCE from Crunchy
· Crispy never creates DISPATCH-CLEARANCE.md — Crunchy only
· A2–A9 never start work without DISPATCH-CLEARANCE.md in ZIP
· Every re-dispatch (after REJECT) goes through CP(1) — no shortcuts
· PATCH-NOTES.md is the ONLY channel from agents to Crunchy
· Nugget-san is the ONLY courier between agents — never changes
· Spicy never makes verdicts — findings = data only
· Script requests to tools/ always go through full flow
