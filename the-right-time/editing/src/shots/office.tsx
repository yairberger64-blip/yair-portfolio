import React, {useMemo} from 'react';
import {AbsoluteFill, Easing} from 'remotion';
import {ThreeCanvas} from '@remotion/three';
import {CameraRig} from '../lib/Camera';
import {blink, idle, kf, kf3, lerp, seg, type V3} from '../lib/anim';
import {Character, basePose, mat, type Pose} from '../characters/Character';
import {COWORKER_A, COWORKER_B, KATELYN_2017, OFFICE_CRUSH, SHARONE_2017, YAIR_2017} from '../characters/specs';
import {Office, OfficeChair} from '../sets/Office';
import {Phone, makePortraitTexture} from '../sets/props';

/*
 * OPENING — HomeTalk office. All performance is defined on the GLOBAL frame so every
 * camera angle sees the same continuous action (continuity across cuts).
 *
 * Beat map (24 fps):
 *   0–132   S1 establishing
 *   132–252 S2 Yair at work
 *   252–396 S3 Katelyn approaches, taps shoulder, Yair swivels
 *   396–462 S4a Katelyn pitches: phone with Sharone's photo
 *   462–516 S4b Yair: polite smile, then eyes drift to the coffee corner
 *   516–540 S4c the woman he's interested in (unnamed, back to camera)
 *   540–576 S4d Katelyn: follows his gaze, deadpan
 *   576–636 S5 push into the phone (bridge to apartment)
 */

export const YAIR_SEAT: V3 = [-0.38, 0, 0];
export const K_STOP: V3 = [-1.2, 0, 0.15];
const K_START: V3 = [-4.4, 0, -3.0];
export const CRUSH_POS: V3 = [-4.95, 0, -0.5];

const TYPE_END = 334;
const SWIVEL_A = 344;
const SWIVEL_B = 372;

export function yairPose(f: number): Pose {
  const s = YAIR_2017.seed;
  const typing = 1 - seg(f, TYPE_END, TYPE_END + 14);
  const tap = (k: number) => Math.sin(f * 1.9 + k) * 0.035 * typing;
  const rotY = lerp(Math.PI / 2, -1.15, seg(f, SWIVEL_A, SWIVEL_B, Easing.bezier(0.5, 0, 0.3, 1)));
  const lapArm = {fwd: 0.55, side: 0.12, elbow: 1.05};
  const typeArm = {fwd: 1.12, side: 0.04, elbow: 0.42};
  const mixArm = (k: number) => ({
    fwd: lerp(lapArm.fwd, typeArm.fwd, typing) + tap(k),
    side: lerp(lapArm.side, typeArm.side, typing),
    elbow: lerp(lapArm.elbow, typeArm.elbow, typing) - tap(k + 1),
  });
  // gaze/head direction: monitor → Katelyn (left after swivel) → coffee corner (his right)
  const drift = seg(f, 486, 504);
  const backToK = seg(f, 544, 556);
  const lookAway = drift * (1 - backToK);
  const startle = seg(f, 330, 336) * (1 - seg(f, 350, 366));
  const shrug = seg(f, 552, 560) * (1 - seg(f, 566, 576));
  return basePose({
    pos: YAIR_SEAT,
    rotY,
    sit: true,
    lean: lerp(0.06, 0.16, typing) + idle(f, s, 0.6),
    headPitch: 0.08 * typing + idle(f, s + 2, 0.5) + kf(f, [{f: 200, v: 0}, {f: 210, v: 0.08}, {f: 220, v: 0}]),
    headYaw: kf(f, [{f: 330, v: 0}, {f: 340, v: 0.5}, {f: 352, v: 0.35}, {f: 372, v: 0}]) - 0.5 * lookAway,
    headTilt: 0.06 * lookAway + idle(f, s + 5, 0.5),
    armL: mixArm(0),
    armR: mixArm(2),
    smile: kf(f, [
      {f: 0, v: 0.2},
      {f: 196, v: 0.2},
      {f: 208, v: 0.55},
      {f: 240, v: 0.3},
      {f: 352, v: 0.3},
      {f: 366, v: 0.75},
      {f: 470, v: 0.55},
      {f: 490, v: 0.45},
      {f: 504, v: 0.7},
      {f: 548, v: 0.6},
      {f: 556, v: 0.45},
    ]),
    mouthOpen: kf(f, [{f: 360, v: 0}, {f: 368, v: 0.25}, {f: 380, v: 0.05}]),
    browRaise: 0.7 * startle + 0.25 * lookAway + 0.5 * shrug - 0.2 * typing,
    browAngle: 0.5 * shrug,
    gazeX: typing * 0.1 - 0.85 * lookAway,
    gazeY: kf(f, [{f: 462, v: 0}, {f: 470, v: -0.6}, {f: 486, v: -0.4}, {f: 500, v: 0}]),
    blink: blink(f, s),
    shoulderShrug: shrug,
  });
}

