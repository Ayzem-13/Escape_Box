import React from 'react';
import { Link } from 'react-router-dom';
import './PageTutos.css';

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
                    L'escape box est un outil central pour pouvoir réaliser un escape game.
                </p>
            </section>

            <section className="tutos-section" aria-label="phrase d accroche">
                <div className="tutos-card">
                    <h2 className="tutos-card-title">Phrase d'accroche</h2>
                    <p className="tutos-card-description">
                        L'escape box prend en charge un timer, dans deux modes d'utilisations: normal de 1 heure
                        et démo de 15 minutes.
                    </p>
                    <p className="tutos-card-description">
                        Elle permet de spécifier de 1 à 3 combinaisons de 4 symboles (une combinaison en mode
                        démo et 3 combinaisons en mode normal).
                    </p>
                    <p className="tutos-card-description">
                        Elle permet également aux joueurs de proposer des combinaisons de 4 symboles.
                        En cas d'erreur de combinaison proposée, une pénalité de minutes est appliquée
                        sur le compteur.
                    </p>
                </div>
            </section>

            <section className="tutos-section" aria-label="configuration">
                <div className="tutos-card">
                    <h2 className="tutos-card-title">Configuration</h2>
                    <p className="tutos-card-description">
                        Cette page présente les options de configuration disponibles avant et pendant la partie.
                    </p>
                </div>
            </section>

            <section className="tutos-section" aria-label="theme graphique">
                <div className="tutos-card">
                    <h2 className="tutos-card-title">Choix du thème graphique</h2>
                    <p className="tutos-card-description">
                        Il est possible de choisir un thème graphique parmi un certain nombre.
                    </p>
                </div>
            </section>

            <section className="tutos-section" aria-label="musique de fond">
                <div className="tutos-card">
                    <h2 className="tutos-card-title">Musique de fond</h2>
                    <p className="tutos-card-description">
                        Il est possible de choisir une musique de fond (mode démo et mode normal).
                    </p>
                    <p className="tutos-card-description">
                        Il est également possible de choisir 2 ou 4 musiques (mode normal) avec une évolution
                        dans le niveau de stress de la musique (numéro spécifié dans le nom de la musique,
                        le chiffre le plus élevé étant le plus stressant).
                    </p>
                    <p className="tutos-card-description">
                        Dans le cas du choix de 2 musiques, lors d'une partie, la deuxième musique apparaitra
                        au bout de 30 minutes.
                    </p>
                    <p className="tutos-card-description">
                        Dans le cas du choix de 4 musiques, lors d'une partie, les musiques se succéderont
                        toutes les 15 minutes.
                    </p>
                    <p className="tutos-card-description">Les musiques disponibles sont:</p>
                    <ul className="tutos-inline-list">
                        <li>Suspense Ambience</li>
                        <li>Suspense Tense Atmosphere</li>
                        <li>Tense Suspense Ambience</li>
                        <li>Metallic Ambiance</li>
                        <li>Horror Trailer</li>
                        <li>Dark Music Box Tension</li>
                        <li>Horror Background Atmosphere For Suspense</li>
                    </ul>
                </div>
            </section>

            <section className="tutos-section" aria-label="configuration des combinaisons">
                <div className="tutos-card">
                    <h2 className="tutos-card-title">Configuration des combinaisons des symboles</h2>
                    <p className="tutos-card-description">
                        L'administrateur du jeu configure la ou les combinaisons des symboles selon le mode
                        (1 ou 4).
                    </p>
                    <p className="tutos-card-description">
                        En cours de partie, l'administrateur peut vérifier les codes spécifiés via un accès
                        avec un mot de passe.
                    </p>
                    <p className="tutos-card-description">
                        L'administrateur peut changer le mot de passe par défaut (à configurer lors de la
                        première utilisation).
                    </p>
                </div>
            </section>

            <section className="tutos-section" aria-label="outils de resolution">
                <div className="tutos-card">
                    <h2 className="tutos-card-title">Outils de résolution d'énigmes</h2>
                    <p className="tutos-card-description">
                        En cours de session de jeu, les joueurs pourront trouver de l'aide pour décrypter
                        les énigmes, via le bouton Information (code morse, code césar, etc).
                    </p>
                </div>
            </section>

            <section className="tutos-section" aria-label="session de jeu">
                <div className="tutos-card">
                    <h2 className="tutos-card-title">Session de jeu</h2>
                    <p className="tutos-card-description">En cours de session de jeu, l'administrateur peut:</p>
                    <ul className="tutos-inline-list">
                        <li>relancer instantanément la session de jeu en redémarrant le timer (conservation des combinaisons renseignées)</li>
                        <li>stopper la partie (réinitialisation des combinaisons)</li>
                    </ul>
                </div>
            </section>
        </div>
    );
};

export default PageTutos;
