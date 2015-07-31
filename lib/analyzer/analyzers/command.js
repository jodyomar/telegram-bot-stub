var messageTypes = require('../../consts/messageTypes');

/**
 * @class
 * @name CommandAnalyzer
 * @static
 * @implements {IAnalyzer}
 */
module.exports = {
    is: function (message) {
        return message.text[0] === '/';
    },

    getData: function (message) {
        var messageArray = message.text.split(' '),
            command = messageArray[0].trim().substr(1).toLowerCase();

        return {
            type: messageTypes.COMMAND,
            weight: 1,
            command: command,
            params: messageArray.length > 1 ? 
                messageArray.slice(1).join(' ').trim() :
                null
        };
    }
};