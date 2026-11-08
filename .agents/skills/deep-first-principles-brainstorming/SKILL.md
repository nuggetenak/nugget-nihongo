---
name: deep-first-principles-brainstorming
description: >
  Domain-agnostic deep brainstorming, technical debt forensics, autonomous
  skill orchestration, dynamic web capability discovery, pain-point
  self-adaptation, and anti-fragile decision engine. Uses tiered invocation
  (Quick/Standard/Deep) to balance token efficiency with analytical rigor.
---

# Deep First-Principles Brainstorming Skill

## Overview
A high-rigor reasoning protocol for dissecting architectural dilemmas,
unearthing hidden technical debt, countering over-engineering bias,
autonomously orchestrating domain skills, pinpointing self-operational
friction, and grounding every decision in empirical code reality and
finite human delivery capacity.

Uses a **3-tier invocation architecture** to prevent token bloat:
lightweight tasks get a focused 5-pillar scan; complex initiatives
get the full 13-pillar engine with 9 meta-cognitive edge case protocols.

---

## Tiered Invocation Architecture

Before loading the full protocol, the agent MUST triage the task:

### Tier Selection Heuristic

| Signal | Tier |
|---|---|
| Single tactical question ("should I use X?", "how to name this?") | **Quick** |
| Sprint planning, feature design, single-subsystem remediation | **Standard** |
| Multi-month roadmap, framework migration, architectural overhaul | **Deep** |
| User explicitly requests `/brainstorm deeply` or `/boost` | **Deep** |
| Agent detects active pain-point friction from prior turns | Auto-escalate by 1 tier |

### Tier Composition & Auto-Modes

| Tier | Pillars Loaded | Meta-Cognitive Protocols | Auto-Grill-Me Behavior | Auto-Compact Behavior | Estimated Token Footprint |
|---|---|---|---|---|---|
| **Quick Scan** | 2, 5, 6, 10, 13 | None (inline self-test only) | **Strictly Suppressed** (Zero interruption; default to Boring Technology) | **Disabled** (Turn remains concise; no compaction needed) | ~200 lines |
| **Standard** | 1, 2, 4, 5, 6, 8, 9, 10, 13 | Partial (confidence + contradictions) | **Targeted / Irreducible Forks** (Only via `ask_question` when 2 valid solutions have trade-offs) | **Milestone-Based** (Triggered after completing a cohesive cluster or 3 units) | ~400 lines |
| **Deep Dive** | All 13 + Full Meta-Cognitive Suite | All 9 protocols active | **Pre-Flight Mandatory** (Align on irreversible schema, API breaks, or data migrations) | **Proactive Lifecycle Advisory** (Triggered before massive generation or at 10+ turns) | ~600+ lines |

**Escalation Rule**: If a Quick-tier analysis reveals unresolved
dependency cycles, >20 open defects in the target subsystem, or
conflicting architectural constraints, the agent MUST auto-escalate
to Standard or Deep before delivering a recommendation.

### Auto-Grill-Me & Auto-Compact Decision Matrix (Per Brainstorming Level)

1. **Auto-`/grill-me` Behavior Between Levels**:
   - **Level 1 (Quick)**: Never interrupt the user. Auto-resolve ambiguous minor naming or styling choices using established repository conventions and Boring Technology heuristics.
   - **Level 2 (Standard)**: Trigger `/grill-me` (via interactive `ask_question` modal) ONLY when facing an irreducible architectural fork where neither option is strictly superior and user intent determines product direction (e.g. client-side slicing vs pre-rendered audio).
   - **Level 3 (Deep Dive)**: Run pre-flight alignment via `/grill-me` before executing any irreversible action (such as wiping a database table, migrating schema contracts, or re-ordering multi-sprint milestones).

2. **Auto-`/compact` Lifecycle Checkpoints (Per Brainstorming Level)**:
   - **Level 1 (Quick)**: Compact is neither suggested nor triggered. Fast, single-turn execution preserves momentum.
   - **Level 2 (Standard)**: Suggest `/compact` to the user upon completing a major cohesive milestone (e.g., every 3-4 curated units or after fixing a major cross-cutting bug category) to maintain high context precision.
   - **Level 3 (Deep Dive)**: Proactively advise the user to run `/compact` whenever conversation turn depth exceeds 10 turns of intensive forensic investigation or immediately prior to launching an extensive multi-file code generation run (e.g., authoring 10+ complete lessons), ensuring hallucination-free generation.

---

## The 13 Pillars

### Pillar 1: Pre-Mortem Analysis (Failure Inversion)
*Tiers: Standard, Deep*

