// ══════════════════════════════════════════════════════════════════
//  useExerciseStore.ts — State Management & Offline Persistence Engine
//  for Nugget Nihongo 14 Golden Sets CBT & Assessment System
//  Research Basis: ADR-012, 7 Locked Systems of LMS Consolidation
// ══════════════════════════════════════════════════════════════════

import { create } from 'zustand';
import {
  ExerciseSet,
  ExerciseItem,
  ScaffoldingMode,
  ExerciseSetRecord,
  ActiveExerciseSession,
  ExerciseTrackType,
  SSWSectorId,
} from '../types/exercise';
import { JLPTLevel } from '../types/vocab';

export interface ExerciseManifestEntry {
  setId: string;
  title: string;
  trackType: ExerciseTrackType;
  level: JLPTLevel | null;
  sswSectorId: SSWSectorId | null;
  targetUnits: string;
  totalItems: number;
  timeLimitMinutes: number;
  passingScore: number;
  fileName: string;
  publicPath: string;
}

export interface ExerciseManifest {
  version: string;
  generatedAt: string;
  totalSets: number;
  totalQuestions: number;
  sets: ExerciseManifestEntry[];
}

export interface ExerciseSessionSummary {
  setId: string;
  trackType: ExerciseTrackType;
  level?: JLPTLevel;
  sswSectorId?: SSWSectorId;
  totalQuestions: number;
  correctCount: number;
  percentage: number;
  isPassed: boolean;
  timeSpentSeconds: number;
  wrongItemIds: string[];
  mode: ScaffoldingMode;
  completedAt: string;
}

export interface StarScrambleSlotState {
  availableTokens: string[];
  slottedTokens: (string | null)[];
}

interface ExerciseStoreState {
  // ── Manifest Catalog State ──
  manifest: ExerciseManifest | null;
  isLoadingManifest: boolean;
  manifestError: string | null;
  fetchManifest: () => Promise<ExerciseManifest | null>;

  // ── Active Set & In-Flight Test State ──
  currentSet: ExerciseSet | null;
  isLoadingSet: boolean;
  setError: string | null;
  mode: ScaffoldingMode;
  currentIndex: number; // 0..14
  userAnswers: Record<number, number>; // questionIndex -> selectedOptionIndex
  flaggedIndices: number[]; // questionIndices marked for review
  remainingSeconds: number; // 900 -> 0 in strict, or elapsed time in guided
  isPaused: boolean;
  audioReplays: Record<number, number>; // questionIndex -> count of times played
  starScrambleStates: Record<number, StarScrambleSlotState>;
  isSubmitted: boolean;
  sessionSummary: ExerciseSessionSummary | null;

  // ── Active Saved Session Recovery ──
  savedSessionAvailable: ActiveExerciseSession | null;
  checkSavedSession: () => ActiveExerciseSession | null;
  restoreSavedSession: () => Promise<boolean>;
  discardSavedSession: () => void;

  // ── Actions: Set Loading & Navigation ──
  startSet: (setId: string, mode: ScaffoldingMode) => Promise<boolean>;
  goToQuestion: (index: number) => void;
  nextQuestion: () => void;
  prevQuestion: () => void;

  // ── Actions: Question Interaction ──
  selectOption: (questionIndex: number, optionIndex: number) => void;
  toggleFlag: (questionIndex: number) => void;
  consumeAudioReplay: (questionIndex: number) => boolean;
  updateStarScramble: (questionIndex: number, available: string[], slots: (string | null)[]) => void;

  // ── Actions: Timer & Flow ──
  tickTimer: () => void;
  togglePause: () => void;
  submitTest: () => ExerciseSessionSummary | null;
  retryWrongQuestions: () => void;
  exitSession: () => void;

  // ── Persistent Records & Mistake Bank ──
  records: Record<string, ExerciseSetRecord>; // setId -> record
  loadRecords: () => void;
  getSetRecord: (setId: string) => ExerciseSetRecord | null;
  getMistakeItemIdsForTrack: (trackType?: ExerciseTrackType) => string[];
}

const STORAGE_RECORDS_KEY = 'nugget_exercise_records_v1';
const STORAGE_ACTIVE_SESSION_KEY = 'nugget_active_exercise_session_v1';

