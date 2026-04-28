import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useCodes } from '../../context/CodesContext';
import CodePopup from '../Code/CodePopup';
import CodeIndicator from '../CodeIndicator/CodeIndicator';
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
