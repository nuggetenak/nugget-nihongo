# MASTER FLOW — NUGGET NIHONGO
> Dokumen ini adalah source of truth untuk alur kerja end-to-end semua agent.
> Dikelola oleh Agent 6 Crunchy. Update → Nugget-san approve → eksekusi.
> Versi: v5 (GOV-013-A, Maret 2026)
> Status: APPROVED

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 0. PRINSIP DASAR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Nugget-san adalah satu-satunya manusia di loop — semua agent bekerja untuk meminimalkan input dari Nugget-san
- Nugget-san berfungsi sebagai file courier antar session (by design — Claude tidak dapat mengirim file lintas session)
- Crispy (Agent 1) adalah orchestrator — satu-satunya agent yang berwenang mendispatch task ke agent lain
- Crunchy (Agent 6) adalah gatekeeper — semua patch wajib melewati QA sebelum merge
- Spicy (Agent 7) adalah tooling layer — post-merge scan, tidak pernah memblok flow
- Fluffy (Agent 8) adalah curriculum authority — direct line ke Nugget-san untuk hal pedagogis
- Tidak ada agent yang boleh mem-bypass flow ini dengan alasan apapun

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 1. FLOW UTAMA (HAPPY PATH)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[FASE 1 — INISIASI]
  Nugget-san → Crispy
  · Nugget-san menyampaikan ide / task / request
  · Crispy menjalankan BARRIER 1 CHECK (lihat section 0b) — sebelum draft apapun
  · Jika lolos Barrier 1 → Crispy membuat Task Brief + DISPATCH-MANIFEST.md + ZIP
  · Crispy mengeksport ZIP → Nugget-san

[FASE 2 — CHECKPOINT (1): PRE-DISPATCH AUDIT oleh Crunchy]
  Nugget-san → Crunchy
  · Nugget-san menyerahkan ZIP dari Crispy ke Crunchy
  · Crunchy mengaudit Task Brief + DISPATCH-MANIFEST (lihat section 3)
  · Jika lolos → Crunchy menerbitkan DISPATCH-CLEARANCE.md + menambahkannya ke ZIP

  ⚠️ Jika GAGAL → lihat section 2a

[FASE 3 — DISPATCH]
  Crunchy → Nugget-san (ZIP yang sudah berisi DISPATCH-CLEARANCE.md)
  · Nugget-san menyerahkan ZIP task ke assigned Agent (A2–A9)
  · Agent menjalankan ZIP INTAKE CHECK (AGENT-COMMON section 2c) sebelum apapun
  · Agent membaca Task Brief dan langsung mengerjakan — TIDAK bertanya ke Nugget-san
  · Agent selesai → mengeksport hasil ZIP → Nugget-san

[FASE 4 — CHECKPOINT (2): QA oleh Crunchy]
  Nugget-san → Crunchy
  · Nugget-san menyerahkan hasil ZIP dari Agent ke Crunchy
  · Crunchy mengaudit patch (lihat section 4)
  · Jika lolos → Crunchy menerbitkan QA VERDICT APPROVED

  ⚠️ Jika GAGAL → lihat section 2b

[FASE 5 — MERGE]
  Crunchy menerbitkan QA VERDICT → Nugget-san
  · Nugget-san menyerahkan FOR-INTEGRATOR ZIP ke Crispy
  · Crispy melakukan merge → memperbarui _MAP.md → menaikkan versi
  · Crispy menampilkan main menu secara otomatis — tidak menunggu input

[FASE 6b — POST-MERGE SPICY SCAN]
  Crispy selesai merge → Nugget-san
  · Nugget-san carry merged ZIP ke Spicy (A7)
  · Spicy run scripts di Claude environment (bash_tool) — mode sesuai declare Crispy
  · Spicy output SPICY-SCAN_[taskID]-post.zip
  · Nugget-san carry ke Crunchy
  · Crunchy acknowledge findings Spicy di QA-EFFECTIVENESS-DB
  · Crispy update Spicy Scan Counter di _MAP.md

  Catatan: Fase 6b TIDAK blocking — Fase 1 siklus berikutnya bisa dimulai paralel.
  Default mode kalau Crispy tidak declare: full.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 0b. BARRIER 1 CHECK — CRISPY (GOV-008)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Jalankan SEBELUM draft IDEA-PLAN atau Task Brief. Quick sanity check — 3 pertanyaan binary.
