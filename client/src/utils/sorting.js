// Bubble Sort for visualization
// Each step: { array: [...], comparing: [i, j], swapped: true/false }
export function bubbleSortVisualizer(inputArr) {
  let arr = inputArr.slice();
  let steps = [];
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      let swapped = false;
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        swapped = true;
      }
      steps.push({
        array: arr.slice(),
        comparing: [j, j + 1],
        swapped,
      });
    }
  }
  return steps;
} 