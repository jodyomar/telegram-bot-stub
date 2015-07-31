var LANGUAGES = {
    RU: 'RU',
    EN: 'EN',
    UK: 'UK',
    TR: 'TR'
};

var langStorage = {};
langStorage[LANGUAGES.RU] = require('../lang/ru.json');
langStorage[LANGUAGES.EN] = require('../lang/en.json');

/**
 * @class i18n
 * @name i18n
 * @static
 */
module.exports = {
    /**
     * @param {String} messageKey 
     * @param {String} [lang="RU"] 
     * @returns {String}
     */
    get: function (messageKey, lang) {
        lang = lang || LANGUAGES.RU;
        return langStorage[lang][messageKey];
    }
};