function Config() {
    this.exchange = 'hitbtc';
    return this;
}

Config.prototype.setExchange = function setExchange(exchange) {
    this.exchange = exchange;
}

module.exports = new Config();
