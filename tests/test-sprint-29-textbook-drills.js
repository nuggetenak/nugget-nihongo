// ══════════════════════════════════════════════════════════════════
//  test-sprint-29-textbook-drills.js — Master Verification Suite
//  Textbook Signature Exercise Bank Integrity, Schema Normalization
//  & Modal Player Architecture (Tickets T-161 to T-165)
// ══════════════════════════════════════════════════════════════════

import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

console.log('🧪 [Sprint 29 Audit] Initiating Textbook Signature Exercise Bank, Schema Normalization & Modal Player Architecture Evaluation...\n');

let totalChecks = 0;
let passedChecks = 0;

function check(name, fn) {
  totalChecks++;
  try {
    fn();
    passedChecks++;
    console.log(`  ✅ [PASS] ${name}`);
  } catch (err) {
    console.error(`  ❌ [FAIL] ${name}: ${err.message}`);
    throw err;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. T-161: Shin Kanzen Master Casing & Runtime Access (123 Signature Drills)
// ─────────────────────────────────────────────────────────────────────────────
check('T-161: Shin Kanzen Master N1, N2, N3 define exactly 123 drills across 41 units', () => {
  const skmLevels = ['n1', 'n2', 'n3'];
  const expectedCounts = { n1: 45, n2: 42, n3: 36 };
  const expectedUnits = { n1: 15, n2: 14, n3: 12 };
  let totalSkmDrills = 0;

  skmLevels.forEach((lvl) => {
    const filePath = path.join(ROOT, `public/data/staged-expansion/exercises/shin-kanzen-master/exercises-skm-${lvl}.js`);
    assert.ok(fs.existsSync(filePath), `SKM ${lvl} file missing: ${filePath}`);

    const code = fs.readFileSync(filePath, 'utf8');
    const sandboxWindow = {};
    const runInSandbox = new Function('window', code);
    runInSandbox(sandboxWindow);

    const varName = `exercisesSkmN${lvl.replace('n', '')}`;
    const data = sandboxWindow[varName];
    assert.ok(data, `Global variable ${varName} missing on window`);
    assert.ok(data.units, `SKM ${lvl} missing units object`);

    const unitKeys = Object.keys(data.units);
    assert.equal(unitKeys.length, expectedUnits[lvl], `SKM ${lvl} unit count mismatch`);

    let drillCount = 0;
    unitKeys.forEach((uk) => {
      drillCount += (data.units[uk].drills || []).length;
    });
    assert.equal(drillCount, expectedCounts[lvl], `SKM ${lvl} drill count mismatch`);
    totalSkmDrills += drillCount;
  });

  assert.equal(totalSkmDrills, 123, 'Total SKM drills across N1-N3 must equal exactly 123');
});

check('T-161: authenticExerciseManager.ts supports SKM casing fallbacks and robust regex volume matching', () => {
  const managerPath = path.join(ROOT, 'src/lib/data/authenticExerciseManager.ts');
  const content = fs.readFileSync(managerPath, 'utf8');

  assert.ok(content.includes('exercisesSkmN'), 'SKM variable name lookup missing');
  assert.ok(content.includes('exercisesSKMN'), 'SKM uppercase casing fallback missing');
  assert.ok(content.includes("match(/[1-5]/)"), 'Robust JLPT level regex extraction missing');
});

// ─────────────────────────────────────────────────────────────────────────────
// 2. T-162: Universal Prompt Coalescing & Multi-Device Modal Architecture
// ─────────────────────────────────────────────────────────────────────────────
check('T-162: AuthenticDrillModal.tsx implements Universal Prompt Coalescing across all mechanics', () => {
  const modalPath = path.join(ROOT, 'src/components/materi/AuthenticDrillModal.tsx');
  const content = fs.readFileSync(modalPath, 'utf8');

  // Universal Prompt Coalescing check
  assert.ok(content.includes('currentDrill.sentence_prompt'), 'sentence_prompt coalescing missing');
  assert.ok(content.includes('currentDrill.prompt'), 'prompt coalescing missing');
  assert.ok(content.includes('currentDrill.question_prompt'), 'question_prompt coalescing missing');
  assert.ok(content.includes('currentDrill.scrambled_prompt'), 'scrambled_prompt coalescing missing');
  assert.ok(content.includes('currentDrill.passage_context'), 'passage_context coalescing missing');
  assert.ok(content.includes('currentDrill.passage_snippet'), 'passage_snippet coalescing missing');
  assert.ok(content.includes('currentDrill.discussion_prompt'), 'discussion_prompt coalescing missing');

  // Specialized Mechanic Badges check
  assert.ok(content.includes('currentDrill.sign_example'), 'Irodori sign_example rendering missing');
  assert.ok(content.includes('currentDrill.task_can_do'), 'Irodori task_can_do rendering missing');
  assert.ok(content.includes('currentDrill.speech_bubble_prompt'), 'Marugoto speech_bubble_prompt missing');
  assert.ok(content.includes('currentDrill.illustration_cue'), 'Marugoto illustration_cue missing');
  assert.ok(content.includes('currentDrill.target_pattern'), 'Genki/Minna target_pattern missing');
  assert.ok(content.includes('currentDrill.syntactic_hint'), 'SKM syntactic_hint missing');
  assert.ok(content.includes('currentDrill.contrastive_nuance'), 'SKM contrastive_nuance missing');
});

check('T-162: AuthenticDrillModal.tsx and BookTrackBrowser.tsx enforce responsive option wrapping and clean chapter titles', () => {
  const modalPath = path.join(ROOT, 'src/components/materi/AuthenticDrillModal.tsx');
  const modalContent = fs.readFileSync(modalPath, 'utf8');

  // Anti-leakage responsive wrapping check
  assert.ok(
    modalContent.includes('break-words whitespace-normal leading-snug'),
    'Option label must employ break-words whitespace-normal leading-snug to prevent mobile clipping'
  );

  // Clean trailing colons
  assert.ok(
    modalContent.includes("chapterTitle.replace(/:\\s*$/, '').trim()"),
    'chapterTitle must strip trailing colons when topic is absent'
  );

  const browserPath = path.join(ROOT, 'src/components/materi/BookTrackBrowser.tsx');
  const browserContent = fs.readFileSync(browserPath, 'utf8');
  assert.ok(
    browserContent.includes("currentChapterDrillData.topic ? `Bab ${selectedChapter}: ${currentChapterDrillData.topic}` : `Bab ${selectedChapter}`"),
    'BookTrackBrowser must not emit trailing colon when topic is empty'
  );
});

// ─────────────────────────────────────────────────────────────────────────────
// 3. T-163: Schema Normalization & Polymorphic Adapter
// ─────────────────────────────────────────────────────────────────────────────
check('T-163: authenticExerciseManager.ts unifies chapters, units, lessons, weeks, and topics into normalized schema', () => {
  const managerPath = path.join(ROOT, 'src/lib/data/authenticExerciseManager.ts');
  const content = fs.readFileSync(managerPath, 'utf8');

  assert.ok(content.includes('data.chapters ||'), 'Polymorphic container chapters check missing');
  assert.ok(content.includes('data.units ||'), 'Polymorphic container units check missing');
  assert.ok(content.includes('data.lessons ||'), 'Polymorphic container lessons check missing');
  assert.ok(content.includes('data.weeks ||'), 'Polymorphic container weeks check missing');
  assert.ok(content.includes('data.topics'), 'Polymorphic container topics check missing');

  assert.ok(content.includes('normalizedMap[String(chapterNum)] = normalizedItem'), 'Universal numeric key indexing missing');
  assert.ok(content.includes('normalizedMap[key] = normalizedItem'), 'Original key indexing missing');
});

check('T-163: All 9 textbooks normalize with 100% complete options (0 missing options across 970 drills)', () => {
  const booksDir = path.join(ROOT, 'public/data/staged-expansion/exercises');
  const files = [];

  function findJs(dir) {
    fs.readdirSync(dir).forEach((f) => {
      const full = path.join(dir, f);
      if (fs.statSync(full).isDirectory()) findJs(full);
      else if (f.endsWith('.js') && f !== 'exercise-registry.js') files.push(full);
    });
  }
  findJs(booksDir);

  const sandboxWindow = {};
  files.forEach((f) => {
    const code = fs.readFileSync(f, 'utf8');
    const runner = new Function('window', code);
    runner(sandboxWindow);
  });

  let totalDrills = 0;
  let missingOptions = 0;

  const varNames = Object.keys(sandboxWindow).filter((k) => k.startsWith('exercises'));
  varNames.forEach((v) => {
    const data = sandboxWindow[v];
    const structKey = ['chapters', 'units', 'weeks', 'lessons', 'topics'].find((k) => data && data[k]);
    if (!structKey) return;

    const container = data[structKey];
    Object.values(container).forEach((item) => {
      (item.drills || []).forEach((d) => {
        totalDrills++;
        let opts = d.options;
        if (!opts || opts.length === 0) {
          if (d.scrambled_tokens && d.scrambled_tokens.length > 0) opts = d.scrambled_tokens;
          else if (d.tokens && d.tokens.length > 0) opts = d.tokens;
          else if (d.assessment_criteria && d.assessment_criteria.length > 0) opts = d.assessment_criteria;
          else if (d.mechanic === 'nuance_comparison' && d.sentence_prompt) {
            const match = d.sentence_prompt.match(/\[\s*A:\s*([^/]+)\s*\/\s*B:\s*([^\]]+)\s*\]/);
            if (match) opts = ['A: ' + match[1].trim(), 'B: ' + match[2].trim()];
            else if (d.confusing_pair) opts = d.confusing_pair;
          }
        }
        if (!opts || opts.length === 0) missingOptions++;
      });
    });
  });

  assert.equal(totalDrills, 970, `Total drills across 9 canonical textbooks must be exactly 970 (found ${totalDrills})`);
  assert.equal(missingOptions, 0, `All drills must have options after polymorphic extraction (missing: ${missingOptions})`);
});

// ─────────────────────────────────────────────────────────────────────────────
// 4. T-164: Try! JLPT Cover Artwork Integrity
// ─────────────────────────────────────────────────────────────────────────────
check('T-164: BookTrackBrowser.tsx maps Try! cover and assets exist on disk', () => {
  const browserPath = path.join(ROOT, 'src/components/materi/BookTrackBrowser.tsx');
  const content = fs.readFileSync(browserPath, 'utf8');

  assert.ok(content.includes("try: { base: '/assets/generated/book-cover-try', fallback: '/assets/generated/book-cover-try.jpg' }"), 'BOOK_COVER_MAP.try missing');

  const jpgPath = path.join(ROOT, 'public/assets/generated/book-cover-try.jpg');
  const avifPath = path.join(ROOT, 'public/assets/generated/book-cover-try-thumb.avif');
  const webpPath = path.join(ROOT, 'public/assets/generated/book-cover-try-thumb.webp');

  assert.ok(fs.existsSync(jpgPath), 'book-cover-try.jpg missing');
  assert.ok(fs.existsSync(avifPath), 'book-cover-try-thumb.avif missing');
  assert.ok(fs.existsSync(webpPath), 'book-cover-try-thumb.webp missing');
});

// ─────────────────────────────────────────────────────────────────────────────
// 5. T-165: 9-Book Master Staged Catalog Integrity
// ─────────────────────────────────────────────────────────────────────────────
check('T-165: Master staged books catalog covers all 9 series with verified volumes', () => {
  const catalogPath = path.join(ROOT, 'public/data/staged-expansion/books/sources-staged.js');
  assert.ok(fs.existsSync(catalogPath), 'sources-staged.js missing');

  const code = fs.readFileSync(catalogPath, 'utf8');
  const sandboxWindow = {};
  const runner = new Function('window', code);
  runner(sandboxWindow);

  const books = sandboxWindow.nuggetSourcesStaged?.books;
  assert.ok(Array.isArray(books), 'nuggetSourcesStaged.books array missing');
  assert.equal(books.length, 9, `Catalog must contain exactly 9 canonical book series (found ${books.length})`);

  const expectedIds = ['irodori', 'minna', 'soumatome', 'genki', 'shin-kanzen-master', 'tobira', 'quartet', 'try', 'marugoto'];
  expectedIds.forEach((id) => {
    const found = books.find((b) => b.id === id);
    assert.ok(found, `Book series ${id} missing from staged catalog`);
    assert.ok(found.volumes && found.volumes.length > 0, `Book series ${id} must have ready volumes`);
  });
});

console.log(`\n🎉 [Sprint 29 Certified] All ${passedChecks}/${totalChecks} Forensic Verifications Passed with 100% Precision!\n`);
