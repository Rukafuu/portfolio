import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { SolarFactory } from './SolarFactory';
import { CameraRig } from './CameraRig';
import { FocusController } from './FocusController';
import { SolarJourneyController } from './SolarJourneyController';
import { JOURNEY_STOPS } from './data/journeyStops';

export class SolarExperience {
  public renderer: THREE.WebGLRenderer;
  public camera: THREE.PerspectiveCamera;
  public scene: THREE.Scene;
  private lastTime: number = 0;
  public composer: EffectComposer;
  
  public factory: SolarFactory;
  public cameraRig: CameraRig;
  public focusController: FocusController;
  public journey: SolarJourneyController;

  private bloomPass: UnrealBloomPass;
  private canvas: HTMLCanvasElement;
  private frameId: number = 0;
  private isDestroyed: boolean = false;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color('#000005');
    
    const aspect = window.innerWidth / window.innerHeight;
    this.camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 15000);
    this.lastTime = performance.now();

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;

    // Post-Processing
    this.composer = new EffectComposer(this.renderer);
    this.composer.setSize(window.innerWidth, window.innerHeight);
    
    const renderPass = new RenderPass(this.scene, this.camera);
    this.composer.addPass(renderPass);
    
    this.bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.5, 0.4, 0.85
    );
    this.composer.addPass(this.bloomPass);

    // Modules
    this.factory = new SolarFactory(this.scene);
    this.cameraRig = new CameraRig(this.camera);
    this.focusController = new FocusController(this.camera, this.canvas);
    this.journey = new SolarJourneyController(this.factory, this.cameraRig, this.focusController);

    this.init();
    
    this.animate = this.animate.bind(this);
    this.animate();
    
    window.addEventListener('resize', this.onResize.bind(this));
    console.log("SolarExperience: Engine Ready (Layered Geometry Mode)");
  }

  private init() {
    this.factory.createSystem();
    
    // Background Stars
    const starGeometry = new THREE.BufferGeometry();
    const starCount = 15000;
    const posArray = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i++) {
        const radius = 2500 + Math.random() * 5000;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        posArray[i] = radius * Math.sin(phi) * Math.cos(theta);
        posArray[i+1] = radius * Math.sin(phi) * Math.sin(theta);
        posArray[i+2] = radius * Math.cos(phi);
    }
    starGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const starMaterial = new THREE.PointsMaterial({ size: 2, color: 0xffffff, transparent: true, opacity: 0.8 });
    this.scene.add(new THREE.Points(starGeometry, starMaterial));

    // Global Fill
    const hemiLight = new THREE.HemisphereLight(0x4433aa, 0x000000, 0.4);
    this.scene.add(hemiLight);

    // Initial position
    this.camera.position.set(0, 150, 300);
    this.camera.lookAt(0, 0, 0);
  }

  private onResize = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
    this.composer.setSize(width, height);
  };

  private animate() {
    if (this.isDestroyed) return;
    this.frameId = requestAnimationFrame(this.animate);
    
    const currentTime = performance.now();
    const dt = Math.min((currentTime - this.lastTime) / 1000, 0.1);
    this.lastTime = currentTime;
    
    this.factory.update(dt, this.camera);
    this.cameraRig.update(dt);
    this.focusController.update();
    this.journey.update(dt);

    // Update Bloom strength & Finale Visuals
    if (this.journey) {
        const stopIdx = this.journey.getIndex();
        const stop = JOURNEY_STOPS[stopIdx];
        if (stop && stop.fx) {
            this.bloomPass.strength = THREE.MathUtils.lerp(this.bloomPass.strength, stop.fx.bloomIntensity || 1.5, 0.05);
            
            // Finale: Hide Stars & Blacken Background
            const isFinale = stop.id === 'GARGANTUA_END';
            const stars = this.scene.getObjectByProperty('type', 'Points');
            if (stars) stars.visible = !isFinale;
            
            const targetBg = isFinale ? new THREE.Color('#000000') : new THREE.Color('#000005');
            this.scene.background = (this.scene.background as THREE.Color).lerp(targetBg, 0.05);
        }
    }

    this.composer.render();
  }

  public destroy() {
    this.isDestroyed = true;
    cancelAnimationFrame(this.frameId);
    window.removeEventListener('resize', this.onResize);
    this.renderer.dispose();
    this.scene.clear();
    console.log("SolarExperience: Engine Destroyed");
  }
}
