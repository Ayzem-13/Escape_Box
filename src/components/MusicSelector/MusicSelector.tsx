import React, { useState } from 'react';
import { MUSIC_OPTIONS } from '../../config/musicOptions';
import './MusicSelector.css';

interface MusicSelectorProps {
  onClose: () => void;
  onSelect: (music: string, file: string) => void;
}

const MusicSelector: React.FC<MusicSelectorProps> = ({ onClose, onSelect }) => {
  const [selectedMusic, setSelectedMusic] = useState<string | null>(null);

  const handleSelect = (label: string, file: string) => {
    setSelectedMusic(label);
    onSelect(label, file);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="music-selector-overlay"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-label="Sélectionner une musique"
    >
      <div className="music-selector-content">
        <h2 className="music-selector-title">Sélectionnez une ambiance musicale</h2>

        {selectedMusic && (
          <div className="music-selector-validation" data-testid="music-validation">
            ✓ Aperçu : {selectedMusic}
          </div>
        )}

        <div className="music-selector-options">
          {MUSIC_OPTIONS.map((option) => (
            <button
              key={option.id}
              type="button"
              className={`music-selector-option ${
                selectedMusic === option.label ? 'music-selector-option--selected' : ''
              }`}
              onClick={() => handleSelect(option.label, option.file)}
              data-testid={`music-option-${option.id}`}
            >
              <span className="music-selector-option-name">{option.label}</span>
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={onClose}
          className="music-selector-close"
          data-testid="music-selector-close"
        >
          Fermer
        </button>
      </div>
    </div>
  );
};

export default MusicSelector;
