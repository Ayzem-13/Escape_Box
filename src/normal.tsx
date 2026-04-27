import React from 'react';

export default function Normal() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Normal - Page</h1>
      <button
        onClick={() => alert('Partie lancée')}
      >
        Lancez partie
      </button>
      <br />

      <button
            onClick={() => alert('Retour à la page d\'accueil')}
            //@todo mettre le lien de la page d'accueil
      >
        Page d'accueil
      </button>
    </div>
  );
}