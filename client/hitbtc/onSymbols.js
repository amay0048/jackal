var logger = require('../../log/logger');

module.exports = function onSymbols() {
    this.rest.getSymbols()
        .then(logger.log)
        .catch(logger.error);
}