const { getPatternOrder } = require('./pattern_definitions');

/**
 * Maps calling up positions to calling down positions
 * @param {string} upPositions - The calling up positions (e.g. "1-2")
 * @returns {string} The calling down positions (e.g. "2-Lead")
 */
function mapToDownPositions(upPositions) {
  return upPositions
    .replace('1-2', '2-Lead')
    .replace('2-3', '3-1')
    .replace('3-4', '4-2')
    .replace('4-5', '5-3')
    .replace('5-6', '6-4')
    .replace('6-7', '7-5')
    .replace('7-8', '8-6')
    .replace('8-9', '9-7')
    .replace('9-10', '10-8')
    .replace('10-11', '11-9')
    .replace('11-12', '12-10');
}

/**
 * Gets the bell numbers at the specified positions
 * @param {Array} currentOrder - The current bell order
 * @param {string} positions - The positions (e.g. "2-Lead")
 * @returns {Object} The bell numbers at the positions
 */
function getBellsAtPositions(currentOrder, positions) {
  const [pos1, pos2] = positions.split('-');
  const bell1 = pos1 === 'Lead' ? 'Lead' : currentOrder[parseInt(pos1) - 1];
  const bell2 = pos2 === 'Lead' ? 'Lead' : currentOrder[parseInt(pos2) - 1];
  return { bell1, bell2 };
}

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
  const bellOrders = [[...sourceOrder]];
  const currentOrder = [...sourceOrder];
  const maxIterations = 1000;
  let iterations = 0;
  let prioritizeHighest = true; // Start with highest priority

  while (
    !arraysEqual(currentOrder, targetOrder) &&
    iterations < maxIterations
  ) {
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
      const temp = currentOrder[currentPosition - 1];
      currentOrder[currentPosition - 1] = currentOrder[currentPosition];
      currentOrder[currentPosition] = temp;
      swaps.push([currentPosition - 1, currentPosition]);
    } else {
      // Bell is above its target position, swap down
      const temp = currentOrder[currentPosition];
      currentOrder[currentPosition] = currentOrder[currentPosition + 1];
      currentOrder[currentPosition + 1] = temp;
      swaps.push([currentPosition, currentPosition + 1]);
    }

    // Add the new order to the list
    bellOrders.push([...currentOrder]);
    iterations++;
  }

  if (iterations >= maxIterations) {
    throw new Error('Maximum iterations reached without finding a solution');
  }

  return { swaps, bellOrders };
}

/**
 * Finds the shortest route from current bell order to target pattern
 * @param {Array} currentOrder - The current bell order
 * @param {string} targetPattern - The target pattern name
 * @param {number} numBells - The number of bells
 * @returns {Object} The transition data
 */
function findShortestRoute(currentOrder, targetPattern, numBells) {
  const targetOrder = getPatternOrder(targetPattern, numBells);

  const { swaps, bellOrders } = calculateMinimumSwaps(
    currentOrder,
    targetOrder
  );

  // Calculate calling up swaps and positions
  const swaps_up = swaps
    .map((swap, index) => {
      const currentOrder = bellOrders[index];
      const bell1 = currentOrder[swap[0]];
      const bell2 = currentOrder[swap[1]];
      return `${bell1}-${bell2}`;
    })
    .join('|');

  const swaps_display_up = swaps
    .map((swap, index) => {
      const currentOrder = bellOrders[index];
      const bell1 = currentOrder[swap[0]];
      const bell2 = currentOrder[swap[1]];
      return `${bell1} to ${bell2}`;
    })
    .join(', ');

  const swaps_positions_up = swaps
    .map(swap => `${swap[0] + 1}-${swap[1] + 1}`)
    .join('|');

  // Calculate calling down swaps and positions
  const swaps_positions_down = swaps_positions_up
    .split('|')
    .map(mapToDownPositions)
    .join('|');

  const swaps_down = swaps
    .map((swap, index) => {
      const currentOrder = bellOrders[index];
      const upPositions = `${swap[0] + 1}-${swap[1] + 1}`;
      const downPositions = mapToDownPositions(upPositions);
      const { bell1, bell2 } = getBellsAtPositions(currentOrder, downPositions);
      return `${bell1}-${bell2}`;
    })
    .join('|');

  const swaps_display_down = swaps
    .map((swap, index) => {
      const currentOrder = bellOrders[index];
      const upPositions = `${swap[0] + 1}-${swap[1] + 1}`;
      const downPositions = mapToDownPositions(upPositions);
      const { bell1, bell2 } = getBellsAtPositions(currentOrder, downPositions);
      if (bell2 === 'Lead') {
        return `${bell1} Lead`;
      }
      return `${bell1} to ${bell2}`;
    })
    .join(', ');

  // Format bell orders for display
  const bellOrders_display = bellOrders
    .map(order =>
      order
        .map(bell => {
          if (bell === 10) return '0';
          if (bell === 11) return 'E';
          if (bell === 12) return 'T';
          return bell;
        })
        .join('')
    )
    .join('|');

  return {
    numberOfSwaps: swaps.length,
    initialOrder: bellOrders[0].join(''),
    swaps_up,
    swaps_display_up,
    swaps_positions_up,
    swaps_positions_down,
    swaps_down,
    swaps_display_down,
    bellOrders: bellOrders.map(order => order.join('')).join('|'),
    bellOrders_display,
  };
}

// Helper function to check if arrays are equal
function arraysEqual(a, b) {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

/**
 * Creates a transition data structure for all possible pattern transitions
 * @param {Object} patterns - The patterns data
 * @returns {Object} The organized transition data
 */
function createTransitionData(patterns) {
  const transitionData = {};

  // For each number of bells
  for (const [numBells, patternList] of Object.entries(patterns)) {
    transitionData[numBells] = {};

    // For each source pattern
    for (const sourcePattern of patternList) {
      if (!transitionData[numBells][sourcePattern]) {
        transitionData[numBells][sourcePattern] = {};
      }

      // For each target pattern
      for (const targetPattern of patternList) {
        if (sourcePattern === targetPattern) continue;

        try {
          const sourceOrder = getPatternOrder(sourcePattern, numBells);
          const targetOrder = getPatternOrder(targetPattern, numBells);

          const { swaps, bellOrders } = calculateMinimumSwaps(
            sourceOrder,
            targetOrder
          );

          transitionData[numBells][sourcePattern][targetPattern] = {
            numberOfSwaps: swaps.length,
            swaps: swaps.map(swap => `${swap[0] + 1}-${swap[1] + 1}`).join('|'),
            swaps_display: swaps
              .map(swap => `${swap[0] + 1} to ${swap[1] + 1}`)
              .join(', '),
            bellOrders: bellOrders.map(order => order.join('')).join('|'),
            bellOrders_display: bellOrders
              .map(order => order.join(''))
              .join('|'),
          };
        } catch (error) {
          console.error(
            `Error processing transition from ${sourcePattern} to ${targetPattern} for ${numBells} bells:`,
            error
          );
        }
      }
    }
  }

  return transitionData;
}

module.exports = {
  calculateMinimumSwaps,
  createTransitionData,
  getPatternOrder,
  findShortestRoute,
};
