# Autonomous Skill Selection & Proactive Orchestration Rule

When executing complex, multi-pass audits, refactoring, or feature implementations across Nugget Nihongo:

1. **Zero Cherry-Picking Burden on User**:
   - The user must NEVER be required to manually tag or invoke skills via slash commands (e.g. `/pitch-accent-visualizer`, `/japanese-deinflector-yomitan`).
   - The agent MUST proactively evaluate all installed workspace skills against the task requirements and autonomously activate the optimal skill toolchain.

2. **Domain Skill Mapping Invariants**:
   - **Persona & Content Audits**: Proactively deploy `nugget-persona-qa-engine` and `playwright-cli`.
   - **Linguistic Deconjugation & Grammar**: Proactively deploy `japanese-deinflector-yomitan` and `japanese-morphology-parser`.
   - **Japanese Typography & Mobile Wrapping**: Proactively deploy `japanese-line-breaker-budoux`.
   - **Pitch Accent & Pronunciation**: Proactively deploy `pitch-accent-visualizer` and Wadoku/OJAD datasets.
   - **Kanji Strokes & Canvas Kinematics**: Proactively deploy `kanji-stroke-animator` and KanjiVG datasets.
   - **Choukai Audio & Listening Drills**: Proactively deploy `choukai-audio-drill-asbplayer` and `speech-recognition-whisper`.
   - **Spaced Repetition & Retention**: Proactively deploy `fsrs-retention-optimizer`.
   - **Security & RLS Policies**: Proactively deploy `strix-security-audit`.
   - **Deep Brainstorming & Architecture**: Proactively deploy `deep-first-principles-brainstorming` with appropriate tier (Quick/Standard/Deep).

3. **Autonomous Toolchain Execution**:
   - Inspect skill reference files and scripts in `.agents/skills/<skill-name>/` to execute relevant verification scripts or parsers seamlessly during audit passes.

4. **Dynamic Capability Gap Discovery & Web Research**:
   - If a problem domain or architectural requirement is NOT covered by existing workspace skills, the agent must NOT guess or hack together fragile custom scripts.
   - The agent must autonomously initiate targeted web research (via `search_web` and browser tools) to benchmark battle-tested open-source libraries and official patterns.

5. **Self-Evolving Skill Creation via `/learn`**:
   - Upon identifying an established solution from web research, the agent must synthesize a complete skill specification (`.agents/skills/<new-skill-name>/SKILL.md`).
   - The agent must submit this specification via a formal `learning_proposal.md` artifact with `RequestFeedback: true` for user review and approval before persisting.

6. **Pain-Point Self-Diagnosis & Severity-Graduated Adaptation**:
   - The agent must actively detect its own operational friction (context truncation, tool failures, repetitive loops, or user corrections).
   - **SEVERE friction** (data destruction risk, security exposure, breaking builds): Immediately halt, adapt, and issue a `/learn` proposal on the 1st occurrence.
   - **MODERATE friction** (context amnesia, state desync, user factual correction): Adapt strategy immediately. If the same friction recurs a 2nd time, issue a `/learn` proposal.
   - **MINOR friction** (formatting drift, verbosity mismatch, naming conventions): Note internally. If pattern repeats a 2nd time, issue a `/learn` proposal.
