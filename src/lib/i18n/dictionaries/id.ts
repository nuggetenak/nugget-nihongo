// ══════════════════════════════════════════════════════════════════
//  id.ts — Kamus Terjemahan Bahasa Indonesia (Bahasa Utama Nugget Nihongo)
// ══════════════════════════════════════════════════════════════════

export const idDictionary = {
  // ── Navigasi Pokok ──
  'nav.home': 'Beranda',
  'nav.materi': 'Materi',
  'nav.quiz': 'Latihan',
  'nav.kebun': 'Kebun Kata',
  'nav.sensei': 'Sensei AI',
  'nav.choukai': 'Choukai CBT',
  'nav.methodology': 'Metodologi',
  'nav.settings': 'Pengaturan',
  'nav.about': 'Tentang',

  // ── Header & Aksi Umum ──
  'common.search': 'Cari kosakata, kanji, atau tata bahasa...',
  'common.loading': 'Memuat data...',
  'common.back': 'Kembali',
  'common.close': 'Tutup',
  'common.save': 'Simpan',
  'common.cancel': 'Batal',
  'common.confirm': 'Konfirmasi',
  'common.reset': 'Reset',
  'common.download': 'Unduh',
  'common.success': 'Berhasil',
  'common.error': 'Terjadi Kesalahan',
  'common.level': 'Level',
  'common.track': 'Jalur Belajar',

  // ── Beranda (Home) ──
  'home.daily_target': 'Target Harian',
  'home.streak': 'Hari Beruntun',
  'home.reviews_due': 'Kartu Perlu Diulang',
  'home.start_review': 'Mulai Ulasan Sekarang',
  'home.continue_lesson': 'Lanjutkan Pelajaran',
  'home.curriculum_tracks': 'Jalur Kurikulum & Buku',
  'home.vocational_ssw': 'Spesialisasi Kerja SSW & K3',
  'home.kanji_mastery': 'Dojo Penguasaan Kanji',

  // ── Materi Hub ──
  'materi.curriculum_tab': 'Kurikulum Bertahap',
  'materi.kanji_tab': 'Dojo Kanji 2136',
  'materi.books_tab': 'Buku Standar Jepang',
  'materi.all_categories': 'Semua',
  'materi.vocab': 'Kosakata',
  'materi.grammar': 'Tata Bahasa',
  'materi.kanji': 'Kanji',
  'materi.drills': 'Latihan Soal',

  // ── Kuis & Latihan (Quiz) ──
  'quiz.arena_title': 'Arena Latihan Adaptif',
  'quiz.mode_mixed': 'Campuran Cerdas (FSRS)',
  'quiz.mode_vocab': 'Fokus Kosakata',
  'quiz.mode_grammar': 'Fokus Tata Bahasa',
  'quiz.mode_kanji': 'Fokus Kanji',
  'quiz.mode_audio': 'Dengar & Tebak (Choukai)',
  'quiz.mode_k3': 'SOP Darurat K3 & Panik',
  'quiz.mode_onomatopoeia': 'Onomatope Klinis & Nyeri',
  'quiz.answer_check': 'Periksa Jawaban',
  'quiz.answer_next': 'Lanjut Pertanyaan',
  'quiz.grade_again': 'Ulangi (1)',
  'quiz.grade_hard': 'Sulit (2)',
  'quiz.grade_good': 'Bagus (3)',
  'quiz.grade_easy': 'Mudah (4)',

  // ── Kebun Kata (SRS Spaced Repetition) ──
  'kebun.title': 'Kebun Kata FSRS',
  'kebun.desc': 'Pantau perkembangan ingatan jangka panjangmu berdasarkan algoritma FSRS v4.5.',
  'kebun.seed': 'Benih (Baru)',
  'kebun.sprout': 'Tunas (Belajar)',
  'kebun.tree': 'Pohon Muda (Mengulas)',
  'kebun.mature': 'Pohon Rindang (Hafal Kuat)',
  'kebun.review_now': 'Siram Kebun Sekarang',

  // ── Sensei AI ──
  'sensei.title': 'Tutor Pribadi Sensei AI',
  'sensei.status_ready': 'Siap Membimbing',
  'sensei.status_thinking': 'Sensei sedang berpikir...',
  'sensei.input_placeholder': 'Tanyakan tata bahasa, perbedaan nuansa, atau simulasi percakapan...',
  'sensei.send': 'Kirim',
  'sensei.clear_history': 'Hapus Percakapan',

  // ── Pengaturan (Settings) ──
  'settings.title': 'Pengaturan & Preferensi',
  'settings.theme': 'Tema Tampilan',
  'settings.language': 'Bahasa Antarmuka',
  'settings.furigana': 'Tampilkan Furigana',
  'settings.romaji': 'Tampilkan Romaji',
  'settings.sfx': 'Efek Suara Kuis',
  'settings.tts_speed': 'Kecepatan Pelafalan Audio',
  'settings.l1_dialect': 'Penyesuaian Logat Bahasa Ibu',
  'settings.backup_export': 'Unduh Cadangan Data',
  'settings.backup_import': 'Pulihkan Cadangan Data',
};

export type TranslationKey = keyof typeof idDictionary;
