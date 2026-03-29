// ══════════════════════════════════════════════════════════════════
//  conjugation-engine.js — Nugget Nihongo v12
//  Standalone shared service. Tidak bergantung modul lain.
//  Usage: window.conjugate(verb, form, options?)
//  Docs : lihat bagian PUBLIC API di bawah
// ══════════════════════════════════════════════════════════════════

(function () {
'use strict';

// ──────────────────────────────────────────────
// §0  INTERNAL UTILS
// ──────────────────────────────────────────────

// Hiragana vowel rows — untuk godan stem shifting
const GODAN_ROWS = {
  'う': { a:'わ', i:'い', e:'え', o:'お' },
  'く': { a:'か', i:'き', e:'け', o:'こ' },
  'ぐ': { a:'が', i:'ぎ', e:'げ', o:'ご' },
  'す': { a:'さ', i:'し', e:'せ', o:'そ' },
  'つ': { a:'た', i:'ち', e:'て', o:'と' },
  'ぬ': { a:'な', i:'に', e:'ね', o:'の' },
  'ぶ': { a:'ば', i:'び', e:'べ', o:'ぼ' },
  'む': { a:'ま', i:'み', e:'め', o:'も' },
  'る': { a:'ら', i:'り', e:'れ', o:'ろ' },
};

// Te/Ta euphonic changes for godan
const GODAN_TE = {
  'う':'って','つ':'って','る':'って',
  'く':'いて','ぐ':'いで',
  'す':'して',
  'ぬ':'んで','ぶ':'んで','む':'んで',
};
const GODAN_TA = {
  'う':'った','つ':'った','る':'った',
  'く':'いた','ぐ':'いだ',
  'す':'した',
  'ぬ':'んだ','ぶ':'んだ','む':'んだ',
};

// Irregular godan verbs that end in -iru/-eru but conjugate as godan
const GODAN_EXCEPTIONS = new Set([
  '帰る','かえる',
  '切る','きる',
  '知る','しる',
  '入る','はいる',
  '走る','はしる',
  '要る',          // 'いる' entry below covers hiragana (godan-need)
  '蹴る','ける',
  'いる',          // to need (godan) — bukan "iru" copula
  '握る','にぎる',
  '限る','かぎる',
  '参る','まいる',
  '下さる','くださる',
  'いらっしゃる',  // sudah hiragana
]);

// ──────────────────────────────────────────────
// §1  LAYER 0 — NORMALIZER
//     Terima berbagai input → { dict, type }
// ──────────────────────────────────────────────

// Romaji→kana lookup sederhana (hanya untuk input biasa)
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
    // Try 3-char first, then 2, then 1
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

/**
 * Normalizer: terima dict-form dalam berbagai format
 * Kembalikan { dict: string (hiragana/kanji), type: 'godan'|'ichidan'|'suru'|'kuru'|'adj-i'|'adj-na'|'noun' }
 * Kalau type tidak diketahui, return type: null — caller harus handle
 */
function normalize(word, hintType) {
  if (!word) return null;
  let w = word.trim();

  // Convert romaji jika tidak ada kana/kanji
  if (/^[a-zA-Z]+$/.test(w)) w = romajiToKana(w);

  // Cek apakah ada di keigo table dulu
  const keigoEntry = findKeigoByBase(w);
  if (keigoEntry) return { dict: w, type: hintType || inferType(w) };

  return { dict: w, type: hintType || inferType(w) };
}

function inferType(w) {
  if (w === 'する' || w.endsWith('する')) return 'suru';
  if (w === '来る' || w === 'くる') return 'kuru';
  if (w === 'だ' || w === 'です') return 'copula';

  // い形容詞
  if (w.endsWith('い') && !w.endsWith('ない')) {
    // Simple heuristic: single kanji/kana + い
    return 'adj-i';
  }

  // Verb ending in る
  if (w.endsWith('る')) {
    if (GODAN_EXCEPTIONS.has(w)) return 'godan';
    const preRu = w.slice(0, -1);
    const lastChar = preRu.slice(-1);
    // If last kana before る is on i-row or e-row → ichidan
    const iRow = ['き','に','み','い','り','ぎ','じ','び','ぴ','ち','ひ','し','ゐ'];
    const eRow = ['け','ね','め','え','れ','げ','ぜ','べ','ぺ','て','へ','せ','ゑ','で'];
    if (iRow.includes(lastChar) || eRow.includes(lastChar)) return 'ichidan';
    return 'godan';
  }

  // Other godan endings
  if (/[うくぐすつぬぶむ]$/.test(w)) return 'godan';

  return null; // unknown — caller should provide hintType
}

// ──────────────────────────────────────────────
// §2  LAYER 1 — RULE-BASED ENGINE
// ──────────────────────────────────────────────

// All supported form keys
const FORMS = {
  // Verbs
  'dict'           : { label: '辞書形',    en: 'dictionary form' },
  'masu'           : { label: 'ます形',    en: 'polite present' },
  'masen'          : { label: 'ません形',  en: 'polite negative' },
  'mashita'        : { label: 'ました形',  en: 'polite past' },
  'masendeshita'   : { label: 'ませんでした', en: 'polite past neg' },
  'mashou'         : { label: 'ましょう形', en: 'volitional polite' },
  'nai'            : { label: 'ない形',    en: 'plain negative' },
  'nakatta'        : { label: 'なかった形', en: 'plain past neg' },
  'ta'             : { label: 'た形',      en: 'plain past' },
  'te'             : { label: 'て形',      en: 'te form' },
  'ba'             : { label: 'ば形',      en: 'conditional' },
  'you'            : { label: '意向形',    en: 'volitional plain' },
  'potential'      : { label: '可能形',    en: 'potential' },
  'passive'        : { label: '受身形',    en: 'passive' },
  'causative'      : { label: '使役形',    en: 'causative' },
  'causpass'       : { label: '使役受身形', en: 'causative-passive' },
  'imperative'     : { label: '命令形',    en: 'imperative' },
  'teiru'          : { label: 'ている形',  en: 'progressive' },
  'teita'          : { label: 'ていた形',  en: 'progressive past' },
  'temo'           : { label: 'ても形',    en: 'even if' },
  'tara'           : { label: 'たら形',    en: 'conditional past' },
  // Stem-compounds (v14.3 — N5/N4 core)
  'tai'            : { label: 'たい形',    en: 'desiderative (want to)' },
  'nakute'         : { label: 'なくて形',  en: 'negative te-form' },
  'nagara'         : { label: 'ながら形',  en: 'simultaneous (while)' },
  'nasai'          : { label: 'なさい形',  en: 'instruction (please do)' },
  // Adjectives
  'adj-nai'        : { label: 'くない形',  en: 'i-adj negative' },
  'adj-katta'      : { label: 'かった形',  en: 'i-adj past' },
  'adj-ku'         : { label: 'く形',      en: 'i-adj adverb' },
  'adj-kute'       : { label: 'くて形',    en: 'i-adj te form' },
  'adj-kereba'     : { label: 'ければ形',  en: 'i-adj conditional' },
  // na-adj / noun
  'na-dict'        : { label: '語幹',      en: 'stem' },
  'na-na'          : { label: 'な形',      en: 'attributive' },
  'na-de'          : { label: 'で形',      en: 'te form' },
  'na-da'          : { label: 'だ形',      en: 'plain present' },
  'na-datta'       : { label: 'だった形',  en: 'plain past' },
  'na-janai'       : { label: 'じゃない形', en: 'plain negative' },
  'na-nara'        : { label: 'なら形',    en: 'conditional' },
};

// Helper: get godan stem at row
function godanStem(dict, row) {
  const last = dict.slice(-1);
  const stem = dict.slice(0, -1);
  return stem + (GODAN_ROWS[last]?.[row] || last);
}

function conjugateVerb(dict, form, type) {
  const last = dict.slice(-1);
  const stem = dict.slice(0, -1); // ichidan stem

  // ─── SURU (する) ───
  if (type === 'suru') {
    const base = dict.endsWith('する') ? dict.slice(0, -2) : '';
    const maps = {
      dict: dict, masu: base+'します', masen: base+'しません',
      mashita: base+'しました', masendeshita: base+'しませんでした',
      mashou: base+'しましょう', nai: base+'しない',
      nakatta: base+'しなかった', ta: base+'した', te: base+'して',
      ba: base+'すれば', you: base+'しよう', potential: base+'できる',
      passive: base+'される', causative: base+'させる',
      causpass: base+'させられる', imperative: base+'しろ',
      teiru: base+'している', teita: base+'していた',
      temo: base+'しても', tara: base+'したら',
      tai: base+'したい', nakute: base+'しなくて',
      nagara: base+'しながら', nasai: base+'しなさい',
    };
    return maps[form] || null;
  }

  // ─── KURU (来る) ───
  if (type === 'kuru') {
    const maps = {
      dict:'来る', masu:'来ます', masen:'来ません',
      mashita:'来ました', masendeshita:'来ませんでした',
      mashou:'来ましょう', nai:'来ない', nakatta:'来なかった',
      ta:'来た', te:'来て', ba:'来れば', you:'来よう',
      potential:'来られる', passive:'来られる', causative:'来させる',
      causpass:'来させられる', imperative:'来い',
      teiru:'来ている', teita:'来ていた',
      temo:'来ても', tara:'来たら',
      tai:'来たい', nakute:'来なくて',
      nagara:'来ながら', nasai:'来なさい',
    };
    return maps[form] || null;
  }

  // ─── ICHIDAN (V-ru) ───
  if (type === 'ichidan') {
    const maps = {
      dict,
      masu         : stem+'ます',
      masen        : stem+'ません',
      mashita      : stem+'ました',
      masendeshita : stem+'ませんでした',
      mashou       : stem+'ましょう',
      nai          : stem+'ない',
      nakatta      : stem+'なかった',
      ta           : stem+'た',
      te           : stem+'て',
      ba           : stem+'れば',
      you          : stem+'よう',
      potential    : stem+'られる',
      passive      : stem+'られる',
      causative    : stem+'させる',
      causpass     : stem+'させられる',
      imperative   : stem+'ろ',
      teiru        : stem+'ている',
      teita        : stem+'ていた',
      temo         : stem+'ても',
      tara         : stem+'たら',
      tai          : stem+'たい',
      nakute       : stem+'なくて',
      nagara       : stem+'ながら',
      nasai        : stem+'なさい',
    };
    return maps[form] || null;
  }

  // ─── GODAN (V-u) ───
  if (type === 'godan') {
    // Special case: 行く → 行って (not 行いて; kanji preserved)
    const isIku = (dict === '行く' || dict === 'いく');
    const teBase  = isIku ? dict.slice(0,-1)+'っ' : dict.slice(0,-1) + (GODAN_TE[last]?.slice(0,-1) || '');
    const te  = isIku ? dict.slice(0,-1)+'って' : (dict.slice(0,-1) + (GODAN_TE[last] || ''));
    const ta  = isIku ? dict.slice(0,-1)+'った' : (dict.slice(0,-1) + (GODAN_TA[last] || ''));

    const a = godanStem(dict, 'a'); // nai-base
    const i = godanStem(dict, 'i'); // masu-stem
    const e = godanStem(dict, 'e'); // potential / imperative / ba
    const o = godanStem(dict, 'o'); // volitional

    // Special: う-ending nai-form uses わ not あ
    const naiBase = last === 'う' ? dict.slice(0,-1)+'わ' : a;
    // Special: ある nai-form = ない (not あらない)
    if ((dict === 'ある' || dict === 'あ') && form === 'nai') return 'ない';
    if ((dict === 'ある' || dict === 'あ') && form === 'nakatta') return 'なかった';

    const maps = {
      dict,
      masu         : i+'ます',
      masen        : i+'ません',
      mashita      : i+'ました',
      masendeshita : i+'ませんでした',
      mashou       : i+'ましょう',
      nai          : naiBase+'ない',
      nakatta      : naiBase+'なかった',
      ta,
      te,
      ba           : e+'ば',
      you          : o+'う',
      potential    : e+'る',
      passive      : a+'れる',
      causative    : a+'せる',
      causpass     : a+'せられる',
      imperative   : e,
      teiru        : te.replace(/て$|で$/, m => m === 'て' ? 'ている' : 'でいる'),
      teita        : te.replace(/て$|で$/, m => m === 'て' ? 'ていた' : 'でいた'),
      temo         : te.replace(/て$|で$/, m => m === 'て' ? 'ても' : 'でも'),
      tara         : ta+'ら',
      // Stem-compounds — attach to masu-stem (i-row)
      tai          : i+'たい',
      nakute       : naiBase+'なくて',
      nagara       : i+'ながら',
      nasai        : i+'なさい',
    };
    return maps[form] || null;
  }

  // ─── ある (aru) — godan exception ───
  // Nai-form = ない, not あらない
  if (dict === 'ある' || dict === 'あ') {
    if (form === 'nai') return 'ない';
    if (form === 'nakatta') return 'なかった';
    // rest = normal godan
  }

  return null;
}

function conjugateAdjI(stem_or_dict, form) {
  // stem = remove trailing い
  const base = stem_or_dict.endsWith('い')
    ? stem_or_dict.slice(0, -1)
    : stem_or_dict;

  // いい/よい special case → よ
  const isIi = (stem_or_dict === 'いい' || stem_or_dict === '良い');
  const b = isIi ? 'よ' : base;

  const maps = {
    'adj-nai'    : b+'くない',
    'adj-katta'  : b+'かった',
    'adj-ku'     : b+'く',
    'adj-kute'   : b+'くて',
    'adj-kereba' : b+'ければ',
    dict         : stem_or_dict,
    nai          : b+'くない',    // alias
    ta           : b+'かった',    // alias
    te           : b+'くて',      // alias
    ba           : b+'ければ',    // alias
    masu         : stem_or_dict + 'です',
    masen        : b+'くないです',
    mashita      : b+'かったです',
    masendeshita : b+'くなかったです',
  };
  return maps[form] || null;
}

function conjugateNaOrNoun(stem, form) {
  const maps = {
    'na-dict'   : stem,
    'na-na'     : stem+'な',
    'na-de'     : stem+'で',
    'na-da'     : stem+'だ',
    'na-datta'  : stem+'だった',
    'na-janai'  : stem+'じゃない',
    'na-nara'   : stem+'なら',
    dict        : stem,           // alias
    te          : stem+'で',      // alias
    nai         : stem+'じゃない', // alias
    ta          : stem+'だった',  // alias
    masu        : stem+'です',
    masen       : stem+'じゃありません',
    mashita     : stem+'でした',
    masendeshita: stem+'じゃありませんでした',
  };
  return maps[form] || null;
}

// ──────────────────────────────────────────────
// §3  LAYER 2 — KEIGO LOOKUP TABLE
//     Sonkeigo (尊敬語) + Kenjōgo (謙譲語)
//     Format: { base[], sonkei, kenjo, type? }
// ──────────────────────────────────────────────

const KEIGO_TABLE = [
  // Core irregular keigo verbs
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
  { base:['もらう','受け取る'],    sonkei:null,           kenjo:'頂戴する',     type:'suru' },
  { base:['訪ねる','訪問する'],    sonkei:null,           kenjo:'伺う',         type:'godan' },
  { base:['聞く','尋ねる'],        sonkei:null,           kenjo:'伺う',         type:'godan' },
  { base:['言う','話す'],          sonkei:null,           kenjo:'申し上げる',   type:'ichidan' },
  { base:['見せる'],               sonkei:null,           kenjo:'お目にかける', type:'ichidan' },
  { base:['もらう','受け取る'],    sonkei:null,           kenjo:'拝受する',     type:'suru' },
  { base:['読む'],                 sonkei:null,           kenjo:'拝読する',     type:'suru' },
  { base:['借りる'],               sonkei:null,           kenjo:'拝借する',     type:'suru' },
  { base:['する','行う'],          sonkei:null,           kenjo:'させていただく', type:'godan' },
  // ある special
  { base:['ある','います','いる'], sonkei:'いらっしゃる', kenjo:'おる',         type:'godan' },
  // ございます — copula upgrade
  { base:['です','だ'],            sonkei:null,           kenjo:'でございます',  type:'copula' },
];

// Special masu-stem irregulars (these 5 verbs use い not り in masu-form)
const MASU_IRREGULAR = new Set(['いらっしゃる','おっしゃる','なさる','くださる','ございます','ござる']);

function findKeigoByBase(word) {
  return KEIGO_TABLE.find(e => e.base.includes(word)) || null;
}

function keigoMasuStem(verb) {
  // These special verbs: いらっしゃる→いらっしゃい, etc.
  if (MASU_IRREGULAR.has(verb)) return verb.slice(0,-1) + 'い';
  return null;
}

// ──────────────────────────────────────────────
// §4  LAYER 3 — FORMALITY WRAPPER
//     6 levels: 0=超カジュアル → 5=最高敬語
// ──────────────────────────────────────────────

const FORMALITY_LEVELS = [
  { level: 0, label: '超カジュアル', en: 'ultra casual',  desc: 'ため口+省略' },
  { level: 1, label: 'カジュアル',   en: 'casual',        desc: '普通形 (plain)' },
  { level: 2, label: '普通形',       en: 'plain',         desc: '辞書形ベース' },
  { level: 3, label: '丁寧語',       en: 'polite',        desc: 'ます/です形' },
  { level: 4, label: '謙譲語',       en: 'humble',        desc: 'kenjōgo' },
  { level: 5, label: '尊敬語',       en: 'honorific',     desc: 'sonkeigo' },
];

// ──────────────────────────────────────────────
// §5  CASUAL CONTRACTIONS
//     Input: standard form string → casual string
// ──────────────────────────────────────────────

const CONTRACTIONS = [
  // Most common — order matters (longer first)
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
  // ば conditional
  { from: /れば$/,      to: 'りゃ'  },
  { from: /すれば$/,    to: 'すりゃ' },
  { from: /すれば/,     to: 'すりゃ' },
  // ～ちまう (older/rough male speech)
  { from: /てしまう/g,  to: 'ちまう' }, // alt — only used if explicitly requested
];

/**
 * Apply casual contractions to a conjugated string
 * @param {string} str  — conjugated form
 * @param {number} level — 0=超カジュアル applies all, 1=カジュアル applies common
 */
function applyContractions(str, level = 0) {
  const rules = level <= 0
    ? CONTRACTIONS                      // all
    : CONTRACTIONS.slice(0, 11);        // only ている→てる series + ちゃう + とく
  let result = str;
  for (const r of rules) {
    result = result.replace(r.from, r.to);
  }
  return result;
}

// ──────────────────────────────────────────────
// §6  LAYER 2+3 INTEGRATION
//     Apply keigo then formality wrapper
// ──────────────────────────────────────────────

/**
 * Get keigo form of a verb
 * @param {string} dict      — dictionary form
 * @param {'sonkei'|'kenjo'} direction
 * @param {string} form      — conjugation form (default 'masu')
 */
function conjugateKeigo(dict, direction, form = 'masu') {
  const entry = findKeigoByBase(dict);
  if (!entry) {
    // Fallback: use お+stem+になる pattern for sonkei
    if (direction === 'sonkei') {
      return buildOStemNiNaru(dict, form);
    }
    // Fallback kenjō: お+stem+する
    if (direction === 'kenjo') {
      return buildOStemSuru(dict, form);
    }
    return null;
  }

  const keigoVerb = direction === 'sonkei' ? entry.sonkei : entry.kenjo;
  if (!keigoVerb) return null;

  // Conjugate the keigo verb itself
  const keigoType = entry.type || inferType(keigoVerb);

  // Special masu-stem for いらっしゃる etc.
  if (form === 'masu' && MASU_IRREGULAR.has(keigoVerb)) {
    return keigoMasuStem(keigoVerb) + 'ます';
  }
  if (form === 'masendeshita' && MASU_IRREGULAR.has(keigoVerb)) {
    return keigoMasuStem(keigoVerb) + 'ませんでした';
  }
  if (form === 'mashita' && MASU_IRREGULAR.has(keigoVerb)) {
    return keigoMasuStem(keigoVerb) + 'ました';
  }
  if (form === 'masen' && MASU_IRREGULAR.has(keigoVerb)) {
    return keigoMasuStem(keigoVerb) + 'ません';
  }
  if (form === 'imperative' && MASU_IRREGULAR.has(keigoVerb)) {
    return keigoMasuStem(keigoVerb); // e.g. いらっしゃい
  }

  return conjugate(keigoVerb, form, { type: keigoType });
}

// Build お+stem+になる pattern
function buildOStemNiNaru(dict, form) {
  const { type } = normalize(dict);
  let stem;
  if (type === 'ichidan') stem = dict.slice(0, -1);
  else if (type === 'godan') stem = godanStem(dict, 'i');
  else return null;

  const base = 'お' + stem + 'になる';
  // Conjugate なる as godan
  return conjugate(base.endsWith('になる') ? base : 'になる', form, { type: 'godan', prefix: 'お'+stem });
}

// Build お+stem+する pattern
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
// §7  PUBLIC API
// ──────────────────────────────────────────────

/**
 * Main conjugation function
 *
 * @param {string} word   — Dictionary form (kanji/kana/romaji)
 * @param {string} form   — Form key (lihat FORMS di §2)
 * @param {object} opts   — Optional:
 *   opts.type         {string}  — 'godan'|'ichidan'|'suru'|'kuru'|'adj-i'|'adj-na'|'noun'
 *   opts.formality    {number}  — 0–5 (default: infer from form)
 *   opts.keigo        {'sonkei'|'kenjo'} — apply keigo layer
 *   opts.casual       {boolean} — apply contraction layer
 *
 * @returns {string|null}
 */
function conjugate(word, form, opts = {}) {
  const n = normalize(word, opts.type);
  if (!n) return null;
  const { dict, type } = n;

  // Keigo shortcut
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
    };
    result = copulaMap[form] || null;
  }

  // Apply contraction layer
  if (result && opts.casual) {
    const level = typeof opts.formality === 'number' ? opts.formality : 0;
    result = applyContractions(result, level);
  }

  return result;
}

