// ══════════════════════════════════════════════════════════════════
//  curriculumStore.ts — Offline-First Curriculum Progress State Store
//  Tracks user progress across JLPT N5–N1 and SSW Vocational Tracks
//  Persists in localStorage with zero-latency synchronous retrieval
// ══════════════════════════════════════════════════════════════════

import { create } from 'zustand';
import { L1Substratum } from '../data/diagnosticManager';
import { useGamificationStore } from '../gamification/gamificationStore';

export type TrackId =
  | 'n5'
  | 'n4'
  | 'n3'
  | 'n2'
  | 'n1'
  | 'ssw-kaigo'
  | 'ssw-food'
  | 'ssw-construction';

export interface TrackProgressState {
  completedUnits: string[];
  completedLessons: string[];
  lessonScores: Record<string, number>; // lessonId -> percentage (0..100)
  lastStudiedTimestamp?: string;
}

export interface CurriculumStoreState {
  activeTrackId: TrackId;
  userSubstratum: L1Substratum;
  trackProgress: Record<TrackId, TrackProgressState>;

  // Actions
  setActiveTrack: (trackId: TrackId) => void;
  setUserSubstratum: (substratum: L1Substratum) => void;
  completeLesson: (
    trackId: TrackId,
    unitId: string,
    lessonId: string,
    score: number,
    xpReward?: number
  ) => void;
  isLessonUnlocked: (
    trackId: TrackId,
    unitNumber: number,
    lessonNumber: number
  ) => boolean;
  getTrackStats: (trackId: TrackId) => {
    completedLessonsCount: number;
    completedUnitsCount: number;
    averageScore: number;
  };
  resetTrackProgress: (trackId: TrackId) => void;
  exportProgressJson: () => string;
  importProgressJson: (json: string) => boolean;
}

const STORAGE_KEY = 'nn_curriculum_progress_v1';
const SUBSTRATUM_KEY = 'nn_user_l1_substratum';
const ACTIVE_TRACK_KEY = 'nn_active_curriculum_track';

const DEFAULT_TRACK_PROGRESS: Record<TrackId, TrackProgressState> = {
  n5: { completedUnits: [], completedLessons: [], lessonScores: {} },
  n4: { completedUnits: [], completedLessons: [], lessonScores: {} },
  n3: { completedUnits: [], completedLessons: [], lessonScores: {} },
  n2: { completedUnits: [], completedLessons: [], lessonScores: {} },
  n1: { completedUnits: [], completedLessons: [], lessonScores: {} },
  'ssw-kaigo': { completedUnits: [], completedLessons: [], lessonScores: {} },
  'ssw-food': { completedUnits: [], completedLessons: [], lessonScores: {} },
  'ssw-construction': { completedUnits: [], completedLessons: [], lessonScores: {} },
};

function loadStoredProgress(): Record<TrackId, TrackProgressState> {
  if (typeof window === 'undefined') return DEFAULT_TRACK_PROGRESS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_TRACK_PROGRESS;
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_TRACK_PROGRESS, ...parsed };
  } catch {
    return DEFAULT_TRACK_PROGRESS;
  }
}

function loadStoredSubstratum(): L1Substratum {
  if (typeof window === 'undefined') return 'general_indonesian';
  try {
    const raw = localStorage.getItem(SUBSTRATUM_KEY) as L1Substratum;
    if (raw && ['sundanese', 'javanese', 'batak_eastern', 'general_indonesian'].includes(raw)) {
      return raw;
    }
    return 'general_indonesian';
  } catch {
    return 'general_indonesian';
  }
}

function loadStoredActiveTrack(): TrackId {
  if (typeof window === 'undefined') return 'n5';
  try {
    const raw = localStorage.getItem(ACTIVE_TRACK_KEY) as TrackId;
    if (raw && DEFAULT_TRACK_PROGRESS[raw]) {
      return raw;
    }
    return 'n5';
  } catch {
    return 'n5';
  }
}

function saveProgressToStorage(progress: Record<TrackId, TrackProgressState>) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (err) {
    console.warn('[curriculumStore] Failed to save progress to localStorage', err);
  }
}

