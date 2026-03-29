# PK ARCHITECTURE REFACTOR — NUGGET NIHONGO
> Target: 70–90% reduction in default context load
> Scope: All 6 PK documents (Agent 6 / Crunchy as reference implementation)

---

## 1. SYSTEM DIAGNOSIS

### Current Footprint
| File | Chars | Est. Tokens | Loaded |
|------|-------|-------------|--------|
| AGENT-COMMON-v14.md | 40K | ~10,000 | Every session |
| AGENT-6-QA-v13.txt | 21K | ~5,250 | Every session |
| MASTER-FLOW-v5.md | 22K | ~5,500 | Every session |
| CRUNCHY-ADDENDUM-v5.md | 13K | ~3,250 | Every session |
| SESSION-RECAP files | 9.5K | ~2,375 | Every session |
| **TOTAL** | **105.5K** | **~26,375** | **Always** |

### Top 3 Bloat Sources

**BLOAT-1: AGENT-COMMON is monolithic and agent-agnostic (10K tokens)**
Contains rules for ALL 9 agents — worker agent ZIP intake protocol, Crispy-specific
versioning criteria, Milestone Audit System — none of which Crunchy needs in
session. Crunchy is a senior agent; Worker Agent mode logic (3 modes) is irrelevant.
Estimated irrelevant load for Crunchy: ~4,000 tokens.

**BLOAT-2: MASTER-FLOW is a narrative reference document (5.5K tokens)**
Every exception path (2a, 2b, 2c, 2d, 2e), format specs for ALL agent ZIP types,
DISPATCH-MANIFEST format, Crispy-specific Barrier 1 Check — none of this is
operationally needed by Crunchy mid-session. It's a reference, not a runtime rule.
This entire file should be Layer 3 (load only when explicitly needed).

**BLOAT-3: Duplicated rules across 3 files**
Permission Gates [4] and [8] appear in AGENT-COMMON, AGENT-6-QA, and are implied
in MASTER-FLOW. The checkpoint widget (GAP-E) appears in AGENT-COMMON and
CRUNCHY-ADDENDUM. VERIFY-BEFORE-CLAIM appears in AGENT-6-QA and is restated in
MASTER-FLOW section 4. Conservative estimate: 2,000–3,000 tokens of pure duplication.

### Always-Loaded vs Rarely-Used

| Category | Current | Should Be |
|----------|---------|-----------|
| Agent identity + scope | AGENT-6-QA | CORE |
| Permission gates [4][8] | AGENT-COMMON | CORE |
| Session start scripts | ADDENDUM | CORE |
| Session menu format | ADDENDUM | CORE |
| Anti-bypass rules | AGENT-6-QA + COMMON | CORE |
| ZIP intake check | AGENT-COMMON | MODULE (A2-A9 only) |
| Checkpoint protocol | AGENT-COMMON | MODULE |
| WARMSTART format | AGENT-COMMON | MODULE |
| Multi-session handling | AGENT-COMMON | MODULE |
| PATCH-NOTES format | AGENT-COMMON | MODULE |
| SESSION-PROOF format | AGENT-COMMON | MODULE |
| Audit tier system | AGENT-6-QA | MODULE |
| Verdict format | AGENT-6-QA | MODULE |
| QA checklist | AGENT-6-QA | MODULE |
| GAP-1 to GAP-F | ADDENDUM | MODULE |
| Master flow narrative | MASTER-FLOW | LAYER 3 |
| Exception paths 2a-2e | MASTER-FLOW | LAYER 3 |
| Milestone audit system | AGENT-COMMON | LAYER 3 |
| Research DB rules | AGENT-COMMON | LAYER 3 |
| All ZIP format specs | MASTER-FLOW | LAYER 3 |
| Worker agent mode logic | AGENT-COMMON | LAYER 3 |
| Naming convention | AGENT-COMMON | LAYER 3 |
| Versioning criteria | ADDENDUM | LAYER 3 |
| SESSION-RECAP | SESSION-RECAP | LAYER 3 |

---

## 2. NEW ARCHITECTURE DESIGN

### 3-Layer System

```
/pk-nugget-nihongo/
├── AGENT-CORE.md               ← Layer 1: Always loaded (~1,800 tokens)
│
├── modules/
│   ├── checkpoint.md           ← Load when: checkpoint trigger fires
│   ├── multi-session.md        ← Load when: WARMSTART ZIP detected
│   ├── zip-intake.md           ← Load when: A2-A9 receive Task Brief ZIP
│   ├── patch-notes.md          ← Load when: packaging output
│   ├── session-proof.md        ← Load when: Tier M+ audit
│   ├── audit-system.md         ← Load when: CP(2) audit starts
│   └── gap-governance.md       ← Load when: governance dispute or GAP rule needed
│
└── reference/
    ├── master-flow.md           ← Load when: Nugget-san asks about flow
    ├── zip-formats.md           ← Load when: building/verifying ZIP structures
    ├── research-db-rules.md     ← Load when: Tier 1/2/DRILL audit completes
    ├── naming-convention.md     ← Load when: creating new files
    ├── milestone-audit.md       ← Load when: milestone version reached
    └── session-recap.md         ← Load when: orientation fallback
```

