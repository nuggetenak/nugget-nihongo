#!/usr/bin/env node
/**
 * merge-staged-into-categories.js
 * Ingests public/data/staged-expansion/vocab/{level}-staged.json into category files
 * in public/data/vocab/{level}/{level}-{cat}.js
 */

const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const VOCAB_DIR = path.join(REPO, 'public/data/vocab');
const STAGED_DIR = path.join(REPO, 'public/data/staged-expansion/vocab');
const LEVELS = ['n5', 'n4', 'n3', 'n2', 'n1'];

function getCategoryForPos(pos) {
  const p = (pos || '').toLowerCase();
  if (p.includes('verb')) return 'verbs';
  if (p.includes('adj')) return 'adjectives';
  if (p.includes('adv')) return 'adverbs';
  if (p.includes('noun') || p.includes('counter')) return 'nouns';
  return 'expressions';
}

function formatEntry(entry, level) {
  // Normalize id: always starts with vg-{level}-
  const normalizedId = entry.id.replace(/^[a-z0-9]+-/, 'vg-');
  
  // Clean examples: remove [TBD]
  let examples = (entry.examples || []).filter(ex => ex && ex.id && !ex.id.includes('[TBD]'));
  if (examples.length === 0 && entry.examples && entry.examples.length > 0) {
    // If only [TBD] existed, provide fallback
    examples = [{
      jp: entry.examples[0].jp,
      id: entry.meaning_id || entry.meaning_en || 'Contoh penggunaan kosakata.',
      level: level,
      tags: ['umum']
    }];
  }

  const obj = {
    id: normalizedId,
    word: entry.word,
    reading: entry.reading || entry.word,
    romaji: entry.romaji || '',
    meaning_id: entry.meaning_id || '',
    meaning_en: entry.meaning_en || '',
    jlpt: level,
    pos: entry.pos || 'noun',
    common: entry.common ?? true,
    related_grammar: entry.related_grammar || [],
    formalitas: entry.formalitas ?? 2,
    domain: entry.domain || ['umum'],
    register: entry.register || 'neutral',
    lawan_bicara: entry.lawan_bicara || ['teman', 'umum'],
    nuance: entry.nuance || '',
    conj_type: entry.conj_type ?? null,
    examples: examples,
    synonyms: entry.synonyms || [],
    antonyms: entry.antonyms || [],
    see_also: entry.see_also || [],
    added_v: 'v19.3.1-staged-merge',
    provenance: 'expansion-staged',
    jmdict_seq: entry.jmdict_seq || '',
    frequency: entry.frequency || 1000,
  };

  if (entry.forms) obj.forms = entry.forms;
  if (entry.meanings) obj.meanings = entry.meanings;
  if (entry.conjugations) obj.conjugations = entry.conjugations;

  return JSON.stringify(obj, null, 2);
}

for (const level of LEVELS) {
  const stagedFile = path.join(STAGED_DIR, `${level}-staged.json`);
  if (!fs.existsSync(stagedFile)) {
    console.log(`⚠️ No staged file for ${level}`);
    continue;
  }

  const stagedData = JSON.parse(fs.readFileSync(stagedFile, 'utf8'));
  const levelDir = path.join(VOCAB_DIR, level);
  if (!fs.existsSync(levelDir)) fs.mkdirSync(levelDir, { recursive: true });

  // Group staged items by category
  const grouped = {
    verbs: [],
    adjectives: [],
    adverbs: [],
    nouns: [],
    expressions: []
  };

  for (const item of stagedData) {
    const cat = getCategoryForPos(item.pos);
    grouped[cat].push(item);
  }

  console.log(`\n── Merging ${level} (${stagedData.length} staged entries) ──`);
  for (const cat of ['verbs', 'adjectives', 'adverbs', 'nouns', 'expressions']) {
    const items = grouped[cat];
    if (items.length === 0) continue;

    const catFile = path.join(levelDir, `${level}-${cat}.js`);
    let content = '';
    const varName = `window.vocab${level.toUpperCase()}_${cat.charAt(0).toUpperCase() + cat.slice(1)}`;

    if (fs.existsSync(catFile)) {
      content = fs.readFileSync(catFile, 'utf8');
      // Find closing array bracket
      const lastBracket = content.lastIndexOf(']');
      if (lastBracket !== -1) {
        const before = content.slice(0, lastBracket).trimEnd();
        const needsComma = !before.endsWith(',');
        const formattedItems = items.map(it => formatEntry(it, level)).join(',\n\n');
        content = `${before}${needsComma ? ',' : ''}\n\n// ── Staged Expansion (${items.length}) ──\n\n${formattedItems}\n\n];\n`;
      }
    } else {
      // New category file
      const formattedItems = items.map(it => formatEntry(it, level)).join(',\n\n');
      content = `// ────────────────────────────────────────────────────────────
//  ${level}-${cat}.js — Nugget Nihongo · JLPT ${level.toUpperCase()} · ${cat.toUpperCase()}
//  ${items.length} entries | Staged expansion
// ────────────────────────────────────────────────────────────

${varName} = [

${formattedItems}

];
`;
    }

    fs.writeFileSync(catFile, content, 'utf8');
    console.log(`  + ${level}-${cat}.js: added ${items.length} entries`);
  }
}

console.log('\nStaged expansion merged into category files.');
