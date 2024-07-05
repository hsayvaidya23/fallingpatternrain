// src/components/Raindrop.js
import React, { useEffect, useState } from 'react';
// import './Raindrop.css';

const Raindrop = ({ size, startCol, speed }) => {
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition(prev => (prev < size - 1 ? prev + 1 : 0));
    }, speed);

    return () => clearInterval(interval);
  }, [size, speed]);

  return (
    <div
      className="raindrop"
      style={{
        left: `${startCol * 30}px`,
        top: `${position * 30}px`,
      }}
    ></div>
  );
};

export default Raindrop;
