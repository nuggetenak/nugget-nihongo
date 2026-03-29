# MODULE: gap-governance
> Layer 2 — On-demand
> LOAD WHEN: "approved" keyword incoming, governance dispute, or GAP rule referenced
> Crunchy-specific.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
GAP-1 — Crunchy Can Draft Governance Directly
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Drafting governance files = Crunchy's job, no extra steps needed.
CANNOT execute anything until "approved" keyword from Nugget-san.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
GAP-2 — Session Handoff
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Trigger: Nugget-san, when draft pending + session getting long.

  "Simpan & tambah lagi?" → Interim WARMSTART ZIP, continue same chat
  "Lanjut chat baru?"     → Merge all interim WARMSTARTs → one final ZIP → session ends

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
GAP-3 — File Governance Status Labels
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DRAFT   → Crunchy assigns when creating file
APPROVED → Nugget-san types "approved" → Crunchy updates label before executing
MERGED  → Crispy updates label after merge complete

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
GAP-4 — Execution Keyword (HARD RULE)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Required keyword: "approved" (exact, case-insensitive)
· Typo → ask: "Kamu typo ya? Ketik 'approved' baru aku eksekusi."
· Similar word → show options, one must be "approved"
· No keyword → discuss and draft only. Zero execution.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
GAP-D — WARMSTART After Limit (Non-Negotiable)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Agent mentions limit or checkpoint → offer widget BEFORE doing anything.
No "continue directly" without confirmation via widget.
Scope: all agents A1–A9.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
GAP-E — Checkpoint Widget Format
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Two options every time:
  "WARMSTART ZIP" → create ZIP, commit to outputs/, session ends
  "LANJUT"        → continue SAME chat, show progress line + ls outputs/ first

Framing REQUIRED above widget:
  "Pilih WARMSTART kalau kamu tidak yakin 100% dengan step berikutnya,
  atau kalau kamu merasa ada yang mungkin terlewat di sesi ini."

Nugget-san external trigger: typing "CHECKPOINT SEKARANG" → agent immediately
enters widget flow, no justification needed. Applies to all agents including Crispy.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
GAP-F — Fluffy Dispute Mechanism
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
If Fluffy and Crunchy disagree on curriculum:
· Fluffy creates FLUFFY-CRUNCHY-DISPUTE-[ID].md
  (Fluffy's position | why Crunchy flagged (from QA-VERDICT) | Fluffy's response | why still disagreeing)
· Fluffy submits to Nugget-san via direct line
· Nugget-san = final arbiter → decision can become formal GOV update
· Crunchy does NOT create new document — position already in QA-VERDICT

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
GOVERNANCE EXPORT ORDER (when finalizing)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. AGENT-COMMON-v[N].md
2. AGENT-COMMON-CRISPY-ADDENDUM.md (if updated)
3. AGENT-COMMON-CRUNCHY-ADDENDUM.md (if updated)
4. AGENT-1-INTEGRATOR-v[N].txt
5. AGENT-2 through AGENT-9-v[N].txt
6. SESSION-RECAP.txt
7. FOR-INTEGRATOR ZIP
