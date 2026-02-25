import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { JourneyStop } from './types/journey';

export class FocusController {
  private camera: THREE.Camera;
  private domElement: HTMLElement;
  private controls: OrbitControls;
  private raycaster: THREE.Raycaster = new THREE.Raycaster();
  private mouse: THREE.Vector2 = new THREE.Vector2();
  private hotspots: THREE.Object3D[] = [];
  private onLanguagePick?: (lang: string) => void;

  constructor(camera: THREE.Camera, domElement: HTMLElement) {
    this.camera = camera;
    this.domElement = domElement;
    this.controls = new OrbitControls(camera, domElement);
    this.controls.enableDamping = true;
    this.controls.enabled = false;
    
    this.domElement.addEventListener('click', this.handleInteract.bind(this));
  }

  public apply(stop: JourneyStop, target?: THREE.Object3D) {
    if (stop.enablePlanetDrag && target) {
      this.controls.enabled = true;
      // Find the actual planet mesh (likely at index 0 of the group or specifically named)
      const worldPos = new THREE.Vector3();
      target.getWorldPosition(worldPos);
      this.controls.target.copy(worldPos);
      this.controls.minDistance = target.userData.id === 'sun' ? 10 : 2;
      this.controls.maxDistance = 60;
      this.controls.maxPolarAngle = Math.PI * 0.8;
      this.controls.minPolarAngle = Math.PI * 0.2;
    } else {
      this.controls.enabled = false;
    }
  }

  public setHotspots(objects: THREE.Object3D[], onPick: (lang: string) => void) {
    this.hotspots = objects;
    this.onLanguagePick = onPick;
  }

  private handleInteract(event: MouseEvent) {
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);
    this.raycaster.params.Points.threshold = 0.1; // Help with small hitboxes
    const intersects = this.raycaster.intersectObjects(this.hotspots, true);

    if (intersects.length > 0) {
      const picked = intersects[0].object;
      const lang = picked.userData.langCode;
      if (lang && this.onLanguagePick) {
        this.onLanguagePick(lang);
      }
    }
  }

  public update() {
    if (this.controls.enabled) {
      this.controls.update();
    }
  }
}
