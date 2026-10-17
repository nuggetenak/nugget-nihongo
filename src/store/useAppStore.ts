import { create } from 'zustand';
import { JLPTLevel } from '../types/vocab';
import { FSRSCard } from '../types/fsrs';
import { useGamificationStore, checkXpAntiCheat } from '../lib/gamification/gamificationStore';
import { useGardenStore } from '../lib/garden/gardenStore';
import { L1Substratum } from '../lib/data/diagnosticManager';
import { localeManager, SupportedLocale } from '../lib/i18n/localeManager';
import { announcer } from '../lib/a11y/announcer';
import {
  safeGetItem,
  sanitizeFSRSCards,
  sanitizeStreak,
  sanitizeNumber,
  sanitizeCompletedLessonIds,
  sanitizePlacementHistory,
} from '../lib/storage/storageSanitizer';

export interface ToastMessage {
  id: string;
  text: string;
  icon?: string;
  duration?: number;
}

export interface ActiveLessonContext {
  trackId: string;
  unitId: string;
  lessonId: string;
  trackType?: 'curriculum' | 'book' | 'jlpt';
}

export interface AppState {
  // Navigation & Active View
  activeTab: 'home' | 'materi' | 'quiz' | 'kebun' | 'sensei' | 'settings' | 'about' | 'study' | 'methodology' | 'choukai';
  setActiveTab: (tab: AppState['activeTab']) => void;

  // Active Dedicated Study Studio
  activeLessonContext: ActiveLessonContext | null;
  openLessonStudy: (trackId: string, unitId: string, lessonId: string, trackType?: 'curriculum' | 'book' | 'jlpt') => void;
  closeLessonStudy: () => void;
  injectLessonItemsToFSRS: (grammarIds: string[], vocabIds: string[]) => void;
  completedLessonIds: string[];
  completeLesson: (lessonId: string, grammarIds: string[], vocabIds: string[]) => { awardedXp: number; awardedWater: number };

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
  recordStudyActivity: () => void;
  checkStreakStatus: () => void;

  // User Preferences & L1 Dialect Substratum
  userSubstratum: L1Substratum;
  setUserSubstratum: (substratum: L1Substratum) => void;
  uiLanguage: 'id' | 'en';
  setUiLanguage: (lang: 'id' | 'en') => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  showFurigana: boolean;
  setShowFurigana: (show: boolean) => void;
  showRomaji: boolean;
  setShowRomaji: (show: boolean) => void;
  soundEffects: boolean;
  setSoundEffects: (enabled: boolean) => void;
  speechRate: number;
  setSpeechRate: (rate: number) => void;
  prefersReducedMotion: boolean;
  setPrefersReducedMotion: (enabled: boolean) => void;

  // Toast System
  toast: ToastMessage | null;
  showToast: (text: string, icon?: string, duration?: number) => void;
  hideToast: () => void;

  // FSRS Cards state
  cards: Record<string, { card: FSRSCard; source?: string }>;
  setCard: (id: string, cardData: { card: FSRSCard; source?: string }) => void;

  // Onboarding & Feature Guide Modals
  isOnboardingOpen: boolean;
  openOnboarding: () => void;
  closeOnboarding: () => void;
  isFeatureGuideOpen: boolean;
  openFeatureGuide: () => void;
  closeFeatureGuide: () => void;

  // Patch Notes Modal
  isPatchNotesOpen: boolean;
  openPatchNotes: () => void;
  closePatchNotes: () => void;

  // Kotowaza Proverb Library Modal
  isKotowazaOpen: boolean;
  openKotowaza: () => void;
  closeKotowaza: () => void;

  // Study Toolbox & Adaptive Placement Modal
  isToolboxOpen: boolean;
  openToolbox: () => void;
  closeToolbox: () => void;
  isCatPlacementOpen: boolean;
  openCatPlacement: () => void;
  closeCatPlacement: () => void;
  lastStudiedLesson: { trackId: string; unitId: string; lessonId: string; title?: string } | null;
  setLastStudiedLesson: (lesson: { trackId: string; unitId: string; lessonId: string; title?: string }) => void;

