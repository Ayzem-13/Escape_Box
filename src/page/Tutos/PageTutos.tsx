import React from 'react';
import { Link } from 'react-router-dom';
import './PageTutos.css';

const TUTORIAL_STEPS = [
    {
        title: '1. Choisis ton mode',
        description: 'Depuis l\'accueil, lance une partie normale ou un mode démo.',
    },
    {
        title: '2. Observe les indices',
        description: 'Teste des combinaisons, et note ce qui fonctionne pour éviter les erreurs.',
    },
    {
        title: '3. Gère ton chrono',
        description: 'Reste concentré: chaque minute compte.',
    },
    {
        title: '4. Coordonne l\'équipe',
        description: 'Répartissez les tâches pour progresser plus vite, puis recoupez les trouvailles ensemble.',
    },
];

const PageTutos: React.FC = () => {
    return (
        <div className="tutos-page" data-testid="tutos-page">
            <Link to="/" className="tutos-back-button" data-testid="tutos-page-back-link">
                ← Retour à l'accueil
            </Link>

            <section className="tutos-hero">
                <p className="tutos-hero-eyebrow">Guide Express</p>
                <h1 className="tutos-hero-title" data-testid="tutos-page-title">
                    Tutos
                </h1>
                <p className="tutos-hero-subtitle">
                    Tout ce qu'il faut pour démarrer vite et résoudre vos premières énigmes.
                </p>
                <p className="tutos-hero-subtitle">
                    Le but du jeu est de trouver les bons codes avant la fin du temps, en utilisant les indices
                    et les outils disponibles pour éliminer les mauvaises pistes.
                </p>
            </section>

            <section className="tutos-section" aria-label="explication du jeu">
                <div className="tutos-card">
                    <h2 className="tutos-card-title">Comment se déroule une partie ?</h2>
                    <p className="tutos-card-description">
                        Le but est que le joueur propose des combinaisons, puis vérifie ses essais avec les indicateurs de retour.
                    </p>
                    <p className="tutos-card-description">
                        En une heure, il doit trouver les 3 codes qui débloquent la boîte. Attention: les mauvaises tentatives peuvent faire perdre du temps précieux !
                        </p>
                </div>
            </section>

            <section className="tutos-section">
                <ul className="tutos-grid" data-testid="tutos-steps-list">
                    {TUTORIAL_STEPS.map((step) => (
                        <li key={step.title} className="tutos-card">
                            <h2 className="tutos-card-title">{step.title}</h2>
                            <p className="tutos-card-description">{step.description}</p>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
};

export default PageTutos;
