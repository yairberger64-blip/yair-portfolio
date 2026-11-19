import React from 'react';
import {AbsoluteFill, Audio, Img, OffthreadVideo, Sequence, interpolate, staticFile, useCurrentFrame, Easing} from 'remotion';
import {Birds, Glow, Motes, Petals, Rain} from './fx';

/**
 * THE RIGHT TIME — storybook cut. Stills generated in Gemini from the locked hero portraits,
 * animated with slow camera moves and dissolves. Frames live in public/frames/fNN.jpg (local only).
 */
const FPS = 24;
const XF = 24; // 1 s crossfade

type Beat = {n: number; sec: number; caption?: string; sub?: string; move: 'in' | 'out' | 'left' | 'right' | 'up'; split?: string; fx?: ('rain' | 'petals' | 'birds' | 'motes' | 'glow')[]; clip?: string; clipSec?: number; clip2?: string};
export const BEATS: Beat[] = [
  {n: 1, sec: 8, caption: 'Jerusalem', sub: '2017', move: 'in', fx: ['motes'], clip: 'c01.mp4', clipSec: 5.0},
  {n: 2, sec: 9, move: 'right', clip: 'c02.mp4', clipSec: 5.0},
  {n: 3, sec: 8, move: 'in', clip: 'c03.mp4', clipSec: 5.0},
  {n: 4, sec: 10, move: 'left', fx: ['glow'], clip: 'c04.mp4', clipSec: 5.0},
  {n: 5, sec: 8, move: 'right', fx: ['motes'], clip: 'c05.mp4', clipSec: 2.2},
  {n: 6, sec: 7, move: 'in', split: 'f06b', clip: 'c06.mp4', clipSec: 5.0, clip2: 'c06b.mp4'}, // split-screen: Yair's university | Sharone's OT studies
  {n: 7, sec: 8, move: 'in', fx: ['rain'], clip: 'c07.mp4', clipSec: 5.4},
  {n: 8, sec: 8, move: 'in', clip: 'c08.mp4', clipSec: 5.0},
  {n: 9, sec: 7, caption: '2020', move: 'right', clip: 'c09.mp4', clipSec: 5.0},
  {n: 10, sec: 10, caption: 'Finally', move: 'in', clip: 'c10.mp4', clipSec: 5.0},
  {n: 11, sec: 9, move: 'left', clip: 'c11.mp4', clipSec: 3.6},
  {n: 12, sec: 10, caption: 'July 2021', move: 'in', fx: ['glow'], clip: 'c12.mp4', clipSec: 5.0},
  {n: 13, sec: 9, move: 'up', fx: ['petals'], clip: 'c13.mp4', clipSec: 5.0},
  {n: 14, sec: 10, move: 'out', clip: 'c14.mp4', clipSec: 5.0},
  {n: 15, sec: 8, move: 'right', clip: 'c15.mp4', clipSec: 5.0},
  {n: 16, sec: 9, move: 'in', fx: ['motes'], clip: 'c16.mp4', clipSec: 5.0},
];
const TITLE_SEC = 9;

export const starts = (() => {
  const s: number[] = [];
  let t = 0;
  for (const b of BEATS) {
    s.push(t);
    t += b.sec * FPS - XF;
  }
  return {s, end: t + XF};
})();
export const STORYBOOK_FRAMES = starts.end + TITLE_SEC * FPS;