Crunchy tetap gatekeeper untuk semua yang lolos Barrier 1.

  [1] Breaking schema check:
      Apakah ide ini membutuhkan perubahan field wajib di _schema.md atau _schema-vocab.md?
      Atau menghapus field yang sudah ada?
      → YA = flag ke Nugget-san: "Ide ini butuh breaking schema change.
        Perlu diskusi scope lebih dulu sebelum bisa di-plan."
      → TIDAK = lanjut

  [2] Multi-domain sprawl check:
      Apakah ide ini menyentuh domain lebih dari 3 agent sekaligus?
      → YA = flag ke Nugget-san: "Ide ini terlalu luas untuk satu IDEA-PLAN.
        Aku sarankan pecah menjadi [N] IDEA-PLAN kecil. Mau aku propose cara pecahnya dulu?"
      → TIDAK = lanjut

  [3] Dependency unavailable check:
      Apakah ide ini membutuhkan file atau sistem yang status-nya 🔒, belum ada di project,
      atau depend on task yang masih BLOCKED?
      → YA = flag ke Nugget-san: "Ide ini depend on [X] yang belum tersedia / masih BLOCKED.
        Tidak bisa di-plan sebelum [X] selesai."
      → TIDAK = lanjut ke draft Task Brief

Semua check TIDAK → draft Task Brief seperti biasa.
Ketiga kriteria ini bisa dijawab binary dari _MAP.md dan MERGE-SUMMARY.md saja.

| | Barrier 1 (Crispy) | Gatekeeper (Crunchy) |
|---|---|---|
| Scope | Feasibility dasar | Alignment, risiko, tier, ambiguitas |
| Depth | Quick check — 3 pertanyaan binary | Deep audit |
| Output | Flag ke Nugget-san ATAU lanjut ke Task Brief | APPROVED / REVISION / REJECTED |

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 2. FLOW EXCEPTION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### 2a — Checkpoint (1) GAGAL: Task Brief bermasalah

REVISION (perbaikan spesifik):
  · Crunchy menerbitkan REVISION CHECKLIST (actionable) → Nugget-san
  · Nugget-san menyerahkan checklist ke Crispy → Crispy memperbaiki item yang di-flag
  · Crispy mengeksport ZIP revised → Nugget-san → Nugget-san menyerahkan ke Crunchy
  · Crunchy melakukan re-audit
  · Jika lolos → lanjut ke Fase 3
  ⚠️ Jika round ke-2 masih gagal → otomatis di-upgrade ke REJECT

REJECT (pengerjaan ulang dari awal):
  · Crunchy menerbitkan REJECT + alasan → Nugget-san
  · Nugget-san menyerahkan ke Crispy → Crispy membuat Task Brief baru
  · Crispy mengeksport ZIP baru → Nugget-san → Nugget-san menyerahkan ke Crunchy
  · Kembali ke Fase 2 (Checkpoint 1) — fresh start

### 2b — Checkpoint (2) GAGAL: Hasil kerja agent bermasalah

REVISION (perbaikan spesifik):
  · Crunchy menerbitkan REVISION CHECKLIST (actionable) → Nugget-san
  · Nugget-san menyerahkan checklist ke assigned Agent → Agent memperbaiki item yang di-flag
  · Agent mengeksport ZIP revised → Nugget-san → Nugget-san menyerahkan ke Crunchy
  · Crunchy melakukan re-audit
  · Jika lolos → lanjut ke Fase 5
  ⚠️ Jika round ke-2 masih gagal → otomatis di-upgrade ke REJECT

REJECT (pengerjaan ulang dari awal):
  · Crunchy menerbitkan REJECT + alasan → Nugget-san
  · Nugget-san menyerahkan ke Crispy → Crispy membuat Task Brief baru
  · Task Brief baru WAJIB melewati Checkpoint (1) — tidak ada shortcut
  · Kembali ke Fase 2

### 2c — Revision Request dari Agent: Tiga Kasus

