import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';

const r = (s: number) => {
  const x = Math.sin(s * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

/** Rain streaks + drops on glass. */
export const Rain: React.FC<{opacity?: number; width?: string}> = ({opacity = 0.55, width = '30%'}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{opacity, pointerEvents: 'none', width, overflow: 'hidden'}}>
      {Array.from({length: 70}).map((_, i) => {
        const x = r(i) * 100;
        const speed = 18 + r(i + 7) * 30;
        const len = 40 + r(i + 3) * 90;
        const y = ((f * speed + r(i + 11) * 1400) % 1400) - 200;
        return <div key={i} style={{position: 'absolute', left: `${x}%`, top: y, width: 1.6, height: len, background: 'linear-gradient(transparent, rgba(220,230,255,0.75))', borderRadius: 2}} />;
      })}
      {Array.from({length: 45}).map((_, i) => {
        const x = r(i + 90) * 100;
        const y0 = r(i + 40) * 100;
        const slide = Math.max(0, ((f + r(i) * 300) % 300) - 220) * 2.5;
        const s = 5 + r(i + 5) * 9;
        return <div key={`d${i}`} style={{position: 'absolute', left: `${x}%`, top: `calc(${y0}% + ${slide}px)`, width: s, height: s * 1.2, borderRadius: '50%', background: 'radial-gradient(circle at 35% 30%, rgba(255,255,255,0.8), rgba(180,200,230,0.15))'}} />;
      })}
    </AbsoluteFill>
  );
};

/** Falling petals. */
export const Petals: React.FC<{count?: number}> = ({count = 40}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      {Array.from({length: count}).map((_, i) => {
        const x = r(i) * 110 - 5 + Math.sin(f / 20 + i) * 2;
        const y = ((f * (1.5 + r(i + 2) * 2) + r(i + 9) * 1300) % 1300) - 100;
        const rot = f * (2 + r(i) * 4) + i * 40;
        const c = ['#f4a6b5', '#fbd3dc', '#e9707f', '#fff0f2'][i % 4];
        return <div key={i} style={{position: 'absolute', left: `${x}%`, top: y, width: 14, height: 9, background: c, borderRadius: '60% 40% 60% 40%', transform: `rotate(${rot}deg)`, opacity: 0.85}} />;
      })}
    </AbsoluteFill>
  );
};

/** A few birds crossing the sky. */
export const Birds: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      {Array.from({length: 7}).map((_, i) => {
        const x = -10 + ((f * (2.2 + r(i) * 1.2) + i * 90) % 2200) / 20;
        const y = 8 + r(i + 4) * 18 + Math.sin(f / 15 + i) * 1.2;
        const flap = Math.sin(f / 2.5 + i * 2) * 0.5 + 0.5;
        return (
          <svg key={i} style={{position: 'absolute', left: `${x}%`, top: `${y}%`}} width="26" height="14" viewBox="0 0 26 14">
            <path d={`M1 ${4 + flap * 6} Q7 ${2 + flap * 2} 13 8 Q19 ${2 + flap * 2} 25 ${4 + flap * 6}`} stroke="#3a2a22" strokeWidth="2" fill="none" opacity="0.7" />
          </svg>
        );
      })}
    </AbsoluteFill>
  );
};

/** Floating light motes / warm haze. */
export const Motes: React.FC<{color?: string}> = ({color = 'rgba(255,230,170,0.7)'}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{pointerEvents: 'none', mixBlendMode: 'screen'}}>
      {Array.from({length: 30}).map((_, i) => {
        const x = r(i) * 100 + Math.sin(f / 40 + i) * 1.5;
        const y = r(i + 3) * 100 - ((f * (0.2 + r(i) * 0.3)) % 100);
        const s = 3 + r(i + 8) * 6;
        const o = 0.3 + 0.5 * (Math.sin(f / 12 + i * 3) * 0.5 + 0.5);
        return <div key={i} style={{position: 'absolute', left: `${x}%`, top: `${(y + 100) % 100}%`, width: s, height: s, borderRadius: '50%', background: color, opacity: o, filter: 'blur(1px)'}} />;
      })}
    </AbsoluteFill>
  );
};

/** Gentle flicker/breathing of warm light (string lights, lamps). */
export const Glow: React.FC = () => {
  const f = useCurrentFrame();
  const o = 0.06 + 0.04 * Math.sin(f / 9) + 0.02 * Math.sin(f / 3.7);
  return <AbsoluteFill style={{background: 'radial-gradient(ellipse at 50% 20%, rgba(255,200,120,1), transparent 60%)', opacity: o, mixBlendMode: 'screen', pointerEvents: 'none'}} />;
};
