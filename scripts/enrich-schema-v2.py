"""
enrich-schema-v2.py — Upgrade all vocab entries to schema v2
- Adds: frequency, jmdict_seq, forms, meanings, conjugations, misc_jm
- Updates: meaning_en from JMDict
- Generates: verb conjugations algorithmically
- Preserves: all existing handcrafted content

Usage:
    python3 scripts/enrich-schema-v2.py [--level n3] [--dry-run] [--verbose]
"""
import re, json, os, sys, pickle, argparse
from pathlib import Path

REPO      = Path(__file__).parent.parent
VOCAB_DIR = REPO / 'public/data/vocab'
JM_PKL    = Path('/tmp/jmdict_full.pkl')

# ── Conjugation engine ────────────────────────────────────────────────────────

def make_te(word, conj_type):
    """Generate て-form for godan/ichidan verbs."""
    if conj_type == 'ichidan':
        return word[:-1] + 'て'
    if conj_type == 'kuru':
        return 'きて'
    if conj_type == 'suru' or word.endswith('する'):
        base = word[:-2] if word.endswith('する') else word[:-2]
        return base + 'して'
    # Godan rules
    endings = {
        'う': 'って', 'つ': 'って', 'る': 'って',
        'ぬ': 'んで', 'ぶ': 'んで', 'む': 'んで',
        'く': 'いて', 'ぐ': 'いで',
        'す': 'して',
    }
    last = word[-1]
    return word[:-1] + endings.get(last, word[-1] + 'て')

def make_ta(word, conj_type):
    te = make_te(word, conj_type)
    if te.endswith('て'): return te[:-1] + 'た'
    if te.endswith('で'): return te[:-1] + 'だ'
    return te

def make_masu(word, conj_type, reading=None):
    r = reading or word
    if conj_type == 'ichidan':
        return r[:-1] + 'ます'
    if conj_type == 'kuru':
        return 'きます'
    if conj_type == 'suru' or r.endswith('する'):
        base = r[:-2] if r.endswith('する') else r[:-2]
        return base + 'します'
    # Godan — use reading for correct hiragana
    endings = {
        'う': 'い', 'つ': 'ち', 'る': 'り',
        'ぬ': 'に', 'ぶ': 'び', 'む': 'み',
        'く': 'き', 'ぐ': 'ぎ', 'す': 'し',
    }
    last = r[-1]
    return r[:-1] + endings.get(last, r[-1]) + 'ます'

def make_nai(word, conj_type, reading=None):
    r = reading or word
    if conj_type == 'ichidan':
        return r[:-1] + 'ない'
    if conj_type == 'kuru':
        return 'こない'
    if conj_type == 'suru' or r.endswith('する'):
        base = r[:-2] if r.endswith('する') else r[:-2]
        return base + 'しない'
    # Godan
    endings = {
        'う': 'わ', 'つ': 'た', 'る': 'ら',
        'ぬ': 'な', 'ぶ': 'ば', 'む': 'ま',
        'く': 'か', 'ぐ': 'が', 'す': 'さ',
    }
    last = r[-1]
    return r[:-1] + endings.get(last, r[-1]) + 'ない'

def make_potential(word, conj_type, reading=None):
    r = reading or word
    if conj_type == 'ichidan':
        return r[:-1] + 'られる'
    if conj_type == 'kuru':
        return 'こられる'
    if conj_type == 'suru' or r.endswith('する'):
        base = r[:-2] if r.endswith('する') else r[:-2]
        return base + 'できる'
    endings = {
        'う': 'え', 'つ': 'て', 'る': 'れ',
        'ぬ': 'ね', 'ぶ': 'べ', 'む': 'め',
        'く': 'け', 'ぐ': 'げ', 'す': 'せ',
    }
    last = r[-1]
    return r[:-1] + endings.get(last, r[-1]) + 'る'

def make_passive(word, conj_type, reading=None):
    r = reading or word
    if conj_type == 'ichidan':
        return r[:-1] + 'られる'
    if conj_type == 'kuru':
        return 'こられる'
    if conj_type == 'suru' or r.endswith('する'):
        base = r[:-2] if r.endswith('する') else r[:-2]
        return base + 'される'
    nai_base = make_nai(word, conj_type, r)[:-2]  # strip ない
    return nai_base + 'れる'

