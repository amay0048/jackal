const JkError = require('../cli/error');
const logger = require('../log/logger');
const onPump = require('./onPump');

var separator = ' ';

module.exports = function onConfig(...args) {
    switch(args.shift()) {
        case 'pump':
            try {
                onPump.apply(null, args);
            } catch (e) {
                logger.log('onPump: error input =>', args, e);
            }
            break;
        default:
            logger.log('onTactic: unrecognised command');
            // throw new JkError('onTactic: unrecognised command');
    }
}
