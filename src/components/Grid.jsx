// src/components/Grid.js
import React, { useEffect, useState } from 'react';
import Raindrop from './Raindrop';
// import './Grid.css';

const Grid = ({ rows, cols }) => {
  const [raindrops, setRaindrops] = useState([]);

  const createRaindrop = () => {
    const newRaindrop = {
      id: Date.now(),
      startCol: Math.floor(Math.random() * cols),
      speed: Math.random() * 500 + 200,
    };
    setRaindrops(prev => [...prev, newRaindrop]);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      createRaindrop();
    }, 500);

    return () => clearInterval(interval);
  }, [cols]);

  return (
    <div className="grid" style={{ width: `${cols * 30}px`, height: `${rows * 30}px` }}>
      {raindrops.map(raindrop => (
        <Raindrop
          key={raindrop.id}
          size={rows}
          startCol={raindrop.startCol}
          speed={raindrop.speed}
        />
      ))}
      {[...Array(rows * cols)].map((_, idx) => (
        <div key={idx} className="grid-cell"></div>
      ))}
    </div>
  );
};

export default Grid;
