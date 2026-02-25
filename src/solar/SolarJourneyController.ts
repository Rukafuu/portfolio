import { JOURNEY_STOPS } from './data/journeyStops';
import { SolarFactory } from './SolarFactory';
import { CameraRig } from './CameraRig';
import { FocusController } from './FocusController';
import * as THREE from 'three';

export class SolarJourneyController {
  private index: number = 0;
  private factory: SolarFactory;
  private cameraRig: CameraRig;
  private focusController: FocusController;
  private onSectionChange?: (key: string) => void;
  private currentWarp: number = 0;
  private targetWarp: number = 0;

  constructor(factory: SolarFactory, cameraRig: CameraRig, focusController: FocusController) {
    this.factory = factory;
    this.cameraRig = cameraRig;
    this.focusController = focusController;

    window.addEventListener('keydown', (e) => {
      if (e.code === 'Space') {
        this.next();
      } else if (e.code === 'Backspace' || e.code === 'ArrowLeft') {
        this.prev();
      }
    });

    // Add click/tap support for mobile navigation
    window.addEventListener('click', (e) => {
        // Prevent navigation if user clicked on an interactive element (button, link)
        const target = e.target as HTMLElement;
        if (target.closest('button, a, input, [role="button"]')) return;
        
        this.next();
    });

    console.log(`JourneyController: Initialized at ${new Date().toLocaleTimeString()}`);
  }

  public setSectionCallback(cb: (key: string) => void) {
    this.onSectionChange = cb;
    this.applyStop();
  }

  public next() {
    if (this.cameraRig.isBusy()) return;

    this.index++;
    if (this.index >= JOURNEY_STOPS.length) {
      this.index = 0;
    }

    this.applyStop();
  }

  public prev() {
    if (this.cameraRig.isBusy()) return;

    this.index--;
    if (this.index < 0) {
      this.index = JOURNEY_STOPS.length - 1;
    }

    this.applyStop();
  }

  private applyStop() {
    const stop = JOURNEY_STOPS[this.index];
    if (!stop) return;

    const bodyGroup = this.factory.getBody(stop.targetName);
    if (bodyGroup) {
      let actualTarget = bodyGroup;
      if (stop.targetName !== 'sun' && stop.targetName !== 'voyager' && stop.targetName !== 'blackhole') {
          actualTarget = bodyGroup.children[0]; 
          actualTarget = actualTarget.children[0]; 
      }
      
      const targetPos = new THREE.Vector3();
      actualTarget.getWorldPosition(targetPos);

      const camPos = targetPos.clone().add(stop.cameraOffset);
      const lookAt = targetPos.clone().add(stop.lookAtOffset);

      const immediate = (this.index === 0);
      
      this.cameraRig.travelTo(camPos, lookAt, immediate);
      this.focusController.apply(stop, actualTarget);
      
      // Using the renamed method with defensive check
      if (this.factory && typeof (this.factory as any).setPauseStatus === 'function') {
        this.factory.setPauseStatus(!!stop.pauseOrbits);
      } else if (this.factory && typeof (this.factory as any).setOrbitsPaused === 'function') {
        (this.factory as any).setOrbitsPaused(!!stop.pauseOrbits);
      } else {
        console.warn("JourneyController: SolarFactory pause method not found. Sync issue?");
      }

      this.targetWarp = stop.fx.warpSpeed || 0;
      
      if (this.onSectionChange) {
        this.onSectionChange(stop.overlayKey);
      }
    }
  }

  public update(dt: number) {
    this.currentWarp = THREE.MathUtils.lerp(this.currentWarp, this.targetWarp, 0.05);
    
    // Update Warp Particles in Factory
    const warpGroup = this.factory.scene.getObjectByName('warpParticles') as THREE.Group;
    const points = warpGroup?.getObjectByName('points') as THREE.Points;
    if (points) {
        const mat = points.material as THREE.PointsMaterial;
        mat.opacity = THREE.MathUtils.lerp(mat.opacity, this.currentWarp > 0.01 ? 0.8 : 0, 0.1);
        
        const pos = points.geometry.attributes.position.array as Float32Array;
        for(let i=0; i<pos.length; i+=3) {
            pos[i+2] -= dt * 1000 * this.currentWarp;
            if (pos[i+2] < 0) pos[i+2] = 1000;
        }
        points.geometry.attributes.position.needsUpdate = true;
    }
  }

  public getIndex() {
      return this.index;
  }
}
