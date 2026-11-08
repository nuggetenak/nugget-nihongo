/**
 * Nugget Nihongo — Runtime Schema Validation & Defensive Data Guard
 * 
 * Provides zero-dependency runtime validation and defensive sanitization
 * for vocabulary, grammar entries, and curriculum units.
 * Guarantees application resilience against truncated JSON, corrupted cache,
 * or malformed network payloads without throwing uncaught runtime exceptions.
 */

import type { JLPTLevel, WordCategory, VocabEntry } from '../../types/vocab';
import type { GrammarEntry, GrammarCategory, GrammarExample } from '../../types/grammar';

export const VALID_JLPT_LEVELS: readonly JLPTLevel[] = ['n5', 'n4', 'n3', 'n2', 'n1'] as const;

export const VALID_WORD_CATEGORIES: readonly WordCategory[] = [
  'verb',
  'adjective',
  'noun',
  'adverb',
  'expression',
  'particle',
] as const;

export const VALID_GRAMMAR_CATEGORIES: readonly GrammarCategory[] = [
  'tense-aspect',
  'verb-forms',
  'conditionals',
  'modality',
  'negation-extent',
  'connectives',
  'nouns-predicates',
  'desire-social',
  'particles',
  'adverbs',
  'expressions',
] as const;

export interface ValidationResult<T> {
  valid: boolean;
  errors: string[];
  sanitized?: T;
}

export interface BatchValidationResult<T> {
  totalCount: number;
  validCount: number;
  invalidCount: number;
  validEntries: T[];
  errors: string[];
}

/**
 * Type guard for JLPTLevel
 */
export function isJLPTLevel(value: unknown): value is JLPTLevel {
  return typeof value === 'string' && VALID_JLPT_LEVELS.includes(value.toLowerCase() as JLPTLevel);
}

/**
 * Type guard for WordCategory
 */
export function isWordCategory(value: unknown): value is WordCategory {
  return typeof value === 'string' && VALID_WORD_CATEGORIES.includes(value.toLowerCase() as WordCategory);
}

/**
 * Type guard for GrammarCategory
 */
export function isGrammarCategory(value: unknown): value is GrammarCategory {
  return typeof value === 'string' && VALID_GRAMMAR_CATEGORIES.includes(value.toLowerCase() as GrammarCategory);
}

/**
 * Safe JSON parser that never throws and returns a provided fallback on syntax error.
 */
export function safeParseJSON<T>(jsonString: unknown, fallback: T): T {
  if (typeof jsonString !== 'string' || !jsonString.trim()) {
    return fallback;
  }
  try {
    const parsed = JSON.parse(jsonString);
    return parsed !== null && parsed !== undefined ? (parsed as T) : fallback;
  } catch {
    return fallback;
  }
}

/**
 * Validates and sanitizes a single VocabEntry.
 * Returns valid: true and a clean sanitized object if essential fields exist.
 */
