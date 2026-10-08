#!/usr/bin/env node
// ══════════════════════════════════════════════════════
//  Nugget Nihongo — Runtime Engine Test Suite
//  Verifies engines, question generators, FSRS, storage,
//  and UI renderers in a simulated browser environment.
// ══════════════════════════════════════════════════════

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
let pass = 0, fail = 0;

function assert(condition, msg) {
  if (condition) {
    pass++;
    // console.log('  PASS:', msg);
  } else {
    fail++;
    console.error('  FAIL:', msg);
  }
}

// ── Environment Mocks ────────────────────────────────
global.window = global;

const storageStore = {};
global.localStorage = {
  getItem: (k) => storageStore[k] || null,
  setItem: (k, v) => { storageStore[k] = String(v); },
  removeItem: (k) => { delete storageStore[k]; },
  clear: () => { Object.keys(storageStore).forEach(k => delete storageStore[k]); }
};

const sessionStore = {};
global.sessionStorage = {
  getItem: (k) => sessionStore[k] || null,
  setItem: (k, v) => { sessionStore[k] = String(v); },
  removeItem: (k) => { delete sessionStore[k]; },
  clear: () => { Object.keys(sessionStore).forEach(k => delete sessionStore[k]); }
};

// Minimal DOM Element Mock
function createMockElement(id = '', tag = 'div') {
  const el = {
    id: id,
    tagName: tag.toUpperCase(),
    innerHTML: '',
    textContent: '',
    style: {},
    classList: {
      _classes: new Set(),
      add: (c) => el.classList._classes.add(c),
      remove: (c) => el.classList._classes.delete(c),
      toggle: (c, force) => {
        if (force === undefined) {
          if (el.classList._classes.has(c)) el.classList._classes.delete(c);
          else el.classList._classes.add(c);
        } else if (force) {
          el.classList._classes.add(c);
        } else {
          el.classList._classes.delete(c);
        }
      },
      contains: (c) => el.classList._classes.has(c)
    },
    dataset: {},
    children: [],
    appendChild: (child) => { el.children.push(child); return child; },
    removeChild: (child) => {
      const idx = el.children.indexOf(child);
      if (idx !== -1) el.children.splice(idx, 1);
      return child;
    },
    addEventListener: () => {},
    removeEventListener: () => {},
    focus: () => {},
    querySelector: (sel) => {
      const cls = sel.startsWith('.') ? sel.slice(1) : '';
      const found = el.children.find(c => cls && c.classList && c.classList.contains(cls));
      if (found) return found;
      const sub = createMockElement('', 'div');
      if (cls) sub.classList.add(cls);
      el.children.push(sub);
      return sub;
    },
    querySelectorAll: () => []
  };
  return el;
}

const domElements = {};
function getOrCreateElement(id) {
  if (!domElements[id]) {
    domElements[id] = createMockElement(id);
  }
  return domElements[id];
}

global.document = {
  getElementById: (id) => getOrCreateElement(id),
  querySelector: (sel) => {
    if (sel.startsWith('#')) return getOrCreateElement(sel.slice(1));
    return createMockElement('', sel);
  },
  querySelectorAll: () => [],
  createElement: (tag) => createMockElement('', tag),
  body: createMockElement('body', 'body'),
  addEventListener: () => {},
  removeEventListener: () => {}
};

global.navigator = { onLine: true, userAgent: 'NodeTestRunner' };
global.requestAnimationFrame = (cb) => setTimeout(cb, 0);
global.cancelAnimationFrame = () => {};
global.alert = () => {};


// ── File Evaluator ───────────────────────────────────
function loadScript(relPath) {
  const full = path.join(ROOT, 'public', relPath);
  if (!fs.existsSync(full)) {
    throw new Error(`Script not found: ${relPath}`);
  }
  const code = fs.readFileSync(full, 'utf8');
  try {
    eval(code);
  } catch (err) {
    console.error(`Error evaluating ${relPath}:`, err);
    throw err;
  }
}

console.log('🚀 Nugget Nihongo Engine Runtime Test Suite\n');

// 1. Load Data
console.log('1. Loading vocabulary and grammar databases...');
loadScript('data/vocab/vocab-n5.js');
loadScript('data/vocab/vocab-n4.js');
loadScript('data/vocab/vocab-n3.js');
loadScript('data/grammar/grammar-n5.js');
loadScript('data/grammar/grammar-n4.js');
loadScript('data/grammar/grammar-n3.js');
loadScript('data/books/book-minna-1.js');
loadScript('data/books/book-minna-2.js');
loadScript('data/books/book-irodori-a1.js');
loadScript('data/books/book-irodori-a2-1.js');
loadScript('data/books/book-irodori-a2-2.js');
loadScript('data/books/sources.js');
loadScript('data/vocab/vocab-index.js');
loadScript('data/grammar/grammar-index.js');

assert(window.vocabDB && window.vocabDB.length > 0, 'vocabDB populated');
assert(window.grammarDB && window.grammarDB.length > 0, 'grammarDB populated');
assert(window.bookIrodoriA21 && window.bookIrodoriA2_1, 'Irodori A2-1 dual export available');
assert(window.bookIrodoriA22 && window.bookIrodoriA2_2, 'Irodori A2-2 dual export available');

// 2. State & Core Modules
console.log('2. Testing Core State & Theme modules...');
loadScript('js/core/state.js');
loadScript('js/core/theme.js');

assert(window.progress && typeof window.progress === 'object', 'window.progress initialized');
assert(window.bookmarks instanceof Set, 'window.bookmarks initialized as Set');
assert(typeof window.loadStorage === 'function', 'window.loadStorage exported');
assert(typeof window.saveProgress === 'function', 'window.saveProgress exported');
assert(typeof window.loadTheme === 'function', 'window.loadTheme exported');
assert(typeof window.toggleTheme === 'function', 'window.toggleTheme exported');

// Test saving and loading state
window.saveProgress('gn5-00001', 'know');
assert(window.progress['gn5-00001'] === 'know', 'saveProgress updates window.progress');
window.loadStorage();
assert(window.progress['gn5-00001'] === 'know', 'loadStorage recovers saved progress');


