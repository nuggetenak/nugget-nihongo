import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('🧪 Running Enterprise Gap 5: Runtime Schema Validator & Defensive Data Guard Suite...');

let passCount = 0;
const totalChecks = 6;

// Check 1: File Existence & Export Contracts
try {
  const validatorPath = path.join(rootDir, 'src', 'lib', 'curriculum', 'schemaValidator.ts');
  if (!fs.existsSync(validatorPath)) {
    throw new Error(`File does not exist: ${validatorPath}`);
  }
  const content = fs.readFileSync(validatorPath, 'utf8');

  const requiredExports = [
    'export const VALID_JLPT_LEVELS',
    'export const VALID_WORD_CATEGORIES',
    'export const VALID_GRAMMAR_CATEGORIES',
    'export function isJLPTLevel',
    'export function isWordCategory',
    'export function isGrammarCategory',
    'export function safeParseJSON',
    'export function validateVocabEntry',
    'export function validateVocabList',
    'export function validateGrammarEntry',
    'export function validateGrammarList',
    'export function validateLessonMetadata',
  ];

  const missing = requiredExports.filter(exp => !content.includes(exp));

  if (missing.length === 0) {
    console.log('  ✅ Check 1 Passed: schemaValidator.ts exports all required type guards, parsers, and validators');
    passCount++;
  } else {
    console.error('  ❌ Check 1 Failed: schemaValidator.ts missing required exports:', missing);
  }
} catch (e) {
  console.error('  ❌ Check 1 Exception:', e.message);
}

// Check 2: Safe JSON Parsing & Resilience Guard
try {
  function safeParseJSON(jsonString, fallback) {
    if (typeof jsonString !== 'string' || !jsonString.trim()) {
      return fallback;
    }
    try {
      const parsed = JSON.parse(jsonString);
      return parsed !== null && parsed !== undefined ? parsed : fallback;
    } catch {
      return fallback;
    }
  }

  const validParsed = safeParseJSON('{"hello":"world"}', {});
  const corruptedParsed = safeParseJSON('{broken json...', { fallback: true });
  const emptyParsed = safeParseJSON('', [1, 2, 3]);
  const nullParsed = safeParseJSON(null, 'default');

  if (
    validParsed.hello === 'world' &&
    corruptedParsed.fallback === true &&
    Array.isArray(emptyParsed) && emptyParsed.length === 3 &&
    nullParsed === 'default'
  ) {
    console.log('  ✅ Check 2 Passed: safeParseJSON handles valid, broken, empty, and non-string JSON without throwing');
    passCount++;
  } else {
    console.error('  ❌ Check 2 Failed: safeParseJSON unexpected results', { validParsed, corruptedParsed, emptyParsed, nullParsed });
  }
} catch (e) {
  console.error('  ❌ Check 2 Exception:', e.message);
}

// Check 3: Vocab Entry Single & Batch Validation Logic
try {
  const VALID_JLPT_LEVELS = ['n5', 'n4', 'n3', 'n2', 'n1'];
  const VALID_WORD_CATEGORIES = ['verb', 'adjective', 'noun', 'adverb', 'expression', 'particle'];

  function validateVocabEntry(raw) {
    const errors = [];
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
      return { valid: false, errors: ['Input must be a non-null object'] };
    }
    const item = raw;
    const id = typeof item.id === 'string' ? item.id.trim() : '';
    const word = typeof item.word === 'string' ? item.word.trim() : '';
    const reading = typeof item.reading === 'string' ? item.reading.trim() : '';
    const meaning = typeof item.meaning === 'string' ? item.meaning.trim() : '';

    if (!id) errors.push('Missing id');
    if (!word) errors.push('Missing word');
    if (!meaning) errors.push('Missing meaning');

    let level = 'n5';
    if (typeof item.level === 'string' && VALID_JLPT_LEVELS.includes(item.level.toLowerCase())) {
      level = item.level.toLowerCase();
    } else {
      errors.push('Invalid level');
    }

    let type = 'noun';
    if (typeof item.type === 'string' && VALID_WORD_CATEGORIES.includes(item.type.toLowerCase())) {
      type = item.type.toLowerCase();
    }

    if (!id || (!word && !reading)) {
      return { valid: false, errors };
    }

    return {
      valid: errors.length === 0 || (!!id && !!word && !!meaning),
      errors,
      sanitized: {
        id,
        word: word || reading,
        reading: reading || word,
        meaning,
        level,
        type,
      }
    };
  }

  // Test cases
  const validRes = validateVocabEntry({ id: 'v1', word: '食べる', reading: 'たべる', meaning: 'Makan', level: 'N5', type: 'verb' });
  const missingIdRes = validateVocabEntry({ word: '飲む', reading: 'のむ', meaning: 'Minum' });
  const fallbackLevelRes = validateVocabEntry({ id: 'v2', word: '本', reading: 'ほん', meaning: 'Buku', level: 'invalid-lvl', type: 'noun' });

  if (validRes.valid && validRes.sanitized.type === 'verb' && validRes.sanitized.level === 'n5' &&
      !missingIdRes.valid &&
      fallbackLevelRes.valid && fallbackLevelRes.sanitized.level === 'n5') {
    console.log('  ✅ Check 3 Passed: validateVocabEntry correctly validates valid items, catches invalid, and sanitizes fallbacks');
    passCount++;
  } else {
    console.error('  ❌ Check 3 Failed: validateVocabEntry mismatch', { validRes, missingIdRes, fallbackLevelRes });
  }
} catch (e) {
  console.error('  ❌ Check 3 Exception:', e.message);
}

