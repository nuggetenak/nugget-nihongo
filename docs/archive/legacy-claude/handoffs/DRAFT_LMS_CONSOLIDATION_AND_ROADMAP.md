# Draft Dokumen Desain & Roadmap Masa Depan Nugget Nihongo (LMS Consolidation & Advanced Assessment)

> **Status Dokumen**: DOKUMEN DESAIN RESMI & ARSIP PERENCANAAN TERKUNCI (Locked Specification)  
> **Lokasi File**: `nugget-nihongo/docs/DRAFT_LMS_CONSOLIDATION_AND_ROADMAP.md`  
> **Konteks**: Dokumen ini memuat arsitektur lengkap, keputusan konsolidasi LMS, spesifikasi set latihan JLPT/SSW/JFT-Basic, 7 pilar penyempurna engine, struktur pembahasan 5 lapis, dan sistem scaffolding mode pengerjaan yang telah diratifikasi penuh melalui `/deep-first-principles-brainstorming` dan `/grill-me`.

---

## 1. Konsolidasi Besar LMS (The Great LMS Decluttering & Pruning)

### Latar Belakang Masalah (Arcade Syndrome)
Halaman kuis (`QuizArenaHub.tsx`) menumpuk **16 jenis mode berbeda**:
- *Core*: Flashcard FSRS, Pilihan Ganda, Isian Partikel, Susun Kalimat.
- *Specialty*: Listening, Konjugasi, Terjemahan, Cari Kesalahan, Panic Recall K3, Mora Pacing, Pitch Accent, Wacana Dokkai, Collocation Matrix, Onomatopoeia Nyeri Kaigo.
- *CBT Modals*: Prometric CBT, JFT-Basic CBT.

Banyaknya kartu memicu **Decision Paralysis** (kelelahan kognitif pembelajar dewasa & ADHD) dan mengaburkan identitas Nugget Nihongo sebagai Learning Management System (LMS) yang terarah.

### Rencana Relokasi & Konsolidasi (The 3 Clean Doors)
Fitur-fitur spesialis direlokasikan ke rumah aslinya (Unit Kurikulum SSW di MateriHub dan Lab Pengucapan di Tab Kebun). Halaman Ujian dirampingkan menjadi **3 Pintu Utama**:

1. **Pintu 1: Pusat Ujian JLPT (N5 – N1)**:
   - 10 Set Latihan Modular (15 Menit) per level (Total 50 Set = 750 Butir Soal).
   - 1 Mogi Shiken Akbar per level (Simulasi waktu penuh 90–165 menit).
2. **Pintu 2: Pusat Ujian Tokutei Ginou (SSW & JFT-Basic Portal)**:
   - **Sub-Pintu JFT-Basic (A2)**: Format Hibrida (5 Set Modular @15m + 2 Simulasi Penuh CBT Prometric @60m).
   - **Sub-Pintu SSW 6 Sektor Vokasional**: 34 Set Latihan (510 Soal) berakar dari silabus dan gambar scan resmi pemerintah Jepang.
3. **Pintu 3: Latihan Cepat Dinamis (Dynamic Rapid Drill)**:
   - Latihan kilat 10 soal acak dari materi kurikulum yang sudah dipelajari pengguna.

---

## 2. Struktur Paket Soal Terpadu

### A. JLPT Akademik (50 Set / 750 Butir Soal)
- **Cakupan**: N5, N4, N3, N2, N1 (Masing-masing 10 Set @15 Soal, ~15 Menit).
- **Komposisi per Set**:
  - 3 Soal Moji (Kanji Reading / Orthography)
  - 4 Soal Goi (Kosakata kontekstual & Kolokasi)
  - 4 Soal Bunpou (Tata Bahasa & Konjugasi)
  - 2 Soal Star Scramble (★ Susun Kalimat)
  - 2 Soal Dokkai (Wacana Pendek & Info Retrieval)

### B. JFT-Basic A2 Hibrida (Syarat Bahasa Tokutei Ginou)
- **5 Set Latihan Modular (15 Soal / ~15 Menit)**:
  - 4 Soal Moji-Goi (Kanji Kehidupan & Kosakata Harian *Irodori*)
  - 4 Soal Kaiwa-Hyougen (Percakapan & Ungkapan Fungsional)
  - 4 Soal Choukai (Audio Listening — Aturan Maksimal 2x Putar)
  - 3 Soal Dokkai (Pamflet, Jadwal Sampah, Formulir Klinik)
- **2 Simulasi Akbar Penuh CBT Prometric (60 Soal / 60 Menit)**:
  - Mengadaptasi dataset `jft-basic-full-simulation-1.json` & `2.json`.
  - Passing score resmi: 200/250 poin (~80%).

### C. SSW 6 Sektor Vokasional (34 Set / 510 Butir Soal)
Semua soal bersumber dari buku panduan dan contoh soal resmi kementerian Jepang di `reference-books/ssw/`:
1. **Kaigo (介護 - Keperawatan Lansia)**: 5 Set (75 Soal) — Kemenkes Jepang (MHLW).
2. **Gaishoku (外食業 - Restoran & Pangan)**: 5 Set (75 Soal) — Kementan Jepang (MAFF / OTAFF).
3. **Inshokuryouhin (飲食料品製造業 - Pengolahan Pangan)**: 5 Set (75 Soal) — Kementan Jepang (MAFF / OTAFF).
4. **Kensetsu (建設業 - Konstruksi & Gemba Sipil)**: **9 Set Khusus (135 Soal)** — Kemenhub Jepang (MLIT / JAC):
   - **土木 (Doboku - Sipil & Pekerjaan Tanah)**: 3 Set (45 Soal). Galian, pondasi, alat berat, jalan.
   - **建築 (Kenchiku - Rangka & Bangunan)**: 3 Set (45 Soal). Scaffolding, bekisting, rebar, harness ketinggian.
   - **ライフライン・設備 (Lifeline & Utilitas)**: 3 Set (45 Soal). Pemipaan, kelistrikan, saluran gas, ducting AC.
