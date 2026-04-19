#!/usr/bin/env node
// ══════════════════════════════════════════════════════════════════════════
// Nugget Nihongo — Quality Checker v4  (tests/quality.js)
//
// Run:
//   node tests/quality.js                  Full report
//   node tests/quality.js --new-only       Skip pre-v15 legacy debt
//   node tests/quality.js --errors-only    Hide WARN/INFO
//   node tests/quality.js --legacy         Expand legacy issue list
//   node tests/quality.js --level n3       Only check one JLPT level
//   node tests/quality.js --json           Machine-readable JSON output
//   node tests/quality.js --fix            Auto-fix scriptable issues in-place
//   node tests/quality.js --summary        One-line per file overview only
//
// Tiers:
//   CRIT    App-breaking — must fix immediately
//   ERROR   Schema violation — blocks merge
//   LEGACY  Pre-v15 debt — tracked separately, not blocking
//   WARN    Content quality — review queue
//   INFO    Coverage stats / distribution
//
// Exit: 0 = no blockers, 1 = CRIT or ERROR found
// ══════════════════════════════════════════════════════════════════════════
'use strict';
const fs   = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');

// ── Flags ─────────────────────────────────────────────────────────────────
const args       = process.argv.slice(2);
const NEW_ONLY   = args.includes('--new-only');
const ERRORS_ONLY= args.includes('--errors-only');
const SHOW_LEGACY= args.includes('--legacy');
const JSON_OUT   = args.includes('--json');
const FIX_MODE   = args.includes('--fix');
const SUMMARY    = args.includes('--summary');
const LEVEL_FILTER = (() => { const i = args.indexOf('--level'); return i>=0 ? args[i+1] : null; })();

// ── Issue buckets ──────────────────────────────────────────────────────────
const crits=[], errors=[], legacy=[], warns=[], infos=[];
const fixLog=[];  // what --fix changed
function crit(c,id,m){ crits.push({code:c,id,msg:m}); }
function err (c,id,m){ errors.push({code:c,id,msg:m}); }
function leg (c,id,m){ legacy.push({code:c,id,msg:m}); }
function warn(c,id,m){ warns.push({code:c,id,msg:m}); }
function info(c,m)   { infos.push({code:c,msg:m}); }

// ── Loader ─────────────────────────────────────────────────────────────────
global.window = global;
function loadFile(relPath) {
  const full = path.join(ROOT, 'public', relPath);
  if (!fs.existsSync(full)) return false;
  try { eval(fs.readFileSync(full, 'utf8')); return true; }
  catch(e) { crit('LOAD_FAIL', relPath, e.message.split('\n')[0]); return false; }
}

// ── Canonical value sets ───────────────────────────────────────────────────
// POS: canonical short-form values used in current data
const VALID_POS = new Set([
  'verb-u','verb-ru','verb-suru','verb-kuru','verb-aru','verb-irr',
  'verb-potential-lexical',
  'i-adj','na-adj','no-adj','pre-noun-adj',
  'noun','noun-suru','noun-temporal','noun-formal','proper-noun',
  'pronoun','counter','numeral',
  'adverb','adverb-degree','adverb-frequency','adverb-manner',
  'adverb-conjunctive','adverb-sentence',
  'particle','particle-case','particle-topic','particle-conj',
  'particle-final','particle-compound',
  'conjunction','conj-coord','conj-adversative','conj-causal','conj-temporal',
  'expression','expr-greeting','expr-set','expr-onomatopoeia',
  'interjection','suffix-honorific','suffix-nominal','prefix-honorific',
  'prefix','suffix',
]);
// Legacy POS values → their canonical replacement (triggers WARN not ERROR)
const LEGACY_POS = {
  'adjective-i':'i-adj', 'adjective-na':'na-adj',
  'adverb-degree':'adverb', 'conj-temporal':'conjunction',
};

// CAT: locked canonical list (Taxonomy v2 B.1) — synced with run.js
const VALID_CAT = new Set([
  'adverb','causative','comparison','completion-regret','conditional-tara',
  'conjecture-possibility','contrast-concession','copula','desire-want',
  'existence','expression','extent-degree','hearsay-report',
  'inception-continuation','interrogative','listing-addition','negative',
  'nominalization','obligation-necessity','particle','passive','past-tense',
  'permission-prohibition','potential','predicate-adjective','progressive-state',
  'purpose','quotation-thought','reason-cause','sentence-final-modality',
  'sentence-final-request','sequential-temporal','te-form-use',
  'teineigo-pattern','verb-form','volitional-intention',
]);
// Retired CAT values → canonical replacement
const LEGACY_CAT = {
  'conditional-nara':'conditional-tara','conditional-ba':'conditional-tara',
  'limitation-only':'extent-degree','directional-aspect':'verb-form',
  'relative-clause':'nominalization','sonkeigo-pattern':'teineigo-pattern',
  'kenjougo-pattern':'teineigo-pattern','conditional-to':'conditional-tara',
  'kondisional':'conditional-tara','penyangkalan':'negative',
  'keharusan':'obligation-necessity','temporal':'sequential-temporal',
  'frekuensi':'adverb','keputusan':'volitional-intention',
  'niat':'volitional-intention','perubahan':'inception-continuation',
  'tujuan':'purpose','bersamaan':'sequential-temporal',
  'cara':'verb-form','konsesi':'contrast-concession',
  'kontras':'contrast-concession','pembatasan':'extent-degree',
  'penekanan':'sentence-final-modality','perasaan':'sentence-final-modality',
  'perbandingan':'comparison','referensi':'quotation-thought',
  'rentang':'extent-degree','waktu':'sequential-temporal',
  'enumerasi':'listing-addition','dugaan':'conjecture-possibility',
  'kemungkinan':'conjecture-possibility','logika':'reason-cause',
  'kebiasaan':'progressive-state',
};

