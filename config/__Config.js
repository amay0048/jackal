const tradeOnBalance = require('../trade/onBalance');
const base = require('./base.json');
const logger = require('../log/logger');
const onBalance = require('./onBalance');
const setBalance = require('./setBalance');

function __Config() {
    Object.assign(this, { balance: {} }, base);
    return this;
}

__Config.prototype.init = function () {

    var exchange = this.exchange;
    switch(exchange) {
        case 'hitbtc':
            global.Client.Hitbtc.init();
            break;
        case 'binance':
            global.Client.Binance.init();
            break;
        case 'cryptopia':
            global.Client.Cryptopia.init();
            break;
        default:
            throw new JkError('init: the command is not supported by the current exchange');
    }

    tradeOnBalance().then((balance) => {
        logger.log(`onBalance => complete`);
        this.setBalance(balance);
    });
}

__Config.prototype.setExchange = function (exchange) {
    this.exchange = exchange;
}

__Config.prototype.getTrade = function (symbol) {
    return this.trade;
}

__Config.prototype.setBasePair = function (symbol) {
    this.trade.base = String(symbol).toUpperCase();
}

__Config.prototype.setStake = function (percent) {
    try {
        this.trade.stake = Number(percent)/100;
    } catch (e) {
        this.trade.stake = 1;
    }
}

__Config.prototype.setDemo = function (value) {
    this.demo = (typeof value != 'undefined' && value && value == 'true');
    global.Client.Hitbtc.setDemo(this.demo);
}

__Config.prototype.setBalance = function (value) {
    setBalance.call(this, value);
}

__Config.prototype.getBalance = function () {
    return onBalance.call(this);
}

__Config.prototype.setMonitorCoin = function (coin) {
    this.trade.monitor = String(coin).toUpperCase();
}

__Config.prototype.getMonitorSymbol = function () {
    return String(this.trade.monitor) + String(this.trade.base);
}

module.exports = new __Config();
