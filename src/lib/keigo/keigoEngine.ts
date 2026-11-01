// ══════════════════════════════════════════════════════════════════
//  keigoEngine.ts — Interactive Decision Tree & Pedagogical Grader
//  Implements the 3-Step Uchi/Soto logic model with Indonesian explanations
// ══════════════════════════════════════════════════════════════════

import {
  HonorificRegister,
  KEIGO_VERB_BANK,
  KEIGO_NOUN_BANK,
  KEIGO_SCENARIO_BANK,
  KeigoVerb,
  KeigoNounWord,
  KeigoScenario,
} from './keigoData';

export type ActorAnswer = 'self' | 'other';
export type AddresseeAnswer = 'direct' | 'third-party';
export type GroupAnswer = 'own-group' | 'outsider';

export interface DecisionPath {
  actor?: ActorAnswer;
  addressee?: AddresseeAnswer;
  group?: GroupAnswer;
}

export type DecisionStep = 'actor' | 'addressee' | 'group' | 'result';

/**
 * Determines current step in the 3-question Uchi/Soto decision tree
 */
export function currentDecisionStep(path: DecisionPath): DecisionStep {
  if (!path.actor) return 'actor';
  if (path.actor === 'self') return 'result';
  if (!path.addressee) return 'addressee';
  if (path.addressee === 'direct') return 'result';
  if (!path.group) return 'group';
  return 'result';
}

/**
 * Derives the resulting honorific register from the path
 */
export function deriveRegister(path: DecisionPath): HonorificRegister | null {
  if (path.actor === 'self') return 'kenjougo';
  if (path.actor === 'other') {
    if (path.addressee === 'direct') return 'sonkeigo';
    if (path.addressee === 'third-party') {
      if (path.group === 'own-group') return 'kenjougo';
      if (path.group === 'outsider') return 'sonkeigo';
    }
  }
  return null;
}

/**
 * Returns a pedagogically rigorous Indonesian explanation of the decision path
 */
export function explainDecisionPath(path: DecisionPath): string {
  if (path.actor === 'self') {
    return 'Pelaku tindakan adalah diri Anda sendiri (atau pihak internal Anda) yang ditujukan kepada lawan bicara. Dalam etiket Jepang, Anda WAJIB merendahkan tindakan diri sendiri demi memuliakan lawan bicara — gunakan KENJOUGO (謙譲語).';
  }
  if (path.addressee === 'direct') {
    return 'Pelaku tindakan adalah lawan bicara langsung yang Anda hormati (atasan, klien, guru, tamu). Karena Anda berbicara langsung dengannya, tindakan orang tersebut WAJIB ditinggikan — gunakan SONKEIGO (尊敬語).';
  }
  if (path.group === 'own-group') {
    return 'INILAH JEBAKAN UCHI-SOTO: Orang yang Anda bicarakan adalah atasan atau rekan sekantor Anda sendiri, namun Anda sedang berbicara dengan PIHAK LUAR (klien/tamu). Di hadapan orang luar, semua orang di kelompok internal Anda (Uchi) harus direndahkan derajatnya secara rendah hati — gunakan KENJOUGO (謙譲語). Jangan pernah memakai Sonkeigo untuk atasan sendiri di depan klien!';
  }
  if (path.group === 'outsider') {
    return 'Orang yang Anda bicarakan adalah pihak luar (Soto) relatif terhadap situasi percakapan (misalnya staf dari perusahaan mitra atau tamu kehormatan). Tindakan pihak luar tersebut tetap ditinggikan — gunakan SONKEIGO (尊敬語).';
  }
  return '';
}

/**
 * Searches the master verb bank by Japanese kanji, hiragana reading, Indonesian meaning, or English
 */
