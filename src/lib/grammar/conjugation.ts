// ══════════════════════════════════════════════════════════════════
//  conjugation.ts — Nugget Nihongo Japanese Conjugation Engine
//  Ported from public/js/conjugation-engine.js (v12)
//  Standalone pure TypeScript module.
// ══════════════════════════════════════════════════════════════════

export type VerbType = 'godan' | 'ichidan' | 'suru' | 'kuru' | 'adj-i' | 'adj-na' | 'noun' | 'copula';

export interface ConjugationOptions {
  type?: VerbType;
  formality?: number;
  keigo?: 'sonkei' | 'kenjo';
  casual?: boolean;
  prefix?: string;
}

export interface FormMeta {
  label: string;
  en: string;
}

export const GODAN_ROWS: Record<string, Record<string, string>> = {
  'う': { a: 'わ', i: 'い', e: 'え', o: 'お' },
  'く': { a: 'か', i: 'き', e: 'け', o: 'こ' },
  'ぐ': { a: 'が', i: 'ぎ', e: 'げ', o: 'ご' },
  'す': { a: 'さ', i: 'し', e: 'せ', o: 'そ' },
  'つ': { a: 'た', i: 'ち', e: 'て', o: 'と' },
  'ぬ': { a: 'な', i: 'に', e: 'ね', o: 'の' },
  'ぶ': { a: 'ば', i: 'び', e: 'べ', o: 'ぼ' },
  'む': { a: 'ま', i: 'み', e: 'め', o: 'も' },
  'る': { a: 'ら', i: 'り', e: 'れ', o: 'ろ' },
};

export const GODAN_TE: Record<string, string> = {
  'う': 'って', 'つ': 'って', 'る': 'って',
  'く': 'いて', 'ぐ': 'いで',
  'す': 'して',
  'ぬ': 'んで', 'ぶ': 'んで', 'む': 'んで',
};

export const GODAN_TA: Record<string, string> = {
  'う': 'った', 'つ': 'った', 'る': 'った',
  'く': 'いた', 'ぐ': 'いだ',
  'す': 'した',
  'ぬ': 'んだ', 'ぶ': 'んだ', 'む': 'んだ',
};

export const GODAN_EXCEPTIONS = new Set<string>([
  '帰る', 'かえる',
  '切る', 'きる',
  '知る', 'しる',
  '入る', 'はいる',
  '走る', 'はしる',
  '要る',
  '蹴る', 'ける',
  'いる',
  '握る', 'にぎる',
  '限る', 'かぎる',
  '参る', 'まいる',
  '下さる', 'くださる',
  'いらっしゃる',
  '減る', 'へる',
  '滑る', 'すべる',
  '散る', 'ちる',
  '焦る', 'あせる',
  '遮る', 'さえぎる',
  '喋る', 'しゃべる',
]);

export const SINGLE_KANJI_ICHIDAN_MAP: Record<string, string> = {
  '見る': 'みる',
  '診る': 'みる',
  '看る': 'みる',
  '視る': 'みる',
  '観る': 'みる',
  '満る': 'みる',
  '着る': 'きる',
  '寝る': 'ねる',
  '出る': 'でる',
  '似る': 'にる',
  '煮る': 'にる',
  '居る': 'いる',
  '射る': 'いる',
  '鋳る': 'いる',
  '干る': 'ひる',
  '涸る': 'ひる',
  '乾る': 'ひる',
  '率る': 'ひる',
  '沃る': 'ひる',
  '簸る': 'ひる',
  '嚏る': 'ひる',
  '得る': 'える',
  '経る': 'へる',
  '棄る': 'すてる',
  '撫る': 'なでる',
  '茹る': 'ゆでる',
};

