var logger = require('../../log/logger');
let trade = global.Config.getTrade();

module.exports = function onTicker(coin) {
    console.log(`not yet implemented`);
    // var symbol = String(coin).concat(trade.base).toUpperCase();
    // logger.log(`get ticker => ${symbol}`);

    // return this.rest.getTicker(symbol)
    //     .then(tick => {
    //         logger.log(tick);
    //         return tick;
    //     })
    //     .catch(logger.error);
}