// ══════════════════════════════════════════════════════════════════
//  dokkaiExplainer.ts — Dokkai Reading & 5-Layer Pedagogical Engine
//  Standardized Taxonomy for JLPT Dokkai & 5-Layer Distractor Autopsy
// ══════════════════════════════════════════════════════════════════

export interface DokkaiGenreMeta {
  label: string;
  icon: string;
  color: string;
}

export const DOKKAI_GENRE_REGISTRY: Record<string, DokkaiGenreMeta> = {
  short_notice: {
    label: 'Pemberitahuan Singkat',
    icon: '📢',
    color: 'border-amber-500/30 text-amber-800 dark:text-amber-300 bg-amber-500/10 font-bold',
  },
  email: {
    label: 'Surat Elektronik (Email)',
    icon: '✉️',
    color: 'border-cyan-500/30 text-cyan-800 dark:text-cyan-300 bg-cyan-500/10 font-bold',
  },
  instruction: {
    label: 'Petunjuk & Regulasi',
    icon: '📋',
    color: 'border-emerald-500/30 text-emerald-800 dark:text-emerald-300 bg-emerald-500/10 font-bold',
  },
  realia_table: {
    label: 'Tabel & Dokumen Realia',
    icon: '📊',
    color: 'border-purple-500/30 text-purple-800 dark:text-purple-300 bg-purple-500/10 font-bold',
  },
  work_memo: {
    label: 'Memo Lapangan Kerja',
    icon: '📝',
    color: 'border-rose-500/30 text-rose-800 dark:text-rose-300 bg-rose-500/10 font-bold',
  },
  essay: {
    label: 'Esai Pemikiran & Opini',
    icon: '📖',
    color: 'border-amber-500/30 text-amber-800 dark:text-amber-300 bg-amber-500/10 font-bold',
  },
};

/**
 * Parses raw reading passage text into clean, non-empty paragraph blocks
 */
export function parseDokkaiParagraphs(passageText?: string | null): string[] {
  if (!passageText || typeof passageText !== 'string') return [];
  return passageText
    .split('\n')
    .map((p) => p.trim())
    .filter((p) => p.length > 0);
}

/**
 * Returns metadata and iconography for a given Dokkai genre
 */
export function getDokkaiGenreMeta(genre?: string): DokkaiGenreMeta {
  if (genre && DOKKAI_GENRE_REGISTRY[genre]) {
    return DOKKAI_GENRE_REGISTRY[genre];
  }
  return {
    label: 'Wacana Membaca (Dokkai)',
    icon: '📄',
    color: 'border-theme text-appText-muted bg-surface-2',
  };
}

/**
 * Resolves option index / label from distractor autopsy keys
 */
export function resolveDistractorLabel(
  key: string,
  options: string[] = []
): { letter: string; text: string } {
  const optionLetters = ['A', 'B', 'C', 'D'];
  const optIndex = parseInt(key, 10) - 1;

  const letter =
    !isNaN(optIndex) && optionLetters[optIndex] ? optionLetters[optIndex] : key.toUpperCase();
  const text =
    !isNaN(optIndex) && options[optIndex] ? options[optIndex] : '';

  return { letter, text };
}

/**
 * Validates the completeness of the 5-layer pedagogical explanation taxonomy
 */
export function validateFiveLayers(explanation: any): {
  isFullyQualified: boolean;
  hasJustification: boolean;
  hasDistractorAutopsy: boolean;
  hasMnemonic: boolean;
  hasL1Alert: boolean;
  hasRemedial: boolean;
  score: number; // 0..5
} {
  if (!explanation || typeof explanation !== 'object') {
    return {
      isFullyQualified: false,
      hasJustification: false,
      hasDistractorAutopsy: false,
      hasMnemonic: false,
      hasL1Alert: false,
      hasRemedial: false,
      score: 0,
    };
  }

  const hasJustification = Boolean(
    explanation.justification && String(explanation.justification).trim().length > 5
  );
  const hasDistractorAutopsy = Boolean(
    explanation.distractorAutopsy &&
      typeof explanation.distractorAutopsy === 'object' &&
      Object.keys(explanation.distractorAutopsy).length > 0
  );
  const hasMnemonic = Boolean(
    explanation.mnemonicSensei && String(explanation.mnemonicSensei).trim().length > 3
  );
  const hasL1Alert = Boolean(
    explanation.l1InterferenceAlert && String(explanation.l1InterferenceAlert).trim().length > 5
  );
  const hasRemedial = Boolean(
    explanation.remedialPrescription &&
      typeof explanation.remedialPrescription === 'object' &&
      explanation.remedialPrescription.advice
  );

  let score = 0;
  if (hasJustification) score++;
  if (hasDistractorAutopsy) score++;
  if (hasMnemonic) score++;
  if (hasL1Alert) score++;
  if (hasRemedial) score++;

  return {
    isFullyQualified: score >= 3, // At least 3 layers for high qualification
    hasJustification,
    hasDistractorAutopsy,
    hasMnemonic,
    hasL1Alert,
    hasRemedial,
    score,
  };
}
