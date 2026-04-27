import { useTheme } from '../../theme/theme';
import { useGame } from '../../context/GameContext';
import '../../App.css'
import Chrono from '../../components/Chrono/Chrono';
import { useState } from 'react';
import CodePopup from '../../components/Code/CodePopup';


function PageNormal() {
  const t = useTheme();
  const { gameStarted, startGame } = useGame();
  const [isCodePopupOpen, setIsCodePopupOpen] = useState(false);

  if (gameStarted) {
    return (
      <div data-testid="normal-game-screen" style={{ backgroundColor: t.color.bg, color: t.color.text }}>
        <div data-testid="normal-timer">
          <Chrono initialTime={3600} />
        </div>
      </div>
    );
  }

  return (
    <div className="App" style={{ backgroundColor: t.color.bg, color: t.color.text }}>
      <h1 data-testid="normal-title" style={{ color: t.color.primary }}>MODE NORMAL</h1>
      <p data-testid="normal-duration">Durée de la partie: 60 minutes</p>
      {!gameStarted && (
        <button onClick={() => setIsCodePopupOpen(true)} className="button">
          Définir la combinaison
        </button>
      )}
      {isCodePopupOpen && <CodePopup onClose={() => setIsCodePopupOpen(false)} />}
      <div style={{ margin: t.spacing.lg }}>
        <button
          onClick={startGame}
          data-testid="normal-start-btn"
          className="button"
        >
          DEMARRER PARTIE
        </button>
      </div>
    </div>
  );
};

export default PageNormal
