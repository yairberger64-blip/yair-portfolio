import React, {useMemo} from 'react';
import * as THREE from 'three';
import type {CharSpec} from './specs';
import {Phone, WineGlass} from '../sets/props';

export type Arm = {fwd: number; side: number; elbow: number; twist?: number};

export type Pose = {
  pos: [number, number, number];
  rotY: number;
  sit: boolean;
  walk: number | null; // walk-cycle phase in radians, null = not walking
  lean: number; // torso lean forward (rad)
  twist: number; // torso yaw relative to hips
  bob: number; // extra vertical offset (bounce)
  headYaw: number;
  headPitch: number;
  headTilt: number;
  armL: Arm;
  armR: Arm;
  smile: number; // 0 neutral .. 1 big smile
  mouthOpen: number; // 0..1
  browRaise: number; // -1..1
  browAngle: number; // + = worried/inner up, - = stern
  gazeX: number; // -1..1 (character's left = +)
  gazeY: number;
  blink: number; // 0..1
  shoulderShrug: number; // 0..1
  propR?: 'phone' | 'glass' | null;
  propL?: 'phone' | 'glass' | null;
  propRot?: [number, number, number];
  phoneTex?: THREE.Texture | null;
  wineLevel?: number;
};

export const basePose = (over: Partial<Pose> = {}): Pose => ({
  pos: [0, 0, 0],
  rotY: 0,
  sit: false,
  walk: null,
  lean: 0,
  twist: 0,
  bob: 0,
  headYaw: 0,
  headPitch: 0,
  headTilt: 0,
  armL: {fwd: 0.08, side: 0.12, elbow: 0.28},
  armR: {fwd: 0.08, side: 0.12, elbow: 0.28},
  smile: 0.25,
  mouthOpen: 0,
  browRaise: 0,
  browAngle: 0,
  gazeX: 0,
  gazeY: 0,
  blink: 0,
  shoulderShrug: 0,
  propR: null,
  propL: null,
  ...over,
});

// ---- shared material cache -------------------------------------------------
const matCache = new Map<string, THREE.MeshStandardMaterial>();
export const mat = (color: string, rough = 0.62, extra: Partial<THREE.MeshStandardMaterialParameters> = {}) => {
  const key = color + rough + JSON.stringify(extra);
  let m = matCache.get(key);
  if (!m) {
    m = new THREE.MeshStandardMaterial({color, roughness: rough, metalness: 0, ...extra});
    matCache.set(key, m);
  }
  return m;
};

const R = 0.15; // head radius (before HEAD_SCALE)
const HEAD_SCALE = 1.3; // stylised big-head proportions

const Capsule: React.FC<{r: number; len: number; color: string; y?: number; rough?: number; sx?: number; sz?: number}> = ({
  r,
  len,
  color,
  y = 0,
  rough,
  sx = 1,
  sz = 1,
}) => (
  <mesh position={[0, y, 0]} scale={[sx, 1, sz]} castShadow receiveShadow material={mat(color, rough)}>
    <capsuleGeometry args={[r, len, 8, 16]} />
  </mesh>
);

const Limb: React.FC<{
  side: 1 | -1;
  arm: Arm;
  spec: CharSpec;
  prop?: 'phone' | 'glass' | null;
  propRot?: [number, number, number];
  phoneTex?: THREE.Texture | null;
  wineLevel?: number;
  lean: number;
}> = ({side, arm, spec, prop, propRot, phoneTex, wineLevel, lean}) => {
  const upperColor = spec.shirt;
  const foreColor = spec.sleeves === 'long' ? spec.shirt : spec.skin;
  return (
    <group rotation={[-arm.fwd, arm.twist ?? 0, side * arm.side]} >
      <mesh material={mat(upperColor)} castShadow>
        <sphereGeometry args={[0.068, 16, 12]} />
      </mesh>
      <Capsule r={0.056} len={0.21} color={upperColor} y={-0.16} />
      {spec.sleeves === 'short' && <Capsule r={0.046} len={0.08} color={spec.skin} y={-0.26} />}
      <group position={[0, -0.31, 0]} rotation={[-arm.elbow, 0, 0]}>
        <mesh material={mat(foreColor)}>
          <sphereGeometry args={[0.05, 14, 10]} />
        </mesh>
        <Capsule r={0.047} len={0.19} color={foreColor} y={-0.14} />
        <mesh position={[0, -0.3, 0.005]} scale={[0.9, 1.15, 0.75]} castShadow material={mat(spec.skin, 0.55)}>
          <sphereGeometry args={[0.052, 16, 12]} />
        </mesh>
        {prop && (
          <group position={[0, -0.3, 0.02]} rotation={[arm.fwd + arm.elbow - lean, 0, 0]}>
            <group rotation={propRot ?? [0, 0, 0]}>
            {prop === 'phone' ? <Phone tex={phoneTex ?? null} /> : <WineGlass level={wineLevel ?? 0.5} />}
            </group>
          </group>
        )}
      </group>
    </group>
  );
};