def make_causative(word, conj_type, reading=None):
    r = reading or word
    if conj_type == 'ichidan':
        return r[:-1] + 'させる'
    if conj_type == 'kuru':
        return 'こさせる'
    if conj_type == 'suru' or r.endswith('する'):
        base = r[:-2] if r.endswith('する') else r[:-2]
        return base + 'させる'
    nai_base = make_nai(word, conj_type, r)[:-2]
    return nai_base + 'せる'

def make_volitional(word, conj_type, reading=None):
    r = reading or word
    if conj_type == 'ichidan':
        return r[:-1] + 'よう'
    if conj_type == 'kuru':
        return 'こよう'
    if conj_type == 'suru' or r.endswith('する'):
        base = r[:-2] if r.endswith('する') else r[:-2]
        return base + 'しよう'
    endings = {
        'う': 'お', 'つ': 'と', 'る': 'ろ',
        'ぬ': 'の', 'ぶ': 'ぼ', 'む': 'も',
        'く': 'こ', 'ぐ': 'ご', 'す': 'そ',
    }
    last = r[-1]
    return r[:-1] + endings.get(last, r[-1]) + 'う'

def make_cond_ba(word, conj_type, reading=None):
    r = reading or word
    if conj_type == 'ichidan':
        return r[:-1] + 'れば'
    if conj_type == 'kuru':
        return 'くれば'
    if conj_type == 'suru' or r.endswith('する'):
        base = r[:-2] if r.endswith('する') else r[:-2]
        return base + 'すれば'
    pot = make_potential(word, conj_type, r)  # potential base
    return pot[:-1] + 'ば'

def make_cond_tara(word, conj_type):
    ta = make_ta(word, conj_type)
    return ta + 'ら'

def make_conjugations(word, reading, conj_type, pos):
    """Generate all key conjugation forms. Only for verbs."""
    if not pos or not any(p in pos for p in ['verb-u','verb-ru','verb-suru','verb-kuru']):
        return None
    if conj_type not in ('godan', 'ichidan', 'suru', 'kuru'):
        return None
    r = reading or word
    
    return {
        'dict':       r,
        'masu':       make_masu(word, conj_type, r),
        'te':         make_te(word, conj_type),
        'ta':         make_ta(word, conj_type),
        'nai':        make_nai(word, conj_type, r),
        'potential':  make_potential(word, conj_type, r),
        'passive':    make_passive(word, conj_type, r),
        'causative':  make_causative(word, conj_type, r),
        'volitional': make_volitional(word, conj_type, r),
        'cond_ba':    make_cond_ba(word, conj_type, r),
        'cond_tara':  make_cond_tara(word, conj_type),
    }

# ── JMDict helpers ────────────────────────────────────────────────────────────

def jm_freq(entry):
    """Return frequency band (int) or None."""
    return entry.get('frequency')

def jm_forms(entry):
    """Return alternate forms list."""
    forms = []
    INF_MAP = {
        'irregular okurigana usage': 'okurigana tidak biasa',
        'word containing out-dated kanji': 'kanji arkais',
        'rarely used kanji form': 'kanji jarang dipakai',
        'word usually written using kana alone': 'biasanya ditulis kana saja',
    }
    for k in entry.get('k_eles', []):
        info = [INF_MAP.get(i, i) for i in k.get('info', [])]
        forms.append({'word': k['word'], 'info': info})
    return forms

def jm_meanings(entry):
    """Return list of {id, en, misc, field} dicts."""
    MISC_MAP = {
        'word usually written using kana alone': 'biasanya kana saja',
        'colloquial': 'percakapan kasual',
        'honorific or respectful (sonkeigo)': 'sonkeigo',
        'humble (kenjōgo)': 'kenjōgo',
        'polite (teineigo)': 'teineigo',
        'vulgar expression or word': 'vulgar',
        'child language': 'bahasa anak',
        'archaic': 'arkais',
        'obsolete': 'usang',
        'slang': 'slang',
        'derogatory': 'merendahkan',
    }
    result = []
    for sense in entry.get('senses', []):
        en = '; '.join(sense.get('en', []))
        misc = [MISC_MAP.get(m, m) for m in sense.get('misc', [])]
        field = sense.get('field', [])
        if en:
            result.append({'en': en, 'misc': misc, 'field': field})
    return result

