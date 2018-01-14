const logger = require('../log/logger');
const JkError = require('../cli/error');
// const onTicker = require('../market/onTicker');
const onSymbolMeta = require('../market/onSymbolMeta');
const onBuy = require('../trade/onBuy');
const onSell = require('../trade/onSell');
const timers = require('timers');

module.exports = function onConfig(...args) {
    var [ coin ] = args;
    
    if (!coin) throw new JkError('onPump: the command is not supported by the current exchange');

    global.Config.setMonitorCoin(coin);
    var stake = global.Config.getBalance() * Number(global.Config.trade.stake);

    var splits = new Array(10);
    splits.fill(stake / splits.length);

    var symbol = String(coin).concat(global.Config.trade.base).toUpperCase();
    var symbolMeta = onSymbolMeta(symbol);
    var lastAsk = symbolMeta.last.ask;
    
    // onTicker(coin)
    // .then(tick => {
    //     if (tick && tick.error) throw tick.error;

        splits.forEach((split, index) => {
            var price = lastAsk;
            // price = price * 1.04;
            var value = split / price;

            onBuy(coin, price, value, 'IOC');

            var target = price * (1 + global.Config.trade.target);
            timers.setTimeout(() => {
                onSell(coin, target, value);
            }, 1000 + (100 * index));
        });
    // })
    // .catch(logger.error);
}
