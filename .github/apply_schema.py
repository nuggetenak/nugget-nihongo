import json, re, time, sys, os
import urllib.request, urllib.error

TOKEN = os.environ.get('SUPABASE_ACCESS_TOKEN', '')
API   = "https://api.supabase.com/v1/projects/oxeuwkpgrtojjzhcboqz/database/query"

if not TOKEN:
    print("ERROR: SUPABASE_ACCESS_TOKEN not set")
    sys.exit(1)

print(f"Token prefix: {TOKEN[:12]}...")

def run(query):
    data = json.dumps({"query": query}).encode()
    req  = urllib.request.Request(API, data=data, headers={
        "Authorization": f"Bearer {TOKEN}",
        "Content-Type":  "application/json",
    })
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            return json.loads(r.read()), None
    except urllib.error.HTTPError as e:
        body = e.read().decode()
        return None, f"HTTP {e.code}: {body[:300]}"
    except Exception as e:
        return None, str(e)

# Check existing tables
result, err = run("SELECT tablename FROM pg_tables WHERE schemaname='public' AND tablename LIKE 'ai_%' ORDER BY tablename")
if err:
    print(f"Initial check failed: {err}")
    sys.exit(1)

existing = {r['tablename'] for r in result}
print(f"Existing ai_ tables: {sorted(existing)}")

REQUIRED = {'ai_feedback', 'ai_quiz_cache', 'ai_promotion_queue'}
if REQUIRED <= existing:
    print("All tables already exist — done.")
    sys.exit(0)

# Read schema
with open('supabase/schema.sql') as f:
    content = f.read()

idx   = content.find('AI FEEDBACK (Phase 5.5b')
start = content.rfind('--', 0, idx)
sql   = content[start:].strip()
print(f"SQL extracted: {len(sql)} chars")

# Strip comments to reduce WAF triggers
sql_clean = re.sub(r'--[^\n]*', '', sql)
sql_clean = re.sub(r'\n{3,}', '\n\n', sql_clean).strip()

# Split into individual statements
statements = []
for s in re.split(r';\s*\n', sql_clean):
    s = s.strip()
    if s and len(s) > 5:
        statements.append(s)

print(f"Statements to execute: {len(statements)}")

ok = skip = err_count = 0
for i, stmt in enumerate(statements):
    time.sleep(0.5)  # 2 req/s max
    preview = stmt[:65].replace('\n', ' ')
    result, error = run(stmt)
    if error:
        if any(x in error for x in ['already exists', '42P07', '42710', '42P16', 'duplicate']):
            print(f"SKIP [{i+1}]: {preview}")
            skip += 1
        else:
            print(f"ERR  [{i+1}]: {error[:120]}")
            print(f"     stmt: {preview}")
            err_count += 1
    else:
        print(f"OK   [{i+1}]: {preview}")
        ok += 1

print(f"\nSummary: {ok} OK, {skip} skipped, {err_count} errors")

# Final verification
result, _ = run("SELECT tablename FROM pg_tables WHERE schemaname='public' AND tablename LIKE 'ai_%' ORDER BY tablename")
final = {r['tablename'] for r in (result or [])}
print(f"Final tables: {sorted(final)}")

missing = REQUIRED - final
if missing:
    print(f"STILL MISSING: {missing}")
    sys.exit(1)

print("SUCCESS — all tables created!")
