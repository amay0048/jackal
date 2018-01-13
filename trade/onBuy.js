const JkError = require('../cli/error');
const logger = require('../log/logger');

module.exports = function onBuy(...args) {
    logger.log(`buy =>`, args);
    var exchange = global.Config.exchange;
    switch(exchange) {
        case 'hitbtc':
            return global.Client.Hitbtc.onBuy.apply(global.Client.Hitbtc, args);
            break;
        default:
            throw new JkError('onSymbols: the command is not supported by the current exchange');
    }
}
