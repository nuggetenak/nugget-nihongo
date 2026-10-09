import { create } from 'zustand';
import { JLPTLevel } from '../types/vocab';
import { FSRSCard } from '../types/fsrs';

export interface ToastMessage {
  id: string;
  text: string;
  icon?: string;
  duration?: number;
}

export interface AppState {
  // Navigation & Active View
  activeTab: 'home' | 'materi' | 'quiz' | 'kebun' | 'sensei' | 'settings' | 'about';
  setActiveTab: (tab: AppState['activeTab']) => void;

  // Level & Search Filter
  selectedLevel: JLPTLevel | 'all';
  setSelectedLevel: (level: JLPTLevel | 'all') => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;

  // Streak & XP
  streak: number;
  xp: number;
  incrementXp: (amount: number) => void;
  updateStreak: (newStreak: number) => void;

  // User Preferences
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  showFurigana: boolean;
  setShowFurigana: (show: boolean) => void;
  showRomaji: boolean;
  setShowRomaji: (show: boolean) => void;

  // Toast System
  toast: ToastMessage | null;
  showToast: (text: string, icon?: string, duration?: number) => void;
  hideToast: () => void;

  // FSRS Cards state
  cards: Record<string, { card: FSRSCard; source?: string }>;
  setCard: (id: string, cardData: { card: FSRSCard; source?: string }) => void;

  // Reset entire store
  resetAllData: () => void;
}

// Safely read from localStorage
function getStoredNumber(key: string, defaultVal: number): number {
  if (typeof window === 'undefined') return defaultVal;
  try {
    const val = localStorage.getItem(key);
    if (!val) return defaultVal;
    const parsed = JSON.parse(val);
    return typeof parsed === 'number' ? parsed : (parsed.count || defaultVal);
  } catch {
    return defaultVal;
  }
}

function getStoredCards(): Record<string, { card: FSRSCard; source?: string }> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem('nn_fsrs_cards');
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function getInitialTab(): AppState['activeTab'] {
  if (typeof window === 'undefined') return 'home';
  const hash = (window.location.hash || '').replace('#', '').toLowerCase();
  if (hash === 'browse') return 'materi';
  if (hash === 'stats') return 'kebun';
  const validTabs: AppState['activeTab'][] = ['home', 'materi', 'quiz', 'kebun', 'sensei', 'settings', 'about'];
  return validTabs.includes(hash as AppState['activeTab']) ? (hash as AppState['activeTab']) : 'home';
}

export const useAppStore = create<AppState>((set, get) => ({
  activeTab: getInitialTab(),
  setActiveTab: (activeTab) => {
    set({ activeTab });
    if (typeof window !== 'undefined') {
      try {
        history.replaceState(null, '', '#' + activeTab);
      } catch {}
    }
  },

  selectedLevel: 'n5',
  setSelectedLevel: (selectedLevel) => set({ selectedLevel }),
  searchQuery: '',
  setSearchQuery: (searchQuery) => set({ searchQuery }),

  streak: getStoredNumber('nn_streak', 1),
  xp: getStoredNumber('nn_xp', 120),
  incrementXp: (amount) => {
    const newXp = get().xp + amount;
    set({ xp: newXp });
    if (typeof window !== 'undefined') {
      try { localStorage.setItem('nn_xp', JSON.stringify(newXp)); } catch {}
    }
  },
  updateStreak: (newStreak) => {
    set({ streak: newStreak });
    if (typeof window !== 'undefined') {
      try { localStorage.setItem('nn_streak', JSON.stringify({ count: newStreak, lastDate: new Date().toISOString().slice(0, 10) })); } catch {}
    }
  },

  theme: 'dark',
  toggleTheme: () => {
    const nextTheme = get().theme === 'dark' ? 'light' : 'dark';
    set({ theme: nextTheme });
    if (typeof window !== 'undefined') {
      try { localStorage.setItem('bunpou-theme', nextTheme); } catch {}
    }
  },
  showFurigana: true,
  setShowFurigana: (showFurigana) => {
    set({ showFurigana });
    if (typeof window !== 'undefined') {
      try { localStorage.setItem('nn_furigana', showFurigana ? '1' : '0'); } catch {}
    }
  },
  showRomaji: false,
  setShowRomaji: (showRomaji) => {
    set({ showRomaji });
    if (typeof window !== 'undefined') {
      try { localStorage.setItem('nn_romaji', showRomaji ? '1' : '0'); } catch {}
    }
  },

  toast: null,
  showToast: (text, icon = '🍙', duration = 2800) => {
    set({ toast: { id: Date.now().toString(), text, icon, duration } });
    setTimeout(() => {
      if (get().toast?.text === text) {
        set({ toast: null });
      }
    }, duration);
  },
  hideToast: () => set({ toast: null }),

  cards: getStoredCards(),
  setCard: (id, cardData) => {
    const updated = { ...get().cards, [id]: cardData };
    set({ cards: updated });
    if (typeof window !== 'undefined') {
      try { localStorage.setItem('nn_fsrs_cards', JSON.stringify(updated)); } catch {}
    }
  },

  resetAllData: () => {
    if (typeof window !== 'undefined') {
      try {
        const keysToRemove = [];
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && (key.startsWith('nn_') || key.startsWith('bunpou_'))) {
            keysToRemove.push(key);
          }
        }
        keysToRemove.forEach((k) => localStorage.removeItem(k));
      } catch {}
    }
    set({
      streak: 0,
      xp: 0,
      cards: {},
    });
  },
}));
