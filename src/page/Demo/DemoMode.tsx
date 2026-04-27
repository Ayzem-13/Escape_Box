import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';
import Chrono from '../../components/Chrono/Chrono';

const DemoMode: React.FC = () => {
  const [gameStarted, setGameStarted] = useState(false);

  if (gameStarted) {
    return (
      <div data-testid="demo-game-screen">
        <div data-testid="demo-timer">
          <Chrono initialTime={900} />
        </div>
        <div style={{ textAlign: 'center', margin: '20px' }}>
          <Link to="/" className="button" data-testid="demo-back-link-game">RETOUR AU MENU</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <h1 data-testid="demo-title">MODE DEMO</h1>
      <div style={{ margin: '20px' }}>
        <input type="text" placeholder="KEY COMBINATION" data-testid="demo-key-input" />
      </div>
      <p data-testid="demo-duration">Durée de la partie: 15 minutes</p>
      <div style={{ margin: '20px' }}>
        <button onClick={() => setGameStarted(true)} data-testid="demo-start-btn">DEMARRER PARTIE</button>
      </div>
      <div style={{ margin: '20px' }}>
        <Link to="/" className="button" data-testid="demo-back-link">RETOUR AU MENU</Link>
      </div>
    </div>
  );
};

export default DemoMode;
