import { useState } from 'react';
import './VolumeControl.css';

const VOLUME_STORAGE_KEY = 'escapeBoxVolume';

const LayoutVolumeFab = () => {
  const [isVolumeOpen, setIsVolumeOpen] = useState(false);
  const [volume, setVolume] = useState(() => {
    const saved = localStorage.getItem(VOLUME_STORAGE_KEY);
    return saved ? parseFloat(saved) : 100;
  });

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    localStorage.setItem(VOLUME_STORAGE_KEY, String(newVolume));
    
    // Apply volume to all audio elements on the page
    const audioElements = document.querySelectorAll('audio');
    audioElements.forEach((audio) => {
      audio.volume = newVolume / 100;
    });
  };

  const handleVolumeClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsVolumeOpen((prev) => !prev);
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
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18V5l12-2v13"/>
          <circle cx="6" cy="18" r="3"/>
          <circle cx="18" cy="16" r="3"/>
        </svg>
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