export function validateVocabEntry(raw: unknown): ValidationResult<VocabEntry> {
  const errors: string[] = [];

  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
    return { valid: false, errors: ['Input must be a non-null object'] };
  }

  const item = raw as Record<string, unknown>;

  // Essential required fields
  const id = typeof item.id === 'string' ? item.id.trim() : '';
  const word = typeof item.word === 'string' ? item.word.trim() : '';
  const reading = typeof item.reading === 'string' ? item.reading.trim() : '';
  const meaning = typeof item.meaning === 'string' ? item.meaning.trim() : '';

  if (!id) errors.push('Missing or empty "id" string');
  if (!word) errors.push('Missing or empty "word" string');
  if (!meaning) errors.push('Missing or empty "meaning" string');

  // Level validation with fallback
  let level: JLPTLevel = 'n5';
  if (isJLPTLevel(item.level)) {
    level = item.level.toLowerCase() as JLPTLevel;
  } else {
    errors.push(`Invalid or missing level: "${String(item.level)}", defaulting to "n5"`);
  }

  // Type validation with fallback
  let type: WordCategory = 'noun';
  if (isWordCategory(item.type)) {
    type = item.type.toLowerCase() as WordCategory;
  } else {
    // If not matching canonical category, keep it as noun fallback
    type = 'noun';
  }

  // Critical failure if core identifier and content are completely absent
  if (!id || (!word && !reading)) {
    return { valid: false, errors };
  }

  const sanitized: VocabEntry = {
    id,
    word: word || reading,
    reading: reading || word,
    romaji: typeof item.romaji === 'string' ? item.romaji.trim() : undefined,
    meaning,
    english: typeof item.english === 'string' ? item.english.trim() : undefined,
    level,
    type,
    category: typeof item.category === 'string' ? item.category.trim() : undefined,
    exampleJp: typeof item.exampleJp === 'string' ? item.exampleJp.trim() : undefined,
    exampleId: typeof item.exampleId === 'string' ? item.exampleId.trim() : undefined,
    furigana: typeof item.furigana === 'string' ? item.furigana.trim() : undefined,
    kanji: typeof item.kanji === 'string' ? item.kanji.trim() : undefined,
    tags: Array.isArray(item.tags) ? item.tags.filter((t): t is string => typeof t === 'string' && !!t.trim()) : undefined,
    audio: typeof item.audio === 'string' ? item.audio.trim() : undefined,
    lesson: typeof item.lesson === 'number' && !Number.isNaN(item.lesson) ? item.lesson : undefined,
    book: typeof item.book === 'string' ? item.book.trim() : undefined,
  };

  return {
    valid: errors.length === 0 || (!!id && !!sanitized.word && !!meaning),
    errors,
    sanitized,
  };
}

/**
 * Validates a batch array of VocabEntry candidates defensively.
 */
export function validateVocabList(rawList: unknown): BatchValidationResult<VocabEntry> {
  const errors: string[] = [];
  const validEntries: VocabEntry[] = [];

  if (!Array.isArray(rawList)) {
    return {
      totalCount: 0,
      validCount: 0,
      invalidCount: 0,
      validEntries: [],
      errors: ['Input payload is not an array'],
    };
  }

  rawList.forEach((item, index) => {
    const res = validateVocabEntry(item);
    if (res.sanitized && res.valid) {
      validEntries.push(res.sanitized);
    } else {
      errors.push(`Item at index [${index}]: ${res.errors.join(', ')}`);
    }
  });

  return {
    totalCount: rawList.length,
    validCount: validEntries.length,
    invalidCount: rawList.length - validEntries.length,
    validEntries,
    errors,
  };
}

/**
 * Validates and sanitizes a single GrammarEntry.
 */
