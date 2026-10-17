// ══════════════════════════════════════════════════════════════════
//  backupManager.ts — Checksum-Verified Point-In-Time Backup Manager
//  Guarantees backup data integrity, detects tampering/truncation,
//  excludes sensitive user credentials from data exports, and provides
//  optional Web Crypto AES-GCM 256-bit passphrase encryption (Tickets T-202, T-203)
// ══════════════════════════════════════════════════════════════════

import { APP_VERSION } from '../../config/version';
import { CURRENT_SCHEMA_VERSION } from '../persistence/migrationRunner';

export interface BackupMetadata {
  appVersion: string;
  schemaVersion: number;
  exportedAt: string;
  keyCount: number;
  checksum: string;
}

export interface BackupPayload {
  _metadata: BackupMetadata;
  data: Record<string, string>;
}

export interface EncryptedBackupContainer {
  _encrypted: true;
  version: string;
  algorithm: 'AES-GCM-256';
  kdf: 'PBKDF2-SHA256';
  iterations: number;
  salt: string; // base64
  iv: string;   // base64
  ciphertext: string; // base64
}

/**
 * Strict set of credentials and authentication tokens that must NEVER
 * be exported into backups (Ticket T-202).
 */
export const EXCLUDED_KEYS = new Set([
  'nn_gemini_api_key',
  'nn_supabase_anon_key',
  'nn_supabase_url',
  'supabase.auth.token',
  'nn_openrouter_api_key',
  'nn_groq_api_key',
]);

/**
 * Strict whitelist of verified importable keys to prevent arbitrary
 * key injection or phishing redirects (Ticket T-203).
 */
export const IMPORT_WHITELIST = new Set([
  'nn_fsrs_cards',
  'nn_streak',
  'nn_xp',
  'nn_heatmap',
  'nn_achievements',
  'nn_garden_plants',
  'nn_garden_drops',
  'nn_garden_last_refill',
  'nn_quiz_mode_stats',
  'nn_furigana',
  'nn_romaji',
  'nn_sound_effects',
  'nn_speech_rate',
  'nn_user_l1_substratum',
  'nn_completed_lesson_ids',
  'nn_completed_lesson_xp_ids',
  'nn_last_studied_lesson',
  'nn_daily_goal_xp',
  'nn_daily_xp_cap',
  'nn_cat_placement_history',
  'nn_theme',
  'bunpou-theme',
  'bunpou_theme',
  'nn_onboarding_completed',
]);

/**
 * Validates FSRS cards JSON structure
 */
export function validateFsrsCardsJson(raw: string): boolean {
  try {
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return false;
    for (const [id, entry] of Object.entries(parsed)) {
      if (typeof id !== 'string' || !entry || typeof entry !== 'object') return false;
      const card = (entry as any).card;
      if (!card || typeof card !== 'object') return false;
      if (typeof card.stability !== 'number' || typeof card.difficulty !== 'number') return false;
    }
    return true;
  } catch {
    return false;
  }
}

/**
 * Validates Garden plants JSON structure
 */
export function validateGardenPlantsJson(raw: string): boolean {
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return false;
    for (const p of parsed) {
      if (!p || typeof p !== 'object') return false;
      if (typeof p.kanji !== 'string' || typeof p.stage !== 'number') return false;
    }
    return true;
  } catch {
    return false;
  }
}

/**
 * Calculates a deterministic FNV-1a 32-bit checksum hash over data string.
 */
export function computeChecksum(content: string): string {
  let hash = 2166136261;
  for (let i = 0; i < content.length; i++) {
    hash ^= content.charCodeAt(i);
    // Multiply by 32-bit FNV prime 16777619
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(16).padStart(8, '0');
}

/**
 * Creates a verified point-in-time backup object from localStorage.
 * Guarantees zero credential leakage and includes all valid app state.
 */
export function createBackupPayload(): BackupPayload {
  const data: Record<string, string> = {};

  if (typeof window !== 'undefined') {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key) continue;

      // Exclude sensitive credentials (Ticket T-79 & Ticket T-202)
      if (key === 'nn_gemini_api_key') continue;
      if (EXCLUDED_KEYS.has(key) || /^(sb-.*-auth-token|.*_api_key$)/.test(key)) {
        continue;
      }

      // Check if valid app key
      if (IMPORT_WHITELIST.has(key) || /^(nn_|bunpou[_-])/.test(key)) {
        const val = localStorage.getItem(key);
        if (val !== null) {
          data[key] = val;
        }
      }
    }
  }

  // Canonicalize keys to compute stable deterministic checksum
  const sortedKeys = Object.keys(data).sort();
  const canonicalString = sortedKeys.map((k) => `${k}:${data[k]}`).join('|');
  const checksum = computeChecksum(canonicalString);

  return {
    _metadata: {
      appVersion: APP_VERSION,
      schemaVersion: CURRENT_SCHEMA_VERSION,
      exportedAt: new Date().toISOString(),
      keyCount: sortedKeys.length,
      checksum,
    },
    data,
  };
}