// 3. Backup & Restore Keys
console.log('3. Testing Backup-Restore configuration...');
loadScript('js/backup-restore.js');
assert(Array.isArray(window.USER_DATA_KEYS), 'USER_DATA_KEYS is defined');
assert(window.USER_DATA_KEYS.includes('nn_starting_level'), 'USER_DATA_KEYS includes nn_starting_level');
assert(window.USER_DATA_KEYS.includes('nn_onboarded'), 'USER_DATA_KEYS includes nn_onboarded');
assert(window.USER_DATA_KEYS.includes('nn_goals'), 'USER_DATA_KEYS includes nn_goals');
assert(window.USER_DATA_KEYS.includes('nn_user_profile'), 'USER_DATA_KEYS includes nn_user_profile');

// 4. Conjugation Engine
console.log('4. Testing Conjugation Engine...');
loadScript('js/conjugation-engine.js');
assert(typeof window.conjugate === 'function', 'window.conjugate exists');
assert(typeof window.ConjugationEngine === 'object', 'window.ConjugationEngine exists');

// 4a. Basic Conjugations
const taberuTe = window.conjugate('食べる', 'te', { type: 'ichidan' });
assert(taberuTe === '食べて', `食べる te-form should be 食べて, got ${taberuTe}`);
const ikuTa = window.conjugate('行く', 'ta', { type: 'godan' });
assert(ikuTa === '行った', `行く ta-form should be 行った, got ${ikuTa}`);
const kuruNai = window.conjugate('来る', 'nai', { type: 'kuru' });
assert(kuruNai === '来ない', `来る nai-form should be 来ない, got ${kuruNai}`);

// 4b. Single Kanji Ichidan Verbs
assert(window.conjugate('見る', 'te') === '見て', '見る te-form is 見て');
assert(window.conjugate('見る', 'nai') === '見ない', '見る nai-form is 見ない');
assert(window.conjugate('見る', 'potential') === '見られる', '見る potential is 見られる');
assert(window.conjugate('出る', 'te') === '出て', '出る te-form is 出て');
assert(window.conjugate('出る', 'masu') === '出ます', '出る masu-form is 出ます');
assert(window.conjugate('寝る', 'te') === '寝て', '寝る te-form is 寝て');
assert(window.conjugate('着る', 'te') === '着て', '着る te-form is 着て');
assert(window.conjugate('似る', 'nai') === '似ない', '似る nai-form is 似ない');

// 4c. Special Honorific Verbs (-i stem shift)
assert(window.conjugate('くださる', 'masu') === 'くださいます', 'くださる masu-form is くださいます');
assert(window.conjugate('くださる', 'imperative') === 'ください', 'くださる imperative is ください');
assert(window.conjugate('なさる', 'masu') === 'なさいます', 'なさる masu-form is なさいます');
assert(window.conjugate('いらっしゃる', 'masu') === 'いらっしゃいます', 'いらっしゃる masu-form is いらっしゃいます');
assert(window.conjugate('おっしゃる', 'masu') === 'おっしゃいます', 'おっしゃる masu-form is おっしゃいます');

// 4d. Compound iku & kuru Verbs
assert(window.conjugate('持っていく', 'te') === '持っていって', '持っていく te-form is 持っていって');
assert(window.conjugate('連れて行く', 'te') === '連れて行って', '連れて行く te-form is 連れて行って');
assert(window.conjugate('持ってくる', 'te') === '持ってきて', '持ってくる te-form is 持ってきて');
assert(window.conjugate('連れて来る', 'te') === '連れて来て', '連れて来る te-form is 連れて来て');

// 4e. Compound ii Adjectives
assert(window.conjugate('いい', 'adj-nai') === 'よくない', 'いい negative is よくない');
assert(window.conjugate('かっこいい', 'adj-nai') === 'かっこよくない', 'かっこいい negative is かっこよくない');
assert(window.conjugate('かっこいい', 'adj-katta') === 'かっこよかった', 'かっこいい past is かっこよかった');
assert(window.conjugate('頭がいい', 'adj-kute') === '頭がよくて', '頭がいい te-form is 頭がよくて');

// 4f. Short Causative-Passive
assert(window.conjugate('書く', 'causpass_short') === '書かされる', '書く short caus-pass is 書かされる');
assert(window.conjugate('飲む', 'causpass_short') === '飲まされる', '飲む short caus-pass is 飲まされる');
assert(window.conjugate('話す', 'causpass_short') === '話させられる', '話す blocks double-sa (話させられる)');

// 4g. Extended Godan Exceptions
assert(window.conjugate('帰る', 'te') === '帰って', '帰る te-form is 帰って');
assert(window.conjugate('帰る', 'nai') === '帰らない', '帰る nai-form is 帰らない');
assert(window.conjugate('切る', 'te') === '切って', '切る te-form is 切って');
assert(window.conjugate('知る', 'masu') === '知ります', '知る masu-form is 知ります');
assert(window.conjugate('入る', 'te') === '入って', '入る te-form is 入って');
assert(window.conjugate('走る', 'potential') === '走れる', '走る potential is 走れる');

// 4h. Extended Verb Forms
assert(window.conjugate('飲む', 'zuni') === '飲まずに', '飲む formal neg without is 飲まずに');
assert(window.conjugate('食べる', 'tai_neg') === '食べたくない', '食べる desiderative neg is 食べたくない');
assert(window.conjugate('飲む', 'yasui') === '飲みやすい', '飲む easy-to is 飲みやすい');
assert(window.conjugate('食べる', 'sugiru') === '食べすぎる', '食べる excessive is 食べすぎる');

// 4i. SLA Contrastive Distractors
const testDistractors = window.ConjugationEngine.generateDistractors('飲む', 'te');
assert(Array.isArray(testDistractors) && testDistractors.length === 3, 'generateDistractors returns 3 choices');
assert(!testDistractors.includes('飲んで'), 'generateDistractors does not include correct answer');

