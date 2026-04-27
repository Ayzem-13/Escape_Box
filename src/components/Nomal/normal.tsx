import { Link } from 'react-router-dom';
import '../../App.css'
import React, { useState } from 'react';
import Chrono from '../../components/Chrono/Chrono';


function Normal() {
  const [gameStarted, setGameStarted] = useState(false);

  const handleStopGame = () => {
    setGameStarted(false);
  };

  return (
    <div className="App">
      {gameStarted && <Chrono initialTime={3600} isRunning={gameStarted} />}
      <h1 data-testid="normal-title">Normal - Page</h1>
      
      {!gameStarted ? (
        <button
          onClick={() => setGameStarted(true)}
          data-testid="normal-launch-btn"
        >
          Lancez partie
        </button>
      ) : (
        <button
          onClick={handleStopGame}
          data-testid="normal-stop-btn"
        >
          Arrêter partie
        </button>
      )}
      <br />

      <Link to="/" className="button" data-testid="normal-back-link">Page d'accueil</Link>
    </div>
  );
}

export default Normal