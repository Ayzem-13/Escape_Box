import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useCodes } from '../../context/CodesContext';
import {
  CODE_CATEGORIES,
  CODE_CATEGORY_LABEL,
  CODE_LENGTH,
  CODE_TOKEN_SETS,
  type CodeCategory,
} from '../../config/codeSymbols';
import './CodePopup.css';

interface CodePopupProps {
  onClose: () => void;
}

const CodePopup: React.FC<CodePopupProps> = ({ onClose }) => {
  const [code, setLocalCode] = useState<string[]>([]);
  const [category, setCategory] = useState<CodeCategory>('symbols');
  const { codes, slotCount, setCodeAt, filledCount } = useCodes();

  const tokens = CODE_TOKEN_SETS[category];
  const nextSlot = codes.findIndex((c) => c.length !== CODE_LENGTH);
  const slotIndex = nextSlot === -1 ? slotCount - 1 : nextSlot;
  const isFull = filledCount >= slotCount;
  const canSave = !isFull && code.length === CODE_LENGTH;

  const handleTokenClick = (token: string) => {
    if (code.length < CODE_LENGTH) {
      setLocalCode([...code, token]);
    }
  };

  const handleSave = () => {
    if (!canSave) return;
    const codeString = code.join('');
    setCodeAt(slotIndex, codeString);
    toast.success(
      slotCount === 1
        ? 'Combinaison enregistrée.'
        : `Combinaison ${slotIndex + 1} enregistrée — ${filledCount + 1}/${slotCount} stockées`,
    );
    onClose();
  };

  const handleClear = () => setLocalCode([]);

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

        <div className="code-display">
          {Array(CODE_LENGTH).fill(null).map((_, index) => (
            <div
              key={index}
              className="code-slot"
              data-active={index === code.length && !isFull}
              data-filled={Boolean(code[index])}
            >
              {code[index] || ''}
            </div>
          ))}
        </div>

        <div className="code-tabs" role="tablist" aria-label="Catégorie de symboles">
          {CODE_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={cat === category}
              onClick={() => setCategory(cat)}
              disabled={isFull}
              data-testid={`code-tab-${cat}`}
              className="code-tab"
            >
              {CODE_CATEGORY_LABEL[cat]}
            </button>
          ))}
        </div>

        <div className="token-grid" data-category={category} data-testid={`code-grid-${category}`}>
          {tokens.map((token) => (
            <button
              key={token}
              type="button"
              onClick={() => handleTokenClick(token)}
              disabled={isFull || code.length >= CODE_LENGTH}
              className="token-btn"
            >
              {token}
            </button>
          ))}
        </div>

        <div className="popup-actions">
          <button
            type="button"
            onClick={handleClear}
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
