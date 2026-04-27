import React, { useState } from 'react';
import Timer from './components/Timer';

interface DemoModeProps {
  onBackToMenu: () => void;
}

const DemoMode: React.FC<DemoModeProps> = ({ onBackToMenu }) => {
  const [isGameStarted, setGameStarted] = useState(false);

  const handleStartGame = () => {
    setGameStarted(true);
  };

  if (isGameStarted) {
    return (
      <div>
        <Timer minutes={15} />
        <div style={{ textAlign: 'center', margin: '20px' }}>
            <button onClick={onBackToMenu}>RETOUR AU MENU</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ textAlign: 'center', paddingTop: '50px' }}>
      <h1>MODE DEMO</h1>
      <div style={{ margin: '20px' }}>
        <input type="text" placeholder="KEY COMBINATION" />
      </div>
      <p>Durée de la partie: 15 minutes</p>
      <div style={{ margin: '20px' }}>
        <button onClick={handleStartGame}>DEMARRER PARTIE</button>
      </div>
      <div style={{ margin: '20px' }}>
        <button onClick={onBackToMenu}>RETOUR AU MENU</button>
      </div>
    </div>
  );
};

export default DemoMode;
