import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../theme/theme';
import '../../App.css';
import Chrono from '../../components/Chrono/Chrono';

const PageDemo: React.FC = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const t = useTheme();

  if (gameStarted) {
    return (
      <div data-testid="demo-game-screen" style={{ backgroundColor: t.color.bg, color: t.color.text }}>
        <div data-testid="demo-timer">
          <Chrono initialTime={900} />
        </div>
        <div style={{ textAlign: 'center', margin: t.spacing.lg }}>
          <Link to="/" className="button" data-testid="demo-back-link-game">RETOUR AU MENU</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="App" style={{ backgroundColor: t.color.bg, color: t.color.text }}>
      <h1 data-testid="demo-title" style={{ color: t.color.primary }}>MODE DEMO</h1>
      <p data-testid="demo-duration">Durée de la partie: 15 minutes</p>
      <div style={{ margin: t.spacing.lg }}>
        <button
          onClick={() => setGameStarted(true)}
          data-testid="demo-start-btn"
          className="button"
        >
          DEMARRER PARTIE
        </button>
      </div>
      <div style={{ margin: t.spacing.lg }}>
        <Link to="/" className="button" data-testid="demo-back-link">RETOUR AU MENU</Link>
      </div>
    </div>
  );
};

export default PageDemo;
