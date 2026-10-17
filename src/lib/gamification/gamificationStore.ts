// ══════════════════════════════════════════════════════════════════
//  gamificationStore.ts — XP Levels, Badges, Heatmap & Challenges
//  100% Compatible with legacy localStorage ('nn_xp', 'nn_streak', 'nn_heatmap', 'nn_achievements')
// ══════════════════════════════════════════════════════════════════

import { create } from 'zustand';

export interface XPLevelInfo {
  level: number;
  xp: number;
  title: string;
  titleJp: string;
}

export const XP_LEVELS: XPLevelInfo[] = [
  // ── Levels 1–10: N5 Foundation (0 to 5,000 XP) ──
  { level: 1,  xp: 0,      title: 'Pemula',                   titleJp: '初心者' },
  { level: 2,  xp: 100,    title: 'Pelajar Baru',             titleJp: '新入生' },
  { level: 3,  xp: 300,    title: 'Murid Tekun',              titleJp: '勤勉な生徒' },
  { level: 4,  xp: 600,    title: 'Pencari Ilmu',             titleJp: '学び人' },
  { level: 5,  xp: 1000,   title: 'Pejuang Hiragana',         titleJp: 'ひらがな戦士' },
  { level: 6,  xp: 1500,   title: 'Penerjemah Muda',          titleJp: '若き通訳' },
  { level: 7,  xp: 2200,   title: 'Pelafal Mora',             titleJp: 'モーラ発音手' },
  { level: 8,  xp: 3000,   title: 'Penghafal Katakana',       titleJp: 'カタカナ使い' },
  { level: 9,  xp: 4000,   title: 'Pionir Bunpou',            titleJp: '文法の開拓者' },
  { level: 10, xp: 5000,   title: 'Pejuang Dasar N5',         titleJp: 'N5基礎戦士' },

  // ── Levels 11–20: N4 Daily Communicator (5,001 to 20,000 XP) ──
  { level: 11, xp: 6200,   title: 'Penutur Pemula',           titleJp: '初級対話者' },
  { level: 12, xp: 7500,   title: 'Penjelajah Pola',          titleJp: 'パターン探究者' },
  { level: 13, xp: 9000,   title: 'Pendengar Seikatsu',       titleJp: '生活の聴き手' },
  { level: 14, xp: 10500,  title: 'Pembeda Partikel',         titleJp: '助詞の見分け手' },
  { level: 15, xp: 12000,  title: 'Pengrajin Kalimat',        titleJp: '文章の職人' },
  { level: 16, xp: 13500,  title: 'Penutur Sopan Teinei',     titleJp: '丁寧語の遣い手' },
  { level: 17, xp: 15000,  title: 'Penjelajah Kota',          titleJp: '街の案内人' },
  { level: 18, xp: 16500,  title: 'Pengatur Waktu Toki',      titleJp: '時の把握者' },
  { level: 19, xp: 18200,  title: 'Penguasa Aizuchi',         titleJp: '相槌の名手' },
  { level: 20, xp: 20000,  title: 'Penutur Seikatsu N4',      titleJp: 'N4生活達人' },

  // ── Levels 21–30: N3 Bridge Master (20,001 to 60,000 XP) ──
  { level: 21, xp: 23000,  title: 'Penyambung Wacana',        titleJp: '接続の架け橋' },
  { level: 22, xp: 26500,  title: 'Pembeda Nuansa',           titleJp: 'ニュアンス看破者' },
  { level: 23, xp: 30000,  title: 'Penutur Pengandaian',      titleJp: '仮定の探求者' },
  { level: 24, xp: 34000,  title: 'Pengamat Shieki Ukemi',    titleJp: '使役受動の解読者' },
  { level: 25, xp: 38500,  title: 'Pembaca Wacana',           titleJp: '文章読解手' },
  { level: 26, xp: 43000,  title: 'Penakluk Kanji Menengah',  titleJp: '中級漢字の覇者' },
  { level: 27, xp: 48000,  title: 'Penutur Keigo Pemula',     titleJp: '敬語の門弟' },
  { level: 28, xp: 52500,  title: 'Penyimak Siaran',          titleJp: '放送の聞き手' },
  { level: 29, xp: 56500,  title: 'Arsitek Logika Jepang',    titleJp: '日本語論理の構築者' },
  { level: 30, xp: 60000,  title: 'Jembatan Menengah N3',     titleJp: 'N3中級の架橋者' },

  // ── Levels 31–40: N2 Advanced Professional (60,001 to 140,000 XP) ──
  { level: 31, xp: 66000,  title: 'Praktisi Bisnis',          titleJp: 'ビジネス実務者' },
  { level: 32, xp: 73000,  title: 'Penutur Sonkeigo',         titleJp: '尊敬語の達手' },
  { level: 33, xp: 81000,  title: 'Penutur Kenjougo',         titleJp: '謙譲語の達手' },
  { level: 34, xp: 89000,  title: 'Pembeda Makro Diskurus',   titleJp: 'マクロ言説の分析者' },
  { level: 35, xp: 98000,  title: 'Penyimak Diskusi Cepat',   titleJp: '迅速対話の傍聴者' },
  { level: 36, xp: 107000, title: 'Penganalisis Opini',       titleJp: '評論の解読者' },
  { level: 37, xp: 117000, title: 'Spesialis Gemba K3',       titleJp: '現場安全の指南役' },
  { level: 38, xp: 127000, title: 'Penyusun Dokumen Resmi',   titleJp: '公的文書の起草者' },
  { level: 39, xp: 135000, title: 'Pakar Negosiasi',          titleJp: '交渉の調停者' },
  { level: 40, xp: 140000, title: 'Praktisi Mahir N2',        titleJp: 'N2上級実務者' },

  // ── Levels 41–50: N1 / Master Sage (140,001 to 250,000 XP) ──
  { level: 41, xp: 150000, title: 'Penelaah Sastra',          titleJp: '文芸の探訪者' },
  { level: 42, xp: 161000, title: 'Pakar Ungkapan Klasik',    titleJp: '慣用句の碩学' },
  { level: 43, xp: 173000, title: 'Pengurai Struktur Abstrak',titleJp: '抽象論理の解明者' },
  { level: 44, xp: 185000, title: 'Penyimak Nuansa Halus',    titleJp: '微妙なニュアンスの鑑賞者' },
  { level: 45, xp: 198000, title: 'Pakar Yojijukugo',         titleJp: '四字熟語の大家' },
  { level: 46, xp: 211000, title: 'Ahli Retorika Tinggi',     titleJp: '高度レトリックの達人' },
  { level: 47, xp: 224000, title: 'Filsuf Bahasa Jepang',     titleJp: '日本語の哲人' },
  { level: 48, xp: 236000, title: 'Penerjemah Simultan',      titleJp: '同時通訳の巨匠' },
  { level: 49, xp: 245000, title: 'Begawan Nihongo',          titleJp: '日本語の長老' },
  { level: 50, xp: 250000, title: 'Nihongo Master (Tatsujin)',titleJp: '日本語究極の達人' },
];

