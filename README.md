# telegram-bot-stub
Project stub for smart telegram bots based on telegram-bot-node.

## Requirements
* nodejs >= 0.10
* npm >= 1.2.0

## Quick start
``` 
git clone https://github.com/zloylos/telegram-bot-stub.git <YOUR_PROJECT_NAME>
cd <YOUR_PROJECT_NAME>
rm -rf .git && git init
npm install 
npm start
```

## How it works
### Project structure: lib folder
```
configs/        Token and other info.
lang/           Localization.
lib/plugins     Contains bot plugins
lib/handlers    Common handlers for reuse. If you have command /weather, and react on text with some results.
lib/providers   Modules for load data.
```

### Messages
For add new handler, you need create plugin into plugin-folder. More information about plugins you can find [here](https://github.com/zloylos/telegram-bot-node#plugins).


## MongoDB
For using DB you need to call method `myBot.setUserCollection(<MongoDBCollection>)`. index.js file will looks like this:
```js
var MongoClient = require('mongodb').MongoClient;
var path = require('path'),
var Bot = require('telegram-bot-node').Bot;
var config = require('./configs/config');

var myBot = new Bot(config.TELEGRAM_TOKEN, {
    // Setup polling way
    polling: true,
    plugins: path.resolve(__dirname, './lib/plugins')
});

MongoClient.connect(config.MONGO_URL, function(err, db) {
    if (err) {throw err;}

    console.log("Connected correctly to MongoDB server");

    myBot.setUserCollection(db.collection('users');
    myBot.on('message', function (msg) {
        myBot.handle(msg);
    });

    console.log("App runned");
});
```

### Users
By default all handlers get user object in info variable. How can you use it? If user sent location before and ask weather without parameters, you can answer with his old location.

```js
var MESSAGE_TYPES = require('telegram-bot-node').MESSAGE_TYPES;
var weatherHandler = require('../handler/weather');
var request = require('superagent');
var vow = require('vow');
var WEATHER_URL = 'http://api.openweathermap.org/data/2.5/weather';
var K = 273.15;

module.exports = {
  type: MESSAGE_TYPES.COMMAND,
  test: function (info) {
    return info.data.command === 'weather';
  },
  handler: function (info, bot) {
    var user = info.user;
    var query = !info.data.params && user && user.location ? 
      {
        lat: user.location.latitude, 
        lon: user.location.longitude
      } : 
      {q: info.data.params};
    
    return weatherHandler.get(query);
  }
};
```
Now we can use /weather command without params.