export const useCurriculumStore = create<CurriculumStoreState>((set, get) => ({
  activeTrackId: loadStoredActiveTrack(),
  userSubstratum: loadStoredSubstratum(),
  trackProgress: loadStoredProgress(),

  setActiveTrack: (trackId: TrackId) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(ACTIVE_TRACK_KEY, trackId);
    }
    set({ activeTrackId: trackId });
  },

  setUserSubstratum: (substratum: L1Substratum) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(SUBSTRATUM_KEY, substratum);
    }
    set({ userSubstratum: substratum });
  },

  completeLesson: (trackId, unitId, lessonId, score, xpReward = 20) => {
    const state = get();
    const currentTrack = state.trackProgress[trackId] || {
      completedUnits: [],
      completedLessons: [],
      lessonScores: {},
    };

    const prevScore = currentTrack.lessonScores[lessonId] || 0;
    const bestScore = Math.max(prevScore, score);

    const completedLessons = currentTrack.completedLessons.includes(lessonId)
      ? currentTrack.completedLessons
      : [...currentTrack.completedLessons, lessonId];

    // Award XP to global gamification store if first time completing or improved score
    if (!currentTrack.completedLessons.includes(lessonId) && xpReward > 0) {
      try {
        useGamificationStore.getState().addXp(xpReward);
      } catch {
        // Safe fallback if gamification store not initialized
      }
    }

    const updatedTrack: TrackProgressState = {
      ...currentTrack,
      completedLessons,
      lessonScores: {
        ...currentTrack.lessonScores,
        [lessonId]: bestScore,
      },
      lastStudiedTimestamp: new Date().toISOString(),
    };

    const updatedProgress = {
      ...state.trackProgress,
      [trackId]: updatedTrack,
    };

    saveProgressToStorage(updatedProgress);
    set({ trackProgress: updatedProgress });
  },

  isLessonUnlocked: (trackId, unitNumber, lessonNumber) => {
    // Lesson 1 of Unit 1 is always unlocked
    if (unitNumber === 1 && lessonNumber === 1) return true;

    // Free mode policy (ADR-003 Anti-Malu): users are never locked out of browsing,
    // but sequential mastery indicator flags recommended next lesson
    return true;
  },

  getTrackStats: (trackId) => {
    const currentTrack = get().trackProgress[trackId];
    if (!currentTrack) {
      return { completedLessonsCount: 0, completedUnitsCount: 0, averageScore: 0 };
    }

    const completedCount = currentTrack.completedLessons.length;
    const scores = Object.values(currentTrack.lessonScores);
    const avgScore =
      scores.length > 0
        ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
        : 0;

    return {
      completedLessonsCount: completedCount,
      completedUnitsCount: currentTrack.completedUnits.length,
      averageScore: avgScore,
    };
  },

  resetTrackProgress: (trackId) => {
    const state = get();
    const updatedProgress = {
      ...state.trackProgress,
      [trackId]: { completedUnits: [], completedLessons: [], lessonScores: {} },
    };
    saveProgressToStorage(updatedProgress);
    set({ trackProgress: updatedProgress });
  },

  exportProgressJson: () => {
    const state = get();
    return JSON.stringify(
      {
        version: 1,
        activeTrackId: state.activeTrackId,
        userSubstratum: state.userSubstratum,
        trackProgress: state.trackProgress,
        exportedAt: new Date().toISOString(),
      },
      null,
      2
    );
  },

  importProgressJson: (json: string) => {
    try {
      const parsed = JSON.parse(json);
      if (parsed && parsed.trackProgress) {
        saveProgressToStorage(parsed.trackProgress);
        set({
          trackProgress: { ...DEFAULT_TRACK_PROGRESS, ...parsed.trackProgress },
          activeTrackId: parsed.activeTrackId || 'n5',
          userSubstratum: parsed.userSubstratum || 'general_indonesian',
        });
        return true;
      }
      return false;
    } catch {
      return false;
    }
  },
}));
