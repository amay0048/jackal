const logger = require('../../log/logger');

const Binance = require('binance-api-node');
let { public, secret } = require('./keys.json');

const onBalance = require('./onBalance');
const onSymbols = require('./onSymbols');
const onMarketMessage = require('./onMarketMessage');
const onOrder = require('./onOrder');

function JkBinance() {
  this.symbols = null;
  this.api = Binance.default({
    apiKey: public,
    apiSecret: secret,
  });
}

JkBinance.prototype.init = function () {
  this.onSymbols().then(data => {
    this.symbols = data;
    this.api.ws.depth(Object.keys(data), depth => {
      onMarketMessage.call(this, depth);
    })
  })
}

JkBinance.prototype.onBalance = function (...args) {
  return onBalance.apply(this, args);
}

JkBinance.prototype.onSymbols = function (...args) {
  return onSymbols.apply(this, args);
}

JkBinance.prototype.getSymbolMeta = function (symbol) {
  return this.symbols[symbol];
}

JkBinance.prototype.onOrder = function (...args) {
  return onOrder.apply(this, args);
}

JkBinance.prototype.onBuy = function (...args) {
  args.unshift('limit');
  args.unshift('buy');
  return this.onOrder.apply(this, args);
}

JkBinance.prototype.onSell = function (...args) {
  args.unshift('limit');
  args.unshift('sell');
  return this.onOrder.apply(this, args);
}

module.exports = new JkBinance();