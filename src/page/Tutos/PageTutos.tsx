import React from 'react';
import { Link } from 'react-router-dom';
import './PageTutos.css';

const TUTORIAL_STEPS = [
  {
    title: '1. Choisis ton mode',
    description: 'Depuis l\'accueil, lance une partie normale ou un mode démo pour découvrir les mécaniques.',
  },
  {
    title: '2. Observe les indices',
    description: 'Repère les symboles, teste des combinaisons, et note ce qui fonctionne pour éviter les erreurs.',
  },
  {
    title: '3. Utilise les outils',
    description: 'Le testeur de code et les indicateurs t\'aident à vérifier rapidement si tu avances dans la bonne direction.',
  },
  {
    title: '4. Gère ton chrono',
    description: 'Reste concentré: chaque minute compte. Priorise les énigmes bloquantes.',
  },
  {
    title: '5. Coordonne l\'équipe',
    description: 'Répartissez les tâches pour progresser plus vite, puis recoupez les trouvailles ensemble.',
  },
];

const TEAM_ROLES = [
  'Analyste: lit les indices et reformule les hypothèses clairement.',
  'Testeur: saisit les combinaisons et valide les retours du système.',
  'Archiviste: note chaque tentative pour éviter de répéter les mêmes erreurs.',
  'Gardien du temps: annonce les paliers du chrono et relance l\'équipe.',
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
            Chaque partie te place face à une série d'énigmes codées. Tu analyses les indices, proposes
            des combinaisons, puis vérifies tes essais avec les indicateurs de retour.
          </p>
          <p className="tutos-card-description">
            Plus tu avances, plus les codes demandent de la logique: il faut repérer les motifs,
            corriger rapidement les erreurs et garder une trace de ce qui a déjà été testé.
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

      <section className="tutos-section" aria-label="conditions de victoire">
        <div className="tutos-card">
          <h2 className="tutos-card-title">Pour gagner plus facilement</h2>
          <p className="tutos-card-description">
            Concentrez-vous d'abord sur les énigmes qui débloquent les autres. En équipe, attribuez un
            rôle à chacun (lecture des indices, test des codes, suivi du chrono) pour éviter les doublons.
          </p>
          <p className="tutos-card-description">
            Si vous bloquez, revenez à l'indice précédent et vérifiez vos hypothèses une par une: une
            méthode rigoureuse vaut mieux qu'une série d'essais au hasard.
          </p>
        </div>
      </section>

      <section className="tutos-section" aria-label="organisation de l'equipe">
        <div className="tutos-card">
          <h2 className="tutos-card-title">Organisation conseillée en équipe</h2>
          <p className="tutos-card-description">
            Avec 3 à 5 joueurs, répartissez les responsabilités pour accélérer la résolution et garder
            une vision claire de la progression.
          </p>
          <ul className="tutos-inline-list" data-testid="tutos-team-roles">
            {TEAM_ROLES.map((role) => (
              <li key={role}>{role}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="tutos-section" aria-label="plan d'action debut de partie">
        <div className="tutos-card">
          <h2 className="tutos-card-title">Plan d'action: les 5 premières minutes</h2>
          <p className="tutos-card-description">
            Minute 1: balayez rapidement tous les indices visibles. Minutes 2-3: choisissez une première
            hypothèse solide. Minutes 4-5: testez, notez le résultat, puis ajustez uniquement un élément
            à la fois.
          </p>
          <p className="tutos-card-description">
            Cette routine simple vous évite la dispersion et vous permet de garder un rythme efficace
            jusqu'à la résolution finale.
          </p>
        </div>
      </section>
    </div>
  );
};

export default PageTutos;
