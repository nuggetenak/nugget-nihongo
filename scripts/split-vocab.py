"""
split-vocab.py — Split monolithic vocab-nX.js into category files
Run once to migrate. After this, edit category files directly.
"""
import re, json, os, pickle

REPO = '/home/claude/nugget-nihongo'

# Category definitions by POS group
POS_TO_CAT = {
    # VERBS
    'verb-u':        'verbs',
    'verb-ru':       'verbs',
    'verb-suru':     'verbs',
    'verb-kuru':     'verbs',
    'verb-aru':      'verbs',
    'verb-irr':      'verbs',
    'verb-potential-lexical': 'verbs',
    'noun-suru':     'verbs',  # noun-suru acts like verb in practice
    # ADJECTIVES
    'i-adj':         'adjectives',
    'na-adj':        'adjectives',
    'no-adj':        'adjectives',
    'pre-noun-adj':  'adjectives',
    'adj-i':         'adjectives',  # legacy
    'adj-na':        'adjectives',  # legacy
    # ADVERBS & CONJUNCTIONS
    'adverb':              'adverbs',
    'adverb-degree':       'adverbs',
    'adverb-frequency':    'adverbs',
    'adverb-manner':       'adverbs',
    'adverb-conjunctive':  'adverbs',
    'adverb-sentence':     'adverbs',
    'conjunction':         'adverbs',
    'conj':                'adverbs',  # legacy
    'conj-coord':          'adverbs',
    'conj-adversative':    'adverbs',
    # EXPRESSIONS
    'expression':          'expressions',
    'expr-set':            'expressions',
    'expr-greeting':       'expressions',
    'expr-onomatopoeia':   'expressions',
    'interjection':        'expressions',
    'particle':            'expressions',
    'particle-case':       'expressions',
    'particle-topic':      'expressions',
    'particle-final':      'expressions',
    'particle-compound':   'expressions',
    'particle-conj':       'expressions',
    'expr':                'expressions',  # legacy
    # NOUNS — default for everything else
}

def get_cat(pos):
    return POS_TO_CAT.get(pos, 'nouns')

def extract_entries_json(content, level):
    """Extract double-quote JSON format entries (N3+)"""
    return re.findall(
        r'\{(?:[^{}]|\{[^{}]*\})*"id":\s*"vg-' + level + r'-[^"]+(?:[^{}]|\{[^{}]*\})*\}',
        content, re.DOTALL
    )

def extract_entries_sq(content, level):
    """Extract single-quote JS format entries (N5/N4)"""
    # Split by entry boundary
    splits = list(re.finditer(rf"id:\s*'vg-{level}-\d+'", content))
    entries = []
    for i, m in enumerate(splits):
        # Find the surrounding { }
        start = content.rfind('{', 0, m.start())
        end = splits[i+1].start() if i+1 < len(splits) else len(content)
        # Find closing }
        close = content.find('\n},', m.start())
        if close == -1: close = content.find('\n}', m.start())
        if start != -1 and close != -1:
            entries.append(content[start:close+2].strip())
    return entries

def get_pos_from_entry(entry_str):
    """Extract POS from entry string (handles both formats)"""
    m = re.search(r'"pos":\s*"([^"]+)"', entry_str) or \
        re.search(r"pos:\s*'([^']+)'", entry_str)
    return m.group(1) if m else 'noun'

def get_id_from_entry(entry_str):
    m = re.search(r'"id":\s*"([^"]+)"', entry_str) or \
        re.search(r"id:\s*'([^']+)'", entry_str)
    return m.group(1) if m else '?'

CATS = ['verbs', 'adjectives', 'adverbs', 'nouns', 'expressions']

# Process each level
for level in ['n5', 'n4', 'n3', 'n2', 'n1']:
    src = os.path.join(REPO, f'public/data/vocab/vocab-{level}.js')
    with open(src, encoding='utf-8') as f:
        content = f.read()
    
    # Extract entries
    if level in ['n5', 'n4']:
        entries = extract_entries_sq(content, level)
    else:
        entries = extract_entries_json(content, level)
    
    # Split by category
    by_cat = {cat: [] for cat in CATS}
    uncategorized = []
    
    for entry_str in entries:
        pos = get_pos_from_entry(entry_str)
        cat = get_cat(pos)
        by_cat[cat].append(entry_str)
    
    print(f'\n{level.upper()} ({len(entries)} entries):')
    for cat, cat_entries in by_cat.items():
        if cat_entries:
            print(f'  {cat:15s} {len(cat_entries):4d} entries')
    
    # Write category files
    out_dir = os.path.join(REPO, f'public/data/vocab/{level}')
    os.makedirs(out_dir, exist_ok=True)
    
    # Extract header comments from source
    header_match = re.search(r'^(//.*?\n)+', content)
    header = header_match.group(0) if header_match else ''
    
    for cat, cat_entries in by_cat.items():
        if not cat_entries: continue
        
        var_name = f'window.vocab{level.upper()}_{cat.title().replace("-","")}'
        
        out_path = os.path.join(out_dir, f'{level}-{cat}.js')
        
        # Determine format
        if level in ['n5', 'n4']:
            sep = ',\n\n'
            content_str = sep.join(e.rstrip(',').strip() for e in cat_entries)
        else:
            sep = ',\n\n'
            content_str = sep.join(e.strip().rstrip(',') for e in cat_entries)
        
        out = f"""// {'─'*60}
//  {level}-{cat}.js — Nugget Nihongo · JLPT {level.upper()} · {cat.title()}
//  {len(cat_entries)} entries | Auto-split from vocab-{level}.js
//  Schema: data/_schema-vocab.md | Part of vocab/{level}/ module
// {'─'*60}

{var_name} = [

{content_str}

];
"""
        with open(out_path, 'w', encoding='utf-8') as f:
            f.write(out)
        print(f'  → {level}/{level}-{cat}.js ({len(cat_entries)} entries)')

print('\nSplit complete.')
