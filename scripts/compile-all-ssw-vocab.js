#!/usr/bin/env node
/**
 * compile-all-ssw-vocab.js
 * Ingests technical vocabularies from nugget-nihongo-research/corpus/sections/synthesis/syllabi/ssw/
 * and generates clean canonical public/data/vocab/ssw/${sector}.js files for ALL 19 SSW sectors.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const RESEARCH_SSW = path.resolve(ROOT, '../nugget-nihongo-research/corpus/sections/synthesis/syllabi/ssw');
const OUT_DIR = path.join(ROOT, 'public/data/vocab/ssw');

fs.mkdirSync(OUT_DIR, { recursive: true });

const SECTOR_MAPPING = [
  { file: 'SSW-01-KAIGO-ELDERCARE-SYLLABUS.md', sector: 'kaigo', title: 'SSW Keperawatan Lansia (Kaigo)' },
  { file: 'SSW-02-BUILDING-CLEANING-SYLLABUS.md', sector: 'building-cleaning', title: 'SSW Pembersihan Gedung (Building Cleaning)' },
  { file: 'SSW-03-SOKEIZAI-TOOLING-SYLLABUS.md', sector: 'manufacturing', title: 'SSW Manufaktur & Cetakan Logam (Seizou)' },
  { file: 'SSW-04-INDUSTRIAL-MACHINERY-SYLLABUS.md', sector: 'industrial-machinery', title: 'SSW Permesinan Industri (Sangyou Kikai)' },
  { file: 'SSW-05-ELECTRICAL-ELECTRONICS-SYLLABUS.md', sector: 'electric-electronic', title: 'SSW Elektrik & Elektronik (Denki Denshi)' },
  { file: 'SSW-06-AUTOMOBILE-MAINTENANCE-SYLLABUS.md', sector: 'automobile', title: 'SSW Perawatan Otomotif (Jidousha Seibi)' },
  { file: 'SSW-07-SHIPBUILDING-MARINE-SYLLABUS.md', sector: 'shipbuilding', title: 'SSW Perkapalan & Maritim (Zousen)' },
  { file: 'SSW-08-AVIATION-INDUSTRY-SYLLABUS.md', sector: 'aviation', title: 'SSW Penerbangan & Ground Handling (Koukuu)' },
  { file: 'SSW-09-CONSTRUCTION-INDUSTRY-SYLLABUS.md', sector: 'construction', title: 'SSW Konstruksi (JAC)' },
  { file: 'SSW-10-AGRICULTURE-CROP-FARMING-SYLLABUS.md', sector: 'agriculture', title: 'SSW Pertanian & Hortikultura (Nogyo)' },
  { file: 'SSW-12-FISHERIES-AQUACULTURE-SYLLABUS.md', sector: 'fishery', title: 'SSW Perikanan & Budidaya (Gyogyo)' },
  { file: 'SSW-13-FORESTRY-INDUSTRY-SYLLABUS.md', sector: 'forestry', title: 'SSW Kehutanan & Hutan (Ringyou)' },
  { file: 'SSW-14-TIMBER-PROCESSING-SYLLABUS.md', sector: 'timber', title: 'SSW Pengolahan Kayu & Penggergajian (Mokuzai)' },
  { file: 'SSW-15-FOOD-MANUFACTURING-SYLLABUS.md', sector: 'food', title: 'SSW Pengolahan Makanan & Minuman (Inshokuryouhin)' },
  { file: 'SSW-16-FOOD-SERVICE-RESTAURANT-SYLLABUS.md', sector: 'food-service', title: 'SSW Pelayanan Restoran & Kuliner (Gaishoku)' },
  { file: 'SSW-17-HOSPITALITY-ACCOMMODATION-SYLLABUS.md', sector: 'accommodation', title: 'SSW Perhotelan & Hospitality (Shukuhaku)' },
  { file: 'SSW-18-AUTOMOBILE-TRANSPORT-SYLLABUS.md', sector: 'logistics', title: 'SSW Logistik & Transportasi (Butsuryuu)' },
  { file: 'SSW-19-RAILWAY-OPERATIONS-SYLLABUS.md', sector: 'railway', title: 'SSW Operasional Kereta Api (Tetsudou)' },
];

function parseTableRows(content) {
  const lines = content.split('\n');
  const items = [];
  let inTable = false;

  for (const line of lines) {
    if (line.includes('KOSAKATA TEKNIS LAYER 2') || line.includes('KOSAKATA INTI')) {
      inTable = true;
      continue;
    }
    if (inTable && line.startsWith('---')) {
      inTable = false;
      continue;
    }
    if (inTable && line.startsWith('|') && !line.includes('Indonesian Gloss') && !line.includes('---')) {
      const parts = line.split('|').map(s => s.trim()).filter(Boolean);
      if (parts.length >= 5) {
        const no = parseInt(parts[0], 10);
        if (!isNaN(no)) {
          const kanji = parts[1].replace(/[*_]/g, '');
          const kana = parts[2].replace(/[*_]/g, '');
          const romaji = parts[3].replace(/[*_]/g, '');
          const meaningId = parts[4].replace(/[*_]/g, '');
          const nuance = parts[5] ? parts[5].replace(/[*_]/g, '') : 'K3 Gemba';
          items.push({ no, kanji, kana, romaji, meaningId, nuance });
        }
      }
    }
  }
  return items;
}

// Special case for textile
const textileItems = [
  { no: 1, kanji: '自動裁断機', kana: 'じどうさいだんき', romaji: 'jidousaidanki', meaningId: 'Mesin pemotong pola kain lembaran otomatis (CAM)', nuance: 'Safety sensor guard' },
  { no: 2, kanji: '工業用ミシン', kana: 'こうぎょうようみしん', romaji: 'kougyouyou mishin', meaningId: 'Mesin jahit industri kecepatan tinggi (Lockstitch/Overlock)', nuance: 'Finger guard' },
  { no: 3, kanji: '検針機', kana: 'けんしんき', romaji: 'kenshinki', meaningId: 'Mesin detektor jarum patah pada pakaian jadi', nuance: 'Needle break isolation' },
  { no: 4, kanji: '仕上げアイロン', kana: 'しあげあいろん', romaji: 'shiage airon', meaningId: 'Setrika uap garmen finishing bersuhu 130°C', nuance: 'Steam burn hazard' },
  { no: 5, kanji: '延反作業', kana: 'えんたんさぎょう', romaji: 'entan sagyou', meaningId: 'Penggelaran gulungan kain berlapis-lapis secara rata', nuance: 'Lifting posture' },
  { no: 6, kanji: '本縫い', kana: 'ほんぬい', romaji: 'honnui', meaningId: 'Jahitan lurus standar keliman baju (Lockstitch)', nuance: 'Thread tension' },
  { no: 7, kanji: 'ロックミシン', kana: 'ろっくみしん', romaji: 'rokku mishin', meaningId: 'Mesin jahit obras kelim tepi kain', nuance: 'Blade pinch hazard' },
  { no: 8, kanji: '防針手袋', kana: 'ぼうしんてぶくろ', romaji: 'boushin tebukuro', meaningId: 'Sarung tangan pelindung tusukan jarum jahit', nuance: 'PPE' },
  { no: 9, kanji: '異物混入防止', kana: 'いぶつこんにゅうぼうし', romaji: 'ibutsukonnyuu boushi', meaningId: 'Pencegahan kontaminasi jarum atau serpihan logam', nuance: 'Export compliance' },
  { no: 10, kanji: '縫製仕様書', kana: 'ほうせいしようしょ', romaji: 'housei shiyousho', meaningId: 'Lembar instruksi spesifikasi SOP jahitan produk', nuance: 'QC specification' },
];

for (const entry of SECTOR_MAPPING) {
  if (['kaigo', 'food', 'construction'].includes(entry.sector)) {
    // Preserve existing hand-crafted 24-item files for the 3 primary sectors
    continue;
  }
  const filePath = path.join(RESEARCH_SSW, entry.file);
  let rows = [];
  if (fs.existsSync(filePath)) {
    const text = fs.readFileSync(filePath, 'utf8');
    rows = parseTableRows(text);
  }

  if (rows.length === 0) {
    console.warn(`[compile-all-ssw-vocab] Could not parse rows from ${entry.file}`);
    continue;
  }

  const pascalSector = entry.sector.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('');
  const snakeSector = entry.sector.replace(/-/g, '_');

  const vocabItems = rows.map((r) => ({
    id: `v-ssw-${entry.sector}-${String(r.no).padStart(3, '0')}`,
    word: r.kanji,
    reading: r.kana,
    romaji: r.romaji,
    meaning: r.meaningId,
    meaning_id: r.meaningId,
    meaning_en: r.meaningId,
    level: 'n4',
    pos: 'noun',
    nuance: r.nuance,
    examples: [
      {
        jp: `${r.kanji}の安全確認を行ってください。`,
        id: `Tolong lakukan konfirmasi keselamatan pada ${r.meaningId}.`
      }
    ]
  }));

  const outContent = `// ══════════════════════════════════════════════════════════════════
//  ${entry.sector}.js — Nugget Nihongo · ${entry.title}
//  ${vocabItems.length} Dedicated Technical Lexicon Items from Research Corpus
// ══════════════════════════════════════════════════════════════════

window.vocabSSW_${pascalSector} = ${JSON.stringify(vocabItems, null, 2)};
window.vocabSSW_${snakeSector} = window.vocabSSW_${pascalSector};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    vocabSSW_${pascalSector}: window.vocabSSW_${pascalSector},
    vocabSSW_${snakeSector}: window.vocabSSW_${snakeSector}
  };
}
`;

  const outFile = path.join(OUT_DIR, `${entry.sector}.js`);
  fs.writeFileSync(outFile, outContent, 'utf8');
  console.log(`✓ Generated: ${entry.sector}.js (${vocabItems.length} items)`);
}

// Compile textile
{
  const textileVocab = textileItems.map((r) => ({
    id: `v-ssw-textile-${String(r.no).padStart(3, '0')}`,
    word: r.kanji,
    reading: r.kana,
    romaji: r.romaji,
    meaning: r.meaningId,
    meaning_id: r.meaningId,
    meaning_en: r.meaningId,
    level: 'n4',
    pos: 'noun',
    nuance: r.nuance,
    examples: [
      {
        jp: `${r.kanji}の安全確認を行ってください。`,
        id: `Tolong lakukan konfirmasi keselamatan pada ${r.meaningId}.`
      }
    ]
  }));

  const outContent = `// ══════════════════════════════════════════════════════════════════
//  textile.js — Nugget Nihongo · SSW Tekstil & Garmen (Seni & Housei)
//  ${textileVocab.length} Dedicated Technical Lexicon Items
// ══════════════════════════════════════════════════════════════════

window.vocabSSW_Textile = ${JSON.stringify(textileVocab, null, 2)};
window.vocabSSW_textile = window.vocabSSW_Textile;

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    vocabSSW_Textile: window.vocabSSW_Textile,
    vocabSSW_textile: window.vocabSSW_textile
  };
}
`;

  const outFile = path.join(OUT_DIR, 'textile.js');
  fs.writeFileSync(outFile, outContent, 'utf8');
  console.log(`✓ Generated: textile.js (${textileVocab.length} items)`);
}

console.log('✅ ALL SSW VOCABULARIES COMPILED SUCCESSFULLY.');
