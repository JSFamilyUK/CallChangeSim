/**
 * Calculate the minimum number of swaps needed to transform sourceOrder into targetOrder
 * For calling down:
 * - When calling [bell1, bell2], bell1 moves down to follow bell2
 * - This means bell1 moves to position bell2+1, and all bells in between move up
 * - Special case for moving a bell into position 1 (using "Lead")
 * - Only the bell in position 2 can be paired with "Lead"
 * - All other calls must be between bells exactly two positions apart
 * @param {Array<number>} sourceOrder - The starting order of bells
 * @param {Array<number>} targetOrder - The target order of bells
 * @returns {Object} Object containing swaps array and bellOrders array
 */
function calculateMinimumSwaps(sourceOrder, targetOrder) {
  const n = sourceOrder.length;
  const swaps = [];
  const bellOrders = [sourceOrder.slice()];
  let currentOrder = sourceOrder.slice();

  // Keep track of visited orders to avoid cycles
  const visited = new Set([currentOrder.join(',')]);

  while (!arraysEqual(currentOrder, targetOrder)) {
    // Get all possible valid moves from the current order
    const validMoves = findValidMoves(currentOrder);

    if (validMoves.length === 0) {
      throw new Error('No valid moves available to reach target order');
    }

    // Choose the move that gets us closest to the target order
    let bestMove = null;
    let bestScore = Infinity;
    let bestNextOrder = null;

    for (const move of validMoves) {
      const nextOrder = applyMove(currentOrder, move);
      if (!visited.has(nextOrder.join(','))) {
        const score = calculateScore(nextOrder, targetOrder);
        if (score < bestScore) {
          bestScore = score;
          bestMove = move;
          bestNextOrder = nextOrder;
        }
      }
    }

    if (!bestMove) {
      throw new Error('No valid moves available to reach target order');
    }

    // Apply the best move
    swaps.push(bestMove);
    currentOrder = bestNextOrder;
    bellOrders.push(currentOrder.slice());
    visited.add(currentOrder.join(','));
  }

  return { swaps, bellOrders };
}

/**
 * Find all valid moves from a given order
 * @param {Array<number>} order - Current order of bells
 * @returns {Array<Array>} Array of valid moves [bell1, bell2] or [bell, 'Lead']
 */
function findValidMoves(order) {
  const moves = [];
  const n = order.length;

  // Check for Lead move (only bell in position 2 can Lead)
  if (n >= 2) {
    moves.push([order[1], 'Lead']);
  }

  // Check for normal moves (bells must be exactly two positions apart)
  for (let i = 2; i < n; i++) {
    const bell1 = order[i];
    const bell2 = order[i - 2];
    moves.push([bell1, bell2]);
  }

  return moves;
}

/**
 * Apply a move to an order
 * @param {Array<number>} order - Current order of bells
 * @param {Array} move - Move to apply [bell1, bell2] or [bell, 'Lead']
 * @returns {Array<number>} New order after applying the move
 */
function applyMove(order, move) {
  const newOrder = order.slice();
  const [bell1, bell2] = move;

  if (bell2 === 'Lead') {
    // Handle Lead move
    const pos = newOrder.indexOf(bell1);
    newOrder.splice(pos, 1);
    newOrder.unshift(bell1);
  } else {
    // Handle normal move
    const pos1 = newOrder.indexOf(bell1);
    const pos2 = newOrder.indexOf(bell2);
    newOrder.splice(pos1, 1);
    newOrder.splice(pos2 + 1, 0, bell1);
  }

  return newOrder;
}

/**
 * Calculate a score representing how far an order is from the target
 * Lower score means closer to target
 * @param {Array<number>} order - Current order of bells
 * @param {Array<number>} target - Target order of bells
 * @returns {number} Score representing distance from target
 */
function calculateScore(order, target) {
  let score = 0;
  for (let i = 0; i < order.length; i++) {
    // Add penalty based on position difference
    const targetPos = target.indexOf(order[i]);
    score += Math.abs(targetPos - i);
  }
  return score;
}

/**
 * Check if two arrays are equal
 * @param {Array} arr1 - First array
 * @param {Array} arr2 - Second array
 * @returns {boolean} True if arrays are equal
 */
function arraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
}

/**
 * Create a data structure containing all possible transitions between patterns
 * @param {Object} changeSequences - Object containing all change sequences
 * @returns {Object} Object containing all possible transitions
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
 * Find the minimum number of swaps needed for a specific transition
 * @param {Object} transitionData - Object containing all possible transitions
 * @param {number} numBells - Number of bells
 * @param {string} sourcePattern - Starting pattern
 * @param {string} targetPattern - Target pattern
 * @returns {Object} Object containing swaps array and bellOrders array
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

module.exports = {
  createTransitionData,
  findMinimumSwaps,
};
