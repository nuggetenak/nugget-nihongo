// ══════════════════════════════════════════════════════════════════
//  test-sprint-31-morphology-yomitan.js — Forensic Unit & Integration Suite
//  Sprint 31: Morphological Engine, Yomitan De-inflector & Semantic Ruby Furigana
//  (Tickets T-171 to T-175)
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
console.log('🧪 RUNNING SPRINT 31 VERIFICATION SUITE: MORPHOLOGY & YOMITAN');
console.log('=============================================================\n');

const ROOT_DIR = path.resolve(__dirname, '..');

// ── T-171: Yomitan Recursive De-inflector Engine Matrix ──
test('T-171: deinflector.ts supports 40+ transform pathways with Indonesian explanations', () => {
  const {
    deinflectWord,
    findBestLemma,
    TRANSFORM_RULES,
    RULE_MASKS,
  } = require('../src/lib/grammar/deinflector.ts');

  // Verify transform rules count (40+ rules required)
  assert(TRANSFORM_RULES.length >= 40, `Expected >= 40 transform rules, got ${TRANSFORM_RULES.length}`);

  // 1. Causative-Passive (Kausatif-Pasif)
  const cp1 = deinflectWord('食べさせられた');
  assert(cp1.some((c) => c.lemma === '食べる'), 'Must de-inflect 食べさせられた to 食べる');
  const cpGodan = deinflectWord('飲まされた');
  assert(cpGodan.some((c) => c.lemma === '飲む'), 'Must de-inflect 飲まされた to 飲む');

  // 2. Volitional (Ajakan / Maksud)
  const vol1 = deinflectWord('食べよう');
  assert(vol1.some((c) => c.lemma === '食べる'), 'Must de-inflect 食べよう to 食べる');
  const vol2 = deinflectWord('行こう');
  assert(vol2.some((c) => c.lemma === '行く'), 'Must de-inflect 行こう to 行く');
  const vol3 = deinflectWord('飲もう');
  assert(vol3.some((c) => c.lemma === '飲む'), 'Must de-inflect 飲もう to 飲む');

  // 3. Conditional (Pengandaian -ba)
  const cond1 = deinflectWord('食べれば');
  assert(cond1.some((c) => c.lemma === '食べる'), 'Must de-inflect 食べれば to 食べる');
  const cond2 = deinflectWord('行けば');
  assert(cond2.some((c) => c.lemma === '行く'), 'Must de-inflect 行けば to 行く');
  const cond3 = deinflectWord('高ければ');
  assert(cond3.some((c) => c.lemma === '高い'), 'Must de-inflect 高ければ to 高い');

  // 4. Imperative (Perintah Tegas)
  const imp1 = deinflectWord('食べろ');
  assert(imp1.some((c) => c.lemma === '食べる'), 'Must de-inflect 食べろ to 食べる');
  const imp2 = deinflectWord('行け');
  assert(imp2.some((c) => c.lemma === '行く'), 'Must de-inflect 行け to 行く');
  const imp3 = deinflectWord('飲め');
  assert(imp3.some((c) => c.lemma === '飲む'), 'Must de-inflect 飲め to 飲む');

  // 5. Potential Godan (Kanoukei)
  const pot1 = deinflectWord('行ける');
  assert(pot1.some((c) => c.lemma === '行く'), 'Must de-inflect 行ける to 行く');
  const pot2 = deinflectWord('飲める');
  assert(pot2.some((c) => c.lemma === '飲む'), 'Must de-inflect 飲める to 飲む');

  // 6. Causative Godan (Shieki)
  const caus1 = deinflectWord('行かせる');
  assert(caus1.some((c) => c.lemma === '行く'), 'Must de-inflect 行かせる to 行く');
  const caus2 = deinflectWord('飲ませる');
  assert(caus2.some((c) => c.lemma === '飲む'), 'Must de-inflect 飲ませる to 飲む');

  // 7. Passive Godan (Ukemi)
  const pass1 = deinflectWord('行かれる');
  assert(pass1.some((c) => c.lemma === '行く'), 'Must de-inflect 行かれる to 行く');
  const pass2 = deinflectWord('読まれる');
  assert(pass2.some((c) => c.lemma === '読む'), 'Must de-inflect 読まれる to 読む');

  // 8. Tai-form (Keinginan)
  const tai1 = deinflectWord('行きたい');
  assert(tai1.some((c) => c.lemma === '行く'), 'Must de-inflect 行きたい to 行く');
  const tai2 = deinflectWord('飲みたい');
  assert(tai2.some((c) => c.lemma === '飲む'), 'Must de-inflect 飲みたい to 飲む');

  // 9. Masu Polite (Sopan)
  const masu1 = deinflectWord('行きます');
  assert(masu1.some((c) => c.lemma === '行く'), 'Must de-inflect 行きます to 行く');
  const masu2 = deinflectWord('行きました');
  assert(masu2.some((c) => c.lemma === '行く'), 'Must de-inflect 行きました to 行く');

  // 10. Indonesian explanations & Yomitan schema compatibility
  const candidate = cp1[0];
  assert(typeof candidate.source === 'string', 'Candidate must have source');
  assert(typeof candidate.term === 'string', 'Candidate must have term (Yomitan spec)');
  assert(typeof candidate.lemma === 'string', 'Candidate must have lemma (Nugget Nihongo spec)');
  assert(typeof candidate.rules === 'number', 'Candidate must have rules bitmask');
  assert(Array.isArray(candidate.reasons) && candidate.reasons.length > 0, 'Candidate must have reasons');
  assert(Array.isArray(candidate.steps) && candidate.steps.length > 0, 'Candidate must have steps');
  assert(candidate.steps[0].explanationId.includes('['), 'Explanation must contain Indonesian grammatical tags');

  // 11. Helper findBestLemma
  const best = findBestLemma('食べさせられた');
  assert(best && best.lemma === '食べる', 'findBestLemma must resolve 食べる');
});

