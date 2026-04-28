# Escape Box

Un jeu de type "Escape Box" interactif développé avec React, TypeScript, Vite et Electron (pour un portage en application de bureau). Ce document est destiné aux développeurs souhaitant comprendre, maintenir ou contribuer au projet.

## 🌟 Fonctionnalités

- **Plusieurs modes de jeu :** Mode Normal et Mode Démo pour s'adapter aux différents besoins.
- **Système de code secret :** Une interface contextuelle (popup) permettant aux joueurs de sélectionner un code de 4 symboles (▲, ▼, 1, 2, A, B, etc.).
- **Validation de code interactive :** En cours de jeu, les utilisateurs peuvent tester des combinaisons avec des retours visuels (toast) et sonores (succès/échec).
- **Ambiance musicale évolutive :** Possibilité de sélectionner jusqu'à 4 musiques couvrant chacune un quart d'heure de la partie (0-15 min, 15-30 min, etc.) avec une fonction de pré-écoute intégrée au menu.
- **Chronomètre & Pénalités :** Suivi dynamique du temps de la partie. Une pénalité de -1 minute s'applique instantanément en cas de code incorrect.
- **Persistance des données :** Le code secret sélectionné et certains états sont stockés dans le `localStorage` du navigateur.
- **Interface globale :** Accès rapide aux fonctionnalités clés (comme la définition du code) depuis un menu flottant disponible sur les écrans de jeu.

## 🛠️ Stack Technique

