// ══════════════════════════════════════════════════════
//  scripts/verify-supabase-tables.js
//  Verifies that all required LMS tables are online and accessible
// ══════════════════════════════════════════════════════

const SUPABASE_URL = 'https://xipvhxorvwpvfokauboy.supabase.co/rest/v1';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhpcHZoeG9ydndwdmZva2F1Ym95Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE0NTA2ODYsImV4cCI6MjEwNzAyNjY4Nn0.xz2jvXwkM15rBRnohCYxAC6d7I7WFkzmeu1arPMgNtU';

const TABLES = [
  'profiles',
  'user_settings',
  'srs_cards',
  'fsrs_atoms',
  'vocabulary',
  'kanji',
  'grammar_rules',
  'particles',
  'course_progress',
  'achievements',
  'review_history',
  'book_grammar',
  'book_quiz',
  'ai_feedback',
  'ai_quiz_cache',
  'ai_promotion_queue'
];

async function verify() {
  console.log('🔍 Checking Supabase tables status...\n');
  let successCount = 0;

  for (const table of TABLES) {
    try {
      const url = `${SUPABASE_URL}/${table}?select=*&limit=1`;
      const res = await fetch(url, {
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`
        }
      });

      if (res.status === 200) {
        console.log(`  ✅ ${table.padEnd(22)} : ONLINE (HTTP 200)`);
        successCount++;
      } else {
        const txt = await res.text();
        console.log(`  ⚠️ ${table.padEnd(22)} : HTTP ${res.status} - ${txt}`);
      }
    } catch (err) {
      console.log(`  ❌ ${table.padEnd(22)} : ${err.message}`);
    }
  }

  console.log(`\n🎉 Verification result: ${successCount}/${TABLES.length} tables confirmed online and healthy!`);
}

verify();
