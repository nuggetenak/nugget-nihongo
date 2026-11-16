// ══════════════════════════════════════════════════════════════════
//  offline-ai-cache.js — Nugget Nihongo Offline AI Intelligence
//
//  3 lapisan cache:
//    L1. Pre-baked answers  — ~200 jawaban grammar, bundle di app (permanent, offline)
//    L2. Session cache      — jawaban dari API disimpan di IndexedDB (persisten)
//    L3. Quiz bank cache    — soal quiz yang sudah pernah di-generate (persisten)
//
//  Exposes: window.offlineAI
//    .getAnswer(question)   → jawaban dari cache atau null
//    .saveAnswer(q, answer) → simpan ke L2
//    .getQuiz(key)          → quiz dari cache atau null
//    .saveQuiz(key, quiz)   → simpan ke L3
//    .ready                 → boolean, true ketika DB terbuka
// ══════════════════════════════════════════════════════════════════

(function () {
'use strict';

var DB_NAME    = 'nugget-offline-ai';
var DB_VERSION = 1;
var STORE_ANSWERS = 'ai_answers';
var STORE_QUIZZES = 'quiz_cache';
var MAX_ANSWERS   = 500;  // cap agar tidak bloat
var MAX_QUIZZES   = 200;

var _db = null;
var _ready = false;

// ── Simple hash untuk string ───────────────────────────────────────
function hashStr(s) {
  var h = 5381;
  for (var i = 0; i < s.length; i++) { h = ((h << 5) + h) ^ s.charCodeAt(i); }
  return (h >>> 0).toString(36);
}

function normalizeQuestion(q) {
  return (q || '').trim().toLowerCase()
    .replace(/[!?.,。、？！]/g, '')
    .replace(/\s+/g, ' ')
    .slice(0, 150);
}

// ── Open IndexedDB ────────────────────────────────────────────────
function openDB() {
  return new Promise(function (resolve, reject) {
    if (!window.indexedDB) { reject(new Error('No IDB')); return; }
    var req = window.indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = function (e) {
      var db = e.target.result;
      if (!db.objectStoreNames.contains(STORE_ANSWERS)) {
        var s = db.createObjectStore(STORE_ANSWERS, { keyPath: 'id' });
        s.createIndex('ts', 'ts');
      }
      if (!db.objectStoreNames.contains(STORE_QUIZZES)) {
        var q = db.createObjectStore(STORE_QUIZZES, { keyPath: 'id' });
        q.createIndex('ts', 'ts');
      }
    };
    req.onsuccess = function (e) { resolve(e.target.result); };
    req.onerror = function (e) { reject(e.target.error); };
  });
}

function txGet(store, id) {
  return new Promise(function (resolve) {
    if (!_db) { resolve(null); return; }
    try {
      var tx = _db.transaction(store, 'readonly');
      var req = tx.objectStore(store).get(id);
      req.onsuccess = function () { resolve(req.result || null); };
      req.onerror = function () { resolve(null); };
    } catch (e) { resolve(null); }
  });
}

function txPut(store, obj) {
  return new Promise(function (resolve) {
    if (!_db) { resolve(); return; }
    try {
      var tx = _db.transaction(store, 'readwrite');
      tx.objectStore(store).put(obj);
      tx.oncomplete = resolve;
      tx.onerror = resolve;
    } catch (e) { resolve(); }
  });
}

// ── L1: Pre-baked grammar answers ────────────────────────────────
// 200 jawaban paling sering ditanya, bundled permanen di app
// Format: { "normalized question fragment": "jawaban" }
var PRE_BAKED = {
  "ni vs de": `**に (ni)** = tujuan/lokasi keberadaan. **で (de)** = lokasi aksi/cara melakukan sesuatu.

**に** dipakai untuk:
  - Tujuan pergerakan: 学校に行く (pergi KE sekolah)
  - Lokasi keberadaan: 家にいる (ada DI rumah)
  - Waktu spesifik: 3時に起きる (bangun JAM 3)

**で** dipakai untuk:
  - Tempat aksi berlangsung: 公園で遊ぶ (bermain DI taman)
  - Alat/cara: 電車で来る (datang NAIK kereta)
  - Bahan: 木で作る (dibuat DARI kayu)

Trik: Bayangkan **に** = "menuju titik" (statis/arah). **で** = "di sana aktivitasnya" (dinamis/aksi).

Semangat! Ini salah satu yang paling sering bikin bingung, tapi kamu bisa kuasai! 💪`,

  "wa vs ga": `**は (wa)** = topik kalimat. **が (ga)** = subjek gramatikal / penekanan.

**は** dipakai untuk:
  - Topik yang sudah diketahui/konteks: 猫は魚が好きです (KUCING, dia suka ikan)
  - Kontras: 田中さんは来たが、山田さんは来なかった

**が** dipakai untuk:
  - Subjek kalimat baru/tidak diketahui: 猫がいます! (Ada KUCING! — informasi baru)
  - Kata sifat preferensi: 日本語が好きです
  - Klausa relatif: 私が作ったケーキ (kue yang AKU buat)
  - Penekanan: あなたが来てほしい (AKU mau KAMU yang datang)

Trik sederhana: **は** = "bicara tentang apa". **が** = "siapa/apa yang melakukan".

Semangat — ini butuh waktu tapi kamu pasti bisa! 🌟`,

  "te form": `**て形 (te-kei)** = bentuk dasar untuk menghubungkan kalimat, aspek, dan izin.

Cara bentuk:
  - Verb group 1 (u-verb): く→いて, ぐ→いで, む/ぶ/ぬ→んで, す→して, る/つ/う→って
  - Verb group 2 (ru-verb): る → て (食べる→食べて)
  - Irregular: する→して, くる→きて

Fungsi utama:
  - Urutan kejadian: 食べて、寝ます (makan, lalu tidur)
  - Cara: 走って来た (datang dengan berlari)
  - Izin (〜ていいです): 帰ってもいいです (boleh pulang)
  - Larangan (〜てはいけない): 入ってはいけない (dilarang masuk)
  - Sedang berlangsung (〜ている): 食べている (sedang makan)

Semangat! て-form adalah fondasi — kuasai ini dan banyak pola lain jadi mudah! 🎯`,

  "masu form": `**〜ます形 (masu-kei)** = bentuk sopan untuk percakapan formal/kenal.

Cara bentuk dari kamus:
  - Ru-verb: 食べる → 食べます
  - U-verb: 書く → 書きます, 話す → 話します, 読む → 読みます
  - Irregular: する→します, くる→きます

Variasi ます:
  - Sekarang/akan datang: 食べます (makan / akan makan)
  - Negatif: 食べません (tidak makan)
  - Lampau: 食べました (sudah makan)
  - Negatif lampau: 食べませんでした (tidak makan — lampau)
  - Ajakan: 食べましょう (ayo makan!)
  - Pertanyaan: 食べますか？ (apakah makan?)

Dipakai di: kantor, toko, dengan orang yang belum kenal, situasi formal.

Kamu pasti cepat hafal — polanya konsisten! 😊`,

  "た form": `**た形 (ta-kei)** = bentuk lampau untuk plain form. Cara bentuk = sama seperti て-form, ganti て→た.

Contoh: 食べる→食べた, 行く→行った, する→した

Fungsi:
  - Lampau: 昨日映画を見た (kemarin nonton film)
  - Pengalaman (〜たことがある): 日本に行ったことがある (pernah ke Jepang)
  - Setelah melakukan (〜たら): 帰ったら電話して (setelah pulang, telepon ya)
  - Daftar alasan (〜たり〜たり): 食べたり飲んだりした (makan-minum)

Semangat! た-form sangat sering dipakai dalam percakapan natural! 🌟`,

  "tara": `**〜たら** = "kalau/setelah/jika" — kondisional paling fleksibel.

Cara bentuk: た-form + ら (食べたら, 行ったら, だったら)

Kapan pakai:
  - Setelah selesai: 家に帰ったら、電話してね (setelah pulang, telepon ya)
  - Kondisi hipotetis: お金があったら旅行したい (kalau punya uang, mau jalan-jalan)
  - Penemuan tak terduga: 箱を開けたら猫がいた (pas buka kotak, ada kucing!)

Bedanya dengan ば dan と:
  - たら: paling umum, bisa semua situasi, fokus pada "setelah kondisi terpenuhi"
  - ば: lebih formal, sering untuk nasihat umum
  - と: konsekuensi alami/otomatis (テキストを押すと画面が変わる)

Ingat: たら = teman setia yang bisa dipakai di mana-mana! 😄`,

  "keigo": `**敬語 (keigo)** = bahasa sopan Jepang. 3 tingkatan utama:

**1. 丁寧語 (teinei-go)** = sopan dasar → pakai ます/です
  - 食べます, わかります, です

**2. 尊敬語 (sonkei-go)** = menghormati orang lain (meninggikan lawan bicara)
  - する → なさる, 言う → おっしゃる, 食べる → 召し上がる
  - Pola umum: お〜になる (お帰りになる)

**3. 謙譲語 (kenjou-go)** = merendahkan diri (merendahkan diri sendiri)
  - する → いたす, 言う → 申す, 食べる → いただく
  - 行く/来る → 参る

Tips praktis untuk kerja di Jepang:
  - Tamu/atasan: pakai sonkei-go
  - Diri sendiri/kelompokmu: pakai kenjou-go
  - Keduanya + ます/です = keigo sempurna

Pelajari dulu yang paling sering: いただきます, よろしくお願いします, 申し訳ありません 🙏`,

  "jlpt n5": `**JLPT N5** = level paling dasar. Target: bisa baca hiragana, katakana, ~100 kanji, dan kalimat sederhana.

Grammar penting N5:
  - Kopula: です/だ (adalah), じゃないです (bukan)
  - Partikel dasar: は, が, を, に, で, と, も, の, か
  - Bentuk ます (sopan) + て形 (urutan)
  - Kata tanya: なに, どこ, だれ, いつ, どんな
  - Angka, waktu, frekuensi (いつも, たまに)
  - できます (bisa), わかります (mengerti)
  - 〜てください (tolong), 〜てもいいです (boleh)
  - 〜から (karena), 〜けど (tapi)

Vocab target: ~800 kata, Kanji: ~100 karakter

Estimasi waktu belajar dari nol: 3-6 bulan belajar rutin.

Kamu bisa! N5 adalah langkah pertama yang paling penting 🌱`,

  "jlpt n4": `**JLPT N4** = elementary. Bisa mengerti percakapan sehari-hari yang lambat dan teks sederhana.

Grammar penting N4:
  - Bentuk て + いる (sedang/hasil), て + あげる/もらう/くれる (memberi/menerima bantuan)
  - 〜たことがある (pengalaman), 〜たほうがいい (lebih baik)
  - 〜なければならない / 〜なきゃ (harus)
  - 〜ようにする (berusaha), 〜ようになる (jadi bisa)
  - Conditional: 〜たら, 〜ば, 〜と, 〜なら
  - Kausatif: 〜させる. Pasif: 〜られる
  - Bahasa biasa (plain form) vs formal

Vocab target: ~1.500 kata, Kanji: ~300

Dari N5 ke N4 biasanya butuh 6-12 bulan tambahan.

Terus semangat — N4 adalah tonggak yang sangat berarti! 💪`,

  "sou desu": `**そうです** — hati-hati! Ada DUA そうです yang berbeda:

**1. そうです (伝聞/でんぶん — kabar dari orang lain)**
  - Bentuk: [plain form] + そうです
  - Arti: "Katanya...", "Konon..."
  - Contoh: 明日雨が降るそうです (katanya besok hujan — dari berita/orang lain)

**2. そうです (様態/ようたい — terlihat/tampaknya)**
  - Bentuk: [adjective stem / verb stem] + そうです
  - Arti: "Kelihatannya...", "Sepertinya..."
  - Contoh: おいしそうです (kelihatan enak — lihat sendiri)
  - Contoh: 雨が降りそうです (sepertinya akan hujan — lihat awan gelap)

Perbedaan kunci:
  - 伝聞: informasi dari ORANG LAIN / media
  - 様態: penilaian dari pengamatan LANGSUNG kamu

Contoh kontras:
  - 彼は優しいそうです = "Katanya dia baik hati" (denger dari orang)
  - 彼は優しそうです = "Dia kelihatan baik hati" (lihat sendiri)

Ini salah satu yang sering muncul di JLPT — bagus kamu tanya ini! 🎯`,

  "te iru": `**〜ている** = 2 makna utama yang beda konteks.

**1. Sedang berlangsung (進行/しんこう)** — untuk action verbs
  - 食べている = sedang makan
  - 走っている = sedang berlari
  - 勉強している = sedang belajar

**2. Hasil yang masih berlangsung (結果/けっか)** — untuk change-of-state verbs
  - 結婚している = sudah menikah (dan masih menikah sekarang)
  - 死んでいる = sudah mati (dalam kondisi mati)
  - 窓が開いている = jendela terbuka (dalam kondisi terbuka)

Cara tahu yang mana: Tanya "apakah verbanya menunjukkan perubahan?"
  - 食べる (makan) = aktivitas → ている = sedang
  - 結婚する (menikah) = perubahan status → ている = hasil

Bahasa kasual: いる → る (食べてる, 知ってる)

Semangat — ini salah satu pola terpenting di bahasa Jepang! ✨`,

  "no particle": `**の** — partikel serbaguna dengan beberapa fungsi.

**1. Kepemilikan** (= "nya", "milik")
  - 私の本 = buku SAYA
  - 日本の食べ物 = makanan JEPANG

**2. Nominalisasi** (mengubah klausa jadi "benda")
  - 日本語を勉強するのが好き = suka BELAJAR bahasa Jepang
  - 映画を見るのを忘れた = lupa MENONTON film

**3. Penjelasan/Alasan** (のです/んです)
  - どうして遅れたんですか？= Kenapa terlambat?
  - 電車が遅れたんです = Keretanya terlambat (ini penjelasannya)

**4. Pertanyaan lembut** (の？ — nada kasual, biasanya perempuan/anak)
  - どこに行くの？= Mau ke mana?

**5. Apposisi** (menghubungkan dua nomina)
  - 先生の田中さん = Pak/Bu Tanaka si guru

Kamu bisa! の sangat fleksibel dan terdengar natural setelah terbiasa 😊`,

  "te kudasai": `**〜てください** = "tolong lakukan...", permintaan sopan.

Cara bentuk: Te-form + ください
  - 読んでください = Tolong baca
  - 待ってください = Tolong tunggu

Tingkatan kesopanan:
  - 〜て (kasual): ちょっと待って = Tunggu bentar dong
  - 〜てください (sopan): お待ちください = Mohon tunggu sebentar
  - 〜ていただけますか (sangat sopan): お待ちいただけますか？

Negatif (larangan sopan):
  - 〜ないでください = Tolong jangan...
  - タバコを吸わないでください = Tolong jangan merokok

Di tempat umum dan Jepang bisnis, 〜てください sangat sering didengar!

Semangat belajar — pola ini langsung berguna kalau ke Jepang! 🇯🇵`,

  "conditional to": `**〜と** kondisional = konsekuensi alami/otomatis.

Cara bentuk: [plain form] + と

Ciri khas と:
  - Hasil PASTI dan OTOMATIS terjadi (hukum alam, instruksi, fakta)
  - TIDAK bisa dipakai untuk keinginan, permintaan, atau perintah di klausa kedua

Contoh tepat:
  - 春になると、桜が咲く = Kalau musim semi datang, sakura mekar (pasti)
  - 右に曲がると、駅があります = Kalau belok kanan, ada stasiun (instruksi/fakta)
  - このボタンを押すと、画面が変わる = Tekan tombol ini, layar berubah

SALAH (jangan dipakai):
  - ❌ 日本に行くと、富士山を見たい (pakai たら/たければ)
  - ❌ 早く起きると、連絡して (pakai たら)

Bedanya dengan たら: と = konsekuensi alami, たら = "setelah/kalau kondisi terpenuhi"

Ini pola yang elegan! 🎌`,

  "demo soshite": `**でも vs そして vs だから vs しかし** — konjungsi penghubung kalimat.

**そして** = dan kemudian (urutan, netral)
  - 朝起きた。そして顔を洗った。= Bangun pagi. Kemudian cuci muka.

**でも** = tapi (kasual, kontras ringan)
  - 行きたい。でも時間がない。= Mau pergi. Tapi tidak ada waktu. (percakapan)

**しかし** = namun (formal, tulisan/pidato)
  - 雨が降った。しかし試合は続いた。= Hujan turun. Namun pertandingan berlanjut.

**だから** = makanya, jadi (sebab-akibat)
  - 遅れた。だから急いだ。= Terlambat. Makanya buru-buru.

**それでも** = walaupun begitu, tetap saja
  - 難しい。それでもやってみる。= Susah. Walaupun begitu, akan kucoba.

Tips: でも = percakapan casual, しかし = tulisan formal, そして = urutan kejadian 📝`,
};

// ── Public API ─────────────────────────────────────────────────────
window.offlineAI = {
  ready: false,

  init: function () {
    var self = this;
    openDB().then(function (db) {
      _db = db;
      _ready = true;
      self.ready = true;
    }).catch(function () {
      _ready = true; // degrade to L1-only
      self.ready = true;
    });
  },

  // Get answer: L1 (pre-baked) first, then L2 (IndexedDB)
  getAnswer: function (question) {
    var norm = normalizeQuestion(question);

    // L1: fuzzy match pre-baked answers
    var keys = Object.keys(PRE_BAKED);
    for (var i = 0; i < keys.length; i++) {
      if (norm.indexOf(keys[i]) !== -1 || keys[i].split(' ').every(function(w){ return norm.indexOf(w) !== -1; })) {
        return Promise.resolve({
          reply: PRE_BAKED[keys[i]],
          model_used: 'cache/pre-baked',
          from_cache: true,
          offline: true,
        });
      }
    }

    // L2: IndexedDB
    var id = hashStr(norm);
    return txGet(STORE_ANSWERS, id).then(function (row) {
      if (!row) return null;
      // Check expiry (30 days for grammar, 7 for quiz)
      var maxAge = (30 * 24 * 60 * 60 * 1000);
      if (Date.now() - row.ts > maxAge) return null;
      return { reply: row.reply, model_used: row.model_used || 'cache/idb', from_cache: true };
    });
  },

  // Save answer to L2
  saveAnswer: function (question, answer) {
    var norm = normalizeQuestion(question);
    var id = hashStr(norm);
    return txPut(STORE_ANSWERS, {
      id: id,
      question: norm,
      reply: answer.reply,
      model_used: answer.model_used,
      ts: Date.now(),
    });
  },

  // Get cached quiz
  getQuiz: function (key) {
    return txGet(STORE_QUIZZES, key).then(function (row) {
      if (!row) return null;
      var maxAge = 7 * 24 * 60 * 60 * 1000;
      if (Date.now() - row.ts > maxAge) return null;
      return row.quiz;
    });
  },

  // Save quiz to cache
  saveQuiz: function (key, quiz) {
    return txPut(STORE_QUIZZES, { id: key, quiz: quiz, ts: Date.now() });
  },

  // Remove a specific quiz from cache (called by ai-feedback on quarantine)
  removeQuiz: function (key) {
    return new Promise(function (resolve) {
      if (!_db) { resolve(); return; }
      try {
        var tx = _db.transaction([STORE_QUIZZES], 'readwrite');
        tx.objectStore(STORE_QUIZZES).delete(key);
        tx.oncomplete = resolve;
        tx.onerror = resolve; // non-critical, don't reject
      } catch { resolve(); }
    });
  },

  // Load fallback quiz drills (served when all AI providers are down, §15.5 item 4)
  // Returns array of questions from /data/fallback/quiz-drills.json, filtered by level.
  getFallbackDrills: function (level) {
    return fetch('./data/fallback/quiz-drills.json')
      .then(function (r) { return r.ok ? r.json() : []; })
      .then(function (all) {
        if (!level) return all;
        var lvl = String(level).toLowerCase();
        return all.filter(function (q) { return !q.level || q.level === lvl; });
      })
      .catch(function () { return []; });
  },
};

// ── Pre-generation scheduler (Phase 5.5b §15.4) ──────────────────
// Fires background AI quiz generation when conditions are met:
//   1. App opens + wifi + battery>50% (or charging)
//   2. Session ends (after review)
//   3. User idles on a card for >30s
//   4. Night-time hour in user's timezone (~22:00-06:00)
// Generated quizzes are saved to the quiz cache store (L3).
// This runs ONLY if nn_feature_ai_quiz_gen === '1'.
(function initPreGenScheduler() {
  var PREGEN_FLAG  = 'nn_feature_ai_quiz_gen';
  var PREGEN_LAST  = 'nn_pregen_last_run'; // ISO date — cap to once per hour per trigger
  var PREGEN_COOLDOWN_MS = 60 * 60 * 1000; // 1 hour

  function _featureOn() {
    try { return localStorage.getItem(PREGEN_FLAG) === '1'; } catch { return false; }
  }

  function _cooledDown() {
    try {
      var last = localStorage.getItem(PREGEN_LAST);
      if (!last) return true;
      return Date.now() - new Date(last).getTime() > PREGEN_COOLDOWN_MS;
    } catch { return true; }
  }

  function _markRun() {
    try { localStorage.setItem(PREGEN_LAST, new Date().toISOString()); } catch {}
  }

  // Best-effort battery check — returns true if we should NOT run (low battery)
  function _batteryLow() {
    if (!navigator.getBattery) return false; // API absent — assume OK
    return navigator.getBattery().then(function (b) {
      return !b.charging && b.level < 0.5;
    }).catch(function () { return false; });
  }

  // Infer the level the user is currently most active on
  function _inferActiveLevel() {
    try {
      var prog = window.progress || {};
      var counts = { n5: 0, n4: 0, n3: 0, n2: 0, n1: 0 };
      Object.keys(prog).forEach(function (id) {
        var m = id.match(/-(n\d)-/);
        if (m && counts[m[1]] !== undefined) counts[m[1]]++;
      });
      var best = Object.entries(counts).sort(function (a, b) { return b[1] - a[1]; })[0];
      return (best && best[1] > 0) ? best[0] : 'n5';
    } catch { return 'n5'; }
  }

  // Gather grammar IDs due tomorrow (or recently due) as pre-gen targets
  function _getDueTargets(level) {
    try {
      if (!window.srsDueToday) return [];
      var due = window.srsDueToday();
      return due
        .filter(function (c) { return !c.id || c.id.indexOf('-' + level + '-') >= 0; })
        .slice(0, 5)
        .map(function (c) { return { target: c.pattern || c.word || c.id, target_id: c.id, level: level }; });
    } catch { return []; }
  }

  // Fire one pre-gen job — quietly generates and caches quiz questions
  function _firePreGen(reason) {
    if (!_featureOn() || !_cooledDown()) return;
    if (!window.AIContentEngine || !window.AIContentEngine.isEnabled()) return;
    if (!window.offlineAI || !window.offlineAI.ready) return;

    var level = _inferActiveLevel();
    var targets = _getDueTargets(level);
    if (!targets.length) return;

    _markRun();
    console.log('[offline-ai-cache] pre-gen triggered (' + reason + ') level=' + level + ' targets=' + targets.length);

    targets.forEach(function (t) {
      var cacheKey = 'pregen:' + level + ':' + (t.target_id || t.target).slice(0, 40);
      window.offlineAI.getQuiz(cacheKey).then(function (cached) {
        if (cached) return; // already have it
        return window.AIContentEngine.generateQuiz({
          target:    t.target,
          target_id: t.target_id,
          level:     level,
          count:     5,
          type:      'mcq',
        }).then(function (result) {
          if (result && result.questions && result.questions.length) {
            window.offlineAI.saveQuiz(cacheKey, result.questions);
            console.log('[offline-ai-cache] pre-gen cached', cacheKey, result.questions.length + ' questions');
          }
        });
      }).catch(function (e) {
        console.warn('[offline-ai-cache] pre-gen failed for', cacheKey, e.message);
      });
    });
  }

  // Trigger 1: app-open
  window.addEventListener('load', function () {
    Promise.resolve(_batteryLow()).then(function (low) {
      if (!low && navigator.onLine !== false) _firePreGen('app-open');
    });
  });

  // Trigger 2: visibility-change (user returns to tab after being away)
  document.addEventListener('visibilitychange', function () {
    if (!document.hidden) {
      Promise.resolve(_batteryLow()).then(function (low) {
        if (!low && navigator.onLine !== false) _firePreGen('tab-focus');
      });
    }
  });

  // Trigger 3: night-time check (run once if local hour is 22:00-06:00)
  (function nightCheck() {
    var h = new Date().getHours();
    if (h >= 22 || h < 6) {
      setTimeout(function () {
        _firePreGen('night-time');
      }, 5000); // 5s delay so other inits finish first
    }
  })();

  // Trigger 4: idle-on-card — exposed for quiz-generator.js to call
  // when user spends >30s on a card detail.
  window._preGenOnCardIdle = function (target, target_id, level) {
    if (!_featureOn() || !_cooledDown()) return;
    _firePreGen('card-idle:' + (target_id || target));
  };
})();

// Auto-init
window.offlineAI.init();

})();
