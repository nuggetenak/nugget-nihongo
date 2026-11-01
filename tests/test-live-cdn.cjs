const https = require('https');

async function testCdn() {
  const html = await fetch('https://nugget-nihongo.pages.dev').then(r => r.text());
  console.log('HTML length:', html.length);
  
  const scriptRegex = /src="([^"]+)"/g;
  const linkRegex = /href="([^"]+)"/g;
  
  const assets = new Set();
  let m;
  while ((m = scriptRegex.exec(html)) !== null) assets.add(m[1]);
  while ((m = linkRegex.exec(html)) !== null) assets.add(m[1]);
  
  console.log(`Found ${assets.size} assets referenced in index.html:`);
  let errors = 0;
  for (const asset of assets) {
    if (asset.startsWith('data:') || asset.startsWith('#')) continue;
    // Preconnect links are origin URLs, not file endpoints
    if (asset === 'https://fonts.googleapis.com' || asset === 'https://fonts.gstatic.com') {
      console.log(`[PRECONNECT OK] ${asset}`);
      continue;
    }
    const url = asset.startsWith('http') ? asset : 'https://nugget-nihongo.pages.dev' + (asset.startsWith('/') ? '' : '/') + asset;
    try {
      const res = await fetch(url);
      console.log(`[${res.status}] ${asset} (${res.headers.get('content-type')})`);
      if (res.status >= 400) errors++;
    } catch (e) {
      console.error(`[ERROR] ${asset}:`, e.message);
      errors++;
    }
  }

  if (errors > 0) {
    console.error(`FAILED: ${errors} asset(s) failed to load.`);
    process.exit(1);
  } else {
    console.log('ALL CDN assets verified 100% accessible!');
  }
}

testCdn().catch(err => {
  console.error(err);
  process.exit(1);
});
