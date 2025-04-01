const { createTransitionData } = require('./calculate_swaps');
const changeSequences = require('./change_sequence_up.js');

// Generate the transition data
const transitionData = createTransitionData(changeSequences);

// Write the transition data to a file
const fs = require('fs');
fs.writeFileSync(
  'transition_data.json',
  JSON.stringify(transitionData, null, 2)
);

// Log some example transitions to verify
console.log('Example transitions:');
console.log('\n5 Bells - Rounds to Queens:');
console.log(transitionData[5]['Rounds']['Queens']);

console.log('\n8 Bells - Rounds to Kings:');
console.log(transitionData[8]['Rounds']['Kings']);

console.log('\n12 Bells - Queens to Princes:');
console.log(transitionData[12]['Queens']['Princes']);
