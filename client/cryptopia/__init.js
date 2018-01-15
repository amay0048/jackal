const logger = require('../../log/logger');

// const Binance = require('binance-api-node');
const Cryptopia = require('cryptopia.js');
let { public, secret } = require('./keys.json');

const onBalance = require('./onBalance');
const onSymbols = require('./onSymbols');
const onMarketMessage = require('./onMarketMessage');
const onOrder = require('./onOrder');
const onTicker = require('./onTicker');

function JkCryptopia() {
  this.symbols = null;
  this.api = new Cryptopia(public, secret);
}

JkCryptopia.prototype.init = function () {
  this.onSymbols().then(data => {
    logger.log(`onSymbols => complete`);
    this.symbols = data;
    // TODO: No streaming support for cryptopia
  })
}

JkCryptopia.prototype.onTicker = function (...args) {
  return onTicker.apply(this, args);
}

JkCryptopia.prototype.onBalance = function (...args) {
  return onBalance.apply(this, args);
}

JkCryptopia.prototype.onSymbols = function (...args) {
  return onSymbols.apply(this, args);
}

JkCryptopia.prototype.getSymbolMeta = function (symbol) {
  return this.symbols[symbol];
}

JkCryptopia.prototype.onOrder = function (...args) {
  return onOrder.apply(this, args);
}

JkCryptopia.prototype.onBuy = function (...args) {
  args.unshift('limit');
  args.unshift('buy');
  return this.onOrder.apply(this, args);
}

JkCryptopia.prototype.onSell = function (...args) {
  args.unshift('limit');
  args.unshift('sell');
  return this.onOrder.apply(this, args);
}

module.exports = new JkCryptopia();