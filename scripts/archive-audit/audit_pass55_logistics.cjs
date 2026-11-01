const fs = require('fs');
const path = require('path');

console.log('=== PASS 55: SSW FREIGHT TRANSPORT & LOGISTICS FORENSIC AUDIT ===\n');

// 1. Check curriculum json
const jsonPath = path.resolve('public/data/curriculum/curriculum-ssw-logistics.json');
if (fs.existsSync(jsonPath)) {
  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  console.log('--- File: curriculum-ssw-logistics.json ---');
  console.log(`Title: ${data.title}, Units: ${data.units?.length}`);
  let totalLessons = 0;
  let totalDialogue = 0;
  let totalDrills = 0;
  let totalKanji = 0;
  let totalVocab = 0;
  let factoryBoilerplateCount = 0;

  data.units?.forEach((u, i) => {
    console.log(`  Unit ${i+1}: ${u.title_id || u.title} (${u.lessons?.length || 0} lessons)`);
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

  console.log(`Total Lessons: ${totalLessons}`);
  console.log(`Total Vocab mapped: ${totalVocab}`);
  console.log(`Total Kanji mapped: ${totalKanji}`);
  console.log(`Lessons with dialogue: ${totalDialogue} / ${totalLessons}`);
  console.log(`Lessons with drills: ${totalDrills} / ${totalLessons}`);
  console.log(`Lessons with factory boilerplate: ${factoryBoilerplateCount} / ${totalLessons}`);

  // Check lesson 1
  if (data.units?.[0]?.lessons?.[0]) {
    const l1 = data.units[0].lessons[0];
    console.log(`\nLesson 1 Sample:`);
    console.log(`  Title: ${l1.title_id}`);
    console.log(`  Dialogue:`, l1.dialogue?.slice(0, 2));
    console.log(`  Drills:`, l1.drills?.slice(0, 1));
  }
} else {
  console.log('curriculum-ssw-logistics.json NOT FOUND');
}

// 2. Check curriculum js file
const jsPath = path.resolve('public/data/curriculum/curriculum-ssw-logistics.js');
if (fs.existsSync(jsPath)) {
  console.log(`\n--- File: curriculum-ssw-logistics.js (${fs.statSync(jsPath).size} bytes) ---`);
}

// 3. Check vocab files
const vocabPath = path.resolve('public/data/vocab/ssw/logistics.js');
console.log('\n--- VOCAB FILE ---');
if (fs.existsSync(vocabPath)) {
  const raw = fs.readFileSync(vocabPath, 'utf8');
  let count = 0;
  const match = raw.match(/window\.\w+\s*=\s*(\[[\s\S]*?\]);/);
  if (match) {
    try {
      count = JSON.parse(match[1]).length;
    } catch(e) {
      count = (raw.match(/id:\s*['"]/g) || []).length;
    }
  } else {
    count = (raw.match(/id:\s*['"]/g) || []).length;
  }
  console.log(`public/data/vocab/ssw/logistics.js: ${count} items (${raw.length} bytes)`);

  const hasForklift = raw.includes('フォークリフト') || raw.includes('爪') || raw.includes('パレット');
  const hasWms = raw.includes('ハンディ') || raw.includes('バーコード') || raw.includes('検品') || raw.includes('WMS');
  const hasTruck = raw.includes('トラック') || raw.includes('固縛') || raw.includes('ラッシング') || raw.includes('デジタコ');
  const hasCold = raw.includes('冷凍') || raw.includes('冷蔵') || raw.includes('結露');
  console.log(`  フォークリフト/パレット: ${hasForklift}`);
  console.log(`  ハンディ/検品/WMS: ${hasWms}`);
  console.log(`  トラック/固縛/デジタコ: ${hasTruck}`);
  console.log(`  冷凍/冷蔵/結露 (Cold Chain): ${hasCold}`);
} else {
  console.log('public/data/vocab/ssw/logistics.js NOT FOUND');
}

// 4. Check Prometric CBT Modal
const cbtPath = path.resolve('src/components/quiz/PrometricCbtModal.tsx');
const cbtRaw = fs.readFileSync(cbtPath, 'utf8');
console.log('\n--- PROMETRIC CBT MODAL ---');
const hasLogistics = cbtRaw.includes("sectorId: 'ssw-logistics'");
const qMatches = (cbtRaw.match(/sectorId:\s*'ssw-logistics'/g) || []).length;
console.log(`ssw-logistics: defined in rules = ${hasLogistics}, question count = ${qMatches}`);

// 5. Check freight truck curriculum / vocab
console.log('\n--- FREIGHT TRUCK SPECIFIC ---');
const truckCurrs = fs.readdirSync('public/data/curriculum').filter(f => f.includes('truck') || f.includes('freight'));
console.log('Truck specific curriculum files:', truckCurrs);
const truckVocabs = fs.readdirSync('public/data/vocab/ssw').filter(f => f.includes('truck') || f.includes('freight'));
console.log('Truck specific vocab files:', truckVocabs);

// 6. Check reference books
const refDir = path.resolve('../reference-books/ssw/13_new_sectors_transport_rail_forestry');
console.log('\n--- REFERENCE BOOKS ---');
if (fs.existsSync(refDir)) {
  const truckRef = fs.readdirSync(refDir).filter(f => f.toLowerCase().includes('truck'));
  console.log('Truck reference files:', truckRef);
}
