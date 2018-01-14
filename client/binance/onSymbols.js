var logger = require('../../log/logger');

module.exports = function onSymbols() {
    return this.api.exchangeInfo()
        .then(data => {
            return Object.values(data.symbols).reduce((out, s) => {
                out[s.symbol] = Object.assign(s, {
                    last: {
                        ask: null,
                        bid: null
                    }
                });
                return out;
            }, {});
        })
        .catch(logger.error);
}