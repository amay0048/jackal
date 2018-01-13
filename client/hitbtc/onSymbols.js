var logger = require('../../log/logger');

module.exports = function onSymbols() {
    return this.rest.getSymbols()
        .then(resp => {
            return resp.symbols.reduce((out, s) => {
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