import React, { useState } from 'react';
import { MUSIC_OPTIONS } from '../../config/musicOptions';
import './MusicSelector.css';

interface MusicSelectorProps {
  onClose: () => void;
  onSelect: (music: string, file: string) => void;
}

const MusicSelector: React.FC<MusicSelectorProps> = ({ onClose, onSelect }) => {
  const [selectedMusic, setSelectedMusic] = useState<string | null>(null);
  const [isValidated, setIsValidated] = useState(false);

  const handleSelect = (label: string, file: string) => {
    setSelectedMusic(label);
    onSelect(label, file);
    setIsValidated(true);
    
    // Fermer après 2 secondes si validé
    setTimeout(() => {
      onClose();
    }, 2000);
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
        
        {isValidated && (
          <div className="music-selector-validation" data-testid="music-validation">
            ✓ Musique sélectionnée avec succès !
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
              disabled={isValidated}
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
          {isValidated ? 'Fermeture...' : 'Fermer'}
        </button>
      </div>
    </div>
  );
};

export default MusicSelector;