const VALID_DOMAIN = new Set([
  'kehidupan-sehari','kehidupan',  // kehidupan = alias for kehidupan-sehari
  'keluarga','pertemanan','percintaan','pendidikan',
  'pekerjaan','kerja',             // kerja = alias
  'bisnis','perjalanan','belanja','kesehatan','makanan-minuman',
  'olahraga','hiburan','teknologi','alam-lingkungan','alam','budaya',
  'bahasa-komunikasi','komunikasi', // komunikasi = alias
  'emosi','emosi-positif','emosi-negatif','emosi-sosial',
  'pikiran-opini','keputusan','karakter','kepribadian', // kepribadian = alias for karakter
  'waktu','ruang-arah','kuantitas','kualitas',
  'deskripsi',                     // descriptive alias
  'perubahan','hubungan-konsep','hubungan', // hubungan = alias
  'sebab-akibat','sopan-santun','keigo-vocabulary',
  'hukum-aturan','politik-masyarakat','sosial','ekonomi-keuangan','ekonomi',
  'ilmu-pengetahuan','seni-budaya','sastra','media',
  'umum','onomatope','konsep-jepang','klasik',
  'aksi','gerakan','kejadian',     // action/movement aliases
  'logika','motivasi',             // logical/motivational aliases
  'politik',
  'cara','kontras','konfirmasi','derajat','ekspresi',  // grammatical-domain aliases
  'kondisional','penekanan','pembatasan',
]);

const VALID_REGISTER = new Set(['formal','neutral','casual','written','spoken','literary',null,undefined]);
const VALID_CONJ     = new Set(['godan','ichidan','suru','kuru','adj-i','adj-na',null,undefined]);
const POS_CONJ = { 'verb-ru':'ichidan','verb-u':'godan','verb-suru':'suru','verb-kuru':'kuru','i-adj':'adj-i','na-adj':'adj-na' };

// Content heuristics
const NUANCE_MARKERS = ['berbeda','dibanding','sering','tidak','lebih','hanya','konteks',
  'formal','kasual','transitif','intransitif','pasangan','konotasi','beda','umumnya',
  'biasanya','khusus','hindari','jangan','walaupun','meskipun','sedangkan','lawan',
  'kebalikan','sinonim','berlawanan','dibandingkan','cenderung','digunakan','cocok',
  'hati-hati','bukan','tidak bisa','tidak dipakai','catatan','perlu'];
const ENGLISH_LEAK = [/\bthe\b/i,/\bof\b/i,/\band\b/i,/\bor\b/i,/\bare\b/i,
  /\bwas\b/i,/\bwere\b/i,/\bhave\b/i,/\bhas\b/i,/\bwith\b/i,/\bthat\b/i,
  /\bfrom\b/i,/\bcan\b/i,/\bnot\b/i];
