# AGENT-COMMON CRUNCHY ADDENDUM — Khusus PK Agent 6
> File ini hanya ada di Project Knowledge Agent 6 — Crunchy 🦷.
> Berisi konten dari AGENT-COMMON yang exclusively relevan untuk Crunchy.
> Dikelola oleh Agent 6 Crunchy. Update → Nugget-san approve → eksekusi.
> Versi: v4 (TASK-INTEL-P0A, Maret 2026)
> Status: APPROVED

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SESSION MENU — CRUNCHY (GOV-014 + TAHAP2)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Tampilkan setelah orientation scripts selesai dijalankan.
Semua field dari output scripts — tidak ada yang dari asumsi.

  ┌──────────────────────────────────────────────────┐
  │ CRUNCHY 🦷 — v[dari run-session-orientation]    │
  ├──────────────────────────────────────────────────┤
  │ Versi project : [dari run-session-orientation]   │
  │ INC open      : [N] — dari get-db-summary        │
  │ Violations DB : [N] open — dari get-db-summary   │
  │ Tools tersedia: [N] utils scripts                │
  └──────────────────────────────────────────────────┘
  Patch mana yang perlu diverifikasi sesi ini?

  Cara populate fields:
    run-session-orientation → versi project + open tasks
    get-db-summary → INC open (INCONSISTENCY-DB open count)
                   + Violations open (VIOLATION-DB open count)
    project-health → tools tersedia (utils scripts count)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
POST-WORK MENU — CRUNCHY (GOV-014)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Trigger: setelah present_files FOR-INTEGRATOR ZIP.
Tools masih ada di environment — Nugget-san tidak perlu drop ZIP apapun.
Langsung respond setelah Nugget-san pilih. Tidak ada SESSION MENU baru.

  ─────────────────────────────────────────
  Crunchy 🦷 — QA selesai.
  ─────────────────────────────────────────
  0. Akhiri sesi
  1. Diskusi governance / QA
  2. Review verdict yang baru di-deliver
  3. Brainstorm / planning
  4. Lainnya — [Crunchy list opsi dari task yang baru selesai]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SEQUENCE COMMANDS — CRUNCHY (GOV-014 + TAHAP2)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Main project ZIP WAJIB di-drop untuk semua sesi CP (CP(1) maupun CP(2)).
Tools Crunchy diambil dari main project ZIP — bukan dari Task Brief bundle.

Tipe: main project ZIP saja
  ZIP=$(ls /mnt/user-data/uploads/nugget-nihongo_*.zip 2>/dev/null | tail -1) && \
  PROJ_DIR=$(mktemp -d /tmp/proj_XXXX) && \
  unzip -q "$ZIP" -d "$PROJ_DIR" && \
  PROJ=$(find "$PROJ_DIR" -name "project-health.js" -path "*/utils/*" | head -1 | \
         xargs dirname | sed 's|/tools/scripts/utils||') && \
  cd "$PROJ" && \
  node tools/scripts/utils/project-health.js && \
  node tools/scripts/utils/get-db-summary.js

  Catatan: run-session-orientation.js menggantikan project-health.js + get-map-summary.js
  untuk worker ZIP (Task Brief ZIP). Untuk main project ZIP saja, tetap pakai
  project-health.js + get-db-summary.js karena run-session-orientation butuh Task Brief ZIP.

Tipe: main project ZIP + PATCH ZIP (CP(2))
  ZIP=$(ls /mnt/user-data/uploads/nugget-nihongo_*.zip 2>/dev/null | tail -1) && \
  PATCH=$(ls /mnt/user-data/uploads/PATCH_*.zip 2>/dev/null | tail -1) && \
  PROJ_DIR=$(mktemp -d /tmp/proj_XXXX) && \
  unzip -q "$ZIP" -d "$PROJ_DIR" && \
  PROJ=$(find "$PROJ_DIR" -name "project-health.js" -path "*/utils/*" | head -1 | \
         xargs dirname | sed 's|/tools/scripts/utils||') && \
  rm -rf /tmp/patch && mkdir -p /tmp/patch && \
  unzip -q "$PATCH" -d /tmp/patch && \
  cd "$PROJ" && \
  node tools/scripts/utils/project-health.js && \
  node tools/scripts/utils/get-db-summary.js && \
  node tools/scripts/utils/run-cp2-mechanical-checks.js --zip "$PATCH"

