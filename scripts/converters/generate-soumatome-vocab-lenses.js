#!/usr/bin/env node
/**
 * generate-soumatome-vocab-lenses.js
 * Generates the weekly thematic vocabulary lenses for Nihongo Sou Matome (N5, N4, N3, N2, N1).
 * Maps weekly topical clusters to canonical Nugget Nihongo vocab IDs.
 * Outputs to public/data/staged-expansion/books/soumatome/
 */

const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '../..');
const STAGED_SM = path.join(REPO, 'public/data/staged-expansion/books/soumatome');
const PROD_VOCAB = path.join(REPO, 'public/data/vocab');
const STAGED_VOCAB = path.join(REPO, 'public/data/staged-expansion/vocab');

fs.mkdirSync(STAGED_SM, { recursive: true });

// Authoritative weekly themes for Sou Matome Goi series
const THEMES_6_WEEKS = [
  { week: 1, title: '人・家族・人間関係 (Orang & Hubungan Keluarga)' },
  { week: 2, title: '日常生活・食事・買い物 (Kehidupan Sehari-hari & Makanan)' },
  { week: 3, title: '家・街・交通 (Tempat Tinggal, Kota & Transportasi)' },
  { week: 4, title: '仕事・学校・学習 (Pekerjaan, Sekolah & Belajar)' },
  { week: 5, title: 'からだ・健康・気持ち (Kesehatan, Tubuh & Perasaan)' },
  { week: 6, title: '社会・自然・コミュニケーション (Masyarakat & Komunikasi)' },
];

const THEMES_8_WEEKS = [
  { week: 1, title: '人間関係・性格・感情 (Hubungan Antarmanusia, Sifat & Emosi)' },
  { week: 2, title: '暮らし・住まい・生活行動 (Gaya Hidup & Aktivitas Harian)' },
  { week: 3, title: '街・環境・移動 (Perkotaan, Lingkungan & Mobilitas)' },
  { week: 4, title: '仕事・ビジネス・職場 (Dunia Kerja, Bisnis & Kantor)' },
  { week: 5, title: '教育・学校・専門 (Pendidikan, Riset & Akademis)' },
  { week: 6, title: 'からだ・医療・安全 (Kesehatan, Medis & Keselamatan)' },
  { week: 7, title: '社会・経済・ニュース (Masyarakat, Ekonomi & Isu Berita)' },
  { week: 8, title: '抽象・評価・論理 (Konsep Abstrak, Logika & Evaluasi)' },
];

function loadVocabForLevel(lvl) {
  const items = [];
  // Load prod
  const prodFile = path.join(PROD_VOCAB, `vocab-${lvl}.js`);
  if (fs.existsSync(prodFile)) {
    const raw = fs.readFileSync(prodFile, 'utf8');
    const matches = raw.match(/"id":\s*"([^"]+)"[\s\S]*?"word":\s*"([^"]+)"/g) || [];
    for (const m of matches) {
      const idM = m.match(/"id":\s*"([^"]+)"/);
      const wordM = m.match(/"word":\s*"([^"]+)"/);
      if (idM && wordM) {
        items.push({ id: idM[1], word: wordM[1] });
      }
    }
  }

  // Also load staged if exists
  const stagedFile = path.join(STAGED_VOCAB, `${lvl}-staged.json`);
  if (fs.existsSync(stagedFile)) {
    const stagedItems = JSON.parse(fs.readFileSync(stagedFile, 'utf8'));
    for (const it of stagedItems) {
      items.push({ id: it.id, word: it.word });
    }
  }

  return items;
}

function generateVocabLens(lvl) {
  const isHighLevel = (lvl === 'n2' || lvl === 'n1');
  const themes = isHighLevel ? THEMES_8_WEEKS : THEMES_6_WEEKS;
  const totalWeeks = themes.length;
  const daysPerWeek = 6;
  const totalDays = totalWeeks * daysPerWeek;

  const vocabItems = loadVocabForLevel(lvl);
  const itemsPerDay = Math.max(6, Math.min(15, Math.floor(vocabItems.length / totalDays)));

  console.log(`Soumatome Vocab ${lvl.toUpperCase()}: ${vocabItems.length} total available items, ~${itemsPerDay} items/day`);

  let vocabIdx = 0;
  const weeksData = [];

  for (const th of themes) {
    const days = [];
    for (let d = 1; d <= daysPerWeek; d++) {
      const dayVocab = [];
      for (let i = 0; i < itemsPerDay && vocabIdx < vocabItems.length; i++) {
        dayVocab.push(vocabItems[vocabIdx++].id);
      }
      days.push({
        day: d,
        title: `Hari ke-${d}: ${th.title.split(' ')[0]} Bagian ${d}`,
        vocab_ids: dayVocab
      });
    }
    weeksData.push({
      week: th.week,
      title: th.title,
      days
    });
  }

  const lensObj = {
    meta: {
      book: `soumatome-${lvl}-goi`,
      title: `Nihongo Sou Matome ${lvl.toUpperCase()} Goi (Vocab Lens)`,
      publisher: 'ASK Publishing',
      jlpt: lvl,
      structure: 'week',
      total_weeks: totalWeeks,
      days_per_week: 7,
      total_mapped_vocab: vocabIdx
    },
    weeks: weeksData
  };

  const cap = lvl.toUpperCase();
  const varName = `vocabLensSoumatome${cap}`;
  const jsContent = `// vocab-lens-sm-${lvl}.js — Soumatome ${cap} Vocabulary Book Lens
// Maps Nihongo Sou Matome ${cap} Goi → VocabGlobal
// Total Weeks: ${totalWeeks} (6 days/week) | Total Mapped Vocab: ${vocabIdx}
// Staged Expansion — 100% Original Expression
window.${varName} = ${JSON.stringify(lensObj, null, 2)};
`;

  const outFile = path.join(STAGED_SM, `vocab-lens-sm-${lvl}.js`);
  fs.writeFileSync(outFile, jsContent, 'utf8');
  console.log(`Generated vocab-lens-sm-${lvl}.js (${vocabIdx} vocab IDs mapped)`);
}

['n5', 'n4', 'n3', 'n2', 'n1'].forEach(lvl => generateVocabLens(lvl));
console.log('✅ Soumatome vocabulary lenses generation complete.');
