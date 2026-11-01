import { createServer } from 'vite';

async function run() {
  try {
    const server = await createServer({
      configFile: './vite.config.ts',
      server: {
        port: 5173,
        strictPort: false,
        host: '127.0.0.1',
      },
    });
    await server.listen();
    console.log('[DevServer] Nugget Nihongo dev server listening at http://localhost:5173/');
    server.printUrls();
  } catch (err) {
    console.error('[DevServer] Failed to start:', err);
    process.exit(1);
  }
}

run();
