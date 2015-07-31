var vow = require('vow');
var Message = require('../messages/Message');

/**
 * @class help
 * @static
 * @implements {ICommandHandler}
 */
module.exports = {
    get: function (info) {
        return vow.resolve(new Message({
            message: 'hello world'
        }));
    }
};