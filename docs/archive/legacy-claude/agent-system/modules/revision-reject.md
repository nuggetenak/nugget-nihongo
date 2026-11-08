# MODULE: revision-reject
> Layer 2 — On-demand
> LOAD WHEN: Crunchy issues ⚠️ NEEDS REVISION or ❌ REJECTED verdict
> Also load when Crispy receives REVISION from Crunchy on a Task Brief (CP(1) fail)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
REVISION LIMIT — UNIVERSAL HARD RULE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
· Maximum 1 revision per patch, per CP(1) or CP(2).
· Round 2 fails → AUTOMATIC REJECT. No exceptions. No mercy.
· After REJECT: new Task Brief required → CP(1) → agent → CP(2). Full cycle.
· Revision notification MUST include: "Ini satu-satunya kesempatan revisi."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CP(2) REVISION — FORMAT (Crunchy → Agent via Nugget-san)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ---
  ⚠️ NEEDS REVISION — [TASK-ID]
  From    : Agent 6 — Crunchy 🦷
  To      : Agent [X] — [Name]
  Round   : 1 of 1 — MAXIMUM. Round 2 fail = automatic ❌ REJECTED.
  Deadline: [date, or "next session"]

  ## Required Fixes
  [ ] [Issue 1] — [file] — [exact what to change]
      Evidence: [what Crunchy found]
      Fix: [specific instruction — not "check it", but "change field X to Y"]
  [ ] [Issue 2] — [file] — [exact what to change]
      Evidence: [what Crunchy found]
      Fix: [specific instruction]

  ## Do NOT Change
  [List items that passed — agent should not re-touch these]
  [Or: "All other items passed — touch only the Required Fixes above"]

  ## Resubmission
  · Resubmit same PATCH ZIP format with "-v2" suffix
  · PATCH-NOTES must note: "Revision round 1 — addressing Crunchy findings: [list]"
  · No new features in revision — fix listed items only

  Issued-by: Agent 6 Crunchy 🦷
  ---

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CP(2) REJECT — FORMAT (Crunchy → Crispy via Nugget-san)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Triggers:
  · Round 2 revision also fails (auto-reject)
  · First submission has fundamental scope violation or anti-bypass violation
  · Agent submitted without DISPATCH-CLEARANCE.md (not revision — immediate reject)

  ---
  ❌ REJECTED — [TASK-ID]
  From    : Agent 6 — Crunchy 🦷
  Reason  : [AUTO-REJECT: Round 2 failed / SCOPE VIOLATION / ANTI-BYPASS VIOLATION / other]

  ## Rejection Grounds
  [Specific findings that led to rejection — numbered list]

  ## What Cannot Be Salvaged
  [Which parts of the patch are irrecoverable — need fresh approach]

  ## What Can Be Reused
  [If any valid work exists that a new Task Brief could reference — or "none"]

  ## Required for New Task Brief
  [What Crispy must include/change in new Task Brief to avoid same failure]

  Next step: Crispy creates new Task Brief → CP(1) → agent → CP(2).
  No bypass. No partial credit applied from this rejected patch.

  Issued-by: Agent 6 Crunchy 🦷
  ---

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CP(1) REVISION — FORMAT (Crunchy → Crispy)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ---
  ⚠️ REVISE BRIEF — [TASK-ID]
  From    : Agent 6 — Crunchy 🦷
  To      : Agent 1 — Crispy
  Round   : 1 of 1 — MAXIMUM.

  ## Required Changes to Task Brief
  [ ] [Issue] — [exact change needed in TASK-BRIEF.md or DISPATCH-MANIFEST.md]
  [ ] [Issue] — [exact change]

  ## Resubmission
  · Resubmit revised TASK-BRIEF_[taskID]-v2.zip
  · DISPATCH-MANIFEST.md must reflect any added/removed files

  Issued-by: Agent 6 Crunchy 🦷
  ---

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CP(1) BLOCK — FORMAT (Crunchy → Crispy)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Use when Task Brief has a fundamental problem (wrong agent, missing dependency,
breaking schema change not flagged). Not a revision — requires fresh brief.

  ---
  ❌ BLOCKED — [TASK-ID]
  From    : Agent 6 — Crunchy 🦷
  Reason  : [WRONG AGENT / UNRESOLVED DEPENDENCY / BREAKING SCHEMA / other]

  ## Blocking Issue
  [Specific problem — why this cannot be a revision]

  ## Required Before Resubmission
  [What must be resolved first: dependency task, schema discussion, agent reassignment]

  Not a revision. New Task Brief required after blocking issue is resolved.
  Issued-by: Agent 6 Crunchy 🦷
  ---

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
AUTO-REJECT DECISION TREE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Crunchy receives PATCH ZIP →

Is this Round 1 or Round 2?
  Round 1 → normal audit → APPROVED / REVISION / REJECTED (for severe violations)
  Round 2 → if any finding → AUTO REJECT. Do not issue another revision.

Is this Round 2 but the patch also adds new scope?
  → AUTO REJECT + flag: "Round 2 submission introduced new changes outside revision scope.
    New Task Brief required."

Did agent submit without DISPATCH-CLEARANCE.md?
  → IMMEDIATE REJECT (not REVISION). This is anti-bypass violation.
    Flag in VIOLATION-DB as new entry. Notify Crispy in verdict.

Did the patch touch files outside agent's scope?
  → IMMEDIATE REJECT. Scope violation = no revision chance.
    Crispy must create new Task Brief scoped correctly.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
REVISION TRACKING IN _MAP.md
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Crispy seeds to VIOLATION-DB on any REJECT:
  · Task ID, agent, reason, date
  · "Fix Effective" column left blank — Crunchy fills when pattern resolved

Round counter is NOT formally tracked in _MAP.md — it's implicit in the
patch version suffix (v1 = Round 1, v2 = Round 2, v2 fail = auto-reject).
Crunchy checks suffix before auditing to know which round.
