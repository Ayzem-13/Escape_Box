import { useState } from 'react'
import Normal from './normal'
import './App.css'
import DemoMode from './DemoMode';

function App() {
  const [count, setCount] = useState(0)
  const [isDemoMode, setDemoMode] = useState(false);

  if (isDemoMode) {
    return <DemoMode onBackToMenu={() => setDemoMode(false)} />;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Bienvenue dans Escape Box</h1>
        <p>Prêt à relever le défi ?</p>
        <div className="button-container">
          <button className="button">Commencer une partie</button>
          <button className="button">Commencer mode démo</button>
        </div>
      </header>
    </div>
  )
}
export default App