// 4j. Conjugation Semantics & Sentence Examples (explain & inspectAll)
const expPotential = window.ConjugationEngine.explain('食べる', 'potential');
assert(expPotential && expPotential.conjugated === '食べられる', 'explain returns conjugated string');
assert(expPotential.formLabelId.includes('Potensial'), 'explain includes Indonesian functional label');
assert(expPotential.meaning_formula.includes('Bisa'), 'explain includes Indonesian formula');
assert(typeof expPotential.particle_rule === 'string' && expPotential.particle_rule.includes('が'), 'explain includes particle shift advice');
assert(expPotential.example && typeof expPotential.example.jp === 'string', 'explain includes Japanese example sentence');
assert(expPotential.example && typeof expPotential.example.id === 'string', 'explain includes Indonesian example translation');

const allExplained = window.ConjugationEngine.inspectAll('食べる');
assert(Array.isArray(allExplained) && allExplained.length >= 25, `inspectAll returns full forms matrix (got: ${allExplained.length})`);
const causpassExp = allExplained.find(f => f.formKey === 'causpass_short');
assert(causpassExp && causpassExp.formLabelId.includes('Kausatif-Pasif'), 'inspectAll includes causpass_short semantics');

// 4k. Japanese Particle Engine (助詞)
console.log('4k. Testing Japanese Particle Engine...');
loadScript('js/particle-engine.js');
assert(typeof window.ParticleEngine === 'object', 'window.ParticleEngine exists');

// 4k-1. Single particle lookup & polysemy
const niLookup = window.ParticleEngine.lookup('に');
assert(niLookup && niLookup.type === 'single', 'lookup single particle に');
assert(Array.isArray(niLookup.senses) && niLookup.senses.length >= 6, `に has rich polysemy senses (got: ${niLookup.senses.length})`);
assert(niLookup.senses.some(s => s.sense_id === 'ni-existence'), 'に includes existence sense (住む/ある/いる)');
assert(niLookup.senses.some(s => s.sense_id === 'ni-passive-agent'), 'に includes passive agent sense');

// 4k-2. Combined particle decomposition (kasane-joshi)
const nihaLookup = window.ParticleEngine.lookup('には');
assert(nihaLookup && nihaLookup.type === 'combined', 'lookup combined particle には');
assert(Array.isArray(nihaLookup.components) && nihaLookup.components.length === 2, 'には decomposed into components');
assert(typeof nihaLookup.nuance_breakdown === 'string', 'には includes nuance breakdown');

const dehaLookup = window.ParticleEngine.lookup('では');
assert(dehaLookup && dehaLookup.colloquial_contraction === 'じゃ (ja) — misal: これでは困る -> これじゃ困る', 'では includes colloquial contraction note (じゃ)');

const denoLookup = window.ParticleEngine.lookup('での');
assert(denoLookup && denoLookup.stacking_rule.includes('での'), 'での includes adnominal stacking rule');

// 4k-3. Contrastive confusion pairs
const waGaComp = window.ParticleEngine.compare('は', 'が');
assert(waGaComp && Array.isArray(waGaComp.contrast_points), 'compare は vs が returns contrast points');
assert(typeof waGaComp.decision_flow === 'string', 'compare は vs が includes decision flowchart');

const niDeComp = window.ParticleEngine.compare('に', 'で');
assert(niDeComp && niDeComp.title.includes('に') && niDeComp.title.includes('で'), 'compare に vs で returns contrast points');

// 4k-4. Compound grammar evolution mapping
const niPatterns = window.ParticleEngine.getCompoundPatterns('に');
assert(Array.isArray(niPatterns) && niPatterns.some(p => p.pattern === 'について'), 'getCompoundPatterns(に) includes について');
assert(niPatterns.some(p => p.pattern === 'にとって'), 'getCompoundPatterns(に) includes にとって');
assert(niPatterns.some(p => p.pattern === 'に対して'), 'getCompoundPatterns(に) includes に対して');

const oPatterns = window.ParticleEngine.getCompoundPatterns('を');
assert(Array.isArray(oPatterns) && oPatterns.some(p => p.pattern === 'を通じて'), 'getCompoundPatterns(を) includes を通じて');

// 4k-5. L1 Indonesian error diagnosis
const errDeSumu = window.ParticleEngine.diagnose('で', 'バリ島で住んでいます');
assert(errDeSumu && errDeSumu.severity === 'error' && errDeSumu.correction === 'に', 'diagnose flags で + 住む error and suggests に');

const errNiBenkyou = window.ParticleEngine.diagnose('に', '図書館に勉強します');
assert(errNiBenkyou && errNiBenkyou.severity === 'error' && errNiBenkyou.correction === 'で', 'diagnose flags に + 勉強する error and suggests で');

const warnOPotential = window.ParticleEngine.diagnose('を', '日本語を話せます');
assert(warnOPotential && warnOPotential.severity === 'warning' && warnOPotential.correction === 'が', 'diagnose flags を + 話せる and suggests が');

// 4k-6. Sentence context analyzer
const sentenceScan = window.ParticleEngine.analyzeSentence('私は毎日7時に起きて、バスで学校へ行きます。');
assert(Array.isArray(sentenceScan) && sentenceScan.length >= 4, `analyzeSentence extracts particles from sentence (got: ${sentenceScan.length})`);
assert(sentenceScan.some(p => p.particle === 'は'), 'analyzeSentence detected は');
assert(sentenceScan.some(p => p.particle === 'に'), 'analyzeSentence detected に');
assert(sentenceScan.some(p => p.particle === 'で'), 'analyzeSentence detected で');
assert(sentenceScan.some(p => p.particle === 'へ'), 'analyzeSentence detected へ');

// 4k-7. Expanded Single & Combined Particles, Pairs, & Diagnostics
const yoriLookup = window.ParticleEngine.lookup('より');
assert(yoriLookup && yoriLookup.senses && yoriLookup.senses.length >= 2, 'lookup single particle より');
const hodoLookup = window.ParticleEngine.lookup('ほど');
assert(hodoLookup && hodoLookup.category === 'fukujoshi', 'lookup single particle ほど (fukujoshi)');
const noniLookup = window.ParticleEngine.lookup('のに');
assert(noniLookup && noniLookup.category === 'setsuzokujoshi', 'lookup single particle のに (setsuzokujoshi)');
const saemoLookup = window.ParticleEngine.lookup('さえも');
assert(saemoLookup && saemoLookup.type === 'combined', 'lookup combined particle さえも');
const bakariLookup = window.ParticleEngine.lookup('ばかりか');
assert(bakariLookup && bakariLookup.type === 'combined', 'lookup combined particle ばかりか');

