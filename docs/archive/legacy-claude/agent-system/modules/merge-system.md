# MODULE: merge-system
> Layer 2 — On-demand
> LOAD WHEN: Crispy receives FOR-INTEGRATOR ZIP (Crunchy-approved)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MERGE PROCEDURE — STEP BY STEP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Verify QA-VERDICT.md present and Issued-by = "Agent 6 Crunchy 🦷"
   → If absent or wrong issuer: REJECT ZIP, notify Nugget-san.
2. Read README-BUKA-INI-DULU.md — follow exactly.
3. Merge files from patch/ into project.
4. Run archive step:
     cp -r for-integrator-crunchy/archive/ docs/
5. Update _MAP.md: mark task ✅ with date (format from QA-VERDICT) + bump Spicy Scan Counter
6. Bump version per VERSIONING CRITERIA below.
7. Update MERGE-SUMMARY.md.
8. Run: node tools/scripts/utils/run-merge-checklist.js
   → Exit 0 = PASS → merge declared complete
   → Exit 1 = FAIL → fix all failing items, re-run, only then declare complete
   → Script infrastructure error → manual verification, document in MERGE-SUMMARY, flag to Spicy
9. Display main menu automatically — do not wait for Nugget-san input.

⚠️ ARCHIVE IS ABSOLUTE — merge is incomplete without archive step.
⚠️ run-merge-checklist.js is a HARD GATE — not advisory.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
VERSIONING CRITERIA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
x.x.X (patch) : bug fix, data correction, minor tweak — no new features
x.X.0 (minor) : new content, new feature, significant governance update
X.0.0 (major) : breaking schema/architecture change
                HARD RULE: requires explicit Crunchy sign-off as breaking change
                Never bump major unilaterally.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MILESTONE AUDIT COUNTER (_MAP.md)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Tier 1 audit trigger: every 5 app minor version increments (e.g. x.5.0, x.10.0)
  Scope: Layer 4+5 (index.html load order, sw.js ASSETS, _MAP.md ✅ audit,
          schema vs actual data, README + sources.js + SOURCE-REFERENCE.md numbers)

Tier 2 audit trigger: every 2x Tier 1 completes, OR every major version increment
  Scope: all 7 layers

Counter lives in _MAP.md — Crispy increments, Crunchy audits.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MERGE-SUMMARY.md FORMAT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  # Merge: [TASK-ID]
  Date    : [date]
  Version : [old] → [new]
  Agent   : Agent [X] — [name]
  Files   : [list]
  INC     : [new INC-N entries seeded to INCONSISTENCY-DB, or "none"]
  RateLimit: [seeded to RATE-LIMIT-DB, or "none"]
  Spicy   : [scan mode declared / "not declared — default: full"]
  Notes   : [anything unusual]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
RESEARCH DB SEEDING (post-merge)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
After every merge, Crispy seeds:
  docs/research/inconsistency-db.md   ← any new INC-N found in QA-VERDICT
  docs/research/rate-limit-db.md      ← Rate Limit Report data from PATCH-NOTES
  docs/research/violation-db.md       ← any violations found in QA-VERDICT
  docs/research/agent-performance-db.md ← update at milestone audit

Format for each DB: follow existing entries in the file as template.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SESSION-RECAP TRIM RULE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SESSION-RECAP.txt (active) keeps only 2 most recent GOV versions.
If >4 GOV entries → Crispy trims excess to SESSION-RECAP-ARCHIVE.txt at merge.
docs/archive/ — retired files. Crispy moves files here when no longer active.
