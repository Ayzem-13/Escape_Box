import React, { useState } from 'react';
import {
  CODE_CATEGORIES,
  CODE_CATEGORY_LABEL,
  CODE_LENGTH,
  CODE_TOKEN_SETS,
  type CodeCategory,
} from '../../config/codeSymbols';
import './CodeInput.css';

interface CodeInputProps {
  code: string[];
  onChange: (code: string[]) => void;
  disabled?: boolean;
  testIdPrefix?: string;
}

const CodeInput: React.FC<CodeInputProps> = ({
  code,
  onChange,
  disabled = false,
  testIdPrefix = 'code-input',
}) => {
  const [category, setCategory] = useState<CodeCategory>('symbols');
  const tokens = CODE_TOKEN_SETS[category];

  const handleTokenClick = (token: string) => {
    if (!disabled && code.length < CODE_LENGTH) {
      onChange([...code, token]);
    }
  };

  return (
    <div className="code-input" data-testid={testIdPrefix}>
      <div className="code-input-display">
        {Array(CODE_LENGTH).fill(null).map((_, index) => (
          <div
            key={index}
            className="code-input-slot"
            data-active={!disabled && index === code.length}
            data-filled={Boolean(code[index])}
          >
            {code[index] || ''}
          </div>
        ))}
      </div>

      <div className="code-input-tabs" role="tablist" aria-label="Catégorie de symboles">
        {CODE_CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            role="tab"
            aria-selected={cat === category}
            onClick={() => setCategory(cat)}
            disabled={disabled}
            data-testid={`${testIdPrefix}-tab-${cat}`}
            className="code-input-tab"
          >
            {CODE_CATEGORY_LABEL[cat]}
          </button>
        ))}
      </div>

      <div
        className="code-input-grid"
        data-category={category}
        data-testid={`${testIdPrefix}-grid-${category}`}
      >
        {tokens.map((token) => (
          <button
            key={token}
            type="button"
            onClick={() => handleTokenClick(token)}
            disabled={disabled || code.length >= CODE_LENGTH}
            className="code-input-token"
          >
            {token}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CodeInput;
