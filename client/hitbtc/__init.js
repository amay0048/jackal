const HitBTC = require('hitbtc-api');

const logger = require('../../log/logger');
const onSymbols = require('./onSymbols');
const onTicker = require('./onTicker');
const onBalance = require('./onBalance');
const onOrder = require('./onOrder');

let { public, secret } = require('./keys.json');

function JkHitbtc() {
    this.symbols = [];
    this.rest = new HitBTC.default({ key: public, secret: secret, isDemo: false });
    this.socket = new HitBTC.default.WebsocketClient({ key: public, secret: secret, isDemo: false });
}

JkHitbtc.prototype.init = function () {
    this.onSymbols().then(symbols => {
        this.symbols = symbols;
    });

    this.socket.addMarketMessageListener(data => {
        var refresh;
        if (data.MarketDataSnapshotFullRefresh) {
            refresh = data.MarketDataSnapshotFullRefresh;
        } else {
            refresh = data.MarketDataIncrementalRefresh;
        }

        if (!(global.Config && global.Config.getMonitorSymbol)) return;
        if (refresh.symbol !== global.Config.getMonitorSymbol()) return;

        if (refresh.bid[0] && refresh.bid[0].size)
            logger.log(`${refresh.timestamp} - ${refresh.symbol}: bid =>`, refresh.bid[0]);

        if (refresh.ask[0] && refresh.ask[0].size)
            logger.log(`${refresh.timestamp} - ${refresh.symbol}: ask =>`, refresh.ask[0]);
    });
}

JkHitbtc.prototype.onSymbols = function (...args) {
    return onSymbols.apply(this, args);
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

JkHitbtc.prototype.getSymbolMeta = function (symbol) {
    return this.symbols.find(s => (s.symbol == symbol));
}

module.exports = new JkHitbtc();