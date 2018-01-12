function __Config() {
    this.exchange = 'hitbtc';
    this.pair = {
        base: 'BTC'
    };
    return this;
}

__Config.prototype.setExchange = function setExchange(exchange) {
    this.exchange = exchange;
}

__Config.prototype.getPair = function getPair(symbol) {
    return this.pair;
}

__Config.prototype.setBasePair = function setBasePair(symbol) {
    this.pair.base = symbol;
}

__Config.prototype.setDemo = function setDemo(value) {
    this.demo = (typeof value != 'undefined' && value && value == 'true');
    global.Client.Hitbtc.setDemo(this.demo);
}

module.exports = new __Config();
