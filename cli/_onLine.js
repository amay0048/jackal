var JkError = require('./error');
var onExit = require('./onExit');
var onConfig = require('../config/_onConfig');
var onMarket = require('../market/_onMarket');
var onTrade = require('../trade/_onTrade');

var separator = ' ';

module.exports = function onLine(line) {
    var input = line.split(separator);
    var action = input.shift();

    switch(action) {
        case 'exit':
            onExit.apply(null, input);
            break;
        case 'config':
            onConfig.apply(null, input);
            break;
        case 'market':
            onMarket.apply(null, input);
            break;
        case 'trade':
            onTrade.apply(null, input);
            break;
        default:
            throw new JkError('onLine: unrecognised command');
    }
}
