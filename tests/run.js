#!/usr/bin/env node
// ══════════════════════════════════════
// Nugget Nihongo — Test Runner (Architecture v3)
// Run: node tests/run.js
// ══════════════════════════════════════

const fs = require('fs');
const path = require('path');

global.window = global;
let pass = 0, fail = 0, skip = 0;

function assert(condition, msg) {
  if (condition) { pass++; }
  else { fail++; console.error('  FAIL:', msg); }
}

// ── Load data files ──
const ROOT = path.join(__dirname, '..');
function loadData(file) {
  const full = path.join(ROOT, 'public', file);
  if (!fs.existsSync(full)) { skip++; console.log(`  SKIP: ${file} (not found)`); return; }
  try { eval(fs.readFileSync(full, 'utf8')); } catch(e) { skip++; console.log(`  WARN: ${file} eval error: ${e.message.split('\n')[0]}`); }
}

console.log('Loading data files...');
loadData('data/vocab/vocab-n5.js');
loadData('data/vocab/vocab-n4.js');
loadData('data/vocab/vocab-n3.js');
loadData('data/vocab/vocab-n2.js');
loadData('data/vocab/vocab-n1.js');
loadData('data/grammar/grammar-n5.js');
loadData('data/grammar/grammar-n4.js');
loadData('data/grammar/grammar-n3.js');
loadData('data/grammar/grammar-n2.js');
loadData('data/grammar/grammar-n1.js');
loadData('data/books/book-minna-1.js');
loadData('data/books/book-minna-2.js');
loadData('data/books/book-irodori-a1.js');
loadData('data/books/book-irodori-a2-1.js');
loadData('data/books/book-irodori-a2-2.js');
loadData('data/books/sources.js');
loadData('data/vocab/vocab-index.js');
loadData('data/grammar/grammar-index.js');

console.log('Data loaded. Running tests...\n');

// ── Vocab N5 ──
console.log('── Vocab N5 ──');
const vn5 = global.vocabN5 || [];
assert(vn5.length > 0,   'vocabN5 should have entries');
assert(vn5.length >= 700, `vocabN5 count: ${vn5.length} (expected ≥700)`);
vn5.forEach((e, i) => {
  assert(e.id,          `vocabN5[${i}]: missing id`);
  assert(e.word,        `vocabN5[${i}] ${e.id}: missing word`);
  assert(e.jlpt,        `vocabN5[${i}] ${e.id}: missing jlpt`);
  assert(e.pos,         `vocabN5[${i}] ${e.id}: missing pos`);
  assert(e.meaning_id,  `vocabN5[${i}] ${e.id}: missing meaning_id`);
  if (e.id) assert(e.id.startsWith('vg-n5-'), `vocabN5[${i}]: id ${e.id} wrong prefix`);
});

// ── Vocab N4 ──
console.log('── Vocab N4 ──');
const vn4 = global.vocabN4 || [];
assert(vn4.length > 0,   'vocabN4 should have entries');
assert(vn4.length >= 690, `vocabN4 count: ${vn4.length} (expected ≥690)`);
vn4.forEach((e, i) => {
  assert(e.id,          `vocabN4[${i}]: missing id`);
  assert(e.word,        `vocabN4[${i}] ${e.id}: missing word`);
  assert(e.jlpt,        `vocabN4[${i}] ${e.id}: missing jlpt`);
  assert(e.pos,         `vocabN4[${i}] ${e.id}: missing pos`);
  assert(e.meaning_id,  `vocabN4[${i}] ${e.id}: missing meaning_id`);
  if (e.id) assert(e.id.startsWith('vg-n4-'), `vocabN4[${i}]: id ${e.id} wrong prefix`);
});

