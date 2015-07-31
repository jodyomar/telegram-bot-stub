var messageTypes = require('../../consts/messageTypes');

/**
 * @class
 * @name LocationAnalyzer
 * @static
 * @implements {IAnalyzer}
 */
module.exports = {
    is: function (message) {
        return typeof message.location !== 'undefined';
    },

    getData: function (message) {
        return {
            type: messageTypes.LOCATION,
            weight: 1,
            location: message.location
        };
    }
}