/**
 * Returns the highest reached level for a given XP value
 */
export function getLevelForXp(xp: number): XPLevelInfo {
  let highest = XP_LEVELS[0];
  for (const lvl of XP_LEVELS) {
    if (xp >= lvl.xp) {
      highest = lvl;
    } else {
      break;
    }
  }
  return highest;
}

/**
 * Computes level progression percentage and remaining XP to next level
 */
export function getNextLevelProgress(xp: number): {
  currentLevel: XPLevelInfo;
  nextLevel: XPLevelInfo | null;
  progressPercent: number;
  xpNeeded: number;
} {
  const current = getLevelForXp(xp);
  const next = XP_LEVELS.find((l) => l.level === current.level + 1) || null;
  if (!next) {
    return { currentLevel: current, nextLevel: null, progressPercent: 100, xpNeeded: 0 };
  }
  const range = next.xp - current.xp;
  const currentProgress = xp - current.xp;
  const progressPercent = Math.min(100, Math.max(0, Math.round((currentProgress / range) * 100)));
  const xpNeeded = Math.max(0, next.xp - xp);
  return { currentLevel: current, nextLevel: next, progressPercent, xpNeeded };
}

// ── Anti-Cheat Rate Limiting & Daily Ceiling Constants (Ticket T-200) ──
export const DAILY_XP_CAP = 2500;
export const BURST_XP_CAP = 150; // max 150 XP per 10s
export const BURST_WINDOW_MS = 10000;

