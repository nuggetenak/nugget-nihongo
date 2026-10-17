// ══════════════════════════════════════════════════════════════════
//  deinflector.ts — Japanese Morphological De-Inflector (Yomitan Engine)
//  Research Basis: Yomitan transforms (yomidevs/yomitan)
//  Deconstructs complex Japanese conjugations into step-by-step Indonesian explanations
// ══════════════════════════════════════════════════════════════════

export interface DeinflectionStep {
  form: string;
  ruleName: string;
  explanationId: string;
}

export interface DeinflectionCandidate {
  source: string;
  term: string;        // candidate dictionary lemma (Yomitan spec)
  lemma: string;       // candidate dictionary lemma (Nugget Nihongo backward compat)
  rules: number;       // bitmask / rule index
  pos: 'verb_ichidan' | 'verb_godan' | 'verb_kuru' | 'verb_suru' | 'adj_i' | 'adj_na' | 'unknown';
  reasons: string[];
  steps: DeinflectionStep[];
}

export interface TransformRule {
  suffix: string;
  replacement: string;
  ruleName: string;
  explanationId: string;
  targetPos: DeinflectionCandidate['pos'];
  ruleMask: number;
}

// Bitmask constants for grammatical categories
export const RULE_MASKS = {
  CAUSATIVE_PASSIVE: 1 << 0,
  CAUSATIVE: 1 << 1,
  PASSIVE: 1 << 2,
  POTENTIAL: 1 << 3,
  VOLITIONAL: 1 << 4,
  CONDITIONAL: 1 << 5,
  IMPERATIVE: 1 << 6,
  NEGATIVE: 1 << 7,
  PAST: 1 << 8,
  TE_FORM: 1 << 9,
  TAI_DESIRE: 1 << 10,
  MASU_POLITE: 1 << 11,
  PROGRESSIVE: 1 << 12,
  ADJECTIVE: 1 << 13,
  COLLOQUIAL: 1 << 14,
};

