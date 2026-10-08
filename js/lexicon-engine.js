// ══════════════════════════════════════════════════════════════════
//  lexicon-engine.js — Nugget Nihongo Interactive SLA Lexicon Engine
//  v1.0.0 — Unified Dictionary, De-conjugation, Grammar-Particle Bridge,
//  Interactive Sentence Tokenizer & SLA Popover/Peek-Sheet Component
// ══════════════════════════════════════════════════════════════════

(function () {
  'use strict';

  var root = typeof window !== 'undefined' ? window : global;

  // ──────────────────────────────────────────────
  // §1  POS & LEVEL LABELS (Indonesian SLA Friendly)
  // ──────────────────────────────────────────────
  var POS_LABELS = {
    'verb-u'    : 'Kata Kerja (Godan 五段)',
    'verb-ru'   : 'Kata Kerja (Ichidan 一段)',
    'verb-suru' : 'Kata Kerja (する)',
    'verb-kuru' : 'Kata Kerja Ireguler (来る)',
    'verb'      : 'Kata Kerja (動詞)',
    'noun'      : 'Kata Benda (名詞)',
    'i-adj'     : 'Kata Sifat い (形容詞)',
    'na-adj'    : 'Kata Sifat な (形容動詞)',
    'adverb'    : 'Kata Keterangan (副詞)',
    'particle'  : 'Partikel (助詞)',
    'expr'      : 'Ungkapan / Ekspresi',
    'conj'      : 'Kata Sambung (接続詞)',
    'counter'   : 'Kata Bantu Bilangan (助数詞)',
    'pronoun'   : 'Kata Ganti (代名詞)',
    'grammar'   : 'Pola Tata Bahasa (文法)',
    'fukugo'    : 'Partikel Gabungan (複合助詞)'
  };

  // ──────────────────────────────────────────────
  // §2  LEXICON INDEX STORAGE
  // ──────────────────────────────────────────────
  var _initialized = false;
  var _vocabByWord = new Map();       // '食べる' -> [VocabEntry]
  var _vocabByReading = new Map();    // 'たべる' -> [VocabEntry]
  var _vocabById = new Map();         // 'vg-n5-00001' -> VocabEntry
  var _inflectionMap = new Map();     // '食べました' -> { root: '食べる', formKey: 'masu_past', ... }
  var _grammarByPattern = new Map();  // 'について' -> GrammarEntry
  var _sortedGrammarKeys = [];        // ['わけにはいかない', ..., 'について', 'のに', 'ので']
  var _sortedWordKeys = [];           // Sorted descending by length for greedy segmentation

  // Transitive - Intransitive Common Pairs Table
  var TRANS_INTRANS_PAIRS = [
    { trans: '開ける', intrans: '開く', meaning: 'membuka / terbuka' },
    { trans: '閉める', intrans: '閉まる', meaning: 'menutup / tertutup' },
    { trans: 'つける', intrans: 'つく', meaning: 'menyalakan / menyala' },
    { trans: '消す', intrans: '消える', meaning: 'memadamkan / padam' },
    { trans: '止める', intrans: '止まる', meaning: 'menghentikan / berhenti' },
    { trans: '始める', intrans: '始まる', meaning: 'memulai / dimulai' },
    { trans: '落とす', intrans: '落ちる', meaning: 'menjatuhkan / jatuh' },
    { trans: '出す', intrans: '出る', meaning: 'mengeluarkan / keluar' },
    { trans: '壊す', intrans: '壊れる', meaning: 'merusakkan / rusak' },
    { trans: '直す', intrans: '直る', meaning: 'memperbaiki / sembuh-baik' },
    { trans: '入れる', intrans: '入る', meaning: 'memasukkan / masuk' },
    { trans: '起こす', intrans: '起きる', meaning: 'membangunkan / bangun' },
    { trans: '届ける', intrans: '届く', meaning: 'mengirimkan / sampai' },
    { trans: '見つける', intrans: '見つかる', meaning: 'menemukan / ditemukan' },
    { trans: '変える', intrans: '変わる', meaning: 'mengubah / berubah' },
    { trans: '集める', intrans: '集まる', meaning: 'mengumpulkan / berkumpul' }
  ];

  // Common Inflection Derivations Generator (for verbs & adjectives)
  function _buildInflectionsForEntry(entry) {
    if (!entry || !entry.word) return;
    var word = entry.word;
    var reading = entry.reading || '';
    var pos = entry.pos || '';
    var isVerb = pos.startsWith('verb');
    var isIAdj = pos === 'i-adj';

    if (!isVerb && !isIAdj && !entry.conjugations) return;

    var conj = entry.conjugations || {};

    // Helper: registers both Kana form and synthesized Kanji form
    function reg(kanaForm, formKey, formLabel, meaningShift) {
      if (!kanaForm) return;
      var payload = {
        rootWord: word,
        entry: entry,
        formKey: formKey,
        formLabel: formLabel,
        meaningShift: meaningShift
      };

      // 1. Kana surface
      _inflectionMap.set(kanaForm, payload);

      // 2. Kanji surface (if word has kanji)
      if (word !== reading && reading.length >= 1) {
        var okuriganaLen = 1;
        var kanjiStem = word.slice(0, -okuriganaLen);
        var kanaPrefixLen = reading.length - okuriganaLen;
        if (kanaPrefixLen >= 0 && kanaForm.length >= kanaPrefixLen) {
          var kanaSuffix = kanaForm.slice(kanaPrefixLen);
          var kanjiForm = kanjiStem + kanaSuffix;
          _inflectionMap.set(kanjiForm, payload);
        }
      }
    }

    // 1. Masu form & variations
    if (conj.masu) {
      reg(conj.masu, 'masu', 'Sopan Non-Lampau (~ます)', 'Bentuk sopan untuk masa kini / masa depan.');
      reg(conj.masu.replace(/ます$/, 'ました'), 'masu_past', 'Sopan Lampau (~ました)', 'Menyatakan tindakan telah selesai dilakukan secara sopan.');
      reg(conj.masu.replace(/ます$/, 'ません'), 'masu_neg', 'Sopan Negatif (~ません)', 'Menyatakan tidak melakukan tindakan secara sopan.');
      reg(conj.masu.replace(/ます$/, 'ませんでした'), 'masu_neg_past', 'Sopan Negatif Lampau (~ませんでした)', 'Menyatakan dulu tidak melakukan tindakan secara sopan.');
    }

    // 2. Te form
    if (conj.te) {
      reg(conj.te, 'te', 'Bentuk ~て (Sambung / Permohonan)', 'Menyambung klausa ("...dan...") atau dasar pola ~てください / ~ている.');
    }

    // 3. Ta form (Casual Past)
    if (conj.ta) {
      reg(conj.ta, 'ta', 'Bentuk Lampau Kasual (~た)', 'Menyatakan tindakan sudah selesai dalam ragam santai / kasual.');
    }

    // 4. Nai form & variations
    if (conj.nai) {
      reg(conj.nai, 'nai', 'Bentuk Negatif Kasual (~ない)', 'Menyatakan tidak melakukan tindakan dalam ragam santai.');
      reg(conj.nai.replace(/ない$/, 'なかった'), 'nai_past', 'Negatif Lampau Kasual (~なかった)', 'Menyatakan dulu tidak melakukan tindakan dalam ragam santai.');
    }

    // 5. Potential form
    if (conj.potential) {
      reg(conj.potential, 'potential', 'Bentuk Potensial (Bisa / Mampu)', 'Menyatakan kemampuan / kesanggupan. Objek standar bergeser dari を ke が.');
    }

    // 6. Passive form
    if (conj.passive) {
      reg(conj.passive, 'passive', 'Bentuk Pasif (~れる / られる)', 'Tindakan dikenakan pada subjek. Pelaku tindakan ditandai dengan partikel に.');
    }

    // 7. Causative form
    if (conj.causative) {
      reg(conj.causative, 'causative', 'Bentuk Kausatif (Menyuruh / Membiarkan)', 'Subjek menyuruh atau mengizinkan orang lain melakukan tindakan.');
    }

    // 8. Volitional form
    if (conj.volitional) {
      reg(conj.volitional, 'volitional', 'Bentuk Ajakan Kasual (~おう / よう)', 'Ajakan akrab ("Ayo...") atau niat spontan pembicara.');
    }

    // 9. Conditionals
    if (conj.cond_ba) {
      reg(conj.cond_ba, 'cond_ba', 'Bentuk Kondisional (~ば)', 'Syarat umum: "Jika / Seandainya..."');
    }
    if (conj.cond_tara) {
      reg(conj.cond_tara, 'cond_tara', 'Bentuk Kondisional (~たら)', 'Kondisi kronologis: "Kalau / Setelah..."');
    }

    // 10. Desiderative (~たい)
    if (root.ConjugationEngine && typeof root.ConjugationEngine.conjugate === 'function') {
      try {
        var taiForm = root.ConjugationEngine.conjugate(word, 'tai');
        if (taiForm && taiForm !== word) {
          reg(taiForm, 'tai', 'Bentuk Keinginan (~たい)', 'Menyatakan keinginan diri sendiri ("Ingin / Mau...").');
          reg(taiForm.replace(/い$/, 'くない'), 'tai_neg', 'Bentuk Tidak Ingin (~たくない)', 'Menyatakan ketidakinginan diri sendiri ("Tidak ingin...").');
        }
      } catch (e) {
        // ignore synthesis errors
      }
    }
  }

  // ──────────────────────────────────────────────
  // §3  INIT & INDEX COMPILATION
  // ──────────────────────────────────────────────
  function init() {
    if (_initialized) return;

    var vocabList = root.vocabDB || [];
    var grammarList = root.grammarDB || [];

    // 1. Index Vocab
    var wordSet = new Set();
    for (var i = 0; i < vocabList.length; i++) {
      var v = vocabList[i];
      if (!v || !v.word) continue;

      _vocabById.set(v.id, v);

      if (!_vocabByWord.has(v.word)) _vocabByWord.set(v.word, []);
      _vocabByWord.get(v.word).push(v);
      wordSet.add(v.word);

      if (v.reading) {
        if (!_vocabByReading.has(v.reading)) _vocabByReading.set(v.reading, []);
        _vocabByReading.get(v.reading).push(v);
        wordSet.add(v.reading);
      }

      _buildInflectionsForEntry(v);
    }
    _sortedWordKeys = Array.from(wordSet).sort(function (a, b) { return b.length - a.length; });

    // 2. Index Grammar
    var grammarPatterns = [];
    function _registerGrammarKey(pat, gObj) {
      if (!pat || typeof pat !== 'string') return;
      var clean = pat.trim().replace(/^[〜~\s\.\…,\+]+|[〜~\s\.\…,\+]+$/g, '');
      if (clean && clean.length >= 2 && !_grammarByPattern.has(clean)) {
        _grammarByPattern.set(clean, gObj);
        grammarPatterns.push(clean);
      }
    }

    for (var gi = 0; gi < grammarList.length; gi++) {
      var g = grammarList[gi];
      if (!g) continue;
      var rawPat = g.pattern || g.grammar || '';
      if (!rawPat) continue;

      // Handle copula patterns explicitly so copulas are never mis-sliced into single particles
      if (g.id === 'gn5-00001') {
        _registerGrammarKey('です', g);
      } else if (g.id === 'gn5-00002') {
        _registerGrammarKey('じゃありません', g);
        _registerGrammarKey('ではありません', g);
      } else if (g.id === 'gn5-00003') {
        _registerGrammarKey('でした', g);
      } else if (g.id === 'gn5-00004') {
        _registerGrammarKey('じゃありませんでした', g);
        _registerGrammarKey('ではありませんでした', g);
      }

      // Clean leading/trailing symbols (〜, ~, spaces)
      var clean = rawPat.replace(/^[〜~\s]+|[〜~\s]+$/g, '').trim();
      if (clean && clean.length >= 2) {
        _registerGrammarKey(clean, g);
      }

      // Also parse alternatives separated by / or ／ and strip parentheticals & formula markers
      var alts = rawPat.split(/[\/／]/);
      for (var ai = 0; ai < alts.length; ai++) {
        var alt = alts[ai];
        var noParen = alt.replace(/[\(（][^\)）]*[\)）]/g, '');
        var noFormula = noParen.replace(/[A-Za-z\-]+|【[^】]*】/g, '').replace(/\+/g, ' ');
        var subParts = noFormula.split(/[〜~\s]+/);
        for (var spi = 0; spi < subParts.length; spi++) {
          _registerGrammarKey(subParts[spi], g);
        }
      }
    }

    // Also include ParticleEngine compound grammar if available
    if (root.ParticleEngine && root.ParticleEngine.COMPOUND_GRAMMAR) {
      var cgList = root.ParticleEngine.COMPOUND_GRAMMAR;
      for (var ci = 0; ci < cgList.length; ci++) {
        var cg = cgList[ci];
        if (cg && cg.pattern) {
          var cleanCg = cg.pattern.replace(/^[〜~\s]+|[〜~\s]+$/g, '').trim();
          if (cleanCg && !_grammarByPattern.has(cleanCg)) {
            _grammarByPattern.set(cleanCg, {
              id: 'fukugo-' + cleanCg,
              pattern: cleanCg,
              level: cg.jlpt || 'n3',
              meaning: cg.meaning_id || '',
              cat: 'compound-particle',
              explanation: cg.explanation_id || '',
              notes: cg.collocation || '',
              isCompoundParticle: true
            });
            grammarPatterns.push(cleanCg);
          }
        }
      }
    }

    // Sort grammar patterns descending by length for greedy longest-match
    _sortedGrammarKeys = Array.from(new Set(grammarPatterns)).sort(function (a, b) {
      return b.length - a.length;
    });

    _initialized = true;
  }

  // ──────────────────────────────────────────────
  // §4  LOOKUP ENGINE (Unified Morpheme Dispatcher)
  // ──────────────────────────────────────────────

  /**
   * Looks up a surface word, particle, inflection, or grammar pattern.
   * Consolidates overlapping particles and grammar with SLA pedagogy.
   * @param {string} surface
   * @param {string} [contextSentence]
   * @returns {object|null}
   */
  function lookup(surface, contextSentence) {
    if (!surface || typeof surface !== 'string') return null;
    init();

    var clean = surface.trim();

    // ── 1. Check Grammar Patterns & Compound Particles (Greedy Match) ──
    var gMatch = _grammarByPattern.get(clean);
    if (!gMatch) {
      // Try stripping leading 〜 if passed with it
      var stripped = clean.replace(/^[〜~\s]+/, '');
      gMatch = _grammarByPattern.get(stripped);
    }
    if (gMatch) {
      return _formatGrammarPayload(clean, gMatch);
    }

    // ── 2. Check Combined Particles (Kasane-joshi) ──
    if (root.ParticleEngine && typeof root.ParticleEngine.lookup === 'function') {
      var pCombined = root.ParticleEngine.lookup(clean);
      if (pCombined && pCombined.type === 'combined') {
        return _formatCombinedParticlePayload(clean, pCombined);
      }
    }

    // ── 3. Check Single Particles ──
    if (root.ParticleEngine && typeof root.ParticleEngine.lookup === 'function') {
      var pSingle = root.ParticleEngine.lookup(clean);
      if (pSingle && pSingle.type === 'single') {
        return _formatSingleParticlePayload(clean, pSingle, contextSentence);
      }
    }

    // ── 4. Check Inflected Forms (De-conjugation) ──
    var infMatch = _inflectionMap.get(clean);
    if (infMatch) {
      return _formatInflectionPayload(clean, infMatch);
    }

    // ── 5. Check Exact Vocab Base Form (Kanji or Kana) ──
    var vList = _vocabByWord.get(clean) || _vocabByReading.get(clean);
    if (vList && vList.length > 0) {
      return _formatVocabPayload(clean, vList[0]);
    }

    // ── 6. Fallback: Try De-conjugating dynamically via ConjugationEngine ──
    if (root.ConjugationEngine && typeof root.ConjugationEngine.explain === 'function') {
      // If the surface ends in known inflection endings (e.g. 〜ました, 〜ない, 〜た, 〜て)
      var dynamicDeconj = _tryDynamicDeconjugate(clean);
      if (dynamicDeconj) {
        return dynamicDeconj;
      }
    }

    return null;
  }

  function _formatGrammarPayload(surface, g) {
    var isCompound = g.isCompoundParticle || (g.cat === 'compound-particle') || /について|にとって|に対して|によって|として|を通じて|ばかりか|だけに/.test(surface);
    var pRoot = '';
    if (surface.startsWith('に')) pRoot = 'に';
    else if (surface.startsWith('で')) pRoot = 'で';
    else if (surface.startsWith('を')) pRoot = 'を';
    else if (surface.startsWith('と')) pRoot = 'と';
    else if (surface.startsWith('から')) pRoot = 'から';

    var etymology = isCompound && pRoot
      ? `Secara linguistik adalah Partikel Gabungan (複合助詞) yang berakar dari partikel "${pRoot}". Namun di kurikulum JLPT dikelompokkan sebagai Pola Tata Bahasa (${(g.level || 'N3').toUpperCase()} 文法).`
      : '';

    return {
      surface: surface,
      type: isCompound ? 'compound_particle' : 'grammar',
      badgeLevel: (g.level || 'n3').toUpperCase(),
      badgePos: isCompound ? 'Partikel Gabungan (複合助詞)' : 'Pola Tata Bahasa (文法)',
      pattern: g.pattern || g.grammar || surface,
      meaning_id: g.meaning || '',
      explanation: g.explanation || g.notes || '',
      connection: g.formation || g.connection || '',
      etymology: etymology,
      sla_nuance: [
        etymology,
        g.notes ? `💡 Catatan Pemakaian: ${g.notes}` : ''
      ].filter(Boolean).join('\n\n'),
      rawEntry: g
    };
  }

  function _formatCombinedParticlePayload(surface, p) {
    var compStr = (p.components || []).join(' + ');
    var nuance = p.nuance_breakdown || '';
    if (p.colloquial_contraction) {
      nuance += `\n🗣️ Kontraksi Percakapan: ${p.colloquial_contraction}`;
    }
    if (p.stacking_rule) {
      nuance += `\n📐 Aturan Penumpukan: ${p.stacking_rule}`;
    }

    return {
      surface: surface,
      type: 'combined_particle',
      badgeLevel: (p.jlpt || 'n4').toUpperCase(),
      badgePos: 'Partikel Rangkap (重ね助詞)',
      reading: p.romaji || surface,
      romaji: p.romaji || '',
      meaning_id: p.overview_id || '',
      components: p.components || [],
      componentsText: compStr,
      explanation: p.nuance_breakdown || '',
      sla_nuance: nuance,
      rawEntry: p
    };
  }

  function _formatSingleParticlePayload(surface, p, contextSentence) {
    // If contextSentence is provided, pick the most relevant sense
    var primarySense = (p.senses && p.senses.length) ? p.senses[0] : null;
    var relevantSense = primarySense;

    if (contextSentence && p.senses) {
      for (var si = 0; si < p.senses.length; si++) {
        var s = p.senses[si];
        if (s.collocation_pattern) {
          var bareWords = s.collocation_pattern.match(/[\u4E00-\u9FFF\u3040-\u309F]+/g) || [];
          for (var bwi = 0; bwi < bareWords.length; bwi++) {
            if (contextSentence.includes(bareWords[bwi])) {
              relevantSense = s;
              break;
            }
          }
        }
      }
    }

    var sensesSummary = (p.senses || []).slice(0, 3).map(function (s, idx) {
      return `${idx + 1}. ${s.function_id}: "${s.translation_id}"`;
    }).join('\n');

    var l1Trap = (relevantSense && relevantSense.l1_trap) ? relevantSense.l1_trap : '';

    return {
      surface: surface,
      type: 'particle',
      badgeLevel: (p.jlpt || 'n5').toUpperCase(),
      badgePos: 'Partikel (助詞)',
      reading: p.romaji || surface,
      romaji: p.romaji || '',
      meaning_id: relevantSense ? relevantSense.translation_id : (p.overview_id || ''),
      function_title: relevantSense ? relevantSense.function_id : '',
      senses_summary: sensesSummary,
      sla_nuance: [
        l1Trap ? `⚠️ Peringatan L1: ${l1Trap}` : '',
        p.overview_id ? `💡 Karakter Partikel: ${p.overview_id}` : ''
      ].filter(Boolean).join('\n\n'),
      rawEntry: p
    };
  }

  function _formatInflectionPayload(surface, inf) {
    var entry = inf.entry || {};
    var rootWord = inf.rootWord || entry.word || '';
    var reading = entry.reading || '';
    var pos = entry.pos || '';
    var posLabel = POS_LABELS[pos] || pos || 'Kata Kerja';

    // Find transitive/intransitive contrast if applicable
    var pairNote = _getTransIntransNote(rootWord);

    // Collocation particle note for common verbs
    var collocNote = _getCollocationNote(rootWord);

    var nuanceLines = [];
    if (pairNote) nuanceLines.push(`🔄 Pasangan Transitif/Intransitif:\n${pairNote}`);
    if (collocNote) nuanceLines.push(`🔗 Kolokasi Partikel Wajib:\n${collocNote}`);
    if (entry.nuance) nuanceLines.push(`💡 Nuansa Kata: ${entry.nuance}`);
    if (inf.meaningShift) nuanceLines.push(`⚙️ Perubahan Bentuk: ${inf.meaningShift}`);

    return {
      surface: surface,
      type: 'inflection',
      rootWord: rootWord,
      badgeLevel: (entry.jlpt || 'n5').toUpperCase(),
      badgePos: posLabel,
      reading: reading,
      romaji: entry.romaji || '',
      meaning_id: entry.meaning_id || '',
      meaning_en: entry.meaning_en || '',
      inflection: {
        formKey: inf.formKey,
        formLabel: inf.formLabel,
        meaningShift: inf.meaningShift
      },
      sla_nuance: nuanceLines.join('\n\n'),
      rawEntry: entry
    };
  }

  function _formatVocabPayload(surface, v) {
    var posLabel = POS_LABELS[v.pos] || v.pos || 'Kosakata';
    var pairNote = _getTransIntransNote(v.word);
    var collocNote = _getCollocationNote(v.word);

    var nuanceLines = [];
    if (pairNote) nuanceLines.push(`🔄 Pasangan Transitif/Intransitif:\n${pairNote}`);
    if (collocNote) nuanceLines.push(`🔗 Kolokasi Partikel Wajib:\n${collocNote}`);
    if (v.nuance) nuanceLines.push(`💡 Nuansa Kata: ${v.nuance}`);
    if (v.formalitas) {
      var fNames = ['', 'Kasual', 'Netral', 'Formal', 'Sangat Formal'];
      nuanceLines.push(`📊 Derajat Formalitas: ${fNames[v.formalitas] || v.formalitas}`);
    }

    return {
      surface: surface,
      type: 'vocab',
      rootWord: v.word,
      badgeLevel: (v.jlpt || 'n5').toUpperCase(),
      badgePos: posLabel,
      reading: v.reading || '',
      romaji: v.romaji || '',
      meaning_id: v.meaning_id || '',
      meaning_en: v.meaning_en || '',
      sla_nuance: nuanceLines.join('\n\n'),
      rawEntry: v
    };
  }

  function _getTransIntransNote(word) {
    for (var i = 0; i < TRANS_INTRANS_PAIRS.length; i++) {
      var pair = TRANS_INTRANS_PAIRS[i];
      if (word === pair.trans) {
        return `"${word}" adalah TRANSITIF (membutuhkan objek + を). Pasangannya adalah "${pair.intrans}" (INTRANSITIF, terjadi sendiri + が). Arti: ${pair.meaning}.`;
      }
      if (word === pair.intrans) {
        return `"${word}" adalah INTRANSITIF (benda terjadi sendiri + が). Pasangannya adalah "${pair.trans}" (TRANSITIF, subjek melakukan + を). Arti: ${pair.meaning}.`;
      }
    }
    return '';
  }

  function _getCollocationNote(word) {
    var map = {
      '会う': 'Bertemu orang wajib menggunakan partikel に atau と (友達に会う), TIDAK BOLEH *友達を会う!',
      'あう': 'Bertemu orang wajib menggunakan partikel に atau と (友達に会う), TIDAK BOLEH *友達を会う!',
      '乗る': 'Naik kendaraan wajib menggunakan partikel に (電車に乗る), BUKAN *電車を乗る!',
      'のる': 'Naik kendaraan wajib menggunakan partikel に (電車に乗る), BUKAN *電車を乗る!',
      '降りる': 'Turun dari kendaraan menggunakan partikel を (電車を降りる = turun meninggalkan kendaraan).',
      '住む': 'Lokasi tempat tinggal wajib menggunakan partikel に (バリ島に住む), BUKAN *バリ島で住む!',
      'すむ': 'Lokasi tempat tinggal wajib menggunakan partikel に (バリ島に住む), BUKAN *バリ島で住む!',
      '泊まる': 'Menginap di hotel/tempat tinggal sementara menggunakan partikel に (ホテルに泊まる).',
      '話す': 'Orang yang diajak bicara ditandai dengan と atau に, bahasa/isi ditandai dengan を atau で (日本語で話す).'
    };
    return map[word] || '';
  }

  function _tryDynamicDeconjugate(surface) {
    // Check if ends in ました, ません, ませんでした
    var baseCandidate = '';
    if (surface.endsWith('ました') || surface.endsWith('ません') || surface.endsWith('ます')) {
      var stem = surface.replace(/(ました|ませんでした|ません|ます)$/, '');
      // Try Godan u-row replacement (i -> u) or Ichidan + ru
      var ichidanTry = stem + 'る';
      if (_vocabByWord.has(ichidanTry)) {
        var v = _vocabByWord.get(ichidanTry)[0];
        return _formatInflectionPayload(surface, {
          rootWord: ichidanTry,
          entry: v,
          formKey: surface.endsWith('ました') ? 'masu_past' : 'masu',
          formLabel: surface.endsWith('ました') ? 'Sopan Lampau (~ました)' : 'Sopan Non-Lampau (~ます)',
          meaningShift: 'Bentuk sopan dari ' + ichidanTry
        });
      }
    }
    return null;
  }

  // ──────────────────────────────────────────────
  // §5  SENTENCE SEGMENTER & INTERACTIVE RENDERER
  // ──────────────────────────────────────────────

  /**
   * Segments a sentence into tokens with morphological priority.
   * Priority: HTML tags -> Grammar Patterns -> Kanji/Words -> Inflections -> Particles -> Punct
   * @param {string} text
   * @returns {Array<object>}
   */
  function segment(text) {
    if (!text || typeof text !== 'string') return [];
    init();

    var tokens = [];
    var i = 0;

    while (i < text.length) {
      // 1. Punctuation & Whitespace
      var punctMatch = text.slice(i).match(/^[、。！？\s.,!?…・~〜()「」『』:;]+/);
      if (punctMatch) {
        tokens.push({ text: punctMatch[0], type: 'punct', start: i });
        i += punctMatch[0].length;
        continue;
      }

      // 2. HTML Tags (pass through safely)
      if (text[i] === '<') {
        var htmlMatch = text.slice(i).match(/^<[^>]+>/);
        if (htmlMatch) {
          tokens.push({ text: htmlMatch[0], type: 'html', start: i });
          i += htmlMatch[0].length;
          continue;
        }
      }

      // 3. Grammar Patterns & Compound Particles (Greedy Longest Match)
      var matchedGrammar = null;
      for (var gi = 0; gi < _sortedGrammarKeys.length; gi++) {
        var gk = _sortedGrammarKeys[gi];
        if (text.startsWith(gk, i)) {
          matchedGrammar = gk;
          break;
        }
      }
      if (matchedGrammar) {
        tokens.push({
          text: matchedGrammar,
          type: 'grammar',
          start: i
        });
        i += matchedGrammar.length;
        continue;
      }

      // 4. Combined Particles (Kasane-joshi)
      var matchedCombined = null;
      if (root.ParticleEngine && root.ParticleEngine.COMBINED_PARTICLES) {
        var cpKeys = Object.keys(root.ParticleEngine.COMBINED_PARTICLES).sort(function (a, b) {
          return b.length - a.length;
        });
        for (var cpi = 0; cpi < cpKeys.length; cpi++) {
          var cpk = cpKeys[cpi];
          if (text.startsWith(cpk, i)) {
            // Guard: のです is の + です, not ので
            if (cpk === 'ので' && (text.startsWith('のです', i) || text.startsWith('のでした', i))) {
              continue;
            }
            matchedCombined = cpk;
            break;
          }
        }
      }
      if (matchedCombined) {
        tokens.push({
          text: matchedCombined,
          type: 'combined_particle',
          start: i
        });
        i += matchedCombined.length;
        continue;
      }

      // 5. Inflected Word Match (e.g. 話しました, 食べました, 飲んで)
      var matchedInflection = null;
      var subText = text.slice(i, i + 12);
      // Check prefix lengths descending
      for (var sl = Math.min(subText.length, 10); sl >= 3; sl--) {
        var cand = subText.slice(0, sl);
        if (_inflectionMap.has(cand)) {
          matchedInflection = { surface: cand, data: _inflectionMap.get(cand) };
          break;
        }
      }
      if (matchedInflection) {
        tokens.push({
          text: matchedInflection.surface,
          type: 'inflection',
          rootWord: matchedInflection.data.rootWord,
          formKey: matchedInflection.data.formKey,
          start: i
        });
        i += matchedInflection.surface.length;
        continue;
      }

      // 6. Base Vocab Word Match (Kanji / Katakana / Words)
      var singleParticles = ['は', 'が', 'を', 'に', 'で', 'へ', 'と', 'も', 'の', 'か', 'ね', 'よ', 'わ', 'な', 'さ', 'ぞ', 'ぜ'];
      var matchedWord = null;
      for (var wi = 0; wi < _sortedWordKeys.length; wi++) {
        var wk = _sortedWordKeys[wi];
        if (text.startsWith(wk, i)) {
          // Guard: If matched word is single character that is also a particle, let step 7 handle it
          if (wk.length === 1 && singleParticles.includes(wk)) {
            continue;
          }
          matchedWord = wk;
          break;
        }
      }
      if (matchedWord) {
        tokens.push({
          text: matchedWord,
          type: 'vocab',
          start: i
        });
        i += matchedWord.length;
        continue;
      }

      // 7. Single Particles (格助詞・係助詞・終助詞)
      var singleParticles = ['は', 'が', 'を', 'に', 'で', 'へ', 'と', 'も', 'の', 'か', 'ね', 'よ', 'わ', 'な', 'さ', 'ぞ', 'ぜ'];
      var matchedSingle = null;
      for (var spi = 0; spi < singleParticles.length; spi++) {
        if (text.startsWith(singleParticles[spi], i)) {
          matchedSingle = singleParticles[spi];
          break;
        }
      }
      if (matchedSingle) {
        tokens.push({
          text: matchedSingle,
          type: 'particle',
          start: i
        });
        i += matchedSingle.length;
        continue;
      }

      // 8. Katakana runs
      var kataMatch = text.slice(i).match(/^[\u30A0-\u30FF]+/);
      if (kataMatch) {
        tokens.push({ text: kataMatch[0], type: 'vocab', start: i });
        i += kataMatch[0].length;
        continue;
      }

      // 9. Kanji character fallback
      if (/[\u4E00-\u9FFF]/.test(text[i])) {
        var kanjiRun = text.slice(i).match(/^[\u4E00-\u9FFF]+/)[0];
        tokens.push({ text: kanjiRun, type: 'vocab', start: i });
        i += kanjiRun.length;
        continue;
      }

      // 10. Single character fallback
      tokens.push({ text: text[i], type: 'text', start: i });
      i++;
    }

    return tokens;
  }

  /**
   * Renders any Japanese sentence as interactive HTML with subtle dotted underline.
   * Words, particles, and grammar become tappable to trigger the SLA pop-up.
   * @param {string} jpHtml
   * @param {object} [opts]
   * @returns {string}
   */
  function renderInteractive(jpHtml, opts) {
    if (!jpHtml || typeof jpHtml !== 'string') return '';
    opts = opts || {};

    // Pass directly to segment; segment handles <...> HTML tags safely as type: 'html'
    var tokens = segment(jpHtml);
    var out = '';

    for (var i = 0; i < tokens.length; i++) {
      var t = tokens[i];
      if (t.type === 'punct' || t.type === 'html' || t.type === 'text') {
        out += t.text;
      } else {
        // Interactive Token
        var cls = 'nn-lex-item nn-lex-' + t.type;
        var dataRoot = t.rootWord ? ` data-root="${t.rootWord}"` : '';
        var dataForm = t.formKey ? ` data-form="${t.formKey}"` : '';
        out += `<span class="${cls}" data-surface="${t.text}" data-type="${t.type}"${dataRoot}${dataForm} tabindex="0" role="button" aria-haspopup="dialog">${t.text}</span>`;
      }
    }

    return out;
  }

  // ──────────────────────────────────────────────
  // §6  INTERACTIVE UI COMPONENT (Popover & Bottom-Sheet)
  // ──────────────────────────────────────────────
  var LexiconUI = {
    overlayEl: null,
    cardEl: null,
    activeAnchor: null,

    initUI: function () {
      if (typeof document === 'undefined') return;
      if (document.getElementById('lexiconPeekOverlay')) {
        this.overlayEl = document.getElementById('lexiconPeekOverlay');
        this.cardEl = document.getElementById('lexiconPeekCard');
        return;
      }

      // Inject Overlay & Container
      var overlay = document.createElement('div');
      overlay.id = 'lexiconPeekOverlay';
      overlay.className = 'lex-overlay';
      overlay.style.display = 'none';

      var card = document.createElement('div');
      card.id = 'lexiconPeekCard';
      card.className = 'lex-card';
      card.onclick = function (e) { e.stopPropagation(); };

      overlay.appendChild(card);
      document.body.appendChild(overlay);

      overlay.onclick = function () { LexiconUI.close(); };

      this.overlayEl = overlay;
      this.cardEl = card;

      // Event delegation for all .nn-lex-item across the document
      document.addEventListener('click', function (e) {
        var target = e.target.closest('.nn-lex-item');
        if (target) {
          e.preventDefault();
          e.stopPropagation();
          var surface = target.getAttribute('data-surface');
          LexiconUI.open(surface, target);
        }
      });

      // Keyboard accessibility (Enter / Space)
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
          LexiconUI.close();
        }
        if (e.key === 'Enter' || e.key === ' ') {
          var target = document.activeElement && document.activeElement.closest('.nn-lex-item');
          if (target) {
            e.preventDefault();
            var surface = target.getAttribute('data-surface');
            LexiconUI.open(surface, target);
          }
        }
      });
    },

    open: function (surface, anchorElement) {
      this.initUI();
      if (!this.cardEl || !this.overlayEl) return;

      var info = lookup(surface);
      if (!info) return;

      this.activeAnchor = anchorElement || null;
      this.cardEl.innerHTML = this.renderCardHtml(info);
      this.overlayEl.style.display = 'block';

      // Position logic: Desktop floating popover vs Mobile bottom sheet
      var isDesktop = window.innerWidth >= 768;
      if (isDesktop && anchorElement) {
        this.cardEl.classList.remove('lex-sheet-mobile');
        this.cardEl.classList.add('lex-popover-desktop');
        this.positionPopover(anchorElement);
      } else {
        this.cardEl.classList.remove('lex-popover-desktop');
        this.cardEl.classList.add('lex-sheet-mobile');
        this.cardEl.style.top = '';
        this.cardEl.style.left = '';
      }

      // Animation class
      requestAnimationFrame(function () {
        if (LexiconUI.cardEl) {
          LexiconUI.cardEl.classList.add('lex-active');
        }
      });
    },

    positionPopover: function (anchor) {
      var rect = anchor.getBoundingClientRect();
      var cardWidth = 340;
      var left = rect.left + (rect.width / 2) - (cardWidth / 2);
      if (left < 16) left = 16;
      if (left + cardWidth > window.innerWidth - 16) {
        left = window.innerWidth - cardWidth - 16;
      }

      var top = rect.bottom + 10;
      // If overflows bottom of viewport, show above anchor
      if (top + 280 > window.innerHeight && rect.top > 280) {
        top = rect.top - 280 - 10;
      }

      this.cardEl.style.position = 'fixed';
      this.cardEl.style.left = left + 'px';
      this.cardEl.style.top = top + 'px';
      this.cardEl.style.width = cardWidth + 'px';
    },

    close: function () {
      if (this.cardEl) {
        this.cardEl.classList.remove('lex-active');
      }
      var self = this;
      setTimeout(function () {
        if (self.overlayEl) self.overlayEl.style.display = 'none';
      }, 150);
    },

    renderCardHtml: function (info) {
      var titleHtml = info.surface;
      var readingHtml = info.reading ? `<span class="lex-reading">${info.reading}</span>` : '';
      var romajiHtml = info.romaji ? `<span class="lex-romaji">${info.romaji}</span>` : '';
      var badgeLevel = info.badgeLevel ? `<span class="lex-badge lex-badge-lvl">${info.badgeLevel}</span>` : '';
      var badgePos = info.badgePos ? `<span class="lex-badge lex-badge-pos">${info.badgePos}</span>` : '';

      // Inflection block
      var infHtml = '';
      if (info.type === 'inflection' && info.inflection) {
        infHtml = `
          <div class="lex-inflection-box">
            <div class="lex-inf-label">🔄 ${info.inflection.formLabel}</div>
            <div class="lex-inf-root">Kata Dasar: <strong>${info.rootWord}</strong></div>
          </div>
        `;
      }

      // SLA Nuance Box
      var slaHtml = '';
      if (info.sla_nuance) {
        slaHtml = `
          <div class="lex-sla-box">
            <div class="lex-sla-title">💡 Nuansa & Jebakan Penggunaan</div>
            <div class="lex-sla-content">${info.sla_nuance.replace(/\n/g, '<br>')}</div>
          </div>
        `;
      }

      // Actions
      var actionBtnHtml = '';
      if (info.rawEntry && info.rawEntry.id) {
        if (info.rawEntry.id.startsWith('vg-') || info.rawEntry.id.startsWith('vn-')) {
          actionBtnHtml = `<button class="lex-btn-detail" onclick="LexiconUI.close(); if(window.openVocabDetail) openVocabDetail('${info.rawEntry.id}');">📖 Buka Detail Lengkap</button>`;
        } else if (info.rawEntry.id.startsWith('gn')) {
          actionBtnHtml = `<button class="lex-btn-detail" onclick="LexiconUI.close(); if(window.openDetailModal) openDetailModal('${info.rawEntry.id}');">📖 Buka Detail Grammar</button>`;
        }
      }

      return `
        <div class="lex-header">
          <div class="lex-badges">${badgeLevel} ${badgePos}</div>
          <button class="lex-close-btn" onclick="LexiconUI.close()" aria-label="Tutup">✕</button>
        </div>
        <div class="lex-word-row">
          <span class="lex-word">${titleHtml}</span>
          ${readingHtml}
          ${romajiHtml}
        </div>
        <div class="lex-meaning-main">${info.meaning_id || info.explanation || ''}</div>
        ${infHtml}
        ${slaHtml}
        <div class="lex-footer">
          ${actionBtnHtml}
        </div>
      `;
    }
  };

  // Auto-init UI when DOM is ready
  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function () { LexiconUI.initUI(); });
    } else {
      LexiconUI.initUI();
    }
  }

  // ──────────────────────────────────────────────
  // §7  PUBLIC API EXPORT
  // ──────────────────────────────────────────────
  var LexiconEngine = {
    init: init,
    lookup: lookup,
    segment: segment,
    renderInteractive: renderInteractive,
    UI: LexiconUI,
    POS_LABELS: POS_LABELS,
    TRANS_INTRANS_PAIRS: TRANS_INTRANS_PAIRS
  };

  root.LexiconEngine = LexiconEngine;
  root.LexiconUI = LexiconUI;

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = LexiconEngine;
  }

})();
