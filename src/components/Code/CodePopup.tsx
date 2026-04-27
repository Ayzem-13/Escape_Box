import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useCodes } from '../../context/CodesContext';
import { CODE_LENGTH } from '../../config/codeSymbols';
import CodeInput from '../CodeInput/CodeInput';
import './CodePopup.css';

interface CodePopupProps {
  onClose: () => void;
}

const CodePopup: React.FC<CodePopupProps> = ({ onClose }) => {
  const [code, setCode] = useState<string[]>([]);
  const { codes, slotCount, setCodeAt, filledCount } = useCodes();

  const nextSlot = codes.findIndex((c) => c.length !== CODE_LENGTH);
  const slotIndex = nextSlot === -1 ? slotCount - 1 : nextSlot;
  const isFull = filledCount >= slotCount;
  const canSave = !isFull && code.length === CODE_LENGTH;

  const handleSave = () => {
    if (!canSave) return;
    setCodeAt(slotIndex, code.join(''));
    toast.success(
      slotCount === 1
        ? 'Combinaison enregistrée.'
        : `Combinaison ${slotIndex + 1} enregistrée — ${filledCount + 1}/${slotCount} stockées`,
    );
    onClose();
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  const heading = isFull
    ? slotCount === 1
      ? 'Combinaison enregistrée'
      : `${slotCount}/${slotCount} combinaisons enregistrées`
    : slotCount === 1
      ? 'Sélectionnez votre combinaison'
      : `Combinaison ${slotIndex + 1} sur ${slotCount}`;

  return (
    <div
      className="popup-overlay"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-label="Définir une combinaison"
    >
      <div className="popup-content">
        <h2 className="popup-title">{heading}</h2>

        <CodeInput code={code} onChange={setCode} disabled={isFull} />

        <div className="popup-actions">
          <button
            type="button"
            onClick={() => setCode([])}
            disabled={code.length === 0}
            data-testid="popup-clear"
            className="popup-btn popup-btn--ghost"
          >
            Effacer
          </button>
          <div className="popup-actions-right">
            <button
              type="button"
              onClick={onClose}
              data-testid="popup-close"
              className="popup-btn popup-btn--ghost"
            >
              Fermer
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={!canSave}
              data-testid="popup-save"
              className="popup-btn popup-btn--primary"
            >
              Sauvegarder
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodePopup;
