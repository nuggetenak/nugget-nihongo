const fs = require('fs');
const path = require('path');

console.log('=== PASS 45: SSW FOOD SERVICE & FOOD PROCESSING FORENSIC AUDIT ===\n');

// 1. Check curriculum files
const currFiles = [
  'public/data/curriculum/curriculum-ssw-food.json',
  'public/data/curriculum/curriculum-ssw-food-service.json',
  'public/data/curriculum/curriculum-ssw-food-manufacturing.json'
];

currFiles.forEach(cf => {
  const p = path.resolve(cf);
  if (fs.existsSync(p)) {
    const curr = JSON.parse(fs.readFileSync(p, 'utf8'));
    console.log(`[Curriculum Found] ${cf}`);
    console.log(`  ID: ${curr.id || curr.meta?.id}, Title: "${curr.title || curr.meta?.title}", Units: ${curr.units?.length}`);
    let totalLessons = 0;
    let totalDialogue = 0;
    let totalDrills = 0;
    let totalKanji = 0;
    let totalVocab = 0;
    curr.units.forEach((u, i) => {
      console.log(`    Unit ${i + 1}: ${u.title_id || u.title} (${u.lessons?.length || 0} lessons)`);
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
    console.log(`  Total Vocab mapped: ${totalVocab}\n`);
  } else {
    console.log(`[Curriculum Not Found] ${cf}`);
  }
});

// 1b. Deep inspection of curriculum-ssw-food-service.json lessons
const fsPath = path.resolve('public/data/curriculum/curriculum-ssw-food-service.json');
if (fs.existsSync(fsPath)) {
  const f1 = JSON.parse(fs.readFileSync(fsPath, 'utf8'));
  console.log('\n--- DEEP INSPECTION OF LESSONS IN curriculum-ssw-food-service.json ---');
  f1.units.forEach((u, ui) => {
    console.log(`\nUnit ${ui + 1}: ${u.title_id}`);
    u.lessons.forEach((l, li) => {
      console.log(`  Lesson ${li + 1}: ${l.title_id}`);
      console.log(`    Etiquette: ${l.pedagogical_framework?.cultural_notes?.etiquette}`);
      console.log(`    Taboo: ${l.pedagogical_framework?.cultural_notes?.taboos}`);
      console.log(`    Dialogue 1: [${l.dialogue?.[0]?.speaker}] ${l.dialogue?.[0]?.jp} -> "${l.dialogue?.[0]?.idText}"`);
      console.log(`    Drill 1: "${l.drills?.[0]?.prompt}" -> Answer: "${l.drills?.[0]?.correctAnswer}"`);
    });
  });
}


// 3. Check active vocab files
const vocabFiles = [
  'public/data/vocab/ssw/food-service.js',
  'public/data/vocab/ssw/food-manufacturing.js',
  'public/data/vocab/ssw/food.js'
];
vocabFiles.forEach(vf => {
  const p = path.resolve(vf);
  if (fs.existsSync(p)) {
    const raw = fs.readFileSync(p, 'utf8');
    const count = (raw.match(/id:\s*['"]/g) || []).length;
    console.log(`[Vocab Found] ${vf} (~${count} items, ${raw.length} bytes)`);
    // Check key HACCP terms
    const hasHaccp = raw.includes('HACCP');
    const hasAllergen = raw.includes('アレルギー') || raw.includes('特定原材料');
    const hasChopping = raw.includes('まな板');
    const hasTemp = raw.includes('75℃') || raw.includes('中心温度');
    console.log(`  Contains HACCP: ${hasHaccp}, Allergen: ${hasAllergen}, Color-board: ${hasChopping}, Temp: ${hasTemp}`);
  } else {
    console.log(`[Vocab Not Found] ${vf}`);
  }
});

// 4. Check Prometric CBT Modal
const cbtPath = path.resolve('src/components/quiz/PrometricCbtModal.tsx');
if (fs.existsSync(cbtPath)) {
  const raw = fs.readFileSync(cbtPath, 'utf8');
  ['ssw-food-service', 'ssw-food-manufacturing', 'ssw-food'].forEach(sec => {
    const idx = raw.indexOf(`sectorId: '${sec}'`);
    if (idx !== -1) {
      console.log(`\n[Prometric CBT Sector Found] ${sec}`);
      // Find questions
      const qMatches = (raw.match(new RegExp(`sectorId:\\s*'${sec}'`, 'g')) || []).length;
      console.log(`  Questions with sectorId '${sec}': ${qMatches}`);
    } else {
      console.log(`\n[Prometric CBT Sector Missing] ${sec}`);
    }
  });
}

// 5. Check lessonContentAdapter.ts
const adapterPath = path.resolve('src/lib/curriculum/lessonContentAdapter.ts');
if (fs.existsSync(adapterPath)) {
  const raw = fs.readFileSync(adapterPath, 'utf8');
  const foodMatches = raw.match(/['"](?:les-curriculum-)?ssw-food[^'"]*['"]:/g) || [];
  console.log(`\n[Lesson Content Adapter] Curated food lessons: ${foodMatches.length}`);
}

// 6. Check official reference books in reference-books/ssw
const refDir1 = path.resolve('../reference-books/ssw/02_gaishoku_food_service');
const refDir2 = path.resolve('../reference-books/ssw/03_inshokuryouhin_food_manufacturing');
console.log(`\n--- REFERENCE BOOKS AUDIT ---`);
[refDir1, refDir2].forEach(rd => {
  if (fs.existsSync(rd)) {
    console.log(`Found reference dir: ${rd}`);
    console.log(`  Files:`, fs.readdirSync(rd));
  } else {
    console.log(`Missing reference dir: ${rd}`);
  }
});
