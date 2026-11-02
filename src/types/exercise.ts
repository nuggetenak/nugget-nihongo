/**
 * Unified Exercise & CBT Architecture Data Contracts for Nugget Nihongo
 * Supports:
 * - JLPT Academic Drills (N5..N1)
 * - JFT-Basic A2 Living & Workplace Communication (Irodori Can-Do)
 * - SSW Tokutei Ginou 6 Core Vocational Sectors (including 3 Construction subdivisions)
 */

import { JLPTLevel } from './vocab';

export type ExerciseTrackType = 'jlpt' | 'jft' | 'ssw';

export type SSWSectorId =
  | 'ssw-kaigo'
  | 'ssw-food-service'
  | 'ssw-food-mfg'
  | 'ssw-kensetsu-doboku'
  | 'ssw-kensetsu-kenchiku'
  | 'ssw-kensetsu-lifeline'
  | 'ssw-agriculture'
  | 'ssw-manufacturing';

export type MondaiType =
  // JLPT Moji-Goi
  | 'kanji_reading'
  | 'orthography'
  | 'word_formation'
  | 'contextual_vocab'
  | 'paraphrase_synonym'
  | 'usage'
  // JLPT Bunpou
  | 'grammar_form'
  | 'sentence_star'
  | 'text_grammar'
  // JLPT Dokkai
  | 'short_reading'
  | 'medium_reading'
  | 'integrated_reading'
  | 'info_retrieval'
  // JFT-Basic Can-Do
  | 'jft_kanji_life'
  | 'jft_vocab_context'
  | 'jft_expression'
  | 'jft_choukai_cbt'
  | 'jft_dokkai_realia'
  // SSW Gemba Vocab & K3
  | 'ssw_technical_terminology'
  | 'ssw_k3_procedure'
  | 'ssw_visual_hazard_diagram'
  | 'ssw_hou_ren_so_sbar';

/**
 * 5-Layer Pedagogical Explanation standard
 */
export interface ExerciseExplanation {
  /** Lapis 1: Alasan Kunci Benar (Direct Justification) */
  justification: string;
  /** Lapis 2: Bedah Opsi Salah A, B, C, D (Distractor Autopsy) */
  distractorAutopsy: Record<string, string>;
  /** Lapis 3: Jembatan Ingatan / Mnemonik Sensei Nugget (Mnemonic & Indonesian Analogy) */
  mnemonicSensei: string;
  /** Lapis 4: Peringatan Interferensi Bahasa Indonesia (L1 Interference Alert) */
  l1InterferenceAlert: string;
  /** Lapis 5: Preskripsi Tindakan Remedial (MateriHub link & direct guidance) */
  remedialPrescription: {
    unitId: string;
    unitNumber: number;
    unitTitleId: string;
    lessonId?: string;
    vocabId?: string;
    grammarId?: string;
    advice: string;
  };
  /** Ekstra SSW: Peringatan Keselamatan Kerja Gemba K3 */
  safetyTip?: string;
}

/**
 * Star Scramble (★ Susun Kalimat) interaction payload
 */
export interface StarScramblePayload {
  leadText: string;
  tailText: string;
  tokens: [string, string, string, string];
  /** Urutan indeks token (0..3) yang benar untuk membentuk kalimat utuh */
  correctOrder: [number, number, number, number];
  /** Posisi bintang (1..4) di dalam urutan slot kalimat */
  starPosition: 1 | 2 | 3 | 4;
  /** Kalimat lengkap hasil susunan untuk ditampilkan pada lembar pembahasan */
  fullSentence: string;
}

/**
 * Reading passage (Dokkai) stimulus payload
 */
export interface ReadingPassagePayload {
  passageText: string;
  passageTitle?: string;
  genre: 'short_notice' | 'email' | 'instruction' | 'realia_table' | 'work_memo' | 'essay';
  imageUrl?: string;
}

/**
 * Choukai listening audio stimulus payload
 */
export interface ChoukaiPayload {
  audioUrl?: string;
  transcriptText: string;
  speakerRoles?: string[];
  situationJp?: string;
  situationId?: string;
  maxReplays?: number; // Default 2 for JFT-Basic CBT
}

/**
 * Bidirectional link connecting question items directly to MateriHub curriculum units
 */
export interface ExerciseCurriculumRef {
  trackId: string;
  unitId: string;
  unitNumber: number;
  unitTitleId: string;
  lessonId?: string;
  vocabId?: string;
  grammarId?: string;
}

/**
 * Canonical Exercise Item
 */
export interface ExerciseItem {
  id: string; // e.g. "JLPT-N5-S01-Q01" or "SSW-KG-S01-Q03"
  trackType: ExerciseTrackType;
  level?: JLPTLevel;
  sswSectorId?: SSWSectorId;
  mondaiNumber: number;
  mondaiType: MondaiType;
  instructionJp: string;
  instructionId: string;
  prompt: string;
  promptFurigana?: string;
  targetWord?: string;
  options: string[]; // 3 or 4 options
  correctOptionIndex: number; // 0-based index
  starScramble?: StarScramblePayload;
  readingPassage?: ReadingPassagePayload;
  choukai?: ChoukaiPayload;
  sswIllustrationUrl?: string;
  explanation: ExerciseExplanation;
  curriculumRef: ExerciseCurriculumRef;
}

/**
 * Complete Exercise Set container
 */
export interface ExerciseSet {
  setId: string; // e.g. "jlpt-n5-set01"
  trackType: ExerciseTrackType;
  level?: JLPTLevel;
  sswSectorId?: SSWSectorId;
  title: string;
  description: string;
  targetUnits: string; // e.g. "Unit 1 s/d 5: Fondasi Awal & Pola Waktu"
  totalItems: number; // exactly 15
  timeLimitMinutes: number; // exactly 15
  passingScore: number; // e.g. 10 (dari 15) atau 80%
  items: ExerciseItem[];
}

/**
 * Scaffolding mode chosen by the learner
 */
export type ScaffoldingMode = 'guided' | 'strict';

/**
 * Persistent user mastery record saved in IndexedDB / Zustand
 */
export interface ExerciseSetRecord {
  setId: string;
  trackType: ExerciseTrackType;
  level?: JLPTLevel;
  sswSectorId?: SSWSectorId;
  bestScore: number;
  bestPercentage: number;
  attempts: number;
  lastAttemptAt: string;
  wrongItemIds: string[];
  isMastered: boolean; // true if bestScore >= 80% (12/15)
  lastModeUsed: ScaffoldingMode;
}

/**
 * In-flight active session saved in IndexedDB for crash/tab-close recovery
 */
export interface ActiveExerciseSession {
  setId: string;
  trackType: ExerciseTrackType;
  startedAt: string;
  remainingSeconds: number;
  userAnswers: Record<number, number>; // itemIndex -> optionIndex
  flaggedItemIndices: number[];
  mode: ScaffoldingMode;
  shuffledOptionIndices: Record<number, number[]>; // itemIndex -> shuffled order
}
