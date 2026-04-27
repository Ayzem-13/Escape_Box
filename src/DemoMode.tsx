import React from 'react';
import { Link } from 'react-router-dom';

const DemoMode: React.FC = () => {
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
        <Link to="/" className="button">RETOUR AU MENU</Link>
      </div>
    </div>
  );
};

export default DemoMode;
