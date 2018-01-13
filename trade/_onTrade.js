const JkError = require('../cli/error');
const logger = require('../log/logger');
const onBalance = require('./onBalance');
const onBuy = require('./onBuy');
const onSell = require('./onSell');

var separator = ' ';

module.exports = function onConfig(...args) {
    switch(args.shift()) {
        case 'balance':
            onBalance.apply(null, args);
            break;
        case 'buy':
            onBuy.apply(null, args);
            break;
        case 'sell':
            onSell.apply(null, args);
            break;
        default:
            logger.log('onTrade: unrecognised command');
            // throw new JkError('onTrade: unrecognised command');
    }
}
