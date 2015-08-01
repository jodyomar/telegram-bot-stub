var vow = require('vow');

var Message = require('../Message');
var content = require('../../i18n');

/**
 * @class
 * @name LocationHandler
 * @static
 * @implements {IMessageHandler}
 */
module.exports = {
    get: function (info) {
        var location = info.location;
        var user = info.user || {};

        return vow.resolve(new Message({
            action: 'save',
            data: {
                location: location
            },
            message: content.get('location_get', user.lang),
            type: 'action'
        }));
    }
};