const karaNodeComp = window.ParticleEngine.compare('から', 'ので');
assert(karaNodeComp && karaNodeComp.contrast_points.length >= 2, 'compare から vs ので returns contrast points');
const noniTemoComp = window.ParticleEngine.compare('のに', 'ても');
assert(noniTemoComp && noniTemoComp.title.includes('のに'), 'compare のに vs ても returns contrast points');

const errShika = window.ParticleEngine.diagnose('しか', '千円しかあります');
assert(errShika && errShika.severity === 'error' && errShika.correction.includes('だけ'), 'diagnose flags しか + 肯定文 error');
const errTomodachiO = window.ParticleEngine.diagnose('を', '友達を会います');
assert(errTomodachiO && errTomodachiO.severity === 'error' && errTomodachiO.correction.includes('に'), 'diagnose flags 友達を会う and suggests に');

// 4k-8. Morphological Boundary Tokenizer & False-Positive Immunity
const tokensA = window.ParticleEngine.tokenize('はい、映画が好きです。');
assert(tokensA.some(t => t.text === 'はい' && t.type === 'word'), 'Tokenizer protects は inside はい');
assert(tokensA.some(t => t.text === '映画' && t.type === 'word'), 'Tokenizer protects が inside 映画');
assert(tokensA.some(t => t.text === 'が' && t.type === 'particle'), 'Tokenizer identifies standalone が as particle');
assert(!tokensA.some(t => t.text === 'で' && t.type === 'particle'), 'Tokenizer prevents で inside です from false particle match');

// 4k-9. HTML Breakdown with Visual Spacers & Tag Protection
const bdA = window.ParticleEngine.breakdownHtml('はい、先生と話します。');
assert(!bdA.includes('<span class="bd-particle">は</span>い'), 'breakdownHtml does NOT slice はい into は + い');
assert(bdA.includes('<span class="bd-particle">と</span>'), 'breakdownHtml highlights と as particle');
assert(!bdA.includes('<span class="bd-particle">し</span>'), 'breakdownHtml does NOT slice 話します okurigana');

const bdB = window.ParticleEngine.breakdownHtml('私は学生です。');
assert(bdB.includes('<span class="bd-particle">は</span>'), 'breakdownHtml highlights は in 私は');
assert(!bdB.includes('<span class="bd-particle">で</span>す'), 'breakdownHtml does NOT slice です into で + す');

const bdC = window.ParticleEngine.breakdownHtml('昨日、友達と手紙を書きました。');
assert(!bdC.includes('<span class="bd-particle">の</span>'), 'breakdownHtml does NOT highlight の in 昨日');
assert(!bdC.includes('<span class="bd-particle">て</span>'), 'breakdownHtml does NOT slice 手紙 (て)');
assert(bdC.includes('<span class="bd-particle">と</span>') && bdC.includes('<span class="bd-particle">を</span>'), 'breakdownHtml highlights both と and を');

const bdTags = window.ParticleEngine.breakdownHtml('<b>映画</b>が好きです。');
assert(bdTags.includes('<b>映画</b>'), 'breakdownHtml preserves existing <b> tag intact');
assert(bdTags.includes('<span class="bd-particle">が</span>'), 'breakdownHtml highlights particle outside <b> tag');

// 4k-10. quiz-feedback.js buildBreakdownSafe integration
loadScript('js/quiz-feedback.js');
assert(typeof window.buildBreakdownSafe === 'function', 'buildBreakdownSafe exported');
const feedbackBd = window.buildBreakdownSafe('はい、<b>映画</b>が好きです。');
assert(!feedbackBd.includes('<span class="bd-particle">は</span>い'), 'buildBreakdownSafe protects はい');
assert(feedbackBd.includes('<b>映画</b>'), 'buildBreakdownSafe preserves <b> tag');
assert(feedbackBd.includes('<span class="bd-particle">が</span>'), 'buildBreakdownSafe highlights particle が');

// 5. Quiz Engine v2 Question Generators
console.log('5. Testing Quiz Engine v2 Question Generation...');
loadScript('js/quiz-engine-v2.js');
assert(typeof window.quizEngine === 'object', 'window.quizEngine exists');

// 5a. Fill-in questions
const fillinList = window.quizEngine.generate({ type: 'fill_in', level: 'n5', n: 5 });
assert(Array.isArray(fillinList) && fillinList.length > 0, 'Generated fill_in questions list');
const fillinQ = fillinList[0];
assert(typeof fillinQ.question === 'string', 'fill_in has question prompt');
assert(Array.isArray(fillinQ.options) && fillinQ.options.length === 4, 'fill_in has 4 options');
assert(typeof fillinQ.answer === 'number' && fillinQ.answer >= 0 && fillinQ.answer < 4, 'fill_in has valid answer index');

// 5b. Rearrange questions (JLPT Star Format)
const rearrangeList = window.quizEngine.generate({ type: 'rearrange', level: 'n5', n: 5 });
assert(Array.isArray(rearrangeList) && rearrangeList.length > 0, 'Generated rearrange questions list');
const rearrangeQ = rearrangeList[0];
assert(typeof rearrangeQ.sentence === 'string', 'rearrange has sentence template');
const sentenceBlanks = rearrangeQ.sentence.split('_____');
assert(sentenceBlanks.length === 5, `rearrange sentence has exactly 4 blank slots (split length 5, got ${sentenceBlanks.length})`);
assert(Array.isArray(rearrangeQ.parts) && rearrangeQ.parts.length === 4, 'rearrange has 4 scrambled parts');
assert(Array.isArray(rearrangeQ.answer) && rearrangeQ.answer.length === 4, 'rearrange has answer permutation of 4 indices');
assert(typeof rearrangeQ.star_pos === 'number' && rearrangeQ.star_pos >= 0 && rearrangeQ.star_pos <= 3, `star_pos in range [0, 3] (got ${rearrangeQ.star_pos})`);
assert(typeof rearrangeQ.display_solution === 'string' && rearrangeQ.display_solution.length > 0, 'rearrange has display_solution');

