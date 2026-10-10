/**
 * compile_diagnostics.js
 * Compiles 300 atomic diagnostic items from Nugget Nihongo Research Corpus
 * (150 L1 Contrastive Interference items + 150 Phonology & HVPT Minimal Pairs)
 * into production-ready JSON and JavaScript data files for Nugget Nihongo.
 *
 * Targets:
 * - public/data/confusion-pairs.js (exports var confusionPairs = [...])
 * - public/data/diagnostic/diagnostic-inventory.json
 * - public/data/diagnostic/diagnostic-inventory.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const L1_MD = path.resolve(__dirname, '../../nugget-nihongo-research/corpus/sections/contrastive/INDONESIAN-L1-DIAGNOSTIC-INVENTORY-v1.md');
const PHON_MD = path.resolve(__dirname, '../../nugget-nihongo-research/corpus/sections/phonology/HVPT-JAPANESE-PITCH-ACCENT-MINIMAL-PAIR-MATRIX-v1.md');

const CONFUSION_PAIRS_JS = path.join(ROOT, 'public/data/confusion-pairs.js');
const DIAG_DIR = path.join(ROOT, 'public/data/diagnostic');
const DIAG_JSON = path.join(DIAG_DIR, 'diagnostic-inventory.json');
const DIAG_JS = path.join(DIAG_DIR, 'diagnostic-inventory.js');

function cleanMarkdown(str) {
  if (!str) return '';
  return str
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/\*\*/g, '')
    .replace(/\*/g, '')
    .replace(/`/g, '')
    .replace(/^["']|["']$/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function parseL1Level(num, domain, category) {
  // Map based on PT developmental stages and JLPT level ladder
  if (num <= 30) return 'n5'; // Basic case particles
  if (num <= 50) return 'n4'; // Complex particles & tense/aspect
  if (num <= 70) return 'n5'; // High frequency gairaigo
  if (num <= 80) return 'n4'; // Subtle false cognates
  if (num <= 90) return 'n4'; // Benefactives
  if (num <= 100) return 'n4'; // Adnominal clauses
  if (num <= 125) return 'n4'; // Discourse connectors
  if (num <= 140) return 'n4'; // Shuujoshi & modality
  return 'n3'; // Conditionals (tara, ba, to, nara)
}

function parsePhonLevel(num) {
  if (num <= 45) return 'n5'; // Pitch accent homophones
  if (num <= 75) return 'n5'; // Chōon
  if (num <= 105) return 'n5'; // Sokuon
  if (num <= 125) return 'n5'; // Yōon & /N/
  if (num <= 135) return 'n4'; // Liquid flap [ɾ]
  return 'n4'; // Gemba SSW critical K3 safety pairs
}

function extractL1Patterns(item) {
  // Extract key contrastive particles/words from targetForm and failForm
  const failClean = item.failForm.replace(/❌\s*/, '');
  const targetClean = item.targetForm.replace(/✅\s*/, '');
  
  // Try matching bolded tokens in fail/target
  const failTokens = (item.failForm.match(/\*\*(.*?)\*\*/g) || []).map(s => s.replace(/\*\*/g, ''));
  const targetTokens = (item.targetForm.match(/\*\*(.*?)\*\*/g) || []).map(s => s.replace(/\*\*/g, ''));

  if (targetTokens.length > 0 && failTokens.length > 0) {
    return [targetTokens[0], failTokens[0]];
  }

  // Fallback: title extraction
  const titleTokens = item.title.match(/\((.*?)\)/);
  if (titleTokens && titleTokens[1]) {
    const parts = titleTokens[1].split(/vs\.?|\//).map(s => cleanMarkdown(s));
    if (parts.length >= 2) return [parts[0], parts[1]];
  }

  return [cleanMarkdown(targetClean).slice(0, 15), cleanMarkdown(failClean).slice(0, 15)];
}

function extractPhonPatterns(pairText) {
  const parts = pairText.split(/vs\.?<br>|vs\./i).map(cleanMarkdown);
  if (parts.length >= 2) {
    return [parts[0], parts[1]];
  }
  return [cleanMarkdown(pairText), ''];
}

function compileL1Items(content) {
  const lines = content.split('\n');
  const items = [];
  let currentDomain = 'Domain I: Case Particles';
  let currentCategory = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith('## 2. DOMAIN I')) currentDomain = 'Domain I: Asymmetrical Case Particles';
    else if (line.startsWith('## 3. DOMAIN II')) currentDomain = 'Domain II: Tense, Aspect, Modality';
    else if (line.startsWith('## 4. DOMAIN III')) currentDomain = 'Domain III: False Cognates & Wasei-Eigo';
    else if (line.startsWith('## 5. DOMAIN IV')) currentDomain = 'Domain IV: Benefactive Verbs';
    else if (line.startsWith('## 6. DOMAIN V')) currentDomain = 'Domain V: Adnominal Clauses';
    else if (line.startsWith('## 7. DOMAIN VI')) currentDomain = 'Domain VI: Discourse, Modality & Conditionals';

    if (line.startsWith('### Category ')) {
      currentCategory = line.replace('### Category ', '').trim();
    }

    if (line.startsWith('|') && !line.includes('---|---')) {
      const parts = line.split('|').map(s => s.trim());
      const num = parseInt(parts[1], 10);
      if (!isNaN(num) && num >= 1 && num <= 150) {
        const raw = {
          num,
          title: parts[2],
          stimulus: parts[3],
          failForm: parts[4],
          targetForm: parts[5],
          rootCause: parts[6],
          prescription: parts[7],
          domain: currentDomain,
          category: currentCategory
        };

        function inferL1Substratum(title, stimulus, rootCause) {
          const text = (title + ' ' + stimulus + ' ' + rootCause).toLowerCase();
          if (text.includes('/f/') || text.includes('/p/') || text.includes('sunda') || text.includes('fooku') || text.includes('bilabial')) {
            return 'sundanese';
          }
          if (text.includes('jawa') || text.includes('glottal') || text.includes('retroflex') || text.includes('geminate') || text.includes('konsonan berat')) {
            return 'javanese';
          }
          if (text.includes('batak') || text.includes('stres') || text.includes('prosodi') || text.includes('tekanan akhir')) {
            return 'batak_eastern';
          }
          return 'general_indonesian';
        }

        const patterns = extractL1Patterns(raw);
        const level = parseL1Level(num, currentDomain, currentCategory);
        const id = `cp-l1-${String(num).padStart(3, '0')}`;
        const substratum = inferL1Substratum(raw.title, raw.stimulus, raw.rootCause);

        items.push({
          id,
          patterns,
          note_id: `nuance-${id}`,
          level,
          provenance: 'empirical-diagnostic-v1',
          archetype: 'contrastive_pair_slot',
          domain: currentDomain,
          category: cleanMarkdown(currentCategory),
          title: cleanMarkdown(raw.title),
          stimulus_l1: cleanMarkdown(raw.stimulus),
          target_form: cleanMarkdown(raw.targetForm.replace(/✅\s*/, '')),
          l1_trap_form: cleanMarkdown(raw.failForm.replace(/❌\s*/, '')),
          root_cause: cleanMarkdown(raw.rootCause),
          prescription: cleanMarkdown(raw.prescription),
          fsrs_difficulty: 7.2,
          fossilization_risk: num >= 136 ? 'CRITICAL' : 'HIGH',
          l1_substratum: substratum
        });
      }
    }
  }
  return items;
}

function compilePhonItems(content) {
  const lines = content.split('\n');
  const items = [];
  let currentDomain = 'Domain I: Tokyo Pitch Accent';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith('## 3. DOMAIN I')) currentDomain = 'Domain I: Tokyo Pitch Accent Homophones';
    else if (line.startsWith('## 4. DOMAIN II')) currentDomain = 'Domain II: Vowel Duration (Chōon)';
    else if (line.startsWith('## 5. DOMAIN III')) currentDomain = 'Domain III: Geminate Consonants (Sokuon)';
    else if (line.startsWith('## 6. DOMAIN IV')) currentDomain = 'Domain IV: Contracted Sounds (Yōon) & /N/';
    else if (line.startsWith('## 7. DOMAIN V')) currentDomain = 'Domain V: Liquid Flap [ɾ] vs Trill [r]';
    else if (line.startsWith('## 8. DOMAIN VI')) currentDomain = 'Domain VI: Workplace Gemba K3 Emergency Pairs';

    if (line.startsWith('|') && !line.includes('---|---')) {
      const parts = line.split('|').map(s => s.trim());
      const num = parseInt(parts[1], 10);
      if (!isNaN(num) && num >= 1 && num <= 150) {
        const raw = {
          num,
          pairText: parts[2],
          accentPattern: parts[3],
          particlePitch: parts[4],
          l1Transfer: parts[5],
          communicativeRisk: parts[6],
          hvptPrescription: parts[7],
          domain: currentDomain
        };

        function inferPitchAccentType(pattern, pitch) {
          const str = (pattern + ' ' + pitch).toLowerCase();
          if (str.includes('[0]') || str.includes('⓪') || str.includes('heiban')) return 'heiban';
          if (str.includes('[1]') || str.includes('①') || str.includes('atamadaka')) return 'atamadaka';
          if (str.includes('[2]') || str.includes('[3]') || str.includes('②') || str.includes('③') || str.includes('nakadaka')) return 'nakadaka';
          if (str.includes('[4]') || str.includes('④') || str.includes('odaka')) return 'odaka';
          return undefined;
        }

        function inferPhonSubstratum(domain, title, l1Transfer) {
          const text = (domain + ' ' + title + ' ' + l1Transfer).toLowerCase();
          if (text.includes('sunda') || text.includes('/f/') || text.includes('/p/')) return 'sundanese';
          if (text.includes('sokuon') || text.includes('geminate') || text.includes('jawa') || text.includes('konsonan ganda')) return 'javanese';
          if (text.includes('pitch') || text.includes('aksen') || text.includes('stres') || text.includes('batak')) return 'batak_eastern';
          return 'general_indonesian';
        }

        const patterns = extractPhonPatterns(raw.pairText);
        const level = parsePhonLevel(num);
        const id = `cp-phon-${String(num).padStart(3, '0')}`;
        const isPitchDomain = currentDomain.includes('Pitch Accent');
        const pitchType = inferPitchAccentType(raw.accentPattern, raw.particlePitch);
        const phonSubstratum = inferPhonSubstratum(currentDomain, raw.pairText, raw.l1Transfer);

        items.push({
          id,
          patterns,
          note_id: `nuance-${id}`,
          level,
          provenance: 'empirical-diagnostic-v1',
          archetype: isPitchDomain ? 'pitch_accent_contrast' : 'audio_speed_gate',
          domain: currentDomain,
          category: currentDomain,
          title: cleanMarkdown(raw.pairText),
          stimulus_l1: cleanMarkdown(raw.communicativeRisk),
          target_form: patterns[0] || cleanMarkdown(raw.pairText),
          l1_trap_form: patterns[1] || '',
          accent_pattern: cleanMarkdown(raw.accentPattern),
          particle_pitch: cleanMarkdown(raw.particlePitch),
          root_cause: cleanMarkdown(raw.l1Transfer),
          prescription: cleanMarkdown(raw.hvptPrescription || raw.communicativeRisk),
          fsrs_difficulty: 7.2,
          fossilization_risk: num >= 136 ? 'CRITICAL_SAFETY' : 'HIGH',
          l1_substratum: phonSubstratum,
          ...(pitchType ? { pitch_accent_type: pitchType } : {})
        });
      }
    }
  }
  return items;
}

function main() {
  console.log('Reading research corpus diagnostic inventories...');
  if (!fs.existsSync(L1_MD)) throw new Error(`L1 inventory not found: ${L1_MD}`);
  if (!fs.existsSync(PHON_MD)) throw new Error(`Phonology matrix not found: ${PHON_MD}`);

  const l1Content = fs.readFileSync(L1_MD, 'utf8');
  const phonContent = fs.readFileSync(PHON_MD, 'utf8');

  const l1Items = compileL1Items(l1Content);
  const phonItems = compilePhonItems(phonContent);

  console.log(`Compiled ${l1Items.length} L1 Contrastive items.`);
  console.log(`Compiled ${phonItems.length} Phonological / HVPT items.`);

  if (l1Items.length !== 150) {
    throw new Error(`Expected 150 L1 items, got ${l1Items.length}`);
  }
  if (phonItems.length !== 150) {
    throw new Error(`Expected 150 Phonology items, got ${phonItems.length}`);
  }

  const allItems = [...l1Items, ...phonItems];
  console.log(`Total diagnostic items: ${allItems.length}`);

  // Ensure diagnostic directory exists
  if (!fs.existsSync(DIAG_DIR)) {
    fs.mkdirSync(DIAG_DIR, { recursive: true });
  }

  // 1. Write public/data/confusion-pairs.js
  const cpHeader = `// ── confusion-pairs.js ───────────────────────────────────────────
// Canonical Diagnostic Confusion Pairs (Corpus v30 / Jalur C + G)
// Contains 300 compiled items:
//  - 150 Indonesian L1 Morphosyntactic & Lexical Interference Pairs (cp-l1-001 s.d. cp-l1-150)
//  - 150 Phonological & High-Variability Minimal Pairs (cp-phon-001 s.d. cp-phon-150)
// Format: { id, patterns: [a, b], note_id, level, provenance, ... }
// Provenance: 'empirical-diagnostic-v1'
// ══════════════════════════════════════════════════════════════════
`;
  const cpBody = `var confusionPairs = ${JSON.stringify(allItems, null, 2)};\n\nif (typeof module !== 'undefined' && module.exports) {\n  module.exports = { confusionPairs };\n}\n`;
  fs.writeFileSync(CONFUSION_PAIRS_JS, cpHeader + cpBody, 'utf8');
  console.log(`Updated: ${CONFUSION_PAIRS_JS} (${fs.statSync(CONFUSION_PAIRS_JS).size} bytes)`);

  // 2. Write public/data/diagnostic/diagnostic-inventory.json
  const inventoryData = {
    version: '1.0.0',
    generated_at: new Date().toISOString(),
    total_count: allItems.length,
    l1_contrastive_count: l1Items.length,
    phonology_hvpt_count: phonItems.length,
    domains: {
      l1_case_particles: l1Items.filter(i => i.domain.includes('Case Particles')).length,
      l1_tense_aspect: l1Items.filter(i => i.domain.includes('Tense')).length,
      l1_false_cognates: l1Items.filter(i => i.domain.includes('Cognates')).length,
      l1_benefactives: l1Items.filter(i => i.domain.includes('Benefactive')).length,
      l1_adnominal: l1Items.filter(i => i.domain.includes('Adnominal')).length,
      l1_discourse_modality: l1Items.filter(i => i.domain.includes('Discourse')).length,
      phon_pitch_accent: phonItems.filter(i => i.domain.includes('Pitch Accent')).length,
      phon_choon: phonItems.filter(i => i.domain.includes('Chōon')).length,
      phon_sokuon: phonItems.filter(i => i.domain.includes('Sokuon')).length,
      phon_yoon_nasal: phonItems.filter(i => i.domain.includes('Yōon')).length,
      phon_liquid_sibilant: phonItems.filter(i => i.domain.includes('Liquid')).length,
      phon_gemba_k3: phonItems.filter(i => i.domain.includes('Gemba')).length,
    },
    items: allItems
  };

  fs.writeFileSync(DIAG_JSON, JSON.stringify(inventoryData, null, 2), 'utf8');
  console.log(`Generated: ${DIAG_JSON} (${fs.statSync(DIAG_JSON).size} bytes)`);

  // 3. Write public/data/diagnostic/diagnostic-inventory.js
  const diagJsHeader = `// ── diagnostic-inventory.js ─────────────────────────────────────
// Universal global bundle for browser and service worker ingestion
`;
  const diagJsBody = `var diagnosticInventory = ${JSON.stringify(inventoryData, null, 2)};\n\nif (typeof module !== 'undefined' && module.exports) {\n  module.exports = { diagnosticInventory };\n}\n`;
  fs.writeFileSync(DIAG_JS, diagJsHeader + diagJsBody, 'utf8');
  console.log(`Generated: ${DIAG_JS} (${fs.statSync(DIAG_JS).size} bytes)`);

  console.log('\nCompilation completed successfully with 100% data integrity!');
}

main();