const CJK  = /[\u3000-\u9fff\uf900-\ufaff\u3400-\u4dbf]/;
const HIRA = /[\u3041-\u3096]/;
const KATA = /[\u30a1-\u30f6]/;
const KANJI= /[\u4e00-\u9fff\u3400-\u4dbf]/;
const LATIN= /^[a-z\u00c0-\u024f\s\-'.,~:;!?()[\]0-9\/]+$/i;

// ── File lists ─────────────────────────────────────────────────────────────
const VOCAB_FILES = [
  ['data/vocab/vocab-n5.js','vocabN5','n5','vg-n5-'],
  ['data/vocab/vocab-n4.js','vocabN4','n4','vg-n4-'],
  ['data/vocab/vocab-n3.js','vocabN3','n3','vg-n3-'],
  ['data/vocab/vocab-n2.js','vocabN2','n2','vg-n2-'],
  ['data/vocab/vocab-n1.js','vocabN1','n1','vg-n1-'],
];
const GRAMMAR_FILES = [
  ['data/grammar/grammar-n5.js','grammarN5','n5','gn5-'],
  ['data/grammar/grammar-n4.js','grammarN4','n4','gn4-'],
  ['data/grammar/grammar-n3.js','grammarN3','n3','gn3-'],
  ['data/grammar/grammar-n2.js','grammarN2','n2','gn2-'],
  ['data/grammar/grammar-n1.js','grammarN1','n1','gn1-'],
];
const BOOK_FILES = [
  ['data/books/book-irodori-a1.js',  'bookIrodoriA1'],
  ['data/books/book-irodori-a2-1.js','bookIrodoriA21'],
  ['data/books/book-irodori-a2-2.js','bookIrodoriA22'],
  ['data/books/book-minna-1.js',     'bookMinna1'],
  ['data/books/book-minna-2.js',     'bookMinna2'],
];

for (const [f] of [...VOCAB_FILES,...GRAMMAR_FILES,...BOOK_FILES]) loadFile(f);

// ── Lookup maps ────────────────────────────────────────────────────────────
const vocabById   = new Map();
const grammarById = new Map();
for (const [,v] of VOCAB_FILES)   for (const e of (global[v]||[])) if(e?.id) vocabById.set(e.id,e);
for (const [,v] of GRAMMAR_FILES) for (const e of (global[v]||[])) if(e?.id) grammarById.set(e.id,e);

// ── --fix: load raw JS files for in-place editing ──────────────────────────
const fixableFiles = {};  // path → content string
function fixInFile(filePath, oldStr, newStr, reason) {
  if (!fixableFiles[filePath]) {
    const full = path.join(ROOT, 'public', filePath);
    if (fs.existsSync(full)) fixableFiles[filePath] = fs.readFileSync(full, 'utf8');
  }
  if (fixableFiles[filePath] && fixableFiles[filePath].includes(oldStr)) {
    fixableFiles[filePath] = fixableFiles[filePath].replaceAll(oldStr, newStr);
    fixLog.push(`${filePath}: ${reason}`);
    return true;
  }
  return false;
}

// ── Dedup trackers ─────────────────────────────────────────────────────────
const wordLevelMap   = new Map();
const patternLevelMap= new Map();
const nuanceSeen     = new Map();
const exJpSeen       = new Map();
const meaningIdSeen  = new Map();
const seenVocabIds   = new Set();
const seenGrammarIds = new Set();
const cpMap          = new Map();

// ── Level stats ────────────────────────────────────────────────────────────
const lStats = {};
for (const lv of ['n5','n4','n3','n2','n1'])
  lStats[lv] = { v:{total:0,f2:0,umum:0,noGramRef:0,noEx:0}, g:{total:0,cpEmpty:0,svEmpty:0} };

// ══════════════════════════════════════════════════════════════════════════
// VOCAB PASS
// ══════════════════════════════════════════════════════════════════════════
for (const [filePath, varName, level, prefix] of VOCAB_FILES) {
  if (LEVEL_FILTER && level !== LEVEL_FILTER) continue;
  const entries = global[varName] || [];
  const nums = [];

  for (const e of entries) {
    if (!e || typeof e !== 'object') continue;
    const isLeg = !e.added_v || e.added_v !== 'v15';
    if (NEW_ONLY && isLeg) continue;
    const issue = isLeg ? leg : err;
    const id = String(e.id || '');

    // ── ID integrity ──
    if (!id) { crit('MISSING_ID', varName, 'Entry missing id'); continue; }
    if (!id.startsWith(prefix) || !/^\d{5}$/.test(id.slice(prefix.length)))
      crit('BAD_ID_FORMAT', id, `Expected ${prefix}NNNNN`);
    if (seenVocabIds.has(id)) crit('DUP_VOCAB_ID', id, 'Duplicate vocab ID across all levels');
    seenVocabIds.add(id);
    nums.push(parseInt(id.slice(prefix.length), 10));

    // ── Cross-level word duplicate ──
    const word = String(e.word || '');
    if (word) {
      if (wordLevelMap.has(word) && wordLevelMap.get(word).level !== level)
        warn('CROSSLEVEL_DUP_WORD', id,
          `'${word}' also in ${wordLevelMap.get(word).level} (${wordLevelMap.get(word).id})`);
      else if (!wordLevelMap.has(word)) wordLevelMap.set(word, {id,level});
    }

    // ── jlpt field ──
    if (e.jlpt && e.jlpt !== level) issue('JLPT_MISMATCH', id, `entry.jlpt='${e.jlpt}' but file is ${level}`);

    // ── POS ──
    if (e.pos !== undefined) {
      if (LEGACY_POS[e.pos]) {
        warn('LEGACY_POS', id, `pos='${e.pos}' → should be '${LEGACY_POS[e.pos]}'`);
        if (FIX_MODE) {
          fixInFile(filePath, `"pos": "${e.pos}"`, `"pos": "${LEGACY_POS[e.pos]}"`, `pos ${e.pos}→${LEGACY_POS[e.pos]} on ${id}`);
          fixInFile(filePath, `'pos': '${e.pos}'`, `'pos': '${LEGACY_POS[e.pos]}'`, `pos ${e.pos}→${LEGACY_POS[e.pos]} on ${id}`);
        }
      } else if (!VALID_POS.has(e.pos)) {
        issue('INVALID_POS', id, `pos='${e.pos}'`);
      } else if (!isLeg) {
        const expConj = POS_CONJ[e.pos];
        if (expConj !== undefined && e.conj_type !== expConj && e.conj_type !== null)
          warn('CONJ_TYPE_MISMATCH', id, `pos='${e.pos}' expects conj_type='${expConj}' got '${e.conj_type}'`);
        if (expConj !== undefined && e.conj_type === null)
          warn('CONJ_TYPE_NULL', id, `pos='${e.pos}' should have conj_type set`);
      }
    }

    // ── Domain ──
    for (const d of (e.domain || []))
      if (!VALID_DOMAIN.has(d)) issue('INVALID_DOMAIN', id, `domain='${d}'`);

    // ── Register ──
    if ('register' in e && !VALID_REGISTER.has(e.register))
      issue('INVALID_REGISTER', id, `register='${e.register}'`);

    // ── Formalitas ──
    const fv = e.formalitas;
    if (fv === undefined || fv === null || typeof fv !== 'number' || fv < 1 || fv > 5)
      issue('INVALID_FORMALITAS', id, `formalitas=${JSON.stringify(fv)} (must be 1–5)`);
    else {
      if (fv === 2) lStats[level].v.f2++;
      if (!isLeg && e.register === 'formal' && fv <= 2)
        warn('FORMALITAS_REGISTER_MISMATCH', id, `register='formal' but formalitas=${fv}`);
      if (!isLeg && e.register === 'casual' && fv >= 4)
        warn('FORMALITAS_REGISTER_MISMATCH', id, `register='casual' but formalitas=${fv}`);
    }

    if ('common' in e && typeof e.common !== 'boolean') issue('INVALID_COMMON', id, 'common must be boolean');

    // ── Required fields ──
    const REQ_V15 = ['word','reading','romaji','meaning_id','jlpt','pos','common',
      'formalitas','domain','register','nuance','conj_type','examples'];
    const REQ_ANY = ['id','word','jlpt','meaning_id'];
    for (const f of (isLeg ? REQ_ANY : REQ_V15))
      if (!(f in e)) issue('MISSING_FIELD', id, `Missing '${f}'`);

    // ── Word / Reading / Romaji ──
    if (!word || word.trim().length === 0) err('EMPTY_WORD', id, 'word is empty');
    if (e.reading !== undefined && e.reading !== null) {
      const r = String(e.reading);
      if (!r.trim()) err('EMPTY_READING', id, 'reading is empty');
      if (KANJI.test(r)) issue('READING_HAS_KANJI', id, `reading '${r}' contains kanji`);
      if (!HIRA.test(r) && !KATA.test(r)) warn('READING_NO_KANA', id, `reading '${r}' has no kana`);
    }
    if (e.romaji !== undefined && e.romaji !== null) {
      const rom = String(e.romaji);
      if (!rom.trim()) err('EMPTY_ROMAJI', id, 'romaji is empty');
      if (!LATIN.test(rom)) warn('ROMAJI_NON_LATIN', id, `romaji '${rom}' has non-Latin`);
      if (rom !== rom.toLowerCase()) warn('ROMAJI_UPPERCASE', id, `romaji '${rom}' has uppercase`);
    }

    // ── meaning_id ──
    const mid = String(e.meaning_id || '');
    if (!mid.trim()) { issue('EMPTY_MEANING_ID', id, 'meaning_id is empty'); }
    else {
      if (CJK.test(mid) || HIRA.test(mid) || KATA.test(mid)) {
        err('MEANING_ID_HAS_JAPANESE', id, `meaning_id has Japanese: '${mid.slice(0,50)}'`);
        if (FIX_MODE) {
          // Strip Japanese characters and parenthetical clauses containing them
          const cleaned = mid
            .replace(/\s*[\(（][^\)）]*[\u3000-\u9fff\u3040-\u309f\u30a0-\u30ff][^\)）]*[\)）]/g, '')
            .replace(/[\u3000-\u9fff\u3040-\u309f\u30a0-\u30ff]+/g, '')
            .replace(/\s+/g, ' ').trim();
          if (cleaned && cleaned !== mid) {
            const oldStr = `"meaning_id": "${mid}"`;
            const newStr = `"meaning_id": "${cleaned}"`;
            fixInFile(filePath, oldStr, newStr, `meaning_id Japanese stripped on ${id}: '${mid}' → '${cleaned}'`);
          }
        }
      }
      if (e.meaning_en && mid === e.meaning_en)
        err('MEANING_ID_EQ_EN', id, 'meaning_id === meaning_en (copy-paste error)');
      for (const re of ENGLISH_LEAK)
        if (re.test(mid)) { warn('ENGLISH_IN_MEANING_ID', id, `meaning_id has English word: '${mid}'`); break; }
      if (!isLeg) {
        const norm = mid.toLowerCase().trim();
        if (meaningIdSeen.has(norm)) warn('DUP_MEANING_ID', id, `identical meaning_id to ${meaningIdSeen.get(norm)}: '${mid}'`);
        else meaningIdSeen.set(norm, id);
      }
    }

    // ── nuance ──
    const nuance = String(e.nuance || '');
    if (!nuance.trim()) { warn('EMPTY_NUANCE', id, 'nuance is empty'); lStats[level].v.noGramRef++; }
    else {
      if (nuance.length < 25) warn('NUANCE_TOO_SHORT', id, `nuance only ${nuance.length} chars: '${nuance}'`);
      if (!isLeg && !NUANCE_MARKERS.some(m => nuance.toLowerCase().includes(m)))
        warn('NUANCE_NO_MARKER', id, `no differential marker: '${nuance.slice(0,70)}'`);
      if (mid && nuance.toLowerCase().trim() === mid.toLowerCase().trim())
        warn('NUANCE_EQ_MEANING', id, 'nuance === meaning_id');
      if (CJK.test(nuance) && !/[a-z]{3,}/i.test(nuance) && !isLeg)
        warn('NUANCE_NO_INDONESIAN', id, `nuance appears Japanese-only: '${nuance.slice(0,60)}'`);
      if (!isLeg) {
        const nn = nuance.trim();
        if (nuanceSeen.has(nn)) warn('NUANCE_DUPLICATE', id, `identical nuance to ${nuanceSeen.get(nn)}`);
        else nuanceSeen.set(nn, id);
      }
    }

    // ── examples ──
    const exs = e.examples || [];
    if (exs.length === 0) { issue('NO_EXAMPLES', id, 'examples is empty'); lStats[level].v.noEx++; }
    else if (exs.length < 2) issue('INSUFFICIENT_EXAMPLES', id, `only ${exs.length} example — need ≥2`);
    for (let i = 0; i < exs.length; i++) {
      const ex = exs[i];
      const jp = String(ex.jp || ''), tr = String(ex.id || '');
      if (!jp) err('EXAMPLE_MISSING_JP', id, `example[${i}] missing jp`);
      if (!tr) err('EXAMPLE_MISSING_ID', id, `example[${i}] missing Indonesian translation`);
      if (jp && tr && jp === tr) err('EXAMPLE_JP_EQ_ID', id, `example[${i}] jp === id (not translated)`);
      if (jp.length > 0 && jp.length < 8) warn('EXAMPLE_JP_SHORT', id, `example[${i}] jp only ${jp.length} chars`);
      if (tr.length > 0 && tr.length < 5) warn('EXAMPLE_ID_SHORT', id, `example[${i}] translation only ${tr.length} chars`);
      if (jp && !CJK.test(jp) && !HIRA.test(jp) && !KATA.test(jp))
        warn('EXAMPLE_JP_NO_JAPANESE', id, `example[${i}] jp field has no Japanese characters`);
      if (tr && (CJK.test(tr) || HIRA.test(tr) || KATA.test(tr)))
        warn('EXAMPLE_ID_HAS_JAPANESE', id, `example[${i}] Indonesian field has Japanese: '${tr.slice(0,40)}'`);
      if (jp) { if (exJpSeen.has(jp)) warn('EXAMPLE_JP_DUPLICATE', id, `example[${i}] jp same as ${exJpSeen.get(jp)}`); else exJpSeen.set(jp, id); }
      for (const t of (ex.tags || []))
        if (!VALID_DOMAIN.has(t)) warn('EXAMPLE_INVALID_TAG', id, `example[${i}] tag='${t}'`);
    }

    // ── Cross-references ──
    const relG = e.related_grammar || [];
    for (const ref of relG) {
      if (!grammarById.has(ref)) {
        err('DEAD_GRAMMAR_REF', id, `related_grammar '${ref}' not in grammarDB`);
        // --fix: if ALL refs are bad, clear the field
      }
    }
    if (FIX_MODE && relG.length > 0 && relG.every(r => !grammarById.has(r))) {
      // All refs are dead — clear the field
      const patterns = [
        // Match both single and double quote JS formats
        new RegExp(`"related_grammar":\\s*\\[[^\\]]*\\]`,'g'),
        new RegExp(`'related_grammar':\\s*\\[[^\\]]*\\]`,'g'),
        new RegExp(`related_grammar:\\s*\\[[^\\]]*\\]`,'g'),
      ];
      // Simple targeted fix: replace on the entry's id context
      const entryId = id;
      if (!fixableFiles[filePath]) {
        const full = path.join(ROOT, 'public', filePath);
        if (fs.existsSync(full)) fixableFiles[filePath] = fs.readFileSync(full, 'utf8');
      }
      if (fixableFiles[filePath]) {
        const badRefStr = JSON.stringify(relG);
        const oldRef = `"related_grammar": ${badRefStr}`;
        if (fixableFiles[filePath].includes(oldRef)) {
          fixableFiles[filePath] = fixableFiles[filePath].replace(oldRef, `"related_grammar": []`);
          fixLog.push(`${filePath}: cleared dead related_grammar refs on ${entryId}`);
        }
      }
    }
    for (const field of ['synonyms','antonyms','see_also']) {
      for (const ref of (e[field] || [])) {
        if (ref === id) err('SELF_REFERENCE', id, `${field} references own ID`);
        if (typeof ref === 'string' && ref.startsWith('vg-') && !vocabById.has(ref))
          err('DEAD_VOCAB_REF', id, `${field} '${ref}' not in vocabDB`);
      }
    }

    // Stats
    lStats[level].v.total++;
    if ((e.domain||[]).length === 1 && e.domain[0] === 'umum') lStats[level].v.umum++;
  }

  // ── Sequence check ──
  if (nums.length > 0) {
    const sorted = [...nums].sort((a,b) => a-b), seen2 = new Set();
    for (const n of nums) {
      if (seen2.has(n)) err('DUP_ID_IN_FILE', `${prefix}${String(n).padStart(5,'0')}`, `Duplicate in ${varName}`);
      seen2.add(n);
    }
    for (let i = 1; i < sorted.length; i++)
      if (sorted[i] - sorted[i-1] > 1)
        warn('ID_GAP', `${prefix}${String(sorted[i-1]+1).padStart(5,'0')}`,
          `Gap after ${prefix}${String(sorted[i-1]).padStart(5,'0')}`);
  }
}

