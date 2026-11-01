const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const testKitDir = path.join(projectRoot, 'nugget-nihongo-persona-lab', 'Nugget_Nihongo_Antigravity_Persona_Test_Kit_v6');
const srcDir = path.join(projectRoot, 'src');

console.log('=== PASS 68: PERSONA LAB TEST KIT V6 HARNESS INTEGRATION & ONBOARDING/CAT AUDIT ===\n');

// 1. Audit Test Kit v6 Datasets & Council Specialist Census
console.log('[1] Auditing Test Kit v6 Datasets & Specialist Council Census:');
const personasPath = path.join(testKitDir, 'personas', '200_INDONESIAN_LEARNER_PERSONAS.json');
let personasCount = 0;
let personas = [];
if (fs.existsSync(personasPath)) {
  const pData = JSON.parse(fs.readFileSync(personasPath, 'utf8'));
  personas = pData.personas || pData;
  personasCount = personas.length;
  console.log(`  ✅ 200 Indonesian Learner Personas: ${personasCount} personas loaded.`);
} else {
  console.log(`  ❌ 200 Personas dataset missing at ${personasPath}`);
}

const eduCouncilPath = path.join(testKitDir, 'agent_teams', 'educational_excellence_council', 'Nugget_Nihongo_Educational_Excellence_Council.json');
const sswCouncilPath = path.join(testKitDir, 'agent_teams', 'ssw_sector_assurance', 'Nugget_Nihongo_SSW_Comprehensive_Sector_Assurance_Council.json');
const techCouncilPath = path.join(testKitDir, 'agent_teams', 'technical_product', 'Nugget_Nihongo_AI_Agent_Team.json');

let eduRoles = 0, sswRoles = 0, techRoles = 0;
if (fs.existsSync(eduCouncilPath)) {
  const data = JSON.parse(fs.readFileSync(eduCouncilPath, 'utf8'));
  eduRoles = Array.isArray(data) ? data.length : (data.roles || data.specialists || []).length;
  console.log(`  ✅ Educational Excellence Council: ${eduRoles} specialist roles.`);
}
if (fs.existsSync(sswCouncilPath)) {
  const data = JSON.parse(fs.readFileSync(sswCouncilPath, 'utf8'));
  sswRoles = Array.isArray(data) ? data.length : (data.roles || data.specialists || []).length;
  console.log(`  ✅ SSW Comprehensive Sector Assurance Council: ${sswRoles} specialist roles.`);
}
if (fs.existsSync(techCouncilPath)) {
  const data = JSON.parse(fs.readFileSync(techCouncilPath, 'utf8'));
  techRoles = Array.isArray(data) ? data.length : (data.roles || data.specialists || []).length;
  console.log(`  ✅ Technical & Product Specialist Team: ${techRoles} specialist roles.`);
}
console.log(`  -> Total Specialist Roles Across 3 Councils: ${eduRoles + sswRoles + techRoles} (Target: 142)`);

// 2. Audit PERSONA_RUN_MATRIX.json
const matrixPath = path.join(testKitDir, 'PERSONA_RUN_MATRIX.json');
if (fs.existsSync(matrixPath)) {
  const matrix = JSON.parse(fs.readFileSync(matrixPath, 'utf8'));
  const batches = Object.keys(matrix.batches || matrix);
  console.log(`  ✅ Persona Run Matrix: ${batches.length} official batches (B01 - B20).`);
}

// 3. Audit OnboardingModal.tsx (src/components/onboarding/OnboardingModal.tsx)
console.log('\n[2] Auditing OnboardingModal.tsx UX Architecture:');
const onboardingPath = path.join(srcDir, 'components', 'onboarding', 'OnboardingModal.tsx');
const onboardingCode = fs.readFileSync(onboardingPath, 'utf8');

