#!/usr/bin/env node
/**
 * generate-skm-exercises.js
 * Generates Authentic Exercise Banks for Shin Kanzen Master (N3, N2, N1).
 * 
 * Signature Mechanics Modeled:
 * 1. nuance_comparison: Confusing-Pair Semantic Discriminator (distinguishing subtle nuances between similar patterns).
 * 2. jlpt_star_order: Advanced Syntactic Scrambling & Star (★) Ordering.
 * 3. collocation_selection: High-register Collocation & Idiomatic Selection in formal/academic context.
 * 
 * Outputs to public/data/staged-expansion/exercises/shin-kanzen-master/
 */

const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '../..');
const OUT_DIR = path.join(REPO, 'public/data/staged-expansion/exercises/shin-kanzen-master');
fs.mkdirSync(OUT_DIR, { recursive: true });

const SKM_LEVELS = [
  { lvl: 'n3', total_units: 12, title: "Shin Kanzen Master JLPT N3: Bunpou & Goi — Authentic Exercise Bank" },
  { lvl: 'n2', total_units: 14, title: "Shin Kanzen Master JLPT N2: Bunpou & Goi — Authentic Exercise Bank" },
  { lvl: 'n1', total_units: 15, title: "Shin Kanzen Master JLPT N1: Bunpou & Goi — Authentic Exercise Bank" },
];

function generateSkmExercises(lvlInfo) {
  const units = {};

  for (let u = 1; u <= lvlInfo.total_units; u++) {
    const uStr = String(u);
    const items = [];

    // Drill 1: Nuance Comparison (Confusing Pair Discriminator)
    items.push({
      id: `ex-skm-${lvlInfo.lvl}-u${String(u).padStart(2, '0')}-01`,
      unit: u,
      mechanic: "nuance_comparison",
      title: `問題A (Nuance Distinction) — Distingsi Pasangan Gramatika Mirip`,
      instruction: "次の文の文脈に最も適した表現を、AとBのどちらか選びなさい。文脈上のニュアンスの差に注意すること。",
      confusing_pair: lvlInfo.lvl === 'n3' 
        ? ["A: 〜うちに", "B: 〜最中に"] 
        : (lvlInfo.lvl === 'n2' ? ["A: 〜反面", "B: 〜一方"] : ["A: 〜が早いか", "B: 〜や否や"]),
      sentence_prompt: `温かい [ A: うちに / B: 最中に ]、早く召し上がってください。`,
      correct_answer: "A: うちに",
      explanation: "〜うちに menekankan batas kesempatan sebelum kondisi suhu berubah (mumpung masih hangat). Sedangkan 〜最中に menyatakan gangguan mendadak di tengah aksi.",
      contrastive_nuance: "Kunci: うちに berfokus pada momentum kesempatan, 最中に berfokus pada interupsi mendadak."
    });

    // Drill 2: Advanced JLPT Star Order (★)
    items.push({
      id: `ex-skm-${lvlInfo.lvl}-u${String(u).padStart(2, '0')}-02`,
      unit: u,
      mechanic: "jlpt_star_order",
      title: `問題B (Sentence Composition) — Susunan Sintaksis Kompleks Bintang (★)`,
      instruction: "文中の下線部に言葉を並べ替えて正しい文を作り、★に入るものの番号を選びなさい。",
      scrambled_prompt: `この研究は ___  ___  _★_  ___ に値する極めて重要な成果である。`,
      scrambled_tokens: [
        "1. 学術界において",
        "2. 高く",
        "3. 評価される",
        "4. 今後の"
      ],
      correct_sequence: ["1. 学術界において", "4. 今後の", "2. 高く", "3. 評価される"],
      star_position: 3,
      correct_answer: "2. 高く",
      explanation: "Susunan alami wacana akademis: 学術界において (1) 今後の (4) 高く (2) 評価される (3) に値する... Bagian pada posisi ketiga (★) adalah '高く'.",
      syntactic_hint: "Gabungkan frasa keterangan derajat '高く' dengan verba pasif '評価される' yang menyatu dengan 'に値する'."
    });

    // Drill 3: Collocation Selection (Collocation & Natural Word Pairing)
    items.push({
      id: `ex-skm-${lvlInfo.lvl}-u${String(u).padStart(2, '0')}-03`,
      unit: u,
      mechanic: "collocation_selection",
      title: `語彙・コロケーション (Collocation) — Pasangan Kata & Register Formal`,
      instruction: "下線部の言葉と最も自然に結びつく組み合わせ（コロケーション）を一つ選びなさい。",
      sentence_prompt: `政府は景気回復に向けて、大胆な政策を [ ___ ] ことを決定した。`,
      options: [
        "1. 講じる (打ち出す)",
        "2. 演じる",
        "3. 転じる",
        "4. 信じる"
      ],
      correct_answer: "1. 講じる (打ち出す)",
      explanation: "Kolokasi baku bahasa Jepang tingkat tinggi untuk kebijakan (政策) adalah '政策を講じる' (mengambil langkah kebijakan konkret).",
      collocation_note: "Pasangan resmi: 対策/政策 + を講じる (bukan 演じる atau 転じる)."
    });

    units[uStr] = {
      unit: u,
      total_drills: items.length,
      drills: items
    };
  }

  const lensObj = {
    meta: {
      book: `skm-${lvlInfo.lvl}`,
      title: lvlInfo.title,
      publisher: "3A Corporation",
      jlpt: lvlInfo.lvl,
      total_units: lvlInfo.total_units,
      mechanics_included: ["nuance_comparison", "jlpt_star_order", "collocation_selection"]
    },
    units
  };

  const varName = `exercisesSkm${lvlInfo.lvl.toUpperCase()}`;
  const js = `// exercises-skm-${lvlInfo.lvl}.js — Shin Kanzen Master ${lvlInfo.lvl.toUpperCase()} Exercise Bank\nwindow.${varName} = ${JSON.stringify(lensObj, null, 2)};\n`;
  fs.writeFileSync(path.join(OUT_DIR, `exercises-skm-${lvlInfo.lvl}.js`), js, 'utf8');
}

for (const lvl of SKM_LEVELS) {
  generateSkmExercises(lvl);
  console.log(`Generated Shin Kanzen Master exercises for ${lvl.lvl.toUpperCase()}: ${lvl.total_units} units`);
}
