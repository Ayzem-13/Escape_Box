import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import {
  readMusicPlaybackConfig,
  playbackSegmentIndex,
  SELECTED_MUSICS_KEY_DEMO,
  SELECTED_MUSICS_KEY_NORMAL,
} from '../../config/musicStorage';
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
import { MusicSelectorContext } from '../../context/MusicSelectorContext';
import InfoPopup from '../InfoPopup/InfoPopup';
import MusicSelector from '../MusicSelector/MusicSelector';
import { AdminSpyPopup } from '../AdminSpyPopup/AdminSpyPopup';
import LayoutVolumeFab from '../VolumeControl/VolumeControl';
import SettingsFab from '../SettingsFab/SettingsFab';
import GameResultPopup from '../GameResultPopup/GameResultPopup';
import { InfoIcon, LockIcon, MusicIcon, PaletteIcon } from '../../theme/icons';
import { THEME_ICONS } from '../../theme/themeIcons';
import { SOUND_EFFECTS } from '../../config/soundEffects';
import volumeManager from '../../services/volumeManager';
import '../../theme/ambient/index.css';
import './Layout.css';

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

const useMusicEngine = (selectedMusicsKey: string, isDemoRoute: boolean) => {
  const { gameStarted, chronoRemainingSec, chronoInitialSec } = useGame();
  const [isMusicOpen, setIsMusicOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const ambientBedRef = useRef<HTMLAudioElement | null>(null);
  const lastAppliedTrackIdxRef = useRef<number>(-1);
  const lastLogicalFileRef = useRef<string | null>(null);

  useEffect(() => {
    const audioEl = audioRef.current;
    const ambientEl = ambientBedRef.current;
    if (!gameStarted) {
      if (audioEl) {
        audioEl.pause();
        audioEl.currentTime = 0;
      }
      if (ambientEl) {
        ambientEl.pause();
        ambientEl.currentTime = 0;
      }
      lastAppliedTrackIdxRef.current = -1;
      lastLogicalFileRef.current = null;
      return;
    }

    if (!audioEl) return;

    const raw = localStorage.getItem(selectedMusicsKey);
    if (!raw) return;

    const { tracks, segmentCount } = readMusicPlaybackConfig(raw, isDemoRoute);

    if (tracks.length === 0) return;

    let targetIdx = 0;
    if (
      chronoRemainingSec !== null &&
      chronoInitialSec !== null &&
      chronoInitialSec > 0
    ) {
      targetIdx = playbackSegmentIndex({
        remainingSec: chronoRemainingSec,
        initialSec: chronoInitialSec,
        segmentCount,
      });
    }
    targetIdx = Math.min(targetIdx, tracks.length - 1);

    const wantFile = tracks[targetIdx].file;
    if (
      lastAppliedTrackIdxRef.current === targetIdx &&
      lastLogicalFileRef.current === wantFile
    ) {
      return;
    }

    lastAppliedTrackIdxRef.current = targetIdx;
    lastLogicalFileRef.current = wantFile;
    audioEl.src = wantFile;
    audioEl.play().catch(() => {});
  }, [
    gameStarted,
    selectedMusicsKey,
    isDemoRoute,
    chronoRemainingSec,
    chronoInitialSec,
  ]);

  /** Lit sonore en boucle : seulement si une playlist est configurée et la partie tourne. */
  useEffect(() => {
    const bed = ambientBedRef.current;
    if (!gameStarted || !bed) return;

    const raw = localStorage.getItem(selectedMusicsKey);
    if (!raw) {
      bed.pause();
      bed.currentTime = 0;
      return;
    }

    const { tracks } = readMusicPlaybackConfig(raw, isDemoRoute);
    if (tracks.length === 0) {
      bed.pause();
      bed.currentTime = 0;
      return;
    }

    volumeManager.applyVolumeToAllAudio();
    bed.play().catch(() => {});
  }, [gameStarted, selectedMusicsKey, isDemoRoute]);

  const handleMusicSelect = () => {};

  const handleMusicEnd = () => {
    const el = audioRef.current;
    if (!el || !gameStarted) return;
    el.currentTime = 0;
    el.play().catch(() => {});
  };

  return {
    audioRef,
    ambientBedRef,
    handleMusicEnd,
    handleMusicSelect,
    isMusicOpen,
    setIsMusicOpen,
    gameStarted,
  };
};

const LayoutMusicFab = () => {
  const { gameStarted } = useGame();

  if (gameStarted) return null;

  return (
    <MusicSelectorContext.Consumer>
      {({ openSelector }) => (
        <button
          type="button"
          onClick={openSelector}
          className="layout-music-fab"
          aria-label="Sélectionner une musique"
          title="Musique"
          data-testid="layout-music-btn"
        >
          <MusicIcon size={22} />
        </button>
      )}
    </MusicSelectorContext.Consumer>
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

// les sons jouent de façon aléatoire toutes les 15 à 35 secondes
const MIN_SOUND_DELAY = 15000; // 15 seconds
const MAX_SOUND_DELAY = 35000; // 35 seconds

const useSoundEffects = () => {
  const { gameStarted } = useGame();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const playRandomSound = () => {
      const audio = audioRef.current;
      if (!gameStarted || !audio) {
        return;
      }

      const sound =
        SOUND_EFFECTS[Math.floor(Math.random() * SOUND_EFFECTS.length)];
      audio.src = sound;
      audio.play().catch(() => {});

      const nextDelay =
        Math.random() * (MAX_SOUND_DELAY - MIN_SOUND_DELAY) + MIN_SOUND_DELAY;
      timeoutRef.current = window.setTimeout(playRandomSound, nextDelay);
    };

    if (gameStarted) {
      const initialDelay =
        Math.random() * (MAX_SOUND_DELAY - MIN_SOUND_DELAY) + MIN_SOUND_DELAY;
      timeoutRef.current = window.setTimeout(playRandomSound, initialDelay);
    } else if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [gameStarted]);

  return { soundEffectAudioRef: audioRef };
};

const LayoutInnerContent = () => {
  const t = useTheme();
  const { pathname } = useLocation();
  const isDemoRoute = pathname === '/demo';
  const selectedMusicsKey = isDemoRoute
    ? SELECTED_MUSICS_KEY_DEMO
    : SELECTED_MUSICS_KEY_NORMAL;
  const {
    audioRef,
    handleMusicEnd,
    handleMusicSelect,
    isMusicOpen,
    setIsMusicOpen,
    gameStarted,
  } = useMusicEngine(selectedMusicsKey, isDemoRoute);
  const { soundEffectAudioRef } = useSoundEffects();

  const musicCtx = useMemo(
    () => ({
      openSelector: () => setIsMusicOpen(true),
      isAvailable: !gameStarted,
    }),
    [gameStarted, setIsMusicOpen],
  );

  return (
    <MusicSelectorContext.Provider value={musicCtx}>
      <div className="layout-shell" style={{ color: t.color.text, minHeight: '100vh' }}>
        <LayoutHeader />
        <main>
          <Outlet />
        </main>
        <LayoutThemeFab />
        <LayoutMusicFab />
        <LayoutVolumeFab />
        <LayoutInfoFab />
        <LayoutAdminSpyFab />
        <SettingsFab />
        <GameResultPopup />
        <audio
          ref={audioRef}
          onEnded={handleMusicEnd}
          data-testid="layout-game-music"
          data-escape-game-music="true"
        />
        <audio
          ref={soundEffectAudioRef}
          data-testid="layout-sound-effect"
          data-escape-sound-effect="true"
        />
        {isMusicOpen && !gameStarted && (
          <MusicSelector
            onClose={() => setIsMusicOpen(false)}
            onSelect={handleMusicSelect}
            storageKey={selectedMusicsKey}
            variant={isDemoRoute ? 'demo' : 'normal'}
          />
        )}
      </div>
    </MusicSelectorContext.Provider>
  );
};

const LayoutInner = () => (
  <GameProvider>
    <LayoutInnerContent />
  </GameProvider>
);

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
