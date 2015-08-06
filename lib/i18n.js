var fs = require('fs');
var path = require('path');
var config = require('../configs/config');

var langStorage = getLocalizations(path.resolve(__dirname, '../lang/'));

/**
 * @class i18n
 * @name i18n
 * @static
 */
module.exports = {
    /**
     * @param {String} messageKey
     * @param {String} [lang]
     * @returns {String}
     */
    get: function (messageKey, lang) {
        lang = lang || config.DEFAULT_LANG;

        if (!langStorage[lang]) {
            throw new Error(lang + ' localization not found');
        }

        if (!langStorage[lang][messageKey]) {
            throw new Error('Localization key (' + messageKey + ') not found');
        }

        return langStorage[lang][messageKey];
    }
};

/**
 * @ignore
 * @param {String} localizationFolder
 * @returns {Object} Object with commands handlers by key.
 */
function getLocalizations(localizationFolder) {
    var storage = {};

    fs.readdirSync(localizationFolder)
        .filter(function (file) {
            var fileExtension = file.split('.').pop();
            return fileExtension == 'json';
        })
        .forEach(function (file) {
            var fileName = file.split('.').slice(0, -1);
            var filePath = path.resolve(localizationFolder, file);

            storage[fileName] = require(filePath);
        });

    return storage;
}

