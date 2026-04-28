import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useCodes } from '../../context/CodesContext';
import { useMusicSelector } from '../../context/MusicSelectorContext';
import CodePopup from '../Code/CodePopup';
import CodeIndicator from '../CodeIndicator/CodeIndicator';
import { MusicIcon } from '../../theme/icons';
import './Combinations.css';

interface CombinationsProps {
  testIdPrefix?: string;
  resetToastMessage?: string;
}

const Combinations: React.FC<CombinationsProps> = ({
  testIdPrefix,
  resetToastMessage = 'Combinaisons réinitialisées.',
}) => {
  const { mode, slotCount, allCodesSet, filledCount, clearCodes, codes } = useCodes();
  const { openSelector: openMusicSelector, isAvailable: isMusicAvailable } = useMusicSelector();
  const [isCodePopupOpen, setIsCodePopupOpen] = useState(false);

  const prefix = testIdPrefix ?? mode;
  const resetLabel = slotCount === 1 ? 'Réinitialiser la combinaison' : 'Réinitialiser les combinaisons';

  const handleReset = () => {
    clearCodes();
    toast.info(resetToastMessage);
  };

  return (
    <div className="combinations" data-testid={`${prefix}-combinations`}>
      <CodeIndicator />

      <div className="combinations-actions">
        <button
          onClick={() => setIsCodePopupOpen(true)}
          data-testid={`${prefix}-define-btn`}
          className="button"
          disabled={allCodesSet}
        >
          Définir la combinaison
        </button>
        <button
          onClick={handleReset}
          data-testid={`${prefix}-reset-btn`}
          className="button"
          disabled={filledCount === 0}
        >
          {resetLabel}
        </button>
        {isMusicAvailable && (
          <button
            type="button"
            onClick={openMusicSelector}
            className="button combinations-music-btn"
            data-testid={`${prefix}-music-btn`}
          >
            <MusicIcon size={18} />
            <span>Sélectionner les musiques</span>
          </button>
        )}
      </div>

      {isCodePopupOpen && <CodePopup onClose={() => setIsCodePopupOpen(false)} />}

      {(
        <div className="defined-combination" data-testid={`${prefix}-defined-combination`}>
          <p>Combinaison(s) définie(s) :</p>
          <div className="defined-codes">
            {codes.map((code, index) => (
              <span key={index} className="defined-code">
                {code ? code : <em>Non définie</em>}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Combinations;
