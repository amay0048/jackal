var logger = require('../log/logger');
var JkError = require('../cli/error');
var exchange = global.Config.exchange;

module.exports = function onBuy(...args) {
    logger.log(`buy =>`, args);

    switch(exchange) {
        case 'hitbtc':
            global.Client.Hitbtc.onBuy.apply(global.Client.Hitbtc, args);
            break;
        default:
            throw new JkError('onSymbols: the command is not supported by the current exchange');
    }
}
