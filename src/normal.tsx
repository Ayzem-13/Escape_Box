import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Normal() {
  const [gameStarted, setGameStarted] = useState(false);

  const handleStartGame = () => {
    setGameStarted(true);
    console.log('Partie lancée');
  };

  const handleStopGame = () => {
    setGameStarted(false);
    console.log('Partie arrêtée');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Normal - Page</h1>
      <button onClick={handleStartGame}>
        Lancez partie
      </button>
      <br />

      {gameStarted && (
        <div style={{ margin: '20px' }}>
          <button onClick={handleStopGame} style={{ backgroundColor: '#ff6b6b', color: 'white' }}>
            ARRÊTER PARTIE
          </button>
        </div>
      )}

      <Link to="/" className="button">Page d'accueil</Link>
    </div>
  );
}