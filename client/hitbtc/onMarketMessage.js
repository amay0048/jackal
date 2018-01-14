const logger = require('../../log/logger');

module.exports = function onMarketMessage(data) {

    var refresh;
    if (data.MarketDataSnapshotFullRefresh) {
        refresh = data.MarketDataSnapshotFullRefresh;
    } else {
        refresh = data.MarketDataIncrementalRefresh;
    }

    if (this.symbols && refresh.ask[0] && refresh.ask[0].size) {
        logger.market(`${refresh.timestamp} - ${refresh.symbol}: ask =>`, refresh.ask[0]);
        this.symbols[refresh.symbol].last.ask = Number(refresh.ask[0].price);
    }
    if (this.symbols && refresh.bid[0] && refresh.bid[0].size) {
        logger.market(`${refresh.timestamp} - ${refresh.symbol}: bid =>`, refresh.bid[0]);
        this.symbols[refresh.symbol].last.bid = Number(refresh.bid[0].price);
    }

    if (!(global.Config && global.Config.getMonitorSymbol)) return;
    if (refresh.symbol !== global.Config.getMonitorSymbol()) return;

    if (refresh.bid[0] && refresh.bid[0].size)
        logger.log(`${refresh.timestamp} - ${refresh.symbol}: bid =>`, refresh.bid[0]);

    if (refresh.ask[0] && refresh.ask[0].size)
        logger.log(`${refresh.timestamp} - ${refresh.symbol}: ask =>`, refresh.ask[0]);
}