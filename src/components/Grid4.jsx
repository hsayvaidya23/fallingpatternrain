import React, { useState, useEffect } from 'react';
import '../Grid4.css';

const Grid4 = ({ cellSize = 40 }) => {
  const rows = 15;
  const cols = 20;
  const baseColors = ['#FF00FF', '#800080', '#FF0000']; // Bright pink, purple, red
  const colorDuration = 5000;

  const [grid, setGrid] = useState(
    Array(rows).fill().map(() => Array(cols).fill(null))
  );
  const [currentColorIndex, setCurrentColorIndex] = useState(0);

  const getGradientColor = (baseColor, step, totalSteps) => {
    const rgb = parseInt(baseColor.slice(1), 16);
    const r = (rgb >> 16) & 255;
    const g = (rgb >> 8) & 255;
    const b = rgb & 255;
    
    let factor;
    if (step === 0) {
      factor = 0.3; // Faint color for the top block
    } else if (step === totalSteps - 1) {
      factor = 1; // Bright color for the bottom block
    } else {
      factor = 0.6; // Medium color for middle blocks
    }
    
    return `rgb(${Math.round(r * factor)}, ${Math.round(g * factor)}, ${Math.round(b * factor)})`;
  };

  useEffect(() => {
    const updateGrid = () => {
      setGrid(prevGrid => {
        const newGrid = prevGrid.map(row => [...row]);
        
        // Move existing drops down
        for (let i = rows - 1; i >= 0; i--) {
          for (let j = 0; j < cols; j++) {
            if (newGrid[i][j]) {
              if (i < rows - 1) {
                newGrid[i+1][j] = newGrid[i][j];
              }
              newGrid[i][j] = null;
            }
          }
        }
        
        // Generate new drops at the top
        for (let j = 0; j < cols; j++) {
          if (!newGrid[0][j] && Math.random() < 0.05) { // 5% chance to start a new column
            const length = Math.floor(Math.random() * 3) + 3; // Random length between 3 and 5
            const baseColor = baseColors[currentColorIndex];
            for (let k = 0; k < length && k < rows; k++) {
              newGrid[k][j] = getGradientColor(baseColor, k, length);
            }
          }
        }
        
        return newGrid;
      });
    };

    const dropInterval = setInterval(updateGrid, 100);

    const colorInterval = setInterval(() => {
      setCurrentColorIndex((prevIndex) => (prevIndex + 1) % baseColors.length);
    }, colorDuration);

    return () => {
      clearInterval(dropInterval);
      clearInterval(colorInterval);
    };
  }, [currentColorIndex]);

  return (
    <div className="grid" style={{ 
      gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
      gridTemplateRows: `repeat(${rows}, ${cellSize}px)`
    }}>
      {grid.flat().map((color, index) => (
        <div key={index} className="cell" style={{ 
          backgroundColor: color || 'black',
          width: `${cellSize}px`,
          height: `${cellSize}px`
        }} />
      ))}
    </div>
  );
};

export default Grid4;