const { findShortestRoute } = require('./calculate_single_transitions');
const { getPatternOrder } = require('./pattern_definitions');

/**
 * Calculates the shortest route from current bell order to target pattern
 * @param {string} currentOrderStr - The current bell order as a string (e.g. "12345")
 * @param {string} targetPattern - The target pattern name
 * @param {number} numBells - The number of bells
 * @returns {Object} The transition data
 */
function calculateTransition(currentOrderStr, targetPattern, numBells) {
  // Convert string order to array of numbers
  const currentOrder = currentOrderStr.split('').map(Number);

  try {
    return findShortestRoute(currentOrder, targetPattern, numBells);
  } catch (error) {
    console.error(`Error calculating transition to ${targetPattern}:`, error);
    throw error;
  }
}

module.exports = {
  calculateTransition,
};
