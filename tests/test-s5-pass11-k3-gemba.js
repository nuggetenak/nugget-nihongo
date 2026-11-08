// ══════════════════════════════════════════════════════════════════
//  tests/test-s5-pass11-k3-gemba.js
//  SIKLUS V — PASS 11: 190 Gemba Workplace Skits & Official Japanese K3 Commands
//  Research Basis:
//    - JNIOSH (2020) Industrial Safety & Health Standards
//    - ADR-009 Vocational SSW & Gemba K3 Disaster Simulation Contract
//    - SBAR Clinical & Gemba Protocol (Situation, Background, Assessment, Recommendation)
//    - Ministry Regulations: METI (Manufacturing), MHLW (Kaigo), MAFF (Food/Agri), MLIT (Construction)
// ══════════════════════════════════════════════════════════════════

const assert = require('assert');
const path = require('path');
const fs = require('fs');

console.log('╔══════════════════════════════════════════════════════════════════╗');
console.log('║   SIKLUS V — PASS 11: 190 GEMBA WORKPLACE SKITS & K3 COMMANDS    ║');
console.log('╚══════════════════════════════════════════════════════════════════╝\n');

const ROOT_DIR = path.resolve(__dirname, '..');

// Import K3 data and utility functions
const {
  K3_DISASTER_SCENARIOS,
  OFFICIAL_K3_COMMANDS,
  getK3ScenarioById,
  getK3ScenariosByCluster,
  getK3CommandsByCategory,
  validatePointAndCallTouch,
  evaluateSbarResponse,
} = require('../src/lib/data/k3Scenarios.ts');

const {
  getAdaptiveLessonContent,
} = require('../src/lib/curriculum/lessonContentAdapter.ts');

// ── T-1: 36 Canonical K3 Disaster Scenarios across 4 Macro Clusters ──
console.log('--- [T-1] K3 Disaster Scenarios Completeness & Macro Cluster Matrix ---');

assert(Array.isArray(K3_DISASTER_SCENARIOS), 'K3_DISASTER_SCENARIOS must be an array');
assert.strictEqual(K3_DISASTER_SCENARIOS.length, 36, 'Must contain exactly 36 canonical disaster scenarios (K3-01 to K3-36)');

const validClusters = ['manufacturing', 'hospitality_food', 'agriculture_maritime', 'infrastructure_logistics'];
const clusterCounts = {
  manufacturing: 0,
  hospitality_food: 0,
  agriculture_maritime: 0,
  infrastructure_logistics: 0,
};

K3_DISASTER_SCENARIOS.forEach((s, idx) => {
  const expectedId = `K3-${String(idx + 1).padStart(2, '0')}`;
  assert.strictEqual(s.scenario_id, expectedId, `Scenario at index ${idx} must have ID ${expectedId}`);
  assert(s.sector_code && typeof s.sector_code === 'string', `Scenario ${s.scenario_id} must have sector_code`);
  assert(validClusters.includes(s.macro_cluster), `Scenario ${s.scenario_id} must belong to valid macro_cluster: ${s.macro_cluster}`);
  clusterCounts[s.macro_cluster]++;

  assert(s.hazard_type && typeof s.hazard_type === 'string', `Scenario ${s.scenario_id} must have hazard_type`);
  assert(['low', 'medium', 'high_industrial'].includes(s.ambient_noise_level), `Scenario ${s.scenario_id} must have valid ambient_noise_level`);

  // Initial KYK Assessment
  assert(s.initial_kyk_assessment, `Scenario ${s.scenario_id} must have initial_kyk_assessment`);
  assert(typeof s.initial_kyk_assessment.situation_image_url === 'string', `Scenario ${s.scenario_id} situation_image_url must be string`);
  assert(Array.isArray(s.initial_kyk_assessment.hazard_hotspots) && s.initial_kyk_assessment.hazard_hotspots.length > 0, `Scenario ${s.scenario_id} must have hazard_hotspots`);

  s.initial_kyk_assessment.hazard_hotspots.forEach((h, hIdx) => {
    assert(typeof h.x_percent === 'number' && h.x_percent >= 0 && h.x_percent <= 100, `Hotspot ${hIdx} in ${s.scenario_id} x_percent out of range`);
    assert(typeof h.y_percent === 'number' && h.y_percent >= 0 && h.y_percent <= 100, `Hotspot ${hIdx} in ${s.scenario_id} y_percent out of range`);
    assert(typeof h.is_hazard === 'boolean', `Hotspot ${hIdx} in ${s.scenario_id} is_hazard must be boolean`);
    assert(h.feedback_text && typeof h.feedback_text === 'string', `Hotspot ${hIdx} in ${s.scenario_id} must have feedback_text`);
  });

  // Point and Call Gate
  assert(s.point_and_call_gate, `Scenario ${s.scenario_id} must have point_and_call_gate`);
  assert(s.point_and_call_gate.target_object_name, `Scenario ${s.scenario_id} must have target_object_name`);
  assert(s.point_and_call_gate.confirmation_callout, `Scenario ${s.scenario_id} must have confirmation_callout`);
  assert.strictEqual(s.point_and_call_gate.touch_duration_ms, 2000, `Scenario ${s.scenario_id} touch_duration_ms must be 2000ms`);

  // SBAR Reporting Flow
  assert(s.sbar_reporting_flow, `Scenario ${s.scenario_id} must have sbar_reporting_flow`);
  assert(s.sbar_reporting_flow.situation_prompt, `Scenario ${s.scenario_id} must have situation_prompt`);
  assert(s.sbar_reporting_flow.background_prompt, `Scenario ${s.scenario_id} must have background_prompt`);
  assert(s.sbar_reporting_flow.assessment_prompt, `Scenario ${s.scenario_id} must have assessment_prompt`);
  assert(s.sbar_reporting_flow.recommendation_prompt, `Scenario ${s.scenario_id} must have recommendation_prompt`);
  assert(Array.isArray(s.sbar_reporting_flow.expected_response_rubric) && s.sbar_reporting_flow.expected_response_rubric.length >= 3, `Scenario ${s.scenario_id} must have >= 3 rubrics`);

  // Rousai Escalation Tier
  assert([1, 2, 3, 4].includes(s.rousai_escalation_tier), `Scenario ${s.scenario_id} rousai_escalation_tier must be 1..4`);
});

