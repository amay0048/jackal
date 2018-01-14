const JkError = require('../cli/error');

module.exports = function onConfig(...args) {
    var exchange = global.Config.exchange;
    switch(exchange) {
        case 'hitbtc':
            return global.Client.Hitbtc.getSymbolMeta.apply(global.Client.Hitbtc, args);
            break;
        case 'binance':
            return global.Client.Binance.getSymbolMeta.apply(global.Client.Binance, args);
            break;
        default:
            throw new JkError('onSymbols: the command is not supported by the current exchange');
    }
}
