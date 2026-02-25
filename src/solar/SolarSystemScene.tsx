import { useRef, useState, useEffect } from 'react';
import { Sun } from './bodies/Sun';
import { Planet } from './bodies/Planet';
import { SOLAR_DATA } from './data/solarData';
import { Stars, OrbitControls, Environment } from '@react-three/drei';
import { SolarCameraController } from './utils/SolarCameraController';
import { BlackHole } from './bodies/DeepSpaceAnomalies';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';

export const SolarSystemScene = () => {
  const [showOrbits] = useState(true);
  const { gl, scene } = useThree();

  useEffect(() => {
    // Renderer Settings for realistic physical lighting
    gl.toneMapping = THREE.ACESFilmicToneMapping;
    gl.toneMappingExposure = 1.0;
    // Note: gl.outputColorSpace is handled by R3F/default settings usually, 
    // but we ensure consistency here.
  }, [gl]);

  return (
    <>
      <SolarCameraController />
      <OrbitControls 
        makeDefault 
        minDistance={10} 
        maxDistance={400} 
        enableDamping 
        dampingFactor={0.05}
      />
      
      <Stars radius={300} depth={60} count={10000} factor={7} saturation={0} fade speed={1} />
      
      {/* Environment Map (CRITICAL for refraction) */}
      <Environment 
        files="/textures/solar/2k_stars.jpg" 
        background={false} // Don't replace the Stars component as background
      />

      {/* Ambient light for visibility of dark sides */}
      <ambientLight intensity={0.05} />

      <Sun />

      {SOLAR_DATA.map((planet) => (
        <Planet 
          key={planet.id} 
          data={planet} 
          showOrbit={showOrbits} 
        />
      ))}

      <BlackHole />
    </>
  );
};
