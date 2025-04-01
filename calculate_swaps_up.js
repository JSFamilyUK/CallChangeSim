/**
 * Calculates the minimum number of swaps needed to transform source order into target order
 * Implementation based on counting inversions as proven in:
 * https://stackoverflow.com/questions/20990127/sorting-a-sequence-by-swapping-adjacent-elements-using-minimum-swaps
 * @param {number[]} sourceOrder - The starting order of bells
 * @param {number[]} targetOrder - The desired order of bells
 * @returns {{ swaps: Array<[number, number]>, bellOrders: Array<number[]> }} Array of swaps and resulting orders
 */
function calculateMinimumSwaps(sourceOrder, targetOrder) {
  const swaps = [];
  const currentOrder = [...sourceOrder];
  const maxIterations = 1000;
  let iterations = 0;
  let prioritizeHighest = true; // Start with highest priority

  console.log('\nInitial order:', currentOrder.join(','));
  console.log('Target order:', targetOrder.join(','));

  while (
    !arraysEqual(currentOrder, targetOrder) &&
    iterations < maxIterations
  ) {
    console.log(`\nIteration ${iterations}:`);
    console.log('Order before swap:', currentOrder.join(','));

    // Find all positions that need to be filled
    let positionsToFill = [];
    for (let i = 0; i < currentOrder.length; i++) {
      if (currentOrder[i] !== targetOrder[i]) {
        positionsToFill.push(i);
      }
    }

    if (positionsToFill.length === 0) {
      break; // All positions are filled correctly
    }

    // Find the bell to move based on priority
    let bellToMove;
    let currentPosition;

    if (prioritizeHighest) {
      // Find the highest position that needs to be filled
      const highestPosition = Math.max(...positionsToFill);
      bellToMove = targetOrder[highestPosition];
      currentPosition = currentOrder.indexOf(bellToMove);
    } else {
      // Find the lowest position that needs to be filled
      const lowestPosition = Math.min(...positionsToFill);
      bellToMove = targetOrder[lowestPosition];
      currentPosition = currentOrder.indexOf(bellToMove);
    }

    // Toggle priority for next iteration
    prioritizeHighest = !prioritizeHighest;

    if (currentPosition === -1) {
      continue; // Bell not found in current order
    }

    // If the bell is below its target position, swap up
    if (currentPosition > targetOrder.indexOf(bellToMove)) {
      // Swap with the bell above
      const bell1 = currentOrder[currentPosition - 1];
      const bell2 = currentOrder[currentPosition];
      const temp = bell1;
      currentOrder[currentPosition - 1] = bell2;
      currentOrder[currentPosition] = temp;
      swaps.push([currentPosition - 1, currentPosition]);
      console.log(`Swapping bell ${bell1} with bell ${bell2}`);
    } else {
      // Bell is above its target position, swap down
      const bell1 = currentOrder[currentPosition];
      const bell2 = currentOrder[currentPosition + 1];
      const temp = bell1;
      currentOrder[currentPosition] = bell2;
      currentOrder[currentPosition + 1] = temp;
      swaps.push([currentPosition, currentPosition + 1]);
      console.log(`Swapping bell ${bell1} with bell ${bell2}`);
    }

    console.log('Order after swap:', currentOrder.join(','));
    iterations++;
  }

  if (iterations >= maxIterations) {
    console.log(`\nFinal state: ${JSON.stringify(currentOrder, null, 2)}`);
    console.log(`Target state: ${JSON.stringify(targetOrder, null, 2)}`);
    throw new Error('Maximum iterations reached without finding a solution');
  }

  return swaps;
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

// Helper function to check if arrays are equal
function arraysEqual(a, b) {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

// Test cases
function runTests() {
  console.log('Running test cases...\n');

  // Test case 1: Simple swap
  console.log('Test Case 1: Simple swap');
  console.log('Initial order: [1,2,3,4]');
  console.log('Target order: [1,2,4,3]');
  const source1 = [1, 2, 3, 4];
  const target1 = [1, 2, 4, 3];
  const swaps1 = calculateMinimumSwaps(source1, target1);
  console.log(`\nTotal swaps: ${swaps1.length}`);
  console.log(`Final swaps: ${JSON.stringify(swaps1)}\n`);

  // Test case 2: Two bells need to move
  console.log('Test Case 2: Two bells need to move');
  console.log('Initial order: [1,2,3,4]');
  console.log('Target order: [1,3,2,4]');
  const source2 = [1, 2, 3, 4];
  const target2 = [1, 3, 2, 4];
  const swaps2 = calculateMinimumSwaps(source2, target2);
  console.log(`\nTotal swaps: ${swaps2.length}`);
  console.log(`Final swaps: ${JSON.stringify(swaps2)}\n`);

  // Test case 3: Complete reversal
  console.log('Test Case 3: Complete reversal');
  console.log('Initial order: [1,2,3,4]');
  console.log('Target order: [4,3,2,1]');
  const source3 = [1, 2, 3, 4];
  const target3 = [4, 3, 2, 1];
  const swaps3 = calculateMinimumSwaps(source3, target3);
  console.log(`\nTotal swaps: ${swaps3.length}`);
  console.log(`Final swaps: ${JSON.stringify(swaps3)}\n`);
}

// Run the tests
runTests();

module.exports = {
  calculateMinimumSwaps,
  createTransitionData,
  findMinimumSwaps,
};
