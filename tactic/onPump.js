const logger = require('../log/logger');
const JkError = require('../cli/error');
const marketOnTicker = require('../market/onTicker');
const marketOnLastAsk = require('../market/onLastAsk');
const onSymbolMeta = require('../market/onSymbolMeta');
const onBuy = require('../trade/onBuy');
const onSell = require('../trade/onSell');
const timers = require('timers');
const config = require('./pump.json')

module.exports = function onConfig(...args) {
    var [ coin ] = args;
    
    if (!coin) throw new JkError('onPump: the command is not supported by the current exchange');

    global.Config.setMonitorCoin(coin);

    var stake = global.Config.getBalance() * Number(config.stake);
    var splits = new Array(3);
    splits.fill(stake / splits.length);
    
    marketOnLastAsk(coin)
    .then(lastAsk => {

        logger.log('onPump: Last Ask => ', lastAsk);

        var price = lastAsk * (1 + config.loading.buy);
        logger.log('onPump: Buy Ask', price);

        var target = price * (1 + config.loading.sell);
        logger.log('onPump: Sell Price => ', target);

        splits.forEach((split, index) => {
            var value = Number.parseFloat(split) / price;
            onBuy(coin, price, value, 'IOC');

            timers.setTimeout(() => {
                onSell(coin, target, value);
            }, 1400 + (100 * index));
        });
    })
    .catch(logger.error);
}
