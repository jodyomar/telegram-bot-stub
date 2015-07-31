var messageTypes = require('../../consts/messageTypes');

/**
 * @class
 * @name TextAnalyzer
 * @static
 * @implements {IAnalyzer}
 */
module.exports = {
    is: function (message) {
        return typeof message.text === 'string';
    },

    getData: function (message) {
        return {
            type: messageTypes.TEXT,
            weight: 0.1,
            text: message.text
        };
    }
}