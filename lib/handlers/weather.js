var weatherProvider = require('../providers/weather');
var content = require('../i18n');
var K = 273.15;

/**
 * @class
 * @name WeatherHandler
 * @static
 */
module.exports = {
    /**
     * @param {String} city
     * @param {String} lang
     * @returns {Promise}
     */
    get: function (city, lang) {
        return weatherProvider.get(city).then(function (result) {
            return content.get('weather', lang)
                .replace('{city}', result.name)
                .replace('{temperature}', Math.floor(result.main.temp - K);)
                .replace('{description}', result.weather[0].description);
        });
    }
};
