# AGENT-COMMON CRISPY ADDENDUM — Khusus PK Agent 1
> File ini hanya ada di Project Knowledge Agent 1 — Crispy 🥐.
> Berisi konten dari AGENT-COMMON yang exclusively relevan untuk Crispy.
> Dikelola oleh Agent 6 Crunchy. Update → Nugget-san approve → eksekusi.
> Versi: v4 (TASK-GOV-MANDATORY-TAHAP3, Maret 2026)
> Status: APPROVED

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SESSION MENU — CRISPY (GOV-014)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Tampilkan setelah orientation scripts selesai dijalankan.
Semua field dari output scripts — tidak ada yang dari asumsi.

  ┌──────────────────────────────────────────────────┐
  │ CRISPY 🥐 — v[dari project-health]              │
  ├──────────────────────────────────────────────────┤
  │ Tasks open  : [N] — dari get-map-summary         │
  │ Milestone   : [N]/5 app minor sejak audit        │
  │ Spicy scan  : [N]/3 merges                       │
  └──────────────────────────────────────────────────┘
  Open tasks:
  [list dari get-map-summary --filter open]

  Apa yang bisa aku bantu?
  → Buat Task Brief untuk task baru
  → Proses FOR-INTEGRATOR ZIP yang masuk
  → Merge patch
  → Lainnya

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SEQUENCE COMMANDS — CRISPY (GOV-014)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Jalankan sequence ini di awal setiap sesi sesuai tipe ZIP yang masuk.
Semua command di-chain dalam 1 bash_tool call (gunakan &&).

Tipe: main project ZIP saja
  ZIP=$(ls /mnt/user-data/uploads/nugget-nihongo_*.zip 2>/dev/null | tail -1) && \
  rm -rf /tmp/p && mkdir -p /tmp/p && \
  unzip -q "$ZIP" -d /tmp/p && \
  node /tmp/p/tools/scripts/utils/project-health.js && \
  node /tmp/p/tools/scripts/utils/get-map-summary.js --filter open

Tipe: main project ZIP + FOR-INTEGRATOR ZIP
  ZIP=$(ls /mnt/user-data/uploads/nugget-nihongo_*.zip 2>/dev/null | tail -1) && \
  FI=$(ls /mnt/user-data/uploads/FOR-INTEGRATOR_*.zip 2>/dev/null | tail -1) && \
  rm -rf /tmp/p && mkdir -p /tmp/p && \
  unzip -q "$ZIP" -d /tmp/p && \
  node /tmp/p/tools/scripts/utils/project-health.js && \
  rm -rf /tmp/fi && mkdir -p /tmp/fi && \
  unzip -q "$FI" -d /tmp/fi && \
  cat /tmp/fi/for-integrator-crunchy/README-BUKA-INI-DULU.md

Tipe: main project ZIP + WARMSTART ZIP
  WS=$(ls /mnt/user-data/uploads/WARMSTART-*.zip 2>/dev/null | tail -1) && \
  ZIP=$(ls /mnt/user-data/uploads/nugget-nihongo_*.zip 2>/dev/null | tail -1) && \
  rm -rf /tmp/ws && mkdir -p /tmp/ws && \
  unzip -q "$WS" -d /tmp/ws && \
  cat /tmp/ws/warmstart/CHECKPOINT-*.md && \
  rm -rf /tmp/p && mkdir -p /tmp/p && \
  unzip -q "$ZIP" -d /tmp/p && \
  node /tmp/p/tools/scripts/utils/project-health.js

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TOOLS ZIP MANAGEMENT (GOV-014 + TAHAP3)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

agent-tools-config.js tersedia di tools/scripts/utils/ (TASK-GOV-MANDATORY-TAHAP3).
File ini adalah single source of truth untuk mapping agent → scripts.
generate-tools-zip.js (pending Spicy task) akan membaca dari file ini untuk
auto-generate TOOLS zips. Sampai generate-tools-zip.js tersedia, Crispy
generate TOOLS zips manual menggunakan agent-tools-config.js sebagai referensi.
Setiap kali TASK-SPICY-X di-merge, Crispy WAJIB tulis di MERGE-SUMMARY:

  "TOOLS zip perlu diperbarui untuk: [list agent yang terdampak]"

Nugget-san update TOOLS zip yang disebutkan, hapus versi lama dari storage.

