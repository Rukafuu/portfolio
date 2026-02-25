import * as THREE from 'three';
import { CelestialBodyData } from './types/solar';
import { loadTexture } from './utils/loadTextureSet';
import { SOLAR_DATA, SOLAR_CONFIG } from './data/solarData';

export class SolarFactory {
  private registry: Map<string, THREE.Object3D> = new Map();
  public hotspots: THREE.Object3D[] = [];
  public scene: THREE.Scene;
  private orbitsPaused: boolean = false;

  constructor(scene: THREE.Scene) {
    this.scene = scene;
    this.hotspots = []; 
  }

  public setPauseStatus(paused: boolean) {
    this.orbitsPaused = paused;
  }

  public createSystem() {
    this.hotspots = []; 
    // Add Sun
    const sun = this.createSun();
    this.registry.set('sun', sun);
    this.scene.add(sun);

    // Add Planets
    SOLAR_DATA.forEach((data: CelestialBodyData) => {
      const planetGroup = this.createPlanet(data);
      this.registry.set(data.id, planetGroup);
      this.scene.add(planetGroup);
    });

    // Add Voyager (Deep Space)
    const voyager = new THREE.Group();
    voyager.position.set(0, 0, 1000);
    this.registry.set('voyager', voyager);
    this.scene.add(voyager);
    
    // Add Cinematic Layered Black Hole (Gargantua - Restored & Stable)
    const blackHole = this.createBlackHole();
    blackHole.position.set(0, -10, 850); 
    this.registry.set('blackhole', blackHole);
    this.scene.add(blackHole);

    const warpPivot = new THREE.Group();
    warpPivot.name = 'warpParticles';
    this.scene.add(warpPivot);
    this.createWarpParticles(warpPivot);
  }

  private createSun() {
    const group = new THREE.Group();
    group.userData = { id: 'sun' };
    const radius = SOLAR_CONFIG.SUN_SCALE * 1.5; 
    const geometry = new THREE.SphereGeometry(radius, 64, 64);
    const texture = loadTexture('2k_sun.jpg');
    const material = new THREE.MeshStandardMaterial({
      map: texture,
      emissive: new THREE.Color('#ffaa00'),
      emissiveIntensity: 3,
      emissiveMap: texture
    });
    const mesh = new THREE.Mesh(geometry, material);
    group.add(mesh);

    const light = new THREE.PointLight('#fff1d4', 800, 2500, 1.8);
    light.castShadow = true;
    group.add(light);
    
    const subLight = new THREE.AmbientLight(0xffffff, 0.1);
    group.add(subLight);

    return group;
  }

