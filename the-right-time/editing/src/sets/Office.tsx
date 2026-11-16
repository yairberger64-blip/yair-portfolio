import React, {useMemo} from 'react';
import * as THREE from 'three';
import {mat} from '../characters/Character';
import {rand} from '../lib/anim';
import {makeGradientTexture, makeScreenTexture, makeTextTexture} from './props';

/**
 * HomeTalk office, Jerusalem (creative reconstruction — real layout unknown).
 * Coordinates: Yair's desk at the origin, he faces +X. Window wall at z = -4.5.
 * The city outside is a generic Jerusalem-stone skyline (no specific landmarks).
 */

const Desk: React.FC<{pos: [number, number, number]; rotY?: number; seed: number; mug?: boolean}> = ({pos, rotY = 0, seed, mug = true}) => {
  const screenTex = useMemo(() => makeScreenTexture(seed), [seed]);
  return (
    <group position={pos} rotation={[0, rotY, 0]}>
      {/* top (long axis along Z, user sits at -X side facing +X) */}
      <mesh position={[0.35, 0.74, 0]} castShadow receiveShadow material={mat('#f2eee8', 0.45)}>
        <boxGeometry args={[0.75, 0.035, 1.5]} />
      </mesh>
      {[-0.68, 0.68].map((z) => (
        <mesh key={z} position={[0.35, 0.37, z]} castShadow material={mat('#3a3d42', 0.4, {metalness: 0.4})}>
          <boxGeometry args={[0.65, 0.72, 0.03]} />
        </mesh>
      ))}
      {/* monitor */}
      <group position={[0.58, 0.76, 0]}>
        <mesh position={[0, 0.12, 0]} material={mat('#2a2c30', 0.4)}>
          <boxGeometry args={[0.04, 0.24, 0.05]} />
        </mesh>
        <mesh position={[0, 0.01, 0]} material={mat('#2a2c30', 0.4)}>
          <boxGeometry args={[0.18, 0.015, 0.22]} />
        </mesh>
        <mesh position={[0, 0.39, 0]} castShadow material={mat('#1f2125', 0.35)}>
          <boxGeometry args={[0.03, 0.36, 0.62]} />
        </mesh>
        <mesh position={[-0.0165, 0.39, 0]} rotation={[0, -Math.PI / 2, 0]}>
          <planeGeometry args={[0.58, 0.33]} />
          <meshStandardMaterial map={screenTex} emissiveMap={screenTex} emissive="#ffffff" emissiveIntensity={0.55} roughness={0.4} />
        </mesh>
      </group>
      {/* keyboard + mouse */}
      <mesh position={[0.25, 0.765, 0]} receiveShadow material={mat('#e4e4e2', 0.5)}>
        <boxGeometry args={[0.15, 0.015, 0.42]} />
      </mesh>
      <mesh position={[0.26, 0.77, -0.32]} material={mat('#e4e4e2', 0.5)}>
        <boxGeometry args={[0.1, 0.02, 0.06]} />
      </mesh>
      {mug && (
        <mesh position={[0.3, 0.8, 0.5]} castShadow material={mat(rand(seed) > 0.5 ? '#c8553d' : '#2f6f73', 0.5)}>
          <cylinderGeometry args={[0.04, 0.036, 0.1, 18]} />
        </mesh>
      )}
      {/* small plant */}
      <group position={[0.55, 0.76, -0.6]}>
        <mesh position={[0, 0.05, 0]} material={mat('#d9cbb8', 0.7)}>
          <cylinderGeometry args={[0.06, 0.05, 0.1, 16]} />
        </mesh>
        {[0, 1, 2, 3].map((i) => (
          <mesh key={i} position={[Math.sin(i * 1.7) * 0.04, 0.14 + i * 0.02, Math.cos(i * 1.7) * 0.04]} material={mat('#5d8a4e', 0.7)} castShadow>
            <sphereGeometry args={[0.055, 10, 8]} />
          </mesh>
        ))}
      </group>
    </group>
  );
};

