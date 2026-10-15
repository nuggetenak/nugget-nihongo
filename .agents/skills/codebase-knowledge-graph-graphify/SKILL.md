---
name: codebase-knowledge-graph-graphify
description: "Turn codebases, documentation, SQL schemas, and datasets into interactive knowledge graphs and architectural maps using Graphify (Graphify-Labs/graphify)."
---

# Codebase Knowledge Graph Skill (Graphify)

This skill provides guides and workflows for mapping codebases, database schemas, and documentation into queryable knowledge graphs and visual architecture maps using **Graphify** (`Graphify-Labs/graphify`).

## 1. What Graphify Does
Instead of blind keyword grepping or vector embeddings alone, Graphify uses deterministic AST parsing (via local `tree-sitter` grammars for JavaScript, TypeScript, Python, SQL, etc.) to construct an explicit graph:
- **Nodes:** Functions, classes, modules, database tables, and key documentation concepts.
- **Edges:** Calls, imports, inherits, foreign keys, and semantic relationships.
- **Artifacts Generated:**
  - `graphify-out/graph.html`: Interactive in-browser visualization of the project's dependency graph.
  - `graphify-out/GRAPH_REPORT.md`: Architectural summary highlighting "god nodes" (critical structural hubs) and functional communities.
  - `graphify-out/graph.json`: GraphRAG-ready structured relationship dataset.

---

## 2. Why It Empowers Nugget Nihongo
1. **Frontend Architecture Mapping:** Visualizes how the 9/13 quiz modes, FSRS review calculations, textbook lenses (Minna, Irodori, Soumatome), and Supabase sync connect across files.
2. **Migration Roadmap:** Identifies high-coupling dependencies before refactoring legacy vanilla JS modules into Next.js components.
3. **Curriculum Topology:** Maps grammar prerequisites (e.g., て-form $\to$ ている $\to$ てはいけない) into a visual progression tree.

---

## 3. Running Graphify via `uv`

The package is installed in `scratch/tooling-lab/.venv`:

### Fast AST Code Scan (Local & Offline, No API Key Required)
```bash
# Scan codebase AST locally without calling external LLM APIs
uv run --directory scratch/tooling-lab graphify extract "nugget-nihongo" --code-only --out "scratch/graphify-out"
```

### Full Semantic & Deep Relationship Extraction
```bash
# Extract full code + documentation relationships
uv run --directory scratch/tooling-lab graphify extract . --out "scratch/graphify-out"
```

### Export Interactive Visualization
```bash
# Generate visual D3 collapsible tree HTML
uv run --directory scratch/tooling-lab graphify tree --graph scratch/graphify-out/graph.json --output scratch/graphify-out/GRAPH_TREE.html

# Generate interactive graph HTML
uv run --directory scratch/tooling-lab graphify export html --graph scratch/graphify-out/graph.json
```

---

## 4. Antigravity Native Integration
Graphify comes pre-configured with native support for Google Antigravity:
```bash
uv run --directory scratch/tooling-lab graphify antigravity install
```
This registers graph querying capabilities directly with Antigravity agent workflows.
