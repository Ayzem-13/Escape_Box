import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { ThemeContext, themeToCssVars, useTheme } from '../../theme/theme';
import { availableThemes, type ThemeKey } from '../../theme/themes';
import { GameThemeContext, useGameTheme } from '../../theme/GameThemeContext';
import { GameProvider } from '../../context/GameProvider';
import { useGame } from '../../context/GameContext';
import InfoPopup from '../InfoPopup/InfoPopup';
import MusicSelector from '../MusicSelector/MusicSelector';
import './Layout.css';

const SELECTED_MUSICS_KEY = 'escapeBoxSelectedMusics';

const THEME_LABELS: Record<ThemeKey, string> = {
  light: '☀️ Blue Sky',
  dark: '🌙 Midnight',
  nature: '🌿 Forest',
};

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

  const handleClose = () => {
    setIsMusicOpen(false);
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
          onClose={handleClose}
          onSelect={handleMusicSelect}
        />
      )}
    </>
  );
};

const LayoutThemeFab = () => {
  const { gameStarted } = useGame();
  const { themeKey, setThemeKey } = useGameTheme();
  const [isOpen, setIsOpen] = useState(false);

  if (gameStarted) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        className="layout-theme-fab"
        aria-label="Changer le thème"
        title="Thème"
        data-testid="layout-theme-btn"
      >
        🎨
      </button>
      {isOpen && (
        <div className="layout-theme-dropdown">
          {(Object.keys(availableThemes) as ThemeKey[]).map((key) => (
            <button
              key={key}
              className={key === themeKey ? 'active' : ''}
              onClick={() => { setThemeKey(key); setIsOpen(false); }}
            >
              {THEME_LABELS[key]}
            </button>
          ))}
        </div>
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

const LayoutInner = () => {
  const t = useTheme();
  return (
    <GameProvider>
      <div style={{ backgroundColor: t.color.bg, color: t.color.text, minHeight: '100vh' }}>
        <LayoutHeader />
        <main>
          <Outlet />
        </main>
        <LayoutThemeFab />
        <LayoutMusicFab />
        <LayoutInfoFab />
      </div>
    </GameProvider>
  );
};

const Layout = () => {
  const location = useLocation();
  const [themeKey, setThemeKey] = useState<ThemeKey>('light');
  const containerRef = useRef<HTMLDivElement>(null);

  // Reset theme independently for each route
  useEffect(() => {
    setThemeKey('light');
  }, [location.pathname]);

  const theme = useMemo(() => availableThemes[themeKey], [themeKey]);

  // Apply CSS vars to the layout container only (not :root → home page unaffected)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const vars = themeToCssVars(theme);
    for (const [name, value] of Object.entries(vars)) {
      el.style.setProperty(name, value);
    }
  }, [theme]);

  const gameThemeValue = useMemo(() => ({ themeKey, setThemeKey }), [themeKey]);

  return (
    <GameThemeContext.Provider value={gameThemeValue}>
      <ThemeContext.Provider value={theme}>
        <div ref={containerRef} style={{ minHeight: '100vh' }}>
          <LayoutInner />
        </div>
      </ThemeContext.Provider>
    </GameThemeContext.Provider>
  );
};

export default Layout;
