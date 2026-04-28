import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from './theme/theme';
import { AdminPopup } from './components/AdminPopup/AdminPopup';
import './App.css'

function App() {
  const t = useTheme();
  const [showAdminPopup, setShowAdminPopup] = useState(false);

  return (
    <div className="App">
      <header
        className="App-header"
        style={{ backgroundColor: t.color.bgInverse, color: t.color.textInverse }}
      >
        <h1 data-testid="home-title" style={{ color: t.color.primary }}>
          Bienvenue dans Escape Box
        </h1>
        <p data-testid="home-subtitle">Prêt à relever le défi ?</p>
        <div className="button-container" style={{ gap: t.spacing.lg, marginTop: t.spacing.lg }}>
          <Link to="/normal" className="button" data-testid="home-link-normal">
            Commencer une partie
          </Link>
          <Link to="/demo" className="button" data-testid="home-link-demo">
            Commencer mode démo
          </Link>
        </div>

        <Link
          to="/credits"
          className="button"
          data-testid="home-credits-link"
          style={{ marginTop: t.spacing.xl }}
        >
          Crédits
        </Link>
        
        <button
          className="button"
          data-testid="home-admin-link"
          style={{ marginTop: t.spacing.md, background: '#444' }}
          onClick={() => setShowAdminPopup(true)}
        >
          Configuration Admin
        </button>

      </header>
      {showAdminPopup && <AdminPopup onClose={() => setShowAdminPopup(false)} />}
    </div>
  )
}
export default App
