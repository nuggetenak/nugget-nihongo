/**
 * audit_enriched_chunks.js — Quality audit of AI-enriched vocabulary chunks.
 * 
 * Inspects all `scratch/enriched_vocab_chunk_*.json` files.
 * Verifies schema conformance, Indonesian translation completeness,
 * and surfaces confidence flags for user review.
 */
const fs = require('fs');
const path = require('path');

const SCRATCH = path.join(__dirname, '../scratch');
const files = fs.readdirSync(SCRATCH).filter(f => f.startsWith('enriched_vocab_chunk_') && f.endsWith('.json'));

files.sort((a, b) => {
  const numA = parseInt(a.match(/\d+/)[0]);
  const numB = parseInt(b.match(/\d+/)[0]);
  return numA - numB;
});

console.log(`Auditing ${files.length} enriched chunk file(s)...\n`);

let totalWords = 0;
let totalConfidence = { high: 0, medium: 0, low: 0, missing: 0 };
let flaggedWords = [];
let errors = [];

for (const f of files) {
  const filePath = path.join(SCRATCH, f);
  let data;
  try {
    data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (err) {
    errors.push(`[JSON_PARSE_ERROR] ${f}: ${err.message}`);
    continue;
  }

  if (!Array.isArray(data)) {
    errors.push(`[NOT_ARRAY] ${f}: Expected array`);
    continue;
  }

  totalWords += data.length;

  data.forEach((entry, idx) => {
    const id = entry.id || `UNKNOWN in ${f}[${idx}]`;
    const word = entry.word || entry.reading || 'UNKNOWN';

    // Required schema checks
    if (!entry.id) errors.push(`[MISSING_ID] ${f}[${idx}]`);
    if (!entry.word) errors.push(`[MISSING_WORD] ${id}`);
    if (!entry.reading) errors.push(`[MISSING_READING] ${id}`);
    if (!entry.meaning_id || entry.meaning_id.trim() === '' || entry.meaning_id === '[TBD]') {
      errors.push(`[MISSING_MEANING_ID] ${id} (${word})`);
    }
    if (!entry.meaning_en) errors.push(`[MISSING_MEANING_EN] ${id} (${word})`);
    if (!entry.pos) errors.push(`[MISSING_POS] ${id} (${word})`);
    if (!entry.nuance) errors.push(`[MISSING_NUANCE] ${id} (${word})`);
    if (!Array.isArray(entry.examples) || entry.examples.length === 0) {
      errors.push(`[MISSING_EXAMPLES] ${id} (${word})`);
    } else {
      entry.examples.forEach((ex, exIdx) => {
        if (!ex.jp) errors.push(`[MISSING_EX_JP] ${id} example[${exIdx}]`);
        if (!ex.id) errors.push(`[MISSING_EX_ID] ${id} example[${exIdx}]`);
      });
    }

    // Audit metadata check
    const audit = entry._audit || {};
    const conf = audit.confidence || 'missing';
    if (totalConfidence[conf] !== undefined) {
      totalConfidence[conf]++;
    } else {
      totalConfidence.missing++;
    }

    if (conf === 'low' || audit.needs_review || (audit.review_notes && audit.review_notes.trim())) {
      flaggedWords.push({
        id,
        word,
        reading: entry.reading,
        meaning_id: entry.meaning_id,
        meaning_en: entry.meaning_en,
        confidence: conf,
        notes: audit.review_notes || 'Low confidence flag'
      });
    }
  });
}

console.log('══════════════════════════════════════════════════════');
console.log(`  VOCABULARY AUDIT REPORT`);
console.log('══════════════════════════════════════════════════════');
console.log(`Chunks evaluated:   ${files.length}`);
console.log(`Total words:        ${totalWords}`);
console.log(`High confidence:    ${totalConfidence.high}`);
console.log(`Medium confidence:  ${totalConfidence.medium}`);
console.log(`Low confidence:     ${totalConfidence.low}`);
if (totalConfidence.missing > 0) {
  console.log(`Missing audit flag: ${totalConfidence.missing}`);
}

if (errors.length > 0) {
  console.log(`\n❌ Found ${errors.length} schema / content error(s):`);
  errors.slice(0, 20).forEach(e => console.log('  ' + e));
  if (errors.length > 20) console.log(`  ... and ${errors.length - 20} more`);
} else {
  console.log(`\n✅ Zero schema / formatting errors across all entries!`);
}

if (flaggedWords.length > 0) {
  console.log(`\n⚠️  Flagged for human/pedagogical review (${flaggedWords.length} words):`);
  flaggedWords.forEach(w => {
    console.log(`  • [${w.id}] ${w.word} (${w.reading}): "${w.meaning_id}" — ${w.notes} (conf: ${w.confidence})`);
  });
} else {
  console.log(`\n✨ No items flagged for low confidence.`);
}
console.log('══════════════════════════════════════════════════════');
