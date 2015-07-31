var inherit = require('inherit'),
    path = require('path'),
    fs = require('fs');

// Get all message handlers from `handlers` folder.
var handlers = getMessageHandlers(path.resolve(__dirname, './handlers/'));

/**
 * @class
 * @name MessageController
 */
var MessageController = inherit({
    /**
     * @param {App} app Application.
     */
    __constructor: function (app) {
        this._app = app;
    },

    /**
     * @param {Object} data Info from analyzers.
     * @returns {Promise}
     */
    send: function (data) {
        var message = this._app.getMessage();
        return this._sendAnswer(data.type, message, data);
    },

    _sendAnswer: function (type, message, data) {
        var app = this._app;

        return app.user.get().then(function (user) {
            return handlers[type.toLowerCase()]
                .get({
                    message: message, 
                    data: data, 
                    user: user
                })
                .then(this._onAnswerGet.bind(this));
        }.bind(this));
    },

    _onAnswerGet: function (answer) {
        var result;
        switch (answer.getType()) {
            case 'image':
                result = this._processImage(answer);
                break;

            case 'action':
                result = this._processAction(answer);
                break;

            case 'text':
                result = this._processText(answer);
                break;

            default: 
                result = vow.reject(new Error("Can't process type"));
                break;
        }
        return result;
    },

    /**
     * @ignore
     * @param {ImageMessage} imageMessage
     * @returns {Promise}
     */
    _processImage: function (imageMessage) {
        return this._app.bot.sendImage(
            imageMessage.getImage(),
            imageMessage.getCaption()
        );
    },

    /**
     * @ignore
     * @param {ActionMessage} actionMessage
     * @returns {Promise}
     */
    _processAction: function (actionMessage) {
        var app = this._app,
            textMessage = actionMessage.getMessage(),
            result;

        switch (actionMessage.getActionType()) {
            case 'save':
                result = app.users.setData(actionMessage.getActionData());
                if (textMessage) {
                    result.then(function () {
                        return app.sendMessage(textMessage);     
                    });
                }
                break;

            default: 
                result = vow.reject("Can't process action");
                break;
        }

        return result;
    },

    /**
     * @ignore
     * @param {Message} textMessage
     * @returns {Promise}
     */
    _processText: function (textMessage) {
        return this._app.bot.sendMessage(textMessage.getMessage());
    }
});

/**
 * @ignore
 * 
 * @param {String} messageHandlersDir
 * @returns {Object} Object width handlers by type.
 */
function getMessageHandlers (messageHandlersDir) {
    var handlers = {};

    fs.readdirSync(HANDLERS_FOLDER)
        .filter(function (file) { 
            var fileInfo = path.parse(file);
            return fileInfo.ext == '.js'; 
        })
        .forEach(function (file) { 
            var fileInfo = path.parse(file),
                filePath = path.resolve(HANDLERS_FOLDER, file);

            handlers[fileInfo.name.toLowerCase()] = require(filePath); 
        });

    return handlers;
}

module.exports = MessageController;