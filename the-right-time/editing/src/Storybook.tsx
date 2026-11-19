import React from 'react';
import {AbsoluteFill, Audio, Img, OffthreadVideo, Sequence, interpolate, staticFile, useCurrentFrame, Easing} from 'remotion';
import {Birds, Glow, Motes, Petals, Rain} from './fx';

/**
 * THE RIGHT TIME — storybook cut. Stills generated in Gemini from the locked hero portraits,
 * animated with slow camera moves and dissolves. Frames live in public/frames/fNN.jpg (local only).
 */
const FPS = 24;
const XF = 10; // short dissolve between shots

type Beat = {n: number; sec: number; caption?: string; sub?: string; move: 'in' | 'out' | 'left' | 'right' | 'up'; split?: string; fx?: ('rain' | 'petals' | 'birds' | 'motes' | 'glow')[]; clip?: string; clipSec?: number; clip2?: string; pos2?: string; caption2?: string; sub2?: string; clip2Sec?: number};
// v003 edit: each shot lasts about as long as its clip (no long freezes); wandering-eyes shot removed.
export const BEATS: Beat[] = [
  {n: 1, sec: 5.4, caption: 'Jerusalem', sub: '2017', move: 'in', fx: ['motes'], clip: 'c01.mp4', clipSec: 5.0},
  {n: 2, sec: 5.4, move: 'right', clip: 'c02.mp4', clipSec: 3.6},
  {n: 4, sec: 5.4, move: 'left', fx: ['glow'], clip: 'c04.mp4', clipSec: 5.0},
  {n: 5, sec: 5.4, caption: 'New York', sub: '2018', caption2: 'Colorado', sub2: '2018', move: 'in', split: 'f05b', clip: 'c05.mp4', clipSec: 2.2, clip2: 'c05b.mp4', clip2Sec: 2.75, pos2: '70% 50%'},
  {n: 6, sec: 5.4, caption: '2019', move: 'in', split: 'f06b', clip: 'c06.mp4', clipSec: 5.0, clip2: 'c06b.mp4', clip2Sec: 5.0},
  {n: 7, sec: 5.6, caption: '2020', move: 'in', fx: ['rain'], clip: 'c07.mp4', clipSec: 5.4},
  {n: 8, sec: 5.4, move: 'in', clip: 'c08.mp4', clipSec: 5.0},
  {n: 9, sec: 5.4, caption: 'November 2020', move: 'right', clip: 'c09.mp4', clipSec: 5.0},
  {n: 10, sec: 5.6, caption: 'Finally', move: 'in', clip: 'c10.mp4', clipSec: 5.0},
  {n: 11, sec: 4.0, move: 'left', clip: 'c11.mp4', clipSec: 3.6},
  {n: 12, sec: 6.5, caption: 'July 2021', move: 'in', fx: ['glow'], clip: 'c12.mp4', clipSec: 5.0},
  {n: 13, sec: 5.4, caption: '2023', move: 'up', fx: ['petals'], clip: 'c13.mp4', clipSec: 5.0},
  {n: 14, sec: 5.6, caption: '2026', move: 'out', clip: 'c14.mp4', clipSec: 5.0},
  {n: 15, sec: 5.4, move: 'right', clip: 'c15.mp4', clipSec: 5.0},
  {n: 16, sec: 5.4, caption: '2027', move: 'in', fx: ['motes'], clip: 'c16.mp4', clipSec: 5.0},
];

// Cut points (seconds) on the beat grid of the licensed piano track (69.8 bpm), last = start of the airport/title outro.
const CUTS = [0.0, 5.642, 10.797, 17.647, 21.084, 26.192, 31.347, 36.502, 41.657, 46.788, 50.225, 57.075, 62.229, 67.361, 72.516];
const AIRPORT_SEC = 5.15;
const MUSIC_SEC = 87.478;
const HX = XF / 2;
export const starts = (() => {
  const s = CUTS.map((c, i) => Math.max(0, Math.round(c * FPS) - (i ? HX : 0)));
  const durs = CUTS.map((c, i) => (i < CUTS.length - 1 ? Math.round(CUTS[i + 1] * FPS) + HX - s[i] : Math.round((c + AIRPORT_SEC) * FPS) + HX - s[i]));
  return {s, durs, end: Math.round((CUTS[CUTS.length - 1] + AIRPORT_SEC) * FPS) + HX};
})();
const TITLE_SEC = MUSIC_SEC - CUTS[CUTS.length - 1] - AIRPORT_SEC;
export const STORYBOOK_FRAMES = Math.round(MUSIC_SEC * FPS);