export function validateGrammarEntry(raw: unknown): ValidationResult<GrammarEntry> {
  const errors: string[] = [];

  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
    return { valid: false, errors: ['Input must be a non-null object'] };
  }

  const item = raw as Record<string, unknown>;

  const id = typeof item.id === 'string' ? item.id.trim() : '';
  const title = typeof item.title === 'string' ? item.title.trim() : '';
  const pattern = typeof item.pattern === 'string' ? item.pattern.trim() : '';
  const meaning = typeof item.meaning === 'string' ? item.meaning.trim() : '';
  const explanation = typeof item.explanation === 'string' ? item.explanation.trim() : '';
  const formation = typeof item.formation === 'string' ? item.formation.trim() : '';

  if (!id) errors.push('Missing or empty "id"');
  if (!pattern && !title) errors.push('Missing pattern and title');
  if (!meaning) errors.push('Missing meaning');

  let level: JLPTLevel = 'n5';
  if (isJLPTLevel(item.level)) {
    level = item.level.toLowerCase() as JLPTLevel;
  } else {
    errors.push(`Invalid level: "${String(item.level)}", defaulting to "n5"`);
  }

  let category: GrammarCategory = 'expressions';
  if (isGrammarCategory(item.category)) {
    category = item.category.toLowerCase() as GrammarCategory;
  }

  // Sanitize examples array
  const rawExamples = Array.isArray(item.examples) ? item.examples : [];
  const examples: GrammarExample[] = [];

  for (const ex of rawExamples) {
    if (ex && typeof ex === 'object' && !Array.isArray(ex)) {
      const exObj = ex as Record<string, unknown>;
      const jp = typeof exObj.jp === 'string' ? exObj.jp.trim() : '';
      const idStr = typeof exObj.id === 'string' ? exObj.id.trim() : '';
      if (jp || idStr) {
        examples.push({
          jp: jp || '(contoh kalimat)',
          id: idStr || '(terjemahan)',
          romaji: typeof exObj.romaji === 'string' ? exObj.romaji.trim() : undefined,
          notes: typeof exObj.notes === 'string' ? exObj.notes.trim() : undefined,
        });
      }
    }
  }

  if (!id || (!title && !pattern)) {
    return { valid: false, errors };
  }

  const sanitized: GrammarEntry = {
    id,
    title: title || pattern,
    pattern: pattern || title,
    meaning,
    level,
    category,
    explanation: explanation || meaning,
    formation: formation || '-',
    examples,
    nuance: typeof item.nuance === 'string' ? item.nuance.trim() : undefined,
    caution: typeof item.caution === 'string' ? item.caution.trim() : undefined,
    related: Array.isArray(item.related)
      ? item.related.filter((r): r is string => typeof r === 'string' && !!r.trim())
      : undefined,
    book: typeof item.book === 'string' ? item.book.trim() : undefined,
    lesson: typeof item.lesson === 'number' && !Number.isNaN(item.lesson) ? item.lesson : undefined,
  };

  return {
    valid: errors.length === 0 || (!!id && !!sanitized.title && !!meaning),
    errors,
    sanitized,
  };
}

/**
 * Validates a batch array of GrammarEntry candidates defensively.
 */
export function validateGrammarList(rawList: unknown): BatchValidationResult<GrammarEntry> {
  const errors: string[] = [];
  const validEntries: GrammarEntry[] = [];

  if (!Array.isArray(rawList)) {
    return {
      totalCount: 0,
      validCount: 0,
      invalidCount: 0,
      validEntries: [],
      errors: ['Input payload is not an array'],
    };
  }

  rawList.forEach((item, index) => {
    const res = validateGrammarEntry(item);
    if (res.sanitized && res.valid) {
      validEntries.push(res.sanitized);
    } else {
      errors.push(`Item at index [${index}]: ${res.errors.join(', ')}`);
    }
  });

  return {
    totalCount: rawList.length,
    validCount: validEntries.length,
    invalidCount: rawList.length - validEntries.length,
    validEntries,
    errors,
  };
}

/**
 * Defensive check for curriculum lesson metadata.
 */
export interface LessonMetaValidation {
  id: string;
  level: JLPTLevel;
  unit_number: number;
  title: string;
  theme?: string;
  valid: boolean;
}

export function validateLessonMetadata(raw: unknown): LessonMetaValidation {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
    return { id: 'unknown', level: 'n5', unit_number: 1, title: 'Untitled', valid: false };
  }
  const item = raw as Record<string, unknown>;
  const id = typeof item.id === 'string' && item.id.trim() ? item.id.trim() : 'unknown';
  const level: JLPTLevel = isJLPTLevel(item.level) ? (item.level.toLowerCase() as JLPTLevel) : 'n5';
  const unit_number = typeof item.unit_number === 'number' && item.unit_number > 0 ? item.unit_number : 1;
  const title = typeof item.title === 'string' && item.title.trim() ? item.title.trim() : 'Untitled Lesson';

  return {
    id,
    level,
    unit_number,
    title,
    theme: typeof item.theme === 'string' ? item.theme.trim() : undefined,
    valid: id !== 'unknown' && title !== 'Untitled Lesson',
  };
}