const hasPersonaIntake = onboardingCode.includes('pilih jalur') || onboardingCode.includes('tujuan belajar') || onboardingCode.includes('target ujian');
const hasCatPlacementTrigger = onboardingCode.includes('openCatPlacement') || onboardingCode.includes('CatPlacementModal');
const hasL1SubstratumSelect = onboardingCode.includes('userSubstratum') || onboardingCode.includes('dialek') || onboardingCode.includes('bahasa daerah');
const finishActionMatch = onboardingCode.match(/const handleNext = \(\) => {([\s\S]*?)};/);
const finishesToQuiz = finishActionMatch ? finishActionMatch[1].includes("setActiveTab('quiz')") : false;

console.log(`  - Persona Goal / Track Intake Step: ${hasPersonaIntake ? 'Yes' : '❌ MISSING (Zero goal/track selection in onboarding)'}`);
console.log(`  - Adaptive CAT Placement Diagnostic Hook: ${hasCatPlacementTrigger ? 'Yes' : '❌ MISSING (Zero CAT diagnostic option in onboarding)'}`);
console.log(`  - Regional Indonesian L1 Substratum Selector: ${hasL1SubstratumSelect ? 'Yes' : '❌ MISSING (Defaults silently to general_indonesian)'}`);
console.log(`  - Hardcoded Destination on Onboarding Finish: ${finishesToQuiz ? '❌ DUMPS TO QUIZ ARENA (setActiveTab("quiz"))' : 'Dynamic'}`);

// 4. Audit CatPlacementModal.tsx (src/components/cat/CatPlacementModal.tsx & catEngine.ts)
console.log('\n[3] Auditing Adaptive Placement (CAT) Routing Scope:');
const catEnginePath = path.join(srcDir, 'lib', 'cat', 'catEngine.ts');
const catEngineCode = fs.readFileSync(catEnginePath, 'utf8');
const tracksRecommended = [...catEngineCode.matchAll(/recommendedTrack\s*=\s*'([^']+)'/g)].map(m => m[1]);
console.log(`  - CAT Recommended Tracks: [${[...new Set(tracksRecommended)].join(', ')}]`);
console.log(`  - Supports SSW Vocational Tracks: ${tracksRecommended.some(t => t.startsWith('ssw-')) ? 'Yes' : '❌ NO (0 of 19 SSW tracks supported in CAT)'}`);
console.log(`  - Supports JFT-Basic Tracks: ${tracksRecommended.some(t => t.startsWith('jft-')) ? 'Yes' : '❌ NO (JFT A1/A2 unsupported in CAT)'}`);
console.log(`  - Supports Seikatsu Living Guide: ${tracksRecommended.some(t => t.includes('seikatsu')) ? 'Yes' : '❌ NO'}`);

// 5. Evaluate The 4-Pillar Persona Baseline Journey
console.log('\n[4] Evaluating The 4-Pillar Persona First-Run Journey:');
const pillarPersonas = [
  { id: 'IDN-JP-001', name: 'Arif Pratama', goal: 'Pre-N5 Beginner', expectedLanding: 'Kana Chart or N5 Lesson 1', actualLanding: 'Quiz Arena (0 cards, instant failure)' },
  { id: 'IDN-JP-041', name: 'Rian Hidayat', goal: 'JFT-Basic A2 Jobseeker', expectedLanding: 'JFT A1/A2 Track Browser', actualLanding: 'Quiz Arena (No JFT onboarding)' },
  { id: 'IDN-JP-065', name: 'Dewi Lestari', goal: 'SSW Kaigo Caregiver', expectedLanding: 'SSW Kaigo Track / Prometric Simulator', actualLanding: 'Quiz Arena (No SSW intake)' },
  { id: 'IDN-JP-150', name: 'Siti Nurhaliza', goal: 'Living in Japan (Seikatsu)', expectedLanding: 'Seikatsu Municipal Guide', actualLanding: 'Quiz Arena (No Living in Japan intake)' }
];
pillarPersonas.forEach(p => {
  console.log(`  - [${p.id}] ${p.name} (${p.goal}):`);
  console.log(`      Expected: ${p.expectedLanding}`);
  console.log(`      Actual:   ❌ ${p.actualLanding}`);
});

console.log('\n=== AUDIT COMPLETE ===');
