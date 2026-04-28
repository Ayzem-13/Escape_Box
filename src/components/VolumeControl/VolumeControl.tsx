import { useState, useEffect } from 'react';
import volumeManager from '../../services/volumeManager';
import './VolumeControl.css';

const LayoutVolumeFab = () => {
  const [isVolumeOpen, setIsVolumeOpen] = useState(false);
  const [volume, setVolume] = useState(() => volumeManager.getVolume());

  useEffect(() => {
    // Subscribe to volume changes
    const unsubscribe = volumeManager.subscribe((newVolume) => {
      setVolume(newVolume);
    });
    return unsubscribe;
  }, []);

  const handleVolumeChange = (newVolume: number) => {
    volumeManager.setVolume(newVolume);
  };

  const handleVolumeClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsVolumeOpen((prev) => !prev);
  };

  const getVolumeIcon = () => {
    if (volume === 0) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-volume-off-icon lucide-volume-off">
          <path d="M16 9a5 5 0 0 1 .95 2.293"/>
          <path d="M19.364 5.636a9 9 0 0 1 1.889 9.96"/>
          <path d="m2 2 20 20"/>
          <path d="m7 7-.587.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298V11"/>
          <path d="M9.828 4.172A.686.686 0 0 1 11 4.657v.686"/>
        </svg>
      );
    } else if (volume <= 50) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-volume1-icon lucide-volume-1">
          <path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"/>
          <path d="M16 9a5 5 0 0 1 0 6"/>
        </svg>
      );
    } else {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-volume2-icon lucide-volume-2">
          <path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"/>
          <path d="M16 9a5 5 0 0 1 0 6"/>
          <path d="M19.364 18.364a9 9 0 0 0 0-12.728"/>
        </svg>
      );
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleVolumeClick}
        className="layout-volume-fab"
        aria-label="Contrôle du volume"
        title="Volume"
        data-testid="layout-volume-btn"
      >
        {getVolumeIcon()}
      </button>
      {isVolumeOpen && (
        <div className="layout-volume-dropdown">
          <div className="layout-volume-container">
            <label htmlFor="volume-slider" className="layout-volume-label">
              Volume
            </label>
            <input
              id="volume-slider"
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => handleVolumeChange(Number(e.target.value))}
              className="layout-volume-slider"
            />
            <div className="layout-volume-value">{Math.round(volume)}%</div>
          </div>
        </div>
      )}
    </>
  );
};

export default LayoutVolumeFab;
