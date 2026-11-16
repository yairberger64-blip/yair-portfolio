import React, {useMemo} from 'react';
import {AbsoluteFill} from 'remotion';
import {ThreeCanvas} from '@remotion/three';
import {CameraRig} from '../lib/Camera';
import {blink, idle, kf, kf3, lerp, seg, type V3} from '../lib/anim';
import {Character, basePose, type Pose} from '../characters/Character';
import {KATELYN_2017, SHARONE_2017, YAIR_2017} from '../characters/specs';
import {Apartment} from '../sets/Apartment';
import {makePortraitTexture} from '../sets/props';
import type * as THREE from 'three';

/*
 * OPENING — Sharone & Katelyn's apartment, evening (creative reconstruction).
 * Global-frame beat map:
 *   636–720  A1 CU Sharone laughing (match from the phone photo) → pull back reveals Katelyn
 *   720–816  A2 two-shot: Katelyn talks Yair up, shows his photo; Sharone curious, sceptical
 *   816–838  A3 CU Sharone: a small "maybe" smile
 *   838–870  A4 clink
 *   870–912  A5 drift to the window, fade out
 */

const K_SEAT: V3 = [-0.48, 0, 0.0];
const S_SEAT: V3 = [0.5, 0, 0.0];

function katelynAptPose(f: number, yairTex: THREE.Texture | null): Pose {
  const s = KATELYN_2017.seed + 10;
  const talk = (1 - seg(f, 836, 842)) * (f < 740 || f > 792 ? 1 : 0.35);
  const flap = talk * (0.18 + 0.32 * Math.abs(Math.sin(f * 0.55) * Math.sin(f * 0.23 + 1)));
  const show = seg(f, 738, 752) * (1 - seg(f, 790, 804));
  const clink = seg(f, 836, 850) * (1 - seg(f, 862, 874));
  const gest = (1 - show) * (1 - clink);
  return basePose({
    pos: K_SEAT,
    rotY: 0.34,
    sit: true,
    lean: 0.05 + 0.1 * show + idle(f, s),
    twist: 0.32 * show,
    bob: Math.abs(Math.sin(f / 5)) * 0.006 * talk,
    headYaw: 0.2 + 0.15 * show + Math.sin(f / 11) * 0.06 * talk,
    headPitch: kf(f, [{f: 740, v: 0}, {f: 760, v: 0.1}, {f: 800, v: 0}]) + idle(f, s + 1),
    headTilt: Math.sin(f / 13) * 0.07 * talk,
    armR: {
      fwd: lerp(0.7 + Math.sin(f / 6) * 0.18 * gest, 1.2, show),
      side: lerp(0.15, -0.38, show),
      elbow: lerp(1.35 + Math.sin(f / 4.3 + 1) * 0.15 * gest, 0.75, show),
    },
    armL: {
      fwd: lerp(0.45, 1.0, clink),
      side: lerp(0.12, 0.38, clink),
      elbow: lerp(1.25, 0.75, clink),
    },
    smile: kf(f, [{f: 636, v: 0.9}, {f: 760, v: 0.75}, {f: 800, v: 0.95}]),
    mouthOpen: flap + 0.3 * seg(f, 850, 854) * (1 - seg(f, 860, 870)),
    browRaise: 0.55 + 0.3 * Math.sin(f / 9) * talk,
    gazeX: 0.45,
    gazeY: -0.2 * show,
    blink: blink(f, s),
    propR: 'phone',
    propL: 'glass',
    propRot: [0, -0.5, 0],
    phoneTex: yairTex,
    wineLevel: 0.45,
  });
}

