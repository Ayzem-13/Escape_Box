import React, { useState } from 'react';
import './CodePopup.css';

interface CodePopupProps {
  onClose: () => void;
}

const symbols = ['▲', '▼', '■', '●', '◆', '►', '◄', '▪'];

const CodePopup: React.FC<CodePopupProps> = ({ onClose }) => {
  const [code, setCode] = useState<string[]>([]);

  const handleSymbolClick = (symbol: string) => {
    if (code.length < 4) {
      setCode([...code, symbol]);
    }
  };

  const handleSave = () => {
    if (code.length === 4) {
      localStorage.setItem('userCode', JSON.stringify(code));
      onClose();
    } else {
      alert('Veuillez sélectionner un code à 4 symboles.');
    }
  };

  const handleClear = () => {
    setCode([]);
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Sélectionnez votre code</h2>
        <div className="code-display">
          {Array(4).fill(null).map((_, index) => (
            <div key={index} className="code-slot">
              {code[index] || ''}
            </div>
          ))}
        </div>
        <div className="symbol-grid">
          {symbols.map((symbol) => (
            <button key={symbol} onClick={() => handleSymbolClick(symbol)}>
              {symbol}
            </button>
          ))}
        </div>
        <div className="popup-buttons">
          <button onClick={handleClear}>Effacer</button>
          <button onClick={handleSave}>Sauvegarder</button>
          <button onClick={onClose}>Fermer</button>
        </div>
      </div>
    </div>
  );
};

export default CodePopup;
