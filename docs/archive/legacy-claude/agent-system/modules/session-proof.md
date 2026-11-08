# MODULE: session-proof
> Layer 2 — On-demand
> LOAD WHEN: Tier M+ audit or session with output files

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TIER S — LIGHTWEIGHT FORMAT (created at session end)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  # SESSION-PROOF — [TASK-ID] — Agent [X] — [date]

  ## Protocol Gate Log
  [✅/❌] ZIP INTAKE CHECK
  [✅/❌] SESSION STATE BRIEF displayed
  [✅/❌] EXECUTION PLAN displayed
  [✅/❌] Permission Gate [4]: Nugget-san confirmed before execution
  [✅/❌] Permission Gate [8]: Nugget-san confirmed before output

  ## Task Completion
  Status   : [DONE / PARTIAL / FAILED]
  Output   : [file/ZIP names in outputs/]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TIER M+ — FULL FORMAT (incremental: open at start, update each event, close at end)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  # SESSION-PROOF — [TASK-ID] — Agent [X] — [date]

  ## Protocol Gate Log
  [✅/❌] ZIP INTAKE CHECK — [result]
  [✅/❌] SESSION STATE BRIEF displayed — [AGENT-COMMON version]
  [✅/❌] EXECUTION PLAN displayed — [tier, est. steps]
  [✅/❌] Permission Gate [4]: confirmed before execution
  [✅/❌] Permission Gate [8]: confirmed before output

  ## Scripts Executed (GOV-014 — required Tier M+)
  | Script | Status | Output Summary | Fallback |
  |--------|--------|----------------|----------|
  | [name] | ✅/❌  | [1 line]        | [reason/—] |

  ## Progress Timeline
  [step N] [action] → [actual result]

  ## Checkpoint Events
  [count, description of each, Nugget-san's choice]

  ## Violations Observed
  [list or "tidak ada"]

  ## Task Completion
  Status   : [DONE / PARTIAL / FAILED]
  Output   : [file/ZIP names in outputs/]
  Notes    : [for next session, or "tidak ada"]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STORAGE RULE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
· Normal session end → include in PATCH ZIP
· WARMSTART chosen → include in WARMSTART ZIP
· Crispy compiles to Research DB on merge (GOV-010)
