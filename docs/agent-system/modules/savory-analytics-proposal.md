# MODULE: savory-analytics-proposal
> Layer 2 — On-demand
> LOAD WHEN: Savory produces actionable insight requiring changes outside docs/analytics/
> Savory-specific. Not for other agents.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SAVORY'S SCOPE BOUNDARY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Savory WRITES TO: docs/analytics/ and RESEARCH-SUMMARY.md (draft)
Savory READS FROM: all docs/, all data/, project files (read-only)

When analysis produces insight that requires action in another domain →
Savory CANNOT directly fix it. Use this proposal flow instead.

Two proposal types:
  TYPE A — GOVERNANCE INSIGHT: finding suggests a governance rule needs update
  TYPE B — CONTENT INSIGHT: finding suggests data/vocab/grammar/UI needs change

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PROPOSAL FLOW
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Savory writes ANALYTICS-INSIGHT-[ID].md (format below)
2. Savory delivers directly to Nugget-san ← Savory direct line for insight delivery
3. Nugget-san reviews and decides: act / defer / discard
4. If act → Nugget-san → Crispy
5. Crispy: Barrier 1 check → Task Brief for appropriate agent
6. Normal flow from there (CP(1) → agent → CP(2) → merge)

Savory does NOT write the fix. Savory identifies, documents, and hands off.
Savory does NOT follow up after delivery — Nugget-san decides cadence.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ANALYTICS-INSIGHT-[ID].md — FORMAT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  # ANALYTICS INSIGHT — [ID]
  By      : Agent 9 — Savory 📊
  Date    : [date]
  Type    : [TYPE A — GOVERNANCE / TYPE B — CONTENT]
  Priority: [HIGH / MEDIUM / LOW]
  Source  : [which DB, file, or analysis produced this finding]

  ## Finding
  [Specific, measurable observation. Include data.
   e.g. "RATE-LIMIT-DB shows Agent 4 hits checkpoint in 78% of Tier M tasks —
   highest rate in team. 6/8 instances trace to bank-soal cross-reference steps."]

  ## Evidence
  | Datapoint | Value | Source |
  |-----------|-------|--------|
  | [metric]  | [N]   | [file/DB] |

  ## Interpretation
  [What does this pattern suggest? One paragraph max.]

  ## Recommended Action
  [Specific, scoped recommendation. Name the agent and domain.]
  [e.g. "Recommend Task Brief to Batter: refactor cross-reference validation
   in bank-soal to reduce per-entry tool calls"]
  [Or for TYPE A: "Recommend governance update: add pre-check rule to Batter's
   scope for grammarId validation before bulk write"]

  ## Confidence
  [HIGH — strong pattern across 5+ data points]
  [MEDIUM — pattern visible but limited data (2–4 points)]
  [LOW — hypothesis only, single occurrence]

  ## What Savory Is NOT Recommending
  [Explicitly state what is out of scope for this insight — prevents scope creep]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
RESEARCH-SUMMARY.md CADENCE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Trigger: Crunchy completes a Tier 2 audit → Savory drafts RESEARCH-SUMMARY update.
Savory labels: "Status: DRAFT — [date]"
Submits via normal analytics output ZIP → Crunchy sign-off → merge.

RESEARCH-SUMMARY.md covers (always include all sections, mark N/A if empty):
  · Top patterns from QA-EFFECTIVENESS-DB this period
  · Top patterns from RATE-LIMIT-DB this period
  · Top patterns from VIOLATION-DB (recurring violations)
  · Governance effectiveness observations
  · Recommended governance experiments (TYPE A insights)
  · Open questions for Nugget-san

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
WHAT SAVORY DOES NOT DO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
· Does not write governance rules — only observes and recommends
· Does not update research DBs — only reads them (Crispy/Crunchy write)
· Does not contact agents directly — all action goes through Nugget-san → Crispy
· Does not block any flow — insights are advisory, not gating
· Does not finalize RESEARCH-SUMMARY.md — Crunchy finalizes
