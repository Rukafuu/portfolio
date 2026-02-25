import { ScrollControls, Scroll } from '@react-three/drei';
import { EffectComposer, Bloom, Noise, Vignette, ChromaticAberration } from '@react-three/postprocessing';
import { SolarSystemScene } from '../solar/SolarSystemScene';
import Overlay from './Overlay';

export default function Experience() {
  return (
    <>
      <color attach="background" args={['#000005']} />
      
      {/* 
          Increased pages for a longer journey through the solar system.
          Damping increased for 'heavy' cinematic feel.
      */}
      <ScrollControls pages={6} damping={0.4}>
        <SolarSystemScene />
        
        <EffectComposer>
            <Bloom luminanceThreshold={1} mipmapBlur intensity={1.0} radius={0.4} />
            <Noise opacity={0.02} />
            <ChromaticAberration offset={[0.0005, 0.0005]} />
            <Vignette eskil={false} offset={0.1} darkness={1.1} />
        </EffectComposer>

        <Scroll html>
            <Overlay />
        </Scroll>
      </ScrollControls>
    </>
  );
}
