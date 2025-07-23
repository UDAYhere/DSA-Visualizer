import React, { useState, useEffect } from 'react';
import { bubbleSortAnimationSteps } from '../utils/sortingAlgorithms';
import Visualizer from './Visualizer';

function AlgorithmExecutor({ algorithm, inputData, onResult }) {
  const [array, setArray] = useState(inputData.slice());
  const [steps, setSteps] = useState([]);
  const [highlight, setHighlight] = useState({ comparing: [], swap: false });
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    setArray(inputData.slice());
    setSteps([]);
    setHighlight({ comparing: [], swap: false });
    setIsRunning(false);
  }, [inputData, algorithm]);

  const startAnimation = () => {
    if (algorithm === 'bubble') {
      const animSteps = bubbleSortAnimationSteps(array);
      setSteps(animSteps);
      setIsRunning(true);
      animate(animSteps, 0, array.slice());
    }
  };

  const animate = (animSteps, idx, arr) => {
    if (idx >= animSteps.length) {
      setIsRunning(false);
      setHighlight({ comparing: [], swap: false });
      if (onResult) onResult(animSteps);
      return;
    }
    const step = animSteps[idx];
    setHighlight({ comparing: step.comparing, swap: step.swap });
    if (step.swap) {
      const [i, j] = step.comparing;
      let newArr = arr.slice();
      let temp = newArr[i];
      newArr[i] = newArr[j];
      newArr[j] = temp;
      setArray(newArr);
      setTimeout(() => animate(animSteps, idx + 1, newArr), 200);
    } else {
      setTimeout(() => animate(animSteps, idx + 1, arr), 200);
    }
  };

  // Bar color logic
  const getBarColor = (idx) => {
    if (highlight.comparing.includes(idx)) {
      return highlight.swap ? '#e74c3c' : '#f39c12'; // swap: red, compare: orange
    }
    return '#3498db';
  };

  return (
    <div>
      <Visualizer
        array={array}
        getBarColor={getBarColor}
      />
      <button onClick={startAnimation} disabled={isRunning} style={{marginTop: 20, fontSize: '1.1rem', padding: '8px 24px'}}>
        Start
      </button>
    </div>
  );
}

export default AlgorithmExecutor; 