import { useTheme } from '../../theme/theme';
import { useGame } from '../../context/GameContext';
import '../../App.css'
import Chrono from '../../components/Chrono/Chrono';


function PageNormal() {
  const t = useTheme();
  const { gameStarted, startGame } = useGame();

  return (
    <div className="App" style={{ backgroundColor: t.color.bg, color: t.color.text }}>
      {gameStarted && <Chrono initialTime={3600} />}
      <h1 data-testid="normal-title" style={{ color: t.color.primary }}>Normal - Page</h1>
      {!gameStarted && (
        <button
          onClick={startGame}
          data-testid="normal-launch-btn"
          className="button"
          style={{ marginBottom: t.spacing.md }}
        >
          Lancez partie
        </button>
      )}
    </div>
  );
}

export default PageNormal
