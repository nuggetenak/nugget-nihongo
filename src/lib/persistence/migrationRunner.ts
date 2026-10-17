// ══════════════════════════════════════════════════════════════════
//  migrationRunner.ts — Schema Migration Runner & Versioned State Upgrader
//  Safely upgrades local storage and IndexedDB structures across app releases
// ══════════════════════════════════════════════════════════════════

import { FSRSCard } from '../../types/fsrs';

export const CURRENT_SCHEMA_VERSION = 3;
export const SCHEMA_VERSION_KEY = 'nn_schema_version';

export interface MigrationStep {
  version: number;
  description: string;
  up: () => Promise<void> | void;
}

const MIGRATIONS: MigrationStep[] = [
  // ── Version 1: Legacy Key Normalization ─────────────────────────
  {
    version: 1,
    description: 'Migrate legacy bunpou_cards and legacy progress keys to canonical nn_ namespaces',
    up: () => {
      if (typeof window === 'undefined') return;
      try {
        const legacyCards = localStorage.getItem('bunpou_cards');
        if (legacyCards && !localStorage.getItem('nn_fsrs_cards')) {
          localStorage.setItem('nn_fsrs_cards', legacyCards);
          localStorage.removeItem('bunpou_cards');
        }

        const legacyStreak = localStorage.getItem('bunpou_streak');
        if (legacyStreak && !localStorage.getItem('nn_streak')) {
          localStorage.setItem('nn_streak', legacyStreak);
          localStorage.removeItem('bunpou_streak');
        }
      } catch (err) {
        console.warn('[migrationRunner] Migration v1 warning:', err);
      }
    },
  },

  // ── Version 2: FSRS Card Schema Field Normalization ─────────────
  {
    version: 2,
    description: 'Ensure all FSRS cards contain valid numeric stability and lapse fields',
    up: () => {
      if (typeof window === 'undefined') return;
      try {
        const raw = localStorage.getItem('nn_fsrs_cards');
        if (!raw) return;

        const cards: Record<string, { card: Partial<FSRSCard>; source?: string }> = JSON.parse(raw);
        let modified = false;

        for (const [id, entry] of Object.entries(cards)) {
          if (entry && entry.card) {
            const c = entry.card;
            if (typeof c.stability !== 'number') {
              c.stability = 0;
              modified = true;
            }
            if (typeof c.difficulty !== 'number') {
              c.difficulty = 0;
              modified = true;
            }
            if (typeof c.reps !== 'number') {
              c.reps = 0;
              modified = true;
            }
            if (typeof c.lapses !== 'number') {
              c.lapses = 0;
              modified = true;
            }
            if (!c.due) {
              c.due = new Date().toISOString();
              modified = true;
            }
          }
        }

        if (modified) {
          localStorage.setItem('nn_fsrs_cards', JSON.stringify(cards));
        }
      } catch (err) {
        console.warn('[migrationRunner] Migration v2 warning:', err);
      }
    },
  },

  // ── Version 3: UI Settings & Substratum Alignment ───────────────
  {
    version: 3,
    description: 'Align UI language default and regional dialect substratum setting',
    up: () => {
      if (typeof window === 'undefined') return;
      try {
        if (!localStorage.getItem('nn_ui_language')) {
          localStorage.setItem('nn_ui_language', 'id');
        }
        if (!localStorage.getItem('nn_user_l1_substratum')) {
          localStorage.setItem('nn_user_l1_substratum', 'general_indonesian');
        }
      } catch (err) {
        console.warn('[migrationRunner] Migration v3 warning:', err);
      }
    },
  },
];

class MigrationRunner {
  /**
   * Retrieves the current stored schema version.
   */
  public getStoredVersion(): number {
    if (typeof window === 'undefined') return CURRENT_SCHEMA_VERSION;
    try {
      const raw = localStorage.getItem(SCHEMA_VERSION_KEY);
      return raw ? parseInt(raw, 10) || 0 : 0;
    } catch {
      return 0;
    }
  }

  /**
   * Executes pending migrations sequentially.
   */
  public async runMigrations(): Promise<{ currentVersion: number; appliedMigrations: number }> {
    const fromVersion = this.getStoredVersion();
    let appliedCount = 0;

    for (const step of MIGRATIONS) {
      if (step.version > fromVersion) {
        console.info(`[migrationRunner] Running migration v${step.version}: ${step.description}`);
        try {
          await step.up();
          this.setStoredVersion(step.version);
          appliedCount++;
        } catch (err) {
          console.error(`[migrationRunner] Migration v${step.version} failed:`, err);
          break; // Stop to prevent schema inconsistency
        }
      }
    }

    this.setStoredVersion(CURRENT_SCHEMA_VERSION);
    return {
      currentVersion: CURRENT_SCHEMA_VERSION,
      appliedMigrations: appliedCount,
    };
  }

  private setStoredVersion(version: number): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(SCHEMA_VERSION_KEY, String(version));
    } catch {}
  }
}

export const migrationRunner = new MigrationRunner();