  private createPlanet(data: CelestialBodyData) {
    const orbitGroup = new THREE.Group();
    const planetPivot = new THREE.Group(); 
    const planetGroup = new THREE.Group(); 
    
    const radius = data.radius * SOLAR_CONFIG.PLANET_RADIUS_SCALE;
    const distance = data.distance * SOLAR_CONFIG.DISTANCE_SCALE + SOLAR_CONFIG.SUN_SCALE + 5;
    
    const geometry = new THREE.SphereGeometry(radius, 64, 64);
    const texture = loadTexture(data.texture || '');
    const material = new THREE.MeshStandardMaterial({
      map: texture,
      roughness: 0.8,
      metalness: 0.1
    });
    
    const mesh = new THREE.Mesh(geometry, material);
    mesh.name = data.name;
    mesh.userData = { id: data.id };
    planetGroup.add(mesh);
    planetGroup.position.x = distance;
    planetGroup.userData = { id: data.id, orbitDistance: distance };

    if (data.moons) {
        data.moons.forEach((moon, i) => {
            const moonMesh = new THREE.Mesh(
                new THREE.SphereGeometry(moon.radius * 0.5, 32, 32),
                new THREE.MeshStandardMaterial({ map: loadTexture(moon.texture || '') })
            );
            const moonPivot = new THREE.Group();
            moonPivot.add(moonMesh);
            moonMesh.position.x = radius + (i + 1) * 2;
            moonPivot.userData = { speed: 0.5 / (i + 1) };
            planetGroup.add(moonPivot);
        });
    }

    planetPivot.add(planetGroup);
    orbitGroup.add(planetPivot);

    const curve = new THREE.EllipseCurve(0, 0, distance, distance, 0, 2 * Math.PI, false, 0);
    const points = curve.getPoints(128);
    const orbitGeom = new THREE.BufferGeometry().setFromPoints(points.map(p => new THREE.Vector3(p.x, 0, p.y)));
    const orbitMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.1 });
    orbitGroup.add(new THREE.LineLoop(orbitGeom, orbitMat));

    return orbitGroup;
  }

  /**
   * Cinematic Layered Black Hole (Gargantua Restored)
   * Restores the core sphere void with proper depth sorting.
   */
  private createBlackHole() {
    const group = new THREE.Group();
    group.name = 'Gargantua';
    
    // 1. Event Horizon (The Core Void) - BLINDADO
    const ehMat = new THREE.MeshBasicMaterial({ 
        color: 0x000000,
        fog: false, 
        toneMapped: false,
        side: THREE.DoubleSide // Permite que a câmera veja o vazio por dentro ao entrar no buraco negro
    });
    
    const eh = new THREE.Mesh(
        new THREE.SphereGeometry(18.2, 64, 64),
        ehMat
    );
    eh.name = 'eventHorizon';
    eh.renderOrder = 999; 
    group.add(eh);

    // 2. Main Accretion Disk (The Fire Ring)
    const diskGeom = new THREE.RingGeometry(18, 62, 128);
    const diskMat = new THREE.MeshStandardMaterial({
        color: '#ffaa00',
        emissive: '#ff7700',
        emissiveIntensity: 15,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.9,
    });
    const disk = new THREE.Mesh(diskGeom, diskMat);
    disk.rotation.x = Math.PI / 2;
    disk.name = 'accretionDisk';
    group.add(disk);

    // 3. Atmospheric Halo / Glow - CORRIGIDO
    // transparent e depthWrite: false são cruciais para não misturar a profundidade.
    const haloGeom = new THREE.SphereGeometry(75, 32, 32);
    const haloMat = new THREE.MeshBasicMaterial({
        color: '#ff9900',
        transparent: true,
        opacity: 0.1,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        depthWrite: false 
    });
    const halo = new THREE.Mesh(haloGeom, haloMat);
    halo.name = 'halo';
    halo.renderOrder = 1; // Renderiza antes do Event Horizon
    group.add(halo);

    return group;
  }

  private createWarpParticles(group: THREE.Group) {
      const geom = new THREE.BufferGeometry();
      const count = 1000;
      const positions = new Float32Array(count * 3);
      for(let i=0; i<count; i++) {
          positions[i*3] = (Math.random() - 0.5) * 200;
          positions[i*3+1] = (Math.random() - 0.5) * 200;
          positions[i*3+2] = (Math.random() - 0.5) * 1000 + 1000;
      }
      geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const mat = new THREE.PointsMaterial({ color: '#ffffff', size: 0.5, transparent: true, opacity: 0 });
      const points = new THREE.Points(geom, mat);
      points.name = 'points';
      group.add(points);
  }

  public getBody(name: string): THREE.Object3D | undefined {
    return this.registry.get(name);
  }

  public update(dt: number, camera?: THREE.Camera) {
    this.registry.forEach((obj, name) => {
        const planetMesh = obj.getObjectByName(name.charAt(0).toUpperCase() + name.slice(1));
        if (planetMesh) {
            planetMesh.rotation.y += dt * 0.5;
            const planetGroup = planetMesh.parent;
            if (planetGroup) {
                planetGroup.children.forEach(child => {
                    if (child.type === 'Group' && child.userData.speed) {
                        child.rotation.y += dt * child.userData.speed;
                    }
                });
            }
        }

        if (!this.orbitsPaused) {
            if (name !== 'sun' && name !== 'voyager' && name !== 'blackhole') {
                const orbitPivot = obj.children[0];
                if (orbitPivot) orbitPivot.rotation.y += dt * 0.1;
            }
        }

        if (name === 'blackhole') {
            const disk = obj.getObjectByName('accretionDisk');
            if (disk) disk.rotation.z += dt * 0.2;
            
            if (camera) {
                const dist = camera.position.distanceTo(obj.position);
                const halo = obj.getObjectByName('halo');
                
                // If we are getting very close to the center, hide the bright outer shell
                // to simulate being inside the Event Horizon
                if (dist < 50) {
                    if (halo) halo.visible = false;
                    if (disk) disk.visible = false;
                } else {
                    if (halo) halo.visible = true;
                    if (disk) disk.visible = true;
                }
            }
        }
    });
  }
}
