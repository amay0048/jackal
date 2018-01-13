const JkError = require('../cli/error');
const logger = require('../log/logger');
const onSymbols = require('./onSymbols');
const onTicker = require('./onTicker');

var separator = ' ';

module.exports = function onConfig(...args) {
    switch(args.shift()) {
        case 'symbols':
            onSymbols.apply(null, args);
            break;
        case 'ticker':
            onTicker.apply(null, args);
            break;
        default:
            logger.log('onMarket: unrecognised command');
            // throw new JkError('onMarket: unrecognised command');
    }
}
