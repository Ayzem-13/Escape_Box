import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useTheme } from '../../theme/theme';
import { GameProvider } from '../../context/GameProvider';
import { useGame } from '../../context/GameContext';
import InfoPopup from '../InfoPopup/InfoPopup';
import './Layout.css';

const LayoutHeader = () => {
  const t = useTheme();
  const { gameStarted, resetGame } = useGame();

  return (
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
  );
};

const LayoutInfoFab = () => {
  const { gameStarted } = useGame();
  const [isOpen, setIsOpen] = useState(false);

  if (!gameStarted) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="layout-info-fab"
        aria-label="Informations sur la partie"
        title="Informations"
        data-testid="layout-info-btn"
      >
        i
      </button>
      {isOpen && <InfoPopup onClose={() => setIsOpen(false)} />}
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
        <LayoutInfoFab />
      </div>
    </GameProvider>
  );
};

export default Layout;