assert.strictEqual(clusterCounts.manufacturing, 9, 'Manufacturing must have exactly 9 scenarios');
assert.strictEqual(clusterCounts.hospitality_food, 9, 'Hospitality & Food must have exactly 9 scenarios');
assert.strictEqual(clusterCounts.agriculture_maritime, 9, 'Agriculture & Maritime must have exactly 9 scenarios');
assert.strictEqual(clusterCounts.infrastructure_logistics, 9, 'Infrastructure & Logistics must have exactly 9 scenarios');

// Query helpers
assert(getK3ScenarioById('K3-01'), 'getK3ScenarioById(K3-01) must return scenario');
assert.strictEqual(getK3ScenarioById('K3-01').scenario_id, 'K3-01');
assert.strictEqual(getK3ScenariosByCluster('manufacturing').length, 9, 'getK3ScenariosByCluster(manufacturing) must return 9');
assert.strictEqual(getK3ScenarioById('non-existent'), undefined, 'getK3ScenarioById(non-existent) must return undefined');

console.log('✅ [PASS] T-1: 36 Canonical K3 Disaster Scenarios verified across all 4 macro clusters (9 each).\n');

// ── T-2: Official Japanese K3 Commands Catalog & Categories ──
console.log('--- [T-2] Official Japanese K3 Commands Catalog ---');

assert(Array.isArray(OFFICIAL_K3_COMMANDS) && OFFICIAL_K3_COMMANDS.length >= 17, 'OFFICIAL_K3_COMMANDS must have >= 17 commands');

const commandCategories = new Set(OFFICIAL_K3_COMMANDS.map(c => c.category));
assert(commandCategories.has('point_and_call'), 'Must have point_and_call category');
assert(commandCategories.has('emergency_alert'), 'Must have emergency_alert category');
assert(commandCategories.has('kyk_5s'), 'Must have kyk_5s category');
assert(commandCategories.has('ppe_apd'), 'Must have ppe_apd category');
assert(commandCategories.has('medical_rousai'), 'Must have medical_rousai category');

OFFICIAL_K3_COMMANDS.forEach(cmd => {
  assert(cmd.id && cmd.id.startsWith('cmd-k3-'), `Command ${cmd.id} must have valid ID prefix`);
  assert(cmd.jp && typeof cmd.jp === 'string', `Command ${cmd.id} must have Japanese text`);
  assert(cmd.kana && typeof cmd.kana === 'string', `Command ${cmd.id} must have kana reading`);
  assert(cmd.romaji && typeof cmd.romaji === 'string', `Command ${cmd.id} must have romaji`);
  assert(cmd.idTranslation && typeof cmd.idTranslation === 'string', `Command ${cmd.id} must have Indonesian translation`);
  assert(cmd.context && typeof cmd.context === 'string', `Command ${cmd.id} must have gemba context`);
});

