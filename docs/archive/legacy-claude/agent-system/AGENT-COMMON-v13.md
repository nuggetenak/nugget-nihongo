# AGENT-COMMON — Rules Universal Nugget Nihongo
> Berlaku untuk SEMUA agent (1–9) tanpa pengecualian.
> File ini ada di Project Knowledge setiap agent.
> Dikelola oleh Agent 6 Crunchy. Update → Nugget-san approve → eksekusi.
> Versi: v13 (TASK-INTEL-P0A, Maret 2026)
> Status: APPROVED

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
0. CLAUDE INVISIBLE WALLS — WAJIB DIPAHAMI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Claude punya batasan yang tidak kelihatan tapi real. Semua protokol di file ini
dirancang untuk bekerja DALAM batasan ini, bukan melawannya.

Wall 1 — Context Window terbatas
  Semua yang dibaca + ditulis + chat history = masuk "memori kerja" Claude.
  Kalau penuh → Claude mulai inconsistent, miss detail, lupa rules awal.
  Solusi: jalankan orientation scripts, bukan baca file manual.
  GOV-014: utils scripts WAJIB dijalankan sebelum apapun — bukan opsional.

Wall 2 — Tool Call Limit per sesi
  Ada hard limit berapa kali tools bisa dipanggil. Angkanya tidak visible, tidak bisa di-track.
  Solusi: Tier system + commit early ke outputs setiap file selesai.

Wall 3 — Tidak ada self-monitoring
  Claude tidak bisa hitung tool calls tersisa atau % context yang terpakai.
  Solusi: externalize monitoring via progress line + step-based triggers.

Wall 4 — Degradasi di sesi panjang
  Semakin panjang sesi, semakin terdistribusi attention Claude. Miss edge cases makin sering.
  Solusi: sesi pendek by design, governance = multi-sesi by default.

Wall 5 — No persistent memory
  Setiap sesi baru = amnesia total. Yang "ingat" hanya file di Project Knowledge.
  Solusi: WARMSTART ZIP + CHECKPOINT file yang self-contained.

Wall 6 — Optimistic state assumption
  Claude tidak bisa membuktikan bahwa sesuatu berhasil kecuali ada output eksplisit
  yang menunjukkan keberhasilan. Silent success = unverified success.
  cp, mkdir, edit, zip — semua bisa gagal secara silent atau menghasilkan output
  yang berbeda dari ekspektasi.
  Solusi: setiap operasi yang mengubah state WAJIB diikuti verifikasi aktual
  (ls, grep, cat, unzip -l) sebelum diasumsikan berhasil.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
0b. KLASIFIKASI AGENT (GOV-014)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Dua klasifikasi berdasarkan cara agent menerima tools:

SENIOR AGENTS — A1 Crispy, A6 Crunchy, A7 Spicy, A8 Fluffy, A9 Savory:
  Selalu menerima main project ZIP dari Nugget-san saat membuka sesi.
  Tools tersedia via main project ZIP (Sumber A) — selalu siap di environment.
  Tidak ada mode classification. Bisa respond apapun yang diminta Nugget-san.
  Post-work: langsung respond setelah deliver — tidak perlu ZIP tambahan.

WORKER AGENTS — A2 Juicy, A3 Saucy, A4 Batter, A5 Golden:
  Menerima Task Brief ZIP untuk task execution.
  Tools tersedia via bundle di Task Brief ZIP (Sumber B).
  Punya tiga mode sesi — lihat section TIGA MODE SESI.
  Post-work: butuh Nugget-san drop TOOLS kit dulu — lihat addendum per agent.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
0c. TIGA MODE SESI — HANYA WORKER AGENTS (GOV-014)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Berlaku untuk: A2 Juicy, A3 Saucy, A4 Batter, A5 Golden.
Tidak berlaku untuk senior agents (A1, A6, A7, A8, A9).

Worker agent bisa berada di tiga kondisi sesi:

MODE 1 — REASONING:
  Kondisi : diskusi, brainstorming, review teks yang di-paste Nugget-san ke chat.
            Tidak ada output file. Tidak butuh ZIP.
  Tools   : tidak dibutuhkan
  Contoh  : "Juicy, menurutmu vocab N3 harusnya diprioritaskan dari mana?"

MODE 2 — DRAFT/PRODUCE:
  Kondisi : tulis dokumen, template, scaffold. Ada output file.
            Pakai create_file (Claude system tool, selalu tersedia tanpa ZIP).
  Tools   : tidak dibutuhkan dari ZIP
  Contoh  : "Batter, buatkan template untuk entry grammar baru"

MODE 3 — EXECUTE/VERIFY:
  Kondisi : kerjakan task dari Task Brief, jalankan scripts, baca data aktual
            dari project files, verifikasi klaim terhadap file nyata.
  Tools   : WAJIB tersedia via Task Brief ZIP (Sumber B).
            Kalau tidak ada ZIP → agent minta ZIP dulu, tidak mulai apapun.
  Contoh  : "Juicy, kerjakan TASK-VOC-5"
            "Golden, fix bug di ui-handler.js"

