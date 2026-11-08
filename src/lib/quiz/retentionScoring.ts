// ══════════════════════════════════════════════════════════════════
//  retentionScoring.ts — Nugget Nihongo Retention Scoring & Rewards Math
//  Pure Pedagogical Retention Calculations, Water Drops & Grade Logic
// ══════════════════════════════════════════════════════════════════

export type QuizMode = 
  | 'flashcard'
  | 'multiple-choice'
  | 'listening'
  | 'fill-in'
  | 'rearrange'
  | 'conjugation'
  | 'translation'
  | 'error-find'
  | 'panic-recall'
  | 'mora-pacing'
  | 'pitch-accent'
  | 'discourse-deconstruct'
  | 'collocation-matrix'
  | 'onomatopoeia';

export interface RetentionGradeResult {
  grade: 'S' | 'A' | 'B' | 'C' | 'D';
  label: string;
  passed: boolean;
  hankoAsset: 'hanko_excellent' | 'daruma_recovery';
  colorClass: string;
}

export interface QuizModeInfo {
  mode: QuizMode;
  category: 'fast_challenge' | 'vocab_letters' | 'grammar_audio' | 'advanced_specialized';
  title: string;
  description: string;
  badge: string;
}

export const QUIZ_MODE_REGISTRY: readonly QuizModeInfo[] = [
  // Kategori 1: Tantangan Cepat
  {
    mode: 'flashcard',
    category: 'fast_challenge',
    title: 'Kartu Flashcard FSRS',
    description: 'Uji ingatan cepat bertenaga algoritma FSRS v4.5',
    badge: 'FSRS',
  },
  {
    mode: 'multiple-choice',
    category: 'fast_challenge',
    title: 'Pilihan Ganda Cepat',
    description: 'Pilih arti kata dan tata bahasa paling akurat',
    badge: 'MCQ',
  },
  {
    mode: 'panic-recall',
    category: 'fast_challenge',
    title: 'Simulasi Tanggap Darurat K3',
    description: 'Latihan reflek Cover-Recall-Check 5 detik untuk keselamatan kerja Gemba',
    badge: 'K3 Gemba',
  },

  // Kategori 2: Kosakata & Huruf
  {
    mode: 'mora-pacing',
    category: 'vocab_letters',
    title: 'Pemandu Irama Mora',
    description: 'Latih ritme ketukan mora merata untuk melenyapkan aksen terburu-buru',
    badge: 'Fonetik',
  },
  {
    mode: 'pitch-accent',
    category: 'vocab_letters',
    title: 'Diskriminasi Aksen Nada Tokyo',
    description: 'Bedakan kontur Heiban, Atamadaka, Nakadaka, dan Odaka',
    badge: 'Tokyo Accent',
  },
  {
    mode: 'onomatopoeia',
    category: 'vocab_letters',
    title: 'Klinik Onomatope & Sensasi Rasa',
    description: 'Pahami nuansa mimik Zuki-zuki, Chiku-chiku, dan Gangan di faskes Kaigo',
    badge: 'Onomatope',
  },

  // Kategori 3: Tata Bahasa & Audio
  {
    mode: 'listening',
    category: 'grammar_audio',
    title: 'Audio Menyimak Choukai',
    description: 'Simulasi pendengaran autentik penutur asli Jepang',
    badge: 'Choukai',
  },
  {
    mode: 'fill-in',
    category: 'grammar_audio',
    title: 'Pemilih Partikel Rumpang',
    description: 'Lengkapi partikel partikular は, が, を, に, で secara presisi',
    badge: 'Partikel',
  },
  {
    mode: 'rearrange',
    category: 'grammar_audio',
    title: 'Susun Kalimat Bunsetsu',
    description: 'Susun kepingan frasa semantik Google BudouX menjadi kalimat utuh',
    badge: 'BudouX',
  },
  {
    mode: 'conjugation',
    category: 'grammar_audio',
    title: 'Konjugasi Kata Kerja',
    description: 'Latih perubahan bentuk Te, Ta, Nai, Masu, dan Potensial',
    badge: 'Konjugasi',
  },

  // Kategori 4: Lanjutan & Spesialisasi
  {
    mode: 'translation',
    category: 'advanced_specialized',
    title: 'Terjemahan Kontekstual',
    description: 'Pilih padanan bahasa Indonesia yang paling natural',
    badge: 'Terjemahan',
  },
  {
    mode: 'error-find',
    category: 'advanced_specialized',
    title: 'Deteksi Jebakan Ujian',
    description: 'Temukan bagian kalimat yang salah kaprah gaya JLPT',
    badge: 'Koreksi',
  },
  {
    mode: 'discourse-deconstruct',
    category: 'advanced_specialized',
    title: 'Dekonstruksi Wacana Makro',
    description: 'Petakan argumen, sanggahan, dan konklusi esai',
    badge: 'Wacana',
  },
  {
    mode: 'collocation-matrix',
    category: 'advanced_specialized',
    title: 'Matriks Kolokasi Pasangan Alami',
    description: 'Pahami pasangan kata kerja dan kata benda yang tidak kaku',
    badge: 'Kolokasi',
  },
] as const;

