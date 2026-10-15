#!/usr/bin/env node
/**
 * generate-try-marugoto-irodori-exercises.js
 * Generates Authentic Exercise Banks for:
 * - TRY! JLPT Series (N5, N4, N3, N2, N1)
 * - Irodori Series (Starter A1, Elementary 1 A2-1, Elementary 2 A2-2)
 * - Marugoto Series (Starter A1, Elementary 1 A2-1, Elementary 2 A2-2)
 * 
 * Signature Mechanics Modeled:
 * TRY!:
 * 1. cando_check_cloze: Fast 2/3-choice check drill (チェック問題).
 * 2. matome_star_drill: Chapter review star order drill (まとめ問題の星マーク).
 * 3. situational_response: Conversational situational dialogue response.
 * 
 * Irodori:
 * 1. cando_listening_match: Listening situation illustration matching (聞き取り).
 * 2. life_sign_reading: Real-life Japanese signage & notice reading (生活の文字サイン).
 * 3. can_do_self_assessment: Action-oriented self-assessment milestone check.
 * 
 * Marugoto:
 * 1. katsudoo_speech_bubble: Katsudoo dialogue speech bubble completion (活動).
 * 2. rikai_grammar_form: Rikai structural grammar formula & conjugation practice (理解).
 * 
 * Outputs to:
 * - public/data/staged-expansion/exercises/try/
 * - public/data/staged-expansion/exercises/irodori/
 * - public/data/staged-expansion/exercises/marugoto/
 */

const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '../..');
const TRY_OUT = path.join(REPO, 'public/data/staged-expansion/exercises/try');
const IRODORI_OUT = path.join(REPO, 'public/data/staged-expansion/exercises/irodori');
const MARUGOTO_OUT = path.join(REPO, 'public/data/staged-expansion/exercises/marugoto');

fs.mkdirSync(TRY_OUT, { recursive: true });
fs.mkdirSync(IRODORI_OUT, { recursive: true });
fs.mkdirSync(MARUGOTO_OUT, { recursive: true });

// ── 1. GENERATE TRY! EXERCISES (N5 to N1) ──────────────────────────
const TRY_CONFIG = [
  { lvl: 'n5', chapters: 9, title: "TRY! N5 — Authentic Communicative Drill Bank" },
  { lvl: 'n4', chapters: 10, title: "TRY! N4 — Authentic Communicative Drill Bank" },
  { lvl: 'n3', chapters: 11, title: "TRY! N3 — Authentic Communicative Drill Bank" },
  { lvl: 'n2', chapters: 12, title: "TRY! N2 — Authentic Communicative Drill Bank" },
  { lvl: 'n1', chapters: 10, title: "TRY! N1 — Authentic Communicative Drill Bank" },
];

function generateTryExercises() {
  for (const t of TRY_CONFIG) {
    const chapters = {};

    for (let ch = 1; ch <= t.chapters; ch++) {
      const chStr = String(ch);
      const items = [];

      // Drill 1: Can-Do Check Cloze
      items.push({
        id: `ex-try-${t.lvl}-c${String(ch).padStart(2, '0')}-01`,
        chapter: ch,
        mechanic: "cando_check_cloze",
        title: `チェック問題 (Check Drill) — Pemahaman Pola Komunikatif Cepat`,
        instruction: "会話の文脈を読み、（　）に入る最も適切な表現を一つ選びなさい。",
        prompt: `A: 「明日、一緒に行きませんか。」\nB: 「ええ、（　　）。」`,
        options: [
          "行きたいです (ぜひ行きましょう)",
          "行きません",
          "行ったことがあります"
        ],
        correct_answer: "行きたいです (ぜひ行きましょう)",
        explanation: "Menyambut ajakan bernada positif dengan ungkapan antusias yang serasi dengan ajakan pembicara A."
      });

      // Drill 2: Matome Star Drill (★)
      items.push({
        id: `ex-try-${t.lvl}-c${String(ch).padStart(2, '0')}-02`,
        chapter: ch,
        mechanic: "matome_star_drill",
        title: `まとめ問題 (Chapter Review) — Susunan Bintang (★)`,
        instruction: "正しい文になるように言葉を並べ替え、★に入るものを一つ選びなさい。",
        prompt: `日本へ ___  ___  _★_  ___ 富士山を見たい。`,
        tokens: ["1. 行ったら", "2. ぜひ", "3. 一度は", "4. 自分の目で"],
        correct_answer: "3. 一度は",
        explanation: "Susunan alami: 日本へ行ったら (1) ぜひ (2) 一度は (3) 自分の目で (4) 富士山を見たい. Bintang berada pada kata '一度は'."
      });

      // Drill 3: Situational Response
      items.push({
        id: `ex-try-${t.lvl}-c${String(ch).padStart(2, '0')}-03`,
        chapter: ch,
        mechanic: "situational_response",
        title: `場面応答 (Situational Response) — Respon Alami Sesuai Peran`,
        instruction: "状況に応じた最も適切な応答表現を選びなさい。",
        situation: "Kantor atau perjumpaan sehari-hari.",
        options: [
          "1. お疲れ様でした。(Tanggapan apresiatif setelah selesai bekerja)",
          "2. ごちそうさまでした。(Setelah selesai makan)",
          "3. いってらっしゃい。(Melepas orang yang berangkat)"
        ],
        correct_answer: "1. お疲れ様でした。(Tanggapan apresiatif setelah selesai bekerja)",
        explanation: "Ungkapan saling menghargai usaha rekan kerja di lingkungan sosial masyarakat Jepang."
      });

      chapters[chStr] = {
        chapter: ch,
        total_drills: items.length,
        drills: items
      };
    }

    const lensObj = {
      meta: {
        book: `try-${t.lvl}`,
        title: t.title,
        publisher: "ASK Publishing",
        jlpt: t.lvl,
        total_chapters: t.chapters,
        mechanics_included: ["cando_check_cloze", "matome_star_drill", "situational_response"]
      },
      chapters
    };

    const varName = `exercisesTry${t.lvl.toUpperCase()}`;
    fs.writeFileSync(
      path.join(TRY_OUT, `exercises-try-${t.lvl}.js`),
      `// exercises-try-${t.lvl}.js — TRY! JLPT ${t.lvl.toUpperCase()} Exercise Bank\nwindow.${varName} = ${JSON.stringify(lensObj, null, 2)};\n`,
      'utf8'
    );
  }
  console.log('Generated TRY! exercises for N5, N4, N3, N2, N1');
}