// ── Vocab N3 ──
console.log('── Vocab N3 ──');
const vn3 = global.vocabN3 || [];
assert(vn3.length > 0, 'vocabN3 should have entries (70 expected)');
vn3.forEach((e, i) => {
  assert(e.id,   `vocabN3[${i}]: missing id`);
  assert(e.word, `vocabN3[${i}] ${e.id}: missing word`);
  if (e.id) assert(e.id.startsWith('vg-n3-'), `vocabN3[${i}]: id ${e.id} wrong prefix`);
});

// ── Vocab N2 (seed data) ──
console.log('── Vocab N2 (seed) ──');
const vn2 = global.vocabN2 || [];
if (vn2.length > 0) {
  vn2.forEach((e, i) => {
    assert(e.id,   `vocabN2[${i}]: missing id`);
    assert(e.word, `vocabN2[${i}] ${e.id}: missing word`);
    if (e.id) assert(e.id.startsWith('vg-n2-'), `vocabN2[${i}]: id ${e.id} wrong prefix`);
  });
} else {
  skip++;
  console.log('  SKIP: vocabN2 empty (seed data not yet populated)');
}

// ── Vocab N1 (seed data) ──
console.log('── Vocab N1 (seed) ──');
const vn1 = global.vocabN1 || [];
if (vn1.length > 0) {
  vn1.forEach((e, i) => {
    assert(e.id,   `vocabN1[${i}]: missing id`);
    assert(e.word, `vocabN1[${i}] ${e.id}: missing word`);
    if (e.id) assert(e.id.startsWith('vg-n1-'), `vocabN1[${i}]: id ${e.id} wrong prefix`);
  });
} else {
  skip++;
  console.log('  SKIP: vocabN1 empty (seed data not yet populated)');
}

// ── Grammar N5 ──
console.log('── Grammar N5 ──');
const gn5 = global.grammarN5 || [];
assert(gn5.length > 0, 'grammarN5 should have entries');
gn5.forEach((e, i) => {
  assert(e.id,      `grammarN5[${i}]: missing id`);
  assert(e.pattern, `grammarN5[${i}] ${e.id}: missing pattern`);
  assert(e.cat,     `grammarN5[${i}] ${e.id}: missing cat`);
  if (e.id) assert(e.id.startsWith('gn5-'), `grammarN5[${i}]: id ${e.id} wrong prefix`);
});

// ── Grammar N4 ──
console.log('── Grammar N4 ──');
const gn4 = global.grammarN4 || [];
assert(gn4.length > 0, 'grammarN4 should have entries');
gn4.forEach((e, i) => {
  assert(e.id,      `grammarN4[${i}]: missing id`);
  assert(e.pattern, `grammarN4[${i}] ${e.id}: missing pattern`);
  assert(e.cat,     `grammarN4[${i}] ${e.id}: missing cat`);
  if (e.id) assert(e.id.startsWith('gn4-'), `grammarN4[${i}]: id ${e.id} wrong prefix`);
});

// ── Grammar N3 ──
console.log('── Grammar N3 ──');
const gn3 = global.grammarN3 || [];
assert(gn3.length > 0, 'grammarN3 should have entries');
gn3.forEach((e, i) => {
  assert(e.id,      `grammarN3[${i}]: missing id`);
  assert(e.pattern, `grammarN3[${i}] ${e.id}: missing pattern`);
  assert(e.cat,     `grammarN3[${i}] ${e.id}: missing cat`);
  if (e.id) assert(e.id.startsWith('gn3-'), `grammarN3[${i}]: id ${e.id} wrong prefix`);
});

// ── Grammar N2 (seed data) ──
console.log('── Grammar N2 (seed) ──');
const gn2 = global.grammarN2 || [];
if (gn2.length > 0) {
  gn2.forEach((e, i) => {
    assert(e.id,      `grammarN2[${i}]: missing id`);
    assert(e.pattern, `grammarN2[${i}] ${e.id}: missing pattern`);
    if (e.id) assert(e.id.startsWith('gn2-'), `grammarN2[${i}]: id ${e.id} wrong prefix`);
  });
} else {
  skip++;
  console.log('  SKIP: grammarN2 empty (seed data not yet populated)');
}

