const fs = require('fs');
const path = require('path');

console.log('=== PASS 48: SSW FISHERIES & AQUACULTURE FORENSIC AUDIT ===\n');

// 1. Search for fisheries curriculum files
const currDir = path.resolve('public/data/curriculum');
const allCurrs = fs.readdirSync(currDir);
const targetCurrs = allCurrs.filter(f => 
  f.endsWith('.json') && (
    f.includes('fish') || 
    f.includes('gyogyou') || 
    f.includes('youshoku')
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
  f.includes('fish') || 
  f.includes('gyogyou') || 
  f.includes('youshoku')
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
  
  // Check key marine & fishery terms
  const hasLifejacket = raw.includes('救命胴衣') || raw.includes('ライフジャケット');
  const hasIkejime = raw.includes('活け締め') || raw.includes('活き締め') || raw.includes('血抜き');
  const hasAquaculture = raw.includes('養殖') || raw.includes('給餌') || raw.includes('生け簀');
  const hasWinch = raw.includes('ウインチ') || raw.includes('巻揚機') || raw.includes('網');
  const hasMob = raw.includes('落水') || raw.includes('海中転落');
  console.log(`    救命胴衣: ${hasLifejacket}, 活け締め: ${hasIkejime}, 養殖/生け簀: ${hasAquaculture}, ウインチ: ${hasWinch}, 落水/海中転落: ${hasMob}`);
});

// 3. Check Prometric CBT Modal
const cbtPath = path.resolve('src/components/quiz/PrometricCbtModal.tsx');
const cbtRaw = fs.readFileSync(cbtPath, 'utf8');
console.log('\n--- PROMETRIC CBT MODAL ---');
['ssw-fisheries', 'ssw-fishery', 'ssw-aquaculture'].forEach(sec => {
  const hasSector = cbtRaw.includes(`sectorId: '${sec}'`);
  const qMatches = (cbtRaw.match(new RegExp(`sectorId:\\s*'${sec}'`, 'g')) || []).length;
  console.log(`  ${sec}: defined in rules = ${hasSector}, question count = ${qMatches}`);
});

// 4. Check lesson content adapter
const adapterPath = path.resolve('src/lib/curriculum/lessonContentAdapter.ts');
const adapterRaw = fs.readFileSync(adapterPath, 'utf8');
const fishMatches = adapterRaw.match(/['"](?:les-curriculum-)?ssw-fish[^'"]*['"]:/g) || [];
console.log('\n--- LESSON CONTENT ADAPTER ---');
console.log(`Curated fisheries lessons: ${fishMatches.length}`);

// 5. Check reference books
const refDir = path.resolve('../reference-books/ssw/11_gyogyou_fisheries');
console.log('\n--- REFERENCE BOOKS ---');
if (fs.existsSync(refDir)) {
  console.log(`Files in ${refDir}:`, fs.readdirSync(refDir));
} else {
  console.log(`Directory does not exist: ${refDir}`);
}
