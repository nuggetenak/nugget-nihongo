// ══════════════════════════════════════════════════════════════════
//  hvptManager.ts — High Variability Phonetic Training (HVPT) Service
//  Research Basis: Logan et al. (1991), Bradlow et al. (1997), Hirata (2004)
//  Acoustic variation across 4 native speakers:
//  - Speaker M1 (Young Male, pitch 0.92, rate 1.0)
//  - Speaker F1 (Young Female, pitch 1.15, rate 1.0)
//  - Speaker M2 (Senior Male, pitch 0.82, rate 0.88)
//  - Speaker F2 (Senior Female, pitch 1.05, rate 0.88)
//  Covers 150 phonological contrast items across 5 perceptual domains
// ══════════════════════════════════════════════════════════════════

import type {
  HVPTPairItem,
  HVPTPairWord,
  HVPTSpeakerProfile,
  HVPTSpeakerToken,
  HVPTQuizResult,
  HVPTSessionSummary,
  PhonologicalContrastDomain,
  PitchAccentType,
} from '../../types/hvpt.ts';
import { loadDiagnosticPairs } from '../data/diagnosticManager.ts';
import { splitIntoMoras } from '../pitch/pitchEngine.ts';
import { speakJapanese } from './tts.ts';

export const HVPT_SPEAKERS: HVPTSpeakerProfile[] = [
  {
    key: 'speaker_m1',
    label: 'Penutur M1',
    gender: 'M',
    age_group: 'young',
    age_label: 'Pria Muda (Standard Tokyo)',
    icon: '👨',
    pitch: 0.92,
    rate: 1.0,
  },
  {
    key: 'speaker_f1',
    label: 'Penutur F1',
    gender: 'F',
    age_group: 'young',
    age_label: 'Wanita Muda (Standard Tokyo)',
    icon: '👩',
    pitch: 1.15,
    rate: 1.0,
  },
  {
    key: 'speaker_m2',
    label: 'Penutur M2',
    gender: 'M',
    age_group: 'senior',
    age_label: 'Pria Senior (Deep Resonant)',
    icon: '👴',
    pitch: 0.82,
    rate: 0.88,
  },
  {
    key: 'speaker_f2',
    label: 'Penutur F2',
    gender: 'F',
    age_group: 'senior',
    age_label: 'Wanita Senior (Care & Gemba)',
    icon: '👵',
    pitch: 1.05,
    rate: 0.88,
  },
];

let hvptCache: HVPTPairItem[] | null = null;

/**
 * Maps raw domain string from confusion-pairs.js to canonical PhonologicalContrastDomain
 */
export function mapPhonologicalDomain(rawDomain: string = ''): PhonologicalContrastDomain {
  const lower = rawDomain.toLowerCase();
  if (lower.includes('sokuon') || lower.includes('geminate consonant') || /\bdomain\s+iii\b/i.test(rawDomain)) {
    return 'sokuon_stop';
  }
  if (lower.includes('chōon') || lower.includes('chouon') || lower.includes('vowel duration') || /\bdomain\s+ii\b/i.test(rawDomain)) {
    return 'chōon_vowel';
  }
  if (lower.includes('gemba') || lower.includes('emergency') || lower.includes('devoicing') || /\bdomain\s+vi\b/i.test(rawDomain)) {
    return 'devoicing';
  }
  if (lower.includes('liquid') || lower.includes('trill') || lower.includes('flap') || /\bdomain\s+v\b/i.test(rawDomain)) {
    return 'liquid_r_l';
  }
  if (lower.includes('contracted sound') || lower.includes('yōon') || lower.includes('moric nasal') || /\bdomain\s+iv\b/i.test(rawDomain)) {
    return 'geminate_nasal';
  }
  if (lower.includes('pitch accent') || /\bdomain\s+i\b/i.test(rawDomain)) {
    return 'pitch_accent';
  }
  return 'pitch_accent';
}

/**
 * Parses kanji, kana, and pitch pattern from pattern strings like "部下 / ぶか (Bawahan Kerja [1])"
 */
