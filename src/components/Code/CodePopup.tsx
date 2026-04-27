import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useTheme } from '../../theme/theme';
import { useCodes } from '../../context/CodesContext';
import './CodePopup.css';

interface CodePopupProps {
  onClose: () => void;
}

const symbols = ['▲', '▼', '■', '●', '◆', '►', '◄', '▪'];

const CodePopup: React.FC<CodePopupProps> = ({ onClose }) => {
  const [code, setLocalCode] = useState<string[]>([]);
  const t = useTheme();
  const { codes, setCodeAt, filledCount } = useCodes();

  const nextSlot = codes.findIndex((c) => c.length !== 4);
  const slotIndex = (nextSlot === -1 ? 2 : nextSlot) as 0 | 1 | 2;
  const isFull = filledCount >= 3;

  const handleSymbolClick = (symbol: string) => {
    if (code.length < 4) {
      setLocalCode([...code, symbol]);
    }
  };

  const handleSave = () => {
    if (isFull) {
      toast.warn('Les 3 combinaisons sont déjà enregistrées.');
      return;
    }
    if (code.length !== 4) return;
    const codeString = code.join('');
    setCodeAt(slotIndex, codeString);
    toast.success(`Combinaison ${slotIndex + 1} enregistrée — ${filledCount + 1}/3 stockées`);
    onClose();
  };

  const handleClear = () => {
    setLocalCode([]);
  };

  return (
    <div className="popup-overlay" style={{ backgroundColor: t.color.overlay }}>
      <div
        className="popup-content"
        style={{
          backgroundColor: t.color.surface,
          color: t.color.text,
          borderRadius: t.radius.lg,
          padding: t.spacing.lg,
          borderColor: t.color.primary,
          boxShadow: t.shadow.lg,
        }}
      >
        <h2 style={{ color: t.color.primary }}>
          {isFull
            ? '3/3 combinaisons enregistrées'
            : `Combinaison ${slotIndex + 1} sur 3`}
        </h2>
        <div className="code-display" style={{ marginBottom: t.spacing.lg }}>
          {Array(4).fill(null).map((_, index) => (
            <div
              key={index}
              className="code-slot"
              style={{
                borderColor: t.color.borderSoft,
                color: t.color.text,
                backgroundColor: t.color.bg,
                borderRadius: t.radius.sm,
              }}
            >
              {code[index] || ''}
            </div>
          ))}
        </div>
        <div className="symbol-grid" style={{ gap: t.spacing.sm, marginBottom: t.spacing.lg }}>
          {symbols.map((symbol) => (
            <button
              key={symbol}
              onClick={() => handleSymbolClick(symbol)}
              disabled={isFull}
              style={{
                backgroundColor: t.color.primary,
                color: t.color.white,
                border: 'none',
                borderRadius: t.radius.md,
                padding: t.spacing.sm,
                cursor: isFull ? 'not-allowed' : 'pointer',
                opacity: isFull ? 0.5 : 1,
                transition: `background-color ${t.transition.base}`,
              }}
            >
              {symbol}
            </button>
          ))}
        </div>
        <div className="popup-buttons" style={{ display: 'flex', justifyContent: 'center', gap: t.spacing.sm }}>
          <button onClick={handleClear} data-testid="popup-clear">Effacer</button>
          <button
            onClick={handleSave}
            disabled={isFull || code.length !== 4}
            data-testid="popup-save"
          >
            Sauvegarder
          </button>
          <button onClick={onClose} data-testid="popup-close">Fermer</button>
        </div>
      </div>
    </div>
  );
};

export default CodePopup;
