import { useState, useRef, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useTheme } from '../../theme/theme';
import { GameProvider } from '../../context/GameProvider';
import { useGame } from '../../context/GameContext';
import InfoPopup from '../InfoPopup/InfoPopup';
import MusicSelector from '../MusicSelector/MusicSelector';
import './Layout.css';

const SELECTED_MUSICS_KEY = 'escapeBoxSelectedMusics';

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
  const [playlistIndex, setPlaylistIndex] = useState(0);

  // Interface pour les musiques sélectionnées
  interface SelectedMusic {
    label: string;
    file: string;
  }

  // Charger les musiques sauvegardées au montage
  useEffect(() => {
    const savedMusics = localStorage.getItem(SELECTED_MUSICS_KEY);
    if (savedMusics && audioRef.current) {
      try {
        const musics: SelectedMusic[] = JSON.parse(savedMusics);
        if (musics.length > 0) {
          audioRef.current.src = musics[0].file;
          audioRef.current.play().catch(() => {
            // L'autoplay peut être bloqué par le navigateur
          });
          setPlaylistIndex(0);
        }
      } catch (e) {
        console.error('Erreur lors du chargement des musiques sauvegardées', e);
      }
    }
  }, []);

  const handleMusicSelect = (musics: SelectedMusic[]) => {
    if (musics.length === 0) return;

    // Sauvegarder dans localStorage
    localStorage.setItem(SELECTED_MUSICS_KEY, JSON.stringify(musics));

    // Jouer la première musique
    if (audioRef.current) {
      audioRef.current.src = musics[0].file;
      audioRef.current.play().catch(() => {
        // L'autoplay peut être bloqué par le navigateur
      });
      setPlaylistIndex(0);
    }
  };

  // Passer à la musique suivante quand la musique actuelle finit
  const handleMusicEnd = () => {
    const savedMusics = localStorage.getItem(SELECTED_MUSICS_KEY);
    if (savedMusics && audioRef.current) {
      try {
        const musics: SelectedMusic[] = JSON.parse(savedMusics);
        const nextIndex = (playlistIndex + 1) % musics.length;
        audioRef.current.src = musics[nextIndex].file;
        audioRef.current.play().catch(() => {});
        setPlaylistIndex(nextIndex);
      } catch (e) {
        console.error('Erreur lors de la lecture de la musique suivante', e);
      }
    }
  };

  return (
    <>
      <audio ref={audioRef} onEnded={handleMusicEnd} />
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
