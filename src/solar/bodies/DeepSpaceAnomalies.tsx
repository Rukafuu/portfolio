import { useRef, useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { useScroll, useFBO } from '@react-three/drei';
import { BlackHole as CinematicBlackHole } from '../objects/BlackHole';

export const BlackHole = () => {
    const groupRef = useRef<THREE.Group>(null);
    const bhInstance = useRef<CinematicBlackHole | null>(null);
    const scroll = useScroll();
    const { gl, scene, camera } = useThree();

    // 1. Create the Render Target (FBO) to capture the scene
    const fbo = useFBO({
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBAFormat,
        stencilBuffer: false,
    });
    
    useEffect(() => {
        if (!bhInstance.current) {
            bhInstance.current = new CinematicBlackHole();
            if (groupRef.current) {
                groupRef.current.add(bhInstance.current);
            }
        }
    }, []);

    useFrame((state) => {
        const offset = scroll.offset;
        const visible = offset >= 0.7;
        const isTouchingSingularity = offset > 0.985;
        
        if (!groupRef.current || !bhInstance.current) return;

        // --- FBO RENDER LOOP OVERRIDE ---
        
        // A. Hide the lens mesh so we don't render it into the FBO
        bhInstance.current.setLensVisible(false);

        // B. Render the scene (including the disk and event horizon) into the FBO
        gl.setRenderTarget(fbo);
        gl.render(scene, camera);
        gl.setRenderTarget(null);

        // C. Show the lens mesh and attach the captured texture
        bhInstance.current.setLensVisible(true);
        bhInstance.current.lensMaterial.uniforms.tDiffuse.value = fbo.texture;
        
        // --- END FBO OVERRIDE ---

        // Internal animations (spinning disk, etc.)
        bhInstance.current.update(state.clock.elapsedTime);

        // Scaling logic based on portfolio scroll
        let targetScale = 0;
        if (isTouchingSingularity) {
            targetScale = 20; // Final consumption
        } else {
            targetScale = visible ? 1.0 : 0;
        }

        const currentScale = groupRef.current.scale.x;
        const lerpFactor = isTouchingSingularity ? 0.05 : 0.1;
        groupRef.current.scale.setScalar(THREE.MathUtils.lerp(currentScale, targetScale, lerpFactor));
        
        // Reset logic
        if (offset >= 0.999) {
             scroll.el.scrollTo({ top: 0, behavior: 'auto' });
        }
    });

    return (
        <group ref={groupRef} position={[0, -10, 800]} scale={0} />
    );
};
