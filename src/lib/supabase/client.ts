import { createClient, SupabaseClient } from '@supabase/supabase-js';

export interface SupabaseConfig {
  url: string;
  anonKey: string;
  isConfigured: boolean;
  isCustom: boolean;
}

const DEFAULT_DEAD_URL = 'https://unconfigured.supabase.co';
const DEFAULT_ANON_KEY = 'placeholder-anon-key';

export function getStoredSupabaseConfig(): SupabaseConfig {
  let url = '';
  let anonKey = '';

  if (typeof window !== 'undefined') {
    // Check URL query parameters for developer setup (strictly validated)
    try {
      const params = new URLSearchParams(window.location.search);
      const qUrl = params.get('sb_url') || params.get('supabase_url');
      const qKey = params.get('sb_key') || params.get('supabase_anon_key');
      if (qUrl && qKey) {
        const trimmedUrl = qUrl.trim().replace(/\/$/, '');
        const trimmedKey = qKey.trim();

        // Security validation (F-09): strictly allow only valid https supabase.co domains or localhost in dev
        const parsedUrl = new URL(trimmedUrl);
        const isDev = typeof import.meta !== 'undefined' && !import.meta.env?.PROD;
        const isOfficialSupabase = /^https:\/\/[a-z0-9-]+\.supabase\.co$/.test(parsedUrl.origin);
        const isLocalDev = isDev && (parsedUrl.hostname === 'localhost' || parsedUrl.hostname === '127.0.0.1');

        if ((isOfficialSupabase || isLocalDev) && trimmedKey.length > 20) {
          localStorage.setItem('nn_supabase_url', trimmedUrl);
          localStorage.setItem('nn_supabase_anon_key', trimmedKey);
          console.info('[supabase] Configured via validated URL params!');

          // Clean query parameters from URL to avoid leaking in history / referrer
          params.delete('sb_url');
          params.delete('supabase_url');
          params.delete('sb_key');
          params.delete('supabase_anon_key');
          const cleanUrl = window.location.pathname + (params.toString() ? `?${params.toString()}` : '') + window.location.hash;
          window.history.replaceState({}, document.title, cleanUrl);
        } else {
          console.warn('[supabase] Rejected unsafe URL query parameter config override');
        }
      }
    } catch {
      // Ignore URL parsing errors
    }

    url = localStorage.getItem('nn_supabase_url') || '';
    anonKey = localStorage.getItem('nn_supabase_anon_key') || '';
  }

  if (!url && typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_URL) {
    url = import.meta.env.VITE_SUPABASE_URL;
  }
  if (!anonKey && typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_ANON_KEY) {
    anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  }

  const isConfigured = !!url && !url.includes('unconfigured') && !url.includes('oxeuwkpgrtojjzhcboqz') && !url.includes('your-project-id') && anonKey !== 'placeholder-anon-key';
  const isCustom = isConfigured;

  return {
    url: (url || DEFAULT_DEAD_URL).trim().replace(/\/$/, ''),
    anonKey: (anonKey || DEFAULT_ANON_KEY).trim(),
    isConfigured,
    isCustom,
  };
}

const initialConfig = getStoredSupabaseConfig();

export let supabase: SupabaseClient = createClient(initialConfig.url, initialConfig.anonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
  },
});

export function isSupabaseConfigured(): boolean {
  return getStoredSupabaseConfig().isConfigured;
}

export function updateSupabaseConfig(newUrl: string, newAnonKey: string): SupabaseClient {
  const cleanUrl = newUrl.trim().replace(/\/$/, '');
  const cleanKey = newAnonKey.trim();

  if (typeof window !== 'undefined') {
    if (cleanUrl) localStorage.setItem('nn_supabase_url', cleanUrl);
    else localStorage.removeItem('nn_supabase_url');

    if (cleanKey) localStorage.setItem('nn_supabase_anon_key', cleanKey);
    else localStorage.removeItem('nn_supabase_anon_key');
  }

  const effectiveUrl = cleanUrl || DEFAULT_DEAD_URL;
  const effectiveKey = cleanKey || DEFAULT_ANON_KEY;

  supabase = createClient(effectiveUrl, effectiveKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storage: typeof window !== 'undefined' ? window.localStorage : undefined,
    },
  });

  return supabase;
}

export async function testSupabaseConnection(targetUrl?: string, targetKey?: string): Promise<{ ok: boolean; message: string }> {
  const cfg = getStoredSupabaseConfig();
  const url = (targetUrl || cfg.url).trim().replace(/\/$/, '');
  const key = (targetKey || cfg.anonKey).trim();

  if (!url || url.includes('oxeuwkpgrtojjzhcboqz') || url.includes('your-project-id')) {
    return {
      ok: false,
      message: 'Server cloud Supabase belum dikonfigurasi.',
    };
  }

  try {
    const res = await fetch(`${url}/auth/v1/health`, {
      method: 'GET',
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
      },
    });

    if (res.ok) {
      return { ok: true, message: 'Koneksi ke Supabase aktif dan terhubung!' };
    }
    return { ok: false, message: `Server Supabase merespons dengan kode HTTP ${res.status}.` };
  } catch (err: unknown) {
    const errStr = err instanceof Error ? err.message : String(err);
    return {
      ok: false,
      message: `Tidak dapat terhubung ke server cloud: ${errStr}`,
    };
  }
}

// Developer Console helper for direct browser setup without exposing forms to learners
if (typeof window !== 'undefined') {
  (window as any).configureSupabase = (url: string, anonKey: string) => {
    updateSupabaseConfig(url, anonKey);
    console.log('✅ Supabase updated! Reloading...');
    window.location.reload();
  };
}
