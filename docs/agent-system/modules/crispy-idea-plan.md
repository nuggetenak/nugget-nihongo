# MODULE: crispy-idea-plan
> Layer 2 — On-demand
> LOAD WHEN: Crispy needs to plan before drafting a Task Brief — especially for
> complex, multi-agent, or governance-touching ideas
> Crispy-specific. Not for other agents.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
WHEN TO USE IDEA-PLAN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Use IDEA-PLAN before Task Brief when:
  · Idea touches 2+ agent domains (multi-agent coordination needed)
  · Idea has unclear scope (Nugget-san's request is high-level)
  · Idea may require sequencing multiple tasks in specific order
  · Governance changes are involved
  · Barrier 1 passed but complexity warrants alignment before committing

Skip IDEA-PLAN (go straight to Task Brief) when:
  · Single agent, single file, clear scope
  · Bug fix with obvious owner and fix
  · Repeat pattern of a task type already done before

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
IDEA-PLAN FLOW
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Crispy writes IDEA-PLAN-[ID].md (format below)
2. Crispy presents to Nugget-san in chat (not a ZIP — discussion document)
3. Nugget-san reviews → approves / requests changes / cancels
4. "approved" → Crispy proceeds to Task Brief(s) → ZIP → Crunchy CP(1)
5. IDEA-PLAN does NOT go to Crunchy — only Task Brief ZIPs go to Crunchy

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
IDEA-PLAN-[ID].md — FORMAT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  # IDEA PLAN — [ID]
  By      : Agent 1 — Crispy 🥐
  Date    : [date]
  Request : [Nugget-san's original request, verbatim or close]

  ## Barrier 1 Result
  [1] Breaking schema: NO / YES — [explanation if YES]
  [2] Multi-domain (>3 agents): NO / YES — [if YES, propose split below]
  [3] Blocked dependency: NO / YES — [if YES, blocked on what]

  ## Proposed Decomposition
  [If multi-agent: list each sub-task with agent, scope, sequence]

  | Task ID | Agent | Scope | Depends on | Est. Tier |
  |---------|-------|-------|------------|-----------|
  | [ID]    | A[N]  | [files] | [ID or —] | [S/M/L]  |

  ## Sequence Rationale
  [Why this order? What can run in parallel? What must be serial?]

  ## Risks & Open Questions
  [What could go wrong? What needs Nugget-san's decision before proceeding?]

  ## What Crispy Will Do Next
  ["On your approval, I will create Task Brief for [agent] first, then [agent]."]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MULTI-TASK SEQUENCING RULES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Serial (must complete before next starts):
  · Task B reads output of Task A → serial
  · Task B modifies files Task A also modifies → serial (avoid merge conflicts)
  · Governance task → always serial (no parallel governance)

Parallel (can run simultaneously — Nugget-san dispatches both):
  · Tasks touch completely different file domains
  · Neither task reads the other's output
  · Note: Crunchy still reviews each separately — parallel work,
    sequential QA passes

DEPENDENCY DECLARATION IN TASK BRIEF:
  When Task B depends on Task A:
  · Task A must be ✅ merged before Task B's Task Brief is dispatched
  · Do NOT dispatch Task B with "pending" dependency — Crunchy will block CP(1)
  · Mark in _MAP.md: Task B status = 🔒 WAITING until Task A = ✅

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
GOVERNANCE TASK SPECIAL RULES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
If IDEA-PLAN touches governance (agent prompts, AGENT-COMMON, MASTER-FLOW):
  · Tag as GOVERNANCE in IDEA-PLAN header
  · Estimate file count: 1–2 files → single Tier M session
    3+ files → mandatory multi-session, plan batch splits in IDEA-PLAN
  · Crunchy is both auditor (CP) AND executor (Crunchy writes governance drafts)
    → Crispy's Task Brief goes to Crunchy, not a worker agent
  · Governance tasks require extra lead time — flag to Nugget-san

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CRISPY'S POST-MERGE IDEA PIPELINE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
After merge, Crispy automatically checks:
  [ ] Any tasks in _MAP.md newly unblocked by this merge?
      → If yes: surface to Nugget-san in post-merge menu
  [ ] Any INC entries in INCONSISTENCY-DB now resolvable?
      → If yes: surface as candidate Task Brief
  [ ] Milestone audit counter: reached Tier 1 threshold?
      → If yes: flag milestone audit to Nugget-san

This check happens in the main menu display — not a separate session.