export const OfficeChair: React.FC<{pos: [number, number, number]; rotY: number; color?: string}> = ({pos, rotY, color = '#2f3338'}) => (
  <group position={pos} rotation={[0, rotY, 0]}>
    <mesh position={[0, 0.44, 0]} castShadow material={mat(color, 0.6)}>
      <boxGeometry args={[0.48, 0.07, 0.46]} />
    </mesh>
    <mesh position={[0, 0.78, -0.23]} rotation={[-0.08, 0, 0]} castShadow material={mat(color, 0.6)}>
      <boxGeometry args={[0.46, 0.55, 0.06]} />
    </mesh>
    <mesh position={[0, 0.22, 0]} material={mat('#8a8d92', 0.3, {metalness: 0.6})}>
      <cylinderGeometry args={[0.025, 0.025, 0.4, 10]} />
    </mesh>
    {[0, 1, 2, 3, 4].map((i) => (
      <mesh key={i} position={[Math.sin((i / 5) * Math.PI * 2) * 0.18, 0.04, Math.cos((i / 5) * Math.PI * 2) * 0.18]} rotation={[0, (i / 5) * Math.PI * 2, 0]} material={mat('#2a2c30', 0.5)}>
        <boxGeometry args={[0.04, 0.03, 0.36]} />
      </mesh>
    ))}
  </group>
);

const JerusalemSkyline: React.FC<{seed?: number; night?: boolean; z0?: number}> = ({seed = 3, night = false, z0 = -9}) => {
  const buildings = useMemo(() => {
    const out: {x: number; z: number; w: number; d: number; h: number; c: string; heater: boolean}[] = [];
    const stones = night ? ['#4a4f63', '#555a6e', '#43485b'] : ['#e8d6b4', '#dcc59e', '#e3cfa6', '#d4bd95', '#eadcc1'];
    for (let i = 0; i < 70; i++) {
      const r = (k: number) => rand(seed * 100 + i * 7 + k);
      const z = z0 - r(1) * 26;
      out.push({
        x: -22 + r(2) * 44,
        z,
        w: 1.6 + r(3) * 2.6,
        d: 1.6 + r(4) * 2.4,
        h: 2 + r(5) * 6 + (z < z0 - 12 ? 2 : 0),
        c: stones[Math.floor(r(6) * stones.length)],
        heater: r(7) > 0.45,
      });
    }
    return out;
  }, [seed, night, z0]);
  const sky = useMemo(
    () =>
      night
        ? makeGradientTexture([[0, '#121a33'], [0.6, '#2c3560'], [1, '#5a5480']])
        : makeGradientTexture([[0, '#8fb7d6'], [0.55, '#e9d7b8'], [1, '#f7c99a']]),
    [night],
  );
  return (
    <group>
      <mesh position={[0, 14, -60]}>
        <planeGeometry args={[220, 70]} />
        <meshBasicMaterial map={sky} fog={false} />
      </mesh>
      {/* distant hills */}
      {[-30, -10, 12, 34].map((x, i) => (
        <mesh key={x} position={[x, -6, -48 - i * 2]} scale={[22, 9 + i * 1.5, 6]} material={mat(night ? '#2a2f45' : '#c9b48f', 0.9)}>
          <sphereGeometry args={[1, 24, 16]} />
        </mesh>
      ))}
      <mesh position={[0, -0.6, -24]} rotation={[-Math.PI / 2, 0, 0]} material={mat(night ? '#262a3a' : '#cdb995', 0.95)}>
        <planeGeometry args={[120, 50]} />
      </mesh>
      {buildings.map((b, i) => (
        <group key={i} position={[b.x, -0.6, b.z]}>
          <mesh position={[0, b.h / 2, 0]} material={mat(b.c, 0.85)}>
            <boxGeometry args={[b.w, b.h, b.d]} />
          </mesh>
          {/* window rows */}
          {Array.from({length: Math.floor(b.h / 1.1)}).map((_, k) => (
            <mesh key={k} position={[0, 0.9 + k * 1.05, b.d / 2 + 0.01]}>
              <planeGeometry args={[b.w * 0.75, 0.32]} />
              <meshStandardMaterial
                color={night ? (rand(i * 31 + k) > 0.45 ? '#ffd28a' : '#2a2f40') : '#7d8a92'}
                emissive={night && rand(i * 31 + k) > 0.45 ? '#ffc070' : '#000000'}
                emissiveIntensity={night ? 1.4 : 0}
                roughness={0.6}
              />
            </mesh>
          ))}
          {/* rooftop solar water heaters */}
          {b.heater && (
            <group position={[b.w * 0.2, b.h + 0.25, 0]}>
              <mesh rotation={[0, 0, Math.PI / 2]} material={mat(night ? '#666b78' : '#f1f0ec', 0.5)}>
                <cylinderGeometry args={[0.18, 0.18, 0.9, 12]} />
              </mesh>
              <mesh position={[0, -0.05, 0.45]} rotation={[-0.7, 0, 0]} material={mat('#2c3e56', 0.3, {metalness: 0.4})}>
                <boxGeometry args={[0.9, 0.04, 0.7]} />
              </mesh>
            </group>
          )}
        </group>
      ))}
      {/* cypress trees */}
      {Array.from({length: 16}).map((_, i) => (
        <mesh key={i} position={[-18 + rand(i + 50) * 36, 1.2, z0 - 1 - rand(i + 80) * 10]} scale={[0.5, 2.6, 0.5]} material={mat(night ? '#1d2a26' : '#4b6b3e', 0.8)}>
          <sphereGeometry args={[1, 12, 10]} />
        </mesh>
      ))}
    </group>
  );
};

