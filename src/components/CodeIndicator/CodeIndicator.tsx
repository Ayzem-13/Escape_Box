import React from 'react';
import { useCodes } from '../../context/CodesContext';
import './CodeIndicator.css';

const CodeIndicator: React.FC = () => {
  const { codes, slotCount, filledCount } = useCodes();
  const label = slotCount === 1 ? 'combinaison enregistrée' : 'combinaisons enregistrées';

  return (
    <div
      className="code-indicator"
      data-testid="code-indicator"
      aria-label={`${filledCount} sur ${slotCount} ${label}`}
    >
      <div className="code-indicator-dots">
        {Array.from({ length: slotCount }).map((_, i) => (
          <span
            key={i}
            className="code-indicator-dot"
            data-testid={`code-dot-${i}`}
            data-filled={codes[i]?.length === 4}
          />
        ))}
      </div>
      <p className="code-indicator-count" data-testid="code-count">
        {filledCount}/{slotCount} {label}
      </p>
    </div>
  );
};

export default CodeIndicator;
