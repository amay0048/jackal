const logger = require('../../log/logger');

module.exports = function onMarketMessage(data) {
    throw new Error('onMarketMessage: not yet implementated');

    // var refresh = data;

    // if (this.symbols && refresh.askDepth[0] && Number(refresh.askDepth[0].quantity)) {
    //     logger.market(`${refresh.eventTime} - ${refresh.symbol}: ask =>`, refresh.askDepth[0]);
    //     this.symbols[refresh.symbol].last.ask = Number(refresh.askDepth[0].price);
    // }
    // if (this.symbols && refresh.bidDepth[0] && Number(refresh.bidDepth[0].quantity)) {
    //     logger.market(`${refresh.eventTime} - ${refresh.symbol}: bid =>`, refresh.bidDepth[0]);
    //     this.symbols[refresh.symbol].last.bid = Number(refresh.bidDepth[0].price);
    // }

    // if (!(global.Config && global.Config.getMonitorSymbol)) return;
    // if (refresh.symbol !== global.Config.getMonitorSymbol()) return;

    // if (refresh.bidDepth[0] && Number(refresh.bidDepth[0].quantity))
    //     logger.log(`${refresh.eventTime} - ${refresh.symbol}: bid =>`, refresh.bidDepth[0]);

    // if (refresh.askDepth[0] && Number(refresh.askDepth[0].quantity))
    //     logger.log(`${refresh.eventTime} - ${refresh.symbol}: ask =>`, refresh.askDepth[0]);
}