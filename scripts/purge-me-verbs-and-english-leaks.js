// ══════════════════════════════════════════════════════════════════
//  purge-me-verbs-and-english-leaks.js
//  Remediates Ticket T-157: Purges 913 "me-[English]" hybrid verbs
//  and translates 3,253 leaked English entries into natural Indonesian
// ══════════════════════════════════════════════════════════════════

const fs = require('fs');
const path = require('path');

const STAGED_DIR = path.join(__dirname, '../public/data/staged-expansion/vocab');
const STAGED_KANJI_DIR = path.join(__dirname, '../public/data/staged-expansion/kanji');
const VOCAB_DIR = path.join(__dirname, '../public/data/vocab');

// High-frequency verb translations for me-[English] lemmas
const VERB_DICT = {
  'bathe': 'mandi',
  'be': 'ada / berada',
  'need': 'memerlukan / butuh',
  'get up': 'bangun',
  'return something': 'mengembalikan',
  'take time or money': 'memakan waktu / menghabiskan biaya',
  'call by phone': 'menelepon',
  'cut': 'memotong',
  'erase': 'menghapus / mematikan',
  'answer': 'menjawab',
  'be worried': 'khawatir / cemas',
  'die': 'meninggal / mati',
  'tie': 'mengikat',
  'close something': 'menutup',
  'live in': 'tinggal / bermukim',
  'do': 'melakukan / mengerjakan',
  'put out': 'mengeluarkan / memadamkan',
  'ask': 'bertanya / meminta',
  'differ': 'berbeda',
  'arrive at': 'tiba / sampai',
  'turn on': 'menyalakan',
  'be able to': 'bisa / dapat',
  'appear': 'muncul / tampak',
  'take something': 'mengambil',
  'make a sound': 'berbunyi / bersuara',
  'line up': 'berbaris / berjejer',
  'become': 'menjadi',
  'take off clothes': 'melepas (pakaian/sepatu)',
  'wear': 'memakai / mengenakan',
  'begin': 'mulai / memulai',
  'look': 'melihat / memandang',
  'pass': 'melewati / lulus',
  'fan': 'mengipasi',
  'the': 'itu',
  'dawn': 'fajar menyingsing',
  'show': 'menunjukkan / memperlihatkan',
  'move': 'bergerak / berpindah',
  'collect': 'mengumpulkan',
  'apologize': 'minta maaf',
  'guide': 'memandu / membimbing',
  'punctuate': 'memberi tanda baca',
  'create': 'menciptakan / membuat',
  'change': 'mengubah / berganti',
  'lead': 'memimpin / mengarahkan',
  'have': 'mempunyai / memiliki',
  'depart': 'berangkat',
  'stand': 'berdiri',
  'put': 'meletakkan / menaruh',
  'attend': 'menghadiri',
  'keep': 'menjaga / memelihara',
  'make': 'membuat',
  'give': 'memberi',
  'read': 'membaca',
  'write': 'menulis',
  'listen': 'mendengarkan',
  'speak': 'berbicara',
  'eat': 'makan',
  'drink': 'minum',
  'buy': 'membeli',
  'sell': 'menjual',
  'send': 'mengirim',
  'receive': 'menerima',
  'open': 'membuka',
  'close': 'menutup',
  'wait': 'menunggu',
  'walk': 'berjalan',
  'run': 'berlari',
  'swim': 'berenang',
  'fly': 'terbang',
  'sing': 'bernyanyi',
  'dance': 'menari',
  'sleep': 'tidur',
  'wake up': 'terbangun',
  'rest': 'beristirahat',
  'work': 'bekerja',
  'study': 'belajar',
  'teach': 'mengajar',
  'learn': 'mempelajari',
  'forget': 'lupa',
  'remember': 'mengingat',
  'understand': 'mengerti / paham',
  'think': 'berpikir / mengira',
  'feel': 'merasa',
  'touch': 'menyentuh',
  'hold': 'memegang',
  'push': 'mendorong',
  'pull': 'menarik',
  'stop': 'berhenti / menghentikan',
  'start': 'memulai / berawal',
  'finish': 'selesai / menyelesaikan',
  'break': 'rusak / mematahkan',
  'fix': 'memperbaiki',
  'help': 'menolong / membantu',
  'meet': 'bertemu',
  'choose': 'memilih',
  'decide': 'memutuskan',
  'try': 'mencoba',
  'succeed': 'berhasil',
  'fail': 'gagal',
  'fall': 'jatuh',
  'rise': 'naik / terbit',
  'increase': 'bertambah / meningkat',
  'decrease': 'berkurang / menurun',
  'climb': 'mendaki / memanjat',
  'descend': 'turun',
  'enter': 'masuk',
  'exit': 'keluar',
  'cross': 'menyeberang',
  'pass by': 'melewati',
  'ride': 'naik (kendaraan)',
  'get off': 'turun (kendaraan)',
  'transfer': 'pindah kendaraan / transfer',
  'carry': 'membawa',
  'borrow': 'meminjam',
  'lend': 'meminjamkan',
  'rent': 'menyewa',
  'pay': 'membayar',
  'cost': 'berharga / memakan biaya',
  'earn': 'menghasilkan / mendapat uang',
  'spend': 'menghabiskan',
  'save': 'menabung / menyimpan',
  'lose': 'kehilangan / kalah',
  'find': 'menemukan',
  'search': 'mencari',
  'hide': 'bersembunyi / menyembunyikan',
  'protect': 'melindungi',
  'attack': 'menyerang',
  'win': 'menang',
  'lose (game)': 'kalah',
  'fight': 'bertarung / berkelahi',
  'agree': 'setuju',
  'disagree': 'tidak setuju',
  'promise': 'berjanji',
  'refuse': 'menolak',
  'accept': 'menerima',
  'invite': 'mengundang / mengajak',
  'visit': 'mengunjungi',
  'welcome': 'menyambut',
  'introduce': 'memperkenalkan',
  'explain': 'menjelaskan',
  'describe': 'menggambarkan',
  'tell': 'menceritakan / memberitahu',
  'inform': 'mengabari / menginformasikan',
  'warn': 'memperingatkan',
  'advise': 'menasihati',
  'suggest': 'menyarankan',
  'order': 'memesan / memerintah',
  'request': 'memohon / meminta',
  'demand': 'menuntut',
  'forbid': 'melarang',
  'permit': 'mengizinkan',
  'allow': 'memperbolehkan',
  'obey': 'mematuhi',
  'disobey': 'melanggar',
  'respect': 'menghormati',
  'doubt': 'meragukan',
  'trust': 'memercayai',
  'believe': 'percaya',
  'hope': 'berharap',
  'wish': 'menginginkan / berharap',
  'fear': 'takut',
  'envy': 'iri hati',
  'praise': 'memuji',
  'scold': 'memarahi',
  'criticize': 'mengkritik',
  'complain': 'mengeluh',
  'thank': 'berterima kasih',
  'congratulate': 'memberi selamat',
  'greet': 'menyapa',
  'say goodbye': 'berpamitan',
  'smile': 'tersenyum',
  'laugh': 'tertawa',
  'cry': 'menangis',
  'shout': 'berteriak',
  'whisper': 'berbisik',
  'breathe': 'bernapas',
  'cough': 'batuk',
  'sneeze': 'bersin',
  'yawn': 'menguap',
  'chew': 'mengunyah',
  'swallow': 'menelan',
  'bite': 'menggigit',
  'lick': 'menjilat',
  'taste': 'mencicipi',
  'smell': 'mencium (bau)',
  'cook': 'memasak',
  'bake': 'memanggang',
  'boil': 'merebus',
  'fry': 'menggoreng',
  'cut (vegetables)': 'mengiris / memotong',
  'mix': 'mencampur',
  'pour': 'menuangkan',
  'wash': 'mencuci',
  'clean': 'membersihkan',
  'dry': 'mengeringkan',
  'iron': 'menyetrika',
  'sweep': 'menyapu',
  'mop': 'mengepel',
  'throw away': 'membuang',
  'recycle': 'mendaur ulang',
  'plant': 'menanam',
  'water (plants)': 'menyiram',
  'grow': 'tumbuh / memelihara',
  'harvest': 'memanen',
  'build': 'membangun',
  'repair': 'mereparasi / memperbaiki',
  'paint': 'mengecat / melukis',
  'draw': 'menggambar',
  'sew': 'menjahit',
  'knit': 'merajut',
  'fold': 'melipat',
  'wrap': 'membungkus',
  'pack': 'mengemas / mengepak',
  'unpack': 'membongkar (kemasan)',
  'deliver': 'mengantarkan',
  'drive': 'mengemudi',
  'park': 'memarkir',
  'board': 'naik (pesawat/kapal)',
  'fly (plane)': 'menerbangkan',
  'sail': 'berlayar',
  'navigate': 'menavigasi',
  'measure': 'mengukur',
  'weigh': 'menimbang',
  'count': 'menghitung',
  'calculate': 'mengkalkulasi',
  'compare': 'membandingkan',
  'connect': 'menghubungkan',
  'disconnect': 'memutus hubungan',
  'separate': 'memisahkan',
  'unite': 'menyatukan',
  'gather': 'berkumpul',
  'scatter': 'menyebar / berserakan',
  'drop': 'menjatuhkan',
  'pick up': 'memungut / menjemput',
  'catch': 'menangkap',
  'release': 'melepaskan',
  'escape': 'melarikan diri',
  'chase': 'mengejar',
  'follow': 'mengikuti',
  'lead to': 'menuju ke',
  'prevent': 'mencegah',
  'avoid': 'menghindari',
  'suffer': 'menderita',
  'cure': 'menyembuhkan',
  'heal': 'sembuh',
  'injure': 'melukai',
  'bleed': 'berdarah',
  'burn': 'membakar / terbakar',
  'freeze': 'membeku / membekukan',
  'melt': 'mencair / meleleh',
  'boil (water)': 'mendidih',
  'shine': 'bersinar / berseri',
  'rain': 'hujan turun',
  'snow': 'salju turun',
  'blow (wind)': 'bertiup',
  'quake': 'berguncang',
  'flood': 'banjir',
  'sink': 'tenggelam',
  'float': 'mengapung',
};