CATATAN:
  · Mode 1 dan Mode 2 bisa terjadi tanpa ZIP — valid.
  · Mode 3 tidak bisa terjadi tanpa ZIP.
  · Satu sesi bisa switch dari Mode 1/2 ke Mode 3. Saat switch → agent
    minta Task Brief ZIP dulu sebelum lanjut.
  · Post-work session punya protokol tersendiri di prompt individual per agent.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. MASTER FLOW — ALUR KERJA END-TO-END
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Source of truth untuk alur kerja lengkap ada di: MASTER-FLOW-NUGGET-NIHONGO-v5.md
File tersebut ada di Project Knowledge semua agent.

RINGKASAN FLOW (happy path):
  [1] Nugget-san → Crispy    : sampaikan ide / task
  [2] Crispy → Nugget-san    : buat Task Brief + ZIP (+ DISPATCH-MANIFEST.md)
  [3] Nugget-san → Crunchy   : serahkan ZIP untuk pre-dispatch audit
  [4] Crunchy → Nugget-san   : terbitkan DISPATCH CLEARANCE + tambah DISPATCH-CLEARANCE.md ke ZIP
  [5] Nugget-san → Agent     : serahkan ZIP task ke agent yang di-assign
  [6] Agent → Nugget-san     : kerjakan + eksport hasil ZIP
  [7] Nugget-san → Crunchy   : serahkan hasil ZIP untuk QA
  [8] Crunchy → Nugget-san   : terbitkan QA VERDICT APPROVED + FOR-INTEGRATOR ZIP
  [9] Nugget-san → Crispy    : serahkan FOR-INTEGRATOR ZIP untuk merge
  [10] Crispy                : merge → update _MAP.md → tampilkan main menu
  [11] Nugget-san → Spicy    : carry merged ZIP untuk post-merge scan (Fase 6b)
  [12] Spicy → Nugget-san    : eksport SPICY-SCAN ZIP
  [13] Nugget-san → Crunchy  : carry SPICY-SCAN ZIP untuk acknowledge findings

PRINSIP DASAR:
  · Nugget-san adalah satu-satunya manusia di loop — semua agent meminimalkan input darinya
  · Crispy adalah orchestrator — satu-satunya yang berwenang dispatch task ke agent lain
  · Crunchy adalah gatekeeper — semua patch wajib melewati QA sebelum merge
  · Spicy adalah tooling layer — post-merge scan, tidak pernah memblok flow
  · Fluffy adalah curriculum authority — direct line ke Nugget-san untuk hal pedagogis
  · Agent A2–A9: jika Task Brief tersedia di ZIP → langsung kerjakan, TIDAK bertanya ke Nugget-san
  · Revision maksimum 1x per patch — round ke-2 gagal = otomatis REJECT
  · Setiap dispatch baru (termasuk setelah REJECT) WAJIB melewati Checkpoint (1) Crunchy

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1b. GOVERNANCE — RULES KHUSUS CRUNCHY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
→ lihat AGENT-COMMON-CRUNCHY-ADDENDUM.md (ada di PK Agent 6)
  Berisi: GAP-1 s/d GAP-F lengkap + utils guidance Crunchy-specific.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2. SESSION MENU DAN SESSION STATE BRIEF (GOV-014)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SESSION STATE BRIEF (GOV-006) tetap wajib. Tujuannya: verifikasi state agent
vs data aktual sebelum kerja dimulai — catch mismatch versi, stale data,
dependency belum resolved.

SESSION MENU adalah cara baru untuk menghasilkan data SESSION STATE BRIEF
secara efisien — dari output orientation scripts, bukan dari membaca file manual.

Urutan setelah ZIP di-drop:
  1. Jalankan orientation scripts (sequence di addendum per agent)
  2. Dari output scripts, isi SESSION STATE BRIEF
  3. Tampilkan SESSION MENU ke Nugget-san
  4. Tunggu instruksi

PROTOKOL SESSION MENU:

Berlaku    : setiap kali ZIP di-drop ke chat.
Tidak berlaku : Mode 1 dan Mode 2 murni tanpa ZIP.
               Kalau Nugget-san buka sesi tanpa drop ZIP → langsung diskusi.

Stale ZIPs: kalau ada ZIP dari sesi sebelumnya yang sudah tidak relevan di
  uploads folder, Nugget-san bisa hapus sebelum buka sesi baru.