export const COMMON_ICHIDAN_VERBS = new Set<string>([
  '見る', 'みる',
  '着る', 'きる',
  '寝る', 'ねる',
  '出る', 'でる',
  '似る', 'にる',
  '居る', 'いる',
  '得る', 'える',
  '経る', 'へる',
  '診る', '看る', '視る', '観る', '満る',
  '射る', '煮る', '干る', '鋳る', '涸る', '乾る', '率る', '沃る', '簸る', '嚏る',
  '棄る', '撫る', '茹る',
  // Common JLPT N5-N1 Ichidan verbs
  '起きる', '落ちる', '降りる', '借りる', '足りる', '閉じる', '感じる', '信じる', '生きる', '伸びる', '浴びる', '満ちる', '用いる', '通じる', '生じる', '応じる', '命じる', '準じる', '演じる', '報じる', '講じる', '重んじる', '帯びる',
  '食べる', '答える', '教える', '覚える', '調べる', '集める', '始める', '続ける', '受ける', '届ける', '決める', '辞める', '止める', '進める', '述べる', '認める', '与える', '変える', '消える', '増える', '疲れる', '忘れる', '見せる', '迎える', '伝える', '替える', '換える', '代える', '買える', '行ける', '話せる', '飲める', '食べられる', '任せる', '遅れる', '晴れる', '連れる', '慣れる', '倒れる', '流れる', '離れる', '現れる', '尋ねる', '訪ねる', '重ねる', '束ねる', '兼ねる', '耐える', '絶える', '映える', '生える', '栄える', '抑える', '押さえる', '訴える', '整える', '備える', '支える', '抱える', '構える', '捉える', '捕らえる', '蓄える', '従える', '率いる', '企てる', '妨げる', '避ける', '告げる', '慌てる', '隔てる', '省みる', '顧みる', '試みる',
]);

export const ROMAJI_MAP: Record<string, string> = {
  'a': 'あ', 'i': 'い', 'u': 'う', 'e': 'え', 'o': 'お',
  'ka': 'か', 'ki': 'き', 'ku': 'く', 'ke': 'け', 'ko': 'こ',
  'sa': 'さ', 'shi': 'し', 'su': 'す', 'se': 'せ', 'so': 'そ',
  'ta': 'た', 'chi': 'ち', 'tsu': 'つ', 'te': 'て', 'to': 'と',
  'na': 'な', 'ni': 'に', 'nu': 'ぬ', 'ne': 'ね', 'no': 'の',
  'ha': 'は', 'hi': 'ひ', 'fu': 'ふ', 'he': 'へ', 'ho': 'ほ',
  'ma': 'ま', 'mi': 'み', 'mu': 'む', 'me': 'め', 'mo': 'も',
  'ya': 'や', 'yu': 'ゆ', 'yo': 'よ',
  'ra': 'ら', 'ri': 'り', 'ru': 'る', 're': 'れ', 'ro': 'ろ',
  'wa': 'わ', 'wo': 'を', 'n': 'ん',
  'ga': 'が', 'gi': 'ぎ', 'gu': 'ぐ', 'ge': 'げ', 'go': 'ご',
  'za': 'ざ', 'ji': 'じ', 'zu': 'ず', 'ze': 'ぜ', 'zo': 'ぞ',
  'da': 'だ', 'di': 'ぢ', 'du': 'づ', 'de': 'で', 'do': 'ど',
  'ba': 'ば', 'bi': 'び', 'bu': 'ぶ', 'be': 'べ', 'bo': 'ぼ',
  'pa': 'ぱ', 'pi': 'ぴ', 'pu': 'ぷ', 'pe': 'ぺ', 'po': 'ぽ',
  'kya': 'きゃ', 'kyu': 'きゅ', 'kyo': 'きょ',
  'sha': 'しゃ', 'shu': 'しゅ', 'sho': 'しょ',
  'cha': 'ちゃ', 'chu': 'ちゅ', 'cho': 'ちょ',
  'nya': 'にゃ', 'nyu': 'にゅ', 'nyo': 'にょ',
  'hya': 'ひゃ', 'hyu': 'ひゅ', 'hyo': 'ひょ',
  'mya': 'みゃ', 'myu': 'みゅ', 'myo': 'みょ',
  'rya': 'りゃ', 'ryu': 'りゅ', 'ryo': 'りょ',
  'gya': 'ぎゃ', 'gyu': 'ぎゅ', 'gyo': 'ぎょ',
  'ja': 'じゃ', 'ju': 'じゅ', 'jo': 'じょ',
  'bya': 'びゃ', 'byu': 'びゅ', 'byo': 'びょ',
  'pya': 'ぴゃ', 'pyu': 'ぴゅ', 'pyo': 'ぴょ',
};

export function romajiToKana(str: string): string {
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
    if (!matched) {
      result += s[i];
      i++;
    }
  }
  return result;
}

export function resolveVerbReading(word: string): string | undefined {
  if (SINGLE_KANJI_ICHIDAN_MAP[word]) return SINGLE_KANJI_ICHIDAN_MAP[word];
  if (typeof window !== 'undefined') {
    const levels = ['vocabN5', 'vocabN4', 'vocabN3', 'vocabN2', 'vocabN1'];
    for (const lvl of levels) {
      const list = (window as any)[lvl];
      if (Array.isArray(list)) {
        const found = list.find((item: any) => item && (item.word === word || item.kanji === word));
        if (found && (found.reading || found.kana)) {
          return found.reading || found.kana;
        }
      }
    }
  }
  return undefined;
}

