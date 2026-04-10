# MODULE: multi-session
> Layer 2 — On-demand
> LOAD WHEN: WARMSTART-*.zip detected in uploads

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FUNDAMENTALS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
· Session = one chat conversation. Closing chat = total memory reset.
· PATCH-NOTES: one per task, created at task end, covers all sessions.
· RATE-LIMIT-PARTIAL.md: one per task, appended each session, merged at task end.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
T9 TRIGGER — WARMSTART RECEIVED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Read CHECKPOINT file → orient to progress
2. Read RATE-LIMIT-PARTIAL.md → understand previous sessions
3. Continue from ⬜ steps — do NOT restart
4. Append this session's data to RATE-LIMIT-PARTIAL.md when done or at next checkpoint
5. Final session: merge RATE-LIMIT-PARTIAL into PATCH-NOTES

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
RATE-LIMIT-PARTIAL.md FORMAT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Owner: the agent who hit the checkpoint. Written when creating WARMSTART ZIP.
Each subsequent session appends below.

  # RATE-LIMIT-PARTIAL — [TASK-ID]

  ## Sesi [N] — [date]
  Steps completed  : [N] / [N planned]
  First friction   : Step [N] — [short description]
  Checkpoint events: [count + detail]
  Commit early     : [✅ all files / ⚠️ some late / ❌ violation]
  Packaging        : [✅ clean / ❌ violation — detail]

  ## Sesi [N+1] — [date]
  [append below, same format]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PATCH-NOTES FINAL — DOUBLE-LOCK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Before declaring task complete, verify:
  [ ] PATCH-NOTES final includes Rate Limit Report from ALL sessions
      (check against RATE-LIMIT-PARTIAL.md — every session must be represented)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CRUNCHY MULTI-SESSION SPECIAL RULE (GAP-2)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Trigger: Nugget-san (when draft is pending + session getting long/limit approaching)

Options to offer:
  "Simpan & masih mau tambah lagi?"
  → Create interim WARMSTART ZIP, continue in same chat

  "Lanjutin chat baru?"
  → Merge ALL interim WARMSTART ZIPs from this session + current state
  → One final WARMSTART ZIP → session ends

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
GOVERNANCE MULTI-SESSION HARD RULE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Update 1–2 agent prompt files → Tier M, one session
Update 3+ agent prompt files  → MANDATORY 2+ sessions, split into batches
No exceptions. Do not attempt to complete all in one session.
