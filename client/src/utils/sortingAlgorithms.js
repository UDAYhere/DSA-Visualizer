// Bubble Sort Animation Steps
// Each step: { comparing: [i, j], swap: true/false }

export function bubbleSortAnimationSteps(arr) {
  const steps = [];
  let a = arr.slice();
  for (let i = 0; i < a.length - 1; i++) {
    for (let j = 0; j < a.length - i - 1; j++) {
      let swap = false;
      if (a[j] > a[j + 1]) {
        swap = true;
        // Swap in the array for next comparisons
        let temp = a[j];
        a[j] = a[j + 1];
        a[j + 1] = temp;
      }
      steps.push({ comparing: [j, j + 1], swap });
    }
  }
  return steps;
}

// Selection Sort Animation Steps
// Each step: { comparing: [i, j], swap: true/false }
export function selectionSortAnimationSteps(arr) {
  const steps = [];
  let a = arr.slice();
  for (let i = 0; i < a.length - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < a.length; j++) {
      steps.push({ comparing: [minIdx, j], swap: false });
      if (a[j] < a[minIdx]) {
        minIdx = j;
      }
    }
    if (minIdx !== i) {
      let temp = a[i];
      a[i] = a[minIdx];
      a[minIdx] = temp;
      steps.push({ comparing: [i, minIdx], swap: true });
    }
  }
  return steps;
}

// Insertion Sort Animation Steps
// Each step: { comparing: [i, j], swap: true/false }
export function insertionSortAnimationSteps(arr) {
  const steps = [];
  let a = arr.slice();
  for (let i = 1; i < a.length; i++) {
    let key = a[i];
    let j = i - 1;
    while (j >= 0 && a[j] > key) {
      steps.push({ comparing: [j, j + 1], swap: true });
      a[j + 1] = a[j];
      j = j - 1;
    }
    steps.push({ comparing: [j + 1, i], swap: false }); // Insert key
    a[j + 1] = key;
  }
  return steps;
}

// Merge Sort Animation Steps
// Each step: { comparing: [i, j], merge: true/false, array: [...] }
export function mergeSortAnimationSteps(arr) {
  const steps = [];
  let a = arr.slice();
  function mergeSortHelper(start, end) {
    if (start >= end) return;
    const mid = Math.floor((start + end) / 2);
    mergeSortHelper(start, mid);
    mergeSortHelper(mid + 1, end);
    merge(start, mid, end);
  }
  function merge(start, mid, end) {
    let left = a.slice(start, mid + 1);
    let right = a.slice(mid + 1, end + 1);
    let i = 0, j = 0, k = start;
    while (i < left.length && j < right.length) {
      steps.push({ comparing: [start + i, mid + 1 + j], merge: false, array: a.slice() });
      if (left[i] <= right[j]) {
        a[k] = left[i];
        i++;
      } else {
        a[k] = right[j];
        j++;
      }
      steps.push({ comparing: [k], merge: true, array: a.slice() });
      k++;
    }
    while (i < left.length) {
      a[k] = left[i];
      steps.push({ comparing: [k], merge: true, array: a.slice() });
      i++; k++;
    }
    while (j < right.length) {
      a[k] = right[j];
      steps.push({ comparing: [k], merge: true, array: a.slice() });
      j++; k++;
    }
  }
  mergeSortHelper(0, a.length - 1);
  return steps;
} 