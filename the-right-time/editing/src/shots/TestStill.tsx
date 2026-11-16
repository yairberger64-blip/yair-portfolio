import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {ThreeCanvas} from '@remotion/three';
import {CameraRig} from '../lib/Camera';
import {Character, basePose} from '../characters/Character';
import {YAIR_2017, SHARONE_2017, KATELYN_2017} from '../characters/specs';
import {Office, OfficeChair} from '../sets/Office';
import {Apartment} from '../sets/Apartment';

export const TestOffice: React.FC = () => {
  return (
    <AbsoluteFill style={{background: '#000'}}>
      <ThreeCanvas width={1920} height={1080} shadows camera={{fov: 35}}>
        <CameraRig pos={[-0.4, 1.35, 3.3]} target={[-0.3, 1.0, 0]} />
        <Office />
        <OfficeChair pos={[-0.4, 0, 0]} rotY={Math.PI / 2} />
        <Character spec={YAIR_2017} pose={basePose({pos: [-0.35, 0, 0], rotY: Math.PI / 2, sit: true, lean: 0.15,
          armL: {fwd: 1.15, side: 0.05, elbow: 0.35}, armR: {fwd: 1.15, side: 0.05, elbow: 0.35}})} />
        <Character spec={KATELYN_2017} pose={basePose({pos: [-1.2, 0, 0.1], rotY: 1.2, smile: 0.7})} />
      </ThreeCanvas>
    </AbsoluteFill>
  );
};

export const TestLineup: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: '#000'}}>
      <ThreeCanvas width={1920} height={1080} shadows camera={{fov: 30}}>
        <CameraRig pos={[0, 1.45, 3.4]} target={[0, 1.35, 0]} />
        <Apartment frame={f} />
        <Character spec={KATELYN_2017} pose={basePose({pos: [-0.7, 0, 0.6], rotY: 0.2, smile: 0.8})} />
        <Character spec={YAIR_2017} pose={basePose({pos: [0, 0, 0.6], smile: 0.9, mouthOpen: 0.4})} />
        <Character spec={SHARONE_2017} pose={basePose({pos: [0.7, 0, 0.6], rotY: -0.2, smile: 0.6})} />
      </ThreeCanvas>
    </AbsoluteFill>
  );
};
