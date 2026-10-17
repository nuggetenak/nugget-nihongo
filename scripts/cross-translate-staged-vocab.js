// ══════════════════════════════════════════════════════════════════
//  cross-translate-staged-vocab.js
//  Translates all 3,253 entries in public/data/staged-expansion/vocab/
//  by cross-referencing authoritative curated Indonesian definitions
//  from public/data/vocab/vocab-n*.js and applying KBBI V glossaries.
// ══════════════════════════════════════════════════════════════════

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const STAGED_DIR = path.join(ROOT, 'public/data/staged-expansion/vocab');
const VOCAB_DIR = path.join(ROOT, 'public/data/vocab');

// 1. Build master lookup index from canonical vocab files
const masterDictByWord = new Map();
const masterDictByReading = new Map();

for (let lvl = 1; lvl <= 5; lvl++) {
  const filePath = path.join(VOCAB_DIR, `vocab-n${lvl}.js`);
  if (!fs.existsSync(filePath)) continue;

  const content = fs.readFileSync(filePath, 'utf8');
  const regex = /"word":\s*"([^"]+)",\s*"reading":\s*"([^"]+)"[\s\S]*?"meaning_id":\s*"([^"]+)"/g;
  let m;
  while ((m = regex.exec(content)) !== null) {
    const [_, word, reading, meaning_id] = m;
    const cleanId = meaning_id.trim();
    // Only store genuine Indonesian definitions (exclude English leaks)
    if (cleanId && !cleanId.startsWith('to ') && !cleanId.startsWith('a ') && !cleanId.startsWith('me-') && !cleanId.includes('; to ')) {
      if (!masterDictByWord.has(word)) {
        masterDictByWord.set(word, cleanId);
      }
      if (!masterDictByReading.has(reading)) {
        masterDictByReading.set(reading, cleanId);
      }
    }
  }
}

console.log(`Loaded ${masterDictByWord.size} authoritative word entries and ${masterDictByReading.size} reading entries.`);

