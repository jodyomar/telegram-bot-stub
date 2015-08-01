var inherit = require('inherit');
var TEXT_TYPE = 'text';

/**
 * @class
 * @name Message
 */
var Message = inherit({
    /**
     * @param {Object|String} data
     * @param {String} [data.message]
     * @param {String} [data.type='text'] Type of message.
     */
    __constructor: function (data) {
        this._data = typeof data != 'string' ?
            data : {
                message: data,
                type: TEXT_TYPE
            };
    },

    /**
     * @returns {Object}
     */
    getData: function () {
        return this._data;
    },

    /**
     * @returns {String} Text for message.
     */
    getMessage: function () {
        return this._data.message;
    },

    /**
     * @returns {String} Type of message.
     */
    getType: function () {
        return this._data.type || TEXT_TYPE;
    }
});

module.exports = Message;
