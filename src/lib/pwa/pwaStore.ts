import { create } from 'zustand';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

interface PwaState {
  isInstallable: boolean;
  isInstalled: boolean;
  isIos: boolean;
  showInstallModal: boolean;
  deferredPrompt: BeforeInstallPromptEvent | null;
  setShowInstallModal: (show: boolean) => void;
  promptInstall: () => Promise<boolean>;
  initPwa: () => void;
}

export const usePwaStore = create<PwaState>((set, get) => ({
  isInstallable: false,
  isInstalled: false,
  isIos: false,
  showInstallModal: false,
  deferredPrompt: null,

  setShowInstallModal: (show: boolean) => set({ showInstallModal: show }),

  promptInstall: async () => {
    const { deferredPrompt } = get();
    if (!deferredPrompt) return false;

    try {
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === 'accepted') {
        set({ isInstalled: true, isInstallable: false, deferredPrompt: null, showInstallModal: false });
        return true;
      }
    } catch (e) {
      console.warn('PWA prompt failed:', e);
    }
    return false;
  },

  initPwa: () => {
    if (typeof window === 'undefined') return;

    // Check if running as standalone PWA
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true;

    const isIos =
      /iPad|iPhone|iPod/.test(navigator.userAgent) &&
      !(window as unknown as { MSStream?: unknown }).MSStream;

    set({ isInstalled: isStandalone, isIos });

    // Register Service Worker
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then((reg) => {
            console.log('[PWA] Service Worker registered with scope:', reg.scope);
          })
          .catch((err) => {
            console.warn('[PWA] Service Worker registration failed:', err);
          });
      });
    }

    // Capture beforeinstallprompt
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      set({
        deferredPrompt: e as BeforeInstallPromptEvent,
        isInstallable: true
      });
    });

    // Detect app installed
    window.addEventListener('appinstalled', () => {
      set({ isInstalled: true, isInstallable: false, deferredPrompt: null });
      console.log('[PWA] App successfully installed');
    });
  }
}));