function sharonePose(f: number): Pose {
  const s = SHARONE_2017.seed;
  const laugh = 1 - seg(f, 680, 700);
  const sip = seg(f, 708, 720) * (1 - seg(f, 728, 740));
  const look = seg(f, 742, 756) * (1 - seg(f, 820, 836));
  const maybe = seg(f, 812, 826);
  const clink = seg(f, 836, 850) * (1 - seg(f, 862, 874));
  return basePose({
    pos: S_SEAT,
    rotY: -0.32,
    sit: true,
    lean: 0.04 + 0.12 * look - 0.06 * laugh + idle(f, s),
    bob: Math.abs(Math.sin(f / 2.4)) * 0.01 * laugh,
    headYaw: -0.25 - 0.35 * look + 0.1 * maybe,
    headPitch: -0.12 * laugh + 0.12 * look + idle(f, s + 1),
    headTilt: 0.08 * laugh + 0.12 * maybe,
    armR: {
      fwd: lerp(lerp(0.5, 1.15, sip), 1.0, clink),
      side: lerp(lerp(0.1, -0.15, sip), 0.4, clink),
      elbow: lerp(lerp(1.2, 2.15, sip), 0.75, clink),
    },
    armL: {fwd: 0.55, side: 0.05, elbow: 1.3},
    smile: kf(f, [{f: 636, v: 1}, {f: 690, v: 0.85}, {f: 740, v: 0.45}, {f: 790, v: 0.4}, {f: 812, v: 0.45}, {f: 828, v: 0.8}]),
    mouthOpen: 0.5 * laugh * (0.6 + 0.4 * Math.abs(Math.sin(f / 2.2))) + 0.2 * seg(f, 850, 854) * (1 - seg(f, 860, 870)),
    browRaise: 0.4 * laugh + 0.35 * look + 0.2 * maybe,
    browAngle: -0.25 * look * (1 - maybe),
    gazeX: -0.5 * look - 0.3,
    gazeY: -0.45 * look,
    blink: Math.max(blink(f, s), 0.55 * laugh),
    shoulderShrug: kf(f, [{f: 814, v: 0}, {f: 820, v: 0.7}, {f: 830, v: 0}]),
    propR: 'glass',
    wineLevel: 0.55,
  });
}

type Cam = {pos: V3; target: V3; fov?: number};

const AptCanvas: React.FC<{f: number; cam: Cam}> = ({f, cam}) => {
  const yairTex = useMemo(() => makePortraitTexture(YAIR_2017, {bg: '#bcd3e0', caption: 'Yair', heart: true}), []);
  return (
    <AbsoluteFill>
      <ThreeCanvas width={1920} height={1080} shadows camera={{fov: 35}} gl={{antialias: true}}>
        <CameraRig pos={cam.pos} target={cam.target} fov={cam.fov} />
        <Apartment frame={f} />
        <Character spec={KATELYN_2017} pose={katelynAptPose(f, yairTex)} />
        <Character spec={SHARONE_2017} pose={sharonePose(f)} />
      </ThreeCanvas>
    </AbsoluteFill>
  );
};

export const A1_SharoneLaugh: React.FC<{f: number}> = ({f}) => (
  <AptCanvas
    f={f}
    cam={{
      pos: kf3(f, [{f: 612, v: [0.36, 1.27, 0.92]}, {f: 664, v: [0.34, 1.26, 1.0]}, {f: 720, v: [0.08, 1.2, 2.35]}]),
      target: kf3(f, [{f: 612, v: [0.46, 1.22, 0.02]}, {f: 664, v: [0.46, 1.2, 0.02]}, {f: 720, v: [0.0, 0.95, 0.1]}]),
      fov: kf(f, [{f: 664, v: 30}, {f: 720, v: 35}]),
    }}
  />
);

export const A2_TwoShot: React.FC<{f: number}> = ({f}) => (
  <AptCanvas
    f={f}
    cam={{
      pos: kf3(f, [{f: 720, v: [0.08, 1.2, 2.35]}, {f: 816, v: [0.0, 1.14, 1.95]}]),
      target: kf3(f, [{f: 720, v: [0.0, 0.95, 0.1]}, {f: 816, v: [0.04, 0.98, 0.1]}]),
      fov: 35,
    }}
  />
);

export const A3_SharoneMaybe: React.FC<{f: number}> = ({f}) => (
  <AptCanvas
    f={f}
    cam={{
      pos: kf3(f, [{f: 816, v: [-0.1, 1.24, 1.05]}, {f: 838, v: [-0.05, 1.23, 0.98]}]),
      target: [0.46, 1.2, 0.0],
      fov: 30,
    }}
  />
);

export const A4_Clink: React.FC<{f: number}> = ({f}) => (
  <AptCanvas
    f={f}
    cam={{
      pos: kf3(f, [{f: 838, v: [0.0, 1.08, 1.7]}, {f: 870, v: [0.0, 1.06, 1.55]}]),
      target: [0.0, 0.95, 0.25],
      fov: 34,
    }}
  />
);

export const A5_Window: React.FC<{f: number}> = ({f}) => (
  <AptCanvas
    f={f}
    cam={{
      pos: kf3(f, [{f: 870, v: [0.0, 1.2, 2.3]}, {f: 912, v: [0.0, 2.05, 0.9]}]),
      target: kf3(f, [{f: 870, v: [0.0, 1.0, 0.0]}, {f: 912, v: [0.0, 1.75, -3.0]}]),
      fov: 35,
    }}
  />
);
