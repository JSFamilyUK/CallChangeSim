const {
  createTransitionData,
  findMinimumSwaps,
} = require('./calculate_swaps_down');
const changeSequences = require('./change_sequences');

// Generate the transition data
console.log('Generating transition data for calling down...');
console.log('Creating transition data structure...');
const transitionData = createTransitionData(changeSequences);
console.log('Transition data structure created');

// Format the data for better readability
const formattedData = {
  direction: 'down',
  transitions: [],
};

console.log('Processing transitions...');
let transitionCount = 0;

for (const [numBells, patterns] of Object.entries(transitionData)) {
  console.log(`\nProcessing ${numBells} bells...`);
  for (const [sourcePattern, transitions] of Object.entries(patterns)) {
    console.log(`  Processing source pattern: ${sourcePattern}`);
    for (const [targetPattern, data] of Object.entries(transitions)) {
      try {
        console.log(
          `    Calculating swaps for ${sourcePattern} -> ${targetPattern}`
        );
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
          swaps: result.swaps.map(swap => {
            if (swap[1] === 'Lead') {
              return `${swap[0]} Lead`;
            }
            return `${swap[0]} to ${swap[1]}`;
          }),
          bellOrders: result.bellOrders.map(order => order.join('')),
        });
        transitionCount++;
        if (transitionCount % 100 === 0) {
          console.log(`    Processed ${transitionCount} transitions so far...`);
        }
      } catch (error) {
        console.error(
          `    Error processing transition from ${sourcePattern} to ${targetPattern}:`,
          error
        );
      }
    }
  }
}

console.log(`\nSorting ${transitionCount} transitions...`);
// Sort the transitions by number of bells, source pattern, and target pattern
formattedData.transitions.sort((a, b) => {
  if (a.numberOfBells !== b.numberOfBells)
    return a.numberOfBells - b.numberOfBells;
  if (a.sourcePattern !== b.sourcePattern)
    return a.sourcePattern.localeCompare(b.sourcePattern);
  return a.targetPattern.localeCompare(b.targetPattern);
});
console.log('Sorting complete');

// Save the formatted transition data to a file
console.log('Writing transition data to file...');
const fs = require('fs');
fs.writeFileSync(
  'transition_data_down.json',
  JSON.stringify(formattedData, null, 2)
);
console.log('Transition data has been saved to transition_data_down.json');

// Test some example transitions
console.log('\nTesting some example transitions:');

// Test 5 bells - moving bell 3 down to follow bell 1
console.log('\n5 Bells:');
console.log('Transition: Moving bell 3 down to follow bell 1');
const result5 = findMinimumSwaps(transitionData, 5, 'Rounds', 'Queens');
console.log('Swaps needed:', result5.swaps);
console.log('Bell orders after each swap:');
result5.bellOrders.forEach((order, index) => {
  console.log(`Step ${index}: ${order}`);
});

// Test 8 bells - moving bell 7 down to follow bell 1
console.log('\n8 Bells:');
console.log('Transition: Moving bell 7 down to follow bell 1');
const result8 = findMinimumSwaps(transitionData, 8, 'Rounds', 'Kings');
console.log('Swaps needed:', result8.swaps);
console.log('Bell orders after each swap:');
result8.bellOrders.forEach((order, index) => {
  console.log(`Step ${index}: ${order}`);
});

// Test 12 bells - moving bell 11 down to follow bell 1
console.log('\n12 Bells:');
console.log('Transition: Moving bell 11 down to follow bell 1');
const result12 = findMinimumSwaps(transitionData, 12, 'Queens', 'Princes');
console.log('Swaps needed:', result12.swaps);
console.log('Bell orders after each swap:');
result12.bellOrders.forEach((order, index) => {
  console.log(`Step ${index}: ${order}`);
});

console.log('\nAll processing complete!');
