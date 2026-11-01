import aiProxy from './workers/ai-proxy.js';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (
      url.pathname.startsWith('/api/') ||
      url.pathname === '/chat' ||
      url.pathname === '/generate-quiz' ||
      url.pathname === '/critique'
    ) {
      return aiProxy.fetch(request, env);
    }
    return env.ASSETS ? env.ASSETS.fetch(request) : new Response('Not found', { status: 404 });
  }
};
