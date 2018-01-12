const HitBTC = require('hitbtc-api');

const onSymbols = require('./onSymbols');
const onTicker = require('./onTicker');

let { public, secret } = require('./keys.json');

function JkHitbtc() {
    this.rest = new HitBTC.default({ public, secret, isDemo: true });
    // this.socket = {};
}

JkHitbtc.prototype.onSymbols = function (...args) {
    onSymbols.apply(this, args);
}

JkHitbtc.prototype.onTicker = function (...args) {
    onTicker.apply(this, args);
}

JkHitbtc.prototype.setDemo = function (isDemo) {
    const subdomain = isDemo ? `demo-api` : `api`;
    this.rest.baseUrl = `http://${subdomain}.hitbtc.com`;
    this.rest.url = `${this.rest.baseUrl}/api/1`;
    this.rest.isDemo = isDemo;

    console.log(this);
}

module.exports = new JkHitbtc();