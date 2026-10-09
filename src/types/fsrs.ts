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
  source?: 'grammar' | 'vocab';
  title?: string;
  level?: string;
}

export interface FSRSSettings {
  request_retention: number;
  maximum_interval: number;
  new_cards_per_day: number;
  reviews_per_day: number;
}
