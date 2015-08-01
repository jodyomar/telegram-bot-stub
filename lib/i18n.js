var fs = require('fs');
var path = require('path');

var langStorages = getLocalizations(path.resolve(__dirname, '../lang/'));

/**
 * @class i18n
 * @name i18n
 * @static
 */
module.exports = {
    /**
     * @param {String} messageKey
     * @param {String} [lang='en']
     * @returns {String}
     */
    get: function (messageKey, lang) {
        lang = lang || 'en';
        return langStorage[lang][messageKey];
    }
};

/**
 * @ignore
 * @param {String} localizationFolder
 * @returns {Object} Object with commands handlers by key.
 */
function getCommands(localizationFolder) {
    var storage = {};

    fs.readdirSync(localizationFolder)
        .filter(function (file) {
            var fileInfo = path.parse(file);
            return fileInfo.ext == '.json';
        })
        .forEach(function (file) {
            var fileInfo = path.parse(file);
            var filePath = path.resolve(localizationFolder, file);

            storage[fileInfo.name] = require(filePath);
        });

    return storage;
}