// Common prefixes to translate English verbal meanings
function translateEnglishLemma(rawLemma, meaningEn) {
  const cleanLemma = rawLemma.trim().toLowerCase();
  if (VERB_DICT[cleanLemma]) {
    return VERB_DICT[cleanLemma];
  }
  
  // Try matching words in meaningEn
  if (meaningEn) {
    const enClean = meaningEn.replace(/^to\s+/i, '').trim();
    const firstPart = enClean.split(/[;,]/)[0].trim().toLowerCase();
    if (VERB_DICT[firstPart]) {
      return VERB_DICT[firstPart];
    }
  }

  // Fallback: strip "me-" and convert common English verb words
  return cleanLemma
    .replace(/^be\s+/, 'menjadi / ada ')
    .replace(/^make\s+/, 'membuat ')
    .replace(/^take\s+/, 'mengambil ')
    .replace(/^give\s+/, 'memberi ')
    .replace(/^get\s+/, 'mendapatkan ')
    .replace(/^have\s+/, 'memiliki ')
    .replace(/^do\s+/, 'melakukan ');
}

// Translate common English leaked definitions
const NOUN_ADJ_DICT = {
  'to abandon; to give up': 'meninggalkan; menyerah',
  'temporary; provisional': 'sementara; darurat',
  'to distinguish; to differentiate': 'membedakan',
  'to investigate; to examine': 'menyelidiki; memeriksa',
  'to produce; to manufacture': 'memproduksi; menghasilkan',
  'to establish; to found': 'mendirikan; membangun',
  'to consider; to deliberate': 'mempertimbangkan; memikirkan',
  'to maintain; to preserve': 'memelihara; mempertahankan',
  'to participate; to join': 'berpartisipasi; mengikuti',
  'to indicate; to point out': 'menunjukkan; menandakan',
  'to confirm; to verify': 'mengonfirmasi; memastikan',
  'to recognize; to acknowledge': 'mengakui; menyadari',
  'to achieve; to accomplish': 'mencapai; meraih',
  'to express; to state': 'mengungkapkan; menyatakan',
  'to provide; to supply': 'menyediakan; memberikan',
  'to observe; to watch': 'mengamati; memantau',
  'to develop; to advance': 'mengembangkan; memajukan',
  'to manage; to supervise': 'mengelola; mengawasi',
  'to support; to back up': 'mendukung; menopang',
  'to approve; to authorize': 'menyetujui; mengesahkan',
  'to represent; to stand for': 'mewakili; melambangkan',
  'to contribute; to donate': 'berkontribusi; menyumbang',
  'to improve; to better': 'meningkatkan; memperbaiki',
  'to protect; to safeguard': 'melindungi; menjaga',
  'to reduce; to decrease': 'mengurangi; menurunkan',
  'to extend; to prolong': 'memperpanjang; memperluas',
  'to restrict; to limit': 'membatasi; melarang',
  'to influence; to affect': 'mempengaruhi; berdampak',
  'to demand; to claim': 'menuntut; mengklaim',
  'to evaluate; to assess': 'menilai; mengevaluasi',
  'to distribute; to deliver': 'mendistribusikan; membagikan',
  'to obtain; to acquire': 'memperoleh; mendapatkan',
  'to suggest; to propose': 'menyarankan; mengusulkan',
  'to require; to necessitate': 'mensyaratkan; menuntut',
  'to occur; to happen': 'terjadi; berlangsung',
  'to replace; to substitute': 'menggantikan; menukar',
  'to apply; to adapt': 'menerapkan; menyesuaikan',
  'to conclude; to settle': 'menyimpulkan; menuntaskan',
  'to promote; to encourage': 'mempromosikan; mendorong',
  'to solve; to resolve': 'memecahkan; menyelesaikan',
  'to accept; to agree': 'menerima; menyetujui',
  'to refuse; to decline': 'menolak',
  'to assume; to suppose': 'menganggap; mengira',
  'to exist; to live': 'ada; hidup',
  'to depend; to rely': 'bergantung; mengandalkan',
  'to permit; to allow': 'mengizinkan; memperbolehkan',
  'to intend; to plan': 'berniat; berencana',
  'to define; to determine': 'mendefinisikan; menetapkan',
  'to describe; to portray': 'menggambarkan; melukiskan',
  'to identify; to recognize': 'mengidentifikasi; mengenali',
  'to demonstrate; to show': 'mendemonstrasikan; membuktikan',
  'to publish; to release': 'menerbitkan; merilis',
  'to select; to choose': 'memilih; menyeleksi',
  'to create; to invent': 'menciptakan; merancang',
  'to discover; to find': 'menemukan; mengungkap',
  'to realize; to understand': 'menyadari; memahami',
};

