var logger = require('../../log/logger');

module.exports = function onSymbols() {
    console.log(this);
    return this.rest.getSymbols()
        .then(resp => {
            // logger.log(resp);
            return resp.symbols;
        })
        .catch(logger.error);
}