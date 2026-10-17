// ══════════════════════════════════════════════════════════════════
//  reviewTelemetry.ts — Dual-Track FSRS Review Telemetry System
//  Research Basis: ADR-014, Dual-Track Memory Matrix [S_ortho, S_audio],
//  DeKeyser (2015) Skill Acquisition Theory, matsuyama & Matsunaga (1999)
// ══════════════════════════════════════════════════════════════════

import { CardArchetypeType } from '../session/microSessionEngine';
import { FSRSRating } from '../../types/fsrs';
import { calculateDualTrackStability, calculateLatencyFactor, applyInterferencePenalty } from '../fsrs/math';
import { storageBridge } from '../persistence/storageBridge';

export const CROSS_MODAL_COEFFICIENTS = {
  ALPHA_CROSS: 0.25, // Visual reading -> Acoustic listening coupling
  BETA_CROSS: 0.65,  // Acoustic listening -> Visual reading coupling
};

export interface SRSReviewEvent {
  eventId: string;
  eventType: 'srs_review_completed';
  timestamp: string;
  cardId: string;
  modality: 'ortho' | 'audio' | 'hybrid';
  archetype: CardArchetypeType | 'standard_flashcard';
  latencyMs: number;
  rating: FSRSRating;
  isL1TrapEncountered: boolean;
  difficultyBefore: number;
  difficultyAfter: number;
  stabilityBefore: {
    ortho: number;
    audio: number;
  };
  stabilityAfter: {
    ortho: number;
    audio: number;
  };
  proceduralizationFactor: number; // Phi(Delta t)
  crossModalCoefficients: {
    alphaCross: number;
    betaCross: number;
  };
  metadata?: Record<string, any>;
}

export type TelemetryListener = (event: SRSReviewEvent) => void;

class ReviewTelemetryService {
  private static STORAGE_KEY = 'nugget_srs_telemetry_events_v1';
  private static MAX_BUFFER_SIZE = 500;
  private buffer: SRSReviewEvent[] = [];
  private listeners: Set<TelemetryListener> = new Set();

  constructor() {
    this.hydrateBuffer();
    if (typeof window !== 'undefined') {
      window.addEventListener('online', () => {
        this.flushOfflineQueue().catch(() => {});
      });
      navigator.serviceWorker?.addEventListener('message', (e) => {
        if (e.data?.type === 'SYNC_TELEMETRY_TRIGGER') {
          this.flushOfflineQueue().catch(() => {});
        }
      });
    }
  }

  private hydrateBuffer(): void {
    if (typeof window === 'undefined' || !window.localStorage) return;
    try {
      const stored = window.localStorage.getItem(ReviewTelemetryService.STORAGE_KEY);
      if (stored) {
        this.buffer = JSON.parse(stored);
      }
    } catch (e) {
      console.warn('[reviewTelemetry] Failed to hydrate events buffer:', e);
      this.buffer = [];
    }
  }

  private persistBuffer(): void {
    if (typeof window === 'undefined' || !window.localStorage) return;
    try {
      if (this.buffer.length > ReviewTelemetryService.MAX_BUFFER_SIZE) {
        this.buffer = this.buffer.slice(this.buffer.length - ReviewTelemetryService.MAX_BUFFER_SIZE);
      }
      window.localStorage.setItem(ReviewTelemetryService.STORAGE_KEY, JSON.stringify(this.buffer));
    } catch (e) {
      console.warn('[reviewTelemetry] Failed to persist events buffer:', e);
    }
  }