export function inferType(w: string, reading?: string): VerbType | null {
  if (!w || typeof w !== 'string') return null;
  const word = w.trim();
  if (word === 'する' || word.endsWith('する')) return 'suru';
  if (word === '来る' || word === 'くる') return 'kuru';
  if (word === 'だ' || word === 'です') return 'copula';

  if (word.endsWith('い') && !word.endsWith('ない')) {
    return 'adj-i';
  }

  if (word.endsWith('る')) {
    if (GODAN_EXCEPTIONS.has(word)) return 'godan';
    if (COMMON_ICHIDAN_VERBS.has(word) || SINGLE_KANJI_ICHIDAN_MAP[word]) return 'ichidan';

    const resolvedReading = reading || resolveVerbReading(word);

    const preRu = word.slice(0, -1);
    const lastChar = preRu.slice(-1);
    const iRow = ['き','に','み','い','り','ぎ','じ','び','ぴ','ち','ひ','し','ゐ'];
    const eRow = ['け','ね','め','え','れ','げ','ぜ','べ','ぺ','て','へ','せ','ゑ','で'];
    if (iRow.includes(lastChar) || eRow.includes(lastChar)) return 'ichidan';

    if (resolvedReading && resolvedReading.endsWith('る')) {
      const rPreRu = resolvedReading.slice(0, -1);
      const rLastChar = rPreRu.slice(-1);
      if (iRow.includes(rLastChar) || eRow.includes(rLastChar)) {
        if (!GODAN_EXCEPTIONS.has(word) && !GODAN_EXCEPTIONS.has(resolvedReading)) {
          return 'ichidan';
        }
      }
    }

    return 'godan';
  }

  if (/[うくぐすつぬぶむ]$/.test(word)) return 'godan';

  return null;
}

export function normalize(
  word: string,
  hintType?: VerbType,
  reading?: string
): { dict: string; type: VerbType | null } | null {
  if (!word) return null;
  let w = word.trim();
  if (/^[a-zA-Z]+$/.test(w)) w = romajiToKana(w);
  return { dict: w, type: hintType || inferType(w, reading) };
}

export const FORMS: Record<string, FormMeta> = {
  'dict': { label: '辞書形', en: 'dictionary form' },
  'masu': { label: 'ます形', en: 'polite present' },
  'masen': { label: 'ません形', en: 'polite negative' },
  'mashita': { label: 'ました形', en: 'polite past' },
  'masendeshita': { label: 'ませんでした', en: 'polite past neg' },
  'mashou': { label: 'ましょう形', en: 'volitional polite' },
  'nai': { label: 'ない形', en: 'plain negative' },
  'nakatta': { label: 'なかった形', en: 'plain past neg' },
  'ta': { label: 'た形', en: 'plain past' },
  'te': { label: 'て形', en: 'te form' },
  'ba': { label: 'ば形', en: 'conditional' },
  'you': { label: '意向形', en: 'volitional plain' },
  'potential': { label: '可能形', en: 'potential' },
  'passive': { label: '受身形', en: 'passive' },
  'causative': { label: '使役形', en: 'causative' },
  'causpass': { label: '使役受身形', en: 'causative-passive' },
  'imperative': { label: '命令形', en: 'imperative' },
  'teiru': { label: 'ている形', en: 'progressive' },
  'teita': { label: 'ていた形', en: 'progressive past' },
  'temo': { label: 'ても形', en: 'even if' },
  'tara': { label: 'たら形', en: 'conditional past' },
  'tai': { label: 'たい形', en: 'desiderative' },
  'nakute': { label: 'なくて形', en: 'negative te-form' },
  'nagara': { label: 'ながら形', en: 'simultaneous' },
  'nasai': { label: 'なさい形', en: 'instruction' },
  'adj-nai': { label: 'くない形', en: 'i-adj negative' },
  'adj-katta': { label: 'かった形', en: 'i-adj past' },
  'adj-ku': { label: 'く形', en: 'i-adj adverb' },
  'adj-kute': { label: 'くて形', en: 'i-adj te form' },
  'adj-kereba': { label: 'ければ形', en: 'i-adj conditional' },
  'na-dict': { label: '語幹', en: 'stem' },
  'na-na': { label: 'な形', en: 'attributive' },
  'na-de': { label: 'で形', en: 'te form' },
  'na-da': { label: 'だ形', en: 'plain present' },
  'na-datta': { label: 'だった形', en: 'plain past' },
  'na-janai': { label: 'じゃない形', en: 'plain negative' },
  'na-nara': { label: 'なら形', en: 'conditional' },
};

