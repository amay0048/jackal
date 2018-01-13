const JkError = require('../cli/error');
const onBalance = require('./onBalance');
const onBuy = require('./onBuy');
const onSell = require('./onSell');
// const onTicker = require('./onTicker');

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
            throw new JkError('onTrade: unrecognised command');
    }
}
