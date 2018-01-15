const JkError = require('../cli/error');

module.exports = function onBalance(...args) {
    var exchange = global.Config.exchange;
    switch(exchange) {
        case 'hitbtc':
            return global.Client.Hitbtc.onBalance.apply(global.Client.Hitbtc, args);
            break;
        case 'binance':
            return global.Client.Binance.onBalance.apply(global.Client.Binance, args);
            break;
        case 'cryptopia':
            return global.Client.Cryptopia.onBalance.apply(global.Client.Cryptopia, args);
            break;
        default:
            throw new JkError('onSymbols: the command is not supported by the current exchange');
    }
}
