// ══════════════════════════════════════════════════════
//  scripts/migrate-supabase.js — Nugget Nihongo
//  Direct database migration script for Supabase PostgreSQL
// ══════════════════════════════════════════════════════

const fs = require('fs');
const path = require('path');
const postgres = require('postgres');

const DB_CONFIG = {
  host: 'aws-0-ap-south-1.pooler.supabase.com',
  port: 6543,
  database: 'postgres',
  username: 'postgres.xipvhxorvwpvfokauboy',
  password: '*H5@heT/hrQiTV-',
  ssl: { rejectUnauthorized: false },
  connect_timeout: 15
};

async function runMigration() {
  console.log('🔌 Connecting to Supabase Postgres at', DB_CONFIG.host, '...');
  let sql;
  try {
    sql = postgres(DB_CONFIG);
    const ver = await sql`SELECT version()`;
    console.log('✅ Connected successfully! Server version:', ver[0].version);
  } catch (err) {
    console.warn('⚠️ Direct port 5432 failed:', err.message);
    console.log('🔄 Trying port 6543 (Connection Pooler)...');
    DB_CONFIG.port = 6543;
    sql = postgres(DB_CONFIG);
    const ver = await sql`SELECT version()`;
    console.log('✅ Connected via pooler port 6543! Server version:', ver[0].version);
  }

  const schemaPath = path.join(__dirname, '..', 'supabase', 'schema.sql');
  console.log('📖 Reading schema file from', schemaPath, '...');
  const schemaSql = fs.readFileSync(schemaPath, 'utf8');

  console.log('🚀 Executing master schema SQL against Supabase database...');
  await sql.unsafe(schemaSql);
  console.log('🎉 Schema execution completed successfully!');

  console.log('🔍 Verifying created tables...');
  const tables = await sql`
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema = 'public' 
    ORDER BY table_name;
  `;
  console.log('📋 Public tables in database (' + tables.length + '):');
  tables.forEach(t => console.log('   - ' + t.table_name));

  await sql.end();
  console.log('✨ All migrations complete! Connection closed.');
}

runMigration().catch(err => {
  console.error('❌ Migration failed:', err);
  process.exit(1);
});