// 5c. Conjugation questions
const conjList = window.quizEngine.generate({ type: 'conjugation', level: 'n5', n: 5 });
assert(Array.isArray(conjList) && conjList.length > 0, 'Generated conjugation questions list');
const conjQ = conjList[0];
assert(typeof conjQ.question === 'string' && conjQ.question.includes('Bentuk'), 'conjugation prompt specifies target form');
assert(Array.isArray(conjQ.options) && conjQ.options.length === 4, 'conjugation has 4 options');
assert(typeof conjQ.answer === 'number' && conjQ.answer >= 0 && conjQ.answer < 4, 'conjugation answer index valid');

// 5d. Translation questions
const transList = window.quizEngine.generate({ type: 'translation', level: 'n5', n: 5 });
assert(Array.isArray(transList) && transList.length > 0, 'Generated translation questions list');
const transQ = transList[0];
assert(typeof transQ.question === 'string' && transQ.question.length > 0, 'translation has Indonesian prompt');
assert(Array.isArray(transQ.options) && transQ.options.length === 4, 'translation has 4 Japanese options');

// 5e. Error Find questions
const errList = window.quizEngine.generate({ type: 'error_find', level: 'n5', n: 5 });
assert(Array.isArray(errList) && errList.length > 0, 'Generated error_find questions list');
const errQ = errList[0];
assert(typeof errQ.question === 'string', 'error_find has question prompt');
assert(Array.isArray(errQ.options) && errQ.options.length === 4, 'error_find has 4 options');

// 5f. Banks accessors
assert(Array.isArray(window.quizEngine.getRearrangeBank()) && window.quizEngine.getRearrangeBank().length > 0, 'getRearrangeBank returns items');
assert(Array.isArray(window.quizEngine.getConjugationBank()) && window.quizEngine.getConjugationBank().length > 0, 'getConjugationBank returns items');
assert(Array.isArray(window.quizEngine.getTranslationBank()) && window.quizEngine.getTranslationBank().length > 0, 'getTranslationBank returns items');
assert(Array.isArray(window.quizEngine.getErrorFindBank()) && window.quizEngine.getErrorFindBank().length > 0, 'getErrorFindBank returns items');
assert(Array.isArray(window.quizEngine.getMultiChoiceBank()) && window.quizEngine.getMultiChoiceBank().length > 0, 'getMultiChoiceBank returns items');

// 6. FSRS Engine and SRS Due calculations
console.log('6. Testing FSRS Engine & Math...');
loadScript('js/fsrs-math.js');
loadScript('js/fsrs-engine.js');

assert(typeof window.fsrsForgettingCurve === 'function', 'fsrsForgettingCurve function exists');
assert(typeof window.fsrsNextInterval === 'function', 'fsrsNextInterval function exists');
assert(typeof window.fsrsCalculate === 'function', 'fsrsCalculate function exists');
assert(typeof window.fsrsPredictNext === 'function', 'fsrsPredictNext function exists');
assert(typeof window.srsLevelMastery === 'function', 'srsLevelMastery function exists');

// 6a. FSRS Mathematical Parity & Inverse Precision
const rAtZero = window.fsrsForgettingCurve(0, 10);
assert(rAtZero === 1.0, `Retrievability at t=0 is 1.0 (got ${rAtZero})`);
const rAtStability = window.fsrsForgettingCurve(10, 10);
assert(Math.abs(rAtStability - 0.90) < 0.001, `Retrievability at t=S is exactly 0.90 (got ${rAtStability})`);
const intervalAtTargetR = window.fsrsNextInterval(10, 0.90);
assert(intervalAtTargetR === 10, `Next interval at target retention 0.90 equals stability (got ${intervalAtTargetR})`);

// 6b. Standalone FSRS Calculation
const now = new Date();
const newCardCalc = window.fsrsCalculate({ state: 0 }, 3, now); // Rating 3 = Good
assert(newCardCalc.stability > 2.5 && newCardCalc.stability < 4.0, `Initial Good stability ~3.17d (got ${newCardCalc.stability})`);
assert(newCardCalc.interval >= 3, `Initial Good interval >= 3d (got ${newCardCalc.interval})`);

// 6c. Matsunaga Kanji Prior Calibration
const kanjiCalc = window.fsrsCalculate({ state: 0, word: '漢字' }, 3, now, { is_kanji: true });
const kanaCalc = window.fsrsCalculate({ state: 0, word: 'ひらがな' }, 3, now, { is_kanji: false });
assert(kanjiCalc.difficulty > kanaCalc.difficulty, `Matsunaga prior: Kanji difficulty (${kanjiCalc.difficulty}) > Kana difficulty (${kanaCalc.difficulty})`);

// 6d. 4-Button Next Interval Prediction (fsrsPredictNext)
const nextPreds = window.fsrsPredictNext('gn5-00001');
assert(nextPreds[1] && nextPreds[2] && nextPreds[3] && nextPreds[4], 'fsrsPredictNext returns predictions for ratings 1-4');
assert(nextPreds[1].interval <= nextPreds[2].interval, 'Again interval <= Hard interval');
assert(nextPreds[2].interval <= nextPreds[3].interval, 'Hard interval <= Good interval');
assert(nextPreds[3].interval <= nextPreds[4].interval, 'Good interval <= Easy interval');
assert(typeof nextPreds[3].intervalStr === 'string', 'Prediction includes intervalStr (e.g. 3d)');

// 6e. Card review & updates
window.srsReview('gn5-00001', 'know');
assert(window.srsData['gn5-00001'] !== undefined, 'srsReview creates card entry in srsData');
assert(window.srsData['gn5-00001'].card.reps >= 1, 'Card review increments reps count');
const status = window.srsStatus('gn5-00001');
assert(status !== 'new', 'Reviewed card status changed from new (got: ' + status + ')');
const srsStats = window.srsStats();
assert(srsStats.total >= 1, 'srsStats reflects reviewed card total');

// 6e-2. String rating disambiguation ('forgot' -> 1 Again, 'unsure' -> 2 Hard)
window.srsReview('gn5-00002', 'forgot');
assert(window.srsData['gn5-00002'].history.slice(-1)[0].rating === 1, 'srsReview maps "forgot" to rating 1 (Again)');
window.srsReview('gn5-00003', 'unsure');
assert(window.srsData['gn5-00003'].history.slice(-1)[0].rating === 2, 'srsReview maps "unsure" to rating 2 (Hard)');

