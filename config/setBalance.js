const logger = require('../log/logger');

module.exports = function setBalance(value) {
    var exchange = global.Config.exchange;
    global.Config.balance[exchange] = value;
}