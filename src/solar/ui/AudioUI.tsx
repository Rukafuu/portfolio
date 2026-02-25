import React, { useState } from 'react';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';
import { AudioManager } from '../utils/AudioManager';

interface AudioUIProps {
  manager: AudioManager;
}

export const AudioUI: React.FC<AudioUIProps> = ({ manager }) => {
  const [isPaused, setIsPaused] = useState(true);
  const [vol, setVol] = useState(0.5);

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
      bottom: '30px',
      left: '30px',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      background: 'var(--glass)',
      padding: '10px 20px',
      border: '1px solid var(--glass-border)',
      pointerEvents: 'auto',
      borderRadius: '5px'
    }}>
      <button 
        onClick={toggle}
        style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer' }}
      >
        {isPaused ? <Play size={20} /> : <Pause size={20} />}
      </button>

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {vol === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
        <input 
          type="range" 
          min="0" 
          max="1" 
          step="0.01" 
          value={vol} 
          onChange={handleVol}
          style={{ width: '80px', accentColor: 'var(--primary)' }}
        />
      </div>
      
      <span style={{ fontSize: '0.6rem', color: 'var(--text-dim)' }}>
        {isPaused ? "AUDIO_PAUSED" : "LINK_ESTABLISHED"}
      </span>
    </div>
  );
};
