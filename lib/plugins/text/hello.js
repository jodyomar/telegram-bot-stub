var MESSAGE_TYPES = require('telegram-bot-node').MESSAGE_TYPES;
var content = require('../../i18n');

module.exports = {
    type: MESSAGE_TYPES.TEXT,

    weight: 0.1,

    test: function (info) {
        var textMessage = info.data.text.toLowerCase();
        return content.get('hello-keywords').some(function (keyword) {
            return textMessage.indexOf(keyword) !== -1;
        });
    },

    handler: function (info, bot) {
        bot.sendMessage(content.get('hello'));
    }
};
