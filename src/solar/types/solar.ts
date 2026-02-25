export interface CelestialBodyData {
  id: string;
  name: string;
  radius: number;
  distance: number;
  rotationSpeed: number;
  orbitSpeed: number;
  color?: string;
  texture?: string;
  normalMap?: string;
  roughnessMap?: string;
  rings?: {
    innerRadius: number;
    outerRadius: number;
    texture: string;
  };
  moons?: CelestialBodyData[];
}

export interface SolarSystemConfig {
  PLANET_RADIUS_SCALE: number;
  DISTANCE_SCALE: number;
  ORBIT_SPEED_SCALE: number;
  ROTATION_SPEED_SCALE: number;
  SUN_SCALE: number;
}
