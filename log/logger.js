const util = require('util');
const fs = require('fs');
const path = require('path');

const logPath = path.join(process.cwd(), './log/logs/session.log');
const logStream = fs.createWriteStream(logPath, { flag: 'w' });

const marketPath = path.join(process.cwd(), './log/logs/market.log');
const marketStream = fs.createWriteStream(marketPath, { flag: 'w' });

function toFile(...args) {
    logStream.write('' + util.format.apply(null, args) + '\n');
}

function toMarket(...args) {
    marketStream.write('' + util.format.apply(null, args) + '\n');
}

module.exports = {
    log: (...args) => {
        toFile.apply(null, args);
        console.log.apply(null, args);
    },
    debug: (...args) => {
        toFile.apply(null, args);
        console.log.apply(null, args);
    },
    warn: (...args) => {
        toFile.apply(null, args);
        console.log.apply(null, args);
    },
    error: (...args) => {
        toFile.apply(null, args);
        console.log.apply(null, args);
    },
    market: (...args) => {
        toMarket.apply(null, args);
    }
};