export type JLPTLevel = 'n5' | 'n4' | 'n3' | 'n2' | 'n1';

export interface VocabExample {
  jp: string;
  id: string;
  level?: string;
  tags?: string[];
}

export interface VocabItem {
  id: string;
  word: string;
  reading: string;
  romaji?: string;
  meaning_id: string;
  meaning_en?: string;
  jlpt: JLPTLevel;
  pos: string;
  common?: boolean;
  nuance?: string;
  conj_type?: string;
  examples?: VocabExample[];
  conjugations?: Record<string, string>;
  meanings?: Array<{ en: string; misc?: string[]; field?: string[] }>;
  forms?: Array<{ word: string; info: string[] }>;
}

export interface GrammarExample {
  jp: string;
  id: string;
}

export interface GrammarItem {
  id: string;
  level: JLPTLevel;
  pattern: string;
  reading: string;
  meaning: string;
  cat?: string;
  connection?: string;
  desc?: string;
  nuance?: string | null;
  examples: GrammarExample[];
  confusion_pairs?: string[];
  see_also_grammar?: string[];
  notes?: string | null;
}

export interface StudyTrack {
  id: string;
  name: string;
  name_id: string;
  desc: string;
  target: string;
  icon: string;
  items?: Array<{ type: 'grammar' | 'vocab'; id: string }>;
}

export type FSRSRating = 1 | 2 | 3 | 4; // 1: Again (Lagi), 2: Hard (Sulit), 3: Good (Bagus), 4: Easy (Mudah)

export interface FSRSCard {
  id: string; // matches vocab or grammar id
  type: 'vocab' | 'grammar';
  due: number; // timestamp
  stability: number;
  difficulty: number;
  elapsed_days: number;
  scheduled_days: number;
  reps: number;
  lapses: number;
  state: 0 | 1 | 2 | 3; // 0: New, 1: Learning, 2: Review, 3: Relearning
  last_review?: number;
}

export interface DailyMission {
  id: string;
  title: string;
  target: number;
  current: number;
  xpReward: number;
  completed: boolean;
}

export interface UserProgress {
  xp: number;
  level: number;
  streak: number;
  lastActiveDate: string; // YYYY-MM-DD
  cardsStudiedToday: number;
  bookmarks: string[]; // ids
  cards: Record<string, FSRSCard>;
  completedTracks: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}
