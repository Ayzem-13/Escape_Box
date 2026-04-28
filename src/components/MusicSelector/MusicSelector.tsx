import React, { useState, useRef, useEffect } from 'react';
import { MUSIC_OPTIONS } from '../../config/musicOptions';
import { CheckIcon, PauseIcon, PlayIcon, XIcon } from '../../theme/icons';
import './MusicSelector.css';

interface SelectedMusic {
  label: string;
  file: string;
}

interface MusicSelectorProps {
  onClose: () => void;
  onSelect: (musics: SelectedMusic[]) => void;
}

const loadDefaultMusics = () => {
  const saved = localStorage.getItem('escapeBoxSelectedMusics');
  const defaultSelected = [null, null, null, null] as (SelectedMusic | null)[];
  
  if (saved) {
    try {
      const musics: SelectedMusic[] = JSON.parse(saved);
      musics.forEach((music, index) => {
        if (index < 4) {
          defaultSelected[index] = music;
        }
      });
    } catch (e) {
      console.error('Erreur lors du chargement des musiques sauvegardées', e);
    }
  }
  return defaultSelected;
};

const MusicSelector: React.FC<MusicSelectorProps> = ({ onClose, onSelect }) => {
  const [initialMusics] = useState<(SelectedMusic | null)[]>(loadDefaultMusics);
  const [selectedMusics, setSelectedMusics] = useState<(SelectedMusic | null)[]>(initialMusics);
  const [isValidated, setIsValidated] = useState(false);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  
  // Vérifier si la sélection a été modifiée par rapport à l'état initial
  const hasChanges = JSON.stringify(selectedMusics) !== JSON.stringify(initialMusics);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof Audio !== 'undefined') {
      audioRef.current = new Audio();
      audioRef.current.onended = () => setPlayingIndex(null);
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, []);

  const togglePlay = (index: number, file: string) => {
    if (!audioRef.current) return;
    if (playingIndex === index) {
      audioRef.current.pause();
      setPlayingIndex(null);
    } else {
      audioRef.current.src = file;
      audioRef.current.play().catch(e => console.error('Erreur de lecture audio', e));
      setPlayingIndex(index);
    }
  };

  const handleMusicChange = (index: number, label: string, file: string) => {
    const newSelected = [...selectedMusics];
    newSelected[index] = { label, file };
    setSelectedMusics(newSelected);
    if (playingIndex === index) {
      audioRef.current?.pause();
      setPlayingIndex(null);
    }
  };

  const handleRemoveMusic = (index: number) => {
    const newSelected = [...selectedMusics];
    newSelected[index] = null;
    setSelectedMusics(newSelected);
    if (playingIndex === index) {
      audioRef.current?.pause();
      setPlayingIndex(null);
    }
  };

  const handleValidate = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setPlayingIndex(null);
    }
    // Filtrer les musiques non vides
    const musicsToSave = selectedMusics.filter((m): m is SelectedMusic => m !== null);
    
    // Sauvegarder dans localStorage
    localStorage.setItem('escapeBoxSelectedMusics', JSON.stringify(musicsToSave));
    
    // Appeler le callback
    onSelect(musicsToSave);
    
    setIsValidated(true);
    
    // Fermer après 2 secondes
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
      aria-label="Sélectionner les musiques"
    >
      <div className="music-selector-content">
        <h2 className="music-selector-title">Sélectionnez jusqu'à 4 musiques</h2>
        
        {isValidated && (
          <div className="music-selector-validation" data-testid="music-validation">
            <CheckIcon size={18} /> Musiques sélectionnées avec succès !
          </div>
        )}
        
        {/* Dropdowns pour les 4 musiques */}
        <div className="music-selector-dropdowns">
          {selectedMusics.map((selectedMusic, index) => {
            const timeRanges = [
              'de 0 à 15 min',
              'de 15 à 30 min',
              'de 30 à 45 min',
              'de 45 à 60 min'
            ];
            
            return (
              <div key={index} className="music-selector-dropdown-group">
                <label className="music-selector-dropdown-label">
                  Musique {index + 1} ({timeRanges[index]})
                </label>
                <div className="music-selector-dropdown-wrapper">
                <select
                  className="music-selector-dropdown"
                  value={selectedMusic ? selectedMusic.file : ''}
                  onChange={(e) => {
                    const option = MUSIC_OPTIONS.find((m) => m.file === e.target.value);
                    if (option) {
                      handleMusicChange(index, option.label, option.file);
                    } else {
                      handleRemoveMusic(index);
                    }
                  }}
                  disabled={isValidated}
                  data-testid={`music-dropdown-${index}`}
                >
                  <option value="">-- Aucune musique --</option>
                  {MUSIC_OPTIONS.map((option) => (
                    <option key={option.id} value={option.file}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {selectedMusic && (
                  <button
                    type="button"
                    className={`music-selector-preview ${playingIndex === index ? 'playing' : ''}`}
                    onClick={() => togglePlay(index, selectedMusic.file)}
                    title={playingIndex === index ? 'Mettre en pause' : 'Aperçu audio'}
                    aria-label={playingIndex === index ? 'Mettre en pause' : 'Aperçu audio'}
                    disabled={isValidated}
                  >
                    {playingIndex === index ? <PauseIcon size={16} /> : <PlayIcon size={16} />}
                  </button>
                )}
                {selectedMusic && (
                  <button
                    type="button"
                    className="music-selector-dropdown-clear"
                    onClick={() => handleRemoveMusic(index)}
                    data-testid={`music-remove-${index}`}
                    aria-label={`Supprimer ${selectedMusic.label}`}
                    disabled={isValidated}
                  >
                    <XIcon size={16} />
                  </button>
                )}
              </div>
            </div>
          )})}
        </div>

        {/* Résumé des musiques sélectionnées */}
        {selectedMusics.some((m) => m !== null) && (
          <div className="music-selector-summary">
            <h3 className="music-selector-summary-title">Résumé de la sélection</h3>
            <ol className="music-selector-summary-list">
              {selectedMusics.map((music, index) =>
                music ? (
                  <li key={index} className="music-selector-summary-item">
                    {music.label}
                  </li>
                ) : null
              )}
            </ol>
          </div>
        )}

        {/* Boutons d'action */}
        <div className="music-selector-actions">
          <button
            type="button"
            onClick={onClose}
            className="music-selector-close"
            data-testid="music-selector-close"
            disabled={isValidated}
          >
            {isValidated ? 'Fermeture...' : 'Annuler'}
          </button>
          <button
            type="button"
            onClick={handleValidate}
            className="music-selector-validate"
            data-testid="music-selector-validate"
            disabled={!hasChanges || isValidated}
          >
            Valider
          </button>
        </div>
      </div>
    </div>
  );
};

export default MusicSelector;
