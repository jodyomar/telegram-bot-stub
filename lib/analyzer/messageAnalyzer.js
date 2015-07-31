var inherit = require('inherit'),
    fs = require('fs'),
    path = require('path');

// Get all analyzers from `analyzers` folder.
var analyzers = getAnalyzers(path.resolve(__dirname, './analyzers/'));

/**
 * @class
 * @name MessageAnalyzer
 * @static
 */
module.exports = {
    /**
     * Analyze user message and return info.
     * 
     * @param {Object} message Telegram message.
     * @returns {Object[]} Analyzers info, sorted by weight.
     */
    analyze: function (message) {
        var data = analyzers
            .map(function (analyzer) {
                if (analyzer.is(message)) {
                    return analyzer.getData(message);
                }
            })
            .filter(Boolean)
            .sort(weightComparator);

        return data;
    }
};

/**
 * @ignore
 * 
 * @param {IAnalyzer} a
 * @param {IAnalyzer} b
 * @returns {Number}
 */
function weightComparator (a, b) {
    return a.weight - b.weight;
}

/**
 * @ignore
 * 
 * @param {String} analyzersDir
 * @returns {IAnalyzers[]}
 */
function getAnalyzers (analyzersDir) {
    return fs.readdirSync(ANALYZERS_DIR)
        .filter(function (file) {
            var fileInfo = path.parse(file);
            return fileInfo.ext == '.js';
        })
        .map(function (file) {
            return require(path.resolve(ANALYZERS_DIR, file));
        });
}