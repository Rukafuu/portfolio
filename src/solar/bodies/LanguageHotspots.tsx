import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Html } from '@react-three/drei';
import { ThreeEvent } from '@react-three/fiber';
import { latLongToVector3 } from '../utils/geoUtils';

interface HotspotProps {
  lat: number;
  lon: number;
  label: string;
  langCode: string;
  radius: number;
}

const Hotspot = ({ lat, lon, label, langCode, radius }: HotspotProps) => {
  const { i18n } = useTranslation();
  const [hovered, setHovered] = useState(false);
  const pos = useMemo(() => latLongToVector3(lat, lon, radius * 1.02), [lat, lon, radius]);

  const handleSelect = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    i18n.changeLanguage(langCode);
  };

  return (
    <group position={pos}>
      <mesh 
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { setHovered(false); document.body.style.cursor = 'default'; }}
        onClick={handleSelect}
      >
        <sphereGeometry args={[radius * 0.03, 16, 16]} />
        <meshStandardMaterial 
          color={hovered ? "#ff2d55" : "#00f2fe"} 
          emissive={hovered ? "#ff2d55" : "#00f2fe"}
          emissiveIntensity={hovered ? 10 : 4}
        />
      </mesh>
      
      {hovered && (
        <Html distanceFactor={radius * 10}>
          <div className="mono" style={{ 
            background: 'var(--glass)', 
            padding: '4px 8px', 
            border: '1px solid var(--primary)',
            color: 'white',
            fontSize: '10px',
            whiteSpace: 'nowrap',
            transform: 'translate(10px, -20px)',
            pointerEvents: 'none'
          }}>
            {label} [{langCode.toUpperCase()}]
          </div>
        </Html>
      )}
    </group>
  );
};

export const LanguageHotspots = ({ radius }: { radius: number }) => {
  return (
    <group>
      <Hotspot lat={-15.79} lon={-47.89} label="BRAZIL" langCode="pt" radius={radius} />
      <Hotspot lat={38.89} lon={-77.03} label="USA" langCode="en" radius={radius} />
      <Hotspot lat={40.41} lon={-3.70} label="SPAIN" langCode="es" radius={radius} />
      <Hotspot lat={52.52} lon={13.40} label="GERMANY" langCode="de" radius={radius} />
      <Hotspot lat={35.67} lon={139.65} label="JAPAN" langCode="ja" radius={radius} />
    </group>
  );
};
