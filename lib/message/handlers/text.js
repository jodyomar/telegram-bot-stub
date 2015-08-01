var vow = require('vow');
var Message = require('../Message');

/**
 * @class On text message.
 * @static
 * @implements {IMessageHandler}
 */
module.exports = {
    get: function (info) {
        return vow.resolve(new Message({
            message: 'Hello'
        }));
    }
};
