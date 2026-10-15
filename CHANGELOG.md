# Changelog — Nugget Nihongo

> Catatan pembaruan ini disinkronkan secara otomatis dari `src/lib/data/patchNotes.ts`
> Single Source of Truth: Jalankan `npm run changelog` atau `npm run build` untuk memutakhirkan.

## v19.2.0 (15 Oktober 2026) — Charcoal Obsidian Theme, Humanized Copywriting & UI/UX Hardening

### Sorotan Pembaruan (Highlights)
- Tema Gelap Premium Charcoal Obsidian & Deep Slate: Menggantikan palet cokelat redup dengan obsidian slate modern (#0B0F17, #131926) berpadu aksen amber emas (#F59E0B) dengan rasio kontras WCAG AAA.
- Humanisasi Copywriting & Eliminasi Jargon: Menghapus seluruh istilah akademis berat (cognitive overload, PT-1..6, IRT theta psychometrics, doktrin hukum) menjadi bahasa Indonesia yang ramah, hangat, dan mudah dipahami.
- Aksen Nada Tokyo (Pitch Accent) Dinamis: Perbaikan visualisasi SVG kontur nada tinggi-rendah dengan lebar adaptif per-mora, bebas distorsi, dan kontras tajam.
- Penyatuan Modal Kanji: Penggabungan komponen stroke modal sehingga animasi KanjiVG SVG dan kanvas latihan tulis tangan berfungsi penuh di semua halaman materi.
- Pembersihan Header & Navigasi Materi: Menghapus pil level ganda di header untuk mempertahankan kolom pencarian ≥ 320px, serta perapian tab navigasi Materi Hub.
- Standardisasi Ejaan KBBI & Aksesibilitas: Menyelaraskan ratusan kata baku (kosakata, izin, napas, telanjur, karier, antrean, praktik, respons, frasa) serta melengkapi atribut title dan aria-label pada seluruh tombol modal.

### Rincian Perubahan (Details)
#### Desain & Tema Gelap
- Palet Charcoal Obsidian (#0B0F17, #070A0F, #131926, #1E2638) diterapkan pada :root dan Tailwind tokens, bebas elemen kusam/berlumpur.
- Pembersihan 37+ kelas warna gelap tanpa awalan dark:, menjamin keterbacaan sempurna di tema terang dan gelap.
- Penyesuaian kontras kartu evaluasi, kartu FSRS rating, dan kartu skenario tanggap darurat.

#### Copywriting & Pengalaman Belajar
- Redaksi ramah pembelajar pada Tes Penempatan Kilat, Arena Kuis, Pengaturan Logat Daerah, dan Landasan Belajar.
- Penjelasan kurikulum disederhanakan tanpa membebani pembelajar dengan jargon linguistik teoretis.
- Penyempurnaan tips salah kaprah kontrasif bahasa Indonesia vs Jepang.

#### Aksesibilitas & Kerapian Sistem
- Atribut aria-label dan title standar disematkan pada seluruh tombol tutup modal dan ikon interaktif.
- Harmonisasi ejaan baku KBBI pada seluruh modul kurikulum, bank soal diagnostik, dan pustaka kosakata.
- Verifikasi 100% lulus pada seluruh suite pengujian otomatis unit dan responsif Playwright.

---

## v19.1.0 (15 Oktober 2026) — Interactive AI Dojo, CAT Diagnostic, Dojo Kanji (2.383 Kanji), & 9-Book Pedagogical Matrix

### Sorotan Pembaruan (Highlights)
- Dojo Kanji Master: 2.383 Kanji N5–N1, Lensa Kurikulum Buku (GENKI, Minna, Soumatome), Animasi Vektor Goresan (KanjiVG SVG) & Kanvas Latihan Tulis Tangan Interaktif
- Sensei AI Studio Terintegrasi: Didukung Google Gemini 3.8 Flash dengan Guardrails Anti-Jailbreak, Mode Roleplay Situasional, dan Feedback Pengucapan Audio Asli
- Mesin Diagnostik Adaptif CAT (Computer Adaptive Testing): 10 Pertanyaan Item Response Theory (IRT) untuk Memetakan Level JLPT & JFT Secara Instan
- Matriks Metodologi 5W+1H untuk 9 Buku Teks Kanonikal: Penjelasan Pedagogis Komparatif Mengapa Setiap Buku Memiliki Urutan & Metodologi Berbeda
- Bank Latihan Otentik 9 Seri Buku: Renshuu B/C Minna, Bintang Susun ★ Soumatome & TRY!, Substitusi GENKI, Nuansa Shin Kanzen Master, dan Roleplay QUARTET
- Overhaul Navigasi & Responsif Multi-Device: Navigasi Bersih 4 Tab [Beranda, Materi, Latihan, Sensei AI], Tombol Lanjut Belajar 1-Ketuk, dan Bebas Bocor di Semua Ukuran Layar
- Pustaka Kosakata Diperluas: +5.669 Kosakata Baru Terindeks Lengkap Bebas Duplikasi dengan Pengucapan Audio

### Rincian Perubahan (Details)
#### Dojo Kanji & Visualisasi Animasi Goresan
- Pustaka Lengkap 2.383 Kanji: Mencakup seluruh kanji N5 (84), N4 (169), N3 (387), N2 (398), dan N1 (1.345) lengkap dengan radikal, Onyomi, Kunyomi, arti Indonesia, dan jukugo.
- Lensa Kurikulum Buku: Filter kanji spesifik sesuai silabus buku ajar (GENKI I & II 303 kanji, Minna no Nihongo 518 kanji, Nihongo Sou Matome).
- Animasi Vektor SVG: Visualisasi urutan goresan presisi berbasis KanjiVG dengan kontrol putar, jeda, langkah-demi-langkah, dan kanvas latihan tulis tangan.

#### Sensei AI Studio & Asisten Pembelajaran
- Didukung Model Cerdas Gemini 3.8 Flash: Respons instan, penjelasan ramah pembelajar Indonesia, dan guardrails keamanan tanpa jailbreak.
- Mode Interaktif: Bedah tata bahasa mendalam, simulasi roleplay percakapan situasional, dan koreksi tulisan bahasa Jepang.
- Integrasi Lembar Kontekstual: Tombol [🍵 Tanya Sensei] di setiap penjelasan materi dan pembahasan kuis.

#### Diagnostik CAT & Matriks Pedagogis 5W+1H
- Computer Adaptive Testing (CAT): 10 soal adaptif dengan parameter diskriminasi, kesulitan, dan tebakan (3PL IRT) untuk mendiagnosis level secara akurat dalam <3 menit.
- Analisis Metodologi 5W+1H 9 Buku: Membedah filosofi pedagogis di balik setiap buku teks kanonikal untuk membantu pembelajar memahami alasan di balik kurikulum masing-masing buku.
- Bank Soal Otentik: Latihan ciri khas setiap penerbit terkemuka langsung dapat dimainkan secara interaktif.

---

## v19.0.0 (15 Oktober 2026) — Master Overhaul: 4 Kategori Kurikulum, 9 Seri Buku, 19 Sektor SSW & Interactive Studio

### Sorotan Pembaruan (Highlights)
- Master Kurikulum 4 Kategori: Jalur JLPT Akademik (N5–N1), Jalur 9 Seri Buku Teks, Jalur Kerja SSW (19 Sektor), dan Jalur JFT-Basic & Hidup di Jepang (Seikatsu)
- Integrasi 9 Seri Buku Teks Kanonikal: GENKI I/II, Minna no Nihongo, Sou Matome, Tobira, QUARTET, TRY!, Shin Kanzen Master, Marugoto, dan Irodori
- Ekspansi Penuh 19 Sektor SSW Tokutei Ginou: Prosedur Keselamatan K3 Gemba, Protokol Komunikasi Koe-kake, Sanitasi HACCP, dan Pelaporan SBAR
- Kurasi Lengkap & Eliminasi Total String Placeholder: 9.565 Kalimat Contoh Divalidasi 100% Bebas [Terjemahan]
- Sanitasi Terminologi UI/UX: Bahasa Indonesia Hangat & Ramah Pembelajar, Memindahkan Teori SLA ke Modal Riset Mandiri
- Interactive Learning Studio: Tokyo Pitch Accent Contour Visualizer (SVG Polyline) & Kanji Stroke Order Practice Canvas
- Verifikasi Menyeluruh: 40.484 Uji Unit Lolos 100% & Audit Responsif Bebas Bocor di Semua Ukuran Layar

### Rincian Perubahan (Details)
#### Ekspansi Kurikulum Multi-Jalur (4 Kategori)
- Jalur JLPT Akademik (N5–N1): 74 unit dan ratusan pelajaran terstruktur dengan alur belajar bertahap Tahap 1–6.
- Jalur Buku Teks: Mengompilasi 9 seri buku teks bahasa Jepang terpopuler di dunia ke dalam format kurikulum terpadu.
- Jalur Kerja SSW: 19 sektor pekerjaan (Keperawatan, Makanan, Konstruksi, Pertanian, Perhotelan, Pembersihan Gedung, Manufaktur, Otomotif, Penerbangan, Perikanan, Permesinan, Elektronik, Perkapalan, Logistik, Kereta Api, Kehutanan, Kayu, dan Tekstil).
- Jalur JFT & Hidup di Jepang: Persiapan ujian JFT-Basic A1 & A2 (Huruf/Kata, Percakapan, Choukai, Dokkai) serta Panduan Seikatsu (Shiyakusho, pemilahan sampah, perbankan, & mitigasi bencana).

#### Kurasi Konten & Kualitas Data
- Memvalidasi dan menerjemahkan 9.565 kalimat contoh di seluruh paket ekspansi, memastikan zero missing translation.
- 129/129 modul ekspansi terverifikasi lolos uji validasi otomatis.
- Penataan file statis pra-kompilasi untuk menjamin kecepatan pemuatan instan tanpa latensi jaringan.

#### Fitur Studio Interaktif
- Visualisasi Nada Intonasi Tokyo (Pitch Accent) menggunakan grafik SVG poliline dengan penanda ketukan mora dan penurunan nada (downstep).
- Modal Bedah & Latihan Goresan Kanji interaktif dengan kanvas sentuh untuk melatih goresan langsung di layar gawai.

#### Sanitasi Terminologi & Responsivitas Tampilan
- Mengganti istilah akademis teknis seperti PT Stage dan Substratum dengan bahasa Indonesia yang natural dan ramah.
- Menyediakan modal khusus Landasan Riset Kurikulum bagi pembelajar dan pengajar yang ingin mempelajari dasar ilmiah pedagogi.
- Memastikan zero horizontal overflow (0px) pada seluruh breakpoint perangkat dari iPhone SE hingga layar lebar.

---

## v18.1.0 (15 Oktober 2026) — Remediasi Kurikulum Semantik, Spesialisasi SSW & Penguatan Keamanan Publik

### Sorotan Pembaruan (Highlights)
- Sentence-Extraction & Slot-Filling Engine Mengeliminasi Total Kalimat Sintetis (Synthetic Gibberish)
- Penyelarasan 100% ID Latihan Fallback Kuis (vocab-drills.json & grammar-drills.json) 1:1 Terhadap Korpus Kanonikal
- Pencegahan Race Condition & Cache Poisoning dataManager Melalui inFlightLoads Concurrency Map
- Studio Pelajaran dengan Penanganan 404 Mandiri (LessonNotFoundState) & Pemuatan Kosakata SSW Khusus
- Ekspansi Korpus Tokutei Ginou SSW: 72 Kosakata Otentik Konstruksi, Pengolahan Makanan, dan Keperawatan (Kaigo)
- Restorasi Taksonomi Partikel N5/N4 dan Deduplikasi Referensi Buku Minna no Nihongo & Irodori
- Penguatan Keamanan Edge Workers (Rate Limiting /critique & UTF-8 Safe Admin Base64 Encoding)
- Eliminasi Token Statis Publik & Sistem Sinkronisasi Otomatis Changelog Antar Versi
- Anti-Leakage Layout Terverifikasi: 0px Horizontal Overflow di Seluruh Perangkat (iPhone SE hingga Desktop)

### Rincian Perubahan (Details)
#### Remediasi Semantik & Adapter Konten Kurikulum
- Mengganti generator template statis dengan Sentence-Extraction & Slot-Filling Engine yang mengekstraksi kalimat otentik langsung dari korpus kosakata/tata bahasa.
- Penyelarasan ID fallback kuis dari format lama ke format kanonikal (vocab_v-n5-*, grammar_g-n5-*) sehingga tidak ada drill yang terputus.
- Format tampilan pedagogis dirancang kontekstual dan komunikatif tanpa menyulitkan pembelajar umum.

#### Stabilitas Data & Concurrency Guard
- Mengimplementasikan inFlightLoads Map pada DataManager untuk mencegah race condition pemanggilan simultan dan cache poisoning berupa array kosong.
- Halaman LessonStudyPage dilengkapi LessonNotFoundState ramah pengguna dengan tombol kembali jika rute/pelajaran tidak ditemukan.
- Pemuatan otomatis spesialisasi SSW vokasional (Konstruksi, Makanan, Kaigo) saat pengguna mengakses unit track SSW.

#### Pengayaan Korpus Vokasional SSW (Tokutei Ginou)
- Penambahan 72 entitas kosakata otentik untuk sektor Kaigo (Keperawatan lansia), Konstruksi (K3 & Keselamatan kerja), dan Pengolahan Makanan (Standar HACCP).
- Katalog kurikulum SSW diperbarui lengkap dengan target kalimat dan model dialog kerja nyata di Jepang.

#### Pembersihan Taksonomi & Buku Pelajaran
- Restorasi kategori partikel pada n5-particles.js dan n4-particles.js yang sebelumnya salah terlabel sebagai tense-aspect.
- Deduplikasi 24 entitas pada materi referensi buku teks (Minna no Nihongo 1 & 2, Irodori A1 & A2).

#### Keamanan Publik, Edge Workers & Otomasi Rilis
- Pencegahan kebocoran kredensial dengan mengganti token anonim hardcoded menjadi placeholder aman unconfigured.
- Rate limiting ketat pada endpoint /critique berbasis IP nyata (CF-Connecting-IP).
- Sistem generator otomatis scripts/sync-changelog.js yang menyinkronkan patchNotes.ts ke CHANGELOG.md pada setiap proses build & rilis.

---

## v18.0.0 (10 Oktober 2026) — Studio Pembelajaran Berbasis Riset SLA & Latihan Tersemat Mandiri

### Sorotan Pembaruan (Highlights)
- Dedicated Full-Page Learning Studio (LessonStudyPage) Menggantikan Infinite Scroll Vertikal
- Integrasi Kerangka Pedagogis 5W1H Berbasis Riset Akuisisi Bahasa Kedua (Processability Theory & Analisis Kontrasif L1)
- 100% Latihan Tersemat di Tempat (Zero Menu-Jumping) Tanpa Memental Pembelajar ke Menu Arena Kuis
- Umpan Balik Instan & Putaran Koreksi Otomatis (Retry Loop) untuk Setiap Soal yang Keliru
- Handoff Memori Otomatis ke Algoritma FSRS Setelah Mencapai Skor Kelulusan ≥ 80%
- Sintesis Suara Offline Bahasa Jepang (Web Speech API) dengan Pilihan Kecepatan 0.8x dan 1.0x
- Tantangan Komunikasi Nyata Berstandar CEFR-J (Can-Do Real-World Challenge) & Kunci Jawaban Model Percakapan
- Anti-Leakage Layout Terverifikasi: 0px Horizontal Overflow di Seluruh Perangkat (iPhone SE hingga Desktop)

### Rincian Perubahan (Details)
#### Dedicated Studio Belajar & Stepper 4-Tahap
- Penggantian scrolling vertikal panjang dengan halaman studio mandiri yang fokus dan bebas distraksi.
- Bilah Stepper 4-Tahap: 1. Dialog Otentik, 2. Bedah Pola & 5W1H, 3. Latihan di Tempat, 4. Verifikasi Can-Do.
- Navigasi mulus antar pelajaran dalam satu unit atau unit berikutnya tanpa perlu bolak-balik ke menu katalog.

#### Kerangka Pedagogis 5W1H Berbasis Riset SLA
- WHAT: Rangkuman target kalimat, pola gramatikal, dan kosakata pokok.
- WHY: Justifikasi kognitif ilmiah (Processability Theory Pienemann, Semantic Clustering Tinkham, Analisis Kontrasif Sutedi) dengan kartu akordeon progressive disclosure.
- WHO & WHEN: Konteks sosiolinguistik, relasi hierarkis lawan bicara (Teineigo/Sonkeigo), dan aturan pantangan budaya.
- SCENARIO: Studi kasus situasional nyata di Jepang (balai kota, rumah sakit, tempat kerja).
- EDGE CASES: Analisis kontrasif mendalam (Contrastive Copula Trap, partikel WA vs GA, batasan penggunaan).

#### Latihan Tersemat 100% In-Place (Zero Menu-Jumping)
- Seluruh latihan interaktif (susun kata, cloze partikel, spot the edge case) dikerjakan langsung di dalam halaman materi.
- Sistem koreksi cerdas: soal yang dijawab salah otomatis dimasukkan ke putaran koreksi (retry loop) hingga tuntas.
- Pencapaian skor kelulusan (≥ 80%) secara otomatis menginjeksi kartu tata bahasa dan kosakata ke antrean FSRS Beranda.

---

## v17.1.0 (10 Oktober 2026) — Desain Seluler Adaptif & Optimasi Lintas Perangkat

### Sorotan Pembaruan (Highlights)
- Perombakan Total Antarmuka Seluler (Mobile UX Overhaul) di Seluruh Menu Utama
- Eliminasi Tab Collisions & Stacked Navigation Chrome dengan Bounded Responsive Grid
- Navigasi Kurikulum Cerdas dengan Bottom Sheet Picker & Target Sentuh Adaptif ≥ 44px
- Bilah Metrik Ringkas 4-Kolom di Arena Kuis & Sinkronisasi 13 Mode Latihan Lengkap
- Kebun Kata Format 2-Kolom Zen Garden yang Proporsional di Layar Sempit
- Horizontal Chip Carousel pada Penjelajah Bab Buku Pegangan (Minna no Nihongo & Genki)
- Zero Horizontal Overflow Guarantee (0px) Terverifikasi Otomatis Melalui Playwright Test Suite

### Rincian Perubahan (Details)
#### Restrukturisasi Tata Letak Seluler (Mobile UX)
- Materi Hub: Tab switcher (Kurikulum, Buku, Kosakata, Tata Bahasa) direkayasa ulang menggunakan CSS Grid 4-kolom terkendali untuk mengeliminasi bug tab menumpuk.
- Materi Hub Quick Tools: Tombol pintasan Kana, Konjugasi, dan Nuansa dipadatkan menjadi satu baris horizontal 36px yang elegan di mobile.
- Penjelajah Kurikulum: 4 lapis selector bertingkat digantikan oleh kartu ringkas (~85px) yang memunculkan Bottom Sheet Picker saat disentuh, membawa materi pelajaran langsung di atas lipatan layar (above the fold).
- Penjelajah Buku: Daftar bab vertikal 500px digantikan dengan horizontal carousel chip bab yang efisien.
- Kebun Kata: Ditransformasikan dari kartu memanjang tunggal menjadi tata letak 2-kolom mobile yang seimbang.

#### Arena Kuis & Interaktivitas
- Kartu metrik kuis disederhanakan menjadi bilah status 4-kolom kompak (~48px) menampilkan Soal, Akurasi, FSRS, dan Air.
- Seluruh 13 mode kuis (termasuk Panic Recall, Mora Pacing, dan Pitch Accent) dapat diakses dengan mudah tanpa perlu scrolling panjang.
- Sinkronisasi badge Arena Kuis pada Mobile Drawer menjadi "13 Mode".

#### Aksesibilitas & Pengujian Lintas Perangkat
- Seluruh tombol dan kartu interaktif memenuhi standar tap target ≥ 44px dengan umpan balik sentuhan active:scale-95.
- Pemberian padding cushion bawah dinamis (calc(5.5rem + env(safe-area-inset-bottom))) mencegah konten tertutup oleh BottomNav.
- Verifikasi otomatis 62/62 skenario Playwright pada iPhone SE (375px), Mobile Standar (390px), Tablet (768px), dan Desktop (1440px) dengan zero overflow.

---

## v17.0.0 (10 Oktober 2026) — Kurikulum Orisinal, Diagnostik L1, & Vokasional SSW

### Sorotan Pembaruan (Highlights)
- Peluncuran 8 Jalur Kurikulum Orisinal Nugget Nihongo (JLPT N5–N1 & SSW Kaigo, Food Service, Konstruksi)
- Pengorganisasian 74 Unit & 155 Pelajaran Mandiri Lengkap dengan Sasaran Can-Do Standar CEFR-J
- Peta Tangga Kognitif Berbasis Processability Theory (Stages 1–6 Pienemann)
- Mesin Diagnostik Empiris L1 Bahasa Indonesia: 300 Butir Uji (150 Morfosintaksis & 150 Nada Fonologis)
- Personalisasi 4 Substratum Dialek Daerah (Umum, Jawa, Sunda, Batak/Timur) di Materi & Pengaturan
- 21 Protokol Kedaruratan Gemba K3 & Kaigo SBAR Berstandar Kerja Nyata Jepang
- Ekspansi Arena Kuis Menjadi 13 Mode: Panic Recall (5s Fading), Mora Pacing (240 bpm), Pitch Accent, dll.
- Kalibrasi FSRS Fatigue-Aware Clamping & Penyesuaian Peluruhan Waktu Malam
- Audit Responsif Multi-Device Headless Playwright: 64/64 Cek Lolos Melintasi iPhone SE hingga Desktop

### Rincian Perubahan (Details)
#### Kurikulum Orisinal & Vokasional
- Jalur Akademik N5–N1 terstruktur dari Aisatsu dasar hingga dekonstruksi wacana editorial surat kabar tingkat mahir.
- Jalur Vokasional SSW Kaigo (Keperawatan Lansia): SOP Koe-kake, komunikasi empatik, & format baku pelaporan darurat SBAR.
- Jalur Vokasional SSW Food Service: Protokol sanitasi 5S, standar HACCP, penanganan alergen, & etika pelayanan Omotenashi.
- Jalur Vokasional SSW Konstruksi: Pencegahan celaka K3 Gemba, komando akustik kansei KYT (Kiken Yochi Training), & aba-aba alat berat.
- Setiap unit dilengkapi catatan fokus analisis kontrasif L1 untuk membongkar jebakan bahasa ibu.

#### Diagnostik L1 & Substratum Daerah
- Database 300 butir diagnostik empiris membedah interferensi transfer L1 Indonesia ↔ L2 Jepang.
- Substratum Jawa: Latihan fonologis plosif b/d/g dan pemanjangan vokal chōon.
- Substratum Sunda: Mitigasi netralisasi konsonan f/p/v dan artikulasi vokal sentral /ə/.
- Substratum Batak & Indonesia Timur: Penyetaraan aksen nada Tokyo heiban (datar) dari irama silabel dinamis.

#### Arena Kuis & Mode Latihan Baru
- Panic Recall Drill: Latihan cover-recall-check dengan hitungan mundur 5 detik tanpa bantuan opsi ganda.
- Mora Pacing Drill: Metronom visual 240 bpm untuk menjaga kestabilan isokroni tiap ketukan suku kata mora.
- Pitch Accent Drill: Visualisasi kontur nada tinggi-rendah Tokyo (Heiban, Atamadaka, Nakadaka, Odaka).
- Macro-Discourse Deconstruct: Bedah struktur argumen premis-antitesis-bukti-sintesis teks N2/N1.
- Collocation Matrix: Analisis batas kompatibilitas pragmatis pasangan kata alami.

#### Performa & Keandalan Offline
- Precache Service Worker mencakup seluruh 8 berkas kurikulum mandiri dan basis data diagnostik.
- Pencapaian 41.018 tes lolos 100% tanpa kegagalan pada rangkaian pengujian backend dan integrasi.
- Audit otomatis Playwright mengonfirmasi 0px kebocoran horizontal melintasi seluruh resolusi layar.

---

## v16.0.0 (10 Oktober 2026) — Renaissance & Spaced Mastery

### Sorotan Pembaruan (Highlights)
- Migrasi Penuh ke Single Page Application (SPA) React 18, Vite, & Tailwind CSS
- Penyatuan Kalkulasi Algoritma FSRS v4 di Seluruh 8 Mode Arena Kuis
- Pembersihan Form Pengaturan & Penyederhanaan Masuk Murni dengan Google (Google Sign-In)
- Widget Review Cerdas FSRS & Bilah Penguasaan Kurikulum JLPT N5–N1 di Beranda
- Koleksi Peribahasa Harian Otentik (Kotowaza · ことわざ) dengan Audio Pelafalan
- Penataan Ulang Materi Hub dengan Mode Daftar Ringkas (Compact List View) & Filter Jenis Kata
- Penataan Ulang Arena Kuis dengan Klaster Fondasi vs Keterampilan Khusus
- Mode Spoiler / Blur Interaktif untuk Mencegah Tebak Buta Arti Kalimat
- Sistem Pelaporan Kesalahan Konten In-App (Report Issue 🚩) dengan Offline Queue
- Optimalisasi Seluler Komprehensif: Pencegahan Bocor Layar (Anti-Horizontal Overflow)

### Rincian Perubahan (Details)
#### Arsitektur & Kinerja
- Memigrasikan ribuan baris Vanilla JS lama menjadi komponen modular React dengan Zustand store.
- Mengurangi waktu muat awal dengan pemisahan bundel Vite dan caching Service Worker offline.
- Menghilangkan ketergantungan form input API key mentah bagi pengguna akhir di menu Pengaturan.
- Pencegahan galat jaringan DNS NXDOMAIN dengan isolasi client Supabase yang aman offline.

#### UI & UX Beranda & Materi
- Menghadirkan kartu prioritas FSRS Due yang mendeteksi kartu memori kritis secara dinamis.
- Menambahkan bilah progres visual kurikulum N5 hingga N1.
- Mode Tampilan Ganda pada Materi Hub: Kartu Grid luas atau Daftar Ringkas untuk memindai cepat.
- Pintasan langsung ke Bagan Kana, Matriks Konjugasi, dan Inspektor Nuansa dari Beranda.

#### Arena Kuis & Spaced Repetition
- Memperbarui 8 mode latihan: Flashcard FSRS, Pilihan Ganda, Isian Partikel, Susun Kata, Audio Mendengar, Konjugasi, Terjemahan, dan Deteksi Jebakan.
- Setiap jawaban benar/salah kini otomatis memperbarui stabilitas memori FSRS dan menyemai bibit Kebun Kata.
- Pemberian hadiah tetes air dinamis (+1 hingga +5 tetes) berdasarkan performa sesi latihan.

#### Penyempurnaan Seluler
- Mengunci viewport tanpa bocor horizontal (`overflow-x: hidden`, `viewport-fit=cover`).
- Drawer navigasi seluler lengkap dan tab menu "Tentang" permanen pada Bottom Navigation.
- Dukungan safe-area-inset-bottom pada ponsel modern (iPhone notch & gesture bar Android).

---

## v15.16.0 (17 April 2026) — AI Content Engine & Validator

### Sorotan Pembaruan (Highlights)
- Integrasi Pipeline Promosi Konten AI (Edge Router & Critic Engine)
- Widget Umpan Balik Konten AI (Jempol Naik/Turun & Usulan Koreksi)
- Pengujian Persona Sensei & Pencegahan Halusinasi Model Bahasa

### Rincian Perubahan (Details)
#### Kecerdasan Buatan
- Sistem validasi silang antara model generator dan model kritikus untuk memastikan keaslian bahasa.
- Tabel antrean promosi konten cerdas ke dalam bank soal resmi.

---

## v15.0.0 (8 April 2026) — Kurikulum Akbar & FSRS Engine

### Sorotan Pembaruan (Highlights)
- Database 4.800+ Kosakata & 850+ Tata Bahasa JLPT N5 sampai N1
- Penerapan Rumus Matematika Retensi FSRS v4 (Stabilitas & Kesulitan)
- Jalur Belajar Buku Teks: Minna no Nihongo & Modul Irodori
- Jalur Freeway: 21 Pola Kalimat Paling Vital untuk Bertahan Hidup

### Rincian Perubahan (Details)
#### Kurikulum & Data
- Penyusunan data kosakata dengan kanji, kana, romaji, arti bahasa Indonesia, dan contoh kalimat berpasangan.
- Pengelompokan tata bahasa berdasar partikel, bentuk verba, pengandaian, dan modalitas.

---

## v14.0.0 (25 Maret 2026) — Kebun Kata & Gamifikasi

### Sorotan Pembaruan (Highlights)
- Fitur Kebun Kata (Kanji Garden) dengan 5 Fase Pertumbuhan (Benih → Mekar)
- Sistem Tetes Air Penyiram & Konversi Jawaban Kuis Menjadi Bunga
- Heatmap Kalender Aktivitas Belajar 49 Hari
- Sistem Lencana Prestasi (12 Badges Penghargaan)

### Rincian Perubahan (Details)
#### Gamifikasi & Motivasi
- Merawat pohon kanji menciptakan keterikatan emosional belajar tanpa beban.
- Pencatatan rekor streak beruntun dengan kompensasi pemulihan streak (Streak Saver).

---

## v12.0.0 (14 Februari 2026) — Arena Latihan Multi-Dimensi

### Sorotan Pembaruan (Highlights)
- Peluncuran Mode Flashcard Interaktif 3D
- Mode Isian Rumpang Partikel Kalimat
- Mode Builder Susun Kata Acak
- Matriks Interaktif Perubahan Bentuk Kata Kerja (Konjugasi Te, Nai, Ta, Masu)

### Rincian Perubahan (Details)
#### Latihan Interaktif
- Mendukung latihan berbagai gaya belajar: visual, motorik, dan analisis sintaksis.

---

## v10.0.0 (1 Januari 2026) — PWA Offline & Mesin Suara TTS

### Sorotan Pembaruan (Highlights)
- Dukungan Progressive Web App (PWA) — Dapat Diinstal di Home Screen HP/PC
- 100% Berfungsi Tanpa Koneksi Internet (Offline-First Service Worker)
- Integrasi Web Speech API untuk Pelafalan Suara Asli Bahasa Jepang

### Rincian Perubahan (Details)
#### Fondasi Teknis
- Seluruh data kosakata dan tata bahasa di-cache lokal sehingga aplikasi tetap responsif di area minim sinyal.

---

## v1.0.0 (10 Agustus 2025) — Lahirnya Nugget Nihongo

### Sorotan Pembaruan (Highlights)
- Inisiasi Proyek Pembelajaran Bahasa Jepang Khusus Penutur Bahasa Indonesia
- Bagan Interaktif Huruf Hiragana & Katakana
- Daftar Kosakata Dasar JLPT N5

### Rincian Perubahan (Details)
#### Awal Mula
- Berangkat dari keresahan sulitnya menemukan aplikasi belajar bahasa Jepang gratis, tanpa iklan, dan terstruktur dalam bahasa Indonesia.

---

## Arsip Pembaruan Historis (v15.15.0 ke Bawah)

## v15.15.0 (30 September 2026) — 100% N5/N4 Vocab Examples & CSS Overhaul

### v15.15.0 — feat(content)+refactor(css): 1,400+ new authentic examples (Phase 2 Done) & app.css deduplication
- **100% Example Sentence Coverage for N5 & N4 Vocab (Phase 2 Complete)**:
  - Generated and populated 1,400+ authentic Japanese example sentences with clear, natural Indonesian translations across all 10 category files.
  - `n5-nouns.js` (183 entries updated, 0 missing).
  - `n5-verbs.js` (16 entries updated, 0 missing).
  - `n5-adjectives.js` (5 entries updated, 0 missing).
  - `n5-adverbs.js` (8 entries updated, 0 missing).
  - `n5-expressions.js` (1 entry updated, 0 missing).
  - `n4-nouns.js` (376 entries updated with 752 sentences, 0 missing).
  - `n4-verbs.js` (170 entries updated with 340 sentences, 0 missing).
  - `n4-adjectives.js` (54 entries updated, 0 missing).
  - `n4-adverbs.js` (9 entries updated, 0 missing).
  - `n4-expressions.js` (5 entries updated, 0 missing).
  - Compiled clean with `node scripts/merge-vocab.js` into monolithic `vocab-n5.js` and `vocab-n4.js`.
- **UI/UX Overhaul & CSS Consolidation (`public/styles/app.css`)**:
  - Deduplicated all 22 duplicate selector blocks including `.hub2-wrap`, `.detail-lens-item`, `.header-top-row`, `.hub2-see-all-row`, and `.cards, .sk-grid`.
  - Added global `touch-action: manipulation` across all buttons, inputs, summaries, and links to eliminate mobile tap delays.
  - Upgraded tap targets to >= 44px on `.theme-toggle`, `.gs-trigger-btn`, `.modal-close`, `.auth-header-btn`, `.quiz-end-btn`, and tab buttons.
- **Phase 2 Officially Completed**:
  - `ROADMAP.md` updated with Phase 2 marked as ✅ Selesai.

## v15.14.0 (30 September 2026) — Project Reboot & Synchronization

### v15.14.0 — fix+docs: project reboot — SW cache gaps fixed, N3-N1 vocab UI enabled, Supabase client fixes, documentation synced to v15.13.7 state
- **Service Worker cache gaps fixed**:
  - Added missing CSS files to cache (`shell.css`, `onboarding.css`, `settings.css`) in `public/sw.js`.
  - Added full N2 and N1 grammar and vocab data files (`grammar-n2.js`, `grammar-n1.js`, `vocab-n2.js`, `vocab-n1.js`) to offline `ASSETS`.
  - Bumped cache key to `nihongo-v15.14.0`.
- **Vocab UI enabled for N3–N1**:
  - Enabled level filter pills (`vpill-n3`, `vpill-n2`, `vpill-n1`) in `public/index.html` (N3 was previously disabled with `pill-soon`, N2/N1 were missing).
- **Supabase client fixes**:
  - Replaced `data.full_name` with `data.display_name` in `signUp()`.
  - Updated OAuth and email confirmation redirects to use `window.location.origin` (supports local dev and preview deployments).
  - Wired auto-migration on `SIGNED_IN` event in `_onAuthStateChange()` to ensure local data syncs to Supabase on first login.
- **UI & Versioning updates**:
  - Fixed version labels in "Tentang Nugget" modal to read dynamically from `window.APP_VERSION`.
  - Bumped version to `v15.14.0` in `package.json`, `public/js/core/version.js`, and `public/sw.js`.
- **Documentation synchronization**:
  - Updated `CLAUDE.md`, `README.md`, `docs/project/_MAP.md`, and `docs/project/ROADMAP.md` to reflect true codebase state: 2,692 vocab entries, 859 grammar patterns, 68 category files, and active Phase 2 status.

## v15.13.5–15.13.7 (23 April 2026) — JMDict Enrichment, Category File Split & Content Expansion

### v15.13.7 — feat(schema-v2): JMDict enrichment across all 2,692 entries
- **Schema v2 enrichment** (sourced from JMDict 216k entries):
  - `jmdict_seq`: Traceability to source dictionary entry.
  - `frequency`: Corpus frequency rank band (lower = more common).
  - `forms`: Alternate kanji spellings with usage notes.
  - `meanings`: Full multi-sense array containing all JMDict definitions.
  - `misc_jm`: Nuance notes (biasanya kana, kasual, arkais, dsb.).
  - `conjugations`: Auto-generated 11-form verb tables (dict, masu, te, ta, nai, potential, passive, causative, volitional, cond_ba, cond_tara) in consistent hiragana.
- **Coverage breakdown**:
  - N5: 725 entries (freq: 570, forms: 277, conj: 165)
  - N4: 692 entries (freq: 534, forms: 221, conj: 207)
  - N3: 735 entries (freq: 621, forms: 246, conj: 279)
  - N2: 350 entries (freq: 212, forms: 46, conj: 78)
  - N1: 190 entries (freq: 139, forms: 68, conj: 81)
  - Total enriched: 2,558+ entries.
- **Tooling & Data quality**:
  - `scripts/enrich-schema-v2.py`: Main enrichment pipeline supporting both standard JSON and SQ format.
  - Verb conjugation engine: Algorithmically verified for godan, ichidan, suru, and kuru verbs.
  - Fixed te/ta forms to reading-based hiragana; fixed missing commas in N5/N4 entries.
  - Test suite: 22,483 PASS, 0 FAIL, 0 ERROR.

### v15.13.6 — refactor(arch): split vocab+grammar into category files, JMDict pipeline
- **Modular category architecture**:
  - Vocab split into 22 category files under `public/data/vocab/{n5,n4,n3,n2,n1}/` (verbs, adjectives, adverbs, nouns, expressions).
  - Grammar split into 46 category files under `public/data/grammar/{n5,n4,n3,n2,n1}/` (grouped by grammatical function).
- **Build scripts & migration tooling**:
  - `scripts/merge-vocab.js`: Auto-rebuilds root `vocab-nX.js` files from category files.
  - `scripts/merge-grammar.js`: Auto-rebuilds root `grammar-nX.js` files from category files.
  - `scripts/split-vocab.py` & `scripts/split-grammar.py`: String-aware bracket tracking migration scripts.
  - `scripts/jmdict-enrich.py`: Pipeline indexing 216,568 JMDict entries.
  - `scripts/README.md`: Complete guide for category file editing workflow.
- **CI/CD automation**:
  - Added auto-merge step to `.github/workflows/deploy.yml` and `.github/workflows/validate.yml` before validation and deployment.

### v15.13.5 — feat(content): batch3 partial (14/20 agents) — +840 entries
- **Content additions across all levels**:
  - `vocab-n3`: 615 → 735 (+120 entries: health, communication, education, daily life).
  - `vocab-n2`: 260 → 350 (+90 entries: society, tech, environment).
  - `vocab-n1`: 130 → 190 (+60 entries: advanced verbs, abstract nouns).
  - `grammar-n3`: 46 → 76 (+30 entries: request/modal patterns).
  - `grammar-n2`: 250 → 310 (+60 entries: scope/reference, compound verbs).
  - `grammar-n1`: 140 → 200 (+60 entries: formal patterns).
- **QA fixes**:
  - Cleared 520 invalid `see_also` references.
  - Resolved 43 bidirectional `confusion_pairs`.
  - Corrected 1 invalid `meaning_id`.

## v15.13.3–15.13.4 (20 April 2026) — Data Hygiene & Character Normalization

### v15.13.4 — fix(n5/n4): romaji katakana→latin (68 fields), fullwidth chars
- **Romaji normalization**: Converted 68 katakana/halfwidth romaji fields in N5 and N4 vocab to standard Latin alphabet.
- **Character cleanup**: Replaced fullwidth punctuation and symbols with canonical halfwidth characters.

### v15.13.3 — fix(n5/n4): provenance field, tags, meaning_id, romaji — 0 errors all levels
- **N5 vocab (725 entries)**: Added `provenance` field to all 725 entries, remapped 212 invalid tags to Taxonomy v2 standards, and corrected 12 `meaning_id` values.
- **N4 vocab (692 entries)**: Added `provenance` field to all 692 entries, remapped 41 invalid tags, stripped 11 accidental Japanese text entries in translation fields, and fixed 5 `meaning_id` values.
- **Validation**: `tests/run.js` (20,373 PASS, 0 FAIL) and `tests/quality.js` (0 blockers across all levels).

## v15.13.0–15.13.2 (19 April 2026) — VocabDB Activation & 20-Agent Content Batch

### v15.13.2 — fix+docs: activate N2+N1 in vocabDB, fix warnings (conj_type, tags, romaji, POS), CLAUDE.md accurate
- **Active VocabDB expansion**: Activated N2 and N1 vocab databases in `public/data/vocab/vocab-index.js`.
- **Data warning resolution**: Fixed data warnings across N3, N2, and N1 (`conj_type` values, non-standard tags, romaji casing, POS consistency).
- **Documentation**: Updated `CLAUDE.md` with accurate entry counts and active dataset status.

### v15.13.1 — docs+fix: update CLAUDE.md + _MAP.md to v15.13.0 state, batch3 bundle prepared
- **Milestone docs sync**: Updated `CLAUDE.md` and `docs/project/_MAP.md` to reflect v15.13.0 state (+615 entries).
- **Batch 3 preparation**: Prepared multi-agent content prompt bundles and assignments.

### v15.13.0 — feat(content): 20-agent batch — +615 entries across all levels
- **Content population across levels**:
  - `vocab-n3`: 405 → 615 (+210 entries: verbs, work nouns, adj/adv, abstract nouns, change-of-state, nature, expressions).
  - `vocab-n2`: 140 → 260 (+120 entries: formal verbs, academic nouns, culture/ethics, cognitive verbs).
  - `vocab-n1`: 70 → 130 (+60 entries: literary/formal mixed).
  - `grammar-n2`: 130 → 250 (+120 entries: connective, contrast/modal, formal patterns).
  - `grammar-n1`: 80 → 140 (+60 entries: advanced/literary patterns).
  - `grammar-n3`: 16 → 46 (+30 entries: aspect/temporal/conditional patterns).
- **QA fixes**: Fixed 2 Japanese strings in translation fields, cleared 78 invalid references, resolved N3 grammar ID collision, and fixed 17 bidirectional `confusion_pairs`.

## v15.12.7–15.12.10 (19 April 2026) — Quality Suite, Minna no Nihongo & Settings Fixes

### v15.12.10 — fix+quality: quality.js v4 upgrade + CI auto-trigger + fix 35 data errors in vocab-n3
- **Quality suite upgrade**: Upgraded `tests/quality.js` to v4 with Taxonomy v2 validation, POS checks, meaning_id format, and blocker gates.
- **CI automation**: Added automated test trigger to `.github/workflows/validate.yml` for pull requests and pushes.
- **Vocab N3 fixes**: Fixed 35 data errors in `public/data/vocab/vocab-n3.js` flagged by the new quality validator.

### v15.12.9 — fix+test: upgrade test runner (cat validation, xref, count floors) + fix 72 retired cat values in grammar N2/N3/N1
- **Test runner upgrade (`tests/run.js`)**:
  - Added canonical grammar category validation against Taxonomy v2 (36 valid categories).
  - Added cross-reference checking for `grammar_ids` in book lens files (`book-minna-1.js`, `book-minna-2.js`, etc.).
  - Added minimum count floor assertions for N2 and N1 vocab/grammar.
  - Added duplicate ID detection for `vocabN2`, `vocabN1`, `grammarN2`, and `grammarN1`.
- **Data fixes**: Migrated 72 retired `cat` values across `grammar-n2.js`, `grammar-n3.js`, and `grammar-n1.js` to canonical taxonomy values.

### v15.12.8 — feat(5C): Minna no Nihongo 1 & 2 live — grammar lens data + SERIES registry wired
- **Minna no Nihongo lenses wired**:
  - `public/data/books/book-minna-1.js` (50 lessons, N5) and `book-minna-2.js` (50 lessons, N4) grammar lens data completed and verified.
  - `public/js/pages/materi-hub.js`: Set `lensVar` to `'bookMinna1'` and `'bookMinna2'`, marked series as active (`available: true`).

### v15.12.7 — fix: settings clearData bunpou_* keys, resetAITutorHistory export, onboarding level pre-select
- **Settings cleanup (`settings.js`)**: `clearData` now clears both `nn_*` and legacy `bunpou_*` keys from `localStorage`.
- **AI Tutor (`ai-tutor.js`)**: Exported `window.resetAITutorHistory()` to reset chat history, clear `sessionStorage`, and empty the conversation feed.
- **Onboarding integration (`app.js`, `browse.js`, `quiz.js`)**: Synchronized active level pills from `nn_starting_level` set during onboarding.

## v15.12.4–15.12.6 (19 April 2026)

### v15.12.6 — Supabase backend fully functional
- **3 critical Supabase bugs fixed** — all cloud writes now actually work
  - `sb.auth.getUser()` was called synchronously in 6 places → `user_id` always `undefined` → RLS blocked all writes. All 6 functions now `async` with `await`
  - `bulkSync()` called `.map()` on a plain object → `TypeError`. Fixed: `Object.entries(cards).map(...)` to convert FSRS nested structure to flat rows
  - `sbClient.supabaseKey` doesn't exist in Supabase v2 → exported `window._SUPABASE_URL` and `window._SUPABASE_ANON_KEY` from IIFE

### v15.12.5 — Quiz empty states fixed
- All 7 `fill-coming-soon` blank screens replaced with smart fallback:
  1. First: try to generate questions from `quizEngine` without level filter
  2. Only if truly empty: show proper empty state with amber action button linking to Browse tab
- `cs-action-btn` CSS added (amber pill button)
- Files: `fillin.js` (×2), `conjugation.js`, `translation.js`, `errorfind.js`, `multichoice.js`, `quiz-vocab.js`

### v15.12.4 — Kebun Mastery live + CLAUDE.md updated
- **Kebun Mastery wired** — SRS card garden visualization now live in Progress tab
  - Grid of SVG plants: 🌱 unseen / 🌿 learning / 🌻 young / 🌳 mature / 🥀 lapsing
  - Filter by Grammar/Vocab + N-level pills
  - Stats bar: seen / mature / due / total
  - Tap any plant → opens detail modal
- **CLAUDE.md fully rewritten** (was stale at v15.8.0, now v15.12.4)
  - Accurate entry counts, file inventory, FSRS data structure docs, backend bug pointers

## v15.11.1–15.11.5 (18 April 2026) — Comprehensive Audit & Hygiene Pass

**Crunchy QA — exhaustive audit across all frontend JS, CSS, SW, HTML**

### 🔴 Critical Fixes
- **Peel card interaction** (v15.11.1): peek content invisible (ARTI+meaning hidden), multi-card stays open simultaneously, whole-card touch triggers peek — now accordion + peek-button-only touch area
- **toggleBookmark SVG destroyed** (v15.11.2): `textContent` override wiped SVG star icon on peel cards — now detects SVG and toggles `fill` attribute instead
- **Streak modal never shown** (v15.11.2): `showStreakBroken()` defined but never called — exported to `window`, wired into `gamification.js` break path
- **Duplicate `_renderWeakPoints`** (v15.11.3): SM-2 version shadowed FSRS version — dead SM-2 function + stale patch block removed
- **Streak stat always 0** (v15.11.3): `streakData.count` → `streakData.current` (field mismatch vs gamification.js schema)
- **Quiz result "NaN hari lagi"** (v15.11.4): `srsData[id].due` (undefined) vs `srsData[id].card.due` (ISO string) — fixed with Date parse
- **Theme crash on light mode** (v15.11.5): `loadTheme()` called `.textContent` on null `#themeToggle` (removed from HTML) — null-guarded; also auto-migrates legacy `nn_theme` key
- **Progress bars always empty** (v15.11.5): `updateProgressPanel` used SM-2 fields (`reps`, `interval`, `due` as int) on FSRS nested structure — fixed to `card.reps`, `card.scheduled_days`, `card.due` ISO parse

### 🟡 Data & Feature Fixes
- **`nn_quiz_stats` never written** (v15.11.4): all 9 quiz modes now write via `window.recordQuizStat()` — accuracy chart in Progress tab now populates
- **10 backup keys missing** (v15.11.4): `nn_heatmap`, `nn_quiz_stats`, `nn_accent`, `nn_density`, `nn_furigana`, `nn_romaji`, `nn_fontsize`, `nn_reduce_motion`, `nn_last_activity`, `nn_migrated_v1` added to `USER_DATA_KEYS`
- **Theme key split** (v15.11.4): `settings.js` wrote `nn_theme`, everything else reads `bunpou-theme` — all 4 occurrences fixed
- **`openDetail` vocab-blind** (v15.11.4): vocab card IDs (`vg-*`) silently failed — now routes to `openVocabDetail()`
- **`d.connection`/`d.desc` = "undefined"** (v15.11.4): guarded before template interpolation
- **`--text-lg` CSS var undefined** (v15.11.4): added `1.1rem` to type scale
- **`_buildLearningDNA` not exported** (v15.11.5): Sensei DNA context was always skipped — exported from Supabase IIFE
- **`quiz-drills.json` not SW-cached** (v15.11.5): offline fallback would 404; added to ASSETS

### 🧹 Housekeeping
- **SW cache gap** (v15.11.2): `materi-hub.js`, `onboarding.js`, `settings.js`, `about.js`, `tweaks.js`, 4 AI files — all added to offline ASSETS
- **Dead CSS** (v15.11.2): `.peel-wrap .bookmark-btn` removed (replaced by `.peel-bm-btn`)
- **`var i` triple redeclaration** (v15.11.2): renamed `gi`/`di`/`vi` in `srsDueToday()`
- **`_currentRevealedEl` stale ref** (v15.11.3): reset to null at top of `render()`
- **`var chLabel` duplicate** (v15.11.2): renamed first to `chLabelShort`
- **Stale comment refs** (v15.11.2): `grammar-query.js` → `grammar-index.js` in 2 files
- **`msVersionLabel` hardcoded** (v15.11.4): now reads `window.APP_VERSION`
- **`grammar-query.js` deleted** (v15.11.5): orphaned file, fully superseded by `grammar-index.js`
- **`loadStreak()` scope** (v15.11.2): confirmed working — `streak.js` is non-IIFE, `app.js` call valid

### ⚪ Backend Flagged (not fixed in frontend)
- `sb.auth.getUser()` called synchronously in 6 places → `user_id` always `undefined` → all Supabase writes fail RLS
- `bulkSync()` receives `{id: entry}` object, calls `.map()` → `TypeError`
- `sbClient.supabaseKey` not exposed by Supabase v2 → `_SUPABASE_ANON_KEY` always `''`

## v15.8.0 (18 April 2026)
- **Claude Design UI/UX overhaul** — full visual port from Claude Artifacts prototype
  - Header: glassmorphism sticky TopBar with "N" logo, replaces gradient header
  - Nav: 72px height, SVG icons (book/pencil/star/bar/dots), amber pill indicator
  - Light mode: warm amber palette (was cold blue/grey — now brand-consistent)
  - Body: 3-layer radial ambient glow (warm coffee tones)
  - CSS tokens: 15+ new vars — `--bg-deep`, `--surface-4`, `--accent-hot`, `--ember`,
    `--text-bright`, `--muted-2`, `--border-strong`, `--shadow-card`, `--radius-lg/xl`,
    `--font-jp-display`, `--font-mono`, `--density-pad`
  - Hub doors: DoorCard style — gradient bg, JP glyph backdrop (日/本), badge labels
  - JLPT rings: 68px living rings with glow layer + animated dasharray
  - Lainnya sheet: user row, 3-way theme toggle, SVG nav items, app info
  - Tweaks panel (new): long-press "N" logo 800ms → accent switcher
    (amber/sakura/matcha/indigo), density, furigana toggle; all prefs persisted to localStorage
  - Onboarding: Claude Design style — progress pills, glyph display, option cards
  - Fonts: Shippori Mincho (display JP) + JetBrains Mono added
  - SRS progress bars + legend dots: use token vars (accent-green/cool/gold)
  - All font-family strings → CSS vars (--font-ui, --font-jp, --font-mono)
- New file: `public/js/tweaks.js`
- Backup branch: `backup/pre-claude-design-20260418`
- Tests: 12494 PASS, 0 FAIL (zero regression)

## v15.7.0 (18 April 2026)
- Content Population Batch A: +375 entries via 10-agent pipeline
  - vocab-n3: 150→285 entries (+135: movement verbs, adjectives, society nouns)
  - vocab-n2: 50→130 entries (+80: formal verbs, abstract nouns)
  - vocab-n1: 20→60 entries (+40: advanced abstract nouns)
  - grammar-n2: 30→90 entries (+60: connective patterns, modality)
  - grammar-n1: 0→60 entries (+60: core N1 & keigo patterns — file was empty placeholder)
- QA fixes: 9 confusion_pairs bidirectionality issues resolved before push
- Docs audit: stale counts fixed across MASTER-AUDIT, ARCHITECTURE, CLAUDE, _MAP, CLAUDE-CODE-TASKS, README
- README: fixed wrong GitHub org URL (nugget-nihongo → nuggetenak), live URL, vocab/grammar counts, SRS algo label

## v15.6.1 (16–17 April 2026)
- TASK-CC-1: Deleted stale claude/frontend-overhaul branch
- TASK-CC-2: Fixed level pill order in index.html (N5→N4→N3→N2→N1)
- TASK-CC-3: Fixed header branding (日本語総まとめ → Nugget Nihongo)
- TASK-CC-6: Fixed auth button visibility (display:none → JS-controlled)
- Tasks 4 (TASK 4–7 from 15 Apr audit): grammar_ids filled for Irodori A1/A2-1/A2-2
- Tasks 5: grammar lens content filled for Irodori A2-1 (65 entries) and A2-2 (62 entries)
- grammar-n5: 80→94 entries (14 added via Tasks 4+6)
- grammar-n4: 90→92 entries (2 added via Task 4)
- vocab-n3: 70→100→150 entries (seed batches A+B)
- Supabase: 7 tables deployed, RLS enabled, CDN uncommented in index.html
- Cloudflare Pages: deployed and serving live

## v15.6.0 (10 April 2026) — Enterprise Restructure + AI Infrastructure + Full Codebase Audit

### Bug Fixes (Critical — app crashed on startup)
- **BUG-001**: Removed `srsLoad()` call in `app.js` — `srs.js` was never loaded, caused ReferenceError that aborted entire DOMContentLoaded handler
- **BUG-002**: Added `streak.js` to index.html load order; rewrote it to be display-only (delegates to `gamification.js`) — fixes `loadStreak()` ReferenceError
- **BUG-003**: Activated Supabase CDN `<script>` tag in index.html — `window.supabase` was undefined, breaking all auth/sync/AI
- **Fix**: Resolved `LS_STREAK` key conflict (`'bunpou_streak'` vs `'nn_streak'`) — streak.js now reads from `window.streakState` (gamification.js export)
- **Fix**: Added null guards to `grammar-index.js` compat shim — prevented crash in Node.js test runner

### New Features
- **AI Sensei tab**: Full AI tutor (`ai-tutor.js` 364L) — 3 modes (explain/practice/test), quota bar, conversation history, Learning DNA context injection
- **Stats tab**: Analytics dashboard (`analytics.js` 393L) — JLPT readiness rings, SRS health chart, review heatmap, weak-point tracker
- **FSRS calibration**: `fsrs-math.js` (84L) — math utilities + `window.fsrsIndonesianPrior` hook for Indonesian-learner calibration
- **Offline AI fallback**: `data/fallback/grammar-drills.json` + `vocab-drills.json` — 10+ drill items each, used when AI is unavailable

### AI Infrastructure
- **Cloudflare Worker** (`workers/ai-proxy.js`, 324L): tiered AI routing — Groq (llama-3.1-8b-instant, fast) + Gemini (gemini-1.5-flash, complex) with KV rate limiting per user
- **Supabase Edge Function** (`supabase/functions/ai-router/index.ts`, 278L): backup AI route with Indonesian tutor persona
- **Learning DNA**: `dna-summarizer.js` extracts mistake patterns; `supabase-client.js` injects into AI system prompt via Supabase `learning_dna` JSONB column

### Supabase Upgrades
- `supabase-client.js`: Added Learning DNA API, auth state listener, sync loop
- `supabase/schema.sql`: Full idempotency (DROP POLICY IF EXISTS, CREATE INDEX IF NOT EXISTS, IF NOT EXISTS on all objects); `learning_dna JSONB DEFAULT '{}'` column on profiles
- `fsrs-engine.js`: Added IndexedDB sync queue hook (saves to localState + queues Supabase sync)

### Deployment
- `wrangler.jsonc`: Cloudflare Pages config (serves `public/`, node_compat, observability)
- `workers/wrangler.toml`: Cloudflare Worker config with KV namespace RATE_LIMITS
- `package.json`: Added `deploy`/`preview` scripts + `wrangler@^4.81.0` devDependency; bumped version to 15.6.0; fixed repo URL to `nuggetenak/nugget-nihongo`

### Service Worker (nihongo-v15.6.0)
- Hybrid cache strategy: cache-first static, network-first for `supabase.co`, `workers.dev`, `googleapis.com`, `groq.com`
- Added to cache: `streak.js`, `supabase-client.js`, `analytics.js`, `fsrs-math.js`, `local-state.js`, fallback drills
- Removed from cache: `grammar-query.js` (legacy), empty N1/N2 placeholder stubs

### Data
- **Grammar N2**: 30 real seed entries (gn2-00001 → gn2-00030) — replaces empty stub
- **Vocab N2**: 50 real seed entries (vg-n2-00001 → vg-n2-00050) — replaces empty stub
- **Vocab N1**: 20 real seed entries (vg-n1-00001 → vg-n1-00020) — replaces empty stub

### Dead Code Removal
- Deleted `public/js/srs.js` — old SM-2 algorithm, fully superseded by `fsrs-engine.js` (FSRS)
- Removed `grammar-query.js` from SW cache (superseded by `grammar-index.js`)

### Test Suite
- Removed 16 stale `loadData` calls (week cards n3-w1…n4-w6, dummy.js, bank-soal files, old grammar/index.js)
- Added Architecture v3 tests: `grammarDB` count (≥273), `vocabDB` merged count (≥1400)
- Added fallback drills validation (structure, item count, required fields)
- Result: **10307 PASS, 0 FAIL** (was: 1 FAIL + 17 SKIPs)

### Documentation
- `ARCHITECTURE.md`: Complete rewrite for enterprise hybrid architecture
- `CLAUDE.md`: Updated current state, tech stack, todo list for v15.6.0
- `DESIGN_SYSTEM.md`: Component library documentation (new)
- `SETUP.md`: Step-by-step install + Cloudflare Worker deployment guide (new)
- `docs/`: Collected all project documents from all branches
  - `docs/project/`: VISION, ROADMAP, _MAP, session recaps, directive logs, merge summary
  - `docs/agent-system/`: AGENT-CORE, A1-A9 agents, common modules, reference guides
  - `docs/supabase/`: 28 Postgres best practices reference guides

### Tooling
- `.mcp.json`: Supabase MCP server config (project ref oxeuwkpgrtojjzhcboqz)
- `skills-lock.json`: Supabase Postgres best practices skill lock

---

## v15.4.0 (2 April 2026) — JMdict Pipeline + Supabase + Claude Code Handoff
- **Pipeline**: `tools/jmdict-pipeline.py` — downloads JMdict XML, transforms to Nugget Nihongo format
- **Supabase**: `supabase/schema.sql` — 7 tables with RLS (profiles, srs_cards, course_progress, achievements, review_history, error_reports, user_settings)
- **Supabase**: `public/js/supabase-client.js` — client integration (auth, SRS sync, progress, error reports)
- **Docs**: `CLAUDE.md` — Claude Code handoff note with full project context and task list
- **Docs**: `PROJECT-STATUS-v15.3.2.md` — comprehensive project inventory

## v15.3.2 (2 April 2026) — Study Tracks + Cleanup
- **Tracks**: Runtime auto-population for JLPT tracks (N5-N1) from global DB
- **Tracks**: Runtime auto-population for Soumatome N3/N4 tracks from lens files
- **Tracks**: Freeway track curated with 21 survival grammar patterns (hand-verified)
- **Cleanup**: Removed 5 duplicate vocab lens files (were identical copies of old book files)
- **Docs**: RESUME updated with accurate phase status

## v15.3.1 (2 April 2026) — Soumatome Lens Migration + Cleanup
- **Migration**: Soumatome N3 grammar lens — 132/132 entries populated (desc, examples, connection from old w-files)
- **Migration**: Soumatome N4 grammar lens — 102/102 entries populated
- **Cleanup**: Removed 18 orphan files (old w-files, bank-soal, dummy.js, index.js, qa-tests.js)
- **Tool**: `tools/migrate-soumatome-lens.py` migration script added
- **Docs**: RESUME-v15.3.0.md added for session continuity

## v15.3.0 (2 April 2026) — Architecture v3 + FSRS + Quiz Engine v2 + Gamification
- **Architecture**: Data Architecture v3 — one global DB, book lenses, study tracks
- **Migration**: All IDs migrated to 5-digit format (grammar + vocab)
- **New**: grammar-index.js (merged grammar query API)
- **New**: Soumatome grammar lens structures (N3 + N4)
- **New**: Vocab book lens shells (Irodori A1/A2-1/A2-2, Minna 1/2)
- **New**: tracks.js study track definitions
- **New**: fsrs-engine.js, quiz-engine-v2.js, gamification.js, backup-restore.js
- **New**: `_taxonomy.md` (Taxonomy Master document)
- **Updated**: `_schema.md` rewritten for Architecture v3

## v15.0.0 (1 April 2026) — Project Restructure
**BREAKING: All app file paths changed. SW cache busted.**

### Directory Restructure
- All deployable files moved into `public/` deploy root
- `data/` reorganized: `data/vocab/`, `data/grammar/`, `data/books/`
- `css/style.css` → `public/styles/app.css`
- `manifest.json` → `public/manifest.webmanifest`
- Icons moved to `public/icons/`
- 64 script tags in index.html updated
- ~80 SW ASSETS entries updated
- 34 tool scripts path-fixed

### Infrastructure
- `deploy.yml` simplified: 43 lines → 24 lines (just deploy `public/`)
- `validate.yml` updated for new paths + uses `.nvmrc`
- `pre-deploy-checks.yml` added (structure + security validation)
- `tests/run.js` rewritten with new paths + resilient eval
- Added: `LICENSE` (MIT), `.nvmrc` (Node 22), `.prettierrc`
- `package.json` v15.0.0 with `engines`, `scripts` (test, start, serve, check:version)
- `jsconfig.json` updated with `@public/`, `@data/`, `@js/` path aliases
- `.gitignore` cleaned and simplified
- `.editorconfig` updated
- All `HAS_NEW_STRUCTURE` / GOV-018-D compat code removed from 34 scripts
- Termux scripts updated to new paths

### Documentation
- `ARCHITECTURE.md` rewritten for v15 structure
- `_MAP.md` file structure section updated

### Data (unchanged)
- Vocab: 1,519 entries (N5: 789, N4: 720, N3: 110 [70 active])
- Grammar: N5 248, N4 272, N3 329 (120 global + 132 week cards)
- Tools: 133 scripts (26 spicy + 107 utils)

## v14.27.7 (1 April 2026)
- **Content**: 70 N3 vocab entries (vocab-n3.js activated)
- **Content**: 16 new N3 grammar entries (gn3-0105 to gn3-0120)
- **Fix**: INC-027 — 78 broken xrefs in vocab-n5.js
- **Fix**: INC-018/INC-022 verified resolved
- **Infra**: Root cleanup — 18 governance files moved to docs/
- **Merge**: CRUNCHY-AUDIT (10 AGENT-CORE files, DB fixes, _MAP.md)
- **Merge**: TASK-SPICY-8 (5 validation scripts)
- Total vocab: 1,473 (N5: 711, N4: 692, N3: 70)
- Total grammar N3: 120

## v14.27.4 (31 March 2026)
- TASK-INFRA-1 & TASK-INFRA-2 merged
- TASK-DEPLOY-FIX (P0): pk-nugget-nihongo/ removed from public repo
- GitHub repo synced to main branch

## v14.23.1 (23 March 2026)
- GOV-017 merged (Taxonomy v5, MASTER-DIRECTIVE-LOG)
- TASK-SPICY-F-002 (AUTO-TRIGGER 5 agents)
- GRM-6 confirmed ✅

## v14.22.3 (22 March 2026)
- Batch merge: TASK-SPICY-7, TASK-SPICY-DIAG, TASK-INTEL-P0B,
  TASK-UI-10, TASK-INC015-FIX, TASK-INC014-FIX,
  TASK-BATTER-CATS-REVIEW, TASK-8

## v14.14.0 (18 March 2026)
- TASK-SPICY-1: 19 scripts (tools/scripts/spicy/)

## v14.13.0 (18 March 2026)
- GOV-011: Team expansion (A7 Spicy, A8 Fluffy, A9 Savory)

## v14.11.0 (17 March 2026)
- TASK-UI-BUNDLE-1: daily-word filter, CSS consolidation, INC-001

## v14.9.0 (17 March 2026)
- RESTRUKTURISASI-B: Unified vocab (N5 711, N4 692) + grammar global
