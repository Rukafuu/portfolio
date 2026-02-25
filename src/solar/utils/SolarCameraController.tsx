import { useFrame, useThree } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import * as THREE from 'three';
import { useRef } from 'react';

export const SolarCameraController = () => {
  const scroll = useScroll();
  const { camera } = useThree();

  useFrame((state, delta) => {
    const offset = scroll.offset; // 0 to 1

    // PATH: INNER SYSTEM -> OUTER SYSTEM -> BEYOND
    // Distance goes from Sun (0) to Neptune (~600)
    
    // We want a cinematic sweep. 
    // Start zoomed in on the Sun/Inner Planets
    // End looking at the entire system or the anomaly
    const maxDistance = 700;
    
    // Camera Position Path
    const targetZ = -50 + (offset * (maxDistance + 100)); // Moves forward
    const targetX = Math.sin(offset * Math.PI * 2) * 50;  // Lateral sweep
    const targetY = 30 + Math.cos(offset * Math.PI) * 20; // Altitude change

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.03);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.03);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.03);
    
    // Look at a point that also moves forward
    const lookTargetZ = offset * maxDistance;
    camera.lookAt(0, 0, lookTargetZ);
  });

  return null;
};
