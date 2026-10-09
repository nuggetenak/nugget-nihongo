import { createClient, SupabaseClient } from '@supabase/supabase-js';

export interface SupabaseConfig {
  url: string;
  anonKey: string;
  isCustom: boolean;
  isLegacyDeadUrl: boolean;
}

const DEFAULT_DEAD_URL = 'https://oxeuwkpgrtojjzhcboqz.supabase.co';
const DEFAULT_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94ZXV3a3BncnRvamp6aGNib3F6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUwNDczNTMsImV4cCI6MjA5MDYyMzM1M30.0kEo4o6U9YNWA0RA5h83W9nMacoxQR9uUL2lHiDiZPk';

export function getStoredSupabaseConfig(): SupabaseConfig {
  let url = '';
  let anonKey = '';

  if (typeof window !== 'undefined') {
    url = localStorage.getItem('nn_supabase_url') || '';
    anonKey = localStorage.getItem('nn_supabase_anon_key') || '';
  }

  if (!url && typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_URL) {
    url = import.meta.env.VITE_SUPABASE_URL;
  }
  if (!anonKey && typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_ANON_KEY) {
    anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  }

  const isCustom = !!url && !url.includes('oxeuwkpgrtojjzhcboqz');
  const isLegacyDeadUrl = !url || url.includes('oxeuwkpgrtojjzhcboqz');

  return {
    url: (url || DEFAULT_DEAD_URL).trim().replace(/\/$/, ''),
    anonKey: (anonKey || DEFAULT_ANON_KEY).trim(),
    isCustom,
    isLegacyDeadUrl,
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
  const url = (targetUrl || getStoredSupabaseConfig().url).trim().replace(/\/$/, '');
  const key = (targetKey || getStoredSupabaseConfig().anonKey).trim();

  if (!url || url.includes('oxeuwkpgrtojjzhcboqz')) {
    return {
      ok: false,
      message: 'Project URL belum diatur ke proyek Supabase aktifmu (URL saat ini tidak valid / NXDOMAIN).',
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
      return { ok: true, message: 'Koneksi ke Supabase berhasil! Proyek aktif.' };
    }
    return { ok: false, message: `Server Supabase merespons dengan kode ${res.status}. Periksa Anon Key.` };
  } catch (err: unknown) {
    const errStr = err instanceof Error ? err.message : String(err);
    return {
      ok: false,
      message: `Gagal terhubung ke host: ${errStr}. Pastikan URL benar dan terhubung ke internet.`,
    };
  }
}

