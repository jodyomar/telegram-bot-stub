var App = require('./lib/App');
var application = new App({
    // Setup polling way for bot
    polling: true
});

application.bot.on('message', function (msg) {
    application.handle(msg);
});

console.log('App runned');
