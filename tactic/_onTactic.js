const JkError = require('../cli/error');
const logger = require('../log/logger');
const onPump = require('./onPump');

var separator = ' ';

module.exports = function onConfig(...args) {
    switch(args.shift()) {
        case 'pump':
            onPump.apply(null, args);
            break;
        default:
            logger.log('onTactic: unrecognised command');
            // throw new JkError('onTactic: unrecognised command');
    }
}
