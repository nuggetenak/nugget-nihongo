# Active UI Target Lock Rule (Gemini Design Studio)

When the user mentions "target studio", "target ui", or `.agents/active-ui-target.md`:

1. **Strict Surgical Scope (Zero Blind Scanning)**:
   - Read ONLY `.agents/active-ui-target.md` to obtain the target file path, line range, current Tailwind classes, and the exact JSX snippet locked by the user.
   - Strictly do NOT scan, search, grep, or read any other files across `src/` or the wider repository.

2. **Targeted Line Range Mutation**:
   - Apply the requested UI/UX redesign, micro-interaction, or Tailwind styling changes exclusively to the target file and line range specified in `.agents/active-ui-target.md`.
   - Never perform full-file rewrites.

3. **Behavioral Contract & Logic Preservation**:
   - Preserve all existing state hooks, props, event handlers (`onClick`, `onChange`, `onSubmit`), FSRS algorithms, TinyBase stores, and Supabase queries outside or inside the target element.

4. **Instant HMR Reflection**:
   - Once edited, Vite Hot Module Replacement automatically updates the live browser canvas at `http://localhost:5173/` in $<50$ms without a page reload.
