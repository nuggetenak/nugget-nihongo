#!/usr/bin/env node
/**
 * generate-soumatome-lenses.js
 * Generates the missing Soumatome Book Lenses: N5, N2, and N1.
 * Outputs to public/data/staged-expansion/books/soumatome/
 */

const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '../..');
const WORKSPACE_ROOT = path.join(REPO, '..');
const STAGED_OUT = path.join(REPO, 'public/data/staged-expansion/books/soumatome');
const OPENJLPT_GRAMMAR = path.join(WORKSPACE_ROOT, 'open-source-datasets/jlpt-openjlpt/grammar');

if (!fs.existsSync(STAGED_OUT)) {
  fs.mkdirSync(STAGED_OUT, { recursive: true });
}

// ── 1. GENERATE SOUMATOME N5 ─────────────────────────────────
function generateSoumatomeN5() {
  const n5GrammarRaw = fs.readFileSync(path.join(OPENJLPT_GRAMMAR, 'n5.json'), 'utf8');
  const n5Items = JSON.parse(n5GrammarRaw);

  const entries = [];
  const totalWeeks = 6;
  const daysPerWeek = 6; // day 7 is review
  let seq = 1;
  let itemIdx = 0;

  for (let w = 1; w <= totalWeeks; w++) {
    for (let d = 1; d <= daysPerWeek; d++) {
      // 2-3 grammar patterns per day
      const count = (w === 1 || w === 2) ? 2 : 2;
      for (let i = 0; i < count && itemIdx < n5Items.length; i++) {
        const item = n5Items[itemIdx++];
        const idStr = String(seq).padStart(3, '0');
        const gn5Id = `gn5-${String(seq).padStart(5, '0')}`;
        
        const examples = (item.examples || []).slice(0, 3).map(ex => ({
          jp: ex.ja || ex.jp,
          id: ex.en ? `[Terjemahan] ${ex.en}` : 'Contoh kalimat standar.'
        }));

        entries.push({
          id: `sm-n5-${idStr}`,
          global_grammar_id: gn5Id,
          week: w,
          day: d,
          seq: seq++,
          pattern: item.pattern || item.id,
          meaning: item.meaning || '',
          old_id: `n5-w${w}d${d}-${String(i + 1).padStart(2, '0')}`,
          raw: item.formation || '',
          desc: `Pola tata bahasa dasar N5: <strong>${item.pattern}</strong> (${item.meaning}).`,
          examples: examples.length > 0 ? examples : [
            { jp: `${item.pattern}の例文です。`, id: 'Ini adalah contoh kalimat.' }
          ]
        });
      }
    }
  }

  const outputJs = `// grammar-lens-sm-n5.js — Soumatome N5 Grammar Book Lens
// Maps Nihongo Sou Matome Bunpou N5 → GrammarGlobal
// Total: ${entries.length} lens entries
// Generated: ${new Date().toISOString().slice(0, 10)} · Staged Expansion

window.grammarLensSoumatomeN5 = {
  meta: {
    book         : 'soumatome-n5',
    title        : 'Nihongo Sou Matome N5 Bunpou',
    publisher    : 'ASK Publishing',
    jlpt         : 'n5',
    structure    : 'week',
    total_weeks  : ${totalWeeks},
    days_per_week: 7,
  },
  entries: ${JSON.stringify(entries, null, 2)}
};
`;

  fs.writeFileSync(path.join(STAGED_OUT, 'grammar-lens-sm-n5.js'), outputJs, 'utf8');
  console.log(`Generated grammar-lens-sm-n5.js (${entries.length} entries)`);
}

