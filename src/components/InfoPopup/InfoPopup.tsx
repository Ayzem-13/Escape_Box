import React, { useState } from 'react';
import morseImage from '../../assets/images/International_Morse_Code-fr.svg.png';
import CaesarChart from '../CaesarChart/CaesarChart';
import './InfoPopup.css';

interface InfoPopupProps {
  onClose: () => void;
}

type PageId = 'morse' | 'caesar';

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
          {page.id === 'morse' ? <MorsePage /> : <CaesarChart />}
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
            ‹
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
            ›
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