export const Office: React.FC = () => {
  const sign = useMemo(() => makeTextTexture('hometalk', {color: '#3f6f6a', font: '700 120px Inter, sans-serif'}), []);
  const wallZ = -4.5;
  return (
    <group>
      <fog attach="fog" args={['#f2dcc0', 14, 70]} />
      <hemisphereLight args={['#fff1dc', '#b49a7c', 0.9]} />
      <ambientLight intensity={0.25} color="#ffe6c8" />
      <directionalLight
        position={[-6, 9, -12]}
        intensity={2.6}
        color="#ffd6a0"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0004}
        shadow-camera-left={-9}
        shadow-camera-right={9}
        shadow-camera-top={9}
        shadow-camera-bottom={-9}
        shadow-camera-near={1}
        shadow-camera-far={40}
      />
      <directionalLight position={[5, 4, 6]} intensity={0.45} color="#cfe0ff" />

      {/* floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow material={mat('#cfb592', 0.75)}>
        <planeGeometry args={[30, 20]} />
      </mesh>
      {/* floor planks hint */}
      {Array.from({length: 24}).map((_, i) => (
        <mesh key={i} position={[-8 + i * 0.7, 0.001, 0]} rotation={[-Math.PI / 2, 0, 0]} material={mat(i % 2 ? '#c8ad89' : '#d3ba97', 0.8)} receiveShadow>
          <planeGeometry args={[0.69, 20]} />
        </mesh>
      ))}

      {/* window wall: posts + sill + header, open glass between */}
      <mesh position={[0, 0.35, wallZ]} receiveShadow material={mat('#efe8de', 0.8)}>
        <boxGeometry args={[18, 0.7, 0.2]} />
      </mesh>
      <mesh position={[0, 3.35, wallZ]} material={mat('#efe8de', 0.8)}>
        <boxGeometry args={[18, 0.7, 0.2]} />
      </mesh>
      {Array.from({length: 8}).map((_, i) => (
        <mesh key={i} position={[-8 + i * 2.3, 1.85, wallZ]} castShadow material={mat('#3b3f44', 0.4, {metalness: 0.3})}>
          <boxGeometry args={[0.1, 2.4, 0.12]} />
        </mesh>
      ))}
      <mesh position={[0, 1.85, wallZ - 0.02]}>
        <planeGeometry args={[18, 2.3]} />
        <meshStandardMaterial color="#dfeaf0" transparent opacity={0.12} roughness={0.05} />
      </mesh>
      {/* left side wall with sign */}
      <mesh position={[-6.2, 1.9, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow material={mat('#f3ede4', 0.85)}>
        <planeGeometry args={[12, 3.8]} />
      </mesh>
      <mesh position={[-6.18, 2.3, 1.9]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[2.4, 0.6]} />
        <meshStandardMaterial map={sign} transparent roughness={0.6} />
      </mesh>
      {/* pendant lights */}
      {[-3.2, 0.4, 3.6].map((x) =>
        [-2.2, 1.2].map((z) => (
          <group key={`${x}${z}`} position={[x, 3.0, z]}>
            <mesh position={[0, 0.5, 0]} material={mat('#222', 0.5)}>
              <cylinderGeometry args={[0.006, 0.006, 1, 6]} />
            </mesh>
            <mesh material={mat('#2d3136', 0.4)}>
              <coneGeometry args={[0.22, 0.2, 20, 1, true]} />
            </mesh>
            <mesh position={[0, -0.06, 0]} material={mat('#fff2d6', 0.3, {emissive: '#ffe2b0', emissiveIntensity: 2})}>
              <sphereGeometry args={[0.06, 10, 8]} />
            </mesh>
          </group>
        )),
      )}

      {/* Yair's desk (origin) + neighbours */}
      <Desk pos={[0, 0, 0]} seed={1} />
      <Desk pos={[0, 0, -1.9]} seed={2} />
      <Desk pos={[2.4, 0, 0]} rotY={Math.PI} seed={3} mug={false} />
      <Desk pos={[2.4, 0, -1.9]} rotY={Math.PI} seed={4} />
      <Desk pos={[-2.9, 0, -2.2]} seed={5} />
      <Desk pos={[-2.9, 0, 1.0]} seed={6} />
      <OfficeChair pos={[-2.95, 0, -1.9]} rotY={Math.PI / 2 + 0.3} />
      <OfficeChair pos={[-3.25, 0, 1.0]} rotY={Math.PI / 2 - 0.2} />
      <OfficeChair pos={[2.75, 0, 0.1]} rotY={-Math.PI / 2 + 0.2} />

      {/* coffee corner (left wall) */}
      <group position={[-5.65, 0, -0.6]} rotation={[0, Math.PI / 2, 0]}>
        <mesh position={[0, 0.46, 0]} castShadow receiveShadow material={mat('#5c6b62', 0.6)}>
          <boxGeometry args={[2.2, 0.92, 0.6]} />
        </mesh>
        <mesh position={[0, 0.94, 0]} material={mat('#efe9df', 0.4)}>
          <boxGeometry args={[2.25, 0.04, 0.65]} />
        </mesh>
        <mesh position={[-0.5, 1.18, -0.05]} castShadow material={mat('#2b2d31', 0.35, {metalness: 0.4})}>
          <boxGeometry args={[0.36, 0.44, 0.34]} />
        </mesh>
        <mesh position={[0.4, 1.02, 0.05]} material={mat('#f2f2ee', 0.4)}>
          <cylinderGeometry args={[0.035, 0.03, 0.09, 14]} />
        </mesh>
        {/* shelf with plants */}
        <mesh position={[0, 2.0, -0.18]} material={mat('#b99a76', 0.6)}>
          <boxGeometry args={[2.0, 0.04, 0.3]} />
        </mesh>
        {[-0.7, 0, 0.7].map((x) => (
          <mesh key={x} position={[x, 2.15, -0.18]} material={mat('#5d8a4e', 0.7)}>
            <sphereGeometry args={[0.13, 12, 10]} />
          </mesh>
        ))}
      </group>

      {/* big floor plant */}
      <group position={[-5.3, 0, -3.6]}>
        <mesh position={[0, 0.25, 0]} material={mat('#e9e1d4', 0.6)}>
          <cylinderGeometry args={[0.25, 0.2, 0.5, 18]} />
        </mesh>
        {Array.from({length: 7}).map((_, i) => (
          <mesh key={i} position={[Math.sin(i * 2.1) * 0.25, 0.9 + i * 0.12, Math.cos(i * 2.1) * 0.25]} castShadow material={mat('#4f7d45', 0.7)}>
            <sphereGeometry args={[0.28, 12, 10]} />
          </mesh>
        ))}
      </group>

      <group position={[0, -3.8, -5]}>
        <JerusalemSkyline seed={3} />
      </group>
    </group>
  );
};

export {JerusalemSkyline};
export const _three = THREE;
