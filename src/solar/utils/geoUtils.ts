import * as THREE from 'three';

/**
 * Converts Latitude and Longitude to 3D Cartesian coordinates on a sphere.
 * @param lat Latitude in degrees
 * @param lon Longitude in degrees
 * @param radius Radius of the sphere
 * @returns [x, y, z] coordinates
 */
export const latLongToVector3 = (lat: number, lon: number, radius: number): [number, number, number] => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  
  return [x, y, z];
};
