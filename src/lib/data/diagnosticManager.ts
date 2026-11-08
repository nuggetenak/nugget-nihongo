// ══════════════════════════════════════════════════════════════════
//  diagnosticManager.ts — High-Performance Diagnostic Data Bridge
//  Loads and indexes 300 Empirical Diagnostic Items (Corpus v30 / Jalur C + G)
//  - 150 L1 Indonesian Morphosyntactic Contrastive Interference Pairs
//  - 150 Phonological & High-Variability Minimal Pairs (Tokyo Pitch Accent, Chōon, Sokuon, K3)
//  - 42 Clinical Pain Onomatopoeia Items & Regional Substratum Dialect Diagnostics
// ══════════════════════════════════════════════════════════════════

import type { JLPTLevel } from '../../types/vocab.ts';
import { CANONICAL_PAIN_ONOMATOPOEIA } from './painOnomatopoeiaManager.ts';
import type { PainOnomatopoeiaItem, PhysiologicalCluster, ClinicalEmergencyLevel } from '../../types/onomatopoeia.ts';

export type L1Substratum = 'sundanese' | 'javanese' | 'batak_eastern' | 'general_indonesian';
export type PitchAccentType = 'heiban' | 'atamadaka' | 'nakadaka' | 'odaka';

export interface DiagnosticPair {
  id: string;
  patterns: string[];
  note_id: string;
  level: JLPTLevel;
  provenance: string;
  archetype: 'contrastive_pair_slot' | 'audio_speed_gate' | 'pitch_accent_contrast';
  domain: string;
  category: string;
  title: string;
  stimulus_l1: string;
  target_form: string;
  l1_trap_form: string;
  root_cause: string;
  prescription: string;
  fsrs_difficulty: number;
  fossilization_risk: 'HIGH' | 'CRITICAL' | 'CRITICAL_SAFETY';
  accent_pattern?: string;
  particle_pitch?: string;
  l1_substratum?: L1Substratum;
  pitch_accent_type?: PitchAccentType;
}

declare global {
  interface Window {
    confusionPairs?: DiagnosticPair[];
  }
}

let cachedPairs: DiagnosticPair[] | null = null;
let loadPromise: Promise<DiagnosticPair[]> | null = null;

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.head.appendChild(script);
  });
}

/**
 * Load all 300 diagnostic pairs from public/data/confusion-pairs.js
 * Supports both browser window runtime and Node.js testing/SSR runtime
 */
export async function loadDiagnosticPairs(): Promise<DiagnosticPair[]> {
  if (cachedPairs) return cachedPairs;
  if (loadPromise) return loadPromise;

  loadPromise = (async (): Promise<DiagnosticPair[]> => {
    // 1. Browser runtime check
    if (typeof window !== 'undefined' && window.confusionPairs && window.confusionPairs.length > 0) {
      cachedPairs = window.confusionPairs;
      return cachedPairs;
    }

    // 2. Node.js testing/SSR environment: direct filesystem read
    if (typeof window === 'undefined') {
      try {
        const fsMod = await import('fs');
        const pathMod = await import('path');
        const candidatePaths = [
          pathMod.resolve(process.cwd(), 'public/data/confusion-pairs.js'),
          pathMod.resolve(process.cwd(), 'nugget-nihongo/public/data/confusion-pairs.js'),
          pathMod.resolve(process.cwd(), '../public/data/confusion-pairs.js'),
        ];
        for (const cp of candidatePaths) {
          if (fsMod.existsSync(cp)) {
            const vmMod = await import('vm');
            const fileContent = fsMod.readFileSync(cp, 'utf8');
            const sandbox: any = {};
            vmMod.runInNewContext(fileContent, sandbox);
            if (Array.isArray(sandbox.confusionPairs) && sandbox.confusionPairs.length > 0) {
              const loaded: DiagnosticPair[] = sandbox.confusionPairs;
              cachedPairs = loaded;
              return loaded;
            }
          }
        }
      } catch (err) {
        // Fall through to HTTP fetch
      }
    }

    try {
      if (typeof window !== 'undefined') {
        await loadScript('/data/confusion-pairs.js');
        if (window.confusionPairs && window.confusionPairs.length > 0) {
          const loaded: DiagnosticPair[] = window.confusionPairs;
          cachedPairs = loaded;
          return loaded;
        }
      }

      // Fallback: fetch JSON directly if available
      const res = await fetch('/data/diagnostic/diagnostic-inventory.json');
      if (res.ok) {
        const data = await res.json();
        const loaded: DiagnosticPair[] = data.items || [];
        cachedPairs = loaded;
        return loaded;
      }
    } catch (err) {
      console.warn('[diagnosticManager] Could not load diagnostic pairs, fallback to empty array', err);
    }

    cachedPairs = [];
    return cachedPairs;
  })();

  return loadPromise;
}

/**
 * Filter diagnostic items by JLPT level (case-insensitive)
 */
export async function getDiagnosticPairsByLevel(level: JLPTLevel | string): Promise<DiagnosticPair[]> {
  const all = await loadDiagnosticPairs();
  const target = level.toLowerCase();
  return all.filter((p) => p.level.toLowerCase() === target);
}