const emergencyAlerts = getK3CommandsByCategory('emergency_alert');
assert(emergencyAlerts.some(c => c.jp.includes('あぶない')), 'Emergency alerts must include "あぶない！"');
assert(emergencyAlerts.some(c => c.jp.includes('非常停止')), 'Emergency alerts must include "非常停止！"');

const ppeCommands = getK3CommandsByCategory('ppe_apd');
assert(ppeCommands.some(c => c.jp.includes('回転部軍手禁止')), 'PPE commands must include METI rule "回転部軍手禁止！"');

console.log('✅ [PASS] T-2: Official Japanese K3 Commands verified across 5 statutory categories.\n');

// ── T-3: Tactile Point-and-Call Gate & 2000ms Hold Duration ──
console.log('--- [T-3] Tactile Point-and-Call Gate (2000ms Hold) ---');

assert.strictEqual(validatePointAndCallTouch(0), false, '0ms hold must fail');
assert.strictEqual(validatePointAndCallTouch(1500), false, '1500ms hold must fail (<2000ms)');
assert.strictEqual(validatePointAndCallTouch(1999), false, '1999ms hold must fail');
assert.strictEqual(validatePointAndCallTouch(2000), true, '2000ms hold must pass exactly');
assert.strictEqual(validatePointAndCallTouch(2500), true, '2500ms hold must pass');

// Defensive edge cases
assert.strictEqual(validatePointAndCallTouch(-100), false, 'Negative hold must fail');
assert.strictEqual(validatePointAndCallTouch(NaN), false, 'NaN hold must fail');
assert.strictEqual(validatePointAndCallTouch(null), false, 'null hold must fail');
assert.strictEqual(validatePointAndCallTouch(undefined), false, 'undefined hold must fail');

console.log('✅ [PASS] T-3: Point-and-Call tactile gate strictly enforces 2000ms minimum hold time.\n');

// ── T-4: SBAR Reporting Flow & Rubric Evaluation ──
console.log('--- [T-4] SBAR Structured Evaluation Engine ---');

const testRubric = ['非常停止ボタン', '救急車', '指の負傷', '電源遮断'];

// Full match (100%)
const fullReport = '直ちに非常停止ボタンを押し、電源遮断を行いました。作業員に指の負傷があり、救急車を要請します。';
const fullResult = evaluateSbarResponse(fullReport, testRubric);
assert.strictEqual(fullResult.score, 100, 'Full match must score 100%');
assert.strictEqual(fullResult.passed, true, 'Full match must pass');
assert.strictEqual(fullResult.matchedRubrics.length, 4);
assert.strictEqual(fullResult.missingRubrics.length, 0);

// Partial match (50%)
const partialReport = '非常停止ボタンを押しました。指の負傷があります。';
const partialResult = evaluateSbarResponse(partialReport, testRubric);
assert.strictEqual(partialResult.score, 50, 'Partial match must score 50%');
assert.strictEqual(partialResult.passed, true, '50% must pass threshold');
assert.strictEqual(partialResult.matchedRubrics.length, 2);
assert.strictEqual(partialResult.missingRubrics.length, 2);

// Failed match (<50%)
const failedReport = '事故が発生しました。';
const failedResult = evaluateSbarResponse(failedReport, testRubric);
assert.strictEqual(failedResult.score, 0, 'No rubric match must score 0%');
assert.strictEqual(failedResult.passed, false, '0% must fail threshold');

// Null / empty defensive
const emptyResult = evaluateSbarResponse('', testRubric);
assert.strictEqual(emptyResult.passed, false);
assert.strictEqual(emptyResult.score, 0);

console.log('✅ [PASS] T-4: SBAR evaluation engine accurately grades gemba reports against rubrics.\n');

// ── T-5: SSW Gemba Curriculum & Dynamic Dialogue Adaptation ──
console.log('--- [T-5] Dynamic SSW Gemba Curriculum & Safety Personas ---');

// Test 1: Construction SSW K3 lesson
const constUnit = {
  id: 'unit-curriculum-ssw-construction-01',
  level: 'n4_ssw',
  theme: 'APD Wajib Konstruksi & Senam Pagi KYK',
  can_do_summary: 'Bisa mengecek tali dagu helm, sepatu baja, dan hazard KYK.',
};