5. **Nougyou (農業 - Pertanian & Perkebunan)**: 5 Set (75 Soal) — Kementan Jepang (MAFF / ASCA).
6. **Seizou / Sokeizai (素形材・製造 - Manufaktur Mesin)**: 5 Set (75 Soal) — Kemenperin Jepang (METI / JAIM).

---

## 3. Tujuh Pilar Penyempurna Engine Latihan (The 7 Locked Systems)

1. **Persistensi Progres `exerciseHistory`**:
   State tersimpan permanen di IndexedDB & Zustand. Kartu set menampilkan status dinamis: *13/15 (86%) ⭐⭐⭐*, riwayat tanggal pengerjaan, dan status penguasaan (*Mastered*).
2. **Buku Catatan Kesalahan (Bank Soal Salah / 間違いノート)**:
   Fitur *Drill Mistakes Only* memungkinkan siswa melatih hanya butir-butir soal yang masih salah pada set tertentu tanpa mengulang 15 soal dari nol.
3. **1-Tap FSRS Ingestion**:
   Pada layar pembahasan, setiap butir salah memiliki tombol bintang 1-ketuk untuk langsung memasukkan kata/kanji/tata bahasa tersebut ke antrean review harian FSRS v4.5.
4. **Smart Asset Preload & Zero-Buffer Offline**:
   Sebelum timer 15:00 berjalan, antarmuka melakukan preload 2-3 detik untuk mengunduh seluruh file audio Opus (~15 KB total) dan gambar diagram SSW ke RAM/CacheStorage. Nol buffering di jaringan seluler lambat.
5. **Deterministic Option Shuffler (Anti-Hafal Kunci)**:
   Opsi A/B/C/D diacak secara matematis setiap sesi baru dibuka, namun kunci jawaban terpetakan otomatis secara deterministik untuk mencegah hafalan letak tombol.
6. **ADHD Pacing: Smart Pause & Crash Recovery**:
   Tombol Pause dilengkapi tirai buram (*privacy curtain*). Jika tab tertutup atau baterai habis, sesi otomatis pulih dari `active_exercise_session` di IndexedDB.
7. **Transparansi Skoring & Radar Keseimbangan Seksi**:
   Laporan hasil menampilkan skor mentah plus visualisasi keseimbangan seksi untuk mendeteksi risiko keguguran pada ambang batas resmi (*Kijunten*).

---

## 4. Standar Pembahasan Pedagogis 5 Lapis (The 5-Layer Explanation)

Setiap butir soal di Nugget Nihongo wajib dilengkapi pembahasan dengan anatomi 5 lapis:
1. **Lapis 1: Alasan Kunci Benar (Direct Justification)**: Penjelasan lugas aturan gramatikal / arti kata mengapa opsi tersebut tepat.
2. **Lapis 2: Bedah Distraktor (Distractor Autopsy)**: Menjelaskan mengapa opsi A, B, D salah dan pola jebakan apa yang dipasang.
3. **Lapis 3: Jembatan Ingatan Sensei Nugget (Mnemonic / Analogi Lokal)**: Analogi ramah Indonesia untuk mempermudah mengingat materi.
4. **Lapis 4: Peringatan Interferensi Bahasa Indonesia (L1 Interference Alert)**: Peringatan spesifik tentang kesalahan terjemahan harfiah dari pola pikir bahasa Indonesia (misal: penggunaan partikel `に` vs `で`, transitif vs intransitif).
5. **Lapis 5: Preskripsi Tindakan Remedial**: Rujukan langsung bab MateriHub (`curriculumRef`) dan tombol 1-tap simpan ke FSRS.

---

## 5. Mode Pengerjaan Scaffolding (Assistance Mode Toggle)

Pengaturan kesulitan tidak memotong atau mengubah standar resmi soal, melainkan mengatur **Tingkat Bantuan CBT**:

| Fitur | 🟢 Mode Latihan Terbimbing (Guided Practice) | 🔴 Mode Simulasi Resmi (Strict Exam) |
|---|---|---|
| **Target Pengguna** | Baru belajar, energi mental rendah, atau ramah ADHD | Mengukur kesiapan mental dan waktu riil ujian asli |
| **Timer** | Santai / Tanpa batas waktu ketat | Ketat 15:00 Menit (Hitung mundur resmi) |
| **Munculnya Pembahasan** | **Langsung per soal** (*Immediate Feedback*) | **Ditunda di akhir** (*Delayed Feedback*) |
| **Bantuan Furigana** | Dapat diklik untuk intip (*Tap to peek*) | Sesuai standar resmi jenjang ujian |
| **Putar Audio Choukai** | Dapat diulang bebas untuk latihan | **Maksimal 2 kali putar** (Standar resmi JFT) |
| **Label Rapor** | *"Latihan Terbimbing (Practice)"* | *"Skor Terverifikasi Resmi (Exam Ready ⭐)"* |

---

## 6. Onboarding Adaptif CAT & Otonomi Pengguna
- **Tes Penempatan Cepat**: 10 soal adaptif CAT (IRT 3PL) untuk mendiagnosis level awal (N5 s/d N1).
- **Otonomi Dewasa (*Open Access*)**: Seluruh level terbuka bebas; `selectedLevel` hanya kacamata filter; data riwayat dan FSRS tidak pernah terhapus saat berganti level.