/**
 * Filter diagnostic items by Archetype ('contrastive_pair_slot' | 'audio_speed_gate' | 'pitch_accent_contrast')
 */
export async function getDiagnosticPairsByArchetype(
  archetype: 'contrastive_pair_slot' | 'audio_speed_gate' | 'pitch_accent_contrast'
): Promise<DiagnosticPair[]> {
  const all = await loadDiagnosticPairs();
  return all.filter((p) => p.archetype === archetype);
}

/**
 * Filter diagnostic items by Domain
 */
export async function getDiagnosticPairsByDomain(domainKeyword: string): Promise<DiagnosticPair[]> {
  const all = await loadDiagnosticPairs();
  const kw = domainKeyword.toLowerCase();
  return all.filter((p) => p.domain.toLowerCase().includes(kw));
}

/**
 * Filter diagnostic items by L1 Substratum (sundanese, javanese, batak_eastern, general_indonesian)
 */
export async function getDiagnosticPairsBySubstratum(
  substratum: L1Substratum
): Promise<DiagnosticPair[]> {
  const all = await loadDiagnosticPairs();
  return all.filter((p) => p.l1_substratum === substratum);
}

/**
 * Filter diagnostic items by Tokyo Pitch Accent type or presence
 */
export async function getDiagnosticPairsByPitchAccent(
  pitchType?: PitchAccentType
): Promise<DiagnosticPair[]> {
  const all = await loadDiagnosticPairs();
  if (pitchType) {
    return all.filter((p) => p.pitch_accent_type === pitchType);
  }
  return all.filter((p) => p.archetype === 'pitch_accent_contrast' || p.pitch_accent_type !== undefined);
}

/**
 * Get a random diagnostic pair with optional filtering
 */
export async function getRandomDiagnosticPair(filter?: {
  level?: JLPTLevel | string;
  archetype?: 'contrastive_pair_slot' | 'audio_speed_gate' | 'pitch_accent_contrast';
  substratum?: L1Substratum;
  pitchType?: PitchAccentType;
}): Promise<DiagnosticPair | null> {
  let pool = await loadDiagnosticPairs();
  if (filter?.level) {
    const target = filter.level.toLowerCase();
    pool = pool.filter((p) => p.level.toLowerCase() === target);
  }
  if (filter?.archetype) {
    pool = pool.filter((p) => p.archetype === filter.archetype);
  }
  if (filter?.substratum) {
    pool = pool.filter((p) => p.l1_substratum === filter.substratum);
  }
  if (filter?.pitchType) {
    pool = pool.filter((p) => p.pitch_accent_type === filter.pitchType);
  }
  if (pool.length === 0) return null;
  return pool[Math.floor(Math.random() * pool.length)];
}

// ══════════════════════════════════════════════════════════════════
//  Regional Substratum & Onomatopoeia Diagnostics
// ══════════════════════════════════════════════════════════════════

export async function getDialectInterferenceReport(substratum: L1Substratum): Promise<{
  substratum: L1Substratum;
  totalItems: number;
  criticalSafetyItems: number;
  domains: Record<string, number>;
  topTraps: string[];
}> {
  const all = await loadDiagnosticPairs();
  const subset = all.filter((p) => p.l1_substratum === substratum);
  const domains: Record<string, number> = {};
  let criticalSafetyItems = 0;
  const topTraps: string[] = [];

  subset.forEach((p) => {
    domains[p.domain] = (domains[p.domain] || 0) + 1;
    if (p.fossilization_risk === 'CRITICAL' || p.fossilization_risk === 'CRITICAL_SAFETY') {
      criticalSafetyItems++;
    }
    if (topTraps.length < 5) {
      topTraps.push(`${p.title} (Jebakan: ${p.l1_trap_form})`);
    }
  });

  return {
    substratum,
    totalItems: subset.length,
    criticalSafetyItems,
    domains,
    topTraps,
  };
}

export function getOnomatopoeiaByPhysiologicalCluster(cluster: PhysiologicalCluster): PainOnomatopoeiaItem[] {
  return CANONICAL_PAIN_ONOMATOPOEIA.filter((o) => o.physiological_cluster === cluster);
}

export function getOnomatopoeiaByEmergencyLevel(level: ClinicalEmergencyLevel): PainOnomatopoeiaItem[] {
  return CANONICAL_PAIN_ONOMATOPOEIA.filter((o) => o.emergency_level === level);
}

export function searchOnomatopoeia(keyword: string): PainOnomatopoeiaItem[] {
  if (!keyword || typeof keyword !== 'string') return [...CANONICAL_PAIN_ONOMATOPOEIA];
  const q = keyword.toLowerCase().trim();
  return CANONICAL_PAIN_ONOMATOPOEIA.filter(
    (o) =>
      o.onomatopoeia.toLowerCase().includes(q) ||
      o.romaji.toLowerCase().includes(q) ||
      o.clinical_meaning_id.toLowerCase().includes(q) ||
      o.sample_elder_sentence.toLowerCase().includes(q) ||
      (o.action_guideline_id && o.action_guideline_id.toLowerCase().includes(q))
  );
}
