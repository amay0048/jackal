var logger = require('../../log/logger');

/**
 * 
 * Parameter        Type        Required    Default     Description
 * symbol	        String      true		
 * side	            String      true                    BUY,SELL
 * type	            String      false       LIMIT	    LIMIT, MARKET
 * quantity	        Number      true		
 * price	        Number      true                    Optional for MARKET orders
 * timeInForce	    String      false       GTC	        GTC, IOC
 * newClientOrderId	String      false                   A unique id for the order. Automatically generated if not sent.
 * stopPrice	    Number      false                   Used with stop orders
 * icebergQty	    Number      false                   Used with iceberg orders
 * recvWindow	    Number      false
 * 
 */

function S4() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1); 
}

function toIntPrescision(input, precision) {
    var multiplier = Math.pow(10, precision);
    var output = Math.floor(Number.parseFloat(input) * multiplier);

    if (output >= Number.MAX_SAFE_INTEGER) throw new Error('Exceed max INT');

    return output;
}

function fromIntPrecision(input, precision) {
    var multiplier = Math.pow(10, precision);
    return parseInt(input, 10) / multiplier;
}

function lotSizeFilter(value, filter, precision) {
    var { minQty, maxQty, stepSize } = filter;

    var intValue = toIntPrescision(value, precision);
    var intMinQty = toIntPrescision(minQty, precision);
    var intMaxQty = toIntPrescision(maxQty, precision);

    if (intValue < intMinQty) throw new Error();
    if (intValue > intMaxQty) throw new Error();

    var intStepSize = toIntPrescision(stepSize, precision);
    var intRemainder = intValue - intMinQty;
    var intMod = intRemainder % intStepSize;
    var intQuote = intMinQty + (intRemainder - intMod);

    if ((intQuote - intMinQty) % intStepSize != 0) throw new Error();

    return fromIntPrecision(intQuote, precision);
}

function parseParams(...args) {

    var [ side, type, coin, price, quantity, timeInForce, stopPrice ] = args;

    var guid = (S4() + S4() + "-" + S4() + "-4" + S4().substr(0,3) + "-" + S4() + "-" + S4() + S4()).toLowerCase();
    var symbol = String(coin).concat(global.Config.trade.base).toUpperCase();
    
    var meta = this.getSymbolMeta(symbol);
    var quote = lotSizeFilter(
        Number(quantity),
        meta.filters.find(f => f.filterType === 'LOT_SIZE'),
        meta.baseAssetPrecision
    );

    // Careful for truthy types
    var params = {
        newClientOrderId: guid,
        type: String(type).toUpperCase(),
        side: String(side).toUpperCase(),
        symbol: symbol
    };

    if (price) params.price = parseFloat(price).toFixed(parseInt(meta.baseAssetPrecision, 10));
    if (quantity) params.quantity = quote.toPrecision(parseInt(meta.baseAssetPrecision, 10));
    if (timeInForce) params.timeInForce = timeInForce;
    if (stopPrice) params.stopPrice = Number(stopPrice);

    return params;
}

module.exports = function onOrder(...args) {
    var params = parseParams.apply(this, args);
    console.log(params);
    if (global.Config.demo)
        return logger.log('DEMO');
    return this.api.order(params);
}