// ══════════════════════════════════════════════════════════════════════════
// GRAMMAR PASS
// ══════════════════════════════════════════════════════════════════════════
for (const [filePath, varName, level, prefix] of GRAMMAR_FILES) {
  if (LEVEL_FILTER && level !== LEVEL_FILTER) continue;
  const entries = global[varName] || [];
  const nums = [];

  for (const e of entries) {
    if (!e || typeof e !== 'object') continue;
    const isLeg = !e.added_v || e.added_v !== 'v15';
    if (NEW_ONLY && isLeg) continue;
    const issue = isLeg ? leg : err;
    const id = String(e.id || '');

    if (!id) { crit('MISSING_ID', varName, 'Grammar entry missing id'); continue; }
    if (!id.startsWith(prefix) || !/^\d{5}$/.test(id.slice(prefix.length)))
      crit('BAD_ID_FORMAT', id, `Expected ${prefix}NNNNN`);
    if (seenGrammarIds.has(id)) crit('DUP_GRAMMAR_ID', id, 'Duplicate grammar ID across all levels');
    seenGrammarIds.add(id);
    nums.push(parseInt(id.slice(prefix.length), 10));

    // ── Cross-level pattern duplicate ──
    const pat = String(e.pattern || '');
    if (pat) {
      if (patternLevelMap.has(pat) && patternLevelMap.get(pat).level !== level)
        warn('CROSSLEVEL_DUP_PATTERN', id, `pattern '${pat}' also at ${patternLevelMap.get(pat).level} (${patternLevelMap.get(pat).id})`);
      else if (!patternLevelMap.has(pat)) patternLevelMap.set(pat, {id, level});
    }

    // ── Pattern format ──
    if (!isLeg && pat && !['〜','～','V','N','A','S','Adj','お','ご'].some(p => pat.startsWith(p)))
      warn('PATTERN_FORMAT', id, `pattern should start with 〜/V/N/Adj: '${pat}'`);

    // ── level field ──
    if (e.level && e.level !== level) issue('JLPT_MISMATCH', id, `entry.level='${e.level}' but file is ${level}`);

    // ── cat ──
    if (e.cat !== undefined) {
      if (LEGACY_CAT[e.cat]) {
        issue('LEGACY_CAT', id, `cat='${e.cat}' → should be '${LEGACY_CAT[e.cat]}'`);
        if (FIX_MODE) {
          fixInFile(filePath, `cat: '${e.cat}'`, `cat: '${LEGACY_CAT[e.cat]}'`, `cat ${e.cat}→${LEGACY_CAT[e.cat]} on ${id}`);
          fixInFile(filePath, `"cat": "${e.cat}"`, `"cat": "${LEGACY_CAT[e.cat]}"`, `cat ${e.cat}→${LEGACY_CAT[e.cat]} on ${id}`);
        }
      } else if (!VALID_CAT.has(e.cat)) {
        issue('INVALID_CAT', id, `cat='${e.cat}' not in canonical list`);
      }
    }

    // ── Required fields ──
    const REQ_V15 = ['id','level','pattern','reading','meaning','cat','connection','desc','examples'];
    const REQ_ANY = ['id','level','pattern','meaning','examples'];
    for (const f of (isLeg ? REQ_ANY : REQ_V15))
      if (!(f in e)) issue('MISSING_FIELD', id, `Missing '${f}'`);

    // ── meaning ──
    const meaning = String(e.meaning || '');
    if (!meaning.trim()) err('EMPTY_MEANING', id, 'meaning is empty');
    else if ((CJK.test(meaning) || HIRA.test(meaning)) && !/[a-z]{3,}/i.test(meaning))
      warn('MEANING_NO_INDONESIAN', id, `meaning appears Japanese-only: '${meaning.slice(0,60)}'`);

    // ── desc ──
    const desc = String(e.desc || '');
    if (!desc.trim()) err('EMPTY_DESC', id, 'desc is empty');
    else {
      if (desc.length < 40) warn('DESC_TOO_SHORT', id, `desc only ${desc.length} chars`);
      if (!isLeg && !desc.includes('<b>')) warn('DESC_NO_HIGHLIGHT', id, 'desc missing <b>pattern</b> highlight');
    }

    // ── nuance (required for N2/N1) ──
    const nuance = String(e.nuance || '');
    if (['n2','n1'].includes(level)) {
      if (!nuance.trim()) warn('NUANCE_MISSING_N2N1', id, 'nuance required for N2/N1');
      else {
        if (nuance.length < 20) warn('NUANCE_TOO_SHORT', id, `nuance only ${nuance.length} chars`);
        if (!isLeg && !NUANCE_MARKERS.some(m => nuance.toLowerCase().includes(m)))
          warn('NUANCE_NO_MARKER', id, `no differential marker in nuance`);
      }
    }

    if (!isLeg && (!e.connection || !String(e.connection).trim()))
      warn('EMPTY_CONNECTION', id, 'connection field is empty');

    // ── examples ──
    const exs = e.examples || [];
    if (exs.length < 2) issue('INSUFFICIENT_EXAMPLES', id, `${exs.length} example(s), need ≥2`);
    for (let i = 0; i < exs.length; i++) {
      const ex = exs[i];
      const jp = String(ex.jp||''), tr = String(ex.id||'');
      if (!jp) err('EXAMPLE_MISSING_JP', id, `example[${i}] missing jp`);
      if (!tr) err('EXAMPLE_MISSING_ID', id, `example[${i}] missing Indonesian translation`);
      if (jp && tr && jp === tr) err('EXAMPLE_JP_EQ_ID', id, `example[${i}] jp === id`);
      if (!isLeg && i === 0 && jp && !jp.includes('<b>'))
        warn('EXAMPLE_NO_HIGHLIGHT', id, 'example[0] jp missing <b>pattern</b> highlight');
      if (tr && (CJK.test(tr)||HIRA.test(tr)||KATA.test(tr)))
        warn('EXAMPLE_ID_HAS_JAPANESE', id, `example[${i}] Indonesian has Japanese: '${tr.slice(0,40)}'`);
      if (jp) { if (exJpSeen.has(jp)) warn('EXAMPLE_JP_DUPLICATE', id, `example[${i}] jp same as ${exJpSeen.get(jp)}`); else exJpSeen.set(jp, id); }
    }

    // ── confusion_pairs ──
    const cp = e.confusion_pairs || [];
    cpMap.set(id, cp);
    if (['n2','n1'].includes(level) && cp.length === 0)
      warn('CONFUSION_PAIRS_EMPTY_N2N1', id, `N${level.slice(1)} grammar should have confusion_pairs`);
    for (const ref of cp) {
      if (ref === id) err('SELF_REFERENCE', id, 'confusion_pairs references own ID');
      if (!grammarById.has(ref)) err('DEAD_CONFUSION_REF', id, `confusion_pairs '${ref}' not in grammarDB`);
    }
    for (const ref of (e.see_also_grammar||[])) {
      if (ref === id) err('SELF_REFERENCE', id, 'see_also_grammar references own ID');
      if (!grammarById.has(ref)) err('DEAD_GRAMMAR_SEEREF', id, `see_also_grammar '${ref}' not in grammarDB`);
    }
    for (const ref of (e.see_also_vocab||[]))
      if (!vocabById.has(ref)) err('DEAD_VOCAB_SEEREF', id, `see_also_vocab '${ref}' not in vocabDB`);

    lStats[level].g.total++;
    if (!cp || cp.length === 0) lStats[level].g.cpEmpty++;
    if (!e.see_also_vocab || e.see_also_vocab.length === 0) lStats[level].g.svEmpty++;
  }

  if (nums.length > 0) {
    const sorted = [...nums].sort((a,b)=>a-b), seen2 = new Set();
    for (const n of nums) {
      if (seen2.has(n)) err('DUP_ID_IN_FILE', `${prefix}${String(n).padStart(5,'0')}`, `Dup in ${varName}`);
      seen2.add(n);
    }
    for (let i = 1; i < sorted.length; i++)
      if (sorted[i]-sorted[i-1] > 1)
        warn('ID_GAP', `${prefix}${String(sorted[i-1]+1).padStart(5,'0')}`,
          `Gap after ${prefix}${String(sorted[i-1]).padStart(5,'0')}`);
  }
}

