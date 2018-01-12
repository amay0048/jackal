const JkError = require('../cli/error');
const onBalance = require('./onBalance');
// const onTicker = require('./onTicker');

var separator = ' ';

module.exports = function onConfig(...args) {
    switch(args.shift()) {
        case 'balance':
            onBalance.apply(null, args);
            break;
        // case 'ticker':
        //     onTicker.apply(null, args);
        //     break;
        default:
            throw new JkError('onTrade: unrecognised command');
    }
}
