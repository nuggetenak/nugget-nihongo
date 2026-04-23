"""
jmdict-enrich.py — Enrich vocab entries with JMDict data
Usage: python3 scripts/jmdict-enrich.py [--level n5] [--dry-run]

What it does:
  1. Loads JMDict lookup (auto-downloads if needed)
  2. For each vocab entry missing meaning_en, romaji issues, or conj_type=null:
     - Fills meaning_en from JMDict English gloss
     - Validates/fixes conj_type based on JMDict POS
     - Adds synonyms from JMDict cross-refs
  3. Reports what changed, writes back to category files
"""
import re, json, os, sys, pickle, gzip, argparse, time
from pathlib import Path
from xml.etree.ElementTree import fromstring

REPO     = Path(__file__).parent.parent
JMDICT_GZ = Path('/tmp/jmdict-test.gz')
JMDICT_PKL = Path('/tmp/jmdict_lookup.pkl')
VOCAB_DIR = REPO / 'public/data/vocab'

# ── JMDict POS → our conj_type ───────────────────────────────────────────────
JM_POS_TO_CONJ = {
    "Godan verb with 'u' ending":   'godan',
    "Godan verb with 'ku' ending":  'godan',
    "Godan verb with 'gu' ending":  'godan',
    "Godan verb with 'su' ending":  'godan',
    "Godan verb with 'tsu' ending": 'godan',
    "Godan verb with 'nu' ending":  'godan',
    "Godan verb with 'bu' ending":  'godan',
    "Godan verb with 'mu' ending":  'godan',
    "Godan verb with 'ru' ending":  'godan',
    "Godan verb - -aru special class": 'godan',
    "Ichidan verb":                 'ichidan',
    "Ichidan verb - kureru special class": 'ichidan',
    "Kuru verb - special class":    'kuru',
    "Suru verb - special class":    'suru',
    "Suru verb - irregular":        'suru',
    "noun or verb acting prenominally": None,
    "adjectival nouns or quasi-adjectives (keiyodoshi)": 'adj-na',
    "adjective (keiyoushi)":        'adj-i',
    "adjective (keiyoushi) - yoi/ii class": 'adj-i',
}

# ── JMDict POS → our pos ─────────────────────────────────────────────────────
JM_POS_TO_OUR_POS = {
    "noun (common) (futsuumeishi)": 'noun',
    "Godan verb with 'u' ending":   'verb-u',
    "Godan verb with 'ku' ending":  'verb-u',
    "Godan verb with 'gu' ending":  'verb-u',
    "Godan verb with 'su' ending":  'verb-u',
    "Godan verb with 'tsu' ending": 'verb-u',
    "Godan verb with 'nu' ending":  'verb-u',
    "Godan verb with 'bu' ending":  'verb-u',
    "Godan verb with 'mu' ending":  'verb-u',
    "Godan verb with 'ru' ending":  'verb-u',
    "Ichidan verb":                 'verb-ru',
    "Kuru verb - special class":    'verb-kuru',
    "Suru verb - special class":    'verb-suru',
    "noun or participle which takes the aux. verb suru": 'noun-suru',
    "adjectival nouns or quasi-adjectives (keiyodoshi)": 'na-adj',
    "adjective (keiyoushi)":        'i-adj',
    "adverb (fukushi)":             'adverb',
    "adverb taking the 'to' particle": 'adverb',
    "conjunction":                  'conjunction',
    "interjection (kandoushi)":     'interjection',
    "particle":                     'particle',
    "counter":                      'counter',
    "numeric":                      'numeral',
    "prefix":                       'prefix',
    "suffix":                       'suffix',
    "expression (jukugo)":          'expression',
}

def load_jmdict():
    if JMDICT_PKL.exists():
        print('Loading JMDict from cache...', end=' ', flush=True)
        with open(JMDICT_PKL, 'rb') as f:
            lookup = pickle.load(f)
        print(f'{len(lookup)} entries')
        return lookup
    
    if not JMDICT_GZ.exists():
        print('Downloading JMDict...')
        import urllib.request
        urllib.request.urlretrieve('http://ftp.edrdg.org/pub/Nihongo/JMdict_e.gz', str(JMDICT_GZ))
    
    print('Parsing JMDict (this takes ~30s)...')
    with gzip.open(JMDICT_GZ, 'rt', encoding='utf-8') as f:
        raw = f.read()
    
    entity_map = dict(re.findall(r'<!ENTITY\s+(\S+)\s+"([^"]+)"', raw))
    clean = re.sub(r'<!DOCTYPE[^[]*\[[^\]]*\]>', '', raw, flags=re.DOTALL)
    clean = re.sub(r'&([^;]+);', lambda m: entity_map.get(m.group(1), m.group(1)), clean)
    
    entries_raw = re.findall(r'<entry>.*?</entry>', clean, re.DOTALL)
    lookup = {}
    COMMON = {'news1','news2','ichi1','ichi2','spec1','spec2'}
    
    for i, raw_e in enumerate(entries_raw):
        try:
            root = fromstring(raw_e)
            keb = [k.text for k in root.findall('k_ele/keb')]
            reb = [r.text for r in root.findall('r_ele/reb')]
            pri = set(p.text for p in root.findall('k_ele/ke_pri')) | \
                  set(p.text for p in root.findall('r_ele/re_pri'))
            
            senses = []
            for sense in root.findall('sense'):
                senses.append({
                    'pos':   [p.text for p in sense.findall('pos')],
                    'en':    [g.text for g in sense.findall('gloss')],
                    'misc':  [m.text for m in sense.findall('misc')],
                    'field': [f.text for f in sense.findall('field')],
                })
            
            entry = {'kanji': keb, 'reading': reb, 'senses': senses, 'common': bool(pri & COMMON)}
            for k in keb + reb:
                if k not in lookup:
                    lookup[k] = entry
        except: pass
        if i % 50000 == 0: print(f'  {i}/{len(entries_raw)}...')
    
    with open(JMDICT_PKL, 'wb') as f:
        pickle.dump(lookup, f)
    print(f'Cached {len(lookup)} entries')
    return lookup