- **Cœur :** [React 19](https://react.dev/) / [TypeScript](https://www.typescriptlang.org/)
- **Build Tool web :** [Vite](https://vitejs.dev/)
- **Application Desktop :** [Electron](https://www.electronjs.org/) (via [Vite Plugin Electron](https://github.com/electron-vite/vite-plugin-electron))
- **Génération d'exécutables :** Electron Packager / Electron Builder
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

Voici les commandes principales pour le développement et la compilation :

### 💻 Développement Web / Web build
- `npm run dev` : Lance le serveur de développement Vite (version web).
- `npm run build` ou `npm run build:web` : Compile l'application TypeScript et génère le build de production pour le web.
- `npm run preview` : Lance un serveur web local pour prévisualiser le build.

### 🖥️ Développement et génération d'exécutable (Electron)
- `npm run electron:dev` : Lance le serveur de développement Electron. 
- `npm run build:exe` : Compile et génère un exécutable standard (dossier avec l'exécutable).
- `npm run build:exe:portable` : Compile et génère une version *portable* (un seul `.exe` sans installation, via Electron Builder).

### 🧪 Tests et Qualité
- `npm run lint` : Lance l'analyse statique du code selon la configuration d'ESLint.
- `npm test` : Lance la suite de tests unitaires avec Vitest (il existe aussi `test:ui` et `test:coverage`).
- `npm run test:e2e` : Lance les tests End-to-End avec Playwright (il existe aussi `test:e2e:ui` et d'autres variantes dans le *package.json*).

## 📁 Architecture du Projet

```text
├── e2e/                     # Tests End-to-End (Playwright)
│   ├── pages/               # Page Objects (POM) pour abstraire l'UI E2E
│   └── *.spec.ts            # Fichiers de test E2E (scénarios)
├── electron/                # Scripts de la partie Bureau (Desktop)
│   ├── main.ts              # Point d'entrée du processus principal d'Electron
│   └── preload.ts           # Scripts de preload pour la communication IPC
├── public/                  # Assets statiques distribués tels quels
└── src/
    ├── assets/              # Fichiers médias statiques (images, effets sonores)
    ├── components/          # Composants React isolés et réutilisables
    │   ├── CaesarChart/     # Composants d'affichage du diagramme de code César
    │   ├── Chrono/          # Gestion du temps et des pénalités
    │   ├── Code/            # Popup pour la définition initiale des codes
    │   ├── CodeIndicator/   # Indicateurs visuels pour le menu pre-game
    │   ├── CodeInput/       # Saisie de symboles et clavier interactif interactif
    │   ├── CodeTester/      # Interface In-Game pour tester des codes, sons et pénalités
    │   ├── Combinations/    # Interface de setup de la partie
    │   ├── FoundCodesIndicator/ # Indicateur in-game des codes valides et trouvés
    │   ├── InfoPopup/       # Alertes et informations textuelles pour les joueurs
    │   ├── Layout/          # Layout de base de l'application
    │   └── MusicSelector/   # Interface de sélection et pré-écoute des musiques avant la partie
    ├── config/              # Fichiers de configuration ou de constantes statiques
    ├── context/             # Gestion des états globaux
    │   ├── CodesContext     # Contexte de gestion des codes saisis
    │   └── GameContext      # Contexte de l'état général du jeu
    ├── page/                # Composants de Page liés au Routeur
    │   ├── Credits/         # Page des crédits
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
- **Tests Unitaires/Intégration (`src/test/`) :** Vérifient les composants individuellement (ex: calculs du `Chrono.tsx`, comportement du routage avec `renderWithRouter.tsx`). L'isolation des tests exige un "wrapper" spécifique : `renderWithRouter.tsx`, car les composants dépendent intimement du GameContext et du MemoryRouter pour simuler la navigation.
- **Tests E2E (`e2e/`) :** Les scénarios critiques (tests des modes normal de la homepage au jeu complété) sont valides via Playwright simulant un véritable navigateur. Architecture **Page Object Model (POM)** dans le dossier `pages/` (ex: `HomePage.ts`, `DemoModePage.ts`).

---

## � Fonctionnement du Jeu (Game Flow)

Le cycle de vie d'une session d'Escape Box se divise en deux étapes majeures : la configuration par le Game Master, et la résolution par les Joueurs.

1. **Préparation (Game Master) :** 
   - Sur l'écran d'accueil, le GM choisit le mode de difficulté (Normal ou Démo).
   - Via l'interface, il définit la combinaison secrète de 4 symboles (le "Code Maître").
   - Il sélectionne son thème visuel (bouton Palette 🎨) et configure l'ambiance musicale via une fenêtre modale 🎵 permettant de programmer 4 pistes audios (et de les pré-écouter).
2. **Lancement :** Le chronomètre (habituellement de 60 minutes) est déclenché. Le menu de musique disparaît, le lecteur audio démarre automatiquement la première piste, et l'interface se concentre sur le pavé de saisie pour les joueurs.
3. **Phase de Résolution (Joueurs) :** Les joueurs recourent aux indices locaux pour déduire les codes et les testent sur l'interface numérique.
4. **Validation et Sanctions :**
   - 🎯 **Correct :** Feedback sonore positif, et animation visuelle.
   - ❌ **Incorrect :** Alerte vibrante (Toast CSS), bruitage d'erreur, et application d'une **pénalité immédiate de time-out (-1 minute)** diminuant le temps restant.
5. **Surveillance (Game Master) :** En cours de jeu, le GM peut cliquer secrètement sur l'icône "Espion" (🔒) pour consulter les mots de passe attendus.
6. **Fin de partie :** Le jeu s'arrête soit quand le but est atteint, soit quand le chrono tombe à zéro, ou si le GM force l'arrêt.

## ✅ État Actuel du Développement (Ce qui fonctionne)

L'application est mature concernant les mécaniques fondamentales. Voici ce qui est totalement opérationnel aujourd'hui :

- ✔️ **Routage et Modes :** Navigation SPA fluide entre Accueil, Normal, Démo et Crédits.
- ✔️ **Moteur du Chronomètre :** Calculation robuste via dérive du temps (delta). Les pénalités s'y appliquent de façon asynchrone sans bloquer l'affichage.
- ✔️ **Coffre-Fort & Inputs :** Clavier virtuel fonctionnel incluant le support des symboles atypiques (▲, ▼) et un retour UX instantané.
- ✔️ **Moteur Audio Avancé :** Lecture des sons UI, ainsi qu'une file d'attente musicale gérée entièrement en dehors du système de rendu React (via `HTMLAudioElement` en référence) basculant automatiquement les pistes à la fin de leur lecture.
- ✔️ **Persistance :** Sauvegarde immédiate du thème, des musiques et des codes via le cache du navigateur `localStorage`.
- ✔️ **Builds Web & Desktop :** Le projet se déploie sans erreur côté Vite (navigateur) et côté Electron (génération avec succès d'un setup `.exe` et portable).
- ✔️ **Tests unitaires :** L'intégralité de cette logique est validée par des tests automatisés Vitest / Playwright.

---

## �🏗️ Architecture et Documentation Technique

Cette section détaille les choix techniques.

### 1. Gestion de l'État (State Management)

Plutôt que d'utiliser une librairie externe complexe (Redux, Zustand), l'application s'appuie nativement sur l'**API Context de React** divisée par domaine métier pour limiter les re-rendus inutiles :

- **`GameContext`** gère l'état global et le cycle de vie d'une partie (`gameStarted` : Indique si le chronomètre est en route, Fonctions `startGame()` et `resetGame()`).
- **`CodesContext`** gère le système de coffre-fort et les énigmes (Stockage du code secret défini par le Game Master en début de session, gestion des codes trouvés par les joueurs, fonctions de validation).
- **`GameThemeContext` & `ThemeContext`** servent de moteur de thèmes dynamique (Définit les variables CSS via `ThemeContext.Provider`, permet de basculer entre différents thèmes).

### 2. Composants Cœurs & Cycle de Jeu

- **`Layout` et FABs (Floating Action Buttons)** : Le Layout enveloppe le `Outlet` (la vue courante) et instancie `LayoutMusicFab`, `LayoutThemeFab`, et `LayoutAdminSpyFab`.
- **`Chrono` (Gestion du Temps)** : S'appuie sur un calcul des deltas de temps et gère une logique d'application de **pénalités immédiates (-1 minute)** lors d'échecs de saisie de code.
- **`CodeTester` & `CodeInput`** : Interface de saisie joueur composée de 4 symboles. Déclenche un retour sonore (succès/échec) et ajoute les visuels de validation.
- **`MusicSelector`** : Système de gestion de bande-son d'ambiance avec **pré-écoute intégrée**.

### 3. Gestion Audio et Multimédia

Toute l'audio du jeu utilise l'objet natif `Audio` du navigateur, manipulé au travers de `useRef<HTMLAudioElement>` pour éviter des re-rendus React à chaque fraction de seconde lue.
La logique d'itération de la playlist réside dans le `Layout`. À l'événement `onEnded`, l'index de la piste active s'incrémente et la piste suivante est lancée.
Effets sonores d'action (SFX) instanciés localement dans les composants d'interaction (bips, avertissements, validations).

### 4. Persistance des Données (Storage)

L'application utilise le `localStorage` de l'API Web et stocke sous forme de JSON les clés suivantes :
- `escapeBoxCodeSystem` : Le ou les codes générés par le Game Master.
- `escapeBoxSelectedMusics` : La playlist des musiques choisies.
- `escapeBoxThemePerMode` : Le thème préféré de l'utilisateur par mode de jeu.

### 5. Spécificités Electron (Build Bureau)

Le portage de l'app de bureau repose sur le dossier `/electron` :
- `main.ts` : Crée la `BrowserWindow`, gère les événements au niveau de l'OS.
- `preload.ts` : Expose une API sécurisée (Context Isolation).

