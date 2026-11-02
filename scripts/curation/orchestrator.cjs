// Golden Exercise Sets Orchestrator & JSON Emitter
// Nugget Nihongo - Curation Pipeline
// Generates 14 authentic Golden Sets across JLPT, JFT-Basic, and 8 SSW tracks

const fs = require('fs');
const path = require('path');

// Target directory for production static assets
const outputDir = path.join(__dirname, '../../public/data/exercises');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// 14 canonical tracks
const moduleConfigs = [
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

console.log('==========================================================');
console.log('🚀 NUGGET NIHONGO: EMITTING 14 GOLDEN EXERCISE SETS');
console.log('==========================================================');

const manifestEntries = [];
let grandTotalQuestions = 0;

moduleConfigs.forEach(({ file, target }, idx) => {
  const modPath = path.join(__dirname, file);
  const exported = require(modPath);

  // Extract dataset from getter function
  let data;
  if (typeof exported === 'function') {
    data = exported();
  } else if (typeof Object.values(exported)[0] === 'function') {
    data = Object.values(exported)[0]();
  } else {
    data = exported;
  }

  // Strict schema validation
  if (!data.setId) {
    throw new Error(`[SCHEMA ERROR] ${file} is missing 'setId'`);
  }
  if (!Array.isArray(data.items) || data.items.length !== 15) {
    throw new Error(`[INTEGRITY ERROR] ${file}: expected exactly 15 items, found ${data.items?.length}`);
  }

  // Validate each item has required properties
  data.items.forEach((item, itemIdx) => {
    if (!item.id || typeof item.id !== 'string') {
      throw new Error(`[ITEM ERROR] ${file} Item #${itemIdx + 1} is missing valid 'id'`);
    }
    if (!Array.isArray(item.options) || item.options.length < 3) {
      throw new Error(`[ITEM ERROR] ${file} ${item.id} has invalid options array (length: ${item.options?.length})`);
    }
    if (typeof item.correctOptionIndex !== 'number' || item.correctOptionIndex < 0 || item.correctOptionIndex >= item.options.length) {
      throw new Error(`[ITEM ERROR] ${file} ${item.id} has invalid correctOptionIndex: ${item.correctOptionIndex}`);
    }
    if (!item.explanation || !item.explanation.justification || !item.explanation.distractorAutopsy || !item.explanation.mnemonicSensei || !item.explanation.l1InterferenceAlert || !item.explanation.remedialPrescription) {
      throw new Error(`[EXPLANATION ERROR] ${file} ${item.id} does not have all 5 explanation layers`);
    }
    if (!item.curriculumRef || !item.curriculumRef.trackId || !item.curriculumRef.unitId) {
      throw new Error(`[CURRICULUM ERROR] ${file} ${item.id} is missing valid curriculumRef`);
    }
  });

  const outFilePath = path.join(outputDir, target);
  fs.writeFileSync(outFilePath, JSON.stringify(data, null, 2), 'utf-8');
  console.log(`[PASS ${(idx + 1).toString().padStart(2, '0')}/14] ✅ Emitted ${target} (15 authentic items)`);

  grandTotalQuestions += data.items.length;
  manifestEntries.push({
    setId: data.setId,
    title: data.title,
    trackType: data.trackType,
    level: data.level || null,
    sswSectorId: data.sswSectorId || null,
    targetUnits: data.targetUnits,
    totalItems: data.items.length,
    timeLimitMinutes: data.timeLimitMinutes,
    passingScore: data.passingScore,
    fileName: target,
    publicPath: `/data/exercises/${target}`
  });
});

// Emit production manifest
const manifest = {
  version: "1.0.0",
  generatedAt: new Date().toISOString(),
  totalSets: manifestEntries.length,
  totalQuestions: grandTotalQuestions,
  sets: manifestEntries
};

const manifestPath = path.join(outputDir, 'manifest.json');
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf-8');

console.log('----------------------------------------------------------');
console.log(`🎉 ALL 14 SETS VERIFIED & WRITTEN TO public/data/exercises/`);
console.log(`📊 Total Sets: ${manifestEntries.length} | Total Authentic Questions: ${grandTotalQuestions}`);
console.log(`📄 Manifest emitted at: ${manifestPath}`);
console.log('==========================================================');
