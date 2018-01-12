var JkError = require('../cli/error');
var onExchange = require('./onExchange');
var onEcho = require('./onEcho');

var separator = ' ';

module.exports = function onConfig(...args) {
    switch(args.shift()) {
        case 'exchange':
            onExchange.apply(null, args);
            break;
        case 'echo':
            onEcho.apply(null, args);
            break;
        default:
            throw new JkError('onConfig: unrecognised command');
    }
}
