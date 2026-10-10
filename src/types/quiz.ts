import { JLPTLevel } from './vocab';

export type QuizMode = 
  | 'flashcard'
  | 'multiple-choice'
  | 'listening'
  | 'fill-in'
  | 'rearrange'
  | 'conjugation'
  | 'translation'
  | 'error-find'
  | 'panic-recall'
  | 'mora-pacing'
  | 'pitch-accent'
  | 'discourse-deconstruct'
  | 'collocation-matrix';

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
  panicTimeoutSeconds?: number;
  actionChecklist?: string[];
  moraBeats?: string[];
  pitchContour?: string;
  discourseRole?: 'premise' | 'antithesis' | 'synthesis' | 'evidence' | 'conclusion';
  collocationContrast?: { patternA: string; patternB: string; difference: string };
}

export interface PanicScenarioItem {
  id: string;
  situation: string;
  japaneseOutput: string;
  romaji?: string;
  actionChecklist: string[];
  context: string;
  level?: JLPTLevel;
  timeoutSeconds?: number;
}

export interface QuizQuestionItem {
  id: string;
  mode: QuizMode;
  prompt: string;
  targetItem: any;
  questionText: string;
  subText?: string;
  correctAnswer: string;
  options?: string[]; // for multiple choice
  tokens?: string[];  // for rearrange
  explanation: string;
  level: JLPTLevel;
  panicTimeoutSeconds?: number;
  actionChecklist?: string[];
  moraBeats?: string[];
  pitchContour?: string;
  discourseRole?: 'premise' | 'antithesis' | 'synthesis' | 'evidence' | 'conclusion';
  collocationContrast?: { patternA: string; patternB: string; difference: string };
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

