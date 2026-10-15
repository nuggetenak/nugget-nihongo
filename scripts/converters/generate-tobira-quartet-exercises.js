#!/usr/bin/env node
/**
 * generate-tobira-quartet-exercises.js
 * Generates Authentic Exercise Banks for Tobira & QUARTET.
 * 
 * Signature Mechanics Modeled:
 * Tobira:
 * 1. schema_warmup: Pre-reading schema activation questions (読みの前の質問).
 * 2. cue_sentence_completion: Sentence completion with given grammar cue (文法練習・文完成).
 * 3. cultural_inference: Cultural text comprehension & inference check (内容質問・文化理解).
 * 
 * QUARTET:
 * 1. 4skills_speaking_roleplay: Integrated communicative speaking simulation.
 * 2. pattern_expansion: Paragraph & sentence expansion using target grammar patterns.
 * 3. reading_strategy_check: Essay structure and reading strategy comprehension check.
 * 
 * Outputs to:
 * - public/data/staged-expansion/exercises/tobira/
 * - public/data/staged-expansion/exercises/quartet/
 */

const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '../..');
const TOBIRA_OUT = path.join(REPO, 'public/data/staged-expansion/exercises/tobira');
const QUARTET_OUT = path.join(REPO, 'public/data/staged-expansion/exercises/quartet');
fs.mkdirSync(TOBIRA_OUT, { recursive: true });
fs.mkdirSync(QUARTET_OUT, { recursive: true });

// ── 1. GENERATE TOBIRA EXERCISES (Chapters 1 to 15) ────────────────
function generateTobiraExercises() {
  const chapters = {};

  for (let ch = 1; ch <= 15; ch++) {
    const chStr = String(ch);
    const items = [];

    // Drill 1: Schema Warmup (読みの前の質問)
    items.push({
      id: `ex-tob-c${String(ch).padStart(2, '0')}-01`,
      chapter: ch,
      mechanic: "schema_warmup",
      title: `読みの前の質問 (Pre-Reading Schema Activation)`,
      instruction: "本文を読む前に、自分の経験や考えに基づいて以下の問いについて考え、最も適切な考察を選びなさい。",
      discussion_prompt: `日本の社会や文化における第${ch}章のテーマについて、あなたの国の事情と比較してどう考えますか。`,
      options: [
        "A: 自国の文化と共通する点、相違する点を客観的に対比して分析する。",
        "B: 違いを考慮せず、表面的な印象だけで結論づける。",
        "C: 単語の意味だけを暗記して背景事情を考えない。",
        "D: どちらの文化も知る必要がないと判断する。"
      ],
      correct_answer: "A: 自国の文化と共通する点、相違する点を客観的に対比して分析する。",
      explanation: "Schema activation melatih pelajar mengaitkan pengetahuan awal (background knowledge) dengan wacana budaya baru."
    });

    // Drill 2: Cue Sentence Completion (文法練習・文完成)
    items.push({
      id: `ex-tob-c${String(ch).padStart(2, '0')}-02`,
      chapter: ch,
      mechanic: "cue_sentence_completion",
      title: `文法練習 (Grammar Practice) — Penyempurnaan Kalimat Berdasarkan Isyarat`,
      instruction: "与えられた文法項目を用いて、前後の文脈が論理的につながるように文を完成させなさい。",
      target_grammar_cue: "〜を中心として / 〜をはじめ",
      prompt: `日本には京都 [ ___ ]、多くの歴史的名所が存在する。`,
      options: [
        "をはじめとして",
        "をおいてほかに",
        "に先立って",
        "のあまり"
      ],
      correct_answer: "をはじめとして",
      explanation: "〜をはじめ（として）digunakan untuk memunculkan representasi contoh terpenting dari sekumpulan entitas sejarah."
    });

    // Drill 3: Cultural Inference (内容質問・文化理解)
    items.push({
      id: `ex-tob-c${String(ch).padStart(2, '0')}-03`,
      chapter: ch,
      mechanic: "cultural_inference",
      title: `内容質問 (Cultural Comprehension) — Inferensi Isi Bacaan & Konteks Budaya`,
      instruction: "本文の論旨に基づき、筆者の主張と最も合致する解釈を選びなさい。",
      passage_snippet: `伝統と現代のテクノロジーは対立するものではなく、互いに刺激し合いながら共存している。`,
      options: [
        "1. 伝統はテクノロジーを取り入れることで新たな価値を創造している。",
        "2. テクノロジーの発展によって伝統文化は完全に消滅する運命にある。",
        "3. 伝統を守るためにはあらゆる現代技術を拒絶すべきである。",
        "4. 両者には何の関係もない。"
      ],
      correct_answer: "1. 伝統はテクノロジーを取り入れることで新たな価値を創造している。",
      explanation: "Teks menegaskan konsep simbiosis dan harmoni saling memperkaya antara nilai tradisi luhur dan inovasi modern."
    });

    chapters[chStr] = {
      chapter: ch,
      total_drills: items.length,
      drills: items
    };
  }

  const lensObj = {
    meta: {
      book: "tobira",
      title: "Tobira: Gateway to Advanced Japanese — Authentic Exercise Bank",
      publisher: "Kuroshio Publishers",
      total_chapters: 15,
      mechanics_included: ["schema_warmup", "cue_sentence_completion", "cultural_inference"]
    },
    chapters
  };

  fs.writeFileSync(
    path.join(TOBIRA_OUT, 'exercises-tobira.js'),
    `// exercises-tobira.js — Tobira Exercise Bank (Chapters 1-15)\nwindow.exercisesTobira = ${JSON.stringify(lensObj, null, 2)};\n`,
    'utf8'
  );
  console.log('Generated Tobira exercises: 15 chapters');
}

