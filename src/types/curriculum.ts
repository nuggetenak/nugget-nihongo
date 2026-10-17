import { JLPTLevel } from './vocab';
import type { PersonaProfileId } from '../lib/audio/personaVoices';
import type { PitchAccentEntry } from '../lib/data/pitchAccentManager';

export interface LessonDialogueLine {
  id: string;
  speaker: string;
  speakerRole?: string;
  avatar?: string;
  jp: string;
  furigana?: string;
  romaji?: string;
  idText: string;
  note?: string;
  speaker_persona_id?: PersonaProfileId;
  audio_url?: string;
  duration_ms?: number;
}

export interface LessonContrastiveTrap {
  tag: string;
  warningTitle: string;
  wrongExample: string;
  rightExample: string;
  explanation: string;
}

export interface LessonVocabDetail {
  id: string;
  word: string;
  reading: string;
  romaji: string;
  meaning: string;
  pos?: string;
  nuance?: string;
  particleTip?: string; // Pasangan partikel / collocation
  exampleSentence?: {
    jp: string;
    furigana?: string;
    romaji?: string;
    idText: string;
  };
  pitch?: PitchAccentEntry;
}

export interface LessonExplanationSection {
  id: string;
  grammarId?: string;
  title: string;
  formula: string;
  meaning: string;
  nuanceNotes: string;
  patternLogic?: string; // Logika berpikir di balik pola kalimat
  particleNotes?: string; // Peran partikel dalam pola
  formVariations?: {
    label: string; // misal: "Bentuk Positif", "Bentuk Negatif", "Bentuk Tanya"
    jp: string;
    idText: string;
  }[];
  examples: {
    jp: string;
    furigana?: string;
    romaji?: string;
    idText: string;
  }[];
  pairedExamples?: {
    speakerA: string;
    jpA: string;
    idA: string;
    speakerB: string;
    jpB: string;
    idB: string;
  }[];
  contrastiveTrap?: LessonContrastiveTrap;
}

export interface LessonDrillItem {
  id: string;
  type: 'reorder' | 'cloze' | 'trap_detect' | 'vocab_context' | 'response';
  instruction: string;
  sentencePrompt?: string;
  tokens?: string[]; // for 'reorder'
  correctOrder?: string[]; // for 'reorder'
  options?: string[]; // for 'cloze' or 'trap_detect' or 'vocab_context' or 'response'
  correctAnswer: string;
  explanation: string;
  diagnosticFeedback?: Record<string, string>; // Umpan balik diagnostik spesifik bila opsi tertentu dipilih
}

export interface PocketSummary {
  keyFormula: string;
  coreWords: string[];
  coreWarning: string;
  quickDialogue: string;
}

export interface CanDoChallenge {
  statement: string;
  situation: string;
  promptTask: string;
  modelAnswer: string;
  modelAnswerId: string;
  culturalEtiquette?: string;
  skillUnlocked?: string[];
  pocketSummary?: PocketSummary;
}

export interface CommonPitfallItem {
  title: string;
  caseScenario: string;
  pitfallWarning: string; // ❌ Contoh salah
  rightSolution: string; // ✅ Contoh benar
  explanation: string;
}

export interface LessonPedagogicalFramework {
  what: {
    summary: string;
    canDo: string;
    targetPatterns: string[];
    coreVocabSample: string[];
  };
  sensei_context?: {
    sceneIntro: string;
    dailyMission: string;
    whyOrder: string;
  };
  cultural_notes?: {
    title: string;
    etiquette: string;
    taboos?: string;
  };
  pronunciation_tips?: {
    title: string;
    moraNote: string;
    soundTip: string;
  };
  common_pitfalls?: CommonPitfallItem[];
  // Field lama tetap dipertahankan opsional agar kompatibel ke belakang
  why_research?: {
    cognitive_rationale: string;
    sla_citations?: string[];
    prerequisite_link: string;
  };
  who_and_when: {
    situational_context: string;
    social_relations: string;
    when_not_to_use: string;
  };
  scenario: {
    title: string;
    setting: string;
    narrative: string;
  };
  edge_cases?: CommonPitfallItem[];
}

export interface CurriculumLesson {
  id: string; // e.g., "les-n5-u01-01"
  unit_id?: string; // e.g., "unit-n5-01"
  lesson_number: number;
  title_id: string;
  title_jp: string;
  desc_id: string;
  can_do_statement: string;
  grammar_ids: string[];
  vocab_ids?: string[];
  l2d_contrastive_tags?: string[];
  estimated_minutes?: number;

  // ── Rich Interactive Content ──────────────────────────────
  pedagogical_framework?: LessonPedagogicalFramework;
  dialogue?: LessonDialogueLine[];
  vocab_breakdown?: LessonVocabDetail[];
  explanations?: LessonExplanationSection[];
  common_pitfalls?: CommonPitfallItem[];
  drills?: LessonDrillItem[];
  can_do_challenge?: CanDoChallenge;
  pocket_summary?: PocketSummary;
}

export interface CurriculumUnit {
  id: string; // e.g., "unit-n5-01"
  unit_number: number;
  level: JLPTLevel;
  pt_stage: number; // Alur belajar bertahap (1-6)
  title_id: string;
  title_jp: string;
  theme: string;
  icon: string;
  can_do_summary: string;
  l2d_focus_notes?: string;
  grammar_ids: string[]; // All grammar in this unit
  vocab_count_approx: number;
  lessons: CurriculumLesson[];
}

export interface CurriculumTrack {
  id: string; // e.g., "trk-nugget-n5"
  name: string;
  name_id: string;
  level: JLPTLevel;
  tagline: string;
  desc: string;
  total_units: number;
  total_grammar_count: number;
  units: CurriculumUnit[];
}

export interface UnitProgress {
  unit_id: string;
  completed_lessons: string[]; // lesson ids
  is_completed: boolean;
  score?: number;
  last_studied_at?: string;
}