let xpBurstHistory: Array<{ timestamp: number; amount: number }> = [];

/**
 * Validates XP increment against daily ceiling (2,500 XP) and burst rate limits (150 XP / 10s).
 */
export function checkXpAntiCheat(amount: number): { allowed: boolean; effectiveAmount: number; reason?: string } {
  if (amount <= 0) return { allowed: false, effectiveAmount: 0, reason: 'Invalid non-positive XP amount' };

  const now = Date.now();
  xpBurstHistory = xpBurstHistory.filter((item) => now - item.timestamp < BURST_WINDOW_MS);
  const currentBurstTotal = xpBurstHistory.reduce((sum, item) => sum + item.amount, 0);

  let effective = amount;
  if (currentBurstTotal + effective > BURST_XP_CAP) {
    const remainingBurst = Math.max(0, BURST_XP_CAP - currentBurstTotal);
    if (remainingBurst <= 0) {
      return { allowed: false, effectiveAmount: 0, reason: 'Burst rate limit exceeded (>150 XP / 10s)' };
    }
    effective = remainingBurst;
  }

  let todayStr = '';
  try {
    todayStr = new Intl.DateTimeFormat('en-CA', {
      timeZone: typeof Intl !== 'undefined' ? Intl.DateTimeFormat().resolvedOptions().timeZone : 'Asia/Jakarta',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(new Date());
  } catch {
    todayStr = new Date().toISOString().slice(0, 10);
  }

  let dailyEarned = 0;
  if (typeof window !== 'undefined') {
    try {
      const rawCap = localStorage.getItem('nn_daily_xp_cap');
      if (rawCap) {
        const parsed = JSON.parse(rawCap);
        if (parsed.date === todayStr) {
          dailyEarned = parsed.earned || 0;
        }
      }
    } catch {}
  }

  if (dailyEarned >= DAILY_XP_CAP) {
    return { allowed: false, effectiveAmount: 0, reason: 'Daily XP ceiling reached (2500 XP/day)' };
  }

  effective = Math.min(effective, DAILY_XP_CAP - dailyEarned);
  if (effective <= 0) {
    return { allowed: false, effectiveAmount: 0, reason: 'Daily XP ceiling reached' };
  }

  xpBurstHistory.push({ timestamp: now, amount: effective });

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('nn_daily_xp_cap', JSON.stringify({ date: todayStr, earned: dailyEarned + effective }));
    } catch {}
  }

  return { allowed: true, effectiveAmount: effective };
}

export interface BadgeItem {
  id: string;
  name: string;
  desc: string;
  icon: string;
  category: 'vocab' | 'grammar' | 'streak' | 'special';
  earned: boolean;
  earnedAt?: string;
}

export interface QuizModeStat {
  sessionsCompleted: number;
  questionsAnswered: number;
  correctCount: number;
}

