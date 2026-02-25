import { useRef, useEffect, useState } from 'react';
import { SolarExperience } from './solar/SolarExperience';
import { OverlayUI } from './solar/ui/OverlayUI';
import { AudioManager } from './solar/utils/AudioManager';
import { AudioUI } from './solar/ui/AudioUI';
import LoadingScreen from './components/LoadingScreen';
import StaticHUD from './components/StaticHUD';
import { useTranslation } from 'react-i18next';

export default function App() {
  const { i18n } = useTranslation();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<SolarExperience | null>(null);
  const audioManager = useRef(new AudioManager('/bg-music.mp3'));
  const [sectionKey, setSectionKey] = useState('intro');

  useEffect(() => {
    if (!canvasRef.current) return;
    
    const engine = new SolarExperience(canvasRef.current);
    engineRef.current = engine;

    // Connect Journey Controller to React State
    engine.journey.setSectionCallback((key: string) => {
      setSectionKey(key);
    });
    
    // Initial hotspots setup
    engine.focusController.setHotspots(
      engine.factory.hotspots,
      (lang: string) => i18n.changeLanguage(lang)
    );

    return () => {
      engine.destroy();
      engineRef.current = null;
    };
  }, []);

  // Update hotspots language pick callback when i18n changes, without resetting engine
  useEffect(() => {
    if (engineRef.current) {
        engineRef.current.focusController.setHotspots(
            engineRef.current.factory.hotspots,
            (lang: string) => i18n.changeLanguage(lang)
        );
    }
  }, [i18n]);

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
      
      <LoadingScreen />
      <StaticHUD />
      
      <OverlayUI sectionKey={sectionKey} />
      <AudioUI manager={audioManager.current} />

      {/* Navigation Hint */}
      <div 
        className="mono" 
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          color: 'var(--primary)',
          fontSize: '0.65rem',
          opacity: 0.8,
          zIndex: 1000,
          pointerEvents: 'auto',
          cursor: 'pointer',
          background: 'rgba(0, 242, 254, 0.1)',
          padding: '8px 15px',
          border: '1px solid var(--primary)',
          borderRadius: '4px'
        }}
        onClick={() => engineRef.current?.journey.next()}
      >
        [ {window.innerWidth < 768 ? 'TAP_TO_TRAVEL' : 'TAP_OR_SPACE_TO_TRAVEL'} ]
      </div>
    </div>
  );
}
