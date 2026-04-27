import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useTheme } from '../../theme/theme';
import { GameProvider } from '../../context/GameProvider';
import { useGame } from '../../context/GameContext';
import CodePopup from '../Code/CodePopup';
import './Layout.css';

const LayoutHeader = () => {
  const t = useTheme();
  const { gameStarted, resetGame } = useGame();
  const [isCodePopupOpen, setIsCodePopupOpen] = useState(false);

  return (
    <>
      <div
        className="layout-header"
        style={{
          top: t.spacing.sm,
          left: t.spacing.sm,
          right: 'auto',
          width: 'fit-content',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: t.spacing.sm,
        }}
      >
        {gameStarted && (
          <button
            onClick={resetGame}
            className="button"
            data-testid="layout-stop-btn"
          >
            ARRÊTER LA PARTIE
          </button>
        )}
        <Link
          to="/"
          className="button"
          data-testid="layout-back-link"
          onClick={resetGame}
        >
          RETOUR AU MENU
        </Link>
      </div>
    </>
  );
};

const Layout = () => {
  const t = useTheme();

  return (
    <GameProvider>
      <div style={{ backgroundColor: t.color.bg, color: t.color.text, minHeight: '100vh' }}>
        <LayoutHeader />
        <main>
          <Outlet />
        </main>
      </div>
    </GameProvider>
  );
};

export default Layout;
