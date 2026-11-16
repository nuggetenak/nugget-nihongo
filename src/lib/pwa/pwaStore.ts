import { create } from 'zustand';
import { useModalStore } from '../../store/useModalStore';

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
  registration: ServiceWorkerRegistration | null;
  deferredPrompt: BeforeInstallPromptEvent | null;
  setShowInstallModal: (show: boolean) => void;
  promptInstall: () => Promise<boolean>;
  applyUpdate: () => void;
  checkForUpdate: () => Promise<void>;
  initPwa: () => void;
}

export const usePwaStore = create<PwaState>((set, get) => ({
  isInstallable: false,
  isInstalled: false,
  isIos: false,
  showInstallModal: false,
  hasUpdate: false,
  waitingWorker: null,
  registration: null,
  deferredPrompt: null,

  setShowInstallModal: (show: boolean) => {
    set({ showInstallModal: show });
    if (show) {
      useModalStore.getState().openModal('install');
    } else {
      useModalStore.getState().closeModal('install');
    }
  },

  promptInstall: async () => {
    const { deferredPrompt } = get();
    if (!deferredPrompt) return false;

    try {
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      // The beforeinstallprompt event is consumed upon prompt(); always reset deferredPrompt
      if (choice.outcome === 'accepted') {
        set({ isInstalled: true, isInstallable: false, deferredPrompt: null, showInstallModal: false });
        return true;
      } else {
        set({ deferredPrompt: null, isInstallable: false, showInstallModal: false });
      }
    } catch (e) {
      console.warn('PWA prompt failed:', e);
      set({ deferredPrompt: null, isInstallable: false });
    }
    return false;
  },

  applyUpdate: () => {
    const { waitingWorker } = get();
    if (waitingWorker) {
      waitingWorker.postMessage({ type: 'SKIP_WAITING' });
      // Fallback reload if controllerchange event does not fire within 1500ms
      if (typeof window !== 'undefined') {
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    } else if (typeof window !== 'undefined') {
      window.location.reload();
    }
  },

  checkForUpdate: async () => {
    const { registration } = get();
    if (registration && typeof registration.update === 'function') {
      try {
        console.log('[PWA] Checking for updates via registration.update()...');
        await registration.update();
      } catch (e) {
        console.warn('[PWA] Manual check update failed:', e);
      }
    }
  },

  initPwa: () => {
    if (typeof window === 'undefined') return;

    // Check if running as standalone PWA
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      window.matchMedia('(display-mode: fullscreen)').matches ||
      window.matchMedia('(display-mode: minimal-ui)').matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true;

    const isIos =
      /iPad|iPhone|iPod/.test(navigator.userAgent) &&
      !(window as unknown as { MSStream?: unknown }).MSStream;

    set({ isInstalled: isStandalone, isIos });

    // Register Service Worker with safe update flow
    if ('serviceWorker' in navigator) {
      const registerSW = () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then((reg) => {
            console.log('[PWA] Service Worker registered with scope:', reg.scope);
            set({ registration: reg });

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

            // Active Sentinel: check for updates on visibility and focus
            const triggerUpdate = () => {
              if (reg && typeof reg.update === 'function') {
                reg.update().catch((err) => console.warn('[PWA] Background update check failed:', err));
              }
            };

            document.addEventListener('visibilitychange', () => {
              if (document.visibilityState === 'visible') {
                triggerUpdate();
              }
            });

            window.addEventListener('focus', () => {
              triggerUpdate();
            });

            // Periodic check every 30 minutes
            setInterval(triggerUpdate, 30 * 60 * 1000);
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
      };

      if (document.readyState === 'complete') {
        registerSW();
      } else {
        window.addEventListener('load', registerSW);
      }
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
