import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { ThemeContext, themeToCssVars, useTheme } from '../../theme/theme';
import { availableThemes, type ThemeKey } from '../../theme/themes';
import { GameThemeContext, useGameTheme } from '../../theme/GameThemeContext';
import { GameProvider } from '../../context/GameProvider';
import { useGame } from '../../context/GameContext';
import InfoPopup from '../InfoPopup/InfoPopup';
import MusicSelector from '../MusicSelector/MusicSelector';
import { SELECTED_MUSIC_KEY } from '../BackgroundMusic/BackgroundMusic';
import './Layout.css';

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
