#!/usr/bin/env node
/**
 * extract-kanji-strokes.js
 * Extracts SVG stroke order paths from KanjiVG (kanjivg-all.xml.gz)
 * for all JLPT N5 through N1 Kanji (2,383 kanji total).
 * 
 * Outputs:
 * - public/data/staged-expansion/kanji/strokes/kanji-strokes-n5.json & .js
 * - public/data/staged-expansion/kanji/strokes/kanji-strokes-n4.json & .js
 * - public/data/staged-expansion/kanji/strokes/kanji-strokes-n3.json & .js
 * - public/data/staged-expansion/kanji/strokes/kanji-strokes-n2.json & .js
 * - public/data/staged-expansion/kanji/strokes/kanji-strokes-n1.json & .js
 */

const fs = require('fs');
const zlib = require('zlib');
const path = require('path');

const REPO = path.join(__dirname, '../..');
const WORKSPACE_ROOT = path.join(REPO, '..');
const KANJIVG_XML_PATH = path.join(WORKSPACE_ROOT, 'open-source-datasets/kanjivg/kanjivg-all.xml.gz');
const OPENJLPT_DIR = path.join(WORKSPACE_ROOT, 'open-source-datasets/jlpt-openjlpt/kanji');
const OUT_STROKES_DIR = path.join(REPO, 'public/data/staged-expansion/kanji/strokes');

fs.mkdirSync(OUT_STROKES_DIR, { recursive: true });

console.log('Loading and decompressing KanjiVG XML...');
const t0 = Date.now();
const gzBuffer = fs.readFileSync(KANJIVG_XML_PATH);
const xml = zlib.gunzipSync(gzBuffer).toString('utf8');
console.log(`KanjiVG XML loaded (${(xml.length / (1024 * 1024)).toFixed(2)} MB) in ${Date.now() - t0}ms.`);

// Build index of kanji blocks in XML for fast retrieval
console.log('Indexing kanji in XML...');
const kanjiBlockMap = new Map();
const kanjiRegex = /<kanji id="kvg:kanji_([^"]+)">([\s\S]*?)<\/kanji>/g;
let m;
while ((m = kanjiRegex.exec(xml)) !== null) {
  const code = m[1];
  // If variant (e.g., 04e00-Kaisho), prioritize standard base code (5 hex digits)
  if (!code.includes('-') && !kanjiBlockMap.has(code)) {
    kanjiBlockMap.set(code, m[2]);
  } else if (!kanjiBlockMap.has(code)) {
    kanjiBlockMap.set(code, m[2]);
  }
}
console.log(`Indexed ${kanjiBlockMap.size} unique kanji entries from KanjiVG.`);

function extractPaths(block) {
  const paths = [];
  const pathRegex = /<path\b[^>]*\bd="([^"]+)"[^>]*>/g;
  let pm;
  while ((pm = pathRegex.exec(block)) !== null) {
    paths.push(pm[1]);
  }
  return paths;
}

const levels = [
  { level: 'n5', varName: 'nuggetKanjiStrokesN5' },
  { level: 'n4', varName: 'nuggetKanjiStrokesN4' },
  { level: 'n3', varName: 'nuggetKanjiStrokesN3' },
  { level: 'n2', varName: 'nuggetKanjiStrokesN2' },
  { level: 'n1', varName: 'nuggetKanjiStrokesN1' },
];

let totalExtracted = 0;

for (const { level, varName } of levels) {
  const kanjiListPath = path.join(OPENJLPT_DIR, `${level}.json`);
  const kanjiList = JSON.parse(fs.readFileSync(kanjiListPath, 'utf8'));
  
  const bundle = {};
  let missing = 0;

  for (const item of kanjiList) {
    const char = item.character;
    const code = char.codePointAt(0).toString(16).padStart(5, '0');
    
    let block = kanjiBlockMap.get(code);
    if (!block) {
      // Try finding any variant
      for (const [k, v] of kanjiBlockMap) {
        if (k.startsWith(code)) {
          block = v;
          break;
        }
      }
    }

    if (!block) {
      missing++;
      console.warn(`Warning: Missing stroke paths for ${char} (${code}) in level ${level}`);
      continue;
    }

    const paths = extractPaths(block);
    bundle[char] = {
      character: char,
      unicode: code,
      strokes: paths.length,
      paths: paths
    };
  }

  const jsonOut = path.join(OUT_STROKES_DIR, `kanji-strokes-${level}.json`);
  const jsOut = path.join(OUT_STROKES_DIR, `kanji-strokes-${level}.js`);

  fs.writeFileSync(jsonOut, JSON.stringify(bundle, null, 2), 'utf8');
  fs.writeFileSync(jsOut, `// KanjiVG Stroke Order Paths for JLPT ${level.toUpperCase()}\n// Creative Commons Attribution-Share Alike 3.0\nwindow.${varName} = ${JSON.stringify(bundle, null, 2)};\n`, 'utf8');

  const count = Object.keys(bundle).length;
  totalExtracted += count;
  console.log(`[${level.toUpperCase()}] Extracted ${count}/${kanjiList.length} kanji stroke paths -> ${path.basename(jsonOut)} (${missing} missing)`);
}

console.log(`\nSuccessfully extracted ${totalExtracted} total kanji stroke order bundles to ${OUT_STROKES_DIR}`);