const Still: React.FC<{b: Beat; dur: number}> = ({b, dur}) => {
  const f = useCurrentFrame();
  const t = interpolate(f, [0, dur], [0, 1], {easing: Easing.inOut(Easing.sin)});
  const op = interpolate(f, [0, XF, dur - XF, dur], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  let scale = 1.06 + 0.08 * t;
  let x = 0;
  let y = 0;
  if (b.move === 'out') scale = 1.16 - 0.1 * t;
  if (b.move === 'left') x = 2.5 - 5 * t;
  if (b.move === 'right') x = -2.5 + 5 * t;
  if (b.move === 'up') y = 2 - 4 * t;
  const capO = interpolate(f, [18, 36, dur - 40, dur - 22], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{opacity: b.n === 1 ? Math.max(op, f > XF ? 1 : op) : op}}>
      {b.split ? (
        <div style={{display: 'flex', width: '100%', height: '100%', gap: 6, background: '#111'}}>
          {[`f${String(b.n).padStart(2, '0')}`, b.split].map((name, k) => (
            <div key={name} style={{flex: 1, overflow: 'hidden'}}>
              {(k === 0 ? b.clip : b.clip2) ? (
                (() => {
                  const file = (k === 0 ? b.clip : b.clip2)!;
                  const rate = Math.min(1, Math.max(0.7, (b.clipSec ?? 8) / (dur / FPS)));
                  const playFrames = Math.floor(((b.clipSec ?? 8) / rate) * FPS) - 1;
                  const st = {width: '100%', height: '100%', objectFit: 'cover' as const};
                  return f < playFrames ? (
                    <OffthreadVideo src={staticFile(`clips/${file}`)} muted playbackRate={rate} style={st} />
                  ) : (
                    <Img src={staticFile(`clips/${file.replace('.mp4', '_last.jpg')}`)} style={st} />
                  );
                })()
              ) : (
                <Img
                  src={staticFile(`frames/${name}.jpg`)}
                  style={{width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${scale}) translate(${(k ? 1 : -1) * 1.5 * t}%, 0)`}}
                />
              )}
            </div>
          ))}
        </div>
      ) : b.clip ? (
        (() => {
          const rate = Math.min(1, Math.max(0.7, (b.clipSec ?? 8) / (dur / FPS)));
          const playFrames = Math.floor(((b.clipSec ?? 8) / rate) * FPS) - 1;
          const holdT = interpolate(f, [playFrames, dur], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
          const style = {width: '100%', height: '100%', objectFit: 'cover' as const, transform: `scale(${1.04 + 0.03 * holdT})`};
          return (
            <>
              <Sequence durationInFrames={playFrames} layout="none">
                <OffthreadVideo src={staticFile(`clips/${b.clip}`)} muted playbackRate={rate} style={style} />
              </Sequence>
              {f >= playFrames && <Img src={staticFile(`clips/${b.clip!.replace('.mp4', '_last.jpg')}`)} style={style} />}
            </>
          );
        })()
      ) : (
        <Img
          src={staticFile(`frames/f${String(b.n).padStart(2, '0')}.jpg`)}
          style={{width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${scale}) translate(${x}%, ${y}%)`}}
        />
      )}
      {!b.clip && b.fx?.includes('rain') && <Rain />}
      {b.fx?.includes('petals') && <Petals />}
      {!b.clip && b.fx?.includes('birds') && <Birds />}
      {!b.clip && b.fx?.includes('motes') && <Motes />}
      {!b.clip && b.fx?.includes('glow') && <Glow />}
      {b.caption && (
        <div style={{position: 'absolute', left: 110, bottom: 96, opacity: capO, color: '#fff8ee', fontFamily: 'Inter, sans-serif', textShadow: '0 2px 22px rgba(0,0,0,0.55)'}}>
          <div style={{fontSize: 50, fontWeight: 600, letterSpacing: 1}}>{b.caption}</div>
          {b.sub && <div style={{fontSize: 26, letterSpacing: 5, textTransform: 'uppercase', opacity: 0.85, marginTop: 6}}>{b.sub}</div>}
        </div>
      )}
    </AbsoluteFill>
  );
};

export const Storybook: React.FC<{withAudio?: boolean}> = ({withAudio = true}) => {
  const f = useCurrentFrame();
  const titleStart = starts.end - XF;
  const titleO = interpolate(f, [titleStart + 12, titleStart + 48, STORYBOOK_FRAMES - 30, STORYBOOK_FRAMES - 4], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const fadeIn = interpolate(f, [0, 24], [1, 0], {extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{background: '#000'}}>
      {BEATS.map((b, i) => {
        const dur = b.sec * FPS;
        return (
          <Sequence key={b.n} from={starts.s[i]} durationInFrames={i === BEATS.length - 1 ? dur + TITLE_SEC * FPS : dur}>
            <Still b={b} dur={i === BEATS.length - 1 ? dur + TITLE_SEC * FPS : dur} />
          </Sequence>
        );
      })}
      <AbsoluteFill style={{background: 'radial-gradient(ellipse at center, rgba(0,0,0,0) 58%, rgba(0,0,0,0.35) 100%)'}} />
      <AbsoluteFill style={{background: `rgba(0,0,0,${0.45 * titleO})`, alignItems: 'center', justifyContent: 'center'}}>
        <div style={{opacity: titleO, color: '#fff8ee', fontFamily: 'Inter, sans-serif', fontSize: 104, fontWeight: 300, letterSpacing: 22, textShadow: '0 4px 30px rgba(0,0,0,0.5)'}}>THE RIGHT TIME</div>
      </AbsoluteFill>
      <AbsoluteFill style={{background: '#000', opacity: fadeIn}} />
      {withAudio && <Audio src={staticFile('audio/storybook_mix_v001.wav')} />}
    </AbsoluteFill>
  );
};
