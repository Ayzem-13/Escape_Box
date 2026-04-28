import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { ThemeContext, themeToCssVars, useTheme } from '../../theme/theme';
import {
  availableThemes,
  DEFAULT_THEME_KEY,
  THEME_LABELS,
  type ThemeKey,
} from '../../theme/themes';
import { GameThemeContext, useGameTheme } from '../../theme/GameThemeContext';
import { GameProvider } from '../../context/GameProvider';
import { useGame } from '../../context/GameContext';
import InfoPopup from '../InfoPopup/InfoPopup';
import MusicSelector from '../MusicSelector/MusicSelector';
import { AdminSpyPopup } from '../AdminSpyPopup/AdminSpyPopup';
import LayoutVolumeFab from '../VolumeControl/VolumeControl';
import { InfoIcon, LockIcon, MusicIcon, PaletteIcon } from '../../theme/icons';
import { THEME_ICONS } from '../../theme/themeIcons';
import '../../theme/ambient/index.css';
import './Layout.css';

const SELECTED_MUSICS_KEY = 'escapeBoxSelectedMusics';
const THEME_PER_MODE_KEY = 'escapeBoxThemePerMode';

const isThemeKey = (value: unknown): value is ThemeKey =>
  typeof value === 'string' && value in availableThemes;

const loadThemePerMode = (): Record<string, ThemeKey> => {
  try {
    const raw = localStorage.getItem(THEME_PER_MODE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    const out: Record<string, ThemeKey> = {};
    for (const [route, value] of Object.entries(parsed)) {
      if (isThemeKey(value)) out[route] = value;
    }
    return out;
  } catch {
    return {};
  }
};

const LayoutHeader = () => {
  const t = useTheme();
  const { gameStarted, resetGame, restartGame } = useGame();

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
        <>
          <button
            onClick={restartGame}
            className="button"
            data-testid="layout-restart-btn"
          >
            RECOMMENCER LA PARTIE
          </button>
          <button
            onClick={resetGame}
            className="button"
            data-testid="layout-stop-btn"
          >
            ARRÊTER LA PARTIE
          </button>
        </>
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
  const { gameStarted } = useGame();
  const [isMusicOpen, setIsMusicOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playlistIndex, setPlaylistIndex] = useState(0);

  interface SelectedMusic {
    label: string;
    file: string;
  }

  useEffect(() => {
    const savedMusics = localStorage.getItem(SELECTED_MUSICS_KEY);
    
    if (gameStarted && savedMusics && audioRef.current) {
      try {
        const musics: SelectedMusic[] = JSON.parse(savedMusics);
        if (musics.length > 0) {
          audioRef.current.src = musics[0].file;
          audioRef.current.play().catch(() => {});
          const handler = setTimeout(() => {
            setPlaylistIndex(0);
          }, 0);
          return () => clearTimeout(handler);
        }
      } catch (e) {
        console.error('Erreur lors du chargement des musiques sauvegardées', e);
      }
    } else if (!gameStarted && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [gameStarted]);

  const handleMusicSelect = (musics: SelectedMusic[]) => {
    if (musics.length === 0) return;

    localStorage.setItem(SELECTED_MUSICS_KEY, JSON.stringify(musics));
    setPlaylistIndex(0);
  };

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
      {!gameStarted && (
        <button
          type="button"
          onClick={() => setIsMusicOpen(true)}
          className="layout-music-fab"
          aria-label="Sélectionner une musique"
          title="Musique"
          data-testid="layout-music-btn"
        >
          <MusicIcon size={22} />
        </button>
      )}
      {isMusicOpen && !gameStarted && (
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
        <PaletteIcon size={22} />
      </button>
      {isOpen && (
        <div className="layout-theme-dropdown">
          {(Object.keys(availableThemes) as ThemeKey[]).map((key) => {
            const Icon = THEME_ICONS[key];
            return (
              <button
                key={key}
                className={key === themeKey ? 'active' : ''}
                onClick={() => { setThemeKey(key); setIsOpen(false); }}
              >
                <Icon size={18} />
                <span>{THEME_LABELS[key]}</span>
              </button>
            );
          })}
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
        <InfoIcon size={22} />
      </button>
      {isInfoOpen && <InfoPopup onClose={() => setIsInfoOpen(false)} />}
    </>
  );
};

const LayoutAdminSpyFab = () => {
  const [isSpyOpen, setIsSpyOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsSpyOpen(true)}
        className="layout-spy-fab"
        aria-label="Voir les mots de passe"
        title="Voir les codes"
        data-testid="layout-spy-btn"
      >
        <LockIcon size={22} />
      </button>
      {isSpyOpen && <AdminSpyPopup onClose={() => setIsSpyOpen(false)} />}
    </>
  );
};

const LayoutInner = () => {
  const t = useTheme();
  return (
    <GameProvider>
      <div style={{ color: t.color.text, minHeight: '100vh' }}>
        <LayoutHeader />
        <main>
          <Outlet />
        </main>
        <LayoutThemeFab />
        <LayoutMusicFab />
        <LayoutVolumeFab />
        <LayoutInfoFab />
        <LayoutAdminSpyFab />
      </div>
    </GameProvider>
  );
};

const Layout = () => {
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);

  const [themePerMode, setThemePerMode] = useState<Record<string, ThemeKey>>(
    () => loadThemePerMode(),
  );

  const themeKey: ThemeKey =
    themePerMode[location.pathname] ?? DEFAULT_THEME_KEY;

  const setThemeKey = useCallback((key: ThemeKey) => {
    setThemePerMode((prev) => {
      const next = { ...prev, [location.pathname]: key };
      try {
        localStorage.setItem(THEME_PER_MODE_KEY, JSON.stringify(next));
      } catch {
        // ignore storage errors
      }
      return next;
    });
  }, [location.pathname]);

  const theme = useMemo(() => availableThemes[themeKey], [themeKey]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const vars = themeToCssVars(theme);
    for (const [name, value] of Object.entries(vars)) {
      el.style.setProperty(name, value);
    }
  }, [theme]);

  useEffect(() => {
    document.documentElement.dataset.escapeTheme = themeKey;
    return () => {
      delete document.documentElement.dataset.escapeTheme;
    };
  }, [themeKey]);

  const gameThemeValue = useMemo(() => ({ themeKey, setThemeKey }), [themeKey, setThemeKey]);

  return (
    <GameThemeContext.Provider value={gameThemeValue}>
      <ThemeContext.Provider value={theme}>
        <div
          ref={containerRef}
          className="escape-ambient"
          data-theme={themeKey}
        >
          <LayoutInner />
        </div>
      </ThemeContext.Provider>
    </GameThemeContext.Provider>
  );
};

export default Layout;