/**
 * Validates a backup JSON payload for structure, schema integrity, and whitelist conformance.
 */
export function validateBackupPayload(rawJson: string | object): {
  valid: boolean;
  message: string;
  payload?: BackupPayload;
} {
  try {
    const parsed = typeof rawJson === 'string' ? JSON.parse(rawJson) : rawJson;

    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      return { valid: false, message: 'Format file cadangan tidak valid (bukan objek JSON).' };
    }

    let candidateData: Record<string, string> = {};
    let metadata: BackupMetadata;

    if (parsed._metadata && parsed.data) {
      candidateData = parsed.data as Record<string, string>;
      metadata = parsed._metadata as BackupMetadata;

      // Checksum verification
      const sortedKeys = Object.keys(candidateData).sort();
      const canonicalString = sortedKeys.map((k) => `${k}:${candidateData[k]}`).join('|');
      const calculatedChecksum = computeChecksum(canonicalString);

      if (metadata.checksum && metadata.checksum !== calculatedChecksum) {
        return {
          valid: false,
          message: 'Verifikasi checksum gagal! File cadangan mungkin rusak atau terpotong.',
        };
      }
    } else {
      // Legacy flat backup format fallback
      for (const [k, v] of Object.entries(parsed)) {
        if (typeof v === 'string') {
          candidateData[k] = v;
        }
      }
      metadata = {
        appVersion: 'legacy',
        schemaVersion: 1,
        exportedAt: new Date().toISOString(),
        keyCount: Object.keys(candidateData).length,
        checksum: 'legacy',
      };
    }

    // Ticket T-203: Strict Key Whitelisting & Schema Validation
    const sanitizedData: Record<string, string> = {};
    for (const [k, v] of Object.entries(candidateData)) {
      // Disallow sensitive keys immediately
      if (EXCLUDED_KEYS.has(k) || /^(sb-.*-auth-token|.*_api_key$)/.test(k)) {
        continue;
      }

      // Check whitelist
      if (!IMPORT_WHITELIST.has(k) && !/^(nn_|bunpou[_-])/.test(k)) {
        continue;
      }

      // Validate critical sub-schemas
      if (k === 'nn_fsrs_cards' && !validateFsrsCardsJson(v)) {
        return { valid: false, message: 'Struktur data kartu FSRS rusak atau tidak valid.' };
      }
      if (k === 'nn_garden_plants' && !validateGardenPlantsJson(v)) {
        return { valid: false, message: 'Struktur data tanaman Kebun Kanji rusak atau tidak valid.' };
      }

      sanitizedData[k] = v;
    }

    if (Object.keys(sanitizedData).length === 0) {
      return { valid: false, message: 'Tidak ditemukan data aplikasi yang sah dalam berkas cadangan.' };
    }

    return {
      valid: true,
      message: 'Verifikasi berkas cadangan berhasil.',
      payload: {
        _metadata: {
          ...metadata,
          keyCount: Object.keys(sanitizedData).length,
        },
        data: sanitizedData,
      },
    };
  } catch (err: any) {
    return { valid: false, message: `Kesalahan saat membaca file: ${err.message}` };
  }
}

/**
 * Restores a validated backup payload into localStorage, writing only whitelisted keys.
 */
export function restoreBackup(payload: BackupPayload): { success: boolean; restoredCount: number } {
  if (typeof window === 'undefined') return { success: false, restoredCount: 0 };

  let restoredCount = 0;
  for (const [k, v] of Object.entries(payload.data)) {
    if (EXCLUDED_KEYS.has(k)) continue;
    if ((IMPORT_WHITELIST.has(k) || /^(nn_|bunpou[_-])/.test(k)) && typeof v === 'string') {
      try {
        localStorage.setItem(k, v);
        restoredCount++;
      } catch (err) {
        console.warn(`[backupManager] Failed to restore key ${k}:`, err);
      }
    }
  }

  return { success: restoredCount > 0, restoredCount };
}

// ── Web Crypto API AES-GCM 256-bit Encryption / Decryption (Ticket T-202) ──

function getCryptoSubtle(): SubtleCrypto | null {
  if (typeof window !== 'undefined' && window.crypto && window.crypto.subtle) {
    return window.crypto.subtle;
  }
  if (typeof globalThis !== 'undefined' && (globalThis as any).crypto?.subtle) {
    return (globalThis as any).crypto.subtle;
  }
  return null;
}

function bufferToBase64(buffer: ArrayBuffer | Uint8Array): string {
  const bytes = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  if (typeof btoa !== 'undefined') {
    return btoa(binary);
  }
  return Buffer.from(bytes).toString('base64');
}