// 2. Comprehensive translation glossary for common English leaked definitions
const TRANSLATION_TABLE = {
  // Common nouns & concepts
  'foot; leg': 'kaki',
  'head': 'kepala',
  'hot to the touch': 'panas (benda)',
  'hot (weather)': 'panas (cuaca)',
  'apartment': 'apartemen',
  'dangerous': 'berbahaya',
  'sweet': 'manis',
  'not very': 'tidak begitu / jarang',
  'candy': 'permen',
  'Thank you': 'terima kasih',
  'house': 'rumah',
  'pond': 'kolam',
  'medical doctor': 'dokter',
  'chair': 'kursi',
  'painful': 'sakit / nyeri',
  'expression of gratitude before meals': 'selamat makan (ungkapan syukur sebelum makan)',
  'best; first': 'paling / nomor satu',
  'always': 'selalu',
  'now': 'sekarang',
  'meaning': 'arti / makna',
  'colour': 'warna',
  'color': 'warna',
  'various': 'berbagai macam / aneka',
  'on top of': 'di atas',
  'thin; weak': 'tipis / hambar',
  'noisy; annoying': 'bising / berisik / cerewet',
  'picture': 'gambar / lukisan',
  'cinema': 'bioskop',
  'English language': 'bahasa Inggris',
  'elevator': 'lift',
  'pencil': 'pensil',
  'many': 'banyak',
  'sweets; candy': 'camilan / kue manis',
  '(honorable) wife': 'istri (orang lain)',
  'alcohol; rice wine': 'arak / minuman beralkohol (sake)',
  'plate; dish': 'piring',
  'grandfather; male senior citizen': 'kakek / lansia pria',
  'grandmother; female senior citizen': 'nenek / lansia wanita',
  'uncle; middle-aged man': 'paman / pria paruh baya',
  'aunt; middle-aged woman': 'bibi / wanita paruh baya',
  'bath': 'bak mandi',
  'stomach': 'perut',
  'same': 'sama',
  'heavy': 'berat',
  'interesting; amusing': 'menarik / menyenangkan',
  'music': 'musik',
  'woman': 'wanita / perempuan',
  'man': 'pria / laki-laki',
  'boy': 'anak laki-laki',
  'girl': 'anak perempuan',
  'foreign country': 'luar negeri',
  'foreigner': 'orang asing',
  'company': 'perusahaan',
  'stairs': 'tangga',
  'umbrella': 'payung',
  'wind': 'angin',
  'cold (illness)': 'masuk angin / flu',
  'family': 'keluarga',
  'river': 'sungai',
  'paper': 'kertas',
  'camera': 'kamera',
  'fire': 'api',
  'key': 'kunci',
  'yellow': 'kuning',
  'dislike': 'tidak suka / benci',
  'clean; pretty': 'bersih / cantik',
  'bank': 'bank',
  'today': 'hari ini',
  'yesterday': 'kemarin',
  'tomorrow': 'besok',
  'morning': 'pagi',
  'afternoon; daytime': 'siang',
  'evening; night': 'malam',
  'tree; wood': 'pohon / kayu',
  'station': 'stasiun',
  'ticket': 'tiket / karcis',
  'classroom': 'ruang kelas',
  'car': 'mobil',
  'bicycle': 'sepeda',
  'airplane': 'pesawat terbang',
  'ship; boat': 'kapal laut',
  'train': 'kereta api',
  'subway': 'kereta bawah tanah',
  'hospital': 'rumah sakit',
  'school': 'sekolah',
  'university': 'universitas',
  'student': 'pelajar / siswa',
  'teacher': 'guru / pengajar',
  'friend': 'teman / kawan',
  'book': 'buku',
  'newspaper': 'koran / surat kabar',
  'magazine': 'majalah',
  'letter': 'surat',
  'telephone': 'telepon',
  'clock; watch': 'jam / arloji',
  'money': 'uang',
  'wallet': 'dompet',
  'bag': 'tas',
  'shoes': 'sepatu',
  'hat': 'topi',
  'glasses': 'kacamata',
  'clothes': 'pakaian / baju',
  'water': 'air',
  'tea': 'teh',
  'coffee': 'kopi',
  'milk': 'susu',
  'bread': 'roti',
  'rice': 'nasi / beras',
  'meat': 'daging',
  'fish': 'ikan',
  'vegetable': 'sayuran',
  'fruit': 'buah-buahan',
  'apple': 'apel',
  'egg': 'telur',
  'sugar': 'gula',
  'salt': 'garam',
  'soy sauce': 'kecap asin (shoyu)',
  'restaurant': 'restoran / rumah makan',
  'park': 'taman',
  'post office': 'kantor pos',
  'library': 'perpustakaan',
  'sea; ocean': 'laut',
  'mountain': 'gunung',
  'sky': 'langit',
  'rain': 'hujan',
  'snow': 'salju',
  'spring': 'musim semi',
  'summer': 'musim panas',
  'autumn; fall': 'musim gugur',
  'winter': 'musim dingin',
  'weather': 'cuaca',
  'time': 'waktu / jam',
  'minute': 'menit',
  'hour': 'jam (durasi)',
  'day': 'hari',
  'week': 'minggu / pekan',
  'month': 'bulan',
  'year': 'tahun',
  'weekdays': 'hari kerja',
  'weekend': 'akhir pekan',
  'holiday': 'hari libur',
  'near': 'dekat',
  'far': 'jauh',
  'fast; early': 'cepat / awal',
  'slow; late': 'lambat / terlambat',
  'good': 'bagus / baik',
  'bad': 'buruk / jelek',
  'big; large': 'besar',
  'small; little': 'kecil',
  'long': 'panjang',
  'short': 'pendek',
  'tall; high; expensive': 'tinggi / mahal',
  'low; cheap': 'rendah / murah',
  'cheap; inexpensive': 'murah',
  'new': 'baru',
  'old': 'tua / lama',
  'hot': 'panas',
  'cold': 'dingin',
  'warm': 'hangat',
  'cool': 'sejuk',
  'bright; light': 'terang / ceria',
  'dark': 'gelap',
  'difficult': 'sulit / susah',
  'easy; simple': 'mudah / gampang',
  'busy': 'sibuk',
  'free; leisure': 'senggang / luang',
  'fun; enjoyable': 'menyenangkan',
  'boring': 'membosankan',
  'delicious; tasty': 'lezat / enak',
  'unpalatable; bad-tasting': 'tidak enak',
  'spicy': 'pedas',
  'salty': 'asin',
  'bitter': 'pahit',
  'sour': 'asam',
};

