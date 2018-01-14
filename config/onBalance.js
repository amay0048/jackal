const logger = require('../log/logger');

module.exports = function onBalance(amount) {
    var exchange = global.Config.exchange;
    switch(exchange) {
        case 'hitbtc':
            return Number(global.Config.balance[global.Config.trade.base].cash);
            break;
        case 'binance':
            return Number(global.Config.balance[global.Config.trade.base].free);
            break;
        default:
            throw new JkError('onSymbols: the command is not supported by the current exchange');
    }
}