function godanStem(dict: string, row: string): string {
  const last = dict.slice(-1);
  const stem = dict.slice(0, -1);
  return stem + (GODAN_ROWS[last]?.[row] || last);
}

export function conjugateVerb(dict: string, form: string, type: VerbType): string | null {
  const last = dict.slice(-1);
  const stem = dict.slice(0, -1);

  if (type === 'suru') {
    const base = dict.endsWith('する') ? dict.slice(0, -2) : '';
    const maps: Record<string, string> = {
      dict, masu: base + 'します', masen: base + 'しません',
      mashita: base + 'しました', masendeshita: base + 'しませんでした',
      mashou: base + 'しましょう', nai: base + 'しない',
      nakatta: base + 'しなかった', ta: base + 'した', te: base + 'して',
      ba: base + 'すれば', you: base + 'しよう', potential: base + 'できる',
      passive: base + 'される', causative: base + 'させる',
      causpass: base + 'させられる', imperative: base + 'しろ',
      teiru: base + 'している', teita: base + 'していた',
      temo: base + 'しても', tara: base + 'したら',
      tai: base + 'したい', nakute: base + 'しなくて',
      nagara: base + 'しながら', nasai: base + 'しなさい',
    };
    return maps[form] || null;
  }

  if (type === 'kuru') {
    const maps: Record<string, string> = {
      dict: '来る', masu: '来ます', masen: '来ません',
      mashita: '来ました', masendeshita: '来ませんでした',
      mashou: '来ましょう', nai: '来ない', nakatta: '来なかった',
      ta: '来た', te: '来て', ba: '来れば', you: '来よう',
      potential: '来られる', passive: '来られる', causative: '来させる',
      causpass: '来させられる', imperative: '来い',
      teiru: '来ている', teita: '来ていた',
      temo: '来ても', tara: '来たら',
      tai: '来たい', nakute: '来なくて',
      nagara: '来ながら', nasai: '来なさい',
    };
    return maps[form] || null;
  }

  if (type === 'ichidan') {
    const maps: Record<string, string> = {
      dict,
      masu: stem + 'ます', masen: stem + 'ません',
      mashita: stem + 'ました', masendeshita: stem + 'ませんでした',
      mashou: stem + 'ましょう', nai: stem + 'ない',
      nakatta: stem + 'なかった', ta: stem + 'た', te: stem + 'て',
      ba: stem + 'れば', you: stem + 'よう',
      potential: stem + 'られる', passive: stem + 'られる',
      causative: stem + 'させる', causpass: stem + 'させられる',
      imperative: stem + 'ろ',
      teiru: stem + 'ている', teita: stem + 'ていた',
      temo: stem + 'ても', tara: stem + 'たら',
      tai: stem + 'たい', nakute: stem + 'なくて',
      nagara: stem + 'ながら', nasai: stem + 'なさい',
    };
    return maps[form] || null;
  }

  if (type === 'godan') {
    const isIku = (dict === '行く' || dict === 'いく');
    const te = isIku ? dict.slice(0, -1) + 'って' : (dict.slice(0, -1) + (GODAN_TE[last] || ''));
    const ta = isIku ? dict.slice(0, -1) + 'った' : (dict.slice(0, -1) + (GODAN_TA[last] || ''));

    const a = godanStem(dict, 'a');
    const i = godanStem(dict, 'i');
    const e = godanStem(dict, 'e');
    const o = godanStem(dict, 'o');

    const naiBase = last === 'う' ? dict.slice(0, -1) + 'わ' : a;
    if ((dict === 'ある' || dict === 'あ') && form === 'nai') return 'ない';
    if ((dict === 'ある' || dict === 'あ') && form === 'nakatta') return 'なかった';

    const maps: Record<string, string> = {
      dict,
      masu: i + 'ます', masen: i + 'ません',
      mashita: i + 'ました', masendeshita: i + 'ませんでした',
      mashou: i + 'ましょう', nai: naiBase + 'ない',
      nakatta: naiBase + 'なかった', ta, te,
      ba: e + 'ば', you: o + 'う',
      potential: e + 'る', passive: a + 'れる',
      causative: a + 'せる', causpass: a + 'せられる',
      imperative: e,
      teiru: te.replace(/て$|で$/, m => m === 'て' ? 'ている' : 'でいる'),
      teita: te.replace(/て$|で$/, m => m === 'て' ? 'ていた' : 'でいた'),
      temo: te.replace(/て$|で$/, m => m === 'て' ? 'ても' : 'でも'),
      tara: ta + 'ら',
      tai: i + 'たい', nakute: naiBase + 'なくて',
      nagara: i + 'ながら', nasai: i + 'なさい',
    };
    return maps[form] || null;
  }

  return null;
}