// ── confusion_pairs bidirectionality ──────────────────────────────────────
for (const [id, refs] of cpMap)
  for (const ref of refs)
    if (grammarById.has(ref) && !(cpMap.get(ref)||[]).includes(id))
      err('CONFUSION_NOT_BIDIR', id, `${id}→${ref} not reciprocal`);

// ══════════════════════════════════════════════════════════════════════════
// BOOK LENS PASS — vocab_ids + grammar_ids cross-reference
// ══════════════════════════════════════════════════════════════════════════
if (!LEVEL_FILTER) {
  for (const [, varName] of BOOK_FILES) {
    const book = global[varName];
    if (!book) { warn('BOOK_NOT_LOADED', varName, 'Book lens not loaded'); continue; }
    const units = book.units || book.chapters || {};
    let brokenV = 0, brokenG = 0;
    for (const [unitKey, unit] of Object.entries(units)) {
      for (const vid of (unit.vocab_ids||[])) {
        if (!vocabById.has(vid)) {
          brokenV++;
          if (brokenV <= 5) err('DEAD_BOOK_VOCAB_REF', varName,
            `unit ${unitKey}: vocab_id '${vid}' not in vocabDB`);
        }
      }
      for (const gid of (unit.grammar_ids||[])) {
        if (!grammarById.has(gid)) {
          brokenG++;
          if (brokenG <= 5) err('DEAD_BOOK_GRAMMAR_REF', varName,
            `unit ${unitKey}: grammar_id '${gid}' not in grammarDB`);
        }
      }
    }
    if (brokenV > 5) err('DEAD_BOOK_VOCAB_REF', varName, `${brokenV} broken vocab_ids total (showing first 5)`);
    if (brokenG > 5) err('DEAD_BOOK_GRAMMAR_REF', varName, `${brokenG} broken grammar_ids total (showing first 5)`);
  }
}

