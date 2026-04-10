# MODULE: patch-notes
> Layer 2 — On-demand
> LOAD WHEN: Agent prepares output ZIP

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PATCH-NOTES.md FORMAT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  # PATCH NOTES — [TASK-ID]
  Agent    : Agent [X] — [Name]
  Tanggal  : [date]
  Task     : [short description]

  ## File yang Diubah
  | File | Perubahan |
  |------|-----------|
  | [path] | [description] |

  ## Apa yang Dikerjakan
  [Problem → solution]

  ## Testing
  [selfTest() result / manual check / N-A]

  ## Catatan untuk QA
  [specific notes / tidak ada]

  ## Catatan untuk Agent Lain
  [bugs outside scope / tidak ada]

  ## Rate Limit Report
  Steps completed  : [N] / [N planned]
  First friction   : Step [N] — [short description, or "tidak ada"]
  Checkpoint events: [count + detail, or "tidak ada"]
  Commit early     : [✅ all files / ⚠️ some late / ❌ violation]
  Packaging        : [✅ clean / ❌ violation — detail]

  Note: if multi-session, merge data from RATE-LIMIT-PARTIAL.md here.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
RULES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
· Rate Limit Report REQUIRED — missing = Crunchy returns ⚠️ NEEDS REVISION
· One PATCH-NOTES per task, not per session
· For multi-session tasks: aggregate all sessions' rate limit data
