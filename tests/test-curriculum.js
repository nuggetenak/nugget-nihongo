const fs = require('fs');
const path = require('path');

function testCurriculumLevel(level, expectedUnits) {
  console.log(`\nTesting Nugget Nihongo Original Curriculum ${level.toUpperCase()}...`);
  const curriculumPath = path.join(__dirname, `../public/data/curriculum/curriculum-${level}.json`);
  const grammarPath = path.join(__dirname, `../public/data/grammar/grammar-${level}.js`);

  if (!fs.existsSync(curriculumPath)) {
    console.error(`❌ Curriculum file not found: ${curriculumPath}`);
    process.exit(1);
  }
  if (!fs.existsSync(grammarPath)) {
    console.error(`❌ Grammar file not found: ${grammarPath}`);
    process.exit(1);
  }

  const curriculum = JSON.parse(fs.readFileSync(curriculumPath, 'utf8'));

  const win = {};
  const fn = new Function('window', 'module', 'exports', fs.readFileSync(grammarPath, 'utf8'));
  const dummyModule = { exports: {} };
  fn(win, dummyModule, dummyModule.exports);
  const grammarList = win[`grammar${level.toUpperCase()}`] || dummyModule.exports[`grammar${level.toUpperCase()}`] || [];
  const grammarIdSet = new Set(grammarList.map(g => g.id));

  const validUnitCounts = Array.isArray(expectedUnits) ? expectedUnits : [expectedUnits];
  if (!curriculum.units || !validUnitCounts.includes(curriculum.units.length)) {
    console.error(`❌ Expected ${validUnitCounts.join(' or ')} units for ${level.toUpperCase()}, got ${curriculum.units?.length}`);
    process.exit(1);
  }

  const seenGrammar = new Set();
  let totalGrammarInUnits = 0;

  for (const unit of curriculum.units) {
    if (!unit.id || !unit.title_id || !unit.can_do_summary) {
      console.error(`❌ Unit missing required fields in ${level.toUpperCase()}:`, unit);
      process.exit(1);
    }

    for (const gId of unit.grammar_ids) {
      if (!grammarIdSet.has(gId)) {
        console.error(`❌ Grammar ID ${gId} in Unit ${unit.unit_number} not found in grammar${level.toUpperCase()}!`);
        process.exit(1);
      }
      if (seenGrammar.has(gId)) {
        console.error(`❌ Duplicate grammar ID ${gId} found in ${level.toUpperCase()}!`);
        process.exit(1);
      }
      seenGrammar.add(gId);
      totalGrammarInUnits++;
    }

    for (const lesson of unit.lessons) {
      if (!lesson.id || !lesson.title_id || !lesson.can_do_statement) {
        console.error(`❌ Lesson missing required fields in ${level.toUpperCase()}:`, lesson);
        process.exit(1);
      }
    }
  }

  if (totalGrammarInUnits !== grammarList.length) {
    console.error(`❌ Total grammar in units (${totalGrammarInUnits}) does not match grammar${level.toUpperCase()} count (${grammarList.length})`);
    process.exit(1);
  }

  console.log(`✅ All checks passed for ${level.toUpperCase()}! ${curriculum.units.length} units, ${grammarList.length}/${grammarList.length} grammar points mapped with 0 broken references and 0 duplicates.`);
}

console.log('╔══════════════════════════════════════════════════════════════════╗');
console.log('║   NUGGET NIHONGO — MASTER CURRICULUM INTEGRITY VERIFIER         ║');
console.log('╚══════════════════════════════════════════════════════════════════╝');

testCurriculumLevel('n5', [10, 15]);
testCurriculumLevel('n4', [10, 15]);
testCurriculumLevel('n3', [10, 20]);
testCurriculumLevel('n2', [10, 20]);
if (fs.existsSync(path.join(__dirname, '../public/data/curriculum/curriculum-n1.json'))) {
  testCurriculumLevel('n1', 20);
}

console.log('\n🎉 ALL CURRICULUM LEVELS (N5, N4, N3, N2) 100% VERIFIED!\n');
