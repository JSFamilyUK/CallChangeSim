const fs = require('fs');

// Read the transition data
const transitionData = JSON.parse(
  fs.readFileSync('transition_data.json', 'utf8')
);

// Filter transitions with no swaps and extract required attributes
const missingTransitions = transitionData.transitions
  .filter(transition => transition.numberOfSwaps === 0)
  .map(transition => ({
    numberOfBells: transition.numberOfBells,
    sourcePattern: transition.sourcePattern,
    targetPattern: transition.targetPattern,
    numberOfSwaps: transition.numberOfSwaps,
    initialOrder: transition.initialOrder,
  }));

// Create the report
const report = {
  totalMissing: missingTransitions.length,
  transitions: missingTransitions,
};

// Save the report to a file
fs.writeFileSync(
  'transition_data_missing.json',
  JSON.stringify(report, null, 2)
);

console.log(`Found ${missingTransitions.length} transitions with no swaps`);
console.log('Report has been saved to transition_data_missing.json');
