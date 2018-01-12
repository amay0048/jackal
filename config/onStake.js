var logger = require('../log/logger');

module.exports = function onStake(percent) {
    logger.log(`percent stake => ${percent}`);
    global.Config.setStake(percent);
}