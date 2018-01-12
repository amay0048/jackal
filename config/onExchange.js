var logger = require('../log/logger');

module.exports = function onExchange(exchange) {
    logger.log(`exchange => ${exchange}`);
    global.Config.setExchange(exchange);
}