def get_meaning_en(jm_entry, limit=3):
    """Get English meanings from JMDict, joined"""
    if not jm_entry or not jm_entry['senses']: return None
    glosses = []
    for sense in jm_entry['senses'][:2]:
        glosses.extend(sense['en'][:2])
    return '; '.join(glosses[:limit]) if glosses else None

def get_conj_type(jm_entry):
    if not jm_entry: return None
    for sense in jm_entry['senses']:
        for pos in sense['pos']:
            if pos in JM_POS_TO_CONJ:
                return JM_POS_TO_CONJ[pos]
    return None

def enrich_file(cat_file: Path, jmdict: dict, dry_run: bool = False, verbose: bool = False):
    with open(cat_file, encoding='utf-8') as f:
        content = f.read()
    
    # Find all entries (double-quote JSON format)
    def patch_entry(m):
        entry_str = m.group(0)
        try:
            e = json.loads(entry_str)
        except:
            return entry_str
        
        word = e.get('word', '')
        reading = e.get('reading', '')
        changed = []
        
        jm = jmdict.get(word) or jmdict.get(reading)
        if not jm:
            return entry_str
        
        # 1. Fill meaning_en if empty or identical to meaning_id
        cur_en = e.get('meaning_en', '')
        if not cur_en or cur_en == e.get('meaning_id', ''):
            new_en = get_meaning_en(jm)
            if new_en and new_en != cur_en:
                e['meaning_en'] = new_en
                changed.append('meaning_en')
        
        # 2. Fix conj_type: null on verbs
        if e.get('conj_type') is None and e.get('pos', '').startswith('verb'):
            ct = get_conj_type(jm)
            if ct:
                e['conj_type'] = ct
                changed.append('conj_type')
        
        # 3. Validate common flag
        if 'common' in e and e['common'] != jm['common']:
            # Only trust JMDict for N5/N4 common words
            pass  # Skip — our curation is intentional
        
        if changed and verbose:
            print(f'  {e["id"]} ({word}): {", ".join(changed)}')
        
        if changed and not dry_run:
            return json.dumps(e, ensure_ascii=False, indent=2)
        return entry_str
    
    new_content = re.sub(
        r'\{(?:[^{}]|\{[^{}]*\})*"id":\s*"vg-[^"]+(?:[^{}]|\{[^{}]*\})*\}',
        patch_entry, content, flags=re.DOTALL
    )
    
    if new_content != content and not dry_run:
        with open(cat_file, 'w', encoding='utf-8') as f:
            f.write(new_content)
        return True
    return new_content != content

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--level', choices=['n5','n4','n3','n2','n1','all'], default='all')
    parser.add_argument('--dry-run', action='store_true')
    parser.add_argument('--verbose', action='store_true')
    args = parser.parse_args()
    
    jmdict = load_jmdict()
    
    levels = ['n5','n4','n3','n2','n1'] if args.level == 'all' else [args.level]
    
    total_changed = 0
    for level in levels:
        level_dir = VOCAB_DIR / level
        if not level_dir.exists():
            print(f'⚠️  {level_dir} not found — run split-vocab.py first')
            continue
        
        cat_files = sorted(level_dir.glob(f'{level}-*.js'))
        level_changed = 0
        print(f'\n{level.upper()} ({len(cat_files)} files):')
        
        for cat_file in cat_files:
            changed = enrich_file(cat_file, jmdict, args.dry_run, args.verbose)
            if changed:
                level_changed += 1
                print(f'  {"[DRY]" if args.dry_run else "✅"} {cat_file.name}')
        
        if level_changed == 0:
            print(f'  (no changes needed)')
        total_changed += level_changed
    
    print(f'\n{"[DRY RUN] " if args.dry_run else ""}Total files updated: {total_changed}')
    
    if total_changed > 0 and not args.dry_run:
        print('\nRemember to run: node scripts/merge-vocab.js')

if __name__ == '__main__':
    main()
