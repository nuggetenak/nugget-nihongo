#!/usr/bin/env python3
"""
jmdict-pipeline.py — Download JMdict XML and transform to Nugget Nihongo format.

Downloads JMdict_e_examp.xml.gz (English + examples edition) from EDRDG,
parses it, and outputs:
  1. jmdict-n5.js through jmdict-n1.js  (JLPT-tagged entries)
  2. jmdict-common.js                    (non-JLPT but common words)
  3. jmdict-stats.json                   (counts, coverage report)

Run from project root:
  python3 tools/jmdict-pipeline.py

Output goes to: tools/jmdict-output/

NOTE: This does NOT overwrite existing vocab files. It produces separate
output files that need manual review before merging into public/data/vocab/.
The merge step should reconcile with existing vg-n5-* IDs.

License: JMdict is property of the Electronic Dictionary Research and
Development Group (EDRDG). Usage must include attribution per:
https://www.edrdg.org/edrdg/licence.html
"""

import gzip, json, os, sys, re
from collections import defaultdict
from pathlib import Path

try:
    from lxml import etree
except ImportError:
    print("ERROR: lxml required. Run: pip install lxml --break-system-packages")
    sys.exit(1)

# ── Config ────────────────────────────────────────────────
JMDICT_URL = "http://ftp.edrdg.org/pub/Nihongo/JMdict_e_examp.xml.gz"
JMDICT_FALLBACK_URL = "http://ftp.edrdg.org/pub/Nihongo/JMdict_e.xml.gz"
OUTPUT_DIR = Path(__file__).parent / "jmdict-output"
JLPT_LEVELS = ['n5', 'n4', 'n3', 'n2', 'n1']

# JLPT tag mapping from JMdict
JLPT_TAG_MAP = {
    'jlpt-n5': 'n5', 'jlpt-n4': 'n4', 'jlpt-n3': 'n3',
    'jlpt-n2': 'n2', 'jlpt-n1': 'n1',
}

# POS mapping: JMdict entity → our pos values
POS_MAP = {
    'v1':    'verb-ru',    # ichidan
    'v5':    'verb-u',     # godan (prefix, many subtypes)
    'vs':    'verb-suru',  # suru verb
    'vk':    'verb-kuru',  # kuru verb
    'adj-i': 'adj-i',
    'adj-na':'adj-na',
    'adj-no':'adj-no',
    'n':     'noun',
    'adv':   'adverb',
    'prt':   'particle',
    'conj':  'conjunction',
    'int':   'interjection',
    'pn':    'pronoun',
    'ctr':   'counter',
    'pref':  'prefix',
    'suf':   'suffix',
    'exp':   'expression',
    'aux-v': 'aux-verb',
    'aux-adj':'aux-adj',
}

def download_jmdict():
    """Download JMdict if not cached."""
    import urllib.request
    cache_path = OUTPUT_DIR / "JMdict_e_examp.xml.gz"
    cache_fallback = OUTPUT_DIR / "JMdict_e.xml.gz"

    if cache_path.exists():
        print(f"Using cached: {cache_path}")
        return cache_path
    if cache_fallback.exists():
        print(f"Using cached fallback: {cache_fallback}")
        return cache_fallback

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    for url, path in [(JMDICT_URL, cache_path), (JMDICT_FALLBACK_URL, cache_fallback)]:
        try:
            print(f"Downloading {url}...")
            urllib.request.urlretrieve(url, path)
            print(f"Saved to {path} ({path.stat().st_size / 1024 / 1024:.1f} MB)")
            return path
        except Exception as e:
            print(f"  Failed: {e}")
            continue

    print("ERROR: Could not download JMdict from any source.")
    print("Manual download: https://www.edrdg.org/wiki/index.php/JMdict-EDICT_Dictionary_Project")
    sys.exit(1)


def map_pos(pos_entities):
    """Map JMdict POS entities to our schema pos values."""
    for entity in pos_entities:
        for prefix, our_pos in POS_MAP.items():
            if entity.startswith(prefix):
                return our_pos
    return 'other'


def parse_jmdict(gz_path):
    """Parse JMdict XML and return structured entries."""
    print("Parsing XML (this takes 30-60 seconds)...")

    entries = []
    jlpt_counts = defaultdict(int)
    common_count = 0

    # Parse with iterparse for memory efficiency
    with gzip.open(gz_path, 'rb') as f:
        context = etree.iterparse(f, events=('end',), tag='entry',
                                   recover=True, huge_tree=True)

        for event, elem in context:
            entry = parse_entry(elem)
            if entry:
                entries.append(entry)
                if entry.get('jlpt'):
                    jlpt_counts[entry['jlpt']] += 1
                elif entry.get('common'):
                    common_count += 1

            elem.clear()
            while elem.getprevious() is not None:
                del elem.getparent()[0]

    print(f"Parsed {len(entries)} entries total")
    for level in JLPT_LEVELS:
        print(f"  {level.upper()}: {jlpt_counts.get(level, 0)}")
    print(f"  Common (non-JLPT): {common_count}")

    return entries


