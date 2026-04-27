# Escape Box

Un jeu de type "Escape Box" interactif développé avec React, TypeScript et Vite. Ce document est destiné aux développeurs souhaitant comprendre, maintenir ou contribuer au projet.

## 🌟 Fonctionnalités

- **Plusieurs modes de jeu :** Mode Normal et Mode Démo pour s'adapter aux différents besoins.
- **Système de code secret :** Une interface contextuelle (popup) permettant aux joueurs de sélectionner un code de 4 symboles géométriques (▲, ▼, ■, ●, etc.).
- **Validation de code interactive :** En cours de jeu, les utilisateurs peuvent tester des combinaisons avec des retours visuels (toast) et sonores (succès/échec).
- **Chronomètre & Pénalités :** Suivi dynamique du temps de la partie. Une pénalité de -1 minute s'applique instantanément en cas de code incorrect.
- **Persistance des données :** Le code secret sélectionné et certains états sont stockés dans le `localStorage` du navigateur.
- **Interface globale :** Accès rapide aux fonctionnalités clés (comme la définition du code) depuis un menu flottant disponible sur les écrans de jeu.

## 🛠️ Stack Technique

- **Cœur :** [React 18](https://react.dev/) / [TypeScript](https://www.typescriptlang.org/)
- **Build Tool :** [Vite](https://vitejs.dev/)
- **Routage :** [React Router](https://reactrouter.com/) (gestion de la navigation)
- **Tests Unitaires :** [Vitest](https://vitest.dev/) & [React Testing Library](https://testing-library.com/react)
- **Tests E2E :** [Playwright](https://playwright.dev/)
- **Linting :** ESLint

## 🚀 Installation et Lancement

### Prérequis
- **Node.js** (version 18 ou supérieure recommandée)
- **npm** (ou yarn / pnpm)

### Déploiement Local
1. **Cloner le projet** (si ce n'est pas déjà fait)
2. **Installer les dépendances :**
   ```bash
   npm install
   ```
3. **Lancer le serveur de développement :**
   ```bash
   npm run dev
   ```
4. Ouvrir le navigateur à l'adresse indiquée (généralement `http://localhost:5173`).

## 📜 Scripts NPM Disponibles

Voici les commandes principales pour le développement :

- `npm run dev` : Lance le serveur de développement Vite.
- `npm run build` : Compile l'application TypeScript et génère le build de production.
- `npm run preview` : Lance un serveur web local pour prévisualiser le build.
- `npm run lint` : Lance l'analyse statique du code selon la configuration d'ESLint.
- `npm test` : Lance la suite de tests unitaires avec Vitest en mode interactif.
- **Playwright** : Lancez les tests End-to-End via la commande standard `npx playwright test`.

## 📁 Architecture du Projet

```text
├── e2e/                     # Tests End-to-End (Playwright)
│   ├── pages/               # Page Objects (POM) pour abstraire l'UI E2E
│   └── *.spec.ts            # Fichiers de test E2E (scénarios)
├── public/                  # Assets statiques distribués tels quels
└── src/
    ├── assets/              # Fichiers médias statiques (images, effets sonores)
    ├── components/          # Composants React isolés et réutilisables
    │   ├── Chrono/          # Gestion du temps et des pénalités
    │   ├── Code/            # Popup pour la définition initiale des codes
    │   ├── CodeIndicator/   # Indicateurs visuels pour le menu pre-game
    │   ├── CodeInput/       # Saisie de symboles et clavier interactif interactif
    │   ├── CodeTester/      # Interface In-Game pour tester des codes, sons et pénalités
    │   ├── Combinations/    # Interface de setup de la partie
    │   ├── FoundCodesIndicator/ # Indicateur in-game des codes valides et trouvés
    │   └── Layout/          # Layout de base de l'application
    ├── context/             # Gestion des états globaux
    │   ├── CodesContext     # Contexte de gestion des codes saisis
    │   └── GameContext      # Contexte de l'état général du jeu
    ├── page/                # Composants de Page liés au Routeur
    │   ├── Demo/            # Logique spécifique de la Démo
    │   └── Nomal/           # Logique spécifique du mode Normal 
    ├── test/                # Configuration et fichiers de tests Unitaires
    ├── theme/               # Configurations typographiques & couleurs (ThemeProvider)
    ├── App.tsx              # Composant racine, configure les routes principales
    ├── index.css            # Styles globaux
    └── main.tsx             # Point d'entrée, montage sur le DOM
```

## 🧪 Qualité et Tests

L'application est fortement testée pour assurer la fiabilité du fonctionnement :
- **Tests Unitaires/Intégration (`src/test/`) :** Vérifient les composants individuellement (ex: calculs du `Chrono.tsx`, comportement du routage avec `renderWithRouter.tsx`).
- **Tests E2E (`e2e/`) :** Les scénarios critiques (tests des modes normal de la homepage au jeu complété) sont valides via Playwright simulant un véritable navigateur.