const constLesson = {
  id: 'les-curriculum-ssw-construction-u01-02',
  lesson_number: 2,
  title_id: 'APD Wajib Konstruksi & Senam Pagi KYK (Simulasi Darurat & Laporan SBAR)',
  desc_id: 'Simulasi tanggap darurat dan pelaporan baku SBAR kepada supervisor.',
  can_do_statement: 'Bisa mengecek tali dagu helm, sepatu baja, dan hazard KYK.',
  grammar_ids: ['gn4-00028'],
  vocab_ids: ['v-ssw-const-003'],
};

const mockVocab = [
  { id: 'v-ssw-const-003', word: '安全帯', reading: 'あんぜんたい', meaning: 'Harness keselamatan', pos: 'noun', examples: [{ jp: '安全帯を着けます。', id: 'Memakai harness.' }] },
];
const mockGrammar = [
  { id: 'gn4-00028', pattern: '〜なければならない', meaning: 'Harus melakukan', examples: [{ jp: 'ヘルメットを被らなければなりません。', id: 'Harus memakai helm.' }] },
];

const adaptedConst = getAdaptiveLessonContent(constLesson, constUnit, mockVocab, mockGrammar);

assert(adaptedConst.pedagogical_framework, 'Must have pedagogical framework');
assert.strictEqual(adaptedConst.pedagogical_framework.cultural_notes.title, 'Disiplin K3 & Standar Keselamatan Kerja Jepang');
assert(adaptedConst.pedagogical_framework.cultural_notes.etiquette.includes('指差呼称'), 'Must mandate Shisa Kanko in etiquette');
assert(adaptedConst.pedagogical_framework.cultural_notes.taboos.includes('軍手禁止'), 'Must mandate Gunte Kinshi taboo');

// Verify dialogue personas
assert(adaptedConst.dialogue && adaptedConst.dialogue.length >= 4, 'Dialogue must have 4 lines');
assert.strictEqual(adaptedConst.dialogue[0].speaker, 'Satou-shochou', 'Senior speaker must be Satou-shochou for construction');
assert.strictEqual(adaptedConst.dialogue[0].speakerRole, 'Site Manager (現場監督)');
assert.strictEqual(adaptedConst.dialogue[1].speaker, 'Budi', 'Learner speaker must be Budi');
assert(adaptedConst.dialogue[1].jp.includes('指差呼称'), 'Learner dialogue must perform Shisa Kanko (指差呼称)');
assert(adaptedConst.dialogue[1].jp.includes('よし！'), 'Learner dialogue must call out Yoshi!');
assert(adaptedConst.dialogue[2].jp.includes('報連相'), 'Senior dialogue must enforce Hou-Ren-Sou');

// Test 2: Manufacturing SSW lesson
const mfgUnit = {
  id: 'unit-curriculum-ssw-mfg-01',
  level: 'n4_ssw',
  theme: 'Keselamatan Mesin Perkakas',
};
const mfgLesson = {
  id: 'les-ssw-manufacturing-u01-01',
  title_id: 'Operasi Mesin Bubut CNC',
  grammar_ids: ['gn4-00028'],
  vocab_ids: ['v-ssw-const-003'],
};
const adaptedMfg = getAdaptiveLessonContent(mfgLesson, mfgUnit, mockVocab, mockGrammar);
assert.strictEqual(adaptedMfg.dialogue[0].speaker, 'Takahashi-shunin', 'Senior speaker must be Takahashi-shunin for manufacturing');
assert.strictEqual(adaptedMfg.dialogue[1].speaker, 'Eko', 'Learner speaker must be Eko for manufacturing');

// Test 3: Food Service SSW lesson
const foodUnit = {
  id: 'unit-curriculum-ssw-food-service-01',
  level: 'n4_ssw',
  theme: 'Standar Sanitasi HACCP Restoran',
};
const foodLesson = {
  id: 'les-ssw-food-service-u01-01',
  title_id: 'Pembersihan Meja & Sanitasi Dapur',
  grammar_ids: ['gn4-00028'],
  vocab_ids: ['v-ssw-const-003'],
};
const adaptedFood = getAdaptiveLessonContent(foodLesson, foodUnit, mockVocab, mockGrammar);
assert.strictEqual(adaptedFood.dialogue[0].speaker, 'Yamamoto-tencho', 'Senior speaker must be Yamamoto-tencho for food service');
assert.strictEqual(adaptedFood.dialogue[1].speaker, 'Dewi', 'Learner speaker must be Dewi for food service');