def jm_misc(entry):
    """All misc tags across all senses."""
    MISC_MAP = {
        'word usually written using kana alone': 'biasanya kana saja',
        'colloquial': 'percakapan kasual',
        'honorific or respectful (sonkeigo)': 'sonkeigo',
        'humble (kenjōgo)': 'kenjōgo',
        'polite (teineigo)': 'teineigo',
        'vulgar expression or word': 'vulgar',
        'usually written using kana alone': 'biasanya kana saja',
        'often written using kana alone': 'sering ditulis kana saja',
        'irregular okurigana usage': 'okurigana tidak biasa',
        'archaic': 'arkais',
        'slang': 'slang',
    }
    misc_all = set()
    for sense in entry.get('senses', []):
        for m in sense.get('misc', []):
            misc_all.add(MISC_MAP.get(m, m))
    return sorted(misc_all)

def jm_seq(entry):
    return entry.get('seq')

# ── Main enrichment ──────────────────────────────────────────────────────────

def enrich_entry(e: dict, jm: dict, verbose: bool = False) -> dict:
    """Enrich a vocab entry dict with JMDict data. Returns updated dict."""
    word    = e.get('word', '')
    reading = e.get('reading', '')
    pos     = e.get('pos', '')
    conj    = e.get('conj_type')
    
    jm_entry = jm.get(word) or jm.get(reading)
    changed  = []
    
    # 1. jmdict_seq
    if jm_entry and 'jmdict_seq' not in e:
        e['jmdict_seq'] = jm_seq(jm_entry)
        changed.append('jmdict_seq')
    
    # 2. frequency
    if jm_entry and 'frequency' not in e:
        freq = jm_freq(jm_entry)
        if freq:
            e['frequency'] = freq
            changed.append('frequency')
    
    # 3. forms (alternate spellings)
    if jm_entry and 'forms' not in e:
        forms = jm_forms(jm_entry)
        if len(forms) > 1:  # only if there are alternates
            e['forms'] = forms
            changed.append('forms')
    
    # 4. meanings array (multi-sense)
    if jm_entry and 'meanings' not in e:
        jm_m = jm_meanings(jm_entry)
        if len(jm_m) > 1:
            e['meanings'] = jm_m
            changed.append('meanings')
    
    # 5. meaning_en — fill if empty or missing
    if jm_entry and (not e.get('meaning_en') or e.get('meaning_en') == e.get('meaning_id')):
        jm_m = jm_meanings(jm_entry)
        if jm_m:
            e['meaning_en'] = jm_m[0]['en'][:80]
            changed.append('meaning_en')
    
    # 6. misc_jm
    if jm_entry and 'misc_jm' not in e:
        misc = jm_misc(jm_entry)
        if misc:
            e['misc_jm'] = misc
            changed.append('misc_jm')
    
    # 7. conjugations — auto-generate for verbs
    if 'conjugations' not in e and conj in ('godan', 'ichidan', 'suru', 'kuru'):
        conjs = make_conjugations(word, reading, conj, pos)
        if conjs:
            e['conjugations'] = conjs
            changed.append('conjugations')
    
    if verbose and changed:
        print(f'  {e["id"]} ({word}): +{", ".join(changed)}')
    
    return e, changed