// 6e-3. Automatic FSRS feed from saveProgress across all quiz modes
window.saveProgress('gn5-00004', 'know');
assert(window.srsData['gn5-00004'] !== undefined, 'saveProgress automatically updates FSRS srsData');
assert(window.srsData['gn5-00004'].history.slice(-1)[0].rating === 3, 'saveProgress maps "know" to rating 3 (Good) in FSRS');

// 6f. Level Ladder Mastery Engine
const n5Mastery = window.srsLevelMastery('n5');
assert(n5Mastery && n5Mastery.total_cards > 0, `srsLevelMastery returns N5 metrics (total: ${n5Mastery.total_cards})`);
assert(n5Mastery.gates && typeof n5Mastery.gates.vocab_gate === 'object', 'srsLevelMastery includes vocab_gate');
assert(n5Mastery.gates && typeof n5Mastery.gates.grammar_gate === 'object', 'srsLevelMastery includes grammar_gate');
assert(n5Mastery.gates && typeof n5Mastery.gates.milestone_gate === 'object', 'srsLevelMastery includes milestone_gate');

// 7. Unified Quick Review Card Renderer in quiz.js
console.log('7. Testing Unified Quick Review Card Renderer...');
loadScript('js/quiz.js');
assert(typeof window.showQuizCard === 'function', 'showQuizCard exposed');

// Grammar card rendering
const grammarCard = window.grammarDB[0];
try {
  window.startQuiz([grammarCard]);
  const qGrammar = document.getElementById('qGrammar');
  const qMeaning = document.getElementById('qMeaning');
  assert(qGrammar.textContent.includes(grammarCard.pattern || grammarCard.grammar), 'Grammar flashcard renders pattern');
  assert(qMeaning.textContent.includes(grammarCard.meaning), 'Grammar flashcard renders meaning');
} catch (e) {
  assert(false, 'showQuizCard (Grammar) threw: ' + e.message);
}

// Vocab card rendering
const vocabCard = window.vocabDB[0];
try {
  window.startQuiz([vocabCard]);
  const qGrammar = document.getElementById('qGrammar');
  const qMeaning = document.getElementById('qMeaning');
  assert(qGrammar.textContent.includes(vocabCard.word), 'Vocab flashcard renders word');
  assert(qMeaning.textContent.includes(vocabCard.meaning_id || vocabCard.meaning), 'Vocab flashcard renders meaning_id');
} catch (e) {
  assert(false, 'showQuizCard (Vocab) threw: ' + e.message);
}

// 8. Sub-quiz engine files instantiation (const-assignment safety)
console.log('8. Testing Sub-quiz Controllers (Re-assignment safety)...');
loadScript('js/conjugation.js');
loadScript('js/errorfind.js');
loadScript('js/translation.js');
loadScript('js/multichoice.js');
loadScript('js/fillin.js');

assert(typeof window.conjNext === 'function', 'window.conjNext exposed');
assert(typeof window.efAnswer === 'function', 'window.efAnswer exposed');
assert(typeof window.transAnswer === 'function', 'window.transAnswer exposed');
assert(typeof window.mcAnswer === 'function', 'window.mcAnswer exposed');
assert(typeof window.fillAnswer === 'function', 'window.fillAnswer exposed');
assert(typeof window.reaNext === 'function', 'window.reaNext exposed');
assert(typeof window.startQuiz === 'function', 'window.startQuiz composed by sub-quizzes');

// Test that calling startQuiz in each mode does not throw Assignment to constant variable
global.quizLevel = 'n5';
global.quizWeek = 1;

try {
  global.quizMode = 'conjugation';
  window.startQuiz([]);
  assert(true, 'startQuiz in conjugation mode runs without assignment error');
} catch (e) {
  assert(false, 'startQuiz (conjugation) threw: ' + e.message);
}

try {
  global.quizMode = 'errorfind';
  window.startQuiz([]);
  assert(true, 'startQuiz in errorfind mode runs without assignment error');
} catch (e) {
  assert(false, 'startQuiz (errorfind) threw: ' + e.message);
}

try {
  global.quizMode = 'translation';
  window.startQuiz([]);
  assert(true, 'startQuiz in translation mode runs without assignment error');
} catch (e) {
  assert(false, 'startQuiz (translation) threw: ' + e.message);
}

try {
  global.quizMode = 'multichoice';
  window.startQuiz([]);
  assert(true, 'startQuiz in multichoice mode runs without assignment error');
} catch (e) {
  assert(false, 'startQuiz (multichoice) threw: ' + e.message);
}

try {
  global.quizMode = 'fill';
  window.startQuiz([]);
  assert(true, 'startQuiz in fill mode runs without assignment error');
} catch (e) {
  assert(false, 'startQuiz (fill) threw: ' + e.message);
}

// 9. Browse & Hero Due Count
console.log('9. Testing Browse and Hero Due Count...');
loadScript('js/browse.js');
assert(typeof window.updateHeroDueCount === 'function', 'updateHeroDueCount exists');
assert(typeof window.updateProgressPanel === 'function', 'updateProgressPanel exists');
assert(typeof window.updateQuickReviewCard === 'function', 'updateQuickReviewCard exists');

// Verify calling them without DOM crashes
try {
  window.updateProgressPanel();
  window.updateQuickReviewCard();
  window.updateHeroDueCount();
  const heroCount = document.getElementById('latihanHeroDueCount');
  assert(heroCount.textContent.length > 0, 'Hero count element has text content: ' + heroCount.textContent);
} catch (e) {
  assert(false, 'Progress/Hero updates threw: ' + e.message);
}

// 10. AI Proxy Client
console.log('10. Testing AI Proxy Client...');
loadScript('js/ai-proxy.js');
assert(window.aiProxy && typeof window.aiProxy.ask === 'function', 'aiProxy.ask is a function');
assert(typeof window.aiProxy.getWorkerURL === 'function', 'aiProxy.getWorkerURL is a function');
assert(window.aiProxy.getWorkerURL().includes('workers.dev'), 'Default worker URL points to Cloudflare Worker');

