import React from 'react';

interface DemoModeProps {
  onBackToMenu: () => void;
}

const DemoMode: React.FC<DemoModeProps> = ({ onBackToMenu }) => {
  return (
    <div style={{ textAlign: 'center', paddingTop: '50px' }}>
      <h1>MODE DEMO</h1>
      <div style={{ margin: '20px' }}>
        <input type="text" placeholder="KEY COMBINATION" />
      </div>
      <p>Durée de la partie: 15 minutes</p>
      <div style={{ margin: '20px' }}>
        <button>DEMARRER PARTIE</button>
      </div>
      <div style={{ margin: '20px' }}>
        <button onClick={onBackToMenu}>RETOUR AU MENU</button>
      </div>
    </div>
  );
};

export default DemoMode;
