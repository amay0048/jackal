const logger = require('../log/logger');
const JkError = require('../cli/error');
const onTicker = require('../market/onTicker');
const onBuy = require('../trade/onBuy');
const onSell = require('../trade/onSell');
const timers = require('timers');

module.exports = function onConfig(...args) {
    var [ coin ] = args;
    
    if (!coin) throw new JkError('onPump: the command is not supported by the current exchange');

    global.Config.setMonitorCoin(coin);

    var stake = Number(global.Config.balance[global.Config.trade.base].cash) * Number(global.Config.trade.stake);
    // console.log(stake);
    var splits = new Array(10);
    splits.fill(stake / splits.length);
    // console.log(splits);

    var symbol = String(coin).concat(global.Config.trade.base).toUpperCase();
    var symbolMeta = global.Client.Hitbtc.getSymbolMeta(symbol);
    var lot = symbolMeta.lot;

    onTicker(coin)
    .then(tick => {
        if (tick && tick.error) throw tick.error;

        splits.forEach((split, index) => {
            var price = tick.ask;
            price = price * 0.7;
            var qty = Math.floor((split / price) / lot);

            onBuy(coin, price, qty, 'IOC');

            var target = price * (1 + global.Config.trade.target);
            timers.setTimeout(() => {
                onSell(coin, target, qty);
            }, 1000 + (100 * index));
        });
    })
    .catch(logger.error);
}
