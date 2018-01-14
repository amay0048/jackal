const JkError = require('../cli/error');
const logger = require('../log/logger');

module.exports = function onBuy(...args) {
    logger.log(`buy =>`, args);
    var exchange = global.Config.exchange;
    switch(exchange) {
        case 'hitbtc':
            return global.Client.Hitbtc.onBuy.apply(global.Client.Hitbtc, args);
            break;
        case 'binance':
            return global.Client.Binance.onBuy.apply(global.Client.Binance, args);
            break;
        default:
            throw new JkError('onBuy: the command is not supported by the current exchange');
    }
}
