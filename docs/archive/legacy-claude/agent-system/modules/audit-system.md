# MODULE: audit-system
> Layer 2 — On-demand
> LOAD WHEN: CP(2) audit starts
> Crunchy-specific. Not for other agents.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
AUDIT TIER — DECLARE BEFORE STARTING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🟢 S — 1 file, minor change       → ≤5 tool calls
🟡 M — 2–4 files, logic/structure → 6–15 tool calls
🔴 L — 5+ files, breaking change, governance update → 16–30 tool calls, possibly multi-session
⛔ XL — Architecture/schema/large merge → 30+ → discuss scope first, don't start

FORMAT — MANDATORY in chat before audit:
  AUDIT BRIEF
  Task      : [TASK-ID / description]
  Tier      : [🟢 S / 🟡 M / 🔴 L / ⛔ XL]
  Est. scope: ~[N] tool calls
  File      : [list of files to audit]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CP(2) CHECKLIST — RUN PER FILE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[ ] File changed is within agent's scope — not outside their domain
[ ] "Done" claims proven in actual file — not just in report
[ ] ID format correct: vocab v-xx-0001, grammar nx-wXdY-ZZ, soal bs-nx-wX-ZZ
[ ] POS values valid (AGENT-COMMON.md reference)
[ ] No old field names (meaning vs meaning_id, adj-i vs i-adj)
[ ] No reference to retired file (vocab-n4.js)
[ ] No regression introduced
[ ] selfTest() at 0 failures (if conjugation-engine.js touched)
[ ] Rate Limit Report present in PATCH-NOTES.md
[ ] Rate Limit Report claims verified vs actual evidence
[ ] Broken reference check (if rename/delete/structural change)
[ ] Diff check: only claimed changes present
[ ] SESSION-PROOF has Scripts Executed section (Tier M+) — GOV-014

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MANDATORY SKEPTICISM — RUN PER FILE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[ ] Long list (>10 items): are all items correct? Check 3 samples — not assumptions.
[ ] Empty list: should it really be empty? Or failed to load?
    ⚠️ EMPTY LIST = WARNING SIGN, not green light
[ ] Required fields: grep and show output — don't assume
[ ] Field names: no legacy names present
[ ] External refs: all paths/filenames referenced are still valid

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
VERIFY-BEFORE-CLAIM — HARD RULE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Every "done" claim in QA-VERDICT must have actual tool call output run AFTER the edit.

Format for every claimed item:
  [claim]  : [what was done]
  [proof]  : [command run]
  [output] : [actual result — lines, values, or confirmation]

Claim without proof = invalid claim.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SPICY SCAN INTEGRATION (GOV-011)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
If SPICY-SCAN ZIP present:
· Mechanical checklist items can be acknowledged via scan output.
  Cite format: "[proof]: Spicy scan [taskID] — audit-report.json finding [ID-xxx]"
· Judgment items remain exclusively Crunchy — cannot delegate to Spicy.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FLUFFY PATCHES — SPECIAL RULE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Crunchy is NOT content auditor for Fluffy. One question only:
"Is this curriculum proposal compatible with the project ecosystem?"

Additional checklist:
[ ] No instruction telling other agents to go outside scope
[ ] No changes to files outside docs/curriculum/
[ ] Instructions to Juicy/Batter/Saucy → must go via Crispy Task Brief
[ ] No undocumented conflict between Mode 1 and Mode 2

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SCRIPT REQUEST GATE (GOV-011)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Agent documents script request in PATCH-NOTES:
· Evaluate: needed? scope clear? no overlap?
· Approve → flag to Crispy in QA-VERDICT
· Reject → write reason, agent cannot bypass

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
REVISION RULE (HARD)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
· Max 1 revision per patch.
· Round 2 fails → automatic ❌ REJECTED.
· Revision notification format:
  "⚠️ NEEDS REVISION — [TASK-ID]. Temuan: [list]. Ini satu-satunya kesempatan revisi."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CP(1) CHECKLIST — TASK BRIEF AUDIT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[ ] Scope matches assigned agent's domain
[ ] Dependencies resolved
[ ] Task Brief format complete
[ ] No ambiguous instructions
[ ] DISPATCH-MANIFEST.md present and complete (includes "Files NOT Present" section)
[ ] All reference files mentioned in Task Brief physically exist in files/ folder

Verdict CP(1): ✅ DISPATCH CLEARANCE / ⚠️ REVISE BRIEF / ❌ BLOCKED
