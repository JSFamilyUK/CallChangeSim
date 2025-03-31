const {
  createTransitionData,
  findMinimumSwaps,
} = require('./calculate_swaps_up');
const changeSequences = require('./change_sequences');

// Generate the transition data
console.log('Generating transition data for calling up...');
const transitionData = createTransitionData(changeSequences);

// Format the data for better readability
const formattedData = {
  direction: 'up',
  transitions: [],
};

for (const [numBells, patterns] of Object.entries(transitionData)) {
  for (const [sourcePattern, transitions] of Object.entries(patterns)) {
    for (const [targetPattern, data] of Object.entries(transitions)) {
      const result = findMinimumSwaps(
        transitionData,
        parseInt(numBells),
        sourcePattern,
        targetPattern
      );
      formattedData.transitions.push({
        numberOfBells: parseInt(numBells),
        sourcePattern: sourcePattern,
        targetPattern: targetPattern,
        numberOfSwaps: result.swaps.length,
        swaps: result.swaps.map(swap => `${swap[0]}-${swap[1]}`),
        bellOrders: result.bellOrders.map(order => order.join('')),
      });
    }
  }
}

// Sort the transitions by number of bells, source pattern, and target pattern
formattedData.transitions.sort((a, b) => {
  if (a.numberOfBells !== b.numberOfBells)
    return a.numberOfBells - b.numberOfBells;
  if (a.sourcePattern !== b.sourcePattern)
    return a.sourcePattern.localeCompare(b.sourcePattern);
  return a.targetPattern.localeCompare(b.targetPattern);
});

// Save the formatted transition data to a file
const fs = require('fs');
fs.writeFileSync(
  'transition_data_up.json',
  JSON.stringify(formattedData, null, 2)
);

// Test some example transitions
console.log('\nTesting some example transitions:');

// Test 5 bells
console.log('\n5 Bells:');
console.log('Transition: Rounds to Queens');
const result5 = findMinimumSwaps(transitionData, 5, 'Rounds', 'Queens');
console.log('Swaps needed:', result5.swaps);
console.log('Bell orders after each swap:');
result5.bellOrders.forEach((order, index) => {
  console.log(`Step ${index}: ${order}`);
});

// Test 8 bells
console.log('\n8 Bells:');
console.log('Transition: Rounds to Kings');
const result8 = findMinimumSwaps(transitionData, 8, 'Rounds', 'Kings');
console.log('Swaps needed:', result8.swaps);
console.log('Bell orders after each swap:');
result8.bellOrders.forEach((order, index) => {
  console.log(`Step ${index}: ${order}`);
});

// Test 12 bells
console.log('\n12 Bells:');
console.log('Transition: Queens to Princes');
const result12 = findMinimumSwaps(transitionData, 12, 'Queens', 'Princes');
console.log('Swaps needed:', result12.swaps);
console.log('Bell orders after each swap:');
result12.bellOrders.forEach((order, index) => {
  console.log(`Step ${index}: ${order}`);
});

console.log('\nTransition data has been saved to transition_data_up.json');