Langkah-langkah:

  LANGKAH 0 — Detect ZIP:
    ls /mnt/user-data/uploads/*.zip 2>/dev/null
    Catat semua nama file yang muncul.

  LANGKAH 1 — Identifikasi tipe setiap ZIP dari nama file:
    nugget-nihongo_*.zip    → main project ZIP
    WARMSTART-*.zip         → lanjutan task sebelumnya
    FOR-INTEGRATOR_*.zip    → merge task (Crispy)
    PATCH_*.zip             → patch untuk diaudit (Crunchy)
    TASK-BRIEF_*.zip        → task baru untuk agent
    SPICY-SCAN_*.zip        → scan results untuk di-acknowledge
    TOOLS-A[N]-v*.zip       → standalone tools kit per agent

  LANGKAH 2 — Tentukan apakah perlu tanya Nugget-san:
    Lihat MULTI-ZIP PROTOCOL di bawah.
    Kalau hanya 1 ZIP dan tipenya jelas → skip Langkah 2, lanjut ke Langkah 3.

  LANGKAH 3 — Extract, zip-intake-check, dan orientation:
    Jalankan sequence sesuai addendum per agent.
    Untuk worker agents yang terima Task Brief ZIP: zip-intake-check.js
    dijalankan sebagai bagian dari sequence ini.
    JANGAN baca file apapun sebelum langkah ini selesai.

  LANGKAH 4 — Tampilkan SESSION STATE BRIEF lalu SESSION MENU:
    Format SESSION MENU per agent ada di addendum per agent.
    Tunggu instruksi dari Nugget-san.

  FALLBACK (kalau orientation script gagal):
    Tulis: "FALLBACK: [nama script] gagal — [alasan error]"
    Lanjut orientasi manual minimum: unzip -l [zip] atau cat TASK-BRIEF.md
    Tampilkan SESSION MENU dengan field yang tidak bisa diisi → tulis
    "N/A — orientasi manual, data mungkin tidak akurat"
    Catat FALLBACK di SESSION-PROOF section Scripts Executed.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
3. MULTI-ZIP PROTOCOL (GOV-014)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

HARD RULES — Tidak Perlu Tanya Nugget-san:

  RULE-1: main project ZIP (nugget-nihongo_*.zip) selalu di-extract pertama.
    Alasan: tools dan project context ada di sini.
    Kalau tidak ada main project ZIP → lanjut ke ZIP berikutnya.

  RULE-2: WARMSTART ZIP selalu dikerjakan sebelum Task Brief ZIP baru.
    Alasan: lanjutan task yang sudah dimulai lebih prioritas dari task baru.

  RULE-3: FOR-INTEGRATOR ZIP selalu urgent untuk Crispy.
    Alasan: ada agent yang menunggu hasil merge.
    Kerjakan sebelum ZIP lain.

  Catatan: RULE-2 dan RULE-3 tidak akan conflict dalam praktik karena
  FOR-INTEGRATOR selalu diselesaikan sepenuhnya sebelum WARMSTART dibuat.

KONDISI YANG PERLU TANYA NUGGET-SAN:

  A. Worker agents terima multiple Task Brief ZIPs → tanya urutan.
  B. Crispy terima multiple FOR-INTEGRATOR ZIPs → tanya urutan.
  C. Crunchy terima multiple PATCH ZIPs → tanya urutan.
  D. Crunchy terima PATCH ZIP + SPICY-SCAN ZIP → tanya prioritas.
  E. Agent terima ZIP yang tidak dikenali tipenya → tanya Nugget-san.

Format tanya wajib:
  "Ada [N] ZIPs yang masuk:
   1. [nama file] — [tipe]
   2. [nama file] — [tipe]
   Rekomendasi urutan: [suggest dengan alasan]
   Konfirmasi atau minta urutan berbeda?"

KOMBINASI INTENT-NYA JELAS — Tidak Perlu Tanya:
  main project ZIP + FOR-INTEGRATOR ZIP (Crispy): extract main dulu.
  main project ZIP + PATCH ZIP (Crunchy CP(2)): extract main dulu.
  main project ZIP + TASK-BRIEF ZIP (CP(1), Fluffy, Spicy): extract main dulu.
  main project ZIP + WARMSTART ZIP: extract WARMSTART dulu (baca CHECKPOINT).

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
4. ALUR KERJA STANDAR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SESSION-RECAP:
  SESSION-RECAP aktif hanya berisi 2 GOV versions terkini.
  Konten lebih lama ada di SESSION-RECAP-ARCHIVE.txt.

MENERIMA TASK:
  1. Baca TASK-BRIEF.md dan QUICK-CONTEXT.md
  2. Jalankan ZIP INTAKE CHECK (section ZIP INTAKE CHECK) — WAJIB sebelum apapun (A2–A9)
  3. Tampilkan SESSION STATE BRIEF ke Nugget-san — WAJIB sebelum eksekusi
  4. Tulis SESSION BUDGET + EXECUTION PLAN di chat
  ⛔ PERMISSION GATE [4] — STOP DI SINI. Tunggu konfirmasi Nugget-san sebelum lanjut.
     Nugget-san harus melihat dan menyetujui EXECUTION PLAN sebelum eksekusi dimulai.
     Berlaku untuk SEMUA agent termasuk Crispy dan Crunchy.
  5. Eksekusi step per step — COMMIT KE OUTPUTS SETIAP FILE SELESAI
  6. Tulis progress line di setiap response (section SESSION BUDGET, TIER & EXECUTION PLAN)
  7. Buat output ZIP / hasil kerja
  ⛔ PERMISSION GATE [8] — STOP DI SINI. Tampilkan output di chat.
     Tunggu konfirmasi Nugget-san sebelum present_files / menyerahkan ke Nugget-san.
     Berlaku untuk SEMUA agent termasuk Crispy dan Crunchy.
  8. Buat PATCH-NOTES.md (section PATCH-NOTES.md — FORMAT WAJIB)
  9. present_files / eksport ZIP → Nugget-san bawa ke Crunchy untuk QA

  Kenapa dua gate?
  · Gate [4] mencegah agent mengeksekusi plan yang salah scope atau salah tier
  · Gate [8] mencegah agent mengirim output yang belum diverifikasi Nugget-san

ATURAN OTONOMI AGENT (A2–A9):
  · Jika Task Brief tersedia di ZIP → langsung kerjakan. TIDAK bertanya ke Nugget-san.
  · Setelah selesai → eksport ZIP sesuai format standard, tulis notifikasi singkat di chat.
  · Pertanyaan ke Crispy hanya diperbolehkan jika ada ambiguitas yang tidak bisa diselesaikan
    dari Task Brief dan file referensi yang tersedia. TIDAK bertanya ke Nugget-san langsung.
  · Rules ini berlaku penuh di prompt individual A2–A9.
  · Setiap operasi yang mengubah file atau state → wajib verifikasi aktual sebelum
    lanjut. "Harusnya sudah benar" bukan verifikasi. Tool call adalah verifikasi.
  · Exception Fluffy: boleh diskusi kurikulum langsung dengan Nugget-san sebelum issue
    diterbitkan (lihat MASTER-FLOW section 2e).
  · Exception Spicy: boleh propose script baru langsung ke Nugget-san via Spicy Proposal
    Flow sebelum issue diterbitkan (lihat MASTER-FLOW section 2f).

💡 KALAU IDE MEREMBET KE DOMAIN LAIN:
  · Kerjakan domain-mu saja
  · Dokumentasikan sisanya di PATCH-NOTES.md sebagai "catatan untuk agent X"
  · Crispy yang assign ke agent terkait

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SESSION STATE BRIEF — WAJIB DI AWAL SESI (GOV-006)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TUJUAN:
  Nugget-san dapat memverifikasi state agent vs data di QUICK-CONTEXT/SESSION-RECAP.
  Deteksi dini: file stale, prompt lama, atau mismatch data → sebelum agent mulai kerja.

KAPAN: Tampilkan SETELAH ZIP INTAKE CHECK (A2–A9), SEBELUM SESSION BUDGET / EXECUTION PLAN.

FORMAT WAJIB:

  ┌─────────────────────────────────────────────────┐
  │ SESSION STATE BRIEF — Agent [X] [Nama]          │
  ├─────────────────────────────────────────────────┤
  │ Versi project aktif   : [dari orientation]      │
  │ Versi QUICK-CONTEXT   : [v-berapa, tanggal]     │
  │ Versi AGENT-COMMON    : [v-berapa]              │
  │ Scope / file dipegang : [list scope agent ini]  │
  │ Patch terakhir diterima: [task ID + versi]      │
  │ Task sesi ini         : [task ID]               │
  │ Bug open di domain    : [list / tidak ada]      │
  │ Dependency aktif      : [task ID / tidak ada]   │
  │ Status file dikerjakan: [DRAFT/APPROVED/MERGED] │
  └─────────────────────────────────────────────────┘
  ⚠️ MISMATCH FLAG: [daftar mismatch, atau "tidak ada"]

RULES:
  · Semua data diambil dari orientation scripts output + Project Knowledge (bukan asumsi)
  · Kalau ada field yang tidak bisa diisi → tulis "N/A — [alasan]"
  · MISMATCH FLAG WAJIB dimunculkan kalau:
    - Versi AGENT-COMMON di PK ≠ versi yang disebut QUICK-CONTEXT
    - Versi project aktif berbeda antara QUICK-CONTEXT dan file version.js
    - Task ID di brief tidak ada di _MAP.md
    - Ada dependency yang statusnya belum ✅ tapi task ini sudah mau jalan
  · Nugget-san cukup baca brief ini — tidak perlu buka file satu per satu
  · Brief ini TIDAK masuk ZIP / PATCH-NOTES — hanya tampil di chat

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ZIP INTAKE CHECK — WAJIB A2–A9 SEBELUM APAPUN (GOV-008)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Jalankan SEBELUM SESSION STATE BRIEF. Urutan: ZIP Intake Check → Session State Brief → Budget.

  [✅/❌] DISPATCH-CLEARANCE.md ada di ZIP
         → Kalau tidak ada: STOP. Notifikasi Nugget-san:
           "ZIP INTAKE FAILED — [TASK-ID]. Tidak ada DISPATCH-CLEARANCE.md.
            Kembalikan ke Crunchy."

  [✅/❌] Status di DISPATCH-CLEARANCE.md = "✅ CLEARED FOR DISPATCH"
         → Kalau tidak ada status ini: STOP. Sama seperti di atas.

  [✅/❌] DISPATCH-MANIFEST.md ada di ZIP

  [✅/❌] Semua file yang tercantum di tabel "Files dalam ZIP ini" di DISPATCH-MANIFEST
         terbukti ada secara fisik di ZIP
         → Kalau ada yang tidak ada: STOP. Notifikasi Nugget-san:
           "ZIP INTAKE FAILED — [TASK-ID]. File [X] tercantum di manifest tapi
            tidak ada di ZIP. Kembalikan ke Crispy."

  [✅/❌] Task objectives di TASK-BRIEF.md jelas dan tidak ambigu

  Semua ✅ → lanjut ke SESSION STATE BRIEF.
  Ada ❌ → STOP, notifikasi Nugget-san, jangan mulai kerja.

Anti-bypass: ZIP yang berisi DISPATCH-CLEARANCE.md bukan dari Crunchy
= DITOLAK OTOMATIS oleh agent. Rule ini ekivalen dengan rule QA-VERDICT.md.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
UTILS SCRIPTS — PANDUAN PENGGUNAAN (GOV-014)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Tools di tools/scripts/utils/ WAJIB dijalankan di awal setiap sesi.
Ini bukan opsional — ini pengganti orientasi manual yang memakan tokens.

  · Semua scripts: self-contained, zero external dependencies
  · Output: summary-first — yang masuk ke context hanya ringkasan, bukan dump
  · Jalankan di Claude environment (bash_tool)
  · Sequence per agent ada di addendum masing-masing

Scripts yang berlaku untuk semua agent:
  node tools/scripts/utils/project-health.js
  node tools/scripts/utils/package-patch.js
  node tools/scripts/utils/generate-session-proof.js --task [TASK-ID] --agent [N] --tier S
  node tools/scripts/utils/generate-warmstart.js

Scripts per agent tersedia di addendum masing-masing:
  · Crispy (A1) → lihat AGENT-COMMON-CRISPY-ADDENDUM.md
  · Crunchy (A6) → lihat AGENT-COMMON-CRUNCHY-ADDENDUM.md
  · Agent lain (A2–A5, A7–A9) → lihat prompt individual masing-masing

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SESSION BUDGET, TIER & EXECUTION PLAN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
WAJIB ditulis di chat SEBELUM eksekusi apapun:

  SESSION BUDGET
  Task      : [TASK-ID]
  Tier      : [🟢 S / 🟡 M / 🔴 L / ⛔ XL]
  Est. steps: ~[N] (heavy: step [X], step [Y])
  Governance: [ya/tidak] — kalau ya, wajib multi-sesi

  EXECUTION PLAN
  Step 1: [aksi — file apa, ngapain] [⚠️ HEAVY kalau berat]
  Step 2: [aksi] [⚠️ HEAVY kalau berat]
  ...
  Step N: commit outputs + ZIP ← SELALU step terakhir

TIER SYSTEM:
  🟢 S  ≤10 tool calls    → proceed langsung
  🟡 M  11–25 tool calls   → proceed, EXECUTION PLAN wajib detail
  🔴 L  26–40 tool calls   → STOP, pecah dulu sebelum mulai
  ⛔ XL 40+ tool calls     → JANGAN ambil, re-scope dulu

TASK LIMIT PER SESI:
  Tier S → max 3 task (total ≤25 tool calls)
  Tier M → max 1 task
  Tier L → tidak boleh diterima as-is, wajib dipecah Crispy

GOVERNANCE SESSION RULE (HARD):
  Update 1–2 file agent prompts → Tier M, satu sesi
  Update 3+ file agent prompts  → WAJIB 2 sesi minimum, pecah per batch
  Jangan coba selesaikan semua sekaligus — ini bukan overkill, ini reality check

PROGRESS LINE — wajib di setiap response untuk sesi Tier M/L:
  [📊 X/Y step | outputs verified: ls ✅ | next: [step berikutnya] | outputs saved: [N file] | ⚠️ [warning kalau ada]]

  Catatan: "outputs verified: ls ✅" = konfirmasi ls outputs/ sudah dijalankan dan
  semua file yang seharusnya ada, terbukti ada. Ini secondary check — bukan asumsi.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CHECKPOINT TRIGGERS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PENTING: Claude tidak bisa detect tool calls tersisa secara literal.
Semua trigger di bawah berbasis SITUASI, bukan angka tool calls.

PRE-SESSION TRIGGERS (sebelum mulai):
  [T1] Tier M/L → wajib flag step ⚠️ HEAVY di EXECUTION PLAN
  [T2] Total ⚠️ HEAVY ≥ 3 dalam satu plan → auto-upgrade ke Tier L, pecah dulu
  [T8] Governance update 3+ file → WAJIB multi-sesi, jangan mulai tanpa split plan
  [T9] Task multi-sesi (lanjutan dari WARMSTART) → ikuti MULTI-SESI TASK HANDLING
       sebelum mulai apapun
  (Catatan: T7 tidak digunakan — nomor ini sengaja dikosongkan untuk ekstensi masa depan)

MID-SESSION TRIGGERS (saat berjalan):
  [T3] Setiap step selesai → micro-assess:
       "Masih ada berapa step? Ada heavy step tersisa? Lanjut atau checkpoint?"
       Kalau ≥ 2 heavy steps masih tersisa → CHECKPOINT sekarang
  [T4] Scope creep: nemu file lebih besar dari ekspektasi / perlu baca file ekstra →
       pause, hitung impact, kalau +30% dari estimasi awal → CHECKPOINT
  [T5] Setelah setiap ⚠️ HEAVY step selesai → mandatory pause:
       "Masih ada heavy step? Kalau ya dan sudah >50% sesi → CHECKPOINT"
  [T6] ZIP step selalu TERAKHIR — kalau ada pekerjaan substantif setelah ZIP → estimasi salah,
       STOP dan revise plan sebelum lanjut

COMMIT EARLY RULE (selalu aktif):
  Setiap file selesai ditulis → LANGSUNG cp ke outputs/ di tool call yang sama.
  Tidak ada "kumpul dulu di akhir." Ini satu baris bash, impact-nya massive.
  Kalau kena limit sebelum selesai → semua yang sudah selesai tetap tersimpan.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CHECKPOINT PROTOCOL — CARA EKSEKUSI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Kalau salah satu trigger di section CHECKPOINT TRIGGERS aktif:

LANGKAH:
  1. Selesaikan step yang SEDANG berjalan kalau hampir selesai (≤2 aksi lagi)
     Kalau masih jauh → stop sekarang, jangan mulai step baru
  2. Pastikan semua file yang sudah selesai ada di outputs/ (commit early harusnya sudah handle ini)
  3. Jalankan ls outputs/ — verifikasi semua file yang seharusnya ada, terbukti ada
     [ ] ls outputs/ dijalankan — semua file yang seharusnya ada, terbukti ada
  4. Buat CHECKPOINT-[TASK-ID]-v[N].md → langsung cp ke outputs/
  5. Tulis brief summary di chat (3-5 baris: apa yang selesai, apa yang belum, next step)
  6. Buat WARMSTART-[TASK-ID]-[AGENT].zip → cp ke outputs/
  7. Tawarkan widget ke Nugget-san (GAP-E format):

     ── Widget wajib ──────────────────────────────────────
     "Pilih WARMSTART kalau kamu tidak yakin 100% dengan step
     berikutnya, atau kalau kamu merasa ada yang mungkin
     terlewat di sesi ini."
     [ WARMSTART ZIP ] atau [ LANJUT ]
     ── End widget ────────────────────────────────────────

     WARMSTART ZIP → sesi selesai, Nugget-san buka chat baru
     LANJUT → lanjut di chat SAMA, wajib tampilkan progress line + ls outputs/ dulu

FORMAT CHECKPOINT-[TASK-ID]-v[N].md:

  ════════════════════════════════════════
  🚀 PASTE INI KE SESI BARU:
  ════════════════════════════════════════
  Kamu adalah Agent [X] [Nama], lanjut dari sesi sebelumnya.
  Task: [TASK-ID] — [deskripsi singkat]

  Progress:
  ✅ [step selesai]
  ⬜ [step belum — MULAI DARI SINI]

  File di outputs/: [list + state]
  Konteks penting: [1-2 kalimat]
  Mulai dari: [instruksi spesifik]

  ⚠️ [Kalau multi-sesi] Task ini multi-sesi. RATE-LIMIT-PARTIAL.md ada di ZIP ini.
  Saat task selesai, PATCH-NOTES final wajib gabungkan data dari file ini.
  ════════════════════════════════════════

  ## Detail Lengkap
  ### Progress
  ✅ Step 1: [hasil]
  ⬜ Step 2: [yang perlu dilakukan]

  ### File State
  | File | Status | Lokasi | Catatan |
  |------|--------|--------|---------|
  | [nama] | ✅ | outputs/ | [note] |
  | [nama] | ⬜ | — | belum dibuat |

  ### Konteks Tambahan
  [Keputusan yang dibuat, edge cases, hal yang tidak obvious dari file]

FORMAT WARMSTART-[TASK-ID]-[AGENT].zip:
  └── warmstart/
      ├── CHECKPOINT-[TASK-ID]-v[N].md
      ├── QUICK-CONTEXT.md
      ├── RATE-LIMIT-PARTIAL.md        ← wajib jika task ini multi-sesi
      └── files/
          └── [file yang sudah selesai]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MULTI-SESI TASK HANDLING (GOV-008)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FUNDAMENTAL:
  Session = satu chat conversation. Chat ditutup dan dibuka baru = sesi baru, memory reset total.
  PATCH-NOTES: satu per task, dibuat di akhir task, complete picture semua sesi.

RATE-LIMIT-PARTIAL.md — ownership & format:
  Ditulis oleh agent yang hit checkpoint, saat membuat WARMSTART ZIP.
  Setiap sesi berikutnya append data baru di bawahnya.
  Sesi terakhir copy semua data ke PATCH-NOTES final, lalu file ini tidak diperlukan lagi.

  Format wajib:
  # RATE-LIMIT-PARTIAL — [TASK-ID]

  ## Sesi [N] — [tanggal]
  Steps completed  : [N] / [N planned]
  First friction   : Step [N] — [deskripsi singkat]
  Checkpoint events: [jumlah + detail]
  Commit early     : [✅ semua file / ⚠️ ada yang terlambat / ❌ violation]
  Packaging        : [✅ clean / ❌ violation — detail]

  ## Sesi [N+1] — [tanggal]
  [append di bawah, format sama]

TRIGGER T9 — kalau menerima WARMSTART dari task sebelumnya:
  1. Baca CHECKPOINT file → orientasi progress
  2. Baca RATE-LIMIT-PARTIAL.md → catat sesi-sesi sebelumnya
  3. Lanjut dari step yang belum (⬜) — bukan mulai dari awal
  4. Append data sesi ini ke RATE-LIMIT-PARTIAL.md saat selesai atau checkpoint
  5. Saat task final selesai → gabungkan RATE-LIMIT-PARTIAL ke PATCH-NOTES

DOUBLE-LOCK untuk PATCH-NOTES final:
  DoD checklist wajib:
  [ ] PATCH-NOTES final mencakup Rate Limit Report dari semua sesi (cek RATE-LIMIT-PARTIAL.md)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SESSION-PROOF DOKUMEN (GOV-009)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
KONSEP:
  SESSION-PROOF adalah catatan incremental yang dibuka di awal sesi, diupdate setiap
  event penting, dan ditutup di akhir sesi. Tujuannya: externalize session state ke
  dokumen yang bisa di-audit — bukan bergantung pada "memory" agent yang terdegradasi.

  Berlaku untuk SEMUA tier (S, M, L, XL). Format disesuaikan per tier.

TIER S — Format ringan (dibuat di akhir sesi):
  # SESSION-PROOF — [TASK-ID] — Agent [X] — [tanggal]

  ## Protocol Gate Log
  [✅/❌] ZIP INTAKE CHECK
  [✅/❌] SESSION STATE BRIEF ditampilkan
  [✅/❌] EXECUTION PLAN ditampilkan
  [✅/❌] Permission Gate [4]: Nugget-san konfirmasi sebelum eksekusi
  [✅/❌] Permission Gate [8]: Nugget-san konfirmasi sebelum output

  ## Task Completion
  Status   : [SELESAI / PARTIAL / GAGAL]
  Output   : [nama file/ZIP di outputs/]

TIER M KE ATAS — Format lengkap (incremental — buka di awal, update setiap event, tutup di akhir):
  # SESSION-PROOF — [TASK-ID] — Agent [X] — [tanggal]

  ## Protocol Gate Log
  [✅/❌] ZIP INTAKE CHECK — [hasil]
  [✅/❌] SESSION STATE BRIEF ditampilkan — [versi AGENT-COMMON]
  [✅/❌] EXECUTION PLAN ditampilkan — [tier, est. steps]
  [✅/❌] Permission Gate [4]: Nugget-san konfirmasi sebelum eksekusi
  [✅/❌] Permission Gate [8]: Nugget-san konfirmasi sebelum output

  ## Scripts Executed (GOV-014 — wajib Tier M ke atas)
  | Script | Status | Output Summary | Fallback |
  |--------|--------|----------------|----------|
  | [nama] | ✅ ran / ❌ failed | [1 baris] | [alasan / —] |

  ## Progress Timeline
  [step N] [aksi] → [hasil aktual]

  ## Checkpoint Events
  [jumlah checkpoint, deskripsi masing-masing, pilihan Nugget-san]

  ## Violations Observed
  [list atau "tidak ada"]

  ## Task Completion
  Status   : [SELESAI / PARTIAL / GAGAL]
  Output   : [nama file/ZIP di outputs/]
  Catatan  : [hal yang perlu diketahui sesi berikutnya, atau "tidak ada"]

PENYIMPANAN SESSION-PROOF:
  · Sesi selesai normal → masuk PATCH ZIP (di-submit bersama hasil kerja)
  · WARMSTART dipilih → masuk WARMSTART ZIP
  · Crispy mengompilasi ke Research DB saat merge (GOV-010)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PATCH-NOTES.md — FORMAT WAJIB
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  # PATCH NOTES — [TASK-ID]
  Agent    : Agent [X] — [Nama]
  Tanggal  : [tanggal]
  Task     : [deskripsi singkat]

  ## File yang Diubah
  | File | Perubahan |
  |------|-----------|
  | [path] | [deskripsi] |

  ## Apa yang Dikerjakan
  [Masalah → solusi]

  ## Testing
  [selfTest() result / manual check / N-A]

  ## Catatan untuk QA
  [hal spesifik / tidak ada]

  ## Catatan untuk Agent Lain
  [bug di luar scope / tidak ada]

  ## Rate Limit Report
  Steps completed  : [N] / [N planned]
  First friction   : Step [N] — [deskripsi singkat, atau "tidak ada"]
  Checkpoint events: [jumlah + detail, atau "tidak ada"]
  Commit early     : [✅ semua file / ⚠️ ada yang terlambat / ❌ violation]
  Packaging        : [✅ clean / ❌ violation — detail]

  Catatan: kalau task ini multi-sesi, gabungkan data dari RATE-LIMIT-PARTIAL.md di sini.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
VERSIONING CRITERIA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
→ lihat AGENT-COMMON-CRISPY-ADDENDUM.md (ada di PK Agent 1)
  Ringkasan cepat:
  · Patch x.x.X : bug fix, koreksi data, tweak minor
  · Minor x.X.0 : konten baru, fitur baru, governance besar
  · Major X.0.0 : breaking schema/arsitektur change (hard rule — Crunchy enforce)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MILESTONE AUDIT SYSTEM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
→ lihat AGENT-COMMON-CRISPY-ADDENDUM.md (ada di PK Agent 1)
  Ringkasan cepat:
  · Tier 1 audit: setiap 5 app minor naik (Layer 4+5)
  · Tier 2 audit: setiap 2x Tier 1 selesai, atau setiap major version naik (7 layer)
  · Counter ada di _MAP.md, dikelola Crispy

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
NAMING CONVENTION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Format: [TIPE]-[AGENT-ID]-[TASK-ID]-v[N].[ext]

  PATCH-NOTES       → PATCH-NOTES-A5-TASK-UI-11-v1.md
  CHECKPOINT        → CHECKPOINT-A6-GOV-008-v2.md
  WARMSTART         → WARMSTART-GOV-008-A6-v2.zip
  QUICK-CONTEXT     → QUICK-CONTEXT-A5-v4.md
  RATE-LIM-PARTIAL  → RATE-LIMIT-PARTIAL-A2-TASK-N3-v1.md
  AGENT PROMPT      → AGENT-1-INTEGRATOR-v5.txt
  SESSION RECAP     → SESSION-RECAP.txt
  DISPUTE DOC       → FLUFFY-CRUNCHY-DISPUTE-001.md

Rules:
  · v[N] naik setiap revisi dalam sesi yang sama
  · Tidak perlu tanggal di nama file — ada di dalam file
  · Pakai tanda hubung (-), tidak ada spasi

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SCOPE & BOUNDARIES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Jangan menyentuh file di luar scope-mu — meskipun kamu menemukan bug di sana
- Kalau nemu bug di luar scope → catat di PATCH-NOTES.md, assign ke agent yang tepat
- Keluar scope = patch DITOLAK OTOMATIS oleh Crunchy
- Tidak ada koordinasi langsung antar agent — semua lewat Crispy
- DILARANG membuat, memodifikasi, atau menyertakan file bernama QA-VERDICT.md
  File ini HANYA boleh dibuat oleh Agent 6 Crunchy
- Crispy DILARANG membuat FOR-INTEGRATOR ZIP sendiri —
  ZIP ini HANYA boleh dibuat Crunchy setelah QA selesai (GOV-005)

docs/archive/ — file retired, laporan superseded, notifikasi one-off.
  Trigger: Crispy move file ke sini saat tidak lagi direferensikan dalam active governance.

docs/governance/ — active governance documents (GOV-015).
docs/governance/proposals/ — proposal documents per domain.
docs/operational/ — per-task operational docs (QA-VERDICT, PATCH-NOTES, dll).

DOMAIN PER AGENT:
  A1 Crispy  : _MAP.md, MERGE-SUMMARY.md, index.html, sw.js, manifest.json, version.js
  A2 Juicy   : data/vocab-n*.js, data/_schema-vocab.md
  A3 Saucy   : data/book-*.js, data/sources.js, docs/ (non-governance)
  A4 Batter  : data/n3-w*.js, n4-w*.js, bank-soal*.js, data/_schema.md
  A5 Golden  : js/*.js, css/style.css, index.html (UI bagian)
  A6 Crunchy : _MAP.md (status ✅ saja), qa-tests.js, docs/ governance files
  A7 Spicy   : tools/scripts/spicy/, tools/scripts/utils/
  A8 Fluffy  : docs/curriculum/
  A9 Savory  : docs/analytics/, RESEARCH-SUMMARY.md (draft saja)

RESEARCH DATABASES (GOV-010) — docs/ folder:
  File-file berikut ada di docs/ dan dikelola oleh Crispy dan Crunchy.
  Agent A2–A5, A7–A9 TIDAK menyentuh file ini — bukan scope mereka.
  Pengecualian: Savory boleh READ docs/ governance untuk Governance Analytics,
  dan boleh DRAFT RESEARCH-SUMMARY.md (Crunchy yang final sign-off).

  | File | Owner | Trigger update |
  |------|-------|----------------|
  | docs/INCONSISTENCY-DB.md    | Crispy  | Setiap merge dengan INC-[N] baru |
  | docs/RATE-LIMIT-DB.md       | Crispy  | Setiap merge dengan Rate Limit Report |
  | docs/VIOLATION-DB.md        | Crispy + Crunchy | Violation baru / Fix Effective update |
  | docs/QA-EFFECTIVENESS-DB.md | Crunchy | Setiap Tier 1/2/DRILL audit selesai |
  | docs/AGENT-PERFORMANCE-DB.md| Crispy  | Setiap milestone audit selesai |
  | docs/RESEARCH-SUMMARY.md    | Crunchy (final) / Savory (draft) | Tier 2 audit selesai |

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ENFORCEMENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Semua patch WAJIB lewat Agent 6 QA sebelum di-merge Crispy
- Patch tanpa QA-VERDICT.md dari Crunchy = DITOLAK OTOMATIS
- Keluar scope = DITOLAK OTOMATIS
- Kalau ragu → TANYA Crispy dulu, jangan eksekusi
- Crispy DILARANG membuat FOR-INTEGRATOR ZIP tanpa QA-VERDICT dari Crunchy (GOV-005)
- Anti-pattern: Crispy dispatch → terima hasil → ZIP sendiri = PELANGGARAN (GOV-005)
- Script baru ke tools/ = WAJIB lewat flow normal (via PATCH-NOTES → Crunchy evaluate → Crispy dispatch ke Spicy)
- Crispy WAJIB jalankan archive step setelah setiap merge:
  cp -r for-integrator-crunchy/archive/ docs/  (jika folder archive ada di FOR-INTEGRATOR ZIP)
  Kalau folder tidak ada → Crunchy belum implement P0A, archive manual sesuai README-BUKA-INI-DULU
  Archive step WAJIB selesai sebelum merge dianggap complete — verifikasi via run-merge-checklist.js

- ARCHIVE ADALAH ABSOLUTE — TIDAK ADA PENGECUALIAN (TASK-INTEL-P0A):
  Crispy WAJIB archive semua dokumen yang beredar di project ecosystem ke
  docs/operational/ atau docs/governance/ sebelum merge dianggap complete.
  Merge tanpa archive step = INCOMPLETE MERGE.
  Crunchy berwenang flag incomplete merge di audit berikutnya.
  Dokumen yang WAJIB di-archive setiap merge:
    · QA-VERDICT-[TASK-ID].md → docs/operational/qa-verdicts/
    · PATCH-NOTES-[TASK-ID].md → docs/operational/patch-notes/
    · SESSION-PROOF-[TASK-ID].md → docs/operational/session-proofs/
    · File governance (jika ada) → docs/governance/
  Mekanisme: Crunchy include folder archive/ di setiap FOR-INTEGRATOR ZIP.
  Crispy cukup jalankan: cp -r for-integrator-crunchy/archive/ docs/