const Leg: React.FC<{side: 1 | -1; thigh: number; knee: number; spec: CharSpec}> = ({side, thigh, knee, spec}) => (
  <group position={[side * 0.092, -0.02, 0]} rotation={[-thigh, 0, side * 0.02]}>
    <Capsule r={0.078} len={0.29} color={spec.pants} y={-0.215} />
    <group position={[0, -0.43, 0]} rotation={[knee, 0, 0]}>
      <mesh material={mat(spec.pants)}>
        <sphereGeometry args={[0.07, 14, 10]} />
      </mesh>
      <Capsule r={0.064} len={0.3} color={spec.pants} y={-0.2} />
      <mesh position={[0, -0.41, 0.045]} castShadow material={mat(spec.shoes, 0.5)}>
        <boxGeometry args={[0.105, 0.07, 0.23]} />
      </mesh>
    </group>
  </group>
);

const Hair: React.FC<{spec: CharSpec}> = ({spec}) => {
  const m = mat(spec.hair, 0.5);
  const cap = (theta: number, tilt: number, s = 1.07) => (
    <mesh rotation={[tilt, 0, 0]} material={m} castShadow>
      <sphereGeometry args={[R * s, 40, 20, 0, Math.PI * 2, 0, theta]} />
    </mesh>
  );
  switch (spec.hairStyle) {
    case 'shortSide':
      return (
        <group>
          {cap(1.32, -0.42, 1.06)}
          {/* side-part volume sweeping to the character's left */}
          <mesh position={[0.015, R * 0.93, R * 0.42]} rotation={[0.35, 0, -0.25]} scale={[1.25, 0.55, 0.85]} material={m} castShadow>
            <sphereGeometry args={[0.075, 20, 14]} />
          </mesh>
          <mesh position={[-0.05, R * 0.98, R * 0.2]} rotation={[0.2, 0, 0.3]} scale={[1.1, 0.5, 1]} material={m}>
            <sphereGeometry args={[0.07, 20, 14]} />
          </mesh>
          {/* back/nape coverage, leaves ears clear */}
          <mesh rotation={[-Math.PI / 2 + 0.25, 0, 0]} material={m}>
            <sphereGeometry args={[R * 1.035, 32, 16, 0, Math.PI * 2, 0, 1.2]} />
          </mesh>
        </group>
      );
    case 'shortCurly':
      return (
        <group>
          {cap(1.35, -0.35, 1.1)}
          {Array.from({length: 9}).map((_, i) => {
            const a = (i / 9) * Math.PI * 2;
            return (
              <mesh key={i} position={[Math.cos(a) * R * 0.75, R * 0.82, Math.sin(a) * R * 0.75 - 0.02]} material={m}>
                <sphereGeometry args={[0.05, 12, 10]} />
              </mesh>
            );
          })}
        </group>
      );
    case 'long':
      return (
        <group>
          {cap(1.5, -0.12, 1.08)}
          {/* back curtain */}
          <mesh position={[0, -R * 0.95, -R * 0.42]} scale={[R * 1.12, R * 2.1, R * 0.62]} material={m} castShadow>
            <sphereGeometry args={[1, 28, 20]} />
          </mesh>
          {/* side locks framing the face */}
          {[1, -1].map((s) => (
            <mesh key={s} position={[s * R * 0.9, -R * 0.75, R * 0.05]} rotation={[0.05, 0, s * 0.06]} scale={[0.55, 1, 0.6]} material={m} castShadow>
              <capsuleGeometry args={[0.07, 0.26, 8, 14]} />
            </mesh>
          ))}
        </group>
      );
    case 'ponytail':
      return (
        <group>
          {cap(1.42, -0.3, 1.06)}
          <mesh position={[0, R * 0.55, -R * 1.0]} material={mat('#3a2a22', 0.5)}>
            <sphereGeometry args={[0.03, 12, 10]} />
          </mesh>
          <mesh position={[0, R * 0.05, -R * 1.22]} rotation={[0.35, 0, 0]} scale={[1, 1, 0.8]} material={m} castShadow>
            <capsuleGeometry args={[0.055, 0.22, 8, 14]} />
          </mesh>
          <mesh position={[0.02, R * 0.74, R * 0.6]} rotation={[0.7, 0, 0.3]} scale={[1.5, 0.4, 0.6]} material={m}>
            <sphereGeometry args={[0.07, 20, 14]} />
          </mesh>
        </group>
      );
    case 'bun':
      return (
        <group>
          {cap(1.42, -0.25, 1.06)}
          <mesh position={[0, R * 1.0, -R * 0.55]} material={m} castShadow>
            <sphereGeometry args={[0.075, 18, 14]} />
          </mesh>
        </group>
      );
  }
};