// ── T-172: ConjugationModal Inflected Input Corruption Fix ──
test('T-172: ConjugationModal.tsx safely resolves inflected inputs and renders de-inflection badge', () => {
  const modalPath = path.join(ROOT_DIR, 'src/components/grammar/ConjugationModal.tsx');
  assert(fs.existsSync(modalPath), 'ConjugationModal.tsx must exist');
  const code = fs.readFileSync(modalPath, 'utf8');

  assert(code.includes('deinflectWord'), 'Must invoke deinflectWord');
  assert(code.includes('DeinflectionCandidate'), 'Must reference DeinflectionCandidate type');
  assert(code.includes('detectedDeinflection'), 'Must maintain detectedDeinflection state');
  assert(code.includes('Terdeteksi:'), 'Must render Terdeteksi notification badge');
  assert(code.includes('selectedVerb'), 'Must conjugate underlying resolved lemma');

  // Verify that conjugateVerb on resolved lemma produces legitimate output
  const { conjugateVerb } = require('../src/lib/grammar/conjugation.ts');
  const { findBestLemma } = require('../src/lib/grammar/deinflector.ts');

  const input = '食べました';
  const resolved = findBestLemma(input);
  assert(resolved && resolved.lemma === '食べる', 'Resolved lemma must be 食べる');

  const masu = conjugateVerb(resolved.lemma, 'masu', 'ichidan');
  const te = conjugateVerb(resolved.lemma, 'te', 'ichidan');
  assert.strictEqual(masu, '食べます', 'Masu form must be 食べます');
  assert.strictEqual(te, '食べて', 'Te form must be 食べて');
  assert(!masu.includes('食べました'), 'Must not generate corrupted forms like 食べましたます');
});

// ── T-173: Lemma Classification & Single-Kanji Verb Fix ──
test('T-173: conjugation.ts accurately classifies single-kanji Ichidan verbs vs Godan exceptions', () => {
  const {
    inferType,
    COMMON_ICHIDAN_VERBS,
    SINGLE_KANJI_ICHIDAN_MAP,
  } = require('../src/lib/grammar/conjugation.ts');

  // Verify single-kanji Ichidan verbs
  const ichidanVerbs = ['診る', '煮る', '鋳る', '干る', '似る', '経る', '居る', '得る', '射る', '着る', '寝る', '出る', '見る'];
  for (const v of ichidanVerbs) {
    assert.strictEqual(inferType(v), 'ichidan', `Verb ${v} must be classified as ichidan`);
    assert(COMMON_ICHIDAN_VERBS.has(v) || SINGLE_KANJI_ICHIDAN_MAP[v], `${v} must exist in Ichidan records`);
  }

  // Verify Godan exceptions
  const godanVerbs = ['切る', '帰る', '走る', '入る', '知る', '要る', '減る', '蹴る', '飲む', '行く', '話す'];
  for (const v of godanVerbs) {
    assert.strictEqual(inferType(v), 'godan', `Verb ${v} must be classified as godan`);
  }
});