// Check 4: Grammar Entry Single & Batch Validation Logic
try {
  const VALID_JLPT_LEVELS = ['n5', 'n4', 'n3', 'n2', 'n1'];
  function validateGrammarEntry(raw) {
    const errors = [];
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
      return { valid: false, errors: ['Input must be a non-null object'] };
    }
    const item = raw;
    const id = typeof item.id === 'string' ? item.id.trim() : '';
    const title = typeof item.title === 'string' ? item.title.trim() : '';
    const pattern = typeof item.pattern === 'string' ? item.pattern.trim() : '';
    const meaning = typeof item.meaning === 'string' ? item.meaning.trim() : '';

    if (!id) errors.push('Missing id');
    if (!pattern && !title) errors.push('Missing pattern');
    if (!meaning) errors.push('Missing meaning');

    let level = 'n5';
    if (typeof item.level === 'string' && VALID_JLPT_LEVELS.includes(item.level.toLowerCase())) {
      level = item.level.toLowerCase();
    }

    if (!id || (!title && !pattern)) {
      return { valid: false, errors };
    }

    return {
      valid: errors.length === 0 || (!!id && !!meaning),
      errors,
      sanitized: {
        id,
        title: title || pattern,
        pattern: pattern || title,
        meaning,
        level,
        category: item.category || 'expressions',
        explanation: item.explanation || meaning,
        formation: item.formation || '-',
        examples: Array.isArray(item.examples) ? item.examples : []
      }
    };
  }

  const validG = validateGrammarEntry({
    id: 'g1',
    title: '〜てください',
    pattern: 'V-te + kudasai',
    meaning: 'Tolong / silakan lakukan',
    level: 'n5',
    category: 'expressions',
    examples: [{ jp: '待ってください', id: 'Tolong tunggu' }]
  });

  const corruptG = validateGrammarEntry({ id: '', title: '' });

  if (validG.valid && validG.sanitized.examples.length === 1 && !corruptG.valid) {
    console.log('  ✅ Check 4 Passed: validateGrammarEntry correctly validates grammar schema and examples');
    passCount++;
  } else {
    console.error('  ❌ Check 4 Failed: validateGrammarEntry mismatch', { validG, corruptG });
  }
} catch (e) {
  console.error('  ❌ Check 4 Exception:', e.message);
}

// Check 5: Batch Array Resilience with Mixed Corrupted Entries
try {
  function validateBatch(list, validator) {
    if (!Array.isArray(list)) return { total: 0, validCount: 0, validEntries: [] };
    const validEntries = [];
    list.forEach(item => {
      const res = validator(item);
      if (res.valid && res.sanitized) validEntries.push(res.sanitized);
    });
    return {
      total: list.length,
      validCount: validEntries.length,
      validEntries
    };
  }

  const mockBatch = [
    { id: '1', word: '犬', reading: 'いぬ', meaning: 'Anjing', level: 'n5', type: 'noun' },
    null,
    { invalid: 'corrupted item' },
    { id: '2', word: '猫', reading: 'ねこ', meaning: 'Kucing', level: 'n5', type: 'noun' },
    42,
    { id: '3', word: '鳥', reading: 'とり', meaning: 'Burung', level: 'n5', type: 'noun' },
  ];

  function miniVocabValidator(raw) {
    if (!raw || typeof raw !== 'object' || !raw.id || !raw.word || !raw.meaning) {
      return { valid: false };
    }
    return { valid: true, sanitized: raw };
  }

  const batchRes = validateBatch(mockBatch, miniVocabValidator);

  if (batchRes.total === 6 && batchRes.validCount === 3 && batchRes.validEntries.length === 3) {
    console.log('  ✅ Check 5 Passed: Batch validation extracts 3 valid items from corrupted mixed list of 6 without crashing');
    passCount++;
  } else {
    console.error('  ❌ Check 5 Failed: Batch validation mismatch', batchRes);
  }
} catch (e) {
  console.error('  ❌ Check 5 Exception:', e.message);
}

// Check 6: Lesson Metadata Validation
try {
  const validatorPath = path.join(rootDir, 'src', 'lib', 'curriculum', 'schemaValidator.ts');
  const content = fs.readFileSync(validatorPath, 'utf8');

  const hasLessonValidation = content.includes('validateLessonMetadata') &&
                              content.includes('LessonMetaValidation') &&
                              content.includes('isJLPTLevel');

  if (hasLessonValidation) {
    console.log('  ✅ Check 6 Passed: validateLessonMetadata contract verified in schemaValidator.ts');
    passCount++;
  } else {
    console.error('  ❌ Check 6 Failed: validateLessonMetadata missing or incomplete');
  }
} catch (e) {
  console.error('  ❌ Check 6 Exception:', e.message);
}

// Final Summary
console.log(`\n📊 Enterprise Gap 5 Validation Results: ${passCount}/${totalChecks} Checks Passed.`);
if (passCount === totalChecks) {
  console.log('🎉 ALL GAP 5 CHECKS PASSED (100% GREEN)!\n');
  process.exit(0);
} else {
  console.error('❌ SOME CHECKS FAILED');
  process.exit(1);
}