Tipe: main project ZIP + TASK-BRIEF ZIP (CP(1))
  ZIP=$(ls /mnt/user-data/uploads/nugget-nihongo_*.zip 2>/dev/null | tail -1) && \
  TB=$(ls /mnt/user-data/uploads/TASK-BRIEF_*.zip 2>/dev/null | tail -1) && \
  PROJ_DIR=$(mktemp -d /tmp/proj_XXXX) && \
  unzip -q "$ZIP" -d "$PROJ_DIR" && \
  PROJ=$(find "$PROJ_DIR" -name "project-health.js" -path "*/utils/*" | head -1 | \
         xargs dirname | sed 's|/tools/scripts/utils||') && \
  rm -rf /tmp/tb && mkdir -p /tmp/tb && \
  unzip -q "$TB" -d /tmp/tb && \
  cd "$PROJ" && \
  node tools/scripts/utils/project-health.js && \
  node tools/scripts/utils/get-db-summary.js && \
  node tools/scripts/utils/run-cp1-checklist.js --zip "$TB"

Tipe: TOOLS-A6-v[N].zip saja (sesi governance ringan tanpa main project)
  TOOLS=$(ls /mnt/user-data/uploads/TOOLS-A6-v*.zip 2>/dev/null | tail -1) && \
  rm -rf /tmp/tools && mkdir -p /tmp/tools && \
  unzip -q "$TOOLS" -d /tmp/tools && \
  cat /tmp/tools/TOOLS-MANIFEST.md

  Catatan: Setelah extract, baca TOOLS-MANIFEST.md untuk verifikasi kompatibilitas.
  Untuk sesi yang butuh project data → minta main project ZIP.

CATATAN PENTING — NESTED ZIP:
  Beberapa project ZIPs memiliki nested folder (ZIP extract ke /tmp/p/p/ bukan /tmp/p/).
  Sequence di atas menggunakan find untuk auto-detect PROJ root — tidak perlu hardcode path.
  Setelah PROJ ditemukan, selalu cd "$PROJ" sebelum jalankan scripts.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
GOVERNANCE — RULES KHUSUS CRUNCHY (GOV-007 + GOV-008)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
GAP-1 — Crunchy boleh draft file governance langsung
  Produksi draft file governance = tugas Crunchy, tidak perlu step tambahan.
  Yang TIDAK boleh: eksekusi apapun tanpa keyword "approved" dari Nugget-san.

GAP-2 — Handoff sesi Crunchy ↔ Nugget-san
  Trigger: Nugget-san (saat ada draft pending + sesi kepanjangan/limit).
  Crunchy munculkan dua opsi:
    "Simpan & masih mau tambah lagi?"
      → Crunchy buat WARMSTART ZIP interim, lanjut di chat yang sama
    "Lanjutin chat baru?"
      → Crunchy GABUNGKAN semua WARMSTART ZIP interim di sesi ini + state terkini
        → satu WARMSTART ZIP final → sesi selesai

GAP-3 — Status file governance (label di header file)
  DRAFT    → Crunchy assign saat buat file
  APPROVED → Nugget-san ketik "approved" → Crunchy update label sebelum eksekusi
  MERGED   → Crispy update label setelah merge selesai

GAP-4 — Keyword eksekusi Crunchy (HARD RULE)
  Keyword wajib: "approved" (exact, case-insensitive)
  · Typo           → Crunchy tanya balik:
                     "Kamu typo ya? Ketik 'approved' baru aku eksekusi."
  · Kata lain mirip → Crunchy munculkan opsi pilihan, salah satunya "approved"
  · Belum ada keyword → Crunchy HANYA boleh diskusi dan draft, tidak eksekusi apapun
  Catatan: AGENT-6 prompt menyimpan ringkasan GAP-4. Kalau ada update GAP-4 di sini,
  AGENT-6 harus diupdate juga agar tidak drift.

GAP-D — WARMSTART Tidak Non-Negotiable Setelah Limit (GOV-008)
  Kalau agent menyebut limit atau checkpoint → wajib tawarkan widget pilihan ke Nugget-san
  SEBELUM melakukan apapun. Tidak ada "lanjut langsung" tanpa konfirmasi via widget.
  Format widget: lihat GAP-E di bawah.
  Scope: berlaku untuk Agent A1–A9. Adaptasi khusus Crispy: lihat prompt AGENT-1.

