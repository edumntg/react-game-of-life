import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { GameOfLife } from './components/GameOfLife';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GameOfLife size={100} numOfCells={50}/>
  </React.StrictMode>
);
