# MODULE: checkpoint
> Layer 2 — On-demand
> LOAD WHEN: any checkpoint trigger (T1–T6) fires, or Nugget-san says "CHECKPOINT SEKARANG"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TIER SYSTEM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🟢 S  ≤10 tool calls    → proceed
🟡 M  11–25 tool calls  → proceed, detailed EXECUTION PLAN required
🔴 L  26–40 tool calls  → STOP, break into sub-tasks first
⛔ XL 40+ tool calls    → NEVER accept, re-scope first

SESSION BUDGET format (declare before execution):
  SESSION BUDGET
  Task      : [TASK-ID]
  Tier      : [🟢 S / 🟡 M / 🔴 L / ⛔ XL]
  Est. steps: ~[N] (heavy: step [X], step [Y])
  Governance: [yes/no] — if yes, must be multi-session

  EXECUTION PLAN
  Step 1: [action — file, what] [⚠️ HEAVY if expensive]
  Step N: commit outputs + ZIP ← always last step

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CHECKPOINT TRIGGERS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PRE-SESSION:
  [T1] Tier M/L → flag ⚠️ HEAVY steps in EXECUTION PLAN
  [T2] ≥3 HEAVY steps in one plan → auto-upgrade to Tier L, break first
  [T8] Governance update touching 3+ agent files → mandatory multi-session
  [T9] WARMSTART ZIP received → LOAD modules/multi-session.md before anything

MID-SESSION:
  [T3] After each step → micro-assess: ≥2 heavy steps remain? → CHECKPOINT NOW
  [T4] Scope larger than expected (+30% of original estimate) → CHECKPOINT
  [T5] After each ⚠️ HEAVY step → pause: more heavy steps remain AND >50% into session? → CHECKPOINT
  [T6] ZIP step is always LAST — substantive work after ZIP step = plan is wrong, STOP

EXTERNAL:
  Nugget-san: "CHECKPOINT SEKARANG" → immediately enter checkpoint, no justification needed

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CHECKPOINT EXECUTION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Finish current step only if ≤2 actions remain. Otherwise stop immediately.
2. Verify all completed files are in outputs/ (commit early should handle this).
3. Run: ls outputs/ — confirm all expected files are present.
4. Create CHECKPOINT-[TASK-ID]-v[N].md → cp to outputs/
5. Write 3–5 line chat summary: what's done, what's not, next step.
6. Create WARMSTART-[TASK-ID]-[AGENT].zip → cp to outputs/
7. Show widget to Nugget-san:

  ── Widget ────────────────────────────────────────
  "Pilih WARMSTART kalau kamu tidak yakin 100% dengan step
  berikutnya, atau kalau kamu merasa ada yang mungkin
  terlewat di sesi ini."
  [ WARMSTART ZIP ] atau [ LANJUT ]
  ── End widget ──────────────────────────────────────

  WARMSTART ZIP → session ends. Nugget-san opens new chat.
  LANJUT → continue in SAME chat. Show progress line + ls outputs/ first.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CHECKPOINT FILE FORMAT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ════════════════════════════════════════
  🚀 PASTE INI KE SESI BARU:
  ════════════════════════════════════════
  Kamu adalah Agent [X] [Name], lanjut dari sesi sebelumnya.
  Task: [TASK-ID] — [short description]

  Progress:
  ✅ [completed step]
  ⬜ [not done — START HERE]

  File di outputs/: [list + state]
  Konteks penting: [1-2 sentences]
  Mulai dari: [specific instruction]

  ⚠️ [If multi-session] Task ini multi-session. RATE-LIMIT-PARTIAL.md ada di ZIP ini.
  Saat task selesai, PATCH-NOTES final wajib gabungkan data dari file ini.
  ════════════════════════════════════════

  ## Detail Lengkap
  ### Progress
  ✅ Step 1: [result]
  ⬜ Step 2: [what needs to be done]

  ### File State
  | File | Status | Location | Notes |
  |------|--------|----------|-------|
  | [name] | ✅ | outputs/ | [note] |
  | [name] | ⬜ | — | not created yet |

  ### Additional Context
  [Decisions made, edge cases, non-obvious information]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
WARMSTART ZIP FORMAT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  WARMSTART-[TASK-ID]-[AGENT].zip
  └── warmstart/
      ├── CHECKPOINT-[TASK-ID]-v[N].md
      ├── QUICK-CONTEXT.md
      ├── RATE-LIMIT-PARTIAL.md        ← required if multi-session
      └── files/
          └── [completed files]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PROGRESS LINE — REQUIRED Tier M/L
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Format (in every response during Tier M/L):
  [📊 X/Y step | outputs verified: ls ✅ | next: [next step] | outputs saved: [N files] | ⚠️ [warning if any]]

"outputs verified: ls ✅" = ls outputs/ was run and all expected files confirmed present.