// 11. Interactive SLA Lexicon Engine
console.log('11. Testing Interactive SLA Lexicon Engine...');
loadScript('js/lexicon-engine.js');
assert(typeof window.LexiconEngine === 'object', 'window.LexiconEngine exists');
assert(typeof window.LexiconEngine.lookup === 'function', 'LexiconEngine.lookup is a function');
assert(typeof window.LexiconEngine.segment === 'function', 'LexiconEngine.segment is a function');
assert(typeof window.LexiconEngine.renderInteractive === 'function', 'LexiconEngine.renderInteractive is a function');

// 11a. Vocab Lookup
const nihonInfo = window.LexiconEngine.lookup('日本');
assert(nihonInfo && nihonInfo.type === 'vocab', 'lookup base vocab 日本');
assert(nihonInfo.meaning_id && nihonInfo.meaning_id.includes('Jepang'), 'lookup 日本 returns Indonesian translation');

// 11b. De-conjugation / Inflection Lookup
const kakimashitaInfo = window.LexiconEngine.lookup('書きました');
assert(kakimashitaInfo && kakimashitaInfo.type === 'inflection', 'lookup inflected 書きました returns inflection type');
assert(kakimashitaInfo.rootWord === '書く', `書きました correctly de-conjugates to 書く (got ${kakimashitaInfo.rootWord})`);
assert(kakimashitaInfo.inflection && kakimashitaInfo.inflection.formKey === 'masu_past', '書きました identified as masu_past');
assert(kakimashitaInfo.inflection.formLabel.includes('Lampau'), 'masu_past includes Indonesian label');

// 11c. Compound Particle & Grammar Overlap Consolidation
const nitsuiteInfo = window.LexiconEngine.lookup('について');
assert(nitsuiteInfo && (nitsuiteInfo.type === 'grammar' || nitsuiteInfo.type === 'compound_particle'), 'lookup について consolidates as grammar/compound particle');
assert(nitsuiteInfo.meaning_id.includes('tentang') || nitsuiteInfo.meaning_id.includes('mengenai'), 'について returns correct Indonesian meaning');
assert(nitsuiteInfo.etymology && nitsuiteInfo.etymology.includes('複合助詞'), 'について highlights compound particle etymology and JLPT grammar cross-ref');

// 11d. SLA Transitive / Intransitive Nuance Injection
const akuInfo = window.LexiconEngine.lookup('開く');
assert(akuInfo && akuInfo.sla_nuance && akuInfo.sla_nuance.includes('開ける'), '開く lookup includes transitive partner 開ける');
assert(akuInfo.sla_nuance.includes('INTRANSITIF'), '開く explicitly marked INTRANSITIF');

// 11e. Collocation Trap Alert
const auInfo = window.LexiconEngine.lookup('会う');
assert(auInfo && auInfo.sla_nuance && auInfo.sla_nuance.includes('に') && auInfo.sla_nuance.includes('を'), '会う includes collocation trap warning against *友達を会う');

// 11f. Sentence Segmentation & Interactive HTML
const testSentence = '日本の文化について話します。友達に手紙を書きました。';
const segmented = window.LexiconEngine.segment(testSentence);
assert(Array.isArray(segmented) && segmented.length >= 8, `Sentence segmented into tokens (got ${segmented.length})`);
assert(segmented.some(t => t.text === 'について' && t.type === 'grammar'), 'Segmenter recognizes compound grammar について without naive splitting');
assert(segmented.some(t => t.text === '話します' && t.type === 'inflection'), 'Segmenter recognizes inflected 話します');
assert(segmented.some(t => t.text === '書きました' && t.type === 'inflection'), 'Segmenter recognizes inflected 書きました');

const interactiveHtml = window.LexiconEngine.renderInteractive(testSentence);
assert(interactiveHtml.includes('class="nn-lex-item nn-lex-grammar" data-surface="について"'), 'renderInteractive tags について with grammar class');
assert(interactiveHtml.includes('class="nn-lex-item nn-lex-inflection" data-surface="書きました"'), 'renderInteractive tags 書きました with inflection class');
assert(interactiveHtml.includes('tabindex="0"'), 'Interactive tokens include accessibility tabindex="0"');

// 11g. UI Card Rendering
const cardHtml = window.LexiconEngine.UI.renderCardHtml(kakimashitaInfo);
assert(cardHtml.includes('lex-word'), 'UI card renders surface word');
assert(cardHtml.includes('Kata Dasar: <strong>書く</strong>'), 'UI card renders base root word info');
assert(cardHtml.includes('lex-sla-box'), 'UI card includes SLA nuance callout box');

// 11h. Copula & HTML transparency regression checks
const copulaSeg = window.LexiconEngine.segment('学生です');
assert(copulaSeg.some(t => t.text === 'です' && t.type === 'grammar'), '学生です accurately segments です as grammar rather than false particle で+す');
assert(!copulaSeg.some(t => t.text === 'で' && t.type === 'particle'), '学生です does NOT emit false particle で');

const pastCopulaSeg = window.LexiconEngine.segment('先生でした');
assert(pastCopulaSeg.some(t => t.text === 'でした' && t.type === 'grammar'), '先生でした accurately segments でした as grammar');

const boldHtml = window.LexiconEngine.renderInteractive('<b>わたしは</b>学生です');
assert(boldHtml.includes('<b><span class="nn-lex-item nn-lex-vocab" data-surface="わたし"'), 'HTML <b> tag contains interactive token for わたし without dead masking');
assert(boldHtml.includes('<span class="nn-lex-item nn-lex-particle" data-surface="は"'), 'HTML <b> tag contains interactive token for particle は');
assert(boldHtml.includes('<span class="nn-lex-item nn-lex-grammar" data-surface="です"'), 'renderInteractive retains interactive です');

// 11i. Vocab Detail inspectAll integration
loadScript('js/vocab-detail.js');
assert(typeof window.openVocabDetail === 'function', 'openVocabDetail is exported');

