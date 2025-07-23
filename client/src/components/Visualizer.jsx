import React from 'react';
import './Visualizer.css';

function Visualizer({ array, getBarColor }) {
  return (
    <div className="visualizer-container">
      {array.map((value, idx) => (
        <div
          key={idx}
          className="visualizer-bar"
          style={{
            height: `${value}px`,
            width: '20px',
            background: getBarColor ? getBarColor(idx) : '#3498db',
            margin: '0 3px',
            display: 'inline-block',
            borderRadius: '4px 4px 0 0',
            transition: 'height 0.3s, background 0.2s',
          }}
        ></div>
      ))}
    </div>
  );
}

export default Visualizer; 