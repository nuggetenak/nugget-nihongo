# MODULE: verdict-format
> Layer 2 — On-demand
> LOAD WHEN: Crunchy prepares QA verdict and FOR-INTEGRATOR ZIP

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
QA VERDICT FORMAT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
---
AGENT 6 QA VERDICT
Patch      : [file name / task ID]
Dari       : Agent [X] — [name]
Status     : ✅ APPROVED / ⚠️ NEEDS REVISION / ❌ REJECTED
Dep. Flag  : 🟢 ISOLATED / 🟡 LINKED / 🔴 BLOCKED
Issued-by  : Agent 6 Crunchy 🦷
Temuan     : [list of issues or "tidak ada"]
Test       : selfTest() [PASS/FAIL/N-A], manual check [PASS/FAIL]
Spicy Scan : [TERSEDIA — [taskID] / TIDAK TERSEDIA]
Catatan    : [notes for Crispy]

INCONSISTENCY LOG
| ID      | File    | Deskripsi        | Status                          |
|---------|---------|------------------|---------------------------------|
| INC-[N] | [name]  | [description]    | [NEW / CARRY-OVER / RESOLVED]   |

False Positives : [items or "tidak ada"]
---

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FOR-INTEGRATOR ZIP STRUCTURE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  FOR-INTEGRATOR_[taskID].zip
  └── for-integrator-crunchy/
      ├── README-BUKA-INI-DULU.md
      ├── QA-VERDICT.md
      ├── patch/
      └── archive/                          ← MANDATORY (TASK-INTEL-P0A)
          ├── operational/
          │   ├── qa-verdicts/QA-VERDICT-[TASK-ID].md
          │   ├── patch-notes/PATCH-NOTES-[TASK-ID].md
          │   ├── session-proofs/SESSION-PROOF-[TASK-ID].md
          │   └── dispatch-clearances/DISPATCH-CLEARANCE-[TASK-ID].md
          └── governance/                   ← only if governance update

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STAGING DIRECTORY — ALWAYS USE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Before packaging:
  rm -rf /tmp/for-integrator-crunchy/
  mkdir -p /tmp/for-integrator-crunchy/patch/
  mkdir -p /tmp/for-integrator-crunchy/archive/operational/qa-verdicts/
  mkdir -p /tmp/for-integrator-crunchy/archive/operational/patch-notes/
  mkdir -p /tmp/for-integrator-crunchy/archive/operational/session-proofs/
  mkdir -p /tmp/for-integrator-crunchy/archive/operational/dispatch-clearances/
  # governance only if needed:
  # mkdir -p /tmp/for-integrator-crunchy/archive/governance/

After packaging:
  cp QA-VERDICT.md /tmp/for-integrator-crunchy/archive/operational/qa-verdicts/QA-VERDICT-[TASK-ID].md
  cp patch/PATCH-NOTES.md /tmp/for-integrator-crunchy/archive/operational/patch-notes/PATCH-NOTES-[TASK-ID].md
  cp patch/SESSION-PROOF.md /tmp/for-integrator-crunchy/archive/operational/session-proofs/SESSION-PROOF-[TASK-ID].md
  cp DISPATCH-CLEARANCE.md /tmp/for-integrator-crunchy/archive/operational/dispatch-clearances/DISPATCH-CLEARANCE-[TASK-ID].md

DISPATCH-CLEARANCE.md source: from patch ZIP submitted by agent (agent must include it).

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
README-BUKA-INI-DULU.md — REQUIRED CONTENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Must contain:
  · Files to merge + source
  · _MAP.md update: task ID + date format
  · Version to bump
  · Dependency reminder if Dep. Flag 🟡 or 🔴
  · Section "Archive ke:" (MANDATORY — must not be empty)
  · What NOT to do

Section "Archive ke:" format:
  ## Archive ke
  `docs/operational/qa-verdicts/` — QA-VERDICT-[TASK-ID].md
  `docs/operational/patch-notes/` — PATCH-NOTES-[TASK-ID].md
  `docs/operational/session-proofs/` — SESSION-PROOF-[TASK-ID].md
  `docs/operational/dispatch-clearances/` — DISPATCH-CLEARANCE-[TASK-ID].md
  [+ governance files if applicable, path: docs/governance/]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PRE-ZIP CHECKLIST — RUN BEFORE EVERY PRESENT_FILES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 1 — Verify ZIP structure:
  unzip -l [zip-name]
  [ ] Root folder = for-integrator-crunchy/
  [ ] Contains: README-BUKA-INI-DULU.md, QA-VERDICT.md, patch/
  [ ] Contains: archive/operational/qa-verdicts/
  [ ] Contains: archive/operational/patch-notes/
  [ ] Contains: archive/operational/session-proofs/
  [ ] Contains: archive/operational/dispatch-clearances/
  [ ] Archive files match task ID being QA'd

STEP 2 — Verify execution claims in QA-VERDICT:
  [ ] Run actual grep, show output as proof

STEP 3 — Anti-bypass self-QA:
  [ ] [0-A] QA-VERDICT.md present, Issued-by = Agent 6 Crunchy 🦷
  [ ] [2-A] Root folder = for-integrator-crunchy/
  [ ] [2-C] "Issued-by" field present in verdict
