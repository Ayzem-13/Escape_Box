import React, { useState } from 'react';
import './CaesarChart.css';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const shiftLetter = (letter: string, shift: number) =>
  ALPHABET[(ALPHABET.indexOf(letter) + ((shift % 26) + 26)) % 26];

interface CaesarChartProps {
  initialShift?: number;
  exampleWord?: string;
}

const CaesarChart: React.FC<CaesarChartProps> = ({
  initialShift = 3,
  exampleWord = 'BONJOUR',
}) => {
  const [shift, setShift] = useState(initialShift);
  const cipher = ALPHABET.map((l) => shiftLetter(l, shift));
  const exampleCipher = exampleWord.split('').map((l) => shiftLetter(l, shift)).join('');

  return (
    <div className="caesar-chart" data-testid="caesar-chart">
      <div className="caesar-chart-controls">
        <span>Décalage</span>
        <button
          type="button"
          className="caesar-chart-shift-btn"
          onClick={() => setShift((s) => s - 1)}
          aria-label="Diminuer le décalage"
          data-testid="caesar-chart-shift-down"
        >
          −
        </button>
        <span className="caesar-chart-shift-value" data-testid="caesar-chart-shift">
          {shift}
        </span>
        <button
          type="button"
          className="caesar-chart-shift-btn"
          onClick={() => setShift((s) => s + 1)}
          aria-label="Augmenter le décalage"
          data-testid="caesar-chart-shift-up"
        >
          +
        </button>
      </div>

      <div className="caesar-chart-row">
        <div className="caesar-chart-row-label">Clair</div>
        <div className="caesar-chart-letters">
          {ALPHABET.map((l) => (
            <span key={l} className="caesar-chart-letter caesar-chart-letter--plain">
              {l}
            </span>
          ))}
        </div>
      </div>

      <div className="caesar-chart-row">
        <div className="caesar-chart-row-label">Chiffré</div>
        <div className="caesar-chart-letters">
          {cipher.map((l, i) => (
            <span key={i} className="caesar-chart-letter caesar-chart-letter--cipher">
              {l}
            </span>
          ))}
        </div>
      </div>

      <p className="caesar-chart-example">
        Exemple : <code>{exampleWord}</code> → <code>{exampleCipher}</code>
      </p>
    </div>
  );
};

export default CaesarChart;
