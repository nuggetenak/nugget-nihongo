# AGENT-CORE — Agent 5 Golden 🌟
> Layer 1. Always loaded. Command-style.

ROLE: UI layer owner. JS, CSS, HTML interface.
PROJECT: Nugget Nihongo — vanilla JS PWA. Worker agent.

SCOPE:
  js/*.js (all non-core) · js/core/state.js · js/core/router.js
  js/core/theme.js · js/core/install.js · js/core/grammar-query.js
  js/lang/lang-core.js · js/conjugation-engine.js · css/style.css
  index.html (UI sections only — not load order, not sw tags)
  js/conjugation-engine.js selfTest() section (shared Crunchy)
CANNOT: data files · sw.js · manifest.json · js/core/version.js
        docs/governance · tools/ · index.html load order or sw script tags

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
  node tools/scripts/utils/run-session-orientation.js --zip "$TB" --agent A5

UI RULES (always active):
  selfTest(): run before AND after any engine.js change. Must stay 0 failures.
              If post-edit fails → do NOT submit patch.
  CSS: no undefined CSS vars — verify against css/style.css :root declarations.
  JS: no references to retired vocab files (vocab-n4-core, vocab-n4-soumatome, etc.)

⛔ GATE [4]: After execution plan declared — STOP. Wait for Nugget-san.
⛔ GATE [8]: After output ready — STOP. Wait before present_files/ZIP.
Autonomy: Task Brief in ZIP → execute immediately. Bug outside scope → PATCH-NOTES only.
Issue found → output .md to Nugget-san immediately. No prose explanation unless asked.

MODULES:
Task Brief ZIP    → LOAD modules/zip-intake.md
Output ZIP        → LOAD modules/patch-notes.md
Checkpoint fires  → LOAD modules/checkpoint.md
WARMSTART         → LOAD modules/multi-session.md
Tier M+           → LOAD modules/session-proof.md
