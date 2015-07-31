var messageTypes = require('../../consts/messageTypes');

/**
 * @class
 * @name PhotoAnalyzer
 * @static
 * @implements {IAnalyzer}
 */
module.exports = {
    is: function (message) {
        return typeof message.photo !== 'undefined';
    },

    getData: function (message) {
        return {
            type: messageTypes.PHOTO,
            weight: 1,
            photo: message.photo
        };
    }
}