// ── Grammar DB (Architecture v3) ──
console.log('── Grammar DB v3 ──');
const grammarDB = global.grammarDB || global.grammarData || [];
assert(grammarDB.length > 0, 'grammarDB (window.grammarDB) should have entries after grammar-index.js');
assert(grammarDB.length >= 273, `grammarDB count: ${grammarDB.length} (expected ≥273 for N5+N4+N3)`);

// ── VocabDB merge ──
console.log('── VocabDB merge ──');
const vocabDB = global.vocabDB || [];
assert(vocabDB.length >= 1400, `vocabDB merged count: ${vocabDB.length} (expected ≥1400 for N5+N4+N3)`);

// ── Version sync ──
console.log('── Version sync ──');
const vjs = fs.readFileSync(path.join(ROOT, 'public/js/core/version.js'), 'utf8');
const sw  = fs.readFileSync(path.join(ROOT, 'public/sw.js'), 'utf8');
const vMatch  = vjs.match(/APP_VERSION\s*=\s*'(v[\d.]+)'/);
const swMatch = sw.match(/nihongo-(v[\d.]+)/);
assert(vMatch && swMatch, 'Version strings parseable');
if (vMatch && swMatch) {
  assert(vMatch[1] === swMatch[1], `Version sync: version.js=${vMatch[1]} sw.js=${swMatch[1]}`);
}

// ── Duplicate ID check ──
console.log('── Duplicate ID check ──');
function checkDuplicates(arr, label) {
  const ids = arr.filter(e => e.id).map(e => e.id);
  const seen = new Set();
  const dupes = [];
  ids.forEach(id => { if (seen.has(id)) dupes.push(id); seen.add(id); });
  assert(dupes.length === 0,
    `${label}: ${dupes.length} duplicate IDs${dupes.length > 0 ? ' — ' + dupes.slice(0, 5).join(', ') : ''}`);
}
checkDuplicates(vn5, 'vocabN5');
checkDuplicates(vn4, 'vocabN4');
checkDuplicates(vn3, 'vocabN3');
checkDuplicates(gn5, 'grammarN5');
checkDuplicates(gn4, 'grammarN4');
checkDuplicates(gn3, 'grammarN3');

// ── Fallback drills ──
console.log('── Fallback drills ──');
['grammar-drills.json', 'vocab-drills.json'].forEach(filename => {
  const fullPath = path.join(ROOT, 'public/data/fallback', filename);
  if (!fs.existsSync(fullPath)) {
    fail++; console.error(`  FAIL: ${filename} not found at public/data/fallback/`); return;
  }
  let drills;
  try { drills = JSON.parse(fs.readFileSync(fullPath, 'utf8')); }
  catch (e) { fail++; console.error(`  FAIL: ${filename} invalid JSON:`, e.message); return; }

  assert(Array.isArray(drills.items), `${filename}: items must be array`);
  assert(drills.items.length >= 10,   `${filename}: need ≥10 items (got ${drills.items.length})`);
  drills.items.forEach((item, i) => {
    assert(item.id,             `${filename}[${i}]: missing id`);
    assert(item.question,       `${filename}[${i}] ${item.id}: missing question`);
    assert(item.answer,         `${filename}[${i}] ${item.id}: missing answer`);
    assert(item.explanation_id, `${filename}[${i}] ${item.id}: missing explanation_id`);
    assert(Array.isArray(item.options) && item.options.length >= 2,
      `${filename}[${i}] ${item.id}: options must be array with ≥2 items`);
  });
});

// ── Book lens cross-reference integrity (Plan C) ──
console.log('── Book lens cross-reference ──');
loadData('data/books/book-irodori-a1.js');
loadData('data/books/book-irodori-a2-1.js');
loadData('data/books/book-irodori-a2-2.js');
loadData('data/books/book-minna-1.js');
loadData('data/books/book-minna-2.js');

