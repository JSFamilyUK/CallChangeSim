const fs = require('fs');
const { createTransitionData } = require('./calculate_single_transitions');
const { getPatternsForBells } = require('./pattern_definitions');

// Generate the transition data
console.log('Generating single transition data...');

// Create the patterns data structure
const patterns = {};
for (const numBells of [5, 6, 8, 10, 12]) {
  patterns[numBells] = getPatternsForBells(numBells);
}

// Generate the transition data
const transitionData = createTransitionData(patterns);

// Format the data for better readability
const formattedData = {
  direction: 'single',
  transitions: [],
};

// Track any transitions with empty swaps
const emptySwaps = [];

for (const [numBells, patterns] of Object.entries(transitionData)) {
  for (const [sourcePattern, transitions] of Object.entries(patterns)) {
    for (const [targetPattern, data] of Object.entries(transitions)) {
      try {
        // Validate the swaps
        if (!data.swaps || data.swaps.length === 0) {
          emptySwaps.push({
            numBells,
            sourcePattern,
            targetPattern,
          });
          continue;
        }

        // Add the transition to the output
        formattedData.transitions.push({
          numberOfBells: parseInt(numBells),
          sourcePattern,
          targetPattern,
          numberOfSwaps: data.numberOfSwaps,
          swaps: data.swaps,
          swaps_display: data.swaps_display,
          bellOrders: data.bellOrders,
          bellOrders_display: data.bellOrders_display,
        });
      } catch (error) {
        console.error(
          `Error processing transition from ${sourcePattern} to ${targetPattern} for ${numBells} bells:`,
          error
        );
      }
    }
  }
}

// Sort transitions by number of bells, source pattern, and target pattern
formattedData.transitions.sort((a, b) => {
  if (a.numberOfBells !== b.numberOfBells) {
    return a.numberOfBells - b.numberOfBells;
  }
  if (a.sourcePattern !== b.sourcePattern) {
    return a.sourcePattern.localeCompare(b.sourcePattern);
  }
  return a.targetPattern.localeCompare(b.targetPattern);
});

// Save the formatted transition data to a file
fs.writeFileSync(
  'single_transition_data.json',
  JSON.stringify(formattedData, null, 2)
);

// Log any empty or invalid swaps
if (emptySwaps.length > 0) {
  console.log('\nFound transitions with empty or invalid swaps:');
  console.log(JSON.stringify(emptySwaps, null, 2));
  fs.writeFileSync(
    'single_transition_empty_swaps.json',
    JSON.stringify(emptySwaps, null, 2)
  );
}

console.log(
  '\nSingle transition data has been saved to single_transition_data.json'
);