export const useExerciseStore = create<ExerciseStoreState>((set, get) => ({
  // Catalog
  manifest: null,
  isLoadingManifest: false,
  manifestError: null,

  // Active Test State
  currentSet: null,
  isLoadingSet: false,
  setError: null,
  mode: 'guided',
  currentIndex: 0,
  userAnswers: {},
  flaggedIndices: [],
  remainingSeconds: 900,
  isPaused: false,
  audioReplays: {},
  starScrambleStates: {},
  isSubmitted: false,
  sessionSummary: null,

  // Crash Recovery
  savedSessionAvailable: null,

  // Records
  records: {},

  // ── 1. Fetch Manifest ──────────────────────────────────────────
  fetchManifest: async () => {
    const existing = get().manifest;
    if (existing) return existing;

    set({ isLoadingManifest: true, manifestError: null });
    try {
      const response = await fetch('/data/exercises/manifest.json');
      if (!response.ok) {
        throw new Error(`Gagal memuat katalog latihan (HTTP ${response.status})`);
      }
      const data: ExerciseManifest = await response.json();
      set({ manifest: data, isLoadingManifest: false });
      return data;
    } catch (err: any) {
      console.error('[useExerciseStore] fetchManifest failed:', err);
      set({
        manifestError: err?.message || 'Gagal terhubung ke manifest latihan.',
        isLoadingManifest: false,
      });
      return null;
    }
  },

  // ── 2. Check & Handle Saved Session for Crash Recovery ──────────
  checkSavedSession: () => {
    if (typeof window === 'undefined') return null;
    try {
      const raw = localStorage.getItem(STORAGE_ACTIVE_SESSION_KEY);
      if (!raw) {
        set({ savedSessionAvailable: null });
        return null;
      }
      const parsed: ActiveExerciseSession = JSON.parse(raw);
      if (parsed && parsed.setId && parsed.userAnswers) {
        set({ savedSessionAvailable: parsed });
        return parsed;
      }
    } catch (e) {
      console.warn('[useExerciseStore] Corrupted active session cleared');
      localStorage.removeItem(STORAGE_ACTIVE_SESSION_KEY);
    }
    set({ savedSessionAvailable: null });
    return null;
  },

  restoreSavedSession: async () => {
    const saved = get().savedSessionAvailable || get().checkSavedSession();
    if (!saved) return false;

    // Load the set dataset first
    const success = await get().startSet(saved.setId, saved.mode);
    if (!success) return false;

    // Restore state
    set({
      userAnswers: saved.userAnswers || {},
      flaggedIndices: saved.flaggedItemIndices || [],
      remainingSeconds: saved.remainingSeconds ?? 900,
      mode: saved.mode || 'strict',
      savedSessionAvailable: null,
    });
    return true;
  },

  discardSavedSession: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_ACTIVE_SESSION_KEY);
    }
    set({ savedSessionAvailable: null });
  },

  // ── 3. Start Exercise Set ──────────────────────────────────────
  startSet: async (setId: string, mode: ScaffoldingMode) => {
    set({ isLoadingSet: true, setError: null, isSubmitted: false, sessionSummary: null });
    try {
      // Find filename from manifest or fallback
      let fileName = `${setId}.json`;
      const manifest = get().manifest;
      if (manifest && manifest.sets) {
        const found = manifest.sets.find((s) => s.setId === setId);
        if (found && found.fileName) {
          fileName = found.fileName;
        }
      }

      const response = await fetch(`/data/exercises/${fileName}`);
      if (!response.ok) {
        throw new Error(`Gagal memuat dataset ${setId} (HTTP ${response.status})`);
      }
      const setData: ExerciseSet = await response.json();

      // Initialize initial Star Scramble states if any item is sentence_star
      const initialStarStates: Record<number, StarScrambleSlotState> = {};
      setData.items.forEach((item, idx) => {
        if (item.starScramble && item.starScramble.tokens) {
          // Shuffle tokens deterministically or randomize
          const tokens = [...item.starScramble.tokens];
          // Simple Knuth shuffle
          for (let i = tokens.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [tokens[i], tokens[j]] = [tokens[j], tokens[i]];
          }
          initialStarStates[idx] = {
            availableTokens: tokens,
            slottedTokens: [null, null, null, null],
          };
        }
      });

      const initialTime = mode === 'strict' ? (setData.timeLimitMinutes || 15) * 60 : 0;

      set({
        currentSet: setData,
        isLoadingSet: false,
        mode,
        currentIndex: 0,
        userAnswers: {},
        flaggedIndices: [],
        remainingSeconds: initialTime,
        isPaused: false,
        audioReplays: {},
        starScrambleStates: initialStarStates,
        isSubmitted: false,
        sessionSummary: null,
      });

      // Persist in-flight session snapshot
      if (typeof window !== 'undefined') {
        const sessionSnapshot: ActiveExerciseSession = {
          setId,
          trackType: setData.trackType,
          startedAt: new Date().toISOString(),
          remainingSeconds: initialTime,
          userAnswers: {},
          flaggedItemIndices: [],
          mode,
          shuffledOptionIndices: {},
        };
        localStorage.setItem(STORAGE_ACTIVE_SESSION_KEY, JSON.stringify(sessionSnapshot));
      }

      return true;
    } catch (err: any) {
      console.error('[useExerciseStore] startSet failed:', err);
      set({
        isLoadingSet: false,
        setError: err?.message || `Tidak dapat memuat set soal ${setId}.`,
      });
      return false;
    }
  },

  // ── 4. Navigation ──────────────────────────────────────────────
  goToQuestion: (index: number) => {
    const setObj = get().currentSet;
    if (!setObj) return;
    const clamped = Math.max(0, Math.min(index, setObj.items.length - 1));
    set({ currentIndex: clamped });
  },

  nextQuestion: () => {
    const { currentIndex, currentSet } = get();
    if (!currentSet) return;
    if (currentIndex < currentSet.items.length - 1) {
      set({ currentIndex: currentIndex + 1 });
    }
  },

  prevQuestion: () => {
    const { currentIndex } = get();
    if (currentIndex > 0) {
      set({ currentIndex: currentIndex - 1 });
    }
  },

  // ── 5. Question Interaction ────────────────────────────────────
  selectOption: (questionIndex: number, optionIndex: number) => {
    const { userAnswers, currentSet, remainingSeconds, mode, flaggedIndices } = get();
    if (!currentSet || get().isSubmitted) return;

    const newAnswers = { ...userAnswers };
    if (optionIndex < 0) {
      delete newAnswers[questionIndex];
    } else {
      newAnswers[questionIndex] = optionIndex;
    }
    set({ userAnswers: newAnswers });

    // Sync to local storage for crash protection
    if (typeof window !== 'undefined') {
      const activeSnapshot: ActiveExerciseSession = {
        setId: currentSet.setId,
        trackType: currentSet.trackType,
        startedAt: new Date().toISOString(),
        remainingSeconds,
        userAnswers: newAnswers,
        flaggedItemIndices: flaggedIndices,
        mode,
        shuffledOptionIndices: {},
      };
      localStorage.setItem(STORAGE_ACTIVE_SESSION_KEY, JSON.stringify(activeSnapshot));
    }
  },

  toggleFlag: (questionIndex: number) => {
    const { flaggedIndices } = get();
    const isFlagged = flaggedIndices.includes(questionIndex);
    const newFlagged = isFlagged
      ? flaggedIndices.filter((idx) => idx !== questionIndex)
      : [...flaggedIndices, questionIndex];
    set({ flaggedIndices: newFlagged });
  },

  consumeAudioReplay: (questionIndex: number) => {
    const { mode, audioReplays } = get();
    const currentCount = audioReplays[questionIndex] || 0;

    // Strict mode limit: exactly 2 plays allowed
    if (mode === 'strict' && currentCount >= 2) {
      return false;
    }

    set({
      audioReplays: {
        ...audioReplays,
        [questionIndex]: currentCount + 1,
      },
    });
    return true;
  },

  updateStarScramble: (questionIndex: number, available: string[], slots: (string | null)[]) => {
    const { starScrambleStates, currentSet } = get();
    const newStates = {
      ...starScrambleStates,
      [questionIndex]: {
        availableTokens: available,
        slottedTokens: slots,
      },
    };
    set({ starScrambleStates: newStates });

    // Check if star position is filled; if so, map the selected token to option index
    if (currentSet && currentSet.items[questionIndex]?.starScramble) {
      const starScramble = currentSet.items[questionIndex].starScramble!;
      const starPosZeroIndexed = starScramble.starPosition - 1; // 1-based to 0-based
      const tokenAtStar = slots[starPosZeroIndexed];

      if (tokenAtStar !== null) {
        // Find matching index in options
        const item = currentSet.items[questionIndex];
        const optIdx = item.options.findIndex(
          (opt) => opt.trim() === tokenAtStar.trim() || tokenAtStar.includes(opt.trim()) || opt.includes(tokenAtStar.trim())
        );
        if (optIdx !== -1) {
          get().selectOption(questionIndex, optIdx);
        }
      } else {
        // If star slot is emptied, clear selection
        get().selectOption(questionIndex, -1);
      }
    }
  },

  // ── 6. Timer & Pause ───────────────────────────────────────────
  tickTimer: () => {
    const { mode, remainingSeconds, isPaused, isSubmitted } = get();
    if (isPaused || isSubmitted) return;

    if (mode === 'strict') {
      if (remainingSeconds <= 1) {
        set({ remainingSeconds: 0 });
        get().submitTest();
      } else {
        set({ remainingSeconds: remainingSeconds - 1 });
      }
    } else {
      // In guided mode, timer counts upwards (elapsed time)
      set({ remainingSeconds: Math.max(0, (remainingSeconds || 0) + 1) });
    }
  },

  togglePause: () => {
    set((state) => ({ isPaused: !state.isPaused }));
  },

  // ── 7. Submit & Evaluation ─────────────────────────────────────
  submitTest: () => {
    const { currentSet, userAnswers, mode, remainingSeconds } = get();
    if (!currentSet) return null;

    let correctCount = 0;
    const wrongItemIds: string[] = [];

    currentSet.items.forEach((item, idx) => {
      const userSelected = userAnswers[idx];
      if (userSelected !== undefined && userSelected === item.correctOptionIndex) {
        correctCount++;
      } else {
        wrongItemIds.push(item?.id || `item-${idx}`);
      }
    });

    const totalQuestions = currentSet.items.length;
    const percentage = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
    const passingThreshold = currentSet.passingScore || Math.ceil(totalQuestions * 0.7);
    const isPassed = correctCount >= passingThreshold;

    const timeSpent =
      mode === 'strict'
        ? Math.max(0, (currentSet.timeLimitMinutes || 15) * 60 - remainingSeconds)
        : remainingSeconds;

    const summary: ExerciseSessionSummary = {
      setId: currentSet.setId,
      trackType: currentSet.trackType,
      level: currentSet.level,
      sswSectorId: currentSet.sswSectorId,
      totalQuestions,
      correctCount,
      percentage,
      isPassed,
      timeSpentSeconds: timeSpent,
      wrongItemIds,
      mode,
      completedAt: new Date().toISOString(),
    };

    set({ isSubmitted: true, sessionSummary: summary });

    // Save record to persistent storage
    const existingRecord = get().records[currentSet.setId];
    const newBestScore = existingRecord
      ? Math.max(existingRecord.bestScore, correctCount)
      : correctCount;
    const newBestPercentage = Math.round((newBestScore / totalQuestions) * 100);
    const isMastered = newBestPercentage >= 80;

    const updatedRecord: ExerciseSetRecord = {
      setId: currentSet.setId,
      trackType: currentSet.trackType,
      level: currentSet.level,
      sswSectorId: currentSet.sswSectorId,
      bestScore: newBestScore,
      bestPercentage: newBestPercentage,
      attempts: (existingRecord?.attempts || 0) + 1,
      lastAttemptAt: summary.completedAt,
      wrongItemIds,
      isMastered,
      lastModeUsed: mode,
    };

    const newRecords = {
      ...get().records,
      [currentSet.setId]: updatedRecord,
    };

    set({ records: newRecords });

    // Write to localStorage
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_RECORDS_KEY, JSON.stringify(newRecords));
        localStorage.removeItem(STORAGE_ACTIVE_SESSION_KEY);
      } catch (err) {
        console.error('[useExerciseStore] Error saving record:', err);
      }
    }

    return summary;
  },

  retryWrongQuestions: () => {
    const { currentSet, sessionSummary } = get();
    if (!currentSet || !sessionSummary || sessionSummary.wrongItemIds.length === 0) return;
    const wrongItems = currentSet.items.filter((it) => sessionSummary.wrongItemIds.includes(it.id));
    if (wrongItems.length === 0) return;

    set({
      currentSet: {
        ...currentSet,
        title: `${currentSet.title} (Remedial Soal Salah)`,
        items: wrongItems,
      },
      currentIndex: 0,
      userAnswers: {},
      flaggedIndices: [],
      isSubmitted: false,
      sessionSummary: null,
      mode: 'guided',
      remainingSeconds: wrongItems.length * 90,
    });
  },

  exitSession: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_ACTIVE_SESSION_KEY);
    }
    set({
      currentSet: null,
      isSubmitted: false,
      sessionSummary: null,
      userAnswers: {},
      flaggedIndices: [],
      isPaused: false,
      currentIndex: 0,
    });
  },

  // ── 8. Persistent Records ──────────────────────────────────────
  loadRecords: () => {
    if (typeof window === 'undefined') return;
    try {
      const raw = localStorage.getItem(STORAGE_RECORDS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        set({ records: parsed });
      }
    } catch (err) {
      console.warn('[useExerciseStore] loadRecords parse error:', err);
    }
  },

  getSetRecord: (setId: string) => {
    return get().records[setId] || null;
  },

  getMistakeItemIdsForTrack: (trackType?: ExerciseTrackType) => {
    const { records } = get();
    const mistakesSet = new Set<string>();

    Object.values(records).forEach((rec) => {
      if (!trackType || rec.trackType === trackType) {
        rec.wrongItemIds.forEach((id) => mistakesSet.add(id));
      }
    });

    return Array.from(mistakesSet);
  },
}));
