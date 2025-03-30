const fs = require('fs');
const path = require('path');

// Read index.html
const indexHtml = fs.readFileSync('index.html', 'utf8');

// Find the patterns constant using regex
const patternsRegex = /const\s+patterns\s*=\s*({[\s\S]*?});/;
const match = indexHtml.match(patternsRegex);

if (!match) {
  console.error('Could not find patterns constant in index.html');
  process.exit(1);
}

// Extract the patterns object
const patternsContent = match[1];

// Create the content for current_pattern_data.js
const newContent = `// This file contains the current patterns data from index.html
// It is used by standalone functions and should be kept in sync with index.html
// This file is automatically updated by the pre-commit hook

const patterns = ${patternsContent};

// Export the patterns object for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = patterns;
}
`;

// Write to current_pattern_data.js
fs.writeFileSync('current_pattern_data.js', newContent);

console.log('Successfully synchronized patterns data');
