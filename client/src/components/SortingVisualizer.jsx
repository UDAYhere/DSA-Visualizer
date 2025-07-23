import React, { useState } from 'react';
import './SortingVisualizer.css';

const SIZE_OPTIONS = [10, 20, 50, 100];
const SPEED_OPTIONS = [
  { label: 'Slow', value: 150 },
  { label: 'Medium', value: 60 },
  { label: 'Fast', value: 20 },
];
const SORT_OPTIONS = [
  { label: 'Bubble Sort', value: 'bubble' },
  { label: 'Quick Sort', value: 'quick' },
];
const MIN_HEIGHT = 10;
const MAX_HEIGHT = 400;

function getRandomArray(size) {
  return Array.from({ length: size }, () =>
    Math.floor(Math.random() * (MAX_HEIGHT - MIN_HEIGHT + 1)) + MIN_HEIGHT
  );
}

function SortingVisualizer() {
  const [arraySize, setArraySize] = useState(30);
  const [animationSpeed, setAnimationSpeed] = useState(60);
  const [array, setArray] = useState(getRandomArray(30));
  const [highlight, setHighlight] = useState([]); // indices being compared
  const [pivot, setPivot] = useState(null); // pivot index for quick sort
  const [isSorting, setIsSorting] = useState(false);
  const [sortType, setSortType] = useState('bubble');

  const regenerateArray = (size = arraySize) => {
    if (isSorting) return;
    setArray(getRandomArray(size));
    setHighlight([]);
    setPivot(null);
  };

  const handleSizeChange = (e) => {
    const newSize = parseInt(e.target.value, 10);
    setArraySize(newSize);
    regenerateArray(newSize);
  };

  const handleSpeedChange = (e) => {
    setAnimationSpeed(parseInt(e.target.value, 10));
  };

  const handleSortTypeChange = (e) => {
    setSortType(e.target.value);
  };

  const handleReset = () => {
    if (!isSorting) {
      regenerateArray();
    }
  };

  const bubbleSort = () => {
    setIsSorting(true);
    let arr = array.slice();
    let animations = [];
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        animations.push({ type: 'compare', indices: [j, j + 1] });
        if (arr[j] > arr[j + 1]) {
          animations.push({ type: 'swap', indices: [j, j + 1] });
          let temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
        }
      }
    }
    animateBubbleSort(animations);
  };

  const animateBubbleSort = (animations) => {
    let arr = array.slice();
    animations.forEach((action, idx) => {
      setTimeout(() => {
        if (action.type === 'compare') {
          setHighlight(action.indices);
        } else if (action.type === 'swap') {
          const [i, j] = action.indices;
          let newArr = arr.slice();
          let temp = newArr[i];
          newArr[i] = newArr[j];
          newArr[j] = temp;
          arr = newArr;
          setArray(newArr);
        }
        if (idx === animations.length - 1) {
          setTimeout(() => {
            setHighlight([]);
            setIsSorting(false);
          }, animationSpeed);
        }
      }, idx * animationSpeed);
    });
    if (animations.length === 0) {
      setIsSorting(false);
      setHighlight([]);
    }
  };

  // Quick Sort Animation
  const quickSort = () => {
    setIsSorting(true);
    let arr = array.slice();
    let animations = [];
    quickSortHelper(arr, 0, arr.length - 1, animations);
    animateQuickSort(animations);
  };

  function quickSortHelper(arr, low, high, animations) {
    if (low < high) {
      let pi = partition(arr, low, high, animations);
      quickSortHelper(arr, low, pi - 1, animations);
      quickSortHelper(arr, pi + 1, high, animations);
    }
  }

  function partition(arr, low, high, animations) {
    let pivot = arr[high];
    animations.push({ type: 'pivot', index: high });
    let i = low - 1;
    for (let j = low; j < high; j++) {
      animations.push({ type: 'compare', indices: [j, high] });
      if (arr[j] < pivot) {
        i++;
        animations.push({ type: 'swap', indices: [i, j] });
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
      }
    }
    animations.push({ type: 'swap', indices: [i + 1, high] });
    let temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
    return i + 1;
  }

  const animateQuickSort = (animations) => {
    let arr = array.slice();
    animations.forEach((action, idx) => {
      setTimeout(() => {
        if (action.type === 'compare') {
          setHighlight(action.indices);
        } else if (action.type === 'swap') {
          const [i, j] = action.indices;
          let newArr = arr.slice();
          let temp = newArr[i];
          newArr[i] = newArr[j];
          newArr[j] = temp;
          arr = newArr;
          setArray(newArr);
        } else if (action.type === 'pivot') {
          setPivot(action.index);
        }
        if (idx === animations.length - 1) {
          setTimeout(() => {
            setHighlight([]);
            setPivot(null);
            setIsSorting(false);
          }, animationSpeed);
        }
      }, idx * animationSpeed);
    });
    if (animations.length === 0) {
      setIsSorting(false);
      setHighlight([]);
      setPivot(null);
    }
  };

  const handleSort = () => {
    if (sortType === 'bubble') {
      bubbleSort();
    } else if (sortType === 'quick') {
      quickSort();
    }
  };

  return (
    <div className="sorting-visualizer">
      <h2>SortingVisualizer</h2>
      <div className="controls">
        <label>
          Array Size:
          <select value={arraySize} onChange={handleSizeChange} disabled={isSorting}>
            {SIZE_OPTIONS.map((size) => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
        </label>
        <label>
          Animation Speed:
          <select value={animationSpeed} onChange={handleSpeedChange} disabled={isSorting}>
            {SPEED_OPTIONS.map((speed) => (
              <option key={speed.value} value={speed.value}>{speed.label}</option>
            ))}
          </select>
        </label>
        <label>
          Algorithm:
          <select value={sortType} onChange={handleSortTypeChange} disabled={isSorting}>
            {SORT_OPTIONS.map((alg) => (
              <option key={alg.value} value={alg.value}>{alg.label}</option>
            ))}
          </select>
        </label>
      </div>
      <button className="regenerate-btn" onClick={() => regenerateArray()} disabled={isSorting}>
        Regenerate Array
      </button>
      <button className="sort-btn" onClick={handleSort} disabled={isSorting}>
        Visualize {SORT_OPTIONS.find(opt => opt.value === sortType).label}
      </button>
      <button className="reset-btn" onClick={handleReset} disabled={isSorting}>
        Reset
      </button>
      <div className="bars-container">
        {array.map((height, idx) => (
          <div
            className={`bar${highlight.includes(idx) ? ' highlighted' : ''}${pivot === idx ? ' pivot' : ''}`}
            key={idx}
            style={{ height: `${height}px` }}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default SortingVisualizer; 