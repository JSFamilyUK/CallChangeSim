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
        initialOrder: result.bellOrders[0].join(''),
        swaps_up: result.swaps.map(swap => `${swap[0]}-${swap[1]}`).join('|'),
        swaps_display_up: result.swaps
          .map(swap => `${swap[0]} to ${swap[1]}`)
          .join(', '),
        swaps_positions_up: result.swaps
          .map((swap, index) => {
            // Get the current order at the time of this swap
            const currentOrder = result.bellOrders[index];
            return `${currentOrder.indexOf(swap[0]) + 1}-${
              currentOrder.indexOf(swap[1]) + 1
            }`;
          })
          .join('|'),
        swaps_positions_down: result.swaps
          .map((swap, index) => {
            // Get the current order at the time of this swap
            const currentOrder = result.bellOrders[index];
            const upPos1 = currentOrder.indexOf(swap[0]) + 1;
            const upPos2 = currentOrder.indexOf(swap[1]) + 1;
            const upPositions = `${upPos1}-${upPos2}`;

            // Direct mapping of up positions to down positions
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

            return downPositions;
          })
          .join('|'),
        swaps_down: result.swaps
          .map((swap, index) => {
            // Get the current order at the time of this swap
            const currentOrder = result.bellOrders[index];
            const upPos1 = currentOrder.indexOf(swap[0]) + 1;
            const upPos2 = currentOrder.indexOf(swap[1]) + 1;
            const upPositions = `${upPos1}-${upPos2}`;

            // Map up positions to down positions
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
        swaps_display_down: result.swaps
          .map((swap, index) => {
            // Get the current order at the time of this swap
            const currentOrder = result.bellOrders[index];
            const upPos1 = currentOrder.indexOf(swap[0]) + 1;
            const upPos2 = currentOrder.indexOf(swap[1]) + 1;
            const upPositions = `${upPos1}-${upPos2}`;

            // Map up positions to down positions
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
          .join('|')
          .split('|')
          .map(swap => {
            const [bell1, bell2] = swap.split('-');
            if (bell2 === 'Lead') {
              return `${bell1} Lead`;
            }
            return `${bell1} to ${bell2}`;
          })
          .join(', '),
        bellOrders: result.bellOrders
          .slice(1)
          .map(order => order.join(''))
          .join('|'),
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
console.log('Number of swaps:', result5.swaps.length);
console.log('Initial order:', result5.bellOrders[0].join(''));
console.log(
  'Swaps needed:',
  result5.swaps.map(swap => `${swap[0]}-${swap[1]}`).join('|')
);
console.log(
  'Swaps display:',
  result5.swaps.map(swap => `${swap[0]} to ${swap[1]}`).join(', ')
);
console.log(
  'Swap positions up:',
  result5.swaps
    .map((swap, index) => {
      const currentOrder = result5.bellOrders[index];
      return `${currentOrder.indexOf(swap[0]) + 1}-${
        currentOrder.indexOf(swap[1]) + 1
      }`;
    })
    .join('|')
);
console.log(
  'Swaps positions down:',
  result5.swaps
    .map((swap, index) => {
      const currentOrder = result5.bellOrders[index];
      const upPos1 = currentOrder.indexOf(swap[0]) + 1;
      const upPos2 = currentOrder.indexOf(swap[1]) + 1;
      const upPositions = `${upPos1}-${upPos2}`;

      // Direct mapping of up positions to down positions
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

      return downPositions;
    })
    .join('|')
);
console.log(
  'Swaps down:',
  result5.swaps
    .map((swap, index) => {
      const currentOrder = result5.bellOrders[index];
      const upPos1 = currentOrder.indexOf(swap[0]) + 1;
      const upPos2 = currentOrder.indexOf(swap[1]) + 1;
      const upPositions = `${upPos1}-${upPos2}`;

      // Map up positions to down positions
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
      const bell1 = pos1 === 'Lead' ? 'Lead' : currentOrder[parseInt(pos1) - 1];
      const bell2 = pos2 === 'Lead' ? 'Lead' : currentOrder[parseInt(pos2) - 1];

      return `${bell1}-${bell2}`;
    })
    .join('|')
);
console.log(
  'Swaps display down:',
  result5.swaps
    .map((swap, index) => {
      const currentOrder = result5.bellOrders[index];
      const upPos1 = currentOrder.indexOf(swap[0]) + 1;
      const upPos2 = currentOrder.indexOf(swap[1]) + 1;
      const upPositions = `${upPos1}-${upPos2}`;

      // Map up positions to down positions
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
      const bell1 = pos1 === 'Lead' ? 'Lead' : currentOrder[parseInt(pos1) - 1];
      const bell2 = pos2 === 'Lead' ? 'Lead' : currentOrder[parseInt(pos2) - 1];

      return `${bell1}-${bell2}`;
    })
    .join('|')
    .split('|')
    .map(swap => swap.replace('-', ' to '))
    .join(', ')
);
console.log('Bell orders after each swap:');
result5.bellOrders.slice(1).forEach((order, index) => {
  console.log(`Step ${index + 1}: ${order.join('')}`);
});

// Test 8 bells
console.log('\n8 Bells:');
console.log('Transition: Rounds to Kings');
const result8 = findMinimumSwaps(transitionData, 8, 'Rounds', 'Kings');
console.log('Number of swaps:', result8.swaps.length);
console.log('Initial order:', result8.bellOrders[0].join(''));
console.log(
  'Swaps needed:',
  result8.swaps.map(swap => `${swap[0]}-${swap[1]}`).join('|')
);
console.log(
  'Swaps display:',
  result8.swaps.map(swap => `${swap[0]} to ${swap[1]}`).join(', ')
);
console.log(
  'Swap positions up:',
  result8.swaps
    .map((swap, index) => {
      const currentOrder = result8.bellOrders[index];
      return `${currentOrder.indexOf(swap[0]) + 1}-${
        currentOrder.indexOf(swap[1]) + 1
      }`;
    })
    .join('|')
);
console.log(
  'Swap positions down:',
  result8.swaps
    .map((swap, index) => {
      const currentOrder = result8.bellOrders[index];
      const upPos1 = currentOrder.indexOf(swap[0]) + 1;
      const upPos2 = currentOrder.indexOf(swap[1]) + 1;
      const upPositions = `${upPos1}-${upPos2}`;

      // Direct mapping of up positions to down positions
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

      return downPositions;
    })
    .join('|')
);
console.log(
  'Swaps down:',
  result8.swaps
    .map((swap, index) => {
      const currentOrder = result8.bellOrders[index];
      const upPos1 = currentOrder.indexOf(swap[0]) + 1;
      const upPos2 = currentOrder.indexOf(swap[1]) + 1;
      const upPositions = `${upPos1}-${upPos2}`;

      // Map up positions to down positions
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
      const bell1 = pos1 === 'Lead' ? 'Lead' : currentOrder[parseInt(pos1) - 1];
      const bell2 = pos2 === 'Lead' ? 'Lead' : currentOrder[parseInt(pos2) - 1];

      return `${bell1}-${bell2}`;
    })
    .join('|')
);
console.log(
  'Swaps display down:',
  result8.swaps
    .map((swap, index) => {
      const currentOrder = result8.bellOrders[index];
      const upPos1 = currentOrder.indexOf(swap[0]) + 1;
      const upPos2 = currentOrder.indexOf(swap[1]) + 1;
      const upPositions = `${upPos1}-${upPos2}`;

      // Map up positions to down positions
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
      const bell1 = pos1 === 'Lead' ? 'Lead' : currentOrder[parseInt(pos1) - 1];
      const bell2 = pos2 === 'Lead' ? 'Lead' : currentOrder[parseInt(pos2) - 1];

      return `${bell1}-${bell2}`;
    })
    .join('|')
    .split('|')
    .map(swap => swap.replace('-', ' to '))
    .join(', ')
);
console.log('Bell orders after each swap:');
result8.bellOrders.slice(1).forEach((order, index) => {
  console.log(`Step ${index + 1}: ${order.join('')}`);
});

// Test 12 bells
console.log('\n12 Bells:');
console.log('Transition: Queens to Princes');
const result12 = findMinimumSwaps(transitionData, 12, 'Queens', 'Princes');
console.log('Number of swaps:', result12.swaps.length);
console.log('Initial order:', result12.bellOrders[0].join(''));
console.log(
  'Swaps needed:',
  result12.swaps.map(swap => `${swap[0]}-${swap[1]}`).join('|')
);
console.log(
  'Swaps display:',
  result12.swaps.map(swap => `${swap[0]} to ${swap[1]}`).join(', ')
);
console.log(
  'Swap positions up:',
  result12.swaps
    .map((swap, index) => {
      const currentOrder = result12.bellOrders[index];
      return `${currentOrder.indexOf(swap[0]) + 1}-${
        currentOrder.indexOf(swap[1]) + 1
      }`;
    })
    .join('|')
);
console.log(
  'Swap positions down:',
  result12.swaps
    .map((swap, index) => {
      const currentOrder = result12.bellOrders[index];
      const upPos1 = currentOrder.indexOf(swap[0]) + 1;
      const upPos2 = currentOrder.indexOf(swap[1]) + 1;
      const upPositions = `${upPos1}-${upPos2}`;

      // Direct mapping of up positions to down positions
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

      return downPositions;
    })
    .join('|')
);
console.log(
  'Swaps down:',
  result12.swaps
    .map((swap, index) => {
      const currentOrder = result12.bellOrders[index];
      const upPos1 = currentOrder.indexOf(swap[0]) + 1;
      const upPos2 = currentOrder.indexOf(swap[1]) + 1;
      const upPositions = `${upPos1}-${upPos2}`;

      // Map up positions to down positions
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
      const bell1 = pos1 === 'Lead' ? 'Lead' : currentOrder[parseInt(pos1) - 1];
      const bell2 = pos2 === 'Lead' ? 'Lead' : currentOrder[parseInt(pos2) - 1];

      return `${bell1}-${bell2}`;
    })
    .join('|')
);
console.log(
  'Swaps display down:',
  result12.swaps
    .map((swap, index) => {
      const currentOrder = result12.bellOrders[index];
      const upPos1 = currentOrder.indexOf(swap[0]) + 1;
      const upPos2 = currentOrder.indexOf(swap[1]) + 1;
      const upPositions = `${upPos1}-${upPos2}`;

      // Map up positions to down positions
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
      const bell1 = pos1 === 'Lead' ? 'Lead' : currentOrder[parseInt(pos1) - 1];
      const bell2 = pos2 === 'Lead' ? 'Lead' : currentOrder[parseInt(pos2) - 1];

      return `${bell1}-${bell2}`;
    })
    .join('|')
    .split('|')
    .map(swap => swap.replace('-', ' to '))
    .join(', ')
);
console.log('Bell orders after each swap:');
result12.bellOrders.slice(1).forEach((order, index) => {
  console.log(`Step ${index + 1}: ${order.join('')}`);
});

// Test some complex transitions
console.log('\nComplex Transitions:');
console.log('8 Bells: Rounds to Tittums');
const resultTittums = findMinimumSwaps(transitionData, 8, 'Rounds', 'Tittums');
console.log('Number of swaps:', resultTittums.swaps.length);
console.log('Initial order:', resultTittums.bellOrders[0].join(''));
console.log(
  'Swaps needed:',
  resultTittums.swaps.map(swap => `${swap[0]}-${swap[1]}`).join('|')
);
console.log(
  'Swaps display:',
  resultTittums.swaps.map(swap => `${swap[0]} to ${swap[1]}`).join(', ')
);
console.log(
  'Swap positions up:',
  resultTittums.swaps
    .map((swap, index) => {
      const currentOrder = resultTittums.bellOrders[index];
      return `${currentOrder.indexOf(swap[0]) + 1}-${
        currentOrder.indexOf(swap[1]) + 1
      }`;
    })
    .join('|')
);
console.log(
  'Swap positions down:',
  resultTittums.swaps
    .map((swap, index) => {
      const currentOrder = resultTittums.bellOrders[index];
      const upPos1 = currentOrder.indexOf(swap[0]) + 1;
      const upPos2 = currentOrder.indexOf(swap[1]) + 1;
      const upPositions = `${upPos1}-${upPos2}`;

      // Direct mapping of up positions to down positions
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

      return downPositions;
    })
    .join('|')
);
console.log(
  'Swaps down:',
  resultTittums.swaps
    .map((swap, index) => {
      const currentOrder = resultTittums.bellOrders[index];
      const upPos1 = currentOrder.indexOf(swap[0]) + 1;
      const upPos2 = currentOrder.indexOf(swap[1]) + 1;
      const upPositions = `${upPos1}-${upPos2}`;

      // Map up positions to down positions
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
      const bell1 = pos1 === 'Lead' ? 'Lead' : currentOrder[parseInt(pos1) - 1];
      const bell2 = pos2 === 'Lead' ? 'Lead' : currentOrder[parseInt(pos2) - 1];

      return `${bell1}-${bell2}`;
    })
    .join('|')
);
console.log(
  'Swaps display down:',
  resultTittums.swaps
    .map((swap, index) => {
      const currentOrder = resultTittums.bellOrders[index];
      const upPos1 = currentOrder.indexOf(swap[0]) + 1;
      const upPos2 = currentOrder.indexOf(swap[1]) + 1;
      const upPositions = `${upPos1}-${upPos2}`;

      // Map up positions to down positions
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
      const bell1 = pos1 === 'Lead' ? 'Lead' : currentOrder[parseInt(pos1) - 1];
      const bell2 = pos2 === 'Lead' ? 'Lead' : currentOrder[parseInt(pos2) - 1];

      return `${bell1}-${bell2}`;
    })
    .join('|')
    .split('|')
    .map(swap => swap.replace('-', ' to '))
    .join(', ')
);
console.log('Bell orders after each swap:');
resultTittums.bellOrders.slice(1).forEach((order, index) => {
  console.log(`Step ${index + 1}: ${order.join('')}`);
});

console.log('\nTransition data has been saved to transition_data_up.json');
