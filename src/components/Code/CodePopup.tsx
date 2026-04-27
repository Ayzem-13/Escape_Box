import React, { useState } from 'react';
import { useTheme } from '../../theme/theme';
import { useGame } from '../../context/GameContext';
import './CodePopup.css';

interface CodePopupProps {
  onClose: () => void;
}

const symbols = ['▲', '▼', '■', '●', '◆', '►', '◄', '▪'];

const CodePopup: React.FC<CodePopupProps> = ({ onClose }) => {
  const [code, setLocalCode] = useState<string[]>([]);
  const t = useTheme();
  const { setCode } = useGame();

  const handleSymbolClick = (symbol: string) => {
    if (code.length < 4) {
      setLocalCode([...code, symbol]);
    }
  };

  const handleSave = () => {
    if (code.length === 4) {
      const codeString = code.join('');
      setCode(codeString);
      onClose();
    } else {
      alert('Veuillez sélectionner un code à 4 symboles.');
    }
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
        <h2 style={{ color: t.color.primary }}>Sélectionnez votre code</h2>
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
              style={{
                backgroundColor: t.color.primary,
                color: t.color.white,
                border: 'none',
                borderRadius: t.radius.md,
                padding: t.spacing.sm,
                cursor: 'pointer',
                transition: `background-color ${t.transition.base}`,
              }}
            >
              {symbol}
            </button>
          ))}
        </div>
        <div className="popup-buttons" style={{ display: 'flex', justifyContent: 'center', gap: t.spacing.sm }}>
          <button onClick={handleClear}>Effacer</button>
          <button onClick={handleSave}>Sauvegarder</button>
          <button onClick={onClose}>Fermer</button>
        </div>
      </div>
    </div>
  );
};

export default CodePopup;
