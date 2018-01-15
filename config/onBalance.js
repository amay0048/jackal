const logger = require('../log/logger');

function checkBalance(exchange) {
    var coinBalance = global.Config.balance[exchange][global.Config.trade.base];

    if (!coinBalance) throw new Error(`onBalance: ${global.Config.trade.base} no balance available`);

    return coinBalance;
}

module.exports = function onBalance(amount) {
    var exchange = global.Config.exchange;
    var balance = checkBalance(exchange);
    switch(exchange) {
        case 'hitbtc':
            return Number(balance.cash);
            break;
        case 'binance':
            return Number(balance.free);
            break;
        case 'cryptopia':
            return Number(balance.Available);
            break;
        default:
            throw new JkError('onSymbols: the command is not supported by the current exchange');
    }
}