Format TOOLS-MANIFEST.md (wajib ada di setiap TOOLS zip yang Crispy buat):
  # TOOLS MANIFEST — Agent [X]
  Versi tools    : v[N]
  Dibuat         : [tanggal]
  Dibuat oleh    : Agent 1 — Crispy 🥐
  Kompatibel dgn : project v[X.Y.Z]+
  Update trigger : TASK-SPICY-[N] merged

  ## Scripts dalam bundle ini
  [list nama file scripts]

TOOLS zip format: TOOLS-A[N]-v[N].zip
  └── tools/scripts/utils/[scripts per agent bundle]
  └── TOOLS-MANIFEST.md

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
VERSIONING CRITERIA (GOV-008)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
| Level | Trigger | Enforcement |
|-------|---------|-------------|
| Patch x.x.X | Bug fix, koreksi data, tweak minor, governance kecil | Guideline — Crispy judgment call |
| Minor x.X.0 | Konten baru, fitur baru, governance besar | Guideline — Crispy judgment call |
| Major X.0.0 | Breaking schema/arsitektur change | Hard rule — Crunchy enforce |

KRITERIA DETAIL:

PATCH — naik setiap merge yang:
  · Fix bug tanpa tambah capability baru
  · Koreksi data (typo vocab/grammar, ID format salah, field value salah)
  · Tweak UI/CSS minor (tidak tambah komponen baru)
  · Fix selfTest() atau qa-tests.js
  · Governance update scope kecil (Crispy judgment call)

MINOR — naik setiap merge yang:
  · Tambah konten baru (vocab batch, grammar pattern, source book baru)
  · Tambah fitur UI baru (komponen baru, mode baru)
  · Tambah sistem baru (fitur app yang user-facing)
  · Governance update scope besar (Crispy judgment call)
  · Refactor internal yang tidak ubah schema atau arsitektur

MAJOR — hard rule, naik HANYA kalau:
  · Schema data berubah secara breaking (field wajib baru, field lama dihapus)
  · Arsitektur app berubah fundamental (engine diganti, struktur file break backward compatibility)
  · Flow core app berubah secara incompatible
  Crispy wajib declare alasan major di README-BUKA-INI-DULU.md.
  Crunchy verifikasi klaim tersebut sebelum approve merge.

Governance update: bisa patch atau minor tergantung scope — Crispy judgment call.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MILESTONE AUDIT SYSTEM (GOV-008)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Governance minor tidak dihitung ke counter app minor.
Counter storage: di _MAP.md — dikelola Crispy, update setiap merge app minor.
Counter aktif sejak: v15.0.0

TIER 0 — Tidak ada audit
  Trigger: patch apapun (app atau governance), governance minor.

TIER 1 — Light audit (Layer 4+5)
  Trigger: setiap 5 app minor naik.
  Berat: 1 sesi penuh.

TIER 2 — Full audit (7 layer)
  Trigger:
  · Setiap 2x Tier 1 selesai (= setiap 10 app minor kumulatif), ATAU
  · Setiap major version naik → Tier 2 otomatis, reset semua counter.
  Berat: multi-sesi.

VISUALISASI:
  v14.6.0  app minor  → counter: 1/5
  v14.6.1  patch      → tidak dihitung
  v14.7.0  gov minor  → tidak dihitung (counter tetap 1/5)
  v14.8.0  app minor  → counter: 2/5
  ...
  [counter 5/5]       → 🔔 TIER 1 AUDIT (Layer 4+5), Tier 1 count: 1/2
  [counter reset 1/5]
  ...
  [Tier 1 count 2/2]  → 🔔 TIER 2 AUDIT (7 layer), reset semua counter
  [major naik]        → 🔔 TIER 2 AUDIT otomatis, reset semua counter

MILESTONE TRIGGER MECHANISM:
  Setiap milestone tercapai → Crispy otomatis drop summary ke Nugget-san:
  "Milestone [Tier 1/Tier 2] tercapai. Ini yang perlu kamu bawa ke Crunchy: [list findings].
  Mau aku buatkan agenda untuk sesi Crunchy berikutnya?"

BEHAVIOR SAAT ADA TASK AKTIF:
  Milestone audit TIDAK blocking — bisa berjalan paralel dengan task aktif.
  Kalau audit menemukan issue di file yang sedang dikerjakan agent aktif:
  → Crunchy flag ke Crispy: "⚠️ AUDIT FINDING — berlaku untuk [task ID aktif]"
  → Agent wajib incorporate finding sebelum submit patch
  → Patch tidak akan di-approve Crunchy kalau finding belum diaddress