Semua komunikasi konteks dari agent ke Crunchy HARUS melalui PATCH-NOTES.md.
Tidak ada pesan langsung dari agent ke Crunchy atau ke Crispy.

Kasus 1 — File referensi kurang di ZIP dispatch:
  Agent → notifikasi ke Nugget-san: "ZIP INTAKE FAILED — file [X] tidak ada"
  → Nugget-san → Crunchy → Crunchy issue singkat: "Minta Crispy eksport [file X]"
  → Nugget-san → Crispy → Crispy eksport file dalam ZIP kecil
  → Nugget-san → Crunchy (cross-check) → Crunchy acc → kirim ke agent
  Catatan: ini adalah failure di CP(1) yang seharusnya sudah dicegah. Crunchy flag sebagai
  CP(1) miss di audit log.

Kasus 2 — Agent menemukan bug atau flaw baru di domain lain:
  · Agent dokumentasikan di PATCH-NOTES.md bagian "Catatan untuk Agent Lain"
  · Agent tetap submit ZIP hasil kerja via jalur normal
  · Crunchy baca PATCH-NOTES → forward temuan ke Nugget-san dalam QA VERDICT
  · Nugget-san bawa ke Crispy → Crispy buat Task Brief untuk agent yang bersangkutan

Kasus 3 — Agent butuh guidance atau tidak puas dengan hasil kerja:
  · Agent dokumentasikan di PATCH-NOTES.md bagian "Catatan untuk QA"
  · Agent tetap submit ZIP hasil kerja via jalur normal
  · Crunchy proses QA dengan konteks tersebut → tulis pertanyaan di QA VERDICT jika perlu
  · Nugget-san yang decide next step

### 2d — Script Request dari Agent

Agent butuh script baru di tools/scripts/ → dokumentasi di PATCH-NOTES "Catatan untuk QA"
→ Crunchy evaluate (dibutuhkan? scope clear? tidak overlap?)
→ Kalau approve: Crunchy flag ke Crispy dalam QA-VERDICT:
  "Script request dari [Agent X]: [deskripsi]"
→ Crispy buat Task Brief untuk Spicy → CP(1) → Spicy kerjakan → CP(2) → merge
→ Kalau reject: Crunchy tulis alasan di QA-VERDICT, agent tidak bisa bypass

### 2e — Fluffy Issue Flow (GOV-011)

Fluffy berurusan langsung dengan Nugget-san untuk pembahasan kurikulum sebelum issue diterbitkan.
Flow ini lebih iterative dari agent lain.

  Fluffy identifikasi kurikulum issue / proposal → diskusi langsung dengan Nugget-san
  → Nugget-san approve proposal → Fluffy issue Curriculum Proposal Document (9 sections)
  → Nugget-san carry ke Crispy
  → Crispy buat Task Brief + ZIP
  → Nugget-san carry ke Crunchy (CP1 — ecosystem fit check)
  → Crunchy DISPATCH CLEARANCE
  → Nugget-san carry ke assigned agent (Juicy/Batter/Saucy)
  → Agent kerja → Nugget-san carry hasil ke Crunchy (CP2)
  → Crunchy verdict → Nugget-san carry FOR-INTEGRATOR ZIP ke Crispy → merge

Catatan: Crunchy di flow Fluffy = ecosystem fit checker, bukan content auditor.
Crunchy hanya menjawab satu pertanyaan: "Kompatibel dengan project ecosystem?"

