/**
 * Calculates the minimum number of swaps needed to transform source order into target order
 * Only allows adjacent bell swaps, and first bell in swap must be the one with lower position
 * @param {number[]} sourceOrder - The starting order of bells
 * @param {number[]} targetOrder - The desired order of bells
 * @returns {Array<[number, number]>} Array of pairs representing the swaps needed
 */
function calculateMinimumSwaps(sourceOrder, targetOrder) {
  const n = sourceOrder.length;
  const swaps = [];
  const bellOrders = [sourceOrder.slice()]; // Track initial order
  let currentOrder = sourceOrder.slice();

  // Create a mapping of target positions
  const targetPositions = new Map();
  for (let i = 0; i < n; i++) {
    targetPositions.set(targetOrder[i], i);
  }

  // For each position except the last one
  for (let i = 0; i < n - 1; i++) {
    // Find the bell that should be at position i
    const requiredBell = targetOrder[i];

    // If the required bell is not at the correct position
    if (currentOrder[i] !== requiredBell) {
      // Find the current position of the required bell
      let currentPos = currentOrder.indexOf(requiredBell);

      // Move the required bell to its correct position
      while (currentPos > i) {
        // Only swap if bells are adjacent and first bell has lower position
        if (
          currentPos - 1 >= i &&
          currentOrder[currentPos] < currentOrder[currentPos - 1]
        ) {
          // Swap with the bell above
          [currentOrder[currentPos], currentOrder[currentPos - 1]] = [
            currentOrder[currentPos - 1],
            currentOrder[currentPos],
          ];
          swaps.push([currentPos, currentPos - 1]);
          bellOrders.push(currentOrder.slice()); // Track order after swap
          currentPos--;
        } else {
          // If we can't swap, we need to move other bells
          let j = currentPos - 1;
          while (j >= i) {
            if (currentOrder[j] < currentOrder[j + 1]) {
              [currentOrder[j], currentOrder[j + 1]] = [
                currentOrder[j + 1],
                currentOrder[j],
              ];
              swaps.push([j, j + 1]);
              bellOrders.push(currentOrder.slice()); // Track order after swap
            }
            j--;
          }
        }
      }
    }
  }

  return { swaps, bellOrders };
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
