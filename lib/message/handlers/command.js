var vow = require('vow'),
    fs = require('fs'),
    path = require('path');

var COMMANS_FOLDER = path.resolve(__dirname, '../commands'),
    commands = {};

fs.readdirSync(COMMANS_FOLDER)
    .filter(function (file) { 
        var fileInfo = path.parse(file); 
        return fileInfo.ext == '.js'; 
    })
    .forEach(function (file) {
        var fileInfo = path.parse(file),
            filePath = path.resolve(COMMANS_FOLDER, file); 
            
        commands[fileInfo.name] = require(filePath); 
    });

/**
 * @class Command message.
 * @static
 * @name CommandHandler
 * @implements {IMessageHandler}
 */
module.exports = {
    get: function (info) {
        var data = info.data,
            user = info.user, 
            command = data.command;

        return commands[command] ?
            commands[command].get({
                message: info.message,
                params: data.params,
                user: user
            }) :
            vow.reject('command not found');
    }
};