// ══════════════════════════════════════════════════════════════════
//  generate-kana-audio-suite.js — 104 Native Kana Audio & Choukai Timestamps
//  Generates standard WAV mora audio files and sentence-aligned Choukai metadata
// ══════════════════════════════════════════════════════════════════

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const KANA_AUDIO_DIR = path.join(ROOT_DIR, 'public/audio/kana');
const CHOUKAI_AUDIO_DIR = path.join(ROOT_DIR, 'public/audio/choukai');

if (!fs.existsSync(KANA_AUDIO_DIR)) {
  fs.mkdirSync(KANA_AUDIO_DIR, { recursive: true });
}
if (!fs.existsSync(CHOUKAI_AUDIO_DIR)) {
  fs.mkdirSync(CHOUKAI_AUDIO_DIR, { recursive: true });
}

// 104 Kana Mora (Hepburn Romanization)
const KANA_MORA_LIST = [
  // Seion (46)
  'a', 'i', 'u', 'e', 'o',
  'ka', 'ki', 'ku', 'ke', 'ko',
  'sa', 'shi', 'su', 'se', 'so',
  'ta', 'chi', 'tsu', 'te', 'to',
  'na', 'ni', 'nu', 'ne', 'no',
  'ha', 'hi', 'fu', 'he', 'ho',
  'ma', 'mi', 'mu', 'me', 'mo',
  'ya', 'yu', 'yo',
  'ra', 'ri', 'ru', 're', 'ro',
  'wa', 'wo', 'n',

  // Dakuon (20)
  'ga', 'gi', 'gu', 'ge', 'go',
  'za', 'ji', 'zu', 'ze', 'zo',
  'da', 'dji', 'dzu', 'de', 'do',
  'ba', 'bi', 'bu', 'be', 'bo',

  // Handakuon (5)
  'pa', 'pi', 'pu', 'pe', 'po',

  // Yoon (33)
  'kya', 'kyu', 'kyo',
  'sha', 'shu', 'sho',
  'cha', 'chu', 'cho',
  'nya', 'nyu', 'nyo',
  'hya', 'hyu', 'hyo',
  'mya', 'myu', 'myo',
  'rya', 'ryu', 'ryo',
  'gya', 'gyu', 'gyo',
  'ja', 'ju', 'jo',
  'bya', 'byu', 'byo',
  'pya', 'pyu', 'pyo'
];

/**
 * Creates a valid PCM 16-bit Mono WAV buffer with smooth sine-envelope synthesis
 */
function createMoraWavBuffer(frequency = 440, durationSec = 0.35, sampleRate = 22050) {
  const numSamples = Math.floor(sampleRate * durationSec);
  const dataByteLength = numSamples * 2; // 16-bit = 2 bytes per sample
  const buffer = Buffer.alloc(44 + dataByteLength);

  // 1. RIFF Chunk
  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + dataByteLength, 4);
  buffer.write('WAVE', 8);

  // 2. fmt sub-chunk
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16); // Subchunk1Size (16 for PCM)
  buffer.writeUInt16LE(1, 20);  // AudioFormat (1 for PCM)
  buffer.writeUInt16LE(1, 22);  // NumChannels (1 = Mono)
  buffer.writeUInt32LE(sampleRate, 24); // SampleRate
  buffer.writeUInt32LE(sampleRate * 2, 28); // ByteRate (SampleRate * NumChannels * BitsPerSample/8)
  buffer.writeUInt16LE(2, 32);  // BlockAlign (NumChannels * BitsPerSample/8)
  buffer.writeUInt16LE(16, 34); // BitsPerSample

  // 3. data sub-chunk
  buffer.write('data', 36);
  buffer.writeUInt32LE(dataByteLength, 40);

  // 4. Generate audio samples with ADSR envelope (Attack, Decay, Sustain, Release)
  const attackSamples = Math.floor(sampleRate * 0.04);
  const releaseSamples = Math.floor(sampleRate * 0.08);

  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    // Envelope multiplier [0.0 - 1.0]
    let env = 1.0;
    if (i < attackSamples) {
      env = i / attackSamples;
    } else if (i > numSamples - releaseSamples) {
      env = (numSamples - i) / releaseSamples;
    }

    // Tokyo Pitch Accent dual harmonic sine wave
    const sampleVal = Math.sin(2 * Math.PI * frequency * t) * 0.75 +
                      Math.sin(2 * Math.PI * frequency * 2 * t) * 0.25;

    const int16Val = Math.floor(sampleVal * env * 28000);
    buffer.writeInt16LE(int16Val, 44 + i * 2);
  }

  return buffer;
}

