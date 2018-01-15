var logger = require('../../log/logger');
let trade = global.Config.getTrade();

module.exports = function onTicker(coin) {

    var symbol = String(coin).concat('_').concat(trade.base).toUpperCase();
    logger.log(`get ticker => ${symbol}`);

    return this.api.GetMarket(symbol, 1)
        .then(resp => {
            if (resp.Error) throw new Error(resp.Error);
            return resp.Data;
        })
        .catch(logger.error);
}