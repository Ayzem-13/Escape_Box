import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import Timer from './components/Timer';

const DemoMode: React.FC = () => {
  const [gameStarted, setGameStarted] = useState(false);

  if (gameStarted) {
    return (
      <div>
        <Timer minutes={15} />
        <div style={{ textAlign: 'center', margin: '20px' }}>
          <Link to="/" className="button">RETOUR AU MENU</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <h1>MODE DEMO</h1>
      <div style={{ margin: '20px' }}>
        <input type="text" placeholder="KEY COMBINATION" />
      </div>
      <p>Durée de la partie: 15 minutes</p>
      <div style={{ margin: '20px' }}>
        <button onClick={() => setGameStarted(true)}>DEMARRER PARTIE</button>
      </div>
      <div style={{ margin: '20px' }}>
        <Link to="/" className="button">RETOUR AU MENU</Link>
      </div>
    </div>
  );
};

export default DemoMode;
