#!/usr/bin/env node
// ══════════════════════════════════════════════════════════════
//  test-fallback-integrity.js — Static Fallback Drills Semantic Test
//  Validates C-04 & C-05: 1:1 match between prompt, target, and source_id
// ══════════════════════════════════════════════════════════════

const fs = require('fs');
const path = require('path');

let pass = 0;
let fail = 0;

function assert(cond, msg) {
  if (cond) {
    pass++;
  } else {
    fail++;
    console.error('  FAIL:', msg);
  }
}

console.log('Testing fallback drills semantic integrity (C-04, C-05)...');

const vocabDrillsPath = path.join(__dirname, '..', 'public', 'data', 'fallback', 'vocab-drills.json');
const grammarDrillsPath = path.join(__dirname, '..', 'public', 'data', 'fallback', 'grammar-drills.json');

const vocabData = JSON.parse(fs.readFileSync(vocabDrillsPath, 'utf8'));
const grammarData = JSON.parse(fs.readFileSync(grammarDrillsPath, 'utf8'));

const vocabItems = vocabData.items || vocabData;
const grammarItems = grammarData.items || grammarData;

// 1. Vocab Drills
assert(Array.isArray(vocabItems) && vocabItems.length === 20, `vocab-drills must contain 20 items (got ${vocabItems?.length})`);
vocabItems.forEach((item, idx) => {
  assert(item.id, `Vocab drill [${idx}] missing id`);
  assert(item.source_id && item.source_id.startsWith('vg-'), `Vocab drill [${idx}] ${item.id} invalid source_id: ${item.source_id}`);
  assert(item.target_word, `Vocab drill [${idx}] ${item.id} missing target_word`);
  assert(Array.isArray(item.options) && item.options.length >= 2, `Vocab drill [${idx}] ${item.id} invalid options`);
  assert(item.options.includes(item.answer), `Vocab drill [${idx}] ${item.id} answer "${item.answer}" not in options`);

  // Prompt semantic relevance: target_word or answer must be part of question
  const q = item.question || '';
  assert(q.includes(item.target_word) || q.includes(item.answer),
    `Vocab drill [${idx}] ${item.id} question ("${q}") does not mention target_word "${item.target_word}" or answer "${item.answer}"`);
});

// 2. Grammar Drills
assert(Array.isArray(grammarItems) && grammarItems.length === 20, `grammar-drills must contain 20 items (got ${grammarItems?.length})`);
grammarItems.forEach((item, idx) => {
  assert(item.id, `Grammar drill [${idx}] missing id`);
  assert(item.source_id && item.source_id.startsWith('gn'), `Grammar drill [${idx}] ${item.id} invalid source_id: ${item.source_id}`);
  assert(item.target_pattern, `Grammar drill [${idx}] ${item.id} missing target_pattern`);
  assert(Array.isArray(item.options) && item.options.length >= 2, `Grammar drill [${idx}] ${item.id} invalid options`);
  assert(item.options.includes(item.answer), `Grammar drill [${idx}] ${item.id} answer "${item.answer}" not in options`);

  // Verify question has a slot or context
  const q = item.question || '';
  const hasSlot = q.includes('___') || q.includes('「') || q.includes('(');
  assert(hasSlot, `Grammar drill [${idx}] ${item.id} question must provide context or blank slot`);
});

console.log(`\nFallback Integrity Results: PASS=${pass}, FAIL=${fail}`);
if (fail > 0) {
  process.exit(1);
}
