import React, {useMemo} from 'react';
import * as THREE from 'three';
import {mat} from '../characters/Character';
import type {CharSpec} from '../characters/specs';

export const Phone: React.FC<{tex: THREE.Texture | null}> = ({tex}) => (
  <group>
    <mesh castShadow material={mat('#1d1f24', 0.35, {metalness: 0.3})}>
      <boxGeometry args={[0.074, 0.152, 0.009]} />
    </mesh>
    <mesh position={[0, 0, 0.0047]}>
      <planeGeometry args={[0.066, 0.14]} />
      <meshStandardMaterial map={tex} emissiveMap={tex} emissive={'#ffffff'} emissiveIntensity={tex ? 0.9 : 0.2} color={tex ? '#ffffff' : '#20242c'} roughness={0.3} />
    </mesh>
  </group>
);

const glassProfile = () => {
  const pts: THREE.Vector2[] = [];
  pts.push(new THREE.Vector2(0.0, 0));
  pts.push(new THREE.Vector2(0.032, 0.002));
  pts.push(new THREE.Vector2(0.006, 0.008));
  pts.push(new THREE.Vector2(0.005, 0.08));
  pts.push(new THREE.Vector2(0.02, 0.095));
  pts.push(new THREE.Vector2(0.038, 0.13));
  pts.push(new THREE.Vector2(0.036, 0.17));
  pts.push(new THREE.Vector2(0.032, 0.19));
  return pts;
};

const glassMat = new THREE.MeshStandardMaterial({
  color: '#f4f7fb',
  transparent: true,
  opacity: 0.28,
  roughness: 0.05,
  metalness: 0.1,
  side: THREE.DoubleSide,
  depthWrite: false,
});

/** Wine glass, origin at the base. Held glasses are offset so the stem sits in the hand. */
export const WineGlass: React.FC<{level?: number; held?: boolean}> = ({level = 0.5, held = true}) => {
  const geo = useMemo(() => new THREE.LatheGeometry(glassProfile(), 28), []);
  const wineH = 0.012 + level * 0.045;
  return (
    <group position={held ? [0, -0.075, 0] : [0, 0, 0]}>
      <mesh geometry={geo} material={glassMat} />
      <mesh position={[0, 0.1 + wineH / 2, 0]} material={mat('#6e1426', 0.25, {transparent: true, opacity: 0.92})}>
        <cylinderGeometry args={[0.033, 0.024, wineH, 20]} />
      </mesh>
    </group>
  );
};

