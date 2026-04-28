import React from 'react';
import { useGame } from '../../context/GameContext';
import './GameResultPopup.css';

const GameResultPage: React.FC = () => {
  const { gameResult, resetGame } = useGame();

  if (!gameResult) return null;

  const isWin = gameResult === 'won';

  return (
    <div
      className={`game-result-page ${isWin ? 'is-win' : 'is-loss'}`}
      data-testid="game-result-page"
      data-result={gameResult}
      role="region"
      aria-labelledby="game-result-title"
    >
      <div className="game-result-emblem" aria-hidden="true">
        {isWin ? (
          <svg viewBox="0 0 64 64" width="72" height="72" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 8h32v10a16 16 0 0 1-16 16 16 16 0 0 1-16-16V8Z" />
            <path d="M16 12H8a8 8 0 0 0 8 12" />
            <path d="M48 12h8a8 8 0 0 1-8 12" />
            <path d="M24 50h16" />
            <path d="M22 56h20" />
            <path d="M32 34v16" />
          </svg>
        ) : (
          <svg viewBox="0 0 64 64" width="72" height="72" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="32" cy="32" r="22" />
            <path d="M22 28l4 4-4 4" />
            <path d="M42 28l-4 4 4 4" />
            <path d="M22 46c4-4 16-4 20 0" />
          </svg>
        )}
      </div>

      <p className="game-result-eyebrow">
        {isWin ? 'Évasion réussie' : 'Évasion manquée'}
      </p>

      <h1 id="game-result-title" className="game-result-title">
        {isWin ? 'VOUS AVEZ GAGNÉ' : 'VOUS AVEZ PERDU'}
      </h1>

      <div className="game-result-actions">
        <button
          type="button"
          onClick={resetGame}
          className="game-result-btn game-result-btn--primary"
          data-testid="game-result-close"
        >
          QUITTER
        </button>
      </div>
    </div>
  );
};

export default GameResultPage;
