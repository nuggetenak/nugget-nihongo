# AI Nuance Generation Pipeline

This pipeline allows you to systematically generate deep grammatical and pedagogical nuances for thousands of vocabulary items using your AI agent overnight.

## How It Works
1. **Extraction:** The `scripts/extract_missing_nuances.js` script reads a vocabulary file and extracts all words missing nuances into a JSON file in the `scratch/` folder.
2. **AI Generation:** The AI subagent reads the JSON file, generates high-quality nuances, and writes them to a new JSON file.
3. **Injection:** The `scripts/inject_nuances.js` script safely merges the AI-generated JSON back into the main JS data files without breaking the formatting.

## Usage Guide (Overnight Goal)

Whenever you are ready to process a file (or all files), simply give the Antigravity AI this prompt (you can use `/goal` to let it run autonomously):

> "Please run the nuance pipeline for `n5-nouns.js`. 
> 1. Run `node scripts/extract_missing_nuances.js public/data/vocab/n5/n5-nouns.js`.
> 2. Spawn a Pedagogical AI subagent to process `scratch/missing_n5-nouns.json` and generate `scratch/generated_n5-nouns.json`. 
> 3. Once it finishes, run `node scripts/inject_nuances.js scratch/generated_n5-nouns.json public/data/vocab/n5/n5-nouns.js`.
> 4. Do this recursively for all other files."

This chunked JSON approach ensures that the LLM doesn't hallucinate or break your source JavaScript code, and successfully saves you money by isolating API generation strictly to the `nuance` field.
