import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useTheme } from '../../theme/theme';
import '../../App.css'
import Chrono from '../../components/Chrono/Chrono';


function PageNormal() {
  const [gameStarted, setGameStarted] = useState(false);
  const t = useTheme();

  return (
    <div className="App" style={{ backgroundColor: t.color.bg, color: t.color.text }}>
      {gameStarted && <Chrono initialTime={3600} />}
      <h1 data-testid="normal-title" style={{ color: t.color.primary }}>Normal - Page</h1>
      <button
        onClick={() => setGameStarted(true)}
        data-testid="normal-launch-btn"
        className="button"
        style={{ marginBottom: t.spacing.md }}
      >
        Lancez partie
      </button>
      <br />

      <Link to="/" className="button" data-testid="normal-back-link">Page d'accueil</Link>
    </div>
  );
}

export default PageNormal