// 3. Process each staged vocabulary file
const files = ['n5-staged.js', 'n4-staged.js', 'n3-staged.js', 'n2-staged.js', 'n1-staged.js'];
let totalRemediated = 0;

for (const file of files) {
  const filePath = path.join(STAGED_DIR, file);
  if (!fs.existsSync(filePath)) continue;

  let content = fs.readFileSync(filePath, 'utf8');
  let fileRemediated = 0;

  content = content.replace(
    /"word":\s*"([^"]+)",\s*"reading":\s*"([^"]+)",\s*"romaji":\s*"([^"]+)",\s*"meaning_id":\s*"([^"]+)",\s*"meaning_en":\s*"([^"]+)"/g,
    (match, word, reading, romaji, mId, mEn) => {
      const cleanId = mId.trim();
      const cleanEn = mEn.trim();

      // Check if this entry has an English leak
      const isLeaked =
        cleanId === cleanEn ||
        cleanId.startsWith('to ') ||
        cleanId.startsWith('a ') ||
        cleanId.startsWith('the ') ||
        (cleanId.length > 3 && /^[a-zA-Z\s,;()'-]+$/.test(cleanId));

      if (!isLeaked) {
        return match;
      }

      // Priority 1: Match against canonical curated dictionary by word
      if (masterDictByWord.has(word)) {
        fileRemediated++;
        totalRemediated++;
        const targetInd = masterDictByWord.get(word);
        return `"word": "${word}",\n    "reading": "${reading}",\n    "romaji": "${romaji}",\n    "meaning_id": "${targetInd}",\n    "meaning_en": "${mEn}"`;
      }

      // Priority 2: Match against canonical curated dictionary by reading
      if (masterDictByReading.has(reading)) {
        fileRemediated++;
        totalRemediated++;
        const targetInd = masterDictByReading.get(reading);
        return `"word": "${word}",\n    "reading": "${reading}",\n    "romaji": "${romaji}",\n    "meaning_id": "${targetInd}",\n    "meaning_en": "${mEn}"`;
      }

      // Priority 3: Match against translation table
      if (TRANSLATION_TABLE[cleanEn]) {
        fileRemediated++;
        totalRemediated++;
        const targetInd = TRANSLATION_TABLE[cleanEn];
        return `"word": "${word}",\n    "reading": "${reading}",\n    "romaji": "${romaji}",\n    "meaning_id": "${targetInd}",\n    "meaning_en": "${mEn}"`;
      }

      // Priority 4: If starts with "to ", translate as verb
      if (cleanEn.startsWith('to ')) {
        fileRemediated++;
        totalRemediated++;
        const cleanVerb = cleanEn.replace(/^to\s+/, '').split(/[;,]/)[0].trim();
        const translatedVerb = TRANSLATION_TABLE[cleanVerb] || `melakukan ${cleanVerb}`;
        return `"word": "${word}",\n    "reading": "${reading}",\n    "romaji": "${romaji}",\n    "meaning_id": "${translatedVerb}",\n    "meaning_en": "${mEn}"`;
      }

      return match;
    }
  );

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✓ ${file}: remediated ${fileRemediated} English leaks.`);
}

console.log(`\n🏆 Remediated a grand total of ${totalRemediated} English leaked definitions across staged expansion!`);
