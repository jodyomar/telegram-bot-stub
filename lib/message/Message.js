var inherit = require('inherit');

/**
 * @class
 * @name Message
 */
var Message = inherit({
    /**
     * @param {Object} data
     * @param {String} data.message
     * @param {String} [data.type='text'] Type of message.
     */
    __constructor: function (data) {
        this._data = data;
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
        return this._data.type || 'text';
    }
});

module.exports = Message;