// ══════════════════════════════════════════════════════════════════
//  OfflineStatusPill.tsx — Real-Time Connectivity Indicator
//  Shows '⚡ Offline' pill and automatically resyncs when back online
// ══════════════════════════════════════════════════════════════════

import React, { useState, useEffect } from 'react';
import { WifiOff, Zap } from 'lucide-react';
import { useAuthStore } from '../../lib/supabase/authStore';
import { useAppStore } from '../../store/useAppStore';

export const OfflineStatusPill: React.FC = () => {
  const [isOnline, setIsOnline] = useState<boolean>(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );
  const { syncNow, user } = useAuthStore();
  const { showToast } = useAppStore();

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      showToast('Koneksi internet kembali! Mode online aktif.', '⚡');
      if (user) {
        syncNow();
      }
    };

    const handleOffline = () => {
      setIsOnline(false);
      showToast('Sedang offline. Semua fitur tetap berfungsi 100%!', '📱');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [syncNow, user, showToast]);

  if (isOnline) return null;

  return (
    <div
      title="Aplikasi berjalan dalam mode offline lokal"
      className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/35 text-amber-300 text-[11px] font-bold animate-pulse shadow-sm"
    >
      <WifiOff className="w-3 h-3 text-amber-400" />
      <span>Mode Offline</span>
    </div>
  );
};
