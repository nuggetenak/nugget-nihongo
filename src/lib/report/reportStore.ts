// ══════════════════════════════════════════════════════════════════
//  reportStore.ts — In-App Content Mistake & Unnatural Japanese Reporting
//  Saves to Supabase `content_reports` + Offline LocalStorage Fallback Queue
// ══════════════════════════════════════════════════════════════════

import { create } from 'zustand';
import { supabase } from '../supabase/client';

export type ReportCategory =
  | 'unnatural_japanese'
  | 'wrong_translation'
  | 'typo'
  | 'wrong_answer'
  | 'audio_issue'
  | 'other';

export interface ContentReport {
  id: string;
  itemId: string;
  itemType: 'vocab' | 'grammar' | 'quiz_question' | 'sentence' | 'other';
  originalJapanese: string;
  originalTranslation?: string;
  category: ReportCategory;
  description: string;
  suggestedCorrection?: string;
  status: 'pending' | 'synced';
  createdAt: string;
}

interface ReportState {
  reports: ContentReport[];
  isSubmitting: boolean;
  submitReport: (payload: {
    itemId: string;
    itemType: ContentReport['itemType'];
    originalJapanese: string;
    originalTranslation?: string;
    category: ReportCategory;
    description: string;
    suggestedCorrection?: string;
  }) => Promise<{ success: boolean; synced: boolean; message: string }>;
  syncPendingReports: () => Promise<number>;
  clearLocalReports: () => void;
}

const STORAGE_KEY = 'nn_content_reports';

function loadReportsFromStorage(): ContentReport[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.warn('[reportStore] Failed to load local reports:', err);
    return [];
  }
}

function saveReportsToStorage(reports: ContentReport[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
  } catch (err) {
    console.warn('[reportStore] Failed to save local reports:', err);
  }
}

export const useReportStore = create<ReportState>((set, get) => ({
  reports: loadReportsFromStorage(),
  isSubmitting: false,

  submitReport: async (payload) => {
    set({ isSubmitting: true });

    const newReport: ContentReport = {
      id: `rep_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      ...payload,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    let synced = false;

    // Try sending to Supabase if client is ready
    if (supabase) {
      try {
        const { error } = await supabase.from('content_reports').insert([
          {
            report_id: newReport.id,
            item_id: newReport.itemId,
            item_type: newReport.itemType,
            japanese_text: newReport.originalJapanese,
            translation_text: newReport.originalTranslation || null,
            category: newReport.category,
            description: newReport.description,
            suggested_correction: newReport.suggestedCorrection || null,
            created_at: newReport.createdAt,
          },
        ]);

        if (!error) {
          synced = true;
          newReport.status = 'synced';
        } else {
          console.info('[reportStore] Supabase insert note (queued locally):', error.message);
        }
      } catch (err) {
        console.info('[reportStore] Supabase offline/unreachable, saving locally:', err);
      }
    }

    // Always persist to local queue
    const updated = [newReport, ...get().reports];
    saveReportsToStorage(updated);
    set({ reports: updated, isSubmitting: false });

    return {
      success: true,
      synced,
      message: synced
        ? 'Laporan berhasil dikirim ke server cloud! Terima kasih atas kontribusimu 🙏'
        : 'Laporan tersimpan di memori lokal & akan otomatis disinkronkan saat online. Terima kasih! 🍙',
    };
  },

  syncPendingReports: async () => {
    if (!supabase) return 0;
    const current = get().reports;
    const pending = current.filter((r) => r.status === 'pending');
    if (pending.length === 0) return 0;

    let syncedCount = 0;
    const updatedReports = [...current];

    for (const report of pending) {
      try {
        const { error } = await supabase.from('content_reports').insert([
          {
            report_id: report.id,
            item_id: report.itemId,
            item_type: report.itemType,
            japanese_text: report.originalJapanese,
            translation_text: report.originalTranslation || null,
            category: report.category,
            description: report.description,
            suggested_correction: report.suggestedCorrection || null,
            created_at: report.createdAt,
          },
        ]);

        if (!error) {
          const idx = updatedReports.findIndex((r) => r.id === report.id);
          if (idx !== -1) {
            updatedReports[idx].status = 'synced';
            syncedCount++;
          }
        }
      } catch {
        break; // stop on network error
      }
    }

    if (syncedCount > 0) {
      saveReportsToStorage(updatedReports);
      set({ reports: updatedReports });
    }

    return syncedCount;
  },

  clearLocalReports: () => {
    localStorage.removeItem(STORAGE_KEY);
    set({ reports: [] });
  },
}));
