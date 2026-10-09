import { create } from 'zustand';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from './client';
import { syncEngine } from './syncEngine';

export type SyncStatus = 'idle' | 'syncing' | 'synced' | 'error';

export interface AuthState {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isAuthModalOpen: boolean;
  authMode: 'signin' | 'signup';
  syncStatus: SyncStatus;
  lastSyncedAt: Date | null;
  syncErrorMessage: string | null;

  // Actions
  openAuthModal: (mode?: 'signin' | 'signup') => void;
  closeAuthModal: () => void;
  setAuthMode: (mode: 'signin' | 'signup') => void;

  initAuth: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUpWithEmail: (email: string, password: string, displayName?: string) => Promise<{ error: Error | null }>;
  signInWithGoogle: () => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  syncNow: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  session: null,
  isLoading: true,
  isAuthModalOpen: false,
  authMode: 'signin',
  syncStatus: 'idle',
  lastSyncedAt: null,
  syncErrorMessage: null,

  openAuthModal: (mode = 'signin') => set({ isAuthModalOpen: true, authMode: mode }),
  closeAuthModal: () => set({ isAuthModalOpen: false }),
  setAuthMode: (authMode) => set({ authMode }),

  initAuth: async () => {
    try {
      set({ isLoading: true });
      const { data: { session } } = await supabase.auth.getSession();
      set({ session, user: session?.user || null, isLoading: false });

      if (session?.user) {
        get().syncNow();
      }

      // Listen to auth changes
      supabase.auth.onAuthStateChange(async (event, newSession) => {
        const currentUser = newSession?.user || null;
        set({ session: newSession, user: currentUser });

        if (event === 'SIGNED_IN' && currentUser) {
          get().syncNow();
        } else if (event === 'SIGNED_OUT') {
          set({ syncStatus: 'idle', lastSyncedAt: null });
        }
      });

      // Background triggers when device reconnects or tab becomes visible
      if (typeof window !== 'undefined') {
        window.addEventListener('online', () => {
          if (get().user) get().syncNow();
        });
        document.addEventListener('visibilitychange', () => {
          if (document.visibilityState === 'visible' && navigator.onLine && get().user) {
            get().syncNow();
          }
        });
      }
    } catch (err) {
      console.warn('[authStore] initAuth error:', err);
      set({ isLoading: false });
    }
  },

  signInWithEmail: async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (!error) {
      get().closeAuthModal();
      get().syncNow();
    }
    return { error };
  },

  signUpWithEmail: async (email, password, displayName) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { display_name: displayName || email.split('@')[0] },
        emailRedirectTo: typeof window !== 'undefined' ? window.location.origin : undefined,
      },
    });
    if (!error && data.user) {
      get().closeAuthModal();
      get().syncNow();
    }
    return { error };
  },

  signInWithGoogle: async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: typeof window !== 'undefined' ? window.location.origin : undefined,
      },
    });
    return { error };
  },

  signOut: async () => {
    await supabase.auth.signOut();
    set({ user: null, session: null, syncStatus: 'idle' });
  },

  syncNow: async () => {
    const user = get().user;
    if (!user) return;

    set({ syncStatus: 'syncing', syncErrorMessage: null });
    try {
      await syncEngine.syncAll(user.id);
      set({ syncStatus: 'synced', lastSyncedAt: new Date() });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Gagal sinkronisasi';
      console.warn('[authStore] syncNow error:', err);
      set({ syncStatus: 'error', syncErrorMessage: msg });
    }
  },
}));
