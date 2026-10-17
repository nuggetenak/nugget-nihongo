---
name: nugget-persona-qa-engine
description: "Run automated, multi-subagent persona UX and content audits using the 200 Indonesian learner personas, Playwright CLI, and the 5-point data quality rubric."
---

# Nugget Persona QA & Swarm Engine Skill (Hardened Production Playbook)

This skill automates testing across the **200 Indonesian Learner Personas** using an edge-case hardened **parallel subagent swarm**. It prevents browser session collisions, auto-resolves dev/live server targets, emulates throttled networks, handles asynchronous script chunking, and evaluates UX/content against rigorous quality gates.

---

## 1. Canonical Dataset Locations

All structured data is queried directly from canonical JSON datasets:
- **200 Indonesian Personas:** `nugget-nihongo-persona-lab/Nugget_Nihongo_Antigravity_Persona_Test_Kit_v6/personas/200_INDONESIAN_LEARNER_PERSONAS.json`
- **Data Quality Rubric:** `nugget-nihongo-persona-lab/Nugget_Nihongo_Antigravity_Persona_Test_Kit_v6/data_quality_assurance/DATA_QUALITY_AUDIT_RUBRIC.json`
- **Content & Question Schema:** `nugget-nihongo-persona-lab/Nugget_Nihongo_Antigravity_Persona_Test_Kit_v6/data_quality_assurance/UNIVERSAL_CONTENT_AND_QUESTION_SCHEMA.json`

---

## 2. Automated Target & Pre-Flight Health Resolver

Before spawning persona subagents, the orchestrator auto-detects the active test target using this cascading probe:

```bash
node -e "
const http = require('http');
const https = require('https');
function probe(url) {
  return new Promise(res => {
    const mod = url.startsWith('https') ? https : http;
    mod.get(url, r => res(r.statusCode < 400)).on('error', () => res(false));
  });
}
(async () => {
  if (await probe('http://localhost:5173')) console.log('TARGET_URL=http://localhost:5173');
  else if (await probe('http://localhost:3000')) console.log('TARGET_URL=http://localhost:3000');
  else console.log('TARGET_URL=https://nugget-nihongo.pages.dev');
})();
"
```

---

## 3. Automated Persona Sampling Modes

### Mode A: The 4-Pillar Sweep (Default)
Pulls 1 persona from each core pillar to ensure comprehensive curriculum, device, and network diversity:
1. **JLPT Beginner Track:** `IDN-JP-001` (Arif Pratama, 22yo, Pre-N5 Barista, Budget Android 375×667, Throttled Data)
2. **JFT-Basic Track:** `IDN-JP-041` (Rian Hidayat, 25yo, JFT A2 Jobseeker, Standard Mobile 390×844)
3. **SSW Vocational Track:** `IDN-JP-065` (Dewi Lestari, 28yo, SSW Kaigo Caregiver, Tablet 768×1024)
4. **Living in Japan Track:** `IDN-JP-150` (Siti Nurhaliza, 30yo, Expat navigating clinic & municipal ward)

### Mode B: Feature-Targeted Sampling
To sample by screen or feature, query the JSON tags:
```bash
node -e "
const fs = require('fs');
const data = JSON.parse(fs.readFileSync('nugget-nihongo-persona-lab/Nugget_Nihongo_Antigravity_Persona_Test_Kit_v6/personas/200_INDONESIAN_LEARNER_PERSONAS.json', 'utf8'));
const query = process.argv[1].toLowerCase();
const matches = data.personas.filter(p => 
  (p.test_area && p.test_area.toLowerCase().includes(query)) ||
  (p.product_focus && p.product_focus.toLowerCase().includes(query)) ||
  (p.tags && p.tags.some(t => t.toLowerCase().includes(query)))
).slice(0, 3);
console.log(JSON.stringify(matches.map(m => ({ id: m.id, name: m.name, level: m.japanese_level_self_reported, device: m.device_context, task: m.task_scenario })), null, 2));
" "quiz"
```

### Mode C: Official Batch Matrix (B01–B20)
Loads the exact 10 personas assigned to a batch from `PERSONA_RUN_MATRIX.json`.

---

## 4. Multi-Subagent Swarm Execution & Invariants

The orchestrator calls `invoke_subagent` to spawn 2 to 4 concurrent `persona-tester` subagents in parallel.

### Mandatory Subagent Execution Invariants:

1. **Storage Sandboxing:** Subagents must launch with isolated browser sessions to prevent `localStorage` bleeding between personas (e.g. Subagent 1's onboarding status spoiling Subagent 2's fresh beginner test).
2. **Dynamic Chunk Loading Gates:** Nugget Nihongo uses asynchronous script chunking (`inFlightLoads`). Subagents must wait for loading spinners or skeleton shimmers to dismiss before taking snapshots or clicking.
3. **Viewport & Device Emulation:**
   - Budget Android: `npx playwright-cli resize 375 667`
   - Modern Mobile: `npx playwright-cli resize 390 844`
   - Tablet: `npx playwright-cli resize 768 1024`
4. **Network Profile Emulation:**
   - For `connectivity_context: "Mobile data, often throttled"`: verify slow 3G loading states and skeleton spinners.
   - For offline testing: verify Service Worker cache-first fallback.
5. **Bounded Quiz Cap:**
   - Maximum 5 quiz questions or 3 consecutive errors per persona run.
   - If a persona fails repeatedly, record the exact point of friction/abandonment rather than looping.
6. **Synthetic Research Integrity:**
   - Clearly separate objective DOM defects from `[SYNTHETIC HYPOTHESIS]` persona reactions. Never invent simulated "real user quotes."

---

## 5. 4-Tier Defect Severity Matrix

Every finding must be tagged with a rigid severity level:

| Tier | Severity | Definition & Examples |
| :--- | :--- | :--- |
| **P0** | **CRITICAL** | Total app crash, white screen, infinite hang, or progression blocker. |
| **P1** | **HIGH** | Horizontal scroll blowouts ($>0$px), buttons obscured by `BottomNav`, broken `<ruby>` furigana misalignment, or ambiguous quiz keys. |
| **P2** | **MEDIUM** | Awkward Indonesian phrasing, confusing grammatical jargon without glossary, tap targets $<40\times 40$px, or missing empty states. |
| **P3** | **LOW** | Minor spacing inconsistency, typography polish, or non-blocking micro-interaction quirks. |

---

## 6. Consolidated Executive Synthesis Report

The parent orchestrator compiles all subagent findings into a single unified summary in chat:

```markdown
# 🧑‍🎓 Persona Swarm QA Audit Report

| Persona | Demographics & Target | Device Emulated | Result | Top Friction Observed | Severity |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Arif Pratama** (`IDN-JP-001`) | 22yo Barista · Pre-N5 | Budget Android (375×667) | ⚠️ Pass w/ Friction | Submit button obscured by bottom nav | P1 |
| **Dewi Lestari** (`IDN-JP-065`) | 28yo Caregiver · SSW N4 | iPad Mini (768×1024) | ✅ PASS | Responsive scaling clean; terminology clear | None |

### 🔍 Defect Discoveries & Friction Points:
1. **[P1 - Responsive/Layout]**: On 375px viewports, `<BottomNav />` overlaps the lesson confirmation button due to missing bottom cushion.
2. **[P2 - Content/Furigana]**: N5 Vocab #104 has mismatched furigana reading on `図書館`.

### 🛠️ Recommended Actionable Fixes:
1. Apply `pb-[calc(5.5rem+env(safe-area-inset-bottom))]` on `MateriHubPage.tsx` content container.
2. Correct furigana reading in `data/vocab/n5.json` line 104.
```
