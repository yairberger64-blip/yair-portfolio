import React, {useMemo} from 'react';
import * as THREE from 'three';
import {mat} from '../characters/Character';
import {rand} from '../lib/anim';
import {JerusalemSkyline} from './Office';
import {WineGlass} from './props';

/**
 * Sharone & Katelyn's apartment, evening (creative reconstruction).
 * Couch centred at the origin facing +Z. Window wall behind the couch at z = -2.2.
 */

const rugTexture = () => {
  const c = document.createElement('canvas');
  c.width = 512;
  c.height = 512;
  const g = c.getContext('2d')!;
  g.fillStyle = '#c9b49a';
  g.fillRect(0, 0, 512, 512);
  const cols = ['#b4553f', '#e7dcc8', '#3f5e66', '#d39b45'];
  for (let i = 0; i < 14; i++) {
    g.fillStyle = cols[i % cols.length];
    g.fillRect(0, 20 + i * 34, 512, i % 2 ? 6 : 14);
  }
  g.strokeStyle = '#7a3d2f';
  g.lineWidth = 18;
  g.strokeRect(14, 14, 484, 484);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
};

const Couch: React.FC = () => {
  const fabric = '#4f7a80';
  return (
    <group>
      <mesh position={[0, 0.22, 0]} castShadow receiveShadow material={mat(fabric, 0.85)}>
        <boxGeometry args={[2.2, 0.3, 0.9]} />
      </mesh>
      {/* seat cushions */}
      {[-0.52, 0.52].map((x) => (
        <mesh key={x} position={[x, 0.43, 0.05]} castShadow receiveShadow scale={[1, 0.55, 1]} material={mat('#5a878d', 0.9)}>
          <boxGeometry args={[1.0, 0.24, 0.78]} />
        </mesh>
      ))}
      {/* back */}
      <mesh position={[0, 0.66, -0.36]} rotation={[-0.12, 0, 0]} castShadow material={mat(fabric, 0.85)}>
        <boxGeometry args={[2.2, 0.62, 0.22]} />
      </mesh>
      {[-0.52, 0.52].map((x) => (
        <mesh key={x} position={[x, 0.72, -0.2]} rotation={[-0.15, 0, 0]} castShadow material={mat('#5a878d', 0.9)}>
          <capsuleGeometry args={[0.13, 0.75, 6, 12]} />
        </mesh>
      ))}
      {/* arms */}
      {[-1.17, 1.17].map((x) => (
        <mesh key={x} position={[x, 0.42, 0]} castShadow material={mat(fabric, 0.85)}>
          <boxGeometry args={[0.18, 0.5, 0.9]} />
        </mesh>
      ))}
      {/* throw pillows */}
      <mesh position={[-0.92, 0.66, -0.12]} rotation={[0.1, 0.4, 0.15]} castShadow material={mat('#d6a24a', 0.9)}>
        <boxGeometry args={[0.38, 0.36, 0.13]} />
      </mesh>
      <mesh position={[0.94, 0.66, -0.12]} rotation={[0.1, -0.4, -0.12]} castShadow material={mat('#c2664c', 0.9)}>
        <boxGeometry args={[0.36, 0.34, 0.13]} />
      </mesh>
      {/* legs */}
      {[-1, 1].map((sx) =>
        [-1, 1].map((sz) => (
          <mesh key={`${sx}${sz}`} position={[sx * 1.0, 0.035, sz * 0.38]} material={mat('#5a3d2a', 0.5)}>
            <cylinderGeometry args={[0.025, 0.02, 0.07, 8]} />
          </mesh>
        )),
      )}
      {/* knit throw */}
      <mesh position={[0.6, 0.72, -0.34]} rotation={[-0.2, 0, 0.05]} material={mat('#efe6d6', 0.95)}>
        <boxGeometry args={[0.6, 0.5, 0.05]} />
      </mesh>
    </group>
  );
};