const Still: React.FC<{b: Beat; dur: number; last?: boolean}> = ({b, dur, last}) => {
  const f = useCurrentFrame();
  const t = interpolate(f, [0, dur], [0, 1], {easing: Easing.inOut(Easing.sin)});
  const op = last
    ? interpolate(f, [0, XF, dur - XF, dur], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})
    : interpolate(f, [0, XF], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  let scale = 1.06 + 0.08 * t;
  let x = 0;
  let y = 0;
  if (b.move === 'out') scale = 1.16 - 0.1 * t;
  if (b.move === 'left') x = 2.5 - 5 * t;
  if (b.move === 'right') x = -2.5 + 5 * t;
  if (b.move === 'up') y = 2 - 4 * t;
  const capEnd = Math.min(dur, 100);
  const capO = interpolate(f, [8, 20, capEnd - 28, capEnd - 14], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{opacity: b.n === 1 ? Math.max(op, f > XF ? 1 : op) : op}}>
      {b.split ? (
        <div style={{display: 'flex', width: '100%', height: '100%', gap: 6, background: '#111'}}>
          {[`f${String(b.n).padStart(2, '0')}`, b.split].map((name, k) => (
            <div key={name} style={{flex: 1, overflow: 'hidden'}}>
              {(k === 0 ? b.clip : b.clip2) ? (
                (() => {
                  const file = (k === 0 ? b.clip : b.clip2)!;
                  const sideSec = k === 0 ? (b.clipSec ?? 5) : (b.clip2Sec ?? 5);
                  const rate = Math.min(1, (sideSec - 0.1) / (dur / FPS));
                  const playFrames = Math.floor(((sideSec - 0.1) / rate) * FPS) + 2;
                  const st = {width: '100%', height: '100%', objectFit: 'cover' as const, objectPosition: k === 1 && b.pos2 ? b.pos2 : '50% 50%'};
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
          const rate = Math.min(1, Math.max(last ? 0.62 : 0.55, (b.clipSec ?? 8) / (dur / FPS)));
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
      {[b.caption && {t: b.caption, s: b.sub, left: 110}, b.caption2 && {t: b.caption2, s: b.sub2, left: 960 + 70}].filter(Boolean).map((c) => (
        <div key={(c as {t: string}).t} style={{position: 'absolute', left: (c as {left: number}).left, bottom: 96, opacity: capO, color: '#fff8ee', fontFamily: 'Inter, sans-serif', textShadow: '0 2px 22px rgba(0,0,0,0.55)'}}>
          <div style={{fontSize: 50, fontWeight: 600, letterSpacing: 1}}>{(c as {t: string}).t}</div>
          {(c as {s?: string}).s && <div style={{fontSize: 26, letterSpacing: 5, textTransform: 'uppercase', opacity: 0.85, marginTop: 6}}>{(c as {s?: string}).s}</div>}
        </div>
      ))}
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
        const dur = starts.durs[i];
        return (
          <Sequence key={b.n} from={starts.s[i]} durationInFrames={i === BEATS.length - 1 ? STORYBOOK_FRAMES - starts.s[i] : dur}>
            <Still b={b} last={i === BEATS.length - 1} dur={i === BEATS.length - 1 ? STORYBOOK_FRAMES - starts.s[i] : dur} />
          </Sequence>
        );
      })}
      <AbsoluteFill style={{background: 'radial-gradient(ellipse at center, rgba(0,0,0,0) 58%, rgba(0,0,0,0.35) 100%)'}} />
      <AbsoluteFill style={{background: `rgba(0,0,0,${0.45 * titleO})`, alignItems: 'center', justifyContent: 'center'}}>
        <div style={{opacity: titleO, color: '#fff8ee', fontFamily: 'Inter, sans-serif', fontSize: 104, fontWeight: 300, letterSpacing: 22, textShadow: '0 4px 30px rgba(0,0,0,0.5)'}}>THE RIGHT TIME</div>
      </AbsoluteFill>
      <AbsoluteFill style={{background: '#000', opacity: fadeIn}} />
      {withAudio && <Audio src={staticFile('audio/storybook_mix_v002.wav')} />}
    </AbsoluteFill>
  );
};
