// ══════════════════════════════════════════════════════
//  scripts/seed-supabase.js — Nugget Nihongo Master Database Seeder
//  Migrates and seeds all local linguistic datasets into Supabase PostgreSQL
//
//  Tables seeded:
//    1. vocabulary      (N5-N1 vocabulary items)
//    2. kanji           (Extracted unique kanji glyphs)
//    3. grammar_rules   (N5-N1 grammar index)
//    4. particles       (Particle Engine polysemic senses)
//    5. book_grammar    (Minna no Nihongo & Irodori textbook lenses)
// ══════════════════════════════════════════════════════

const fs = require('fs');
const path = require('path');
const postgres = require('postgres');

const ROOT = path.join(__dirname, '..');

const DB_CONFIG = {
  host: 'aws-0-ap-south-1.pooler.supabase.com',
  port: 6543,
  database: 'postgres',
  username: 'postgres.xipvhxorvwpvfokauboy',
  password: '*H5@heT/hrQiTV-',
  ssl: { rejectUnauthorized: false },
  connect_timeout: 20,
  max: 5
};

// ── 1. LOAD LOCAL DATASETS ──────────────────────────────
global.window = global;

function loadFile(relPath) {
  const full = path.join(ROOT, 'public', relPath);
  if (!fs.existsSync(full)) {
    console.warn('⚠️ File missing:', relPath);
    return;
  }
  try {
    eval(fs.readFileSync(full, 'utf8'));
  } catch (err) {
    console.error('❌ Error loading ' + relPath + ':', err.message);
  }
}

console.log('📦 Loading local datasets into memory...');
loadFile('data/vocab/vocab-n5.js');
loadFile('data/vocab/vocab-n4.js');
loadFile('data/vocab/vocab-n3.js');
loadFile('data/vocab/vocab-n2.js');
loadFile('data/vocab/vocab-n1.js');
loadFile('data/vocab/vocab-index.js');

loadFile('data/grammar/grammar-n5.js');
loadFile('data/grammar/grammar-n4.js');
loadFile('data/grammar/grammar-n3.js');
loadFile('data/grammar/grammar-n2.js');
loadFile('data/grammar/grammar-n1.js');
loadFile('data/grammar/grammar-index.js');

loadFile('js/particle-engine.js');

loadFile('data/books/book-minna-1.js');
loadFile('data/books/book-minna-2.js');
loadFile('data/books/book-irodori-a1.js');
loadFile('data/books/book-irodori-a2-1.js');
loadFile('data/books/book-irodori-a2-2.js');

