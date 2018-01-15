const JkError = require('../cli/error');
const onTicker = require('./onTicker');

module.exports = function onLastAsk(coin) {
    var exchange = global.Config.exchange;
    switch (exchange) {
        case 'hitbtc':
            return new Promise(function (resolve, reject) {
                var symbol = String(coin).concat(global.Config.trade.base).toUpperCase();
                var symbolMeta = global.Client.Hitbtc.getSymbolMeta.call(global.Client.Hitbtc, symbol);
                // TODO: Return onTicker in this case
                if (!symbolMeta.last.ask) throw new Error('No last ask for symbol');
                resolve(symbolMeta.last.ask);
            });
            break;
        case 'binance':
            return new Promise(function (resolve, reject) {
                var symbol = String(coin).concat(global.Config.trade.base).toUpperCase();
                var symbolMeta = global.Client.Binance.getSymbolMeta.call(global.Client.Binance, symbol);
                // TODO: Return onTicker in this case
                if (!symbolMeta.last.ask) throw new Error('No last ask for symbol');
                resolve(symbolMeta.last.ask);
            });
            break;
        case 'cryptopia':
            // var symbol = String(coin).concat('/').concat(global.Config.trade.base).toUpperCase();
            return onTicker.call(null, coin)
                .then(data => {
                    return data.AskPrice;
                })
                .catch(err => {
                    return err;
                });
            break;
        default:
            throw new JkError('onSymbols: the command is not supported by the current exchange');
    }
}
