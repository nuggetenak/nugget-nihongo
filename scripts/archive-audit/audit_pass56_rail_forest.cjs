const fs = require('fs');
const path = require('path');

console.log('=== PASS 56: SSW RAILWAY & FORESTRY / TIMBER FORENSIC AUDIT ===\n');

// 1. Audit Curriculum Files
const currFiles = [
  'curriculum-ssw-railway.json',
  'curriculum-ssw-forestry.json',
  'curriculum-ssw-timber.json'
];

currFiles.forEach(cf => {
  const p = path.resolve('public/data/curriculum', cf);
  console.log(`\n--- Curriculum: ${cf} ---`);
  if (!fs.existsSync(p)) {
    console.log(`  FILE NOT FOUND: ${p}`);
    return;
  }
  const data = JSON.parse(fs.readFileSync(p, 'utf8'));
  console.log(`  Title: ${data.title || data.meta?.title}`);
  console.log(`  Units: ${data.units?.length}`);
  let totalLessons = 0;
  let totalVocab = 0;
  let totalKanji = 0;
  let totalDialogue = 0;
  let totalDrills = 0;
  let factoryBoilerplateCount = 0;

  data.units?.forEach((u, i) => {
    console.log(`    Unit ${i+1}: ${u.title_id || u.title} (${u.lessons?.length || 0} lessons)`);
    totalLessons += u.lessons?.length || 0;
    u.lessons?.forEach(l => {
      totalVocab += (l.vocab_ids || []).length;
      if (l.kanji_ids) totalKanji += l.kanji_ids.length;
      if (l.dialogue && l.dialogue.length > 0) totalDialogue++;
      if (l.drills && l.drills.length > 0) totalDrills++;

      const rawL = JSON.stringify(l);
      if (rawL.includes('helm keselamatan') || rawL.includes('mandor') || rawL.includes('mematikan lampu pabrik') || rawL.includes('bunyi aneh')) {
        factoryBoilerplateCount++;
      }
    });
  });

  console.log(`  Total Lessons: ${totalLessons}`);
  console.log(`  Total Vocab mapped: ${totalVocab}`);
  console.log(`  Total Kanji mapped: ${totalKanji}`);
  console.log(`  Lessons with dialogue: ${totalDialogue} / ${totalLessons}`);
  console.log(`  Lessons with drills: ${totalDrills} / ${totalLessons}`);
  console.log(`  Lessons with factory boilerplate: ${factoryBoilerplateCount} / ${totalLessons}`);

  if (data.units?.[0]?.lessons?.[0]) {
    const l1 = data.units[0].lessons[0];
    console.log(`  Lesson 1 Sample:`);
    console.log(`    Title: ${l1.title_id}`);
    console.log(`    Dialogue:`, l1.dialogue?.slice(0, 2));
    console.log(`    Drills:`, l1.drills?.slice(0, 1));
  }
});

// 2. Audit Vocab Files
const vocabFiles = [
  'railway.js',
  'forestry.js',
  'timber.js'
];

console.log('\n--- VOCAB FILES ---');
vocabFiles.forEach(vf => {
  const p = path.resolve('public/data/vocab/ssw', vf);
  if (!fs.existsSync(p)) {
    console.log(`  FILE NOT FOUND: ${vf}`);
    return;
  }
  const raw = fs.readFileSync(p, 'utf8');
  let count = (raw.match(/id:\s*['"]/g) || []).length;
  console.log(`  ${vf}: ${count} items (${raw.length} bytes)`);

  // Check template sentence pattern
  const dummyTemplateCount = (raw.match(/の安全確認を行ってください/g) || []).length;
  console.log(`    Dummy template count ("[WORD]の安全確認を行ってください"): ${dummyTemplateCount} / ${count}`);

  if (vf === 'railway.js') {
    const hasShinkansen = raw.includes('新幹線') || raw.includes('ホーム') || raw.includes('折り返し');
    const hasTrack = raw.includes('軌道') || raw.includes('保守') || raw.includes('線路');
    console.log(`    新幹線/ホーム/折り返し: ${hasShinkansen}, 軌道/線路/保守: ${hasTrack}`);
  } else if (vf === 'forestry.js') {
    const hasChainsaw = raw.includes('チェーンソー') || raw.includes('伐倒') || raw.includes('受け口');
    const hasForest = raw.includes('造林') || raw.includes('植栽') || raw.includes('下刈り');
    console.log(`    チェーンソー/伐倒/受け口: ${hasChainsaw}, 造林/植栽/下刈り: ${hasForest}`);
  } else if (vf === 'timber.js') {
    const hasSaw = raw.includes('帯鋸') || raw.includes('製材') || raw.includes('乾燥');
    const hasJas = raw.includes('JAS') || raw.includes('選別') || raw.includes('含水率');
    console.log(`    帯鋸/製材/乾燥: ${hasSaw}, JAS/選別/含水率: ${hasJas}`);
  }
});

// 3. Audit Prometric CBT Modal
const cbtPath = path.resolve('src/components/quiz/PrometricCbtModal.tsx');
const cbtRaw = fs.readFileSync(cbtPath, 'utf8');
console.log('\n--- PROMETRIC CBT MODAL ---');
['ssw-railway', 'ssw-forestry', 'ssw-timber'].forEach(sec => {
  const hasSec = cbtRaw.includes(`sectorId: '${sec}'`);
  const qMatches = (cbtRaw.match(new RegExp(`sectorId:\\s*'${sec}'`, 'g')) || []).length;
  console.log(`  ${sec}: defined in rules = ${hasSec}, question count = ${qMatches}`);
});

// 4. Reference Books
const refDir = path.resolve('../reference-books/ssw/13_new_sectors_transport_rail_forestry');
console.log('\n--- REFERENCE BOOKS ---');
if (fs.existsSync(refDir)) {
  console.log('Reference files in dir:', fs.readdirSync(refDir));
}
