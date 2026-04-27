# Escape Box

Un jeu de type "Escape Box" interactif développé avec React, TypeScript et Vite.

## 🌟 Fonctionnalités

- **Plusieurs modes de jeu :** Mode Normal et Mode Démo pour s'adapter aux différents besoins.
- **Système de code secret :** Une interface contextuelle (popup) permettant aux joueurs de sélectionner un code de 4 symboles géométriques (▲, ▼, ■, ●, etc.).
- **Persistance des données :** Le code secret sélectionné est stocké dans le `localStorage` du navigateur.
- **Interface globale :** Accès rapide aux fonctionnalités clés (comme la définition du code) depuis un menu flottant disponible sur les écrans de jeu.

## 🛠️ Technologies utilisées

- [React](https://react.dev/) - Bibliothèque UI
- [TypeScript](https://www.typescriptlang.org/) - Typage statique
- [Vite](https://vitejs.dev/) - Outil de build ultra-rapide
- [React Router](https://reactrouter.com/) - Gestion de la navigation

## 🚀 Installation et lancement

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

## 📁 Structure du projet

- `src/components/Layout/` : Gère l'affichage global et les éléments persistants de l'écran (ex: bouton de code).
- `src/components/Code/` : Contient la logique et l'interface de la popup de saisie du code secret à 4 symboles.
- `src/components/Nomal/` & `src/components/Demo/` : Contiennent les différentes vues selon le mode de jeu choisi.
- `src/App.tsx` : Point d'entrée de l'interface qui agit comme menu principal.
- `src/main.tsx` : Configuration du routage avec `react-router-dom`.
