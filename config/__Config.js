const onBalance = require('../trade/onBalance');
const base = require('./base.json');

function __Config() {
    Object.assign(this, base);
    return this;
}

__Config.prototype.init = function init() {
    onBalance();
}

__Config.prototype.setExchange = function setExchange(exchange) {
    this.exchange = exchange;
}

__Config.prototype.getTrade = function getTrade(symbol) {
    return this.trade;
}

__Config.prototype.setBasePair = function setBasePair(symbol) {
    this.trade.base = String(symbol).toUpperCase();
}

__Config.prototype.setStake = function setStake(percent) {
    try {
        this.trade.stake = Number(percent)/100;
    } catch (e) {
        this.trade.stake = 1;
    }
}

__Config.prototype.setDemo = function setDemo(value) {
    this.demo = (typeof value != 'undefined' && value && value == 'true');
    global.Client.Hitbtc.setDemo(this.demo);
}

__Config.prototype.setBalance = function setBalance(value) {
    this.balance = value;
}

__Config.prototype.setMonitorCoin = function (coin) {
    this.monitor.coin = String(coin).toUpperCase();
}

__Config.prototype.getMonitorSymbol = function () {
    return String(this.monitor.coin) + String(this.trade.base);
}

module.exports = new __Config();
