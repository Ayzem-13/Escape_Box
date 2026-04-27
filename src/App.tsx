import { Link } from 'react-router-dom';
import './App.css'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 data-testid="home-title">Bienvenue dans Escape Box</h1>
        <p data-testid="home-subtitle">Prêt à relever le défi ?</p>
        <div className="button-container">
          <Link to="/normal" className="button" data-testid="home-link-normal">Commencer une partie</Link>
          <Link to="/demo" className="button" data-testid="home-link-demo">Commencer mode démo</Link>
        </div>
      </header>
    </div>
  )
}
export default App
