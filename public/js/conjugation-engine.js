// ══════════════════════════════════════════════════════════════════
//  conjugation-engine.js — Nugget Nihongo Engine Core v15
//  Comprehensive Japanese Conjugation Engine for Indonesian Learners
//  Covers all Godan, Ichidan, Suru, Kuru, Keigo, Adjectives & Edge Cases
// ══════════════════════════════════════════════════════════════════

(function () {
'use strict';

// Browser & Node environment compatibility
var root = typeof window !== 'undefined' ? window : global;

// ──────────────────────────────────────────────
// §0  PHONOLOGICAL TABLES & EXCEPTIONS
// ──────────────────────────────────────────────

// Hiragana vowel rows for godan stem shifting
const GODAN_ROWS = {
  'う': { a:'わ', i:'い', u:'う', e:'え', o:'お' },
  'く': { a:'か', i:'き', u:'く', e:'け', o:'こ' },
  'ぐ': { a:'が', i:'ぎ', u:'ぐ', e:'げ', o:'ご' },
  'す': { a:'さ', i:'し', u:'す', e:'せ', o:'そ' },
  'つ': { a:'た', i:'ち', u:'つ', e:'て', o:'と' },
  'ぬ': { a:'な', i:'に', u:'ぬ', e:'ね', o:'の' },
  'ぶ': { a:'ば', i:'び', u:'ぶ', e:'べ', o:'ぼ' },
  'む': { a:'ま', i:'み', u:'む', e:'め', o:'も' },
  'る': { a:'ら', i:'り', u:'る', e:'れ', o:'ろ' },
};

// Te / Ta euphonic changes for godan verbs
const GODAN_TE = {
  'う':'って', 'つ':'って', 'る':'って',
  'く':'いて', 'ぐ':'いで',
  'す':'して',
  'ぬ':'んで', 'ぶ':'んで', 'む':'んで',
};
const GODAN_TA = {
  'う':'った', 'つ':'った', 'る':'った',
  'く':'いた', 'ぐ':'いだ',
  'す':'した',
  'ぬ':'んだ', 'ぶ':'んだ', 'む':'んだ',
};

// Single-kanji and core Ichidan verbs (where kanji directly precedes る)
// Prevents incorrect classification as Godan when no hiragana okurigana precedes る.
const ICHIDAN_SINGLE_KANJI = new Set([
  '見る', 'み',       // see / look
  '出る', 'で',       // exit / appear
  '寝る', 'ね',       // sleep
  '着る', 'き',       // wear (above waist)
  '居る', 'い',       // exist (animate)
  '似る', 'に',       // resemble
  '煮る', 'に',       // boil / simmer
  '得る', 'え',       // acquire / gain
  '経る', 'へ',       // pass / elapse
  '射る', 'い',       // shoot
  '鋳る', 'い',       // mint / cast
  '干る', 'ひ',       // dry up
  '涸る', 'ひ',
  '診る', 'み',       // examine (medical)
  '観る', 'み',       // watch (sports/film)
  '看る', 'み',       // care for / nurse
  '借る', 'か',
]);

// Godan verbs that end in -iru / -eru but conjugate as Godan (classical exceptions)
const GODAN_EXCEPTIONS = new Set([
  '帰る','かえる',     // return
  '切る','きる',       // cut
  '知る','しる',       // know
  '入る','はいる',     // enter
  '走る','はしる',     // run
  '要る','いる',       // need
  '蹴る','ける',       // kick
  '握る','にぎる',     // grasp
  '限る','かぎる',     // limit
  '参る','まいる',     // humble go/come
  '下さる','くださる', // honorific give
  'いらっしゃる',      // honorific exist/go/come
  'おっしゃる',        // honorific say
  'なさる',            // honorific do
  'ござる',            // polite exist
  '減る','へる',       // decrease
  '滑る','すべる',     // slip / slide
  '散る','ちる',       // scatter
  '焦る','あせる',     // panic
  '喋る','しゃべる',   // talk
  '照る','てる',       // shine
  '練る','ねる',       // knead
  '茂る','しげる',     // grow thickly
  '湿る','しめる',     // become damp
  '遮る','さえぎる',   // interrupt
  '弄る','いじる',     // fiddle with
  '捩る','ねじる',     // twist
  '交じる','まじる',   // mingle
  '混じる','まじる',   // mix
  '千切る','ちぎる',   // tear
  '裏切る','うらぎる', // betray
  '区切る','くぎる',   // punctuate
  '押し切る','おしきる',
  '思い切る','おもいきる',
  '横切る','よこぎる', // cross
  '耽る','ふける',     // indulge
  '詰る','なじる',     // rebuke
  '毟る','むしる',     // pluck
  '抓る','つねる',     // pinch
  '抉る','こじる',     // pry
  '嘲る','あざける',   // ridicule
  '覆る','くつがえる', // overturn
  '蘇る','よみがえる', // revive
  '甦る','よみがえる',
  '契る','ちぎる',     // pledge
  'せびる',
]);

// 5 Special Honorific Verbs that use -i instead of -ri for masu-stem & imperative
const MASU_IRREGULAR = new Set([
  'いらっしゃる', 'おっしゃる', 'なさる',
  'くださる', '下さる',
  'ございます', 'ござる'
]);

// ──────────────────────────────────────────────
// §1  NORMALIZER & TYPE INFERENCE
// ──────────────────────────────────────────────

const ROMAJI_MAP = {
  'a':'あ','i':'い','u':'う','e':'え','o':'お',
  'ka':'か','ki':'き','ku':'く','ke':'け','ko':'こ',
  'sa':'さ','shi':'し','su':'す','se':'せ','so':'そ',
  'ta':'た','chi':'ち','tsu':'つ','te':'て','to':'と',
  'na':'な','ni':'に','nu':'ぬ','ne':'ね','no':'の',
  'ha':'は','hi':'ひ','fu':'ふ','he':'へ','ho':'ほ',
  'ma':'ま','mi':'み','mu':'む','me':'め','mo':'も',
  'ya':'や','yu':'ゆ','yo':'よ',
  'ra':'ら','ri':'り','ru':'る','re':'れ','ro':'ろ',
  'wa':'わ','wo':'を','n':'ん',
  'ga':'が','gi':'ぎ','gu':'ぐ','ge':'げ','go':'ご',
  'za':'ざ','ji':'じ','zu':'ず','ze':'ぜ','zo':'ぞ',
  'da':'だ','di':'ぢ','du':'づ','de':'で','do':'ど',
  'ba':'ば','bi':'び','bu':'ぶ','be':'べ','bo':'ぼ',
  'pa':'ぱ','pi':'ぴ','pu':'ぷ','pe':'ぺ','po':'ぽ',
  'kya':'きゃ','kyu':'きゅ','kyo':'きょ',
  'sha':'しゃ','shu':'しゅ','sho':'しょ',
  'cha':'ちゃ','chu':'ちゅ','cho':'ちょ',
  'nya':'にゃ','nyu':'にゅ','nyo':'にょ',
  'hya':'ひゃ','hyu':'ひゅ','hyo':'ひょ',
  'mya':'みゃ','myu':'みゅ','myo':'みょ',
  'rya':'りゃ','ryu':'りゅ','ryo':'りょ',
  'gya':'ぎゃ','gyu':'ぎゅ','gyo':'ぎょ',
  'ja':'じゃ','ju':'じゅ','jo':'じょ',
  'bya':'びゃ','byu':'びゅ','byo':'びょ',
  'pya':'ぴゃ','pyu':'ぴゅ','pyo':'ぴょ',
};

function romajiToKana(str) {
  let result = '';
  let i = 0;
  const s = str.toLowerCase();
  while (i < s.length) {
    let matched = false;
    for (let len = 3; len >= 1; len--) {
      const chunk = s.slice(i, i + len);
      if (ROMAJI_MAP[chunk]) {
        result += ROMAJI_MAP[chunk];
        i += len;
        matched = true;
        break;
      }
    }
    if (!matched) { result += s[i]; i++; }
  }
  return result;
}

function normalize(word, hintType, opts = {}) {
  if (!word) return null;
  let w = word.trim();

  // Convert romaji if ascii
  if (/^[a-zA-Z\s]+$/.test(w)) w = romajiToKana(w.replace(/\s+/g, ''));

  // Normalize hintType from POS tags if provided (e.g. 'v1' -> 'ichidan', 'v5' -> 'godan')
  let resolvedType = hintType;
  if (resolvedType) {
    if (resolvedType === 'verb-ru' || resolvedType === 'v1' || resolvedType === 'ru-verb') resolvedType = 'ichidan';
    else if (resolvedType === 'verb-u' || resolvedType.startsWith('v5') || resolvedType === 'u-verb') resolvedType = 'godan';
    else if (resolvedType === 'verb-suru' || resolvedType === 'vs' || resolvedType === 'suru-verb') resolvedType = 'suru';
    else if (resolvedType === 'verb-kuru' || resolvedType === 'vk' || resolvedType === 'kuru-verb') resolvedType = 'kuru';
    else if (resolvedType === 'adj-i' || resolvedType === 'i-adj') resolvedType = 'adj-i';
    else if (resolvedType === 'adj-na' || resolvedType === 'na-adj') resolvedType = 'adj-na';
  }

  // Check keigo base table first
  const keigoEntry = findKeigoByBase(w);
  if (keigoEntry && !resolvedType) {
    resolvedType = inferType(w, opts.reading);
  }

  return { dict: w, type: resolvedType || inferType(w, opts.reading) };
}

function inferType(w, reading = '') {
  if (w === 'する' || w.endsWith('する')) return 'suru';
  if (w === '来る' || w === 'くる' || w.endsWith('来る') || w.endsWith('くる')) return 'kuru';
  if (w === 'だ' || w === 'です') return 'copula';

  // い-adjective detection
  // Exclude known na-adjectives ending in い (きれい, きらい, 有名)
  const NA_ADJ_EXCEPTIONS = new Set(['きれい', '綺麗', 'きらい', '嫌い', 'ゆうめい', '有名', '幸い', 'さいわい', 'あいまい', '曖昧']);
  if (w.endsWith('い') && !NA_ADJ_EXCEPTIONS.has(w) && !w.endsWith('ない') && !/[うくぐすつぬぶむ]い$/.test(w)) {
    // If it ends with い and not a verb
    if (!/[るくむすつぬぶぐ]/.test(w.slice(-1))) {
      return 'adj-i';
    }
  }

  // Verb ending in る
  if (w.endsWith('る')) {
    if (GODAN_EXCEPTIONS.has(w)) return 'godan';
    if (ICHIDAN_SINGLE_KANJI.has(w)) return 'ichidan';

    // Check compound suffix (e.g. 夢見る, 抜け出る, 昼寝る)
    if (w.endsWith('見る') || w.endsWith('出る') || w.endsWith('寝る') || w.endsWith('似る') || w.endsWith('煮る') || w.endsWith('着る') || w.endsWith('居る')) {
      return 'ichidan';
    }

    // Check reading if available
    const testKana = reading ? reading.slice(0, -1).slice(-1) : w.slice(0, -1).slice(-1);
    const iRow = ['き','に','み','い','り','ぎ','じ','び','ぴ','ち','ひ','し'];
    const eRow = ['け','ね','め','え','れ','げ','ぜ','べ','ぺ','て','へ','せ','で'];

    if (iRow.includes(testKana) || eRow.includes(testKana)) return 'ichidan';
    return 'godan';
  }

  // Other Godan endings
  if (/[うくぐすつぬぶむ]$/.test(w)) return 'godan';

  return null;
}

// ──────────────────────────────────────────────
// §2  FORMS MATRIX (JLPT N5 – N1)
// ──────────────────────────────────────────────

const FORMS = {
  // Core Verbs
  'dict'           : { label: '辞書形',      en: 'dictionary form' },
  'masu'           : { label: 'ます形',      en: 'polite present' },
  'masen'          : { label: 'ません形',    en: 'polite negative' },
  'mashita'        : { label: 'ました形',    en: 'polite past' },
  'masendeshita'   : { label: 'ませんでした', en: 'polite past neg' },
  'mashou'         : { label: 'ましょう形',  en: 'volitional polite' },
  'nai'            : { label: 'ない形',      en: 'plain negative' },
  'nakatta'        : { label: 'なかった形',  en: 'plain past neg' },
  'ta'             : { label: 'た形',        en: 'plain past' },
  'te'             : { label: 'て形',        en: 'te-form' },
  'ba'             : { label: 'ば形',        en: 'conditional -ba' },
  'tara'           : { label: 'たら形',      en: 'conditional -tara' },
  'tari'           : { label: 'たり形',      en: 'listing action -tari' },
  'you'            : { label: '意向形',      en: 'volitional plain' },
  'potential'      : { label: '可能形',      en: 'potential' },
  'potential_neg'  : { label: '可能否定形',  en: 'potential negative' },
  'passive'        : { label: '受身形',      en: 'passive' },
  'passive_neg'    : { label: '受身否定形',  en: 'passive negative' },
  'causative'      : { label: '使役形',      en: 'causative' },
  'causative_neg'  : { label: '使役否定形',  en: 'causative negative' },
  'causpass'       : { label: '使役受身形',  en: 'causative-passive (long)' },
  'causpass_short' : { label: '使役受身短縮形', en: 'causative-passive (short)' },
  'imperative'     : { label: '命令形',      en: 'imperative' },
  'prohibitive'    : { label: '禁止形',      en: 'prohibitive' },
  'teiru'          : { label: 'ている形',    en: 'progressive' },
  'teita'          : { label: 'ていた形',    en: 'progressive past' },
  'teinai'         : { label: 'ていない形',  en: 'progressive negative' },
  'temo'           : { label: 'ても形',      en: 'even if' },
  'tai'            : { label: 'たい形',      en: 'desiderative want' },
  'tai_neg'        : { label: 'たくない形',  en: 'desiderative negative' },
  'tai_past'       : { label: 'たかった形',  en: 'desiderative past' },
  'tai_past_neg'   : { label: 'たくなかった形', en: 'desiderative past neg' },
  'nakute'         : { label: 'なくて形',    en: 'negative te-form' },
  'naide'          : { label: 'ないで形',    en: 'negative request/without' },
  'zuni'           : { label: 'ずに形',      en: 'formal negative without' },
  'nagara'         : { label: 'ながら形',    en: 'simultaneous (while)' },
  'nasai'          : { label: 'なさい形',    en: 'instruction' },
  'sou'            : { label: 'そう形',      en: 'conjecture stem' },
  'yasui'          : { label: 'やすい形',    en: 'easy to do' },
  'nikui'          : { label: 'にくい形',    en: 'hard to do' },
  'sugiru'         : { label: 'すぎる形',    en: 'excessive' },

  // Adjectives (い-adj)
  'adj-nai'        : { label: 'くない形',    en: 'i-adj negative' },
  'adj-katta'      : { label: 'かった形',    en: 'i-adj past' },
  'adj-ku'         : { label: 'く形',        en: 'i-adj adverb' },
  'adj-kute'       : { label: 'くて形',      en: 'i-adj te form' },
  'adj-kereba'     : { label: 'ければ形',    en: 'i-adj conditional' },
  'adj-tara'       : { label: 'かったら形',  en: 'i-adj conditional past' },
  'adj-sou'        : { label: 'そう形',      en: 'i-adj conjecture' },

  // Na-adjectives & Nouns
  'na-dict'        : { label: '語幹',        en: 'stem' },
  'na-na'          : { label: 'な形',        en: 'attributive' },
  'na-de'          : { label: 'で形',        en: 'te form' },
  'na-da'          : { label: 'だ形',        en: 'plain present' },
  'na-datta'       : { label: 'だった形',    en: 'plain past' },
  'na-janai'       : { label: 'じゃない形',  en: 'plain negative' },
  'na-nara'        : { label: 'なら形',      en: 'conditional' },
  'na-ni'          : { label: 'に形',        en: 'adverbial' },
};

function godanStem(dict, row) {
  const last = dict.slice(-1);
  const stem = dict.slice(0, -1);
  return stem + (GODAN_ROWS[last]?.[row] || last);
}

// ──────────────────────────────────────────────
// §3  VERB CONJUGATION ENGINE
// ──────────────────────────────────────────────

function conjugateVerb(dict, formKey, type) {
  // Normalize form aliases
  let form = formKey;
  if (form === 'potential-neg') form = 'potential_neg';
  if (form === 'passive-neg')   form = 'passive_neg';
  if (form === 'causative-neg') form = 'causative_neg';
  if (form === 'causpass-short' || form === 'causpass_short') form = 'causpass_short';
  if (form === 'tai-neg')       form = 'tai_neg';
  if (form === 'tai-past')      form = 'tai_past';
  if (form === 'tai-past-neg')  form = 'tai_past_neg';

  // ─── 1. SURU (する) and compounds (〜する) ───
  if (type === 'suru') {
    const base = dict.endsWith('する') ? dict.slice(0, -2) : '';
    const maps = {
      dict: dict,
      masu: base + 'します',
      masen: base + 'しません',
      mashita: base + 'しました',
      masendeshita: base + 'しませんでした',
      mashou: base + 'しましょう',
      nai: base + 'しない',
      nakatta: base + 'しなかった',
      ta: base + 'した',
      te: base + 'して',
      ba: base + 'すれば',
      tara: base + 'したら',
      tari: base + 'したり',
      you: base + 'しよう',
      potential: base + 'できる',
      potential_neg: base + 'できない',
      passive: base + 'される',
      passive_neg: base + 'されない',
      causative: base + 'させる',
      causative_neg: base + 'させない',
      causpass: base + 'させられる',
      causpass_short: base + 'させられる',
      imperative: base + 'しろ',
      prohibitive: dict + 'な',
      teiru: base + 'している',
      teita: base + 'していた',
      teinai: base + 'していない',
      temo: base + 'しても',
      tai: base + 'したい',
      tai_neg: base + 'したくない',
      tai_past: base + 'したかった',
      tai_past_neg: base + 'したくなかった',
      nakute: base + 'しなくて',
      naide: base + 'しないで',
      zuni: base + 'せずに',
      nagara: base + 'しながら',
      nasai: base + 'しなさい',
      sou: base + 'しそう',
      yasui: base + 'しやすい',
      nikui: base + 'しにくい',
      sugiru: base + 'しすぎる',
    };
    return maps[form] || null;
  }

  // ─── 2. KURU (来る / くる) and compounds (〜来る / 〜くる) ───
  if (type === 'kuru') {
    const isKanji = dict.endsWith('来る');
    const prefix = isKanji ? dict.slice(0, -2) : (dict.endsWith('くる') ? dict.slice(0, -2) : '');
    const k = isKanji ? {
      dict: dict,
      masu: prefix + '来ます',
      masen: prefix + '来ません',
      mashita: prefix + '来ました',
      masendeshita: prefix + '来ませんでした',
      mashou: prefix + '来ましょう',
      nai: prefix + '来ない',
      nakatta: prefix + '来なかった',
      ta: prefix + '来た',
      te: prefix + '来て',
      ba: prefix + '来れば',
      tara: prefix + '来たら',
      tari: prefix + '来たり',
      you: prefix + '来よう',
      potential: prefix + '来られる',
      potential_neg: prefix + '来られない',
      passive: prefix + '来られる',
      passive_neg: prefix + '来られない',
      causative: prefix + '来させる',
      causative_neg: prefix + '来させない',
      causpass: prefix + '来させられる',
      causpass_short: prefix + '来させられる',
      imperative: prefix + '来い',
      prohibitive: dict + 'な',
      teiru: prefix + '来ている',
      teita: prefix + '来ていた',
      teinai: prefix + '来ていない',
      temo: prefix + '来ても',
      tai: prefix + '来たい',
      tai_neg: prefix + '来たくない',
      tai_past: prefix + '来たかった',
      tai_past_neg: prefix + '来たくなかった',
      nakute: prefix + '来なくて',
      naide: prefix + '来ないで',
      zuni: prefix + '来ずに',
      nagara: prefix + '来ながら',
      nasai: prefix + '来なさい',
      sou: prefix + '来そう',
      yasui: prefix + '来やすい',
      nikui: prefix + '来にくい',
      sugiru: prefix + '来すぎる',
    } : {
      dict: dict,
      masu: prefix + 'きます',
      masen: prefix + 'きません',
      mashita: prefix + 'きました',
      masendeshita: prefix + 'きませんでした',
      mashou: prefix + 'きましょう',
      nai: prefix + 'こない',
      nakatta: prefix + 'こなかった',
      ta: prefix + 'きた',
      te: prefix + 'きて',
      ba: prefix + 'くれば',
      tara: prefix + 'きたら',
      tari: prefix + 'きたり',
      you: prefix + 'こよう',
      potential: prefix + 'こられる',
      potential_neg: prefix + 'こられない',
      passive: prefix + 'こられる',
      passive_neg: prefix + 'こられない',
      causative: prefix + 'こさせる',
      causative_neg: prefix + 'こさせない',
      causpass: prefix + 'こさせられる',
      causpass_short: prefix + 'こさせられる',
      imperative: prefix + 'こい',
      prohibitive: dict + 'な',
      teiru: prefix + 'きている',
      teita: prefix + 'きていた',
      teinai: prefix + 'きていない',
      temo: prefix + 'きても',
      tai: prefix + 'きたい',
      tai_neg: prefix + 'きたくない',
      tai_past: prefix + 'きたかった',
      tai_past_neg: prefix + 'きたくなかった',
      nakute: prefix + 'こなくて',
      naide: prefix + 'こないで',
      zuni: prefix + 'こずに',
      nagara: prefix + 'きながら',
      nasai: prefix + 'きなさい',
      sou: prefix + 'きそう',
      yasui: prefix + 'きやすい',
      nikui: prefix + 'きにくい',
      sugiru: prefix + 'きすぎる',
    };
    return k[form] || null;
  }

  // ─── 3. ICHIDAN (一段動詞 - v1) ───
  if (type === 'ichidan') {
    const stem = dict.slice(0, -1);
    const maps = {
      dict,
      masu         : stem + 'ます',
      masen        : stem + 'ません',
      mashita      : stem + 'ました',
      masendeshita : stem + 'ませんでした',
      mashou       : stem + 'ましょう',
      nai          : stem + 'ない',
      nakatta      : stem + 'なかった',
      ta           : stem + 'た',
      te           : stem + 'て',
      ba           : stem + 'れば',
      tara         : stem + 'たら',
      tari         : stem + 'たり',
      you          : stem + 'よう',
      potential    : stem + 'られる',
      potential_neg: stem + 'られない',
      passive      : stem + 'られる',
      passive_neg  : stem + 'られない',
      causative    : stem + 'させる',
      causative_neg: stem + 'させない',
      causpass     : stem + 'させられる',
      causpass_short: stem + 'させられる',
      imperative   : stem + 'ろ',
      prohibitive  : dict + 'な',
      teiru        : stem + 'ている',
      teita        : stem + 'ていた',
      teinai       : stem + 'ていない',
      temo         : stem + 'ても',
      tai          : stem + 'たい',
      tai_neg      : stem + 'たくない',
      tai_past     : stem + 'たかった',
      tai_past_neg : stem + 'たくなかった',
      nakute       : stem + 'なくて',
      naide        : stem + 'ないで',
      zuni         : stem + 'ずに',
      nagara       : stem + 'ながら',
      nasai        : stem + 'なさい',
      sou          : stem + 'そう',
      yasui        : stem + 'やすい',
      nikui        : stem + 'にくい',
      sugiru       : stem + 'すぎる',
    };
    return maps[form] || null;
  }

  // ─── 4. GODAN (五段動詞 - v5) ───
  if (type === 'godan') {
    const last = dict.slice(-1);

    // Special cases:
    // A. 行く / いく and compounds (持っていく, 連れて行く, 歩いていく, etc.)
    const isIku = dict.endsWith('行く') || dict.endsWith('いく');

    // B. 問う / 請う euphonic exception: 問うて, 問うた
    const isTou = (dict === '問う' || dict === 'とう' || dict === '請う' || dict === 'こう');

    // C. Special honorific godan verbs: くださる, なさる, いらっしゃる, おっしゃる, ござる
    const isHonorificMasu = MASU_IRREGULAR.has(dict);

    // Te / Ta euphonic resolution
    let te, ta;
    if (isIku) {
      const p = dict.slice(0, -1);
      te = p + 'って';
      ta = p + 'った';
    } else if (isTou) {
      const p = dict.slice(0, -1);
      te = p + 'うて';
      ta = p + 'うた';
    } else {
      te = dict.slice(0, -1) + (GODAN_TE[last] || 'って');
      ta = dict.slice(0, -1) + (GODAN_TA[last] || 'った');
    }

    // Stem vowel rows
    const a = godanStem(dict, 'a');
    const i = isHonorificMasu ? dict.slice(0, -1) + 'い' : godanStem(dict, 'i');
    const e = godanStem(dict, 'e');
    const o = godanStem(dict, 'o');

    // Special nai-base: う-ending uses わ
    const naiBase = last === 'う' ? dict.slice(0, -1) + 'わ' : a;

    // Special: ある / 有る (nai = ない, nakatta = なかった)
    const isAru = (dict === 'ある' || dict === '有る');
    const naiVal     = isAru ? 'ない' : naiBase + 'ない';
    const nakattaVal = isAru ? 'なかった' : naiBase + 'なかった';
    const nakuteVal  = isAru ? 'なくて' : naiBase + 'なくて';
    const naideVal   = isAru ? 'ないで' : naiBase + 'ないで';
    const zuniVal    = isAru ? 'ずに' : naiBase + 'ずに';

    // Short causative-passive: -asaserareru -> -asareru (except す-ending verbs which cannot use -sa-sareru)
    const causpassShort = (last === 'す') ? (a + 'せられる') : (a + 'される');

    // Imperative for honorific verbs (くださる -> ください, なさる -> なさい, etc.)
    const imperativeVal = isHonorificMasu ? (dict.slice(0, -1) + 'い') : e;

    const maps = {
      dict,
      masu         : i + 'ます',
      masen        : i + 'ません',
      mashita      : i + 'ました',
      masendeshita : i + 'ませんでした',
      mashou       : i + 'ましょう',
      nai          : naiVal,
      nakatta      : nakattaVal,
      ta,
      te,
      ba           : e + 'ば',
      tara         : ta + 'ら',
      tari         : ta + 'り',
      you          : o + 'う',
      potential    : e + 'る',
      potential_neg: e + 'ない',
      passive      : a + 'れる',
      passive_neg  : a + 'れない',
      causative    : a + 'せる',
      causative_neg: a + 'せない',
      causpass     : a + 'せられる',
      causpass_short: causpassShort,
      imperative   : imperativeVal,
      prohibitive  : dict + 'な',
      teiru        : te.replace(/て$|で$/, m => m === 'て' ? 'ている' : 'でいる'),
      teita        : te.replace(/て$|で$/, m => m === 'て' ? 'ていた' : 'でいた'),
      teinai       : te.replace(/て$|で$/, m => m === 'て' ? 'ていない' : 'でいない'),
      temo         : te.replace(/て$|で$/, m => m === 'て' ? 'ても' : 'でも'),
      tai          : i + 'たい',
      tai_neg      : i + 'たくない',
      tai_past     : i + 'たかった',
      tai_past_neg : i + 'たくなかった',
      nakute       : nakuteVal,
      naide        : naideVal,
      zuni         : zuniVal,
      nagara       : i + 'ながら',
      nasai        : i + 'なさい',
      sou          : i + 'そう',
      yasui        : i + 'やすい',
      nikui        : i + 'にくい',
      sugiru       : i + 'すぎる',
    };
    return maps[form] || null;
  }

  return null;
}

// ──────────────────────────────────────────────
// §4  ADJECTIVE & NOUN CONJUGATION
// ──────────────────────────────────────────────

function conjugateAdjI(stem_or_dict, formKey) {
  let form = formKey;
  if (form === 'nai') form = 'adj-nai';
  if (form === 'ta')  form = 'adj-katta';
  if (form === 'te')  form = 'adj-kute';
  if (form === 'ba')  form = 'adj-kereba';
  if (form === 'ku')  form = 'adj-ku';

  const full = stem_or_dict.trim();

  // Special handling for いい / 良い and compound adjectives (かっこいい, 頭がいい, 都合がいい, etc.)
  const isGoodKana = full.endsWith('いい');
  const isGoodKanji = full.endsWith('良い');
  let b, isIi = false;

  if (isGoodKana) {
    isIi = true;
    b = full.slice(0, -2) + 'よ';
  } else if (isGoodKanji) {
    isIi = true;
    b = full.slice(0, -2) + '良'; // reading: よ
  } else {
    b = full.endsWith('い') ? full.slice(0, -1) : full;
  }

  const souVal = isIi ? (b + 'さそう') : (b + 'そう');

  const maps = {
    'dict'       : full,
    'adj-nai'    : b + 'くない',
    'adj-katta'  : b + 'かった',
    'adj-ku'     : b + 'く',
    'adj-kute'   : b + 'くて',
    'adj-kereba' : b + 'ければ',
    'adj-tara'   : b + 'かったら',
    'adj-sou'    : souVal,
    'tara'       : b + 'かったら',
    'te'         : b + 'くて',
    'nai'        : b + 'くない',
    'ta'         : b + 'かった',
    'ba'         : b + 'ければ',
    'sou'        : souVal,
    'masu'       : full + 'です',
    'masen'      : b + 'くないです',
    'mashita'    : b + 'かったです',
    'masendeshita': b + 'くなかったです',
  };
  return maps[form] || null;
}

function conjugateNaOrNoun(stem, formKey) {
  let form = formKey;
  if (form === 'dict') form = 'na-dict';
  if (form === 'te')   form = 'na-de';
  if (form === 'nai')  form = 'na-janai';
  if (form === 'ta')   form = 'na-datta';
  if (form === 'ba')   form = 'na-nara';

  const s = stem.replace(/だ$/, '').trim();

  const maps = {
    'na-dict'     : s,
    'na-na'       : s + 'な',
    'na-de'       : s + 'で',
    'na-da'       : s + 'だ',
    'na-datta'    : s + 'だった',
    'na-janai'    : s + 'じゃない',
    'na-nara'     : s + 'なら',
    'na-ni'       : s + 'に',
    'dict'        : s,
    'te'          : s + 'で',
    'nai'         : s + 'じゃない',
    'ta'          : s + 'だった',
    'tara'        : s + 'だったら',
    'sou'         : s + 'そう',
    'masu'        : s + 'です',
    'masen'       : s + 'じゃありません',
    'mashita'     : s + 'でした',
    'masendeshita': s + 'じゃありませんでした',
  };
  return maps[form] || null;
}

// ──────────────────────────────────────────────
// §5  KEIGO LOOKUP TABLE & CONJUGATION
// ──────────────────────────────────────────────

const KEIGO_TABLE = [
  { base:['行く','来る','いる'],   sonkei:'いらっしゃる', kenjo:'参る',        type:'godan' },
  { base:['する'],                 sonkei:'なさる',       kenjo:'いたす',       type:'godan' },
  { base:['言う'],                 sonkei:'おっしゃる',   kenjo:'申す',         type:'godan' },
  { base:['食べる','飲む'],        sonkei:'召し上がる',   kenjo:'いただく',     type:'godan' },
  { base:['もらう'],               sonkei:null,           kenjo:'いただく',     type:'godan' },
  { base:['あげる','やる'],        sonkei:null,           kenjo:'差し上げる',   type:'ichidan' },
  { base:['くれる'],               sonkei:'くださる',     kenjo:null,           type:'godan' },
  { base:['見る'],                 sonkei:'ご覧になる',   kenjo:'拝見する',     type:'suru'  },
  { base:['知る','知っている'],    sonkei:'ご存知',       kenjo:'存じる',       type:'ichidan' },
  { base:['思う'],                 sonkei:null,           kenjo:'存じる',       type:'godan' },
  { base:['会う'],                 sonkei:null,           kenjo:'お目にかかる', type:'godan' },
  { base:['訪ねる','訪問する'],    sonkei:null,           kenjo:'伺う',         type:'godan' },
  { base:['聞く','尋ねる'],        sonkei:null,           kenjo:'伺う',         type:'godan' },
  { base:['話す'],                 sonkei:null,           kenjo:'申し上げる',   type:'ichidan' },
  { base:['見せる'],               sonkei:null,           kenjo:'お目にかける', type:'ichidan' },
  { base:['読む'],                 sonkei:null,           kenjo:'拝読する',     type:'suru' },
  { base:['借りる'],               sonkei:null,           kenjo:'拝借する',     type:'suru' },
  { base:['ある','います'],        sonkei:'いらっしゃる', kenjo:'おる',         type:'godan' },
  { base:['です','だ'],            sonkei:null,           kenjo:'でございます',  type:'copula' },
];

function findKeigoByBase(word) {
  return KEIGO_TABLE.find(e => e.base.includes(word)) || null;
}

function keigoMasuStem(verb) {
  if (MASU_IRREGULAR.has(verb)) return verb.slice(0, -1) + 'い';
  return null;
}

function conjugateKeigo(dict, direction, form = 'masu') {
  const entry = findKeigoByBase(dict);
  if (!entry) {
    if (direction === 'sonkei') return buildOStemNiNaru(dict, form);
    if (direction === 'kenjo')  return buildOStemSuru(dict, form);
    return null;
  }

  const keigoVerb = direction === 'sonkei' ? entry.sonkei : entry.kenjo;
  if (!keigoVerb) return null;

  const keigoType = entry.type || inferType(keigoVerb);

  if (MASU_IRREGULAR.has(keigoVerb)) {
    const stem = keigoMasuStem(keigoVerb);
    if (form === 'masu')         return stem + 'ます';
    if (form === 'masen')        return stem + 'ません';
    if (form === 'mashita')      return stem + 'ました';
    if (form === 'masendeshita') return stem + 'ませんでした';
    if (form === 'imperative')   return stem;
  }

  return conjugate(keigoVerb, form, { type: keigoType });
}

function buildOStemNiNaru(dict, form) {
  const { type } = normalize(dict);
  let stem;
  if (type === 'ichidan') stem = dict.slice(0, -1);
  else if (type === 'godan') stem = godanStem(dict, 'i');
  else return null;

  const base = 'お' + stem + 'になる';
  return conjugate(base, form, { type: 'godan' });
}

function buildOStemSuru(dict, form) {
  const { type } = normalize(dict);
  let stem;
  if (type === 'ichidan') stem = dict.slice(0, -1);
  else if (type === 'godan') stem = godanStem(dict, 'i');
  else return null;

  const base = 'お' + stem + 'する';
  return conjugate(base, form, { type: 'suru' });
}

// ──────────────────────────────────────────────
// §6  FORMALITY & CASUAL CONTRACTIONS
// ──────────────────────────────────────────────

const FORMALITY_LEVELS = [
  { level: 0, label: '超カジュアル', en: 'ultra casual',  desc: 'ため口+省略' },
  { level: 1, label: 'カジュアル',   en: 'casual',        desc: '普通形 (plain)' },
  { level: 2, label: '普通形',       en: 'plain',         desc: '辞書形ベース' },
  { level: 3, label: '丁寧語',       en: 'polite',        desc: 'ます/です形' },
  { level: 4, label: '謙譲語',       en: 'humble',        desc: 'kenjōgo' },
  { level: 5, label: '尊敬語',       en: 'honorific',     desc: 'sonkeigo' },
];

const CONTRACTIONS = [
  { from: /ている/g,    to: 'てる'  },
  { from: /ていた/g,    to: 'てた'  },
  { from: /ていない/g,  to: 'てない' },
  { from: /ています/g,  to: 'てます' },
  { from: /でいる/g,    to: 'でる'  },
  { from: /でいた/g,    to: 'でた'  },
  { from: /てしまう/g,  to: 'ちゃう' },
  { from: /てしまった/g,to: 'ちゃった'},
  { from: /でしまう/g,  to: 'じゃう' },
  { from: /でしまった/g,to: 'じゃった'},
  { from: /ておく/g,    to: 'とく'  },
  { from: /ておいた/g,  to: 'といた' },
  { from: /ていく/g,    to: 'てく'  },
  { from: /なければ/g,  to: 'なきゃ' },
  { from: /なくては/g,  to: 'なくちゃ'},
  { from: /のだ/g,      to: 'んだ'  },
  { from: /のです/g,    to: 'んです' },
  { from: /という/g,    to: 'って'  },
  { from: /れば$/,      to: 'りゃ'  },
  { from: /すれば$/,    to: 'すりゃ' },
];

function applyContractions(str, level = 0) {
  const rules = level <= 0 ? CONTRACTIONS : CONTRACTIONS.slice(0, 11);
  let result = str;
  for (const r of rules) {
    result = result.replace(r.from, r.to);
  }
  return result;
}

// ──────────────────────────────────────────────
// §7  PEDAGOGICAL DISTRACTOR ENGINE
// ──────────────────────────────────────────────

/**
 * Generate 3 linguistically plausible distractors for a verb and target form.
 * Models real learner error patterns (SLA contrastive analysis):
 *  1. Group misapplication (treating ichidan as godan or vice-versa)
 *  2. Euphony/gemination failure (e.g. 行いて instead of 行って)
 *  3. Voicing confusion (e.g. 飲んで -> 飲んて, 書いて -> 書いで)
 *  4. Ra-nuki (食べれる for 食べられる)
 *  5. Tense / polarity inversion
 */
function generateDistractors(word, targetForm, opts = {}) {
  const correct = conjugate(word, targetForm, opts);
  if (!correct) return [];

  const norm = normalize(word, opts.type, opts);
  const type = norm ? norm.type : 'godan';
  const distractors = new Set();

  // Strategy 1: Other valid forms of the same verb
  const alternateForms = ['te', 'ta', 'nai', 'masu', 'potential', 'passive', 'causative', 'ba']
    .filter(f => f !== targetForm);

  for (const f of alternateForms) {
    const cand = conjugate(word, f, opts);
    if (cand && cand !== correct && !distractors.has(cand)) {
      distractors.add(cand);
      if (distractors.size >= 3) break;
    }
  }

  // Strategy 2: Grammatical rule confusion
  if (type === 'ichidan') {
    // Treat as Godan (e.g. 食べる -> 食べって, 食べす, 食べない -> 食べらない)
    if (targetForm === 'te') distractors.add(word.slice(0, -1) + 'って');
    if (targetForm === 'ta') distractors.add(word.slice(0, -1) + 'った');
    if (targetForm === 'nai') distractors.add(word.slice(0, -1) + 'らない');
    if (targetForm === 'potential' || targetForm === 'passive') {
      // Ra-nuki (ら抜き言葉: 食べれる)
      distractors.add(word.slice(0, -1) + 'れる');
    }
  } else if (type === 'godan') {
    // Treat as Ichidan (e.g. 飲む -> 飲て, 書く -> 書て)
    if (targetForm === 'te') distractors.add(word.slice(0, -1) + 'て');
    if (targetForm === 'ta') distractors.add(word.slice(0, -1) + 'た');
    if (targetForm === 'nai') distractors.add(word.slice(0, -1) + 'ない');

    // Missing euphonic changes for 行く
    if (word.endsWith('行く') || word.endsWith('いく')) {
      if (targetForm === 'te') distractors.add(word.slice(0, -1) + 'いて');
      if (targetForm === 'ta') distractors.add(word.slice(0, -1) + 'いた');
    }
    // Voicing swap (で <-> て)
    if (correct.endsWith('で')) distractors.add(correct.slice(0, -1) + 'て');
    else if (correct.endsWith('だ')) distractors.add(correct.slice(0, -1) + 'た');
    else if (correct.endsWith('いて')) distractors.add(correct.slice(0, -2) + 'いで');
  }

  // Clean up and return exactly 3 distractors
  distractors.delete(correct);
  const out = Array.from(distractors).filter(Boolean);

  // Fill up if fewer than 3
  while (out.length < 3) {
    const fakes = ['ます', 'ない', 'た', 'て', 'れる'];
    const fake = word.slice(0, -1) + fakes[out.length % fakes.length];
    if (fake !== correct && !out.includes(fake)) {
      out.push(fake);
    } else {
      out.push(correct + 'よ');
    }
  }

  return out.slice(0, 3);
}

// ──────────────────────────────────────────────
// §8  PUBLIC API
// ──────────────────────────────────────────────

/**
 * Main conjugation function
 *
 * @param {string} word   — Dictionary form (kanji/kana/romaji)
 * @param {string} form   — Form key (see FORMS in §2)
 * @param {object} opts   — Optional:
 *   opts.type         {string}  — 'godan'|'ichidan'|'suru'|'kuru'|'adj-i'|'adj-na'|'noun'
 *   opts.reading      {string}  — Hiragana reading for kanji verbs
 *   opts.formality    {number}  — 0–5 (default: infer from form)
 *   opts.keigo        {'sonkei'|'kenjo'} — apply keigo layer
 *   opts.casual       {boolean} — apply contraction layer
 *
 * @returns {string|null}
 */
function conjugate(word, form, opts = {}) {
  const n = normalize(word, opts.type, opts);
  if (!n) return null;
  const { dict, type } = n;

  if (opts.keigo) {
    return conjugateKeigo(dict, opts.keigo, form);
  }

  let result = null;

  if (type === 'suru' || type === 'kuru' || type === 'godan' || type === 'ichidan') {
    result = conjugateVerb(dict, form, type);
  } else if (type === 'adj-i') {
    result = conjugateAdjI(dict, form);
  } else if (type === 'adj-na' || type === 'noun') {
    result = conjugateNaOrNoun(dict, form);
  } else if (type === 'copula') {
    const copulaMap = {
      dict:'だ', masu:'です', masen:'じゃありません',
      mashita:'でした', masendeshita:'じゃありませんでした',
      nai:'じゃない', ta:'だった', nakatta:'じゃなかった',
      te:'で', tara:'だったら', nara:'なら',
    };
    result = copulaMap[form] || null;
  }

  if (result && opts.casual) {
    const level = typeof opts.formality === 'number' ? opts.formality : 0;
    result = applyContractions(result, level);
  }

  return result;
}

function conjugateAll(word, opts = {}) {
  const n = normalize(word, opts.type, opts);
  if (!n) return {};
  const out = {};
  for (const key of Object.keys(FORMS)) {
    const result = conjugate(word, key, opts);
    if (result) out[key] = result;
  }
  return out;
}

function getKeigoPair(word, form = 'masu') {
  const entry = findKeigoByBase(word);
  return {
    sonkei: conjugateKeigo(word, 'sonkei', form),
    kenjo : conjugateKeigo(word, 'kenjo',  form),
    entry,
  };
}

function contract(str, level = 0) {
  return applyContractions(str, level);
}

function getFormalityMeta(level) {
  return FORMALITY_LEVELS[level] || null;
}

function listForms() {
  return Object.entries(FORMS).map(([key, meta]) => ({ key, ...meta }));
}

// ──────────────────────────────────────────────
// §9  CONJUGATION SEMANTICS & SENTENCE EXAMPLES
// ──────────────────────────────────────────────

const FORM_SEMANTICS = {
  dict: {
    id_label: 'Bentuk Kamus (Biasa / Plain)',
    formula: '{verb} (bentuk netral / masa kini)',
    particle_rule: 'Pola kalimat standar (Subjek は/が Objek を Verba).',
    category: 'core'
  },
  masu: {
    id_label: 'Bentuk Sopan (Present Polite)',
    formula: '{verb} (sopan / formal)',
    particle_rule: 'Pola standar dengan nada sopan kepada lawan bicara.',
    category: 'polite'
  },
  masen: {
    id_label: 'Bentuk Negatif Sopan',
    formula: 'Tidak / bukan {verb} (sopan)',
    particle_rule: 'Menegasikan tindakan secara formal.',
    category: 'polite'
  },
  mashita: {
    id_label: 'Bentuk Lampau Sopan',
    formula: 'Sudah / telah {verb} (sopan)',
    particle_rule: 'Menyatakan tindakan yang telah selesai di masa lampau.',
    category: 'polite'
  },
  masendeshita: {
    id_label: 'Bentuk Negatif Lampau Sopan',
    formula: 'Tidak / belum {verb} (lampau sopan)',
    particle_rule: 'Menyatakan bahwa tindakan tidak dilakukan di masa lampau.',
    category: 'polite'
  },
  mashou: {
    id_label: 'Bentuk Ajakan Sopan (Volisional Polite)',
    formula: 'Mari / ayo kita {verb}',
    particle_rule: 'Mengajak lawan bicara atau menawarkan bantuan (misal: 手伝いましょうか).',
    category: 'volitional'
  },
  nai: {
    id_label: 'Bentuk Negatif Kasual (Plain Negative)',
    formula: 'Tidak {verb}',
    particle_rule: 'Digunakan dalam situasi akrab atau sebagai dasar tata bahasa lanjutan (ないで, なければ).',
    category: 'plain'
  },
  nakatta: {
    id_label: 'Bentuk Negatif Lampau Kasual',
    formula: 'Kemarin / tadi tidak {verb}',
    particle_rule: 'Negasi tindakan di masa lampau untuk percakapan akrab.',
    category: 'plain'
  },
  ta: {
    id_label: 'Bentuk Lampau Kasual (Plain Past)',
    formula: 'Sudah / telah {verb}',
    particle_rule: 'Menyatakan aksi lampau kasual atau kondisi yang telah terwujud.',
    category: 'plain'
  },
  te: {
    id_label: 'Bentuk Penghubung (-te form)',
    formula: '{verb} lalu / dan...',
    particle_rule: 'Menghubungkan dua aksi berurutan, dasar dari てください (mohon) dan ている (sedang).',
    category: 'connector'
  },
  ba: {
    id_label: 'Bentuk Pengandaian Syarat (-ba)',
    formula: 'Jika / seandainya {verb}',
    particle_rule: 'Menyatakan syarat logis: jika syarat A terpenuhi, maka B terjadi.',
    category: 'conditional'
  },
  tara: {
    id_label: 'Bentuk Pengandaian Temporal (-tara)',
    formula: 'Kalau / setelah {verb}',
    particle_rule: 'Fokus pada urutan waktu: setelah kondisi A selesai, baru tindakan B dilakukan.',
    category: 'conditional'
  },
  tari: {
    id_label: 'Bentuk Contoh Tindakan (-tari)',
    formula: 'Kadang {verb}, kadang...',
    particle_rule: 'Berpasangan dengan 〜たりする untuk menyebutkan contoh aktivitas yang bervariasi.',
    category: 'listing'
  },
  you: {
    id_label: 'Bentuk Ajakan Kasual (Volisional Plain)',
    formula: 'Ayo kita {verb} / berniat {verb}',
    particle_rule: 'Dipakai mengajak teman akrab atau digabung 〜と思う (berencana untuk...).',
    category: 'volitional'
  },
  potential: {
    id_label: 'Bentuk Potensial (Kemampuan / Kesanggupan)',
    formula: 'Bisa / dapat {verb}',
    particle_rule: 'Partikel objek yang biasanya memakai を sering kali berubah menjadi が (misal: 魚が食べられる, 日本語が話せる).',
    category: 'ability'
  },
  potential_neg: {
    id_label: 'Bentuk Negatif Potensial',
    formula: 'Tidak bisa / tidak sanggup {verb}',
    particle_rule: 'Objek sering kali ditandai dengan が atau は (untuk kontras: 納豆は食べられない).',
    category: 'ability'
  },
  passive: {
    id_label: 'Bentuk Pasif (Di- / Ter-)',
    formula: 'Di-{verb} oleh seseorang',
    particle_rule: 'Pelaku tindakan ditandai dengan partikel に (misal: 先生に褒められた - dipuji oleh guru). Jika pasif penderitaan, objek penderita tetap memakai を.',
    category: 'voice'
  },
  passive_neg: {
    id_label: 'Bentuk Negatif Pasif',
    formula: 'Tidak di-{verb} oleh seseorang',
    particle_rule: 'Pelaku tetap ditandai dengan partikel に.',
    category: 'voice'
  },
  causative: {
    id_label: 'Bentuk Kausatif (Menyuruh / Membiarkan)',
    formula: 'Menyuruh / membuat / membiarkan seseorang {verb}',
    particle_rule: 'Orang yang disuruh/diberi izin ditandai dengan partikel に (jika verba transitif) atau を (jika verba intransitif).',
    category: 'voice'
  },
  causative_neg: {
    id_label: 'Bentuk Negatif Kausatif',
    formula: 'Tidak menyuruh / tidak membiarkan seseorang {verb}',
    particle_rule: 'Pihak yang dituju tetap ditandai dengan に.',
    category: 'voice'
  },
  causpass: {
    id_label: 'Bentuk Kausatif-Pasif (Panjang)',
    formula: 'Terpaksa / disuruh {verb} oleh seseorang',
    particle_rule: 'Pihak yang memaksa/menyuruh ditandai dengan に (misal: 母に野菜を食べさせられた).',
    category: 'voice'
  },
  causpass_short: {
    id_label: 'Bentuk Kausatif-Pasif (Pendek / Singkat)',
    formula: 'Terpaksa / disuruh {verb}',
    particle_rule: 'Hanya berlaku untuk verba Godan bukan berakhiran す (misal: 書かされる, 飲まされる). Verba berakhiran す tetap memakai bentuk panjang (話させられる).',
    category: 'voice'
  },
  imperative: {
    id_label: 'Bentuk Perintah Kasual / Tegas',
    formula: '{verb}-lah! (perintah langsung)',
    particle_rule: 'Nada perintah keras/darurat atau instruksi olahraga.',
    category: 'directive'
  },
  prohibitive: {
    id_label: 'Bentuk Larangan Kasual (Jangan)',
    formula: 'Jangan {verb}!',
    particle_rule: 'Ditambahkan な di akhir bentuk kamus (misal: 飲むな!). Larangan tegas dan keras.',
    category: 'directive'
  },
  teiru: {
    id_label: 'Bentuk Sedang Berlangsung / Keadaan (Progressive / State)',
    formula: 'Sedang {verb} / dalam keadaan {verb}',
    particle_rule: 'Untuk verba aksi berarti sedang berlangsung. Untuk verba perubahan kondisi (misal: 結婚する, 住む, 知る) berarti status keadaan yang sedang berlangsung.',
    category: 'aspect'
  },
  teinai: {
    id_label: 'Bentuk Belum / Tidak Sedang',
    formula: 'Belum / tidak sedang {verb}',
    particle_rule: 'Menyatakan bahwa tindakan belum selesai atau tidak sedang berlangsung.',
    category: 'aspect'
  },
  tai: {
    id_label: 'Bentuk Keinginan (Ingin / Mau)',
    formula: 'Ingin {verb}',
    particle_rule: 'Objek bisa memakai partikel を atau が (misal: 水を飲みたい / 水が飲みたい). Berkonjugasi seperti い-adjektiva.',
    category: 'desiderative'
  },
  tai_neg: {
    id_label: 'Bentuk Negatif Keinginan',
    formula: 'Tidak ingin {verb}',
    particle_rule: 'Berkonjugasi seperti くない (misal: 行きたくない).',
    category: 'desiderative'
  },
  tai_past: {
    id_label: 'Bentuk Keinginan Lampau',
    formula: 'Tadinya ingin {verb}',
    particle_rule: 'Menyatakan keinginan di masa lampau yang mungkin sudah atau tidak terwujud.',
    category: 'desiderative'
  },
  zuni: {
    id_label: 'Bentuk Formal Tanpa Melakukan (-zuni)',
    formula: 'Tanpa {verb} (bahasa tulis / formal)',
    particle_rule: 'Bentuk formal dari ないで. Pola: [あ-stem] + ずに (pengecualian: する -> せずに).',
    category: 'adverbial'
  },
  naide: {
    id_label: 'Bentuk Tanpa / Tolong Jangan (-naide)',
    formula: 'Tanpa {verb} / Tolong jangan...',
    particle_rule: 'Keterangan cara (berangkat tanpa sarapan) atau permohonan larangan jika diikuti ください.',
    category: 'adverbial'
  },
  nagara: {
    id_label: 'Bentuk Sambil Melakukan (-nagara)',
    formula: 'Sambil {verb}...',
    particle_rule: 'Ditempelkan pada masu-stem. Aksi utama selalu berada di klausa belakang.',
    category: 'adverbial'
  },
  yasui: {
    id_label: 'Bentuk Kemudahan / Enak Dilakukan (-yasui)',
    formula: 'Mudah untuk di-{verb} / enak di-{verb}',
    particle_rule: 'Ditempelkan pada masu-stem. Berkonjugasi sebagai い-adjektiva (misal: 飲みやすい).',
    category: 'facility'
  },
  nikui: {
    id_label: 'Bentuk Kesulitan (-nikui)',
    formula: 'Sulit / susah untuk di-{verb}',
    particle_rule: 'Ditempelkan pada masu-stem. Berkonjugasi sebagai い-adjektiva (misal: 読みにくい).',
    category: 'facility'
  },
  sugiru: {
    id_label: 'Bentuk Berlebihan / Terlalu (-sugiru)',
    formula: 'Terlalu banyak / berlebihan {verb}',
    particle_rule: 'Ditempelkan pada masu-stem. Berkonjugasi sebagai verba Ichidan (misal: 食べすぎた, 飲みすぎる).',
    category: 'excessive'
  }
};

function inferVerbCategory(word) {
  if (!word) return 'general';
  if (['食べる','飲む','吸う','味わう','召し上がる'].includes(word) || /食べる|飲む/.test(word)) return 'consumption';
  if (['行く','来る','帰る','歩く','走る','通う','出る','向かう','飛ぶ','泳ぐ'].includes(word) || /行く|来る|帰る|歩く|走る/.test(word)) return 'motion';
  if (['話す','言う','聞く','伝える','答える','教える','相談する'].includes(word) || /話す|言う/.test(word)) return 'communication';
  if (['見る','読む','書く','知る','覚える','考える','思い出す','探す'].includes(word) || /見る|読む|書く/.test(word)) return 'cognition';
  if (['買う','売る','払う','借りる','貸す','送る','渡す'].includes(word) || /買う|売る/.test(word)) return 'transaction';
  if (['ある','いる','住む','泊まる','残る'].includes(word) || /住む|泊まる/.test(word)) return 'state_existence';
  return 'general';
}

function generateExampleSentence(word, formKey, conjugated, opts = {}) {
  const conj = conjugated || word;
  const isAdjI = opts.type === 'adj-i' || formKey.startsWith('adj-');
  const isAdjNa = opts.type === 'adj-na' || formKey.startsWith('na-');

  // Adjective-specific sentence templates
  if (isAdjI) {
    const adjITemplates = {
      'adj-dict': { jp: `この景色はとても${conj}です。`, reading: `この けしきは とても ${conj}です。`, id: `Pemandangan ini sangat ${word}.` },
      'adj-nai': { jp: `この料理はあまり${conj}です。`, reading: `この りょうりは あまり ${conj}です。`, id: `Masakan ini tidak begitu ${word}.` },
      'adj-katta': { jp: `昨日の映画はとても${conj}です。`, reading: `きのうの えいがは とても ${conj}です。`, id: `Film kemarin sangat ${word}.` },
      'adj-nakatta': { jp: `昨日のテストはあまり${conj}です。`, reading: `きのうの てすとは あまり ${conj}です。`, id: `Ujian kemarin tidak begitu ${word}.` },
      'adj-kute': { jp: `軽くて${conj}、持ち運びに便利です。`, reading: `かるくて ${conj}、もちはこびに べんりです。`, id: `Ringan dan ${word}, praktis untuk dibawa.` },
      'adj-ku': { jp: `もっと${conj}なりました。`, reading: `もっと ${conj} なりました。`, id: `Menjadi lebih ${word}.` },
      'sou': { jp: `とても${conj}ですね。`, reading: `とても ${conj}ですね。`, id: `Kelihatannya sangat ${word} ya.` },
      'ba': { jp: `${conj}、買いたいです。`, reading: `${conj}、かいたいです。`, id: `Jika ${word}, saya ingin membelinya.` },
      'tara': { jp: `${conj}、教えてください。`, reading: `${conj}、おしえて ください。`, id: `Jika ${word}, tolong beritahu saya.` }
    };
    if (adjITemplates[formKey]) return adjITemplates[formKey];
  }

  if (isAdjNa) {
    const adjNaTemplates = {
      'na-dict': { jp: `この町はとても${conj}です。`, reading: `この まちは とても ${conj}です。`, id: `Kota ini sangat ${word}.` },
      'na-na': { jp: `${conj}場所でゆっくり本を読みたいです。`, reading: `${conj} ばしょで ゆっくり ほんを よみたいです。`, id: `Ingin membaca buku dengan santai di tempat yang ${word}.` },
      'na-de': { jp: `ここは${conj}、とても過ごしやすいです。`, reading: `ここは ${conj}、とても すごしやすいです。`, id: `Di sini ${word} dan sangat nyaman ditinggali.` },
      'na-da': { jp: `夜になると、周りはとても${conj}。`, reading: `よるに なると、まわりは とても ${conj}。`, id: `Ketika malam tiba, sekeliling menjadi sangat ${word}.` },
      'na-datta': { jp: `昔はここもとても${conj}です。`, reading: `むかしは ここも とても ${conj}です。`, id: `Dahulu di sini juga sangat ${word}.` },
      'na-janai': { jp: `昼間はあまり${conj}です。`, reading: `ひるまは あまり ${conj}です。`, id: `Siang hari tidak begitu ${word}.` },
      'na-janakatta': { jp: `昨日はあまり${conj}です。`, reading: `きのうは あまり ${conj}です。`, id: `Kemarin tidak begitu ${word}.` },
      'na-nara': { jp: `${conj}、ここで勉強しましょう。`, reading: `${conj}、ここで べんきょう しましょう。`, id: `Jika memang ${word}, mari belajar di sini.` },
      'na-ni': { jp: `部屋の中では${conj}してください。`, reading: `へやの なかでは ${conj} してください。`, id: `Di dalam ruangan harap lakukan secara ${word}.` },
      'sou': { jp: `とても${conj}に見えます。`, reading: `とても ${conj}に みえます。`, id: `Kelihatannya sangat ${word}.` },
      'dict': { jp: `この町はとても${conj}です。`, reading: `この まちは とても ${conj}です。`, id: `Kota ini sangat ${word}.` },
      'masu': { jp: `ここは普段とても${conj}。`, reading: `ここは ふだん とても ${conj}。`, id: `Di sini biasanya sangat ${word}.` },
      'masen': { jp: `ここはあまり${conj}。`, reading: `ここは あまり ${conj}。`, id: `Di sini tidak begitu ${word}.` },
      'mashita': { jp: `昨日はとても${conj}。`, reading: `きのうは とても ${conj}。`, id: `Kemarin sangat ${word}.` },
      'masendeshita': { jp: `昨日はあまり${conj}。`, reading: `きのうは あまり ${conj}。`, id: `Kemarin tidak begitu ${word}.` },
      'nai': { jp: `昼間はあまり${conj}。`, reading: `ひるまは あまり ${conj}。`, id: `Siang hari tidak begitu ${word}.` },
      'ta': { jp: `昔はここも${conj}。`, reading: `むかしは ここも ${conj}。`, id: `Dahulu di sini juga ${word}.` },
      'te': { jp: `ここは${conj}、とても過ごしやすいです。`, reading: `ここは ${conj}、とても すごしやすいです。`, id: `Di sini ${word} dan sangat nyaman ditinggali.` },
      'ba': { jp: `${conj}、ここで勉強したいです。`, reading: `${conj}、ここで べんきょう したいです。`, id: `Jika ${word}, saya ingin belajar di sini.` },
      'tara': { jp: `${conj}、ぜひ行きたいです。`, reading: `${conj}、ぜひ いきたいです。`, id: `Jika ${word}, saya pasti ingin ke sana.` }
    };
    if (adjNaTemplates[formKey]) return adjNaTemplates[formKey];
  }

  const cat = inferVerbCategory(word);
  const templates = {
    consumption: {
      potential: { jp: `辛い料理が${conj}。`, reading: `からい りょうりが ${conj}。`, id: `Bisa makan/minum masakan pedas.` },
      tai: { jp: `おいしい日本料理が${conj}です。`, reading: `おいしい にほんりょうりが ${conj}です。`, id: `Ingin makan/minum masakan Jepang yang lezat.` },
      sugiru: { jp: `昨日お酒を${conj}ました。`, reading: `きのう おさけを ${conj}ました。`, id: `Kemarin terlalu banyak minum.` },
      yasui: { jp: `この料理はとても${conj}です。`, reading: `この りょうりは とても ${conj}です。`, id: `Makanan/minuman ini enak dan mudah dimakan/diminum.` },
      causative: { jp: `母は子供に野菜を${conj}。`, reading: `ははは こどもに やさいを ${conj}。`, id: `Ibu menyuruh/membiarkan anak makan sayur.` },
      causpass: { jp: `嫌いなものを無理に${conj}。`, reading: `きらいな ものを むりに ${conj}。`, id: `Terpaksa disuruh makan/minum yang tidak disukai.` },
      causpass_short: { jp: `嫌いなものを無理に${conj}。`, reading: `きらいな ものを むりに ${conj}。`, id: `Terpaksa disuruh makan/minum yang tidak disukai.` },
      zuni: { jp: `朝ご飯を${conj}、学校へ行きました。`, reading: `あさごはんを ${conj}、がっこうへ いきました。`, id: `Pergi ke sekolah tanpa makan sarapan pagi.` },
      ba: { jp: `薬を${conj}、すぐに良くなります。`, reading: `くすりを ${conj}、すぐに よくなります。`, id: `Jika minum obat, akan segera membaik.` },
      tara: { jp: `ご飯を${conj}、出かけましょう。`, reading: `ごはんを ${conj}、でかけましょう。`, id: `Setelah makan, mari kita berangkat.` },
      teiru: { jp: `今、家族と一緒に夕飯を${conj}ところです。`, reading: `いま、かぞくと いっしょに ゆうはんを ${conj} ところです。`, id: `Sekarang sedang makan malam bersama keluarga.` },
      te: { jp: `温かいうちにどうぞ${conj}ください。`, reading: `あたたかいうちに どうぞ ${conj} ください。`, id: `Silakan makan/minum selagi masih hangat.` },
      masu: { jp: `毎朝、パンとコーヒーを${conj}。`, reading: `まいあさ、ぱんと こーひーを ${conj}。`, id: `Setiap pagi sarapan roti dan minum kopi.` },
      nai: { jp: `朝はあまりご飯を${conj}。`, reading: `あさは あまり ごはんを ${conj}。`, id: `Pagi hari tidak begitu banyak makan.` },
    },
    motion: {
      potential: { jp: `来年、日本へ${conj}たらいいですね。`, reading: `らいねん、にほんへ ${conj}たら いいですね。`, id: `Alangkah baiknya jika tahun depan bisa pergi ke Jepang.` },
      tai: { jp: `いつか日本へ${conj}です。`, reading: `いつか にほんへ ${conj}です。`, id: `Suatu hari nanti saya ingin pergi ke Jepang.` },
      ba: { jp: `まっすぐ${conj}、右側に駅があります。`, reading: `まっすぐ ${conj}、みぎがわに えきが あります。`, id: `Jika jalan lurus, akan ada stasiun di sebelah kanan.` },
      tara: { jp: `駅に${conj}、電話してください。`, reading: `えきに ${conj}、でんわ して ください。`, id: `Jika sudah tiba di stasiun, tolong telepon saya.` },
      teiru: { jp: `今、駅に向かって${conj}ところです。`, reading: `いま、えきに むかって ${conj} ところです。`, id: `Sekarang sedang berjalan menuju ke arah stasiun.` },
      te: { jp: `気をつけて${conj}ください。`, reading: `きをつけて ${conj} ください。`, id: `Hati-hatilah dalam perjalanan.` },
      masu: { jp: `毎日、電車で会社へ${conj}。`, reading: `まいにち、でんしゃで かいしゃへ ${conj}。`, id: `Setiap hari pergi ke kantor naik kereta.` },
      nai: { jp: `今日は雨だからどこへも${conj}。`, reading: `きょうは あめだから どこへも ${conj}。`, id: `Hari ini karena hujan tidak pergi ke mana-mana.` }
    },
    communication: {
      potential: { jp: `日本語が少し${conj}ようになりたいです。`, reading: `にほんごが すこし ${conj}ように なりたいです。`, id: `Saya ingin bisa berbicara bahasa Jepang sedikit demi sedikit.` },
      tai: { jp: `先生と日本語で${conj}です。`, reading: `せんせいと にほんごで ${conj}です。`, id: `Saya ingin berbicara dalam bahasa Jepang dengan guru.` },
      te: { jp: `もう一度ゆっくり${conj}ください。`, reading: `もういちど ゆっくり ${conj} ください。`, id: `Tolong bicaralah sekali lagi secara perlahan.` },
      zuni: { jp: `何も${conj}、静かに部屋を出ました。`, reading: `なにも ${conj}、しずかに へやを でました。`, id: `Keluar dari kamar dengan tenang tanpa mengatakan apa pun.` },
      masu: { jp: `友達と楽しく${conj}。`, reading: `ともだちと たのしく ${conj}。`, id: `Berbicara dengan gembira bersama teman.` },
      nai: { jp: `誰にも秘密を${conj}。`, reading: `だれにも ひみつを ${conj}。`, id: `Tidak membicarakan rahasia kepada siapa pun.` }
    },
    cognition: {
      potential: { jp: `眼鏡をかければ、字がよく${conj}。`, reading: `めがねを かければ、じが よく ${conj}。`, id: `Kalau memakai kacamata, hurufnya bisa terlihat/terbaca dengan jelas.` },
      yasui: { jp: `この本は字が大きくて${conj}です。`, reading: `この ほんは じが おおきくて ${conj}です。`, id: `Buku ini hurufnya besar sehingga mudah dibaca.` },
      nikui: { jp: `暗くて字が${conj}です。`, reading: `くらくて じが ${conj}です。`, id: `Karena gelap, hurufnya sulit dibaca/dilihat.` },
      tai: { jp: `新しい漢字をたくさん${conj}です。`, reading: `あたらしい かんじを たくさん ${conj}です。`, id: `Saya ingin melihat/mempelajari banyak kanji baru.` },
      teiru: { jp: `そのことなら、よく${conj}。`, reading: `その ことなら、よく ${conj}。`, id: `Kalau hal itu, saya mengetahuinya dengan baik.` },
      te: { jp: `黒板の字をよく${conj}ください。`, reading: `こくばんの じを よく ${conj} ください。`, id: `Tolong lihat/baca tulisan di papan tulis dengan seksama.` }
    },
    transaction: {
      potential: { jp: `安ければ、ここで${conj}ます。`, reading: `やすければ、ここで ${conj}ます。`, id: `Kalau murah, bisa membeli di sini.` },
      tai: { jp: `新しいパソコンが${conj}です。`, reading: `あたらしい ぱそこんが ${conj}です。`, id: `Saya ingin membeli laptop baru.` },
      tara: { jp: `お金が貯まっ${conj}、買いたいです。`, reading: `おかねが たまっ${conj}、かいたいです。`, id: `Kalau uang sudah terkumpul, saya ingin membeli.` },
      te: { jp: `レジで代金を${conj}ください。`, reading: `れじで だいきんを ${conj} ください。`, id: `Silakan bayar di kasir.` }
    },
    state_existence: {
      teiru: { jp: `今、東京に${conj}ところです。`, reading: `いま、とうきょうに ${conj} ところです。`, id: `Sekarang tinggal/berada di Tokyo.` },
      tai: { jp: `静かな田舎に${conj}です。`, reading: `しずかな いなかに ${conj}です。`, id: `Saya ingin tinggal di pedesaan yang tenang.` },
      tara: { jp: `日本に${conj}、ぜひ遊びに来てください。`, reading: `にほんに ${conj}、ぜひ あそびに きて ください。`, id: `Kalau berada di Jepang, silakan mampir bermain.` }
    }
  };

  const catTpls = templates[cat] || {};
  if (catTpls[formKey]) return catTpls[formKey];

  // Universal Fallbacks
  const universal = {
    dict: { jp: `毎日、${conj}ようにしています。`, reading: `まいにち、${conj}ように して います。`, id: `Setiap hari berusaha untuk ${word}.` },
    masu: { jp: `いつも朝に${conj}。`, reading: `いつも あさに ${conj}。`, id: `Selalu ${word} di pagi hari.` },
    masen: { jp: `普段はあまり${conj}。`, reading: `ふだんは あまり ${conj}。`, id: `Biasanya tidak begitu sering ${word}.` },
    mashita: { jp: `昨日、無事に${conj}。`, reading: `きのう、ぶじに ${conj}。`, id: `Kemarin sudah ${word} dengan baik.` },
    masendeshita: { jp: `昨日は時間がなくて、${conj}。`, reading: `きのうは じかんが なくて、${conj}。`, id: `Kemarin karena tidak ada waktu, tidak ${word}.` },
    mashou: { jp: `みんなで一緒に${conj}！`, reading: `みんなで いっしょに ${conj}！`, id: `Ayo kita ${word} bersama-sama!` },
    nai: { jp: `今日は体調が悪いので${conj}。`, reading: `きょうは たいちょうが わるいので ${conj}。`, id: `Hari ini karena kurang sehat, tidak ${word}.` },
    nakatta: { jp: `昨日は忙しくて${conj}。`, reading: `きのうは いそがしくて ${conj}。`, id: `Kemarin karena sibuk, tidak ${word}.` },
    ta: { jp: `さっき、ちょうど${conj}ところです。`, reading: `さっき、ちょうど ${conj} ところです。`, id: `Tadi baru saja selesai ${word}.` },
    te: { jp: `どうぞ、ここで${conj}ください。`, reading: `どうぞ、ここで ${conj} ください。`, id: `Silakan ${word} di sini.` },
    teiru: { jp: `今、ちょうど${conj}ところです。`, reading: `いま、ちょうど ${conj} ところです。`, id: `Sekarang sedang ${word}.` },
    teita: { jp: `その時、ちょうど${conj}。`, reading: `その とき、ちょうど ${conj}。`, id: `Pada saat itu, sedang ${word}.` },
    ba: { jp: `よく${conj}、もっと良くなります。`, reading: `よく ${conj}、もっと よくなります。`, id: `Jika sering ${word}, akan menjadi lebih baik.` },
    tara: { jp: `${conj}、すぐに連絡してください。`, reading: `${conj}、すぐに れんらく して ください。`, id: `Jika/setelah ${word}, tolong segera kabari.` },
    potential: { jp: `一人で${conj}ようになりたいです。`, reading: `ひとりで ${conj}ように なりたいです。`, id: `Saya ingin bisa ${word} seorang diri.` },
    tai: { jp: `日本でぜひ${conj}です。`, reading: `にほんで ぜひ ${conj}です。`, id: `Saya benar-benar ingin ${word} di Jepang.` },
    tai_neg: { jp: `今はあまり${conj}です。`, reading: `いまは あまり ${conj}です。`, id: `Sekarang tidak begitu ingin ${word}.` },
    tai_past: { jp: `ずっと前から${conj}です。`, reading: `ずっと まえから ${conj}です。`, id: `Sudah sejak dahulu ingin ${word}.` },
    tai_past_neg: { jp: `あの時はあまり${conj}です。`, reading: `あの ときは あまり ${conj}です。`, id: `Waktu itu tidak begitu ingin ${word}.` },
    volitional: { jp: `明日から${conj}と思います。`, reading: `あすから ${conj}と おもいます。`, id: `Mulai besok saya berniat untuk ${word}.` },
    imperative: { jp: `早く${conj}！`, reading: `はやく ${conj}！`, id: `Cepat ${word}!` },
    prohibitive: { jp: `ここで${conj}！`, reading: `ここで ${conj}！`, id: `Jangan ${word} di sini!` },
    passive: { jp: `先生から${conj}、嬉しかったです。`, reading: `せんせいから ${conj}、うれしかったです。`, id: `Di-${word} oleh guru, saya merasa senang.` },
    causative: { jp: `母は子供に${conj}。`, reading: `ははは こどもに ${conj}。`, id: `Ibu menyuruh/membiarkan anak ${word}.` },
    causpass: { jp: `無理やり${conj}、大変でした。`, reading: `むりやり ${conj}、たいへんでした。`, id: `Terpaksa disuruh ${word}, sangat berat.` },
    causpass_short: { jp: `無理やり${conj}、大変でした。`, reading: `むりやり ${conj}、たいへんでした。`, id: `Terpaksa disuruh ${word}, sangat berat.` },
    zuni: { jp: `${conj}、一日中頑張りました。`, reading: `${conj}、いちにちじゅう がんばりました。`, id: `Berjuang seharian tanpa ${word}.` },
    nagara: { jp: `${conj}、楽しくおしゃべりしました。`, reading: `${conj}、たのしく おしゃべり しました。`, id: `Sambil ${word}, mengobrol dengan gembira.` },
    yasui: { jp: `初心者でもとても${conj}です。`, reading: `しょしんしゃでも とても ${conj}です。`, id: `Bagi pemula pun sangat mudah untuk di-${word}.` },
    nikui: { jp: `慣れていないと${conj}です。`, reading: `なれて いないと ${conj}です。`, id: `Jika belum terbiasa, sulit untuk di-${word}.` },
    sou: { jp: `とても${conj}に見えます。`, reading: `とても ${conj}に みえます。`, id: `Kelihatannya sangat ${word}.` },
    sugiru: { jp: `あまり${conj}と体に良くないです。`, reading: `あまり ${conj}と からだに よくないです。`, id: `Kalau terlalu banyak ${word}, tidak baik untuk kesehatan.` }
  };

  return universal[formKey] || {
    jp: `${conj}ことができます。`,
    reading: `${conj}ことが できます。`,
    id: `Bisa / dapat ${word}.`
  };
}

/**
 * Explain a single conjugation form with semantic meaning, syntax rules, and sentence example.
 */
function explain(word, formKey, opts = {}) {
  const n = normalize(word, opts.type, opts);
  if (!n) return null;
  const { dict, type } = n;
  const formMeta = FORMS[formKey] || { label: formKey, en: formKey };
  const semantic = FORM_SEMANTICS[formKey] || {
    id_label: formMeta.label,
    formula: `{verb} (${formMeta.en})`,
    particle_rule: 'Mengikuti tata bahasa standar.',
    category: 'other'
  };

  const conjugated = conjugate(word, formKey, opts);
  if (!conjugated) return null;

  let colloquial = null;
  if (type === 'ichidan' && (formKey === 'potential' || formKey === 'passive')) {
    colloquial = dict.slice(0, -1) + 'れる'; // Ra-nuki
  }

  const example = generateExampleSentence(dict, formKey, conjugated, { ...opts, type });

  return {
    word: dict,
    reading: opts.reading || '',
    type: type,
    formKey: formKey,
    form_key: formKey,
    formLabelJp: formMeta.label,
    form_label_jp: formMeta.label,
    formLabelEn: formMeta.en,
    form_label_en: formMeta.en,
    formLabelId: semantic.id_label,
    form_label_id: semantic.id_label,
    conjugated: conjugated,
    colloquial: colloquial,
    meaning_formula: semantic.formula,
    meaning_id: semantic.formula.replace('{verb}', dict),
    particle_rule: semantic.particle_rule,
    example: example
  };
}

/**
 * Inspect all available conjugations for a word with full semantics & sentence examples.
 */
function inspectAll(word, opts = {}) {
  const n = normalize(word, opts.type, opts);
  if (!n) return [];
  const results = [];
  for (const formKey of Object.keys(FORMS)) {
    const exp = explain(word, formKey, opts);
    if (exp) results.push(exp);
  }
  return results;
}

// ──────────────────────────────────────────────
// §10 COMPREHENSIVE SELF-TEST & VERIFICATION
// ──────────────────────────────────────────────

function selfTest() {
  const cases = [
    // Single-kanji Ichidan edge cases
    { verb:'見る',       type:'ichidan', form:'te',             expected:'見て' },
    { verb:'見る',       type:'ichidan', form:'nai',            expected:'見ない' },
    { verb:'見る',       type:'ichidan', form:'potential',      expected:'見られる' },
    { verb:'出る',       type:'ichidan', form:'te',             expected:'出て' },
    { verb:'出る',       type:'ichidan', form:'masu',           expected:'出ます' },
    { verb:'寝る',       type:'ichidan', form:'te',             expected:'寝て' },
    { verb:'着る',       type:'ichidan', form:'te',             expected:'着て' },
    { verb:'似る',       type:'ichidan', form:'nai',            expected:'似ない' },

    // Extended Godan exceptions
    { verb:'帰る',       type:'godan',   form:'te',             expected:'帰って' },
    { verb:'帰る',       type:'godan',   form:'nai',            expected:'帰らない' },
    { verb:'切る',       type:'godan',   form:'te',             expected:'切って' },
    { verb:'知る',       type:'godan',   form:'masu',           expected:'知ります' },
    { verb:'入る',       type:'godan',   form:'te',             expected:'入って' },
    { verb:'走る',       type:'godan',   form:'potential',      expected:'走れる' },
    { verb:'要る',       type:'godan',   form:'nai',            expected:'要らない' },
    { verb:'減る',       type:'godan',   form:'te',             expected:'減って' },

    // Special Honorific Verbs
    { verb:'くださる',   type:'godan',   form:'masu',           expected:'くださいます' },
    { verb:'くださる',   type:'godan',   form:'imperative',     expected:'ください' },
    { verb:'なさる',     type:'godan',   form:'masu',           expected:'なさいます' },
    { verb:'いらっしゃる',type:'godan',   form:'masu',           expected:'いらっしゃいます' },
    { verb:'おっしゃる', type:'godan',   form:'masu',           expected:'おっしゃいます' },

    // Compound iku & kuru
    { verb:'行く',       type:'godan',   form:'te',             expected:'行って' },
    { verb:'持っていく', type:'godan',   form:'te',             expected:'持っていって' },
    { verb:'連れて行く', type:'godan',   form:'te',             expected:'連れて行って' },
    { verb:'来る',       type:'kuru',    form:'te',             expected:'来て' },
    { verb:'持ってくる', type:'kuru',    form:'te',             expected:'持ってきて' },
    { verb:'連れて来る', type:'kuru',    form:'te',             expected:'連れて来て' },

    // Compound ii adjectives
    { verb:'いい',       type:'adj-i',   form:'adj-nai',        expected:'よくない' },
    { verb:'かっこいい', type:'adj-i',   form:'adj-nai',        expected:'かっこよくない' },
    { verb:'かっこいい', type:'adj-i',   form:'adj-katta',      expected:'かっこよかった' },
    { verb:'頭がいい',   type:'adj-i',   form:'adj-kute',       expected:'頭がよくて' },

    // Short causative-passive
    { verb:'書く',       type:'godan',   form:'causpass_short', expected:'書かされる' },
    { verb:'飲む',       type:'godan',   form:'causpass_short', expected:'飲まされる' },
    { verb:'話す',       type:'godan',   form:'causpass_short', expected:'話させられる' }, // no -sasareru

    // Hiragana godan exceptions
    { verb:'かえる',     type:'godan',   form:'te',             expected:'かえって' },
    { verb:'きる',       type:'godan',   form:'te',             expected:'きって' },
    { verb:'はいる',     type:'godan',   form:'te',             expected:'はいって' },

    // Desiderative & Negative te-form
    { verb:'食べる',     type:'ichidan', form:'tai',            expected:'食べたい' },
    { verb:'食べる',     type:'ichidan', form:'tai_neg',        expected:'食べたくない' },
    { verb:'飲む',       type:'godan',   form:'zuni',           expected:'飲まずに' },
    { verb:'する',       type:'suru',    form:'zuni',           expected:'せずに' },
  ];

  return cases.map(c => {
    const got = conjugate(c.verb, c.form, { type: c.type, ...(c.opts || {}) });
    return { verb: c.verb, form: c.form, expected: c.expected, got, pass: got === c.expected };
  });
}

// ──────────────────────────────────────────────
// §10 EXPORTS
// ──────────────────────────────────────────────

const ConjugationEngine = {
  conjugate,
  conjugateAll,
  conjugateVerb,
  conjugateAdjI,
  conjugateNaOrNoun,
  generateDistractors,
  getKeigoPair,
  contract,
  getFormalityMeta,
  listForms,
  explain,
  inspectAll,
  selfTest,
  normalize,
  inferType,
  // Tables
  FORMS,
  FORM_SEMANTICS,
  FORMALITY_LEVELS,
  KEIGO_TABLE,
  GODAN_EXCEPTIONS,
  ICHIDAN_SINGLE_KANJI,
  MASU_IRREGULAR,
};

root.ConjugationEngine = ConjugationEngine;
root.conjugate = conjugate;

if (typeof module !== 'undefined' && module.exports) {
  module.exports = ConjugationEngine;
}

})();
