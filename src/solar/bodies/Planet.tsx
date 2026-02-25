import { useRef, useMemo, useEffect, useState } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { CelestialBodyData } from '../types/solar';
import { SOLAR_CONFIG } from '../data/solarData';
import { loadTexture } from '../utils/loadTextureSet';
import { LanguageHotspots } from './LanguageHotspots';
import { Float } from '@react-three/drei';

interface PlanetProps {
  data: CelestialBodyData;
  showOrbit?: boolean;
}

export const Planet = ({ data, showOrbit = true }: PlanetProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const planetRef = useRef<THREE.Mesh>(null);
  const orbitRef = useRef<THREE.Group>(null);
  const isPaused = useRef(false);
  const [hovered, setHovered] = useState(false);
  const [orbitVisible, setOrbitVisible] = useState(showOrbit);

  useEffect(() => {
    const handlePause = (e: any) => { isPaused.current = e.detail; };
    const handleOrbits = () => { setOrbitVisible(prev => !prev); };
    window.addEventListener('solar-pause', handlePause);
    window.addEventListener('solar-orbits', handleOrbits);
    return () => {
      window.removeEventListener('solar-pause', handlePause);
      window.removeEventListener('solar-orbits', handleOrbits);
    };
  }, []);

  const texture = useMemo(() => loadTexture(data.texture || ''), [data.texture]);
  const normalMap = useMemo(() => data.normalMap ? loadTexture(data.normalMap) : undefined, [data.normalMap]);

  const scaledRadius = data.radius * SOLAR_CONFIG.PLANET_RADIUS_SCALE;
  const scaledDistance = data.distance * SOLAR_CONFIG.DISTANCE_SCALE + SOLAR_CONFIG.SUN_SCALE + 2;

  useFrame((state, delta) => {
    if (isPaused.current) return;
    
    // Rotation (Spin)
    if (planetRef.current) {
      planetRef.current.rotation.y += delta * data.rotationSpeed * SOLAR_CONFIG.ROTATION_SPEED_SCALE;
    }

    // Translation (Orbit)
    if (orbitRef.current) {
      orbitRef.current.rotation.y += delta * data.orbitSpeed * SOLAR_CONFIG.ORBIT_SPEED_SCALE;
    }
  });

  // Orbit Line Geometry
  const orbitPoints = useMemo(() => {
    const points = [];
    for (let i = 0; i <= 128; i++) {
      const angle = (i / 128) * Math.PI * 2;
      points.push(new THREE.Vector3(Math.cos(angle) * scaledDistance, 0, Math.sin(angle) * scaledDistance));
    }
    return points;
  }, [scaledDistance]);

  return (
    <group ref={orbitRef}>
      {/* Orbit Line */}
      {orbitVisible && (
        <line>
          <bufferGeometry attach="geometry" setFromPoints={orbitPoints} />
          <lineBasicMaterial attach="material" color="#ffffff" transparent opacity={0.15} />
        </line>
      )}

      {/* Planet Group at specific distance */}
      <group position={[scaledDistance, 0, 0]}>
        <mesh 
          ref={planetRef}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <sphereGeometry args={[scaledRadius, 64, 64]} />
          <meshStandardMaterial
            map={texture}
            normalMap={normalMap}
            roughness={0.8}
            metalness={0.1}
          />
        </mesh>

        {hovered && (
          <Html distanceFactor={20}>
            <div className="mono" style={{
              background: 'var(--glass)',
              padding: '5px 10px',
              border: '1px solid var(--primary)',
              color: 'white',
              fontSize: '10px',
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
              transform: 'translate(10px, -20px)'
            }}>
              {data.name.toUpperCase()}
            </div>
          </Html>
        )}

        {/* EARTH SPECIAL FEATURES */}
        {data.id === 'earth' && (
          <>
            <LanguageHotspots radius={scaledRadius} />
            
            {/* Grid Atmosphere */}
            <mesh scale={1.01}>
              <sphereGeometry args={[scaledRadius, 32, 32]} />
              <meshStandardMaterial 
                color="#00f2fe" 
                wireframe 
                transparent 
                opacity={0.1} 
              />
            </mesh>

            {/* Glow */}
            <mesh scale={1.1}>
              <sphereGeometry args={[scaledRadius, 64, 64]} />
              <meshStandardMaterial 
                color="#4facfe" 
                transparent 
                opacity={0.05} 
                side={THREE.BackSide}
              />
            </mesh>

            {/* Orbital Cyber Ring */}
            <Float speed={2} rotationIntensity={1} floatIntensity={0.5}>
              <mesh rotation={[Math.PI / 2.5, 0, 0]}>
                  <torusGeometry args={[scaledRadius * 1.5, 0.005, 16, 100]} />
                  <meshBasicMaterial color="#00f2fe" transparent opacity={0.3} />
              </mesh>
            </Float>
          </>
        )}

        {/* Rings for Saturn/Uranus */}
        {data.rings && (
          <mesh rotation={[Math.PI / 2.5, 0, 0]}>
            <ringGeometry args={[
              scaledRadius * data.rings.innerRadius,
              scaledRadius * data.rings.outerRadius,
              64
            ]} />
            <meshStandardMaterial
              map={loadTexture(data.rings.texture)}
              transparent
              side={THREE.DoubleSide}
              opacity={0.8}
            />
          </mesh>
        )}

        {/* Moons */}
        {data.moons?.map((moon) => (
          <Moon key={moon.id} data={moon} parentRadius={scaledRadius} />
        ))}
      </group>
    </group>
  );
};

interface MoonProps {
  data: CelestialBodyData;
  parentRadius: number;
}

const Moon = ({ data, parentRadius }: MoonProps) => {
  const moonOrbitRef = useRef<THREE.Group>(null);
  const moonRef = useRef<THREE.Mesh>(null);

  const texture = useMemo(() => loadTexture(data.texture || ''), [data.texture]);
  const scaledRadius = data.radius * SOLAR_CONFIG.PLANET_RADIUS_SCALE * 0.5;
  const scaledDistance = parentRadius + (data.distance * 2);

  useFrame((state, delta) => {
    if (moonOrbitRef.current) {
      moonOrbitRef.current.rotation.y += delta * data.orbitSpeed * SOLAR_CONFIG.ORBIT_SPEED_SCALE;
    }
    if (moonRef.current) {
      moonRef.current.rotation.y += delta * data.rotationSpeed * SOLAR_CONFIG.ROTATION_SPEED_SCALE;
    }
  });

  return (
    <group ref={moonOrbitRef}>
      <mesh ref={moonRef} position={[scaledDistance, 0, 0]}>
        <sphereGeometry args={[scaledRadius, 32, 32]} />
        <meshStandardMaterial map={texture} />
      </mesh>
    </group>
  );
};
