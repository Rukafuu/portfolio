import * as THREE from 'three';
import { JourneyStop } from '../types/journey';

export const JOURNEY_STOPS: JourneyStop[] = [
  {
    id: 'INTRO',
    targetName: 'sun',
    cameraOffset: new THREE.Vector3(0, 80, 20),
    lookAtOffset: new THREE.Vector3(0, 0, 0),
    overlayKey: 'intro',
    fx: { bloomIntensity: 1.0, noise: 0.02 },
    enablePlanetDrag: false,
    enableLanguagePick: false,
    pauseOrbits: false
  },
  {
    id: 'SUN_TUTORIAL',
    targetName: 'sun',
    cameraOffset: new THREE.Vector3(25, 15, 30),
    lookAtOffset: new THREE.Vector3(0, 0, 0),
    overlayKey: 'tutorial',
    fx: { bloomIntensity: 4.0 },
    enablePlanetDrag: false,
    enableLanguagePick: false,
    pauseOrbits: false
  },
  {
    id: 'EARTH_LANGUAGE',
    targetName: 'earth',
    cameraOffset: new THREE.Vector3(0, 2, 8),
    lookAtOffset: new THREE.Vector3(0, 0, 0),
    overlayKey: 'language',
    fx: { bloomIntensity: 1.5, chromaticAberration: 0.002 },
    enablePlanetDrag: true,
    enableLanguagePick: true,
    pauseOrbits: true
  },
  {
    id: 'MERCURY_LIBS',
    targetName: 'mercury',
    cameraOffset: new THREE.Vector3(5, 2, 5),
    lookAtOffset: new THREE.Vector3(0, 0, 0),
    overlayKey: 'mercury',
    fx: { bloomIntensity: 1.2 },
    enablePlanetDrag: true,
    enableLanguagePick: false,
    pauseOrbits: true
  },
  {
    id: 'VENUS_STACK',
    targetName: 'venus',
    cameraOffset: new THREE.Vector3(8, 4, 8),
    lookAtOffset: new THREE.Vector3(0, 0, 0),
    overlayKey: 'venus',
    fx: { bloomIntensity: 1.5 },
    enablePlanetDrag: true,
    enableLanguagePick: false,
    pauseOrbits: true
  },
  {
    id: 'EARTH_FLYBY',
    targetName: 'earth',
    cameraOffset: new THREE.Vector3(-15, 10, -15),
    lookAtOffset: new THREE.Vector3(0, 0, 0),
    overlayKey: 'earth_flyby',
    fx: { bloomIntensity: 1.0, warpSpeed: 0.2 },
    enablePlanetDrag: false,
    enableLanguagePick: false,
    pauseOrbits: false
  },
  {
    id: 'MARS_PROJECTS',
    targetName: 'mars',
    cameraOffset: new THREE.Vector3(8, 3, 10),
    lookAtOffset: new THREE.Vector3(0, 0, 0),
    overlayKey: 'mars',
    fx: { bloomIntensity: 1.0, noise: 0.1 },
    enablePlanetDrag: true,
    enableLanguagePick: false,
    pauseOrbits: true
  },
  {
    id: 'JUPITER_AI',
    targetName: 'jupiter',
    cameraOffset: new THREE.Vector3(25, 10, 35),
    lookAtOffset: new THREE.Vector3(0, 0, 0),
    overlayKey: 'jupiter',
    fx: { bloomIntensity: 1.5 },
    enablePlanetDrag: true,
    enableLanguagePick: false,
    pauseOrbits: true
  },
  {
    id: 'SATURN_CREATIVE',
    targetName: 'saturn',
    cameraOffset: new THREE.Vector3(35, 15, 45),
    lookAtOffset: new THREE.Vector3(0, 0, 0),
    overlayKey: 'saturn',
    fx: { bloomIntensity: 1.0 },
    enablePlanetDrag: true,
    enableLanguagePick: false,
    pauseOrbits: true
  },
  {
    id: 'URANUS_CONTACT',
    targetName: 'uranus',
    cameraOffset: new THREE.Vector3(15, 8, 20),
    lookAtOffset: new THREE.Vector3(0, 0, 0),
    overlayKey: 'uranus',
    fx: { bloomIntensity: 0.8 },
    enablePlanetDrag: true,
    enableLanguagePick: false,
    pauseOrbits: true
  },
  {
    id: 'NEPTUNE_SOCIALS',
    targetName: 'neptune',
    cameraOffset: new THREE.Vector3(15, 8, 20),
    lookAtOffset: new THREE.Vector3(0, 0, 0),
    overlayKey: 'neptune',
    fx: { bloomIntensity: 0.8 },
    enablePlanetDrag: true,
    enableLanguagePick: false,
    pauseOrbits: true
  },
  {
    id: 'PLUTO_QUOTE',
    targetName: 'voyager', 
    cameraOffset: new THREE.Vector3(0, 5, 25),
    lookAtOffset: new THREE.Vector3(0, 0, 0),
    overlayKey: 'pluto_legend',
    fx: { bloomIntensity: 0.2, noise: 0.05 },
    enablePlanetDrag: false,
    enableLanguagePick: false,
    pauseOrbits: true
  },
  {
    id: 'WARP_SPEED',
    targetName: 'voyager',
    cameraOffset: new THREE.Vector3(0, 0, 100),
    lookAtOffset: new THREE.Vector3(0, 0, 1000),
    overlayKey: 'none',
    fx: { bloomIntensity: 2.0, warpSpeed: 1.0, chromaticAberration: 0.02 },
    enablePlanetDrag: false,
    enableLanguagePick: false,
    pauseOrbits: false
  },
  {
    id: 'GARGANTUA_END',
    targetName: 'blackhole',
    cameraOffset: new THREE.Vector3(0, 0, 0), // Directly inside the singularity
    lookAtOffset: new THREE.Vector3(0, 0, 100),
    overlayKey: 'finale',
    fx: { bloomIntensity: 0.1, chromaticAberration: 0.5 },
    enablePlanetDrag: false,
    enableLanguagePick: false,
    pauseOrbits: true
  }
];