  /**
   * Records a completed review session event with dual-track calculations.
   */
  public recordReview(params: {
    cardId: string;
    modality: 'ortho' | 'audio' | 'hybrid';
    archetype: CardArchetypeType | 'standard_flashcard';
    latencyMs: number;
    rating: FSRSRating;
    isL1TrapEncountered?: boolean;
    currentStabilityOrtho: number;
    currentStabilityAudio: number;
    currentDifficulty: number;
    targetLatencyMs?: number;
    metadata?: Record<string, any>;
  }): SRSReviewEvent {
    const isTrap = Boolean(params.isL1TrapEncountered);
    const targetLatency = params.targetLatencyMs || (params.modality === 'audio' ? 2500 : 2000);
    const phi = calculateLatencyFactor(params.latencyMs, targetLatency);

    // Calculate updated stabilities using dual-track cross-coupling
    const primaryModality = params.modality === 'audio' ? 'audio' : 'ortho';
    const primaryStability = primaryModality === 'audio' ? params.currentStabilityAudio : params.currentStabilityOrtho;

    const mockCard = {
      due: new Date().toISOString(),
      stability: primaryStability,
      difficulty: params.currentDifficulty,
      elapsed_days: 1,
      scheduled_days: 1,
      reps: 1,
      lapses: 0,
      state: 2 as const,
    };

    let finalOrtho = params.currentStabilityOrtho;
    let finalAudio = params.currentStabilityAudio;
    let finalDifficulty = params.currentDifficulty;

    if (isTrap && params.rating === 1) {
      const penalized = applyInterferencePenalty(mockCard, false);
      finalDifficulty = penalized.difficulty;
      if (primaryModality === 'audio') {
        finalAudio = penalized.stability;
        finalOrtho = Math.max(0.2, Math.round(finalOrtho * 0.85 * 100) / 100);
      } else {
        finalOrtho = penalized.stability;
        finalAudio = Math.max(0.2, Math.round(finalAudio * 0.85 * 100) / 100);
      }
    } else {
      // Direct base calculation with proceduralization factor
      const newPrimaryStability = Math.max(
        0.2,
        Math.round(primaryStability * (params.rating >= 3 ? 1.5 : 0.8) * phi * 100) / 100
      );

      const dual = calculateDualTrackStability(
        params.currentStabilityOrtho,
        params.currentStabilityAudio,
        primaryModality,
        newPrimaryStability,
        CROSS_MODAL_COEFFICIENTS.ALPHA_CROSS,
        CROSS_MODAL_COEFFICIENTS.BETA_CROSS
      );

      finalOrtho = dual.stabilityOrtho;
      finalAudio = dual.stabilityAudio;
      finalDifficulty = Math.min(10, Math.max(1, params.currentDifficulty - (params.rating - 3) * 0.4));
    }

    const event: SRSReviewEvent = {
      eventId: `rev-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`,
      eventType: 'srs_review_completed',
      timestamp: new Date().toISOString(),
      cardId: params.cardId,
      modality: params.modality,
      archetype: params.archetype,
      latencyMs: params.latencyMs,
      rating: params.rating,
      isL1TrapEncountered: isTrap,
      difficultyBefore: params.currentDifficulty,
      difficultyAfter: finalDifficulty,
      stabilityBefore: {
        ortho: params.currentStabilityOrtho,
        audio: params.currentStabilityAudio,
      },
      stabilityAfter: {
        ortho: finalOrtho,
        audio: finalAudio,
      },
      proceduralizationFactor: phi,
      crossModalCoefficients: {
        alphaCross: CROSS_MODAL_COEFFICIENTS.ALPHA_CROSS,
        betaCross: CROSS_MODAL_COEFFICIENTS.BETA_CROSS,
      },
      metadata: params.metadata,
    };

    this.buffer.push(event);
    this.persistBuffer();
    this.notifyListeners(event);

    // Persist to IndexedDB offline queue and register background sync
    storageBridge.setItem('offline_queue', event.eventId, event).catch(() => {});
    this.registerBackgroundSync().catch(() => {});

    return event;
  }

  public async registerBackgroundSync(): Promise<boolean> {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
      return false;
    }
    try {
      const reg = await navigator.serviceWorker.ready;
      if ('sync' in reg) {
        await (reg as any).sync.register('sync-review-telemetry');
        return true;
      }
    } catch (err) {
      console.warn('[reviewTelemetry] Background sync registration notice:', err);
    }
    return false;
  }

  public async flushOfflineQueue(): Promise<number> {
    const events = await storageBridge.getAll<SRSReviewEvent>('offline_queue');
    if (events.length === 0) return 0;

    await storageBridge.clearTable('offline_queue');
    return events.length;
  }

  public getBufferedEvents(limit?: number): SRSReviewEvent[] {
    if (!limit || limit >= this.buffer.length) {
      return [...this.buffer];
    }
    return this.buffer.slice(this.buffer.length - limit);
  }

  public clearBuffer(): void {
    this.buffer = [];
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.removeItem(ReviewTelemetryService.STORAGE_KEY);
    }
  }

  public exportTelemetryJSON(): string {
    return JSON.stringify(this.buffer, null, 2);
  }

  public subscribe(listener: TelemetryListener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notifyListeners(event: SRSReviewEvent): void {
    this.listeners.forEach((listener) => {
      try {
        listener(event);
      } catch (err) {
        console.error('[reviewTelemetry] Listener execution error:', err);
      }
    });
  }
}

export const reviewTelemetry = new ReviewTelemetryService();