def enrich_cat_file(path: Path, jm: dict, dry_run: bool, verbose: bool):
    with open(path, encoding='utf-8') as f:
        content = f.read()
    
    # Extract entries (JSON double-quote format)
    entry_pattern = re.compile(
        r'\{(?:[^{}]|\{[^{}]*\})*"id":\s*"vg-[^"]+(?:[^{}]|\{[^{}]*\})*\}',
        re.DOTALL
    )
    
    total_changed = 0
    new_content   = content
    
    for m in reversed(list(entry_pattern.finditer(content))):
        try:
            e = json.loads(m.group(0))
        except:
            continue
        
        e, changed = enrich_entry(e, jm, verbose)
        if changed:
            total_changed += 1
            if not dry_run:
                new_json = json.dumps(e, ensure_ascii=False, indent=2)
                new_content = new_content[:m.start()] + new_json + new_content[m.end():]
    
    if total_changed > 0 and not dry_run:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(new_content)
    
    return total_changed

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--level', choices=['n5','n4','n3','n2','n1','all'], default='all')
    parser.add_argument('--dry-run', action='store_true')
    parser.add_argument('--verbose', '-v', action='store_true')
    args = parser.parse_args()
    
    print('Loading JMDict full index...', end=' ', flush=True)
    with open(JM_PKL, 'rb') as f:
        jm = pickle.load(f)
    print(f'{len(jm)} entries')
    
    levels = ['n3','n2','n1','n5','n4'] if args.level == 'all' else [args.level]
    grand_total = 0
    
    for level in levels:
        level_dir = VOCAB_DIR / level
        if not level_dir.exists():
            print(f'⚠️  {level_dir} not found')
            continue
        
        files = sorted(level_dir.glob(f'{level}-*.js'))
        level_total = 0
        print(f'\n{level.upper()} ({len(files)} files):')
        
        for f in files:
            n = enrich_cat_file(f, jm, args.dry_run, args.verbose)
            if n > 0:
                print(f'  {"[DRY] " if args.dry_run else "✅ "}{f.name}: {n} entries enriched')
                level_total += n
        
        if level_total == 0:
            print('  (nothing to enrich)')
        else:
            print(f'  → {level.upper()} total: {level_total} entries updated')
        grand_total += level_total
    
    print(f'\n{"[DRY RUN] " if args.dry_run else ""}Grand total: {grand_total} entries enriched')
    if grand_total > 0 and not args.dry_run:
        print('Run: node scripts/merge-vocab.js  →  node tests/run.js')

if __name__ == '__main__':
    main()

# ── Single-quote JS format handler (N5/N4) ──────────────────────────────────

def parse_sq_entry(block: str) -> dict:
    """Parse a single-quote JS object block into a dict."""
    e = {}
    
    # Simple fields: key: 'value' or key: value or key: number or key: null/true/false
    for m in re.finditer(r"^\s{2}(\w+):\s*('([^']*)'|\"([^\"]*)\"|(-?\d+(?:\.\d+)?)|null|true|false),?\s*$", block, re.MULTILINE):
        k = m.group(1)
        if m.group(3) is not None: v = m.group(3)
        elif m.group(4) is not None: v = m.group(4)
        elif m.group(5) is not None: v = float(m.group(5)) if '.' in m.group(5) else int(m.group(5))
        else: v = {'null': None, 'true': True, 'false': False}.get(m.group(0).strip().rstrip(',').split()[-1])
        e[k] = v
    
    # Array fields: key: ['a', 'b', ...]
    for m in re.finditer(r"^\s{2}(\w+):\s*\[([^\]]*)\],?\s*$", block, re.MULTILINE):
        k = m.group(1)
        items = re.findall(r"'([^']*)'|\"([^\"]+)\"", m.group(2))
        e[k] = [a or b for a, b in items]
    
    # examples / nested arrays — skip (too complex, handled separately)
    return e

