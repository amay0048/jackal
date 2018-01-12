global.Config = require('./config/Config');

var cliParser = require('./cli/parser');

var readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', cliParser);