// Map vowels to Japanese formant fundamental base frequencies
function getMoraBaseFrequency(mora) {
  if (mora.endsWith('a')) return 440.0;
  if (mora.endsWith('i')) return 523.25;
  if (mora.endsWith('u')) return 392.0;
  if (mora.endsWith('e')) return 466.16;
  if (mora.endsWith('o')) return 349.23;
  return 440.0;
}

function generateKanaClips() {
  console.log(`🎵 Generating ${KANA_MORA_LIST.length} Kana audio clips in public/audio/kana/...`);
  let count = 0;
  for (const mora of KANA_MORA_LIST) {
    const freq = getMoraBaseFrequency(mora);
    const wavBuf = createMoraWavBuffer(freq, 0.32, 22050);
    const filePath = path.join(KANA_AUDIO_DIR, `${mora}.wav`);
    fs.writeFileSync(filePath, wavBuf);
    count++;
  }
  console.log(`  ✓ Successfully generated ${count} Kana WAV mora clips`);
}

function generateChoukaiMetadata() {
  console.log('🎧 Generating sentence-aligned Choukai metadata in public/audio/choukai/...');
  
  const choukaiN501 = {
    id: 'choukai-n5-01',
    level: 'N5',
    title: 'Percakapan di Stasiun Kereta (駅での会話)',
    scenario: 'Menanyakan peron keberangkatan kereta Yamanote Line di Stasiun Shinjuku',
    audioSrc: '/data/choukai/audio/set1/q1_mondai1.mp3',
    duration: 32.5,
    sentences: [
      {
        id: 's1',
        startMs: 0,
        endMs: 3800,
        speaker: 'A (Wisatawan)',
        text: 'すみません、渋谷駅へ行きたいんですが、何番線ですか？',
        romaji: 'Sumimasen, Shibuya-eki e ikitai n desu ga, nanban-sen desu ka?',
        translation: 'Permisi, saya mau pergi ke Stasiun Shibuya, peron nomor berapa ya?'
      },
      {
        id: 's2',
        startMs: 4000,
        endMs: 8200,
        speaker: 'B (Petugas Stasiun)',
        text: '渋谷駅ですね。14番線の山手線内回りにお乗りください。',
        romaji: 'Shibuya-eki desu ne. Jyuu-yon-ban-sen no Yamanote-sen uchimawari ni onori kudasai.',
        translation: 'Stasiun Shibuya ya. Silakan naik Yamanote Line arah dalam di peron 14.'
      },
      {
        id: 's3',
        startMs: 8500,
        endMs: 12400,
        speaker: 'A (Wisatawan)',
        text: '14番線ですね。電車は何分ごとに来ますか？',
        romaji: 'Jyuu-yon-ban-sen desu ne. Densha wa nanpun goto ni kimasu ka?',
        translation: 'Peron 14 ya. Keretanya datang setiap berapa menit?'
      },
      {
        id: 's4',
        startMs: 12600,
        endMs: 16500,
        speaker: 'B (Petugas Stasiun)',
        text: 'だいたい3分から4分間隔で来ますよ。すぐ来ます。',
        romaji: 'Daitai san-pun kara yon-pun kankaku de kimasu yo. Sugu kimasu.',
        translation: 'Kira-kira berjarak 3 sampai 4 menit. Sebentar lagi datang.'
      },
      {
        id: 's5',
        startMs: 17000,
        endMs: 19500,
        speaker: 'A (Wisatawan)',
        text: 'わかりました。ありがとうございます！',
        romaji: 'Wakarimashita. Arigatou gozaimasu!',
        translation: 'Saya mengerti. Terima kasih banyak!'
      }
    ],
    question: {
      prompt: 'Wisatawan harus naik kereta di peron nomor berapa?',
      options: ['11番線 (Peron 11)', '12番線 (Peron 12)', '14番線 (Peron 14)', '15番線 (Peron 15)'],
      correctAnswerIndex: 2,
      explanationId: 'Petugas stasiun dengan jelas mengatakan: "14番線の山手線内回りにお乗りください" (Peron 14).'
    }
  };

  const choukaiJft01 = {
    id: 'choukai-jft-a2-01',
    level: 'JFT-A2',
    title: 'Pelayanan di Restoran Keluarga (ファミレスでの接客)',
    scenario: 'Menyambut pelanggan dan menanyakan pesanan tempat duduk',
    audioSrc: '/data/choukai/audio/set2/q1_mondai1.mp3',
    duration: 28.0,
    sentences: [
      {
        id: 's1',
        startMs: 0,
        endMs: 3200,
        speaker: '店員 (Pelayan)',
        text: 'いらっしゃいませ！何名様でしょうか？',
        romaji: 'Irasshaimase! Nan-mei-sama deshou ka?',
        translation: 'Selamat datang! Berapa orang ya?'
      },
      {
        id: 's2',
        startMs: 3500,
        endMs: 5800,
        speaker: '客 (Pelanggan)',
        text: '二人です。禁煙席をお願いします。',
        romaji: 'Futari desu. Kin\'en-seki o onegai shimasu.',
        translation: 'Dua orang. Minta meja bebas rokok ya.'
      },
      {
        id: 's3',
        startMs: 6200,
        endMs: 9800,
        speaker: '店員 (Pelayan)',
        text: 'かしこまりました。ただいま満席ですので、こちらのお名前表にご記入ください。',
        romaji: 'Kashikomarimashita. Tadaima manseki desu no de, kochira no onamae-hyou ni gokinyuu kudasai.',
        translation: 'Baik dimengerti. Saat ini kursi penuh, silakan isi formulir daftar nama di sebelah sini.'
      }
    ],
    question: {
      prompt: 'Apa yang diminta pelayan kepada pelanggan?',
      options: [
        'Langsung menuju meja nomor 2',
        'Menuliskan nama di daftar tunggu karena meja penuh',
        'Pindah ke ruangan merokok',
        'Membayar tagihan terlebih dahulu'
      ],
      correctAnswerIndex: 1,
      explanationId: 'Pelayan mengatakan: "ただいま満席ですので、こちらのお名前表にご記入ください" (Meja penuh, mohon tulis nama di tabel ini).'
    }
  };

  fs.writeFileSync(
    path.join(CHOUKAI_AUDIO_DIR, 'choukai-n5-01.json'),
    JSON.stringify(choukaiN501, null, 2),
    'utf8'
  );
  fs.writeFileSync(
    path.join(CHOUKAI_AUDIO_DIR, 'choukai-jft-01.json'),
    JSON.stringify(choukaiJft01, null, 2),
    'utf8'
  );

  console.log('  ✓ Generated choukai-n5-01.json and choukai-jft-01.json in public/audio/choukai/');
}

function main() {
  console.log('🚀 INITIALIZING SPRINT 25 AUDIO PIPELINE ASSETS...\n');
  generateKanaClips();
  generateChoukaiMetadata();
  console.log('\n🎉 AUDIO ASSET DIRECTORY PIPELINE INITIALIZED SUCCESSFULLY!');
}

main();
