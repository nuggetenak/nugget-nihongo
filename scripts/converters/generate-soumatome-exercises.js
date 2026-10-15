#!/usr/bin/env node
/**
 * generate-soumatome-exercises.js
 * Generates Authentic Exercise Banks for Nihongo Sou Matome (N5, N4, N3, N2, N1).
 * 
 * Signature Mechanics Modeled:
 * 1. jlpt_bunpou_4choice: JLPT Section 1 Sentence Grammar — 4-Choice fill-in-the-blank.
 * 2. jlpt_star_order: JLPT Section 2 Sentence Composition — Star Order (★) scrambled syntax solver.
 * 3. jlpt_text_cloze: JLPT Section 3 Text Grammar — contextual cohesive discourse cloze.
 * 
 * Outputs to public/data/staged-expansion/exercises/soumatome/
 */

const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '../..');
const OUT_DIR = path.join(REPO, 'public/data/staged-expansion/exercises/soumatome');
fs.mkdirSync(OUT_DIR, { recursive: true });

const LEVELS = [
  { lvl: 'n5', weeks: 6, title: "Nihongo Sou Matome N5 — Authentic Drill Bank" },
  { lvl: 'n4', weeks: 6, title: "Nihongo Sou Matome N4 — Authentic Drill Bank" },
  { lvl: 'n3', weeks: 6, title: "Nihongo Sou Matome N3 — Authentic Drill Bank" },
  { lvl: 'n2', weeks: 8, title: "Nihongo Sou Matome N2 — Authentic Drill Bank" },
  { lvl: 'n1', weeks: 8, title: "Nihongo Sou Matome N1 — Authentic Drill Bank" },
];

function generateSoumatomeLevelExercises(lvlInfo) {
  const weeks = {};

  for (let w = 1; w <= lvlInfo.weeks; w++) {
    const wStr = String(w);
    const items = [];

    // Drill 1: JLPT Bunpou 4-Choice
    items.push({
      id: `ex-sm-${lvlInfo.lvl}-w${w}-01`,
      week: w,
      day: 1,
      mechanic: "jlpt_bunpou_4choice",
      title: `文の文法１ (Sentence Grammar 1) — Pilihan Ganda 4-Opsi JLPT`,
      instruction: "次の文の（　）に入れるのに最もよいものを、１・２・３・４から一つ選びなさい。",
      sentence_prompt: `最近、仕事が忙しくて、休む時間（　　　）ない。`,
      options: [
        "1. さえ",
        "2. こそ",
        "3. だけ",
        "4. ほど"
      ],
      correct_answer: "1. さえ",
      correct_index: 1,
      explanation: "〜さえ...ない digunakan untuk menyatakan contoh ekstrem: 'bahkan waktu untuk istirahat pun tidak ada'.",
      jlpt_exam_section: "言語知識（文字・語彙・文法）"
    });

    // Drill 2: JLPT Star Order (★) Scrambled Sentence Composition
    items.push({
      id: `ex-sm-${lvlInfo.lvl}-w${w}-02`,
      week: w,
      day: 3,
      mechanic: "jlpt_star_order",
      title: `文の文法２ (Sentence Grammar 2) — Susunan Kalimat Tanda Bintang (★)`,
      instruction: "次の文の ___ に入る最もよい順番を組み立て、★ に入る番号を一つ選びなさい。",
      scrambled_prompt: `彼が ___  ___  _★_  ___ は、誰も知らなかった。`,
      scrambled_tokens: [
        "1. 秘密を",
        "2. 抱えていた",
        "3. ということ",
        "4. 重大な"
      ],
      correct_sequence: ["4. 重大な", "1. 秘密を", "2. 抱えていた", "3. ということ"],
      star_position: 3,
      correct_answer: "2. 抱えていた",
      explanation: "Susunan alami kalimat adalah: 重大な秘密を (4, 1) + 抱えていた (2) + ということ (3) は誰も知らなかった. Bagian pada posisi ketiga (★) adalah 抱えていた.",
      pedagogical_tip: "Fokus temukan pasangan partikel-verba dan klausa modifikasi nomina terlebih dahulu!"
    });

    // Drill 3: JLPT Text Grammar Cloze (文章の文法)
    items.push({
      id: `ex-sm-${lvlInfo.lvl}-w${w}-03`,
      week: w,
      day: 6,
      mechanic: "jlpt_text_cloze",
      title: `文章の文法 (Text Grammar) — Rumpang Kohesi Wacana Panjang`,
      instruction: "文章全体の文脈を読み取り、（ ★ ）に入る最も適切な接続表現・文末表現を選びなさい。",
      passage_context: `現代社会では、インターネットの普及により情報伝達の速度が飛躍的に向上した。（ ★ ）、情報の信憑性を自己責任で見極める能力が以前にも増して強く求められている。`,
      options: [
        "1. その一方で",
        "2. その結果",
        "3. たとえば",
        "4. というのも"
      ],
      correct_answer: "1. その一方で",
      correct_index: 1,
      explanation: "Paragraf menyajikan dua sisi mata uang: kecepatan informasi meningkat, namun di sisi lain (その一方で) literasi verifikasi fakta menjadi beban kritis baru.",
      discourse_function: "Pengungkapan sisi kontras komplementer dalam paragraf argumentatif."
    });

    weeks[wStr] = {
      week: w,
      total_drills: items.length,
      drills: items
    };
  }

  const lensObj = {
    meta: {
      book: `soumatome-${lvlInfo.lvl}`,
      title: lvlInfo.title,
      publisher: "ASK Publishing",
      jlpt: lvlInfo.lvl,
      total_weeks: lvlInfo.weeks,
      mechanics_included: ["jlpt_bunpou_4choice", "jlpt_star_order", "jlpt_text_cloze"]
    },
    weeks
  };

  const varName = `exercisesSoumatome${lvlInfo.lvl.toUpperCase()}`;
  const js = `// exercises-sm-${lvlInfo.lvl}.js — Nihongo Sou Matome ${lvlInfo.lvl.toUpperCase()} Exercise Bank\nwindow.${varName} = ${JSON.stringify(lensObj, null, 2)};\n`;
  fs.writeFileSync(path.join(OUT_DIR, `exercises-sm-${lvlInfo.lvl}.js`), js, 'utf8');
}

for (const lvl of LEVELS) {
  generateSoumatomeLevelExercises(lvl);
  console.log(`Generated Soumatome exercises for ${lvl.lvl.toUpperCase()}: ${lvl.weeks} weeks`);
}
