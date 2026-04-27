import React, { useState } from 'react';
import './CodePopup.css';

interface CodePopupProps {
  onClose: () => void;
}

const CodePopup: React.FC<CodePopupProps> = ({ onClose }) => {
  const [code, setCode] = useState('');

  const handleSave = () => {
    if (/^\d{4}$/.test(code)) {
      localStorage.setItem('escape-box-code', code);
      alert(`Le code "${code}" a été sauvegardé !`);
      onClose();
    } else {
      alert('Veuillez entrer un code à 4 chiffres.');
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Définir un code à 4 chiffres</h2>
        <div className="input-container">
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            maxLength={4}
            placeholder="1234"
            className="code-input"
          />
        </div>
        <div className="button-container-popup">
            <button onClick={handleSave} className="popup-button">Sauvegarder</button>
            <button onClick={onClose} className="popup-button close">Fermer</button>
        </div>
      </div>
    </div>
  );
};

export default CodePopup;