Assume catastrophic failure at the next major milestone.
1. Isolate the **3 most fatal failure modes**.
2. **Invert** each into a non-negotiable prevention contract.
3. Those contracts become **Step 1 and Step 2** of any plan.

### Pillar 2: Build Pipeline & Source-of-Truth Audit
*Tiers: Quick, Standard, Deep*

Before touching any data or schema:
1. Audit `scripts/` for compilation pipelines and `AUTO-GENERATED` headers.
2. Trace lineage: *Category Sources → Build Compiler → Monolithic Artifacts*.
3. **Never edit compiled targets directly.** Patch source files, then rebuild.
4. Verify schema backward compatibility with IndexedDB/TinyBase client stores.

### Pillar 3: Historical Fracture Audit
*Tiers: Deep only*

Before proposing new frameworks or major rewrites:
1. Scan workspace for abandoned experiments (sister repos, dead branches).
2. Investigate WHY each was abandoned.
3. If a proposal rhymes with past failure, flag it and demand empirical
   proof of structural difference.

### Pillar 4: Product Identity Invariant Verification
*Tiers: Standard, Deep*

1. Extract the project's co-equal identity pillars from documentation.
2. Verify proposed work preserves all pillars in balance.
3. If focusing on one pillar, explicitly schedule remaining pillars.

### Pillar 5: 3-Order Consequence Matrix & Dependency Graph
*Tiers: Quick, Standard, Deep*

| Order | Question |
|---|---|
| 1st | What does this change directly accomplish? |
| 2nd | What existing systems must be refactored to accommodate it? |
| 3rd | What strategic opportunity cost does the refactoring impose? |

**Dependency Graph**: Sequence tasks by dependency hierarchy.
Never polish UI on top of unstable data schemas.

### Pillar 6: Technical Debt Ceiling & Mandatory Freeze
*Tiers: Quick, Standard, Deep*

1. If CRITICAL + HIGH open defects > 20 in the active subsystem:
   **Reject** new feature requests for that subsystem.
2. *Forbidden*: New unvetted features, packages, or frameworks.
3. *Required*: Focused refactoring specifically to fix critical bugs.
4. **Pay old debt before borrowing new debt.**

### Pillar 7: Empirical Human Dogfooding Gate
*Tiers: Deep only (referenced in Standard as a checkpoint)*

1. No feature is "Done" until tested on a physical device at target viewport.
2. Publish a concrete N-point dogfooding checklist per milestone:
   touch accuracy, audio clarity, translation naturalness, offline
   resilience, typography integrity.

### Pillar 8: Convergence Gate & Finite Capacity Arithmetic
*Tiers: Standard, Deep*

**Capacity Formula**:
```
Effective Hours = (Weeks Left) × (Days/Wk) × (Focus Hrs/Day) × 0.70
```
- If `Σ estimated task hours > Effective Hours`: **Cut scope ruthlessly.**
- Convergence = Pre-Mortem neutralized + dependencies linear + hours within budget.
- **Anti-Pattern**: 3+ plan revisions without convergence = scope ambiguity.
  Narrow scope, don't iterate further.

### Pillar 9: Human Cognitive Load Budget
*Tiers: Standard, Deep*

1. **Rule of 3**: Max 3 concurrent subsystems per sprint.
2. **Sequential Completion**: Finish, verify, dogfood one subsystem before
   moving to the next.
3. **Directory Locality**: A single task should touch ≤ 2 directories.
   If 5+, decompose into sub-tasks with git checkpoints.

### Pillar 10: AI Cognitive Failure Mode Self-Diagnostic
*Tiers: Quick, Standard, Deep*

| Failure Mode | Self-Test |
|---|---|
| **Resume-Driven Dev** | "Would a junior dev with no framework bias choose this?" |
| **Toxic Sycophancy** | "Am I agreeing because it's correct, or because disagreeing is uncomfortable?" |
| **Green Test Mirage** | "Have I verified this on a physical 360px viewport?" |
| **Audit-Fix Amnesia** | "How many CRITICAL defects remain open right now?" |
| **Scope Hallucination** | "Does every file/API I reference actually exist on disk?" |
| **Analysis Paralysis** | "Have I exceeded 3 planning iterations? Force Step 0 now." |

### Pillar 11: Autonomous Skill Orchestration (Zero-Tag)
*Tiers: Deep (implicit in all tiers via rule)*

1. Inspect `.agents/skills/` to catalog all installed capabilities.
2. Match task domains to specialized skills automatically.
3. Cite deployed skills explicitly in the plan rationale.

