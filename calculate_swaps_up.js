/**
 * Calculates the minimum number of swaps needed to transform source order into target order
 * Implementation based on counting inversions as proven in:
 * https://stackoverflow.com/questions/20990127/sorting-a-sequence-by-swapping-adjacent-elements-using-minimum-swaps
 * @param {number[]} sourceOrder - The starting order of bells
 * @param {number[]} targetOrder - The desired order of bells
 * @returns {{ swaps: Array<[number, number]>, bellOrders: Array<number[]> }} Array of swaps and resulting orders
 */
function calculateMinimumSwaps(sourceOrder, targetOrder) {
  const n = sourceOrder.length;

  // First, create a mapping of target positions
  const targetPositions = new Map();
  for (let i = 0; i < n; i++) {
    targetPositions.set(targetOrder[i], i);
  }

  // Convert source array to relative positions
  const relativeOrder = sourceOrder.map(bell => targetPositions.get(bell));

  // Helper function to count inversions and track swaps during merge
  function mergeAndCount(arr, left, mid, right, swaps) {
    const temp = new Array(right - left + 1);
    let i = left;
    let j = mid + 1;
    let k = 0;
    let invCount = 0;

    while (i <= mid && j <= right) {
      if (arr[i] <= arr[j]) {
        temp[k++] = arr[i++];
      } else {
        // Found an inversion - all remaining elements in left half form inversions
        invCount += mid - i + 1;
        // Track the required swaps to fix these inversions
        for (let swap = mid; swap >= i; swap--) {
          swaps.push([swap, swap + 1]);
        }
        temp[k++] = arr[j++];
      }
    }

    while (i <= mid) {
      temp[k++] = arr[i++];
    }
    while (j <= right) {
      temp[k++] = arr[j++];
    }

    // Copy back to original array
    for (i = 0; i < k; i++) {
      arr[left + i] = temp[i];
    }

    return invCount;
  }

  // Helper function to sort and count inversions
  function sortAndCount(arr, left, right, swaps) {
    let invCount = 0;
    if (left < right) {
      const mid = Math.floor((left + right) / 2);
      invCount += sortAndCount(arr, left, mid, swaps);
      invCount += sortAndCount(arr, mid + 1, right, swaps);
      invCount += mergeAndCount(arr, left, mid, right, swaps);
    }
    return invCount;
  }

  // Get the sequence of swaps needed
  const swaps = [];
  const workingArray = [...relativeOrder];
  sortAndCount(workingArray, 0, n - 1, swaps);

  // Generate the sequence of bell orders
  const bellOrders = [sourceOrder.slice()];
  let currentOrder = sourceOrder.slice();
  const appliedSwaps = [];

  // Apply each swap and track the resulting orders
  for (const [i, j] of swaps) {
    // Only apply the swap if it follows the "lower bell first" rule
    if (currentOrder[i] < currentOrder[j]) {
      // Store the actual bell numbers being swapped
      appliedSwaps.push([currentOrder[i], currentOrder[j]]);
      // Perform the swap
      [currentOrder[i], currentOrder[j]] = [currentOrder[j], currentOrder[i]];
      bellOrders.push(currentOrder.slice());
    }
  }

  return {
    swaps: appliedSwaps,
    bellOrders: bellOrders,
  };
}

/**
 * Creates a transition data structure for all possible pattern transitions
 * @param {Object} changeSequences - The original change sequences data
 * @returns {Object} The organized transition data
 */
function createTransitionData(changeSequences) {
  const transitionData = {};

  // For each number of bells
  for (const [numBells, patterns] of Object.entries(changeSequences)) {
    transitionData[numBells] = {};

    // For each pattern
    for (const pattern of patterns) {
      const sourcePattern = pattern.sourcePattern;
      if (!transitionData[numBells][sourcePattern]) {
        transitionData[numBells][sourcePattern] = {};
      }

      // Store the transition data with source and target orders
      transitionData[numBells][sourcePattern][pattern.targetPattern] = {
        sourceOrder: pattern.sourceOrder,
        targetOrder: pattern.targetOrder,
      };
    }
  }

  return transitionData;
}

/**
 * Finds the minimum number of swaps needed between two patterns
 * @param {Object} transitionData - The transition data structure
 * @param {number} numBells - Number of bells
 * @param {string} sourcePattern - Starting pattern
 * @param {string} targetPattern - Target pattern
 * @returns {Array<[number, number]>} Array of swaps needed
 */
function findMinimumSwaps(
  transitionData,
  numBells,
  sourcePattern,
  targetPattern
) {
  if (!transitionData[numBells]?.[sourcePattern]?.[targetPattern]) {
    throw new Error(
      `No transition found from ${sourcePattern} to ${targetPattern} for ${numBells} bells`
    );
  }
  const data = transitionData[numBells][sourcePattern][targetPattern];
  return calculateMinimumSwaps(data.sourceOrder, data.targetOrder);
}

// Example usage:
// const transitionData = createTransitionData(changeSequences);
// const swaps = findMinimumSwaps(transitionData, 8, "Rounds", "Queens");
// console.log(swaps); // [[2,3], [4,5], ...]

module.exports = {
  calculateMinimumSwaps,
  createTransitionData,
  findMinimumSwaps,
};
