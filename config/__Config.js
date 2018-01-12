function __Config() {
    this.exchange = 'hitbtc';
    this.trade = {
        base: 'BTC',
        stake: 1
    };
    return this;
}

__Config.prototype.setExchange = function setExchange(exchange) {
    this.exchange = exchange;
}

__Config.prototype.getTrade = function getTrade(symbol) {
    return this.trade;
}

__Config.prototype.setBasePair = function setBasePair(symbol) {
    this.trade.base = symbol;
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
    // try {
    //     this.balance = Number(value);
    // } catch (e) {
    //     this.balance = Number(value);
    // }
}

module.exports = new __Config();
