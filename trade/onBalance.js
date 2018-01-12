var JkError = require('../cli/error');
var exchange = global.Config.exchange;

module.exports = function onConfig(...args) {
    switch(exchange) {
        case 'hitbtc':
            global.Client.Hitbtc.onBalance(args);
            break;
        default:
            throw new JkError('onSymbols: the command is not supported by the current exchange');
    }
}