  // Global Shared Modals (Kana, Conjugation, Nuance, Detail)
  isKanaOpen: boolean;
  openKana: () => void;
  closeKana: () => void;
  isConjugationOpen: boolean;
  openConjugation: () => void;
  closeConjugation: () => void;
  isNuanceOpen: boolean;
  openNuance: () => void;
  closeNuance: () => void;
  detailModalItem: any | null;
  detailModalType: 'vocab' | 'grammar';
  openDetailModal: (item: any, type?: 'vocab' | 'grammar') => void;
  closeDetailModal: () => void;

  // Contextual Sensei Sheet Modal
  isSenseiSheetOpen: boolean;
  senseiSheetContext: {
    id: string;
    type: 'grammar' | 'vocab' | 'quiz' | 'kanji';
    level: string;
    target: string;
    meaning_id?: string;
    structure?: string;
    exampleJa?: string;
    exampleId?: string;
  } | null;
  openSenseiSheet: (ctx: {
    id: string;
    type: 'grammar' | 'vocab' | 'quiz' | 'kanji';
    level: string;
    target: string;
    meaning_id?: string;
    structure?: string;
    exampleJa?: string;
    exampleId?: string;
  }) => void;
  closeSenseiSheet: () => void;

  // Textbook Studio Navigation (Ticket T-57)
  materiStudio: 'kurikulum' | 'kanji' | 'buku';
  setMateriStudio: (studio: 'kurikulum' | 'kanji' | 'buku') => void;
  openBookStudio: () => void;

  // Daily XP Goal & Trajectory (Ticket T-57)
  dailyGoalXP: number;
  setDailyGoalXP: (goal: number) => void;

  // Persistent Placement Diagnostic History (Ticket T-63)
  placementHistory: Array<{
    timestamp: string;
    theta: number;
    sem: number;
    recommendedLevel: JLPTLevel;
    questionsAnswered: number;
    accuracy: number;
  }>;
  addPlacementResult: (result: {
    theta: number;
    sem: number;
    recommendedLevel: JLPTLevel;
    questionsAnswered: number;
    accuracy: number;
  }) => void;

  // Direct FSRS Due Session Trigger (Ticket T-62)
  fsrsDueReviewTrigger: boolean;
  startFSRSDueSession: () => void;
  clearFSRSDueReviewTrigger: () => void;

  // Reset entire store
  resetAllData: () => void;
}

/**
 * Returns YYYY-MM-DD in the learner's actual local timezone (WIB/WITA/WIT/JST)
 */
