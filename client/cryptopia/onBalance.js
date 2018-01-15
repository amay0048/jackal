var logger = require('../../log/logger');

module.exports = function onBalance() {
    return this.api.GetBalance()
        .then(data => {
            return Object.values(data.Data).filter(function (coin) {
                return !(Number(coin.Total) == 0);
            }).reduce(function (balance, coin) {
                balance[coin.Symbol] = coin;
                return balance;
            }, {});
        })
        .catch(logger.error);
}