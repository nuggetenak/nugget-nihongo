import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { FSRSCard, FSRSRating, DailyMission } from '@/types';
import { createNewCard, reviewCard } from './fsrs';

export interface AppSettings {
  theme: 'dark' | 'light' | 'oled';
  showFurigana: boolean;
  showRomaji: boolean;
  audioSpeed: number;
  dailyGoal: number;
}

interface AppState {
  xp: number;
  streak: number;
  lastActiveDate: string;
  cardsStudiedToday: number;
  bookmarks: string[];
  cards: Record<string, FSRSCard>;
  settings: AppSettings;
  dailyMissions: DailyMission[];

  // Actions
  addXP: (amount: number) => void;
  recordReview: (id: string, type: 'vocab' | 'grammar', rating: FSRSRating) => FSRSCard;
  toggleBookmark: (id: string) => void;
  isBookmarked: (id: string) => boolean;
  updateSettings: (newSettings: Partial<AppSettings>) => void;
  checkAndUpdateStreak: () => void;
  resetProgress: () => void;
  exportData: () => string;
  importData: (jsonData: string) => boolean;
}

const getTodayString = () => new Date().toISOString().split('T')[0];

const defaultMissions: DailyMission[] = [
  { id: 'm1', title: 'Belajar 5 Kosakata Baru', target: 5, current: 0, xpReward: 50, completed: false },
  { id: 'm2', title: 'Selesaikan 10 Review Flashcard', target: 10, current: 0, xpReward: 100, completed: false },
  { id: 'm3', title: 'Tanya Sensei AI 1 Pertanyaan', target: 1, current: 0, xpReward: 30, completed: false },
];

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      xp: 250,
      streak: 5,
      lastActiveDate: getTodayString(),
      cardsStudiedToday: 3,
      bookmarks: [],
      cards: {},
      settings: {
        theme: 'dark',
        showFurigana: true,
        showRomaji: true,
        audioSpeed: 1.0,
        dailyGoal: 15,
      },
      dailyMissions: defaultMissions,

      addXP: (amount: number) => {
        set((state) => ({ xp: state.xp + amount }));
      },

      recordReview: (id: string, type: 'vocab' | 'grammar', rating: FSRSRating) => {
        const state = get();
        const existingCard = state.cards[id] || createNewCard(id, type);
        const updatedCard = reviewCard(existingCard, rating);

        // XP rewards: Again=5, Hard=10, Good=15, Easy=20
        const xpMap = { 1: 5, 2: 10, 3: 15, 4: 20 };
        const gainedXP = xpMap[rating];

        // Check missions
        const updatedMissions = state.dailyMissions.map((m) => {
          if (m.id === 'm2') {
            const nextCurrent = m.current + 1;
            const completed = nextCurrent >= m.target;
            return { ...m, current: nextCurrent, completed };
          }
          return m;
        });

        set((s) => ({
          xp: s.xp + gainedXP,
          cardsStudiedToday: s.cardsStudiedToday + 1,
          cards: {
            ...s.cards,
            [id]: updatedCard,
          },
          dailyMissions: updatedMissions,
        }));

        get().checkAndUpdateStreak();
        return updatedCard;
      },

      toggleBookmark: (id: string) => {
        set((state) => {
          const exists = state.bookmarks.includes(id);
          const bookmarks = exists
            ? state.bookmarks.filter((b) => b !== id)
            : [...state.bookmarks, id];
          return { bookmarks };
        });
      },

      isBookmarked: (id: string) => {
        return get().bookmarks.includes(id);
      },

      updateSettings: (newSettings) => {
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        }));
      },

      checkAndUpdateStreak: () => {
        const today = getTodayString();
        const last = get().lastActiveDate;

        if (last === today) return; // already counted for today

        const lastDate = new Date(last);
        const todayDate = new Date(today);
        const diffDays = Math.round((todayDate.getTime() - lastDate.getTime()) / (1000 * 3600 * 24));

        if (diffDays === 1) {
          // Consecutive day
          set((s) => ({
            streak: s.streak + 1,
            lastActiveDate: today,
            cardsStudiedToday: 0,
            dailyMissions: defaultMissions,
          }));
        } else if (diffDays > 1) {
          // Missed days
          set({
            streak: 1,
            lastActiveDate: today,
            cardsStudiedToday: 0,
            dailyMissions: defaultMissions,
          });
        }
      },

      resetProgress: () => {
        set({
          xp: 0,
          streak: 1,
          cardsStudiedToday: 0,
          cards: {},
          bookmarks: [],
          dailyMissions: defaultMissions,
        });
      },

      exportData: () => {
        const data = {
          xp: get().xp,
          streak: get().streak,
          bookmarks: get().bookmarks,
          cards: get().cards,
          settings: get().settings,
          exportedAt: new Date().toISOString(),
        };
        return JSON.stringify(data, null, 2);
      },

      importData: (jsonData: string) => {
        try {
          const data = JSON.parse(jsonData);
          if (data && typeof data === 'object') {
            set((s) => ({
              ...s,
              xp: typeof data.xp === 'number' ? data.xp : s.xp,
              streak: typeof data.streak === 'number' ? data.streak : s.streak,
              bookmarks: Array.isArray(data.bookmarks) ? data.bookmarks : s.bookmarks,
              cards: data.cards && typeof data.cards === 'object' ? data.cards : s.cards,
              settings: data.settings ? { ...s.settings, ...data.settings } : s.settings,
            }));
            return true;
          }
          return false;
        } catch {
          return false;
        }
      },
    }),
    {
      name: 'nugget_nihongo_storage_v2',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