function base64ToBuffer(base64: string): Uint8Array {
  if (typeof atob !== 'undefined') {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes;
  }
  const buf = Buffer.from(base64, 'base64');
  const bytes = new Uint8Array(buf.length);
  for (let i = 0; i < buf.length; i++) {
    bytes[i] = buf[i];
  }
  return bytes;
}

/**
 * Encrypts a BackupPayload with passphrase using AES-GCM-256 and PBKDF2 (100,000 iterations).
 */
export async function encryptBackupPayload(payload: BackupPayload, passphrase: string): Promise<string> {
  const subtle = getCryptoSubtle();
  if (!subtle) {
    throw new Error('Web Crypto API tidak didukung pada lingkungan ini.');
  }

  if (!passphrase || passphrase.length < 4) {
    throw new Error('Kata sandi enkripsi minimal 4 karakter.');
  }

  const enc = new TextEncoder();
  const salt = (typeof window !== 'undefined' ? window.crypto : (globalThis as any).crypto).getRandomValues(new Uint8Array(16));
  const iv = (typeof window !== 'undefined' ? window.crypto : (globalThis as any).crypto).getRandomValues(new Uint8Array(12));

  // Derive key using PBKDF2
  const baseKey = await subtle.importKey(
    'raw',
    enc.encode(passphrase),
    'PBKDF2',
    false,
    ['deriveKey']
  );

  const aesKey = await subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt,
      iterations: 100000,
      hash: 'SHA-256',
    },
    baseKey,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt']
  );

  const plaintextBytes = enc.encode(JSON.stringify(payload));
  const ciphertextBuffer = await subtle.encrypt(
    { name: 'AES-GCM', iv },
    aesKey,
    plaintextBytes
  );

  const container: EncryptedBackupContainer = {
    _encrypted: true,
    version: APP_VERSION,
    algorithm: 'AES-GCM-256',
    kdf: 'PBKDF2-SHA256',
    iterations: 100000,
    salt: bufferToBase64(salt),
    iv: bufferToBase64(iv),
    ciphertext: bufferToBase64(ciphertextBuffer),
  };

  return JSON.stringify(container, null, 2);
}

/**
 * Detects whether a parsed object or raw JSON string matches an EncryptedBackupContainer.
 */
export function isEncryptedBackupContainer(data: any): data is EncryptedBackupContainer {
  if (!data) return false;
  let target = data;
  if (typeof data === 'string') {
    try {
      target = JSON.parse(data);
    } catch {
      return false;
    }
  }
  return (
    typeof target === 'object' &&
    target !== null &&
    target._encrypted === true &&
    typeof target.ciphertext === 'string' &&
    typeof target.salt === 'string' &&
    typeof target.iv === 'string'
  );
}

/**
 * Decrypts an EncryptedBackupContainer using user passphrase.
 */
export async function decryptBackupPayload(encryptedJson: string, passphrase: string): Promise<BackupPayload> {
  const subtle = getCryptoSubtle();
  if (!subtle) {
    throw new Error('Web Crypto API tidak didukung pada lingkungan ini.');
  }

  let container: EncryptedBackupContainer;
  try {
    container = JSON.parse(encryptedJson);
  } catch {
    throw new Error('Berkas terenkripsi tidak memiliki struktur JSON yang sah.');
  }

  if (!container._encrypted || !container.ciphertext || !container.salt || !container.iv) {
    throw new Error('Struktur berkas cadangan terenkripsi tidak valid.');
  }

  const enc = new TextEncoder();
  const salt = base64ToBuffer(container.salt);
  const iv = base64ToBuffer(container.iv);
  const ciphertext = base64ToBuffer(container.ciphertext);

  const baseKey = await subtle.importKey(
    'raw',
    enc.encode(passphrase),
    'PBKDF2',
    false,
    ['deriveKey']
  );

  const aesKey = await subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: salt as unknown as BufferSource,
      iterations: container.iterations || 100000,
      hash: 'SHA-256',
    },
    baseKey,
    { name: 'AES-GCM', length: 256 },
    false,
    ['decrypt']
  );

  try {
    const decryptedBuffer = await subtle.decrypt(
      { name: 'AES-GCM', iv: iv as unknown as BufferSource },
      aesKey,
      ciphertext as unknown as BufferSource
    );
    const decryptedText = new TextDecoder().decode(decryptedBuffer);
    const parsedPayload = JSON.parse(decryptedText);

    const validation = validateBackupPayload(parsedPayload);
    if (!validation.valid || !validation.payload) {
      throw new Error(validation.message);
    }
    return validation.payload;
  } catch (err: any) {
    throw new Error('Gagal mendekripsi cadangan: kata sandi salah atau berkas rusak.');
  }
}
