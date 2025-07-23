import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import AlgorithmExecutor from './components/AlgorithmExecutor';

const DEFAULT_ARRAY = [5, 3, 8, 4, 2];
const ALGORITHMS = [
  { label: 'Bubble Sort', value: 'bubble' },
  // Add more algorithms here
];

function App() {
  const [algorithm, setAlgorithm] = useState('bubble');
  const [inputArray, setInputArray] = useState(DEFAULT_ARRAY.slice());
  const [visualizeKey, setVisualizeKey] = useState(0); // To force remount for reset
  const initialArray = useRef(DEFAULT_ARRAY.slice());

  // For input field (optional, can be improved for user input)
  // const [inputValue, setInputValue] = useState(inputArray.join(','));

  const handleStart = () => {
    // Change key to force AlgorithmExecutor to re-run animation
    setVisualizeKey(prev => prev + 1);
  };

  const handleReset = () => {
    setInputArray(initialArray.current.slice());
    setVisualizeKey(prev => prev + 1);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>DSA Visualizer</h1>
        <div style={{ marginBottom: 24 }}>
          <label style={{ marginRight: 12 }}>
            Algorithm:
            <select
              value={algorithm}
              onChange={e => setAlgorithm(e.target.value)}
              style={{ marginLeft: 8, fontSize: '1rem', padding: '4px 10px', borderRadius: 4 }}
            >
              {ALGORITHMS.map(algo => (
                <option key={algo.value} value={algo.value}>{algo.label}</option>
              ))}
            </select>
          </label>
          {/* Input field for array (optional, can be added here) */}
        </div>
        <div style={{ marginBottom: 20 }}>
          <button
            onClick={handleStart}
            style={{ marginRight: 16, fontSize: '1.1rem', padding: '8px 24px' }}
          >
            Start Visualization
          </button>
          <button
            onClick={handleReset}
            style={{ fontSize: '1.1rem', padding: '8px 24px' }}
          >
            Reset Array
          </button>
        </div>
        <AlgorithmExecutor
          key={visualizeKey}
          algorithm={algorithm}
          inputData={inputArray}
          onResult={() => {}}
        />
      </header>
    </div>
  );
}

export default App;
