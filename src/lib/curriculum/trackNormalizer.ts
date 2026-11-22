// ══════════════════════════════════════════════════════════════════
//  trackNormalizer.ts — Canonical Track ID Normalizer & Alias Mapper
//  Zero-dependency, standalone helper for resolving aliased curriculum tracks
// ══════════════════════════════════════════════════════════════════

export type TrackId =
  | 'n5'
  | 'n4'
  | 'n3'
  | 'n2'
  | 'n1'
  | 'ssw-kaigo'
  | 'ssw-food'
  | 'ssw-food-manufacturing'
  | 'ssw-construction'
  | 'ssw-agriculture'
  | 'ssw-crop-farming'
  | 'ssw-livestock'
  | 'ssw-accommodation'
  | 'ssw-hospitality'
  | 'ssw-building-cleaning'
  | 'ssw-manufacturing'
  | 'ssw-sokeizai'
  | 'ssw-automobile'
  | 'ssw-automobile-transport'
  | 'ssw-aviation'
  | 'ssw-fishery'
  | 'ssw-food-service'
  | 'ssw-restaurant'
  | 'ssw-industrial-machinery'
  | 'ssw-electric-electronic'
  | 'ssw-electrical-electronics'
  | 'ssw-shipbuilding'
  | 'ssw-logistics'
  | 'ssw-railway'
  | 'ssw-forestry'
  | 'ssw-timber'
  | 'ssw-textile'
  | 'jft-a1'
  | 'jft-a2'
  | 'seikatsu'
  | 'book-genki'
  | 'book-minna'
  | 'book-soumatome'
  | 'book-tobira'
  | 'book-quartet'
  | 'book-try'
  | 'book-shin-kanzen-master'
  | 'book-marugoto'
  | 'book-irodori';

export const TRACK_ALIAS_MAP: Record<string, TrackId> = {
  'minna-1': 'book-minna',
  'minna-2': 'book-minna',
  'minna1': 'book-minna',
  'minna2': 'book-minna',
  'genki-1': 'book-genki',
  'genki-2': 'book-genki',
  'ssw-food-mfg': 'ssw-food',
  'ssw-kensetsu': 'ssw-construction',
  'ssw-nougyou': 'ssw-agriculture',
  'ssw-kaigo-care': 'ssw-kaigo',
  'skm-n1': 'book-shin-kanzen-master',
  'skm-n2': 'book-shin-kanzen-master',
  'skm-n3': 'book-shin-kanzen-master',
};

const KNOWN_CANONICAL_TRACK_IDS = new Set<string>([
  'n5',
  'n4',
  'n3',
  'n2',
  'n1',
  'ssw-kaigo',
  'ssw-food',
  'ssw-food-manufacturing',
  'ssw-construction',
  'ssw-agriculture',
  'ssw-crop-farming',
  'ssw-livestock',
  'ssw-accommodation',
  'ssw-hospitality',
  'ssw-building-cleaning',
  'ssw-manufacturing',
  'ssw-sokeizai',
  'ssw-automobile',
  'ssw-automobile-transport',
  'ssw-aviation',
  'ssw-fishery',
  'ssw-food-service',
  'ssw-restaurant',
  'ssw-industrial-machinery',
  'ssw-electric-electronic',
  'ssw-electrical-electronics',
  'ssw-shipbuilding',
  'ssw-logistics',
  'ssw-railway',
  'ssw-forestry',
  'ssw-timber',
  'ssw-textile',
  'jft-a1',
  'jft-a2',
  'seikatsu',
  'book-genki',
  'book-minna',
  'book-soumatome',
  'book-tobira',
  'book-quartet',
  'book-try',
  'book-shin-kanzen-master',
  'book-marugoto',
  'book-irodori',
]);

export function normalizeTrackId(id: string | undefined | null): TrackId {
  if (!id) return 'n5';
  const cleanId = String(id).trim().toLowerCase();
  if (TRACK_ALIAS_MAP[cleanId]) return TRACK_ALIAS_MAP[cleanId];
  if (KNOWN_CANONICAL_TRACK_IDS.has(cleanId)) return cleanId as TrackId;
  return 'n5';
}
