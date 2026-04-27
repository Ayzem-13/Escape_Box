import React from 'react';
import { useCodes } from '../../context/CodesContext';
import './CodeIndicator.css';

const CodeIndicator: React.FC = () => {
  const { codes, filledCount } = useCodes();

  return (
    <div
      className="code-indicator"
      data-testid="code-indicator"
      aria-label={`${filledCount} sur 3 combinaisons définies`}
    >
      <div className="code-indicator-dots">
        {([0, 1, 2] as const).map((i) => (
          <span
            key={i}
            className="code-indicator-dot"
            data-testid={`code-dot-${i}`}
            data-filled={codes[i].length === 4}
          />
        ))}
      </div>
      <p className="code-indicator-count" data-testid="code-count">
        {filledCount}/3 combinaisons enregistrées
      </p>
    </div>
  );
};

export default CodeIndicator;
