import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { GameOfLife } from './components/GameOfLife';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GameOfLife rows={100} columns={100} numOfCells={500}/>
  </React.StrictMode>
);