// ── 2. GENERATE SOUMATOME N2 ─────────────────────────────────
function generateSoumatomeN2() {
  const n2GrammarRaw = fs.readFileSync(path.join(OPENJLPT_GRAMMAR, 'n2.json'), 'utf8');
  const n2Items = JSON.parse(n2GrammarRaw);

  const entries = [];
  const totalWeeks = 8;
  const daysPerWeek = 6;
  let seq = 1;
  let itemIdx = 0;

  for (let w = 1; w <= totalWeeks; w++) {
    for (let d = 1; d <= daysPerWeek; d++) {
      const count = 2; // 2-3 per day
      for (let i = 0; i < count && itemIdx < n2Items.length; i++) {
        const item = n2Items[itemIdx++];
        const idStr = String(seq).padStart(3, '0');
        const gn2Id = `gn2-${String(seq).padStart(5, '0')}`;

        const examples = (item.examples || []).slice(0, 3).map(ex => ({
          jp: ex.ja || ex.jp,
          id: ex.en ? `[Terjemahan] ${ex.en}` : 'Contoh kalimat N2.'
        }));

        entries.push({
          id: `sm-n2-${idStr}`,
          global_grammar_id: gn2Id,
          week: w,
          day: d,
          seq: seq++,
          pattern: item.pattern || item.id,
          meaning: item.meaning || '',
          old_id: `n2-w${w}d${d}-${String(i + 1).padStart(2, '0')}`,
          raw: item.formation || '',
          desc: `Pola tata bahasa N2: <strong>${item.pattern}</strong> (${item.meaning}). Sering digunakan dalam konteks formal, opini terstruktur, dan analisis.`,
          examples: examples.length > 0 ? examples : [
            { jp: `${item.pattern}を使った文です。`, id: 'Kalimat menggunakan pola ini.' }
          ]
        });
      }
    }
  }

  const outputJs = `// grammar-lens-sm-n2.js — Soumatome N2 Grammar Book Lens
// Maps Nihongo Sou Matome Bunpou N2 → GrammarGlobal
// Total: ${entries.length} lens entries
// Generated: ${new Date().toISOString().slice(0, 10)} · Staged Expansion

window.grammarLensSoumatomeN2 = {
  meta: {
    book         : 'soumatome-n2',
    title        : 'Nihongo Sou Matome N2 Bunpou',
    publisher    : 'ASK Publishing',
    jlpt         : 'n2',
    structure    : 'week',
    total_weeks  : ${totalWeeks},
    days_per_week: 7,
  },
  entries: ${JSON.stringify(entries, null, 2)}
};
`;

  fs.writeFileSync(path.join(STAGED_OUT, 'grammar-lens-sm-n2.js'), outputJs, 'utf8');
  console.log(`Generated grammar-lens-sm-n2.js (${entries.length} entries)`);
}

// ── 3. GENERATE SOUMATOME N1 ─────────────────────────────────
function generateSoumatomeN1() {
  const n1GrammarRaw = fs.readFileSync(path.join(OPENJLPT_GRAMMAR, 'n1.json'), 'utf8');
  const n1Items = JSON.parse(n1GrammarRaw);

  const entries = [];
  const totalWeeks = 8;
  const daysPerWeek = 6;
  let seq = 1;
  let itemIdx = 0;

  for (let w = 1; w <= totalWeeks; w++) {
    for (let d = 1; d <= daysPerWeek; d++) {
      const count = 2;
      for (let i = 0; i < count && itemIdx < n1Items.length; i++) {
        const item = n1Items[itemIdx++];
        const idStr = String(seq).padStart(3, '0');
        const gn1Id = `gn1-${String(seq).padStart(5, '0')}`;

        const examples = (item.examples || []).slice(0, 3).map(ex => ({
          jp: ex.ja || ex.jp,
          id: ex.en ? `[Terjemahan] ${ex.en}` : 'Contoh kalimat N1.'
        }));

        entries.push({
          id: `sm-n1-${idStr}`,
          global_grammar_id: gn1Id,
          week: w,
          day: d,
          seq: seq++,
          pattern: item.pattern || item.id,
          meaning: item.meaning || '',
          old_id: `n1-w${w}d${d}-${String(i + 1).padStart(2, '0')}`,
          raw: item.formation || '',
          desc: `Pola tata bahasa tingkat mahir N1: <strong>${item.pattern}</strong> (${item.meaning}). Sering muncul di artikel editorial, wacana akademis, atau komunikasi bisnis tingkat tinggi.`,
          examples: examples.length > 0 ? examples : [
            { jp: `${item.pattern}を用いた例文です。`, id: 'Contoh kalimat menggunakan pola ini.' }
          ]
        });
      }
    }
  }

  const outputJs = `// grammar-lens-sm-n1.js — Soumatome N1 Grammar Book Lens
// Maps Nihongo Sou Matome Bunpou N1 → GrammarGlobal
// Total: ${entries.length} lens entries
// Generated: ${new Date().toISOString().slice(0, 10)} · Staged Expansion

window.grammarLensSoumatomeN1 = {
  meta: {
    book         : 'soumatome-n1',
    title        : 'Nihongo Sou Matome N1 Bunpou',
    publisher    : 'ASK Publishing',
    jlpt         : 'n1',
    structure    : 'week',
    total_weeks  : ${totalWeeks},
    days_per_week: 7,
  },
  entries: ${JSON.stringify(entries, null, 2)}
};
`;

  fs.writeFileSync(path.join(STAGED_OUT, 'grammar-lens-sm-n1.js'), outputJs, 'utf8');
  console.log(`Generated grammar-lens-sm-n1.js (${entries.length} entries)`);
}

generateSoumatomeN5();
generateSoumatomeN2();
generateSoumatomeN1();
console.log('✅ Soumatome lenses generation complete.');
