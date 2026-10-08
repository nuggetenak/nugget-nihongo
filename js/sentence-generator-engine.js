// ══════════════════════════════════════════════════════
//  sentence-generator-engine.js — Nugget Nihongo
//  LMS Sentence Synthesis Engine (Orchestrator)
//  Synthesizes grammatically & sociolinguistically valid
//  Japanese sentences across Vocab, Particles, Conjugation,
//  and Grammar patterns with semantic constraint validation.
//
//  Addresses:
//    - Jidoushi vs Tadoushi (Transitive vs Intransitive)
//    - Animate vs Inanimate subject pairing
//    - Sociolinguistic formality & Keigo (Plain, Masu, Sonkeigo, Kenjougo)
//    - Collocation traps (e.g. 友達に会う, not 友達を会う)
// ══════════════════════════════════════════════════════

(function (root, factory) {
  var exp = factory(root);
  if (typeof module === 'object' && module.exports) {
    module.exports = exp;
  }
  if (root) {
    root.SentenceGeneratorEngine = exp;
  }
})(typeof globalThis !== 'undefined' ? globalThis : (typeof window !== 'undefined' ? window : this), function (root) {
  'use strict';
  root = root || (typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : this));

  // ──────────────────────────────────────────────
  // §1 SEMANTIC KNOWLEDGE BASE (Linguistic Constraints)
  // ──────────────────────────────────────────────

  var LEXICON = {
    subjects: {
      first_person: [
        { jp: 'わたし', ro: 'watashi', id: 'saya', formality: 'polite', animacy: 'human' },
        { jp: 'ぼく', ro: 'boku', id: 'aku', formality: 'casual', animacy: 'human' },
        { jp: 'わたくし', ro: 'watakushi', id: 'saya (formal)', formality: 'formal', animacy: 'human' }
      ],
      second_person: [
        { jp: 'あなた', ro: 'anata', id: 'anda', formality: 'neutral', animacy: 'human' },
        { jp: '田中さん', ro: 'Tanaka-san', id: 'Sdr. Tanaka', formality: 'polite', animacy: 'human' },
        { jp: '先生', ro: 'sensei', id: 'guru', formality: 'polite', animacy: 'human', isSuperior: true },
        { jp: '社長', ro: 'shachou', id: 'presiden direktur', formality: 'formal', animacy: 'human', isSuperior: true }
      ],
      third_person: [
        { jp: '学生', ro: 'gakusei', id: 'mahasiswa', formality: 'neutral', animacy: 'human' },
        { jp: '友達', ro: 'tomodachi', id: 'teman', formality: 'casual', animacy: 'human' },
        { jp: '子供', ro: 'kodomo', id: 'anak', formality: 'neutral', animacy: 'human' },
        { jp: '猫', ro: 'neko', id: 'kucing', formality: 'neutral', animacy: 'animal' },
        { jp: '犬', ro: 'inu', id: 'anjing', formality: 'neutral', animacy: 'animal' }
      ],
      inanimate: [
        { jp: 'ドア', ro: 'doa', id: 'pintu', category: 'aperture' },
        { jp: '窓', ro: 'mado', id: 'jendela', category: 'aperture' },
        { jp: '雨', ro: 'ame', id: 'hujan', category: 'weather' },
        { jp: '雪', ro: 'yuki', id: 'salju', category: 'weather' },
        { jp: '花', ro: 'hana', id: 'bunga', category: 'plant' }
      ]
    },

    objects: {
      food: [
        { jp: 'ご飯', ro: 'gohan', id: 'nasi/makanan' },
        { jp: 'パン', ro: 'pan', id: 'roti' },
        { jp: 'リンゴ', ro: 'ringo', id: 'apel' },
        { jp: 'ラーメン', ro: 'raamen', id: 'ramen' }
      ],
      drink: [
        { jp: '水', ro: 'mizu', id: 'air' },
        { jp: 'お茶', ro: 'ocha', id: 'teh hijau' },
        { jp: 'コーヒー', ro: 'koohii', id: 'kopi' }
      ],
      reading: [
        { jp: '本', ro: 'hon', id: 'buku' },
        { jp: '新聞', ro: 'shinbun', id: 'koran' },
        { jp: '手紙', ro: 'tegami', id: 'surat' }
      ],
      visual: [
        { jp: '映画', ro: 'eiga', id: 'film' },
        { jp: '写真', ro: 'shashin', id: 'foto' },
        { jp: 'アニメ', ro: 'anime', id: 'anime' }
      ],
      audio: [
        { jp: '音楽', ro: 'ongaku', id: 'musik' },
        { jp: 'ラジオ', ro: 'rajio', id: 'radio' },
        { jp: 'ニュース', ro: 'nyuusu', id: 'berita' }
      ],
      purchasable: [
        { jp: '車', ro: 'kuruma', id: 'mobil' },
        { jp: '時計', ro: 'tokei', id: 'jam tangan' },
        { jp: '靴', ro: 'kutsu', id: 'sepatu' }
      ],
      aperture: [
        { jp: 'ドア', ro: 'doa', id: 'pintu' },
        { jp: '窓', ro: 'mado', id: 'jendela' }
      ]
    },

    locations: {
      action: [
        { jp: '図書館', ro: 'toshokan', id: 'perpustakaan' },
        { jp: '学校', ro: 'gakkou', id: 'sekolah' },
        { jp: '部屋', ro: 'heya', id: 'kamar' },
        { jp: 'カフェ', ro: 'kafe', id: 'kafe' },
        { jp: 'レストラン', ro: 'resutoran', id: 'restoran' }
      ],
      destination: [
        { jp: '日本', ro: 'Nihon', id: 'Jepang' },
        { jp: '東京', ro: 'Toukyou', id: 'Tokyo' },
        { jp: '駅', ro: 'eki', id: 'stasiun' },
        { jp: '病院', ro: 'byouin', id: 'rumah sakit' },
        { jp: '公園', ro: 'kouen', id: 'taman' }
      ]
    },

    times: {
      specific: [
        { jp: '7時に', ro: 'shichiji ni', id: 'pada jam 7' },
        { jp: '日曜日に', ro: 'nichiyoubi ni', id: 'pada hari Minggu' },
        { jp: '来週に', ro: 'raishuu ni', id: 'pada minggu depan' }
      ],
      relative: [
        { jp: 'きょう', ro: 'kyou', id: 'hari ini' },
        { jp: 'あした', ro: 'ashita', id: 'besok' },
        { jp: 'きのう', ro: 'kinou', id: 'kemarin' },
        { jp: 'まいちに', ro: 'mainichi', id: 'setiap hari' },
        { jp: 'いま', ro: 'ima', id: 'sekarang' }
      ]
    },

    verbs: [
      // ── Transitive (Tadoushi) ──
      {
        dict: '食べる', reading: 'たべる', type: 'ichidan', transitivity: 'transitive',
        objectCategory: 'food', defaultParticle: 'を',
        meaning: 'makan',
        keigo: { sonkeigo: '召し上がる', kenjougo: 'いただく' }
      },
      {
        dict: '飲む', reading: 'のむ', type: 'godan', transitivity: 'transitive',
        objectCategory: 'drink', defaultParticle: 'を',
        meaning: 'minum',
        keigo: { sonkeigo: '召し上がる', kenjougo: 'いただく' }
      },
      {
        dict: '読む', reading: 'よむ', type: 'godan', transitivity: 'transitive',
        objectCategory: 'reading', defaultParticle: 'を',
        meaning: 'membaca',
        keigo: { sonkeigo: 'お読みになる', kenjougo: '拝読する' }
      },
      {
        dict: '書く', reading: 'かく', type: 'godan', transitivity: 'transitive',
        objectCategory: 'reading', defaultParticle: 'を',
        meaning: 'menulis',
        keigo: { sonkeigo: 'お書きになる', kenjougo: 'お書きする' }
      },
      {
        dict: '見る', reading: 'みる', type: 'ichidan', transitivity: 'transitive',
        objectCategory: 'visual', defaultParticle: 'を',
        meaning: 'melihat/menonton',
        keigo: { sonkeigo: 'ご覧になる', kenjougo: '拝見する' }
      },
      {
        dict: '聞く', reading: 'きく', type: 'godan', transitivity: 'transitive',
        objectCategory: 'audio', defaultParticle: 'を',
        meaning: 'mendengarkan',
        keigo: { sonkeigo: 'お聞きになる', kenjougo: '伺う' }
      },
      {
        dict: '買う', reading: 'かう', type: 'godan', transitivity: 'transitive',
        objectCategory: 'purchasable', defaultParticle: 'を',
        meaning: 'membeli',
        keigo: { sonkeigo: 'お買いになる', kenjougo: 'お買いする' }
      },
      {
        dict: '開ける', reading: 'あける', type: 'ichidan', transitivity: 'transitive',
        objectCategory: 'aperture', defaultParticle: 'を',
        meaning: 'membuka (transitif)'
      },
      {
        dict: '閉める', reading: 'しめる', type: 'ichidan', transitivity: 'transitive',
        objectCategory: 'aperture', defaultParticle: 'を',
        meaning: 'menutup (transitif)'
      },

      // ── Intransitive (Jidoushi) ──
      {
        dict: '開く', reading: 'あく', type: 'godan', transitivity: 'intransitive',
        subjectCategory: 'aperture', defaultParticle: 'が',
        meaning: 'terbuka (intransitif)'
      },
      {
        dict: '閉まる', reading: 'しまる', type: 'godan', transitivity: 'intransitive',
        subjectCategory: 'aperture', defaultParticle: 'が',
        meaning: 'tertutup (intransitif)'
      },
      {
        dict: '降る', reading: 'ふる', type: 'godan', transitivity: 'intransitive',
        subjectCategory: 'weather', defaultParticle: 'が',
        meaning: 'turun (hujan/salju)'
      },
      {
        dict: '咲く', reading: 'さく', type: 'godan', transitivity: 'intransitive',
        subjectCategory: 'plant', defaultParticle: 'が',
        meaning: 'mekar'
      },
      {
        dict: '行く', reading: 'いく', type: 'godan', transitivity: 'intransitive',
        destinationOnly: true, defaultParticle: 'に',
        meaning: 'pergi',
        keigo: { sonkeigo: 'いらっしゃる', kenjougo: '参る' }
      },
      {
        dict: '来る', reading: 'くる', type: 'kuru', transitivity: 'intransitive',
        destinationOnly: true, defaultParticle: 'に',
        meaning: 'datang',
        keigo: { sonkeigo: 'いらっしゃる', kenjougo: '参る' }
      },
      {
        dict: '帰る', reading: 'かえる', type: 'godan', transitivity: 'intransitive',
        destinationOnly: true, defaultParticle: 'に',
        meaning: 'pulang'
      },

      // ── Collocation Traps (Person Target) ──
      {
        dict: '会う', reading: 'あう', type: 'godan', transitivity: 'intransitive',
        requiresPersonTarget: true, defaultParticle: 'に',
        meaning: 'bertemu'
      }
    ]
  };

  // ──────────────────────────────────────────────
  // §2 GRAMMAR PATTERN SYNTHESIZERS
  // ──────────────────────────────────────────────

  var PATTERN_BUILDERS = {
    // 1. Te-iru (Sedang / Status berkelanjutan)
    te_iru: {
      name: '〜ている',
      build: function (verbObj, politeness) {
        var te = _conjugate(verbObj.dict, 'te', verbObj);
        if (politeness === 'plain') return { jp: te + 'いる', id: 'sedang ' + verbObj.meaning };
        return { jp: te + 'います', id: 'sedang ' + verbObj.meaning };
      }
    },

    // 2. Te-kudasai (Permohonan sopan)
    te_kudasai: {
      name: '〜てください',
      build: function (verbObj, politeness) {
        var te = _conjugate(verbObj.dict, 'te', verbObj);
        return { jp: te + 'ください', id: 'tolong ' + verbObj.meaning };
      }
    },

    // 3. Te-wa-ikemasen (Larangan)
    te_wa_ikemasen: {
      name: '〜てはいけません',
      build: function (verbObj, politeness) {
        var te = _conjugate(verbObj.dict, 'te', verbObj);
        if (politeness === 'plain') return { jp: te + 'はだめだ', id: 'tidak boleh ' + verbObj.meaning };
        return { jp: te + 'はいけません', id: 'tidak boleh ' + verbObj.meaning };
      }
    },

    // 4. Nakereba naranai (Keharusan)
    nakereba_naranai: {
      name: '〜なければならない',
      build: function (verbObj, politeness) {
        var nai = _conjugate(verbObj.dict, 'nai', verbObj);
        var stem = nai.slice(0, -1); // strips 'い' from '〜ない'
        if (politeness === 'plain') return { jp: stem + 'ければならない', id: 'harus ' + verbObj.meaning };
        return { jp: stem + 'ければなりません', id: 'harus ' + verbObj.meaning };
      }
    },

    // 5. Te-mo-ii (Izin)
    te_mo_ii: {
      name: '〜てもいい',
      build: function (verbObj, politeness) {
        var te = _conjugate(verbObj.dict, 'te', verbObj);
        if (politeness === 'plain') return { jp: te + 'もいい', id: 'boleh ' + verbObj.meaning };
        return { jp: te + 'もいいです', id: 'boleh ' + verbObj.meaning };
      }
    },

    // 6. Tai (Keinginan)
    tai: {
      name: '〜たい',
      build: function (verbObj, politeness) {
        var tai = _conjugate(verbObj.dict, 'tai', verbObj);
        if (politeness === 'plain') return { jp: tai, id: 'ingin ' + verbObj.meaning };
        return { jp: tai + 'です', id: 'ingin ' + verbObj.meaning };
      }
    },

    // 7. Ta-koto-ga-aru (Pengalaman lampau)
    ta_koto_ga_aru: {
      name: '〜たことがある',
      build: function (verbObj, politeness) {
        var ta = _conjugate(verbObj.dict, 'ta', verbObj);
        if (politeness === 'plain') return { jp: ta + 'ことがある', id: 'pernah ' + verbObj.meaning };
        return { jp: ta + 'ことがあります', id: 'pernah ' + verbObj.meaning };
      }
    },

    // 8. Potential (Kemampuan)
    potential: {
      name: '可能形',
      build: function (verbObj, politeness) {
        var pot = _conjugate(verbObj.dict, 'potential', verbObj);
        if (politeness === 'plain') return { jp: pot, id: 'bisa ' + verbObj.meaning, changesObjParticleToGa: true };
        var potMasu = _conjugate(pot, 'masu', { type: 'ichidan' });
        return { jp: potMasu, id: 'bisa ' + verbObj.meaning, changesObjParticleToGa: true };
      }
    },

    // 9. Standard Conjugation (Non-past affirmative)
    standard: {
      name: '標準',
      build: function (verbObj, politeness) {
        if (politeness === 'plain') return { jp: verbObj.dict, id: verbObj.meaning };
        var masu = _conjugate(verbObj.dict, 'masu', verbObj);
        return { jp: masu, id: verbObj.meaning };
      }
    }
  };

  // Helper conjugation delegator
  function _conjugate(word, formKey, verbObj) {
    var opts = {
      type: verbObj ? verbObj.type : undefined,
      reading: verbObj ? verbObj.reading : undefined
    };
    if (root.ConjugationEngine && typeof root.ConjugationEngine.conjugate === 'function') {
      return root.ConjugationEngine.conjugate(word, formKey, opts);
    }
    if (typeof root.conjugateVerb === 'function') {
      return root.conjugateVerb(word, formKey, opts);
    }
    return word;
  }

  function _randomPick(arr) {
    if (!arr || arr.length === 0) return null;
    return arr[Math.floor(Math.random() * arr.length)];
  }

  // ──────────────────────────────────────────────
  // §3 SYNTHESIS ENGINE (The Orchestrator)
  // ──────────────────────────────────────────────

  /**
   * Synthesizes a grammatically and sociolinguistically valid Japanese sentence.
   * @param {object} [options]
   * @param {string} [options.pattern] - 'te_iru', 'te_kudasai', 'nakereba_naranai', etc.
   * @param {string} [options.verb] - Specific verb dictionary form (optional)
   * @param {string} [options.politeness] - 'polite' (default) | 'plain' | 'sonkeigo' | 'kenjougo'
   * @param {boolean} [options.includeTime] - Whether to prepend a time element
   * @param {boolean} [options.includeLocation] - Whether to prepend a location element
   * @returns {object} Full sentence payload with semantics, tokens, and metadata
   */
  function synthesize(options) {
    options = options || {};
    var politeness = options.politeness || 'polite';
    var patternKey = options.pattern || 'standard';
    var patternBuilder = PATTERN_BUILDERS[patternKey] || PATTERN_BUILDERS.standard;

    // 1. Select Verb
    var verbObj = null;
    if (options.verb) {
      verbObj = LEXICON.verbs.find(function (v) { return v.dict === options.verb; });
    }
    if (!verbObj) {
      verbObj = _randomPick(LEXICON.verbs);
    }

    // 2. Handle Keigo (Sonkeigo / Kenjougo) overrides if requested
    var finalVerbPayload = null;
    var isKeigoApplied = false;

    if (politeness === 'sonkeigo' && verbObj.keigo && verbObj.keigo.sonkeigo) {
      var sonkVerb = verbObj.keigo.sonkeigo;
      var sonkMasu = _conjugate(sonkVerb, 'masu', { type: 'godan' });
      finalVerbPayload = { jp: sonkMasu, id: verbObj.meaning + ' (hormat/Sonkeigo)' };
      isKeigoApplied = true;
    } else if (politeness === 'kenjougo' && verbObj.keigo && verbObj.keigo.kenjougo) {
      var kenjVerb = verbObj.keigo.kenjougo;
      var kenjMasu = _conjugate(kenjVerb, 'masu', { type: 'godan' });
      finalVerbPayload = { jp: kenjMasu, id: verbObj.meaning + ' (merendah/Kenjougo)' };
      isKeigoApplied = true;
    } else {
      finalVerbPayload = patternBuilder.build(verbObj, politeness);
    }

    // 3. Select Subject adhering to constraints
    var subjectObj = null;
    var subjectParticle = 'は';

    if (verbObj.transitivity === 'intransitive') {
      if (verbObj.subjectCategory === 'aperture') {
        subjectObj = _randomPick(LEXICON.subjects.inanimate.filter(function (s) { return s.category === 'aperture'; }));
        subjectParticle = 'が';
      } else if (verbObj.subjectCategory === 'weather') {
        subjectObj = _randomPick(LEXICON.subjects.inanimate.filter(function (s) { return s.category === 'weather'; }));
        subjectParticle = 'が';
      } else if (verbObj.subjectCategory === 'plant') {
        subjectObj = _randomPick(LEXICON.subjects.inanimate.filter(function (s) { return s.category === 'plant'; }));
        subjectParticle = 'が';
      } else {
        // Destination verbs (iku, kuru, kaeru)
        subjectObj = _randomPick(LEXICON.subjects.first_person.concat(LEXICON.subjects.third_person));
        subjectParticle = 'は';
      }
    } else {
      // Transitive verbs
      if (politeness === 'sonkeigo') {
        subjectObj = _randomPick(LEXICON.subjects.second_person.filter(function (s) { return s.isSuperior; }));
      } else if (politeness === 'kenjougo') {
        subjectObj = _randomPick(LEXICON.subjects.first_person);
      } else {
        subjectObj = _randomPick(LEXICON.subjects.first_person.concat(LEXICON.subjects.third_person));
      }
      subjectParticle = 'は';
    }

    // 4. Select Object or Destination adhering to Transitivity constraints
    var complementObj = null;
    var complementParticle = '';

    if (verbObj.transitivity === 'transitive') {
      var cat = verbObj.objectCategory;
      var pool = LEXICON.objects[cat] || LEXICON.objects.reading;
      complementObj = _randomPick(pool);
      // In potential form, direct object particle 'を' changes to 'が'
      complementParticle = finalVerbPayload.changesObjParticleToGa ? 'が' : (verbObj.defaultParticle || 'を');
    } else if (verbObj.destinationOnly) {
      complementObj = _randomPick(LEXICON.locations.destination);
      complementParticle = 'へ';
    } else if (verbObj.requiresPersonTarget) {
      complementObj = _randomPick(LEXICON.subjects.third_person.filter(function (s) { return s.animacy === 'human'; }));
      complementParticle = 'に'; // Collocation trap: 友達に会う!
    }

    // 5. Optional Time & Action Location components
    var timeObj = options.includeTime ? _randomPick(LEXICON.times.relative.concat(LEXICON.times.specific)) : null;
    var locObj = (options.includeLocation && verbObj.transitivity === 'transitive')
      ? _randomPick(LEXICON.locations.action)
      : null;

    // 6. Assemble Sentence Parts
    var partsJp = [];
    var partsId = [];

    if (timeObj) {
      partsJp.push(timeObj.jp);
      partsId.push(timeObj.id);
    }

    // For natural Japanese, inanimate natural subjects (e.g. 雨が降る) omit topic
    if (subjectObj && verbObj.subjectCategory !== 'weather') {
      partsJp.push(subjectObj.jp + subjectParticle);
      partsId.push(subjectObj.id);
    } else if (subjectObj && verbObj.subjectCategory === 'weather') {
      partsJp.push(subjectObj.jp + subjectParticle);
    }

    if (locObj) {
      partsJp.push(locObj.jp + 'で');
      partsId.push('di ' + locObj.id);
    }

    if (complementObj) {
      partsJp.push(complementObj.jp + complementParticle);
      partsId.push(complementObj.id);
    }

    partsJp.push(finalVerbPayload.jp + '。');
    partsId.push(finalVerbPayload.id + '.');

    var sentenceJp = partsJp.join('');
    var sentenceId = partsId.join(' ');

    // 7. Tokenize through LexiconEngine to guarantee interactive validity
    var tokens = [];
    if (root.LexiconEngine && typeof root.LexiconEngine.segment === 'function') {
      tokens = root.LexiconEngine.segment(sentenceJp);
    }

    return {
      japanese: sentenceJp,
      indonesian: sentenceId,
      pattern: patternKey,
      pattern_label: patternBuilder.name,
      politeness: politeness,
      verb: {
        dict: verbObj.dict,
        reading: verbObj.reading,
        transitivity: verbObj.transitivity,
        conjugated: finalVerbPayload.jp
      },
      tokens: tokens,
      atoms: {
        subject: subjectObj ? subjectObj.jp : null,
        verb: verbObj.dict,
        complement: complementObj ? complementObj.jp : null,
        particles: [subjectParticle, complementParticle].filter(Boolean)
      }
    };
  }

  // ──────────────────────────────────────────────
  // §4 SELF-TEST & VERIFICATION SUITE
  // ──────────────────────────────────────────────

  function selfTest() {
    var tests = [
      {
        name: 'Transitive verb (食べる) generates object with を',
        run: function () {
          var res = synthesize({ verb: '食べる', politeness: 'polite' });
          return res.japanese.includes('を') && res.japanese.includes('食べ');
        }
      },
      {
        name: 'Intransitive weather verb (降る) avoids object を and uses が',
        run: function () {
          var res = synthesize({ verb: '降る', politeness: 'polite' });
          return !res.japanese.includes('を') && (res.japanese.includes('雨が') || res.japanese.includes('雪が'));
        }
      },
      {
        name: 'Collocation trap (会う) pairs with に not を',
        run: function () {
          var res = synthesize({ verb: '会う', politeness: 'polite' });
          return res.japanese.includes('に会') && !res.japanese.includes('を会');
        }
      },
      {
        name: 'Sonkeigo formality applies honorific verb (召し上がる)',
        run: function () {
          var res = synthesize({ verb: '食べる', politeness: 'sonkeigo' });
          return res.japanese.includes('召し上が');
        }
      },
      {
        name: 'Potential pattern changes object particle to が',
        run: function () {
          var res = synthesize({ verb: '飲む', pattern: 'potential', politeness: 'polite' });
          return res.japanese.includes('が飲め');
        }
      }
    ];

    return tests.map(function (t) {
      var pass = false;
      try {
        pass = t.run();
      } catch (e) {
        pass = false;
      }
      return { name: t.name, pass: pass };
    });
  }

  return {
    synthesize: synthesize,
    selfTest: selfTest,
    LEXICON: LEXICON,
    PATTERN_BUILDERS: PATTERN_BUILDERS
  };
});