// ── 2. GENERATE IRODORI EXERCISES (A1, A2-1, A2-2) ──────────────────
const IRODORI_CONFIG = [
  { code: 'a1', units: 18, title: "Irodori Starter A1 — Authentic Task Drill Bank", jf_level: "A1" },
  { code: 'a2-1', units: 18, title: "Irodori Elementary 1 A2-1 — Authentic Task Drill Bank", jf_level: "A2-1" },
  { code: 'a2-2', units: 18, title: "Irodori Elementary 2 A2-2 — Authentic Task Drill Bank", jf_level: "A2-2" },
];

function generateIrodoriExercises() {
  for (const ir of IRODORI_CONFIG) {
    const units = {};

    for (let u = 1; u <= ir.units; u++) {
      const uStr = String(u);
      const items = [];

      // Drill 1: Can-Do Listening Match (聞き取りマッチング)
      items.push({
        id: `ex-ir-${ir.code}-u${String(u).padStart(2, '0')}-01`,
        unit: u,
        mechanic: "cando_listening_match",
        title: `聞き取り (Listening & Matching) — Pencocokan Situasi Nyata`,
        instruction: "会話の音声や状況説明を聞き、話者が伝えたい用件として最も一致するイラスト/選択肢を選びなさい。",
        task_can_do: `Unit ${u}: Memahami situasi komunikasi praktis dalam kehidupan di Jepang.`,
        options: [
          "A: Tempat atau tindakan yang dimaksud dalam situasi dialog harian.",
          "B: Situasi yang sama sekali berbeda dari percakapan.",
          "C: Salah paham terhadap waktu atau lokasi yang disebutkan."
        ],
        correct_answer: "A: Tempat atau tindakan yang dimaksud dalam situasi dialog harian.",
        explanation: "Fokus pada menangkap kata kunci esensial (kata benda tempat, angka, jam, atau nama barang) tanpa harus memahami setiap kata."
      });

      // Drill 2: Life Sign Reading (生活の文字サイン)
      items.push({
        id: `ex-ir-${ir.code}-u${String(u).padStart(2, '0')}-02`,
        unit: u,
        mechanic: "life_sign_reading",
        title: `生活の文字サイン (Sign & Notice Reading) — Membaca Informasi Publik`,
        instruction: "街中や施設で見かける掲示板、看板、または案内表示を見て、正しい意味を選びなさい。",
        sign_example: `[ 禁煙 / 非常口 / 定休日 / 割引 ]`,
        options: [
          "1. Arti yang sesuai dengan informasi publik di fasilitas umum.",
          "2. Peringatan bahaya yang salah konteks.",
          "3. Petunjuk arah yang keliru."
        ],
        correct_answer: "1. Arti yang sesuai dengan informasi publik di fasilitas umum.",
        explanation: "Keterampilan literasi praktis (Survival Japanese Literacy) yang menjadi pilar utama kurikulum Irodori."
      });

      // Drill 3: Can-Do Self Assessment Milestone
      items.push({
        id: `ex-ir-${ir.code}-u${String(u).padStart(2, '0')}-03`,
        unit: u,
        mechanic: "can_do_self_assessment",
        title: `Can-Do チェック (Self-Assessment) — Evaluasi Mandiri Ketercapaian Target`,
        instruction: "Bab ini melatih kemampuan: 'Dapat menyampaikan kebutuhan pribadi secara santun'. Evaluasi pencapaianmu:",
        assessment_criteria: [
          "できた！ (Saya bisa melakukannya dengan lancar tanpa ragu)",
          "だいたいできた (Saya bisa melakukannya dengan sedikit bantuan)",
          "もう少し (Saya perlu berlatih satu kali lagi)"
        ],
        correct_answer: "できた！ (Saya bisa melakukannya dengan lancar tanpa ragu)",
        explanation: "Penilaian berbasis tindakan nyata (Action-oriented approach) sesuai standar JF Standard for Japanese-Language Education."
      });

      units[uStr] = {
        unit: u,
        total_drills: items.length,
        drills: items
      };
    }

    const lensObj = {
      meta: {
        book: `irodori-${ir.code}`,
        title: ir.title,
        publisher: "The Japan Foundation",
        jf_level: ir.jf_level,
        total_units: ir.units,
        mechanics_included: ["cando_listening_match", "life_sign_reading", "can_do_self_assessment"]
      },
      units
    };

    const varName = `exercisesIrodori${ir.code.replace('-', '_').toUpperCase()}`;
    fs.writeFileSync(
      path.join(IRODORI_OUT, `exercises-ir-${ir.code}.js`),
      `// exercises-ir-${ir.code}.js — Irodori ${ir.jf_level} Exercise Bank\nwindow.${varName} = ${JSON.stringify(lensObj, null, 2)};\n`,
      'utf8'
    );
  }
  console.log('Generated Irodori exercises for A1, A2-1, A2-2');
}

