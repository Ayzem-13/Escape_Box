import React from 'react';
import { useCodes } from '../../context/CodesContext';
import './FoundCodesIndicator.css';

const FoundCodesIndicator: React.FC = () => {
  const { slotCount, foundCount, foundCodes } = useCodes();
  const label = slotCount === 1 ? 'combinaison trouvée' : 'combinaisons trouvées';

  return (
    <div
      className="found-codes-indicator"
      data-testid="found-codes-indicator"
      aria-label={`${foundCount} sur ${slotCount} ${label}`}
    >
      <div className="found-codes-indicator-dots">
        {Array.from({ length: slotCount }).map((_, i) => (
          <span
            key={i}
            className="found-codes-indicator-dot"
            data-testid={`found-dot-${i}`}
            data-found={foundCodes[i]}
          />
        ))}
      </div>
      <p className="found-codes-indicator-count" data-testid="found-count">
        {foundCount}/{slotCount} {label}
      </p>
    </div>
  );
};

export default FoundCodesIndicator;
