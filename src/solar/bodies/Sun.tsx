import { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { loadTexture } from '../utils/loadTextureSet';
import { SOLAR_CONFIG } from '../data/solarData';

export const Sun = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = loadTexture('2k_sun.jpg');

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
    }
  });

  const radius = SOLAR_CONFIG.SUN_SCALE;

  return (
    <group>
      <mesh ref={meshRef}>
        <sphereGeometry args={[radius, 64, 64]} />
        <meshStandardMaterial
          map={texture}
          emissive={new THREE.Color('#ffcc33')}
          emissiveIntensity={2}
          emissiveMap={texture}
        />
      </mesh>
      {/* Principal Light Source */}
      <pointLight intensity={10} distance={100} decay={1} color="#fff1d4" />
      <pointLight intensity={2} distance={300} decay={0.5} />
    </group>
  );
};
