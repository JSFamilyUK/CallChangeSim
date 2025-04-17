const { findShortestRoute } = require('./calculate_single_transitions');
const fs = require('fs');

// Test cases for different numbers of bells
const testCases = [
  {
    description: '5 Bells - Rounds to Queens',
    currentOrder: '12345',
    targetPattern: 'Queens',
    numBells: 5,
  },
  {
    description: '6 Bells - Current order to Tittums',
    currentOrder: '135246',
    targetPattern: 'Tittums',
    numBells: 6,
  },
  {
    description: '8 Bells - Current order to Back Rounds',
    currentOrder: '13572468',
    targetPattern: 'Back Rounds',
    numBells: 8,
  },
  {
    description: '12 Bells - Rounds to Tittums',
    currentOrder: '1234567890ET',
    targetPattern: 'Tittums',
    numBells: 12,
  },
  {
    description: '12 Bells - Queens to Back Rounds',
    currentOrder: '1357924680ET',
    targetPattern: 'Back Rounds',
    numBells: 12,
  },
  {
    description: '12 Bells - Tittums to Queens',
    currentOrder: '1470E258T369',
    targetPattern: 'Queens',
    numBells: 12,
  },
  {
    description: '12 Bells - Back Rounds to Tittums',
    currentOrder: 'ET0987654321',
    targetPattern: 'Tittums',
    numBells: 12,
  },
  {
    description: '12 Bells - Random order to Queens',
    currentOrder: '3E507T921468',
    targetPattern: 'Queens',
    numBells: 12,
  },
];

// Run the tests
console.log('Testing Single Transition Calculation...\n');

testCases.forEach((test, index) => {
  console.log(`Test ${index + 1}: ${test.description}`);
  console.log('Current Order:', test.currentOrder);
  console.log('Target Pattern:', test.targetPattern);
  console.log('Number of Bells:', test.numBells);

  try {
    // Convert string to array of numbers, handling 0, E, T
    const orderArray = test.currentOrder.split('').map(char => {
      if (char === '0') return 10;
      if (char === 'E') return 11;
      if (char === 'T') return 12;
      return parseInt(char);
    });

    // Add progress indicator for 12-bell calculation
    let progressInterval;
    if (test.numBells === 12) {
      console.log('Calculating 12-bell transition (this may take a while)...');
      progressInterval = setInterval(() => {
        process.stdout.write('.');
      }, 1000);
    }

    const result = findShortestRoute(
      orderArray,
      test.targetPattern,
      test.numBells
    );

    // Clear progress indicator if it was set
    if (progressInterval) {
      clearInterval(progressInterval);
      console.log('\n');
    }

    // Clear and write the result to the JSON file
    fs.writeFileSync(
      'single_transition_result.json',
      JSON.stringify(
        {
          description: test.description,
          currentOrder: test.currentOrder,
          targetPattern: test.targetPattern,
          numBells: test.numBells,
          result: {
            numberOfSwaps: result.numberOfSwaps,
            initialOrder: result.initialOrder,
            callingUp: {
              swaps: result.swaps_display_up,
              positions: result.swaps_positions_up,
            },
            callingDown: {
              swaps: result.swaps_display_down,
              positions: result.swaps_positions_down,
            },
            bellOrders: result.bellOrders_display,
          },
        },
        null,
        2
      )
    );

    console.log('\nResults:');
    console.log('Number of Swaps:', result.numberOfSwaps);
    console.log('Initial Order:', result.initialOrder);
    console.log('Calling Up:');
    console.log('  Swaps:', result.swaps_display_up);
    console.log('  Positions:', result.swaps_positions_up);
    console.log('Calling Down:');
    console.log('  Swaps:', result.swaps_display_down);
    console.log('  Positions:', result.swaps_positions_down);
    console.log('Bell Orders:', result.bellOrders_display);
    console.log('\nResults have been saved to single_transition_result.json');
    console.log('\n----------------------------------------\n');
  } catch (error) {
    console.error('Error:', error.message);
    console.log('\n----------------------------------------\n');
  }
});