// ── T-174: Client-Side Semantic HTML5 <ruby><rt> Generator ──
test('T-174: rubyGenerator.ts parses brackets and generates accessible HTML markup', () => {
  const rubyPath = path.join(ROOT_DIR, 'src/lib/data/rubyGenerator.ts');
  assert(fs.existsSync(rubyPath), 'rubyGenerator.ts must exist');

  const {
    parseRubySegments,
    generateRubyHtml,
    stripFurigana,
    extractFuriganaOnly,
    containsKanji,
    isPureKana,
  } = require('../src/lib/data/rubyGenerator.ts');

  // 1. Bracket Parsing across various formats
  const seg1 = parseRubySegments('私【わたし】は学生[がくせい]です');
  assert.strictEqual(seg1[0].kanji, '私');
  assert.strictEqual(seg1[0].rt, 'わたし');
  assert.strictEqual(seg1[2].kanji, '学生');
  assert.strictEqual(seg1[2].rt, 'がくせい');

  // 2. Strip and Extract Utilities
  assert.strictEqual(stripFurigana('私【わたし】は学生[がくせい]です'), '私は学生です');
  assert.strictEqual(extractFuriganaOnly('私【わたし】は学生[がくせい]です'), 'わたしはがくせいです');

  // 3. HTML Markup Generation
  const html = generateRubyHtml('私【わたし】は学生[がくせい]です');
  assert(html.includes('<ruby class="[ruby-position:over] font-jp">私<rp class="text-[0em] opacity-0">(</rp><rt class="text-[0.6em] text-accent/80 select-none font-normal [ruby-position:over]">わたし</rt><rp class="text-[0em] opacity-0">)</rp></ruby>'));
  assert(html.includes('<ruby class="[ruby-position:over] font-jp">学生<rp class="text-[0em] opacity-0">(</rp><rt class="text-[0.6em] text-accent/80 select-none font-normal [ruby-position:over]">がくせい</rt><rp class="text-[0em] opacity-0">)</rp></ruby>'));

  // 4. Pure Kana detection
  assert.strictEqual(containsKanji('日本語'), true);
  assert.strictEqual(containsKanji('にほんご'), false);
  assert.strictEqual(isPureKana('ありがとう！'), true);
  assert.strictEqual(isPureKana('ありがとう日本語'), false);

  // 5. Verify DialogueStage.tsx uses RubyText
  const dialoguePath = path.join(ROOT_DIR, 'src/components/curriculum/player/DialogueStage.tsx');
  const dialogueCode = fs.readFileSync(dialoguePath, 'utf8');
  assert(dialogueCode.includes('<RubyText'), 'DialogueStage must render RubyText component');
  assert(!dialogueCode.includes('{showFurigana && line.furigana ? line.furigana : line.jp}'), 'Destructive text wipe must be removed');
});

// ── T-175: InteractiveSentence Tap-to-Breakdown Component ──
test('T-175: InteractiveSentence.tsx renders interactive tokens with popover and conjugation link', () => {
  const sentencePath = path.join(ROOT_DIR, 'src/components/common/InteractiveSentence.tsx');
  assert(fs.existsSync(sentencePath), 'InteractiveSentence.tsx must exist');
  const code = fs.readFileSync(sentencePath, 'utf8');

  assert(code.includes('tokenizeJapanese'), 'Must tokenize sentence using tokenizeJapanese');
  assert(code.includes('offlineDictionary.lookup'), 'Must look up definitions in offlineDictionary');
  assert(code.includes('deinflectWord'), 'Must check Yomitan deinflection');
  assert(code.includes('speakJapanese'), 'Must support audio pronunciation');
  assert(code.includes('role="dialog"'), 'Must specify accessible dialog role');
  assert(code.includes('aria-modal="true"'), 'Must specify aria-modal="true"');
  assert(code.includes('max-h-[85dvh]'), 'Must enforce responsive max-height constraint');
  assert(code.includes('Lihat di Matriks Konjugasi'), 'Must provide navigation to Conjugation Matrix');
});

console.log('\n=============================================================');
console.log(`📊 SPRINT 31 TEST RESULTS: ${passedTests}/${totalTests} TESTS PASSED`);
console.log('=============================================================\n');

if (passedTests !== totalTests) {
  process.exit(1);
}
