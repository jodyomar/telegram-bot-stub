var TelegramBot = require('telegram-bot-node').Bot;
var path = require('path');
var config = require('./configs/config');

var myBot = new TelegramBot(config.TOKEN, {
    pooling: true,
    // Folder with plugins.
    plugins: path.resolve(__dirname, './lib/plugins/')
});

// Now listen `message` event.
myBot.on('message', function (msg) {
    myBot.handle(msg);
    // Run plugins.
    myBot.process();
});
