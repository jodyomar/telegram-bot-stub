var request = require('superagent'),
    vow = require('vow');

var Message = require('../Message');

var WEATHER_URL = 'http://api.openweathermap.org/data/2.5/weather',
    K = 273.15;

/**
 * @class Weather command.
 * @name WeatherMessageHandler
 * @implements {ICommandHandler}
 * @static
 */
module.exports = {
    get: function (info) {
        var deferred = vow.defer();

        request
            .get(WEATHER_URL)
            .query({q: info.params})
            .end(function (err, resp) {
                if (err || resp.statusCode != 200) {
                    deferred.reject(err || new Error('Status code: ' + resp.statusCode));
                    return;
                }
                var result = resp.body;
                deferred.resolve(new Message({
                    message: 'Weather in ' + result.name + ': ' + 
                        Math.floor(result.main.temp - K) + '°C. ' + 
                        result.weather[0].description
                }));
            });

        return deferred.promise();
    }
};