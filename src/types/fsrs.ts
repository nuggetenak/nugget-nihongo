export type FSRSRating = 1 | 2 | 3 | 4; // 1: Again (Lupa), 2: Hard (Ragu), 3: Good (Ingat), 4: Easy (Mudah)

export type FSRSState = 0 | 1 | 2 | 3; // 0: New, 1: Learning, 2: Review, 3: Relearning

export interface FSRSCard {
  due: string;
  stability: number;
  difficulty: number;
  elapsed_days: number;
  scheduled_days: number;
  reps: number;
  lapses: number;
  state: FSRSState;
  last_review?: string;
}

export interface FSRSRecord {
  card: FSRSCard;
  history?: Array<{
    rating: FSRSRating;
    reviewed_at: string;
    elapsed_days: number;
  }>;
  source?: 'grammar' | 'vocab' | 'kanji' | 'choukai' | 'panic' | 'k3' | 'gemba' | 'dialogue' | 'kotowaza';
  title?: string;
  level?: string;
}

export interface FSRSSettings {
  request_retention: number;
  maximum_interval: number;
  new_cards_per_day: number;
  reviews_per_day: number;
}

export type CardState = 'new' | 'learning' | 'review' | 'relearning';

/**
 * FSRS v4.5 Master Synthesis Memory Card Contract
 * Incorporates dual stability vector [S_ortho, S_audio], response latency, and L1 interference flag.
 */
export interface FSRSCardData extends FSRSCard {
  card_id?: string;
  stability_ortho: number; // S_ortho (visual / reading memory stability)
  stability_audio: number; // S_audio (acoustic / listening memory stability)
  latency_ms?: number;     // Response latency Delta_t in milliseconds
  interference_flag?: boolean; // L1 negative transfer penalty trigger
  last_review_timestamp?: number; // Unix ms
  due_timestamp?: number;         // Unix ms
  review_modality?: 'ortho' | 'audio' | 'hybrid';
}

