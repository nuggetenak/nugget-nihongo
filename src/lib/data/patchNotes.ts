// ══════════════════════════════════════════════════════════════════
//  patchNotes.ts — Riwayat Catatan Rilis & Pembaruan Nugget Nihongo
//  Merekam evolusi sistem dari inisiasi awal hingga v16.0.0
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
