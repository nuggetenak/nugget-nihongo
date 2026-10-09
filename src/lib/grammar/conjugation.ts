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

export const COMMON_ICHIDAN_VERBS = new Set<string>([
  '見る', 'みる',
  '着る', 'きる',
  '寝る', 'ねる',
  '出る', 'でる',
  '似る', 'にる',
  '居る', 'いる',
  '得る', 'える',
  '経る', 'へる',
  '診る',
  '観る',
  '視る',
  '射る',
  '煮る',
  '干る',
  '鋳る',
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

export function inferType(w: string, reading?: string): VerbType | null {
  if (w === 'する' || w.endsWith('する')) return 'suru';
  if (w === '来る' || w === 'くる') return 'kuru';
  if (w === 'だ' || w === 'です') return 'copula';

  if (w.endsWith('い') && !w.endsWith('ない')) {
    return 'adj-i';
  }

  if (w.endsWith('る')) {
    if (GODAN_EXCEPTIONS.has(w)) return 'godan';
    if (COMMON_ICHIDAN_VERBS.has(w)) return 'ichidan';

    const preRu = w.slice(0, -1);
    const lastChar = preRu.slice(-1);
    const iRow = ['き','に','み','い','り','ぎ','じ','び','ぴ','ち','ひ','し','ゐ'];
    const eRow = ['け','ね','め','え','れ','げ','ぜ','べ','ぺ','て','へ','せ','ゑ','で'];
    if (iRow.includes(lastChar) || eRow.includes(lastChar)) return 'ichidan';

    if (reading && reading.endsWith('る')) {
      const rPreRu = reading.slice(0, -1);
      const rLastChar = rPreRu.slice(-1);
      if (iRow.includes(rLastChar) || eRow.includes(rLastChar)) return 'ichidan';
    }

    return 'godan';
  }

  if (/[うくぐすつぬぶむ]$/.test(w)) return 'godan';

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
