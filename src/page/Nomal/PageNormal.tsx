import React from 'react';
import { useTheme } from '../../theme/theme';
import { useGame } from '../../context/GameContext';
import { CodesProvider } from '../../context/CodesProvider';
import { useCodes } from '../../context/CodesContext';
import Chrono from '../../components/Chrono/Chrono';
import Combinations from '../../components/Combinations/Combinations';
import CodeTester from '../../components/CodeTester/CodeTester';
import '../../App.css';
import FoundCodesIndicator from '../../components/FoundCodesIndicator/FoundCodesIndicator';

const NormalSetup: React.FC = () => {
  const t = useTheme();
  const { startGame } = useGame();
  const { allCodesSet } = useCodes();

  return (
    <div className="App">
      <h1 data-testid="normal-title">MODE NORMAL</h1>
      <p data-testid="normal-duration">Durée de la partie: 60 minutes</p>

      <Combinations
        testIdPrefix="normal"
        resetToastMessage="Combinaisons réinitialisées (mode normal)."
      />

      <button
        onClick={startGame}
        data-testid="normal-start-btn"
        className="button"
        disabled={!allCodesSet}
        style={{ marginTop: t.spacing.md }}
      >
        DEMARRER PARTIE
      </button>
    </div>
  );
};

const NormalGame: React.FC = () => {
  return (
    <div data-testid="normal-game-screen">
      <div data-testid="normal-timer">
        <Chrono initialTime={3600} />
      </div>
      <FoundCodesIndicator />
      <CodeTester testIdPrefix="normal" />
    </div>
  );
};

const PageNormal: React.FC = () => {
  const { gameStarted, session } = useGame();
  return (
    <CodesProvider mode="normal" slotCount={3} key={session}>
      {gameStarted ? <NormalGame /> : <NormalSetup />}
    </CodesProvider>
  );
};

export default PageNormal;