const vocabIdSet = new Set([
  ...(global.vocabN5 || []),
  ...(global.vocabN4 || []),
  ...(global.vocabN3 || []),
  ...(global.vocabN2 || []),
  ...(global.vocabN1 || []),
].map(e => e.id));

const bookLenses = [
  { obj: global.bookIrodoriA1,  name: 'bookIrodoriA1' },
  { obj: global.bookIrodoriA21, name: 'bookIrodoriA21' },
  { obj: global.bookIrodoriA22, name: 'bookIrodoriA22' },
  { obj: global.bookMinna1,     name: 'bookMinna1' },
  { obj: global.bookMinna2,     name: 'bookMinna2' },
];
bookLenses.forEach(({ obj, name }) => {
  if (!obj) { skip++; console.log(`  SKIP: ${name} not loaded`); return; }
  const units = obj.units || obj.chapters || {};
  let broken = 0;
  Object.entries(units).forEach(([unitKey, unit]) => {
    (unit.vocab_ids || []).forEach(id => {
      if (!vocabIdSet.has(id)) {
        broken++;
        if (broken <= 3) console.error(`  FAIL: ${name} unit ${unitKey}: id '${id}' not in vocabDB`);
      }
    });
  });
  if (broken > 3) console.error(`  FAIL: ${name}: ${broken} broken refs total (showing first 3)`);
  assert(broken === 0, `${name}: ${broken} vocab_ids not found in vocabDB`);
});

