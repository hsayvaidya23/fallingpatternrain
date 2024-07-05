import React, { useState, useEffect } from 'react';
import "../Grid.css"// Assuming you'll create a separate CSS file

const Grid2 = () => {
  const rows = 15;
  const cols = 20;
  const [grid, setGrid] = useState(
    Array(rows).fill().map(() => Array(cols).fill('black'))
  );

  useEffect(() => {
    const colors = ['pink', 'purple', 'black', 'blue', 'red'];
    
    const updateGrid = () => {
      setGrid(prevGrid => {
        const newGrid = [...prevGrid];
        
        // Move existing drops down
        for (let i = rows - 1; i > 0; i--) {
          for (let j = 0; j < cols; j++) {
            newGrid[i][j] = newGrid[i-1][j];
          }
        }
        
        // Add new drops at the top
        for (let j = 0; j < cols; j++) {
          newGrid[0][j] = Math.random() < 0.3 ? colors[Math.floor(Math.random() * colors.length)] : 'black';
        }
        
        return newGrid;
      });
    };

    const intervalId = setInterval(updateGrid, 300);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="grid">
      {grid.map((row, i) => (
        <div key={i} className="row">
          {row.map((color, j) => (
            <div key={j} className="cell" style={{ backgroundColor: color }} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Grid2;