function kStride(f: number) {
  const p = seg(f, 252, 320, Easing.bezier(0.25, 0, 0.35, 1));
  const dx = K_STOP[0] - K_START[0];
  const dz = K_STOP[2] - K_START[2];
  const len = Math.hypot(dx, dz);
  const steps = Math.round(len / 0.68);
  return {p, pos: [K_START[0] + dx * p, 0, K_START[2] + dz * p] as V3, phase: p * steps * Math.PI};
}

export function katelynPose(f: number, sharoneTex: THREE.Texture | null): Pose {
  const s = KATELYN_2017.seed;
  const {p, pos, phase} = kStride(f);
  const walking = p > 0 && p < 1;
  const rotY = lerp(0.79, 1.45, seg(f, 310, 330));
  const tap = seg(f, 322, 332) * (1 - seg(f, 338, 350));
  const clasp = seg(f, 344, 354) * (1 - seg(f, 372, 382));
  const phoneUp = seg(f, 376, 400);
  const lowerPhone = seg(f, 564, 576);
  const wait = seg(f, 462, 474) * (1 - seg(f, 540, 552));
  const lookBack = seg(f, 540, 548) * (1 - seg(f, 552, 560));
  const deadpan = seg(f, 552, 560);
  const bounce = Math.max(0, Math.sin((f - 344) / 3.2)) * 0.02 * clasp + Math.max(0, Math.sin((f - 400) / 4)) * 0.012 * seg(f, 396, 404) * (1 - seg(f, 455, 465));
  const armR = {
    fwd: lerp(lerp(lerp(0.08, 1.25, tap), 0.55, clasp), lerp(1.05 - 0.4 * wait, 0.75, lowerPhone), phoneUp),
    side: lerp(0.12, -0.05, Math.max(clasp, phoneUp)),
    elbow: lerp(lerp(lerp(0.28, 0.35, tap), 1.55, clasp), lerp(1.0 + 0.3 * wait, 1.25, lowerPhone), phoneUp),
  };
  const gesture = seg(f, 404, 412) * (1 - seg(f, 450, 462));
  const armL = {
    fwd: lerp(lerp(0.08, 0.55, clasp), 0.62, gesture) + Math.sin(f / 3.5) * 0.08 * gesture,
    side: lerp(0.12, 0.25, gesture) - 0.15 * clasp,
    elbow: lerp(lerp(0.28, 1.55, clasp), 1.45, gesture),
  };
  return basePose({
    pos,
    rotY,
    walk: walking ? phase : null,
    bob: bounce,
    lean: walking ? 0.06 : 0.02 + idle(f, s),
    twist: -0.5 * lookBack,
    headYaw: -1.0 * lookBack + kf(f, [{f: 560, v: 0}, {f: 568, v: 0.12}]),
    headPitch: kf(f, [{f: 396, v: 0}, {f: 404, v: -0.05}, {f: 560, v: -0.05}, {f: 570, v: 0.3}]),
    headTilt: kf(f, [{f: 400, v: 0}, {f: 410, v: 0.12}, {f: 450, v: 0.12}, {f: 462, v: 0}]) + idle(f, s + 3),
    armL,
    armR,
    smile: lerp(kf(f, [{f: 250, v: 0.55}, {f: 330, v: 0.6}, {f: 346, v: 0.95}, {f: 480, v: 0.9}, {f: 504, v: 0.6}]), 0.05, deadpan),
    mouthOpen: kf(f, [{f: 340, v: 0}, {f: 346, v: 0.4}, {f: 360, v: 0.15}, {f: 404, v: 0.45}, {f: 420, v: 0.2}]) * (1 - deadpan),
    browRaise: lerp(kf(f, [{f: 330, v: 0.2}, {f: 346, v: 0.7}, {f: 400, v: 0.8}, {f: 500, v: 0.4}]), -0.35, deadpan),
    browAngle: -0.2 * deadpan,
    gazeX: lerp(0, -0.6, lookBack),
    gazeY: lerp(0, -0.7, seg(f, 564, 570)),
    blink: Math.max(blink(f, s), deadpan * 0.5 * (1 - seg(f, 566, 572))),
    shoulderShrug: kf(f, [{f: 556, v: 0}, {f: 562, v: 0.6}, {f: 572, v: 0}]),
    propR: f >= 380 ? 'phone' : null,
    propRot: [0, lerp(0, Math.PI, lowerPhone), 0],
    phoneTex: sharoneTex,
  });
}

