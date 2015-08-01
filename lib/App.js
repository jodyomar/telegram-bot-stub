var vow = require('vow');
var assign = require('object-assign');
var inherit = require('inherit');

var config = require('../configs/config');
var TelegramBot = require('./TelegramBot');
var MessageController = require('./message/MessageController');
var UserController = require('./UserController');
var messageAnalyzer = require('./analyzer/messageAnalyzer');

/**
 * @class
 * @name App
 */
var App = inherit({
    /**
     * @param {Object} [options]
     * @param {Boolean|Object} [options.polling=false] Set true to enable polling.
     * @param {String|Number} [options.polling.timeout=4] Polling time.
     * @param {Boolean|Object} [options.webHook=false] Set true to enable WebHook.
     * @param {String} [options.webHook.key] PEM private key to webHook server.
     * @param {String} [options.webHook.cert] PEM certificate key to webHook server.
     * @see https://core.telegram.org/bots/api
     */
    __constructor: function (options) {
        this.bot = new TelegramBot(config.TELEGRAM_TOKEN, options);
        this.user = new UserController(this);

        this._messageController = new MessageController(this);

        this._db = null;
        this._currentMessage = null;
    },

    /**
     * @param {MongoDB} db
     * @returns {App}
     */
    setDatabase: function (db) {
        this._db = db;
        this.user.setUsersCollection(db.collection('users'));

        return this;
    },

    /**
     * @returns {MondoDB|undefined}
     */
    getDatabase: function () {
        return this._db;
    },

    /**e
     * @returns {TelegramMessage}
     */
    getMessage: function () {
        return this._currentMessage;
    },

    /**
     * @returns {Object} Telegram user (from).
     */
    getUser: function () {
        return this._currentMessage.from;
    },

    /**
     * Send answer on the message.
     *
     * @returns {App}
     */
    sendAnswer: function () {
        var message = this._currentMessage;
        var data = messageAnalyzer.analyze(message);

        this._messageController.send(data[0]);

        return this;
    },

    /**
     * Handle message.
     * @param {Object} message Telegram message.
     * @returns {App}
     */
    handle: function (message) {
        log(message);

        var chatId = message.chat.id;
        this._currentMessage = message;

        this.bot.setChatId(chatId);
        this.sendAnswer();

        return this;
    }
});

/**
 * @ignore
 * Log users requests.
 * @param {Object} message Telegram message.
 */
function log(message) {
    var user = message.from;

    console.log(
        user.username + ':',
        user.first_name,
        user.last_name,
        '—',
        message.text || message.location
    );
}

module.exports = App;
