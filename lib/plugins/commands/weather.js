var MESSAGE_TYPES = require('telegram-bot-node').MESSAGE_TYPES;
var weatherHandler = require('../../handlers/weather');

module.exports = {
    type: MESSAGE_TYPES.COMMAND,
    
    test: function (info) {
        return info.data.command === 'weather';
    },

    handler: function (info, bot) {
        return weatherHandler.get(info.data.params).then(function (weather) {
            return bot.sendMessage(weather);
        });
    }
};
