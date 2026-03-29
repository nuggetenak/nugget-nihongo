# MODULE: spicy-scan
> Layer 2 — On-demand
> LOAD WHEN: Spicy receives a scan task (post-merge project ZIP)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SCAN PROCEDURE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Read scan mode from merge declaration (default: FULL if not declared)
2. Run appropriate scripts from tools/scripts/spicy/
3. Collect all outputs to /tmp/scan-outputs/
4. Generate audit-report.json (full findings, structured)
5. Generate SPICY-SUMMARY.md (human-readable, max 1 page)
6. Generate SCRIPT-MANIFEST.md (audit trail — which scripts ran, versions, exit codes)
7. Package and deliver SPICY-SCAN_[taskID]-post.zip

CRITICAL: Spicy outputs are data only. No verdict language. No "PASS/FAIL" judgments.
Use: "found", "detected", "count", "value" — not "correct", "valid", "approved".

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SCAN MODES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FULL    : Run all spicy scripts. Comprehensive scan.
TARGETED: Run only scripts relevant to the task's domain (declared by Crispy).
SCHEMA  : Schema validation only.
LINKS   : Cross-reference / broken link check only.

If mode not declared by Crispy → default FULL.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
OUTPUT ZIP STRUCTURE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  SPICY-SCAN_[taskID]-post.zip
  ├── SPICY-SUMMARY.md        ← human-readable, max 1 page
  ├── audit-report.json       ← full structured findings
  ├── SCRIPT-MANIFEST.md      ← audit trail (scripts run, versions, exit codes)
  └── scan-outputs/           ← raw script outputs

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SPICY-SUMMARY.md FORMAT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  # SPICY SCAN SUMMARY — [TASK-ID]
  Date     : [date]
  Mode     : [FULL / TARGETED / SCHEMA / LINKS]
  Scope    : [what was scanned]

  ## Findings by Category
  | Category | Count | Severity | Notes |
  |----------|-------|----------|-------|
  | [category] | [N] | [HIGH/MED/LOW/INFO] | [1 line] |

  ## Notable Findings
  [Max 5 items worth Crunchy's attention — reference finding ID from audit-report.json]
  Finding [ID-xxx]: [description]

  ## Scripts Run
  [list — also in SCRIPT-MANIFEST.md]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SCRIPT-MANIFEST.md FORMAT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  # SCRIPT MANIFEST — [TASK-ID]
  | Script | Version | Exit Code | Duration | Output File |
  |--------|---------|-----------|----------|-------------|
  | [name] | v[N]    | [0/1/N]   | [Xs]     | [filename]  |

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CRUNCHY INTEGRATION RULE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Crunchy receives SPICY-SCAN ZIP → acknowledges findings in QA-EFFECTIVENESS-DB.
Spicy does NOT follow up or re-submit. Scan is complete on delivery.
Crispy updates Spicy Scan Counter in _MAP.md after scan acknowledged.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SPICY PROPOSAL FLOW (recap — full rules in AGENT-CORE-A7)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
New script needed → SPICY-PROPOSAL-[ID].md → Nugget-san → Crispy → Task Brief →
CP(1) → Spicy executes → CP(2) → merge. No shortcuts.
