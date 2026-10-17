// ══════════════════════════════════════════════════════════════════
//  localeManager.ts — Manajer Lokalisasi & Bahasa Antarmuka
//  Mendukung bahasa Indonesia (utama) dan Inggris (sekunder)
//  dengan jaminan fallback otomatis dan penanganan variabel
// ══════════════════════════════════════════════════════════════════

import { idDictionary, TranslationKey } from './dictionaries/id';
import { enDictionary } from './dictionaries/en';

export type SupportedLocale = 'id' | 'en';

export const SUPPORTED_LOCALES: { id: SupportedLocale; name: string; flag: string }[] = [
  { id: 'id', name: 'Bahasa Indonesia (Standar)', flag: '🇮🇩' },
  { id: 'en', name: 'English (Secondary)', flag: '🇬🇧' },
];

class LocaleManager {
  private currentLocale: SupportedLocale = 'id';
  private dictionaries: Record<SupportedLocale, Record<string, string>> = {
    id: idDictionary,
    en: enDictionary,
  };

  constructor() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('nn_ui_language') as SupportedLocale;
      if (saved && (saved === 'id' || saved === 'en')) {
        this.currentLocale = saved;
      }
    }
  }

  /**
   * Mengambil locale yang sedang aktif.
   */
  public getLocale(): SupportedLocale {
    return this.currentLocale;
  }

  /**
   * Mengatur bahasa antarmuka aktif dan menyimpannya di localStorage.
   */
  public setLocale(locale: SupportedLocale): void {
    if (locale !== 'id' && locale !== 'en') {
      console.warn(`[localeManager] Unsupported locale: ${locale}. Defaulting to 'id'.`);
      this.currentLocale = 'id';
    } else {
      this.currentLocale = locale;
    }

    if (typeof window !== 'undefined') {
      localStorage.setItem('nn_ui_language', this.currentLocale);
    }
  }

  /**
   * Menerjemahkan kunci string ke bahasa aktif dengan fallback ke Bahasa Indonesia.
   * Mendukung substitusi variabel format {key}.
   */
  public translate(key: TranslationKey | string, params?: Record<string, string | number>, overrideLocale?: SupportedLocale): string {
    const active = overrideLocale || this.currentLocale;
    const dict = this.dictionaries[active] || this.dictionaries.id;

    // Ambil string terjemahan atau fallback ke bahasa Indonesia
    let text = dict[key] || this.dictionaries.id[key] || key;

    // Substitusi parameter jika disediakan
    if (params && typeof params === 'object') {
      for (const [paramKey, value] of Object.entries(params)) {
        text = text.replace(new RegExp(`\\{${paramKey}\\}`, 'g'), String(value));
      }
    }

    return text;
  }

  /**
   * Memeriksa kelengkapan kamus antar bahasa.
   */
  public auditDictionaryParity(): { totalKeys: number; missingInEn: string[] } {
    const idKeys = Object.keys(this.dictionaries.id);
    const missingInEn: string[] = [];

    for (const key of idKeys) {
      if (!this.dictionaries.en[key]) {
        missingInEn.push(key);
      }
    }

    return {
      totalKeys: idKeys.length,
      missingInEn,
    };
  }
}

export const localeManager = new LocaleManager();

/**
 * Helper ringkas global untuk terjemahan (t)
 */
export function t(key: TranslationKey | string, params?: Record<string, string | number>): string {
  return localeManager.translate(key, params);
}