function crushPose(f: number): Pose {
  const tuck = seg(f, 518, 526) * (1 - seg(f, 532, 540));
  return basePose({
    pos: CRUSH_POS,
    rotY: -Math.PI / 2 + 0.35,
    headPitch: 0.15,
    headYaw: 0.25 * tuck,
    armL: {fwd: lerp(0.5, 1.6, tuck), side: lerp(0.1, 0.55, tuck), elbow: lerp(1.2, 2.3, tuck)},
    armR: {fwd: 0.75, side: 0.0, elbow: 1.1},
    blink: blink(f, 4),
    smile: 0.4,
  });
}

function coworkerPose(f: number, pos: V3, rotY: number, seed: number): Pose {
  const t = (k: number) => Math.sin(f * 1.7 + k + seed) * 0.03;
  return basePose({
    pos,
    rotY,
    sit: true,
    lean: 0.14,
    headPitch: 0.1,
    armL: {fwd: 1.1 + t(0), side: 0.05, elbow: 0.45 - t(1)},
    armR: {fwd: 1.1 + t(2), side: 0.05, elbow: 0.45 - t(3)},
    blink: blink(f, seed),
    smile: 0.15,
  });
}

/** The full office scene with every actor. */
const OfficeScene: React.FC<{f: number; insert?: boolean}> = ({f, insert}) => {
  const sharoneTex = useMemo(() => makePortraitTexture(SHARONE_2017, {bg: '#f3c9a4', caption: 'Sharone', heart: true}), []);
  const yp = yairPose(f);
  return (
    <>
      <Office />
      <OfficeChair pos={[YAIR_SEAT[0] - 0.04, 0, 0]} rotY={yp.rotY} />
      {!insert && <Character spec={YAIR_2017} pose={yp} />}
      {!insert && f >= 250 && <Character spec={KATELYN_2017} pose={katelynPose(f, sharoneTex)} />}
      <Character spec={OFFICE_CRUSH} pose={crushPose(f)} />
      <Character spec={COWORKER_A} pose={coworkerPose(f, [-3.2, 0, 1.0], Math.PI / 2, 5)} />
      <Character spec={COWORKER_B} pose={coworkerPose(f, [2.78, 0, 0.1], -Math.PI / 2, 6)} />
    </>
  );
};

type Cam = {pos: V3; target: V3; fov?: number};

const ShotCanvas: React.FC<{f: number; cam: Cam; children?: React.ReactNode; insert?: boolean}> = ({f, cam, children, insert}) => (
  <AbsoluteFill>
    <ThreeCanvas width={1920} height={1080} shadows camera={{fov: 35}} gl={{antialias: true}}>
      <CameraRig pos={cam.pos} target={cam.target} fov={cam.fov} />
      <OfficeScene f={f} insert={insert} />
      {children}
    </ThreeCanvas>
  </AbsoluteFill>
);

// --- individual shots: each receives the GLOBAL frame -------------------------------

export const S1_Establishing: React.FC<{f: number}> = ({f}) => (
  <ShotCanvas
    f={f}
    cam={{
      pos: kf3(f, [{f: 0, v: [5.8, 3.1, 6.4]}, {f: 132, v: [2.7, 1.85, 3.5]}]),
      target: kf3(f, [{f: 0, v: [-1.6, 1.0, -1.2]}, {f: 132, v: [-0.5, 1.05, -0.2]}]),
      fov: 36,
    }}
  />
);

