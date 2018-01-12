var JkError = require('./error');
var onExit = require('./onExit');
var onConfig = require('../config/onConfig');
var onMarket = require('../market/onMarket');

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
        default:
            throw new JkError('unrecognised command');
    }
}