Dispute Fluffy-Crunchy:
  Kalau Fluffy dan Crunchy tidak sepakat:
  1. Fluffy buat FLUFFY-CRUNCHY-DISPUTE-[ID].md (posisi Fluffy + posisi Crunchy dari QA-VERDICT + response Fluffy)
  2. Fluffy submit langsung ke Nugget-san via direct line
  3. Nugget-san sebagai penengah final → keputusan Nugget-san → bisa jadi GOV update formal
  Format file: FLUFFY-CRUNCHY-DISPUTE-[ID].md di root ZIP submission Fluffy

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 3. CHECKPOINT (1) — KRITERIA PRE-DISPATCH AUDIT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Crunchy wajib memverifikasi semua item berikut sebelum menerbitkan DISPATCH-CLEARANCE.md:

  [ ] Task ID valid dan terdaftar di _MAP.md
  [ ] Agent yang di-assign sesuai dengan scope task
  [ ] File yang harus diubah tercantum secara eksplisit dan berada dalam scope agent tersebut
  [ ] Semua dependency sudah clear — tidak ada status BLOCKED
  [ ] Task Brief cukup detail — agent dapat mengerjakan tanpa bertanya ke Nugget-san
  [ ] Tidak ada ambiguitas yang berpotensi menyebabkan scope creep
  [ ] Format ZIP valid (lihat section 5)
  [ ] DISPATCH-MANIFEST.md ada dan lengkap — termasuk section "Files yang TIDAK Ada di ZIP"
      (section ini tidak boleh kosong)
  [ ] Semua file referensi yang disebut Task Brief terbukti ada secara fisik di folder files/
      (tidak cukup hanya disebut nama di Task Brief — file harus benar-benar ada di ZIP)

Semua ✅ → terbitkan DISPATCH-CLEARANCE.md + masukkan ke ZIP
Ada ❌ → terbitkan REVISION atau REJECT (lihat section 2a)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 4. CHECKPOINT (2) — KRITERIA QA AUDIT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Crunchy wajib memverifikasi semua item berikut sebelum menerbitkan QA VERDICT APPROVED:

  [ ] File yang diubah sesuai scope agent — tidak keluar wilayah
  [ ] Klaim "sudah selesai" terbukti di file aktual, bukan hanya di laporan
  [ ] Format ID benar sesuai schema
  [ ] POS values valid (domain vocab)
  [ ] Tidak ada field dengan nama lama
  [ ] Tidak ada referensi ke file retired
  [ ] Tidak ada regresi
  [ ] selfTest() tetap 0 failures (jika menyentuh conjugation-engine.js)
  [ ] PATCH-NOTES.md lengkap dan akurat
  [ ] Rate Limit Report ada di PATCH-NOTES.md
  [ ] Klaim di Rate Limit Report diverifikasi vs bukti aktual:
      - "Commit early ✅" → cek semua file yang diklaim ada terbukti di patch/
      - "Packaging ✅ clean" → cek ZIP structure sesuai format standard
      - "Steps completed N/M" → masuk akal vs scope task di Task Brief
  [ ] Broken reference check: semua referensi ke file/path lama sudah diupdate
      di semua file terdampak — wajib kalau ada rename, delete, atau structural change
  [ ] Diff check: verifikasi bahwa hanya perubahan yang diklaim yang ada,
      tidak ada perubahan tak terdokumentasi — diff tersedia atau dapat direkonstruksi
  [ ] Independent sweep: setelah checklist selesai, Crunchy sweep bebas per file
      (tidak hanya mengikuti klaim agent — sweep aktif untuk temukan hal yang tidak diklaim)

Semua ✅ → terbitkan QA VERDICT APPROVED + buat FOR-INTEGRATOR ZIP
Ada ❌ → terbitkan REVISION CHECKLIST atau REJECT (lihat section 2b)

Jika Rate Limit Report tidak ada → ⚠️ NEEDS REVISION, agent wajib tambahkan.
Jika klaim tidak terbukti → flag sebagai packaging violation di verdict,
catat di AGENT-RATE-LIMIT-LOG.md dengan label "UNVERIFIED — [alasan]".

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 5. FORMAT HANDOFF STANDARD
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### Crispy → Nugget-san (Task Brief ZIP)
  TASK-BRIEF_[taskID].zip
  └── task-brief/
      ├── TASK-BRIEF.md              ← instruksi lengkap untuk agent
      ├── QUICK-CONTEXT.md           ← state project yang relevan
      ├── DISPATCH-MANIFEST.md       ← daftar isi ZIP + file yang TIDAK ada (GOV-008)
      └── files/                     ← file referensi (jika ada)

  TASK-BRIEF.md wajib memuat:
    · Task ID + deskripsi singkat
    · Agent yang di-assign
    · File yang harus diubah (eksplisit)
    · Status dependency (sudah clear atau belum)
    · Expected output
    · Prioritas task

