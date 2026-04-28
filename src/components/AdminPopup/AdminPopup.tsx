import React, { useState } from 'react';
import './AdminPopup.css';

interface AdminPopupProps {
  onClose: () => void;
}

export const AdminPopup: React.FC<AdminPopupProps> = ({ onClose }) => {
  const [password, setPassword] = useState(() => {
    const saved = localStorage.getItem('adminPassword');
    if (saved) return saved;
    localStorage.setItem('adminPassword', '0000');
    return '0000';
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // On ne garde que les chiffres et on limite à 4 caractères
    const val = e.target.value.replace(/\D/g, '').slice(0, 4);
    setPassword(val);
  };

  const handleSave = () => {
    if (password.length === 4) {
      localStorage.setItem('adminPassword', password);
      onClose();
    } else {
      alert("Le mot de passe doit contenir exactement 4 chiffres.");
    }
  };

  return (
    <div className="admin-popup-overlay">
      <div className="admin-popup-content">
        <h2>Mot de passe Administrateur</h2>
        <input
          type="text"
          className="admin-input"
          value={password}
          onChange={handleChange}
          maxLength={4}
          placeholder="0000"
        />
        <div className="admin-buttons">
          <button onClick={onClose} className="button" style={{ background: '#555' }}>
            Annuler
          </button>
          <button onClick={handleSave} className="button">
            Sauvegarder
          </button>
        </div>
      </div>
    </div>
  );
};