### Layer 1 — CORE: ~1,800 tokens
Contains only: identity, scope, anti-bypass hard rules, session start sequence,
permission gates, module load triggers. No narrative, no format specs.

### Layer 2 — Modules: ~500–700 tokens each
Self-contained. Each file has: trigger condition, rules, minimal format.
Total if all loaded: ~4,200 tokens. In practice 2–3 load per session: ~1,500 tokens.

### Layer 3 — Reference: ~800–2,000 tokens each
Never loaded by default. Agent loads only on explicit need.

### Per-Session Load Comparison

| Scenario | Old | New | Reduction |
|----------|-----|-----|-----------|
| Simple CP(2) audit | 26,375 | ~3,300 | **87%** |
| Full CP(2) + packaging | 26,375 | ~4,800 | **82%** |
| Governance session | 26,375 | ~5,200 | **80%** |
| Fallback + full reference | 26,375 | ~9,000 | **66%** |

---

## 3. FILE RESTRUCTURE PLAN

```
/pk-nugget-nihongo/

AGENT-CORE.md
  Purpose : Identity, scope, session start, gates, module triggers
  Load    : Always (injected by Claude PK system)
  ~tokens : 1,800

modules/checkpoint.md
  Purpose : Checkpoint triggers, protocol, WARMSTART creation
  Load    : When T1–T6 triggers fire, or Nugget-san says CHECKPOINT SEKARANG
  ~tokens : 650

modules/multi-session.md
  Purpose : WARMSTART ZIP handling, RATE-LIMIT-PARTIAL, T9 trigger
  Load    : When WARMSTART-*.zip detected in uploads
  ~tokens : 550

modules/zip-intake.md
  Purpose : ZIP INTAKE CHECK rules for A2–A9
  Load    : Worker agents only, when Task Brief ZIP received
  ~tokens : 400

modules/patch-notes.md
  Purpose : PATCH-NOTES.md format, Rate Limit Report rules
  Load    : When agent prepares output ZIP
  ~tokens : 400

modules/session-proof.md
  Purpose : SESSION-PROOF format (Tier S and M+)
  Load    : When agent creates session proof document
  ~tokens : 450

modules/audit-system.md
  Purpose : Audit tiers, QA checklist, MANDATORY SKEPTICISM, VERIFY-BEFORE-CLAIM
  Load    : When CP(2) audit begins (Crunchy-specific)
  ~tokens : 700

modules/verdict-format.md
  Purpose : QA VERDICT format, FOR-INTEGRATOR ZIP structure, PRE-ZIP checklist
  Load    : When Crunchy prepares verdict and output ZIP
  ~tokens : 600

modules/gap-governance.md
  Purpose : GAP-1 through GAP-F rules
  Load    : When governance action needed, keyword "approved" logic active
  ~tokens : 500

reference/master-flow.md
  Purpose : Full end-to-end flow, exception paths 2a–2e
  Load    : When Nugget-san asks about flow, or CP(1) review needed
  ~tokens : 1,800

reference/zip-formats.md
  Purpose : All ZIP format specs (Task Brief, FOR-INTEGRATOR, WARMSTART, etc.)
  Load    : When building or verifying ZIP structures
  ~tokens : 900

reference/research-db-rules.md
  Purpose : DB update triggers, QA-EFFECTIVENESS-DB, VIOLATION-DB maintenance
  Load    : After Tier 1/2/DRILL audit completes
  ~tokens : 600

reference/naming-convention.md
  Purpose : Full naming rules for all file types
  Load    : When creating new files with unfamiliar naming
  ~tokens : 300

reference/milestone-audit.md
  Purpose : Tier 1/2 audit system, counter rules
  Load    : When milestone version reached
  ~tokens : 400

reference/session-recap.md
  Purpose : Current governance state, open INC list
  Load    : Orientation fallback only (if scripts fail)
  ~tokens : 600
```

---

## 4. TOKEN OPTIMIZATION STRATEGY

### What Was Removed from Default Context

| Removed Section | Tokens Saved | Reason |
|-----------------|-------------|--------|
| Worker agent 3-mode logic | ~600 | Irrelevant to senior agents |
| Master flow narrative + exceptions | ~4,500 | Reference, not runtime |
| All ZIP format specs | ~1,200 | Only needed at packaging time |
| SESSION-RECAP content | ~2,375 | Replaced by orientation scripts |
| GAP series (GAP-1 to GAP-F) | ~800 | Only needed during governance |
| Milestone audit system | ~500 | Only triggered at milestones |
| Research DB rules | ~600 | Only triggered post-audit |
| Naming convention full table | ~300 | Only needed at file creation |
| Claude Invisible Walls section | ~600 | Compress to 6-line summary in CORE |
| Narrative explanations ("Kenapa?") | ~1,500 | Convert to command-style rules |
| Duplicate rule appearances | ~2,000 | Single source per module |
| **TOTAL REMOVED FROM DEFAULT** | **~15,075** | |