### Pillar 12: Dynamic Web Research & Skill Synthesis Loop
*Tiers: Deep only*

When a capability gap is detected:
1. **Declare** the missing capability explicitly.
2. **Research** via `search_web` and browser tools.
3. **Draft** a formal `.agents/skills/<name>/SKILL.md`.
4. **Propose** via `/learn` with `RequestFeedback: true`.

### Pillar 13: Pain-Point Telemetry & Autonomous Self-Adaptation
*Tiers: Quick, Standard, Deep*

#### Friction Vectors

| Vector | Signal | Immediate Tactical Response |
|---|---|---|
| **A: Context Amnesia** | Repeating discarded ideas; forgetting constraints | Stop. Re-read `transcript.jsonl`, artifacts, and settled decisions before responding. |
| **B: Environment Friction** | Shell syntax errors (`&&` in PS), timeouts, parse failures | Auto-wrap in PowerShell-compliant syntax; check exit codes. |
| **C: User Correction** | User says "stop", "you missed X", "criticize again" | Pause. No defense. Root-cause trace. Acknowledge the exact blind spot. |
| **D: State Desync** | Assuming file state X when disk shows Y | Run live `git status` / filesystem check before any write. |

#### Severity-Graduated `/learn` Adaptation

| Severity | Examples | Adaptation Protocol |
|---|---|---|
| **SEVERE** | Editing compiled artifacts, exposed API keys, breaking production builds, data destruction risk | **Immediate** `/learn` proposal on 1st occurrence. Halt work until rule is persisted. |
| **MODERATE** | Context amnesia, state desync, tool command failures, user correction on factual error | Adapt strategy immediately. If same friction recurs a 2nd time → `/learn` proposal. |
| **MINOR** | Verbosity mismatch, formatting preferences, naming convention drift | Note internally. If pattern repeats 2nd time → `/learn` proposal. |

---

## 9 Meta-Cognitive Edge Case Protocols
*Active in Deep Tier. Protocols 2 and 8 also active in Standard Tier.*

### Protocol 1: Cross-Session Memory Decay Recovery
**Problem**: After context compaction (`/compact`) or a new conversation
session, the agent loses nuanced decisions, settled architectural choices,
and previously rejected ideas.

**Response Protocol**:
1. Before making any recommendation that touches prior decisions, read
   `transcript.jsonl` (compact first, full if truncated) and all active
   artifacts in the brain directory.
2. Maintain a mental checklist of **settled decisions** (decisions the user
   explicitly approved in prior sessions). Never re-litigate them unless
   the user explicitly reopens them.
3. When uncertain whether a decision was settled: **ask**, don't guess.

### Protocol 2: Contradictory User Instruction Handling
**Problem**: The user provides directives that create tension (e.g.,
"don't rush" + "finish by end of November", or "be exhaustive" + "reduce
token cost").

**Response Protocol**:
1. **Surface the tension explicitly**. Do not silently choose one side.
2. Present the trade-off as a concrete either/or:
   "If we prioritize X, we sacrifice Y. If we prioritize Y, we sacrifice X."
3. Use `ask_question` to let the user resolve the tension.
4. Never manufacture a false synthesis that pretends both constraints
   can be fully satisfied when they mathematically cannot.

### Protocol 3: Subagent Coordination & Conflict Reconciliation
**Problem**: Parallel subagents (Educational Council, SSW Council,
Technical Council, Persona Swarm) may return contradictory findings
about the same component.

**Response Protocol**:
1. When findings conflict, do NOT average or cherry-pick the friendlier result.
2. Trace which subagent had deeper file access or more empirical evidence.
3. Present the conflict explicitly to the user with file-path citations
   from both sides.
4. If one subagent's finding is grounded in `read_file` of actual source
   code and the other is inference, the grounded finding wins.

### Protocol 4: Diminishing Returns Detection
**Problem**: The agent keeps analyzing the same subsystem with diminishing
new discoveries, consuming tokens without progress.

**Response Protocol**:
1. After each analysis pass, count **net new actionable findings**.
2. If 3 consecutive passes produce < 10% new findings relative to the
   total ledger, declare **analytical convergence** for that subsystem.
3. Transition to execution. Do not open a 4th analytical pass unless the
   user explicitly requests it with new investigation vectors.

### Protocol 5: User Emotional State Calibration
**Problem**: The user's communication signals frustration ("njir",
"look...", "stop"), engagement, fatigue, or urgency. Response density
and formality should adapt.

**Response Protocol**:
1. **Frustration markers** ("njir", "udah", "look...", repeated corrections):
   Reduce verbosity by 50%. Front-load the single most actionable item.
   Eliminate preambles and theoretical context.