function parsePatternString(patternStr: string): { kanji: string; kana: string; meaning: string; pitchNumber: number } {
  if (!patternStr) return { kanji: '', kana: '', meaning: '', pitchNumber: 0 };

  // e.g. "部下 / ぶか (Bawahan Kerja [1])" or "牡蠣 (Tiram Laut)"
  let kanji = '';
  let kana = '';
  let meaning = '';
  let pitchNumber = 0;

  const slashMatch = patternStr.match(/^([^/]+)\s*\/\s*([^(\[]+)(?:\(([^)]+)\))?/);
  if (slashMatch) {
    kanji = slashMatch[1].trim();
    kana = slashMatch[2].trim();
    const rest = slashMatch[3] || '';
    const pitchMatch = rest.match(/\[(\d+)\]/);
    if (pitchMatch) {
      pitchNumber = parseInt(pitchMatch[1], 10);
      meaning = rest.replace(/\[\d+\]/, '').trim();
    } else {
      meaning = rest.trim();
    }
  } else {
    const parenMatch = patternStr.match(/^([^(\[]+)(?:\(([^)]+)\))?/);
    if (parenMatch) {
      kanji = parenMatch[1].trim();
      kana = kanji;
      const rest = parenMatch[2] || '';
      const pitchMatch = rest.match(/\[(\d+)\]/);
      if (pitchMatch) {
        pitchNumber = parseInt(pitchMatch[1], 10);
        meaning = rest.replace(/\[\d+\]/, '').trim();
      } else {
        meaning = rest.trim();
      }
    } else {
      kanji = patternStr.trim();
      kana = kanji;
    }
  }

  return { kanji, kana, meaning, pitchNumber };
}

/**
 * Generate simulated pitch pattern ('H' | 'L')[] based on mora count and pitch number
 */
function derivePitchPattern(kana: string, pitchNumber: number): { pattern: ('H' | 'L')[]; category: PitchAccentType } {
  const moras = splitIntoMoras(kana || '');
  const n = moras.length;
  if (n === 0) return { pattern: [], category: 'heiban' };

  let category: PitchAccentType = 'heiban';
  const pattern: ('H' | 'L')[] = [];

  if (pitchNumber === 0) {
    category = 'heiban';
    for (let i = 0; i < n; i++) {
      pattern.push(i === 0 ? 'L' : 'H');
    }
  } else if (pitchNumber === 1) {
    category = 'atamadaka';
    for (let i = 0; i < n; i++) {
      pattern.push(i === 0 ? 'H' : 'L');
    }
  } else if (pitchNumber === n) {
    category = 'odaka';
    for (let i = 0; i < n; i++) {
      pattern.push(i === 0 ? 'L' : 'H');
    }
  } else {
    category = 'nakadaka';
    for (let i = 0; i < n; i++) {
      pattern.push(i === 0 ? 'L' : i < pitchNumber ? 'H' : 'L');
    }
  }

  return { pattern, category };
}

/**
 * Generate standard 4-speaker audio tokens for a word
 */
function generateSpeakerTokens(kanaOrKanji: string): HVPTSpeakerToken[] {
  return HVPT_SPEAKERS.map((s) => ({
    speaker_id: s.key,
    speaker_gender: s.gender,
    speaker_age_group: s.age_group,
    audio_url: `/audio/hvpt/${s.key}/${encodeURIComponent(kanaOrKanji)}.mp3`,
    pitch: s.pitch,
    rate: s.rate,
  }));
}

/**
 * Loads and compiles all 150 phonological contrast items from confusion-pairs.js into HVPTPairItem[]
 */
export async function loadAllHVPTPairs(): Promise<HVPTPairItem[]> {
  if (hvptCache) return [...hvptCache];

  const allPairs = await loadDiagnosticPairs();
  const phonological = allPairs.filter((p) => {
    return (
      (p.id && p.id.startsWith('cp-phon-')) ||
      p.archetype === 'pitch_accent_contrast' ||
      p.archetype === 'audio_speed_gate'
    );
  });

  const compiled: HVPTPairItem[] = phonological.map((item, idx) => {
    const domain = mapPhonologicalDomain(item.domain || item.category || '');
    const patternA = item.patterns && item.patterns[0] ? item.patterns[0] : item.target_form || '';
    const patternB = item.patterns && item.patterns[1] ? item.patterns[1] : item.l1_trap_form || '';

    const parsedA = parsePatternString(patternA);
    const parsedB = parsePatternString(patternB);

    const pitchA = derivePitchPattern(parsedA.kana, parsedA.pitchNumber);
    const pitchB = derivePitchPattern(parsedB.kana, parsedB.pitchNumber);

    const morasA = splitIntoMoras(parsedA.kana);
    const morasB = splitIntoMoras(parsedB.kana);

    const wordA: HVPTPairWord = {
      kanji: parsedA.kanji,
      kana: parsedA.kana,
      meaning_id: parsedA.meaning || item.target_form || '',
      accent_type: pitchA.category,
      mora_count: morasA.length,
      pitch_pattern: pitchA.pattern,
      audio_tokens: generateSpeakerTokens(parsedA.kana),
    };

    const wordB: HVPTPairWord = {
      kanji: parsedB.kanji,
      kana: parsedB.kana,
      meaning_id: parsedB.meaning || item.l1_trap_form || '',
      accent_type: pitchB.category,
      mora_count: morasB.length,
      pitch_pattern: pitchB.pattern,
      audio_tokens: generateSpeakerTokens(parsedB.kana),
    };

    // Calculate acoustic closure ratio for sokuon (ms)
    let closureRatio: number | undefined = undefined;
    if (domain === 'sokuon_stop') {
      closureRatio = 180; // Standard 180ms silent closure for voiceless stops /k, t, p, s/
    } else if (domain === 'chōon_vowel') {
      closureRatio = 220; // Extended 220ms vowel steady-state
    }

    return {
      pair_id: item.id || `hvpt-pair-${idx + 1}`,
      title: item.title || `${parsedA.kanji} vs. ${parsedB.kanji}`,
      word_a: wordA,
      word_b: wordB,
      phonological_contrast_domain: domain,
      closure_ratio: closureRatio,
      target_word: 'A',
      difficulty: item.fsrs_difficulty || 7.0,
      l1_substratum: item.l1_substratum,
      explanation: item.root_cause || item.stimulus_l1 || '',
    };
  });

  hvptCache = compiled;
  return [...compiled];
}

/**
 * Filter HVPT pairs by phonological domain
 */
export async function getHVPTPairsByDomain(domain: PhonologicalContrastDomain): Promise<HVPTPairItem[]> {
  const all = await loadAllHVPTPairs();
  return all.filter((p) => p.phonological_contrast_domain === domain);
}

/**
 * Get single HVPT pair by pair_id
 */
export async function getHVPTPairById(id: string): Promise<HVPTPairItem | null> {
  const all = await loadAllHVPTPairs();
  return all.find((p) => p.pair_id === id) || null;
}

/**
 * Creates a randomized HVPT training session across multi-speaker conditions
 */
export async function createHVPTSession(
  domain?: PhonologicalContrastDomain,
  count: number = 10
): Promise<{ session_id: string; pairs: HVPTPairItem[] }> {
  const pool = domain ? await getHVPTPairsByDomain(domain) : await loadAllHVPTPairs();
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, Math.min(count, shuffled.length));

  // Randomize target word A or B for true perceptual discrimination
  const pairsWithTargets: HVPTPairItem[] = selected.map((pair) => {
    const target: 'A' | 'B' = Math.random() < 0.5 ? 'A' : 'B';
    return {
      ...pair,
      target_word: target,
    };
  });

  return {
    session_id: `hvpt-sess-${Date.now()}`,
    pairs: pairsWithTargets,
  };
}

/**
 * Evaluates single quiz response
 */
export function evaluateHVPTTrial(trial: HVPTQuizResult): boolean {
  return trial.selected === trial.target;
}

/**
 * Aggregates HVPT session statistics across multi-speaker and domain dimensions
 */
export function summarizeHVPTSession(results: HVPTQuizResult[]): HVPTSessionSummary {
  const total = results.length;
  if (total === 0) {
    return {
      total_trials: 0,
      correct_count: 0,
      accuracy_percent: 0,
      average_reaction_time_ms: 0,
      speaker_breakdown: {},
      domain_breakdown: {},
    };
  }

  let correctCount = 0;
  let totalReactionTime = 0;
  const speakerBreakdown: Record<string, { total: number; correct: number; accuracy: number }> = {};
  const domainBreakdown: Record<string, { total: number; correct: number; accuracy: number }> = {};

  results.forEach((r) => {
    if (r.is_correct) correctCount++;
    totalReactionTime += r.reaction_time_ms || 0;

    // Speaker stats
    if (!speakerBreakdown[r.speaker_id]) {
      speakerBreakdown[r.speaker_id] = { total: 0, correct: 0, accuracy: 0 };
    }
    speakerBreakdown[r.speaker_id].total++;
    if (r.is_correct) speakerBreakdown[r.speaker_id].correct++;

    // Domain stats
    if (!domainBreakdown[r.domain]) {
      domainBreakdown[r.domain] = { total: 0, correct: 0, accuracy: 0 };
    }
    domainBreakdown[r.domain].total++;
    if (r.is_correct) domainBreakdown[r.domain].correct++;
  });

  // Calculate percentages
  Object.keys(speakerBreakdown).forEach((k) => {
    const s = speakerBreakdown[k];
    s.accuracy = Math.round((s.correct / s.total) * 100);
  });
  Object.keys(domainBreakdown).forEach((k) => {
    const d = domainBreakdown[k];
    d.accuracy = Math.round((d.correct / d.total) * 100);
  });

  return {
    total_trials: total,
    correct_count: correctCount,
    accuracy_percent: Math.round((correctCount / total) * 100),
    average_reaction_time_ms: Math.round(totalReactionTime / total),
    speaker_breakdown: speakerBreakdown,
    domain_breakdown: domainBreakdown,
  };
}

/**
 * Play Japanese audio synthesized according to the chosen speaker's vocal acoustics
 */
export async function playHVPTSpeaker(text: string, speakerKey: string = 'speaker_m1'): Promise<void> {
  const profile = HVPT_SPEAKERS.find((s) => s.key === speakerKey) || HVPT_SPEAKERS[0];
  return speakJapanese(text, {
    gender: profile.gender === 'F' ? 'female' : 'male',
    pitch: profile.pitch,
    rate: profile.rate,
  });
}