// ── AI Validator rules (Phase 5.5a §15.2 stage 3) ──
console.log('\n── AI Validator ──');
(function testAIValidator() {
  // Load the module (supports both CJS export and window global)
  const V = require(path.join(ROOT, 'public/js/ai-validator.js'));
  if (!V || typeof V.validateQuizQuestion !== 'function') {
    assert(false, 'ai-validator.js: validateQuizQuestion not exported');
    return;
  }

  // Build a small vocab level index for tests (N5: 食べる, N4: 始める, N3: 実施)
  const vocabLevelIndex = V.buildVocabLevelIndex({
    n5: [{ kanji: '食べる' }, { kanji: '水' }],
    n4: [{ kanji: '始める' }, { kanji: '準備' }],
    n3: [{ kanji: '実施' }],
  });
  assert(vocabLevelIndex.get('食べる') === 'n5', 'validator: index n5 entry');
  assert(vocabLevelIndex.get('実施') === 'n3', 'validator: index n3 entry');

  // ── R1 schema ──
  const okMCQ = {
    id: 'aig-001', type: 'mcq', level: 'n4',
    prompt: '日本に行く___、お金をためている。',
    answer: 'ために',
    choices: ['ために', 'ように', 'ので', 'から'],
  };
  assert(V.validateQuizQuestion(okMCQ, { target: 'ために', level: 'n4' }).pass,
    'validator: well-formed MCQ passes');

  const missingField = { id: 'x', type: 'mcq', level: 'n4', prompt: '...', choices: ['a', 'b'] };
  let r = V.validateQuizQuestion(missingField);
  assert(!r.pass && r.failures.some(f => f.includes('answer')), 'validator: missing answer field fails R1');

  const badType = { ...okMCQ, type: 'essay' };
  r = V.validateQuizQuestion(badType, { target: 'ために', level: 'n4' });
  assert(!r.pass && r.failures.some(f => f.includes('R1')), 'validator: invalid type fails R1');

  // ── R2 target present ──
  const targetMissing = { ...okMCQ, prompt: '水を飲む', answer: 'ので', choices: ['ので', 'から', 'のに', 'ように'] };
  r = V.validateQuizQuestion(targetMissing, { target: 'ために', level: 'n4' });
  assert(!r.pass && r.failures.some(f => f.includes('R2')), 'validator: missing target pattern fails R2');

  // R2 satisfied when target is in answer (common for MCQ)
  const targetInAnswer = { ...okMCQ, prompt: '水を飲む___、コップを買った。', answer: 'ために' };
  r = V.validateQuizQuestion(targetInAnswer, { target: 'ために', level: 'n4' });
  assert(r.pass, 'validator: target-in-answer counts for R2');

  // ── R3 no spoiler ──
  const spoilered = { ...okMCQ, prompt: '答えはために です。なに？', answer: 'ために' };
  r = V.validateQuizQuestion(spoilered, { target: 'ために', level: 'n4' });
  assert(!r.pass && r.failures.some(f => f.includes('R3')), 'validator: answer verbatim in prompt fails R3');

  // Short answers (particle-like) skip R3 to avoid false positives
  const shortAnswerOK = { id: 'x', type: 'mcq', level: 'n5',
    prompt: '私は学校___行く', answer: 'に',
    choices: ['に', 'で', 'を', 'が'] };
  r = V.validateQuizQuestion(shortAnswerOK, { level: 'n5' });
  assert(r.pass, 'validator: short particle answer not flagged as spoiler');

  // ── R4 level leak ──
  const levelLeak = {
    id: 'x', type: 'mcq', level: 'n5',
    prompt: '実施する___、水を飲む。',
    answer: 'ために',
    choices: ['ために', 'ように', 'ので', 'から'],
  };
  r = V.validateQuizQuestion(levelLeak, { target: 'ために', level: 'n5', vocabLevelIndex });
  assert(!r.pass && r.failures.some(f => f.includes('R4')), 'validator: N3 vocab in N5 prompt fails R4');

  // Same prompt at N3 level — should pass R4
  const sameAtN3 = { ...levelLeak, level: 'n3' };
  r = V.validateQuizQuestion(sameAtN3, { target: 'ために', level: 'n3', vocabLevelIndex });
  const hasR4 = r.failures.some(f => f.includes('R4'));
  assert(!hasR4, 'validator: N3 vocab OK at N3 level (no R4)');

  // ── R5 mojibake ──
  assert(V.checkMojibake('normal text') === false, 'validator: plain text is not mojibake');
  assert(V.checkMojibake('日本語') === false, 'validator: Japanese is not mojibake');
  assert(V.checkMojibake('bad\uFFFDchar') === true, 'validator: U+FFFD is mojibake');

  const mojibaked = { ...okMCQ, prompt: 'bad\uFFFDtext' };
  r = V.validateQuizQuestion(mojibaked, { target: 'ために', level: 'n4' });
  assert(!r.pass && r.failures.some(f => f.includes('R5')), 'validator: mojibake in prompt fails R5');

  // ── R6 distractor quality ──
  const dupChoices = { ...okMCQ, choices: ['ために', 'ために', 'ので', 'から'] };
  r = V.validateQuizQuestion(dupChoices, { target: 'ために', level: 'n4' });
  assert(!r.pass && r.failures.some(f => f.includes('R6')), 'validator: duplicate choices fails R6');

  const substrDistractor = {
    ...okMCQ, answer: 'ために',
    choices: ['ために', 'ため', 'ので', 'から'],
  };
  r = V.validateQuizQuestion(substrDistractor, { target: 'ために', level: 'n4' });
  assert(!r.pass && r.failures.some(f => f.includes('R6')), 'validator: substring distractor fails R6');

  // ── R7 answer in choices ──
  const answerMissing = { ...okMCQ, answer: 'のに', choices: ['ために', 'ように', 'ので', 'から'] };
  r = V.validateQuizQuestion(answerMissing, { target: 'ために', level: 'n4' });
  assert(!r.pass && r.failures.some(f => f.includes('R7')), 'validator: answer not in choices fails R7');

  // ── Batch validator ──
  const batch = [okMCQ, targetMissing, spoilered];
  const b = V.validateQuizBatch(batch, { target: 'ために', level: 'n4' });
  assert(b.passing.length === 1, `validator: batch passing count == 1 (got ${b.passing.length})`);
  assert(b.rejected.length === 2, `validator: batch rejected count == 2 (got ${b.rejected.length})`);
  assert(b.rejected[0].failures.length > 0, 'validator: rejected items carry failure reasons');
})();

