const fs = require('fs');
const path = require('path');

console.log('=== PASS 60: 19 SSW PROMETRIC QUESTION BANK & STIMULUS ASSETS AUDIT ===\n');

// 1. Audit active PrometricCbtModal question counts
const modalPath = path.resolve('src/components/quiz/PrometricCbtModal.tsx');
const modalRaw = fs.readFileSync(modalPath, 'utf8');

const sswSectors = [
  'ssw-kaigo',
  'ssw-building-cleaning',
  'ssw-manufacturing',
  'ssw-industrial-machinery',
  'ssw-electric-electronic',
  'ssw-shipbuilding',
  'ssw-automobile',
  'ssw-textile',
  'ssw-construction',
  'ssw-agriculture',
  'ssw-fishery',
  'ssw-forestry',
  'ssw-timber',
  'ssw-food',
  'ssw-food-service',
  'ssw-accommodation',
  'ssw-aviation',
  'ssw-logistics',
  'ssw-railway',
  'ssw-transport-passenger'
];

console.log('--- ACTIVE QUESTION CENSUS PER SECTOR ---');
let totalActive = 0;
sswSectors.forEach(sec => {
  const matches = (modalRaw.match(new RegExp(`sectorId:\\s*'${sec}'`, 'g')) || []).length;
  console.log(`  ${sec.padEnd(26)}: ${matches} questions (Official requirement: 40-45)`);
  totalActive += matches;
});
console.log(`\nTotal active Prometric questions across ALL sectors: ${totalActive} / 800+ required (${Math.round((totalActive/800)*100)}% completeness)`);

// 2. Search for any other question datasets in public/ or src/
console.log('\n--- SEARCHING FOR EXTERNAL SSW QUESTION DATASETS ---');
function findFiles(dir, filter) {
  let res = [];
  if (!fs.existsSync(dir)) return res;
  fs.readdirSync(dir).forEach(f => {
    const full = path.join(dir, f);
    const stat = fs.statSync(full);
    if (stat.isDirectory() && !full.includes('node_modules') && !full.includes('.git')) {
      res = res.concat(findFiles(full, filter));
    } else if (filter(full, f)) {
      res.push(full);
    }
  });
  return res;
}

const otherQuizzes = findFiles('public/data', (p, f) => (f.includes('quiz') || f.includes('cbt') || f.includes('question') || f.includes('exam')) && (f.endsWith('.json') || f.endsWith('.js')));
console.log('Quiz data files in public/data:', otherQuizzes);

// 3. Audit Practical Photo / Diagram Stimulus Assets
console.log('\n--- AUDITING PHOTO / DIAGRAM STIMULUS ASSETS ---');
const imageFiles = findFiles('public', (p, f) => (f.endsWith('.png') || f.endsWith('.jpg') || f.endsWith('.jpeg') || f.endsWith('.svg') || f.endsWith('.webp')));
console.log(`Total image assets in public/: ${imageFiles.length}`);

const sswImages = imageFiles.filter(p => p.includes('ssw') || p.includes('prometric') || p.includes('cbt'));
console.log(`SSW / Prometric / CBT specific images: ${sswImages.length}`);
sswImages.forEach(img => console.log('  ', img));

// Check if any CANONICAL_PROMETRIC_QUESTIONS reference images
const imageRefsInModal = (modalRaw.match(/imageUrl|imagePath|diagramUrl|photoUrl|promptImage/g) || []).length;
console.log(`\nPrometric questions with image/diagram stimulus references: ${imageRefsInModal}`);

// 4. Check official test materials in reference-books and temp-reference
console.log('\n--- REFERENCE ASSETS IN VAULT ---');
const refBooksDir = path.resolve('../reference-books/ssw');
if (fs.existsSync(refBooksDir)) {
  const dirs = fs.readdirSync(refBooksDir);
  console.log('Subdirectories in reference-books/ssw:', dirs);
}
const tempRefDir = path.resolve('../temp-reference');
if (fs.existsSync(tempRefDir)) {
  const tdirs = fs.readdirSync(tempRefDir);
  console.log('Subdirectories in temp-reference:', tdirs);
}
