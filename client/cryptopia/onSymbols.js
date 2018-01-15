var logger = require('../../log/logger');

module.exports = function onSymbols() {
    return this.api.GetTradePairs()
        .then(resp => {
            return Object.values(resp.Data).reduce((out, s) => {
                out[s.Label] = Object.assign(s, {
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