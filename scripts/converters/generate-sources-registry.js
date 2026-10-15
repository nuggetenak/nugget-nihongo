#!/usr/bin/env node
/**
 * generate-sources-registry.js
 * Generates the master book metadata registry:
 * public/data/staged-expansion/books/sources-staged.js
 * 
 * Defines all 9 major Japanese learning book series:
 * 1. Irodori (Japan Foundation)
 * 2. Minna no Nihongo (3A Corporation)
 * 3. Nihongo Sou Matome (ASK Publishing)
 * 4. GENKI (The Japan Times Publishing)
 * 5. Shin Kanzen Master (3A Corporation)
 * 6. Tobira (Kuroshio Publishers)
 * 7. QUARTET (The Japan Times Publishing)
 * 8. TRY! JLPT (ASK Publishing)
 * 9. Marugoto (Japan Foundation)
 * 
 * 100% Legal Attribution & Idea-Expression Distinction Compliant.
 */

const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '../..');
const OUT_FILE = path.join(REPO, 'public/data/staged-expansion/books/sources-staged.js');

const SOURCES_DATA = {
  version: "2.0.0",
  last_updated: new Date().toISOString().slice(0, 10),
  display_order: [
    'irodori',
    'minna',
    'soumatome',
    'genki',
    'shin-kanzen-master',
    'tobira',
    'quartet',
    'try',
    'marugoto'
  ],
  legal_framework: {
    doctrine: "Idea-Expression Distinction (Baker v. Selden & Hak Cipta Internasional)",
    compliance: "100% Legal & Safe. Silabus materi mengacu pada urutan pedagogis buku canonical, sedangkan seluruh penjelasan kalimat, contoh dialog, glosarium arti bahasa Indonesia, dan ilustrasi disusun 100% orisinal mandiri tanpa mereproduksi teks milik penerbit komersial."
  },
  books: [
    {
      id: 'irodori',
      title: 'Irodori: Japanese for Life in Japan',
      title_ja: 'いろどり 生活の日本語',
      publisher: 'The Japan Foundation',
      publisher_ja: '国際交流基金',
      url: 'https://www.irodori.jpf.go.jp/',
      license: 'open-educational',
      levels: ['A1', 'A2-1', 'A2-2'],
      jlpt: ['n5', 'n4'],
      volumes: [
        { label: 'Starter A1', vocab_file: 'books/irodori/vocab-lens-ir-a1.js', units: 18, jlpt: 'n5', status: 'ready' },
        { label: 'Elementary 1 A2-1', vocab_file: 'books/irodori/vocab-lens-ir-a2-1.js', units: 18, jlpt: 'n4', status: 'ready' },
        { label: 'Elementary 2 A2-2', vocab_file: 'books/irodori/vocab-lens-ir-a2-2.js', units: 18, jlpt: 'n4', status: 'ready' }
      ],
      credit_text: 'Materi kurikulum mengacu pada kurikulum resmi Irodori karya The Japan Foundation.',
      credit_short: 'Irodori (The Japan Foundation)'
    },
    {
      id: 'minna',
      title: 'Minna no Nihongo Shokyuu',
      title_ja: 'みんなの日本語 初級',
      publisher: '3A Corporation',
      publisher_ja: 'スリーエーネットワーク',
      url: 'https://www.3anet.co.jp/np/books/3600/',
      license: 'commercial-reference',
      levels: ['Shokyuu I', 'Shokyuu II'],
      jlpt: ['n5', 'n4'],
      volumes: [
        { label: 'Shokyuu I (Bab 1-25)', vocab_file: 'books/minna/vocab-lens-mn-1.js', chapters: 25, jlpt: 'n5', status: 'ready' },
        { label: 'Shokyuu II (Bab 26-50)', vocab_file: 'books/minna/vocab-lens-mn-2.js', chapters: 25, jlpt: 'n4', status: 'ready' }
      ],
      credit_text: 'Diorganisir berdasarkan urutan kurikulum standar Minna no Nihongo (3A Corporation).',
      credit_short: 'Minna no Nihongo (3A Corp.)',
      legal_note: 'Hanya referensi struktur urutan pembelajaran — contoh kalimat & glosarium 100% orisinal Nugget Nihongo.'
    },
    {
      id: 'soumatome',
      title: 'Nihongo Sou Matome Series',
      title_ja: '日本語総まとめ',
      publisher: 'ASK Publishing',
      publisher_ja: 'アスク出版',
      url: 'https://www.ask-books.com/jp/somatome/',
      license: 'commercial-reference',
      levels: ['N5', 'N4', 'N3', 'N2', 'N1'],
      jlpt: ['n5', 'n4', 'n3', 'n2', 'n1'],
      volumes: [
        { label: 'N5 Bunpou & Goi', grammar_file: 'books/soumatome/grammar-lens-sm-n5.js', vocab_file: 'books/soumatome/vocab-lens-sm-n5.js', weeks: 6, jlpt: 'n5', status: 'ready' },
        { label: 'N4 Bunpou & Goi', grammar_file: 'books/soumatome/grammar-lens-sm-n4.js', vocab_file: 'books/soumatome/vocab-lens-sm-n4.js', weeks: 6, jlpt: 'n4', status: 'ready' },
        { label: 'N3 Bunpou & Goi', grammar_file: 'books/soumatome/grammar-lens-sm-n3.js', vocab_file: 'books/soumatome/vocab-lens-sm-n3.js', weeks: 6, jlpt: 'n3', status: 'ready' },
        { label: 'N2 Bunpou & Goi', grammar_file: 'books/soumatome/grammar-lens-sm-n2.js', vocab_file: 'books/soumatome/vocab-lens-sm-n2.js', weeks: 8, jlpt: 'n2', status: 'ready' },
        { label: 'N1 Bunpou & Goi', grammar_file: 'books/soumatome/grammar-lens-sm-n1.js', vocab_file: 'books/soumatome/vocab-lens-sm-n1.js', weeks: 8, jlpt: 'n1', status: 'ready' }
      ],
      credit_text: 'Pengelompokan pola belajar mingguan mengacu pada Nihongo Sou Matome (ASK Publishing).',
      credit_short: 'Sou Matome (ASK Publishing)',
      legal_note: 'Hanya referensi susunan silabus mingguan — penjelasan mandiri tanpa kutipan hak cipta.'
    },
    {
      id: 'genki',
      title: 'GENKI: An Integrated Course in Elementary Japanese (3rd Ed.)',
      title_ja: '初級日本語 げんき',
      publisher: 'The Japan Times Publishing',
      publisher_ja: 'ジャパンタイムズ出版',
      url: 'https://genki3.japantimes.co.jp/',
      license: 'commercial-reference',
      levels: ['Elementary I', 'Elementary II'],
      jlpt: ['n5', 'n4'],
      volumes: [
        { label: 'Genki I (Chapters 1-12)', grammar_file: 'books/genki/grammar-lens-genki-1.js', vocab_file: 'books/genki/vocab-lens-genki-1.js', chapters: 12, jlpt: 'n5', status: 'ready' },
        { label: 'Genki II (Chapters 13-23)', grammar_file: 'books/genki/grammar-lens-genki-2.js', vocab_file: 'books/genki/vocab-lens-genki-2.js', chapters: 11, jlpt: 'n4', status: 'ready' }
      ],
      credit_text: 'Urutan bab mengacu pada buku ajar GENKI karya Eri Banno dkk. (The Japan Times Publishing).',
      credit_short: 'GENKI (The Japan Times)',
      legal_note: 'Bukan reproduksi buku GENKI — dialog dan contoh kalimat merupakan karya orisinal baru.'
    },
    {
      id: 'shin-kanzen-master',
      title: 'Shin Kanzen Master Series (新完全マスター)',
      title_ja: '新完全マスター',
      publisher: '3A Corporation',
      publisher_ja: 'スリーエーネットワーク',
      url: 'https://www.3anet.co.jp/np/books/skm/',
      license: 'commercial-reference',
      levels: ['N3', 'N2', 'N1'],
      jlpt: ['n3', 'n2', 'n1'],
      volumes: [
        { label: 'N3 Bunpou & Goi', grammar_file: 'books/shin-kanzen-master/grammar-lens-skm-n3.js', vocab_file: 'books/shin-kanzen-master/vocab-lens-skm-n3.js', units: 12, jlpt: 'n3', status: 'ready' },
        { label: 'N2 Bunpou & Goi', grammar_file: 'books/shin-kanzen-master/grammar-lens-skm-n2.js', vocab_file: 'books/shin-kanzen-master/vocab-lens-skm-n2.js', units: 14, jlpt: 'n2', status: 'ready' },
        { label: 'N1 Bunpou & Goi', grammar_file: 'books/shin-kanzen-master/grammar-lens-skm-n1.js', vocab_file: 'books/shin-kanzen-master/vocab-lens-skm-n1.js', units: 15, jlpt: 'n1', status: 'ready' }
      ],
      credit_text: 'Taksonomi klasifikasi fungsi gramatika mengacu pada Shin Kanzen Master (3A Corporation).',
      credit_short: 'Shin Kanzen Master (3A Corp.)',
      legal_note: 'Klasifikasi fungsional linguistik murni tanpa menyalin materi soal latihan buku.'
    },
    {
      id: 'tobira',
      title: 'Tobira: Gateway to Advanced Japanese',
      title_ja: '上級へのとびら',
      publisher: 'Kuroshio Publishers',
      publisher_ja: 'くろしお出版',
      url: 'https://tobiraweb.9640.jp/',
      license: 'commercial-reference',
      levels: ['Intermediate Bridge'],
      jlpt: ['n3', 'n2'],
      volumes: [
        { label: 'Tobira (Chapters 1-15)', grammar_file: 'books/tobira/grammar-lens-tobira.js', vocab_file: 'books/tobira/vocab-lens-tobira.js', chapters: 15, jlpt: 'n3-n2', status: 'ready' }
      ],
      credit_text: 'Tema wacana budaya dan gramatika jembatan menengah mengacu pada Tobira (Kuroshio Publishers).',
      credit_short: 'Tobira (Kuroshio Publishers)',
      legal_note: 'Topik sosiokultural mandiri — teks bacaan orisinal tanpa duplikasi hak cipta.'
    },
    {
      id: 'quartet',
      title: 'QUARTET: Intermediate Japanese across the Four Skills',
      title_ja: '中級日本語 クァルテット',
      publisher: 'The Japan Times Publishing',
      publisher_ja: 'ジャパンタイムズ出版',
      url: 'https://quartet.japantimes.co.jp/',
      license: 'commercial-reference',
      levels: ['Intermediate I', 'Intermediate II'],
      jlpt: ['n3', 'n2'],
      volumes: [
        { label: 'QUARTET I (Lessons 1-6)', vocab_file: 'books/quartet/vocab-lens-quartet-1.js', lessons: 6, jlpt: 'n3', status: 'ready' },
        { label: 'QUARTET II (Lessons 7-12)', vocab_file: 'books/quartet/vocab-lens-quartet-2.js', lessons: 6, jlpt: 'n2', status: 'ready' }
      ],
      credit_text: 'Silabus 4 keahlian bahasa terpadu mengacu pada QUARTET (The Japan Times Publishing).',
      credit_short: 'QUARTET (The Japan Times)',
      legal_note: 'Hanya kerangka tematik pelajaran — konten latihan disusun mandiri.'
    },
    {
      id: 'try',
      title: 'TRY! Japanese Language Proficiency Test Series',
      title_ja: 'TRY! 日本語能力試験 文法から伸ばす日本語',
      publisher: 'ASK Publishing / The Association for Overseas Technical Cooperation and Sustainable Partnerships (AOTS)',
      publisher_ja: 'アスク出版 / AOTS',
      url: 'https://www.ask-books.com/jp/try/',
      license: 'commercial-reference',
      levels: ['N5', 'N4', 'N3', 'N2', 'N1'],
      jlpt: ['n5', 'n4', 'n3', 'n2', 'n1'],
      volumes: [
        { label: 'TRY! N5', vocab_file: 'books/try/vocab-lens-try-n5.js', chapters: 9, jlpt: 'n5', status: 'ready' },
        { label: 'TRY! N4', vocab_file: 'books/try/vocab-lens-try-n4.js', chapters: 10, jlpt: 'n4', status: 'ready' },
        { label: 'TRY! N3', vocab_file: 'books/try/vocab-lens-try-n3.js', chapters: 11, jlpt: 'n3', status: 'ready' },
        { label: 'TRY! N2', vocab_file: 'books/try/vocab-lens-try-n2.js', chapters: 12, jlpt: 'n2', status: 'ready' },
        { label: 'TRY! N1', vocab_file: 'books/try/vocab-lens-try-n1.js', chapters: 10, jlpt: 'n1', status: 'ready' }
      ],
      credit_text: 'Struktur kurikulum komunikatif mengacu pada seri TRY! (ASK Publishing).',
      credit_short: 'TRY! JLPT (ASK Publishing)',
      legal_note: 'Bukan salinan naskah buku — murni kerangka pengelompokan can-do komunikatif.'
    },
    {
      id: 'marugoto',
      title: 'Marugoto: Japanese Language and Culture',
      title_ja: 'まるごと 日本のことばと文化',
      publisher: 'The Japan Foundation / Sanshusha',
      publisher_ja: '国際交流基金 / 三修社',
      url: 'https://www.marugoto.org/',
      license: 'open-educational',
      levels: ['Starter A1', 'Elementary 1 A2-1', 'Elementary 2 A2-2'],
      jlpt: ['n5', 'n4'],
      volumes: [
        { label: 'Starter A1', vocab_file: 'books/marugoto/lens-marugoto-a1.js', topics: 9, jlpt: 'n5', status: 'ready' },
        { label: 'Elementary 1 A2-1', vocab_file: 'books/marugoto/lens-marugoto-a2-1.js', topics: 9, jlpt: 'n4', status: 'ready' },
        { label: 'Elementary 2 A2-2', vocab_file: 'books/marugoto/lens-marugoto-a2-2.js', topics: 9, jlpt: 'n4', status: 'ready' }
      ],
      credit_text: 'Kerangka topik dan standar JF Standard mengacu pada Marugoto (The Japan Foundation).',
      credit_short: 'Marugoto (The Japan Foundation)'
    }
  ]
};

const js = `// sources-staged.js — Nugget Nihongo Master Book Catalog & Legal Registry
// Covers 9 Major Japanese Learning Book Series (N5 through N1)
// 100% Idea-Expression Distinction & Open Attribution Compliant
window.nuggetSourcesStaged = ${JSON.stringify(SOURCES_DATA, null, 2)};
`;

fs.writeFileSync(OUT_FILE, js, 'utf8');
console.log('Successfully generated public/data/staged-expansion/books/sources-staged.js');
