var logger = require('../../log/logger');

module.exports = function onSymbols() {
    return this.rest.getMyBalance()
        .then(data => {
            return Object.values(data.balance).filter(function (coin) {
                return !(coin.cash == '0' && coin.reserved == '0');
            }).reduce(function (balance, coin) {
                balance[coin.currency_code] = coin;
                return balance;
            }, {});
        })
        .catch(logger.error);
}