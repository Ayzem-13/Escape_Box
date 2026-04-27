import { Link } from 'react-router-dom';

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

      <Link to="/" className="button">Page d'accueil</Link>
    </div>
  );
}