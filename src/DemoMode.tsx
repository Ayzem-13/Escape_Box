import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import Chrono from './Chrono';
import CodePopup from './CodePopup';

const DemoMode: React.FC = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [isPopupOpen, setPopupOpen] = useState(false);

  return (
    <div className="App">
      {gameStarted && <Chrono initialTime={900} />}
      {isPopupOpen && <CodePopup onClose={() => setPopupOpen(false)} />}
      <h1>MODE DEMO</h1>
      <div style={{ margin: '20px' }}>
        <input type="text" placeholder="KEY COMBINATION" />
      </div>
      <p>Durée de la partie: 15 minutes</p>
      <div className="button-container">
        <button className="button" onClick={() => setGameStarted(true)}>DEMARRER PARTIE</button>
        <button className="button" onClick={() => setPopupOpen(true)}>
          Initialiser le code
        </button>
        <Link to="/" className="button">RETOUR AU MENU</Link>
      </div>
    </div>
  );
};

export default DemoMode;