/** Paint a simple flat-colour portrait of a character onto a canvas (for phone screens / photos). */
export function makePortraitTexture(spec: CharSpec, opts: {bg: string; caption?: string; heart?: boolean}) {
  const w = 360;
  const h = 760;
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const g = c.getContext('2d')!;
  // app chrome
  g.fillStyle = '#fbfaf7';
  g.fillRect(0, 0, w, h);
  g.fillStyle = '#ece8e1';
  g.fillRect(0, 0, w, 70);
  g.fillStyle = '#9a948b';
  g.beginPath();
  g.arc(36, 36, 14, 0, Math.PI * 2);
  g.fill();
  g.fillRect(62, 28, 120, 14);
  // photo card
  const px = 30;
  const py = 110;
  const pw = w - 60;
  const ph = 420;
  const grd = g.createLinearGradient(0, py, 0, py + ph);
  grd.addColorStop(0, opts.bg);
  grd.addColorStop(1, '#f6e7d2');
  g.fillStyle = grd;
  roundRect(g, px, py, pw, ph, 24);
  g.fill();
  g.save();
  roundRect(g, px, py, pw, ph, 24);
  g.clip();
  const cx = w / 2;
  const cy = py + 220;
  // shoulders
  g.fillStyle = spec.shirt;
  g.beginPath();
  g.ellipse(cx, py + ph + 40, 150, 140, 0, 0, Math.PI * 2);
  g.fill();
  // long hair behind
  g.fillStyle = spec.hair;
  if (spec.hairStyle === 'long') {
    roundRect(g, cx - 105, cy - 70, 210, 270, 90);
    g.fill();
  }
  if (spec.hairStyle === 'ponytail') {
    g.beginPath();
    g.ellipse(cx + 92, cy + 40, 30, 80, -0.3, 0, Math.PI * 2);
    g.fill();
  }
  // neck + face
  g.fillStyle = spec.skin;
  g.fillRect(cx - 28, cy + 70, 56, 70);
  g.beginPath();
  g.ellipse(cx, cy, 88, 100, 0, 0, Math.PI * 2);
  g.fill();
  // hair cap
  g.fillStyle = spec.hair;
  g.beginPath();
  g.ellipse(cx, cy - 40, 96, 75, 0, Math.PI, Math.PI * 2);
  g.fill();
  g.beginPath();
  g.ellipse(cx + 15, cy - 62, 80, 34, -0.25, 0, Math.PI * 2);
  g.fill();
  // eyes
  g.fillStyle = '#1b130e';
  for (const s of [-1, 1]) {
    g.beginPath();
    g.ellipse(cx + s * 32, cy + 8, 9, 11, 0, 0, Math.PI * 2);
    g.fill();
  }
  // smile
  g.strokeStyle = spec.lip;
  g.lineWidth = 7;
  g.lineCap = 'round';
  g.beginPath();
  g.arc(cx, cy + 40, 30, 0.15 * Math.PI, 0.85 * Math.PI);
  g.stroke();
  // cheeks
  g.fillStyle = 'rgba(233,143,134,0.35)';
  for (const s of [-1, 1]) {
    g.beginPath();
    g.ellipse(cx + s * 52, cy + 34, 16, 10, 0, 0, Math.PI * 2);
    g.fill();
  }
  g.restore();
  // caption + reactions
  if (opts.caption) {
    g.fillStyle = '#2b2622';
    g.font = '600 34px Inter, sans-serif';
    g.textAlign = 'left';
    g.fillText(opts.caption, px, py + ph + 56);
    g.fillStyle = '#8f877d';
    g.font = '400 22px Inter, sans-serif';
    g.fillText('Jerusalem', px, py + ph + 90);
  }
  if (opts.heart) {
    drawHeart(g, w - 70, py + ph + 40, 26, '#e2475c');
  }
  // bubble
  g.fillStyle = '#e8e3da';
  roundRect(g, px, h - 120, pw * 0.7, 56, 28);
  g.fill();
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

export function roundRect(g: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  g.beginPath();
  g.moveTo(x + r, y);
  g.arcTo(x + w, y, x + w, y + h, r);
  g.arcTo(x + w, y + h, x, y + h, r);
  g.arcTo(x, y + h, x, y, r);
  g.arcTo(x, y, x + w, y, r);
  g.closePath();
}

export function drawHeart(g: CanvasRenderingContext2D, x: number, y: number, s: number, color: string) {
  g.fillStyle = color;
  g.beginPath();
  g.moveTo(x, y + s * 0.35);
  g.bezierCurveTo(x - s, y - s * 0.4, x - s * 0.45, y - s * 1.1, x, y - s * 0.45);
  g.bezierCurveTo(x + s * 0.45, y - s * 1.1, x + s, y - s * 0.4, x, y + s * 0.35);
  g.fill();
}

/** Vertical gradient sky texture. */
export function makeGradientTexture(stops: [number, string][], w = 16, h = 512) {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const g = c.getContext('2d')!;
  const grd = g.createLinearGradient(0, 0, 0, h);
  for (const [o, col] of stops) grd.addColorStop(o, col);
  g.fillStyle = grd;
  g.fillRect(0, 0, w, h);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

export function makeTextTexture(text: string, opts: {w?: number; h?: number; color?: string; bg?: string; font?: string}) {
  const w = opts.w ?? 1024;
  const h = opts.h ?? 256;
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const g = c.getContext('2d')!;
  if (opts.bg) {
    g.fillStyle = opts.bg;
    g.fillRect(0, 0, w, h);
  }
  g.fillStyle = opts.color ?? '#333';
  g.font = opts.font ?? `600 ${Math.round(h * 0.5)}px Inter, sans-serif`;
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  g.fillText(text, w / 2, h / 2);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/** Generic monitor UI texture. */
export function makeScreenTexture(seed: number, accent = '#4f8a8b') {
  const w = 512;
  const h = 300;
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const g = c.getContext('2d')!;
  g.fillStyle = '#f4f6f8';
  g.fillRect(0, 0, w, h);
  g.fillStyle = '#2d3640';
  g.fillRect(0, 0, 90, h);
  g.fillStyle = accent;
  g.fillRect(110, 20, 180, 18);
  for (let i = 0; i < 9; i++) {
    const r = Math.abs(Math.sin(seed * 13 + i * 7.1));
    g.fillStyle = i % 3 === 0 ? '#c9d3dc' : '#dde3e9';
    g.fillRect(110, 56 + i * 24, 140 + r * 240, 12);
  }
  for (let i = 0; i < 6; i++) {
    g.fillStyle = '#5b6773';
    g.fillRect(16, 24 + i * 34, 58, 10);
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}
