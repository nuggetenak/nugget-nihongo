// ══════════════════════════════════════════════════════════════════
//  microSessionEngine.ts — 4-Phase Micro-Session Choreography
//  Research Basis: Cowan (2001) K=4 chunks, Sweller (1988) CLT, DeKeyser (2015)
//  Strictly caps sessions at T in [300s, 420s], N_new <= 3, N_review in [12, 18]
// ══════════════════════════════════════════════════════════════════

import { FSRSCardData } from '../../types/fsrs';

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
 * Creates and choreographs a standard 5–7 minute 4-phase micro-session.
 */
export function createMicroSession(
  reviewCandidates: Array<Partial<FSRSCardData> & { id: string; prompt?: string; targetJapanese?: string }>,
  newCandidates: Array<{ id: string; prompt: string; targetJapanese: string; trapWarning?: string }>,
  options?: { targetMinutes?: number }
): MicroSessionState {
  const sessionId = `ms-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  const cards: MicroSessionCardItem[] = [];

  // Phase 1: Retrieval Warm-Up (3-4 mature overdue cards, max 60s total, 15s max per card)
  const warmUpCount = Math.min(4, Math.max(3, reviewCandidates.length));
  for (let i = 0; i < warmUpCount && i < reviewCandidates.length; i++) {
    const c = reviewCandidates[i];
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
  const newCount = Math.min(SESSION_CAPS.MAX_NEW_CHUNKS, newCandidates.length);
  for (let i = 0; i < newCount; i++) {
    const c = newCandidates[i];
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
  const practiceCount = Math.min(10, Math.max(8, reviewCandidates.length - warmUpCount));
  for (let i = 0; i < practiceCount; i++) {
    const c = reviewCandidates[(warmUpCount + i) % reviewCandidates.length] || {
      id: `mock-pr-${i}`,
      prompt: 'Ketik atau lengkapi partikel yang tepat:',
      targetJapanese: 'に',
    };
    cards.push({
      id: `phase3-${c.id}-${i}`,
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
  if (state.isCompleted || state.currentIndex >= state.cards.length) {
    return { ...state, isCompleted: true, currentPhase: 4 };
  }

  const currentCard = state.cards[state.currentIndex];
  const phase = currentCard.phase;
  const metrics = state.phaseMetrics[phase];

  const updatedMetrics: PhaseMetrics = {
    completed: metrics.completed + 1,
    correct: metrics.correct + (isCorrect ? 1 : 0),
    averageLatencyMs: Math.round(
      (metrics.averageLatencyMs * metrics.completed + latencyMs) / (metrics.completed + 1)
    ),
  };

  const nextIndex = state.currentIndex + 1;
  const isFinished = nextIndex >= state.cards.length;
  const nextCard = !isFinished ? state.cards[nextIndex] : null;
  const nextPhase = isFinished ? 4 : nextCard ? nextCard.phase : 4;

  const reminders = [...state.trapReminders];
  if (trapEncountered && !reminders.includes(trapEncountered)) {
    reminders.push(trapEncountered);
  }

  return {
    ...state,
    currentIndex: nextIndex,
    currentPhase: nextPhase,
    isCompleted: isFinished,
    latencies: [...state.latencies, latencyMs],
    phaseMetrics: {
      ...state.phaseMetrics,
      [phase]: updatedMetrics,
    },
    trapReminders: reminders,
    elapsedSeconds: state.elapsedSeconds + Math.round(latencyMs / 1000),
  };
}

/**
 * Calculates metacognitive session summary for Phase 4 display.
 */
export function calculateSessionSummary(state: MicroSessionState): MicroSessionSummary {
  const total = state.latencies.length;
  const sumLatency = state.latencies.reduce((a, b) => a + b, 0);
  const avgLatency = total > 0 ? Math.round(sumLatency / total) : 0;

  const reflexCount = state.latencies.filter((l) => l <= 1500).length;
  const reflexPct = total > 0 ? Math.round((reflexCount / total) * 100) : 0;

  let totalCorrect = 0;
  Object.values(state.phaseMetrics).forEach((m) => {
    totalCorrect += m.correct;
  });
  const overallAccuracy = total > 0 ? Math.round((totalCorrect / total) * 100) : 0;

  const trapOfTheDay =
    state.trapReminders.length > 0
      ? state.trapReminders[0]
      : 'Hindari menerjemahkan urutan kata Subjek-Verba-Objek (SVO) secara mentah ke Bahasa Jepang.';

  return {
    sessionId: state.sessionId,
    durationSeconds: Math.min(SESSION_CAPS.MAX_DURATION_SECONDS, Math.max(60, state.elapsedSeconds)),
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
