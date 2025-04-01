const {
  calculateMinimumSwaps,
  createTransitionData,
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

// Track any transitions with empty swaps
const emptySwaps = [];

for (const [numBells, patterns] of Object.entries(transitionData)) {
  for (const [sourcePattern, transitions] of Object.entries(patterns)) {
    for (const [targetPattern, data] of Object.entries(transitions)) {
      try {
        const swaps = calculateMinimumSwaps(data.sourceOrder, data.targetOrder);
        const bellOrders = [data.sourceOrder];
        let currentOrder = [...data.sourceOrder];

        // Track the orders after each swap
        for (const swap of swaps) {
          const [i, j] = swap;
          const temp = currentOrder[i];
          currentOrder[i] = currentOrder[j];
          currentOrder[j] = temp;
          bellOrders.push([...currentOrder]);
        }

        // Validate the swaps
        if (!swaps || swaps.length === 0) {
          emptySwaps.push({
            numBells,
            sourcePattern,
            targetPattern,
            sourceOrder: data.sourceOrder,
            targetOrder: data.targetOrder,
          });
          continue;
        }

        // Validate each swap
        const invalidSwaps = swaps.filter(
          swap =>
            !swap ||
            swap.length !== 2 ||
            swap[0] === undefined ||
            swap[1] === undefined
        );

        if (invalidSwaps.length > 0) {
          emptySwaps.push({
            numBells,
            sourcePattern,
            targetPattern,
            sourceOrder: data.sourceOrder,
            targetOrder: data.targetOrder,
            invalidSwaps,
          });
          continue;
        }

        const swapsPositionsUp = swaps
          .map(swap => {
            // Use raw swap positions (1-indexed)
            return `${swap[0] + 1}-${swap[1] + 1}`;
          })
          .join('|');

        formattedData.transitions.push({
          numberOfBells: parseInt(numBells),
          sourcePattern: sourcePattern,
          targetPattern: targetPattern,
          numberOfSwaps: swaps.length,
          initialOrder: bellOrders[0].join(''),
          swaps_up: swaps
            .map((swap, index) => {
              const currentOrder = bellOrders[index];
              const bell1 = currentOrder[swap[0]];
              const bell2 = currentOrder[swap[1]];
              return `${bell1}-${bell2}`;
            })
            .join('|'),
          swaps_display_up:
            swaps.length === 0
              ? 'Changes Not Currently Available'
              : swaps
                  .map((swap, index) => {
                    const currentOrder = bellOrders[index];
                    const bell1 = currentOrder[swap[0]];
                    const bell2 = currentOrder[swap[1]];
                    return `${bell1} to ${bell2}`;
                  })
                  .join(', '),
          swaps_positions_up: swapsPositionsUp,
          swaps_positions_down: swapsPositionsUp
            .split('|')
            .map(positions =>
              positions
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
                .replace('11-12', '12-10')
            )
            .join('|'),
          swaps_down: swaps
            .map((swap, index) => {
              const currentOrder = bellOrders[index];
              const upPositions = `${swap[0] + 1}-${swap[1] + 1}`;
              const downPositions = upPositions
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

              // Get the bell numbers at the down positions
              const [pos1, pos2] = downPositions.split('-');
              const bell1 =
                pos1 === 'Lead' ? 'Lead' : currentOrder[parseInt(pos1) - 1];
              const bell2 =
                pos2 === 'Lead' ? 'Lead' : currentOrder[parseInt(pos2) - 1];

              return `${bell1}-${bell2}`;
            })
            .join('|'),
          swaps_display_down:
            swaps.length === 0
              ? 'Changes Not Currently Available'
              : swaps
                  .map((swap, index) => {
                    const currentOrder = bellOrders[index];
                    const upPositions = `${swap[0] + 1}-${swap[1] + 1}`;
                    const downPositions = upPositions
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

                    // Get the bell numbers at the down positions
                    const [pos1, pos2] = downPositions.split('-');
                    const bell1 =
                      pos1 === 'Lead'
                        ? 'Lead'
                        : currentOrder[parseInt(pos1) - 1];
                    const bell2 =
                      pos2 === 'Lead'
                        ? 'Lead'
                        : currentOrder[parseInt(pos2) - 1];

                    if (bell2 === 'Lead') {
                      return `${bell1} Lead`;
                    }
                    return `${bell1} to ${bell2}`;
                  })
                  .join(', '),
          bellOrders: bellOrders
            .slice(1)
            .map(order => order.join(''))
            .join('|'),
        });
      } catch (error) {
        console.error(
          `Error processing transition from ${sourcePattern} to ${targetPattern} for ${numBells} bells:`,
          error
        );
        emptySwaps.push({
          numBells,
          sourcePattern,
          targetPattern,
          sourceOrder: data.sourceOrder,
          targetOrder: data.targetOrder,
          error: error.message,
        });
      }
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
  'transition_data.json',
  JSON.stringify(formattedData, null, 2)
);

// Log any empty or invalid swaps
if (emptySwaps.length > 0) {
  console.log('\nFound transitions with empty or invalid swaps:');
  console.log(JSON.stringify(emptySwaps, null, 2));
  fs.writeFileSync('empty_swaps.json', JSON.stringify(emptySwaps, null, 2));
}

console.log('\nTransition data has been saved to transition_data.json');
