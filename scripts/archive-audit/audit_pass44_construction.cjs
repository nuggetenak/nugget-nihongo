const fs = require('fs');
const path = require('path');

console.log('=== PASS 44: COMPREHENSIVE SSW CONSTRUCTION & CIVIL ENGINEERING FORENSIC AUDIT ===\n');

// 1. Inspect Nugget Nihongo's curriculum-ssw-construction.json
const currPath = path.resolve('public/data/curriculum/curriculum-ssw-construction.json');
const curr = JSON.parse(fs.readFileSync(currPath, 'utf8'));

console.log('--- CURRICULUM FILE (nugget-nihongo) ---');
console.log('Meta:', JSON.stringify(curr.meta, null, 2));
console.log('Total Units:', curr.units.length);

let totalLessons = 0;
let totalCuratedDialogue = 0;
let totalCuratedDrills = 0;
let totalKanji = 0;
let totalVocabRefs = 0;

curr.units.forEach((u, i) => {
  console.log(`\nUnit ${i + 1}: ${u.title_id} (${u.title_jp})`);
  console.log(`  Theme: ${u.theme} | Can-Do: ${u.can_do_summary}`);
  console.log(`  Grammar IDs: ${JSON.stringify(u.grammar_ids)} | Vocab IDs: ${JSON.stringify(u.vocab_ids)}`);
  console.log(`  Lessons count: ${u.lessons.length}`);
  totalLessons += u.lessons.length;
  u.lessons.forEach((l, li) => {
    totalVocabRefs += (l.vocab_ids || []).length;
    if (l.dialogue && l.dialogue.length > 0) totalCuratedDialogue++;
    if (l.drills && l.drills.length > 0) totalCuratedDrills++;
    if (l.kanji_ids && l.kanji_ids.length > 0) totalKanji += l.kanji_ids.length;
    console.log(`    Lesson ${li + 1}: [${l.id}] ${l.title_id}`);
    console.log(`      dialogue: ${l.dialogue ? l.dialogue.length : 0}, drills: ${l.drills ? l.drills.length : 0}, kanji_ids: ${l.kanji_ids ? l.kanji_ids.length : 0}`);
  });
});

console.log('\n--- CURRICULUM TOTALS ---');
console.log(`Total Lessons: ${totalLessons}`);
console.log(`Lessons with Curated Dialogue: ${totalCuratedDialogue} / ${totalLessons}`);
console.log(`Lessons with Curated Drills: ${totalCuratedDrills} / ${totalLessons}`);
console.log(`Total Kanji Mapped: ${totalKanji}`);
console.log(`Total Vocab References: ${totalVocabRefs}`);

// 2. Inspect active vocab file: public/data/vocab/ssw/construction.js
console.log('\n--- ACTIVE VOCAB (nugget-nihongo/public/data/vocab/ssw/construction.js) ---');
const vocabPath = path.resolve('public/data/vocab/ssw/construction.js');
const vocabRaw = fs.readFileSync(vocabPath, 'utf8');
let activeVocabList = [];
try {
  // Extract json array
  const match = vocabRaw.match(/window\.vocabSSW_Construction\s*=\s*(\[[\s\S]*?\]);/);
  if (match) {
    activeVocabList = JSON.parse(match[1]);
  }
} catch (e) {
  console.log('Error parsing vocab array:', e.message);
}
console.log(`Total Active Construction Vocab: ${activeVocabList.length}`);
if (activeVocabList.length > 0) {
  console.log('Sample word 1:', activeVocabList[0]);
  console.log('Sample word last:', activeVocabList[activeVocabList.length - 1]);
}

// 3. Inspect Prometric CBT Modal
console.log('\n--- PROMETRIC CBT MODAL (src/components/quiz/PrometricCbtModal.tsx) ---');
const cbtPath = path.resolve('src/components/quiz/PrometricCbtModal.tsx');
const cbtRaw = fs.readFileSync(cbtPath, 'utf8');
const cbtMatch = cbtRaw.match(/'ssw-construction':\s*\{\s*sectorId:\s*'ssw-construction'[\s\S]*?questions:\s*(\[[\s\S]*?\])\s*\},/);
if (cbtMatch) {
  const qStr = cbtMatch[1];
  const qIdMatches = qStr.match(/id:\s*['"]([^'"]+)['"]/g) || [];
  console.log(`ssw-construction questions found: ${qIdMatches.length}`);
  console.log('Question IDs:', qIdMatches);
} else {
  // Let's check why it didn't match
  const idx = cbtRaw.indexOf('ssw-construction');
  console.log('Index of ssw-construction in PrometricCbtModal:', idx);
  if (idx !== -1) {
    console.log('Snippet around ssw-construction:\n', cbtRaw.slice(idx, idx + 600));
  }
}

// 4. Inspect Lesson Content Adapter
console.log('\n--- LESSON CONTENT ADAPTER (src/lib/curriculum/lessonContentAdapter.ts) ---');
const adapterPath = path.resolve('src/lib/curriculum/lessonContentAdapter.ts');
const adapterRaw = fs.readFileSync(adapterPath, 'utf8');
const constCuratedMatches = adapterRaw.match(/'les-curriculum-ssw-construction-[^']+':/g) || [];
console.log(`Curated Construction Lessons in CURATED_LESSONS_MAP: ${constCuratedMatches.length}`);

// 5. Inspect Standalone Repository: temp-reference/Nugget-Nihongo-SSW-Konstruksi
console.log('\n--- STANDALONE ASSET REPOSITORY AUDIT (temp-reference/Nugget-Nihongo-SSW-Konstruksi) ---');
const refDataDir = path.resolve('../temp-reference/Nugget-Nihongo-SSW-Konstruksi/src/data');

const filesToInspect = ['cards.js', 'genba-phrases.js', 'genba-scenes.js', 'danger-pairs.js', 'angka-kunci.js', 'jac-mockup-sets.js', 'confusion-pairs.js'];
filesToInspect.forEach(fileName => {
  const p = path.join(refDataDir, fileName);
  if (fs.existsSync(p)) {
    const raw = fs.readFileSync(p, 'utf8');
    const lines = raw.split('\n');
    console.log(`\n=== File: ${fileName} (${lines.length} lines, ${raw.length} bytes) ===`);
    console.log(lines.slice(0, 10).join('\n'));
  }
});


// 6. Sub-track check: Doboku, Kenchiku, Setsubi
console.log('\n--- MLIT / JAC SUB-TRACK COMPARISON ---');
console.log('Does curriculum-ssw-construction.json separate into Doboku, Kenchiku, and Setsubi?');
const hasDobokuTrack = JSON.stringify(curr).includes('土木') || JSON.stringify(curr).includes('doboku');
const hasKenchikuTrack = JSON.stringify(curr).includes('建築') || JSON.stringify(curr).includes('kenchiku');
const hasSetsubiTrack = JSON.stringify(curr).includes('設備') || JSON.stringify(curr).includes('setsubi');
console.log(`- Doboku (Civil Engineering) represented: ${hasDobokuTrack}`);
console.log(`- Kenchiku (Building Construction) represented: ${hasKenchikuTrack}`);
console.log(`- Setsubi (Lifeline / Plumbing / Electrical Equipment) represented: ${hasSetsubiTrack}`);
