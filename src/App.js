import logo from './logo.svg';
import './App.css';
import { GameOfLife } from './components/GameOfLife';
import { World } from './objects/World';
import { useState } from 'react';

function App() {
  const [world, setWorld] = useState(new World(30,700));
  const [running, setRunning] = useState(false);

  return (
    <div className="App">
      <GameOfLife world={world} setWorld={setWorld} running={running} setRunning={setRunning}/>
    </div>
  );
}

export default App;
