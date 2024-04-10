import logo from './logo.svg';
import './App.css';
import { GameOfLife } from './components/GameOfLife';
import { World } from './objects/World';
import { useState, useEffect, useRef } from 'react';

function App() {
  const [gridSize, setGridSize] = useState(20);
  const [numOfCells, setNumOfCells] = useState(gridSize*gridSize/2);
  const [world, setWorld] = useState(new World(gridSize, numOfCells));
  const [running, setRunning] = useState(false);

  

  return (
    <div className="App">
      <div className="left_side">
        <div className="set-size-container">
          <label htmlFor="set-size-input">Set grid size:</label>
          <input type="range" onChange={(e) => setGridSize(e.target.value)} className="set-size-input" placeholder='Size of grid' min="10" max="100"/>
          <button className="set-size-btn" onClick={() => setWorld(new World(gridSize, numOfCells))}>Set</button>
          {gridSize}
        </div>
        <div className="set-cells-container">
        <label htmlFor="set-size-input">Set num of cells:</label>
          <input type="range" onChange={(e) => setNumOfCells(e.target.value)} className="set-cells-input" placeholder="Set number of living cells" min="0" max={gridSize*gridSize}/>
          <button className="set-cells-btn" onClick={() => setWorld(new World(gridSize, numOfCells))}>Set</button>
          {numOfCells}
        </div>
        

      </div>
      <div className="container">
        <GameOfLife world={world} setWorld={setWorld} running={running} setRunning={setRunning}/>
      </div>
      <div className="right_side"></div>
    </div>
  );
}

export default App;
