// ══════════════════════════════════════════════════════════════════
//  hvpt.ts — High Variability Phonetic Training (HVPT) Contract
//  Research Basis: Logan et al. (1991), Bradlow et al. (1997), Hirata (2004)
// ══════════════════════════════════════════════════════════════════

export type PitchAccentType = 'heiban' | 'atamadaka' | 'nakadaka' | 'odaka';

export interface HVPTSpeakerToken {
  speaker_id: string;
  speaker_gender: 'M' | 'F';
  speaker_age_group: 'young' | 'senior';
  audio_url: string;
}

export interface HVPTPairWord {
  kanji: string;
  kana: string;
  meaning_id: string;
  accent_type: PitchAccentType;
  mora_count: number;
  pitch_pattern: ('H' | 'L')[];
  audio_tokens: HVPTSpeakerToken[];
}

export interface HVPTPairItem {
  pair_id: string;
  word_a: HVPTPairWord;
  word_b: HVPTPairWord;
  phonological_contrast_domain: 'pitch_accent' | 'chōon_vowel' | 'sokuon_stop' | 'geminate_nasal';
  closure_ratio?: number; // Rasio jeda oklusi akustik (ms)
}
