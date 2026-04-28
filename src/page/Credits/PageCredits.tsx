import React from 'react';
import { Link } from 'react-router-dom';
import { CONTRIBUTORS, CREDITS_TAGLINE } from '../../config/credits';
import './PageCredits.css';

const getInitials = (name: string): string =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .map((n) => n[0]?.toUpperCase() ?? '')
    .slice(0, 2)
    .join('');

const PageCredits: React.FC = () => {
  return (
    <div className="credits-page" data-testid="credits-page">
      <section className="credits-hero">
        <p className="credits-hero-eyebrow">L'équipe</p>
        <h1 className="credits-hero-title" data-testid="credits-page-title">
          Crédits
        </h1>
        <p className="credits-hero-tagline">{CREDITS_TAGLINE}</p>
        <p className="credits-hero-tagline">Initiative ludopedagogique par Thierry Secqueville, Esimed 2026</p>
      </section>

      <section className="credits-section">
        <h2 className="credits-section-heading">Contributeurs</h2>
        <ul className="credits-grid" data-testid="credits-grid">
          {CONTRIBUTORS.map((c, index) => (
            <li
              key={c.name}
              className="credits-card"
              style={{ animationDelay: `${index * 80}ms` }}
              data-testid={`credits-card-${c.name}`}
            >
              <div className="credits-card-avatar" aria-hidden="true">
                {getInitials(c.name)}
              </div>
              <h3 className="credits-card-name">{c.name}</h3>
              {c.role && <span className="credits-card-role">{c.role}</span>}
              <p className="credits-card-quote">{c.quote}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="credits-section">
        <h2 className="credits-section-heading">Musique et effets sonores</h2>
        <ul className="credits-list">
          <li>Tense Suspense Ambience by AbsoluteSound</li>
          <li>Suspense Ambience 2 by AbsoluteSound</li>
          <li>Suspense Tense Atmosphere by AbsoluteSound</li>
          <li>
            Sound Effect by{' '}
            <a
              href="https://pixabay.com/users/universfield-28281460/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=476685"
              target="_blank"
              rel="noopener noreferrer"
            >
              Universfield
            </a>{' '}
            from{' '}
            <a
              href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=476685"
              target="_blank"
              rel="noopener noreferrer"
            >
              Pixabay
            </a>
          </li>
          <li>
            Sound Effect by{' '}
            <a
              href="https://pixabay.com/users/universfield-28281460/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=166944"
              target="_blank"
              rel="noopener noreferrer"
            >
              Universfield
            </a>{' '}
            from{' '}
            <a
              href="https://pixabay.com/sound-effects//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=166944"
              target="_blank"
              rel="noopener noreferrer"
            >
              Pixabay
            </a>
          </li>
          <li>
            Sound Effect by{' '}
            <a
              href="https://pixabay.com/users/simplesound-53070346/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=443327"
              target="_blank"
              rel="noopener noreferrer"
            >
              SimpleSound
            </a>{' '}
            from{' '}
            <a
              href="https://pixabay.com/sound-effects//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=443327"
              target="_blank"
              rel="noopener noreferrer"
            >
              Pixabay
            </a>
          </li>
          <li>
            Sound Effect by{' '}
            <a
              href="https://pixabay.com/users/freesound_community-46691455/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=53909"
              target="_blank"
              rel="noopener noreferrer"
            >
              freesound_community
            </a>{' '}
            from{' '}
            <a
              href="https://pixabay.com/sound-effects//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=53909"
              target="_blank"
              rel="noopener noreferrer"
            >
              Pixabay
            </a>
          </li>
        </ul>
      </section>

      <footer className="credits-footer">
        <Link
          to="/"
          className="credits-footer-back"
          data-testid="credits-page-back-link"
        >
          ← Retour à l'accueil
        </Link>
        <p className="credits-footer-meta">Escape Box · {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};

export default PageCredits;
