var url = require('url'),
    request = require('request'),
    assign = require('object-assign'),
    inherit = require('inherit'),
    vow = require('vow');

var config = require('../../configs/config');

var SEARCH_URL = url.format({
        method: 'GET',
        protocol: 'https:',
        hostname: 'search-maps.yandex.ru',
        pathname: '/v1/'
    }),
    DEFAULT_LANG = 'ru_RU';

/**
 * @param {String} searchRequest 
 * @param {Object} [options] Request options.
 * @returns {Promise}
 */
function search (searchRequest, options) {
    options = options || {};
    var deferred = vow.defer(),
        query = assign({
            apikey: config.YANDEX_GEO_SEACH_TOKEN,
            text: searchRequest,
            lang: options.lang || DEFAULT_LANG
            // ll — search center
        }, options),
        ll = query.ll;

    if (ll) {
        query.ll = [ll.longitude, ll.lantitude];
    }

    request({
        url: SEARCH_URL,
        qs: query
    }, function (err, res, body) {
        if (err || res.status != 200) {
            deferred.reject(err);
        } else {
            try {
                body = JSON.parse(body);
                deferred.resolve(body);
            } catch (e) {
                deferred.reject(e);
            }
        }
    });

    return deferred.promise();
}

/**
 * @param {String} searchRequest
 * @param {Object} [options] Request options.
 * @returns {Promise}
 *
 * @example
 * searchProvider.getPoints('cafe', {ll: {latitude: 37.620361, longitude: 55.751569}})
 */
function getPoints (searchRequest, options) {
    return search(searchRequest, options)
        .then(function (resp) {
            return resp.features.map(function (item) {
                return item.geometry.coordinates;
            });
        });
}

module.exports = {
    search: search, 
    getPoints: getPoints
};