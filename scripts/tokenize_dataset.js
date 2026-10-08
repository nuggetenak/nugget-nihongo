#!/usr/bin/env node
// ══════════════════════════════════════════════════════════════════
//  tokenize_dataset.js — Nugget Nihongo Dataset Tokenization & SLA Audit
//  Audits example sentences in vocabDB and grammarDB using LexiconEngine
// ══════════════════════════════════════════════════════════════════

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

// Minimal Browser Simulation
global.window = global;
global.document = {
  addEventListener: () => {},
  createElement: () => ({ appendChild: () => {}, setAttribute: () => {}, style: {}, classList: { add: () => {}, remove: () => {} } }),
  body: { appendChild: () => {} },
  getElementById: () => null
};

function loadScript(relPath) {
  const full = path.join(ROOT, 'public', relPath);
  const code = fs.readFileSync(full, 'utf8');
  eval(code);
}

console.log('📚 Nugget Nihongo Dataset Tokenization & SLA Audit Pipeline\n');

// 1. Load Data & Engines
console.log('1. Loading datasets and engines...');
loadScript('data/vocab/vocab-n5.js');
loadScript('data/vocab/vocab-n4.js');
loadScript('data/vocab/vocab-n3.js');
loadScript('data/vocab/vocab-n2.js');
loadScript('data/vocab/vocab-n1.js');
loadScript('data/grammar/grammar-n5.js');
loadScript('data/grammar/grammar-n4.js');
loadScript('data/grammar/grammar-n3.js');
loadScript('data/grammar/grammar-n2.js');
loadScript('data/grammar/grammar-n1.js');
loadScript('data/books/book-minna-1.js');
loadScript('data/books/book-minna-2.js');
loadScript('data/books/book-irodori-a1.js');
loadScript('data/books/book-irodori-a2-1.js');
loadScript('data/books/book-irodori-a2-2.js');
loadScript('data/books/sources.js');
loadScript('data/vocab/vocab-index.js');
loadScript('data/grammar/grammar-index.js');
loadScript('js/conjugation-engine.js');
loadScript('js/particle-engine.js');
loadScript('js/lexicon-engine.js');

const Lexicon = window.LexiconEngine;
Lexicon.init();

console.log(`Loaded: ${window.vocabDB.length} vocab, ${window.grammarDB.length} grammar patterns.`);

// 2. Audit Sentences
console.log('\n2. Auditing sentences across Vocab & Grammar databases...');

let totalSentences = 0;
let totalTokens = 0;
let typeCounts = {
  vocab: 0,
  inflection: 0,
  particle: 0,
  combined_particle: 0,
  grammar: 0,
  punct: 0,
  text: 0
};
let transIntransFound = 0;
let collocationTipsMatched = 0;

function auditSentence(jpText) {
  if (!jpText || typeof jpText !== 'string') return;
  totalSentences++;

  const tokens = Lexicon.segment(jpText);
  totalTokens += tokens.length;

  for (const t of tokens) {
    if (typeCounts[t.type] !== undefined) {
      typeCounts[t.type]++;
    } else {
      typeCounts[t.type] = 1;
    }

    if (t.type === 'vocab' || t.type === 'inflection') {
      const info = Lexicon.lookup(t.text, jpText);
      if (info && info.sla_nuance) {
        if (info.sla_nuance.includes('Transitif')) transIntransFound++;
        if (info.sla_nuance.includes('Kolokasi Partikel Wajib')) collocationTipsMatched++;
      }
    }
  }
}

// Audit Vocab Examples
for (const v of window.vocabDB) {
  if (v.examples && Array.isArray(v.examples)) {
    for (const ex of v.examples) {
      if (ex && ex.jp) auditSentence(ex.jp);
    }
  }
}

// Audit Grammar Examples
for (const g of window.grammarDB) {
  if (g.examples && Array.isArray(g.examples)) {
    for (const ex of g.examples) {
      if (typeof ex === 'string') auditSentence(ex);
      else if (ex && ex.jp) auditSentence(ex.jp);
    }
  }
}

// 3. Summary Report
console.log('\n════════════════════════════════════════════════════');
console.log('  DATASET TOKENIZATION & SLA AUDIT REPORT');
console.log('════════════════════════════════════════════════════');
console.log(`Total Sentences Audited : ${totalSentences.toLocaleString()}`);
console.log(`Total Morpheme Tokens   : ${totalTokens.toLocaleString()}`);
console.log('----------------------------------------------------');
console.log(`  • Vocab Words         : ${typeCounts.vocab.toLocaleString()}`);
console.log(`  • Inflected Verbs/Adj : ${typeCounts.inflection.toLocaleString()} (De-conjugated)`);
console.log(`  • Single Particles    : ${typeCounts.particle.toLocaleString()}`);
console.log(`  • Combined Particles  : ${typeCounts.combined_particle.toLocaleString()} (Kasane-joshi)`);
console.log(`  • Grammar Patterns    : ${typeCounts.grammar.toLocaleString()} (Compound/Idiomatic)`);
console.log(`  • Punctuation         : ${typeCounts.punct.toLocaleString()}`);
console.log(`  • Other/Unclassified  : ${typeCounts.text.toLocaleString()}`);
console.log('----------------------------------------------------');
const knownMorphemes = totalTokens - typeCounts.punct - typeCounts.text;
const recognizedTotal = totalTokens - typeCounts.punct;
const coveragePct = recognizedTotal > 0 ? ((knownMorphemes / recognizedTotal) * 100).toFixed(2) : 100;
console.log(`SLA Morpheme Recognition Rate : ${coveragePct}%`);
console.log(`Transitive/Intransitive Cues   : ${transIntransFound.toLocaleString()} instances matched`);
console.log(`Collocation Traps Monitored    : ${collocationTipsMatched.toLocaleString()} instances matched`);
console.log('════════════════════════════════════════════════════\n');

// 4. Sample Tokenization Showcase
console.log('Sample Interactive Tokenization:');
const sampleSentence = '日本の文化について話します。友達に手紙を書きました。';
console.log(`Original: "${sampleSentence}"`);
const sampleTokens = Lexicon.segment(sampleSentence);
console.log('Parsed Morphemes:');
sampleTokens.forEach(t => {
  if (t.type !== 'punct') {
    const lookup = Lexicon.lookup(t.text, sampleSentence);
    const meaning = lookup ? (lookup.meaning_id || lookup.explanation || '').slice(0, 30) : '';
    console.log(`  • [${t.type.toUpperCase().padEnd(17)}] "${t.text}" ${t.rootWord ? `(from ${t.rootWord})` : ''} -> ${meaning}`);
  }
});
console.log('\nInteractive HTML:');
console.log(Lexicon.renderInteractive(sampleSentence));
console.log('\n✅ Pipeline audit completed successfully.');
