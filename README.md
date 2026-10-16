# Nugget Nihongo 🍙 (ナゲット日本語)

> **Ekosistem Pembelajaran Bahasa Jepang Modern, Ilmiah, & Mandiri untuk Penutur Indonesia.**  
> *Dari Nol (Jalur Huruf Kana & Freeway) hingga JLPT N1 & Vokasional Kerja Spesifik (SSW / Tokutei Ginou).*

[![Nugget Nihongo Version](https://img.shields.io/badge/version-v19.3.3-amber.svg?style=flat-square)](CHANGELOG.md)
[![Test Suite Status](https://img.shields.io/badge/tests-75%2C136%20passed-emerald.svg?style=flat-square)](tests/run.js)
[![Responsive Audit](https://img.shields.io/badge/responsive-58%2F58%20passed-blue.svg?style=flat-square)](tests/verify-frontend-responsive.js)
[![Corpus Size](https://img.shields.io/badge/vocab-10%2C508%2B%20entries-orange.svg?style=flat-square)](public/data/vocab/)
[![Grammar Points](https://img.shields.io/badge/grammar-859%20patterns-purple.svg?style=flat-square)](public/data/grammar/)
[![PWA Ready](https://img.shields.io/badge/PWA-100%25%20Offline-success.svg?style=flat-square)](public/sw.js)
[![License: MIT](https://img.shields.io/badge/License-MIT-stone.svg?style=flat-square)](LICENSE)

**Aplikasi Live:** [nugget-nihongo.pages.dev](https://nugget-nihongo.pages.dev)  
*(Bisa langsung diakses via peramban atau dipasang sebagai Progressive Web App / PWA di Android, iOS, Windows, dan macOS)*

---

## 🌟 Mengapa Nugget Nihongo?

Mempelajari bahasa Jepang sering kali terasa mengintimidasi bagi penutur Indonesia karena perbedaan rumpun bahasa yang signifikan, ribuan kanji berkarakter ganda, serta tingkatan kesopanan (*Keigo*) yang bernuansa halus. Sebagian besar aplikasi yang ada di pasar hanya menerjemahkan materi dari bahasa Inggris secara kaku tanpa mempertimbangkan cara berpikir bahasa ibu kita.

**Nugget Nihongo** lahir untuk menjawab tantangan tersebut secara tuntas. Menggabungkan **prinsip linguistik kontrastif L1 (Bahasa Indonesia & Dialek Nusantara)**, kurikulum pedagogis spiral bertingkat, algoritma retensi daya ingat ilmiah **FSRS**, dan integrasi **AI Sensei dwibahasa**, aplikasi ini dirancang agar siapa pun dapat menguasai bahasa Jepang secara mandiri, percaya diri, dan bebas dari rasa takut salah (*malu-awareness*).

---

## 🚀 Fitur Unggulan & Ekosistem Pembelajaran

### 1. 🥋 Studio Dojo Kanji & Animasi Goresan Presisi
- **Fisika Tinta Kaligrafi Zero-Glitch**: Menggunakan data kurva resmi KanjiVG dengan kalkulasi panjang busur dinamis (`--stroke-len`). Menjamin seluruh goresan—termasuk goresan pamungkas (*last stroke*) dan goresan titik pendek (*chou-on*)—teranimasi tuntas tanpa artefak kedipan.
- **Kanvas Sentuh Cerdas (Intelligent Touch Canvas)**: Latihan menulis langsung di atas layar sentuh dengan panduan grid ortogonal dan deteksi batas toleransi (*haptic drift feedback*).
- **Struktur Bacaan Onyomi & Kunyomi Riil**: Setiap bacaan dikelompokkan secara terstruktur dengan contoh kosakata nyata, penulisan furigana lengkap `【よみ】`, terjemahan bahasa Indonesia, contoh kalimat berpasangan (JP + ID), serta pemutar audio pelafalan asli. Dilengkapi tombol ekspansi *"Lihat Bacaan Lainnya"* untuk kanji dengan banyak bacaan.

### 2. 🔤 Flashcard Huruf Kana 3D & Panduan Pemula
- **Animasi 3D Flip Card Interaktif**: Kartu flashcard Hiragana & Katakana yang dapat dibalik secara mulus dengan sentuhan fisik nyata.
- **Panduan Pembacaan Anti-Bingung**: Menghilangkan kebingungan pembelajar pemula dengan menyertakan pembacaan kana lengkap dalam kurung siku `【...】` mendampingi kanji dasar (contoh: `朝【あさ】 (Pagi)`).
- **Audio Pelafalan Terpadu**: Dukungan pemutar suara langsung untuk pelafalan karakter kana dan contoh kosakata otentik.
- **100% Cakupan Lengkap**: Meliputi 46 Gojuuon, 25 Dakuon/Handakuon, dan 36 Yoon kombinasi kana dengan contoh kata nyata.

### 3. 🏠 Navigasi Beranda Terstruktur (4 Domain Belajar)
Mengakhiri layout bertumpuk dengan membagi alur belajar secara tegas ke dalam 4 domain pembelajaran:
1. **Tata Bahasa (Grammar)**: Kurikulum berjenjang JLPT N5 hingga N1 dengan total 859 pola kalimat riil, kartu persentase penguasaan, dan akses cepat ke Simulator Konjugasi kata kerja interaktif.
2. **Kosakata & Kanji**: Jalur N5 hingga N1 dengan lebih dari 10.508 kosakata aktif dan 2.210 kanji, kartu penguasaan materi, serta akses langsung ke Tabel Huruf Kana.
3. **Vokasional SSW (Tokutei Ginou)**: Panduan resmi visa kerja terampil Jepang untuk 3 sektor prioritas (*Kaigo* / Keperawatan Lansia, *Gaishoku* / Restoran & Pengolahan Makanan, dan *Kensetsu* / Konstruksi) dengan modul unit & pelajaran kerja terstruktur.
4. **Statistik & Pencapaian**: Pemantauan XP, Streak belajar harian, status kartu memori FSRS, Kalender Aktivitas Belajar, dan Lencana Kehormatan (*Badges*).

### 4. 📚 Perpustakaan 9 Buku Teks Jepang Resmi
Akses materi dan latihan bab demi bab dari 9 buku teks kanonikal terpopuler di dunia, dihiasi sampul seni klasik Shin-Hanga editorial:
- **Jalur Akademik**: *Minna no Nihongo (Shokyu I & II)*, *Genki (I & II)*, dan *Quartet (I & II)*.
- **Jalur Komunikatif & SSW**: *Irodori: Bahasa Jepang untuk Kehidupan di Jepang (Starter A1, A2-1, A2-2)* dan *Marugoto (A1, A2-1, A2-2)*.
- **Jalur Ujian JLPT**: *Shin Kanzen Master (N3–N1)*, *Nihongo Sou Matome (N5–N1)*, dan *TRY!*.
- **Jalur Budaya & Lanjutan**: *Tobira Gateway to Advanced Japanese* dan *Dekiru Nihongo*.
- **Metodologi Pedagogis 5W+1H**: Setiap bab dilengkapi alasan pedagogis penempatan materi, perbandingan lintas buku teks, serta *Signature Drills* interaktif.

### 5. 🧠 Pusat Retensi FSRS Ilmiah (Memory Vault)
- Menggantikan sistem flashcard konvensional (*Leitner/SM-2*) dengan **Free Spaced Repetition Scheduler (FSRS-5)** modern.
- Menghitung secara matematis **Stabilitas Ingatan ($S$)**, **Tingkat Kesulitan ($D$)**, dan **Probabilitas Penarikan Ingatan ($R$)**.
- Visualisasi grafik status retensi (*New, Learning, Review, Relearning*), kurva kelupaan Ebbinghaus, dan pemantauan kartu jatuh tempo agar waktu belajar tidak terbuang sia-sia mengulang materi yang sudah dikuasai.

### 6. 🍵 AI Sensei Multi-Model Auto-Router
- **Dua Persona Karakter Otentik**:
  - **Sensei Nugget**: Tutor berpengalaman yang lugas, bernas, langsung pada inti persoalan, dan mendasarkan penjelasan pada linguistik terapan.
  - **Senpai Aoi (葵先輩)**: Pembimbing yang ramah, hangat, sabar, dan menguraikan konsep sulit lewat analogi keseharian di Jepang.
- **Integrasi Multi-Model Bebas Kendala Autentikasi**:
  - Terhubung langsung dengan provider **OpenRouter** (*Qwen 2.5 72B, Llama 3.3 70B, DeepSeek V3*) dan **Google Gemini** (*Gemini 3.8 Flash & Flash Lite*).
  - Mode Latihan Skenario Percakapan (*Roleplay*) dan Pemeriksaan Tulisan Berbasis Wacana (*Discourse Correction*).

### 7. 🎯 Arena Kuis & Mission Launchpad
- **9 Mode Kuis Komprehensif**: Pilihan Ganda, Susun Kalimat, Tebak Partikel, Konjugasi Kata Kerja, Deteksi Kesalahan (*Error-find*), dan Terjemahan Balik.
- **Bilah Zen Focus**: Tampilan pengerjaan soal bersih tanpa distraksi dengan indikator streak animasi api.
- **Putaran Pemulihan (Remediation Loop)**: Setiap soal yang salah dijawab akan otomatis ditandai dan diujikan kembali di akhir sesi hingga konsep benar-benar tuntas dipahami.

### 8. 📱 Zero-Clipping Modal Portals & Desain Responsif Universal
- **React Portal Body Mounting**: Seluruh dialog dan modal interaktif dimount langsung ke `document.body` via `createPortal`, memastikan latar belakang gelap memayungi 100% area layar tanpa celah terang di bawah navbar atau status bar ponsel.
- **Standar Multi-Perangkat (Zero Blowout)**: Teruji pada ponsel ultra-ringkas 320px–375px (iPhone SE), ponsel modern 390px–430px, tablet/iPad, hingga monitor desktop lebar 1920px+.
- **Dual-Theme Harmonis**: Pilihan tema **Warm Sumi & Makie (蒔絵)** bernuansa arang pernis emas (`#121110`, `#1A1816`, `#F59E0B`) yang ramah mata tanpa benturan warna biru dingin, serta tema **Kertas Washi (和紙)** lembut untuk sesi siang hari.

### 9. ⚡ 100% Offline-First PWA & Privasi Mutlak
- Bekerja penuh secara offline berkat arsitektur Service Worker hibrida (*Cache-First* untuk aset antarmuka dan *Stale-While-Revalidate* untuk korpus data).
- Tidak mewajibkan login atau pembuatan akun. Seluruh kemajuan belajar, riwayat review, streak, dan metrik memori tersimpan aman di peramban lokal pengguna (*LocalStorage & IndexedDB*).

---

## 📊 Cakupan Korpus Basis Data (v19.3.3)

| Tingkat / Jalur Belajar | Kosakata Aktif | Pola Tata Bahasa | Karakter Kanji | Fokus & Kompetensi Utama |
| :--- | :---: | :---: | :---: | :--- |
| **JLPT N5 / JFT A1** | **1.321** | **94** | 103 | Salam harian, partikel primer, angka, kopula, kata kerja sopan (*~masu*). |
| **JLPT N4 / JFT A2** | **1.286** | **92** | 181 | Bentuk sambung (*te-form*), syarat (*~tara/~ba*), izin (*~te mo ii*), keharusan. |
| **JLPT N3 / B1** | **2.580** | **163** | 367 | Nuansa emosi, wacana transisi, ragam bahasa kasual vs formal sehari-hari. |
| **JLPT N2 / B2** | **2.104** | **310** | 415 | Bahasa berita, percakapan kantor & bisnis (*Keigo*), relasi logis abstrak. |
| **JLPT N1 / C1** | **3.217** | **200** | 1.144 | Wacana tingkat tinggi, ekspresi literatur klasik, dokumen legal & editorial. |
| **Vokasional SSW / Kaigo** | **380+** | **42** | — | Istilah keperawatan lansia (*Kaigo*), pengolahan makanan, konstruksi (*JAC*). |
| **TOTAL KORPUS** | **10.508+** | **859** | **2.210** | **Terverifikasi 100% dengan audio TTS, furigana, & contoh kalimat ID** |

---

## 🛠️ Panduan Memulai Cepat (Quick Start)

### Prasyarat
- Node.js versi `20.x` atau `22.x`
- npm versi `10.x` atau lebih baru

### Instalasi & Menjalankan Lokal

```bash
# 1. Kloning repositori
git clone https://github.com/nuggetenak/nugget-nihongo.git
cd nugget-nihongo

# 2. Pasang dependensi
npm install

# 3. Jalankan server pengembang
npm run dev
```

Buka `http://localhost:5173` pada peramban Anda.

### Menjalankan Uji Otomatis & Build

```bash
# Menjalankan 75.136+ unit test & integritas korpus data
npm test

# Menjalankan 58 uji responsif multi-perangkat Playwright
npm run test:responsive

# Membangun bundel produksi (otomatis menyinkronkan CHANGELOG & korpus)
npm run build
```

---

## 📂 Struktur Repositori

```
nugget-nihongo/
├── public/
│   ├── assets/generated/    # Sampul 9 buku teks & ilustrasi maskot Shin-Hanga
│   ├── data/                # Korpus terkompilasi (vocab, grammar, kurikulum, buku)
│   ├── js/core/             # Inisialisasi versi runtime & deteksi tema
│   └── sw.js                # Mesin Service Worker PWA & caching luring
├── src/
│   ├── components/
│   │   ├── cat/             # CatPlacementModal (Diagnostik adaptif IRT)
│   │   ├── gamification/    # BadgesModal, pencapaian, streak flame
│   │   ├── kana/            # KanaChartModal (Flashcard 3D flip, audio, pembacaan)
│   │   ├── kanji/           # KanjiStrokeModal, KanjiDojoView, kalkulator goresan
│   │   ├── kotowaza/        # KotowazaModal (Peribahasa Jepang & padanan Indonesia)
│   │   ├── materi/          # BookTrackBrowser, CurriculumTrackBrowser, DrillModal
│   │   ├── quiz/            # Arena Kuis, Flashcards, Session Config, Zen Bar
│   │   ├── sensei/          # Contextual Sensei Sheet, AI chat interface
│   │   ├── tools/           # StudyToolboxModal (Simulator konjugasi, kalkulator pitch)
│   │   └── ui/              # DetailModal, PatchNotesModal, Navbar, Sidebar
│   ├── config/              # Konfigurasi versi (APP_VERSION) & tema
│   ├── lib/
│   │   ├── ai/              # senseiClient (Auto-router OpenRouter & Gemini)
│   │   ├── audio/           # voiceManager (Web Speech TTS) & SFX kaligrafi
│   │   ├── data/            # dataManager, kanjiManager, authenticExerciseManager
│   │   └── srs/             # fsrs-engine, kurva memori, jadwal review
│   ├── pages/               # Halaman utama (Home, Materi, Kuis, Kebun, Sensei, Settings)
│   └── index.css            # Desain token tema Washi, Warm Sumi, dan animasi goresan
├── tests/                   # 75.136 unit test & suite audit visual Playwright
└── workers/                 # Edge Worker Cloudflare untuk proksi AI aman
```

---

## 🤝 Kontribusi & Kode Etik

Kami menyambut kontribusi dari komunitas pembelajar bahasa Jepang, guru, dan pengembang perangkat lunak!  
Jika Anda menemukan kesalahan ketik (*typo*), kalimat contoh yang kurang alami, atau ingin mengusulkan fitur baru:
1. Buka [Issues](https://github.com/nuggetenak/nugget-nihongo/issues) untuk mendiskusikan perubahan.
2. Buat branch baru (`git checkout -b fitur/nama-fitur`).
3. Pastikan seluruh pengujian lolos (`npm test` dan `npm run test:responsive`).
4. Ajukan *Pull Request* ke branch `main`.

---

## 📜 Lisensi & Atribusi

Proyek ini dirilis di bawah lisensi **[MIT License](LICENSE)** — bebas digunakan, dipelajari, dan dikembangkan untuk kepentingan pendidikan.

- **Data Kanji**: Bersumber dari proyek terbuka [KanjiVG](https://kanjivg.tagaini.net/) oleh Ulrich Apel (berlisensi CC BY-SA 3.0).
- **Inspirasi Pedagogis**: Format silabus mengacu pada standar resmi Japan Foundation (*Irodori / Marugoto*), standar JLPT/JEES, dan buku teks kanonikal (*Minna no Nihongo, Genki, Tobira, Quartet, Shin Kanzen Master, Sou Matome*).
- **Dibuat dengan ❤️ di Indonesia untuk para pejuang bahasa Jepang di seluruh Nusantara.**
