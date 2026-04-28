import React, { useState } from 'react';
import morseImage from '../../assets/images/International_Morse_Code-fr.svg.png';
import CaesarChart from '../CaesarChart/CaesarChart';
import { ChevronLeftIcon, ChevronRightIcon } from '../../theme/icons';
import './InfoPopup.css';

interface InfoPopupProps {
  onClose: () => void;
}

type PageId = 'morse' | 'caesar' | 'morse-alphabet';

interface PageMeta {
  id: PageId;
  title: string;
  subtitle: string;
}

const PAGES: PageMeta[] = [
  {
    id: 'morse',
    title: 'Code morse international',
    subtitle: 'Référence pour décoder les indices de la partie.',
  },
  {
    id: 'morse-alphabet',
    title: 'Alphabet en Code Morse',
    subtitle: 'Manuscrit avec l\'équivalent morse pour chaque lettre et chiffre.',
  },
  {
    id: 'caesar',
    title: 'Code de César',
    subtitle: "Chiffrement par décalage : chaque lettre est remplacée par celle située n positions plus loin dans l'alphabet.",
  },
];

const MorsePage: React.FC = () => (
  <img
    src={morseImage}
    alt="Tableau du code morse international"
    className="info-popup-image"
    data-testid="info-popup-morse-image"
  />
);

const morseAlphabet = [
  { char: 'A', morse: '·—' },
  { char: 'B', morse: '—···' },
  { char: 'C', morse: '—·—·' },
  { char: 'D', morse: '—··' },
  { char: 'E', morse: '·' },
  { char: 'F', morse: '··—·' },
  { char: 'G', morse: '——·' },
  { char: 'H', morse: '····' },
  { char: 'I', morse: '··' },
  { char: 'J', morse: '·———' },
  { char: 'K', morse: '—·—' },
  { char: 'L', morse: '·—··' },
  { char: 'M', morse: '——' },
  { char: 'N', morse: '—·' },
  { char: 'O', morse: '———' },
  { char: 'P', morse: '·——·' },
  { char: 'Q', morse: '——·—' },
  { char: 'R', morse: '·—·' },
  { char: 'S', morse: '···' },
  { char: 'T', morse: '—' },
  { char: 'U', morse: '··—' },
  { char: 'V', morse: '···—' },
  { char: 'W', morse: '·——' },
  { char: 'X', morse: '—··—' },
  { char: 'Y', morse: '—·——' },
  { char: 'Z', morse: '——··' },
  { char: '0', morse: '————— ' },
  { char: '1', morse: '·———— ' },
  { char: '2', morse: '··——— ' },
  { char: '3', morse: '···—— ' },
  { char: '4', morse: '····— ' },
  { char: '5', morse: '····· ' },
  { char: '6', morse: '—···· ' },
  { char: '7', morse: '——··· ' },
  { char: '8', morse: '———·· ' },
  { char: '9', morse: '————· ' },
];

const MorseAlphabet: React.FC = () => {
  return (
    <div className="morse-alphabet-container">
      <div className="morse-alphabet-grid">
        {morseAlphabet.map((item) => (
          <div key={item.char} className="morse-alphabet-item">
            <div className="morse-letter">{item.char}</div>
            <div className="morse-code">{item.morse}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const InfoPopup: React.FC<InfoPopupProps> = ({ onClose }) => {
  const [pageIndex, setPageIndex] = useState(0);
  const page = PAGES[pageIndex];
  const totalPages = PAGES.length;

  const goPrev = () => setPageIndex((i) => Math.max(0, i - 1));
  const goNext = () => setPageIndex((i) => Math.min(totalPages - 1, i + 1));

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="info-popup-overlay"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-label={page.title}
      data-testid="info-popup"
    >
      <div className="info-popup-content">
        <h2 className="info-popup-title" data-testid="info-popup-title">{page.title}</h2>
        <p className="info-popup-subtitle">{page.subtitle}</p>

        <div className="info-popup-page" data-testid={`info-page-${page.id}`}>
          {page.id === 'morse' && <MorsePage />}
          {page.id === 'morse-alphabet' && <MorseAlphabet />}
          {page.id === 'caesar' && <CaesarChart />}
        </div>

        <div className="info-popup-pagination" role="navigation" aria-label="Pagination des aides">
          <button
            type="button"
            className="info-popup-page-btn"
            onClick={goPrev}
            disabled={pageIndex === 0}
            aria-label="Page précédente"
            data-testid="info-popup-prev"
          >
            <ChevronLeftIcon size={18} />
          </button>
          <div className="info-popup-page-dots">
            {PAGES.map((p, i) => (
              <button
                key={p.id}
                type="button"
                className="info-popup-page-dot"
                onClick={() => setPageIndex(i)}
                aria-current={i === pageIndex}
                aria-label={`Aller à la page ${i + 1}: ${p.title}`}
                data-testid={`info-popup-dot-${i}`}
              />
            ))}
          </div>
          <span className="info-popup-page-label">
            {pageIndex + 1} / {totalPages}
          </span>
          <button
            type="button"
            className="info-popup-page-btn"
            onClick={goNext}
            disabled={pageIndex === totalPages - 1}
            aria-label="Page suivante"
            data-testid="info-popup-next"
          >
            <ChevronRightIcon size={18} />
          </button>
        </div>

        <div className="info-popup-actions">
          <button
            type="button"
            onClick={onClose}
            className="info-popup-btn"
            data-testid="info-popup-close"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

export default InfoPopup;
