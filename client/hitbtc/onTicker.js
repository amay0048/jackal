var logger = require('../../log/logger');
let pair = global.Config.getPair();

module.exports = function onTicker(coin) {
    let _coin = String(coin).toUpperCase();
    var symbol = _coin.concat(pair.base).toUpperCase();
    logger.log(`get ticker => ${symbol}`);
    this.rest.getTicker(symbol)
        .then(logger.log)
        .catch(logger.error);
}