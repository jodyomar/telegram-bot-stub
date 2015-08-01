var inherit = require('inherit'),
    path = require('path'),
    fs = require('fs'),
    assign = require('object-assign');

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
        var app = this._app,
            handler = handlers[type.toLowerCase()],
            handlerData = {
                message: message, 
                data: data
            },
            handlerPromise = !app.hasDb() ? 
                handler.get(handlerData) :
                app.user.get().then(function (user) {
                    return handler.get(assign(handlerData, {user: user}));
                });
        
        return handlerPromise.then(this._onAnswerGet.bind(this));
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
        var messageData = imageMessage.getData();

        return this._app.bot.sendImage(messageData.image, {
            caption: messageData.caption
        });
    },

    /**
     * @ignore
     * @param {ActionMessage} actionMessage
     * @returns {Promise}
     */
    _processAction: function (actionMessage) {
        var app = this._app,
            messageData = actionMessage.getData(),
            textMessage = actionMessage.getMessage(),
            result;

        switch (actionMessage.action) {
            case 'save':
                if (!app.hasDb()) {
                    throw new Error('DB not found');
                }
                result = app.users.setData(actionMessage.info);
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

    fs.readdirSync(messageHandlersDir)
        .filter(function (file) { 
            var fileInfo = path.parse(file);
            return fileInfo.ext == '.js'; 
        })
        .forEach(function (file) { 
            var fileInfo = path.parse(file),
                filePath = path.resolve(messageHandlersDir, file);

            handlers[fileInfo.name.toLowerCase()] = require(filePath); 
        });

    return handlers;
}

module.exports = MessageController;