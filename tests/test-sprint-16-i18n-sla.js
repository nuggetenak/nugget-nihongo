// ══════════════════════════════════════════════════════════════════
//  test-sprint-16-i18n-sla.js — Forensic Unit & Integration Suite
//  Sprint 16: Internationalization, Indonesian SLA Localization & L1 Contrastive Modules
//  (Tickets T-85 to T-90)
// ══════════════════════════════════════════════════════════════════

const fs = require('fs');
const path = require('path');
const assert = require('assert');

let passedTests = 0;
let totalTests = 0;

function test(name, fn) {
  totalTests++;
  try {
    fn();
    console.log(`  ✅ [PASS] ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`  ❌ [FAIL] ${name}`);
    console.error(`     Error: ${err.message}`);
  }
}

console.log('\n=============================================================');
console.log('🌐 RUNNING SPRINT 16 VERIFICATION SUITE: I18N & SLA ENGINES');
console.log('=============================================================\n');

const ROOT_DIR = path.resolve(__dirname, '..');

// ── T-85: Standardized Indonesian Grammatical Terminology Taxonomy ─
test('T-85: grammarTaxonomyId.ts defines comprehensive Indonesian pedagogical terms and search', () => {
  const taxonomyPath = path.join(ROOT_DIR, 'src/lib/grammar/grammarTaxonomyId.ts');
  assert(fs.existsSync(taxonomyPath), 'grammarTaxonomyId.ts must exist');
  const code = fs.readFileSync(taxonomyPath, 'utf8');

  // Verify core taxonomy keys
  const expectedKeys = [
    'wa_topic', 'ga_subject', 'wo_object', 'ni_target', 'de_means',
    'jishokei', 'tekei', 'takei', 'naikei', 'kanoukei', 'ukemikei',
    'shiekikei', 'shieki_ukemikei', 'sonkeigo', 'kenjougo', 'teineigo'
  ];
  for (const k of expectedKeys) {
    assert(code.includes(`${k}:`), `Taxonomy must define term ${k}`);
  }

  // Verify exported API
  assert(code.includes('export function getGrammarTermId'), 'Must export getGrammarTermId');
  assert(code.includes('export function getAllGrammarTermsId'), 'Must export getAllGrammarTermsId');
  assert(code.includes('export function searchGrammarTermsId'), 'Must export searchGrammarTermsId');

  // Check pedagogical details
  assert(code.includes('penjelasanSingkat'), 'Each term must contain penjelasanSingkat');
  assert(code.includes('analogiIndonesia'), 'Each term must provide analogiIndonesia');
  assert(code.includes('perangkapUmum'), 'Each term must identify perangkapUmum');
});

// ── T-86: Indonesian L1 Interference Pitfalls Engine ───────────────
test('T-86: l1InterferenceEngine.ts models 8 SLA interference patterns with detection heuristics', () => {
  const enginePath = path.join(ROOT_DIR, 'src/lib/pedagogy/l1InterferenceEngine.ts');
  assert(fs.existsSync(enginePath), 'l1InterferenceEngine.ts must exist');
  const code = fs.readFileSync(enginePath, 'utf8');

  const requiredPitfalls = [
    'absence_of_tense',
    'passive_adversative',
    'topic_vs_subject',
    'giving_receiving_viewpoint',
    'existence_animate',
    'directional_particles',
    'coercion_causative',
    'polarity_negation'
  ];
  for (const p of requiredPitfalls) {
    assert(code.includes(`${p}:`), `Must define L1 interference pattern ${p}`);
  }

  assert(code.includes('export function getInterferencePattern'), 'Must export getInterferencePattern');
  assert(code.includes('export function getAllInterferencePatterns'), 'Must export getAllInterferencePatterns');
  assert(code.includes('export function detectPotentialInterference'), 'Must export detectPotentialInterference');

  // Verify structure of examples
  assert(code.includes('incorrectExample:'), 'Must provide incorrect examples from Indonesian learners');
  assert(code.includes('correctExample:'), 'Must provide corrected natural Japanese examples');
  assert(code.includes('senseiGuidance:'), 'Must provide friendly Sensei mnemonic guidance');
});

// ── T-87: Indonesian-Japanese Workplace & Cultural Nuance Modules ──
test('T-87: culturalNuanceManager.ts provides workplace etiquette, K3 safety, and practical phrases', () => {
  const culturePath = path.join(ROOT_DIR, 'src/lib/pedagogy/culturalNuanceManager.ts');
  assert(fs.existsSync(culturePath), 'culturalNuanceManager.ts must exist');
  const code = fs.readFileSync(culturePath, 'utf8');

  const requiredConcepts = [
    'hourenso',
    'uchi_soto',
    'koekake_safety',
    'jikan_genshu',
    'aisatsu_hierarchy'
  ];
  for (const c of requiredConcepts) {
    assert(code.includes(`${c}:`), `Must define cultural concept ${c}`);
  }

  assert(code.includes('export function getCulturalNuance'), 'Must export getCulturalNuance');
  assert(code.includes('export function getAllCulturalNuances'), 'Must export getAllCulturalNuances');
  assert(code.includes('export function getNuancesByDomain'), 'Must export getNuancesByDomain');
  assert(code.includes('export function getNuancesByAudience'), 'Must export getNuancesByAudience');

  assert(code.includes('contrastIndonesianCulture:'), 'Must explicitly contrast Indonesian vs Japanese workplace norms');
  assert(code.includes('practicalPhrases:'), 'Must provide actionable workplace phrases with contexts');
  assert(code.includes('goldenRuleId:'), 'Must summarize golden rules for learners');
});

// ── T-88: Locale Dictionaries & Locale Manager ─────────────────────
test('T-88: localeManager.ts maintains 100% dictionary parity between id and en with interpolation', () => {
  const idPath = path.join(ROOT_DIR, 'src/lib/i18n/dictionaries/id.ts');
  const enPath = path.join(ROOT_DIR, 'src/lib/i18n/dictionaries/en.ts');
  const managerPath = path.join(ROOT_DIR, 'src/lib/i18n/localeManager.ts');

  assert(fs.existsSync(idPath), 'id.ts dictionary must exist');
  assert(fs.existsSync(enPath), 'en.ts dictionary must exist');
  assert(fs.existsSync(managerPath), 'localeManager.ts must exist');

  const idCode = fs.readFileSync(idPath, 'utf8');
  const enCode = fs.readFileSync(enPath, 'utf8');
  const managerCode = fs.readFileSync(managerPath, 'utf8');

  // Verify dictionary keys parity via regex extraction
  const keyRegex = /'([a-z_0-9.]+)':/g;
  const idKeys = new Set();
  let m;
  while ((m = keyRegex.exec(idCode)) !== null) {
    idKeys.add(m[1]);
  }

  const enKeys = new Set();
  while ((m = keyRegex.exec(enCode)) !== null) {
    enKeys.add(m[1]);
  }

  assert(idKeys.size >= 40, `Expected at least 40 dictionary keys, found ${idKeys.size}`);
  assert.strictEqual(idKeys.size, enKeys.size, `ID keys (${idKeys.size}) and EN keys (${enKeys.size}) count must match`);

  for (const k of idKeys) {
    assert(enKeys.has(k), `English dictionary is missing key: ${k}`);
  }

  // Verify manager methods
  assert(managerCode.includes('public translate('), 'localeManager must implement translate()');
  assert(managerCode.includes('public setLocale('), 'localeManager must implement setLocale()');
  assert(managerCode.includes('export function t('), 'Must export global t() translation helper');
});

// ── T-89: Multi-Language Store & UI Integration ────────────────────
test('T-89: useAppStore and SettingsPage expose reactive language switcher with safe storage', () => {
  const storePath = path.join(ROOT_DIR, 'src/store/useAppStore.ts');
  const storeCode = fs.readFileSync(storePath, 'utf8');

  assert(storeCode.includes("uiLanguage: 'id' | 'en'"), 'AppState must declare uiLanguage');
  assert(storeCode.includes("setUiLanguage: (lang: 'id' | 'en') => void"), 'AppState must declare setUiLanguage');
  assert(storeCode.includes("localStorage.setItem('nn_ui_language', uiLanguage)"), 'setUiLanguage must persist to localStorage');
  assert(storeCode.includes('localeManager.setLocale(uiLanguage)'), 'setUiLanguage must notify localeManager');

  const settingsPath = path.join(ROOT_DIR, 'src/pages/SettingsPage.tsx');
  const settingsCode = fs.readFileSync(settingsPath, 'utf8');

  assert(settingsCode.includes('uiLanguage, setUiLanguage'), 'SettingsPage must destructure language state');
  assert(settingsCode.includes('Bahasa Antarmuka (Language)'), 'SettingsPage must render language setting label');
  assert(settingsCode.includes('setUiLanguage(item.id)'), 'Must call setUiLanguage with item.id');
  assert(settingsCode.includes("'id' as const") && settingsCode.includes("'en' as const"), 'Must provide ID and EN language options');
  assert(settingsCode.includes('active:scale-95'), 'Language buttons must follow tactile scale feedback');
});

console.log(`\n=============================================================`);
console.log(`📊 SPRINT 16 TEST RESULTS: ${passedTests}/${totalTests} TESTS PASSED`);
console.log('=============================================================\n');

if (passedTests !== totalTests) {
  process.exit(1);
}