const Face: React.FC<{spec: CharSpec; pose: Pose}> = ({spec, pose}) => {
  const lid = Math.max(0.08, 1 - pose.blink);
  const gx = pose.gazeX * 0.009;
  const gy = pose.gazeY * 0.007;
  const smile = pose.smile;
  // Mouth: half torus. flatten -> neutral line; deeper arc -> smile.
  const mouthDepth = 0.12 + smile * 0.7;
  const mouthWidth = 0.85 + smile * 0.35 + pose.mouthOpen * 0.1;
  return (
    <group>
      {/* eyes */}
      {[1, -1].map((s) => (
        <group key={s} position={[s * 0.056, 0.012, 0.124]} scale={[1, lid, 1]}>
          <mesh scale={[1, 1.12, 0.55]} material={mat('#fbf8f3', 0.3)}>
            <sphereGeometry args={[0.03, 20, 16]} />
          </mesh>
          <mesh position={[gx, gy, 0.014]} scale={[1, 1.1, 0.5]} material={mat(spec.eye, 0.25)}>
            <sphereGeometry args={[0.02, 18, 14]} />
          </mesh>
          <mesh position={[gx, gy, 0.0185]} scale={[1, 1.1, 0.4]} material={mat('#120c09', 0.2)}>
            <sphereGeometry args={[0.0105, 14, 10]} />
          </mesh>
          <mesh position={[gx - 0.006, gy + 0.008, 0.024]} material={mat('#ffffff', 0.1, {emissive: '#ffffff', emissiveIntensity: 0.8})}>
            <sphereGeometry args={[0.0045, 8, 6]} />
          </mesh>
          {/* upper lid line for definition */}
          <mesh position={[0, 0.027, 0.006]} rotation={[0, 0, s * 0.08]} scale={[1, 0.35, 0.6]} material={mat(spec.brow, 0.6)}>
            <capsuleGeometry args={[0.006, 0.042, 4, 8]} />
          </mesh>
        </group>
      ))}
      {/* brows */}
      {[1, -1].map((s) => (
        <mesh
          key={s}
          position={[s * 0.058, 0.07 + pose.browRaise * 0.014, 0.128]}
          rotation={[-0.25, s * 0.12, Math.PI / 2 + s * (0.08 + pose.browAngle * 0.25)]}
          material={mat(spec.brow, 0.7)}
        >
          <capsuleGeometry args={[0.0075, 0.038, 4, 8]} />
        </mesh>
      ))}
      {/* nose */}
      <mesh position={[0, -0.018, 0.146]} scale={[1, 1.15, 1]} material={mat(spec.skin, 0.55)}>
        <sphereGeometry args={[0.021, 14, 10]} />
      </mesh>
      {/* cheeks */}
      {[1, -1].map((s) => (
        <mesh key={s} position={[s * 0.088, -0.04, 0.112]} scale={[1, 0.7, 0.35]} material={mat('#e98f86', 0.7, {transparent: true, opacity: 0.28 + smile * 0.12})}>
          <sphereGeometry args={[0.03, 12, 10]} />
        </mesh>
      ))}
      {/* mouth */}
      <group position={[0, -0.066 + smile * 0.004, 0.134]} rotation={[-0.22, 0, 0]}>
        {pose.mouthOpen > 0.02 && (
          <mesh position={[0, -0.006, -0.004]} scale={[mouthWidth * 1.05, 0.25 + pose.mouthOpen * 0.75, 0.35]} material={mat('#4a1f22', 0.8)}>
            <sphereGeometry args={[0.028, 18, 12, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2]} />
          </mesh>
        )}
        {pose.mouthOpen > 0.2 && (
          <mesh position={[0, -0.002, 0.004]} scale={[mouthWidth * 0.75, 0.2, 0.3]} material={mat('#f6f2ea', 0.4)}>
            <sphereGeometry args={[0.026, 14, 8, 0, Math.PI * 2, Math.PI / 2, Math.PI / 3]} />
          </mesh>
        )}
        <mesh rotation={[0, 0, Math.PI]} scale={[mouthWidth, mouthDepth, 1]} material={mat(spec.lip, 0.5)}>
          <torusGeometry args={[0.028, 0.0055, 8, 24, Math.PI]} />
        </mesh>
      </group>
      {/* ears */}
      {[1, -1].map((s) => (
        <mesh key={s} position={[s * R * 0.98, -0.005, -0.005]} scale={[0.45, 1, 0.75]} material={mat(spec.skin, 0.55)}>
          <sphereGeometry args={[0.034, 12, 10]} />
        </mesh>
      ))}
    </group>
  );
};

