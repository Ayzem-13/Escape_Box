import { useEffect, useRef, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useTheme } from '../../theme/theme';
import { GameProvider } from '../../context/GameProvider';
import { useGame } from '../../context/GameContext';
import InfoPopup from '../InfoPopup/InfoPopup';
import MusicSelector from '../MusicSelector/MusicSelector';
import { SELECTED_MUSIC_KEY } from '../BackgroundMusic/BackgroundMusic';
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

const stopPreview = (audio: HTMLAudioElement | null) => {
  if (!audio) return;
  audio.pause();
  audio.currentTime = 0;
};

const LayoutMusicFab = () => {
  const { gameStarted } = useGame();
  const [isMusicOpen, setIsMusicOpen] = useState(false);
  const previewRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio();
    audio.loop = true;
    audio.volume = 0.4;
    audio.preload = 'auto';
    previewRef.current = audio;
    return () => {
      stopPreview(audio);
      audio.src = '';
      previewRef.current = null;
    };
  }, []);

  if (gameStarted) return null;

  const handleMusicSelect = (_musicLabel: string, musicFile: string) => {
    try {
      localStorage.setItem(SELECTED_MUSIC_KEY, musicFile);
    } catch {
      // ignore (private mode / quota)
    }
    const audio = previewRef.current;
    if (audio) {
      audio.src = musicFile;
      const result = audio.play();
      if (result && typeof result.catch === 'function') {
        result.catch(() => {});
      }
    }
  };

  const handleClose = () => {
    stopPreview(previewRef.current);
    setIsMusicOpen(false);
  };

  return (
    <>
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
          onClose={handleClose}
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