// ── Coverage / distribution info ──────────────────────────────────────────
for (const [level, st] of Object.entries(lStats)) {
  const vt = st.v.total, gt = st.g.total;
  if (vt > 10 && st.v.f2/vt > 0.80)
    warn('FORMALITAS_UNIFORM', `vocab-${level}`, `${Math.round(st.v.f2/vt*100)}% formalitas=2 — monotone distribution`);
  if (vt > 10 && st.v.umum/vt > 0.40)
    warn('DOMAIN_UMUM_OVERUSE', `vocab-${level}`, `${Math.round(st.v.umum/vt*100)}% domain=['umum'] only`);
  if (vt > 0) info('VOCAB_COVERAGE', `vocab-${level}: ${vt} entries | noExample=${st.v.noEx} | related_grammar empty=${st.v.noGramRef}`);
  if (gt > 0) info('GRAMMAR_COVERAGE', `grammar-${level}: ${gt} entries | cpEmpty=${st.g.cpEmpty} | see_also_vocab empty=${st.g.svEmpty}`);
}
info('TOTALS', `vocab=${seenVocabIds.size} grammar=${seenGrammarIds.size}`);

// ── Apply --fix writes ─────────────────────────────────────────────────────
if (FIX_MODE && fixLog.length > 0) {
  for (const [relPath, content] of Object.entries(fixableFiles)) {
    const full = path.join(ROOT, 'public', relPath);
    fs.writeFileSync(full, content, 'utf8');
  }
  console.log(`\n🔧 --fix applied ${fixLog.length} change(s):`);
  for (const f of fixLog) console.log('  ✓', f);
  console.log('  Re-run without --fix to verify.\n');
}