console.log('✅ [PASS] T-5: Lesson adapter dynamically injects authentic gemba personas, K3 callouts, and safety etiquette.\n');

// ── T-6: Prometric CBT Question Bank & 19-Sector Curriculum Slices ──
console.log('--- [T-6] Prometric CBT Question Bank & Curriculum Matrix ---');

const exerciseDir = path.join(ROOT_DIR, 'public/data/exercises');
const sswExerciseFiles = fs.readdirSync(exerciseDir).filter(f => f.startsWith('ssw-') && f.endsWith('.json'));

assert.strictEqual(sswExerciseFiles.length, 8, 'Must have exactly 8 official SSW CBT exercise sets');

let totalSswQuestions = 0;
const mondaiTypes = {
  ssw_k3_procedure: 0,
  ssw_technical_terminology: 0,
  ssw_hou_ren_so_sbar: 0,
};

sswExerciseFiles.forEach(f => {
  const data = JSON.parse(fs.readFileSync(path.join(exerciseDir, f), 'utf8'));
  const items = Array.isArray(data) ? data : data.items || [];
  totalSswQuestions += items.length;

  items.forEach(q => {
    assert(q.id && q.id.startsWith('SSW-'), `Question ${q.id} must have SSW prefix`);
    assert(q.prompt && typeof q.prompt === 'string', `Question ${q.id} must have prompt`);
    assert(Array.isArray(q.options) && q.options.length === 4, `Question ${q.id} must have exactly 4 options`);
    assert(typeof q.correctOptionIndex === 'number' && q.correctOptionIndex >= 0 && q.correctOptionIndex <= 3, `Question ${q.id} invalid correctOptionIndex`);
    assert(q.explanation && q.explanation.justification, `Question ${q.id} must have justification`);
    assert(q.explanation.distractorAutopsy, `Question ${q.id} must have distractorAutopsy`);

    if (mondaiTypes[q.mondaiType] !== undefined) {
      mondaiTypes[q.mondaiType]++;
    }
  });
});

assert.strictEqual(totalSswQuestions, 120, 'SSW exercise sets must aggregate exactly 120 Prometric-grade questions');
assert(mondaiTypes.ssw_k3_procedure >= 50, 'Must have >= 50 K3 procedure questions');
assert(mondaiTypes.ssw_technical_terminology >= 40, 'Must have >= 40 technical terminology questions');
assert(mondaiTypes.ssw_hou_ren_so_sbar >= 20, 'Must have >= 20 SBAR/Hou-Ren-So questions');

// Verify 19 SSW curriculum tracks count
const curriculumDir = path.join(ROOT_DIR, 'public/data/curriculum');
const sswCurriculumFiles = fs.readdirSync(curriculumDir).filter(f => f.startsWith('curriculum-ssw-') && f.endsWith('.json'));
assert.strictEqual(sswCurriculumFiles.length, 19, 'Must have 19 SSW curriculum tracks');

let totalSswLessons = 0;
let totalSswUnits = 0;
let emergencyLessons = 0;

sswCurriculumFiles.forEach(f => {
  const d = JSON.parse(fs.readFileSync(path.join(curriculumDir, f), 'utf8'));
  totalSswUnits += d.units.length;
  d.units.forEach(u => {
    totalSswLessons += u.lessons.length;
    u.lessons.forEach(l => {
      const text = (l.title_id + ' ' + (l.desc_id || '')).toLowerCase();
      if (text.includes('sbar') || text.includes('kyk') || text.includes('k3') || text.includes('darurat')) {
        emergencyLessons++;
      }
    });
  });
});

assert.strictEqual(totalSswUnits, 88, '19 SSW tracks must aggregate 88 units');
assert.strictEqual(totalSswLessons, 176, '19 SSW tracks must aggregate 176 lessons');
assert(emergencyLessons >= 90, 'Must have >= 90 K3/KYK/SBAR emergency lessons');

console.log(`✅ [PASS] T-6: Prometric CBT bank (120 questions) & 19 SSW tracks (176 lessons, ${emergencyLessons} emergency skits) verified.\n`);

console.log('Results: 6/6 tests passed.');
console.log('🎉 ALL SIKLUS V PASS 11 TESTS PASSED PERFECTION!\n');
process.exit(0);
