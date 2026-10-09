import { JLPTLevel } from './vocab';

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
