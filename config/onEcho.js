var logger = require('../log/logger');

module.exports = function onEcho() {
    logger.log(global.Config);
}