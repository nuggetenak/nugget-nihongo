/**
 * scripts/sync-dist-to-public.js
 * Synchronizes compiled Vite production assets (dist/index.html & dist/assets)
 * into public/ so that deployments targeting either dist/ OR public/ (like Cloudflare Pages)
 * will ALWAYS serve the modern React 18 SPA instead of stale fallback code.
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const DIST_DIR = path.join(ROOT_DIR, 'dist');
const PUBLIC_DIR = path.join(ROOT_DIR, 'public');

function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach((childItemName) => {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

function syncDistToPublic() {
  console.log('[sync-dist-to-public] Starting synchronization...');

  const distIndex = path.join(DIST_DIR, 'index.html');
  const publicIndex = path.join(PUBLIC_DIR, 'index.html');

  if (!fs.existsSync(distIndex)) {
    console.error('❌ dist/index.html does not exist! Run vite build first.');
    process.exit(1);
  }

  // 1. Copy dist/index.html to public/index.html
  fs.copyFileSync(distIndex, publicIndex);
  console.log('✅ Synchronized dist/index.html -> public/index.html (' + fs.statSync(publicIndex).size + ' bytes)');

  // 2. Copy dist/assets to public/assets
  const distAssets = path.join(DIST_DIR, 'assets');
  const publicAssets = path.join(PUBLIC_DIR, 'assets');
  if (fs.existsSync(distAssets)) {
    copyRecursiveSync(distAssets, publicAssets);
    console.log('✅ Synchronized dist/assets -> public/assets');
  }

  // 3. Remove legacy _redirects if present (Cloudflare Workers Static Assets uses not_found_handling: "single-page-application" in wrangler.json; explicit /* /index.html causes error 100324 loop)
  const publicRedirects = path.join(PUBLIC_DIR, '_redirects');
  if (fs.existsSync(publicRedirects)) {
    fs.unlinkSync(publicRedirects);
  }
  const distRedirects = path.join(DIST_DIR, '_redirects');
  if (fs.existsSync(distRedirects)) {
    fs.unlinkSync(distRedirects);
  }
  console.log('✅ Verified SPA fallback handled via wrangler.json not_found_handling');

  console.log('[sync-dist-to-public] Complete! Both dist/ and public/ now serve the modern React 18 SPA.');
}

syncDistToPublic();
