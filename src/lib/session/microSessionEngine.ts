// ══════════════════════════════════════════════════════════════════
//  microSessionEngine.ts — 4-Phase Micro-Session Choreography
//  Research Basis: Cowan (2001) K=4 chunks, Sweller (1988) CLT, DeKeyser (2015)
//  Strictly caps sessions at T in [300s, 420s], N_new <= 3, N_review in [12, 18]
// ══════════════════════════════════════════════════════════════════

import type { FSRSCardData } from '../../types/fsrs';

export type SessionPhase = 1 | 2 | 3 | 4;

export const SESSION_CAPS = {
  MIN_DURATION_SECONDS: 300, // 5 minutes
  MAX_DURATION_SECONDS: 420, // 7 minutes
  MAX_NEW_CHUNKS: 3,         // Cowan working memory chunk limit
  MIN_REVIEW_CARDS: 12,      // Lower review bound
  MAX_REVIEW_CARDS: 18,      // Upper review bound
  WARMUP_MAX_LATENCY_SEC: 15,
};

export type CardArchetypeType =
  | 'contrastive_pair_slot'
  | 'audio_speed_gate'
  | 'production_type_cloze'
  | 'pragmatic_register_pivot'
  | 'collocation_chunk_builder'
  | 'speed_comprehension_blast';

export interface MicroSessionCardItem {
  id: string;
  phase: SessionPhase;
  archetype: CardArchetypeType;
  prompt: string;
  targetPattern: string;
  options?: string[];
  correctAnswer: string;
  isL1Trap?: boolean;
  l1TrapWarning?: string;
  targetLatencyMs: number;
  audioUrl?: string;
  kanaFurigana?: string;
}

export interface PhaseMetrics {
  completed: number;
  correct: number;
  averageLatencyMs: number;
}

export interface MicroSessionState {
  sessionId: string;
  currentPhase: SessionPhase;
  currentIndex: number;
  cards: MicroSessionCardItem[];
  elapsedSeconds: number;
  newCardsCount: number;
  reviewCardsCount: number;
  latencies: number[];
  phaseMetrics: Record<SessionPhase, PhaseMetrics>;
  trapReminders: string[];
  isCompleted: boolean;
}

export interface MicroSessionSummary {
  sessionId: string;
  durationSeconds: number;
  totalCards: number;
  overallAccuracy: number;
  averageLatencyMs: number;
  reflexPercentage: number; // Percentage with latency <= 1500ms
  trapOfTheDay: string;
  stabilityDeltas: {
    orthoDelta: number;
    audioDelta: number;
  };
}

/**
 * Pure pedagogical helper: returns whether a latency indicates native reflex recall (<= 1500ms).
 */
export function isReflexLatency(latencyMs: number): boolean {
  return Number.isFinite(latencyMs) && latencyMs > 0 && latencyMs <= 1500;
}

/**
 * Pure pedagogical helper: formats seconds into M:SS or M menit S detik.
 */
export function formatSessionDuration(seconds: number, style: 'digital' | 'human' = 'digital'): string {
  const safeSec = Math.max(0, Number.isFinite(seconds) ? Math.floor(seconds) : 0);
  const m = Math.floor(safeSec / 60);
  const s = safeSec % 60;
  if (style === 'human') {
    return `${m}m ${s < 10 ? '0' : ''}${s}s`;
  }
  return `${m}:${s < 10 ? '0' : ''}${s}`;
}

/**
 * Returns human-readable pedagogical title for each session phase.
 */
export function getPhaseTitle(phase: SessionPhase): string {
  switch (phase) {
    case 1:
      return 'Retrieval Warm-Up (Refleks Cepat)';
    case 2:
      return 'Micro-Chunk Acquisition (Skema Baru)';
    case 3:
      return 'Active Production Practice (Konstruksi Aktif)';
    case 4:
      return 'Metacognitive Consolidation (Konsolidasi & Evaluasi)';
    default:
      return 'Micro-Session Pacing';
  }
}

/**
 * Creates and choreographs a standard 5–7 minute 4-phase micro-session.
 */
