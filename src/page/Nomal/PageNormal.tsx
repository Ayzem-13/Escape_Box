import { Link } from 'react-router-dom';
import '../../App.css'
import { useState } from 'react';
import Chrono from '../../components/Chrono/Chrono';


function PageNormal() {
  const [gameStarted, setGameStarted] = useState(false);

  return (
    <div className="App">
      {gameStarted && <Chrono initialTime={3600} />}
      <h1 data-testid="normal-title">Normal - Page</h1>
      <button
        onClick={() => setGameStarted(true)}
        data-testid="normal-launch-btn"
        className="button"
      >
        Lancez partie
      </button>
      <br />
    </div>
  );
}

export default PageNormal
