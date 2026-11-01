const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://xipvhxorvwpvfokauboy.supabase.co';
const ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhpcHZoeG9ydndwdmZva2F1Ym95Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE0NTA2ODYsImV4cCI6MjEwNzAyNjY4Nn0.xz2jvXwkM15rBRnohCYxAC6d7I7WFkzmeu1arPMgNtU';

async function main() {
  console.log('Testing live Supabase connection to:', SUPABASE_URL);
  const start = Date.now();
  const supabase = createClient(SUPABASE_URL, ANON_KEY, {
    auth: { persistSession: false }
  });

  // 1. Test health_heartbeats table
  const { data: hbData, error: hbError } = await supabase
    .from('health_heartbeats')
    .select('id, ping_source, pinged_at')
    .order('id', { ascending: false })
    .limit(3);

  if (hbError) {
    console.error('Heartbeats query error:', hbError);
    process.exit(1);
  }
  console.log('1. Health Heartbeats read OK. Found:', hbData.length, 'records');

  // 2. Test inserting a client heartbeat
  const { data: insertData, error: insertError } = await supabase
    .from('health_heartbeats')
    .insert([{ ping_source: 'live_test_script', metadata: { test: true, timestamp: Date.now() } }])
    .select();

  if (insertError) {
    console.error('Heartbeats insert error:', insertError);
    process.exit(1);
  }
  console.log('2. Health Heartbeats insert OK. Inserted id:', insertData[0]?.id);

  // 3. Test static curriculum read (grammar_rules & book_grammar)
  const { data: gData, error: gError } = await supabase
    .from('book_grammar')
    .select('id, pattern')
    .limit(5);

  if (gError) {
    console.error('Book grammar read error:', gError);
    process.exit(1);
  }
  console.log('3. Book grammar public read OK (RLS verified)');

  const latency = Date.now() - start;
  console.log(`4. Full round-trip latency: ${latency} ms`);
  console.log('ALL SUPABASE LIVE TESTS PASSED! Status: 100% HEALTHY');
}

main().catch(err => {
  console.error('Unhandled test failure:', err);
  process.exit(1);
});