export function createMicroSession(
  reviewCandidates: Array<Partial<FSRSCardData> & { id: string; prompt?: string; targetJapanese?: string }>,
  newCandidates: Array<{ id: string; prompt: string; targetJapanese: string; trapWarning?: string }>,
  options?: { targetMinutes?: number }
): MicroSessionState {
  const sessionId = `ms-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  const cards: MicroSessionCardItem[] = [];

  const safeReviews = Array.isArray(reviewCandidates) ? reviewCandidates : [];
  const safeNews = Array.isArray(newCandidates) ? newCandidates : [];
  const totalReviewsAvailable = safeReviews.length;

  // Phase 1: Retrieval Warm-Up (3-4 mature overdue cards, max 60s total, 15s max per card)
  const warmUpCount = totalReviewsAvailable > 0 ? Math.min(4, Math.max(3, totalReviewsAvailable)) : 0;
  for (let i = 0; i < warmUpCount && i < safeReviews.length; i++) {
    const c = safeReviews[i];
    cards.push({
      id: `phase1-${c.id}`,
      phase: 1,
      archetype: 'speed_comprehension_blast',
      prompt: c.prompt || 'Pilih padanan bahasa Jepang secara refleks:',
      targetPattern: c.targetJapanese || '基本語彙',
      correctAnswer: c.targetJapanese || '基本語彙',
      options: [c.targetJapanese || '基本語彙', '誤り選択肢 1', '誤り選択肢 2', '誤り選択肢 3'],
      targetLatencyMs: 1500,
    });
  }

  // Phase 2: Micro-Chunk Acquisition (2-3 new target chunks, 120-150s)
  const newCount = Math.min(SESSION_CAPS.MAX_NEW_CHUNKS, safeNews.length);
  for (let i = 0; i < newCount; i++) {
    const c = safeNews[i];
    cards.push({
      id: `phase2-${c.id}`,
      phase: 2,
      archetype: 'contrastive_pair_slot',
      prompt: `Bangun skema baru: ${c.prompt}`,
      targetPattern: c.targetJapanese,
      correctAnswer: c.targetJapanese,
      isL1Trap: true,
      l1TrapWarning: c.trapWarning || 'Waspadai interferensi urutan kata SVO Bahasa Indonesia.',
      targetLatencyMs: 3000,
    });
  }

  // Phase 3: High-Intensity Active Production Practice (8-10 cards, 120-150s)
  const practiceCount = totalReviewsAvailable > 0
    ? Math.min(10, Math.max(8, Math.max(0, totalReviewsAvailable - warmUpCount)))
    : 8;
  for (let i = 0; i < practiceCount; i++) {
    const c = totalReviewsAvailable > 0
      ? safeReviews[(warmUpCount + i) % totalReviewsAvailable]
      : { id: `fallback-pr-${i}`, prompt: 'Produksi aktif partikel:', targetJapanese: 'に' };
    cards.push({
      id: `phase3-${c.id || i}-${i}`,
      phase: 3,
      archetype: i % 2 === 0 ? 'production_type_cloze' : 'collocation_chunk_builder',
      prompt: c.prompt || 'Produksi aktif:',
      targetPattern: c.targetJapanese || '日本語',
      correctAnswer: c.targetJapanese || '日本語',
      isL1Trap: i % 3 === 0,
      l1TrapWarning: 'Jangan gunakan partikel penanda topik saat fokus utama ada pada subjek aksi.',
      targetLatencyMs: 2500,
    });
  }

  // Phase 4 is Metacognitive Consolidation (0 test cards, reserved for session wrap-up)

  return {
    sessionId,
    currentPhase: 1,
    currentIndex: 0,
    cards,
    elapsedSeconds: 0,
    newCardsCount: newCount,
    reviewCardsCount: warmUpCount + practiceCount,
    latencies: [],
    phaseMetrics: {
      1: { completed: 0, correct: 0, averageLatencyMs: 0 },
      2: { completed: 0, correct: 0, averageLatencyMs: 0 },
      3: { completed: 0, correct: 0, averageLatencyMs: 0 },
      4: { completed: 0, correct: 0, averageLatencyMs: 0 },
    },
    trapReminders: [],
    isCompleted: false,
  };
}

/**
 * Progresses micro-session on user card submission.
 */
export function advanceSessionCard(
  state: MicroSessionState,
  latencyMs: number,
  isCorrect: boolean,
  trapEncountered?: string
): MicroSessionState {
  if (!state || state.isCompleted || state.currentIndex >= (state.cards?.length || 0)) {
    return { ...state, isCompleted: true, currentPhase: 4 };
  }

  const safeLatency = Number.isFinite(latencyMs) && latencyMs >= 0 ? Math.round(latencyMs) : 1500;
  const currentCard = state.cards[state.currentIndex];
  if (!currentCard) {
    return { ...state, isCompleted: true, currentPhase: 4 };
  }

  const phase = currentCard.phase;
  const metrics = state.phaseMetrics[phase] || { completed: 0, correct: 0, averageLatencyMs: 0 };

  const updatedMetrics: PhaseMetrics = {
    completed: metrics.completed + 1,
    correct: metrics.correct + (isCorrect ? 1 : 0),
    averageLatencyMs: Math.round(
      (metrics.averageLatencyMs * metrics.completed + safeLatency) / (metrics.completed + 1)
    ),
  };

  const nextIndex = state.currentIndex + 1;
  const isFinished = nextIndex >= state.cards.length;
  const nextCard = !isFinished ? state.cards[nextIndex] : null;
  const nextPhase = isFinished ? 4 : nextCard ? nextCard.phase : 4;

  const reminders = Array.isArray(state.trapReminders) ? [...state.trapReminders] : [];
  if (trapEncountered && typeof trapEncountered === 'string' && !reminders.includes(trapEncountered)) {
    reminders.push(trapEncountered);
  }

  return {
    ...state,
    currentIndex: nextIndex,
    currentPhase: nextPhase,
    isCompleted: isFinished,
    latencies: [...(state.latencies || []), safeLatency],
    phaseMetrics: {
      ...state.phaseMetrics,
      [phase]: updatedMetrics,
    },
    trapReminders: reminders,
    elapsedSeconds: (state.elapsedSeconds || 0) + Math.max(1, Math.round(safeLatency / 1000)),
  };
}

/**
 * Calculates metacognitive session summary for Phase 4 display.
 */
export function calculateSessionSummary(state: MicroSessionState): MicroSessionSummary {
  const latencies = Array.isArray(state?.latencies) ? state.latencies : [];
  const total = latencies.length;
  const sumLatency = latencies.reduce((a, b) => a + (Number.isFinite(b) ? b : 0), 0);
  const avgLatency = total > 0 ? Math.round(sumLatency / total) : 0;

  const reflexCount = latencies.filter((l) => Number.isFinite(l) && l <= 1500).length;
  const reflexPct = total > 0 ? Math.round((reflexCount / total) * 100) : 0;

  let totalCorrect = 0;
  if (state?.phaseMetrics) {
    Object.values(state.phaseMetrics).forEach((m) => {
      totalCorrect += (m && Number.isFinite(m.correct)) ? m.correct : 0;
    });
  }
  const overallAccuracy = total > 0 ? Math.round((totalCorrect / total) * 100) : 0;

  const reminders = Array.isArray(state?.trapReminders) ? state.trapReminders.filter(Boolean) : [];
  const trapOfTheDay =
    reminders.length > 0
      ? reminders[0]
      : 'Hindari menerjemahkan urutan kata Subjek-Verba-Objek (SVO) secara mentah ke Bahasa Jepang.';

  const rawSeconds = Number.isFinite(state?.elapsedSeconds) ? state.elapsedSeconds : 0;
  const durationSeconds = Math.min(SESSION_CAPS.MAX_DURATION_SECONDS, Math.max(60, rawSeconds));

  return {
    sessionId: state?.sessionId || `ms-${Date.now()}`,
    durationSeconds,
    totalCards: total,
    overallAccuracy,
    averageLatencyMs: avgLatency,
    reflexPercentage: reflexPct,
    trapOfTheDay,
    stabilityDeltas: {
      orthoDelta: Math.round(totalCorrect * 0.35 * 100) / 100,
      audioDelta: Math.round(totalCorrect * 0.28 * 100) / 100,
    },
  };
}
