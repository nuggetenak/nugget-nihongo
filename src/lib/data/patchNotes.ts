// ══════════════════════════════════════════════════════════════════
//  patchNotes.ts — Riwayat Catatan Rilis & Pembaruan Nugget Nihongo
//  Merekam evolusi sistem dari inisiasi awal hingga v17.1.0
// ══════════════════════════════════════════════════════════════════

export interface PatchNote {
  version: string;
  releaseName: string;
  date: string;
  type: 'major' | 'minor' | 'patch';
  highlights: string[];
  details: {
    category: string;
    items: string[];
  }[];
}

export const PATCH_NOTES_HISTORY: PatchNote[] = [
  {
    version: 'v17.1.0',
    releaseName: 'Desain Seluler Adaptif & Optimasi Lintas Perangkat',
    date: '10 Oktober 2026',
    type: 'minor',
    highlights: [
      'Perombakan Total Antarmuka Seluler (Mobile UX Overhaul) di Seluruh Menu Utama',
      'Eliminasi Tab Collisions & Stacked Navigation Chrome dengan Bounded Responsive Grid',
      'Navigasi Kurikulum Cerdas dengan Bottom Sheet Picker & Target Sentuh Adaptif ≥ 44px',
      'Bilah Metrik Ringkas 4-Kolom di Arena Kuis & Sinkronisasi 13 Mode Latihan Lengkap',
      'Kebun Kata Format 2-Kolom Zen Garden yang Proporsional di Layar Sempit',
      'Horizontal Chip Carousel pada Penjelajah Bab Buku Pegangan (Minna no Nihongo & Genki)',
      'Zero Horizontal Overflow Guarantee (0px) Terverifikasi Otomatis Melalui Playwright Test Suite',
    ],
    details: [
      {
        category: 'Restrukturisasi Tata Letak Seluler (Mobile UX)',
        items: [
          'Materi Hub: Tab switcher (Kurikulum, Buku, Kosakata, Tata Bahasa) direkayasa ulang menggunakan CSS Grid 4-kolom terkendali untuk mengeliminasi bug tab menumpuk.',
          'Materi Hub Quick Tools: Tombol pintasan Kana, Konjugasi, dan Nuansa dipadatkan menjadi satu baris horizontal 36px yang elegan di mobile.',
          'Penjelajah Kurikulum: 4 lapis selector bertingkat digantikan oleh kartu ringkas (~85px) yang memunculkan Bottom Sheet Picker saat disentuh, membawa materi pelajaran langsung di atas lipatan layar (above the fold).',
          'Penjelajah Buku: Daftar bab vertikal 500px digantikan dengan horizontal carousel chip bab yang efisien.',
          'Kebun Kata: Ditransformasikan dari kartu memanjang tunggal menjadi tata letak 2-kolom mobile yang seimbang.',
        ],
      },
      {
        category: 'Arena Kuis & Interaktivitas',
        items: [
          'Kartu metrik kuis disederhanakan menjadi bilah status 4-kolom kompak (~48px) menampilkan Soal, Akurasi, FSRS, dan Air.',
          'Seluruh 13 mode kuis (termasuk Panic Recall, Mora Pacing, dan Pitch Accent) dapat diakses dengan mudah tanpa perlu scrolling panjang.',
          'Sinkronisasi badge Arena Kuis pada Mobile Drawer menjadi "13 Mode".',
        ],
      },
      {
        category: 'Aksesibilitas & Pengujian Lintas Perangkat',
        items: [
          'Seluruh tombol dan kartu interaktif memenuhi standar tap target ≥ 44px dengan umpan balik sentuhan active:scale-95.',
          'Pemberian padding cushion bawah dinamis (calc(5.5rem + env(safe-area-inset-bottom))) mencegah konten tertutup oleh BottomNav.',
          'Verifikasi otomatis 62/62 skenario Playwright pada iPhone SE (375px), Mobile Standar (390px), Tablet (768px), dan Desktop (1440px) dengan zero overflow.',
        ],
      },
    ],
  },
  {
    version: 'v17.0.0',
    releaseName: 'Kurikulum Orisinal, Diagnostik L1, & Vokasional SSW',
    date: '10 Oktober 2026',
    type: 'major',
    highlights: [
      'Peluncuran 8 Jalur Kurikulum Orisinal Nugget Nihongo (JLPT N5–N1 & SSW Kaigo, Food Service, Konstruksi)',
      'Pengorganisasian 74 Unit & 155 Pelajaran Mandiri Lengkap dengan Sasaran Can-Do Standar CEFR-J',
      'Peta Tangga Kognitif Berbasis Processability Theory (Stages 1–6 Pienemann)',
      'Mesin Diagnostik Empiris L1 Bahasa Indonesia: 300 Butir Uji (150 Morfosintaksis & 150 Nada Fonologis)',
      'Personalisasi 4 Substratum Dialek Daerah (Umum, Jawa, Sunda, Batak/Timur) di Materi & Pengaturan',
      '21 Protokol Kedaruratan Gemba K3 & Kaigo SBAR Berstandar Kerja Nyata Jepang',
      'Ekspansi Arena Kuis Menjadi 13 Mode: Panic Recall (5s Fading), Mora Pacing (240 bpm), Pitch Accent, dll.',
      'Kalibrasi FSRS Fatigue-Aware Clamping & Penyesuaian Peluruhan Waktu Malam',
      'Audit Responsif Multi-Device Headless Playwright: 64/64 Cek Lolos Melintasi iPhone SE hingga Desktop',
    ],
    details: [
      {
        category: 'Kurikulum Orisinal & Vokasional',
        items: [
          'Jalur Akademik N5–N1 terstruktur dari Aisatsu dasar hingga dekonstruksi wacana editorial surat kabar tingkat mahir.',
          'Jalur Vokasional SSW Kaigo (Keperawatan Lansia): SOP Koe-kake, komunikasi empatik, & format baku pelaporan darurat SBAR.',
          'Jalur Vokasional SSW Food Service: Protokol sanitasi 5S, standar HACCP, penanganan alergen, & etika pelayanan Omotenashi.',
          'Jalur Vokasional SSW Konstruksi: Pencegahan celaka K3 Gemba, komando akustik kansei KYT (Kiken Yochi Training), & aba-aba alat berat.',
          'Setiap unit dilengkapi catatan fokus analisis kontrasif L1 untuk membongkar jebakan bahasa ibu.',
        ],
      },
      {
        category: 'Diagnostik L1 & Substratum Daerah',
        items: [
          'Database 300 butir diagnostik empiris membedah interferensi transfer L1 Indonesia ↔ L2 Jepang.',
          'Substratum Jawa: Latihan fonologis plosif b/d/g dan pemanjangan vokal chōon.',
          'Substratum Sunda: Mitigasi netralisasi konsonan f/p/v dan artikulasi vokal sentral /ə/.',
          'Substratum Batak & Indonesia Timur: Penyetaraan aksen nada Tokyo heiban (datar) dari irama silabel dinamis.',
        ],
      },
      {
        category: 'Arena Kuis & Mode Latihan Baru',
        items: [
          'Panic Recall Drill: Latihan cover-recall-check dengan hitungan mundur 5 detik tanpa bantuan opsi ganda.',
          'Mora Pacing Drill: Metronom visual 240 bpm untuk menjaga kestabilan isokroni tiap ketukan suku kata mora.',
          'Pitch Accent Drill: Visualisasi kontur nada tinggi-rendah Tokyo (Heiban, Atamadaka, Nakadaka, Odaka).',
          'Macro-Discourse Deconstruct: Bedah struktur argumen premis-antitesis-bukti-sintesis teks N2/N1.',
          'Collocation Matrix: Analisis batas kompatibilitas pragmatis pasangan kata alami.',
        ],
      },
      {
        category: 'Performa & Keandalan Offline',
        items: [
          'Precache Service Worker mencakup seluruh 8 berkas kurikulum mandiri dan basis data diagnostik.',
          'Pencapaian 41.018 tes lolos 100% tanpa kegagalan pada rangkaian pengujian backend dan integrasi.',
          'Audit otomatis Playwright mengonfirmasi 0px kebocoran horizontal melintasi seluruh resolusi layar.',
        ],
      },
    ],
  },
  {
    version: 'v16.0.0',
    releaseName: 'Renaissance & Spaced Mastery',
    date: '10 Oktober 2026',
    type: 'major',
    highlights: [
      'Migrasi Penuh ke Single Page Application (SPA) React 18, Vite, & Tailwind CSS',
      'Penyatuan Kalkulasi Algoritma FSRS v4 di Seluruh 8 Mode Arena Kuis',
      'Pembersihan Form Pengaturan & Penyederhanaan Masuk Murni dengan Google (Google Sign-In)',
      'Widget Review Cerdas FSRS & Bilah Penguasaan Kurikulum JLPT N5–N1 di Beranda',
      'Koleksi Peribahasa Harian Otentik (Kotowaza · ことわざ) dengan Audio Pelafalan',
      'Penataan Ulang Materi Hub dengan Mode Daftar Ringkas (Compact List View) & Filter Jenis Kata',
      'Penataan Ulang Arena Kuis dengan Klaster Fondasi vs Keterampilan Khusus',
      'Mode Spoiler / Blur Interaktif untuk Mencegah Tebak Buta Arti Kalimat',
      'Sistem Pelaporan Kesalahan Konten In-App (Report Issue 🚩) dengan Offline Queue',
      'Optimalisasi Seluler Komprehensif: Pencegahan Bocor Layar (Anti-Horizontal Overflow)',
    ],
    details: [
      {
        category: 'Arsitektur & Kinerja',
        items: [
          'Memigrasikan ribuan baris Vanilla JS lama menjadi komponen modular React dengan Zustand store.',
          'Mengurangi waktu muat awal dengan pemisahan bundel Vite dan caching Service Worker offline.',
          'Menghilangkan ketergantungan form input API key mentah bagi pengguna akhir di menu Pengaturan.',
          'Pencegahan galat jaringan DNS NXDOMAIN dengan isolasi client Supabase yang aman offline.',
        ],
      },
      {
        category: 'UI & UX Beranda & Materi',
        items: [
          'Menghadirkan kartu prioritas FSRS Due yang mendeteksi kartu memori kritis secara dinamis.',
          'Menambahkan bilah progres visual kurikulum N5 hingga N1.',
          'Mode Tampilan Ganda pada Materi Hub: Kartu Grid luas atau Daftar Ringkas untuk memindai cepat.',
          'Pintasan langsung ke Bagan Kana, Matriks Konjugasi, dan Inspektor Nuansa dari Beranda.',
        ],
      },
      {
        category: 'Arena Kuis & Spaced Repetition',
        items: [
          'Memperbarui 8 mode latihan: Flashcard FSRS, Pilihan Ganda, Isian Partikel, Susun Kata, Audio Mendengar, Konjugasi, Terjemahan, dan Deteksi Jebakan.',
          'Setiap jawaban benar/salah kini otomatis memperbarui stabilitas memori FSRS dan menyemai bibit Kebun Kata.',
          'Pemberian hadiah tetes air dinamis (+1 hingga +5 tetes) berdasarkan performa sesi latihan.',
        ],
      },
      {
        category: 'Penyempurnaan Seluler',
        items: [
          'Mengunci viewport tanpa bocor horizontal (`overflow-x: hidden`, `viewport-fit=cover`).',
          'Drawer navigasi seluler lengkap dan tab menu "Tentang" permanen pada Bottom Navigation.',
          'Dukungan safe-area-inset-bottom pada ponsel modern (iPhone notch & gesture bar Android).',
        ],
      },
    ],
  },
  {
    version: 'v15.16.0',
    releaseName: 'AI Content Engine & Validator',
    date: '17 April 2026',
    type: 'minor',
    highlights: [
      'Integrasi Pipeline Promosi Konten AI (Edge Router & Critic Engine)',
      'Widget Umpan Balik Konten AI (Jempol Naik/Turun & Usulan Koreksi)',
      'Pengujian Persona Sensei & Pencegahan Halusinasi Model Bahasa',
    ],
    details: [
      {
        category: 'Kecerdasan Buatan',
        items: [
          'Sistem validasi silang antara model generator dan model kritikus untuk memastikan keaslian bahasa.',
          'Tabel antrean promosi konten cerdas ke dalam bank soal resmi.',
        ],
      },
    ],
  },
  {
    version: 'v15.0.0',
    releaseName: 'Kurikulum Akbar & FSRS Engine',
    date: '8 April 2026',
    type: 'major',
    highlights: [
      'Database 4.800+ Kosakata & 850+ Tata Bahasa JLPT N5 sampai N1',
      'Penerapan Rumus Matematika Retensi FSRS v4 (Stabilitas & Kesulitan)',
      'Jalur Belajar Buku Teks: Minna no Nihongo & Modul Irodori',
      'Jalur Freeway: 21 Pola Kalimat Paling Vital untuk Bertahan Hidup',
    ],
    details: [
      {
        category: 'Kurikulum & Data',
        items: [
          'Penyusunan data kosa kata dengan kanji, kana, romaji, arti bahasa Indonesia, dan contoh kalimat berpasangan.',
          'Pengelompokan tata bahasa berdasar partikel, bentuk verba, pengandaian, dan modalitas.',
        ],
      },
    ],
  },
  {
    version: 'v14.0.0',
    releaseName: 'Kebun Kata & Gamifikasi',
    date: '25 Maret 2026',
    type: 'major',
    highlights: [
      'Fitur Kebun Kata (Kanji Garden) dengan 5 Fase Pertumbuhan (Benih → Mekar)',
      'Sistem Tetes Air Penyiram & Konversi Jawaban Kuis Menjadi Bunga',
      'Heatmap Kalender Aktivitas Belajar 49 Hari',
      'Sistem Lencana Prestasi (12 Badges Penghargaan)',
    ],
    details: [
      {
        category: 'Gamifikasi & Motivasi',
        items: [
          'Merawat pohon kanji menciptakan keterikatan emosional belajar tanpa beban.',
          'Pencatatan rekor streak beruntun dengan kompensasi pemulihan streak (Streak Saver).',
        ],
      },
    ],
  },
  {
    version: 'v12.0.0',
    releaseName: 'Arena Latihan Multi-Dimensi',
    date: '14 Februari 2026',
    type: 'minor',
    highlights: [
      'Peluncuran Mode Flashcard Interaktif 3D',
      'Mode Isian Rumpang Partikel Kalimat',
      'Mode Builder Susun Kata Acak',
      'Matriks Interaktif Perubahan Bentuk Kata Kerja (Konjugasi Te, Nai, Ta, Masu)',
    ],
    details: [
      {
        category: 'Latihan Interaktif',
        items: [
          'Mendukung latihan berbagai gaya belajar: visual, motorik, dan analisis sintaksis.',
        ],
      },
    ],
  },
  {
    version: 'v10.0.0',
    releaseName: 'PWA Offline & Mesin Suara TTS',
    date: '1 Januari 2026',
    type: 'major',
    highlights: [
      'Dukungan Progressive Web App (PWA) — Dapat Diinstal di Home Screen HP/PC',
      '100% Berfungsi Tanpa Koneksi Internet (Offline-First Service Worker)',
      'Integrasi Web Speech API untuk Pelafalan Suara Asli Bahasa Jepang',
    ],
    details: [
      {
        category: 'Fondasi Teknis',
        items: [
          'Seluruh data kosa kata dan tata bahasa di-cache lokal sehingga aplikasi tetap responsif di area minim sinyal.',
        ],
      },
    ],
  },
  {
    version: 'v1.0.0',
    releaseName: 'Lahirnya Nugget Nihongo',
    date: '10 Agustus 2025',
    type: 'major',
    highlights: [
      'Inisiasi Proyek Pembelajaran Bahasa Jepang Khusus Penutur Bahasa Indonesia',
      'Bagan Interaktif Huruf Hiragana & Katakana',
      'Daftar Kosakata Dasar JLPT N5',
    ],
    details: [
      {
        category: 'Awal Mula',
        items: [
          'Berangkat dari keresahan sulitnya menemukan aplikasi belajar bahasa Jepang gratis, tanpa iklan, dan terstruktur dalam bahasa Indonesia.',
        ],
      },
    ],
  },
];
