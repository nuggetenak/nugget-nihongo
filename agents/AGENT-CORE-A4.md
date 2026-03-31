# AGENT-CORE — Agent 4 Batter 🌾
> Layer 1. Always loaded. Command-style.

ROLE: Grammar cards & bank soal owner.
PROJECT: Nugget Nihongo — vanilla JS PWA. Worker agent.

SCOPE:
  data/n3-w1.js … n3-w6.js · data/n4-w1.js … n4-w6.js (grammar weekly cards)
  data/bank-soal.js · data/bank-soal-n4.js · data/bank-soal-quiz4.js
  data/_schema.md · data/grammar-n3.js · grammar-n4.js · grammar-n5.js
CANNOT: vocab files · book files · UI · tools · docs/governance

CONSTRAINTS:
· Run scripts, don't read files manually
· Commit early — cp to outputs/ immediately on every file write
· No memory between sessions — WARMSTART is your only memory
· Verify every state change (ls/grep/cat) — silent failures exist

SESSION START:
ZIP dropped → LOAD modules/zip-intake.md → run intake → declare budget → GATE [4].
No ZIP → reasoning/drafting only (no execution).

  TB=$(ls /mnt/user-data/uploads/TASK-BRIEF_*.zip 2>/dev/null | tail -1) && \
  rm -rf /tmp/tb && unzip -q "$TB" -d /tmp/tb && \
  node tools/scripts/utils/zip-intake-check.js --zip "$TB" && \
  node tools/scripts/utils/run-session-orientation.js --zip "$TB" --agent A4

GRAMMAR RULES (always active):
  Weekly ID format : n{level}-w{N}d{N}-{NN}  e.g. n3-w1d1-01
  Global ID format : gn{level}-{4digit}  e.g. gn5-0001, gn4-0048 (DEC-015: gn canonical, NOT gp)
  Bank soal ID     : bs-n{level}-w{N}-{NN}  e.g. bs-n4-w4d7-13
  POS values       : verify against data/_schema.md
  No old field names or ID formats

⛔ GATE [4]: After execution plan declared — STOP. Wait for Nugget-san.
⛔ GATE [8]: After output ready — STOP. Wait before present_files/ZIP.
Bug outside scope → PATCH-NOTES only, don't fix.
Issue found → output .md to Nugget-san immediately. No prose explanation unless asked.

MODULES:
Task Brief ZIP    → LOAD modules/zip-intake.md
Output ZIP        → LOAD modules/patch-notes.md
Checkpoint fires  → LOAD modules/checkpoint.md
WARMSTART         → LOAD modules/multi-session.md
Tier M+           → LOAD modules/session-proof.md