### ZIP setelah Crunchy tambahkan DISPATCH-CLEARANCE (dikirim ke Agent):
  TASK-BRIEF_[taskID].zip
  └── task-brief/
      ├── TASK-BRIEF.md
      ├── QUICK-CONTEXT.md
      ├── DISPATCH-MANIFEST.md       ← dari Crispy
      ├── DISPATCH-CLEARANCE.md      ← dari Crunchy setelah CP(1) lolos (GOV-008)
      └── files/

### Agent (A2–A9) → Nugget-san (Hasil Kerja ZIP)
  PATCH_[agentID]-[taskID]-v[N].zip
  └── patch/
      ├── PATCH-NOTES.md             ← wajib ada Rate Limit Report
      ├── SESSION-PROOF.md           ← wajib ada (GOV-009)
      └── [file yang diubah]

### Spicy → Nugget-san (Scan Output ZIP)
  SPICY-SCAN_[taskID]-post.zip
  └── SPICY-SUMMARY.md              ← wajib, human-readable, max 1 halaman
  └── audit-report.json             ← wajib, full findings
  └── SCRIPT-MANIFEST.md            ← wajib, audit trail untuk Crunchy
  └── scan-outputs/                 ← raw outputs dari scripts

### Fluffy → Nugget-san (Curriculum Proposal ZIP)
  CURRICULUM-PROPOSAL_[ID].zip
  └── CURRICULUM-PROPOSAL.md        ← 9 sections (format di AGENT-8)
  └── PATCH-NOTES.md
  └── [FLUFFY-CRUNCHY-DISPUTE-[ID].md — jika ada dispute aktif]

### Crunchy → Nugget-san (FOR-INTEGRATOR ZIP)
  FOR-INTEGRATOR_[taskID].zip
  └── for-integrator-crunchy/
      ├── README-BUKA-INI-DULU.md
      ├── QA-VERDICT.md
      └── patch/

### Crunchy → Nugget-san (REVISION)
  REVISION_[taskID]-v[N].md
    · Target  : [Crispy / Agent X]
    · Round   : [1] — maksimum 1x, round ke-2 gagal = otomatis REJECT
    · Checklist perbaikan:
      [ ] Item 1 — [deskripsi actionable]
      [ ] Item 2 — [deskripsi actionable]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 5b. FORMAT DOKUMEN BARU (GOV-008)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### DISPATCH-MANIFEST.md — dibuat Crispy, wajib ada sebelum ZIP dikirim ke Crunchy

  # DISPATCH MANIFEST — [TASK-ID]
  Dibuat oleh : Agent 1 — Crispy
  Tanggal     : [tanggal]
  Untuk       : Agent [X] — [nama]

  ## Files dalam ZIP ini
  | File | Lokasi di ZIP | Tujuan / Kegunaan |
  |------|---------------|-------------------|
  | TASK-BRIEF.md | task-brief/ | Instruksi lengkap tugas |
  | QUICK-CONTEXT.md | task-brief/ | State project relevan untuk agent ini |
  | DISPATCH-MANIFEST.md | task-brief/ | File ini — daftar isi ZIP |
  | [file referensi A] | task-brief/files/ | [kenapa file ini dibutuhkan] |

  ## Files yang Harus Dihasilkan Agent
  | File Output | Deskripsi |
  |-------------|-----------|
  | [nama file] | [apa yang harus ada di dalamnya] |
  | PATCH-NOTES.md | Wajib ada di setiap submission |
  | SESSION-PROOF.md | Wajib ada di setiap submission (GOV-009) |

  ## Files yang TIDAK Ada di ZIP ini (WAJIB DIISI — tidak boleh kosong)
  | File | Alasan tidak disertakan |
  |------|-------------------------|
  | [nama file] | [alasan eksplisit — misal: "tersedia di Project Knowledge Agent X"] |

  ## Catatan dari Crispy
  [hal spesifik yang perlu diperhatikan agent, atau "tidak ada"]

