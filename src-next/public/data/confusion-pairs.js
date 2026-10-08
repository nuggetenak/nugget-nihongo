// ── confusion-pairs.js (Phase 5.5c §15.9) ────────────────────────
// Promoted confusion pair metadata. Feeds Sensei's
// "mau liat pasangan-mirip?" suggestions.
// Append-only. provenance: 'ai-gen-promoted-v1'
// Format: { id, patterns: [a, b], note_id, level, provenance }
var confusionPairs = [];
// (empty until first promotion)