// ══════════════════════════════════════════════════════════════════════════
// OUTPUT
// ══════════════════════════════════════════════════════════════════════════
const ts = new Date().toISOString().slice(0,19).replace('T',' ');

if (JSON_OUT) {
  console.log(JSON.stringify({ts,crits,errors,legacy,warns,infos,fixLog},null,2));
  process.exit((crits.length+errors.length) > 0 ? 1 : 0);
}

function group(items) {
  const m = {};
  for (const i of items) { if (!m[i.code]) m[i.code]=[]; m[i.code].push(i); }
  return m;
}
function printGroup(g, indent='  ') {
  for (const [code, items] of Object.entries(g)) {
    console.log(`${indent}[${code}] (${items.length})`);
    if (!SUMMARY) for (const i of items)
      console.log(`${indent}  ${String(i.id).padEnd(22)} ${i.msg}`);
  }
}

const lvlNote  = LEVEL_FILTER ? ` [--level ${LEVEL_FILTER}]` : '';
const modeNote = NEW_ONLY ? ' [--new-only]' : '';
console.log('\n══════════════════════════════════════════════════════════════');
console.log('  NUGGET NIHONGO — QUALITY REPORT v4' + lvlNote + modeNote);
console.log(`  ${ts}  |  vocab=${seenVocabIds.size}  grammar=${seenGrammarIds.size}`);
console.log('══════════════════════════════════════════════════════════════');

