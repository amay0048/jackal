var logger = require('../../log/logger');

module.exports = function onBalance() {
    return this.api.accountInfo()
        .then(data => {
            return Object.values(data.balances).filter(function (coin) {
                return !(Number(coin.free) == 0 && Number(coin.locked) == 0);
            }).reduce(function (balance, coin) {
                balance[coin.asset] = coin;
                return balance;
            }, {});
        })
        .catch(logger.error);
}