# Character Bible

**Style:** stylised 3D feature animation. Slightly enlarged heads (×1.3), large expressive eyes with catch-lights, simplified noses, soft rounded forms, and blush to give warmth. In previs, characters are built from primitives (`editing/src/characters/Character.tsx`) and driven by pose and expression parameters: smile, mouthOpen, brow raise/angle, gaze, blink, shrug.

**Likeness status (v002):** Yair, Sharone and Mia are now based on supplied photos. Katelyn is referenced from the June 2019 Philadelphia selfie (Yair confirmed she is the woman in it). Photos are kept locally in `references/` and are **deliberately not committed** to git, since this repository may be public. 

Facebook post dates are upload dates and are not guaranteed to be capture dates.

| Character / age | Reference (local) | Previs spec | Likeness keys | Wardrobe |
|---|---|---|---|---|
| **Yair, 2017–2020** | 4 photos posted Jun–Aug 2019 | skin `#ecbd9c`, hair `#3d2a1e`, long face `[0.92, 1.12]` | medium-length floppy dark-brown hair, fringe swept across the forehead, very wide toothy smile, slim; sometimes black rectangular glasses | heathered navy tee (seen in 2 refs), dark jeans |
| **Yair, present** | `public/yair.jpg`, Apr 2022 photo | TBD rig variant `shortSide` | shorter hair with side part and volume, same smile, slightly fuller face | linen shirt / softshell jacket |
| **Sharone, 2017–2021** | 4 photos posted Jan 2019 – Jun 2021 | skin `#e4ab86`, hair `#33201a` → caramel ends `#6e4630` | long wavy hair, side part swept back (no bangs), oval face, wide bright smile, brown eyes, small nose stud, drop earrings | pink knit cardigan over a blue top (Jan 2019 ref); other refs: blue floral wrap dress, brown cardigan over a striped tee |
| **Sharone, present** | Apr 2022 photo | TBD | hair often pulled back, sunglasses on head | TBD |
| **Katelyn, 2017–2020** | 1 photo posted Jun 2019 | warm fair skin, honey-brown hair | shoulder-length wavy hair, darker roots to honey/dark-blonde lengths, loose middle part, rosy cheeks, light grey-blue eyes, broad warm smile, softly rounded face | mustard sweater (film choice) |
| **Mia, present** | 1 playground photo | skin `#f2c9ad`, hair `#c98a52`, `toddlerWavy` | wavy strawberry-blonde hair, big brown eyes, rosy cheeks, expressive | coral floral sweater, plum leggings (ref). Needs a dedicated toddler rig before Ch.6 |
| Office crush (unnamed) | generic by design | bun, sage top | seen from behind only | — |
| Partners in Ch.2–3 | generic by design | faceless silhouettes | never identifiable | — |

## Acting notes
- **Yair:** focused when working, quick to grin, a little sheepish when caught out.
- **Sharone:** warm, quick to laugh, but sceptical. She makes up her own mind, and the smile has to be earned.
- **Katelyn:** the engine of the story. Restless optimism, big gestures, comic deadpan when thwarted. She is never a nag; she's on their side.
- **Mia:** pure delight and curiosity. She is the centre of Ch.6–7.

## Deliverables pending photos
- Turnaround sheet (front, ¾, profile, back) per character and age
- Expression sheet: neutral, smile, laugh, sceptical, deadpan, startle, love
- Hero still per character for identity-locking in Stage B

Previs lineup render: `characters/previs_lineup_v002.png` (Katelyn, Yair, Sharone).
