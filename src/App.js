
import React from 'react';
import './App.css';
import Grid4 from './components/Grid4';

function App() {
  return (
    <div className="App">
      <h1>Rain Pattern</h1>
      <Grid4 cellSize={40}/>
    </div>
  );
}

export default App