var vow = require('vow');
var fs = require('fs');
var path = require('path');

var commands = getCommands(path.resolve(__dirname, '../command'));

/**
 * @class Command message.
 * @static
 * @name CommandHandler
 * @implements {IMessageHandler}
 */
module.exports = {
    get: function (info) {
        var data = info.data;
        var user = info.user;
        var command = data.command;

        return commands[command] ?
            commands[command].get({
                message: info.message,
                params: data.params,
                user: user
            }) :
            vow.reject(new Error('Command ' + command + 'not found'));
    }
};

/**
 * @ignore
 * @param {String} commandsFolder
 * @returns {Object} Object with commands handlers by key.
 */
function getCommands(commandsFolder) {
    var commands = {};

    fs.readdirSync(commandsFolder)
        .filter(function (file) {
            var fileInfo = path.parse(file);
            return fileInfo.ext == '.js';
        })
        .forEach(function (file) {
            var fileInfo = path.parse(file);
            var filePath = path.resolve(commandsFolder, file);

            commands[fileInfo.name] = require(filePath);
        });

    return commands;
}
