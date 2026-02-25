import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export const SolarControls = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'h') setIsVisible(prev => !prev);
      if (e.key === ' ') {
        setPaused(prev => !prev);
        window.dispatchEvent(new CustomEvent('solar-pause', { detail: !paused }));
      }
      if (e.key.toLowerCase() === 'o') {
        window.dispatchEvent(new CustomEvent('solar-orbits', {}));
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [paused]);

  if (!isVisible) return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px', opacity: 0.5, zIndex: 3000 }} className="mono">
      [ PRESS 'H' FOR HELIUM_INTERFACE ]
    </div>
  );

  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      right: '40px',
      transform: 'translateY(-50%)',
      background: 'var(--glass)',
      padding: '2rem',
      border: '1px solid var(--primary)',
      zIndex: 3000,
      width: '260px'
    }} className="mono">
      <h3 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>SYSTEM_CONTROLS</h3>
      <div style={{ fontSize: '0.8rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>[ SPACE ] : {paused ? 'RESUME_ORBITS' : 'HALT_SIMULATION'}</div>
        <div>[ O ] : TOGGLE_ORBIT_PATHS</div>
        <div>[ SCROLL ] : PILOT_TRAJECTORY</div>
        <div>[ DRAG ] : FREE_CAM_ROTATION</div>
        <div style={{ marginTop: '1rem', color: 'var(--accent)' }}>
          WARP_SPEED: {paused ? '0.0x' : '1.0x'}
        </div>
      </div>
    </div>
  );
};
