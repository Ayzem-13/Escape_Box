import { Link } from 'react-router-dom';
import '../../App.css'
import React, { useState } from 'react';
import Chrono from '../Chrono/Chrono';


function Normal() {
  const [gameStarted, setGameStarted] = useState(false);

  return (
    <div className="App">
      {gameStarted && <Chrono initialTime={3600} />}
      <h1>Normal - Page</h1>
      <button
        onClick={() => setGameStarted(true)}
      >
        Lancez partie
      </button>
      <br />

      <Link to="/" className="button">Page d'accueil</Link>
    </div>
  );
}

export default Normal