/**
 * Get all forms at once
 * @param {string} word
 * @param {object} opts  — same as conjugate()
 * @returns {Object}  — { formKey: conjugatedString, ... }
 */
function conjugateAll(word, opts = {}) {
  const n = normalize(word, opts.type);
  if (!n) return {};
  const out = {};
  for (const key of Object.keys(FORMS)) {
    const result = conjugate(word, key, opts);
    if (result) out[key] = result;
  }
  return out;
}

/**
 * Get keigo pair (sonkei + kenjo) for a verb
 * @param {string} word
 * @param {string} form  — conjugation form (default 'masu')
 * @returns {{ sonkei: string|null, kenjo: string|null, entry: object|null }}
 */
function getKeigoPair(word, form = 'masu') {
  const entry = findKeigoByBase(word);
  return {
    sonkei: conjugateKeigo(word, 'sonkei', form),
    kenjo : conjugateKeigo(word, 'kenjo',  form),
    entry,
  };
}

/**
 * Apply contractions manually to any string
 * @param {string} str
 * @param {number} level  — 0=all, 1=common only
 */
function contract(str, level = 0) {
  return applyContractions(str, level);
}

/**
 * Get formality level metadata
 * @param {number} level  — 0–5
 */
function getFormalityMeta(level) {
  return FORMALITY_LEVELS[level] || null;
}

