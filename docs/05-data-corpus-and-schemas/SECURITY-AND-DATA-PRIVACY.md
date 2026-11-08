# 🔒 Enterprise Security Threat Model & Privacy Compliance Charter
> **Nugget Nihongo (ナゲット日本語) — Data Protection & Application Hardening**  
> **Status:** AUTHORITATIVE ENTERPRISE STANDARD · **Version:** v22.0.0  
> **Kepatuhan Regulasi:** UU Perlindungan Data Pribadi (UU No. 27/2022) & GDPR Alignment

---

## 1. Filosofi Keamanan & Privasi: "Privacy-by-Design"
Nugget Nihongo dibangun dengan komitmen mutlak terhadap privasi pembelajar Indonesia:
1. **Zero Tracking & Bebas Iklan:** Aplikasi tidak menyematkan tracker invasif pihak ketiga (Google Analytics, Facebook Pixel, Mixpanel, dsb.) dan tidak memonetisasi data pengguna.
2. **Offline-First Data Sovereignty:** 100% kemajuan belajar, riwayat review FSRS, dan catatan kesalahan tersimpan di perangkat lokal pengguna (`IndexedDB` & `LocalStorage`).
3. **Autentikasi Opsional (No Forced Sign-up):** Pengguna dapat mempelajari seluruh materi N5–N1 dan 19 Sektor SSW tanpa perlu mendaftar atau memberikan email. Akun hanya dibutuhkan secara opsional jika pengguna ingin menyinkronkan data antar-perangkat.

---

## 2. Model Ancaman Sistem (*STRIDE Threat Modeling*)

| Kategori Ancaman | Resiko Potensial | Mitigasi Arsitektur Nugget Nihongo |
| :--- | :--- | :--- |
| **Spoofing (Pemalsuan Identitas)** | Pengguna liar memalsukan token sesi auth Supabase. | JWT bertanda tangan kriptografis dengan masa kedaluwarsa ketat; rotasi refresh token otomatis via `@supabase/supabase-js`. |
| **Tampering (Manipulasi Data)** | Injeksi payload rusak ke dalam LocalStorage atau manipulasi skor ujian. | Sanitasi kuota dan validasi tipe runtime sebelum membaca data lokal; verifikasi skema integritas saat deserialisasi JSON. |
| **Repudiation (Penyangkalan Aksi)** | Pengguna menyangkal telah melakukan reset data atau ekspor progres. | Log lokal audit di konsol peramban; konfirmasi dialog ganda (*destructive guard*) sebelum eviksi data dilakukan. |
| **Information Disclosure (Kebocoran Info)** | Akses data lintas akun atau sniffing jaringan HTTP. | Enkripsi wajib HTTPS/TLS 1.3 via Cloudflare Pages; Row-Level Security (RLS) di Supabase Postgres yang mengisolasi data per `auth.uid()`. |
| **Denial of Service (DoS / Kuota Habis)** | Lonjakan pemanggilan API AI Sensei atau sinkronisasi cloud terus-menerus. | Client-side debounce rate-limiting; arsitektur Service Worker hibrida (*Cache-First*) yang memangkas 98% beban jaringan. |
| **Elevation of Privilege (Eskalasi Akses)** | Pengguna umum mengakses tabel analitik admin atau soal terkunci. | Kebijakan RLS Postgres ketat: tabel latihan hanya memperbolehkan `SELECT` publik dan `INSERT/UPDATE` jika `user_id = auth.uid()`. |

---

## 3. Kepatuhan UU Perlindungan Data Pribadi (UU No. 27/2022 Indonesia)

| Pasal UU PDP | Amanat Regulasi | Implementasi Nyata di Nugget Nihongo |
| :--- | :--- | :--- |
| **Pasal 16 & 20 (Dasar Pemrosesan)** | Pemrosesan data harus memiliki dasar hukum yang sah dan persetujuan eksplisit. | Persetujuan eksplisit saat pengguna menautkan akun Google di menu Pengaturan; tidak ada pemrosesan data rahasia. |
| **Pasal 21 (Hak Akses Data)** | Subjek data berhak mendapatkan akses dan salinan data pribadinya. | Halaman Profil dan Pengaturan menampilkan 100% statistik riil (XP, kartu memori, riwayat ujian CBT). |
| **Pasal 22 (Hak Pembaruan Data)** | Subjek data berhak melengkapi atau memperbarui data pribadinya. | Fitur ubah nama tampilan (*Display Name*), ganti avatar budaya, dan setel ulang target XP kapan saja. |
| **Pasal 23 (Hak Portabilitas Data)** | Subjek data berhak mentransfer datanya dalam format yang terstruktur. | Fitur **Ekspor Cadangan JSON**: 1-ketuk mengunduh seluruh database belajar lokal pengguna ke dalam format `.json`. |
| **Pasal 24 (Hak Penghapusan Data)** | Hak untuk mengakhiri pemrosesan dan menghapus data secara permanen (*Right to Erasure*). | Fitur **Reset Seluruh Progres**: Menghapus bersih data dari IndexedDB, LocalStorage, dan tabel cloud Supabase. |

---

## 4. Konfigurasi Keamanan Header HTTP (`public/_headers`)
Server Cloudflare Pages menerapkan standar keamanan peramban paling ketat:
- **`Content-Security-Policy (CSP)`**: Membatasi sumber skrip dan koneksi jaringan hanya ke domain terpercaya (`self`, `supabase.co`, `workers.dev`, `googleapis.com`).
- **`X-Frame-Options: DENY`**: Mencegah serangan pembajakan klik (*Clickjacking*) di dalam iframe pihak ketiga.
- **`X-Content-Type-Options: nosniff`**: Mencegah peramban menebak tipe MIME secara keliru (*MIME confusion attacks*).
- **`Referrer-Policy: strict-origin-when-cross-origin`**: Mencegah kebocoran URL sensitif saat bernavigasi ke luar aplikasi.
- **`Permissions-Policy`**: Menonaktifkan akses perangkat keras yang tidak relevan (`camera=()`, `geolocation=()`).
