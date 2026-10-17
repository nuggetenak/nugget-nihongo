// ══════════════════════════════════════════════════════════════════
//  l1InterferenceEngine.ts — Mesin Analisis Interferensi Bahasa Ibu (L1)
//  Mendeteksi dan memitigasi jebakan tipikal penutur Bahasa Indonesia
//  saat mempelajari tata bahasa Jepang (Second Language Acquisition - SLA)
// ══════════════════════════════════════════════════════════════════

export type InterferenceType =
  | 'tense_aspect'
  | 'voice_passive'
  | 'topic_subject'
  | 'giving_receiving'
  | 'existence_animate'
  | 'directional_particles'
  | 'coercion_causative'
  | 'polarity_negation'
  | 'word_order';

export interface L1PitfallPattern {
  id: string;
  name: string;
  type: InterferenceType;
  japanesePattern: string[];
  indonesianInterference: string;
  linguisticExplanation: string;
  incorrectExample: {
    sentence: string;
    meaning: string;
    flaw: string;
  };
  correctExample: {
    sentence: string;
    meaning: string;
    reason: string;
  };
  senseiGuidance: string;
}

export const L1_INTERFERENCE_PATTERNS: Record<string, L1PitfallPattern> = {
  // 1. Ketiadaan Kala Morfologis (Tense) di Bahasa Indonesia
  absence_of_tense: {
    id: 'absence_of_tense',
    name: 'Ketiadaan Kala Morfologis (Lupa Konjugasi Lampau/Sedang)',
    type: 'tense_aspect',
    japanesePattern: ['た形', 'ている', 'ます', 'ました'],
    indonesianInterference:
      'Bahasa Indonesia tidak mengenal konjugasi kata kerja untuk waktu. Kata "makan" tetap "makan" baik kemarin, sekarang, maupun besok (cukup ditambah kata "kemarin" atau "sedang").',
    linguisticExplanation:
      'Pembelajar Indonesia kerap hanya menempelkan keterangan waktu lalu memakai bentuk kamus, lupa bahwa verba bahasa Jepang WAJIB dikonjugasikan ke bentuk -ta untuk lampau atau -te iru untuk aspek progresif/duratif.',
    incorrectExample: {
      sentence: '昨日、私はラーメンを食べる。',
      meaning: 'Kemarin saya makan ramen.',
      flaw: 'Menggunakan kata dasar "taberu" padahal ada penanda waktu lampau "kinou".',
    },
    correctExample: {
      sentence: '昨日、私はラーメンを食べた (食べました)。',
      meaning: 'Kemarin saya makan ramen.',
      reason: 'Kata kerja wajib berubah menjadi bentuk lampau (tabeta / tabemashita).',
    },
    senseiGuidance:
      'Ingat rumus emas: Di Jepang, waktu menempel pada kata kerja! Setiap ada kata kemarin/tadi, ubah kata kerja ke bentuk -ta atau -mashita.',
  },

  // 2. Pasif Netral Indonesia vs Pasif Penderitaan (Meiwaku Ukemi)
  passive_adversative: {
    id: 'passive_adversative',
    name: 'Pasif Netral "di-" vs Pasif Penderitaan (Meiwaku Ukemi)',
    type: 'voice_passive',
    japanesePattern: ['られる', '受身', '〜に〜られる'],
    indonesianInterference:
      'Awalan "di-" dalam bahasa Indonesia bersifat netral/objektif ("nasi dimakan", "pintu dibuka"). Pembelajar mengira pasif Jepang hanya mengubah fokus subjek-objek.',
    linguisticExplanation:
      'Dalam bahasa Jepang, bentuk pasif intransitif (meiwaku ukemi) membawa muatan emosional kuat: subjek merasa direpotkan, dirugikan, atau menderita akibat tindakan pihak lain.',
    incorrectExample: {
      sentence: '雨が私を降りました。 (Menerjemahkan harfiah "Hujan menurunkan saya")',
      meaning: 'Saya kehujanan.',
      flaw: 'Susunan gramatikal tidak wajar dan tidak menangkap nuansa penderitaan akibat hujan.',
    },
    correctExample: {
      sentence: '私は雨に降られました (Ame ni furaremashita)。',
      meaning: 'Saya kehujanan (dan basah kuyup/repot sekali).',
      reason: 'Bentuk meiwaku ukemi (subjek + ni + kata kerja pasif) menyatakan ketidaknyamanan subjek.',
    },
    senseiGuidance:
      'Bila kamu merasa sial atau terganggu karena perbuatan orang/alam (misal: tetangga berisik, kehujanan, kaki terinjak), gunakan pasif bentuk -rareru dengan pelaku ditandai partikel "ni".',
  },

  // 3. Kebingungan Partikel Wa vs Ga (Topik vs Subjek Gramatikal)
  topic_vs_subject: {
    id: 'topic_vs_subject',
    name: 'Topik Kalimat (Wa) vs Pelaku Spesifik (Ga)',
    type: 'topic_subject',
    japanesePattern: ['は', 'が'],
    indonesianInterference:
      'Bahasa Indonesia hanya mengandalkan urutan kata S-P-O dan intonasi penekanan, sehingga sulit membedakan antara penanda tema pembicaraan (wa) dan fokus pelaku gramatikal (ga).',
    linguisticExplanation:
      'Partikel "wa" menandai latar belakang tema yang sudah sama-sama diketahui (fokus informasi ada SETELAH wa). Partikel "ga" menandai informasi baru atau pelaku spesifik (fokus informasi ada SEBELUM ga).',
    incorrectExample: {
      sentence: '誰は来ましたか？ (Dare wa kimashita ka?)',
      meaning: 'Siapa yang datang?',
      flaw: 'Kata tanya "siapa" adalah informasi baru yang dicari, tidak boleh memakai penanda topik "wa".',
    },
    correctExample: {
      sentence: '誰が来ましたか？ (Dare ga kimashita ka?) / 田中さんが来ました (Tanaka-san ga kimashita)。',
      meaning: 'Siapa yang datang? / Pak Tanaka YANG datang.',
      reason: 'Kata tanya dan jawabannya selalu menggunakan partikel "ga" karena menandai informasi baru.',
    },
    senseiGuidance:
      'Trik mudah: Kata tanya (dare, nani, doko) pantang memakai "wa"! Gunakan "ga" bila ingin menunjuk "orang itulah yang...".',
  },

  // 4. Asimetri Arah Memberi & Menerima (Ageru, Kureru, Morau)
  giving_receiving_viewpoint: {
    id: 'giving_receiving_viewpoint',
    name: 'Arah Memberi Berdasarkan Sudut Pandang (Ageru vs Kureru vs Morau)',
    type: 'giving_receiving',
    japanesePattern: ['あげる', 'くれる', 'もらう', '〜てあげる', '〜てくれる', '〜てもらう'],
    indonesianInterference:
      'Bahasa Indonesia hanya punya satu kata "memberi" untuk semua arah ("saya memberi dia", "dia memberi saya").',
    linguisticExplanation:
      'Bahasa Jepang mewajibkan penutur menyelaraskan sudut pandang (in-group vs out-group). Bila orang lain memberi KE ARAH saya/lingkaran saya, WAJIB menggunakan "kureru", bukan "ageru".',
    incorrectExample: {
      sentence: '田中さんは私にプレゼントをあげました。',
      meaning: 'Pak Tanaka memberi saya hadiah.',
      flaw: 'Menggunakan "ageru" untuk tindakan yang mengarah ke diri sendiri (saya).',
    },
    correctExample: {
      sentence: '田中さんは私にプレゼントをくれました (atau 私は田中さんにプレゼントをもらいました)。',
      meaning: 'Pak Tanaka berbaik hati memberi saya hadiah (atau saya menerima dari Pak Tanaka).',
      reason: 'Tindakan orang lain memberi kepada saya wajib menggunakan "kureru" atau sudut pandang penerima "morau".',
    },
    senseiGuidance:
      'Arah panah hadiah: Ageru = Menjauh dari saya (Saya $\\rightarrow$ Orang). Kureru = Menuju ke saya (Orang $\\rightarrow$ Saya). Morau = Saya yang menerima!',
  },

  // 5. Pemisahan Kata Keberadaan "Ada" (Aru vs Iru)
  existence_animate: {
    id: 'existence_animate',
    name: 'Pembedaan Kata "Ada" untuk Benda Mati (Aru) vs Makhluk Hidup (Iru)',
    type: 'existence_animate',
    japanesePattern: ['ある', 'いる', 'あります', 'います'],
    indonesianInterference:
      'Bahasa Indonesia menggunakan kata "ada" untuk segala hal tanpa membedakan apakah itu meja, kucing, atau manusia.',
    linguisticExplanation:
      'Bahasa Jepang secara ketat memisahkan eksistensi: "aru / arimasu" eksklusif untuk benda mati, tanaman, dan konsep abstrak. "iru / imasu" untuk manusia, hewan, dan entitas yang bergerak atas kemauan sendiri.',
    incorrectExample: {
      sentence: '机の上に猫があります。',
      meaning: 'Di atas meja ada kucing.',
      flaw: 'Menggunakan "arimasu" untuk kucing (hewan bernyawa).',
    },
    correctExample: {
      sentence: '机の上に猫がいます。',
      meaning: 'Di atas meja ada kucing.',
      reason: 'Kucing adalah makhluk hidup yang bergerak sendiri, wajib menggunakan "imasu".',
    },
    senseiGuidance:
      'Tips praktis: Kalau objeknya punya jantung yang berdetak dan bisa jalan sendiri, gunakan "iru/imasu"! Benda diam dan tumbuhan pakai "aru/arimasu".',
  },

  // 6. Penanda Arah & Tujuan Akhir (He vs Ni)
  directional_particles: {
    id: 'directional_particles',
    name: 'Partikel Arah Perjalanan (He) vs Titik Tiba / Sasaran (Ni)',
    type: 'directional_particles',
    japanesePattern: ['へ', 'に'],
    indonesianInterference:
      'Bahasa Indonesia memakai kata depan "ke" untuk kedua situasi ("pergi ke Tokyo", "tiba di/ke stasiun").',
    linguisticExplanation:
      'Partikel "へ (e)" menekankan orientasi atau vektor arah pergerakan perjalanan ("menuju ke arah..."). Partikel "に (ni)" menekankan titik akhir kontak fisik atau tujuan definitif saat sampai.',
    incorrectExample: {
      sentence: '友達へ会います。',
      meaning: 'Bertemu ke teman.',
      flaw: 'Menemui orang adalah kontak sasaran langsung, bukan sekadar arah vektor gerak fisik.',
    },
    correctExample: {
      sentence: '友達に会います (Tomodachi ni aimasu) / 日本へ行きます (Nihon e ikimasu)。',
      meaning: 'Bertemu dengan teman / Pergi menuju Jepang.',
      reason: 'Sasaran bertemu orang selalu menggunakan partikel "ni".',
    },
    senseiGuidance:
      'Ingat: Bertemu orang (Au), naik kendaraan (Noru), masuk ruangan (Hairu) selalu memakai "Ni", bukan "He" atau "Wo".',
  },

  // 7. Kausatif-Pasif (Keterpaksaan Morfologis)
  coercion_causative: {
    id: 'coercion_causative',
    name: 'Rasa Keterpaksaan Morfologis (Kausatif-Pasif: -saserareru)',
    type: 'coercion_causative',
    japanesePattern: ['させられる', 'される', '使役受身'],
    indonesianInterference:
      'Bahasa Indonesia mengekspresikan paksaan dengan menambahkan kata keterangan terpisah ("terpaksa", "disuruh padahal malas").',
    linguisticExplanation:
      'Bahasa Jepang menggabungkan sufiks kausatif (suruh) dan sufiks pasif (kena) menjadi satu bentuk morfologis (-saserareru / -sareru) untuk mengekspresikan rasa enggan dan keterpaksaan.',
    incorrectExample: {
      sentence: '私は嫌だけど無理にお酒を飲んだ。',
      meaning: 'Saya tidak suka tapi memaksakan minum sake.',
      flaw: 'Kalimat terkesan bertele-tele dan kurang alami dalam percakapan sehari-hari bahasa Jepang.',
    },
    correctExample: {
      sentence: '先輩にお酒を飲まされた (飲ませられた)。',
      meaning: 'Saya dipaksa (tidak berdaya menolak) minum sake oleh senior.',
      reason: 'Bentuk kausatif-pasif secara elegan dan padat mengekspresikan ketidakrelaan subjek.',
    },
    senseiGuidance:
      'Kausatif-pasif adalah rumus curhat khas Jepang! Gunakan saat kamu ingin bilang "Saya terpaksa disuruh bos/senior melakukan X".',
  },

  // 8. Jawaban Pertanyaan Negatif (Logika Persetujuan Hai vs Iie)
  polarity_negation: {
    id: 'polarity_negation',
    name: 'Logika Menjawab Pertanyaan Negatif (Hai = Mengiyakan Premis)',
    type: 'polarity_negation',
    japanesePattern: ['〜ないのですか', '〜ませんか', 'はい', 'いいえ'],
    indonesianInterference:
      'Dalam bahasa Indonesia, saat ditanya "Kamu belum makan?", jawaban "Iya" bisa rancu atau diartikan "Iya, saya sudah makan".',
    linguisticExplanation:
      'Dalam bahasa Jepang, "Hai" berarti "Apa yang Anda katakan itu BENAR". Jika ditanya "Asagohan o tabenakatta no?" (Kamu tidak sarapan?), menjawab "Hai" berarti "Benar, saya TIDAK sarapan". Menjawab "Iie" berarti menyangkal pernyataan ("Tidak, saya sudah sarapan").',
    incorrectExample: {
      sentence: 'Q: 昼ご飯を食べないのですか？ (Tidak makan siang?) -> A: いいえ、食べません。 (Maksud penutur: Tidak, saya tidak makan)',
      meaning: 'Tidak, saya tidak makan.',
      flaw: 'Mengatakan "Iie" berkontradiksi dengan kelanjutan kalimat "tabemasen" dalam logika bahasa Jepang.',
    },
    correctExample: {
      sentence: 'Q: 昼ご飯を食べないのですか？ -> A: はい、食べません (Iya, benar saya tidak makan) / いいえ、食べます (Bukan, saya mau makan kok)。',
      meaning: 'Iya, benar saya belum makan.',
      reason: 'Hai menyetujui pernyataan lawan bicara; Iie menyangkal premis kalimat negatif.',
    },
    senseiGuidance:
      'Pikirkan kata "Hai" sebagai "Betul seperti tebakanmu!". Kalau ditebak belum makan dan memang belum, katakan "Hai"!.',
  },
};

/**
 * Mengambil detail pola interferensi L1 berdasarkan ID.
 */
export function getInterferencePattern(id: string): L1PitfallPattern | undefined {
  return L1_INTERFERENCE_PATTERNS[id];
}

/**
 * Mengambil semua pola interferensi L1 yang terdaftar.
 */
export function getAllInterferencePatterns(): L1PitfallPattern[] {
  return Object.values(L1_INTERFERENCE_PATTERNS);
}

/**
 * Mendeteksi apakah suatu pola tata bahasa atau teks rentan terhadap jebakan interferensi L1 tertentu.
 */
export function detectPotentialInterference(grammarText: string): L1PitfallPattern[] {
  if (!grammarText) return [];
  const matches: L1PitfallPattern[] = [];

  for (const pattern of Object.values(L1_INTERFERENCE_PATTERNS)) {
    const isMatched = pattern.japanesePattern.some((p) => grammarText.includes(p));
    if (isMatched) {
      matches.push(pattern);
    }
  }

  return matches;
}
