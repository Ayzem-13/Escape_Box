import React from 'react';
import { useTheme } from '../../theme/theme';
import { useGame } from '../../context/GameContext';
import '../../App.css';
import Chrono from '../../components/Chrono/Chrono';

const PageDemo: React.FC = () => {
  const t = useTheme();
  const { gameStarted, startGame } = useGame();

  if (gameStarted) {
    return (
      <div data-testid="demo-game-screen" style={{ backgroundColor: t.color.bg, color: t.color.text }}>
        <div data-testid="demo-timer">
          <Chrono initialTime={900} />
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
          onClick={startGame}
          data-testid="demo-start-btn"
          className="button"
        >
          DEMARRER PARTIE
        </button>
      </div>
    </div>
  );
};

export default PageDemo;
