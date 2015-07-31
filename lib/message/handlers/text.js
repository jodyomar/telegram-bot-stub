var vow = require('vow');

var searchProvider = require('../../providers/search'),
    Message = require('../messages/Message');

/**
 * @class On text message.
 * @static
 * @implements {IMessageHandler}
 */
module.exports = {
    get: function (info) {
        var text = info.data.text,
            user = info.user;

        return vow.resolve(new Message({
            message: 'Hello'
        }));
    }
};