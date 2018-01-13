const JkError = require('../cli/error');
const logger = require('../log/logger');
const onExchange = require('./onExchange');
const onStake = require('./onStake');
const onBasePair = require('./onBasePair');
const onDemo = require('./onDemo');
const onEcho = require('./onEcho');

var separator = ' ';

module.exports = function onConfig(...args) {
    switch(args.shift()) {
        case 'exchange':
            onExchange.apply(null, args);
            break;
        case 'base':
            onBasePair.apply(null, args);
            break;
        case 'stake':
            onStake.apply(null, args);
            break;
        case 'demo':
            onDemo.apply(null, args);
            break;
        case 'echo':
            onEcho.apply(null, args);
            break;
        default:
            logger.log('onConfig: unrecognised command');
            // throw new JkError('onConfig: unrecognised command');
    }
}
