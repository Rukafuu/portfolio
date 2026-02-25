import * as THREE from 'three';

export class CameraRig {
  private camera: THREE.PerspectiveCamera;
  private targetPos: THREE.Vector3 = new THREE.Vector3();
  private targetLookAt: THREE.Vector3 = new THREE.Vector3();
  private currentLookAt: THREE.Vector3 = new THREE.Vector3();
  private isTraveling: boolean = false;
  private travelSpeed: number = 0.05;

  constructor(camera: THREE.PerspectiveCamera) {
    this.camera = camera;
    this.targetPos.copy(camera.position);
    this.currentLookAt.set(0, 0, 0);
    this.targetLookAt.copy(this.currentLookAt);
  }

  public travelTo(position: THREE.Vector3, lookAt: THREE.Vector3, immediate: boolean = false) {
    this.targetPos.copy(position);
    this.targetLookAt.copy(lookAt);
    
    if (immediate) {
      this.camera.position.copy(position);
      this.currentLookAt.copy(lookAt);
      this.camera.lookAt(lookAt);
    } else {
      this.isTraveling = true;
    }
  }

  public isBusy(): boolean {
    return this.isTraveling && this.camera.position.distanceTo(this.targetPos) > 0.1;
  }

  public update(dt: number) {
    if (!this.isTraveling) return;

    // Smooth transition
    this.camera.position.lerp(this.targetPos, this.travelSpeed);
    this.currentLookAt.lerp(this.targetLookAt, this.travelSpeed);
    this.camera.lookAt(this.currentLookAt);

    if (this.camera.position.distanceTo(this.targetPos) < 0.01) {
      this.isTraveling = false;
    }
  }

  public getCamera() {
    return this.camera;
  }
}
