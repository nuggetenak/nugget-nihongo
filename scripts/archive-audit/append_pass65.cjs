const fs = require('fs');

const ledgerPath = 'C:\\Users\\Timedoor\\.gemini\\antigravity\\brain\\315bcf6d-badf-4ef8-9b03-5fab71855574\\FINDINGS_LEDGER.csv';

const pass65Records = [
  'Pass 65,Cluster 11,Production Build & Code Splitting,vite.config.ts#L28-L33,CRITICAL,"Ghost Chunk Anomaly (vendor-state Empty 0.00 kB File Emitted): Rollup build logs Generated an empty chunk: vendor-state. Explicitly configuring manualChunks for clsx and tailwind-merge emits an empty 0.00 kB asset file (dist/assets/js/vendor-state-*.js), producing an unnecessary HTTP request and polluting production distribution manifests","Remove vendor-state from manualChunks or consolidate micro-utilities into a unified vendor-core chunk",DOCUMENTED_PHASE_1',
  'Pass 65,Cluster 11,Production Build & Code Splitting,src/pages/QuizPage.tsx,CRITICAL,"Monolithic Quiz Page Bundle Bloat (397.10 kB JS Chunk): QuizPage-*.js balloons to 397.10 kB (134.73 kB gzipped). Because PrometricCbtModal.tsx and all specialized drill components are statically imported into QuizPage.tsx rather than dynamically lazy-loaded via React.lazy(), mobile learners navigating to the quiz tab are forced to download nearly 400 kB of monolithic JavaScript","Implement React.lazy() dynamic import boundaries for PrometricCbtModal, MoraPacingCard, and PanicRecallCard to reduce QuizPage chunk under 150 kB",DOCUMENTED_PHASE_1',
  'Pass 65,Cluster 11,Production Build & Code Splitting,src/index.tsx,CRITICAL,"Heavy Initial Entry Load (513.21 kB Combined Entry Chunks): The initial client hydration payload (index-*.js at 370.27 kB + vendor-react at 142.94 kB) exceeds half a megabyte (513.21 kB raw JS) before any route is rendered. The entry point eagerly bundles global managers and SVG assets synchronously on boot","Audit and prune eager root imports, deferring non-essential manager initializations until post-mount to slash initial bundle below 250 kB",DOCUMENTED_PHASE_1',
  'Pass 65,Cluster 11,Production Build & Code Splitting,src/lib/supabase/syncEngine.ts,HIGH,"Eager Initialization of Supabase Bundle on Critical Rendering Path: vendor-supabase (226.70 kB) is loaded synchronously during boot by syncEngine.ts and authStore.ts, blocking first contentful paint for offline learners who only require local IndexedDB storage","Dynamically import @supabase/supabase-js only when network connectivity is confirmed or cloud backup is explicitly triggered",DOCUMENTED_PHASE_1',
  'Pass 65,Cluster 11,Production Build & Code Splitting,package.json#L8-L12,HIGH,"Build Pipeline Test Verification Gap in npm run build: The package.json build script executes node tests/run.js but completely omits the modern multi-sprint cumulative test suites (test-sprint-6-books.js, test-sprint-29-textbook-drills.js, test-sprint-27-jft-seikatsu.js). Regressions in textbook exercises or CBT modals pass build unnoticed","Integrate modern cumulative test runner (node tests/run-all-sprints.cjs) directly into package.json build script before vite build",DOCUMENTED_PHASE_1',
  'Pass 65,Cluster 11,Production Build & Code Splitting,vite.config.ts#L21,HIGH,"Permissive 500kB Chunk Warning Limit Masking Mobile Route Bloat: chunkSizeWarningLimit: 500 suppresses Vite warnings for bloated route chunks like QuizPage (397 kB) and MateriHubPage (159 kB). For Indonesian mobile networks, route chunks should be constrained below 200 kB to prevent LCP and INP degradation","Lower chunkSizeWarningLimit to 250 kB and enforce strict bundle budgets with rollup-plugin-visualizer during CI builds",DOCUMENTED_PHASE_1'
];

fs.appendFileSync(ledgerPath, '\n' + pass65Records.join('\n'), 'utf8');
console.log('Appended 6 records for Pass 65 to FINDINGS_LEDGER.csv');

// Clean up any empty lines
let lines = fs.readFileSync(ledgerPath, 'utf8').split(/\r?\n/).map(l => l.trim()).filter(l => l.length > 0);
fs.writeFileSync(ledgerPath, lines.join('\n') + '\n', 'utf8');
console.log(`Cleaned ledger lines: ${lines.length} (Expected: 400 lines, 399 defect records + 1 header)`);
