const util = require('util');
const fs = require('fs');
const path = require('path');

let logPath = path.join(process.cwd(), './log/logs/session.log');
const stream = fs.createWriteStream(logPath, { flag: 'w' });

function toFile(...args) {
    stream.write('' + util.format.apply(null, args) + '\n');
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
};