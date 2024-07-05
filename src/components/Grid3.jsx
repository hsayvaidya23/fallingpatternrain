import React, { useState, useEffect } from 'react';
import '../Grid3.css';

const Grid3 = ({ cellSize = 40 }) => {
  const rows = 15;
  const cols = 20;
  const colors = ['pink', 'purple', 'red'];
  const colorDuration = 5000;

  const [grid, setGrid] = useState(
    Array(rows).fill().map(() => Array(cols).fill('black'))
  );
  const [currentColorIndex, setCurrentColorIndex] = useState(0);

  useEffect(() => {
    const updateGrid = () => {
      setGrid(prevGrid => {
        const newGrid = [...prevGrid];
        
        for (let i = rows - 1; i > 0; i--) {
          for (let j = 0; j < cols; j++) {
            newGrid[i][j] = newGrid[i-1][j];
          }
        }
        
        for (let j = 0; j < cols; j++) {
          newGrid[0][j] = Math.random() < 0.3 ? colors[currentColorIndex] : 'black';
        }
        
        return newGrid;
      });
    };

    const dropInterval = setInterval(updateGrid, 500);

    const colorInterval = setInterval(() => {
      setCurrentColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
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
          backgroundColor: color,
          width: `${cellSize}px`,
          height: `${cellSize}px`
        }} />
      ))}
    </div>
  );
};

export default Grid3;