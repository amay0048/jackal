var logger = require('../log/logger');

module.exports = function onBalance(amount) {
    logger.log(`balance => ${amount}`);
    global.Config.setBalance(amount);
}