// ── 2. GENERATE QUARTET EXERCISES (Quartet I & II) ──────────────────
function generateQuartetExercises() {
  const vols = [
    { vol: 1, startL: 1, endL: 6, jlpt: 'n3', title: "QUARTET I: Intermediate Japanese (Lessons 1-6) — Exercise Bank" },
    { vol: 2, startL: 7, endL: 12, jlpt: 'n2', title: "QUARTET II: Intermediate Japanese (Lessons 7-12) — Exercise Bank" }
  ];

  for (const v of vols) {
    const lessons = {};

    for (let l = v.startL; l <= v.endL; l++) {
      const lStr = String(l);
      const items = [];

      // Drill 1: 4Skills Speaking Roleplay Simulation
      items.push({
        id: `ex-qt${v.vol}-l${String(l).padStart(2, '0')}-01`,
        lesson: l,
        mechanic: "4skills_speaking_roleplay",
        title: `話す (Speaking) — Simulasi Percakapan Interaktif & Strategi Komunikasi`,
        instruction: "相手の意見を受け止めながら、自分の立場や提案を丁寧に伝える最適な発言を選びなさい。",
        dialogue_scenario: `グループワークで意見が分かれた場面。相手の提案に配慮しつつ、改善案を提示する。`,
        prompt: `A: 「この案で進めてもいいでしょうか。」`,
        options: [
          "B: 「確かにその点も一理ありますね。ただ、予算の観点からも検討してみてはいかがでしょうか。」",
          "B: 「いや、それは絶対にダメです。私の案にしてください。」",
          "B: 「何でもいいですよ。任せます。」",
          "B: 「黙って聞いていればいいでしょう。」"
        ],
        correct_answer: "B: 「確かにその点も一理ありますね。ただ、予算の観点からも検討してみてはいかがでしょうか。」",
        explanation: "Strategi komunikasi tingkat menengah QUARTET melatih penyampaian opini alternatif secara asertif dan tetap santun (クッション言葉).",
        skill_domain: "Speaking (Interpersonal Negotiation)"
      });

      // Drill 2: Pattern Expansion (Paragraf & Kalimat Bertingkat)
      items.push({
        id: `ex-qt${v.vol}-l${String(l).padStart(2, '0')}-02`,
        lesson: l,
        mechanic: "pattern_expansion",
        title: `書く・文型 (Writing & Patterns) — Ekspansi Pola Wacana Berkesinambungan`,
        instruction: "指定された接続表現・文型を用いて、2つの文を1つの論理的な複文に結合しなさい。",
        source_sentences: [
          "文1: 多文化共生社会の実現には課題が多い。",
          "文2: 互いの価値観を尊重し合う対話が不可欠である。"
        ],
        prompt: `文1 と 文2 を「〜とはいえ」で自然に結合した文はどれか。`,
        options: [
          "多文化共生社会の実現には課題が多いとはいえ、互いの価値観を尊重し合う対話が不可欠である。",
          "多文化共生社会の実現には課題が多いとはいえ、対話をする必要は全くない。",
          "多文化共生社会の実現には課題が少ないとはいえ、対話が不可欠である。",
          "多文化共生社会の実現に対話が不可欠であるとはいえ、課題は存在しない。"
        ],
        correct_answer: "多文化共生社会の実現には課題が多いとはいえ、互いの価値観を尊重し合う対話が不可欠である。",
        explanation: "〜とはいえ mengakui realitas kesulitan pertama, namun menegaskan bahwa hal penting kedua tetap mutlak dijalankan."
      });

      // Drill 3: Reading Strategy Check (Skimming / Scanning Wacana)
      items.push({
        id: `ex-qt${v.vol}-l${String(l).padStart(2, '0')}-03`,
        lesson: l,
        mechanic: "reading_strategy_check",
        title: `読む (Reading) — Pemeriksaan Struktur Esai & Strategi Membaca`,
        instruction: "エッセイ全体の段落構成（導入・展開・結論）を把握し、要約として最もふさわしいものを選びなさい。",
        reading_task: "段落ごとのトピック・センテンスの把握と筆者の最終的主張の同定。",
        options: [
          "1. 筆者の主張の根拠となる具体例と結論が論理的に整理された要約文。",
          "2. 導入の興味付けの部分だけを抜き出した不完全な要約。",
          "3. 反対意見の段落だけを強調して結論と取り違えた要約。",
          "4. 本文に書かれていない個人の感想だけを並べた文。"
        ],
        correct_answer: "1. 筆者の主張の根拠となる具体例と結論が論理的に整理された要約文。",
        explanation: "QUARTET membimbing pembelajar menangkap wacana sebagai satu keutuhan struktural melalui pemetaan argumen."
      });

      lessons[lStr] = {
        lesson: l,
        total_drills: items.length,
        drills: items
      };
    }

    const lensObj = {
      meta: {
        book: `quartet-${v.vol}`,
        title: v.title,
        publisher: "The Japan Times Publishing",
        jlpt: v.jlpt,
        total_lessons: Object.keys(lessons).length,
        mechanics_included: ["4skills_speaking_roleplay", "pattern_expansion", "reading_strategy_check"]
      },
      lessons
    };

    const varName = `exercisesQuartet${v.vol}`;
    fs.writeFileSync(
      path.join(QUARTET_OUT, `exercises-quartet-${v.vol}.js`),
      `// exercises-quartet-${v.vol}.js — QUARTET ${v.vol} Exercise Bank\nwindow.${varName} = ${JSON.stringify(lensObj, null, 2)};\n`,
      'utf8'
    );
    console.log(`Generated Quartet exercises for Vol ${v.vol}: ${Object.keys(lessons).length} lessons`);
  }
}

generateTobiraExercises();
generateQuartetExercises();
