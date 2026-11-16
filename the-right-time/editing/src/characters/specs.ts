/**
 * Character appearance specs (previs v001).
 *
 * LIKENESS STATUS
 * - Yair (2017): derived from one supplied photo (public/yair.jpg, date unknown):
 *   dark brown short hair with a side part, light warm skin, brown eyes, broad smile.
 * - Sharone, Katelyn: PLACEHOLDER designs. No reference photos supplied yet.
 *   Hair, skin, and wardrobe values below are guesses and must be replaced.
 * - "Coworker" and "Office crush" are generic background characters, intentionally unspecific.
 */
export type HairStyle = 'shortSide' | 'long' | 'ponytail' | 'bun' | 'shortCurly';

export type CharSpec = {
  id: string;
  skin: string;
  hair: string;
  hairStyle: HairStyle;
  eye: string;
  brow: string;
  shirt: string;
  sleeves: 'short' | 'long';
  pants: string;
  shoes: string;
  lip: string;
  scale: number; // overall height multiplier (1 = ~1.75 m)
  build: number; // shoulder/torso width multiplier
  seed: number;
  placeholder: boolean;
};

export const YAIR_2017: CharSpec = {
  id: 'yair_2017',
  skin: '#e8b996',
  hair: '#3b2a20',
  hairStyle: 'shortSide',
  eye: '#4a3020',
  brow: '#33241b',
  shirt: '#5f7d95', // muted blue tee
  sleeves: 'short',
  pants: '#2f3a4a',
  shoes: '#e9e6df',
  lip: '#a5524a',
  scale: 1.03,
  build: 1.06,
  seed: 1,
  placeholder: false,
};

export const SHARONE_2017: CharSpec = {
  id: 'sharone_2017',
  skin: '#e6b48f',
  hair: '#2a1d17',
  hairStyle: 'long',
  eye: '#3d2a1c',
  brow: '#2a1d17',
  shirt: '#efe2cf', // cream knit
  sleeves: 'long',
  pants: '#3b4250',
  shoes: '#c9b8a6',
  lip: '#b4554f',
  scale: 0.95,
  build: 0.92,
  seed: 2,
  placeholder: true,
};

export const KATELYN_2017: CharSpec = {
  id: 'katelyn_2017',
  skin: '#f0c6a8',
  hair: '#8a5a36',
  hairStyle: 'ponytail',
  eye: '#3f5a3a',
  brow: '#6b4429',
  shirt: '#d9a53f', // mustard sweater
  sleeves: 'long',
  pants: '#3a3a44',
  shoes: '#f2efe9',
  lip: '#b85a52',
  scale: 0.96,
  build: 0.93,
  seed: 3,
  placeholder: true,
};

export const OFFICE_CRUSH: CharSpec = {
  id: 'office_crush',
  skin: '#e2b08c',
  hair: '#4a3326',
  hairStyle: 'bun',
  eye: '#3d2a1c',
  brow: '#3a281d',
  shirt: '#8fa88a',
  sleeves: 'long',
  pants: '#e8e1d4',
  shoes: '#6b5a4c',
  lip: '#b4554f',
  scale: 0.95,
  build: 0.92,
  seed: 4,
  placeholder: false,
};

export const COWORKER_A: CharSpec = {
  id: 'coworker_a',
  skin: '#c98e6a',
  hair: '#1f1813',
  hairStyle: 'shortCurly',
  eye: '#2b1d14',
  brow: '#1f1813',
  shirt: '#b5523f',
  sleeves: 'long',
  pants: '#3d3a36',
  shoes: '#2a2a2a',
  lip: '#8f4a40',
  scale: 1.0,
  build: 1.05,
  seed: 5,
  placeholder: false,
};

export const COWORKER_B: CharSpec = {
  id: 'coworker_b',
  skin: '#f1cdb3',
  hair: '#c9a26b',
  hairStyle: 'long',
  eye: '#3a5470',
  brow: '#9c7a4f',
  shirt: '#3e5d6e',
  sleeves: 'long',
  pants: '#2b2f38',
  shoes: '#2a2a2a',
  lip: '#b5605a',
  scale: 0.95,
  build: 0.92,
  seed: 6,
  placeholder: false,
};
