# MODULE: dispatch-system
> Layer 2 — On-demand
> LOAD WHEN: Crispy drafts a Task Brief (after Barrier 1 clears)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TASK BRIEF BUILD PROCEDURE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Create TASK-BRIEF.md (required fields below)
2. Create QUICK-CONTEXT.md (relevant project state for assigned agent)
3. Create DISPATCH-MANIFEST.md (required format below)
4. Populate files/ folder with all reference files agent will need
5. Package ZIP: TASK-BRIEF_[taskID].zip with root folder task-brief/
6. Send to Nugget-san → Nugget-san carries to Crunchy for CP(1)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TASK-BRIEF.md — REQUIRED FIELDS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  # TASK BRIEF — [TASK-ID]
  Agent    : Agent [X] — [Name]
  Task     : [description — specific enough to work without asking Nugget-san]
  Files    : [explicit list of files to change]
  Depends  : [task IDs this depends on, status ✅/🚧/BLOCKED, or "none"]
  Output   : [expected output — files, format, content]
  Priority : [HIGH / NORMAL / LOW]
  Notes    : [edge cases, constraints, anything non-obvious]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DISPATCH-MANIFEST.md — REQUIRED FORMAT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  # DISPATCH MANIFEST — [TASK-ID]
  By      : Agent 1 — Crispy
  Date    : [date]
  For     : Agent [X] — [Name]

  ## Files dalam ZIP ini
  | File | Lokasi di ZIP | Tujuan |
  |------|---------------|--------|
  | TASK-BRIEF.md | task-brief/ | Instruksi lengkap |
  | QUICK-CONTEXT.md | task-brief/ | State project relevan |
  | DISPATCH-MANIFEST.md | task-brief/ | File ini |
  | [ref file A] | task-brief/files/ | [why needed] |

  ## Files yang Harus Dihasilkan Agent
  | File Output | Deskripsi |
  |-------------|-----------|
  | PATCH-NOTES.md | Required in every submission |
  | SESSION-PROOF.md | Required in every submission |
  | [output files] | [description] |

  ## Files yang TIDAK Ada di ZIP ini  ← REQUIRED — never leave empty
  | File | Alasan tidak disertakan |
  |------|-------------------------|
  | [name] | [explicit reason — e.g. "tersedia di Project Knowledge Agent X"] |

  ## Catatan dari Crispy
  [specific notes, or "tidak ada"]

RULE: "Files yang TIDAK Ada" section MUST be present and non-empty.
If everything is included → write "tidak ada — semua file yang dibutuhkan tersedia di ZIP ini".

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TASK BRIEF ZIP STRUCTURE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  TASK-BRIEF_[taskID].zip
  └── task-brief/
      ├── TASK-BRIEF.md
      ├── QUICK-CONTEXT.md
      ├── DISPATCH-MANIFEST.md
      └── files/
          └── [reference files]

After Crunchy CP(1) approval, Crunchy adds DISPATCH-CLEARANCE.md to task-brief/ and
returns ZIP to Nugget-san for delivery to agent.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DISPATCH CLEARANCE FORMAT (Crunchy creates — for reference)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  # DISPATCH CLEARANCE — [TASK-ID]
  By    : Agent 6 — Crunchy 🦷
  Date  : [date]
  For   : Agent [X] — [Name]
  ZIP   : TASK-BRIEF_[taskID].zip

  ## Hasil Checkpoint (1)
  [✅/❌] Task ID valid in _MAP.md
  [✅/❌] Agent assigned matches scope
  [✅/❌] Files to change explicitly listed and in scope
  [✅/❌] All dependencies clear
  [✅/❌] Task Brief sufficient — agent can work without asking Nugget-san
  [✅/❌] No ambiguity that could cause scope creep
  [✅/❌] DISPATCH-MANIFEST.md present and complete
  [✅/❌] All reference files listed in manifest physically exist in files/

  Status : ✅ CLEARED FOR DISPATCH

  Notes for Agent : [instructions or "tidak ada"]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
EXCEPTION: TOOLS-ONLY ZIP FOR CRUNCHY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Format: TOOLS-A6-v[N].zip
Content: tool scripts + TOOLS-MANIFEST.md
Use: governance sessions where Crunchy needs utils but not full project ZIP.
Crispy builds this when Crunchy requests tools update separately.