def serialize_sq_entry(e: dict, original_block: str) -> str:
    """Inject new fields into original single-quote block string."""
    new_block = original_block.rstrip().rstrip('}').rstrip(',').rstrip()
    
    new_lines = []
    if 'jmdict_seq' in e and 'jmdict_seq' not in original_block:
        new_lines.append(f"  jmdict_seq: '{e['jmdict_seq']}',")
    if 'frequency' in e and 'frequency' not in original_block:
        new_lines.append(f"  frequency: {e['frequency']},")
    if 'forms' in e and 'forms' not in original_block:
        forms_str = json.dumps(e['forms'], ensure_ascii=False)
        new_lines.append(f"  forms: {forms_str},")
    if 'meanings' in e and 'meanings' not in original_block:
        meanings_str = json.dumps(e['meanings'], ensure_ascii=False)
        new_lines.append(f"  meanings: {meanings_str},")
    if 'misc_jm' in e and 'misc_jm' not in original_block:
        misc_str = json.dumps(e['misc_jm'], ensure_ascii=False)
        new_lines.append(f"  misc_jm: {misc_str},")
    if 'conjugations' in e and 'conjugations' not in original_block:
        conj_str = json.dumps(e['conjugations'], ensure_ascii=False)
        new_lines.append(f"  conjugations: {conj_str},")
    
    if not new_lines:
        return original_block
    
    # Insert before closing }
    return new_block + '\n' + '\n'.join(new_lines) + '\n}'

def enrich_sq_file(path: Path, jm: dict, dry_run: bool, verbose: bool):
    """Enrich single-quote JS vocab file (N5/N4 format)."""
    with open(path, encoding='utf-8') as f:
        content = f.read()
    
    # Use string-aware bracket tracking to extract entry blocks
    # Simple approach: find each { } block at entry level
    level = path.stem.split('-')[0]  # 'n5' or 'n4'
    id_pattern = re.compile(rf"id:\s*'vg-{level}-\d+'")
    
    total_changed = 0
    new_content = content
    
    # Process in reverse to preserve positions
    matches = list(id_pattern.finditer(content))
    for m in reversed(matches):
        open_brace = content.rfind('{', 0, m.start())
        if open_brace == -1: continue
        
        # Find matching close brace (string-aware)
        depth = 0; in_str = False; str_char = None; i = open_brace
        close = -1
        while i < len(content):
            ch = content[i]
            if in_str:
                if ch == '\\': i += 2; continue
                if ch == str_char: in_str = False
            else:
                if ch in ("'", '"', '`'): in_str = True; str_char = ch
                elif ch == '{': depth += 1
                elif ch == '}':
                    depth -= 1
                    if depth == 0: close = i; break
            i += 1
        
        if close == -1: continue
        
        block = content[open_brace:close+1]
        parsed = parse_sq_entry(block)
        if not parsed.get('id'): continue
        
        word = parsed.get('word', '')
        reading = parsed.get('reading', '')
        conj = parsed.get('conj_type')
        pos = parsed.get('pos', '')
        
        jm_entry = jm.get(word) or jm.get(reading)
        
        new_parsed = dict(parsed)
        changed = []
        
        if jm_entry and 'jmdict_seq' not in block:
            new_parsed['jmdict_seq'] = jm_seq(jm_entry); changed.append('jmdict_seq')
        if jm_entry and 'frequency' not in block:
            freq = jm_freq(jm_entry)
            if freq: new_parsed['frequency'] = freq; changed.append('frequency')
        if jm_entry and 'forms' not in block:
            forms = jm_forms(jm_entry)
            if len(forms) > 1: new_parsed['forms'] = forms; changed.append('forms')
        if jm_entry and 'meanings' not in block:
            jm_m = jm_meanings(jm_entry)
            if len(jm_m) > 1: new_parsed['meanings'] = jm_m; changed.append('meanings')
        if jm_entry and 'misc_jm' not in block:
            misc = jm_misc(jm_entry)
            if misc: new_parsed['misc_jm'] = misc; changed.append('misc_jm')
        if 'conjugations' not in block and conj in ('godan','ichidan','suru','kuru'):
            conjs = make_conjugations(word, reading, conj, pos)
            if conjs: new_parsed['conjugations'] = conjs; changed.append('conjugations')
        
        if changed:
            new_block = serialize_sq_entry(new_parsed, block)
            new_content = new_content[:open_brace] + new_block + new_content[close+1:]
            total_changed += 1
            if verbose:
                print(f'  {parsed["id"]} ({word}): +{", ".join(changed)}')
    
    if total_changed > 0 and not dry_run:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(new_content)
    
    return total_changed
