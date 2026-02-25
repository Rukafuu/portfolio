import * as THREE from 'three';

export interface JourneyStop {
  id: string;
  targetName: string;
  cameraOffset: THREE.Vector3;
  lookAtOffset: THREE.Vector3;
  overlayKey: string;
  fx: {
    bloomIntensity?: number;
    chromaticAberration?: number;
    pixelation?: boolean;
    noise?: number;
    warpSpeed?: number; // 0 to 1
  };
  enablePlanetDrag: boolean;
  enableLanguagePick: boolean;
  pauseOrbits?: boolean;
}

export interface PortfolioSection {
  title: string;
  body: string;
  cards?: Array<{
    title: string;
    description: string;
    link?: string;
    tech?: string[];
    repo?: string;
  }>;
  links?: Array<{
    label: string;
    url: string;
    icon?: string;
  }>;
  tech?: string[];
}
