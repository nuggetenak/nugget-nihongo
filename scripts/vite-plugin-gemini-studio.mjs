import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import parser from '@babel/parser';
import _traverse from '@babel/traverse';
import _generate from '@babel/generator';
import t from '@babel/types';

const traverse = _traverse.default || _traverse;
const generate = _generate.default || _generate;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const srcDir = path.resolve(rootDir, 'src');
const normRootDir = rootDir.replace(/\\/g, '/');
const normSrcDir = srcDir.replace(/\\/g, '/');

// Fix 2: Strict set of lowercase intrinsic HTML tags
const INTRINSIC_TAGS = new Set([
  'div', 'section', 'button', 'span', 'header', 'nav', 'p',
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li',
  'article', 'aside', 'main', 'footer', 'label', 'input',
  'textarea', 'select', 'option', 'form', 'a', 'img', 'table',
  'thead', 'tbody', 'tr', 'th', 'td', 'dl', 'dt', 'dd',
  'figure', 'figcaption', 'blockquote', 'hr', 'strong', 'em',
  'small', 'code', 'pre', 'ruby', 'rt', 'rp'
]);

// Multi-step undo stack (Engine C)
const undoStack = [];
const MAX_UNDO = 50;

/**
 * Strips any data-ag-loc attributes from JSX text (Fix 3)
 */
function cleanAgLocAttributes(text) {
  if (!text) return text;
  return text.replace(/\s*data-ag-loc=(["']).*?\1/g, '');
}

/**
 * Validates JSX tag/bracket balance using Babel parser
 */
function validateJsxSyntax(snippet) {
  try {
    parser.parseExpression(snippet, {
      sourceType: 'module',
      plugins: ['jsx', 'typescript'],
    });
    return { valid: true };
  } catch (err1) {
    // Attempt parsing as a fragment in case multiple sibling elements are returned
    try {
      parser.parseExpression(`<>${snippet}</>`, {
        sourceType: 'module',
        plugins: ['jsx', 'typescript'],
      });
      return { valid: true };
    } catch (err2) {
      return { valid: false, error: err1.message || err2.message };
    }
  }
}

/**
 * Parse incoming JSON body
 */
function parseJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (err) {
        reject(err);
      }
    });
    req.on('error', reject);
  });
}

/**
 * Gemini Design Studio Dev-Only Vite Plugin
 */
