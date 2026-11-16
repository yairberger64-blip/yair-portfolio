import React from 'react';
import {AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {S1_Establishing, S2_YairWorking, S3_KatelynApproaches, S4a_Pitch, S4b_YairDrifts, S4c_Crush, S4d_Deadpan, S5_PhonePush} from './shots/office';
import {A1_SharoneLaugh, A2_TwoShot, A3_SharoneMaybe, A4_Clink, A5_Window} from './shots/apartment';

export const OPENING_FRAMES = 912; // 38 s @ 24 fps

type ShotDef = {id: string; from: number; to: number; C: React.FC<{f: number}>};

// Edit decision list (global frames). A1 starts early to overlap S5 for the match-dissolve.
export const EDL: ShotDef[] = [
  {id: 'S1', from: 0, to: 132, C: S1_Establishing},
  {id: 'S2', from: 132, to: 252, C: S2_YairWorking},
  {id: 'S3', from: 252, to: 396, C: S3_KatelynApproaches},
  {id: 'S4a', from: 396, to: 462, C: S4a_Pitch},
  {id: 'S4b', from: 462, to: 516, C: S4b_YairDrifts},
  {id: 'S4c', from: 516, to: 540, C: S4c_Crush},
  {id: 'S4d', from: 540, to: 576, C: S4d_Deadpan},
  {id: 'S5', from: 576, to: 636, C: S5_PhonePush},
  {id: 'A1', from: 612, to: 720, C: A1_SharoneLaugh},
  {id: 'A2', from: 720, to: 816, C: A2_TwoShot},
  {id: 'A3', from: 816, to: 838, C: A3_SharoneMaybe},
  {id: 'A4', from: 838, to: 870, C: A4_Clink},
  {id: 'A5', from: 870, to: 912, C: A5_Window},
];

const Shot: React.FC<{def: ShotDef}> = ({def}) => {
  const local = useCurrentFrame();
  const f = local + def.from;
  const opacity = def.id === 'A1' ? interpolate(f, [612, 636], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}) : 1;
  return (
    <AbsoluteFill style={{opacity}}>
      <def.C f={f} />
    </AbsoluteFill>
  );
};

const fade = (f: number, a: number, b: number, c: number, d: number) =>
  interpolate(f, [a, b, c, d], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

const Caption: React.FC<{text: string; sub?: string; a: number; d: number; align?: 'left' | 'right'}> = ({text, sub, a, d, align = 'left'}) => {
  const f = useCurrentFrame();
  const o = fade(f, a, a + 14, d - 14, d);
  const y = interpolate(o, [0, 1], [8, 0]);
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 96,
        [align]: 110,
        opacity: o,
        transform: `translateY(${y}px)`,
        color: '#fff8ee',
        fontFamily: 'Inter, sans-serif',
        textShadow: '0 2px 18px rgba(0,0,0,0.45)',
        textAlign: align,
      }}
    >
      <div style={{fontSize: 46, fontWeight: 600, letterSpacing: 1}}>{text}</div>
      {sub && <div style={{fontSize: 24, fontWeight: 400, letterSpacing: 4, textTransform: 'uppercase', opacity: 0.85, marginTop: 6}}>{sub}</div>}
    </div>
  );
};

const NameTag: React.FC<{name: string; a: number; d: number; x: number; y: number}> = ({name, a, d, x, y}) => {
  const f = useCurrentFrame();
  const o = fade(f, a, a + 10, d - 10, d);
  return (
    <div style={{position: 'absolute', left: x, top: y, opacity: o, display: 'flex', alignItems: 'center', gap: 14, fontFamily: 'Inter, sans-serif'}}>
      <div style={{width: 46 * o, height: 2, background: '#fff3e0'}} />
      <div style={{color: '#fff8ee', fontSize: 34, fontWeight: 600, letterSpacing: 3, textTransform: 'uppercase', textShadow: '0 2px 14px rgba(0,0,0,0.5)'}}>{name}</div>
    </div>
  );
};

export const Opening: React.FC<{withAudio?: boolean}> = ({withAudio = true}) => {
  const f = useCurrentFrame();
  const fadeIn = interpolate(f, [0, 18], [1, 0], {extrapolateRight: 'clamp'});
  const fadeOut = interpolate(f, [884, 911], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{background: '#000'}}>
      {EDL.map((s) => (
        <Sequence key={s.id} from={s.from} durationInFrames={s.to - s.from} name={s.id}>
          <Shot def={s} />
        </Sequence>
      ))}
      {/* vignette */}
      <AbsoluteFill style={{background: 'radial-gradient(ellipse at center, rgba(0,0,0,0) 55%, rgba(0,0,0,0.38) 100%)'}} />
      <Caption text="Jerusalem" sub="2017" a={14} d={118} />
      <NameTag name="Yair" a={150} d={236} x={1180} y={300} />
      <NameTag name="Katelyn" a={300} d={384} x={330} y={250} />
      <NameTag name="Sharone" a={648} d={706} x={1120} y={300} />
      {/* honest slate: this is previs, not final likeness */}
      <div style={{position: 'absolute', top: 34, right: 44, color: 'rgba(255,255,255,0.55)', fontFamily: 'Inter, sans-serif', fontSize: 18, letterSpacing: 2, textTransform: 'uppercase'}}>
        The Right Time · Opening · Previs v002 · Katelyn placeholder
      </div>
      <AbsoluteFill style={{background: '#000', opacity: Math.max(fadeIn, fadeOut)}} />
      {withAudio && <Audio src={staticFile('audio/opening_mix_v001.wav')} />}
    </AbsoluteFill>
  );
};
