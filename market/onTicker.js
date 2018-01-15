const JkError = require('../cli/error');

module.exports = function onConfig(...args) {
    var exchange = global.Config.exchange;
    switch(exchange) {
        case 'hitbtc':
            return global.Client.Hitbtc.onTicker.apply(global.Client.Hitbtc, args);
            break;
        // FIXME
        // case 'hitbtc':
        //     return global.Client.Hitbtc.onTicker.apply(global.Client.Hitbtc, args);
        //     break;
        case 'cryptopia':
            return global.Client.Cryptopia.onTicker.apply(global.Client.Cryptopia, args);
            break;
        default:
            throw new JkError('onSymbols: the command is not supported by the current exchange');
    }
}
