const fs = require('fs');
const path = require('path');

console.log('=== PASS 54: SSW ROAD PASSENGER TRANSPORT (BUS & TAXI) FORENSIC AUDIT ===\n');

// 1. Search for passenger transport curriculum files
const currDir = path.resolve('public/data/curriculum');
const allCurrs = fs.readdirSync(currDir);
const targetCurrs = allCurrs.filter(f => 
  f.endsWith('.json') && (
    f.includes('passenger') || 
    f.includes('bus') || 
    f.includes('taxi') || 
    f.includes('transport')
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
    console.log(`    Taboo:`, l1.pedagogical_framework?.cultural_notes?.taboos);
  }

  // Deep check lesson 2
  if (data.units?.[0]?.lessons?.[1]) {
    const l2 = data.units[0].lessons[1];
    console.log(`  Lesson 2 Sample:`);
    console.log(`    Title: ${l2.title_id}`);
    console.log(`    Dialogue:`, l2.dialogue?.slice(0, 2));
    console.log(`    Drills:`, l2.drills?.slice(0, 1));
  }
});

// 2. Search for vocab files
const vocabDir = path.resolve('public/data/vocab/ssw');
const allVocabs = fs.readdirSync(vocabDir);
const targetVocabs = allVocabs.filter(f => 
  f.includes('passenger') || 
  f.includes('bus') || 
  f.includes('taxi') || 
  f.includes('transport')
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
  
  // Check key passenger transport terms
  const hasRollCall = raw.includes('点呼') || raw.includes('アルコール');
  const hasBusAnnounce = raw.includes('発車') || raw.includes('おつかまり');
  const hasTaxi = raw.includes('タクシー') || raw.includes('運賃') || raw.includes('領収書');
  const hasWheelchair = raw.includes('車いす') || raw.includes('スロープ');
  console.log(`    点呼/アルコール: ${hasRollCall}, バス発車アナウンス: ${hasBusAnnounce}, タクシー/領収書: ${hasTaxi}, 車いす/スロープ: ${hasWheelchair}`);
});

// 3. Check Prometric CBT Modal
const cbtPath = path.resolve('src/components/quiz/PrometricCbtModal.tsx');
const cbtRaw = fs.readFileSync(cbtPath, 'utf8');
console.log('\n--- PROMETRIC CBT MODAL ---');
['ssw-transport-passenger', 'ssw-bus-taxi', 'ssw-automobile-transport'].forEach(sec => {
  const hasSector = cbtRaw.includes(`sectorId: '${sec}'`);
  const qMatches = (cbtRaw.match(new RegExp(`sectorId:\\s*'${sec}'`, 'g')) || []).length;
  console.log(`  ${sec}: defined in rules = ${hasSector}, question count = ${qMatches}`);
});

// 4. Check lesson content adapter
const adapterPath = path.resolve('src/lib/curriculum/lessonContentAdapter.ts');
const adapterRaw = fs.readFileSync(adapterPath, 'utf8');
const transMatches = adapterRaw.match(/['"](?:les-curriculum-)?ssw-(?:transport|bus|taxi)[^'"]*['"]:/g) || [];
console.log('\n--- LESSON CONTENT ADAPTER ---');
console.log(`Curated passenger transport lessons: ${transMatches.length}`);

// 5. Check reference books
const refDir = path.resolve('../reference-books/ssw/13_new_sectors_transport_rail_forestry');
console.log('\n--- REFERENCE BOOKS ---');
if (fs.existsSync(refDir)) {
  console.log(`Files in ${refDir}:`, fs.readdirSync(refDir));
} else {
  console.log(`Directory does not exist: ${refDir}`);
}
