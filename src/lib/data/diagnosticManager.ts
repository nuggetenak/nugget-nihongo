// ══════════════════════════════════════════════════════════════════
//  diagnosticManager.ts — High-Performance Diagnostic Data Bridge
//  Loads and indexes 300 Empirical Diagnostic Items (Corpus v30 / Jalur C + G)
//  - 150 L1 Indonesian Morphosyntactic Contrastive Interference Pairs
//  - 150 Phonological & High-Variability Minimal Pairs (Tokyo Pitch Accent, Chōon, Sokuon, K3)
// ══════════════════════════════════════════════════════════════════

import { JLPTLevel } from '../../types/vocab';

export interface DiagnosticPair {
  id: string;
  patterns: string[];
  note_id: string;
  level: JLPTLevel;
  provenance: string;
  archetype: 'contrastive_pair_slot' | 'audio_speed_gate';
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
 */
export async function loadDiagnosticPairs(): Promise<DiagnosticPair[]> {
  if (cachedPairs) return cachedPairs;
  if (loadPromise) return loadPromise;

  loadPromise = (async () => {
    if (typeof window !== 'undefined' && window.confusionPairs && window.confusionPairs.length > 0) {
      cachedPairs = window.confusionPairs;
      return cachedPairs;
    }

    try {
      if (typeof window !== 'undefined') {
        await loadScript('/data/confusion-pairs.js');
        if (window.confusionPairs && window.confusionPairs.length > 0) {
          cachedPairs = window.confusionPairs;
          return cachedPairs;
        }
      }

      // Fallback: fetch JSON directly
      const res = await fetch('/data/diagnostic/diagnostic-inventory.json');
      if (res.ok) {
        const data = await res.json();
        cachedPairs = data.items || [];
        return cachedPairs!;
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
 * Filter diagnostic items by JLPT level
 */
export async function getDiagnosticPairsByLevel(level: JLPTLevel): Promise<DiagnosticPair[]> {
  const all = await loadDiagnosticPairs();
  return all.filter((p) => p.level === level);
}

/**
 * Filter diagnostic items by Archetype ('contrastive_pair_slot' | 'audio_speed_gate')
 */
export async function getDiagnosticPairsByArchetype(
  archetype: 'contrastive_pair_slot' | 'audio_speed_gate'
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
 * Get a random diagnostic pair with optional filtering
 */
export async function getRandomDiagnosticPair(filter?: {
  level?: JLPTLevel;
  archetype?: 'contrastive_pair_slot' | 'audio_speed_gate';
}): Promise<DiagnosticPair | null> {
  let pool = await loadDiagnosticPairs();
  if (filter?.level) {
    pool = pool.filter((p) => p.level === filter.level);
  }
  if (filter?.archetype) {
    pool = pool.filter((p) => p.archetype === filter.archetype);
  }
  if (pool.length === 0) return null;
  return pool[Math.floor(Math.random() * pool.length)];
}