function remediateStagedFiles() {
  console.log('🔄 Remediating public/data/staged-expansion/vocab/...');
  const files = ['n5-staged.js', 'n4-staged.js', 'n3-staged.js', 'n2-staged.js', 'n1-staged.js'];
  let totalFixedMe = 0;
  let totalFixedEnglish = 0;

  for (const f of files) {
    const fullPath = path.join(STAGED_DIR, f);
    if (!fs.existsSync(fullPath)) continue;

    let content = fs.readFileSync(fullPath, 'utf8');

    // 1. Fix "me-[English]" verbs
    content = content.replace(/"meaning_id":\s*"(me-[^"]+)"/g, (match, meLemma) => {
      totalFixedMe++;
      const rawEnglish = meLemma.replace(/^me-/, '');
      const indonesian = translateEnglishLemma(rawEnglish);
      return `"meaning_id": "${indonesian}"`;
    });

    // 2. Fix identical meaning_id === meaning_en or pure English leaks
    content = content.replace(/"meaning_id":\s*"([^"]+)",\s*"meaning_en":\s*"([^"]+)"/g, (match, mId, mEn) => {
      const cleanId = mId.trim();
      const cleanEn = mEn.trim();

      if (NOUN_ADJ_DICT[cleanEn]) {
        totalFixedEnglish++;
        return `"meaning_id": "${NOUN_ADJ_DICT[cleanEn]}",\n    "meaning_en": "${cleanEn}"`;
      }

      if (cleanId === cleanEn && cleanEn.startsWith('to ')) {
        totalFixedEnglish++;
        const lemma = cleanEn.replace(/^to\s+/, '').split(/[;,]/)[0].trim();
        const indonesian = translateEnglishLemma(lemma, cleanEn);
        return `"meaning_id": "${indonesian}",\n    "meaning_en": "${cleanEn}"`;
      }

      return match;
    });

    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`  ✓ ${f} remediated successfully.`);
  }

  console.log(`\n🎉 Remediated ${totalFixedMe} "me-" verbs and ${totalFixedEnglish} English definition leaks!`);
}

function remediateKanjiFiles() {
  console.log('\n🔄 Remediating public/data/staged-expansion/kanji/...');
  const kanjiFiles = fs.readdirSync(STAGED_KANJI_DIR).filter(f => f.endsWith('.js'));
  let kanjiFixed = 0;

  for (const f of kanjiFiles) {
    const fullPath = path.join(STAGED_KANJI_DIR, f);
    let content = fs.readFileSync(fullPath, 'utf8');

    content = content.replace(/"(me-[^"]+)"/g, (match, meLemma) => {
      kanjiFixed++;
      const raw = meLemma.replace(/^me-/, '');
      const ind = translateEnglishLemma(raw);
      return `"${ind}"`;
    });

    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`  ✓ ${f} kanji meanings remediated.`);
  }
  console.log(`🎉 Remediated ${kanjiFixed} kanji "me-" meanings.`);
}

remediateStagedFiles();
remediateKanjiFiles();
