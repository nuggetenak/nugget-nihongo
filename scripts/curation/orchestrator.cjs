// Golden Exercise Sets Orchestrator & JSON Emitter
// Nugget Nihongo - Curation Pipeline

const fs = require('fs');
const path = require('path');

// Target directory
const outputDir = path.join(__dirname, '../../public/data/exercises');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Load all 14 track sets
const modules = [
  { file: 'jlpt-n5.cjs', target: 'jlpt-n5-set01.json' },
  { file: 'jlpt-n4.cjs', target: 'jlpt-n4-set01.json' },
  { file: 'jlpt-n3.cjs', target: 'jlpt-n3-set01.json' },
  { file: 'jlpt-n2.cjs', target: 'jlpt-n2-set01.json' },
  { file: 'jlpt-n1.cjs', target: 'jlpt-n1-set01.json' },
  { file: 'jft-a2.cjs', target: 'jft-basic-a2-set01.json' },
  { file: 'ssw-kaigo.cjs', target: 'ssw-kaigo-set01.json' },
  { file: 'ssw-gaishoku.cjs', target: 'ssw-food-service-set01.json' },
  { file: 'ssw-food-mfg.cjs', target: 'ssw-food-mfg-set01.json' },
  { file: 'ssw-doboku.cjs', target: 'ssw-kensetsu-doboku-set01.json' },
  { file: 'ssw-kenchiku.cjs', target: 'ssw-kensetsu-kenchiku-set01.json' },
  { file: 'ssw-lifeline.cjs', target: 'ssw-kensetsu-lifeline-set01.json' },
  { file: 'ssw-agriculture.cjs', target: 'ssw-agriculture-set01.json' },
  { file: 'ssw-manufacturing.cjs', target: 'ssw-manufacturing-set01.json' }
];

console.log('--- EMITTING 14 GOLDEN EXERCISE SETS ---');

const manifestEntries = [];
let grandTotalQuestions = 0;

modules.forEach(({ file, target }) => {
  const modPath = path.join(__dirname, file);
  const data = require(modPath);

  // Validate question count
  if (!Array.isArray(data.questions) || data.questions.length !== 15) {
    throw new Error(`Integrity error in ${file}: expected 15 questions, found ${data.questions?.length}`);
  }

  const outFilePath = path.join(outputDir, target);
  fs.writeFileSync(outFilePath, JSON.stringify(data, null, 2), 'utf-8');
  console.log(`[OK] Emitted ${target} (Questions: ${data.questions.length})`);

  grandTotalQuestions += data.questions.length;
  manifestEntries.push({
    id: data.id,
    title: data.title,
    track: data.track,
    level: data.level,
    tier: data.tier,
    totalQuestions: data.questions.length,
    durationMinutes: data.durationMinutes,
    passingScorePercent: data.passingScorePercent,
    focusAreas: data.focusAreas,
    fileName: target,
    publicPath: `/data/exercises/${target}`
  });
});

// Emit manifest
const manifest = {
  version: "1.0.0",
  generatedAt: new Date().toISOString(),
  totalSets: manifestEntries.length,
  totalQuestions: grandTotalQuestions,
  sets: manifestEntries
};

const manifestPath = path.join(outputDir, 'manifest.json');
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf-8');
console.log(`[OK] Emitted manifest.json (${manifestEntries.length} sets, ${grandTotalQuestions} total authentic questions)`);
console.log('--- ALL 14 SETS EMITTED SUCCESSFULLY ---');
