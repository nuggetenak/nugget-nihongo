# 🚨 Disaster Recovery SOP & Incident Response Runbook
> **Nugget Nihongo (ナゲット日本語) — Operational Continuity & Failover Protocols**  
> **Status:** AUTHORITATIVE ENTERPRISE RUNBOOK · **Version:** v22.0.0

---

## 1. Matriks Tingkat Keparahan Insiden (*Severity Matrix*)

| Tingkat | Definisi Insiden | SLA Respon | Contoh Skenario di Nugget Nihongo |
| :---: | :--- | :---: | :--- |
| **P0 (Blocker)** | Seluruh aplikasi tidak bisa dibuka (*White Screen of Death*), bundel JS utama korup. | $< 15$ Menit | Rilis baru gagal dimuat di Cloudflare Pages, fatal import crash. |
| **P1 (Critical)** | Fitur inti evaluasi terputus atau terjadi kehilangan data belajar lokal pengguna. | $< 1$ Jam | Storage eviction menghapus kartu FSRS, CBT Runner crash di tengah ujian. |
| **P2 (Major)** | Layanan eksternal terputus tetapi fungsi offline aplikasi tetap berjalan. | $< 4$ Jam | Supabase Auth API down, kuota API AI Sensei habis sementara. |
| **P3 (Minor)** | Cacat visual kosmetik atau glitch animasi tanpa mengganggu proses belajar. | $< 24$ Jam | Ketidaksejajaran padding di layar tertentu, typo terjemahan leksikal. |

---

## 2. Standard Operating Procedures (SOP) Penanganan Insiden

### 🛠️ SOP-01: Failover Mode Offline Otomatis (*Zero Network Dependency*)
- **Pemicu:** Jaringan internet mati, server Supabase tidak merespons (HTTP 5xx), atau kuota data habis.
- **Tindakan Otomatis Sistem:**
  1. Service Worker (`public/sw.js`) mengalihkan seluruh permintaan aset statis dan data korpus ke cache hibrida lokal (*Cache-First*).
  2. Komponen [`OfflineBanner.tsx`](file:///c:/Users/Timedoor/Downloads/nugget%20nihonggo%20project/nugget-nihongo/src/components/common/OfflineBanner.tsx) otomatis mengapung di bagian atas layar memberitahukan pengguna bahwa aplikasi berada dalam mode luring aman.
  3. Mesin TinyBase menahan antrean sinkronisasi ke tabel lokal IndexedDB dan mematikan polling cloud sementara untuk menghemat baterai.
  4. Begitu sinyal internet kembali stabil, status beralih ke *Reconnected* dan data tersinkronisasi otomatis di latar belakang.

### 🛠️ SOP-02: Rollback Produksi Instan di Cloudflare Pages
- **Pemicu:** Terjadi insiden P0 pada rilis baru di domain publik (`nugget-nihongo.pages.dev`).
- **Langkah Pemulihan:**
  ```powershell
  # 1. Periksa riwayat deployment aktif di Cloudflare Pages
  npx wrangler pages deployment list --project-name=nugget-nihongo

  # 2. Lakukan rollback instan ke deployment ID sebelumnya yang stabil
  npx wrangler pages rollback [DEPLOYMENT_ID] --project-name=nugget-nihongo

  # 3. Atau lakukan deployment darurat lokal dari commit stabil
  git checkout main~1
  npm run build
  npm run deploy
  ```

### 🛠️ SOP-03: Penyelamatan Eviksi Penyimpanan Lokal (*Storage Eviction Recovery*)
- **Pemicu:** Sistem operasi seluler (Android/iOS) membersihkan cache IndexedDB/LocalStorage karena memori internal perangkat penuh.
- **Tindakan Pemulihan:**
  1. [`storageEvictionGuard.ts`](file:///c:/Users/Timedoor/Downloads/nugget%20nihonggo%20project/nugget-nihongo/src/lib/storage/storageEvictionGuard.ts) mendeteksi anomali hilangnya kunci penanda status `nn_storage_sentinel`.
  2. Dialog darurat [`StorageEvictionRecoveryModal.tsx`](file:///c:/Users/Timedoor/Downloads/nugget%20nihonggo%20project/nugget-nihongo/src/components/common/StorageEvictionRecoveryModal.tsx) otomatis terbuka ke layar pengguna dengan maskot Daruma Penyelamat.
  3. Aplikasi menawarkan 2 opsi pemulihan:
     - **Tarik dari Supabase Cloud:** Memulihkan seluruh kartu FSRS dan streak dari akun Google pengguna.
     - **Impor Berkas JSON:** Pengguna mengunggah berkas cadangan `.json` yang pernah diekspor sebelumnya.

### 🛠️ SOP-04: Pembersihan Cache Usang Service Worker (*Cache Busting*)
- **Pemicu:** Pengguna masih melihat versi lama di ponselnya meskipun rilis baru sudah di-deploy.
- **Langkah Penanganan:**
  1. Perbarui nilai `CACHE` di `public/sw.js` (contoh: `'nihongo-v22.0.0'`).
  2. Service Worker baru otomatis mengaktifkan event `install` dan `activate`.
  3. Event `activate` di `sw.js` secara agresif menghapus seluruh cache versi lama via `caches.delete(cacheName)`.
  4. Komponen [`UpdatePromptToast.tsx`](file:///c:/Users/Timedoor/Downloads/nugget%20nihonggo%20project/nugget-nihongo/src/components/common/UpdatePromptToast.tsx) muncul di layar pengguna dengan tombol satu ketukan *"Segarkan Pembaruan"*.