// ── Sensei persona drift check (Phase 5 §5.6) ──
// Worker SYSTEM_PROMPT and Edge Function MASTER_SYSTEM_PROMPT must stay
// byte-identical. If they drift, Sensei's voice becomes inconsistent across
// providers. Also checks the shared canonical .txt is in sync.
console.log('\n── Sensei persona drift ──');
(function checkPersonaDrift() {
  const workerPath = path.join(ROOT, 'workers/ai-proxy.js');
  const edgePath   = path.join(ROOT, 'supabase/functions/ai-router/index.ts');
  const sharedPath = path.join(ROOT, 'shared/sensei-persona-v2.txt');

  function extractBacktickString(src, marker) {
    const idx = src.indexOf(marker);
    if (idx === -1) return null;
    const start = src.indexOf('`', idx);
    if (start === -1) return null;
    const end = src.indexOf('`', start + 1);
    if (end === -1) return null;
    return src.slice(start + 1, end);
  }

  let workerPrompt = null, edgePrompt = null, sharedPrompt = null;
  try { workerPrompt = extractBacktickString(fs.readFileSync(workerPath, 'utf8'), 'const SYSTEM_PROMPT ='); } catch {}
  try { edgePrompt   = extractBacktickString(fs.readFileSync(edgePath,   'utf8'), 'const MASTER_SYSTEM_PROMPT ='); } catch {}
  try { sharedPrompt = fs.readFileSync(sharedPath, 'utf8'); } catch {}

  assert(workerPrompt && workerPrompt.length > 500, 'workers/ai-proxy.js: SYSTEM_PROMPT not found or too short');
  assert(edgePrompt && edgePrompt.length > 500, 'supabase/functions/ai-router/index.ts: MASTER_SYSTEM_PROMPT not found or too short');

  if (workerPrompt && edgePrompt) {
    if (workerPrompt !== edgePrompt) {
      // Find first differing byte for helpful output
      let firstDiff = -1;
      for (let i = 0; i < Math.max(workerPrompt.length, edgePrompt.length); i++) {
        if (workerPrompt[i] !== edgePrompt[i]) { firstDiff = i; break; }
      }
      console.error(`  FAIL: Sensei persona drift — Worker vs Edge Function differ (worker=${workerPrompt.length}b, edge=${edgePrompt.length}b, first diff at byte ${firstDiff})`);
      if (firstDiff >= 0) {
        const ctx = (s) => JSON.stringify(s.slice(Math.max(0, firstDiff - 20), firstDiff + 20));
        console.error(`        worker: ${ctx(workerPrompt)}`);
        console.error(`        edge:   ${ctx(edgePrompt)}`);
      }
    }
    assert(workerPrompt === edgePrompt, 'Sensei persona: Worker SYSTEM_PROMPT must equal Edge Function MASTER_SYSTEM_PROMPT byte-for-byte (see FRONTEND-OVERHAUL-PLAN.md §5.3/§5.6)');
  }

  // Shared canonical file should match too (trailing newline tolerated — .txt files usually have one)
  if (sharedPrompt && workerPrompt) {
    const normalizedShared = sharedPrompt.replace(/\n$/, '');
    const normalizedWorker = workerPrompt.replace(/\n$/, '');
    assert(normalizedShared === normalizedWorker, 'shared/sensei-persona-v2.txt must match Worker SYSTEM_PROMPT (minus trailing newline)');
  }
})();

// ── Summary ──
console.log(`\n══════════════════════════════════`);
console.log(`  PASS: ${pass}  |  FAIL: ${fail}  |  SKIP: ${skip}`);
console.log(`══════════════════════════════════`);
process.exit(fail > 0 ? 1 : 0);
