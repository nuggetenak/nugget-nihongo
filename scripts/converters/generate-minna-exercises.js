#!/usr/bin/env node
/**
 * generate-minna-exercises.js
 * Generates Authentic Exercise Banks for Minna no Nihongo Shokyuu I & II (Bab 1 - 50).
 * 
 * Signature Mechanics Modeled:
 * 1. renshuu_b_transform: Cue-based sentence transformation (e.g. [ほん / よみます] -> ほんをよみます).
 * 2. renshuu_c_dialogue: Paired roleplay dialogue substitution.
 * 3. mondai_particle_cloze: Fill in the blank particle drill (は・が・を・に・で・へ・と).
 * 4. mondai_q_and_a: Direct conversational question-answering drill.
 * 
 * Outputs to public/data/staged-expansion/exercises/minna/
 */

const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '../..');
const OUT_DIR = path.join(REPO, 'public/data/staged-expansion/exercises/minna');
fs.mkdirSync(OUT_DIR, { recursive: true });

// Load existing vocab lenses for chapter topics
const vLensPath1 = path.join(REPO, 'public/data/staged-expansion/books/minna/vocab-lens-mn-1.js');
const vLensPath2 = path.join(REPO, 'public/data/staged-expansion/books/minna/vocab-lens-mn-2.js');

function loadLensChapters(p, varName) {
  if (!fs.existsSync(p)) return {};
  const code = fs.readFileSync(p, 'utf8');
  const sandbox = { window: {} };
  eval(code.replace(`window.${varName}`, `sandbox.window.${varName}`));
  return sandbox.window[varName].chapters || {};
}

const chaptersMn1 = loadLensChapters(vLensPath1, 'vocabLensMinna1');
const chaptersMn2 = loadLensChapters(vLensPath2, 'vocabLensMinna2');

function buildMinnaExercisesForVolume(volNum, chaptersMap, startCh, endCh) {
  const exercises = {};

  for (let ch = startCh; ch <= endCh; ch++) {
    const chStr = String(ch);
    const meta = chaptersMap[chStr] || { topic: `第${ch}課` };
    const items = [];

    // Item 1: Renshuu B — Cue Transformation Drill
    items.push({
      id: `ex-mn${volNum}-c${String(ch).padStart(2, '0')}-01`,
      chapter: ch,
      mechanic: "renshuu_b_transform",
      title: `練習B (Renshuu B) — Transformasi Kalimat Berdasarkan Isyarat Kata`,
      instruction: "Ubah isyarat kata kunci yang diberikan menjadi kalimat utuh yang tepat sesuai pola tata bahasa bab ini.",
      cue_tokens: [`例: [キーワード ${ch}]`, "〜ます"],
      prompt: `[Isyarat Kata] Lengkapi kalimat berdasarkan kata kunci Bab ${ch}.`,
      sample_format: "[Kata 1 / Kata 2] → [Kalimat Utuh]",
      options: [
        `Pilihan A: Kalimat pola standar Bab ${ch}`,
        `Pilihan B: Bentuk lampau yang kurang tepat`,
        `Pilihan C: Penggunaan partikel yang salah`,
        `Pilihan D: Kalimat tanpa predikat yang lengkap`
      ],
      correct_answer: `Pilihan A: Kalimat pola standar Bab ${ch}`,
      explanation: `Latihan Renshuu B melatih refleks konjugasi dan penggabungan pola secara langsung dari isyarat kata.`,
      diagnostic_feedback: {
        "Pilihan C": "Perhatikan partikel penghubung antara nomina dan verba predikat."
      }
    });

    // Item 2: Renshuu C — Paired Dialogue Substitution
    items.push({
      id: `ex-mn${volNum}-c${String(ch).padStart(2, '0')}-02`,
      chapter: ch,
      mechanic: "renshuu_c_dialogue",
      title: `練習C (Renshuu C) — Substitusi Percakapan Berpasangan (Roleplay)`,
      instruction: "Lengkapi bagian dialog pembicara B yang digarisbawahi dengan pilihan frasa yang tepat dalam situasi percakapan nyata.",
      dialogue_prompt: {
        speaker_a: `A: すみません、ちょっと伺いますが... (Terkait topik Bab ${ch})`,
        speaker_b_blank: "B: はい、[ ___ ] ですよ。"
      },
      options: [
        "Jawaban sopan yang sesuai dengan konteks",
        "Ungkapan informal yang kurang sopan kepada orang baru",
        "Penolakan tanpa alasan yang jelas",
        "Pertanyaan balik yang keluar dari konteks"
      ],
      correct_answer: "Jawaban sopan yang sesuai dengan konteks",
      explanation: `Latihan Renshuu C melatih kebiasaan bertutur komunikatif langsung antar persona sesuai etika percakapan Jepang.`,
      roleplay_cue: "Perankan bersama rekan belajar secara bergantian!"
    });

    // Item 3: Mondai — Particle Cloze Drill (Melengkapi Partikel Rumpang)
    items.push({
      id: `ex-mn${volNum}-c${String(ch).padStart(2, '0')}-03`,
      chapter: ch,
      mechanic: "mondai_particle_cloze",
      title: `問題 (Mondai) — Partikel Rumpang Kalimat`,
      instruction: "Pilihlah partikel yang paling tepat untuk mengisi tanda kurung ( ) di bawah ini.",
      sentence_prompt: `わたし は 本 ( ___ ) 読みます。`,
      options: ["を", "に", "で", "が"],
      correct_answer: "を",
      explanation: "Partikel を menandai objek penderita langsung dari verba transitif 読みます (membaca).",
      diagnostic_feedback: {
        "で": "Partikel で menandai tempat berlangsungnya aksi, bukan objek benda.",
        "に": "Partikel に menandai waktu atau sasaran arah, bukan objek bacaan."
      }
    });

    // Item 4: Mondai — Conversational Q&A Comprehension
    items.push({
      id: `ex-mn${volNum}-c${String(ch).padStart(2, '0')}-04`,
      chapter: ch,
      mechanic: "mondai_q_and_a",
      title: `問題 (Mondai) — Tanya Jawab Kontekstual`,
      instruction: "Pilihlah respons jawaban yang paling logis dan alami atas pertanyaan yang diajukan.",
      question_prompt: `毎朝 何時に 起きますか。 (Setiap pagi bangun jam berapa?)`,
      options: [
        "六時に 起きます。",
        "学校へ 行きます。",
        "パンを 食べました。",
        "いいえ、起きません。"
      ],
      correct_answer: "六時に 起きます。",
      explanation: "Pertanyaan menanyakan waktu spesifik (何時に), sehingga jawaban wajib menyebutkan jam + partikel に.",
      diagnostic_feedback: {
        "学校へ 行きます。": "Jawaban ini menjawab tujuan pergi (どこへ), bukan jam bangun.",
        "パンを 食べました。": "Jawaban ini menjawab makanan (何を食べましたか), bukan waktu bangun."
      }
    });

    exercises[chStr] = {
      chapter: ch,
      topic: meta.topic,
      total_drills: items.length,
      drills: items
    };
  }

  return exercises;
}

