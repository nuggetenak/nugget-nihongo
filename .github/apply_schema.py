import json, re, time, sys, os, base64
import urllib.request, urllib.error

TOKEN    = os.environ.get('SUPABASE_ACCESS_TOKEN', '')
GH_TOKEN = os.environ.get('GITHUB_TOKEN', '')
REPO     = "nuggetenak/nugget-nihongo"
API      = "https://api.supabase.com/v1/projects/oxeuwkpgrtojjzhcboqz/database/query"

log = []
def p(msg):
    print(msg)
    log.append(msg)

def write_result_to_repo(content_str):
    """Write result file to repo via GitHub API so it can be read externally."""
    if not GH_TOKEN:
        p("No GITHUB_TOKEN, skipping result write")
        return
    encoded = base64.b64encode(content_str.encode()).decode()
    # Get current SHA if file exists
    try:
        req = urllib.request.Request(
            f"https://api.github.com/repos/{REPO}/contents/.github/schema_result.txt",
            headers={"Authorization": f"Bearer {GH_TOKEN}", "Accept": "application/vnd.github+json"})
        with urllib.request.urlopen(req, timeout=10) as r:
            existing = json.loads(r.read())
            sha = existing.get('sha', '')
    except:
        sha = ''
    body = {"message": "ci: schema apply result", "content": encoded, "branch": "develop"}
    if sha:
        body["sha"] = sha
    req = urllib.request.Request(
        f"https://api.github.com/repos/{REPO}/contents/.github/schema_result.txt",
        data=json.dumps(body).encode(),
        headers={"Authorization": f"Bearer {GH_TOKEN}", "Content-Type": "application/json",
                 "Accept": "application/vnd.github+json"},
        method='PUT')
    try:
        with urllib.request.urlopen(req, timeout=15) as r:
            p(f"Result written to repo: HTTP {r.status}")
    except Exception as e:
        p(f"Result write failed: {e}")

p(f"Python {sys.version}")
p(f"TOKEN set: {'yes' if TOKEN else 'NO — EMPTY'}")
p(f"GITHUB_TOKEN set: {'yes' if GH_TOKEN else 'no'}")

if not TOKEN:
    msg = "FATAL: SUPABASE_ACCESS_TOKEN is empty"
    p(msg)
    write_result_to_repo('\n'.join(log))
    sys.exit(1)

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
    p(f"Initial check FAILED: {err}")
    write_result_to_repo('\n'.join(log))
    sys.exit(1)

existing = {r['tablename'] for r in result}
p(f"Existing ai_ tables: {sorted(existing)}")

REQUIRED = {'ai_feedback', 'ai_quiz_cache', 'ai_promotion_queue'}
if REQUIRED <= existing:
    p("All tables exist — done!")
    write_result_to_repo('\n'.join(log))
    sys.exit(0)

p(f"Missing: {REQUIRED - existing} — applying schema...")

with open('supabase/schema.sql') as f:
    content = f.read()
idx   = content.find('AI FEEDBACK (Phase 5.5b')
start = content.rfind('--', 0, idx)
sql   = content[start:].strip()
sql_clean = re.sub(r'--[^\n]*', '', sql)
sql_clean = re.sub(r'\n{3,}', '\n\n', sql_clean).strip()
statements = [s.strip() for s in re.split(r';\s*\n', sql_clean) if s.strip() and len(s.strip()) > 5]
p(f"Statements: {len(statements)}")

ok = skip = err_count = 0
for i, stmt in enumerate(statements):
    time.sleep(0.5)
    preview = stmt[:65].replace('\n', ' ')
    result, error = run(stmt)
    if error:
        if any(x in error for x in ['already exists','42P07','42710','duplicate']):
            p(f"SKIP [{i+1}]: {preview}")
            skip += 1
        else:
            p(f"ERR  [{i+1}]: {error[:120]}")
            err_count += 1
    else:
        p(f"OK   [{i+1}]: {preview}")
        ok += 1

p(f"Done: {ok} OK, {skip} skip, {err_count} err")

result, _ = run("SELECT tablename FROM pg_tables WHERE schemaname='public' AND tablename LIKE 'ai_%' ORDER BY tablename")
final = {r['tablename'] for r in (result or [])}
p(f"Final tables: {sorted(final)}")

missing = REQUIRED - final
if missing:
    p(f"STILL MISSING: {missing}")
    write_result_to_repo('\n'.join(log))
    sys.exit(1)

p("SUCCESS — all tables created!")
write_result_to_repo('\n'.join(log))
