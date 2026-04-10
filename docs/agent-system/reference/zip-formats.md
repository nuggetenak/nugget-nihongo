# REFERENCE: zip-formats
> Layer 3 — Load on demand.
> LOAD WHEN: building or verifying any ZIP structure.
> Single source of truth for all ZIP formats in the system.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ZIP 1 — TASK BRIEF (Crispy → Agent via Crunchy)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name: TASK-BRIEF_[taskID].zip

Before Crunchy CP(1):
  └── task-brief/
      ├── TASK-BRIEF.md
      ├── QUICK-CONTEXT.md
      ├── DISPATCH-MANIFEST.md
      └── files/
          └── [reference files]

After Crunchy CP(1) — this is the version dispatched to agent:
  └── task-brief/
      ├── TASK-BRIEF.md
      ├── QUICK-CONTEXT.md
      ├── DISPATCH-MANIFEST.md
      ├── DISPATCH-CLEARANCE.md    ← added by Crunchy
      └── files/

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ZIP 2 — PATCH (Agent → Crunchy)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name: PATCH_A[N]-[taskID]-v[N].zip

  └── patch/
      ├── PATCH-NOTES.md           ← required, includes Rate Limit Report
      ├── SESSION-PROOF.md         ← required
      ├── DISPATCH-CLEARANCE.md    ← required (copy from Task Brief ZIP)
      └── [modified files]

Rules:
  · DISPATCH-CLEARANCE.md must be present — agent copies from their Task Brief ZIP
  · SESSION-PROOF.md required every time — Tier S lightweight, Tier M+ full
  · Rate Limit Report section in PATCH-NOTES is mandatory
  · v[N] suffix: v1 = first submission, v2 = revision (only one allowed)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ZIP 3 — FOR-INTEGRATOR (Crunchy → Crispy)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name: FOR-INTEGRATOR_[taskID].zip

  └── for-integrator-crunchy/          ← ROOT MUST BE THIS EXACT FOLDER NAME
      ├── README-BUKA-INI-DULU.md
      ├── QA-VERDICT.md
      ├── patch/
      │   └── [files from agent's PATCH ZIP]
      └── archive/
          ├── operational/
          │   ├── qa-verdicts/
          │   │   └── QA-VERDICT-[TASK-ID].md
          │   ├── patch-notes/
          │   │   └── PATCH-NOTES-[TASK-ID].md
          │   ├── session-proofs/
          │   │   └── SESSION-PROOF-[TASK-ID].md
          │   └── dispatch-clearances/
          │       └── DISPATCH-CLEARANCE-[TASK-ID].md
          └── governance/              ← only if governance files updated this task
              └── [governance-file].md

Anti-bypass checks (Crispy runs before accepting):
  · Root folder must be: for-integrator-crunchy/
  · QA-VERDICT.md must be present
  · QA-VERDICT.md must contain: "Issued-by: Agent 6 Crunchy 🦷"
  · archive/ must be present and populated

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ZIP 4 — WARMSTART (Any agent mid-task)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name: WARMSTART-[taskID]-A[N].zip

  └── warmstart/
      ├── CHECKPOINT-[TASK-ID]-v[N].md  ← contains paste-to-new-session block
      ├── QUICK-CONTEXT.md
      ├── RATE-LIMIT-PARTIAL.md         ← required for multi-session tasks
      └── files/
          └── [completed output files so far]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ZIP 5 — SPICY SCAN OUTPUT (Spicy → Crunchy)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name: SPICY-SCAN_[taskID]-post.zip

  └── (no root subfolder — files at root of ZIP)
      ├── SPICY-SUMMARY.md           ← human-readable, max 1 page
      ├── audit-report.json          ← full structured findings
      ├── SCRIPT-MANIFEST.md         ← audit trail
      └── scan-outputs/
          └── [raw script outputs]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ZIP 6 — CURRICULUM PROPOSAL (Fluffy → Crispy)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name: CURRICULUM-PROPOSAL_[ID].zip

  └── (no root subfolder)
      ├── CURRICULUM-PROPOSAL.md     ← 9 sections
      ├── PATCH-NOTES.md
      └── [FLUFFY-CRUNCHY-DISPUTE-[ID].md — only if dispute active]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ZIP 7 — TOOLS KIT (Crispy → Crunchy, standalone governance sessions)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name: TOOLS-A6-v[N].zip

  └── (no root subfolder)
      ├── TOOLS-MANIFEST.md          ← list of tools + compatibility notes
      └── tools/
          └── scripts/
              └── utils/
                  └── [util scripts]

Crunchy: after extract, always read TOOLS-MANIFEST.md first to verify compatibility.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ZIP 8 — MAIN PROJECT (Nugget-san → Senior Agents)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name: nugget-nihongo_v[X]_[Y]_[Z].zip

  └── [project root — may be nested one level deep]
      ├── data/
      ├── js/
      ├── css/
      ├── docs/
      ├── tools/
      │   └── scripts/
      │       ├── utils/
      │       └── spicy/
      ├── index.html
      ├── sw.js
      ├── _MAP.md
      └── version.js

Nested ZIP note: project root may extract to /tmp/p/p/ instead of /tmp/p/.
All orientation sequences use `find` to auto-detect root — do not hardcode path.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ZIP NAMING QUICK REFERENCE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
| ZIP | Creator | Consumer |
|-----|---------|----------|
| nugget-nihongo_*.zip | Nugget-san | A1, A6, A7, A8, A9 |
| TASK-BRIEF_[id].zip | Crispy | Crunchy (CP1) → Agent |
| PATCH_A[N]-[id]-v[N].zip | Agent A2–A9 | Crunchy (CP2) |
| FOR-INTEGRATOR_[id].zip | Crunchy | Crispy |
| WARMSTART-[id]-A[N].zip | Any agent | Same agent (next session) |
| SPICY-SCAN_[id]-post.zip | Spicy | Crunchy |
| CURRICULUM-PROPOSAL_[id].zip | Fluffy | Crispy |
| TOOLS-A6-v[N].zip | Crispy | Crunchy |
