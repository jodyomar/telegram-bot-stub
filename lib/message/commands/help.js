var vow = require('vow');
var Message = require('../Message');

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