export function getLocalDateString(
  date = new Date(),
  timeZone = (typeof Intl !== 'undefined' ? Intl.DateTimeFormat().resolvedOptions().timeZone : 'Asia/Jakarta')
): string {
  try {
    const formatter = new Intl.DateTimeFormat('en-CA', {
      timeZone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
    return formatter.format(date);
  } catch {
    return date.toISOString().slice(0, 10);
  }
}

/**
 * Returns yesterday's YYYY-MM-DD in the learner's local timezone
 */
export function getLocalYesterdayString(
  date = new Date(),
  timeZone?: string
): string {
  const yesterday = new Date(date.getTime() - 86400000);
  return getLocalDateString(yesterday, timeZone);
}

function loadCompletedLessonIds(): string[] {
  if (typeof window === 'undefined') return [];
  const raw = safeGetItem<any>('nn_completed_lesson_ids', null) || safeGetItem<any>('nn_completed_lesson_xp_ids', null);
  return sanitizeCompletedLessonIds(raw);
}

// Safely read from localStorage with corrupted key quarantine
function getStoredNumber(key: string, defaultVal: number): number {
  if (typeof window === 'undefined') return defaultVal;
  const raw = safeGetItem<any>(key, defaultVal);
  return sanitizeNumber(raw, defaultVal);
}

function getStoredCards(): Record<string, { card: FSRSCard; source?: string }> {
  if (typeof window === 'undefined') return {};
  const raw = safeGetItem<any>('nn_fsrs_cards', {});
  return sanitizeFSRSCards(raw);
}

function getStoredLastStudiedLesson(): { trackId: string; unitId: string; lessonId: string; title?: string } | null {
  if (typeof window === 'undefined') return null;
  return safeGetItem<{ trackId: string; unitId: string; lessonId: string; title?: string } | null>(
    'nn_last_studied_lesson',
    null
  );
}

function getInitialLessonContext(): { trackId: string; unitId: string; lessonId: string; trackType: 'curriculum' | 'book' | 'jlpt' } | null {
  if (typeof window === 'undefined') return null;
  const hash = window.location.hash || '';
  if (!hash.startsWith('#study')) return null;
  const qIndex = hash.indexOf('?');
  if (qIndex === -1) return null;
  const params = new URLSearchParams(hash.substring(qIndex + 1));
  const trackId = params.get('track') || 'n5';
  const lessonId = params.get('lesson') || '';
  const unitId = params.get('unit') || '';
  const trackType = (params.get('type') || 'curriculum') as any;
  if (!lessonId) return null;
  return { trackId, unitId, lessonId, trackType };
}

function getInitialTab(): AppState['activeTab'] {
  if (typeof window === 'undefined') return 'home';
  const rawHash = (window.location.hash || '').replace('#', '').toLowerCase();
  const baseTab = rawHash.split('?')[0];
  if (baseTab === 'browse') return 'materi';
  if (baseTab === 'stats') return 'kebun';
  const validTabs: AppState['activeTab'][] = ['home', 'materi', 'quiz', 'kebun', 'sensei', 'settings', 'about', 'study', 'methodology', 'choukai'];
  return validTabs.includes(baseTab as AppState['activeTab']) ? (baseTab as AppState['activeTab']) : 'home';
}

function loadDailyGoalXP(): number {
  if (typeof window === 'undefined') return 50;
  const raw = safeGetItem<any>('nn_daily_goal_xp', 50);
  return sanitizeNumber(raw, 50, 10, 500);
}

function loadPlacementHistory(): Array<{
  timestamp: string;
  theta: number;
  sem: number;
  recommendedLevel: JLPTLevel;
  questionsAnswered: number;
  accuracy: number;
}> {
  if (typeof window === 'undefined') return [];
  const raw = safeGetItem<any>('nn_cat_placement_history', []);
  return sanitizePlacementHistory(raw);
}

function getInitialReducedMotion(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export const useAppStore = create<AppState>((set, get) => ({
  activeTab: getInitialTab(),
  setActiveTab: (activeTab) => {
    set({ activeTab });
    announcer.announce(`Membuka tab ${activeTab}`, 'polite');
    if (typeof window !== 'undefined') {
      try {
        const targetHash = '#' + activeTab;
        if (window.location.hash !== targetHash) {
          history.pushState(null, '', targetHash);
        }
      } catch {}
    }
  },

  activeLessonContext: getInitialLessonContext(),
  lastStudiedLesson: getStoredLastStudiedLesson(),
  setLastStudiedLesson: (lesson) => {
    set({ lastStudiedLesson: lesson });
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('nn_last_studied_lesson', JSON.stringify(lesson));
      } catch {}
    }
  },
  openLessonStudy: (trackId, unitId, lessonId, trackType = 'curriculum') => {
    const lastLesson = { trackId, unitId, lessonId };
    set({
      activeLessonContext: { trackId, unitId, lessonId, trackType },
      lastStudiedLesson: lastLesson,
      activeTab: 'study',
    });
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('nn_last_studied_lesson', JSON.stringify(lastLesson));
        const targetHash = '#study?track=' + trackId + '&unit=' + unitId + '&lesson=' + lessonId + '&type=' + trackType;
        if (window.location.hash !== targetHash) {
          history.pushState(null, '', targetHash);
        }
      } catch {}
    }
  },
  closeLessonStudy: () => {
    set({
      activeLessonContext: null,
      activeTab: 'materi',
    });
    if (typeof window !== 'undefined') {
      try {
        if (window.location.hash !== '#materi') {
          history.pushState(null, '', '#materi');
        }
      } catch {}
    }
  },

  injectLessonItemsToFSRS: (grammarIds, vocabIds) => {
    const currentCards = { ...get().cards };
    const nowIso = new Date().toISOString();
    let updated = false;

    vocabIds.forEach((vid) => {
      if (!currentCards[vid]) {
        currentCards[vid] = {
          card: {
            due: nowIso,
            stability: 1.0,
            difficulty: 4.5,
            elapsed_days: 0,
            scheduled_days: 1,
            reps: 1,
            lapses: 0,
            state: 1,
          },
          source: 'vocab',
        };
        updated = true;
      }
    });

    grammarIds.forEach((gid) => {
      if (!currentCards[gid]) {
        currentCards[gid] = {
          card: {
            due: nowIso,
            stability: 1.2,
            difficulty: 4.8,
            elapsed_days: 0,
            scheduled_days: 1,
            reps: 1,
            lapses: 0,
            state: 1,
          },
          source: 'grammar',
        };
        updated = true;
      }
    });

    if (updated) {
      set({ cards: currentCards });
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('nn_fsrs_cards', JSON.stringify(currentCards));
        } catch {}
      }
    }
  },

  selectedLevel: 'n5',
  setSelectedLevel: (selectedLevel) => set({ selectedLevel }),
  searchQuery: '',
  setSearchQuery: (searchQuery) => set({ searchQuery }),

  // Deduplicated Lesson Completion (Ticket T-196)
  completedLessonIds: loadCompletedLessonIds(),
  completeLesson: (lessonId, grammarIds, vocabIds) => {
    const { completedLessonIds } = get();
    if (completedLessonIds.includes(lessonId)) {
      return { awardedXp: 0, awardedWater: 0 };
    }

    const nextCompleted = [...completedLessonIds, lessonId];
    set({ completedLessonIds: nextCompleted });

    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('nn_completed_lesson_ids', JSON.stringify(nextCompleted));
        localStorage.setItem('nn_completed_lesson_xp_ids', JSON.stringify(nextCompleted));
      } catch {}
    }

    // Atomically inject FSRS cards
    get().injectLessonItemsToFSRS(grammarIds, vocabIds);

    // Atomically increment XP (+50 XP)
    get().incrementXp(50);

    // Atomically award water drops (+2 water drops) per Ticket T-199
    try {
      useGardenStore.getState().addWaterDrop(2);
    } catch {}

    // Record study activity
    get().recordStudyActivity();

    return { awardedXp: 50, awardedWater: 2 };
  },

  // Reset default XP to 0 and initial streak to 0 (Ticket T-198)
  streak: getStoredNumber('nn_streak', 0),
  xp: getStoredNumber('nn_xp', 0),

  // Rate-limited & ceiling-protected XP increment (Ticket T-200)
  incrementXp: (amount) => {
    const check = checkXpAntiCheat(amount);
    if (!check.allowed || check.effectiveAmount <= 0) {
      return;
    }
    const safeAmount = check.effectiveAmount;
    const newXp = get().xp + safeAmount;
    set({ xp: newXp });
    if (typeof window !== 'undefined') {
      try { localStorage.setItem('nn_xp', JSON.stringify(newXp)); } catch {}
    }
  },

  // Localized Timezone Streak Engine (WIB/WITA/WIT/JST) with 36h Grace Window (Ticket T-197)
  updateStreak: (newStreak) => {
    set({ streak: newStreak });
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(
          'nn_streak',
          JSON.stringify({
            count: newStreak,
            lastDate: getLocalDateString(),
            lastTimestamp: Date.now(),
          })
        );
      } catch {}
    }
  },

  checkStreakStatus: () => {
    if (typeof window === 'undefined') return;
    try {
      const raw = safeGetItem<any>('nn_streak', null);
      if (!raw) return;
      const parsed = typeof raw === 'object' ? raw : { count: raw };
      const count = typeof parsed.count === 'number' ? parsed.count : 0;
      const lastDate = parsed.lastDate || '';
      const lastTimestamp = parsed.lastTimestamp || (lastDate ? new Date(lastDate).getTime() : 0);
      if (!lastDate || count <= 1) return;

      const today = getLocalDateString();
      const yesterday = getLocalYesterdayString();

      // 36-hour grace window (Streak Freeze protection for night shifts & overtime)
      const now = Date.now();
      const isWithinGraceWindow = lastTimestamp > 0 && (now - lastTimestamp <= 36 * 3600 * 1000);

      if (lastDate !== today && lastDate !== yesterday && !isWithinGraceWindow) {
        set({ streak: 1 });
        try {
          localStorage.setItem('nn_streak', JSON.stringify({ count: 1, lastDate: '', lastTimestamp: 0 }));
        } catch {}
        useGamificationStore.getState().openStreakBrokenModal();
      }
    } catch {}
  },

  recordStudyActivity: () => {
    const today = getLocalDateString();
    const yesterday = getLocalYesterdayString();
    const currentStreak = get().streak;
    let storedLastDate = '';
    let storedTimestamp = 0;

    if (typeof window !== 'undefined') {
      try {
        const raw = safeGetItem<any>('nn_streak', null);
        if (raw && typeof raw === 'object') {
          storedLastDate = raw.lastDate || '';
          storedTimestamp = raw.lastTimestamp || (storedLastDate ? new Date(storedLastDate).getTime() : 0);
        }
      } catch {}
    }

    if (storedLastDate === today) {
      return; // already recorded today
    }

    const now = Date.now();
    const isWithinGraceWindow = storedTimestamp > 0 && (now - storedTimestamp <= 36 * 3600 * 1000);

    let nextStreak = currentStreak;
    if (storedLastDate === yesterday || (isWithinGraceWindow && currentStreak > 0)) {
      nextStreak = Math.max(1, currentStreak + 1);
    } else {
      nextStreak = 1;
    }

    set({ streak: nextStreak });
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(
          'nn_streak',
          JSON.stringify({ count: nextStreak, lastDate: today, lastTimestamp: now })
        );
      } catch {}
    }

    useGamificationStore.getState().checkAndAwardBadges({ streak: nextStreak, clientTimestamp: now });
  },

  userSubstratum: typeof window !== 'undefined'
    ? ((localStorage.getItem('nn_user_l1_substratum') as L1Substratum) || 'general_indonesian')
    : 'general_indonesian',
  setUserSubstratum: (userSubstratum) => {
    set({ userSubstratum });
    if (typeof window !== 'undefined') {
      try { localStorage.setItem('nn_user_l1_substratum', userSubstratum); } catch {}
    }
  },

  uiLanguage: typeof window !== 'undefined'
    ? ((localStorage.getItem('nn_ui_language') as SupportedLocale) || 'id')
    : 'id',
  setUiLanguage: (uiLanguage) => {
    set({ uiLanguage });
    localeManager.setLocale(uiLanguage);
    if (typeof window !== 'undefined') {
      try { localStorage.setItem('nn_ui_language', uiLanguage); } catch {}
    }
  },

  theme: (typeof window !== 'undefined' ? (localStorage.getItem('bunpou-theme') as 'dark' | 'light') : 'light') || 'light',
  toggleTheme: () => {
    const nextTheme = get().theme === 'dark' ? 'light' : 'dark';
    set({ theme: nextTheme });
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('bunpou-theme', nextTheme);
        if (nextTheme === 'light') {
          document.documentElement.classList.add('light');
          document.documentElement.classList.remove('dark');
        } else {
          document.documentElement.classList.remove('light');
          document.documentElement.classList.add('dark');
        }
      } catch {}
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

  soundEffects: typeof window !== 'undefined' ? localStorage.getItem('nn_sound_effects') !== '0' : true,
  setSoundEffects: (soundEffects) => {
    set({ soundEffects });
    if (typeof window !== 'undefined') {
      try { localStorage.setItem('nn_sound_effects', soundEffects ? '1' : '0'); } catch {}
    }
  },

  speechRate: typeof window !== 'undefined' ? (parseFloat(localStorage.getItem('nn_speech_rate') || '0.9') || 0.9) : 0.9,
  setSpeechRate: (speechRate) => {
    set({ speechRate });
    if (typeof window !== 'undefined') {
      try { localStorage.setItem('nn_speech_rate', speechRate.toString()); } catch {}
    }
  },

  prefersReducedMotion: getInitialReducedMotion(),
  setPrefersReducedMotion: (prefersReducedMotion) => set({ prefersReducedMotion }),

  toast: null,
  showToast: (text, icon = '🍙', duration = 2800) => {
    set({ toast: { id: Date.now().toString(), text, icon, duration } });
    announcer.announce(text, 'polite');
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

  isOnboardingOpen: typeof window !== 'undefined' ? !localStorage.getItem('nn_onboarding_completed') : false,
  openOnboarding: () => set({ isOnboardingOpen: true }),
  closeOnboarding: () => {
    set({ isOnboardingOpen: false });
    if (typeof window !== 'undefined') {
      try { localStorage.setItem('nn_onboarding_completed', 'true'); } catch {}
    }
  },

  isFeatureGuideOpen: false,
  openFeatureGuide: () => set({ isFeatureGuideOpen: true }),
  closeFeatureGuide: () => set({ isFeatureGuideOpen: false }),

  isPatchNotesOpen: false,
  openPatchNotes: () => set({ isPatchNotesOpen: true }),
  closePatchNotes: () => set({ isPatchNotesOpen: false }),

  isKotowazaOpen: false,
  openKotowaza: () => set({ isKotowazaOpen: true }),
  closeKotowaza: () => set({ isKotowazaOpen: false }),

  isToolboxOpen: false,
  openToolbox: () => set({ isToolboxOpen: true }),
  closeToolbox: () => set({ isToolboxOpen: false }),

  isCatPlacementOpen: false,
  openCatPlacement: () => set({ isCatPlacementOpen: true }),
  closeCatPlacement: () => set({ isCatPlacementOpen: false }),

  // Global Shared Modals
  isKanaOpen: false,
  openKana: () => set({ isKanaOpen: true }),
  closeKana: () => set({ isKanaOpen: false }),

  isConjugationOpen: false,
  openConjugation: () => set({ isConjugationOpen: true }),
  closeConjugation: () => set({ isConjugationOpen: false }),

  isNuanceOpen: false,
  openNuance: () => set({ isNuanceOpen: true }),
  closeNuance: () => set({ isNuanceOpen: false }),

  detailModalItem: null,
  detailModalType: 'vocab',
  openDetailModal: (item, type = 'vocab') => set({ detailModalItem: item, detailModalType: type }),
  closeDetailModal: () => set({ detailModalItem: null }),

  isSenseiSheetOpen: false,
  senseiSheetContext: null,
  openSenseiSheet: (ctx) => set({ isSenseiSheetOpen: true, senseiSheetContext: ctx }),
  closeSenseiSheet: () => set({ isSenseiSheetOpen: false, senseiSheetContext: null }),

  // Textbook Studio Navigation (Ticket T-57)
  materiStudio: 'kurikulum',
  setMateriStudio: (materiStudio) => set({ materiStudio }),
  openBookStudio: () => {
    set({ materiStudio: 'buku' });
    get().setActiveTab('materi');
  },

  // Daily XP Goal & Trajectory (Ticket T-57)
  dailyGoalXP: loadDailyGoalXP(),
  setDailyGoalXP: (dailyGoalXP) => {
    set({ dailyGoalXP });
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('nn_daily_goal_xp', dailyGoalXP.toString());
      } catch {}
    }
  },

  // Persistent Placement Diagnostic History (Ticket T-63)
  placementHistory: loadPlacementHistory(),
  addPlacementResult: (res) => {
    const record = {
      ...res,
      timestamp: new Date().toISOString(),
    };
    const updated = [record, ...get().placementHistory];
    set({ placementHistory: updated });
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('nn_cat_placement_history', JSON.stringify(updated));
      } catch {}
    }
  },

  // Direct FSRS Due Session Trigger (Ticket T-62)
  fsrsDueReviewTrigger: false,
  startFSRSDueSession: () => {
    set({ fsrsDueReviewTrigger: true });
    get().setActiveTab('quiz');
  },
  clearFSRSDueReviewTrigger: () => set({ fsrsDueReviewTrigger: false }),

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
      completedLessonIds: [],
    });
  },
}));