export function vitePluginGeminiStudio() {
  return {
    name: 'vite-plugin-gemini-studio',
    apply: 'serve', // Strictly development mode only
    enforce: 'pre', // Runs before React JSX transformation

    // 1. Engine A: Build-Time Coordinate Injector
    transform(code, id) {
      try {
        fs.appendFileSync(path.resolve(rootDir, 'gemini-studio-transform.log'), `transform called: ${id}\n`);
      } catch (e) {}
      const cleanId = id.split('?')[0].replace(/\\/g, '/');
      if (!cleanId.toLowerCase().startsWith(normSrcDir.toLowerCase())) return null;
      if (!cleanId.endsWith('.tsx') && !cleanId.endsWith('.jsx')) return null;

      try {
        const ast = parser.parse(code, {
          sourceType: 'module',
          plugins: ['jsx', 'typescript'],
          tokens: true,
        });

        const relPath = path.relative(rootDir, cleanId).replace(/\\/g, '/');
        let injectedCount = 0;

        traverse(ast, {
          JSXElement(pathNode) {
            const opening = pathNode.node.openingElement;
            if (!opening || !opening.name) return;

            // Fix 2: ONLY inject on lowercase intrinsic HTML tags. Skip Fragments and custom components.
            if (opening.name.type !== 'JSXIdentifier') return;
            const tagName = opening.name.name;
            if (!INTRINSIC_TAGS.has(tagName)) return;

            // Fix 1: Read startLine and endLine from parent JSXElement (pathNode.node.loc)
            if (!pathNode.node.loc) return;
            const startLine = pathNode.node.loc.start.line;
            const endLine = pathNode.node.loc.end.line;

            const locValue = `${relPath}:${startLine}:${endLine}`;

            // Check if data-ag-loc already exists
            const existingAttr = opening.attributes.find(
              attr => attr.type === 'JSXAttribute' && attr.name && attr.name.name === 'data-ag-loc'
            );

            if (!existingAttr) {
              opening.attributes.push(
                t.jsxAttribute(
                  t.jsxIdentifier('data-ag-loc'),
                  t.stringLiteral(locValue)
                )
              );
              injectedCount++;
            }
          }
        });

        if (injectedCount > 0) {
          const result = generate(ast, { retainLines: true, sourceMaps: true }, code);
          return {
            code: result.code,
            map: result.map,
          };
        }
      } catch (err) {
        // Non-blocking parse warning during hot-reload
        console.warn(`[gemini-studio] Babel parse notice in ${cleanId}:`, err.message);
      }
      return null;
    },

    // 2. Engine C: Vite Middleware Backend (Endpoints: /discuss, /patch, /undo, /status, /client.js)
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url || '';

        // Serve client.js with strict no-cache headers at top of stack (Directive 2)
        if (url.startsWith('/__gemini_studio__/client.js') && req.method === 'GET') {
          res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
          res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
          const clientPath = path.resolve(__dirname, 'gemini-studio', 'client.js');
          if (fs.existsSync(clientPath)) {
            return res.end(fs.readFileSync(clientPath, 'utf8'));
          }
          return res.end('console.warn("[gemini-studio] client.js not found");');
        }

        // Endpoint: GET /__gemini_studio__/status
        if (url.startsWith('/__gemini_studio__/status') && req.method === 'GET') {
          res.setHeader('Content-Type', 'application/json');
          return res.end(JSON.stringify({ ok: true, undoCount: undoStack.length }));
        }

        // Endpoint: POST /__gemini_studio__/lock-target (Antigravity Target Lock - Single & Batch Queue)
        if (url.startsWith('/__gemini_studio__/lock-target') && req.method === 'POST') {
          res.setHeader('Content-Type', 'application/json');
          try {
            const body = await parseJsonBody(req);
            const { batch, loc, currentStyles, userInstruction } = body;

            // Handle Batch Queue Mode
            if (Array.isArray(batch) && batch.length > 0) {
              let targetsMarkdown = `# Active UI Targets Batch Queue (Gemini Design Studio)
Generated: ${new Date().toISOString()}
Total Targets: ${batch.length}

The user has collected multiple UI/UX revision points across the application.
Execute the requested modifications for EACH target in order.
Do NOT scan, search, or read other files in the codebase.
Preserve all state hooks, event handlers, and surrounding logic.

---
`;

              for (let i = 0; i < batch.length; i++) {
                const item = batch[i];
                const parts = (item.loc || '').split(':');
                const relPath = parts[0];
                const startLine = parseInt(parts[1], 10);
                const endLine = parseInt(parts[2], 10);
                const fullPath = path.resolve(rootDir, relPath);

                let targetSlice = '(Target file not found)';
                if (fs.existsSync(fullPath)) {
                  const fileContent = fs.readFileSync(fullPath, 'utf8');
                  const lines = fileContent.split('\n');
                  targetSlice = lines.slice(startLine - 1, endLine).join('\n');
                }

                targetsMarkdown += `
## Target ${i + 1}: \`${relPath}:${startLine}:${endLine}\`
- **Target File:** \`${relPath}\` (Lines ${startLine}-${endLine})
- **Current Classes:** \`${item.currentStyles || ''}\`
- **User Instruction:**
> ${item.userInstruction || 'Terapkan perbaikan sesuai instruksi.'}

### Exact Target JSX Slice
\`\`\`tsx
${targetSlice}
\`\`\`

---
`;
              }

              const triggerText = `Baca .agents/active-ui-target.md lalu kerjakan seluruh ${batch.length} antrean revisi UI tersebut.`;

              // Save to workspace root .agents
              const wsTarget = path.resolve(rootDir, '..', '.agents', 'active-ui-target.md');
              fs.mkdirSync(path.dirname(wsTarget), { recursive: true });
              fs.writeFileSync(wsTarget, targetsMarkdown, 'utf8');

              // Also save to app .agents
              const appTarget = path.resolve(rootDir, '.agents', 'active-ui-target.md');
              fs.mkdirSync(path.dirname(appTarget), { recursive: true });
              fs.writeFileSync(appTarget, targetsMarkdown, 'utf8');

              return res.end(JSON.stringify({
                success: true,
                isBatch: true,
                count: batch.length,
                triggerText,
                savedTo: wsTarget
              }));
            }

            // Single Target Mode Fallback
            if (!loc) {
              res.statusCode = 400;
              return res.end(JSON.stringify({ error: 'Missing target loc coordinates' }));
            }

            const parts = loc.split(':');
            const relPath = parts[0];
            const startLine = parseInt(parts[1], 10);
            const endLine = parseInt(parts[2], 10);
            const fullPath = path.resolve(rootDir, relPath);

            if (!fs.existsSync(fullPath)) {
              res.statusCode = 404;
              return res.end(JSON.stringify({ error: `File not found: ${relPath}` }));
            }

            const fileContent = fs.readFileSync(fullPath, 'utf8');
            const lines = fileContent.split('\n');
            const targetSlice = lines.slice(startLine - 1, endLine).join('\n');

            const cleanInstruction = (userInstruction || '').trim();
            const triggerText = cleanInstruction
              ? `Baca .agents/active-ui-target.md lalu terapkan instruksi: "${cleanInstruction}"`
              : `Baca .agents/active-ui-target.md lalu `;

            const markdownDoc = `# Active UI Target (Gemini Design Studio)
Generated: ${new Date().toISOString()}

- **Target File:** \`${relPath}\`
- **Line Range:** Lines ${startLine} to ${endLine} (\`${loc}\`)
- **Current Tailwind Classes:** \`${currentStyles || ''}\`

## User's Requested UI/UX Instruction
> ${cleanInstruction || 'Terapkan redesign atau modifikasi sesuai instruksi user.'}

## Exact Target JSX Slice
\`\`\`tsx
${targetSlice}
\`\`\`

## Agent Instruction
The user has locked onto this specific component using Gemini Design Studio Alt+Click inspector.
Read ONLY this target slice and apply the user's requested UI/UX redesign or styling change to lines ${startLine}-${endLine} of \`${relPath}\`.
Do NOT scan, search, or read other files in the codebase.
Preserve all state hooks, event handlers, and surrounding logic.
`;

            // Save to workspace root .agents
            const wsTarget = path.resolve(rootDir, '..', '.agents', 'active-ui-target.md');
            fs.mkdirSync(path.dirname(wsTarget), { recursive: true });
            fs.writeFileSync(wsTarget, markdownDoc, 'utf8');

            // Also save to app .agents
            const appTarget = path.resolve(rootDir, '.agents', 'active-ui-target.md');
            fs.mkdirSync(path.dirname(appTarget), { recursive: true });
            fs.writeFileSync(appTarget, markdownDoc, 'utf8');

            return res.end(JSON.stringify({
              success: true,
              isBatch: false,
              loc,
              relPath,
              startLine,
              endLine,
              userInstruction: cleanInstruction,
              triggerText,
              savedTo: wsTarget
            }));
          } catch (err) {
            res.statusCode = 500;
            return res.end(JSON.stringify({ error: err.message }));
          }
        }

        // Endpoint: POST /__gemini_studio__/discuss
        if (url.startsWith('/__gemini_studio__/discuss') && req.method === 'POST') {
          res.setHeader('Content-Type', 'application/json');
          try {
            const body = await parseJsonBody(req);
            const { loc, prompt, currentStyles, apiKey, model } = body;

            if (!loc) {
              res.statusCode = 400;
              return res.end(JSON.stringify({ error: 'Missing target loc coordinates' }));
            }

            const parts = loc.split(':');
            const relPath = parts[0];
            const startLine = parseInt(parts[1], 10);
            const endLine = parseInt(parts[2], 10);
            const fullPath = path.resolve(rootDir, relPath);

            if (!fs.existsSync(fullPath)) {
              res.statusCode = 404;
              return res.end(JSON.stringify({ error: `File not found: ${relPath}` }));
            }

            const fileContent = fs.readFileSync(fullPath, 'utf8');
            const lines = fileContent.split('\n');
            const targetLines = lines.slice(startLine - 1, endLine).join('\n');

            const key = apiKey || process.env.GEMINI_API_KEY;
            if (!key) {
              res.statusCode = 400;
              return res.end(JSON.stringify({
                error: 'Google Gemini API key required. Please configure it in Studio Settings modal.'
              }));
            }

            const modelName = model || 'gemini-2.5-flash';
            const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${key}`;

            const systemPrompt = `Anda adalah Lead Front-End & UI/UX Co-Pilot untuk Nugget Nihongo.
Prinsip Utama:
1. Teman Belajar aesthetic: Japanese lacquerware urushi (obsidian #0F1117, surface #161922, surface-2 #1E222D) dan kintsugi amber (#F59E0B, hot #FBBF24).
2. Indonesian learner psychology: Anti-malu (ramah, mendidik, tidak pernah menyalahkan pengguna).
3. Mobile-first: Touch target >=44px, safe-area cushion, tabular-nums untuk angka/XP/streak.
4. Berikan saran atau breakdown UI/UX konkret dalam Bahasa Indonesia yang siap dieksekusi.`;

            const geminiPayload = {
              contents: [{
                role: 'user',
                parts: [{
                  text: `${systemPrompt}\n\nKonteks Elemen (${relPath} baris ${startLine}-${endLine}):\n\`\`\`tsx\n${targetLines}\n\`\`\`\n\nClass saat ini: ${currentStyles || 'default'}\n\nPermintaan Brainstorming:\n${prompt || 'Berikan audit UI/UX dan rekomendasi estetika untuk elemen ini.'}`
                }]
              }],
              generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 1024,
              }
            };

            const response = await fetch(geminiUrl, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(geminiPayload)
            });

            if (!response.ok) {
              const errBody = await response.text();
              res.statusCode = response.status;
              return res.end(JSON.stringify({ error: `Gemini API Error (${response.status}): ${errBody}` }));
            }

            const data = await response.json();
            const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Tidak ada balasan dari Gemini.';

            return res.end(JSON.stringify({
              reply,
              targetSnippet: targetLines,
              loc,
              model: modelName
            }));
          } catch (err) {
            res.statusCode = 500;
            return res.end(JSON.stringify({ error: err.message }));
          }
        }

        // Endpoint: POST /__gemini_studio__/patch
        if (url.startsWith('/__gemini_studio__/patch') && req.method === 'POST') {
          res.setHeader('Content-Type', 'application/json');
          try {
            const body = await parseJsonBody(req);
            const { mode, loc, newClasses, aiPrompt, apiKey, model } = body;

            if (!loc) {
              res.statusCode = 400;
              return res.end(JSON.stringify({ error: 'Missing target loc coordinates' }));
            }

            const parts = loc.split(':');
            const relPath = parts[0];
            const startLine = parseInt(parts[1], 10);
            const endLine = parseInt(parts[2], 10);
            const fullPath = path.resolve(rootDir, relPath);

            if (!fs.existsSync(fullPath)) {
              res.statusCode = 404;
              return res.end(JSON.stringify({ error: `File not found: ${relPath}` }));
            }

            const originalContent = fs.readFileSync(fullPath, 'utf8');

            // Mode A: Direct Class Update (0 AI Tokens)
            if (mode === 'class') {
              if (newClasses === undefined) {
                res.statusCode = 400;
                return res.end(JSON.stringify({ error: 'Missing newClasses for class patch' }));
              }

              const lines = originalContent.split('\n');
              const slice = lines.slice(startLine - 1, endLine);
              let joinedSlice = slice.join('\n');

              // Replace or inject className in the opening tag
              let replaced = false;
              if (/className\s*=\s*(["']).*?\1/.test(joinedSlice)) {
                joinedSlice = joinedSlice.replace(
                  /className\s*=\s*(["']).*?\1/,
                  `className="${newClasses}"`
                );
                replaced = true;
              } else if (/className\s*=\s*\{`.*?`\}/.test(joinedSlice)) {
                joinedSlice = joinedSlice.replace(
                  /className\s*=\s*\{`.*?`\}/,
                  `className="${newClasses}"`
                );
                replaced = true;
              } else {
                // Insert className attribute after the opening tag name
                joinedSlice = joinedSlice.replace(
                  /(<[a-z0-9]+)(\s|>)/i,
                  `$1 className="${newClasses}"$2`
                );
                replaced = true;
              }

              // Fix 3: Strip any data-ag-loc attributes before writing to disk
              joinedSlice = cleanAgLocAttributes(joinedSlice);

              // Push undo snapshot
              undoStack.push({ filePath: fullPath, previousContent: originalContent, timestamp: Date.now() });
              if (undoStack.length > MAX_UNDO) undoStack.shift();

              // Splice back into file
              const newLines = joinedSlice.split('\n');
              lines.splice(startLine - 1, (endLine - startLine + 1), ...newLines);
              fs.writeFileSync(fullPath, lines.join('\n'), 'utf8');

              return res.end(JSON.stringify({
                success: true,
                mode: 'class',
                undoAvailable: true,
                loc
              }));
            }

            // Mode B: AI Structural Redesign
            if (mode === 'ai') {
              const key = apiKey || process.env.GEMINI_API_KEY;
              if (!key) {
                res.statusCode = 400;
                return res.end(JSON.stringify({
                  error: 'Google Gemini API key required for AI redesign. Please configure in Studio Settings.'
                }));
              }

              const lines = originalContent.split('\n');
              const targetSnippet = lines.slice(startLine - 1, endLine).join('\n');
              const modelName = model || 'gemini-2.5-flash';
              const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${key}`;

              const aiPromptText = `Anda adalah Code Mutator untuk Nugget Nihongo.
TUGAS KRITIS:
Tulis ulang HANYA potongan JSX target di bawah ini sesuai instruksi desain.
ATURAN WAJIB:
1. Kembalikan HANYA potongan JSX pengganti di dalam format markdown code block: \`\`\`tsx ... \`\`\`.
2. JANGAN sertakan kode lain di luar elemen target ini.
3. Pertahankan SEMUA props, event handlers (onClick, onChange), hooks, dan panggilan fungsi yang sudah ada.
4. Gunakan Tailwind semantic tokens (bg-surface, text-appText, text-accent, border-border, shadow-glow).
5. Jangan menyisipkan atribut data-ag-loc.

Instruksi Redesain: ${aiPrompt}

Potongan JSX Target (${relPath} baris ${startLine}-${endLine}):
\`\`\`tsx
${targetSnippet}
\`\`\``;

              const response = await fetch(geminiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  contents: [{ role: 'user', parts: [{ text: aiPromptText }] }],
                  generationConfig: { temperature: 0.2, maxOutputTokens: 2048 }
                })
              });

              if (!response.ok) {
                const errBody = await response.text();
                res.statusCode = response.status;
                return res.end(JSON.stringify({ error: `Gemini API Error: ${errBody}` }));
              }

              const data = await response.json();
              const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

              // Extract JSX from codeblock
              const match = reply.match(/```(?:tsx|jsx|html)?\s*([\s\S]*?)```/);
              let newJsx = match ? match[1].trim() : reply.trim();

              // Fix 3: Strip any data-ag-loc attributes
              newJsx = cleanAgLocAttributes(newJsx);

              // Validate AST bracket/tag balance
              const validation = validateJsxSyntax(newJsx);
              if (!validation.valid) {
                res.statusCode = 422;
                return res.end(JSON.stringify({
                  error: `AST Tag Validation Rejected Mutation: ${validation.error}`,
                  rawAiOutput: reply
                }));
              }

              // Push undo snapshot
              undoStack.push({ filePath: fullPath, previousContent: originalContent, timestamp: Date.now() });
              if (undoStack.length > MAX_UNDO) undoStack.shift();

              // Splice into file lines
              const replacementLines = newJsx.split('\n');
              lines.splice(startLine - 1, (endLine - startLine + 1), ...replacementLines);
              fs.writeFileSync(fullPath, lines.join('\n'), 'utf8');

              return res.end(JSON.stringify({
                success: true,
                mode: 'ai',
                undoAvailable: true,
                loc
              }));
            }

            res.statusCode = 400;
            return res.end(JSON.stringify({ error: 'Invalid patch mode (must be "class" or "ai")' }));
          } catch (err) {
            res.statusCode = 500;
            return res.end(JSON.stringify({ error: err.message }));
          }
        }

        // Endpoint: POST /__gemini_studio__/undo
        if (url.startsWith('/__gemini_studio__/undo') && req.method === 'POST') {
          res.setHeader('Content-Type', 'application/json');
          if (undoStack.length === 0) {
            return res.end(JSON.stringify({ success: false, message: 'Undo stack is empty' }));
          }

          const snapshot = undoStack.pop();
          try {
            fs.writeFileSync(snapshot.filePath, snapshot.previousContent, 'utf8');
            return res.end(JSON.stringify({
              success: true,
              restoredFile: path.relative(rootDir, snapshot.filePath).replace(/\\/g, '/'),
              remainingUndo: undoStack.length
            }));
          } catch (err) {
            res.statusCode = 500;
            return res.end(JSON.stringify({ error: `Undo failed: ${err.message}` }));
          }
        }

        next();
      });
    },

    // 3. Virtual module loading for Studio Client files
    resolveId(id) {
      if (id === '/@gemini-studio/client.js' || id === '/@gemini-studio/client.css') {
        return id;
      }
      return null;
    },

    load(id) {
      if (id === '/@gemini-studio/client.js') {
        const clientPath = path.resolve(__dirname, 'gemini-studio', 'client.js');
        if (fs.existsSync(clientPath)) {
          return fs.readFileSync(clientPath, 'utf8');
        }
        return `console.warn("[gemini-studio] Client script not found at ${clientPath}");`;
      }
      if (id === '/@gemini-studio/client.css') {
        const cssPath = path.resolve(__dirname, 'gemini-studio', 'client.css');
        if (fs.existsSync(cssPath)) {
          return fs.readFileSync(cssPath, 'utf8');
        }
        return '';
      }
      return null;
    },

    // 4. Inject studio client solely in dev mode (zero production impact)
    transformIndexHtml(html) {
      return {
        html,
        tags: [
          {
            tag: 'script',
            attrs: {
              type: 'module',
              src: `/__gemini_studio__/client.js?t=${Date.now()}`,
            },
            injectTo: 'body',
          },
        ],
      };
    },
  };
}
