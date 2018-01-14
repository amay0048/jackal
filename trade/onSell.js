const JkError = require('../cli/error');
const logger = require('../log/logger');

module.exports = function onSell(...args) {
    logger.log(`sell =>`, args);
    var exchange = global.Config.exchange;
    switch(exchange) {
        case 'hitbtc':
            return global.Client.Hitbtc.onSell.apply(global.Client.Hitbtc, args);
            break;
        case 'binance':
            return global.Client.Binance.onSell.apply(global.Client.Binance, args);
            break;            
        default:
            throw new JkError('onSymbols: the command is not supported by the current exchange');
    }
}
