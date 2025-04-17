/**
 * Defines the bell orders for different patterns and numbers of bells
 */
const patternOrders = {
  5: {
    Rounds: [1, 2, 3, 4, 5],
    'Back Rounds': [5, 4, 3, 2, 1],
    Queens: [2, 4, 1, 3, 5],
    Kings: [3, 1, 2, 4, 5],
    Tittums: [1, 3, 2, 5, 4],
    Weasels: [1, 4, 2, 3, 5],
  },
  6: {
    Rounds: [1, 2, 3, 4, 5, 6],
    'Back Rounds': [6, 5, 4, 3, 2, 1],
    Queens: [1, 3, 5, 2, 4, 6],
    Kings: [5, 3, 1, 2, 4, 6],
    Tittums: [1, 4, 2, 5, 3, 6],
    'Exploding Tittums': [3, 4, 2, 5, 1, 6],
    Hagdyke: [3, 4, 1, 2, 5, 6],
    Princes: [5, 3, 2, 1, 4, 6],
  },
  8: {
    Rounds: [1, 2, 3, 4, 5, 6, 7, 8],
    'Back Rounds': [8, 7, 6, 5, 4, 3, 2, 1],
    Queens: [1, 3, 5, 7, 2, 4, 6, 8],
    Kings: [7, 5, 3, 1, 2, 4, 6, 8],
    Tittums: [1, 5, 2, 6, 3, 7, 4, 8],
    'Exploding Tittums': [4, 5, 3, 6, 2, 7, 1, 8],
    Whittingtons: [1, 2, 7, 5, 3, 4, 6, 8],
    Hagdyke: [1, 2, 5, 6, 3, 4, 7, 8],
    Princes: [7, 5, 3, 2, 1, 4, 6, 8],
  },
  10: {
    Rounds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    'Back Rounds': [10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
    Queens: [1, 3, 5, 7, 9, 2, 4, 6, 8, 10],
    Kings: [9, 7, 5, 3, 1, 2, 4, 6, 8, 10],
    Tittums: [1, 6, 2, 7, 3, 8, 4, 9, 5, 10],
    'Exploding Tittums': [5, 6, 4, 7, 3, 8, 2, 9, 1, 10],
    Whittingtons: [1, 2, 9, 7, 5, 3, 4, 6, 8, 10],
    Hagdyke: [1, 2, 5, 6, 3, 4, 7, 8, 9, 10],
    Princes: [9, 7, 5, 3, 2, 1, 4, 6, 8, 10],
  },
  12: {
    Rounds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    'Back Rounds': [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
    Queens: [1, 3, 5, 7, 9, 11, 2, 4, 6, 8, 10, 12],
    Kings: [11, 9, 7, 5, 3, 1, 2, 4, 6, 8, 10, 12],
    Tittums: [1, 7, 2, 8, 3, 9, 4, 10, 5, 11, 6, 12],
    'Exploding Tittums': [6, 7, 5, 8, 4, 9, 3, 10, 2, 11, 1, 12],
    Whittingtons: [1, 2, 11, 9, 7, 5, 3, 4, 6, 8, 10, 12],
    Hagdyke: [1, 2, 5, 6, 3, 4, 7, 8, 9, 10, 11, 12],
    Princes: [11, 9, 7, 5, 3, 2, 1, 4, 6, 8, 10, 12],
  },
};

/**
 * Gets the list of patterns for a given number of bells
 * @param {number} numBells - The number of bells
 * @returns {Array} The list of patterns
 */
function getPatternsForBells(numBells) {
  return Object.keys(patternOrders[numBells]);
}

/**
 * Gets the bell order for a given pattern and number of bells
 * @param {string} pattern - The pattern name
 * @param {number} numBells - The number of bells
 * @returns {Array} The bell order
 */
function getPatternOrder(pattern, numBells) {
  if (!patternOrders[numBells] || !patternOrders[numBells][pattern]) {
    throw new Error(`Pattern ${pattern} not found for ${numBells} bells`);
  }
  return patternOrders[numBells][pattern];
}

module.exports = {
  getPatternsForBells,
  getPatternOrder,
};
