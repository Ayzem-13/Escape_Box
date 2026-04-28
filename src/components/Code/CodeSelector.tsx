import React from 'react';
import './CodeSelector.css';

interface CodeSelectorProps {
  options: string[];
  selectedValue?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

const CodeSelector: React.FC<CodeSelectorProps> = ({
  options,
  selectedValue,
  onChange,
  disabled = false,
  placeholder = 'Sélectionnez une option',
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleSelect = (value: string) => {
    onChange(value);
    setIsOpen(false);
  };

  const displayValue = selectedValue || placeholder;

  return (
    <div className="code-selector">
      <button
        type="button"
        className="code-selector-trigger"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        data-testid="selector-trigger"
      >
        <span className="code-selector-value">{displayValue}</span>
        <span className="code-selector-arrow">▼</span>
      </button>

      {isOpen && !disabled && (
        <ul className="code-selector-list" role="listbox" data-testid="selector-list">
          {options.map((option) => (
            <li key={option}>
              <button
                type="button"
                className={`code-selector-option ${
                  selectedValue === option ? 'code-selector-option--selected' : ''
                }`}
                onClick={() => handleSelect(option)}
                role="option"
                aria-selected={selectedValue === option}
                data-testid={`selector-option-${option}`}
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CodeSelector;
