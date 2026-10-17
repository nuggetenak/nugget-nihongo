// ══════════════════════════════════════════════════════════════════
//  personaVoices.ts — Multi-Persona Voice Profiles & Acoustic Standards
//  Research Basis: Ticket T-53, Kyutai Pocket TTS & VoiceStudio Specs
// ══════════════════════════════════════════════════════════════════

export type PersonaId =
  | 'gemba_supervisor_m'
  | 'colleague_f'
  | 'elderly_resident_f'
  | 'indonesian_worker_m'
  | 'sensei_nugget_m';

export type PersonaProfileId = PersonaId;

export const ACOUSTIC_STANDARDS = {
  sampleRateHz: 24000,
  targetLufs: -16,
  channelMode: 'mono' as const,
  leadPaddingSec: 0.3,
  tailPaddingSec: 0.3,
};

export interface PersonaVoiceProfile {
  id: PersonaId;
  name: string;
  nameJp: string;
  role: string;
  gender: 'male' | 'female';
  ageRange: string;
  tone: string;
  avatar: string;
  acousticSpecs: {
    sampleRateHz: 24000;
    channels: 1; // Mono
    targetLufs: -16;
    leadPaddingSec: 0.3;
    tailPaddingSec: 0.3;
    pitchScale: number;
    speedScale: number;
  };
  samplePromptSnippet: string;
}

export const CANONICAL_PERSONA_VOICES: Record<PersonaId, PersonaVoiceProfile> = {
  gemba_supervisor_m: {
    id: 'gemba_supervisor_m',
    name: 'Tanaka-san (Mandor/Supervisor)',
    nameJp: '田中さん（現場監督）',
    role: 'Supervisor Pabrik & Konstruksi',
    gender: 'male',
    ageRange: '45-55',
    tone: 'Tegas, profesional, kebapakan, intonasi lugas Kansai/Kanto gemba',
    avatar: '👷‍♂️',
    acousticSpecs: {
      sampleRateHz: 24000,
      channels: 1,
      targetLufs: -16,
      leadPaddingSec: 0.3,
      tailPaddingSec: 0.3,
      pitchScale: 0.92,
      speedScale: 1.05,
    },
    samplePromptSnippet: 'よし、安全第一で作業にかかろう。ヘルメットよし！',
  },
  colleague_f: {
    id: 'colleague_f',
    name: 'Yuki-san (Rekan Kerja Senpai)',
    nameJp: 'ゆきさん（職場の先輩）',
    role: 'Rekan Kerja / Senpai Kantor & Kaigo',
    gender: 'female',
    ageRange: '25-30',
    tone: 'Ramah, bersahabat, suportif, berbicara dalam bahasa sopan santun (Desu/Masu)',
    avatar: '👩‍💼',
    acousticSpecs: {
      sampleRateHz: 24000,
      channels: 1,
      targetLufs: -16,
      leadPaddingSec: 0.3,
      tailPaddingSec: 0.3,
      pitchScale: 1.08,
      speedScale: 0.98,
    },
    samplePromptSnippet: 'わからないことがあったら、いつでも遠慮なく聞いてね。',
  },
  elderly_resident_f: {
    id: 'elderly_resident_f',
    name: 'Sato-san (Lansia Panti Kaigo)',
    nameJp: '佐藤さん（介護施設の利用者様）',
    role: 'Lansia Penerima Layanan Kaigo',
    gender: 'female',
    ageRange: '75-85',
    tone: 'Lemah lembut, hangat, tempo agak perlahan, sedikit sengau natural lansia',
    avatar: '👵',
    acousticSpecs: {
      sampleRateHz: 24000,
      channels: 1,
      targetLufs: -16,
      leadPaddingSec: 0.3,
      tailPaddingSec: 0.3,
      pitchScale: 1.15,
      speedScale: 0.88,
    },
    samplePromptSnippet: 'いつもありがとうねぇ。助かりますよ。',
  },
  indonesian_worker_m: {
    id: 'indonesian_worker_m',
    name: 'Budi (Pekerja Migran Indonesia)',
    nameJp: 'ブディ（特定技能外国人・インドネシア）',
    role: 'Pekerja SSW / Pemagang Tokutei Ginou',
    gender: 'male',
    ageRange: '22-28',
    tone: 'Sopan, antusias, vokal jelas, intonasi pembelajar natural yang lancar',
    avatar: '🧑‍🔧',
    acousticSpecs: {
      sampleRateHz: 24000,
      channels: 1,
      targetLufs: -16,
      leadPaddingSec: 0.3,
      tailPaddingSec: 0.3,
      pitchScale: 1.0,
      speedScale: 1.0,
    },
    samplePromptSnippet: 'はい、承知いたしました！すぐに確認して報告します。',
  },
  sensei_nugget_m: {
    id: 'sensei_nugget_m',
    name: 'Sensei Nugget (Tutor Utama)',
    nameJp: 'ナゲット先生（専属AI講師）',
    role: 'Instruktur Utama & Pelatih Aksen',
    gender: 'male',
    ageRange: '30-40',
    tone: 'Berkarisma, artikulasi mora presisi, sabar, penuh dorongan motivasi',
    avatar: '👨‍🏫',
    acousticSpecs: {
      sampleRateHz: 24000,
      channels: 1,
      targetLufs: -16,
      leadPaddingSec: 0.3,
      tailPaddingSec: 0.3,
      pitchScale: 0.98,
      speedScale: 0.95,
    },
    samplePromptSnippet: '素晴らしい！もう一度ピッチアクセントを意識して発音してみよう！',
  },
};

/**
 * Automatically assigns a canonical persona based on speaker label and context
 */
export function resolveSpeakerPersona(speaker: string, context?: string): PersonaVoiceProfile {
  const s = speaker.toLowerCase();
  const c = (context || '').toLowerCase();

  if (s.includes('tanaka') || s.includes('mandor') || s.includes('boss') || s.includes('supervisor') || s.includes('tenchou') || s.includes('shachou')) {
    return CANONICAL_PERSONA_VOICES.gemba_supervisor_m;
  }
  if (s.includes('yuki') || s.includes('yamada') || s.includes('senpai') || s.includes('rekan') || s.includes('staff')) {
    return CANONICAL_PERSONA_VOICES.colleague_f;
  }
  if (s.includes('sato') || s.includes('obaasan') || s.includes('lansia') || s.includes('pasien') || c.includes('kaigo') && (s.includes('ibu') || s.includes('nenek'))) {
    return CANONICAL_PERSONA_VOICES.elderly_resident_f;
  }
  if (s.includes('budi') || s.includes('rizky') || s.includes('saya') || s.includes('pemagang') || s.includes('murid')) {
    return CANONICAL_PERSONA_VOICES.indonesian_worker_m;
  }
  return CANONICAL_PERSONA_VOICES.sensei_nugget_m;
}