export function conjugateAdjI(stem_or_dict: string, form: string): string | null {
  const base = stem_or_dict.endsWith('い') ? stem_or_dict.slice(0, -1) : stem_or_dict;
  const isIi = (stem_or_dict === 'いい' || stem_or_dict === '良い');
  const b = isIi ? 'よ' : base;

  const maps: Record<string, string> = {
    'adj-nai': b + 'くない',
    'adj-katta': b + 'かった',
    'adj-ku': b + 'く',
    'adj-kute': b + 'くて',
    'adj-kereba': b + 'ければ',
    dict: stem_or_dict,
    nai: b + 'くない',
    ta: b + 'かった',
    te: b + 'くて',
    ba: b + 'ければ',
    masu: stem_or_dict + 'です',
    masen: b + 'くないです',
    mashita: b + 'かったです',
    masendeshita: b + 'くなかったです',
  };
  return maps[form] || null;
}

export function conjugateNaOrNoun(stem: string, form: string): string | null {
  const maps: Record<string, string> = {
    'na-dict': stem,
    'na-na': stem + 'な',
    'na-de': stem + 'で',
    'na-da': stem + 'だ',
    'na-datta': stem + 'だった',
    'na-janai': stem + 'じゃない',
    'na-nara': stem + 'なら',
    dict: stem,
    te: stem + 'で',
    nai: stem + 'じゃない',
    ta: stem + 'だった',
    masu: stem + 'です',
    masen: stem + 'じゃありません',
    mashita: stem + 'でした',
    masendeshita: stem + 'じゃありませんでした',
  };
  return maps[form] || null;
}

export const CONTRACTIONS = [
  { from: /ている/g, to: 'てる' },
  { from: /ていた/g, to: 'てた' },
  { from: /ていない/g, to: 'てない' },
  { from: /ています/g, to: 'てます' },
  { from: /でいる/g, to: 'でる' },
  { from: /でいた/g, to: 'でた' },
  { from: /てしまう/g, to: 'ちゃう' },
  { from: /てしまった/g, to: 'ちゃった' },
  { from: /でしまう/g, to: 'じゃう' },
  { from: /でしまった/g, to: 'じゃった' },
  { from: /ておく/g, to: 'とく' },
  { from: /ておいた/g, to: 'といた' },
  { from: /ていく/g, to: 'てく' },
  { from: /なければ/g, to: 'なきゃ' },
  { from: /なくては/g, to: 'なくちゃ' },
  { from: /のだ/g, to: 'んだ' },
  { from: /のです/g, to: 'んです' },
  { from: /という/g, to: 'って' },
  { from: /れば$/, to: 'りゃ' },
  { from: /すれば$/, to: 'すりゃ' },
  { from: /すれば/, to: 'すりゃ' },
];

export function applyContractions(str: string, level = 0): string {
  const rules = level <= 0 ? CONTRACTIONS : CONTRACTIONS.slice(0, 11);
  let result = str;
  for (const r of rules) {
    result = result.replace(r.from, r.to);
  }
  return result;
}

export function conjugate(word: string, form: string, opts: ConjugationOptions = {}): string | null {
  const n = normalize(word, opts.type);
  if (!n) return null;
  const { dict, type } = n;

  let result: string | null = null;

  if (type === 'suru' || type === 'kuru' || type === 'godan' || type === 'ichidan') {
    result = conjugateVerb(dict, form, type);
  } else if (type === 'adj-i') {
    result = conjugateAdjI(dict, form);
  } else if (type === 'adj-na' || type === 'noun') {
    result = conjugateNaOrNoun(dict, form);
  } else if (type === 'copula') {
    const copulaMap: Record<string, string> = {
      dict: 'だ', masu: 'です', masen: 'じゃありません',
      mashita: 'でした', masendeshita: 'じゃありませんでした',
      nai: 'じゃない', ta: 'だった', nakatta: 'じゃなかった',
    };
    result = copulaMap[form] || null;
  }

  if (result && opts.casual) {
    const level = typeof opts.formality === 'number' ? opts.formality : 0;
    result = applyContractions(result, level);
  }

  return result;
}
