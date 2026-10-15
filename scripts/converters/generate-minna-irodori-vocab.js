#!/usr/bin/env node
/**
 * generate-minna-irodori-vocab.js
 * Generates structured chapter & unit vocabulary lenses for:
 * - Minna no Nihongo I (Chapters 1-25) & II (Chapters 26-50)
 * - Irodori A1, A2-1, A2-2 (Units 1-18 each)
 * 
 * Outputs to public/data/staged-expansion/books/minna/ and /irodori/
 */

const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '../..');
const STAGED_BOOKS = path.join(REPO, 'public/data/staged-expansion/books');
const MINNA_OUT = path.join(STAGED_BOOKS, 'minna');
const IRODORI_OUT = path.join(STAGED_BOOKS, 'irodori');
const PROD_BOOKS = path.join(REPO, 'public/data/books');

fs.mkdirSync(MINNA_OUT, { recursive: true });
fs.mkdirSync(IRODORI_OUT, { recursive: true });

function parseBookLens(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const sandbox = { window: {} };
  try {
    eval(content.replace(/window\.(\w+)\s*=/, 'sandbox.window.$1 ='));
    const key = Object.keys(sandbox.window)[0];
    return sandbox.window[key];
  } catch (err) {
    console.error(`Error evaluating ${filePath}:`, err.message);
    return null;
  }
}

// ── 1. MINNA NO NIHONGO VOCAB LENSES ─────────────────────────
const mn1 = parseBookLens(path.join(PROD_BOOKS, 'book-minna-1.js'));
if (mn1) {
  const lensObj = {
    meta: {
      book: 'minna-1',
      title: 'Minna no Nihongo Shokyuu I — Vocab Lens',
      chapters: 25,
      jlpt: 'n5'
    },
    chapters: mn1.units
  };
  const js = `// vocab-lens-mn-1.js — Minna no Nihongo I Chapter Vocab Lens
// Total Chapters: 25 | Staged Expansion
window.vocabLensMinna1 = ${JSON.stringify(lensObj, null, 2)};
`;
  fs.writeFileSync(path.join(MINNA_OUT, 'vocab-lens-mn-1.js'), js, 'utf8');
  console.log('Generated vocab-lens-mn-1.js');
}

const mn2 = parseBookLens(path.join(PROD_BOOKS, 'book-minna-2.js'));
if (mn2) {
  const lensObj = {
    meta: {
      book: 'minna-2',
      title: 'Minna no Nihongo Shokyuu II — Vocab Lens',
      chapters: 25,
      jlpt: 'n4'
    },
    chapters: mn2.units
  };
  const js = `// vocab-lens-mn-2.js — Minna no Nihongo II Chapter Vocab Lens
// Total Chapters: 25 (Bab 26-50) | Staged Expansion
window.vocabLensMinna2 = ${JSON.stringify(lensObj, null, 2)};
`;
  fs.writeFileSync(path.join(MINNA_OUT, 'vocab-lens-mn-2.js'), js, 'utf8');
  console.log('Generated vocab-lens-mn-2.js');
}

// ── 2. IRODORI VOCAB LENSES ─────────────────────────────────
const irA1 = parseBookLens(path.join(PROD_BOOKS, 'book-irodori-a1.js'));
if (irA1) {
  const lensObj = {
    meta: {
      book: 'irodori-a1',
      title: 'Irodori Starter A1 — Unit Vocab Lens',
      units: 18,
      jf_level: 'A1',
      jlpt: 'n5'
    },
    units: irA1.units
  };
  const js = `// vocab-lens-ir-a1.js — Irodori Starter A1 Unit Vocab Lens
// Total Units: 18 | Staged Expansion
window.vocabLensIrodoriA1 = ${JSON.stringify(lensObj, null, 2)};
`;
  fs.writeFileSync(path.join(IRODORI_OUT, 'vocab-lens-ir-a1.js'), js, 'utf8');
  console.log('Generated vocab-lens-ir-a1.js');
}

const irA2_1 = parseBookLens(path.join(PROD_BOOKS, 'book-irodori-a2-1.js'));
if (irA2_1) {
  const lensObj = {
    meta: {
      book: 'irodori-a2-1',
      title: 'Irodori Elementary 1 A2-1 — Unit Vocab Lens',
      units: 18,
      jf_level: 'A2-1',
      jlpt: 'n4'
    },
    units: irA2_1.units
  };
  const js = `// vocab-lens-ir-a2-1.js — Irodori Elementary 1 A2-1 Unit Vocab Lens
// Total Units: 18 | Staged Expansion
window.vocabLensIrodoriA2_1 = ${JSON.stringify(lensObj, null, 2)};
`;
  fs.writeFileSync(path.join(IRODORI_OUT, 'vocab-lens-ir-a2-1.js'), js, 'utf8');
  console.log('Generated vocab-lens-ir-a2-1.js');
}

const irA2_2 = parseBookLens(path.join(PROD_BOOKS, 'book-irodori-a2-2.js'));
if (irA2_2) {
  const lensObj = {
    meta: {
      book: 'irodori-a2-2',
      title: 'Irodori Elementary 2 A2-2 — Unit Vocab Lens',
      units: 18,
      jf_level: 'A2-2',
      jlpt: 'n4'
    },
    units: irA2_2.units
  };
  const js = `// vocab-lens-ir-a2-2.js — Irodori Elementary 2 A2-2 Unit Vocab Lens
// Total Units: 18 | Staged Expansion
window.vocabLensIrodoriA2_2 = ${JSON.stringify(lensObj, null, 2)};
`;
  fs.writeFileSync(path.join(IRODORI_OUT, 'vocab-lens-ir-a2-2.js'), js, 'utf8');
  console.log('Generated vocab-lens-ir-a2-2.js');
}

console.log('✅ Minna and Irodori vocab lenses generation complete.');
