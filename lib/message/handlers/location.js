var vow = require('vow');

var searchProvider = require('../../providers/search'),
    Message = require('../messages/Message'),
    content = require('../../i18n');

/**
 * @class
 * @name LocationHandler
 * @static
 * @implements {IMessageHandler}
 */
module.exports = {
    get: function (info) {
        var location = info.location,
            user = info.user || {};

        return vow.resolve(new ActionMessage({
            action: 'save',
            data: {
                location: location
            },
            message: content.get('location_get', user.lang),
        }));
    }
};