// ── 2. SEEDING LOGIC ────────────────────────────────────
async function runSeeder() {
  const sql = postgres(DB_CONFIG);
  console.log('🔌 Connected to Supabase via AP-South-1 Pooler.\n');

  try {
    // ── A. SEED GRAMMAR RULES ───────────────────────────
    console.log('📖 Seeding grammar_rules...');
    const grammarEntries = (global.grammarDB && global.grammarDB.length > 0)
      ? global.grammarDB
      : [
          ...(global.grammarN5 || []),
          ...(global.grammarN4 || []),
          ...(global.grammarN3 || []),
          ...(global.grammarN2 || []),
          ...(global.grammarN1 || [])
        ];

    console.log(`   Found ${grammarEntries.length} grammar entries.`);
    let gCount = 0;
    const G_BATCH = 100;
    for (let i = 0; i < grammarEntries.length; i += G_BATCH) {
      const slice = grammarEntries.slice(i, i + G_BATCH).map(g => {
        let level = (g.level || 'n5').toLowerCase();
        if (!['n5','n4','n3','n2','n1'].includes(level)) level = 'n5';

        let formality = 'neutral';
        if (g.register === 'casual' || g.register === 'polite' || g.register === 'sonkeigo' || g.register === 'kenjougo') {
          formality = g.register;
        }

        return {
          id: g.id,
          pattern: g.pattern || g.id,
          reading: g.reading || null,
          meaning_id: g.meaning_id || g.meaning || 'Tata bahasa',
          meaning_en: g.meaning_en || null,
          level: level,
          category: g.category || g.cat || null,
          connection: g.connection || null,
          desc_id: g.desc_id || g.desc || null,
          formality_level: formality,
          examples: JSON.stringify(g.examples || [])
        };
      });

      await sql`
        INSERT INTO public.grammar_rules ${sql(slice, 'id', 'pattern', 'reading', 'meaning_id', 'meaning_en', 'level', 'category', 'connection', 'desc_id', 'formality_level', 'examples')}
        ON CONFLICT (id) DO UPDATE SET
          pattern = EXCLUDED.pattern,
          reading = EXCLUDED.reading,
          meaning_id = EXCLUDED.meaning_id,
          meaning_en = EXCLUDED.meaning_en,
          level = EXCLUDED.level,
          category = EXCLUDED.category,
          connection = EXCLUDED.connection,
          desc_id = EXCLUDED.desc_id,
          formality_level = EXCLUDED.formality_level,
          examples = EXCLUDED.examples,
          updated_at = NOW();
      `;
      gCount += slice.length;
    }
    console.log(`   ✅ Seeded ${gCount} grammar_rules.\n`);

    // ── B. SEED PARTICLES ───────────────────────────────
    console.log('助 Seeding particles...');
    const particleRows = [];
    if (global.ParticleEngine && global.ParticleEngine.PARTICLES) {
      const pMap = global.ParticleEngine.PARTICLES;
      Object.keys(pMap).forEach(char => {
        const item = pMap[char];
        const senses = item.senses || [];
        senses.forEach((s, idx) => {
          particleRows.push({
            id: `pt-${char}-${s.sense_id || idx + 1}`,
            particle: char,
            function_name: s.function_jp || s.function_id || item.category || '助詞',
            meaning_id: s.translation_id || s.function_id || 'Partikel bahasa Jepang',
            level: (item.jlpt || 'n5').toLowerCase(),
            explanation_id: s.l1_trap || item.overview_id || null,
            collocation: s.collocation_pattern || null,
            examples: JSON.stringify(s.example ? [s.example] : [])
          });
        });
      });
    }

    if (particleRows.length > 0) {
      await sql`
        INSERT INTO public.particles ${sql(particleRows, 'id', 'particle', 'function_name', 'meaning_id', 'level', 'explanation_id', 'collocation', 'examples')}
        ON CONFLICT (id) DO UPDATE SET
          particle = EXCLUDED.particle,
          function_name = EXCLUDED.function_name,
          meaning_id = EXCLUDED.meaning_id,
          level = EXCLUDED.level,
          explanation_id = EXCLUDED.explanation_id,
          collocation = EXCLUDED.collocation,
          examples = EXCLUDED.examples;
      `;
      console.log(`   ✅ Seeded ${particleRows.length} particle senses.\n`);
    }

    // ── C. SEED VOCABULARY & EXTRACT KANJI ───────────────
    console.log('📝 Seeding vocabulary & extracting kanji glyphs...');
    const allVocab = (global.vocabDB && global.vocabDB.length > 0)
      ? global.vocabDB
      : [
          ...(global.vocabN5 || []),
          ...(global.vocabN4 || []),
          ...(global.vocabN3 || []),
          ...(global.vocabN2 || []),
          ...(global.vocabN1 || [])
        ];

    console.log(`   Found ${allVocab.length} vocabulary entries.`);
    const kanjiMap = new Map(); // char -> { level, meaning_id }

    let vCount = 0;
    const V_BATCH = 150;
    for (let i = 0; i < allVocab.length; i += V_BATCH) {
      const slice = allVocab.slice(i, i + V_BATCH).map(v => {
        let level = (v.jlpt || 'n5').toLowerCase();
        if (!['n5','n4','n3','n2','n1'].includes(level)) level = 'n5';

        // Extract kanji
        if (v.word) {
          const kanjiChars = v.word.match(/[\u4e00-\u9faf]/g) || [];
          kanjiChars.forEach(ch => {
            if (!kanjiMap.has(ch)) {
              kanjiMap.set(ch, {
                kanji: ch,
                jlpt_level: level,
                meaning_id: v.meaning_id || v.meaning || 'Kanji ' + ch
              });
            }
          });
        }

        let formality = 'neutral';
        if (v.formalitas === 1 || v.register === 'casual') formality = 'casual';
        else if (v.formalitas === 3 || v.register === 'polite') formality = 'polite';
        else if (v.register === 'sonkeigo') formality = 'sonkeigo';
        else if (v.register === 'kenjougo') formality = 'kenjougo';

        let transitivity = null;
        if (['transitive','intransitive','both','none'].includes(v.transitivity)) {
          transitivity = v.transitivity;
        }

        return {
          id: v.id,
          word: v.word || v.id,
          reading: v.reading || v.word || '',
          romaji: v.romaji || null,
          meaning_id: v.meaning_id || v.meaning || 'Kosakata',
          meaning_en: v.meaning_en || null,
          pos: v.pos || null,
          conj_type: v.conj_type || null,
          transitivity: transitivity,
          formality_level: formality,
          jlpt_level: level,
          furigana_mapping: JSON.stringify(v.furigana_mapping || []),
          synonyms: Array.isArray(v.synonyms) ? v.synonyms : [],
          antonyms: Array.isArray(v.antonyms) ? v.antonyms : [],
          see_also: Array.isArray(v.see_also) ? v.see_also : [],
          examples: JSON.stringify(v.examples || [])
        };
      });

      await sql`
        INSERT INTO public.vocabulary ${sql(slice, 'id', 'word', 'reading', 'romaji', 'meaning_id', 'meaning_en', 'pos', 'conj_type', 'transitivity', 'formality_level', 'jlpt_level', 'furigana_mapping', 'synonyms', 'antonyms', 'see_also', 'examples')}
        ON CONFLICT (id) DO UPDATE SET
          word = EXCLUDED.word,
          reading = EXCLUDED.reading,
          romaji = EXCLUDED.romaji,
          meaning_id = EXCLUDED.meaning_id,
          meaning_en = EXCLUDED.meaning_en,
          pos = EXCLUDED.pos,
          conj_type = EXCLUDED.conj_type,
          transitivity = EXCLUDED.transitivity,
          formality_level = EXCLUDED.formality_level,
          jlpt_level = EXCLUDED.jlpt_level,
          furigana_mapping = EXCLUDED.furigana_mapping,
          synonyms = EXCLUDED.synonyms,
          antonyms = EXCLUDED.antonyms,
          see_also = EXCLUDED.see_also,
          examples = EXCLUDED.examples,
          updated_at = NOW();
      `;
      vCount += slice.length;
      if (vCount % 600 === 0 || vCount === allVocab.length) {
        process.stdout.write(`   ...synced ${vCount}/${allVocab.length} words\n`);
      }
    }
    console.log(`   ✅ Seeded ${vCount} vocabulary items.\n`);

    // ── D. SEED KANJI ───────────────────────────────────
    console.log(`🈸 Seeding ${kanjiMap.size} extracted kanji glyphs...`);
    const kanjiArray = Array.from(kanjiMap.values()).map(k => ({
      character: k.kanji,
      onyomi: [],
      kunyomi: [],
      meaning_id: k.meaning_id,
      meaning_en: null,
      stroke_count: null,
      jlpt_level: k.jlpt_level,
      radical: null
    }));

    const K_BATCH = 150;
    for (let i = 0; i < kanjiArray.length; i += K_BATCH) {
      const slice = kanjiArray.slice(i, i + K_BATCH);
      await sql`
        INSERT INTO public.kanji ${sql(slice, 'character', 'onyomi', 'kunyomi', 'meaning_id', 'meaning_en', 'stroke_count', 'jlpt_level', 'radical')}
        ON CONFLICT (character) DO UPDATE SET
          meaning_id = EXCLUDED.meaning_id,
          jlpt_level = EXCLUDED.jlpt_level;
      `;
    }
    console.log(`   ✅ Seeded ${kanjiArray.length} kanji records.\n`);

    // ── E. SEED BOOK GRAMMAR ────────────────────────────
    console.log('📚 Seeding book_grammar lenses (Minna & Irodori)...');
    const books = [
      global.bookMinna1,
      global.bookMinna2,
      global.bookIrodoriA1,
      global.bookIrodoriA21 || global.bookIrodoriA2_1,
      global.bookIrodoriA22 || global.bookIrodoriA2_2
    ].filter(Boolean);

    const grammarMap = new Map();
    grammarEntries.forEach(g => grammarMap.set(g.id, g));

    const bookRows = [];
    books.forEach(bk => {
      const meta = bk.meta || {};
      const bookSlug = meta.book || 'book';
      const units = bk.units || {};

      Object.keys(units).forEach(uKey => {
        const u = units[uKey];
        const gIds = u.grammar_ids || [];
        gIds.forEach((gId, gSeq) => {
          const gInfo = grammarMap.get(gId) || {};
          bookRows.push({
            id: `bk-${bookSlug}-u${uKey}-${gId}`,
            book: bookSlug,
            level: (meta.jlpt_range && meta.jlpt_range[0]) || 'n5',
            week: null,
            day: null,
            seq: gSeq + 1,
            unit: u.topic || `Unit ${uKey}`,
            pattern: gInfo.pattern || gId,
            form: gInfo.connection || null,
            meaning_id: gInfo.meaning_id || gInfo.meaning || 'Tata bahasa unit',
            meaning_en: gInfo.meaning_en || null,
            desc_id: gInfo.desc_id || gInfo.desc || null,
            examples: JSON.stringify(gInfo.examples || []),
            quiz_items: JSON.stringify([]),
            global_id: gId,
            source_verified: false
          });
        });
      });
    });

    console.log(`   Found ${bookRows.length} book grammar mapping rows.`);
    const BK_BATCH = 100;
    for (let i = 0; i < bookRows.length; i += BK_BATCH) {
      const slice = bookRows.slice(i, i + BK_BATCH);
      await sql`
        INSERT INTO public.book_grammar ${sql(slice, 'id', 'book', 'level', 'week', 'day', 'seq', 'unit', 'pattern', 'form', 'meaning_id', 'meaning_en', 'desc_id', 'examples', 'quiz_items', 'global_id', 'source_verified')}
        ON CONFLICT (id) DO UPDATE SET
          book = EXCLUDED.book,
          level = EXCLUDED.level,
          unit = EXCLUDED.unit,
          pattern = EXCLUDED.pattern,
          form = EXCLUDED.form,
          meaning_id = EXCLUDED.meaning_id,
          meaning_en = EXCLUDED.meaning_en,
          desc_id = EXCLUDED.desc_id,
          examples = EXCLUDED.examples,
          global_id = EXCLUDED.global_id,
          updated_at = NOW();
      `;
    }
    console.log(`   ✅ Seeded ${bookRows.length} book_grammar rows.\n`);

    // ── F. POST-SEED ROW COUNT AUDIT ────────────────────
    console.log('══════════════════════════════════════');
    console.log('  SUPABASE POST-SEED DATABASE AUDIT   ');
    console.log('══════════════════════════════════════');
    const auditTables = ['vocabulary', 'kanji', 'grammar_rules', 'particles', 'book_grammar'];
    for (const tbl of auditTables) {
      const res = await sql.unsafe(`SELECT count(*) FROM public.${tbl}`);
      console.log(`  📊 ${tbl.padEnd(16)} : ${res[0].count} rows`);
    }
    console.log('══════════════════════════════════════\n');

  } catch (err) {
    console.error('❌ Seeder encountered error:', err);
    throw err;
  } finally {
    await sql.end();
  }
}

runSeeder().then(() => {
  console.log('🎉 Master Database Seeding Completed with 100% Success!');
  process.exit(0);
}).catch(() => {
  process.exit(1);
});