/**
 * List all supported form keys and labels
 */
function listForms() {
  return Object.entries(FORMS).map(([key, meta]) => ({ key, ...meta }));
}

/**
 * Quick self-test — returns array of { verb, form, expected, got, pass }
 */
function selfTest() {
  const cases = [
    // Ichidan
    { verb:'食べる', type:'ichidan', form:'te',        expected:'食べて'     },
    { verb:'食べる', type:'ichidan', form:'nai',       expected:'食べない'   },
    { verb:'食べる', type:'ichidan', form:'potential', expected:'食べられる' },
    { verb:'食べる', type:'ichidan', form:'ta',        expected:'食べた'     },
    // Godan く
    { verb:'書く',   type:'godan',   form:'te',        expected:'書いて'     },
    { verb:'書く',   type:'godan',   form:'nai',       expected:'書かない'   },
    { verb:'書く',   type:'godan',   form:'masu',      expected:'書きます'   },
    { verb:'書く',   type:'godan',   form:'ta',        expected:'書いた'     },
    // Godan む
    { verb:'飲む',   type:'godan',   form:'te',        expected:'飲んで'     },
    { verb:'飲む',   type:'godan',   form:'potential', expected:'飲める'     },
    // Godan う
    { verb:'買う',   type:'godan',   form:'nai',       expected:'買わない'   },
    { verb:'買う',   type:'godan',   form:'te',        expected:'買って'     },
    // 行く special
    { verb:'行く',   type:'godan',   form:'te',        expected:'行って'     },
    // Suru
    { verb:'する',   type:'suru',    form:'nai',       expected:'しない'     },
    { verb:'する',   type:'suru',    form:'te',        expected:'して'       },
    { verb:'する',   type:'suru',    form:'potential', expected:'できる'     },
    // Kuru
    { verb:'来る',   type:'kuru',    form:'nai',       expected:'来ない'     },
    { verb:'来る',   type:'kuru',    form:'te',        expected:'来て'       },
    // Adj-i
    { verb:'高い',   type:'adj-i',   form:'adj-nai',   expected:'高くない'   },
    { verb:'高い',   type:'adj-i',   form:'adj-katta', expected:'高かった'   },
    // いい special
    { verb:'いい',   type:'adj-i',   form:'adj-nai',   expected:'よくない'   },
    // Contractions
    { verb:'食べる', type:'ichidan', form:'teiru',      expected:'食べてる',
      opts:{ casual:true } },
    // GODAN_EXCEPTIONS — hiragana input (TASK-UI-1, Maret 2026)
    { verb:'かえる', type:'godan',   form:'te',         expected:'かえって'   },
    { verb:'かえる', type:'godan',   form:'nai',        expected:'かえらない' },
    { verb:'きる',   type:'godan',   form:'te',         expected:'きって'     },
    { verb:'きる',   type:'godan',   form:'masu',       expected:'きります'   },
    { verb:'はいる', type:'godan',   form:'te',         expected:'はいって'   },
    // normalize() type inference — keigo verbs must not use keigoEntry.type (TASK-UI-2, Maret 2026)
    // 読む is in keigo table with type:'suru' but must be treated as godan
    { verb:'読む',   type:'godan',   form:'te',         expected:'読んで'     },
    { verb:'読む',   type:'godan',   form:'nai',        expected:'読まない'   },
    // 見る is in keigo table with type:'suru' but must be treated as ichidan
    { verb:'見る',   type:'ichidan', form:'te',         expected:'見て'       },
    { verb:'見る',   type:'ichidan', form:'nai',        expected:'見ない'     },
  ];

  return cases.map(c => {
    const got = conjugate(c.verb, c.form, { type: c.type, ...(c.opts||{}) });
    return { verb: c.verb, form: c.form, expected: c.expected, got, pass: got === c.expected };
  });
}

// ──────────────────────────────────────────────
// §8  EXPORT TO WINDOW
// ──────────────────────────────────────────────

window.ConjugationEngine = {
  conjugate,
  conjugateAll,
  getKeigoPair,
  contract,
  getFormalityMeta,
  listForms,
  selfTest,
  // Expose constants for external use
  FORMS,
  FORMALITY_LEVELS,
  KEIGO_TABLE,
};

// Shorthand alias
window.conjugate = conjugate;

})();