export function searchKeigoVerbs(query: string): KeigoVerb[] {
  const q = query.trim().toLowerCase();
  if (!q) return KEIGO_VERB_BANK;

  return KEIGO_VERB_BANK.filter((verb) => {
    return (
      verb.dictionaryForm.toLowerCase().includes(q) ||
      verb.reading.toLowerCase().includes(q) ||
      verb.meaning.toLowerCase().includes(q) ||
      verb.meaningEn.toLowerCase().includes(q) ||
      verb.sonkeigo.toLowerCase().includes(q) ||
      verb.kenjougo.toLowerCase().includes(q) ||
      (verb.alternateSonkeigo && verb.alternateSonkeigo.some((s) => s.toLowerCase().includes(q))) ||
      (verb.alternateKenjougo && verb.alternateKenjougo.some((k) => k.toLowerCase().includes(q)))
    );
  });
}

/**
 * Searches the noun/bikago bank
 */
export function searchKeigoNouns(query: string): KeigoNounWord[] {
  const q = query.trim().toLowerCase();
  if (!q) return KEIGO_NOUN_BANK;

  return KEIGO_NOUN_BANK.filter((item) => {
    return (
      item.plain.toLowerCase().includes(q) ||
      item.reading.toLowerCase().includes(q) ||
      item.meaning.toLowerCase().includes(q) ||
      (item.sonkeigo && item.sonkeigo.toLowerCase().includes(q)) ||
      (item.kenjougo && item.kenjougo.toLowerCase().includes(q)) ||
      item.nuanceNote.toLowerCase().includes(q)
    );
  });
}

/**
 * Filters workplace scenarios by category or difficulty
 */
export function filterScenarios(
  category?: string,
  difficulty?: string
): KeigoScenario[] {
  return KEIGO_SCENARIO_BANK.filter((sc) => {
    if (category && category !== 'all' && sc.category !== category) return false;
    if (difficulty && difficulty !== 'all' && sc.difficulty !== difficulty) return false;
    return true;
  });
}

/**
 * Grades user typed input and detects specific learner trap patterns
 */
export interface GradeResult {
  isCorrect: boolean;
  score: number;
  feedback: string;
  expectedAnswer: string;
}

export function gradeKeigoInput(
  verb: KeigoVerb,
  target: HonorificRegister,
  rawInput: string
): GradeResult {
  const input = rawInput.trim();
  const expected = target === 'sonkeigo' ? verb.sonkeigo : verb.kenjougo;
  const alternates = target === 'sonkeigo' ? verb.alternateSonkeigo || [] : verb.alternateKenjougo || [];

  const validAnswers = [expected, ...alternates];

  if (validAnswers.some((ans) => ans.replace(/\s+/g, '') === input.replace(/\s+/g, ''))) {
    return {
      isCorrect: true,
      score: 100,
      feedback: `Hebat! Bentuk ${target === 'sonkeigo' ? 'Sonkeigo (尊敬語)' : 'Kenjougo (謙譲語)'} dari "${verb.dictionaryForm}" adalah "${expected}".`,
      expectedAnswer: expected,
    };
  }

  // Detect regular mistake pattern on irregular verbs (e.g. お食べになる for 食べる)
  if (verb.type === 'irregular' && verb.stem && verb.prefix) {
    const mistakenRegular =
      target === 'sonkeigo'
        ? `${verb.prefix}${verb.stem}になる`
        : `${verb.prefix}${verb.stem}する`;

    if (input.includes(mistakenRegular)) {
      return {
        isCorrect: false,
        score: 40,
        feedback: `Perhatian: Kata "${verb.dictionaryForm}" memiliki bentuk TAK BERATURAN KHUSUS! Pola umum "${mistakenRegular}" tidak berlaku untuk kata ini. Bentuk yang benar adalah "${expected}".`,
        expectedAnswer: expected,
      };
    }
  }

  return {
    isCorrect: false,
    score: 0,
    feedback: `Kurang tepat. Bentuk yang tepat adalah "${expected}". Perhatikan perbedaan antara meninggikan lawan bicara vs merendahkan diri.`,
    expectedAnswer: expected,
  };
}
