/**
 * @fileOverview Telegram bot wrapper.
 */
var TelegramBot = require('node-telegram-bot-api');
var inherit = require('inherit');

/**
 * @class Telegram bot (node-telegram-bot-api) wrapper.
 * @name TelegramBot.
 * @see https://core.telegram.org/bots/api
 * @see https://www.npmjs.com/package/node-telegram-bot-api
 */
var Bot = inherit(TelegramBot, {
    __constructor: function () {
        this.__base.apply(this, arguments);
        this._chatId = null;
    },

    sendMessage: function (message, options) {
        return this.__base.call(this, this._chatId, message, options);
    },

    forwardMessage: function (fromChatId, messageId) {
        return this.__base.call(this, this._chatId, fromChatId, messageId);
    },

    sendPhoto: function (photo, options) {
        return this.__base.call(this, this._chatId, photo, options);
    },

    sendAudio: function (audio, options) {
        return this.__base.call(this, this._chatId, audio, options);
    },

    sendVideo: function (video, options) {
        return this.__base.call(this, this._chatId, video, options);
    },

    sendDocument: function (doc, options) {
        return this.__base.call(this, this._chatId, doc, options);
    },

    sendSticker: function (sticker, options) {
        return this.__base.call(this, this._chatId, sticker, options);
    },

    sendChatAction: function (action) {
        return this.__base.call(this, this._chatId, action);
    },

    sendLocation: function (latitude, longitude, options) {
        return this.__base.call(this, this._chatId, latitude, longitude, options);
    },

    /**
     * @param {Number} chatId
     * @returns {TelegramBot}
     */
    setChatId: function (chatId) {
        this._chatId = chatId;
        return this;
    }
});

module.exports = Bot;