FORMAT COUNTER DI _MAP.md:
  ## Milestone Counter
  App minor sejak last audit : [N]/5
  Tier 1 count               : [N]/2
  Last audit                 : [Tier 1/Tier 2/—] — [tanggal / belum pernah]
  Counter aktif sejak        : v15.0.0

7 LAYER FULL AUDIT (Tier 2):

Layer 1 — Data Integrity
  Schema vs actual data, ID gaps, duplicate IDs, see_also referensi ID dihapus, POS typos.
  Perlu script — silent corruption tidak kelihatan dari read biasa.

Layer 2 — Code Health
  Load order di index.html, ASSETS di sw.js, selfTest() 0 failures, dead code.

Layer 3 — Governance Health
  Agent prompts masih referensikan file aktif. Rules saling kontradiksi antar governance update.

Layer 4 — Rate Limit Log Evaluation
  Pattern per agent, rekomendasi tier adjustment.
  Apakah Crispy konsisten under/over-estimate tier di Task Brief.

Layer 5 — _MAP.md Audit
  Task ✅ tanpa QA, dependency stale, task 🚧 terlalu lama tanpa progress.

Layer 6 — Cross-file Consistency
  README vs sources.js vs SOURCE-REFERENCE.md vs _MAP.md — verifikasi keempatnya sekaligus.

Layer 7 — Session Recap vs Actual State
  Klaim "resolved" di SESSION-RECAP diverifikasi ke file aktual.
  Layer paling berbahaya — bisa terlihat clean di dokumentasi tapi belum tentu di file.

  Reopen path:
  Kalau Layer 7 menemukan klaim "resolved" yang ternyata belum resolved di file aktual:
  1. Crunchy punya kewenangan reopen — ubah ✅ → 🔴 di _MAP.md
  2. Crunchy wajib notifikasi Nugget-san dan Crispy:
     ⚠️ LAYER 7 REOPEN — [task ID]
     Klaim resolved di SESSION-RECAP tidak terbukti di file aktual.
     Temuan: [deskripsi singkat]
     Status diubah ✅ → 🔴. Crispy buat Task Brief baru via flow normal.
  3. Task Brief baru wajib melewati CP(1) — tidak ada shortcut.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
UTILS SCRIPTS — CRISPY-SPECIFIC (GOV-014)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Scripts wajib dijalankan di awal sesi (lihat SEQUENCE COMMANDS di atas).

  node tools/scripts/utils/project-health.js
  node tools/scripts/utils/get-map-summary.js --filter open
  node tools/scripts/utils/generate-quick-context.js --task [TASK-ID] --agent [N]
  node tools/scripts/utils/merge-patch.js --dry-run --zip [FOR-INTEGRATOR.zip]

Scripts berlaku semua agent (termasuk Crispy):
  node tools/scripts/utils/package-patch.js
  node tools/scripts/utils/generate-session-proof.js --task [TASK-ID] --agent [N] --tier S
  node tools/scripts/utils/generate-warmstart.js

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
END-OF-SESSION CHECKLIST — CRISPY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Jalankan setiap kali selesai merge:
  [ ] _MAP.md diupdate — status task dan milestone counter
  [ ] Versi di-bump (version.js + sw.js CACHE version)
  [ ] MERGE-SUMMARY.md diupdate
  [ ] Kalau SESSION-RECAP > 4 GOV entries → trim ke SESSION-RECAP-ARCHIVE.txt
  [ ] TOOLS zip update notification (kalau ada TASK-SPICY-X yang di-merge):
      Tulis di MERGE-SUMMARY: "TOOLS zip perlu diperbarui untuk: [list agent]"
  [ ] Archive semua docs via FOR-INTEGRATOR ZIP — ABSOLUTE, tidak ada pengecualian
      (TASK-INTEL-P0A: archive by construction — Crunchy sudah include archive/ di ZIP)
      Jalankan: cp -r for-integrator-crunchy/archive/ docs/
      Verifikasi: ls docs/operational/qa-verdicts/ | grep [TASK-ID]
      Kalau folder archive/ tidak ada di FOR-INTEGRATOR ZIP → flag ke Crunchy:
        "FOR-INTEGRATOR ZIP tidak punya archive/ folder — Crunchy belum implement P0A.
         Archive manual sesuai README-BUKA-INI-DULU section 'Archive ke:'."
      Merge tanpa archive step = INCOMPLETE MERGE — tidak boleh dilanjutkan.
  [ ] Verifikasi run-merge-checklist.js lolos (termasuk archive step)
  [ ] Tampilkan main menu ke Nugget-san secara otomatis
