import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';
import Chrono from '../../components/Chrono/Chrono';

const PageDemo: React.FC = () => {
  const [gameStarted, setGameStarted] = useState(false);

  if (gameStarted) {
    return (
      <div data-testid="demo-game-screen">
        <div data-testid="demo-timer">
          <Chrono initialTime={900} />
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <h1 data-testid="demo-title">MODE DEMO</h1>
      <p data-testid="demo-duration">Durée de la partie: 15 minutes</p>
      <div style={{ margin: '20px' }}>
        <button onClick={() => setGameStarted(true)} data-testid="demo-start-btn" className="button">DEMARRER PARTIE</button>
      </div>
    </div>
  );
};

export default PageDemo;
