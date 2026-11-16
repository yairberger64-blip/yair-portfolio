import {Easing, interpolate} from 'remotion';

export type V3 = [number, number, number];
export const ease = Easing.bezier(0.45, 0, 0.55, 1);
export const easeOut = Easing.bezier(0.2, 0.7, 0.3, 1);

/** 0..1 progress between frames a and b, eased and clamped. */
export const seg = (frame: number, a: number, b: number, e = ease) =>
  interpolate(frame, [a, b], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: e,
  });

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const lerp3 = (a: V3, b: V3, t: number): V3 => [
  lerp(a[0], b[0], t),
  lerp(a[1], b[1], t),
  lerp(a[2], b[2], t),
];

/** Keyframed scalar: holds first/last values outside the range. */
export function kf(frame: number, keys: {f: number; v: number}[], e = ease) {
  if (frame <= keys[0].f) return keys[0].v;
  for (let i = 0; i < keys.length - 1; i++) {
    const a = keys[i];
    const b = keys[i + 1];
    if (frame <= b.f) return lerp(a.v, b.v, seg(frame, a.f, b.f, e));
  }
  return keys[keys.length - 1].v;
}

export function kf3(frame: number, keys: {f: number; v: V3}[], e = ease): V3 {
  if (frame <= keys[0].f) return keys[0].v;
  for (let i = 0; i < keys.length - 1; i++) {
    const a = keys[i];
    const b = keys[i + 1];
    if (frame <= b.f) return lerp3(a.v, b.v, seg(frame, a.f, b.f, e));
  }
  return keys[keys.length - 1].v;
}

/** Deterministic pseudo-random in [0,1). */
export const rand = (seed: number) => {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

/** Natural blink: returns 0..1 eyelid closure for a given frame and per-character seed. */
export function blink(frame: number, seed: number) {
  const period = 70 + Math.floor(rand(seed) * 40);
  const offset = Math.floor(rand(seed + 9) * period);
  const p = (frame + offset) % period;
  if (p < 2) return p / 2;
  if (p < 4) return 1 - (p - 2) / 2;
  return 0;
}

/** Subtle breathing/idle sway. */
export const idle = (frame: number, seed: number, amt = 1) =>
  Math.sin(frame / 18 + seed) * 0.012 * amt;
