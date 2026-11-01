import { createClient, SupabaseClient } from '@supabase/supabase-js';

export interface SupabaseConfig {
  url: string;
  anonKey: string;
  isConfigured: boolean;
  isCustom: boolean;
}

export const OFFICIAL_PROJECT_REF = 'xipvhxorvwpvfokauboy';
export const OFFICIAL_SUPABASE_URL = 'https://xipvhxorvwpvfokauboy.supabase.co';

const DEFAULT_DEAD_URL = 'https://unconfigured.supabase.co';
const DEFAULT_ANON_KEY = 'placeholder-anon-key';

export function getStoredSupabaseConfig(): SupabaseConfig {
  let url = '';
  let anonKey = '';

  if (typeof window !== 'undefined') {
    // Ticket T-05: Neutralize URL query parameter injection vulnerability (?sb_url=... and ?sb_key=...)
    // External links can no longer hijack the database connection to an attacker's Supabase project.
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.has('sb_url') || params.has('supabase_url') || params.has('sb_key') || params.has('supabase_anon_key')) {
        params.delete('sb_url');
        params.delete('supabase_url');
        params.delete('sb_key');
        params.delete('supabase_anon_key');
        const cleanUrl = window.location.pathname + (params.toString() ? `?${params.toString()}` : '') + window.location.hash;
        window.history.replaceState({}, document.title, cleanUrl);
        console.warn('[supabase] Neutralized and stripped unsafe Supabase URL/key query parameter override attempt');
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

  // Fallback to official project URL if none configured
  if (!url) {
    url = OFFICIAL_SUPABASE_URL;
  }

  const isConfigured = !!url && !url.includes('unconfigured') && !url.includes('oxeuwkpgrtojjzhcboqz') && !url.includes('your-project-id') && anonKey !== 'placeholder-anon-key' && !!anonKey;
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

export async function testSupabaseConnection(
  targetUrl?: string,
  targetKey?: string,
  timeoutMs = 6000
): Promise<{ ok: boolean; message: string; latencyMs?: number }> {
  const cfg = getStoredSupabaseConfig();
  const url = (targetUrl || cfg.url).trim().replace(/\/$/, '');
  const key = (targetKey || cfg.anonKey).trim();

  if (!url || url.includes('oxeuwkpgrtojjzhcboqz') || url.includes('your-project-id') || url.includes('unconfigured')) {
    return {
      ok: false,
      message: 'Server cloud Supabase belum dikonfigurasi.',
    };
  }

  const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
  const timer = controller ? setTimeout(() => controller.abort(), timeoutMs) : null;
  const startTime = performance.now();

  try {
    const res = await fetch(`${url}/auth/v1/health`, {
      method: 'GET',
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
      },
      signal: controller?.signal,
    });

    const latencyMs = Math.round(performance.now() - startTime);

    if (res.ok) {
      return {
        ok: true,
        message: `Koneksi aktif! Database Supabase merespons normal (${latencyMs}ms).`,
        latencyMs,
      };
    }
    return {
      ok: false,
      message: `Server merespons dengan HTTP ${res.status}. Periksa Anon Key proyek.`,
      latencyMs,
    };
  } catch (err: unknown) {
    const isTimeout = err instanceof Error && (err.name === 'AbortError' || err.message.includes('abort'));
    if (isTimeout) {
      return {
        ok: false,
        message: `Koneksi timeout setelah ${timeoutMs / 1000} detik. Database mungkin sedang dalam status 'Paused' atau tertidur.`,
      };
    }
    const errStr = err instanceof Error ? err.message : String(err);
    return {
      ok: false,
      message: `Tidak dapat terhubung ke server: ${errStr}`,
    };
  } finally {
    if (timer) clearTimeout(timer);
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
