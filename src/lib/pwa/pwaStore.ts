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
  hasUpdate: boolean;
  waitingWorker: ServiceWorker | null;
  deferredPrompt: BeforeInstallPromptEvent | null;
  setShowInstallModal: (show: boolean) => void;
  promptInstall: () => Promise<boolean>;
  applyUpdate: () => void;
  initPwa: () => void;
}

export const usePwaStore = create<PwaState>((set, get) => ({
  isInstallable: false,
  isInstalled: false,
  isIos: false,
  showInstallModal: false,
  hasUpdate: false,
  waitingWorker: null,
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

  applyUpdate: () => {
    const { waitingWorker } = get();
    if (waitingWorker) {
      waitingWorker.postMessage({ type: 'SKIP_WAITING' });
    } else {
      window.location.reload();
    }
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

    // Register Service Worker with safe update flow
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then((reg) => {
            console.log('[PWA] Service Worker registered with scope:', reg.scope);

            // If a worker is already waiting, trigger update state
            if (reg.waiting) {
              set({ hasUpdate: true, waitingWorker: reg.waiting });
            }

            // Listen for waiting workers on updatefound
            reg.addEventListener('updatefound', () => {
              const newWorker = reg.installing;
              if (!newWorker) return;

              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  set({ hasUpdate: true, waitingWorker: newWorker });
                  console.log('[PWA] New version ready. User prompt required.');
                }
              });
            });
          })
          .catch((err) => {
            console.warn('[PWA] Service Worker registration failed:', err);
          });

        // Auto reload only when controller actually changes following prompt
        let refreshing = false;
        navigator.serviceWorker.addEventListener('controllerchange', () => {
          if (!refreshing) {
            refreshing = true;
            window.location.reload();
          }
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
