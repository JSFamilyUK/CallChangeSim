const fs = require('fs');

// Read the transition data for calling up
console.log('Reading transition data for calling up...');
const upTransitionData = JSON.parse(
  fs.readFileSync('transition_data_up.json', 'utf8')
);

// Create a copy of the data structure for calling down
const downTransitionData = {
  direction: 'down',
  transitions: [],
};

// TODO: Add transformation rules here
// This will be where we apply the rules to transform the swap names
// while keeping the actual bell order changes the same

// Save the transformed data to transition_data_down.json
fs.writeFileSync(
  'transition_data_down.json',
  JSON.stringify(downTransitionData, null, 2)
);

console.log(
  'Transition data for calling down has been saved to transition_data_down.json'
);
