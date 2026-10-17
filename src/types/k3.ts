// ══════════════════════════════════════════════════════════════════
//  k3.ts — Vocational SSW & Gemba K3 Disaster Simulation Contract
//  Research Basis: JNIOSH (2020), ADR-009, SBAR Clinical & Gemba Protocol
// ══════════════════════════════════════════════════════════════════

export interface K3HazardHotspot {
  x_percent: number;
  y_percent: number;
  is_hazard: boolean;
  feedback_text: string;
}

export interface K3PointAndCallGate {
  target_object_name: string;
  confirmation_callout: string; // Misal: 'Bureeki, Yoshi!'
  touch_duration_ms: number;    // Target 2000ms
}

export interface K3SbarReportingFlow {
  situation_prompt: string;
  background_prompt: string;
  assessment_prompt: string;
  recommendation_prompt: string;
  expected_response_rubric: string[];
}

export interface K3DisasterScenario {
  scenario_id: string;     // Misal: 'K3-01' s.d. 'K3-36'
  sector_code: string;     // Misal: 'SSW-MFG-01', 'SSW-KAIGO-01', dst.
  macro_cluster: 'manufacturing' | 'hospitality_food' | 'agriculture_maritime' | 'infrastructure_logistics';
  hazard_type: string;     // Misal: 'Jari Terjepit Mesin Press'
  ambient_noise_level: 'low' | 'medium' | 'high_industrial';
  
  initial_kyk_assessment: {
    situation_image_url: string;
    hazard_hotspots: K3HazardHotspot[];
  };

  point_and_call_gate: K3PointAndCallGate;

  sbar_reporting_flow: K3SbarReportingFlow;

  rousai_escalation_tier: 1 | 2 | 3 | 4;
}
