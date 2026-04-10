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
      emissiveIntensity: 1.5,
      emissiveMap: texture
    });
    const mesh = new THREE.Mesh(geometry, material);
    group.add(mesh);

    const light = new THREE.PointLight('#fff1d4', 400, 2500, 1.8);
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

  private createBlackHole() {
    const group = new THREE.Group();
    group.name = 'Gargantua';

    // 1. Event Horizon — pure void sphere
    const eh = new THREE.Mesh(
      new THREE.SphereGeometry(18, 64, 64),
      new THREE.MeshBasicMaterial({ color: 0x000000, fog: false, toneMapped: false })
    );
    eh.name = 'eventHorizon';
    eh.renderOrder = 999;
    group.add(eh);

    // 2. Photon sphere — thin bright ring just outside event horizon
    const photonRing = new THREE.Mesh(
      new THREE.TorusGeometry(20.5, 1.0, 16, 128),
      new THREE.MeshBasicMaterial({
        color: new THREE.Color(3.0, 2.5, 1.5),
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    );
    photonRing.rotation.x = Math.PI / 2;
    photonRing.name = 'photonRing';
    group.add(photonRing);

    // Shared disk shaders
    const diskVert = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;
    const diskFrag = `
      uniform float uTime;
      uniform float uOpacityMult;
      varying vec2 vUv;

      float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
      float noise(vec2 p) {
        vec2 i = floor(p); vec2 f = fract(p);
        f = f*f*(3.0-2.0*f);
        return mix(mix(hash(i), hash(i+vec2(1,0)), f.x),
                   mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), f.x), f.y);
      }

      void main() {
        float r = vUv.x;
        float t = uTime * 0.25;
        vec2 nc = vec2(r * 5.0 + t, vUv.y * 20.0 - t * 2.0);
        float n = noise(nc)*0.5 + noise(nc*2.1+0.7)*0.3 + noise(nc*4.3-0.3)*0.2;

        // Temperature gradient: white-hot inner → orange → dim red outer
        vec3 c1 = vec3(1.0, 0.97, 0.82);
        vec3 c2 = vec3(1.0, 0.50, 0.04);
        vec3 c3 = vec3(0.60, 0.09, 0.01);
        vec3 color = r < 0.35 ? mix(c1, c2, r/0.35) : mix(c2, c3, (r-0.35)/0.65);
        color += n * 0.25 * vec3(1.0, 0.5, 0.1);

        float alpha = (1.0-smoothstep(0.78,1.0,r)) * smoothstep(0.0,0.07,r) * (0.55+n*0.45);
        float emissive = 4.0 + n * 3.0;

        gl_FragColor = vec4(color * emissive, alpha * 0.92 * uOpacityMult);
      }
    `;

    // 3. Main accretion disk (horizontal)
    const diskMat = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 }, uOpacityMult: { value: 1.0 } },
      vertexShader: diskVert,
      fragmentShader: diskFrag,
      side: THREE.DoubleSide,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const disk = new THREE.Mesh(new THREE.RingGeometry(21, 65, 128, 4), diskMat);
    disk.rotation.x = Math.PI / 2;
    disk.name = 'accretionDisk';
    group.add(disk);

    // 4. Ghost disk — relativistic lensing mirror image (tilted ~20°, smaller, dimmer)
    const ghostMat = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 }, uOpacityMult: { value: 0.35 } },
      vertexShader: diskVert,
      fragmentShader: diskFrag,
      side: THREE.DoubleSide,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const ghostDisk = new THREE.Mesh(new THREE.RingGeometry(21, 48, 128, 4), ghostMat);
    ghostDisk.rotation.x = Math.PI / 2 + 0.38;
    ghostDisk.name = 'ghostDisk';
    group.add(ghostDisk);

    // 5. Inner corona (tight glow hugging the event horizon)
    group.add(Object.assign(
      new THREE.Mesh(
        new THREE.SphereGeometry(27, 32, 32),
        new THREE.MeshBasicMaterial({
          color: new THREE.Color(1.8, 0.55, 0.08),
          transparent: true, opacity: 0.13,
          side: THREE.BackSide,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        })
      ),
      { name: 'corona' }
    ));

    // 6. Outer atmospheric halo
    const halo = new THREE.Mesh(
      new THREE.SphereGeometry(88, 32, 32),
      new THREE.MeshBasicMaterial({
        color: new THREE.Color('#ff5500'),
        transparent: true, opacity: 0.055,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    );
    halo.name = 'halo';
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
            const disk = obj.getObjectByName('accretionDisk') as THREE.Mesh | undefined;
            const ghostDisk = obj.getObjectByName('ghostDisk') as THREE.Mesh | undefined;

            if (disk) {
                disk.rotation.z += dt * 0.18;
                (disk.material as THREE.ShaderMaterial).uniforms.uTime.value += dt;
            }
            if (ghostDisk) {
                ghostDisk.rotation.z += dt * 0.12;
                (ghostDisk.material as THREE.ShaderMaterial).uniforms.uTime.value += dt;
            }

            if (camera) {
                const dist = camera.position.distanceTo(obj.position);
                const inside = dist < 50;
                ['halo', 'corona', 'accretionDisk', 'ghostDisk', 'photonRing'].forEach(n => {
                    const o = obj.getObjectByName(n);
                    if (o) o.visible = !inside;
                });
            }
        }
    });
  }
}
