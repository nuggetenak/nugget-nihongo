import { JLPTLevel } from './vocab';

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
}

export interface LessonContrastiveTrap {
  tag: string;
  warningTitle: string;
  wrongExample: string;
  rightExample: string;
  explanation: string;
}

export interface LessonExplanationSection {
  id: string;
  grammarId?: string;
  title: string;
  formula: string;
  meaning: string;
  nuanceNotes: string;
  examples: {
    jp: string;
    furigana?: string;
    romaji?: string;
    idText: string;
  }[];
  contrastiveTrap?: LessonContrastiveTrap;
}

export interface LessonDrillItem {
  id: string;
  type: 'reorder' | 'cloze' | 'trap_detect';
  instruction: string;
  sentencePrompt?: string;
  tokens?: string[]; // for 'reorder'
  correctOrder?: string[]; // for 'reorder'
  options?: string[]; // for 'cloze' or 'trap_detect'
  correctAnswer: string;
  explanation: string;
}

export interface CanDoChallenge {
  statement: string;
  situation: string;
  promptTask: string;
  modelAnswer: string;
  modelAnswerId: string;
}

export interface LessonPedagogicalFramework {
  what: {
    summary: string;
    canDo: string;
    targetPatterns: string[];
    coreVocabSample: string[];
  };
  why_research: {
    cognitive_rationale: string;
    sla_citations: string[];
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
  edge_cases: {
    title: string;
    caseScenario: string;
    pitfallWarning: string;
    rightSolution: string;
    explanation: string;
  }[];
}

export interface CurriculumLesson {
  id: string; // e.g., "les-n5-u01-01"
  unit_id: string; // e.g., "unit-n5-01"
  lesson_number: number;
  title_id: string;
  title_jp: string;
  desc_id: string;
  can_do_statement: string; // CEFR-J in Indonesian
  grammar_ids: string[]; // references gn5-*****
  vocab_ids: string[]; // references vg-n5-*****
  l2d_contrastive_tags?: string[]; // e.g., ['contrastive-adalah-copula']
  estimated_minutes?: number;

  // ── Rich Interactive Content ──────────────────────────────
  pedagogical_framework?: LessonPedagogicalFramework;
  dialogue?: LessonDialogueLine[];
  explanations?: LessonExplanationSection[];
  drills?: LessonDrillItem[];
  can_do_challenge?: CanDoChallenge;
}

export interface CurriculumUnit {
  id: string; // e.g., "unit-n5-01"
  unit_number: number;
  level: JLPTLevel;
  pt_stage: number; // Processability Theory stage (1-6)
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
