// ══════════════════════════════════════════════════════════════════
//  onomatopoeia.ts — Clinical Pain Onomatopoeia Contract (42 Items)
//  Research Basis: Sakamoto et al. (2014), Doizaki et al. (2015), Okuda (2018)
// ══════════════════════════════════════════════════════════════════

export type PhysiologicalCluster =
  | 'menusuk_tajam'
  | 'panas_terbakar'
  | 'tumpul_berat'
  | 'gatal_menggigit'
  | 'kaku_terkunci'
  | 'pusing_disorientasi'
  | 'sesak_napas';

export type ClinicalEmergencyLevel =
  | 'routine_observation'
  | 'urgent_consultation'
  | 'immediate_119_ambulance';

export interface PainOnomatopoeiaItem {
  id: number;              // 1 s.d. 42
  onomatopoeia: string;    // Misal: 'ズキズキ', 'ガンガン', 'チクチク'
  romaji: string;
  physiological_cluster: PhysiologicalCluster;
  clinical_meaning_id: string;
  emergency_level: ClinicalEmergencyLevel;
  audio_url: string;
  sample_elder_sentence: string;
  action_guideline_id?: string;
}
