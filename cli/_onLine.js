const JkError = require('./error');
const logger = require('../log/logger');
const onExit = require('./onExit');
const onConfig = require('../config/_onConfig');
const onMarket = require('../market/_onMarket');
const onTrade = require('../trade/_onTrade');
const onTactic = require('../tactic/_onTactic');

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
        case 'pump':
            input = line.split(separator);
        case 'tactic':
            onTactic.apply(null, input);
            break;
        default:
            var input = line.split(separator);
            input.unshift('pump');
            onTactic.apply(null, input);
            // logger.log('onLine: unrecognised command');
            // throw new JkError('onLine: unrecognised command');
    }
}
