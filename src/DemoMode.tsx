import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const DemoMode: React.FC = () => {
  const [gameStarted, setGameStarted] = useState(false);

  const handleStartGame = () => {
    setGameStarted(true);
  };

  const handleStopGame = () => {
    setGameStarted(false);
    //todo arreter le timer et reset timer 
    console.log('Partie arrêtée');
  };

  return (
    <div >
      <h1>MODE DEMO</h1>
      <div style={{ margin: '20px' }}>
        <input type="text" placeholder="KEY COMBINATION" />
      </div>
      <p>Durée de la partie: 15 minutes</p>
      <div style={{ margin: '20px' }}>
        <button onClick={handleStartGame}>DEMARRER PARTIE</button>
      </div>
      {gameStarted && (
        <div style={{ margin: '20px' }}>
          <button onClick={handleStopGame} style={{ backgroundColor: '#ff6b6b', color: 'white' }}>
            ARRÊTER PARTIE
          </button>
        </div>
      )}
      <div style={{ margin: '20px' }}>
        <Link to="/" className="button">RETOUR AU MENU</Link>
      </div>
    </div>
  );
};

export default DemoMode;