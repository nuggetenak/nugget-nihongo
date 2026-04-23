"""
split-grammar.py — Split monolithic grammar-nX.js into category files
Uses string-aware bracket tracking to correctly extract every entry.
Run once to migrate, then edit category files directly.
"""
import re, os
from pathlib import Path

REPO      = Path('/home/claude/nugget-nihongo')
GRAM_DIR  = REPO / 'public/data/grammar'

CAT_GROUPS = {
    'past-tense': 'tense-aspect', 'progressive-state': 'tense-aspect',
    'inception-continuation': 'tense-aspect', 'sequential-temporal': 'tense-aspect',
    'completion-regret': 'tense-aspect', 'te-form-use': 'tense-aspect',
    'verb-form': 'verb-forms', 'potential': 'verb-forms', 'passive': 'verb-forms',
    'causative': 'verb-forms', 'volitional-intention': 'verb-forms',
    'conditional-tara': 'conditionals',
    'conjecture-possibility': 'modality', 'hearsay-report': 'modality',
    'sentence-final-modality': 'modality', 'sentence-final-request': 'modality',
    'obligation-necessity': 'modality', 'permission-prohibition': 'modality',
    'negative': 'negation-extent', 'extent-degree': 'negation-extent',
    'comparison': 'negation-extent',
    'reason-cause': 'connectives', 'contrast-concession': 'connectives',
    'listing-addition': 'connectives', 'purpose': 'connectives',
    'quotation-thought': 'connectives',
    'nominalization': 'nouns-predicates', 'predicate-adjective': 'nouns-predicates',
    'copula': 'nouns-predicates', 'existence': 'nouns-predicates',
    'desire-want': 'desire-social', 'teineigo-pattern': 'desire-social',
    'particle': 'particles', 'adverb': 'adverbs',
    'interrogative': 'expressions', 'expression': 'expressions',
}

GROUPS = [
    'tense-aspect', 'verb-forms', 'conditionals', 'modality', 'negation-extent',
    'connectives', 'nouns-predicates', 'desire-social', 'particles', 'adverbs',
    'expressions', 'misc',
]

def get_group(cat):
    return CAT_GROUPS.get(cat, 'misc')

def find_object_end(content, start):
    """
    Given position of opening '{', find the matching '}'.
    String-aware: skips characters inside JS strings (single/double/template).
    Returns index of the matching }.
    """
    depth    = 0
    in_str   = False
    str_char = None
    i        = start

    while i < len(content):
        ch = content[i]

        if in_str:
            if ch == '\\':          # escape — skip next char
                i += 2
                continue
            if ch == str_char:      # string closes
                in_str = False
        else:
            if ch in ("'", '"', '`'):
                in_str   = True
                str_char = ch
            elif ch == '{':
                depth += 1
            elif ch == '}':
                depth -= 1
                if depth == 0:
                    return i        # found the matching }
        i += 1

    return -1                       # unclosed (shouldn't happen on valid JS)


def extract_grammar_entries(content, level):
    """
    Extract every top-level grammar object from a grammar-nX.js file.
    Returns list of raw entry strings (without trailing comma).
    """
    pfx     = f'gn{level[-1]}'
    pattern = re.compile(rf"id\s*:\s*'{pfx}-\d+'")
    entries = []

    for m in pattern.finditer(content):
        # Walk backwards to find the opening { of this entry
        open_brace = content.rfind('{', 0, m.start())
        if open_brace == -1:
            continue

        close_brace = find_object_end(content, open_brace)
        if close_brace == -1:
            print(f'  ⚠️  Unclosed entry for match at {m.start()}')
            continue

        raw = content[open_brace : close_brace + 1].strip()
        entries.append(raw)

    return entries


def split_level(level):
    src = GRAM_DIR / f'grammar-{level}.js'
    if not src.exists():
        print(f'⚠️  {src} not found — skipping')
        return

    with open(src, encoding='utf-8') as f:
        content = f.read()

    entries = extract_grammar_entries(content, level)
    if not entries:
        print(f'{level.upper()}: 0 entries found')
        return

    by_group = {g: [] for g in GROUPS}
    for entry in entries:
        cat_m = re.search(r"cat\s*:\s*'([^']+)'", entry)
        cat   = cat_m.group(1) if cat_m else 'expression'
        by_group[get_group(cat)].append(entry)

    out_dir = GRAM_DIR / level
    out_dir.mkdir(parents=True, exist_ok=True)

    print(f'\n{level.upper()} ({len(entries)} entries):')
    for group, group_entries in by_group.items():
        if not group_entries:
            continue

        print(f'  {group:20s} {len(group_entries):4d}')
        content_str = ',\n\n'.join(e.rstrip(',') for e in group_entries)
        out_path    = out_dir / f'{level}-{group}.js'

        out = f"""// {'─'*62}
//  {level}-{group}.js — Nugget Nihongo · JLPT {level.upper()} Grammar
//  {len(group_entries)} entries | Category: {group}
//  Edit directly — merge with: node scripts/merge-grammar.js
// {'─'*62}

window.grammar{level.upper()}_{group.replace('-','_').title()} = [

{content_str}

];
"""
        with open(out_path, 'w', encoding='utf-8') as f:
            f.write(out)

    print(f'  → Written to grammar/{level}/')


for level in ['n5', 'n4', 'n3', 'n2', 'n1']:
    split_level(level)

print('\nSplit complete.')
