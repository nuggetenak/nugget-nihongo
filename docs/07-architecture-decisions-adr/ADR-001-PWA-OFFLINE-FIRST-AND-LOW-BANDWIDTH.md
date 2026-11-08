# ADR-001: Mobile PWA, Offline-First Architecture, and Low-Bandwidth Constraints

## Status
**APPROVED / ACTIVE** (Implemented in Nugget Nihongo Core v16.0)

## Context & Problem Statement
Pemelajar bahasa Jepang asal Indonesia—terutama calon dan pemegang visa Tokutei Ginou (Specified Skilled Worker / SSW) serta pemagang teknis (TITP)—menghadapi kendala lingkungan belajar yang unik:
1. **Keterbatasan Kuota & Sinyal:** Akses internet di asrama pekerja (*ryō*), area pabrik industri pedesaan, lantai bawah tanah rumah sakit/panti, maupun kapal penangkap ikan seringkali memiliki sinyal lemah atau kuota terbatas.
2. **Spesifikasi Perangkat:** Mayoritas pengguna menggunakan ponsel pintar Android kelas menengah ke bawah (*low-to-mid range*) dengan kapasitas RAM dan penyimpanan terbatas.
3. **Pola Belajar Terfragmentasi (*Fragmented Micro-Learning*):** Waktu belajar tersedia dalam potongan-potongan singkat (5–10 menit) saat transit kereta, jeda istirahat pabrik, atau sebelum tidur.

Aplikasi pembelajaran bahasa konvensional seringkali gagal karena mewajibkan koneksi internet aktif (*always-online*), memuat aset video/grafis berat berukuran puluhan megabyte, dan lambat saat dibuka (*high cold-start latency*).

## Empirical SLA & CALL Grounding
- **Stockwell (2010) [MALL-01]:** Menemukan bahwa pembelajar bahasa di perangkat mobile mengalami tingkat *drop-off* drastis ketika waktu tunggu muat halaman (*load latency*) melebihi 3 detik atau ketika sesi belajar melampaui toleransi baterai/kuota.
- **Kukulska-Hulme (2009) [MALL-02]:** Menegaskan bahwa arsitektur MALL yang efektif harus memanfaatkan *situated affordances* dengan latensi instan dan keandalan operasional tanpa tergantung stabilitas sinyal seluler.
- **Burston (2014) [CM-01]:** Meta-analisis terhadap 345 studi CALL/MALL membuktikan bahwa aplikasi yang dapat beroperasi luring (*offline-capable*) mempertahankan tingkat retensi belajar 2.4× lebih tinggi dibanding sistem *cloud-dependent*.

## Decision Drivers & Decisions
1. **Arsitektur Progressive Web App (PWA):**
   - Dibangun dengan stack ringan (React 18 + Vite + Tailwind CSS + Zustand) tanpa framework monolitik yang membengkak.
   - Service Worker (`public/sw.js`) dengan strategi caching *Cache-First* untuk seluruh aset statis, font, dan dataset kurikulum.
2. **Anggaran Aset Ketat (*Asset Budgets*):**
   - **Audio Clips:** Format AAC / MP3 terkompresi dengan bitrate $\le 64\text{ kbps}$, durasi per klip rata-rata 1.2–2.5 detik (ukuran file $\le 25\text{ KB}$ per item).
   - **Visual Assets:** Ilustrasi berbasis SVG murni atau WebP terkompresi dengan batas mutlak $\le 100\text{ KB}$ per berkas.
   - **Batas Field Kartu:** Maksimal 11 field data per kartu untuk menghemat alokasi memori heap JavaScript.
3. **Penyimpanan Lokal Mandiri (*Offline-First Local Storage*):**
   - Progres FSRS, riwayat kuis, dan data Kebun Kata disimpan secara lokal di `localStorage` / `IndexedDB` dan dapat disinkronkan ke Supabase secara asinkron saat jaringan online tersedia.
   - Tidak ada permintaan jaringan yang memblokir proses latihan kuis harian.

## Consequences & Verification
- **Positif:** Cold start aplikasi di bawah 800ms, kuis dapat berjalan 100% luring di mode pesawat, dan konsumsi data untuk pembaruan kurikulum sangat rendah.
- **Trade-off:** Fitur sosial multipemain real-time ditiadakan (yang mana ini justru menguntungkan pedagogi *anti-anxiety*).
- **Pemetaan Design Decision:** DD-67, DD-68, DD-69, DD-70, DD-71, DD-72.