const StringLights: React.FC<{y: number; z: number; x0: number; x1: number; frame: number}> = ({y, z, x0, x1, frame}) => {
  const n = 22;
  return (
    <group>
      {Array.from({length: n}).map((_, i) => {
        const t = i / (n - 1);
        const x = x0 + (x1 - x0) * t;
        const sag = Math.sin(t * Math.PI) * 0.22;
        const flick = 1.6 + Math.sin(frame / 9 + i * 1.3) * 0.25;
        return (
          <mesh key={i} position={[x, y - sag, z]}>
            <sphereGeometry args={[0.022, 8, 6]} />
            <meshStandardMaterial color="#ffe2a6" emissive="#ffc867" emissiveIntensity={flick} />
          </mesh>
        );
      })}
    </group>
  );
};

export const Apartment: React.FC<{frame: number}> = ({frame}) => {
  const rug = useMemo(rugTexture, []);
  const books = useMemo(
    () =>
      Array.from({length: 26}).map((_, i) => ({
        h: 0.18 + rand(i + 3) * 0.1,
        w: 0.03 + rand(i + 11) * 0.03,
        c: ['#b4553f', '#3f5e66', '#d39b45', '#e7dcc8', '#6c4f7a', '#557a4e'][Math.floor(rand(i + 21) * 6)],
      })),
    [],
  );
  const candleFlicker = 1.2 + Math.sin(frame / 3.3) * 0.08 + Math.sin(frame / 1.7) * 0.05;
  return (
    <group>
      <fog attach="fog" args={['#1d2236', 12, 60]} />
      <hemisphereLight args={['#8f96c0', '#5a4032', 0.75]} />
      <ambientLight intensity={0.25} color="#c9b8d6" />
      {/* floor lamp key light */}
      <spotLight
        position={[-1.9, 1.7, 0.6]}
        target-position={[0, 0.6, 0.4]}
        angle={1.1}
        penumbra={0.9}
        intensity={26}
        distance={8}
        decay={1.6}
        color="#ffbf7a"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0005}
      />
      <pointLight position={[1.9, 1.2, 0.8]} intensity={7} distance={6} decay={1.8} color="#ffb067" />
      <pointLight position={[0.15, 0.62, 1.15]} intensity={candleFlicker} distance={2.5} decay={2} color="#ff9a4a" />
      {/* cool moonlight from window */}
      <directionalLight position={[2, 5, -8]} intensity={0.35} color="#8ea0e0" />
      <directionalLight position={[0.5, 2.5, 4]} intensity={0.55} color="#ffd2a8" />

      {/* floor tiles */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow material={mat('#cdbfa8', 0.55)}>
        <planeGeometry args={[14, 12]} />
      </mesh>
      {Array.from({length: 15}).map((_, i) => (
        <mesh key={i} position={[-7 + i * 1, 0.001, 0]} rotation={[-Math.PI / 2, 0, 0]} material={mat('#a8987f', 0.6)}>
          <planeGeometry args={[0.012, 12]} />
        </mesh>
      ))}
      {Array.from({length: 13}).map((_, i) => (
        <mesh key={i} position={[0, 0.001, -6 + i * 1]} rotation={[-Math.PI / 2, 0, Math.PI / 2]} material={mat('#a8987f', 0.6)}>
          <planeGeometry args={[0.012, 14]} />
        </mesh>
      ))}
      {/* rug */}
      <mesh position={[0, 0.004, 0.9]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[2.8, 1.9]} />
        <meshStandardMaterial map={rug} roughness={0.95} />
      </mesh>

      {/* back wall with a big window */}
      <group position={[0, 0, -2.2]}>
        <mesh position={[-2.9, 1.5, 0]} receiveShadow material={mat('#e9dcc6', 0.9)}>
          <boxGeometry args={[3.2, 3, 0.15]} />
        </mesh>
        <mesh position={[2.9, 1.5, 0]} receiveShadow material={mat('#e9dcc6', 0.9)}>
          <boxGeometry args={[3.2, 3, 0.15]} />
        </mesh>
        <mesh position={[0, 0.4, 0]} receiveShadow material={mat('#e9dcc6', 0.9)}>
          <boxGeometry args={[2.6, 0.8, 0.15]} />
        </mesh>
        <mesh position={[0, 2.8, 0]} material={mat('#e9dcc6', 0.9)}>
          <boxGeometry args={[2.6, 0.4, 0.15]} />
        </mesh>
        {/* window frame */}
        <mesh position={[0, 1.7, 0.02]} material={mat('#f4efe6', 0.5)}>
          <boxGeometry args={[0.05, 1.8, 0.08]} />
        </mesh>
        <mesh position={[0, 0.82, 0.05]} material={mat('#f4efe6', 0.5)}>
          <boxGeometry args={[2.7, 0.05, 0.25]} />
        </mesh>
        {/* sheer curtains */}
        {[-1.15, 1.15].map((x) => (
          <mesh key={x} position={[x, 1.65, 0.12]} material={mat('#f3ead8', 0.9, {transparent: true, opacity: 0.75})}>
            <boxGeometry args={[0.45, 2.3, 0.04]} />
          </mesh>
        ))}
        {/* framed pictures */}
        {[
          [-2.4, 1.8, '#d39b45'],
          [-3.2, 1.6, '#3f5e66'],
          [2.6, 1.75, '#b4553f'],
        ].map(([x, y, c], i) => (
          <group key={i} position={[x as number, y as number, 0.09]}>
            <mesh material={mat('#2b2420', 0.5)}>
              <boxGeometry args={[0.5, 0.62, 0.03]} />
            </mesh>
            <mesh position={[0, 0, 0.017]} material={mat(c as string, 0.8)}>
              <planeGeometry args={[0.4, 0.52]} />
            </mesh>
          </group>
        ))}
      </group>
      <StringLights y={2.55} z={-2.05} x0={-1.3} x1={1.3} frame={frame} />

      {/* side walls */}
      <mesh position={[-4.2, 1.5, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow material={mat('#e3d4bc', 0.9)}>
        <planeGeometry args={[10, 3]} />
      </mesh>
      <mesh position={[4.2, 1.5, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow material={mat('#e3d4bc', 0.9)}>
        <planeGeometry args={[10, 3]} />
      </mesh>

      <Couch />

      {/* coffee table */}
      <group position={[0, 0, 1.05]}>
        <mesh position={[0, 0.4, 0]} castShadow receiveShadow material={mat('#8a5f3e', 0.45)}>
          <boxGeometry args={[1.2, 0.05, 0.6]} />
        </mesh>
        {[-1, 1].map((sx) =>
          [-1, 1].map((sz) => (
            <mesh key={`${sx}${sz}`} position={[sx * 0.52, 0.19, sz * 0.24]} material={mat('#6a462d', 0.5)}>
              <cylinderGeometry args={[0.025, 0.02, 0.38, 8]} />
            </mesh>
          )),
        )}
        {/* wine bottle */}
        <group position={[-0.32, 0.425, -0.05]}>
          <mesh position={[0, 0.13, 0]} castShadow material={mat('#1f3a2a', 0.2, {metalness: 0.1})}>
            <cylinderGeometry args={[0.04, 0.04, 0.26, 18]} />
          </mesh>
          <mesh position={[0, 0.3, 0]} material={mat('#1f3a2a', 0.2)}>
            <cylinderGeometry args={[0.014, 0.034, 0.1, 14]} />
          </mesh>
          <mesh position={[0, 0.13, 0.041]} material={mat('#efe2c8', 0.7)}>
            <planeGeometry args={[0.05, 0.08]} />
          </mesh>
        </group>
        {/* candle */}
        <group position={[0.15, 0.425, 0.08]}>
          <mesh position={[0, 0.05, 0]} material={mat('#f3ecdf', 0.7)}>
            <cylinderGeometry args={[0.035, 0.035, 0.1, 14]} />
          </mesh>
          <mesh position={[0, 0.125, 0]} scale={[1, 1.8, 1]}>
            <sphereGeometry args={[0.012, 8, 6]} />
            <meshStandardMaterial color="#ffd27a" emissive="#ffb347" emissiveIntensity={3 * candleFlicker} />
          </mesh>
        </group>
        {/* bowl of snacks */}
        <mesh position={[0.36, 0.45, -0.06]} material={mat('#e7dcc8', 0.5)}>
          <sphereGeometry args={[0.09, 18, 10, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2]} />
        </mesh>
      </group>

      {/* floor lamp */}
      <group position={[-1.9, 0, 0.3]}>
        <mesh position={[0, 0.02, 0]} material={mat('#2a2622', 0.4)}>
          <cylinderGeometry args={[0.16, 0.18, 0.04, 20]} />
        </mesh>
        <mesh position={[0, 0.8, 0]} material={mat('#2a2622', 0.4, {metalness: 0.4})}>
          <cylinderGeometry args={[0.015, 0.015, 1.6, 8]} />
        </mesh>
        <mesh position={[0, 1.65, 0]}>
          <cylinderGeometry args={[0.16, 0.24, 0.32, 24, 1, true]} />
          <meshStandardMaterial color="#f5dfb8" emissive="#ffc27a" emissiveIntensity={1.2} side={THREE.DoubleSide} roughness={0.9} />
        </mesh>
      </group>

      {/* bookshelf (right) */}
      <group position={[2.3, 0, -1.6]}>
        <mesh position={[0, 0.9, 0]} castShadow material={mat('#9a7350', 0.6)}>
          <boxGeometry args={[1.1, 1.8, 0.35]} />
        </mesh>
        {[0.35, 0.8, 1.25].map((y, row) => {
          let x = -0.48;
          return (
            <group key={y}>
              <mesh position={[0, y - 0.03, 0.02]} material={mat('#6e5038', 0.6)}>
                <boxGeometry args={[1.0, 0.36, 0.3]} />
              </mesh>
              {books.slice(row * 8, row * 8 + 8).map((b, i) => {
                const bx = x + b.w / 2;
                x += b.w + 0.012;
                return (
                  <mesh key={i} position={[bx, y - 0.2 + b.h / 2, 0.08]} material={mat(b.c, 0.8)}>
                    <boxGeometry args={[b.w, b.h, 0.2]} />
                  </mesh>
                );
              })}
            </group>
          );
        })}
        <mesh position={[0.25, 1.95, 0]} material={mat('#5d8a4e', 0.7)}>
          <sphereGeometry args={[0.16, 12, 10]} />
        </mesh>
      </group>
      {/* side lamp on a small table (right of couch) */}
      <group position={[1.6, 0, -0.1]}>
        <mesh position={[0, 0.28, 0]} material={mat('#8a5f3e', 0.5)}>
          <cylinderGeometry args={[0.22, 0.22, 0.56, 20]} />
        </mesh>
        <mesh position={[0, 0.78, 0]}>
          <cylinderGeometry args={[0.1, 0.15, 0.2, 18, 1, true]} />
          <meshStandardMaterial color="#f5dfb8" emissive="#ffc27a" emissiveIntensity={1.1} side={THREE.DoubleSide} />
        </mesh>
      </group>
      {/* plant left */}
      <group position={[-3.4, 0, -1.6]}>
        <mesh position={[0, 0.2, 0]} material={mat('#b4553f', 0.7)}>
          <cylinderGeometry args={[0.2, 0.16, 0.4, 16]} />
        </mesh>
        {Array.from({length: 6}).map((_, i) => (
          <mesh key={i} position={[Math.sin(i * 2.3) * 0.2, 0.7 + i * 0.13, Math.cos(i * 2.3) * 0.2]} material={mat('#3f6b3a', 0.7)}>
            <sphereGeometry args={[0.24, 12, 10]} />
          </mesh>
        ))}
      </group>

      {/* night city outside */}
      <group position={[0, -4, -6]}>
        <JerusalemSkyline seed={11} night z0={-7} />
      </group>
    </group>
  );
};

export const TableGlass: React.FC<{pos: [number, number, number]; level: number}> = ({pos, level}) => (
  <group position={pos}>
    <WineGlass level={level} held={false} />
  </group>
);
