const fs = require('fs');
const path = require('path');

console.log('=== PASS 46: SSW MANUFACTURING, INDUSTRIAL MACHINERY & ELECTRIC AUDIT ===\n');

// 1. Search for curriculum files matching manufacturing, machinery, electric
const currDir = path.resolve('public/data/curriculum');
const allCurrs = fs.readdirSync(currDir);
const targetCurrs = allCurrs.filter(f => 
  f.endsWith('.json') && (
    f.includes('manufacturing') || 
    f.includes('machinery') || 
    f.includes('electric') || 
    f.includes('seizou') ||
    f.includes('monodukuri')
  )
);


console.log('Target curriculum files found in public/data/curriculum:', targetCurrs);

targetCurrs.forEach(cf => {
  const p = path.join(currDir, cf);
  const data = JSON.parse(fs.readFileSync(p, 'utf8'));
  console.log(`\n--- File: ${cf} ---`);
  console.log(`  Title: "${data.title || data.meta?.title}", ID: "${data.id || data.meta?.id}", Units: ${data.units?.length}`);
  let totalLessons = 0;
  let totalDialogue = 0;
  let totalDrills = 0;
  let totalKanji = 0;
  let totalVocab = 0;

  data.units?.forEach((u, i) => {
    console.log(`    Unit ${i+1}: ${u.title_id || u.title} (${u.lessons?.length || 0} lessons)`);
    totalLessons += u.lessons?.length || 0;
    u.lessons?.forEach(l => {
      totalVocab += (l.vocab_ids || []).length;
      if (l.dialogue && l.dialogue.length > 0) totalDialogue++;
      if (l.drills && l.drills.length > 0) totalDrills++;
      if (l.kanji_ids && l.kanji_ids.length > 0) totalKanji += l.kanji_ids.length;
    });
  });
  console.log(`  Total Lessons: ${totalLessons}`);
  console.log(`  Lessons with dialogue: ${totalDialogue} / ${totalLessons}`);
  console.log(`  Lessons with drills: ${totalDrills} / ${totalLessons}`);
  console.log(`  Total Kanji mapped: ${totalKanji}`);
  console.log(`  Total Vocab mapped: ${totalVocab}`);

  // Deep check lesson 1
  if (data.units?.[0]?.lessons?.[0]) {
    const l1 = data.units[0].lessons[0];
    console.log(`  Lesson 1 Sample:`);
    console.log(`    Title: ${l1.title_id}`);
    console.log(`    Dialogue:`, l1.dialogue?.slice(0, 2));
    console.log(`    Drills:`, l1.drills?.slice(0, 1));
    console.log(`    Etiquette:`, l1.pedagogical_framework?.cultural_notes?.etiquette);
  }
});

// 2. Search for vocab files
const vocabDir = path.resolve('public/data/vocab/ssw');
const allVocabs = fs.readdirSync(vocabDir);
const targetVocabs = allVocabs.filter(f => 
  f.includes('manufacturing') || 
  f.includes('machinery') || 
  f.includes('electric') || 
  f.includes('seizou')
);

console.log('\n--- TARGET VOCAB FILES ---');
console.log('Target vocab files found in public/data/vocab/ssw:', targetVocabs);
targetVocabs.forEach(vf => {
  const p = path.join(vocabDir, vf);
  const raw = fs.readFileSync(p, 'utf8');
  let count = 0;
  const match = raw.match(/window\.\w+\s*=\s*(\[[\s\S]*?\]);/);
  if (match) {
    try {
      const arr = JSON.parse(match[1]);
      count = arr.length;
    } catch(e) {
      count = (raw.match(/id:\s*['"]/g) || []).length;
    }
  } else {
    count = (raw.match(/id:\s*['"]/g) || []).length;
  }
  console.log(`  ${vf}: ${count} items (${raw.length} bytes)`);
  
  // Check key technical terms
  const hasNogisu = raw.includes('ノギス');
  const hasLoto = raw.includes('LOTO') || raw.includes('施錠');
  const hasGloveBan = raw.includes('手袋禁止') || raw.includes('巻き込まれ');
  const hasBlueprint = raw.includes('図面') || raw.includes('第3角法');
  console.log(`    ノギス: ${hasNogisu}, LOTO: ${hasLoto}, 手袋禁止: ${hasGloveBan}, 図面: ${hasBlueprint}`);
});

// 3. Check Prometric CBT Modal
const cbtPath = path.resolve('src/components/quiz/PrometricCbtModal.tsx');
const cbtRaw = fs.readFileSync(cbtPath, 'utf8');
console.log('\n--- PROMETRIC CBT MODAL ---');
['ssw-manufacturing', 'ssw-industrial-machinery', 'ssw-electrical'].forEach(sec => {
  const hasSector = cbtRaw.includes(`sectorId: '${sec}'`);
  const qMatches = (cbtRaw.match(new RegExp(`sectorId:\\s*'${sec}'`, 'g')) || []).length;
  console.log(`  ${sec}: defined in rules = ${hasSector}, question count = ${qMatches}`);
});

// 4. Check lesson content adapter
const adapterPath = path.resolve('src/lib/curriculum/lessonContentAdapter.ts');
const adapterRaw = fs.readFileSync(adapterPath, 'utf8');
const manufMatches = adapterRaw.match(/['"](?:les-curriculum-)?ssw-(?:manufacturing|machinery|electrical)[^'"]*['"]:/g) || [];
console.log('\n--- LESSON CONTENT ADAPTER ---');
console.log(`Curated manufacturing/machinery/electrical lessons: ${manufMatches.length}`);

// 5. Check reference books
const refDir = path.resolve('../reference-books/ssw/09_seizou_manufacturing');
console.log('\n--- REFERENCE BOOKS ---');
if (fs.existsSync(refDir)) {
  console.log(`Files in ${refDir}:`, fs.readdirSync(refDir));
} else {
  console.log(`Directory does not exist: ${refDir}`);
}
