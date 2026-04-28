import { useState, useRef, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useTheme } from '../../theme/theme';
import { GameProvider } from '../../context/GameProvider';
import { useGame } from '../../context/GameContext';
import InfoPopup from '../InfoPopup/InfoPopup';
import MusicSelector from '../MusicSelector/MusicSelector';
import './Layout.css';

const SELECTED_MUSIC_KEY = 'escapeBoxSelectedMusic';

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

const LayoutMusicFab = () => {
  const [isMusicOpen, setIsMusicOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Charger la musique sauvegardée au montage
  useEffect(() => {
    const savedMusicFile = localStorage.getItem(SELECTED_MUSIC_KEY);
    if (savedMusicFile && audioRef.current) {
      audioRef.current.src = savedMusicFile;
      audioRef.current.play().catch(() => {
        // L'autoplay peut être bloqué par le navigateur
      });
    }
  }, []);

  const handleMusicSelect = (_musicLabel: string, musicFile: string) => {
    // Sauvegarder dans localStorage
    localStorage.setItem(SELECTED_MUSIC_KEY, musicFile);
    
    // Jouer la musique
    if (audioRef.current) {
      audioRef.current.src = musicFile;
      audioRef.current.play().catch(() => {
        // L'autoplay peut être bloqué par le navigateur
      });
    }
  };

  return (
    <>
      <audio ref={audioRef} loop />
      <button
        type="button"
        onClick={() => setIsMusicOpen(true)}
        className="layout-music-fab"
        aria-label="Sélectionner une musique"
        title="Musique"
        data-testid="layout-music-btn"
      >
        ♪
      </button>
      {isMusicOpen && (
        <MusicSelector
          onClose={() => setIsMusicOpen(false)}
          onSelect={handleMusicSelect}
        />
      )}
    </>
  );
};

const LayoutInfoFab = () => {
  const { gameStarted } = useGame();
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  if (!gameStarted) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => setIsInfoOpen(true)}
        className="layout-info-fab"
        aria-label="Informations sur la partie"
        title="Informations"
        data-testid="layout-info-btn"
      >
        i
      </button>
      {isInfoOpen && <InfoPopup onClose={() => setIsInfoOpen(false)} />}
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
        <LayoutMusicFab />
        <LayoutInfoFab />
      </div>
    </GameProvider>
  );
};

export default Layout;
