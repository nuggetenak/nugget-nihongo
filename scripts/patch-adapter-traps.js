// ══════════════════════════════════════════════════════════════════
//  scripts/patch-adapter-traps.js
//  Enriches dynamic fallback common_pitfalls and adds diagnosticFeedback
//  to dynamic drills in src/lib/curriculum/lessonContentAdapter.ts
// ══════════════════════════════════════════════════════════════════

const fs = require('fs');
const path = require('path');

const targetFile = path.resolve(__dirname, '../src/lib/curriculum/lessonContentAdapter.ts');
let content = fs.readFileSync(targetFile, 'utf8');

// 1. Expand common_pitfalls
const oldPitfall = `    common_pitfalls: [
      {
        title: 'Jebakan Transfer Bahasa Indonesia',
        caseScenario: 'Menerapkan susunan kalimat bahasa Indonesia secara harfiah.',
        pitfallWarning: 'Menyusun kalimat dengan meletakkan predikat di tengah layaknya bahasa Indonesia.',
        rightSolution: \`Pastikan predikat dan pola \${primaryG?.pattern || 'utama'} selalu diletakkan di akhir kalimat.\`,
        explanation: 'Bahasa Jepang adalah bahasa dengan predikat di akhir kalimat (SOV).',
      },
    ],`;

const newPitfall = `    common_pitfalls: [
      {
        title: 'Jebakan Transfer SVO vs SOV Bahasa Indonesia',
        caseScenario: 'Menerapkan susunan kata bahasa Indonesia secara harfiah.',
        pitfallWarning: 'Menyusun kalimat dengan meletakkan predikat di tengah layaknya bahasa Indonesia.',
        rightSolution: \`Pastikan predikat dan pola \${primaryG?.pattern || 'utama'} selalu diletakkan di akhir kalimat.\`,
        explanation: 'Bahasa Jepang adalah bahasa dengan predikat di akhir kalimat (SOV), bukan SVO.',
      },
      {
        title: 'Jebakan Partikel Topik (は) vs Subjek (が)',
        caseScenario: 'Memilih partikel penanda pokok kalimat yang tepat.',
        pitfallWarning: 'Memakai partikel が sembarangan saat memperkenalkan topik pembicaraan umum.',
        rightSolution: 'Gunakan は untuk topik umum/perkenalan, dan gunakan が saat menekankan pilihan spesifik atau informasi baru.',
        explanation: 'Partikel は membatasi fokus tema pembicaraan ("mengenai ini..."), sedangkan が menunjuk subjek spesifik.',
      },
      {
        title: 'Pantangan Menempelkan Gelar Kehormatan pada Diri Sendiri',
        caseScenario: 'Menyebut nama diri sendiri dalam percakapan formal.',
        pitfallWarning: 'Menempelkan akhiran "-san" atau "-sama" pada nama sendiri saat berbicara.',
        rightSolution: 'Hanya gunakan "-san", "-sama", atau "-sensei" untuk orang lain.',
        explanation: 'Gelar kehormatan adalah bentuk penghormatan eksklusif untuk pihak luar.',
      },
    ],`;

// 2. Add diagnosticFeedback to dynamic drills
const oldDrill4And5 = `    {
      id: 'drill-4',
      type: 'trap_detect',
      instruction: 'Langkah 4 (Deteksi Kalimat Alami): Manakah susunan kalimat yang benar dan berterima secara alami?',
      options: shuffleOptions([
        \`\${authenticExample1.jp}\`,
        \`\${invertedSentence}\`,
        \`\${alteredParticleSentence}\`,
      ]),
      correctAnswer: \`\${authenticExample1.jp}\`,
      explanation: \`Kalimat yang benar dan wajar adalah: "\${authenticExample1.jp}" (\${authenticExample1.id}).\`,
    },
    {
      id: 'drill-5',
      type: 'response',
      instruction: \`Langkah 5 (Respons Situasional): Saat rekan bicara berkata "\${authenticExample1.jp}", bagaimana respons terbaik Anda?\`,
      options: shuffleOptions([
        'はい、よく わかりました。ありがとうございます。',
        'いいえ、だめです。',
        'さようなら。',
        'ごめんなさい。',
      ]),
      correctAnswer: 'はい、よく わかりました。ありがとうございます。',
      explanation: 'Memberikan respons sopan bahwa Anda menyimak dan memahami maksud rekan bicara dengan baik.',
    },`;

const newDrill4And5 = `    {
      id: 'drill-4',
      type: 'trap_detect',
      instruction: 'Langkah 4 (Deteksi Kalimat Alami): Manakah susunan kalimat yang benar dan berterima secara alami?',
      options: shuffleOptions([
        \`\${authenticExample1.jp}\`,
        \`\${invertedSentence}\`,
        \`\${alteredParticleSentence}\`,
      ]),
      correctAnswer: \`\${authenticExample1.jp}\`,
      explanation: \`Kalimat yang benar dan wajar adalah: "\${authenticExample1.jp}" (\${authenticExample1.id}).\`,
      diagnosticFeedback: {
        [\`\${invertedSentence}\`]: 'Jebakan SVO: Dalam bahasa Jepang predikat selalu di akhir, jangan terbalik seperti susunan bahasa Indonesia!',
        [\`\${alteredParticleSentence}\`]: 'Jebakan Partikel: Partikel ini tidak sesuai peran gramatikal atau mengubah arti kalimat menjadi janggal.',
      },
    },
    {
      id: 'drill-5',
      type: 'response',
      instruction: \`Langkah 5 (Respons Situasional): Saat rekan bicara berkata "\${authenticExample1.jp}", bagaimana respons terbaik Anda?\`,
      options: shuffleOptions([
        'はい、よく わかりました。ありがとうございます。',
        'いいえ、だめです。',
        'さようなら。',
        'ごめんなさい。',
      ]),
      correctAnswer: 'はい、よく わかりました。ありがとうございます。',
      explanation: 'Memberikan respons sopan bahwa Anda menyimak dan memahami maksud rekan bicara dengan baik.',
      diagnosticFeedback: {
        'いいえ、だめです。': 'Terlalu konfrontatif dan tidak sopan dalam etika interaksi sosial Jepang.',
        'さようなら。': 'Hanya digunakan saat perpisahan jangka panjang atau selesai jam kerja, bukan respons memahami ujaran.',
        'ごめんなさい。': 'Hanya digunakan saat meminta maaf atas kesalahan pribadi, bukan untuk merespons informasi positif.',
      },
    },`;

// Normalize newlines for search and replace
content = content.replace(/\r\n/g, '\n');
const normOldPitfall = oldPitfall.replace(/\r\n/g, '\n');
const normNewPitfall = newPitfall.replace(/\r\n/g, '\n');
const normOldDrills = oldDrill4And5.replace(/\r\n/g, '\n');
const normNewDrills = newDrill4And5.replace(/\r\n/g, '\n');

if (!content.includes(normOldPitfall)) {
  console.error('Could not find normOldPitfall in content');
  process.exit(1);
}
content = content.replace(normOldPitfall, normNewPitfall);

if (!content.includes(normOldDrills)) {
  console.error('Could not find normOldDrills in content');
  process.exit(1);
}
content = content.replace(normOldDrills, normNewDrills);

fs.writeFileSync(targetFile, content, 'utf8');
console.log('✅ Successfully patched common_pitfalls and diagnosticFeedback in lessonContentAdapter.ts!');
