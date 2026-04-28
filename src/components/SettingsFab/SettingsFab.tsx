import React, { useEffect, useState } from 'react';
import { useGameTheme } from '../../theme/GameThemeContext';
import { availableThemes, THEME_LABELS, type ThemeKey } from '../../theme/themes';
import { THEME_ICONS } from '../../theme/themeIcons';
import { LockIcon, SettingsIcon, XIcon } from '../../theme/icons';
import { AdminSpyPopup } from '../AdminSpyPopup/AdminSpyPopup';
import './SettingsFab.css';

const VOLUME_STORAGE_KEY = 'escapeBoxVolume';

const SettingsFab: React.FC = () => {
  const { themeKey, setThemeKey } = useGameTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isSpyOpen, setIsSpyOpen] = useState(false);
  const [volume, setVolume] = useState(() => {
    const saved = localStorage.getItem(VOLUME_STORAGE_KEY);
    return saved ? parseFloat(saved) : 100;
  });

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen]);

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    localStorage.setItem(VOLUME_STORAGE_KEY, String(newVolume));
    document.querySelectorAll('audio').forEach((audio) => {
      audio.volume = newVolume / 100;
    });
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        className="settings-fab"
        aria-label="Paramètres"
        title="Paramètres"
        data-testid="settings-fab-btn"
      >
        <SettingsIcon size={22} />
      </button>

      {isOpen && (
        <div
          className="settings-fab-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsOpen(false);
          }}
        >
          <div
            className="settings-fab-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Paramètres"
          >
            <div className="settings-fab-header">
              <h2 className="settings-fab-title">Paramètres</h2>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="settings-fab-close"
                aria-label="Fermer les paramètres"
              >
                <XIcon size={18} />
              </button>
            </div>

            <section className="settings-fab-section">
              <label htmlFor="settings-volume" className="settings-fab-label">
                Volume
              </label>
              <div className="settings-fab-volume">
                <input
                  id="settings-volume"
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={(e) => handleVolumeChange(Number(e.target.value))}
                  className="settings-fab-slider"
                />
                <span className="settings-fab-volume-value">{Math.round(volume)}%</span>
              </div>
            </section>

            <section className="settings-fab-section">
              <span className="settings-fab-label">Thème</span>
              <div className="settings-fab-themes">
                {(Object.keys(availableThemes) as ThemeKey[]).map((key) => {
                  const Icon = THEME_ICONS[key];
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setThemeKey(key)}
                      className={`settings-fab-theme-btn ${key === themeKey ? 'is-active' : ''}`}
                    >
                      <Icon size={18} />
                      <span>{THEME_LABELS[key]}</span>
                    </button>
                  );
                })}
              </div>
            </section>

            <section className="settings-fab-section">
              <span className="settings-fab-label">Accès</span>
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  setIsSpyOpen(true);
                }}
                className="settings-fab-link"
              >
                <LockIcon size={18} />
                <span>Voir les codes (admin)</span>
              </button>
            </section>
          </div>
        </div>
      )}

      {isSpyOpen && <AdminSpyPopup onClose={() => setIsSpyOpen(false)} />}
    </>
  );
};

export default SettingsFab;