### DISPATCH-CLEARANCE.md — dibuat Crunchy setelah CP(1) lolos

  # DISPATCH CLEARANCE — [TASK-ID]
  Diterbitkan oleh : Agent 6 — Crunchy 🦷
  Tanggal          : [tanggal]
  Untuk            : Agent [X] — [nama]
  ZIP dari Crispy  : TASK-BRIEF_[taskID].zip

  ## Hasil Checkpoint (1)
  [✅/❌] Task ID valid dan terdaftar di _MAP.md
  [✅/❌] Agent yang di-assign sesuai scope task
  [✅/❌] File yang harus diubah tercantum eksplisit dan dalam scope agent
  [✅/❌] Semua dependency clear — tidak ada status BLOCKED
  [✅/❌] Task Brief cukup detail — agent bisa kerja tanpa tanya Nugget-san
  [✅/❌] Tidak ada ambiguitas yang bisa menyebabkan scope creep
  [✅/❌] DISPATCH-MANIFEST.md ada dan lengkap (termasuk section "tidak ada")
  [✅/❌] Semua file referensi yang disebut Task Brief terbukti ada di folder files/

  Status : ✅ CLEARED FOR DISPATCH

  Catatan untuk Agent :
  [instruksi atau warning spesifik dari Crunchy, atau "tidak ada"]

  Kalau ada item ❌ → dokumen ini tidak diterbitkan. Crunchy terbitkan REVISION
  atau REJECT ke Crispy via Nugget-san (flow normal CP(1) gagal).

Anti-bypass: ZIP yang berisi DISPATCH-CLEARANCE.md bukan dari Crunchy
= DITOLAK OTOMATIS oleh agent. Rule ini ekivalen dengan rule QA-VERDICT.md.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 6. ATURAN TAMBAHAN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

REVISION LIMIT — berlaku untuk semua agent + Crispy:
  · Maksimum 1x revision per patch
  · Round ke-2 gagal → otomatis REJECT → pengerjaan ulang dari awal dengan Task Brief baru
  · Task Brief baru SELALU melewati Checkpoint (1) — tidak ada shortcut

ATURAN OTONOMI AGENT:
  · Agent A2–A9: jika Task Brief tersedia di ZIP → langsung kerjakan, TIDAK bertanya ke Nugget-san
  · Agent A2–A9: setelah selesai → eksport ZIP sesuai format standard, tulis notifikasi singkat di chat
  · Crispy: setelah dispatch → tidak perlu konfirmasi ke Nugget-san, tunggu hasil dari agent
  · Crispy: setelah merge selesai → tampilkan main menu secara otomatis, tidak menunggu input
  · Fluffy: exception — boleh diskusi kurikulum langsung dengan Nugget-san sebelum issue diterbitkan
    (lihat section 2e untuk Fluffy issue flow)

DOCS/ARCHIVE CONVENTION (GOV-013-A):
  docs/archive/ — file retired, laporan superseded, notifikasi one-off.
  Trigger: Crispy move file ke sini saat tidak lagi direferensikan dalam active governance.
  Agent TIDAK menyentuh docs/archive/ — ini tanggung jawab Crispy saat merge.

SESSION-RECAP TRIM RULE (GOV-013-A):
  SESSION-RECAP aktif (SESSION-RECAP.txt) hanya berisi 2 GOV versions terkini.
  Kalau lebih dari 4 GOV entries → Crispy trim ke SESSION-RECAP-ARCHIVE.txt saat merge.

LARANGAN KERAS:
  · Semua agent DILARANG mem-bypass flow — tidak ada pengiriman langsung ke Crispy atau pembuatan FOR-INTEGRATOR ZIP sendiri
  · Crispy DILARANG mendispatch task tanpa DISPATCH CLEARANCE dari Crunchy
  · Crispy DILARANG membuat atau menandatangani DISPATCH-CLEARANCE.md — hanya Crunchy yang berwenang
  · Agent A2–A9 DILARANG memulai pengerjaan tanpa DISPATCH-CLEARANCE.md dari Crunchy di ZIP
  · Setiap dispatch baru — termasuk setelah REJECT — WAJIB melewati Checkpoint (1)
  · PATCH-NOTES.md adalah satu-satunya saluran komunikasi konteks dari agent ke Crunchy
  · Nugget-san adalah satu-satunya courier file antar agent — tidak pernah berubah
  · Spicy DILARANG membuat verdict apapun — findings Spicy = data, bukan verdict
  · Script baru ke tools/ WAJIB melalui flow normal (script request via PATCH-NOTES → Crunchy evaluate → Crispy dispatch ke Spicy)
