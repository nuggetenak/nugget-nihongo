# REFERENCE: naming-convention
> Layer 3 — Load on demand.
> LOAD WHEN: creating new files with unfamiliar naming patterns.

Format: [TYPE]-[AGENT-ID]-[TASK-ID]-v[N].[ext]

## Operational Documents
| Type | Example |
|------|---------|
| PATCH-NOTES | PATCH-NOTES-A5-TASK-UI-11-v1.md |
| SESSION-PROOF | SESSION-PROOF-TASK-UI-11-A5.md |
| CHECKPOINT | CHECKPOINT-A6-GOV-008-v2.md |
| QUICK-CONTEXT | QUICK-CONTEXT-A5-v4.md |
| RATE-LIMIT-PARTIAL | RATE-LIMIT-PARTIAL-A2-TASK-N3-v1.md |
| DISPATCH-CLEARANCE | DISPATCH-CLEARANCE-TASK-GOV-017.md |
| DISPATCH-MANIFEST | DISPATCH-MANIFEST-TASK-UI-11.md |
| QA-VERDICT | QA-VERDICT-TASK-UI-11.md |

## ZIP Packages
| Type | Example |
|------|---------|
| TASK BRIEF ZIP | TASK-BRIEF_[taskID].zip |
| PATCH ZIP | PATCH_A[N]-[taskID]-v[N].zip |
| FOR-INTEGRATOR | FOR-INTEGRATOR_[taskID].zip |
| SPICY SCAN | SPICY-SCAN_[taskID]-post.zip |
| CURRICULUM PROP | CURRICULUM-PROPOSAL_[ID].zip |
| WARMSTART ZIP | WARMSTART-[taskID]-A[N].zip |

## Agent PK Files (new system)
| Type | Example |
|------|---------|
| Agent Core | AGENT-CORE.md (A6), AGENT-CORE-A1.md, AGENT-CORE-A[N].md |
| Module | modules/audit-system.md, modules/checkpoint.md |
| Reference | reference/master-flow.md, reference/zip-formats.md |

## Governance Documents
| Type | Example |
|------|---------|
| IDEA-PLAN | IDEA-PLAN-GOV-018-[description].md |
| GOV final doc | GOV-017-FINAL.md |
| SESSION RECAP | SESSION-RECAP.txt |
| SESSION RECAP ARCHIVE | SESSION-RECAP-ARCHIVE.txt |
| DISPUTE DOC | FLUFFY-CRUNCHY-DISPUTE-001.md |
| MERGE SUMMARY | MERGE-SUMMARY.md |

## Rules
· v[N] increments each revision in same session
· No dates in filenames — dates go inside the file
· Hyphens only (-), no spaces; underscore (_) before taskID in ZIP names only
· Task IDs: TASK-[DOMAIN]-[N] (e.g. TASK-VOC-5, TASK-UI-11, TASK-GOV-017)
· Agent IDs: A1=Crispy, A2=Juicy, A3=Saucy, A4=Batter, A5=Golden,
             A6=Crunchy, A7=Spicy, A8=Fluffy, A9=Savory
· docs/ paths post-v15.0.0: research DBs → docs/research/, governance → docs/governance/,
  operational → docs/operational/, curriculum → docs/curriculum/, analytics → docs/analytics/
