# MODULE: spicy-proposal
> Layer 2 — On-demand
> LOAD WHEN: Spicy identifies need for a new script or script modification
> Spicy-specific. Not for other agents.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
WHEN TO PROPOSE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Propose when:
  · A scan reveals a recurring class of issue with no existing detection script
  · An existing utils script has a significant gap in coverage
  · Post-merge scan produces false positives that could be fixed with script update
  · Nugget-san asks Spicy to evaluate a specific tooling gap

Do NOT propose when:
  · The need was documented in another agent's PATCH-NOTES — that goes through Crunchy evaluate → Crispy
  · The script already exists under a different name (verify first)
  · The gap can be addressed by a minor parameter change to an existing script

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PROPOSAL FLOW
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Spicy writes SPICY-PROPOSAL-[ID].md (format below)
2. Spicy submits directly to Nugget-san ← Spicy exception to no-direct-contact rule
3. Nugget-san → Crispy
4. Crispy: Barrier 1 check → Task Brief → ZIP
5. Nugget-san → Crunchy: CP(1)
6. Crunchy: evaluate scope, overlap, necessity → DISPATCH CLEARANCE or REJECT
7. Nugget-san → Spicy: Task Brief ZIP with clearance
8. Spicy: builds script → PATCH ZIP
9. Nugget-san → Crunchy: CP(2)
10. Crunchy verdict → Crispy merge

Script does NOT ship at any earlier step. No shortcuts.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SPICY-PROPOSAL-[ID].md — FORMAT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  # SPICY PROPOSAL — [ID]
  By      : Agent 7 — Spicy 🌶️
  Date    : [date]
  Type    : [NEW SCRIPT / MODIFY EXISTING / DEPRECATE]

  ## Problem
  [What scan finding, gap, or recurring issue triggered this proposal?
  Be specific — include finding IDs from audit-report.json if applicable]

  ## Proposed Script
  Name    : [proposed filename, e.g. check-see-also-refs.js]
  Location: [tools/scripts/spicy/ OR tools/scripts/utils/]
  Purpose : [one sentence — what it scans/validates/produces]

  ## Why Needed
  [Why can't this be handled by an existing script?
  Reference which scripts you checked — prove no overlap]

  ## Existing Scripts Checked for Overlap
  | Script | Why it doesn't cover this | Verified |
  |--------|--------------------------|---------|
  | [name] | [reason] | ✅ |

  ## Scope
  [What files/directories does this script touch?]
  [Input: what does it read?]
  [Output: what does it produce? Format?]
  [Est. execution time]

  ## Integration Point
  [Where in the scan workflow does this run?]
  [Which scan modes should include it: FULL / TARGETED / SCHEMA / LINKS]
  [Does it replace or supplement an existing script?]

  ## Risks
  [False positive risk? Performance impact? Schema dependency? Or "none identified"]

  ## Success Criteria
  [How will Crunchy verify this script works correctly in CP(2)?]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CRUNCHY EVALUATION CRITERIA (CP(1))
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Crunchy evaluates Spicy proposals on:
  [ ] Is the problem real and recurring (not one-off)?
  [ ] No overlap with existing scripts — proof provided
  [ ] Scope is clear and bounded
  [ ] Output format is defined
  [ ] Integration point is specified
  [ ] Success criteria are verifiable

APPROVE → Crunchy flags to Crispy in QA-VERDICT section "Script Request":
  "Script Request APPROVED — [ID]: [script name]. Dispatch to Spicy."

REJECT → Crunchy writes reason. Spicy cannot bypass.
  Common reject reasons: overlap not disproven, scope too broad,
  problem is one-off (not systematic), output format undefined.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MODIFY EXISTING SCRIPT — SPECIAL CASE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
If proposing to modify an existing script (not create new):
  · Include current script behavior description
  · Describe exact change (add param / fix logic / extend output)
  · Confirm backward compatibility: does change break existing scan consumers?
    (Crunchy uses audit-report.json field names — if fields change → breaking change)
  · If breaking change: flag explicitly, propose migration path

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DEPRECATION — SPECIAL CASE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
If proposing to deprecate a script:
  · Confirm no other script or workflow depends on it
  · Check: is it referenced in SCRIPT-MANIFEST templates or Crunchy audit checklists?
  · Deprecation = move to tools/scripts/deprecated/ (do not delete)
  · Update SCRIPT-MANIFEST.md template to remove from default run list