2. **Engagement markers** (asking follow-up questions, requesting expansion):
   Match their depth. Provide comprehensive analysis with examples.
3. **Urgency markers** ("sekarang", "immediately", "before tomorrow"):
   Skip theoretical justification. Deliver executable steps only.
4. Never explicitly say "I detect you are frustrated." Just adapt silently.

### Protocol 6: Cascading Rule Conflict Resolution
**Problem**: With 12+ persisted rules, two rules may issue contradictory
directives (e.g., `forensic-audit-pace-and-rigor.md` demands single-pass
execution, but `objective-flagship-benchmarking.md` demands convergence
in max 3 iterations — what if one pass reveals the need for 5?).

**Response Protocol**:
1. **Safety-Critical Rules Win**: Any rule preventing data destruction,
   security exposure, or production breakage takes absolute precedence.
2. **Specificity Wins**: A domain-specific rule (e.g., `build-pipeline-
   source-of-truth.md` for data files) overrides a general rule
   (e.g., `objective-flagship-benchmarking.md`) when they conflict on
   that specific domain.
3. **User-Explicit Overrides All**: If the user gives a direct instruction
   that contradicts a rule, follow the user's instruction for that turn,
   but flag the rule conflict and ask whether to update the rule via `/learn`.
4. When no priority is clear, **surface the conflict** to the user via
   `ask_question` rather than silently choosing.

### Protocol 7: Token Budget Self-Awareness
**Problem**: The agent's own responses consume context window space. In
long conversations, verbose explanations crowd out working memory for
code analysis.

**Response Protocol**:
1. **Prefer artifact references** over inline repetition. Instead of
   re-explaining the 4-Pillar Invariant, link to the rule file.
2. **Compress repeated context**: After the first mention, use shorthand
   (e.g., "per our settled P2 decision" instead of re-explaining Pillar 2).
3. **Self-monitor response length**: If a single response exceeds ~800
   lines, split into focused sub-tasks or delegate to subagents.
4. **Recommend `/compact`** to the user when the conversation has
   exceeded 15+ substantive turns without compaction.

### Protocol 8: False Confidence Calibration
**Problem**: The agent presents uncertain inferences with the same
linguistic confidence as verified facts, misleading the user.

**Response Protocol**:
1. **Verified facts** (read from file, executed in terminal): Use
   definitive language — "File X at line Y contains Z."
2. **High-confidence inference** (consistent with multiple file reads but
   not directly verified at exact location): Use qualified language —
   "Based on [evidence], this is very likely the case."
3. **Uncertain inference** (no direct file read, extrapolated from
   patterns): Use explicit uncertainty markers — "I have NOT verified
   this directly. This is my inference based on [reasoning]. Recommend
   confirming at [file path]."
4. **Never bluff.** If unsure, say "I don't know — let me check" and
   then actually check.

### Protocol 9: Partial Codebase Blind Spot Detection
**Problem**: The agent has read 80% of the codebase but the critical
bug or design flaw is in the 20% it hasn't inspected. The agent then
asserts "there are no issues with subsystem X" when it hasn't actually
read subsystem X.

**Response Protocol**:
1. Before asserting "X doesn't exist" or "there are no problems with Y",
   verify that Y's source files have actually been read in this session.
2. Maintain an implicit **coverage map**: Which directories and key files
   have been inspected vs. which have not?
3. When delivering an audit verdict, explicitly declare coverage:
   "I have inspected [list]. I have NOT inspected [list]. The following
   areas remain unverified."
4. When in doubt, **read the file** rather than inferring from memory
   or pattern matching.

---

## Standard Invocation Flow

```
1. TRIAGE         → Classify task complexity → select Quick / Standard / Deep tier.
2. SCAN           → Inspect debt ledger, build pipeline, installed skills.
3. PAIN-POINT     → Check for active friction from prior turns or context decay.
4. GAP DETECT     → (Deep only) If capability missing, research web & /learn.
5. PRE-MORTEM     → (Standard+) Invert top 3 failure modes into Step 1 & 2.
6. CONSEQUENCE    → Map 3-order ripple effects & dependency graph.
7. CAPACITY       → (Standard+) Apply 70% buffered capacity math.
8. SELF-DIAGNOSE  → Run AI failure mode table. Kill sycophancy, hallucination.
9. META-COGNITIVE → (Deep) Run applicable edge case protocols.
10. DELIVER       → Linear, dependency-ordered plan. Step 0 + Step 1. Not 50 steps.
```
