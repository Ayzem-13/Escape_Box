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
    <>
      <Normal />
    </>
  )
}

export default App
