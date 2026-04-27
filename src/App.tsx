import { Link } from 'react-router-dom';
import './App.css'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Bienvenue dans Escape Box</h1>
        <p>Prêt à relever le défi ?</p>
        <div className="button-container">
          <Link to="/normal" className="button">Commencer une partie</Link>
          <Link to="/demo" className="button">Commencer mode démo</Link>
        </div>
      </header>
    </div>
  )
}
export default App