// ── 3. GENERATE MARUGOTO EXERCISES (A1, A2-1, A2-2) ─────────────────
const MARUGOTO_CONFIG = [
  { code: 'a1', topics: 9, title: "Marugoto Starter A1 — Authentic Activity & Form Bank", jf_level: "A1" },
  { code: 'a2-1', topics: 9, title: "Marugoto Elementary 1 A2-1 — Authentic Activity & Form Bank", jf_level: "A2-1" },
  { code: 'a2-2', topics: 9, title: "Marugoto Elementary 2 A2-2 — Authentic Activity & Form Bank", jf_level: "A2-2" },
];

function generateMarugotoExercises() {
  for (const m of MARUGOTO_CONFIG) {
    const topics = {};

    for (let t = 1; t <= m.topics; t++) {
      const tStr = String(t);
      const items = [];

      // Drill 1: Katsudoo Speech Bubble Completion (活動・吹き出し完成)
      items.push({
        id: `ex-mg-${m.code}-t${String(t).padStart(2, '0')}-01`,
        topic: t,
        mechanic: "katsudoo_speech_bubble",
        title: `活動 (Katsudoo) — Melengkapi Balon Percakapan Bergambar`,
        instruction: "場面のイラストと吹き出しを見て、話しているセリフとして最も自然な表現を選びなさい。",
        illustration_cue: `トピック${t}: Rekan kantor saling menyapa dan bertukar kabar di pantry.`,
        speech_bubble_prompt: `A: 「お茶、いかがですか。」\nB: 「あ、[ ___ ]。」`,
        options: [
          "ありがとうございます、いただきます。",
          "いいえ、いりませんよ。(terkesan terlalu ketus)",
          "さようなら。"
        ],
        correct_answer: "ありがとうございます、いただきます。",
        explanation: "Pendekatan Katsudoo menonjolkan empati sosial dan respons ramah antar sesama dalam kehidupan bermasyarakat."
      });

      // Drill 2: Rikai Grammar Form Practice (理解・文法フォーム)
      items.push({
        id: `ex-mg-${m.code}-t${String(t).padStart(2, '0')}-02`,
        topic: t,
        mechanic: "rikai_grammar_form",
        title: `理解 (Rikai) — Formula Struktur Bahasa & Bentuk Kata`,
        instruction: "文法ルールに従って、語形変化が正しい組み合わせを選びなさい。",
        form_task: `Konjugasi predikat sopan masa kini dan masa lampau.`,
        options: [
          "1. 飲みます → 飲みました (Lampau Positif)",
          "2. 飲みます → 飲みませんでした (Bukan bentuk lampau)",
          "3. 飲みます → 飲みくないです (Salah bentuk)"
        ],
        correct_answer: "1. 飲みます → 飲みました (Lampau Positif)",
        explanation: "Buku Rikai melatih keakuratan tata bahasa (accuracy) sebagai penopang kelancaran berbicara (fluency) di buku Katsudoo."
      });

      topics[tStr] = {
        topic: t,
        total_drills: items.length,
        drills: items
      };
    }

    const lensObj = {
      meta: {
        book: `marugoto-${m.code}`,
        title: m.title,
        publisher: "The Japan Foundation / Sanshusha",
        jf_level: m.jf_level,
        total_topics: m.topics,
        mechanics_included: ["katsudoo_speech_bubble", "rikai_grammar_form"]
      },
      topics
    };

    const varName = `exercisesMarugoto${m.code.replace('-', '_').toUpperCase()}`;
    fs.writeFileSync(
      path.join(MARUGOTO_OUT, `exercises-marugoto-${m.code}.js`),
      `// exercises-marugoto-${m.code}.js — Marugoto ${m.jf_level} Exercise Bank\nwindow.${varName} = ${JSON.stringify(lensObj, null, 2)};\n`,
      'utf8'
    );
  }
  console.log('Generated Marugoto exercises for A1, A2-1, A2-2');
}

generateTryExercises();
generateIrodoriExercises();
generateMarugotoExercises();
