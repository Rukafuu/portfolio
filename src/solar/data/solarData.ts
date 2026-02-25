import { CelestialBodyData, SolarSystemConfig } from '../types/solar';

export const SOLAR_CONFIG: SolarSystemConfig = {
  PLANET_RADIUS_SCALE: 1,
  DISTANCE_SCALE: 25,
  ORBIT_SPEED_SCALE: 0.05,
  ROTATION_SPEED_SCALE: 0.1,
  SUN_SCALE: 8,
};

export const SOLAR_DATA: CelestialBodyData[] = [
  {
    id: 'mercury',
    name: 'Mercury',
    radius: 0.4,
    distance: 0.4,
    rotationSpeed: 0.01,
    orbitSpeed: 4.1,
    texture: '2k_mercury.jpg',
  },
  {
    id: 'venus',
    name: 'Venus',
    radius: 0.9,
    distance: 0.7,
    rotationSpeed: -0.002,
    orbitSpeed: 1.6,
    texture: '2k_venus_atmosphere.jpg',
  },
  {
    id: 'earth',
    name: 'Earth',
    radius: 1,
    distance: 1.1,
    rotationSpeed: 1,
    orbitSpeed: 1,
    texture: '2k_earth_daymap.jpg',
    moons: [
      { id: 'moon', name: 'Moon', radius: 0.25, distance: 2, rotationSpeed: 0.03, orbitSpeed: 12, texture: '2k_moon.jpg' }
    ],
  },
  {
    id: 'mars',
    name: 'Mars',
    radius: 0.6,
    distance: 1.6,
    rotationSpeed: 0.9,
    orbitSpeed: 0.5,
    texture: '2k_mars.jpg',
    moons: [
        { id: 'phobos', name: 'Phobos', radius: 0.1, distance: 1.2, rotationSpeed: 0.1, orbitSpeed: 5, texture: '2k_moon.jpg' },
        { id: 'deimos', name: 'Deimos', radius: 0.1, distance: 1.8, rotationSpeed: 0.1, orbitSpeed: 3, texture: '2k_moon.jpg' }
    ]
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    radius: 3.5,
    distance: 4.2,
    rotationSpeed: 2.4,
    orbitSpeed: 0.08,
    texture: '2k_jupiter.jpg',
    moons: [
        { id: 'europa', name: 'Europa', radius: 0.2, distance: 5, rotationSpeed: 0.1, orbitSpeed: 2, texture: '2k_moon.jpg' }
    ]
  },
  {
    id: 'saturn',
    name: 'Saturn',
    radius: 3.2,
    distance: 7.5,
    rotationSpeed: 2.2,
    orbitSpeed: 0.03,
    texture: '2k_saturn.jpg',
    rings: {
      innerRadius: 1.4,
      outerRadius: 2.8,
      texture: '2k_saturn_ring_alpha.png',
    },
    moons: [
        { id: 'titan', name: 'Titan', radius: 0.4, distance: 6, rotationSpeed: 0.1, orbitSpeed: 1.5, texture: '2k_moon.jpg' }
    ]
  },
  {
    id: 'uranus',
    name: 'Uranus',
    radius: 1.8,
    distance: 14.2,
    rotationSpeed: -1.4,
    orbitSpeed: 0.011,
    texture: '2k_uranus.jpg',
  },
  {
    id: 'neptune',
    name: 'Neptune',
    radius: 1.8,
    distance: 19.1,
    rotationSpeed: 1.5,
    orbitSpeed: 0.006,
    texture: '2k_neptune.jpg',
  },
];
