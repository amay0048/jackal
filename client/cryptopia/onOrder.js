var logger = require('../../log/logger');

/**
 * 
 * Market: The market symbol of the trade e.g. 'DOT/BTC' (not required if 'TradePairId' supplied)
 * TradePairId: The Cryptopia tradepair identifier of trade e.g. '100' (not required if 'Market' supplied)
 * Type: the type of trade e.g. 'Buy' or 'Sell'
 * Rate: the rate or price to pay for the coins e.g. 0.00000034
 * Amount: the amount of coins to buy e.g. 123.00000000
 * 
 */

// async SubmitTrade (Market, TradePairId, Type, Rate, Amount) {
//     return this._private('SubmitTrade', {Market, TradePairId, Type, Rate, Amount})
// }

function parseParams(...args) {

    var [ side, type, coin, price, quantity, timeInForce, stopPrice ] = args;

    var symbol = String(coin).concat('/').concat(global.Config.trade.base).toUpperCase();
    
    var meta = this.getSymbolMeta(symbol);

    // Careful for truthy types
    var params = {
        // type: String(type).toUpperCase(),
        Type: String(side).toUpperCase(),
        Market: symbol
    };

    if (price) params.Rate = price;
    if (quantity) params.Amount = quantity;

    // if (timeInForce) params.timeInForce = timeInForce;
    // if (stopPrice) params.stopPrice = Number(stopPrice);

    return params;
}

module.exports = function onOrder(...args) {
    var params = parseParams.apply(this, args);
    var { Market, TradePairId, Type, Rate, Amount } = params;

    if (global.Config.demo)
        return logger.log('DEMO');
    return this.api.SubmitTrade(
        Market,
        TradePairId,
        Type,
        Rate,
        Amount
    ).then(resp => {
        logger.log(resp);
        return resp;
    }).catch(resp => {
        logger.error(resp);
        throw resp;
    });
}