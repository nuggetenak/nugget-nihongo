import { JLPTLevel } from './vocab';

export type QuizMode = 
  | 'flashcard'
  | 'multiple-choice'
  | 'fill-in'
  | 'rearrange'
  | 'conjugation'
  | 'translation'
  | 'error-find';

export interface QuizQuestion {
  id: string;
  itemId: string;
  prompt: string;
  type: QuizMode;
  questionText: string;
  correctAnswer: string;
  options?: string[];
  explanation?: string;
  reading?: string;
  romaji?: string;
  sourceType: 'vocab' | 'grammar';
  level: JLPTLevel;
}

export interface QuizSessionResult {
  totalQuestions: number;
  correctCount: number;
  incorrectCount: number;
  xpEarned: number;
  accuracy: number;
  timestamp: string;
  itemRatings: Record<string, number>;
}