/**
 * Hitung akurasi retensi dalam persentase bulat [0, 100].
 * Menjamin pertahanan terhadap pembagian nol, NaN, dan bilangan negatif.
 */
export function calculateRetentionAccuracy(correctCount: number, totalQuestions: number): number {
  if (!Number.isFinite(totalQuestions) || totalQuestions <= 0) {
    return 0;
  }
  if (!Number.isFinite(correctCount) || correctCount <= 0) {
    return 0;
  }
  const ratio = Math.min(correctCount / totalQuestions, 1.0);
  return Math.max(0, Math.min(100, Math.round(ratio * 100)));
}

/**
 * Hitung hadiah tetes air Kebun Kata (Kanji Garden Water Drops).
 * Rumus kanonikal: 1 tetes dasar + 1 tetes per 3 jawaban benar + 1 bonus akurasi sempurna 100%.
 */
export function calculateWaterDropsReward(correctCount: number, totalQuestions: number): number {
  if (!Number.isFinite(totalQuestions) || totalQuestions <= 0) {
    return 0;
  }
  const cleanCorrect = Math.max(0, Number.isFinite(correctCount) ? correctCount : 0);
  const baseDrops = 1;
  const scoreDrops = Math.floor(cleanCorrect / 3);
  const isPerfect = cleanCorrect === totalQuestions && totalQuestions > 0;
  const perfectBonus = isPerfect ? 1 : 0;
  return baseDrops + scoreDrops + perfectBonus;
}

/**
 * Hitung total XP sesi kuis berdasarkan jenis latihan dan jumlah benar/salah.
 */
export function calculateSessionXpReward(
  correctCount: number,
  incorrectCount: number,
  mode: QuizMode = 'multiple-choice'
): number {
  const cleanCorrect = Math.max(0, Number.isFinite(correctCount) ? correctCount : 0);
  const cleanIncorrect = Math.max(0, Number.isFinite(incorrectCount) ? incorrectCount : 0);

  let correctXp = 10;
  let incorrectXp = 2;

  if (mode === 'rearrange' || mode === 'panic-recall') {
    correctXp = 15;
  } else if (mode === 'flashcard') {
    correctXp = 10;
  }

  return cleanCorrect * correctXp + cleanIncorrect * incorrectXp;
}

/**
 * Evaluasi grade pencapaian retensi (S/A/B/C/D) dan aset Irasutoya pendamping.
 */
export function evaluateRetentionGrade(accuracy: number): RetentionGradeResult {
  const cleanAcc = Math.max(0, Math.min(100, Number.isFinite(accuracy) ? Math.round(accuracy) : 0));

  if (cleanAcc >= 100) {
    return {
      grade: 'S',
      label: 'Sempurna! Taihen Yoku Dekimashita',
      passed: true,
      hankoAsset: 'hanko_excellent',
      colorClass: 'text-amber-800 dark:text-amber-300',
    };
  }
  if (cleanAcc >= 80) {
    return {
      grade: 'A',
      label: 'Hebat! Pemahaman Kokoh & Siap Ujian',
      passed: true,
      hankoAsset: 'hanko_excellent',
      colorClass: 'text-emerald-800 dark:text-emerald-300',
    };
  }
  if (cleanAcc >= 60) {
    return {
      grade: 'B',
      label: 'Cukup Baik — Perlu Sedikit Pemantapan',
      passed: false,
      hankoAsset: 'daruma_recovery',
      colorClass: 'text-cyan-800 dark:text-cyan-300',
    };
  }
  if (cleanAcc >= 40) {
    return {
      grade: 'C',
      label: 'Butuh Pengulangan Materi',
      passed: false,
      hankoAsset: 'daruma_recovery',
      colorClass: 'text-amber-900 dark:text-amber-400',
    };
  }
  return {
    grade: 'D',
    label: 'Semangat! Ulangi Latihan Bersama Daruma',
    passed: false,
    hankoAsset: 'daruma_recovery',
    colorClass: 'text-rose-800 dark:text-rose-300',
  };
}

/**
 * Ambil metadata lengkap untuk satu mode kuis.
 */
export function getQuizModeMeta(mode: QuizMode): QuizModeInfo {
  const found = QUIZ_MODE_REGISTRY.find((m) => m.mode === mode);
  return (
    found || {
      mode,
      category: 'fast_challenge',
      title: mode,
      description: 'Latihan interaktif bahasa Jepang',
      badge: 'Kuis',
    }
  );
}

/**
 * Hitung jumlah kartu yang jatuh tempo review (due today) berdasarkan jadwal memori FSRS.
 */
export function calculatePureFSRSDueCount(cardsMap: Record<string, { card?: { due?: string } }>): number {
  const now = Date.now();
  let count = 0;
  for (const record of Object.values(cardsMap || {})) {
    if (record?.card) {
      if (!record.card.due) {
        count++;
      } else {
        const dueTime = new Date(record.card.due).getTime();
        if (Number.isNaN(dueTime) || dueTime <= now) {
          count++;
        }
      }
    }
  }
  return count;
}