def parse_entry(elem):
    """Parse a single JMdict <entry> element."""
    ent_seq = elem.findtext('ent_seq', '')

    # Kanji elements (writing forms)
    k_eles = elem.findall('k_ele')
    words = [k.findtext('keb', '') for k in k_eles]
    word = words[0] if words else ''

    # Reading elements
    r_eles = elem.findall('r_ele')
    readings = [r.findtext('reb', '') for r in r_eles]
    reading = readings[0] if readings else ''

    if not reading:
        return None

    if not word:
        word = reading  # kana-only word

    # Sense elements (meanings)
    senses = elem.findall('sense')
    meanings_en = []
    pos_list = []
    jlpt_level = None

    for sense in senses:
        # POS
        for pos_elem in sense.findall('pos'):
            if pos_elem.text:
                pos_list.append(pos_elem.text)

        # English glosses
        for gloss in sense.findall('gloss'):
            lang = gloss.get('{http://www.w3.org/XML/1998/namespace}lang', 'eng')
            if lang == 'eng' and gloss.text:
                meanings_en.append(gloss.text)

        # JLPT tags (in misc)
        for misc in sense.findall('misc'):
            if misc.text and misc.text in JLPT_TAG_MAP:
                jlpt_level = JLPT_TAG_MAP[misc.text]

    if not meanings_en:
        return None

    # Check if common (news1/2, ichi1/2, spec1/2, gai1/2)
    is_common = False
    for k in k_eles:
        for pri in k.findall('ke_pri'):
            if pri.text and pri.text in ('news1', 'ichi1', 'spec1', 'gai1',
                                          'news2', 'ichi2', 'spec2', 'gai2'):
                is_common = True
                break
    for r in r_eles:
        for pri in r.findall('re_pri'):
            if pri.text and pri.text in ('news1', 'ichi1', 'spec1', 'gai1',
                                          'news2', 'ichi2', 'spec2', 'gai2'):
                is_common = True
                break

    return {
        'ent_seq': ent_seq,
        'word': word,
        'reading': reading,
        'readings_alt': readings[1:] if len(readings) > 1 else [],
        'writings_alt': words[1:] if len(words) > 1 else [],
        'meaning_en': '; '.join(meanings_en[:5]),  # cap at 5 senses
        'meaning_id': '',  # to be filled by translation pipeline
        'pos': map_pos(pos_list),
        'jlpt': jlpt_level,
        'common': is_common,
        'pos_raw': pos_list[:3],
    }


def write_js_file(entries, level, output_dir):
    """Write entries as a JS file in our schema format."""
    filename = f"jmdict-{level}.js" if level != 'common' else "jmdict-common.js"
    filepath = output_dir / filename
    var_name = f"jmdictN{level[1]}" if level != 'common' else "jmdictCommon"

    lines = [
        f"// {filename} — JMdict import for Nugget Nihongo",
        f"// Source: EDRDG JMdict (CC-BY-SA 4.0)",
        f"// Entries: {len(entries)}",
        f"// Generated by jmdict-pipeline.py",
        f"// WARNING: meaning_id is EMPTY — needs Indonesian translation pipeline",
        f"// WARNING: IDs are jm-* (temporary) — need remapping to vg-* before merge",
        f"",
        f"window.{var_name} = [",
    ]

    for i, e in enumerate(entries):
        word_esc = e['word'].replace("'", "\\'")
        reading_esc = e['reading'].replace("'", "\\'")
        meaning_esc = e['meaning_en'].replace("'", "\\'")
        jlpt = e.get('jlpt') or level
        idx = str(i + 1).zfill(5)

        lines.append(f"  {{")
        lines.append(f"    id: 'jm-{jlpt}-{idx}',")
        lines.append(f"    word: '{word_esc}',")
        lines.append(f"    reading: '{reading_esc}',")
        lines.append(f"    meaning_en: '{meaning_esc}',")
        lines.append(f"    meaning_id: '',")
        lines.append(f"    jlpt: '{jlpt}',")
        lines.append(f"    pos: '{e['pos']}',")
        lines.append(f"    common: {str(e['common']).lower()},")
        lines.append(f"    ent_seq: '{e['ent_seq']}',")
        lines.append(f"  }},")

    lines.append("];")
    lines.append(f"console.log('[jmdict] {filename}:', window.{var_name}.length, 'entries');")

    filepath.write_text('\n'.join(lines), encoding='utf-8')
    print(f"  Wrote {filepath} ({len(entries)} entries)")


def main():
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    gz_path = download_jmdict()
    entries = parse_jmdict(gz_path)

    # Split by JLPT level
    by_level = defaultdict(list)
    common = []

    for e in entries:
        if e.get('jlpt'):
            by_level[e['jlpt']].append(e)
        elif e.get('common'):
            common.append(e)

    # Write JS files
    print("\nWriting output files...")
    for level in JLPT_LEVELS:
        if by_level[level]:
            write_js_file(by_level[level], level, OUTPUT_DIR)

    if common:
        write_js_file(common, 'common', OUTPUT_DIR)

    # Write stats
    stats = {
        'total_parsed': len(entries),
        'jlpt': {level: len(by_level[level]) for level in JLPT_LEVELS},
        'common_non_jlpt': len(common),
        'jlpt_total': sum(len(by_level[l]) for l in JLPT_LEVELS),
    }
    stats_path = OUTPUT_DIR / "jmdict-stats.json"
    stats_path.write_text(json.dumps(stats, indent=2))
    print(f"\n  Stats: {stats_path}")
    print(f"\n=== DONE ===")
    print(f"Total JLPT entries: {stats['jlpt_total']}")
    print(f"Common (non-JLPT): {stats['common_non_jlpt']}")
    print(f"\nNext steps:")
    print(f"  1. Run Indonesian translation pipeline on jmdict-n5.js first")
    print(f"  2. Reconcile with existing vocab-n5.js (711 entries already have meaning_id)")
    print(f"  3. Merge: keep existing entries, add new ones with next available vg-n5-* IDs")


if __name__ == '__main__':
    main()
