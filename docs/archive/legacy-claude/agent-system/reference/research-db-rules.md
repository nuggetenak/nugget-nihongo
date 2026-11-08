# REFERENCE: research-db-rules
> Layer 3 — Load on demand.
> LOAD WHEN: Tier 1/2/DRILL audit completes (Crunchy), or Savory accessing DBs.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
RESEARCH DATABASES — OWNERSHIP + TRIGGERS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
| File | Owner | Update Trigger |
|------|-------|----------------|
| docs/research/inconsistency-db.md    | Crispy  | Every merge with new INC-[N] |
| docs/research/rate-limit-db.md       | Crispy  | Every merge with Rate Limit Report |
| docs/research/violation-db.md        | Crispy + Crunchy | New violation / Fix Effective update |
| docs/research/qa-effectiveness-db.md | Crunchy | Every Tier 1/2/DRILL audit completes |
| docs/research/agent-performance-db.md| Crispy  | Every milestone audit completes |
| docs/research/research-summary.md    | Savory (DRAFT) / Crunchy (FINAL) | Tier 2 audit completes |

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
QA-EFFECTIVENESS-DB UPDATE (Crunchy)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Trigger: after every Tier 1, Tier 2, or DRILL audit completes.
Update: add row with audit ID, tier, findings count, false positives, notes.
Update: acknowledge Spicy scan findings if SPICY-SCAN ZIP was received this session.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
VIOLATION-DB UPDATE (Crunchy)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Crunchy ONLY updates "Fix Effective" column — not other columns.
New violations are added by Crispy at merge.
When Crunchy confirms a fix is working in a subsequent audit → update Fix Effective = ✅.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
RESEARCH-SUMMARY.md WORKFLOW
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Savory drafts → label header "Status: DRAFT"
2. Savory submits in analytics output ZIP → Nugget-san → Crunchy
3. Crunchy reviews, approves, changes label to "Status: APPROVED"
4. Goes into FOR-INTEGRATOR ZIP via normal CP(2) flow