export const Character: React.FC<{spec: CharSpec; pose: Pose}> = ({spec, pose}) => {
  // Legs & hips
  let thighL = 0;
  let thighR = 0;
  let kneeL = 0.02;
  let kneeR = 0.02;
  let hipY = 0.92;
  let walkBob = 0;
  let armSwing = 0;
  if (pose.sit) {
    hipY = 0.5;
    thighL = thighR = Math.PI / 2 - 0.05;
    kneeL = kneeR = Math.PI / 2 - 0.1;
  } else if (pose.walk !== null) {
    const p = pose.walk;
    thighL = Math.sin(p) * 0.42;
    thighR = -Math.sin(p) * 0.42;
    kneeL = Math.max(0, -Math.cos(p)) * 0.55 + 0.05;
    kneeR = Math.max(0, Math.cos(p)) * 0.55 + 0.05;
    walkBob = Math.abs(Math.cos(p)) * 0.025 - 0.02;
    armSwing = Math.sin(p) * 0.32;
  }
  const armL: Arm = {...pose.armL, fwd: pose.armL.fwd - armSwing};
  const armR: Arm = {...pose.armR, fwd: pose.armR.fwd + armSwing};
  const shrugY = pose.shoulderShrug * 0.035;
  const b = spec.build;
  const torsoTop = 0.5;

  return (
    <group position={pose.pos} rotation={[0, pose.rotY, 0]} scale={spec.scale}>
      <group position={[0, hipY + walkBob + pose.bob, 0]}>
        {/* pelvis */}
        <mesh position={[0, 0.02, 0]} scale={[1.05 * b, 0.62, 0.72]} castShadow material={mat(spec.pants)}>
          <sphereGeometry args={[0.15, 20, 14]} />
        </mesh>
        <Leg side={1} thigh={thighL} knee={kneeL} spec={spec} />
        <Leg side={-1} thigh={thighR} knee={kneeR} spec={spec} />

        <group rotation={[pose.lean, pose.twist, 0]}>
          {/* torso */}
          <mesh position={[0, 0.27, 0]} scale={[1.0 * b, 1, 0.68]} castShadow receiveShadow material={mat(spec.shirt)}>
            <capsuleGeometry args={[0.17, 0.26, 10, 20]} />
          </mesh>
          {/* collar */}
          <mesh position={[0, torsoTop - 0.005, 0]} rotation={[Math.PI / 2, 0, 0]} scale={[1.05 * b, 0.75, 1]} material={mat(spec.shirt)}>
            <torusGeometry args={[0.075, 0.022, 8, 20]} />
          </mesh>
          {/* neck */}
          <mesh position={[0, torsoTop + 0.06, 0]} material={mat(spec.skin, 0.55)}>
            <cylinderGeometry args={[0.05, 0.058, 0.16, 14]} />
          </mesh>
          {/* arms */}
          <group position={[0.205 * b, torsoTop - 0.04 + shrugY, 0]}>
            <Limb side={1} arm={armL} spec={spec} prop={pose.propL} propRot={pose.propRot} phoneTex={pose.phoneTex} wineLevel={pose.wineLevel} lean={pose.lean} />
          </group>
          <group position={[-0.205 * b, torsoTop - 0.04 + shrugY, 0]}>
            <Limb side={-1} arm={armR} spec={spec} prop={pose.propR} propRot={pose.propRot} phoneTex={pose.phoneTex} wineLevel={pose.wineLevel} lean={pose.lean} />
          </group>
          {/* head */}
          <group position={[0, torsoTop + 0.25 + shrugY * 0.3, 0.01]} rotation={[pose.headPitch, pose.headYaw, pose.headTilt]} scale={HEAD_SCALE}>
            <mesh scale={[0.97, 1.07, 0.98]} castShadow material={mat(spec.skin, 0.55)}>
              <sphereGeometry args={[R, 40, 28]} />
            </mesh>
            <Face spec={spec} pose={pose} />
            <Hair spec={spec} />
          </group>
        </group>
      </group>
    </group>
  );
};

/** Helper: facing angle (rotY) from a position toward a target on the XZ plane. */
export const faceToward = (from: [number, number, number], to: [number, number, number]) =>
  Math.atan2(to[0] - from[0], to[2] - from[2]);

export const useSpecMemo = (spec: CharSpec) => useMemo(() => spec, [spec]);