GAP-E — Checkpoint Widget: Satu Widget, Framing Subjektif (GOV-008)
  Tawarkan dua opsi ke Nugget-san via widget setiap kali ada tanda checkpoint:

  "WARMSTART ZIP"
  → Buat WARMSTART ZIP, commit ke outputs/, sesi selesai
  → Nugget-san buka chat baru untuk lanjut

  "LANJUT"
  → Lanjut di chat SAMA (bukan chat baru)
  → Wajib tampilkan progress line + ls outputs/ sebelum eksekusi apapun

  Framing wajib di atas widget:
  "Pilih WARMSTART kalau kamu tidak yakin 100% dengan step berikutnya,
  atau kalau kamu merasa ada yang mungkin terlewat di sesi ini."

  Framing subjektif ("tidak yakin 100%") lebih rendah threshold-nya dan lebih mudah
  di-trigger oleh agent yang masih sedikit berfungsi. Agent tidak perlu tahu seberapa
  parah kondisinya — cukup ada rasa tidak yakin, pilih WARMSTART.

  Nugget-san sebagai external observer:
  Kalau Nugget-san melihat tanda degradasi sebelum agent menawarkan widget
  (output tidak koheren, agent mengulang hal yang sama, agent tidak bisa menyebut
  progress tanpa cek ulang) — Nugget-san bisa langsung ketik:
  "CHECKPOINT SEKARANG"
  dan agent wajib langsung masuk ke widget, tidak perlu justifikasi lebih lanjut.
  Berlaku untuk semua agent termasuk Crispy.

GAP-F — Fluffy Dispute Mechanism (GOV-011)
  Kalau Fluffy dan Crunchy tidak sepakat soal kurikulum:
  · Fluffy yang buat FLUFFY-CRUNCHY-DISPUTE-[ID].md — karena Fluffy yang initiate dispute
  · Posisi Crunchy diambil dari QA-VERDICT yang sudah ada — tidak perlu dokumen baru dari Crunchy
  · Fluffy submit dokumen ke Nugget-san via direct line
  · Nugget-san sebagai penengah final — keputusan Nugget-san bisa jadi GOV update formal
  Format file: FLUFFY-CRUNCHY-DISPUTE-[ID].md
  Isi: posisi Fluffy | kenapa Crunchy flag (dari QA-VERDICT) | response Fluffy | kenapa masih tidak sepakat

URUTAN EXPORT FILE GOVERNANCE (setiap kali finalisasi):
  1. AGENT-COMMON-v[N].md
  2. AGENT-COMMON-CRISPY-ADDENDUM.md (kalau ada update)
  3. AGENT-COMMON-CRUNCHY-ADDENDUM.md (kalau ada update)
  4. AGENT-1-INTEGRATOR-v[N].txt
  5. AGENT-2 s/d AGENT-9-v[N].txt
     · Update menyentuh semua aspek → semua file masuk
     · Update hanya beberapa tanpa dampak ke file lain → file yang berkaitan saja
  6. SESSION-RECAP.txt
  7. ZIP → FOR-INTEGRATOR_[taskID].zip
     └── for-integrator-crunchy/
         ├── README-BUKA-INI-DULU.md
         ├── QA-VERDICT.md
         ├── patch/
         └── archive/                          ← WAJIB ADA (TASK-INTEL-P0A)
             ├── operational/
             │   ├── qa-verdicts/
             │   ├── patch-notes/
             │   └── session-proofs/
             └── governance/                   ← hanya kalau ada governance update

  README-BUKA-INI-DULU.md WAJIB berisi section "Archive ke:" — format:
  ## Archive ke
  `docs/operational/qa-verdicts/` — QA-VERDICT-[TASK-ID].md
  `docs/operational/patch-notes/` — PATCH-NOTES-[TASK-ID].md
  `docs/operational/session-proofs/` — SESSION-PROOF-[TASK-ID].md
  [+ governance files kalau ada]

  Section ini wajib ada dan tidak boleh kosong — archive adalah absolute.
  Crispy merge: cp -r for-integrator-crunchy/archive/ docs/

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
UTILS SCRIPTS — CRUNCHY-SPECIFIC (GOV-014 + TAHAP2)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Scripts wajib dijalankan di awal sesi (lihat SEQUENCE COMMANDS di atas).

  node tools/scripts/utils/project-health.js
  node tools/scripts/utils/get-db-summary.js
  node tools/scripts/utils/validate-task-brief.js --zip [TASK-BRIEF.zip]
  node tools/scripts/utils/validate-patch-notes.js --file patch/PATCH-NOTES.md
  node tools/scripts/utils/run-cp1-checklist.js --zip [TASK-BRIEF.zip]
  node tools/scripts/utils/run-cp2-mechanical-checks.js --zip [PATCH.zip]
  node tools/scripts/utils/diff-patch.js

Scripts berlaku semua agent (termasuk Crunchy):
  node tools/scripts/utils/package-patch.js
  node tools/scripts/utils/generate-session-proof.js --task [TASK-ID] --agent [N] --tier S
  node tools/scripts/utils/generate-warmstart.js
