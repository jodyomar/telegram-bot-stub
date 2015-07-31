var MongoClient = require('mongodb').MongoClient;
var App = require('./lib/App'),
    config = require('./configs/config');

var application = new App({
    // Setup polling way
    polling: true
});

MongoClient.connect(config.MONGO, function(err, db) {
    if (err) {
        throw err;
    }

    console.log("Connected correctly to server");

    application.setDb(db);
    application.bot.on('message', function (msg) {
        application.handle(msg);
    });
});