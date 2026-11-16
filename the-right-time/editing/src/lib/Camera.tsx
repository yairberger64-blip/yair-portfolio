import {useThree} from '@react-three/fiber';
import {useLayoutEffect} from 'react';
import {PerspectiveCamera} from 'three';
import type {V3} from './anim';

export const CameraRig: React.FC<{pos: V3; target: V3; fov?: number; roll?: number}> = ({
  pos,
  target,
  fov = 35,
  roll = 0,
}) => {
  const camera = useThree((s) => s.camera) as PerspectiveCamera;
  useLayoutEffect(() => {
    camera.position.set(...pos);
    camera.up.set(Math.sin(roll), Math.cos(roll), 0);
    camera.lookAt(...target);
    camera.fov = fov;
    camera.near = 0.05;
    camera.far = 400;
    camera.updateProjectionMatrix();
  });
  return null;
};
