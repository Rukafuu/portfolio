import React, { useState } from 'react';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';
import { AudioManager } from '../utils/AudioManager';
import { useWindowSize, isMobile } from '../../hooks/useWindowSize';

interface AudioUIProps {
  manager: AudioManager;
}

export const AudioUI: React.FC<AudioUIProps> = ({ manager }) => {
  const [isPaused, setIsPaused] = useState(true);
  const [vol, setVol] = useState(0.5);
  const { width } = useWindowSize();
  const mobile = isMobile(width);

  const toggle = () => {
    manager.toggle();
    setIsPaused(!isPaused);
  };

  const handleVol = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value);
    setVol(v);
    manager.setVolume(v);
  };

  return (
    <div className="audio-ui mono" style={{
      position: 'fixed',
      bottom: mobile ? '16px' : '30px',
      left: mobile ? '12px' : '30px',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      gap: mobile ? '0.5rem' : '1rem',
      background: 'var(--glass)',
      padding: mobile ? '8px 12px' : '10px 20px',
      border: '1px solid var(--glass-border)',
      pointerEvents: 'auto',
      borderRadius: '5px'
    }}>
      <button
        onClick={toggle}
        style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
      >
        {isPaused ? <Play size={mobile ? 16 : 20} /> : <Pause size={mobile ? 16 : 20} />}
      </button>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {vol === 0 ? <VolumeX size={14} color="var(--text-dim)" /> : <Volume2 size={14} color="var(--text-dim)" />}
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={vol}
          onChange={handleVol}
          onPointerDown={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
          style={{ width: mobile ? '60px' : '80px', accentColor: 'var(--primary)', cursor: 'pointer' }}
        />
      </div>

      {!mobile && (
        <span style={{ fontSize: '0.6rem', color: 'var(--text-dim)' }}>
          {isPaused ? 'AUDIO_PAUSED' : 'LINK_ESTABLISHED'}
        </span>
      )}
    </div>
  );
};
