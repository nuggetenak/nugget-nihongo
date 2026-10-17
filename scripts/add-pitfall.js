const fs = require('fs');
const path = require('path');

const p = path.resolve(__dirname, '../src/lib/curriculum/lessonContentAdapter.ts');
let content = fs.readFileSync(p, 'utf8');

const target = "          title: 'Ja Arimasen vs Bukan Bahasa Indonesia',";
const addition = `        {
          title: 'Menjawab Pertanyaan Negatif dengan Iie Terbalik',
          caseScenario: 'Menjawab pertanyaan negatif sopan seperti "Nihonjin ja arimasen ka?".',
          pitfallWarning: 'Menjawab "Iie" dengan maksud mengiyakan sangkalan lawan bicara ala logika bahasa Indonesia.',
          rightSolution: 'Menjawab "Hai, Nihonjin ja arimasen" (Benar, saya bukan orang Jepang).',
          explanation:
            'Dalam bahasa Jepang, "Hai" berarti membenarkan premis kalimat lawan bicara, sedangkan "Iie" berarti menyangkal premis kalimat lawan bicara.',
        },
`;

const endOfFirstPitfall = `        {
          title: 'Ja Arimasen vs Bukan Bahasa Indonesia',
          caseScenario: 'Menerapkan susunan kalimat bahasa Indonesia secara harfiah.',
          pitfallWarning: '"わたしは じゃない がくせい。" (Susunan kata salah)',
          rightSolution: '"わたしは がくせいじゃ ありません。" (Susunan kata benar)',
          explanation:
            'Di bahasa Jepang, penanda negatif "ja arimasen" SELALU ditaruh di belakang kata bendanya, bukan di depannya.',
        },`;

// Find where end of first pitfall is
const idx = content.indexOf(target);
if (idx === -1) {
  console.error('Target not found');
  process.exit(1);
}

// Find next closing brace after target
const closeBraceIdx = content.indexOf('        },', idx);
if (closeBraceIdx === -1) {
  console.error('Closing brace not found');
  process.exit(1);
}

const insertionPoint = closeBraceIdx + '        },'.length;
content = content.slice(0, insertionPoint) + '\n' + addition + content.slice(insertionPoint);

fs.writeFileSync(p, content, 'utf8');
console.log('Successfully added 2nd pitfall to les-n5-u01-02');
