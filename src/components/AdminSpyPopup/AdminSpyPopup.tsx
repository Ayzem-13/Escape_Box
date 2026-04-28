import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './AdminSpyPopup.css';

interface AdminSpyPopupProps {
  onClose: () => void;
}

export const AdminSpyPopup: React.FC<AdminSpyPopupProps> = ({ onClose }) => {
  const location = useLocation();
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [codes] = useState<string[]>(() => {
    const mode = location.pathname.includes('demo') ? 'demo' : 'normal';
    const storageKey = `escapeBoxCodes:${mode}`;
    const savedCodes = localStorage.getItem(storageKey);
    if (savedCodes) {
      try {
        return JSON.parse(savedCodes);
      } catch (e) {
        console.error(e);
      }
    }
    return [];
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 4);
    setPassword(val);
  };

  const handleVerify = () => {
    const adminPwd = localStorage.getItem('adminPassword') || '0000';
    if (password === adminPwd) {
      setIsAuthenticated(true);
    } else {
      alert("Mot de passe incorrect.");
      setPassword('');
    }
  };

  return (
    <div className="admin-spy-popup-overlay">
      <div className="admin-spy-popup-content">
        {!isAuthenticated ? (
          <>
            <h2>Accès Administrateur</h2>
            <p>Veuillez entrer le mot de passe admin pour voir les codes.</p>
            <input
              type="password"
              className="admin-spy-input"
              value={password}
              onChange={handleChange}
              maxLength={4}
              placeholder="••••"
            />
            <div className="admin-spy-buttons">
              <button onClick={onClose} className="button" style={{ background: '#555' }}>
                Annuler
              </button>
              <button onClick={handleVerify} className="button">
                Valider
              </button>
            </div>
          </>
        ) : (
          <>
            <h2>Codes secrets du mode</h2>
            <div className="admin-spy-codes-list">
              {codes.length > 0 ? (
                codes.map((code, idx) => (
                  <div key={idx} className="admin-spy-code-item">
                    Code {idx + 1} : <strong>{code || 'Non défini'}</strong>
                  </div>
                ))
              ) : (
                <p>Aucun code n'a été défini pour ce mode.</p>
              )}
            </div>
            <div className="admin-spy-buttons" style={{ marginTop: '1rem' }}>
              <button onClick={onClose} className="button">
                Fermer
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