const BADGE_TEMPLATES: Omit<BadgeItem, 'earned' | 'earnedAt'>[] = [
  { id: 'vocab-10',   name: 'First Words',        desc: 'Review 10 kosakata pertama',          icon: '🌱', category: 'vocab' },
  { id: 'vocab-100',  name: 'Word Collector',     desc: 'Kumpulkan 100 kosakata',              icon: '📚', category: 'vocab' },
  { id: 'vocab-500',  name: 'Vocabulary Warrior',  desc: 'Kuasai 500 kosakata JLPT',            icon: '⚔️', category: 'vocab' },
  { id: 'vocab-1000', name: 'Lexicon Master',     desc: 'Capai 1.000 kosakata',                icon: '👑', category: 'vocab' },
  { id: 'grammar-10', name: 'Grammar Beginner',   desc: 'Pelajari 10 pola tata bahasa',        icon: '🔤', category: 'grammar' },
  { id: 'grammar-50', name: 'Pattern Spotter',    desc: 'Pelajari 50 pola kalimat',            icon: '🔍', category: 'grammar' },
  { id: 'grammar-100',name: 'Bunpou Architect',   desc: 'Kuasai 100 pola tata bahasa',         icon: '🏗️', category: 'grammar' },
  { id: 'streak-3',   name: 'Awal yang Baik',     desc: 'Capai streak belajar 3 hari berturut', icon: '🔥', category: 'streak' },
  { id: 'streak-7',   name: 'Satu Pekan Kuat',    desc: 'Konsisten 7 hari berturut-turut',      icon: '💪', category: 'streak' },
  { id: 'streak-30',  name: 'Pejuang Satu Bulan', desc: 'Pertahankan streak 30 hari',          icon: '🏆', category: 'streak' },
  { id: 'quiz-first', name: 'Langkah Pertama',    desc: 'Selesaikan 1 sesi latihan di Arena Kuis', icon: '⚔️', category: 'special' },
  { id: 'quiz-perfect', name: 'Sempurna Tanpa Cela', desc: 'Dapatkan akurasi 100% dalam satu sesi kuis', icon: '💯', category: 'special' },
  { id: 'quiz-listening-3', name: 'Telinga Penutur Asli', desc: 'Selesaikan 3 sesi latihan audio listening', icon: '🎧', category: 'special' },
  { id: 'quiz-conjugation-3', name: 'Penakluk Konjugasi', desc: 'Selesaikan 3 sesi matriks konjugasi verba', icon: '🔄', category: 'special' },
  { id: 'quiz-rearrange-3', name: 'Arsitek Sintaksis', desc: 'Selesaikan 3 sesi susun kalimat Jepang', icon: '🧩', category: 'special' },
  { id: 'quiz-50-correct', name: 'Gladiator Kuis', desc: 'Jawab 50 pertanyaan kuis dengan benar', icon: '🥋', category: 'special' },
  { id: 'night-owl',  name: 'Night Owl',          desc: 'Belajar tengah malam (00:00 - 04:00)', icon: '🦉', category: 'special' },
  { id: 'early-bird', name: 'Early Bird',         desc: 'Belajar subuh (04:00 - 06:00)',        icon: '🐦', category: 'special' },
  { id: 'garden-bloom', name: 'Kebun Semerbak',   desc: 'Mekarkan bunga kanji pertama di kebun', icon: '🌸', category: 'special' },
];

export const STREAK_TIPS = [
  "Jangan nyerah! Satu hari absen bukan akhir segalanya. 始めましょう！",
  "Streak putus = kesempatan baru mulai lebih kuat. がんばれ！",
  "Otak butuh istirahat juga — yang penting balik lagi hari ini!",
  "Konsistensi bukan tentang sempurna, tapi tentang balik lagi. 頑張って！",
  "Anki pun bilang: review hari ini lebih baik dari tidak sama sekali!"
];

export interface HeatmapDay {
  date: string;
  reviews: number;
  xp: number;
  active: boolean;
}

export interface GamificationState {
  badges: BadgeItem[];
  heatmap: Record<string, { reviews: number; xp: number }>;
  quizModeStats: Record<string, QuizModeStat>;
  isStreakBrokenModalOpen: boolean;
  streakBrokenTip: string;
  openStreakBrokenModal: (customTip?: string) => void;
  closeStreakBrokenModal: () => void;
  recordActivity: (reviewsCount?: number, xpEarned?: number) => void;
  recordQuizAnswer: (mode: string, isCorrect: boolean) => void;
  recordQuizSessionComplete: (mode: string, score: number, total: number) => void;
  getModeStat: (mode: string) => { sessions: number; answered: number; correct: number; accuracy: number };
  getOverallQuizStats: () => { totalSessions: number; totalAnswered: number; totalCorrect: number; overallAccuracy: number };
  getHeatmapDays: (daysCount?: number) => HeatmapDay[];
  checkAndAwardBadges: (context: {
    vocabCount?: number;
    grammarCount?: number;
    streak?: number;
    gardenBloomed?: boolean;
    perfectQuizSession?: boolean;
    clientTimestamp?: number;
  }) => BadgeItem[];
}

function loadEarnedBadges(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem('nn_achievements');
    if (!raw) return {};
    const parsed: Array<{ id: string; earned_at?: string }> = JSON.parse(raw);
    const map: Record<string, string> = {};
    parsed.forEach((b) => { map[b.id] = b.earned_at || new Date().toISOString(); });
    return map;
  } catch {
    return {};
  }
}

