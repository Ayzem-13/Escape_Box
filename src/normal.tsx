import { Link } from 'react-router-dom';
import './App.css'
import React, { useState } from 'react';
import Chrono from './Chrono';
import CodePopup from './CodePopup';


function Normal() {
  const [gameStarted, setGameStarted] = useState(false);
  const [isPopupOpen, setPopupOpen] = useState(false);

  return (
    <div className="App">
      {gameStarted && <Chrono initialTime={3600} />}
      {isPopupOpen && <CodePopup onClose={() => setPopupOpen(false)} />}
      <h1>Normal - Page</h1>
      <div className="button-container">
        <button className="button" onClick={() => setGameStarted(true)}>
          Lancez partie
        </button>
        <button className="button" onClick={() => setPopupOpen(true)}>
          Initialiser le code
        </button>
        <Link to="/" className="button">Page d'accueil</Link>
      </div>
    </div>
  );
}

export default Normal