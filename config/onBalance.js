const logger = require('../log/logger');

function checkBalance() {
    var coinBalance = global.Config.balance[global.Config.trade.base];
    if (!coinBalance) throw new Error(`onBalance: ${global.Config.trade.base} no balance available`);
}

module.exports = function onBalance(amount) {
    var exchange = global.Config.exchange;
    // __Config {
    //     exchange: 'hitbtc',
    //     trade: { base: 'ETH', stake: 0.1, target: 0.2 },
    //     monitor: { coin: 'LTC' },
    //     balance:
    //      { BTC: { currency_code: 'BTC', cash: '0.000077284', reserved: '0' },
    //        LTC: { currency_code: 'LTC', cash: '0.005687380', reserved: '0' },
    //        USD: { currency_code: 'USD', cash: '7.5357592', reserved: '0' } } }
    switch(exchange) {
        case 'hitbtc':
            checkBalance();
            return Number(global.Config.balance[global.Config.trade.base].cash);
            break;
        case 'binance':
            checkBalance();
            return Number(global.Config.balance[global.Config.trade.base].free);
            break;
        default:
            throw new JkError('onSymbols: the command is not supported by the current exchange');
    }
}