import { createServer } from 'vite';

async function run() {
  let server = null;
  for (let attempt = 1; attempt <= 10; attempt++) {
    try {
      server = await createServer({
        configFile: './vite.config.ts',
        server: {
          port: 5173,
          strictPort: true,
          host: '127.0.0.1',
        },
      });
      await server.listen();
      console.log('[DevServer] Nugget Nihongo dev server listening at http://localhost:5173/');
      server.printUrls();
      return;
    } catch (err) {
      if (err.code === 'EADDRINUSE' || err.message?.includes('address already in use')) {
        console.log(`[DevServer] Port 5173 in TIME_WAIT/in use, retrying in 2s (attempt ${attempt}/10)...`);
        await new Promise(r => setTimeout(r, 2000));
      } else {
        console.error('[DevServer] Failed to start:', err);
        process.exit(1);
      }
    }
  }
}

run();