const sampleVerb = (window.vocabDB && window.vocabDB.find(v => v.conj_type === 'ichidan' || v.conj_type === 'godan')) || { id: 'vn5-00001' };
window.openVocabDetail(sampleVerb.id);
const modalEl = document.getElementById('vocabDetailModal');
const modalBody = modalEl.querySelector('.vd-body');
assert(modalBody && modalBody.innerHTML.includes('vd-conj-card'), 'openVocabDetail renders rich conjugation cards via inspectAll');
assert(modalBody && modalBody.innerHTML.includes('vd-conj-ex'), 'openVocabDetail renders sentence examples for conjugations');

// 12. Testing Sentence Generator Engine (Orchestrator)
console.log('12. Testing Sentence Generator Engine (Orchestrator)...');
loadScript('js/sentence-generator-engine.js');
assert(typeof window.SentenceGeneratorEngine === 'object', 'SentenceGeneratorEngine is exported');
assert(typeof window.SentenceGeneratorEngine.synthesize === 'function', 'SentenceGeneratorEngine.synthesize is a function');

const synTests = window.SentenceGeneratorEngine.selfTest();
synTests.forEach(t => {
  assert(t.pass, 'SentenceGeneratorEngine test: ' + t.name);
});

const synResult = window.SentenceGeneratorEngine.synthesize({ verb: '食べる', politeness: 'polite', pattern: 'nakereba_naranai' });
assert(synResult && synResult.japanese.includes('食べなければ'), 'Synthesizer produces natural negative condition 食べなければ');
assert(synResult.atoms && synResult.atoms.verb === '食べる', 'Synthesizer tracks atomic verb');
assert(synResult.tokens && synResult.tokens.length > 0, 'Synthesizer outputs tokenized elements');

// 13. Testing Core Math 4D FSRS Engine with Knowledge Graph Spillover
console.log('13. Testing Core Math 4D FSRS Engine...');
loadScript('js/fsrs-4d-engine.js');
assert(typeof window.FSRS4DEngine === 'object', 'FSRS4DEngine is exported');
assert(Array.isArray(window.FSRS4DEngine.DIMENSIONS) && window.FSRS4DEngine.DIMENSIONS.length === 4, 'FSRS4DEngine defines 4 dimensions');

const fsrs4dTests = window.FSRS4DEngine.selfTest();
fsrs4dTests.forEach(t => {
  assert(t.pass, 'FSRS4DEngine test: ' + t.name);
});

// 13b. 4D Isolation & Spillover verification
const atom4d = window.FSRS4DEngine.create4DAtom('vn5-00001', 'vocab');
assert(atom4d.dimensions.visual.state === window.FSRS4DEngine.STATE.NEW, 'Visual dimension initialized as NEW');
const revVisual = window.FSRS4DEngine.reviewDimension(atom4d.dimensions.visual, window.FSRS4DEngine.RATING.GOOD);
atom4d.dimensions.visual = revVisual.updated;
assert(atom4d.dimensions.visual.stability > 2.0, 'Visual stability increases after review');
assert(atom4d.dimensions.auditory.stability === 0, 'Auditory dimension remains 0 (isolated)');

const kanjiAtom = window.FSRS4DEngine.create4DAtom('k-shoku', 'kanji');
const childVocab = window.FSRS4DEngine.create4DAtom('v-taberu', 'vocab');
const kanjiRev = window.FSRS4DEngine.reviewDimension(kanjiAtom.dimensions.visual, window.FSRS4DEngine.RATING.EASY);
kanjiAtom.dimensions.visual = kanjiRev.updated;
const spilloverResult = window.FSRS4DEngine.applyInheritanceSpillover(kanjiAtom, 'visual', kanjiRev.stabilityDelta, [childVocab]);
assert(spilloverResult.length === 1, 'Spillover affects child vocabulary');
assert(childVocab.dimensions.visual.stability > 0, 'Child vocabulary receives inherited stability boost');

// 14. Testing Offline-First CRDT Sync Manager (Commute Problem)
console.log('14. Testing Offline-First CRDT Sync Manager...');
loadScript('js/sync-manager.js');
assert(typeof window.SyncManager === 'object', 'SyncManager is exported');
assert(window.SyncManager.STATUS && window.SyncManager.STATUS.IDLE === 'IDLE', 'SyncManager has STATUS enum');

// 14b. CRDT LWW Conflict Resolution verification
const localA = { atom_id: 'a1', stability: 5.0, reps: 3, last_reviewed_at: '2026-10-08T12:00:00Z' };
const remoteA = { atom_id: 'a1', stability: 2.0, reps: 1, last_reviewed_at: '2026-10-08T10:00:00Z' };
const winLocal = window.SyncManager.resolveConflict(localA, remoteA);
assert(winLocal.stability === 5.0 && winLocal._conflict_resolved === 'local_win', 'CRDT LWW: local newer timestamp wins');

const localB = { atom_id: 'a1', stability: 2.0, reps: 1, last_reviewed_at: '2026-10-08T08:00:00Z' };
const remoteB = { atom_id: 'a1', stability: 7.5, reps: 4, last_reviewed_at: '2026-10-08T11:00:00Z' };
const winRemote = window.SyncManager.resolveConflict(localB, remoteB);
assert(winRemote.stability === 7.5 && winRemote._conflict_resolved === 'remote_win', 'CRDT LWW: remote newer timestamp wins');

const sameTs = '2026-10-08T12:00:00Z';
const tieLocal = window.SyncManager.resolveConflict(
  { atom_id: 'a1', reps: 5, last_reviewed_at: sameTs },
  { atom_id: 'a1', reps: 2, last_reviewed_at: sameTs }
);
assert(tieLocal._conflict_resolved === 'tie_local', 'CRDT LWW: timestamp tie broken by reps count');

// 14c. Async SyncManager selfTest
(async () => {
  const smTests = await window.SyncManager.selfTest();
  smTests.forEach(t => {
    assert(t.pass, 'SyncManager test: ' + t.name);
  });

  // ── Summary ──────────────────────────────────────────
  console.log('\n══════════════════════════════════════');
  console.log(`  RUNTIME ENGINE TEST RESULTS:`);
  console.log(`  PASS: ${pass}  |  FAIL: ${fail}`);
  console.log('══════════════════════════════════════\n');

  if (fail > 0) {
    process.exit(1);
  } else {
    console.log('🎉 All runtime engine tests passed with 100% success!\n');
  }
})();
