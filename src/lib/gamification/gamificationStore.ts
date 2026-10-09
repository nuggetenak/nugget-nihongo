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
  { level: 1,  xp: 0,      title: 'Pemula',          titleJp: '初心者' },
  { level: 2,  xp: 100,    title: 'Pelajar Baru',    titleJp: '新入生' },
  { level: 3,  xp: 300,    title: 'Murid Tekun',     titleJp: '勤勉な生徒' },
  { level: 4,  xp: 600,    title: 'Pencari Ilmu',    titleJp: '学び人' },
  { level: 5,  xp: 1000,   title: 'Pejuang Kanji',   titleJp: '漢字戦士' },
  { level: 6,  xp: 1500,   title: 'Penerjemah Muda', titleJp: '若き通訳' },
  { level: 7,  xp: 2500,   title: 'Ahli Bunpou',     titleJp: '文法達人' },
  { level: 8,  xp: 4000,   title: 'Pembaca Lancar',  titleJp: '速読家' },
  { level: 9,  xp: 6000,   title: 'Penguasa Bahasa', titleJp: '言葉の主' },
  { level: 10, xp: 10000,  title: 'Nihongo Master',  titleJp: '日本語マスター' },
];

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
        if (b.id === 'night-owl' && hour >= 0 && hour < 4) shouldEarn = true;
        if (b.id === 'early-bird' && hour >= 4 && hour < 6) shouldEarn = true;

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
