import React from 'react';
import { useTheme } from '../../theme/theme';
import { useGame } from '../../context/GameContext';
import { CodesProvider } from '../../context/CodesProvider';
import { useCodes } from '../../context/CodesContext';
import Chrono from '../../components/Chrono/Chrono';
import Combinations from '../../components/Combinations/Combinations';
import '../../App.css';

const DemoSetup: React.FC = () => {
  const t = useTheme();
  const { startGame } = useGame();
  const { allCodesSet } = useCodes();

  return (
    <div className="App" style={{ backgroundColor: t.color.bg, color: t.color.text }}>
      <h1 data-testid="demo-title" style={{ color: t.color.primary }}>MODE DEMO</h1>
      <p data-testid="demo-duration">Durée de la partie: 15 minutes</p>

      <Combinations
        testIdPrefix="demo"
        resetToastMessage="Combinaisons réinitialisées (mode démo)."
      />

      <button
        onClick={startGame}
        data-testid="demo-start-btn"
        className="button"
        disabled={!allCodesSet}
        style={{ marginTop: t.spacing.md }}
      >
        DEMARRER PARTIE
      </button>
    </div>
  );
};

const DemoGame: React.FC = () => {
  const t = useTheme();
  return (
    <div data-testid="demo-game-screen" style={{ backgroundColor: t.color.bg, color: t.color.text }}>
      <div data-testid="demo-timer">
        <Chrono initialTime={900} />
      </div>
    </div>
  );
};

const PageDemo: React.FC = () => {
  const { gameStarted, session } = useGame();
  return (
    <CodesProvider mode="demo" slotCount={1} key={session}>
      {gameStarted ? <DemoGame /> : <DemoSetup />}
    </CodesProvider>
  );
};

export default PageDemo;
