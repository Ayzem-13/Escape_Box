import React, { useState, useRef, useEffect } from 'react';
import { MUSIC_OPTION_GROUPS, MUSIC_OPTIONS } from '../../config/musicOptions';
import {
  SELECTED_MUSICS_KEY_NORMAL,
  NORMAL_SEGMENT_OPTIONS,
  type NormalSegmentCount,
  parseNormalMusicStorage,
  serializeNormalMusicStorage,
  normalSegmentRangeLabels,
  type SelectedMusicFile,
} from '../../config/musicStorage';
import { CheckIcon, PauseIcon, PlayIcon, XIcon } from '../../theme/icons';
import './MusicSelector.css';

interface MusicSelectorProps {
  onClose: () => void;
  onSelect: (musics: SelectedMusicFile[]) => void;
  /** Clé localStorage */
  storageKey?: string;
  /** normal = partie 60 min (1 / 2 / 4 segments), demo = une piste démo */
  variant?: 'normal' | 'demo';
}

const loadDemoTracks = (
  storageKey: string,
): (SelectedMusicFile | null)[] => {
  const defaultSelected = [null] as (SelectedMusicFile | null)[];
  const saved = localStorage.getItem(storageKey);
  if (saved) {
    try {
      const musics = JSON.parse(saved) as SelectedMusicFile[];
      if (Array.isArray(musics) && musics.length > 0 && musics[0]) {
        defaultSelected[0] = musics[0];
      }
    } catch (e) {
      console.error('Erreur lors du chargement des musiques sauvegardées', e);
    }
  }
  return defaultSelected;
};

