const fs = require('fs');
const {
  createTransitionData,
  findMinimumSwaps,
} = require('./calculate_swaps_down');
const { changeSequences } = require('./change_sequences');

// Create the transition data structure
const transitionData = createTransitionData(changeSequences);

// Create the final output structure
const output = {
  direction: 'down',
  transitions: [],
};

// For each number of bells
for (const [numBells, patterns] of Object.entries(transitionData)) {
  // For each source pattern
  for (const [sourcePattern, targets] of Object.entries(patterns)) {
    // For each target pattern
    for (const [targetPattern, data] of Object.entries(targets)) {
      try {
        // Find the minimum swaps needed
        const { swaps, bellOrders } = findMinimumSwaps(
          transitionData,
          numBells,
          sourcePattern,
          targetPattern
        );

        // Add the transition to the output
        output.transitions.push({
          numberOfBells: parseInt(numBells),
          sourcePattern,
          targetPattern,
          numberOfSwaps: swaps.length,
          swaps: swaps.map(swap => {
            if (swap[1] === 'Lead') {
              return `${swap[0]}-0`;
            }
            return `${swap[0]}-${swap[1]}`;
          }),
          bellOrders: bellOrders.map(order => order.join('')),
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

// Write the output to a file
fs.writeFileSync('transition_data_down.json', JSON.stringify(output, null, 2));
console.log('Transition data has been written to transition_data_down.json');
