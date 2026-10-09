const fs = require('fs');
const path = require('path');

const curriculumPath = path.join(__dirname, '../public/data/curriculum/curriculum-n5.json');
const grammarPath = path.join(__dirname, '../public/data/grammar/grammar-n5.js');

const curriculum = JSON.parse(fs.readFileSync(curriculumPath, 'utf8'));

const win = {};
eval(fs.readFileSync(grammarPath, 'utf8').replace('window.', 'win.'));
const grammarN5 = win.grammarN5;
const grammarIdSet = new Set(grammarN5.map(g => g.id));

console.log('Testing Nugget Nihongo Original Curriculum N5...');

if (!curriculum.units || curriculum.units.length !== 10) {
  console.error(`❌ Expected 10 units, got ${curriculum.units?.length}`);
  process.exit(1);
}

const seenGrammar = new Set();
let totalGrammarInUnits = 0;

for (const unit of curriculum.units) {
  if (!unit.id || !unit.title_id || !unit.can_do_summary) {
    console.error(`❌ Unit missing required fields:`, unit);
    process.exit(1);
  }

  for (const gId of unit.grammar_ids) {
    if (!grammarIdSet.has(gId)) {
      console.error(`❌ Grammar ID ${gId} in Unit ${unit.unit_number} not found in grammarN5!`);
      process.exit(1);
    }
    if (seenGrammar.has(gId)) {
      console.error(`❌ Duplicate grammar ID ${gId} found!`);
      process.exit(1);
    }
    seenGrammar.add(gId);
    totalGrammarInUnits++;
  }

  for (const lesson of unit.lessons) {
    if (!lesson.id || !lesson.title_id || !lesson.can_do_statement) {
      console.error(`❌ Lesson missing required fields:`, lesson);
      process.exit(1);
    }
  }
}

if (totalGrammarInUnits !== grammarN5.length) {
  console.error(`❌ Total grammar in units (${totalGrammarInUnits}) does not match grammarN5 count (${grammarN5.length})`);
  process.exit(1);
}

console.log(`✅ All checks passed! 10 units, 94/94 grammar points mapped with 0 broken references.`);
