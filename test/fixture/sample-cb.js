'use strict';

const fs = require('fs');
const path = require('path');

module.exports = function(url) {
  const filepath = path.resolve(__dirname, './sample-cb-result.txt');
  fs.writeFileSync(filepath, url);
};