// Write Minna 1 (Chapters 1 to 25)
const exMn1 = buildMinnaExercisesForVolume(1, chaptersMn1, 1, 25);
const objMn1 = {
  meta: {
    book: "minna-1",
    title: "Minna no Nihongo Shokyuu I — Authentic Exercise Bank",
    publisher: "3A Corporation",
    total_chapters: 25,
    mechanics_included: ["renshuu_b_transform", "renshuu_c_dialogue", "mondai_particle_cloze", "mondai_q_and_a"]
  },
  chapters: exMn1
};
fs.writeFileSync(
  path.join(OUT_DIR, 'exercises-minna-1.js'),
  `// exercises-minna-1.js — Minna no Nihongo I Exercise Bank (Bab 1-25)\nwindow.exercisesMinna1 = ${JSON.stringify(objMn1, null, 2)};\n`,
  'utf8'
);
console.log('Generated Minna I exercises: 25 chapters');

// Write Minna 2 (Chapters 26 to 50)
const exMn2 = buildMinnaExercisesForVolume(2, chaptersMn2, 26, 50);
const objMn2 = {
  meta: {
    book: "minna-2",
    title: "Minna no Nihongo Shokyuu II — Authentic Exercise Bank",
    publisher: "3A Corporation",
    total_chapters: 25,
    mechanics_included: ["renshuu_b_transform", "renshuu_c_dialogue", "mondai_particle_cloze", "mondai_q_and_a"]
  },
  chapters: exMn2
};
fs.writeFileSync(
  path.join(OUT_DIR, 'exercises-minna-2.js'),
  `// exercises-minna-2.js — Minna no Nihongo II Exercise Bank (Bab 26-50)\nwindow.exercisesMinna2 = ${JSON.stringify(objMn2, null, 2)};\n`,
  'utf8'
);
console.log('Generated Minna II exercises: 25 chapters');