function loadHeatmap(): Record<string, { reviews: number; xp: number }> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem('nn_heatmap');
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function loadQuizModeStats(): Record<string, QuizModeStat> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem('nn_quiz_mode_stats');
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export const useGamificationStore = create<GamificationState>((set, get) => {
  const earnedMap = loadEarnedBadges();
  const initialBadges: BadgeItem[] = BADGE_TEMPLATES.map((t) => ({
    ...t,
    earned: !!earnedMap[t.id],
    earnedAt: earnedMap[t.id] || undefined,
  }));

  return {
    badges: initialBadges,
    heatmap: loadHeatmap(),
    quizModeStats: loadQuizModeStats(),
    isStreakBrokenModalOpen: false,
    streakBrokenTip: STREAK_TIPS[0],

    openStreakBrokenModal: (customTip?: string) =>
      set({
        isStreakBrokenModalOpen: true,
        streakBrokenTip: customTip || STREAK_TIPS[Math.floor(Math.random() * STREAK_TIPS.length)],
      }),

    closeStreakBrokenModal: () => set({ isStreakBrokenModalOpen: false }),

    recordActivity: (reviewsCount = 1, xpEarned = 10) => {
      const today = new Date().toISOString().slice(0, 10);
      const currentHeatmap = { ...get().heatmap };
      const dayData = currentHeatmap[today] || { reviews: 0, xp: 0 };

      currentHeatmap[today] = {
        reviews: dayData.reviews + reviewsCount,
        xp: dayData.xp + xpEarned,
      };

      set({ heatmap: currentHeatmap });

      if (typeof window !== 'undefined') {
        try { localStorage.setItem('nn_heatmap', JSON.stringify(currentHeatmap)); } catch {}
      }

      // Check time-based badges (Night Owl & Early Bird)
      const hour = new Date().getHours();
      if (hour >= 0 && hour < 4) {
        get().checkAndAwardBadges({});
      }
    },

    recordQuizAnswer: (mode: string, isCorrect: boolean) => {
      const stats = { ...get().quizModeStats };
      const current = stats[mode] || { sessionsCompleted: 0, questionsAnswered: 0, correctCount: 0 };
      stats[mode] = {
        ...current,
        questionsAnswered: current.questionsAnswered + 1,
        correctCount: current.correctCount + (isCorrect ? 1 : 0),
      };
      set({ quizModeStats: stats });
      if (typeof window !== 'undefined') {
        try { localStorage.setItem('nn_quiz_mode_stats', JSON.stringify(stats)); } catch {}
      }

      const totalCorrect = Object.values(stats).reduce((acc, s) => acc + (s.correctCount || 0), 0);
      if (totalCorrect >= 50) {
        get().checkAndAwardBadges({});
      }
    },

    recordQuizSessionComplete: (mode: string, score: number, total: number) => {
      const stats = { ...get().quizModeStats };
      const current = stats[mode] || { sessionsCompleted: 0, questionsAnswered: 0, correctCount: 0 };
      stats[mode] = {
        ...current,
        sessionsCompleted: current.sessionsCompleted + 1,
      };
      set({ quizModeStats: stats });
      if (typeof window !== 'undefined') {
        try { localStorage.setItem('nn_quiz_mode_stats', JSON.stringify(stats)); } catch {}
      }

      // Ticket T-199: Award +1 water drop for completing a Choukai listening session
      if (mode === 'listening' || mode === 'choukai') {
        try {
          const { useGardenStore } = require('../garden/gardenStore');
          useGardenStore.getState().addWaterDrop(1);
        } catch {}
      }

      get().checkAndAwardBadges({
        perfectQuizSession: score === total && total > 0,
      });
    },

    getModeStat: (mode: string) => {
      const stat = get().quizModeStats[mode];
      if (!stat || stat.questionsAnswered === 0) {
        return { sessions: 0, answered: 0, correct: 0, accuracy: 0 };
      }
      const accuracy = Math.round((stat.correctCount / stat.questionsAnswered) * 100);
      return {
        sessions: stat.sessionsCompleted,
        answered: stat.questionsAnswered,
        correct: stat.correctCount,
        accuracy,
      };
    },

    getOverallQuizStats: () => {
      const stats = get().quizModeStats;
      let totalSessions = 0;
      let totalAnswered = 0;
      let totalCorrect = 0;
      for (const s of Object.values(stats)) {
        totalSessions += s.sessionsCompleted || 0;
        totalAnswered += s.questionsAnswered || 0;
        totalCorrect += s.correctCount || 0;
      }
      const overallAccuracy = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;
      return { totalSessions, totalAnswered, totalCorrect, overallAccuracy };
    },

    getHeatmapDays: (daysCount = 60): HeatmapDay[] => {
      const heatmap = get().heatmap;
      const result: HeatmapDay[] = [];
      const d = new Date();

      for (let i = 0; i < daysCount; i++) {
        const ds = d.toISOString().slice(0, 10);
        const data = heatmap[ds];
        result.unshift({
          date: ds,
          reviews: data?.reviews || 0,
          xp: data?.xp || 0,
          active: !!data && data.reviews > 0,
        });
        d.setDate(d.getDate() - 1);
      }

      return result;
    },

    checkAndAwardBadges: (context) => {
      const { badges } = get();
      const updated = [...badges];
      const newlyEarned: BadgeItem[] = [];
      const hour = new Date().getHours();
      const overall = get().getOverallQuizStats();
      const modeStats = get().quizModeStats;

      // Ticket T-200: Monotonic clock validation against client tampering
      const isTimeMonotonic = !context.clientTimestamp || Math.abs(Date.now() - context.clientTimestamp) <= 300000;

      updated.forEach((b, idx) => {
        if (b.earned) return;

        let shouldEarn = false;
        if (b.id === 'streak-3' && (context.streak || 0) >= 3) shouldEarn = true;
        if (b.id === 'streak-7' && (context.streak || 0) >= 7) shouldEarn = true;
        if (b.id === 'streak-30' && (context.streak || 0) >= 30) shouldEarn = true;
        if (b.id === 'vocab-10' && (context.vocabCount || 0) >= 10) shouldEarn = true;
        if (b.id === 'vocab-100' && (context.vocabCount || 0) >= 100) shouldEarn = true;
        if (b.id === 'vocab-500' && (context.vocabCount || 0) >= 500) shouldEarn = true;
        if (b.id === 'vocab-1000' && (context.vocabCount || 0) >= 1000) shouldEarn = true;
        if (b.id === 'grammar-10' && (context.grammarCount || 0) >= 10) shouldEarn = true;
        if (b.id === 'grammar-50' && (context.grammarCount || 0) >= 50) shouldEarn = true;
        if (b.id === 'grammar-100' && (context.grammarCount || 0) >= 100) shouldEarn = true;
        if (b.id === 'garden-bloom' && context.gardenBloomed) shouldEarn = true;
        if (b.id === 'quiz-first' && overall.totalSessions >= 1) shouldEarn = true;
        if (b.id === 'quiz-perfect' && context.perfectQuizSession) shouldEarn = true;
        if (b.id === 'quiz-listening-3' && (modeStats['listening']?.sessionsCompleted || 0) >= 3) shouldEarn = true;
        if (b.id === 'quiz-conjugation-3' && (modeStats['conjugation']?.sessionsCompleted || 0) >= 3) shouldEarn = true;
        if (b.id === 'quiz-rearrange-3' && (modeStats['rearrange']?.sessionsCompleted || 0) >= 3) shouldEarn = true;
        if (b.id === 'quiz-50-correct' && overall.totalCorrect >= 50) shouldEarn = true;
        if (b.id === 'night-owl' && isTimeMonotonic && hour >= 0 && hour < 4) shouldEarn = true;
        if (b.id === 'early-bird' && isTimeMonotonic && hour >= 4 && hour < 6) shouldEarn = true;

        if (shouldEarn) {
          const earnedItem = {
            ...b,
            earned: true,
            earnedAt: new Date().toISOString(),
          };
          updated[idx] = earnedItem;
          newlyEarned.push(earnedItem);
        }
      });

      if (newlyEarned.length > 0) {
        set({ badges: updated });
        if (typeof window !== 'undefined') {
          try {
            const saveArray = updated
              .filter((b) => b.earned)
              .map((b) => ({ id: b.id, name: b.name, icon: b.icon, earned_at: b.earnedAt }));
            localStorage.setItem('nn_achievements', JSON.stringify(saveArray));
          } catch {}
        }
      }

      return newlyEarned;
    },
  };
});
