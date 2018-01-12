var logger = require('../log/logger');

module.exports = function onDemo(bool) {
    logger.log(`demo => ${bool}`);
    global.Config.setDemo(bool);
}