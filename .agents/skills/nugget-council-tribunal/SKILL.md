---
name: nugget-council-tribunal
description: 3-House Council Tribunal (Educational, SSW, Technical) and Persona Swarm orchestrator for Nugget Nihongo data quality audits, pedagogical verification, and docket distillation.
---

# Nugget Nihongo 3-House Council Tribunal Skill

## Overview
`nugget-council-tribunal` orchestrates the formal 3-House Council and Almighty Judge workflow derived from Test Kit v6, upgraded for Nugget Nihongo (v19.3.3):
1. **Educational Excellence Council** (60 pedagogical roles)
2. **SSW Comprehensive Sector Assurance Council** (32 vocational roles)
3. **Technical & Product Specialist Team** (50 engineering roles)
4. **Persona Swarm** (200 curated Indonesian learner archetypes)
5. **The Almighty Judge** (Chief Magistrate & consensus docket synthesizer)

## Architecture & Zero-Clash Operating Protocol

```
                        ┌────────────────────────────────────────────────────────┐
                        │             The 3-House Council Tribunal              │
                        └──────────────────────────┬─────────────────────────────┘
                                                   │
          ┌────────────────────────────────────────┼────────────────────────────────────────┐
          ▼                                        ▼                                        ▼
┌───────────────────┐                    ┌───────────────────┐                    ┌───────────────────┐
│ Educational House │                    │     SSW House     │                    │  Technical House  │
│  (60 specialists) │                    │  (32 specialists) │                    │  (50 specialists) │
│ - JLPT N5-N1      │                    │ - 19 SSW Sectors  │                    │ - Responsive UI   │
│ - JFT Can-Do A1/A2│                    │ - Prometric Syllabi│                    │ - PWA / Offline   │
│ - Furigana / Kanji│                    │ - Safety Japanese │                    │ - FSRS Retention  │
│ - L1 Nuances      │                    │ - Workplace Role  │                    │ - Accessibility   │
└─────────┬─────────┘                    └─────────┬─────────┘                    └─────────┬─────────┘
          │                                        │                                        │
          └────────────────────────────────────────┼────────────────────────────────────────┘
                                                   │
                                                   ▼
                                 ┌───────────────────────────────────┐
                                 │        The Almighty Judge         │
                                 │ - Anti-hallucination filter       │
                                 │ - Consensus synthesis             │
                                 │ - Prioritized docket distillation │
                                 └─────────────────┬─────────────────┘
                                                   │
                                                   ▼
                         ┌──────────────────────────────────────────────────┐
                         │ Outputs:                                         │
                         │ - templates/FINDINGS_LEDGER_TEMPLATE.csv         │
                         │ - COUNCIL_URGENT_BRIEF.md                        │
                         │ - LATEST_MAIN_PROJECT_FIX_PROMPT.md              │
                         └──────────────────────────────────────────────────┘
```

## Running the Tribunal

### 1. Pre-Flight Target Verification
Confirm the environment and target repository status without mutating files:
```powershell
node -e "
const fs = require('fs');
const target = 'nugget-nihongo/public/data/curriculum';
if (fs.existsSync(target)) {
  const count = fs.readdirSync(target).filter(f => f.endsWith('.json')).length;
  console.log('Target verified. Active curriculum files:', count);
} else {
  console.error('Target not found:', target);
}
"
```

### 2. Layer 1: Deterministic Hard-Fact Audit
Run the read-only audit engine to inspect curriculum tracks, furigana bracket syntax, quiz distractors, and diagnostic coverage:
```powershell
uv run python nugget-nihongo-persona-lab/dashboard_app/audit_engine.py
```
Or execute directly using the virtual environment:
```powershell
tooling-lab\.venv\Scripts\python.exe -c "
import sys; sys.path.append('nugget-nihongo-persona-lab/dashboard_app')
from audit_engine import AuditEngine
engine = AuditEngine()
findings = engine.run_layer1_hard_facts()
print(f'Discovered {len(findings)} open findings.')
"
```

### 3. Layer 2: Invoking Council Subagents
Spawn individual council subagents via `invoke_subagent` using the registered types:
- `educational-council`: Deep dive into grammar explanations and furigana validity.
- `ssw-council`: Cross-examine Prometric syllabus alignment for specific SSW fields.
- `technical-council`: Validate mobile responsive layouts, touch target dimensions, and FSRS math.

### 4. Layer 3: Persona Swarm Execution
Run automated persona batches (B01–B20, 10 personas per batch) using `persona-tester` to simulate real-world mobile study sessions:
- Emulate screen viewports (320px–430px mobile, 768px tablet).
- Apply network throttling (WiFi, Fast 3G, Slow 3G, Offline).
- Record verbatim sentiment quotes in natural Indonesian.

### 5. Layer 4: Distilling the Almighty Judge Docket
The judge compiles all findings and generates three core deliverables:
1. `templates/FINDINGS_LEDGER_TEMPLATE.csv`: Structured defect log with regression tests.
2. `COUNCIL_URGENT_BRIEF.md`: High-level summary of open issues for stakeholder review.
3. `LATEST_MAIN_PROJECT_FIX_PROMPT.md`: Precision prompt ready for execution on the main repo.

## Zero-Clash Safety Checklist
- [x] Main app code (`nugget-nihongo/src`) remains 100% untouched during audits.
- [x] Concurrent sessions or chats working on `public/data/diagnostic/` are never overwritten.
- [x] Audit results use isolated state in `nugget-nihongo-persona-lab/sandbox_runs/`.
- [x] Findings require empirical evidence before being logged to prevent false alarms.