export const S2_YairWorking: React.FC<{f: number}> = ({f}) => (
  <ShotCanvas
    f={f}
    cam={{
      pos: kf3(f, [{f: 132, v: [1.75, 1.42, 1.9]}, {f: 252, v: [1.45, 1.38, 1.55]}]),
      target: kf3(f, [{f: 132, v: [-0.36, 1.22, 0]}, {f: 252, v: [-0.36, 1.24, 0.02]}]),
      fov: 30,
    }}
  />
);

export const S3_KatelynApproaches: React.FC<{f: number}> = ({f}) => {
  const k = kStride(f).pos;
  const tx = lerp(k[0], -0.8, seg(f, 300, 340));
  const tz = lerp(k[2], 0.05, seg(f, 300, 340));
  return (
    <ShotCanvas
      f={f}
      cam={{
        pos: kf3(f, [{f: 252, v: [-0.6, 1.5, 3.7]}, {f: 330, v: [-0.75, 1.42, 3.1]}, {f: 396, v: [-0.78, 1.4, 2.75]}]),
        target: [tx, 1.15, tz],
        fov: 36,
      }}
    />
  );
};

export const S4a_Pitch: React.FC<{f: number}> = ({f}) => (
  <ShotCanvas
    f={f}
    cam={{
      pos: kf3(f, [{f: 396, v: [0.62, 1.66, 0.78]}, {f: 462, v: [0.5, 1.64, 0.72]}]),
      target: [-1.2, 1.4, 0.12],
      fov: 30,
    }}
  />
);

export const S4b_YairDrifts: React.FC<{f: number}> = ({f}) => (
  <ShotCanvas
    f={f}
    cam={{
      pos: kf3(f, [{f: 462, v: [-1.3, 1.62, 1.7]}, {f: 516, v: [-1.2, 1.6, 1.55]}]),
      target: [-0.45, 1.25, 0.0],
      fov: 40,
    }}
  />
);

export const S4c_Crush: React.FC<{f: number}> = ({f}) => (
  <ShotCanvas
    f={f}
    cam={{
      pos: kf3(f, [{f: 516, v: [-1.0, 1.38, 0.45]}, {f: 540, v: [-1.4, 1.38, 0.38]}]),
      target: [CRUSH_POS[0], 1.3, CRUSH_POS[2]],
      fov: 26,
    }}
  />
);

export const S4d_Deadpan: React.FC<{f: number}> = ({f}) => (
  <ShotCanvas
    f={f}
    cam={{
      pos: kf3(f, [{f: 540, v: [-0.4, 1.52, 0.95]}, {f: 576, v: [-0.48, 1.52, 0.85]}]),
      target: [-1.15, 1.5, 0.12],
      fov: 30,
    }}
  />
);

/** Insert: Katelyn's phone with Sharone's photo; the camera pushes into the screen. */
export const S5_PhonePush: React.FC<{f: number}> = ({f}) => {
  const tex = useMemo(() => makePortraitTexture(SHARONE_2017, {bg: '#f3c9a4', caption: 'Sharone', heart: true}), []);
  const P: V3 = [-1.0, 1.3, 0.55];
  const t = seg(f, 576, 630, Easing.bezier(0.55, 0, 0.35, 1));
  const d = lerp(0.62, 0.075, t);
  return (
    <ShotCanvas
      f={f}
      insert
      cam={{pos: [P[0] + 0.02 * (1 - t), P[1] + 0.035 + 0.02 * (1 - t), P[2] + d], target: [P[0], P[1] + 0.035 * (1 - t) + 0.035, P[2]], fov: 32}}
    >
      <group position={P} rotation={[-0.05, 0, 0.03]}>
        <Phone tex={tex} />
        {/* holding hand + sleeve */}
        <mesh position={[0.0, -0.07, -0.025]} scale={[1.3, 1.1, 0.8]} material={mat(KATELYN_2017.skin, 0.55)}>
          <sphereGeometry args={[0.05, 16, 12]} />
        </mesh>
        <mesh position={[0.02, -0.2, -0.06]} rotation={[0.5, 0, 0.1]} material={mat(KATELYN_2017.shirt, 0.62)}>
          <capsuleGeometry args={[0.05, 0.2, 6, 12]} />
        </mesh>
      </group>
    </ShotCanvas>
  );
};

import type * as THREE from 'three';