// Canonical Japanese verb & adjective de-inflection rule matrix (40+ transform pathways)
export const TRANSFORM_RULES: TransformRule[] = [
  // ── 1. Causative-Passive (Kausatif-Pasif: Terpaksa disuruh / dibuat melakukan) ──
  { suffix: 'させられる', replacement: 'る', ruleName: 'Bentuk Kausatif-Pasif (-saserareru)', explanationId: '[Kausatif-Pasif] Terpaksa disuruh / dibuat melakukan sesuatu (Ichidan)', targetPos: 'verb_ichidan', ruleMask: RULE_MASKS.CAUSATIVE_PASSIVE },
  { suffix: 'させられた', replacement: 'る', ruleName: 'Bentuk Kausatif-Pasif Lampau (-saserareta)', explanationId: '[Kausatif-Pasif Lampau] Dulu terpaksa disuruh melakukan (Ichidan)', targetPos: 'verb_ichidan', ruleMask: RULE_MASKS.CAUSATIVE_PASSIVE | RULE_MASKS.PAST },
  // Godan shortened causative-passive (-sareru)
  { suffix: 'かされる', replacement: 'く', ruleName: 'Bentuk Kausatif-Pasif Singkat (Godan -ku)', explanationId: '[Kausatif-Pasif] Terpaksa disuruh melakukan (-ku)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.CAUSATIVE_PASSIVE },
  { suffix: 'がされる', replacement: 'ぐ', ruleName: 'Bentuk Kausatif-Pasif Singkat (Godan -gu)', explanationId: '[Kausatif-Pasif] Terpaksa disuruh melakukan (-gu)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.CAUSATIVE_PASSIVE },
  { suffix: 'たされる', replacement: 'つ', ruleName: 'Bentuk Kausatif-Pasif Singkat (Godan -tsu)', explanationId: '[Kausatif-Pasif] Terpaksa disuruh melakukan (-tsu)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.CAUSATIVE_PASSIVE },
  { suffix: 'なされる', replacement: 'ぬ', ruleName: 'Bentuk Kausatif-Pasif Singkat (Godan -nu)', explanationId: '[Kausatif-Pasif] Terpaksa disuruh melakukan (-nu)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.CAUSATIVE_PASSIVE },
  { suffix: 'ばされる', replacement: 'ぶ', ruleName: 'Bentuk Kausatif-Pasif Singkat (Godan -bu)', explanationId: '[Kausatif-Pasif] Terpaksa disuruh melakukan (-bu)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.CAUSATIVE_PASSIVE },
  { suffix: 'まされる', replacement: 'む', ruleName: 'Bentuk Kausatif-Pasif Singkat (Godan -mu)', explanationId: '[Kausatif-Pasif] Terpaksa disuruh melakukan (-mu)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.CAUSATIVE_PASSIVE },
  { suffix: 'らされる', replacement: 'る', ruleName: 'Bentuk Kausatif-Pasif Singkat (Godan -ru)', explanationId: '[Kausatif-Pasif] Terpaksa disuruh melakukan (-ru)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.CAUSATIVE_PASSIVE },
  { suffix: 'わされる', replacement: 'う', ruleName: 'Bentuk Kausatif-Pasif Singkat (Godan -u)', explanationId: '[Kausatif-Pasif] Terpaksa disuruh melakukan (-u)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.CAUSATIVE_PASSIVE },
  // Godan standard causative-passive (-serareru)
  { suffix: 'かせられる', replacement: 'く', ruleName: 'Bentuk Kausatif-Pasif Formal (Godan -ku)', explanationId: '[Kausatif-Pasif Formal] Terpaksa disuruh (-ku)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.CAUSATIVE_PASSIVE },
  { suffix: 'がせられる', replacement: 'ぐ', ruleName: 'Bentuk Kausatif-Pasif Formal (Godan -gu)', explanationId: '[Kausatif-Pasif Formal] Terpaksa disuruh (-gu)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.CAUSATIVE_PASSIVE },
  { suffix: 'させられる', replacement: 'す', ruleName: 'Bentuk Kausatif-Pasif Formal (Godan -su)', explanationId: '[Kausatif-Pasif Formal] Terpaksa disuruh (-su)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.CAUSATIVE_PASSIVE },
  { suffix: 'たせられる', replacement: 'つ', ruleName: 'Bentuk Kausatif-Pasif Formal (Godan -tsu)', explanationId: '[Kausatif-Pasif Formal] Terpaksa disuruh (-tsu)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.CAUSATIVE_PASSIVE },
  { suffix: 'なせられる', replacement: 'ぬ', ruleName: 'Bentuk Kausatif-Pasif Formal (Godan -nu)', explanationId: '[Kausatif-Pasif Formal] Terpaksa disuruh (-nu)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.CAUSATIVE_PASSIVE },
  { suffix: 'ばせられる', replacement: 'ぶ', ruleName: 'Bentuk Kausatif-Pasif Formal (Godan -bu)', explanationId: '[Kausatif-Pasif Formal] Terpaksa disuruh (-bu)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.CAUSATIVE_PASSIVE },
  { suffix: 'ませられる', replacement: 'む', ruleName: 'Bentuk Kausatif-Pasif Formal (Godan -mu)', explanationId: '[Kausatif-Pasif Formal] Terpaksa disuruh (-mu)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.CAUSATIVE_PASSIVE },
  { suffix: 'らせられる', replacement: 'る', ruleName: 'Bentuk Kausatif-Pasif Formal (Godan -ru)', explanationId: '[Kausatif-Pasif Formal] Terpaksa disuruh (-ru)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.CAUSATIVE_PASSIVE },
  { suffix: 'わせられる', replacement: 'う', ruleName: 'Bentuk Kausatif-Pasif Formal (Godan -u)', explanationId: '[Kausatif-Pasif Formal] Terpaksa disuruh (-u)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.CAUSATIVE_PASSIVE },
  { suffix: 'させられる', replacement: 'する', ruleName: 'Bentuk Kausatif-Pasif Suru', explanationId: '[Kausatif-Pasif] Terpaksa disuruh melakukan (Suru)', targetPos: 'verb_suru', ruleMask: RULE_MASKS.CAUSATIVE_PASSIVE },
  { suffix: 'こさせられる', replacement: 'くる', ruleName: 'Bentuk Kausatif-Pasif Kuru', explanationId: '[Kausatif-Pasif] Terpaksa disuruh datang (Kuru)', targetPos: 'verb_kuru', ruleMask: RULE_MASKS.CAUSATIVE_PASSIVE },

  // ── 2. Causative (Kausatif / Shieki: Menyuruh atau membiarkan) ──
  { suffix: 'させる', replacement: 'る', ruleName: 'Bentuk Kausatif (-saseru)', explanationId: '[Kausatif] Menyuruh / membiarkan melakukan (Ichidan)', targetPos: 'verb_ichidan', ruleMask: RULE_MASKS.CAUSATIVE },
  { suffix: 'かせる', replacement: 'く', ruleName: 'Bentuk Kausatif (Godan -ku)', explanationId: '[Kausatif] Menyuruh / mengizinkan (-ku)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.CAUSATIVE },
  { suffix: 'がせる', replacement: 'ぐ', ruleName: 'Bentuk Kausatif (Godan -gu)', explanationId: '[Kausatif] Menyuruh / mengizinkan (-gu)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.CAUSATIVE },
  { suffix: 'たせる', replacement: 'つ', ruleName: 'Bentuk Kausatif (Godan -tsu)', explanationId: '[Kausatif] Menyuruh / mengizinkan (-tsu)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.CAUSATIVE },
  { suffix: 'なせる', replacement: 'ぬ', ruleName: 'Bentuk Kausatif (Godan -nu)', explanationId: '[Kausatif] Menyuruh / mengizinkan (-nu)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.CAUSATIVE },
  { suffix: 'ばせる', replacement: 'ぶ', ruleName: 'Bentuk Kausatif (Godan -bu)', explanationId: '[Kausatif] Menyuruh / mengizinkan (-bu)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.CAUSATIVE },
  { suffix: 'ませる', replacement: 'む', ruleName: 'Bentuk Kausatif (Godan -mu)', explanationId: '[Kausatif] Menyuruh / mengizinkan (-mu)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.CAUSATIVE },
  { suffix: 'らせる', replacement: 'る', ruleName: 'Bentuk Kausatif (Godan -ru)', explanationId: '[Kausatif] Menyuruh / mengizinkan (-ru)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.CAUSATIVE },
  { suffix: 'わせる', replacement: 'う', ruleName: 'Bentuk Kausatif (Godan -u)', explanationId: '[Kausatif] Menyuruh / mengizinkan (-u)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.CAUSATIVE },
  { suffix: 'させる', replacement: 'する', ruleName: 'Bentuk Kausatif Suru', explanationId: '[Kausatif] Menyuruh melakukan (Suru)', targetPos: 'verb_suru', ruleMask: RULE_MASKS.CAUSATIVE },
  { suffix: 'こさせる', replacement: 'くる', ruleName: 'Bentuk Kausatif Kuru', explanationId: '[Kausatif] Menyuruh datang (Kuru)', targetPos: 'verb_kuru', ruleMask: RULE_MASKS.CAUSATIVE },

  // ── 3. Passive (Pasif / Ukemi: Dikenai tindakan / dibuat merugi) ──
  { suffix: 'られる', replacement: 'る', ruleName: 'Bentuk Pasif / Potensial (-rareru)', explanationId: '[Pasif/Potensial] Dikenai tindakan atau bisa melakukan (Ichidan)', targetPos: 'verb_ichidan', ruleMask: RULE_MASKS.PASSIVE | RULE_MASKS.POTENTIAL },
  { suffix: 'かれる', replacement: 'く', ruleName: 'Bentuk Pasif (Godan -ku)', explanationId: '[Pasif] Dikenai tindakan (-ku)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.PASSIVE },
  { suffix: 'がれる', replacement: 'ぐ', ruleName: 'Bentuk Pasif (Godan -gu)', explanationId: '[Pasif] Dikenai tindakan (-gu)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.PASSIVE },
  { suffix: 'される', replacement: 'す', ruleName: 'Bentuk Pasif (Godan -su)', explanationId: '[Pasif] Dikenai tindakan (-su)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.PASSIVE },
  { suffix: 'たれる', replacement: 'つ', ruleName: 'Bentuk Pasif (Godan -tsu)', explanationId: '[Pasif] Dikenai tindakan (-tsu)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.PASSIVE },
  { suffix: 'なれる', replacement: 'ぬ', ruleName: 'Bentuk Pasif (Godan -nu)', explanationId: '[Pasif] Dikenai tindakan (-nu)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.PASSIVE },
  { suffix: 'ばれる', replacement: 'ぶ', ruleName: 'Bentuk Pasif (Godan -bu)', explanationId: '[Pasif] Dikenai tindakan (-bu)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.PASSIVE },
  { suffix: 'まれる', replacement: 'む', ruleName: 'Bentuk Pasif (Godan -mu)', explanationId: '[Pasif] Dikenai tindakan (-mu)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.PASSIVE },
  { suffix: 'られる', replacement: 'る', ruleName: 'Bentuk Pasif (Godan -ru)', explanationId: '[Pasif] Dikenai tindakan (-ru)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.PASSIVE },
  { suffix: 'われる', replacement: 'う', ruleName: 'Bentuk Pasif (Godan -u)', explanationId: '[Pasif] Dikenai tindakan (-u)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.PASSIVE },
  { suffix: 'される', replacement: 'する', ruleName: 'Bentuk Pasif Suru', explanationId: '[Pasif] Dilakukan (Suru)', targetPos: 'verb_suru', ruleMask: RULE_MASKS.PASSIVE },
  { suffix: 'こられる', replacement: 'くる', ruleName: 'Bentuk Pasif Kuru', explanationId: '[Pasif] Didatangi (Kuru)', targetPos: 'verb_kuru', ruleMask: RULE_MASKS.PASSIVE },

  // ── 4. Potential (Potensial / Kanoukei: Mampu / bisa melakukan) ──
  { suffix: 'れる', replacement: 'る', ruleName: 'Bentuk Potensial Ra-nuki (Ichidan)', explanationId: '[Potensial Santai] Bisa / mampu melakukan (Ichidan)', targetPos: 'verb_ichidan', ruleMask: RULE_MASKS.POTENTIAL },
  { suffix: 'える', replacement: 'う', ruleName: 'Bentuk Potensial (Godan -u)', explanationId: '[Potensial] Bisa melakukan (-u)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.POTENTIAL },
  { suffix: 'ける', replacement: 'く', ruleName: 'Bentuk Potensial (Godan -ku)', explanationId: '[Potensial] Bisa melakukan (-ku)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.POTENTIAL },
  { suffix: 'げる', replacement: 'ぐ', ruleName: 'Bentuk Potensial (Godan -gu)', explanationId: '[Potensial] Bisa melakukan (-gu)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.POTENTIAL },
  { suffix: 'せる', replacement: 'す', ruleName: 'Bentuk Potensial (Godan -su)', explanationId: '[Potensial] Bisa melakukan (-su)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.POTENTIAL },
  { suffix: 'てる', replacement: 'つ', ruleName: 'Bentuk Potensial (Godan -tsu)', explanationId: '[Potensial] Bisa melakukan (-tsu)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.POTENTIAL },
  { suffix: 'ねる', replacement: 'ぬ', ruleName: 'Bentuk Potensial (Godan -nu)', explanationId: '[Potensial] Bisa melakukan (-nu)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.POTENTIAL },
  { suffix: 'べる', replacement: 'ぶ', ruleName: 'Bentuk Potensial (Godan -bu)', explanationId: '[Potensial] Bisa melakukan (-bu)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.POTENTIAL },
  { suffix: 'める', replacement: 'む', ruleName: 'Bentuk Potensial (Godan -mu)', explanationId: '[Potensial] Bisa melakukan (-mu)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.POTENTIAL },
  { suffix: 'れる', replacement: 'る', ruleName: 'Bentuk Potensial (Godan -ru)', explanationId: '[Potensial] Bisa melakukan (-ru)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.POTENTIAL },
  { suffix: 'できる', replacement: 'する', ruleName: 'Bentuk Potensial Suru', explanationId: '[Potensial] Bisa melakukan (Suru)', targetPos: 'verb_suru', ruleMask: RULE_MASKS.POTENTIAL },

  // ── 5. Volitional (Ajakan / Maksud: Ayo ... / Berniat ...) ──
  { suffix: 'よう', replacement: 'る', ruleName: 'Bentuk Ajakan / Maksud (-you)', explanationId: '[Ajakan/Maksud] Ayo / berniat melakukan (Ichidan)', targetPos: 'verb_ichidan', ruleMask: RULE_MASKS.VOLITIONAL },
  { suffix: 'おう', replacement: 'う', ruleName: 'Bentuk Ajakan / Maksud (Godan -u)', explanationId: '[Ajakan/Maksud] Ayo / berniat melakukan (-u)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.VOLITIONAL },
  { suffix: 'こう', replacement: 'く', ruleName: 'Bentuk Ajakan / Maksud (Godan -ku)', explanationId: '[Ajakan/Maksud] Ayo / berniat melakukan (-ku)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.VOLITIONAL },
  { suffix: 'ごう', replacement: 'ぐ', ruleName: 'Bentuk Ajakan / Maksud (Godan -gu)', explanationId: '[Ajakan/Maksud] Ayo / berniat melakukan (-gu)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.VOLITIONAL },
  { suffix: 'そう', replacement: 'す', ruleName: 'Bentuk Ajakan / Maksud (Godan -su)', explanationId: '[Ajakan/Maksud] Ayo / berniat melakukan (-su)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.VOLITIONAL },
  { suffix: 'とう', replacement: 'つ', ruleName: 'Bentuk Ajakan / Maksud (Godan -tsu)', explanationId: '[Ajakan/Maksud] Ayo / berniat melakukan (-tsu)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.VOLITIONAL },
  { suffix: 'のう', replacement: 'ぬ', ruleName: 'Bentuk Ajakan / Maksud (Godan -nu)', explanationId: '[Ajakan/Maksud] Ayo / berniat melakukan (-nu)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.VOLITIONAL },
  { suffix: 'ぼう', replacement: 'ぶ', ruleName: 'Bentuk Ajakan / Maksud (Godan -bu)', explanationId: '[Ajakan/Maksud] Ayo / berniat melakukan (-bu)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.VOLITIONAL },
  { suffix: 'もう', replacement: 'む', ruleName: 'Bentuk Ajakan / Maksud (Godan -mu)', explanationId: '[Ajakan/Maksud] Ayo / berniat melakukan (-mu)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.VOLITIONAL },
  { suffix: 'ろう', replacement: 'る', ruleName: 'Bentuk Ajakan / Maksud (Godan -ru)', explanationId: '[Ajakan/Maksud] Ayo / berniat melakukan (-ru)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.VOLITIONAL },
  { suffix: 'しよう', replacement: 'する', ruleName: 'Bentuk Ajakan Suru', explanationId: '[Ajakan/Maksud] Ayo melakukan (Suru)', targetPos: 'verb_suru', ruleMask: RULE_MASKS.VOLITIONAL },
  { suffix: 'こよう', replacement: 'くる', ruleName: 'Bentuk Ajakan Kuru', explanationId: '[Ajakan/Maksud] Ayo datang (Kuru)', targetPos: 'verb_kuru', ruleMask: RULE_MASKS.VOLITIONAL },

  // ── 6. Conditional (Pengandaian: Jika / Seandainya -ba) ──
  { suffix: 'れば', replacement: 'る', ruleName: 'Bentuk Pengandaian (-reba)', explanationId: '[Pengandaian] Jika / seandainya melakukan (Ichidan)', targetPos: 'verb_ichidan', ruleMask: RULE_MASKS.CONDITIONAL },
  { suffix: 'えば', replacement: 'う', ruleName: 'Bentuk Pengandaian (Godan -u)', explanationId: '[Pengandaian] Jika / seandainya (-u)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.CONDITIONAL },
  { suffix: 'けば', replacement: 'く', ruleName: 'Bentuk Pengandaian (Godan -ku)', explanationId: '[Pengandaian] Jika / seandainya (-ku)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.CONDITIONAL },
  { suffix: 'げば', replacement: 'ぐ', ruleName: 'Bentuk Pengandaian (Godan -gu)', explanationId: '[Pengandaian] Jika / seandainya (-gu)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.CONDITIONAL },
  { suffix: 'せば', replacement: 'す', ruleName: 'Bentuk Pengandaian (Godan -su)', explanationId: '[Pengandaian] Jika / seandainya (-su)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.CONDITIONAL },
  { suffix: 'てば', replacement: 'つ', ruleName: 'Bentuk Pengandaian (Godan -tsu)', explanationId: '[Pengandaian] Jika / seandainya (-tsu)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.CONDITIONAL },
  { suffix: 'ねば', replacement: 'ぬ', ruleName: 'Bentuk Pengandaian (Godan -nu)', explanationId: '[Pengandaian] Jika / seandainya (-nu)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.CONDITIONAL },
  { suffix: 'べば', replacement: 'ぶ', ruleName: 'Bentuk Pengandaian (Godan -bu)', explanationId: '[Pengandaian] Jika / seandainya (-bu)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.CONDITIONAL },
  { suffix: 'めば', replacement: 'む', ruleName: 'Bentuk Pengandaian (Godan -mu)', explanationId: '[Pengandaian] Jika / seandainya (-mu)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.CONDITIONAL },
  { suffix: 'れば', replacement: 'る', ruleName: 'Bentuk Pengandaian (Godan -ru)', explanationId: '[Pengandaian] Jika / seandainya (-ru)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.CONDITIONAL },
  { suffix: 'すれば', replacement: 'する', ruleName: 'Bentuk Pengandaian Suru', explanationId: '[Pengandaian] Jika melakukan (Suru)', targetPos: 'verb_suru', ruleMask: RULE_MASKS.CONDITIONAL },
  { suffix: 'くれば', replacement: 'くる', ruleName: 'Bentuk Pengandaian Kuru', explanationId: '[Pengandaian] Jika datang (Kuru)', targetPos: 'verb_kuru', ruleMask: RULE_MASKS.CONDITIONAL },
  { suffix: 'なければ', replacement: 'ない', ruleName: 'Bentuk Pengandaian Negatif (-nakereba)', explanationId: '[Pengandaian Negatif] Jika tidak melakukan', targetPos: 'verb_ichidan', ruleMask: RULE_MASKS.CONDITIONAL | RULE_MASKS.NEGATIVE },
  { suffix: 'ければ', replacement: 'い', ruleName: 'Bentuk Pengandaian Kata Sifat (-kereba)', explanationId: '[Pengandaian Sifat] Jika sifat terpenuhi (-i)', targetPos: 'adj_i', ruleMask: RULE_MASKS.CONDITIONAL | RULE_MASKS.ADJECTIVE },

  // ── 7. Imperative (Perintah Tegas / Meireikei: Lakukan!) ──
  { suffix: 'ろ', replacement: 'る', ruleName: 'Bentuk Perintah Tegas (-ro)', explanationId: '[Perintah Tegas] Lakukan! (Ichidan)', targetPos: 'verb_ichidan', ruleMask: RULE_MASKS.IMPERATIVE },
  { suffix: 'よ', replacement: 'る', ruleName: 'Bentuk Perintah Formal / Klasik (-yo)', explanationId: '[Perintah Formal/Tertulis] Lakukan! (Ichidan)', targetPos: 'verb_ichidan', ruleMask: RULE_MASKS.IMPERATIVE },
  { suffix: 'え', replacement: 'う', ruleName: 'Bentuk Perintah (Godan -u)', explanationId: '[Perintah Tegas] Lakukan! (-u)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.IMPERATIVE },
  { suffix: 'け', replacement: 'く', ruleName: 'Bentuk Perintah (Godan -ku)', explanationId: '[Perintah Tegas] Lakukan! (-ku)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.IMPERATIVE },
  { suffix: 'げ', replacement: 'ぐ', ruleName: 'Bentuk Perintah (Godan -gu)', explanationId: '[Perintah Tegas] Lakukan! (-gu)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.IMPERATIVE },
  { suffix: 'せ', replacement: 'す', ruleName: 'Bentuk Perintah (Godan -su)', explanationId: '[Perintah Tegas] Lakukan! (-su)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.IMPERATIVE },
  { suffix: 'て', replacement: 'つ', ruleName: 'Bentuk Perintah (Godan -tsu)', explanationId: '[Perintah Tegas] Lakukan! (-tsu)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.IMPERATIVE },
  { suffix: 'ね', replacement: 'ぬ', ruleName: 'Bentuk Perintah (Godan -nu)', explanationId: '[Perintah Tegas] Lakukan! (-nu)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.IMPERATIVE },
  { suffix: 'べ', replacement: 'ぶ', ruleName: 'Bentuk Perintah (Godan -bu)', explanationId: '[Perintah Tegas] Lakukan! (-bu)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.IMPERATIVE },
  { suffix: 'め', replacement: 'む', ruleName: 'Bentuk Perintah (Godan -mu)', explanationId: '[Perintah Tegas] Lakukan! (-mu)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.IMPERATIVE },
  { suffix: 'れ', replacement: 'る', ruleName: 'Bentuk Perintah (Godan -ru)', explanationId: '[Perintah Tegas] Lakukan! (-ru)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.IMPERATIVE },
  { suffix: 'しろ', replacement: 'する', ruleName: 'Bentuk Perintah Suru', explanationId: '[Perintah Tegas] Lakukan! (Suru)', targetPos: 'verb_suru', ruleMask: RULE_MASKS.IMPERATIVE },
  { suffix: 'せよ', replacement: 'する', ruleName: 'Bentuk Perintah Tertulis Suru', explanationId: '[Perintah Tertulis] Lakukanlah! (Suru)', targetPos: 'verb_suru', ruleMask: RULE_MASKS.IMPERATIVE },
  { suffix: 'こい', replacement: 'くる', ruleName: 'Bentuk Perintah Kuru', explanationId: '[Perintah Tegas] Datanglah! (Kuru)', targetPos: 'verb_kuru', ruleMask: RULE_MASKS.IMPERATIVE },

  // ── 8. Negative & Negative Past (Bentuk Negatif / Lampau Negatif) ──
  { suffix: 'なかった', replacement: 'ない', ruleName: 'Bentuk Lampau Negatif (-nakatta)', explanationId: '[Lampau Negatif] Dulu tidak melakukan sesuatu', targetPos: 'verb_ichidan', ruleMask: RULE_MASKS.NEGATIVE | RULE_MASKS.PAST },
  { suffix: 'ない', replacement: 'る', ruleName: 'Bentuk Negatif Santai (-nai)', explanationId: '[Negatif Polos] Tidak melakukan sesuatu (Ichidan)', targetPos: 'verb_ichidan', ruleMask: RULE_MASKS.NEGATIVE },
  { suffix: 'かない', replacement: 'く', ruleName: 'Bentuk Negatif (-kanai)', explanationId: '[Negatif] Tidak melakukan (-ku)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.NEGATIVE },
  { suffix: 'がない', replacement: 'ぐ', ruleName: 'Bentuk Negatif (-ganai)', explanationId: '[Negatif] Tidak melakukan (-gu)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.NEGATIVE },
  { suffix: 'さない', replacement: 'す', ruleName: 'Bentuk Negatif (-sanai)', explanationId: '[Negatif] Tidak melakukan (-su)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.NEGATIVE },
  { suffix: 'たない', replacement: 'つ', ruleName: 'Bentuk Negatif (-tanai)', explanationId: '[Negatif] Tidak melakukan (-tsu)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.NEGATIVE },
  { suffix: 'なない', replacement: 'ぬ', ruleName: 'Bentuk Negatif (-nanai)', explanationId: '[Negatif] Tidak melakukan (-nu)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.NEGATIVE },
  { suffix: 'ばない', replacement: 'ぶ', ruleName: 'Bentuk Negatif (-banai)', explanationId: '[Negatif] Tidak melakukan (-bu)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.NEGATIVE },
  { suffix: 'まない', replacement: 'む', ruleName: 'Bentuk Negatif (-manai)', explanationId: '[Negatif] Tidak melakukan (-mu)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.NEGATIVE },
  { suffix: 'らない', replacement: 'る', ruleName: 'Bentuk Negatif (-ranai)', explanationId: '[Negatif] Tidak melakukan (-ru)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.NEGATIVE },
  { suffix: 'わない', replacement: 'う', ruleName: 'Bentuk Negatif (-wanai)', explanationId: '[Negatif] Tidak melakukan (-u)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.NEGATIVE },
  { suffix: 'しない', replacement: 'する', ruleName: 'Bentuk Negatif Suru', explanationId: '[Negatif] Tidak melakukan (Suru)', targetPos: 'verb_suru', ruleMask: RULE_MASKS.NEGATIVE },
  { suffix: 'こない', replacement: 'くる', ruleName: 'Bentuk Negatif Kuru', explanationId: '[Negatif] Tidak datang (Kuru)', targetPos: 'verb_kuru', ruleMask: RULE_MASKS.NEGATIVE },

  // ── 9. Te & Ta forms (Sambung / Lampau) ──
  { suffix: 'て', replacement: 'る', ruleName: 'Bentuk Te (Sambung / Perintah Santai)', explanationId: '[Bentuk-Te] Menghubungkan kalimat / perintah santai (Ichidan)', targetPos: 'verb_ichidan', ruleMask: RULE_MASKS.TE_FORM },
  { suffix: 'た', replacement: 'る', ruleName: 'Bentuk Ta (Lampau Biasa)', explanationId: '[Bentuk-Ta] Tindakan sudah selesai / lampau (Ichidan)', targetPos: 'verb_ichidan', ruleMask: RULE_MASKS.PAST },
  { suffix: 'って', replacement: 'う', ruleName: 'Bentuk Te (Godan Sokuon-bin -u)', explanationId: '[Bentuk-Te] Sokuon-bin verba berakhiran -u', targetPos: 'verb_godan', ruleMask: RULE_MASKS.TE_FORM },
  { suffix: 'って', replacement: 'つ', ruleName: 'Bentuk Te (Godan Sokuon-bin -tsu)', explanationId: '[Bentuk-Te] Sokuon-bin verba berakhiran -tsu', targetPos: 'verb_godan', ruleMask: RULE_MASKS.TE_FORM },
  { suffix: 'って', replacement: 'る', ruleName: 'Bentuk Te (Godan Sokuon-bin -ru)', explanationId: '[Bentuk-Te] Sokuon-bin verba berakhiran -ru', targetPos: 'verb_godan', ruleMask: RULE_MASKS.TE_FORM },
  { suffix: 'った', replacement: 'う', ruleName: 'Bentuk Ta (Godan Sokuon-bin -u)', explanationId: '[Bentuk-Ta] Lampau sokuon-bin berakhiran -u', targetPos: 'verb_godan', ruleMask: RULE_MASKS.PAST },
  { suffix: 'った', replacement: 'つ', ruleName: 'Bentuk Ta (Godan Sokuon-bin -tsu)', explanationId: '[Bentuk-Ta] Lampau sokuon-bin berakhiran -tsu', targetPos: 'verb_godan', ruleMask: RULE_MASKS.PAST },
  { suffix: 'った', replacement: 'る', ruleName: 'Bentuk Ta (Godan Sokuon-bin -ru)', explanationId: '[Bentuk-Ta] Lampau sokuon-bin berakhiran -ru', targetPos: 'verb_godan', ruleMask: RULE_MASKS.PAST },
  { suffix: 'んで', replacement: 'む', ruleName: 'Bentuk Te (Godan Hatsuon-bin -mu)', explanationId: '[Bentuk-Te] Hatsuon-bin verba berakhiran -mu', targetPos: 'verb_godan', ruleMask: RULE_MASKS.TE_FORM },
  { suffix: 'んで', replacement: 'ぶ', ruleName: 'Bentuk Te (Godan Hatsuon-bin -bu)', explanationId: '[Bentuk-Te] Hatsuon-bin verba berakhiran -bu', targetPos: 'verb_godan', ruleMask: RULE_MASKS.TE_FORM },
  { suffix: 'んで', replacement: 'ぬ', ruleName: 'Bentuk Te (Godan Hatsuon-bin -nu)', explanationId: '[Bentuk-Te] Hatsuon-bin verba berakhiran -nu', targetPos: 'verb_godan', ruleMask: RULE_MASKS.TE_FORM },
  { suffix: 'んだ', replacement: 'む', ruleName: 'Bentuk Ta (Godan Hatsuon-bin -mu)', explanationId: '[Bentuk-Ta] Lampau hatsuon-bin berakhiran -mu', targetPos: 'verb_godan', ruleMask: RULE_MASKS.PAST },
  { suffix: 'んだ', replacement: 'ぶ', ruleName: 'Bentuk Ta (Godan Hatsuon-bin -bu)', explanationId: '[Bentuk-Ta] Lampau hatsuon-bin berakhiran -bu', targetPos: 'verb_godan', ruleMask: RULE_MASKS.PAST },
  { suffix: 'んだ', replacement: 'ぬ', ruleName: 'Bentuk Ta (Godan Hatsuon-bin -nu)', explanationId: '[Bentuk-Ta] Lampau hatsuon-bin berakhiran -nu', targetPos: 'verb_godan', ruleMask: RULE_MASKS.PAST },
  { suffix: 'いて', replacement: 'く', ruleName: 'Bentuk Te (Godan I-onbin -ku)', explanationId: '[Bentuk-Te] I-onbin verba berakhiran -ku', targetPos: 'verb_godan', ruleMask: RULE_MASKS.TE_FORM },
  { suffix: 'いた', replacement: 'く', ruleName: 'Bentuk Ta (Godan I-onbin -ku)', explanationId: '[Bentuk-Ta] Lampau i-onbin berakhiran -ku', targetPos: 'verb_godan', ruleMask: RULE_MASKS.PAST },
  { suffix: 'いで', replacement: 'ぐ', ruleName: 'Bentuk Te (Godan I-onbin -gu)', explanationId: '[Bentuk-Te] I-onbin verba berakhiran -gu', targetPos: 'verb_godan', ruleMask: RULE_MASKS.TE_FORM },
  { suffix: 'いだ', replacement: 'ぐ', ruleName: 'Bentuk Ta (Godan I-onbin -gu)', explanationId: '[Bentuk-Ta] Lampau i-onbin berakhiran -gu', targetPos: 'verb_godan', ruleMask: RULE_MASKS.PAST },
  { suffix: 'して', replacement: 'す', ruleName: 'Bentuk Te (Godan -su)', explanationId: '[Bentuk-Te] Verba berakhiran -su', targetPos: 'verb_godan', ruleMask: RULE_MASKS.TE_FORM },
  { suffix: 'した', replacement: 'す', ruleName: 'Bentuk Ta (Godan -su)', explanationId: '[Bentuk-Ta] Lampau verba berakhiran -su', targetPos: 'verb_godan', ruleMask: RULE_MASKS.PAST },
  { suffix: 'して', replacement: 'する', ruleName: 'Bentuk Te Suru', explanationId: '[Bentuk-Te] Verba irregular suru', targetPos: 'verb_suru', ruleMask: RULE_MASKS.TE_FORM },
  { suffix: 'した', replacement: 'する', ruleName: 'Bentuk Ta Suru', explanationId: '[Bentuk-Ta] Lampau verba irregular suru', targetPos: 'verb_suru', ruleMask: RULE_MASKS.PAST },
  { suffix: 'きて', replacement: 'くる', ruleName: 'Bentuk Te Kuru', explanationId: '[Bentuk-Te] Verba irregular kuru', targetPos: 'verb_kuru', ruleMask: RULE_MASKS.TE_FORM },
  { suffix: 'きた', replacement: 'くる', ruleName: 'Bentuk Ta Kuru', explanationId: '[Bentuk-Ta] Lampau verba irregular kuru', targetPos: 'verb_kuru', ruleMask: RULE_MASKS.PAST },

  // ── 10. Tai forms (Bentuk Keinginan / -tai) ──
  { suffix: 'たくなかった', replacement: 'たい', ruleName: 'Bentuk Keinginan Lampau Negatif (-takunakatta)', explanationId: '[Keinginan Lampau Negatif] Dulu tidak ingin melakukan', targetPos: 'adj_i', ruleMask: RULE_MASKS.TAI_DESIRE | RULE_MASKS.NEGATIVE | RULE_MASKS.PAST },
  { suffix: 'たくない', replacement: 'たい', ruleName: 'Bentuk Tidak Ingin (-takunai)', explanationId: '[Keinginan Negatif] Tidak ingin melakukan', targetPos: 'adj_i', ruleMask: RULE_MASKS.TAI_DESIRE | RULE_MASKS.NEGATIVE },
  { suffix: 'たかった', replacement: 'たい', ruleName: 'Bentuk Dulu Ingin (-takatta)', explanationId: '[Keinginan Lampau] Dulu ingin melakukan', targetPos: 'adj_i', ruleMask: RULE_MASKS.TAI_DESIRE | RULE_MASKS.PAST },
  { suffix: 'たい', replacement: 'る', ruleName: 'Bentuk Ingin Melakukan (-tai)', explanationId: '[Keinginan] Ingin melakukan (Ichidan)', targetPos: 'verb_ichidan', ruleMask: RULE_MASKS.TAI_DESIRE },
  { suffix: 'いたい', replacement: 'う', ruleName: 'Bentuk Ingin (Godan -u)', explanationId: '[Keinginan] Ingin melakukan (-u)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.TAI_DESIRE },
  { suffix: 'きたい', replacement: 'く', ruleName: 'Bentuk Ingin (Godan -ku)', explanationId: '[Keinginan] Ingin melakukan (-ku)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.TAI_DESIRE },
  { suffix: 'ぎたい', replacement: 'ぐ', ruleName: 'Bentuk Ingin (Godan -gu)', explanationId: '[Keinginan] Ingin melakukan (-gu)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.TAI_DESIRE },
  { suffix: 'したい', replacement: 'す', ruleName: 'Bentuk Ingin (Godan -su)', explanationId: '[Keinginan] Ingin melakukan (-su)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.TAI_DESIRE },
  { suffix: 'ちたい', replacement: 'つ', ruleName: 'Bentuk Ingin (Godan -tsu)', explanationId: '[Keinginan] Ingin melakukan (-tsu)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.TAI_DESIRE },
  { suffix: 'にたい', replacement: 'ぬ', ruleName: 'Bentuk Ingin (Godan -nu)', explanationId: '[Keinginan] Ingin melakukan (-nu)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.TAI_DESIRE },
  { suffix: 'びたい', replacement: 'ぶ', ruleName: 'Bentuk Ingin (Godan -bu)', explanationId: '[Keinginan] Ingin melakukan (-bu)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.TAI_DESIRE },
  { suffix: 'みたい', replacement: 'む', ruleName: 'Bentuk Ingin (Godan -mu)', explanationId: '[Keinginan] Ingin melakukan (-mu)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.TAI_DESIRE },
  { suffix: 'りたい', replacement: 'る', ruleName: 'Bentuk Ingin (Godan -ru)', explanationId: '[Keinginan] Ingin melakukan (-ru)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.TAI_DESIRE },
  { suffix: 'したい', replacement: 'する', ruleName: 'Bentuk Ingin Suru', explanationId: '[Keinginan] Ingin melakukan (Suru)', targetPos: 'verb_suru', ruleMask: RULE_MASKS.TAI_DESIRE },
  { suffix: 'きたい', replacement: 'くる', ruleName: 'Bentuk Ingin Kuru', explanationId: '[Keinginan] Ingin datang (Kuru)', targetPos: 'verb_kuru', ruleMask: RULE_MASKS.TAI_DESIRE },

  // ── 11. Masu Polite Forms (Bentuk Sopan / Formal) ──
  { suffix: 'ませんでした', replacement: 'る', ruleName: 'Bentuk Masen-deshita (Sopan Negatif Lampau)', explanationId: '[Sopan Negatif Lampau] Tidak melakukan di masa lalu (Ichidan)', targetPos: 'verb_ichidan', ruleMask: RULE_MASKS.MASU_POLITE | RULE_MASKS.NEGATIVE | RULE_MASKS.PAST },
  { suffix: 'ませんでした', replacement: 'う', ruleName: 'Bentuk Masen-deshita (Sopan Negatif Lampau)', explanationId: '[Sopan Negatif Lampau] Tidak melakukan di masa lalu (-u)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.MASU_POLITE | RULE_MASKS.NEGATIVE | RULE_MASKS.PAST },
  { suffix: 'ません', replacement: 'る', ruleName: 'Bentuk Sopan Negatif (Ichidan)', explanationId: '[Sopan Negatif] Tidak melakukan (Ichidan)', targetPos: 'verb_ichidan', ruleMask: RULE_MASKS.MASU_POLITE | RULE_MASKS.NEGATIVE },
  { suffix: 'ました', replacement: 'る', ruleName: 'Bentuk Sopan Lampau (Ichidan)', explanationId: '[Sopan Lampau] Telah selesai melakukan (Ichidan)', targetPos: 'verb_ichidan', ruleMask: RULE_MASKS.MASU_POLITE | RULE_MASKS.PAST },
  { suffix: 'ます', replacement: 'る', ruleName: 'Bentuk Sopan Formal (Ichidan)', explanationId: '[Sopan Formal] Melakukan sesuatu dengan sopan (Ichidan)', targetPos: 'verb_ichidan', ruleMask: RULE_MASKS.MASU_POLITE },
  { suffix: 'ましょう', replacement: 'る', ruleName: 'Bentuk Sopan Ajakan (Ichidan)', explanationId: '[Sopan Ajakan] Mari kita lakukan bersama (Ichidan)', targetPos: 'verb_ichidan', ruleMask: RULE_MASKS.MASU_POLITE | RULE_MASKS.VOLITIONAL },
  // Godan Masu stem endings (i-dan -> u-dan)
  { suffix: 'きました', replacement: 'く', ruleName: 'Bentuk Mashita (Godan -ku)', explanationId: '[Sopan Lampau] Telah selesai (-ku)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.MASU_POLITE | RULE_MASKS.PAST },
  { suffix: 'ぎました', replacement: 'ぐ', ruleName: 'Bentuk Mashita (Godan -gu)', explanationId: '[Sopan Lampau] Telah selesai (-gu)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.MASU_POLITE | RULE_MASKS.PAST },
  { suffix: 'しました', replacement: 'す', ruleName: 'Bentuk Mashita (Godan -su)', explanationId: '[Sopan Lampau] Telah selesai (-su)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.MASU_POLITE | RULE_MASKS.PAST },
  { suffix: 'ちました', replacement: 'つ', ruleName: 'Bentuk Mashita (Godan -tsu)', explanationId: '[Sopan Lampau] Telah selesai (-tsu)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.MASU_POLITE | RULE_MASKS.PAST },
  { suffix: 'にました', replacement: 'ぬ', ruleName: 'Bentuk Mashita (Godan -nu)', explanationId: '[Sopan Lampau] Telah selesai (-nu)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.MASU_POLITE | RULE_MASKS.PAST },
  { suffix: 'びました', replacement: 'ぶ', ruleName: 'Bentuk Mashita (Godan -bu)', explanationId: '[Sopan Lampau] Telah selesai (-bu)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.MASU_POLITE | RULE_MASKS.PAST },
  { suffix: 'みました', replacement: 'む', ruleName: 'Bentuk Mashita (Godan -mu)', explanationId: '[Sopan Lampau] Telah selesai (-mu)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.MASU_POLITE | RULE_MASKS.PAST },
  { suffix: 'りました', replacement: 'る', ruleName: 'Bentuk Mashita (Godan -ru)', explanationId: '[Sopan Lampau] Telah selesai (-ru)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.MASU_POLITE | RULE_MASKS.PAST },
  { suffix: 'いました', replacement: 'う', ruleName: 'Bentuk Mashita (Godan -u)', explanationId: '[Sopan Lampau] Telah selesai (-u)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.MASU_POLITE | RULE_MASKS.PAST },
  { suffix: 'きます', replacement: 'く', ruleName: 'Bentuk Masu (Godan -ku)', explanationId: '[Sopan Formal] Melakukan (-ku)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.MASU_POLITE },
  { suffix: 'ぎます', replacement: 'ぐ', ruleName: 'Bentuk Masu (Godan -gu)', explanationId: '[Sopan Formal] Melakukan (-gu)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.MASU_POLITE },
  { suffix: 'します', replacement: 'す', ruleName: 'Bentuk Masu (Godan -su)', explanationId: '[Sopan Formal] Melakukan (-su)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.MASU_POLITE },
  { suffix: 'ちます', replacement: 'つ', ruleName: 'Bentuk Masu (Godan -tsu)', explanationId: '[Sopan Formal] Melakukan (-tsu)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.MASU_POLITE },
  { suffix: 'にます', replacement: 'ぬ', ruleName: 'Bentuk Masu (Godan -nu)', explanationId: '[Sopan Formal] Melakukan (-nu)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.MASU_POLITE },
  { suffix: 'びます', replacement: 'ぶ', ruleName: 'Bentuk Masu (Godan -bu)', explanationId: '[Sopan Formal] Melakukan (-bu)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.MASU_POLITE },
  { suffix: 'みます', replacement: 'む', ruleName: 'Bentuk Masu (Godan -mu)', explanationId: '[Sopan Formal] Melakukan (-mu)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.MASU_POLITE },
  { suffix: 'ります', replacement: 'る', ruleName: 'Bentuk Masu (Godan -ru)', explanationId: '[Sopan Formal] Melakukan (-ru)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.MASU_POLITE },
  { suffix: 'います', replacement: 'う', ruleName: 'Bentuk Masu (Godan -u)', explanationId: '[Sopan Formal] Melakukan (-u)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.MASU_POLITE },
  { suffix: 'きません', replacement: 'く', ruleName: 'Bentuk Masen (Godan -ku)', explanationId: '[Sopan Negatif] Tidak melakukan (-ku)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.MASU_POLITE | RULE_MASKS.NEGATIVE },
  { suffix: 'ぎません', replacement: 'ぐ', ruleName: 'Bentuk Masen (Godan -gu)', explanationId: '[Sopan Negatif] Tidak melakukan (-gu)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.MASU_POLITE | RULE_MASKS.NEGATIVE },
  { suffix: 'しません', replacement: 'す', ruleName: 'Bentuk Masen (Godan -su)', explanationId: '[Sopan Negatif] Tidak melakukan (-su)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.MASU_POLITE | RULE_MASKS.NEGATIVE },
  { suffix: 'ちません', replacement: 'つ', ruleName: 'Bentuk Masen (Godan -tsu)', explanationId: '[Sopan Negatif] Tidak melakukan (-tsu)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.MASU_POLITE | RULE_MASKS.NEGATIVE },
  { suffix: 'にません', replacement: 'ぬ', ruleName: 'Bentuk Masen (Godan -nu)', explanationId: '[Sopan Negatif] Tidak melakukan (-nu)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.MASU_POLITE | RULE_MASKS.NEGATIVE },
  { suffix: 'びません', replacement: 'ぶ', ruleName: 'Bentuk Masen (Godan -bu)', explanationId: '[Sopan Negatif] Tidak melakukan (-bu)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.MASU_POLITE | RULE_MASKS.NEGATIVE },
  { suffix: 'みません', replacement: 'む', ruleName: 'Bentuk Masen (Godan -mu)', explanationId: '[Sopan Negatif] Tidak melakukan (-mu)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.MASU_POLITE | RULE_MASKS.NEGATIVE },
  { suffix: 'りません', replacement: 'る', ruleName: 'Bentuk Masen (Godan -ru)', explanationId: '[Sopan Negatif] Tidak melakukan (-ru)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.MASU_POLITE | RULE_MASKS.NEGATIVE },
  { suffix: 'いません', replacement: 'う', ruleName: 'Bentuk Masen (Godan -u)', explanationId: '[Sopan Negatif] Tidak melakukan (-u)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.MASU_POLITE | RULE_MASKS.NEGATIVE },
  { suffix: 'きましょう', replacement: 'く', ruleName: 'Bentuk Ajakan Masu (Godan -ku)', explanationId: '[Sopan Ajakan] Mari (-ku)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.MASU_POLITE | RULE_MASKS.VOLITIONAL },
  { suffix: 'ぎましょう', replacement: 'ぐ', ruleName: 'Bentuk Ajakan Masu (Godan -gu)', explanationId: '[Sopan Ajakan] Mari (-gu)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.MASU_POLITE | RULE_MASKS.VOLITIONAL },
  { suffix: 'しましょう', replacement: 'す', ruleName: 'Bentuk Ajakan Masu (Godan -su)', explanationId: '[Sopan Ajakan] Mari (-su)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.MASU_POLITE | RULE_MASKS.VOLITIONAL },
  { suffix: 'ちましょう', replacement: 'つ', ruleName: 'Bentuk Ajakan Masu (Godan -tsu)', explanationId: '[Sopan Ajakan] Mari (-tsu)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.MASU_POLITE | RULE_MASKS.VOLITIONAL },
  { suffix: 'にましょう', replacement: 'ぬ', ruleName: 'Bentuk Ajakan Masu (Godan -nu)', explanationId: '[Sopan Ajakan] Mari (-nu)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.MASU_POLITE | RULE_MASKS.VOLITIONAL },
  { suffix: 'びましょう', replacement: 'ぶ', ruleName: 'Bentuk Ajakan Masu (Godan -bu)', explanationId: '[Sopan Ajakan] Mari (-bu)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.MASU_POLITE | RULE_MASKS.VOLITIONAL },
  { suffix: 'みましょう', replacement: 'む', ruleName: 'Bentuk Ajakan Masu (Godan -mu)', explanationId: '[Sopan Ajakan] Mari (-mu)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.MASU_POLITE | RULE_MASKS.VOLITIONAL },
  { suffix: 'りましょう', replacement: 'る', ruleName: 'Bentuk Ajakan Masu (Godan -ru)', explanationId: '[Sopan Ajakan] Mari (-ru)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.MASU_POLITE | RULE_MASKS.VOLITIONAL },
  { suffix: 'いましょう', replacement: 'う', ruleName: 'Bentuk Ajakan Masu (Godan -u)', explanationId: '[Sopan Ajakan] Mari (-u)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.MASU_POLITE | RULE_MASKS.VOLITIONAL },

  // ── 12. Progressive & State (-te iru / -te shimau) ──
  { suffix: 'ている', replacement: 'て', ruleName: 'Bentuk Sedang Berlangsung (-te iru)', explanationId: '[Sedang Berlangsung] Sedang melakukan atau dalam keadaan berlanjut', targetPos: 'verb_ichidan', ruleMask: RULE_MASKS.PROGRESSIVE },
  { suffix: 'ていた', replacement: 'て', ruleName: 'Bentuk Sedang Berlangsung Lampau (-te ita)', explanationId: '[Sedang Berlangsung Lampau] Dulu sedang melakukan', targetPos: 'verb_ichidan', ruleMask: RULE_MASKS.PROGRESSIVE | RULE_MASKS.PAST },
  { suffix: 'ています', replacement: 'て', ruleName: 'Bentuk Sedang Berlangsung Sopan (-te imasu)', explanationId: '[Sedang Berlangsung Sopan] Sedang melakukan dengan sopan', targetPos: 'verb_ichidan', ruleMask: RULE_MASKS.PROGRESSIVE | RULE_MASKS.MASU_POLITE },
  { suffix: 'ていました', replacement: 'て', ruleName: 'Bentuk Sedang Berlangsung Sopan Lampau (-te imashita)', explanationId: '[Sedang Berlangsung Sopan Lampau] Dulu sedang melakukan', targetPos: 'verb_ichidan', ruleMask: RULE_MASKS.PROGRESSIVE | RULE_MASKS.MASU_POLITE | RULE_MASKS.PAST },
  { suffix: 'でいる', replacement: 'で', ruleName: 'Bentuk Sedang Berlangsung (-de iru)', explanationId: '[Sedang Berlangsung] Sedang melakukan (-de iru)', targetPos: 'verb_ichidan', ruleMask: RULE_MASKS.PROGRESSIVE },
  { suffix: 'でいた', replacement: 'で', ruleName: 'Bentuk Sedang Berlangsung Lampau (-de ita)', explanationId: '[Sedang Berlangsung Lampau] Dulu sedang melakukan (-de ita)', targetPos: 'verb_ichidan', ruleMask: RULE_MASKS.PROGRESSIVE | RULE_MASKS.PAST },
  { suffix: 'でいます', replacement: 'で', ruleName: 'Bentuk Sedang Berlangsung Sopan (-de imasu)', explanationId: '[Sedang Berlangsung Sopan] Sedang melakukan (-de imasu)', targetPos: 'verb_ichidan', ruleMask: RULE_MASKS.PROGRESSIVE | RULE_MASKS.MASU_POLITE },
  { suffix: 'でいました', replacement: 'で', ruleName: 'Bentuk Sedang Berlangsung Sopan Lampau (-de imashita)', explanationId: '[Sedang Berlangsung Sopan Lampau] Dulu sedang melakukan (-de imashita)', targetPos: 'verb_ichidan', ruleMask: RULE_MASKS.PROGRESSIVE | RULE_MASKS.MASU_POLITE | RULE_MASKS.PAST },
  { suffix: 'ちゃう', replacement: 'て', ruleName: 'Bentuk Santai Menyesal / Tuntas (-chau)', explanationId: '[Tuntas / Menyesal] Terlanjur atau tuntas melakukan (-chau)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.COLLOQUIAL },
  { suffix: 'ちゃった', replacement: 'て', ruleName: 'Bentuk Santai Menyesal Lampau (-chatta)', explanationId: '[Tuntas / Menyesal Lampau] Terlanjur selesai dilakukan (-chatta)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.COLLOQUIAL | RULE_MASKS.PAST },
  { suffix: 'じゃう', replacement: 'で', ruleName: 'Bentuk Santai Menyesal / Tuntas (-jau)', explanationId: '[Tuntas / Menyesal] Terlanjur atau tuntas melakukan (-jau)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.COLLOQUIAL },
  { suffix: 'じゃった', replacement: 'で', ruleName: 'Bentuk Santai Menyesal Lampau (-jatta)', explanationId: '[Tuntas / Menyesal Lampau] Terlanjur selesai dilakukan (-jatta)', targetPos: 'verb_godan', ruleMask: RULE_MASKS.COLLOQUIAL | RULE_MASKS.PAST },

  // ── 13. Tara & Tari Forms ──
  { suffix: 'たら', replacement: 'た', ruleName: 'Bentuk Kondisional (-tara)', explanationId: '[Kondisional -tara] Kalau / setelah tindakan selesai', targetPos: 'verb_ichidan', ruleMask: RULE_MASKS.CONDITIONAL },
  { suffix: 'だら', replacement: 'だ', ruleName: 'Bentuk Kondisional (-dara)', explanationId: '[Kondisional -dara] Kalau / setelah tindakan selesai', targetPos: 'verb_ichidan', ruleMask: RULE_MASKS.CONDITIONAL },
  { suffix: 'たり', replacement: 'た', ruleName: 'Bentuk Representatif (-tari)', explanationId: '[Daftar Tindakan -tari] Melakukan kegiatan seperti...', targetPos: 'verb_ichidan', ruleMask: RULE_MASKS.COLLOQUIAL },
  { suffix: 'だり', replacement: 'だ', ruleName: 'Bentuk Representatif (-dari)', explanationId: '[Daftar Tindakan -dari] Melakukan kegiatan seperti...', targetPos: 'verb_ichidan', ruleMask: RULE_MASKS.COLLOQUIAL },

  // ── 14. Adjectives (Kata Sifat -i) ──
  { suffix: 'くない', replacement: 'い', ruleName: 'Kata Sifat Negatif (-kunai)', explanationId: '[Sifat Negatif] Tidak bersifat demikian (-kunai)', targetPos: 'adj_i', ruleMask: RULE_MASKS.ADJECTIVE | RULE_MASKS.NEGATIVE },
  { suffix: 'かった', replacement: 'い', ruleName: 'Kata Sifat Lampau (-katta)', explanationId: '[Sifat Lampau] Dulu bersifat demikian (-katta)', targetPos: 'adj_i', ruleMask: RULE_MASKS.ADJECTIVE | RULE_MASKS.PAST },
  { suffix: 'くなかった', replacement: 'い', ruleName: 'Kata Sifat Lampau Negatif (-kunakatta)', explanationId: '[Sifat Lampau Negatif] Dulu tidak bersifat demikian (-kunakatta)', targetPos: 'adj_i', ruleMask: RULE_MASKS.ADJECTIVE | RULE_MASKS.NEGATIVE | RULE_MASKS.PAST },
  { suffix: 'く', replacement: 'い', ruleName: 'Kata Sifat Adverbial (-ku)', explanationId: '[Sifat Adverbial] Berperan sebagai kata keterangan cara (-ku)', targetPos: 'adj_i', ruleMask: RULE_MASKS.ADJECTIVE },

  // ── 15. Irregular Suru & Kuru Extras ──
  { suffix: 'します', replacement: 'する', ruleName: 'Bentuk Sopan Suru (Shimasu)', explanationId: '[Sopan Formal] Melakukan (Suru)', targetPos: 'verb_suru', ruleMask: RULE_MASKS.MASU_POLITE },
  { suffix: 'しました', replacement: 'する', ruleName: 'Bentuk Lampau Sopan Suru (Shimashita)', explanationId: '[Sopan Lampau] Telah melakukan (Suru)', targetPos: 'verb_suru', ruleMask: RULE_MASKS.MASU_POLITE | RULE_MASKS.PAST },
  { suffix: 'しません', replacement: 'する', ruleName: 'Bentuk Negatif Sopan Suru (Shimasen)', explanationId: '[Sopan Negatif] Tidak melakukan (Suru)', targetPos: 'verb_suru', ruleMask: RULE_MASKS.MASU_POLITE | RULE_MASKS.NEGATIVE },
  { suffix: 'しませんでした', replacement: 'する', ruleName: 'Bentuk Negatif Lampau Sopan Suru (Shimasendeshita)', explanationId: '[Sopan Negatif Lampau] Dulu tidak melakukan (Suru)', targetPos: 'verb_suru', ruleMask: RULE_MASKS.MASU_POLITE | RULE_MASKS.NEGATIVE | RULE_MASKS.PAST },
  { suffix: 'きます', replacement: 'くる', ruleName: 'Bentuk Sopan Kuru (Kimasu)', explanationId: '[Sopan Formal] Datang (Kuru)', targetPos: 'verb_kuru', ruleMask: RULE_MASKS.MASU_POLITE },
  { suffix: 'きました', replacement: 'くる', ruleName: 'Bentuk Lampau Sopan Kuru (Kimashita)', explanationId: '[Sopan Lampau] Telah datang (Kuru)', targetPos: 'verb_kuru', ruleMask: RULE_MASKS.MASU_POLITE | RULE_MASKS.PAST },
  { suffix: 'きません', replacement: 'くる', ruleName: 'Bentuk Negatif Sopan Kuru (Kimasen)', explanationId: '[Sopan Negatif] Tidak datang (Kuru)', targetPos: 'verb_kuru', ruleMask: RULE_MASKS.MASU_POLITE | RULE_MASKS.NEGATIVE },
  { suffix: 'きませんでした', replacement: 'くる', ruleName: 'Bentuk Negatif Lampau Sopan Kuru (Kimasendeshita)', explanationId: '[Sopan Negatif Lampau] Dulu tidak datang (Kuru)', targetPos: 'verb_kuru', ruleMask: RULE_MASKS.MASU_POLITE | RULE_MASKS.NEGATIVE | RULE_MASKS.PAST },
];

/**
 * Recursively de-inflects an inflected Japanese token back to possible dictionary forms.
 * Returns an array of candidates conforming to Yomitan specifications with Indonesian explanations.
 */
export function deinflectWord(word: string, maxDepth = 4): DeinflectionCandidate[] {
  if (!word || typeof word !== 'string') return [];
  const token = word.trim();
  if (token.length === 0) return [];

  const results: DeinflectionCandidate[] = [];
  const visited = new Set<string>();

  function search(currentWord: string, depth: number, accumulatedSteps: DeinflectionStep[], accumulatedMask: number): void {
    if (depth > maxDepth || visited.has(currentWord)) return;
    visited.add(currentWord);

    // Evaluate longer suffixes first to prevent sub-suffix eclipsing (e.g. ました before した or た)
    const sortedRules = [...TRANSFORM_RULES].sort((a, b) => b.suffix.length - a.suffix.length);

    for (const rule of sortedRules) {
      if (currentWord.endsWith(rule.suffix)) {
        // Ensure stem is not empty (except for single-char verbs where replacement completes lemma)
        const stem = currentWord.slice(0, currentWord.length - rule.suffix.length);
        const restored = stem + rule.replacement;

        if (!restored || restored.length === 0) continue;

        const currentStep: DeinflectionStep = {
          form: currentWord,
          ruleName: rule.ruleName,
          explanationId: rule.explanationId,
        };

        const newSteps = [...accumulatedSteps, currentStep];
        const newMask = accumulatedMask | rule.ruleMask;

        // Register candidate
        results.push({
          source: token,
          term: restored,
          lemma: restored,
          rules: newMask,
          pos: rule.targetPos,
          reasons: newSteps.map((s) => s.ruleName),
          steps: newSteps,
        });

        // Recurse deeper for nested agglutinative chains
        // (e.g. 食べさせられなかった -> 食べさせられない -> 食べさせる -> 食べる)
        search(restored, depth + 1, newSteps, newMask);
      }
    }
  }

  search(token, 1, [], 0);

  // Filter and deduplicate candidates by restored lemma
  const uniqueLemmas = new Map<string, DeinflectionCandidate>();
  for (const cand of results) {
    if (!uniqueLemmas.has(cand.lemma)) {
      uniqueLemmas.set(cand.lemma, cand);
    }
  }

  return Array.from(uniqueLemmas.values());
}

/**
 * Finds the single best dictionary lemma candidate for a given inflected word.
 * Returns null if the word cannot be de-inflected or is already a lemma.
 */
export function findBestLemma(word: string): DeinflectionCandidate | null {
  const candidates = deinflectWord(word);
  if (candidates.length === 0) return null;

  // Prefer candidates that end in standard dictionary endings (る, う, く, ぐ, す, つ, ぬ, ぶ, む, い)
  const canonicalCandidates = candidates.filter((c) => /[うくぐすつぬぶむるい]$/.test(c.lemma));
  return canonicalCandidates[0] || candidates[0];
}
