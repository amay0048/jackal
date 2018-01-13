const logger = require('../log/logger');

module.exports = function onExchange(symbol) {
    logger.log(`base pair => ${symbol}`);
    global.Config.setBasePair(symbol);
}