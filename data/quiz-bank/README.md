# Quiz Bank

AI-generated quiz questions that have been promoted to the permanent database.
Each file (`n5.js`, `n4.js`, etc.) follows the same format as `public/data/grammar/grammar-n*.js`.

## Provenance

Every entry has `provenance: 'ai-gen-promoted-v1'` and a `lineage` object:
```js
{
  id: 'qb-n4-00001',
  promoted_from: 'aig-1760123456-3',       // original AI-generated ID
  original_provider: 'groq:llama-3.3-70b',
  critic_provider: 'gemini:2.0-flash',
  serves_before_promotion: 47,
  thumbs_up: 43,
  thumbs_down: 0,
  edits_submitted: 0,
  promoted_at: '2026-05-18T09:12:00Z',
  promoted_by: 'nugget',
  provenance: 'ai-gen-promoted-v1',
  // ... plus original quiz fields (prompt, choices, answer, etc.)
}
```

## Append-only

Never delete entries. If an entry is found to be wrong, add a `deprecated: true` field
and a `deprecated_reason` string. Tests enforce this.
