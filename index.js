const logger = require('./log/logger');

global.Config = require('./config/__Config');
global.Client = {
  Hitbtc: require('./client/hitbtc/__init'),
  Binance: require('./client/binance/__init')
};

// global.Client.Hitbtc.init();
global.Client.Binance.init();
global.Config.init();

var onLine = require('./cli/_onLine');

var readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', onLine);
