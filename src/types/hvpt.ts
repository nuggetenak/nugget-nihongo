// ══════════════════════════════════════════════════════════════════
//  hvpt.ts — High Variability Phonetic Training (HVPT) Contract
//  Research Basis: Logan et al. (1991), Bradlow et al. (1997), Hirata (2004)
// ══════════════════════════════════════════════════════════════════

export type PitchAccentType = 'heiban' | 'atamadaka' | 'nakadaka' | 'odaka';

export type PhonologicalContrastDomain =
  | 'pitch_accent'
  | 'chōon_vowel'
  | 'sokuon_stop'
  | 'geminate_nasal'
  | 'liquid_r_l'
  | 'devoicing';

export interface HVPTSpeakerToken {
  speaker_id: string;
  speaker_gender: 'M' | 'F';
  speaker_age_group: 'young' | 'senior';
  audio_url?: string;
  pitch?: number;
  rate?: number;
}

export interface HVPTPairWord {
  kanji: string;
  kana: string;
  meaning_id: string;
  accent_type: PitchAccentType;
  mora_count: number;
  pitch_pattern: ('H' | 'L')[];
  audio_tokens?: HVPTSpeakerToken[];
}

export interface HVPTPairItem {
  pair_id: string;
  title?: string;
  word_a: HVPTPairWord;
  word_b: HVPTPairWord;
  phonological_contrast_domain: PhonologicalContrastDomain;
  closure_ratio?: number; // Rasio jeda oklusi akustik (ms)
  target_word?: 'A' | 'B';
  difficulty?: number;
  l1_substratum?: string;
  explanation?: string;
}

export interface HVPTSpeakerProfile {
  key: string;
  label: string;
  gender: 'M' | 'F';
  age_group: 'young' | 'senior';
  age_label: string;
  icon: string;
  pitch: number;
  rate: number;
}

export interface HVPTQuizResult {
  pair_id: string;
  selected: 'A' | 'B';
  target: 'A' | 'B';
  is_correct: boolean;
  reaction_time_ms: number;
  speaker_id: string;
  domain: PhonologicalContrastDomain;
}

export interface HVPTSessionSummary {
  total_trials: number;
  correct_count: number;
  accuracy_percent: number;
  average_reaction_time_ms: number;
  speaker_breakdown: Record<string, { total: number; correct: number; accuracy: number }>;
  domain_breakdown: Record<string, { total: number; correct: number; accuracy: number }>;
}
