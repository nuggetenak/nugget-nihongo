# MODULE: zip-intake
> Layer 2 — On-demand
> LOAD WHEN: Worker agents (A2–A9) receive a Task Brief ZIP
> NOT for Crunchy. Crunchy uses audit-system.md instead.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ZIP INTAKE CHECK — RUN BEFORE ANYTHING ELSE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Order: ZIP Intake Check → Session State Brief → Session Budget → Gate [4]

  [✅/❌] DISPATCH-CLEARANCE.md present in ZIP
         → If absent: STOP.
           Notify Nugget-san: "ZIP INTAKE FAILED — [TASK-ID].
           Tidak ada DISPATCH-CLEARANCE.md. Kembalikan ke Crunchy."

  [✅/❌] DISPATCH-CLEARANCE.md status = "✅ CLEARED FOR DISPATCH"
         → If missing: STOP. Same notification as above.

  [✅/❌] DISPATCH-MANIFEST.md present in ZIP

  [✅/❌] All files listed in DISPATCH-MANIFEST "Files dalam ZIP ini" table
         physically present in ZIP
         → If any missing: STOP.
           Notify: "ZIP INTAKE FAILED — [TASK-ID].
           File [X] tercantum di manifest tapi tidak ada di ZIP.
           Kembalikan ke Crispy."

  [✅/❌] Task objectives in TASK-BRIEF.md are clear and unambiguous

All ✅ → continue to Session State Brief.
Any ❌ → STOP, notify Nugget-san, do not start work.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ANTI-BYPASS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DISPATCH-CLEARANCE.md not issued by Crunchy = REJECTED AUTOMATICALLY.
Equivalent rule to QA-VERDICT.md anti-bypass.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SESSION STATE BRIEF FORMAT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Display after ZIP Intake Check, before Session Budget.

  ┌─────────────────────────────────────────────────┐
  │ SESSION STATE BRIEF — Agent [X] [Name]          │
  ├─────────────────────────────────────────────────┤
  │ Versi project aktif   : [from orientation]      │
  │ Versi QUICK-CONTEXT   : [v-N, date]             │
  │ Versi AGENT-COMMON    : [v-N]                   │
  │ Scope / files held    : [agent's scope list]    │
  │ Last patch received   : [task ID + version]     │
  │ This session's task   : [task ID]               │
  │ Open bugs in domain   : [list / tidak ada]      │
  │ Active dependencies   : [task ID / tidak ada]   │
  │ File status           : [DRAFT/APPROVED/MERGED] │
  └─────────────────────────────────────────────────┘
  ⚠️ MISMATCH FLAG: [list mismatches, or "tidak ada"]

MISMATCH FLAG required when:
  · AGENT-COMMON version in PK ≠ version mentioned in QUICK-CONTEXT
  · Project version differs between QUICK-CONTEXT and version.js
  · Task ID not found in _MAP.md
  · Dependency not ✅ but task is ready to proceed

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
AGENT AUTONOMY RULES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
· Task Brief in ZIP? → Work immediately. Do NOT ask Nugget-san.
· Done? → Export ZIP per standard format, write brief chat notification.
· Questions for Crispy only: ambiguity not resolvable from Task Brief + reference files.
· Never ask Nugget-san directly during task execution.
· Scope creep → document in PATCH-NOTES "Catatan untuk Agent Lain" → submit normally.
