var request = require('superagent');
var vow = require('vow');

var WEATHER_URL = 'http://api.openweathermap.org/data/2.5/weather';

/**
 * @class
 * @name WeatherProvider
 */
module.exports = {
    /**
     * @param {String} city
     * @returns {Promise}
     * @example
     * weatherProvider.get('London').then(function (result) {
     *     console.log(result.weather.description);
     * });
     */
    get: function (city) {
        var deferred = vow.defer();
        request
            .get(WEATHER_URL)
            .query({q: city})
            .end(function (err, resp) {
                if (err || resp.statusCode != 200) {
                    deferred.reject(err || new Error('Status code: ' + resp.statusCode));
                    return;
                }
                deferred.resolve(resp.body);
            });

        return deferred.promise();
    }
};
