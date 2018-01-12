global.Config = require('./config/__Config');
global.Client = {
  Hitbtc: require('./client/hitbtc/__init')
};

var cliParser = require('./cli/parser');

var readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', cliParser);
