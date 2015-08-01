var weatherProvider = require('../../providers/weather');
var Message = require('../Message');
var K = 273.15;

/**
 * @class Weather command.
 * @name WeatherMessageHandler
 * @implements {ICommandHandler}
 * @static
 */
module.exports = {
    get: function (info) {
        return weatherProvider.get(info.params).then(function (result) {
            var city = result.name;
            var temperature = Math.floor(result.main.temp - K);
            var description = result.weather[0].description;

            return new Message('Weather in ' + city + ': ' + temperature + '°C. ' + description);
        });
    }
};