if (crits.length === 0) console.log('\n  ✅  No critical issues.\n');
else { console.log(`\n━━━ CRITICAL (${crits.length}) ━━━\n`); printGroup(group(crits)); }

if (errors.length === 0) console.log('\n  ✅  No errors.\n');
else { console.log(`\n━━━ ERRORS (${errors.length}) — blocks merge ━━━\n`); printGroup(group(errors)); }

if (!ERRORS_ONLY) {
  if (legacy.length > 0) {
    if (SHOW_LEGACY) { console.log(`\n━━━ LEGACY DEBT (${legacy.length}) ━━━\n`); printGroup(group(legacy)); }
    else {
      const s = Object.entries(group(legacy)).map(([c,v])=>`${c}(${v.length})`).join(', ');
      console.log(`\n  📦  Legacy debt (${legacy.length}): ${s}`);
      console.log('      → --legacy to expand  |  --new-only to hide\n');
    }
  }
  if (warns.length === 0) console.log('\n  ✅  No warnings.\n');
  else { console.log(`\n━━━ WARNINGS (${warns.length}) ━━━\n`); printGroup(group(warns)); }

  console.log('\n━━━ COVERAGE ━━━\n');
  for (const i of infos) console.log('  ' + i.msg);
}

const blocking = crits.length + errors.length;
console.log('\n══════════════════════════════════════════════════════════════');
console.log(`  CRIT:${crits.length}  ERROR:${errors.length}  LEGACY:${legacy.length}  WARN:${warns.length}`);
if (FIX_MODE && fixLog.length > 0) console.log(`  🔧  Fixed: ${fixLog.length} issue(s) auto-corrected`);
console.log(`  ${blocking > 0
  ? '❌  '+blocking+' blocking issue(s). Fix before merge.'
  : '✅  No blockers.'+(legacy.length?' Legacy debt tracked separately.':'')}`);
console.log('══════════════════════════════════════════════════════════════\n');
process.exit(blocking > 0 ? 1 : 0);
