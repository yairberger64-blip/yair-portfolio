/**
 * Character appearance specs (previs v002).
 *
 * LIKENESS SOURCES (local only, see references/ — not committed to git)
 * - Yair 2017–2020: Facebook photos dated Jun–Aug 2019 (Philadelphia, Yankee Stadium,
 *   Hickory Run). Medium-length floppy dark-brown hair with a side-swept fringe, slim,
 *   very wide smile, heathered navy tees. Post dates are upload dates, not necessarily capture dates.
 * - Yair present: public/yair.jpg + Apr 2022 photo — shorter hair, side part.
 * - Sharone 2017–2021: photos dated Jan 2019, Mar 2019 (Jerusalem), Nov 2020, Jun 2021.
 *   Long wavy dark-brown hair with caramel ends, warm complexion, brown eyes, wide smile,
 *   small nose stud, drop earrings. Wardrobe ref: pink knit cardigan over a blue top (Jan 2019).
 * - Mia: one recent playground photo — wavy strawberry-blonde hair, brown eyes, rosy cheeks.
 * - Katelyn: STILL A PLACEHOLDER — no reference photos and consent not yet confirmed.
 */
export type HairStyle = 'shortSide' | 'floppy' | 'long' | 'ponytail' | 'bun' | 'shortCurly' | 'toddlerWavy';

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
  hairTip?: string; // lighter colour toward the ends (long hair)
  noseStud?: boolean;
  earrings?: boolean;
  head?: [number, number]; // face width/height multipliers (likeness)
};

export const YAIR_2017: CharSpec = {
  id: 'yair_2017',
  skin: '#ecbd9c',
  hair: '#3d2a1e',
  hairStyle: 'floppy',
  eye: '#4a3020',
  brow: '#33241b',
  shirt: '#44526e', // heathered navy tee (2019 refs)
  sleeves: 'short',
  pants: '#2f3a4a',
  shoes: '#e9e6df',
  lip: '#a5524a',
  scale: 1.04,
  build: 0.98,
  seed: 1,
  placeholder: false,
  head: [0.92, 1.12], // long face, defined chin (refs)
};

export const SHARONE_2017: CharSpec = {
  id: 'sharone_2017',
  skin: '#e4ab86',
  hair: '#33201a',
  hairTip: '#6e4630',
  hairStyle: 'long',
  eye: '#3d2a1c',
  brow: '#2e1e17',
  shirt: '#c98d97', // pink knit cardigan (Jan 2019 ref)
  sleeves: 'long',
  pants: '#3e5a86', // blue jeans
  shoes: '#2e3442',
  lip: '#b4554f',
  scale: 0.94,
  build: 0.9,
  seed: 2,
  placeholder: false,
  noseStud: true,
  earrings: true,
  head: [0.96, 1.06],
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

export const MIA_PRESENT: CharSpec = {
  id: 'mia_present',
  skin: '#f2c9ad',
  hair: '#c98a52', // strawberry blonde
  hairStyle: 'toddlerWavy',
  eye: '#4a3020',
  brow: '#b98250',
  shirt: '#e8705a', // coral floral sweater (ref)
  sleeves: 'long',
  pants: '#7a2852', // plum leggings (ref)
  shoes: '#f2c9ad', // barefoot in ref
  lip: '#c4605a',
  scale: 0.5, // proportions need a dedicated toddler rig before Ch.6
  build: 1.1,
  seed: 7,
  placeholder: false,
};