### What Was Compressed

| Section | Before | After | Method |
|---------|--------|-------|--------|
| Claude Walls | 600 tokens | 80 tokens | 6 bullet commands |
| Permission gates | 200 tokens | 40 tokens | 2 lines |
| Anti-bypass rules | 400 tokens | 100 tokens | Numbered hard rules |
| Session start sequence | 300 tokens | 150 tokens | Code block only |
| Agent identity | 500 tokens | 80 tokens | Role definition only |

### Why New Structure Is More Efficient

**Specificity over generality.** AGENT-COMMON tries to serve all 9 agents.
For any single agent, 40-60% of AGENT-COMMON is irrelevant. AGENT-CORE.md
is written per-agent — only what that agent actually needs.

**Scripts over text for state.** SESSION-RECAP (2,375 tokens) is replaced by
orientation scripts that produce output in ~200 tokens. The scripts are the
single source of truth; the recap doc becomes a fallback only.

**Event-driven loading.** Modules load only when their trigger condition fires.
Checkpoint module doesn't need to be in context during a peaceful audit session.
Multi-session module doesn't need to load unless WARMSTART is detected.

**Commands over explanations.** The original files explain *why* rules exist
(valuable for humans authoring them, wasteful for LLMs reading them 1000x).
Modules use command syntax: DO, DON'T, WHEN, → result.

---

## 5. USAGE PATTERN

### Scenario A: Standard CP(2) Audit Session

```
Session opens. Crunchy's PK = AGENT-CORE.md only.

1. Nugget-san drops: nugget-nihongo_v14_27_0.zip + PATCH_A4-TASK-GRM-9-v1.zip

2. CORE triggers: ZIP detected → run orientation sequence (bash_tool)
   → SESSION MENU displayed

3. Crunchy asks: "Patch mana yang diverifikasi?"
   Nugget-san: "TASK-GRM-9"

4. CORE triggers: "CP(2) audit requested"
   → LOAD: modules/audit-system.md
   → LOAD: modules/verdict-format.md

5. Crunchy declares AUDIT BRIEF (from audit-system.md rules)
   Permission Gate [4] → STOP

6. Nugget-san: "Lanjut"
   → Audit executes using audit-system.md checklist

7. Audit complete → Permission Gate [8] → STOP

8. Nugget-san: "Kirim"
   → LOAD: modules/patch-notes.md (to verify Rate Limit Report)
   → Build FOR-INTEGRATOR ZIP using verdict-format.md rules
   → present_files

Total modules loaded: 2–3 (audit-system + verdict-format + patch-notes)
Token load: ~1,800 (CORE) + ~1,800 (3 modules) = ~3,600 tokens
```

### Scenario B: CP(2) with Checkpoint Mid-Session

```
... (same as A through step 6) ...

During audit, T4 fires (scope larger than expected):
   → LOAD: modules/checkpoint.md
   → Follow checkpoint protocol

Nugget-san: "WARMSTART"
   → LOAD: modules/multi-session.md (for RATE-LIMIT-PARTIAL format)
   → Build WARMSTART ZIP, present_files, session ends

Token load: ~1,800 (CORE) + ~2,600 (5 modules) = ~4,400 tokens
```

### Scenario C: Governance Session (No ZIP)

```
Session opens. No ZIP dropped.
CORE: No ZIP → no script sequence → wait for Nugget-san.

Nugget-san: "Mau discuss GAP-4 update"
   → LOAD: modules/gap-governance.md

Discussion + draft new rule → Nugget-san: "approved"
   → gap-governance.md already loaded, execute per GAP-1 rules

Token load: ~1,800 (CORE) + ~500 (gap-governance) = ~2,300 tokens
```

### Scenario D: Module Loading Trigger Table (CORE-level rules)

| Event | Load Module |
|-------|-------------|
| PATCH ZIP detected at session start | audit-system.md + verdict-format.md |
| WARMSTART ZIP detected | multi-session.md |
| T1–T6 trigger fires mid-session | checkpoint.md |
| Packaging output ZIP | verdict-format.md + patch-notes.md |
| Tier M+ audit | session-proof.md |
| "approved" keyword used | gap-governance.md |
| Nugget-san asks about flow | reference/master-flow.md |
| Audit Tier 1/2 complete | reference/research-db-rules.md |
| Building new ZIP structure | reference/zip-formats.md |
| Orientation script fails | reference/session-recap.md |

---
