const HitBTC = require('hitbtc-api');

const logger = require('../../log/logger');
const onSymbols = require('./onSymbols');
const onTicker = require('./onTicker');
const onBalance = require('./onBalance');
const onOrder = require('./onOrder');
const onMarketMessage = require('./onMarketMessage');

let { public, secret } = require('./keys.json');

function JkHitbtc() {
    this.symbols = null;
    this.rest = new HitBTC.default({ key: public, secret: secret, isDemo: false });
    this.socket = new HitBTC.default.WebsocketClient({ key: public, secret: secret, isDemo: false });
}

JkHitbtc.prototype.init = function () {
    this.onSymbols().then(symbols => {
        this.symbols = symbols;
        this.socket.addMarketMessageListener((data) => {
            onMarketMessage.call(this, data);
        });
    });
}

JkHitbtc.prototype.onSymbols = function (...args) {
    return onSymbols.apply(this, args);
}

JkHitbtc.prototype.getSymbolMeta = function (symbol) {
    return this.symbols[symbol];
}

JkHitbtc.prototype.onTicker = function (...args) {
    return onTicker.apply(this, args);
}

JkHitbtc.prototype.setDemo = function (isDemo) {
    const subdomain = isDemo ? `demo-api` : `api`;
    this.rest.baseUrl = `http://${subdomain}.hitbtc.com`;
    this.rest.url = `${this.rest.baseUrl}/api/1`;
    this.rest.isDemo = isDemo;
}

JkHitbtc.prototype.onBalance = function (...args) {
    return onBalance.apply(this, args);
}

JkHitbtc.prototype.onOrder = function (...args) {
    return onOrder.apply(this, args);
}

JkHitbtc.prototype.onBuy = function (...args) {
    args.unshift('limit');
    args.unshift('buy');
    return this.onOrder.apply(this, args);
}

JkHitbtc.prototype.onSell = function (...args) {
    args.unshift('limit');
    args.unshift('sell');
    return this.onOrder.apply(this, args);
}

module.exports = new JkHitbtc();