const MusicSelector: React.FC<MusicSelectorProps> = ({
  onClose,
  onSelect,
  storageKey = SELECTED_MUSICS_KEY_NORMAL,
  variant = 'normal',
}) => {
  const isDemo = variant === 'demo';

  const [initialDemoTracks] = useState<(SelectedMusicFile | null)[]>(
    () => loadDemoTracks(storageKey),
  );
  const [selectedMusicsDemo, setSelectedMusicsDemo] = useState<
    (SelectedMusicFile | null)[]
  >(initialDemoTracks);

  const [initialNormalState] = useState(() =>
    parseNormalMusicStorage(localStorage.getItem(storageKey)),
  );
  const [segmentCount, setSegmentCount] = useState<NormalSegmentCount>(
    initialNormalState.segmentCount,
  );
  const [selectedMusicsNormal, setSelectedMusicsNormal] = useState<
    (SelectedMusicFile | null)[]
  >(() => [...initialNormalState.tracks]);

  const selectedMusics = isDemo ? selectedMusicsDemo : selectedMusicsNormal;
  const setSelectedMusics = isDemo
    ? setSelectedMusicsDemo
    : setSelectedMusicsNormal;

  const initialSnapshotDemo = JSON.stringify(initialDemoTracks);
  const initialSnapshotNormal = JSON.stringify({
    segmentCount: initialNormalState.segmentCount,
    tracks: initialNormalState.tracks,
  });

  const [isValidated, setIsValidated] = useState(false);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);

  const snapshotNow = (): string =>
    isDemo
      ? JSON.stringify(selectedMusicsDemo)
      : JSON.stringify({
          segmentCount,
          tracks: selectedMusicsNormal,
        });

  const hasChanges = isDemo
    ? snapshotNow() !== initialSnapshotDemo
    : snapshotNow() !== initialSnapshotNormal;

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
      audioRef.current.play().catch((e) =>
        console.error('Erreur de lecture audio', e),
      );
      setPlayingIndex(index);
    }
  };

  const handleMusicChange = (index: number, label: string, file: string) => {
    const newSelected = [...selectedMusics];
    newSelected[index] = { label, file };
    setSelectedMusics(newSelected as (SelectedMusicFile | null)[]);
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

  const handleSegmentChange = (next: NormalSegmentCount) => {
    if (playingIndex !== null) {
      audioRef.current?.pause();
      setPlayingIndex(null);
    }
    setSegmentCount(next);
    setSelectedMusicsNormal((prev) =>
      Array.from({ length: next }, (_, i) => prev[i] ?? null),
    );
  };

  const allSegmentsFilled =
    Array.isArray(selectedMusics) && selectedMusics.every((m) => m !== null);

  const handleValidate = () => {
    if (!allSegmentsFilled) return;

    if (audioRef.current) {
      audioRef.current.pause();
      setPlayingIndex(null);
    }

    const musicsToSave = selectedMusics.filter(
      (m): m is SelectedMusicFile => m !== null,
    );

    if (isDemo) {
      localStorage.setItem(storageKey, JSON.stringify(musicsToSave));
    } else {
      localStorage.setItem(
        storageKey,
        serializeNormalMusicStorage(segmentCount, musicsToSave),
      );
    }

    onSelect(musicsToSave);

    setIsValidated(true);

    setTimeout(() => {
      onClose();
    }, 2000);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  const rangeLabels = !isDemo
    ? normalSegmentRangeLabels[segmentCount]
    : ['pour toute la partie démo (15 min)'];

  const titleText = isDemo
    ? 'Sélectionnez une musique pour la démo'
    : 'Musique pour la partie (60 min)';

  const canValidate = hasChanges && allSegmentsFilled;

  return (
    <div
      className="music-selector-overlay"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-label="Sélectionner les musiques"
    >
      <div className="music-selector-content">
        <h2 className="music-selector-title">{titleText}</h2>

        {!isDemo && (
          <fieldset className="music-selector-segments">
            <legend className="music-selector-segments-legend">
              Découpage de la partie
            </legend>
            <div className="music-selector-segment-options">
              {NORMAL_SEGMENT_OPTIONS.map((n) => (
                <label
                  key={n}
                  className={`music-selector-segment-label ${
                    segmentCount === n ? 'music-selector-segment-label--selected' : ''
                  }`}
                >
                  <input
                    type="radio"
                    name="music-segment-count"
                    value={n}
                    checked={segmentCount === n}
                    onChange={() => handleSegmentChange(n)}
                    disabled={isValidated}
                    data-testid={`music-segment-count-${n}`}
                  />
                  <span className="music-selector-segment-copy">
                    {n === 1 && '1 musique (60 min)'}
                    {n === 2 && '2 musiques (30 + 30 min)'}
                    {n === 4 && '4 musiques (15 + 15 + 15 + 15 min)'}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
        )}

        {isValidated && (
          <div
            className="music-selector-validation"
            data-testid="music-validation"
          >
            <CheckIcon size={18} /> Musiques sélectionnées avec succès !
          </div>
        )}

        <div className="music-selector-dropdowns">
          {selectedMusics.map((selectedMusic, index) => (
            <div key={index} className="music-selector-dropdown-group">
              <label className="music-selector-dropdown-label">
                Musique {index + 1} ({rangeLabels[index] ?? ''})
              </label>
              <div className="music-selector-dropdown-wrapper">
                <select
                  className="music-selector-dropdown"
                  value={selectedMusic ? selectedMusic.file : ''}
                  onChange={(e) => {
                    const option = MUSIC_OPTIONS.find(
                      (m) => m.file === e.target.value,
                    );
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
                  {/*
                    Pas d’<optgroup> : WebKit Safari duplique parfois les options en tête de liste.
                    En-têtes = options désactivées (liste plate).
                  */}
                  {MUSIC_OPTION_GROUPS.map((group) => (
                    <React.Fragment key={`stress-${group.stressLevel}`}>
                      <option
                        disabled
                        value={`__section-${group.stressLevel}__`}
                        className="music-selector-dropdown-section-heading"
                      >
                        — {group.groupLabel} —
                      </option>
                      {group.options.map((option) => (
                        <option key={option.id} value={option.file}>
                          {option.label}
                        </option>
                      ))}
                    </React.Fragment>
                  ))}
                </select>
                {selectedMusic && (
                  <button
                    type="button"
                    className={`music-selector-preview ${
                      playingIndex === index ? 'playing' : ''
                    }`}
                    onClick={() => togglePlay(index, selectedMusic.file)}
                    title={
                      playingIndex === index ? 'Mettre en pause' : 'Aperçu audio'
                    }
                    aria-label={
                      playingIndex === index ? 'Mettre en pause' : 'Aperçu audio'
                    }
                    disabled={isValidated}
                  >
                    {playingIndex === index ? (
                      <PauseIcon size={16} />
                    ) : (
                      <PlayIcon size={16} />
                    )}
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
          ))}
        </div>

        {selectedMusics.some((m) => m !== null) && (
          <div className="music-selector-summary">
            <h3 className="music-selector-summary-title">
              Résumé de la sélection
            </h3>
            <ol className="music-selector-summary-list">
              {selectedMusics.map((music, index) =>
                music ? (
                  <li key={index} className="music-selector-summary-item">
                    {music.label}
                  </li>
                ) : null,
              )}
            </ol>
          </div>
        )}

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
            disabled={!canValidate || isValidated}
          >
            Valider
          </button>
        </div>
      </div>
    </div>
  );
};

export default MusicSelector;
